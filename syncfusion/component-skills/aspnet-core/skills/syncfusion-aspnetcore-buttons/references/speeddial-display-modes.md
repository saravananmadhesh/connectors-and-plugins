# Display Modes – ASP.NET Core Speed Dial

## Linear Mode (Default)

Items display in a line:

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
    direction="Up"
    target="#container">
</ejs-speeddial>
```

## Radial Mode

Items display in a circular pattern:

```cshtml
<ejs-speeddial 
    id="speeddial"
    content="Action"
    items="items"
    mode="Radial"
    target="#container">
</ejs-speeddial>
```

## Directions

| Direction | Description |
|-----------|-------------|
| `Up` | Items display upward |
| `Down` | Items display downward |
| `Left` | Items display leftward |
| `Right` | Items display rightward |

---

## See Also

- [Speed Dial Getting Started](speeddial-getting-started.md)
- [Speed Dial Items](speeddial-items.md)
- [Speed Dial Positions](speeddial-positions.md)
- [Speed Dial API](speeddial-api.md)
