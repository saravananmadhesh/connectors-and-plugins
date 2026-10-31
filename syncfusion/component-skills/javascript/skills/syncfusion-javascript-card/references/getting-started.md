# Getting Started with Syncfusion Card Component

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [CSS Imports](#css-imports)
- [Basic Card Markup](#basic-card-markup)
- [First Render and Initialization](#first-render-and-initialization)
- [Development Environment Setup](#development-environment-setup)
- [Basic Card Variations](#basic-card-variations)
- [Common Setup Issues](#common-setup-issues)
- [Next Steps](#next-steps)

## Installation and Setup

### Prerequisites
- Node.js v14.15.0 or higher
- npm or yarn package manager
- Webpack for bundling (recommended)

### Package Installation

The Card component is part of the `@syncfusion/ej2-layouts` package. Install it using npm:

```bash
npm install @syncfusion/ej2-layouts
```

Or install the entire Syncfusion Essential JS 2 package:

```bash
npm install @syncfusion/ej2
```

### Dependencies

The Card component has no external JavaScript dependencies—it's a pure CSS component:

```
@syncfusion/ej2-layouts (contains CSS styles)
```

---

## CSS Imports

### Basic Theme Import

Add the Syncfusion CSS theme to your `styles.css` file:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/card/index.css";
```

### Available Themes

Syncfusion provides multiple themes. Replace `fluent2.css` with your preferred theme:
- `fluent2.css` - Modern Fluent design
- `material.css` - Material Design
- `material3.css` - Material Design 3
- `bootstrap5.css` - Bootstrap 5 theme
- `tailwind.css` - Tailwind CSS theme

Example with Material theme:
```css
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
```

---

## Basic Card Markup

### Minimal Example

Create a simple card with just content:

```html
<div class="e-card">
    Sample Card
</div>
```

### Card with HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Syncfusion Card Example</title>
    <link href="url" rel="stylesheet">
    <style>
        body {
            margin: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .e-card {
            max-width: 400px;
            flex: 1 1 300px;
        }
    </style>
</head>
<body>
    <div class="card-container">
        <!-- Card element -->
        <div class="e-card">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-header-title">Card Title</div>
                </div>
            </div>
            <div class="e-card-content">
                This is the card content area where you can place text, images, or other HTML elements.
            </div>
        </div>
    </div>
</body>
</html>
```

---

## First Render and Initialization

### HTML Setup

Since the Card is a pure CSS component, no JavaScript initialization is required. Simply add the HTML structure with appropriate classes:

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Getting Started</div>
        </div>
    </div>
    <div class="e-card-content">
        The Card is ready to use with just HTML markup!
    </div>
</div>
```

### TypeScript Example (ES5-Getting-Started)

For projects using TypeScript or requiring additional scripts:

```typescript
// No initialization needed for Card component
// The component renders purely through CSS classes

// However, you can add interactivity if needed:
document.addEventListener('DOMContentLoaded', () => {
    const cardElement = document.querySelector('.e-card');
    
    // You can add event listeners or additional styling
    cardElement.addEventListener('click', () => {
        console.log('Card clicked');
    });
});
```

### Running the Application

If using a webpack development environment:

```bash
npm start
```

This starts the development server, typically at `http://localhost:3000`.

---

## Development Environment Setup

### Webpack Configuration Example

For a typical webpack setup:

```javascript
// webpack.config.js
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
```

### Project Structure

Typical project structure for Card components:

```
project-root/
├── src/
│   ├── index.html
│   ├── index.css
│   ├── index.ts
│   └── styles/
│       └── styles.css
├── webpack.config.js
├── package.json
└── tsconfig.json
```

---

## Basic Card Variations

### Card with Title Only

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">My Card Title</div>
        </div>
    </div>
</div>
```

### Card with Content Only

```html
<div class="e-card">
    <div class="e-card-content">
        This card contains only content without a header.
    </div>
</div>
```

### Card with Multiple Content Sections

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Multi-Section Card</div>
        </div>
    </div>
    <div class="e-card-content">
        First section of content
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
        Second section of content
    </div>
</div>
```

---

## Common Setup Issues

### Issue: Styles not applying
**Solution**: Ensure CSS is imported before HTML elements are rendered:
```css
@import '@syncfusion/ej2-base/styles/fluent2.css';
@import '@syncfusion/ej2-layouts/styles/fluent2.css';
```

### Issue: Card appears unstyled
**Solution**: Verify the theme CSS file exists in node_modules and the path is correct.

### Issue: Build errors with webpack
**Solution**: Ensure `css-loader` and `style-loader` are installed and configured:
```bash
npm install --save-dev css-loader style-loader
```

---

## Next Steps

Now that you have the basic setup, you can:
1. **Add Headers**: See [Header and Content](../references/header-and-content.md) to add titles and subtitles
2. **Include Images**: Check [Card Layouts and Images](../references/card-layout.md) for image integration
3. **Add Buttons**: Learn about action buttons in [Action Buttons](../references/action-buttons.md)
4. **Customize Styling**: Use [Customization and Styling](../references/customization-and-styling.md) for custom designs
