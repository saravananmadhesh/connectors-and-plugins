# Tooltip – Syncfusion TypeScript Rating

## Overview

The Rating component shows tooltips on each item when the user hovers. Tooltips are enabled by default. Use `showTooltip`, `tooltipTemplate`, and `cssClass` to control tooltip behavior and appearance.

---

## Show / Hide Tooltip

Tooltip is enabled by default (`showTooltip: true`). Disable it by setting `showTooltip: false`:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

// Explicitly enabled (default)
let rating: Rating = new Rating({ showTooltip: true, value: 3 });
rating.appendTo('#rating');
```

```ts
// Disabled tooltip
let rating: Rating = new Rating({ showTooltip: false, value: 3 });
rating.appendTo('#rating');
```

---

## Tooltip Template

Use `tooltipTemplate` to replace the default tooltip content with custom HTML. The current `value` at the hovered position is passed as template context.

**Using an inline script template:**

```html
<script type="text/x-jsrender" id="tooltipTemplate">
  <span>${value} Star</span>
</script>
<input id="rating" />
```

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  tooltipTemplate: '#tooltipTemplate',
  value: 3.0
});
rating.appendTo('#rating');
```

**Using an inline HTML string:**

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  showTooltip: true,
  tooltipTemplate: '<span>${value} Star</span>',
  value: 3.0
});
rating.appendTo('#rating');
```

---

## Tooltip Appearance Customization

Use `cssClass` to apply a custom class and override tooltip styles:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  cssClass: 'customtooltip',
  showTooltip: true,
  value: 3
});
rating.appendTo('#rating');
```

```css
/* Customize tooltip background and font */
.customtooltip.e-tooltip-wrap .e-tip-content {
  background-color: #4a00b4;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  padding: 4px 10px;
}
.customtooltip.e-tooltip-wrap .e-arrow-tip-outer {
  border-top-color: #4a00b4;
}
```

> The `cssClass` is added to the root element and propagates to the tooltip popup, so you can scope CSS overrides using this class without affecting other tooltips on the page.
