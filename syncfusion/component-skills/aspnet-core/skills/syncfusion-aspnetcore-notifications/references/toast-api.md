# API Reference — Syncfusion ASP.NET Core Toast

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Notifications.Toast.html](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Notifications.Toast.html)  
> **Namespace:** `Syncfusion.EJ2.Notifications`  
> **Assembly:** `Syncfusion.EJ2.dll`

## Table of Contents
- [Class Toast — Properties](#class-toast--properties)
- [Class ToastToastPosition — Properties](#class-toasttoastposition--properties)
- [Class ToastToastAnimationSettings — Properties](#class-toasttoastanimationsettings--properties)
- [Class ToastToastAnimations — Properties](#class-toasttoastanimations--properties)
- [Class ToastButtonModelProp — Properties](#class-toastbuttonmodelprop--properties)
- [Tag Helper Syntax Reference](#tag-helper-syntax-reference)

---

## Class Toast — Properties

### Animation
Specifies the animation configuration settings for showing and hiding the Toast.

- **Type:** `ToastToastAnimationSettings`
- **Default:** `null`
- **Tag:** `<e-toast-animationsettings>`

### BeforeClose
Triggers the event before the toast close.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `before-close`

### BeforeOpen
Triggers the event before the toast shown.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `before-open`

### BeforeSanitizeHtml
Event triggers before sanitize the value.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `before-sanitize-html`

### Buttons
Specifies the collection of Toast action buttons to be rendered with the given Button model properties and its click action handler.

- **Type:** `List<ToastButtonModelProp>`
- **Default:** `null`
- **Tag:** `<e-toast-buttonmodelprops>` containing `<e-toast-buttonmodelprop>` entries

### Click
The event will be fired while clicking on the Toast.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `click`

### Close
Trigger the event after the Toast hides.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `close`

### Content
Specifies the content to be displayed on the Toast. Accepts selectors, string values and HTML elements.

- **Type:** `string`
- **Default:** `null`
- **Tag attribute:** `content`

### ContentTemplate
To get or set value for ContentTemplate.

- **Type:** `MvcTemplate<object>`
- **Tag:** `<e-content-template>`

### Created
Triggers the event after the Toast gets created.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `created`

### CssClass
Defines single/multiple classes (separated by space) to be used for customization of Toast.

- **Type:** `string`
- **Default:** `null`
- **Tag attribute:** `css-class`

### Destroyed
Triggers the event after the Toast gets destroyed.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `destroyed`

### EnableHtmlSanitizer
Defines whether to allow the cross-scripting site or not.

- **Type:** `bool`
- **Default:** `true`
- **Tag attribute:** `enable-html-sanitizer`

### EnablePersistence
Enable or disable persisting component's state between page reloads.

- **Type:** `bool`
- **Default:** `false`
- **Tag attribute:** `enable-persistence`

### EnableRtl
Enable or disable rendering component in right to left direction.

- **Type:** `bool`
- **Default:** `false`
- **Tag attribute:** `enable-rtl`

### ExtendedTimeout
Specifies the Toast display time duration after interacting with the Toast.

- **Type:** `double`
- **Default:** `1000`
- **Tag attribute:** `extended-timeout`

### Height
Specifies the height of the Toast in pixels/number/percentage. Number value is considered as pixels.

- **Type:** `string`
- **Default:** `"auto"`
- **Tag attribute:** `height`

### HtmlAttributes
Allows additional HTML attributes such as title, name, etc., and accepts n number of attributes in a key-value pair format.

- **Type:** `object`
- **Tag attribute:** `html-attributes`

### Icon
Defines CSS classes to specify an icon for the Toast which is to be displayed at top left corner of the Toast.

- **Type:** `string`
- **Default:** `null`
- **Tag attribute:** `icon`

### Locale
Overrides the global culture and localization value for this component. Default global culture is `'en-US'`.

- **Type:** `string`
- **Default:** `""`
- **Tag attribute:** `locale`

### NewestOnTop
Specifies the newly created Toast message display order while multiple toasts are added to page one after another. By default, newly added Toast will be added after old Toasts.

- **Type:** `bool`
- **Default:** `true`
- **Tag attribute:** `newest-on-top`

### Open
Triggers the event after the Toast shown on the target container.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `open`

### Position
Specifies the position of the Toast message to be displayed within target container. In the case of multiple Toast display, new Toast position will not update on dynamic change of property values until the old Toast messages removed.  
X values: `Left`, `Right`, `Center`  
Y values: `Top`, `Bottom`

- **Type:** `ToastToastPosition`
- **Default:** `null`
- **Tag:** `<e-toast-position>`

### ProgressDirection
Specifies whether to show the progress bar with left to right direction to denote the Toast message display timeout.

- **Type:** `ProgressDirectionType`
- **Default:** `null`
- **Tag attribute:** `progress-direction`
- **Values:** `"Ltr"` | `"Rtl"`

### ShowCloseButton
Specifies whether to show the close button in Toast message to close the Toast.

- **Type:** `bool`
- **Default:** `false`
- **Tag attribute:** `show-close-button`

### ShowProgressBar
Specifies whether to show the progress bar to denote the Toast message display timeout.

- **Type:** `bool`
- **Default:** `false`
- **Tag attribute:** `show-progress-bar`

### Target
Specifies the target container where the Toast to be displayed. Based on the target, the `position` will be updated.

- **Type:** `string`
- **Tag attribute:** `target`

### Template
Specifies the HTML element/element ID as a string that can be displayed as a Toast. The given template is taken as preference to render the Toast, even if the built-in properties such as title and content are defined.

- **Type:** `string`
- **Default:** `null`
- **Tag attribute:** `template`

### TimeOut
Specifies the Toast display time duration on the page in milliseconds.  
- Once the time expires, Toast message will be removed.  
- Setting `0` as a time out value displays the Toast on the page until the user closes it manually.

- **Type:** `double`
- **Default:** `5000`
- **Tag attribute:** `time-out`

### Title
Specifies the title to be displayed on the Toast. Accepts selectors, string values and HTML elements.

- **Type:** `string`
- **Default:** `null`
- **Tag attribute:** `title`

### Width
Specifies the width of the Toast in pixels/numbers/percentage. Number value is considered as pixels. In mobile devices, default width is considered as `100%`.

- **Type:** `string`
- **Default:** `"300"`
- **Tag attribute:** `width`

---

## Class ToastToastPosition — Properties

Namespace: `Syncfusion.EJ2.Notifications`  
Tag: `<e-toast-position>`

### X
Specifies the position of the Toast notification with respect to the target container's left edge.

- **Type:** `string`
- **Default:** `"Left"`
- **Tag attribute:** `X`
- **Values:** `"Left"` | `"Center"` | `"Right"` | custom pixel/percentage string

### Y
Specifies the position of the Toast notification with respect to the target container's top edge.

- **Type:** `string`
- **Default:** `"Top"`
- **Tag attribute:** `Y`
- **Values:** `"Top"` | `"Bottom"` | custom pixel/percentage string

---

## Class ToastToastAnimationSettings — Properties

Namespace: `Syncfusion.EJ2.Notifications`  
Tag: `<e-toast-animationsettings>`

### Hide
Specifies the animation to appear while hiding the Toast.

- **Type:** `ToastToastAnimations`
- **Default:** `null`
- **Tag:** `<e-toast-animationsettingshide>`

### Show
Specifies the animation to appear while showing the Toast.

- **Type:** `ToastToastAnimations`
- **Default:** `null`
- **Tag:** `<e-toast-animationsettingsshow>`

---

## Class ToastToastAnimations — Properties

Namespace: `Syncfusion.EJ2.Notifications`  
Base class for both `Show` and `Hide` animation settings. Inherits to `ToastAnimationSettingsHideAnimation`.

### Duration
Specifies the duration to animate.

- **Type:** `double`
- **Default:** `600`
- **Tag attribute:** `duration`

### Easing
Specifies the animation timing function.

- **Type:** `string`
- **Default:** `"ease"`
- **Tag attribute:** `easing`

### Effect
Specifies the type of animation.

- **Type:** `string`
- **Default:** `"FadeIn"`
- **Tag attribute:** `effect`

---

## Class ToastButtonModelProp — Properties

Namespace: `Syncfusion.EJ2.Notifications`  
Tag: `<e-toast-buttonmodelprop>`

### Click
Specifies the click event handler name for the button.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `click`

### Model
Specifies the Button component model properties to render the Toast action buttons.

- **Type:** `object`
- **Default:** `null`
- **Tag attribute:** `model`

---

## Tag Helper Syntax Reference

### Complete Tag Helper Skeleton

```cshtml
<ejs-toast id="element"
           title="string"
           content="string"
           css-class="string"
           icon="string"
           template="string"
           width="string"
           height="string"
           time-out="double"
           extended-timeout="double"
           show-close-button="bool"
           show-progress-bar="bool"
           progress-direction="Ltr|Rtl"
           newest-on-top="bool"
           target="string"
           enable-html-sanitizer="bool"
           enable-persistence="bool"
           enable-rtl="bool"
           locale="string"
           before-open="functionName"
           open="functionName"
           before-close="functionName"
           close="functionName"
           click="functionName"
           created="functionName"
           destroyed="functionName"
           before-sanitize-html="functionName">

    <e-toast-position X="Left|Center|Right" Y="Top|Bottom"></e-toast-position>

    <e-toast-animationsettings>
        <e-toast-animationsettingsshow effect="FadeIn" duration="600" easing="ease">
        </e-toast-animationsettingsshow>
        <e-toast-animationsettingshide effect="FadeOut" duration="600" easing="ease">
        </e-toast-animationsettingshide>
    </e-toast-animationsettings>

    <e-toast-buttonmodelprops>
        <e-toast-buttonmodelprop model="ViewBag.ButtonModel1" click="onButton1Click">
        </e-toast-buttonmodelprop>
        <e-toast-buttonmodelprop model="ViewBag.ButtonModel2">
        </e-toast-buttonmodelprop>
    </e-toast-buttonmodelprops>

    <e-content-template>
        <!-- Custom HTML content -->
    </e-content-template>

</ejs-toast>
```

### JavaScript show() Method

The `show()` method optionally accepts a model object that overrides component properties for that specific toast:

```javascript
var toast = document.getElementById('element').ej2_instances[0];

// Show with default settings
toast.show();

// Show with per-call overrides
toast.show({
    title: 'Custom Title',
    content: 'Custom content for this call.',
    cssClass: 'e-toast-success',
    timeOut: 3000,
    template: '<div>Custom HTML</div>'
});
```

### JavaScript hide() Method

```javascript
var toast = document.getElementById('element').ej2_instances[0];

// Hide a specific toast element
var toastEle = ej.base.closest(e.target, '.e-toast');
toast.hide(toastEle);

// Hide all toasts
toast.hide('All');
```

### ToastUtility

`ToastUtility` renders toasts without a container element in the DOM.

```javascript
// Predefined type
var toastObj = ejs.notifications.ToastUtility.show(content, type, timeOut);
// type: 'Information' | 'Success' | 'Warning' | 'Error'

// Full model
var toastObj = ej.notifications.ToastUtility.show({
    title: 'string',
    content: 'string',
    timeOut: 5000,
    position: { X: 'Right', Y: 'Bottom' },
    showCloseButton: true,
    click: function () { },
    buttons: [{ model: { content: 'Close' }, click: function () { toastObj.hide(); } }]
});
```
