# API Reference

Source: [Syncfusion EJ2 JavaScript ProgressButton API](https://ej2.syncfusion.com/documentation/api/progress-button/index-default)

## Table of Contents
- [ProgressButton Properties](#progressbutton-properties)
- [SpinSettingsModel](#spinsettingsmodel)
- [AnimationSettingsModel](#animationsettingsmodel)
- [ProgressEventArgs](#progresseventargs)
- [Methods](#methods)
- [Events](#events)

---

## ProgressButton Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animationSettings` | `AnimationSettingsModel` | — | Specifies the animation settings for content during progress. |
| `content` | `string` | `""` | Defines the text content of the progress button element. |
| `cssClass` | `string` | `""` | Root CSS class for customizing the component's appearance, type, style, and size. |
| `disabled` | `boolean` | `false` | Enables or disables the progress button. |
| `duration` | `number` | `2000` | Specifies the duration of progression in milliseconds. |
| `enableHtmlSanitizer` | `boolean` | `true` | When `true`, sanitizes untrusted HTML values in `content` before rendering. |
| `enablePersistence` | `boolean` | `false` | Enables or disables persisting component state between page reloads. |
| `enableProgress` | `boolean` | `false` | Enables or disables the background filler progress UI. |
| `enableRtl` | `boolean` | `false` | Enables or disables right-to-left rendering. |
| `iconCss` | `string` | `""` | CSS class(es) for the button icon (supports font icons and sprite images). |
| `iconPosition` | `string \| IconPosition` | `"Left"` | Position of the icon: `Left`, `Right`, `Top`, `Bottom`. |
| `isPrimary` | `boolean` | `false` | When `true`, enhances the visual appearance as a primary button. |
| `isToggle` | `boolean` | `false` | When `true`, the button toggles between normal and active state on click. |
| `spinSettings` | `SpinSettingsModel` | — | Specifies spinner settings (position, size, template). |

**Usage examples:**

```typescript
// TypeScript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

let progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  cssClass: 'e-primary e-hide-spinner',
  duration: 3000,
  enableProgress: true,
  iconCss: 'e-icons e-upload',
  iconPosition: 'Left',
  isPrimary: true,
  spinSettings: { position: 'Right', width: 20 },
  animationSettings: { effect: 'SlideLeft', duration: 400, easing: 'linear' }
});
progressBtn.appendTo('#progressbtn');
```

---

## SpinSettingsModel

Interface for configuring the spinner in the ProgressButton.

| Property | Type | Description |
|----------|------|-------------|
| `position` | `SpinPosition` | Position of the spinner relative to button text. Values: `Left`, `Right`, `Top`, `Bottom`, `Center`. |
| `template` | `string \| Function` | Custom HTML template for the spinner. Replaces the default spinner. |
| `width` | `string \| number` | Width (size) of the spinner in pixels. |

**Examples:**

```typescript
import { ProgressButton, SpinSettingsModel } from '@syncfusion/ej2-splitbuttons';

// Spinner on the right, size 20px
const spinRight: SpinSettingsModel = { position: 'Right', width: 20 };

// Centered spinner with custom template
const spinCenter: SpinSettingsModel = {
  position: 'Center',
  width: 24,
  template: '<div class="custom-spinner"></div>'
};
```

---

## AnimationSettingsModel

Interface for configuring content animation during progress.

| Property | Type | Description |
|----------|------|-------------|
| `effect` | `AnimationEffect` | Animation type. Values: `None`, `SlideLeft`, `SlideRight`, `SlideUp`, `SlideDown`, `ZoomIn`, `ZoomOut`. |
| `duration` | `number` | Duration of the animation in milliseconds. |
| `easing` | `string` | CSS timing function. Common values: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`. |

**Examples:**

```typescript
import { ProgressButton, AnimationSettingsModel } from '@syncfusion/ej2-splitbuttons';

// Slide left animation, 500ms, linear
const slideLeft: AnimationSettingsModel = { effect: 'SlideLeft', duration: 500, easing: 'linear' };

// Zoom in animation, 300ms
const zoomIn: AnimationSettingsModel = { effect: 'ZoomIn', duration: 300, easing: 'ease-in-out' };

// No animation
const noAnim: AnimationSettingsModel = { effect: 'None' };
```

---

## ProgressEventArgs

Interface for arguments passed to `begin`, `progress`, and `end` event handlers.

| Property | Type | Writable | Description |
|----------|------|----------|-------------|
| `currentDuration` | `number` | No | Elapsed duration of the progress in milliseconds. |
| `name` | `string` | No | Name of the event: `"begin"`, `"progress"`, or `"end"`. |
| `percent` | `number` | **Yes** | Current progress percentage (0–100). Set this in `progress` to jump the progress. |
| `step` | `number` | **Yes** | Interval between progress events. Set this in `begin` to control step size. |

**Usage:**

```typescript
import { ProgressButton, ProgressEventArgs } from '@syncfusion/ej2-splitbuttons';

let progressBtn: ProgressButton = new ProgressButton({
  content: 'Process',
  enableProgress: true,
  begin: (args: ProgressEventArgs) => {
    // args.percent === 0 at begin
    args.step = 10; // fire progress event every 10%
  },
  progress: (args: ProgressEventArgs) => {
    console.log(`${args.percent}% at ${args.currentDuration}ms`);
    if (args.percent === 50) {
      args.percent = 80; // jump progress to 80%
    }
  },
  end: (args: ProgressEventArgs) => {
    // args.percent === 100 at end
    console.log('Complete: ' + args.name);
  }
});
progressBtn.appendTo('#progressbtn');
```

---

## Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `start(percent?)` | `percent?: number` | `void` | Starts (or resumes) progress from the given percent. |
| `stop()` | — | `void` | Pauses progress at the current percent. |
| `progressComplete()` | — | `void` | Immediately completes the button progress. |
| `dataBind()` | — | `void` | Applies pending property changes (e.g., `content`, `cssClass`) to the DOM immediately. |
| `click()` | — | `void` | Programmatically clicks the button element. |
| `focusIn()` | — | `void` | Sets focus to the ProgressButton. |
| `appendTo(selector)` | `selector: string \| HTMLElement` | `void` | Appends the component to the given HTML element or selector. |
| `destroy()` | — | `void` | Destroys the component and cleans up DOM/event listeners. |
| `refresh()` | — | `void` | Applies all pending property changes and re-renders the component. |
| `getRootElement()` | — | `HTMLElement` | Returns the root DOM element of the component. |
| `addEventListener(eventName, handler)` | `string, Function` | `void` | Adds an event listener. |
| `removeEventListener(eventName, handler)` | `string, Function` | `void` | Removes an event listener. |

**Key method examples:**

```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({ content: 'Submit', enableProgress: true });
progressBtn.appendTo('#progressbtn');

// Pause and resume
progressBtn.stop();    // pause
progressBtn.start();   // resume from where it stopped
progressBtn.start(50); // resume from 50%

// Force complete
progressBtn.progressComplete();

// Apply property change immediately
progressBtn.content = 'Uploading...';
progressBtn.dataBind();

// Programmatic click
progressBtn.click();

// Destroy when done
progressBtn.destroy();
```

---

## Events

| Event | Argument Type | Description |
|-------|--------------|-------------|
| `begin` | `ProgressEventArgs` | Triggers when progress starts (on button click). |
| `progress` | `ProgressEventArgs` | Triggers at each step interval during progress. |
| `end` | `ProgressEventArgs` | Triggers when progress reaches 100% and completes. |
| `fail` | `Event` | Triggers when progress is incomplete or interrupted. |
| `created` | `Event` | Triggers once after the component finishes rendering. |

**Attaching events at initialization:**

```typescript
import { ProgressButton, ProgressEventArgs } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  enableProgress: true,
  begin: (args: ProgressEventArgs): void => { /* ... */ },
  progress: (args: ProgressEventArgs): void => { /* ... */ },
  end: (args: ProgressEventArgs): void => { /* ... */ },
  fail: (args: Event): void => { /* ... */ },
  created: (): void => { /* ... */ }
});
progressBtn.appendTo('#progressbtn');
```

**Attaching events via addEventListener:**

```typescript
progressBtn.addEventListener('begin', (args: ProgressEventArgs): void => {
  console.log('Started at: ' + args.percent + '%');
});
progressBtn.addEventListener('end', (args: ProgressEventArgs): void => {
  console.log('Completed');
});
```
