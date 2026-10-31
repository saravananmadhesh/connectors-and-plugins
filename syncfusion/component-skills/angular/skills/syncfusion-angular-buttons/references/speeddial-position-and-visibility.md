# Speed Dial Position and Visibility

## Table of Contents
- [Position Property](#position-property)
- [Target Property](#target-property)
- [Opens On Hover](#opens-on-hover)
- [Programmatic Show and Hide](#programmatic-show-and-hide)
- [Refresh Position](#refresh-position)
- [Visible Property](#visible-property)

---

## Position Property

The `position` property places the Speed Dial button at a specific corner or center of its `target` element (or the viewport if no target is set).

| Value | Placement |
|---|---|
| `TopLeft` | Top-left corner |
| `TopCenter` | Top-center edge |
| `TopRight` | Top-right corner |
| `MiddleLeft` | Middle-left edge |
| `MiddleCenter` | Center |
| `MiddleRight` | Middle-right edge |
| `BottomLeft` | Bottom-left corner |
| `BottomCenter` | Bottom-center edge |
| `BottomRight` | Bottom-right corner (default) |

### Example: Bottom-left position

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Add"
      position="BottomLeft"
      target="#targetElement">
    </button>
  `
})
export class AppComponent { }
```

---

## Target Property

The `target` property is a CSS selector string or `HTMLElement` that defines the container the Speed Dial is positioned within.

- The target element **must** have `position: relative`
- Without `target`, the Speed Dial positions relative to the browser viewport
- When `target` is set, `position` values are relative to that element

```html
<div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
<button ejs-speeddial id="speeddial" content="Edit" target="#targetElement" [items]="items"></button>
```

---

## Opens On Hover

By default, the Speed Dial popup opens on click. Set `opensOnHover="true"` to open on mouse hover instead:

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
      openIconCss="e-icons e-edit"
      closeIconCss="e-icons e-close"
      target="#targetElement"
      [items]="items"
      [opensOnHover]="true">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { iconCss: 'e-icons e-cut' },
    { iconCss: 'e-icons e-copy' },
    { iconCss: 'e-icons e-paste' }
  ];
}
```

---

## Programmatic Show and Hide

Use `show()` and `hide()` methods via `@ViewChild` to control the popup programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeedDialModule, SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:340px; border:1px solid; padding:10px;">
      <button (click)="show()">Show</button>
      <button (click)="hide()">Hide</button>
    </div>
    <button ejs-speeddial #speeddial
      openIconCss="e-icons e-edit"
      closeIconCss="e-icons e-close"
      target="#targetElement"
      [opensOnHover]="true"
      [items]="items">
    </button>
  `
})
export class AppComponent {
  @ViewChild('speeddial') public speeddialObj!: SpeedDialComponent;

  public items: SpeedDialItemModel[] = [
    { iconCss: 'e-icons e-cut' },
    { iconCss: 'e-icons e-copy' },
    { iconCss: 'e-icons e-paste' }
  ];

  public show(): void {
    this.speeddialObj.show();
  }

  public hide(): void {
    this.speeddialObj.hide();
  }
}
```

---

## Refresh Position

Call `refreshPosition()` when the target container is resized and the Speed Dial button needs to reposition:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeedDialModule, SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:340px; border:1px solid; padding:10px;">
      <button (click)="refresh()">Refresh</button>
    </div>
    <button ejs-speeddial #speeddial
      openIconCss="e-icons e-edit"
      closeIconCss="e-icons e-close"
      position="MiddleRight"
      target="#targetElement"
      [items]="items">
    </button>
  `
})
export class AppComponent {
  @ViewChild('speeddial') public speeddialObj!: SpeedDialComponent;

  public items: SpeedDialItemModel[] = [
    { iconCss: 'e-icons e-cut' },
    { iconCss: 'e-icons e-copy' },
    { iconCss: 'e-icons e-paste' }
  ];

  public refresh(): void {
    const target = document.getElementById('targetElement')!;
    target.style.minHeight = '300px';
    this.speeddialObj.refreshPosition();
  }
}
```

> The browser automatically triggers position refresh on window resize. Call `refreshPosition()` only when the target element itself changes size programmatically.

---

## Visible Property

The `visible` property controls whether the Speed Dial button is shown or hidden. Default is `true`.

```html
<!-- Hidden Speed Dial -->
<button ejs-speeddial id="speeddial" content="Edit" [visible]="false"></button>
```

Use this when you want to conditionally render or hide the component based on application state.
