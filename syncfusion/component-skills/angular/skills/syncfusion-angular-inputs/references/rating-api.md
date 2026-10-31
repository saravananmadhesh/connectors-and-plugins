# API Reference — Syncfusion Angular Rating Component

**Source:** https://ej2.syncfusion.com/angular/documentation/api/rating/index-default

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Enums](#enums)
- [Event Argument Interfaces](#event-argument-interfaces)

---

## Import

```typescript
import {
  RatingModule,
  RatingComponent,
  PrecisionType,
  LabelPosition,
  RatingItemEventArgs,
  RatingHoverEventArgs,
  RatingChangedEventArgs,
} from '@syncfusion/ej2-angular-inputs';
```

---

## Properties

### allowReset
**Type:** `boolean` | **Default:** `false`

Shows or hides the reset button. When `true`, the user can click the reset button to restore the rating to its minimum value.

```html
<input ejs-rating id="rating" [allowReset]="true" [value]="3"></ejs-rating>
```

---

### cssClass
**Type:** `string` | **Default:** `''`

One or more CSS classes to customize the component's appearance (colors, fonts, sizes, icon shapes, etc.).

```html
<input ejs-rating id="rating" [value]="3" cssClass="my-custom-rating"></ejs-rating>
```

---

### disabled
**Type:** `boolean` | **Default:** `false`

Disables the component. When `true`, the user cannot interact with the rating, and the component may appear dimmed.

```html
<input ejs-rating id="rating" [value]="3" [disabled]="true"></ejs-rating>
```

---

### emptyTemplate
**Type:** `string | function | Template` | **Default:** `''`

Template for the appearance of each **unrated** item. If `fullTemplate` is not defined, this template is used for both rated and unrated items.

```typescript
@Component({
  template: `<input ejs-rating id="rating" [value]="3" [emptyTemplate]="emptyTemplate"></ejs-rating>`,
})
export class AppComponent {
  emptyTemplate() {
    return `<span class="custom-icon"></span>`;
  }
}
```

---

### enableAnimation
**Type:** `boolean` | **Default:** `true`

When `true`, a hover animation is shown when the user moves their cursor over rating items.

```html
<input ejs-rating id="rating" [value]="3" [enableAnimation]="false"></ejs-rating>
```

---

### enablePersistence
**Type:** `boolean` | **Default:** `false`

When `true`, the component's state (current value) is persisted across page reloads via browser local storage.

```html
<input ejs-rating id="rating" [value]="3" [enablePersistence]="true"></ejs-rating>
```

---

### enableRtl
**Type:** `boolean` | **Default:** `false`

Renders the component in right-to-left direction. Arrow Left increases the value, Arrow Right decreases it.

```html
<input ejs-rating id="rating" [value]="3" [enableRtl]="true"></ejs-rating>
```

---

### enableSingleSelection
**Type:** `boolean` | **Default:** `false`

When `true`, only the clicked item is highlighted. When `false` (default), all items from the first to the selected item are highlighted.

```html
<input ejs-rating id="rating" [value]="3" [enableSingleSelection]="true"></ejs-rating>
```

---

### fullTemplate
**Type:** `string | function | Template` | **Default:** `''`

Template for the appearance of each **rated** item.

```typescript
@Component({
  template: `<input ejs-rating id="rating" [value]="3" [fullTemplate]="fullTemplate"></ejs-rating>`,
})
export class AppComponent {
  fullTemplate() {
    return `<span class="filled-icon"></span>`;
  }
}
```

---

### itemsCount
**Type:** `number` | **Default:** `5`

The number of rating items (symbols) to display.

```html
<input ejs-rating id="rating" [itemsCount]="10" [value]="7"></ejs-rating>
```

---

### labelPosition
**Type:** `string | LabelPosition` | **Default:** `LabelPosition.Right`

Position of the value label relative to the rating. Requires `showLabel={true}`.

**Possible values:** `'Top'`, `'Bottom'`, `'Left'`, `'Right'`

```html
<input ejs-rating id="rating" [value]="3" [showLabel]="true" [labelPosition]="'Top'"></ejs-rating>
```

---

### labelTemplate
**Type:** `string | function | Template` | **Default:** `''`

Custom template for the label. The current `value` is available in the template context.

```html
<input ejs-rating
  id="rating"
  [value]="3"
  [showLabel]="true"
  labelTemplate="<span>${value} out of 5</span>"
></ejs-rating>
```

---

### locale
**Type:** `string` | **Default:** `''`

Overrides the global culture/localization. Default is `'en-US'`.

```html
<input ejs-rating id="rating" [value]="3" locale="fr-FR"></ejs-rating>
```

---

### min
**Type:** `number` | **Default:** `0.0`

The minimum selectable rating value. Users cannot select a value below this.

```html
<input ejs-rating id="rating" [min]="1"></ejs-rating>
```

---

### precision
**Type:** `string | PrecisionType` | **Default:** `PrecisionType.Full`

Controls the granularity of the rating value.

**Possible values:** `'Full'`, `'Half'`, `'Quarter'`, `'Exact'`

```html
<input ejs-rating id="rating" [value]="2.5" [precision]="'Half'"></ejs-rating>
```

---

### readOnly
**Type:** `boolean` | **Default:** `false`

When `true`, the component is non-interactive (user cannot change the value) but remains visible and focusable.

```html
<input ejs-rating id="rating" [value]="4" [readOnly]="true"></ejs-rating>
```

---

### showLabel
**Type:** `boolean` | **Default:** `false`

When `true`, displays a label showing the current rating value.

```html
<input ejs-rating id="rating" [value]="3" [showLabel]="true"></ejs-rating>
```

---

### showTooltip
**Type:** `boolean` | **Default:** `true`

When `true`, shows a tooltip when the user hovers over a rating item.

```html
<input ejs-rating id="rating" [value]="3" [showTooltip]="false"></ejs-rating>
```

---

### tooltipTemplate
**Type:** `string | function | Template` | **Default:** `''`

Custom template for tooltip content. The current `value` is available in the template context.

```html
<input ejs-rating
  id="rating"
  [value]="3"
  [showTooltip]="true"
  tooltipTemplate="<span>${value} Star</span>"
></ejs-rating>
```

---

### value
**Type:** `number` | **Default:** `0.0`

The current rating value. Ranges from `min` to `itemsCount`. Supports decimals based on `precision`.

```html
<input ejs-rating id="rating" [value]="3.5"></ejs-rating>
```

---

### visible
**Type:** `boolean` | **Default:** `true`

Controls component visibility. When `false`, the component is hidden.

```html
<input ejs-rating id="rating" [value]="3" [visible]="true"></ejs-rating>
```

---

## Methods

### destroy()
**Returns:** `void`

Destroys the Rating component instance and cleans up DOM elements and event listeners.

```typescript
@ViewChild('rating') ratingRef!: RatingComponent;

destroyRating() {
  this.ratingRef.destroy();
}
```

---

### reset()
**Returns:** `void`

Resets the rating value to the `min` value.

```typescript
import { Component, ViewChild } from '@angular/core';
import { RatingModule, RatingComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <input ejs-rating #rating id="rating" [min]="1" [value]="3"></ejs-rating>
      <button (click)="handleReset()">Reset</button>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  @ViewChild('rating') ratingRef!: RatingComponent;

  handleReset() {
    this.ratingRef.reset();
  }
}
```

---

## Events

### beforeItemRender
**Type:** `EventEmitter<RatingItemEventArgs>`

Raised before rendering each rating item. Use to customize items at render time.

```html
<input ejs-rating id="rating" (beforeItemRender)="beforeItemRender($event)"></ejs-rating>
```

---

### created
**Type:** `EventEmitter<Event>`

Raised after the rating component has fully rendered.

```html
<input ejs-rating id="rating" (created)="onCreated()"></ejs-rating>
```

---

### onItemHover
**Type:** `EventEmitter<RatingHoverEventArgs>`

Raised when the user hovers over a rating item.

```html
<input ejs-rating id="rating" (onItemHover)="onItemHover($event)"></ejs-rating>
```

---

### valueChanged
**Type:** `EventEmitter<RatingChangedEventArgs>`

Raised when the selected rating value changes.

```html
<input ejs-rating id="rating" (valueChanged)="onValueChanged($event)"></ejs-rating>
```

---

## Enums

### PrecisionType

```typescript
import { PrecisionType } from '@syncfusion/ej2-angular-inputs';
```

| Value | Increment | Description |
|-------|-----------|-------------|
| `PrecisionType.Full` | 1.0 | Whole number increments (default) |
| `PrecisionType.Half` | 0.5 | Half increments |
| `PrecisionType.Quarter` | 0.25 | Quarter increments |
| `PrecisionType.Exact` | 0.1 | Tenth increments |

---

### LabelPosition

```typescript
import { LabelPosition } from '@syncfusion/ej2-angular-inputs';
```

| Value | Description |
|-------|-------------|
| `LabelPosition.Top` | Label above the rating |
| `LabelPosition.Bottom` | Label below the rating |
| `LabelPosition.Left` | Label to the left of the rating |
| `LabelPosition.Right` | Label to the right of the rating (default) |

---

## Event Argument Interfaces

### RatingItemEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | The rating item's DOM element |
| `value` | `number` | The value of the item |
| `index` | `number` | Zero-based index of the item |

### RatingHoverEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | The hovered item's DOM element |
| `value` | `number` | The value of the hovered item |

### RatingChangedEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `value` | `number` | The newly selected rating value |
| `previousValue` | `number` | The previously selected rating value |
