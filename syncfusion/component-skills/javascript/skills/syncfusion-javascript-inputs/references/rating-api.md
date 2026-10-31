# API Reference – Syncfusion TypeScript Rating

## Table of Contents

1. [Properties](#properties)
2. [Methods](#methods)
3. [Events](#events)
4. [Event Argument Types](#event-argument-types)

---

## Properties

### allowReset

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Shows or hides the reset button. When `true`, a reset button is visible allowing the user to reset the value to its default (minimum).

```ts
let rating: Rating = new Rating({ value: 3.0, allowReset: true });
rating.appendTo('#rating');
```

---

### cssClass

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `''` |

One or more CSS class names added to the root element. Used to scope custom styles for colors, fonts, icon overrides, item spacing, and tooltip appearance.

```ts
let rating: Rating = new Rating({ value: 3, cssClass: 'custom-fill' });
rating.appendTo('#rating');
```

---

### disabled

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Disables the Rating component when `true`. The user cannot interact with it and it appears visually dimmed.

```ts
let rating: Rating = new Rating({ value: 3, disabled: true });
rating.appendTo('#rating');
```

---

### emptyTemplate

| Detail | Value |
|---|---|
| Type | `string \| Function` |
| Default | `''` |

Template that defines the appearance of each **unrated** item. Template context provides `value` and `index`. If `fullTemplate` is not defined, this template is used for both states.

```ts
let rating: Rating = new Rating({
  emptyTemplate: '<span class="e-icons e-star-filled" style="color:lightgray"></span>',
  value: 3
});
rating.appendTo('#rating');
```

---

### enableAnimation

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `true` |

Adds hover animation to rating items when `true`. Disable for custom templates where animation may not apply.

```ts
let rating: Rating = new Rating({ value: 3, enableAnimation: false });
rating.appendTo('#rating');
```

---

### enablePersistence

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Persists the component's `value` in browser `localStorage` between page reloads when `true`.

```ts
let rating: Rating = new Rating({ value: 3, enablePersistence: true });
rating.appendTo('#rating');
```

---

### enableRtl

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Enables right-to-left rendering when `true`. Arrow key behavior is reversed in RTL mode.

```ts
let rating: Rating = new Rating({ value: 3, enableRtl: true });
rating.appendTo('#rating');
```

---

### enableSingleSelection

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

When `true`, only the selected item is in the selected state; all other items are unselected. When `false` (default), all items before the selected one appear selected.

```ts
let rating: Rating = new Rating({ value: 3, enableSingleSelection: true });
rating.appendTo('#rating');
```

---

### fullTemplate

| Detail | Value |
|---|---|
| Type | `string \| Function` |
| Default | `''` |

Template that defines the appearance of each **rated** item. Works in conjunction with `emptyTemplate`. Template context provides `value` and `index`.

```ts
let rating: Rating = new Rating({
  emptyTemplate: '<span class="e-icons e-star-filled" style="color:lightgray"></span>',
  fullTemplate: '<span class="e-icons e-star-filled" style="color:gold"></span>'
});
rating.appendTo('#rating');
```

---

### itemsCount

| Detail | Value |
|---|---|
| Type | `number` |
| Default | `5` |

Number of rating items (symbols) displayed.

```ts
let rating: Rating = new Rating({ value: 3, itemsCount: 10 });
rating.appendTo('#rating');
```

---

### labelPosition

| Detail | Value |
|---|---|
| Type | `string \| LabelPosition` |
| Default | `LabelPosition.Right` |

Position of the label relative to the rating items. Possible values: `LabelPosition.Top`, `LabelPosition.Bottom`, `LabelPosition.Left`, `LabelPosition.Right`.

```ts
import { Rating, LabelPosition } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3,
  showLabel: true,
  labelPosition: LabelPosition.Top
});
rating.appendTo('#rating');
```

---

### labelTemplate

| Detail | Value |
|---|---|
| Type | `string \| Function` |
| Default | `''` |

Custom template for the label. The current `value` is passed as template context.

```ts
let rating: Rating = new Rating({
  showLabel: true,
  labelTemplate: '<span>${value} out of 5</span>',
  value: 3.0
});
rating.appendTo('#rating');
```

---

### locale

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `''` |

Locale code for internationalization (e.g., `'de'`, `'ar'`). Overrides the global culture setting.

```ts
let rating: Rating = new Rating({ value: 3, locale: 'de' });
rating.appendTo('#rating');
```

---

### min

| Detail | Value |
|---|---|
| Type | `number` |
| Default | `0.0` |

Minimum rating value the user can select. Values below `min` cannot be chosen.

```ts
let rating: Rating = new Rating({ min: 2 });
rating.appendTo('#rating');
```

---

### precision

| Detail | Value |
|---|---|
| Type | `string \| PrecisionType` |
| Default | `PrecisionType.Full` |

Controls the granularity of selectable values. Options: `PrecisionType.Full` (1.0), `PrecisionType.Half` (0.5), `PrecisionType.Quarter` (0.25), `PrecisionType.Exact` (0.1).

```ts
import { Rating, PrecisionType } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 2.5, precision: PrecisionType.Half });
rating.appendTo('#rating');
```

---

### readOnly

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Makes the Rating non-interactive when `true`. The value is displayed but the user cannot change it.

```ts
let rating: Rating = new Rating({ value: 3, readOnly: true });
rating.appendTo('#rating');
```

---

### showLabel

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Displays a label showing the current rating value when `true`.

```ts
let rating: Rating = new Rating({ showLabel: true, value: 3 });
rating.appendTo('#rating');
```

---

### showTooltip

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `true` |

Shows a tooltip on each item when hovering when `true`. Enabled by default.

```ts
let rating: Rating = new Rating({ showTooltip: false, value: 3 });
rating.appendTo('#rating');
```

---

### tooltipTemplate

| Detail | Value |
|---|---|
| Type | `string \| Function` |
| Default | `''` |

Custom template for the tooltip content. The current `value` at the hovered item is passed as template context.

```ts
let rating: Rating = new Rating({
  tooltipTemplate: '<span>${value} Star</span>',
  value: 3.0
});
rating.appendTo('#rating');
```

---

### value

| Detail | Value |
|---|---|
| Type | `number` |
| Default | `0.0` |

The current rating value. Ranges from `min` to `itemsCount`. Supports decimal values based on `precision`.

```ts
let rating: Rating = new Rating({ value: 3.0 });
rating.appendTo('#rating');

// Update programmatically
rating.value = 4.5;
```

---

### visible

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `true` |

Controls the visibility of the Rating component. When `false`, the component is hidden.

```ts
let rating: Rating = new Rating({ value: 3, visible: true });
rating.appendTo('#rating');

// Hide the component
rating.visible = false;
```

---

## Methods

### appendTo(selector?)

Mounts the Rating component into the target DOM element.

```ts
rating.appendTo('#rating');
```

---

### dataBind()

Forces the component to apply all pending property changes immediately to the DOM.

```ts
rating.value = 4;
rating.dataBind();
```

---

### destroy()

Destroys the Rating instance and removes it from the DOM, cleaning up all event listeners and internal state.

```ts
rating.destroy();
```

---

### getRootElement()

Returns the root HTMLElement of the Rating component (the wrapper, not the original `<input>`).

```ts
const rootEl: HTMLElement = rating.getRootElement();
```

---

### refresh()

Re-renders the component and applies all pending property changes.

```ts
rating.refresh();
```

---

### reset()

Resets the rating value to the `min` value (or `0` if `min` is not set).

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ min: 2.0, value: 3.0 });
rating.appendTo('#rating');

document.getElementById('resetBtn').addEventListener('click', () => {
  rating.reset();
});
```

---

### addEventListener(eventName, handler)

Attaches an event handler programmatically.

| Parameter | Type | Description |
|---|---|---|
| `eventName` | `string` | Name of the event |
| `handler` | `Function` | Handler function |

```ts
rating.addEventListener('valueChanged', (args) => {
  console.log('Value:', args.value);
});
```

---

### removeEventListener(eventName, handler)

Removes a previously attached event handler.

| Parameter | Type | Description |
|---|---|---|
| `eventName` | `string` | Name of the event to remove |
| `handler` | `Function` | The specific handler function to remove |

```ts
function onChange(args) { console.log(args.value); }
rating.addEventListener('valueChanged', onChange);
// Later:
rating.removeEventListener('valueChanged', onChange);
```

---

## Events

### valueChanged

Fires when the rating value is changed by the user.

```ts
import { Rating, RatingChangedEventArgs } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3.0,
  valueChanged: (args: RatingChangedEventArgs) => {
    console.log('New:', args.value, '| Previous:', args.previousValue);
  }
});
rating.appendTo('#rating');
```

---

### beforeItemRender

Fires before each rating item is rendered. Use to modify item appearance at render time.

```ts
import { Rating, RatingItemEventArgs } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  beforeItemRender: (args: RatingItemEventArgs) => {
    console.log('Rendering item at value:', args.value);
  }
});
rating.appendTo('#rating');
```

---

### onItemHover

Fires when the user hovers over a rating item.

```ts
import { Rating, RatingHoverEventArgs } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3.0,
  onItemHover: (args: RatingHoverEventArgs) => {
    console.log('Hovered value:', args.value);
  }
});
rating.appendTo('#rating');
```

---

### created

Fires after the Rating component is fully rendered.

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  created: () => {
    console.log('Rating rendered');
  }
});
rating.appendTo('#rating');
```

---

## Event Argument Types

### RatingChangedEventArgs

| Property | Type | Description |
|---|---|---|
| `value` | `number` | The new rating value after the change |
| `previousValue` | `number` | The rating value before the change |

---

### RatingItemEventArgs

| Property | Type | Description |
|---|---|---|
| `element` | `HTMLElement` | The rating item DOM element |
| `value` | `number` | The value associated with this item's position |

---

### RatingHoverEventArgs

| Property | Type | Description |
|---|---|---|
| `value` | `number` | The rating value at the hovered position |
| `element` | `HTMLElement` | The hovered rating item element |
| `event` | `MouseEvent` | The native mouse event |
