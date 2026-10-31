# Data Binding & Value Binding in MultiSelect

## Table of Contents
- [Overview](#overview)
- [Fields Mapping](#fields-mapping)
- [Local Data Binding](#local-data-binding)
  - [Array of Strings](#array-of-strings)
  - [Array of Objects](#array-of-objects)
  - [Complex / Nested Objects](#complex--nested-objects)
- [Remote Data Binding](#remote-data-binding)
  - [OData Service](#odata-service)
  - [OData V4 Service](#odata-v4-service)
  - [Web API Adaptor](#web-api-adaptor)
  - [URL Adaptor](#url-adaptor)
  - [Offline Mode](#offline-mode)
- [Value Binding](#value-binding)
  - [Primitive Values](#primitive-values)
  - [Object Values (allowObjectBinding)](#object-values-allowobjectbinding)
- [Preselecting Items via isSelected Field](#preselecting-items-via-isselected-field)
- [Icon Support via iconCss Field](#icon-support-via-iconcss-field)

---

## Overview

MultiSelect loads data via the `dataSource` property which accepts:
- An array of strings or numbers
- An array of objects (requires `fields` mapping)
- A `DataManager` instance (for remote services)

---

## Fields Mapping

Use `<e-multiselect-fields>` to map data columns:

| Field | Purpose |
|-------|---------|
| `text` | Display text in the list |
| `value` | Hidden value stored when selected |
| `groupBy` | Groups items under a category header |
| `iconCss` | CSS class for item icon |
| `disabled` | Boolean field to disable individual items |

```cshtml
<ejs-multiselect id="example" dataSource="@ViewBag.Data">
    <e-multiselect-fields text="Name" value="Id" groupBy="Category" iconCss="IconClass" disabled="IsDisabled">
    </e-multiselect-fields>
</ejs-multiselect>
```

> **Important:** When binding complex data, all fields must be mapped correctly. Unmapped required fields cause `undefined` selections.

---

## Local Data Binding

### Array of Strings

Both `text` and `value` resolve to the same string — no fields mapping needed:

```csharp
// Controller
public IActionResult Index()
{
    ViewBag.Countries = new string[] { "Australia", "Brazil", "Canada", "Denmark", "France" };
    return View();
}
```

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries">
</ejs-multiselect>
```

### Array of Objects

Map `text` and `value` to the correct model properties:

```csharp
public class GameData
{
    public int Id { get; set; }
    public string Game { get; set; }
}

// In controller:
ViewBag.Games = new List<GameData>
{
    new GameData { Id = 1, Game = "Football" },
    new GameData { Id = 2, Game = "Basketball" },
    new GameData { Id = 3, Game = "Cricket" },
    new GameData { Id = 4, Game = "Tennis" },
    new GameData { Id = 5, Game = "Hockey" }
};
```

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

### Complex / Nested Objects

Use dot-notation in fields to access nested properties:

```csharp
public class Country
{
    public CodeData Code { get; set; }
    public CountryInfo CountryInfo { get; set; }
}
public class CodeData { public string Id { get; set; } }
public class CountryInfo { public string CountryId { get; set; } }
```

```cshtml
<ejs-multiselect id="countries" dataSource="@ViewBag.Countries" placeholder="Select">
    <e-multiselect-fields text="Country.CountryId" value="Code.Id"></e-multiselect-fields>
</ejs-multiselect>
```

---

## Remote Data Binding (⚠️ Secure Implementation Required)

**⚠️ SECURITY (W011):** Use **same-origin endpoints only**. Do NOT use `crossDomain="true"` with external third-party services.

Use `<e-data-manager>` inside the MultiSelect tag to bind remote services **via a server-side proxy**.

### OData Service (✅ Secure Server Proxy)

```cshtml
<!-- ✅ SECURE: Same-origin proxy, no crossDomain -->
<ejs-multiselect id="customers"
    placeholder="Select customer"
    allowFiltering="true"
    popupHeight="250px">
    <e-data-manager url="/api/customers"
        adaptor="UrlAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
    <e-multiselect-fields text="ContactName" value="CustomerID"></e-multiselect-fields>
</ejs-multiselect>
```

### OData V4 Service (✅ Secure Server Proxy)

```cshtml
<!-- ✅ SECURE: Same-origin proxy, validated server-side -->
<ejs-multiselect id="orders"
    placeholder="Select order"
    query="new ej.data.Query().from('api/orders').select(['OrderID','ShipName']).take(6)">
    <e-data-manager url="/api/orders"
        adaptor="UrlAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
    <e-multiselect-fields text="ShipName" value="OrderID"></e-multiselect-fields>
</ejs-multiselect>
```

### Web API Adaptor (✅ Secure Same-Origin)

```cshtml
<!-- ✅ SECURE: Same-origin Web API endpoint -->
<ejs-multiselect id="employees"
    placeholder="Select employee"
    allowFiltering="true">
    <e-data-manager url="/api/employees"
        adaptor="WebApiAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
    <e-multiselect-fields text="Name" value="EmployeeId"></e-multiselect-fields>
</ejs-multiselect>
```

**Corresponding Web API controller (C# — ✅ Validates & Sanitizes):**
```csharp
[HttpGet]
public IActionResult Get([FromQuery] DataManagerRequest dm)
{
    // ✅ Server-side validation & sanitization
    int skipVal = Math.Max(0, dm.Skip);
    int takeVal = Math.Min(100, dm.Take > 0 ? dm.Take : 10);
    
    var data = _context.Employees
        .AsNoTracking()
        .Skip(skipVal)
        .Take(takeVal)
        .ToList();
    var count = _context.Employees.Count();
    return Json(new { result = data, count = count });
}
```

### URL Adaptor (✅ Secure Same-Origin)

```cshtml
<!-- ✅ SECURE: Same-origin endpoint -->
<ejs-multiselect id="products"
    placeholder="Select product">
    <e-data-manager url="/api/products"
        adaptor="UrlAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
    <e-multiselect-fields text="ProductName" value="ProductId"></e-multiselect-fields>
</ejs-multiselect>
```

**Server action (C# — ✅ Validates & Paginates):**
```csharp
[HttpPost]
public IActionResult GetProducts([FromBody] DataManagerRequest dm)
{
    // ✅ Validate pagination parameters
    int skipVal = Math.Max(0, dm.Skip);
    int takeVal = Math.Min(100, dm.Take > 0 ? dm.Take : 10);
    
    var data = ProductService.GetAll()
        .Skip(skipVal)
        .Take(takeVal)
        .ToList();
    var count = ProductService.GetAll().Count();
    
    var dataSource = dm.RequiresCounts 
        ? new DataResult { result = data, count = count }
        : (object)data;
    return Json(dataSource);
}
```

### Offline Mode (✅ Safe for Small Datasets)

Load all remote data once and process client-side (avoids repeated server calls):

```cshtml
<!-- ✅ SECURE: Same-origin proxy, offline mode for performance -->
<ejs-multiselect id="customers"
    placeholder="Select customer"
    allowFiltering="true">
    <e-data-manager url="/api/customers"
        adaptor="UrlAdaptor"
        offline="true">  <!-- Safe only with same-origin data -->
    </e-data-manager>
    <e-multiselect-fields text="ContactName" value="CustomerID"></e-multiselect-fields>
</ejs-multiselect>
```

> **Use offline mode** when the dataset is small enough to load entirely and you want filtering/sorting done client-side without round trips.

---

## Value Binding

### Primitive Values

Pre-select items by passing primitive values to the `value` property:

```cshtml
@{
    // String values
    var selectedCountries = new string[] { "Australia", "Brazil" };
    
    // Integer values  
    var selectedIds = new int[] { 1, 3, 5 };
}

<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    value="@selectedIds"
    placeholder="Select countries">
    <e-multiselect-fields text="Name" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

Supported primitive types: `string`, `number`, `boolean`, `null`.

### Object Values (allowObjectBinding)

When `allowObjectBinding="true"`, the `value` property stores full objects instead of just the value field:

```csharp
public class GameData
{
    public int Id { get; set; }
    public string Game { get; set; }
}

// Pre-selected objects
ViewBag.SelectedGames = new List<GameData>
{
    new GameData { Id = 1, Game = "Football" },
    new GameData { Id = 3, Game = "Cricket" }
};
```

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    value="@ViewBag.SelectedGames"
    allowObjectBinding="true"
    placeholder="Select games">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

> **Use `allowObjectBinding`** when you need the full selected object (not just its ID) in JavaScript callbacks or downstream processing.

---

## Preselecting Items via isSelected Field

Use a boolean field in the data source to mark items as pre-selected. Handle selection via the `dataBound` event:

```csharp
public class CountryData
{
    public string Name { get; set; }
    public string Code { get; set; }
    public bool IsSelected { get; set; }
}

ViewBag.Countries = new List<CountryData>
{
    new CountryData { Name = "Australia", Code = "AU", IsSelected = true },
    new CountryData { Name = "Brazil",    Code = "BR", IsSelected = false },
    new CountryData { Name = "Canada",    Code = "CA", IsSelected = true }
};
```

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    value="@(new string[]{})"
    dataBound="onDataBound"
    placeholder="Select countries">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>

<script>
var preSelectedValues = [];

function onDataBound() {
    var multiObj = document.getElementById('countries').ej2_instances[0];
    var data = multiObj.dataSource;
    data.forEach(function(item) {
        if (item.IsSelected) {
            preSelectedValues.push(item.Code);
        }
    });
    multiObj.value = preSelectedValues;
}
</script>
```

---

## Icon Support via iconCss Field

Display icons alongside list items by mapping an `iconCss` field:

```csharp
public class SocialData
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string IconClass { get; set; }
}

ViewBag.Social = new List<SocialData>
{
    new SocialData { Id = "twitter",   Name = "Twitter",   IconClass = "sf-icon-twitter" },
    new SocialData { Id = "facebook",  Name = "Facebook",  IconClass = "sf-icon-facebook" },
    new SocialData { Id = "linkedin",  Name = "LinkedIn",  IconClass = "sf-icon-linkedin" }
};
```

```cshtml
<ejs-multiselect id="social"
    dataSource="@ViewBag.Social"
    placeholder="Select social networks"
    mode="Box">
    <e-multiselect-fields text="Name" value="Id" iconCss="IconClass"></e-multiselect-fields>
</ejs-multiselect>
```

> Icon CSS classes must be defined in your stylesheet. Syncfusion provides built-in icon fonts via the EJ2 theme CSS.

---

## See Also

- [Filtering](filtering.md) — Search within bound data
- [Grouping & Virtualization](grouping-and-virtualization.md) — Group items and handle large datasets
- [Templates & Customization](templates-and-customization.md) — Customize list item rendering
