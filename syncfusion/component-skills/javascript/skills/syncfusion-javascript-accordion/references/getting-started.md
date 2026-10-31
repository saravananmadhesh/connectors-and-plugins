# Getting Started with Syncfusion Accordion

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Initialization Methods](#initialization-methods)
- [DataSource Binding](#datasource-binding)
- [Setting Initial Expanded State](#setting-initial-expanded-state)
- [Basic Working Example](#basic-working-example)
- [Theme Configuration](#theme-configuration)
- [Common Initialization Patterns](#common-initialization-patterns)
- [ES5 Setup](#es5-setup-alternative)
- [Troubleshooting](#troubleshooting)

## Overview

The Accordion is a vertically collapsible content panel component that displays one or more expandable/collapsible panels. This guide covers the installation, setup, and basic initialization methods.

## Installation

### Step 1: Install Dependencies

The Accordion component is part of the `@syncfusion/ej2-navigations` package.

```bash
npm install @syncfusion/ej2-navigations @syncfusion/ej2-base
```

### Step 2: Import CSS Styles

Add the required CSS files to your application. Choose your preferred theme (fluent2, material, bootstrap, etc.):

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/accordion/index.css";
```

Or in HTML:
```html
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
```

### Step 3: Add HTML Container

Add a `div` element with an `id` in your HTML where the accordion will render:

```html
<div id="accordion-element"></div>
```

## Initialization Methods

### Method 1: Using Items Array (Recommended)

Define accordion items using an array of objects with `header` and `content` properties.

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { 
            header: 'ASP.NET', 
            content: 'Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.' 
        },
        { 
            header: 'ASP.NET MVC', 
            content: 'The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller.' 
        },
        { 
            header: 'JavaScript', 
            content: 'JavaScript (JS) is an interpreted computer programming language. It was originally implemented as part of web browsers so that client-side scripts could interact with the user.' 
        }
    ]
});

accordion.appendTo('#accordion-element');
```

### Method 2: Using HTML Markup

Define accordion structure using nested HTML elements. The Accordion automatically detects and renders based on this structure.

```html
<div id="accordion-html-markup">
    <div>
        <div>
            <div>ASP.NET</div>
        </div>
        <div>
            <div>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.</div>
        </div>
    </div>
    <div>
        <div>
            <div>ASP.NET MVC</div>
        </div>
        <div>
            <div>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller.</div>
        </div>
    </div>
    <div>
        <div>
            <div>JavaScript</div>
        </div>
        <div>
            <div>JavaScript (JS) is an interpreted computer programming language.</div>
        </div>
    </div>
</div>
```

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({});
accordion.appendTo('#accordion-html-markup');
```

## DataSource Binding

Bind accordion data from an external source (server API, OData, etc.) using DataManager:

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const accordion = new Accordion({
    dataSource: new DataManager({
        url: 'url',
        adaptor: new UrlAdaptor()
    }),
    fields: {
        text: 'header',      // JSON property for accordion header
        value: 'content'     // JSON property for accordion content
    }
});

accordion.appendTo('#accordion-element');
```

See [Data Loading and Content](./data-loading.md) for comprehensive dataSource examples.

## Setting Initial Expanded State

Control which items are expanded when the accordion first loads using the `expanded` property (for items array) or `expandedIndices` property (for dataSource):

```typescript
const accordion = new Accordion({
    items: [
        { 
            header: 'Item 1', 
            content: 'Content 1',
            expanded: true  // This item opens by default
        },
        { 
            header: 'Item 2', 
            content: 'Content 2',
            expanded: false  // Collapsed by default (optional, false is default)
        },
        { 
            header: 'Item 3', 
            content: 'Content 3'  // Collapsed by default
        }
    ]
});

accordion.appendTo('#accordion-element');
```

## Basic Working Example

Complete TypeScript example with HTML setup:

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const accordion = new Accordion({
    items: [
        { 
            header: 'Getting Started', 
            content: 'Learn the basics of Accordion component',
            expanded: true 
        },
        { 
            header: 'Features', 
            content: 'Explore rich features like templates and data binding' 
        },
        { 
            header: 'API Reference', 
            content: 'Complete list of properties, events, and methods' 
        }
    ],
    width: '100%'
});

accordion.appendTo('#accordion-element');
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Accordion Getting Started</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="accordion-element"></div>
</body>
</html>
```

## Theme Configuration

Syncfusion Accordion supports multiple themes. Include the appropriate CSS file:

| Theme | CSS File |
|-------|----------|
| Fluent 2 | `fluent2.css` (Modern, default) |
| Material | `material.css` |
| Bootstrap 4 | `bootstrap4.css` |
| Bootstrap 5 | `bootstrap5.css` |
| Tailwind | `tailwind.css` |
| Fabric | `fabric.css` |
| High Contrast | `high-contrast.css` |

Choose only one theme CSS file per application.

## Common Initialization Patterns

### Pattern 1: Minimal Setup
```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

new Accordion({
    items: [
        { header: 'Item 1', content: 'Content 1' },
        { header: 'Item 2', content: 'Content 2' }
    ]
}).appendTo('#element');
```

### Pattern 2: With Configuration
```typescript
import { Accordion } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

new Accordion({
    items: [...],
    width: '100%',
    height: '400px',
    animation: {
        expand: { effect: 'SlideDown', duration: 400, easing: 'ease-in' },
        collapse: { effect: 'SlideUp', duration: 400, easing: 'ease-out' }
    },
    cssClass: 'custom-accordion'
}).appendTo('#element');
```

### Pattern 3: HTML Structure
```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

new Accordion({}).appendTo('#accordion-html-markup');
```

## ES5 Setup (Alternative)

If using ES5 instead of TypeScript:

```javascript
var accordion = new ej.navigations.Accordion({
    items: [
        { header: 'Item 1', content: 'Content 1' },
        { header: 'Item 2', content: 'Content 2' }
    ]
});

accordion.appendTo('#element');
```

## Troubleshooting

**Q: Accordion elements are not styled**
- A: Ensure CSS files are imported before creating the accordion. Check theme file is included.

**Q: Items not appearing**
- A: Verify the `items` array has both `header` and `content` properties. For HTML markup, ensure proper nesting structure.

**Q: Animations not working**
- A: Verify CSS is properly loaded in browser network tab. Check animation property is configured with valid effect values (SlideDown, SlideUp, FadeIn, etc.)

## Next Steps

- Configure expand behavior in **Expand Modes**
- Customize appearance in **Customization and Styling**
- Load dynamic content in **Data Loading and Content**
