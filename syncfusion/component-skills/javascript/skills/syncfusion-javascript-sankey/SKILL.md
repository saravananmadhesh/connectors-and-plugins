---
name: syncfusion-javascript-sankey
description: Create interactive Sankey diagrams in Syncfusion TypeScript and JavaScript. Use this skill when user needs to visualize data flows, create flow diagrams, configure nodes and links, customize Sankey appearance, add tooltips and legends, implement interactivity, handle data hierarchies, export charts, or work with flow-based visualizations. Works with TypeScript (module-based) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Sankey Diagrams in Syncfusion TypeScript & JavaScript

The Syncfusion EJ2 Sankey component visualizes quantitative flows and relationships between categories. Nodes represent sources, destinations, or intermediate stages, while links represent directed flows whose rendered thickness is determined by numeric values.

This skill covers framework-neutral implementations for:

- TypeScript applications using npm and module imports.
- JavaScript applications using a versioned EJ2 CDN bundle.
- Node and link configuration.
- Tooltips and legends.
- Node and link highlighting.
- Sankey interaction events.
- Horizontal and Vertical orientations.
- Right-to-left rendering.
- Themes and visual customization.
- Exporting and printing when supported.
- Accessibility configuration.
- Responsive layouts.
- Runtime data validation.
- Performance optimization.
- Dynamic data updates.

## Platform Support

### TypeScript

Use TypeScript when the application uses:

- The `@syncfusion/ej2-charts` npm package.
- TypeScript compilation.
- Webpack, Vite, or another module bundler.
- Strongly typed Sankey models.
- Explicit feature-module injection.
- IDE IntelliSense and compile-time validation.

Install the package:

```bash
npm install @syncfusion/ej2-charts
```

Basic import:

```typescript
import {
    Sankey,
    type SankeyLinkModel,
    type SankeyNodeModel
} from '@syncfusion/ej2-charts';
```

Import and inject optional modules when their features are enabled:

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

### JavaScript

Use global JavaScript when the application uses:

- A versioned CDN bundle.
- A locally hosted EJ2 global bundle.
- Traditional HTML and JavaScript files.
- The global `ej` namespace.
- No TypeScript compilation.

The global Sankey constructor is:

```javascript
ej.charts.Sankey
```

Global JavaScript loaded through the complete EJ2 bundle does not require explicit `Sankey.Inject(...)` calls.

### JavaScript Language Level

The JavaScript examples use ES5-compatible syntax where practical:

```text
var declarations
Traditional functions
No optional chaining
No JavaScript module imports
Global ej namespace
```

A modern browser is still recommended.

## When to Use This Skill

Use this skill when the task requires:

- Visualizing directed data flows.
- Showing flow magnitude between categories.
- Creating revenue-allocation diagrams.
- Displaying energy generation and consumption.
- Modeling material or inventory movement.
- Visualizing conversion funnels.
- Showing customer journeys.
- Creating multi-stage process diagrams.
- Configuring Sankey nodes and links.
- Applying individual node or link colors.
- Styling all nodes or links consistently.
- Adding node and link tooltips.
- Displaying a Sankey legend.
- Handling node and link events.
- Applying interaction highlighting.
- Using Horizontal or Vertical orientation.
- Supporting right-to-left layouts.
- Creating responsive Sankey diagrams.
- Exporting or printing a Sankey when supported.
- Providing accessible descriptions and data alternatives.
- Updating Sankey data dynamically.
- Validating Sankey data before rendering.
- Optimizing a complex Sankey visualization.

## Implementation Rules

### Rule 1: Provide Complete Examples

A runnable TypeScript example should include:

```text
Imports
Required feature-module injection
Node collection
Link collection
Sankey configuration
HTML host element
CSS dimensions
appendTo call
```

A runnable JavaScript example should include:

```text
Versioned EJ2 global script
Node collection
Link collection
Sankey configuration
HTML host element
CSS dimensions
appendTo call
```

### Rule 2: Use Explicit DOM Attachment

Preferred TypeScript:

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

Preferred JavaScript:

```javascript
var sankey =
    new ej.charts.Sankey({
        nodes: nodes,
        links: links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Avoid passing the selector as the second constructor argument.

### Rule 3: Ensure the Host Exists

Required HTML:

```html
<div id="sankey-container"></div>
```

Required attachment:

```typescript
sankey.appendTo(
    '#sankey-container'
);
```

The host ID and selector must match.

### Rule 4: Provide a Measurable Height

Required CSS:

```css
#sankey-container {
    width: 100%;
    min-height: 500px;
}
```

Recommended component dimensions:

```typescript
width: '100%',
height: '500px'
```

Avoid:

```typescript
height: 'auto'
```

If `height: '100%'` is used, every relevant ancestor must have a definite computed height.

### Rule 5: Inject Every Enabled TypeScript Feature

Feature-module mapping:

```text
Tooltip -> SankeyTooltip
Legend  -> SankeyLegend
Export  -> SankeyExport
```

Example:

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

Do not inject unused modules.

### Rule 6: Keep Imports and Injection Synchronized

Incorrect:

```typescript
import {
    Sankey
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip
);
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

### Rule 7: Do Not Inject Modules in Global JavaScript

Avoid:

```javascript
ej.charts.Sankey.Inject(
    ej.charts.SankeyTooltip,
    ej.charts.SankeyLegend
);
```

Use the global constructor directly:

```javascript
var sankey =
    new ej.charts.Sankey({
        tooltip: {
            enable: true
        },

        legendSettings: {
            visible: true
        },

        nodes: nodes,
        links: links
    });

sankey.appendTo(
    '#sankey-container'
);
```

### Rule 8: Use Type-Only Model Imports

Preferred:

```typescript
import {
    Sankey,
    SankeyLegend,
    SankeyTooltip,
    type SankeyLinkModel,
    type SankeyNodeModel
} from '@syncfusion/ej2-charts';
```

This keeps runtime imports separate from TypeScript-only types.

### Rule 9: Configure the Title as a String

Incorrect:

```typescript
title: {
    text: 'Sales Flow Diagram'
}
```

Correct:

```typescript
title:
    'Sales Flow Diagram'
```

The subtitle is also a separate string:

```typescript
subTitle:
    'Product revenue distribution'
```

### Rule 10: Use the Node Label Model

Incorrect:

```typescript
{
    id: 'Product A',
    label: 'Product A'
}
```

Correct:

```typescript
{
    id: 'Product A',

    label: {
        text: 'Product A'
    }
}
```

### Rule 11: Keep Node IDs Unique

Every node requires a unique, nonempty ID.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Product A'
    },
    {
        id: 'Product B'
    },
    {
        id: 'Revenue'
    }
];
```

Avoid:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Revenue'
    },
    {
        id: 'Revenue'
    }
];
```

### Rule 12: Match Link IDs to Existing Nodes

Every `sourceId` and `targetId` must match an existing node `id`.

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Product A',
        targetId: 'Revenue',
        value: 100
    }
];
```

Identifiers are case-sensitive.

```text
Product A
product a
PRODUCT A
```

These are different identifiers.

### Rule 13: Use Finite Positive Link Values

Valid:

```typescript
{
    sourceId: 'Product A',
    targetId: 'Revenue',
    value: 100
}
```

Avoid:

```text
Numeric strings
Zero
Negative numbers
NaN
Infinity
null
undefined
Missing values
```

### Rule 14: Keep Node Styling at the Correct Level

Individual node properties include:

```text
id
label
color
offset
```

Shared node styling belongs under `nodeStyle`:

```typescript
nodeStyle: {
    width: 24,
    padding: 14,
    fill: '#2563eb',
    stroke: '#1e3a8a',
    strokeWidth: 1,
    opacity: 0.9,
    highlightOpacity: 1,
    inactiveOpacity: 0.25
}
```

Do not assign global node-style properties directly to individual nodes.

### Rule 15: Keep Link Styling at the Correct Level

Individual link properties include:

```text
sourceId
targetId
value
color
```

Shared link styling belongs under `linkStyle`:

```typescript
linkStyle: {
    opacity: 0.5,
    highlightOpacity: 1,
    inactiveOpacity: 0.2,
    curvature: 0.55,
    colorType: 'Blend'
}
```

Do not assign global opacity or curvature directly to individual links.

### Rule 16: Use Supported Interaction Events

Validated Sankey interaction and rendering events can include:

```text
nodeEnter
nodeLeave
nodeClick
linkEnter
linkLeave
linkClick
nodeRendering
linkRendering
tooltipRendering
legendItemRendering
labelRendering
load
loaded
sizeChanged
```

Do not use Cartesian Chart point events such as:

```text
pointMouseMove
pointClick
pointRender
selectionComplete
```

### Rule 17: Use Highlighting Instead of Unsupported Selection

Do not use:

```typescript
selectionMode:
    'Point'
```

Do not call:

```typescript
sankey.select([
    {
        id: 'Product A'
    }
]);
```

Use node and link interaction opacity:

```typescript
nodeStyle: {
    opacity: 0.9,
    highlightOpacity: 1,
    inactiveOpacity: 0.25
},

linkStyle: {
    opacity: 0.5,
    highlightOpacity: 1,
    inactiveOpacity: 0.15
}
```

### Rule 18: Use Supported Orientations

Horizontal:

```typescript
orientation:
    'Horizontal'
```

Vertical:

```typescript
orientation:
    'Vertical'
```

Do not add an unsupported `nodeAlignment` property.

### Rule 19: Use `enableRtl` for RTL Rendering

```typescript
enableRtl:
    true
```

Do not reverse source and target IDs merely to create an RTL presentation.

### Rule 20: Use Public Configuration

Do not depend on undocumented internal selectors:

```css
.e-sankey {
    border-radius: 8px;
}
```

Use an application-owned wrapper:

```html
<section class="sankey-card">
    <div id="sankey-container"></div>
</section>
```

```css
.sankey-card {
    border-radius: 8px;
    box-shadow:
        0 2px 8px
        rgb(0 0 0 / 10%);
}
```

### Rule 21: Do Not Use Encoded or Editor-Generated Code

Executable HTML must use actual tags.

Correct:

```html
<div id="sankey-container"></div>
```

Incorrect:

```html
&lt;div id="sankey-container"&gt;&lt;/div&gt;
```

Do not place the following inside executable code:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```

## Navigation Guide

### Getting Started and Setup

Read:

```text
references/getting-started.md
```

Use this reference for:

- npm installation.
- TypeScript imports.
- JavaScript CDN setup.
- Direct Sankey initialization.
- Container creation.
- Node and link data structure.
- Module injection.
- First Sankey diagram.
- Initialization troubleshooting.

### Nodes Configuration

Read:

```text
references/nodes-configuration.md
```

Use this reference for:

- `SankeyNodeModel`.
- Node IDs.
- Node labels.
- Individual node colors.
- Global `nodeStyle`.
- Node borders.
- Node width and padding.
- Interaction opacity.
- Node offsets.
- Node positioning.
- `nodeRendering`.
- Data-driven node colors.
- Node validation.

### Links Configuration

Read:

```text
references/links-configuration.md
```

Use this reference for:

- `SankeyLinkModel`.
- Source and target IDs.
- Link values.
- Individual link colors.
- Global `linkStyle`.
- Source, Target, and Blend colors.
- Link opacity and curvature.
- Balanced flow values.
- Splitting and merging flows.
- Multi-stage flows.
- Link events.
- `linkRendering`.
- Dynamic data transformation.
- Link validation.

### Customization and Appearance

Read:

```text
references/customization-and-appearance.md
```

Use this reference for:

- Built-in themes.
- Node and link colors.
- Title and subtitle text.
- Title and subtitle styles.
- Label typography.
- Horizontal and Vertical orientations.
- Background colors and images.
- Chart borders.
- Chart margins.
- Responsive dimensions.
- Container decoration.
- Resize handling.
- High-contrast presentation.

### Features and Interaction

Read:

```text
references/features-and-interaction.md
```

Use this reference for:

- Tooltip module injection.
- Tooltip formatting.
- Tooltip appearance.
- Legend module injection.
- Legend position and styling.
- Runtime legend visibility.
- Node and link highlighting.
- Sankey lifecycle events.
- Node events.
- Link events.
- Rendering events.
- RTL support.
- Export validation.
- Printing.
- Native external controls.

### Accessibility and Advanced Topics

Read:

```text
references/accessibility-and-advanced.md
```

Use this reference for:

- Sankey accessibility configuration.
- Accessible descriptions.
- Keyboard behavior.
- Visible focus.
- Semantic surrounding HTML.
- Screen-reader descriptions.
- Accessible data tables.
- Mobile layouts.
- RTL accessibility.
- Runtime data updates.
- Duplicate-link aggregation.
- Performance optimization.
- Resize optimization.
- Memory management.
- Troubleshooting.
- Accessibility testing.

## TypeScript Quick Start

### Required HTML

```html
<main class="page-container">
    <section
        class="sankey-card"
        aria-labelledby="sankey-heading"
        aria-describedby="sankey-description"
    >
        <h1 id="sankey-heading">
            Sales Flow Diagram
        </h1>

        <p id="sankey-description">
            Product A and Product B contribute to total revenue.
            Revenue is distributed to operating expenses and profit.
        </p>

        <div id="sankey-container"></div>
    </section>
</main>
```

### Required CSS

```css
.page-container {
    width: 100%;
    min-height: 100vh;
    padding: 24px;
    box-sizing: border-box;
    background: #f8fafc;
}

.sankey-card {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
}

.sankey-card h1 {
    margin: 0 0 8px;
    color: #111827;
    font-family:
        "Segoe UI",
        sans-serif;
    font-size: 24px;
}

.sankey-card p {
    margin: 0 0 16px;
    color: #374151;
    font-family:
        "Segoe UI",
        sans-serif;
    font-size: 14px;
    line-height: 1.5;
}

#sankey-container {
    width: 100%;
    min-height: 500px;
}
```

### TypeScript

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
        },

        color: '#2563eb'
    },
    {
        id: 'Product B',

        label: {
            text: 'Product B'
        },

        color: '#0ea5e9'
    },
    {
        id: 'Revenue',

        label: {
            text: 'Total Revenue'
        },

        color: '#7c3aed'
    },
    {
        id: 'Operations',

        label: {
            text: 'Operating Expenses'
        },

        color: '#f59e0b'
    },
    {
        id: 'Profit',

        label: {
            text: 'Net Profit'
        },

        color: '#10b981'
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
            'Sales Flow Diagram',
        subTitle:
            'Product revenue distribution',
        orientation:
            'Horizontal',

        nodes,
        links,

        nodeStyle: {
            width: 24,
            padding: 14,
            stroke: '#ffffff',
            strokeWidth: 1,
            opacity: 0.95,
            highlightOpacity: 1,
            inactiveOpacity: 0.25
        },

        linkStyle: {
            opacity: 0.5,
            highlightOpacity: 1,
            inactiveOpacity: 0.15,
            curvature: 0.55,
            colorType: 'Blend'
        },

        labelSettings: {
            visible: true,
            fontFamily:
                'Segoe UI',
            fontSize: '13px',
            fontWeight: '500',
            color: '#111827'
        },

        tooltip: {
            enable: true,
            nodeFormat:
                '$name : $value',
            linkFormat:
                '$start.name to $target.name : $value'
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        },

        accessibility: {
            accessibilityDescription:
                'Product A contributes 100 units and Product B ' +
                'contributes 150 units to Total Revenue. Revenue ' +
                'distributes 50 units to Operating Expenses and ' +
                '200 units to Net Profit.',
            accessibilityRole:
                'img',
            focusable: true,
            tabIndex: 0
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

## JavaScript Quick Start

Use the versioned combined EJ2 bundle.

Do not mix the combined bundle with individual EJ2 package scripts.

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
            min-height: 100vh;
            padding: 24px;
            box-sizing: border-box;
            background: #f8fafc;
        }

        .sankey-card {
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            padding: 16px;
            box-sizing: border-box;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
        }

        .sankey-card h1 {
            margin: 0 0 8px;
            color: #111827;
            font-family:
                "Segoe UI",
                sans-serif;
            font-size: 24px;
        }

        .sankey-card p {
            margin: 0 0 16px;
            color: #374151;
            font-family:
                "Segoe UI",
                sans-serif;
            font-size: 14px;
            line-height: 1.5;
        }

        #sankey-container {
            width: 100%;
            min-height: 500px;
        }
    </style>
</head>

<body>
    <main class="page-container">
        <section
            class="sankey-card"
            aria-labelledby="sankey-heading"
            aria-describedby="sankey-description"
        >
            <h1 id="sankey-heading">
                Sales Flow Diagram
            </h1>

            <p id="sankey-description">
                Product A and Product B contribute to total revenue.
                Revenue is distributed to operating expenses and profit.
            </p>

            <div id="sankey-container"></div>
        </section>
    </main>

    <script>
        var nodes = [
            {
                id: 'Product A',

                label: {
                    text: 'Product A'
                },

                color: '#2563eb'
            },
            {
                id: 'Product B',

                label: {
                    text: 'Product B'
                },

                color: '#0ea5e9'
            },
            {
                id: 'Revenue',

                label: {
                    text: 'Total Revenue'
                },

                color: '#7c3aed'
            },
            {
                id: 'Operations',

                label: {
                    text:
                        'Operating Expenses'
                },

                color: '#f59e0b'
            },
            {
                id: 'Profit',

                label: {
                    text: 'Net Profit'
                },

                color: '#10b981'
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
                    'Sales Flow Diagram',
                subTitle:
                    'Product revenue distribution',
                orientation:
                    'Horizontal',

                nodes: nodes,
                links: links,

                nodeStyle: {
                    width: 24,
                    padding: 14,
                    stroke: '#ffffff',
                    strokeWidth: 1,
                    opacity: 0.95,
                    highlightOpacity: 1,
                    inactiveOpacity: 0.25
                },

                linkStyle: {
                    opacity: 0.5,
                    highlightOpacity: 1,
                    inactiveOpacity: 0.15,
                    curvature: 0.55,
                    colorType: 'Blend'
                },

                labelSettings: {
                    visible: true,
                    fontFamily:
                        'Segoe UI',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#111827'
                },

                tooltip: {
                    enable: true,
                    nodeFormat:
                        '$name : $value',
                    linkFormat:
                        '$start.name to $target.name : $value'
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom'
                },

                accessibility: {
                    accessibilityDescription:
                        'Product A contributes 100 units and Product B ' +
                        'contributes 150 units to Total Revenue. Revenue ' +
                        'distributes 50 units to Operating Expenses and ' +
                        '200 units to Net Profit.',
                    accessibilityRole:
                        'img',
                    focusable: true,
                    tabIndex: 0
                }
            });

        sankey.appendTo(
            '#sankey-container'
        );
    </script>
</body>
</html>
```

## Common Patterns

### Pattern 1: Multi-Stage Flow

Use balanced values when the flow represents a conserved quantity.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Raw Data'
    },
    {
        id: 'Processing'
    },
    {
        id: 'Output A'
    },
    {
        id: 'Output B'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Raw Data',
        targetId: 'Processing',
        value: 500
    },
    {
        sourceId: 'Processing',
        targetId: 'Output A',
        value: 300
    },
    {
        sourceId: 'Processing',
        targetId: 'Output B',
        value: 200
    }
];
```

The Processing node is balanced:

```text
Incoming:
500

Outgoing:
300 + 200 = 500
```

### Pattern 2: Revenue Distribution

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Product Revenue',

        label: {
            text: 'Product Revenue'
        }
    },
    {
        id: 'Service Revenue',

        label: {
            text: 'Service Revenue'
        }
    },
    {
        id: 'Total Revenue',

        label: {
            text: 'Total Revenue'
        }
    },
    {
        id: 'Operations',

        label: {
            text: 'Operations'
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
        sourceId:
            'Product Revenue',
        targetId:
            'Total Revenue',
        value: 650
    },
    {
        sourceId:
            'Service Revenue',
        targetId:
            'Total Revenue',
        value: 350
    },
    {
        sourceId:
            'Total Revenue',
        targetId:
            'Operations',
        value: 400
    },
    {
        sourceId:
            'Total Revenue',
        targetId:
            'Profit',
        value: 600
    }
];
```

### Pattern 3: Styled Interactive Sankey

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        nodeStyle: {
            width: 24,
            padding: 14,
            opacity: 0.9,
            highlightOpacity: 1,
            inactiveOpacity: 0.25
        },

        linkStyle: {
            opacity: 0.5,
            highlightOpacity: 1,
            inactiveOpacity: 0.15,
            curvature: 0.55,
            colorType: 'Blend'
        },

        tooltip: {
            enable: true
        },

        legendSettings: {
            visible: true
        },

        nodeClick: (args): void => {
            console.log(
                'Node clicked.',
                args
            );
        },

        linkClick: (args): void => {
            console.log(
                'Link clicked.',
                args
            );
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

### Pattern 4: Responsive Layout

```typescript
const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        orientation:
            'Vertical',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Required CSS:

```css
#sankey-container {
    width: 100%;
    min-height: 520px;
}

@media (max-width: 768px) {
    #sankey-container {
        min-height: 600px;
    }
}
```

### Pattern 5: Dynamic Node Styling

```typescript
import type {
    SankeyNodeRenderEventArgs
} from '@syncfusion/ej2-charts';

const handleNodeRendering = (
    args:
        SankeyNodeRenderEventArgs
): void => {
    if (
        args.node.id ===
        'Loss'
    ) {
        args.node.color =
            '#dc2626';
    }
};

const sankey: Sankey =
    new Sankey({
        nodes,
        links,
        nodeRendering:
            handleNodeRendering
    });

sankey.appendTo(
    '#sankey-container'
);
```

### Pattern 6: Dynamic Link Styling

```typescript
import type {
    SankeyLinkRenderEventArgs
} from '@syncfusion/ej2-charts';

const handleLinkRendering = (
    args:
        SankeyLinkRenderEventArgs
): void => {
    if (
        args.link.targetId ===
        'Waste'
    ) {
        args.fill =
            '#dc2626';
    }
};

const sankey: Sankey =
    new Sankey({
        nodes,
        links,
        linkRendering:
            handleLinkRendering
    });

sankey.appendTo(
    '#sankey-container'
);
```

### Pattern 7: RTL Sankey

```typescript
const sankey: Sankey =
    new Sankey({
        enableRtl: true,
        orientation:
            'Horizontal',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use semantic surrounding markup:

```html
<section lang="ar" dir="rtl">
    <div id="sankey-container"></div>
</section>
```

### Pattern 8: Runtime Data Update

```typescript
const updateSankeyData = (
    nextNodes:
        SankeyNodeModel[],
    nextLinks:
        SankeyLinkModel[]
): void => {
    validateSankeyData(
        nextNodes,
        nextLinks
    );

    sankey.nodes =
        nextNodes;

    sankey.links =
        nextLinks;

    sankey.refresh();
};
```

Validate both collections before assignment and call `refresh()` once.

## Key Properties

### Sankey-Level Properties

```text
nodes             -> Sankey node collection.
links             -> Sankey link collection.
title             -> Main title string.
subTitle          -> Subtitle string.
titleStyle        -> Main-title appearance.
subTitleStyle     -> Subtitle appearance.
width             -> Component width.
height            -> Component height.
orientation       -> Horizontal or Vertical.
theme             -> Built-in EJ2 theme.
background        -> Component background color.
backgroundImage   -> Component background image.
border            -> Outer component border.
margin            -> Internal component margins.
nodeStyle         -> Global node appearance.
linkStyle         -> Global link appearance.
labelSettings     -> Node-label appearance.
tooltip           -> Tooltip configuration.
legendSettings    -> Legend configuration.
enableRtl         -> Right-to-left rendering.
accessibility     -> Accessibility configuration.
```

### Node Properties

```text
id     -> Unique node identifier.
label  -> Node label model.
color  -> Individual node color.
offset -> Position adjustment.
```

### Node-Style Properties

```text
width            -> Global node width.
padding          -> Node spacing.
fill             -> Global node fill.
stroke           -> Node-border color.
strokeWidth      -> Node-border width.
opacity          -> Normal node opacity.
highlightOpacity -> Highlighted-node opacity.
inactiveOpacity  -> Inactive-node opacity.
```

### Link Properties

```text
sourceId -> Source-node identifier.
targetId -> Target-node identifier.
value    -> Flow magnitude.
color    -> Individual link color.
```

### Link-Style Properties

```text
opacity          -> Normal link opacity.
highlightOpacity -> Highlighted-link opacity.
inactiveOpacity  -> Inactive-link opacity.
curvature        -> Link curvature.
colorType        -> Source, Target, or Blend.
```

### Label Settings

```text
visible    -> Label visibility.
fontFamily -> Label font family.
fontSize   -> Label font size.
fontWeight -> Label font weight.
fontStyle  -> Label font style.
color      -> Label text color.
padding    -> Label spacing.
```

### Accessibility Properties

```text
accessibilityDescription -> Sankey description.
accessibilityRole        -> Semantic role.
focusable                -> Focus enablement.
tabIndex                 -> Keyboard tab order.
```

### Common Events

```text
load                 -> Before Sankey rendering.
loaded               -> After Sankey rendering.
nodeRendering        -> Before a node renders.
linkRendering        -> Before a link renders.
labelRendering       -> Before a label renders.
tooltipRendering     -> Before a tooltip renders.
legendItemRendering  -> Before a legend item renders.
nodeEnter            -> Pointer enters a node.
nodeLeave            -> Pointer leaves a node.
nodeClick            -> Node click.
linkEnter            -> Pointer enters a link.
linkLeave            -> Pointer leaves a link.
linkClick            -> Link click.
sizeChanged          -> Sankey size changes.
beforeExport         -> Before export.
afterExport          -> After export.
exportCompleted      -> Export completion.
beforePrint          -> Before printing.
```

Use typed event interfaces exported by the installed package where available.

## Runtime Data Validation

```typescript
const validateSankeyData = (
    nodeCollection:
        SankeyNodeModel[],
    linkCollection:
        SankeyLinkModel[]
): void => {
    const nodeIds:
        Set<string> =
            new Set<string>();

    nodeCollection.forEach(
        (
            node:
                SankeyNodeModel
        ): void => {
            const id: string =
                String(
                    node.id ?? ''
                ).trim();

            if (!id) {
                throw new Error(
                    'Every Sankey node requires a nonempty ID.'
                );
            }

            if (nodeIds.has(id)) {
                throw new Error(
                    'Duplicate Sankey node ID: ' +
                    id
                );
            }

            if (
                node.label !==
                    undefined &&
                (
                    typeof node.label !==
                        'object' ||
                    node.label ===
                        null
                )
            ) {
                throw new Error(
                    'The label for "' +
                    id +
                    '" must use the Sankey label model.'
                );
            }

            nodeIds.add(id);
        }
    );

    linkCollection.forEach(
        (
            link:
                SankeyLinkModel
        ): void => {
            const sourceId:
                string =
                    String(
                        link.sourceId ??
                        ''
                    );

            const targetId:
                string =
                    String(
                        link.targetId ??
                        ''
                    );

            const value:
                number =
                    Number(
                        link.value
                    );

            if (
                !nodeIds.has(
                    sourceId
                )
            ) {
                throw new Error(
                    'Unknown source node: ' +
                    sourceId
                );
            }

            if (
                !nodeIds.has(
                    targetId
                )
            ) {
                throw new Error(
                    'Unknown target node: ' +
                    targetId
                );
            }

            if (
                sourceId ===
                targetId
            ) {
                throw new Error(
                    'A Sankey link cannot target its source node: ' +
                    sourceId
                );
            }

            if (
                !Number.isFinite(
                    value
                ) ||
                value <= 0
            ) {
                throw new Error(
                    'The link from "' +
                    sourceId +
                    '" to "' +
                    targetId +
                    '" requires a finite positive value.'
                );
            }
        }
    );
};
```

Self-link rejection is an application-level validation rule. Retain it only when self-referencing flows are invalid for the application.

## Accessibility Guidance

Provide:

- A visible heading.
- A concise diagram summary.
- A detailed accessibility description.
- Meaningful node labels.
- Tooltips.
- A legend when color interpretation is required.
- Visible keyboard focus.
- Native controls for external actions.
- A semantic data table for complex or decision-critical flows.
- Non-color status descriptions.
- Sufficient contrast.

Do not claim unconditional WCAG compliance.

Do not rely only on tooltips.

Do not rely only on red and green.

Do not add unsupported keyboard properties.

Test the documented keyboard behavior with the installed EJ2 version and application configuration.

## Performance Guidance

For complex Sankey data:

- Remove invalid links.
- Remove zero-value links.
- Aggregate duplicate links.
- Group insignificant categories.
- Shorten long labels.
- Disable unused modules.
- Avoid verbose render-event logging.
- Limit refresh frequency.
- Update nodes and links together.
- Call `refresh()` once per complete update.
- Debounce custom resize handling.
- Profile representative production data.
- Test on target mobile devices.

Do not add unsupported properties:

```typescript
enableVirtualization:
    true
```

```typescript
renderingMode:
    'SVG'
```

```typescript
enableGrouping:
    false
```

Do not claim that thousands of nodes have no performance impact.

## Cleanup Guidance

When a dynamic view removes the Sankey:

```typescript
sankey.destroy();
```

If a custom resize listener is used:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);
```

Clear pending timers:

```typescript
if (
    resizeTimer !== null
) {
    clearTimeout(
        resizeTimer
    );

    resizeTimer =
        null;
}
```

Do not use a `beforeunload` listener for ordinary view cleanup.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-charts is installed for TypeScript.
✅ Sankey is imported.
✅ SankeyNodeModel and SankeyLinkModel are imported as types.
✅ Every enabled TypeScript feature has a matching imported module.
✅ Every imported optional module is injected before construction.
✅ Unused modules are not injected.
✅ Global JavaScript does not call Sankey.Inject.
✅ The global EJ2 bundle loads before application code.
✅ The CDN URL ends in .min.js.
✅ The combined bundle is not mixed with individual scripts.
✅ The Sankey host element exists.
✅ The host has a measurable height.
✅ sankey.appendTo is called.
✅ The appendTo selector matches the host ID.
✅ Width and height use supported string values.
✅ height: auto is not used.
✅ Every node ID is nonempty.
✅ Every node ID is unique.
✅ Every sourceId matches an existing node ID.
✅ Every targetId matches an existing node ID.
✅ Identifier capitalization is consistent.
✅ Every link value is numeric.
✅ Every link value is finite.
✅ Every link value is greater than zero.
✅ Node labels use label.text.
✅ The title is configured as a string.
✅ The subtitle is configured as a separate string.
✅ Shared node appearance uses nodeStyle.
✅ Shared link appearance uses linkStyle.
✅ Individual node colors use node.color.
✅ Individual link colors use link.color.
✅ Tooltip is enabled only when SankeyTooltip is injected.
✅ Legend is visible only when SankeyLegend is injected.
✅ Export modules are added only when export is implemented.
✅ Unsupported nodeDefaults is not used.
✅ Unsupported selectionMode is not used.
✅ Unsupported Cartesian point events are not used.
✅ nodeRendering replaces nodeRender.
✅ linkRendering replaces linkRender.
✅ Horizontal and Vertical are used as orientations.
✅ enableRtl controls right-to-left rendering.
✅ Accessibility configuration uses supported properties.
✅ Important information is not communicated only through color.
✅ Runtime updates validate complete node and link collections.
✅ Runtime updates call refresh only once.
✅ Custom resize handling is debounced.
✅ Application-owned listeners and timers are cleaned up.
✅ sankey.destroy() is called when a dynamic host view is removed.
✅ Executable HTML uses actual angle brackets.
✅ No encoded HTML replaces executable markup.
✅ No rich-text anchors wrap CDN URLs.
✅ No malformed .jsscript URLs exist.
✅ No strong, br, data-lexical-text, or editor-generated classes remain.
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

### Nested Title Object

Incorrect:

```typescript
title: {
    text:
        'Sales Flow Diagram'
}
```

Correct:

```typescript
title:
    'Sales Flow Diagram'
```

### Plain-String Node Label

Incorrect:

```typescript
{
    id: 'Product A',
    label: 'Product A'
}
```

Correct:

```typescript
{
    id: 'Product A',

    label: {
        text: 'Product A'
    }
}
```

### Node Width and Padding on Individual Nodes

Incorrect:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Product A',
        width: 24,
        padding: 14
    }
];
```

Correct:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        nodeStyle: {
            width: 24,
            padding: 14
        }
    });
```

### Link Opacity on Individual Links

Incorrect:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 100,
        opacity: 0.5
    }
];
```

Correct:

```typescript
linkStyle: {
    opacity: 0.5
}
```

### Unsupported nodeDefaults

Incorrect:

```typescript
nodeDefaults: {
    width: 15,
    padding: 20
}
```

Correct:

```typescript
nodeStyle: {
    width: 15,
    padding: 20
}
```

### Unsupported Selection Mode

Incorrect:

```typescript
selectionMode:
    'Point'
```

Use interaction opacity:

```typescript
nodeStyle: {
    highlightOpacity: 1,
    inactiveOpacity: 0.25
},

linkStyle: {
    highlightOpacity: 1,
    inactiveOpacity: 0.15
}
```

### Unsupported Point Events

Avoid:

```typescript
pointMouseMove
pointClick
pointRender
selectionComplete
```

Use Sankey events:

```text
nodeEnter
nodeLeave
nodeClick
linkEnter
linkLeave
linkClick
nodeRendering
linkRendering
```

### Incorrect Rendering Event Names

Incorrect:

```typescript
nodeRender:
    handleNodeRender,

linkRender:
    handleLinkRender
```

Correct:

```typescript
nodeRendering:
    handleNodeRendering,

linkRendering:
    handleLinkRendering
```

### Missing Tooltip Module

Incorrect:

```typescript
import {
    Sankey
} from '@syncfusion/ej2-charts';

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
import {
    Sankey
} from '@syncfusion/ej2-charts';

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

### Module Injection After Construction

Incorrect:

```typescript
const sankey: Sankey =
    new Sankey({
        tooltip: {
            enable: true
        }
    });

Sankey.Inject(
    SankeyTooltip
);
```

Correct:

```typescript
Sankey.Inject(
    SankeyTooltip
);

const sankey: Sankey =
    new Sankey({
        tooltip: {
            enable: true
        }
    });
```

### Unsupported Responsive Height

Incorrect:

```typescript
height:
    'auto'
```

Correct:

```typescript
width:
    '100%',

height:
    '520px'
```

### Percentage Height Without Parent Height

Potentially unusable:

```typescript
height:
    '100%'
```

Use a definite height or define the height of every relevant ancestor.

### Missing Source Node

Incorrect:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Revenue'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Sales',
        targetId: 'Revenue',
        value: 100
    }
];
```

Correct:

```typescript
const nodes: SankeyNodeModel[] = [
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
const nodes: SankeyNodeModel[] = [
    {
        id: 'Product A'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'product a',
        targetId: 'Revenue',
        value: 100
    }
];
```

Correct:

```typescript
sourceId:
    'Product A'
```

### String Link Value

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

### Object-Based Background

Incorrect:

```typescript
background: {
    color: '#ffffff'
}
```

Correct:

```typescript
background:
    '#ffffff'
```

### Unsupported linkColorMode

Incorrect:

```typescript
linkColorMode:
    'Source'
```

Correct:

```typescript
linkStyle: {
    colorType:
        'Source'
}
```

### Unsupported Palette

Avoid:

```typescript
palette: [
    '#2563eb',
    '#10b981'
]
```

Use individual node colors:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Input',
        color: '#2563eb'
    },
    {
        id: 'Output',
        color: '#10b981'
    }
];
```

### Unsupported Keyboard Properties

Incorrect:

```typescript
allowKeyboardNavigation:
    true
```

Use the built-in keyboard behavior and supported accessibility configuration.

### Unconditional Accessibility Claim

Avoid:

```text
The application is automatically WCAG compliant.
```

Use:

```text
The Sankey component provides accessibility features.
The complete application must still be tested against
its required accessibility standard.
```

### Unsupported Virtualization

Incorrect:

```typescript
enableVirtualization:
    true
```

Aggregate or reduce the source data before rendering.

### Unsupported Rendering Mode

Incorrect:

```typescript
renderingMode:
    'SVG'
```

Do not add a rendering-mode property unless it exists in the installed Sankey API.

### Unsupported Grouping

Incorrect:

```typescript
enableGrouping:
    false
```

Simplify the node and link collections before assignment.

### Blind Runtime Append

Unsafe:

```typescript
sankey.nodes = [
    ...sankey.nodes,
    ...moreNodes
];

sankey.links = [
    ...sankey.links,
    ...moreLinks
];

sankey.refresh();
```

Validate the complete next state:

```typescript
const nextNodes:
    SankeyNodeModel[] = [
        ...sankey.nodes,
        ...moreNodes
    ];

const nextLinks:
    SankeyLinkModel[] = [
        ...sankey.links,
        ...moreLinks
    ];

validateSankeyData(
    nextNodes,
    nextLinks
);

sankey.nodes =
    nextNodes;

sankey.links =
    nextLinks;

sankey.refresh();
```

### Anonymous Resize Handler

Incorrect:

```typescript
window.addEventListener(
    'resize',
    (): void => {
        sankey.refresh();
    }
);
```

Correct:

```typescript
const handleResize =
    (): void => {
        sankey.refresh();
    };

window.addEventListener(
    'resize',
    handleResize
);
```

Cleanup:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);
```

### Encoded Executable HTML

Incorrect:

```html
&lt;div id="sankey-container"&gt;&lt;/div&gt;
```

Correct:

```html
<div id="sankey-container"></div>
```

### Malformed CDN Markup

Incorrect:

```html
https://cdn.syncfusion.com/...
    https://cdn.syncfusion.com/...
</a>
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Editor-Generated Markup

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, commands, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```