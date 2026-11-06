# Animation — Syncfusion Angular DropDownButton

The `animationSettings` property controls the popup open/close animation. By default, animation is disabled (`effect: 'None'`).

---

## Supported Animation Effects

| Effect | Description |
|---|---|
| `None` | No animation — popup appears instantly (default) |
| `SlideDown` | Popup slides down from the button |
| `ZoomIn` | Popup scales up from a small size |
| `FadeIn` | Popup fades in from transparent to opaque |

---

## animationSettings Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `effect` | `string` | `'None'` | Animation effect to apply |
| `duration` | `number` | `400` | Duration of animation in milliseconds |
| `easing` | `string` | `'ease'` | CSS easing function (e.g., `'ease'`, `'linear'`, `'ease-in-out'`) |

---

## Basic Usage

Bind the `animationSettings` input using an object literal or a component property:

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <div class="e-section-control">
      <button ejs-dropdownbutton [items]="items"
        [animationSettings]="{ effect: 'SlideDown', duration: 800, easing: 'ease' }"
        content="Slide Down">
      </button>
      <button ejs-dropdownbutton [items]="items"
        [animationSettings]="{ effect: 'FadeIn', duration: 800, easing: 'ease' }"
        content="Fade In">
      </button>
      <button ejs-dropdownbutton [items]="items"
        [animationSettings]="{ effect: 'ZoomIn', duration: 800, easing: 'ease' }"
        content="Zoom In">
      </button>
    </div>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Unread' },
    { text: 'Has Attachments' },
    { text: 'Categorized' },
    { separator: true },
    { text: 'Important' },
    { text: 'More Filters' }
  ];
}
```

---

## Using a Component Property

For reusability or dynamic switching, define the animation settings as a typed property:

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownMenuAnimationSettingsModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" [animationSettings]="animation" content="Animated"></button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' }
  ];

  public animation: DropDownMenuAnimationSettingsModel = {
    effect: 'SlideDown',
    duration: 400,
    easing: 'ease'
  };
}
```

---

## Disabling Animation

To disable animation explicitly (same as the default):

```html
<button ejs-dropdownbutton [items]="items" [animationSettings]="{ effect: 'None' }" content="No Animation"></button>
```
