# Data Binding in WinUI TreeView

## Table of Contents
- [Overview](#overview)
- [Bound Mode vs Unbound Mode](#bound-mode-vs-unbound-mode)
- [Hierarchical Data Binding](#hierarchical-data-binding)
- [HierarchyPropertyDescriptors](#hierarchypropertydescriptors)
- [NotificationSubscriptionMode](#notificationsubscriptionmode)
- [NodePopulationMode](#nodepopulationmode)
- [ItemTemplate and ExpanderTemplate](#itemtemplate-and-expandertemplate)
- [Advanced Scenarios](#advanced-scenarios)
- [Troubleshooting](#troubleshooting)

## Overview

The TreeView can be populated using two approaches:
1. **Bound Mode** - Data binding to hierarchical data sources (recommended for dynamic data)
2. **Unbound Mode** - Manual TreeViewNode creation (simple static trees)

This guide focuses on bound mode for complex hierarchical data scenarios.

## Bound Mode vs Unbound Mode

### Bound Mode

**When to use:**
- Data comes from databases, APIs, or ViewModels
- Need automatic UI updates when data changes
- MVVM architecture
- Dynamic hierarchical structures
- Large datasets

**Advantages:**
- Automatic change tracking with INotifyPropertyChanged
- Clean separation of data and UI
- Easier testing and maintenance
- Supports lazy loading (load on demand)

**Example:**
```xml
<treeView:SfTreeView ItemsSource="{Binding Employees}"
                      ChildPropertyName="DirectReports" />
```

###Unbound Mode

**When to use:**
- Static, fixed tree structures
- Prototyping or simple scenarios
- No data models available

**Example:**
```xml
<treeView:SfTreeView.Nodes>
    <treeView:TreeViewNode Content="Root">
        <treeView:TreeViewNode.ChildNodes>
            <treeView:TreeViewNode Content="Child" />
        </treeView:TreeViewNode.ChildNodes>
    </treeView:TreeViewNode>
</treeView:SfTreeView.Nodes>
```

## Hierarchical Data Binding

### Step 1: Create Data Model

Implement `INotifyPropertyChanged` for property change notifications:

```csharp
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;

public class Employee : INotifyPropertyChanged
{
    private string _name;
    private string _title;
    private ObservableCollection<Employee> _directReports;
    
    public string Name
    {
        get => _name;
        set
        {
            _name = value;
            OnPropertyChanged();
        }
    }
    
    public string Title
    {
        get => _title;
        set
        {
            _title = value;
            OnPropertyChanged();
        }
    }
    
    public ObservableCollection<Employee> DirectReports
    {
        get => _directReports;
        set
        {
            _directReports = value;
            OnPropertyChanged();
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string name = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}
```

**Key points:**
- Use `ObservableCollection<T>` for child collections
- Implement `INotifyPropertyChanged` on all model classes
- Property name for children (DirectReports) is used in ChildPropertyName

### Step 2: Create ViewModel

```csharp
public class OrganizationViewModel
{
    public ObservableCollection<Employee> Employees { get; set; }
    
    public OrganizationViewModel()
    {
        Employees = new ObservableCollection<Employee>
        {
            new Employee
            {
                Name = "John Smith",
                Title = "CEO",
                DirectReports = new ObservableCollection<Employee>
                {
                    new Employee
                    {
                        Name = "Sarah Johnson",
                        Title = "CTO",
                        DirectReports = new ObservableCollection<Employee>
                        {
                            new Employee { Name = "Mike Brown", Title = "Dev Manager" },
                            new Employee { Name = "Lisa Davis", Title = "QA Manager" }
                        }
                    },
                    new Employee
                    {
                        Name = "Tom Wilson",
                        Title = "CFO",
                        DirectReports = new ObservableCollection<Employee>
                        {
                            new Employee { Name = "Anna Taylor", Title = "Accountant" }
                        }
                    }
                }
            }
        };
    }
}
```

### Step 3: Bind to XAML

```xml
<Page xmlns:treeView="using:Syncfusion.UI.Xaml.TreeView"
      xmlns:local="using:YourApp">
    
    <Page.DataContext>
        <local:OrganizationViewModel />
    </Page.DataContext>
    
    <treeView:SfTreeView ItemsSource="{Binding Employees}"
                          ChildPropertyName="DirectReports"
                          AutoExpandMode="RootNodes">
        <treeView:SfTreeView.ItemTemplate>
            <DataTemplate>
                <StackPanel>
                    <TextBlock Text="{Binding Name}" 
                               FontWeight="SemiBold" />
                    <TextBlock Text="{Binding Title}" 
                               FontSize="12" 
                               Opacity="0.7" />
                </StackPanel>
            </DataTemplate>
        </treeView:SfTreeView.ItemTemplate>
    </treeView:SfTreeView>
</Page>
```

**Key properties:**
- `ItemsSource="{Binding Employees}"` - Binds to root collection
- `ChildPropertyName="DirectReports"` - Property containing child items
- `ItemTemplate` - Defines how each node appears

## HierarchyPropertyDescriptors

Use when different levels have different types or property names for children.

### Scenario: Multi-Type Hierarchy

**Data Models:**
```csharp
public class Folder : INotifyPropertyChanged
{
    public string Name { get; set; }
    public ObservableCollection<File> Files { get; set; }  // Files property
    
    // INotifyPropertyChanged implementation...
}

public class File : INotifyPropertyChanged
{
    public string FileName { get; set; }
    public ObservableCollection<SubFile> SubFiles { get; set; }  // SubFiles property
    
    // INotifyPropertyChanged implementation...
}

public class SubFile : INotifyPropertyChanged
{
    public string Name { get; set; }
    
    // INotifyPropertyChanged implementation...
}
```

**XAML Configuration:**
```xml
<treeView:SfTreeView ItemsSource="{Binding Folders}">
    <treeView:SfTreeView.HierarchyPropertyDescriptors>
        <!-- Level 1: Folder → Files -->
        <treeView:HierarchyPropertyDescriptor ChildPropertyName="Files"
                                               TargetType="local:Folder" />
        
        <!-- Level 2: File → SubFiles -->
        <treeView:HierarchyPropertyDescriptor ChildPropertyName="SubFiles"
                                               TargetType="local:File" />
    </treeView:SfTreeView.HierarchyPropertyDescriptors>
    
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Name}" />
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

**When to use HierarchyPropertyDescriptors:**
- Different types at different levels
- Different child property names per level
- Complex domain models

**When NOT to use:**
- Same type throughout (use ChildPropertyName instead)
- Simple hierarchies

## NotificationSubscriptionMode

Controls how TreeView responds to data changes.

### Modes

| Mode | Description | When to Use |
|------|-------------|-------------|
| **None** (default) | No change tracking | Static data, no updates needed |
| **CollectionChanged** | Tracks collection changes | Add/remove nodes dynamically |
| **PropertyChange** | Tracks property changes | Property values change |

### Example: Dynamic Node Addition

```xml
<treeView:SfTreeView ItemsSource="{Binding Files}"
                      ChildPropertyName="SubFiles"
                      NotificationSubscriptionMode="CollectionChanged" />
```

```csharp
// In ViewModel or code-behind
public void AddNewFile()
{
    var newFile = new FileNode 
    { 
        Name = "NewDocument.docx",
        SubFiles = new ObservableCollection<FileNode>()
    };
    
    // TreeView automatically updates because NotificationSubscriptionMode=CollectionChanged
    Files.Add(newFile);
}

public void UpdateFileName(FileNode file, string newName)
{
    // Requires PropertyChanged mode for UI update
    file.Name = newName;  // Triggers INotifyPropertyChanged
}
```

### Performance Consideration

Use `CollectionChanged` only when needed:
```csharp
// Enable only for dynamic scenarios
NotificationSubscriptionMode = NotificationSubscriptionMode.CollectionChanged;

// Disable for static data to improve performance
NotificationSubscriptionMode = NotificationSubscriptionMode.None;
```

## NodePopulationMode

Controls when child nodes are created.

### OnDemand (Default - Recommended)

**When:** Child nodes created only when parent expands

**Advantages:**
- Faster initial load
- Lower memory usage
- Ideal for large hierarchies

**Usage:**
```xml
<treeView:SfTreeView NodePopulationMode="OnDemand" />
```

**Behavior:**
- Children loaded lazily on first expand
- Saves memory for collapsed branches
- Best for 1000+ total nodes

### Instant

**When:** All child nodes created immediately on load

**Advantages:**
- Immediate expand/collapse without delay
- All data validated upfront

**Usage:**
```xml
<treeView:SfTreeView NodePopulationMode="Instant" />
```

**Behavior:**
- Full tree created at startup
- Higher memory usage
- Best for <500 total nodes

### Comparison

```csharp
// Large hierarchy (10,000 nodes)
// OnDemand: Initial load ~100ms, expand ~10ms per node
// Instant: Initial load ~2000ms

// Small hierarchy (100 nodes)
// OnDemand: Initial load ~20ms, expand ~5ms per node
// Instant: Initial load ~50ms
```

## ItemTemplate and ExpanderTemplate

### ItemTemplate

Defines the visual representation of each node content.

**Simple Template:**
```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <TextBlock Text="{Binding Name}" />
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

**Complex Template with Icons:**
```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal" Spacing="8">
            <FontIcon Glyph="{Binding Icon}" FontSize="16" />
            <StackPanel>
                <TextBlock Text="{Binding Name}" FontWeight="SemiBold" />
                <TextBlock Text="{Binding Description}" 
                           FontSize="12" 
                           Opacity="0.7" />
            </StackPanel>
        </StackPanel>
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

### ExpanderTemplate

Customizes the expand/collapse indicator.

**Default behavior:** Triangle icon

**Custom expander:**
```xml
<treeView:SfTreeView.ExpanderTemplate>
    <DataTemplate>
        <Grid>
            <!-- Collapsed state -->
            <FontIcon x:Name="CollapsedIcon" 
                      Glyph="&#xE76C;" 
                      FontSize="12"
                      Visibility="{Binding IsExpanded, Converter={StaticResource InverseBoolToVisibility}}" />
            
            <!-- Expanded state -->
            <FontIcon x:Name="ExpandedIcon" 
                      Glyph="&#xE70D;" 
                      FontSize="12"
                      Visibility="{Binding IsExpanded, Converter={StaticResource BoolToVisibility}}" />
        </Grid>
    </DataTemplate>
</treeView:SfTreeView.ExpanderTemplate>
```

## Advanced Scenarios

### Scenario 1: Conditional Child Loading

Load different children based on node type:

```csharp
public class FileSystemNode : INotifyPropertyChanged
{
    public string Name { get; set; }
    public bool IsFolder { get; set; }
    public ObservableCollection<FileSystemNode> Children { get; set; }
    
    public FileSystemNode()
    {
        Children = new ObservableCollection<FileSystemNode>();
    }
    
    public void LoadChildren()
    {
        if (IsFolder && Children.Count == 0)
        {
            // Load folder contents
            var subItems = FileSystemService.GetChildren(this.Name);
            foreach (var item in subItems)
            {
                Children.Add(item);
            }
        }
    }
}
```

```xml
<treeView:SfTreeView NodeExpanding="OnNodeExpanding" />
```

```csharp
private void OnNodeExpanding(object sender, NodeExpandingEventArgs e)
{
    var node = e.Node.Content as FileSystemNode;
    node?.LoadChildren();
}
```

### Scenario 2: Filtering Hierarchical Data

Filter nodes while maintaining hierarchy:

```csharp
public class FilterableViewModel
{
    private string _searchText;
    
    public string SearchText
    {
        get => _searchText;
        set
        {
            _searchText = value;
            ApplyFilter();
        }
    }
    
    private void ApplyFilter()
    {
        if (string.IsNullOrWhiteSpace(SearchText))
        {
            // Show all
            FilteredItems = new ObservableCollection<Item>(AllItems);
        }
        else
        {
            // Filter recursively
            FilteredItems = new ObservableCollection<Item>(
                AllItems.Where(item => MatchesFilter(item, SearchText))
            );
        }
    }
    
    private bool MatchesFilter(Item item, string filter)
    {
        if (item.Name.Contains(filter, StringComparison.OrdinalIgnoreCase))
            return true;
        
        // Check children recursively
        return item.Children?.Any(child => MatchesFilter(child, filter)) ?? false;
    }
}
```

### Scenario 3: Async Data Loading

Load data asynchronously:

```csharp
public class AsyncViewModel : INotifyPropertyChanged
{
    private ObservableCollection<Employee> _employees;
    private bool _isLoading;
    
    public ObservableCollection<Employee> Employees
    {
        get => _employees;
        set
        {
            _employees = value;
            OnPropertyChanged();
        }
    }
    
    public bool IsLoading
    {
        get => _isLoading;
        set
        {
            _isLoading = value;
            OnPropertyChanged();
        }
    }
    
    public async Task LoadDataAsync()
    {
        IsLoading = true;
        
        try
        {
            var data = await EmployeeService.GetEmployeesAsync();
            Employees = new ObservableCollection<Employee>(data);
        }
        finally
        {
            IsLoading = false;
        }
    }
}
```

```xml
<Grid>
    <ProgressRing IsActive="{Binding IsLoading}" />
    <treeView:SfTreeView ItemsSource="{Binding Employees}"
                          Visibility="{Binding IsLoading, Converter={StaticResource InverseBoolToVisibility}}" />
</Grid>
```

## Troubleshooting

### Nodes Not Showing Children

**Problem:** Child nodes don't appear when expanding

**Solutions:**
1. Verify `ChildPropertyName` matches property name exactly (case-sensitive)
   ```csharp
   // Model has "SubItems" property
   ChildPropertyName="SubItems"  // ✅ Correct
   ChildPropertyName="subitems"  // ❌ Wrong case
   ```

2. Ensure child collection is initialized (not null)
   ```csharp
   public ObservableCollection<Item> Children { get; set; } 
       = new ObservableCollection<Item>();  // ✅ Initialized
   ```

3. Check HierarchyPropertyDescriptors TargetType
   ```xml
   <treeView:HierarchyPropertyDescriptor 
       TargetType="local:Folder"  // Must match namespace
       ChildPropertyName="Files" />
   ```

### UI Not Updating on Data Changes

**Problem:** Adding/removing items doesn't update TreeView

**Solutions:**
1. Set NotificationSubscriptionMode
   ```xml
   <treeView:SfTreeView NotificationSubscriptionMode="CollectionChanged" />
   ```

2. Use ObservableCollection (not List)
   ```csharp
   // ✅ Use this
   public ObservableCollection<Item> Items { get; set; }
   
   // ❌ Not this
   public List<Item> Items { get; set; }
   ```

3. Implement INotifyPropertyChanged
   ```csharp
   public class Item : INotifyPropertyChanged
   {
       private string _name;
       public string Name
       {
           get => _name;
           set { _name = value; OnPropertyChanged(); }
       }
       
       // Must implement event
       public event PropertyChangedEventHandler PropertyChanged;
   }
   ```

### Performance Issues with Large Hierarchies

**Problem:** Slow loading or laggy scrolling

**Solutions:**
1. Use OnDemand mode
   ```xml
   <treeView:SfTreeView NodePopulationMode="OnDemand" />
   ```

2. Simplify ItemTemplate
   ```xml
   <!-- ✅ Simple -->
   <DataTemplate>
       <TextBlock Text="{Binding Name}" />
   </DataTemplate>
   
   <!-- ❌ Too complex -->
   <DataTemplate>
       <Grid>
           <!-- Many nested controls, heavy bindings -->
       </Grid>
   </DataTemplate>
   ```

3. Disable unnecessary notifications
   ```xml
   <treeView:SfTreeView NotificationSubscriptionMode="None" />
   ```

### Memory Leaks

**Problem:** Memory usage grows over time

**Solutions:**
1. Unsubscribe from events
   ```csharp
   treeView.SelectionChanged -= OnSelectionChanged;
   ```

2. Clear collections when done
   ```csharp
   Items.Clear();
   Items = null;
   ```

3. Use weak event patterns for long-lived objects

## Best Practices

1. **Always use ObservableCollection** for dynamic collections
2. **Implement INotifyPropertyChanged** on all data models
3. **Use OnDemand mode** for hierarchies with >500 nodes
4. **Initialize child collections** to avoid null reference errors
5. **Use HierarchyPropertyDescriptors** only when necessary
6. **Set NotificationSubscriptionMode** based on update needs
7. **Keep ItemTemplate simple** for better performance
8. **Use x:Bind instead of Binding** for compiled binding (WinUI 3)

## Next Steps

- **Selection** - Learn selection modes and programmatic selection
- **Editing** - Enable inline editing of nodes
- **Drag-Drop & CRUD** - Manipulate nodes programmatically
- **Appearance** - Customize visual styling and templates
