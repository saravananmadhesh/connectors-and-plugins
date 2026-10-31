# Data Operations in WinUI DataGrid

Complete guide to sorting, filtering, and grouping operations in Syncfusion WinUI DataGrid. These operations help organize and analyze tabular data effectively.

## Table of Contents
- [Sorting](#sorting)
  - [Enable Sorting](#enable-sorting)
  - [Multi-Column Sorting](#multi-column-sorting)
  - [Programmatic Sorting](#programmatic-sorting)
  - [Custom Sorting](#custom-sorting)
  - [Tri-State Sorting](#tri-state-sorting)
  - [Initial Sort Direction](#initial-sort-direction)
- [Filtering](#filtering)
  - [Programmatic Filtering](#programmatic-filtering)
  - [View Filtering](#view-filtering)
  - [Column Filtering](#column-filtering)
  - [Filter Row](#filter-row)
- [Grouping](#grouping)
  - [UI Grouping](#ui-grouping)
  - [Programmatic Grouping](#programmatic-grouping)
  - [Multi-Level Grouping](#multi-level-grouping)
  - [Custom Grouping](#custom-grouping)
- [Combining Operations](#combining-operations)

## Sorting

Sorting rearranges rows based on column values in ascending or descending order.

### Enable Sorting

**Grid-Level:**
```xml
<dataGrid:SfDataGrid x:Name="sfDataGrid"
                     AllowSorting="True"
                     ItemsSource="{Binding Orders}" />
```

```csharp
sfDataGrid.AllowSorting = true;
```

**Column-Level (takes priority):**
```xml
<dataGrid:SfDataGrid AllowSorting="False" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <!-- Enable sorting only for OrderID -->
        <dataGrid:GridTextColumn MappingName="OrderID" AllowSorting="True" />
        <dataGrid:GridTextColumn MappingName="CustomerID" AllowSorting="False" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Sort Click Action

Change when sorting occurs (single click or double click):

```xml
<dataGrid:SfDataGrid AllowSorting="True"
                     SortClickAction="DoubleClick"
                     ItemsSource="{Binding Orders}" />
```

**Options:**
- `SingleClick` (default) - Sort on single click
- `DoubleClick` - Sort on double click

### Tri-State Sorting

Enable three-state sorting cycle: Ascending → Descending → Unsorted

```xml
<dataGrid:SfDataGrid AllowSorting="True"
                     AllowTriStateSorting="True"
                     ItemsSource="{Binding Orders}" />
```

**Sorting Sequence:**
1. First click: Ascending ↑
2. Second click: Descending ↓
3. Third click: Unsorted (original order)

### Multi-Column Sorting

Sort multiple columns by holding **Ctrl** key while clicking column headers.

**Display Sort Numbers:**
```xml
<dataGrid:SfDataGrid AllowSorting="True"
                     ShowSortNumbers="True"
                     ItemsSource="{Binding Orders}" />
```

This shows the sort order number in column headers (1, 2, 3, etc.).

### Programmatic Sorting

Add/remove sorting without user interaction:

**Add Sort Columns:**
```xml
<dataGrid:SfDataGrid x:Name="sfDataGrid" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.SortColumnDescriptions>
        <grids:SortColumnDescription ColumnName="OrderID" SortDirection="Ascending" />
        <grids:SortColumnDescription ColumnName="CustomerName" SortDirection="Descending" />
    </dataGrid:SfDataGrid.SortColumnDescriptions>
</dataGrid:SfDataGrid>
```

**Code-Behind:**
```csharp
// Add sorting
sfDataGrid.SortColumnDescriptions.Add(new SortColumnDescription
{
    ColumnName = "OrderID",
    SortDirection = SortDirection.Ascending
});

// Remove sorting for specific column
var sortDesc = sfDataGrid.SortColumnDescriptions
    .FirstOrDefault(col => col.ColumnName == "OrderID");
if (sortDesc != null)
    sfDataGrid.SortColumnDescriptions.Remove(sortDesc);

// Clear all sorting
sfDataGrid.SortColumnDescriptions.Clear();
```

### Custom Sorting

Implement custom sort logic using `SortComparer`:

**1. Create Custom Comparer:**
```csharp
public class CustomSortComparer : IComparer<object>
{
    public int Compare(object x, object y)
    {
        // Sort by string length instead of alphabetically
        int lengthX, lengthY;
        
        if (x.GetType() == typeof(OrderInfo))
        {
            lengthX = ((OrderInfo)x).CustomerName.Length;
            lengthY = ((OrderInfo)y).CustomerName.Length;
        }
        else if (x.GetType() == typeof(Group))
        {
            // Handle grouped data
            lengthX = ((Group)x).Key.ToString().Length;
            lengthY = ((Group)y).Key.ToString().Length;
        }
        else
        {
            lengthX = x.ToString().Length;
            lengthY = y.ToString().Length;
        }
        
        return lengthX.CompareTo(lengthY);
    }
}
```

**2. Add to SfDataGrid:**
```xml
<dataGrid:SfDataGrid x:Name="sfDataGrid" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.SortComparers>
        <data:SortComparer PropertyName="CustomerName" 
                          Comparer="{StaticResource customComparer}" />
    </dataGrid:SfDataGrid.SortComparers>
</dataGrid:SfDataGrid>
```

```csharp
sfDataGrid.SortComparers.Add(new SortComparer
{
    PropertyName = "CustomerName",
    Comparer = new CustomSortComparer()
});
```

### Sorting Events

**SortColumnsChanging** - Before sorting applied (cancellable):
```csharp
sfDataGrid.SortColumnsChanging += SfDataGrid_SortColumnsChanging;

private void SfDataGrid_SortColumnsChanging(object sender, GridSortColumnsChangingEventArgs e)
{
    // e.AddedItems - newly added sort descriptions
    // e.RemovedItems - removed sort descriptions
    // e.Action - Add, Remove, Replace, Reset, etc.
    
    // Cancel sorting for specific column
    if (e.AddedItems.Any(item => item.ColumnName == "OrderID"))
    {
        e.Cancel = true;
    }
}
```

**SortColumnsChanged** - After sorting applied:
```csharp
sfDataGrid.SortColumnsChanged += SfDataGrid_SortColumnsChanged;

private void SfDataGrid_SortColumnsChanged(object sender, GridSortColumnsChangedEventArgs e)
{
    // Sorting has been applied
    Debug.WriteLine($"Sorted columns: {sfDataGrid.SortColumnDescriptions.Count}");
}
```

### Initial Sort Direction

By default, when a column is sorted for the first time by clicking its header, the data is arranged in ascending order. You can change this behavior using the `InitialSortDirection` property to specify whether a column should sort in ascending or descending order when sorting is applied for the first time.

**Note:** `GridColumn.InitialSortDirection` takes higher priority than `SfDataGrid.InitialSortDirection` property.

#### Set Initial Sort Direction at Grid Level

Use the `SfDataGrid.InitialSortDirection` property to apply the same initial sort direction to all sortable columns:

**XAML:**
```xml
<dataGrid:SfDataGrid x:Name="sfDataGrid"
                     AllowSorting="True"
                     InitialSortDirection="Descending"
                     ItemsSource="{Binding Orders}" />
```

**Code-Behind:**
```csharp
sfDataGrid.InitialSortDirection = ListSortDirection.Descending;
```

In this example, the first time the user sorts any column, it sorts in descending order.

#### Set Initial Sort Direction at Column Level

Use the `GridColumn.InitialSortDirection` property to define the initial sort direction for a specific column:

**XAML:**
```xml
<dataGrid:SfDataGrid x:Name="sfDataGrid"
                     AllowSorting="True"
                     AutoGenerateColumns="False"
                     ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" HeaderText="Order ID" InitialSortDirection="Descending" />
        <dataGrid:GridTextColumn MappingName="CustomerName" HeaderText="Customer Name" InitialSortDirection="Ascending" />
        <dataGrid:GridTextColumn MappingName="Country" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

**Code-Behind:**
```csharp
sfDataGrid.Columns["OrderID"].InitialSortDirection = ListSortDirection.Descending;
sfDataGrid.Columns["CustomerName"].InitialSortDirection = ListSortDirection.Ascending;
```

In this example:
- `OrderID` column starts in descending order when sorted for the first time
- `CustomerName` column starts in ascending order
- `Country` column uses the grid-level default

#### Initial Sorting Sequence with Tri-State Sorting

When `AllowTriStateSorting` is enabled, the sorting sequence includes clear sorting after the ascending and descending states. The sorting sequence is determined by the `InitialSortDirection` property:

**When InitialSortDirection is Descending:**
1. First click: Descending ↓
2. Second click: Ascending ↑
3. Third click: Clear sorting (original order)

**When InitialSortDirection is Ascending:**
1. First click: Ascending ↑
2. Second click: Descending ↓
3. Third click: Clear sorting (original order)

**Note:** The `InitialSortDirection` property affects the initial sort direction only when a column is sorted for the first time by clicking its header. It does not automatically sort the column when the control is loaded.

## Filtering

Filtering displays only rows that meet specified criteria.

### Programmatic Filtering

#### View Filtering

Filter using a predicate function:

```csharp
// Set filter predicate
sfDataGrid.View.Filter = FilterRecords;
sfDataGrid.View.RefreshFilter();

private bool FilterRecords(object item)
{
    var order = item as OrderInfo;
    if (order == null) return false;
    
    // Show only orders from Germany
    return order.Country == "Germany";
}

// Remove filter
sfDataGrid.View.Filter = null;
sfDataGrid.View.RefreshFilter();
```

#### Column Filtering

Filter using FilterPredicates on specific columns:

```csharp
// Add filter for OrderID = 1005
sfDataGrid.Columns["OrderID"].FilterPredicates.Add(new FilterPredicate
{
    FilterType = FilterType.Equals,
    FilterValue = "1005"
});

// Add multiple filters
sfDataGrid.Columns["Country"].FilterPredicates.Add(new FilterPredicate
{
    FilterType = FilterType.Equals,
    FilterValue = "Germany",
    FilterBehavior = FilterBehavior.StringTyped
});

// Clear filters
sfDataGrid.Columns["OrderID"].FilterPredicates.Clear();
```

**FilterType Options:**
- `Equals`, `NotEquals`
- `LessThan`, `LessThanOrEqual`
- `GreaterThan`, `GreaterThanOrEqual`
- `Contains`, `StartsWith`, `EndsWith`

**FilterBehavior:**
- `StringTyped` - Treats all values as strings
- `StronglyTyped` - Respects data type

### Improve Performance with Batch Filtering

```csharp
sfDataGrid.View.BeginInit();

// Add multiple filters
foreach (var filterValue in filterValues)
{
    sfDataGrid.Columns["OrderID"].FilterPredicates.Add(new FilterPredicate
    {
        FilterType = FilterType.Equals,
        FilterValue = filterValue
    });
}

sfDataGrid.View.EndInit(); // Applies all filters at once
```

### Filter Row

Enable built-in filter row UI:

```xml
<dataGrid:SfDataGrid AllowFiltering="True"
                     FilterRowPosition="FixedTop"
                     ItemsSource="{Binding Orders}" />
```

**FilterRowPosition Options:**
- `Top` - Filter row at top (scrolls with data)
- `FixedTop` - Fixed filter row at top
- `Bottom` - Filter row at bottom
- `None` - No filter row

### Filter Events

**FilterChanging** - Before filter applied:
```csharp
sfDataGrid.FilterChanging += SfDataGrid_FilterChanging;

private void SfDataGrid_FilterChanging(object sender, GridFilterEventArgs e)
{
    // e.FilterPredicates - filter predicates being applied
    // e.Column - column being filtered
    
    // Cancel filtering
    if (e.Column.MappingName == "OrderID")
        e.Handled = true;
}
```

**FilterChanged** - After filter applied:
```csharp
sfDataGrid.FilterChanged += SfDataGrid_FilterChanged;

private void SfDataGrid_FilterChanged(object sender, GridFilterEventArgs e)
{
    Debug.WriteLine($"Filter applied to {e.Column.MappingName}");
}
```

## Grouping

Grouping organizes data into hierarchical structure based on column values.

### UI Grouping

Enable drag-and-drop grouping:

```xml
<dataGrid:SfDataGrid AllowGrouping="True"
                     ShowGroupDropArea="True"
                     ItemsSource="{Binding Orders}" />
```

Users drag column headers to the GroupDropArea to group by that column.

**Column-Level Control:**
```xml
<dataGrid:GridTextColumn MappingName="OrderID" AllowGrouping="True" />
<dataGrid:GridTextColumn MappingName="CustomerID" AllowGrouping="False" />
```

### Programmatic Grouping

Group without user interaction:

```xml
<dataGrid:SfDataGrid AllowGrouping="True" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.GroupColumnDescriptions>
        <dataGrid:GroupColumnDescription ColumnName="Country" />
    </dataGrid:SfDataGrid.GroupColumnDescriptions>
</dataGrid:SfDataGrid>
```

```csharp
// Add grouping
sfDataGrid.GroupColumnDescriptions.Add(new GroupColumnDescription
{
    ColumnName = "Country"
});

// Remove grouping
var groupDesc = sfDataGrid.GroupColumnDescriptions
    .FirstOrDefault(g => g.ColumnName == "Country");
if (groupDesc != null)
    sfDataGrid.GroupColumnDescriptions.Remove(groupDesc);

// Clear all grouping
sfDataGrid.GroupColumnDescriptions.Clear();
```

### Multi-Level Grouping

Group by multiple columns to create nested groups:

```csharp
// Group by Country, then by City
sfDataGrid.GroupColumnDescriptions.Add(new GroupColumnDescription { ColumnName = "Country" });
sfDataGrid.GroupColumnDescriptions.Add(new GroupColumnDescription { ColumnName = "ShipCity" });
```

### Expand/Collapse Groups

```csharp
// Expand all groups
sfDataGrid.ExpandAllGroup();

// Collapse all groups
sfDataGrid.CollapseAllGroup();

// Expand specific group level
sfDataGrid.ExpandGroupsAtLevel(0); // Expand first level only

// Collapse specific group level
sfDataGrid.CollapseGroupsAtLevel(1); // Collapse second level

// Expand/collapse specific group
sfDataGrid.ExpandGroup(group);
sfDataGrid.CollapseGroup(group);
```

### Custom Grouping

Implement custom grouping logic:

**1. Create Custom Comparer:**
```csharp
public class CustomGroupComparer : IComparer<object>
{
    public int Compare(object x, object y)
    {
        // Group by first letter of CustomerName
        var orderX = x as OrderInfo;
        var orderY = y as OrderInfo;
        
        if (orderX == null || orderY == null)
            return 0;
        
        var firstLetterX = orderX.CustomerName.Substring(0, 1).ToUpper();
        var firstLetterY = orderY.CustomerName.Substring(0, 1).ToUpper();
        
        return string.Compare(firstLetterX, firstLetterY);
    }
}
```

**2. Apply Custom Comparer:**
```csharp
var groupDesc = new GroupColumnDescription
{
    ColumnName = "CustomerName",
    Comparer = new CustomGroupComparer()
};
sfDataGrid.GroupColumnDescriptions.Add(groupDesc);
```

### GroupBy Display Mode

Control how group keys are displayed:

```xml
<dataGrid:SfDataGrid AllowGrouping="True" 
                     GroupCaptionTextFormat="{}{Key}: {ItemsCount} items"
                     ItemsSource="{Binding Orders}" />
```

**Format Tokens:**
- `{Key}` - Group key value
- `{ItemsCount}` - Number of items in group

### Grouping Events

**GroupExpanding** - Before group expands:
```csharp
sfDataGrid.GroupExpanding += SfDataGrid_GroupExpanding;

private void SfDataGrid_GroupExpanding(object sender, GroupChangingEventArgs e)
{
    // e.Group - group being expanded
    // Cancel expansion
    if (e.Group.Key.ToString() == "Germany")
        e.Cancel = true;
}
```

**GroupExpanded** - After group expands:
```csharp
sfDataGrid.GroupExpanded += SfDataGrid_GroupExpanded;

private void SfDataGrid_GroupExpanded(object sender, GroupChangedEventArgs e)
{
    Debug.WriteLine($"Group {e.Group.Key} expanded");
}
```

**GroupCollapsing/GroupCollapsed** - Similar for collapse operations.

## Combining Operations

Use sorting, filtering, and grouping together:

```csharp
// 1. Filter data
sfDataGrid.View.Filter = item =>
{
    var order = item as OrderInfo;
    return order != null && order.UnitPrice > 50;
};
sfDataGrid.View.RefreshFilter();

// 2. Group filtered data
sfDataGrid.GroupColumnDescriptions.Add(new GroupColumnDescription 
{ 
    ColumnName = "Country" 
});

// 3. Sort within groups
sfDataGrid.SortColumnDescriptions.Add(new SortColumnDescription
{
    ColumnName = "OrderDate",
    SortDirection = SortDirection.Descending
});
```

### Execution Order

1. **Filtering** - Applied first, determines which rows are visible
2. **Grouping** - Applied to filtered results
3. **Sorting** - Applied to grouped results

### Performance Tips

**Batch Multiple Operations:**
```csharp
using (sfDataGrid.View.DeferRefresh())
{
    // All operations applied once after DeferRefresh disposes
    sfDataGrid.View.Filter = FilterPredicate;
    sfDataGrid.GroupColumnDescriptions.Add(new GroupColumnDescription { ColumnName = "Country" });
    sfDataGrid.SortColumnDescriptions.Add(new SortColumnDescription { ColumnName = "OrderID" });
}
```

**Or use BeginInit/EndInit:**
```csharp
sfDataGrid.View.BeginInit();

sfDataGrid.View.Filter = FilterPredicate;
sfDataGrid.GroupColumnDescriptions.Add(new GroupColumnDescription { ColumnName = "Country" });
sfDataGrid.SortColumnDescriptions.Add(new SortColumnDescription { ColumnName = "OrderID" });

sfDataGrid.View.EndInit(); // Applies all operations at once
```

## Common Scenarios

### Scenario 1: Sort and Filter Together

```csharp
// Show orders from Germany, sorted by date
sfDataGrid.View.Filter = item =>
{
    var order = item as OrderInfo;
    return order?.Country == "Germany";
};
sfDataGrid.View.RefreshFilter();

sfDataGrid.SortColumnDescriptions.Add(new SortColumnDescription
{
    ColumnName = "OrderDate",
    SortDirection = SortDirection.Descending
});
```

### Scenario 2: Multi-Level Grouping with Sorting

```csharp
// Group by Country > City, sort by OrderID within groups
sfDataGrid.GroupColumnDescriptions.Add(new GroupColumnDescription { ColumnName = "Country" });
sfDataGrid.GroupColumnDescriptions.Add(new GroupColumnDescription { ColumnName = "ShipCity" });

sfDataGrid.SortColumnDescriptions.Add(new SortColumnDescription
{
    ColumnName = "OrderID",
    SortDirection = SortDirection.Ascending
});
```

### Scenario 3: Dynamic Filter Based on User Input

```csharp
private void SearchTextBox_TextChanged(object sender, TextChangedEventArgs e)
{
    var searchText = searchTextBox.Text.ToLower();
    
    sfDataGrid.View.Filter = item =>
    {
        var order = item as OrderInfo;
        if (order == null) return false;
        
        return order.CustomerName.ToLower().Contains(searchText) ||
               order.Country.ToLower().Contains(searchText);
    };
    
    sfDataGrid.View.RefreshFilter();
}
```

## Best Practices

1. **Use DeferRefresh()** when applying multiple operations to avoid multiple refreshes
2. **Enable ShowSortNumbers** for multi-column sorting clarity
3. **Limit grouping levels** to 2-3 for performance
4. **Use FilterBehavior.StronglyTyped** for numeric/date comparisons
5. **Collapse groups by default** for large datasets using `AutoExpandGroups="False"`
6. **Clear filters/sorts/groups** when changing ItemsSource
7. **Use custom comparers** for complex sorting/grouping logic
8. **Handle GroupExpanding event** to load data on-demand for large grouped datasets
