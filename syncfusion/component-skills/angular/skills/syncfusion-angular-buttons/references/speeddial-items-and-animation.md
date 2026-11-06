# Speed Dial Items and Animation

## Table of Contents
- [SpeedDialItemModel Fields](#speeddialitemmodel-fields)
- [Icon Only Items](#icon-only-items)
- [Text Only Items](#text-only-items)
- [Icon with Text Items](#icon-with-text-items)
- [Disabled Items](#disabled-items)
- [Animation](#animation)

---

## SpeedDialItemModel Fields

| Field | Type | Description |
|---|---|---|
| `text` | `string` | Text label displayed on the item |
| `iconCss` | `string` | One or more CSS classes for the item's icon |
| `disabled` | `boolean` | Disables the item when `true` |
| `id` | `string` | Unique identifier, available in event args |
| `title` | `string` | Tooltip text shown on hover |

---

## Icon Only Items

Set `iconCss` without `text`. Use `title` for tooltip accessibility:

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
      [items]="items">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { iconCss: 'e-icons e-cut',   title: 'Cut' },
    { iconCss: 'e-icons e-copy',  title: 'Copy' },
    { iconCss: 'e-icons e-paste', title: 'Paste' }
  ];
}
```

---

## Text Only Items

Set `text` without `iconCss`:

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
      [items]="items">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

---

## Icon with Text Items

Combine both `iconCss` and `text`:

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
      openIconCss="e-icons e-edit"
      closeIconCss="e-icons e-close"
      target="#targetElement"
      [items]="items">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut',   iconCss: 'e-icons e-cut' },
    { text: 'Copy',  iconCss: 'e-icons e-copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste' }
  ];
}
```

---

## Disabled Items

Set `disabled: true` on individual items to prevent interaction:

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
      [items]="items">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut',   disabled: true },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

> To disable the entire Speed Dial component (not just an item), use the `disabled` property on the component itself.

---

## Animation

Control the opening and closing animation of action items using the `animation` property. The value accepts a `SpeedDialAnimationSettingsModel` object with these fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `effect` | `SpeedDialAnimationEffect` | `'Fade'` | Animation effect name |
| `duration` | `number` | `400` | Duration in milliseconds |
| `delay` | `number` | `0` | Delay before animation starts (ms) |

### Supported animation effects

`Fade`, `FadeZoom`, `FlipLeftDown`, `FlipLeftUp`, `FlipRightDown`, `FlipRightUp`, `SlideBottom`, `SlideLeft`, `SlideRight`, `SlideTop`, `Zoom`, `None`

### Example: Zoom animation

```typescript
import { Component } from '@angular/core';
import {
  SpeedDialModule,
  SpeedDialItemModel,
  SpeedDialAnimationSettingsModel
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
      openIconCss="e-icons e-edit"
      closeIconCss="e-icons e-close"
      target="#targetElement"
      [items]="items"
      [animation]="animation">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut',   iconCss: 'e-icons e-cut' },
    { text: 'Copy',  iconCss: 'e-icons e-copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste' }
  ];

  public animation: SpeedDialAnimationSettingsModel = {
    effect: 'Zoom',
    duration: 400,
    delay: 0
  };
}
```

### Disable animation

```typescript
public animation: SpeedDialAnimationSettingsModel = { effect: 'None' };
```
