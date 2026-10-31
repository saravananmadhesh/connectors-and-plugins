# Getting Started with Syncfusion EJ2 JavaScript Skeleton

This guide walks through installing, configuring, and rendering your first `Skeleton` component in a TypeScript/JavaScript application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Adding CSS References](#adding-css-references)
- [Basic Skeleton Setup](#basic-skeleton-setup)
- [Running the Application](#running-the-application)
- [Minimal Examples](#minimal-examples)
- [Dimension Rules](#dimension-rules)

---

## Prerequisites

- Node.js 14+
- A Vite or webpack-based TypeScript/JavaScript project
- TypeScript 4.0+ (for TypeScript projects)

Create a new Vite-based app:

```bash
# TypeScript
npm create vite@latest my-app -- --template vanilla-ts
cd my-app
npm install @syncfusion/ej2-notifications --save
npm run dev

# JavaScript
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install @syncfusion/ej2-notifications --save
npm run dev
```

---

## Installation

Install the Syncfusion notifications package, which includes the Skeleton component:

```bash
npm install @syncfusion/ej2-notifications@33.x.x --save
```

---

## Adding CSS References

Add the required CSS imports in your global stylesheet:

```css
/* src/styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/skeleton/index.css";
```

Then import the stylesheet in your entry file:

```typescript
// src/main.ts
import './styles.css';
```

Other available themes: `material.css`, `bootstrap5.css`, `fluent.css`, `fabric.css`

---

## Basic Skeleton Setup

Import `Skeleton` from the notifications package and create an instance. At minimum, provide a `height` for text-style skeletons:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';
import './styles.css';

let skeleton: Skeleton = new Skeleton({
  height: '15px',
  width: '100%'
});
skeleton.appendTo('#skeleton');
```

**HTML Target Element:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Skeleton Demo</title>
</head>
<body>
  <div id="skeleton"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

---

## Running the Application

Start the Vite development server:

```bash
npm run dev
```

The app opens in the browser. Skeleton placeholders render immediately with the default Wave shimmer animation.

---

## Minimal Examples

### Text Line Placeholder (Default)

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let textSkeleton: Skeleton = new Skeleton({
  height: '15px',
  width: '80%'
});
textSkeleton.appendTo('#text-skeleton');
```

### Avatar Placeholder

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let avatarSkeleton: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px'
});
avatarSkeleton.appendTo('#avatar-skeleton');
```

### Image Placeholder

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let imageSkeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px'
});
imageSkeleton.appendTo('#image-skeleton');
```

### Small Icon Placeholder

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let iconSkeleton: Skeleton = new Skeleton({
  shape: 'Square',
  width: '32px'
});
iconSkeleton.appendTo('#icon-skeleton');
```

---

## Dimension Rules

| Shape | Width | Height |
|-------|-------|--------|
| `Text` (default) | Optional | Required |
| `Rectangle` | Required | Required |
| `Circle` | Required (used as diameter) | Not needed |
| `Square` | Required (used as side length) | Not needed |

> For `Circle` and `Square`, `width` is used as the single dimension. Height is ignored.

---

## Complete Working Example

```typescript
// src/main.ts
import { Skeleton } from '@syncfusion/ej2-notifications';
import './styles.css';

// Create a text-line skeleton
let skeleton: Skeleton = new Skeleton({
  height: '15px',
  width: '100%'
});
skeleton.appendTo('#skeleton');
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Skeleton Component Demo</title>
</head>
<body>
  <div id="skeleton"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

---

## Loading State Pattern

Common pattern: Show skeleton while content is loading, then hide it when content is ready.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let isLoading: boolean = true;

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  visible: isLoading
});
skeleton.appendTo('#content-skeleton');

// Simulate async data loading
setTimeout(() => {
  isLoading = false;
  skeleton.hide();
  // Show actual content
  document.getElementById('actual-content')!.style.display = 'block';
}, 3000);
```

---

## Gotchas

- **Missing styles**: If the skeleton appears unstyled, ensure both `ej2-base` and `ej2-notifications` CSS files are imported before the component initializes.
- **Width required for shapes**: For `Circle` and `Square` shapes, you must provide a `width` value.
- **Height required for Text and Rectangle**: For `Text` (default) and `Rectangle` shapes, you must provide a `height` value.
- **DOM required**: The component requires a browser environment with a DOM.

---

## See Also

- [skeleton-shapes.md](./skeleton-shapes.md) - Shape types and dimensions
- [skeleton-shimmer-effect.md](./skeleton-shimmer-effect.md) - Shimmer animations
- [skeleton-styles.md](./skeleton-styles.md) - Customization and visibility
- [skeleton-accessibility.md](./skeleton-accessibility.md) - Accessibility guidelines
- [skeleton-api.md](./skeleton-api.md) - Complete API reference
