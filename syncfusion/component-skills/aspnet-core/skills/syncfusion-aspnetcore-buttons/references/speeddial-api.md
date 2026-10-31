# API Reference – ASP.NET Core Speed Dial

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.speeddial.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.speeddial.html#properties)  
> **Namespace:** `Syncfusion.EJ2.Buttons`  
> **Assembly:** `Syncfusion.AspNetCore.Buttons.dll`  
> **Tag Helper:** `<ejs-speeddial>`

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `Animation` | `animation` | `SpeedDialAnimationSettings` | `null` | Provides options to customize the animation applied while opening and closing the popup of speed dial |
| `BeforeClose` | `beforeClose` | `string` (JS function) | `null` | Event callback that is raised before the speed dial popup is closed |
| `BeforeItemRender` | `beforeItemRender` | `string` (JS function) | `null` | Event callback that is raised before rendering the speed dial item |
| `BeforeOpen` | `beforeOpen` | `string` (JS function) | `null` | Event callback that is raised before the speed dial popup is opened |
| `Clicked` | `clicked` | `string` (JS function) | `null` | Event callback that is raised when a speed dial action item is clicked |
| `CloseIconCss` | `closeIconCss` | `string` | `""` | Defines one or more CSS classes to include an icon or image to denote the speed dial is opened and displaying menu items |
| `Content` | `content` | `string` | `""` | Defines the content for the button of SpeedDial |
| `ContentTemplate` | `contentTemplate` | `MvcTemplate<object>` | — | Tag template for content |
| `Created` | `created` | `string` (JS function) | `null` | Event callback that is raised after rendering the speed dial |
| `CssClass` | `cssClass` | `string` | `""` | Defines one or more CSS classes to customize the appearance of SpeedDial |
| `Direction` | `direction` | `LinearDirection` | `LinearDirection.Auto` | Defines the speed dial item display direction when mode is linear. Possible values: `Up`, `Down`, `Left`, `Right`, `Auto` |
| `Disabled` | `disabled` | `bool` | `false` | Defines whether to enable or disable the SpeedDial |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Enable or disable persisting component's state between page reloads |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Allows additional HTML attributes such as title, name, etc. in key-value pair format |
| `IconPosition` | `iconPosition` | `IconPosition` | `IconPosition.Left` | Defines the position of icon in the button of speed dial. Possible values: `Left`, `Right` |
| `IsPrimary` | `isPrimary` | `bool` | `true` | Specifies whether the SpeedDial acts as the primary |
| `Items` | `items` | `List<SpeedDialItem>` | `null` | Defines the list of SpeedDial items |
| `ItemTemplate` | `itemTemplate` | `string` | `""` | Defines the template content for the speed dial item |
| `Locale` | `locale` | `string` | `""` | Overrides the global culture and localization value. Default global culture is `'en-US'` |
| `Modal` | `modal` | `bool` | `false` | Defines whether the speed dial popup can be displayed as modal or modal less. When enabled, the Speed dial creates an overlay that disables interaction with other elements other than speed dial items |
| `Mode` | `mode` | `SpeedDialMode` | `SpeedDialMode.Linear` | Defines the display mode of speed dial action items. Possible values: `Linear`, `Radial` |
| `OnClose` | `onClose` | `string` (JS function) | `null` | Event callback that is raised when the SpeedDial popup is closed |
| `OnOpen` | `onOpen` | `string` (JS function) | `null` | Event callback that is raised when the SpeedDial popup is opened |
| `OpenIconCss` | `openIconCss` | `string` | `""` | Defines one or more CSS classes to include an icon or image for the button of SpeedDial when it's closed |
| `OpensOnHover` | `opensOnHover` | `bool` | `false` | Defines whether to open the popup when the button of SpeedDial is hovered. By default, SpeedDial opens popup on click action |
| `PopupTemplate` | `popupTemplate` | `string` | `""` | Defines a template content for popup of SpeedDial |
| `Position` | `position` | `FabPosition` | `FabPosition.BottomRight` | Defines the position of the button of Speed Dial relative to target. Possible values: `TopLeft`, `TopCenter`, `TopRight`, `MiddleLeft`, `MiddleCenter`, `MiddleRight`, `BottomLeft`, `BottomCenter`, `BottomRight` |
| `RadialSettings` | `radialSettings` | `SpeedDialRadialSettings` | `null` | Provides the options to customize the speed dial action buttons when mode of speed dial is radial |
| `Target` | `target` | `string` | `""` | Defines the selector that points to the element in which the button of SpeedDial will be positioned. By default button is positioned based on the viewport. The target element must have relative position |
| `Visible` | `visible` | `bool` | `true` | Defines whether the SpeedDial is visible or hidden |

---

## Events

> The official `Syncfusion.EJ2.Buttons.SpeedDial` page documents events as tag-helper string properties. Use the property name as a tag helper attribute with a JavaScript function name as the value.

| Event | Tag Helper Attr | Description |
|-------|-----------------|-------------|
| `BeforeClose` | `beforeClose` | Raised before the speed dial popup is closed |
| `BeforeItemRender` | `beforeItemRender` | Raised before rendering the speed dial item |
| `BeforeOpen` | `beforeOpen` | Raised before the speed dial popup is opened |
| `Clicked` | `clicked` | Raised when a speed dial action item is clicked |
| `Created` | `created` | Raised after rendering the speed dial |
| `OnClose` | `onClose` | Raised when the SpeedDial popup is closed |
| `OnOpen` | `onOpen` | Raised when the SpeedDial popup is opened |

### Event Usage Example

```cshtml
<ejs-speeddial id="speeddial" content="Action" mode="Linear" position="BottomRight"
               created="onCreated" onOpen="onOpen" onClose="onClose" clicked="onItemClicked">
</ejs-speeddial>

<script>
    function onCreated() {
        console.log('SpeedDial created');
    }
    function onOpen(args) {
        console.log('SpeedDial opened');
    }
    function onClose(args) {
        console.log('SpeedDial closed');
    }
    function onItemClicked(args) {
        // args.item - the clicked SpeedDialItem
        console.log('Clicked item: ' + args.item.text);
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.Buttons.SpeedDial` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

---

## Example

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
    direction="Auto"
    position="BottomRight"
    target="#container"
    mode="Linear">
</ejs-speeddial>
```

---

## See Also

- [Speed Dial Getting Started](speeddial-getting-started.md)
- [Speed Dial Items](speeddial-items.md)
- [Speed Dial Display Modes](speeddial-display-modes.md)
- [Speed Dial Positions](speeddial-positions.md)
