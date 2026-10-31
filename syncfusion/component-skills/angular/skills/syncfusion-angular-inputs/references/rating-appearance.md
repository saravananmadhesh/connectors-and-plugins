# Appearance and Customization in Angular Rating Component

## Table of Contents
- [Items Count](#items-count)
- [Disabled State](#disabled-state)
- [Visible / Hidden](#visible--hidden)
- [Read-Only Mode](#read-only-mode)
- [CSS Customization with cssClass](#css-customization-with-cssclass)
  - [Changing Border Color](#changing-border-color)
  - [Changing Fill Colors](#changing-fill-colors)
  - [Changing Item Spacing](#changing-item-spacing)
  - [Changing the Rating Icon](#changing-the-rating-icon)
- [Animation](#animation)

---

## Items Count

Control the number of rating symbols with `itemsCount`. Default is `5`.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" [itemsCount]="8" [value]="3"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

---

## Disabled State

Set `disabled` to `true` to prevent user interaction. The component shows a dimmed visual appearance.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" [value]="3" [disabled]="true"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

- Disabled is different from read-only: disabled components are visually dimmed and not focusable.

---

## Visible / Hidden

Use `visible` to show or hide the rating component. Default is `true`.

```typescript
import { Component } from '@angular/core';
import { RatingModule, RatingComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <button (click)="toggleVisible()">Toggle Visible</button>
      <input ejs-rating #rating id="rating" [value]="3" [visible]="true"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent {
  @ViewChild('rating') ratingRef!: RatingComponent;

  toggleVisible() {
    this.ratingRef.visible = !this.ratingRef.visible;
  }
}
```

---

## Read-Only Mode

Use `readOnly` to display the rating without allowing changes. The component is still visible and focusable but non-interactive.

```typescript
import { Component } from '@angular/core';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <input ejs-rating id="rating" [value]="3" [readOnly]="true"/>
    </div>
  `,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

- Use `readOnly` for **display-only** rating (e.g., showing an average score).
- Use `disabled` when the rating field is conditionally unavailable.

---

## CSS Customization with cssClass

Pass a custom CSS class via `cssClass` and override the relevant CSS variables or properties.

### Changing Border Color

Change the icon outline/stroke color using `.e-rating-icon` with `text-stroke` (or `-webkit-text-stroke`):

```typescript
@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="3" cssClass="custom-border"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

```css
.custom-border .e-rating-icon {
  -webkit-text-stroke: 2px #ff0000;
}
```

---

### Changing Fill Colors

Customize rated (filled) and unrated (empty) fill colors using `linear-gradient` on `.e-rating-icon`. The first color-stop is the rated color, the second is the unrated color. `--rating-value` provides the current item's value for partial fill support.

```typescript
@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="3" cssClass="custom-fill"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
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

---

### Changing Item Spacing

Adjust spacing between rating items by targeting `.e-rating-item-container`:

```typescript
@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="3" cssClass="custom-spacing"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

```css
.custom-spacing .e-rating-item-container {
  margin: 0 8px;
}
```

---

### Changing the Rating Icon

Replace the default star with any font icon by overriding `.e-icons.e-star-filled:before`:

```typescript
@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="3" cssClass="custom-icon"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

```css
.custom-icon .e-icons.e-star-filled:before {
  content: '\e700'; /* Replace with your font icon code */
  font-family: 'YourIconFont';
}
```

---

## Animation

The `enableAnimation` property controls whether items animate on hover. Default is `true`.

```typescript
@Component({
  selector: 'app-root',
  template: `<input ejs-rating id="rating" [value]="3" [enableAnimation]="false"/>`,
  standalone: true,
  imports: [RatingModule],
})
export class AppComponent { }
```

- Disable animation when using custom emoji or SVG templates to avoid visual conflicts.
