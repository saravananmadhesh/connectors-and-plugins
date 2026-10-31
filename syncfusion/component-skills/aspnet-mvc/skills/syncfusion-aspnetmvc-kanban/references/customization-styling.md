# Customization and Styling

## Table of Contents
- [Overview](#overview)
- [Board Dimensions](#board-dimensions)
- [Themes](#themes)
- [Custom CSS Styling](#custom-css-styling)
- [Tooltip Configuration](#tooltip-configuration)
- [Priority Display](#priority-display)
- [Responsive Mode](#responsive-mode)
- [Mobile Optimization](#mobile-optimization)

## Overview

Customize the Kanban board's appearance, dimensions, and behavior to match your application's design and user experience requirements.

**Customization Options:**
- Board dimensions (height, width)
- Theme selection and customization
- Custom CSS classes
- Tooltip configuration and templates
- Priority indicators and colors
- Responsive behavior for mobile devices
- Card height and spacing

## Board Dimensions

Control the Kanban board size using `Height` and `Width` properties.

**Dimension Values:**
- **Auto**: Adjusts to content size
- **Pixels**: Fixed size (e.g., "800px")
- **Percentage**: Relative to parent (e.g., "100%")
- **Viewport units**: vh, vw for responsive sizing

### Fixed Dimensions

**Example - Fixed Size:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Width("1200px")
    .Height("600px")
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

### Responsive Dimensions

**Example - Percentage-Based:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Width("100%")      // Fill container width
    .Height("600px")    // Fixed height
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

### Auto Height

**Example - Auto-Adjust to Content:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Width("100%")
    .Height("auto")     // Adjust based on cards
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Notes:**
- `Height="auto"` expands to show all cards without scrolling
- Useful for boards with few cards or print views
- Fixed height enables scrolling for large datasets

## Themes

Syncfusion provides built-in themes that can be applied via CDN, NPM, or Custom Resource Generator (CRG).

**Available Themes:**
- Material
- Material 3
- Bootstrap 5
- Bootstrap 4
- Tailwind CSS
- Fluent
- Fabric (Office 365)
- High Contrast

### CDN Theme References

**Example - Material Theme:**

```html
<!-- Material Theme CSS -->
<link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" />

<!-- Material 3 Theme CSS -->
<link href="https://cdn.syncfusion.com/ej2/material3.css" rel="stylesheet" />

<!-- Bootstrap 5 Theme CSS -->
<link href="https://cdn.syncfusion.com/ej2/bootstrap5.css" rel="stylesheet" />

<!-- Tailwind Theme CSS -->
<link href="https://cdn.syncfusion.com/ej2/tailwind.css" rel="stylesheet" />

<!-- Fluent Theme CSS -->
<link href="https://cdn.syncfusion.com/ej2/fluent.css" rel="stylesheet" />

<!-- High Contrast Theme CSS -->
<link href="https://cdn.syncfusion.com/ej2/highcontrast.css" rel="stylesheet" />
```

**Add to _Layout.cshtml or View:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Kanban Board</title>
    
    <!-- Theme CSS (choose one) -->
    <link href="https://cdn.syncfusion.com/ej2/material3.css" rel="stylesheet" />
    
    <!-- Syncfusion JavaScript -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
</body>
</html>
```

### NPM Theme Installation

```bash
npm install @syncfusion/ej2-themes
```

**Import in CSS/SCSS:**

```scss
// Import Material theme
@import '~@syncfusion/ej2-themes/material3.css';

// Or Bootstrap 5 theme
@import '~@syncfusion/ej2-themes/bootstrap5.css';
```

### Custom Theme with CRG

Use Syncfusion's Custom Resource Generator to create themes with custom colors:

1. Visit: https://ej2.syncfusion.com/themestudio/
2. Choose base theme
3. Customize colors, fonts, sizes
4. Download customized CSS
5. Reference in your application

## Custom CSS Styling

Apply custom styles using the `CssClass` property and CSS selectors.

### Custom CSS Class

**Example - Custom Styling:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .CssClass("custom-kanban")
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<style>
    /* Custom board styling */
    .custom-kanban {
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    /* Column header styling */
    .custom-kanban .e-kanban-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-weight: 600;
        padding: 15px;
    }
    
    /* Card styling */
    .custom-kanban .e-card {
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .custom-kanban .e-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    /* Column content area */
    .custom-kanban .e-content-cells {
        background-color: #f5f7fa;
    }
    
    /* Swimlane header */
    .custom-kanban .e-swimlane-header {
        background-color: #e3f2fd;
        font-weight: 600;
        padding: 10px;
    }
</style>
```

### Priority-Based Card Colors

**Example - Color Code by Priority:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .CardRendered("onCardRendered")
    .Render()

<script>
    function onCardRendered(args) {
        var priority = args.data.Priority;
        var cardElement = args.element;
        
        // Apply priority-based colors
        switch(priority) {
            case 'Critical':
                cardElement.style.borderLeft = '4px solid #d32f2f';
                cardElement.style.backgroundColor = '#ffebee';
                break;
            case 'High':
                cardElement.style.borderLeft = '4px solid #ff9800';
                cardElement.style.backgroundColor = '#fff3e0';
                break;
            case 'Normal':
                cardElement.style.borderLeft = '4px solid #4caf50';
                cardElement.style.backgroundColor = '#f1f8e9';
                break;
            case 'Low':
                cardElement.style.borderLeft = '4px solid #2196f3';
                cardElement.style.backgroundColor = '#e3f2fd';
                break;
        }
    }
</script>
```

### Column-Specific Styling

**Example - Different Column Colors:**

```html
<style>
    /* To Do column */
    .e-kanban .e-content-cells[data-key="Open"] {
        background-color: #e3f2fd;
    }
    
    /* In Progress column */
    .e-kanban .e-content-cells[data-key="InProgress"] {
        background-color: #fff3e0;
    }
    
    /* Testing column */
    .e-kanban .e-content-cells[data-key="Testing"] {
        background-color: #fce4ec;
    }
    
    /* Done column */
    .e-kanban .e-content-cells[data-key="Close"] {
        background-color: #e8f5e9;
    }
</style>
```

## Tooltip Configuration

Enable and customize tooltips that appear when hovering over cards.

### Enable Tooltips

**Example - Basic Tooltip:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .EnableTooltip(true)    // Enable tooltips
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Default Tooltip Content:**
- Shows all card data fields
- Displays in key-value pairs
- Auto-generated from card properties

### Custom Tooltip Template

**Example - Custom Tooltip:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .EnableTooltip(true)
    .TooltipTemplate("#tooltipTemplate")
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<script id="tooltipTemplate" type="text/x-jsrender">
    <div class='custom-tooltip'>
        <div class='tooltip-header'>
            <strong>${Id}</strong> - ${Summary}
        </div>
        <div class='tooltip-body'>
            <div><strong>Status:</strong> ${Status}</div>
            <div><strong>Assignee:</strong> ${Assignee}</div>
            <div><strong>Priority:</strong> <span class='priority-${Priority}'>${Priority}</span></div>
            {{if Estimate}}
                <div><strong>Estimate:</strong> ${Estimate} hours</div>
            {{/if}}
            {{if DueDate}}
                <div><strong>Due Date:</strong> ${DueDate}</div>
            {{/if}}
        </div>
    </div>
</script>

<style>
    .custom-tooltip {
        padding: 10px;
        background: white;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .tooltip-header {
        font-size: 14px;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .tooltip-body div {
        margin: 5px 0;
        font-size: 12px;
    }
    
    .priority-High {
        color: #ff9800;
        font-weight: 600;
    }
    
    .priority-Critical {
        color: #d32f2f;
        font-weight: 600;
    }
</style>
```

## Priority Display

Show priority indicators on cards for visual priority identification.

**Example - Priority Indicator:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary")
            .HeaderField("Id")
            .Priority("Priority");  // Map priority field
    })
    .Render()
```

**Custom Priority Template:**

```razor
.CardSettings(card =>
{
    card.ContentField("Summary")
        .HeaderField("Id")
        .Template("#cardTemplate");
})

<script id="cardTemplate" type="text/x-jsrender">
    <div class='card-template'>
        <div class='card-header'>
            <span class='card-id'>#${Id}</span>
            <span class='priority-badge priority-${Priority}'>${Priority}</span>
        </div>
        <div class='card-content'>
            ${Summary}
        </div>
        <div class='card-footer'>
            <span class='assignee'>${Assignee}</span>
        </div>
    </div>
</script>

<style>
    .priority-badge {
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .priority-Critical {
        background-color: #d32f2f;
        color: white;
    }
    
    .priority-High {
        background-color: #ff9800;
        color: white;
    }
    
    .priority-Normal {
        background-color: #4caf50;
        color: white;
    }
    
    .priority-Low {
        background-color: #2196f3;
        color: white;
    }
</style>
```

## Responsive Mode

Enable responsive behavior for mobile and tablet devices.

**Example - Responsive Kanban:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Width("100%")
    .Height("auto")
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee");
    })
    .Render()

<style>
    /* Responsive adjustments */
    @media screen and (max-width: 768px) {
        /* Reduce padding on mobile */
        .e-kanban .e-card {
            padding: 8px;
            font-size: 12px;
        }
        
        /* Smaller column headers */
        .e-kanban .e-kanban-header {
            padding: 8px;
            font-size: 13px;
        }
        
        /* Hide less important info on mobile */
        .e-kanban .card-details {
            display: none;
        }
    }
    
    @media screen and (max-width: 480px) {
        /* Further reduce on small phones */
        .e-kanban .e-card {
            padding: 6px;
            font-size: 11px;
        }
    }
</style>
```

## Mobile Optimization

Optimize Kanban for mobile touch interactions.

**Mobile Features:**
- Touch-friendly drag-and-drop
- Swipe gestures
- Adaptive column width
- Touch-optimized selection

**Example - Mobile-Optimized Kanban:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Width("100%")
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary")
            .HeaderField("Id")
            .Template("#mobileCardTemplate");
    })
    .Render()

<script id="mobileCardTemplate" type="text/x-jsrender">
    <div class='mobile-card'>
        <div class='mobile-card-header'>
            <span class='card-id'>#${Id}</span>
        </div>
        <div class='mobile-card-summary'>${Summary}</div>
        <div class='mobile-card-assignee'>${Assignee}</div>
    </div>
</script>

<style>
    /* Mobile card styling */
    .mobile-card {
        padding: 12px;
        min-height: 80px;
    }
    
    .mobile-card-header {
        font-weight: 600;
        margin-bottom: 8px;
    }
    
    .mobile-card-summary {
        font-size: 13px;
        margin-bottom: 8px;
    }
    
    .mobile-card-assignee {
        font-size: 11px;
        color: #666;
    }
    
    /* Touch-friendly sizing */
    @media (hover: none) and (pointer: coarse) {
        .e-kanban .e-card {
            min-height: 60px;
            touch-action: pan-y;
        }
        
        /* Larger touch targets */
        .e-kanban .e-card-header {
            padding: 12px;
        }
    }
</style>
```

## Card Height

Set a fixed height for all cards to maintain uniform appearance.

**Example - Fixed Card Height:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .CardSettings(card =>
    {
        card.ContentField("Summary")
            .HeaderField("Id")
            .CardHeight("100px");  // Fixed height for all cards
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .Render()
```

**Notes:**
- Useful for consistent grid layout
- Content may be truncated if it exceeds height
- Consider using tooltips to show full content

## CSS Class Reference

**Common Kanban CSS Classes:**

```css
/* Board container */
.e-kanban { }

/* Column header */
.e-kanban-header { }
.e-header-cells { }
.e-header-text { }

/* Column content area */
.e-content-cells { }
.e-content-row { }

/* Cards */
.e-card { }
.e-card-header { }
.e-card-content { }
.e-card-footer { }

/* Swimlane */
.e-swimlane-header { }
.e-swimlane-row { }

/* Drag and drop */
.e-card-dragging { }
.e-card-drop { }

/* Selection */
.e-card-selection { }
.e-card-selected { }

/* Tooltip */
.e-kanban-tooltip { }
```

## Best Practices

1. **Dimensions**: Use percentage width for responsiveness, fixed height for scrolling
2. **Themes**: Choose theme matching your application's design system
3. **Custom CSS**: Use CssClass property for scoped styling
4. **Tooltips**: Enable for dense cards with limited visible information
5. **Priority**: Use color coding for quick visual identification
6. **Responsive**: Test on actual mobile devices, not just browser DevTools
7. **Touch targets**: Ensure minimum 44x44px for mobile touch targets
8. **Performance**: Minimize CSS complexity for large boards (500+ cards)
9. **Accessibility**: Maintain sufficient color contrast ratios (WCAG AA)
10. **Consistency**: Keep styling consistent across all cards and columns

## Performance Considerations

1. **Virtual Scrolling**: Enable for boards with 200+ cards
2. **Simple Selectors**: Use class selectors instead of complex CSS
3. **Lazy Loading**: Load images and heavy content on demand
4. **CSS Animations**: Use transform and opacity for smooth performance
5. **Debounce**: Throttle resize/scroll event handlers
6. **Minimize Reflows**: Batch DOM updates in CardRendered event
