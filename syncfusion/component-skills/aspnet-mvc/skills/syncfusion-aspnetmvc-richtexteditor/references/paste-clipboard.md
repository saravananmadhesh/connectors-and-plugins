# Paste and Clipboard

## Table of Contents
- [Paste Cleanup Overview](#paste-cleanup-overview)
- [Configuring Paste Cleanup](#configuring-paste-cleanup)
- [Paste Events](#paste-events)
- [Restricting Paste from External Sources](#restricting-paste-from-external-sources)

---

## Paste Cleanup Overview

When users paste content copied from Microsoft Word, web pages, or other rich text sources, it may carry unwanted styles, classes, or markup. The RTE's **paste cleanup** feature automatically strips or normalizes this content before inserting it into the editor.

By default, pasting from external sources prompts the user to choose between:
- **Keep** — preserve the pasted formatting
- **Clean** — strip formatting and paste as plain text
- **Plain Text** — strip all HTML and paste only text

---

## Configuring Paste Cleanup

Use `PasteCleanupSettings` to control what gets removed on paste:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .PasteCleanupSettings(p => p
        .Prompt(true)
        .PlainText(false)
        .KeepFormat(false)
        .DeniedTags(new[] { "a" })
        .DeniedAttrs(new[] { "class", "id", "style" })
        .AllowedStyleProps(new[] { "color", "font-size", "font-weight" })
    )
    .Value(ViewBag.value)
    .Render())
```

**Key settings:**

| Property | Type | Description |
|----------|------|-------------|
| `Prompt` | `bool` | Show keep/clean/plain dialog on paste |
| `PlainText` | `bool` | Always paste as plain text |
| `KeepFormat` | `bool` | Always keep pasted formatting |
| `DeniedTags` | `string[]` | HTML tags to strip (e.g., `"a"`, `"script"`) |
| `DeniedAttrs` | `string[]` | HTML attributes to remove (e.g., `"class"`, `"style"`) |
| `AllowedStyleProps` | `string[]` | Inline style properties to preserve |

**Strip all formatting on paste (always plain text):**

```cshtml
.PasteCleanupSettings(p => p.PlainText(true))
```

**Silent keep (no dialog, keep formatting):**

```cshtml
.PasteCleanupSettings(p => p.Prompt(false).KeepFormat(true))
```

**Silent clean (no dialog, strip all):**

```cshtml
.PasteCleanupSettings(p => p.Prompt(false).KeepFormat(false))
```

---

## Paste Events

Hook into paste events to implement custom logic before or after content is pasted:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .BeforePasteCleanup("onBeforePaste")
    .AfterPasteCleanup("onAfterPaste")
    .Render())

<script>
    function onBeforePaste(args) {
        // args.value contains the raw pasted HTML
        // Modify it or set args.cancel = true to block the paste
        console.log('Before paste:', args.value);
    }

    function onAfterPaste(args) {
        // args.value contains the cleaned HTML after paste cleanup
        console.log('After paste:', args.value);
    }
</script>
```

---

## Restricting Paste from External Sources

To detect whether pasted content comes from an external source (e.g., Word) and apply stricter rules:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .BeforePasteCleanup("onBeforePaste")
    .PasteCleanupSettings(p => p.Prompt(false).KeepFormat(false))
    .Render())

<script>
    function onBeforePaste(args) {
        // Check for Word-generated markup
        if (args.value && args.value.indexOf('MsoNormal') !== -1) {
            // Strip all Word-specific classes and styles
            args.value = args.value.replace(/class="[^"]*Mso[^"]*"/gi, '');
            args.value = args.value.replace(/style="[^"]*mso-[^"]*"/gi, '');
        }
    }
</script>
```
