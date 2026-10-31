# Getting Started with Syncfusion TypeScript Toolbar

## Table of Contents
- [Installation and Dependencies](#installation-and-dependencies)
- [Development Environment Setup](#development-environment-setup)
- [CSS Imports and Theme Setup](#css-imports-and-theme-setup)
- [Basic Toolbar Initialization](#basic-toolbar-initialization)
- [First Working Example](#first-working-example)
- [Webpack Configuration](#webpack-configuration)
- [Running Your Application](#running-your-application)

## Installation and Dependencies

The Syncfusion TypeScript Toolbar requires the following packages from the @syncfusion scope:

**Package Hierarchy:**
```
@syncfusion/ej2-navigations
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-buttons
  └── @syncfusion/ej2-popups
```

**Install via NPM:**
```bash
npm install @syncfusion/ej2-navigations
npm install @syncfusion/ej2-base
npm install @syncfusion/ej2-buttons
npm install @syncfusion/ej2-popups
```

Or install the complete Syncfusion package:
```bash
npm install @syncfusion/ej2
```

## Development Environment Setup

**Requirements:**
- Node v14.15.0 or higher
- npm or yarn package manager
- TypeScript support (webpack with ts-loader)

**Setup QuickStart Project:**

1. Clone the Syncfusion QuickStart repository from GitHub:
```bash
git clone url
```

2. Navigate to the project folder:
```bash
cd ej2-quickstart
```

3. Install dependencies:
```bash
npm install
```

The QuickStart project comes preconfigured with:
- webpack configuration (`webpack.config.js`)
- TypeScript compilation setup
- Latest webpack-cli integration
- All Syncfusion essential packages in `package.json`

## CSS Imports and Theme Setup

**Import Syncfusion CSS files into your styles:**

Add the following CSS imports to `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/toolbar/index.css";
```

**Theme Options:**

Available themes from Syncfusion:
- `fluent2.css` (default, modern design)
- `bootstrap5.css`
- `material.css`
- `highcontrast.css`

Replace `fluent2.css` with your preferred theme in all import statements above.

**CDN Alternative:**

If not using npm, you can reference CSS files via CDN:
```html
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
```

## Basic Toolbar Initialization

The **Toolbar** component is initialized by:

1. **Defining an array of items** - Each item represents a toolbar button, separator, or input component
2. **Creating a Toolbar instance** - Import Toolbar and pass the items configuration
3. **Appending to DOM** - Use `appendTo()` method to render the Toolbar in an HTML element

**Minimal Example:**

TypeScript (`app.ts`):
```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

// Initialize Toolbar with items array
let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' },
        { type: 'Separator' },
        { text: 'Bold' },
        { text: 'Italic' },
        { text: 'Underline' }
    ]
});

// Render to the DOM element with id 'element'
toolbar.appendTo('#element');
```

HTML (`index.html`):
```html
<div id="element"></div>
```

**Element ID:** The element must have an `id` attribute matching the selector passed to `appendTo()`.

## First Working Example

**Complete standalone example:**

HTML file (`index.html`):
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Syncfusion Toolbar Example</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="TypeScript Toolbar Control" />
    <meta name="author" content="Syncfusion" />
    
    <!-- Syncfusion CSS -->
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>

<body>
    <div style="margin: 50px;">
        <div id="element"></div>
    </div>
    
    <script src="app.js"></script>
</body>

</html>
```

TypeScript file (`app.ts`):
```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

// Create toolbar with basic buttons
let toolbarInstance: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' },
        { type: 'Separator' },
        { text: 'Bold' },
        { text: 'Italic' },
        { text: 'Underline' }
    ]
});

// Append toolbar to the container element
toolbarInstance.appendTo('#element');
```

**Output:** A horizontal toolbar with command buttons separated by a visual line.

## Webpack Configuration

The QuickStart project includes a pre-configured `webpack.config.js`:

**Key Configuration Features:**
- TypeScript loader (`ts-loader`) for .ts file compilation
- Entry point: `src/app.ts`
- Output: `dist/app.js`
- Development server with hot reload enabled
- Source maps for debugging

**Typical webpack.config.js structure:**
```javascript
module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: 'app.js',
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
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        port: 3000,
        hot: true
    }
};
```

For more information about webpack, see the [webpack documentation](url).

## Running Your Application

**Development Server:**

Run the application with hot reload:
```bash
npm start
```

This command:
- Starts a webpack development server (typically on `http://localhost:3000`)
- Watches for file changes
- Automatically recompiles TypeScript
- Refreshes the browser on code changes

**Build for Production:**

```bash
npm run build
```

This creates optimized output files in the `dist/` folder.

**View in Browser:**

The toolbar will be visible as a horizontal bar with command buttons, ready for interaction.

---

## Quick Checklist

- [ ] Node v14.15.0+ installed
- [ ] Syncfusion packages installed (`npm install`)
- [ ] CSS imports configured in styles
- [ ] Toolbar component imported from `@syncfusion/ej2-navigations`
- [ ] Toolbar items array defined with text properties
- [ ] `appendTo('#element')` targets correct HTML element ID
- [ ] Development server running (`npm start`)
- [ ] Toolbar visible in browser
