# Troubleshooting

Common issues, solutions, and debugging techniques for the Sidebar component.

## Table of Contents

- [Installation and Setup Issues](#installation-and-setup-issues)
- [Target Property Issues](#target-property-issues)
- [Animation and Performance Issues](#animation-and-performance-issues)
- [Mobile and Responsive Issues](#mobile-and-responsive-issues)
- [Open/Close Method Issues](#openclose-method-issues)
- [Docking Issues](#docking-issues)
- [Z-Index and Stacking Issues](#z-index-and-stacking-issues)
- [Accessibility Issues](#accessibility-issues)
- [Debugging Techniques](#debugging-techniques)
- [Performance Monitoring](#performance-monitoring)
- [Common Error Messages](#common-error-messages)
- [Getting Help](#getting-help)
- [Next Steps](#next-steps)

## Installation and Setup Issues

### Problem: Styles Not Loading (CSS Missing)

**Symptom**: Sidebar appears without styling or doesn't collapse properly

**Solutions:**

1. Verify CSS imports in your styles file:
```css
@import "../../node_modules/@syncfusion/ej2-base/styles/fluent2.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/fluent2.css";
```

2. Check for 404 errors in browser DevTools Console:
- Open DevTools (F12)
- Check Network tab for CSS files
- Verify file paths match your project structure

3. Rebuild your project:
```bash
npm install
npm start
```

### Problem: Component Not Rendering

**Symptom**: Sidebar doesn't appear at all

**Solutions:**

1. Ensure HTML element exists:
```html
<aside id="sidebar">Content</aside>
```

2. Verify TypeScript initialization:
```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar();
sidebar.appendTo('#sidebar');  // ← Must match element ID
```

3. Check browser console for errors (F12 → Console tab)

4. Verify JavaScript is enabled in browser

### Problem: TypeScript Compilation Errors

**Symptom**: Errors like "Cannot find module '@syncfusion/ej2-navigations'"

**Solutions:**

1. Install packages:
```bash
npm install @syncfusion/ej2-navigations
npm install @syncfusion/ej2-base
```

2. Update tsconfig.json with proper module target

3. Clear npm cache:
```bash
npm cache clean --force
npm install
```

## Target Property Issues

### Problem: Content Not Moving (Push/Slide Not Working)

**Symptom**: Sidebar opens but content doesn't push or slide

**Solutions with Implicit Targeting:**

```typescript
// ❌ Wrong - no sibling
<aside id="sidebar">Content</aside>
// Missing next sibling!

// ✅ Correct - has next sibling
<aside id="sidebar">Content</aside>
<div><!-- This div is the target --></div>
```

**Solutions with Explicit Targeting:**

```typescript
// ❌ Wrong - no inner wrapper
let sidebar: Sidebar = new Sidebar({
    target: '#content'
});
sidebar.appendTo('#sidebar');

<div id="content">Content here</div>  // Missing inner div!

// ✅ Correct - has inner wrapper
let sidebar: Sidebar = new Sidebar({
    target: '#content'
});
sidebar.appendTo('#sidebar');

<div id="content">
    <div><!-- REQUIRED inner wrapper -->
        Content here
    </div>
</div>
```

**Fix Checklist:**
- [ ] Target element exists in DOM
- [ ] Target element has inner `<div>` wrapper
- [ ] Target properties are correct (ID/class match HTML)
- [ ] No CSS `position: fixed` interfering

### Problem: Multiple Targets Conflicting

**Symptom**: Multiple sidebars interfering with each other

**Solution:**

```typescript
// Use specific, non-overlapping targets
let sidebar1: Sidebar = new Sidebar({
    target: '#content-area',    // Main content only
    type: 'Push'
});

let sidebar2: Sidebar = new Sidebar({
    target: '#details-panel',   // Different area
    type: 'Over'
});
```

## Animation and Performance Issues

### Problem: Animations Lag or Stutter

**Symptom**: Sidebar movement is choppy or slow

**Solutions:**

1. **Check for heavy content:**
```typescript
// Simplify content in sidebar
// - Remove large images
// - Reduce nested elements
// - Minimize complex CSS
```

2. **Disable animations on mobile:**
```typescript
const isMobile = window.matchMedia('(max-width: 768px)').matches;

let sidebar: Sidebar = new Sidebar({
    animate: !isMobile  // Instant on mobile
});
sidebar.appendTo('#sidebar');
```

3. **Adjust animation timing:**
```css
/* Faster animation reduces perceived jank */
.e-sidebar.e-open {
    transition: transform 0.2s ease;  /* Was 0.35s */
}
```

4. **Reduce z-index conflicts:**
```css
/* Ensure proper stacking */
.e-sidebar {
    z-index: 1000;
}

.e-sidebar-backdrop {
    z-index: 999;
}

header {
    z-index: 1001;  /* On top if needed */
}
```

### Problem: Animations Disabled But Still Slow

**Symptom**: Even with animate=false, sidebar feels slow

**Solutions:**

1. Check for CSS transitions overriding:
```css
/* Remove any transition rules */
.e-sidebar {
    transition: none !important;
}
```

2. Minimize repaints by reducing content complexity

3. Use DevTools Performance tab:
- Open DevTools
- Go to Performance tab
- Click Record, toggle sidebar, stop recording
- Analyze timeline for bottlenecks

## Mobile and Responsive Issues

### Problem: Sidebar Not Responding to Touch

**Symptom**: Swipe gestures don't work on mobile

**Solutions:**

1. **Enable proper viewport settings:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

2. **Add touch event handlers:**
```typescript
// Swipe detection
let startX = 0;
document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {  // Swiped right
        sidebar.show();
    }
});
```

3. **Test on actual device**, not just browser emulator

### Problem: Wrong Width on Mobile

**Symptom**: Sidebar takes full screen or too small on mobile

**Solutions:**

```typescript
// Responsive width adjustment
function getResponsiveWidth(): string {
    if (window.innerWidth < 480) return '100%';
    if (window.innerWidth < 768) return '250px';
    return '280px';
}

let sidebar: Sidebar = new Sidebar({
    width: getResponsiveWidth()
});
sidebar.appendTo('#sidebar');

// Update on resize
window.addEventListener('resize', () => {
    sidebar.width = getResponsiveWidth();
});
```

### Problem: Sidebar Hidden Behind Other Elements

**Symptom**: Sidebar appears but is behind other page content

**Solutions:**

1. **Increase z-index:**
```css
.e-sidebar {
    z-index: 1000 !important;
}

.e-sidebar-backdrop {
    z-index: 999 !important;
}
```

2. **Check parent stacking context:**
```typescript
// If sidebar parent has position: relative, it creates new stacking context
// Either remove position or increase z-index
const sidebarParent = document.querySelector('#sidebar').parentElement;
sidebarParent?.style.position = 'relative';
sidebarParent?.style.zIndex = '999';
```

## Open/Close Method Issues

### Problem: Sidebar Won't Open/Close

**Symptom**: `show()`, `hide()`, or `toggle()` methods don't work

**Solutions:**

1. **Ensure sidebar is initialized:**
```typescript
let sidebar: Sidebar = new Sidebar();
sidebar.appendTo('#sidebar');  // Must call appendTo!

// Now methods work
sidebar.show();   // ✅ Works
sidebar.hide();   // ✅ Works
sidebar.toggle(); // ✅ Works
```

2. **Check for errors in event listeners:**
```typescript
// Add error handling
document.querySelector('#toggle')?.addEventListener('click', () => {
    try {
        sidebar.toggle();
    } catch (error) {
        console.error('Toggle failed:', error);
    }
});
```

3. **Verify state before calling methods:**
```typescript
// Check current state
if (sidebar.isOpen) {
    sidebar.hide();
} else {
    sidebar.show();
}
```

### Problem: State Events Not Firing

**Symptom**: `open`, `close` event handlers don't execute

**Solutions:**

1. **Ensure events are configured before appendTo:**
```typescript
// ✅ Correct order
let sidebar: Sidebar = new Sidebar({
    open: (e) => console.log('Opened!'),
    close: (e) => console.log('Closed!')
});
sidebar.appendTo('#sidebar');

// ❌ Wrong - events won't work
let sidebar: Sidebar = new Sidebar();
sidebar.appendTo('#sidebar');
sidebar.open = (e) => console.log('Late!');  // Won't fire
```

2. **Check event binding syntax:**
```typescript
// Check for typos in event names
let sidebar: Sidebar = new Sidebar({
    open: (e) => { },      // ✅ 'open'
    // opeN: (e) => { },   // ❌ Wrong case
    // onOpen: (e) => { }  // ❌ Wrong name
});
```

3. **Verify event callback is called:**
```typescript
let sidebar: Sidebar = new Sidebar({
    open: (e) => {
        console.log('Event fired!', e);  // Add logging
    }
});
sidebar.appendTo('#sidebar');
```

## Docking Issues

### Problem: Docked Text Not Hiding

**Symptom**: Text still visible in docked collapsed state

**Solutions:**

1. **Verify CSS is applied:**
```css
/* Make sure this CSS exists */
.e-dock.e-close span.e-text {
    display: none;
}

.e-dock.e-open span.e-text {
    display: inline-block;
}
```

2. **Check selector specificity:**
```css
/* More specific selector if theme overrides */
#sidebar.e-dock.e-close span.e-text {
    display: none !important;
}
```

3. **Verify docking is enabled:**
```typescript
let sidebar: Sidebar = new Sidebar({
    enableDock: true,        // Must be true
    dockSize: '72px'         // Must set size
});
sidebar.appendTo('#sidebar');
```

## Z-Index and Stacking Issues

### Problem: Sidebar Behind Fixed Header

**Symptom**: Header floats over sidebar

**Solutions:**

```css
/* Ensure header has higher z-index */
.fixed-header {
    z-index: 1001;      /* Higher than sidebar */
    position: fixed;
}

.e-sidebar {
    z-index: 1000;
    position: fixed;
}
```

### Problem: Multiple Sidebars Overlapping

**Symptom**: Multiple sidebars appear on top of each other

**Solutions:**

```css
.primary-sidebar {
    z-index: 1000;
}

.secondary-sidebar {
    z-index: 500;       /* Lower z-index */
}

/* Or position separately */
.primary-sidebar {
    left: 0;
}

.secondary-sidebar {
    right: 0;
}
```

## Accessibility Issues

### Problem: Keyboard Navigation Not Working

**Symptom**: Tab key doesn't navigate menu items

**Solutions:**

```typescript
// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        sidebar.hide();  // ESC to close
    }
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        sidebar.toggle();  // Ctrl+M to toggle
    }
});

// Ensure focusable elements have tabindex
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.setAttribute('tabindex', '0');
});
```

### Problem: Screen Reader Not Announcing State

**Symptom**: Screen readers don't announce when sidebar opens/closes

**Solutions:**

```typescript
const ariaLive = document.createElement('div');
ariaLive.setAttribute('role', 'status');
ariaLive.setAttribute('aria-live', 'polite');
document.body.appendChild(ariaLive);

let sidebar: Sidebar = new Sidebar({
    open: () => {
        ariaLive.textContent = 'Sidebar opened';
    },
    close: () => {
        ariaLive.textContent = 'Sidebar closed';
    }
});
sidebar.appendTo('#sidebar');
```

## Debugging Techniques

### Enable Console Logging

```typescript
let sidebar: Sidebar = new Sidebar({
    open: () => console.log('✓ Opened', sidebar.isOpen),
    close: () => console.log('✓ Closed', !sidebar.isOpen),
    revealing: () => console.log('↗ Opening...'),
    hiding: () => console.log('↙ Closing...')
});
sidebar.appendTo('#sidebar');
```

### Inspect DOM State

```typescript
// Check sidebar in DevTools console
document.querySelector('#sidebar').classList  // View classes
document.querySelector('#sidebar').style       // View inline styles
```

### Monitor Events

```typescript
document.querySelector('#toggle')?.addEventListener('click', (e) => {
    console.log('Click event:', e);
    console.log('Sidebar state before:', sidebar.isOpen);
    sidebar.toggle();
    console.log('Sidebar state after:', sidebar.isOpen);
});
```

## Performance Monitoring

Check DevTools Performance:
1. Open DevTools (F12)
2. Go to **Performance** tab
3. Click **Record**
4. Toggle sidebar
5. Stop recording
6. Analyze the timeline for bottlenecks

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot read property 'appendTo' of undefined" | Sidebar not imported | Add `import { Sidebar }` |
| "Cannot find element with id" | Element doesn't exist | Verify HTML element ID |
| "'show' is not a function" | Sidebar not initialized | Call `appendTo()` first |
| "CSS file not found" | Wrong CSS path | Check CSS import paths |
| "Type 'Over' does not exist" | Typo in type name | Use valid types: Over, Push, Slide, Auto |

## Getting Help

If issues persist:

1. **Check browser console** (F12) for errors
2. **Verify HTML structure** matches examples
3. **Test with default settings** (remove customizations)
4. **Check Syncfusion documentation** for latest updates
5. **Create minimal reproduction** for support

## Next Steps

- Review **Styling and Theming** for appearance adjustments
- Check **Content Integration** for menu structure issues
- Explore **Animations and Gestures** for interaction problems
