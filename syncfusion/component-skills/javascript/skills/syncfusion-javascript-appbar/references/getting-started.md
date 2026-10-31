# Getting Started with AppBar

## Table of Contents
- [Installation](#installation)
- [TypeScript Setup](#typescript-setup)
- [Basic Initialization](#basic-initialization)
- [CSS Imports](#css-imports)
- [Adding Content](#adding-content)
- [ES5 JavaScript Approach](#es5-javascript-approach)
- [CDN References](#cdn-references)

## Installation

### Dependencies

The AppBar component requires these packages:

```
@syncfusion/ej2-navigations  // Main AppBar component
@syncfusion/ej2-base         // Base utilities and foundation
```

### Install via npm

```bash
npm install @syncfusion/ej2-navigations @syncfusion/ej2-base
```

Or install the complete package:

```bash
npm install @syncfusion/ej2
```

## TypeScript Setup

### Step 1: Clone Quickstart Repository

```bash
git clone url
cd ej2-quickstart
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create HTML Structure

Create or modify `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <title>Syncfusion AppBar</title>
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="control-container">
        <header id="appbar"></header>
    </div>
</body>
</html>
```

## Basic Initialization

### Step 1: Import AppBar Component

Create `src/app/app.ts`:

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

// Initialize AppBar with Primary color mode
const appbarObj: AppBar = new AppBar({
  colorMode: 'Primary'
});

// Render to #appbar element
appbarObj.appendTo("#appbar");
```

### Step 2: Add Content to AppBar

```html
<header id="appbar">
    <button id="menuBtn"></button>
    <span>My Application</span>
    <div class="e-appbar-spacer"></div>
    <button id="loginBtn"></button>
</header>
```

### Step 3: Configure Buttons

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbarObj: AppBar = new AppBar({
  colorMode: 'Primary'
});
appbarObj.appendTo("#appbar");

// Menu button with inherited color from AppBar
const menuButton: Button = new Button({ 
  cssClass: 'e-inherit', 
  iconCss: 'e-icons e-menu' 
});
menuButton.appendTo('#menuBtn');

// Login button with inherited color from AppBar
const loginButton: Button = new Button({ 
  cssClass: 'e-inherit', 
  content: 'FREE TRIAL' 
});
loginButton.appendTo('#loginBtn');
```

## CSS Imports

### Import Styles in TypeScript

Add to `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/appbar/index.css";
```

### Available Themes

Choose one theme for your application:

- `fluent2.css` - Modern Fluent design
- `material.css` - Material Design
- `bootstrap5.css` - Bootstrap 5 style
- `bootstrap.css` - Bootstrap 3 style
- `fabric.css` - Office Fabric style
- `tailwind.css` - Tailwind CSS style
- `bootstrap-dark.css` - Dark theme

Example with Bootstrap 5:

```css
@import "../../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css";
```

## Adding Content

### Pattern 1: Simple Button Bar

```html
<header id="appbar">
    <button id="btn1"></button>
    <button id="btn2"></button>
    <button id="btn3"></button>
</header>
```

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbar = new AppBar({ colorMode: 'Primary' });
appbar.appendTo("#appbar");

// Create buttons
const btn1 = new Button({ cssClass: 'e-inherit', iconCss: 'e-icons e-menu' });
btn1.appendTo('#btn1');

const btn2 = new Button({ cssClass: 'e-inherit', content: 'Home' });
btn2.appendTo('#btn2');

const btn3 = new Button({ cssClass: 'e-inherit', content: 'About' });
btn3.appendTo('#btn3');
```

### Pattern 2: AppBar with Title and Buttons

```html
<header id="appbar">
    <button id="menuBtn"></button>
    <span class="app-title">My Dashboard</span>
    <div class="e-appbar-spacer"></div>
    <button id="settingsBtn"></button>
    <button id="profileBtn"></button>
</header>
```

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbar = new AppBar({ colorMode: 'Primary' });
appbar.appendTo("#appbar");

const menuBtn = new Button({ cssClass: 'e-inherit', iconCss: 'e-icons e-menu' });
menuBtn.appendTo('#menuBtn');

const settingsBtn = new Button({ cssClass: 'e-inherit', iconCss: 'e-icons e-settings' });
settingsBtn.appendTo('#settingsBtn');

const profileBtn = new Button({ cssClass: 'e-inherit', iconCss: 'e-icons e-user' });
profileBtn.appendTo('#profileBtn');
```

### Pattern 3: AppBar with Text Content

```html
<header id="appbar">
    <span>Company Logo</span>
    <div class="e-appbar-spacer"></div>
    <span>© 2024 My Company</span>
</header>
```

```ts
const appbar = new AppBar({ colorMode: 'Light' });
appbar.appendTo("#appbar");
```

## ES5 JavaScript Approach

ES5 allows you to use AppBar with plain JavaScript global scripts without webpack/module bundling.

### Step 1: Download or Reference Global Scripts

**Option A: Local Installation**

Get from Syncfusion Essential Studio installation:
- Dependency: `ej2-base.min.js`
- Control: `ej2-navigations.min.js`
- Styles: `fluent2.css` for base and navigations

**Option B: CDN References**

```html
<!-- Base styles -->
<link href="url" rel="stylesheet" />
<!-- Navigation styles -->
<link href="url" rel="stylesheet" />

<!-- Base script (global) -->
<script src="url"></script>
<!-- Navigation script (global) -->
<script src="url"></script>
```

### Step 2: Create HTML with ES5

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>AppBar - ES5</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <script src="url"></script>
    <script src="url"></script>
</head>
<body>
    <header id="appbar"></header>

    <script>
        // Access AppBar via global ej.navigations namespace
        var appbarObj = new ej.navigations.AppBar({
            colorMode: 'Primary'
        });
        appbarObj.appendTo("#appbar");
    </script>
</body>
</html>
```

### Step 3: Add Content with ES5

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>AppBar - ES5</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <script src="url"></script>
    <script src="url"></script>
    <script src="url"></script>
</head>
<body>
    <header id="appbar">
        <button id="menuBtn"></button>
        <span>My App</span>
        <div class="e-appbar-spacer"></div>
        <button id="loginBtn"></button>
    </header>

    <script>
        var appbarObj = new ej.navigations.AppBar({
            colorMode: 'Primary'
        });
        appbarObj.appendTo("#appbar");

        var menuBtn = new ej.buttons.Button({
            cssClass: 'e-inherit',
            iconCss: 'e-icons e-menu'
        });
        menuBtn.appendTo('#menuBtn');

        var loginBtn = new ej.buttons.Button({
            cssClass: 'e-inherit',
            content: 'Login'
        });
        loginBtn.appendTo('#loginBtn');
    </script>
</body>
</html>
```

## CDN References

### CDN URL Format

**Syntax:**
```
url
url
```

### Complete CDN Setup

```html
<!-- Version: 32.1.19 -->

<!-- Styles -->
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />

<!-- Scripts (load in order) -->
<script src="url"></script>
<script src="url"></script>
<script src="url"></script>
```

### Alternative: Single Bundle

```html
<!-- All EJ2 components in one bundle -->
<link href="url" rel="stylesheet" />
<script src="url"></script>
```

## Run the Application

### TypeScript Development

```bash
npm start
```

The application will run at `http://localhost:3000` (or configured port).

### ES5 JavaScript

Simply open the HTML file in a browser:

```bash
# Using a local server (recommended)
npx http-server

# Or open directly (may have CORS issues with local files)
open index.html
```

## Common Initialization Patterns

### Pattern 1: Minimal Setup

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

const appbar = new AppBar();
appbar.appendTo("#appbar");
```

### Pattern 2: With Color Mode

```ts
const appbar = new AppBar({
  colorMode: 'Primary'
});
appbar.appendTo("#appbar");
```

### Pattern 3: With Size and Position

```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  mode: 'Regular',
  position: 'Top'
});
appbar.appendTo("#appbar");
```

### Pattern 4: With CSS Class and Attributes

```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  cssClass: 'custom-appbar',
  htmlAttributes: { 'aria-label': 'Main application bar' }
});
appbar.appendTo("#appbar");
```

## Next Steps

- Configure **positioning** with [Positioning Guide](positioning-and-sticky.md)
- Select **size and height mode** with [Size Modes](size-and-height-modes.md)
- Apply **colors and themes** with [Color Modes](color-and-theme-modes.md)
- Create **complex layouts** with [Layout Patterns](layout-patterns-and-design.md)

## Troubleshooting

**Issue: AppBar not rendering**
- Verify `#appbar` element exists in HTML
- Check that CSS styles are imported
- Ensure `appendTo()` is called after DOM is ready

**Issue: Buttons not inheriting color**
- Add `cssClass: 'e-inherit'` to button configuration
- Verify AppBar has `colorMode` set

**Issue: Styles not applied**
- Check theme CSS is loaded before component script
- Verify correct theme name (fluent2, material, bootstrap5, etc.)

