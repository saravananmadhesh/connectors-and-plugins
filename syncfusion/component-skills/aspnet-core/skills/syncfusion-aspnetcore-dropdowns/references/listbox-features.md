# Advanced Features in ListBox

## Table of Contents
- [Filtering and Search](#filtering-and-search)
- [Sorting and Grouping](#sorting-and-grouping)
- [Drag and Drop](#drag-and-drop)
- [Dual ListBox (Transfer)](#dual-listbox-transfer)
- [Scroller Configuration](#scroller-configuration)
- [Enable/Disable Items](#enabledisable-items)
- [Common Patterns](#common-patterns)

---

## Filtering and Search

### Enable Built-in Filter

Add a search input to filter items:

**View:**

```cshtml
<ejs-listbox id="languages"
    dataSource="@ViewBag.languages"
    allowFiltering="true"
    filterBarPlaceholder="Search languages"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.languages = new List<object>
    {
        new { Id = "1", Name = "JavaScript" },
        new { Id = "2", Name = "TypeScript" },
        new { Id = "3", Name = "React" },
        new { Id = "4", Name = "Vue" }
    };
    return View();
}
```

---

## Sorting and Grouping

### Group by Category

Organize items by category:

**Controller:**

```csharp
public class Technology
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
}

public IActionResult Index()
{
    ViewBag.technologies = new List<Technology>
    {
        new Technology { Id = "1", Name = "HTML", Type = "Markup" },
        new Technology { Id = "2", Name = "CSS", Type = "Styling" },
        new Technology { Id = "3", Name = "JavaScript", Type = "Programming" },
        new Technology { Id = "4", Name = "TypeScript", Type = "Programming" }
    };
    return View();
}
```

**View:**

```cshtml
<ejs-listbox id="technologies"
    dataSource="@ViewBag.technologies"
    height="300px">
    <e-listbox-fields text="Name" value="Id" groupBy="Type"></e-listbox-fields>
</ejs-listbox>
```

### Sort Items

Sort the list in ascending or descending order:

**View:**

```cshtml
<!-- Ascending order -->
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    sortOrder="Ascending"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<!-- Descending order -->
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    sortOrder="Descending"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

---

## Drag and Drop

### Basic Drag and Drop

Enable drag and drop between items:

**View:**

```cshtml
<ejs-listbox id="source"
    dataSource="@ViewBag.sourceItems"
    allowDragAndDrop="true"
    scope="combined-list"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<ejs-listbox id="target"
    dataSource="@ViewBag.targetItems"
    allowDragAndDrop="true"
    scope="combined-list"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

---

## Dual ListBox (Transfer)

### Move Items Between Two ListBoxes

**View:**

```cshtml
<div class="dual-listbox">
    <div class="list-container">
        <h5>Available</h5>
        <ejs-listbox id="available"
            dataSource="@ViewBag.available"
            allowDragAndDrop="true"
            scope="transfer"
            height="250px">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
            <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
        </ejs-listbox>
    </div>
    
    <div class="button-group">
        <button onclick="moveToSelected()" class="btn btn-primary">→</button>
        <button onclick="moveToAvailable()" class="btn btn-primary">←</button>
    </div>
    
    <div class="list-container">
        <h5>Selected</h5>
        <ejs-listbox id="selected"
            dataSource="@ViewBag.selected"
            allowDragAndDrop="true"
            scope="transfer"
            height="250px">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
            <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
        </ejs-listbox>
    </div>
</div>

<script>
function moveToSelected() {
    var availableList = document.getElementById('available').ej2_instances[0];
    var selectedList = document.getElementById('selected').ej2_instances[0];
    
    if (availableList.value) {
        selectedList.moveTo(availableList, availableList.value);
    }
}

function moveToAvailable() {
    var availableList = document.getElementById('available').ej2_instances[0];
    var selectedList = document.getElementById('selected').ej2_instances[0];
    
    if (selectedList.value) {
        availableList.moveTo(selectedList, selectedList.value);
    }
}
</script>
```

**CSS:**

```css
.dual-listbox {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

.list-container {
    flex: 1;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    height: 250px;
}

.btn {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary {
    background-color: #2196F3;
    color: white;
}

.btn-primary:hover {
    background-color: #1976D2;
}
```

---

## Scroller Configuration

### Custom Height with Scrolling

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    height="400px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

---

## Enable/Disable Items

### Disable Specific Items

**Controller:**

```csharp
public class Item
{
    public string Id { get; set; }
    public string Name { get; set; }
    public bool IsDisabled { get; set; }
}

public IActionResult Index()
{
    ViewBag.items = new List<Item>
    {
        new Item { Id = "1", Name = "Available Item 1", IsDisabled = false },
        new Item { Id = "2", Name = "Disabled Item", IsDisabled = true },
        new Item { Id = "3", Name = "Available Item 2", IsDisabled = false }
    };
    return View();
}
```

**View:**

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    height="300px">
    <e-listbox-fields text="Name" value="Id" disabled="IsDisabled"></e-listbox-fields>
</ejs-listbox>
```

---

## Common Patterns

### Pattern 1: Simple Selection List

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    change="onSelectionChange"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<script>
function onSelectionChange(args) {
    console.log('Selected:', args.value);
}
</script>
```

### Pattern 2: Searchable Grouped List

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    allowFiltering="true"
    filterBarPlaceholder="Search..."
    height="300px">
    <e-listbox-fields text="Name" value="Id" groupBy="Category"></e-listbox-fields>
</ejs-listbox>
```

### Pattern 3: Multi-Select with Checkboxes

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple" type="Checkbox"></e-listbox-selectionsettings>
</ejs-listbox>
```

### Pattern 4: Transfer Between Lists

```cshtml
<ejs-listbox id="source"
    dataSource="@ViewBag.source"
    allowDragAndDrop="true"
    scope="transfer"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
</ejs-listbox>

<ejs-listbox id="target"
    dataSource="@ViewBag.target"
    allowDragAndDrop="true"
    scope="transfer"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
</ejs-listbox>
```
