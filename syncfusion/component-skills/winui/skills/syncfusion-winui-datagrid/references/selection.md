# Selection in WinUI DataGrid

Guide to selection modes, selection units, programmatic selection, and selection events in Syncfusion WinUI DataGrid.

## Selection Modes

| Mode | Description |
|------|-------------|
| **None** | Disables selection |
| **Single** (default) | Select one row/cell, previous selection clears |
| **SingleDeselect** | Select one row/cell, click again to deselect |
| **Multiple** | Select multiple rows/cells, click to toggle |
| **Extended** | Select multiple with Ctrl/Shift keys and mouse drag |

```xml
<dataGrid:SfDataGrid SelectionMode="Extended"
                     SelectionUnit="Row"
                     ItemsSource="{Binding Orders}" />
```

## Selection Units

| Unit | Description |
|------|-------------|
| **Row** | Select entire rows |
| **Cell** | Select individual cells |
| **Any** | Select rows or cells (row via row header) |

```xml
<dataGrid:SfDataGrid SelectionUnit="Cell"
                     NavigationMode="Cell"
                     ItemsSource="{Binding Orders}" />
```

## Navigation Mode

| Mode | Description | Required For |
|------|-------------|--------------|
| **Cell** | Navigate between cells and rows | Cell selection, Editing |
| **Row** | Navigate only between rows | Row selection only |

```xml
<dataGrid:SfDataGrid NavigationMode="Cell"
                     ItemsSource="{Binding Orders}" />
```

## Programmatic Selection

### Single Selection

```csharp
// Select by item
sfDataGrid.SelectedItem = orders[5];

// Select by index
sfDataGrid.SelectedIndex = 5;

// Clear selection
sfDataGrid.SelectedItem = null;
sfDataGrid.SelectedIndex = -1;
```

### Multiple Selection

```csharp
// Select multiple items
sfDataGrid.SelectedItems.Add(orders[0]);
sfDataGrid.SelectedItems.Add(orders[2]);
sfDataGrid.SelectedItems.Add(orders[5]);

// Select all
sfDataGrid.SelectAll();

// Clear selection
sfDataGrid.ClearSelections(false);
sfDataGrid.SelectedItems.Clear();
```

### Cell Selection

```csharp
// Select single cell
sfDataGrid.SelectCells(orders[0], sfDataGrid.Columns[1], orders[0], sfDataGrid.Columns[1]);

// Select cell range
sfDataGrid.SelectCells(orders[0], sfDataGrid.Columns[0], orders[5], sfDataGrid.Columns[2]);
```

## Selection Binding

```xml
<!-- Two-way binding -->
<dataGrid:SfDataGrid SelectedItem="{Binding SelectedOrder, Mode=TwoWay}"
                     SelectedIndex="{Binding SelectedIndex, Mode=TwoWay}"
                     ItemsSource="{Binding Orders}" />
```

```csharp
public class ViewModel : INotifyPropertyChanged
{
    private OrderInfo selectedOrder;
    
    public OrderInfo SelectedOrder
    {
        get => selectedOrder;
        set
        {
            selectedOrder = value;
            OnPropertyChanged(nameof(SelectedOrder));
        }
    }
}
```

## Selection Events

```csharp
// Before selection changes
sfDataGrid.SelectionChanging += (s, e) =>
{
    // e.AddedItems, e.RemovedItems
    // Cancel if needed
    if (e.AddedItems.Cast<OrderInfo>().Any(o => o.IsShipped))
        e.Cancel = true;
};

// After selection changes
sfDataGrid.SelectionChanged += (s, e) =>
{
    var selected = sfDataGrid.SelectedItems.Cast<OrderInfo>().ToList();
    Debug.WriteLine($"Selected: {selected.Count} items");
};
```

## Disable Selection

```xml
<!-- Grid-level -->
<dataGrid:SfDataGrid SelectionMode="None" />

<!-- Column-level -->
<dataGrid:GridTextColumn MappingName="OrderID" AllowFocus="False" />
```

## Common Scenarios

**Scenario: Select First Row on Load**
```csharp
private void Page_Loaded(object sender, RoutedEventArgs e)
{
    if (sfDataGrid.View.Records.Count > 0)
        sfDataGrid.SelectedIndex = 0;
}
```

**Scenario: Multi-Select with Checkboxes**
```xml
<dataGrid:SfDataGrid SelectionMode="Multiple">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridCheckBoxSelectorColumn Width="50" />
        <!-- Other columns -->
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

## Best Practices

1. Set `NavigationMode="Cell"` when using cell selection or editing
2. Use `SelectionMode="Extended"` for user-friendly multi-selection
3. Bind `SelectedItem` for MVVM scenarios
4. Handle `SelectionChanging` to prevent invalid selections
5. Use `GridCheckBoxSelectorColumn` for explicit multi-select UI
