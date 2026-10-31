# Tooltip in Angular Rating Component

Display contextual tooltips when users hover over rating items.

---

## Enabling Tooltips

Set `showTooltip` to `true` to show tooltips on item hover. The default value is `true`, so tooltips are shown out of the box.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" [value]="3" [showTooltip]="true"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

To hide tooltips:

```typescript
@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="3" [showTooltip]="false"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

---

## Custom Tooltip Content (tooltipTemplate)

Use `tooltipTemplate` to replace the default tooltip with custom content. The current `value` is available in the template context.

**String template:**

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
        [showTooltip]="true"
        tooltipTemplate="<span>\${value} Star</span>"
      />
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

**Template with conditional content by value:**

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <diinput
        ejs-rating
        id="rating"
        [value]="3"
        [showTooltip]="true"
        [tooltipTemplate]="tooltipTemplate"
      /plate]="tooltipTemplate"
      ></ejs-rating>
    </div>
  `,
  standalone: true,
  imports: [RatingModule, NgIf],
})
export class AppComponent {
  tooltipTemplate(props: any) {
    const labels: { [key: number]: string } = {
      1: 'Angry',
      2: 'Sad',
      3: 'Neutral',
      4: 'Good',
      5: 'Happy',
    };
    return `<b>${labels[props.value] ?? props.value}</b>`;
  }
}
```

---

## Tooltip Appearance (cssClass)

Customize the tooltip's visual style using `cssClass` and targeting the Syncfusion tooltip CSS classes:

```typescript
@Component({
  selector: 'app-root',
  teminput
      ejs-rating
      id="rating"
      [value]="3"
      [showTooltip]="true"
      cssClass="customtooltip"
    /ustomtooltip"
    ></ejs-rating>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

```css
.customtooltip.e-tooltip-wrap {
  background-color: #333;
  border-color: #333;
  border-radius: 4px;
}
.customtooltip.e-tooltip-wrap .e-tip-content {
  color: #fff;
  font-size: 14px;
}
```

---

## Common Patterns

| Goal | Configuration |
|------|---------------|
| Show value as tooltip | `[showTooltip]="true"` (default) |
| Hide tooltips | `[showTooltip]="false"` |
| Show descriptive text | `tooltipTemplate` with value-based labels |
| Style the tooltip | `cssClass="customtooltip"` + CSS overrides |
