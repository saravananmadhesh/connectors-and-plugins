# Selection in Angular Gantt Chart

## Table of Contents
- [Enable / Disable Selection](#enable--disable-selection)
- [Selection Mode](#selection-mode)
- [Selection Type](#selection-type)
- [Toggle Selection](#toggle-selection)
- [Row Selection Configuration](#row-selection-configuration)
- [Cell Selection Configuration](#cell-selection-configuration)
- [Handle Selection Events](#handle-selection-events)
- [Programmatic Selection](#programmatic-selection)

---

## Enable / Disable Selection

Selection is enabled by default. Inject `SelectionService` to activate:

For checkbox-driven hierarchy selection, use `selectionSettings.hierarchyMode` to control how parent and child selection states propagate.

```typescript
@Component({
  providers: [SelectionService],
  template: `<ejs-gantt [allowSelection]="true"></ejs-gantt>`
})
```

Disable entirely:
```html
<ejs-gantt [allowSelection]="false"></ejs-gantt>
```

---

## Selection Mode

Configure which elements can be selected via `selectionSettings.mode`:

```typescript
public selectionSettings: object = {
  mode: 'Row'   // 'Row' (default) | 'Cell' | 'Both'
};
```

| Mode | Behavior |
|------|----------|
| `'Row'` | Selects entire rows (default) |
| `'Cell'` | Selects individual cells |
| `'Both'` | Rows and cells selectable simultaneously |

---

## Selection Type

Control how many rows/cells can be selected at once:

```typescript
public selectionSettings: object = {
  type: 'Multiple'   // 'Single' (default) | 'Multiple'
};
```

- **Single:** One row/cell at a time
- **Multiple:** Hold **Ctrl** (Windows) or **Cmd** (Mac) to select multiple rows/cells

---

## Toggle Selection

Allow deselecting by clicking an already-selected row:

```typescript
public selectionSettings: object = {
  enableToggle: true   // Default: false
};
```

---

## Row Selection Configuration

```typescript
public selectionSettings: object = {
  mode: 'Row',
  type: 'Multiple',
  enableToggle: true,
  persistSelection: false,  // Keep selection after data refresh
  checkboxOnly: false        // Selection only via checkbox column
};
```

---

## Hierarchy Checkbox Selection

Hierarchy checkbox selection controls how checkbox state propagates across parent and child records in the task tree.

This feature uses the `selectionSettings.hierarchyMode` property to determine whether selection stays local to the clicked row or propagates through the hierarchy.

### Enable Hierarchy Checkbox Selection

Enable the feature by combining checkbox selection with a hierarchy mode configuration:


```typescript
@Component({
  template: `
    <ejs-gantt
      [allowSelection]="true"
      [selectionSettings]="selectionSettings"
      [columns]="columns">
    </ejs-gantt>
  `
})
export class AppComponent {
  public selectionSettings: object = {
    mode: 'Row',
    type: 'Multiple',
    hierarchyMode: 'Hierarchy'
  };

  public columns: object[] = [
    { field: 'CheckBox', headerText: '', showCheckbox: true, width: 70, allowFiltering: false },
    { field: 'TaskID', width: 70, visible: false },
    { field: 'TaskName', width: 190 },
    { field: 'StartDate' },
    { field: 'EndDate' },
    { field: 'Duration' },
    { field: 'Predecessor' },
    { field: 'Progress' },
  ];
}
```

### Hierarchy Checkbox Mode

The `hierarchyMode` property defines how checkbox selection behaves within the parent-child structure.

| Value | Default | Description |
|---|---|---|
| `'Self'` | No | Selects only the clicked record |
| `'Hierarchy'` | Yes | Propagates selection to related parent and child records |
| `'FilteredHierarchy'` | No | Propagates selection only within the filtered or searched view |

### Mode Behavior

#### Self

- Selects only the current record
- Parent selection does not affect child records
- Child selection does not affect ancestors or siblings
- Useful when each record must be managed independently

#### Hierarchy

- Selects the current record and propagates selection through its hierarchy
- Selecting a parent record selects its descendant records
- Selecting a child record updates ancestor selection state according to the hierarchy selection rules
- Collapsed descendants are still included because selection is based on the data hierarchy, not only on visible rows
- This is the default hierarchy behavior

#### FilteredHierarchy

- Behaves like `Hierarchy` for the visible filtered set
- Selection propagates only to records currently visible after filtering or searching
- Hidden records remain unchanged
- Useful when users need selection to respect the current filtered context

### Selection Propagation Rules

| Interaction | Self | Hierarchy | FilteredHierarchy |
|---|---|---|---|
| Select parent | Select parent only | Select parent + descendants + related hierarchy state | Select only visible related records |
| Select child | Select child only | Update related hierarchy state for ancestors and descendants | Update only visible related records |
| Collapse parent | No selection impact | No selection loss; hierarchy state is retained | No selection loss for visible filtered rows |
| Expand parent | No selection impact | Descendants remain selected if previously selected | Visible descendants reflect filtered hierarchy state |
| Filter rows | No special behavior | Selection can span filtered records and hidden hierarchy records | Selection affects only filtered results |

### Collapsed and Expanded Records

Hierarchy checkbox selection works consistently across collapsed and expanded nodes:

- Collapsed parents retain their selection state
- Descendant records can remain selected even when not visible
- Expanding a parent restores the visible selection state of its descendants
- Collapsing and expanding rows does not clear hierarchy-driven selection

### Example — Hierarchy Checkbox Mode

```typescript
@Component({
  template: `
    <ejs-gantt
      [allowSelection]="true"
      [selectionSettings]="selectionSettings"
      [allowFiltering]="true"
      [columns]="columns">
    </ejs-gantt>
  `
})
export class AppComponent {
  public selectionSettings: object = {
    mode: 'Row',
    type: 'Multiple',
    enableToggle: true,
    hierarchyMode: 'FilteredHierarchy'  // Use filtered hierarchy for filtered views
  };

  public data: object[] = [
    { TaskID: 1, TaskName: 'Project', StartDate: new Date('04/01/2024'), Duration: 10, ParentID: null },
    { TaskID: 2, TaskName: 'Phase 1', StartDate: new Date('04/01/2024'), Duration: 5, ParentID: 1 },
    { TaskID: 3, TaskName: 'Task A', StartDate: new Date('04/01/2024'), Duration: 2, ParentID: 2 },
    { TaskID: 4, TaskName: 'Task B', StartDate: new Date('04/03/2024'), Duration: 3, ParentID: 2 }
  ];

  public columns: object[] = [
    { field: 'CheckBox', headerText: '', showCheckbox: true, width: 70, allowFiltering: false },
    { field: 'TaskID', width: 70, visible: false },
    { field: 'TaskName', width: 190 },
    { field: 'StartDate' },
    { field: 'EndDate' },
    { field: 'Duration' },
    { field: 'Predecessor' },
    { field: 'Progress' },
  ];
}
```

---

## Cell Selection Configuration

```typescript
public selectionSettings: object = {
  mode: 'Cell',
  type: 'Multiple',
  cellSelectionMode: 'Box'   // 'Flow' | 'Box' | 'BoxWithBorder'
};
```

- `'Flow'`: Selects all cells between start and end
- `'Box'`: Selects a rectangular block of cells
- `'BoxWithBorder'`: Box selection with visible border

---

## Handle Selection Events

```typescript
public rowSelected(args: any): void {
  console.log('Selected row data:', args.data);
  console.log('Row index:', args.rowIndex);
}

public rowDeselected(args: any): void {
  console.log('Deselected row:', args.data);
}

public cellSelected(args: any): void {
  console.log('Selected cell field:', args.cellIndex.cellIndex);
  console.log('Cell value:', args.currentCell.innerText);
}
```

```html
<ejs-gantt
  (rowSelected)="rowSelected($event)"
  (rowDeselected)="rowDeselected($event)"
  (cellSelected)="cellSelected($event)">
</ejs-gantt>
```

---

## Programmatic Selection

```typescript
// Select a specific row by index
this.ganttObj.selectionModule.selectRow(2);

// Select multiple rows
this.ganttObj.selectionModule.selectRows([0, 2, 4]);

// Select a cell
this.ganttObj.selectionModule.selectCell({ rowIndex: 1, cellIndex: 2 });

// Clear selection
this.ganttObj.selectionModule.clearSelection();

// Get selected row data
const selectedRecords = this.ganttObj.selectionModule.getSelectedRecords();
```
