# Built-in Themes

## Table of Contents
- [Available Themes](#available-themes)
- [Applying Themes via npm](#applying-themes-via-npm)
- [Applying Themes via CDN](#applying-themes-via-cdn)
- [Individual Component Themes](#individual-component-themes)
- [Optimized (Lite) CSS Files](#optimized-lite-css-files)

## Available Themes

Syncfusion React components provide multiple modern themes with light and dark variants:

| Theme | Light CSS | Dark CSS | Design System |
|-------|-----------|----------|---------------|
| **Tailwind 3.4** | tailwind3.css | tailwind3-dark.css | Utility-first CSS framework v3.4 |
| **Bootstrap 5.3** | bootstrap5.3.css | bootstrap5.3-dark.css | Bootstrap framework v5.3 |
| **Fluent 2** | fluent2.css | fluent2-dark.css | Microsoft Fluent Design v2 |
| **Material 3** | material3.css | material3-dark.css | Google Material Design v3 |
| **Bootstrap 5** | bootstrap5.css | bootstrap5-dark.css | Bootstrap framework v5.0 |
| **Bootstrap 4** | bootstrap4.css | - | Bootstrap framework v4.0 |
| **Bootstrap 3** | bootstrap.css | bootstrap-dark.css | Bootstrap framework v3.0 |
| **Material** | material.css | material-dark.css | Google Material Design v1 |
| **Tailwind CSS** | tailwind.css | tailwind-dark.css | Earlier Tailwind version |
| **Fluent** | fluent.css | fluent-dark.css | Microsoft Fluent Design v1 |
| **Microsoft Office Fabric** | fabric.css | fabric-dark.css | Office UI Fabric |
| **High Contrast** | highcontrast.css | - | High contrast for accessibility |

Each theme provides:
- Light and dark variants
- CSS variable support for customization
- Responsive design patterns
- Accessibility compliance (WCAG 2.1)
- Consistent visual language across all components

## Theme packages

Syncfusion built-in themes are distributed as theme packages available on npm. These packages include CSS/SCSS files for all components. The following table lists all available theme packages:


| Theme | Light Package | Dark Package |
|-------|---------------|---------------|
| Tailwind 3 | [`@syncfusion/ej2-tailwind3-theme`](https://www.npmjs.com/package/@syncfusion/ej2-tailwind3-theme) | [`@syncfusion/ej2-tailwind3-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-tailwind3-dark-theme) |
| Bootstrap 5.3 | [`@syncfusion/ej2-bootstrap5.3-theme`](https://www.npmjs.com/package/@syncfusion/ej2-bootstrap5.3-theme) | [`@syncfusion/ej2-bootstrap5.3-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-bootstrap5.3-dark-theme) |
| Fluent 2 | [`@syncfusion/ej2-fluent2-theme`](https://www.npmjs.com/package/@syncfusion/ej2-fluent2-theme) | [`@syncfusion/ej2-fluent2-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-fluent2-dark-theme) |
| Material 3 | [`@syncfusion/ej2-material3-theme`](https://www.npmjs.com/package/@syncfusion/ej2-material3-theme) | [`@syncfusion/ej2-material3-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-material3-dark-theme) |
| Bootstrap 5 | [`@syncfusion/ej2-bootstrap5-theme`](https://www.npmjs.com/package/@syncfusion/ej2-bootstrap5-theme) | [`@syncfusion/ej2-bootstrap5-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-bootstrap5-dark-theme) |
| Bootstrap 4 | [`@syncfusion/ej2-bootstrap4-theme`](https://www.npmjs.com/package/@syncfusion/ej2-bootstrap4-theme) | - |
| Bootstrap | [`@syncfusion/ej2-bootstrap-theme`](https://www.npmjs.com/package/@syncfusion/ej2-bootstrap-theme) | [`@syncfusion/ej2-bootstrap-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-bootstrap-dark-theme) |
| Material | [`@syncfusion/ej2-material-theme`](https://www.npmjs.com/package/@syncfusion/ej2-material-theme) | [`@syncfusion/ej2-material-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-material-dark-theme) |
| Tailwind | [`@syncfusion/ej2-tailwind-theme`](https://www.npmjs.com/package/@syncfusion/ej2-tailwind-theme) | [`@syncfusion/ej2-tailwind-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-tailwind-dark-theme) |
| Fluent | [`@syncfusion/ej2-fluent-theme`](https://www.npmjs.com/package/@syncfusion/ej2-fluent-theme) | [`@syncfusion/ej2-fluent-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-fluent-dark-theme) |
| Fabric | [`@syncfusion/ej2-fabric-theme`](https://www.npmjs.com/package/@syncfusion/ej2-fabric-theme) | [`@syncfusion/ej2-fabric-dark-theme`](https://www.npmjs.com/package/@syncfusion/ej2-fabric-dark-theme) |
| High Contrast | [`@syncfusion/ej2-highcontrast-theme`](https://www.npmjs.com/package/@syncfusion/ej2-highcontrast-theme) | - |

## Applying Themes via npm theme packages (Recommended)

Themes are shipped as both combined and individual CSS/SCSS files.

### Individual Theme Packages

Each theme has its own package — install only the theme you need:

```bash
# Pick one theme package only
npm install @syncfusion/ej2-tailwind3-theme
npm install @syncfusion/ej2-bootstrap5-theme
npm install @syncfusion/ej2-material3-theme
npm install @syncfusion/ej2-fluent2-theme
```

| Framework | Syncfusion Theme | Package Name | Import Statement |
|-----------|------------------|--------------|-------------------|
| **Tailwind** | Tailwind3 | `@syncfusion/ej2-tailwind3-theme` | `import '@syncfusion/ej2-tailwind3-theme/styles/tailwind3.css'` |
| **Bootstrap** | Bootstrap5.3 | `@syncfusion/ej2-bootstrap5.3-theme` | `import '@syncfusion/ej2-bootstrap5.3-theme/styles/bootstrap5.3.css'` |
| **Material** | Material3 | `@syncfusion/ej2-material3-theme` | `import '@syncfusion/ej2-material3-theme/styles/material3.css'` |
| **Fluent** | Fluent2 | `@syncfusion/ej2-fluent2-theme` | `import '@syncfusion/ej2-fluent2-theme/styles/fluent2.css'` |

Import at your app entry point (before components render) to ensure consistent styling.

### All Components (Combined)

**Step 1: Install the specific theme package**

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

**Step 2: Import theme CSS**

```css
/* src/App.css */
@import "@syncfusion/ej2-tailwind3-theme/styles/tailwind3.css";
```

Or import SCSS for variable access:

```scss
/* src/App.scss */
@use "@syncfusion/ej2-tailwind3-theme/styles/tailwind3.scss" as *;
```

**Available themes packages: refer to the [theme-packages](#theme-packages) section**

## Applying Themes via CDN

> **⚠️ Important:** The CDN version MUST match your installed npm package version to avoid style and rendering issues. Using npm imports is recommended as it automatically keeps CSS and JavaScript versions in sync.

### Find Your Installed Version

Before using CDN links, check your installed package version:

```bash
npm list @syncfusion/ej2-react-grids
```

Or check package.json:

```json
{
  "dependencies": {
    "@syncfusion/ej2-react-grids": "33.1.44"  // Your version
  }
}
```

### Usage

```html
<!-- index.html -->
<head>
  <!-- Replace {VERSION} with your installed package version -->
  <link href="https://cdn.syncfusion.com/ej2/{VERSION}/{theme_name}.css" rel="stylesheet"/>
</head>
```

### Available CDN Links

Replace `{VERSION}` with your installed version (e.g., 27.2.2, 28.1.33, 33.1.44):

| Theme | CDN Link Pattern |
|-------|------------------|
| Tailwind 3.4 | https://cdn.syncfusion.com/ej2/{VERSION}/tailwind3.css |
| Tailwind 3.4 Dark | https://cdn.syncfusion.com/ej2/{VERSION}/tailwind3-dark.css |
| Bootstrap 5.3 | https://cdn.syncfusion.com/ej2/{VERSION}/bootstrap5.3.css |
| Bootstrap 5.3 Dark | https://cdn.syncfusion.com/ej2/{VERSION}/bootstrap5.3-dark.css |
| Fluent 2 | https://cdn.syncfusion.com/ej2/{VERSION}/fluent2.css |
| Fluent 2 Dark | https://cdn.syncfusion.com/ej2/{VERSION}/fluent2-dark.css |
| Material 3 | https://cdn.syncfusion.com/ej2/{VERSION}/material3.css |
| Material 3 Dark | https://cdn.syncfusion.com/ej2/{VERSION}/material3-dark.css |

**Example:** If your package version is `33.1.44`:

```html
<link href="https://cdn.syncfusion.com/ej2/33.1.44/tailwind3.css" rel="stylesheet"/>
```

## Individual Component Themes

For smallest bundle size, import only the component themes you need.

### Individual component styles from theme packages

```css
/* src/App.css */
@import "@syncfusion/ej2-tailwind3-theme/styles/grid/index.css";
```

Or import SCSS for variable access:

```scss
/* src/App.scss */
@use "@syncfusion/ej2-tailwind3-theme/styles/grid/index.scss" as *;
```

## Optimized (Lite) CSS Files

Syncfusion provides **optimized (lite)** theme variants that exclude "bigger" size mode styles, reducing file size by approximately 25%.

### File Size Comparison

| Theme | Default Size | Lite Size | Reduction |
|-------|-------------|-----------|-----------|
| Fluent 2 | 3.97 MB | 2.96 MB | ~25% |
| Tailwind 3.4 | 3.85 MB | 2.88 MB | ~25% |
| Material 3 | 3.92 MB | 2.94 MB | ~25% |

### Using Lite Versions

**All components (combined):**

```css
/* src/App.css */
@import "@syncfusion/ej2-tailwind3-theme/styles/tailwind3-lite.css";
```

Or SCSS:

```css
/* src/App.scss */
@use "@syncfusion/ej2-tailwind3-theme/styles/tailwind3-lite.scss" as *;
```

**Individual components:**

```css
@import "@syncfusion/ej2-tailwind3-theme/styles/button/index-lite.css";
```

Or SCSS:

```css
/* src/App.scss */
@use "@syncfusion/ej2-tailwind3-theme/styles/button/index-lite.scss" as *;
```

**CDN:**

```html
<!-- Replace {VERSION} with your installed package version -->
<link href="https://cdn.syncfusion.com/ej2/{VERSION}/tailwind3-lite.css" rel="stylesheet"/>

<!-- Example: If your version is 33.1.44 -->
<link href="https://cdn.syncfusion.com/ej2/33.1.44/tailwind3-lite.css" rel="stylesheet"/>
```

> **Note:** Check your installed version with `npm list @syncfusion/ej2-react-buttons` before using CDN links.
