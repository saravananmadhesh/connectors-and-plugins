# Row Operations in WinUI TreeGrid

## Table of Contents
- [Row Height](#row-height)
- [Row Drag and Drop](#row-drag-and-drop)
- [Merge Cells](#merge-cells)
- [Conditional Row Styling](#conditional-row-styling)

## Row Height

### Set Default Row Height

```xaml
<treeGrid:SfTreeGrid RowHeight="40" 
                    ItemsSource="{Binding Employees}" />
```

```csharp
sfTreeGrid.RowHeight = 40;  // Default is 24
```

### Header Row Height

```csharp
sfTreeGrid.HeaderRowHeight = 50;
```

### QueryRowHeight Event

Set dynamic row heights based on content:

```csharp
sfTreeGrid.QueryRowHeight += (sender, e) =>
{
    if (e.RowIndex == 0)
    {
        // Header row
        e.Height = 50;
        e.Handled = true;
    }
    else
    {
        // Data rows - set based on content
        var node = sfTreeGrid.GetNodeAtRowIndex(e.RowIndex);
        if (node != null)
        {
            var employee = node.Item as Employee;
            if (employee.HasLongDescription)
            {
                e.Height = 80;  // Taller for long content
                e.Handled = true;
            }
        }
    }
};
```

### Auto-Size Rows

Automatically adjust row height to fit content:

```csharp
sfTreeGrid.AutoSizeController.AutoFitRowHeight(rowIndex);
```

## Row Drag and Drop

Enable dragging rows to reorder them.

### Enable Row Drag-Drop

```xaml
<treeGrid:SfTreeGrid AllowDraggingRows="True" 
                    ItemsSource="{Binding Employees}" />
```

```csharp
sfTreeGrid.AllowDraggingRows = true;
```

### Drag-Drop Behavior

Users can:
- Drag rows to reorder them within the same parent
- Drag rows between different parent nodes
- Drop rows to change hierarchy

### RowDragDropController Events

**RowDragStart** - Before drag begins:

```csharp
sfTreeGrid.RowDragDropController.RowDragStart += (sender, e) =>
{
    var draggingNode = e.DraggingNodes[0];
    var employee = draggingNode.Item as Employee;
    
    // Cancel drag for specific rows
    if (employee.IsLocked)
    {
        e.Cancel = true;
        ShowMessage("This row cannot be moved");
    }
};
```

**RowDragOver** - During drag operation:

```csharp
sfTreeGrid.RowDragDropController.RowDragOver += (sender, e) =>
{
    // Customize drop indicator
    var targetNode = e.TargetNode;
    
    // Prevent dropping on certain nodes
    if (targetNode != null)
    {
        var targetEmployee = targetNode.Item as Employee;
        if (targetEmployee.Department == "Executive")
        {
            e.ShowDragUI = false;  // Hide drop indicator
        }
    }
};
```

**RowDrop** - Before drop completes:

```csharp
sfTreeGrid.RowDragDropController.RowDrop += (sender, e) =>
{
    var draggingNode = e.DraggingNodes[0];
    var targetNode = e.TargetNode;
    
    var draggingEmp = draggingNode.Item as Employee;
    var targetEmp = targetNode?.Item as Employee;
    
    // Validate drop operation
    if (targetEmp != null && targetEmp.Department != draggingEmp.Department)
    {
        var result = ShowConfirmDialog(
            "Move employee to different department?"
        );
        
        if (result != DialogResult.Yes)
        {
            e.Cancel = true;
        }
    }
    
    // Log the operation
    Log($"Moved {draggingEmp.FirstName} to position {e.DropPosition}");
};
```

### Drop Position

Control where rows can be dropped:

| DropPosition | Description |
|--------------|-------------|
| **Above** | Drop above target row |
| **Below** | Drop below target row |
| **DropAsChild** | Drop as child of target row |
| **None** | No drop allowed |

### Customize Drag-Drop Template

```xaml
<treeGrid:SfTreeGrid>
    <treeGrid:SfTreeGrid.RowDragDropTemplate>
        <DataTemplate>
            <Border Background="LightBlue" 
                    BorderBrush="Blue" 
                    BorderThickness="1"
                    Padding="5">
                <TextBlock Text="{Binding FirstName}" 
                          FontWeight="Bold" />
            </Border>
        </DataTemplate>
    </treeGrid:SfTreeGrid.RowDragDropTemplate>
</treeGrid:SfTreeGrid>
```

## Merge Cells

Merge adjacent cells with the same value.

### Enable Cell Merging

```csharp
sfTreeGrid.AllowCellMerging = true;
```

### QueryCellMergeInfo Event

Define which cells to merge:

```csharp
sfTreeGrid.QueryCellMergeInfo += (sender, e) =>
{
    // Merge cells in "Department" column with same value
    if (e.Column.MappingName == "Department")
    {
        var currentData = e.CurrentCellData;
        var previousData = e.PreviousCellData;
        
        if (currentData.Equals(previousData))
        {
            e.Action = QueryCellMergeAction.Merge;
        }
        else
        {
            e.Action = QueryCellMergeAction.None;
        }
    }
};
```

### Merge Actions

| Action | Description |
|--------|-------------|
| **Merge** | Merge with previous cell |
| **None** | Don't merge |

### Example - Merge Department Column

```csharp
sfTreeGrid.AllowCellMerging = true;

sfTreeGrid.QueryCellMergeInfo += (sender, e) =>
{
    if (e.Column.MappingName == "Department")
    {
        // Only merge if values are equal
        if (e.CurrentCellData?.Equals(e.PreviousCellData) == true)
        {
            e.Action = QueryCellMergeAction.Merge;
        }
    }
};
```

## Conditional Row Styling

Apply styles to rows based on data values.

### QueryRowStyle Event

Customize row appearance:

```csharp
sfTreeGrid.QueryRowStyle += (sender, e) =>
{
    var node = sfTreeGrid.GetNodeAtRowIndex(e.RowIndex);
    if (node != null)
    {
        var employee = node.Item as Employee;
        
        // Highlight inactive employees
        if (employee.Status == "Inactive")
        {
            e.Style.Background = new SolidColorBrush(Colors.LightGray);
            e.Style.Foreground = new SolidColorBrush(Colors.DarkGray);
        }
        
        // Highlight high earners
        if (employee.Salary > 100000)
        {
            e.Style.Background = new SolidColorBrush(Colors.LightGreen);
        }
        
        // Highlight managers
        if (employee.Title.Contains("Manager"))
        {
            e.Style.FontWeight = FontWeights.Bold;
        }
        
        e.Handled = true;
    }
};
```

### Alternating Row Colors

```csharp
sfTreeGrid.QueryRowStyle += (sender, e) =>
{
    // Skip header
    if (e.RowIndex == 0) return;
    
    // Alternate colors
    if (e.RowIndex % 2 == 0)
    {
        e.Style.Background = new SolidColorBrush(Colors.White);
    }
    else
    {
        e.Style.Background = new SolidColorBrush(Colors.AliceBlue);
    }
    
    e.Handled = true;
};
```

### Priority-Based Styling

```csharp
sfTreeGrid.QueryRowStyle += (sender, e) =>
{
    var node = sfTreeGrid.GetNodeAtRowIndex(e.RowIndex);
    if (node != null)
    {
        var task = node.Item as TaskItem;
        
        switch (task.Priority)
        {
            case "High":
                e.Style.Background = new SolidColorBrush(Colors.LightCoral);
                e.Style.Foreground = new SolidColorBrush(Colors.DarkRed);
                break;
            case "Medium":
                e.Style.Background = new SolidColorBrush(Colors.LightYellow);
                break;
            case "Low":
                e.Style.Background = new SolidColorBrush(Colors.LightBlue);
                break;
        }
        
        e.Handled = true;
    }
};
```

### Row Validation Visual Feedback

```csharp
sfTreeGrid.QueryRowStyle += (sender, e) =>
{
    var node = sfTreeGrid.GetNodeAtRowIndex(e.RowIndex);
    if (node != null)
    {
        var employee = node.Item as Employee;
        
        // Validation: Highlight invalid data
        if (string.IsNullOrEmpty(employee.Email))
        {
            e.Style.Background = new SolidColorBrush(Colors.MistyRose);
            e.Style.BorderBrush = new SolidColorBrush(Colors.Red);
            e.Style.BorderThickness = new Thickness(2);
        }
        
        e.Handled = true;
    }
};
```

## Common Patterns

### Disable Drag-Drop for Root Nodes

```csharp
sfTreeGrid.RowDragDropController.RowDragStart += (sender, e) =>
{
    var draggingNode = e.DraggingNodes[0];
    
    // Prevent dragging root nodes
    if (draggingNode.Level == 0)
    {
        e.Cancel = true;
    }
};
```

### Auto-Height Based on Content

```csharp
sfTreeGrid.QueryRowHeight += (sender, e) =>
{
    if (e.RowIndex > 0)
    {
        var node = sfTreeGrid.GetNodeAtRowIndex(e.RowIndex);
        if (node != null)
        {
            var employee = node.Item as Employee;
            var textLength = employee.Description?.Length ?? 0;
            
            // Calculate height based on text length
            e.Height = Math.Max(40, textLength / 50 * 20);
            e.Handled = true;
        }
    }
};
```

### Row Hover Effect

```csharp
private int hoveredRowIndex = -1;

sfTreeGrid.PointerMoved += (sender, e) =>
{
    var position = e.GetCurrentPoint(sfTreeGrid).Position;
    var rowColIndex = sfTreeGrid.GetRowColumnIndexAtPoint(position);
    
    if (rowColIndex.RowIndex != hoveredRowIndex)
    {
        hoveredRowIndex = rowColIndex.RowIndex;
        sfTreeGrid.InvalidateRow(hoveredRowIndex);
    }
};

sfTreeGrid.QueryRowStyle += (sender, e) =>
{
    if (e.RowIndex == hoveredRowIndex)
    {
        e.Style.Background = new SolidColorBrush(Colors.LightGoldenrodYellow);
        e.Handled = true;
    }
};
```

## Troubleshooting

**Row drag-drop not working:**
- Ensure `AllowDraggingRows = True`
- Check if drag events cancel the operation
- Verify data source supports modifications

**Row height not changing:**
- Set `e.Handled = true` in `QueryRowHeight` event
- Check if height value is valid (positive number)
- Ensure event is subscribed

**Cell merging not visible:**
- Set `AllowCellMerging = True`
- Implement `QueryCellMergeInfo` event correctly
- Verify adjacent cells have equal values

**Row styling not applying:**
- Set `e.Handled = true` in `QueryRowStyle` event
- Check if style values are valid
- Ensure event fires for correct row indices
