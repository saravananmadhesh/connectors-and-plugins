# Selection and Interaction

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Row Selection](#row-selection)
- [Selection Modes](#selection-modes)
- [Checkbox Selection](#checkbox-selection)
- [Selection Methods](#selection-mthods)

## When to Use

Use row/cell selection when you need to:
- **Enable multi-record operations** - Select multiple rows for bulk actions
- **Collect user input** - Selected rows become input to process
- **Show related data** - Detail pane updates on selection change
- **Perform bulk editing** - Edit multiple rows at once
- **Implement favorites** - Users mark important rows
- **Support drill-down** - Expand selected row details
- **Create workflows** - Select → Approve → Complete
- **Enable context menus** - Right-click selected rows
- **Highlight comparisons** - Select rows to compare

## Mandatory Rules

Before implementing selection:
- ✓ **selectionSettings**: Configure selection with type, mode, and options
- ✓ **type Property**: Choose 'Single' (default) or 'Multiple' for number of selections
- ✓ **mode Property**: Choose 'Row' (default), 'Cell', or 'Both' for what to select
- ✓ **Checkbox Column**: Use `type='checkbox'` to render checkbox (for visual selection)
- ✓ **cellSelectionMode**: For cell selection, choose 'Flow' (default) or 'Box'
- ✓ **selectionChanged Event**: Monitor selection changes
- ✓ **Primary Key**: Required for persistent selection using isPrimaryKey

## Row Selection

### Single Selection (Default)

Only one row can be selected at a time:

```vue
<template>
  <p>Selected Row: {{ selectedRowIndex }}</p>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :selectionSettings="{ type: 'Single' }">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([
  { taskID: 1, taskName: 'Planning', status: 'Open', subtasks: [] },
  { taskID: 2, taskName: 'Development', status: 'In Progress', subtasks: [] }
]);

provide('treegrid', []);
</script>
```

### Multiple Selection

Multiple rows can be selected (Ctrl+Click or Shift+Click):

```vue
  <p>Selected Rows: {{ selectedCount }}</p>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :selectionSettings="{ type: 'Multiple' }">
  </ejs-treegrid>
```

## Selection Modes

### Row Selection (Default)

Select entire rows:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :selectionSettings="{ mode: 'Row', type: 'Multiple' }">
  </ejs-treegrid>
</template>
```

### Cell Selection

Select individual cells:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :selectionSettings="{ mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }">
    <e-columns>
  </ejs-treegrid>
</template>
```

**Cell Selection Modes:**
- **Flow** (default) - Select range between start and end indexes including all cells
- **Box** - Select range within start and end column indexes

### Both Row and Cell Selection

Select rows and cells simultaneously:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :selectionSettings="{ mode: 'Both', type: 'Multiple' }">
  </ejs-treegrid>
</template>
```


### Selection Settings Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **type** | string | 'Single' | 'Single' or 'Multiple' selections |
| **mode** | string | 'Row' | 'Row', 'Cell', or 'Both' |
| **cellSelectionMode** | string | 'Flow' | 'Flow' or 'Box' for cell range selection |
| **checkboxOnly** | boolean | false | Selection only via checkbox |
| **persistSelection** | boolean | false | Remember selection across operations |
| **checkboxMode** | string | 'Default' | 'Default' or 'ResetOnRowClick' |
| **enableToggle** | boolean | false | Click to select/unselect |

## Checkbox Selection

Add visual checkboxes for selection:

### Basic Checkbox Selection

```vue
<template>
  <div>
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="2"
      childMapping="subtasks">
      <e-columns>
        <e-column type="checkbox" width=50></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>
```

### Checkbox-Only Selection

Allow selection only via checkbox (not row click):

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="2"
    childMapping="subtasks"
    :selectionSettings="{ type: 'Multiple', checkboxOnly: true }">
    <e-columns>
      <e-column type="checkbox" width=50></e-column>
    </e-columns>
  </ejs-treegrid>
</template>
```

**checkboxOnly Property:**
- `true` - Only checkbox click selects/deselects
- `false` (default) - Both checkbox and row click select/deselect

### Checkbox Selection Modes

#### Default Mode

Users can select multiple rows by clicking rows one by one:

```javascript
const selectionSettings = {
  type: 'Multiple',
  checkboxMode: 'Default'  // Default behavior
};
```

#### ResetOnRowClick Mode

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="2"
    childMapping="subtasks"
    :selectionSettings="{ type: 'Multiple', checkboxMode: 'ResetOnRowClick' }">
    <e-columns>
  </ejs-treegrid>
</template>
```

### Persistent Selection

Maintain selection across paging and operations:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="2"
    childMapping="subtasks"
    :allowPaging="true"
    :selectionSettings="{ 
      type: 'Multiple', 
      persistSelection: true 
    }">
    <e-columns>
      <e-column type="checkbox" width=50></e-column>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right" :isPrimaryKey="true"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>
</script>
```

## Selection Methods

### Toggle Selection

Enable toggle behavior - click to select/unselect:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :selectionSettings="{ type: 'Multiple', enableToggle: true }">
    <e-columns>
  </ejs-treegrid>
</template>
```

**Toggle Behavior:**
- Click selected row → unselects it
- Click unselected row → selects it (clears previous selection in Multiple mode)
- Ctrl+Click → maintains multi-selection even with toggle enabled

### Programmatic Selection

Select rows via code:

```vue
  // select a row
  gridInstance.value.selectRow(index);
  // clears selection
  gridInstance.value.clearSelection();
</script>
```

### Get Selected Records

Access selected row data:

```vue
  gridInstance.value.getSelectedRecords();
```


### Selection Methods Reference

| Method | Description |
|--------|-------------|
| **selectRow(index)** | Select single row by index |
| **selectRows(indexes)** | Select multiple rows by indexes array |
| **selectCell(cellIndex)** | Select single cell |
| **selectCells(cellIndexes)** | Select multiple cells |
| **selectAll()** | Select all rows/cells |
| **clearSelection()** | Clear all selections |
| **getSelectedRowIndexes()** | Get array of selected row indexes |
| **getSelectedRecords()** | Get array of selected row data objects |
| **getSelectedCellIndexes()** | Get array of selected cell indexes |

### Selection Events Reference

| Event | Description | Parameters |
|-------|-------------|------------|
| **selectionChanged** | Fires when selection changes | args with data, rowIndex, cellIndex |
| **rowSelecting** | Fires before row selection | args with data, rowIndex |
| **rowDeselecting** | Fires before row deselection | args with data, rowIndex |
| **cellSelecting** | Fires before cell selection | args with cellIndex |
| **cellDeselecting** | Fires before cell deselection | args with cellIndex |
