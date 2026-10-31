# Interactivity in WinUI TreeView

## Table of Contents
- [Overview](#overview)
- [Checkboxes](#checkboxes)
- [Interactive Events](#interactive-events)
- [Context Menus](#context-menus)
- [Keyboard Navigation](#keyboard-navigation)
- [Scrolling](#scrolling)
- [Animations](#animations)
- [Common Scenarios](#common-scenarios)

## Overview

TreeView provides rich interactivity features including checkboxes for multi-selection, interactive events (tap, double-tap, holding), context menus, keyboard navigation, and smooth animations.

## Checkboxes

### Enable Checkboxes

```xml
<treeView:SfTreeView CheckBoxMode="Recursive"
                      ItemTemplateDataContextType="Node">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <CheckBox Content="{Binding Content.Name}"
                      IsChecked="{Binding IsChecked, Mode=TwoWay}" />
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

**Key requirements:**
- Set `ItemTemplateDataContextType="Node"` to access TreeViewNode properties
- Bind `IsChecked` to `TreeViewNode.IsChecked` with `Mode=TwoWay`

### CheckBox Modes

| Mode | Behavior |
|------|----------|
| **None** | No checkbox support |
| **Individual** | Independent checkboxes |
| **Recursive** | Parent/child auto-check |

**Recursive Mode:**
- Checking parent checks all children
- Checking all children checks parent
- Unchecking parent unchecks all children
- Mixed state (indeterminate) when some children checked

### Get Checked Items

```csharp
// CheckedItems property contains all checked data objects
var checkedItems = treeView.CheckedItems;

foreach (var item in checkedItems)
{
    var file = item as FileNode;
    Debug.WriteLine($"Checked: {file.Name}");
}
```

### Bind Checked Items

```xml
<treeView:SfTreeView CheckedItems="{Binding SelectedFiles, Mode=TwoWay}" />
```

```csharp
public class ViewModel
{
    public ObservableCollection<object> SelectedFiles { get; set; }
    
    public ViewModel()
    {
        SelectedFiles = new ObservableCollection<object>();
    }
}
```

### Programmatic Check/Uncheck

```csharp
// Check specific items
treeView.CheckedItems.Add(fileNode);

// Uncheck
treeView.CheckedItems.Remove(fileNode);

// Check all
foreach (var node in allNodes)
{
    treeView.CheckedItems.Add(node);
}

// Clear all
treeView.CheckedItems.Clear();
```

## Interactive Events

### ItemTapped Event

Fires when user taps/clicks a node.

```csharp
treeView.ItemTapped += OnItemTapped;

private void OnItemTapped(object sender, ItemTappedEventArgs e)
{
    var node = e.Node;
    var item = node.Content as FileNode;
    var position = e.Position;
    
    Debug.WriteLine($"Tapped: {item.Name}");
    
    // Mark as handled to prevent default behavior
    e.Handled = true;
}
```

**Use cases:**
- Show details panel
- Navigate to item
- Custom selection logic

### ItemDoubleTapped Event

Fires when user double-taps/clicks a node.

```csharp
treeView.ItemDoubleTapped += OnItemDoubleTapped;

private void OnItemDoubleTapped(object sender, ItemDoubleTappedEventArgs e)
{
    var node = e.Node;
    var item = node.Content as FileNode;
    
    if (item.IsFolder)
    {
        // Toggle expansion on double-click
        if (node.IsExpanded)
            treeView.CollapseNode(node);
        else
            treeView.ExpandNode(node);
    }
    else
    {
        // Open file
        OpenFile(item);
    }
    
    e.Handled = true;
}
```

**Use cases:**
- Open files
- Enter edit mode
- Toggle expand/collapse

### ItemHolding Event

Fires when user long-presses/right-clicks a node.

```csharp
treeView.ItemHolding += OnItemHolding;

private void OnItemHolding(object sender, ItemHoldingEventArgs e)
{
    var node = e.Node;
    var item = node.Content as FileNode;
    var position = e.Position;
    
    // Show context menu
    ShowContextMenu(node, position);
}
```

**Use cases:**
- Show context menus
- Display tooltips
- Touch-and-hold actions

## Context Menus

### Basic Context Menu

```csharp
treeView.RightTapped += OnRightTapped;
// OR
treeView.ItemHolding += OnItemHolding;

private void OnRightTapped(object sender, RightTappedRoutedEventArgs e)
{
    // Get node at position
    var point = e.GetPosition(treeView);
    var node = treeView.GetNodeAt(point);
    
    if (node != null)
    {
        ShowContextMenu(node, point);
    }
}

private void ShowContextMenu(TreeViewNode node, Point position)
{
    var flyout = new MenuFlyout();
    
    var item = node.Content as FileNode;
    
    // Add menu items
    var openItem = new MenuFlyoutItem { Text = "Open" };
    openItem.Click += (s, e) => OpenFile(item);
    flyout.Items.Add(openItem);
    
    var renameItem = new MenuFlyoutItem { Text = "Rename" };
    renameItem.Click += (s, e) => treeView.BeginEdit(node);
    flyout.Items.Add(renameItem);
    
    flyout.Items.Add(new MenuFlyoutSeparator());
    
    var deleteItem = new MenuFlyoutItem { Text = "Delete" };
    deleteItem.Click += (s, e) => DeleteNode(node);
    flyout.Items.Add(deleteItem);
    
    // Show menu
    flyout.ShowAt(treeView, position);
}
```

### Conditional Menu Items

```csharp
private void ShowContextMenu(TreeViewNode node, Point position)
{
    var flyout = new MenuFlyout();
    var item = node.Content as FileNode;
    
    if (item.IsFolder)
    {
        var newFolderItem = new MenuFlyoutItem { Text = "New Folder" };
        newFolderItem.Click += (s, e) => CreateFolder(node);
        flyout.Items.Add(newFolderItem);
        
        var newFileItem = new MenuFlyoutItem { Text = "New File" };
        newFileItem.Click += (s, e) => CreateFile(node);
        flyout.Items.Add(newFileItem);
    }
    
    // Common items
    var copyItem = new MenuFlyoutItem { Text = "Copy" };
    copyItem.Click += (s, e) => CopyNode(node);
    flyout.Items.Add(copyItem);
    
    var pasteItem = new MenuFlyoutItem 
    { 
        Text = "Paste",
        IsEnabled = _clipboard.HasData
    };
    pasteItem.Click += (s, e) => PasteNode(node);
    flyout.Items.Add(pasteItem);
    
    flyout.ShowAt(treeView, position);
}
```

## Keyboard Navigation

TreeView supports standard keyboard navigation:

| Key | Action |
|-----|--------|
| **↑** | Move to previous visible node |
| **↓** | Move to next visible node |
| **←** | Collapse node or move to parent |
| **→** | Expand node or move to first child |
| **Home** | Move to first node |
| **End** | Move to last visible node |
| **F2** | Enter edit mode |
| **Delete** | Delete selected nodes (if AllowDeleting=true) |
| **Space** | Toggle checkbox (if CheckBoxMode enabled) |
| **Enter** | Select node |
| **Ctrl+A** | Select all (Extended mode) |

### Custom Keyboard Shortcuts

```csharp
treeView.KeyDown += OnTreeViewKeyDown;

private void OnTreeViewKeyDown(object sender, KeyRoutedEventArgs e)
{
    if (e.Key == Windows.System.VirtualKey.F2)
    {
        // Custom F2 handling
        var selected = treeView.SelectedItem;
        if (selected != null)
        {
            var node = treeView.GetNodeAt((Point)selected);
            treeView.BeginEdit(node);
            e.Handled = true;
        }
    }
    else if (e.Key == Windows.System.VirtualKey.Delete)
    {
        // Custom delete with confirmation
        if (treeView.SelectedItems.Count > 0)
        {
            ConfirmAndDelete();
            e.Handled = true;
        }
    }
}
```

## Scrolling

### Bring Node Into View

```csharp

// Scroll to specific data item
treeView.BringIntoView(fileObject);

```

### Smooth Scrolling

```csharp
// Expand path and scroll to node
public async Task NavigateToNode(FileNode target)
{
    // Expand ancestors
    ExpandPathToNode(target);

    // Small delay to allow expansion
    await Task.Delay(100);

    // Scroll to item
    treeView.BringIntoView(target);

    // Select item
    treeView.SelectedItem = target;
}
```

### Scroll Events

```csharp
// Get ScrollViewer
var scrollViewer = FindScrollViewer(treeView);

if (scrollViewer != null)
{
    scrollViewer.ViewChanging += OnViewChanging;
    scrollViewer.ViewChanged += OnViewChanged;
}

private void OnViewChanged(object sender, ScrollViewerViewChangedEventArgs e)
{
    if (!e.IsIntermediate)
    {
        // Scrolling finished
        LoadVisibleItems();
    }
}
```

## Animations

### Enable Animations

```xml
<treeView:SfTreeView IsAnimationEnabled="True" />
```

```csharp
treeView.IsAnimationEnabled = true;
```

**What animates:**
- Expand/collapse transitions
- Node selection
- Scrolling

### Disable for Performance

```csharp
// Disable during batch operations
treeView.IsAnimationEnabled = false;

treeView.ExpandAll();
// OR
LoadLargeDataSet();

treeView.IsAnimationEnabled = true;
```

## Common Scenarios

### Scenario 1: Checkbox with Action Button

```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <Grid>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="Auto" />
                <ColumnDefinition Width="*" />
                <ColumnDefinition Width="Auto" />
            </Grid.ColumnDefinitions>
            
            <CheckBox Grid.Column="0"
                      IsChecked="{Binding IsChecked, Mode=TwoWay}" 
                      Margin="0,0,8,0" />
            
            <TextBlock Grid.Column="1"
                       Text="{Binding Content.Name}"
                       VerticalAlignment="Center" />
            
            <Button Grid.Column="2"
                    Content="Details"
                    Click="OnDetailsClick" />
        </Grid>
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

### Scenario 2: Batch Operations on Checked Items

```csharp
private async void ProcessCheckedItems()
{
    var checkedItems = treeView.CheckedItems
        .Cast<FileNode>()
        .ToList();
    
    if (checkedItems.Count == 0)
    {
        ShowMessage("No items selected");
        return;
    }
    
    var confirmed = await ConfirmAsync($"Process {checkedItems.Count} items?");
    
    if (confirmed)
    {
        foreach (var item in checkedItems)
        {
            await ProcessItemAsync(item);
        }
        
        ShowMessage($"Processed {checkedItems.Count} items");
    }
}
```

### Scenario 3: Multi-Level Context Menu

```csharp
private void ShowContextMenu(TreeViewNode node, Point position)
{
    var flyout = new MenuFlyout();
    var item = node.Content as FileNode;
    
    // Create submenu for "New"
    var newSubmenu = new MenuFlyoutSubItem { Text = "New" };
    newSubmenu.Items.Add(new MenuFlyoutItem { Text = "Folder" });
    newSubmenu.Items.Add(new MenuFlyoutItem { Text = "Text File" });
    newSubmenu.Items.Add(new MenuFlyoutItem { Text = "Document" });
    flyout.Items.Add(newSubmenu);
    
    // Other items
    flyout.Items.Add(new MenuFlyoutSeparator());
    flyout.Items.Add(new MenuFlyoutItem { Text = "Cut" });
    flyout.Items.Add(new MenuFlyoutItem { Text = "Copy" });
    flyout.Items.Add(new MenuFlyoutItem { Text = "Paste" });
    
    flyout.ShowAt(treeView, position);
}
```

### Scenario 4: Interactive Tooltips

```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <Grid>
            <TextBlock Text="{Binding Name}">
                <ToolTipService.ToolTip>
                    <ToolTip>
                        <StackPanel>
                            <TextBlock Text="{Binding Name}" FontWeight="Bold" />
                            <TextBlock Text="{Binding Path}" />
                            <TextBlock Text="{Binding Size, StringFormat='Size: {0} KB'}" />
                        </StackPanel>
                    </ToolTip>
                </ToolTipService.ToolTip>
            </TextBlock>
        </Grid>
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

### Scenario 5: Touch-Friendly Interactions

```xml
<!-- Larger hit targets for touch -->
<treeView:SfTreeView ItemHeight="48"
                      ExpanderWidth="48">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <Grid Padding="8">
                <TextBlock Text="{Binding Name}" 
                           FontSize="16"
                           VerticalAlignment="Center" />
            </Grid>
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

## Best Practices

1. **Use Recursive CheckBoxMode** for hierarchical selection
2. **Handle ItemTapped** for custom navigation
3. **Use ItemDoubleTapped** for primary action (open)
4. **Show context menus** on ItemHolding/RightTapped
5. **Provide keyboard shortcuts** for power users
6. **Disable animations** during batch operations
7. **Make touch targets large enough** (min 44x44px)
8. **Show visual feedback** for all interactions
9. **Test keyboard navigation** thoroughly
10. **Optimize for both mouse and touch**

## Next Steps

- **Appearance** - Customize visual styling
- **MVVM** - Commands for interactions
- **Selection** - Combine with checkbox selection
