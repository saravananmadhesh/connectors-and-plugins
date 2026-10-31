# Theme and Appearance Guide for Syncfusion ASP.NET Core Controls

## Overview

Syncfusion ASP.NET Core controls provide a comprehensive theming system that allows developers to customize the appearance and layout of UI components. This guide covers theme usage, customization, size modes, and the Theme Studio tool.

## Available Themes

Syncfusion provides the following built-in themes for ASP.NET Core controls:

| Theme | CSS File | Description |
|-------|----------|-------------|
| Bootstrap 5 | bootstrap5.css | Modern Bootstrap v5 design |
| Bootstrap 5 Dark | bootstrap5-dark.css | Dark variant of Bootstrap 5 |
| Bootstrap 4 | bootstrap4.css | Bootstrap v4 design |
| Bootstrap 3 | bootstrap.css | Bootstrap v3 design |
| Bootstrap 3 Dark | bootstrap-dark.css | Dark variant of Bootstrap 3 |
| Google's Material | material.css | Material Design theme |
| Google's Material Dark | material-dark.css | Dark variant of Material Design |
| Tailwind CSS | tailwind.css | Tailwind CSS based design |
| Tailwind CSS Dark | tailwind-dark.css | Dark variant of Tailwind CSS |
| Fluent | fluent.css | Microsoft Fluent Design |
| Fluent Dark | fluent-dark.css | Dark variant of Fluent Design |
| Microsoft Office Fabric | fabric.css | Microsoft Office Fabric design |
| Microsoft Office Fabric Dark | fabric-dark.css | Dark variant of Fabric Design |
| High Contrast | highcontrast.css | Accessibility-focused high contrast |
| Fusion | Custom | Available from Theme Studio |

> **Note**: The Bootstrap theme is designed based on Bootstrap v3, while Bootstrap4 theme is based on Bootstrap v4. Custom themes can be downloaded from the Theme Studio.

## Referencing Themes in ASP.NET Core Applications

### 1. CDN Reference

Using CDN is the simplest way to reference themes without downloading files locally. Add the stylesheet reference in the `<head>` element of `~/Pages/Shared/_Layout.cshtml`:

```html

<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent2.css" />
```

> **Note**: Ensure the version number in the URL matches your installed Syncfusion package version.

### 2. NPM Packages

Using NPM packages allows you to customize themes with SCSS variables.

**Installation Steps:**

1. Install Web Compiler in Visual Studio:
   - Open Visual Studio → Manage Extensions
   - Search for and install Web Compiler

2. Install Syncfusion packages in your project:
   ```bash
   npm install @syncfusion/ej2
   ```

3. Create a custom SCSS file at `~/wwwroot/css/custom.scss`:
   ```scss
   @import '../../node_modules/@syncfusion/ej2/material.scss';

   // Override default variables
   $primary: #0078d4;
   $accent: #00bcf2;
   ```

4. Right-click the SCSS file and select "Web Compiler" to compile it to CSS.

5. Add the compiled CSS to `_Layout.cshtml`:
   ```html
   <link rel="stylesheet" href="~/css/custom.css" />
   ```

6. Create/update `compilerconfig.json`:
   ```json
   [{
     "inputFile": "wwwroot/css/custom.scss",
     "outputFile": "wwwroot/css/custom.css"
   }]
   ```

### 3. LibMan (Library Manager)

LibMan simplifies downloading and managing client-side libraries without requiring Node.js or npm globally.

**Setup Steps:**

1. Right-click your project folder → Add → Client-Side Library
2. Select "unpkg" as the provider
3. Enter `@syncfusion/ej2@33.1.44` in the library textbox
4. Choose specific theme files (e.g., `lib/grid/styles/bootstrap5.css`)
5. Modify the target location to `wwwroot/themes/syncfusion/ej2/`
6. Click Install

7. Reference the downloaded theme in `_Layout.cshtml`:
   ```html
   <link rel="stylesheet" href="~/themes/syncfusion/ej2/bootstrap5.css" />
   ```

**With SCSS Customization:**

1. Choose SCSS files during LibMan installation
2. Install Web Compiler 2022+
3. Install node_modules: `npm install`
4. Right-click the SCSS file and select Web Compiler to compile
5. Configure `compilerconfig.json` with output path
6. Reference the compiled CSS in `_Layout.cshtml`

## Common Theme Variables

Syncfusion themes are built using SCSS with customizable variables. Here are some key variable categories:

### Bootstrap 5 Theme Variables

Common colors available for customization:

```scss
$black: #000;
$white: #fff;
$gray-100 to $gray-900: Various gray shades
$blue: #0d6efd;
$indigo: #6610f2;
$purple: #6f42c1;
$pink: #d63384;
$red: #dc3545;
$orange: #fd7e14;
$yellow: #ffc107;
$green: #198754;
$teal: #20c997;
$cyan: #0dcaf0;
```

### Material Theme Variables

```scss
$primary: #3f51b5;
$accent: #e3165b;
$accent-font: #fff;
$grey-white: #fff;
$grey-black: #000;
$grey-50 to $grey-900: Various gray shades
```

### Fluent Theme Variables

Microsoft Fluent Design colors with extensive gray palette tracking Windows/Office design standards.

### Bootstrap Theme (v3) Variables

Includes Bootstrap heritage variables like:

```scss
$brand-primary: #317ab9 (light), #0070f0 (dark)
$brand-success: #5cb85c
$brand-info: #5bc0de
$brand-warning: #f0ad4e
$brand-danger: #d9534f
```

### Tailwind CSS Theme Variables

Comprehensive color palette matching Tailwind CSS standards:

```scss
$black, $white, $transparent
$cool-gray-50 to $cool-gray-900
$red, $green, $orange, $cyan, $indigo
And many more...
```

### High Contrast Theme Variables

Optimized for accessibility with high contrast selections:

```scss
$selection-bg: #ffd939;
$selection-font: #000;
$hover-bg: #685708;
$border-default: #969696;
$success-bg: #166600;
$error-bg: #b30900;
```

> **Note**: For complete variable lists and all theme options, refer to the Theme Studio documentation.

## Size Modes

### Overview

Syncfusion ASP.NET Core controls support both touch mode (bigger theme) and normal (mouse) mode for different interaction types.

### Enabling Touch Mode for the Application

Add the `.e-bigger` CSS class to enable touch mode globally:

**In `~/wwwroot/css/site.css`:**

```css
body.e-bigger {
  /* Touch mode enabled */
}
```

**In `~/Pages/Shared/_Layout.cshtml`:**

```html
<body class="e-bigger">
  <!-- Application content -->
</body>
```

### Enabling Touch Mode for a Specific Control

Add the `.e-bigger` class to the container div:

```html
<div class="e-bigger">
  <ejs-grid id="grid" dataSource="ViewBag.DataSource">
    <!-- Grid content -->
  </ejs-grid>
</div>
```

### Changing Size Mode at Runtime

#### For the Entire Application

```html
<!-- In _Layout.cshtml with a toggle button -->
<button type="button" id="sizeMode">Switch Size Mode</button>

<script>
document.getElementById('sizeMode').addEventListener('click', function() {
  const body = document.body;
  body.classList.toggle('e-bigger');
});
</script>
```

#### For Individual Controls

```html
<button type="button" id="toggleControl">Toggle Control Size</button>

<div id="control-container">
  <ejs-grid id="grid" dataSource="ViewBag.DataSource">
    <!-- Grid content -->
  </ejs-grid>
</div>

<script>
document.getElementById('toggleControl').addEventListener('click', function() {
  const container = document.getElementById('control-container');
  const controls = container.querySelectorAll('.e-control');
  controls.forEach(control => {
    control.classList.toggle('e-bigger');
  });
});
</script>
```

### Changing Font Size for All Controls

Override the CSS for the `.e-control` class:

```html
<!-- In _Layout.cshtml or custom CSS -->
<style>
.e-control {
  font-size: 16px;
}
</style>
```

## Dynamic Theme Switching

### Implementing Theme Switcher

**Step 1: Modify `~/Pages/Shared/_Layout.cshtml`**

```html
<head>
  <link id="theme-link" rel="stylesheet" 
    href="https://cdn.syncfusion.com/ej2/33.1.44/bootstrap5.css" />
</head>

<body>
  <!-- Dropdown for theme selection -->
  <select id="themeSelector">
    <option value="bootstrap5">Bootstrap 5</option>
    <option value="bootstrap5-dark">Bootstrap 5 Dark</option>
    <option value="material">Material</option>
    <option value="tailwind">Tailwind CSS</option>
    <option value="fluent">Fluent</option>
  </select>

  <script>
    document.getElementById('themeSelector').addEventListener('change', function(e) {
      const themeName = e.target.value;
      const themeLink = document.getElementById('theme-link');
      themeLink.href = `https://cdn.syncfusion.com/ej2/33.1.44/${themeName}.css`;
    });
  </script>
</body>
```

**Step 2: Add dropdown data in `~/Pages/Index.cshtml.cs`**

```csharp
public class IndexModel : PageModel
{
    public List<ThemeItem> Themes { get; set; }

    public void OnGet()
    {
        Themes = new List<ThemeItem>
        {
            new ThemeItem { Name = "Bootstrap 5", Value = "bootstrap5" },
            new ThemeItem { Name = "Bootstrap 5 Dark", Value = "bootstrap5-dark" },
            new ThemeItem { Name = "Material", Value = "material" },
            new ThemeItem { Name = "Material Dark", Value = "material-dark" },
            new ThemeItem { Name = "Tailwind CSS", Value = "tailwind" },
            new ThemeItem { Name = "Fluent", Value = "fluent" },
            new ThemeItem { Name = "Fabric", Value = "fabric" }
        };
    }
}

public class ThemeItem
{
    public string Name { get; set; }
    public string Value { get; set; }
}
```

## Icons Reference

Syncfusion controls use standardized icon sets that are part of the theme. Icons are automatically styled through the CSS framework and are responsive to theme changes. When you switch themes or enable size modes, icons scale and color-adapt automatically according to the selected theme's design system.

Key points about icons:

- Icons are embedded in theme stylesheets
- Icons adapt to theme color schemes automatically
- Size modes affect icon scaling (larger in touch mode)
- High contrast themes ensure icon visibility for accessibility

Common icon uses in Syncfusion controls:

- Grid: Sort, filter, edit, delete, expand icons
- Dialog: Close, minimize, maximize icons
- Tree and TreeGrid: Expand/collapse icons
- File Manager: Folder, file, upload icons
- Toolbar and Context Menu: Action icons
- Editor: Formatting and command icons

> **Note**: Refer to individual control documentation for specific icon customization options.

## Best Practices

1. **Choose Appropriate Theme**: Select a theme that matches your application's design system
2. **Optimize File Size**: Use individual control CSS or Theme Studio filtering for production
3. **Customize Variables**: Use NPM or Theme Studio for brand-specific color customization
4. **Test Responsiveness**: Verify controls at different size modes (normal and touch)
5. **Accessibility**: Use high contrast theme for accessibility requirements
6. **Version Management**: Keep CDN URLs or package versions consistent
7. **Dark Mode Support**: Provide dark theme options for users
8. **Custom Themes**: Use Theme Studio for consistent brand-specific customization

