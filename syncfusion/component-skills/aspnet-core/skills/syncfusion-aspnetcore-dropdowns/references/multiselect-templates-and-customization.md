# Templates & Customization in MultiSelect

## Table of Contents
- [Item Template](#item-template)
- [Value Template](#value-template)
- [Group Template](#group-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)
- [Chip Customization (Tagging Event)](#chip-customization-tagging-event)
- [CSS Customization Reference](#css-customization-reference)
  - [Wrapper Background](#wrapper-background)
  - [Delimiter Text](#delimiter-text)
  - [Chip Appearance](#chip-appearance)
  - [Dropdown Icon Color](#dropdown-icon-color)
  - [Focus / Active Color](#focus--active-color)
  - [Disabled Text Color](#disabled-text-color)
  - [Placeholder Color](#placeholder-color)
  - [Popup Item Appearance](#popup-item-appearance)
  - [Checkbox Color](#checkbox-color)
  - [Outline Theme Focus](#outline-theme-focus)
  - [Float Label Customization](#float-label-customization)

---

## Item Template

Customize the appearance of each list item using `itemTemplate`. Use `${fieldName}` syntax for data binding:

```csharp
// Controller
public class EmployeeData
{
    public int EmpId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string City { get; set; }
}
```

```cshtml
<ejs-multiselect id="employees"
    dataSource="@ViewBag.Employees"
    placeholder="Select employees"
    itemTemplate="<span><span class='name'>${FirstName} ${LastName}</span> — <span class='city'>${City}</span></span>">
    <e-multiselect-fields text="FirstName" value="EmpId"></e-multiselect-fields>
</ejs-multiselect>
```

**Two-column layout (using a script template):**

```cshtml
<script id="itemTemplate" type="text/x-template">
    <div class="emp-item">
        <div class="emp-name">${FirstName} ${LastName}</div>
        <div class="emp-city">${City}</div>
    </div>
</script>

<ejs-multiselect id="employees"
    dataSource="@ViewBag.Employees"
    placeholder="Select employees"
    itemTemplate="#itemTemplate">
    <e-multiselect-fields text="FirstName" value="EmpId"></e-multiselect-fields>
</ejs-multiselect>

<style>
.emp-item { display: flex; justify-content: space-between; padding: 4px; }
.emp-name { font-weight: bold; }
.emp-city { color: #666; font-size: 12px; }
</style>
```

---

## Value Template

Customize how selected items appear in the input area (the chip/tag display):

```cshtml
<script id="valueTemplate" type="text/x-template">
    <span>
        <span class="value-name">${FirstName}</span>
        <span class="value-city"> (${City})</span>
    </span>
</script>

<ejs-multiselect id="employees"
    dataSource="@ViewBag.Employees"
    placeholder="Select employees"
    mode="Box"
    valueTemplate="#valueTemplate">
    <e-multiselect-fields text="FirstName" value="EmpId"></e-multiselect-fields>
</ejs-multiselect>
```

> **Value template** replaces the chip text. The remove (✕) button is still rendered by the component.

---

## Group Template

Customize the group header that appears above grouped items:

```cshtml
<script id="groupTemplate" type="text/x-template">
    <strong>${City}</strong>
</script>

<ejs-multiselect id="employees"
    dataSource="@ViewBag.Employees"
    placeholder="Select by city"
    groupTemplate="#groupTemplate">
    <e-multiselect-fields text="FirstName" value="EmpId" groupBy="City"></e-multiselect-fields>
</ejs-multiselect>
```

This template is used for both:
- **Inline group headers** (between list items)
- **Fixed group header** (sticky header at the top of popup while scrolling)

---

## Header Template

Add a static custom element at the top of the popup list:

```cshtml
<script id="headerTemplate" type="text/x-template">
    <div class="popup-header">
        <span class="col-name">Name</span>
        <span class="col-city">Location</span>
    </div>
</script>

<ejs-multiselect id="employees"
    dataSource="@ViewBag.Employees"
    placeholder="Select employees"
    headerTemplate="#headerTemplate"
    itemTemplate="#itemTemplate">
    <e-multiselect-fields text="FirstName" value="EmpId"></e-multiselect-fields>
</ejs-multiselect>

<style>
.popup-header { display: flex; justify-content: space-between; padding: 8px; background: #f5f5f5; font-weight: bold; }
</style>
```

---

## Footer Template

Add a static custom element at the bottom of the popup list:

```cshtml
<script id="footerTemplate" type="text/x-template">
    <div class="popup-footer">Total: <strong id="item-count">0</strong> items</div>
</script>

<ejs-multiselect id="employees"
    dataSource="@ViewBag.Employees"
    placeholder="Select employees"
    footerTemplate="#footerTemplate"
    open="onPopupOpen">
    <e-multiselect-fields text="FirstName" value="EmpId"></e-multiselect-fields>
</ejs-multiselect>

<script>
function onPopupOpen() {
    var multiObj = document.getElementById('employees').ej2_instances[0];
    document.getElementById('item-count').textContent = multiObj.dataSource.length;
}
</script>
```

---

## No Records Template

Display a custom message when the filtered list has no results:

**⚠️ SECURITY (W011):** Use same-origin endpoints only, no `crossDomain="true"`.

```cshtml
<ejs-multiselect id="customers"
    placeholder="Search customers"
    allowFiltering="true"
    noRecordsTemplate="<span class='no-record'>No customers found</span>">
    <e-data-manager url="/api/customers" adaptor="UrlAdaptor"></e-data-manager>
    <e-multiselect-fields text="Name" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

Or with a script template for richer UI:
```cshtml
<script id="noRecordTemplate" type="text/x-template">
    <div class="no-data">
        <img src="/images/no-results.svg" alt="No results" />
        <p>No matching items found</p>
    </div>
</script>

<ejs-multiselect id="customers"
    allowFiltering="true"
    noRecordsTemplate="#noRecordTemplate">
    ...
</ejs-multiselect>
```

---

## Action Failure Template

Display a custom message when a remote data fetch fails:

**⚠️ SECURITY (W011):** Use same-origin endpoints only, no `crossDomain="true"`.

```cshtml
<ejs-multiselect id="customers"
    allowFiltering="true"
    actionFailureTemplate="<span class='error'>⚠️ Failed to load data. <a href='#' onclick='retryLoad()'>Retry</a></span>">
    <e-data-manager url="/api/customers" adaptor="UrlAdaptor"></e-data-manager>
    <e-multiselect-fields text="Name" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<script>
function retryLoad() {
    var obj = document.getElementById('customers').ej2_instances[0];
    obj.showPopup();
}
</script>
```

---

## Chip Customization (Tagging Event)

Use the `tagging` event to dynamically apply CSS classes to selected chips based on their data:

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    mode="Box"
    tagging="onTagging">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<style>
.chip-primary  { background-color: #007bff !important; color: white !important; }
.chip-success  { background-color: #28a745 !important; color: white !important; }
.chip-warning  { background-color: #ffc107 !important; color: black !important; }
.chip-danger   { background-color: #dc3545 !important; color: white !important; }
</style>

<script>
var chipColors = { 1: 'chip-primary', 2: 'chip-success', 3: 'chip-warning', 4: 'chip-danger' };

function onTagging(args) {
    // args.setClass() applies a CSS class to the chip element
    var cssClass = chipColors[args.itemData.Id] || 'chip-primary';
    args.setClass(cssClass);
}
</script>
```

The `tagging` event args include:
- `args.itemData` — the data object for the chip
- `args.setClass(cssClass)` — method to apply CSS class to the chip

---

## CSS Customization Reference

Use these CSS selectors to override component styles:

### Wrapper Background
```css
.e-multiselect.e-input-group .e-multi-select-wrapper {
    background-color: #f9f9f9;
}
```

### Delimiter Text
```css
.e-multiselect .e-delim-values {
    -webkit-text-fill-color: #333;
    font-size: 14px;
    font-family: 'Segoe UI', sans-serif;
}
```

### Chip Appearance
```css
/* Chip content text */
.e-multiselect .e-multi-select-wrapper .e-chips .e-chipcontent {
    font-family: 'Segoe UI', sans-serif;
    font-size: 13px;
    -webkit-text-fill-color: #fff;
}

/* Chip container */
.e-multi-select-wrapper .e-chips {
    background-color: #0078d4;
    height: 24px;
    border-radius: 12px;
}
```

### Dropdown Icon Color
```css
.e-multiselect.e-input-group .e-input-group-icon,
.e-multiselect.e-input-group.e-control-wrapper .e-input-group-icon:hover {
    color: #0078d4;
    font-size: 14px;
}
```

### Focus / Active Color
```css
.e-multiselect.e-input-group.e-control-wrapper.e-input-focus::before,
.e-multiselect.e-input-group.e-control-wrapper.e-input-focus::after {
    background: #0078d4;
}
```

### Disabled Text Color
```css
.e-multiselect.e-disabled .e-multi-select-wrapper .e-delim-values {
    -webkit-text-fill-color: #999;
}
```

### Placeholder Color
```css
.e-multiselect input.e-dropdownbase::placeholder {
    color: #aaa;
}
```

### Popup Item Appearance
```css
/* All items */
.e-dropdownbase .e-list-item,
.e-dropdownbase .e-list-item.e-item-focus {
    background-color: #fff;
    color: #333;
    min-height: 32px;
}

/* Hover / active / focused */
.e-dropdownbase .e-list-item.e-item-focus,
.e-dropdownbase .e-list-item.e-active,
.e-dropdownbase .e-list-item.e-hover {
    background-color: #e3f2fd;
    color: #0078d4;
}
```

### Checkbox Color
```css
.e-popup .e-checkbox-wrapper .e-frame.e-check,
.e-popup .e-checkbox-wrapper:hover .e-frame.e-check {
    background-color: #0078d4;
    color: white;
}
```

### Outline Theme Focus
```css
.e-outline.e-input-group.e-input-focus:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) {
    border-color: #0078d4;
    box-shadow: inset 1px 1px #0078d4, inset -1px 0 #0078d4, inset 0 -1px #0078d4;
}
```

### Float Label Customization
```css
/* Float label focus color */
.e-multiselect.e-input-group.e-control-wrapper.e-float-input.e-input-focus .e-float-text.e-label-top {
    color: #0078d4;
}

/* Float label underline */
.e-float-input.e-input-group:not(.e-float-icon-left) .e-float-line::before,
.e-float-input.e-input-group:not(.e-float-icon-left) .e-float-line::after {
    background-color: #0078d4;
}
```

---

## See Also

- [Grouping & Virtualization](grouping-and-virtualization.md) — Grouping with `groupTemplate`
- [Checkbox & Selection](checkbox-and-selection.md) — Checkbox mode styling
- [Advanced Features](advanced-features.md) — Accessibility, RTL, localization
