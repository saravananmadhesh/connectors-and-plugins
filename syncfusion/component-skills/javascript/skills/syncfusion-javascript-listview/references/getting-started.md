# Getting Started with ListView

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Implementation](#basic-implementation)
- [TypeScript Setup](#typescript-setup)
- [First Example](#first-example)
- [Common Setup Issues](#common-setup-issues)

## Installation

### NPM Installation

Install the Syncfusion ej2 lists package:

```bash
npm install @syncfusion/ej2-lists
```

Or install the complete ej2 package:

```bash
npm install @syncfusion/ej2
```

### Yarn Installation

```bash
yarn add @syncfusion/ej2-lists
```

### For Angular Projects

```bash
ng add @syncfusion/ej2-angular-lists
```

## CSS Imports

### Import CSS in Your Project

For TypeScript/JavaScript projects, import the theme CSS:

```typescript
// Material theme (default)
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/list-view/index.css";

// Or use other themes:
// import '@syncfusion/ej2-base/styles/fluent2.css';
// import '@syncfusion/ej2-lists/styles/fluent2.css';

// import '@syncfusion/ej2-base/styles/bootstrap.css';
// import '@syncfusion/ej2-lists/styles/bootstrap.css';

// import '@syncfusion/ej2-base/styles/fabric.css';
// import '@syncfusion/ej2-lists/styles/fabric.css';
```

### Available Themes

- `material.css` - Material Design (Default)
- `fluent2.css` - Microsoft Fluent 2 (Recommended)
- `bootstrap.css` - Bootstrap Theme
- `fabric.css` - Office Fabric Theme
- `tailwind.css` - Tailwind CSS Theme
- `bootstrap5.css` - Bootstrap 5 Theme

### For HTML Projects

```html
<!DOCTYPE html>
<html>
<head>
    <link href="node_modules/@syncfusion/ej2-base/styles/material.css" rel="stylesheet" />
    <link href="node_modules/@syncfusion/ej2-lists/styles/material.css" rel="stylesheet" />
</head>
<body>
    <div id="element"></div>
</body>
</html>
```

## Basic Implementation

### HTML Structure

Create a target element for the ListView:

```html
<div id="listview-container"></div>
```

### TypeScript Setup

Create a component/class to initialize ListView:

```typescript
import { ListView } from '@syncfusion/ej2-lists';

// Create ListView instance
const listView = new ListView();

// Append to element
listView.appendTo('#listview-container');
```

### Minimal Configuration

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const listView = new ListView({
    // Minimal configuration
    dataSource: ['Item 1', 'Item 2', 'Item 3']
});

listView.appendTo('#listview-container');
```

## TypeScript Setup

### Project Configuration (tsconfig.json)

Ensure your TypeScript config includes proper module resolution:

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "lib": ["ES2015", "DOM"],
    "moduleResolution": "node",
    "declaration": true,
    "outDir": "./dist",
    "strict": true
  }
}
```

### Import Styles

```typescript
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import { ListView } from '@syncfusion/ej2-lists';
```

### Create Component Class

```typescript
export class ListViewDemo {
    public listView: ListView;

    public create(): void {
        this.listView = new ListView({
            dataSource: ['Item 1', 'Item 2', 'Item 3']
        });
        this.listView.appendTo('#listview-container');
    }
}

// Initialize
const demo = new ListViewDemo();
demo.create();
```

## First Example

### Simple String Array

Display a simple list from string array:

```typescript
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import { ListView } from '@syncfusion/ej2-lists';

const stringData = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];

const listView = new ListView({
    dataSource: stringData
});

listView.appendTo('#listview-container');
```

### Object Array with Fields

Display list from object array with mapping:

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const itemData = [
    { id: '1', text: 'Badminton' },
    { id: '2', text: 'Basketball' },
    { id: '3', text: 'Cricket' },
    { id: '4', text: 'Football' }
];

const listView = new ListView({
    dataSource: itemData,
    fields: {
        id: 'id',
        text: 'text'
    }
});

listView.appendTo('#listview-container');
```

### With Header

```typescript
const listView = new ListView({
    dataSource: itemData,
    fields: { id: 'id', text: 'text' },
    showHeader: true,
    headerTitle: 'Sports'
});

listView.appendTo('#listview-container');
```

### With Selection Handler

```typescript
const listView = new ListView({
    dataSource: itemData,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        console.log('Selected:', args.data);
    }
});

listView.appendTo('#listview-container');
```

## Complete HTML Example

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ListView Getting Started</title>
    
    <!-- Import Syncfusion styles -->
    <link href="node_modules/@syncfusion/ej2-base/styles/material.css" rel="stylesheet" />
    <link href="node_modules/@syncfusion/ej2-lists/styles/material.css" rel="stylesheet" />
    
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        #listview-container {
            max-width: 400px;
            margin: 0 auto;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h2>My Sports List</h2>
    <div id="listview-container"></div>

    <script type="module">
        import { ListView } from './node_modules/@syncfusion/ej2-lists/index.js';

        const data = [
            { id: '1', text: 'Badminton' },
            { id: '2', text: 'Basketball' },
            { id: '3', text: 'Cricket' },
            { id: '4', text: 'Football' }
        ];

        const listView = new ListView({
            dataSource: data,
            fields: { id: 'id', text: 'text' }
        });

        listView.appendTo('#listview-container');
    </script>
</body>
</html>
```

## Common Setup Issues

### Issue: Styles not applied

**Solution**: Ensure CSS is imported BEFORE component initialization:

```typescript
// ✅ Correct order
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import { ListView } from '@syncfusion/ej2-lists';

// ❌ Wrong - styles imported after component
import { ListView } from '@syncfusion/ej2-lists';
import '@syncfusion/ej2-base/styles/material.css';
```

### Issue: Module not found

**Solution**: Verify package installation:

```bash
npm list @syncfusion/ej2-lists
npm list @syncfusion/ej2-base
npm list @syncfusion/ej2-data
```

### Issue: Element not found

**Solution**: Ensure target element exists before initialization:

```typescript
// ✅ Correct - element exists
const element = document.getElementById('listview-container');
if (element) {
    const listView = new ListView({ dataSource: data });
    listView.appendTo('#listview-container');
}

// ❌ Wrong - element might not exist yet
window.addEventListener('DOMContentLoaded', () => {
    const listView = new ListView({ dataSource: data });
    listView.appendTo('#listview-container');
});
```

### Issue: TypeScript compilation errors

**Solution**: Ensure types are available:

```bash
npm install --save-dev @types/syncfusion__ej2-lists
```

Or update tsconfig to skip strict type checking:

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "noImplicitAny": false
  }
}
```

## Next Steps

After setting up ListView:
1. **Explore Data Binding** - Connect to APIs or local data
2. **Customize Appearance** - Apply templates and styling
3. **Add Interactivity** - Implement selection and events
4. **Build Advanced Features** - Virtualization, grouping, filtering

See the main SKILL.md for references to other topics.
