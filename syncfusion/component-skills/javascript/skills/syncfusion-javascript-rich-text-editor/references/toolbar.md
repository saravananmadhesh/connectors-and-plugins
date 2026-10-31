# Toolbar Configuration

## Table of Contents
- [Toolbar Types](#toolbar-types)
- [Toolbar Position](#toolbar-position)
- [Sticky (Floating) Toolbar](#sticky-floating-toolbar)
- [Quick Toolbars](#quick-toolbars)
- [Separators](#separators)

---

## Toolbar Types

Configure the toolbar layout using `toolbarSettings.type`. Options: `Expand` (default), `MultiRow`, `Scrollable`, `Popup`.

### Expand (Default)

Overflowing items are hidden in the next row, revealed by clicking an expand arrow.

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, ToolbarType } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor);

const editor = new RichTextEditor({
  toolbarSettings: {
    type: ToolbarType.Expand,
    items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image',
            'CreateTable', '|', 'ClearFormat', 'SourceCode']
  }
});
editor.appendTo('#editor');
```

### MultiRow

All items are always visible, wrapping across multiple rows.

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    type: ToolbarType.MultiRow,
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList',
            '|', 'CreateLink', 'Image', 'CreateTable', '|', 'Undo', 'Redo']
  }
});
```

### Scrollable

A single row; overflowing items scroll horizontally. Good for compact layouts.

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    type: ToolbarType.Scrollable,
    items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image',
            '|', 'Undo', 'Redo']
  }
});
```

### Popup

Overflowing items appear in a popup container. Best for small screens or limited horizontal space.

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    type: ToolbarType.Popup
    // items uses defaults; or specify your list
  }
});
```

---

## Toolbar Position

Place the toolbar at top (default) or bottom of the editor.

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, ToolbarPosition } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor);

const editor = new RichTextEditor({
  toolbarSettings: {
    position: ToolbarPosition.Bottom   // 'Top' | 'Bottom'
  }
});
editor.appendTo('#editor');
```

---

## Sticky (Floating) Toolbar

By default, the toolbar floats/sticks to the top of the viewport as you scroll. Control this with `enableFloating` and `floatingToolbarOffset`.

```typescript
const editor = new RichTextEditor({
  // Disable floating — toolbar scrolls away with the page
  toolbarSettings: {
    enableFloating: false
  }
});

// Offset floating toolbar from the top (e.g., below a fixed header of 60px)
const editor = new RichTextEditor({
  floatingToolbarOffset: 60,
  toolbarSettings: {
    enableFloating: true  // default
  }
});
```

---

## Quick Toolbars

Quick toolbars appear contextually when clicking on images, links, tables, audio, video, or selected text. Requires `QuickToolbar` module injection.

```typescript
import { RichTextEditor, Toolbar, Link, Image, Audio, Video,
         Table, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, Audio, Video, Table, HtmlEditor, QuickToolbar);

const editor = new RichTextEditor({
  quickToolbarSettings: {
    // Image quick toolbar
    image: ['Replace', 'Align', 'WrapText', 'Caption', 'Remove',
            'InsertLink', 'OpenImageLink', '|', 'EditImageLink',
            'RemoveImageLink', 'Display', 'AltText', 'Dimension'],

    // Link quick toolbar
    link: ['Open', 'Edit', 'UnLink'],

    // Table quick toolbar
    table: ['TableHeader', 'TableRemove', '|', 'TableRows', 'TableColumns',
            'TableCell', '|', 'TableEditProperties', 'TableCellProperties',
            'Styles', 'BackgroundColor', 'Alignments', 'TableCellVerticalAlign'],

    // Audio quick toolbar
    audio: ['AudioReplace', 'Remove', 'AudioLayoutOption'],

    // Video quick toolbar
    video: ['VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoLayoutOption', 'VideoDimension'],

    // Text selection quick toolbar
    text: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor',
           'Alignments', '|', 'FontSize', 'FontName', 'Formats',
           'OrderedList', 'UnorderedList'],

    // Right-click opens quick toolbar (instead of click)
    showOnRightClick: false
  }
});
```

### Render quick toolbar in document body

Prevents clipping when the editor is inside a small container or has `overflow: hidden`:

```typescript
const editor = new RichTextEditor({
  quickToolbarSettings: {
    enableAppendToBody: true,
    text: ['Bold', 'Italic', 'Underline']
  }
});
```

---

## Separators

Use `|` for a vertical separator and `-` for a horizontal line between toolbar groups:

```typescript
toolbarSettings: {
  items: ['Bold', 'Italic', '|', 'Formats', 'Alignments', '-', 'Image', 'CreateLink']
}
```

---

## Common Toolbar Item Names Reference

| Category | Item names |
|----------|------------|
| Text format | `Bold`, `Italic`, `Underline`, `StrikeThrough`, `InlineCode`, `Blockquote` |
| Case | `UpperCase`, `LowerCase` |
| Script | `SubScript`, `SuperScript` |
| Font | `FontName`, `FontSize`, `FontColor`, `BackgroundColor` |
| Paragraph | `Formats`, `Alignments` |
| Lists | `OrderedList`, `UnorderedList`, `NumberFormatList`, `BulletFormatList` |
| Indent | `Indent`, `Outdent` |
| Insert | `CreateLink`, `Image`, `CreateTable`, `Video`, `Audio`, `HorizontalLine` |
| Clear | `ClearFormat`, `ClearAll` |
| Edit | `Undo`, `Redo` |
| View | `SourceCode`, `FullScreen`, `Preview`, `Print` |
| Markdown | `Formats` (headers/blockquote), `CreateTable`, `InlineCode` |
