# Events in Angular Rating Component

## Table of Contents
- [beforeItemRender](#beforeitemrender)
- [created](#created)
- [onItemHover](#onitemhover)
- [valueChanged](#valuechanged)
- [Event Arguments Reference](#event-arguments-reference)

---

## beforeItemRender

Fires before each rating item is rendered. Use it to customize or inspect items before they appear.

```typescript
import { Component } from '@angular/core';
import { RatingModule, RatingItemEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input
        ejs-rating
        id="rating"
        (beforeItemRender)="beforeItemRender($event)"
      />
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  beforeItemRender(args: RatingItemEventArgs) {
    // args.element — the item DOM element
    // args.value   — the value of this item
    // args.index   — the zero-based index of this item
  }
}
```

- Called once per item during initial render and on re-render.
- Useful for conditionally applying classes or attributes to specific items.

---

## created

Fires after the rating component has fully rendered.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" (created)="onCreated()"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  onCreated() {
    console.log('Rating component is ready');
  }
}
```

- Use for post-render initialization logic.
- The event receives a standard DOM `Event` object.

---

## onItemHover

Fires when the user hovers over a rating item. Provides the hovered item's details.

```typescript
import { Component } from '@angular/core';
import { RatingModule, RatingHoverEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" (onItemHover)="onItemHover($event)"/>
      <p *ngIf="hovered !== null">Hovering over: {{ hovered }}</p>
    </div>
  `,
  standalone: true,
  imports: [RatingModule, NgIf],
})
export class AppComponent {
  hovered: number | null = null;

  onItemHover(args: RatingHoverEventArgs) {
    this.hovered = args.value;
    // args.value   — the value of the hovered item
    // args.element — the hovered item DOM element
  }
}
```

- Useful for live previews: show a label or description as the user moves their cursor.

---

## valueChanged

Fires when the user selects a new rating value. Provides both the previous and new values.

```typescript
import { Component } from '@angular/core';
import { RatingModule, RatingChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" (valueChanged)="onValueChanged($event)"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  onValueChanged(args: RatingChangedEventArgs) {
    console.log('Previous:', args.previousValue);
    console.log('New value:', args.value);
  }
}
```

**Practical example — display previous and new values:**

```typescript
import { Component } from '@angular/core';
import { RatingModule, RatingChangedEventArgs } from '@syncfusion/ej2-angular-inputs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" (valueChanged)="onValueChanged($event)"/>
      <p>{{ info }}</p>
    </div>
  `,
  standalone: true,
  imports: [RatingModule, NgIf],
})
export class AppComponent {
  info: string = '';

  onValueChanged(args: RatingChangedEventArgs) {
    this.info = `Changed from ${args.previousValue} to ${args.value}`;
  }
}
```

---

## Event Arguments Reference

### RatingItemEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | The rating item DOM element |
| `value` | `number` | The value of the item |
| `index` | `number` | Zero-based item index |

### RatingHoverEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | The hovered item DOM element |
| `value` | `number` | The value of the hovered item |

### RatingChangedEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `value` | `number` | The newly selected rating value |
| `previousValue` | `number` | The previously selected rating value |

---

## Event Import Reference

```typescript
import {
  RatingModule,
  RatingItemEventArgs,
  RatingHoverEventArgs,
  RatingChangedEventArgs,
} from '@syncfusion/ej2-angular-inputs';
```
