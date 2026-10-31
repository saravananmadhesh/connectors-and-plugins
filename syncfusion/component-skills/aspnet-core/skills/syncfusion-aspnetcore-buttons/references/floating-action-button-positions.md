# Positions – ASP.NET Core Floating Action Button

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

### Top-Right Position

```cshtml
<ejs-fab 
    id="fab" 
    content="Edit"
    position="TopRight"
    cssClass="e-primary">
</ejs-fab>
```

### Bottom-Left Position

```cshtml
<ejs-fab 
    id="fab" 
    content="Add"
    position="BottomLeft"
    cssClass="e-success">
</ejs-fab>
```

### Positioned to Container

```cshtml
<div id="container" style="position: relative; height: 300px;">
    Content
    <ejs-fab 
        id="fab" 
        content="Edit"
        target="#container"
        position="TopRight">
    </ejs-fab>
</div>
```

---

## See Also

- [FAB Getting Started](floating-action-button-getting-started.md)
- [FAB Icons](floating-action-button-icons.md)
- [FAB Styles](floating-action-button-styles.md)
- [FAB API](floating-action-button-api.md)
