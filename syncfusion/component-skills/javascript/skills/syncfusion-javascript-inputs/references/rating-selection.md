# Selection – Syncfusion TypeScript Rating

## Overview

The Rating component lets users select a value by clicking or tapping on items. The selection state can be controlled via user interaction or programmatically. Key properties: `value`, `min`, `enableSingleSelection`, `allowReset`.

---

## Setting the Value

Use the `value` property to set the initial (or current) rating:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3 });
rating.appendTo('#rating');
```

Update programmatically after initialization:

```ts
rating.value = 4.5;
```

---

## Minimum Value

Use `min` to set the lowest rating a user can select. If `min` is set to `2`, the user cannot select a rating below 2.

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ min: 2 });
rating.appendTo('#rating');
```

The `min` default is `0`. The `value` range spans from `min` to `itemsCount`.

---

## Single Selection Mode

By default, all items before the selected one appear in the selected (filled) state. Set `enableSingleSelection: true` to highlight only the chosen item, leaving all others unselected.

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3,
  enableSingleSelection: true
});
rating.appendTo('#rating');
```

Useful for representing individual choices (e.g., emoji sentiment scales) rather than cumulative scales.

---

## Show / Hide Reset Button

Set `allowReset: true` to show a reset button that resets the rating to its default (minimum) value.

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3.0,
  allowReset: true
});
rating.appendTo('#rating');
```

The reset button is hidden by default (`allowReset: false`).

---

## Programmatic Reset

Call `reset()` to programmatically reset the rating value to its minimum:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ min: 2.0, value: 3.0 });
rating.appendTo('#rating');

document.getElementById('resetBtn').addEventListener('click', function () {
  rating.reset();
});
```

After `reset()`, the value returns to `min` (or `0` if `min` is not set).
