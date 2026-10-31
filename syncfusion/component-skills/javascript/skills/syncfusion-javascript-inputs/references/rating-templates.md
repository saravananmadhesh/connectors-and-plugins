# Templates – Syncfusion TypeScript Rating

## Overview

The Rating component supports two template properties to replace the default star icons with any custom content:

| Property | Applies to |
|---|---|
| `emptyTemplate` | Unrated (un-selected) items |
| `fullTemplate` | Rated (selected) items |

If only `emptyTemplate` is provided (no `fullTemplate`), the same template is used for both states, and you must use CSS to differentiate them.

Template context provides `value` (current rating value) and `index` (0-based item index).

---

## Empty Template (Unrated Items)

```html
<script type="text/x-jsrender" id="emptyTemplate">
  <span class='e-icons e-star-filled' style='color: lightgray;'></span>
</script>
<input id="rating" />
```

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  emptyTemplate: '#emptyTemplate',
  value: 3
});
rating.appendTo('#rating');
```

---

## Full Template (Rated Items)

When both `emptyTemplate` and `fullTemplate` are specified, `fullTemplate` renders for rated items and `emptyTemplate` for unrated items:

```html
<script type="text/x-jsrender" id="emptyTemplate">
  <span class='e-icons e-star-filled' style='color: lightgray;'></span>
</script>
<script type="text/x-jsrender" id="fullTemplate">
  <span class='e-icons e-star-filled' style='color: gold;'></span>
</script>
<input id="rating" />
```

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  fullTemplate: '#fullTemplate',
  emptyTemplate: '#emptyTemplate'
});
rating.appendTo('#rating');
```

---

## Emoji Icons as Rating Symbols

Use `emptyTemplate` with emoji characters and `enableSingleSelection: true` (optional) for a sentiment-style rating:

```html
<script type="text/x-jsrender" id="emptyTemplate">
  <span>😊</span>
</script>
<input id="rating" />
```

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  emptyTemplate: '#emptyTemplate',
  value: 4,
  enableSingleSelection: true,
  enableAnimation: false
});
rating.appendTo('#rating');
```

---

## SVG Icons as Rating Symbols

```html
<script type="text/x-jsrender" id="emptyTemplate">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
</script>
<script type="text/x-jsrender" id="fullTemplate">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="gold" stroke="gold" stroke-width="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
</script>
<input id="rating" />
```

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  emptyTemplate: '#emptyTemplate',
  fullTemplate: '#fullTemplate',
  value: 4,
  enableAnimation: false
});
rating.appendTo('#rating');
```

---

## PNG Images as Rating Symbols

```html
<script type="text/x-jsrender" id="emptyTemplate">
  <img src="empty-star.png" alt="empty star" width="24" height="24" />
</script>
<script type="text/x-jsrender" id="fullTemplate">
  <img src="full-star.png" alt="full star" width="24" height="24" />
</script>
<input id="rating" />
```

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  emptyTemplate: '#emptyTemplate',
  fullTemplate: '#fullTemplate',
  value: 4
});
rating.appendTo('#rating');
```

---

## Template Context: value and index

Both templates receive `value` (the item's threshold value) and `index` (0-based position). Use these for conditional styling:

```html
<script type="text/x-jsrender" id="emptyTemplate">
  <span style='font-size: 24px;' title='Item ${index + 1}'>${index < 3 ? '🔵' : '⚪'}</span>
</script>
```

> The CSS variable `--rating-value` is also available on the item element and reflects the current precision value, enabling partial-fill effects via CSS.
