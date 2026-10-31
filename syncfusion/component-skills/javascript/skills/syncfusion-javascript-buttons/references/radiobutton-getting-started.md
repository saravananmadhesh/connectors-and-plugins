# Getting Started — Syncfusion JavaScript RadioButton (TypeScript)

## Table of Contents
- [Dependencies](#dependencies)
- [Setup Development Environment](#setup-development-environment)
- [Add Syncfusion Packages](#add-syncfusion-packages)
- [Import CSS Styles](#import-css-styles)
- [Add RadioButton to the Project](#add-radiobutton-to-the-project)
- [Run the Application](#run-the-application)
- [Change the RadioButton State](#change-the-radiobutton-state)

---

## Dependencies

The following packages are required to use the RadioButton component in a TypeScript application:

```
|-- @syncfusion/ej2-buttons
    |-- @syncfusion/ej2-base
```

Install via npm:

```bash
npm install @syncfusion/ej2-buttons @syncfusion/ej2-base
```

---

## Setup Development Environment

Clone the Syncfusion JavaScript EJ2 quickstart project (webpack-based) and navigate into it:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
```

> Requires Node.js v14.15.0 or higher. The project uses `webpack.config.js` and `webpack-cli`.

---

## Add Syncfusion Packages

The quickstart project includes `@syncfusion/ej2` in `package.json`. Install all dependencies:

```bash
npm install
```

To install only the required packages individually:

```bash
npm install @syncfusion/ej2-buttons @syncfusion/ej2-base
```

---

## Import CSS Styles

In `~/src/styles/styles.css`, import the Material theme for both the base and buttons packages:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/radio-button/index.css";
```

Other available themes: `bootstrap5.css`, `fabric.css`, `highcontrast.css`, `tailwind.css`.

---

## Add RadioButton to the Project

**Step 1:** Add an `<input type="radio">` element to `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Essential JS 2 - RadioButton</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <div>
    <!-- element which is going to render -->
    <input id="element" type="radio" />
  </div>
</body>
</html>
```

**Step 2:** Import the `RadioButton` class and initialize it in `src/app/app.ts`:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';

// Initialize RadioButton component
let radiobutton: RadioButton = new RadioButton({ label: 'Default' });

// Render initialized RadioButton
radiobutton.appendTo('#element');
```

---

## Run the Application

```bash
npm start
```

The application opens in the browser. A basic RadioButton labeled "Default" renders on the page.

---

## Basic RadioButton Group

A typical use case is rendering a group of RadioButtons sharing the same `name` attribute so only one can be selected at a time:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// First option (unchecked by default)
let radiobutton: RadioButton = new RadioButton({ label: 'Option 1', name: 'default' });
radiobutton.appendTo('#element1');

// Second option (checked by default)
radiobutton = new RadioButton({ label: 'Option 2', name: 'default', checked: true });
radiobutton.appendTo('#element2');
```

```html
<input id="element1" type="radio" />
<input id="element2" type="radio" />
```

---

## Change the RadioButton State

The RadioButton has two visual states: **Checked** and **Unchecked**.

Use the `checked` property to set the initial state:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Checked state — inner circle visible
let rb1: RadioButton = new RadioButton({ label: 'Option 1', name: 'state', checked: true });
rb1.appendTo('#radiobutton1');

// Unchecked state (default)
let rb2: RadioButton = new RadioButton({ label: 'Option 2', name: 'state' });
rb2.appendTo('#radiobutton2');
```

> **Note:** Only one RadioButton in a group (same `name`) can be checked at a time. Setting `checked: true` on one automatically unchecks the others when the user interacts.

---

## Key Points

- Always set the same `name` attribute on all RadioButtons in a group — this groups them so only one can be selected.
- Call `appendTo()` after creating the instance — the component is not rendered until mounted.
- `enableRipple(true)` from `ej2-base` adds a Material-style ripple animation on click.
- Use `checked: true` to pre-select a RadioButton on initial render.
