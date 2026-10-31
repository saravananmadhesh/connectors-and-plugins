# Data Binding — DropDownList (ASP.NET Core)

> **Official Docs:**  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/data-binding  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/value-binding

---

## Overview

The DropDownList loads data using the `dataSource` property. It supports:
- Array of primitive values (strings, numbers)
- Array of JSON objects
- Complex/nested data objects
- Remote data via `DataManager` (OData, OData V4, Web API, URL Adaptor)

Field mapping is done using `<e-dropdownlist-fields>` tag helper with sub-properties: `text`, `value`, `groupBy`, `iconCss`, `disabled`.

---

## 1. Array of Simple Data (Strings / Numbers)

When binding primitive data, both `text` and `value` act the same — no field mapping is needed.

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf" };
    return View();
}
```

**View:**
```cshtml
<ejs-dropdownlist id="games"
    dataSource="@ViewBag.data"
    placeholder="Select a game"
    popupHeight="220px">
</ejs-dropdownlist>
```

---

## 2. Array of JSON Objects

Map the appropriate columns using the `fields` property.

**Model:**
```csharp
public class Vegetable
{
    public string Vegetable { get; set; }
    public string Category { get; set; }
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<Vegetable>
    {
        new Vegetable { Vegetable = "Cabbage", Category = "Leafy and Salad" },
        new Vegetable { Vegetable = "Spinach", Category = "Leafy and Salad" },
        new Vegetable { Vegetable = "Wheat grass", Category = "Leafy and Salad" },
        new Vegetable { Vegetable = "Yarrow", Category = "Leafy and Salad" },
        new Vegetable { Vegetable = "Pumpkins", Category = "Leafy and Salad" }
    };
    return View();
}
```

**View:**
```cshtml
<ejs-dropdownlist id="vegetable"
    dataSource="@ViewBag.data"
    placeholder="Select a vegetable"
    popupHeight="220px">
    <e-dropdownlist-fields value="Vegetable"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## 3. Array of Complex / Nested Data

Map nested property paths in the `fields` using dot notation.

**View:**
```cshtml
<ejs-dropdownlist id="countries"
    dataSource="@ViewBag.data"
    placeholder="Select a country"
    popupHeight="220px">
    <e-dropdownlist-fields text="Country.CountryId" value="Code.Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## 4. Value Binding — Primitive Types

Pre-select a value using the `value` property.

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new string[] { "Apple", "Banana", "Mango", "Orange" };
    ViewBag.value = "Banana";
    return View();
}
```

**View:**
```cshtml
<ejs-dropdownlist id="records"
    dataSource="@ViewBag.data"
    value="@ViewBag.value"
    placeholder="Select an item"
    popupHeight="200px">
</ejs-dropdownlist>
```

---

## 5. Value Binding — Object Types (allowObjectBinding)

When `allowObjectBinding` is `true`, the `value` property holds the entire selected object.

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<Vegetable> { /* ... */ };
    ViewBag.value = new { ID = "1", Text = "Cabbage" };
    return View();
}
```

**View:**
```cshtml
<ejs-dropdownlist id="records"
    dataSource="@ViewBag.data"
    value="@ViewBag.value"
    placeholder="Select an item"
    allowObjectBinding="true"
    popupHeight="200px">
    <e-dropdownlist-fields value="ID" text="Text"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## 6. Remote Data — OData V4 (⚠️ Secure Implementation Required)

**⚠️ SECURITY (W011):** Do NOT use `crossDomain="true"` with external third-party endpoints. Always proxy through your own server.

**SECURE Pattern:**
```cshtml
<!-- ✅ Use same-origin proxy, NOT external OData -->
<ejs-dropdownlist id="customers"
    query="new ej.data.Query().from('api/customers').select(['ContactName', 'CustomerID']).take(6)"
    placeholder="Select a customer"
    popupHeight="200px">
    <e-dropdownlist-fields text="ContactName" value="CustomerID"></e-dropdownlist-fields>
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
</ejs-dropdownlist>
```

**Server-Side Proxy (C#):**
```csharp
[HttpGet("api/customers")]
public IActionResult GetCustomers([FromQuery] string skip = "0", [FromQuery] string take = "6")
{
    int skipVal = Math.Max(0, int.TryParse(skip, out var s) ? s : 0);
    int takeVal = Math.Min(50, int.TryParse(take, out var t) && t > 0 ? t : 6);
    
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

## 7. Remote Data — OData (⚠️ Secure Implementation Required)

**⚠️ SECURITY (W011):** Same restriction — use server proxy, not external OData endpoints.

**SECURE Pattern:**
```cshtml
<!-- ✅ Proxy through same-origin API -->
<ejs-dropdownlist id="customers"
    placeholder="Select a customer"
    query="new ej.data.Query().select(['CustomerID']).take(7)">
    <e-dropdownlist-fields value="CustomerID"></e-dropdownlist-fields>
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
</ejs-dropdownlist>
```

---

## 8. Remote Data — URL Adaptor (⚠️ Secure Implementation Required)

**⚠️ SECURITY (W011):** Remove `crossDomain="true"` and use only same-origin endpoints.

**SECURE Pattern:**
```cshtml
<!-- ✅ Same-origin endpoint only -->
<ejs-dropdownlist id="country" placeholder="Select a Country">
    <e-data-manager adaptor="UrlAdaptor"
                    url="/api/countries">  <!-- No crossDomain, same-origin only -->
    </e-data-manager>
    <e-dropdownlist-fields value="ShipCountry"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## 9. Remote Data — Web API Adaptor (⚠️ Secure Implementation Required)

**⚠️ SECURITY (W011):** Use only same-origin Web API endpoints.

**SECURE Pattern:**
```cshtml
<!-- ✅ Same-origin Web API endpoint -->
<ejs-dropdownlist id="games">
    <e-data-manager url="/api/games" adaptor="WebApiAdaptor"></e-data-manager>
</ejs-dropdownlist>
```

---

## 10. Offline Mode (Load All Data at Once)

Setting `offline="true"` on the DataManager loads all data on initialization and processes actions client-side.

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    placeholder="Select a customer"
    query="new ej.data.Query().select(['CustomerID']).take(7)">
    <e-dropdownlist-fields value="CustomerID"></e-dropdownlist-fields>
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor"
                    offline="true">
    </e-data-manager>
</ejs-dropdownlist>
```

---

## Field Mapping Quick Reference

```cshtml
<e-dropdownlist-fields
    text="DisplayName"
    value="UniqueId"
    groupBy="CategoryName"
    iconCss="IconClass"
    disabled="IsDisabled">
</e-dropdownlist-fields>
```

---

## Relevant Properties from api.md

| Property | Attribute | Description |
|----------|-----------|-------------|
| `DataSource` | `dataSource` | Local array or DataManager instance |
| `Fields` | `<e-dropdownlist-fields>` | Maps text, value, groupBy, iconCss, disabled columns |
| `Value` | `value` | Pre-selected value |
| `Text` | `text` | Display text of the selected item |
| `Index` | `index` | Index of the selected item |
| `Query` | `query` | Custom query for remote data |
| `AllowObjectBinding` | `allowObjectBinding` | Bind full object as selected value |

## Relevant Events from api.md

| Event | Attribute | Description |
|-------|-----------|-------------|
| `ActionBegin` | `actionBegin` | Fires before remote data fetch begins |
| `ActionComplete` | `actionComplete` | Fires after remote data fetch completes |
| `ActionFailure` | `actionFailure` | Fires when remote data fetch fails |
| `DataBound` | `dataBound` | Fires when data source is populated in popup |
| `Change` | `change` | Fires when selected value changes |
