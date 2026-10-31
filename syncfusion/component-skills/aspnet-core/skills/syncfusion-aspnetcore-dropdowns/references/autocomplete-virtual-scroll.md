# Virtual Scrolling – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Overview](#overview)
- [Enable Virtualization](#enable-virtualization)
- [Virtual Scrolling with Local Data](#virtual-scrolling-with-local-data)
- [Virtual Scrolling with Remote Data](#virtual-scrolling-with-remote-data)
- [Customizing Item Count in Virtualization](#customizing-item-count-in-virtualization)
- [Grouping with Virtualization](#grouping-with-virtualization)
- [Events with Virtualization](#events-with-virtualization)

---

## Overview

AutoComplete virtualization efficiently renders large datasets by only creating DOM elements for visible items. As the user scrolls, existing DOM elements are recycled to display new data instead of creating new elements. This dramatically improves performance for lists with thousands of items.

**When to use:** Data sources with 500+ items where rendering all DOM elements at once would degrade performance.

---

## Enable Virtualization

Set `enableVirtualization="true"` to activate virtual scrolling:

```cshtml
<ejs-autocomplete id="records"
    dataSource="@data"
    placeholder="Select an item"
    enableVirtualization="true"
    popupHeight="200px">
    <e-autocomplete-fields value="Text"></e-autocomplete-fields>
</ejs-autocomplete>
```

> When `enableVirtualization` is enabled, any `skip` and `take` values from a `Query` are internally managed and calculated based on popup height. User-provided skip/take in Query are ignored during virtualization.

---

## Virtual Scrolling with Local Data

Bind a large local dataset with virtualization enabled:

**Model:**
```csharp
public class RecordData {
    public string ID { get; set; }
    public string Text { get; set; }
    public List<RecordData> RecordModelList() {
        return Enumerable.Range(1, 150).Select(i => new RecordData {
            ID = i.ToString(),
            Text = "Item " + i
        }).ToList();
    }
}
```

**View:**
```cshtml
@{
    var data = new RecordData().RecordModelList();
}

<ejs-autocomplete id="records"
    dataSource="@data"
    placeholder="e.g. Item 1"
    enableVirtualization="true"
    popupHeight="200px">
    <e-autocomplete-fields value="Text"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

## Virtual Scrolling with Remote Data

Virtualization also works with remote data. As the user scrolls, additional data pages are fetched from the server automatically. The `actionBegin` event fires before each data fetch, and `actionComplete` fires when fetch succeeds.

```cshtml
<ejs-autocomplete id="orders"
    placeholder="Select an order"
    enableVirtualization="true"
    popupHeight="200px"
    actionBegin="onActionBegin"
    actionComplete="onActionComplete">
    <e-autocomplete-fields value="OrderID"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>

<script>
    function onActionBegin(args) {
        console.log("Fetching data...");
    }
    function onActionComplete(args) {
        console.log("Data fetched successfully");
    }
</script>
```

---

## Customizing Item Count in Virtualization

Use the `take` property in a `Query` at the initial state or during `actionBegin` to customize item fetch count. If the value is less than the minimum items needed to fill the popup, it will be ignored.

```cshtml
<ejs-autocomplete id="records"
    dataSource="@data"
    placeholder="Select an item"
    enableVirtualization="true"
    popupHeight="200px"
    query="new ej.data.Query().take(40)">
    <e-autocomplete-fields value="Text"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

## Grouping with Virtualization

Grouping is fully supported with virtualization. After enabling grouping, virtualization works the same as local data binding. For remote data with grouping, all data is fetched initially for grouping, then virtualization applies.

**Model:**
```csharp
public class GroupingRecord {
    public string ID { get; set; }
    public string Text { get; set; }
    public string Group { get; set; }
    public List<GroupingRecord> RecordModelList() {
        var groups = new[] { "Group A", "Group B", "Group C", "Group D" };
        var random = new Random();
        return Enumerable.Range(1, 150).Select(i => new GroupingRecord {
            ID = i.ToString(),
            Text = "Item " + i,
            Group = groups[random.Next(0, 4)]
        }).ToList();
    }
}
```

**View:**
```cshtml
@{
    var data = new GroupingRecord().RecordModelList();
}

<ejs-autocomplete id="groupedRecords"
    dataSource="@data"
    placeholder="Select an item"
    enableVirtualization="true"
    popupHeight="200px">
    <e-autocomplete-fields value="Text" groupBy="Group"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

## Events with Virtualization

| Event | When it fires |
|---|---|
| `actionBegin` | Before data retrieval starts (every page load during scroll) |
| `actionComplete` | After data is successfully fetched |

```cshtml
<ejs-autocomplete id="records"
    dataSource="@data"
    enableVirtualization="true"
    actionBegin="onBegin"
    actionComplete="onComplete">
    <e-autocomplete-fields value="Text"></e-autocomplete-fields>
</ejs-autocomplete>

<script>
    function onBegin(args) { /* data fetch starting */ }
    function onComplete(args) { /* data fetch done */ }
</script>
```
