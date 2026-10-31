# Advanced Features in Syncfusion HeatMap

- #rendering-modes
  - #svg-rendering
  - #canvas-rendering
  - #choosing-a-rendering-mode
  - #runtime-rendering-mode-update
- #bubble-heatmap
  - #bubble-tile-type
  - #size-bubble
  - #color-bubble
  - #sector-bubble
  - #size-and-color-bubble
- #cell-selection
  - #single-selection
  - #multiple-selection
  - #clearing-selection
  - #selection-and-highlighting
- #export-functionality
  - #image-export
  - #export-timing
- #performance-optimization
  - #large-dataset-guidance
  - #efficient-data-updates
  - #server-side-windowing
  - #api-data-validation
  - #resource-cleanup
- #accessibility
  - #accessible-description
  - #non-color-alternatives
  - #accessible-data-table
  - #keyboard-accessible-actions
  - #high-contrast-presentation
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Rendering Modes

The HeatMap can render through SVG or Canvas.

```text
SVG    -> Vector-based rendering.
Canvas -> Bitmap-based rendering.
```

Select the rendering mode explicitly when the application has a specific rendering or performance requirement.

Do not claim that the HeatMap automatically changes its rendering mode according to a fixed cell-count threshold unless that behavior is explicitly documented and validated for the installed version.

The most appropriate mode depends on:

- Matrix row and column counts.
- Axis-label complexity.
- Cell-label visibility.
- Tooltip and selection requirements.
- Browser and device resources.
- Export requirements.
- Accessibility requirements.
- Refresh frequency.
- Custom cell-rendering logic.

### SVG Rendering

Use SVG when vector rendering is appropriate.

```typescript
renderingMode: 'SVG'
```

SVG can be useful when:

- The HeatMap contains a manageable number of cells.
- Vector output is important.
- The application requires SVG-based rendering.
- The generated visual must remain sharp when scaled.
- Individual visual elements must be inspected during development.

### TypeScript

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const data: number[][] = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 4]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',
        renderingMode: 'SVG',

        dataSource: data,

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4'
            ]
        },

        yAxis: {
            labels: [
                '2021',
                '2022',
                '2023'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### JavaScript

```javascript
var data = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 4]
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',
        renderingMode: 'SVG',

        dataSource: data,

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4'
            ]
        },

        yAxis: {
            labels: [
                '2021',
                '2022',
                '2023'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### Canvas Rendering

Use Canvas when the application requires bitmap-based rendering.

```typescript
renderingMode: 'Canvas'
```

Canvas can be appropriate when:

- The matrix contains many cells.
- Rendering performance is more important than SVG output.
- The application refreshes the complete matrix frequently.
- The target browsers and devices perform better with Canvas.
- Individual SVG elements are not required.

### TypeScript

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '600px',
        renderingMode: 'Canvas',

        dataSource: [
            [12, 25, 38, 49, 63, 78],
            [18, 31, 44, 57, 69, 82],
            [23, 36, 51, 64, 76, 91],
            [29, 42, 55, 68, 83, 96]
        ],

        xAxis: {
            labels: [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F'
            ]
        },

        yAxis: {
            labels: [
                'Row 1',
                'Row 2',
                'Row 3',
                'Row 4'
            ]
        },

        cellSettings: {
            showLabel: false,
            enableCellHighlight: false
        }
    });

heatmap.appendTo('#heatmap');
```

### JavaScript

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '600px',
        renderingMode: 'Canvas',

        dataSource: [
            [12, 25, 38, 49, 63, 78],
            [18, 31, 44, 57, 69, 82],
            [23, 36, 51, 64, 76, 91],
            [29, 42, 55, 68, 83, 96]
        ],

        xAxis: {
            labels: [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F'
            ]
        },

        yAxis: {
            labels: [
                'Row 1',
                'Row 2',
                'Row 3',
                'Row 4'
            ]
        },

        cellSettings: {
            showLabel: false,
            enableCellHighlight: false
        }
    });

heatmap.appendTo('#heatmap');
```

### Choosing a Rendering Mode

Use application testing rather than a universal cell-count rule.

Test:

```text
Initial rendering time
Refresh time
Memory usage
Pointer interaction
Tooltip responsiveness
Axis-label rendering
Export behavior
Browser zoom
Target mobile devices
Required browsers
```

Do not make fixed claims such as:

```text
SVG is always best below 5,000 cells.
Canvas is always best above 5,000 cells.
Canvas always uses less memory.
```

Actual performance depends on the complete configuration and runtime environment.

### Runtime Rendering-Mode Update

When the installed HeatMap version supports runtime rendering-mode updates, assign a valid mode and refresh the component.

```typescript
heatmap.renderingMode =
    'Canvas';

heatmap.refresh();
```

Switch back to SVG:

```typescript
heatmap.renderingMode =
    'SVG';

heatmap.refresh();
```

Avoid switching modes repeatedly during ordinary interaction.

## Bubble HeatMap

A Bubble HeatMap represents values through bubble shapes inside HeatMap cells.

Configure a Bubble HeatMap through `cellSettings` rather than using unsupported top-level properties.

The primary configuration begins with:

```typescript
cellSettings: {
    tileType: 'Bubble'
}
```

A bubble can represent:

- Size.
- Color.
- A sector.
- Size and color together.

Validate the supported `bubbleType` values against the installed HeatMap version.

## Bubble Tile Type

Basic configuration:

```typescript
cellSettings: {
    tileType: 'Bubble',
    bubbleType: 'Size'
}
```

Use a matrix whose cells contain the values expected by the selected bubble type.

## Size Bubble

A size bubble represents magnitude through bubble size.

### TypeScript

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const bubbleData: number[][] = [
    [35, 55, 80, 45],
    [70, 25, 60, 90],
    [50, 75, 30, 65]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: bubbleData,

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4'
            ]
        },

        yAxis: {
            labels: [
                'North',
                'South',
                'West'
            ]
        },

        cellSettings: {
            tileType: 'Bubble',
            bubbleType: 'Size',

            border: {
                width: 1,
                color: '#d1d5db'
            }
        }
    });

heatmap.appendTo('#heatmap');
```

### JavaScript

```javascript
var bubbleData = [
    [35, 55, 80, 45],
    [70, 25, 60, 90],
    [50, 75, 30, 65]
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

        dataSource: bubbleData,

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4'
            ]
        },

        yAxis: {
            labels: [
                'North',
                'South',
                'West'
            ]
        },

        cellSettings: {
            tileType: 'Bubble',
            bubbleType: 'Size',

            border: {
                width: 1,
                color: '#d1d5db'
            }
        }
    });

heatmap.appendTo('#heatmap');
```

Do not configure unsupported bubble-size properties such as:

```typescript
cellSettings: {
    bubbleSize: {
        min: 5,
        max: 50
    }
}
```

Use the bubble settings exposed by the installed HeatMap API.

## Color Bubble

A color bubble represents the value through bubble color.

```typescript
cellSettings: {
    tileType: 'Bubble',
    bubbleType: 'Color'
}
```

Example:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [35, 55, 80],
            [70, 25, 60]
        ],

        cellSettings: {
            tileType: 'Bubble',
            bubbleType: 'Color'
        },

        paletteSettings: {
            type: 'Gradient',

            palette: [
                {
                    value: 0,
                    color: '#dbeafe'
                },
                {
                    value: 50,
                    color: '#3b82f6'
                },
                {
                    value: 100,
                    color: '#1e3a8a'
                }
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

## Sector Bubble

A sector bubble can represent a value as a partial circular sector.

```typescript
cellSettings: {
    tileType: 'Bubble',
    bubbleType: 'Sector'
}
```

Use sector bubbles only when the value has a clear proportional meaning.

For example:

```text
0   -> Empty sector
50  -> Half sector
100 -> Full sector
```

Validate the expected value range and sector behavior in the installed HeatMap version.

## Size and Color Bubble

Some HeatMap configurations can represent one value through bubble size and another through color.

This requires the data source to use the value structure expected by the installed HeatMap version.

Start with:

```typescript
cellSettings: {
    tileType: 'Bubble',
    bubbleType: 'SizeAndColor'
}
```

Do not use unsupported top-level mappings such as:

```typescript
bubbleSizeMapping:
    'bubbleSize'
```

For JSON object data, use the `Adaptor` module and `dataSourceSettings` mappings required by the installed version.

Example structure:

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Adaptor);

const bubbleData = [
    {
        Quarter: 'Q1',
        Region: 'North',
        SizeValue: 70,
        ColorValue: 35
    },
    {
        Quarter: 'Q2',
        Region: 'North',
        SizeValue: 90,
        ColorValue: 80
    }
];
```

The exact `valueMapping` syntax for multiple bubble values must be validated against the installed package before production use.

## Cell Selection

Cell highlighting and cell selection are different features.

```text
Cell highlighting -> Temporary feedback during pointer movement.
Cell selection    -> Maintained selection state.
```

Use only selection properties exposed by the installed HeatMap version.

Common selection properties can include:

```text
allowSelection
enableMultiSelect
```

Do not import or inject an unverified `CellSelection` module.

Avoid:

```typescript
import {
    CellSelection
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    CellSelection
);
```

Also avoid unsupported selection strings such as:

```typescript
cellSelection: 'Single'
```

```typescript
cellSelection: 'Multiple'
```

```typescript
cellSelection: 'Range'
```

## Single Selection

When supported by the installed version, enable selection and disable multiple selection.

```typescript
const heatmap: HeatMap =
    new HeatMap({
        allowSelection: true,
        enableMultiSelect: false,

        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ]
    });

heatmap.appendTo('#heatmap');
```

## Multiple Selection

When supported, enable both selection properties.

```typescript
const heatmap: HeatMap =
    new HeatMap({
        allowSelection: true,
        enableMultiSelect: true,

        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ]
    });

heatmap.appendTo('#heatmap');
```

Test multiple selection with:

- Pointer input.
- Touch input.
- Browser zoom.
- Canvas rendering.
- SVG rendering.
- The required browser versions.

## Clearing Selection

When `clearSelection` is exposed by the installed HeatMap API, call:

```typescript
heatmap.clearSelection();
```

Required HTML:

```html
<button id="clearSelectionButton" type="button">
    Clear selection
</button>

<div id="heatmap"></div>
```

TypeScript:

```typescript
const clearSelectionButton:
    HTMLElement | null =
        document.getElementById(
            'clearSelectionButton'
        );

if (clearSelectionButton) {
    clearSelectionButton.addEventListener(
        'click',
        (): void => {
            if (
                typeof heatmap
                    .clearSelection ===
                'function'
            ) {
                heatmap.clearSelection();
            }
        }
    );
}
```

## Selection and Highlighting

Configure highlighting separately:

```typescript
cellSettings: {
    enableCellHighlight: true
}
```

Do not use:

```typescript
enableCellHighlighting: true
```

A selected cell can remain selected, while highlighting is normally temporary pointer feedback.

## Export Functionality

HeatMap export support and required modules must be validated against the installed `@syncfusion/ej2-heatmap` version.

Do not assume that `ImageExport`, `PdfExport`, and `Print` are available merely because similarly named modules exist in another EJ2 visualization package.

Before implementing export:

1. Inspect the installed package exports.
2. Inspect the HeatMap class methods.
3. Validate supported formats.
4. Validate the required modules.
5. Validate any feature-enablement properties.
6. Test the output in SVG and Canvas rendering modes.
7. Test whether legends, labels, and tooltips are included.

## Image Export

If the installed HeatMap version exposes image export, use the exact module and method signature provided by that version.

A typical export call can follow this structure:

```typescript
heatmap.export(
    'PNG',
    'heatmap-report'
);
```

SVG export can follow:

```typescript
heatmap.export(
    'SVG',
    'heatmap-report'
);
```

Use a filename without an extension unless the API explicitly requires one.

Preferred:

```typescript
heatmap.export(
    'PNG',
    'heatmap-report'
);
```

Avoid:

```typescript
heatmap.export(
    'PNG',
    'heatmap-report.png'
);
```

Do not provide a fabricated options object that is never used.

Avoid:

```typescript
const exportSettings = {
    type: 'PNG',
    fileName: 'my-heatmap',
    orientation: 'Portrait'
};

heatmap.export(
    exportSettings.type,
    exportSettings.fileName
);
```

The `orientation` value has no effect in that call.

## Export Timing

Export only after the HeatMap has rendered its intended state.

Recommended sequence:

```text
1. Validate data.
2. Update dataSource.
3. Refresh the HeatMap when required.
4. Wait for rendering to complete.
5. Start export.
```

Enable an export button after the HeatMap `loaded` event when necessary.

```typescript
loaded: (): void => {
    const exportButton:
        HTMLButtonElement | null =
            document.getElementById(
                'exportButton'
            ) as HTMLButtonElement | null;

    if (exportButton) {
        exportButton.disabled =
            false;
    }
}
```

Required button:

```html
<button id="exportButton" type="button" disabled>
    Export HeatMap
</button>
```

## Performance Optimization

## Large Dataset Guidance

Do not create an unbounded matrix such as:

```typescript
generateData(
    10000,
    10000
);
```

A `10000 × 10000` matrix contains 100 million cells and can exhaust browser memory or make the page unresponsive.

Before creating a large client-side matrix, estimate:

```text
Cell count
Source-array memory
Rendered output size
Label count
Tooltip processing
Selection state
Refresh frequency
Target-device resources
```

Use one or more of these techniques:

- Aggregate values.
- Filter rows and columns.
- Request only the required data window.
- Use Canvas rendering when validated.
- Disable cell labels.
- Disable cell highlighting when unnecessary.
- Reduce tooltip calculations.
- Limit refresh frequency.
- Avoid expensive `cellRender` logic.
- Display summary data before detailed data.

### Safer Large-Matrix Generator

Use a bounded generator for performance testing.

```typescript
const createMatrix = (
    rowCount: number,
    columnCount: number
): number[][] => {
    const safeRowCount: number =
        Math.min(
            Math.max(rowCount, 1),
            200
        );

    const safeColumnCount: number =
        Math.min(
            Math.max(columnCount, 1),
            200
        );

    return Array.from(
        {
            length: safeRowCount
        },
        (
            _row: unknown,
            rowIndex: number
        ): number[] => {
            return Array.from(
                {
                    length:
                        safeColumnCount
                },
                (
                    _column: unknown,
                    columnIndex: number
                ): number => {
                    return (
                        rowIndex *
                        safeColumnCount +
                        columnIndex
                    ) % 101;
                }
            );
        }
    );
};
```

Use:

```typescript
const largeData: number[][] =
    createMatrix(
        100,
        100
    );
```

This creates 10,000 cells, not 100 million cells.

## Efficient Data Updates

Update several values and call `refresh()` once.

```typescript
interface CellUpdate {
    rowIndex: number;
    columnIndex: number;
    value: number;
}

const applyCellUpdates = (
    source: number[][],
    updates: CellUpdate[]
): void => {
    updates.forEach(
        (
            update: CellUpdate
        ): void => {
            const row:
                number[] | undefined =
                    source[
                        update.rowIndex
                    ];

            if (!row) {
                return;
            }

            if (
                update.columnIndex < 0 ||
                update.columnIndex >=
                    row.length
            ) {
                return;
            }

            row[
                update.columnIndex
            ] = update.value;
        }
    );

    heatmap.dataSource =
        source;

    heatmap.refresh();
};
```

Example:

```typescript
applyCellUpdates(
    data,
    [
        {
            rowIndex: 0,
            columnIndex: 1,
            value: 88
        },
        {
            rowIndex: 2,
            columnIndex: 3,
            value: 64
        }
    ]
);
```

Do not refresh after every cell update.

Avoid:

```typescript
updates.forEach(
    (update) => {
        data[
            update.rowIndex
        ][
            update.columnIndex
        ] = update.value;

        heatmap.refresh();
    }
);
```

## Server-Side Windowing

HeatMap does not become virtualized simply because part of the data is assigned to `dataSource`.

This code replaces the current dataset:

```typescript
heatmap.dataSource =
    nextPage;

heatmap.refresh();
```

It does not append or virtualize the previous data automatically.

When the full matrix is too large:

- Request one meaningful data window.
- Include matching X-axis labels.
- Include matching Y-axis labels.
- Replace the current window as one complete unit.
- Display the visible range clearly.
- Provide navigation controls.
- Keep selection state synchronized with server identifiers.

### Window Navigation

Required HTML:

```html
<div class="heatmap-actions">
    <button id="previousPageButton" type="button">
        Previous
    </button>

    <button id="nextPageButton" type="button">
        Next
    </button>
</div>

<p id="window-status" aria-live="polite">
    Showing data window 1.
</p>

<div id="heatmap"></div>
```

Application state:

```typescript
let currentWindow: number = 0;

const windowSize: number = 20;
```

Do not document an unverified `scrollEnd` event as built-in HeatMap virtualization.

## API Data Validation

Check the HTTP response and validate the matrix.

```typescript
const isNumericMatrix = (
    value: unknown
): value is number[][] => {
    if (
        !Array.isArray(value) ||
        value.length === 0 ||
        !Array.isArray(value[0])
    ) {
        return false;
    }

    const columnCount: number =
        value[0].length;

    if (columnCount === 0) {
        return false;
    }

    return value.every(
        (row: unknown): boolean => {
            return (
                Array.isArray(row) &&
                row.length ===
                    columnCount &&
                row.every(
                    (
                        cell: unknown
                    ): boolean => {
                        return (
                            typeof cell ===
                                'number' &&
                            Number.isFinite(
                                cell
                            )
                        );
                    }
                )
            );
        }
    );
};
```

Load data:

```typescript
const loadHeatMapData =
    async (
        url: string
    ): Promise<void> => {
        const response: Response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                'Request failed with status ' +
                response.status
            );
        }

        const responseData:
            unknown =
                await response.json();

        if (
            !isNumericMatrix(
                responseData
            )
        ) {
            throw new Error(
                'The response is not a valid ' +
                'numeric matrix.'
            );
        }

        heatmap.dataSource =
            responseData;

        heatmap.refresh();
    };
```

Do not update the HeatMap once per downloaded chunk unless each chunk represents a complete, independent data window.

## Resource Cleanup

Destroy the HeatMap when its host view is removed.

```typescript
heatmap.destroy();
```

Remove custom event listeners:

```typescript
window.removeEventListener(
    'resize',
    resizeHandler
);
```

Clear timers:

```typescript
window.clearInterval(
    intervalId
);
```

Cancel in-progress requests when appropriate:

```typescript
const controller:
    AbortController =
        new AbortController();

fetch(
    '/api/heatmap-data',
    {
        signal:
            controller.signal
    }
);

controller.abort();
```

## Accessibility

Do not add unsupported properties such as:

```typescript
enableAccessibility: true
```

or:

```typescript
allowKeyboardNavigation: true
```

unless the installed HeatMap API explicitly exposes them.

Do not claim that arrow keys, Enter, or Tab navigate HeatMap cells unless that behavior is implemented and tested.

Accessibility depends on:

- The HeatMap's built-in semantics.
- Visible headings.
- Descriptive text.
- Axis labels.
- Cell labels.
- Color contrast.
- A legend.
- Tooltips.
- Keyboard-accessible external controls.
- A semantic data alternative.
- Screen-reader testing.
- Browser zoom testing.

## Accessible Description

Provide semantic surrounding content.

```html
<section
    aria-labelledby="heatmap-heading"
    aria-describedby="heatmap-description"
>
    <h2 id="heatmap-heading">
        Regional Sales
    </h2>

    <p id="heatmap-description">
        The HeatMap displays quarterly sales by region.
        Darker cells represent higher sales values.
        Exact values are also available in the data table.
    </p>

    <div id="heatmap"></div>
</section>
```

Do not overwrite the generated HeatMap semantics with an unvalidated `role="grid"`.

Avoid:

```html
<div
    id="heatmap"
    role="grid"
></div>
```

unless the complete grid interaction pattern has been implemented and tested.

## Non-Color Alternatives

Do not rely only on palette color.

Also provide:

- Cell labels.
- Tooltip values.
- Legend labels.
- Visible status text.
- A semantic data table.
- Text descriptions.
- Accessible export actions.

Example:

```typescript
cellSettings: {
    showLabel: true
}
```

Enable tooltips correctly:

```typescript
showTooltip: true
```

Use typed tooltip arguments:

```typescript
import {
    ITooltipEventArgs
} from '@syncfusion/ej2-heatmap';
```

```typescript
tooltipRender: (
    args: ITooltipEventArgs
): void => {
    const value: number =
        Number(args.value);

    args.content = [
        'Region: ' +
        String(args.yLabel),
        'Quarter: ' +
        String(args.xLabel),
        'Sales: ' +
        (
            Number.isFinite(value)
                ? '$' +
                    value.toFixed(0) +
                    'K'
                : 'No data'
        )
    ];
}
```

## Accessible Data Table

Provide a real semantic table when users need a nonvisual representation.

Do not use:

```html
<table
    role="presentation"
    style="display: none;"
>
```

`display: none` normally removes the content from the accessibility tree, and `role="presentation"` removes table semantics.

Use a visually hidden table that remains available to assistive technologies.

### HTML

```html
<table class="visually-hidden-data-table">
    <caption>
        Regional sales by quarter, in thousands
    </caption>

    <thead>
        <tr>
            <th scope="col">
                Region
            </th>
            <th scope="col">
                Q1
            </th>
            <th scope="col">
                Q2
            </th>
            <th scope="col">
                Q3
            </th>
            <th scope="col">
                Q4
            </th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <th scope="row">
                North
            </th>
            <td>73</td>
            <td>39</td>
            <td>26</td>
            <td>39</td>
        </tr>

        <tr>
            <th scope="row">
                South
            </th>
            <td>93</td>
            <td>58</td>
            <td>53</td>
            <td>38</td>
        </tr>

        <tr>
            <th scope="row">
                West
            </th>
            <td>99</td>
            <td>28</td>
            <td>22</td>
            <td>44</td>
        </tr>
    </tbody>
</table>
```

### CSS

```css
.visually-hidden-data-table {
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
```

If all users can benefit from the data table, display it normally instead of visually hiding it.

## Keyboard-Accessible Actions

Provide native buttons for export, selection clearing, paging, and details.

```html
<div class="heatmap-actions">
    <button id="clearSelectionButton" type="button">
        Clear selection
    </button>

    <button id="showTableButton" type="button">
        Show data table
    </button>
</div>
```

Native buttons support:

- Tab navigation.
- Enter activation.
- Space activation.
- Screen-reader naming.
- Visible focus styling.

Do not make essential actions dependent only on:

- Hover.
- Double-click.
- Pointer drag.
- Right-click.
- Color interpretation.

## High-Contrast Presentation

Use a supported high-contrast theme:

```typescript
theme: 'HighContrast'
```

If a custom palette is required, use explicit values.

```typescript
paletteSettings: {
    type: 'Gradient',

    palette: [
        {
            value: 0,
            color: '#ffffff'
        },
        {
            value: 50,
            color: '#737373'
        },
        {
            value: 100,
            color: '#000000'
        }
    ]
}
```

A high-contrast theme or palette does not automatically make the entire application WCAG compliant.

Also test:

- Cell-text contrast.
- Axis-label contrast.
- Tooltip contrast.
- Browser zoom.
- High-contrast mode.
- Screen-reader output.
- Keyboard-accessible actions.
- Non-color data alternatives.

## Complete TypeScript Example

### Required HTML

```html
<section
    aria-labelledby="heatmap-heading"
    aria-describedby="heatmap-description"
>
    <header>
        <h2 id="heatmap-heading">
            Regional Sales HeatMap
        </h2>

        <p id="heatmap-description">
            The HeatMap displays quarterly sales by region.
            Exact values are shown in each cell and are also
            available in the accompanying data table.
        </p>
    </header>

    <div class="heatmap-actions">
        <button id="clearSelectionButton" type="button">
            Clear selection
        </button>

        <button id="updateDataButton" type="button">
            Update data
        </button>
    </div>

    <div class="heatmap-wrapper">
        <div id="heatmap"></div>
    </div>

    <p
        id="heatmap-status"
        aria-live="polite"
        aria-atomic="true"
    >
        HeatMap loaded.
    </p>

    <table class="visually-hidden-data-table">
        <caption>
            Regional sales by quarter, in thousands
        </caption>

        <thead>
            <tr>
                <th scope="col">Region</th>
                <th scope="col">Q1</th>
                <th scope="col">Q2</th>
                <th scope="col">Q3</th>
                <th scope="col">Q4</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <th scope="row">North</th>
                <td>73</td>
                <td>39</td>
                <td>26</td>
                <td>39</td>
            </tr>

            <tr>
                <th scope="row">South</th>
                <td>93</td>
                <td>58</td>
                <td>53</td>
                <td>38</td>
            </tr>

            <tr>
                <th scope="row">West</th>
                <td>99</td>
                <td>28</td>
                <td>22</td>
                <td>44</td>
            </tr>
        </tbody>
    </table>
</section>
```

### Required CSS

```css
.heatmap-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
}

.heatmap-actions button {
    padding: 8px 14px;
    color: #1a1a1a;
    background: #ffffff;
    border: 1px solid #666666;
    border-radius: 4px;
    cursor: pointer;
}

.heatmap-actions button:focus-visible {
    outline: 3px solid #005a9c;
    outline-offset: 2px;
}

.heatmap-wrapper {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    box-sizing: border-box;
}

#heatmap {
    width: 100%;
    min-height: 460px;
}

#heatmap-status {
    margin-top: 12px;
}

.visually-hidden-data-table {
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
```

### TypeScript

```typescript
import {
    HeatMap,
    Legend,
    Tooltip,
    ITooltipEventArgs
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Legend,
    Tooltip
);

const salesData: number[][] = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 44]
];

const updatedSalesData: number[][] = [
    [81, 45, 32, 52],
    [96, 64, 57, 43],
    [88, 36, 29, 61]
];

const statusElement: HTMLElement | null =
    document.getElementById(
        'heatmap-status'
    );

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '460px',
        renderingMode: 'Canvas',
        theme: 'Material',
        allowSelection: true,
        enableMultiSelect: true,

        dataSource:
            salesData,

        titleSettings: {
            text:
                'Quarterly Regional Sales',

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                size: '18px',
                color: '#1a1a1a'
            }
        },

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4'
            ],

            title: {
                text: 'Quarter',

                textStyle: {
                    fontFamily:
                        'Segoe UI',
                    fontWeight: '600',
                    size: '14px',
                    color: '#333333'
                }
            }
        },

        yAxis: {
            labels: [
                'North',
                'South',
                'West'
            ],

            title: {
                text: 'Region',

                textStyle: {
                    fontFamily:
                        'Segoe UI',
                    fontWeight: '600',
                    size: '14px',
                    color: '#333333'
                }
            }
        },

        cellSettings: {
            showLabel: true,
            enableCellHighlight: true,
            format: '{value}',

            border: {
                width: 1,
                color: '#ffffff',
                radius: 2
            },

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                size: '12px',
                color: '#ffffff'
            }
        },

        paletteSettings: {
            type: 'Gradient',

            palette: [
                {
                    value: 0,
                    color: '#fff4cc'
                },
                {
                    value: 50,
                    color: '#3b82f6'
                },
                {
                    value: 100,
                    color: '#172554'
                }
            ]
        },

        legendSettings: {
            visible: true,
            position: 'Bottom',
            showLabel: true,
            labelFormat: '{value}'
        },

        showTooltip: true,

        tooltipRender: (
            args: ITooltipEventArgs
        ): void => {
            const value: number =
                Number(args.value);

            args.content = [
                'Region: ' +
                String(args.yLabel),
                'Quarter: ' +
                String(args.xLabel),
                'Sales: ' +
                (
                    Number.isFinite(value)
                        ? '$' +
                            value.toFixed(0) +
                            'K'
                        : 'No data'
                )
            ];
        }
    });

heatmap.appendTo('#heatmap');

const clearSelectionButton:
    HTMLElement | null =
        document.getElementById(
            'clearSelectionButton'
        );

if (clearSelectionButton) {
    clearSelectionButton.addEventListener(
        'click',
        (): void => {
            if (
                typeof heatmap
                    .clearSelection ===
                'function'
            ) {
                heatmap.clearSelection();
            }

            if (statusElement) {
                statusElement.textContent =
                    'HeatMap selection cleared.';
            }
        }
    );
}

const updateDataButton:
    HTMLElement | null =
        document.getElementById(
            'updateDataButton'
        );

if (updateDataButton) {
    updateDataButton.addEventListener(
        'click',
        (): void => {
            heatmap.dataSource =
                updatedSalesData;

            heatmap.refresh();

            if (statusElement) {
                statusElement.textContent =
                    'HeatMap data updated.';
            }
        }
    );
}
```

## Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Advanced HeatMap</title>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
        type="text/javascript"
    ></script>

    <style>
        .heatmap-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 12px;
        }

        .heatmap-actions button {
            padding: 8px 14px;
            color: #1a1a1a;
            background: #ffffff;
            border: 1px solid #666666;
            border-radius: 4px;
            cursor: pointer;
        }

        .heatmap-actions button:focus-visible {
            outline: 3px solid #005a9c;
            outline-offset: 2px;
        }

        .heatmap-wrapper {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            box-sizing: border-box;
        }

        #heatmap {
            width: 100%;
            min-height: 460px;
        }

        #heatmap-status {
            margin-top: 12px;
        }

        .visually-hidden-data-table {
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
    </style>
</head>
<body>
    <section
        aria-labelledby="heatmap-heading"
        aria-describedby="heatmap-description"
    >
        <header>
            <h2 id="heatmap-heading">
                Regional Sales HeatMap
            </h2>

            <p id="heatmap-description">
                The HeatMap displays quarterly sales by region.
                Exact values are shown in each cell and are also
                available in the accompanying data table.
            </p>
        </header>

        <div class="heatmap-actions">
            <button
                id="clearSelectionButton"
                type="button"
            >
                Clear selection
            </button>

            <button
                id="updateDataButton"
                type="button"
            >
                Update data
            </button>
        </div>

        <div class="heatmap-wrapper">
            <div id="heatmap"></div>
        </div>

        <p
            id="heatmap-status"
            aria-live="polite"
            aria-atomic="true"
        >
            HeatMap loaded.
        </p>

        <table class="visually-hidden-data-table">
            <caption>
                Regional sales by quarter, in thousands
            </caption>

            <thead>
                <tr>
                    <th scope="col">Region</th>
                    <th scope="col">Q1</th>
                    <th scope="col">Q2</th>
                    <th scope="col">Q3</th>
                    <th scope="col">Q4</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th scope="row">North</th>
                    <td>73</td>
                    <td>39</td>
                    <td>26</td>
                    <td>39</td>
                </tr>

                <tr>
                    <th scope="row">South</th>
                    <td>93</td>
                    <td>58</td>
                    <td>53</td>
                    <td>38</td>
                </tr>

                <tr>
                    <th scope="row">West</th>
                    <td>99</td>
                    <td>28</td>
                    <td>22</td>
                    <td>44</td>
                </tr>
            </tbody>
        </table>
    </section>

    <script>
        var salesData = [
            [73, 39, 26, 39],
            [93, 58, 53, 38],
            [99, 28, 22, 44]
        ];

        var updatedSalesData = [
            [81, 45, 32, 52],
            [96, 64, 57, 43],
            [88, 36, 29, 61]
        ];

        var statusElement =
            document.getElementById(
                'heatmap-status'
            );

        var heatmap =
            new ej.heatmap.HeatMap({
                width: '100%',
                height: '460px',
                renderingMode: 'Canvas',
                theme: 'Material',
                allowSelection: true,
                enableMultiSelect: true,

                dataSource:
                    salesData,

                titleSettings: {
                    text:
                        'Quarterly Regional Sales',

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight: '600',
                        size: '18px',
                        color: '#1a1a1a'
                    }
                },

                xAxis: {
                    labels: [
                        'Q1',
                        'Q2',
                        'Q3',
                        'Q4'
                    ],

                    title: {
                        text: 'Quarter',

                        textStyle: {
                            fontFamily:
                                'Segoe UI',
                            fontWeight:
                                '600',
                            size: '14px',
                            color:
                                '#333333'
                        }
                    }
                },

                yAxis: {
                    labels: [
                        'North',
                        'South',
                        'West'
                    ],

                    title: {
                        text: 'Region',

                        textStyle: {
                            fontFamily:
                                'Segoe UI',
                            fontWeight:
                                '600',
                            size: '14px',
                            color:
                                '#333333'
                        }
                    }
                },

                cellSettings: {
                    showLabel: true,
                    enableCellHighlight: true,
                    format: '{value}',

                    border: {
                        width: 1,
                        color: '#ffffff',
                        radius: 2
                    },

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight:
                            '600',
                        size: '12px',
                        color: '#ffffff'
                    }
                },

                paletteSettings: {
                    type: 'Gradient',

                    palette: [
                        {
                            value: 0,
                            color: '#fff4cc'
                        },
                        {
                            value: 50,
                            color: '#3b82f6'
                        },
                        {
                            value: 100,
                            color: '#172554'
                        }
                    ]
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    showLabel: true,
                    labelFormat: '{value}'
                },

                showTooltip: true,

                tooltipRender:
                    function (args) {
                        var value =
                            Number(
                                args.value
                            );

                        args.content = [
                            'Region: ' +
                            String(
                                args.yLabel
                            ),
                            'Quarter: ' +
                            String(
                                args.xLabel
                            ),
                            'Sales: ' +
                            (
                                Number.isFinite(
                                    value
                                )
                                    ? '$' +
                                        value
                                            .toFixed(0) +
                                        'K'
                                    : 'No data'
                            )
                        ];
                    }
            });

        heatmap.appendTo('#heatmap');

        var clearSelectionButton =
            document.getElementById(
                'clearSelectionButton'
            );

        if (clearSelectionButton) {
            clearSelectionButton
                .addEventListener(
                    'click',
                    function () {
                        if (
                            typeof heatmap
                                .clearSelection ===
                            'function'
                        ) {
                            heatmap
                                .clearSelection();
                        }

                        if (statusElement) {
                            statusElement
                                .textContent =
                                    'HeatMap selection cleared.';
                        }
                    }
                );
        }

        var updateDataButton =
            document.getElementById(
                'updateDataButton'
            );

        if (updateDataButton) {
            updateDataButton
                .addEventListener(
                    'click',
                    function () {
                        heatmap.dataSource =
                            updatedSalesData;

                        heatmap.refresh();

                        if (statusElement) {
                            statusElement
                                .textContent =
                                    'HeatMap data updated.';
                        }
                    }
                );
        }
    </script>
</body>
</html>
```

## Runtime Validation Checklist

```text
✅ HeatMap is imported in TypeScript.
✅ Legend is imported and injected when the legend is visible.
✅ Tooltip is imported and injected when tooltips are enabled.
✅ Adaptor is imported and injected for adaptor-based TypeScript data.
✅ Every injected module is imported.
✅ Global JavaScript does not call HeatMap.Inject.
✅ All CDN scripts use the same EJ2 version.
✅ CDN scripts load in dependency order.
✅ Every CDN URL ends with .min.js.
✅ No malformed .min.jsscript URL exists.
✅ The HeatMap host element exists.
✅ heatmap.appendTo('#heatmap') is called.
✅ The appendTo selector matches the host ID.
✅ The HeatMap has measurable width and height.
✅ renderingMode uses a value supported by the installed version.
✅ Rendering mode is selected through testing rather than a fixed threshold.
✅ Large matrices are bounded before allocation.
✅ A 100-million-cell matrix is not created in the browser.
✅ Cell labels are disabled when cells become too small.
✅ Cell highlighting uses enableCellHighlight.
✅ Bubble HeatMap uses cellSettings.tileType.
✅ Bubble type is supported by the installed HeatMap version.
✅ Bubble data matches the expected value structure.
✅ Unsupported bubbleSizeMapping is not used.
✅ Unsupported cellSettings.bubbleSize is not used.
✅ Selection uses properties exposed by the installed version.
✅ An unverified CellSelection module is not injected.
✅ Selection and highlighting are treated as separate behaviors.
✅ clearSelection is called only when available.
✅ Export modules and formats are validated before implementation.
✅ Export filenames omit extensions unless required.
✅ Export begins only after rendering completes.
✅ Data updates modify the existing HeatMap.
✅ Batch updates call refresh only once.
✅ Server-side pages are treated as complete data windows.
✅ Custom paging is not described as built-in virtualization.
✅ API responses are validated before binding.
✅ Fetch requests check response.ok.
✅ Timers and event listeners are cleaned up.
✅ heatmap.destroy() is called when the view is removed.
✅ Unsupported enableAccessibility is not used.
✅ Unsupported allowKeyboardNavigation is not used.
✅ Unverified arrow-key navigation is not claimed.
✅ Built-in semantics are not overwritten with role="grid".
✅ The accessible data table retains table semantics.
✅ The accessible table is not hidden with display: none.
✅ Important values are not communicated through color alone.
✅ Tooltips are enabled with showTooltip.
✅ Tooltip values are validated before formatting.
✅ External controls use native buttons.
✅ High contrast is tested across the complete application.
✅ Executable HTML uses actual angle brackets.
✅ No encoded tags replace executable HTML.
✅ No editor-generated anchor elements appear in CDN URLs.
✅ No strong, br, data-lexical-text, or editor-generated classes remain.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Automatic Rendering-Mode Assumption

Avoid:

```typescript
renderingMode: 'Auto'
```

unless the installed HeatMap version explicitly supports it.

Do not claim:

```text
More than 1,000 cells always uses Canvas.
Fewer than 1,000 cells always uses SVG.
```

Select and test:

```typescript
renderingMode: 'SVG'
```

or:

```typescript
renderingMode: 'Canvas'
```

### Fixed Performance Thresholds

Avoid:

```text
SVG is best below 5,000 cells.
Canvas is best above 5,000 cells.
```

Performance depends on the full HeatMap configuration and runtime environment.

### Constructor Selector Pattern

Avoid:

```typescript
const heatmap =
    new HeatMap({
        dataSource: data
    }, '#heatmap');
```

Preferred:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: data
    });

heatmap.appendTo('#heatmap');
```

### Unsupported Bubble Mapping

Avoid:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        bubbleSizeMapping:
            'bubbleSize'
    });
```

Use:

```typescript
cellSettings: {
    tileType: 'Bubble',
    bubbleType: 'Size'
}
```

Configure adaptor mappings according to the installed API when object data is used.

### Unsupported Bubble Size Model

Avoid:

```typescript
cellSettings: {
    bubbleSize: {
        min: 5,
        max: 50
    }
}
```

Use only bubble properties exposed by the installed HeatMap type definitions.

### Unsupported Selection Module

Avoid:

```typescript
import {
    CellSelection
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    CellSelection
);
```

Use validated HeatMap selection properties instead.

### Unsupported Selection Mode Strings

Avoid:

```typescript
cellSelection:
    'Single'
```

Avoid:

```typescript
cellSelection:
    'Multiple'
```

Avoid:

```typescript
cellSelection:
    'Range'
```

Use selection settings exposed by the installed HeatMap version, such as:

```typescript
allowSelection: true,
enableMultiSelect: true
```

when supported.

### Incorrect Highlight Property

Avoid:

```typescript
enableCellHighlighting:
    true
```

Use:

```typescript
enableCellHighlight:
    true
```

### Unverified Export Modules

Do not import:

```typescript
ImageExport
PdfExport
Print
```

from `@syncfusion/ej2-heatmap` until those exports have been verified in the installed package.

Do not assume another EJ2 component's export modules apply to HeatMap.

### Filename Extension

Avoid:

```typescript
heatmap.export(
    'PNG',
    'heatmap.png'
);
```

Prefer:

```typescript
heatmap.export(
    'PNG',
    'heatmap'
);
```

unless the installed API explicitly requires the extension.

### Fabricated Export Options

Avoid:

```typescript
const settings = {
    type: 'PNG',
    fileName: 'heatmap',
    orientation: 'Portrait'
};

heatmap.export(
    settings.type,
    settings.fileName
);
```

The orientation is not used by that call.

### Unsafe Matrix Allocation

Avoid:

```typescript
const data =
    generateData(
        10000,
        10000
    );
```

This attempts to create 100 million cells.

Use a bounded matrix and test realistic application sizes.

### Unsupported Virtualization Event

Avoid:

```typescript
heatmap.scrollEnd = () => {
    // Load next page
};
```

unless the installed HeatMap API explicitly exposes that event.

Custom paging is not automatically HeatMap virtualization.

### Chunk Replacement Misrepresented as Loading

This code replaces the current data:

```typescript
heatmap.dataSource =
    chunk;

heatmap.refresh();
```

It does not append the chunk to the previously rendered matrix.

### Refresh Per Cell

Avoid:

```typescript
updates.forEach(
    (update) => {
        data[
            update.rowIndex
        ][
            update.columnIndex
        ] =
            update.value;

        heatmap.refresh();
    }
);
```

Refresh once:

```typescript
updates.forEach(
    (update) => {
        data[
            update.rowIndex
        ][
            update.columnIndex
        ] =
            update.value;
    }
);

heatmap.refresh();
```

### Missing Fetch Validation

Avoid:

```typescript
const response =
    await fetch(url);

const data =
    await response.json();
```

Use:

```typescript
const response: Response =
    await fetch(url);

if (!response.ok) {
    throw new Error(
        'Request failed with status ' +
        response.status
    );
}

const data: unknown =
    await response.json();
```

### Unsupported Accessibility Properties

Avoid:

```typescript
enableAccessibility: true
```

Avoid:

```typescript
allowKeyboardNavigation: true
```

unless explicitly exposed by the installed HeatMap API.

### Unsupported Keyboard Claims

Do not claim:

```text
Arrow keys navigate cells.
Enter selects a cell.
Tab cycles through every cell.
```

unless this behavior is implemented and tested.

### Invalid Accessible Table

Avoid:

```html
<table
    role="presentation"
    style="display: none;"
>
```

Use a semantic table:

```html
<table class="visually-hidden-data-table">
    <caption>
        Regional sales by quarter
    </caption>
</table>
```

### Unvalidated Grid Role

Avoid:

```html
<div
    id="heatmap"
    role="grid"
></div>
```

unless the full ARIA grid pattern and keyboard interaction have been implemented.

### Tooltip Module Without Enablement

Avoid:

```typescript
HeatMap.Inject(
    Tooltip
);
```

without:

```typescript
showTooltip: true
```

### Untyped Tooltip Event

Avoid:

```typescript
tooltipRender: (
    args: any
): void => {
    // ...
}
```

Use:

```typescript
tooltipRender: (
    args: ITooltipEventArgs
): void => {
    // ...
}
```

### Hidden Accessible Content

Avoid:

```css
.accessible-table {
    display: none;
}
```

Use a visually hidden technique that keeps the content available to assistive technologies.

### Compliance Assumption

Do not claim that the following alone ensures accessibility:

```text
HighContrast theme
Legend
Tooltip
Cell labels
```

Test the complete application with:

- Keyboard-only interaction.
- Screen-reading software.
- Browser zoom.
- High-contrast mode.
- Color-contrast tools.
- Touch input.
- Reduced motion.
- Localized text.

### Malformed CDN Link

Do not wrap the CDN URL in an anchor element.

Do not use a URL ending with:

```text
.min.jsscript
```

Use:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
    type="text/javascript"
></script>
```

### Encoded Executable HTML

Do not use:

```html
&lt;div id="heatmap"&gt;&lt;/div&gt;
```

Use:

```html
<div id="heatmap"></div>
```

### Editor-Generated Markup

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, templates, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```