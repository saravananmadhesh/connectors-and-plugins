# TreeGrid Cell Features

## When to Use This Reference

Read this reference when you need to:
- Customize cell styles and appearance based on data (queryCellInfo event)
- Apply conditional cell formatting (colors, borders, classes)
- Control text overflow behavior (ellipsis, clipping, wrapping)
- Set cell display modes for long content (Clip, Ellipsis, EllipsisWithTooltip)
- Enable text wrapping for multi-line cell content (allowTextWrap)
- Configure wrap modes (Header, Content, Both)
- Control grid borders and grid lines display
- Apply CSS classes to cells for styling
- Handle cell tooltips and hover effects
- Merge cells horizontally or vertically

---

## Table of Contents

- [Cell Basics](#cell-basics)
- [Cell Grid Lines](#cell-grid-lines)
- [Cell Custom Attributes](#cell-custom-attributes)
- [Text Wrapping](#text-wrapping)
- [Clip Mode](#clip-mode)
- [Cell Spanning](#cell-spanning)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Cell Basics

Customize individual cell appearance using the `queryCellInfo` event, which fires for every cell during render.

```typescript
import { TreeGrid, QueryCellInfoEventArgs } from '@syncfusion/ej2-treegrid';

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    height: 300,
    queryCellInfo: customiseCell,  // Event for each cell
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');

function customiseCell(args: QueryCellInfoEventArgs) {
    // args.cell = cell DOM element
    // args.column = column definition
    // args.colIndex = column index
    // Apply styling here
}
```

**Key Properties:**
- `args.cell` - HTML table cell element
- `args.column` - Column configuration object
- `args.colIndex` - Column index (0-based)
- `args.rowData` - Row data object


## Cell Grid Lines

Control the display of grid borders between cells. Options: Both, Horizontal, Vertical, None, Default.

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    height: 300,
    gridLines: 'Both',  // Show both horizontal and vertical borders
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 160 },
        { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Grid Line Options

| Option | Result |
|--------|--------|
| `'Both'` | Horizontal + Vertical borders on all cells |
| `'Horizontal'` | Only horizontal borders (rows) |
| `'Vertical'` | Only vertical borders (columns) |
| `'None'` | No borders |
| `'Default'` | Theme-based borders (default) |

---

## Cell Custom Attributes

Apply CSS classes and custom attributes to cells for styling via column `customAttributes` property.

### Using CSS Classes

**CSS:**
```css
.e-attr-highlight {
    background: #d7f0f4;
    font-weight: bold;
}

.e-attr-warning {
    background: #ffe6e6;
    color: #c00;
}
```

**TreeGrid Configuration:**
```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    height: 300,
    treeColumnIndex: 1,
    columns: [
        {
            field: 'taskID',
            headerText: 'Task ID',
            width: 90,
            customAttributes: { class: 'e-attr-highlight' },  // Apply CSS class
            textAlign: 'Right'
        },
        { field: 'taskName', headerText: 'Task Name', width: 160 },
        {
            field: 'startDate',
            headerText: 'Start Date',
            width: 90,
            customAttributes: { class: 'e-attr-highlight' },
            textAlign: 'Right',
            type: 'date',
            format: 'yMd'
        },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Result:** TaskID and StartDate columns styled with light blue background and bold text.

---

## Text Wrapping

Enable multi-line cell content by wrapping text to fit within column width. Set `allowTextWrap: true` and configure wrap mode.

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    height: 300,
    allowTextWrap: true,  // Enable text wrapping
    textWrapSettings: {
        wrapMode: 'Content'  // Wrap only cell content (not headers)
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 75 },
        { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Wrap Modes

| Mode | Behavior |
|------|----------|
| `'Both'` | Wrap both headers and cell content (default) |
| `'Header'` | Wrap only headers when text overflows |
| `'Content'` | Wrap only cell content when text overflows |

**Example with Header Wrapping:**
```typescript
textWrapSettings: {
    wrapMode: 'Header'  // Only headers wrap
}
```

**Important:** When column width is not specified, wrapped columns adjust relative to grid width.

---

## Clip Mode

Control how overflowing cell content is handled. Options: Clip (truncate), Ellipsis (show "..."), EllipsisWithTooltip.

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

let treeGridObj = new TreeGrid({
    dataSource: complexData,
    childMapping: 'subtasks',
    height: 300,
    gridLines: 'Both',
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', clipMode: 'Clip', width: 70 },
        { field: 'assignee', headerText: 'Assignee', clipMode: 'Ellipsis', width: 90 },
        { field: 'priority', headerText: 'Priority', clipMode: 'EllipsisWithTooltip', width: 90 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Clip Mode Options

| Mode | Behavior | Example |
|------|----------|---------|
| `'Clip'` | Truncate text silently (no indicator) | "Very long task n..." becomes hidden |
| `'Ellipsis'` | Show "..." when text overflows | "Very long task..." |
| `'EllipsisWithTooltip'` | Show "..." + tooltip on hover | "Very long..." → Full text on hover |

**Default:** `'Ellipsis'`

### EllipsisWithTooltip Example

```typescript
{
    field: 'taskName',
    headerText: 'Task Name',
    clipMode: 'EllipsisWithTooltip',
    width: 100
}
// When task name is longer than 100px, shows "..." 
// Hovering displays full text in tooltip
```

---

## Cell Spanning

Merge cells horizontally to create multi-column cells or vertically to create multi-row cells.

### Horizontal Cell Spanning

```typescript
import { TreeGrid, QueryCellInfoEventArgs } from '@syncfusion/ej2-treegrid';

function customiseCell(args: QueryCellInfoEventArgs) {
    if (args.column.field === 'taskID' && args.rowData.taskID === 1) {
        // Merge this cell with next 2 columns
        args.cell.colSpan = 3;
    }
}

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    height: 300,
    queryCellInfo: customiseCell,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'priority', headerText: 'Priority', width: 80 },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Common Patterns




## Troubleshooting

**Q: queryCellInfo event not firing?**  
A: Ensure you've assigned the event handler to TreeGrid: `queryCellInfo: customiseCell`. The event fires for EVERY cell, which can impact performance on large grids.

**Q: Cell styles not applying?**  
A: Use `args.cell.setAttribute('style', '...')` or set individual properties like `args.cell.style.backgroundColor = '...'`. Avoid inline style conflicts.

**Q: Grid lines not visible?**  
A: Set `gridLines: 'Both'` or other modes. Default mode depends on theme. Verify CSS isn't hiding them - check browser DevTools.

**Q: Text wrapping not working?**  
A: Verify `allowTextWrap: true` is set AND column has defined width. Wrapping adjusts to column width boundaries.

**Q: EllipsisWithTooltip tooltip not showing?**  
A: Ensure `clipMode: 'EllipsisWithTooltip'` and cell content exceeds column width. Tooltip shows only on hover when text is truncated.

**Q: Cell spanning causes layout issues?**  
A: Cell spanning changes table structure. Verify colSpan/rowSpan values match available columns/rows. Avoid spanning across too many columns.
