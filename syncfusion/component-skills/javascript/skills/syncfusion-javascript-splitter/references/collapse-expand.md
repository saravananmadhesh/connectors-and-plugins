# Collapse and Expand Behavior in Syncfusion TypeScript Splitter

## Table of Contents
- [Collapsible Panes](#collapsible-panes)
- [Enabling Collapsible Behavior](#enabling-collapsible-behavior)
- [User-Triggered Actions](#user-triggered-actions)
- [Programmatic Control](#programmatic-control)
- [Expand Method](#expand-method)
- [Collapse Method](#collapse-method)
- [Specify Initial State to Panes](#specify-initial-state-to-panes)
- [Practical Examples](#practical-examples)

## Collapsible Panes

The Splitter provides built-in support for collapsible panes. Users can expand and collapse panes using visual icons without resizing.

### Key Features
- Built-in expand/collapse icons in the separator
- Enable per-pane via `collapsible: true`
- Programmatic control with `expand()` and `collapse()` methods
- Smooth collapse/expand animations
- Dialog-like UI for toggling pane visibility

---

## Enabling Collapsible Behavior

Set `collapsible: true` in the `paneSettings` for each pane you want to make collapsible:

### Single Collapsible Pane

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '250px',
    width: '100%',
    paneSettings: [
        { collapsible: true, size: '200px', content: 'Pane 1' },
        { size: '200px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:** Pane 1 has expand/collapse icons in the separator; Pane 2 does not

### All Panes Collapsible

```typescript
let splitObj: Splitter = new Splitter({
    height: '250px',
    paneSettings: [
        { collapsible: true, size: '200px' },
        { collapsible: true, size: '200px' },
        { collapsible: true, size: '200px' }
    ],
    separatorSize: 2,
    width: '100%'
});
splitObj.appendTo('#splitter');
```

**Result:** Each separator displays expand/collapse icons for adjacent panes

### HTML Example with Collapsible Panes

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Essential JS 2 Splitter Expand/Collapse</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>

<body>
    <div id="container">
        <div id="splitter">
            <div>
                <div class="content">
                    <h3>PARIS</h3>
                    <p>Paris, the city of lights - famous for romance and culture.</p>
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>CAMEMBERT</h3>
                    <p>Village in Normandy, origin of famous French cheese.</p>
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>GRENOBLE</h3>
                    <p>Capital of French Alps, host of 1968 Winter Olympics.</p>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```

---

## User-Triggered Actions

When `collapsible: true` is set, users can click the expand/collapse icons in the separator to toggle pane visibility:

### User Experience Flow

1. **Icon Display:** Expand/collapse icons appear in the separator next to each collapsible pane
2. **Hover Effect:** Icons are visible or highlighted when hovering over the separator
3. **Click Action:** User clicks the icon to collapse or expand the pane
4. **Animation:** Pane smoothly animates to collapsed/expanded state
5. **Result:** Separator remains visible for user to re-expand

### Visual Indicator

```
Original State (Expanded):
[Pane 1] ⬅️➡️ [Pane 2] ⬅️➡️ [Pane 3]
         collapse  collapse

Collapsed State:
[Pane 1 Collapsed] ⬅️➡️ [Pane 2] ⬅️➡️ [Pane 3]
                 expand
```

---

## Programmatic Control

Use the `expand()` and `collapse()` methods to control pane state programmatically from code.

### Programmatic Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '230px',
    paneSettings: [
        { collapsible: true, size: '200px' },
        { collapsible: true, size: '200px' },
        { collapsible: true, size: '200px' }
    ],
    width: '100%'
});
splitObj.appendTo('#splitter');

// Expand/Collapse buttons
document.getElementById('expand').onclick = (): void => {
   splitObj.expand(0);  // Expand pane at index 0
}
document.getElementById('collapse').onclick = (): void => {
   splitObj.collapse(0);  // Collapse pane at index 0
}
```

### HTML for Buttons

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Essential JS 2 Splitter - Programmatic Control</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>

<body>
    <div id="container">
        <!-- Control Buttons -->
        <div style="margin-bottom: 10px;">
            <button id="expand" class="e-control e-btn e-lib">Expand Pane 1</button>
            <button id="collapse" class="e-control e-btn e-lib">Collapse Pane 1</button>
        </div>

        <!-- Splitter -->
        <div id="splitter">
            <div>
                <div class="content">
                    <h3>PARIS</h3>
                    Paris, the city of lights...
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>CAMEMBERT</h3>
                    Village in Normandy...
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>GRENOBLE</h3>
                    Capital of the French Alps...
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```

---

## Expand Method

Programmatically expand a collapsed pane using the `expand()` method:

### Method Signature

```typescript
expand(index: number): void
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `index` | number | Yes | Zero-based index of the pane to expand |

### Examples

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { collapsible: true, size: '200px' },
        { collapsible: true, size: '200px' },
        { collapsible: true, size: '200px' }
    ]
});
splitObj.appendTo('#splitter');

// Expand pane at index 0 (first pane)
splitObj.expand(0);

// Expand pane at index 1 (second pane)
splitObj.expand(1);

// Expand pane at index 2 (third pane)
splitObj.expand(2);
```

### Expand Multiple Panes Sequentially

```typescript
// Expand all panes
for (let i = 0; i < 3; i++) {
    splitObj.expand(i);
}
```

### Expand with Delay

```typescript
// Expand pane 0 after 1 second
setTimeout(() => {
    splitObj.expand(0);
}, 1000);
```

---

## Collapse Method

Programmatically collapse an expanded pane using the `collapse()` method:

### Method Signature

```typescript
collapse(index: number): void
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `index` | number | Yes | Zero-based index of the pane to collapse |

### Examples

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { collapsible: true, size: '200px' },
        { collapsible: true, size: '200px' },
        { collapsible: true, size: '200px' }
    ]
});
splitObj.appendTo('#splitter');

// Collapse pane at index 0 (first pane)
splitObj.collapse(0);

// Collapse pane at index 1 (second pane)
splitObj.collapse(1);

// Collapse pane at index 2 (third pane)
splitObj.collapse(2);
```

### Collapse Multiple Panes Sequentially

```typescript
// Collapse all panes
for (let i = 0; i < 3; i++) {
    splitObj.collapse(i);
}
```

### Toggle Collapse State

```typescript
// Toggle between collapse and expand
let isCollapsed = false;
document.getElementById('toggleBtn').onclick = (): void => {
    if (isCollapsed) {
        splitObj.expand(0);
        isCollapsed = false;
    } else {
        splitObj.collapse(0);
        isCollapsed = true;
    }
}
```

---

## Practical Examples

### Example 1: Dashboard with Collapsible Sidebar

```typescript
let splitObj: Splitter = new Splitter({
    height: '500px',
    width: '100%',
    paneSettings: [
        {
            collapsible: true,
            size: '200px',
            min: '180px',
            content: 'Sidebar Navigation'
        },
        {
            size: '100%',
            content: 'Main Dashboard Content'
        }
    ]
});
splitObj.appendTo('#splitter');

// Button to toggle sidebar
document.getElementById('toggleSidebar').onclick = (): void => {
    splitObj.collapse(0);  // Hide sidebar
}
```

### Example 2: Multi-Pane with Independent Control

```typescript
let splitObj: Splitter = new Splitter({
    height: '400px',
    paneSettings: [
        { collapsible: true, size: '150px', content: 'Left Panel' },
        { collapsible: true, size: '300px', content: 'Center Panel' },
        { collapsible: true, size: '150px', content: 'Right Panel' }
    ]
});
splitObj.appendTo('#splitter');

// Control panel visibility
document.getElementById('showLeft').onclick = (): void => splitObj.expand(0);
document.getElementById('hideLeft').onclick = (): void => splitObj.collapse(0);

document.getElementById('showCenter').onclick = (): void => splitObj.expand(1);
document.getElementById('hideCenter').onclick = (): void => splitObj.collapse(1);

document.getElementById('showRight').onclick = (): void => splitObj.expand(2);
document.getElementById('hideRight').onclick = (): void => splitObj.collapse(2);
```

### Example 3: Responsive Mobile Layout

```typescript
let splitObj: Splitter = new Splitter({
    height: '100vh',
    width: '100%',
    paneSettings: [
        { collapsible: true, size: '200px', content: 'Navigation' },
        { collapsible: true, content: 'Main Content' }
    ]
});
splitObj.appendTo('#splitter');

// Auto-collapse for mobile screens
if (window.innerWidth < 768) {
    splitObj.collapse(0);  // Hide navigation by default on mobile
}

// Re-layout on resize
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        splitObj.collapse(0);
    } else {
        splitObj.expand(0);
    }
});
```

---

## Specify Initial State to Panes

Render panes in a collapsed state on initial page load by setting the `collapsed` property in `paneSettings`:

### Initial Collapsed State

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '250px',
    width: '100%',
    paneSettings: [
        { collapsible: true, size: '200px', content: 'Pane 1' },
        { collapsible: true, size: '200px', collapsed: true, content: 'Pane 2 (Collapsed)' },
        { collapsible: true, size: '200px', content: 'Pane 3' }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:** Pane 2 renders in a collapsed state when the page loads

### Collapsed Property

```typescript
paneSettings: [
    { collapsed: true }  // Pane starts collapsed
    { collapsed: false } // Pane starts expanded (default)
]
```

### Multiple Collapsed Panes

```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    paneSettings: [
        { collapsible: true, size: '200px', collapsed: true },   // Collapsed
        { collapsible: true, size: '200px' },                    // Expanded
        { collapsible: true, size: '200px', collapsed: true }    // Collapsed
    ]
});
splitObj.appendTo('#splitter');
```

### Use Cases

- **Accordion-style:** Collapse sections by default, user expands as needed
- **Detail panels:** Hide supplementary information by default
- **Mobile optimization:** Start with minimal panes for small screens
- **Workflow:** Collapse completed sections, show active section

### Combined with Programmatic Control

```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    paneSettings: [
        { collapsible: true, size: '200px', collapsed: true },
        { collapsible: true, size: '200px' },
        { collapsible: true, size: '200px', collapsed: true }
    ]
});
splitObj.appendTo('#splitter');

// Expand collapsed pane programmatically
document.getElementById('showPane1').onclick = (): void => {
    splitObj.expand(0);  // Expand first pane
}
```

---

## Summary

- **Enable collapsible:** Set `collapsible: true` in `paneSettings`
- **Initial collapsed:** Set `collapsed: true` to start in collapsed state
- **User actions:** Click icons in separator to expand/collapse
- **Programmatic expand:** `splitObj.expand(index)`
- **Programmatic collapse:** `splitObj.collapse(index)`
- **Index:** Zero-based pane index (0, 1, 2, etc.)
- **Common use:** Collapsible sidebars, panels, document sections, accordions
