# Events – Syncfusion TypeScript Rating

## Overview

The Rating component provides four events. Import the relevant event argument types from `@syncfusion/ej2-inputs`.

| Event | Fires when |
|---|---|
| `valueChanged` | The rating value changes |
| `beforeItemRender` | Before each rating item is rendered |
| `onItemHover` | The user hovers over a rating item |
| `created` | The component finishes rendering |

---

## valueChanged

Fires when the user selects a new rating. The `RatingChangedEventArgs` argument provides the new and previous values.

```ts
import { Rating, RatingChangedEventArgs } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3.0,
  valueChanged: (args: RatingChangedEventArgs) => {
    console.log('New value:', args.value);
    console.log('Previous value:', args.previousValue);
  }
});
rating.appendTo('#rating');
```

**RatingChangedEventArgs properties:**

| Property | Type | Description |
|---|---|---|
| `value` | `number` | The new rating value |
| `previousValue` | `number` | The rating value before the change |

---

## beforeItemRender

Fires before each rating item is rendered. Use this to conditionally modify item attributes or appearance at render time.

```ts
import { Rating, RatingItemEventArgs } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  beforeItemRender: (args: RatingItemEventArgs) => {
    // args contains details about the item being rendered
    console.log('Rendering item:', args);
  }
});
rating.appendTo('#rating');
```

**RatingItemEventArgs properties:**

| Property | Type | Description |
|---|---|---|
| `element` | `HTMLElement` | The rating item element |
| `value` | `number` | The value at this item's position |

---

## onItemHover

Fires when the user hovers the cursor over a rating item. The `RatingHoverEventArgs` argument provides the hovered item's value.

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

**RatingHoverEventArgs properties:**

| Property | Type | Description |
|---|---|---|
| `value` | `number` | The rating value at the hovered position |
| `element` | `HTMLElement` | The hovered rating item element |
| `event` | `MouseEvent` | The native mouse event |

---

## created

Fires once after the Rating component has finished rendering. Use it for post-render initialization.

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  created: () => {
    console.log('Rating component rendered');
  }
});
rating.appendTo('#rating');
```

---

## Combining Multiple Events

```ts
import { Rating, RatingChangedEventArgs, RatingHoverEventArgs, RatingItemEventArgs } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3.0,
  allowReset: true,
  created: () => {
    console.log('Ready');
  },
  beforeItemRender: (args: RatingItemEventArgs) => {
    // Custom render logic
  },
  onItemHover: (args: RatingHoverEventArgs) => {
    document.getElementById('preview').textContent = `Hovering: ${args.value}`;
  },
  valueChanged: (args: RatingChangedEventArgs) => {
    document.getElementById('result').textContent = `Selected: ${args.value}`;
  }
});
rating.appendTo('#rating');
```
