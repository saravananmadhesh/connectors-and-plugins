# Position and Dimension — Syncfusion Angular Predefined Dialogs

## Table of Contents
- [Positioning Dialogs](#positioning-dialogs)
- [Width and Height](#width-and-height)
- [Max-Width and Max-Height](#max-width-and-max-height)
- [Min-Width and Min-Height](#min-width-and-min-height)
- [Position and Size Together](#position-and-size-together)

---

## Positioning Dialogs

Use the `position` property to control where a predefined dialog appears on screen. Supply an object with `X` and `Y` values.

**Predefined position values:**
- `X`: `'left'`, `'center'`, `'right'`, or numeric pixel offset (e.g., `100`)
- `Y`: `'top'`, `'center'`, `'bottom'`, or numeric pixel offset (e.g., `50`)

Default position: `{ X: 'center', Y: 'center' }`

**Alert — centered (explicit):**
```typescript
DialogUtility.alert({
  title: 'Low Battery',
  content: '10% of battery remaining',
  width: '250px',
  position: { X: 'center', Y: 'center' }
});
```

**Confirm — top-right corner:**
```typescript
DialogUtility.confirm({
  title: 'Delete Multiple Items',
  content: 'Are you sure you want to permanently delete these items?',
  width: '300px',
  position: { X: 'right', Y: 'top' }
});
```

**Prompt — bottom of screen:**
```typescript
DialogUtility.confirm({
  title: 'Join Chat Group',
  content: '<p>Enter your name:</p><input id="inputEle" type="text" class="e-input" placeholder="Type here..." />',
  width: '300px',
  position: { X: 'center', Y: 'bottom' }
});
```

**Offset positioning (pixel values):**
```typescript
DialogUtility.alert({
  title: 'Notice',
  content: 'Positioned at a custom offset.',
  width: '280px',
  position: { X: 100, Y: 50 }  // 100px from left, 50px from top
});
```

---

## Width and Height

Use the `width` property to set the dialog width. Height defaults to `'auto'` (content-driven).

**Pixel-based sizing:**
```typescript
DialogUtility.alert({
  title: 'Low Battery',
  content: '10% of battery remaining',
  width: '400px'
});
```

**Percentage-based sizing:**
```typescript
DialogUtility.confirm({
  title: 'Delete Items',
  content: 'Permanently delete?',
  width: '50%'
});
```

**Height customization** — pass it through a custom CSS class:
```typescript
DialogUtility.alert({
  title: 'Information',
  content: '<div style="height: 200px; overflow-y: auto;">Long scrollable content here...</div>',
  width: '400px'
});
```

---

## Max-Width and Max-Height

To restrict maximum dimensions, use the `cssClass` property to apply a custom CSS class, then define `max-width` and `max-height` in your stylesheet.

**Angular component:**
```typescript
DialogUtility.alert({
  title: 'Low Battery',
  content: '10% of battery remaining',
  cssClass: 'custom-alert'
});
```

**CSS (styles.css or component styles):**
```css
.custom-alert.e-dialog {
  max-width: 400px !important;
  max-height: 300px !important;
}
```

> The `!important` flag may be needed to override Syncfusion's calculated `max-height` value which is applied inline at the source level.

**Full example with max constraints:**
```typescript
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `<button ejs-button cssClass="e-danger" (click)="alertBtnClick()">Alert</button>`,
  styles: [`
    :host ::ng-deep .max-dim-dialog.e-dialog {
      max-width: 400px !important;
      max-height: 300px !important;
    }
  `]
})
export class AppComponent {
  public alertBtnClick = (): void => {
    DialogUtility.alert({
      title: 'Low Battery',
      content: '10% of battery remaining',
      cssClass: 'max-dim-dialog'
    });
  };
}
```

---

## Min-Width and Min-Height

Similarly, use `cssClass` + CSS to enforce minimum dimensions:

```typescript
DialogUtility.alert({
  title: 'Low Battery',
  content: '10% of battery remaining',
  cssClass: 'min-dim-dialog'
});
```

```css
.min-dim-dialog.e-dialog {
  min-width: 250px;
  min-height: 150px;
}
```

---

## Position and Size Together

Combine positioning with sizing for precise dialog placement:

```typescript
DialogUtility.confirm({
  title: 'Confirm Submission',
  content: 'Submit the form now?',
  width: '320px',
  position: { X: 'center', Y: 'top' },
  isModal: true,
  cssClass: 'submission-confirm'
});
```

```css
.submission-confirm.e-dialog {
  min-width: 300px;
  max-width: 500px;
}
```

**Decision guide for sizing:**
- Use `width` in px for fixed-size dialogs (e.g., alerts, simple confirms)
- Use `width` in % for responsive dialogs in fluid layouts
- Use `cssClass` + CSS for max/min constraints
- Combine `position` with `isDraggable: true` so users can reposition if needed
