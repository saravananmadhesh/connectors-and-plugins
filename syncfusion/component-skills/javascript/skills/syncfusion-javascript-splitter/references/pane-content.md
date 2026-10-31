# Pane Content in Syncfusion TypeScript Splitter

## Table of Contents
- [HTML Markup Content](#html-markup-content)
- [Content Property](#content-property)
- [Inner HTML from DOM](#inner-html-from-dom)
- [Text Content](#text-content)
- [Dynamic Content Loading](#dynamic-content-loading)
- [Practical Examples](#practical-examples)

## HTML Markup Content

The Splitter is a layout container that wraps existing HTML elements. Child elements become pane content automatically.

### Basic HTML Markup Setup

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Splitter with HTML Content</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>

<body>
    <div id="container">
        <div id="splitter">
            <!-- Each child becomes a pane with HTML content -->
            <div>
                <div class="content">
                    <h3>Grid Component</h3>
                    <p>The DataGrid control displays data in a tabular format with sorting, filtering, and more.</p>
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>Scheduler Component</h3>
                    <p>The Scheduler facilitates calendar features and time management for your application.</p>
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>Chart Component</h3>
                    <p>Charts provide beautiful data visualization for analytics and reporting.</p>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```

### Converting Existing HTML to Panes

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Existing HTML elements become panes automatically
let splitObj: Splitter = new Splitter({
    height: '200px',
    width: '600px'
});
splitObj.appendTo('#splitter');
```

The HTML structure above automatically creates three panes with the content from the child `<div>` elements.

---

## Content Property

Use the `content` property in `paneSettings` to define pane content as HTML strings:

### Content Property Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '200px',
    width: '600px',
    paneSettings: [
        {
            size: '200px',
            content: '<div class="content"><h3>PARIS</h3>Paris, the city of lights and love...</div>'
        },
        {
            size: '200px',
            content: '<div class="content"><h3>CAMEMBERT</h3>The village in Normandy where the famous French cheese originated...</div>'
        },
        {
            size: '200px',
            content: '<div class="content"><h3>GRENOBLE</h3>Capital of the French Alps and host of Winter Olympics 1968...</div>'
        }
    ]
});
splitObj.appendTo('#splitter');
```

### Multi-Line HTML Content

```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    width: '100%',
    paneSettings: [
        {
            size: '30%',
            content: `
                <div class="sidebar">
                    <h2>Navigation</h2>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            `
        },
        {
            size: '70%',
            content: `
                <div class="main-content">
                    <h1>Welcome</h1>
                    <p>This is the main content area.</p>
                    <button class="e-btn">Click Me</button>
                </div>
            `
        }
    ]
});
splitObj.appendTo('#splitter');
```

---

## Inner HTML from DOM

Use the child element's inherent HTML as pane content:

### Preserving Inner HTML

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Splitter with Inner HTML</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>

<body>
    <div id="container">
        <!-- Splitter wraps this HTML structure -->
        <div id="splitter">
            <!-- Pane 1: Inner HTML preserved -->
            <div>
                <div class="content">
                    <h3>Java</h3>
                    <p>Java is a general-purpose, object-oriented programming language.</p>
                    <ul>
                        <li>Platform Independent</li>
                        <li>Object-Oriented</li>
                        <li>Multi-threaded</li>
                    </ul>
                </div>
            </div>

            <!-- Pane 2: Inner HTML preserved -->
            <div>
                <div class="content">
                    <h3>TypeScript</h3>
                    <p>TypeScript is a typed superset of JavaScript compiled to plain JavaScript.</p>
                    <ul>
                        <li>Type-Safe</li>
                        <li>Better IDE Support</li>
                        <li>Improved Tooling</li>
                    </ul>
                </div>
            </div>

            <!-- Pane 3: Inner HTML preserved -->
            <div>
                <div class="content">
                    <h3>Python</h3>
                    <p>Python is a high-level, interpreted programming language.</p>
                    <ul>
                        <li>Easy to Learn</li>
                        <li>Versatile</li>
                        <li>Large Community</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script src="../path/to/index.ts"></script>
</body>

</html>
```

### TypeScript Initialization

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '200px',
    paneSettings: [
        { size: '200px' },
        { size: '200px' },
        { size: '200px' }
    ],
    width: '600px'
});
splitObj.appendTo('#splitter');
```

The TypeScript initialization automatically uses the HTML structure in the DOM without modifying it.

---

## Text Content

Use the `content` property for simple text content:

### Plain Text Example

```typescript
let splitObj: Splitter = new Splitter({
    height: '250px',
    width: '100%',
    paneSettings: [
        { size: '33%', content: 'Content for Pane 1' },
        { size: '33%', content: 'Content for Pane 2' },
        { size: '33%', content: 'Content for Pane 3' }
    ]
});
splitObj.appendTo('#splitter');
```

### Multi-Line Text Content

```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    width: '100%',
    paneSettings: [
        {
            size: '50%',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            size: '50%',
            content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    ]
});
splitObj.appendTo('#splitter');
```

---

## Dynamic Content Loading

Load content programmatically after splitter initialization:

### Updating Content with JavaScript

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '300px',
    paneSettings: [
        { size: '200px', id: 'pane1' },
        { size: '200px', id: 'pane2' }
    ]
});
splitObj.appendTo('#splitter');

// Update pane content after initialization
const pane1 = document.querySelector('#pane1');
if (pane1) {
    pane1.innerHTML = '<h3>Updated Pane 1</h3><p>This content was added dynamically.</p>';
}
```

### Loading Content from URL

```typescript
// Fetch content from server and load into pane
async function loadPaneContent(paneId: string, url: string) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        const pane = document.getElementById(paneId);
        if (pane) {
            pane.innerHTML = content;
        }
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Usage
loadPaneContent('pane1', 'api/content/section1');
loadPaneContent('pane2', 'api/content/section2');
```

### Loading Content with Data Binding

```typescript
interface PaneData {
    title: string;
    description: string;
    items: string[];
}

function createPaneHTML(data: PaneData): string {
    return `
        <div class="content">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <ul>
                ${data.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
}

let data: PaneData[] = [
    {
        title: 'Pane 1',
        description: 'First pane content',
        items: ['Item 1', 'Item 2', 'Item 3']
    },
    {
        title: 'Pane 2',
        description: 'Second pane content',
        items: ['Item A', 'Item B', 'Item C']
    }
];

let splitObj: Splitter = new Splitter({
    height: '300px',
    paneSettings: data.map((item, index) => ({
        size: '50%',
        content: createPaneHTML(item)
    }))
});
splitObj.appendTo('#splitter');
```

---

## Practical Examples

### Example 1: Dashboard Layout with Rich Content

```typescript
let splitObj: Splitter = new Splitter({
    height: '500px',
    width: '100%',
    paneSettings: [
        {
            size: '25%',
            content: `
                <div class="sidebar">
                    <h3>Filters</h3>
                    <input type="text" placeholder="Search..." />
                    <ul>
                        <li>Category A</li>
                        <li>Category B</li>
                        <li>Category C</li>
                    </ul>
                </div>
            `
        },
        {
            size: '75%',
            content: `
                <div class="main">
                    <h2>Data Grid</h2>
                    <table>
                        <tr><th>ID</th><th>Name</th><th>Value</th></tr>
                        <tr><td>1</td><td>Item A</td><td>100</td></tr>
                        <tr><td>2</td><td>Item B</td><td>200</td></tr>
                    </table>
                </div>
            `
        }
    ]
});
splitObj.appendTo('#splitter');
```

### Example 2: Code Editor with Syntax Highlighting

```typescript
let splitObj: Splitter = new Splitter({
    height: '400px',
    width: '100%',
    paneSettings: [
        {
            size: '50%',
            content: `
                <div class="editor">
                    <h3>HTML</h3>
                    <pre><code>&lt;div class="container"&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
&lt;/div&gt;</code></pre>
                </div>
            `
        },
        {
            size: '50%',
            content: `
                <div class="preview">
                    <h3>Output</h3>
                    <div class="container">
                        <h1>Hello World</h1>
                    </div>
                </div>
            `
        }
    ]
});
splitObj.appendTo('#splitter');
```

### Example 3: Multi-Level Content Organization

```typescript
let splitObj: Splitter = new Splitter({
    height: '100%',
    width: '100%',
    paneSettings: [
        {
            size: '20%',
            content: `
                <nav class="navigation">
                    <h3>Navigation</h3>
                    <ul>
                        <li><strong>Documents</strong>
                            <ul>
                                <li>Reports</li>
                                <li>Forms</li>
                            </ul>
                        </li>
                        <li><strong>Settings</strong>
                            <ul>
                                <li>Profile</li>
                                <li>Preferences</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            `
        },
        {
            size: '60%',
            content: `
                <article class="content">
                    <h1>Document Title</h1>
                    <p>Document content goes here...</p>
                </article>
            `
        },
        {
            size: '20%',
            content: `
                <aside class="details">
                    <h3>Details Panel</h3>
                    <p>Additional information and metadata.</p>
                </aside>
            `
        }
    ]
});
splitObj.appendTo('#splitter');
```

---

## Summary

- **HTML Markup:** Child elements become panes automatically
- **Content Property:** Use `content: '<html>'` in `paneSettings`
- **Inner HTML:** Preserved from original DOM structure
- **Text Content:** Simple text via `content` property
- **Dynamic Loading:** Update `innerHTML` after initialization
- **Data Binding:** Generate HTML from data objects
- **Flexible:** Mix static HTML with dynamic content as needed
