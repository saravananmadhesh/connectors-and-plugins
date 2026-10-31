# Advanced Scenarios — DropDownList (ASP.NET Core)

> **Official Docs:**  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/virtual-scroll  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/resize  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/filtering  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/data-binding

---

## Virtual Scrolling (Virtualization)

Virtual scrolling renders only a fixed number of DOM elements and recycles them during scroll, making large datasets performant. Enable it with `enableVirtualization="true"`.

### Local Data with Virtualization

```cshtml
<ejs-dropdownlist id="records"
    dataSource="@ViewBag.data"
    placeholder="Select an item"
    allowFiltering="false"
    enableVirtualization="true"
    popupHeight="200px">
    <e-dropdownlist-fields value="ID" text="Text"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

**Controller:**
```csharp
public IActionResult Index()
{
    var data = Enumerable.Range(1, 10000).Select(i => new { ID = i, Text = $"Item {i}" }).ToList();
    ViewBag.data = data;
    return View();
}
```

---

### Remote Data with Virtualization (⚠️ Secure Same-Origin Only)

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<!-- ✅ SECURE: Same-origin API endpoint -->
<ejs-dropdownlist id="records"
    placeholder="Select an item"
    allowFiltering="true"
    enableVirtualization="true"
    popupHeight="200px">
    <e-data-manager adaptor="WebApiAdaptor"
                    url="/api/records">  <!-- Same-origin, no crossDomain -->
    </e-data-manager>
    <e-dropdownlist-fields text="OrderID" value="OrderID"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

### Virtualization with Grouping

```cshtml
<ejs-dropdownlist id="records"
    dataSource="@ViewBag.data"
    placeholder="Select an item"
    allowFiltering="true"
    enableVirtualization="true"
    popupHeight="200px">
    <e-dropdownlist-fields groupBy="Group" value="ID" text="Text"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

### Customizing Items Count in Virtualization

Use the `query` property or the `actionBegin` event to control how many items are fetched per page:

```cshtml
<ejs-dropdownlist id="records"
    dataSource="@ViewBag.data"
    query="new ej.data.Query().take(40)"
    actionBegin="onbegin"
    placeholder="Select an item"
    allowFiltering="false"
    enableVirtualization="true"
    popupHeight="200px">
    <e-dropdownlist-fields value="ID" text="Text"></e-dropdownlist-fields>
</ejs-dropdownlist>

<script>
    function onbegin(e) {
        e.query = new ej.data.Query().take(45);
    }
</script>
```

> **Note:** When `enableVirtualization` is `true`, `skip` and `take` from the initial `query` are internally managed. The user-provided `take` is only considered if it is greater than the minimum items that fit the popup.

---

## Popup Resize

Allow users to dynamically resize the popup using `allowResize="true"`. A resize handle appears in the bottom-right corner:

```cshtml
@{
    List<PopupResizeData> status = new List<PopupResizeData>();
    status.Add(new PopupResizeData() { Status = "Open",             State = false });
    status.Add(new PopupResizeData() { Status = "On Hold",          State = true  });
    status.Add(new PopupResizeData() { Status = "Follow-up",        State = false });
    status.Add(new PopupResizeData() { Status = "Closed",           State = true  });
    status.Add(new PopupResizeData() { Status = "Solved",           State = false });
    status.Add(new PopupResizeData() { Status = "Feature Request",  State = false });
    status.Add(new PopupResizeData() { Status = "In Progress",      State = false });
    status.Add(new PopupResizeData() { Status = "Pending",          State = true  });
}

<ejs-dropdownlist id="status"
    dataSource="@status"
    allowResize="true"
    placeholder="Select Status"
    popupHeight="200px"
    resizeStart="onResizeStart"
    resizeStop="onResizeStop"
    resizing="onResizing">
    <e-dropdownlist-fields value="Status"></e-dropdownlist-fields>
</ejs-dropdownlist>

<script>
    function onResizeStart(args) {
        console.log('Resize started');
    }
    function onResizeStop(args) {
        console.log('Resize stopped. Width:', args.event.target.style.width);
    }
    function onResizing(args) {
        console.log('Resizing...');
    }
</script>
```

---

## Cascading Dropdowns (⚠️ Secure Server-Side Proxy)

Load the second dropdown's data dynamically based on the first dropdown's selection using the `change` event and a **same-origin server proxy** (W011 mitigation).

**⚠️ SECURITY (W011):** Use server-side endpoints only; validate and sanitize all remote data.

**Models:**
```csharp
public class Country { public int Id { get; set; } public string Name { get; set; } }
public class City    { public int Id { get; set; } public string Name { get; set; } public int CountryId { get; set; } }
```

**Controller (✅ Secure Server Proxy):**
```csharp
public IActionResult Index()
{
    ViewBag.Countries = new List<Country>
    {
        new Country { Id = 1, Name = "USA" },
        new Country { Id = 2, Name = "Canada" },
        new Country { Id = 3, Name = "Mexico" }
    };
    return View();
}

// ✅ SECURE: Validates countryId and returns only whitelisted data
[HttpGet("api/cities/{countryId}")]
public IActionResult GetCities(int countryId)
{
    // Input validation: reject invalid IDs
    if (countryId <= 0 || countryId > 1000)
        return BadRequest("Invalid country ID");
    
    var cities = new List<City>
    {
        new City { Id = 1, Name = "New York",    CountryId = 1 },
        new City { Id = 2, Name = "Los Angeles", CountryId = 1 },
        new City { Id = 3, Name = "Toronto",     CountryId = 2 },
        new City { Id = 4, Name = "Vancouver",   CountryId = 2 }
    };
    
    // Return only safe, schema-validated data
    return Json(cities.Where(c => c.CountryId == countryId)
        .Select(c => new { c.Id, c.Name })
        .ToList());
}
```

**View (✅ Secure Client):**
```cshtml
<ejs-dropdownlist id="Country"
    dataSource="@ViewBag.Countries"
    change="onCountryChange"
    placeholder="Select country">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>

<ejs-dropdownlist id="City"
    placeholder="Select city">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>

<script>
    function onCountryChange(args) {
        var cityDDL = document.getElementById('City').ej2_instances[0];
        if (args.value) {
            // ✅ SECURE: Fetch from same-origin endpoint only
            fetch("/api/cities/" + encodeURIComponent(args.value), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin'  // Include CSRF tokens via cookies
            })
            .then(response => {
                if (!response.ok) throw new Error('Server error: ' + response.status);
                return response.json();
            })
            .then(data => {
                // Validate response is array before binding
                if (Array.isArray(data)) {
                    cityDDL.dataSource = data;
                    cityDDL.value = null;
                } else {
                    console.error('Invalid data format');
                    cityDDL.dataSource = [];
                }
            })
            .catch(error => {
                console.error('Failed to load cities:', error);
                cityDDL.dataSource = [];
            });
        } else {
            cityDDL.dataSource = [];
        }
    }
</script>
```

---

## Remote Data with AllowFiltering (⚠️ Secure Same-Origin Only)

Combine remote data binding with filtering for a searchable dropdown using **same-origin endpoints** (W011 mitigation).

**⚠️ SECURITY (W011):** Remove `crossDomain="true"` and external adaptor URLs.

```cshtml
<!-- ✅ SECURE: Same-origin API endpoint with UrlAdaptor -->
<ejs-dropdownlist id="customers"
    allowFiltering="true"
    filtering="onfiltering"
    query="new ej.data.Query().from('api/customers').select(['ContactName', 'CustomerID']).take(6)"
    placeholder="Select a customer"
    popupHeight="200px">
    <e-dropdownlist-fields text="ContactName" value="CustomerID"></e-dropdownlist-fields>
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor">  <!-- Same-origin, no crossDomain -->
    </e-data-manager>
</ejs-dropdownlist>

<script>
    function onfiltering(e) {
        var ddlObj = document.getElementById("customers").ej2_instances[0];
        if (e.text === '') {
            e.updateData(ddlObj.dataSource);
        } else {
            var query = new ej.data.Query()
                .from('api/customers')
                .select(['ContactName', 'CustomerID'])
                .take(6)
                .where('ContactName', 'startswith', e.text, true);
            e.updateData(ddlObj.dataSource, query);
        }
    }
</script>
```

**Server-Side Proxy (C#):**
```csharp
[HttpGet("api/customers")]
public IActionResult GetCustomers([FromQuery] string skip = "0", [FromQuery] string take = "6", [FromQuery] string where = "")
{
    int skipVal = Math.Max(0, int.TryParse(skip, out var s) ? s : 0);
    int takeVal = Math.Min(50, int.TryParse(take, out var t) && t > 0 ? t : 6);
    
    // Server validates and filters data
    var customers = _context.Customers
        .AsNoTracking()
        .Select(c => new { c.CustomerID, c.ContactName })
        .Skip(skipVal)
        .Take(takeVal)
        .ToList();
    
    return Ok(new { d = customers, count = customers.Count });
}
```

---

## Pre-selecting a Value Programmatically

Use the `value` property in the tag helper or set it via JavaScript after initialization:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    value="@ViewBag.selectedId"
    placeholder="Select an item">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

Or via JavaScript:
```javascript
var ddl = document.getElementById('ddl').ej2_instances[0];
ddl.value = 3; // Set by value
ddl.text = "Cricket"; // Or set by text
ddl.index = 2; // Or set by index (0-based)
```

---

## Show Clear Button

Allow users to clear the selected value with `showClearButton`:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    showClearButton="true"
    placeholder="Select an item">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## Using HtmlAttributes

Pass additional HTML attributes using `htmlAttributes`:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    htmlAttributes='new Dictionary<string, object> { { "title", "Select an item" }, { "name", "myDropdown" } }'
    placeholder="Select an item">
</ejs-dropdownlist>
```

---

## Event Handling Reference

All available events for use in advanced scenarios:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    change="onChange"
    select="onSelect"
    open="onOpen"
    close="onClose"
    beforeOpen="onBeforeOpen"
    created="onCreated"
    destroyed="onDestroyed"
    focus="onFocus"
    blur="onBlur"
    dataBound="onDataBound"
    actionBegin="onActionBegin"
    actionComplete="onActionComplete"
    actionFailure="onActionFailure"
    filtering="onFiltering">
</ejs-dropdownlist>

<script>
    function onChange(args)        { console.log('Changed:', args.value); }
    function onSelect(args)        { console.log('Selected:', args.itemData); }
    function onOpen(args)          { console.log('Popup opened'); }
    function onClose(args)         { console.log('Popup closed'); }
    function onBeforeOpen(args)    { console.log('Before popup open'); }
    function onCreated()           { console.log('Component created'); }
    function onDestroyed()         { console.log('Component destroyed'); }
    function onFocus(args)         { console.log('Focused'); }
    function onBlur(args)          { console.log('Blurred'); }
    function onDataBound(args)     { console.log('Data bound'); }
    function onActionBegin(args)   { console.log('Action begin'); }
    function onActionComplete(args){ console.log('Action complete'); }
    function onActionFailure(args) { console.log('Action failure'); }
    function onFiltering(e)        { /* Custom filter logic */ }
</script>
```

---

## Relevant Properties from api.md

| Property | Attribute | Description |
|----------|-----------|-------------|
| `EnableVirtualization` | `enableVirtualization` | Enable virtual scrolling for large datasets |
| `AllowResize` | `allowResize` | Allow users to resize the popup |
| `AllowFiltering` | `allowFiltering` | Show filter search bar |
| `ShowClearButton` | `showClearButton` | Show button to clear selection |
| `Value` | `value` | Selected value |
| `Text` | `text` | Selected display text |
| `Index` | `index` | Selected item index (0-based) |
| `Query` | `query` | Custom data query |
| `AllowObjectBinding` | `allowObjectBinding` | Bind entire object as value |
| `HtmlAttributes` | `htmlAttributes` | Additional HTML attributes |
| `ZIndex` | `zIndex` | Popup z-index (default `1000`) |

## Relevant Events from api.md

| Event | Attribute | Description |
|-------|-----------|-------------|
| `Change` | `change` | Fires when value changes |
| `Select` | `select` | Fires when an item is selected in popup |
| `Open` | `open` | Fires when popup opens |
| `Close` | `close` | Fires when popup closes |
| `BeforeOpen` | `beforeOpen` | Fires before popup opens |
| `Created` | `created` | Fires when component is created |
| `Destroyed` | `destroyed` | Fires when component is destroyed |
| `Focus` | `focus` | Fires on focus |
| `Blur` | `blur` | Fires on blur |
| `DataBound` | `dataBound` | Fires when data is bound to popup |
| `ActionBegin` | `actionBegin` | Fires before remote data fetch |
| `ActionComplete` | `actionComplete` | Fires after remote data fetch |
| `ActionFailure` | `actionFailure` | Fires when remote fetch fails |
| `Filtering` | `filtering` | Fires on filter bar keypress |
| `ResizeStart` | `resizeStart` | Fires when popup resize begins |
| `ResizeStop` | `resizeStop` | Fires when popup resize ends |
| `Resizing` | `resizing` | Fires continuously during popup resize |
