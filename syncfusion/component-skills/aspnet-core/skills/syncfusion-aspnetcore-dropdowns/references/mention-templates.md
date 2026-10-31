# Templates – Syncfusion ASP.NET Core Mention

## Table of Contents
- [Overview](#overview)
- [Item Template](#item-template)
- [Display Template](#display-template)
- [No Records Template](#no-records-template)
- [Spinner Template](#spinner-template)

---

## Overview

The Mention component provides template support to customize the suggestion list items, the display of selected values in the editor, the no-records message, and the loading indicator. All templates use JavaScript template syntax with `${fieldName}` interpolation.

---

## Item Template

Use `itemTemplate` to customize the appearance of each item in the suggestion popup list.

**Use when:** You want to show additional data (e.g., avatar images, email addresses, role labels) alongside the item name.

**Example – Two-column item with employee image:**

**Model:**
```csharp
public class EmployeeData
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Department { get; set; }
    public string EmpImage { get; set; }
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<EmployeeData>
    {
        new EmployeeData { FirstName = "Andrew", LastName = "Fuller", Department = "Team Lead", EmpImage = "andrew.png" },
        new EmployeeData { FirstName = "Janet", LastName = "Leverling", Department = "HR", EmpImage = "janet.png" },
        new EmployeeData { FirstName = "Laura", LastName = "Callahan", Department = "Finance", EmpImage = "laura.png" }
    };
    return View();
}
```

**View:**
```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    itemTemplate="<span class='item'><img src='${EmpImage}' class='avatar' /><span class='name'>${FirstName} ${LastName}</span><span class='dept'>${Department}</span></span>">
    <e-mention-fields text="FirstName" value="FirstName"></e-mention-fields>
</ejs-mention>
```

**Alternative: Use `<script>` tag template for complex HTML:**
```cshtml
<script id="itemTemplate" type="text/x-template">
    <span class="mention-item">
        <img src="${EmpImage}" alt="${FirstName}" class="emp-avatar" />
        <span class="emp-name">${FirstName} ${LastName}</span>
        <span class="emp-dept">${Department}</span>
    </span>
</script>

<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    itemTemplate="#itemTemplate">
    <e-mention-fields text="FirstName" value="FirstName"></e-mention-fields>
</ejs-mention>
```

---

## Display Template

Use `displayTemplate` to customize how the selected value appears **inside the editor** after a suggestion is chosen. This overrides the default behavior of inserting just the `text` field value.

**Use when:** You want to display a formatted tag, combined fields, or styled chip in the editor upon selection.

**Example – Insert "FirstName - City" as the display value:**

**Model:**
```csharp
public class ContactData
{
    public string FirstName { get; set; }
    public string City { get; set; }
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<ContactData>
    {
        new ContactData { FirstName = "Andrew", City = "London" },
        new ContactData { FirstName = "Janet", City = "New York" },
        new ContactData { FirstName = "Laura", City = "Seattle" }
    };
    return View();
}
```

**View:**
```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    displayTemplate="<span class='mention-chip'>@${FirstName} - ${City}</span>">
    <e-mention-fields text="FirstName" value="FirstName"></e-mention-fields>
</ejs-mention>
```

> The `displayTemplate` renders in the editor as an inline HTML element. This is useful for creating @mention chips or formatted references.

---

## No Records Template

Use `noRecordsTemplate` to show a custom message or design when no data matches the user's search input.

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    noRecordsTemplate="<span class='no-rec'>No user found matching your search.</span>">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

**With dynamic content:**
```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    noRecordsTemplate="<span>No results for '${text}'. Try a different name.</span>">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

> Default value: `"No records found"`

---

## Spinner Template

Use `spinnerTemplate` to customize the loading indicator shown while data is being fetched from a remote source.

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    spinnerTemplate="<div class='custom-spinner'><span class='loader'></span> Loading users...</div>">
    <e-data-manager url="/api/users" adaptor="WebApiAdaptor"></e-data-manager>
</ejs-mention>
```

**With inline SVG spinner:**
```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    spinnerTemplate="<div style='text-align:center; padding: 10px;'><svg class='spin' width='24' height='24'><circle cx='12' cy='12' r='10' stroke='#0078d4' stroke-width='2' fill='none'/></svg></div>">
    <e-data-manager url="/api/users" adaptor="WebApiAdaptor"></e-data-manager>
</ejs-mention>
```

> The spinner template is displayed until the remote data fetch completes. Default value: `null` (uses the default Syncfusion spinner).

---

## Notes

- All templates use JavaScript template string syntax: `${fieldName}` to interpolate data source field values.
- `itemTemplate` — affects what's shown in the popup suggestion list.
- `displayTemplate` — affects what's inserted into the editor after selection.
- `noRecordsTemplate` — shown in the popup when search yields no results.
- `spinnerTemplate` — shown while remote data is loading.
