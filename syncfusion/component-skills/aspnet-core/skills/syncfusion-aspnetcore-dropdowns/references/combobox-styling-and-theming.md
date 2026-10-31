# Styling & Theming

## Table of Contents
- [Built-in Themes](#built-in-themes)
- [Theme Customization](#theme-customization)
- [CSS Variables](#css-variables)
- [Responsive Design](#responsive-design)
- [Dark Mode](#dark-mode)

---

## Built-in Themes

Syncfusion ComboBox comes with several professional themes. Choose one based on your design system.

### Available Themes

| Theme | CSS File | Best For |
|-------|----------|----------|
| **Tailwind** | `tailwind3.css` | Modern, utility-first design |
| **Bootstrap** | `bootstrap5.css` | Bootstrap projects |
| **Fluent** | `fluent.css` | Microsoft Office-like UI |
| **Fabric** | `fabric.css` | Microsoft Fabric Design System |
| **Material** | `material.css` | Google Material Design |
| **Highcontrast** | `highcontrast.css` | Accessibility, high contrast |

### Apply a Theme in _Layout.cshtml

**Tailwind 3 Theme (Recommended):**
```html
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-base/styles/tailwind3.css">
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-inputs/styles/tailwind3.css">
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-dropdowns/styles/tailwind3.css">
</head>
```

**Bootstrap 5 Theme:**
```html
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-base/styles/bootstrap5.css">
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-inputs/styles/bootstrap5.css">
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-dropdowns/styles/bootstrap5.css">
</head>
```

**Material Theme:**
```html
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css">
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-inputs/styles/material.css">
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-dropdowns/styles/material.css">
</head>
```

---

## Theme Customization

### Override Theme Variables

Most themes use CSS custom properties (variables) that you can override:

**In your custom CSS file (after Syncfusion imports):**
```css
:root {
    /* Primary brand color */
    --e-base-primary: #0066cc;
    
    /* Border colors */
    --e-base-border: #ddd;
    
    /* Background color */
    --e-base-bg: #ffffff;
    
    /* Text color */
    --e-base-text: #333;
    
    /* Hover background */
    --e-hover-bg: #f5f5f5;
    
    /* Selected background */
    --e-selected-bg: #0066cc;
    --e-selected-text: #ffffff;
}
```

### Custom ComboBox Styles

**CSS:**
```css
/* ComboBox container */
.e-combobox.e-input-group {
    border-radius: 6px;
    border: 2px solid #ccc;
    transition: border-color 0.3s ease;
}

.e-combobox.e-input-group:focus-within {
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

/* Input field */
.e-combobox .e-input {
    font-size: 14px;
    padding: 10px 12px;
    background-color: #f9f9f9;
}

.e-combobox .e-input:focus {
    background-color: #ffffff;
}

/* Dropdown popup */
.e-dropdown-popup .e-list-parent {
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* List items */
.e-dropdown-popup .e-list-item {
    padding: 10px 12px;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s ease;
}

.e-dropdown-popup .e-list-item:hover {
    background-color: #f5f5f5;
    color: #0066cc;
}

.e-dropdown-popup .e-item-selected {
    background-color: #e3f2fd;
    color: #0066cc;
    font-weight: 500;
}
```

---

## CSS Variables

### Common CSS Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `--e-base-primary` | Primary brand color | `#0066cc` |
| `--e-base-border` | Border color | `#ccc` |
| `--e-base-bg` | Background color | `#fff` |
| `--e-base-text` | Text color | `#333` |
| `--e-hover-bg` | Hover background | `#f5f5f5` |
| `--e-selected-bg` | Selected background | `#0066cc` |
| `--e-selected-text` | Selected text color | `#fff` |
| `--e-focus-shadow` | Focus shadow | `rgba(0,102,204,0.1)` |

### Using CSS Variables

**In your stylesheet:**
```css
.custom-combo-wrapper {
    --e-base-primary: #ff6600;
    --e-hover-bg: #fff0e6;
}
```

---

## Responsive Design

### Mobile-Friendly ComboBox

**View (Razor):**
```html
<div class="combo-wrapper">
    <ejs-combobox id="responsive-combo"
        dataSource="ViewBag.Items"
        placeholder="Select an item"
        allowFiltering="true"
        popupHeight="auto">
    </ejs-combobox>
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</div>

<style>
    .combo-wrapper {
        width: 100%;
        max-width: 400px;
    }
    
    @media (max-width: 768px) {
        .combo-wrapper {
            max-width: 100%;
        }
        
        .e-dropdown-popup {
            width: 100% !important;
            max-height: 50vh;
            overflow-y: auto;
        }
    }
    
    @media (max-width: 480px) {
        .e-combobox .e-input {
            font-size: 16px; /* Prevents zoom on iOS */
        }
    }
</style>
```

---

## Dark Mode

### Implement Dark Mode Toggle

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.Items = new List<string> { "Item 1", "Item 2", "Item 3" };
    return View();
}
```

**View (Razor):**
```html
<button id="darkModeToggle" class="theme-toggle">🌙 Dark Mode</button>

<ejs-combobox id="combo"
    dataSource="ViewBag.Items"
    placeholder="Select an item">
</ejs-combobox>

<script>
document.getElementById('darkModeToggle').addEventListener('click', function() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark-mode');
    
    if (isDark) {
        html.classList.remove('dark-mode');
        this.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark-mode');
        this.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});

// Restore theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-mode');
}
</script>

<style>
    /* Light mode (default) */
    :root {
        --bg-color: #ffffff;
        --text-color: #333;
        --border-color: #ccc;
    }
    
    /* Dark mode */
    html.dark-mode {
        --bg-color: #1e1e1e;
        --text-color: #e0e0e0;
        --border-color: #444;
    }
    
    .e-combobox {
        background-color: var(--bg-color);
        color: var(--text-color);
        border-color: var(--border-color);
    }
</style>
```

### CSS for Dark Theme

**Add to your stylesheet:**
```css
html.dark-mode {
    --e-base-primary: #4a9eff;
    --e-base-bg: #1e1e1e;
    --e-base-text: #e0e0e0;
    --e-base-border: #444;
    --e-hover-bg: #2d2d2d;
    --e-selected-bg: #4a9eff;
}

html.dark-mode .e-combobox.e-input-group {
    background-color: #1e1e1e;
    color: #e0e0e0;
}

html.dark-mode .e-dropdown-popup .e-list-item:hover {
    background-color: #2d2d2d;
}
```
