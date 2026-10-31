# Size and Height Modes

## Table of Contents
- [Regular AppBar](#regular-appbar)
- [Prominent AppBar](#prominent-appbar)
- [Dense AppBar](#dense-appbar)
- [Mode Property Reference](#mode-property-reference)
- [When to Use Each Mode](#when-to-use-each-mode)

## Regular AppBar

The **Regular AppBar** is the default height mode. It provides standard spacing and is suitable for most applications with typical button/icon content.

### Basic Regular AppBar

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Regular is default (can be explicit or omitted)
const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  mode: 'Regular'
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
    <title>Regular AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <header id="appbar">
        <button id="menuBtn"></button>
        <span>Regular AppBar</span>
        <div class="e-appbar-spacer"></div>
        <button id="loginBtn"></button>
    </header>
</body>
</html>
```

### Regular Height Characteristics

- **Default height:** ~56px on desktop
- **Suitable for:** Standard navigation, buttons, text content
- **Content fit:** 2-3 rows maximum
- **Best for:** Desktop applications, complex navigation

## Prominent AppBar

The **Prominent AppBar** has an increased height, making it ideal for displaying large titles, images, banners, or hero content alongside navigation elements.

### Set Mode to Prominent

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Prominent mode for larger header area
const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  mode: 'Prominent',
  cssClass: 'prominent-appbar'
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

### HTML Structure with Custom Styling

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prominent AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <style>
        /* Customize prominent AppBar appearance */
        .prominent-appbar.e-appbar {
            background-image: url('url');
            background-size: 100% 350px;
            background-repeat: no-repeat;
            color: #ffffff;
            height: 350px;
        }
        
        .prominent-appbar .prominent-title {
            align-self: center;
            white-space: break-spaces;
            text-align: inherit;
            font-size: 35px;
            line-height: 50px;
        }
        
        .prominent-appbar .e-inherit.e-btn {
            background: transparent;
        }
        
        .prominent-appbar .e-inherit.e-btn:hover,
        .prominent-appbar .e-inherit.e-btn:focus,
        .prominent-appbar .e-inherit.e-btn:active {
            background: rgba(255, 255, 255, 0.08);
        }
    </style>
</head>
<body>
    <header id="appbar">
        <button id="menuBtn"></button>
        <span class="prominent-title">AppBar Component</span>
        <div class="e-appbar-spacer"></div>
        <button id="loginBtn"></button>
    </header>
</body>
</html>
```

### Prominent Height Characteristics

- **Default height:** ~350px on desktop
- **Suitable for:** Hero headers, large titles, banner images
- **Content fit:** Full height available for custom content
- **Best for:** Landing pages, dashboards with large titles
- **Customizable:** Can adjust height via CSS

### Customizing Prominent Height

```css
/* Increase prominent height */
.e-appbar.e-prominent {
    height: 500px;
}

/* Add background image */
.e-appbar.e-prominent {
    background-image: url('path/to/image.jpg');
    background-size: cover;
    background-position: center;
}

/* Center text vertically */
.e-appbar.e-prominent .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
```

## Dense AppBar

The **Dense AppBar** has a reduced height, making it compact and suitable for mobile applications or when screen space is limited.

### Set Mode to Dense

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Dense mode for compact header
const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  mode: 'Dense'
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
    <title>Dense AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <style>
        .control-container {
            height: 200px;
            display: flex;
            flex-direction: column;
        }
        
        .content {
            flex: 1;
            padding: 20px;
        }
        
        #appbar .e-btn.e-inherit {
            margin: 0 3px;
        }
    </style>
</head>
<body>
    <div class="control-container">
        <header id="appbar">
            <button id="menuBtn"></button>
            <span>Dense AppBar</span>
            <div class="e-appbar-spacer"></div>
            <button id="loginBtn"></button>
        </header>
        
        <div class="content">
            <p>Compact header for mobile or dense layouts</p>
        </div>
    </div>
</body>
</html>
```

### Dense Height Characteristics

- **Default height:** ~40px on desktop
- **Suitable for:** Mobile devices, compact interfaces
- **Content fit:** Icons and small buttons only
- **Best for:** Mobile apps, space-constrained layouts
- **Advantage:** More space for main content

## Mode Property Reference

### Mode Property

| Value | Height | Use Case |
|-------|--------|----------|
| `'Regular'` (default) | ~56px | Standard navigation, desktop apps |
| `'Prominent'` | ~350px | Large titles, hero headers, banners |
| `'Dense'` | ~40px | Mobile apps, compact interfaces |

### Mode Configuration

```ts
// Regular (default)
new AppBar({ mode: 'Regular' })
// or omit mode entirely
new AppBar()

// Prominent
new AppBar({ mode: 'Prominent' })

// Dense
new AppBar({ mode: 'Dense' })
```

## When to Use Each Mode

### Regular Mode

**Best for:**
- ✅ Standard web applications
- ✅ Desktop dashboards
- ✅ Typical navigation bars
- ✅ Medium-sized icons and buttons
- ✅ Text labels with icons

**Example:**
```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  mode: 'Regular'  // or omit
});
```

### Prominent Mode

**Best for:**
- ✅ Hero sections with banners
- ✅ Large application titles
- ✅ Marketing landing pages
- ✅ Dashboard headers with large text
- ✅ Gallery or image headers

**Example:**
```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  mode: 'Prominent',
  cssClass: 'hero-appbar'
});
```

### Dense Mode

**Best for:**
- ✅ Mobile applications
- ✅ Responsive designs for small screens
- ✅ Space-constrained layouts
- ✅ Icon-only navigation
- ✅ Compact toolbars

**Example:**
```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  mode: 'Dense'
});
```

## Responsive Mode Selection

Dynamically change mode based on screen size:

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

const appbar = new AppBar({
  colorMode: 'Primary',
  mode: window.innerWidth < 768 ? 'Dense' : 'Regular'
});
appbar.appendTo("#appbar");

// Update mode on window resize
window.addEventListener('resize', () => {
  const newMode = window.innerWidth < 768 ? 'Dense' : 'Regular';
  appbar.mode = newMode;
});
```

## CSS Classes for Modes

Apply default styling to different modes:

```css
/* Regular mode */
.e-appbar.e-regular {
    /* ~56px height */
}

/* Prominent mode */
.e-appbar.e-prominent {
    /* ~350px height, customize as needed */
}

/* Dense mode */
.e-appbar.e-dense {
    /* ~40px height */
}
```

## Combined Examples

### Example 1: Desktop (Regular) vs Mobile (Dense)

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

const isMobile = window.innerWidth < 768;

const appbar = new AppBar({
  colorMode: 'Primary',
  mode: isMobile ? 'Dense' : 'Regular',
  position: isMobile ? 'Bottom' : 'Top'
});
appbar.appendTo("#appbar");
```

### Example 2: Hero Header (Prominent) with Regular Navigation

```ts
// Top section: Prominent with hero content
const heroAppbar = new AppBar({
  colorMode: 'Primary',
  mode: 'Prominent',
  cssClass: 'hero-section'
});
heroAppbar.appendTo("#heroAppbar");

// Below: Regular navigation
const navAppbar = new AppBar({
  colorMode: 'Light',
  mode: 'Regular'
});
navAppbar.appendTo("#navAppbar");
```

### Example 3: Dashboard with Title and Compact Toolbar

```ts
// Main header with title
const headerAppbar = new AppBar({
  colorMode: 'Primary',
  mode: 'Regular'
});
headerAppbar.appendTo("#header");

// Compact toolbar below
const toolbarAppbar = new AppBar({
  colorMode: 'Light',
  mode: 'Dense',
  cssClass: 'toolbar'
});
toolbarAppbar.appendTo("#toolbar");
```

## Troubleshooting

**Issue: Prominent content not visible**
- Check z-index of AppBar vs content
- Verify background-image path is correct
- Add explicit height via cssClass

**Issue: Dense mode text overflow**
- Use icons only instead of text labels
- Reduce font size with custom CSS
- Use tooltips for labels

**Issue: Mode changes not applying**
- Recreate AppBar instance
- Use `appbar.mode = 'newMode'` to update

## Next Steps

- Apply **colors** with [Color Modes](color-and-theme-modes.md)
- Create **complex layouts** with [Layout Patterns](layout-patterns-and-design.md)
- Configure **positioning** with [Positioning Guide](positioning-and-sticky.md)

