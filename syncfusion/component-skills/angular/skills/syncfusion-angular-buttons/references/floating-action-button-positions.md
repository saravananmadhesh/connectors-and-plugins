# Positions – Syncfusion Angular Floating Action Button

## Table of Contents
- [Overview](#overview)
- [Predefined Positions](#predefined-positions)
- [All Positions Example](#all-positions-example)
- [Scoping to a Target](#scoping-to-a-target)
- [Custom Position with cssClass](#custom-position-with-cssclass)
- [Refreshing Position After Resize](#refreshing-position-after-resize)

---

## Overview

Use the `position` property to place the FAB at one of nine predefined positions relative to its `target` element (or the browser viewport when no target is defined).

Default position: **`BottomRight`**

---

## Predefined Positions

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
| `BottomRight` | Bottom-right corner of the target (default) |

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button ejs-fab id="fab" content="Add" position="BottomLeft"></button>
  `
})
export class AppComponent { }
```

---

## All Positions Example

Render nine FABs, each at a different predefined position within the same target:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="target" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab1" iconCss="fab-icons fab-icon-people" position="TopLeft" target="#target"></button>
    <button ejs-fab id="fab2" iconCss="fab-icons fab-icon-people" position="TopCenter" target="#target"></button>
    <button ejs-fab id="fab3" iconCss="fab-icons fab-icon-people" position="TopRight" target="#target"></button>
    <button ejs-fab id="fab4" iconCss="fab-icons fab-icon-people" position="MiddleLeft" target="#target"></button>
    <button ejs-fab id="fab5" iconCss="fab-icons fab-icon-people" position="MiddleCenter" target="#target"></button>
    <button ejs-fab id="fab6" iconCss="fab-icons fab-icon-people" position="MiddleRight" target="#target"></button>
    <button ejs-fab id="fab7" iconCss="fab-icons fab-icon-people" position="BottomLeft" target="#target"></button>
    <button ejs-fab id="fab8" iconCss="fab-icons fab-icon-people" position="BottomCenter" target="#target"></button>
    <button ejs-fab id="fab9" iconCss="fab-icons fab-icon-people" position="BottomRight" target="#target"></button>
  `
})
export class AppComponent { }
```

---

## Scoping to a Target

The `target` property accepts a CSS selector string or an `HTMLElement` reference. The target container **must have `position: relative`** for the FAB to position correctly.

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="container" style="position:relative;min-height:400px;border:1px solid #ccc;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit" position="BottomRight" target="#container"></button>
  `
})
export class AppComponent { }
```

> When `target` is not defined, the FAB positions itself relative to the browser viewport.

---

## Custom Position with cssClass

Override the built-in position by setting `top`, `left`, `right`, or `bottom` CSS properties through a custom class passed to `cssClass`:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  styles: [`
    .custom-position {
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  `],
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit" cssClass="custom-position"
      target="#targetElement"></button>
  `
})
export class AppComponent { }
```

---

## Refreshing Position After Resize

When the `target` element is resized programmatically, call `refreshPosition()` on the FAB instance to recalculate and apply the correct position:

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
    <button (click)="resize()">Resize Target</button>
  `
})
export class AppComponent {
  @ViewChild('fab') fabInstance!: FabComponent;

  resize(): void {
    const target = document.getElementById('target');
    if (target) {
      target.style.minHeight = '500px';
      this.fabInstance.refreshPosition();
    }
  }
}
```
