# API Reference – Syncfusion Angular Floating Action Button

## Table of Contents
- [Component Selector](#component-selector)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [FabPosition Enum](#fabposition-enum)

---

## Component Selector

```html
<button ejs-fab id="fab" content="Add"></button>
```

**Module:** `FabModule` from `@syncfusion/ej2-angular-buttons`

---

## Properties

### content
**Type:** `string` | **Default:** `""`

Defines the text content of the FAB button element.

```html
<button ejs-fab id="fab" content="Add"></button>
```

---

### cssClass
**Type:** `string` | **Default:** `""`

Defines one or more CSS classes (space-separated) to apply to the FAB element. Used for predefined styles (`e-primary`, `e-outline`, `e-info`, `e-success`, `e-warning`, `e-danger`) and custom styling.

```html
<button ejs-fab id="fab" iconCss="e-icons e-edit" cssClass="e-warning"></button>
```

---

### disabled
**Type:** `boolean` | **Default:** `false`

Disables the FAB when set to `true`. A disabled FAB cannot be interacted with.

```html
<button ejs-fab id="fab" content="Add" [disabled]="true"></button>
```

---

### enableHtmlSanitizer
**Type:** `boolean` | **Default:** `true`

When `true`, sanitizes any untrusted HTML strings in the `content` property before rendering. Prevents XSS vulnerabilities when rendering dynamic content.

```html
<button ejs-fab id="fab" [enableHtmlSanitizer]="true" content="<b>Add</b>"></button>
```

---

### enablePersistence
**Type:** `boolean` | **Default:** `false`

When `true`, persists the component's state between page reloads using browser storage.

```html
<button ejs-fab id="fab" content="Add" [enablePersistence]="true"></button>
```

---

### enableRtl
**Type:** `boolean` | **Default:** `false`

When `true`, renders the FAB in right-to-left direction, mirroring icon and content layout for RTL languages.

```html
<button ejs-fab id="fab" iconCss="e-icons e-edit" content="Edit" [enableRtl]="true"></button>
```

---

### iconCss
**Type:** `string` | **Default:** `""`

Defines CSS class(es) for the FAB icon. Supports Syncfusion icon fonts and custom sprite images.

```html
<button ejs-fab id="fab" iconCss="e-icons e-edit"></button>
```

---

### iconPosition
**Type:** `string | IconPosition` | **Default:** `"Left"`

Positions the icon relative to the text content.

| Value | Behavior |
|-------|----------|
| `'Left'` (default) | Icon appears to the left of the text |
| `'Right'` | Icon appears to the right of the text |

```html
<button ejs-fab id="fab" iconCss="e-icons e-edit" content="Edit" iconPosition="Right"></button>
```

---

### isPrimary
**Type:** `boolean` | **Default:** `true`

When `true`, applies the primary style to the FAB. This is the default behavior.

```html
<button ejs-fab id="fab" content="Add" [isPrimary]="true"></button>
```

---

### isToggle
**Type:** `boolean` | **Default:** `false`

When `true`, makes the FAB a toggle button. Each click alternates the FAB between normal and active states.

```html
<button ejs-fab id="fab" iconCss="e-icons e-edit" [isToggle]="true"></button>
```

---

### position
**Type:** `string | FabPosition` | **Default:** `"BottomRight"`

Defines the predefined position of the FAB relative to its `target` (or the browser viewport). See [FabPosition Enum](#fabposition-enum) for all valid values.

```html
<button ejs-fab id="fab" content="Add" position="BottomLeft" target="#target"></button>
```

---

### target
**Type:** `string | HTMLElement` | **Default:** `""`

Defines the element (via CSS selector or DOM reference) within which the FAB is positioned. The target element must have `position: relative`. When not set, the FAB positions based on the browser viewport.

```html
<div id="target" style="position:relative;min-height:350px;"></div>
<button ejs-fab id="fab" content="Add" target="#target"></button>
```

---

### visible
**Type:** `boolean` | **Default:** `true`

Shows or hides the FAB. When `false`, the FAB is hidden but still rendered in the DOM.

```html
<button ejs-fab id="fab" content="Add" [visible]="isVisible"></button>
```

---

## Methods

### click()
Programmatically triggers a click on the FAB (native button click).

**Returns:** `void`

```typescript
import { FabModule, FabComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="target" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab #fab id="fab" iconCss="e-icons e-edit" target="#target"></button>
    <button (click)="triggerFab()">Trigger FAB</button>
  `
})
export class AppComponent {
  @ViewChild('fab') fabInstance!: FabComponent;

  triggerFab(): void {
    this.fabInstance.click();
  }
}
```

---

### destroy()
Destroys the FAB instance and removes it from the DOM along with its event listeners.

**Returns:** `void`

```typescript
import { FabModule, FabComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="target" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab #fab id="fab" iconCss="e-icons e-edit" target="#target"></button>
    <button (click)="destroyFab()">Destroy FAB</button>
  `
})
export class AppComponent {
  @ViewChild('fab') fabInstance!: FabComponent;

  destroyFab(): void {
    this.fabInstance.destroy();
  }
}
```

---

### focusIn()
Sets focus to the FAB button element (native focus method).

**Returns:** `void`

```typescript
this.fabInstance.focusIn();
```

---

### getPersistData()
Returns the component state as a serialized JSON string for persistence purposes.

**Returns:** `string`

```typescript
const persistedState: string = this.fabInstance.getPersistData();
console.log(persistedState);
```

---

### refreshPosition()
Recalculates and re-applies the FAB's position. Call this method when the `target` container is resized programmatically.

**Returns:** `void`

```typescript
import { FabModule, FabComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="target" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab #fab id="fab" iconCss="e-icons e-edit" target="#target"></button>
    <button (click)="onResize()">Resize and Refresh</button>
  `
})
export class AppComponent {
  @ViewChild('fab') fabInstance!: FabComponent;

  onResize(): void {
    const target = document.getElementById('target');
    if (target) {
      target.style.minHeight = '500px';
      this.fabInstance.refreshPosition();
    }
  }
}
```

---

## Events

### created
**Type:** `EmitType<Event>`

Fires once after the FAB component rendering is completed.

```html
<button ejs-fab id="fab" iconCss="e-icons e-edit" (created)="onCreated()"></button>
```

```typescript
onCreated(): void {
  console.log('FAB component rendered.');
}
```

---

### click
**Type:** `EmitType<Event>`

Fires when the FAB is clicked by the user.

```html
<button ejs-fab id="fab" iconCss="e-icons e-edit" (click)="onFabClick()"></button>
```

```typescript
onFabClick(): void {
  console.log('FAB clicked.');
}
```

---

## FabPosition Enum

Imported from `@syncfusion/ej2-angular-buttons`.

| Value | Description |
|-------|-------------|
| `TopLeft` | Top-left corner of the target |
| `TopCenter` | Top-center of the target |
| `TopRight` | Top-right corner of the target |
| `MiddleLeft` | Middle-left of the target |
| `MiddleCenter` | Center of the target |
| `MiddleRight` | Middle-right of the target |
| `BottomLeft` | Bottom-left corner of the target |
| `BottomCenter` | Bottom-center of the target |
| `BottomRight` | Bottom-right corner (default) |

```typescript
import { FabPosition } from '@syncfusion/ej2-angular-buttons';

// Usage in component class
public fabPosition: FabPosition = 'BottomLeft';
```

```html
<button ejs-fab id="fab" content="Add" [position]="fabPosition" target="#target"></button>
```
