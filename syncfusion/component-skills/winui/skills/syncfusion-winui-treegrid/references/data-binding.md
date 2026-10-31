# Data Binding in WinUI TreeGrid

## Table of Contents
- [Overview](#overview)
- [Self-Relational Data Binding](#self-relational-data-binding)
- [Nested Collection Binding](#nested-collection-binding)
- [AutoExpandMode](#autoexpandmode)
- [Expanding and Collapsing Nodes](#expanding-and-collapsing-nodes)
- [ExpandStateMappingName](#expandstatemappingname)
- [LiveNodeUpdateMode](#livenodeupdatemode)
- [View and Events](#view-and-events)

## Overview

SfTreeGrid displays hierarchical data in a tree structure with columns. Data binding is achieved by assigning a data source to the `ItemsSource` property using one of these approaches:

1. **Self-relational binding** - Data objects reference each other via ID/ParentID
2. **Nested collection binding** - Data objects contain child collections
3. **On-demand loading** - Load child nodes dynamically (see node-features.md)

The TreeGrid automatically refreshes when the data source implements `INotifyCollectionChanged` (e.g., `ObservableCollection<T>`).

## Self-Relational Data Binding

Use self-relational binding when your data has parent-child relationships through ID properties.

### Data Model

Create a class with ID and parent reference properties:

```csharp
public class EmployeeInfo
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Title { get; set; }
    public double Salary { get; set; }
    public int ReportsTo { get; set; }  // Parent ID reference
}
```

**For auto-refresh:** Implement `INotifyPropertyChanged`:

```csharp
public class EmployeeInfo : INotifyPropertyChanged
{
    private string _firstName;
    
    public string FirstName
    {
        get => _firstName;
        set
        {
            _firstName = value;
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

### ViewModel

Create a ViewModel with an `ObservableCollection`:

```csharp
public class ViewModel
{
    public ObservableCollection<EmployeeInfo> Employees { get; set; }
    
    public ViewModel()
    {
        Employees = new ObservableCollection<EmployeeInfo>
        {
            // Root nodes (ReportsTo = -1)
            new EmployeeInfo { ID = 1, FirstName = "Fernando", LastName = "Joseph", 
                              Title = "CEO", Salary = 2000000, ReportsTo = -1 },
            new EmployeeInfo { ID = 2, FirstName = "John", LastName = "Adams", 
                              Title = "VP", Salary = 1500000, ReportsTo = -1 },
            
            // Child nodes (ReportsTo points to parent ID)
            new EmployeeInfo { ID = 10, FirstName = "Andrew", LastName = "Fuller", 
                              Title = "Manager", Salary = 1200000, ReportsTo = 1 },
            new EmployeeInfo { ID = 11, FirstName = "Janet", LastName = "Leverling", 
                              Title = "Developer", Salary = 900000, ReportsTo = 10 }
        };
    }
}
```

### XAML Binding

```xaml
<Window xmlns:treeGrid="using:Syncfusion.UI.Xaml.TreeGrid">
    <Window.DataContext>
        <local:ViewModel/>
    </Window.DataContext>
    
    <Grid>
        <treeGrid:SfTreeGrid x:Name="treeGrid"
                            ItemsSource="{Binding Employees}"
                            ParentPropertyName="ID"
                            ChildPropertyName="ReportsTo"
                            SelfRelationRootValue="-1"
                            AutoExpandMode="RootNodesExpanded" />
    </Grid>
</Window>
```

### C# Binding

```csharp
SfTreeGrid sfTreeGrid = new SfTreeGrid();
ViewModel viewModel = new ViewModel();

sfTreeGrid.ParentPropertyName = "ID";
sfTreeGrid.ChildPropertyName = "ReportsTo";
sfTreeGrid.SelfRelationRootValue = -1;
sfTreeGrid.ItemsSource = viewModel.Employees;
```

### Key Properties for Self-Relational Binding

- **ParentPropertyName** - Property containing unique identifier (e.g., "ID")
- **ChildPropertyName** - Property referencing parent (e.g., "ReportsTo")
- **SelfRelationRootValue** - Value indicating root nodes (default: null, common: -1 or 0)

## Nested Collection Binding

Use nested collections when each data object contains a property holding its children.

### Data Model

Create a class with a children collection property:

```csharp
public class PersonInfo
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool Availability { get; set; }
    public double Salary { get; set; }
    public ObservableCollection<PersonInfo> Children { get; set; }
}
```

### ViewModel

```csharp
public class ViewModel
{
    public ObservableCollection<PersonInfo> PersonDetails { get; set; }
    
    public ViewModel()
    {
        PersonDetails = new ObservableCollection<PersonInfo>();
        
        // Create child collections
        var childCollection1 = new ObservableCollection<PersonInfo>
        {
            new PersonInfo { FirstName = "Andrew", LastName = "Fuller", 
                           Availability = true, Salary = 1200000 },
            new PersonInfo { FirstName = "Theodore", LastName = "Hoover", 
                           Availability = true, Salary = 1200000 }
        };
        
        var childCollection2 = new ObservableCollection<PersonInfo>
        {
            new PersonInfo { FirstName = "Ronald", LastName = "Fillmore", 
                           Availability = false, Salary = 230000 },
            new PersonInfo { FirstName = "Steven", LastName = "Buchanan", 
                           Availability = true, Salary = 340000 }
        };
        
        // Root nodes with children
        PersonDetails.Add(new PersonInfo 
        { 
            FirstName = "Obama", LastName = "Bosh", 
            Availability = false, Salary = 2000000, 
            Children = childCollection1 
        });
        PersonDetails.Add(new PersonInfo 
        { 
            FirstName = "John", LastName = "Adams", 
            Availability = true, Salary = 2000000, 
            Children = childCollection2 
        });
    }
}
```

### XAML Binding

```xaml
<treeGrid:SfTreeGrid x:Name="treeGrid"
                    ItemsSource="{Binding PersonDetails}"
                    ChildPropertyName="Children" />
```

### C# Binding

```csharp
sfTreeGrid.ChildPropertyName = "Children";
sfTreeGrid.ItemsSource = viewModel.PersonDetails;
```

### Key Property for Nested Collection

- **ChildPropertyName** - Property name containing child collection (e.g., "Children")
- **ParentPropertyName** - NOT used for nested collections

## AutoExpandMode

Control which nodes are expanded when the TreeGrid loads.

```csharp
sfTreeGrid.AutoExpandMode = AutoExpandMode.RootNodesExpanded;
```

| Mode | Description |
|------|-------------|
| `None` | All nodes collapsed (only root nodes visible) |
| `RootNodesExpanded` | Only root nodes expanded |
| `AllNodesExpanded` | All nodes expanded, including nested levels |

### XAML Example

```xaml
<treeGrid:SfTreeGrid AutoExpandMode="AllNodesExpanded"
                    ItemsSource="{Binding Employees}" />
```

## Expanding and Collapsing Nodes

### Expand Methods

| Method | Description |
|--------|-------------|
| `ExpandAllNodes()` | Expand all nodes including inner leaf nodes |
| `ExpandAllNodes(int level)` | Expand nodes up to specified level |
| `ExpandAllNodes(TreeNode node)` | Expand specific node and all its children |
| `ExpandNode(int rowIndex)` | Expand node at specific row index |
| `ExpandNode(TreeNode node)` | Expand specific node only |

### Collapse Methods

| Method | Description |
|--------|-------------|
| `CollapseAllNodes()` | Collapse all nodes |
| `CollapseAllNodes(TreeNode node)` | Collapse specific node and all its children |
| `CollapseNode(int rowIndex)` | Collapse node at specific row index |
| `CollapseNode(TreeNode node)` | Collapse specific node only |

### Examples

```csharp
// Expand all nodes
sfTreeGrid.ExpandAllNodes();

// Expand nodes up to level 2
sfTreeGrid.ExpandAllNodes(2);

// Expand specific node by index
sfTreeGrid.ExpandNode(2);

// Expand specific node object
var node = sfTreeGrid.View.Nodes[0];
sfTreeGrid.ExpandNode(node);

// Expand node by business object
var data = viewModel.Employees[0];
var node = sfTreeGrid.View.Nodes.GetNode(data);
sfTreeGrid.ExpandNode(node);

// Collapse all nodes
sfTreeGrid.CollapseAllNodes();

// Collapse specific node
sfTreeGrid.CollapseNode(node);
```

### NodeExpanding Event

Cancel node expansion before it happens:

```csharp
sfTreeGrid.NodeExpanding += (sender, e) =>
{
    // Cancel all expansions
    e.Cancel = true;
    
    // Or cancel specific node
    if ((e.Node.Item as Employee).ID == 5)
        e.Cancel = true;
};
```

### NodeExpanded Event

Get notification after node expands:

```csharp
sfTreeGrid.NodeExpanded += (sender, e) =>
{
    var expandedNode = e.Node;
    var childNodes = e.Node.ChildNodes;
    // Perform actions after expansion
};
```

### NodeCollapsing Event

Cancel node collapse before it happens:

```csharp
sfTreeGrid.NodeCollapsing += (sender, e) =>
{
    // Prevent specific node from collapsing
    if ((e.Node.Item as Employee).ID == 1)
        e.Cancel = true;
};
```

### NodeCollapsed Event

Get notification after node collapses:

```csharp
sfTreeGrid.NodeCollapsed += (sender, e) =>
{
    var collapsedNode = e.Node;
    // Perform actions after collapse
};
```

## ExpandStateMappingName

Bind node expansion state to a boolean property in your data model:

```csharp
public class EmployeeInfo
{
    public bool IsExpanded { get; set; }
    // Other properties...
}
```

```xaml
<treeGrid:SfTreeGrid ExpandStateMappingName="IsExpanded"
                    ItemsSource="{Binding Employees}" />
```

When `IsExpanded` changes in the data object, the TreeGrid automatically expands/collapses the corresponding node.

## LiveNodeUpdateMode

Control how TreeGrid responds to data changes at runtime:

```csharp
sfTreeGrid.LiveNodeUpdateMode = LiveNodeUpdateMode.AllowDataShaping;
```

| Mode | Description |
|------|-------------|
| `Default` | No automatic refresh on property changes |
| `AllowDataShaping` | Refreshes sorting when data is added, removed, or property changes |

**When to use `AllowDataShaping`:**
- Editing is enabled and you want sorting to refresh automatically
- Data is dynamically added/removed and you want immediate updates
- Property changes should trigger re-sorting

**Limitations:**
- Not supported with complex properties
- Not supported with indexer properties
- Not supported with dynamic data objects

## View and Events

The `View` property (type `TreeGridView`) maintains and manipulates nodes.

### View Types

- **TreeGridSelfRelationalView** - For self-relational binding
- **TreeGridNestedView** - For nested collection binding
- **TreeGridUnboundView** - For on-demand loading

### View Events

**RecordPropertyChanged**
Raised when a data model property changes (if model implements `INotifyPropertyChanged`):

```csharp
sfTreeGrid.View.RecordPropertyChanged += (sender, e) =>
{
    var propertyName = e.PropertyName;
    // Handle property change
};
```

**NodeCollectionChanged**
Raised when nodes collection changes:

```csharp
sfTreeGrid.View.NodeCollectionChanged += (sender, e) =>
{
    var action = e.Action;  // Add, Remove, Move, Replace, Reset
    var newItems = e.NewItems;
    var oldItems = e.OldItems;
};
```

**SourceCollectionChanged**
Raised when source collection changes:

```csharp
sfTreeGrid.View.SourceCollectionChanged += (sender, e) =>
{
    var action = e.Action;
    // Handle source collection change
};
```

### View Methods

**DeferRefresh**
Batch multiple operations and update once:

```csharp
using (sfTreeGrid.View.DeferRefresh(TreeViewRefreshMode.NodeRefresh))
{
    sfTreeGrid.SortColumnDescriptions.Add(new SortColumnDescription 
    { 
        ColumnName = "FirstName", 
        SortDirection = ListSortDirection.Descending 
    });
    sfTreeGrid.SortColumnDescriptions.Add(new SortColumnDescription 
    { 
        ColumnName = "Salary", 
        SortDirection = ListSortDirection.Ascending 
    });
}
```

**BeginInit/EndInit**
Suspend updates between calls:

```csharp
sfTreeGrid.View.BeginInit(TreeViewRefreshMode.DeferRefresh);
// Perform multiple operations
sfTreeGrid.SortColumnDescriptions.Add(...);
sfTreeGrid.SortColumnDescriptions.Add(...);
sfTreeGrid.View.EndInit();
```

## Advanced Binding Scenarios

### Binding with IEnumerable

Any collection implementing `IEnumerable` is supported. Sorting is supported for `IEnumerable` collections.

### Binding Complex Properties

Bind to nested properties using dot notation:

```csharp
public class Employee
{
    public Address Address { get; set; }
}

public class Address
{
    public string City { get; set; }
    public string Country { get; set; }
}
```

```xaml
<treeGrid:TreeGridTextColumn MappingName="Address.City" />
<treeGrid:TreeGridTextColumn MappingName="Address.Country" />
```

**Limitation:** `LiveNodeUpdateMode.AllowDataShaping` not supported.

### Binding Indexer Properties

Bind to indexer properties:

```csharp
public class Employee
{
    public List<Shipper> ShippersInfo { get; set; }
}
```

```xaml
<treeGrid:TreeGridTextColumn MappingName="ShippersInfo[0].ShipperID" />
```

**Limitation:** `LiveNodeUpdateMode.AllowDataShaping` not supported.

### ItemsSourceChanged Event

Get notified when ItemsSource changes:

```csharp
sfTreeGrid.ItemsSourceChanged += (sender, e) =>
{
    var oldSource = e.OldItemsSource;
    var newSource = e.NewItemsSource;
    // Handle data source change
};
```

## Troubleshooting

**Tree structure not forming:**
- Verify `ParentPropertyName` and `ChildPropertyName` match your property names exactly (case-sensitive)
- Check `SelfRelationRootValue` matches your root indicator value
- Ensure data relationships are correct

**UI not refreshing on data changes:**
- Implement `INotifyPropertyChanged` in data models
- Use `ObservableCollection<T>` instead of `List<T>`
- Check `LiveNodeUpdateMode` is set appropriately

**Performance issues:**
- Use on-demand loading for large datasets (see node-features.md)
- Consider data virtualization
- Avoid `AllNodesExpanded` with very deep trees
