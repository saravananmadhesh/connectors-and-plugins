# Customization and Appearance

The Syncfusion EJ2 Sankey component supports built-in themes, individual node and link colors, global styles, title and subtitle formatting, label typography, horizontal and vertical orientations, chart backgrounds, borders, margins, and responsive dimensions.

This guide explains how to customize these appearance settings in standalone TypeScript and JavaScript applications.

## Table of Contents

- #color-schemes-and-themes
- #title-and-subtitle
- #labels-and-typography
- #orientation-modes
- #background-borders-and-margins
- #responsive-design
- #complete-typescript-example
- #complete-javascript-example
- #runtime-data-validation
- #accessibility-guidance
- #best-practices
- #combined-mistakes-and-future-references

## Color Schemes and Themes

## Built-in Themes

Apply a built-in theme through the Sankey `theme` property.

```typescript
const sankey: Sankey =
    new Sankey({
        theme: 'Tailwind',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Examples of EJ2 theme values include:

```typescript
theme: 'Material'
```

```typescript
theme: 'Fabric'
```

```typescript
theme: 'Bootstrap5'
```

```typescript
theme: 'Tailwind'
```

```typescript
theme: 'Fluent2'
```

```typescript
theme: 'Material3'
```

```typescript
theme: 'HighContrast'
```

Use a theme supported by the installed version of `@syncfusion/ej2-charts`.

Theme names can evolve as EJ2 releases introduce new themes and variants. Validate the selected theme through the installed TypeScript definitions before using it in production.

A theme provides the default appearance. Explicit node, link, title, label, background, and border settings can override theme defaults.

## Custom Node Colors

Use each node's `color` property when nodes require different colors.

### TypeScript

```typescript
import type {
    SankeyNodeModel
} from '@syncfusion/ej2-charts';

const nodes: SankeyNodeModel[] = [
    {
        id: 'Critical',

        label: {
            text: 'Critical'
        },

        color: '#dc2626'
    },
    {
        id: 'Warning',

        label: {
            text: 'Warning'
        },

        color: '#f59e0b'
    },
    {
        id: 'Success',

        label: {
            text: 'Success'
        },

        color: '#16a34a'
    }
];
```

### JavaScript

```javascript
var nodes = [
    {
        id: 'Critical',

        label: {
            text: 'Critical'
        },

        color: '#dc2626'
    },
    {
        id: 'Warning',

        label: {
            text: 'Warning'
        },

        color: '#f59e0b'
    },
    {
        id: 'Success',

        label: {
            text: 'Success'
        },

        color: '#16a34a'
    }
];
```

Individual node colors are useful for:

- Distinguishing source, intermediate, and destination stages.
- Identifying losses or unallocated values.
- Applying category-based colors.
- Highlighting important nodes.
- Matching application branding.
- Representing business classifications.

Do not rely only on color to communicate meaning. Also provide meaningful node labels, tooltips, legends, or surrounding descriptions.

## Global Node Color

Use `nodeStyle.fill` when all nodes should share a common fill color.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        nodeStyle: {
            fill: '#2563eb',
            opacity: 0.9
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Complete global node styling:

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

Use `nodeStyle` for properties shared by all nodes.

Use the individual node `color` property when a specific node must override the common fill.

## Link Color Strategies

Use `linkStyle.colorType` to determine how links derive their colors.

### Source Color

```typescript
linkStyle: {
    colorType: 'Source'
}
```

Links derive their colors from their source nodes.

Use this when flow ownership should remain associated with the source category.

### Target Color

```typescript
linkStyle: {
    colorType: 'Target'
}
```

Links derive their colors from their target nodes.

Use this when flows should be grouped visually by destination.

### Blended Color

```typescript
linkStyle: {
    colorType: 'Blend'
}
```

Links blend the source and target node colors.

Use this when the flow should visually communicate a transition between stages.

Complete link-style configuration:

```typescript
linkStyle: {
    opacity: 0.5,
    highlightOpacity: 0.9,
    inactiveOpacity: 0.15,
    curvature: 0.55,
    colorType: 'Blend'
}
```

## Individual Link Colors

Use `color` on an individual link when it requires an explicit override.

### TypeScript

```typescript
import type {
    SankeyLinkModel
} from '@syncfusion/ej2-charts';

const links: SankeyLinkModel[] = [
    {
        sourceId: 'Input',
        targetId: 'Processing',
        value: 900,
        color: '#2563eb'
    },
    {
        sourceId: 'Processing',
        targetId: 'Output',
        value: 800,
        color: '#16a34a'
    },
    {
        sourceId: 'Processing',
        targetId: 'Waste',
        value: 100,
        color: '#dc2626'
    }
];
```

### JavaScript

```javascript
var links = [
    {
        sourceId: 'Input',
        targetId: 'Processing',
        value: 900,
        color: '#2563eb'
    },
    {
        sourceId: 'Processing',
        targetId: 'Output',
        value: 800,
        color: '#16a34a'
    },
    {
        sourceId: 'Processing',
        targetId: 'Waste',
        value: 100,
        color: '#dc2626'
    }
];
```

Use individual link colors when they communicate a specific meaning such as:

- Success.
- Failure.
- Loss.
- Risk.
- Category.
- Flow type.
- Priority.

## Title and Subtitle

## Basic Title and Subtitle

The Sankey title and subtitle are separate string properties.

```typescript
const sankey: Sankey =
    new Sankey({
        title:
            'Revenue Flow Analysis',

        subTitle:
            'Annual performance metrics',

        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Do not configure the title as a nested object.

Incorrect:

```typescript
title: {
    text:
        'Revenue Flow Analysis'
}
```

Correct:

```typescript
title:
    'Revenue Flow Analysis'
```

## Title and Subtitle Styling

Use `titleStyle` and `subTitleStyle`.

```typescript
import type {
    SankeyTitleStyleModel
} from '@syncfusion/ej2-charts';

const titleStyle:
    SankeyTitleStyleModel = {
        fontFamily:
            'Segoe UI',
        size: '20px',
        fontWeight: '700',
        fontStyle: 'Normal',
        color: '#0f172a',
        opacity: 1,
        textAlignment: 'Center'
    };

const subTitleStyle:
    SankeyTitleStyleModel = {
        fontFamily:
            'Segoe UI',
        size: '13px',
        fontWeight: '400',
        fontStyle: 'Normal',
        color: '#475569',
        opacity: 1,
        textAlignment: 'Center'
    };
```

Apply the styles:

```typescript
const sankey: Sankey =
    new Sankey({
        title:
            'Revenue Flow Analysis',

        subTitle:
            'Annual performance metrics',

        titleStyle,
        subTitleStyle,

        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Common title-style properties include:

```text
fontFamily    -> Font family.
size          -> Font size.
fontWeight    -> Font weight.
fontStyle     -> Normal or italic styling.
color         -> Text color.
opacity       -> Text opacity.
textAlignment -> Left, Center, or Right.
```

Use `size`, not `fontSize`, in the Sankey title-style model.

## Title and Subtitle Alignment

Configure title and subtitle alignment independently.

Centered title:

```typescript
titleStyle: {
    textAlignment: 'Center'
}
```

Left-aligned subtitle:

```typescript
subTitleStyle: {
    textAlignment: 'Left'
}
```

Right-aligned title:

```typescript
titleStyle: {
    textAlignment: 'Right'
}
```

Do not place alignment inside a nested title object.

Incorrect:

```typescript
title: {
    text: 'Revenue Flow',
    alignment: 'Center'
}
```

Correct:

```typescript
title: 'Revenue Flow',

titleStyle: {
    textAlignment: 'Center'
}
```

## Labels and Typography

## Custom Node Labels

Use `id` as the stable link identifier and `label.text` as the visible text.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'product-sales',

        label: {
            text: 'Product Sales'
        }
    },
    {
        id: 'marketing-spend',

        label: {
            text: 'Marketing Investment'
        }
    },
    {
        id: 'revenue-generated',

        label: {
            text: 'Revenue Generated'
        }
    }
];
```

Links must reference the node IDs.

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId:
            'product-sales',
        targetId:
            'revenue-generated',
        value: 700
    },
    {
        sourceId:
            'marketing-spend',
        targetId:
            'revenue-generated',
        value: 300
    }
];
```

Separating IDs from labels allows visible text to change without breaking link relationships.

## Global Label Style

Configure Sankey labels through `labelSettings`.

```typescript
labelSettings: {
    visible: true,
    fontFamily: 'Segoe UI',
    fontSize: '13px',
    fontWeight: '500',
    fontStyle: 'Normal',
    color: '#1e293b',
    padding: 10
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
            fontFamily:
                'Segoe UI',
            fontSize: '13px',
            fontWeight: '500',
            fontStyle: 'Normal',
            color: '#1e293b',
            padding: 10
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Common label settings include:

```text
visible    -> Shows or hides labels.
fontFamily -> Label font family.
fontSize   -> Label font size.
fontWeight -> Label font weight.
fontStyle  -> Label font style.
color      -> Label text color.
padding    -> Label spacing.
```

Do not place these properties inside a nested `font` object unless the installed Sankey model explicitly requires it.

## Long Label Handling

Keep labels concise when possible.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id:
            'operating-expenses',

        label: {
            text:
                'Operating Expenses'
        }
    },
    {
        id:
            'marketing-investment',

        label: {
            text:
                'Marketing'
        }
    }
];
```

When longer text is unavoidable:

1. Increase the Sankey width.
2. Increase left and right margins.
3. Reduce the label font size moderately.
4. Use a concise visible label.
5. Put the full description in a tooltip or surrounding content.
6. Test Horizontal and Vertical orientations.
7. Test mobile, tablet, and desktop widths.
8. Increase the component height when the layout becomes dense.

Do not assume that Cartesian Chart label properties such as the following are available:

```typescript
maxWidth: 100
```

```typescript
overflow: 'Wrap'
```

```typescript
overflow: 'Ellipsis'
```

Use only properties exposed by the installed Sankey label model.

## Orientation Modes

The Sankey supports Horizontal and Vertical orientations.

## Horizontal Orientation

Use Horizontal orientation for a left-to-right flow.

```typescript
const sankey: Sankey =
    new Sankey({
        orientation:
            'Horizontal',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Horizontal orientation is suitable for:

- Sales pipelines.
- Manufacturing processes.
- Revenue allocation.
- Energy distribution.
- Sequential business stages.
- Conversion funnels.

## Vertical Orientation

Use Vertical orientation for a top-to-bottom flow.

```typescript
const sankey: Sankey =
    new Sankey({
        orientation:
            'Vertical',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Vertical orientation can be useful when:

- The parent container is narrow.
- The flow should be read from top to bottom.
- The surrounding page uses a stacked layout.
- Horizontal label space is limited.
- The process is naturally hierarchical.

## Node Position Adjustment

The Sankey layout engine positions nodes automatically according to their link relationships.

Use the individual node `offset` only when a small adjustment is required.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Source A',

        label: {
            text: 'Source A'
        },

        offset: -20
    },
    {
        id: 'Source B',

        label: {
            text: 'Source B'
        },

        offset: 20
    },
    {
        id: 'Output',

        label: {
            text: 'Output'
        }
    }
];
```

The documented offset behavior is:

```text
Horizontal orientation -> Horizontal offset.
Vertical orientation   -> Vertical offset.
```

Use offsets sparingly.

Large offsets can cause:

- Overlapping nodes.
- Intersecting labels.
- Clipped content.
- Excessively curved links.
- Inconsistent responsive layouts.

Test offsets at every supported component dimension.

## Background, Borders, and Margins

## Chart Background

The Sankey `background` property accepts a CSS color string.

```typescript
const sankey: Sankey =
    new Sankey({
        background:
            '#f8fafc',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Transparent background:

```typescript
background:
    'transparent'
```

Dark background:

```typescript
background:
    '#0f172a'
```

Do not configure `background` as an object.

Incorrect:

```typescript
background: {
    color: '#f5f5f5'
}
```

Correct:

```typescript
background:
    '#f5f5f5'
```

When using a dark background, update:

- Title color.
- Subtitle color.
- Label color.
- Node borders.
- Legend text.
- Tooltip appearance.
- Surrounding page styles.

## Background Image

When supported by the installed Sankey version, use `backgroundImage` for an image URL.

```typescript
const sankey: Sankey =
    new Sankey({
        backgroundImage:
            './images/sankey-background.png',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Ensure the background image:

- Is available to the application.
- Does not reduce label contrast.
- Does not obscure nodes or links.
- Is licensed for the intended use.
- Scales appropriately.
- Remains readable in exported output when export is used.

## Chart Border

Use the Sankey `border` property.

```typescript
const sankey: Sankey =
    new Sankey({
        border: {
            color: '#cbd5e1',
            width: 1,
            dashArray: ''
        },

        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Dashed border:

```typescript
border: {
    color: '#64748b',
    width: 1,
    dashArray: '5 3'
}
```

Common border properties include:

```text
color     -> Border color.
width     -> Border width.
dashArray -> SVG dash pattern.
```

## Chart Margin

Use `margin` to control space around the rendered Sankey content.

```typescript
const sankey: Sankey =
    new Sankey({
        margin: {
            left: 40,
            right: 40,
            top: 30,
            bottom: 30
        },

        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Increase margins when:

- Labels are clipped.
- The title requires more space.
- The legend is close to the diagram.
- The container has a custom border.
- Node offsets move content toward an edge.
- The diagram uses long localized labels.

Excessive margins reduce the area available for nodes and links.

## Container Decoration

Use an application-owned HTML wrapper for:

- Border radius.
- Box shadow.
- Outer padding.
- Page-level background.
- Maximum width.
- Responsive spacing.

HTML:

```html
<section class="sankey-card">
    <div id="sankey-container"></div>
</section>
```

CSS:

```css
.sankey-card {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
    overflow: hidden;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow:
        0 4px 16px
        rgb(15 23 42 / 8%);
}
```

Use Sankey properties for:

- Internal chart background.
- Internal chart border.
- Internal chart margins.
- Node appearance.
- Link appearance.
- Labels.
- Title and subtitle.
- Legend.
- Tooltip.

Do not depend on undocumented internal selectors such as:

```css
.e-sankey {
    border-radius: 8px;
}
```

## Responsive Design

## Responsive Dimensions

Use percentage width with a stable height.

```typescript
const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

A responsive width with a pixel height is generally safer than assigning both dimensions as percentages.

Preferred:

```typescript
width: '100%',
height: '520px'
```

If `height: '100%'` is used, the parent must have a definite computed height.

```css
html,
body,
.page-container,
.sankey-card,
#sankey-container {
    height: 100%;
}
```

Without definite ancestor heights, percentage height can resolve to an unusable value.

## Responsive Container

HTML:

```html
<main class="page-container">
    <section class="sankey-card">
        <div id="sankey-container"></div>
    </section>
</main>
```

CSS:

```css
.page-container {
    width: 100%;
    min-height: 100vh;
    padding: 24px;
    box-sizing: border-box;
    background: #f1f5f9;
}

.sankey-card {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
    overflow: hidden;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
}

#sankey-container {
    width: 100%;
    min-height: 520px;
}

@media (max-width: 768px) {
    .page-container {
        padding: 12px;
    }

    .sankey-card {
        padding: 8px;
    }

    #sankey-container {
        min-height: 600px;
    }
}
```

Increasing the height at smaller widths can give nodes, links, and labels more room.

## Resize Handling

Test percentage-based width without a custom resize listener first.

```typescript
const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Add custom resize handling only when required by the surrounding application layout.

### Debounced TypeScript Resize Handler

```typescript
let resizeTimer:
    ReturnType<
        typeof setTimeout
    > | null = null;

const handleResize =
    (): void => {
        if (
            resizeTimer !== null
        ) {
            clearTimeout(
                resizeTimer
            );
        }

        resizeTimer =
            setTimeout(
                (): void => {
                    sankey.refresh();
                    resizeTimer =
                        null;
                },
                150
            );
    };

window.addEventListener(
    'resize',
    handleResize
);
```

Remove the handler and clear its timer when the view is removed.

```typescript
window.removeEventListener(
    'resize',
    handleResize
);

if (
    resizeTimer !== null
) {
    clearTimeout(
        resizeTimer
    );

    resizeTimer =
        null;
}

sankey.destroy();
```

### Debounced JavaScript Resize Handler

```javascript
var resizeTimer = null;

function handleResize() {
    if (
        resizeTimer !== null
    ) {
        window.clearTimeout(
            resizeTimer
        );
    }

    resizeTimer =
        window.setTimeout(
            function () {
                sankey.refresh();
                resizeTimer =
                    null;
            },
            150
        );
}

window.addEventListener(
    'resize',
    handleResize
);
```

Cleanup:

```javascript
window.removeEventListener(
    'resize',
    handleResize
);

if (
    resizeTimer !== null
) {
    window.clearTimeout(
        resizeTimer
    );

    resizeTimer =
        null;
}

sankey.destroy();
```

Avoid an anonymous resize callback if it may need to be removed later.

Incorrect:

```typescript
window.addEventListener(
    'resize',
    (): void => {
        sankey.refresh();
    }
);
```

The anonymous callback cannot be removed unless its reference is retained.

## Complete TypeScript Example

### HTML

```html
<main class="page-container">
    <section
        class="sankey-card"
        aria-labelledby="sankey-heading"
        aria-describedby="sankey-description"
    >
        <header class="sankey-header">
            <h1 id="sankey-heading">
                Revenue Allocation Analysis
            </h1>

            <p id="sankey-description">
                Product and service revenue flows into operating
                expenses, marketing investment, and net profit.
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
    min-height: 100vh;
    padding: 24px;
    box-sizing: border-box;
    background: #f1f5f9;
}

.sankey-card {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
    overflow: hidden;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow:
        0 4px 16px
        rgb(15 23 42 / 8%);
}

.sankey-header {
    margin-bottom: 16px;
}

.sankey-header h1 {
    margin: 0 0 8px;
    color: #0f172a;
    font-family:
        "Segoe UI",
        sans-serif;
    font-size: 24px;
}

.sankey-header p {
    margin: 0;
    color: #475569;
    font-family:
        "Segoe UI",
        sans-serif;
    font-size: 14px;
    line-height: 1.5;
}

#sankey-container {
    width: 100%;
    min-height: 520px;
}

@media (max-width: 768px) {
    .page-container {
        padding: 12px;
    }

    .sankey-card {
        padding: 8px;
    }

    #sankey-container {
        min-height: 600px;
    }
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
    type SankeyTitleStyleModel
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip,
    SankeyLegend
);

const nodes: SankeyNodeModel[] = [
    {
        id: 'Product Sales',

        label: {
            text: 'Product Sales'
        },

        color: '#2563eb'
    },
    {
        id: 'Service Revenue',

        label: {
            text: 'Service Revenue'
        },

        color: '#0ea5e9'
    },
    {
        id: 'Total Revenue',

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
        id: 'Marketing',

        label: {
            text:
                'Marketing Investment'
        },

        color: '#ec4899'
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
        sourceId:
            'Product Sales',
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
            'Marketing',
        value: 200
    },
    {
        sourceId:
            'Total Revenue',
        targetId:
            'Profit',
        value: 400
    }
];

const titleStyle:
    SankeyTitleStyleModel = {
        fontFamily:
            'Segoe UI',
        size: '20px',
        fontWeight: '700',
        fontStyle: 'Normal',
        color: '#0f172a',
        opacity: 1,
        textAlignment: 'Center'
    };

const subTitleStyle:
    SankeyTitleStyleModel = {
        fontFamily:
            'Segoe UI',
        size: '13px',
        fontWeight: '400',
        fontStyle: 'Normal',
        color: '#475569',
        opacity: 1,
        textAlignment: 'Center'
    };

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

validateSankeyData(
    nodes,
    links
);

const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        theme: 'Tailwind',
        title:
            'Revenue Allocation Analysis',
        subTitle:
            'Annual product and service revenue distribution',
        titleStyle,
        subTitleStyle,
        orientation:
            'Horizontal',
        background:
            '#ffffff',

        border: {
            color: '#cbd5e1',
            width: 1,
            dashArray: ''
        },

        margin: {
            left: 30,
            right: 30,
            top: 30,
            bottom: 30
        },

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
            highlightOpacity: 0.9,
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
            fontStyle: 'Normal',
            color: '#1e293b',
            padding: 10
        },

        tooltip: {
            enable: true
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        }
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

    <title>
        Sankey Customization and Appearance
    </title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .page-container {
            width: 100%;
            min-height: 100vh;
            padding: 24px;
            box-sizing: border-box;
            background: #f1f5f9;
        }

        .sankey-card {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px;
            overflow: hidden;
            box-sizing: border-box;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            box-shadow:
                0 4px 16px
                rgb(15 23 42 / 8%);
        }

        .sankey-header {
            margin-bottom: 16px;
        }

        .sankey-header h1 {
            margin: 0 0 8px;
            color: #0f172a;
            font-family:
                "Segoe UI",
                sans-serif;
            font-size: 24px;
        }

        .sankey-header p {
            margin: 0;
            color: #475569;
            font-family:
                "Segoe UI",
                sans-serif;
            font-size: 14px;
            line-height: 1.5;
        }

        #sankey-container {
            width: 100%;
            min-height: 520px;
        }

        @media (max-width: 768px) {
            .page-container {
                padding: 12px;
            }

            .sankey-card {
                padding: 8px;
            }

            #sankey-container {
                min-height: 600px;
            }
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
            <header class="sankey-header">
                <h1 id="sankey-heading">
                    Revenue Allocation Analysis
                </h1>

                <p id="sankey-description">
                    Product and service revenue flows into
                    operating expenses, marketing investment,
                    and net profit.
                </p>
            </header>

            <div id="sankey-container"></div>
        </section>
    </main>

    <script>
        var nodes = [
            {
                id: 'Product Sales',

                label: {
                    text:
                        'Product Sales'
                },

                color: '#2563eb'
            },
            {
                id: 'Service Revenue',

                label: {
                    text:
                        'Service Revenue'
                },

                color: '#0ea5e9'
            },
            {
                id: 'Total Revenue',

                label: {
                    text:
                        'Total Revenue'
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
                id: 'Marketing',

                label: {
                    text:
                        'Marketing Investment'
                },

                color: '#ec4899'
            },
            {
                id: 'Profit',

                label: {
                    text:
                        'Net Profit'
                },

                color: '#10b981'
            }
        ];

        var links = [
            {
                sourceId:
                    'Product Sales',
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
                    'Marketing',
                value: 200
            },
            {
                sourceId:
                    'Total Revenue',
                targetId:
                    'Profit',
                value: 400
            }
        ];

        var titleStyle = {
            fontFamily:
                'Segoe UI',
            size: '20px',
            fontWeight: '700',
            fontStyle: 'Normal',
            color: '#0f172a',
            opacity: 1,
            textAlignment: 'Center'
        };

        var subTitleStyle = {
            fontFamily:
                'Segoe UI',
            size: '13px',
            fontWeight: '400',
            fontStyle: 'Normal',
            color: '#475569',
            opacity: 1,
            textAlignment: 'Center'
        };

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

        validateSankeyData(
            nodes,
            links
        );

        var sankey =
            new ej.charts.Sankey({
                width: '100%',
                height: '520px',
                theme: 'Tailwind',
                title:
                    'Revenue Allocation Analysis',
                subTitle:
                    'Annual product and service revenue distribution',
                titleStyle:
                    titleStyle,
                subTitleStyle:
                    subTitleStyle,
                orientation:
                    'Horizontal',
                background:
                    '#ffffff',

                border: {
                    color: '#cbd5e1',
                    width: 1,
                    dashArray: ''
                },

                margin: {
                    left: 30,
                    right: 30,
                    top: 30,
                    bottom: 30
                },

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
                    highlightOpacity: 0.9,
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
                    fontStyle:
                        'Normal',
                    color: '#1e293b',
                    padding: 10
                },

                tooltip: {
                    enable: true
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom'
                }
            });

        sankey.appendTo(
            '#sankey-container'
        );
    </script>
</body>
</html>
```

## Runtime Data Validation

Validate dynamic Sankey data before creating the component.

Required checks:

```text
Every node has a nonempty ID.
Every node ID is unique.
Every source ID exists.
Every target ID exists.
Source and target IDs are different.
Every link value is numeric.
Every link value is finite.
Every link value is greater than zero.
Every node label uses the expected label model.
```

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
};
```

## Accessibility Guidance

Do not rely only on color to communicate the meaning of nodes and links.

Provide:

- A visible heading.
- A concise diagram description.
- Meaningful node labels.
- Tooltips.
- A legend when users need to interpret colors.
- Sufficient text and background contrast.
- Non-color descriptions of important states.
- Native controls for any interactive actions.
- A semantic data table when exact values must be available nonvisually.

Use semantic surrounding HTML:

```html
<section
    aria-labelledby="sankey-heading"
    aria-describedby="sankey-description"
>
    <h1 id="sankey-heading">
        Revenue Allocation
    </h1>

    <p id="sankey-description">
        Product and service revenue is allocated to
        operations, marketing, and net profit.
    </p>

    <div id="sankey-container"></div>
</section>
```

Do not assign `role="img"` to the Sankey host unless the complete generated accessibility behavior has been validated.

## High-Contrast Presentation

Use a supported high-contrast theme as a foundation.

```typescript
const sankey: Sankey =
    new Sankey({
        theme:
            'HighContrast',
        background:
            '#000000',

        nodes,
        links,

        nodeStyle: {
            stroke: '#ffffff',
            strokeWidth: 2,
            opacity: 1,
            highlightOpacity: 1,
            inactiveOpacity: 0.5
        },

        linkStyle: {
            opacity: 0.75,
            highlightOpacity: 1,
            inactiveOpacity: 0.35,
            curvature: 0.55,
            colorType: 'Blend'
        },

        labelSettings: {
            visible: true,
            fontFamily:
                'Segoe UI',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff'
        },

        titleStyle: {
            fontFamily:
                'Segoe UI',
            size: '20px',
            fontWeight: '700',
            color: '#ffffff'
        },

        subTitleStyle: {
            fontFamily:
                'Segoe UI',
            size: '13px',
            fontWeight: '400',
            color: '#e2e8f0'
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

A high-contrast theme does not automatically make the entire application accessible.

Also test:

- Browser zoom.
- Screen-reader output.
- Keyboard interaction.
- Focus visibility.
- Tooltip contrast.
- Legend contrast.
- Localized labels.
- High-contrast operating-system settings.

## Best Practices

1. Use a supported built-in theme as the visual foundation.

2. Validate theme names against the installed EJ2 version.

3. Use individual node colors when colors have specific meanings.

4. Use `nodeStyle` for appearance shared by all nodes.

5. Use `linkStyle.colorType` for source, target, or blended link coloring.

6. Use individual link colors only for intentional overrides.

7. Keep the title concise.

8. Use the subtitle for supporting context.

9. Configure titles through `title`, `subTitle`, `titleStyle`, and `subTitleStyle`.

10. Use `size` in title and subtitle style models.

11. Configure labels directly through `labelSettings`.

12. Keep labels concise to reduce clipping.

13. Use percentage width with a definite height.

14. Ensure parent dimensions are definite before using percentage height.

15. Apply border radius and shadow to an application-owned wrapper.

16. Use Sankey `background`, `border`, and `margin` for the internal rendering area.

17. Test Horizontal and Vertical orientations.

18. Apply node offsets only when automatic positioning needs a small adjustment.

19. Import and inject `SankeyTooltip` when tooltips are enabled.

20. Import and inject `SankeyLegend` when the legend is visible.

21. Do not inject export modules when export is not implemented.

22. Add a resize listener only when required.

23. Debounce custom resize handling.

24. Remove listeners and clear timers during cleanup.

25. Destroy the Sankey when its dynamic host view is removed.

```typescript
sankey.destroy();
```

26. Do not rely only on red and green to communicate status.

27. Provide labels, tooltips, legends, and descriptions as non-color alternatives.

28. Validate node IDs and link values before rendering dynamic data.

## Combined Mistakes and Future References

### Nested Title Object

Incorrect:

```typescript
const sankey: Sankey =
    new Sankey({
        title: {
            text:
                'Revenue Flow',

            subtitle: {
                text:
                    'Annual Performance'
            }
        }
    });
```

Correct:

```typescript
const sankey: Sankey =
    new Sankey({
        title:
            'Revenue Flow',

        subTitle:
            'Annual Performance'
    });
```

### Styling Inside the Title

Incorrect:

```typescript
title: {
    text:
        'Revenue Flow',

    textStyle: {
        fontFamily:
            'Arial',
        size: '18px'
    }
}
```

Correct:

```typescript
title:
    'Revenue Flow',

titleStyle: {
    fontFamily:
        'Arial',
    size: '18px',
    fontWeight: '700'
}
```

### Incorrect Title Font Property

Incorrect:

```typescript
const titleStyle:
    SankeyTitleStyleModel = {
        fontSize: '20px'
    };
```

Correct:

```typescript
const titleStyle:
    SankeyTitleStyleModel = {
        size: '20px'
    };
```

### Alignment Inside the Title

Incorrect:

```typescript
title: {
    text:
        'Revenue Flow',
    alignment:
        'Center'
}
```

Correct:

```typescript
title:
    'Revenue Flow',

titleStyle: {
    textAlignment:
        'Center'
}
```

### Plain-String Node Label

Incorrect:

```typescript
{
    id: 'Product Sales',
    label: 'Product Sales'
}
```

Correct:

```typescript
{
    id: 'Product Sales',

    label: {
        text:
            'Product Sales'
    }
}
```

### Incorrect Nested Label Font

Incorrect:

```typescript
labelSettings: {
    font: {
        fontFamily:
            'Segoe UI',
        size: '13px'
    }
}
```

Correct:

```typescript
labelSettings: {
    visible: true,
    fontFamily:
        'Segoe UI',
    fontSize: '13px'
}
```

### Unsupported Label Opacity

Do not use:

```typescript
labelSettings: {
    opacity: 0.8
}
```

unless the installed Sankey label model explicitly provides that property.

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

### Unsupported Chart Palette

Avoid assuming Sankey accepts a generic chart-level palette:

```typescript
palette: [
    '#5e72e4',
    '#25c481',
    '#ffb64d'
]
```

Use individual node colors:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Source',
        color: '#5e72e4'
    },
    {
        id: 'Processing',
        color: '#ffb64d'
    },
    {
        id: 'Output',
        color: '#25c481'
    }
];
```

Or use one global color:

```typescript
nodeStyle: {
    fill: '#5e72e4'
}
```

### Unsupported nodeDefaults

Incorrect:

```typescript
nodeDefaults: {
    label: {
        visible: true,
        fontSize: 12
    }
}
```

Correct:

```typescript
labelSettings: {
    visible: true,
    fontSize: '12px'
}
```

### Unsupported Label Overflow Properties

Avoid:

```typescript
labelSettings: {
    maxWidth: 100,
    overflow: 'Wrap'
}
```

unless those properties exist in the installed Sankey label model.

Use concise labels and provide full details elsewhere.

### Unsupported Node Alignment

Avoid:

```typescript
nodeAlignment:
    'Top'
```

Use automatic layout and small offsets when required.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Source A',
        offset: -20
    },
    {
        id: 'Source B',
        offset: 20
    }
];
```

### Incorrect Offset Description

Use the documented orientation behavior:

```text
Horizontal orientation -> Horizontal offset.
Vertical orientation   -> Vertical offset.
```

### Object-Based Background

Incorrect:

```typescript
background: {
    color: '#f5f5f5'
}
```

Correct:

```typescript
background:
    '#f5f5f5'
```

### Unsupported areaSettings

Incorrect:

```typescript
areaSettings: {
    backgroundColor:
        '#ffffff',
    borderColor:
        '#d3d3d3',
    borderWidth: 1
}
```

Correct:

```typescript
background:
    '#ffffff',

border: {
    color: '#d3d3d3',
    width: 1
}
```

### Internal Selector for Essential Layout

Avoid:

```css
.e-sankey {
    border-radius: 8px;
    box-shadow:
        0 2px 8px
        rgb(0 0 0 / 10%);
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
    overflow: hidden;
    border-radius: 8px;
    box-shadow:
        0 2px 8px
        rgb(0 0 0 / 10%);
}
```

### Percentage Height Without Parent Height

Potentially invisible:

```typescript
const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '100%',
        nodes,
        links
    });
```

Safer:

```typescript
const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        nodes,
        links
    });
```

### Anonymous Resize Listener

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

### Tooltip Without Module Injection

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

### Legend Without Module Injection

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

### Unused Export Module

Unnecessary when export is not used:

```typescript
import {
    Sankey,
    SankeyExport,
    SankeyLegend,
    SankeyTooltip
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip,
    SankeyLegend,
    SankeyExport
);
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

### Relying Only on Color

Insufficient:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'n1',
        color: '#dc2626'
    },
    {
        id: 'n2',
        color: '#16a34a'
    }
];
```

Better:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'failed',

        label: {
            text: 'Failed'
        },

        color: '#dc2626'
    },
    {
        id: 'completed',

        label: {
            text: 'Completed'
        },

        color: '#16a34a'
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

### Malformed Script URL

Do not use a URL ending in:

```text
.jsscript
```

Use a valid script element:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Editor-Generated Markup

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, commands, or script URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```