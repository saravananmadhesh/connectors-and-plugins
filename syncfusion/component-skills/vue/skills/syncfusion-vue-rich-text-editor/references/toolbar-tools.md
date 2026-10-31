# Toolbar Tools Reference

## Table of Contents
- [Default Toolbar Items](#default-toolbar-items)
- [Text Formatting](#text-formatting)
- [Font and Styling](#font-and-styling)
- [Alignment](#alignment)
- [Lists and Indentation](#lists-and-indentation)
- [Hyperlinks](#hyperlinks)
- [Images](#images)
- [Tables](#tables)
- [Horizontal Line](#horizontal-line)
- [Undo and Redo](#undo-and-redo)
- [Other Tools](#other-tools)
- [Markdown-Specific Items](#markdown-specific-items)
- [Configuring Items](#configuring-items)

## Default Toolbar Items

When no `toolbarSettings` is provided, the editor renders:

```
Bold | Italic | Underline | | Formats | Alignments | Blockquote | OrderedList | UnorderedList | | CreateLink | Image | | SourceCode | Undo | Redo
```

## Text Formatting

| Item | Description |
|------|-------------|
| `Bold` | Makes selected text bold |
| `Italic` | Italicizes selected text |
| `Underline` | Underlines selected text |
| `StrikeThrough` | Applies strikethrough to selected text |
| `ClearFormat` | Removes all formatting (bold, italic, color, etc.) from selection |
| `Blockquote` | Visually highlights text as a block quote |
| `SubScript` | Makes selected text subscript (lower) |
| `SuperScript` | Makes selected text superscript (higher) |
| `LowerCase` | Converts selected text to lowercase |
| `UpperCase` | Converts selected text to uppercase |

## Font and Styling

| Item | Description |
|------|-------------|
| `FontName` | Font family dropdown |
| `FontSize` | Font size dropdown |
| `FontColor` | Font color picker |
| `BackgroundColor` | Background/highlight color picker |
| `Formats` | Paragraph format dropdown (Normal, Heading 1–6, Preformatted, etc.) |

## Alignment

| Item | Description |
|------|-------------|
| `Alignments` | Combined alignment dropdown (left, center, right, justify) |
| `JustifyLeft` | Align text to the left |
| `JustifyCenter` | Center-align text |
| `JustifyRight` | Align text to the right |
| `JustifyFull` | Justify text to both margins |

## Lists and Indentation

| Item | Description |
|------|-------------|
| `OrderedList` | Creates a numbered list |
| `UnorderedList` | Creates a bulleted list |
| `NumberFormatList` | Numbered list with style type options |
| `BulletFormatList` | Bulleted list with style type options |
| `Indent` | Increases indent level |
| `Outdent` | Decreases indent level |

## Hyperlinks

| Item | Description |
|------|-------------|
| `CreateLink` | Opens dialog to insert or edit a hyperlink |
| `InsertLink` | Alias for inserting a link on a selected item |

**Link quick toolbar items** (configure in `quickToolbarSettings.link`):

| Item | Description |
|------|-------------|
| `OpenLink` | Opens the attached URL |
| `EditLink` | Edits the link URL |
| `RemoveLink` | Removes the hyperlink |

## Images

| Item | Description |
|------|-------------|
| `Image` | Opens dialog to insert an image (URL or file upload) |

**Image quick toolbar items** (configure in `quickToolbarSettings.image`):

| Item | Description |
|------|-------------|
| `Replace` | Replace selected image with another |
| `Align` | Block-level alignment (left, right, center) |
| `Remove` | Removes the image |
| `Display` | Toggle inline vs block display |
| `AltText` | Set alternative text |
| `Caption` | Add a caption container around the image |
| `WrapText` | Wrap text to left or right of image |
| `Dimension` | Set custom width and height |
| `OpenImageLink` | Open the link attached to the image |
| `EditImageLink` | Edit the image's link |
| `RemoveImageLink` | Remove the image's link |

## Tables

| Item | Description |
|------|-------------|
| `CreateTable` | Insert a table (click to pick rows/columns) |

**Table quick toolbar items** (configure in `quickToolbarSettings.table`):

| Item | Description |
|------|-------------|
| `TableRemove` | Delete the entire table |
| `TableHeader` | Toggle a header row |
| `TableColumns` | Insert or delete a column |
| `TableRows` | Insert or delete a row |
| `TableCellHorizontalAlign` | Horizontally align cell content |
| `TableCellVerticalAlign` | Vertically align cell content |
| `TableEditProperties` | Edit width, padding, cell spacing |

## Horizontal Line

| Item | Description |
|------|-------------|
| `HorizontalLine` | Inserts a `<hr>` horizontal rule |

## Undo and Redo

| Item | Description |
|------|-------------|
| `Undo` | Undo the last action |
| `Redo` | Redo the last undone action |

## Other Tools

| Item | Description |
|------|-------------|
| `FullScreen` | Expands editor to full browser window |
| `Maximize` | Same as FullScreen |
| `Minimize` | Restores editor to default size |
| `Preview` | Preview rendered content in a browser-like view |
| `InsertCode` | Insert preformatted code block |
| `Print` | Print editor content |
| `ClearAll` | Clear all content from the editor |
| `SourceCode` | Toggle between WYSIWYG and HTML source view |
| `EmojiPicker` | Open emoji picker panel (requires `EmojiPicker` module) |

## Markdown-Specific Items

When using `editorMode="Markdown"`, use these items in place of HTML-only tools:

```js
toolbarSettings: {
  items: [
    'Bold', 'Italic', 'StrikeThrough', '|',
    'Formats',          // Heading formats (h1-h6, blockquote)
    'OrderedList', 'UnorderedList', '|',
    'CreateLink',
    'Image',            // Inserts image via URL (no file upload in Markdown mode)
    'CreateTable',      // Inserts a Markdown table
    '|', 'Undo', 'Redo'
  ]
}
```

Note: `SourceCode`, `FontName`, `FontSize`, `FontColor`, `BackgroundColor`, `Alignments` are not relevant in Markdown mode.

## Configuring Items

### Minimal toolbar

```js
toolbarSettings: {
  items: ['Bold', 'Italic', 'Underline', '|', 'Undo', 'Redo']
}
```

### Full HTML toolbar

```js
toolbarSettings: {
  items: [
    'Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
  ]
}
```

### Remove a built-in tool

Simply omit the item from the `items` array — the editor only renders what is listed.

```js
// Remove SourceCode, Print, FullScreen:
toolbarSettings: {
  items: ['Bold', 'Italic', 'Underline', '|', 'Formats',
    'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'Undo', 'Redo']
}
```

> Use `'|'` to insert visual separators between groups of related items.
