# Selection in Angular Rating Component

## Table of Contents
- [Basic Value Selection](#basic-value-selection)
- [Minimum Value](#minimum-value)
- [Single Selection Mode](#single-selection-mode)
- [Reset Button](#reset-button)
- [Programmatic Reset](#programmatic-reset)

---

## Basic Value Selection

Set the current rating value using the `value` property. The value is a decimal number ranging from `min` to `itemsCount`.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" [value]="3"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

- Default `value` is `0.0` (no selection).
- The selected items are highlighted up to the chosen value.

---

## Minimum Value

Use the `min` property to set the minimum selectable rating. Users cannot rate below this value.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <!-- Users can only select 2 or higher -->
      <input ejs-rating id="rating" [min]="2"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

- Default `min` is `0.0`.
- The reset button resets to the `min` value (not necessarily 0).

---

## Single Selection Mode

Enable `enableSingleSelection` to highlight only the clicked item rather than all items up to it.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" [value]="3" [enableSingleSelection]="true"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

- Default is `false` — items fill from the first item to the selected item.
- When `true`, only the clicked item is highlighted; all others are unselected.
- Useful for discrete emotion/mood pickers (e.g., emoji templates).

---

## Reset Button

Show a reset button by setting `allowReset={true}`. Clicking it resets the rating to its `min` value.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" [value]="3" [allowReset]="true"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

- Default is `false` (reset button hidden).
- The reset button has `role="button"` and `aria-hidden` for accessibility.
- Keyboard: press `Space` when the reset button is focused to reset.

---

## Programmatic Reset

Use the `reset()` method via a template reference variable to reset the rating programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { RatingModule, RatingComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating #rating id="rating" [min]="1" [value]="3"/>
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

- `reset()` sets the value back to `min` (default `0`).
- Use `[min]="1"` if you want the reset to land on 1 instead of 0.

---

## Common Use Cases

| Scenario | Configuration |
|----------|---------------|
| Simple 1-5 star rating | `[value]="3"` |
| Rating that can't go below 1 | `[min]="1"` |
| Emotion picker (single icon highlight) | `[enableSingleSelection]="true"` |
| Clearable rating | `[allowReset]="true"` |
| Reset via button click | `@ViewChild('rating') ratingRef!: RatingComponent;` → `this.ratingRef.reset()` |
