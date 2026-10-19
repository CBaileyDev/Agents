#!/usr/bin/env node
// ux-capture: render pages at several viewports and themes with Playwright,
// save screenshots, and collect rules-based UX/a11y signals into report.json.
//
// Usage:
//   node ux-capture.mjs <url> [<url> ...] [options]
//
// Options:
//   --out <dir>              Output directory (default: .ux-captures/<timestamp>)
//   --widths <list>          Comma-separated viewport widths (default: 320,390,768,1280)
//   --themes <list>          light,dark (default: light,dark)
//   --reduced-motion         Emulate prefers-reduced-motion: reduce
//   --full-page              Capture the full scrollable page, not just the viewport
//   --keyboard               Tab through the page and record focus order and visibility
//   --tab-stops <n>          Maximum Tab presses for --keyboard (default: 40)
//   --wait <ms>              Extra wait after load before capturing (default: 300)
//   --executable-path <p>    Chromium binary to use instead of Playwright's default
//
// Playwright is resolved from the current project first, then globally installed
// packages. axe-core (via @axe-core/playwright or axe-core) runs when resolvable.

import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const opts = {
    urls: [],
    out: path.join(".ux-captures", new Date().toISOString().replace(/[:.]/g, "-")),
    widths: [320, 390, 768, 1280],
    themes: ["light", "dark"],
    reducedMotion: false,
    fullPage: false,
    keyboard: false,
    tabStops: 40,
    wait: 300,
    executablePath: undefined,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => {
      const value = argv[++i];
      if (value === undefined) throw new Error(`Missing value for ${arg}`);
      return value;
    };
    if (arg === "--out") opts.out = next();
    else if (arg === "--widths") opts.widths = next().split(",").map((w) => Number.parseInt(w, 10)).filter(Boolean);
    else if (arg === "--themes") opts.themes = next().split(",").filter((t) => t === "light" || t === "dark");
    else if (arg === "--reduced-motion") opts.reducedMotion = true;
    else if (arg === "--full-page") opts.fullPage = true;
    else if (arg === "--keyboard") opts.keyboard = true;
    else if (arg === "--tab-stops") opts.tabStops = Number.parseInt(next(), 10);
    else if (arg === "--wait") opts.wait = Number.parseInt(next(), 10);
    else if (arg === "--executable-path") opts.executablePath = next();
    else if (arg === "-h" || arg === "--help") {
      const header = fs.readFileSync(new URL(import.meta.url), "utf8").split("\n").slice(1);
      const end = header.findIndex((l) => !l.startsWith("//"));
      console.log(header.slice(0, end).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));
      process.exit(0);
    } else if (arg.startsWith("--")) throw new Error(`Unknown option ${arg}`);
    else opts.urls.push(arg);
  }
  if (opts.urls.length === 0) throw new Error("Pass at least one URL (http://, https://, or file://).");
  return opts;
}

// Resolve a package from the project, then from the global node_modules.
function resolvePackage(names) {
  const bases = [path.join(process.cwd(), "noop.js")];
  try {
    bases.push(path.join(execSync("npm root -g", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(), "noop.js"));
  } catch {
    // npm unavailable; project resolution only.
  }
  for (const base of bases) {
    const require = createRequire(base);
    for (const name of names) {
      try {
        return { name, module: require(name) };
      } catch {
        // try the next candidate
      }
    }
  }
  return null;
}

function viewportHeight(width) {
  if (width <= 480) return 844;
  if (width <= 900) return 1024;
  return 800;
}

// Runs in the page. Heuristic signals only; axe-core is the authoritative scan.
function collectSignals(viewportWidth) {
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
  };
  const describe = (el) => {
    const id = el.id ? `#${el.id}` : "";
    const cls = typeof el.className === "string" && el.className.trim() ? `.${el.className.trim().split(/\s+/).slice(0, 2).join(".")}` : "";
    const text = (el.innerText || el.getAttribute("aria-label") || el.getAttribute("value") || "").trim().replace(/\s+/g, " ").slice(0, 40);
    return `${el.tagName.toLowerCase()}${id}${cls}${text ? ` "${text}"` : ""}`;
  };
  const accessibleName = (el) => {
    const labelledby = el.getAttribute("aria-labelledby");
    if (labelledby) {
      const text = labelledby.split(/\s+/).map((id) => document.getElementById(id)?.textContent || "").join(" ").trim();
      if (text) return text;
    }
    const direct = el.getAttribute("aria-label") || el.getAttribute("title") || "";
    if (direct.trim()) return direct.trim();
    if (el.labels && el.labels.length) return Array.from(el.labels).map((l) => l.textContent).join(" ").trim();
    const imgAlt = Array.from(el.querySelectorAll("img[alt], svg title")).map((n) => n.getAttribute("alt") || n.textContent).join(" ");
    return ((el.innerText || "") + " " + imgAlt + " " + (el.getAttribute("value") || "") + " " + (el.getAttribute("placeholder") || "")).trim();
  };

  const interactiveSelector = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="tab"], [role="menuitem"], [role="radio"]';
  const interactive = Array.from(document.querySelectorAll(interactiveSelector)).filter(visible);

  const isInlineTextLink = (el) => {
    if (el.tagName !== "A" || getComputedStyle(el).display !== "inline") return false;
    const parentText = (el.parentElement?.innerText || "").trim();
    return parentText.length > (el.innerText || "").trim().length + 10;
  };

  // WCAG 2.5.8 also passes undersized targets with enough spacing; treat these as candidates to check.
  const targetsUnder24px = interactive
    .filter((el) => !isInlineTextLink(el))
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.width < 24 || r.height < 24)
    .map(({ el, r }) => ({ element: describe(el), width: Math.round(r.width), height: Math.round(r.height) }));

  const isButtonInput = (el) => el.tagName === "INPUT" && ["submit", "button", "reset"].includes(el.type);
  const unnamedControls = interactive
    .filter((el) => (isButtonInput(el) ? !el.value : accessibleName(el) === ""))
    .map(describe);

  const unlabeledInputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]), select, textarea'))
    .filter(visible)
    .filter((el) => !(el.labels && el.labels.length) && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby"))
    .map(describe);

  const imagesMissingAlt = Array.from(document.querySelectorAll("img:not([alt])")).filter(visible).map((img) => img.currentSrc || img.src);

  const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter(visible).map((h) => Number(h.tagName[1]));
  const skippedHeadingLevels = headings.some((level, i) => i > 0 && level > headings[i - 1] + 1);

  const smallInputFont = Array.from(document.querySelectorAll("input, select, textarea"))
    .filter(visible)
    .filter((el) => Number.parseFloat(getComputedStyle(el).fontSize) < 16)
    .map(describe);

  const viewportMeta = document.querySelector('meta[name="viewport"]')?.getAttribute("content") || null;

  return {
    title: document.title,
    lang: document.documentElement.getAttribute("lang"),
    viewportMeta,
    zoomDisabled: viewportMeta ? /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/i.test(viewportMeta) : false,
    // Compare with the configured width: mobile emulation zooms out to fit wide content, which hides overflow from innerWidth.
    horizontalOverflowPx: Math.max(0, document.documentElement.scrollWidth - viewportWidth),
    h1Count: headings.filter((l) => l === 1).length,
    skippedHeadingLevels,
    targetsUnder24px,
    unnamedControls,
    unlabeledInputs,
    imagesMissingAlt,
    inputsUnder16px: smallInputFont,
  };
}

async function keyboardPass(page, maxStops) {
  const stops = [];
  await page.evaluate(() => {
    document.activeElement?.blur?.();
    window.scrollTo(0, 0);
  });
  for (let i = 0; i < maxStops; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const outline = s.outlineStyle !== "none" && Number.parseFloat(s.outlineWidth) > 0;
      const ring = s.boxShadow && s.boxShadow !== "none";
      const cx = Math.min(Math.max(r.left + r.width / 2, 0), window.innerWidth - 1);
      const cy = Math.min(Math.max(r.top + r.height / 2, 0), window.innerHeight - 1);
      const hit = document.elementFromPoint(cx, cy);
      const id = el.id ? `#${el.id}` : "";
      const text = (el.innerText || el.getAttribute("aria-label") || el.getAttribute("name") || "").trim().replace(/\s+/g, " ").slice(0, 40);
      return {
        key: `${el.tagName}${id}|${Math.round(r.left)},${Math.round(r.top + window.scrollY)}`,
        element: `${el.tagName.toLowerCase()}${id}${text ? ` "${text}"` : ""}`,
        focusIndicator: outline || ring ? "visible" : "not detected",
        possiblyObscured: Boolean(hit && hit !== el && !el.contains(hit) && !hit.contains(el)),
      };
    });
    if (!info) break;
    if (stops.length && stops[0].key === info.key) break; // wrapped around
    stops.push(info);
  }
  return stops.map(({ key, ...rest }) => rest);
}

async function runAxe(page, axe) {
  if (!axe) return { available: false, note: "Install @axe-core/playwright (or axe-core) in the project to enable the automated WCAG scan." };
  const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
  let result;
  if (axe.name === "@axe-core/playwright") {
    const AxeBuilder = axe.module.default ?? axe.module.AxeBuilder ?? axe.module;
    result = await new AxeBuilder({ page }).withTags(tags).analyze();
  } else {
    await page.addScriptTag({ content: axe.module.source });
    result = await page.evaluate((t) => window.axe.run(document, { runOnly: { type: "tag", values: t } }), tags);
  }
  return {
    available: true,
    violations: result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.slice(0, 5).map((n) => n.target.join(" ")),
      count: v.nodes.length,
    })),
  };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const pw = resolvePackage(["playwright", "playwright-core", "@playwright/test"]);
  if (!pw) {
    console.error("Playwright not found. Install it in the project (npm i -D playwright) or globally, then rerun.");
    process.exit(2);
  }
  const axe = resolvePackage(["@axe-core/playwright", "axe-core"]);
  fs.mkdirSync(opts.out, { recursive: true });

  const browser = await pw.module.chromium.launch({ executablePath: opts.executablePath });
  const report = { generatedAt: new Date().toISOString(), options: { ...opts, urls: undefined }, axe: axe ? axe.name : null, captures: [] };

  try {
    for (const [urlIndex, url] of opts.urls.entries()) {
      for (const width of opts.widths) {
        for (const theme of opts.themes) {
          const context = await browser.newContext({
            viewport: { width, height: viewportHeight(width) },
            colorScheme: theme,
            reducedMotion: opts.reducedMotion ? "reduce" : "no-preference",
            hasTouch: width <= 480,
            isMobile: width <= 480,
          });
          const page = await context.newPage();
          const consoleErrors = [];
          page.on("console", (msg) => msg.type() === "error" && consoleErrors.push(msg.text().slice(0, 300)));
          page.on("pageerror", (err) => consoleErrors.push(String(err).slice(0, 300)));

          const entry = { url, width, theme, reducedMotion: opts.reducedMotion };
          try {
            await page.goto(url, { waitUntil: "networkidle", timeout: 30000 }).catch(() => page.goto(url, { waitUntil: "load", timeout: 30000 }));
            await page.waitForTimeout(opts.wait);
            const file = path.join(opts.out, `${urlIndex + 1}-${width}-${theme}${opts.reducedMotion ? "-reduced" : ""}.png`);
            await page.screenshot({ path: file, fullPage: opts.fullPage });
            entry.screenshot = file;
            entry.signals = await page.evaluate(collectSignals, width);
            entry.axe = await runAxe(page, axe).catch((err) => ({ available: false, error: String(err) }));
            if (opts.keyboard) entry.focusOrder = await keyboardPass(page, opts.tabStops);
          } catch (err) {
            entry.error = String(err);
          }
          entry.consoleErrors = consoleErrors;
          report.captures.push(entry);
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }

  const reportPath = path.join(opts.out, "report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  for (const c of report.captures) {
    const s = c.signals;
    const parts = [`${c.width}px ${c.theme}`];
    if (c.error) parts.push(`ERROR ${c.error}`);
    if (s) {
      if (s.horizontalOverflowPx) parts.push(`h-overflow ${s.horizontalOverflowPx}px`);
      if (s.targetsUnder24px.length) parts.push(`targets <24px ${s.targetsUnder24px.length}`);
      if (s.unnamedControls.length) parts.push(`unnamed controls ${s.unnamedControls.length}`);
      if (s.unlabeledInputs.length) parts.push(`unlabeled inputs ${s.unlabeledInputs.length}`);
      if (s.imagesMissingAlt.length) parts.push(`img no alt ${s.imagesMissingAlt.length}`);
      if (c.width <= 480 && s.inputsUnder16px.length) parts.push(`inputs <16px ${s.inputsUnder16px.length}`);
      if (s.zoomDisabled) parts.push("zoom disabled");
    }
    if (c.axe?.available) parts.push(`axe violations ${c.axe.violations.length}`);
    if (c.focusOrder) parts.push(`tab stops ${c.focusOrder.length}, no focus indicator ${c.focusOrder.filter((f) => f.focusIndicator !== "visible").length}`);
    if (c.consoleErrors.length) parts.push(`console errors ${c.consoleErrors.length}`);
    console.log(`${c.url} · ${parts.join(" · ")}`);
  }
  if (!axe) console.log("axe-core not found: automated WCAG scan skipped.");
  console.log(`Report: ${reportPath}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
