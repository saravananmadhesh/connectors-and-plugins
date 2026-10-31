# Templates and Styling — DropDownList (ASP.NET Core)

> **Official Docs:**  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/templates  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/style

---

## Templates Overview

The DropDownList supports the following template properties (all use EJ2 template engine syntax with `${fieldName}` bindings):

| Template Property | Attribute | Purpose |
|-------------------|-----------|---------|
| `ItemTemplate` | `itemTemplate` | Customize each list item in the popup |
| `ValueTemplate` | `valueTemplate` | Customize the selected value shown in the input |
| `HeaderTemplate` | `headerTemplate` | Static header at the top of the popup |
| `FooterTemplate` | `footerTemplate` | Static footer at the bottom of the popup |
| `GroupTemplate` | `groupTemplate` | Custom group header for grouped items |
| `NoRecordsTemplate` | `noRecordsTemplate` | Shown when no data is available |
| `ActionFailureTemplate` | `actionFailureTemplate` | Shown when remote data fetch fails |

---

## Item Template

Customize the rendering of each list item using `itemTemplate`:

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    query="new ej.data.Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6)"
    placeholder="Select a customer"
    popupHeight="200px"
    itemTemplate="<span><span class='name'>${FirstName}</span><span class='city'>${City}</span></span>">
    <e-dropdownlist-fields value="FirstName"></e-dropdownlist-fields>
    <e-data-manager url="/api/employees"
                    adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-dropdownlist>

<style>
    .city {
        right: 15px;
        position: absolute;
    }
</style>
```

---

## Value Template

Customize the selected value displayed in the component input using `valueTemplate`:

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    query="new ej.data.Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6)"
    placeholder="Select a customer"
    popupHeight="200px"
    itemTemplate="<span><span class='name'>${FirstName}</span><span class='city'>${City}</span></span>"
    valueTemplate="<span>${FirstName} - ${City}</span>">
    <e-dropdownlist-fields text="FirstName" value="EmployeeID"></e-dropdownlist-fields>
    <e-data-manager url="/api/employees"
                    adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-dropdownlist>

<style>
    .city {
        right: 15px;
        position: absolute;
    }
</style>
```

---

## Group Template

Customize group header rendering with `groupTemplate` (applies to both inline and fixed sticky headers):

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    query="new ej.data.Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6).where(new ej.data.Predicate('City', 'equal','london').or('City','equal','seattle'))"
    placeholder="Select a customer"
    popupHeight="200px"
    groupTemplate="<strong>${City}</strong>">
    <e-dropdownlist-fields groupBy="City" value="FirstName"></e-dropdownlist-fields>
    <e-data-manager url="/api/employees"
                    adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-dropdownlist>
```

---

## Header Template

Add a static header at the top of the popup list using `headerTemplate`:

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    query="new ej.data.Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6)"
    placeholder="Find an Employee"
    popupHeight="200px"
    headerTemplate="<span class='head'><span class='name'>Name</span><span class='city'>City</span></span>"
    itemTemplate="<span class='item'><span class='name'>${FirstName}</span><span class='city'>${City}</span></span>">
    <e-dropdownlist-fields value="FirstName"></e-dropdownlist-fields>
    <e-data-manager url="/api/employees"
                    adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-dropdownlist>

<style>
    .head, .item {
        display: table;
        width: 100%;
        margin: auto;
    }
    .head {
        height: 40px;
        font-size: 15px;
        font-weight: 600;
    }
    .name, .city {
        display: table-cell;
        vertical-align: middle;
        width: 50%;
    }
    .head .name { text-indent: 16px; }
    .head .city { text-indent: 10px; }
</style>
```

---

## Footer Template

Add a static footer at the bottom of the popup list using `footerTemplate`:

```cshtml
<ejs-dropdownlist id="employees"
    dataSource="@ViewBag.data"
    placeholder="Select a game"
    popupHeight="270px"
    footerTemplate="<span class='foot'>Total list items: 8</span>">
    <e-dropdownlist-fields value="Name"></e-dropdownlist-fields>
</ejs-dropdownlist>

<style>
    .foot {
        text-indent: 1.2em;
        display: block;
        font-size: 15px;
        line-height: 40px;
        border-top: 1px solid #e0e0e0;
    }
</style>
```

---

## No Records Template

Customize the popup content when no data is found using `noRecordsTemplate`:

```cshtml
<ejs-dropdownlist id="employees"
    dataSource="@ViewBag.data"
    placeholder="Select an employee"
    popupHeight="270px"
    noRecordsTemplate="<span class='norecord'>NO DATA AVAILABLE</span>">
    <e-dropdownlist-fields value="Name"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## Action Failure Template

Customize the popup content when a remote data fetch request fails using `actionFailureTemplate`:

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    query="new ej.data.Query().from('Employees').select(['FirstName']).take(6)"
    placeholder="Select a customer"
    popupHeight="200px"
    actionFailureTemplate="<span class='action-failure'>Data fetch failed</span>">
    <e-dropdownlist-fields value="FirstName"></e-dropdownlist-fields>
    <e-data-manager url="/api/employees"
                    adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-dropdownlist>
```

---

## CSS Customization

### Customize the Input Wrapper Element

```css
.e-ddl.e-input-group.e-control-wrapper .e-input {
    font-size: 20px;
    font-family: emoji;
    color: #ab3243;
    background: #32a5ab;
}
```

### Customize the Dropdown Icon Color

```css
.e-ddl.e-input-group .e-input-group-icon,
.e-ddl.e-input-group.e-control-wrapper .e-input-group-icon:hover {
    color: #bb233d;
    font-size: 13px;
}
```

### Customize the Focus Color

```css
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::before,
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::after {
    background: #c000ff;
}
```

### Customize Outline Theme Focus Color

```css
.e-outline.e-input-group.e-input-focus:hover:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled):not(.e-float-icon-left),
.e-outline.e-input-group.e-input-focus.e-control-wrapper:hover:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled):not(.e-float-icon-left),
.e-outline.e-input-group.e-input-focus:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled),
.e-outline.e-input-group.e-control-wrapper.e-input-focus:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) {
    border-color: #b1bd15;
    box-shadow: inset 1px 1px #b1bd15, inset -1px 0 #b1bd15, inset 0 -1px #b1bd15;
}
```

### Customize Disabled Component Text Color

```css
.e-input-group.e-control-wrapper .e-input[disabled] {
    -webkit-text-fill-color: #0d9133;
}
```

### Customize Float Label Focus Color

```css
.e-float-input.e-input-group:not(.e-float-icon-left) .e-float-line::before,
.e-float-input.e-control-wrapper.e-input-group:not(.e-float-icon-left) .e-float-line::before,
.e-float-input.e-input-group:not(.e-float-icon-left) .e-float-line::after,
.e-float-input.e-control-wrapper.e-input-group:not(.e-float-icon-left) .e-float-line::after {
    background-color: #2319b8;
}

.e-ddl.e-lib.e-input-group.e-control-wrapper.e-float-input.e-input-focus .e-float-text.e-label-top {
    color: #2319b8;
}
```

### Customize Placeholder Text Color

```css
.e-ddl.e-input-group input.e-input::placeholder {
    color: red;
}
```

### Add Mandatory Indicator (*) to Float Label

```css
.e-input-group.e-control-wrapper.e-float-input .e-float-text::after {
    content: "*";
    color: red;
}
```

### Customize Hover / Focus / Active Item Background

```css
.e-dropdownbase .e-list-item.e-item-focus,
.e-dropdownbase .e-list-item.e-active,
.e-dropdownbase .e-list-item.e-active.e-hover,
.e-dropdownbase .e-list-item.e-hover {
    background-color: #1f9c99;
    color: #2319b8;
}
```

### Customize Popup List Item Appearance

```css
.e-dropdownbase .e-list-item,
.e-dropdownbase .e-list-item.e-item-focus {
    background-color: #29c2b8;
    color: #207cd9;
    font-family: emoji;
    min-height: 29px;
}
```

---

## FloatLabelType

Control floating label behavior with `floatLabelType`:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    placeholder="Select an item"
    floatLabelType="Auto">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

Valid values: `Never` (default), `Always`, `Auto`.

---

## Custom CSS Class

Apply a custom CSS class to the root element:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    cssClass="custom-dropdown"
    placeholder="Select an item">
</ejs-dropdownlist>
```

---

## Relevant Properties from api.md

| Property | Attribute | Description |
|----------|-----------|-------------|
| `ItemTemplate` | `itemTemplate` | Template for each popup list item |
| `ValueTemplate` | `valueTemplate` | Template for the selected value in input |
| `HeaderTemplate` | `headerTemplate` | Template for the popup header |
| `FooterTemplate` | `footerTemplate` | Template for the popup footer |
| `GroupTemplate` | `groupTemplate` | Template for group headers |
| `NoRecordsTemplate` | `noRecordsTemplate` | Template when no records found (default: `"No records found"`) |
| `ActionFailureTemplate` | `actionFailureTemplate` | Template when data fetch fails (default: `"Request failed"`) |
| `CssClass` | `cssClass` | Custom CSS class for the root element |
| `FloatLabelType` | `floatLabelType` | Float label behavior: `Never`, `Always`, `Auto` |
| `Width` | `width` | Width of the component |
| `PopupHeight` | `popupHeight` | Popup list height |
| `PopupWidth` | `popupWidth` | Popup list width |
