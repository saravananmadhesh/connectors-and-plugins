# Templates in Angular Rating Component

## Table of Contents
- [Overview](#overview)
- [Empty Template (Unrated Items)](#empty-template-unrated-items)
- [Full Template (Rated Items)](#full-template-rated-items)
- [Emoji Rating Symbols](#emoji-rating-symbols)
- [SVG Icon Rating Symbols](#svg-icon-rating-symbols)
- [PNG Image Rating Symbols](#png-image-rating-symbols)
- [Precision Support in Templates](#precision-support-in-templates)

---

## Overview

The Rating component supports two template directives:

| Template | Purpose |
|----------|---------|
| `emptyTemplate` | Appearance of **unrated** items |
| `fullTemplate` | Appearance of **rated** items |

If only `emptyTemplate` is provided, it is used for both rated and unrated items — apply CSS to differentiate states.

Templates receive context with `value` (current item value) and `index` (0-based item position).

---

## Empty Template (Unrated Items)

Customize unrated item appearance using `emptyTemplate`:

```typescript
import { Component, NgModule } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating
        id="rating"
        [value]="3"
        [emptyTemplate]="emptyTemplate"
      ></ejs-rating>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  emptyTemplate() {
    return `<span class="custom-font sf-rating-heart"></span>`;
  }
}
```

---

## Full Template (Rated Items)

Provide both `emptyTemplate` and `fullTemplate` to control rated and unrated items independently:

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating
        id="rating"
        [value]="3"
        [emptyTemplate]="emptyTemplate"
        [fullTemplate]="fullTemplate"
      ></ejs-rating>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  emptyTemplate() {
    return `<span class="custom-font sf-icon-empty-star"></span>`;
  }

  fullTemplate() {
    return `<span class="custom-font sf-icon-fill-star"></span>`;
  }
}
```

---

## Emoji Rating Symbols

Use emojis as rating symbols. Access the `index` from template context to return different emojis per position. Enable `enableSingleSelection` for discrete emoji selection and disable `enableAnimation` to prevent animation conflicts:

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating
        id="rating"
        [value]="3"
        [emptyTemplate]="emptyTemplate"
        [enableSingleSelection]="true"
        [enableAnimation]="false"
      ></ejs-rating>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  emojis = ['😡', '🙁', '😐', '🙂', '😀'];
  classes = ['angry', 'disagree', 'neutral', 'agree', 'happy'];

  emptyTemplate(props: any) {
    const index = props.index || 0;
    return `<span class="${this.classes[index]} emoji">${this.emojis[index]}</span>`;
  }
}
```

---

## SVG Icon Rating Symbols

Use SVG elements as rating symbols. Access `index` in the template to create unique gradient IDs per item:

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating
        id="rating"
        [value]="4"
        [emptyTemplate]="emptyTemplate"
        [fullTemplate]="fullTemplate"
        [enableAnimation]="false"
      ></ejs-rating>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  emptyTemplate() {
    return `
      <svg width="35" height="25" class="e-rating-svg-icon">
        <rect width="35" height="25" fill="transparent" stroke-width="2" stroke="rgb(173,181,189)" />
      </svg>
    `;
  }

  fullTemplate(props: any) {
    const index = props.index || 0;
    return `
      <svg width="35" height="25" class="e-rating-svg-icon">
        <defs>
          <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop class="start" offset="0%" />
            <stop class="end" offset="100%" />
          </linearGradient>
        </defs>
        <rect width="35" height="25" fill="url(#grad${index})" stroke-width="2" stroke="rgb(173,181,189)" />
      </svg>
    `;
  }
}
```

---

## PNG Image Rating Symbols

Use PNG images as rating symbols:

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating
        id="rating"
        [value]="4"
        [emptyTemplate]="emptyTemplate"
        [fullTemplate]="fullTemplate"
      ></ejs-rating>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  emptyTemplate() {
    return `
      <img
        src="/images/star-empty.png"
        width="25"
        height="25"
        alt="empty star"
      />
    `;
  }

  fullTemplate() {
    return `
      <img
        src="/images/star-filled.png"
        width="25"
        height="25"
        alt="filled star"
      />
    `;
  }
}
```

---

## Precision Support in Templates

When using templates with precision modes (half, quarter, exact), use the CSS variable `--rating-value` or the `value` from the template context to apply partial fills:

```css
/* Apply partial fill based on item value */
.e-rating-item-container {
  --rating-value: 0; /* set by the component per item */
}

.my-template-icon {
  background: linear-gradient(
    to right,
    gold calc(var(--rating-value) * 100%),
    lightgray calc(var(--rating-value) * 100%)
  );
}
```

> The `value` in the template context represents how much of that specific item should be "filled" (0 to 1), which enables partial fill rendering for fractional ratings.

---

## Tips

- Use `[enableAnimation]="false"` with emoji or image templates to avoid visual glitches.
- Use `[enableSingleSelection]="true"` with emoji templates for discrete mood pickers.
- Always set unique gradient IDs when using SVG templates with multiple items.
