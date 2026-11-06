# Clipboard — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Copy Selected Rows](#copy-selected-rows)
- [Copy with Column Headers](#copy-with-column-headers)
- [Custom Copy Separator](#custom-copy-separator)
- [Keyboard Shortcut](#keyboard-shortcut)

## When to Use This

- Enable users to copy grid data to clipboard
- Support keyboard shortcuts for copying (Ctrl+C)
- Include column headers in copied content
- Customize copy separators for pasting to other apps

---

## Copy Selected Rows

The grid supports copying selected rows to the clipboard. Enable with `allowTextWrap` or simply use the default copy behavior. Select rows and press **Ctrl+C**:

To add a **Copy** button in the toolbar or context menu:
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "CopyWithHeader" })"
          contextMenuItems="@(new List<object>() { "Copy" })">
```

Trigger programmatically:
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.copy();           // Copy without headers
grid.copy(true);       // Copy with column headers
```

---

## Copy with Column Headers

Include column header text in the copied content using `copy(true)` or the `CopyWithHeader` toolbar item:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "CopyWithHeader" })">
```

---

## Custom Copy Separator

By default, fields are tab-separated (`\t`). Change the separator via `clipboardSettings`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-clipboardsettings copyHierarchyMode="Parent" separator=","></e-grid-clipboardsettings>
</ejs-grid>
```

This makes the copied text comma-separated — useful for pasting into CSV editors.

---

## Keyboard Shortcut

| Shortcut | Action |
|---|---|
| **Ctrl+C** | Copy selected rows (without headers) |
| **Ctrl+Shift+H** | Copy selected rows with column headers |

> Clipboard operations work on currently selected rows or cells. Ensure at least one row/cell is selected before copying.
