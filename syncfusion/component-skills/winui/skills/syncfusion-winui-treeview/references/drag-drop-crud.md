# Drag-Drop and CRUD Operations

## Table of Contents
- [Overview](#overview)
- [Drag and Drop](#drag-and-drop)
- [CRUD Operations](#crud-operations)
- [Load on Demand](#load-on-demand)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView supports complete node manipulation including drag-and-drop reordering, CRUD operations (Create, Read, Update, Delete), and lazy loading of child nodes. These features enable building interactive file explorers, organization charts, and dynamic hierarchies.

## Drag and Drop

### Enable Drag and Drop

```xml
<treeView:SfTreeView CanDrag="True"
                      AllowDrop="True"
                      ItemsSource="{Binding Files}"
                      ChildPropertyName="Children" />
```

```csharp
treeView.CanDrag = true;
treeView.AllowDrop = true;
```

**User actions:**
- **Drag:** Click and hold, then drag node
- **Drop:** Release mouse over target node
- **Position:** Drop above, below, or as child based on indicator

### Drag Multiple Nodes

Enable multiple selection for multi-node dragging:

```xml
<treeView:SfTreeView CanDrag="True"
                      SelectionMode="Multiple" />
```

**Usage:**
1. Select multiple nodes (Ctrl+Click)
2. Drag any selected node
3. All selected nodes move together

### Drag and Drop Events

#### ItemDragStarting Event

Fires **before** drag starts. Can be canceled.

```csharp
treeView.ItemDragStarting += OnItemDragStarting;

private void OnItemDragStarting(object sender, TreeViewItemDragStartingEventArgs e)
{
    // Get dragging nodes
    var nodes = e.DraggingNodes;
    
    // Prevent dragging certain nodes
    foreach (var node in nodes)
    {
        var item = node.Content as FileNode;
        if (item.IsLocked)
        {
            e.Cancel = true;
            ShowMessage("Cannot drag locked items");
            return;
        }
    }
    
    // Customize drag data
    e.Data = new DataPackage();
    e.Data.SetText(string.Join(",", nodes.Select(n => (n.Content as FileNode).Name)));
}
```

#### ItemDragStarted Event

Fires **after** drag starts.

```csharp
treeView.ItemDragStarted += OnItemDragStarted;

private void OnItemDragStarted(object sender, TreeViewItemDragStartedEventArgs e)
{
    var nodes = e.DraggingNodes;
    Debug.WriteLine($"Dragging {nodes.Count} items");
}
```

#### ItemDropping Event

Fires **before** drop completes. Can be canceled.

```csharp
treeView.ItemDropping += OnItemDropping;

private void OnItemDropping(object sender, TreeViewItemDroppingEventArgs e)
{
    var draggingNodes = e.DraggingNodes;
    var targetNode = e.TargetNode;
    var dropPosition = e.DropPosition;  // None, DropAbove, DropBelow, DropAsChild
    
    // Validate drop operation
    var target = targetNode.Content as FileNode;
    
    // Prevent dropping on files (only folders)
    if (!target.IsFolder && dropPosition == DropPosition.DropAsChild)
    {
        e.Cancel = true;
        ShowMessage("Cannot drop into a file");
        return;
    }
    
    // Prevent circular references
    foreach (var node in draggingNodes)
    {
        if (IsAncestor(node, targetNode))
        {
            e.Cancel = true;
            ShowMessage("Cannot move folder into its own subfolder");
            return;
        }
    }
}

private bool IsAncestor(TreeViewNode potentialAncestor, TreeViewNode node)
{
    var current = node.ParentNode;
    while (current != null)
    {
        if (current == potentialAncestor)
            return true;
        current = current.ParentNode;
    }
    return false;
}
```

#### ItemDropped Event

Fires **after** drop completes.

```csharp
treeView.ItemDropped += OnItemDropped;

private void OnItemDropped(object sender, TreeViewItemDroppedEventArgs e)
{
    var nodes = e.DroppedNodes;
    var targetNode = e.TargetNode;
    
    // Save changes to database
    foreach (var node in nodes)
    {
        var item = node.Content as FileNode;
        UpdateDatabase(item);
    }
    
    ShowMessage($"Moved {nodes.Count} item(s)");
}
```

## CRUD Operations

### Create (Add Nodes)

**Bound Mode:**
```csharp
// Add to data model - TreeView updates automatically
var newFile = new FileNode 
{ 
    Name = "NewDocument.docx",
    IsFolder = false,
    Children = new ObservableCollection<FileNode>()
};

parentFolder.Children.Add(newFile);
```

**Unbound Mode:**
```csharp
// Add TreeViewNode directly
var newNode = new TreeViewNode 
{ 
    Content = "New Item" 
};

parentNode.ChildNodes.Add(newNode);
// Or add to root
treeView.Nodes.Add(newNode);
```

**Add at specific position:**
```csharp
// Insert at index 2
parentFolder.Children.Insert(2, newFile);
```

### Read (Query Nodes)

```csharp
// Get all nodes
var allNodes = treeView.Nodes;

// Find node by data object
var node = treeView.GetNode(fileObject);

// Search by criteria
public FileNode FindNode(string name)
{
    return SearchNodes(viewModel.Files, name);
}

private FileNode SearchNodes(ObservableCollection<FileNode> nodes, string name)
{
    foreach (var node in nodes)
    {
        if (node.Name == name)
            return node;
        
        if (node.Children != null)
        {
            var found = SearchNodes(node.Children, name);
            if (found != null)
                return found;
        }
    }
    return null;
}
```

### Update (Modify Nodes)

```csharp
// Update property - TreeView updates automatically with INotifyPropertyChanged
fileNode.Name = "UpdatedName.docx";
fileNode.Size = 2048;

// Update requires INotifyPropertyChanged implementation
public class FileNode : INotifyPropertyChanged
{
    private string _name;
    public string Name
    {
        get => _name;
        set
        {
            _name = value;
            OnPropertyChanged();
        }
    }
}
```

### Delete (Remove Nodes)

**Enable Delete with Delete Key:**
```xml
<treeView:SfTreeView AllowDeleting="True" />
```

```csharp
treeView.AllowDeleting = true;
```

**User action:** Select node(s) and press **Delete** key

**Programmatic Delete:**

**Bound Mode:**
```csharp
// Remove from collection
parentFolder.Children.Remove(fileNode);

// Or by index
parentFolder.Children.RemoveAt(0);

// Remove selected item
var selected = treeView.SelectedItem as FileNode;
if (selected != null)
{
    var parent = FindParent(selected);
    parent?.Children.Remove(selected);
}
```

**Unbound Mode:**
```csharp
// Remove TreeViewNode
parentNode.ChildNodes.Remove(childNode);

// Or from root
treeView.Nodes.Remove(node);
```

### Delete Events

#### ItemDeleting Event

Fires **before** deletion. Can be canceled.

```csharp
treeView.ItemDeleting += OnItemDeleting;

private void OnItemDeleting(object sender, ItemDeletingEventArgs e)
{
    var nodes = e.Nodes.ToList();
    
    foreach (var node in nodes)
    {
        var item = node.Content as FileNode;
        
        // Prevent deleting system files
        if (item.IsSystem)
        {
            e.Cancel = true;
            ShowMessage("Cannot delete system files");
            return;
        }
        
        // Skip certain nodes
        if (item.IsProtected)
        {
            e.Nodes.Remove(node);
        }
    }
    
    // Confirm deletion
    if (!await ConfirmDeleteAsync(nodes.Count))
    {
        e.Cancel = true;
    }
}
```

#### ItemDeleted Event

Fires **after** deletion.

```csharp
treeView.ItemDeleted += OnItemDeleted;

private void OnItemDeleted(object sender, ItemDeletedEventArgs e)
{
    var nodes = e.Nodes;
    
    // Update database
    foreach (var node in nodes)
    {
        var item = node.Content as FileNode;
        DeleteFromDatabase(item.Id);
    }
    
    // Reset selection
    if (treeView.Nodes.Count > 0)
    {
        treeView.SelectedItem = treeView.Nodes[0].Content;
    }
    
    ShowMessage($"Deleted {nodes.Count} item(s)");
}
```

## Load on Demand

Load child nodes only when parent expands (lazy loading).

### Basic Setup

```csharp
public class FileNode : INotifyPropertyChanged
{
    public string Name { get; set; }
    public bool HasChildren { get; set; }  // Important!
    public ObservableCollection<FileNode> Children { get; set; }
    
    public FileNode()
    {
        Children = new ObservableCollection<FileNode>();
    }
}
```

```xml
<treeView:SfTreeView  LoadOnDemandCommand="{Binding LoadChildrenCommand}"
                      ItemsSource="{Binding RootFolders}">
</treeView:SfTreeView>
```

### ViewModel with LoadOnDemandCommand

```csharp
public class FileViewModel
{
    public ObservableCollection<FileNode> RootFolders { get; set; }
    public ICommand LoadChildrenCommand { get; }
    
    public FileViewModel()
    {
        LoadChildrenCommand = new RelayCommand<TreeViewNode>(LoadChildren);
        
        // Load root nodes only
        RootFolders = new ObservableCollection<FileNode>
        {
            new FileNode { Name = "Documents", HasChildren = true },
            new FileNode { Name = "Downloads", HasChildren = true },
            new FileNode { Name = "Pictures", HasChildren = true }
        };
    }
    
    private void LoadChildren(TreeViewNode node)
    {
        var folder = node.Content as FileNode;
        
        // Check if already loaded
        if (folder.Children.Count > 0)
            return;
        
        // Load children from service/database
        var children = FileService.GetChildren(folder.Name);
        
        foreach (var child in children)
        {
            folder.Children.Add(child);
        }
        
        // Mark as loaded
        folder.HasChildren = folder.Children.Count > 0;
    }
}
```

### Async Load on Demand

```csharp
public class FileViewModel
{
    private async void LoadChildren(TreeViewNode node)
    {
        var folder = node.Content as FileNode;
        
        if (folder.Children.Count > 0)
            return;
        
        folder.IsLoading = true;
        
        try
        {
            // Async load from API
            var children = await FileService.GetChildrenAsync(folder.Id);
            
            foreach (var child in children)
            {
                folder.Children.Add(child);
            }
        }
        catch (Exception ex)
        {
            ShowError($"Failed to load: {ex.Message}");
        }
        finally
        {
            folder.IsLoading = false;
        }
    }
}
```

### Loading Indicator

```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal">
            <ProgressRing IsActive="{Binding IsLoading}" 
                          Width="16" 
                          Height="16" 
                          Margin="0,0,8,0" />
            <TextBlock Text="{Binding Name}" />
        </StackPanel>
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

## Common Scenarios

### Scenario 1: File Explorer with Drag-Drop

```csharp
treeView.ItemDropped += OnItemDropped;

private async void OnItemDropped(object sender, TreeViewItemDroppedEventArgs e)
{
    var droppedNodes = e.DroppedNodes;
    var targetNode = e.TargetNode;
    var target = targetNode.Content as FileNode;
    
    // Move files
    foreach (var node in droppedNodes)
    {
        var file = node.Content as FileNode;
        
        // Update file system
        await FileService.MoveFileAsync(file.Path, target.Path);
        
        // Update database
        file.ParentId = target.Id;
        await Database.UpdateAsync(file);
    }
    
    ShowMessage($"Moved {droppedNodes.Count} item(s)");
}
```

### Scenario 2: Context Menu CRUD

```csharp
private void ShowContextMenu(TreeViewNode node, Point position)
{
    var flyout = new MenuFlyout();
    
    // Add
    var addItem = new MenuFlyoutItem { Text = "New Folder" };
    addItem.Click += (s, e) => CreateNewFolder(node);
    flyout.Items.Add(addItem);
    
    // Rename
    var renameItem = new MenuFlyoutItem { Text = "Rename" };
    renameItem.Click += (s, e) => treeView.BeginEdit(node);
    flyout.Items.Add(renameItem);
    
    // Delete
    var deleteItem = new MenuFlyoutItem { Text = "Delete" };
    deleteItem.Click += async (s, e) => await DeleteNode(node);
    flyout.Items.Add(deleteItem);
    
    flyout.ShowAt(treeView, position);
}

private void CreateNewFolder(TreeViewNode parentNode)
{
    var parent = parentNode.Content as FileNode;
    var newFolder = new FileNode
    {
        Name = "New Folder",
        IsFolder = true,
        Children = new ObservableCollection<FileNode>()
    };
    
    parent.Children.Add(newFolder);
    
    // Select and edit
    treeView.SelectedItem = newFolder;
    var node = treeView.GetNode(newFolder);
    treeView.BeginEdit(node);
}
```

### Scenario 3: Batch Operations

```csharp
public async Task DeleteMultipleNodes(List<FileNode> nodes)
{
    // Disable UI during operation
    treeView.IsEnabled = false;
    
    try
    {
        foreach (var node in nodes)
        {
            // Delete from database
            await Database.DeleteAsync(node.Id);
            
            // Remove from parent
            var parent = FindParent(node);
            parent?.Children.Remove(node);
        }
        
        ShowMessage($"Deleted {nodes.Count} items");
    }
    finally
    {
        treeView.IsEnabled = true;
    }
}
```

### Scenario 4: Undo/Redo Operations

```csharp
private Stack<ICommand> _undoStack = new Stack<ICommand>();
private Stack<ICommand> _redoStack = new Stack<ICommand>();

public void DeleteWithUndo(FileNode node)
{
    var parent = FindParent(node);
    var index = parent.Children.IndexOf(node);
    
    // Create undo command
    var undoCommand = new UndoableDelete
    {
        Node = node,
        Parent = parent,
        Index = index,
        Execute = () => parent.Children.RemoveAt(index),
        Undo = () => parent.Children.Insert(index, node)
    };
    
    // Execute and push to undo stack
    undoCommand.Execute();
    _undoStack.Push(undoCommand);
    _redoStack.Clear();
}

public void Undo()
{
    if (_undoStack.Count > 0)
    {
        var command = _undoStack.Pop();
        command.Undo();
        _redoStack.Push(command);
    }
}
```

## Troubleshooting

**Drag not working:**
- Set `CanDrag="True"`
- Ensure items are selectable
- Check ItemTemplate doesn't block hit testing

**Drop not allowed:**
- Set `AllowDrop="True"`
- Validate drop position in ItemDropping event

**Load on demand not triggering:**
- Ensure `HasChildren=true` on parent nodes
- Bind `LoadOnDemandCommand`

**Changes not reflected:**
- Use `ObservableCollection<T>`
- Implement `INotifyPropertyChanged`
- Set `NotificationSubscriptionMode`

**Delete key not working:**
- Set `AllowDeleting="True"`
- Ensure TreeView has focus

## Best Practices

1. **Validate drop operations** in ItemDropping event
2. **Prevent circular references** when dragging
3. **Use load on demand** for large hierarchies
4. **Implement INotifyPropertyChanged** for all models
5. **Confirm destructive operations** (delete)
6. **Provide undo/redo** for better UX
7. **Show loading indicators** for async operations
8. **Handle errors gracefully** with user feedback
9. **Update backend** after UI changes
10. **Test with large datasets** for performance

## Next Steps

- **Selection** - Select nodes during/after operations
- **Editing** - Rename nodes inline
- **Customization** - Style drag feedback and nodes
