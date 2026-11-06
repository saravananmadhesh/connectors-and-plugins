# Property Panel

The Property Panel is the right pane of the ASP.NET Core Form Builder. It appears when a field is selected on the design canvas. When no field is selected, the right pane displays form settings.

## When the property panel appears

The property panel opens when a field is dropped, an existing field is edited, or a widget type is switched in Developer mode. Closing the editor returns the pane to Form Settings.

## Elements in the property panel

- **Display** - labels, placeholders, defaults, layout, and styling.
- **Validation** - required, length, pattern, and custom validation settings.
- **Conditions** - conditional visibility, required, disabled, read-only, set-value, choice-based, and conditional-data rules.
- **Layout** - field size and HTML attributes.
- **Data** - data source and columns for Data Grid fields.

## Real-time auto-save

Changes are applied immediately. There is no Save button; the design canvas reflects each property change.

## Add a property

Use the Form Builder instance from `ej2_instances` and call `setProperty`:

```cshtml
<ejs-form-builder id="form-builder-control"></ejs-form-builder>

<script>
    setTimeout(function () {
        var element = document.getElementById('form-builder-control');
        var formBuilder = element.ej2_instances[0];

        formBuilder.setProperty('textarea', {
            key: 'enableRtl',
            label: 'Enable RTL',
            type: 'boolean',
            default: false
        });
    }, 100);
</script>
```

## Hide a property

Use `getProperty`, set `visible` to `false`, and call `refresh()`:

```cshtml
<ejs-form-builder id="form-builder-control"></ejs-form-builder>

<script>
    setTimeout(function () {
        var element = document.getElementById('form-builder-control');
        var formBuilder = element.ej2_instances[0];

        formBuilder.getProperty('textarea', 'label').visible = false;
        formBuilder.refresh();
    }, 100);
</script>
```
