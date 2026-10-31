# Customization and Theming

## Table of Contents

- [Built-in Themes](#built-in-themes)
- [Theme Switching](#theme-switching)
- [CSS Customization](#css-customization)
- [Dark Mode](#dark-mode)
- [Custom Icons](#custom-icons)
- [Complete Example](#complete-example)

## Built-in Themes

Syncfusion EJ2 ASP.NET Core Ribbon supports 5 professional themes:

### Applying Built-in Themes

In `_Layout.cshtml`, add theme CSS:

```html
<!-- Material Theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/Material.css">

<!-- Or Bootstrap 5 Theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/bootstrap5.css">

<!-- Or Fluent Theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/fluent.css">

<!-- Script -->
<script src="https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/dist/ej2.min.js"></script>
```

## Theme Switching

### Dynamic Theme Switching at Runtime

```razor
@{
    var themes = new List<string> { "Material", "Bootstrap 5", "Fluent", "Tailwind", "Fabric" };
}

<div class="theme-selector">
    <label>Select Theme:</label>
    <select id="themeSelector" onchange="switchTheme(this.value)">
        <option value="material">Material</option>
        <option value="bootstrap5">Bootstrap 5</option>
        <option value="fluent">Fluent</option>
        <option value="tailwind">Tailwind</option>
        <option value="fabric">Fabric</option>
    </select>
</div>

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function switchTheme(themeName) {
        // Remove all existing theme links
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(function(link) {
            if (link.href.includes('@syncfusion/ej2')) {
                link.remove();
            }
        });

        // Add new theme link
        var themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.href = 'https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/' + themeName + '.css';
        document.head.appendChild(themeLink);

        // Refresh ribbon if necessary
        var ribbonObj = document.getElementById('ribbon').ej2_instances[0];
        ribbonObj.refresh();
    }
</script>
```

## CSS Customization

### Key CSS Classes

| Class | Element | Purpose |
|-------|---------|---------|
| `.e-ribbon` | Ribbon container | Main wrapper |
| `.e-ribbon-tab` | Tab element | Tab styling |
| `.e-ribbon-group` | Group container | Group styling |
| `.e-ribbon-group-header` | Group header | Header text styling |
| `.e-ribbon-item` | Item container | Item wrapper |
| `.e-ribbon-button` | Button element | Button styling |
| `.e-ribbon-dropdown` | Dropdown | Dropdown menu |

### Custom Color Scheme

```html
<style>
    /* Custom ribbon colors */
    .e-ribbon {
        background-color: #f5f5f5;
        border-bottom: 2px solid #007bff;
    }

    /* Custom tab styling */
    .e-ribbon-tab {
        color: #333;
        padding: 10px 15px;
        border-radius: 4px 4px 0 0;
    }

    /* Active tab */
    .e-ribbon-tab.e-active {
        background-color: #fff;
        border-bottom: 3px solid #007bff;
    }

    /* Group header */
    .e-ribbon-group-header {
        color: #555;
        font-weight: 600;
        font-size: 13px;
    }

    /* Button hover effect */
    .e-ribbon-button:hover {
        background-color: #e9ecef;
        border-radius: 3px;
    }

    /* Group separator */
    .e-ribbon-group::after {
        content: '';
        border-right: 1px solid #ddd;
    }
</style>
```

### Custom Icon Colors

```html
<style>
    /* Icon colors */
    .e-ribbon-button .e-icon {
        color: #007bff;
    }

    /* Icon hover */
    .e-ribbon-button:hover .e-icon {
        color: #0056b3;
    }

    /* Disabled icon */
    .e-ribbon-button.e-disabled .e-icon {
        color: #ccc;
        opacity: 0.5;
    }
</style>
```

## Dark Mode

### Dark Mode Implementation

```razor
@{
    var isDarkMode = ViewBag.DarkMode ?? false;
}

<div class="theme-toggle">
    <button onclick="toggleDarkMode()">
        <span id="themeIcon">🌙 Dark Mode</span>
    </button>
</div>

<ejs-ribbon id="ribbon" class="@(isDarkMode ? "dark-mode" : "")">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-copy" 
                                        content="Copy">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<style>
    /* Dark mode CSS variables */
    :root {
        --ribbon-bg: #f5f5f5;
        --ribbon-text: #333;
        --ribbon-border: #ddd;
        --item-hover: #e9ecef;
    }

    :root.dark-mode {
        --ribbon-bg: #2d2d2d;
        --ribbon-text: #f0f0f0;
        --ribbon-border: #444;
        --item-hover: #404040;
    }

    .e-ribbon {
        background-color: var(--ribbon-bg);
        color: var(--ribbon-text);
    }

    .e-ribbon-tab {
        color: var(--ribbon-text);
    }

    .e-ribbon-group {
        border-right-color: var(--ribbon-border);
    }

    .e-ribbon-button:hover {
        background-color: var(--item-hover);
    }

    .e-ribbon-button .e-icon {
        color: var(--ribbon-text);
    }

    /* Dark mode specific overrides */
    .dark-mode .e-ribbon-button {
        background-color: transparent;
        border-color: #555;
    }

    .dark-mode .e-ribbon-dropdown {
        background-color: #363636;
        color: #f0f0f0;
        border-color: #555;
    }

    .dark-mode .e-ribbon-item-content {
        color: #f0f0f0;
    }
</style>

<script>
    function toggleDarkMode() {
        var html = document.documentElement;
        var isDark = html.classList.contains('dark-mode');
        
        if (isDark) {
            html.classList.remove('dark-mode');
            document.getElementById('themeIcon').textContent = '🌙 Dark Mode';
            localStorage.setItem('darkMode', 'false');
        } else {
            html.classList.add('dark-mode');
            document.getElementById('themeIcon').textContent = '☀️ Light Mode';
            localStorage.setItem('darkMode', 'true');
        }

        // Refresh ribbon to apply new styles
        var ribbonObj = document.getElementById('ribbon').ej2_instances[0];
        ribbonObj.refresh();
    }

    // Apply saved dark mode preference on page load
    window.addEventListener('load', function() {
        var savedDarkMode = localStorage.getItem('darkMode') === 'true';
        if (savedDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.getElementById('themeIcon').textContent = '☀️ Light Mode';
        }
    });
</script>
```

## Custom Icons

### Using Font Awesome Icons

```html
<!-- Add Font Awesome CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<style>
    /* Map Font Awesome to Syncfusion icons */
    .e-icons-fontawesome::before {
        font-family: 'Font Awesome 6 Free';
    }
</style>

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Edit">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings 
                                        iconCss="fas fa-copy" 
                                        content="Copy">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings 
                                        iconCss="fas fa-scissors" 
                                        content="Cut">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings 
                                        iconCss="fas fa-paste" 
                                        content="Paste">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Custom SVG Icons

```razor
@{
    var copyIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/></svg>";
}

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button itemTemplate='@copyIcon' id="copyBtn">
                                    <e-ribbon-buttonsettings content="Copy"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<style>
    /* SVG icon styling */
    .e-ribbon-button svg {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 5px;
    }
</style>
```

## Complete Example

### Fully Customized Ribbon with Multiple Themes

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon

@{
    var themes = new List<string> { "Material", "Bootstrap 5", "Fluent", "Tailwind", "Fabric" };
    var currentTheme = ViewBag.CurrentTheme ?? "Material";
}

<div class="customization-panel">
    <div class="theme-controls">
        <div class="control-group">
            <label>Theme:</label>
            <select id="themeSelector" onchange="switchTheme(this.value)">
                <option value="material" selected>Material</option>
                <option value="bootstrap5">Bootstrap 5</option>
                <option value="fluent">Fluent</option>
                <option value="tailwind">Tailwind</option>
                <option value="fabric">Fabric</option>
            </select>
        </div>
        <div class="control-group">
            <button onclick="toggleDarkMode()" class="dark-mode-btn">
                <span id="darkModeIcon">🌙</span> Dark Mode
            </button>
        </div>
    </div>
</div>

<ejs-ribbon id="ribbon" created="ribbonCreated">
    <e-ribbon-tabs>
        <!-- Home Tab -->
        <e-ribbon-tab header="Home" keyTip="H">
            <e-ribbon-groups>
                <!-- Clipboard Group -->
                <e-ribbon-group 
                    header="Clipboard" 
                    groupIconCss="e-icons e-paste"
                    showLauncherIcon=true>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button keyTip="PA">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-paste" 
                                        content="Paste">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button keyTip="CT">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-cut" 
                                        content="Cut">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button keyTip="CO">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-copy" 
                                        content="Copy">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Font Group -->
                <e-ribbon-group 
                    header="Font" 
                    groupIconCss="e-icons e-bold"
                    showLauncherIcon=true>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-bold" 
                                        isToggle=true 
                                        content="Bold">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-italic" 
                                        isToggle=true 
                                        content="Italic">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-underline" 
                                        isToggle=true 
                                        content="Underline">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<style>
    /* Custom ribbon styling */
    .customization-panel {
        padding: 15px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
    }

    .theme-controls {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .control-group {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .control-group label {
        font-weight: 600;
        margin: 0;
    }

    .control-group select {
        padding: 6px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    .dark-mode-btn {
        padding: 6px 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }

    .dark-mode-btn:hover {
        background-color: #0056b3;
    }

    /* CSS Variables for theming */
    :root {
        --ribbon-bg: #f5f5f5;
        --ribbon-text: #333;
        --ribbon-border: #ddd;
    }

    :root.dark-mode {
        --ribbon-bg: #2d2d2d;
        --ribbon-text: #f0f0f0;
        --ribbon-border: #444;
    }

    .e-ribbon {
        background-color: var(--ribbon-bg);
        color: var(--ribbon-text);
    }

    .e-ribbon-tab {
        color: var(--ribbon-text);
    }

    .e-ribbon-group-header {
        color: var(--ribbon-text);
    }
</style>

<script>
    function switchTheme(themeName) {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(function(link) {
            if (link.href.includes('@syncfusion/ej2')) {
                link.remove();
            }
        });

        var themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.href = 'https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/' + themeName + '.css';
        document.head.appendChild(themeLink);
    }

    function toggleDarkMode() {
        var html = document.documentElement;
        html.classList.toggle('dark-mode');
        var isDark = html.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'true' : 'false');
        document.getElementById('darkModeIcon').textContent = isDark ? '☀️' : '🌙';
    }

    function ribbonCreated(args) {
        var savedDarkMode = localStorage.getItem('darkMode') === 'true';
        if (savedDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.getElementById('darkModeIcon').textContent = '☀️';
        }
    }
</script>
```

## Best Practices

### 1. Choose Appropriate Theme
- Use **Material** for modern, minimalist designs
- Use **Bootstrap 5** for Bootstrap-based applications
- Use **Fluent** for Microsoft Office-like experience
- Use **Fabric** for Enterprise Office integration

### 2. Respect User Preferences
- Store theme preference in localStorage
- Apply dark mode based on system preference

### 3. Ensure Accessibility
- Maintain sufficient color contrast
- Test with accessibility tools
- Verify dark mode colors meet WCAG standards

### 4. Optimize Performance
- Load theme CSS only once
- Minimize custom CSS overrides
- Use CSS variables for maintainability

---
