# Styling and Theming

## Table of Contents
- [CSS Classes](#css-classes)
- [Type and Position Customization](#type-and-position-customization)
- [State-Based Styling](#state-based-styling)
- [Backdrop Styling](#backdrop-styling)
- [Responsive Styling](#responsive-styling)

## CSS Classes

### Root Sidebar Classes

The sidebar applies various CSS classes to the root element:

| Class | Applied When |
|-------|--------------|
| `.e-sidebar` | Always (base class) |
| `.e-open` | Sidebar is open/expanded |
| `.e-close` | Sidebar is closed/collapsed |
| `.e-left` | Sidebar positioned left (default) |
| `.e-right` | Sidebar positioned right |
| `.e-dock` | Dock mode enabled |
| `.e-transition` | Animation in progress |

### Customize Root Sidebar

```css
/* Base sidebar styling */
.e-sidebar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
}

/* When open */
.e-sidebar.e-open {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* When closed */
.e-sidebar.e-close {
    background: #555;
}
```

## Type and Position Customization

### Left Positioned Types

```css
/* Left Over type */
.e-sidebar.e-left.e-over {
    background-color: #f5f5f5;
    border-right: 2px solid #e0e0e0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Left Push type */
.e-sidebar.e-left.e-push {
    background-color: #fff;
    border-right: 1px solid #ddd;
}

/* Left Slide type */
.e-sidebar.e-left.e-slide {
    background: linear-gradient(to right, #2c3e50, #34495e);
    color: #ecf0f1;
}

/* Left Auto type */
.e-sidebar.e-left.e-auto {
    background-color: #ecf0f1;
}
```

### Right Positioned Types

```css
/* Right Over type */
.e-sidebar.e-right.e-over {
    background-color: #f5f5f5;
    border-left: 2px solid #e0e0e0;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Right Push type */
.e-sidebar.e-right.e-push {
    background-color: #fff;
    border-left: 1px solid #ddd;
}

/* Right Slide type */
.e-sidebar.e-right.e-slide {
    background: linear-gradient(to left, #2c3e50, #34495e);
    color: #ecf0f1;
}
```

## State-Based Styling

### Open State Styling

```css
/* Left sidebar when open */
.e-sidebar.e-left.e-open {
    transition: transform 0.3s ease;
}

/* Custom open appearance */
.e-sidebar.e-left.e-open {
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.2);
}

/* Right sidebar when open */
.e-sidebar.e-right.e-open {
    transition: transform 0.3s ease;
    box-shadow: -3px 0 10px rgba(0, 0, 0, 0.2);
}
```

### Close State Styling

```css
/* Left sidebar when closed */
.e-sidebar.e-left.e-transition.e-close {
    transition: transform 0.3s ease, visibility 200ms;
}

/* Right sidebar when closed */
.e-sidebar.e-right.e-transition.e-close {
    transition: transform 0.3s ease, visibility 200ms;
}

/* Visibility handling during close */
.e-sidebar.e-close {
    visibility: hidden;
}
```

### Transition Timing

```css
/* Custom transition for different types */
.e-sidebar.e-over.e-open {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.e-sidebar.e-push.e-open {
    transition: transform 0.3s ease;
}

.e-sidebar.e-slide.e-open {
    transition: transform 0.35s ease-in-out;
}
```

## Docked State Styling

```css
/* When dock is enabled and closed */
.e-sidebar.e-dock.e-close {
    width: 72px !important;
    background: #2d323e;
}

/* When dock is enabled and open */
.e-sidebar.e-dock.e-open {
    width: 220px;
    background: #37474f;
}

/* Hide text in docked state */
.e-dock.e-close span.e-text {
    display: none;
}

/* Show text when open */
.e-dock.e-open span.e-text {
    display: inline-block;
}

/* Icon styling in docked state */
.e-dock .e-icons {
    font-size: 25px;
    line-height: 2;
    text-align: center;
}
```

## Backdrop Styling

### Custom Backdrop Appearance

```css
.e-sidebar-overlay {
    background-color: aqua;
}
```

### Show/Hide Backdrop

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Over',
    showBackdrop: true  // Add backdrop overlay
});
sidebar.appendTo('#sidebar');
```

```css
/* Custom backdrop style */
.e-sidebar-overlay {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
    opacity: 0.7;
}
```

## Responsive Styling

### Mobile-Specific Styles

```css
/* Mobile (< 768px) */
@media (max-width: 768px) {
    .e-sidebar {
        width: 80vw !important;  /* 80% of viewport */
        max-width: 300px;        /* But max 300px */
    }
    
    .e-sidebar.e-left {
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    }
    
    .e-sidebar.e-over {
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
    }
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
    .e-sidebar {
        width: 250px;
    }
}

/* Desktop (> 1024px) */
@media (min-width: 1024px) {
    .e-sidebar {
        width: 280px;
    }
    
    .e-sidebar.e-push {
        box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
    }
}
```

### Touch-Friendly Styling

```css
/* Increase tap target sizes on mobile */
@media (max-width: 768px) {
    .sidebar-item {
        padding: 15px 20px;  /* Was 10px */
        min-height: 44px;    /* Touch target minimum */
    }
    
    .sidebar-item a {
        font-size: 16px;  /* 16px prevents zoom on iOS */
    }
}
```

## Complete Theming Example

```typescript
const themeConfig = {
    light: {
        background: '#fff',
        foreground: '#333',
        accent: '#667eea',
        border: '#ddd'
    },
    dark: {
        background: '#1e1e1e',
        foreground: '#fff',
        accent: '#667eea',
        border: '#444'
    }
};

function applyTheme(theme: 'light' | 'dark') {
    const config = themeConfig[theme];
    const sidebar = document.querySelector('.e-sidebar') as HTMLElement;
    
    if (sidebar) {
        sidebar.style.backgroundColor = config.background;
        sidebar.style.color = config.foreground;
        sidebar.style.borderColor = config.border;
        
        // Update CSS variables
        document.documentElement.style.setProperty('--accent-color', config.accent);
    }
    
    localStorage.setItem('theme', theme);
}

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
applyTheme(savedTheme);
```

## Advanced Customization Patterns

### Material Design Theme

```css
.e-sidebar {
    background: #fafafa;
    color: rgba(0, 0, 0, 0.87);
    font-family: 'Roboto', sans-serif;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
                0 4px 5px 0 rgba(0, 0, 0, 0.14),
                0 1px 10px 0 rgba(0, 0, 0, 0.12);
}

.sidebar-item {
    padding: 16px 16px;
    cursor: pointer;
    transition: background 0.2s ease;
}

.sidebar-item:hover {
    background: rgba(0, 0, 0, 0.04);
}

.sidebar-item.active {
    background: rgba(0, 0, 0, 0.08);
    border-left: 4px solid #2196F3;
}
```

### Bootstrap Theme Integration

```html
<aside id="sidebar" class="sidebar-bootstrap">
    <nav class="nav flex-column">
        <a class="nav-link" href="#">Link 1</a>
        <a class="nav-link" href="#">Link 2</a>
    </nav>
</aside>

<style>
.sidebar-bootstrap {
    background: #f8f9fa;
    border-right: 1px solid #dee2e6;
}

.sidebar-bootstrap .nav-link {
    color: #495057;
    padding: 0.5rem 1rem;
}

.sidebar-bootstrap .nav-link:hover {
    background: #e9ecef;
}

.sidebar-bootstrap .nav-link.active {
    background: #007bff;
    color: #fff;
}
</style>
```

### Custom Color Scheme

```typescript
type ColorScheme = 'blue' | 'green' | 'purple' | 'orange';

function setColorScheme(scheme: ColorScheme) {
    const sidebar = document.querySelector('.e-sidebar') as HTMLElement;
    
    const schemes = {
        blue: { bg: '#e3f2fd', accent: '#2196f3' },
        green: { bg: '#e8f5e9', accent: '#4caf50' },
        purple: { bg: '#f3e5f5', accent: '#9c27b0' },
        orange: { bg: '#ffe0b2', accent: '#ff9800' }
    };
    
    const config = schemes[scheme];
    if (sidebar) {
        sidebar.style.backgroundColor = config.bg;
        sidebar.style.borderColor = config.accent;
    }
}
```

## Accessibility Styling

```css
/* Ensure sufficient color contrast */
.e-sidebar {
    background: #2c3e50;  /* Dark background */
    color: #ecf0f1;       /* Light text - WCAG AA compliant */
}

/* Focus visible for keyboard navigation */
.sidebar-item:focus-visible {
    outline: 2px solid #4A90E2;
    outline-offset: -2px;
}

/* High contrast mode support */
@media (prefers-contrast: more) {
    .e-sidebar {
        border: 2px solid currentColor;
    }
    
    .sidebar-item:focus-visible {
        outline-width: 3px;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .e-sidebar {
        transition: none !important;
    }
}
```

## Complete Styled Component Example

```html
<aside id="sidebar" class="custom-sidebar">
    <div class="sidebar-header">
        <h3>My App</h3>
    </div>
    <nav class="sidebar-nav">
        <ul>
            <li class="sidebar-item active">
                <span class="e-icons e-home"></span>
                <span>Home</span>
            </li>
            <li class="sidebar-item">
                <span class="e-icons e-settings"></span>
                <span>Settings</span>
            </li>
        </ul>
    </nav>
</aside>

<style>
.custom-sidebar {
    --primary: #667eea;
    --primary-dark: #764ba2;
    --text: #fff;
    --hover-bg: rgba(255, 255, 255, 0.1);
}

.custom-sidebar {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: var(--text);
    width: 280px;
    overflow-y: auto;
}

.sidebar-header {
    padding: 20px;
    border-bottom: 1px solid var(--hover-bg);
}

.sidebar-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    cursor: pointer;
    transition: background 0.2s;
}

.sidebar-item:hover {
    background: var(--hover-bg);
}

.sidebar-item.active {
    background: rgba(0, 0, 0, 0.2);
    border-left: 4px solid var(--text);
}
</style>
```

## Next Steps

- Learn **Content Integration** for structured content
- Explore **Animations and Gestures** for smooth transitions
- Check **Troubleshooting** for styling issues
