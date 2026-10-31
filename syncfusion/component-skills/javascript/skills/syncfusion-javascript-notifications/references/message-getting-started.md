# Getting Started with Syncfusion EJ2 JavaScript Message

This guide walks through installing, configuring, and rendering your first `Message` component in a TypeScript/JavaScript application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Adding CSS](#adding-css)
- [Basic Usage](#basic-usage)
- [Content: Property vs HTML](#content-property-vs-html)
- [Running the Application](#running-the-application)
- [Gotchas](#gotchas)

---

## Prerequisites

- Node.js 14+
- A Vite or webpack-based TypeScript/JavaScript project
- TypeScript 4.0+ (for TypeScript projects)

Create a new Vite-based TypeScript app:

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

Install the Syncfusion notifications package, which includes the Message component:

```bash
npm install @syncfusion/ej2-notifications@33.x.x --save
```

---

## Adding CSS

Import the required stylesheets in your global stylesheet. The `ej2-base` styles provide foundational theme tokens; the notifications styles provide component-specific styling:

```css
/* src/styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/message/index.css";
```

Then import the stylesheet in your entry file:

```typescript
// src/main.ts
import './styles.css';
```

Other available themes: `material.css`, `bootstrap5.css`, `fluent.css`, `fabric.css`

---

## Basic Usage

Import `Message` from the notifications package and create an instance:

```typescript
import { Message } from '@syncfusion/ej2-notifications';
import './styles.css';

let msg: Message = new Message({
  content: 'Please read the comments carefully'
});
msg.appendTo('#msg');
```

**HTML Target Element:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Message Demo</title>
</head>
<body>
  <div id="msg"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

---

## Content: Property vs HTML

The `content` property and inner HTML are both supported for message text:

```typescript
// Using the content property (string)
let msg1: Message = new Message({
  content: 'Your message has been sent successfully'
});
msg1.appendTo('#msg1');

// Using inner HTML
let msg2: Message = new Message();
msg2.appendTo('#msg2');
document.getElementById('msg2')!.innerHTML = 'Your message has been sent successfully';
```

For rich/templated content, pass a function or HTML string to `content` — see [message-customization.md](./message-customization.md) for details.

---

## Running the Application

Start the Vite development server:

```bash
npm run dev
```

The browser will open with your message displayed immediately. No additional initialization is needed beyond the CSS import and component instantiation.

---

## Complete Working Example

```typescript
// src/main.ts
import { Message } from '@syncfusion/ej2-notifications';
import './styles.css';

// Create a basic message
let msg: Message = new Message({
  content: 'Please read the comments carefully',
  severity: 'Info',
  variant: 'Text'
});
msg.appendTo('#msg');
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Message Component Demo</title>
</head>
<body>
  <div id="msg"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

---

## Gotchas

- **Missing styles**: If the message appears unstyled, ensure both `ej2-base` and `ej2-notifications` CSS files are imported before the component initializes.
- **DOM required**: The component requires a DOM environment. Ensure it only runs in browser context, not in SSR environments (Next.js server-side, Node.js CLI).
- **AppendTo required**: The component must be appended to a DOM element using `appendTo()` to render. Creating an instance without appending it will not display anything.
- **CSS class conflicts**: If you use custom `cssClass`, avoid conflicts with Syncfusion's internal classes (prefixed with `e-`).
