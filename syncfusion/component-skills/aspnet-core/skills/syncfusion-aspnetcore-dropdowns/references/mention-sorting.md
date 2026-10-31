# Sorting – Syncfusion ASP.NET Core Mention

## Overview

The Mention control supports sorting the suggestion list items using the `sortOrder` property. Sorting is applied to the bound data source before items are displayed in the popup.

---

## Sort Order Options

| Value | Behavior |
|---|---|
| `None` | Data source is not sorted (default — displayed in original order) |
| `Ascending` | Items sorted A–Z / smallest to largest |
| `Descending` | Items sorted Z–A / largest to smallest |

---

## Ascending Sort

```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    sortOrder="Ascending">
    <e-mention-fields text="Game" value="ID"></e-mention-fields>
</ejs-mention>
```

**Model:**
```csharp
public class SportsData
{
    public string Game { get; set; }
    public int ID { get; set; }
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<SportsData>
    {
        new SportsData { Game = "Tennis", ID = 1 },
        new SportsData { Game = "Basketball", ID = 2 },
        new SportsData { Game = "Badminton", ID = 3 },
        new SportsData { Game = "Cricket", ID = 4 },
        new SportsData { Game = "Football", ID = 5 }
    };
    return View();
}
```

---

## Descending Sort

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    sortOrder="Descending">
    <e-mention-fields text="Game" value="ID"></e-mention-fields>
</ejs-mention>
```

---

## No Sort (Default)

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    sortOrder="None">
    <e-mention-fields text="Game" value="ID"></e-mention-fields>
</ejs-mention>
```

---

## Notes

- `sortOrder` applies to the `text` field of the data source when using object data.
- For string arrays, items are sorted alphabetically.
- Sorting is applied on the client side before filtering, so the filtered results are still displayed in sorted order.
- `SortOrder.None` (default) preserves the original data source order.
