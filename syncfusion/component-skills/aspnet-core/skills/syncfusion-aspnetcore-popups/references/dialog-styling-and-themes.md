# Styling & Themes — Dialog (ASP.NET Core)

## Table of Contents
- [Built-in Themes](#built-in-themes)
- [CSS Customization](#css-customization)
- [Custom Theme Creation](#custom-theme-creation)
- [Dark Mode](#dark-mode)
- [Responsive Styling](#responsive-styling)

## Built-in Themes

### Available Themes

Syncfusion provides multiple pre-built themes:

```html
<!-- Material Theme (Default) -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material.css" />

<!-- Bootstrap Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/bootstrap.css" />

<!-- Fluent Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />

<!-- Tailwind Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/tailwind.css" />

<!-- Material Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material-dark.css" />

<!-- Bootstrap Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/bootstrap-dark.css" />

<!-- Fluent Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent-dark.css" />

<!-- Tailwind Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/tailwind-dark.css" />
```

### Material Theme Example

```csharp
<!-- _Layout.cshtml -->
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material.css" />
</head>

<!-- Dialog in Material theme -->
<ejs-dialog id="materialDialog" 
    header="Material Theme" 
    width="500px">
    <e-content-template>
        <p>This dialog uses the Material design theme.</p>
    </e-content-template>
</ejs-dialog>
```

### Bootstrap Theme Example

```csharp
<!-- _Layout.cshtml -->
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/bootstrap.css" />
</head>

<!-- Dialog in Bootstrap theme -->
<ejs-dialog id="bootstrapDialog" 
    header="Bootstrap Theme" 
    width="500px">
    <e-content-template>
        <p>This dialog uses the Bootstrap theme.</p>
    </e-content-template>
</ejs-dialog>
```

## CSS Customization

### Custom Dialog Styling

Override default styles with custom CSS:

```csharp
<style>
    /* Customize dialog header */
    .e-dialog .e-dlg-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        font-weight: bold;
    }

    /* Customize dialog content */
    .e-dialog .e-dlg-content {
        padding: 30px;
        background-color: #f9f9f9;
        font-family: 'Segoe UI', sans-serif;
    }

    /* Customize footer buttons */
    .e-dialog .e-footer .e-btn {
        border-radius: 8px;
        font-weight: 600;
        padding: 8px 16px;
    }

    /* Customize primary button -->
    .e-dialog .e-footer .e-btn.e-primary {
        background: #667eea;
    }
</style>

<ejs-dialog id="styledDialog" 
    header="Custom Styled Dialog" 
    width="500px"
    visible="false">
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="Save" isPrimary="true"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton content="Cancel"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>This dialog has custom styling applied.</p>
    </e-content-template>
</ejs-dialog>
```

### CSS Class Application

Apply custom CSS classes to dialog:

```csharp
<ejs-dialog id="classDialog" 
    header="Custom Classes" 
    width="500px"
    cssClass="premium-dialog"
    visible="false">
    <e-content-template>
        <p>This dialog uses custom CSS classes.</p>
    </e-content-template>
</ejs-dialog>

<style>
    .premium-dialog .e-dlg-header {
        background: #2c3e50;
        color: white;
        border-bottom: 3px solid #3498db;
    }

    .premium-dialog .e-dlg-content {
        background: white;
        border-left: 5px solid #3498db;
    }

    .premium-dialog .e-footer {
        background: #ecf0f1;
        border-top: 1px solid #bdc3c7;
    }
</style>
```

### Inline Styles

Apply styles directly to dialog elements:

```csharp
<ejs-dialog id="inlineStyleDialog" 
    header="Inline Styled" 
    width="500px"
    style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);"
    visible="false">
    <e-content-template>
        <div style="background: linear-gradient(to right, #00c6ff, #0072ff); 
                    color: white; 
                    padding: 20px; 
                    border-radius: 8px;">
            <p>Dialog with inline gradient styling.</p>
        </div>
    </e-content-template>
</ejs-dialog>
```

## Custom Theme Creation

### CSS Variables

Customize theme using CSS custom properties:

```csharp
<style>
    :root {
        --dialog-primary-color: #667eea;
        --dialog-secondary-color: #764ba2;
        --dialog-border-color: #e0e0e0;
        --dialog-text-color: #333;
        --dialog-header-bg: #f5f5f5;
    }

    .e-dialog {
        --e-primary-color: var(--dialog-primary-color);
        border: 1px solid var(--dialog-border-color);
        color: var(--dialog-text-color);
    }

    .e-dialog .e-dlg-header {
        background: var(--dialog-header-bg);
        border-bottom: 2px solid var(--dialog-primary-color);
    }

    .e-dialog .e-btn.e-primary {
        background: var(--dialog-primary-color);
    }
</style>

<ejs-dialog id="themeVarDialog" 
    header="CSS Variable Theme" 
    width="500px"
    visible="false">
    <e-content-template>
        <p>This dialog uses CSS custom properties for theming.</p>
    </e-content-template>
</ejs-dialog>

<!-- Switch theme by changing CSS variables -->
<button class="e-btn" onclick="switchTheme('purple')">Purple Theme</button>
<button class="e-btn" onclick="switchTheme('blue')">Blue Theme</button>

<script>
    function switchTheme(theme) {
        const root = document.documentElement;
        
        if (theme === 'purple') {
            root.style.setProperty('--dialog-primary-color', '#9b59b6');
            root.style.setProperty('--dialog-secondary-color', '#8e44ad');
        } else if (theme === 'blue') {
            root.style.setProperty('--dialog-primary-color', '#3498db');
            root.style.setProperty('--dialog-secondary-color', '#2980b9');
        }
    }
</script>
```

### Complete Custom Theme

```csharp
<style>
    /* Custom theme: "Ocean" */
    .ocean-theme.e-dialog {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
    }

    .ocean-theme.e-dialog .e-dlg-header {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        backdrop-filter: blur(10px);
        padding: 20px;
    }

    .ocean-theme.e-dialog .e-dlg-content {
        background: white;
        color: #333;
        padding: 30px;
    }

    .ocean-theme.e-dialog .e-footer {
        background: #f8f9fa;
        border-top: 1px solid #e9ecef;
        padding: 15px 20px;
    }

    .ocean-theme.e-dialog .e-btn.e-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        color: white;
        font-weight: 600;
    }

    .ocean-theme.e-dialog .e-btn.e-primary:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }
</style>

<ejs-dialog id="oceanThemeDialog" 
    header="Custom Ocean Theme" 
    width="500px"
    cssClass="ocean-theme"
    visible="false">
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="Save" isPrimary="true"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton content="Cancel"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>This dialog uses a completely custom "Ocean" theme.</p>
    </e-content-template>
</ejs-dialog>
```

## Dark Mode

### System Dark Mode Detection

```csharp
<script>
    // Detect system dark mode preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkMode) {
        // Load dark theme
        var darkLink = document.createElement('link');
        darkLink.rel = 'stylesheet';
        darkLink.href = 'https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material-dark.css';
        document.head.appendChild(darkLink);
    }
</script>
```

### Manual Dark Mode Toggle

```csharp
<button class="e-btn" onclick="toggleDarkMode()">🌙 Dark Mode</button>

<ejs-dialog id="darkModeDialog" 
    header="Dark Mode Support" 
    width="500px"
    visible="false">
    <e-content-template>
        <p>Toggle dark mode using the button above.</p>
    </e-content-template>
</ejs-dialog>

<script>
    var isDarkMode = false;

    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            // Apply dark mode CSS
            var darkLink = document.createElement('link');
            darkLink.rel = 'stylesheet';
            darkLink.id = 'dark-theme';
            darkLink.href = 'https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material-dark.css';
            document.head.appendChild(darkLink);
            
            document.body.classList.add('e-dark');
        } else {
            // Remove dark mode CSS
            var darkLink = document.getElementById('dark-theme');
            if (darkLink) {
                darkLink.remove();
            }
            
            document.body.classList.remove('e-dark');
        }
    }
</script>
```

### Dark Mode CSS

```csharp
<style>
    /* Dark mode styles */
    body.e-dark .e-dialog {
        background: #1e1e1e;
        color: #e0e0e0;
    }

    body.e-dark .e-dialog .e-dlg-header {
        background: #2d2d2d;
        border-bottom: 1px solid #444;
    }

    body.e-dark .e-dialog .e-dlg-content {
        background: #1e1e1e;
        color: #e0e0e0;
    }

    body.e-dark .e-dialog .e-footer {
        background: #252525;
        border-top: 1px solid #444;
    }

    body.e-dark .e-dialog .e-btn {
        background: #404040;
        color: #e0e0e0;
    }

    body.e-dark .e-dialog .e-btn.e-primary {
        background: #0078d4;
    }
</style>
```

## Responsive Styling

### Mobile Responsive Dialog

```csharp
<style>
    /* Desktop: Normal size -->
    @@media (min-width: 1024px) {
        #responsiveDialog {
            width: 600px !important;
            height: 400px !important;
        }
    }

    /* Tablet: Medium size -->
    @@media (max-width: 1023px) and (min-width: 768px) {
        #responsiveDialog {
            width: 80% !important;
            height: auto !important;
        }
    }

    /* Mobile: Full width -->
    @@media (max-width: 767px) {
        #responsiveDialog {
            width: 95% !important;
            height: auto !important;
            max-height: 90vh !important;
        }

        #responsiveDialog .e-dlg-header {
            padding: 12px;
        }

        #responsiveDialog .e-dlg-content {
            padding: 15px;
        }

        #responsiveDialog .e-footer {
            flex-direction: column;
        }

        #responsiveDialog .e-footer .e-btn {
            width: 100%;
        }
    }
</style>

<ejs-dialog id="responsiveDialog" 
    header="Responsive Dialog" 
    width="600px" 
    height="400px"
    visible="false">
    <e-content-template>
        <p>This dialog is responsive and adapts to screen size.</p>
        <p>Resize your browser to see the changes.</p>
    </e-content-template>
</ejs-dialog>
```

### Overflow Handling

```csharp
<style>
    /* Prevent content overflow -->
    .e-dialog .e-dlg-content {
        overflow-y: auto;
        max-height: calc(100vh - 200px);
    }

    /* Scrollbar styling -->
    .e-dialog .e-dlg-content::-webkit-scrollbar {
        width: 8px;
    }

    .e-dialog .e-dlg-content::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .e-dialog .e-dlg-content::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    .e-dialog .e-dlg-content::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>
```

### Print Styling

```csharp
<style>
    @@media print {
        /* Hide dialog overlay and show only content -->
        .e-dialog-overlay {
            display: none !important;
        }

        .e-dialog {
            position: static !important;
            box-shadow: none !important;
            page-break-inside: avoid;
        }

        .e-dialog .e-footer {
            display: none !important;
        }
    }
</style>
```

## Theme Comparison Table

| Theme | Primary Color | Best For |
|-------|---------------|----------|
| Material | Blue | Modern, clean design |
| Bootstrap | Blue | Bootstrap-based projects |
| Fluent | Blue | Microsoft design language |
| Tailwind | Blue | Tailwind projects |
| Material Dark | Purple | Dark mode, modern |
| Bootstrap Dark | Dark | Dark mode, professional |

