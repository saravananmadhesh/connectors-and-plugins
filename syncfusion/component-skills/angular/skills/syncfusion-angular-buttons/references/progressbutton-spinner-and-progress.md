# Spinner and Progress — Angular ProgressButton

## Spinner Configuration (`spinSettings`)

Controlled via the `spinSettings` property (type: `SpinSettingsModel`).

### SpinSettingsModel Properties

| Property | Type | Description |
|---|---|---|
| `position` | `SpinPosition` | Spinner position: `Left` \| `Right` \| `Top` \| `Bottom` \| `Center`. Default: `Left`. |
| `width` | `string \| number` | Spinner size/width. |
| `template` | `string \| Function` | Custom HTML template for the spinner. |

### Change Spinner Position

```typescript
template: `
  <button ejs-progressbutton content="Submit"
          [spinSettings]="spinCfg">
  </button>
`
// Component class
public spinCfg = { position: 'Right' };
```

Valid `position` values: `'Left'`, `'Right'`, `'Top'`, `'Bottom'`, `'Center'`.

### Change Spinner Size

```typescript
public spinCfg = { position: 'Left', width: 20 };
```

### Custom Spinner Template

```typescript
public spinCfg = {
  template: '<div class="custom-spinner"></div>'
};
```

```css
/* Custom spinner styles */
.custom-spinner {
  width: 16px; height: 16px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```

### Full Spinner Example

```typescript
import { Component } from '@angular/core';
import { ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SpinSettingsModel } from '@syncfusion/ej2-splitbuttons';

@Component({
  standalone: true,
  imports: [ProgressButtonModule],
  selector: 'app-root',
  template: `
    <button ejs-progressbutton content="Upload"
            [spinSettings]="spinCfg"
            [duration]="3000">
    </button>
  `
})
export class AppComponent {
  public spinCfg: SpinSettingsModel = { position: 'Right', width: 20 };
}
```

---

## Progress Configuration

### Enable Background Filler UI

```typescript
template: `
  <button ejs-progressbutton content="Save" [enableProgress]="true"></button>
`
```

### Duration

Set total progress duration in milliseconds (default: `2000`):

```typescript
template: `
  <button ejs-progressbutton content="Process"
          [enableProgress]="true"
          [duration]="4000">
  </button>
`
```

---

## Content Animation (`animationSettings`)

Animate the button text during progress via `animationSettings` (type: `AnimationSettingsModel`).

### AnimationSettingsModel Properties

| Property | Type | Description |
|---|---|---|
| `effect` | `AnimationEffect` | Animation type. See values below. |
| `duration` | `number` | Animation duration in ms. |
| `easing` | `string` | CSS easing/timing function string. |

### AnimationEffect Values

| Value | Description |
|---|---|
| `None` | No animation (default). |
| `SlideLeft` | Text slides to the left. |
| `SlideRight` | Text slides to the right. |
| `SlideUp` | Text slides upward. |
| `SlideDown` | Text slides downward. |
| `ZoomIn` | Text zooms in. |
| `ZoomOut` | Text zooms out. |

```typescript
import { AnimationSettingsModel } from '@syncfusion/ej2-splitbuttons';

public animCfg: AnimationSettingsModel = {
  effect: 'SlideLeft',
  duration: 400,
  easing: 'ease-in'
};
```

```html
<button ejs-progressbutton content="Download"
        [enableProgress]="true"
        [animationSettings]="animCfg">
</button>
```

---

## Changing Progress Step

Set the `step` property on the `ProgressEventArgs` in the `begin` event to control how often the `progress` event fires (as a % increment):

```typescript
template: `
  <button ejs-progressbutton content="Upload"
          [enableProgress]="true"
          (begin)="onBegin($event)">
  </button>
`
// Progress fires at every 20% increment
public onBegin(args: any): void {
  args.step = 20;
}
```

---

## Changing Progress Dynamically

Modify the `percent` property in a progress event handler to jump to a specific point:

```typescript
public onProgress(args: any): void {
  // When 40% is reached, jump to 90%
  if (args.percent === 40) {
    args.percent = 90;
  }
}
```

---

## Programmatic Control: start, stop, progressComplete

Use `@ViewChild` to access the component instance:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ProgressButtonComponent, ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [ProgressButtonModule],
  selector: 'app-root',
  template: `
    <button #pb ejs-progressbutton content="Pause / Resume"
            [enableProgress]="true"
            (begin)="onBegin($event)"
            (end)="onEnd($event)">
    </button>
  `
})
export class AppComponent {
  @ViewChild('pb') progressBtn!: ProgressButtonComponent;
  private isPaused = false;

  onBegin(args: any): void {
    if (this.isPaused) {
      this.progressBtn.stop();
      this.isPaused = false;
    }
  }

  onEnd(args: any): void {
    this.isPaused = true;
    this.progressBtn.start(0);
  }
}
```

| Method | Signature | Description |
|---|---|---|
| `start` | `start(percent?: number): void` | Starts progress from the specified percent (0 if omitted). |
| `stop` | `stop(): void` | Pauses/stops the progress. |
| `progressComplete` | `progressComplete(): void` | Immediately completes the progress. |
