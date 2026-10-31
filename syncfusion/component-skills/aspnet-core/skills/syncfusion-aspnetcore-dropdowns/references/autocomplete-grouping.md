# Grouping – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Overview](#overview)
- [Basic Grouping](#basic-grouping)
- [Custom Group Header with groupTemplate](#custom-group-header-with-grouptemplate)

---

## Overview

The AutoComplete supports grouping list items into categories. Items are grouped by mapping the `groupBy` field in the data source. The group header is displayed both inline (within the list) and as a fixed header that updates dynamically as you scroll.

---

## Basic Grouping

Map the `groupBy` field in `<e-autocomplete-fields>` to group items by a category column.

**Model:**
```csharp
public class Vegetables {
    public string Vegetable { get; set; }
    public string Category { get; set; }
    public string Id { get; set; }
}
```

**View:**
```cshtml
@{
    List<Vegetables> veg = new List<Vegetables> {
        new Vegetables { Vegetable = "Cabbage",     Category = "Leafy and Salad", Id = "item1" },
        new Vegetables { Vegetable = "Chickpea",    Category = "Beans",           Id = "item2" },
        new Vegetables { Vegetable = "Garlic",      Category = "Bulb and Stem",   Id = "item3" },
        new Vegetables { Vegetable = "Green bean",  Category = "Beans",           Id = "item4" },
        new Vegetables { Vegetable = "Onion",       Category = "Bulb and Stem",   Id = "item7" },
        new Vegetables { Vegetable = "Pumpkins",    Category = "Leafy and Salad", Id = "item8" },
        new Vegetables { Vegetable = "Spinach",     Category = "Leafy and Salad", Id = "item9" }
    };
}

<ejs-autocomplete id="vegetables"
    dataSource="@veg"
    placeholder="Select a vegetable"
    popupHeight="200px">
    <e-autocomplete-fields groupBy="Category" value="Vegetable"></e-autocomplete-fields>
</ejs-autocomplete>
```

The fixed group header updates dynamically to show the current category as the user scrolls through the list.

---

## Custom Group Header with groupTemplate

Use `groupTemplate` to customize the group header appearance. The template receives the group data and can display any HTML.

```cshtml
@{
    List<Vegetables> veg = new List<Vegetables> {
        new Vegetables { Vegetable = "Cabbage",  Category = "Leafy and Salad", Id = "item1" },
        new Vegetables { Vegetable = "Chickpea", Category = "Beans",           Id = "item2" },
        new Vegetables { Vegetable = "Garlic",   Category = "Bulb and Stem",   Id = "item3" }
    };
}

<ejs-autocomplete id="vegetables"
    dataSource="@veg"
    placeholder="Select a vegetable"
    popupHeight="200px"
    groupTemplate="<strong>${Category}</strong>">
    <e-autocomplete-fields groupBy="Category" value="Vegetable"></e-autocomplete-fields>
</ejs-autocomplete>
```

> The `groupTemplate` applies to both inline group headers and the fixed header at the top of the popup. Use `${fieldName}` syntax to bind data fields in the template string.
