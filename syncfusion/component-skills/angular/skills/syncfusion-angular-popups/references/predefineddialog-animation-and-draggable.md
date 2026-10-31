# Animation and Draggable — Syncfusion Angular Predefined Dialogs

## Table of Contents
- [Animation Overview](#animation-overview)
- [Alert Animation](#alert-animation)
- [Confirm Animation](#confirm-animation)
- [Prompt Animation](#prompt-animation)
- [Draggable Dialogs](#draggable-dialogs)
- [Combining Animation and Draggable](#combining-animation-and-draggable)

---

## Animation Overview

Predefined dialogs animate during open and close actions. Configure animation via the `animationSettings` property:

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `effect` | `string` | Animation effect name | `'Fade'` |
| `duration` | `number` | Animation duration in ms | `400` |
| `delay` | `number` | Delay before animation starts in ms | `0` |

**Available animation effects:**
- `'Fade'` — fade in/out (default)
- `'FadeZoom'` — fade with zoom
- `'Zoom'` — zoom in on open, zoom out on close (ZoomIn/ZoomOut)
- `'None'` — no animation

---

## Alert Animation

```typescript
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `<button ejs-button cssClass="e-danger" (click)="alertBtnClick()">Alert</button>`
})
export class AppComponent {
  public alertBtnClick = (): void => {
    DialogUtility.alert({
      title: 'Low Battery',
      content: '10% of battery remaining',
      width: '250px',
      animationSettings: { effect: 'Zoom' }
    });
  };
}
```

**With duration and delay:**
```typescript
DialogUtility.alert({
  title: 'Warning',
  content: 'Connection lost.',
  width: '280px',
  animationSettings: {
    effect: 'FadeZoom',
    duration: 600,
    delay: 100
  }
});
```

---

## Confirm Animation

```typescript
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `<button ejs-button cssClass="e-success" (click)="confirmBtnClick()">Confirm</button>`
})
export class AppComponent {
  public confirmBtnClick = (): void => {
    DialogUtility.confirm({
      title: 'Delete Multiple Items',
      content: 'Are you sure you want to permanently delete these items?',
      width: '300px',
      animationSettings: { effect: 'Zoom' }
    });
  };
}
```

---

## Prompt Animation

```typescript
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `<button ejs-button [isPrimary]="true" (click)="promptBtnClick()">Prompt</button>`
})
export class AppComponent {
  public promptBtnClick = (): void => {
    DialogUtility.confirm({
      title: 'Join Chat Group',
      width: '300px',
      content: '<p>Enter your name:</p><input id="inputEle" type="text" class="e-input" placeholder="Type here..." />',
      animationSettings: { effect: 'Zoom' }
    });
  };
}
```

---

## Draggable Dialogs

Use the `isDraggable` property to allow users to reposition the dialog by grabbing its header. This is useful for dialogs that appear over content the user may still need to see.

**Alert — draggable:**
```typescript
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `<button ejs-button cssClass="e-danger" (click)="alertBtnClick()">Alert</button>`
})
export class AppComponent {
  public alertBtnClick = (): void => {
    DialogUtility.alert({
      title: 'Low Battery',
      content: '10% of battery remaining',
      width: '250px',
      isDraggable: true
    });
  };
}
```

**Confirm — draggable:**
```typescript
DialogUtility.confirm({
  title: 'Delete Multiple Items',
  content: 'Are you sure you want to permanently delete these items?',
  width: '300px',
  isDraggable: true
});
```

**Prompt — draggable:**
```typescript
DialogUtility.confirm({
  title: 'Join Chat Group',
  content: '<p>Enter your name:</p><input id="inputEle" type="text" class="e-input" placeholder="Type here..." />',
  isDraggable: true,
  width: '300px'
});
```

**When to use `isDraggable`:**
- Non-modal dialogs where the underlying content remains interactive
- Reference dialogs users may want to move while filling in forms
- Any dialog where the default centered position may obstruct important content

---

## Combining Animation and Draggable

These properties compose well together:

```typescript
DialogUtility.confirm({
  title: 'Confirm Action',
  content: 'Proceed with the operation?',
  width: '300px',
  isDraggable: true,
  animationSettings: { effect: 'Zoom', duration: 400, delay: 0 },
  position: { X: 'center', Y: 'center' },
  showCloseIcon: true
});
```

**Recommended combinations:**

| Use Case | Recommended Settings |
|----------|---------------------|
| Standard alert | `animationSettings: { effect: 'Fade' }` |
| Attention-grabbing warning | `animationSettings: { effect: 'Zoom' }` |
| Repositionable confirm | `isDraggable: true, position: { X: 'center', Y: 'center' }` |
| Smooth UX prompt | `animationSettings: { effect: 'FadeZoom', duration: 300 }` |
| No animation (fast UI) | `animationSettings: { effect: 'None' }` |
