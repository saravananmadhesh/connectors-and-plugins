# Events

## Table of Contents
- [Overview](#overview)
- [begin Event](#begin-event)
- [progress Event](#progress-event)
- [end Event](#end-event)
- [fail Event](#fail-event)
- [created Event](#created-event)
- [Tracing All Events](#tracing-all-events)

---

## Overview

ProgressButton fires lifecycle events at each stage of the progress cycle. These events let you update the UI, modify progress values, and respond to completion or failure.

| Event | Trigger | Use case |
|-------|---------|---------|
| `begin` | Progress starts | Set initial content/class, configure step |
| `progress` | Each step interval | Update live percentage, jump progress |
| `end` | Progress completes (100%) | Reset or show success state |
| `fail` | Progress is incomplete/interrupted | Show error state |
| `created` | Component renders | Post-initialization setup |

All events except `fail` and `created` receive a `ProgressEventArgs` object.

---

## begin Event

Fires when the button is clicked and progress starts. Use it to update the button content or modify the step.

**TypeScript:**
```typescript
import { ProgressButton, ProgressEventArgs } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Upload',
  enableProgress: true,
  begin: (args: ProgressEventArgs): void => {
    console.log('Progress started at: ' + args.percent + '%');
    // Set custom step (progress fires every 20%)
    args.step = 20;
  }
});
progressBtn.appendTo('#progressbtn');
```

**`ProgressEventArgs` available in `begin`:**
- `args.percent` — current progress percentage (0 at begin)
- `args.step` — writable; sets the progress increment interval
- `args.currentDuration` — elapsed duration in milliseconds
- `args.name` — event name (`"begin"`)

---

## progress Event

Fires at each step interval during progress. Use it to update a live percentage display or to dynamically jump the progress to a new value.

**TypeScript:**
```typescript
import { ProgressButton, ProgressEventArgs } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Processing',
  enableProgress: true,
  cssClass: 'e-hide-spinner',
  progress: (args: ProgressEventArgs): void => {
    progressBtn.content = args.percent + '% complete';
    progressBtn.dataBind();
    // Jump from 40% to 90% dynamically
    if (args.percent === 40) {
      args.percent = 90;
    }
  }
});
progressBtn.appendTo('#progressbtn');
```

**`ProgressEventArgs` available in `progress`:**
- `args.percent` — writable; current or overridden progress percentage
- `args.step` — interval between firings
- `args.currentDuration` — elapsed duration
- `args.name` — event name (`"progress"`)

---

## end Event

Fires when the progress reaches 100% and the animation completes. Use it to show a success state and reset the button.

**TypeScript:**
```typescript
import { ProgressButton, ProgressEventArgs } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Upload',
  enableProgress: true,
  cssClass: 'e-hide-spinner',
  end: (args: ProgressEventArgs): void => {
    progressBtn.content = 'Done!';
    progressBtn.cssClass = 'e-hide-spinner e-success';
    progressBtn.dataBind();
    setTimeout((): void => {
      progressBtn.content = 'Upload';
      progressBtn.cssClass = 'e-hide-spinner';
      progressBtn.dataBind();
    }, 1500);
  }
});
progressBtn.appendTo('#progressbtn');
```

---

## fail Event

Fires when the progress is incomplete (e.g., interrupted before completing). The event argument is a standard `Event`, not `ProgressEventArgs`.

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  enableProgress: true,
  fail: (args: Event): void => {
    console.log('Progress failed: ' + args.type);
  }
});
progressBtn.appendTo('#progressbtn');
```

---

## created Event

Fires once after the component finishes rendering. Use it for post-initialization configuration.

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  created: (): void => {
    console.log('ProgressButton rendered');
  }
});
progressBtn.appendTo('#progressbtn');
```

---

## Tracing All Events

A common pattern is to log all events to a visible element for debugging or demonstration:

**TypeScript:**
```typescript
import { ProgressButton, ProgressEventArgs } from '@syncfusion/ej2-splitbuttons';
import { Button } from '@syncfusion/ej2-buttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Progress',
  enableProgress: true,
  begin: (args: ProgressEventArgs): void => { updateEventLog(args); },
  end: (args: ProgressEventArgs): void => { updateEventLog(args); },
  progress: (args: ProgressEventArgs): void => { updateEventLog(args); },
  fail: (args: Event): void => { updateEventLog(args); }
});
progressBtn.appendTo('#progressbtn');

// Clear button
const clearBtn: Button = new Button({ cssClass: 'e-small' });
clearBtn.appendTo('#clear');

clearBtn.element.onclick = (): void => {
  const logElem: HTMLElement = document.getElementById('eventLog') as HTMLElement;
  logElem.innerHTML = '';
};

function updateEventLog(args: any): void {
  const logElem: HTMLElement = document.getElementById('eventLog') as HTMLElement;
  logElem.insertAdjacentHTML('beforeend', args.name + ' event triggered.<br/>');
}
```

```html
<button id="progressbtn"></button>
<button id="clear">Clear</button>
<div id="eventLog"></div>
```
