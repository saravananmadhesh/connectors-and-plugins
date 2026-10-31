# Sorting for WPF TreeGrid

## Overview

WPF TreeGrid supports single and multi-column sorting with custom comparers and tri-state sorting.

## Basic Sorting

```xaml
<syncfusion:SfTreeGrid AllowSorting="True" 
                       AllowTriStateSorting="True"
                       SortClickAction="DoubleClick"
                       ShowSortNumbers="True"/>
```

## Sort Click Actions

```csharp
// Single click to sort
treeGrid.SortClickAction = SortClickAction.SingleClick;

// Double click to sort
treeGrid.SortClickAction = SortClickAction.DoubleClick;
```

## Programmatic Sorting

```csharp
// Add sort descriptor
treeGrid.SortColumnDescriptions.Add(new SortColumnDescription()
{
    ColumnName = "Salary",
    SortDirection = ListSortDirection.Descending
});

// Multi-column sort
treeGrid.SortColumnDescriptions.Add(new SortColumnDescription() 
{ 
    ColumnName = "Department", 
    SortDirection = ListSortDirection.Ascending 
});
treeGrid.SortColumnDescriptions.Add(new SortColumnDescription() 
{ 
    ColumnName = "Salary", 
    SortDirection = ListSortDirection.Descending 
});

// Clear sorting
treeGrid.SortColumnDescriptions.Clear();
```

## Column-Level Sorting

```xaml
<syncfusion:TreeGridTextColumn MappingName="FirstName" 
                               AllowSorting="True"/>
<syncfusion:TreeGridTextColumn MappingName="ID" 
                               AllowSorting="False"/>
```

## Custom Sort Comparer

```csharp
public class CustomSortComparer : IComparer<object>, ISortDirection
{
    private ListSortDirection _sortDirection;
    
    public ListSortDirection SortDirection
    {
        get => _sortDirection;
        set => _sortDirection = value;
    }

    public int Compare(object x, object y)
    {
        var xValue = x?.ToString();
        var yValue = y?.ToString();

        // Custom comparison logic
        int result = string.Compare(xValue, yValue, StringComparison.OrdinalIgnoreCase);
        
        return SortDirection == ListSortDirection.Ascending ? result : -result;
    }
}

// Apply custom comparer
var column = treeGrid.Columns["FirstName"];
column.SortComparer = new CustomSortComparer();
```

## Numeric String Sorting

```csharp
public class NumericStringSortComparer : IComparer<object>, ISortDirection
{
    public ListSortDirection SortDirection { get; set; }

    public int Compare(object x, object y)
    {
        int xNum, yNum;
        
        if (int.TryParse(x?.ToString(), out xNum) && int.TryParse(y?.ToString(), out yNum))
        {
            return SortDirection == ListSortDirection.Ascending 
                ? xNum.CompareTo(yNum) 
                : yNum.CompareTo(xNum);
        }
        
        return 0;
    }
}
```

## Sorting Events

```csharp
// Before sorting
treeGrid.SortColumnsChanging += (s, e) =>
{
    if (e.AddedItems.Any(item => item.ColumnName == "ID"))
    {
        // Cancel sorting on ID column
        e.Cancel = true;
    }
};

// After sorting
treeGrid.SortColumnsChanged += (s, e) =>
{
    Debug.WriteLine($"Sorted by: {string.Join(", ", e.AddedItems.Select(i => i.ColumnName))}");
};
```

## Tri-State Sorting

```csharp
// Enable tri-state sorting (Ascending -> Descending -> Unsorted)
treeGrid.AllowTriStateSorting = true;
```

## Initial Sort Direction

By default, when a column is sorted for the first time by clicking its header, the data is arranged in ascending order. Use `InitialSortDirection` to control the first sort direction at grid or column level.

### Grid-Level Initial Sort Direction

Set the same initial sort direction for all sortable columns:

```xaml
<syncfusion:SfTreeGrid Name="treeGrid"
                       AllowSorting="True"
                       InitialSortDirection="Descending"
                       AutoExpandMode="RootNodesExpanded"
                       ChildPropertyName="Children"
                       ItemsSource="{Binding EmployeeDetails}">
</syncfusion:SfTreeGrid>
```

```csharp
treeGrid.InitialSortDirection = ListSortDirection.Descending;
```

When set to `Descending`, the first click on any column header sorts in descending order.

### Column-Level Initial Sort Direction

Define the initial sort direction for specific columns:

```xaml
<syncfusion:SfTreeGrid Name="treeGrid"
                       AllowSorting="True"
                       AutoGenerateColumns="False"
                       AutoExpandMode="RootNodesExpanded"
                       ChildPropertyName="Children"
                       ItemsSource="{Binding EmployeeDetails}">
    <syncfusion:SfTreeGrid.Columns>
        <syncfusion:TreeGridTextColumn MappingName="ID" InitialSortDirection="Descending" />
        <syncfusion:TreeGridTextColumn MappingName="FirstName" HeaderText="First Name" InitialSortDirection="Ascending" />
        <syncfusion:TreeGridTextColumn MappingName="LastName" HeaderText="Last Name" />
    </syncfusion:SfTreeGrid.Columns>
</syncfusion:SfTreeGrid>
```

```csharp
treeGrid.Columns["ID"].InitialSortDirection = ListSortDirection.Descending;
treeGrid.Columns["FirstName"].InitialSortDirection = ListSortDirection.Ascending;
treeGrid.Columns["LastName"].InitialSortDirection = ListSortDirection.Ascending; // Uses grid default
```

In this example:
- `ID` column: sorts descending on first click
- `FirstName` column: sorts ascending on first click
- `LastName` column: uses the grid-level default

**Priority:** Column-level `InitialSortDirection` takes higher priority than grid-level setting.

### Initial Sorting Sequence with Tri-State Sorting

When `AllowTriStateSorting` is enabled, the sorting sequence follows the `InitialSortDirection`:

**If InitialSortDirection is `Descending`:**
1. Descending (first click)
2. Ascending (second click)
3. Clear sorting (third click)

**If InitialSortDirection is `Ascending` (default):**
1. Ascending (first click)
2. Descending (second click)
3. Clear sorting (third click)

Example with tri-state sorting:

```csharp
treeGrid.AllowSorting = true;
treeGrid.AllowTriStateSorting = true;
treeGrid.InitialSortDirection = ListSortDirection.Descending;

// Now clicking a column header cycles: Descending -> Ascending -> Unsorted
```

**Important:** `InitialSortDirection` affects only the first sort action when clicking the header. It does not automatically sort the column when the control loads.

## Best Practices

### 1. Performance Optimization

```csharp
// Use custom comparers for complex sorting
// Implement IComparable in your data model for better performance
public class Employee : IComparable<Employee>
{
    public int CompareTo(Employee other)
    {
        return this.Salary.CompareTo(other.Salary);
    }
}
```

### 2. Multi-Column Sorting

```csharp
// Show sort numbers for clarity
treeGrid.ShowSortNumbers = true;
```

## Troubleshooting

### Issue: Sorting Not Working

```csharp
// Verify AllowSorting is enabled
treeGrid.AllowSorting = true;

// Check column-level setting
column.AllowSorting = true;
```

### Issue: Custom Comparer Not Applied

```csharp
// Ensure ISortDirection is implemented
public class CustomComparer : IComparer<object>, ISortDirection
{
    public ListSortDirection SortDirection { get; set; }
    // ...
}
```
