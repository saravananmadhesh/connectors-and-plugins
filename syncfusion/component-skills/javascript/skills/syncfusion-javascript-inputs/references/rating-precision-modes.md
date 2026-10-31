# Precision Modes – Syncfusion TypeScript Rating

## Overview

The `precision` property controls the granularity of values a user can select. Import the `PrecisionType` enum alongside `Rating` to use named constants.

```ts
import { Rating, PrecisionType } from '@syncfusion/ej2-inputs';
```

---

## Precision Types

| Type | Enum Value | Increment | Example values |
|---|---|---|---|
| Full | `PrecisionType.Full` | 1.0 | 1, 2, 3, 4, 5 |
| Half | `PrecisionType.Half` | 0.5 | 1, 1.5, 2, 2.5, 3 |
| Quarter | `PrecisionType.Quarter` | 0.25 | 1, 1.25, 1.5, 1.75, 2 |
| Exact | `PrecisionType.Exact` | 0.1 | 1, 1.1, 1.2, … |

The default is `PrecisionType.Full`.

---

## Full Precision (Default)

```ts
import { Rating, PrecisionType } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3,
  precision: PrecisionType.Full
});
rating.appendTo('#rating');
```

---

## Half Precision

```ts
import { Rating, PrecisionType } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 2.5,
  precision: PrecisionType.Half
});
rating.appendTo('#rating');
```

Each item is split into two halves. Hovering over the left half selects `.5`, the right half selects the full item.

---

## Quarter Precision

```ts
import { Rating, PrecisionType } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3.75,
  precision: PrecisionType.Quarter
});
rating.appendTo('#rating');
```

Each item is split into four sections for 0.25-step selections.

---

## Exact Precision

```ts
import { Rating, PrecisionType } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 2.3,
  precision: PrecisionType.Exact
});
rating.appendTo('#rating');
```

The cursor's exact horizontal position within an item determines the selected value at 0.1 increments.

---

## Multiple Precision Variants Side by Side

```ts
import { Rating, PrecisionType } from '@syncfusion/ej2-inputs';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let fullRating: Rating = new Rating({ value: 3, precision: PrecisionType.Full });
let halfRating: Rating = new Rating({ value: 2.5, precision: PrecisionType.Half });
let quarterRating: Rating = new Rating({ value: 3.75, precision: PrecisionType.Quarter });
let exactRating: Rating = new Rating({ value: 2.3, precision: PrecisionType.Exact });

fullRating.appendTo('#rating1');
halfRating.appendTo('#rating2');
quarterRating.appendTo('#rating3');
exactRating.appendTo('#rating4');
```

---

## Using Precision with Templates

When using `emptyTemplate` / `fullTemplate`, the CSS variable `--rating-value` is available on each item element and reflects the current precision value, enabling custom partial-fill visuals:

```css
.e-rating-item-container {
  background: linear-gradient(
    to right,
    gold calc(var(--rating-value) * 100%),
    lightgray calc(var(--rating-value) * 100%)
  );
}
```
