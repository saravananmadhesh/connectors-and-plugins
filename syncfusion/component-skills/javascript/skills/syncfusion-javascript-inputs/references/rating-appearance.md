# Appearance – Syncfusion TypeScript Rating

## Overview

Control the visual appearance of the Rating component using `itemsCount`, `disabled`, `visible`, `readOnly`, and `cssClass` properties.

---

## Items Count

Use `itemsCount` to set how many rating symbols are displayed. Default is `5`.

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3, itemsCount: 8 });
rating.appendTo('#rating');
```

---

## Disabled State

Set `disabled: true` to render the Rating non-interactive. The component is visually dimmed and ignores user interaction.

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3, disabled: true });
rating.appendTo('#rating');
```

---

## Visibility

Control whether the component is shown or hidden using `visible`:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3, visible: true });
rating.appendTo('#rating');

// Toggle visibility
document.getElementById('toggleBtn').onclick = function () {
  rating.visible = !rating.visible;
};
```

Default is `true`. When `visible: false`, the component is hidden from the page.

---

## Read-Only Mode

Set `readOnly: true` to display the rating without allowing changes. The value is visible but not interactive.

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3, readOnly: true });
rating.appendTo('#rating');
```

Use case: Display an average product rating without allowing the current user to change it.

---

## Animation

Hover animation is enabled by default (`enableAnimation: true`). Disable it for custom template scenarios where animation may conflict with the symbol design:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3, enableAnimation: false });
rating.appendTo('#rating');
```

---

## Custom CSS with cssClass

Use `cssClass` to apply scoped custom styles. The class is added to the root element.

### Change Icon Border Color

Use the `text-stroke` CSS property on `.e-rating-icon`:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3, cssClass: 'custom-border' });
rating.appendTo('#rating');
```

```css
.custom-border .e-rating-icon {
  -webkit-text-stroke: 2px #4a00b4;
}
```

### Change Rated / Unrated Fill Colors

Use `linear-gradient` with `--rating-value` CSS variable on `.e-rating-icon`:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3, cssClass: 'custom-fill' });
rating.appendTo('#rating');
```

```css
.custom-fill .e-rating-icon {
  background: linear-gradient(
    to right,
    #ffe814 calc(var(--rating-value) * 100%),
    #d8d7d4 calc(var(--rating-value) * 100%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

The first color-stop (`#ffe814`) is the rated fill color; the second (`#d8d7d4`) is the unrated fill color.

### Change Item Spacing

Use `margin` or `padding` on `.e-rating-item-container`:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3, cssClass: 'custom-spacing' });
rating.appendTo('#rating');
```

```css
.custom-spacing .e-rating-item-container {
  margin: 0 8px;
}
```

### Change the Rating Icon

Override the default star icon using the `content` property on `.e-icons.e-star-filled:before`:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3, cssClass: 'custom-icon' });
rating.appendTo('#rating');
```

```css
/* Replace star with a heart icon (EJ2 icon font) */
.custom-icon .e-icons.e-star-filled:before {
  content: '\e343'; /* EJ2 heart icon code */
}
```
