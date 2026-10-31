# Table

> Requires module injection: `Table`, `QuickToolbar`

## Table of Contents
- [Enable Table Tool](#enable-table-tool)
- [Table Quick Toolbar](#table-quick-toolbar)
- [Table Settings](#table-settings)
- [Cell Properties](#cell-properties)
- [Merge and Split Cells](#merge-and-split-cells)
- [Table Selection and Keyboard Shortcuts](#table-selection-and-keyboard-shortcuts)
- [Table Styles](#table-styles)

---

## Enable Table Tool

```typescript
import { RichTextEditor, Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table);

const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['CreateTable']
  }
});
editor.appendTo('#editor');
```

---

## Table Quick Toolbar

Configure quick toolbar items shown when a table cell is focused:

```typescript
const editor = new RichTextEditor({
  quickToolbarSettings: {
    table: [
      'TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-',
      'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign',
      'TableCellHorizontalAlign', 'Styles', 'TableCellProperties'
    ]
  }
});
```

| Quick Toolbar Item | Description |
|-------------------|-------------|
| `TableHeader` | Add/remove header row |
| `TableRows` | Insert row above/below, delete row |
| `TableColumns` | Insert column left/right, delete column |
| `TableCell` | Merge/split cells |
| `BackgroundColor` | Set cell background color |
| `TableRemove` | Delete the entire table |
| `TableCellVerticalAlign` | Top/middle/bottom alignment |
| `TableCellHorizontalAlign` | Left/center/right/justify alignment |
| `Styles` | Apply Dashed Border or Alternate Row style |
| `TableCellProperties` | Open cell dimension/border/alignment dialog |

---

## Table Settings

Default table width on insert:

```typescript
const editor = new RichTextEditor({
  tableSettings: {
    width: '100%',          // default table width
    columnWidth: '150px',   // default column width
    minWidth: 0,
    maxWidth: 'auto'
  }
});
```

---

## Cell Properties

The `TableCellProperties` quick toolbar item opens a dialog to customize individual cells or selections:

| Option | Description |
|--------|-------------|
| Width | Cell width (px, %, auto) |
| Height | Cell height (px, %, auto) |
| Cell Padding | Internal spacing |
| Horizontal Alignment | left / center / right / justify |
| Vertical Alignment | top / middle / bottom |
| Border Style | Solid, dashed, dotted, etc. |
| Border Width | Thickness in px (default: 1px) |
| Border Color | Custom border color |
| Background Color | Cell background fill |

All changes show a live preview in the editor before confirming.

---

## Merge and Split Cells

Use `TableCell` in the quick toolbar to enable merge/split:

```typescript
quickToolbarSettings: {
  table: ['TableCell']
}
```

- **Merge**: Select multiple cells → quick toolbar → Merge Cells
- **Split**: Select a merged cell → quick toolbar → Split Cell (horizontal or vertical)

---

## Table Selection and Keyboard Shortcuts

### Mouse selection
- Click and drag over cells to select multiple cells/rows/columns
- Hover over the first row → click column handle at top to select entire column
- Hover over the first column → click row handle at left to select entire row
- Hover over table → click top-left handle to select entire table

### Keyboard shortcuts

| Action | Shortcut |
|--------|----------|
| Select current cell | `Ctrl + A` (1st press) |
| Select current row | `Ctrl + A` (2nd press) |
| Select entire table | `Ctrl + A` (3rd press) |
| Select all RTE content | `Ctrl + A` (4th press) |
| Extend cell selection | `Shift + Arrow keys` |
| Select table (before) | `Delete` key immediately before the table |
| Select table (after) | `Backspace` key immediately after the table |

### Copy, Cut, Paste table content

After selecting cells:

| Action | Windows | Mac |
|--------|---------|-----|
| Copy | `Ctrl + C` | `⌘ + C` |
| Cut | `Ctrl + X` | `⌘ + X` |
| Paste | `Ctrl + V` | `⌘ + V` |

- Pastes preserve table structure and formatting
- Supports cross-table and external paste (from Excel/Word)

---

## Table Styles

Apply pre-built styles via the `Styles` quick toolbar item:

| Style Class | Effect |
|------------|--------|
| `e-dashed-border` | Dashes borders on all cells |
| `e-alternate-rows` | Alternating row background |

### Nesting tables

Place cursor inside a cell, then insert another table using the toolbar or HTML source editing. Tables can nest to any depth.

```html
<table class="e-rte-table" style="width:100%;">
  <tr>
    <td>
      <!-- Nested table -->
      <table class="e-rte-table" style="width:100%;">
        <tr><th>Col A</th><th>Col B</th></tr>
        <tr><td>Data</td><td>Data</td></tr>
      </table>
    </td>
  </tr>
</table>
```
