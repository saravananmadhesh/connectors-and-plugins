# Speed Dial API Reference

> Source: [Syncfusion Angular Speed Dial API](https://ej2.syncfusion.com/angular/documentation/api/speed-dial/index-default)

## Table of Contents
- [Component Selector](#component-selector)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [SpeedDialItemModel](#speeddialitemmodel)
- [SpeedDialAnimationSettingsModel](#speeddialanimationsettingsmodel)
- [RadialSettingsModel](#radialsettingsmodel)

---

## Component Selector

```html
<button ejs-speeddial ...></button>
```

Import: `SpeedDialModule` from `@syncfusion/ej2-angular-buttons`

---

## Properties

### animation
**Type:** `SpeedDialAnimationSettingsModel`  
**Default:** `{ effect: 'Fade', duration: 400, delay: 0 }`

Provides options to customize the animation applied while opening and closing the popup.

```html
<button ejs-speeddial [animation]="animation"></button>
```
```typescript
public animation: SpeedDialAnimationSettingsModel = { effect: 'Zoom' };
```

---

### closeIconCss
**Type:** `string`  
**Default:** `''`

One or more CSS classes for the icon displayed on the button when the popup is **open**.

```html
<button ejs-speeddial closeIconCss="e-icons e-close"></button>
```

---

### content
**Type:** `string`  
**Default:** `''`

Text content displayed on the Speed Dial trigger button.

```html
<button ejs-speeddial content="Edit"></button>
```

---

### cssClass
**Type:** `string`  
**Default:** `''`

One or more CSS classes to customize the appearance of the Speed Dial button.  
Predefined values: `e-primary`, `e-outline`, `e-info`, `e-success`, `e-warning`, `e-danger`

```html
<button ejs-speeddial cssClass="e-warning"></button>
```

---

### direction
**Type:** `string | LinearDirection`  
**Default:** `LinearDirection.Auto`

The direction in which items are displayed when `mode` is `Linear`.  
Values: `'Up'`, `'Down'`, `'Left'`, `'Right'`, `'Auto'`

```html
<button ejs-speeddial mode="Linear" direction="Left"></button>
```

---

### disabled
**Type:** `boolean`  
**Default:** `false`

Disables the entire Speed Dial component.

```html
<button ejs-speeddial [disabled]="true"></button>
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enables persisting the component's state between page reloads.

```html
<button ejs-speeddial [enablePersistence]="true"></button>
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Renders the component in right-to-left direction.

```html
<button ejs-speeddial [enableRtl]="true"></button>
```

---

### iconPosition
**Type:** `string | IconPosition`  
**Default:** `IconPosition.Left`

Position of the icon relative to text on the Speed Dial button.  
Values: `'Left'`, `'Right'`

```html
<button ejs-speeddial iconPosition="Right" openIconCss="e-icons e-edit" content="Edit"></button>
```

---

### isPrimary
**Type:** `boolean`  
**Default:** `true`

Specifies whether the Speed Dial acts as the primary FAB button.

```html
<button ejs-speeddial [isPrimary]="false"></button>
```

---

### itemTemplate
**Type:** `string | object`  
**Default:** `''`

Template for customizing the content of each Speed Dial action item.

```html
<button ejs-speeddial [items]="items" [itemTemplate]="itemTemplate">
  <ng-template #itemTemplate let-items="">
    <div><span class="{{ items.iconCss }}"></span><span>{{ items.text }}</span></div>
  </ng-template>
</button>
```

---

### items
**Type:** `SpeedDialItemModel[]`  
**Default:** `[]`

The list of Speed Dial action items.

```html
<button ejs-speeddial [items]="items"></button>
```
```typescript
public items: SpeedDialItemModel[] = [
  { text: 'Cut', iconCss: 'e-icons e-cut' }
];
```

---

### locale
**Type:** `string`  
**Default:** `''`

Overrides the global culture and localization value. Default is `'en-US'`.

---

### modal
**Type:** `boolean`  
**Default:** `false`

When `true`, an overlay is shown behind the popup that prevents interaction with other page elements. Clicking outside the popup closes it.

```html
<button ejs-speeddial [modal]="true"></button>
```

---

### mode
**Type:** `string | SpeedDialMode`  
**Default:** `SpeedDialMode.Linear`

Display mode for action items.  
Values: `'Linear'`, `'Radial'`

```html
<button ejs-speeddial mode="Radial"></button>
```

---

### openIconCss
**Type:** `string`  
**Default:** `''`

One or more CSS classes for the icon displayed on the button when the popup is **closed**.

```html
<button ejs-speeddial openIconCss="e-icons e-edit"></button>
```

---

### opensOnHover
**Type:** `boolean`  
**Default:** `false`

When `true`, the popup opens on mouse hover instead of click.

```html
<button ejs-speeddial [opensOnHover]="true"></button>
```

---

### popupTemplate
**Type:** `string | object`  
**Default:** `''`

Template for the entire Speed Dial popup. Replaces the default item list.

```html
<button ejs-speeddial [popupTemplate]="popupTemplate">
  <ng-template #popupTemplate>
    <div>Custom popup content</div>
  </ng-template>
</button>
```

---

### position
**Type:** `string | FabPosition`  
**Default:** `FabPosition.BottomRight`

Position of the Speed Dial button relative to `target` (or viewport).  
Values: `'TopLeft'`, `'TopCenter'`, `'TopRight'`, `'MiddleLeft'`, `'MiddleCenter'`, `'MiddleRight'`, `'BottomLeft'`, `'BottomCenter'`, `'BottomRight'`

```html
<button ejs-speeddial position="BottomLeft"></button>
```

---

### radialSettings
**Type:** `RadialSettingsModel`  
**Default:** `{ startAngle: null, endAngle: null, direction: 'Auto' }`

Options for customizing the radial layout when `mode="Radial"`.

```html
<button ejs-speeddial mode="Radial" [radialSettings]="radialSettings"></button>
```
```typescript
public radialSettings: RadialSettingsModel = {
  offset: '80px',
  direction: 'AntiClockwise',
  startAngle: 190,
  endAngle: 260
};
```

---

### target
**Type:** `string | HTMLElement`  
**Default:** `''`

CSS selector or element that the Speed Dial is positioned within. Target must have `position: relative`.

```html
<div id="container" style="position:relative; min-height:350px;"></div>
<button ejs-speeddial target="#container"></button>
```

---

### visible
**Type:** `boolean`  
**Default:** `true`

Controls the visibility of the Speed Dial button. Set to `false` to hide it.

```html
<button ejs-speeddial [visible]="false"></button>
```

---

## Methods

### hide()
**Returns:** `void`

Closes the Speed Dial popup.

```typescript
@ViewChild('speeddial') speeddialObj: SpeedDialComponent;

this.speeddialObj.hide();
```

---

### show()
**Returns:** `void`

Opens the Speed Dial popup to display action items or the `popupTemplate`.

```typescript
@ViewChild('speeddial') speeddialObj: SpeedDialComponent;

this.speeddialObj.show();
```

---

### refreshPosition()
**Returns:** `void`

Refreshes the Speed Dial button's position. Call this when the `target` element is resized programmatically.

```typescript
@ViewChild('speeddial') speeddialObj: SpeedDialComponent;

this.speeddialObj.refreshPosition();
```

> The browser window resize automatically triggers a position refresh. Manual call is only needed for programmatic target resizing.

---

## Events

| Event | Argument | Trigger |
|---|---|---|
| `beforeClose` | `SpeedDialBeforeOpenCloseEventArgs` | Before popup closes |
| `beforeItemRender` | `SpeedDialItemEventArgs` | Before each item renders |
| `beforeOpen` | `SpeedDialBeforeOpenCloseEventArgs` | Before popup opens |
| `clicked` | `SpeedDialItemEventArgs` | Action item clicked |
| `created` | `Event` | Component rendered |
| `onClose` | `SpeedDialOpenCloseEventArgs` | After popup closes |
| `onOpen` | `SpeedDialOpenCloseEventArgs` | After popup opens |

```html
<button ejs-speeddial
  (clicked)="onClicked($event)"
  (created)="onCreated()"
  (beforeOpen)="onBeforeOpen($event)"
  (onOpen)="onOpen($event)"
  (beforeClose)="onBeforeClose($event)"
  (onClose)="onClose($event)"
  (beforeItemRender)="onBeforeItemRender($event)">
</button>
```

---

## SpeedDialItemModel

Fields for each item in the `items` array:

| Field | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `''` | Text label of the item |
| `iconCss` | `string` | `''` | CSS class(es) for the item icon |
| `disabled` | `boolean` | `false` | Disables the item |
| `id` | `string` | `''` | Unique identifier (available in event args) |
| `title` | `string` | `''` | Tooltip text (used as `aria-label` for screen readers) |

---

## SpeedDialAnimationSettingsModel

| Field | Type | Default | Description |
|---|---|---|---|
| `effect` | `SpeedDialAnimationEffect` | `'Fade'` | Animation effect name |
| `duration` | `number` | `400` | Duration in milliseconds |
| `delay` | `number` | `0` | Delay before animation starts (ms) |

Supported `effect` values: `'Fade'`, `'FadeZoom'`, `'FlipLeftDown'`, `'FlipLeftUp'`, `'FlipRightDown'`, `'FlipRightUp'`, `'SlideBottom'`, `'SlideLeft'`, `'SlideRight'`, `'SlideTop'`, `'Zoom'`, `'None'`

---

## RadialSettingsModel

| Field | Type | Default | Description |
|---|---|---|---|
| `direction` | `RadialDirection` | `'Auto'` | `'Clockwise'`, `'AntiClockwise'`, or `'Auto'` |
| `startAngle` | `number` | `null` | Starting angle in degrees |
| `endAngle` | `number` | `null` | Ending angle in degrees |
| `offset` | `string` | `''` | Distance from button to items (e.g. `'80px'`) |
