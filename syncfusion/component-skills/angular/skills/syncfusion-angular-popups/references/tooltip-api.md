# Tooltip API Reference

**Source:** [Syncfusion Angular Tooltip API](https://ej2.syncfusion.com/angular/documentation/api/tooltip/)  
**Component:** `TooltipComponent` · **Module:** `TooltipModule` · **Package:** `@syncfusion/ej2-angular-popups`

## Table of Contents
- [Component Setup](#component-setup)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [TooltipEventArgs Interface](#tooltipeventargs-interface)
- [AnimationModel Interface](#animationmodel-interface)
- [TooltipAnimationSettings Interface](#tooltipanimationsettings-interface)
- [Position Enum](#position-enum)
- [TipPointerPosition Enum](#tippointerposition-enum)
- [Effect Enum](#effect-enum)

---

## Component Setup

```typescript
import {
  TooltipModule,
  TooltipComponent,
  TooltipAnimationSettings,
  AnimationModel
} from '@syncfusion/ej2-angular-popups';
```

```html
<ejs-tooltip
  id="myTooltip"
  content="Tooltip text"
  position="TopCenter"
  [animation]="animSettings"
  (beforeOpen)="onBeforeOpen($event)">
  <button>Target</button>
</ejs-tooltip>
```

> **Important:** Only use APIs documented here. Do not reference undocumented or internal properties.

---

## Properties

### animation
**Type:** `AnimationModel`  
**Default:** `{ open: { effect: 'FadeIn', duration: 150, delay: 0 }, close: { effect: 'FadeOut', duration: 150, delay: 0 } }`

Sets open and close animation effects. See [AnimationModel](#animationmodel-interface).

```html
<ejs-tooltip [animation]="{ open: { effect: 'ZoomIn', duration: 300, delay: 0 }, close: { effect: 'ZoomOut', duration: 200, delay: 0 } }">
```

---

### closeDelay
**Type:** `number` | **Default:** `0`

Milliseconds to wait before closing the tooltip after the trigger ends.

```html
<ejs-tooltip [closeDelay]="300">
```

---

### container
**Type:** `string | HTMLElement` | **Default:** `'body'`

The element to which the tooltip popup is appended. Accepts a CSS selector string or an `HTMLElement` reference.

```html
<ejs-tooltip container="#modal-container">
```

---

### content
**Type:** `any` (string, HTMLElement, or TemplateRef)  
**Default:** — (falls back to target's `title` attribute)

The content displayed inside the tooltip.

```html
<ejs-tooltip content="Simple text">
<ejs-tooltip [content]="htmlString">
<ejs-tooltip [content]="templateRef">
```

---

### cssClass
**Type:** `string` | **Default:** `null`

One or more CSS class names to apply to the tooltip element for custom styling.

```html
<ejs-tooltip cssClass="my-tip dark-theme">
```

---

### enableHtmlParse
**Type:** `boolean` | **Default:** `true`

When `true`, HTML string content is parsed into DOM elements. When `false`, the content is displayed as a plain string.

```html
<ejs-tooltip [enableHtmlParse]="false" content="<b>Not parsed</b>">
```

---

### enableHtmlSanitizer
**Type:** `boolean` | **Default:** `true`

When `true`, untrusted HTML strings and scripts are sanitized before rendering, preventing XSS.

```html
<ejs-tooltip [enableHtmlSanitizer]="false" [content]="trustedHtml">
```

---

### enablePersistence
**Type:** `boolean` | **Default:** `false`

Persists the component state (open/closed) between page reloads using browser storage.

```html
<ejs-tooltip [enablePersistence]="true">
```

---

### enableRtl
**Type:** `boolean` | **Default:** `false`

Renders the component in right-to-left direction.

```html
<ejs-tooltip [enableRtl]="true">
```

---

### height
**Type:** `string | number` | **Default:** `'auto'`

Height of the tooltip element. Use `'auto'` for content-based sizing. When a fixed value is set and content overflows, scroll mode activates.

```html
<ejs-tooltip height="100px">
<ejs-tooltip [height]="150">
```

---

### htmlAttributes
**Type:** `{ [key: string]: string }` | **Default:** `{}`

Additional HTML attributes to add to the tooltip popup root element.

```typescript
public attrs = { 'tabindex': '0', 'data-testid': 'tooltip' };
```
```html
<ejs-tooltip [htmlAttributes]="attrs">
```

---

### isSticky
**Type:** `boolean` | **Default:** `false`

Keeps the tooltip open until the user clicks the close icon. A close button appears in the top-right corner of the tooltip.

```html
<ejs-tooltip [isSticky]="true">
```

---

### locale
**Type:** `string` | **Default:** `''`

Overrides the global culture/localization value. Default global culture is `'en-US'`.

```html
<ejs-tooltip locale="fr-FR">
```

---

### mouseTrail
**Type:** `boolean` | **Default:** `false`

When `true`, the tooltip follows the mouse pointer over the target element.

```html
<ejs-tooltip [mouseTrail]="true">
```

---

### offsetX
**Type:** `number` | **Default:** `0`

Horizontal offset (px) between the target element and the tooltip.

```html
<ejs-tooltip [offsetX]="10">
```

---

### offsetY
**Type:** `number` | **Default:** `0`

Vertical offset (px) between the target element and the tooltip.

```html
<ejs-tooltip [offsetY]="-5">
```

---

### openDelay
**Type:** `number` | **Default:** `0`

Milliseconds to wait before opening the tooltip after the trigger fires.

```html
<ejs-tooltip [openDelay]="500">
```

---

### opensOn
**Type:** `string` | **Default:** `'Auto'`

Trigger mode for showing the tooltip. Values: `'Auto'`, `'Hover'`, `'Click'`, `'Focus'`, `'Custom'`. Combine multiple with a space: `'Hover Click'`. `'Auto'` cannot be combined.

```html
<ejs-tooltip opensOn="Click">
<ejs-tooltip opensOn="Hover Focus">
```

---

### position
**Type:** `Position` | **Default:** `'TopCenter'`

Position of the tooltip relative to the target element. See [Position Enum](#position-enum).

```html
<ejs-tooltip position="BottomLeft">
```

---

### showTipPointer
**Type:** `boolean` | **Default:** `true`

Shows or hides the arrow tip pointer on the tooltip.

```html
<ejs-tooltip [showTipPointer]="false">
```

---

### target
**Type:** `string`

CSS selector for multi-target tooltips. Only elements matching this selector within the tooltip's host receive tooltips.

```html
<ejs-tooltip target=".has-tip">
```

---

### tipPointerPosition
**Type:** `TipPointerPosition` | **Default:** `'Auto'`

Position of the tip pointer on the tooltip edge. See [TipPointerPosition Enum](#tippointerposition-enum).

```html
<ejs-tooltip tipPointerPosition="Start">
```

---

### width
**Type:** `string | number` | **Default:** `'auto'`

Width of the tooltip element. `'auto'` adjusts to fit content.

```html
<ejs-tooltip width="200px">
<ejs-tooltip [width]="250">
```

---

### windowCollision
**Type:** `boolean` | **Default:** `false`

When `true`, collision detection is performed against the page viewport (window) instead of the tooltip element.

```html
<ejs-tooltip [windowCollision]="true">
```

---

## Methods

Access methods via `@ViewChild`:

```typescript
@ViewChild('tooltip') tooltip!: TooltipComponent;
```

---

### open(element?, animation?)

Shows the tooltip on the specified target element with optional animation settings.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `element` | `HTMLElement` | Optional | Target element to show tooltip on. Defaults to host element |
| `animation` | `TooltipAnimationSettings` | Optional | Override animation for this call |

```typescript
this.tooltip.open(document.getElementById('btn') as HTMLElement);

// With custom animation
this.tooltip.open(targetEl, { effect: 'ZoomIn', duration: 300, delay: 0 });
```

**Returns:** `void`

---

### close(animation?)

Hides the tooltip with an optional animation effect.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `animation` | `TooltipAnimationSettings` | Optional | Override animation for this call |

```typescript
this.tooltip.close();

// With custom animation
this.tooltip.close({ effect: 'FadeOut', duration: 200, delay: 0 });
```

**Returns:** `void`

---

### refresh(target?)

Refreshes the tooltip content and recalculates its position. Use after programmatically changing `content` or after the target element moves.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `target` | `HTMLElement` | Optional | Specific target element to refresh tooltip for |

```typescript
this.tooltip.content = 'Updated content';
this.tooltip.refresh(targetElement);
```

**Returns:** `void`

---

### destroy()

Destroys the tooltip component and releases all resources. The component becomes unusable after this call.

```typescript
this.tooltip.destroy();
```

**Returns:** `void`

---

## Events

Bind events using Angular event binding syntax `(eventName)`:

```html
<ejs-tooltip
  (created)="onCreated($event)"
  (beforeRender)="onBeforeRender($event)"
  (beforeOpen)="onBeforeOpen($event)"
  (afterOpen)="onAfterOpen($event)"
  (beforeClose)="onBeforeClose($event)"
  (afterClose)="onAfterClose($event)"
  (beforeCollision)="onBeforeCollision($event)"
  (destroyed)="onDestroyed($event)">
```

---

### created
**Type:** `EmitType<Object>`

Triggered after the tooltip component is created and initialized.

```typescript
onCreated(args: object): void {
  console.log('Tooltip created');
}
```

---

### beforeRender
**Type:** `EmitType<TooltipEventArgs>`

Triggered before the tooltip and its contents are added to the DOM. Setting `args.cancel = true` prevents rendering entirely.

Use this event to:
- Load AJAX content dynamically (set `args.cancel = true`, fetch data, then call `refresh()`)
- Conditionally prevent tooltip rendering

```typescript
onBeforeRender(args: TooltipEventArgs): void {
  if (!shouldShowTooltip(args.target)) {
    args.cancel = true;
  }
}
```

---

### beforeOpen
**Type:** `EmitType<TooltipEventArgs>`

Triggered before the tooltip is displayed. Setting `args.cancel = true` prevents it from opening.

Use this event to:
- Refresh tooltip position dynamically
- Apply custom styles or classes
- Prevent tooltip on specific targets

```typescript
onBeforeOpen(args: TooltipEventArgs): void {
  // Prevent tooltip on elements with data-notip
  if ((args.target as HTMLElement).hasAttribute('data-notip')) {
    args.cancel = true;
  }
}
```

---

### afterOpen
**Type:** `EmitType<TooltipEventArgs>`

Triggered after the tooltip is fully visible on screen.

```typescript
onAfterOpen(args: TooltipEventArgs): void {
  console.log('Tooltip opened on:', args.target);
}
```

---

### beforeClose
**Type:** `EmitType<TooltipEventArgs>`

Triggered before the tooltip hides. Setting `args.cancel = true` keeps the tooltip open.

```typescript
onBeforeClose(args: TooltipEventArgs): void {
  if (this.isProcessing) {
    args.cancel = true; // Keep tooltip visible while processing
  }
}
```

---

### afterClose
**Type:** `EmitType<TooltipEventArgs>`

Triggered after the tooltip is fully hidden.

```typescript
onAfterClose(args: TooltipEventArgs): void {
  console.log('Tooltip closed');
}
```

---

### beforeCollision
**Type:** `EmitType<TooltipEventArgs>`

Triggered on every collision detection calculation. Use to read `args.collidedPosition` and react to positioning adjustments.

```typescript
onBeforeCollision(args: TooltipEventArgs): void {
  console.log('Collided position:', args.collidedPosition);
}
```

---

### destroyed
**Type:** `EmitType<Object>`

Triggered when the tooltip component is destroyed via `destroy()`.

```typescript
onDestroyed(args: object): void {
  console.log('Tooltip destroyed');
}
```

---

## TooltipEventArgs Interface

Properties available in all tooltip event callbacks:

| Property | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to `true` to prevent the current action (available in `beforeRender`, `beforeOpen`, `beforeClose`) |
| `collidedPosition` | `string` | Denotes the collided tooltip position (available in `beforeCollision`) |
| `element` | `HTMLElement` | The tooltip popup element |
| `event` | `Event` | The current browser event object |
| `isInteracted` | `boolean` | `true` if event was triggered by a user interaction |
| `name` | `string` | Name of the triggered event |
| `target` | `HTMLElement` | The target element where the tooltip is displayed |
| `type` | `string` | Type of the triggered event |

---

## AnimationModel Interface

```typescript
interface AnimationModel {
  open:  TooltipAnimationSettings;  // Animation applied when tooltip opens
  close: TooltipAnimationSettings;  // Animation applied when tooltip closes
}
```

```typescript
const animation: AnimationModel = {
  open:  { effect: 'FadeIn',  duration: 150, delay: 0 },
  close: { effect: 'FadeOut', duration: 150, delay: 0 }
};
```

---

## TooltipAnimationSettings Interface

```typescript
interface TooltipAnimationSettings {
  effect:   Effect;  // Animation effect name
  duration: number;  // Duration of animation in milliseconds
  delay:    number;  // Delay before animation starts in milliseconds
}
```

---

## Position Enum

Valid values for the `position` property:

```
TopLeft    | TopCenter    | TopRight
BottomLeft | BottomCenter | BottomRight
LeftTop    | LeftCenter   | LeftBottom
RightTop   | RightCenter  | RightBottom
```

Default: `'TopCenter'`

---

## TipPointerPosition Enum

Valid values for the `tipPointerPosition` property:

| Value | Description |
|---|---|
| `Auto` | Auto-adjusts within target bounds (default) |
| `Start` | Arrow at the start of the tooltip edge |
| `Middle` | Arrow at the center of the tooltip edge |
| `End` | Arrow at the end of the tooltip edge |

---

## Effect Enum

Valid values for `TooltipAnimationSettings.effect`:

```
FadeIn      | FadeOut
FadeZoomIn  | FadeZoomOut
FlipXDownIn | FlipXDownOut
FlipXUpIn   | FlipXUpOut
FlipYLeftIn | FlipYLeftOut
FlipYRightIn| FlipYRightOut
ZoomIn      | ZoomOut
None
```

> Use `'None'` for instant show/hide with no animation.
