# Sorting, Filtering & Scrolling

## Table of Contents
- [SortOrder Property](#sortorder-property)
- [SortBy Field Mapping](#sortby-field-mapping)
- [Scroll Event for Dynamic Loading](#scroll-event-for-dynamic-loading)
- [Infinite Scroll Implementation](#infinite-scroll-implementation)
- [Filter Operations](#filter-operations)
- [Query-Based Filtering](#query-based-filtering)
- [Combined Sorting and Filtering](#combined-sorting-and-filtering)

## SortOrder Property

The `sortOrder` property controls data sorting direction:

### Sorting Options

| Value | Description |
|-------|-------------|
| Ascending | Sort A-Z or smallest-largest |
| Descending | Sort Z-A or largest-smallest |
| None | No sorting (default) |

### Basic Ascending Sort

```csharp
var items = new List<Product>()
{
    new Product { Id = 1, Name = "Zebra" },
    new Product { Id = 2, Name = "Apple" },
    new Product { Id = 3, Name = "Mango" }
};
```

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" sortOrder="Ascending">
    <e-listview-fieldsettings id="Id" text="Name" sortBy="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Result:** Apple, Mango, Zebra (alphabetical order)

### Descending Sort

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" sortOrder="Descending">
    <e-listview-fieldsettings id="Id" text="Name" sortBy="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Result:** Zebra, Mango, Apple (reverse alphabetical)

### No Sorting

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" sortOrder="None">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Result:** Items display in original order.

## SortBy Field Mapping

The `sortBy` field property specifies which data field to use for sorting:

### Sort by Specific Field

```csharp
public class Employee
{
    public int EmployeeId { get; set; }
    public string FirstName { get; set; }
    public string Department { get; set; }
    public decimal Salary { get; set; }
}

var employees = new List<Employee>()
{
    new Employee { EmployeeId = 1, FirstName = "John", Department = "IT", Salary = 80000 },
    new Employee { EmployeeId = 2, FirstName = "Alice", Department = "HR", Salary = 60000 },
    new Employee { EmployeeId = 3, FirstName = "Bob", Department = "IT", Salary = 75000 }
};
```

```cshtml
<!-- Sort by FirstName (display), ascending -->
<ejs-listview id="byName" dataSource="@ViewBag.Employees" sortOrder="Ascending">
    <e-listview-fieldsettings id="EmployeeId" text="FirstName" sortBy="FirstName"></e-listview-fieldsettings>
</ejs-listview>

<!-- Sort by Department (different field), ascending -->
<ejs-listview id="byDept" dataSource="@ViewBag.Employees" sortOrder="Ascending">
    <e-listview-fieldsettings id="EmployeeId" text="FirstName" sortBy="Department"></e-listview-fieldsettings>
</ejs-listview>

<!-- Sort by Salary (numeric field), descending -->
<ejs-listview id="bySalary" dataSource="@ViewBag.Employees" sortOrder="Descending">
    <e-listview-fieldsettings id="EmployeeId" text="FirstName" sortBy="Salary"></e-listview-fieldsettings>
</ejs-listview>
```

### Numeric Sorting

```csharp
var items = new List<Item>()
{
    new Item { Id = 10, Name = "Item A" },
    new Item { Id = 2, Name = "Item B" },
    new Item { Id = 100, Name = "Item C" },
    new Item { Id = 5, Name = "Item D" }
};
```

```cshtml
<!-- Numeric sort by Id -->
<ejs-listview id="numeric" dataSource="@ViewBag.Items" sortOrder="Ascending">
    <e-listview-fieldsettings id="Id" text="Name" sortBy="Id"></e-listview-fieldsettings>
</ejs-listview>
```

**Result:** 2, 5, 10, 100 (numeric order, not string order)

## Scroll Event for Dynamic Loading

The `scroll` event fires when user scrolls, enabling dynamic data loading:

### Basic Scroll Detection

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" height="500"
    enableVirtualization="true"
    scroll="OnScroll">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function OnScroll(args) {
    console.log("Scroll distance Y:", args.distanceY);
    console.log("Direction:", args.direction); // "up" or "down"
    
    // Detect bottom of list
    if (args.direction === 'down' && Math.abs(args.distanceY) < 100) {
        console.log("User near bottom of list");
    }
}
</script>
```

### ScrolledEventArgs Properties

| Property | Description |
|----------|-------------|
| distanceY | Vertical distance scrolled (negative = down) |
| direction | "up" or "down" |

## Infinite Scroll Implementation

Infinite scroll automatically loads more data as user reaches bottom:

### Basic Infinite Scroll

```csharp
// In Controller/PageModel
public IActionResult GetItems(int pageNumber, int pageSize)
{
    int skip = (pageNumber - 1) * pageSize;
    var items = _context.Items
        .Skip(skip)
        .Take(pageSize)
        .ToList();
    
    return Json(items);
}
```

```cshtml
<div id="loader" style="text-align: center; display: none; padding: 20px;">
    <span>Loading more items...</span>
</div>

<ejs-listview id="infinite" dataSource="@ViewBag.InitialItems" height="600"
    enableVirtualization="true"
    scroll="HandleInfiniteScroll">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
let currentPage = 1;
let pageSize = 50;
let isLoading = false;
let hasMore = true;

function HandleInfiniteScroll(args) {
    // Only load when scrolling down, near bottom, and not already loading
    if (args.direction === 'down' && args.distanceY < -50 && !isLoading && hasMore) {
        isLoading = true;
        document.getElementById('loader').style.display = 'block';
        
        LoadNextPage();
    }
}

function LoadNextPage() {
    currentPage++;
    
    fetch(`/api/items?page=${currentPage}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                hasMore = false;
                console.log("No more items to load");
            }
            
            let listView = document.getElementById('infinite').ej2_instances[0];
            listView.dataSource = [...listView.dataSource, ...data];
            
            isLoading = false;
            document.getElementById('loader').style.display = 'none';
        })
        .catch(error => {
            console.error("Load error:", error);
            isLoading = false;
            document.getElementById('loader').style.display = 'none';
        });
}
</script>
```

## Filter Operations

### Client-Side Filtering

Filter data before binding to ListView:

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public bool IsAvailable { get; set; }
}

var allProducts = new List<Product> { /* 1000 products */ };

// Filter available products in IT category
var filtered = allProducts
    .Where(p => p.Category == "IT" && p.IsAvailable)
    .ToList();
```

```cshtml
<ejs-listview id="filtered" dataSource="@ViewBag.FilteredProducts">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Dynamic Filtering with Search

```cshtml
<div style="margin-bottom: 10px;">
    <input type="text" id="searchBox" placeholder="Search..." onkeyup="FilterList()" />
</div>

<ejs-listview id="searchable" dataSource="@ViewBag.AllProducts">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
let originalData = @Html.Raw(JsonConvert.SerializeObject(ViewBag.AllProducts));

function FilterList() {
    let searchTerm = document.getElementById('searchBox').value.toLowerCase();
    
    let filtered = originalData.filter(item => 
        item.Name.toLowerCase().includes(searchTerm)
    );
    
    let listView = document.getElementById('searchable').ej2_instances[0];
    listView.dataSource = filtered;
}
</script>
```

## Query-Based Filtering

Use Query for server-side filtering:

### Filter with Where Condition

```cshtml
<ejs-listview id="list"
    query="new ej.data.Query().from('Products').where('Category', 'equal', 'Electronics').take(20)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Effect:** Server returns only products where Category = "Electronics"

### Multiple Where Conditions

```cshtml
<ejs-listview id="list"
    query="new ej.data.Query().from('Products').where('Category', 'equal', 'Electronics').where('Price', 'greaterThan', '100').take(20)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Effect:** Category = "Electronics" AND Price > 100

### Where Operators

| Operator | Description | Example |
|----------|-------------|---------|
| equal | Exact match | `Category == "Electronics"` |
| notEqual | Not equal | `Status != "Inactive"` |
| greaterThan | Greater than | `Price > 100` |
| lessThan | Less than | `Price < 50` |
| greaterThanOrEqual | >= | `Score >= 80` |
| lessThanOrEqual | <= | `Rating <= 4` |
| contains | String contains | `Name contains "Pro"` |
| startsWith | String starts with | `Email starts with "admin"` |
| endsWith | String ends with | `Domain ends with ".com"` |

## Combined Sorting and Filtering

### Filtered and Sorted

```csharp
public class Order
{
    public int OrderId { get; set; }
    public string CustomerName { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime OrderDate { get; set; }
    public string Status { get; set; }
}

var orders = _context.Orders
    .Where(o => o.Status == "Pending") // Filter
    .OrderByDescending(o => o.OrderDate) // Sort
    .Take(50)
    .ToList();
```

```cshtml
<ejs-listview id="orders" dataSource="@ViewBag.Orders" sortOrder="Descending">
    <e-listview-fieldsettings 
        id="OrderId" 
        text="CustomerName" 
        sortBy="OrderDate">
    </e-listview-fieldsettings>
</ejs-listview>
```

### Query with Sorting

```cshtml
<ejs-listview id="list"
    query="new ej.data.Query().from('Products').where('InStock', 'equal', 'true').sortBy('Name', 'Ascending', false).take(30)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name" sortBy="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Complex Filtering and Sorting

```cshtml
<ejs-listview id="complex" sortOrder="Descending"
    query="new ej.data.Query().from('Products').where('CategoryID', 'equal', '3').where('UnitPrice', 'greaterThan', '20').where('Discontinued', 'equal', 'false').sortBy('UnitPrice', 'Descending', false).take(50)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="ProductId" text="ProductName" sortBy="UnitPrice"></e-listview-fieldsettings>
</ejs-listview>
```

## Practical Patterns

### Pattern 1: Searchable Sorted List

```cshtml
<input type="text" id="search" placeholder="Search..." onkeyup="Search()" />
<select id="sortSelect" onchange="ApplySort()">
    <option value="Ascending">Sort: A-Z</option>
    <option value="Descending">Sort: Z-A</option>
</select>

<ejs-listview id="list" dataSource="@ViewBag.Items" sortOrder="Ascending">
    <e-listview-fieldsettings id="Id" text="Name" sortBy="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
let allData = @Html.Raw(JsonConvert.SerializeObject(ViewBag.Items));

function Search() {
    let term = document.getElementById('search').value.toLowerCase();
    let filtered = allData.filter(item => 
        item.Name.toLowerCase().includes(term)
    );
    
    let listView = document.getElementById('list').ej2_instances[0];
    listView.dataSource = filtered;
}

function ApplySort() {
    let sort = document.getElementById('sortSelect').value;
    let listView = document.getElementById('list').ej2_instances[0];
    listView.sortOrder = sort;
}
</script>
```

### Pattern 2: Infinite Scroll with Filter

```cshtml
<div>
    <input type="text" id="category" placeholder="Filter by category..." onchange="ResetScroll()" />
    <div id="loader" style="display: none;">Loading...</div>
</div>

<ejs-listview id="filtered-infinite" height="600" enableVirtualization="true"
    scroll="OnInfiniteScroll">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
let category = '';
let page = 1;

function ResetScroll() {
    category = document.getElementById('category').value;
    page = 1;
    let listView = document.getElementById('filtered-infinite').ej2_instances[0];
    listView.dataSource = [];
    LoadMore();
}

function OnInfiniteScroll(args) {
    if (args.direction === 'down' && args.distanceY < -50) {
        LoadMore();
    }
}

function LoadMore() {
    let url = `/api/items?page=${page}&category=${category}`;
    fetch(url)
        .then(r => r.json())
        .then(data => {
            let listView = document.getElementById('filtered-infinite').ej2_instances[0];
            listView.dataSource = [...listView.dataSource, ...data];
            page++;
        });
}
</script>
```

---

**Related Topics:**
- [Events & Error Handling](events-and-error-handling.md) for scroll event details
- [Field Settings & Configuration](field-settings-and-configuration.md) for sortBy property
- [Getting Started & Data Binding](getting-started-and-data-binding.md) for Query property
