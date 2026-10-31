# Editing in WinUI TreeView

## Table of Contents
- [Overview](#overview)
- [Enabling Editing](#enabling-editing)
- [Edit Templates](#edit-templates)
- [Programmatic Editing](#programmatic-editing)
- [Edit Events](#edit-events)
- [Validation](#validation)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView supports inline editing of node content, allowing users to rename items directly within the tree. Editing requires configuration of edit templates (for bound mode) and can be triggered via keyboard (F2) or programmatically.

## Enabling Editing

### Basic Setup

```xml
<treeView:SfTreeView AllowEditing="True"
                      ItemsSource="{Binding Files}"
                      ChildPropertyName="Children">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Name}" />
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
    
    <!-- Required for bound mode -->
    <treeView:SfTreeView.EditTemplate>
        <DataTemplate>
            <TextBox Text="{Binding Name, Mode=TwoWay}" 
                     VerticalContentAlignment="Center" />
        </DataTemplate>
    </treeView:SfTreeView.EditTemplate>
</treeView:SfTreeView>
```

```csharp
treeView.AllowEditing = true;
```

**Key Points:**
- **ItemTemplate** - Display mode
- **EditTemplate** - Edit mode (required for bound mode)
- **F2 key** - Enters edit mode
- **Enter/Tab** - Commits edits
- **Escape** - Cancels edits (with IEditableObject)

### Bound vs Unbound Mode

**Bound Mode:**
- Requires `EditTemplate` definition
- Binds to data model properties
- Changes update data model automatically

**Unbound Mode:**
- Default TextBox without template
- Edits `TreeViewNode.Content` directly

## Edit Templates

### Simple Text Editing

```xml
<treeView:SfTreeView.EditTemplate>
    <DataTemplate>
        <TextBox Text="{Binding Name, Mode=TwoWay}"
                 SelectionStart="0"
                 SelectionLength="{Binding Name.Length}" />
    </DataTemplate>
</treeView:SfTreeView.EditTemplate>
```

### Custom Height Alignment

```xml
<treeView:SfTreeView.EditTemplate>
    <DataTemplate>
        <TextBox Text="{Binding Name, Mode=TwoWay}"
                 Height="{Binding ItemHeight, ElementName=treeView}"
                 VerticalContentAlignment="Center"
                 Margin="-4,0,-4,0" />
    </DataTemplate>
</treeView:SfTreeView.EditTemplate>
```

### Multi-Property Editing

```xml
<treeView:SfTreeView.EditTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal" Spacing="8">
            <TextBox Text="{Binding Name, Mode=TwoWay}" 
                     Width="200" />
            <TextBox Text="{Binding Description, Mode=TwoWay}" 
                     Width="300" />
        </StackPanel>
    </DataTemplate>
</treeView:SfTreeView.EditTemplate>
```

### EditTemplateSelector

Use when different node types need different edit templates:

```csharp
public class FileEditTemplateSelector : DataTemplateSelector
{
    public DataTemplate FolderEditTemplate { get; set; }
    public DataTemplate FileEditTemplate { get; set; }
    
    protected override DataTemplate SelectTemplateCore(object item)
    {
        var fileNode = item as FileNode;
        return fileNode?.IsFolder == true 
            ? FolderEditTemplate 
            : FileEditTemplate;
    }
}
```

```xml
<Page.Resources>
    <DataTemplate x:Key="FolderEdit">
        <TextBox Text="{Binding Name, Mode=TwoWay}" />
    </DataTemplate>
    
    <DataTemplate x:Key="FileEdit">
        <StackPanel>
            <TextBox Text="{Binding Name, Mode=TwoWay}" />
            <TextBox Text="{Binding Extension, Mode=TwoWay}" />
        </StackPanel>
    </DataTemplate>
    
    <local:FileEditTemplateSelector x:Key="EditSelector"
                                     FolderEditTemplate="{StaticResource FolderEdit}"
                                     FileEditTemplate="{StaticResource FileEdit}" />
</Page.Resources>

<treeView:SfTreeView EditTemplateSelector="{StaticResource EditSelector}" />
```

## Programmatic Editing

### Begin Editing

```csharp
// Start editing a node
var node = treeView.GetNode(file);
treeView.BeginEdit(node);
```

```csharp
// Edit first node when TreeView loads
treeView.Loaded += (s, e) =>
{
    if (treeView.Nodes.Count > 0)
    {
        treeView.BeginEdit(treeView.Nodes[0]);
    }
};
```

### End Editing

```csharp
// Commit editing for a node
var node = treeView.GetNode(file);
treeView.EndEdit(node);
```

```csharp
// End editing on button click
private void SaveButton_Click(object sender, RoutedEventArgs e)
{
    var currentNode = treeView.Nodes
        .FirstOrDefault(n => n.IsInEditMode);
    
    if (currentNode != null)
    {
        treeView.EndEdit(currentNode);
    }
}
```

### Check Edit State

```csharp
// Check if node is being edited
var node = treeView.GetNode(file);
if (node.IsInEditMode)
{
    // Node is currently being edited
}
```

## Edit Events

### ItemBeginEdit Event

Fires **before** editing starts. Can be canceled.

```csharp
treeView.ItemBeginEdit += OnItemBeginEdit;

private void OnItemBeginEdit(object sender, TreeViewItemBeginEditEventArgs e)
{
    var node = e.Node;
    var item = node.Content as FileNode;
    
    // Prevent editing of certain nodes
    if (item.IsReadOnly)
    {
        e.Cancel = true;
        ShowMessage("This item cannot be edited");
        return;
    }
    
    // Prevent editing root nodes
    if (node.Level == 0)
    {
        e.Cancel = true;
    }
}
```

### ItemEndEdit Event

Fires **after** editing ends. Can be canceled (reverts changes).

```csharp
treeView.ItemEndEdit += OnItemEndEdit;

private void OnItemEndEdit(object sender, TreeViewItemEndEditEventArgs e)
{
    var node = e.Node;
    var item = node.Content as FileNode;
    
    // Validate new value
    if (string.IsNullOrWhiteSpace(item.Name))
    {
        e.Cancel = true;
        ShowMessage("Name cannot be empty");
        return;
    }
    
    // Check for duplicates
    if (IsDuplicateName(item.Name, item.Parent, item))
    {
        e.Cancel = true;
        ShowMessage("A file with this name already exists");
        return;
    }
    
    // Save changes
    SaveToDatabase(item);
}

private bool IsDuplicateName(string name, FileNode parent, FileNode currentItem)
{
    return parent.Children.Any(c => c.Name == name && c != currentItem);
}
```

## Validation

### Real-time Validation

```xml
<treeView:SfTreeView.EditTemplate>
    <DataTemplate>
        <TextBox x:Name="editBox"
                 Text="{Binding Name, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}"
                 TextChanged="OnEditTextChanged" />
    </DataTemplate>
</treeView:SfTreeView.EditTemplate>
```

```csharp
private void OnEditTextChanged(object sender, TextChangedEventArgs e)
{
    var textBox = sender as TextBox;
    var text = textBox.Text;
    
    // Validate as user types
    if (text.Length > 255)
    {
        textBox.Foreground = new SolidColorBrush(Colors.Red);
    }
    else if (text.Any(c => Path.GetInvalidFileNameChars().Contains(c)))
    {
        textBox.Foreground = new SolidColorBrush(Colors.Red);
    }
    else
    {
        textBox.Foreground = new SolidColorBrush(Colors.Black);
    }
}
```

### Using IEditableObject

Implement `IEditableObject` to support rollback with Escape key:

```csharp
public class FileNode : INotifyPropertyChanged, IEditableObject
{
    private string _name;
    private FileNode _backup;
    
    public string Name
    {
        get => _name;
        set
        {
            _name = value;
            OnPropertyChanged();
        }
    }
    
    // Begin edit - take backup
    public void BeginEdit()
    {
        _backup = new FileNode { Name = this.Name };
    }
    
    // End edit - commit changes
    public void EndEdit()
    {
        _backup = null;
    }
    
    // Cancel edit - restore backup
    public void CancelEdit()
    {
        if (_backup != null)
        {
            this.Name = _backup.Name;
            _backup = null;
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged([CallerMemberName] string name = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}
```

**Now Escape key will revert changes!**

## Common Scenarios

### Scenario 1: Edit on Double-Click

```csharp
treeView.ItemDoubleTapped += OnItemDoubleTapped;

private void OnItemDoubleTapped(object sender, ItemTappedEventArgs e)
{
    if (treeView.AllowEditing)
    {
        treeView.BeginEdit(e.Node);
    }
}
```

### Scenario 2: Rename with Context Menu

```csharp
private void ShowContextMenu(TreeViewNode node, Point position)
{
    var flyout = new MenuFlyout();
    
    var renameItem = new MenuFlyoutItem { Text = "Rename" };
    renameItem.Click += (s, e) =>
    {
        treeView.BeginEdit(node);
    };
    
    flyout.Items.Add(renameItem);
    flyout.ShowAt(treeView, position);
}
```

### Scenario 3: Auto-Select Text on Edit

```xml
<treeView:SfTreeView.EditTemplate>
    <DataTemplate>
        <TextBox Text="{Binding Name, Mode=TwoWay}"
                 Loaded="OnEditBoxLoaded" />
    </DataTemplate>
</treeView:SfTreeView.EditTemplate>
```

```csharp
private void OnEditBoxLoaded(object sender, RoutedEventArgs e)
{
    var textBox = sender as TextBox;
    textBox.Focus(FocusState.Programmatic);
    textBox.SelectAll();
}
```

### Scenario 4: Validate Against Server

```csharp
treeView.ItemEndEdit += OnItemEndEdit;

private async void OnItemEndEdit(object sender, TreeViewItemEndEditEventArgs e)
{
    var item = e.Node.Content as FileNode;
    
    // Show loading indicator
    IsLoading = true;
    
    try
    {
        // Validate with server
        bool isValid = await ValidateNameAsync(item.Name);
        
        if (!isValid)
        {
            e.Cancel = true;
            ShowMessage("Name already exists on server");
        }
    }
    finally
    {
        IsLoading = false;
    }
}
```

### Scenario 5: Batch Rename

```csharp
public async Task BatchRenameNodes(List<FileNode> nodes, string newNamePattern)
{
    treeView.AllowEditing = true;
    
    for (int i = 0; i < nodes.Count; i++)
    {
        var node = treeView.GetNode(nodes[i]);
        
        // Update name
        nodes[i].Name = string.Format(newNamePattern, i + 1);
        
        // Briefly enter/exit edit to validate
        treeView.BeginEdit(node);
        await Task.Delay(100);  // Give UI time to update
        treeView.EndEdit(node);
    }
}
```

## Troubleshooting

### Editing Not Working

**Problem:** F2 key doesn't enter edit mode

**Solutions:**
1. Enable editing
   ```csharp
   treeView.AllowEditing = true;
   ```

2. Define EditTemplate for bound mode
   ```xml
   <treeView:SfTreeView.EditTemplate>
       <DataTemplate>
           <TextBox Text="{Binding Name, Mode=TwoWay}" />
       </DataTemplate>
   </treeView:SfTreeView.EditTemplate>
   ```

3. Ensure node is selected
   ```csharp
   treeView.SelectedItem = item;
   treeView.BeginEdit(node);
   ```

### Changes Not Saving

**Problem:** Edits don't update data model

**Solutions:**
1. Use `Mode=TwoWay` binding
   ```xml
   <TextBox Text="{Binding Name, Mode=TwoWay}" />
   ```

2. Implement INotifyPropertyChanged
   ```csharp
   public string Name
   {
       get => _name;
       set
       {
           _name = value;
           OnPropertyChanged();  // Required!
       }
   }
   ```

### Escape Key Not Canceling

**Problem:** Pressing Escape doesn't revert changes

**Solution:** Implement IEditableObject interface (see Validation section above)

### TextBox Height Mismatch

**Problem:** Edit TextBox doesn't match node height

**Solution:** Bind to TreeView ItemHeight
```xml
<TextBox Height="{Binding ItemHeight, ElementName=treeView}"
         VerticalContentAlignment="Center"
         Margin="-4,0,-4,0" />
```

## Best Practices

1. **Always define EditTemplate** for bound mode
2. **Use Mode=TwoWay** for data binding in edit templates
3. **Implement IEditableObject** to support Escape key rollback
4. **Validate in ItemEndEdit** event and cancel if invalid
5. **Provide visual feedback** during validation
6. **Auto-select text** when entering edit mode
7. **Disable editing** for read-only nodes in ItemBeginEdit
8. **Show error messages** clearly to users
9. **Test with long names** that might overflow
10. **Handle async validation** gracefully

## Next Steps

- **Selection** - Select edited nodes
- **Drag-Drop** - Combine with node reordering
- **CRUD Operations** - Add, delete nodes alongside editing
