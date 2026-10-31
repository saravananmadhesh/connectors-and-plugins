# Grouping & Virtual Scrolling in MultiSelect

## Table of Contents
- [Grouping Basics](#grouping-basics)
- [Grouping with Checkboxes](#grouping-with-checkboxes)
- [Custom Group Template](#custom-group-template)
- [Virtual Scrolling Overview](#virtual-scrolling-overview)
- [Virtualization with Local Data](#virtualization-with-local-data)
- [Virtualization with Remote Data](#virtualization-with-remote-data)
- [Virtualization with Grouping](#virtualization-with-grouping)
- [Virtualization with Filtering](#virtualization-with-filtering)
- [Virtualization with Checkbox Mode](#virtualization-with-checkbox-mode)
- [Virtualization with Custom Values](#virtualization-with-custom-values)
- [Preselect Values with Virtualization](#preselect-values-with-virtualization)
- [Custom Item Count in Virtualization](#custom-item-count-in-virtualization)

---

## Grouping Basics

Group items using the `groupBy` field in the `fields` mapping:

```csharp
// Controller
public class VegetableData
{
    public string VegId { get; set; }
    public string VegName { get; set; }
    public string Category { get; set; }
}

ViewBag.Vegetables = new List<VegetableData>
{
    new VegetableData { VegId = "1", VegName = "Cabbage",   Category = "Leafy Vegetable" },
    new VegetableData { VegId = "2", VegName = "Spinach",   Category = "Leafy Vegetable" },
    new VegetableData { VegId = "3", VegName = "Carrot",    Category = "Root Vegetable" },
    new VegetableData { VegId = "4", VegName = "Potato",    Category = "Root Vegetable" },
    new VegetableData { VegId = "5", VegName = "Broccoli",  Category = "Flower Vegetable" }
};
```

```cshtml
<ejs-multiselect id="vegetables"
    dataSource="@ViewBag.Vegetables"
    placeholder="Select vegetables">
    <e-multiselect-fields text="VegName" value="VegId" groupBy="Category"></e-multiselect-fields>
</ejs-multiselect>
```

Grouping provides:
- **Inline headers** between item groups
- **Fixed group header** at the top of the popup that updates as you scroll

---

## Grouping with Checkboxes

Use `enableGroupCheckBox="true"` in `CheckBox` mode to add checkboxes to group headers, allowing all items in a group to be selected at once:

```cshtml
<ejs-multiselect id="vegetables"
    dataSource="@ViewBag.Vegetables"
    placeholder="Select vegetables"
    mode="CheckBox"
    enableGroupCheckBox="true"
    showSelectAll="true"
    filterBarPlaceholder="Search">
    <e-multiselect-fields text="VegName" value="VegId" groupBy="Category"></e-multiselect-fields>
</ejs-multiselect>

<script>
    ej.dropdowns.MultiSelect.Inject(ej.dropdowns.CheckBoxSelection);
</script>
```

Clicking a group header checkbox selects/deselects all items in that group.

---

## Custom Group Template

Customize the group header appearance using `groupTemplate`:

```cshtml
<script id="groupTemplate" type="text/x-template">
    <div class="group-header">
        <span class="group-icon">📁</span>
        <strong>${Category}</strong>
    </div>
</script>

<ejs-multiselect id="vegetables"
    dataSource="@ViewBag.Vegetables"
    placeholder="Select vegetables"
    groupTemplate="#groupTemplate">
    <e-multiselect-fields text="VegName" value="VegId" groupBy="Category"></e-multiselect-fields>
</ejs-multiselect>

<style>
.group-header { display: flex; align-items: center; gap: 6px; padding: 4px 8px; background: #f0f0f0; }
</style>
```

---

## Virtual Scrolling Overview

Virtual scrolling renders only the visible items in the DOM, reusing elements as you scroll. This is essential for lists with 1,000+ items.

**When to use virtual scrolling:**
- Data source has 500+ items
- Performance is slow with the standard popup
- Remote data with pagination needs efficient rendering

Enable with `enableVirtualization="true"`.

---

## Virtualization with Local Data

Generate a large local dataset and enable virtualization:

```csharp
// Controller — generate 10,000 items
var records = new List<object>();
for (int i = 1; i <= 10000; i++)
{
    records.Add(new { id = i, text = "Item " + i });
}
ViewBag.LargeData = records;
```

```cshtml
<ejs-multiselect id="items"
    dataSource="@ViewBag.LargeData"
    placeholder="Select items"
    enableVirtualization="true"
    popupHeight="200px">
    <e-multiselect-fields text="text" value="id"></e-multiselect-fields>
</ejs-multiselect>
```

> The `take` property in the Query controls how many items are fetched per batch. Internally, the component calculates how many items fit in the popup height.

---

## Virtualization with Remote Data (⚠️ Secure Same-Origin Only)

**⚠️ SECURITY (W011):** Use same-origin endpoints only, no `crossDomain="true"`.

Virtual scrolling works with remote data — additional batches are fetched as the user scrolls:

```cshtml
<!-- ✅ SECURE: Same-origin endpoint with pagination -->
<ejs-multiselect id="orders"
    placeholder="Select order"
    enableVirtualization="true"
    popupHeight="200px"
    actionBegin="onActionBegin"
    actionComplete="onActionComplete">
    <e-data-manager url="/api/orders"
        adaptor="UrlAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
    <e-multiselect-fields text="ShipName" value="OrderID"></e-multiselect-fields>
</ejs-multiselect>

<script>
function onActionBegin(args) {
    console.log('Fetching data from server...');
}

function onActionComplete(args) {
    console.log('Data loaded:', args.result.length, 'records');
}
</script>
```

> **Incremental search** is supported in remote virtual mode: typing focuses the matching item in the open popup; in closed state, the popup opens and scrolls to the match.

**Server-Side Proxy (C# — ✅ Validates Pagination):**
```csharp
[HttpGet("api/orders")]
public IActionResult GetOrders([FromQuery] int skip = 0, [FromQuery] int take = 10)
{
    int skipVal = Math.Max(0, skip);
    int takeVal = Math.Min(100, take > 0 ? take : 10);
    
    var orders = _context.Orders
        .AsNoTracking()
        .Skip(skipVal)
        .Take(takeVal)
        .ToList();
    
    return Ok(orders);
}
```

---

## Virtualization with Grouping

Combine grouping and virtualization. For remote data, all records are fetched once for grouping, then virtualization applies:

```csharp
var records = new List<object>();
for (int i = 1; i <= 3000; i++)
{
    records.Add(new { id = i, text = "Item " + i, group = "Group " + ((i % 10) + 1) });
}
ViewBag.GroupedData = records;
```

```cshtml
<ejs-multiselect id="groupedItems"
    dataSource="@ViewBag.GroupedData"
    placeholder="Select items"
    enableVirtualization="true"
    popupHeight="200px">
    <e-multiselect-fields text="text" value="id" groupBy="group"></e-multiselect-fields>
</ejs-multiselect>
```

---

## Virtualization with Filtering

Enable filtering alongside virtualization. Filtering requests use the full data source:

```cshtml
<ejs-multiselect id="filteredItems"
    dataSource="@ViewBag.LargeData"
    placeholder="Search and select"
    enableVirtualization="true"
    allowFiltering="true"
    filterBarPlaceholder="Search..."
    popupHeight="200px">
    <e-multiselect-fields text="text" value="id"></e-multiselect-fields>
</ejs-multiselect>
```

For **remote data filtering with virtualization** (⚠️ Secure Same-Origin Only):

**⚠️ SECURITY (W011):** Use same-origin endpoints only, no `crossDomain="true"`.

```cshtml
<!-- ✅ SECURE: Same-origin endpoint with server-side filtering & pagination -->
<ejs-multiselect id="remoteFilter"
    placeholder="Search orders"
    enableVirtualization="true"
    allowFiltering="true"
    popupHeight="200px"
    filtering="onVirtualFilter">
    <e-data-manager url="/api/orders"
        adaptor="UrlAdaptor">  <!-- Same-origin only -->
    </e-data-manager>
    <e-multiselect-fields text="ShipName" value="OrderID"></e-multiselect-fields>
</ejs-multiselect>

<script>
function onVirtualFilter(args) {
    var query = new ej.data.Query();
    if (args.text) {
        // Server validates filter terms (startswith)
        query = query.where('ShipName', 'startswith', args.text, true);
    }
    args.updateData(args.dataSource, query);
}
</script>
```

> In virtual filter mode: the popup closes after filtering, regardless of whether items are selected. This is expected behavior.

---

## Virtualization with Checkbox Mode

Combine virtualization and checkbox selection. The `mode="CheckBox"` renders checkboxes with each virtual list item:

```cshtml
<ejs-multiselect id="checkVirtual"
    dataSource="@ViewBag.LargeData"
    placeholder="Select items"
    enableVirtualization="true"
    mode="CheckBox"
    showSelectAll="true"
    popupHeight="200px">
    <e-multiselect-fields text="text" value="id"></e-multiselect-fields>
</ejs-multiselect>

<script>
    ej.dropdowns.MultiSelect.Inject(ej.dropdowns.CheckBoxSelection);
</script>
```

Selected/unselected state is tracked internally and persists during scroll.

---

## Virtualization with Custom Values

Enable custom value entry alongside virtualization:

```cshtml
<ejs-multiselect id="customVirtual"
    dataSource="@ViewBag.LargeData"
    placeholder="Select or add items"
    enableVirtualization="true"
    allowCustomValue="true"
    customValueSelection="onCustomValue"
    popupHeight="200px">
    <e-multiselect-fields text="text" value="id"></e-multiselect-fields>
</ejs-multiselect>

<script>
function onCustomValue(args) {
    // args.newData contains the new custom item
    console.log('Custom value added:', args.newData);
    // Custom value is appended to the end of the full list
}
</script>
```

---

## Preselect Values with Virtualization

Pre-selected values work with virtualization — the component fetches matching data from the server automatically:

```csharp
// Pre-select item IDs
ViewBag.PreSelected = new int[] { 5, 100, 500 };
```

```cshtml
<ejs-multiselect id="preselect"
    dataSource="@ViewBag.LargeData"
    value="@ViewBag.PreSelected"
    placeholder="Items pre-selected"
    enableVirtualization="true"
    popupHeight="200px">
    <e-multiselect-fields text="text" value="id"></e-multiselect-fields>
</ejs-multiselect>
```

For remote data: the component sends a server request to fetch matching items for the pre-selected IDs. Custom preselected values are appended at the end of the list.

---

## Custom Item Count in Virtualization

Control how many items are fetched per batch using a Query `take` value:

```cshtml
<ejs-multiselect id="customCount"
    dataSource="@ViewBag.LargeData"
    placeholder="Select items"
    enableVirtualization="true"
    popupHeight="200px"
    query="new ej.data.Query().take(40)">
    <e-multiselect-fields text="text" value="id"></e-multiselect-fields>
</ejs-multiselect>
```

> If the `take` value is less than the minimum number of items that fit in the popup (typically ~2× popup height ÷ item height), the component ignores it and uses the calculated minimum.

---

## See Also

- [Data Binding](data-binding.md) — Remote data setup with DataManager
- [Filtering](filtering.md) — Filtering with remote and local data
- [Checkbox & Selection](checkbox-and-selection.md) — Checkbox mode configuration
