# Tools (Built-in & Custom)

## Table of Contents
- [Default Toolbar Items](#default-toolbar-items)
- [Built-in Tools Reference](#built-in-tools-reference)
- [Removing Built-in Tools](#removing-built-in-tools)
- [Custom Toolbar Commands](#custom-toolbar-commands)
- [Enabling and Disabling Items Programmatically](#enabling-and-disabling-items-programmatically)
- [Text Formatting Tools Detail](#text-formatting-tools-detail)
- [Fullscreen Tool](#fullscreen-tool)

---

## Default Toolbar Items

Out of the box, when no `toolbarSettings` is configured, the RTE renders:

```
Bold | Italic | Underline | Formats | Alignments | Blockquote | OrderedList | UnorderedList | CreateLink | Image | SourceCode | Undo | Redo
```

---

## Built-in Tools Reference

### Text Formatting

| Item name | Description |
|-----------|-------------|
| `Bold` | Bold selected text |
| `Italic` | Italic selected text |
| `Underline` | Underline selected text |
| `StrikeThrough` | Strikethrough selected text |
| `InlineCode` | Inline code formatting |
| `Blockquote` | Blockquote paragraph |
| `SubScript` | Subscript |
| `SuperScript` | Superscript |
| `LowerCase` | Convert to lowercase |
| `UpperCase` | Convert to uppercase |
| `ClearFormat` | Remove all formatting from selection |

### Font & Paragraph

| Item name | Description |
|-----------|-------------|
| `FontName` | Font family dropdown |
| `FontSize` | Font size dropdown |
| `FontColor` | Font color picker |
| `BackgroundColor` | Background/highlight color |
| `Formats` | Paragraph format (Normal, H1–H6, Pre) |
| `Alignments` | Alignment dropdown (Left, Center, Right, Justify) |
| `JustifyLeft` | Explicit left align |
| `JustifyCenter` | Explicit center align |
| `JustifyRight` | Explicit right align |
| `JustifyFull` | Full justify |

### Lists & Indentation

| Item name | Description |
|-----------|-------------|
| `OrderedList` | Numbered list |
| `UnorderedList` | Bullet list |
| `NumberFormatList` | Numbered list with style variants |
| `BulletFormatList` | Bullet list with style variants |
| `Indent` | Increase indent |
| `Outdent` | Decrease indent |

### Insert

| Item name | Description |
|-----------|-------------|
| `CreateLink` | Insert hyperlink |
| `Image` | Insert image |
| `CreateTable` | Insert table |
| `Audio` | Insert audio |
| `Video` | Insert video |
| `HorizontalLine` | Insert horizontal rule |
| `InsertCode` | Insert preformatted code block |

### Utilities

| Item name | Description |
|-----------|-------------|
| `Undo` | Undo last action |
| `Redo` | Redo last undone action |
| `SourceCode` | Toggle HTML source view |
| `FullScreen` / `Maximize` | Expand editor to full viewport |
| `Minimize` | Shrink back to default size |
| `Preview` | Preview rendered content |
| `Print` | Print editor content |
| `ClearAll` | Clear all content |

---

## Removing Built-in Tools

Simply omit the unwanted items from `toolbarSettings.items`:

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['Bold', 'Italic', 'Underline',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            '|', 'Undo', 'Redo']
    // SourceCode, Image, etc. are excluded
  }
});
```

---

## Custom Toolbar Commands

Add a custom button anywhere in the toolbar by passing an object in `items` instead of a string.

```typescript
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

const editor = new RichTextEditor({
  toolbarSettings: {
    items: [
      'Bold', 'Italic', '|',
      {
        tooltipText: 'Insert Special Character',
        command: 'Custom',   // marks this as a custom command
        undo: true,          // participates in undo/redo
        click: () => {
          // your custom logic here
          openSpecialCharPicker();
        },
        template: `<button class="e-tbar-btn e-btn" tabindex="-1">
                     <div class="e-tbar-btn-text" style="font-weight:500;">Ω</div>
                   </button>`
      },
      '|', 'Undo', 'Redo'
    ]
  }
});
editor.appendTo('#editor');

function openSpecialCharPicker() {
  // show a dialog or popup with special characters
}
```

**Custom command object properties:**

| Property | Description |
|----------|-------------|
| `tooltipText` | Tooltip shown on hover |
| `command` | Set to `'Custom'` to disable during source view |
| `undo` | `true` if the action should be undoable |
| `click` | Click handler function |
| `template` | HTML string for the button element |

> When rendering a component (e.g., dropdown) inside a custom toolbar item, add the `e-rte-elements` CSS class to that component to prevent focus-related issues.

---

## Enabling and Disabling Items Programmatically

Use `enableToolbarItem` and `disableToolbarItem` to dynamically toggle toolbar items.

```typescript
// Disable specific items
editor.disableToolbarItem(['Bold', 'Italic', 'Image']);

// Re-enable them
editor.enableToolbarItem(['Bold', 'Italic', 'Image']);

// Disable all items
editor.disableToolbarItem(['Bold', 'Italic', 'Underline', 'Image', /* all items */]);
```

**Typical use case:** Disable items based on user permissions or content mode (e.g., disable image insertion for free-tier users).

---

## Text Formatting Tools Detail

### Styling Tools (Color, Background)

When using font/background color pickers, you can configure the available color palette:

```typescript
const editor = new RichTextEditor({
  fontColor: {
    columns: 10,
    colorCode: {
      'Custom': ['#000', '#333', '#666', '#fff', '#f00', '#0f0', '#00f']
    }
  },
  backgroundColor: {
    columns: 10,
    colorCode: {
      'Custom': ['#ffff00', '#ff6600', '#00ccff']
    }
  }
});
```

### Format (Paragraph) Dropdown

Customize the format dropdown options:

```typescript
const editor = new RichTextEditor({
  format: {
    types: [
      { text: 'Paragraph', value: 'P' },
      { text: 'Heading 1', value: 'H1' },
      { text: 'Heading 2', value: 'H2' },
      { text: 'Heading 3', value: 'H3' },
      { text: 'Code', value: 'Pre' }
    ]
  }
});
```

---

## Fullscreen Tool

Inject no extra module — `FullScreen` is a built-in item:

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['Bold', 'Italic', '|', 'Undo', 'Redo', '|', 'FullScreen']
  }
});
```

Programmatically toggle fullscreen:

```typescript
editor.showFullScreen(); // expand
editor.hideFullScreen(); // collapse
```
