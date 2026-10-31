# Filter Editor in WPF DataGrid (SfDataGrid)

Comprehensive reference for the Filter Editor feature, including setup, Filter Editor Panel configuration, filter expression management, and synchronization behavior in the Syncfusion WPF DataGrid control.

## Table of Contents
- [Overview](#overview)
- [Enable Filter Editor](#enable-filter-editor)
- [Open Filter Editor](#open-filter-editor)
- [Apply Filter Criteria](#apply-filter-criteria)
- [Filter Editor Panel](#filter-editor-panel)
- [Expand or Collapse the Filter Expression](#expand-or-collapse-the-filter-expression)
- [Enable or Suspend Filtering](#enable-or-suspend-filtering)
- [Close the Filter Editor Panel](#close-the-filter-editor-panel)
- [Filter Synchronization](#filter-synchronization)
- [Limitations](#limitations)

## Overview

The Filter Editor provides a visual interface for creating complex filter criteria by combining multiple conditions with `AND`/`OR` logical operators and nested groups. It is an advanced complement to the standard Excel-like filter popup.

**Key Features:**
- Build complex multi-condition filter expressions visually
- Combine conditions using `AND` / `OR` logical operators
- Organize conditions into nested groups for advanced logic
- Display active filter expressions in the Filter Editor Panel
- Suspend and resume filtering without losing filter criteria
- Synchronize automatically with Checkbox Filter, Advanced Filter, Filter Row, and programmatic `FilterPredicates`

**Prerequisites:** Filtering must be enabled before activating the Filter Editor:
```xml
<syncfusion:SfDataGrid AllowFiltering="True" ... />
```

## Enable Filter Editor

Set `SfDataGrid.EnableFilterEditor` to `true`. This makes the Filter Editor action available in the column filter popup and shows the **Edit Filter** icon in the Filter Editor Panel:

```xml
<syncfusion:SfDataGrid x:Name="dataGrid"
                       AllowFiltering="True"
                       AutoGenerateColumns="True"
                       EnableFilterEditor="True"
                       ItemsSource="{Binding Orders}" />
```

```csharp
dataGrid.EnableFilterEditor = true;
```

> `EnableFilterEditor` controls the **availability** of Filter Editor actions in the UI. It does not control the visibility of the Filter Editor Panel.

## Open Filter Editor

**From the column filter popup:**
1. Click the filter icon in a column header
2. Select **Filter Editor** from the popup

**From the Filter Editor Panel:**
1. Click the **Edit Filter** icon in the Filter Editor Panel

## Apply Filter Criteria

The Filter Editor allows building filter expressions by selecting:
- **Field** — the column to filter
- **Operator** — the filter condition (e.g., Contains, Equals, Greater Than)
- **Value** — the filter value

Multiple conditions can be combined with `AND` or `OR`. Conditions can be organized into nested groups for complex expressions.

**Filter Editor actions:**

| Action | Behavior |
|---|---|
| **Apply** | Applies the current filter criteria; Filter Editor stays open |
| **OK** | Applies the current filter criteria; closes the Filter Editor |
| **Cancel** | Discards pending changes; closes the Filter Editor |

## Filter Editor Panel

The Filter Editor Panel displays the current filter expression and provides controls to manage it. Show or position it using `SfDataGrid.FilterPanelPosition`:

| Value | Behavior |
|---|---|
| `Top` | Panel displayed above the grid records |
| `Bottom` | Panel displayed below the grid records |
| `None` (default) | Panel hidden |

```xml
<syncfusion:SfDataGrid x:Name="dataGrid"
                       AllowFiltering="True"
                       EnableFilterEditor="True"
                       FilterPanelPosition="Bottom"
                       ItemsSource="{Binding Orders}" />
```

```csharp
dataGrid.FilterPanelPosition = FilterPanelPosition.Bottom;
```

**Panel capabilities:**
- Enable or suspend the applied filter
- Expand or collapse the displayed filter expression
- Open the Filter Editor to modify filter criteria
- Hide the panel without clearing the filter

> Setting `FilterPanelPosition` to `None` only hides the panel. It does **not** clear or modify any applied filters.

## Expand or Collapse the Filter Expression

The Filter Editor Panel shows the filter expression in a compact single-line view by default.

- When the expression exceeds available width, an **expand icon** appears — click it to wrap to multiple lines
- Click the **collapse icon** to return to single-line view

Expanding or collapsing the expression changes only its presentation — it does not modify the applied filter.

## Enable or Suspend Filtering

The **Enable Filter** checkbox in the Filter Editor Panel toggles the filter without removing it:

| State | Effect |
|---|---|
| **Checked** | Retained filter criteria are applied to the grid |
| **Unchecked** | Filter is suspended; criteria are retained but not applied |

Re-checking the box reapplies the retained filter criteria. The checkbox always reflects the current filtering state.

## Close the Filter Editor Panel

Click the **Close** icon in the Filter Editor Panel to hide it. Closing the panel:
- Does **not** clear applied filters
- Does **not** modify retained filter criteria
- Does **not** change `FilterPanelPosition`
- Does **not** disable filtering in the grid

**Panel visibility after closing:**
- If `FilterPanelPosition` is `Top` or `Bottom` → panel reappears on the next filtering change
- If `FilterPanelPosition` is `None` → panel stays hidden even after filtering changes

## Filter Synchronization

The Filter Editor and Filter Editor Panel stay synchronized with all supported filtering operations:

- Checkbox Filter UI
- Advanced Filter UI
- Filter Row
- `GridColumn.FilterPredicates` (programmatic)
- Filter Editor itself

When the filtering state changes from any of these sources:
1. The grid updates displayed records
2. The Filter Editor Panel updates the displayed expression
3. The **Enable Filter** checkbox reflects the active state
4. A manually closed panel becomes visible again (if `FilterPanelPosition` is `Top` or `Bottom`)

## Limitations

| Limitation | Details |
|---|---|
| Filter criteria scope | Can only be created for columns available in `SfDataGrid.Columns` |
| Disabled filter columns | Columns with filtering disabled are not available for filter criteria |
| View.Filter not shown | Filters applied via `SfDataGrid.View.Filter` delegate are not displayed as editable expressions in the Filter Editor |
