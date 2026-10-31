# Selection in Syncfusion Gantt Chart

## Table of Contents
- [Basic Setup](#basic-setup)
- [Selection Settings](#selection-settings)
- [Hover Highlighting](#hover-highlighting)
- [Row Selection](#row-selection)
- [Checkbox Selection](#checkbox-selection)
- [Hierarchy Checkbox Mode](#hierarchy-checkbox-mode)
- [Cell Selection](#cell-selection)
- [Programmatic Selection](#programmatic-selection)
- [Get Selected Items](#get-selected-items)
- [Clear Selection](#clear-selection)
- [Touch Interaction](#touch-interaction)

---

## Basic Setup

**Module required**: `Selection`

```typescript
import { Gantt, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    selectionSettings: {
        mode: 'Row',       // 'Row' | 'Cell' | 'Both'
        type: 'Multiple',  // 'Single' | 'Multiple'
        enableToggle: false
    }
});
gantt.appendTo('#Gantt');
```

> Set `allowSelection: false` to disable selection entirely. `Row` mode is the default.

---

## Selection Settings

| Property | Options | Description |
|----------|---------|-------------|
| `mode` | `'Row'` \| `'Cell'` \| `'Both'` | What can be selected (default: `'Row'`) |
| `type` | `'Single'` \| `'Multiple'` | How many items can be selected (default: `'Single'`) |
| `enableToggle` | boolean | Click selected item again to deselect (default: `false`) |

---

## Hover Highlighting

Highlights tree grid rows, taskbars, header cells, and timeline cells on hover:

```typescript
enableHover: true,
selectionSettings: { mode: 'Row', type: 'Multiple' }
```

---

## Row Selection

### Select Row on Initial Load

Use `selectedRowIndex` to pre-select a row when the Gantt loads:

```typescript
selectedRowIndex: 3
```

### Select Rows Dynamically

```typescript
gantt.selectionModule.selectRow(2);              // select single row by index
gantt.selectionModule.selectRows([1, 2, 3]);     // select multiple rows by index array
```

### Multiple Row Selection

Hold **Ctrl** and click to select multiple rows:

```typescript
selectionSettings: { mode: 'Row', type: 'Multiple' }
```

### Prevent Row Selection

Use `rowSelecting` to cancel selection of specific rows. `rowSelected` fires after selection completes:

```typescript
rowSelecting: function(args: any) {
    if (args.data.TaskID === 4) {
        args.cancel = true;   // prevent selecting this row
    }
},
rowSelected: function(args: any) {
    console.log('Row selected:', args.data);
}
```

### Row Deselection Events

Clicking a selected row deselects it. Use `rowDeselecting` to prevent deselection of specific rows:

```typescript
rowDeselecting: function(args: any) {
    // args.cancel = true to prevent deselection
    console.log('Deselecting row:', args.data.TaskID);
},
rowDeselected: function(args: any) {
    console.log('Row deselected:', args.data);
}
```

---

## Checkbox Selection

Checkbox selection enables selecting rows via checkbox columns. To enable checkbox selection, add a checkbox column to the grid and set selection type to `'Multiple'`.

```typescript
import { Gantt, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    columns: [
        { field: 'CheckBox', headerText: '', showCheckbox: true, width: 70 },         // checkbox selection column
        { field: 'TaskID', width: '100' },
        { field: 'TaskName', width: '250' }
    ],
    selectionSettings: {
        mode: 'Row',
        type: 'Multiple'
    }
});
gantt.appendTo('#Gantt');
```

> When a checkbox column is added with `type: 'checkbox'`, the `selectionSettings.type` defaults to `'Multiple'`.

---

## Hierarchy Checkbox Mode

The `hierarchyCheckboxMode` property controls how checkbox selection propagates in hierarchical data (parent-child relationships). This mode determines whether selecting a parent selects all children, whether selecting all children selects the parent, and whether filtered-out records are affected by selection.

### Supported Modes

| Mode | Behavior |
|------|----------|
| `'Self'` | Selects only the current record; selection does not propagate to parents or children |
| `'Hierarchy'` | Selection propagates through the entire parent-child hierarchy (default) |
| `'FilteredHierarchy'` | Selection propagates only within the visible hierarchy (filtered records not affected) |

### Configuration

```typescript
import { Gantt, Selection, Filter } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection, Filter);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'ParentID'
    },
    columns: [
        { field: 'CheckBox', headerText: '', showCheckbox: true, width: 70, allowFiltering: false },
        { field: 'TaskID', width: '100' },
        { field: 'TaskName', width: '250' }
    ],
    selectionSettings: {
        mode: 'Row',
        type: 'Multiple',
        hierarchyCheckboxMode: 'Hierarchy'   // propagate selection through hierarchy
    },
    allowFiltering: true
});
gantt.appendTo('#Gantt');
```

### Behavior Details

#### Self Mode

```typescript
hierarchyCheckboxMode: 'Self'
```

- Clicking a parent's checkbox **does not** select children
- Clicking a child's checkbox **does not** change the parent's state
- Each record's selection is independent
- **Use case**: When you need independent selection of items regardless of hierarchy

#### Hierarchy Mode (Default)

```typescript
hierarchyCheckboxMode: 'Hierarchy'
```

- Selecting a **parent** checkbox automatically selects **all descendants** (children, grandchildren, etc.)
- Selecting a **child** checkbox automatically updates the **parent's** state:
  - If all children are checked, the parent is checked
  - If some children are checked, the parent shows indeterminate state
  - If no children are checked, the parent is unchecked
- Works with **collapsed parents**: Selecting a collapsed parent still selects all its children (even if not visible)
- **Use case**: Standard hierarchical selection for project management (select a phase to select all tasks)

#### FilteredHierarchy Mode

```typescript
hierarchyCheckboxMode: 'FilteredHierarchy'
```

- Selection propagates only to **visible records** after filtering or searching
- **Hidden/filtered-out records** are not affected by selection changes
- When a filter is applied:
  - Only visible parent-child relationships participate in selection propagation
  - Hidden children are ignored (parent state reflects only visible children)
- **Use case**: When you want selection to respect the current filtered view (e.g., selecting visible tasks without affecting hidden ones)

### Example: Hierarchy Mode

```typescript
// Data structure:
// Project (ID: 1)
//   ├─ Phase 1 (ID: 2)
//   │   ├─ Task 1.1 (ID: 3)
//   │   └─ Task 1.2 (ID: 4)
//   └─ Phase 2 (ID: 5)
//       └─ Task 2.1 (ID: 6)

let gantt: Gantt = new Gantt({
    dataSource: hierarchicalData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', parentID: 'ParentID'
    },
    columns: [
        { field: 'CheckBox', headerText: '', showCheckbox: true, width: 70, allowFiltering: false },
        { field: 'TaskName', width: '250' }
    ],
    selectionSettings: {
        mode: 'Row',
        type: 'Multiple',
        hierarchyCheckboxMode: 'Hierarchy'
    }
});
gantt.appendTo('#Gantt');

// User actions:
// 1. Check "Project" → automatically checks Phase 1, Phase 2, Task 1.1, Task 1.2, Task 2.1
// 2. Uncheck "Task 1.1" → Project and Phase 1 change to indeterminate (partial selection)
// 3. Check Task 1.2, uncheck all others → Project and Phase 1 show indeterminate; Phase 2 unchecked
```

### Example: FilteredHierarchy Mode

```typescript
hierarchyCheckboxMode: 'FilteredHierarchy',
allowFiltering: true

// Data: Project > Phase > Tasks
// Apply filter: show only tasks starting with "A"

// User selects "Project" checkbox:
// - Only visible tasks (filtered) are selected
// - Hidden tasks remain unselected
// - When filter is removed, hidden tasks are still unselected
```

### Interaction with Other Features

#### Virtualization

When virtualization is enabled (`enableVirtualization: true`):
- Checkbox state is maintained for all records, including scrolled-out-of-view records
- Selection propagation works across virtual boundaries
- `'Hierarchy'` mode recalculates parent states for all off-screen descendants
- Performance may degrade with very large hierarchies; test accordingly

#### Paging

With paging enabled:
- Checkbox state is **per-page** in some configurations
- `'Hierarchy'` mode typically works within each page (parent-child relationships within the same page)
- Cross-page hierarchy selection depends on page size and data structure; test for your use case

#### Sorting and Filtering

- **Sorting**: Checkbox state is preserved after sorting; hierarchy propagation adjusts based on the new order
- **Filtering** (`'FilteredHierarchy'`): Only visible records participate in selection propagation
- **Filtering** (`'Hierarchy'`): Selection affects all records regardless of visibility

#### Expanded/Collapsed State

- In `'Hierarchy'` mode, selecting a **collapsed parent** selects all children even though they're not visible
- In `'FilteredHierarchy'` mode, collapsed children are not affected by parent selection (they're hidden)
- Expanding a parent after selecting it shows the already-selected children checked

### Programmatic Selection with Hierarchy Mode

```typescript
import { Gantt, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection);

let gantt: Gantt = new Gantt({
    // ... config with hierarchyCheckboxMode: 'Hierarchy'
});
gantt.appendTo('#Gantt');

// Programmatically select a row (propagates through hierarchy)
gantt.selectRow(2);  // select parent → children auto-selected

// Get selected records (includes all propagated selections)
const selected = gantt.getSelectedRecords();
console.log('Selected records:', selected);
```

### Best Practices

1. **Choose the right mode for your use case**:
   - Use `'Self'` for independent item selection (e.g., assigning individual tasks)
   - Use `'Hierarchy'` for bulk operations (e.g., "select all tasks in a phase to reassign")
   - Use `'FilteredHierarchy'` when filtered views should be independent (e.g., "select visible tasks only")

2. **Test with real data**: Verify selection behavior with your actual data hierarchy depth and size.

3. **Consider performance**: Large hierarchies with `'Hierarchy'` mode may be slower; monitor for responsiveness.

4. **Communicate to users**: Make it clear which mode is active; consider adding help text or tooltips.

5. **Combine with other features thoughtfully**:
   - Use with filtering to pre-filter visible items, then select all visible
   - Use with paging to clarify per-page vs. global selection
   - Test with virtualization for performance

### Limitations

- `hierarchyCheckboxMode` only affects **checkbox** selection; row click selection is not affected
- Indeterminate state (partial selection) is visual only; the indeterminate parent is not included in `getSelectedRecords()` unless also checked
- Very deep hierarchies (100+ levels) may experience selection propagation delays
- Cross-page selection in paging mode requires testing with your data; behavior depends on data binding approach

---

## Cell Selection

Enable by setting `mode: 'Cell'`. Use `getSelectedRowCellIndexes()` to retrieve selected cell info (returns `{ cellIndexes, rowIndex }[]`).

```typescript
selectionSettings: { mode: 'Cell' }
```

### Multiple Cell Selection

Hold **Ctrl** and click to select multiple cells:

```typescript
selectionSettings: { mode: 'Cell', type: 'Multiple' }
```

### Select Cell Dynamically

```typescript
gantt.selectionModule.selectCell({ rowIndex: 1, cellIndex: 1 });
```

### Prevent Cell Selection

Use `cellSelecting` to cancel selection of specific cells. `cellSelected` fires after selection completes:

```typescript
cellSelecting: function(args: any) {
    if (args.data.TaskID === 4 && args.cellIndex.cellIndex === 1) {
        args.cancel = true;   // prevent selecting this cell
    }
},
cellSelected: function(args: any) {
    console.log('Cell selected at row:', args.cellIndex.rowIndex);
}
```

> **Limitation**: Cell selection is not supported when virtualization (`enableVirtualization`) is enabled.

---

## Programmatic Selection

```typescript
// Select rows by condition in dataBound
dataBound: function() {
    const rowIndexes: number[] = [];
    (gantt.treeGrid.grid.dataSource as any[]).forEach((data, index) => {
        if (data.TaskID === 3 || data.TaskID === 4) rowIndexes.push(index);
    });
    gantt.selectRows(rowIndexes);
}
```

---

## Get Selected Items

```typescript
rowSelected: function(args: any) {
    const indexes: number[] = gantt.selectionModule.getSelectedRowIndexes();
    const records: object[] = gantt.selectionModule.getSelectedRecords();
    const cellIndexes = gantt.selectionModule.getSelectedRowCellIndexes(); // cell mode
    console.log('Selected indexes:', indexes);
    console.log('Selected records:', records);
}
```

| Method | Returns | Description |
|--------|---------|-------------|
| `getSelectedRowIndexes()` | `number[]` | Indexes of all selected rows |
| `getSelectedRecords()` | `object[]` | Full data objects of selected rows |
| `getSelectedRowCellIndexes()` | `object[]` | `{ cellIndexes, rowIndex }` of selected cells |

---

## Clear Selection

```typescript
gantt.clearSelection();   // clears all selected rows and cells
```

---

## Touch Interaction

- **Tap** a row → selects that row (single row selection)
- **Multi-row selection** → tap a row; a popup appears indicating multi-select mode; tap the popup, then tap additional rows to select them
