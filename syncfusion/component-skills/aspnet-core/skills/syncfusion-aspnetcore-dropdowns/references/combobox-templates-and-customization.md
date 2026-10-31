# Templates & Customization

## Table of Contents
- [Overview](#overview)
- [Item Templates](#item-templates)
- [Header & Footer Templates](#header--footer-templates)
- [No Records Template](#no-records-template)
- [CSS Customization](#css-customization)
- [Advanced Examples](#advanced-examples)

---

## Overview

Templates allow you to customize the visual presentation of ComboBox items and container. Instead of plain text, you can display:

- Icons, images, and rich content
- Multi-line information with descriptions
- Styled badges, pills, or custom layouts
- Dynamic content based on data properties

---

## Item Templates

### Basic Item Template

**View:**

```cshtml
<ejs-combobox id="emp-combo"
    dataSource="@ViewBag.employeeData"
    itemTemplate="itemTemplate"
    placeholder="Select an employee">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>

<script type="text/x-template" id="itemTemplate">
    <div class="item-wrapper">
        <span class="avatar">${Avatar}</span>
        <div>
            <div class="name">${Name}</div>
            <small class="dept">${Department}</small>
        </div>
    </div>
</script>
```

**Controller:**

```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Avatar { get; set; }
    public string Department { get; set; }
}

public IActionResult Index()
{
    ViewBag.employeeData = new List<Employee>
    {
        new Employee { Id = 1, Name = "Alice Johnson", Avatar = "👩‍💼", Department = "Engineering" },
        new Employee { Id = 2, Name = "Bob Smith", Avatar = "👨‍💼", Department = "Sales" },
        new Employee { Id = 3, Name = "Carol Davis", Avatar = "👩‍💼", Department = "HR" }
    };
    return View();
}
```

**CSS:**

```css
.item-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
}

.avatar {
    font-size: 24px;
}

.name {
    font-weight: 500;
}

.dept {
    color: #999;
    display: block;
    font-size: 12px;
}
```

### Template with Conditional Styling

**View:**

```cshtml
<ejs-combobox id="users-combo"
    dataSource="@ViewBag.userData"
    itemTemplate="statusTemplate"
    placeholder="Select a user">
</ejs-combobox>

<script type="text/x-template" id="statusTemplate">
    <div class="status-item">
        <span>${Name}</span>
        <span class="status-badge status-${Status.toLowerCase()}">
            ${Status}
        </span>
    </div>
</script>
```

**CSS:**

```css
.status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
}

.status-badge {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    color: white;
}

.status-active {
    background-color: #4CAF50;
}

.status-inactive {
    background-color: #9E9E9E;
}

.status-pending {
    background-color: #FF9800;
}
```

---

## Header & Footer Templates

### Header Template (Top of Dropdown)

Add information or actions at the top of dropdown:

**View:**

```cshtml
<ejs-combobox id="options-combo"
    dataSource="@ViewBag.options"
    headerTemplate="headerTemplate"
    placeholder="Choose...">
</ejs-combobox>

<script type="text/x-template" id="headerTemplate">
    <div class="dropdown-header">
        <h4>Select an Option</h4>
        <small>Showing available items</small>
    </div>
</script>
```

**CSS:**

```css
.dropdown-header {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

.dropdown-header h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
}

.dropdown-header small {
    color: #666;
}
```

**Use cases:**
- Instructions ("Type to filter")
- Count ("10 items available")
- Clear button or quick actions

### Footer Template (Bottom of Dropdown)

Add actions or information at bottom:

**View:**

```cshtml
<ejs-combobox id="items-combo"
    dataSource="@ViewBag.items"
    footerTemplate="footerTemplate"
    placeholder="Select item...">
</ejs-combobox>

<script type="text/x-template" id="footerTemplate">
    <div class="dropdown-footer">
        <button class="btn-more">View All</button>
    </div>
</script>
```

**CSS:**

```css
.dropdown-footer {
    padding: 10px 15px;
    border-top: 1px solid #ddd;
    background-color: #f9f9f9;
}

.btn-more {
    width: 100%;
    padding: 8px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
}

.btn-more:hover {
    background-color: #1976D2;
}
```

---

## No Records Template

Display custom message when no data matches the filter:

**View:**

```cshtml
<ejs-combobox id="search-combo"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    noRecordsTemplate="noRecordsTemplate"
    placeholder="Search...">
</ejs-combobox>

<script type="text/x-template" id="noRecordsTemplate">
    <div class="no-records">
        <p>No items match your search</p>
        <small>Try different keywords</small>
    </div>
</script>
```

**CSS:**

```css
.no-records {
    padding: 20px;
    text-align: center;
    color: #666;
}

.no-records p {
    margin: 0 0 5px 0;
    font-weight: 500;
}

.no-records small {
    color: #999;
    display: block;
}
```

---

## CSS Customization

### Custom CSS Class

Apply custom CSS class to root element:

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    cssClass="custom-combo"
    placeholder="Custom styled...">
</ejs-combobox>
```

**CSS:**

```css
.custom-combo .e-ddl-icon {
    color: #2196F3;
}

.custom-combo .e-input-focus {
    border-color: #2196F3;
}

.custom-combo .e-list-item:hover {
    background-color: #E3F2FD;
}
```

### Styling Popup

```css
/* Popup list styling */
.e-popup .e-list-item {
    padding: 12px 15px;
    font-size: 14px;
}

.e-popup .e-list-item:hover {
    background-color: #f0f0f0;
}

.e-popup .e-list-item.e-active {
    background-color: #2196F3;
    color: white;
}
```

### Float Label Customization

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    floatLabelType="Auto"
    placeholder="Label floats on focus...">
</ejs-combobox>
```

---

## Advanced Examples

### Complex Item Template with Metadata

**View:**

```cshtml
<ejs-combobox id="products-combo"
    dataSource="@ViewBag.products"
    itemTemplate="productTemplate"
    placeholder="Select a product">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>

<script type="text/x-template" id="productTemplate">
    <div class="product-item">
        <img src="${ImageUrl}" alt="${Name}" class="product-img" />
        <div class="product-info">
            <div class="product-name">${Name}</div>
            <div class="product-price">$${Price}</div>
            <div class="product-stock">${Stock} in stock</div>
        </div>
    </div>
</script>
```

**CSS:**

```css
.product-item {
    display: flex;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.product-img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
}

.product-info {
    flex: 1;
}

.product-name {
    font-weight: 500;
    margin-bottom: 3px;
}

.product-price {
    color: #2196F3;
    font-weight: bold;
}

.product-stock {
    font-size: 12px;
    color: #999;
}

.selected-product {
    display: flex;
    align-items: center;
    gap: 8px;
}

.small-img {
    width: 24px;
    height: 24px;
    border-radius: 3px;
}
```

### Template with Rich Content

**View:**

```cshtml
<ejs-combobox id="items-combo"
    dataSource="@ViewBag.items"
    itemTemplate="richTemplate"
    placeholder="Select...">
</ejs-combobox>

<script type="text/x-template" id="richTemplate">
    <div class="rich-item">
        <div class="item-icon">${Icon}</div>
        <div class="item-main">
            <div class="item-title">${Title}</div>
            <div class="item-description">${Description}</div>
        </div>
        <div class="item-badge">${Badge}</div>
    </div>
</script>
```

**CSS:**

```css
.rich-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 15px;
}

.item-icon {
    font-size: 20px;
}

.item-main {
    flex: 1;
}

.item-title {
    font-weight: 500;
    margin-bottom: 2px;
}

.item-description {
    font-size: 12px;
    color: #666;
}

.item-badge {
    background-color: #FF9800;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
}
```
