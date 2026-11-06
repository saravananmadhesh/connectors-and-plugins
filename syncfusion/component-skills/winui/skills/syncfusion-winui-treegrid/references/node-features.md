# Node Features in WinUI TreeGrid

## Table of Contents
- [Node Checkboxes](#node-checkboxes)
- [Load on Demand](#load-on-demand)

## Node Checkboxes

Add checkboxes to select tree nodes with recursive checking support.

### Enable Node Checkboxes

```xaml
<treeGrid:SfTreeGrid ShowCheckBox="True" 
                    ItemsSource="{Binding Employees}" />
```

```csharp
sfTreeGrid.ShowCheckBox = true;
```

### Recursive Checking

Automatically check/uncheck parent and child nodes:

```csharp
sfTreeGrid.EnableRecursiveChecking = true;
```

**Behavior with recursive checking:**
- Checking a parent checks all children
- Unchecking a parent unchecks all children
- Partially checked parent shows indeterminate state

### Recursive Checking Modes

```csharp
sfTreeGrid.RecursiveCheckingMode = RecursiveCheckingMode.Default;
```

| Mode | Description |
|------|-------------|
| **Default** | Standard recursive behavior |
| **OnlyParent** | Only parent affects children |
| **OnlyChild** | Only children affect parent |

### NodeCheckState Events

**NodeCheckStateChanged** - After checkbox state changes:

```csharp
sfTreeGrid.NodeCheckStateChanged += (s, e) =>
{
    var node = e.Node;
    var employee = node?.Item as Employee;

    if (employee == null) return;

    // Get check state from node itself
    var isChecked = node.IsChecked;

    Log($"Checkbox for {employee.FirstName} changed to {isChecked}");

                // Update status label
    var checkedCount = GetCheckedNodesCount();
    StatusLabel.Text = $"{checkedCount} node(s) selected";
};

```

### CheckBox States

| State | Description |
|-------|-------------|
| **Unchecked** | Not selected |
| **Checked** | Selected |
| **Intermediate** | Some children checked (with recursive checking) |

### Get Checked Nodes

```csharp
private List<Employee> GetCheckedEmployees()
{
    var checkedEmployees = new List<Employee>();
    
    foreach (var node in sfTreeGrid.View.Nodes)
    {
        GetCheckedNodesRecursive(node, checkedEmployees);
    }
    
    return checkedEmployees;
}

private void GetCheckedNodesRecursive(TreeNode node, List<Employee> result)
{
    if (node.IsChecked == true)
    {
        result.Add(node.Item as Employee);
    }
    
    if (node.HasChildNodes)
    {
        foreach (var childNode in node.ChildNodes)
        {
            GetCheckedNodesRecursive(childNode, result);
        }
    }
}
```

### Set Node Checked State Programmatically

```csharp
// Check specific node
var node = sfTreeGrid.View.Nodes[0];
node.IsChecked = true;

// Check all nodes
foreach (var node in sfTreeGrid.View.Nodes)
{
    SetNodeCheckedRecursive(node, true);
}

private void SetNodeCheckedRecursive(TreeNode node, bool isChecked)
{
    node.IsChecked = isChecked;
    
    if (node.HasChildNodes)
    {
        foreach (var childNode in node.ChildNodes)
        {
            SetNodeCheckedRecursive(childNode, isChecked);
        }
    }
}
```

### CheckedItems Binding

Bind checked state to data model:

```csharp
public class Employee : INotifyPropertyChanged
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
    
    // Other properties...
}
```

```xaml
<treeGrid:SfTreeGrid ShowCheckBox="True"
                    CheckBoxMappingName="IsSelected" />
```

## Load on Demand

Lazy load child nodes for better performance with large datasets.

### Enable Load on Demand

Use `RequestTreeItems` event or `LoadOnDemandCommand`.

### Using RequestTreeItems Event

```csharp
sfTreeGrid.RequestTreeItems += (s, e) =>
{
    // Get parent data
    var parent = e.ParentItem as Employee;

    if (parent == null) return;

    // Load children from data source
    var children = LoadChildEmployees(parent.ID);

    // Assign children
    e.ChildItems = children;
};

private ObservableCollection<Employee> LoadChildEmployees(int parentID)
{
    // Simulate loading from database
    return new ObservableCollection<Employee>
    {
        new Employee { ID = 100, FirstName = "Child1", ReportsTo = parentID },
        new Employee { ID = 101, FirstName = "Child2", ReportsTo = parentID }
    };
}
```

### Using LoadOnDemandCommand

```csharp
public class ViewModel
{
    public ICommand LoadChildItemsCommand { get; set; }
    
    public ViewModel()
    {
        LoadChildItemsCommand = new RelayCommand<object>(LoadChildItems);
    }
    
    private void LoadChildItems(object parameter)
    {
        var args = parameter as LoadOnDemandEventArgs;
        if (args == null) return;
        
        if (!args.HasChildNodes)
        {
            var parent = args.ParentItem as Employee;
            var children = LoadChildEmployees(parent.ID);
            args.ChildItems = children;
        }
    }
    
    private ObservableCollection<Employee> LoadChildEmployees(int parentID)
    {
        // Load from database
        return database.GetEmployeesByManager(parentID);
    }
}
```

```xaml
<treeGrid:SfTreeGrid LoadOnDemandCommand="{Binding LoadChildItemsCommand}" 
                    ItemsSource="{Binding Employees}" />
```

### HasChildNodes Property

Indicate which nodes have children to show expand indicator:

```csharp
public class Employee
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public bool HasChildNodes { get; set; }  // TreeGrid checks this
}

// Set HasChildNodes for nodes with children
var manager = new Employee 
{ 
    ID = 1, 
    FirstName = "John", 
    HasChildNodes = true  // Shows expand indicator
};
```

### Async Loading

Load children asynchronously:

```csharp
sfTreeGrid.RequestTreeItems += async (s, e) =>
{
    if (e.ChildItems != null) return;

    var parent = e.ParentItem as Employee;
    if (parent == null) return;

    ShowLoadingIndicator(true);

    try
    {
        e.ChildItems = await LoadChildEmployeesAsync(parent.ID);
    }
    finally
    {
        ShowLoadingIndicator(false);
    }
};

private async Task<ObservableCollection<Employee>> LoadChildEmployeesAsync(int parentID)
{
    await Task.Delay(500);  // Simulate network delay
    return await _employeeService.GetEmployeesByManagerAsync(parentID);
}
```

### Load on Demand with Self-Relational Data

```csharp
sfTreeGrid.ParentPropertyName = "ID";
sfTreeGrid.ChildPropertyName = "ReportsTo";
sfTreeGrid.SelfRelationRootValue = -1;

sfTreeGrid.RequestTreeItems += (sender, e) =>
{
    if (e.ParentItem == null)
    {
        // Load root nodes
        e.ChildItems = LoadRootEmployees();
    }
    else
    {
        // Load child nodes
        var parent = e.ParentItem as Employee;
        e.ChildItems = LoadChildEmployees(parent.ID);
    }
};
```

### Load on Demand with Nested Collections

```csharp
sfTreeGrid.ChildPropertyName = "Children";

sfTreeGrid.RequestTreeItems += (sender, e) =>
{
    var parent = e.ParentItem as Employee;
    
    if (parent != null && parent.Children == null)
    {
        // Load children on-demand
        parent.Children = LoadChildEmployees(parent.ID);
        e.ChildItems = parent.Children;
    }
};
```

## Common Patterns

### Bulk Check/Uncheck Operations

```csharp
private void CheckAllNodes()
{
    foreach (var node in sfTreeGrid.View.Nodes)
    {
        node.IsChecked = true;
    }
}

private void UncheckAllNodes()
{
    foreach (var node in sfTreeGrid.View.Nodes)
    {
        node.IsChecked = false;
    }
}

private void InvertSelection()
{
    foreach (var node in sfTreeGrid.View.Nodes)
    {
        InvertNodeCheckedRecursive(node);
    }
}

private void InvertNodeCheckedRecursive(TreeNode node)
{
    node.IsChecked = !node.IsChecked;
    
    if (node.HasChildNodes)
    {
        foreach (var child in node.ChildNodes)
        {
            InvertNodeCheckedRecursive(child);
        }
    }
}
```

### Export Checked Nodes

```csharp
private void ExportCheckedNodes()
{
    var checkedEmployees = GetCheckedEmployees();
    
    if (checkedEmployees.Count == 0)
    {
        ShowMessage("No nodes selected");
        return;
    }
    
    // Export to Excel, CSV, etc.
    ExportToExcel(checkedEmployees);
    ShowMessage($"Exported {checkedEmployees.Count} employees");
}
```

### Load on Demand with Caching

```csharp
private Dictionary<int, ObservableCollection<Employee>> _childrenCache = 
    new Dictionary<int, ObservableCollection<Employee>>();

sfTreeGrid.RequestTreeItems += (sender, e) =>
{
    if (!e.HasChildNodes)
    {
        var parent = e.ParentItem as Employee;
        
        // Check cache first
        if (_childrenCache.ContainsKey(parent.ID))
        {
            e.ChildItems = _childrenCache[parent.ID];
        }
        else
        {
            // Load and cache
            var children = LoadChildEmployees(parent.ID);
            _childrenCache[parent.ID] = children;
            e.ChildItems = children;
        }
    }
};
```

### Progressive Loading Indicator

```xaml
<Grid>
    <treeGrid:SfTreeGrid x:Name="sfTreeGrid" />
    <ProgressRing x:Name="LoadingRing" 
                  IsActive="False"
                  HorizontalAlignment="Center"
                  VerticalAlignment="Center" />
</Grid>
```

```csharp
sfTreeGrid.RequestTreeItems += async (sender, e) =>
{
    LoadingRing.IsActive = true;
    
    try
    {
        var parent = e.ParentItem as Employee;
        var children = await LoadChildEmployeesAsync(parent?.ID ?? -1);
        e.ChildItems = children;
    }
    finally
    {
        LoadingRing.IsActive = false;
    }
};
```

### Conditional Checkbox Visibility

```csharp
sfTreeGrid.ShowCheckBox = true;

// Hide checkboxes for leaf nodes
sfTreeGrid.NodeCheckStateChanging += (sender, e) =>
{
    var employee = e.Node.Item as Employee;
    
    // Only allow checking managers
    if (employee.Title != "Manager")
    {
        e.Cancel = true;
    }
};
```

## Troubleshooting

**Checkboxes not appearing:**
- Ensure `ShowCheckBox = True`
- Check if checkbox column is visible
- Verify TreeGrid has data

**Recursive checking not working:**
- Set `EnableRecursiveChecking = True`
- Check `RecursiveCheckingMode` setting
- Ensure parent-child relationships are correct

**Load on demand not triggering:**
- Set `HasChildNodes = True` on parent nodes
- Subscribe to `RequestTreeItems` event or set `LoadOnDemandCommand`
- Expand nodes to trigger loading

**Children not loading:**
- Check `e.ChildItems` is assigned correctly
- Verify data is returned from load method
- Ensure child data structure matches binding mode
