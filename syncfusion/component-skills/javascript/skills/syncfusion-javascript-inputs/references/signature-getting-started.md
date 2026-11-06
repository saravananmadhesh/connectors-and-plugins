# Getting Started – Syncfusion TypeScript Signature

## Table of Contents
- [Dependencies](#dependencies)
- [Project Setup](#project-setup)
- [Install Packages](#install-packages)
- [Import CSS Theme](#import-css-theme)
- [Add HTML Canvas](#add-html-canvas)
- [Initialize the Component](#initialize-the-component)
- [Run the Application](#run-the-application)
- [Canvas Dimensions](#canvas-dimensions)

---

## Dependencies

The Signature component requires the following packages:

```
@syncfusion/ej2-inputs
  └── @syncfusion/ej2-base
```

---

## Project Setup

Clone the Syncfusion webpack quickstart to get a preconfigured TypeScript environment:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
```

The project includes `webpack.config.js` and requires **Node.js v14.15.0** or higher.

---

## Install Packages

The quickstart already lists `@syncfusion/ej2` in `package.json`. Install all dependencies:

```bash
npm install
```

To install only the inputs package (for minimal projects):

```bash
npm install @syncfusion/ej2-inputs
```

---

## Import CSS Theme

Import a built-in theme in `src/styles/styles.css`. The **Material** theme is recommended as a starting point:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/signature/index.css";
```

Other available themes: `fabric`, `bootstrap`, `bootstrap4`, `highcontrast`, `tailwind`.

---

## Add HTML Canvas

The Signature component renders into an HTML `<canvas>` element. Add a canvas tag to `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Syncfusion EJ2 - Signature</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
</head>
<body>
  <div id="signature-control">
    <canvas id="signature"></canvas>
  </div>
</body>
</html>
```

---

## Initialize the Component

Import and instantiate the `Signature` class in `src/app/app.ts`:

```ts
import { Signature } from '@syncfusion/ej2-inputs';

// Initialize with CSS selector
let signature: Signature = new Signature({}, '#signature');
```

Alternatively, use `appendTo` for explicit mounting:

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({});
signature.appendTo('#signature');
```

Both forms are equivalent. Using a CSS selector in the constructor is the more concise approach.

---

## Run the Application

```bash
npm start
```

Open the application in the browser. The Signature canvas will appear, ready for mouse or touch input.

---

## Canvas Dimensions

The Signature component inherits the canvas element's `width` and `height` attributes. When no dimensions are specified, the browser uses the default canvas size of **300 × 150 pixels**.

To set a specific size, apply inline styles or CSS to the canvas element:

```html
<canvas id="signature" style="width: 600px; height: 300px;"></canvas>
```

Or use CSS:

```css
#signature {
  width: 600px;
  height: 300px;
  border: 1px solid #ccc;
}
```
