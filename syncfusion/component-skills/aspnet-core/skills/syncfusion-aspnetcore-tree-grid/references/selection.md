# Selection — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Selection Type](#selection-type)
- [Selection Mode](#selection-mode)
- [Checkbox Selection](#checkbox-selection)
- [Row Selection Events](#row-selection-events)
- [Programmatic Selection](#programmatic-selection)
- [Limitations](#limitations)

## When to Use This Skill

Use this reference when you need to:
- Allow users to highlight single or multiple rows
- Enable cell-level selection within rows
- Add checkbox column for explicit row selection
- React to selection changes via events
- Programmatically select/deselect rows
- Capture selections for bulk operations
- Use different selection modes (Row, Cell, Both)
- Implement selection with auto-hierarchy for checkboxes

## Overview

Selection lets users highlight rows or cells. Configure with `<e-treegrid-selectionsettings>`. Disable all selection by setting `allowSelection="false"` on the grid.

---

## Selection Type

Set `type` in `e-treegrid-selectionsettings`:

| Type | Description |
|------|-------------|
| `Single` | Default. Only one row or cell at a time |
| `Multiple` | Hold **CTRL** to multi-select; hold **SHIFT** for range selection |

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-selectionsettings type="Multiple"></e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Selection Mode

Set `mode` in `e-treegrid-selectionsettings`:

| Mode | Description |
|------|-------------|
| `Row` | Default. Row-level selection |
| `Cell` | Cell-level selection |
| `Both` | Rows and cells can be selected simultaneously |

```cshtml
<!-- Cell selection -->
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-selectionsettings mode="Cell" type="Multiple"></e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Checkbox Selection

Add a dedicated checkbox column for selection by setting `type="CheckBox"` in the selection settings:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-selectionsettings type="Multiple" checkboxMode="ResetOnRowClick"></e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column type="checkbox" width="50"></e-treegrid-column>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

`checkboxMode` options:
- `Default` — Select row by clicking anywhere, checkbox reflects state
- `ResetOnRowClick` — Clicking a row clears previous selections; use CTRL to multi-select

---

## Row Selection Events

Handle selection events to react to user actions:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource"
              childMapping="Children" treeColumnIndex="1"
              rowSelected="onRowSelected" rowDeselected="onRowDeselected">
    <e-treegrid-selectionsettings type="Multiple"></e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onRowSelected(args) {
        console.log('Selected row data:', args.data);
    }
    function onRowDeselected(args) {
        console.log('Deselected row data:', args.data);
    }
</script>
```

---

## Programmatic Selection

Select rows or cells programmatically:

```cshtml
<button onclick="selectRows()">Select Rows 1 & 3</button>
<button onclick="clearSelection()">Clear Selection</button>

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-selectionsettings type="Multiple"></e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function selectRows() {
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        grid.selectRows([0, 2]); // 0-based row indexes
    }
    function clearSelection() {
        document.getElementById('TreeGrid').ej2_instances[0].clearSelection();
    }
</script>
```

---

## Limitations

- Selection is NOT supported when `rowTemplate` is used
- Cell selection is NOT supported with row virtual scrolling or column virtual scrolling
- Checkbox selection is NOT compatible with batch editing or virtual scrolling
