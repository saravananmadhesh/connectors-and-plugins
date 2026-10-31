# Styling and Customization in Syncfusion TypeScript Splitter

## Table of Contents
- [Split Bar Customization](#split-bar-customization)
- [Horizontal Split Bar Styling](#horizontal-split-bar-styling)
- [Vertical Split Bar Styling](#vertical-split-bar-styling)
- [Resize Handle Customization](#resize-handle-customization)
- [Arrow Customization](#arrow-customization)
- [State-Based Styling](#state-based-styling)
- [Complete Customization Examples](#complete-customization-examples)

## Split Bar Customization

The split bar (separator) is the draggable element between panes. Customize its appearance using CSS classes:

### CSS Class Structure

```
.e-splitter                                    /* Main splitter container */
├── .e-split-bar                              /* Separator container */
│   ├── .e-split-bar-horizontal               /* Horizontal separator */
│   ├── .e-split-bar-vertical                 /* Vertical separator */
│   ├── .e-split-bar-hover                    /* Hover state */
│   ├── .e-split-bar-active                   /* Active/dragging state */
│   ├── .e-resize-handler                     /* Resize gripper */
│   └── .e-navigate-arrow                     /* Collapse/expand arrows */
```

---

## Horizontal Split Bar Styling

Customize the appearance of vertical separators in horizontal layouts:

### Basic Horizontal Split Bar

```css
/* Default split bar color */
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: blue;
    width: 2px;          /* Separator width */
}

/* Split bar color in hover and active state */
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active {
    background: green;
}
```

### Horizontal with Gradient

```css
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: linear-gradient(90deg, #3498db, #2980b9);
    width: 3px;
}
```

### Horizontal with Shadow

```css
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 2px;
}
```

### Horizontal Hover Effect

```css
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: #ddd;
    transition: background 0.3s ease;
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover {
    background: #3498db;
}
```

---

## Vertical Split Bar Styling

Customize the appearance of horizontal separators in vertical layouts:

### Basic Vertical Split Bar

```css
/* Default split bar color */
.e-splitter .e-split-bar.e-split-bar-vertical {
    background: blue;
    height: 2px;         /* Separator height */
}

/* Split bar color in hover and active state */
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover,
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-active {
    background: green;
}
```

### Vertical with Gradient

```css
.e-splitter .e-split-bar.e-split-bar-vertical {
    background: linear-gradient(180deg, #e74c3c, #c0392b);
    height: 3px;
}
```

### Vertical with Dashed Border

```css
.e-splitter .e-split-bar.e-split-bar-vertical {
    background: transparent;
    border-top: 2px dashed #999;
    height: 2px;
}
```

### Vertical Hover Effect

```css
.e-splitter .e-split-bar.e-split-bar-vertical {
    background: #ddd;
    transition: background 0.3s ease;
}

.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover {
    background: #e74c3c;
}
```

---

## Resize Handle Customization

Customize the visual appearance of the resize gripper:

### Horizontal Resize Handle

```css
/* Default split bar resize handle color */
.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler {
    color: rgba(20, 27, 233, 0.54);
}

/* Resize handle color in hover and active state */
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-resize-handler,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-resize-handler {
    color: green;
}
```

### Vertical Resize Handle

```css
/* Default split bar resize handle color */
.e-splitter .e-split-bar.e-split-bar-vertical .e-resize-handler {
    color: rgba(20, 27, 233, 0.54);
}

/* Resize handle color in hover and active state */
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover .e-resize-handler,
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-active .e-resize-handler {
    color: green;
}
```

### Custom Resize Handle Size

```css
.e-splitter .e-split-bar .e-resize-handler {
    font-size: 18px;    /* Increase icon size */
    opacity: 0.7;       /* Slightly transparent */
}

.e-splitter .e-split-bar.e-split-bar-hover .e-resize-handler {
    opacity: 1;         /* Fully opaque on hover */
}
```

---

## Arrow Customization

Customize the collapse/expand arrow appearance (visible when `collapsible: true`):

### Horizontal Arrow Styling

```css
/* Split bar arrows */
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-navigate-arrow.e-arrow-left::before,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-navigate-arrow.e-arrow-left::before,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-navigate-arrow.e-arrow-left::after,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-navigate-arrow.e-arrow-left::after,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-navigate-arrow.e-arrow-right::before,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-navigate-arrow.e-arrow-right::before,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-navigate-arrow.e-arrow-right::after,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-navigate-arrow.e-arrow-right::after {
    background-color: green;
}

/* Split bar arrows - circular border */
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-navigate-arrow.e-arrow-left,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-navigate-arrow.e-arrow-right {
    border-color: rgba(33, 227, 22, 0.5);
}
```

### Vertical Arrow Styling

```css
/* Vertical split bar arrows */
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover .e-navigate-arrow,
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-active .e-navigate-arrow {
    border-color: rgba(255, 100, 50, 0.5);
    background-color: #ff6432;
}
```

---

## State-Based Styling

Customize styles based on splitter states:

### Hover State

```css
/* Applied when user hovers over separator */
.e-splitter .e-split-bar.e-split-bar-hover {
    background: #3498db;
    cursor: col-resize;  /* Horizontal resize cursor */
}

.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover {
    cursor: row-resize;  /* Vertical resize cursor */
}
```

### Active State

```css
/* Applied while user is dragging separator */
.e-splitter .e-split-bar.e-split-bar-active {
    background: #2980b9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
```

### Disabled State (resizable: false)

```css
/* Applied when pane is not resizable */
.e-splitter .e-split-bar.e-split-bar-disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
```

---

## Complete Customization Examples

### Example 1: Modern Minimal Design

```css
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: #f0f0f0;
    width: 1px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #fff;
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover {
    background: #2c3e50;
}

.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler {
    color: #95a5a6;
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-resize-handler {
    color: #2c3e50;
}
```

### Example 2: Bold and Colorful

```css
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: linear-gradient(90deg, #667eea, #764ba2);
    width: 4px;
    cursor: col-resize;
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover {
    background: linear-gradient(90deg, #764ba2, #667eea);
    box-shadow: 0 0 15px rgba(102, 126, 234, 0.5);
}

.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler {
    color: white;
    font-weight: bold;
}
```

### Example 3: Subtle and Professional

```css
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: #ecf0f1;
    width: 2px;
    transition: all 0.2s ease;
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover {
    background: #34495e;
    width: 3px;
}

.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler {
    color: #bdc3c7;
    font-size: 12px;
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-resize-handler {
    color: #ecf0f1;
}
```

### Example 4: IDE-Inspired

```css
/* Split bar styling for IDE-like appearance */
.e-splitter .e-split-bar {
    background: #2d2d30;
}

.e-splitter .e-split-bar.e-split-bar-horizontal {
    width: 2px;
    border-left: 1px solid #3e3e42;
    border-right: 1px solid #1e1e1e;
}

.e-splitter .e-split-bar .e-resize-handler {
    color: #569cd6;
}

.e-splitter .e-split-bar.e-split-bar-hover {
    background: #3e3e42;
}

.e-splitter .e-split-bar.e-split-bar-active .e-resize-handler {
    color: #ffd700;
}
```

### Example 5: Vertical Separator Styling

```css
/* Vertical (top-bottom) split bar */
.e-splitter .e-split-bar.e-split-bar-vertical {
    background: linear-gradient(180deg, #ecf0f1, #bdc3c7);
    height: 3px;
    cursor: row-resize;
}

.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover {
    background: linear-gradient(180deg, #34495e, #2c3e50);
}

.e-splitter .e-split-bar.e-split-bar-vertical .e-resize-handler {
    color: #7f8c8d;
}
```

---

## Complete Style Sheet Template

```css
/* Splitter Container */
.e-splitter {
    background: white;
}

/* Horizontal Separator */
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: #ecf0f1;
    width: 2px;
    transition: all 0.2s ease;
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover {
    background: #3498db;
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active {
    background: #2980b9;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

/* Vertical Separator */
.e-splitter .e-split-bar.e-split-bar-vertical {
    background: #ecf0f1;
    height: 2px;
    transition: all 0.2s ease;
}

.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover {
    background: #e74c3c;
}

.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-active {
    background: #c0392b;
}

/* Resize Handler */
.e-splitter .e-split-bar .e-resize-handler {
    color: #95a5a6;
    transition: color 0.2s ease;
}

.e-splitter .e-split-bar.e-split-bar-hover .e-resize-handler {
    color: white;
}

/* Navigation Arrows (collapse/expand) */
.e-splitter .e-split-bar .e-navigate-arrow {
    border-color: #bdc3c7;
}

.e-splitter .e-split-bar.e-split-bar-hover .e-navigate-arrow {
    border-color: rgba(255, 255, 255, 0.8);
}
```

---

## Summary

- **Split bar:** `.e-split-bar` with orientation-specific classes
- **Horizontal:** `.e-split-bar-horizontal` for vertical separators
- **Vertical:** `.e-split-bar-vertical` for horizontal separators
- **States:** `.e-split-bar-hover` and `.e-split-bar-active`
- **Resize handle:** `.e-resize-handler` for gripper
- **Arrows:** `.e-navigate-arrow` for collapse/expand icons
- **CSS approach:** Theme via classes, no inline styles needed
