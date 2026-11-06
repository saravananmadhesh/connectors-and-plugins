# Items – ASP.NET Core Speed Dial

## Basic Items

```cshtml
@{
    List<SpeedDialItem> items = new List<SpeedDialItem>();
    items.Add(new SpeedDialItem
    {
        Text = "Cut"
    });
    items.Add(new SpeedDialItem
    {
        Text = "Copy"
    });
    items.Add(new SpeedDialItem
    {
        Text = "Paste"
    });
}

<ejs-speeddial 
    id="speeddial"
    content="Action"
    items="items"
    target="#container">
</ejs-speeddial>
```

## Items with Icons

```cshtml
@{
    List<SpeedDialItem> items = new List<SpeedDialItem>();
    items.Add(new SpeedDialItem
    {
        IconCss="e-icons e-cut",
        Text="Cut"
    });
    items.Add(new SpeedDialItem
    {
        IconCss="e-icons e-copy",
        Text="Copy"
    });
    items.Add(new SpeedDialItem
    {
        IconCss="e-icons e-paste",
        Text="Paste"
    });
}

<ejs-speeddial 
    id="speeddial"
    content="Action"
    items="items"
    iconCss="e-icons e-share-icon"
    target="#container">
</ejs-speeddial>
```

---

## See Also

- [Speed Dial Getting Started](speeddial-getting-started.md)
- [Speed Dial Display Modes](speeddial-display-modes.md)
- [Speed Dial Positions](speeddial-positions.md)
- [Speed Dial API](speeddial-api.md)
