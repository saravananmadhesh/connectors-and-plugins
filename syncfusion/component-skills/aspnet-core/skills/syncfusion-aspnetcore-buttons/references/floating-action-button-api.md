# API Reference – ASP.NET Core Floating Action Button

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.fab.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.fab.html#properties)  
> **Namespace:** `Syncfusion.EJ2.Buttons`  
> **Assembly:** `Syncfusion.AspNetCore.Buttons.dll`  
> **Tag Helper:** `<ejs-fab>`

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `Clicked` | `clicked` | `string` (JS function) | `null` | Triggers on every click fire — both the initial press and each repeat while the button is held. Only emitted when `enableRepeat` is `true` |
| `Content` | `content` | `string` | `""` | Defines the text content of the Button element |
| `ContentTemplate` | `contentTemplate` | `MvcTemplate<object>` | — | Tag template for content |
| `Created` | `created` | `string` (JS function) | `null` | Triggers once the component rendering is completed |
| `CssClass` | `cssClass` | `string` | `""` | Defines class/multiple classes separated by a space in the Button element (type, style, size) |
| `Disabled` | `disabled` | `bool` | `false` | Specifies a value that indicates whether the Button is disabled or not |
| `EnableHtmlSanitizer` | `enableHtmlSanitizer` | `bool` | `true` | Specifies whether to enable rendering of untrusted HTML values; sanitizes suspected untrusted strings and scripts |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Enable or disable persisting component's state between page reloads |
| `EnableRepeat` | `enableRepeat` | `bool` | `false` | Enables hold-to-repeat behavior on the Button when set to `true` |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Allows additional HTML attributes such as title, name, etc. in key-value pair format |
| `IconCss` | `iconCss` | `string` | `""` | Defines class/multiple classes separated by a space for the Button that is used to include an icon (font icon or sprite image) |
| `IconPosition` | `iconPosition` | `IconPosition` | `IconPosition.Left` | Positions the icon before/after the text content. Possible values: `Left`, `Right` |
| `IsPrimary` | `isPrimary` | `bool` | `true` | Defines whether to apply primary style for FAB |
| `IsToggle` | `isToggle` | `bool` | `false` | Makes the Button toggle; when clicked, the state changes from normal to active |
| `Position` | `position` | `FabPosition` | `FabPosition.BottomRight` | Defines the position of the FAB relative to target. Possible values: `TopLeft`, `TopCenter`, `TopRight`, `MiddleLeft`, `MiddleCenter`, `MiddleRight`, `BottomLeft`, `BottomCenter`, `BottomRight` |
| `RepeatDelay` | `repeatDelay` | `double` | `400` | Delay in milliseconds before repeat firing begins after the initial press (only when `enableRepeat` is `true`) |
| `RepeatInterval` | `repeatInterval` | `double` | `0` | Interval in milliseconds between repeated `clicked` fires during a hold. When set to `0`, pointer repeat uses 100ms; keyboard repeat defers to native OS rate |
| `Target` | `target` | `string` | `""` | Defines the selector that points to an element in which the FAB will be positioned. By default, FAB is positioned based on the viewport. The target element must have relative position, else FAB will be positioned based on the closest element which has relative position |
| `Visible` | `visible` | `bool` | `true` | Defines whether the FAB is visible or hidden |

---

## Events

> The official `Syncfusion.EJ2.Buttons.Fab` page documents events as tag-helper string properties. Use the property name as a tag helper attribute with a JavaScript function name as the value.

| Event | Tag Helper Attr | Description |
|-------|-----------------|-------------|
| `Clicked` | `clicked` | Triggers on every click fire — both the initial press and each repeat while the button is held. Only emitted when `enableRepeat` is `true` |
| `Created` | `created` | Triggers once the component rendering is completed |

### Event Usage Example

```cshtml
<ejs-fab id="fab" content="Add" iconCss="e-icons e-plus"
         created="onCreated" clicked="onClicked">
</ejs-fab>

<script>
    function onCreated() {
        console.log('FAB created');
    }
    function onClicked(args) {
        // args.originalEvent - the originating DOM event
        // args.isRepeat - false for first press, true for repeat fires
        console.log('FAB clicked');
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.Buttons.Fab` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

---

## FabPosition Values

| Value | Description |
|-------|-------------|
| `TopLeft` | Positions the FAB at the target's top-left corner |
| `TopCenter` | Positions the FAB at the target's top-center |
| `TopRight` | Positions the FAB at the target's top-right corner |
| `MiddleLeft` | Positions the FAB at the target's middle-left |
| `MiddleCenter` | Positions the FAB at the target's middle-center |
| `MiddleRight` | Positions the FAB at the target's middle-right |
| `BottomLeft` | Positions the FAB at the target's bottom-left corner |
| `BottomCenter` | Positions the FAB at the target's bottom-center |
| `BottomRight` | Positions the FAB at the target's bottom-right corner (default) |

---

## Example

```cshtml
<ejs-fab 
    id="fab" 
    content="Add"
    iconCss="e-icons e-plus"
    cssClass="e-primary"
    position="BottomRight">
</ejs-fab>
```

---

## See Also

- [FAB Getting Started](floating-action-button-getting-started.md)
- [FAB Positions](floating-action-button-positions.md)
- [FAB Icons](floating-action-button-icons.md)
- [FAB Styles](floating-action-button-styles.md)
