# API Reference — Angular ProgressButton

> Source: [https://ej2.syncfusion.com/angular/documentation/api/progress-button/](https://ej2.syncfusion.com/angular/documentation/api/progress-button/)

## ProgressButtonComponent

Selector: `ejs-progressbutton` / `button[ejs-progressbutton]`

```html
<button ejs-progressbutton content="Progress Button"></button>
```

---

## Table of Contents
1. [Properties](#properties)
2. [Methods](#methods)
3. [Events](#events)
4. [SpinSettingsModel](#spinsettingsmodel)
5. [AnimationSettingsModel](#animationsettingsmodel)
6. [ProgressEventArgs](#progresseventargs)
7. [AnimationEffect Enum](#animationeffect-enum)

---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `animationSettings` | `AnimationSettingsModel` | — | Specifies the animation settings. See [AnimationSettingsModel](#animationsettingsmodel). |
| `content` | `string` | `""` | Defines the text content of the progress button element. |
| `cssClass` | `string` | `""` | Root CSS class for customizing appearance (type, style, size). Also used to control progress layout (e.g., `e-hide-spinner`, `e-vertical`, `e-progress-top`). |
| `disabled` | `boolean` | `false` | Enables or disables the progress button. |
| `duration` | `number` | `2000` | Total duration of progression in milliseconds. |
| `enableHtmlSanitizer` | `boolean` | `true` | When `true`, sanitizes untrusted HTML values in `content` before rendering. |
| `enablePersistence` | `boolean` | `false` | Enable or disable persisting component state between page reloads. |
| `enableProgress` | `boolean` | `false` | Enables the background filler UI in the progress button. |
| `enableRtl` | `boolean` | `false` | Renders the component in right-to-left direction. |
| `iconCss` | `string` | `""` | CSS class(es) for the button icon (font icon or sprite image). |
| `iconPosition` | `string \| IconPosition` | `Left` | Icon position relative to text: `Left`, `Right`, `Top`, `Bottom`. |
| `isPrimary` | `boolean` | `false` | Enhances visual appearance as a primary button. |
| `isToggle` | `boolean` | `false` | Makes the button toggle between normal and active states on click. |
| `spinSettings` | `SpinSettingsModel` | — | Spinner configuration. See [SpinSettingsModel](#spinsettingsmodel). |

---

## Methods

### `start(percent?: number): void`
Starts the button progress from the specified percentage (default: 0).

```typescript
this.progressBtn.start();      // start from 0%
this.progressBtn.start(50);    // start from 50%
```

### `stop(): void`
Stops (pauses) the button progress.

```typescript
this.progressBtn.stop();
```

### `progressComplete(): void`
Immediately completes the button progress.

```typescript
this.progressBtn.progressComplete();
```

### `click(): void`
Programmatically clicks the button element (native method).

```typescript
this.progressBtn.click();
```

### `focusIn(): void`
Sets focus to the ProgressButton (native method).

```typescript
this.progressBtn.focusIn();
```

### `destroy(): void`
Destroys the component and cleans up resources.

```typescript
this.progressBtn.destroy();
```

---

## Events

| Event | Type | Fires When |
|---|---|---|
| `created` | `EmitType<Event>` | Component rendering is completed. |
| `begin` | `EmitType<ProgressEventArgs>` | Progress starts. |
| `progress` | `EmitType<ProgressEventArgs>` | At each step interval during progress. |
| `end` | `EmitType<ProgressEventArgs>` | Progress is completed (reaches 100%). |
| `fail` | `EmitType<Event>` | Progress is incomplete / interrupted. |

### Event Binding Example

```html
<button ejs-progressbutton content="Send"
        (created)="onCreated()"
        (begin)="onBegin($event)"
        (progress)="onProgress($event)"
        (end)="onEnd($event)"
        (fail)="onFail($event)">
</button>
```

```typescript
onCreated():           void { /* fired once on init */ }
onBegin(args: ProgressEventArgs):    void { console.log(args.percent); }
onProgress(args: ProgressEventArgs): void { console.log(args.percent); }
onEnd(args: ProgressEventArgs):      void { console.log('done'); }
onFail(e: Event):      void { console.log('failed'); }
```

---

## SpinSettingsModel

Interface: `SpinSettingsModel`  
Source: [https://ej2.syncfusion.com/angular/documentation/api/progress-button/spinsettingsmodel](https://ej2.syncfusion.com/angular/documentation/api/progress-button/spinsettingsmodel)

| Property | Type | Description |
|---|---|---|
| `position` | `SpinPosition` | Spinner position: `'Left'` \| `'Right'` \| `'Top'` \| `'Bottom'` \| `'Center'`. Default: `Left`. |
| `width` | `string \| number` | Width (size) of the spinner. |
| `template` | `string \| Function` | Custom HTML template or function for the spinner. |

```typescript
import { SpinSettingsModel } from '@syncfusion/ej2-splitbuttons';

public spinCfg: SpinSettingsModel = {
  position: 'Right',
  width: 20,
  template: '<div class="custom-spin"></div>'
};
```

---

## AnimationSettingsModel

Interface: `AnimationSettingsModel`  
Source: [https://ej2.syncfusion.com/angular/documentation/api/progress-button/animationsettingsmodel](https://ej2.syncfusion.com/angular/documentation/api/progress-button/animationsettingsmodel)

| Property | Type | Description |
|---|---|---|
| `effect` | `AnimationEffect` | Animation type applied to button text during progress. |
| `duration` | `number` | Duration of the animation in milliseconds. |
| `easing` | `string` | CSS timing function string (e.g., `'ease'`, `'ease-in'`, `'linear'`). |

```typescript
import { AnimationSettingsModel } from '@syncfusion/ej2-splitbuttons';

public animCfg: AnimationSettingsModel = {
  effect: 'SlideLeft',
  duration: 400,
  easing: 'ease'
};
```

---

## ProgressEventArgs

Interface: `ProgressEventArgs`  
Source: [https://ej2.syncfusion.com/angular/documentation/api/progress-button/progresseventargs](https://ej2.syncfusion.com/angular/documentation/api/progress-button/progresseventargs)

| Property | Type | Description |
|---|---|---|
| `currentDuration` | `number` | Current elapsed duration of the progress in ms. |
| `name` | `string` | Name of the event (`'begin'`, `'progress'`, `'end'`). |
| `percent` | `number` | Current progress percentage (0–100). Can be set in handlers to jump to a value. |
| `step` | `number` | Interval step in percentage. Set in `begin` to control how often `progress` fires. |

```typescript
// Set step in begin event (progress fires every 20%)
onBegin(args: ProgressEventArgs): void {
  args.step = 20;
}

// Jump to 90% when progress reaches 40%
onProgress(args: ProgressEventArgs): void {
  if (args.percent === 40) {
    args.percent = 90;
  }
}
```

---

## AnimationEffect Enum

Source: [https://ej2.syncfusion.com/angular/documentation/api/progress-button/animationeffect](https://ej2.syncfusion.com/angular/documentation/api/progress-button/animationeffect)

| Value | Description |
|---|---|
| `None` | No animation on text content. |
| `SlideLeft` | Text slides to the left. |
| `SlideRight` | Text slides to the right. |
| `SlideUp` | Text slides upward. |
| `SlideDown` | Text slides downward. |
| `ZoomIn` | Text zooms in. |
| `ZoomOut` | Text zooms out. |

---

## cssClass Built-in Utilities

These special class names are applied via the `cssClass` property:

| Class | Effect |
|---|---|
| `e-hide-spinner` | Hides the spinner during progress. |
| `e-vertical` | Shows progress as a vertical filler. |
| `e-progress-top` | Shows progress at the top of the button. |
| `e-primary` | Renders as a primary (highlighted) button. |
| `e-success` | Green success styling. |
| `e-info` | Blue informational styling. |
| `e-warning` | Yellow/orange warning styling. |
| `e-danger` | Red danger styling. |
| `e-outline` | Outlined button style. |
| `e-flat` | Flat/text button style. |
| `e-small` | Small button size. |
| `e-large` | Large button size. |

---

## Complete Working Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { ProgressButtonComponent, ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SpinSettingsModel, AnimationSettingsModel } from '@syncfusion/ej2-splitbuttons';

@Component({
  standalone: true,
  imports: [ProgressButtonModule],
  selector: 'app-root',
  template: `
    <button #btn ejs-progressbutton
            content="Upload File"
            [enableProgress]="true"
            [duration]="3000"
            [spinSettings]="spinCfg"
            [animationSettings]="animCfg"
            cssClass="e-primary"
            (begin)="onBegin($event)"
            (progress)="onProgress($event)"
            (end)="onEnd($event)">
    </button>
    <button (click)="stop()">Stop</button>
    <button (click)="complete()">Complete</button>
  `
})
export class AppComponent {
  @ViewChild('btn') btn!: ProgressButtonComponent;

  public spinCfg: SpinSettingsModel    = { position: 'Right', width: 18 };
  public animCfg: AnimationSettingsModel = { effect: 'SlideLeft' };

  onBegin(args: any):    void { args.step = 10; }
  onProgress(args: any): void { console.log(`${args.percent}%`); }
  onEnd(args: any):      void { console.log('Completed!'); }

  stop():     void { this.btn.stop(); }
  complete(): void { this.btn.progressComplete(); }
}
```
