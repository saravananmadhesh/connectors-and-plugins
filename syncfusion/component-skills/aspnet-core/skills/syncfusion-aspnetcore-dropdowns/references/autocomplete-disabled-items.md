# Disabled Items & Component State – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Disable Individual Items](#disable-individual-items)
- [disableItem Method](#disableitem-method)
- [Disable Entire Component](#disable-entire-component)

---

## Disable Individual Items

Map the `disabled` field in `<e-autocomplete-fields>` to disable specific items. Disabled items cannot be selected.

**Model:**
```csharp
public class DisableStatusData {
    public string Status { get; set; }
    public bool State { get; set; }  // true = disabled
}
```

**View:**
```cshtml
@{
    List<DisableStatusData> statusData = new List<DisableStatusData> {
        new DisableStatusData { Status = "Open",       State = false },
        new DisableStatusData { Status = "Waiting",    State = false },
        new DisableStatusData { Status = "In Progress",State = true  },
        new DisableStatusData { Status = "Review",     State = true  },
        new DisableStatusData { Status = "Completed",  State = false },
        new DisableStatusData { Status = "Cancelled",  State = false }
    };
}

<ejs-autocomplete id="status"
    dataSource="@statusData"
    placeholder="Select a status"
    popupHeight="200px">
    <e-autocomplete-fields value="Status" disabled="State"></e-autocomplete-fields>
</ejs-autocomplete>
```

Items with `State = true` are displayed but cannot be selected. They appear visually grayed out.

---

## disableItem Method

Use the `disableItem` JavaScript method to programmatically disable a specific item at runtime. This updates the `disabled` field in the dataSource as well. If the currently selected item is disabled dynamically, the selection is cleared.

**Method signature:**
| Parameter | Type | Description |
|---|---|---|
| `itemHTMLLIElement` | `HTMLLIElement` | The `<li>` element to disable |
| `itemValue` | `string \| number \| boolean \| object` | The value of the item to disable |
| `itemIndex` | `number` | The index of the item to disable |

**Example – disable by value:**
```cshtml
<ejs-autocomplete id="status" dataSource="@statusData" placeholder="Select a status">
    <e-autocomplete-fields value="Status" disabled="State"></e-autocomplete-fields>
</ejs-autocomplete>

<button onclick="disableItem()">Disable "Review"</button>

<script>
    function disableItem() {
        var acObj = document.getElementById("status").ej2_instances[0];
        acObj.disableItem(null, "Review");
    }
</script>
```

**Disable multiple items by iterating:**
```javascript
var itemsToDisable = ["In Progress", "Review"];
itemsToDisable.forEach(function(item) {
    acObj.disableItem(null, item);
});
```

---

## Disable Entire Component

Set `enabled="false"` to disable the entire AutoComplete component. The user cannot interact with a disabled component.

**Default:** `true` (enabled)

```cshtml
<ejs-autocomplete id="status"
    dataSource="@statusData"
    placeholder="Select a status"
    enabled="false">
    <e-autocomplete-fields value="Status"></e-autocomplete-fields>
</ejs-autocomplete>
```

> Use `enabled="false"` to disable the control completely (e.g., in read-only form sections). Use `fields.disabled` or `disableItem` to disable only specific options while keeping the component interactive.
