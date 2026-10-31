# Styling and Globalization

## Table of Contents
- [CSS Structures and Customization](#css-structures-and-customization)
- [Split Bar Styling](#split-bar-styling)
- [Resize Handle Styling](#resize-handle-styling)
- [Split Bar Arrows](#split-bar-arrows)
- [Theme Support](#theme-support)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [Accessibility Features](#accessibility-features)
- [Complete Styling Example](#complete-styling-example)
- [Best Practices](#best-practices)

## CSS Structures and Customization

The Splitter component uses specific CSS classes for styling. Understanding the structure allows complete customization of appearance.

### Available CSS Classes

```
.e-splitter              /* Main container */
.e-split-bar             /* Separator bar between panes */
.e-split-bar-horizontal  /* Horizontal separator (for horizontal layout) */
.e-split-bar-vertical    /* Vertical separator (for vertical layout) */
.e-split-bar-hover       /* State: separator on hover */
.e-split-bar-active      /* State: separator during drag */
.e-resize-handler        /* Resize grip icon */
.e-navigate-arrow        /* Arrow icons on separator */
.e-arrow-left            /* Left arrow (horizontal splitter) */
.e-arrow-right           /* Right arrow (horizontal splitter) */
.e-arrow-up              /* Up arrow (vertical splitter) */
.e-arrow-down            /* Down arrow (vertical splitter) */
```

## Split Bar Styling

Customize the appearance of the separator bar that users drag to resize panes.

### Basic Separator Customization

```css
/* Default horizontal separator */
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: #e0e0e0;
    width: 1px;
}

/* Hover state: lighter color */
.e-splitter .e-split-bar.e-split-bar-horizontal:hover {
    background: #bfbfbf;
}

/* Active state: during drag */
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active {
    background: #1976d2;
}
```

### Gradient Separator

```css
/* Gradient effect */
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: linear-gradient(90deg, #f0f0f0 0%, #d0d0d0 50%, #f0f0f0 100%);
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover {
    background: linear-gradient(90deg, #d0d0d0 0%, #a0a0a0 50%, #d0d0d0 100%);
}
```

### Vertical Separator Customization

```css
/* Default vertical separator */
.e-splitter .e-split-bar.e-split-bar-vertical {
    background: #e0e0e0;
    height: 1px;
}

/* Hover state */
.e-splitter .e-split-bar.e-split-bar-vertical:hover {
    background: #bfbfbf;
}

/* Active state during drag */
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-active {
    background: #ff9800;
}
```

### Styled Separators (Different Themes)

```css
/* Modern flat design */
.e-splitter .e-split-bar {
    background: #424242;
    border: none;
}

/* Glass morphism style */
.e-splitter .e-split-bar {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}

/* Elevated shadow style */
.e-splitter .e-split-bar {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

## Resize Handle Styling

Customize the gripper/handle icon that appears on the separator to indicate it's draggable.

### Hide Resize Handle

```css
/* Hide horizontal splitter handle */
.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler {
    display: none;
}

/* Hide vertical splitter handle */
.e-splitter .e-split-bar.e-split-bar-vertical .e-resize-handler {
    display: none;
}
```

### Customize Handle Color

```css
/* Horizontal splitter handle - blue theme */
.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler {
    color: #2196f3;
}

/* Change handle color on hover */
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-resize-handler,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-resize-handler {
    color: #1565c0;
}

/* Vertical splitter handle - orange theme */
.e-splitter .e-split-bar.e-split-bar-vertical .e-resize-handler {
    color: #ff9800;
}
```

### Customize Handle Size and Style

```css
/* Larger handle */
.e-splitter .e-split-bar .e-resize-handler {
    font-size: 18px;
    font-weight: bold;
}

/* Rounded handle */
.e-splitter .e-split-bar .e-resize-handler {
    border-radius: 50%;
    padding: 4px;
}

/* Custom cursor during drag */
.e-splitter .e-split-bar.e-split-bar-active {
    cursor: grabbing;
}
```

## Split Bar Arrows

Customize the expand/collapse arrow icons on collapsible panes.

### Arrow Colors (Horizontal Layout)

```css
/* Left and right arrow styling */
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-navigate-arrow.e-arrow-left::before,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-navigate-arrow.e-arrow-left::before,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-navigate-arrow.e-arrow-right::before,
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-navigate-arrow.e-arrow-right::before {
    background-color: #2196f3;
}

/* Arrow border/circle */
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-navigate-arrow {
    border-color: rgba(33, 150, 243, 0.3);
}
```

### Arrow Colors (Vertical Layout)

```css
/* Up and down arrow styling */
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover .e-navigate-arrow.e-arrow-up::before,
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-active .e-navigate-arrow.e-arrow-up::before,
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover .e-navigate-arrow.e-arrow-down::before,
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-active .e-navigate-arrow.e-arrow-down::before {
    background-color: #ff9800;
}

/* Arrow border/circle */
.e-splitter .e-split-bar.e-split-bar-vertical.e-split-bar-hover .e-navigate-arrow {
    border-color: rgba(255, 152, 0, 0.3);
}
```

### Hide Arrows

```css
/* Hide arrow icons completely */
.e-splitter .e-split-bar .e-navigate-arrow::before {
    display: none;
}

.e-splitter .e-split-bar .e-navigate-arrow {
    border: none;
}
```

## Theme Support

### Using Syncfusion Themes

The splitter component works with all Syncfusion themes. Change by updating the CDN link:

#### Fluent Theme (Modern Default)
```html
<link rel="stylesheet" href="url" />
```

#### Bootstrap 5 Theme
```html
<link rel="stylesheet" href="url" />
```

#### Material Theme
```html
<link rel="stylesheet" href="url" />
```

#### Tailwind Theme
```html
<link rel="stylesheet" href="hurl" />
```

### Custom Theme Creation

```css
/* Define custom CSS variables for theming */
:root {
    --splitter-separator-bg: #e0e0e0;
    --splitter-separator-hover-bg: #bfbfbf;
    --splitter-handle-color: #2196f3;
    --splitter-handle-hover-color: #1565c0;
    --splitter-arrow-color: #666;
}

/* Apply custom variables */
.e-splitter .e-split-bar {
    background: var(--splitter-separator-bg);
}

.e-splitter .e-split-bar:hover {
    background: var(--splitter-separator-hover-bg);
}

.e-splitter .e-split-bar .e-resize-handler {
    color: var(--splitter-handle-color);
}

.e-splitter .e-split-bar.e-split-bar-hover .e-resize-handler {
    color: var(--splitter-handle-hover-color);
}
```

### Dark Mode Theme

```css
@media (prefers-color-scheme: dark) {
    /* Dark theme colors */
    .e-splitter .e-split-bar {
        background: #424242;
    }

    .e-splitter .e-split-bar:hover {
        background: #616161;
    }

    .e-splitter .e-split-bar .e-resize-handler {
        color: #64b5f6;
    }

    .e-splitter .e-split-bar.e-split-bar-hover .e-resize-handler {
        color: #90caf9;
    }

    .e-splitter .e-split-bar .e-navigate-arrow {
        border-color: rgba(100, 181, 246, 0.3);
    }
}
```

## RTL (Right-to-Left) Support

Enable RTL support for languages like Arabic, Hebrew, Farsi, etc.

### Enable RTL on Splitter

```csharp
<!-- Enable RTL on splitter -->
<ejs-splitter id="splitter" enableRtl="true" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" content="<div>الجزء الأيسر</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>المحتوى الرئيسي</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### Enable RTL Globally (Layout.cshtml)

```csharp
<!-- Add dir="rtl" to HTML element -->
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - ASP.NET Core App</title>
    <link rel="stylesheet" href="url" />
</head>
<body>
    @RenderBody()
    <ejs-scripts></ejs-scripts>
</body>
</html>
```

### RTL with CSS

```css
/* Additional RTL styling if needed */
[dir="rtl"] .e-splitter .e-split-bar {
    direction: rtl;
}

/* Adjust arrow directions for RTL */
[dir="rtl"] .e-splitter .e-split-bar.e-split-bar-horizontal .e-navigate-arrow {
    transform: scaleX(-1);
}
```

### Conditional RTL (Dynamic)

```csharp
@{
    string htmlDir = ViewBag.IsRtl ? "rtl" : "ltr";
    string lang = ViewBag.IsRtl ? "ar" : "en";
}

<html dir="@htmlDir" lang="@lang">
    <body>
        <ejs-splitter id="splitter" enableRtl="@ViewBag.IsRtl" height="400px">
            <!-- Splitter panes -->
        </ejs-splitter>
    </body>
</html>
```

## Accessibility Features

### ARIA Attributes

```csharp
<ejs-splitter id="splitter" aria-label="Resizable split layout" height="400px">
    <e-splitter-panes>
        <!-- Navigation pane -->
        <e-splitter-pane size="30%" 
                         role="navigation" 
                         aria-label="Navigation panel"
                         content="<nav>Navigation content</nav>"></e-splitter-pane>
        
        <!-- Main content pane -->
        <e-splitter-pane size="70%" 
                         role="main" 
                         aria-label="Main content area"
                         content="<div>Main content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### Keyboard Navigation

```css
/* High contrast for keyboard focus */
.e-splitter .e-split-bar:focus {
    outline: 2px solid #0078d4;
    outline-offset: 2px;
}

/*Focus visible for accessibility */
.e-splitter .e-split-bar:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.3);
}
```

### Screen Reader Support

```csharp
<!-- Add ARIA labels for better screen reader experience -->
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" aria-label="Sidebar navigation with expandable menu items" content="<div>Sidebar</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" aria-label="Main content area with article details" content="<div>Main content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### Min-Width for Touch Targets

```css
/* Ensure separator is easy to tap on touch devices */
@media (hover: none) and (pointer: coarse) {
    .e-splitter .e-split-bar {
        min-width: 44px;      /* Horizontal */
        min-height: 44px;     /* Vertical */
        padding: 20px 0;      /* Larger touch target */
    }
}
```

## Complete Styling Example

```csharp
<!-- HTML -->
<ejs-splitter id="customSplitter" height="500px">
    <e-splitter-panes>
        <e-splitter-pane size="25%" collapsible="true" content="<div class='sidebar'><h3>Navigation</h3></div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div class='main-content'><h3>Content</h3></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<!-- CSS -->
<style>
    /* Sidebar styling */
    .sidebar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        height: 100%;
        overflow-y: auto;
    }

    /* Main content styling */
    .main-content {
        background: #f5f5f5;
        padding: 20px;
        height: 100%;
        overflow-y: auto;
    }

    /* Custom splitter styling */
    #customSplitter .e-split-bar {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        cursor: col-resize;
    }

    #customSplitter .e-split-bar:hover {
        background: linear-gradient(90deg, #764ba2 0%, #667eea 100%);
        opacity: 0.8;
    }

    #customSplitter .e-split-bar .e-resize-handler {
        color: white;
        font-size: 16px;
    }

    /* Arrow styling */
    #customSplitter .e-split-bar.e-split-bar-hover .e-navigate-arrow::before {
        background-color: white;
    }

    #customSplitter .e-split-bar.e-split-bar-hover .e-navigate-arrow {
        border-color: rgba(255, 255, 255, 0.5);
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
        #customSplitter .e-split-bar {
            background: #2c2c2c;
        }
        .main-content {
            background: #1e1e1e;
            color: #e0e0e0;
        }
    }
</style>
```

## Best Practices

1. **Maintain Contrast** - Ensure handle and arrow colors have sufficient contrast (WCAG AA)
2. **Visual Feedback** - Provide hover/active states to indicate interactivity
3. **RTL Testing** - Test functionality in both LTR and RTL modes
4. **Keyboard Support** - Ensure all functionality works with keyboard navigation
5. **Theme Consistency** - Use theme colors that match your application design
6. **Mobile Optimization** - Make separators thicker and easier to tap on small screens
