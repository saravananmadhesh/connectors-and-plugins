# API Reference – ASP.NET Core SplitButton

Source: [Syncfusion.EJ2.SplitButtons.SplitButton](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.SplitButtons.SplitButton.html)

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Methods](#methods)
- [EJ1 to EJ2 Migration](#ej1-to-ej2-migration)

---

## Properties

### AnimationSettings
**Type:** `object` | **Default:** `null`

Specifies the animation settings for opening the sub menu in the DropDownMenu. Controls the duration, easing, and effect of the animation applied when the sub menu opens.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    animationSettings="@(new { effect = "SlideDown", duration = 800, easing = "ease" })">
</ejs-splitbutton>
```

---

### CloseActionEvents
**Type:** `string` | **Default:** `""`

Specifies the event to close the DropDownButton popup.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    closeActionEvents="mouseleave"></ejs-splitbutton>
```

---

### Content
**Type:** `string` | **Default:** `""`

Defines the content of the SplitButton primary action button. Can be plain text or HTML elements.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"></ejs-splitbutton>
```

---

### ContentTemplate
**Type:** `MvcTemplate<object>`

To get or set value for ContentTemplate.

---

### CreatePopupOnClick
**Type:** `bool` | **Default:** `false`

Specifies whether the popup element is created on open (lazy creation) rather than on component initialization.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    createPopupOnClick="true"></ejs-splitbutton>
```

---

### CssClass
**Type:** `string` | **Default:** `""`

Defines one or more CSS classes (space-separated) on the SplitButton element. Use this to apply size variants, custom styles, or vertical layout.

```cshtml
<!-- Vertical layout -->
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    cssClass="e-vertical"></ejs-splitbutton>

<!-- Small size -->
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    cssClass="e-small"></ejs-splitbutton>
```

---

### Disabled
**Type:** `bool` | **Default:** `false`

Specifies whether the SplitButton is disabled. When `true`, both the primary button and the dropdown arrow are non-interactive.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    disabled="true"></ejs-splitbutton>
```

---

### EnableHtmlSanitizer
**Type:** `bool` | **Default:** `true`

Specifies whether to sanitize untrusted HTML values in the SplitButton component before rendering. When `true`, suspected untrusted strings and scripts are sanitized.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    enableHtmlSanitizer="false"></ejs-splitbutton>
```

---

### EnablePersistence
**Type:** `bool` | **Default:** `false`

Enable or disable persisting component's state between page reloads.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    enablePersistence="true"></ejs-splitbutton>
```

---

### EnableRtl
**Type:** `bool` | **Default:** `false`

Enable or disable rendering the component in right-to-left direction.

```cshtml
<ejs-splitbutton id="rtl" content="Message" items="ViewBag.items"
    enableRtl="true"></ejs-splitbutton>
```

---

### HtmlAttributes
**Type:** `object`

Allows additional HTML attributes (such as `title`, `name`, etc.) to be applied to the SplitButton element, in a key-value pair format.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    htmlAttributes="@(new { title = "Click to paste", name = "paste-btn" })">
</ejs-splitbutton>
```

---

### IconCss
**Type:** `string` | **Default:** `""`

Defines CSS class(es) for the SplitButton icon. Supports EJ2 built-in icons (`e-icons`), font icons, and sprite images.

```cshtml
<!-- Built-in EJ2 icon -->
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    iconCss="e-icons e-paste"></ejs-splitbutton>
```

---

### IconPosition
**Type:** `SplitButtonIconPosition` | **Default:** `SplitButtonIconPosition.Left`

Positions the icon before (Left) or above (Top) the text content in the SplitButton.

| Value | Description |
|-------|-------------|
| `Left` | Icon to the left of the text (default) |
| `Top` | Icon above the text |

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    iconCss="e-icons e-paste" iconPosition="Top"></ejs-splitbutton>
```

---

### Items
**Type:** `object` | **Default:** `null`

Specifies action items with their properties. These are rendered as the SplitButton secondary button popup.

Each item can include: `text`, `iconCss`, `id`, `url`, `disabled`, `separator`.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"></ejs-splitbutton>
```

```csharp
// Controller
List<object> items = new List<object>();
items.Add(new { text = "Cut",   iconCss = "e-icons e-cut" });
items.Add(new { text = "Copy",  iconCss = "e-icons e-copy" });
items.Add(new { separator = true });
items.Add(new { text = "Paste", iconCss = "e-icons e-paste" });
ViewBag.items = items;
```

---

### ItemTemplate
**Type:** `string` | **Default:** `null`

Specifies a template string to customize the rendering of popup items.

---

### Locale
**Type:** `string` | **Default:** `""`

Overrides the global culture and localization value for this component. Default global culture is `en-US`.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    locale="fr-FR"></ejs-splitbutton>
```

---

### PopupWidth
**Type:** `string` | **Default:** `"auto"`

Defines the width of the dropdown popup for the SplitButton component.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    popupWidth="200px"></ejs-splitbutton>
```

---

### Target
**Type:** `string` | **Default:** `""`

Allows specifying a custom SplitButton popup item element by CSS selector. When set, the referenced element is used as the popup content instead of the `items` array.

```cshtml
<ul id="customPopup">
    <li class="e-item">Option A</li>
</ul>

<ejs-splitbutton id="element" content="SplitButton"
    target="#customPopup"></ejs-splitbutton>
```

---

## Events

### BeforeClose
**Type:** `string` | **Default:** `null`

Triggers before closing the SplitButton popup.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    beforeClose="onBeforeClose"></ejs-splitbutton>
<script>
    function onBeforeClose(args) { /* args.cancel = true to prevent close */ }
</script>
```

---

### BeforeItemRender
**Type:** `string` | **Default:** `null`

Triggers while rendering each popup item of the SplitButton.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    beforeItemRender="onBeforeItemRender"></ejs-splitbutton>
<script>
    function onBeforeItemRender(args) {
        // args.item, args.element
    }
</script>
```

---

### BeforeOpen
**Type:** `string` | **Default:** `null`

Triggers before opening the SplitButton popup.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    beforeOpen="onBeforeOpen"></ejs-splitbutton>
<script>
    function onBeforeOpen(args) { /* args.cancel = true to prevent open */ }
</script>
```

---

### Click
**Type:** `string` | **Default:** `null`

Triggers when the primary button of SplitButton has been clicked.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    click="onClick"></ejs-splitbutton>
<script>
    function onClick(args) { /* primary button clicked */ }
</script>
```

---

### Close
**Type:** `string` | **Default:** `null`

Triggers while closing the SplitButton popup.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    close="onClose"></ejs-splitbutton>
<script>
    function onClose(args) { /* popup closed */ }
</script>
```

---

### Created
**Type:** `string` | **Default:** `null`

Triggers once the component rendering is completed.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    created="onCreated"></ejs-splitbutton>
<script>
    function onCreated() { /* component ready */ }
</script>
```

---

### Open
**Type:** `string` | **Default:** `null`

Triggers while opening the SplitButton popup.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    open="onOpen"></ejs-splitbutton>
<script>
    function onOpen(args) { /* popup opened */ }
</script>
```

---

### Select
**Type:** `string` | **Default:** `null`

Triggers while selecting an action item of the SplitButton popup.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    select="onSelect"></ejs-splitbutton>
<script>
    function onSelect(args) {
        console.log(args.item.text); // selected item text
    }
</script>
```

---

## Methods

### toggle()

Toggles the SplitButton popup open/closed state programmatically.

```javascript
var splitBtn = document.getElementById('element').ej2_instances[0];
splitBtn.toggle(); // opens if closed, closes if open
```

### destroy()

Removes the SplitButton component from the DOM and cleans up all associated resources.

```javascript
var splitBtn = document.getElementById('element').ej2_instances[0];
splitBtn.destroy();
```

---

## EJ1 to EJ2 Migration

| Behavior | EJ1 API | EJ2 API |
|----------|---------|---------|
| Button text | `text` | `content` |
| Popup content (custom) | `target` | `target` |
| Popup items | _(not available)_ | `items` |
| Icons | `prefixIcon` | `iconCss` |
| Icon position | `imagePosition` | `iconPosition` |
| Custom CSS class | `cssClass` | `cssClass` |
| Disabled state | `enabled="false"` | `disabled="true"` |
| RTL | `enableRTL` | `enableRtl` |
| Size | `size` property | `cssClass="e-small"` |
| Show popup | `show()` method | `toggle()` method |
| Hide popup | `hide()` method | `toggle()` method |
| Destroy | `destroy()` | `destroy()` |
| BeforeOpen event | `beforeOpen` | `beforeOpen` |
| Click event | `click` | `click` |
| Close event | `close` | `close` |
| Create event | `create` | `created` |
| Item select event | `itemSelected` | `select` |
| Open event | `open` | `open` |
| BeforeClose event | _(not available)_ | `beforeClose` |
| BeforeItemRender event | _(not available)_ | `beforeItemRender` |
