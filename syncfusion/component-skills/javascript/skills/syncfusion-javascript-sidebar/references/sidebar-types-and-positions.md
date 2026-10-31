# Sidebar Types and Positions

## Table of Contents
- [Expanding Types](#expanding-types)
- [Type Comparison](#type-comparison)
- [Position Options](#position-options)
- [Responsive Auto Type](#responsive-auto-type)

## Expanding Types

The Sidebar supports four different expand types that control how it interacts with the main content area.

### Over Type

The sidebar **floats over** the main content area without pushing it aside:

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Over'
});
sidebar.appendTo('#sidebar');
```

**Characteristics:**
- Main content stays in place
- Sidebar appears on top with optional backdrop
- Common for tight layouts or mobile interfaces
- Default behavior on mobile devices

### Push Type

The sidebar **pushes the main content** to appear side-by-side and shrinks content within screen width:

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    target: document.querySelector('.maincontent')
});
sidebar.appendTo('#sidebar');
```

**Characteristics:**
- Main content shifts right/left when sidebar opens
- Total width = sidebar width + content width
- Best for desktop/tablet layouts
- Provides clear content separation

### Slide Type

The sidebar **translates** the main content based on sidebar width without adjusting within screen:

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Slide'
});
sidebar.appendTo('#sidebar');
```

**Characteristics:**
- Content slides but doesn't shrink
- Content may be partially hidden
- Useful for overflow scenarios
- Works well with horizontal scrolling

### Auto Type (Default)

The sidebar behaves as **Over** on mobile and **Push** on desktop/tablet:

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Auto'  // Default
});
sidebar.appendTo('#sidebar');
```

**Characteristics:**
- Responds to device screen size
- Automatic type switching at breakpoints
- Best for responsive applications
- Always expands on initial load (ignores `enableDock` and `isOpen`)

## Type Comparison

| Type | Mobile | Desktop | Content | Best For |
|------|--------|---------|---------|----------|
| **Over** | Overlay | Overlay | Stays in place | Minimal screen space |
| **Push** | Overlay | Side-by-side | Shrinks width | Clear separation |
| **Slide** | Slide | Slide | Partial overlap | Overflow handling |
| **Auto** | Over | Push | Responsive | Most applications |

## Position Options

### Left Position (Default)

Sidebar appears on the left side of the screen:

```typescript
let sidebar: Sidebar = new Sidebar({
    position: 'Left'  // Default
});
sidebar.appendTo('#sidebar');
```

HTML structure (sidebar must be first element):

```html
<aside id="sidebar"><!-- Sidebar content --></aside>
<div><!-- Main content --></div>
```

### Right Position

Sidebar appears on the right side of the screen:

```typescript
let sidebar: Sidebar = new Sidebar({
    position: 'Right'
});
sidebar.appendTo('#sidebar');
```

HTML structure (sidebar can be anywhere):

```html
<div><!-- Main content --></div>
<aside id="sidebar"><!-- Sidebar content --></aside>
```

## Styling by Type and Position

Apply different styles to each type/position combination:

```css
/* Customize Left Over type */
.e-sidebar.e-left.e-over {
    background-color: #f0f0f0;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

/* Customize Right Push type */
.e-sidebar.e-right.e-push {
    background-color: #2d3436;
    color: #fff;
}

/* Customize Auto type */
.e-sidebar.e-left.e-auto {
    background-color: #e3f2fd;
}

/* Customize Slide type */
.e-sidebar.e-slide {
    background-color: #fff3e0;
}
```

## Responsive Auto Type

The Auto type uses `mediaQuery` to determine when to switch types:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    type: 'Auto',
    mediaQuery: window.matchMedia('(max-width: 768px)')
});
sidebar.appendTo('#sidebar');

// Type switching reference:
// - Below 768px: Sidebar acts as 'Over'
// - Above 768px: Sidebar acts as 'Push'
```

## Changing Type Dynamically

Update the sidebar type at runtime using the `dataBind()` method:

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Over'
});
sidebar.appendTo('#sidebar');

// Later, switch to Push type
sidebar.type = 'Push';
sidebar.dataBind();  // Apply changes immediately

// Switch to Slide type
sidebar.type = 'Slide';
sidebar.dataBind();
```

## Complete Example: All Types

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';
import { RadioButton, ChangeArgs } from '@syncfusion/ej2-buttons';

let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    target: '.main-content'
});
sidebar.appendTo('#sidebar');

// Radio buttons to switch types
let typeOptions = ['Over', 'Push', 'Slide', 'Auto'];

typeOptions.forEach((type) => {
    let radio = new RadioButton({
        label: type,
        name: 'sidebarType',
        change: (args: ChangeArgs) => {
            sidebar.type = type as any;
            sidebar.dataBind();
        }
    });
    radio.appendTo(`#${type.toLowerCase()}Radio`);
});
```

## Common Patterns

**Pattern: Responsive Desktop Navigation**
```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    width: '280px'
});
sidebar.appendTo('#sidebar');
```

**Pattern: Mobile-First Sidebar**
```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Auto',
    mediaQuery: window.matchMedia('(min-width: 768px)'),
    width: '250px'
});
sidebar.appendTo('#sidebar');
```

**Pattern: Always Overlay (Mobile-like)**
```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Over',
    showBackdrop: true
});
sidebar.appendTo('#sidebar');
```

## Transition Effects

Control animation timing for different types:

```css
/* Smooth transition for Over type */
.e-sidebar.e-over.e-open {
    transition: transform 0.3s ease;
}

/* Faster transition for Push type */
.e-sidebar.e-push.e-open {
    transition: transform 0.2s ease;
}

/* Slower transition for Slide type */
.e-sidebar.e-slide.e-open {
    transition: transform 0.5s ease;
}
```

## Next Steps

- Learn **Open and Close Methods** for programmatic control
- Explore **Positioning and Target** for custom layouts
- See **Styling and Theming** for appearance customization
