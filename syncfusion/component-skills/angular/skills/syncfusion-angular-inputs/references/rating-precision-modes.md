# Precision Modes in Angular Rating Component

Control how finely users can select rating values using the `precision` property with the `PrecisionType` enum.

## Supported Precision Types

| Type | Increment | Example values |
|------|-----------|----------------|
| `Full` (default) | 1.0 | 1, 2, 3, 4, 5 |
| `Half` | 0.5 | 2.5, 3.0, 3.5, 4.0 |
| `Quarter` | 0.25 | 3.75, 4.0, 4.25, 4.5 |
| `Exact` | 0.1 | 3.9, 4.0, 4.1, 4.2 |

---

## All Precision Types Together

```typescript
import { Component } from '@angular/core';
import { RatingModule, PrecisionType } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <label>Full Precision</label><br />
      <input ejs-rating id="rating1" [value]="3" [precision]="'Full'"/><br />

      <label>Half Precision</label><br />
      <input ejs-rating id="rating2" [value]="2.5" [precision]="'Half'"/><br />

      <label>Quarter Precision</label><br />
      <input ejs-rating id="rating3" [value]="3.75" [precision]="'Quarter'"/><br />

      <label>Exact Precision</label><br />
      <input ejs-rating id="rating4" [value]="2.3" [precision]="'Exact'"/><br />
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

---

## Full Precision (Default)

Ratings snap to whole numbers. Most common for simple star ratings.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="3" [precision]="'Full'"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

---

## Half Precision

Ratings snap to 0.5 increments. Useful for movie/product ratings where half stars are needed.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="3.5" [precision]="'Half'"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

---

## Quarter Precision

Ratings snap to 0.25 increments. Use when finer granularity than half is needed.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="3.75" [precision]="'Quarter'"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

---

## Exact Precision

Ratings snap to 0.1 increments. Use when very fine-grained ratings are required.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="2.3" [precision]="'Exact'"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

---

## Tips

- The `precision` property also accepts string values: `'Full'`, `'Half'`, `'Quarter'`, `'Exact'`.
- When using templates (`emptyTemplate`/`fullTemplate`), use the CSS variable `--rating-value` or the `value` from template context to support visual partial fills.
- Combine `[precision]="'Half'"` with `[showLabel]="true"` to display the exact decimal value (e.g., "3.5").
