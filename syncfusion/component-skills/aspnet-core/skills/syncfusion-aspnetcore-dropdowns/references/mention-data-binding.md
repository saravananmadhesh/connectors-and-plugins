# Data Binding – Syncfusion ASP.NET Core Mention

## Table of Contents
- [Overview](#overview)
- [Field Mapping](#field-mapping)
- [Binding Local Data](#binding-local-data)
  - [Array of Simple Strings](#array-of-simple-strings)
  - [Array of JSON Objects](#array-of-json-objects)
  - [Array of Complex (Nested) Data](#array-of-complex-nested-data)
- [Binding Remote Data](#binding-remote-data)
  - [OData V4 Adaptor](#odata-v4-adaptor)
  - [Web API Adaptor](#web-api-adaptor)

---

## Overview

The Mention loads data through the `dataSource` property. It supports:
- Local data: plain arrays of strings or arrays of JSON objects
- Remote data: `DataManager` with OData V4, Web API, and other adaptors

Use `<e-mention-fields>` to map object columns to the Mention's `text`, `value`, `groupBy`, `iconCss`, and `disabled` display fields.

---

## Field Mapping

| Field | Maps To | Purpose |
|---|---|---|
| `text` | Display text | The text shown in the suggestion list and inserted into editor |
| `value` | Hidden value | The underlying value associated with each item |
| `groupBy` | Group category | Column used to group suggestion items |
| `iconCss` | Icon class | CSS class for an icon displayed next to each item |
| `disabled` | Disabled state | Column that marks individual items as non-selectable |
| `htmlAttributes` | Item element attributes | Additional HTML attributes for list item elements |

> When binding an array of strings, no field mapping is needed — both `text` and `value` resolve to the string itself.

---

## Binding Local Data

### Array of Simple Strings

The simplest form. Both the display text and internal value are the same string.

```cshtml
@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf", "Hockey", "Tennis" };
}

<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@sports">
</ejs-mention>
```

---

### Array of JSON Objects

Map specific columns using `<e-mention-fields>`:

**Model:**
```csharp
public class EmailData
{
    public string Name { get; set; }
    public string EmailId { get; set; }
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<EmailData>
    {
        new EmailData { Name = "Adeline MacAdams", EmailId = "adeline@example.com" },
        new EmailData { Name = "Alba Torres", EmailId = "alba@example.com" },
        new EmailData { Name = "Amy Fernandez", EmailId = "amy@example.com" },
        new EmailData { Name = "Andrew Jack", EmailId = "andrew@example.com" }
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
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

---

### Array of Complex (Nested) Data

For data with nested objects, use dot notation in the field mapping:

**Model:**
```csharp
public class ComplexData
{
    public Country Country { get; set; }
    public Code Code { get; set; }
}

public class Country { public string Name { get; set; } }
public class Code { public string ID { get; set; } }
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<ComplexData>
    {
        new ComplexData { Country = new Country { Name = "Australia" }, Code = new Code { ID = "AU" } },
        new ComplexData { Country = new Country { Name = "Canada" }, Code = new Code { ID = "CA" } },
        new ComplexData { Country = new Country { Name = "India" }, Code = new Code { ID = "IN" } }
    };
    return View();
}
```

**View:**
```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Country.Name" value="Code.ID"></e-mention-fields>
</ejs-mention>
```

---

## Binding Remote Data

Use `<e-data-manager>` inside `<ejs-mention>` to connect to remote data services. The `query` property customizes the fetch request.

### OData V4 Adaptor

```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget"
    query="new ej.data.Query().from('Customers').select(['ContactName', 'CustomerID']).take(6)"
    suggestionCount="6">
    <e-mention-fields text="ContactName" value="CustomerID"></e-mention-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-mention>
```

> The `query` property accepts a JavaScript `ej.data.Query` expression as a string. Use it to filter, sort, select, and limit the fetched data.

---

### Web API Adaptor

```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget"
    query="new ej.data.Query().from('Employees').select(['FirstName', 'EmployeeID'])">
    <e-mention-fields text="FirstName" value="EmployeeID"></e-mention-fields>
    <e-data-manager url="url"
        adaptor="WebApiAdaptor" crossDomain="true">
    </e-data-manager>
</ejs-mention>
```

---

## Notes

- When binding remote data, use `minLength` to control how many characters must be typed before a server request is made — this prevents excessive calls on large datasets.
- Use the `filtering` event for custom server-side filtering logic.
- Always map `text` and `value` fields when working with object data to avoid undefined display/values.
