# How-To Patterns

## Table of Contents
- [Hide the Spinner](#hide-the-spinner)
- [Change Text and Styles During Progress](#change-text-and-styles-during-progress)
- [Customize Progress Direction with cssClass](#customize-progress-direction-with-cssclass)

---

## Hide the Spinner

Add the `e-hide-spinner` CSS class to `cssClass` to remove the spinner and show only the background filler progress animation.

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

let progressBtn: ProgressButton = new ProgressButton({
  content: 'Progress',
  enableProgress: true,
  cssClass: 'e-hide-spinner'
});
progressBtn.appendTo('#progressbtn');
```

> Use `e-hide-spinner` whenever you want clean progress-only visuals, such as a download bar or a file upload indicator.

---

## Change Text and Styles During Progress

Modify `content` and `cssClass` inside the `begin` and `end` event handlers, then call `dataBind()` to apply the changes immediately.

The pattern:
1. On `begin`: change content to an "in-progress" label and apply an active style class
2. On `end`: change content to a "done" label and apply a success/reset class, then optionally restore to the original state after a short delay

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

let uploadBtn: ProgressButton = new ProgressButton({
  content: 'Upload',
  cssClass: 'e-hide-spinner',
  enableProgress: true,
  duration: 4000,
  begin: () => {
    uploadBtn.content = 'Uploading...';
    uploadBtn.cssClass = 'e-hide-spinner e-info';
    uploadBtn.dataBind();
  },
  end: () => {
    uploadBtn.content = 'Success';
    uploadBtn.cssClass = 'e-hide-spinner e-success';
    uploadBtn.dataBind();
    setTimeout(() => {
      uploadBtn.content = 'Upload';
      uploadBtn.cssClass = 'e-hide-spinner';
      uploadBtn.dataBind();
    }, 500);
  }
});
uploadBtn.appendTo('#progressbtn');
```

**Available style classes for `cssClass`:**

| Class | Appearance |
|-------|-----------|
| `e-info` | Blue — in-progress indicator |
| `e-success` | Green — success state |
| `e-warning` | Yellow — warning state |
| `e-danger` | Red — error state |
| `e-hide-spinner` | Hides the spinner |

> Always call `dataBind()` after changing `content` or `cssClass` programmatically so the DOM updates immediately.

---

## Customize Progress Direction with cssClass

Use CSS utility classes in `cssClass` to change the direction of the background filler:

| Class | Effect |
|-------|--------|
| *(none)* | Default: left-to-right horizontal fill |
| `e-vertical` | Top-to-bottom vertical fill |
| `e-progress-top` | Bottom-to-top fill (progress bar at the top) |
| Custom class | Any reverse/custom CSS animation |

**TypeScript — all three variants:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

let verticalProgress: ProgressButton = new ProgressButton({
  content: 'Vertical Progress',
  enableProgress: true,
  cssClass: 'e-hide-spinner e-vertical',
  duration: 4000
});
verticalProgress.appendTo('#vertical');

let topProgress: ProgressButton = new ProgressButton({
  content: 'Progress Top',
  enableProgress: true,
  cssClass: 'e-hide-spinner e-progress-top',
  duration: 4000
});
topProgress.appendTo('#top');

let reverseProgress: ProgressButton = new ProgressButton({
  content: 'Reverse Progress',
  enableProgress: true,
  cssClass: 'e-hide-spinner e-reverse-progress',
  duration: 4000
});
reverseProgress.appendTo('#reverse');
```
