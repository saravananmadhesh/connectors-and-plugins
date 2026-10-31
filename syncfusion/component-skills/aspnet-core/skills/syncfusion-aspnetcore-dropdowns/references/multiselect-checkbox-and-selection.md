# Checkbox & Selection Modes in MultiSelect

## Table of Contents
- [Display Modes Overview](#display-modes-overview)
- [Checkbox Mode](#checkbox-mode)
- [Select All / Unselect All](#select-all--unselect-all)
- [Selection Limit](#selection-limit)
- [Selection Reordering](#selection-reordering)
- [Hide Selected Items](#hide-selected-items)
- [Close Popup on Select](#close-popup-on-select)
- [Change Event Timing (changeOnBlur)](#change-event-timing-changeonblur)
- [ShowClearButton](#showclearbutton)
- [ShowDropDownIcon](#showdropdownicon)
- [OpenOnClick Behavior](#openonclick-behavior)
- [Add Tag on Blur](#add-tag-on-blur)

---

## Display Modes Overview

The `mode` property controls how selected values are displayed:

| Mode | Behavior |
|------|----------|
| `Default` | Selected items shown as delimited text (comma-separated) |
| `Box` | Selected items shown as removable chip/tag boxes |
| `Delimiter` | Selected items shown with a custom delimiter character |
| `CheckBox` | Popup items show checkboxes; selected items shown as delimited text |

```cshtml
<!-- Box mode: selected items appear as chips -->
<ejs-multiselect id="sports" dataSource="@ViewBag.Sports" placeholder="Select" mode="Box">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<!-- Delimiter mode with custom character -->
<ejs-multiselect id="sports" dataSource="@ViewBag.Sports" placeholder="Select"
    mode="Delimiter" delimiterChar=";  ">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

---

## Checkbox Mode

Enable checkbox UI for each list item. Requires injecting the `CheckBoxSelection` module:

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    mode="CheckBox">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<script>
    // Inject the CheckBoxSelection module (required for CheckBox mode)
    ej.dropdowns.MultiSelect.Inject(ej.dropdowns.CheckBoxSelection);
</script>
```

> **Why inject?** The `CheckBoxSelection` module is an optional plugin that adds checkbox rendering. Without it, `mode="CheckBox"` won't show checkboxes.

---

## Select All / Unselect All

Add a "Select All" option in the popup header (only works with `mode="CheckBox"`):

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    mode="CheckBox"
    showSelectAll="true"
    selectAllText="Select All"
    unSelectAllText="Unselect All"
    filterBarPlaceholder="Search sports">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<script>
    ej.dropdowns.MultiSelect.Inject(ej.dropdowns.CheckBoxSelection);
</script>
```

**Handle Select All events in JavaScript:**
```javascript
var multiObj = document.getElementById('games').ej2_instances[0];
multiObj.addEventListener('selectedAll', function(args) {
    // args.isChecked: true = all selected, false = all unselected
    console.log('All selected:', args.isChecked);
});

// Or use beforeSelectAll to intercept
multiObj.addEventListener('beforeSelectAll', function(args) {
    console.log('About to select all');
});
```

---

## Selection Limit

Restrict how many items a user can select using `maximumSelectionLength`:

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select up to 3 games"
    mode="CheckBox"
    showSelectAll="true"
    maximumSelectionLength="3">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<script>
    ej.dropdowns.MultiSelect.Inject(ej.dropdowns.CheckBoxSelection);
</script>
```

Default: `1000` (effectively unlimited). The list items become non-selectable once the limit is reached.

---

## Selection Reordering

By default (`enableSelectionOrder="true"`), newly selected items are reordered to the top in the popup while it's open. Set to `false` to preserve original list order:

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    mode="CheckBox"
    enableSelectionOrder="false">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<script>
    ej.dropdowns.MultiSelect.Inject(ej.dropdowns.CheckBoxSelection);
</script>
```

---

## Hide Selected Items

When `hideSelectedItem="true"` (default), selected items are removed from the visible dropdown list so users can't accidentally select them again:

```cshtml
<!-- Default: selected items hidden from list -->
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    hideSelectedItem="true">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<!-- Keep selected items visible in list (useful for checkbox mode) -->
<ejs-multiselect id="games2"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    mode="CheckBox"
    hideSelectedItem="false">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

---

## Close Popup on Select

By default (`closePopupOnSelect="true"`), the popup closes after each selection. For multi-select workflows, disable this:

```cshtml
<!-- Keep popup open for multiple selections (useful in Default/Box/Delimiter modes) -->
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    closePopupOnSelect="false">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

> In `CheckBox` mode, `closePopupOnSelect` defaults to `false` automatically, so users can check multiple items without the popup closing.

---

## Change Event Timing (changeOnBlur)

By default (`changeOnBlur="true"`), the `change` event fires when the component loses focus, not on every selection. To fire on every add/remove:

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    changeOnBlur="false"
    change="onSelectionChange">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<script>
function onSelectionChange(args) {
    // Fires on every individual selection/deselection
    console.log('Current values:', args.value);
}
</script>
```

---

## ShowClearButton

By default (`showClearButton="true"`), each selected chip/tag has an ✕ button to remove it individually:

```cshtml
<!-- Disable individual remove buttons -->
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    showClearButton="false">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

---

## ShowDropDownIcon

Show a dropdown arrow icon on the right side of the component (hidden by default in MultiSelect):

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    showDropDownIcon="true">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

---

## OpenOnClick Behavior

By default (`openOnClick="true"`), clicking anywhere on the component opens the popup:

```cshtml
<!-- Only open popup via keyboard or programmatic trigger -->
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    openOnClick="false">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

---

## Add Tag on Blur

When `addTagOnBlur="true"`, typing a value and then clicking away (blur) automatically converts the typed text into a chip/tag without pressing Enter:

```cshtml
<ejs-multiselect id="tags"
    dataSource="@ViewBag.Tags"
    placeholder="Add tags"
    mode="Box"
    allowCustomValue="true"
    addTagOnBlur="true">
    <e-multiselect-fields text="Name" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

Behavior:
- If the typed value exists in the list → it's selected as a tag
- If `allowCustomValue="true"` and the value doesn't exist → it's added as a custom tag on blur

---

## Complete Example: Checkbox Mode with All Options

```csharp
// Controller
public class SportData
{
    public int Id { get; set; }
    public string Game { get; set; }
}

ViewBag.Sports = new List<SportData>
{
    new SportData { Id = 1, Game = "Football" },
    new SportData { Id = 2, Game = "Basketball" },
    new SportData { Id = 3, Game = "Cricket" },
    new SportData { Id = 4, Game = "Tennis" },
    new SportData { Id = 5, Game = "Hockey" }
};
```

```cshtml
<ejs-multiselect id="sports"
    dataSource="@ViewBag.Sports"
    placeholder="Select sports"
    mode="CheckBox"
    showSelectAll="true"
    selectAllText="Select All Sports"
    unSelectAllText="Clear All"
    maximumSelectionLength="4"
    enableSelectionOrder="false"
    filterBarPlaceholder="Search sports"
    allowFiltering="true"
    change="onSportsChange">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<div id="selection-info"></div>

<script>
    ej.dropdowns.MultiSelect.Inject(ej.dropdowns.CheckBoxSelection);

    function onSportsChange(args) {
        document.getElementById('selection-info').textContent =
            'Selected IDs: ' + (args.value ? args.value.join(', ') : 'none');
    }
</script>
```

---

## See Also

- [Filtering](filtering.md) — Filter within popup list
- [Templates & Customization](templates-and-customization.md) — Custom chip/list UI
- [Advanced Features](advanced-features.md) — Disabled items, custom values
