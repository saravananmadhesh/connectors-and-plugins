# Getting Started with Diagram

## Overview

This guide covers the initial setup for implementing Syncfusion Diagram in your TypeScript/JavaScript project using webpack.

## Installation & Setup

### Step 1: Clone the Quickstart Project

Start with the official Syncfusion quickstart repository:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
```

### Step 2: Install Dependencies

Install npm packages:

```bash
npm install
```

This installs base dependencies including webpack and Syncfusion packages.

### Step 3: Add Diagram Package

Install the Diagram component:

```bash
npm install @syncfusion/ej2-diagrams --save
```

**Dependency Tree:**
```
@syncfusion/ej2-diagrams
├── @syncfusion/ej2-base          (Core functionality)
├── @syncfusion/ej2-data          (Data binding)
├── @syncfusion/ej2-navigations   (Navigation components)
├── @syncfusion/ej2-inputs        (Input controls)
├── @syncfusion/ej2-popups        (Popup dialogs)
├── @syncfusion/ej2-buttons       (Button components)
└── @syncfusion/ej2-lists         (List controls)
```

### Step 4: Import CSS Styles

The Diagram component needs Syncfusion® theme styles to display correctly. Syncfusion® theme packages include ready-to-use styles for supported control.

To add the styles, install the Tailwind 3 theme package using the following command:

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

Edit `src/styles/styles.css` and add Diagram styles:

```css
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
```

For the list of available themes, refer to the [Themes](https://ej2.syncfusion.com/documentation/appearance/theme) documentation.

N> Syncfusion® provides multiple built-in themes. If the application uses a different theme, replace **@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css** with the corresponding stylesheet from the desired theme package. For example, to use the Material 3 theme, import **@syncfusion/ej2-material3-theme/styles/diagram/index.css**.

### Step 5: Create HTML Container

In your HTML file (e.g., `src/app/index.html`), create a container:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Syncfusion Diagram</title>
</head>
<body>
    <!-- Diagram container -->
    <div id="diagram-container"></div>
    
    <!-- Scripts will be injected by webpack -->
</body>
</html>
```

## Creating Your First Diagram

### Basic Implementation

Create `src/app/diagram.ts`:

```ts
import { Diagram, NodeModel, ConnectorModel } from '@syncfusion/ej2-diagrams';

// Step 1: Define nodes (shapes in the diagram)
let nodes: NodeModel[] = [
  {
    id: 'node1',
    offsetX: 250,
    offsetY: 250,
    width: 100,
    height: 100,
    style: {
      fill: '#6BA5D7',
      strokeColor: 'white'
    },
    annotations: [{ content: 'Start' }]
  },
  {
    id: 'node2',
    offsetX: 400,
    offsetY: 250,
    width: 100,
    height: 100,
    style: {
      fill: '#FFD700',
      strokeColor: 'white'
    },
    annotations: [{ content: 'End' }]
  }
];

// Step 2: Define connectors (lines between nodes)
let connectors: ConnectorModel[] = [
  {
    id: 'connector1',
    sourceID: 'node1',
    targetID: 'node2',
    style: {
      strokeColor: '#6BA5D7',
      strokeWidth: 2
    },
    targetDecorator: {
      shape: 'Arrow',
      style: { fill: '#6BA5D7' }
    }
  }
];

// Step 3: Create and initialize diagram
let diagram: Diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: nodes,
  connectors: connectors
});

// Step 4: Render diagram in container
diagram.appendTo('#diagram-container');
```

### Import in Main File

In `src/app/main.ts`:

```ts
import './styles/styles.css';
import './diagram';
```

### Run Development Server

```bash
npm start
```

## Module Injection

Some Diagram features require explicit module injection:

```ts
import { 
  Diagram, 
  HierarchicalTree,      // For hierarchical layout
  DataBinding,           // For data binding
  LayoutAnimation        // For layout animations
} from '@syncfusion/ej2-diagrams';

// Inject modules before creating diagram
Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);

let diagram = new Diagram({
  // Now dataSource and layout features are available
});
```

**Common Modules:**
- `DataBinding` - Load diagram from data source
- `HierarchicalTree` - Hierarchical tree layout
- `LayoutAnimation` - Animation during layout changes
- `ConnectorBridging` - Visual connectors that bridge over each other
- `LineRouting` - Automatically routes connectors around the node

## Minimal Complete Example

**File: `src/app/minimal-diagram.ts`**

```ts
import { Diagram } from '@syncfusion/ej2-diagrams';

// Create diagram with minimal configuration
let diagram = new Diagram({
  width: '100%',
  height: '500px',
  nodes: [
    { id: 'node1', offsetX: 250, offsetY: 250, width: 100, height: 100 }
  ]
});

diagram.appendTo('#diagram-container');
```

**Result:** A single rectangle node on a canvas.

## Common Setup Issues

### Issue: Styles Not Applied
**Solution:** Ensure CSS imports are in `src/styles/styles.css` before other styles, and the file is imported in your main file.

```ts
import './styles/styles.css'; // Must be first
```

### Issue: Diagram Not Rendering
**Solution:** Verify the container element exists and diagram is appended to correct ID:

```ts
diagram.appendTo('#diagram-container'); // Must match HTML element ID
```

### Issue: Module Not Found Errors
**Solution:** Inject required modules before creating diagram:

```ts
Diagram.Inject(DataBinding, HierarchicalTree);
```

### Issue: Diagram Too Small or Invisible
**Solution:** Set explicit dimensions:

```ts
let diagram = new Diagram({
  width: '100%',      // or '800px'
  height: '600px',    // explicit height required
  // ...
});
```

## Next Steps

- **Add More Nodes:** [references/nodes-and-shapes.md](nodes-and-shapes.md)
- **Create Connectors:** [references/connectors-and-connections.md](connectors-and-connections.md)
- **Load Data:** [references/data-binding-and-loading.md](data-binding-and-loading.md)
- **Apply Layout:** [references/layout-and-automation.md](layout-and-automation.md)
- **Customize Styles:** [references/styling-and-appearance.md](styling-and-appearance.md)
