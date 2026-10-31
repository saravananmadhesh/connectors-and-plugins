# Filtering and Grouping — DropDownList (ASP.NET Core)

> **Official Docs:**  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/filtering  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/grouping  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/disabled-items

---

## Filtering

### Enable Basic Filtering

Set `allowFiltering="true"` to show the search box. The `filtering` event is raised as characters are typed, and you can call `e.updateData()` to return filtered results.

```cshtml
<ejs-dropdownlist id="country"
    dataSource="@ViewBag.data"
    placeholder="Select a country"
    allowFiltering="true"
    filtering="onfiltering"
    popupHeight="270px">
    <e-dropdownlist-fields value="Name"></e-dropdownlist-fields>
</ejs-dropdownlist>

<script>
    function onfiltering(e) {
        var query = new ej.data.Query();
        query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
        e.updateData(@Html.Raw(JsonConvert.SerializeObject(ViewBag.data)), query);
    }
</script>
```

---

### Filter Types

The `filterType` property controls matching behavior. Valid values:

| Value | Behavior |
|-------|----------|
| `StartsWith` (default) | Items starting with typed text |
| `Contains` | Items containing typed text |
| `EndsWith` | Items ending with typed text |

Example using `EndsWith` filter type via manual filtering event:

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    query="new ej.data.Query().from('Customers').select(['ContactName'])"
    placeholder="Find a customer"
    allowFiltering="true"
    filtering="onfiltering"
    popupHeight="200px">
    <e-dropdownlist-fields value="ContactName"></e-dropdownlist-fields>
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-dropdownlist>

<script>
    function onfiltering(e) {
        var CBObj = document.getElementById("customers").ej2_instances[0];
        if (e.text == '') {
            e.updateData(CBObj.dataSource);
        } else {
            var query = new ej.data.Query().from('Customers').select(['ContactName', 'CustomerID']).take(6);
            query = (e.text !== '') ? query.where('ContactName', 'endswith', e.text, true) : query;
            e.updateData(CBObj.dataSource, query);
        }
    }
</script>
```

---

### Minimum Filter Character Limit

Prevent remote requests until a minimum number of characters are typed:

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    placeholder="Select a customer"
    popupHeight="200px"
    allowFiltering="true"
    filtering="onfiltering"
    query="new ej.data.Query().from('Customers').select(['ContactName', 'CustomerID']).take(6)">
    <e-dropdownlist-fields value="CustomerID" text="ContactName"></e-dropdownlist-fields>
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-dropdownlist>

<script>
    function onfiltering(e) {
        var CBObj = document.getElementById("customers").ej2_instances[0];
        if (e.text == '' && e.text.length < 3) {
            e.updateData(CBObj.dataSource);
        }
        let query = new ej.data.Query().from('Customers').select(['ContactName', 'CustomerID']).take(6);
        query = (e.text !== '' && e.text.length >= 3) ? query.where('ContactName', 'startswith', e.text, true) : query;
        e.updateData(CBObj.dataSource, query);
    }
</script>
```

---

### Case-Sensitive Filtering

Pass `false` as the fourth parameter of `.where()` to enable case-sensitive filtering. The `ignoreCase` property (default: `true`) controls this globally:

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    allowFiltering="true"
    filtering="onfiltering"
    placeholder="Find a customer"
    popupHeight="200px">
    <e-dropdownlist-fields value="ContactName"></e-dropdownlist-fields>
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-dropdownlist>

<script>
    function onfiltering(e) {
        var CBObj = document.getElementById("customers").ej2_instances[0];
        if (e.text == '') {
            e.updateData(CBObj.dataSource);
        } else {
            // Pass false as 4th arg for case-sensitive filtering
            var query = new ej.data.Query().from('Customers').select(['ContactName', 'CustomerID']).take(6);
            query = query.where('ContactName', 'startswith', e.text, false);
            e.updateData(CBObj.dataSource, query);
        }
    }
</script>
```

---

### Diacritics (Accent-Insensitive) Filtering

Set `ignoreAccent="true"` to ignore diacritics during filtering:

```cshtml
<ejs-dropdownlist id="list"
    dataSource="@ViewBag.data"
    ignoreAccent="true"
    placeholder="e.g: aero">
</ejs-dropdownlist>
```

---

### Debounce Delay

Use `debounceDelay` to reduce filtering frequency while typing (default: 300ms). Set to `0` to disable:

```cshtml
<ejs-dropdownlist id="games"
    dataSource="@ViewBag.data"
    placeholder="Select a game"
    popupHeight="220px"
    allowFiltering="true"
    debounceDelay="300">
</ejs-dropdownlist>
```

---

### Filter Bar Placeholder

Display a placeholder text in the filter search box:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    filterBarPlaceholder="Search items..."
    placeholder="Select an item">
</ejs-dropdownlist>
```

---

## Grouping

### Basic Grouping

Map the `groupBy` field in `<e-dropdownlist-fields>` to group items by category. The group header is displayed both as inline and fixed (sticky) headers:

```cshtml
<ejs-dropdownlist id="vegetables"
    dataSource="@ViewBag.data"
    placeholder="Select a vegetable"
    popupHeight="200px">
    <e-dropdownlist-fields groupBy="Category" value="Vegetable"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<Vegetable>
    {
        new Vegetable { Vegetable = "Cabbage",    Category = "Leafy and Salad" },
        new Vegetable { Vegetable = "Spinach",    Category = "Leafy and Salad" },
        new Vegetable { Vegetable = "Carrot",     Category = "Root Vegetables" },
        new Vegetable { Vegetable = "Beetroot",   Category = "Root Vegetables" },
        new Vegetable { Vegetable = "Pumpkin",    Category = "Gourds" }
    };
    return View();
}
```

---

### Custom Group Header Template

Use the `groupTemplate` property to customize the group header rendering:

```cshtml
<ejs-dropdownlist id="customers"
    dataSource="@ViewBag.data"
    placeholder="Select a customer"
    popupHeight="200px"
    groupTemplate="<strong>${Category}</strong>">
    <e-dropdownlist-fields groupBy="Category" value="Name"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## Disabled Items

### Via Field Mapping

Map a boolean column to `fields.disabled` to disable individual items:

```cshtml
@{
    List<DisableStatusData> status = new List<DisableStatusData>();
    status.Add(new DisableStatusData() { Status = "Open",                   State = false });
    status.Add(new DisableStatusData() { Status = "Waiting for Customer",   State = false });
    status.Add(new DisableStatusData() { Status = "On Hold",                State = true  });
    status.Add(new DisableStatusData() { Status = "Follow-up",              State = false });
    status.Add(new DisableStatusData() { Status = "Closed",                 State = true  });
    status.Add(new DisableStatusData() { Status = "Solved",                 State = false });
    status.Add(new DisableStatusData() { Status = "Feature Request",        State = false });
}

<ejs-dropdownlist id="status"
    dataSource="@status"
    placeholder="Select Status"
    popupHeight="200px">
    <e-dropdownlist-fields value="Status" disabled="State"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

### Disable the Entire Component

Set `enabled="false"` to disable the whole DropDownList:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    enabled="false"
    placeholder="Disabled dropdown">
</ejs-dropdownlist>
```

---

## Sort Order

Control data source sort order with `sortOrder`. Valid values: `None` (default), `Ascending`, `Descending`:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    sortOrder="Ascending"
    placeholder="Select an item">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## Relevant Properties from api.md

| Property | Attribute | Description |
|----------|-----------|-------------|
| `AllowFiltering` | `allowFiltering` | Shows filter search box |
| `FilterType` | `filterType` | `StartsWith`, `Contains`, or `EndsWith` |
| `FilterBarPlaceholder` | `filterBarPlaceholder` | Watermark text in filter bar |
| `DebounceDelay` | `debounceDelay` | Delay (ms) before filtering triggers (default 300) |
| `IgnoreCase` | `ignoreCase` | Case-insensitive search (default `true`) |
| `IgnoreAccent` | `ignoreAccent` | Ignore diacritics when filtering |
| `SortOrder` | `sortOrder` | Sort direction for data source |
| `Fields.GroupBy` | `<e-dropdownlist-fields groupBy="">` | Column to group items by |
| `Fields.Disabled` | `<e-dropdownlist-fields disabled="">` | Column that marks items as disabled |
| `Enabled` | `enabled` | Enable/disable entire component |
| `GroupTemplate` | `groupTemplate` | Custom template for group headers |

## Relevant Events from api.md

| Event | Attribute | Description |
|-------|-----------|-------------|
| `Filtering` | `filtering` | Fires on keypress in filter bar; call `e.updateData()` to return filtered data |
