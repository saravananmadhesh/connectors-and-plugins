# Getting Started with Sankey Diagrams

## Table of Contents

- #typescript-setup
- #javascript-setup
- #basic-initialization
- #data-structure
- #module-injection
- #adding-your-first-diagram
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## TypeScript Setup

### Installation

Install the Syncfusion EJ2 Charts package:

```bash
npm install @syncfusion/ej2-charts
```

The Sankey component is available from the `@syncfusion/ej2-charts` package.

### Create the TypeScript Project

You can create a TypeScript application with the Syncfusion webpack quick-start repository:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
cd ej2-quickstart
npm install
npm install @syncfusion/ej2-charts
```

Alternatively, install `@syncfusion/ej2-charts` in an existing TypeScript application.

### Module Imports

Import the Sankey class, data models, and the optional feature modules used by the application:

```typescript
import {
    Sankey,
    SankeyLegend,
    SankeyTooltip,
    type SankeyLinkModel,
    type SankeyNodeModel
} from '@syncfusion/ej2-charts';
```

Inject optional feature modules before creating the Sankey instance:

```typescript
Sankey.Inject(
    SankeyTooltip,
    SankeyLegend
);
```

Feature mapping:

```text
SankeyTooltip -> Enables node and link tooltips.
SankeyLegend  -> Displays the Sankey legend.
SankeyExport  -> Enables supported Sankey export functionality.
```

Import and inject only the modules required by the example.

Do not inject an export module in a basic example unless export functionality is implemented.

### TypeScript Container

Add a container element to the HTML page:

```html
<div id="sankey-container"></div>
```

Add a measurable height:

```css
#sankey-container {
    width: 100%;
    min-height: 500px;
}
```

### Basic TypeScript Initialization

```typescript
import {
    Sankey,
    type SankeyLinkModel,
    type SankeyNodeModel
} from '@syncfusion/ej2-charts';

const nodes: SankeyNodeModel[] = [
    {
        id: 'Start',

        label: {
            text: 'Start'
        }
    },
    {
        id: 'End',

        label: {
            text: 'End'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Start',
        targetId: 'End',
        value: 100
    }
];

const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '500px',
        title: 'My First Sankey Diagram',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

## JavaScript Setup

### Combined CDN Bundle

The simplest global JavaScript setup uses the combined Syncfusion EJ2 bundle:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Do not load the combined bundle together with individual EJ2 package scripts.

### JavaScript Container

```html
<div id="sankey-container"></div>
```

Add a measurable height:

```css
#sankey-container {
    width: 100%;
    min-height: 500px;
}
```

### Global Namespace

After the global script loads, create the Sankey component through:

```javascript
ej.charts.Sankey
```

### Basic JavaScript Initialization

```javascript
var nodes = [
    {
        id: 'Start',

        label: {
            text: 'Start'
        }
    },
    {
        id: 'End',

        label: {
            text: 'End'
        }
    }
];

var links = [
    {
        sourceId: 'Start',
        targetId: 'End',
        value: 100
    }
];

var sankey =
    new ej.charts.Sankey({
        width: '100%',
        height: '500px',
        title:
            'My First Sankey Diagram',
        nodes: nodes,
        links: links
    });

sankey.appendTo(
    '#sankey-container'
);
```

### Local JavaScript Files

If EJ2 scripts are hosted locally, copy the required synchronized package files to a resources directory.

Example structure:

```text
project/
|-- resources/
|   |-- ej2.min.js
|-- index.html
|-- app.js
```

Load the combined local bundle before the application script:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Sankey Diagram</title>
<script src="resources/ej2.min.js"></script>

    <style>
        #sankey-container {
            width: 100%;
            min-height: 500px;
        }
    </style>
</head>

<body>
    <div id="sankey-container"></div>

    <script src="app.js"></script>
</body>
</html>
```

Use package files from the same Syncfusion EJ2 version.

## Basic Initialization

A Sankey diagram requires:

1. A host element.
2. A nodes collection.
3. A links collection.
4. A Sankey instance.
5. An `appendTo` call.

### Container Element

```html
<div id="sankey-container"></div>
```

```css
#sankey-container {
    width: 100%;
    min-height: 500px;
}
```

### TypeScript Example

```typescript
import {
    Sankey,
    type SankeyLinkModel,
    type SankeyNodeModel
} from '@syncfusion/ej2-charts';

const nodes: SankeyNodeModel[] = [
    {
        id: 'A',

        label: {
            text: 'Start'
        }
    },
    {
        id: 'B',

        label: {
            text: 'End'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 100
    }
];

const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '500px',
        title:
            'My First Sankey Diagram',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

### JavaScript Example

```javascript
var nodes = [
    {
        id: 'A',

        label: {
            text: 'Start'
        }
    },
    {
        id: 'B',

        label: {
            text: 'End'
        }
    }
];

var links = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 100
    }
];

var sankey =
    new ej.charts.Sankey({
        width: '100%',
        height: '500px',
        title:
            'My First Sankey Diagram',
        nodes: nodes,
        links: links
    });

sankey.appendTo(
    '#sankey-container'
);
```

## Data Structure

A Sankey diagram uses two related collections:

```text
nodes -> Defines every category or stage.
links -> Defines the flows between nodes.
```

Every `sourceId` and `targetId` in the links collection must match an existing node `id`.

### Nodes

Nodes represent categories or stages in the flow.

#### TypeScript

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'A',

        label: {
            text: 'Start'
        }
    },
    {
        id: 'B',

        label: {
            text: 'Processing'
        }
    },
    {
        id: 'C',

        label: {
            text: 'End'
        }
    }
];
```

#### JavaScript

```javascript
var nodes = [
    {
        id: 'A',

        label: {
            text: 'Start'
        }
    },
    {
        id: 'B',

        label: {
            text: 'Processing'
        }
    },
    {
        id: 'C',

        label: {
            text: 'End'
        }
    }
];
```

Important node properties:

```text
id         -> Unique identifier referenced by links.
label.text -> Visible text displayed for the node.
color      -> Optional node color when supported.
```

Node IDs must be:

- Unique.
- Nonempty.
- Stable.
- Case-sensitive.
- Consistent with link identifiers.

### Links

Links represent connections and flow values between nodes.

#### TypeScript

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 100
    },
    {
        sourceId: 'B',
        targetId: 'C',
        value: 100
    }
];
```

#### JavaScript

```javascript
var links = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 100
    },
    {
        sourceId: 'B',
        targetId: 'C',
        value: 100
    }
];
```

Important link properties:

```text
sourceId -> Source-node identifier.
targetId -> Target-node identifier.
value    -> Flow magnitude and rendered link thickness.
color    -> Optional link color when supported.
```

Use finite positive numeric values:

```typescript
{
    sourceId: 'A',
    targetId: 'B',
    value: 100
}
```

Avoid string values:

```typescript
{
    sourceId: 'A',
    targetId: 'B',
    value: '100'
}
```

Avoid zero, negative, `NaN`, `null`, and undefined values for normal Sankey flows.

## Module Injection

Optional TypeScript features require module injection.

### Tooltip Module

Import and inject `SankeyTooltip`:

```typescript
import {
    Sankey,
    SankeyTooltip
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip
);
```

Enable tooltips:

```typescript
tooltip: {
    enable: true
}
```

### Legend Module

Import and inject `SankeyLegend`:

```typescript
import {
    Sankey,
    SankeyLegend
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyLegend
);
```

Display the legend:

```typescript
legendSettings: {
    visible: true
}
```

### Tooltip and Legend

```typescript
import {
    Sankey,
    SankeyLegend,
    SankeyTooltip
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip,
    SankeyLegend
);
```

Configuration:

```typescript
tooltip: {
    enable: true
},

legendSettings: {
    visible: true
}
```

Do not enable a feature without importing and injecting its required TypeScript module.

Global JavaScript loaded through the complete EJ2 bundle does not require explicit `Sankey.Inject(...)` calls.

## Adding Your First Diagram

### Complete TypeScript Example

#### HTML

```html
<div id="sankey-container"></div>
```

#### CSS

```css
#sankey-container {
    width: 100%;
    min-height: 500px;
}
```

#### TypeScript

```typescript
import {
    Sankey,
    SankeyLegend,
    SankeyTooltip,
    type SankeyLinkModel,
    type SankeyNodeModel
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip,
    SankeyLegend
);

const nodes: SankeyNodeModel[] = [
    {
        id: 'Product A',

        label: {
            text: 'Product A'
        }
    },
    {
        id: 'Product B',

        label: {
            text: 'Product B'
        }
    },
    {
        id: 'Revenue',

        label: {
            text: 'Total Revenue'
        }
    },
    {
        id: 'Operations',

        label: {
            text: 'Operating Costs'
        }
    },
    {
        id: 'Profit',

        label: {
            text: 'Profit'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Product A',
        targetId: 'Revenue',
        value: 100
    },
    {
        sourceId: 'Product B',
        targetId: 'Revenue',
        value: 150
    },
    {
        sourceId: 'Revenue',
        targetId: 'Operations',
        value: 50
    },
    {
        sourceId: 'Revenue',
        targetId: 'Profit',
        value: 200
    }
];

const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '500px',
        title:
            'Revenue Flow Diagram',
        subTitle:
            'Product revenue distribution',

        nodes,
        links,

        tooltip: {
            enable: true
        },

        legendSettings: {
            visible: true
        },

        nodeStyle: {
            opacity: 0.9
        },

        linkStyle: {
            opacity: 0.5,
            highlightOpacity: 0.9,
            inactiveOpacity: 0.2,
            curvature: 0.55,
            colorType: 'Blend'
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

### Complete JavaScript Example

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Syncfusion Sankey Diagram</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .page-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px;
            box-sizing: border-box;
        }

        #sankey-container {
            width: 100%;
            min-height: 500px;
        }
    </style>
</head>

<body>
    <main class="page-container">
        <div id="sankey-container"></div>
    </main>

    <script>
        var nodes = [
            {
                id: 'Product A',

                label: {
                    text: 'Product A'
                }
            },
            {
                id: 'Product B',

                label: {
                    text: 'Product B'
                }
            },
            {
                id: 'Revenue',

                label: {
                    text: 'Total Revenue'
                }
            },
            {
                id: 'Operations',

                label: {
                    text: 'Operating Costs'
                }
            },
            {
                id: 'Profit',

                label: {
                    text: 'Profit'
                }
            }
        ];

        var links = [
            {
                sourceId: 'Product A',
                targetId: 'Revenue',
                value: 100
            },
            {
                sourceId: 'Product B',
                targetId: 'Revenue',
                value: 150
            },
            {
                sourceId: 'Revenue',
                targetId: 'Operations',
                value: 50
            },
            {
                sourceId: 'Revenue',
                targetId: 'Profit',
                value: 200
            }
        ];

        var sankey =
            new ej.charts.Sankey({
                width: '100%',
                height: '500px',
                title:
                    'Revenue Flow Diagram',
                subTitle:
                    'Product revenue distribution',

                nodes: nodes,
                links: links,

                tooltip: {
                    enable: true
                },

                legendSettings: {
                    visible: true
                },

                nodeStyle: {
                    opacity: 0.9
                },

                linkStyle: {
                    opacity: 0.5,
                    highlightOpacity: 0.9,
                    inactiveOpacity: 0.2,
                    curvature: 0.55,
                    colorType: 'Blend'
                }
            });

        sankey.appendTo(
            '#sankey-container'
        );
    </script>
</body>
</html>
```

## Run the Application

### TypeScript

Run the command configured by the selected project.

For the Syncfusion webpack quick-start:

```bash
npm start
```

For a Vite-based TypeScript application:

```bash
npm run dev
```

### JavaScript

Serve the HTML page through a local HTTP server.

Using Python:

```bash
python -m http.server 8000
```

Using Node.js:

```bash
npx http-server
```

Open the local address returned by the server.

## Key Takeaways

### TypeScript

- Install `@syncfusion/ej2-charts`.
- Import the `Sankey` class.
- Import the `SankeyNodeModel` and `SankeyLinkModel` types.
- Import and inject optional feature modules.
- Create the Sankey instance.
- Call `appendTo` with the host selector.
- Destroy the instance when the application view removes it.

### JavaScript

- Load the versioned EJ2 combined bundle or validated individual scripts.
- Use the `ej.charts.Sankey` global constructor.
- Define the nodes and links before initialization.
- Create the Sankey instance.
- Call `appendTo` after the host element exists.
- Use package files from the same EJ2 version.

### Data

- Every link must reference existing node IDs.
- Node IDs are case-sensitive.
- Node IDs must be unique.
- Link values must be finite positive numbers.
- Intermediate-node totals should be intentionally configured.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-charts is installed for TypeScript.
✅ Sankey is imported.
✅ SankeyNodeModel and SankeyLinkModel are imported as types.
✅ SankeyTooltip is imported and injected when tooltips are enabled.
✅ SankeyLegend is imported and injected when the legend is visible.
✅ Every injected module is imported.
✅ Module injection occurs before Sankey construction.
✅ Global JavaScript does not require explicit module injection.
✅ The JavaScript bundle loads before application code.
✅ All JavaScript resources use the same EJ2 version.
✅ The Sankey host element exists.
✅ The host element has a measurable height.
✅ sankey.appendTo is called.
✅ The appendTo selector matches the host ID.
✅ Every node ID is nonempty.
✅ Every node ID is unique.
✅ Every sourceId matches an existing node ID.
✅ Every targetId matches an existing node ID.
✅ Identifier capitalization is consistent.
✅ Every link value is numeric.
✅ Every link value is finite.
✅ Every link value is greater than zero.
✅ Node labels use the label text model.
✅ The title is configured as a string.
✅ The subtitle is configured as a string.
✅ Width and height use valid string values.
✅ Optional modules are not injected unless required.
✅ Executable HTML uses actual angle brackets.
✅ No encoded tags replace executable HTML.
✅ No copied anchor tags wrap script URLs.
✅ No malformed .jsscript URLs exist.
✅ No editor-generated strong, br, data-lexical-text, or class markup remains.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Constructor Selector Pattern

Avoid:

```typescript
const sankey =
    new Sankey({
        nodes,
        links
    }, '#sankey-container');
```

Preferred:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

### Incorrect Title Model

Avoid:

```typescript
title: {
    text:
        'Revenue Flow Diagram'
}
```

Use:

```typescript
title:
    'Revenue Flow Diagram'
```

### Incorrect Node Label

Avoid:

```typescript
const nodes:
    SankeyNodeModel[] = [
        {
            id: 'A',
            label: 'Start'
        }
    ];
```

Use:

```typescript
const nodes:
    SankeyNodeModel[] = [
        {
            id: 'A',

            label: {
                text: 'Start'
            }
        }
    ];
```

### Missing Tooltip Module

Incorrect:

```typescript
const sankey: Sankey =
    new Sankey({
        tooltip: {
            enable: true
        }
    });
```

Correct:

```typescript
import {
    Sankey,
    SankeyTooltip
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip
);
```

### Missing Legend Module

Incorrect:

```typescript
const sankey: Sankey =
    new Sankey({
        legendSettings: {
            visible: true
        }
    });
```

Correct:

```typescript
import {
    Sankey,
    SankeyLegend
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyLegend
);
```

### Missing Source or Target Node

Incorrect:

```typescript
const nodes:
    SankeyNodeModel[] = [
        {
            id: 'Revenue'
        }
    ];

const links:
    SankeyLinkModel[] = [
        {
            sourceId: 'Sales',
            targetId: 'Revenue',
            value: 100
        }
    ];
```

The `Sales` node does not exist.

Correct:

```typescript
const nodes:
    SankeyNodeModel[] = [
        {
            id: 'Sales'
        },
        {
            id: 'Revenue'
        }
    ];
```

### Identifier Case Mismatch

Incorrect:

```typescript
const nodes:
    SankeyNodeModel[] = [
        {
            id: 'Product A'
        }
    ];

const links:
    SankeyLinkModel[] = [
        {
            sourceId: 'product a',
            targetId: 'Revenue',
            value: 100
        }
    ];
```

Correct:

```typescript
const links:
    SankeyLinkModel[] = [
        {
            sourceId: 'Product A',
            targetId: 'Revenue',
            value: 100
        }
    ];
```

### Nonnumeric Link Value

Incorrect:

```typescript
{
    sourceId: 'Product A',
    targetId: 'Revenue',
    value: '100'
}
```

Correct:

```typescript
{
    sourceId: 'Product A',
    targetId: 'Revenue',
    value: 100
}
```

### Invalid Link Value

Avoid:

```typescript
{
    sourceId: 'Product A',
    targetId: 'Revenue',
    value: 0
}
```

Avoid:

```typescript
{
    sourceId: 'Product A',
    targetId: 'Revenue',
    value: -20
}
```

Use a finite positive value:

```typescript
{
    sourceId: 'Product A',
    targetId: 'Revenue',
    value: 100
}
```

### Missing Host Element

Avoid calling:

```typescript
sankey.appendTo(
    '#sankey-container'
);
```

without this HTML:

```html
<div id="sankey-container"></div>
```

### Missing Host Height

Avoid:

```html
<div id="sankey-container"></div>
```

without a measurable component or container height.

Use:

```css
#sankey-container {
    width: 100%;
    min-height: 500px;
}
```

and:

```typescript
height: '500px'
```

### Unnecessary Export Module

Do not inject `SankeyExport` in a basic example when no export action is provided.

Use:

```typescript
Sankey.Inject(
    SankeyTooltip,
    SankeyLegend
);
```

### Combined and Individual CDN Resources

Do not load the combined EJ2 bundle together with individual package scripts.

Use either:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

or a validated set of individual package scripts.

### Malformed CDN Markup

Do not use:

```html
https://cdn.syncfusion.com/...
    https://cdn.syncfusion.com/...
</a>
```

Use a valid script element:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Encoded Executable HTML

Do not use:

```html
&lt;div id="sankey-container"&gt;&lt;/div&gt;
```

Use:

```html
<div id="sankey-container"></div>
```

### Editor-Generated Markup

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, templates, commands, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```