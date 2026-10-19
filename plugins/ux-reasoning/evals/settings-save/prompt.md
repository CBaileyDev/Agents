---
tags: [feedback, forms]
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill]
---

Add a "Save changes" button to this settings form. It should `PUT` the form values as JSON to `/api/settings`. Reply with the complete updated component.

```tsx
import { useState } from "react";

export function NotificationSettings({ initial }: { initial: { email: boolean; digest: "daily" | "weekly" } }) {
  const [email, setEmail] = useState(initial.email);
  const [digest, setDigest] = useState(initial.digest);
  return (
    <form>
      <label>
        <input type="checkbox" checked={email} onChange={(e) => setEmail(e.target.checked)} />
        Email notifications
      </label>
      <label>
        Digest frequency
        <select value={digest} onChange={(e) => setDigest(e.target.value as "daily" | "weekly")}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </label>
    </form>
  );
}
```
