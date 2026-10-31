# Getting Started with Timeline Control

## Table of Contents
- [Dependencies](#dependencies)
- [Development Environment Setup](#development-environment-setup)
- [Installing Syncfusion Packages](#installing-syncfusion-packages)
- [Importing CSS Styles](#importing-css-styles)
- [Creating Your First Timeline](#creating-your-first-timeline)
- [Running the Application](#running-the-application)
- [Complete Example](#complete-example)

## Dependencies

The Timeline control requires the following dependencies:

```
@syncfusion/ej2-layouts
  └── @syncfusion/ej2-base
```

These packages provide the base components and layout controls necessary for Timeline functionality.

## Development Environment Setup

### Prerequisites
- Node.js v14.15.0 or higher
- npm (comes with Node.js)
- A code editor (Visual Studio Code recommended)

### Setting Up a New Project

Clone the Syncfusion quickstart webpack project:

```bash
git clone url
cd ej2-quickstart
```

This project comes pre-configured with webpack and all necessary build tools.

## Installing Syncfusion Packages

Syncfusion packages are available on npmjs.com. You can install all Syncfusion controls in a single [`@syncfusion/ej2`](url) package or install individual packages for each control.

The quickstart application is pre-configured with the `@syncfusion/ej2` package in `package.json`. Install all dependencies:

```bash
npm install
```

This will install all Syncfusion controls and dependencies including the Timeline control from the `@syncfusion/ej2-layouts` package.

## Importing CSS Styles

To render the Timeline control with proper styling, import the required CSS styles in your `~/src/styles/styles.css` file:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/timeline/index.css";
```

These imports provide:
- Base component styling from `@syncfusion/ej2-base`
- Layout and Timeline-specific styling from `@syncfusion/ej2-layouts`
- The default Fluent2 theme

Other available themes:
- `bootstrap5.css`
- `material.css`
- `tailwind.css`

## Creating Your First Timeline

### HTML Setup

Add an HTML div element with an `id` attribute to your `index.html` file where the Timeline will render:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 - Timeline</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="description" content="Essential JS 2" />
    <meta name="author" content="Syncfusion" />
    <link rel="shortcut icon" href="resources/favicon.ico" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="control-container" style="height: 300px;">
        <div id="timeline"></div>
    </div>
</body>
</html>
```

### TypeScript Implementation

Create your Timeline in your application TypeScript file (e.g., `app.ts`):

```typescript
import { Timeline } from '@syncfusion/ej2-layouts';

// Basic Timeline with empty items
let timeline: Timeline = new Timeline({
  items: [{}, {}, {}, {}],
});

// Render Timeline to the specified element
timeline.appendTo("#timeline");
```

### Adding Items with Content

Import the `TimelineItemModel` interface to add content to timeline items:

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

// Define timeline items
let items: TimelineItemModel[] = [
  { content: 'Order Placed' },
  { content: 'Processing' },
  { content: 'Shipped' },
  { content: 'Delivered' }
];

// Initialize Timeline with items
let timeline: Timeline = new Timeline({
  items: items,
});

// Render to DOM
timeline.appendTo("#timeline");
```

## Running the Application

Build and run your application using npm:

```bash
npm start
```

The application will compile using webpack and open in your default browser at `http://localhost:8000`. It uses webpack's hot module replacement for live reloading during development.

## Complete Example

Here's a complete, running example of a basic Timeline:

**TypeScript (app.ts):**
```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const productLifecycle: TimelineItemModel[] = [
  { content: 'Planning' },
  { content: 'Developing' },
  { content: 'Testing' },
  { content: 'Launch' },
];

// Initializes the Timeline control
let timeline: Timeline = new Timeline({
  items: productLifecycle,
});

// Render initialized Timeline.
timeline.appendTo("#timeline");
```

**HTML (index.html):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 - Timeline</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="description" content="Essential JS 2" />
    <meta name="author" content="Syncfusion" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <script src="url"></script>
    <script src="systemjs.config.js"></script>
</head>
<body>
    <div id='loader'>LOADING....</div>
    <div id='container' style="height: 300px;">
        <div id="timeline"></div>
    </div>
    <style>
        #container {
            visibility: hidden;
            margin-top: 30px;
            padding: 30px;
        }

        #loader {
            color: #008cff;
            height: 40px;
            left: 45%;
            position: absolute;
            top: 45%;
            width: 30%;
        }
    </style>
</body>
</html>
```

**CSS (styles.css):**
```css
@import "../../node_modules/@syncfusion/ej2-base/styles/fluent2.css";
@import "../../node_modules/@syncfusion/ej2-layouts/styles/fluent2.css";
```

This example creates a vertical timeline with four items displaying the product lifecycle stages. The timeline renders in the `#container` div and displays items in the default vertical orientation.

### Next Steps

Once you have a basic timeline working, explore:
- [Items and Content](items-and-content.md) - Add rich content and opposite content
- [Alignment and Orientation](alignment-and-orientation.md) - Change layout directions
- [Customization & Styling](customization-styling.md) - Personalize appearance
- [Events & Lifecycle](events-and-lifecycle.md) - Handle timeline events
