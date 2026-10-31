# Speed Dial Events

## Table of Contents
- [Overview](#overview)
- [clicked](#clicked)
- [created](#created)
- [beforeOpen](#beforeopen)
- [onOpen](#onopen)
- [beforeClose](#beforeclose)
- [onClose](#onclose)
- [beforeItemRender](#beforeitemrender)
- [Using Multiple Events Together](#using-multiple-events-together)

---

## Overview

| Event | Argument Type | When Triggered |
|---|---|---|
| `clicked` | `SpeedDialItemEventArgs` | An action item is clicked |
| `created` | `Event` | Component has finished rendering |
| `beforeOpen` | `SpeedDialBeforeOpenCloseEventArgs` | Before the popup opens |
| `onOpen` | `SpeedDialOpenCloseEventArgs` | After the popup opens |
| `beforeClose` | `SpeedDialBeforeOpenCloseEventArgs` | Before the popup closes |
| `onClose` | `SpeedDialOpenCloseEventArgs` | After the popup closes |
| `beforeItemRender` | `SpeedDialItemEventArgs` | Before each item is rendered |

Events use Angular's event binding syntax: `(eventName)="handler($event)"`.

---

## clicked

Fires when a Speed Dial action item is clicked. Use it to run the action associated with the item.

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel, SpeedDialItemEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement"
      [items]="items"
      (clicked)="onClicked($event)">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut',   id: 'cut' },
    { text: 'Copy',  id: 'copy' },
    { text: 'Paste', id: 'paste' }
  ];

  public onClicked(args: SpeedDialItemEventArgs): void {
    console.log('Clicked item:', args.item.text);
    // Use args.item.id to identify which item was clicked
  }
}
```

---

## created

Fires after the Speed Dial component is fully rendered.

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement"
      [items]="items"
      (created)="onCreated()">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  public onCreated(): void {
    console.log('SpeedDial component is ready');
  }
}
```

---

## beforeOpen

Fires before the popup opens. You can cancel the open by setting `args.cancel = true`.

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel, SpeedDialBeforeOpenCloseEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement"
      [items]="items"
      (beforeOpen)="onBeforeOpen($event)">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  public onBeforeOpen(args: SpeedDialBeforeOpenCloseEventArgs): void {
    console.log('About to open');
    // args.cancel = true; // Prevent popup from opening
  }
}
```

---

## onOpen

Fires after the popup is fully opened.

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel, SpeedDialOpenCloseEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement"
      [items]="items"
      (onOpen)="onOpen($event)">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  public onOpen(args: SpeedDialOpenCloseEventArgs): void {
    console.log('Popup opened');
  }
}
```

---

## beforeClose

Fires before the popup closes. Can be cancelled with `args.cancel = true`.

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel, SpeedDialBeforeOpenCloseEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement"
      [items]="items"
      (beforeClose)="onBeforeClose($event)">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  public onBeforeClose(args: SpeedDialBeforeOpenCloseEventArgs): void {
    console.log('About to close');
  }
}
```

---

## onClose

Fires after the popup is fully closed.

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel, SpeedDialOpenCloseEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement"
      [items]="items"
      (onClose)="onClose($event)">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  public onClose(args: SpeedDialOpenCloseEventArgs): void {
    console.log('Popup closed');
  }
}
```

---

## beforeItemRender

Fires before each action item is rendered. Use it to modify item DOM elements or add custom attributes.

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel, SpeedDialItemEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement"
      [items]="items"
      (beforeItemRender)="onBeforeItemRender($event)">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  public onBeforeItemRender(args: SpeedDialItemEventArgs): void {
    // args.item contains the SpeedDialItemModel
    // args.element contains the item's DOM element
    console.log('Rendering item:', args.item.text);
  }
}
```

---

## Using Multiple Events Together

```typescript
import { Component } from '@angular/core';
import {
  SpeedDialModule,
  SpeedDialItemModel,
  SpeedDialItemEventArgs,
  SpeedDialBeforeOpenCloseEventArgs,
  SpeedDialOpenCloseEventArgs
} from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement"
      [items]="items"
      (created)="onCreated()"
      (beforeOpen)="onBeforeOpen($event)"
      (onOpen)="onOpen($event)"
      (beforeClose)="onBeforeClose($event)"
      (onClose)="onClose($event)"
      (clicked)="onClicked($event)">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut',   id: 'cut' },
    { text: 'Copy',  id: 'copy' },
    { text: 'Paste', id: 'paste' }
  ];

  onCreated(): void { console.log('Created'); }
  onBeforeOpen(args: SpeedDialBeforeOpenCloseEventArgs): void { console.log('Before open'); }
  onOpen(args: SpeedDialOpenCloseEventArgs): void { console.log('Opened'); }
  onBeforeClose(args: SpeedDialBeforeOpenCloseEventArgs): void { console.log('Before close'); }
  onClose(args: SpeedDialOpenCloseEventArgs): void { console.log('Closed'); }
  onClicked(args: SpeedDialItemEventArgs): void { console.log('Clicked:', args.item.id); }
}
```
