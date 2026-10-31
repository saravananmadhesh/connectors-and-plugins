# Dual ListBox (Transfer) — ListBox

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Toolbar Operations](#toolbar-operations)
- [Multiple ListBoxes](#multiple-listboxes)
- [Events](#events)
- [Advanced Patterns](#advanced-patterns)

---

## Overview

A dual ListBox allows users to move items between two list boxes using built-in toolbar buttons. Users can transfer items bidirectionally with operations like move, moveUp, moveDown, and moveAll.

**Use Cases:**
- User role assignment (Available Roles ↔ Assigned Roles)
- Skill selection (All Skills ↔ My Skills)
- Permission management (Available Permissions ↔ Granted Permissions)
- Data transfer between lists (Source → Target)

**Available Toolbar Operations:**
- `moveUp` - Move selected item upward within the list
- `moveDown` - Move selected item downward within the list
- `moveTo` - Move selected item to another list box
- `moveFrom` - Move selected item from another list box
- `moveAllTo` - Move all items to another list box
- `moveAllFrom` - Move all items from another list box

---

## Basic Setup

### Official Implementation with Toolbar Settings

```cshtml
<div style="width:50%; margin:auto">
    <div style="float:left; width:48%">
        <ejs-listbox id="listbox1" 
            dataSource="@ViewBag.groupA" 
            scope="#listbox2">
            <e-listbox-toolbarSettings items="@ViewBag.items"></e-listbox-toolbarSettings>
        </ejs-listbox>
    </div>
    <div style="float:right; width:48%">
        <ejs-listbox id="listbox2" 
            dataSource="@ViewBag.groupB">
        </ejs-listbox>
    </div>
</div>
```

### Controller Setup

```csharp
public class DualListBoxController : Controller
{
    public IActionResult Index()
    {
        // Group A - items available for transfer
        ViewBag.groupA = new List<string> 
        { 
            "Badminton", 
            "Basketball", 
            "Cricket", 
            "Football", 
            "Golf" 
        };

        // Group B - items already transferred
        ViewBag.groupB = new List<string> 
        { 
            "Hockey", 
            "Tennis" 
        };

        // Toolbar items for dual list box operations
        ViewBag.items = new List<string> 
        { 
            "moveUp", 
            "moveDown", 
            "moveTo", 
            "moveFrom", 
            "moveAllTo", 
            "moveAllFrom" 
        };

        return View();
    }
}
```

### Result

The dual ListBox displays:
- **Left ListBox (listbox1)** with Group A items and toolbar buttons between lists
- **Right ListBox (listbox2)** with Group B items
- Toolbar buttons appear between the lists for item transfer operations
```

---

## Toolbar Operations Reference

| Operation | Description | Behavior |
|-----------|-------------|----------|
| `moveUp` | Move selected item upward | Item moves up within the same list |
| `moveDown` | Move selected item downward | Item moves down within the same list |
| `moveTo` | Move selected to other list | Transfers selected item(s) to the other list |
| `moveFrom` | Move from other list | Transfers items from the other list |
| `moveAllTo` | Move all to other list | Transfers all items to the other list |
| `moveAllFrom` | Move all from other list | Transfers all items from the other list |

---

## Multiple ListBoxes with Fields

### Example with Complex Data Binding

```csharp
// Controller
public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public IActionResult Index()
{
    ViewBag.groupA = new List<Item>
    {
        new Item { Id = 1, Name = "JavaScript" },
        new Item { Id = 2, Name = "Python" },
        new Item { Id = 3, Name = "Java" },
        new Item { Id = 4, Name = "C#" }
    };

    ViewBag.groupB = new List<Item>
    {
        new Item { Id = 5, Name = "PHP" },
        new Item { Id = 6, Name = "Ruby" }
    };

    ViewBag.items = new List<string> 
    { 
        "moveUp", 
        "moveDown", 
        "moveTo", 
        "moveFrom", 
        "moveAllTo", 
        "moveAllFrom" 
    };

    return View();
}
```

### View with Object Data Source

```cshtml
<div style="width:50%; margin:auto">
    <h3>Programming Languages</h3>
    
    <div style="float:left; width:48%">
        <label>Group A</label>
        <ejs-listbox id="listbox1" 
            dataSource="@ViewBag.groupA" 
            scope="#listbox2">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
            <e-listbox-toolbarSettings items="@ViewBag.items"></e-listbox-toolbarSettings>
        </ejs-listbox>
    </div>

    <div style="float:right; width:48%">
        <label>Group B</label>
        <ejs-listbox id="listbox2" 
            dataSource="@ViewBag.groupB">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
        </ejs-listbox>
    </div>
</div>

<div style="clear:both"></div>
```

---

## Multiple Selection in Dual ListBox

Enable multiple selection to transfer multiple items at once:

```cshtml
<div style="width:50%; margin:auto">
    <div style="float:left; width:48%">
        <ejs-listbox id="listbox1" 
            dataSource="@ViewBag.groupA" 
            scope="#listbox2">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
            <e-listbox-selectionsettings mode="Multiple" type="Checkbox"></e-listbox-selectionsettings>
            <e-listbox-toolbarSettings items="@ViewBag.items"></e-listbox-toolbarSettings>
        </ejs-listbox>
    </div>

    <div style="float:right; width:48%">
        <ejs-listbox id="listbox2" 
            dataSource="@ViewBag.groupB">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
            <e-listbox-selectionsettings mode="Multiple" type="Checkbox"></e-listbox-selectionsettings>
        </ejs-listbox>
    </div>
</div>
```

---

## Events

### Track Toolbar Operations

```cshtml
<ejs-listbox id="listbox1" 
    dataSource="@ViewBag.groupA" 
    scope="#listbox2"
    change="onChange"
    select="onSelect">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-toolbarSettings items="@ViewBag.items"></e-listbox-toolbarSettings>
</ejs-listbox>

<script>
function onChange(args) {
    console.log('Selection changed:', args.value);
    console.log('Current items:', args.items);
}

function onSelect(args) {
    console.log('Item selected:', args.text);
}
</script>
```

### Event Properties

- `value` - Currently selected item value
- `text` - Currently selected item text  
- `items` - Array of all items in the list box
- `index` - Index of selected item
- `data` - Data object of selected item

---

## Advanced Patterns

### Pattern 1: Custom Styling for Toolbar

```cshtml
<style>
.e-listbox .e-toolbar {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
}

.e-listbox .e-toolbar button {
    margin: 4px 2px;
    min-width: 50px;
}

.e-listbox .e-toolbar button:hover {
    background-color: #e8f4f8;
}
</style>
```

### Pattern 2: Disable Toolbar Buttons When Empty

```csharp
// Controller - Check if lists have items
public IActionResult Index()
{
    ViewBag.groupA = new List<Item> { /* ... */ };
    ViewBag.groupB = new List<Item> { /* ... */ };
    
    // Only show moveTo if groupA has items
    var toolbarItems = ViewBag.groupA.Count > 0 
        ? new List<string> { "moveUp", "moveDown", "moveTo", "moveFrom", "moveAllTo", "moveAllFrom" }
        : new List<string> { "moveFrom" };
    
    ViewBag.items = toolbarItems;
    return View();
}
```

### Pattern 3: Save Transfer State to Database

```csharp
[HttpPost]
public IActionResult SaveDualListBox([FromBody] DualListBoxState state)
{
    // state.ListBox1Items = items in first list
    // state.ListBox2Items = items in second list
    
    _dbContext.SaveListBoxState(state);
    return Ok(new { message = "Dual ListBox state saved" });
}

public class DualListBoxState
{
    public List<int> ListBox1Items { get; set; }
    public List<int> ListBox2Items { get; set; }
}
```

```javascript
function saveDualListBoxState() {
    let listbox1 = document.getElementById('listbox1').ej2_instances[0];
    let listbox2 = document.getElementById('listbox2').ej2_instances[0];
    
    let state = {
        listbox1Items: listbox1.dataSource.map(x => x.Id),
        listbox2Items: listbox2.dataSource.map(x => x.Id)
    };
    
    fetch('/api/duallisbox/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
    })
    .then(response => response.json())
    .then(data => console.log('State saved:', data))
    .catch(error => console.error('Error:', error));
}
```
