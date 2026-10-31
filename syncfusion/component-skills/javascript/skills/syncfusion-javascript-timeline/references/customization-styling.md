# Customization and Styling

## Table of Contents
- [Overview](#overview)
- [Connector Styling](#connector-styling)
  - [Common Connector Styling](#common-connector-styling)
  - [Individual Connector Styling](#individual-connector-styling)
- [Dot Styling](#dot-styling)
  - [Dot Color](#dot-color)
  - [Dot Size](#dot-size)
  - [Dot Shadow](#dot-shadow)
  - [Dot Border and Outline](#dot-border-and-outline)
  - [Dot Variants](#dot-variants)
- [Advanced Customization](#advanced-customization)
- [Complete Example](#complete-example)

## Overview

The Timeline control provides extensive customization options to personalize the appearance of connectors, dots, and overall layout. Customize the Timeline by adjusting:

- Connector lines (solid, dashed, colored)
- Dot appearance (size, color, borders, shadows)
- Individual item styling via CSS classes
- Container-level CSS classes for global modifications

## Connector Styling

Connectors are the lines that connect timeline dots. They can be styled globally or individually.

### Common Connector Styling

Apply uniform styles to all Timeline connector lines using the Timeline's `cssClass` property combined with CSS targeting.

#### Basic Connector Styling

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const dailyRoutine: TimelineItemModel[] = [
  { content: 'Eat' },
  { content: 'Code' },
  { content: 'Repeat' }
];

let timeline: Timeline = new Timeline({
  items: dailyRoutine,
  cssClass: 'custom-connector'
});

timeline.appendTo("#timeline");
```

#### CSS for Common Connector Styling

```css
/* Target all connectors with the custom-connector class */
.custom-connector .e-timeline-item.e-connector::after {
    border-color: #f7c867;      /* Golden connector color */
    border-width: 1.4px;        /* Increased thickness */
}
```

**CSS Selectors Explained:**
- `.custom-connector` - Timeline container with custom class
- `.e-timeline-item` - Individual timeline item element
- `.e-connector` - Items with connectors (not the last item)
- `::after` - Pseudo-element containing the connector line

#### Connector Style Properties

```css
/* Solid line (default) */
.custom-connector .e-timeline-item.e-connector::after {
    border-color: #2196F3;      /* Blue solid line */
    border-width: 2px;
}

/* Dashed line */
.custom-connector .e-timeline-item.e-connector::after {
    border: 2px dashed #FF9800;  /* Orange dashed line */
}

/* Dotted line */
.custom-connector .e-timeline-item.e-connector::after {
    border: 1px dotted #4CAF50;  /* Green dotted line */
}

/* Thick gradient effect */
.custom-connector .e-timeline-item.e-connector::after {
    border: 3px solid #9C27B0;   /* Purple thick line */
}
```

### Individual Connector Styling

Apply unique styles to specific item connectors based on item states or properties.

```typescript
const dailyRoutine: TimelineItemModel[] = [
  { content: 'Eat', cssClass: 'state-initial' },
  { content: 'Code', cssClass: 'state-intermediate' },
  { content: 'Repeat' }
];

let timeline: Timeline = new Timeline({
  items: dailyRoutine,
  cssClass: 'custom-connector'
});

timeline.appendTo("#timeline");
```

#### CSS for Individual Styling

```css
/* Container-level class */
.custom-connector .state-initial.e-connector::after {
    border: 1.5px #f8c050 dashed;    /* Dashed yellow for initial state */
}

.custom-connector .state-intermediate.e-connector::after {
    border: 1.5px #4d85f5 dashed;    /* Dashed blue for intermediate state */
}

/* Default styling for items without specific class */
.custom-connector .e-timeline-item.e-connector::after {
    border: 1.5px #90EE90 solid;     /* Solid light green for default */
}
```

## Dot Styling

The dots are the circular markers at each timeline item. Multiple styling options are available.

### Dot Color

Modify dot colors to highlight specific Timeline items or represent different states.

```typescript
const orderStatus: TimelineItemModel[] = [
  { content: 'Ordered', cssClass: 'state-completed' },
  { content: 'Shipped', cssClass: 'state-progress' },
  { content: 'Delivered' }
];

let timeline: Timeline = new Timeline({
  items: orderStatus,
  cssClass: 'dot-color'
});

timeline.appendTo("#timeline");
```

#### CSS for Dot Color

```css
.dot-color .state-completed .e-dot {
    background: #ff9900;              /* Orange background */
    outline: 1px dashed #ff9900;      /* Matching outline */
    border-color: #ff9900;
}

.dot-color .state-progress .e-dot {
    background: #33cc33;              /* Green background */
    outline: 1px dashed #33cc33;      /* Matching outline */
    border-color: #33cc33;
}

/* Default dot styling */
.dot-color .e-dot {
    background: #cccccc;              /* Gray for default/pending */
}
```

**Dot CSS Properties:**
- `background` - Fill color of the dot
- `outline` - Optional outline around the dot
- `border-color` - Color of the dot's border
- `border-width` - Thickness of the dot's border

### Dot Size

Adjust the dot size using the `--dot-size` CSS variable. This custom property scales dot dimensions.

```typescript
const dotSizes: TimelineItemModel[] = [
  { content: 'Extra Small', cssClass: 'x-small' },
  { content: 'Small', cssClass: 'small' },
  { content: 'Medium', cssClass: 'medium' },
  { content: 'Large', cssClass: 'large' }
];

let timeline: Timeline = new Timeline({
  items: dotSizes,
  cssClass: 'dot-size'
});

timeline.appendTo("#timeline");
```

#### CSS for Dot Sizes

```css
.dot-size .x-small {
    --dot-size: 8px;    /* Extra small dots */
}

.dot-size .small {
    --dot-size: 12px;   /* Small dots */
}

.dot-size .medium {
    --dot-size: 16px;   /* Medium dots (default ~16px) */
}

.dot-size .large {
    --dot-size: 24px;   /* Large dots */
}

/* For horizontal orientation, you might also adjust spacing */
.dot-size {
    --dot-outer-space: 15px;  /* Spacing around dots */
}
```

### Dot Shadow

Add shadow effects to timeline dots by using the `--dot-outer-space`, `--dot-border` CSS variables, along with `outline-color`, `border-color`, and `box-shadow` properties to provide a visually engaging appearance.

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const orderStatus: TimelineItemModel[] = [
  { content: 'Ordered' },
  { content: 'Shipped' },
  { content: 'Delivered' }
];

let timeline: Timeline = new Timeline({
  items: orderStatus,
  cssClass: 'dot-shadow'
});

timeline.appendTo("#timeline");
```

#### CSS for Dot Shadows

```css
.dot-shadow .e-dot {
    --dot-outer-space: 3px;
    --dot-border: 3px;
    --dot-size: 20px;
    outline-color: #dee2e6;
    border-color: #fff;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5),
                2px -2px 4px rgba(255, 255, 255, 0.5) inset;
}
```

#### Shadow CSS Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `--dot-outer-space` | Spacing around the dot (outline) | `3px` |
| `--dot-border` | Border width of the dot | `3px` |
| `--dot-size` | Size of the dot | `20px` |
| `outline-color` | Color of the outer outline | `#dee2e6` |
| `border-color` | Color of the dot border | `#fff` |
| `box-shadow` | Shadow effect (offset, blur, color) | `3px 3px 10px rgba(0, 0, 0, 0.5)` |

**Shadow Box Properties:**
- **offset-x offset-y:** Position offset (3px right, 3px down)
- **blur-radius:** Shadow blur intensity (10px)
- **color:** Shadow color with opacity (black at 50%)
- **inset:** Creates inner shadow effect

#### Advanced Shadow Example

Create multi-layered shadow effects:

```typescript
const items: TimelineItemModel[] = [
  { content: 'Ordered', cssClass: 'shadow-standard' },
  { content: 'Shipped', cssClass: 'shadow-elevated' },
  { content: 'Delivered', cssClass: 'shadow-deep' }
];

let timeline: Timeline = new Timeline({
  items: items,
  cssClass: 'shadow-variations'
});

timeline.appendTo("#timeline");
```

```css
/* Standard shadow */
.shadow-variations .shadow-standard .e-dot {
    --dot-outer-space: 3px;
    --dot-border: 2px;
    --dot-size: 18px;
    outline-color: #e0e0e0;
    border-color: #fff;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}

/* Elevated shadow with depth */
.shadow-variations .shadow-elevated .e-dot {
    --dot-outer-space: 4px;
    --dot-border: 3px;
    --dot-size: 20px;
    outline-color: #bdbdbd;
    border-color: #fafafa;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5),
                2px -2px 4px rgba(255, 255, 255, 0.5) inset;
}

/* Deep shadow with strong emphasis */
.shadow-variations .shadow-deep .e-dot {
    --dot-outer-space: 5px;
    --dot-border: 4px;
    --dot-size: 22px;
    outline-color: #9e9e9e;
    border-color: #f5f5f5;
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.6),
                3px -3px 6px rgba(255, 255, 255, 0.4) inset;
}
```

### Dot Border and Outline

Customize dot borders and outlines for visual emphasis using standard CSS properties or the built-in `e-outline` class.

#### Custom Border and Outline Styling

```typescript
const items: TimelineItemModel[] = [
  { content: 'Item 1', cssClass: 'dot-border' },
  { content: 'Item 2', cssClass: 'dot-outline' },
  { content: 'Item 3', cssClass: 'dot-shadow' }
];

let timeline: Timeline = new Timeline({
  items: items,
  cssClass: 'custom-dots'
});

timeline.appendTo("#timeline");
```

#### CSS for Custom Borders and Outlines

```css
/* Thick border */
.custom-dots .dot-border .e-dot {
    background: white;
    border: 3px solid #2196F3;   /* Thick blue border */
}

/* Outline style */
.custom-dots .dot-outline .e-dot {
    background: #E3F2FD;         /* Light blue fill */
    outline: 2px solid #2196F3;  /* Thick outline */
    outline-offset: 2px;         /* Space between dot and outline */
}

/* Shadow effect */
.custom-dots .dot-shadow .e-dot {
    background: #4CAF50;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3),  /* Dark shadow */
                0 0 8px rgba(76,175,80,0.4);  /* Glow effect */
}
```

#### Built-in Outline Class

Apply the `e-outline` class to the Timeline container to automatically enable outline styling for all dots:

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const orderStatus: TimelineItemModel[] = [
  { content: 'Shipped' },
  { content: 'Departed' },
  { content: 'Arrived' },
  { content: 'Out for Delivery' }
];

let timeline: Timeline = new Timeline({
  items: orderStatus,
  cssClass: 'e-outline'  // Built-in outlined dot styling
});

timeline.appendTo("#timeline");
```

The `e-outline` class provides predefined outline styling that:
- Creates visible outlines around dots
- Uses the control's theme colors
- Maintains consistent spacing
- Works across all orientations and alignments

### Dot Variants

Achieve the desired dot variant by customizing the border, outline, and background colors of the Timeline dots. Use CSS properties like `--dot-radius` to control dot shape and `background-color: unset` for outlined variants.

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const dotVariants: TimelineItemModel[] = [
  { content: 'Filled', cssClass: 'dot-filled' },
  { content: 'Flat', cssClass: 'dot-flat' },
  { content: 'Outlined', cssClass: 'dot-outlined' }
];

let timeline: Timeline = new Timeline({
  items: dotVariants,
  cssClass: 'dot-variant'
});

timeline.appendTo("#timeline");
```

#### CSS for Dot Variants

```css
/* Filled variant - solid background with text */
.dot-variant .dot-filled .e-dot::before {
    content: 'A';
    color: #fff;
}

.dot-variant .dot-filled .e-dot {
    background: #33cc33;
    --dot-outer-space: 3px;
    outline-color: #81ff05;
    --dot-size: 25px;
}

/* Flat variant - uniform appearance with reduced radius */
.dot-variant .dot-flat .e-dot::before {
    content: 'B';
    color: #fff;
}

.dot-variant .dot-flat .e-dot {
    background: #33cc33;
    --dot-size: 25px;
    --dot-radius: 10%;
}

/* Outlined variant - hollow with border, no fill */
.dot-variant .dot-outlined .e-dot::before {
    content: 'C';
}

.dot-variant .dot-outlined .e-dot {
    outline-color: #33cc33;
    --dot-outer-space: 3px;
    background-color: unset;  /* Remove background fill */
    --dot-size: 25px;
}
```

#### Variant Properties Reference

| Variant | Properties | Use Case |
|---------|-----------|----------|
| **Filled** | `background`, `--dot-outer-space`, `outline-color` | Emphasis, important states |
| **Flat** | `background`, `--dot-radius` | Minimalist, clean design |
| **Outlined** | `outline-color`, `--dot-outer-space`, `background-color: unset` | Subtle, secondary states |

#### Advanced Variant Example

Create custom variants with additional styling:

```typescript
const statusItems: TimelineItemModel[] = [
  { content: 'Success', cssClass: 'variant-success' },
  { content: 'Warning', cssClass: 'variant-warning' },
  { content: 'Error', cssClass: 'variant-error' },
  { content: 'Info', cssClass: 'variant-info' }
];

let timeline: Timeline = new Timeline({
  items: statusItems,
  cssClass: 'status-variants'
});

timeline.appendTo("#timeline");
```

```css
/* Success variant */
.status-variants .variant-success .e-dot::before {
    content: '✓';
    color: #fff;
    font-weight: bold;
}

.status-variants .variant-success .e-dot {
    background: #4CAF50;
    --dot-outer-space: 3px;
    outline-color: #81C784;
    --dot-size: 24px;
}

/* Warning variant */
.status-variants .variant-warning .e-dot::before {
    content: '!';
    color: #fff;
    font-weight: bold;
}

.status-variants .variant-warning .e-dot {
    background: #FF9800;
    --dot-outer-space: 3px;
    outline-color: #FFB74D;
    --dot-size: 24px;
}

/* Error variant */
.status-variants .variant-error .e-dot::before {
    content: '✕';
    color: #fff;
    font-weight: bold;
}

.status-variants .variant-error .e-dot {
    background: #F44336;
    --dot-outer-space: 3px;
    outline-color: #EF5350;
    --dot-size: 24px;
}

/* Info variant - outlined style */
.status-variants .variant-info .e-dot::before {
    content: 'i';
    color: #2196F3;
    font-weight: bold;
}

.status-variants .variant-info .e-dot {
    outline-color: #2196F3;
    --dot-outer-space: 3px;
    background-color: unset;
    --dot-size: 24px;
}
```

## Advanced Customization

### Combining Multiple Customizations

```typescript
const complexTimeline: TimelineItemModel[] = [
  { 
    content: 'Step 1', 
    oppositeContent: 'Started',
    cssClass: 'step-active dot-success',
    dotCss: 'dot-icon-check'
  },
  { 
    content: 'Step 2', 
    oppositeContent: 'In Progress',
    cssClass: 'step-progress dot-warning',
    dotCss: 'dot-icon-clock'
  },
  { 
    content: 'Step 3', 
    oppositeContent: 'Pending',
    cssClass: 'step-pending dot-info',
    dotCss: 'dot-icon-pending'
  }
];

let timeline: Timeline = new Timeline({
  items: complexTimeline,
  cssClass: 'advanced-timeline',
  align: 'Alternate',
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

#### CSS for Advanced Customization

```css
.advanced-timeline {
    --dot-size: 20px;
    --dot-outer-space: 15px;
}

/* Step styling */
.advanced-timeline .step-active {
    background-color: #e8f5e9;
}

.advanced-timeline .step-progress {
    background-color: #fff3e0;
}

.advanced-timeline .step-pending {
    background-color: #e3f2fd;
}

/* Dot styling with icons */
.dot-icon-check.e-dot::before {
    content: '✓';
    color: white;
    font-weight: bold;
    font-size: 12px;
}

.dot-icon-clock.e-dot::before {
    content: '⏱';
    color: white;
    font-size: 10px;
}

.dot-icon-pending.e-dot::before {
    content: '•••';
    color: white;
    font-size: 14px;
}

/* Content styling */
.advanced-timeline .step-active .e-dot {
    background: #4CAF50;
    border-color: #2E7D32;
}

.advanced-timeline .step-progress .e-dot {
    background: #FF9800;
    border-color: #E65100;
}

.advanced-timeline .step-pending .e-dot {
    background: #2196F3;
    border-color: #1565C0;
}

/* Connector customization */
.advanced-timeline .step-active.e-connector::after {
    border-color: #4CAF50;
    border-width: 2px;
}

.advanced-timeline .step-progress.e-connector::after {
    border-color: #FF9800;
    border-width: 2px;
    border-style: dashed;
}

.advanced-timeline .step-pending.e-connector::after {
    border-color: #2196F3;
    border-width: 1px;
    border-style: dotted;
}
```

## Complete Example

A comprehensive example combining all customization features:

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const projectTimeline: TimelineItemModel[] = [
  {
    content: 'Project Kickoff',
    oppositeContent: 'Jan 1, 2024',
    cssClass: 'phase-completed',
    dotCss: 'dot-complete'
  },
  {
    content: 'Design Phase',
    oppositeContent: 'Jan 15, 2024',
    cssClass: 'phase-completed',
    dotCss: 'dot-complete'
  },
  {
    content: 'Development',
    oppositeContent: 'Feb 1 - Present',
    cssClass: 'phase-active',
    dotCss: 'dot-active'
  },
  {
    content: 'Testing',
    oppositeContent: 'Estimated Mar 15',
    cssClass: 'phase-pending',
    dotCss: 'dot-pending'
  },
  {
    content: 'Launch',
    oppositeContent: 'Estimated Apr 1',
    cssClass: 'phase-pending',
    dotCss: 'dot-pending'
  }
];

let timeline: Timeline = new Timeline({
  items: projectTimeline,
  cssClass: 'project-timeline',
  align: 'Alternate',
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

**Complete CSS:**
```css
.project-timeline {
    --dot-size: 18px;
    --dot-outer-space: 12px;
}

/* Phase styling */
.project-timeline .phase-completed {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    padding: 15px;
    border-left: 4px solid #4CAF50;
}

.project-timeline .phase-active {
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
    padding: 15px;
    border-left: 4px solid #FF9800;
}

.project-timeline .phase-pending {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    padding: 15px;
    border-left: 4px solid #2196F3;
}

/* Dot styling */
.project-timeline .dot-complete .e-dot {
    background: #4CAF50;
    border-color: #2E7D32;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
}

.project-timeline .dot-active .e-dot {
    background: #FF9800;
    border-color: #E65100;
    box-shadow: 0 0 8px rgba(255, 152, 0, 0.5);
    animation: pulse 2s infinite;
}

.project-timeline .dot-pending .e-dot {
    background: #2196F3;
    border-color: #1565C0;
    opacity: 0.7;
}

/* Connector styling */
.project-timeline .phase-completed.e-connector::after {
    border-color: #4CAF50;
    border-width: 2px;
}

.project-timeline .phase-active.e-connector::after {
    border-color: #FF9800;
    border-width: 2.5px;
}

.project-timeline .phase-pending.e-connector::after {
    border-color: #2196F3;
    border-width: 1px;
    border-style: dashed;
}

/* Pulse animation for active phase */
@keyframes pulse {
    0% {
        box-shadow: 0 0 8px rgba(255, 152, 0, 0.5);
    }
    50% {
        box-shadow: 0 0 15px rgba(255, 152, 0, 0.8);
    }
    100% {
        box-shadow: 0 0 8px rgba(255, 152, 0, 0.5);
    }
}
```

This comprehensive example demonstrates how to combine connector styling, dot customization, item-level CSS classes, and animations to create a professional, visually rich timeline.
