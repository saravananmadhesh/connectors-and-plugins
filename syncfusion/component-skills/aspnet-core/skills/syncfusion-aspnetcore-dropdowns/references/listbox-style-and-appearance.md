# Styling and Appearance — ListBox

## Table of Contents
- [Built-In Themes](#built-in-themes)
- [CSS Customization](#css-customization)
- [Size and Height](#size-and-height)
- [Custom Colors](#custom-colors)
- [Borders and Shadows](#borders-and-shadows)
- [Responsive Design](#responsive-design)

---

## Built-In Themes

### Available Themes

ListBox supports multiple built-in CSS themes:

| Theme | Class | Use Case |
|-------|-------|----------|
| Bootstrap 5 | `e-bootstrap5` | Modern, default theme |
| Fluent | `e-fluent` | Microsoft Fluent design |
| Tailwind | `e-tailwind` | Tailwind CSS design |
| Fabric | `e-fabric` | Microsoft Fabric design |
| Bootstrap | `e-bootstrap` | Bootstrap 4 compatibility |
| Material | `e-material` | Google Material design |

### Apply Theme

**In _Layout.cshtml:**

```cshtml
<!DOCTYPE html>
<html>
<head>
    @* Bootstrap 5 Theme (default) *@
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-bootstrap5@latest/styles/bootstrap5.css" />
    
    @* Or use Fluent theme *@
    @* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-fluent@latest/styles/fluent.css" /> *@
    
    @* Or use Tailwind theme *@
    @* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-tailwind@latest/styles/tailwind.css" /> *@
</head>
<body>
    @RenderBody()
    <script src="..."></script>
</body>
</html>
```

### Switch Theme at Runtime

```javascript
function switchTheme(theme) {
    let link = document.getElementById('theme-link');
    link.href = `https://cdn.jsdelivr.net/npm/ej2-${theme}@latest/styles/${theme}.css`;
}

// Usage
switchTheme('fluent');  // Switch to Fluent
switchTheme('tailwind');  // Switch to Tailwind
```

---

## CSS Customization

### Customize ListBox Container

```css
/* Wrapper/container */
.e-listbox {
    border: 2px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    background: #fff;
}

/* Scroller area */
.e-listbox .e-list-scroller {
    overflow-y: auto;
}

/* List items container */
.e-listbox .e-list-parent {
    margin: 0;
    padding: 0;
}
```

### Style List Items

```css
/* All items */
.e-listbox .e-list-item {
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
    transition: all 0.2s ease;
}

/* Hover state */
.e-listbox .e-list-item:hover {
    background: #f5f5f5;
    transform: translateX(4px);
}

/* Selected item */
.e-listbox .e-list-item.e-active {
    background: linear-gradient(to right, #0066cc, #004c99);
    color: white;
    border-left: 4px solid #ffb700;
    padding-left: 12px;
}

/* Focused item */
.e-listbox .e-list-item.e-active:focus {
    outline: 2px solid #0052a3;
    outline-offset: -2px;
}

/* Disabled item */
.e-listbox .e-list-item.e-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #fafafa;
}

/* Checkbox */
.e-listbox .e-list-item .e-chk-hidden + .e-checkbox-wrapper {
    margin-right: 8px;
}
```

### Checkbox Styling

```css
.e-checkbox-wrapper {
    cursor: pointer;
}

.e-checkbox-wrapper .e-checkmark::before {
    border-color: #0066cc;
    border-width: 2px;
}

.e-checkbox-wrapper.e-checked .e-checkmark::after {
    border-color: white;
    background: #0066cc;
}

/* Indeterminate state */
.e-checkbox-wrapper.e-indeterminate .e-checkmark::before {
    background: #0066cc;
}
```

---

## Size and Height

### Predefined Heights

```cshtml
@* Compact *@
<ejs-listbox id="compact" dataSource="@ViewBag.items" height="150px"></ejs-listbox>

@* Standard *@
<ejs-listbox id="standard" dataSource="@ViewBag.items" height="300px"></ejs-listbox>

@* Large *@
<ejs-listbox id="large" dataSource="@ViewBag.items" height="500px"></ejs-listbox>

@* Full height *@
<ejs-listbox id="fullheight" dataSource="@ViewBag.items" height="100%"></ejs-listbox>
```

### Width Control

```cshtml
<div style="width: 300px;">
    <ejs-listbox id="listbox" 
        dataSource="@ViewBag.items"
        height="300px">
        <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    </ejs-listbox>
</div>
```

### Responsive Sizing

```css
@media (max-width: 768px) {
    .e-listbox {
        height: 200px !important;
    }
}

@media (max-width: 480px) {
    .e-listbox {
        height: 150px !important;
        width: 100% !important;
    }
}
```

---

## Custom Colors

### Dark Mode

```css
/* Dark mode theme */
.dark-mode .e-listbox {
    background: #2a2a2a;
    border-color: #444;
}

.dark-mode .e-listbox .e-list-item {
    color: #f0f0f0;
    border-bottom-color: #444;
}

.dark-mode .e-listbox .e-list-item:hover {
    background: #3a3a3a;
}

.dark-mode .e-listbox .e-list-item.e-active {
    background: linear-gradient(to right, #1e88e5, #1565c0);
}
```

### Custom Color Scheme

```css
:root {
    --primary-color: #0066cc;
    --primary-dark: #004c99;
    --secondary-color: #f0f0f0;
    --text-color: #333;
    --border-color: #ddd;
}

.e-listbox {
    border-color: var(--border-color);
    background: #fff;
}

.e-listbox .e-list-item.e-active {
    background: var(--primary-color);
    color: white;
}

.e-listbox .e-list-item:hover {
    background: var(--secondary-color);
}
```

### Accent Color

```css
.e-listbox .e-list-item.e-active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

---

## Borders and Shadows

### Border Styles

```css
/* Thick border */
.e-listbox {
    border: 3px solid #0066cc;
}

/* Dashed border */
.e-listbox {
    border: 2px dashed #999;
}

/* Left accent border */
.e-listbox {
    border-left: 4px solid #0066cc;
}

/* Rounded corners */
.e-listbox {
    border-radius: 12px;
    overflow: hidden;
}
```

### Shadow Effects

```css
/* Subtle shadow */
.e-listbox {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Medium shadow */
.e-listbox {
    box-shadow: 0 4px 8px rgba(0,0,0,0.12);
}

/* Deep shadow */
.e-listbox {
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

/* Inset shadow */
.e-listbox {
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}
```

### Item-Level Effects

```css
.e-listbox .e-list-item.e-active {
    box-shadow: -4px 0 8px rgba(0, 102, 204, 0.3);
}

.e-listbox .e-list-item {
    transition: box-shadow 0.3s ease;
}

.e-listbox .e-list-item:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
```

---

## Responsive Design

### Fluid Sizing

```html
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <ejs-listbox id="listbox" 
                dataSource="@ViewBag.items"
                height="300px">
                <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
            </ejs-listbox>
        </div>
    </div>
</div>
```

### Mobile-First CSS

```css
/* Mobile (default) */
.e-listbox {
    height: 200px;
    font-size: 16px;
}

.e-listbox .e-list-item {
    padding: 15px;
    min-height: 44px;  /* Touch target */
}

/* Tablet */
@media (min-width: 768px) {
    .e-listbox {
        height: 300px;
        font-size: 14px;
    }
    
    .e-listbox .e-list-item {
        padding: 12px;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .e-listbox {
        height: 400px;
    }
}
```

### Flexible Container

```cshtml
<style>
.flex-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.listbox-wrapper {
    flex: 1;
    min-width: 250px;
}

@media (max-width: 768px) {
    .flex-container {
        flex-direction: column;
    }
    
    .listbox-wrapper {
        min-width: 100%;
    }
}
</style>

<div class="flex-container">
    <div class="listbox-wrapper">
        <ejs-listbox id="list1" dataSource="@ViewBag.items1" height="300px">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
        </ejs-listbox>
    </div>
    
    <div class="listbox-wrapper">
        <ejs-listbox id="list2" dataSource="@ViewBag.items2" height="300px">
            <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
        </ejs-listbox>
    </div>
</div>
```

---

## CSS Classes Reference

| Class | Purpose |
|-------|---------|
| `.e-listbox` | Main ListBox container |
| `.e-list-scroller` | Scrollable area |
| `.e-list-item` | Individual list item |
| `.e-active` | Selected item |
| `.e-disabled` | Disabled item |
| `.e-focused` | Focused item |
| `.e-checkbox-wrapper` | Checkbox wrapper |
| `.e-chk-hidden` | Hidden checkbox input |
| `.e-group-header` | Group header |
| `.e-list-parent` | Items container |
