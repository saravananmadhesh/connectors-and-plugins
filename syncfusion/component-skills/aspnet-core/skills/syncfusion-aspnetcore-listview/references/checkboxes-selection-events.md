# Checkboxes, Selection & Events

## Table of Contents
- [ShowCheckBox Property](#showcheckbox-property)
- [CheckBoxPosition Enum](#checkboxposition-enum)
- [IsChecked Field Mapping](#ischecked-field-mapping)
- [Select Event](#select-event)
- [Selection Patterns](#selection-patterns)
- [Multi-Item Selection](#multi-item-selection)
- [Selection State Management](#selection-state-management)

## ShowCheckBox Property

The `showCheckBox` property enables checkbox rendering for list items:

### Basic Checkbox Implementation

```csharp
var items = new List<Item>()
{
    new Item { Id = 1, Name = "Item 1" },
    new Item { Id = 2, Name = "Item 2" },
    new Item { Id = 3, Name = "Item 3" }
};
```

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" showCheckBox="true">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Output:** Each item displays with an unchecked checkbox on the left.

### Checkbox with Selection

When checkboxes are enabled, users can:
- Click item text to select item (highlight row)
- Click checkbox to toggle checked state
- Both actions trigger `select` event

## CheckBoxPosition Enum

The `checkBoxPosition` property controls checkbox placement:

### Left Position (Default)

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" 
    showCheckBox="true" 
    checkBoxPosition="Left">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Layout:**
```
☐ Item 1
☐ Item 2
☐ Item 3
```

### Right Position

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" 
    showCheckBox="true" 
    checkBoxPosition="Right">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Layout:**
```
Item 1 ☐
Item 2 ☐
Item 3 ☐
```

### Position Selection Guidelines

| Position | Best For |
|----------|----------|
| Left | Standard UI patterns, LTR languages |
| Right | RTL languages, Avatar lists |

## IsChecked Field Mapping

The `isChecked` field property pre-sets checkbox states from data:

### Pre-Checked Items

```csharp
public class Task
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public bool IsCompleted { get; set; }
}

var tasks = new List<Task>()
{
    new Task { TaskId = 1, TaskName = "Research", IsCompleted = true },
    new Task { TaskId = 2, TaskName = "Design", IsCompleted = true },
    new Task { TaskId = 3, TaskName = "Development", IsCompleted = false },
    new Task { TaskId = 4, TaskName = "Testing", IsCompleted = false }
};
```

```cshtml
<ejs-listview id="tasks" dataSource="@ViewBag.Tasks" showCheckBox="true">
    <e-listview-fieldsettings 
        id="TaskId" 
        text="TaskName" 
        isChecked="IsCompleted">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Output:**
```
☑ Research
☑ Design
☐ Development
☐ Testing
```

**Key Benefit:** Initial checkbox state reflects backend data; useful for displaying saved selection states.

## Select Event

The `select` event fires when user clicks an item or checkbox:

### Basic Select Event

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" showCheckBox="true"
    select="OnSelect">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function OnSelect(args) {
    console.log("Selected Item ID:", args.data.Id);
    console.log("Selected Item Text:", args.data.Name);
    console.log("Event Name:", args.name);
}
</script>
```

### SelectEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| data | object | Data object of selected item |
| index | number | Index of selected item |
| isChecked | boolean | Checkbox state (if showCheckBox enabled) |
| name | string | Event name (always "select") |
| text | string | Item text |

### Detailed Select Event Handling

```cshtml
<ejs-listview id="itemList" dataSource="@ViewBag.Items" showCheckBox="true"
    select="HandleSelection">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function HandleSelection(args) {
    console.log("=== Selection Event ===");
    console.log("Item ID:", args.data.Id);
    console.log("Item Text:", args.text);
    console.log("Is Checked:", args.isChecked);
    console.log("Item Index:", args.index);
    
    if (args.isChecked) {
        console.log(args.text + " was checked");
    } else {
        console.log(args.text + " was unchecked");
    }
}
</script>
```

## Selection Patterns

### Pattern 1: Single Selection

User can select only one item at a time:

```csharp
var items = new List<Item> { /* items */ };
```

```cshtml
<ejs-listview id="singleSelect" dataSource="@ViewBag.Items">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
let lastSelected = null;

function OnSelect(args) {
    if (lastSelected !== null && lastSelected !== args.index) {
        // Deselect previous (implementation depends on CSS styling)
    }
    lastSelected = args.index;
    console.log("Selected:", args.text);
}
</script>
```

### Pattern 2: Multi-Select with Checkboxes

```cshtml
<ejs-listview id="multiSelect" dataSource="@ViewBag.Items" showCheckBox="true">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
let selectedItems = [];

function OnSelect(args) {
    if (args.isChecked) {
        selectedItems.push(args.data.Id);
        console.log("Added:", args.text);
    } else {
        selectedItems = selectedItems.filter(id => id !== args.data.Id);
        console.log("Removed:", args.text);
    }
    console.log("Currently selected:", selectedItems);
}
</script>
```

## Multi-Item Selection

### Getting Selected Items

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" showCheckBox="true">
    <e-listview-fieldsettings id="Id" text="Name" isChecked="IsSelected"></e-listview-fieldsettings>
</ejs-listview>

<button onclick="GetSelectedItems()">Get Selected Items</button>

<script>
function GetSelectedItems() {
    let listView = document.getElementById('list').ej2_instances[0];
    let checkedIndices = listView.getSelectedItems();
    
    console.log("Checked Items:", checkedIndices.indexes);
    console.log("Checked Data:", checkedIndices.data);
}
</script>
```

### Pre-Selecting Multiple Items

```csharp
public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public bool IsSelected { get; set; }
}

var products = new List<Product>()
{
    new Product { ProductId = 1, ProductName = "Laptop", IsSelected = true },
    new Product { ProductId = 2, ProductName = "Mouse", IsSelected = true },
    new Product { ProductId = 3, ProductName = "Keyboard", IsSelected = false },
    new Product { ProductId = 4, ProductName = "Monitor", IsSelected = true }
};
```

```cshtml
<ejs-listview id="products" dataSource="@ViewBag.Products" showCheckBox="true">
    <e-listview-fieldsettings 
        id="ProductId" 
        text="ProductName" 
        isChecked="IsSelected">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Result:** Laptop, Mouse, and Monitor are pre-checked.

## Selection State Management

### Track Selected Indices

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" showCheckBox="true"
    select="TrackSelection">
    <e-listview-fieldsettings id="Id" text="Name" isChecked="IsSelected"></e-listview-fieldsettings>
</ejs-listview>

<button onclick="GetSelectionData()">Get Selections</button>

<script>
let selectionTracker = {
    selectedIndices: [],
    selectedData: []
};

function TrackSelection(args) {
    if (args.isChecked) {
        selectionTracker.selectedIndices.push(args.index);
        selectionTracker.selectedData.push(args.data);
    } else {
        selectionTracker.selectedIndices = selectionTracker.selectedIndices.filter(i => i !== args.index);
        selectionTracker.selectedData = selectionTracker.selectedData.filter(d => d.Id !== args.data.Id);
    }
}

function GetSelectionData() {
    console.log("Indices:", selectionTracker.selectedIndices);
    console.log("Data:", selectionTracker.selectedData);
    return selectionTracker.selectedData;
}
</script>
```

### Select All / Deselect All

```csharp
var items = new List<Item> { /* 20 items */ };
```

```cshtml
<div style="margin-bottom: 10px;">
    <button onclick="SelectAll()">Select All</button>
    <button onclick="DeselectAll()">Deselect All</button>
</div>

<ejs-listview id="list" dataSource="@ViewBag.Items" showCheckBox="true">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function SelectAll() {
    let listView = document.getElementById('list').ej2_instances[0];
    let items = listView.liCollection;
    
    items.forEach(item => {
        item.setAttribute('e-checklist', 'true');
        let checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) checkbox.checked = true;
    });
}

function DeselectAll() {
    let listView = document.getElementById('list').ej2_instances[0];
    let items = listView.liCollection;
    
    items.forEach(item => {
        item.removeAttribute('e-checklist');
        let checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) checkbox.checked = false;
    });
}
</script>
```

### Conditional Selection

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" showCheckBox="true"
    e-select="OnSelectItem">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        enabled="IsEnabled">
    </e-listview-fieldsettings>
</ejs-listview>

<script>
function OnSelectItem(args) {
    // Allow selection only for enabled items
    if (!args.data.IsEnabled) {
        console.log("Cannot select disabled item");
        return;
    }
    
    // Allow selection only for items matching criteria
    if (args.data.Category !== 'Premium') {
        console.log("Can only select Premium items");
        return;
    }
    
    console.log("Selection allowed:", args.text);
}
</script>
```

## Use Cases

### Use Case 1: Shopping Cart

```cshtml
<!-- Add/remove items from cart -->
<ejs-listview id="cart" dataSource="@ViewBag.Products" showCheckBox="true"
    e-select="UpdateCart">
    <e-listview-fieldsettings 
        id="ProductId" 
        text="ProductName" 
        isChecked="InCart">
    </e-listview-fieldsettings>
</ejs-listview>

<script>
function UpdateCart(args) {
    let product = args.data;
    if (args.isChecked) {
        console.log("Added to cart:", product.ProductName);
    } else {
        console.log("Removed from cart:", product.ProductName);
    }
}
</script>
```

### Use Case 2: Permissions/Access Control

```cshtml
<!-- Select permissions to grant -->
<ejs-listview id="permissions" dataSource="@ViewBag.Permissions" showCheckBox="true">
    <e-listview-fieldsettings 
        id="PermissionId" 
        text="PermissionName" 
        isChecked="IsGranted">
    </e-listview-fieldsettings>
</ejs-listview>
```

### Use Case 3: Task Management

```cshtml
<!-- Mark tasks as complete -->
<ejs-listview id="tasks" dataSource="@ViewBag.Tasks" showCheckBox="true"
    e-select="UpdateTaskStatus">
    <e-listview-fieldsettings 
        id="TaskId" 
        text="TaskName" 
        isChecked="IsCompleted">
    </e-listview-fieldsettings>
</ejs-listview>

<script>
function UpdateTaskStatus(args) {
    if (args.isChecked) {
        console.log("Task completed:", args.text);
    } else {
        console.log("Task marked incomplete:", args.text);
    }
}
</script>
```

---

**Related Topics:**
- [Events & Error Handling](events-and-error-handling.md) for other event types
- [Field Settings & Configuration](field-settings-and-configuration.md)
- [Templates & Customization](templates-and-customization.md)
