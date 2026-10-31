# Predefined Dialog Animation

The Syncfusion Predefined Dialog supports animation effects for smooth open and close transitions.

## Table of Contents
- [Animation Settings](#animation-settings)
- [Available Effects](#available-effects)
- [Alert with Animation](#alert-with-animation)
- [Confirm with Animation](#confirm-with-animation)
- [Prompt with Animation](#prompt-with-animation)
- [Disable Animation](#disable-animation)

---

## Animation Settings

The `animationSettings` property accepts an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `effect` | `string` | Animation effect name |
| `duration` | `number` | Animation duration in milliseconds |
| `delay` | `number` | Delay before animation starts in milliseconds |

---

## Available Effects

| Effect | Description |
|--------|-------------|
| `FadeIn` / `FadeOut` | Fade in/out effect (default) |
| `ZoomIn` / `ZoomOut` | Zoom in/out effect |
| `FlipXDownIn` / `FlipXDownOut` | Flip with X-axis down |
| `FlipXUpIn` / `FlipXUpOut` | Flip with X-axis up |
| `FlipYLeftIn` / `FlipYLeftOut` | Flip with Y-axis left |
| `FlipYRightIn` / `FlipYRightOut` | Flip with Y-axis right |
| `SlideBottomIn` / `SlideBottomOut` | Slide from/to bottom |
| `SlideTopIn` / `SlideTopOut` | Slide from/to top |
| `SlideLeftIn` / `SlideLeftOut` | Slide from/to left |
| `SlideRightIn` / `SlideRightOut` | Slide from/to right |
| `None` | No animation |

---

## Alert with Animation

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Low Battery',
  content: '10% of battery remaining',
  width: '250px',
  animationSettings: {
    effect: 'ZoomIn',
    duration: 400,
    delay: 0
  },
  okButton: { click: () => dialogObj.hide() }
});
```

---

## Confirm with Animation

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Confirm Action',
  content: 'Are you sure you want to proceed?',
  width: '300px',
  animationSettings: {
    effect: 'FadeIn',
    duration: 600,
    delay: 100
  },
  okButton: { 
    text: 'Yes',
    click: () => dialogObj.hide() 
  },
  cancelButton: { 
    text: 'No',
    click: () => dialogObj.hide() 
  }
});
```

---

## Prompt with Animation

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Enter Name',
  content: '<input id="nameInput" class="e-input" placeholder="Your name" />',
  animationSettings: {
    effect: 'SlideBottomIn',
    duration: 500,
    delay: 0
  },
  okButton: {
    text: 'Submit',
    click: () => {
      const name: string = (document.getElementById('nameInput') as HTMLInputElement).value;
      console.log('Name:', name);
      dialogObj.hide();
    }
  },
  cancelButton: { click: () => dialogObj.hide() }
});
```

---

## Custom Duration and Delay

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Slow Animation',
  content: 'Takes longer to appear',
  animationSettings: {
    effect: 'FadeIn',
    duration: 1500,  // 1.5 seconds
    delay: 500       // 0.5 second delay
  },
  okButton: { click: () => dialogObj.hide() }
});
```

---

## Disable Animation

Set `effect: 'None'` to disable animation:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'No Animation',
  content: 'Appears and disappears instantly',
  animationSettings: {
    effect: 'None'
  },
  okButton: { click: () => dialogObj.hide() }
});
```

---

## Slide Effects

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

// Slide from top
let topDialog: any = DialogUtility.alert({
  title: 'Slide from Top',
  content: 'Slides down from top',
  animationSettings: { effect: 'SlideTopIn', duration: 500 },
  okButton: { click: () => topDialog.hide() }
});

// Slide from bottom
let bottomDialog: any = DialogUtility.alert({
  title: 'Slide from Bottom',
  content: 'Slides up from bottom',
  animationSettings: { effect: 'SlideBottomIn', duration: 500 },
  okButton: { click: () => bottomDialog.hide() }
});

// Slide from left
let leftDialog: any = DialogUtility.alert({
  title: 'Slide from Left',
  content: 'Slides right from left',
  animationSettings: { effect: 'SlideLeftIn', duration: 500 },
  okButton: { click: () => leftDialog.hide() }
});

// Slide from right
let rightDialog: any = DialogUtility.alert({
  title: 'Slide from Right',
  content: 'Slides left from right',
  animationSettings: { effect: 'SlideRightIn', duration: 500 },
  okButton: { click: () => rightDialog.hide() }
});
```

---

## Flip Effects

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Flip Animation',
  content: 'Flips into view',
  animationSettings: {
    effect: 'FlipYRightIn',
    duration: 700,
    delay: 0
  },
  okButton: { click: () => dialogObj.hide() }
});
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animationSettings.effect` | `string` | `'FadeIn'` | Animation effect |
| `animationSettings.duration` | `number` | `400` | Duration in ms |
| `animationSettings.delay` | `number` | `0` | Delay in ms |

For complete API details, see [predefineddialog-api.md](./predefineddialog-api.md).
