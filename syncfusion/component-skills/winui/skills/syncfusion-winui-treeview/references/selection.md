# Selection in WinUI TreeView

## Table of Contents
- [Overview](#overview)
- [Selection Modes](#selection-modes)
- [UI Selection](#ui-selection)
- [Programmatic Selection](#programmatic-selection)
- [Selection Binding](#selection-binding)
- [Selection Styling](#selection-styling)
- [Selection Events](#selection-events)
- [Keyboard Navigation](#keyboard-navigation)
- [Advanced Scenarios](#advanced-scenarios)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView supports flexible selection mechanisms allowing users to select one or multiple nodes through mouse/touch interactions or programmatic control. Selection is essential for identifying which items users want to view, edit, or perform actions on.

## Selection Modes

Configure selection behavior using the `SelectionMode` property:

| Mode | Behavior | Use Case |
|------|----------|----------|
| **None** | No selection | View-only trees |
| **Single** | One item, no deselect on re-click | Default, most common |
| **SingleDeselect** | One item, deselect on re-click | Toggle selection |
| **Multiple** | Multiple items, click to deselect | Multi-select lists |
| **Extended** | Multiple with Ctrl/Shift | Power user scenarios |

### Single Mode (Default)

**When to use:** Most tree scenarios where users select one item at a time

**Behavior:**
- Click selects an item
- Clicking another item changes selection
- Clicking selected item keeps it selected

```xml
<treeView:SfTreeView SelectionMode="Single" />
```

```csharp
treeView.SelectionMode = SelectionMode.Single;
```

### SingleDeselect Mode

**When to use:** Toggle selection on/off

**Behavior:**
- Click selects an item
- Clicking selected item deselects it
- Only one item selected at a time

```xml
<treeView:SfTreeView SelectionMode="SingleDeselect" />
```

### Multiple Mode

**When to use:** Select multiple unrelated items

**Behavior:**
- Click adds/removes items from selection
- No keyboard modifiers needed
- Each click toggles that item

```xml
<treeView:SfTreeView SelectionMode="Multiple" />
```

```csharp
// Multiple items can be selected
// Click item1 → selected
// Click item2 → both selected
// Click item1 again → only item2 selected
```

### Extended Mode

**When to use:** Power users familiar with desktop selection patterns

**Behavior:**
- **Click:** Select single item (clears others)
- **Ctrl+Click:** Add/remove individual items
- **Shift+Click:** Select range from last to clicked
- **Ctrl+Shift+Click:** Add range to selection

```xml
<treeView:SfTreeView SelectionMode="Extended" />
```

### None Mode

**When to use:** Display-only trees

```xml
<treeView:SfTreeView SelectionMode="None" />
```

## UI Selection

Users can select nodes through:
- **Mouse click** - Click on node
- **Touch** - Tap on node  
- **Keyboard** - Arrow keys + Space/Enter

**Example with event handling:**

```xml
<treeView:SfTreeView SelectionMode="Single"
                      SelectionChanged="OnSelectionChanged" />
```

```csharp
private void OnSelectionChanged(object sender, ItemSelectionChangedEventArgs e)
{
    if (e.AddedItems.Count > 0)
    {
        var selectedItem = e.AddedItems[0];
        // Handle selection
    }
}
```

## Programmatic Selection

### Single Selection

Set `SelectedItem` property to select a single item:

```csharp
// Select by data object
treeView.SelectedItem = viewModel.Employees[0];

// Get selected item
var selected = treeView.SelectedItem as Employee;
```

```xml
<!-- Binding in XAML -->
<treeView:SfTreeView SelectedItem="{Binding SelectedEmployee, Mode=TwoWay}" />
```

### Multiple Selection

Use `SelectedItems` collection for multiple selections:

```csharp
// Add items to selection
treeView.SelectedItems.Add(viewModel.Employees[0]);
treeView.SelectedItems.Add(viewModel.Employees[2]);
treeView.SelectedItems.Add(viewModel.Employees[5]);

// Remove from selection
treeView.SelectedItems.Remove(viewModel.Employees[2]);

// Clear all selections
treeView.SelectedItems.Clear();

// Get all selected items
foreach (var item in treeView.SelectedItems)
{
    var employee = item as Employee;
    // Process each selected item
}
```

### Select All / Clear All

```csharp
// Select all nodes
treeView.SelectAll();

// Clear all selections
treeView.SelectedItems.Clear();
```

### Find and Select Node

```csharp
// Find and select specific node
public void SelectNodeByName(string name)
{
    var employee = viewModel.Employees
        .FirstOrDefault(e => e.Name == name);
    
    if (employee != null)
    {
        treeView.SelectedItem = employee;
        
        // Optionally bring into view
        var node = treeView.GetNodeAt(employee);
        treeView.BringIntoView(node);
    }
}
```

### SelectedItem vs CurrentItem

**SelectedItem:** First selected item (in multi-select)  
**CurrentItem:** Last selected item (item with focus)

```csharp
// When multiple items selected:
treeView.SelectedItem  // First selected item
treeView.CurrentItem   // Last selected item (has focus border)

// In single selection mode, both return the same item
```

## Selection Binding

Bind selection state to your data model:

### IsSelectedPropertyName

```csharp
public class FileNode : INotifyPropertyChanged
{
    private bool _isSelected;
    
    public bool IsSelected
    {
        get => _isSelected;
        set
        {
            _isSelected = value;
            OnPropertyChanged();
        }
    }
    
    public string Name { get; set; }
    public ObservableCollection<FileNode> Children { get; set; }
    
    // INotifyPropertyChanged implementation...
}
```

```xml
<treeView:SfTreeView ItemsSource="{Binding Files}">
    <treeView:SfTreeView.HierarchyPropertyDescriptors>
        <treeView:HierarchyPropertyDescriptor 
            ChildPropertyName="Children"
            IsSelectedPropertyName="IsSelected"
            TargetType="local:FileNode" />
    </treeView:SfTreeView.HierarchyPropertyDescriptors>
</treeView:SfTreeView>
```

**Benefits:**
- Two-way sync between UI and data
- Persist selection state
- Select items before tree loads

**Important:** Only works with bound mode and boolean properties.

## Selection Styling

### Selection Background Color

```xml
<treeView:SfTreeView SelectionBackgroundColor="#2196F3" />
```

```csharp
treeView.SelectionBackgroundColor = new SolidColorBrush(Colors.Blue);
```

### Selection Foreground Color

**Note:** Only works in unbound mode

```xml
<treeView:SfTreeView SelectionForegroundColor="White" />
```

```csharp
treeView.SelectionForegroundColor = new SolidColorBrush(Colors.White);
```

### Focus Border

Customize the focus indicator for current item:

```xml
<treeView:SfTreeView FocusBorderColor="Orange"
                      FocusBorderThickness="3" />
```

```csharp
treeView.FocusBorderColor = new SolidColorBrush(Colors.Orange);
treeView.FocusBorderThickness = new Thickness(3);
```

**When visible:** In Multiple or Extended mode, shows which item has keyboard focus

### Custom Selection Style with Template

```xml
<treeView:SfTreeView>
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <Grid Background="{Binding IsSelected, Converter={StaticResource SelectionBackgroundConverter}}">
                <TextBlock Text="{Binding Name}" 
                           Foreground="{Binding IsSelected, Converter={StaticResource SelectionForegroundConverter}}" />
            </Grid>
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

## Selection Events

### SelectionChanging Event

Fires **before** selection changes. Can be canceled.

```csharp
treeView.SelectionChanging += OnSelectionChanging;

private void OnSelectionChanging(object sender, ItemSelectionChangingEventArgs e)
{
    // Check items being added
    foreach (var item in e.AddedItems)
    {
        var employee = item as Employee;
        if (employee?.Department == "Restricted")
        {
            // Prevent selection of restricted items
            e.Cancel = true;
            return;
        }
    }
    
    // Check items being removed
    foreach (var item in e.RemovedItems)
    {
        // Handle deselection
    }
}
```

**Use cases:**
- Validate selection
- Prevent selection of certain items
- Show confirmation dialogs

### SelectionChanged Event

Fires **after** selection changes. Cannot be canceled.

```csharp
treeView.SelectionChanged += OnSelectionChanged;

private void OnSelectionChanged(object sender, ItemSelectionChangedEventArgs e)
{
    // Items that were added to selection
    foreach (var item in e.AddedItems)
    {
        var employee = item as Employee;
        Debug.WriteLine($"Selected: {employee.Name}");
    }
    
    // Items that were removed from selection
    foreach (var item in e.RemovedItems)
    {
        var employee = item as Employee;
        Debug.WriteLine($"Deselected: {employee.Name}");
    }
    
    // Update UI based on selection
    UpdateDetailsPanel();
}
```

**Note:** Events only fire for UI interactions, not programmatic changes.

## Keyboard Navigation

TreeView supports full keyboard navigation:

| Key | Action |
|-----|--------|
| **↑/↓** | Move focus up/down |
| **←** | Collapse current node or move to parent |
| **→** | Expand current node or move to first child |
| **Space** | Toggle selection (Multiple mode) |
| **Enter** | Select item |
| **Ctrl+A** | Select all (Extended mode) |
| **Home** | Move to first node |
| **End** | Move to last visible node |

### Extended Mode Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Click** | Select item, clear others |
| **Ctrl+Click** | Add/remove item from selection |
| **Shift+Click** | Select range |
| **Ctrl+Shift+Click** | Add range to selection |
| **Ctrl+↑/↓** | Move focus without selecting |
| **Ctrl+Space** | Toggle selection of focused item |

## Advanced Scenarios

### Scenario 1: Select Nodes on Right-Click

```csharp
treeView.RightTapped += OnRightTapped;

private void OnRightTapped(object sender, RightTappedRoutedEventArgs e)
{
    // Get node at mouse position
    var point = e.GetPosition(treeView);
    var node = treeView.GetNodeAt(point);
    
    if (node != null)
    {
        // Select the right-clicked node
        treeView.SelectedItem = node.Content;
        
        // Show context menu
        var flyout = new MenuFlyout();
        flyout.Items.Add(new MenuFlyoutItem { Text = "Edit" });
        flyout.Items.Add(new MenuFlyoutItem { Text = "Delete" });
        flyout.ShowAt(e.OriginalSource as UIElement, e.GetPosition(e.OriginalSource as UIElement));
    }
}
```

### Scenario 2: Restore Selection After Reload

```csharp
// Save selection before reload
private List<string> SaveSelection()
{
    return treeView.SelectedItems
        .Cast<Employee>()
        .Select(e => e.Id)
        .ToList();
}

// Restore selection after reload
private void RestoreSelection(List<string> selectedIds)
{
    treeView.SelectedItems.Clear();
    
    foreach (var id in selectedIds)
    {
        var employee = FindEmployeeById(id);
        if (employee != null)
        {
            treeView.SelectedItems.Add(employee);
        }
    }
}
```

### Scenario 3: Select All Children When Parent Selected

```csharp
treeView.SelectionChanged += OnSelectionChanged;

private void OnSelectionChanged(object sender, ItemSelectionChangedEventArgs e)
{
    foreach (var added in e.AddedItems)
    {
        var employee = added as Employee;
        if (employee?.DirectReports != null)
        {
            // Recursively select all children
            SelectChildren(employee.DirectReports);
        }
    }
}

private void SelectChildren(ObservableCollection<Employee> children)
{
    foreach (var child in children)
    {
        if (!treeView.SelectedItems.Contains(child))
        {
            treeView.SelectedItems.Add(child);
        }
        
        if (child.DirectReports != null)
        {
            SelectChildren(child.DirectReports);
        }
    }
}
```

### Scenario 4: Limit Selection Count

```csharp
treeView.SelectionChanging += OnSelectionChanging;

private void OnSelectionChanging(object sender, ItemSelectionChangingEventArgs e)
{
    const int MAX_SELECTION = 5;
    
    var currentCount = treeView.SelectedItems.Count;
    var newCount = currentCount + e.AddedItems.Count - e.RemovedItems.Count;
    
    if (newCount > MAX_SELECTION)
    {
        e.Cancel = true;
        ShowMessage($"You can only select up to {MAX_SELECTION} items");
    }
}
```

### Scenario 5: Master-Detail with Selection

```xml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="300" />
        <ColumnDefinition Width="*" />
    </Grid.ColumnDefinitions>
    
    <!-- TreeView -->
    <treeView:SfTreeView Grid.Column="0"
                          ItemsSource="{Binding Employees}"
                          SelectedItem="{Binding SelectedEmployee, Mode=TwoWay}" />
    
    <!-- Detail Panel -->
    <StackPanel Grid.Column="1" 
                Margin="20"
                DataContext="{Binding SelectedEmployee}">
        <TextBlock Text="{Binding Name}" FontSize="24" />
        <TextBlock Text="{Binding Title}" FontSize="16" />
        <TextBlock Text="{Binding Department}" />
    </StackPanel>
</Grid>
```

## Troubleshooting

### Selection Not Working

**Problem:** Clicking nodes doesn't select them

**Solutions:**
1. Check SelectionMode is not None
   ```csharp
   treeView.SelectionMode = SelectionMode.Single;  // Not None
   ```

2. Verify ItemTemplate doesn't block hit testing
   ```xml
   <!-- ✅ Allow hit testing -->
   <Grid Background="Transparent">
   
   <!-- ❌ Blocks hit testing -->
   <Grid IsHitTestVisible="False">
   ```

### Programmatic Selection Not Showing

**Problem:** Setting SelectedItem doesn't highlight the node

**Solutions:**
1. Ensure the object reference matches exactly
   ```csharp
   // ✅ Use same object reference
   treeView.SelectedItem = viewModel.Employees[0];
   
   // ❌ Different instance (won't work)
   treeView.SelectedItem = new Employee { Id = 1 };
   ```

2. Check if node is expanded to view
   ```csharp
   treeView.BringIntoView(employee);
   ```

### Multiple Selection Not Working

**Problem:** Can only select one item at a time

**Solution:** Change SelectionMode
```csharp
treeView.SelectionMode = SelectionMode.Multiple;  // or Extended
```

### SelectionChanged Not Firing

**Problem:** Event doesn't trigger

**Solutions:**
1. Events only fire for UI interactions, not programmatic changes
   ```csharp
   // This will NOT trigger SelectionChanged event
   treeView.SelectedItem = employee;
   
   // Manually notify if needed
   OnSelectionChangedManually();
   ```

2. Check event is subscribed
   ```csharp
   treeView.SelectionChanged += OnSelectionChanged;
   ```

### Selection Background Not Showing

**Problem:** SelectionBackgroundColor has no effect

**Solution:** ItemTemplate background overrides selection color
```xml
<!-- ❌ Grid background hides selection -->
<DataTemplate>
    <Grid Background="White">
        <TextBlock Text="{Binding Name}" />
    </Grid>
</DataTemplate>

<!-- ✅ Transparent allows selection to show -->
<DataTemplate>
    <Grid Background="Transparent">
        <TextBlock Text="{Binding Name}" />
    </Grid>
</DataTemplate>
```

### Duplicate Items Selection Issues

**Problem:** Only first duplicate item selects

**Limitation:** TreeView identifies items by object reference. If collection contains duplicate instances, only the first will be selected.

**Solution:** Ensure unique object instances
```csharp
// ✅ Unique instances
var item1 = new Employee { Id = 1, Name = "John" };
var item2 = new Employee { Id = 1, Name = "John" };  // Different instance

// ❌ Same instance added twice
var item = new Employee { Id = 1, Name = "John" };
collection.Add(item);
collection.Add(item);  // Duplicate reference
```

## Best Practices

1. **Use Single mode** for most scenarios (default and intuitive)
2. **Use Extended mode** for power users familiar with desktop patterns
3. **Bind SelectedItem** for MVVM master-detail scenarios
4. **Use SelectionChanging** for validation and cancellation
5. **Use SelectionChanged** for updating UI based on selection
6. **Keep selection state** in ViewModel for testability
7. **Clear selections** when reloading data if needed
8. **Provide visual feedback** with custom styling
9. **Support keyboard navigation** - don't interfere with default behavior
10. **Test with large selections** (1000+ items) for performance

## Next Steps

- **Expand-Collapse** - Control node expansion
- **Editing** - Enable inline editing of selected nodes
- **Drag-Drop** - Move selected nodes
- **Context Menus** - Actions on selected items
