# Link (Hyperlinks)

> Requires module injection: `Link`, `QuickToolbar`

## Table of Contents
- [Enable Link Tool](#enable-link-tool)
- [Insert Link Dialog Fields](#insert-link-dialog-fields)
- [Auto Link Generation](#auto-link-generation)
- [Relative URLs (enableAutoUrl)](#relative-urls-enableautourl)
- [Link Quick Toolbar](#link-quick-toolbar)
- [Edit and Remove Links](#edit-and-remove-links)
- [Image Hyperlinks](#image-hyperlinks)

---

## Enable Link Tool

```typescript
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['CreateLink', 'RemoveLink']
  }
});
editor.appendTo('#editor');
```

---

## Insert Link Dialog Fields

When you click `CreateLink` (or the Insert HyperLink toolbar button):

| Field | Description |
|-------|-------------|
| Web Address | URL — automatically prefixed with `https://` unless `enableAutoUrl: true` |
| Display Text | Visible link text (pre-filled from selection) |
| Tooltip | Title attribute — shown on hover |
| Open Link in New Window | Sets `target="_blank"` |

> URLs entered in the dialog are validated in real time. Invalid URLs are highlighted in red.

---

## Auto Link Generation

When you type a URL and press `Space` or `Enter`, the editor automatically converts it into a clickable `<a>` tag.

```typescript
const editor = new RichTextEditor({
  // No extra config needed — auto-link is on by default
});
```

---

## Relative URLs (enableAutoUrl)

By default, the editor prefixes `https://` to any URL that doesn't start with a protocol. To accept relative URLs as-is (without prepending a protocol or domain):

```typescript
const editor = new RichTextEditor({
  enableAutoUrl: true,  // accept relative/custom URLs unchanged
  toolbarSettings: { items: ['CreateLink'] }
});
```

---

## Link Quick Toolbar

Appears when a link is focused in the editor:

```typescript
const editor = new RichTextEditor({
  quickToolbarSettings: {
    link: ['Open', 'Edit', 'UnLink']
  }
});
```

| Item | Description |
|------|-------------|
| `Open` | Open link in a new tab |
| `Edit` | Re-open insert link dialog to modify |
| `UnLink` | Remove hyperlink (keep text) |

---

## Edit and Remove Links

**Via quick toolbar:**
1. Click a hyperlink in the editor to focus it
2. Click **Edit** in the quick toolbar → modify fields → confirm
3. Click **UnLink** to remove the hyperlink while keeping the text

**Via toolbar:**
1. Select the linked text
2. Click **RemoveLink** in the toolbar

---

## Image Hyperlinks

An image can itself be a hyperlink. When an image with a link is focused:
- The image quick toolbar shows link-specific actions: `OpenImageLink`, `EditImageLink`, `RemoveImageLink`

```typescript
const editor = new RichTextEditor({
  quickToolbarSettings: {
    image: [
      'Replace', 'Caption', 'Remove', '|',
      'InsertLink', 'OpenImageLink', 'EditImageLink', 'RemoveImageLink'
    ]
  }
});
```

### Insert a hyperlink on an image programmatically

```typescript
// Insert image with link via HTML value
editor.value = `<a href="https://example.com" target="_blank">
  <img src="https://example.com/image.png" alt="linked image" class="e-rte-image e-imginline" />
</a>`;
editor.dataBind();
```
