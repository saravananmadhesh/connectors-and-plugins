# Security (XSS Prevention) — Syncfusion ASP.NET MVC Block Editor

## Built-in HTML Sanitizer

The Block Editor has built-in cross-site scripting (XSS) protection enabled by default via the `EnableHtmlSanitizer` property.

When active, the sanitizer automatically removes elements and attributes from editor content that could execute scripts:

- Removes `<script>` tags and their content
- Removes event attributes such as `onmouseover`, `onclick`, `onerror`
- Removes `javascript:` protocol from `href` and `src` attributes
- Strips `<iframe>` and similar embed elements with execution risk

## Default Behavior

XSS protection is **on by default**. No configuration is required:

```razor
@Html.EJS().BlockEditor("block-editor").Render()
// EnableHtmlSanitizer defaults to true
```

## Explicitly Enable

```razor
@Html.EJS().BlockEditor("block-editor").EnableHtmlSanitizer(true).Render()
```

## Disable (Not Recommended)

Only disable sanitization if your application guarantees content safety through another mechanism:

```razor
@Html.EJS().BlockEditor("block-editor").EnableHtmlSanitizer(false).Render()
```

> Disabling `EnableHtmlSanitizer` exposes the editor to XSS attacks from user-supplied or pasted content. Only disable when all content is trusted and server-side sanitization is in place.

---

## HTML Encoding

Use `EnableHtmlEncode` to escape special HTML characters (`<`, `>`, `&`, `"`) in editor content. When enabled, content is stored and output as HTML-encoded strings rather than raw markup.

```razor
@Html.EJS().BlockEditor("block-editor").EnableHtmlEncode(true).Render()
```

This is disabled by default (`false`). Enable it when you need to display editor output in a context that does not render HTML, such as a plain-text field or JSON API response that will be consumed without further sanitization.

| Property | Default | Description |
|---|---|---|
| `EnableHtmlEncode` | `false` | Encode special HTML characters in editor content |
| `EnableHtmlSanitizer` | `true` | Strip dangerous tags and attributes from content |

> `EnableHtmlSanitizer` and `EnableHtmlEncode` serve different purposes. Use the sanitizer (default) to prevent XSS in rendered HTML. Use encoding only when the output will be treated as plain text or stored raw without HTML rendering.

---

## Paste-Time XSS Protection

The paste cleanup pipeline provides a second layer of protection. Use `DeniedTags` in `PasteCleanupSettings` to strip dangerous tags from pasted content regardless of sanitizer state:

```razor
@{
    var deniedTags = new string[] { "script", "iframe", "object", "embed" };
}

@Html.EJS().BlockEditor("block-editor")
    .EnableHtmlSanitizer(true)
    .PasteCleanupSettings(new PasteCleanupSettings { DeniedTags = deniedTags })
    .Render()
```

> Use both `EnableHtmlSanitizer` and `PasteCleanupSettings.DeniedTags` together for defence-in-depth when handling content from untrusted sources.
