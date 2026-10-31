# Popup Resizing

Enable users to dynamically adjust the ComboBox dropdown size using the `AllowResize` property. Resized dimensions persist across sessions, providing a consistent user experience.

---

## Enable Popup Resizing

**Controller:**
```csharp
public ActionResult Index()
{
    List<string> statusList = new List<string>
    {
        "Open",
        "In Progress",
        "Closed",
        "On Hold",
        "Resolved",
        "Pending"
    };
    ViewBag.StatusList = statusList;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="status-combo"
    dataSource="ViewBag.StatusList"
    allowResize="true"
    placeholder="Select a status">
</ejs-combobox>
```

**User Experience:**
- Hover over popup edges to see resize handles
- Drag edges/corners to resize dropdown
- New size automatically remembered
- Applied to all future popups

---

## Resizing with Data Objects

**Controller:**
```csharp
public class StatusData
{
    public string Status { get; set; }
    public bool State { get; set; }
}

public ActionResult Index()
{
    List<StatusData> statusData = new List<StatusData>
    {
        new StatusData { Status = "Open", State = false },
        new StatusData { Status = "Waiting for Customer", State = false },
        new StatusData { Status = "On Hold", State = true },
        new StatusData { Status = "Follow-up", State = false },
        new StatusData { Status = "Closed", State = true },
        new StatusData { Status = "Pending", State = true }
    };
    ViewBag.StatusData = statusData;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="status-combo"
    dataSource="ViewBag.StatusData"
    allowResize="true"
    placeholder="Select Status">
    <e-combobox-fields text="Status" value="Status"></e-combobox-fields>
</ejs-combobox>
```

---

## Use Cases

### Use Case 1: Long Content Display

When items have long text, allow resizing for better readability:

**Controller:**
```csharp
public ActionResult Index()
{
    List<string> longItems = new List<string>
    {
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "Ut enim ad minim veniam, quis nostrud exercitation"
    };
    ViewBag.LongItems = longItems;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="text-combo"
    dataSource="ViewBag.LongItems"
    allowResize="true"
    popupHeight="250px"
    popupWidth="300px"
    placeholder="Resizable popup for long content">
</ejs-combobox>
```

### Use Case 2: Custom Templates with Rich Content

Resizing helpful when using complex templates:

**Controller:**
```csharp
public class ProductData
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string Price { get; set; }
}

public ActionResult Index()
{
    List<ProductData> products = new List<ProductData>
    {
        new ProductData { Name = "Product A", Description = "High-performance component", Price = "$299" },
        new ProductData { Name = "Product B", Description = "Enterprise-grade solution", Price = "$599" },
        new ProductData { Name = "Product C", Description = "Budget-friendly option", Price = "$99" }
    };
    ViewBag.Products = products;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="product-combo"
    dataSource="ViewBag.Products"
    allowResize="true"
    itemTemplate="#productTemplate"
    popupHeight="350px">
    <e-combobox-fields text="Name" value="Name"></e-combobox-fields>
</ejs-combobox>

<script id="productTemplate" type="text/x-template">
    <div class="product-item">
        <div class="product-name">${Name}</div>
        <div class="product-desc">${Description}</div>
        <div class="product-price">${Price}</div>
    </div>
</script>

<style>
    .product-item {
        padding: 12px;
        border-bottom: 1px solid #eee;
    }
    
    .product-name {
        font-weight: bold;
        margin-bottom: 4px;
    }
    
    .product-desc {
        font-size: 12px;
        color: #666;
        margin-bottom: 4px;
    }
    
    .product-price {
        color: #0066cc;
        font-weight: bold;
    }
</style>
```

---

## Configuration Options

### Resize Constraints

You can set minimum and maximum dimensions for the resizable popup:

**View (Razor):**
```html
<ejs-combobox id="combo"
    dataSource="ViewBag.Items"
    allowResize="true"
    popupHeight="200px"
    popupWidth="250px"
    placeholder="Min: 200px, Max: 500px">
</ejs-combobox>
```

### Resize Behavior

When `allowResize` is enabled:
- **Initial size**: Determined by `popupHeight` and `popupWidth` properties
- **Resize handles**: Appear on popup borders and corners on hover
- **Persistence**: Browser stores size in session storage
- **Reset**: User can drag popup back to default size

### Best Practices

1. **Set reasonable defaults**: Initialize with `popupHeight` and `popupWidth`
2. **Responsive design**: Test on mobile where resize may be limited
3. **Content consideration**: Ensure resizable content is readable at all sizes
4. **User guidance**: Consider adding help text about resize functionality
