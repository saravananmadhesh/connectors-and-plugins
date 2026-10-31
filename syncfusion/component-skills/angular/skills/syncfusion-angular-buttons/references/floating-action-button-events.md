# Events – Syncfusion Angular Floating Action Button

## Table of Contents
- [Overview](#overview)
- [created Event](#created-event)
- [click Event](#click-event)
- [Combined Example](#combined-example)

---

## Overview

The Syncfusion Angular FAB exposes two events:

| Event | Angular Binding | Trigger |
|-------|-----------------|---------|
| `created` | `(created)` | Fires once after the FAB is fully rendered |
| `click` | `(click)` | Fires when the FAB is clicked |

---

## created Event

Fires once after the FAB component finishes rendering. Use it to run initialization logic, set dynamic state, or log analytics after the FAB is ready.

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit" content="Edit"
      (created)="onCreated()" target="#targetElement"></button>
  `
})
export class AppComponent {
  onCreated(): void {
    console.log('FAB has been created and is ready.');
  }
}
```

---

## click Event

Fires when the user clicks the FAB. Use this event to perform the primary action (e.g., open a dialog, create a new record, submit a form).

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit" content="Edit"
      (click)="onFabClick()" target="#targetElement"></button>
  `
})
export class AppComponent {
  onFabClick(): void {
    alert('Edit is clicked!');
  }
}
```

---

## Combined Example

Using both `created` and `click` events together:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit" content="Edit"
      (created)="onCreated()"
      (click)="onFabClick()"
      target="#targetElement"></button>
    <p>Click count: {{ clickCount }}</p>
  `
})
export class AppComponent {
  clickCount = 0;

  onCreated(): void {
    console.log('FAB initialized.');
  }

  onFabClick(): void {
    this.clickCount++;
    console.log(`FAB clicked ${this.clickCount} time(s).`);
  }
}
```
