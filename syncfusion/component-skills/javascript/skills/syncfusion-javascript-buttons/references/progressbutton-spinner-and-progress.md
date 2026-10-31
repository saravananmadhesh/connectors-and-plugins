# Spinner and Progress

## Table of Contents
- [Spinner Position](#spinner-position)
- [Spinner Size](#spinner-size)
- [Spinner Template](#spinner-template)
- [Content Animation](#content-animation)
- [Change Progress Step](#change-progress-step)
- [Change Progress Dynamically](#change-progress-dynamically)
- [Start and Stop Methods](#start-and-stop-methods)

---

## Spinner Position

Use `spinSettings.position` to place the spinner relative to the button text. Accepted values: `Left` (default), `Right`, `Top`, `Bottom`, `Center`.

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  spinSettings: { position: 'Right' }
});
progressBtn.appendTo('#progressbtn');
```

**All positions:**

| Value | Description |
|-------|-------------|
| `Left` | Spinner to the left of text (default) |
| `Right` | Spinner to the right of text |
| `Top` | Spinner above text |
| `Bottom` | Spinner below text |
| `Center` | Spinner centered over button content |

> Use `Center` when you want a loading overlay effect with animation on the content.

---

## Spinner Size

Use `spinSettings.width` to set the spinner diameter in pixels.

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  spinSettings: { position: 'Right', width: 20 }
});
progressBtn.appendTo('#progressbtn');
```

---

## Spinner Template

Replace the default spinner with custom HTML using `spinSettings.template`. This lets you use any icon, SVG, or CSS animation as the loading indicator.

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  spinSettings: {
    position: 'Right',
    width: 20,
    template: '<div class="template"></div>'
  }
});
progressBtn.appendTo('#progressbtn');
```

Style the template element in CSS:
```css
.template {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Content Animation

Animate the button's text content during progress using `animationSettings`. The animation plays while the progress filler is active.

**Properties:**
- `effect` — animation type: `None`, `SlideLeft`, `SlideRight`, `SlideUp`, `SlideDown`, `ZoomIn`, `ZoomOut`
- `duration` — animation duration in milliseconds
- `easing` — CSS timing function (e.g., `linear`, `ease`, `ease-in-out`)

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Slide Left',
  enableProgress: true,
  animationSettings: { effect: 'SlideLeft', duration: 500, easing: 'linear' },
  spinSettings: { position: 'Center' }
});
progressBtn.appendTo('#progressbtn');
```

> Setting `spinSettings.position` to `Center` works well with content animations, since the spinner is overlaid rather than beside the text.

---

## Change Progress Step

Control how often the progress event fires by setting `args.step` inside the `begin` event. The step value defines the percentage increment between each `progress` event.

Default step is determined by the `duration`. Setting `step: 20` makes the progress fire at 0%, 20%, 40%, 60%, 80%, 100%.

**TypeScript:**
```typescript
import { ProgressButton, ProgressEventArgs } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Progress Step',
  enableProgress: true,
  cssClass: 'e-hide-spinner',
  begin: (args: ProgressEventArgs): void => {
    args.step = 20;
  }
});
progressBtn.appendTo('#progressbtn');
```

> `e-hide-spinner` removes the spinner so only the progress filler is visible.

---

## Change Progress Dynamically

Modify `args.percent` inside the `progress` event to jump the progress to a specific value. Useful for async operations where completion is non-linear.

**TypeScript:**
```typescript
import { ProgressButton, ProgressEventArgs } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Progress',
  enableProgress: true,
  duration: 15000,
  cssClass: 'e-hide-spinner',
  begin: (args: ProgressEventArgs): void => {
    progressBtn.content = 'Progress ' + args.percent + '%';
    progressBtn.dataBind();
  },
  progress: (args: ProgressEventArgs): void => {
    progressBtn.content = 'Progress ' + args.percent + '%';
    progressBtn.dataBind();
    if (args.percent === 40) {
      args.percent = 90;
    }
  },
  end: (args: ProgressEventArgs): void => {
    progressBtn.content = 'Progress ' + args.percent + '%';
    progressBtn.dataBind();
  }
});
progressBtn.appendTo('#progressbtn');
```

> `dataBind()` applies property changes (`content`, `cssClass`, etc.) to the rendered component immediately.

---

## Start and Stop Methods

Use `start()` and `stop()` to programmatically resume and pause the progress. This is useful for toggle-style download/upload buttons.

- `start(percent?)` — starts (or resumes) progress from the given percent (optional)
- `stop()` — pauses progress at the current percent

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Download',
  enableProgress: true,
  duration: 4000,
  iconCss: 'e-btn-sb-icon e-download',
  cssClass: 'e-hide-spinner',
  end: (): void => {
    progressBtn.content = 'Download';
    progressBtn.iconCss = 'e-btn-sb-icon e-download';
    progressBtn.dataBind();
  }
});
progressBtn.appendTo('#progressbtn');

progressBtn.element.addEventListener('click', clickHandler);

function clickHandler(): void {
  if (progressBtn.content === 'Download') {
    progressBtn.content = 'Pause';
    progressBtn.iconCss = 'e-btn-sb-icon e-pause';
    progressBtn.dataBind();
  } else if (progressBtn.content === 'Pause') {
    progressBtn.content = 'Resume';
    progressBtn.iconCss = 'e-btn-sb-icon e-play';
    progressBtn.dataBind();
    progressBtn.stop();
  } else if (progressBtn.content === 'Resume') {
    progressBtn.content = 'Pause';
    progressBtn.iconCss = 'e-btn-sb-icon e-pause';
    progressBtn.dataBind();
    progressBtn.start();
  }
}
```
