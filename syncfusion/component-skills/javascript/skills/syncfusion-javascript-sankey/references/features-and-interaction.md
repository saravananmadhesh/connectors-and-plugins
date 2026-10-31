# Features and Interaction

The Syncfusion EJ2 Sankey component supports tooltips, legends, interaction highlighting, node and link events, right-to-left rendering, exporting, and printing.

This guide explains how to enable and configure these features in standalone TypeScript and JavaScript applications.

## Table of Contents

- #tooltips
- #legend-configuration
- #selection-and-highlighting
- #event-handling
- #rtl-support
- #print-and-export
- #complete-typescript-example
- #complete-javascript-example
- #accessibility-guidance
- #runtime-validation-checklist
- #best-practices
- #combined-mistakes-and-future-references

## Tooltips

Sankey tooltips display contextual details when users hover over nodes and links.

In TypeScript, import and inject `SankeyTooltip` before creating the component.

## Enabling Tooltips

### TypeScript

```typescript
import {
    Sankey,
    SankeyTooltip
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip
);

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

### JavaScript

When using the complete global EJ2 bundle, explicit module injection is not required.

```javascript
var sankey =
    new ej.charts.Sankey({
        nodes: nodes,
        links: links,

        tooltip: {
            enable: true
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

## Tooltip Format

Use `nodeFormat` to customize node tooltip text and `linkFormat` to customize link tooltip text.

Node tooltip placeholders include:

```text
$name  -> Node name.
$value -> Node value.
```

Link tooltip placeholders include:

```text
$start.name   -> Source-node name.
$start.value  -> Source-node value.
$target.name  -> Target-node name.
$target.value -> Target-node value.
```

### TypeScript

```typescript
import {
    Sankey,
    SankeyTooltip,
    type SankeyLinkModel,
    type SankeyNodeModel
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip
);

const nodes: SankeyNodeModel[] = [
    {
        id: 'Agricultural Waste',

        label: {
            text: 'Agricultural Waste'
        }
    },
    {
        id: 'Bio-conversion',

        label: {
            text: 'Bio-conversion'
        }
    },
    {
        id: 'Electricity',

        label: {
            text: 'Electricity'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId:
            'Agricultural Waste',
        targetId:
            'Bio-conversion',
        value: 84.152
    },
    {
        sourceId:
            'Bio-conversion',
        targetId:
            'Electricity',
        value: 36.862
    }
];

const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        tooltip: {
            enable: true,
            nodeFormat:
                'Node: $name | Value: $value',
            linkFormat:
                'Source: $start.name ($start.value) | ' +
                'Target: $target.name ($target.value)'
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

### JavaScript

```javascript
var nodes = [
    {
        id: 'Agricultural Waste',

        label: {
            text: 'Agricultural Waste'
        }
    },
    {
        id: 'Bio-conversion',

        label: {
            text: 'Bio-conversion'
        }
    },
    {
        id: 'Electricity',

        label: {
            text: 'Electricity'
        }
    }
];

var links = [
    {
        sourceId:
            'Agricultural Waste',
        targetId:
            'Bio-conversion',
        value: 84.152
    },
    {
        sourceId:
            'Bio-conversion',
        targetId:
            'Electricity',
        value: 36.862
    }
];

var sankey =
    new ej.charts.Sankey({
        nodes: nodes,
        links: links,

        tooltip: {
            enable: true,
            nodeFormat:
                'Node: $name | Value: $value',
            linkFormat:
                'Source: $start.name ($start.value) | ' +
                'Target: $target.name ($target.value)'
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

## Inline Tooltip Number Formatting

When supported by the installed Sankey version, numeric tooltip placeholders can use inline number formats with the following syntax:

```text
${placeholder:format}
```

Example:

```typescript
tooltip: {
    enable: true,
    nodeFormat:
        '$name : ${value:n2}',
    linkFormat:
        '$start.name (${start.out:n2}) to ' +
        '${target.name} (${target.in:n2}) : ' +
        '${value:n2}'
}
```

Common number formats include:

```text
n2 -> Number with two decimal places.
n0 -> Number with no decimal places.
c2 -> Currency with two decimal places.
p1 -> Percentage with one decimal place.
e1 -> Exponential notation with one decimal place.
```

Text placeholders should not use numeric formatting.

```text
${name}
${start.name}
${target.name}
```

Validate inline placeholder support against the installed `@syncfusion/ej2-charts` version before using advanced formats in production.

## Tooltip Appearance

Configure tooltip appearance through the public tooltip model.

```typescript
tooltip: {
    enable: true,
    fill: '#111827',
    opacity: 0.9,
    enableAnimation: true,
    duration: 300,
    fadeOutDuration: 1000,
    fadeOutMode: 'Move',

    textStyle: {
        color: '#ffffff',
        size: '13px',
        fontFamily: 'Segoe UI',
        fontWeight: '500'
    }
}
```

Common tooltip settings include:

```text
enable           -> Enables or disables tooltips.
fill             -> Tooltip background color.
opacity          -> Tooltip-container opacity.
textStyle        -> Tooltip-text appearance.
nodeFormat       -> Node tooltip text.
linkFormat       -> Link tooltip text.
enableAnimation  -> Enables tooltip animation.
duration         -> Tooltip animation duration.
fadeOutDuration  -> Tooltip fade-out duration.
fadeOutMode      -> Tooltip fade-out behavior.
```

Do not use unverified tooltip properties such as:

```typescript
position: 'Pointer'
```

unless the installed Sankey tooltip model explicitly supports them.

## Tooltip Rendering Event

Use `tooltipRendering` for conditional tooltip customization when the installed event argument model is available.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        tooltip: {
            enable: true
        },

        tooltipRendering:
            (args): void => {
                console.log(
                    'Tooltip is rendering.',
                    args
                );
            }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use the typed tooltip-rendering event interface exported by the installed package instead of retaining an implicit or untyped argument in production code.

## Legend Configuration

A legend provides a visual key for the categories represented by Sankey nodes.

In TypeScript, import and inject `SankeyLegend`.

## Enabling the Legend

### TypeScript

```typescript
import {
    Sankey,
    SankeyLegend
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyLegend
);

const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        legendSettings: {
            visible: true
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

### JavaScript

```javascript
var sankey =
    new ej.charts.Sankey({
        nodes: nodes,
        links: links,

        legendSettings: {
            visible: true
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

## Legend Position

Use `legendSettings.position`.

Right:

```typescript
legendSettings: {
    visible: true,
    position: 'Right'
}
```

Left:

```typescript
legendSettings: {
    visible: true,
    position: 'Left'
}
```

Top:

```typescript
legendSettings: {
    visible: true,
    position: 'Top'
}
```

Bottom:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom'
}
```

Automatic position:

```typescript
legendSettings: {
    visible: true,
    position: 'Auto'
}
```

Use `Custom` only with the additional location configuration required by the installed Sankey legend model.

## Legend Styling

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    width: '600px',
    height: '60px',
    background: '#ffffff',
    opacity: 1,
    padding: 8,
    itemPadding: 12,
    shapeWidth: 12,
    shapeHeight: 12,
    shapePadding: 8,
    title: 'Energy Sources',

    border: {
        color: '#d1d5db',
        width: 1
    },

    textStyle: {
        fontFamily: 'Segoe UI',
        size: '12px',
        fontWeight: 'Normal',
        color: '#374151'
    }
}
```

Common legend properties include:

```text
visible         -> Legend visibility.
position        -> Auto, Top, Bottom, Left, Right, or Custom.
width           -> Legend width.
height          -> Legend height.
shapeWidth      -> Legend-symbol width.
shapeHeight     -> Legend-symbol height.
padding         -> Legend-container padding.
itemPadding     -> Spacing between legend items.
shapePadding    -> Spacing between symbol and text.
background      -> Legend background color.
opacity         -> Legend opacity.
title           -> Legend title.
enableHighlight -> Related-element highlighting.
isInversed      -> Inverts legend-item layout.
border          -> Legend-border appearance.
textStyle       -> Legend-text appearance.
```

## Legend Items

Legend items are derived from Sankey nodes and their colors.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'Category A',

        label: {
            text: 'Category A'
        },

        color: '#3b82f6'
    },
    {
        id: 'Category B',

        label: {
            text: 'Category B'
        },

        color: '#8b5cf6'
    },
    {
        id: 'Category C',

        label: {
            text: 'Category C'
        },

        color: '#10b981'
    }
];
```

Use `legendItemRendering` when a legend item requires conditional customization.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        legendSettings: {
            visible: true
        },

        legendItemRendering:
            (args): void => {
                console.log(
                    'Legend item rendering.',
                    args
                );
            }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use the exact event-argument interface exported by the installed version.

## Toggle Legend Visibility

Required HTML:

```html
<button id="toggleLegendButton" type="button">
    Hide legend
</button>

<div id="sankey-container"></div>
```

TypeScript:

```typescript
const toggleLegendButton:
    HTMLButtonElement | null =
        document.getElementById(
            'toggleLegendButton'
        ) as HTMLButtonElement | null;

if (toggleLegendButton) {
    toggleLegendButton.addEventListener(
        'click',
        (): void => {
            const isVisible: boolean =
                Boolean(
                    sankey
                        .legendSettings
                        .visible
                );

            sankey.legendSettings.visible =
                !isVisible;

            sankey.refresh();

            toggleLegendButton.textContent =
                isVisible
                    ? 'Show legend'
                    : 'Hide legend';
        }
    );
}
```

JavaScript:

```javascript
var toggleLegendButton =
    document.getElementById(
        'toggleLegendButton'
    );

if (toggleLegendButton) {
    toggleLegendButton.addEventListener(
        'click',
        function () {
            var isVisible =
                Boolean(
                    sankey
                        .legendSettings
                        .visible
                );

            sankey.legendSettings.visible =
                !isVisible;

            sankey.refresh();

            toggleLegendButton.textContent =
                isVisible
                    ? 'Show legend'
                    : 'Hide legend';
        }
    );
}
```

## Selection and Highlighting

Do not use Cartesian Chart selection properties for Sankey.

Avoid:

```typescript
selectionMode: 'Point'
```

Avoid an unsupported programmatic selection call:

```typescript
sankey.select([
    {
        id: 'Product A'
    }
]);
```

Use node and link interaction opacity to emphasize active flows.

### Node Highlighting

```typescript
nodeStyle: {
    opacity: 0.9,
    highlightOpacity: 1,
    inactiveOpacity: 0.25
}
```

### Link Highlighting

```typescript
linkStyle: {
    opacity: 0.5,
    highlightOpacity: 1,
    inactiveOpacity: 0.15
}
```

Complete configuration:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        nodeStyle: {
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
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

This provides visual focus during supported Sankey interactions without using unsupported point-selection APIs.

## Event Handling

The Sankey component provides lifecycle, rendering, interaction, export, and print events.

Common events include:

```text
load
loaded
legendItemRendering
labelRendering
nodeRendering
linkRendering
tooltipRendering
nodeClick
nodeEnter
nodeLeave
linkClick
linkEnter
linkLeave
sizeChanged
beforeExport
afterExport
exportCompleted
beforePrint
```

Use event interfaces exported by the installed `@syncfusion/ej2-charts` package where available.

## Lifecycle Events

### Load

The `load` event is triggered before rendering begins.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        load: (args): void => {
            console.log(
                'Sankey is loading.',
                args
            );
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

### Loaded

The `loaded` event is triggered after rendering completes.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        loaded: (args): void => {
            console.log(
                'Sankey loaded.',
                args
            );
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use `loaded` to:

- Enable export controls.
- Announce rendering completion.
- Record rendering telemetry.
- Start actions requiring the rendered diagram.

## Node Events

Use dedicated Sankey node events.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        nodeEnter: (args): void => {
            console.log(
                'Pointer entered a node.',
                args
            );
        },

        nodeLeave: (args): void => {
            console.log(
                'Pointer left a node.',
                args
            );
        },

        nodeClick: (args): void => {
            console.log(
                'A node was clicked.',
                args
            );
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Do not use an unsupported event such as:

```typescript
nodeMouseMove
```

## Link Events

Use dedicated Sankey link events.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        linkEnter: (args): void => {
            console.log(
                'Pointer entered a link.',
                args
            );
        },

        linkLeave: (args): void => {
            console.log(
                'Pointer left a link.',
                args
            );
        },

        linkClick: (args): void => {
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

Do not use:

```typescript
linkMouseMove
```

Do not use Cartesian Chart point events:

```typescript
pointMouseMove
pointClick
pointRender
```

## Node Rendering Event

Use `nodeRendering` to customize a node before rendering.

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
        'Important'
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

Use:

```text
nodeRendering
```

Do not use:

```text
nodeRender
```

## Link Rendering Event

Use `linkRendering` to customize the link fill before rendering.

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

Use:

```text
linkRendering
```

Do not use:

```text
linkRender
```

Do not assign an unsupported per-link opacity through the render event.

## RTL Support

Use `enableRtl` to enable right-to-left rendering.

### TypeScript

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,
        enableRtl: true
    });

sankey.appendTo(
    '#sankey-container'
);
```

### JavaScript

```javascript
var sankey =
    new ej.charts.Sankey({
        nodes: nodes,
        links: links,
        enableRtl: true
    });

sankey.appendTo(
    '#sankey-container'
);
```

RTL and orientation are separate settings.

```text
enableRtl  -> Controls right-to-left rendering.
orientation -> Controls Horizontal or Vertical flow layout.
```

Example:

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

## RTL Labels

Use the node label model for localized labels.

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'sales',

        label: {
            text: 'مبيعات'
        }
    },
    {
        id: 'revenue',

        label: {
            text: 'إيرادات'
        }
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId: 'sales',
        targetId: 'revenue',
        value: 100
    }
];
```

Use semantic page direction:

```html
<section
    dir="rtl"
    lang="ar"
    aria-labelledby="sankey-heading"
>
    <h1 id="sankey-heading">
        تدفق الإيرادات
    </h1>

    <div id="sankey-container"></div>
</section>
```

Do not depend on undocumented internal selectors such as:

```css
.e-sankey-label {
    direction: rtl;
}
```

Use public Sankey configuration and semantic HTML.

If `locale` is set, ensure that the required locale data is loaded and available to the application.

## Print and Export

Sankey exporting requires `SankeyExport` in a TypeScript module-based application.

## Export Module

```typescript
import {
    Sankey,
    SankeyExport
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyExport
);
```

Inject the export module before creating the Sankey instance.

## Export to PNG

```typescript
sankey.export(
    'PNG',
    'sankey-diagram'
);
```

## Export to JPEG

```typescript
sankey.export(
    'JPEG',
    'sankey-diagram'
);
```

## Export to SVG

```typescript
sankey.export(
    'SVG',
    'sankey-diagram'
);
```

## Export to PDF

When PDF export is supported by the installed Sankey version:

```typescript
sankey.export(
    'PDF',
    'sankey-diagram'
);
```

Use a filename without an extension unless the installed API explicitly requires it.

Preferred:

```typescript
sankey.export(
    'PNG',
    'revenue-flow'
);
```

Avoid:

```typescript
sankey.export(
    'PNG',
    'revenue-flow.png'
);
```

## Print

```typescript
sankey.print();
```

JavaScript:

```javascript
sankey.print();
```

Validate print support and any required export module against the installed package version.

## Export and Print Controls

Required HTML:

```html
<div class="sankey-actions">
    <button id="exportPngButton" type="button" disabled>
        Export PNG
    </button>

    <button id="exportSvgButton" type="button" disabled>
        Export SVG
    </button>

    <button id="printButton" type="button" disabled>
        Print
    </button>
</div>

<div id="sankey-container"></div>
```

TypeScript:

```typescript
const exportPngButton:
    HTMLButtonElement | null =
        document.getElementById(
            'exportPngButton'
        ) as HTMLButtonElement | null;

const exportSvgButton:
    HTMLButtonElement | null =
        document.getElementById(
            'exportSvgButton'
        ) as HTMLButtonElement | null;

const printButton:
    HTMLButtonElement | null =
        document.getElementById(
            'printButton'
        ) as HTMLButtonElement | null;

const enableActions = (): void => {
    if (exportPngButton) {
        exportPngButton.disabled =
            false;
    }

    if (exportSvgButton) {
        exportSvgButton.disabled =
            false;
    }

    if (printButton) {
        printButton.disabled =
            false;
    }
};

const sankey: Sankey =
    new Sankey({
        nodes,
        links,
        loaded:
            enableActions
    });

sankey.appendTo(
    '#sankey-container'
);

if (exportPngButton) {
    exportPngButton.addEventListener(
        'click',
        (): void => {
            sankey.export(
                'PNG',
                'sankey-diagram'
            );
        }
    );
}

if (exportSvgButton) {
    exportSvgButton.addEventListener(
        'click',
        (): void => {
            sankey.export(
                'SVG',
                'sankey-diagram'
            );
        }
    );
}

if (printButton) {
    printButton.addEventListener(
        'click',
        (): void => {
            sankey.print();
        }
    );
}
```

## Export Events

Use Sankey export and print events where required.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        beforeExport: (args): void => {
            console.log(
                'Export is starting.',
                args
            );
        },

        afterExport: (args): void => {
            console.log(
                'Export completed.',
                args
            );
        },

        exportCompleted: (args): void => {
            console.log(
                'Export process completed.',
                args
            );
        },

        beforePrint: (args): void => {
            console.log(
                'Print is starting.',
                args
            );
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use the exact event-argument types exported by the installed package.

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
                Solar and wind energy flow through the power grid
                to residential use, industrial use, and transmission loss.
            </p>
        </header>

        <div class="sankey-actions">
            <button
                id="toggleLegendButton"
                type="button"
            >
                Hide legend
            </button>

            <button
                id="exportPngButton"
                type="button"
                disabled
            >
                Export PNG
            </button>

            <button
                id="exportSvgButton"
                type="button"
                disabled
            >
                Export SVG
            </button>

            <button
                id="printButton"
                type="button"
                disabled
            >
                Print
            </button>
        </div>

        <div id="sankey-container"></div>

        <p
            id="sankey-status"
            aria-live="polite"
            aria-atomic="true"
        >
            Loading Sankey diagram.
        </p>
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

.sankey-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
}

.sankey-actions button {
    padding: 8px 14px;
    color: #111827;
    background: #ffffff;
    border: 1px solid #6b7280;
    border-radius: 4px;
    cursor: pointer;
}

.sankey-actions button:disabled {
    color: #6b7280;
    background: #f3f4f6;
    cursor: not-allowed;
}

.sankey-actions button:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 2px;
}

#sankey-container {
    width: 100%;
    min-height: 520px;
}

#sankey-status {
    margin-top: 12px;
    color: #374151;
    font-family: "Segoe UI", sans-serif;
    font-size: 14px;
}
```

### TypeScript

```typescript
import {
    Sankey,
    SankeyExport,
    SankeyLegend,
    SankeyTooltip,
    type SankeyLinkModel,
    type SankeyLinkRenderEventArgs,
    type SankeyNodeModel,
    type SankeyNodeRenderEventArgs
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyTooltip,
    SankeyLegend,
    SankeyExport
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
        value: 400
    },
    {
        sourceId: 'Wind',
        targetId: 'Grid',
        value: 600
    },
    {
        sourceId: 'Grid',
        targetId: 'Residential',
        value: 500
    },
    {
        sourceId: 'Grid',
        targetId: 'Industrial',
        value: 400
    },
    {
        sourceId: 'Grid',
        targetId: 'Loss',
        value: 100
    }
];

const statusElement:
    HTMLElement | null =
        document.getElementById(
            'sankey-status'
        );

const toggleLegendButton:
    HTMLButtonElement | null =
        document.getElementById(
            'toggleLegendButton'
        ) as HTMLButtonElement | null;

const exportPngButton:
    HTMLButtonElement | null =
        document.getElementById(
            'exportPngButton'
        ) as HTMLButtonElement | null;

const exportSvgButton:
    HTMLButtonElement | null =
        document.getElementById(
            'exportSvgButton'
        ) as HTMLButtonElement | null;

const printButton:
    HTMLButtonElement | null =
        document.getElementById(
            'printButton'
        ) as HTMLButtonElement | null;

const handleNodeRendering = (
    args:
        SankeyNodeRenderEventArgs
): void => {
    if (
        args.node.id ===
        'Grid'
    ) {
        args.node.color =
            '#7c3aed';
    }
};

const handleLinkRendering = (
    args:
        SankeyLinkRenderEventArgs
): void => {
    if (
        args.link.targetId ===
        'Loss'
    ) {
        args.fill =
            '#dc2626';
    }
};

const enableActions = (): void => {
    if (exportPngButton) {
        exportPngButton.disabled =
            false;
    }

    if (exportSvgButton) {
        exportSvgButton.disabled =
            false;
    }

    if (printButton) {
        printButton.disabled =
            false;
    }

    if (statusElement) {
        statusElement.textContent =
            'Sankey diagram loaded.';
    }
};

const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        title:
            'Renewable Energy Distribution',
        subTitle:
            'Generation, usage, and transmission loss',
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
            highlightOpacity: 1,
            inactiveOpacity: 0.15,
            curvature: 0.55,
            colorType: 'Blend'
        },

        labelSettings: {
            visible: true,

            font: {
                fontFamily:
                    'Segoe UI',
                size: '13px',
                fontWeight: '500',
                color: '#111827'
            }
        },

        tooltip: {
            enable: true,
            fill: '#111827',
            opacity: 0.9,
            nodeFormat:
                '$name : $value',
            linkFormat:
                '$start.name ($start.value) to ' +
                '$target.name ($target.value)',
            enableAnimation: true
        },

        legendSettings: {
            visible: true,
            position: 'Bottom',
            title:
                'Energy Categories',
            enableHighlight: true
        },

        nodeRendering:
            handleNodeRendering,

        linkRendering:
            handleLinkRendering,

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
        },

        loaded:
            enableActions,

        beforeExport: (args): void => {
            console.log(
                'Export starting.',
                args
            );
        },

        afterExport: (args): void => {
            console.log(
                'Export completed.',
                args
            );
        },

        beforePrint: (args): void => {
            console.log(
                'Print starting.',
                args
            );
        }
    });

sankey.appendTo(
    '#sankey-container'
);

if (toggleLegendButton) {
    toggleLegendButton.addEventListener(
        'click',
        (): void => {
            const isVisible: boolean =
                Boolean(
                    sankey
                        .legendSettings
                        .visible
                );

            sankey.legendSettings.visible =
                !isVisible;

            sankey.refresh();

            toggleLegendButton.textContent =
                isVisible
                    ? 'Show legend'
                    : 'Hide legend';
        }
    );
}

if (exportPngButton) {
    exportPngButton.addEventListener(
        'click',
        (): void => {
            sankey.export(
                'PNG',
                'energy-distribution'
            );
        }
    );
}

if (exportSvgButton) {
    exportSvgButton.addEventListener(
        'click',
        (): void => {
            sankey.export(
                'SVG',
                'energy-distribution'
            );
        }
    );
}

if (printButton) {
    printButton.addEventListener(
        'click',
        (): void => {
            sankey.print();
        }
    );
}
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

    <title>Sankey Features and Interaction</title>

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

        .sankey-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 12px;
        }

        .sankey-actions button {
            padding: 8px 14px;
            color: #111827;
            background: #ffffff;
            border: 1px solid #6b7280;
            border-radius: 4px;
            cursor: pointer;
        }

        .sankey-actions button:disabled {
            color: #6b7280;
            background: #f3f4f6;
            cursor: not-allowed;
        }

        .sankey-actions button:focus-visible {
            outline: 3px solid #2563eb;
            outline-offset: 2px;
        }

        #sankey-container {
            width: 100%;
            min-height: 520px;
        }

        #sankey-status {
            margin-top: 12px;
            color: #374151;
            font-family: "Segoe UI", sans-serif;
            font-size: 14px;
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
                    Solar and wind energy flow through the power grid
                    to residential use, industrial use, and transmission loss.
                </p>
            </header>

            <div class="sankey-actions">
                <button
                    id="toggleLegendButton"
                    type="button"
                >
                    Hide legend
                </button>

                <button
                    id="exportPngButton"
                    type="button"
                    disabled
                >
                    Export PNG
                </button>

                <button
                    id="exportSvgButton"
                    type="button"
                    disabled
                >
                    Export SVG
                </button>

                <button
                    id="printButton"
                    type="button"
                    disabled
                >
                    Print
                </button>
            </div>

            <div id="sankey-container"></div>

            <p
                id="sankey-status"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading Sankey diagram.
            </p>
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
                    text: 'Transmission Loss'
                },

                color: '#ef4444'
            }
        ];

        var links = [
            {
                sourceId: 'Solar',
                targetId: 'Grid',
                value: 400
            },
            {
                sourceId: 'Wind',
                targetId: 'Grid',
                value: 600
            },
            {
                sourceId: 'Grid',
                targetId: 'Residential',
                value: 500
            },
            {
                sourceId: 'Grid',
                targetId: 'Industrial',
                value: 400
            },
            {
                sourceId: 'Grid',
                targetId: 'Loss',
                value: 100
            }
        ];

        var statusElement =
            document.getElementById(
                'sankey-status'
            );

        var toggleLegendButton =
            document.getElementById(
                'toggleLegendButton'
            );

        var exportPngButton =
            document.getElementById(
                'exportPngButton'
            );

        var exportSvgButton =
            document.getElementById(
                'exportSvgButton'
            );

        var printButton =
            document.getElementById(
                'printButton'
            );

        function enableActions() {
            if (exportPngButton) {
                exportPngButton.disabled =
                    false;
            }

            if (exportSvgButton) {
                exportSvgButton.disabled =
                    false;
            }

            if (printButton) {
                printButton.disabled =
                    false;
            }

            if (statusElement) {
                statusElement.textContent =
                    'Sankey diagram loaded.';
            }
        }

        function handleNodeRendering(
            args
        ) {
            if (
                args.node.id ===
                'Grid'
            ) {
                args.node.color =
                    '#7c3aed';
            }
        }

        function handleLinkRendering(
            args
        ) {
            if (
                args.link.targetId ===
                'Loss'
            ) {
                args.fill =
                    '#dc2626';
            }
        }

        var sankey =
            new ej.charts.Sankey({
                width: '100%',
                height: '520px',
                title:
                    'Renewable Energy Distribution',
                subTitle:
                    'Generation, usage, and transmission loss',
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
                    highlightOpacity: 1,
                    inactiveOpacity: 0.15,
                    curvature: 0.55,
                    colorType: 'Blend'
                },

                labelSettings: {
                    visible: true,

                    font: {
                        fontFamily: 'Segoe UI',
                        size: '13px',
                        fontWeight: '500',
                        color: '#111827'
                    }
                },

                tooltip: {
                    enable: true,
                    fill: '#111827',
                    opacity: 0.9,
                    nodeFormat:
                        '$name : $value',
                    linkFormat:
                        '$start.name ($start.value) to ' +
                        '$target.name ($target.value)',
                    enableAnimation: true
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    title: 'Energy Categories',
                    enableHighlight: true
                },

                nodeRendering:
                    handleNodeRendering,

                linkRendering:
                    handleLinkRendering,

                nodeClick:
                    function (args) {
                        console.log(
                            'Node clicked.',
                            args
                        );
                    },

                linkClick:
                    function (args) {
                        console.log(
                            'Link clicked.',
                            args
                        );
                    },

                loaded:
                    enableActions
            });

        sankey.appendTo(
            '#sankey-container'
        );

        if (toggleLegendButton) {
            toggleLegendButton.addEventListener(
                'click',
                function () {
                    var isVisible =
                        Boolean(
                            sankey
                                .legendSettings
                                .visible
                        );

                    sankey.legendSettings.visible =
                        !isVisible;

                    sankey.refresh();

                    toggleLegendButton.textContent =
                        isVisible
                            ? 'Show legend'
                            : 'Hide legend';
                }
            );
        }

        if (exportPngButton) {
            exportPngButton.addEventListener(
                'click',
                function () {
                    sankey.export(
                        'PNG',
                        'energy-distribution'
                    );
                }
            );
        }

        if (exportSvgButton) {
            exportSvgButton.addEventListener(
                'click',
                function () {
                    sankey.export(
                        'SVG',
                        'energy-distribution'
                    );
                }
            );
        }

        if (printButton) {
            printButton.addEventListener(
                'click',
                function () {
                    sankey.print();
                }
            );
        }
    </script>
</body>
</html>
```

## Accessibility Guidance

Tooltips, legends, and RTL support do not automatically make an application accessible.

Also provide:

- A visible heading.
- A concise diagram description.
- Descriptive node labels.
- Native buttons for export and print.
- Visible focus styles.
- A text summary of important flows.
- A semantic data table when exact values must be available nonvisually.
- Sufficient contrast.
- Non-color status information.
- Keyboard testing.
- Screen-reader testing.
- Browser zoom testing.

Do not claim keyboard navigation unless it has been implemented and tested.

Do not use an unsupported rendering event to assign arbitrary ARIA attributes.

Use semantic surrounding HTML:

```html
<section
    aria-labelledby="sankey-heading"
    aria-describedby="sankey-description"
>
    <h1 id="sankey-heading">
        Revenue Flow
    </h1>

    <p id="sankey-description">
        The diagram shows revenue flowing from products
        to operating costs and profit.
    </p>

    <div id="sankey-container"></div>
</section>
```

## Runtime Validation Checklist

```text
✅ Sankey is imported in TypeScript.
✅ SankeyTooltip is imported and injected when tooltips are enabled.
✅ SankeyLegend is imported and injected when the legend is visible.
✅ SankeyExport is imported and injected when export is used.
✅ Every injected module is imported.
✅ Module injection occurs before Sankey construction.
✅ Global JavaScript does not call Sankey.Inject.
✅ The global EJ2 bundle loads before application code.
✅ The Sankey host element exists.
✅ The host element has a measurable height.
✅ sankey.appendTo is called.
✅ The appendTo selector matches the host ID.
✅ Node labels use label.text.
✅ Tooltip nodeFormat uses supported placeholders.
✅ Tooltip linkFormat uses supported placeholders.
✅ Advanced inline formats are validated against the installed version.
✅ Tooltip appearance uses public tooltip properties.
✅ Unverified tooltip position and template properties are not used.
✅ Legend position uses a supported value.
✅ Legend styling uses properties supported by the installed model.
✅ Node interaction uses nodeStyle opacity settings.
✅ Link interaction uses linkStyle opacity settings.
✅ Unsupported selectionMode is not used.
✅ Unsupported select methods are not called.
✅ nodeEnter, nodeLeave, and nodeClick replace Cartesian point events.
✅ linkEnter, linkLeave, and linkClick replace Cartesian point events.
✅ nodeRendering replaces nodeRender.
✅ linkRendering replaces linkRender.
✅ linkRendering changes args.fill for dynamic link color.
✅ enableRtl is treated separately from orientation.
✅ Localized labels use the node label model.
✅ Internal Sankey CSS selectors are not required.
✅ Export controls remain disabled until rendering completes.
✅ Export filenames omit extensions unless required.
✅ Export and print method support is validated.
✅ Native buttons provide keyboard-accessible actions.
✅ High-frequency event handlers remain lightweight.
✅ Accessibility is tested beyond tooltip and legend enablement.
✅ Executable HTML uses actual angle brackets.
✅ No encoded tags replace executable HTML.
✅ No rich-text anchors wrap script URLs.
✅ Every script URL ends in .js.
✅ No malformed .jsscript URL exists.
✅ No strong, br, data-lexical-text, or editor-generated classes remain.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Best Practices

1. Import and inject every optional TypeScript module required by enabled features.

2. Do not inject unused modules.

3. Use `nodeFormat` and `linkFormat` for standard tooltip text.

4. Validate advanced inline number formatting against the installed package version.

5. Keep tooltip text concise.

6. Use a legend when users need help interpreting node colors.

7. Use `nodeStyle` and `linkStyle` opacity for interaction feedback.

8. Use dedicated Sankey events instead of Cartesian Chart point events.

9. Keep pointer-enter and pointer-leave handlers lightweight.

10. Use `nodeRendering` and `linkRendering` for conditional visual customization.

11. Keep RTL configuration separate from orientation.

12. Use semantic `lang` and `dir` attributes for localized content.

13. Load required locale data before setting a nondefault locale.

14. Enable export buttons only after the Sankey has rendered.

15. Use SVG when scalable vector output is required.

16. Use PNG or JPEG for raster-image output.

17. Validate PDF support before presenting it as an available action.

18. Use native buttons for export and print actions.

19. Provide visible focus indicators.

20. Do not claim keyboard navigation without testing it.

21. Provide a semantic data alternative when exact values are important.

22. Destroy the Sankey instance when its dynamic host view is removed.

```typescript
sankey.destroy();
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

### Export Without Module Injection

Incorrect:

```typescript
import {
    Sankey
} from '@syncfusion/ej2-charts';

sankey.export(
    'PNG',
    'sankey'
);
```

Correct:

```typescript
import {
    Sankey,
    SankeyExport
} from '@syncfusion/ej2-charts';

Sankey.Inject(
    SankeyExport
);
```

### Plain-String Node Label

Incorrect:

```typescript
{
    id: 'Sales',
    label: 'Sales'
}
```

Correct:

```typescript
{
    id: 'Sales',

    label: {
        text: 'Sales'
    }
}
```

### Unsupported Tooltip Position

Avoid:

```typescript
tooltip: {
    enable: true,
    position: 'Pointer'
}
```

unless `position` is explicitly exposed by the installed Sankey tooltip model.

### Unvalidated Tooltip Template

Avoid:

```typescript
tooltip: {
    enable: true,
    template:
        '<div>${value}</div>'
}
```

unless the installed Sankey tooltip model and template context have been validated.

Use:

```typescript
tooltip: {
    enable: true,
    nodeFormat:
        '$name : $value',
    linkFormat:
        '$start.name to $target.name : $value'
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

### Unsupported Programmatic Selection

Avoid:

```typescript
sankey.select([
    {
        id: 'Product A'
    }
]);
```

Use supported Sankey events and application state for custom workflows.

### Cartesian Point Events

Avoid:

```typescript
pointMouseMove
pointClick
selectionComplete
```

Use:

```text
nodeEnter
nodeLeave
nodeClick
linkEnter
linkLeave
linkClick
```

### Incorrect Node Event Names

Avoid:

```typescript
nodeMouseMove
nodeRender
```

Use:

```typescript
nodeEnter
nodeLeave
nodeRendering
```

### Incorrect Link Event Names

Avoid:

```typescript
linkMouseMove
linkRender
```

Use:

```typescript
linkEnter
linkLeave
linkRendering
```

### Incorrect Rendering Mutation

Avoid:

```typescript
linkRendering: (
    args
): void => {
    args.opacity =
        0.8;
}
```

Use the supported render-event fill:

```typescript
linkRendering: (
    args:
        SankeyLinkRenderEventArgs
): void => {
    args.fill =
        '#ef4444';
}
```

Configure link opacity globally:

```typescript
linkStyle: {
    opacity: 0.8
}
```

### RTL Through Internal CSS

Avoid:

```css
.e-sankey {
    direction: rtl;
}

.e-sankey-label {
    direction: rtl;
}
```

Use:

```typescript
enableRtl: true
```

and semantic HTML:

```html
<section dir="rtl" lang="ar">
    <div id="sankey-container"></div>
</section>
```

### Locale Without Locale Data

Do not set:

```typescript
locale: 'ar'
```

without loading and validating the required locale resources.

### Export Filename Extension

Avoid:

```typescript
sankey.export(
    'PNG',
    'revenue-flow.png'
);
```

Preferred:

```typescript
sankey.export(
    'PNG',
    'revenue-flow'
);
```

### Export Before Rendering

Avoid starting export before the Sankey has loaded.

Use the `loaded` event to enable export controls.

### Accessibility Claim

Do not claim that tooltips, legends, or RTL automatically provide accessibility compliance.

Also test:

```text
Keyboard interaction
Screen-reader output
Browser zoom
Color contrast
High-contrast mode
Localized content
Native action controls
Nonvisual data alternatives
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
  <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

Use:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
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