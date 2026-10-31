# How To Guides — ListBox

## Table of Contents
- [Filter Items in ListBox](#filter-items-in-listbox)
- [Sort Items](#sort-items)
- [Populate from Remote Data](#populate-from-remote-data)
- [Cascading ListBox](#cascading-listbox)
- [Custom Styling](#custom-styling)
- [Form Integration](#form-integration)

---

## Filter Items in ListBox

### Client-Side Filtering

```cshtml
<input type="text" id="filterInput" placeholder="Filter items..." 
       onkeyup="filterListBox()" />

<ejs-listbox id="listbox"
    dataSource="@ViewBag.items"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<script>
let originalData = @Html.Raw(JsonConvert.SerializeObject(ViewBag.items));

function filterListBox() {
    let filterValue = document.getElementById('filterInput').value.toLowerCase();
    let listbox = document.getElementById('listbox').ej2_instances[0];
    
    let filtered = originalData.filter(item => 
        item.Name.toLowerCase().includes(filterValue)
    );
    
    listbox.dataSource = filtered;
    listbox.refresh();
}
</script>
```

### Server-Side Filtering

```csharp
[HttpGet]
public IActionResult FilterItems(string searchTerm)
{
    var items = GetAllItems()
        .Where(x => x.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
        .ToList();
    
    return Json(items);
}
```

```javascript
document.getElementById('filterInput').addEventListener('keyup', function(e) {
    let searchTerm = e.target.value;
    
    fetch(`/api/items/filter?searchTerm=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            let listbox = document.getElementById('listbox').ej2_instances[0];
            listbox.dataSource = data;
            listbox.refresh();
        });
});
```

---

## Sort Items

### Built-In Sorting

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.items"
    sortOrder="Ascending"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

**Sort Options:**
- `Ascending` - A to Z
- `Descending` - Z to A
- `None` - Default order

### Dynamic Sorting

```javascript
let listbox = document.getElementById('listbox').ej2_instances[0];

function sortAscending() {
    listbox.sortOrder = 'Ascending';
    listbox.dataBind();
}

function sortDescending() {
    listbox.sortOrder = 'Descending';
    listbox.dataBind();
}
```

### Custom Sort Logic

```javascript
function customSort() {
    let listbox = document.getElementById('listbox').ej2_instances[0];
    let data = listbox.dataSource;
    
    // Sort by Name length
    data.sort((a, b) => a.Name.length - b.Name.length);
    
    listbox.dataSource = data;
    listbox.refresh();
}
```

---

## Populate from Remote Data

### Fetch from API

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.remoteData"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<script>
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/items')
        .then(response => response.json())
        .then(data => {
            let listbox = document.getElementById('listbox').ej2_instances[0];
            listbox.dataSource = data;
            listbox.refresh();
        })
        .catch(error => console.error('Error loading data:', error));
});
</script>
```

### Controller API Endpoint

```csharp
[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetItems()
    {
        var items = new List<object>
        {
            new { Id = 1, Name = "Item 1" },
            new { Id = 2, Name = "Item 2" },
            new { Id = 3, Name = "Item 3" }
        };
        
        return Ok(items);
    }
}
```

---

## Cascading ListBox

### Master-Detail Pattern

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.categories = new List<Category>
    {
        new Category { Id = 1, Name = "Electronics" },
        new Category { Id = 2, Name = "Clothing" },
        new Category { Id = 3, Name = "Books" }
    };
    
    ViewBag.allProducts = new List<Product>
    {
        new Product { Id = 1, CategoryId = 1, Name = "Laptop" },
        new Product { Id = 2, CategoryId = 1, Name = "Mouse" },
        new Product { Id = 3, CategoryId = 2, Name = "Shirt" },
        new Product { Id = 4, CategoryId = 2, Name = "Pants" },
        new Product { Id = 5, CategoryId = 3, Name = "C# Guide" }
    };
    
    return View();
}

[HttpGet]
public IActionResult GetProducts(int categoryId)
{
    var products = GetAllProducts()
        .Where(p => p.CategoryId == categoryId)
        .ToList();
    
    return Json(products);
}
```

**View:**

```cshtml
<div class="cascading-listbox">
    <div>
        <label>Category</label>
        <ejs-listbox id="categories"
            dataSource="@ViewBag.categories"
            select="onCategorySelect"
            height="250px">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
        </ejs-listbox>
    </div>

    <div>
        <label>Products</label>
        <ejs-listbox id="products"
            height="250px">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
        </ejs-listbox>
    </div>
</div>

<script>
function onCategorySelect(args) {
    let categoryId = args.value;
    let products = document.getElementById('products').ej2_instances[0];
    
    fetch(`/api/items/getproducts?categoryId=${categoryId}`)
        .then(response => response.json())
        .then(data => {
            products.dataSource = data;
            products.refresh();
        });
}
</script>
```

---

## Custom Styling

### Style Individual Items

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.items"
    itemTemplate="@Html.Raw("<div class='custom-item'>${Name}</div>")"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<style>
.custom-item {
    padding: 10px;
    background: linear-gradient(to right, #f5f5f5, #fff);
    border-bottom: 1px solid #eee;
    font-weight: 500;
    color: #333;
}

.e-listbox .e-list-item.e-active .custom-item {
    background: linear-gradient(to right, #0066cc, #0052a3);
    color: white;
}
</style>
```

### Apply CSS Classes

```javascript
let listbox = document.getElementById('listbox').ej2_instances[0];

function highlightItems(ids) {
    ids.forEach(id => {
        let item = listbox.getItemByValue(id);
        if (item) {
            item.classList.add('highlight');
        }
    });
}

highlightItems([1, 3, 5]);
```

**CSS:**

```css
.e-listbox .e-list-item.highlight {
    background-color: #fff3cd;
    border-left: 4px solid #ffc107;
    padding-left: 6px;
}
```

---

## Form Integration

### Submit ListBox Selection with Form

**HTML Form:**

```cshtml
<form asp-controller="Items" asp-action="Save" method="post">
    <div class="form-group">
        <label>Select Items</label>
        <ejs-listbox id="items"
            dataSource="@ViewBag.items"
            name="selectedItems"
            height="300px">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
            <e-listbox-selectionsettings mode="Multiple" type="Checkbox"></e-listbox-selectionsettings>
        </ejs-listbox>
    </div>

    <button type="submit" class="btn btn-primary">Save Selection</button>
</form>
```

**Controller Action:**

```csharp
[HttpPost]
public IActionResult Save(List<int> selectedItems)
{
    // selectedItems contains the selected Ids
    
    // Save to database
    _dbContext.SaveSelection(selectedItems);
    
    return RedirectToAction("Index");
}
```

### Validation

```cshtml
<form asp-controller="Items" asp-action="Save" method="post">
    <ejs-listbox id="items"
        dataSource="@ViewBag.items"
        height="300px">
        <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
        <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
    </ejs-listbox>
    
    <span id="errorMessage" class="text-danger"></span>
    <button type="submit" onclick="return validateSelection()">Submit</button>
</form>

<script>
function validateSelection() {
    let listbox = document.getElementById('items').ej2_instances[0];
    let selected = listbox.getSelectedItems();
    
    if (!selected.value || selected.value.length === 0) {
        document.getElementById('errorMessage').innerHTML = 'Please select at least one item';
        return false;
    }
    
    if (selected.value.length > 10) {
        document.getElementById('errorMessage').innerHTML = 'Cannot select more than 10 items';
        return false;
    }
    
    return true;
}
</script>
```
