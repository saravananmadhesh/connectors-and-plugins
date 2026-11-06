# Selection Modes — ListBox

## Table of Contents
- [Selection Types](#selection-types)
- [Single Selection](#single-selection)
- [Multiple Selection](#multiple-selection)

---

## Selection Types

| Mode | Type | Use Case |
|------|------|----------|
| `Single` | Default | Choose one option |
| `Multiple` | Default | Choose multiple options |

---

## Single Selection

### Basic Single Selection

```cshtml
<ejs-listbox id="single"
    dataSource="@ViewBag.items"
    height="300px"
    placeholder="Select one item">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

### Controller

```csharp
public IActionResult Index()
{
    ViewBag.items = new List<object>
    {
        new { Id = 1, Name = "Item 1" },
        new { Id = 2, Name = "Item 2" },
        new { Id = 3, Name = "Item 3" }
    };
    return View();
}
```

### Handle Selection

```javascript
let listbox = document.getElementById('single').ej2_instances[0];

listbox.addEventListener('change', function(args) {
    console.log('Selected:', args.value);
});
```

---

## Multiple Selection

### Multiple Selection (Click-Based)

```cshtml
<ejs-listbox id="multiple"
    dataSource="@ViewBag.items"
    height="300px"
    placeholder="Select multiple items">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
</ejs-listbox>
```

**How it works:**
- Click item to select
- Click again to deselect
- Hold `Ctrl` and click to multi-select
- Hold `Shift` and click to range-select

### Get Multiple Selected Items

```javascript
let listbox = document.getElementById('multiple').ej2_instances[0];

function getSelected() {
    let selected = listbox.getSelectedItems();
    console.log('Selected items:', selected.text);
    console.log('Selected values:', selected.value);
    console.log('Selected indices:', selected.index);
}
```
