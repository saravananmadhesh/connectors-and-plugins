# Expand and Collapse in WinUI TreeView

Guide for controlling node expansion and collapse behavior in TreeView.

## Overview

Expansion and collapse allow users to navigate hierarchical data by showing/hiding child nodes. TreeView provides both interactive (user-driven) and programmatic expand/collapse control.

## Expand Action Trigger

Control what user interactions trigger expand/collapse:

```xml
<!-- Expand only on expander icon click (default) -->
<treeView:SfTreeView ExpandActionTrigger="Expander" />

<!-- Expand on entire node click -->
<treeView:SfTreeView ExpandActionTrigger="Node" />
```

```csharp
// Via code
treeView.ExpandActionTrigger = ExpandActionTrigger.Node;
```

| Mode | Behavior | Use Case |
|------|----------|----------|
| **Expander** | Click triangle icon only | Precise control, avoid accidental expansion |
| **Node** | Click anywhere on node | Faster navigation, mobile-friendly |

## AutoExpandMode

Define initial expansion state when loading TreeView:

```xml
<!-- All collapsed (default) -->
<treeView:SfTreeView AutoExpandMode="None" />

<!-- Expand root nodes only -->
<treeView:SfTreeView AutoExpandMode="RootNodes" />

<!-- Expand all nodes -->
<treeView:SfTreeView AutoExpandMode="AllNodes" />
```

| Mode | Description | When to Use |
|------|-------------|-------------|
| **None** | All collapsed | Large trees, let users control |
| **RootNodes** | First level expanded | Show main categories |
| **AllNodes** | Fully expanded | Small trees (<100 nodes) |

**Example:**
```csharp
// Organization chart - show departments
treeView.AutoExpandMode = AutoExpandMode.RootNodes;

// Settings panel - show all options
treeView.AutoExpandMode = AutoExpandMode.AllNodes;
```

## Programmatic Expansion

### Expand Specific Node

```csharp
// Get node by data object
var node = treeView.GetNode(employee);

// Expand the node
treeView.ExpandNode(node);

// Collapse the node
treeView.CollapseNode(node);
```

### Expand All / Collapse All

```csharp
// Expand entire tree
treeView.ExpandAll();

// Collapse entire tree
treeView.CollapseAll();
```

### Toggle Node State

```csharp
var node = treeView.GetNode(item);

if (node.IsExpanded)
{
    treeView.CollapseNode(node);
}
else
{
    treeView.ExpandNode(node);
}
```

### Expand to Specific Level

```csharp
// Expand all nodes up to level 2
public void ExpandToLevel(int level)
{
    foreach (var node in treeView.Nodes)
    {
        ExpandNodeToLevel(node, level, 1);
    }
}

private void ExpandNodeToLevel(TreeViewNode node, int targetLevel, int currentLevel)
{
    if (currentLevel < targetLevel)
    {
        treeView.ExpandNode(node);
        
        foreach (var child in node.ChildNodes)
        {
            ExpandNodeToLevel(child, targetLevel, currentLevel + 1);
        }
    }
}
```

## Expansion State Binding

Bind expansion state to your data model:

```csharp
public class FileNode : INotifyPropertyChanged
{
    private bool _isExpanded;
    
    public bool IsExpanded
    {
        get => _isExpanded;
        set
        {
            _isExpanded = value;
            OnPropertyChanged();
        }
    }
    
    public string Name { get; set; }
    public ObservableCollection<FileNode> Children { get; set; }
}
```

```xml
<treeView:SfTreeView ItemsSource="{Binding Files}">
    <treeView:SfTreeView.HierarchyPropertyDescriptors>
        <treeView:HierarchyPropertyDescriptor 
            ChildPropertyName="Children"
            IsExpandedPropertyName="IsExpanded"
            TargetType="local:FileNode" />
    </treeView:SfTreeView.HierarchyPropertyDescriptors>
</treeView:SfTreeView>
```

**Benefits:**
- Two-way sync between UI and data
- Persist expansion state
- Set initial state before TreeView loads

## Expansion Events

### NodeExpanding Event

Fires **before** node expands. Can be canceled.

```csharp
treeView.NodeExpanding += OnNodeExpanding;

private void OnNodeExpanding(object sender, NodeExpandingEventArgs e)
{
    var node = e.Node;
    var item = node.Content as FileNode;
    
    // Load data on demand
    if (item.Children.Count == 0)
    {
        LoadChildren(item);
    }
    
    // Or prevent expansion
    if (item.IsRestricted)
    {
        e.Cancel = true;
    }
}
```

### NodeExpanded Event

Fires **after** node expands. Cannot be canceled.

```csharp
treeView.NodeExpanded += OnNodeExpanded;

private void OnNodeExpanded(object sender, NodeExpandedEventArgs e)
{
    var node = e.Node;
    var item = node.Content as FileNode;
    
    Debug.WriteLine($"Expanded: {item.Name}");
    
    // Scroll to show children
    if (node.ChildNodes.Count > 0)
    {
        treeView.BringIntoView(node.ChildNodes[0]);
    }
}
```

### NodeCollapsing Event

Fires **before** node collapses. Can be canceled.

```csharp
treeView.NodeCollapsing += OnNodeCollapsing;

private void OnNodeCollapsing(object sender, NodeCollapsingEventArgs e)
{
    var node = e.Node;
    
    // Prevent collapsing root nodes
    if (node.Level == 0)
    {
        e.Cancel = true;
    }
}
```

### NodeCollapsed Event

Fires **after** node collapses.

```csharp
treeView.NodeCollapsed += OnNodeCollapsed;

private void OnNodeCollapsed(object sender, NodeCollapsedEventArgs e)
{
    var node = e.Node;
    Debug.WriteLine($"Collapsed: {node.Content}");
}
```

## Common Scenarios

### Scenario 1: Load Children on Demand

```csharp
treeView.NodeExpanding += OnNodeExpanding;

private async void OnNodeExpanding(object sender, NodeExpandingEventArgs e)
{
    var node = e.Node;
    var folder = node.Content as FolderNode;
    
    // Only load if not already loaded
    if (!folder.IsLoaded)
    {
        folder.IsLoading = true;
        
        try
        {
            var children = await LoadChildrenAsync(folder.Id);
            foreach (var child in children)
            {
                folder.Children.Add(child);
            }
            folder.IsLoaded = true;
        }
        finally
        {
            folder.IsLoading = false;
        }
    }
}
```

### Scenario 2: Expand Path to Specific Node

```csharp
// Find and expand path to node
public void ExpandToNode(FileNode targetNode)
{
    var path = GetPathToNode(targetNode);
    
    foreach (var node in path)
    {
        var treeNode = treeView.GetNode(node);
        treeView.ExpandNode(treeNode);
    }
    
    // Select and bring into view
    treeView.SelectedItem = targetNode;
    var finalNode = treeView.GetNode(targetNode);
    treeView.BringIntoView(finalNode);
}

private List<FileNode> GetPathToNode(FileNode target)
{
    var path = new List<FileNode>();
    var current = target;
    
    while (current != null)
    {
        path.Insert(0, current);
        current = current.Parent;
    }
    
    return path;
}
```

### Scenario 3: Remember Expansion State

```csharp
// Save expansion state before reload
private HashSet<string> SaveExpansionState()
{
    var expandedIds = new HashSet<string>();
    
    SaveNodeExpansion(treeView.Nodes, expandedIds);
    
    return expandedIds;
}

private void SaveNodeExpansion(IEnumerable<TreeViewNode> nodes, HashSet<string> expandedIds)
{
    foreach (var node in nodes)
    {
        if (node.IsExpanded)
        {
            var item = node.Content as FileNode;
            expandedIds.Add(item.Id);
            
            SaveNodeExpansion(node.ChildNodes, expandedIds);
        }
    }
}

// Restore expansion state after reload
private void RestoreExpansionState(HashSet<string> expandedIds)
{
    RestoreNodeExpansion(treeView.Nodes, expandedIds);
}

private void RestoreNodeExpansion(IEnumerable<TreeViewNode> nodes, HashSet<string> expandedIds)
{
    foreach (var node in nodes)
    {
        var item = node.Content as FileNode;
        
        if (expandedIds.Contains(item.Id))
        {
            treeView.ExpandNode(node);
            RestoreNodeExpansion(node.ChildNodes, expandedIds);
        }
    }
}
```

### Scenario 4: Expand Nodes Matching Filter

```csharp
public void ExpandMatchingNodes(string searchText)
{
    if (string.IsNullOrWhiteSpace(searchText))
    {
        treeView.CollapseAll();
        return;
    }
    
    ExpandNodesWithMatch(treeView.Nodes, searchText.ToLower());
}

private bool ExpandNodesWithMatch(IEnumerable<TreeViewNode> nodes, string search)
{
    bool hasMatch = false;
    
    foreach (var node in nodes)
    {
        var item = node.Content as FileNode;
        bool nodeMatches = item.Name.ToLower().Contains(search);
        bool childMatches = ExpandNodesWithMatch(node.ChildNodes, search);
        
        if (nodeMatches || childMatches)
        {
            treeView.ExpandNode(node);
            hasMatch = true;
        }
        else
        {
            treeView.CollapseNode(node);
        }
    }
    
    return hasMatch;
}
```

### Scenario 5: Smooth Expansion Animation

```xml
<treeView:SfTreeView IsAnimationEnabled="True" />
```

```csharp
// Disable for batch operations
treeView.IsAnimationEnabled = false;
treeView.ExpandAll();
treeView.IsAnimationEnabled = true;
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **→** (Right Arrow) | Expand current node or move to first child |
| **←** (Left Arrow) | Collapse current node or move to parent |
| ***** (Asterisk) | Expand all child nodes of current node |
| **+** (Plus) | Expand current node |
| **-** (Minus) | Collapse current node |

## Best Practices

1. **Use AutoExpandMode.RootNodes** for category-based trees
2. **Use AutoExpandMode.None** for large hierarchies (>500 nodes)
3. **Implement load on demand** for deep/large trees
4. **Bind IsExpanded** to persist user's expansion state
5. **Disable animations** during batch expand/collapse operations
6. **Use NodeExpanding** to load children lazily
7. **Provide expand all/collapse all** buttons for user convenience
8. **Remember expansion state** across sessions
9. **Expand to selected item** automatically for better UX
10. **Test performance** with large expansions

## Troubleshooting

**Problem:** Nodes don't expand
- Check `ChildPropertyName` is set correctly
- Verify child collection is not null
- Ensure `HasChildNodes` returns true for bound mode

**Problem:** Poor performance when expanding all
- Use `IsAnimationEnabled = false` during batch operations
- Implement load on demand
- Consider pagination for very large trees

**Problem:** Expansion state not persisting
- Implement `IsExpandedPropertyName` binding
- Save/restore expansion state manually

## Next Steps

- **Load on Demand** - Lazy load children when expanding
- **Selection** - Select nodes after expansion
- **Scrolling** - Bring expanded nodes into view
