# Sorting and Filtering in WinUI TreeGrid

## Table of Contents
- [Sorting](#sorting)
- [Filtering](#filtering)

## Sorting

Enable users to sort data by clicking column headers.

### Enable Sorting

```xaml
<treeGrid:SfTreeGrid AllowSorting="True" 
                    ItemsSource="{Binding Employees}" />
```

```csharp
sfTreeGrid.AllowSorting = true;
```

**Default behavior:** Click header to sort ascending, click again for descending, click third time to remove sort.

### Disable Sorting for Specific Column

```xaml
<treeGrid:TreeGridTextColumn MappingName="Notes" 
                            AllowSorting="False" />
```

### Sort Column Descriptions

Define initial sorting programmatically:

```csharp
sfTreeGrid.SortColumnDescriptions.Add(new SortColumnDescription
{
    ColumnName = "FirstName",
    SortDirection = SortDirection.Ascending
});
```

```xaml
<treeGrid:SfTreeGrid>
    <treeGrid:SfTreeGrid.SortColumnDescriptions>
        <grid:SortColumnDescription ColumnName="LastName" 
                                   SortDirection="Ascending" />
    </treeGrid:SfTreeGrid.SortColumnDescriptions>
</treeGrid:SfTreeGrid>
```

### Multi-Column Sorting

Sort by multiple columns (hold Ctrl while clicking headers):

```csharp
sfTreeGrid.SortColumnDescriptions.Add(new SortColumnDescription
{
    ColumnName = "Department",
    SortDirection = SortDirection.Ascending
});
sfTreeGrid.SortColumnDescriptions.Add(new SortColumnDescription
{
    ColumnName = "Salary",
    SortDirection = SortDirection.Descending
});
```

### Sort Click Action

Control sorting behavior:

```csharp
sfTreeGrid.SortClickAction = SortClickAction.DoubleClick;
```

| Action | Description |
|--------|-------------|
| **SingleClick** (default) | Sort on single click |
| **DoubleClick** | Sort on double click |

### Sorting Events

**SortColumnsChanging** - Before sort applied:

```csharp
sfTreeGrid.SortColumnsChanging += (sender, e) =>
{
    // Cancel sorting for specific column
    if (e.AddedItems[0].ColumnName == "ID")
    {
        e.Cancel = true;
        ShowMessage("Cannot sort by ID");
    }
};
```

**SortColumnsChanged** - After sort applied:

```csharp
sfTreeGrid.SortColumnsChanged += (sender, e) =>
{
    var sortInfo = sfTreeGrid.SortColumnDescriptions;
    StatusLabel.Text = $"Sorted by {sortInfo.Count} column(s)";
};
```

### Custom Sorting

Implement custom sort logic using `IComparer`:

```csharp
public class CustomSalaryComparer : IComparer<object>
{
    public int Compare(object x, object y)
    {
        var emp1 = x as Employee;
        var emp2 = y as Employee;
        
        // Custom logic: Sort by salary, but managers always first
        if (emp1.Title == "Manager" && emp2.Title != "Manager")
            return -1;
        if (emp1.Title != "Manager" && emp2.Title == "Manager")
            return 1;
            
        return emp1.Salary.CompareTo(emp2.Salary);
    }
}

// Apply custom comparer
var column = sfTreeGrid.Columns["Salary"];
column.Comparer = new CustomSalaryComparer();
```

### Clear Sorting

```csharp
sfTreeGrid.SortColumnDescriptions.Clear();
```

### Tri-State Sorting

Enable/disable the ability to clear sort by clicking header third time:

```csharp
sfTreeGrid.AllowTriStateSorting = true;  // Default
```

### Initial Sort Direction

Control the sort direction when a column is first sorted by clicking its header. By default, columns sort in ascending order. Use `InitialSortDirection` to change this behavior.

**At Grid Level (for all columns):**

```xaml
<treeGrid:SfTreeGrid AllowSorting="True"
                    InitialSortDirection="Descending"
                    ItemsSource="{Binding Employees}" />
```

```csharp
sfTreeGrid.InitialSortDirection = ListSortDirection.Descending;
```

When set to `Descending`, the first click on any column header sorts in descending order instead of ascending.

**At Column Level (for specific column):**

```xaml
<treeGrid:SfTreeGrid AutoGenerateColumns="False"
                    AllowSorting="True"
                    ItemsSource="{Binding Employees}">
    <treeGrid:SfTreeGrid.Columns>
        <treeGrid:TreeGridTextColumn MappingName="FirstName" 
                                     HeaderText="First Name"
                                     InitialSortDirection="Ascending" />
        <treeGrid:TreeGridNumericColumn MappingName="Salary" 
                                        HeaderText="Salary"
                                        InitialSortDirection="Descending" />
        <treeGrid:TreeGridTextColumn MappingName="LastName" 
                                     HeaderText="Last Name" />
    </treeGrid:SfTreeGrid.Columns>
</treeGrid:SfTreeGrid>
```

```csharp
// Set initial sort direction for specific column
sfTreeGrid.Columns["ID"].InitialSortDirection = ListSortDirection.Descending;
sfTreeGrid.Columns["Salary"].InitialSortDirection = ListSortDirection.Descending;
```

**Priority:**
- Column-level `InitialSortDirection` takes priority over grid-level setting
- Only affects the first sort click; subsequent clicks toggle between ascending/descending

**Use Cases:**
- Salary column: Often first sorted descending (highest to lowest)
- Date columns: Often first sorted descending (newest to oldest)
- ID or numeric identifiers: May prefer descending by default
- Alphabetic columns: Usually ascending (default behavior)

## Filtering

Enable Excel-style filtering UI.

### Enable Filtering

```xaml
<treeGrid:SfTreeGrid AllowFiltering="True" 
                    ItemsSource="{Binding Employees}" />
```

```csharp
sfTreeGrid.AllowFiltering = true;
```

**Result:** Filter icon appears in column headers. Click to open filter UI.

### Disable Filtering for Specific Column

```xaml
<treeGrid:TreeGridTextColumn MappingName="InternalNotes" 
                            AllowFiltering="False" />
```

Define filters programmatically:

```csharp
// Add text filter
sfTreeGrid.Columns["FirstName"].FilterPredicates.Add(new FilterPredicate
{
    FilterType = FilterType.Contains,
    FilterValue = "John"
});

// Add numeric filter
sfTreeGrid.Columns["Salary"].FilterPredicates.Add(new FilterPredicate
{
    FilterType = FilterType.GreaterThan,
    FilterValue = 50000
});

```

### Filter Types

| FilterType | Description | Example |
|------------|-------------|---------|
| **Equals** | Exact match | FirstName = "John" |
| **NotEquals** | Not equal | Status != "Inactive" |
| **Contains** | Contains text | FirstName contains "son" |
| **StartsWith** | Begins with | FirstName starts with "J" |
| **EndsWith** | Ends with | Email ends with ".com" |
| **GreaterThan** | Numeric > | Salary > 50000 |
| **GreaterThanOrEqual** | Numeric >= | Age >= 18 |
| **LessThan** | Numeric < | Age < 65 |
| **LessThanOrEqual** | Numeric <= | Salary <= 100000 |

### Filter Behavior

**FilterBehavior** property controls how tree filters:

```csharp
sfTreeGrid.FilterBehavior = FilterBehavior.StronglyTyped;
```

| Behavior | Description |
|----------|-------------|
| **StronglyTyped** (default) | Filters entire row including parent/child |
| **StringTyped** | String-based filtering |

### Filtering Events

**FilterChanging** - Before filter applied:

```csharp
sfTreeGrid.FilterChanging += (s, e) =>
{
    if (e.FilterPredicates == null || e.FilterPredicates.Count == 0)
        return;

    // Prevent filtering for specific column
    if (e.Column.MappingName == "ID")
    {
        e.Handled = true;
        ShowMessage("Cannot filter by ID");
        return;
    }

    // Log filter action
    var filter = e.FilterPredicates[0];
    Log($"Filtering {e.Column.MappingName} by {filter.FilterType}");
};
```

**FilterChanged** - After filter applied:

```csharp
sfTreeGrid.FilterChanged += (sender, e) =>
{
    var visibleCount = sfTreeGrid.View.Nodes.Count;
    StatusLabel.Text = $"{visibleCount} rows visible";
};
```

### Advanced Filter Options

### Filter Mode

Filter UI can be customized using the `FilterItemsPopulating` event.

```csharp
sfTreeGrid.FilterItemsPopulating += (s, e) =>
{
    // Apply Advanced filter UI for specific column
    if (e.Column.MappingName == "EmployeeID")
    {
        e.FilterControl.FilterMode = FilterMode.Advanced;
    }
};
```

### Clear Filters

```csharp
// Clear all filters
sfTreeGrid.ClearFilters();

// Or clear specific column filter
var column = sfTreeGrid.Columns["Department"];

var predicate = column.FilterPredicates
                      .FirstOrDefault(p => p.FilterValue?.ToString() == "SomeValue");

if (predicate != null)
{
    column.FilterPredicates.Remove(predicate);
}
```

### Custom Filter UI

Customize filter popup using events:

```csharp
sfTreeGrid.FilterItemsPopulating += (s, e) =>
{
    if (e.Column.MappingName != "Status") return;
        e.ItemsSource = new List<FilterElement>
    {
        new FilterElement { ActualValue = "Active" },
        new FilterElement { ActualValue = "Inactive" },
        new FilterElement { ActualValue = "Pending" }
    };
};

```

## Common Patterns

### Default Sort on Load

```csharp
private void LoadData()
{
    sfTreeGrid.ItemsSource = viewModel.Employees;
    
    // Apply default sort
    sfTreeGrid.SortColumnDescriptions.Add(new SortColumnDescription
    {
        ColumnName = "LastName",
        SortDirection = SortDirection.Ascending
    });
}
```

### Sort + Filter Combination

```csharp
// Filter for managers

sfTreeGrid.Columns["Title"].FilterPredicates.Add(new FilterPredicate
{
    FilterType = FilterType.Contains,
    FilterValue = "Manager"
});

// Then sort by salary
sfTreeGrid.SortColumnDescriptions.Add(new SortColumnDescription
{
    ColumnName = "Salary",
    SortDirection = SortDirection.Descending
});
```

### Save/Restore Filter State

```csharp

Dictionary<string, List<FilterPredicate>> savedFilters = new();

void SaveFilters() => savedFilters = sfTreeGrid.Columns
                    .Where(c => c.FilterPredicates?.Count > 0)
                    .ToDictionary(
                        c => c.MappingName,
                        c => c.FilterPredicates.ToList()
                    );

void RestoreFilters()
{
    sfTreeGrid.ClearFilters();

    foreach (var (key, value) in savedFilters)
        value.ForEach(p => sfTreeGrid.Columns[key].FilterPredicates.Add(p));
}
```

### Quick Filter TextBox

```xaml
<TextBox x:Name="FilterTextBox" 
         PlaceholderText="Search..."
         TextChanged="FilterTextBox_TextChanged" />
         
<treeGrid:SfTreeGrid x:Name="sfTreeGrid" />
```

```csharp
private void FilterTextBox_TextChanged(object sender, TextChangedEventArgs e)
{
    var text = FilterTextBox.Text;

    // Clear previous filters
    sfTreeGrid.ClearFilters();

    if (string.IsNullOrWhiteSpace(text))
        return;

    // Apply filter on FirstName
    sfTreeGrid.Columns["FirstName"].FilterPredicates.Add(new FilterPredicate
    {
        FilterType = FilterType.Contains,
        FilterValue = text,
        PredicateType = PredicateType.Or
    });

    // Apply filter on LastName
    sfTreeGrid.Columns["LastName"].FilterPredicates.Add(new FilterPredicate
    {
        FilterType = FilterType.Contains,
        FilterValue = text,
        PredicateType = PredicateType.Or
    });
}
```

### Batch Operations with Defer Refresh

```csharp
using (sfTreeGrid.View.DeferRefresh(TreeViewRefreshMode.NodeRefresh))
{
    // Add sort
    sfTreeGrid.SortColumnDescriptions.Add(new SortColumnDescription
    {
        ColumnName = "Department",
        SortDirection = SortDirection.Ascending
    });

    // Apply filter on Status column
    sfTreeGrid.Columns["Status"].FilterPredicates.Add(new FilterPredicate
    {
        FilterType = FilterType.Equals,
        FilterValue = "Active"
    });
}
// Refresh happens once after using block
```

## Troubleshooting

**Sorting not working:**
- Ensure `AllowSorting = True`
- Check column's `AllowSorting` property
- Verify data property is comparable

**Filter UI not appearing:**
- Set `AllowFiltering = True`
- Check column's `AllowFiltering` property
- Ensure column header is visible

**Filters not applying:**
- Check `FilterBehavior` setting
- Verify `FilterPredicates` are added correctly
- Ensure filter values match data types

**Performance issues with sorting/filtering:**
- Use `DeferRefresh` for batch operations
- Implement virtualization for large datasets
- Consider on-demand loading (see node-features.md)
