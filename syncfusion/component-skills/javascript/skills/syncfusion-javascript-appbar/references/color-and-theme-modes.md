# Color and Theme Modes

## Table of Contents
- [Light AppBar](#light-appbar)
- [Dark AppBar](#dark-appbar)
- [Primary AppBar](#primary-appbar)
- [Inherit AppBar](#inherit-appbar)
- [Color Mode Property Reference](#color-mode-property-reference)
- [Button Inheritance](#button-inheritance)
- [Component Integration](#component-integration)

## Light AppBar

The **Light AppBar** is the default color mode. It displays with a light background and dark text, suitable for most applications and maintaining good contrast.

### Basic Light AppBar

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Light is default (can be explicit or omitted)
const appbar: AppBar = new AppBar({
  colorMode: 'Light'
  // or simply: new AppBar()
});
appbar.appendTo("#appbar");

const loginBtn: Button = new Button({ 
  isPrimary: true,
  content: 'Free Trial' 
});
loginBtn.appendTo('#loginBtn');
```

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Light AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <header id="appbar">
        <div style="background: url('logo.png'); width: 150px; height: 30px;"></div>
        <div class="e-appbar-spacer"></div>
        <button id="loginBtn"></button>
    </header>
</body>
</html>
```

### Light Mode Characteristics

- **Background:** Light gray/white
- **Text color:** Dark/black
- **Use case:** Professional, clean appearance
- **Best for:** Corporate applications, documentation sites

## Dark AppBar

The **Dark AppBar** uses a dark background with light text, ideal for modern designs and reducing eye strain in low-light environments.

### Set Color Mode to Dark

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Dark color mode
const appbar: AppBar = new AppBar({
  colorMode: 'Dark'
});
appbar.appendTo("#appbar");

const menuBtn: Button = new Button({ 
  cssClass: 'e-inherit', 
  iconCss: 'e-icons e-menu' 
});
menuBtn.appendTo('#menuBtn');

const loginBtn: Button = new Button({ 
  cssClass: 'e-inherit', 
  content: 'Login' 
});
loginBtn.appendTo('#loginBtn');
```

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dark AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <style>
        body {
            background: #f5f5f5;
        }
    </style>
</head>
<body>
    <header id="appbar">
        <button id="menuBtn"></button>
        <span>Dark AppBar</span>
        <div class="e-appbar-spacer"></div>
        <button id="loginBtn"></button>
    </header>
</body>
</html>
```

### Dark Mode Characteristics

- **Background:** Dark gray/black
- **Text color:** Light/white
- **Use case:** Modern, sleek design
- **Best for:** Code editors, design tools, night mode

## Primary AppBar

The **Primary AppBar** uses the brand's primary color from the theme, conveying importance and brand identity.

### Set Color Mode to Primary

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Primary brand color
const appbar: AppBar = new AppBar({
  colorMode: 'Primary'
});
appbar.appendTo("#appbar");

const menuBtn: Button = new Button({ 
  cssClass: 'e-inherit', 
  iconCss: 'e-icons e-menu' 
});
menuBtn.appendTo('#menuBtn');

const loginBtn: Button = new Button({ 
  cssClass: 'e-inherit', 
  content: 'FREE TRIAL' 
});
loginBtn.appendTo('#loginBtn');
```

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Primary AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <header id="appbar">
        <button id="menuBtn"></button>
        <span>Primary AppBar</span>
        <div class="e-appbar-spacer"></div>
        <button id="loginBtn"></button>
    </header>
</body>
</html>
```

### Primary Mode Characteristics

- **Background:** Brand primary color (blue, green, etc.)
- **Text color:** Contrasting light/white
- **Use case:** Brand emphasis, main navigation
- **Best for:** SPA applications, dashboards

## Inherit AppBar

The **Inherit AppBar** takes its background and text colors from parent elements, allowing flexible theming without hardcoded colors.

### Set Color Mode to Inherit

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Inherit colors from parent
const appbar: AppBar = new AppBar({
  colorMode: 'Inherit'
});
appbar.appendTo("#appbar");

const loginBtn: Button = new Button({ 
  isPrimary: true,
  content: 'FREE TRIAL' 
});
loginBtn.appendTo('#loginBtn');
```

### HTML Structure with Custom Parent Colors

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inherit AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <style>
        /* Custom parent styling */
        #appbar-container {
            background: #2E7D32;  /* Green background */
            color: #ffffff;       /* White text */
            padding: 10px;
        }
    </style>
</head>
<body>
    <div id="appbar-container">
        <header id="appbar">
            <div style="background: url('logo.png'); width: 150px; height: 30px;"></div>
            <div class="e-appbar-spacer"></div>
            <button id="loginBtn"></button>
        </header>
    </div>
</body>
</html>
```

### Inherit Mode Characteristics

- **Background:** Inherited from parent element
- **Text color:** Inherited from parent element
- **Use case:** Flexible, theme-agnostic design
- **Best for:** Reusable components, custom themes

## Color Mode Property Reference

### Color Mode Property

| Value | Background | Text Color | Use Case |
|-------|------------|------------|----------|
| `'Light'` (default) | Light gray/white | Dark/black | Professional, clean |
| `'Dark'` | Dark gray/black | Light/white | Modern, sleek |
| `'Primary'` | Brand primary color | Light/white | Brand emphasis |
| `'Inherit'` | Parent background | Parent text | Custom themes |

### Color Configuration

```ts
// Light (default)
new AppBar({ colorMode: 'Light' })
// or omit colorMode entirely
new AppBar()

// Dark
new AppBar({ colorMode: 'Dark' })

// Primary
new AppBar({ colorMode: 'Primary' })

// Inherit
new AppBar({ colorMode: 'Inherit' })
```

## Button Inheritance

The `e-inherit` CSS class allows buttons and other components to inherit AppBar colors automatically.

### Using e-inherit with Buttons

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbar = new AppBar({ colorMode: 'Primary' });
appbar.appendTo("#appbar");

// Button inherits Primary color from AppBar
const btn = new Button({ 
  cssClass: 'e-inherit',  // Inherits AppBar colors
  content: 'Inherited Button',
  iconCss: 'e-icons e-menu'
});
btn.appendTo('#btn');

// Button WITHOUT inheritance (uses default styling)
const btn2 = new Button({ 
  isPrimary: true,        // Uses primary color (not AppBar color)
  content: 'Regular Button'
});
btn2.appendTo('#btn2');
```

### HTML Structure

```html
<header id="appbar">
    <!-- Button with e-inherit: adopts AppBar color -->
    <button id="btn"></button>
    
    <!-- Without e-inherit: uses default styling -->
    <button id="btn2"></button>
</header>
```

### e-inherit CSS Details

```css
/* Applied to e-inherit elements */
.e-inherit {
    background: inherit;
    color: inherit;
}

/* Hover states also inherit */
.e-inherit:hover {
    background: rgba(255, 255, 255, 0.08);
}
```

## Component Integration

### Buttons with Color Inheritance

```ts
// Primary AppBar with inherited buttons
const appbar = new AppBar({ colorMode: 'Primary' });
appbar.appendTo("#appbar");

const menuBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-menu'
});
menuBtn.appendTo('#menuBtn');

const loginBtn = new Button({
  cssClass: 'e-inherit',
  content: 'Login'
});
loginBtn.appendTo('#loginBtn');
```

### DropDownButton Integration

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { DropDownButton, ItemModel } from "@syncfusion/ej2-splitbuttons";

const appbar = new AppBar({ colorMode: 'Primary' });
appbar.appendTo("#appbar");

const dropdownItems: ItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { text: 'Save' }
];

const dropdown = new DropDownButton({
  cssClass: 'e-inherit',
  items: dropdownItems,
  content: 'File'
});
dropdown.appendTo('#dropdown');
```

### Menu Integration

```ts
import { AppBar, Menu, MenuItemModel } from "@syncfusion/ej2-navigations";

const appbar = new AppBar({ colorMode: 'Primary' });
appbar.appendTo("#appbar");

const menuItems: MenuItemModel[] = [
    {
        text: 'File',
        items: [
            { text: 'New' },
            { text: 'Open' },
            { text: 'Save' }
        ]
    }
];

const menu = new Menu({
  cssClass: 'e-inherit',
  items: menuItems
});
menu.appendTo('#menu');
```

### HTML Structure with Components

```html
<header id="appbar">
    <button id="menuBtn"></button>
    <ul id="dropdown"></ul>
    <ul id="menu"></ul>
    <div class="e-appbar-spacer"></div>
    <button id="loginBtn"></button>
</header>
```

## Color Mode Selection Guide

### When to Use Light

- ✅ Professional applications
- ✅ Documentation sites
- ✅ Corporate dashboards
- ✅ High-contrast requirements
- ✅ Daytime usage

### When to Use Dark

- ✅ Modern applications
- ✅ Code editors
- ✅ Design tools
- ✅ Night mode support
- ✅ Reduced eye strain

### When to Use Primary

- ✅ Brand-focused applications
- ✅ SPA navigation
- ✅ Admin dashboards
- ✅ Important navigation areas
- ✅ Brand consistency

### When to Use Inherit

- ✅ Nested components
- ✅ Custom themed applications
- ✅ Flexible component reuse
- ✅ Parent-controlled styling
- ✅ Wrapper components

## Combined Examples

### Example 1: Responsive Color Modes

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

// Use dark on mobile, primary on desktop
const colorMode = window.innerWidth < 768 ? 'Dark' : 'Primary';

const appbar = new AppBar({
  colorMode: colorMode
});
appbar.appendTo("#appbar");
```

### Example 2: Dynamic Theme Switching

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

let appbar: AppBar;

function switchTheme(mode: string) {
  if (appbar) {
    appbar.destroy();
  }
  
  appbar = new AppBar({
    colorMode: mode as any
  });
  appbar.appendTo("#appbar");
}

// Usage
switchTheme('Primary');   // Light theme
switchTheme('Dark');      // Dark theme
```

### Example 3: AppBar with Custom Branding

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

const appbar = new AppBar({
  colorMode: 'Inherit',
  cssClass: 'branded-appbar'
});
appbar.appendTo("#appbar");
```

```css
/* Custom brand colors */
.branded-appbar {
  background: linear-gradient(to right, #FF6B6B, #4ECDC4);
  color: #ffffff;
}

.branded-appbar .e-inherit {
  background: transparent;
  color: inherit;
}

.branded-appbar .e-inherit:hover {
  background: rgba(255, 255, 255, 0.15);
}
```

## Troubleshooting

**Issue: Buttons not inheriting AppBar color**
- Ensure `cssClass: 'e-inherit'` is set
- Check AppBar has `colorMode` specified
- Verify CSS is loaded

**Issue: Inherit mode not showing colors**
- Set parent element background and text color
- Use inline styles or CSS class
- Check z-index doesn't hide content

**Issue: Color mode changes not applying**
- Recreate AppBar instance
- Use `appbar.colorMode = 'newMode'`

## Next Steps

- Create **complex layouts** with [Layout Patterns](layout-patterns-and-design.md)
- Customize **styling** with [Styling Guide](styling-customization.md)
- Follow **best practices** with [Accessibility](best-practices-and-accessibility.md)

