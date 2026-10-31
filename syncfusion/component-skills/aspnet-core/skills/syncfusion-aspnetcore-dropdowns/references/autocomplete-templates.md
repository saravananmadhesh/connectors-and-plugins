# Templates – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Overview](#overview)
- [Item Template](#item-template)
- [Group Template](#group-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)

---

## Overview

The AutoComplete uses the EJ2 Template engine to customize every section of the suggestion popup:

| Template Property | Location | Purpose |
|---|---|---|
| `itemTemplate` | Each list item | Custom item rendering |
| `groupTemplate` | Group headers | Custom category headings |
| `headerTemplate` | Top of popup (static) | Column headings, search tips |
| `footerTemplate` | Bottom of popup (static) | Record counts, actions |
| `noRecordsTemplate` | Popup when empty | Empty state message |
| `actionFailureTemplate` | Popup on fetch error | Error message |

Use `${fieldName}` syntax to bind data fields in inline templates, or use `<script>` templates for complex HTML.

---

## Item Template

Customize each list item's content using `itemTemplate`. The template receives the item's data object.

**Inline template (simple):**
```cshtml
@{
    List<Employee> employees = new List<Employee> {
        new Employee { Name = "John Smith",  Role = "Engineer",  Eimg = "1" },
        new Employee { Name = "Jane Doe",    Role = "Designer",  Eimg = "2" },
        new Employee { Name = "Bob Brown",   Role = "Manager",   Eimg = "3" }
    };
}

<ejs-autocomplete id="employees"
    dataSource="@employees"
    placeholder="Select an employee"
    popupHeight="200px"
    itemTemplate="<div><span class='name'>${Name}</span><span class='role'>${Role}</span></div>">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

**Script template (complex HTML):**
```cshtml
<ejs-autocomplete id="employees"
    dataSource="@employees"
    placeholder="Select an employee"
    popupHeight="200px"
    itemTemplate="#itemTemplate">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>

<script id="itemTemplate" type="text/x-template">
    <div class="eName">
        <span class="name">${Name}</span>
        <span class="city">${Role}</span>
    </div>
</script>
```

---

## Group Template

Customize group header content using `groupTemplate`. Applies to both inline and fixed group headers.

```cshtml
<ejs-autocomplete id="vegetables"
    dataSource="@veg"
    placeholder="Select a vegetable"
    popupHeight="200px"
    groupTemplate="<strong class='group-header'>${Category}</strong>">
    <e-autocomplete-fields value="Vegetable" groupBy="Category"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

## Header Template

Use `headerTemplate` to add a static element at the top of the popup list. Useful for column headings in multi-column layouts.

```cshtml
<ejs-autocomplete id="employees"
    dataSource="@employees"
    placeholder="Select an employee"
    popupHeight="200px"
    headerTemplate="<div class='header'><span>Name</span><span>Role</span></div>"
    itemTemplate="<div><span>${Name}</span><span>${Role}</span></div>">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

> `headerTemplate` is static and does not receive data context. Use it for labels or decorative content.

---

## Footer Template

Use `footerTemplate` to add a static element at the bottom of the popup. Commonly used to show item count or links.

```cshtml
<ejs-autocomplete id="employees"
    dataSource="@employees"
    placeholder="Select an employee"
    footerTemplate="<div class='footer'>Total: ${count} items</div>">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

**Dynamically display total count using JavaScript:**
```cshtml
<ejs-autocomplete id="customers"
    dataSource="@customers"
    placeholder="Find a customer"
    footerTemplate="#footerTemplate">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>

<script id="footerTemplate" type="text/x-template">
    <div class="footer">Total items: <strong id="totalcount"></strong></div>
</script>

<script>
    var acObj = document.getElementById("customers").ej2_instances[0];
    acObj.addEventListener('open', function () {
        document.getElementById('totalcount').textContent = acObj.dataSource.length;
    });
</script>
```

---

## No Records Template

Use `noRecordsTemplate` to display a custom message when no matching items are found.

**Default message:** `"No records found"`

```cshtml
<ejs-autocomplete id="country"
    dataSource="@countries"
    placeholder="Find a country"
    noRecordsTemplate="<span class='no-data'>No country found</span>">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

## Action Failure Template

Use `actionFailureTemplate` to display a custom message when a remote data fetch fails.

**Default message:** `"Request failed"`

```cshtml
<ejs-autocomplete id="customers"
    placeholder="Find a customer"
    actionFailureTemplate="<span class='error'>Data fetch failed. Please retry.</span>">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>
```
