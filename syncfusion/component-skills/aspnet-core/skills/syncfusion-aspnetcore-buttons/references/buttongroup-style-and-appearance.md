# Style and Appearance – ASP.NET Core ButtonGroup

## Styling the Button Group

```cshtml
<style>
    .custom-btn-group {
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        display: inline-flex;
    }

    .custom-btn-group .e-btn {
        border-radius: 0;
        border-right: 1px solid #e0e0e0;
    }

    .custom-btn-group .e-btn:last-child {
        border-right: none;
    }
</style>

<div class="custom-btn-group e-btn-group">
    <ejs-button id="btn1" content="Option 1"></ejs-button>
    <ejs-button id="btn2" content="Option 2"></ejs-button>
    <ejs-button id="btn3" content="Option 3"></ejs-button>
</div>
```

## CSS Classes

### Available Classes

| Class | Purpose |
|-------|---------|
| `e-btn-group` | Container for button grouping |
| `e-btn` | Individual button |
| `e-primary` | Primary styling |
| `e-outline` | Outline button |
| `e-flat` | Flat button |
| `e-small` | Small size |

## Color Variants

```cshtml
<div class="e-btn-group">
    <ejs-button id="btn1" cssClass="e-primary" content="Primary"></ejs-button>
    <ejs-button id="btn2" cssClass="e-success" content="Success"></ejs-button>
    <ejs-button id="btn3" cssClass="e-danger" content="Danger"></ejs-button>
</div>
```

## Vertical Button Group

```cshtml
<style>
    .e-btn-group.vertical {
        display: flex;
        flex-direction: column;
    }

    .e-btn-group.vertical .e-btn {
        border-bottom: 1px solid #ddd;
    }

    .e-btn-group.vertical .e-btn:last-child {
        border-bottom: none;
    }
</style>

<div class="e-btn-group vertical">
    <ejs-button id="btn1" content="Top"></ejs-button>
    <ejs-button id="btn2" content="Middle"></ejs-button>
    <ejs-button id="btn3" content="Bottom"></ejs-button>
</div>
```

---

## See Also

- [ButtonGroup Getting Started](buttongroup-getting-started.md)
- [ButtonGroup Selection and Nesting](buttongroup-selection-and-nesting.md)
- [ButtonGroup How-To Patterns](buttongroup-how-to.md)
