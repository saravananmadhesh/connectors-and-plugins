# Positions – ASP.NET Core Speed Dial

## Position Values

| Position | Description |
|----------|-------------|
| `TopLeft` | Top-left corner |
| `TopCenter` | Top-center |
| `TopRight` | Top-right corner |
| `MiddleLeft` | Middle-left |
| `Center` | Center |
| `MiddleRight` | Middle-right |
| `BottomLeft` | Bottom-left corner |
| `BottomCenter` | Bottom-center |
| `BottomRight` | Bottom-right corner (default) |

## Examples

### Bottom-Right (Default)

```cshtml
<ejs-speeddial 
    id="speeddial"
    content="Action"
    items="items"
    position="BottomRight"
    target="#container">
</ejs-speeddial>
```

### Top-Right

```cshtml
<ejs-speeddial 
    id="speeddial"
    content="Action"
    items="items"
    position="TopRight"
    target="#container">
</ejs-speeddial>
```

### Center

```cshtml
<ejs-speeddial 
    id="speeddial"
    content="Action"
    items="items"
    position="Center"
    target="#container">
</ejs-speeddial>
```

---

## See Also

- [Speed Dial Getting Started](speeddial-getting-started.md)
- [Speed Dial Items](speeddial-items.md)
- [Speed Dial Display Modes](speeddial-display-modes.md)
- [Speed Dial API](speeddial-api.md)
