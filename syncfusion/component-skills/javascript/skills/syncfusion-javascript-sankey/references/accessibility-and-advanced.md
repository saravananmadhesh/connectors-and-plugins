# Accessibility and Advanced Topics

The Syncfusion EJ2 Sankey component provides keyboard interaction, screen-reader semantics, right-to-left rendering, mobile-device support, and WAI-ARIA integration. Application-level accessibility still requires meaningful descriptions, visible focus indicators, non-color alternatives, responsive layouts, semantic data representations, and testing with assistive technologies.

This guide provides framework-neutral TypeScript and JavaScript examples. It contains no framework lifecycle APIs or component-wrapper syntax.

## Table of Contents

- #wcag-and-application-accessibility
- #accessibility-configuration
- #keyboard-navigation
- #aria-and-semantic-html
- #screen-reader-support
- #accessible-data-table
- #mobile-device-support
- #right-to-left-support
- #performance-optimization
- #runtime-data-updates
- #complete-typescript-example
- #complete-javascript-example
- #troubleshooting
- #testing-checklist
- #best-practices
- #combined-mistakes-and-future-references

## WCAG and Application Accessibility

The Sankey component includes accessibility capabilities, but component support does not automatically make the complete application compliant with a particular accessibility standard.

The application must also validate:

- Page heading structure.
- Diagram naming and description.
- Keyboard reachability.
- Visible keyboard focus.
- Screen-reader reading order.
- Text and non-text contrast.
- Browser zoom and reflow.
- Mobile and touch operation.
- Dynamic status announcements.
- Right-to-left presentation.
- Localized labels.
- Error handling.
- External controls.
- Nonvisual data alternatives.

Do not state that an application is automatically compliant because the Sankey component is present.

Preferred wording:

```text
The Sankey component provides accessibility features.
The complete application must still be tested against
its required accessibility standard.
```

## Accessibility Configuration

Use the Sankey `accessibility` property to configure the accessible description, role, focus behavior, and tab index when required by the installed version.

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        accessibility: {
            accessibilityDescription:
                'Revenue flows from product and service sales ' +
                'to operating expenses, marketing, and profit.',
            accessibilityRole: 'img',
            focusable: true,
            tabIndex: 0
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Common accessibility settings include:

```text
accessibilityDescription -> Describes the visualization.
accessibilityRole        -> Defines the semantic role.
focusable                -> Controls whether the element can receive focus.
tabIndex                 -> Controls keyboard tab order.
```

Use the component accessibility model instead of unconditionally overwriting the generated element with manual roles and tab-index values.

Do not use positive tab-index values:

```typescript
accessibility: {
    tabIndex: 5
}
```

Positive values create a custom focus order that can conflict with the logical document order.

Prefer:

```typescript
accessibility: {
    focusable: true,
    tabIndex: 0
}
```

## Color Contrast

Use sufficient contrast for:

- Labels against the Sankey background.
- Titles and subtitles.
- Node borders against node fills.
- Legend text and background.
- Tooltip text and fill.
- Focus indicators.
- Table text and borders.
- External buttons.

Example:

```typescript
const sankey: Sankey =
    new Sankey({
        background: '#ffffff',

        nodes,
        links,

        nodeStyle: {
            stroke: '#111827',
            strokeWidth: 1,
            opacity: 1
        },

        labelSettings: {
            visible: true,
            fontFamily: 'Segoe UI',
            fontSize: '14px',
            fontWeight: '600',
            color: '#111827'
        },

        titleStyle: {
            fontFamily: 'Segoe UI',
            size: '20px',
            fontWeight: '700',
            color: '#111827'
        }
    });

sankey.appendTo(
    '#sankey-container'
);
```

Do not claim a specific contrast ratio without measuring the final rendered colors, opacity, font size, font weight, and background.

## Color-Independent Communication

Do not use color as the only way to identify a category or state.

Insufficient:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'high',
        color: '#b91c1c'
    },
    {
        id: 'low',
        color: '#047857'
    }
];
```

Better:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'high-priority',

        label: {
            text: 'High Priority'
        },

        color: '#b91c1c'
    },
    {
        id: 'low-priority',

        label: {
            text: 'Low Priority'
        },

        color: '#047857'
    }
];
```

Also provide:

- Tooltips.
- Legend labels.
- Surrounding explanatory text.
- Explicit status names.
- Numeric values.
- A semantic data table.

Avoid using red and green as the only distinction.

## Visible Focus

Do not remove browser focus indicators unless an equally visible replacement is provided.

Application-owned controls:

```css
.sankey-actions button:focus-visible {
    outline: 3px solid #005fcc;
    outline-offset: 3px;
}
```

Sankey wrapper:

```css
.sankey-region:focus-within {
    outline: 3px solid #005fcc;
    outline-offset: 4px;
}
```

Avoid:

```css
*:focus {
    outline: none;
}
```

## Keyboard Navigation

The Sankey component supports keyboard interaction. Test the exact behavior with the installed EJ2 version and the application's enabled features.

Common documented keyboard interactions include:

```text
Alt + J     -> Moves focus to the Sankey.
Tab         -> Moves to the next focusable Sankey element.
Shift + Tab -> Moves to the previous focusable element.
Arrow keys  -> Navigate available nodes or links.
Escape      -> Dismisses an active tooltip.
Ctrl + P    -> Initiates printing.
```

Do not add unsupported properties such as:

```typescript
allowKeyboardNavigation: true
```

Do not add Cartesian Chart selection properties:

```typescript
selectionMode: 'Point'
```

Use the built-in Sankey keyboard behavior and test it in the final application.

### Keyboard Testing

Test the application without a mouse:

1. Move focus to the Sankey.
2. Confirm that focus remains visible.
3. Navigate through available nodes and links.
4. Verify that the focused element has an accessible name.
5. Open and dismiss tooltips.
6. Confirm that focus does not become trapped.
7. Move away from the Sankey with `Tab`.
8. Repeat at 200 percent browser zoom.
9. Repeat at 400 percent browser zoom.
10. Repeat in Horizontal orientation.
11. Repeat in Vertical orientation.
12. Repeat in right-to-left mode when required.

## ARIA and Semantic HTML

Use semantic surrounding HTML to provide application context.

```html
<section
    class="sankey-card"
    aria-labelledby="revenue-flow-heading"
    aria-describedby="revenue-flow-summary"
>
    <h1 id="revenue-flow-heading">
        Revenue Flow Analysis
    </h1>

    <p id="revenue-flow-summary">
        Product and service revenue combine into total revenue.
        Revenue is allocated to operations, marketing, and profit.
    </p>

    <div
        id="sankey-container"
        class="sankey-region"
    ></div>
</section>
```

Configure the component accessibility description:

```typescript
accessibility: {
    accessibilityDescription:
        'Product Sales contributes 650 units and Service Revenue ' +
        'contributes 350 units to Total Revenue. Total Revenue ' +
        'distributes 400 units to Operating Expenses, 200 units ' +
        'to Marketing Investment, and 400 units to Net Profit.',
    accessibilityRole: 'img',
    focusable: true,
    tabIndex: 0
}
```

Do not assign `role="button"` to the Sankey container unless the entire container performs one button action.

## Live Status Messages

Use a polite live region for meaningful asynchronous updates.

```html
<p
    id="sankey-status"
    class="visually-hidden"
    aria-live="polite"
    aria-atomic="true"
>
    Revenue flow diagram is loading.
</p>
```

Update it through `textContent`:

```typescript
const statusElement:
    HTMLElement | null =
        document.getElementById(
            'sankey-status'
        );

if (statusElement) {
    statusElement.textContent =
        'Revenue flow diagram loaded successfully.';
}
```

After a data update:

```typescript
if (statusElement) {
    statusElement.textContent =
        'Revenue flow updated with ' +
        nextNodes.length +
        ' nodes and ' +
        nextLinks.length +
        ' links.';
}
```

Do not announce:

- Every pointer movement.
- Every hover change.
- Every resize event.
- Every rendering callback.
- Decorative updates.

## Interactive Control Semantics

Use native HTML buttons for application-owned actions.

```html
<div class="sankey-actions">
    <button id="refreshButton" type="button">
        Refresh diagram
    </button>

    <button id="horizontalButton" type="button">
        Use horizontal orientation
    </button>

    <button id="verticalButton" type="button">
        Use vertical orientation
    </button>
</div>
```

Do not use a clickable `div`:

```html
<div onclick="refreshDiagram()">
    Refresh diagram
</div>
```

Native buttons provide:

- Keyboard activation.
- Focus behavior.
- Accessible names.
- Disabled state.
- Expected interaction semantics.

## Screen-Reader Support

Provide a text equivalent that explains:

- What the diagram represents.
- Important source nodes.
- Important destination nodes.
- Major values.
- Losses or unallocated values.
- The primary conclusion communicated visually.

Example:

```html
<p id="revenue-flow-description">
    Product Sales contributes 650 units and Service Revenue
    contributes 350 units to Total Revenue. Total Revenue
    distributes 400 units to Operating Expenses, 200 units
    to Marketing Investment, and 400 units to Net Profit.
    Total incoming and outgoing revenue are both 1000 units.
</p>
```

Tooltips are not a replacement for a persistent text equivalent.

## Accessible Data Table

Provide a semantic table when users need exact values in a nonvisual or tabular form.

```html
<section
    class="data-section"
    aria-labelledby="revenue-data-heading"
>
    <h2 id="revenue-data-heading">
        Revenue flow data
    </h2>

    <div class="table-wrapper">
        <table>
            <caption>
                Text equivalent of the revenue flow Sankey diagram
            </caption>

            <thead>
                <tr>
                    <th scope="col">Source</th>
                    <th scope="col">Target</th>
                    <th scope="col">Value</th>
                    <th scope="col">Category</th>
                </tr>
            </thead>

            <tbody id="revenue-flow-table-body"></tbody>
        </table>
    </div>
</section>
```

Generate table rows from the same node and link collections used by the Sankey.

### TypeScript Table Generation

```typescript
interface AccessibleLink {
    sourceId: string;
    targetId: string;
    sourceLabel: string;
    targetLabel: string;
    value: number;
    category: string;
}

const getNodeLabel = (
    node:
        SankeyNodeModel | undefined
): string => {
    if (!node) {
        return '';
    }

    const labelText:
        string | undefined =
            node.label?.text;

    return (
        labelText &&
        labelText.trim().length > 0
    )
        ? labelText
        : String(node.id);
};

const createAccessibleLinks = (
    nodeCollection:
        SankeyNodeModel[],
    linkCollection:
        SankeyLinkModel[],
    categories:
        Map<string, string>
): AccessibleLink[] => {
    const nodeMap:
        Map<
            string,
            SankeyNodeModel
        > =
            new Map<
                string,
                SankeyNodeModel
            >();

    nodeCollection.forEach(
        (
            node:
                SankeyNodeModel
        ): void => {
            nodeMap.set(
                String(node.id),
                node
            );
        }
    );

    return linkCollection.map(
        (
            link:
                SankeyLinkModel
        ): AccessibleLink => {
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

            const key: string =
                sourceId +
                '|||' +
                targetId;

            return {
                sourceId,
                targetId,
                sourceLabel:
                    getNodeLabel(
                        nodeMap.get(
                            sourceId
                        )
                    ),
                targetLabel:
                    getNodeLabel(
                        nodeMap.get(
                            targetId
                        )
                    ),
                value:
                    Number(
                        link.value
                    ),
                category:
                    categories.get(
                        key
                    ) ?? 'Flow'
            };
        }
    );
};
```

Render the rows with DOM APIs:

```typescript
const renderAccessibleTable = (
    accessibleLinks:
        AccessibleLink[]
): void => {
    const tableBody:
        HTMLTableSectionElement | null =
            document.getElementById(
                'revenue-flow-table-body'
            ) as
                HTMLTableSectionElement |
                null;

    if (!tableBody) {
        return;
    }

    tableBody.replaceChildren();

    accessibleLinks.forEach(
        (
            link:
                AccessibleLink
        ): void => {
            const row:
                HTMLTableRowElement =
                    document.createElement(
                        'tr'
                    );

            const sourceCell:
                HTMLTableCellElement =
                    document.createElement(
                        'th'
                    );

            sourceCell.scope =
                'row';

            sourceCell.textContent =
                link.sourceLabel;

            const targetCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            targetCell.textContent =
                link.targetLabel;

            const valueCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            valueCell.textContent =
                String(link.value);

            const categoryCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            categoryCell.textContent =
                link.category;

            row.append(
                sourceCell,
                targetCell,
                valueCell,
                categoryCell
            );

            tableBody.appendChild(
                row
            );
        }
    );
};
```

Do not hide a critical data table with:

```css
display: none;
```

If the table should be visually hidden but remain available to assistive technology, use a validated visually hidden technique.

## Screen-Reader Testing

Test with relevant browser and assistive-technology combinations.

Examples include:

- NVDA on Windows.
- JAWS on Windows.
- VoiceOver on macOS.
- VoiceOver on iOS.
- TalkBack on Android.

Verify:

1. The diagram has a concise accessible name.
2. The detailed description is available.
3. The table has a useful caption.
4. Column headers are announced correctly.
5. Row headers are associated correctly.
6. Focus order follows the document order.
7. Interactive elements have meaningful names.
8. Tooltips do not contain the only copy of essential information.
9. Dynamic updates are announced only when useful.
10. Decorative content is not announced unnecessarily.

## Mobile Device Support

Use a percentage width and definite height.

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

Avoid:

```typescript
height: '100%'
```

unless every relevant ancestor has a definite computed height.

## Touch-Friendly Layout

Configure node sizing globally.

```typescript
nodeStyle: {
    width: 24,
    padding: 14
}
```

Do not assign unsupported width or height properties to individual nodes.

For touch usability:

- Provide spacing around external controls.
- Avoid placing controls over the diagram.
- Keep labels readable.
- Test tap interaction without hover.
- Avoid interactions requiring precise pointer movement.
- Provide the data table as a stable alternative.
- Avoid unnecessary horizontal page scrolling.
- Test portrait and landscape layouts.

## Mobile CSS

```css
.sankey-region {
    width: 100%;
    min-height: 520px;
}

.table-wrapper {
    width: 100%;
    overflow-x: auto;
}

@media (max-width: 768px) {
    .page-container {
        padding: 12px;
    }

    .sankey-card {
        padding: 12px;
    }

    .sankey-region {
        min-height: 600px;
    }

    th,
    td {
        padding: 10px;
    }
}
```

Avoid:

```css
.sankey-region {
    width: 100vw;
}
```

Using `100vw` inside a padded container can create horizontal page overflow.

## Right-to-Left Support

Use `enableRtl` for Sankey right-to-left rendering.

```typescript
const sankey: Sankey =
    new Sankey({
        enableRtl: true,
        nodes,
        links
    });

sankey.appendTo(
    '#sankey-container'
);
```

Use semantic language and direction attributes on surrounding content:

```html
<section
    lang="ar"
    dir="rtl"
    aria-labelledby="sankey-heading"
>
    <h1 id="sankey-heading">
        تحليل تدفق الإيرادات
    </h1>

    <div id="sankey-container"></div>
</section>
```

Use localized node labels:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'sales',

        label: {
            text: 'المبيعات'
        }
    },
    {
        id: 'revenue',

        label: {
            text: 'الإيرادات'
        }
    }
];
```

Do not reverse source and target identifiers merely to create an RTL presentation. The data model must continue to represent the actual flow direction.

Test:

- Node labels.
- Titles.
- Subtitles.
- Legends.
- Tooltips.
- Focus order.
- Table alignment.
- External controls.
- Localized numeric formatting.

## Performance Optimization

## Reduce Visual Complexity

For large data collections:

- Aggregate very small categories into `Other`.
- Remove zero-value links.
- Remove invalid links.
- Aggregate duplicate links.
- Shorten long labels.
- Disable unused tooltips or legends.
- Avoid verbose rendering-event logging.
- Minimize refresh frequency.
- Test with representative production data.
- Profile on the slowest supported device.

Do not add unsupported properties such as:

```typescript
enableVirtualization: true
```

```typescript
renderingMode: 'SVG'
```

```typescript
enableGrouping: false
```

## Aggregate Duplicate Links

```typescript
interface RawLink {
    sourceId: string;
    targetId: string;
    value: number;
}

const aggregateLinks = (
    rawLinks: RawLink[]
): SankeyLinkModel[] => {
    const totals:
        Map<string, number> =
            new Map<
                string,
                number
            >();

    rawLinks.forEach(
        (
            link:
                RawLink
        ): void => {
            if (
                !Number.isFinite(
                    link.value
                ) ||
                link.value <= 0
            ) {
                return;
            }

            const key: string =
                link.sourceId +
                '|||' +
                link.targetId;

            totals.set(
                key,
                (
                    totals.get(key) ??
                    0
                ) +
                link.value
            );
        }
    );

    return Array.from(
        totals,
        (
            [
                key,
                value
            ]: [
                string,
                number
            ]
        ): SankeyLinkModel => {
            const parts:
                string[] =
                    key.split(
                        '|||'
                    );

            return {
                sourceId:
                    parts[0],
                targetId:
                    parts[1],
                value
            };
        }
    );
};
```

## Validate Before Rendering

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
                    'Missing source node: ' +
                    sourceId
                );
            }

            if (
                !nodeIds.has(
                    targetId
                )
            ) {
                throw new Error(
                    'Missing target node: ' +
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

Cycle rejection can be added as an application-level policy when the application requires a strictly acyclic flow.

Do not describe cycle rejection as an unconditional Sankey rendering requirement.

## Update Data Safely

Validate the complete next state before assigning it.

```typescript
const updateSankeyData = (
    sankey:
        Sankey,
    nextNodes:
        SankeyNodeModel[],
    nextLinks:
        SankeyLinkModel[],
    statusElement:
        HTMLElement | null
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

    if (statusElement) {
        statusElement.textContent =
            'Diagram updated with ' +
            nextNodes.length +
            ' nodes and ' +
            nextLinks.length +
            ' links.';
    }
};
```

Update `nodes` and `links` together, then call `refresh()` once.

Do not refresh after each individual modification.

## Avoid Unnecessary Refreshes

Avoid:

```typescript
links.forEach(
    (
        link:
            SankeyLinkModel
    ): void => {
        sankey.links.push(
            link
        );

        sankey.refresh();
    }
);
```

Preferred:

```typescript
const nextLinks:
    SankeyLinkModel[] = [
        ...sankey.links,
        ...additionalLinks
    ];

validateSankeyData(
    sankey.nodes,
    nextLinks
);

sankey.links =
    nextLinks;

sankey.refresh();
```

## Resize Optimization

Test responsive width without a custom listener first.

```typescript
const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        nodes,
        links
    });
```

When a custom listener is required, debounce it.

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

Cleanup:

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

Do not use an anonymous listener when it must later be removed.

## Complete TypeScript Example

### HTML

```html
<main class="page-container">
    <section
        class="sankey-card"
        aria-labelledby="revenue-flow-heading"
        aria-describedby="revenue-flow-summary"
    >
        <h1
            id="revenue-flow-heading"
            class="page-heading"
        >
            Revenue Flow Analysis
        </h1>

        <p
            id="revenue-flow-summary"
            class="diagram-summary"
        >
            Product and service revenue combine into total revenue.
            Total revenue is distributed to operating expenses,
            marketing investment, and net profit.
        </p>

        <div
            id="sankey-container"
            class="sankey-region"
        ></div>

        <p
            id="revenue-flow-description"
            class="visually-hidden"
        >
            Product Sales contributes 650 units and Service Revenue
            contributes 350 units to Total Revenue. Total Revenue
            distributes 400 units to Operating Expenses, 200 units
            to Marketing Investment, and 400 units to Net Profit.
            Total incoming and outgoing revenue are both 1000 units.
        </p>

        <section
            class="data-section"
            aria-labelledby="revenue-data-heading"
        >
            <h2
                id="revenue-data-heading"
                class="section-heading"
            >
                Revenue flow data
            </h2>

            <div class="table-wrapper">
                <table>
                    <caption>
                        Text equivalent of the revenue flow diagram
                    </caption>

                    <thead>
                        <tr>
                            <th scope="col">Source</th>
                            <th scope="col">Target</th>
                            <th scope="col">Value</th>
                            <th scope="col">Category</th>
                        </tr>
                    </thead>

                    <tbody id="revenue-flow-table-body"></tbody>
                </table>
            </div>
        </section>

        <p
            id="sankey-status"
            class="visually-hidden"
            aria-live="polite"
            aria-atomic="true"
        >
            Revenue flow diagram is loading.
        </p>
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
    color: #111827;
    background: #f1f5f9;
    font-family:
        "Segoe UI",
        Arial,
        sans-serif;
}

.sankey-card {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    box-shadow:
        0 4px 16px
        rgb(15 23 42 / 8%);
}

.page-heading {
    margin: 0 0 8px;
    font-size: 1.5rem;
    line-height: 1.3;
}

.section-heading {
    margin: 0 0 12px;
    font-size: 1.25rem;
    line-height: 1.4;
}

.diagram-summary {
    margin: 0 0 16px;
    color: #374151;
    line-height: 1.6;
}

.sankey-region {
    width: 100%;
    min-height: 520px;
    overflow: hidden;
    border-radius: 8px;
}

.sankey-region:focus-within {
    outline: 3px solid #005fcc;
    outline-offset: 4px;
}

.data-section {
    margin-top: 24px;
}

.table-wrapper {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
}

caption {
    padding: 0 0 12px;
    font-weight: 600;
    text-align: left;
}

th,
td {
    padding: 12px;
    border: 1px solid #94a3b8;
    text-align: left;
}

thead th {
    color: #ffffff;
    background: #334155;
}

tbody th {
    font-weight: 600;
    background: #f8fafc;
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip-path: inset(50%);
}

@media (max-width: 768px) {
    .page-container {
        padding: 12px;
    }

    .sankey-card {
        padding: 12px;
    }

    .sankey-region {
        min-height: 600px;
    }

    th,
    td {
        padding: 10px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .sankey-card,
    .sankey-card button {
        scroll-behavior: auto;
        transition-duration: 0.01ms;
        animation-duration: 0.01ms;
        animation-iteration-count: 1;
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

interface AccessibleLink {
    sourceId: string;
    targetId: string;
    sourceLabel: string;
    targetLabel: string;
    value: number;
    category: string;
}

const nodes: SankeyNodeModel[] = [
    {
        id: 'product-sales',

        label: {
            text: 'Product Sales'
        },

        color: '#005a9c'
    },
    {
        id: 'service-revenue',

        label: {
            text: 'Service Revenue'
        },

        color: '#6b46c1'
    },
    {
        id: 'total-revenue',

        label: {
            text: 'Total Revenue'
        },

        color: '#7c3aed'
    },
    {
        id: 'operating-expenses',

        label: {
            text: 'Operating Expenses'
        },

        color: '#b45309'
    },
    {
        id: 'marketing-investment',

        label: {
            text: 'Marketing Investment'
        },

        color: '#be185d'
    },
    {
        id: 'net-profit',

        label: {
            text: 'Net Profit'
        },

        color: '#047857'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId:
            'product-sales',
        targetId:
            'total-revenue',
        value: 650,
        color: '#005a9c'
    },
    {
        sourceId:
            'service-revenue',
        targetId:
            'total-revenue',
        value: 350,
        color: '#6b46c1'
    },
    {
        sourceId:
            'total-revenue',
        targetId:
            'operating-expenses',
        value: 400,
        color: '#b45309'
    },
    {
        sourceId:
            'total-revenue',
        targetId:
            'marketing-investment',
        value: 200,
        color: '#be185d'
    },
    {
        sourceId:
            'total-revenue',
        targetId:
            'net-profit',
        value: 400,
        color: '#047857'
    }
];

const linkCategories:
    Map<string, string> =
        new Map<
            string,
            string
        >([
            [
                'product-sales|||total-revenue',
                'Product income'
            ],
            [
                'service-revenue|||total-revenue',
                'Service income'
            ],
            [
                'total-revenue|||operating-expenses',
                'Operating allocation'
            ],
            [
                'total-revenue|||marketing-investment',
                'Marketing allocation'
            ],
            [
                'total-revenue|||net-profit',
                'Retained profit'
            ]
        ]);

const titleStyle:
    SankeyTitleStyleModel = {
        fontFamily:
            'Segoe UI',
        size: '20px',
        fontWeight: '700',
        fontStyle: 'Normal',
        color: '#111827',
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
        color: '#374151',
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

const getNodeLabel = (
    node:
        SankeyNodeModel | undefined
): string => {
    if (!node) {
        return '';
    }

    const text:
        string | undefined =
            node.label?.text;

    return (
        text &&
        text.trim().length > 0
    )
        ? text
        : String(node.id);
};

const createAccessibleLinks = (
    nodeCollection:
        SankeyNodeModel[],
    linkCollection:
        SankeyLinkModel[]
): AccessibleLink[] => {
    const nodeMap:
        Map<
            string,
            SankeyNodeModel
        > =
            new Map<
                string,
                SankeyNodeModel
            >();

    nodeCollection.forEach(
        (
            node:
                SankeyNodeModel
        ): void => {
            nodeMap.set(
                String(node.id),
                node
            );
        }
    );

    return linkCollection.map(
        (
            link:
                SankeyLinkModel
        ): AccessibleLink => {
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

            const key: string =
                sourceId +
                '|||' +
                targetId;

            return {
                sourceId,
                targetId,
                sourceLabel:
                    getNodeLabel(
                        nodeMap.get(
                            sourceId
                        )
                    ),
                targetLabel:
                    getNodeLabel(
                        nodeMap.get(
                            targetId
                        )
                    ),
                value:
                    Number(
                        link.value
                    ),
                category:
                    linkCategories.get(
                        key
                    ) ?? 'Flow'
            };
        }
    );
};

const renderAccessibleTable = (
    accessibleLinks:
        AccessibleLink[]
): void => {
    const tableBody:
        HTMLTableSectionElement | null =
            document.getElementById(
                'revenue-flow-table-body'
            ) as
                HTMLTableSectionElement |
                null;

    if (!tableBody) {
        return;
    }

    tableBody.replaceChildren();

    accessibleLinks.forEach(
        (
            link:
                AccessibleLink
        ): void => {
            const row:
                HTMLTableRowElement =
                    document.createElement(
                        'tr'
                    );

            const sourceCell:
                HTMLTableCellElement =
                    document.createElement(
                        'th'
                    );

            sourceCell.scope =
                'row';

            sourceCell.textContent =
                link.sourceLabel;

            const targetCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            targetCell.textContent =
                link.targetLabel;

            const valueCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            valueCell.textContent =
                String(link.value);

            const categoryCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            categoryCell.textContent =
                link.category;

            row.append(
                sourceCell,
                targetCell,
                valueCell,
                categoryCell
            );

            tableBody.appendChild(
                row
            );
        }
    );
};

validateSankeyData(
    nodes,
    links
);

renderAccessibleTable(
    createAccessibleLinks(
        nodes,
        links
    )
);

const statusElement:
    HTMLElement | null =
        document.getElementById(
            'sankey-status'
        );

const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        theme: 'Tailwind',
        title:
            'Revenue Flow Analysis',
        subTitle:
            'Annual allocation of 1000 revenue units',
        titleStyle,
        subTitleStyle,
        background:
            '#ffffff',

        border: {
            color: '#94a3b8',
            width: 1,
            dashArray: ''
        },

        margin: {
            left: 30,
            right: 30,
            top: 30,
            bottom: 30
        },

        orientation:
            'Horizontal',

        nodes,
        links,

        nodeStyle: {
            width: 24,
            padding: 14,
            stroke: '#111827',
            strokeWidth: 1,
            opacity: 1,
            highlightOpacity: 1,
            inactiveOpacity: 0.35
        },

        linkStyle: {
            opacity: 0.65,
            highlightOpacity: 1,
            inactiveOpacity: 0.25,
            curvature: 0.55,
            colorType: 'Blend'
        },

        labelSettings: {
            visible: true,
            fontFamily:
                'Segoe UI',
            fontSize: '14px',
            fontWeight: '600',
            fontStyle: 'Normal',
            color: '#111827',
            padding: 10
        },

        tooltip: {
            enable: true
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        },

        accessibility: {
            accessibilityDescription:
                'Product Sales contributes 650 units and Service Revenue ' +
                'contributes 350 units to Total Revenue. Total Revenue ' +
                'distributes 400 units to Operating Expenses, 200 units ' +
                'to Marketing Investment, and 400 units to Net Profit.',
            accessibilityRole:
                'img',
            focusable: true,
            tabIndex: 0
        },

        loaded: (): void => {
            if (statusElement) {
                statusElement.textContent =
                    'Revenue flow diagram loaded successfully.';
            }
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
        Sankey Accessibility and Advanced Topics
    </title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .page-container {
            width: 100%;
            min-height: 100vh;
            padding: 24px;
            box-sizing: border-box;
            color: #111827;
            background: #f1f5f9;
            font-family:
                "Segoe UI",
                Arial,
                sans-serif;
        }

        .sankey-card {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
            box-shadow:
                0 4px 16px
                rgb(15 23 42 / 8%);
        }

        .page-heading {
            margin: 0 0 8px;
            font-size: 1.5rem;
            line-height: 1.3;
        }

        .section-heading {
            margin: 0 0 12px;
            font-size: 1.25rem;
            line-height: 1.4;
        }

        .diagram-summary {
            margin: 0 0 16px;
            color: #374151;
            line-height: 1.6;
        }

        .sankey-region {
            width: 100%;
            min-height: 520px;
            overflow: hidden;
            border-radius: 8px;
        }

        .sankey-region:focus-within {
            outline: 3px solid #005fcc;
            outline-offset: 4px;
        }

        .data-section {
            margin-top: 24px;
        }

        .table-wrapper {
            width: 100%;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: #ffffff;
        }

        caption {
            padding: 0 0 12px;
            font-weight: 600;
            text-align: left;
        }

        th,
        td {
            padding: 12px;
            border: 1px solid #94a3b8;
            text-align: left;
        }

        thead th {
            color: #ffffff;
            background: #334155;
        }

        tbody th {
            font-weight: 600;
            background: #f8fafc;
        }

        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            white-space: nowrap;
            border: 0;
            clip-path: inset(50%);
        }

        @media (max-width: 768px) {
            .page-container {
                padding: 12px;
            }

            .sankey-card {
                padding: 12px;
            }

            .sankey-region {
                min-height: 600px;
            }

            th,
            td {
                padding: 10px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .sankey-card,
            .sankey-card button {
                scroll-behavior: auto;
                transition-duration: 0.01ms;
                animation-duration: 0.01ms;
                animation-iteration-count: 1;
            }
        }
    </style>
</head>

<body>
    <main class="page-container">
        <section
            class="sankey-card"
            aria-labelledby="revenue-flow-heading"
            aria-describedby="revenue-flow-summary"
        >
            <h1
                id="revenue-flow-heading"
                class="page-heading"
            >
                Revenue Flow Analysis
            </h1>

            <p
                id="revenue-flow-summary"
                class="diagram-summary"
            >
                Product and service revenue combine into total revenue.
                Total revenue is distributed to operating expenses,
                marketing investment, and net profit.
            </p>

            <div
                id="sankey-container"
                class="sankey-region"
            ></div>

            <p
                id="revenue-flow-description"
                class="visually-hidden"
            >
                Product Sales contributes 650 units and Service Revenue
                contributes 350 units to Total Revenue. Total Revenue
                distributes 400 units to Operating Expenses, 200 units
                to Marketing Investment, and 400 units to Net Profit.
                Total incoming and outgoing revenue are both 1000 units.
            </p>

            <section
                class="data-section"
                aria-labelledby="revenue-data-heading"
            >
                <h2
                    id="revenue-data-heading"
                    class="section-heading"
                >
                    Revenue flow data
                </h2>

                <div class="table-wrapper">
                    <table>
                        <caption>
                            Text equivalent of the revenue flow diagram
                        </caption>

                        <thead>
                            <tr>
                                <th scope="col">
                                    Source
                                </th>
                                <th scope="col">
                                    Target
                                </th>
                                <th scope="col">
                                    Value
                                </th>
                                <th scope="col">
                                    Category
                                </th>
                            </tr>
                        </thead>

                        <tbody id="revenue-flow-table-body"></tbody>
                    </table>
                </div>
            </section>

            <p
                id="sankey-status"
                class="visually-hidden"
                aria-live="polite"
                aria-atomic="true"
            >
                Revenue flow diagram is loading.
            </p>
        </section>
    </main>

    <script>
        var nodes = [
            {
                id: 'product-sales',

                label: {
                    text: 'Product Sales'
                },

                color: '#005a9c'
            },
            {
                id: 'service-revenue',

                label: {
                    text: 'Service Revenue'
                },

                color: '#6b46c1'
            },
            {
                id: 'total-revenue',

                label: {
                    text: 'Total Revenue'
                },

                color: '#7c3aed'
            },
            {
                id: 'operating-expenses',

                label: {
                    text: 'Operating Expenses'
                },

                color: '#b45309'
            },
            {
                id: 'marketing-investment',

                label: {
                    text: 'Marketing Investment'
                },

                color: '#be185d'
            },
            {
                id: 'net-profit',

                label: {
                    text: 'Net Profit'
                },

                color: '#047857'
            }
        ];

        var links = [
            {
                sourceId:
                    'product-sales',
                targetId:
                    'total-revenue',
                value: 650,
                color: '#005a9c'
            },
            {
                sourceId:
                    'service-revenue',
                targetId:
                    'total-revenue',
                value: 350,
                color: '#6b46c1'
            },
            {
                sourceId:
                    'total-revenue',
                targetId:
                    'operating-expenses',
                value: 400,
                color: '#b45309'
            },
            {
                sourceId:
                    'total-revenue',
                targetId:
                    'marketing-investment',
                value: 200,
                color: '#be185d'
            },
            {
                sourceId:
                    'total-revenue',
                targetId:
                    'net-profit',
                value: 400,
                color: '#047857'
            }
        ];

        var linkCategories =
            new Map([
                [
                    'product-sales|||total-revenue',
                    'Product income'
                ],
                [
                    'service-revenue|||total-revenue',
                    'Service income'
                ],
                [
                    'total-revenue|||operating-expenses',
                    'Operating allocation'
                ],
                [
                    'total-revenue|||marketing-investment',
                    'Marketing allocation'
                ],
                [
                    'total-revenue|||net-profit',
                    'Retained profit'
                ]
            ]);

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

        function getNodeLabel(
            node
        ) {
            if (!node) {
                return '';
            }

            var text =
                node.label &&
                node.label.text;

            return (
                text &&
                String(text)
                    .trim()
                    .length > 0
            )
                ? String(text)
                : String(node.id);
        }

        function createAccessibleLinks(
            nodeCollection,
            linkCollection
        ) {
            var nodeMap =
                new Map();

            nodeCollection.forEach(
                function (node) {
                    nodeMap.set(
                        String(node.id),
                        node
                    );
                }
            );

            return linkCollection.map(
                function (link) {
                    var sourceId =
                        String(
                            link.sourceId
                        );

                    var targetId =
                        String(
                            link.targetId
                        );

                    var key =
                        sourceId +
                        '|||' +
                        targetId;

                    return {
                        sourceId:
                            sourceId,
                        targetId:
                            targetId,
                        sourceLabel:
                            getNodeLabel(
                                nodeMap.get(
                                    sourceId
                                )
                            ),
                        targetLabel:
                            getNodeLabel(
                                nodeMap.get(
                                    targetId
                                )
                            ),
                        value:
                            Number(
                                link.value
                            ),
                        category:
                            linkCategories.get(
                                key
                            ) || 'Flow'
                    };
                }
            );
        }

        function renderAccessibleTable(
            accessibleLinks
        ) {
            var tableBody =
                document.getElementById(
                    'revenue-flow-table-body'
                );

            if (!tableBody) {
                return;
            }

            tableBody.replaceChildren();

            accessibleLinks.forEach(
                function (link) {
                    var row =
                        document.createElement(
                            'tr'
                        );

                    var sourceCell =
                        document.createElement(
                            'th'
                        );

                    sourceCell.scope =
                        'row';

                    sourceCell.textContent =
                        link.sourceLabel;

                    var targetCell =
                        document.createElement(
                            'td'
                        );

                    targetCell.textContent =
                        link.targetLabel;

                    var valueCell =
                        document.createElement(
                            'td'
                        );

                    valueCell.textContent =
                        String(
                            link.value
                        );

                    var categoryCell =
                        document.createElement(
                            'td'
                        );

                    categoryCell.textContent =
                        link.category;

                    row.append(
                        sourceCell,
                        targetCell,
                        valueCell,
                        categoryCell
                    );

                    tableBody.appendChild(
                        row
                    );
                }
            );
        }

        validateSankeyData(
            nodes,
            links
        );

        renderAccessibleTable(
            createAccessibleLinks(
                nodes,
                links
            )
        );

        var statusElement =
            document.getElementById(
                'sankey-status'
            );

        var sankey =
            new ej.charts.Sankey({
                width: '100%',
                height: '520px',
                theme: 'Tailwind',
                title:
                    'Revenue Flow Analysis',
                subTitle:
                    'Annual allocation of 1000 revenue units',

                titleStyle: {
                    fontFamily:
                        'Segoe UI',
                    size: '20px',
                    fontWeight: '700',
                    fontStyle: 'Normal',
                    color: '#111827',
                    opacity: 1,
                    textAlignment: 'Center'
                },

                subTitleStyle: {
                    fontFamily:
                        'Segoe UI',
                    size: '13px',
                    fontWeight: '400',
                    fontStyle: 'Normal',
                    color: '#374151',
                    opacity: 1,
                    textAlignment: 'Center'
                },

                background:
                    '#ffffff',

                border: {
                    color: '#94a3b8',
                    width: 1,
                    dashArray: ''
                },

                margin: {
                    left: 30,
                    right: 30,
                    top: 30,
                    bottom: 30
                },

                orientation:
                    'Horizontal',

                nodes: nodes,
                links: links,

                nodeStyle: {
                    width: 24,
                    padding: 14,
                    stroke: '#111827',
                    strokeWidth: 1,
                    opacity: 1,
                    highlightOpacity: 1,
                    inactiveOpacity: 0.35
                },

                linkStyle: {
                    opacity: 0.65,
                    highlightOpacity: 1,
                    inactiveOpacity: 0.25,
                    curvature: 0.55,
                    colorType: 'Blend'
                },

                labelSettings: {
                    visible: true,
                    fontFamily:
                        'Segoe UI',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontStyle: 'Normal',
                    color: '#111827',
                    padding: 10
                },

                tooltip: {
                    enable: true
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom'
                },

                accessibility: {
                    accessibilityDescription:
                        'Product Sales contributes 650 units and Service Revenue ' +
                        'contributes 350 units to Total Revenue. Total Revenue ' +
                        'distributes 400 units to Operating Expenses, 200 units ' +
                        'to Marketing Investment, and 400 units to Net Profit.',
                    accessibilityRole:
                        'img',
                    focusable: true,
                    tabIndex: 0
                },

                loaded:
                    function () {
                        if (
                            statusElement
                        ) {
                            statusElement
                                .textContent =
                                    'Revenue flow diagram loaded successfully.';
                        }
                    }
            });

        sankey.appendTo(
            '#sankey-container'
        );
    </script>
</body>
</html>
```

## Troubleshooting

## Diagram Does Not Render

Check:

1. The host element exists.
2. The host ID matches the `appendTo` selector.
3. The host has a measurable height.
4. The EJ2 package or global script loaded successfully.
5. Every node has a unique ID.
6. Every link references existing nodes.
7. Every link value is finite and positive.
8. Node labels use the expected label model.
9. Browser console errors are resolved.

Safe initialization:

```typescript
const host:
    HTMLElement | null =
        document.getElementById(
            'sankey-container'
        );

if (!host) {
    throw new Error(
        'The Sankey host element was not found.'
    );
}

validateSankeyData(
    nodes,
    links
);

const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '520px',
        nodes,
        links
    });

sankey.appendTo(
    host
);
```

## Tooltip Does Not Appear

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

Enable the feature:

```typescript
tooltip: {
    enable: true
}
```

Injection must occur before Sankey construction.

## Legend Does Not Appear

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

Enable the legend:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom'
}
```

## Links Do Not Render Correctly

Check exact identifier matching.

Incorrect:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'total-revenue'
    },
    {
        id: 'profit'
    }
];

const links: SankeyLinkModel[] = [
    {
        sourceId:
            'Total-Revenue',
        targetId:
            'profit',
        value: 100
    }
];
```

Correct:

```typescript
const links: SankeyLinkModel[] = [
    {
        sourceId:
            'total-revenue',
        targetId:
            'profit',
        value: 100
    }
];
```

Identifiers are case-sensitive.

## Labels Are Clipped

Try:

- Increasing component width.
- Increasing left and right margins.
- Reducing label length.
- Reducing font size moderately.
- Increasing component height.
- Changing orientation.
- Reducing node offsets.

```typescript
const sankey: Sankey =
    new Sankey({
        width: '100%',
        height: '600px',

        margin: {
            left: 50,
            right: 50,
            top: 30,
            bottom: 30
        },

        labelSettings: {
            visible: true,
            fontFamily:
                'Segoe UI',
            fontSize: '13px',
            fontWeight: '500',
            color: '#111827'
        },

        nodes,
        links
    });
```

## Diagram Is Slow

Use this process:

1. Measure node and link counts.
2. Remove invalid links.
3. Remove zero-value links.
4. Aggregate duplicate links.
5. Group insignificant categories.
6. Shorten labels.
7. Disable unused features.
8. Remove verbose event logging.
9. Reduce refresh frequency.
10. Debounce resize handling.
11. Profile on target devices.
12. Measure each optimization separately.

Do not add undocumented properties:

```typescript
enableVirtualization: true
```

```typescript
renderingMode: 'SVG'
```

```typescript
enableGrouping: false
```

## Keyboard Focus Is Not Visible

Inspect global CSS for:

```css
*:focus {
    outline: none;
}
```

Remove this rule or provide a visible replacement.

```css
.sankey-region:focus-within {
    outline: 3px solid #005fcc;
    outline-offset: 4px;
}
```

## Screen-Reader Description Is Incomplete

Provide:

- A clear heading.
- A concise summary.
- A detailed accessibility description.
- A semantic table for exact values.
- A selective live region for meaningful updates.

Do not rely on tooltips as the only description.

## Styles Are Not Applied

Use supported properties:

```typescript
const sankey: Sankey =
    new Sankey({
        background:
            '#ffffff',

        nodeStyle: {
            fill: '#2563eb',
            opacity: 1
        },

        linkStyle: {
            opacity: 0.6,
            curvature: 0.55,
            colorType: 'Blend'
        },

        labelSettings: {
            visible: true,
            fontFamily:
                'Segoe UI',
            fontSize: '14px',
            color: '#111827'
        },

        nodes,
        links
    });
```

Do not use:

```typescript
background: {
    color: '#ffffff'
}
```

Do not use:

```typescript
nodeDefaults: {
    label: {
        color: '#111827'
    }
}
```

## Testing Checklist

### Keyboard

- [ ] The Sankey can be reached by keyboard.
- [ ] Focus is clearly visible.
- [ ] Focus order is logical.
- [ ] Nodes and links can be navigated where supported.
- [ ] Tooltips can be dismissed.
- [ ] Focus does not become trapped.
- [ ] Users can move past the Sankey.
- [ ] External actions use native buttons.
- [ ] Positive tab-index values are not used.

### Screen Reader

- [ ] The Sankey has a concise accessible name.
- [ ] A detailed description is available.
- [ ] Essential information is not available only in tooltips.
- [ ] The data table uses a meaningful caption.
- [ ] Column headers are associated correctly.
- [ ] Row headers are associated correctly.
- [ ] Dynamic status updates are selective.
- [ ] Decorative content is not announced unnecessarily.

### Visual Accessibility

- [ ] Text contrast has been measured.
- [ ] Focus contrast has been measured.
- [ ] Meaning is not communicated only through color.
- [ ] Labels remain readable at 200 percent zoom.
- [ ] Content remains usable at 400 percent zoom.
- [ ] High-contrast mode has been tested.
- [ ] Dark and light backgrounds have been validated.
- [ ] Reduced-motion preferences are respected by surrounding UI.

### Mobile

- [ ] The Sankey fits supported viewports.
- [ ] The page avoids unnecessary horizontal scrolling.
- [ ] Touch interactions do not require hover.
- [ ] External controls have sufficient spacing.
- [ ] Labels remain readable.
- [ ] The data table remains accessible.
- [ ] Portrait orientation has been tested.
- [ ] Landscape orientation has been tested.

### Runtime

- [ ] Every node ID is nonempty.
- [ ] Every node ID is unique.
- [ ] Every source ID exists.
- [ ] Every target ID exists.
- [ ] Every link value is finite.
- [ ] Every link value is greater than zero.
- [ ] Node labels use the label model.
- [ ] Required TypeScript modules are imported.
- [ ] Required modules are injected before construction.
- [ ] The host element exists.
- [ ] The host has a measurable height.
- [ ] The appendTo selector matches the host ID.
- [ ] Updates validate the complete next state.
- [ ] Updates call refresh only once.
- [ ] Global listeners are removed.
- [ ] Pending timers are cleared.
- [ ] The Sankey is destroyed when its dynamic view is removed.

## Best Practices

1. Treat the Sankey as a visualization that requires a text equivalent.

2. Provide a concise accessible name and a detailed description.

3. Add a semantic data table for complex or decision-critical flows.

4. Do not make tooltips the only source of essential information.

5. Do not rely only on color, symbols, or emoji.

6. Measure contrast using final rendered values.

7. Preserve visible keyboard focus.

8. Use native HTML controls for external actions.

9. Avoid unnecessary custom keyboard handlers.

10. Test documented keyboard interactions with the installed package version.

11. Use the Sankey `accessibility` model where appropriate.

12. Keep nodes and links synchronized.

13. Validate data before rendering.

14. Aggregate data when visual complexity prevents comprehension.

15. Avoid undocumented virtualization, grouping, and rendering properties.

16. Avoid unnecessary refreshes.

17. Debounce custom resize handling.

18. Import and inject `SankeyTooltip` when tooltips are enabled.

19. Import and inject `SankeyLegend` when the legend is visible.

20. Do not inject unused export modules.

21. Use `enableRtl` for right-to-left rendering.

22. Preserve source and target relationships in RTL layouts.

23. Remove application-owned listeners and timers during cleanup.

24. Destroy the Sankey when its dynamic host view is removed.

## Combined Mistakes and Future References

### Unconditional Compliance Claim

Avoid:

```text
The application is automatically WCAG 2.2 compliant.
```

Use:

```text
The Sankey component provides accessibility features.
The complete application must still be tested against
its required accessibility standard.
```

### Unsupported Keyboard Properties

Incorrect:

```typescript
const sankey: Sankey =
    new Sankey({
        allowKeyboardNavigation:
            true,
        selectionMode:
            'Point',
        nodes,
        links
    });
```

Use built-in keyboard behavior and the accessibility model:

```typescript
const sankey: Sankey =
    new Sankey({
        nodes,
        links,

        accessibility: {
            accessibilityDescription:
                'Revenue allocation Sankey diagram.',
            accessibilityRole:
                'img',
            focusable: true,
            tabIndex: 0
        }
    });
```

### Chart-Series Selection Properties

Incorrect:

```typescript
selectionMode:
    'Point'
```

Use Sankey interaction opacity:

```typescript
nodeStyle: {
    opacity: 1,
    highlightOpacity: 1,
    inactiveOpacity: 0.35
},

linkStyle: {
    opacity: 0.65,
    highlightOpacity: 1,
    inactiveOpacity: 0.25
}
```

### Plain-String Node Label

Incorrect:

```typescript
{
    id: 'sales',
    label: 'Sales'
}
```

Correct:

```typescript
{
    id: 'sales',

    label: {
        text: 'Sales'
    }
}
```

### Incorrect Title Font Property

Incorrect:

```typescript
titleStyle: {
    fontSize: '20px'
}
```

Correct:

```typescript
titleStyle: {
    size: '20px'
}
```

### Unsupported Label Opacity

Avoid:

```typescript
labelSettings: {
    opacity: 1
}
```

unless the installed Sankey label model exposes that property.

Use:

```typescript
labelSettings: {
    visible: true,
    fontFamily:
        'Segoe UI',
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827'
}
```

### Rendering Events as Accessibility Replacement

Do not assume:

```typescript
nodeRendering: (
    args
): void => {
    // Accessibility is automatically completed here.
}
```

Use:

```typescript
accessibility: {
    accessibilityDescription:
        'Revenue flow Sankey diagram.',
    accessibilityRole:
        'img',
    focusable: true,
    tabIndex: 0
}
```

Also provide semantic surrounding content and a data alternative.

### Button Role on Noninteractive Content

Incorrect:

```html
<div role="button">
    Revenue flow diagram
</div>
```

Use a button only for an action:

```html
<button type="button">
    Refresh diagram
</button>
```

### Symbols or Emoji as the Only Label

Insufficient:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'high',
        label: {
            text: '***'
        },
        color: '#b91c1c'
    }
];
```

Better:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'high-priority',

        label: {
            text: 'High Priority'
        },

        color: '#b91c1c'
    }
];
```

### Unsupported Palette Configuration

Avoid:

```typescript
palette: [
    '#000000',
    '#ffffff',
    '#003366'
]
```

Use explicit node colors:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'input',
        color: '#003366'
    },
    {
        id: 'output',
        color: '#006633'
    }
];
```

Or use a global fill:

```typescript
nodeStyle: {
    fill: '#003366'
}
```

### Unsupported nodeDefaults

Incorrect:

```typescript
nodeDefaults: {
    label: {
        color: '#000000'
    }
}
```

Correct:

```typescript
labelSettings: {
    visible: true,
    fontFamily:
        'Segoe UI',
    fontSize: '14px',
    color: '#111827'
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

### Tooltip as the Only Text Alternative

Incorrect assumption:

```typescript
tooltip: {
    enable: true
}
```

A tooltip does not replace a persistent text description.

Also provide:

```html
<p id="revenue-flow-description">
    Product Sales contributes 650 units to Total Revenue.
</p>
```

### Individual Node Dimensions

Incorrect:

```typescript
const nodes: SankeyNodeModel[] = [
    {
        id: 'A',
        width: 50,
        height: 50
    }
];
```

Correct:

```typescript
nodeStyle: {
    width: 24,
    padding: 14
}
```

### Width of 100vw Inside a Padded Container

Potential overflow:

```css
.sankey-region {
    width: 100vw;
}
```

Correct:

```css
.sankey-region {
    width: 100%;
}
```

### Unsupported Virtualization

Incorrect:

```typescript
enableVirtualization:
    true
```

Aggregate or reduce the source data before rendering.

### Unsupported Performance Claim

Avoid:

```text
The Sankey supports thousands of nodes without performance impact.
```

Use:

```text
Performance depends on node count, link count, labels,
enabled features, browser, device, and update frequency.
Test representative production data on target devices.
```

### Unsupported Rendering Mode

Incorrect:

```typescript
renderingMode:
    'SVG'
```

Do not add a rendering-mode property unless it is exposed by the installed Sankey API.

### Unsupported Grouping

Incorrect:

```typescript
enableGrouping:
    false
```

Simplify and aggregate the node and link collections before rendering.

### Blindly Appending Disconnected Data

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

### beforeunload for Normal Cleanup

Avoid:

```typescript
window.addEventListener(
    'beforeunload',
    (): void => {
        sankey.destroy();
    }
);
```

Remove application-owned resources when the dynamic host view is removed:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);

sankey.destroy();
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

### Refreshing on Every Resize Event

Potentially expensive:

```typescript
const handleResize =
    (): void => {
        sankey.refresh();
    };
```

Debounced:

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

Use:

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