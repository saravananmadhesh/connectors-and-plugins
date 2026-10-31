# Getting Started

## Table of Contents
- [Dependencies](#dependencies)
- [ES5 Local Setup](#es5-local-setup)
- [ES5 CDN Setup](#es5-cdn-setup)
- [TypeScript Setup](#typescript-setup)
- [Initialize ProgressButton](#initialize-progressbutton)
- [Enable Progress](#enable-progress)

---

## Dependencies

The ProgressButton component lives in `@syncfusion/ej2-splitbuttons` and requires these packages:

```
@syncfusion/ej2-splitbuttons
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-popups
  │     └── @syncfusion/ej2-buttons
```

---

## ES5 Local Setup

**Step 1:** Create a root folder (e.g., `my-app`) and a `resources/` subfolder for scripts and styles.

**Step 2:** Copy the global scripts and styles from the Essential Studio installation:

| File | Path pattern |
|------|-------------|
| Dependency styles | `ej2-base/styles/material.css`, `ej2-buttons/styles/material.css`, `ej2-popups/styles/material.css` |
| Control styles | `ej2-splitbuttons/styles/material.css` |
| Dependency scripts | `ej2-base.min.js`, `ej2-buttons.min.js`, `ej2-popups.min.js` |
| Control script | `ej2-splitbuttons.min.js` |

**Step 3:** Create `index.html`:

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Essential JS 2 - ProgressButton</title>
    <!-- Dependency styles -->
    <link href="resources/base/material.css" rel="stylesheet" />
    <link href="resources/buttons/material.css" rel="stylesheet" />
    <link href="resources/popups/material.css" rel="stylesheet" />
    <!-- Control style -->
    <link href="resources/splitbuttons/material.css" rel="stylesheet" />
    <!-- Dependency scripts -->
    <script src="resources/base/ej2-base.min.js"></script>
    <script src="resources/buttons/ej2-buttons.min.js"></script>
    <script src="resources/popups/ej2-popups.min.js"></script>
    <!-- Control script -->
    <script src="resources/splitbuttons/ej2-splitbuttons.min.js"></script>
  </head>
  <body>
    <button id="progressbtn"></button>
    <script src="index.js"></script>
  </body>
</html>
```

**index.ts:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({ content: 'Spin Left' });
progressBtn.appendTo('#progressbtn');
```

> Use the [Custom Resource Generator (CRG)](https://crg.syncfusion.com/) to create combined script/style bundles for only the controls you need.

---

## ES5 CDN Setup

Reference scripts and styles from the Syncfusion CDN — no local install required.

**CDN URL patterns:**
- Script: `https://cdn.syncfusion.com/ej2/{PACKAGE_NAME}/dist/global/{PACKAGE_NAME}.min.js`
- Style: `https://cdn.syncfusion.com/ej2/{PACKAGE_NAME}/styles/material.css`

**Complete index.html with CDN:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>ProgressButton - CDN</title>
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-popups/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/material.css" rel="stylesheet" />
  <script src="https://cdn.syncfusion.com/ej2/ej2-base/dist/global/ej2-base.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/ej2-buttons/dist/global/ej2-buttons.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/ej2-popups/dist/global/ej2-popups.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/dist/global/ej2-splitbuttons.min.js"></script>
</head>
<body>
  <button id="progressbtn"></button>
  <script src="bundle.js"></script>
</body>
</html>
```

**index.ts:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({ content: 'Spin Left' });
progressBtn.appendTo('#progressbtn');
```

---

## TypeScript Setup

**Step 1:** Clone the Syncfusion webpack quickstart:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
npm install
```

**Step 2:** Import CSS in `~/src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/progress-button/index.css";
```

**Step 3:** Add the button element in `src/index.html`:

```html
<body>
  <button id="element"></button>
</body>
```

**Step 4:** Initialize in `src/app/app.ts`:

```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

let progressBtn: ProgressButton = new ProgressButton({ content: 'Spin Left' });
progressBtn.appendTo('#element');
```

**Step 5:** Run the app:

```bash
npm start
```

> ProgressButton supports all the same styles, types, and sizes as the standard Button. It also supports `top` and `bottom` icon positions.

---

## Initialize ProgressButton

**TypeScript — minimal:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({ content: 'Submit' });
progressBtn.appendTo('#progressbtn');
```

The HTML element must be a `<button>` tag with the target `id`:
```html
<button id="progressbtn"></button>
```

---

## Enable Progress

Set `enableProgress: true` to display the background filler UI that fills from left to right as the operation runs.

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(false);

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  enableProgress: true
});
progressBtn.appendTo('#progressbtn');
```

The default `duration` is **2000ms**. Set `duration` (in milliseconds) to control how long the progress animation takes:

```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  enableProgress: true,
  duration: 4000   // 4 seconds
});
progressBtn.appendTo('#progressbtn');
```
