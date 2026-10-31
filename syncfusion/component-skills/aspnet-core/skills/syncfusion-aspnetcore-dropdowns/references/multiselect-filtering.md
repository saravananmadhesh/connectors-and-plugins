# Filtering in MultiSelect

## Table of Contents
- [Enable Filtering](#enable-filtering)
- [Filter Types](#filter-types)
- [Custom Filtering via Event](#custom-filtering-via-event)
- [Minimum Character Threshold](#minimum-character-threshold)
- [Case-Sensitive Filtering](#case-sensitive-filtering)
- [Diacritics (Accent) Filtering](#diacritics-accent-filtering)
- [Debounce Delay](#debounce-delay)
- [Filter Bar Placeholder](#filter-bar-placeholder)
- [Remote Data Filtering](#remote-data-filtering)

---

## Enable Filtering

Set `allowFiltering="true"` to show a search box inside the popup:

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries"
    allowFiltering="true"
    filterBarPlaceholder="Search...">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>
```

Filtering starts as soon as the user types in the search box.

---

## Filter Types

Control how matching is performed using `filterType`:

| Value | Behavior |
|-------|----------|
| `StartsWith` (default) | Items starting with the typed text |
| `EndsWith` | Items ending with the typed text |
| `Contains` | Items containing the typed text anywhere |

```cshtml
<!-- Contains filter: matches anywhere in the text -->
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries"
    allowFiltering="true"
    filterType="Contains">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>

<!-- EndsWith filter -->
<ejs-multiselect id="countries2"
    dataSource="@ViewBag.Countries"
    allowFiltering="true"
    filterType="EndsWith">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>
```

> The `filterType` property applies to local data. For remote data, filtering logic is controlled in the `filtering` event handler.

---

## Custom Filtering via Event

Use the `filtering` event to intercept and customize filter logic. Call `updateData` with your filtered results:

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries"
    allowFiltering="true"
    filtering="onFiltering">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>

<script>
var fullData = @Html.Raw(Json.Serialize(ViewBag.Countries));

function onFiltering(args) {
    var query = new ej.data.Query();
    // Apply custom filter: Contains, case-insensitive
    query = (args.text !== '') 
        ? query.where('Name', 'contains', args.text, true) 
        : query;
    args.updateData(fullData, query);
}
</script>
```

---

## Minimum Character Threshold (⚠️ Secure Same-Origin Only)

**⚠️ SECURITY (W011):** Use same-origin endpoints only, no `crossDomain="true"`.

Prevent remote requests until the user has typed a minimum number of characters. Validate inside the `filtering` event:

```cshtml
<!-- ✅ SECURE: Same-origin endpoint, validated server-side -->
<ejs-multiselect id="customers"
    placeholder="Type at least 3 characters"
    allowFiltering="true"
    filtering="onFilteringWithLimit">
    <e-data-manager url="/api/customers"
        adaptor="UrlAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
    <e-multiselect-fields text="ContactName" value="CustomerID"></e-multiselect-fields>
</ejs-multiselect>

<script>
function onFilteringWithLimit(args) {
    // Only query server after 3 characters typed (client-side safeguard)
    if (args.text.length < 3) return;

    var query = new ej.data.Query();
    query = query.where('ContactName', 'startswith', args.text, true);
    args.updateData(args.dataSource, query);
}
</script>
```

**Server-Side Proxy (C# — ✅ Validates & Limits):**
```csharp
[HttpGet("api/customers")]
public IActionResult GetCustomers([FromQuery] string where = "", [FromQuery] string skip = "0", [FromQuery] string take = "10")
{
    // ✅ Server-side validation
    int skipVal = Math.Max(0, int.TryParse(skip, out var s) ? s : 0);
    int takeVal = Math.Min(50, int.TryParse(take, out var t) && t > 0 ? t : 10);
    
    var customers = _context.Customers
        .AsNoTracking()
        .Where(c => string.IsNullOrEmpty(where) || c.ContactName.Contains(where))
        .Skip(skipVal)
        .Take(takeVal)
        .ToList();
    
    return Ok(customers);
}
```

---

## Case-Sensitive Filtering

By default filtering is case-insensitive (`ignoreCase="true"`). Enable case-sensitive filtering:

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    allowFiltering="true"
    ignoreCase="false">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>
```

Or handle it inside the `filtering` event using DataManager's `where` clause with the fourth parameter:

```javascript
function onFiltering(args) {
    var query = new ej.data.Query();
    // Fourth parameter `false` = case-sensitive
    query = query.where('Name', 'contains', args.text, false);
    args.updateData(fullData, query);
}
```

---

## Diacritics (Accent) Filtering

Enable `ignoreAccent="true"` so that accented characters (é, ü, ñ, etc.) match their unaccented counterparts:

```cshtml
@{
    var diacriticData = new string[] { "Åland", "Bâle-Ville", "Čechy", "Délémont", "España" };
}

<ejs-multiselect id="regions"
    dataSource="@diacriticData"
    placeholder="Search regions"
    allowFiltering="true"
    ignoreAccent="true">
</ejs-multiselect>
```

Example: Typing "espan" will match "España".

---

## Debounce Delay

Control how long the component waits after the user stops typing before triggering filtering. Default is `300ms`:

```cshtml
<!-- Reduce to 100ms for faster response on fast networks -->
<ejs-multiselect id="customers"
    dataSource="@ViewBag.Customers"
    allowFiltering="true"
    debounceDelay="100">
    <e-multiselect-fields text="Name" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<!-- Disable debounce (0ms) — filters on every keystroke -->
<ejs-multiselect id="local"
    dataSource="@ViewBag.LocalData"
    allowFiltering="true"
    debounceDelay="0">
    <e-multiselect-fields text="Name" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

> **Tip:** For remote data, keep debounce at 300ms or higher to reduce unnecessary API calls. For local data, 0ms is fine.

---

## Filter Bar Placeholder

Set placeholder text inside the filter search box:

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries"
    allowFiltering="true"
    filterBarPlaceholder="Type to search...">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>
```

---

## Remote Data Filtering (⚠️ Secure Same-Origin Only)

**⚠️ SECURITY (W011):** Use same-origin endpoints only, no `crossDomain="true"`.

For remote data, perform server-side filtering inside the `filtering` event:

```cshtml
<!-- ✅ SECURE: Same-origin endpoint, server validates filter terms -->
<ejs-multiselect id="customers"
    placeholder="Search customers"
    allowFiltering="true"
    filtering="onRemoteFilter"
    popupHeight="250px">
    <e-data-manager url="/api/customers"
        adaptor="UrlAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
    <e-multiselect-fields text="ContactName" value="CustomerID"></e-multiselect-fields>
</ejs-multiselect>

<script>
function onRemoteFilter(args) {
    var query = new ej.data.Query().select(['ContactName', 'CustomerID']);
    // Filter server-side using startswith (validated server-side)
    query = (args.text !== '') 
        ? query.where('ContactName', 'startswith', args.text, true) 
        : query;
    args.updateData(args.dataSource, query);
}
</script>
```

**With minimum character threshold (remote):**
```javascript
function onRemoteFilter(args) {
    if (args.text.length < 2) {
        args.updateData(args.dataSource, new ej.data.Query().take(10));
        return;
    }
    var query = new ej.data.Query()
        .select(['ContactName', 'CustomerID'])
        .where('ContactName', 'startswith', args.text, true);
    args.updateData(args.dataSource, query);
}
```

---

## Complete Example: Advanced Filtering

```csharp
// Controller
public class CountryData
{
    public string Code { get; set; }
    public string Name { get; set; }
}

ViewBag.Countries = new List<CountryData>
{
    new CountryData { Code = "AU", Name = "Australia" },
    new CountryData { Code = "BR", Name = "Brazil" },
    new CountryData { Code = "CA", Name = "Canada" },
    new CountryData { Code = "DK", Name = "Denmark" },
    new CountryData { Code = "ES", Name = "España" },
    new CountryData { Code = "FR", Name = "France" },
    new CountryData { Code = "DE", Name = "Germany" }
};
```

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries"
    allowFiltering="true"
    filterType="Contains"
    ignoreAccent="true"
    ignoreCase="true"
    debounceDelay="200"
    filterBarPlaceholder="Search country..."
    mode="Box">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>
```

---

## See Also

- [Checkbox & Selection](checkbox-and-selection.md) — Filter with checkbox mode
- [Grouping & Virtualization](grouping-and-virtualization.md) — Filtering with virtual scroll
- [Data Binding](data-binding.md) — Remote data setup
