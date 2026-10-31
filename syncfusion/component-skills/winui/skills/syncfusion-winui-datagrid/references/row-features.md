# Advanced Row Features in WinUI DataGrid

Guide to row drag-and-drop, unbound rows, master-details view, and row height customization.

## Table of Contents
- [Row Drag and Drop](#row-drag-and-drop)
- [Unbound Rows](#unbound-rows)
- [Master-Details View](#master-details-view)
- [Row Height](#row-height)

## Row Drag and Drop

Enable row reordering via drag-and-drop.

```xml
<dataGrid:SfDataGrid AllowDraggingRows="True"
                     ItemsSource="{Binding Orders}" />
```

### Row Drag Events

```csharp
sfDataGrid.RowDragOver += (s, e) =>
{
    // e.TargetRecord - drop target
    // Cancel if needed
};

sfDataGrid.RowDropped += (s, e) =>
{
    Debug.WriteLine("Row dropped");
};
```

## Unbound Rows

Add rows not bound to data source (for totals, headers, etc.).

```csharp
// Add above data rows
sfDataGrid.UnboundRows.Add(new GridUnboundRow
{
    Position = UnboundRowsPosition.Top,
    ShowBelowSummary = false
});

// Add below data rows
sfDataGrid.UnboundRows.Add(new GridUnboundRow
{
    Position = UnboundRowsPosition.Bottom,
    ShowBelowSummary = true
});
```

### Populate Unbound Row Cells

```csharp
sfDataGrid.QueryUnboundRow += (s, e) =>
{
    if (e.UnboundAction == UnboundActions.QueryData)
    {
        if (e.Column.MappingName == "OrderID")
        {
            e.Value = "Total:";
        }
        else if (e.Column.MappingName == "UnitPrice")
        {
            var orders = sfDataGrid.ItemsSource as IEnumerable<OrderInfo>;
            e.Value = orders.Sum(o => o.UnitPrice);
        }
    }
};
```

## Master-Details View

Display nested/hierarchical data.

```xml
<dataGrid:SfDataGrid ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.DetailsViewDefinition>
        <dataGrid:GridViewDefinition RelationalColumn="OrderDetails">
            <dataGrid:GridViewDefinition.DataGrid>
                <dataGrid:SfDataGrid AutoGenerateColumns="True" />
            </dataGrid:GridViewDefinition.DataGrid>
        </dataGrid:GridViewDefinition>
    </dataGrid:SfDataGrid.DetailsViewDefinition>
</dataGrid:SfDataGrid>
```

### Data Model

```csharp
public class Order
{
    public int OrderID { get; set; }
    public string Customer { get; set; }
    public ObservableCollection<OrderDetail> OrderDetails { get; set; }
}

public class OrderDetail
{
    public string Product { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}
```

### Expand/Collapse Details

```csharp
// Expand all
sfDataGrid.ExpandAllDetailsView();

// Collapse all
sfDataGrid.CollapseAllDetailsView();

// Expand specific record
sfDataGrid.ExpandDetailsViewAt(recordIndex);
```

## Row Height

### Fixed Row Height

```xml
<dataGrid:SfDataGrid RowHeight="35"
                     ItemsSource="{Binding Orders}" />
```

### Dynamic Row Height

```xml
<dataGrid:SfDataGrid QueryRowHeight="SfDataGrid_QueryRowHeight"
                     ItemsSource="{Binding Orders}" />
```

```csharp
private void SfDataGrid_QueryRowHeight(object sender, QueryRowHeightEventArgs e)
{
    // Set custom height based on row index or data
    if (e.RowIndex == 0) // Header
        e.Height = 50;
    else if (e.RowIndex > 0)
        e.Height = 40;
    
    e.Handled = true;
}
```

## Best Practices

1. Use unbound rows for totals and summaries
2. Enable row drag-drop for user-sortable lists
3. Use master-details for hierarchical data relationships
4. Set fixed row height for better performance
5. Use QueryRowHeight sparingly (performance impact)
