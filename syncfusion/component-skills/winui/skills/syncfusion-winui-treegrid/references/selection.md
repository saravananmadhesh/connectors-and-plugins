# Selection in WinUI TreeGrid

## Table of Contents
- [Selection Modes](#selection-modes)
- [Selection Unit](#selection-unit)
- [Selection Events](#selection-events)
- [Programmatic Selection](#programmatic-selection)
- [Keyboard Navigation](#keyboard-navigation)

## Selection Modes

Control how users can select rows or cells:

```xaml
<treeGrid:SfTreeGrid SelectionMode="Multiple" 
                    ItemsSource="{Binding Employees}" />
```

```csharp
sfTreeGrid.SelectionMode = GridSelectionMode.Multiple;
```

| Mode | Description | Use Case |
|------|-------------|----------|
| **None** | No selection allowed | Display-only grids |
| **Single** | Select one row at a time | Single record operations |
| **Multiple** | Select multiple rows | Batch operations |
| **Extended** | Multiple selection with Ctrl/Shift | Advanced multi-selection |

**Examples:**

```xaml
<!-- Single selection (default) -->
<treeGrid:SfTreeGrid SelectionMode="Single" />

<!-- Multiple selection -->
<treeGrid:SfTreeGrid SelectionMode="Multiple" />

<!-- No selection -->
<treeGrid:SfTreeGrid SelectionMode="None" />
```

## Selection Unit

Define whether entire rows or individual cells are selected:

```csharp
sfTreeGrid.SelectionUnit = GridSelectionUnit.Row;
```

| Unit | Description |
|------|-------------|
| **Row** | Select entire rows (default) |
| **Cell** | Select individual cells |
| **Any** | Mixed row and cell selection |

**Examples:**

```xaml
<!-- Row selection (default) -->
<treeGrid:SfTreeGrid SelectionUnit="Row" />

<!-- Cell selection -->
<treeGrid:SfTreeGrid SelectionUnit="Cell" />
```

### Cell Selection Example

```xaml
<treeGrid:SfTreeGrid SelectionMode="Multiple"
                    SelectionUnit="Cell"
                    ItemsSource="{Binding Employees}" />
```

Users can now select individual cells with Ctrl+Click for multiple cell selection.

## Selection Events

### SelectionChanging

Raised before selection changes. Cancel selection or customize behavior:

```csharp
sfTreeGrid.SelectionChanging += (sender, e) =>
{
    // Cancel selection for specific rows
    foreach (var item in e.AddedItems)
    {
        var employee = item.RowData as Employee;
        if (employee.Status == "Inactive")
        {
            e.Cancel = true;
            ShowMessage("Cannot select inactive employees");
            return;
        }
    }
};
```

**Event Args Properties:**
- `e.AddedItems` - Items being added to selection
- `e.RemovedItems` - Items being removed from selection
- `e.Cancel` - Set to true to prevent selection change

### SelectionChanged

Raised after selection changes:

```csharp
sfTreeGrid.SelectionChanged += (sender, e) =>
{
    var selectedCount = sfTreeGrid.SelectedItems.Count;
    StatusLabel.Text = $"{selectedCount} item(s) selected";
    
    // Get newly selected items
    foreach (var item in e.AddedItems)
    {
        var employee = item as Employee;
        Console.WriteLine($"Selected: {employee.FirstName}");
    }
    
    // Get unselected items
    foreach (var item in e.RemovedItems)
    {
        var employee = item as Employee;
        Console.WriteLine($"Deselected: {employee.FirstName}");
    }
};
```

## Programmatic Selection

### SelectedItem

Get or set single selected item:

```csharp
// Get selected item
var selectedEmployee = sfTreeGrid.SelectedItem as Employee;
if (selectedEmployee != null)
{
    Console.WriteLine($"Selected: {selectedEmployee.FirstName}");
}

// Set selected item
sfTreeGrid.SelectedItem = viewModel.Employees[0];
```

```xaml
<treeGrid:SfTreeGrid SelectedItem="{Binding SelectedEmployee, Mode=TwoWay}" />
```

### SelectedItems

Get or set multiple selected items:

```csharp
// Get all selected items
var selectedEmployees = sfTreeGrid.SelectedItems
    .Cast<Employee>()
    .ToList();

Console.WriteLine($"Selected {selectedEmployees.Count} employees");

// Set multiple selected items
sfTreeGrid.SelectedItems.Add(employee1);
sfTreeGrid.SelectedItems.Add(employee2);
```

### SelectedIndex

Get or set selected row index:

```csharp
// Get selected index
int index = sfTreeGrid.SelectedIndex;

// Set selected index
sfTreeGrid.SelectedIndex = 2;  // Select third row

// Deselect
sfTreeGrid.SelectedIndex = -1;
```

### SelectionController

Advanced selection operations:

```csharp
// Select row by index
sfTreeGrid.SelectionController.MoveCurrentCell(new RowColumnIndex(3, 1));

// Select node
var node = sfTreeGrid.View.Nodes[0];
sfTreeGrid.SelectionController.HandlePointerOperations(
    new GridPointerEventArgs(/* ... */), 
    node
);
```

### Select All

```csharp
// Select all rows
sfTreeGrid.SelectAll();

// Check if all selected
bool allSelected = sfTreeGrid.SelectedItems.Count == sfTreeGrid.View.Nodes.Count;
```

### Clear Selection

```csharp
// Clear all selections
sfTreeGrid.ClearSelections();

// Or
sfTreeGrid.SelectedItems.Clear();
```

### Select Range

```csharp
// Select rows from index 2 to 5
for (int i = 2; i <= 5; i++)
{
    var node = sfTreeGrid.View.Nodes[i];
    var data = node.Item;
    sfTreeGrid.SelectedItems.Add(data);
}
```

### Select by Condition

```csharp
// Select all managers
foreach (var node in sfTreeGrid.View.Nodes)
{
    var employee = node.Item as Employee;
    if (employee.Title == "Manager")
    {
        sfTreeGrid.SelectedItems.Add(employee);
    }
}
```

## Keyboard Navigation

Default keyboard shortcuts for selection:

| Key Combination | Action |
|----------------|--------|
| **Click** | Select row/cell |
| **Ctrl+Click** | Toggle selection (Multiple mode) |
| **Shift+Click** | Select range (Extended mode) |
| **Ctrl+A** | Select all |
| **Arrow Keys** | Navigate and change selection |
| **Shift+Arrow** | Extend selection (Extended mode) |
| **Space** | Toggle current row selection |
| **Home** | Move to first row |
| **End** | Move to last row |
| **Page Up/Down** | Scroll page |

### Configure Navigation Mode

```csharp
sfTreeGrid.NavigationMode = NavigationMode.Cell;
// or
sfTreeGrid.NavigationMode = NavigationMode.Row;
```

## Selection Styling

### Customize Selection Colors

```xaml
<treeGrid:SfTreeGrid>
    <treeGrid:SfTreeGrid.Resources>
        <SolidColorBrush x:Key="SyncfusionTreeGridSelectionBackgroundBrush" 
                        Color="LightBlue" />
        <SolidColorBrush x:Key="SyncfusionTreeGridSelectionForegroundBrush" 
                        Color="DarkBlue" />
    </treeGrid:SfTreeGrid.Resources>
</treeGrid:SfTreeGrid>
```

### Selection Visual States

Customize selection appearance using styles:

```xaml
<Style TargetType="treeGrid:TreeGridCell">
    <Setter Property="Background" Value="Transparent" />
    <Style.Triggers>
        <Trigger Property="IsSelected" Value="True">
            <Setter Property="Background" Value="LightBlue" />
            <Setter Property="Foreground" Value="Black" />
        </Trigger>
    </Style.Triggers>
</Style>
```

## Common Patterns

### Single Selection with Details Panel

```csharp
sfTreeGrid.SelectionMode = GridSelectionMode.Single;
sfTreeGrid.SelectionChanged += (sender, e) =>
{
    var employee = sfTreeGrid.SelectedItem as Employee;
    if (employee != null)
    {
        // Update details panel
        DetailsPanel.DataContext = employee;
    }
};
```

### Multi-Selection with Actions

```csharp
private void DeleteSelectedItems()
{
    if (sfTreeGrid.SelectedItems.Count == 0)
    {
        ShowMessage("No items selected");
        return;
    }
    
    var employees = sfTreeGrid.SelectedItems.Cast<Employee>().ToList();
    
    var result = ShowConfirmDialog(
        $"Delete {employees.Count} employee(s)?"
    );
    
    if (result == DialogResult.Yes)
    {
        foreach (var employee in employees)
        {
            viewModel.Employees.Remove(employee);
        }
        
        sfTreeGrid.ClearSelections();
    }
}
```

### Select on Right-Click

```csharp
sfTreeGrid.RightTapped += (s, e) =>
{
    var position = e.GetPosition(sfTreeGrid);

    var elements = VisualTreeHelper.FindElementsInHostCoordinates(position, sfTreeGrid);
            
    foreach (var element in elements)
    {
        if (element is TreeGridRowControl rowControl)
        {
            var data = rowControl.DataContext;

            sfTreeGrid.SelectedItem = data;
            break;
        }
    }
};

```

### Prevent Selection of Specific Rows

```csharp
sfTreeGrid.SelectionChanging += (sender, e) =>
{
    foreach (var item in e.AddedItems)
    {
        var employee = item as Employee;
        
        // Prevent selection of admin users
        if (employee.Role == "Admin")
        {
            e.Cancel = true;
            return;
        }
    }
};
```

### Remember Selection After Refresh

```csharp
private List<int> selectedIDs = new List<int>();

private void SaveSelection()
{
    selectedIDs = sfTreeGrid.SelectedItems
        .Cast<Employee>()
        .Select(e => e.ID)
        .ToList();
}

private void RestoreSelection()
{
    sfTreeGrid.ClearSelections(true);
    
    foreach (var node in sfTreeGrid.View.Nodes)
    {
        var employee = node.Item as Employee;
        if (selectedIDs.Contains(employee.ID))
        {
            sfTreeGrid.SelectedItems.Add(employee);
        }
    }
}

// Usage
private void RefreshData()
{
    SaveSelection();
    viewModel.LoadData();
    RestoreSelection();
}
```

### Toggle Selection Mode

```csharp
private void ToggleSelectionMode()
{
    if (sfTreeGrid.SelectionMode == GridSelectionMode.Single)
    {
        sfTreeGrid.SelectionMode = GridSelectionMode.Multiple;
        MultiSelectButton.Content = "Single Select";
    }
    else
    {
        sfTreeGrid.SelectionMode = GridSelectionMode.Single;
        MultiSelectButton.Content = "Multi Select";
    }
}
```

## CurrentCell vs SelectedItem

**CurrentCell** - Cell with focus (keyboard navigation)
**SelectedItem** - Visually selected item

```csharp
// Get current cell
var currentCell = sfTreeGrid.SelectionController.CurrentCellManager.CurrentCell;
if (currentCell != null)
{
    var rowIndex = currentCell.RowIndex;
    var columnIndex = currentCell.ColumnIndex;
}

// Get selected item
var selectedEmployee = sfTreeGrid.SelectedItem as Employee;
```

## Troubleshooting

**Selection not working:**
- Check `SelectionMode` is not `None`
- Verify `IsEnabled = true` on TreeGrid
- Check if `SelectionChanging` event cancels selection

**Multiple selection not working:**
- Set `SelectionMode` to `Multiple` or `Extended`
- Use Ctrl+Click for `Multiple` mode
- Use Shift+Click for range selection in `Extended` mode

**Selection not visible:**
- Check selection brush colors
- Verify theme resources are loaded
- Ensure row/cell is not hidden

**SelectedItem binding not updating:**
- Use `Mode=TwoWay` in binding
- Implement `INotifyPropertyChanged` in ViewModel
- Check if selection events fire
