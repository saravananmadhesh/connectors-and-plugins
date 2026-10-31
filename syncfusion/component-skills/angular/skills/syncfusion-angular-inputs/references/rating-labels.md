# Labels in Angular Rating Component

Show the current rating value as a label and control its position and format.

---

## Showing the Label

Set `showLabel` to `true` to display a label showing the current rating value.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" [value]="3" [showLabel]="true"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

- Default is `false` (label hidden).
- By default the label appears to the **Right** of the rating.

---

## Label Position

Use `labelPosition` to control where the label appears. Import the `LabelPosition` enum for type safety.

**Supported positions:** `Top`, `Bottom`, `Left`, `Right`

```typescript
import { Component } from '@angular/core';
import { RatingModule, LabelPosition } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <label>Left</label><br />
      <input ejs-rating id="rating1" [value]="3" [showLabel]="true" [labelPosition]="'Left'"/><br />

      <label>Right</label><br />
      <input ejs-rating id="rating2" [value]="3" [showLabel]="true" [labelPosition]="'Right'"/><br />

      <label>Top</label><br />
      <input ejs-rating id="rating3" [value]="3" [showLabel]="true" [labelPosition]="'Top'"/><br />

      <label>Bottom</label><br />
      <input ejs-rating id="rating4" [value]="3" [showLabel]="true" [labelPosition]="'Bottom'"/><br />
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

You can also use the `LabelPosition` enum: `[labelPosition]="LabelPosition.Left"`, etc.

---

## Label Template

Use `labelTemplate` to display custom content in the label. The current `value` is available in the template context.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input
        ejs-rating
        id="rating"
        [value]="3"
        [showLabel]="true"
        labelTemplate="<span>\${value} out of 5</span>"
      />
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

- Template string uses `${value}` to inject the current rating value.
- The label updates dynamically as the user changes the rating.

---

## Common Patterns

| Goal | Configuration |
|------|---------------|
| Show numeric value | `[showLabel]="true"` |
| Label above the rating | `[labelPosition]="'Top'"` |
| Label below the rating | `[labelPosition]="'Bottom'"` |
| Show "X out of 5" | `labelTemplate="<span>${value} out of 5</span>"` |
| Show descriptive text | Custom `labelTemplate` with conditional logic |
