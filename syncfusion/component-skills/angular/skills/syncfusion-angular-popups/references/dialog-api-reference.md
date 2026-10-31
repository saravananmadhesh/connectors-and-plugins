---
name: dialog-api-reference
description: Complete API reference for Syncfusion Angular Dialog component with all valid properties, methods, and events from official documentation
license: "SEE LICENSE IN license"
metadata:
  author: "Syncfusion"
  category: "API Reference"
---

# Dialog Component - Complete API Reference

**Official Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/

This document provides comprehensive API reference for the Syncfusion Angular Dialog component, extracted from the official Syncfusion documentation.

## Table of Contents

- [Component Overview](#component-overview)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces & Models](#interfaces--models)
- [Enumerations](#enumerations)
- [Code Examples](#code-examples)

---

## Component Overview

The **DialogComponent** represents the Angular Dialog Component from the Syncfusion Popups library. It provides a flexible window for displaying information, collecting user input, or confirming actions.

**Module:** `@syncfusion/ej2-angular-popups`  
**Import:** `import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';`

---

## Properties

### allowDragging: `boolean`

**Description:** Specifies whether the dialog component can be dragged by the end-user. The dialog allows dragging by selecting the header and moving it to reposition the dialog.

**Default:** `false`

**Example:**
```typescript
<ejs-dialog [allowDragging]="true" header="Draggable Dialog">
</ejs-dialog>
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/dialog/getting-started/#draggable

---

### animationSettings: `AnimationSettingsModel`

**Description:** Specifies the animation settings of the dialog component. The animation effect can be applied when opening and closing the dialog with configurable duration and delay.

**Type:** `AnimationSettingsModel`

**Properties:**
- `effect`: Animation effect type (Fade, Zoom, FadeZoom, SlideLeft, SlideRight, SlideUp, SlideDown, Flip, Bounce)
- `duration`: Duration of animation in milliseconds
- `delay`: Delay before animation starts in milliseconds

**Example:**
```typescript
animationSettings: AnimationSettingsModel = { 
  effect: 'FadeZoom', 
  duration: 400 
};

<ejs-dialog [animationSettings]="animationSettings">
</ejs-dialog>
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/animationsettingsmodel

---

### buttons: `ButtonPropsModel[]`

**Description:** Configures the action buttons that contain button properties with primary attributes and click events. One or more action buttons can be configured to the dialog.

**Type:** `ButtonPropsModel[]`

**Properties:**
- `text`: Display text of the button
- `cssClass`: CSS class for styling (e.g., 'e-primary', 'e-danger', 'e-outline')
- `click`: Click event handler function
- `disabled`: Whether button is disabled

**Example:**
```typescript
buttons = [
  {
    text: 'Save',
    cssClass: 'e-primary',
    click: () => this.onSave()
  },
  {
    text: 'Cancel',
    click: () => this.dialog.hide()
  }
];

<ejs-dialog [buttons]="buttons">
</ejs-dialog>
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/buttonpropsmodel

---

### closeOnEscape: `boolean`

**Description:** Specifies whether the dialog can be closed by pressing the Escape key. This is used to control the dialog's closing behavior via keyboard.

**Default:** `true`

**Example:**
```typescript
<ejs-dialog [closeOnEscape]="true">
</ejs-dialog>
```

---

### content: `string | HTMLElement | Function`

**Description:** Specifies the value that can be displayed in the dialog's content area. Can be plain text, HTML string, or HTML elements. Content can be loaded dynamically (database, AJAX, etc.).

**Type:** `string | HTMLElement | Function`

**Example:**
```typescript
// String content
<ejs-dialog content="This is dialog content">
</ejs-dialog>

// HTML content
content = '<h3>Welcome</h3><p>This is HTML content</p>';
<ejs-dialog [content]="content">
</ejs-dialog>

// Template content
<ejs-dialog>
  <ng-template #content>
    <div>Template-based content</div>
  </ng-template>
</ejs-dialog>
```

---

### cssClass: `string`

**Description:** Specifies CSS class name(s) that can be appended to the root element of the dialog. One or more custom CSS classes can be added for styling.

**Type:** `string`

**Example:**
```typescript
<ejs-dialog cssClass="custom-dialog-class e-dialog-custom">
</ejs-dialog>

// CSS
.e-dialog.custom-dialog-class {
  background-color: #f0f0f0;
}
```

---

### enableHtmlSanitizer: `boolean`

**Description:** Defines whether to allow or prevent cross-site scripting (XSS) by sanitizing HTML content.

**Default:** `true`

**Example:**
```typescript
<ejs-dialog [enableHtmlSanitizer]="true">
</ejs-dialog>
```

---

### enablePersistence: `boolean`

**Description:** Enables or disables persistence of the dialog's dimensions and position state between page reloads.

**Default:** `false`

**Example:**
```typescript
<ejs-dialog [enablePersistence]="true">
</ejs-dialog>
```

---

### enableResize: `boolean`

**Description:** Specifies whether the dialog component can be resized by the end-user. If enabled, the dialog creates a grip to resize in diagonal directions.

**Default:** `false`

**Example:**
```typescript
<ejs-dialog [enableResize]="true">
</ejs-dialog>
```

**Related:** Use with `resizeHandles` property

---

### enableRtl: `boolean`

**Description:** Enable or disable rendering the component in right-to-left (RTL) direction for RTL languages.

**Default:** `false`

**Example:**
```typescript
<ejs-dialog [enableRtl]="true">
</ejs-dialog>
```

---

### footerTemplate: `HTMLElement | string | Function`

**Description:** Specifies the template value that can be displayed in the dialog's footer area. This is optional and used when the footer contains custom information or components. If configured, the action buttons property is disabled.

**Type:** `HTMLElement | string | Function`

**Example:**
```typescript
<ejs-dialog>
  <ng-template #footerTemplate>
    <div style="padding: 10px;">
      <button (click)="onCustomAction()">Custom Button</button>
    </div>
  </ng-template>
</ejs-dialog>
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/dialog/template/#footer

---

### header: `string | HTMLElement | Function`

**Description:** Specifies the value that can be displayed in the dialog's title area, configured with plain text or HTML elements. This is optional; the dialog can be displayed without a header if null.

**Type:** `string | HTMLElement | Function`

**Example:**
```typescript
// String header
<ejs-dialog header="Dialog Title">
</ejs-dialog>

// Template header
<ejs-dialog>
  <ng-template #header>
    <div class="custom-header">
      <span>Custom Title</span>
    </div>
  </ng-template>
</ejs-dialog>
```

---

### height: `string | number`

**Description:** Specifies the height of the dialog component. Can be in pixels (px) or as a number.

**Type:** `string | number`

**Example:**
```typescript
<ejs-dialog height="400px">
</ejs-dialog>

// Or as number (interpreted as pixels)
<ejs-dialog [height]="400">
</ejs-dialog>
```

---

### isModal: `boolean`

**Description:** Specifies whether the dialog is displayed as modal or non-modal (modeless).

**Values:**
- `true` (Modal): Creates overlay that disables interaction with parent application. User must respond to the modal.
- `false` (Modeless): Does not prevent user interaction with parent application.

**Default:** `false`

**Example:**
```typescript
// Modal dialog (blocks parent interaction)
<ejs-dialog [isModal]="true">
</ejs-dialog>

// Modeless dialog (allows parent interaction)
<ejs-dialog [isModal]="false" [allowDragging]="true">
</ejs-dialog>
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/dialog/getting-started/

---

### locale: `string`

**Description:** Overrides the global culture and localization value for this component. Defaults to global culture 'en-US'.

**Type:** `string`

**Example:**
```typescript
<ejs-dialog locale="fr-FR">
</ejs-dialog>
```

---

### minHeight: `string | number`

**Description:** Specifies the minimum height of the dialog component. Prevents the dialog from being resized below this value.

**Type:** `string | number`

**Example:**
```typescript
<ejs-dialog [minHeight]="200">
</ejs-dialog>

// Or with string
<ejs-dialog minHeight="200px">
</ejs-dialog>
```

---

### position: `PositionDataModel`

**Description:** Specifies where the dialog is positioned within the document or target element. Can use pre-configured positions or specific X and Y values.

**Type:** `PositionDataModel`

**Pre-configured Positions:**
- `TopLeft`, `TopCenter`, `TopRight`
- `MiddleLeft`, `Center`, `MiddleRight`
- `BottomLeft`, `BottomCenter`, `BottomRight`

**X Value:** `left`, `center`, `right`, or numeric offset  
**Y Value:** `top`, `center`, `bottom`, or numeric offset

**Example:**
```typescript
// Pre-configured position
<ejs-dialog position="Center">
</ejs-dialog>

// Custom X and Y
position: PositionDataModel = { X: 'center', Y: 'top' };
<ejs-dialog [position]="position">
</ejs-dialog>

// Pixel offset
position: PositionDataModel = { X: 100, Y: 50 };
<ejs-dialog [position]="position">
</ejs-dialog>
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/dialog/getting-started/#positioning

---

### resizeHandles: `ResizeDirections[]`

**Description:** Specifies the resize handles direction in the dialog that can be resized by the end-user.

**Type:** `ResizeDirections[]`

**Valid Values:**
- `'All'` - All directions
- `'NorthEast'`, `'NorthWest'`, `'SouthEast'`, `'SouthWest'` - Corners
- `'North'`, `'South'`, `'East'`, `'West'` - Sides

**Example:**
```typescript
// All resize handles
<ejs-dialog [resizeHandles]="['All']" [enableResize]="true">
</ejs-dialog>

// Specific handles
<ejs-dialog [resizeHandles]="['SouthEast', 'South', 'East']" [enableResize]="true">
</ejs-dialog>
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/resizedirections

---

### showCloseIcon: `boolean`

**Description:** Specifies whether the close icon is shown in the dialog component's header.

**Default:** `false`

**Example:**
```typescript
<ejs-dialog [showCloseIcon]="true">
</ejs-dialog>
```

---

### target: `HTMLElement | string`

**Description:** Specifies the target element in which to display the dialog. Defaults to `document.body` if not specified.

**Type:** `HTMLElement | string`

> **⚠️ Height Calculation:** The Dialog's `max-height` is calculated based on the height of the target element. If `target` is not set, `document.body` is used — ensure the body has a proper height. If the dialog's height exceeds the target's height, the dialog height will not render correctly.

**Target Container Requirements:**
- The target element **must** have `position: relative` (or `absolute`/`fixed`)
- The target element **must** have an explicit `height` or `min-height`
- When using `document.body` (default), set `html, body { height: 100%; }` in CSS

**Example:**
```typescript
// Target by ID — container must have explicit height and position: relative
<div id="dialog-container" style="height: 500px; position: relative;">
  <ejs-dialog target="#dialog-container">
  </ejs-dialog>
</div>
```

**When the target is `document.body` (default):**
```css
/* styles.css — required for correct dialog height when no target is set */
html, body {
  height: 100%;
  margin: 0;
}
```

**Issue to avoid:** If the dialog's `height` is larger than the body's height and no explicit `target` is configured, the dialog height will not be set correctly.

---

### visible: `boolean`

**Description:** Specifies whether the dialog component is visible.

**Default:** `true`

**Example:**
```typescript
<ejs-dialog [visible]="true">
</ejs-dialog>
```

---

### width: `string | number`

**Description:** Specifies the width of the dialog.

**Type:** `string | number`

**Example:**
```typescript
// Pixel width
<ejs-dialog width="400px">
</ejs-dialog>

// Percentage width
<ejs-dialog width="80%">
</ejs-dialog>

// As number (interpreted as pixels)
<ejs-dialog [width]="400">
</ejs-dialog>
```

---

### zIndex: `number`

**Description:** Specifies the z-order for rendering that determines whether the dialog is displayed in front or behind of another component.

**Type:** `number`

**Example:**
```typescript
<ejs-dialog [zIndex]="1000">
</ejs-dialog>
```

---

## Methods

### show()

**Description:** Opens the dialog if it is in hidden state. To open the dialog with full screen width, set the optional parameter to `true`.

**Parameters:**
- `isFullScreen` *(optional)*: `boolean` — Enable the fullScreen Dialog.

**Return Type:** `void`

**Example:**
```typescript
@ViewChild('dialog') dialog!: DialogComponent;

openDialog() {
  this.dialog.show();
}

openFullScreen() {
  this.dialog.show(true);
}
```

---

### hide()

**Description:** Closes/hides the dialog component.

**Return Type:** `void`

**Example:**
```typescript
closeDialog() {
  this.dialog.hide();
}
```

---

### refreshPosition()

**Description:** Refreshes the dialog's position when the user changes its header and footer height/width dynamically.

**Return Type:** `void`

**Example:**
```typescript
refreshDialogPosition() {
  this.dialog.refreshPosition();
}
```

---

### getButtons()

**Description:** Returns the dialog button instances. Based on that, you can dynamically change the button states.

**Parameters:**
- `index` *(optional)*: `number` — Index of the button.

**Return Type:** `Button[] | Button`

**Example:**
```typescript
// Get all buttons
const buttons = this.dialog.getButtons();

// Get button at index 0
const firstButton = this.dialog.getButtons(0);
firstButton.disabled = true;
```

---

### getDimension()

**Description:** Returns the current width and height of the Dialog.

**Return Type:** `DialogDimension`

**Example:**
```typescript
const dimension = this.dialog.getDimension();
console.log(dimension.width, dimension.height);
```

---

### destroy()

**Description:** Destroys the dialog component and releases its resources.

**Return Type:** `void`

**Example:**
```typescript
destroyDialog() {
  this.dialog.destroy();
}
```

---

## Events

### beforeClose: `BeforeCloseEventArgs`

**Description:** Triggered before the dialog is closed. Set `cancel` to `true` to prevent closure.

**Arguments:**
- `cancel`: Boolean to cancel the close action
- `event`: Original event

**Example:**
```typescript
<ejs-dialog (beforeClose)="onBeforeClose($event)">
</ejs-dialog>

onBeforeClose(args: BeforeCloseEventArgs) {
  if (this.formDirty) {
    args.cancel = true;
    console.log('Close cancelled - unsaved changes');
  }
}
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/beforecloseeventargs

---

### beforeOpen: `BeforeOpenEventArgs`

**Description:** Triggered when the dialog is being opened. Set `cancel` to `true` to prevent opening.

**Arguments:**
- `cancel`: Boolean to cancel the open action
- `event`: Original event

**Example:**
```typescript
<ejs-dialog (beforeOpen)="onBeforeOpen($event)">
</ejs-dialog>

onBeforeOpen(args: BeforeOpenEventArgs) {
  if (!this.isAllowedToOpen()) {
    args.cancel = true;
  }
}
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/beforeopeneventargs

---

### beforeSanitizeHtml: `BeforeSanitizeHtmlArgs`

**Description:** Triggered before HTML content is sanitized for XSS prevention.

**Example:**
```typescript
<ejs-dialog (beforeSanitizeHtml)="onBeforeSanitize($event)">
</ejs-dialog>

onBeforeSanitize(args: BeforeSanitizeHtmlArgs) {
  console.log('Sanitizing HTML:', args);
}
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/beforesanitizehtmlargs

---

### close: `Object`

**Description:** Triggered after the dialog has been closed.

**Example:**
```typescript
<ejs-dialog (close)="onClose()">
</ejs-dialog>

onClose() {
  console.log('Dialog closed');
}
```

---

### created: `Object`

**Description:** Triggered when the dialog is created.

**Example:**
```typescript
<ejs-dialog (created)="onCreated()">
</ejs-dialog>

onCreated() {
  console.log('Dialog created');
}
```

---

### destroyed: `Event`

**Description:** Triggered when the dialog is destroyed.

**Example:**
```typescript
<ejs-dialog (destroyed)="onDestroyed()">
</ejs-dialog>

onDestroyed() {
  console.log('Dialog destroyed');
}
```

---

### drag: `Object`

**Description:** Triggered when the user is dragging the dialog.

**Example:**
```typescript
<ejs-dialog (drag)="onDrag()">
</ejs-dialog>

onDrag() {
  console.log('Dialog is being dragged');
}
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/drageventargs

---

### dragStart: `Object`

**Description:** Triggered when the user begins dragging the dialog.

**Example:**
```typescript
<ejs-dialog (dragStart)="onDragStart()">
</ejs-dialog>

onDragStart() {
  console.log('Drag started');
}
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/dragstarteventargs

---

### dragStop: `Object`

**Description:** Triggered when the user stops dragging the dialog.

**Example:**
```typescript
<ejs-dialog (dragStop)="onDragStop()">
</ejs-dialog>

onDragStop() {
  console.log('Drag stopped');
}
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/dragstopeventargs

---

### open: `Object`

**Description:** Triggered when the dialog is opened.

**Example:**
```typescript
<ejs-dialog (open)="onOpen()">
</ejs-dialog>

onOpen() {
  console.log('Dialog opened');
}
```

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/openeventargs

---

### overlayClick: `Object`

**Description:** Triggered when the overlay/backdrop of the dialog is clicked.

**Example:**
```typescript
<ejs-dialog (overlayClick)="onOverlayClick()">
</ejs-dialog>

onOverlayClick() {
  console.log('Overlay clicked');
}
```

---

### resizeStart: `Object`

**Description:** Triggered when the user begins resizing the dialog.

**Example:**
```typescript
<ejs-dialog (resizeStart)="onResizeStart()">
</ejs-dialog>

onResizeStart() {
  console.log('Resize started');
}
```

---

### resizeStop: `Object`

**Description:** Triggered when the user stops resizing the dialog.

**Example:**
```typescript
<ejs-dialog (resizeStop)="onResizeStop()">
</ejs-dialog>

onResizeStop() {
  console.log('Resize stopped');
}
```

---

### resizing: `Object`

**Description:** Triggered when the user is actively resizing the dialog.

**Example:**
```typescript
<ejs-dialog (resizing)="onResizing()">
</ejs-dialog>

onResizing() {
  console.log('Dialog is being resized');
}
```

---

## Interfaces & Models

### AnimationSettingsModel

**Properties:**
- `effect`: DialogEffect (Animation effect type)
- `duration`: number (Duration in milliseconds)
- `delay`: number (Delay in milliseconds)

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/animationsettingsmodel

---

### ButtonPropsModel

**Properties:**
- `text`: string (Button display text)
- `cssClass`: string (CSS class for styling)
- `click`: Function (Click event handler)
- `disabled`: boolean (Disabled state)

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/buttonpropsmodel

---

### ButtonProps

**Alias for ButtonPropsModel**

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/buttonprops

---

### PositionDataModel

**Properties:**
- `X`: string | number (Horizontal position)
- `Y`: string | number (Vertical position)

---

### DialogDimension

**Description:** Returned by the `getDimension()` method. Represents the current dimensions of the dialog.

**Properties:**
- `width`: number | string (Current width of the dialog)
- `height`: number | string (Current height of the dialog)

---

## Enumerations

### DialogEffect

**Values:**
- `Fade`
- `Zoom`
- `FadeZoom`
- `SlideLeft`
- `SlideRight`
- `SlideUp`
- `SlideDown`
- `Flip`
- `Bounce`

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/dialogeffect

---

### ResizeDirections

**Values:**
- `All`
- `NorthEast`
- `NorthWest`
- `SouthEast`
- `SouthWest`
- `North`
- `South`
- `East`
- `West`

**Related Documentation:** https://ej2.syncfusion.com/angular/documentation/api/dialog/resizedirections

---

## Code Examples

### Basic Modal Dialog

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-basic-dialog',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div id="dialog-container" style="height: 500px;">
      <button class="e-control e-btn" (click)="openDialog()">
        Open Dialog
      </button>
      
      <ejs-dialog
        #basicDialog
        [isModal]="true"
        [showCloseIcon]="true"
        width="400px"
        content="This is a basic modal dialog"
      >
        <ng-template #header>
          <span>Dialog Title</span>
        </ng-template>
      </ejs-dialog>
    </div>
  `
})
export class BasicDialogComponent {
  @ViewChild('basicDialog') dialog!: DialogComponent;

  openDialog() {
    this.dialog.show();
  }
}
```

### Dialog with Buttons

```typescript
buttons = [
  {
    text: 'OK',
    cssClass: 'e-primary',
    click: () => this.onOk()
  },
  {
    text: 'Cancel',
    click: () => this.dialog.hide()
  }
];

<ejs-dialog [buttons]="buttons">
</ejs-dialog>
```

### Draggable and Resizable

```typescript
<ejs-dialog
  [allowDragging]="true"
  [enableResize]="true"
  [resizeHandles]="['All']"
  [minHeight]="200"
>
</ejs-dialog>
```

### With Animation

```typescript
animationSettings = {
  effect: 'FadeZoom',
  duration: 400
};

<ejs-dialog [animationSettings]="animationSettings">
</ejs-dialog>
```

---

## Best Practices

1. **Always specify a target container** for proper positioning
2. **Use modeless dialogs for floating panels** to allow background interaction
3. **Implement proper focus management** for accessibility
4. **Use event handlers** for `beforeClose` and `beforeOpen` to control dialog behavior
5. **Sanitize HTML content** when loading dynamic content (enabled by default)
6. **Test keyboard navigation** (Tab, Escape) for accessibility
7. **Set appropriate z-index** if using multiple dialogs

---

## Related Links

- **Official Documentation:** https://ej2.syncfusion.com/angular/documentation/dialog/
- **Getting Started:** https://ej2.syncfusion.com/angular/documentation/dialog/getting-started/
- **API Overview:** https://ej2.syncfusion.com/angular/documentation/api/dialog/overview
- **GitHub Repository:** https://github.com/syncfusion/ej2-angular-ui-components

---

**Last Updated:** March 24, 2026  
**API Version:** Syncfusion EJ2 Angular Latest  
**Status:** Complete - Valid APIs from Official Documentation
