# Appearance and Theming

## Table of Contents
- [Overview](#overview)
- [CSS Variables in Themes](#css-variables-in-themes)
- [Modern Themes](#modern-themes)
- [Accessing Themes](#accessing-themes)
- [Dark Mode Switching](#dark-mode-switching)
- [Color Customization](#color-customization)
- [Size Modes](#size-modes)
- [Icons Library](#icons-library)
- [Icon Sizing](#icon-sizing)
- [Theme Studio](#theme-studio)

## Overview

Syncfusion controls provide comprehensive theming capabilities through CSS variables and built-in themes. Modern themes include Material 3, Fluent 2, Bootstrap 5.3, and Tailwind 3.4, all available with light and dark variants. These themes use CSS variables for easy color customization and seamless light/dark mode switching.

## CSS Variables in Themes

CSS variables, also known as custom properties, are entities defined by CSS authors that contain specific values to be reused throughout a document. CSS variables are identified by names that begin with two hyphens (--) followed by a unique identifier.

### How CSS Variables Work

CSS variables can be assigned any valid CSS value, such as colors, lengths, or fonts. To retrieve the value of a CSS variable, use the var() function:

```css
:root {
  --primary-color: #6200ee;
}

.e-button {
  background-color: var(--primary-color);
}
```

### Benefits of CSS Variables

- **Dynamic color changes**: Modify colors in real-time using JavaScript
- **Theme switching**: Easily switch between light and dark modes
- **Maintainability**: Centralized color management
- **Consistent styling**: Ensure uniform appearance across all controls

## Built-in Themes

Syncfusion JavaScript controls provide multiple professionally designed themes out-of-the-box.

### Available Themes

| Theme Name | Style Sheet | Description |
|------------|-------------|-------------|
| **Tailwind 3.4** | `tailwind3.css` | Tailwind CSS design system v3.4 |
| **Tailwind 3.4 Dark** | `tailwind3-dark.css` | Dark variant of Tailwind 3.4 |
| **Bootstrap 5.3** | `bootstrap5.3.css` | Bootstrap v5.3 design language |
| **Bootstrap 5.3 Dark** | `bootstrap5.3-dark.css` | Dark variant of Bootstrap 5.3 |
| **Fluent 2** | `fluent2.css` | Microsoft Fluent Design System v2 |
| **Fluent 2 Dark** | `fluent2-dark.css` | Dark variant of Fluent 2 |
| **Material 3** | `material3.css` | Google Material Design v3 |
| **Material 3 Dark** | `material3-dark.css` | Dark variant of Material 3 |
| **Bootstrap 5** | `bootstrap5.css` | Bootstrap v5 (earlier version) |
| **Bootstrap 5 Dark** | `bootstrap5-dark.css` | Dark variant of Bootstrap 5 |
| **Fluent** | `fluent.css` | Microsoft Fluent Design (v1) |
| **Fluent Dark** | `fluent-dark.css` | Dark variant of Fluent |
| **Material** | `material.css` | Google Material Design (classic) |
| **Material Dark** | `material-dark.css` | Dark variant of Material |
| **Tailwind** | `tailwind.css` | Tailwind CSS (earlier version) |
| **Tailwind Dark** | `tailwind-dark.css` | Dark variant of Tailwind |
| **Fabric** | `fabric.css` | Microsoft Office Fabric |
| **Fabric Dark** | `fabric-dark.css` | Dark variant of Fabric |
| **High Contrast** | `highcontrast.css` | High contrast for accessibility |

> **Note:** The Bootstrap theme is designed based on Bootstrap v3 but is compatible with Bootstrap v4 applications.

## Accessing Themes

### Theme Packages

All Syncfusion modern themes are available as npm packages:

| Theme | Light Package | Dark Package |
|-------|---|---|
| Material 3 | [@syncfusion/ej2-material3-theme](https://www.npmjs.com/package/@syncfusion/ej2-material3-theme) | [@syncfusion/ej2-material3-dark-theme](https://www.npmjs.com/package/@syncfusion/ej2-material3-dark-theme) |
| Fluent 2 | [@syncfusion/ej2-fluent2-theme](https://www.npmjs.com/package/@syncfusion/ej2-fluent2-theme) | [@syncfusion/ej2-fluent2-dark-theme](https://www.npmjs.com/package/@syncfusion/ej2-fluent2-dark-theme) |
| Bootstrap 5.3 | [@syncfusion/ej2-bootstrap5.3-theme](https://www.npmjs.com/package/@syncfusion/ej2-bootstrap5.3-theme) | [@syncfusion/ej2-bootstrap5.3-dark-theme](https://www.npmjs.com/package/@syncfusion/ej2-bootstrap5.3-dark-theme) |
| Tailwind 3.4 | [@syncfusion/ej2-tailwind3-theme](https://www.npmjs.com/package/@syncfusion/ej2-tailwind3-theme) | [@syncfusion/ej2-tailwind3-dark-theme](https://www.npmjs.com/package/@syncfusion/ej2-tailwind3-dark-theme) |

### CDN Links

Access themes via CDN (version 33.1.44 shown; update version as needed):

| Theme | Light | Dark |
|-------|-------|------|
| Material 3 | [material3.css](https://cdn.syncfusion.com/ej2/33.1.44/material3.css) | [material3-dark.css](https://cdn.syncfusion.com/ej2/33.1.44/material3-dark.css) |
| Fluent 2 | [fluent2.css](https://cdn.syncfusion.com/ej2/33.1.44/fluent2.css) | [fluent2-dark.css](https://cdn.syncfusion.com/ej2/33.1.44/fluent2-dark.css) |

## Dark Mode Switching

### Theme Variants (Light & Dark)

All modern themes provide both light and dark variants:

- **Light themes:** Suitable for well-lit environments, traditional desktop use
- **Dark themes:** Reduce eye strain in low-light conditions, save battery on OLED screens

### How to Switch Dark Mode

To activate dark mode, append the `e-dark-mode` class to the body section of your application for Material 3, Fluent 2, Bootstrap 5.3, and Tailwind 3.4 themes. Once applied, the theme seamlessly switches to dark mode.

```ts
import { Button, CheckBox } from '@syncfusion/ej2-buttons';

var checkBoxObj = new CheckBox({ label: 'Enable DarkMode', change: onDarkMode });
checkBoxObj.appendTo('#darkmode');

function onDarkMode(e: any) {
    e.checked ? document.body.classList.add('e-dark-mode') : document.body.classList.remove('e-dark-mode');
}

var btnObj = new Button({ isPrimary: true });
btnObj.appendTo('#normal4');
btnObj = new Button({ cssClass: 'e-success' });
btnObj.appendTo('#normal5');
btnObj = new Button({ cssClass: 'e-info' });
btnObj.appendTo('#normal6');
btnObj = new Button({ cssClass: 'e-warning' });
btnObj.appendTo('#normal7');
btnObj = new Button({ cssClass: 'e-danger' });
btnObj.appendTo('#normal8');
```

## Color Customization

### Material 3 CSS Variables

Material 3 theme uses rgb() values for color variables:

```css
:root {
  --color-sf-black: 0, 0, 0;
  --color-sf-white: 255, 255, 255;
  --color-sf-primary: 103, 80, 164;
  --color-sf-primary-container: 234, 221, 255;
  --color-sf-secondary: 98, 91, 113;
  --color-sf-secondary-container: 232, 222, 248;
  --color-sf-tertiary: 125, 82, 96;
  --color-sf-tertiary-container: 255, 216, 228;
  --color-sf-surface: 255, 255, 255;
  --color-sf-surface-variant: 231, 224, 236;
  --color-sf-background: var(--color-sf-surface);
  --color-sf-on-primary: 255, 255, 255;
  --color-sf-on-primary-container: 33, 0, 94;
  --color-sf-on-secondary: 255, 255, 255;
  --color-sf-on-secondary-container: 30, 25, 43;
  --color-sf-on-tertiary: 255, 255, 255;
}
```

### Customization Using CSS

Apply custom colors using CSS classes:

```ts
import { Button, CheckBox } from '@syncfusion/ej2-buttons';

var checkBoxObj = new CheckBox({ label: 'Enable DarkMode', change: onDarkMode });
checkBoxObj.appendTo('#darkmode');

function onDarkMode(e: any) {
    e.checked ? document.body.classList.add('e-dark-mode') : document.body.classList.remove('e-dark-mode');
}

var btnObj = new Button({ isPrimary: true });
btnObj.appendTo('#normal4');
btnObj = new Button({ cssClass: 'e-success' });
btnObj.appendTo('#normal5');
btnObj = new Button({ cssClass: 'e-info' });
btnObj.appendTo('#normal6');
btnObj = new Button({ cssClass: 'e-warning' });
btnObj.appendTo('#normal7');
btnObj = new Button({ cssClass: 'e-danger' });
btnObj.appendTo('#normal8');
```

### Customization Using JavaScript

Dynamically change CSS variables at runtime:

```ts
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initialize the Button control.
let button: Button = new Button({ content: 'Button', cssClass: 'e-primary' });

// Render initialized button.
button.appendTo('#element');

// Customize color using CSS variables
var root = document.documentElement;
var colorSFPrimary = '104, 134, 164';
root.style.setProperty('--color-sf-primary', colorSFPrimary);
```

## Size Modes

### Overview of Size Modes

Syncfusion controls support both touch (bigger) and normal size modes. Touch mode creates a responsive design for mobile devices by applying the `e-bigger` class, which enhances touch interactions, improves visibility, and delivers better user experience on touch-enabled devices.

### Enable Touch Mode for Application

Add the `e-bigger` class to the body element in the index.html file:

```html
<body class="e-bigger">
  <!-- Application content -->
</body>
```

### Enable Touch Mode for Individual Control

Add the `e-bigger` class to the div element containing the control or using the `cssClass` property:

```ts
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initialize the Button control.
let button: Button = new Button({ content: 'Button', cssClass: 'e-bigger' });

// Render initialized button.
button.appendTo('#element');
```

### Change Size Mode at Runtime

Switch between touch and normal mode at runtime by adding or removing the `e-bigger` class:

```ts
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { Calendar } from '@syncfusion/ej2-calendars';

enableRipple(true);

// Initialize the touch button.
let touchButton: Button = new Button({ content: 'Touch Mode' });
touchButton.appendTo('#touch');
touchButton.element.onclick = (): void => {
    document.body.classList.add('e-bigger');
}

// Initialize the mouse button.
let mouseButton: Button = new Button({ content: 'Mouse Mode' });
mouseButton.appendTo('#mouse');
mouseButton.element.onclick = (): void => {
    document.body.classList.remove('e-bigger');
}

let calendarObject: Calendar = new Calendar();
calendarObject.appendTo('#calendar');
```

### Change Size Mode for Individual Control

Dynamically add or remove the `e-bigger` class for specific controls:

```ts
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { Calendar } from '@syncfusion/ej2-calendars';

enableRipple(true);

// Initialize the touch button.
let touchButton: Button = new Button({ content: 'Touch Mode' });
touchButton.appendTo('#touch');
touchButton.element.onclick = (): void => {
    let controls = document.querySelectorAll('.control');
    for (let index: number = 0; index < controls.length; index++) {
        controls[index].classList.add('e-bigger');
    }
}

// Initialize the mouse button.
let mouseButton: Button = new Button({ content: 'Mouse Mode' });
mouseButton.appendTo('#mouse');
mouseButton.element.onclick = (): void => {
    let controls = document.querySelectorAll('.control');
    for (let index: number = 0; index < controls.length; index++) {
        controls[index].classList.remove('e-bigger');
    }
}

let calendarObject: Calendar = new Calendar();
calendarObject.appendTo('#calendar');
```

## Icons Library

### Predefined Icons Library

Syncfusion's icon library is a collection of pre-designed icons that can be used to enhance the user interface. This icon library consists of a set of base64 formatted font icons. Utilizing this icon library makes it simpler to create a cohesive, visually pleasing design for an application.

### Referring Icons in JavaScript Application

Icons can be referenced in a JavaScript application using two approaches:

#### NPM Package

All Syncfusion theme icons are shipped in the [ej2-icons](https://www.npmjs.com/package/@syncfusion/ej2-icons) package. Install it using:

```bash
npm install @syncfusion/ej2-icons
```

Refer to icons using the following syntax in your CSS:

```css
@import "../node_modules/@syncfusion/ej2-icons/styles/material.css";
```

#### CDN Reference

All Syncfusion theme icons are available on the CDN. Add a link tag to the page head:

```html
<!-- Bootstrap 5 Icons -->
<head>
    <link href="https://cdn.syncfusion.com/ej2/33.1.44/ej2-icons/styles/bootstrap5.css" rel="stylesheet"/>
</head>

<!-- Material Icons -->
<head>
    <link href="https://cdn.syncfusion.com/ej2/33.1.44/ej2-icons/styles/material.css" rel="stylesheet"/>
</head>
```

### Using Icons Directly in HTML

The built-in Syncfusion icons can be rendered directly in HTML elements:

1. Add the class name `e-icons` to the HTML element that needs the icon
2. Add the icon class with the `e-` prefix
3. Add the CDN link reference of icons library in the index.html file

```html
<link href="https://cdn.syncfusion.com/ej2/33.1.44/ej2-icons/styles/bootstrap5.css" rel="stylesheet" />

<span class="e-icons e-paste"></span>
<span class="e-icons e-cut"></span>
<span class="e-icons e-copy"></span>
```

### Icon Appearance Customization

Syncfusion JavaScript icons can be customized with custom color and size by overriding the `e-icons` class. Customizing icons is useful for making them more visually appealing and fitting the design of your application.

## Icon Sizing

### Icon Size Classes

The `ej2-icons` package offers options to display icons in different size modes:

| Class | Size |
|-------|------|
| `e-small` | 8px |
| `e-medium` | 16px |
| `e-large` | 24px |

### Icon Size Example

```html
<span class="e-icons e-small e-search"></span>
<span class="e-icons e-medium e-search"></span>
<span class="e-icons e-large e-search"></span>
```

Users can use different icon sizes based on touch or mouse mode. In touch mode, add `e-large` class to make the icon easily interactive, or add `e-small` or `e-medium` in mouse mode.

## Theme Studio

### ThemeStudio Application

The ThemeStudio application provides seamless integration with Material 3, Fluent 2, Bootstrap 5.3, and Tailwind 3.4 themes, offering a comprehensive solution for customization requirements. This enhancement enables users to effortlessly customize and personalize their themes through a visual interface.
