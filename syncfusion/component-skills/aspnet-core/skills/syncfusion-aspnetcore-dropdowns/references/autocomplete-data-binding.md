# Data Binding – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Fields Mapping](#fields-mapping)
- [Local Data – Array of Strings](#local-data--array-of-strings)
- [Local Data – Array of Objects](#local-data--array-of-objects)
- [Local Data – Complex/Nested Objects](#local-data--complexnested-objects)
- [Remote Data – OData / OData V4](#remote-data--odata--odata-v4)
- [Remote Data – URL Adaptor](#remote-data--url-adaptor)
- [Remote Data – Web API Adaptor](#remote-data--web-api-adaptor)
- [Offline Mode](#offline-mode)

---

## Fields Mapping

The `fields` property maps columns from your data source to the AutoComplete.

| Field | Type | Description |
|---|---|---|
| `value` | string | The field used as the item value |
| `groupBy` | string | The field used to group items |
| `iconCss` | string | The field for icon CSS class |

Configure using the `<e-autocomplete-fields>` child tag:

```cshtml
<e-autocomplete-fields value="Name" groupBy="Category" iconCss="IconClass"></e-autocomplete-fields>
```

> **Important:** When binding complex data, fields must be mapped correctly, otherwise the selected item remains undefined.

---

## Local Data – Array of Strings

Bind a simple string array directly:

```cshtml
@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf", "Hockey", "Tennis" };
}

<ejs-autocomplete id="sports"
    dataSource="sports"
    placeholder="Find a sport">
</ejs-autocomplete>
```

---

## Local Data – Array of Objects

Bind a list of objects and map the display/value field:

**Model:**
```csharp
public class Countries {
    public string Name { get; set; }
    public string Code { get; set; }
}
```

**View:**
```cshtml
@{
    List<Countries> country = new List<Countries> {
        new Countries { Name = "Australia", Code = "AU" },
        new Countries { Name = "Canada", Code = "CA" },
        new Countries { Name = "India", Code = "IN" },
        new Countries { Name = "United States", Code = "US" }
    };
}

<ejs-autocomplete id="country"
    dataSource="@country"
    placeholder="e.g. India"
    popupHeight="220px">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

## Local Data – Complex/Nested Objects

Map a nested property as the value field using dot notation:

**Model:**
```csharp
public class Code { public string Id { get; set; } }
public class Country { public string CountryId { get; set; } }
public class Complex {
    public Country Country { get; set; }
    public Code Code { get; set; }
}
```

**View:**
```cshtml
<ejs-autocomplete id="complexData"
    dataSource="@complexList"
    placeholder="Select a value">
    <e-autocomplete-fields value="Country.CountryId"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

## Remote Data – OData / OData V4

Use `<e-data-manager>` with `ODataV4Adaptor` for OData services:

```cshtml
<ejs-autocomplete id="customers"
    query="new ej.data.Query().from('Customers').select(['ContactName'])"
    placeholder="Find a customer"
    filterType="StartsWith"
    popupHeight="200px">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor"
        crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>
```

The `query` property is used to fetch specific data from the database (e.g., limit fields, filter, take top N records).

---

## Remote Data – URL Adaptor

Use `UrlAdaptor` to bind to a custom server endpoint:

```cshtml
<ejs-autocomplete id="customers"
    placeholder="Find a customer"
    popupHeight="200px">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
    <e-data-manager url="/api/Customers/GetData"
        adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-autocomplete>
```

**Controller:**
```csharp
public IActionResult GetData([FromBody] DataManagerRequest dm)
{
    IEnumerable<Customer> data = _customers;
    DataOperations operation = new DataOperations();
    if (dm.Search != null && dm.Search.Count > 0)
        data = operation.PerformSearching(data, dm.Search);
    if (dm.Where != null && dm.Where.Count > 0)
        data = operation.PerformFiltering(data, dm.Where, dm.Where[0].Operator);
    int count = data.Cast<Customer>().Count();
    if (dm.Skip != 0) data = operation.PerformSkip(data, dm.Skip);
    if (dm.Take != 0) data = operation.PerformTake(data, dm.Take);
    return dm.RequiresCounts ? Json(new { result = data, count }) : Json(data);
}
```

---

## Remote Data – Web API Adaptor

Use `WebApiAdaptor` to bind to a Web API endpoint:

```cshtml
<ejs-autocomplete id="customers"
    placeholder="Find a customer"
    popupHeight="200px">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="/api/Orders"
        adaptor="WebApiAdaptor">
    </e-data-manager>
</ejs-autocomplete>
```

---

## Offline Mode

To avoid round-trips for every filter action, load all data once and process client-side using the `Offline` property of `DataManager`:

```cshtml
<ejs-autocomplete id="customers"
    placeholder="Find a customer"
    popupHeight="200px">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor"
        crossDomain="true"
        offline="true">
    </e-data-manager>
</ejs-autocomplete>
```

With `offline="true"`, all data is fetched once at initialization and all subsequent filtering is done on the client side.
