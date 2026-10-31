# API Reference – ASP.NET Core DropDownButton

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.splitbuttons.dropdownbutton.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.splitbuttons.dropdownbutton.html#properties)  
> **Namespace:** `Syncfusion.EJ2.SplitButtons`  
> **Assembly:** `Syncfusion.AspNetCore.SplitButtons.dll`  
> **Tag Helper:** `<ejs-dropdownbutton>`

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `AnimationSettings` | `animationSettings` | `object` | `null` | Specifies the animation settings for opening the sub menu. Controls duration, easing, and effect |
| `BeforeClose` | `beforeClose` | `string` (JS function) | `null` | Triggers before closing the DropDownButton popup |
| `BeforeItemRender` | `beforeItemRender` | `string` (JS function) | `null` | Triggers while rendering each Popup item of DropDownButton |
| `BeforeOpen` | `beforeOpen` | `string` (JS function) | `null` | Triggers before opening the DropDownButton popup |
| `Close` | `close` | `string` (JS function) | `null` | Triggers while closing the DropDownButton popup |
| `CloseActionEvents` | `closeActionEvents` | `string` | `""` | Specifies the event to close the DropDownButton popup |
| `Content` | `content` | `string` | `""` | Defines the content of the DropDownButton element (text or HTML elements) |
| `ContentTemplate` | `contentTemplate` | `MvcTemplate<object>` | — | Tag template for content |
| `Created` | `created` | `string` (JS function) | `null` | Triggers once the component rendering is completed |
| `CreatePopupOnClick` | `createPopupOnClick` | `bool` | `false` | Specifies the popup element creation on open |
| `CssClass` | `cssClass` | `string` | `""` | Defines class/multiple classes separated by a space in the DropDownButton element (size, styles) |
| `Disabled` | `disabled` | `bool` | `false` | Specifies a value that indicates whether the DropDownButton is disabled or not |
| `EnableHtmlSanitizer` | `enableHtmlSanitizer` | `bool` | `true` | Specifies whether to enable rendering of untrusted HTML values; sanitizes suspected untrusted strings and scripts |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Enable or disable persisting component's state between page reloads |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Allows additional HTML attributes such as title, name, etc. in key-value pair format |
| `IconCss` | `iconCss` | `string` | `""` | Defines class/multiple classes separated by a space for the DropDownButton to include an icon (font icon or sprite image) |
| `IconPosition` | `iconPosition` | `SplitButtonIconPosition` | `SplitButtonIconPosition.Left` | Positions the icon before/top of the text content. Possible values: `Left`, `Top` |
| `Items` | `items` | `object` | `null` | Specifies action items with its properties which will be rendered as DropDownButton popup |
| `ItemTemplate` | `itemTemplate` | `string` | `null` | Specifies the template content to be displayed |
| `Locale` | `locale` | `string` | `""` | Overrides the global culture and localization value. Default global culture is `'en-US'` |
| `Open` | `open` | `string` (JS function) | `null` | Triggers while opening the DropDownButton popup |
| `PopupWidth` | `popupWidth` | `string` | `"auto"` | Defines the width of the dropdown popup for the DropDownButton component |
| `Select` | `select` | `string` (JS function) | `null` | Triggers while selecting action item in DropDownButton popup |
| `Target` | `target` | `string` | `""` | Allows to specify the DropDownButton popup item element |

---

## Events

> The official `Syncfusion.EJ2.SplitButtons.DropDownButton` page documents events as tag-helper string properties. Use the property name as a tag helper attribute with a JavaScript function name as the value.

| Event | Tag Helper Attr | Description |
|-------|-----------------|-------------|
| `BeforeClose` | `beforeClose` | Triggers before closing the DropDownButton popup |
| `BeforeItemRender` | `beforeItemRender` | Triggers while rendering each Popup item of DropDownButton |
| `BeforeOpen` | `beforeOpen` | Triggers before opening the DropDownButton popup |
| `Close` | `close` | Triggers while closing the DropDownButton popup |
| `Created` | `created` | Triggers once the component rendering is completed |
| `Open` | `open` | Triggers while opening the DropDownButton popup |
| `Select` | `select` | Triggers while selecting action item in DropDownButton popup |

### Event Usage Example

```cshtml
<ejs-dropdownbutton id="ddb1" content="File"
                   items="@(new List<object> { new { text = "Open" }, new { text = "Save" } })"
                   created="onCreated" open="onOpen" select="onSelect">
</ejs-dropdownbutton>

<script>
    function onCreated() {
        console.log('DropDownButton created');
    }
    function onOpen(args) {
        console.log('Popup opened');
    }
    function onSelect(args) {
        console.log('Selected: ' + args.item.text);
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.SplitButtons.DropDownButton` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

---

## Example

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Open", iconCss = "e-icons e-open-icon" });
    items.Add(new { text = "Save", iconCss = "e-icons e-save-icon" });
}

<ejs-dropdownbutton 
    id="ddb1" 
    content="File" 
    items="items"
    cssClass="e-primary"
    iconPosition="Left">
</ejs-dropdownbutton>
```

---

## See Also

- [DropDownButton Getting Started](dropdownbutton-getting-started.md)
- [DropDownButton Popup Items](dropdownbutton-popup-items.md)
- [DropDownButton Events](dropdownbutton-events-and-interactivity.md)
