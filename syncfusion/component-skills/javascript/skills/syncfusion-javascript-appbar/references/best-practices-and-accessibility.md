# Best Practices and Accessibility

## Table of Contents
- [Semantic HTML](#semantic-html)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Color Contrast and Accessibility](#color-contrast-and-accessibility)
- [Responsive Design](#responsive-design)
- [Performance Optimization](#performance-optimization)
- [Common Pitfalls](#common-pitfalls)
- [Troubleshooting](#troubleshooting)

## Semantic HTML

Use semantic HTML elements to create accessible AppBar structures.

### Semantic AppBar Structure

**Good Practice:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Application</title>
    <link href="styles.css" rel="stylesheet" />
</head>
<body>
    <!-- Use <header> for page header -->
    <header id="appbar" role="banner">
        <!-- Use <nav> for navigation content -->
        <nav>
            <button aria-label="Menu">☰</button>
            <span>My App</span>
            <div class="e-appbar-spacer"></div>
            <button aria-label="Settings">⚙</button>
        </nav>
    </header>
    
    <!-- Main content -->
    <main>
        <h1>Welcome</h1>
    </main>
    
    <!-- Use <footer> for footer content -->
    <footer>
        <p>© 2024 My Company</p>
    </footer>
</body>
</html>
```

**Poor Practice:**
```html
<!-- Don't use generic <div> -->
<div id="appbar">
    <div>Menu</div>
    <div>My App</div>
    <div>Settings</div>
</div>
```

### Semantic Elements

| Element | Purpose | Use in AppBar |
|---------|---------|---------------|
| `<header>` | Page header | Container for main AppBar |
| `<nav>` | Navigation block | Container for nav items |
| `<main>` | Main content | After AppBar |
| `<footer>` | Page footer | After main content |
| `<button>` | Clickable action | Buttons in AppBar |
| `<span>` | Inline text | Non-interactive text |

### Semantic TypeScript Example

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  htmlAttributes: {
    'role': 'banner',
    'aria-label': 'Main site navigation'
  }
});
appbar.appendTo("#appbar");

// Buttons with semantic labels
const menuBtn: Button = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-menu',
  content: 'Menu',
  htmlAttributes: {
    'aria-label': 'Open navigation menu'
  }
});
menuBtn.appendTo('#menuBtn');
```

## ARIA Attributes

**ARIA** (Accessible Rich Internet Applications) attributes make dynamic content accessible to screen readers.

### Common ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Text label for element | `aria-label="Main navigation"` |
| `aria-labelledby` | ID of element that labels this | `aria-labelledby="nav-title"` |
| `aria-expanded` | State of expandable content | `aria-expanded="false"` |
| `aria-hidden` | Hide from screen readers | `aria-hidden="true"` |
| `role` | Semantic role | `role="navigation"` |

### ARIA in AppBar

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  htmlAttributes: {
    'role': 'banner',                    // Main page header
    'aria-label': 'Main application bar',  // Describe purpose
    'aria-expanded': 'true'               // State indicator
  }
});
appbar.appendTo("#appbar");
```

### ARIA Regions

```html
<header id="appbar" role="banner" aria-label="Site header">
    <!-- Main navigation region -->
    <nav role="navigation" aria-label="Primary navigation">
        <button aria-label="Open menu">Menu</button>
        <span id="app-title">My App</span>
        <div class="e-appbar-spacer"></div>
        <button aria-label="User profile">Profile</button>
    </nav>
</header>
```

### Dynamic ARIA States

```ts
let menuOpen = false;

const menuBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-menu'
});
menuBtn.appendTo('#menuBtn');

// Update ARIA when state changes
menuBtn.element.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menuBtn.element.setAttribute('aria-expanded', menuOpen.toString());
  // Toggle menu visibility
});
```

## Keyboard Navigation

Ensure AppBar is fully navigable via keyboard for users who cannot use a mouse.

### Tab Navigation

```html
<header id="appbar">
    <!-- Buttons are tabbable by default -->
    <button id="menuBtn" tabindex="0">Menu</button>
    <span>My App</span>
    <div class="e-appbar-spacer"></div>
    <button id="settingsBtn" tabindex="0">Settings</button>
    <button id="profileBtn" tabindex="0">Profile</button>
</header>
```

### Tab Order Management

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbar = new AppBar({
  colorMode: 'Primary',
  htmlAttributes: {
    'role': 'navigation'
  }
});
appbar.appendTo("#appbar");

// Set explicit tab order
const menuBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-menu'
});
menuBtn.appendTo('#menuBtn');
menuBtn.element.tabIndex = 1;

const profileBtn = new Button({
  cssClass: 'e-inherit',
  content: 'Profile'
});
profileBtn.appendTo('#profileBtn');
profileBtn.element.tabIndex = 2;
```

### Keyboard Shortcuts

```ts
// Support common keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open menus
    closeMenus();
  }
  
  if (e.altKey && e.key === 'm') {
    // Alt+M to focus menu
    e.preventDefault();
    document.getElementById('menuBtn').focus();
  }
});
```

### CSS Focus Styles

```css
/* Visible focus indicators (WCAG requirement) */
#appbar button:focus,
#appbar a:focus {
    outline: 2px solid #4A90E2;
    outline-offset: 2px;
}

/* High contrast focus in forced colors mode */
@media (forced-colors: active) {
    #appbar button:focus,
    #appbar a:focus {
        outline: 2px solid;
    }
}
```

## Color Contrast and Accessibility

WCAG color contrast requirements ensure readability for all users.

### Contrast Ratios

| Standard | Minimum Ratio | Level |
|----------|---------------|-------|
| Text (14px+) | 4.5:1 | AA |
| Text (18px+) | 3:1 | AA |
| Large text | 3:1 | AAA |
| Text (14px+) | 7:1 | AAA |
| Text (18px+) | 4.5:1 | AAA |

### Testing Color Contrast

Use online tools:
- WebAIM Contrast Checker
- Colordot by Hailpixel
- Chrome DevTools Accessibility Inspector

### AppBar Color Combinations

```ts
// Good contrast: Dark text on light background
const lightAppBar = new AppBar({
  colorMode: 'Light'  // Light bg + dark text
});

// Good contrast: Light text on dark background
const darkAppBar = new AppBar({
  colorMode: 'Dark'   // Dark bg + light text
});

// Good contrast: Light text on brand color
const primaryAppBar = new AppBar({
  colorMode: 'Primary'  // Brand color + light text
});
```

### Text with Icons

```html
<!-- Provide text alternative for icons -->
<button aria-label="Open menu">
    <span class="icon">☰</span>
    <span class="text">Menu</span>
</button>

<!-- Or use aria-label alone -->
<button aria-label="Open menu" class="icon-only">☰</button>
```

## Responsive Design

Ensure AppBar works on all screen sizes.

### Mobile-First Approach

```css
/* Mobile first: dense, bottom */
#appbar {
    position: fixed;
    bottom: 0;
    height: 48px;
    width: 100%;
}

body {
    padding-bottom: 48px;
}

/* Tablet: regular, top */
@media (min-width: 600px) {
    #appbar {
        position: sticky;
        top: 0;
        height: 56px;
    }
    
    body {
        padding-bottom: 0;
    }
}

/* Desktop: regular, top, sticky */
@media (min-width: 1024px) {
    #appbar {
        position: sticky;
        top: 0;
        height: 64px;
        z-index: 10;
    }
}
```

### Touch Target Sizes

WCAG recommends minimum 44x44px touch targets on mobile.

```css
/* Mobile buttons: 44px minimum */
@media (max-width: 599px) {
    #appbar .e-btn {
        min-height: 44px;
        min-width: 44px;
        padding: 8px;
    }
}

/* Desktop buttons: 36px minimum */
@media (min-width: 600px) {
    #appbar .e-btn {
        min-height: 36px;
        padding: 6px 12px;
    }
}
```

### Viewport Meta Tag

```html
<!-- Essential for responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## Performance Optimization

Optimize AppBar for fast loading and smooth interaction.

### Code Splitting

```ts
// Lazy load AppBar only when needed
async function initializeAppBar() {
  const { AppBar } = await import('@syncfusion/ej2-navigations');
  
  const appbar = new AppBar({
    colorMode: 'Primary'
  });
  appbar.appendTo("#appbar");
}

// Call on page load
initializeAppBar();
```

### CSS Optimization

```css
/* Minimize repaints with will-change (use sparingly) */
#appbar {
    will-change: transform;
}

/* Optimize sticky positioning */
#appbar {
    contain: layout style paint;
}
```

### Lazy Loading Images

```ts
// For AppBar with background images
const appbar = new AppBar({
  colorMode: 'Primary',
  cssClass: 'hero-appbar'
});
appbar.appendTo("#appbar");
```

```css
/* Lazy load background image */
.hero-appbar {
    background-image: url('data:image/svg+xml,<svg>...</svg>');
    background-attachment: fixed;
}

/* Progressive enhancement */
@media (prefers-reduced-motion: reduce) {
    .hero-appbar {
        background-attachment: scroll;
    }
}
```

## Common Pitfalls

### Pitfall 1: Missing Alt Text for Icons

**❌ Bad:**
```html
<button><span class="icon">☰</span></button>
```

**✅ Good:**
```html
<button aria-label="Open menu"><span class="icon">☰</span></button>
```

### Pitfall 2: Poor Focus Management

**❌ Bad:**
```css
button:focus {
    outline: none;  /* WCAG violation */
}
```

**✅ Good:**
```css
button:focus {
    outline: 2px solid #4A90E2;
    outline-offset: 2px;
}
```

### Pitfall 3: Insufficient Color Contrast

**❌ Bad:**
```ts
new AppBar({
  cssClass: 'custom-appbar'  // Gray text on light gray bg (low contrast)
});
```

**✅ Good:**
```ts
new AppBar({
  colorMode: 'Primary'  // High contrast colors
});
```

### Pitfall 4: Non-Semantic Markup

**❌ Bad:**
```html
<div id="appbar">
    <div id="menu"></div>
</div>
```

**✅ Good:**
```html
<header id="appbar">
    <nav id="menu"></nav>
</header>
```

### Pitfall 5: Missing Responsive Design

**❌ Bad:**
```css
#appbar {
    height: 64px;  /* Fixed for desktop only */
}
```

**✅ Good:**
```css
#appbar {
    height: 48px;  /* Mobile */
}

@media (min-width: 600px) {
    #appbar {
        height: 56px;  /* Tablet */
    }
}

@media (min-width: 1024px) {
    #appbar {
        height: 64px;  /* Desktop */
    }
}
```

## Troubleshooting

**Issue: Screen reader not announcing AppBar**
- Add `role="banner"` attribute
- Use `aria-label` to describe purpose
- Use semantic `<header>` element

**Issue: Keyboard navigation not working**
- Ensure buttons have `tabindex="0"` or no tabindex
- Test with Tab, Shift+Tab, Enter, Escape
- Provide visual focus indicators

**Issue: Color contrast failing WCAG**
- Use WebAIM Contrast Checker to verify
- Increase color difference between text and background
- Use Syncfusion's built-in color modes (Light, Dark, Primary)

**Issue: AppBar not responsive on mobile**
- Set viewport meta tag
- Use media queries for different breakpoints
- Test on actual mobile devices

**Issue: Icon buttons not accessible**
- Add `aria-label` to icon buttons
- Provide text alternative
- Ensure 44px touch target on mobile

## Accessibility Checklist

- ✅ Use semantic HTML (`<header>`, `<nav>`, `<button>`)
- ✅ Add `aria-label` to describe purpose
- ✅ Ensure keyboard navigation (Tab, Enter, Escape)
- ✅ Provide visible focus indicators
- ✅ Meet WCAG color contrast ratios (4.5:1 minimum)
- ✅ Use 44px+ touch targets on mobile
- ✅ Set viewport meta tag
- ✅ Test with screen readers (NVDA, JAWS)
- ✅ Test with keyboard only
- ✅ Test on multiple devices
- ✅ Avoid `outline: none` without replacement
- ✅ Use `aria-expanded` for dynamic content
- ✅ Provide text alternatives for icons
- ✅ Support prefers-reduced-motion

## Testing Tools

- **Accessibility Inspector:** Chrome DevTools > Accessibility tab
- **Contrast Checker:** WebAIM (webaim.org)
- **Screen Reader:** NVDA (free, Windows)
- **Mobile Testing:** Chrome DevTools device emulation
- **Automated Testing:** Axe DevTools browser extension

## Next Steps

- Review **positioning** with [Positioning Guide](positioning-and-sticky.md)
- Explore **layout patterns** with [Layout Patterns](layout-patterns-and-design.md)
- Learn **styling** with [Styling Guide](styling-customization.md)

