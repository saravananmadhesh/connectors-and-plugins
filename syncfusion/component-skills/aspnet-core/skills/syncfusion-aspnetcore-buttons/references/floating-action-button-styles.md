# Styles – ASP.NET Core Floating Action Button

## Built-in Styles

### Primary FAB

```cshtml
<ejs-fab 
    id="fab" 
    content="Add"
    cssClass="e-primary">
</ejs-fab>
```

### Success FAB

```cshtml
<ejs-fab 
    id="fab" 
    content="Save"
    cssClass="e-success">
</ejs-fab>
```

### Danger FAB

```cshtml
<ejs-fab 
    id="fab" 
    content="Delete"
    cssClass="e-danger">
</ejs-fab>
```

### Custom Styling

```cshtml
<style>
    .custom-fab {
        background-color: #ff6b6b !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
</style>

<ejs-fab 
    id="fab" 
    content="Custom"
    cssClass="custom-fab">
</ejs-fab>
```

---

## See Also

- [FAB Getting Started](floating-action-button-getting-started.md)
- [FAB Positions](floating-action-button-positions.md)
- [FAB Icons](floating-action-button-icons.md)
- [FAB API](floating-action-button-api.md)
