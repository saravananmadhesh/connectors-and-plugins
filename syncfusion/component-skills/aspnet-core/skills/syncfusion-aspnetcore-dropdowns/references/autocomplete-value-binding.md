# Value Binding – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Overview](#overview)
- [Primitive Data Types](#primitive-data-types)
- [Object Data Types](#object-data-types)

---

## Overview

Value binding allows you to associate data values with list items and pre-select or retrieve values programmatically. The AutoComplete supports:
- **Primitive binding:** string, number, boolean, null using the `value` property
- **Object binding:** full object binding using `allowObjectBinding`

---

## Primitive Data Types

Use the `value` property to bind or pre-select a primitive value (string, number, boolean).

**Pre-selecting a string value:**

```cshtml
@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf", "Hockey", "Tennis" };
}

<ejs-autocomplete id="sports"
    dataSource="sports"
    placeholder="Select a sport"
    value="Cricket">
</ejs-autocomplete>
```

**Pre-selecting from an object list (value maps to a field):**

```cshtml
@{
    List<Countries> country = new List<Countries> {
        new Countries { Name = "Australia", Code = "AU" },
        new Countries { Name = "India",     Code = "IN" },
        new Countries { Name = "Germany",   Code = "DE" }
    };
}

<ejs-autocomplete id="country"
    dataSource="@country"
    placeholder="Select a country"
    value="India">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

**Supported primitive types:**
- `string`
- `number` (int, double)
- `bool`
- `null` (clears selection)

---

## Object Data Types

When `allowObjectBinding` is enabled, the `value` property holds the full selected object (not just the text/id field). This is useful when you need the entire selected item object in your form submission or JavaScript code.

**Default:** `allowObjectBinding` is `false`

**Enable object binding:**

```cshtml
@{
    List<Record> records = new Record().RecordModelList();
}

<ejs-autocomplete id="records"
    dataSource="@records"
    placeholder="Select an item"
    allowObjectBinding="true">
    <e-autocomplete-fields value="Text"></e-autocomplete-fields>
</ejs-autocomplete>
```

**Model:**
```csharp
public class Record {
    public string ID { get; set; }
    public string Text { get; set; }
    public List<Record> RecordModelList() {
        return Enumerable.Range(1, 150).Select(i => new Record {
            ID = i.ToString(),
            Text = "Item " + i
        }).ToList();
    }
}
```

When `allowObjectBinding="true"`:
- `value` returns the full selected object: `{ ID: "5", Text: "Item 5" }`
- When `allowObjectBinding="false"` (default), `value` returns just the mapped field value: `"Item 5"`

> Use `allowObjectBinding` when you need to send the entire selected record (not just one field) to the server or use multiple fields from the selection in client-side logic.
