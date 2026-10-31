# MVVM Patterns

## Table of Contents
- [Overview](#overview)
- [Binding SelectedItem](#binding-selecteditem)
- [Binding SelectedItems](#binding-selecteditems)
- [Commands](#commands)
- [ViewModel Design](#viewmodel-design)
- [Notification Patterns](#notification-patterns)
- [Testing ViewModels](#testing-viewmodels)

## Overview

TreeView fully supports the MVVM (Model-View-ViewModel) pattern with data binding, commands, and testable architectures.

## Binding SelectedItem

Bind a single selected item to the ViewModel:

### XAML

```xml
<Page.DataContext>
    <local:FileViewModel />
</Page.DataContext>

<treeView:SfTreeView ItemsSource="{Binding FileNodes}"
                      ChildPropertyName="Children"
                      SelectedItem="{Binding SelectedNode, Mode=TwoWay}">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Name}" />
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

### ViewModel

```csharp
public class FileViewModel : INotifyPropertyChanged
{
    private object _selectedNode;
    
    public ObservableCollection<FileNode> FileNodes { get; set; }
    
    public object SelectedNode
    {
        get => _selectedNode;
        set
        {
            if (_selectedNode != value)
            {
                _selectedNode = value;
                OnPropertyChanged();
                OnSelectionChanged();
            }
        }
    }
    
    private void OnSelectionChanged()
    {
        // React to selection change
        if (_selectedNode is FileNode node)
        {
            Debug.WriteLine($"Selected: {node.Name}");
            // Load details, update commands, etc.
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

### Code-Behind Binding

```csharp
treeView.SetBinding(SfTreeView.SelectedItemProperty, new Binding
{
    Path = new PropertyPath("SelectedNode"),
    Mode = BindingMode.TwoWay
});
```

## Binding SelectedItems

For multiple selection:

### XAML

```xml
<treeView:SfTreeView ItemsSource="{Binding FileNodes}"
                      ChildPropertyName="Children"
                      SelectionMode="Multiple"
                      SelectedItems="{Binding SelectedNodes, Mode=TwoWay}">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Name}" />
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

### ViewModel

```csharp
public class FileViewModel : INotifyPropertyChanged
{
    private ObservableCollection<object> _selectedNodes;
    
    public ObservableCollection<FileNode> FileNodes { get; set; }
    
    public ObservableCollection<object> SelectedNodes
    {
        get => _selectedNodes;
        set
        {
            if (_selectedNodes != value)
            {
                _selectedNodes = value;
                OnPropertyChanged();
                OnMultipleSelectionChanged();
            }
        }
    }
    
    public FileViewModel()
    {
        FileNodes = new ObservableCollection<FileNode>();
        SelectedNodes = new ObservableCollection<object>();
        
        // Monitor collection changes
        SelectedNodes.CollectionChanged += OnSelectedNodesChanged;
    }
    
    private void OnSelectedNodesChanged(object sender, NotifyCollectionChangedEventArgs e)
    {
        Debug.WriteLine($"Selected count: {SelectedNodes.Count}");
        // Update commands, batch operations, etc.
    }
    
    private void OnMultipleSelectionChanged()
    {
        // React to selection change
        var selectedCount = SelectedNodes?.Count ?? 0;
        Debug.WriteLine($"Total selected: {selectedCount}");
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

## Commands

### RelayCommand Implementation

```csharp
public class RelayCommand : ICommand
{
    private readonly Action<object> _execute;
    private readonly Func<object, bool> _canExecute;
    
    public RelayCommand(Action<object> execute, Func<object, bool> canExecute = null)
    {
        _execute = execute ?? throw new ArgumentNullException(nameof(execute));
        _canExecute = canExecute;
    }
    
    public bool CanExecute(object parameter)
    {
        return _canExecute == null || _canExecute(parameter);
    }
    
    public void Execute(object parameter)
    {
        _execute(parameter);
    }
    
    public event EventHandler CanExecuteChanged;
    
    public void RaiseCanExecuteChanged()
    {
        CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }
}
```

### Context Menu Commands

```csharp
public class FileViewModel : INotifyPropertyChanged
{
    public ICommand OpenCommand { get; }
    public ICommand DeleteCommand { get; }
    public ICommand RenameCommand { get; }
    
    public FileViewModel()
    {
        OpenCommand = new RelayCommand(ExecuteOpen, CanExecuteOpen);
        DeleteCommand = new RelayCommand(ExecuteDelete, CanExecuteDelete);
        RenameCommand = new RelayCommand(ExecuteRename, CanExecuteRename);
    }
    
    private bool CanExecuteOpen(object parameter)
    {
        return SelectedNode != null;
    }
    
    private void ExecuteOpen(object parameter)
    {
        if (SelectedNode is FileNode node)
        {
            Debug.WriteLine($"Opening: {node.Name}");
            // Open file logic
        }
    }
    
    private bool CanExecuteDelete(object parameter)
    {
        return SelectedNode is FileNode node && node.CanDelete;
    }
    
    private void ExecuteDelete(object parameter)
    {
        if (SelectedNode is FileNode node)
        {
            RemoveNode(node);
        }
    }
    
    private bool CanExecuteRename(object parameter)
    {
        return SelectedNode is FileNode node && node.CanRename;
    }
    
    private void ExecuteRename(object parameter)
    {
        if (SelectedNode is FileNode node)
        {
            // Trigger edit mode
            node.IsEditing = true;
        }
    }
    
    private void RemoveNode(FileNode node)
    {
        // Find and remove from parent
        foreach (var root in FileNodes)
        {
            if (RemoveNodeRecursive(root, node))
                break;
        }
    }
    
    private bool RemoveNodeRecursive(FileNode parent, FileNode target)
    {
        if (parent.Children.Contains(target))
        {
            parent.Children.Remove(target);
            return true;
        }
        
        foreach (var child in parent.Children)
        {
            if (RemoveNodeRecursive(child, target))
                return true;
        }
        
        return false;
    }
}
```

### XAML Command Binding

```xml
<treeView:SfTreeView.ItemContextFlyout>
    <MenuFlyout>
        <MenuFlyoutItem Text="Open" 
                        Command="{Binding OpenCommand}" />
        <MenuFlyoutItem Text="Rename" 
                        Command="{Binding RenameCommand}" />
        <MenuFlyoutSeparator />
        <MenuFlyoutItem Text="Delete" 
                        Command="{Binding DeleteCommand}" />
    </MenuFlyout>
</treeView:SfTreeView.ItemContextFlyout>
```

### LoadOnDemand Command

```csharp
public class FileViewModel : INotifyPropertyChanged
{
    public ICommand LoadChildrenCommand { get; }
    
    public FileViewModel()
    {
        LoadChildrenCommand = new RelayCommand(ExecuteLoadChildren);
    }
    
    private async void ExecuteLoadChildren(object parameter)
    {
        if (parameter is TreeViewNode treeViewNode)
        {
            var node = treeViewNode.Content as FileNode;
            
            // Simulate async data loading
            var children = await LoadChildrenAsync(node.Path);
            
            foreach (var child in children)
            {
                node.Children.Add(child);
            }
        }
    }
    
    private async Task<List<FileNode>> LoadChildrenAsync(string path)
    {
        await Task.Delay(500);  // Simulate API call
        
        return new List<FileNode>
        {
            new FileNode { Name = "Child 1", Path = path + "\\Child1" },
            new FileNode { Name = "Child 2", Path = path + "\\Child2" }
        };
    }
}
```

```xml
<treeView:SfTreeView LoadOnDemandCommand="{Binding LoadChildrenCommand}" />
```

## ViewModel Design

### Complete ViewModel Example

```csharp
public class FileExplorerViewModel : INotifyPropertyChanged
{
    private object _selectedNode;
    private ObservableCollection<object> _selectedNodes;
    private bool _isLoading;
    
    public ObservableCollection<FileNode> FileNodes { get; set; }
    
    public object SelectedNode
    {
        get => _selectedNode;
        set
        {
            if (_selectedNode != value)
            {
                _selectedNode = value;
                OnPropertyChanged();
                UpdateCommandStates();
            }
        }
    }
    
    public ObservableCollection<object> SelectedNodes
    {
        get => _selectedNodes;
        set
        {
            if (_selectedNodes != value)
            {
                _selectedNodes = value;
                OnPropertyChanged();
            }
        }
    }
    
    public bool IsLoading
    {
        get => _isLoading;
        set
        {
            if (_isLoading != value)
            {
                _isLoading = value;
                OnPropertyChanged();
            }
        }
    }
    
    // Commands
    public ICommand AddFolderCommand { get; }
    public ICommand AddFileCommand { get; }
    public ICommand DeleteCommand { get; }
    public ICommand RenameCommand { get; }
    public ICommand RefreshCommand { get; }
    public ICommand LoadChildrenCommand { get; }
    
    public FileExplorerViewModel()
    {
        FileNodes = new ObservableCollection<FileNode>();
        SelectedNodes = new ObservableCollection<object>();
        
        AddFolderCommand = new RelayCommand(ExecuteAddFolder, CanExecuteAddFolder);
        AddFileCommand = new RelayCommand(ExecuteAddFile, CanExecuteAddFile);
        DeleteCommand = new RelayCommand(ExecuteDelete, CanExecuteDelete);
        RenameCommand = new RelayCommand(ExecuteRename, CanExecuteRename);
        RefreshCommand = new RelayCommand(ExecuteRefresh);
        LoadChildrenCommand = new RelayCommand(ExecuteLoadChildren);
        
        LoadInitialData();
    }
    
    private async void LoadInitialData()
    {
        IsLoading = true;
        
        var data = await LoadDataAsync();
        foreach (var item in data)
        {
            FileNodes.Add(item);
        }
        
        IsLoading = false;
    }
    
    private async Task<List<FileNode>> LoadDataAsync()
    {
        await Task.Delay(1000);  // Simulate API call
        
        return new List<FileNode>
        {
            new FileNode
            {
                Name = "Documents",
                IsFolder = true,
                Children = new ObservableCollection<FileNode>
                {
                    new FileNode { Name = "Report.docx", IsFolder = false }
                }
            }
        };
    }
    
    private bool CanExecuteAddFolder(object parameter)
    {
        return SelectedNode is FileNode node && node.IsFolder;
    }
    
    private void ExecuteAddFolder(object parameter)
    {
        if (SelectedNode is FileNode parent && parent.IsFolder)
        {
            var newFolder = new FileNode
            {
                Name = "New Folder",
                IsFolder = true,
                Children = new ObservableCollection<FileNode>()
            };
            
            parent.Children.Add(newFolder);
            SelectedNode = newFolder;
        }
    }
    
    private bool CanExecuteAddFile(object parameter)
    {
        return SelectedNode is FileNode node && node.IsFolder;
    }
    
    private void ExecuteAddFile(object parameter)
    {
        if (SelectedNode is FileNode parent && parent.IsFolder)
        {
            var newFile = new FileNode
            {
                Name = "New File.txt",
                IsFolder = false
            };
            
            parent.Children.Add(newFile);
            SelectedNode = newFile;
        }
    }
    
    private bool CanExecuteDelete(object parameter)
    {
        return SelectedNode != null;
    }
    
    private void ExecuteDelete(object parameter)
    {
        if (SelectedNode is FileNode node)
        {
            RemoveNode(node);
        }
    }
    
    private bool CanExecuteRename(object parameter)
    {
        return SelectedNode != null;
    }
    
    private void ExecuteRename(object parameter)
    {
        if (SelectedNode is FileNode node)
        {
            node.IsEditing = true;
        }
    }
    
    private async void ExecuteRefresh(object parameter)
    {
        IsLoading = true;
        
        FileNodes.Clear();
        var data = await LoadDataAsync();
        
        foreach (var item in data)
        {
            FileNodes.Add(item);
        }
        
        IsLoading = false;
    }
    
    private async void ExecuteLoadChildren(object parameter)
    {
        if (parameter is TreeViewNode treeViewNode)
        {
            var node = treeViewNode.Content as FileNode;
            var children = await LoadChildrenAsync(node.Path);
            
            foreach (var child in children)
            {
                node.Children.Add(child);
            }
        }
    }
    
    private void RemoveNode(FileNode target)
    {
        foreach (var root in FileNodes)
        {
            if (RemoveNodeRecursive(root, target))
                break;
        }
    }
    
    private bool RemoveNodeRecursive(FileNode parent, FileNode target)
    {
        if (parent.Children?.Contains(target) == true)
        {
            parent.Children.Remove(target);
            return true;
        }
        
        if (parent.Children != null)
        {
            foreach (var child in parent.Children)
            {
                if (RemoveNodeRecursive(child, target))
                    return true;
            }
        }
        
        return false;
    }
    
    private void UpdateCommandStates()
    {
        (AddFolderCommand as RelayCommand)?.RaiseCanExecuteChanged();
        (AddFileCommand as RelayCommand)?.RaiseCanExecuteChanged();
        (DeleteCommand as RelayCommand)?.RaiseCanExecuteChanged();
        (RenameCommand as RelayCommand)?.RaiseCanExecuteChanged();
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

## Notification Patterns

### INotifyPropertyChanged Base Class

```csharp
public abstract class NotificationObject : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
    
    protected bool SetProperty<T>(ref T storage, T value, [CallerMemberName] string propertyName = null)
    {
        if (EqualityComparer<T>.Default.Equals(storage, value))
            return false;
        
        storage = value;
        OnPropertyChanged(propertyName);
        return true;
    }
}
```

### Model with Notifications

```csharp
public class FileNode : NotificationObject
{
    private string _name;
    private bool _isExpanded;
    private bool _isSelected;
    private bool _isChecked;
    private bool _isEditing;
    private ObservableCollection<FileNode> _children;
    
    public string Name
    {
        get => _name;
        set => SetProperty(ref _name, value);
    }
    
    public bool IsExpanded
    {
        get => _isExpanded;
        set => SetProperty(ref _isExpanded, value);
    }
    
    public bool IsSelected
    {
        get => _isSelected;
        set => SetProperty(ref _isSelected, value);
    }
    
    public bool IsChecked
    {
        get => _isChecked;
        set => SetProperty(ref _isChecked, value);
    }
    
    public bool IsEditing
    {
        get => _isEditing;
        set => SetProperty(ref _isEditing, value);
    }
    
    public ObservableCollection<FileNode> Children
    {
        get => _children;
        set => SetProperty(ref _children, value);
    }
    
    public bool IsFolder { get; set; }
    public string Path { get; set; }
    public bool CanDelete { get; set; } = true;
    public bool CanRename { get; set; } = true;
    
    public FileNode()
    {
        Children = new ObservableCollection<FileNode>();
    }
}
```

## Testing ViewModels

### Unit Test Example

```csharp
[TestClass]
public class FileViewModelTests
{
    [TestMethod]
    public void SelectedNode_SetValue_RaisesPropertyChanged()
    {
        // Arrange
        var viewModel = new FileViewModel();
        var node = new FileNode { Name = "Test" };
        bool eventRaised = false;
        
        viewModel.PropertyChanged += (s, e) =>
        {
            if (e.PropertyName == nameof(viewModel.SelectedNode))
                eventRaised = true;
        };
        
        // Act
        viewModel.SelectedNode = node;
        
        // Assert
        Assert.IsTrue(eventRaised);
        Assert.AreEqual(node, viewModel.SelectedNode);
    }
    
    [TestMethod]
    public void AddFolderCommand_NoSelection_CannotExecute()
    {
        // Arrange
        var viewModel = new FileExplorerViewModel();
        
        // Act
        var canExecute = viewModel.AddFolderCommand.CanExecute(null);
        
        // Assert
        Assert.IsFalse(canExecute);
    }
    
    [TestMethod]
    public void AddFolderCommand_FolderSelected_CanExecute()
    {
        // Arrange
        var viewModel = new FileExplorerViewModel();
        var folder = new FileNode { Name = "Root", IsFolder = true };
        viewModel.FileNodes.Add(folder);
        viewModel.SelectedNode = folder;
        
        // Act
        var canExecute = viewModel.AddFolderCommand.CanExecute(null);
        
        // Assert
        Assert.IsTrue(canExecute);
    }
    
    [TestMethod]
    public void AddFolderCommand_Execute_AddsChildFolder()
    {
        // Arrange
        var viewModel = new FileExplorerViewModel();
        var folder = new FileNode { Name = "Root", IsFolder = true };
        viewModel.FileNodes.Add(folder);
        viewModel.SelectedNode = folder;
        
        var initialCount = folder.Children.Count;
        
        // Act
        viewModel.AddFolderCommand.Execute(null);
        
        // Assert
        Assert.AreEqual(initialCount + 1, folder.Children.Count);
        Assert.IsTrue(folder.Children.Last().IsFolder);
    }
    
    [TestMethod]
    public void DeleteCommand_Execute_RemovesNode()
    {
        // Arrange
        var viewModel = new FileExplorerViewModel();
        var root = new FileNode { Name = "Root", IsFolder = true };
        var child = new FileNode { Name = "Child", IsFolder = false };
        root.Children.Add(child);
        viewModel.FileNodes.Add(root);
        viewModel.SelectedNode = child;
        
        // Act
        viewModel.DeleteCommand.Execute(null);
        
        // Assert
        Assert.IsFalse(root.Children.Contains(child));
    }
}
```

## Best Practices

1. **Use INotifyPropertyChanged** for all bindable properties
2. **Use ObservableCollection** for collections
3. **Implement CanExecute** for commands
4. **Call RaiseCanExecuteChanged** when state changes
5. **Keep ViewModels testable** (avoid UI dependencies)
6. **Use async/await** for data loading
7. **Show loading indicators** during async operations
8. **Handle exceptions** in commands
9. **Use weak event patterns** to prevent memory leaks
10. **Separate concerns** (Model, ViewModel, View)

## Next Steps

- **Data Binding** - Complex hierarchical data scenarios
- **Commands** - Advanced command patterns
- **Testing** - Integration tests with TreeView
- **Performance** - Optimize for large datasets
