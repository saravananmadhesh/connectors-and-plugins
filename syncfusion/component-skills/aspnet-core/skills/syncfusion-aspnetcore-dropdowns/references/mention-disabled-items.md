# Disabled Items – Syncfusion ASP.NET Core Mention

## Table of Contents
- [Overview](#overview)
- [Disabling Items via Data Source Field](#disabling-items-via-data-source-field)
- [Disable Item Method](#disable-item-method)

---

## Overview

The Mention allows individual items to be disabled in the suggestion list. Disabled items appear in the popup but cannot be selected by the user. This is useful for scenarios where some options are unavailable based on context (e.g., users with restricted access, unavailable tags, etc.).

---

## Disabling Items via Data Source Field

Map the `disabled` field in `<e-mention-fields>` to a boolean column in your data source. Items where this column is `true` will be rendered as non-selectable in the suggestion list.

**Model:**
```csharp
public class EmployeeData
{
    public string Name { get; set; }
    public string EmailId { get; set; }
    public bool IsActive { get; set; }
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<EmployeeData>
    {
        new EmployeeData { Name = "Adeline MacAdams", EmailId = "adeline@example.com", IsActive = false },
        new EmployeeData { Name = "Alba Torres", EmailId = "alba@example.com", IsActive = false },
        new EmployeeData { Name = "Amy Fernandez", EmailId = "amy@example.com", IsActive = true },
        new EmployeeData { Name = "Andrew Jack", EmailId = "andrew@example.com", IsActive = true },
        new EmployeeData { Name = "Chris Ellis", EmailId = "chris@example.com", IsActive = false }
    };
    return View();
}
```

**View:**
```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Name" value="EmailId" disabled="IsActive"></e-mention-fields>
</ejs-mention>
```

> Items where `IsActive` is `true` will be disabled (non-selectable) in the suggestion list. The `disabled` field maps to the boolean column — items with `true` are treated as disabled.

---

## Disable Item Method

The `disableItem` JavaScript method allows dynamic disabling of individual items at runtime without rebinding the full data source.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `itemHTMLLIElement` | `HTMLLIElement` | The HTML `<li>` element of the item to disable |
| `itemValue` | `string` \| `number` \| `boolean` \| `object` | The value of the item to disable |
| `itemIndex` | `number` | The index of the item to disable |

**Example – Disable a single item by value:**

```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    created="onCreated">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>

<script>
    function onCreated() {
        var mentionObj = document.getElementById('mentionElement').ej2_instances[0];
        // Disable item by its value
        mentionObj.disableItem({ value: 'alba@example.com' });
    }
</script>
```

**Example – Disable multiple items by iterating:**

```cshtml
<script>
    function onCreated() {
        var mentionObj = document.getElementById('mentionElement').ej2_instances[0];
        var itemsToDisable = ['adeline@example.com', 'chris@example.com'];
        itemsToDisable.forEach(function(emailId) {
            mentionObj.disableItem({ value: emailId });
        });
    }
</script>
```

> The `disableItem` method only disables one item per call. To disable multiple items, iterate through the list and call the method for each.

> When an item is disabled via `disableItem`, the `disabled` state is also updated in the bound `dataSource`.

---

## Notes

- Disabled items are visually styled differently (grayed out) in the popup but remain visible.
- Users cannot click or keyboard-navigate to select disabled items.
- Both declarative (`fields.disabled`) and programmatic (`disableItem`) approaches update the underlying data source state.
