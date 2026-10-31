# Labels – Syncfusion TypeScript Rating

## Overview

The Rating component can display a label showing the current value. Use `showLabel`, `labelPosition`, and `labelTemplate` to control its visibility, placement, and content.

---

## Show Label

Set `showLabel: true` to display the current rating value next to the stars:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  showLabel: true,
  value: 3
});
rating.appendTo('#rating');
```

The label is hidden by default (`showLabel: false`).

---

## Label Position

Use `labelPosition` to place the label on any side of the rating. Import the `LabelPosition` enum:

```ts
import { Rating, LabelPosition } from '@syncfusion/ej2-inputs';
```

| Value | Description |
|---|---|
| `LabelPosition.Right` | Label to the right of the stars (default) |
| `LabelPosition.Left` | Label to the left of the stars |
| `LabelPosition.Top` | Label above the stars |
| `LabelPosition.Bottom` | Label below the stars |

```ts
import { Rating, LabelPosition } from '@syncfusion/ej2-inputs';

// Left
let ratingLeft: Rating = new Rating({
  value: 3, showLabel: true, labelPosition: LabelPosition.Left
});
ratingLeft.appendTo('#rating1');

// Right (default)
let ratingRight: Rating = new Rating({
  value: 3, showLabel: true
});
ratingRight.appendTo('#rating2');

// Top
let ratingTop: Rating = new Rating({
  value: 3, showLabel: true, labelPosition: LabelPosition.Top
});
ratingTop.appendTo('#rating3');

// Bottom
let ratingBottom: Rating = new Rating({
  value: 3, showLabel: true, labelPosition: LabelPosition.Bottom
});
ratingBottom.appendTo('#rating4');
```

---

## Label Template

Use `labelTemplate` to replace the default label text with custom HTML. The current rating `value` is passed as template context.

**Using an inline script template:**

```html
<script type="text/x-jsrender" id="labelTemplate">
  <span>${value} out of 5</span>
</script>
<input id="rating" />
```

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  showLabel: true,
  labelTemplate: '#labelTemplate',
  value: 3.0
});
rating.appendTo('#rating');
```

**Using an inline HTML string as template:**

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  showLabel: true,
  labelTemplate: '<span class="custom-label">${value} ⭐</span>',
  value: 3.0
});
rating.appendTo('#rating');
```

The `value` context variable reflects the current rating value including precision.
