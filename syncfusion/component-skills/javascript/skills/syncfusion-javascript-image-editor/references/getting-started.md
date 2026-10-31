# Getting Started with Image Editor

## Table of Contents
- [Installation](#installation)
- [TypeScript Setup](#typescript-setup)
- [CSS Themes](#css-themes)
- [Basic Initialization](#basic-initialization)
- [HTML Structure](#html-structure)
- [Common Issues](#common-issues)

## Installation

### Using NPM

The Image Editor component requires several Syncfusion packages. Install using npm:

```bash
npm install @syncfusion/ej2-image-editor
```

### Package Dependencies

The Image Editor automatically includes the following required dependencies:

```
@syncfusion/ej2-image-editor
├── @syncfusion/ej2-base              (Core utilities)
├── @syncfusion/ej2-buttons           (Button components)
├── @syncfusion/ej2-dropdowns         (Dropdown lists)
├── @syncfusion/ej2-inputs            (Input controls)
├── @syncfusion/ej2-navigations       (Navigation items)
├── @syncfusion/ej2-popups            (Dialog/tooltip)
└── @syncfusion/ej2-splitbuttons      (Split button)
```

These are automatically installed as peer dependencies. Ensure your `package.json` includes all these packages or they're installed in your node_modules.

## TypeScript Setup

### Webpack Configuration

The Image Editor requires webpack for module bundling. The typical setup includes:

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
    port: 8080,
    hot: true
  }
};
```

### TypeScript Configuration

Ensure your `tsconfig.json` includes proper module and target settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Project Setup Steps

1. **Clone or create a TypeScript project:**
   ```bash
   git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack-
   cd ej2-quickstart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify webpack installation:**
   ```bash
   npm list webpack webpack-cli ts-loader
   ```

4. **Create source directory structure:**
   ```
   src/
   ├── app.ts
   ├── index.html
   └── styles.css
   ```

## CSS Themes

### Importing Themes in Your Application

The Image Editor requires CSS theme imports. Add these to your entry CSS file or directly in webpack configuration:

```css
/* src/styles/styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/image-editor/index.css";
```

### Available Themes

Syncfusion provides multiple built-in themes:

| Theme | CSS File | Best For |
|-------|----------|----------|
| Material | `material.css` | Modern, Google Material Design |
| Bootstrap 5 | `bootstrap5.css` | Bootstrap projects |
| Bootstrap 4 | `bootstrap4.css` | Bootstrap 4 projects |
| Fabric | `fabric.css` | Microsoft Office-like UI |
| Tailwind | `tailwind.css` | Tailwind CSS projects |
| Fluent | `fluent.css` | Microsoft Fluent Design |

### Dark Theme Variants

All themes have dark variants by adding `-dark` suffix:

```css
@import "@syncfusion/ej2-image-editor/styles/material-dark.css";
```

### Theme Configuration in Code

Set theme programmatically:

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    theme: 'material' // or 'bootstrap5', 'fabric', etc.
});
```

## Basic Initialization

### Creating an ImageEditor Instance

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

// Create instance with configuration
const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    toolbar: ['Open', 'Save', 'ZoomIn', 'ZoomOut', 'Crop', 'Rotate', 'Flip'],
    created: () => {
        console.log('Image Editor created successfully');
    }
});

// Append to DOM container with selector
imageEditor.appendTo('#imageeditor');
```

### Configuration Options for Initialization

```typescript
new ImageEditor({
    width: '600px',                    // Editor width (pixels or percentage)
    height: '400px',                   // Editor height
    toolbar: [...],                    // Array of toolbar items; null = default, [] = hidden
    theme: 'Bootstrap5',               // Theme name (e.g. Theme.Bootstrap5)
    locale: 'en-US',                   // Localization
    allowUndoRedo: true,               // Enable undo/redo
    disabled: false,                   // Disable the component
    imageSmoothingEnabled: false,      // High-quality image smoothing
    created: () => {},                 // Lifecycle: component created
    fileOpened: (args) => {},          // Lifecycle: image opened
    beforeSave: (args) => {},          // Lifecycle: before save
    saved: (args) => {},               // Lifecycle: after save
    destroyed: () => {}                // Lifecycle: component destroyed
});
```

### Toolbar Configuration

Configure which tools appear in the toolbar:

```typescript
const imageEditor = new ImageEditor({
    toolbar: [
        'Open',           // Open image
        'Save',           // Save image
        'ZoomIn',         // Zoom in
        'ZoomOut',        // Zoom out
        'Crop',           // Crop tool
        'Rotate',         // Rotate options
        'Flip',           // Flip options
        'Undo',           // Undo
        'Redo',           // Redo
        'Reset',          // Reset to original
        'Annotation',     // Text annotation
        'ShapeAnnotation',// Shape annotation
        'FreehandDraw',   // Freehand drawing
        'Filter',         // Filter effects
        'FineTune'        // Fine-tuning
    ]
});
```

## HTML Structure

### Basic HTML Setup

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Image Editor</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <!-- Container for Image Editor -->
    <div id="imageeditor"></div>
    
    <script src="dist/bundle.js"></script>
</body>
</html>
```

### With Additional Controls

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Image Editor App</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <div class="container">
        <h1>Image Editor</h1>
        
        <!-- Buttons for actions -->
        <div class="controls">
            <button id="openBtn">Open Image</button>
            <button id="saveBtn">Save Image</button>
            <button id="resetBtn">Reset</button>
        </div>
        
        <!-- Image Editor container -->
        <div id="imageeditor"></div>
    </div>
    
    <script src="dist/bundle.js"></script>
</body>
</html>
```

### CSS Styling

```css
body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.container {
    max-width: 900px;
    margin: 0 auto;
}

.controls {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
}

button {
    padding: 10px 20px;
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #005a9e;
}

#imageeditor {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
}
```

## Opening an Image

### Programmatically Load Image

```typescript
// Load from URL
imageEditor.open('url');

// Load from local file path
imageEditor.open('url');
```

### On Application Startup

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Browser } from '@syncfusion/ej2-base';

const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    created: () => {
        // Load image after component is ready
        imageEditor.open('url');
    }
});

imageEditor.appendTo('#imageeditor');
```

### From File Input

```typescript
const fileInput = document.getElementById('fileInput') as HTMLInputElement;

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imageEditor.open(event.target.result as string);
        };
        reader.readAsDataURL(file);
    }
});
```

## Common Issues

### Issue: Styles Not Loading

**Problem:** Image Editor appears unstyled or broken layout

**Solution:**
1. Verify all required CSS files are imported in correct order
2. Import ej2-base styles FIRST before component styles
3. Ensure theme name is spelled correctly
4. Check browser console for CSS errors

```css
/* Correct order */
@import "@syncfusion/ej2-base/styles/material.css";         /* Base first */
@import "@syncfusion/ej2-image-editor/styles/material.css"; /* Then component */
```

### Issue: Component Not Rendering

**Problem:** Div is empty or shows nothing

**Solution:**
1. Verify container div exists with correct ID
2. Check that webpack bundle is loaded after DOM is ready
3. Ensure ImageEditor is imported correctly
4. Check browser console for JavaScript errors

```typescript
// Good: append() after DOM is ready
imageEditor.appendTo('#imageeditor');

// Verify element exists
if (document.getElementById('imageeditor')) {
    imageEditor.appendTo('#imageeditor');
}
```

### Issue: Toolbar Missing

**Problem:** Toolbar items don't appear

**Solution:**
1. Verify toolbar array is provided in config
2. Check that toolbar item names are correct
3. Ensure all dependency packages are installed

```typescript
const imageEditor = new ImageEditor({
    // MUST include toolbar property
    toolbar: ['Open', 'Save', 'ZoomIn', 'ZoomOut', 'Crop']
});
```

### Issue: Dependencies Not Found

**Problem:** Module not found errors during build

**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Verify all packages installed
npm list | grep @syncfusion/ej2
```

