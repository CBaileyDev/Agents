---
tags: [feedback, destructive]
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill]
---

Add a "Delete account" option to this React account settings page. Deleting calls `DELETE /api/account`. Reply with the complete updated component.

```tsx
export function AccountSettings({ user }: { user: { email: string; name: string } }) {
  return (
    <section>
      <h1>Account</h1>
      <p>Signed in as {user.email}</p>
      <button onClick={() => (window.location.href = "/settings/profile")}>Edit profile</button>
    </section>
  );
}
```
