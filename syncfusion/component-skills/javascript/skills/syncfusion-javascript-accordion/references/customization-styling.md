# Customization and Styling

## Table of Contents

- [CSS Customization Basics](#css-customization-basics)
- [Customizing Container and Items](#customizing-container-and-items)
- [Header Styling](#header-styling)
- [Icons and Font Awesome](#icons-and-font-awesome)
- [Animations and Transitions](#animations-and-transitions)
- [State Styling](#state-styling)
- [Custom Themes](#custom-themes)
- [Advanced Styling](#advanced-styling)

## Overview

The Accordion component uses CSS classes that can be customized to match your application's design. Every element from the container to individual headers and content panels can be styled.

## CSS Customization Basics

### CSS Selector Reference

| Element | CSS Class | Purpose |
|---------|-----------|---------|
| **Accordion container** | `.e-accordion` | Root accordion element |
| **Item container** | `.e-acrdn-item` | Each accordion item |
| **Header** | `.e-acrdn-header` | Item header/title |
| **Header content** | `.e-acrdn-header-content` | Text inside header |
| **Content panel** | `.e-acrdn-content` | Item content area |
| **Toggle icon** | `.e-toggle-icon` | Expand/collapse icon |
| **Active item** | `.e-select` | Currently active item |
| **Focused item** | `.e-item-focus` | Keyboard focused item |

## Customizing Container and Items

### Full Container Customization

```css
.e-accordion {
    border: 5px solid rgb(173, 255, 47);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #f9f9f9;
}
```

### Item Styling

```css
.e-accordion .e-acrdn-item {
    text-align: center;
    color: #333;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    margin: 5px 0;
    border-radius: 4px;
}

/* Remove border from last item */
.e-accordion .e-acrdn-item:last-child {
    border-bottom: none;
}
```

## Header Styling

### Basic Header Customization

```css
.e-accordion .e-acrdn-item > .e-acrdn-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    padding: 16px;
    font-size: 16px;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    transition: all 0.3s ease;
}
```

### Header Hover State

```css
.e-accordion .e-acrdn-item .e-acrdn-header:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}
```

### Selected (Active) Header

```css
.e-accordion .e-acrdn-item.e-select > .e-acrdn-header {
    background: #2fa1ff !important;
    justify-content: center;
    box-shadow: inset 0 -4px 0 #0066cc;
}

.e-accordion .e-acrdn-item.e-select > .e-acrdn-header .e-acrdn-header-content {
    color: white;
    font-weight: 700;
}
```

### Header Text Styling

```css
.e-accordion .e-acrdn-item.e-select.e-active > .e-acrdn-header .e-acrdn-header-content,
.e-accordion .e-acrdn-item.e-select.e-item-focus > .e-acrdn-header .e-acrdn-header-content {
    color: #2fa1ff !important;
}
```

## Icons and Font Awesome

### Using Syncfusion Built-in Icons

Add icons using the `iconCss` property in items:

```typescript
const accordion = new Accordion({
    items: [
        { 
            header: 'Athletics', 
            iconCss: 'e-athletics e-acrdn-icons', 
            content: 'Athletic activities content',
            expanded: true 
        },
        { 
            header: 'Water Games', 
            iconCss: 'e-water-game e-acrdn-icons', 
            content: 'Water sports content' 
        },
        { 
            header: 'Racing', 
            iconCss: 'e-racing-games e-acrdn-icons', 
            content: 'Racing content' 
        }
    ]
});

accordion.appendTo('#element');
```

### Customizing Icon Styles

```css
.e-accordion .e-acrdn-item .e-acrdn-header .e-toggle-icon .e-icons {
    color: pink;
    font-size: 18px;
    margin-right: 8px;
}

/* Different color for expanded state */
.e-accordion .e-acrdn-item.e-select .e-acrdn-header .e-toggle-icon .e-icons {
    color: #2fa1ff;
}
```

### Font Awesome Integration

Include Font Awesome and use it with `iconCss`:

```html
<link rel="stylesheet" href="url">
```

```typescript
const accordion = new Accordion({
    items: [
        { 
            header: 'Settings', 
            iconCss: 'fas fa-cog', 
            content: 'Configuration options' 
        },
        { 
            header: 'Users', 
            iconCss: 'fas fa-users', 
            content: 'User management' 
        },
        { 
            header: 'Reports', 
            iconCss: 'fas fa-chart-bar', 
            content: 'Analytics reports' 
        }
    ]
});

accordion.appendTo('#element');
```

### Font Awesome Icon Styling

```css
.e-accordion .e-acrdn-item .e-acrdn-header .e-toggle-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.e-accordion .e-acrdn-item .e-acrdn-header .e-toggle-icon .fa {
    font-size: 20px;
    color: #667eea;
}

.e-accordion .e-acrdn-item.e-select .e-acrdn-header .e-toggle-icon .fa {
    color: #2fa1ff;
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}
```

## Animations and Transitions

### Animation Configuration

Configure animations using the `animation` object with `expand` and `collapse` settings:

```typescript
const accordion = new Accordion({
    // Disable animations (use 'None' effect)
    animation: {
        expand: { effect: 'None', duration: 0 },
        collapse: { effect: 'None', duration: 0 }
    },
    items: [...]
});
```

### Built-in Animation Effects

The Accordion supports multiple built-in animation effects:

| Effect | Description |
|--------|-------------|
| `SlideDown` | Slides content down (default expand) |
| `SlideUp` | Slides content up (default collapse) |
| `FadeIn` | Fades content in |
| `FadeOut` | Fades content out |
| `FadeZoomIn` | Fades and zooms in together |
| `FadeZoomOut` | Fades and zooms out together |
| `ZoomIn` | Zooms in |
| `ZoomOut` | Zooms out |
| `None` | No animation |

### Set Custom Animation Effects

```typescript
import { Accordion, AccordionEffect } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

const accordion = new Accordion({
    items: [
        { header: 'ASP.NET', content: 'Microsoft ASP.NET...' },
        { header: 'ASP.NET MVC', content: 'The Model-View-Controller...' },
        { header: 'JavaScript', content: 'JavaScript (JS)...' }
    ],
    animation: {
        expand: {
            effect: 'FadeZoomIn',
            duration: 400,
            easing: 'ease-in'
        },
        collapse: {
            effect: 'FadeZoomOut',
            duration: 400,
            easing: 'ease-out'
        }
    }
});

accordion.appendTo('#element');

// Allow users to change animation dynamically
const expandAnimationList = new DropDownList({
    dataSource: ['SlideDown', 'FadeIn', 'FadeZoomIn', 'ZoomIn', 'None'],
    value: 'SlideDown',
    change: () => {
        accordion.animation.expand.effect = expandAnimationList.value as AccordionEffect;
    }
});

expandAnimationList.appendTo('#expandAnimation');

const collapseAnimationList = new DropDownList({
    dataSource: ['SlideUp', 'FadeOut', 'FadeZoomOut', 'ZoomOut', 'None'],
    value: 'SlideUp',
    change: () => {
        accordion.animation.collapse.effect = collapseAnimationList.value as AccordionEffect;
    }
});

collapseAnimationList.appendTo('#collapseAnimation');
```

### Animation Configuration Properties

```typescript
interface AnimationSettings {
    expand: {
        effect: AccordionEffect;        // Animation effect type
        duration: number;                // Duration in milliseconds
        easing: string;                  // Easing function
        delay?: number;                  // Delay before animation
    },
    collapse: {
        effect: AccordionEffect;
        duration: number;
        easing: string;
        delay?: number;
    }
}

const accordion = new Accordion({
    items: [...],
    animation: {
        expand: {
            effect: 'FadeZoomIn',
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            delay: 100
        },
        collapse: {
            effect: 'FadeZoomOut',
            duration: 400,
            easing: 'ease-in-out'
        }
    }
});
```

### CSS Custom Animation

```css
/* Smooth content expansion */
.e-accordion .e-acrdn-content {
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Header transition effects */
.e-accordion .e-acrdn-item > .e-acrdn-header {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Custom Animation Classes

```css
.custom-accordion .e-acrdn-item.e-select > .e-acrdn-header {
    animation: headerPulse 0.4s ease;
}

@keyframes headerPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(47, 161, 255, 0.7);
    }
    100% {
        box-shadow: 0 0 0 10px rgba(47, 161, 255, 0);
    }
}
```

### Animation Duration and Timing

```typescript
const accordion = new Accordion({
    items: [...],
    animation: {
        expand: {
            effect: 'SlideDown',
            duration: 600,      // 600ms animation
            easing: 'ease-in-out'
        },
        collapse: {
            effect: 'SlideUp',
            duration: 400,      // Faster collapse
            easing: 'ease-in'
        }
    }
});

accordion.appendTo('#element');
```

### Conditional Animation Configuration

```typescript
// Adjust animation for slow devices
const isSlowDevice = navigator.deviceMemory && navigator.deviceMemory < 4;

const accordion = new Accordion({
    items: [...],
    animation: {
        expand: { 
            effect: 'SlideDown', 
            duration: isSlowDevice ? 0 : 300,
            easing: 'ease-in'
        },
        collapse: { 
            effect: 'SlideUp', 
            duration: isSlowDevice ? 0 : 200,
            easing: 'ease-out'
        }
    }
});
```

## State Styling

### Expanded Item Styling

```css
/* Selected/Expanded item background */
.e-accordion .e-acrdn-item.e-select.e-active > .e-acrdn-header,
.e-accordion .e-acrdn-item.e-select.e-item-focus > .e-acrdn-header {
    background-color: rgb(0, 15, 100) !important;
    border-left: 4px solid #2fa1ff;
}

/* Expanded item content area */
.e-accordion .e-acrdn-item.e-select > .e-acrdn-content {
    background-color: #ffffff;
    padding: 16px;
    border: 1px solid #e0e0e0;
}
```

### Collapsed Item Styling

```css
.e-accordion .e-acrdn-item:not(.e-select) > .e-acrdn-header {
    background-color: #f5f5f5;
    color: #666;
}
```

### Disabled Item Styling

```css
.e-accordion .e-acrdn-item[aria-disabled="true"] > .e-acrdn-header {
    background-color: #f0f0f0;
    color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
}
```

### Focus State (Keyboard Navigation)

```css
.e-accordion .e-acrdn-item.e-item-focus > .e-acrdn-header {
    outline: 2px solid #2fa1ff;
    outline-offset: -2px;
}
```

## Custom Themes

### Dark Theme Example

```css
.e-accordion.dark-theme {
    background-color: #1e1e1e;
    border: none;
}

.dark-theme .e-acrdn-item {
    background-color: #2d2d2d;
    border-bottom: 1px solid #3d3d3d;
}

.dark-theme .e-acrdn-item > .e-acrdn-header {
    background-color: #2d2d2d;
    color: #e0e0e0;
}

.dark-theme .e-acrdn-item > .e-acrdn-header:hover {
    background-color: #3d3d3d;
}

.dark-theme .e-acrdn-item.e-select > .e-acrdn-header {
    background-color: #0066cc;
    color: white;
}

.dark-theme .e-acrdn-content {
    background-color: #1e1e1e;
    color: #e0e0e0;
}
```

### Using Custom Theme in Code

```typescript
const accordion = new Accordion({
    items: [...],
    cssClass: 'dark-theme'
});

accordion.appendTo('#element');
```

## Advanced Styling

### Material Design Style

```css
.e-accordion.material-style {
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.material-style .e-acrdn-item > .e-acrdn-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 16px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.material-style .e-acrdn-content {
    padding: 24px;
    line-height: 1.6;
    color: #424242;
}
```

### Gradient Headers

```css
.e-accordion .e-acrdn-item > .e-acrdn-header {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    color: white;
}

.e-accordion .e-acrdn-item.e-select > .e-acrdn-header {
    background: linear-gradient(90deg, #f093fb 0%, #764ba2 50%, #667eea 100%);
}
```

### Shadow Effects

```css
.e-accordion {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.e-accordion .e-acrdn-item.e-select > .e-acrdn-header {
    box-shadow: inset 0 -4px 8px rgba(0, 0, 0, 0.1);
}

.e-accordion .e-acrdn-item > .e-acrdn-header:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

### Rounded Corners

```css
.e-accordion {
    border-radius: 12px;
    overflow: hidden;
}

.e-accordion .e-acrdn-item:first-child > .e-acrdn-header {
    border-radius: 12px 12px 0 0;
}

.e-accordion .e-acrdn-item:last-child > .e-acrdn-header {
    border-radius: 0 0 12px 12px;
}
```

## Complete Styling Example

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    expandMode: 'Multiple',
    items: [
        { 
            header: '🎨 Design', 
            iconCss: 'e-design e-acrdn-icons',
            content: 'Design system and guidelines',
            expanded: true 
        },
        { 
            header: '⚡ Performance', 
            iconCss: 'e-performance e-acrdn-icons',
            content: 'Performance optimization tips' 
        },
        { 
            header: '🔒 Security', 
            iconCss: 'e-security e-acrdn-icons',
            content: 'Security best practices' 
        }
    ],
    cssClass: 'modern-accordion',
    animation: {
        expand: { effect: 'SlideDown', duration: 400, easing: 'ease-in' },
        collapse: { effect: 'SlideUp', duration: 400, easing: 'ease-out' }
    },
    width: '100%'
});

accordion.appendTo('#accordion-element');
```

```css
.modern-accordion {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modern-accordion .e-acrdn-item > .e-acrdn-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 18px;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.3s ease;
}

.modern-accordion .e-acrdn-item > .e-acrdn-header:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.modern-accordion .e-acrdn-item.e-select > .e-acrdn-header {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}
```

## Next Steps

- Learn data binding in **Data Loading and Content**
- Use templates for advanced UI in **Templates**
- Handle events in **Advanced Features**
