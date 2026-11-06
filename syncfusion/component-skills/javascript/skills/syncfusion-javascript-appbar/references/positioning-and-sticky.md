# Positioning and Sticky Behavior

## Table of Contents
- [Top AppBar](#top-appbar)
- [Bottom AppBar](#bottom-appbar)
- [Sticky AppBar](#sticky-appbar)
- [Position Property Reference](#position-property-reference)
- [Use Cases](#use-cases)

## Top AppBar

The **Top AppBar** is the default position. It appears at the top of the content area, typically used for main navigation, headers, and primary actions.

### Basic Top AppBar

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Default top positioning (no position property needed)
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
    <title>Top AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='container'>
        <div class="control-container">
            <header id="appbar">
                <button id="menuBtn"></button>
                <div class="e-appbar-spacer"></div>
                <button id="loginBtn"></button>
            </header>
            
            <!-- Page content below -->
            <div style="height: 300px; overflow-y: scroll; padding: 20px;">
                <h3>Content Area</h3>
                <p>AppBar stays at top while scrolling...</p>
                <p>Lorem ipsum dolor sit amet...</p>
            </div>
        </div>
    </div>
</body>
</html>
```

### CSS Styling (Optional)

```css
.control-container {
    height: 500px;
    margin: 0 auto;
    width: 100%;
}

#appbar .e-btn.e-inherit {
    margin: 0 3px;
}
```

## Bottom AppBar

The **Bottom AppBar** is positioned at the bottom of the container. This is common in mobile applications for bottom navigation or action bars.

### Set Position to Bottom

Use the `position` property set to `'Bottom'`:

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Position at bottom
const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  position: 'Bottom'
});
appbar.appendTo("#appbar");

const homeBtn: Button = new Button({ 
  cssClass: 'e-inherit', 
  iconCss: 'e-icons e-home' 
});
homeBtn.appendTo('#homeBtn');

const favoriteBtn: Button = new Button({ 
  cssClass: 'e-inherit', 
  iconCss: 'e-icons e-favorite' 
});
favoriteBtn.appendTo('#favoriteBtn');

const settingsBtn: Button = new Button({ 
  cssClass: 'e-inherit', 
  iconCss: 'e-icons e-settings' 
});
settingsBtn.appendTo('#settingsBtn');
```

### HTML Structure for Bottom Navigation

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bottom AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <style>
        .control-container {
            height: 400px;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        
        .content-area {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="control-container">
        <div class="content-area">
            <h3>Main Content</h3>
            <p>AppBar is positioned at bottom...</p>
        </div>
        
        <footer id="appbar">
            <button id="homeBtn"></button>
            <button id="favoriteBtn"></button>
            <button id="settingsBtn"></button>
        </footer>
    </div>
</body>
</html>
```

### CSS Styling for Bottom AppBar

```css
.control-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content-area {
    flex: 1;
    overflow-y: auto;
}

#appbar {
    border-top: 1px solid #e0e0e0;
}

#appbar .e-btn.e-inherit {
    flex: 1;
    margin: 0;
    border-right: 1px solid #e0e0e0;
}

#appbar .e-btn.e-inherit:last-child {
    border-right: none;
}
```

## Sticky AppBar

A **Sticky AppBar** remains visible at the top (or bottom) of the viewport while scrolling through content. This keeps navigation always accessible.

### Enable Sticky Behavior

Set the `isSticky` property to `true`:

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Sticky at top (default)
const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  isSticky: true
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

### HTML Structure with Scrollable Content

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sticky AppBar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <style>
        .control-container {
            height: 500px;
            overflow-y: scroll;
        }
        
        #appbar {
            position: sticky;
            top: 0;
            z-index: 10;
        }
        
        .content {
            padding: 20px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="control-container">
        <header id="appbar">
            <button id="menuBtn"></button>
            <span>Sticky Navigation</span>
            <div class="e-appbar-spacer"></div>
            <button id="loginBtn"></button>
        </header>
        
        <div class="content">
            <h3>Scroll to see sticky AppBar</h3>
            <p>The AppBar stays visible at the top while scrolling...</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <!-- Repeat content to enable scrolling -->
        </div>
    </div>
</body>
</html>
```

### Sticky + Bottom Combination

```ts
// Sticky AppBar at bottom (useful for mobile navigation)
const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  position: 'Bottom',
  isSticky: true
});
appbar.appendTo("#appbar");
```

### CSS for Sticky Bottom AppBar

```css
.control-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.content-area {
    flex: 1;
    overflow-y: auto;
}

#appbar {
    position: sticky;
    bottom: 0;
    z-index: 10;
}
```

## Position Property Reference

### Position Property

| Value | Behavior | Use Case |
|-------|----------|----------|
| `'Top'` (default) | AppBar at top of container | Main navigation, headers |
| `'Bottom'` | AppBar at bottom of container | Mobile navigation, footers |

### Sticky Property

| Value | Behavior | Use Case |
|-------|----------|----------|
| `false` (default) | Scrolls with content | Simple headers |
| `true` | Stays visible during scroll | Persistent navigation |

### Position Configuration

```ts
// Top (default)
new AppBar({ position: 'Top' })

// Bottom
new AppBar({ position: 'Bottom' })

// Sticky top
new AppBar({ isSticky: true })

// Sticky bottom
new AppBar({ position: 'Bottom', isSticky: true })
```

## Use Cases

### Use Case 1: Website Header (Top, Sticky)

```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  position: 'Top',
  isSticky: true
});
appbar.appendTo("#appbar");

// Logo, navigation menu, and buttons
// Stays visible while user scrolls page content
```

**When to Use:**
- E-commerce websites
- Blog platforms
- Documentation sites
- Marketing websites

### Use Case 2: Mobile App Navigation (Bottom, Sticky)

```ts
const appbar = new AppBar({
  colorMode: 'Dark',
  position: 'Bottom',
  isSticky: true,
  mode: 'Dense'
});
appbar.appendTo("#appbar");

// 3-5 icon buttons for main navigation
// Common in mobile apps (iOS, Android style)
```

**When to Use:**
- Mobile applications
- Responsive web apps
- Touch-optimized interfaces

### Use Case 3: Document Editor (Top, Fixed)

```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  position: 'Top',
  isSticky: true
});
appbar.appendTo("#appbar");

// File menu, editing tools, formatting options
// Stays visible while editing large documents
```

**When to Use:**
- Document editors
- Design tools
- Code editors
- Spreadsheet applications

### Use Case 4: Page Header (Top, Non-sticky)

```ts
const appbar = new AppBar({
  colorMode: 'Light',
  position: 'Top',
  isSticky: false
});
appbar.appendTo("#appbar");

// Simple header that scrolls away
// Often combined with sticky secondary navigation
```

**When to Use:**
- Hero headers with images
- Simple introductory sections
- When secondary nav is sticky

### Use Case 5: Dashboard with Sidebar (Top, Sticky)

```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  position: 'Top',
  isSticky: true,
  mode: 'Regular'
});
appbar.appendTo("#appbar");

// Menu toggle, page title, user dropdown
// Works alongside sidebar navigation
```

**When to Use:**
- Admin dashboards
- SPA applications
- Enterprise software

## Troubleshooting

**Issue: Sticky AppBar overlapping content**
- Add `top` margin or padding to content area
- Use flexbox layout for proper spacing

**Issue: Bottom AppBar not visible**
- Ensure container has `position: relative` or fixed
- Check z-index is not conflicting

**Issue: Position changes not applied**
- Recreate AppBar instance after property change
- Verify property names match exactly

## Next Steps

- Configure **size modes** with [Size Modes](size-and-height-modes.md)
- Apply **colors** with [Color Modes](color-and-theme-modes.md)
- Create **layouts** with [Layout Patterns](layout-patterns-and-design.md)

