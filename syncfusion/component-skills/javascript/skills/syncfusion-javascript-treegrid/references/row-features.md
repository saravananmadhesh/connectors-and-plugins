# TreeGrid Row Features

## When to Use This Reference

Read this reference when you need to:
- Customize row appearance and styling based on data (rowDataBound event)
- Apply conditional formatting to rows (background colors, borders)
- Set fixed or variable row heights (rowHeight property, per-row)
- Create custom row layouts using row templates (rowTemplate)
- Add expandable detail rows for master-detail views (detailTemplate, DetailRow module)
- Handle row drag-and-drop functionality (Row Drag-Drop module)
- Implement row spanning to merge cells horizontally across columns
- Control hierarchical indentation for parent-child relationships
- Alternate row styling for better readability
- Handle row selection and interaction patterns

---

## Table of Contents

- [Row Basics](#row-basics)
- [Row Height](#row-height)
- [Row Templates](#row-templates)
- [Detail Templates](#detail-templates)
- [Row Customization](#row-customization)
- [Row Drag and Drop](#row-drag-and-drop)
- [Row Spanning](#row-spanning)
- [Row Indent](#row-indent)
- [Frozen Rows](#frozen-rows)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Row Basics

Understand how the TreeGrid processes each row and when events fire during rendering.

The `rowDataBound` event fires for every row as it renders, allowing you to customize appearance and behavior based on data:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task Name', width: 200 },
    { field: 'duration', headerText: 'Duration (days)', width: 100 }
  ],
  rowDataBound: (args: RowDataBoundEventArgs) => {
    console.log('Row data:', args.data);
    console.log('Row index:', args.rowIndex);
    // args.row = <HTMLTableRowElement> actual DOM row
  }
});
treeGridObj.appendTo('#TreeGrid');
```

**Key Properties in rowDataBound:**
- `args.data` - Current row's data object (reactive)
- `args.rowIndex` - Zero-based row index in grid
- `args.row` - HTML table row element (DOM manipulation possible)

---

## Row Height

Control individual row heights - fixed for all rows or dynamic per row.

### Static Row Height (All Same)

Apply uniform height to every row:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  rowHeight: 45,  // 45 pixels for all rows
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task Name', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

### Per-Row Height (Dynamic)

Set different heights per row based on data or conditions:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task Name', width: 200 }
  ],
  rowDataBound: (args: RowDataBoundEventArgs) => {
    // High-priority tasks get taller rows
    if (args.data.priority === 'High') {
      (args.row as HTMLTableRowElement).style.height = '60px';
    } else {
      (args.row as HTMLTableRowElement).style.height = '35px';
    }
  }
});
treeGridObj.appendTo('#TreeGrid');
```

---

## Row Templates

Create custom row layouts beyond standard column display.

Define row template using HTML markup, then bind to grid:

```typescript
// Define template HTML
const rowTemplate = `<tr>
  <td>${"data.taskID"}</td>
  <td style="font-weight: bold;">${"data.taskName"}</td>
  <td>${"data.duration"} days</td>
  <td>
    <div style="width: 100px; height: 20px; background: #ddd; border-radius: 4px;">
      <div style="width: \${data.progress}%; height: 100%; background: #4CAF50; border-radius: 4px;"></div>
    </div>
  </td>
</tr>`;

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  rowTemplate: rowTemplate,
  columns: [
    { field: 'taskID', headerText: 'ID' },
    { field: 'taskName', headerText: 'Task' },
    { field: 'duration', headerText: 'Duration' },
    { field: 'progress', headerText: 'Progress' }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

**When to Use Row Templates:**
- Visual progress bars within rows
- Custom checkbox designs
- Multi-column layouts within single row
- Conditional row styling based on data

---

## Detail Templates

Display expandable detail rows for master-detail views (separate from child hierarchy).

### Enable Detail Row Expansion

Inject `DetailRow` module and define detail template:

```typescript
TreeGrid.Inject(DetailRow);

const detailGridData = [
  { taskID: 1, subtaskID: 101, subtaskName: 'Requirement Analysis', assignee: 'John' },
  { taskID: 1, subtaskID: 102, subtaskName: 'Design Phase', assignee: 'Sarah' }
];

const detailTemplate = (props: any) => {
  return `<div style="padding: 20px; background: #f5f5f5;">
    <h4>Details for Task: ${props.taskName}</h4>
    <p><strong>Duration:</strong> ${props.duration} days</p>
    <p><strong>Progress:</strong> ${props.progress}%</p>
    <p><strong>Start Date:</strong> ${new Date(props.startDate).toLocaleDateString()}</p>
  </div>`;
};

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  detailTemplate: detailTemplate,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task Name', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

---

## Row Customization

Dynamically style and modify rows based on data values.

### Conditional Row Styling

Apply styles reactively to rows:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task Name', width: 200 },
    { field: 'status', headerText: 'Status', width: 100 }
  ],
  rowDataBound: (args: RowDataBoundEventArgs) => {
    const row = args.row as HTMLTableRowElement;
    
    // Color-code by status
    if (args.data.status === 'Completed') {
      row.style.backgroundColor = '#e8f5e9';
      row.style.color = '#2e7d32';
    } else if (args.data.status === 'Pending') {
      row.style.backgroundColor = '#fff3e0';
      row.style.color = '#e65100';
    } else if (args.data.status === 'Overdue') {
      row.style.backgroundColor = '#ffebee';
      row.style.color = '#c62828';
    }
    
    // Bold for high-priority rows
    if (args.data.priority === 'High') {
      row.style.fontWeight = 'bold';
    }
  }
});
treeGridObj.appendTo('#TreeGrid');
```

---

## Row Drag and Drop

Enable users to reorder rows via mouse drag-and-drop.

### Enable Drag-Drop with RowDD Module

Inject `RowDD` module to enable row reordering:

```typescript
TreeGrid.Inject(RowDD);

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  allowRowDragAndDrop: true,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task Name', width: 200 }
  ],
  rowDrop: (args: RowDropEventArgs) => {
    console.log('Row dropped at index:', args.dropIndex);
    console.log('Dropped data:', args.data);
    // Update data model here
  }
});
treeGridObj.appendTo('#TreeGrid');
```

**Drag Drop Events:**
- `dragStart` - Triggered when drag begins
- `dragOver` - Triggered during drag over
- `rowDrop` - Triggered when row is dropped

---

## Row Spanning

Merge rows or cells horizontally across columns.

### Basic Row Spanning (colSpan)

Use `colSpan` in data to merge cells in single row across columns:

```typescript
const spanningData = [
  { 
    taskID: 1, 
    taskName: 'Project Planning', 
    duration: 5,
    colSpan: 2  // Merge into next 2 columns
  },
  { 
    taskID: 2, 
    taskName: 'Design & Development', 
    duration: 10,
    colSpan: 1
  }
];

const treeGridObj = new TreeGrid({
  dataSource: spanningData,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 },
    { field: 'duration', headerText: 'Duration', width: 100 },
    { field: '', headerText: 'Notes', width: 100 }
  ],
  queryCellInfo: (args: QueryCellInfoEventArgs) => {
    if (args.column?.field === 'taskName' && (args.data as any).colSpan > 1) {
      (args.cell as HTMLTableCellElement).colSpan = (args.data as any).colSpan;
    }
  }
});
treeGridObj.appendTo('#TreeGrid');
```

---

## Row Indent

Control hierarchical indentation for parent-child relationships.

### Adjust Indentation Width

Change default indent width per hierarchy level:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  indentWidth: 30,  // Default is 16px; set to 30px per level
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task Name', width: 200 },
    { field: 'duration', headerText: 'Duration', width: 100 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

More indent = deeper visual hierarchy; adjust based on tree depth and available width.

---

## Common Patterns

### Pattern: Master-Detail with Detail Row + Data

Combine detail templates with inner grid for master-detail structure:

```typescript
TreeGrid.Inject(DetailRow);

const detailTemplate = (props: any) => {
  // Query related data for detail grid
  const subtasks = props.subtasks || [];
  
  let html = `<div style="padding: 20px;">
    <h5>Subtasks for: ${props.taskName}</h5>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f0f0f0;">
          <th style="border: 1px solid #ddd; padding: 8px;">Subtask</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Duration</th>
        </tr>
      </thead>
      <tbody>`;
  
  subtasks.forEach((st: any) => {
    html += `<tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${st.taskName}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${st.duration}d</td>
    </tr>`;
  });
  
  html += `</tbody></table></div>`;
  return html;
};

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  detailTemplate: detailTemplate,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

### Pattern: Alternating Row Colors for Visual Clarity

Improve row readability with striped coloring:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task Name', width: 200 }
  ],
  rowDataBound: (args: RowDataBoundEventArgs) => {
    const row = args.row as HTMLTableRowElement;
    // Alternate: row index 0,2,4... vs 1,3,5...
    if (args.rowIndex % 2 === 0) {
      row.style.backgroundColor = '#f9f9f9';
    } else {
      row.style.backgroundColor = '#ffffff';
    }
  }
});
treeGridObj.appendTo('#TreeGrid');
```

---

## Frozen Rows

Freeze top rows to keep header rows and summary rows visible while scrolling vertically. Commonly combined with frozen columns for 4-zone layouts.

**Shared Setup (all frozen row examples):**
```typescript
import { TreeGrid, Freeze, DetailRow } from '@syncfusion/ej2-treegrid';
TreeGrid.Inject(Freeze);  // Add DetailRow to Inject() for master-detail patterns
```

### Freeze Top N Rows

Use `frozenRows` property to freeze the first N rows. Non-frozen rows scroll vertically while frozen rows stay fixed.

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    frozenRows: 2,
    columns: [
        { field: 'taskID', headerText: 'ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 120 },
        { field: 'duration', headerText: 'Duration', width: 100 },
        { field: 'progress', headerText: 'Progress', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

First 2 rows stay visible while remaining rows scroll.

### Frozen Rows + Frozen Columns (4-Zone Layout)

Combine `frozenRows` and `frozenColumns` for specific rows and columns always visible.

**Configuration:**
```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    frozenRows: 3,
    frozenColumns: 2,
    columns: [
        { field: 'taskID', headerText: 'ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 200 },
        { field: 'startDate', headerText: 'Start Date', width: 120 },
        { field: 'endDate', headerText: 'End Date', width: 120 },
        { field: 'duration', headerText: 'Duration', width: 100 },
        { field: 'progress', headerText: 'Progress', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**4-Zone Layout:**
- Zone 1 (frozen): taskID, taskName for rows 1-3
- Zone 2 (frozen top + scroll right): startDate, endDate for rows 1-3
- Zone 3 (scroll down + frozen): taskID, taskName for rows 4+
- Zone 4 (fully scrollable): startDate, endDate for rows 4+

### Frozen Rows with Expand/Collapse Hierarchy

Frozen parent rows remain visible and expandable during vertical scrolling.

**Configuration:**
```typescript
let treeGridObj = new TreeGrid({
    dataSource: hierarchyData,
    childMapping: 'subtasks',
    frozenRows: 1,
    columns: [
        { field: 'taskID', headerText: 'ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 200 },
        { field: 'duration', headerText: 'Duration', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

Top parent row stays frozen; users expand/collapse frozen rows independently of scrolled content.

### Frozen Rows with Master-Detail Pattern

Combine frozen rows with detail templates for master-detail views.

**Configuration:**
```typescript
TreeGrid.Inject(Freeze, DetailRow);

let treeGridObj = new TreeGrid({
    dataSource: projectData,
    childMapping: 'subtasks',
    frozenRows: 1,
    detailTemplate: '<div><h4>Details: ${taskName}</h4></div>',
    columns: [
        { field: 'taskID', headerText: 'ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 200 },
        { field: 'startDate', headerText: 'Start Date', width: 120 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

Summary information stays frozen at top; details expand/collapse independently.


### Troubleshooting Frozen Rows

**Row Templates Incompatible**: Row templates cannot be used with frozen rows. Use cell templates or detail templates instead.

**Detail Template Limitations**: Detail template cannot span frozen zones. Use external panel or modal for complex detail views.

**Editing Limitations**: Inline editing works in frozen rows, but edit form cannot scroll if frozen columns present. Use dialog editing for better UX.

**Performance with Large Datasets**: Freezing rows with thousands of children affects performance. Use virtual scrolling or pagination in combination.

---

## Troubleshooting

**Q: Detail row not expanding?**  
A: Ensure `DetailRow` module is injected: `TreeGrid.Inject(DetailRow)`. Check `detailTemplate` property is defined.

**Q: Drag-drop not working?**  
A: Verify `allowRowDragAndDrop: true` is set and `RowDD` module is injected: `TreeGrid.Inject(RowDD)`.

**Q: Row height not updating?**  
A: For dynamic heights, modify row in `rowDataBound` and refresh grid: `treeGridObj.refresh()`.

**Q: Indentation too narrow/wide?**  
A: Adjust `indentWidth` property. Increase for deeper visibility, decrease to save space.

**Q: Detail row performance slow with many rows?**  
A: Use virtual scrolling or lazy-load detail content on expand to avoid rendering all details upfront.

