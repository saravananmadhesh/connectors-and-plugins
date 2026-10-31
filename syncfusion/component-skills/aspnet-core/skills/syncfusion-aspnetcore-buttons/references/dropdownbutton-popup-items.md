# Popup Items – ASP.NET Core DropDownButton

## Basic Items

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
}

<ejs-dropdownbutton id="ddb" content="Edit" items="items"></ejs-dropdownbutton>
```

## Items with Icons

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut", iconCss = "e-icons e-cut-icon" });
    items.Add(new { text = "Copy", iconCss = "e-icons e-copy-icon" });
    items.Add(new { text = "Paste", iconCss = "e-icons e-paste-icon" });
}

<ejs-dropdownbutton id="ddb" content="Edit" items="items"></ejs-dropdownbutton>
```

## Items with Separators

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { separator = true });
    items.Add(new { text = "Paste" });
}

<ejs-dropdownbutton id="ddb" content="Edit" items="items"></ejs-dropdownbutton>
```

## Disabled Items

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste", disabled = true });
}

<ejs-dropdownbutton id="ddb" content="Edit" items="items"></ejs-dropdownbutton>
```

## Items with URLs

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Google", url = "https://google.com" });
    items.Add(new { text = "YouTube", url = "https://youtube.com" });
}

<ejs-dropdownbutton id="ddb" content="Links" items="items"></ejs-dropdownbutton>
```

---

## See Also

- [DropDownButton Getting Started](dropdownbutton-getting-started.md)
- [DropDownButton Events](dropdownbutton-events-and-interactivity.md)
- [DropDownButton API](dropdownbutton-api.md)
