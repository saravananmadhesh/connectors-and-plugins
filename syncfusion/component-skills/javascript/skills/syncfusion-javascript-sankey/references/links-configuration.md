# Links Configuration

Links represent quantitative connections between nodes in a Sankey diagram. Each link identifies a source node, a target node, and a numeric value that determines the rendered thickness of the flow.

This guide explains how to define links, configure global and individual appearance, control color and curvature, validate flow values, handle multi-stage flows, customize links dynamically, and process link interactions.

## Table of Contents

- #link-structure
- #link-and-node-relationship
- #link-styling
- #value-configuration
- #multi-link-scenarios
- #link-interactions
- #dynamic-link-customization
- #complete-typescript-example
- #complete-javascript-example
- #runtime-data-validation
- #real-world-examples
- #best-practices
- #combined-mistakes-and-future-references

## Link Structure

Define Sankey connections through the `links` property.

In TypeScript, use `SankeyLinkModel[]` for compile-time validation.

```typescript
import type {
    SankeyLinkModel
} from '@syncfusion/ej2-charts';

const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 100
    },
    {
        sourceId: 'B',
        targetId: 'C',
        value: 80
    }
];
```

The equivalent JavaScript collection does not require a model type.

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
        value: 80
    }
];
```

### Supported Link Properties

The primary properties of an individual Sankey link are:

```text
sourceId -> Identifies the node where the flow begins.
targetId -> Identifies the node where the flow ends.
value    -> Defines the flow magnitude and rendered thickness.
color    -> Overrides the generated color for an individual link.
```

Example:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Sales',
        targetId: 'Revenue',
        value: 500,
        color: '#10b981'
    },
    {
        sourceId: 'Sales',
        targetId: 'Expenses',
        value: 300,
        color: '#ef4444'
    }
];
```

The following properties belong to the chart-level `linkStyle` configuration rather than individual link objects:

```text
opacity
highlightOpacity
inactiveOpacity
curvature
colorType
```

Correct global link configuration:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        linkStyle: {
            opacity: 0.55,
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

## Link and Node Relationship

Every `sourceId` and `targetId` must exactly match the `id` of an existing node.

### TypeScript

```typescript
import type {
    SankeyLinkModel,
    SankeyNodeModel
} from '@syncfusion/ej2-charts';

const nodes: SankeyNodeModel[] = [
    {
        id: 'Product A',

        label: {
            text: 'Product A'
        }
    },
    {
        id: 'Revenue',

        label: {
            text: 'Total Revenue'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Product A',
        targetId: 'Revenue',
        value: 500
    }
];
```

### JavaScript

```javascript
var nodes = [
    {
        id: 'Product A',

        label: {
            text: 'Product A'
        }
    },
    {
        id: 'Revenue',

        label: {
            text: 'Total Revenue'
        }
    }
];

var links = [
    {
        sourceId: 'Product A',
        targetId: 'Revenue',
        value: 500
    }
];
```

Links reference node IDs, not visible labels.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'product-a',

        label: {
            text: 'Product A'
        }
    },
    {
        id: 'total-revenue',

        label: {
            text: 'Total Revenue'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'product-a',
        targetId: 'total-revenue',
        value: 500
    }
];
```

Identifiers are case-sensitive.

These values are different:

```text
Product A
product a
PRODUCT A
```

## Link Styling

Link appearance can be configured at two levels:

1. Use the individual `color` property for a specific link.
2. Use `linkStyle` for global link appearance and interaction behavior.

## Global Link Style

Use `linkStyle` to configure all links.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        linkStyle: {
            opacity: 0.55,
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

Global link-style properties:

```text
opacity          -> Normal link opacity.
highlightOpacity -> Opacity of the active or hovered link.
inactiveOpacity  -> Opacity of unrelated links during interaction.
curvature        -> Curvature of the link path.
colorType        -> Source, Target, or Blend color behavior.
```

Typical defaults are:

```text
opacity          -> 0.35
highlightOpacity -> 1
inactiveOpacity  -> 0.3
curvature        -> 0.55
colorType        -> Blend
```

Opacity and curvature values should normally remain between `0` and `1`.

## Individual Link Colors

Use `color` when a specific link requires a fixed color.

### TypeScript

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Input',
        targetId: 'Processing',
        value: 1000,
        color: '#3b82f6'
    },
    {
        sourceId: 'Processing',
        targetId: 'Output',
        value: 900,
        color: '#10b981'
    },
    {
        sourceId: 'Processing',
        targetId: 'Waste',
        value: 100,
        color: '#ef4444'
    }
];
```

### JavaScript

```javascript
var links = [
    {
        sourceId: 'Input',
        targetId: 'Processing',
        value: 1000,
        color: '#3b82f6'
    },
    {
        sourceId: 'Processing',
        targetId: 'Output',
        value: 900,
        color: '#10b981'
    },
    {
        sourceId: 'Processing',
        targetId: 'Waste',
        value: 100,
        color: '#ef4444'
    }
];
```

Individual colors are useful for:

- Distinguishing successful and unsuccessful flows.
- Highlighting loss or waste.
- Identifying risk categories.
- Applying stage-specific colors.
- Matching application branding.
- Differentiating flow types.

Do not rely only on link colors to explain the flow. Also provide descriptive node labels and tooltips.

## Link Color Type

Use `linkStyle.colorType` to determine how link colors are derived from connected nodes.

### Source Color

```typescript
linkStyle: {
    colorType: 'Source'
}
```

The link derives its color from the source node.

Use this when flow ownership should remain visually associated with the source.

### Target Color

```typescript
linkStyle: {
    colorType: 'Target'
}
```

The link derives its color from the target node.

Use this when flows should be visually grouped by destination.

### Blended Color

```typescript
linkStyle: {
    colorType: 'Blend'
}
```

The link blends the source and target node colors.

Use this when the flow should communicate a transition between stages.

An individual link color can override the globally generated color.

## Link Opacity

Set normal opacity through `linkStyle.opacity`.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        linkStyle: {
            opacity: 0.6
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Opacity behavior:

```text
0   -> Fully transparent.
0.5 -> Partially transparent.
1   -> Fully opaque.
```

Do not assign `opacity` directly to individual links unless the installed `SankeyLinkModel` explicitly supports it.

## Link Curvature

Use `linkStyle.curvature` to control the bend of link paths.

Straight links:

```typescript
linkStyle: {
    curvature: 0
}
```

Moderate curvature:

```typescript
linkStyle: {
    curvature: 0.55
}
```

Maximum curvature:

```typescript
linkStyle: {
    curvature: 1
}
```

Choose curvature according to:

- Diagram orientation.
- Number of nodes.
- Number of links.
- Link density.
- Available dimensions.
- Label placement.
- Visual readability.

Do not use a separate `linkSettings.type` property to create straight or curved links.

## Interaction Opacity

Use `highlightOpacity` and `inactiveOpacity` to emphasize active links.

```typescript
linkStyle: {
    opacity: 0.5,
    highlightOpacity: 1,
    inactiveOpacity: 0.15
}
```

This configuration:

- Displays all links at `0.5` opacity normally.
- Displays the active link at full opacity.
- Fades unrelated links to `0.15` opacity.

Avoid making inactive links completely invisible unless that behavior is intentional.

## Value Configuration

The `value` property represents the quantity carried by a link.

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Product A',
        targetId: 'Revenue',
        value: 1000
    },
    {
        sourceId: 'Product B',
        targetId: 'Revenue',
        value: 100
    }
];
```

The link carrying `1000` units is rendered wider than the link carrying `100` units.

Use finite positive numeric values.

```typescript
{
    sourceId: 'Product A',
    targetId: 'Revenue',
    value: 1000
}
```

Avoid:

```text
Numeric strings
Zero
Negative values
NaN
Infinity
null
undefined
Missing values
```

## Balanced Flow Values

For an intermediate node, incoming and outgoing totals should normally match when the diagram represents a conserved quantity.

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Input',
        targetId: 'Processing',
        value: 1000
    },
    {
        sourceId: 'Processing',
        targetId: 'Output',
        value: 900
    },
    {
        sourceId: 'Processing',
        targetId: 'Waste',
        value: 100
    }
];
```

Incoming total for `Processing`:

```text
1000
```

Outgoing total:

```text
900 + 100 = 1000
```

The intermediate flow is balanced.

Balanced totals are recommended for:

- Energy distribution.
- Financial allocation.
- Resource consumption.
- Material processing.
- Inventory movement.
- Conversion funnels.

Unbalanced values can be valid when the difference has a defined meaning.

When possible, represent the difference through an explicit node:

```text
Loss
Waste
Storage
Untracked
Remaining
Other
```

## Dynamic Values from Data

Application data can be transformed into Sankey nodes and links.

### TypeScript

```typescript
interface SalesData {
    product: string;
    channel: string;
    amount: number;
}

const salesData: SalesData[] = [
    {
        product: 'Product A',
        channel: 'Online',
        amount: 500
    },
    {
        product: 'Product A',
        channel: 'Retail',
        amount: 300
    },
    {
        product: 'Product B',
        channel: 'Online',
        amount: 400
    }
];

const links: SankeyLinkModel[] =
    salesData.map(
        (
            item: SalesData
        ): SankeyLinkModel => {
            return {
                sourceId:
                    item.product,
                targetId:
                    item.channel,
                value:
                    item.amount
            };
        }
    );
```

Derive unique nodes:

```typescript
const nodeIds:
    Set<string> =
        new Set<string>();

salesData.forEach(
    (
        item: SalesData
    ): void => {
        nodeIds.add(
            item.product
        );

        nodeIds.add(
            item.channel
        );
    }
);

const nodes: SankeyNodeModel[] =
    Array.from(
        nodeIds,
        (
            id: string
        ): SankeyNodeModel => {
            return {
                id,

                label: {
                    text: id
                }
            };
        }
    );
```

### JavaScript

```javascript
var salesData = [
    {
        product: 'Product A',
        channel: 'Online',
        amount: 500
    },
    {
        product: 'Product A',
        channel: 'Retail',
        amount: 300
    },
    {
        product: 'Product B',
        channel: 'Online',
        amount: 400
    }
];

var links =
    salesData.map(
        function (item) {
            return {
                sourceId:
                    item.product,
                targetId:
                    item.channel,
                value:
                    item.amount
            };
        }
    );

var nodeIds =
    new Set();

salesData.forEach(
    function (item) {
        nodeIds.add(
            item.product
        );

        nodeIds.add(
            item.channel
        );
    }
);

var nodes =
    Array.from(
        nodeIds,
        function (id) {
            return {
                id: id,

                label: {
                    text: id
                }
            };
        }
    );
```

Validate transformed values before creating the Sankey.

## Multi-Link Scenarios

## Splitting a Flow

One source can distribute its value among multiple targets.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Input'
    },
    {
        id: 'Process A'
    },
    {
        id: 'Process B'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Input',
        targetId: 'Process A',
        value: 600
    },
    {
        sourceId: 'Input',
        targetId: 'Process B',
        value: 400
    }
];
```

The source distributes:

```text
600 + 400 = 1000
```

## Merging Flows

Multiple source nodes can merge into one target.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Process A'
    },
    {
        id: 'Process B'
    },
    {
        id: 'Output'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Process A',
        targetId: 'Output',
        value: 600
    },
    {
        sourceId: 'Process B',
        targetId: 'Output',
        value: 400
    }
];
```

The target receives:

```text
600 + 400 = 1000
```

## Multi-Stage Flow

A Sankey diagram can combine splitting and merging.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Source 1'
    },
    {
        id: 'Source 2'
    },
    {
        id: 'Process'
    },
    {
        id: 'Output 1'
    },
    {
        id: 'Output 2'
    },
    {
        id: 'Waste'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Source 1',
        targetId: 'Process',
        value: 700
    },
    {
        sourceId: 'Source 2',
        targetId: 'Process',
        value: 300
    },
    {
        sourceId: 'Process',
        targetId: 'Output 1',
        value: 600
    },
    {
        sourceId: 'Process',
        targetId: 'Output 2',
        value: 300
    },
    {
        sourceId: 'Process',
        targetId: 'Waste',
        value: 100
    }
];
```

The Process node receives and distributes `1000` units.

## Circular Links

A directed acyclic structure generally produces the clearest Sankey layout.

Avoid self-referencing links:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'A',
        value: 100
    }
];
```

Avoid reverse links that form a cycle:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 100
    },
    {
        sourceId: 'B',
        targetId: 'A',
        value: 50
    }
];
```

When source data includes feedback, model the flow as sequential stages.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'A Stage 1',

        label: {
            text: 'A'
        }
    },
    {
        id: 'B Stage 2',

        label: {
            text: 'B'
        }
    },
    {
        id: 'A Stage 3',

        label: {
            text: 'A Returned'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'A Stage 1',
        targetId: 'B Stage 2',
        value: 100
    },
    {
        sourceId: 'B Stage 2',
        targetId: 'A Stage 3',
        value: 50
    }
];
```

Cycle rejection in this guide is an application-level validation rule used to keep the visualization readable.

## Link Interactions

## Tooltip Support

Import and inject `SankeyTooltip` before creating the component.

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

Complete example:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        tooltip: {
            enable: true
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use the built-in Sankey tooltip first.

Do not assume that a Cartesian Chart tooltip template or `${value}` context is directly compatible with Sankey tooltips.

## Link Events

The Sankey component can expose dedicated link interaction events such as:

```text
linkClick
linkEnter
linkLeave
linkRendering
```

Use the exact event interfaces exported by the installed `@syncfusion/ej2-charts` version.

Do not use Cartesian Chart point events such as:

```text
pointMouseMove
pointClick
pointRender
```

### JavaScript Event Pattern

```javascript
var sankey =
    new ej.charts.Sankey({
        nodes: nodes,
        links: links,

        linkEnter:
            function (args) {
                console.log(
                    'Pointer entered a link.',
                    args
                );
            },

        linkLeave:
            function (args) {
                console.log(
                    'Pointer left a link.',
                    args
                );
            },

        linkClick:
            function (args) {
                console.log(
                    'A link was clicked.',
                    args
                );
            }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Keep high-frequency pointer-enter and pointer-leave handlers lightweight.

## Dynamic Link Customization

Use `linkRendering` to customize a link before it is rendered.

The event arguments provide the rendered link and a fill color.

### TypeScript

```typescript
import type {
    SankeyLinkRenderEventArgs
} from '@syncfusion/ej2-charts';

const handleLinkRendering = (
    args:
        SankeyLinkRenderEventArgs
): void => {
    if (
        args.link.sourceId ===
            'Processing' &&
        args.link.targetId ===
            'Waste'
    ) {
        args.fill =
            '#ef4444';
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

### JavaScript

```javascript
function handleLinkRendering(
    args
) {
    if (
        args.link.sourceId ===
            'Processing' &&
        args.link.targetId ===
            'Waste'
    ) {
        args.fill =
            '#ef4444';
    }
}

var sankey =
    new ej.charts.Sankey({
        nodes: nodes,
        links: links,
        linkRendering:
            handleLinkRendering
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use the event name:

```text
linkRendering
```

Do not use:

```text
linkRender
```

When link colors are known in advance, assigning `color` directly to each link is simpler and provides stronger model validation.

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
                Renewable Energy Distribution
            </h1>

            <p id="sankey-description">
                The diagram shows renewable generation flowing
                through the power grid to residential, industrial,
                and transmission-loss stages.
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
    type SankeyLinkRenderEventArgs,
    type SankeyNodeModel
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

        color: '#f59e0b'
    },
    {
        id: 'Wind',

        label: {
            text: 'Wind Energy'
        },

        color: '#3b82f6'
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

        color: '#10b981'
    },
    {
        id: 'Industrial',

        label: {
            text: 'Industrial Use'
        },

        color: '#06b6d4'
    },
    {
        id: 'Loss',

        label: {
            text: 'Transmission Loss'
        },

        color: '#ef4444'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Solar',
        targetId: 'Grid',
        value: 400,
        color: '#f59e0b'
    },
    {
        sourceId: 'Wind',
        targetId: 'Grid',
        value: 600,
        color: '#3b82f6'
    },
    {
        sourceId: 'Grid',
        targetId: 'Residential',
        value: 500,
        color: '#10b981'
    },
    {
        sourceId: 'Grid',
        targetId: 'Industrial',
        value: 400,
        color: '#06b6d4'
    },
    {
        sourceId: 'Grid',
        targetId: 'Loss',
        value: 100,
        color: '#ef4444'
    }
];

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

const validateAcyclicLinks = (
    nodeCollection:
        SankeyNodeModel[],
    linkCollection:
        SankeyLinkModel[]
): void => {
    const adjacency:
        Map<string, string[]> =
            new Map<
                string,
                string[]
            >();

    nodeCollection.forEach(
        (
            node:
                SankeyNodeModel
        ): void => {
            adjacency.set(
                String(node.id),
                []
            );
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
                        link.sourceId
                    );

            const targetId:
                string =
                    String(
                        link.targetId
                    );

            adjacency
                .get(sourceId)
                ?.push(targetId);
        }
    );

    const visiting:
        Set<string> =
            new Set<string>();

    const visited:
        Set<string> =
            new Set<string>();

    const visit = (
        nodeId: string
    ): void => {
        if (
            visiting.has(
                nodeId
            )
        ) {
            throw new Error(
                'A circular Sankey flow was detected at "' +
                nodeId +
                '".'
            );
        }

        if (
            visited.has(
                nodeId
            )
        ) {
            return;
        }

        visiting.add(
            nodeId
        );

        const targets:
            string[] =
                adjacency.get(
                    nodeId
                ) ?? [];

        targets.forEach(
            (
                targetId:
                    string
            ): void => {
                visit(
                    targetId
                );
            }
        );

        visiting.delete(
            nodeId
        );

        visited.add(
            nodeId
        );
    };

    nodeCollection.forEach(
        (
            node:
                SankeyNodeModel
        ): void => {
            visit(
                String(node.id)
            );
        }
    );
};

const handleLinkRendering = (
    args:
        SankeyLinkRenderEventArgs
): void => {
    if (
        args.link.sourceId ===
            'Grid' &&
        args.link.targetId ===
            'Loss'
    ) {
        args.fill =
            '#dc2626';
    }
};

validateSankeyData(
    nodes,
    links
);

validateAcyclicLinks(
    nodes,
    links
);

const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        title:
            'Renewable Energy Distribution',
        subTitle:
            'Generation, distribution, and transmission loss',
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
            opacity: 0.55,
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
                color: '#111827'
            }
        },

        tooltip: {
            enable: true
        },

        legendSettings: {
            visible: true
        },

        linkRendering:
            handleLinkRendering
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

    <title>Sankey Links Configuration</title>

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
                    Renewable Energy Distribution
                </h1>

                <p id="sankey-description">
                    The diagram shows renewable generation flowing
                    through the power grid to residential, industrial,
                    and transmission-loss stages.
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

                color: '#f59e0b'
            },
            {
                id: 'Wind',

                label: {
                    text: 'Wind Energy'
                },

                color: '#3b82f6'
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

                color: '#10b981'
            },
            {
                id: 'Industrial',

                label: {
                    text: 'Industrial Use'
                },

                color: '#06b6d4'
            },
            {
                id: 'Loss',

                label: {
                    text:
                        'Transmission Loss'
                },

                color: '#ef4444'
            }
        ];

        var links = [
            {
                sourceId: 'Solar',
                targetId: 'Grid',
                value: 400,
                color: '#f59e0b'
            },
            {
                sourceId: 'Wind',
                targetId: 'Grid',
                value: 600,
                color: '#3b82f6'
            },
            {
                sourceId: 'Grid',
                targetId: 'Residential',
                value: 500,
                color: '#10b981'
            },
            {
                sourceId: 'Grid',
                targetId: 'Industrial',
                value: 400,
                color: '#06b6d4'
            },
            {
                sourceId: 'Grid',
                targetId: 'Loss',
                value: 100,
                color: '#ef4444'
            }
        ];

        function validateSankeyData(
            nodeCollection,
            linkCollection
        ) {
            var nodeIds =
                new Set();

            nodeCollection.forEach(
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

            linkCollection.forEach(
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
        }

        function validateAcyclicLinks(
            nodeCollection,
            linkCollection
        ) {
            var adjacency =
                new Map();

            nodeCollection.forEach(
                function (node) {
                    adjacency.set(
                        String(node.id),
                        []
                    );
                }
            );

            linkCollection.forEach(
                function (link) {
                    var sourceId =
                        String(
                            link.sourceId
                        );

                    var targetId =
                        String(
                            link.targetId
                        );

                    var targets =
                        adjacency.get(
                            sourceId
                        );

                    if (targets) {
                        targets.push(
                            targetId
                        );
                    }
                }
            );

            var visiting =
                new Set();

            var visited =
                new Set();

            function visit(
                nodeId
            ) {
                if (
                    visiting.has(
                        nodeId
                    )
                ) {
                    throw new Error(
                        'A circular Sankey flow was detected at "' +
                        nodeId +
                        '".'
                    );
                }

                if (
                    visited.has(
                        nodeId
                    )
                ) {
                    return;
                }

                visiting.add(
                    nodeId
                );

                var targets =
                    adjacency.get(
                        nodeId
                    ) || [];

                targets.forEach(
                    function (
                        targetId
                    ) {
                        visit(
                            targetId
                        );
                    }
                );

                visiting.delete(
                    nodeId
                );

                visited.add(
                    nodeId
                );
            }

            nodeCollection.forEach(
                function (node) {
                    visit(
                        String(
                            node.id
                        )
                    );
                }
            );
        }

        function handleLinkRendering(
            args
        ) {
            if (
                args.link.sourceId ===
                    'Grid' &&
                args.link.targetId ===
                    'Loss'
            ) {
                args.fill =
                    '#dc2626';
            }
        }

        validateSankeyData(
            nodes,
            links
        );

        validateAcyclicLinks(
            nodes,
            links
        );

        var sankey =
            new ej.charts.Sankey({
                width: '100%',
                height: '520px',
                title:
                    'Renewable Energy Distribution',
                subTitle:
                    'Generation, distribution, and transmission loss',
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
                    opacity: 0.55,
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
                        color: '#111827'
                    }
                },

                tooltip: {
                    enable: true
                },

                legendSettings: {
                    visible: true
                },

                linkRendering:
                    handleLinkRendering
            });

        sankey.appendTo(
            '#sankey-container'
        );
    </script>
</body>
</html>
```

## Runtime Data Validation

Use runtime validation when nodes and links come from:

- APIs.
- Uploaded files.
- Forms.
- Databases.
- User selections.
- Configuration files.
- Dynamically transformed data.

Validate:

1. Every node ID is a nonempty string.
2. Every node ID is unique.
3. Every link contains a source ID.
4. Every link contains a target ID.
5. Every source ID exists.
6. Every target ID exists.
7. Source and target IDs are different.
8. Every value is numeric.
9. Every value is finite.
10. Every value is greater than zero.
11. Cycles are rejected when the application requires an acyclic flow.

### Reusable TypeScript Validator

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
                'Every Sankey node must contain a nonempty ID.'
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

    for (
        const link of links
    ) {
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
            sourceId ===
            targetId
        ) {
            throw new Error(
                'The link "' +
                sourceId +
                '" cannot target itself.'
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
                '" must have a finite positive value.'
            );
        }
    }
};
```

## Real-World Examples

## Sales Pipeline

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Leads',

        label: {
            text: 'Leads'
        }
    },
    {
        id: 'Qualified',

        label: {
            text: 'Qualified'
        }
    },
    {
        id: 'Negotiation',

        label: {
            text: 'Negotiation'
        }
    },
    {
        id: 'Won',

        label: {
            text: 'Won'
        }
    },
    {
        id: 'Lost at Qualification',

        label: {
            text: 'Lost at Qualification'
        }
    },
    {
        id: 'Lost at Negotiation',

        label: {
            text: 'Lost at Negotiation'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Leads',
        targetId: 'Qualified',
        value: 800,
        color: '#3b82f6'
    },
    {
        sourceId: 'Leads',
        targetId:
            'Lost at Qualification',
        value: 200,
        color: '#ef4444'
    },
    {
        sourceId: 'Qualified',
        targetId: 'Negotiation',
        value: 500,
        color: '#8b5cf6'
    },
    {
        sourceId: 'Qualified',
        targetId:
            'Lost at Negotiation',
        value: 300,
        color: '#ef4444'
    },
    {
        sourceId: 'Negotiation',
        targetId: 'Won',
        value: 500,
        color: '#10b981'
    }
];
```

Balanced totals:

```text
Leads:
800 qualified + 200 lost = 1000

Qualified:
500 negotiation + 300 lost = 800

Negotiation:
500 won = 500
```

Separate loss nodes prevent different loss stages from being merged into one ambiguous node.

## Energy Flow

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Solar'
    },
    {
        id: 'Wind'
    },
    {
        id: 'Coal'
    },
    {
        id: 'Grid'
    },
    {
        id: 'Residential'
    },
    {
        id: 'Industrial'
    },
    {
        id: 'Loss'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Solar',
        targetId: 'Grid',
        value: 400,
        color: '#f59e0b'
    },
    {
        sourceId: 'Wind',
        targetId: 'Grid',
        value: 600,
        color: '#3b82f6'
    },
    {
        sourceId: 'Coal',
        targetId: 'Grid',
        value: 1000,
        color: '#6b7280'
    },
    {
        sourceId: 'Grid',
        targetId: 'Residential',
        value: 1200,
        color: '#10b981'
    },
    {
        sourceId: 'Grid',
        targetId: 'Industrial',
        value: 600,
        color: '#06b6d4'
    },
    {
        sourceId: 'Grid',
        targetId: 'Loss',
        value: 200,
        color: '#ef4444'
    }
];
```

Grid totals:

```text
Incoming:
400 + 600 + 1000 = 2000

Outgoing:
1200 + 600 + 200 = 2000
```

## Best Practices

1. Use unique and stable node IDs.

```typescript
{
    sourceId: 'product-a',
    targetId: 'online-sales',
    value: 500
}
```

2. Keep visible labels separate from internal IDs.

3. Use finite positive values.

4. Validate every source and target ID before rendering.

5. Balance intermediate flows when the data represents a conserved quantity.

6. Represent loss, waste, storage, and untracked values with explicit nodes.

7. Use `linkStyle` for global opacity, curvature, interaction opacity, and color derivation.

8. Use individual link colors only when a specific link requires an override.

9. Use `colorType: 'Blend'` to show transitions between sources and targets.

10. Use `colorType: 'Source'` to associate flows with source categories.

11. Use `colorType: 'Target'` to group flows by destination.

12. Avoid self-referencing links.

13. Avoid cycles when the application requires a clear sequential flow.

14. Keep the number of links appropriate for the available component dimensions.

15. Increase component dimensions when the diagram contains many links.

16. Enable tooltips only after importing and injecting `SankeyTooltip`.

17. Enable the legend only after importing and injecting `SankeyLegend`.

18. Use Sankey link events instead of Cartesian Chart point events.

19. Use `linkRendering` for conditional rendering changes.

20. Validate API data before assigning it to the Sankey instance.

21. Call `destroy()` when a dynamically hosted Sankey is removed.

```typescript
sankey.destroy();
```

## Combined Mistakes and Future References

### Per-Link Opacity

Incorrect:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 500,
        opacity: 1
    },
    {
        sourceId: 'A',
        targetId: 'C',
        value: 50,
        opacity: 0.5
    }
];
```

Correct:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        linkStyle: {
            opacity: 0.6
        }
    });
```

Use individual colors to distinguish links:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 500,
        color: '#10b981'
    },
    {
        sourceId: 'A',
        targetId: 'C',
        value: 50,
        color: '#94a3b8'
    }
];
```

### Incorrect Link Rendering Event

Incorrect:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        linkRender: (
            args
        ): void => {
            console.log(args);
        }
    });
```

Correct:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        linkRendering: (
            args:
                SankeyLinkRenderEventArgs
        ): void => {
            console.log(args);
        }
    });
```

### Incorrect Event Mutation

Avoid an unverified mutation such as:

```typescript
args.link.color =
    '#ef4444';
```

Use the documented render-event fill:

```typescript
args.fill =
    '#ef4444';
```

### Cartesian Chart Selection Mode

Incorrect:

```typescript
selectionMode:
    'Point'
```

Use Sankey interaction opacity:

```typescript
linkStyle: {
    opacity: 0.5,
    highlightOpacity: 1,
    inactiveOpacity: 0.2
}
```

### Cartesian Point Event

Incorrect:

```typescript
pointMouseMove: (
    args
): void => {
    console.log(args);
}
```

Use dedicated Sankey link events when available:

```typescript
linkEnter: (
    args
): void => {
    console.log(args);
}
```

```typescript
linkLeave: (
    args
): void => {
    console.log(args);
}
```

```typescript
linkClick: (
    args
): void => {
    console.log(args);
}
```

### Unsupported linkSettings

Incorrect:

```typescript
linkSettings: {
    type: 'Straight'
}
```

Correct:

```typescript
linkStyle: {
    curvature: 0
}
```

Curved link:

```typescript
linkStyle: {
    curvature: 0.55
}
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
    colorType: 'Source'
}
```

### Unsupported Chart Animation

Do not add a Cartesian Chart animation model unless the installed Sankey API explicitly supports it.

Avoid:

```typescript
animation: {
    enable: true,
    duration: 1000
}
```

Use supported Sankey link properties:

```typescript
linkStyle: {
    opacity: 0.55,
    highlightOpacity: 0.9,
    inactiveOpacity: 0.2,
    curvature: 0.55,
    colorType: 'Blend'
}
```

### Unvalidated Tooltip Template

Avoid assuming a Cartesian Chart tooltip context:

```typescript
tooltip: {
    enable: true,
    template:
        '<div>${value}</div>'
}
```

Use the built-in tooltip:

```typescript
tooltip: {
    enable: true
}
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

### Missing Source or Target Node

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
        value: 500
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

### Label Used Instead of ID

Incorrect:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'sales',

        label: {
            text: 'Sales Department'
        }
    },
    {
        id: 'revenue',

        label: {
            text: 'Total Revenue'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId:
            'Sales Department',
        targetId:
            'Total Revenue',
        value: 500
    }
];
```

Correct:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'sales',
        targetId: 'revenue',
        value: 500
    }
];
```

### Identifier Case Mismatch

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
        value: 500
    }
];
```

Correct:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Product A',
        targetId: 'Revenue',
        value: 500
    }
];
```

### String Link Value

Incorrect:

```typescript
{
    sourceId: 'Product A',
    targetId: 'Revenue',
    value: '500'
}
```

Correct:

```typescript
{
    sourceId: 'Product A',
    targetId: 'Revenue',
    value: 500
}
```

### Zero or Negative Values

Incorrect:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 0
    },
    {
        sourceId: 'B',
        targetId: 'C',
        value: -50
    }
];
```

Filter invalid values before rendering:

```typescript
const validLinks:
    SankeyLinkModel[] =
        sourceLinks.filter(
            (
                link:
                    SankeyLinkModel
            ): boolean => {
                const value:
                    number =
                        Number(
                            link.value
                        );

                return (
                    Number.isFinite(
                        value
                    ) &&
                    value > 0
                );
            }
        );
```

### Self-Referencing Link

Incorrect:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'Processing',
        targetId: 'Processing',
        value: 100
    }
];
```

Use distinct stages:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Processing Stage 1',

        label: {
            text: 'Processing'
        }
    },
    {
        id: 'Processing Stage 2',

        label: {
            text: 'Reprocessing'
        }
    }
];
```

### Circular Flow

Incorrect:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'A',
        targetId: 'B',
        value: 100
    },
    {
        sourceId: 'B',
        targetId: 'A',
        value: 50
    }
];
```

Use sequential stage identifiers:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId: 'A Stage 1',
        targetId: 'B Stage 2',
        value: 100
    },
    {
        sourceId: 'B Stage 2',
        targetId: 'A Stage 3',
        value: 50
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