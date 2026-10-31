# Getting Started with Syncfusion TypeScript Splitter

## Table of Contents
- [Dependencies](#dependencies)
- [Installation via NPM](#installation-via-npm)
- [Add CSS Styles](#add-css-styles)
- [Basic Initialization](#basic-initialization)
- [Basic HTML Markup Example](#basic-html-markup-example)

---

## Dependencies

The Splitter control requires these Syncfusion packages:

```
@syncfusion/ej2-layouts
  └── @syncfusion/ej2-base
```

## Installation via NPM

### Step 1: Clone the Quickstart Project

```bash
git clone url
cd ej2-quickstart
```

### Step 2: Install Dependencies

```bash
npm install
```

The `package.json` in the quickstart is pre-configured with the `@syncfusion/ej2` package, which includes all Syncfusion controls.

**Note:** You can install individual packages like `@syncfusion/ej2-layouts` instead of the full `@syncfusion/ej2` suite if needed.

## Add CSS Styles

The Splitter CSS files are available in the `@syncfusion/ej2-layouts` package. Import the theme CSS in your `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/splitter/index.css";
```

**Available Themes:**
- `fluent2.css` - Fluent Design theme (recommended)
- Other themes available in the styles folder

**Tip:** Use the [Custom Resource Generator (CRG)](url) to generate custom scripts and styles for specific controls.

## Basic Initialization

### Step 1: Add HTML Container

Create a `<div>` element with child `<div>` elements for each pane in your `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Essential JS 2 Splitter Control</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Syncfusion Splitter Control" />
</head>

<body>
    <div id="container">
        <!-- Element that will render as Splitter -->
        <div id="splitter">
            <!-- Each child div becomes a pane -->
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</body>

</html>
```

### Step 2: Initialize Splitter in TypeScript

Create or update your TypeScript file (e.g., `src/index.ts`):

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Initialize Splitter control
let splitObject: Splitter = new Splitter({
    height: '250px',
    width: '600px',
    paneSettings: [
        { size: '200px' },
        { size: '200px' },
        { size: '200px' }
    ]
});

// Render to the target element
splitObject.appendTo('#splitter');
```

## Basic HTML Markup Example

The Splitter can be initialized using child `<div>` elements:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Essential JS 2 Splitter</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>

<body>
    <div id="container">
        <div id="splitter">
            <div>
                <div class="content">
                    <h3>Grid</h3>
                    <p>The ASP.NET DataGrid control is a feature-rich control used to display data in tabular format.</p>
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>Schedule</h3>
                    <p>The ASP.NET Scheduler facilitates calendar features for efficient time management.</p>
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>Chart</h3>
                    <p>ASP.NET charts provide beautiful charting capabilities for web and mobile applications.</p>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```

## Environment Setup

### Requirements
- Node.js v14.15.0 or higher
- npm (Node Package Manager)
- A code editor (VS Code recommended)

### Build and Run

```bash
# Build the project
npm run build

# Start the development server
npm start
```

The application will be available at `http://localhost:8080/` (or the configured port).

## Troubleshooting Common Issues

### Issue: Splitter not rendering
- Ensure the target element `#splitter` exists in the DOM
- Verify `appendTo('#splitter')` is called after element creation
- Check that CSS imports are included in your styles file

### Issue: CSS not applying
- Verify the CSS import paths in `styles.css` match your node_modules structure
- Check browser DevTools to confirm CSS files are loaded
- Clear browser cache and rebuild if needed

### Issue: TypeScript errors
- Ensure `@syncfusion/ej2-layouts` is installed: `npm install @syncfusion/ej2-layouts`
- Check TypeScript compiler configuration in `tsconfig.json`
- Verify import statement matches exact package name

## Next Steps

- **Configure panes:** Read about sizing, min/max, and fixed panes
- **Choose orientation:** Learn about horizontal vs vertical layouts
- **Add content:** Populate panes with HTML markup or text
- **Enable interactions:** Add collapse/expand, resizing, and event handlers
