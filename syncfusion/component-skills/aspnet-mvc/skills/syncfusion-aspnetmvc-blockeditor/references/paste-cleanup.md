# Paste Cleanup — Syncfusion ASP.NET MVC Block Editor

The Block Editor sanitizes pasted content from external sources (web pages, Word processors) to maintain consistent styling and prevent unwanted markup.

## PasteCleanupSettings Properties

| Property | Type | Description | Default |
|---|---|---|---|
| `DeniedTags` | string[] | HTML tags stripped from pasted content | `["script", "style"]` |
| `KeepFormat` | bool | Preserve formatting of pasted content | `true` |
| `PlainText` | bool | Paste as plain text, stripping all HTML/styles | `false` |

---

## Denied Tags

Strip specific HTML tags entirely from pasted content. Use to prevent `<script>`, `<iframe>`, or other potentially harmful elements:

```razor
@{
    var deniedTags = new string[] { "script", "iframe" };
}

@Html.EJS().BlockEditor("block-editor")
    .PasteCleanupSettings(new PasteCleanupSettings { DeniedTags = deniedTags })
    .Render()
```

---

## Disable Keep Format

Set `KeepFormat = false` to paste content as plain text. Useful for enforcing a clean paste experience:

```razor
@Html.EJS().BlockEditor("block-editor")
    .PasteCleanupSettings(new PasteCleanupSettings { KeepFormat = false })
    .Render()
```

---

## Force Plain Text Paste

Set `PlainText = true` to strip all HTML tags and inline styles, inserting raw text only:

```razor
@Html.EJS().BlockEditor("block-editor")
    .PasteCleanupSettings(new PasteCleanupSettings { PlainText = true })
    .Render()
```

> `PlainText = true` - all formatting is stripped.

---

## Paste Events

Use `BeforePasteCleanup` to intercept and `AfterPasteCleanup` to post-process:

```razor
@Html.EJS().BlockEditor("block-editor")
    .BeforePasteCleanup("onBeforePaste")
    .AfterPasteCleanup("onAfterPaste")
    .Render()
```

```javascript
function onBeforePaste(args) {
    // Inspect content before cleanup
    // Set args.cancel = true to abort the paste
}

function onAfterPaste(args) {
    // Content has been pasted and cleaned
    console.log('Processed content length:', args.content.length);
}
```

| Event | Args | Description |
|---|---|---|
| `BeforePasteCleanup` | `BeforePasteCleanupEventArgs` | Fires before content is pasted |
| `AfterPasteCleanup` | `AfterPasteCleanupEventArgs` | Fires after content is pasted and cleaned |
