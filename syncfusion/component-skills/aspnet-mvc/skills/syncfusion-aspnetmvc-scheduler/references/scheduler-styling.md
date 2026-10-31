# Scheduler Styling

## Table of Contents
1. [Built-In Themes](#built-in-themes)
2. [CSS Overrides](#css-overrides)
3. [Event Styling](#event-styling)
4. [Header Styling](#header-styling)
5. [Cell Styling](#cell-styling)
6. [Custom Theme](#custom-theme)

## Built-In Themes

Apply predefined themes:

```html
<!-- Bootstrap Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/bootstrap.css" />

<!-- Material Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material.css" />

<!-- Fabric Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fabric.css" />

<!-- Tailwind Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/tailwind.css" />
```

### Available Themes
- Bootstrap
- Material
- Fabric
- Tailwind
- High Contrast

## CSS Overrides

Override default styles:

```css
.e-schedule {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.e-schedule .e-schedule-header {
    background-color: #1a73e8;
    color: white;
    padding: 15px;
}

.e-schedule .e-toolbar {
    background-color: #f5f5f5;
}

.e-schedule .e-date-range {
    font-size: 18px;
    font-weight: 600;
}
```

## Event Styling

Customize appointment appearance:

```css
.e-schedule .e-appointment {
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
}

.e-schedule .e-appointment:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.e-schedule .e-appointment.active {
    border: 2px solid #1a73e8;
    background-color: #E8F0FE !important;
}
```

### Status-Based Colors
```css
.e-schedule .e-appointment.completed {
    background-color: #4CAF50 !important;
    opacity: 0.7;
}

.e-schedule .e-appointment.pending {
    background-color: #FF9800 !important;
}

.e-schedule .e-appointment.cancelled {
    background-color: #F44336 !important;
    text-decoration: line-through;
}
```

## Header Styling

Customize toolbar and date header:

```css
.e-schedule .e-toolbar {
    background: linear-gradient(90deg, #1a73e8 0%, #1e3a8a 100%);
    padding: 10px 15px;
}

.e-schedule .e-toolbar .e-btn {
    color: white;
    border: none;
}

.e-schedule .e-toolbar .e-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.e-schedule .e-date-header {
    background-color: #f8f9fa;
    border-bottom: 2px solid #1a73e8;
}
```

## Cell Styling

Style time slot cells:

```css
.e-schedule .e-work-cells {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
}

.e-schedule .e-weekend-cells {
    background-color: #f5f5f5;
}

.e-schedule .e-all-day-cells {
    background-color: #fafafa;
    min-height: 30px;
}

.e-schedule .e-time-slot {
    height: 60px;
    border-bottom: 1px dashed #e0e0e0;
}
```

## Custom Theme

Create custom theme variable:

```css
:root {
    --scheduler-primary: #1a73e8;
    --scheduler-secondary: #5f6368;
    --scheduler-success: #34a853;
    --scheduler-warning: #fbbc04;
    --scheduler-danger: #ea4335;
    --scheduler-light: #f8f9fa;
    --scheduler-dark: #202124;
}

.e-schedule {
    --e-primary: var(--scheduler-primary);
    --e-secondary: var(--scheduler-secondary);
}

.e-schedule .e-appointment.high-priority {
    background-color: var(--scheduler-danger);
    border-left: 4px solid var(--scheduler-danger);
}
```

### Theme Variables
- Primary: Main brand color
- Secondary: Supporting color
- Success: Positive actions
- Warning: Caution actions
- Danger: Destructive actions
