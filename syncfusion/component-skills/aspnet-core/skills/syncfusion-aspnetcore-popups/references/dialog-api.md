# API Reference — Dialog (ASP.NET Core)

> **Source:** [Syncfusion.EJ2.Popups.Dialog — Official API Docs](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.popups.dialog.html)
> **Namespace:** `Syncfusion.EJ2.Popups`
> **Assembly:** `Syncfusion.EJ2.dll`
> **Tag Helper:** `<ejs-dialog>`

---

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Methods](#methods)
- [Sub-Types](#sub-types)

---

## Properties

### `AllowDragging`
**Tag Helper Attr:** `allowDragging`  
**Type:** `bool`  
**Default:** `false`

Specifies whether the dialog component can be dragged by the end-user. The dialog allows dragging by selecting the header and dragging it to reposition the dialog.

```csharp
<ejs-dialog id="dialog" allowDragging="true" header="Drag Me" width="500px">
    <e-content-template>
        <p>Grab the header to drag this dialog.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `AnimationSettings`
**Tag Helper Attr:** `<e-dialog-animationsettings>`  
**Type:** `DialogAnimationSettings`  
**Default:** `null`

Specifies the animation settings of the dialog component. The animation effect can be applied on open and close the dialog with duration and delay.

```csharp
<ejs-dialog id="dialog" header="Animated Dialog" width="500px">
    <e-dialog-animationsettings effect="Zoom" duration="400" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>This dialog uses Zoom animation.</p>
    </e-content-template>
</ejs-dialog>
```

> See [DialogAnimationSettings](#dialoganimationsettings) sub-type for full property details.

---

### `Buttons`
**Tag Helper Attr:** `<e-dialog-buttons>` / `<e-dialog-dialogbutton>`  
**Type:** `List<DialogDialogButton>`  
**Default:** `null`

Configures the action buttons that contain button properties with primary attributes and click events. One or more action buttons can be configured to the dialog.

```csharp
<ejs-dialog id="dialog" header="Confirm" isModal="true" width="400px">
    <e-dialog-buttons>
        <e-dialog-dialogbutton buttonModel="@(new ButtonModel { content = "OK", isPrimary = true })" click="onOK"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton buttonModel="@(new ButtonModel { content = "Cancel" })" click="onCancel"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>Are you sure?</p>
    </e-content-template>
</ejs-dialog>
```

> See [DialogDialogButton](#dialogdialogbutton) sub-type for full property details.

---

### `CloseOnEscape`
**Tag Helper Attr:** `closeOnEscape`  
**Type:** `bool`  
**Default:** `true`

Specifies the boolean value whether the dialog can be closed with the escape key that is used to control the dialog's closing behavior.

```csharp
<ejs-dialog id="dialog" header="ESC Disabled" closeOnEscape="false" width="400px">
    <e-content-template>
        <p>Pressing Escape will not close this dialog.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `Content`
**Tag Helper Attr:** `content`  
**Type:** `string`  
**Default:** `""`

Specifies the value that can be displayed in the dialog's content area. It can be information, list, or other HTML elements. The content of dialog can be loaded with dynamic data such as database, AJAX content, and more.

```csharp
<ejs-dialog id="dialog" header="Hello" content="This is dialog content." width="400px">
</ejs-dialog>
```

---

### `ContentTemplate`
**Tag Helper Attr:** `<e-content-template>`  
**Type:** `MvcTemplate<object>`

To get or set value for ContentTemplate. Use this tag helper child element to define rich HTML content for the dialog body.

```csharp
<ejs-dialog id="dialog" header="Content Template" width="500px">
    <e-content-template>
        <div>
            <p>Rich HTML content rendered via ContentTemplate.</p>
        </div>
    </e-content-template>
</ejs-dialog>
```

---

### `CssClass`
**Tag Helper Attr:** `cssClass`  
**Type:** `string`  
**Default:** `""`

Specifies the CSS class name that can be appended with the root element of the dialog. One or more custom CSS classes can be added to a dialog.

```csharp
<ejs-dialog id="dialog" header="Styled Dialog" cssClass="my-custom-dialog" width="500px">
    <e-content-template>
        <p>Dialog with a custom CSS class applied.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `EnableHtmlSanitizer`
**Tag Helper Attr:** `enableHtmlSanitizer`  
**Type:** `bool`  
**Default:** `true`

Defines whether to allow cross-site scripting or not. When enabled, the dialog sanitizes HTML content to prevent XSS attacks.

```csharp
<ejs-dialog id="dialog" header="Safe Dialog" enable-html-sanitizer="true" width="500px">
    <e-content-template>
        <p>HTML content will be sanitized.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `EnablePersistence`
**Tag Helper Attr:** `enablePersistence`  
**Type:** `bool`  
**Default:** `false`

Enables or disables the persistence of the dialog's dimensions and position state between page reloads.

```csharp
<ejs-dialog id="dialog" header="Persistent Dialog" enablePersistence="true" width="500px">
    <e-content-template>
        <p>Position and size are saved across page reloads.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `EnableResize`
**Tag Helper Attr:** `enableResize`  
**Type:** `bool`  
**Default:** `false`

Specifies the value whether the dialog component can be resized by the end-user. If `enableResize` is true, the dialog component creates a grip to resize it in a diagonal direction.

```csharp
<ejs-dialog id="dialog" header="Resizable Dialog" enableResize="true" width="500px" height="300px">
    <e-content-template>
        <p>Drag the corner to resize this dialog.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `EnableRtl`
**Tag Helper Attr:** `enableRtl`  
**Type:** `bool`  
**Default:** `false`

Enable or disable rendering component in right to left direction.

```csharp
<ejs-dialog id="dialog" header="مرحبا" enableRtl="true" width="500px">
    <e-content-template>
        <p dir="rtl">هذا محتوى باللغة العربية.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `FooterTemplate`
**Tag Helper Attr:** `footerTemplate`  
**Type:** `string`  
**Default:** `""`

Specifies the template value that can be displayed in the dialog's footer area. This is an optional property and can be used only when the footer is occupied with information or custom components. By default, the footer is configured with action buttons. If a footer template is configured, the action buttons property will be disabled.

```csharp
<ejs-dialog id="dialog" header="Custom Footer" width="500px"
    footerTemplate="<button class='e-btn e-primary' onclick='onSave()'>Save</button>">
    <e-content-template>
        <p>Dialog with a footer template.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `Header`
**Tag Helper Attr:** `header`  
**Type:** `string`

Specifies the value to be displayed in the dialog's header area. Supports plain text or HTML string.

```csharp
<ejs-dialog id="dialog" header="Dialog Title" width="500px">
    <e-content-template>
        <p>Dialog with a header title.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `Height`
**Tag Helper Attr:** `height`  
**Type:** `string`  
**Default:** `"auto"`

Specifies the height of the dialog component. Accepts pixel values (e.g., `"300px"`) or percentage values (e.g., `"50%"`).

```csharp
<ejs-dialog id="dialog" header="Fixed Height" height="400px" width="500px">
    <e-content-template>
        <p>This dialog has a fixed height of 400px.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `HtmlAttributes`
**Tag Helper Attr:** `html-attributes`  
**Type:** `object`

Allows additional HTML attributes such as `title`, `name`, etc. Accepts n number of attributes in a key-value pair format.

```csharp
@{
    var htmlAttr = new Dictionary<string, object>() { { "title", "My Dialog" } };
}
<ejs-dialog id="dialog" header="Dialog" html-attributes="htmlAttr" width="500px">
    <e-content-template>
        <p>Dialog with extra HTML attributes.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `IsModal`
**Tag Helper Attr:** `isModal`  
**Type:** `bool`  
**Default:** `false`

Specifies the boolean value whether the dialog can be displayed as modal or non-modal.

- **Modal:** Creates an overlay that disables interaction with the parent application. The user must respond to the modal before continuing.
- **Modeless:** Does not prevent user interaction with the parent application.

```csharp
<ejs-dialog id="dialog" header="Modal Dialog" isModal="true" width="500px">
    <e-content-template>
        <p>You must interact with this dialog before accessing the rest of the page.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `Locale`
**Tag Helper Attr:** `locale`  
**Type:** `string`  
**Default:** `""`

Overrides the global culture and localization value for this component. Default global culture is `en-US`.

```csharp
<ejs-dialog id="dialog" header="Localized Dialog" locale="fr" width="500px">
    <e-content-template>
        <p>This dialog uses French locale settings.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `MinHeight`
**Tag Helper Attr:** `minHeight`  
**Type:** `string`  
**Default:** `""`

Specifies the min-height of the dialog component.

```csharp
<ejs-dialog id="dialog" header="Min Height Dialog" minHeight="150px" width="500px">
    <e-content-template>
        <p>This dialog has a minimum height of 150px.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `Position`
**Tag Helper Attr:** `<e-dialog-position>` (via `DialogPositionData`)  
**Type:** `DialogPositionData`  
**Default:** `null`

Specifies the value where the dialog can be positioned within the document or target. The position can be represented with pre-configured positions or specific X and Y values.

- **X value:** `left`, `center`, `right`, or an offset value
- **Y value:** `top`, `center`, `bottom`, or an offset value

```csharp
<ejs-dialog id="dialog" header="Centered" width="500px">
    <e-dialog-position x="center" y="center"></e-dialog-position>
    <e-content-template>
        <p>This dialog is centered on the page.</p>
    </e-content-template>
</ejs-dialog>
```

> See [DialogPositionData](#dialogpositiondata) sub-type for full property details.

---

### `ResizeHandles`
**Tag Helper Attr:** `resize-handles`  
**Type:** `object`  
**Default:** `null`

Specifies the resize handles direction in the dialog component that can be resized by the end-user.

```csharp
<ejs-dialog id="dialog" header="Resize Handles" enableResize="true"
    resizeHandles="@(new string[]{"South", "East", "SouthEast"})" width="500px">
    <e-content-template>
        <p>Resizable from South, East, and SouthEast handles.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `ShowCloseIcon`
**Tag Helper Attr:** `showCloseIcon`  
**Type:** `bool`  
**Default:** `false`

Specifies the value that represents whether the close icon is shown in the dialog component.

```csharp
<ejs-dialog id="dialog" header="Closeable Dialog" showCloseIcon="true" width="500px">
    <e-content-template>
        <p>Click the X icon to close this dialog.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `Target`
**Tag Helper Attr:** `target`  
**Type:** `string`

Specifies the target element in which to display the dialog. The dialog is positioned based on the target element. If the target is not set, the document body is used.

```csharp
<div id="dialogContainer" style="height:500px; position: relative;">
    <ejs-dialog id="dialog" header="In Container" target="#dialogContainer" width="400px">
        <e-content-template>
            <p>This dialog is scoped to #dialogContainer.</p>
        </e-content-template>
    </ejs-dialog>
</div>
```

---

### `Visible`
**Tag Helper Attr:** `visible`  
**Type:** `bool`  
**Default:** `true`

Specifies the value that represents whether the dialog component is visible.

```csharp
<ejs-dialog id="dialog" header="Hidden Dialog" visible="false" width="500px">
    <e-content-template>
        <p>This dialog is initially hidden.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function showDialog() {
        document.getElementById('dialog').ej2_instances[0].show();
    }
</script>
```

---

### `Width`
**Tag Helper Attr:** `width`  
**Type:** `string`  
**Default:** `"100%"`

Specifies the width of the dialog. Accepts pixel values (e.g., `"500px"`) or percentage values (e.g., `"80%"`).

```csharp
<ejs-dialog id="dialog" header="Custom Width" width="600px">
    <e-content-template>
        <p>This dialog is 600px wide.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `ZIndex`
**Tag Helper Attr:** `zIndex`  
**Type:** `double`  
**Default:** `1000`

Specifies the z-order for rendering that determines whether the dialog is displayed in front or behind of another component.

```csharp
<ejs-dialog id="dialog" header="High Z-Index" zIndex="2000" width="500px">
    <e-content-template>
        <p>This dialog renders above components with z-index below 2000.</p>
    </e-content-template>
</ejs-dialog>
```

---

## Events

### `BeforeClose`
**Tag Helper Attr:** `before-close`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers before the dialog is closed. If you cancel this event, the dialog remains opened. Set the `cancel` argument to `true` to cancel the closure of a dialog.

```csharp
<ejs-dialog id="dialog" header="Before Close" beforeClose="onBeforeClose" width="500px" showCloseIcon="true">
    <e-content-template>
        <p>Closing can be prevented via beforeClose event.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onBeforeClose(args) {
        // args.cancel = true; // Uncomment to prevent closing
        console.log('Before close event fired');
    }
</script>
```

---

### `BeforeOpen`
**Tag Helper Attr:** `before-open`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the dialog is being opened. If you cancel this event, the dialog remains closed. Set the `cancel` argument to `true` to cancel the opening of a dialog.

```csharp
<ejs-dialog id="dialog" header="Before Open" before-open="onBeforeOpen" width="500px">
    <e-content-template>
        <p>Opening can be prevented via beforeOpen event.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onBeforeOpen(args) {
        // args.cancel = true; // Uncomment to prevent opening
        console.log('Before open event fired');
    }
</script>
```

---

### `BeforeSanitizeHtml`
**Tag Helper Attr:** `before-sanitize-html`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers before sanitizing the value. Can be used to customize the sanitization logic.

```csharp
<ejs-dialog id="dialog" header="Sanitize" before-sanitize-html="onBeforeSanitize" width="500px">
    <e-content-template>
        <p>Content will be sanitized.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onBeforeSanitize(args) {
        console.log('Before sanitize HTML event fired', args);
    }
</script>
```

---

### `Close`
**Tag Helper Attr:** `close`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers after the dialog has been closed.

```csharp
<ejs-dialog id="dialog" header="Close Event" close="onClose" showCloseIcon="true" width="500px">
    <e-content-template>
        <p>A close event fires after this dialog is closed.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onClose(args) {
        console.log('Dialog has closed');
    }
</script>
```

---

### `Created`
**Tag Helper Attr:** `created`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the dialog is created.

```csharp
<ejs-dialog id="dialog" header="Created Event" created="onCreated" width="500px">
    <e-content-template>
        <p>A created event fires when this dialog initializes.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onCreated(args) {
        console.log('Dialog created');
    }
</script>
```

---

### `Destroyed`
**Tag Helper Attr:** `destroyed`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the dialog is destroyed.

```csharp
<ejs-dialog id="dialog" header="Destroyed Event" destroyed="onDestroyed" width="500px">
    <e-content-template>
        <p>A destroyed event fires when this dialog is disposed.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onDestroyed(args) {
        console.log('Dialog destroyed');
    }
</script>
```

---

### `Drag`
**Tag Helper Attr:** `drag`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the user drags the dialog. Fires continuously during a drag operation.

```csharp
<ejs-dialog id="dialog" header="Drag Event" allow-dragging="true" drag="onDrag" width="500px">
    <e-content-template>
        <p>Drag this dialog to fire the drag event.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onDrag(args) {
        console.log('Dragging:', args.event.clientX, args.event.clientY);
    }
</script>
```

---

### `DragStart`
**Tag Helper Attr:** `drag-start`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the user begins dragging the dialog.

```csharp
<ejs-dialog id="dialog" header="Drag Start" allow-dragging="true" drag-start="onDragStart" width="500px">
    <e-content-template>
        <p>Drag the header to fire the dragStart event.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onDragStart(args) {
        console.log('Drag started');
    }
</script>
```

---

### `DragStop`
**Tag Helper Attr:** `drag-stop`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the user stops dragging the dialog.

```csharp
<ejs-dialog id="dialog" header="Drag Stop" allow-dragging="true" drag-stop="onDragStop" width="500px">
    <e-content-template>
        <p>Release the drag to fire the dragStop event.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onDragStop(args) {
        console.log('Drag stopped');
    }
</script>
```

---

### `Open`
**Tag Helper Attr:** `open`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when a dialog is opened.

```csharp
<ejs-dialog id="dialog" header="Open Event" open="onOpen" width="500px">
    <e-content-template>
        <p>An open event fires after this dialog opens.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onOpen(args) {
        console.log('Dialog opened');
    }
</script>
```

---

### `OverlayClick`
**Tag Helper Attr:** `overlay-click`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the overlay of the dialog is clicked (only applicable when `is-modal="true"`).

```csharp
<ejs-dialog id="dialog" header="Overlay Click" is-modal="true" overlay-click="onOverlayClick" width="500px">
    <e-content-template>
        <p>Click the overlay to fire the overlayClick event.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onOverlayClick() {
        var dialog = document.getElementById('dialog').ej2_instances[0];
        dialog.hide();
    }
</script>
```

---

### `ResizeStart`
**Tag Helper Attr:** `resize-start`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the user begins to resize a dialog.

```csharp
<ejs-dialog id="dialog" header="Resize Start" enable-resize="true" resize-start="onResizeStart" width="500px" height="300px">
    <e-content-template>
        <p>Start resizing to fire the resizeStart event.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onResizeStart(args) {
        console.log('Resize started');
    }
</script>
```

---

### `Resizing`
**Tag Helper Attr:** `resizing`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the user resizes the dialog. Fires continuously during resize.

```csharp
<ejs-dialog id="dialog" header="Resizing" enable-resize="true" resizing="onResizing" width="500px" height="300px">
    <e-content-template>
        <p>Resize to continuously fire the resizing event.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onResizing(args) {
        console.log('Resizing...');
    }
</script>
```

---

### `ResizeStop`
**Tag Helper Attr:** `resize-stop`  
**Type:** `string` (JavaScript function name)  
**Default:** `null`

Event triggers when the user stops resizing a dialog.

```csharp
<ejs-dialog id="dialog" header="Resize Stop" enable-resize="true" resize-stop="onResizeStop" width="500px" height="300px">
    <e-content-template>
        <p>Stop resizing to fire the resizeStop event.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onResizeStop(args) {
        console.log('Resize stopped');
    }
</script>
```

---

## Methods

Methods are accessed via `document.getElementById('dialogId').ej2_instances[0]`.

### `show()`

Opens the dialog component. If the dialog is already visible, this call is ignored.

```javascript
var dialog = document.getElementById('dialog').ej2_instances[0];
dialog.show();
```

---

### `hide()`

Closes the dialog component. If the dialog is already hidden, this call is ignored.

```javascript
var dialog = document.getElementById('dialog').ej2_instances[0];
dialog.hide();
```

---

### `destroy()`

Destroys the dialog widget and removes it from the DOM along with all event listeners.

```javascript
var dialog = document.getElementById('dialog').ej2_instances[0];
dialog.destroy();
```

---

### `refresh()`

Refreshes the dialog's layout and re-renders it. Useful after dynamically updating properties.

```javascript
var dialog = document.getElementById('dialog').ej2_instances[0];
dialog.refresh();
```

---

### `setProperties(properties, muteOnChange?)`

Dynamically sets one or more dialog properties at runtime.

| Parameter | Type | Description |
|-----------|------|-------------|
| `properties` | `object` | Key-value map of properties to update |
| `muteOnChange` | `bool` (optional) | If `true`, change events are suppressed |

```javascript
var dialog = document.getElementById('dialog').ej2_instances[0];
dialog.setProperties({ width: '700px', header: 'New Title' });
```

---

## Sub-Types

### `DialogAnimationSettings`

Configures the animation behavior when the dialog opens or closes.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Effect` | `DialogEffect` enum | `Zoom` | The animation effect. See valid values below. |
| `Duration` | `double` | `400` | Duration of the animation in milliseconds |
| `Delay` | `double` | `0` | Delay before animation starts in milliseconds |

**Valid `Effect` values:** `Fade` \| `FadeZoom` \| `FlipLeftDown` \| `FlipLeftUp` \| `FlipRightDown` \| `FlipRightUp` \| `FlipXDown` \| `FlipXUp` \| `FlipYLeft` \| `FlipYRight` \| `SlideBottom` \| `SlideLeft` \| `SlideRight` \| `SlideTop` \| `Zoom` \| `None`

> ⚠️ **Invalid effects (do not use):** `FadeIn`, `FadeOut`, `SlideDown`, `SlideUp`, `SlideIn`, `SlideOut`, `Bounce`, `Flip`

```csharp
<ejs-dialog id="dialog" header="Animated" width="500px">
    <e-dialog-animationsettings effect="Zoom" duration="400" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Dialog with Zoom animation, 400ms duration.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `DialogPositionData`

Defines the X and Y coordinates for dialog positioning.

| Property | Type | Description |
|----------|------|-------------|
| `X` | `string` | Horizontal position: `left`, `center`, `right`, or a numeric offset value |
| `Y` | `string` | Vertical position: `top`, `center`, `bottom`, or a numeric offset value |

```csharp
<ejs-dialog id="dialog" header="Positioned" width="500px">
    <e-dialog-position x="center" y="center"></e-dialog-position>
    <e-content-template>
        <p>Centered dialog.</p>
    </e-content-template>
</ejs-dialog>
```

---

### `DialogDialogButton`

Defines the configuration for each button in the dialog footer.

| Property | Type | Description |
|----------|------|-------------|
| `ButtonModel` | `ButtonModel` | The button model properties (content, cssClass, isPrimary, etc.) |
| `Click` | `string` | JavaScript function name to call when the button is clicked |
| `IsFlat` | `bool` | When set to `true`, renders the button as a flat style |

```csharp
@{
    var okBtn = new ButtonModel { content = "OK", isPrimary = true, cssClass = "e-flat" };
    var cancelBtn = new ButtonModel { content = "Cancel", cssClass = "e-flat" };
}
<ejs-dialog id="dialog" header="Footer Buttons" width="400px">
    <e-dialog-buttons>
        <e-dialog-dialogbutton buttonModel="okBtn" click="onOK"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton buttonModel="cancelBtn" click="onCancel"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>Dialog with configured footer buttons.</p>
    </e-content-template>
</ejs-dialog>
```

---

## Quick Reference Table

### Properties Summary

| Tag Helper Attribute | Property | Type | Default | Description |
|----------------------|----------|------|---------|-------------|
| `allowDragging` | `AllowDragging` | `bool` | `false` | Enable drag to reposition |
| `<e-dialog-animationsettings>` | `AnimationSettings` | `DialogAnimationSettings` | `null` | Animation configuration |
| `<e-dialog-buttons>` | `Buttons` | `List<DialogDialogButton>` | `null` | Footer action buttons |
| `closeOnEscape` | `CloseOnEscape` | `bool` | `true` | Close dialog on Escape key |
| `content` | `Content` | `string` | `""` | Dialog body content string |
| `<e-content-template>` | `ContentTemplate` | `MvcTemplate<object>` | — | Rich HTML content template |
| `cssClass` | `CssClass` | `string` | `""` | Custom CSS class(es) |
| `enableHtmlSanitizer` | `EnableHtmlSanitizer` | `bool` | `true` | Sanitize HTML content |
| `enablePersistence` | `EnablePersistence` | `bool` | `false` | Persist state across reloads |
| `enableResize` | `EnableResize` | `bool` | `false` | Allow end-user resizing |
| `enableRtl` | `EnableRtl` | `bool` | `false` | Right-to-left rendering |
| `footerTemplate` | `FooterTemplate` | `string` | `""` | Custom footer HTML string |
| `header` | `Header` | `string` | — | Title bar text or HTML |
| `height` | `Height` | `string` | `"auto"` | Dialog height |
| `htmlAttributes` | `HtmlAttributes` | `object` | — | Extra HTML attributes |
| `isModal` | `IsModal` | `bool` | `false` | Modal/non-modal behavior |
| `locale` | `Locale` | `string` | `""` | Culture/locale override |
| `minHeight` | `MinHeight` | `string` | `""` | Minimum dialog height |
| `<e-dialog-position>` | `Position` | `DialogPositionData` | `null` | X/Y position |
| `resizeHandles` | `ResizeHandles` | `object` | `null` | Resize handle directions |
| `showCloseIcon` | `ShowCloseIcon` | `bool` | `false` | Show close (X) button |
| `target` | `Target` | `string` | — | Target container selector |
| `visible` | `Visible` | `bool` | `true` | Initial visibility |
| `width` | `Width` | `string` | `"100%"` | Dialog width |
| `zIndex` | `ZIndex` | `double` | `1000` | Z-order stacking level |

### Events Summary

| Tag Helper Attribute | Event | Trigger |
|----------------------|-------|---------|
| `beforeClose` | `BeforeClose` | Before dialog closes (cancellable) |
| `beforeOpen` | `BeforeOpen` | Before dialog opens (cancellable) |
| `beforeSanitizeHtml` | `BeforeSanitizeHtml` | Before HTML sanitization |
| `close` | `Close` | After dialog closes |
| `created` | `Created` | After dialog is created |
| `destroyed` | `Destroyed` | After dialog is destroyed |
| `drag` | `Drag` | Continuously while dragging |
| `dragStart` | `DragStart` | When drag begins |
| `dragStop` | `DragStop` | When drag ends |
| `open` | `Open` | After dialog opens |
| `overlayClick` | `OverlayClick` | When modal overlay is clicked |
| `resizeStart` | `ResizeStart` | When resize begins |
| `resizing` | `Resizing` | Continuously while resizing |
| `resizeStop` | `ResizeStop` | When resize ends |

### Methods Summary

| Method | Description |
|--------|-------------|
| `show()` | Opens the dialog |
| `hide()` | Closes the dialog |
| `destroy()` | Destroys the dialog widget |
| `refresh()` | Re-renders the dialog layout |
| `setProperties(props)` | Updates properties at runtime |
