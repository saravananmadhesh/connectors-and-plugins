# Nodes Configuration

Nodes are the fundamental building blocks of a Sankey diagram. They represent sources, destinations, and intermediate stages through which values flow.

This guide explains how to define nodes, configure global and individual appearance, adjust node positions, style labels, customize nodes dynamically, and validate node and link relationships.

## Table of Contents

- #node-structure
- #node-and-link-relationships
- #node-appearance
- #node-positioning
- #node-labels
- #dynamic-node-customization
- #complete-typescript-example
- [complete-javascript-example
- #runtime-validation
- [best-practices
- [combined-mistakes-and-future-references

## Node Structure

Define Sankey nodes through the `nodes` property.

In TypeScript, use `SankeyNodeModel[]` to provide compile-time type checking.

```typescript
import type {
    SankeyNodeModel
} from '@syncfusion/ej2-charts';

const nodes: SankeyNodeModel[] = [
    {
        id: 'Input A'
    },
    {
        id: 'Input B'
    },
    {
        id: 'Processing'
    },
    {
        id: 'Output'
    }
];
```

The equivalent JavaScript collection does not require model types.

```javascript
var nodes = [
    {
        id: 'Input A'
    },
    {
        id: 'Input B'
    },
    {
        id: 'Processing'
    },
    {
        id: 'Output'
    }
];
```

### Supported Node Properties

Common individual node properties include:

```text
id     -> Unique identifier referenced by links.
label  -> Data-label configuration for the node.
color  -> Individual node color.
offset -> Adjustment from the automatically calculated position.
```

Complete individual node:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Product',

        label: {
            text: 'Product Revenue'
        },

        color: '#4472c4',
        offset: -20
    },
    {
        id: 'Revenue',

        label: {
            text: 'Total Revenue'
        },

        color: '#70ad47'
    }
];
```

The `label` property is a label model. Do not assign a plain string when the installed Sankey model expects an object.

Incorrect:

```typescript
{
    id: 'Product',
    label: 'Product Revenue'
}
```

Correct:

```typescript
{
    id: 'Product',

    label: {
        text: 'Product Revenue'
    }
}
```

Properties such as the following belong to the chart-level `nodeStyle` configuration:

```text
width
padding
fill
stroke
strokeWidth
opacity
highlightOpacity
inactiveOpacity
```

Do not assign these global style properties directly to individual node objects.

## Node and Link Relationships

Every `sourceId` and `targetId` in the links collection must match an existing node `id`.

### TypeScript

```typescript
import type {
    SankeyLinkModel,
    SankeyNodeModel
} from '@syncfusion/ej2-charts';

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
    }
];
```

### JavaScript

```javascript
var nodes = [
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
    }
];
```

Identifiers are case-sensitive.

These identifiers are different:

```text
Revenue
revenue
REVENUE
```

A link should reference the node `id`, not the visible label.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'dept-sales',

        label: {
            text: 'Sales Department'
        }
    },
    {
        id: 'revenue',

        label: {
            text: 'Revenue Stream'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'dept-sales',
        targetId: 'revenue',
        value: 120
    }
];
```

## Node Appearance

Node appearance can be configured at two levels:

1. Use `nodeStyle` to apply common styles to all nodes.
2. Use the individual node `color` property to override a specific node color.

## Global Node Styling

Use the chart-level `nodeStyle` property.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        nodeStyle: {
            width: 24,
            padding: 14,
            fill: '#4472c4',
            stroke: '#2e5090',
            strokeWidth: 2,
            opacity: 0.9,
            highlightOpacity: 1,
            inactiveOpacity: 0.3
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Common global node-style properties include:

```text
width            -> Width of each node rectangle.
padding          -> Spacing used by the node layout.
fill             -> Common node fill color.
stroke           -> Node-border color.
strokeWidth      -> Node-border thickness.
opacity          -> Normal node opacity.
highlightOpacity -> Active-node opacity.
inactiveOpacity  -> Inactive-node opacity during interaction.
```

Opacity values should remain between `0` and `1`.

```typescript
nodeStyle: {
    opacity: 0.9,
    highlightOpacity: 1,
    inactiveOpacity: 0.25
}
```

## Individual Node Colors

Use `color` when nodes require different colors.

### TypeScript

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Input A',

        label: {
            text: 'Source A'
        },

        color: '#3b82f6'
    },
    {
        id: 'Input B',

        label: {
            text: 'Source B'
        },

        color: '#2563eb'
    },
    {
        id: 'Processing',

        label: {
            text: 'Processing'
        },

        color: '#9333ea'
    },
    {
        id: 'Output A',

        label: {
            text: 'Output A'
        },

        color: '#10b981'
    },
    {
        id: 'Output B',

        label: {
            text: 'Output B'
        },

        color: '#059669'
    }
];
```

### JavaScript

```javascript
var nodes = [
    {
        id: 'Input A',

        label: {
            text: 'Source A'
        },

        color: '#3b82f6'
    },
    {
        id: 'Input B',

        label: {
            text: 'Source B'
        },

        color: '#2563eb'
    },
    {
        id: 'Processing',

        label: {
            text: 'Processing'
        },

        color: '#9333ea'
    },
    {
        id: 'Output A',

        label: {
            text: 'Output A'
        },

        color: '#10b981'
    },
    {
        id: 'Output B',

        label: {
            text: 'Output B'
        },

        color: '#059669'
    }
];
```

Individual colors are useful for:

- Differentiating source and destination nodes.
- Highlighting intermediate stages.
- Identifying loss nodes.
- Applying category-specific colors.
- Matching application branding.
- Providing data-driven formatting.

Do not rely only on color to communicate node meaning. Also provide descriptive node labels and tooltips.

## Node Border Customization

Configure node borders globally through `nodeStyle`.

```typescript
nodeStyle: {
    stroke: '#1e3a8a',
    strokeWidth: 2
}
```

Complete configuration:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        nodeStyle: {
            fill: '#4472c4',
            stroke: '#1e3a8a',
            strokeWidth: 2,
            opacity: 0.9
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use a border color that remains distinguishable from the node fill and page background.

## Node Width and Padding

Configure node width and padding globally.

```typescript
nodeStyle: {
    width: 30,
    padding: 16
}
```

The `width` property controls the node rectangle width. It does not set an individual node height.

The rendered flow dimension of a node is calculated from its connected link values.

Do not assign a fixed per-node height.

Larger padding values increase visual separation but reduce the space available for the flow layout.

## Node Interaction Opacity

Use the node-style opacity properties to configure interaction feedback.

```typescript
nodeStyle: {
    opacity: 0.9,
    highlightOpacity: 1,
    inactiveOpacity: 0.2
}
```

Property behavior:

```text
opacity          -> Normal node appearance.
highlightOpacity -> Active or highlighted node.
inactiveOpacity  -> Unrelated nodes during interaction.
```

Avoid making inactive nodes completely invisible unless that behavior is intentional.

## Node Positioning

The Sankey layout engine automatically determines node layers and positions from the link relationships.

### Horizontal Orientation

```typescript
const sankey: Sankey =
    new Sankey({
        orientation: 'Horizontal',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

In Horizontal orientation, flow generally progresses from left to right.

For this orientation, `offset` adjusts a node horizontally relative to its calculated position.

### Vertical Orientation

```typescript
const sankey: Sankey =
    new Sankey({
        orientation: 'Vertical',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

In Vertical orientation, flow generally progresses from top to bottom.

For this orientation, `offset` adjusts a node vertically relative to its calculated position.

## Node Offset

Use the individual node `offset` property for controlled adjustments.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Input A',
        offset: -30
    },
    {
        id: 'Input B',
        offset: 30
    },
    {
        id: 'Processing'
    },
    {
        id: 'Output A',
        offset: -20
    },
    {
        id: 'Output B',
        offset: 20
    }
];
```

Use offsets sparingly.

Large values can cause:

- Node overlap.
- Clipped labels.
- Link intersections.
- Unbalanced spacing.
- Layout problems at smaller sizes.

Test node offsets at every supported component size.

## Node Labels

The node `id` resolves links. The node `label.text` controls the visible text.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'dept-sales',

        label: {
            text: 'Sales Department'
        }
    },
    {
        id: 'dept-marketing',

        label: {
            text: 'Marketing Department'
        }
    },
    {
        id: 'revenue',

        label: {
            text: 'Revenue Stream'
        }
    }
];
```

Links continue to reference the stable IDs:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'dept-sales',
        targetId: 'revenue',
        value: 120
    },
    {
        sourceId: 'dept-marketing',
        targetId: 'revenue',
        value: 80
    }
];
```

This allows the visible label text to change without breaking link relationships.

## Global Label Styling

Configure labels through `labelSettings`.

```typescript
labelSettings: {
    visible: true,

    font: {
        fontFamily: 'Arial',
        size: '13px',
        fontWeight: '500',
        fontStyle: 'Normal',
        color: '#111827'
    }
}
```

Complete example:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        labelSettings: {
            visible: true,

            font: {
                fontFamily: 'Arial',
                size: '13px',
                fontWeight: '500',
                fontStyle: 'Normal',
                color: '#111827'
            }
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Keep labels concise when:

- The diagram contains many nodes.
- The component uses responsive width.
- Smaller screens must be supported.
- The diagram uses Vertical orientation.
- Node offsets are applied.
- A side-positioned legend is visible.

## Dynamic Node Customization

Use `nodeRendering` to customize nodes before they are rendered.

## Node Rendering Event

### TypeScript

```typescript
import type {
    SankeyNodeRenderEventArgs
} from '@syncfusion/ej2-charts';

const handleNodeRendering = (
    args: SankeyNodeRenderEventArgs
): void => {
    if (args.node.id === 'Processing') {
        args.node.color =
            '#9333ea';
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

### JavaScript

```javascript
function handleNodeRendering(args) {
    if (
        args.node.id ===
        'Processing'
    ) {
        args.node.color =
            '#9333ea';
    }
}

var sankey =
    new ej.charts.Sankey({
        nodes: nodes,
        links: links,
        nodeRendering:
            handleNodeRendering
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use the event name:

```text
nodeRendering
```

Do not use:

```text
nodeRender
```

## Data-Driven Node Colors

Use a color map to centralize conditional node colors.

### TypeScript

```typescript
import type {
    SankeyNodeRenderEventArgs
} from '@syncfusion/ej2-charts';

const nodeColors:
    Record<string, string> = {
        Solar: '#f59e0b',
        Wind: '#3b82f6',
        Grid: '#8b5cf6',
        Residential: '#10b981',
        Commercial: '#06b6d4',
        Loss: '#ef4444'
    };

const handleNodeRendering = (
    args: SankeyNodeRenderEventArgs
): void => {
    const nodeId: string =
        String(args.node.id);

    const color:
        string | undefined =
            nodeColors[nodeId];

    if (color) {
        args.node.color =
            color;
    }
};
```

### JavaScript

```javascript
var nodeColors = {
    Solar: '#f59e0b',
    Wind: '#3b82f6',
    Grid: '#8b5cf6',
    Residential: '#10b981',
    Commercial: '#06b6d4',
    Loss: '#ef4444'
};

function handleNodeRendering(args) {
    var nodeId =
        String(args.node.id);

    var color =
        nodeColors[nodeId];

    if (color) {
        args.node.color =
            color;
    }
}
```

## Complete TypeScript Example

### HTML

```html
<main class="page-container">
    <section
        aria-labelledby="sankey-heading"
        aria-describedby="sankey-description"
    >
        <header class="sankey-header">
            <h1 id="sankey-heading">
                Energy Distribution
            </h1>

            <p id="sankey-description">
                The diagram shows how solar and wind energy
                move through the power grid to residential,
                commercial, and transmission-loss stages.
            </p>
        </header>

        <div id="sankey-container"></div>
    </section>
</main>
```

### CSS

```css
.page-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    box-sizing: border-box;
}

.sankey-header {
    margin-bottom: 16px;
}

.sankey-header h1 {
    margin: 0 0 8px;
    color: #111827;
    font-family: "Segoe UI", sans-serif;
    font-size: 24px;
}

.sankey-header p {
    margin: 0;
    color: #374151;
    font-family: "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 1.5;
}

#sankey-container {
    width: 100%;
    min-height: 520px;
}
```

### TypeScript

```typescript
import {
    Sankey,
    SankeyLegend,
    SankeyTooltip,
    type SankeyLinkModel,
    type SankeyNodeModel,
    type SankeyNodeRenderEventArgs
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip,
    SankeyLegend
);

const nodes: SankeyNodeModel[] = [
    {
        id: 'Solar',

        label: {
            text: 'Solar Energy'
        },

        color: '#f59e0b',
        offset: -25
    },
    {
        id: 'Wind',

        label: {
            text: 'Wind Energy'
        },

        color: '#3b82f6',
        offset: 25
    },
    {
        id: 'Grid',

        label: {
            text: 'Power Grid'
        },

        color: '#8b5cf6'
    },
    {
        id: 'Residential',

        label: {
            text: 'Residential Use'
        },

        color: '#10b981',
        offset: -30
    },
    {
        id: 'Commercial',

        label: {
            text: 'Commercial Use'
        },

        color: '#06b6d4'
    },
    {
        id: 'Loss',

        label: {
            text: 'Transmission Loss'
        },

        color: '#ef4444',
        offset: 30
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Solar',
        targetId: 'Grid',
        value: 85
    },
    {
        sourceId: 'Wind',
        targetId: 'Grid',
        value: 115
    },
    {
        sourceId: 'Grid',
        targetId: 'Residential',
        value: 90
    },
    {
        sourceId: 'Grid',
        targetId: 'Commercial',
        value: 85
    },
    {
        sourceId: 'Grid',
        targetId: 'Loss',
        value: 25
    }
];

const nodeColors:
    Record<string, string> = {
        Solar: '#f59e0b',
        Wind: '#3b82f6',
        Grid: '#7c3aed',
        Residential: '#10b981',
        Commercial: '#06b6d4',
        Loss: '#dc2626'
    };

const handleNodeRendering = (
    args: SankeyNodeRenderEventArgs
): void => {
    const nodeId: string =
        String(args.node.id);

    const color:
        string | undefined =
            nodeColors[nodeId];

    if (color) {
        args.node.color =
            color;
    }
};

const validateSankeyData = (
    sankeyNodes:
        SankeyNodeModel[],
    sankeyLinks:
        SankeyLinkModel[]
): void => {
    const nodeIds:
        Set<string> =
            new Set<string>();

    sankeyNodes.forEach(
        (
            node: SankeyNodeModel
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

            nodeIds.add(id);
        }
    );

    sankeyLinks.forEach(
        (
            link: SankeyLinkModel
        ): void => {
            const sourceId: string =
                String(
                    link.sourceId ?? ''
                );

            const targetId: string =
                String(
                    link.targetId ?? ''
                );

            const value: number =
                Number(link.value);

            if (!nodeIds.has(sourceId)) {
                throw new Error(
                    'Unknown source node: ' +
                    sourceId
                );
            }

            if (!nodeIds.has(targetId)) {
                throw new Error(
                    'Unknown target node: ' +
                    targetId
                );
            }

            if (
                !Number.isFinite(value) ||
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

validateSankeyData(
    nodes,
    links
);

const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        title:
            'Energy Distribution',
        subTitle:
            'Generation, distribution, and consumption',
        orientation:
            'Horizontal',

        nodes,
        links,

        nodeStyle: {
            width: 24,
            padding: 14,
            stroke: '#1f2937',
            strokeWidth: 1,
            opacity: 0.9,
            highlightOpacity: 1,
            inactiveOpacity: 0.25
        },

        linkStyle: {
            opacity: 0.5,
            highlightOpacity: 0.9,
            inactiveOpacity: 0.2,
            curvature: 0.55,
            colorType: 'Blend'
        },

        labelSettings: {
            visible: true,

            font: {
                fontFamily: 'Arial',
                size: '13px',
                fontWeight: '500',
                fontStyle: 'Normal',
                color: '#111827'
            }
        },

        tooltip: {
            enable: true
        },

        legendSettings: {
            visible: true
        },

        nodeRendering:
            handleNodeRendering
    });

sankey.appendTo(
    '#sankey-container'
);
```

## Complete JavaScript Example

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Sankey Nodes Configuration</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .page-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px;
            box-sizing: border-box;
        }

        .sankey-header {
            margin-bottom: 16px;
        }

        .sankey-header h1 {
            margin: 0 0 8px;
            color: #111827;
            font-family: "Segoe UI", sans-serif;
            font-size: 24px;
        }

        .sankey-header p {
            margin: 0;
            color: #374151;
            font-family: "Segoe UI", sans-serif;
            font-size: 14px;
            line-height: 1.5;
        }

        #sankey-container {
            width: 100%;
            min-height: 520px;
        }
    </style>
</head>

<body>
    <main class="page-container">
        <section
            aria-labelledby="sankey-heading"
            aria-describedby="sankey-description"
        >
            <header class="sankey-header">
                <h1 id="sankey-heading">
                    Energy Distribution
                </h1>

                <p id="sankey-description">
                    The diagram shows how solar and wind energy
                    move through the power grid to residential,
                    commercial, and transmission-loss stages.
                </p>
            </header>

            <div id="sankey-container"></div>
        </section>
    </main>

    <script>
        var nodes = [
            {
                id: 'Solar',

                label: {
                    text: 'Solar Energy'
                },

                color: '#f59e0b',
                offset: -25
            },
            {
                id: 'Wind',

                label: {
                    text: 'Wind Energy'
                },

                color: '#3b82f6',
                offset: 25
            },
            {
                id: 'Grid',

                label: {
                    text: 'Power Grid'
                },

                color: '#8b5cf6'
            },
            {
                id: 'Residential',

                label: {
                    text: 'Residential Use'
                },

                color: '#10b981',
                offset: -30
            },
            {
                id: 'Commercial',

                label: {
                    text: 'Commercial Use'
                },

                color: '#06b6d4'
            },
            {
                id: 'Loss',

                label: {
                    text:
                        'Transmission Loss'
                },

                color: '#ef4444',
                offset: 30
            }
        ];

        var links = [
            {
                sourceId: 'Solar',
                targetId: 'Grid',
                value: 85
            },
            {
                sourceId: 'Wind',
                targetId: 'Grid',
                value: 115
            },
            {
                sourceId: 'Grid',
                targetId: 'Residential',
                value: 90
            },
            {
                sourceId: 'Grid',
                targetId: 'Commercial',
                value: 85
            },
            {
                sourceId: 'Grid',
                targetId: 'Loss',
                value: 25
            }
        ];

        var nodeColors = {
            Solar: '#f59e0b',
            Wind: '#3b82f6',
            Grid: '#7c3aed',
            Residential: '#10b981',
            Commercial: '#06b6d4',
            Loss: '#dc2626'
        };

        function handleNodeRendering(
            args
        ) {
            var nodeId =
                String(args.node.id);

            var color =
                nodeColors[nodeId];

            if (color) {
                args.node.color =
                    color;
            }
        }

        function validateSankeyData(
            sankeyNodes,
            sankeyLinks
        ) {
            var nodeIds =
                new Set();

            sankeyNodes.forEach(
                function (node) {
                    var id =
                        String(
                            node.id || ''
                        ).trim();

                    if (!id) {
                        throw new Error(
                            'Every Sankey node requires a nonempty ID.'
                        );
                    }

                    if (
                        nodeIds.has(id)
                    ) {
                        throw new Error(
                            'Duplicate Sankey node ID: ' +
                            id
                        );
                    }

                    nodeIds.add(id);
                }
            );

            sankeyLinks.forEach(
                function (link) {
                    var sourceId =
                        String(
                            link.sourceId ||
                            ''
                        );

                    var targetId =
                        String(
                            link.targetId ||
                            ''
                        );

                    var value =
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
        }

        validateSankeyData(
            nodes,
            links
        );

        var sankey =
            new ej.charts.Sankey({
                width: '100%',
                height: '520px',
                title:
                    'Energy Distribution',
                subTitle:
                    'Generation, distribution, and consumption',
                orientation:
                    'Horizontal',

                nodes: nodes,
                links: links,

                nodeStyle: {
                    width: 24,
                    padding: 14,
                    stroke: '#1f2937',
                    strokeWidth: 1,
                    opacity: 0.9,
                    highlightOpacity: 1,
                    inactiveOpacity: 0.25
                },

                linkStyle: {
                    opacity: 0.5,
                    highlightOpacity: 0.9,
                    inactiveOpacity: 0.2,
                    curvature: 0.55,
                    colorType: 'Blend'
                },

                labelSettings: {
                    visible: true,

                    font: {
                        fontFamily: 'Arial',
                        size: '13px',
                        fontWeight: '500',
                        fontStyle: 'Normal',
                        color: '#111827'
                    }
                },

                tooltip: {
                    enable: true
                },

                legendSettings: {
                    visible: true
                },

                nodeRendering:
                    handleNodeRendering
            });

        sankey.appendTo(
            '#sankey-container'
        );
    </script>
</body>
</html>
```

## Runtime Validation

Before initializing the Sankey component, validate:

1. Every node has a nonempty ID.
2. Every node ID is unique.
3. Every source node exists.
4. Every target node exists.
5. Every link value is numeric.
6. Every link value is finite.
7. Every link value is greater than zero.
8. Optional TypeScript modules are imported and injected when required.
9. The host element exists.
10. The host element has a measurable height.

### TypeScript Validation Function

```typescript
const validateSankeyData = (
    nodes: SankeyNodeModel[],
    links: SankeyLinkModel[]
): void => {
    const nodeIds:
        Set<string> =
            new Set<string>();

    for (
        const node of nodes
    ) {
        const id: string =
            String(
                node.id ?? ''
            ).trim();

        if (!id) {
            throw new Error(
                'Every Sankey node must have a nonempty ID.'
            );
        }

        if (nodeIds.has(id)) {
            throw new Error(
                'Duplicate Sankey node ID: ' +
                id
            );
        }

        nodeIds.add(id);
    }

    for (
        const link of links
    ) {
        const sourceId: string =
            String(
                link.sourceId ?? ''
            );

        const targetId: string =
            String(
                link.targetId ?? ''
            );

        const value: number =
            Number(link.value);

        if (
            !nodeIds.has(
                sourceId
            )
        ) {
            throw new Error(
                'The source node "' +
                sourceId +
                '" does not exist.'
            );
        }

        if (
            !nodeIds.has(
                targetId
            )
        ) {
            throw new Error(
                'The target node "' +
                targetId +
                '" does not exist.'
            );
        }

        if (
            !Number.isFinite(value) ||
            value <= 0
        ) {
            throw new Error(
                'The link from "' +
                sourceId +
                '" to "' +
                targetId +
                '" must have a finite positive value.'
            );
        }
    }
};
```

Call the validator before creating the Sankey:

```typescript
validateSankeyData(
    nodes,
    links
);

const sankey: Sankey =
    new Sankey({
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

## Best Practices

1. Use unique and stable node IDs.

```typescript
{
    id: 'department-sales',

    label: {
        text: 'Sales Department'
    }
}
```

2. Keep node IDs separate from visible labels.

3. Use `nodeStyle` for styling shared by all nodes.

```typescript
nodeStyle: {
    width: 24,
    padding: 14,
    opacity: 0.9
}
```

4. Use individual `color` values only when nodes require distinct colors.

5. Use a consistent color strategy for source, intermediate, destination, and loss nodes.

6. Keep offsets small and test them at multiple component sizes.

7. Use `nodeRendering` for conditional or data-driven customization.

8. Use `labelSettings` for global label appearance.

9. Import and inject every optional TypeScript module used by the configuration.

10. Avoid injecting unused feature modules.

11. Validate nodes and links before rendering dynamic data.

12. Keep labels concise and descriptive.

13. Provide meaningful supporting text so users do not depend only on node colors.

14. Destroy the Sankey instance when the host view is removed in applications with dynamic views.

```typescript
sankey.destroy();
```

## Combined Mistakes and Future References

### Global Style Properties on Individual Nodes

Incorrect:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Revenue',
        width: 40,
        height: 60,
        padding: 20,
        fill: '#4472c4',
        opacity: 0.8
    }
];
```

Correct:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Revenue',
        color: '#4472c4'
    }
];

const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        nodeStyle: {
            width: 40,
            padding: 20,
            opacity: 0.8
        }
    });
```

### Arbitrary Individual Node Height

Do not assign a fixed height to an individual node.

The node flow dimension is calculated from its link values.

Use:

```typescript
nodeStyle: {
    width: 24
}
```

### Incorrect Plain-String Label

Incorrect:

```typescript
{
    id: 'Revenue',
    label: 'Total Revenue'
}
```

Correct:

```typescript
{
    id: 'Revenue',

    label: {
        text: 'Total Revenue'
    }
}
```

### Unsupported nodeDefaults

Incorrect:

```typescript
nodeDefaults: {
    fill: '#4472c4',

    label: {
        fontSize: 12
    }
}
```

Correct:

```typescript
nodeStyle: {
    fill: '#4472c4'
},

labelSettings: {
    visible: true,

    font: {
        size: '12px'
    }
}
```

### Incorrect Event Name

Incorrect:

```typescript
nodeRender: (
    args
): void => {
    args.fill =
        '#4472c4';
}
```

Correct:

```typescript
nodeRendering: (
    args:
        SankeyNodeRenderEventArgs
): void => {
    args.node.color =
        '#4472c4';
}
```

### Unsupported Node Selection API

Do not use Cartesian Chart selection settings:

```typescript
selectionMode: 'Point'
```

Do not call an unsupported method:

```typescript
sankey.nodeSelection([
    {
        id: 'Product A'
    }
]);
```

Use interaction opacity:

```typescript
nodeStyle: {
    opacity: 0.9,
    highlightOpacity: 1,
    inactiveOpacity: 0.25
}
```

### Unsupported Node Alignment

Do not assume the following property exists:

```typescript
nodeAlignment:
    'Top'
```

Use automatic Sankey layout and apply small node offsets only when required.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Product A',
        offset: -25
    },
    {
        id: 'Product B',
        offset: 25
    }
];
```

### Incorrect Offset Direction

Do not describe Horizontal orientation offsets as vertical movement.

Use the documented orientation behavior:

```text
Horizontal orientation -> Horizontal offset.
Vertical orientation   -> Vertical offset.
```

### CSS Gradient Used as SVG Fill

Incorrect:

```typescript
nodeStyle: {
    fill: 'url(#gradient)'
}
```

with:

```css
#gradient {
    background:
        linear-gradient(
            135deg,
            #667eea,
            #764ba2
        );
}
```

A CSS background gradient does not create an SVG paint server.

Use a supported solid color:

```typescript
nodeStyle: {
    fill: '#667eea'
}
```

### Missing Feature Modules

Incorrect:

```typescript
import {
    Sankey
} from '@syncfusion/ej2-charts';

const sankey: Sankey =
    new Sankey({
        tooltip: {
            enable: true
        },

        legendSettings: {
            visible: true
        }
    });
```

Correct:

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

### Duplicate Node IDs

Incorrect:

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

Correct:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Product Revenue'
    },
    {
        id: 'Service Revenue'
    }
];
```

### Missing or Mismatched Identifier

Incorrect:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Product A'
    },
    {
        id: 'Revenue'
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
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Product A',
        targetId: 'Revenue',
        value: 100
    }
];
```

### Label Used as Link Identifier

Incorrect:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'dept-sales',

        label: {
            text: 'Sales Department'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId:
            'Sales Department',
        targetId: 'revenue',
        value: 100
    }
];
```

Correct:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId:
            'dept-sales',
        targetId: 'revenue',
        value: 100
    }
];
```

### Invalid Link Values

Incorrect:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Solar',
        targetId: 'Grid',
        value: 0
    },
    {
        sourceId: 'Wind',
        targetId: 'Grid',
        value: -20
    }
];
```

Correct:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Solar',
        targetId: 'Grid',
        value: 85
    },
    {
        sourceId: 'Wind',
        targetId: 'Grid',
        value: 115
    }
];
```

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

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, templates, commands, or script URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```