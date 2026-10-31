# Events and Interactions in Syncfusion HeatMap

- #event-registration
- #cell-click-event
- #cell-double-click-event
- #cell-render-event
- #cell-selection
- #cell-highlighting
- #tooltip-interaction
- #interaction-information-display
- #drill-down-navigation
- #range-selection-state
- #performance-guidance
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Event Registration

Register HeatMap events in the configuration object before appending the component to its host element.

TypeScript:

```typescript
import {
    HeatMap,
    ICellClickEventArgs
} from '@syncfusion/ej2-heatmap';

const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [10, 20, 30],
            [40, 50, 60]
        ],

        cellClick: (
            args: ICellClickEventArgs
        ): void => {
            console.log(args);
        }
    });

heatmap.appendTo('#heatmap');
```

JavaScript:

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        dataSource: [
            [10, 20, 30],
            [40, 50, 60]
        ],

        cellClick: function (args) {
            console.log(args);
        }
    });

heatmap.appendTo('#heatmap');
```

Registering events in the configuration ensures that handlers are available throughout the component lifecycle.

## Cell Click Event

The `cellClick` event is triggered when a user clicks a HeatMap cell.

Use `cellClick` to:

- Display information about a selected cell.
- Update another component.
- Start drill-down navigation.
- Update application selection state.
- Open a details panel.
- Record interaction telemetry.

### Basic Cell Click

Required HTML:

```html
<div id="heatmap"></div>

<p id="cell-info" aria-live="polite">
    Select a HeatMap cell to view its details.
</p>
```

TypeScript:

```typescript
import {
    HeatMap,
    ICellClickEventArgs
} from '@syncfusion/ej2-heatmap';

const data: number[][] = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 4]
];

const cellInfo: HTMLElement | null =
    document.getElementById(
        'cell-info'
    );

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

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
        },

        cellClick: (
            args: ICellClickEventArgs
        ): void => {
            const value: number =
                Number(args.value);

            const message: string =
                String(args.yLabel) +
                ' | ' +
                String(args.xLabel) +
                ' | Value: ' +
                (
                    Number.isFinite(value)
                        ? value.toFixed(0)
                        : 'No data'
                );

            console.log(message);

            if (cellInfo) {
                cellInfo.textContent =
                    message;
            }
        }
    });

heatmap.appendTo('#heatmap');
```

JavaScript:

```javascript
var data = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 4]
];

var cellInfo =
    document.getElementById(
        'cell-info'
    );

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

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
        },

        cellClick: function (args) {
            var value =
                Number(args.value);

            var message =
                String(args.yLabel) +
                ' | ' +
                String(args.xLabel) +
                ' | Value: ' +
                (
                    Number.isFinite(value)
                        ? value.toFixed(0)
                        : 'No data'
                );

            console.log(message);

            if (cellInfo) {
                cellInfo.textContent =
                    message;
            }
        }
    });

heatmap.appendTo('#heatmap');
```

### Cell Click Event Arguments

The commonly used cell-click event arguments include:

```text
rowIndex    -> Zero-based row index.
columnIndex -> Zero-based column index.
value       -> Value associated with the cell.
xLabel      -> X-axis label associated with the cell.
yLabel      -> Y-axis label associated with the cell.
```

Validate optional event properties before using them.

Do not assume that every rendering mode supplies an editable HTML element for the selected cell.

### Safe Cell Details

```typescript
cellClick: (
    args: ICellClickEventArgs
): void => {
    const rowIndex: number =
        Number(args.rowIndex);

    const columnIndex: number =
        Number(args.columnIndex);

    const value: number =
        Number(args.value);

    console.log({
        rowIndex,
        columnIndex,
        xLabel: args.xLabel,
        yLabel: args.yLabel,
        value:
            Number.isFinite(value)
                ? value
                : null
    });
}
```

## Cell Double-Click Event

The `cellDoubleClick` event is triggered when a HeatMap cell is double-clicked.

Use it for:

- Opening a details dialog.
- Starting an editing workflow.
- Navigating to a detailed view.
- Loading lower-level data.
- Running an action that should not occur on a normal click.

### TypeScript

```typescript
import {
    HeatMap,
    ICellClickEventArgs
} from '@syncfusion/ej2-heatmap';

const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3'
            ]
        },

        yAxis: {
            labels: [
                '2021',
                '2022'
            ]
        },

        cellDoubleClick: (
            args: ICellClickEventArgs
        ): void => {
            console.log(
                'Open details for:',
                args.yLabel,
                args.xLabel,
                args.value
            );
        }
    });

heatmap.appendTo('#heatmap');
```

### JavaScript

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3'
            ]
        },

        yAxis: {
            labels: [
                '2021',
                '2022'
            ]
        },

        cellDoubleClick: function (args) {
            console.log(
                'Open details for:',
                args.yLabel,
                args.xLabel,
                args.value
            );
        }
    });

heatmap.appendTo('#heatmap');
```

Do not make critical functionality available only through double-click. Also provide an accessible button or another keyboard-operable action.

## Cell Render Event

Use `cellRender` to customize a cell before it is rendered.

Use this event for:

- Conditional cell colors.
- Conditional display text.
- Cell-border customization.
- Value-based visual indicators.
- Missing-value presentation.

Do not use a mouse-move event to repeatedly restyle generated cell elements.

### Conditional Cell Rendering

TypeScript:

```typescript
import {
    HeatMap,
    ICellEventArgs
} from '@syncfusion/ej2-heatmap';

const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        cellSettings: {
            showLabel: true,

            border: {
                width: 1,
                color: '#ffffff'
            }
        },

        cellRender: (
            args: ICellEventArgs
        ): void => {
            const value: number =
                Number(args.value);

            if (!Number.isFinite(value)) {
                args.displayText =
                    'No data';

                return;
            }

            if (value >= 80) {
                args.cellColor =
                    '#107c10';

                args.displayText =
                    value.toFixed(0);
            } else if (value < 30) {
                args.cellColor =
                    '#d13438';

                args.displayText =
                    value.toFixed(0);
            }
        }
    });

heatmap.appendTo('#heatmap');
```

JavaScript:

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        cellSettings: {
            showLabel: true,

            border: {
                width: 1,
                color: '#ffffff'
            }
        },

        cellRender: function (args) {
            var value =
                Number(args.value);

            if (!Number.isFinite(value)) {
                args.displayText =
                    'No data';

                return;
            }

            if (value >= 80) {
                args.cellColor =
                    '#107c10';

                args.displayText =
                    value.toFixed(0);
            } else if (value < 30) {
                args.cellColor =
                    '#d13438';

                args.displayText =
                    value.toFixed(0);
            }
        }
    });

heatmap.appendTo('#heatmap');
```

Keep `cellRender` lightweight because it is triggered for each cell during rendering.

## Cell Selection

Persistent cell selection is different from hover highlighting.

```text
Highlighting -> Temporary visual feedback during pointer movement.
Selection    -> Maintained application or component selection state.
```

When supported by the installed HeatMap version, enable built-in selection through the HeatMap selection properties.

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

Use single selection:

```typescript
allowSelection: true,
enableMultiSelect: false
```

Use multiple selection:

```typescript
allowSelection: true,
enableMultiSelect: true
```

Validate selection APIs against the installed `@syncfusion/ej2-heatmap` type definitions before using them.

### Application-Level Selection State

Maintain selection data by row and column indexes when a custom workflow is required.

```typescript
interface SelectedCell {
    rowIndex: number;
    columnIndex: number;
    value: number | null;
    xLabel: string;
    yLabel: string;
}

const selectedCells:
    Map<string, SelectedCell> =
        new Map<string, SelectedCell>();

const createCellKey = (
    rowIndex: number,
    columnIndex: number
): string => {
    return (
        rowIndex +
        ':' +
        columnIndex
    );
};
```

Use the map in `cellClick`:

```typescript
cellClick: (
    args: ICellClickEventArgs
): void => {
    const rowIndex: number =
        Number(args.rowIndex);

    const columnIndex: number =
        Number(args.columnIndex);

    const key: string =
        createCellKey(
            rowIndex,
            columnIndex
        );

    const value: number =
        Number(args.value);

    if (selectedCells.has(key)) {
        selectedCells.delete(key);
    } else {
        selectedCells.set(
            key,
            {
                rowIndex,
                columnIndex,
                value:
                    Number.isFinite(value)
                        ? value
                        : null,
                xLabel:
                    String(args.xLabel),
                yLabel:
                    String(args.yLabel)
            }
        );
    }

    console.log(
        Array.from(
            selectedCells.values()
        )
    );
}
```

This controls application selection state. It does not automatically change the visual appearance of rendered cells.

Use built-in selection or rendering APIs for persistent visual selection instead of directly modifying generated SVG or Canvas elements.

### Clear Selection

When the installed HeatMap version supports `clearSelection`, use it to clear built-in cell selection.

```typescript
heatmap.clearSelection();
```

Required button:

```html
<button id="clearSelectionButton" type="button">
    Clear selection
</button>
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
            selectedCells.clear();
            heatmap.clearSelection();
        }
    );
}
```

## Cell Highlighting

Use `enableCellHighlight` in `cellSettings` when the installed HeatMap API supports cell highlighting.

```typescript
cellSettings: {
    enableCellHighlight: true
}
```

Do not use an unverified property such as:

```typescript
enableCellHighlighting: true
```

Complete configuration:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        cellSettings: {
            enableCellHighlight: true,
            showLabel: true,

            border: {
                width: 1,
                color: '#ffffff'
            }
        }
    });

heatmap.appendTo('#heatmap');
```

Built-in highlighting is preferable to directly applying CSS transforms to generated cells.

Avoid:

```typescript
args.cellElement.style.transform =
    'scale(1.05)';
```

The HeatMap can use SVG or Canvas rendering. A generated cell may not be an independent HTML element that supports arbitrary CSS transformations.

## Tooltip Interaction

Inject `Tooltip` in TypeScript and set `showTooltip` to `true`.

```typescript
import {
    HeatMap,
    Tooltip,
    ITooltipEventArgs
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Tooltip);
```

Configuration:

```typescript
showTooltip: true,

tooltipRender: (
    args: ITooltipEventArgs
): void => {
    const value: number =
        Number(args.value);

    args.content = [
        'Row: ' +
        String(args.yLabel),
        'Column: ' +
        String(args.xLabel),
        'Value: ' +
        (
            Number.isFinite(value)
                ? value.toFixed(0)
                : 'No data'
        )
    ];
}
```

Keep tooltip calculations lightweight because the event runs during pointer interaction.

## Interaction Information Display

Use `textContent` to display interaction details safely.

Required HTML:

```html
<section
    id="event-info"
    aria-live="polite"
    aria-atomic="true"
>
    Select a HeatMap cell to view details.
</section>
```

TypeScript:

```typescript
const eventInfo: HTMLElement | null =
    document.getElementById(
        'event-info'
    );

const showCellInformation = (
    args: ICellClickEventArgs
): void => {
    if (!eventInfo) {
        return;
    }

    const value: number =
        Number(args.value);

    eventInfo.textContent =
        'Selected cell. Row: ' +
        String(args.yLabel) +
        '. Column: ' +
        String(args.xLabel) +
        '. Value: ' +
        (
            Number.isFinite(value)
                ? value.toFixed(0)
                : 'No data'
        ) +
        '.';
};
```

Use it in the HeatMap:

```typescript
cellClick: (
    args: ICellClickEventArgs
): void => {
    showCellInformation(args);
}
```

Avoid using `innerHTML` with event data:

```typescript
eventInfo.innerHTML =
    '<strong>' +
    args.yLabel +
    '</strong>';
```

Axis labels or data values may originate from external sources. Use `textContent` unless HTML has been explicitly sanitized.

## Drill-Down Navigation

Use the selected axis labels or indexes to identify detail data.

```typescript
cellClick: (
    args: ICellClickEventArgs
): void => {
    const row: string =
        encodeURIComponent(
            String(args.yLabel)
        );

    const column: string =
        encodeURIComponent(
            String(args.xLabel)
        );

    const detailsUrl: string =
        '/details?row=' +
        row +
        '&column=' +
        column;

    console.log(
        'Navigate to:',
        detailsUrl
    );
}
```

Use `encodeURIComponent` when labels are added to a query string.

In a single-page application, prefer the framework router instead of assigning a raw URL.

### Drill-Down State

```typescript
type DetailLevel =
    'monthly' |
    'daily' |
    'hourly';

let currentLevel: DetailLevel =
    'monthly';

const handleDrillDown = (
    args: ICellClickEventArgs
): void => {
    const selectedLabel: string =
        String(args.xLabel);

    if (currentLevel === 'monthly') {
        loadDailyData(
            selectedLabel
        );

        currentLevel =
            'daily';

        return;
    }

    if (currentLevel === 'daily') {
        loadHourlyData(
            selectedLabel
        );

        currentLevel =
            'hourly';
    }
};

const loadDailyData = (
    month: string
): void => {
    console.log(
        'Load daily data for:',
        month
    );
};

const loadHourlyData = (
    day: string
): void => {
    console.log(
        'Load hourly data for:',
        day
    );
};
```

Replace the logging functions with actual data loading when a real data source is available.

Do not fabricate drill-down data.

## Range Selection State

Custom two-click range selection can be maintained in application state.

```typescript
interface CellPosition {
    rowIndex: number;
    columnIndex: number;
}

let rangeStart:
    CellPosition | null = null;

let selectedRange:
    CellPosition[] = [];
```

Range-calculation function:

```typescript
const getRange = (
    start: CellPosition,
    end: CellPosition
): CellPosition[] => {
    const range: CellPosition[] = [];

    const minimumRow: number =
        Math.min(
            start.rowIndex,
            end.rowIndex
        );

    const maximumRow: number =
        Math.max(
            start.rowIndex,
            end.rowIndex
        );

    const minimumColumn: number =
        Math.min(
            start.columnIndex,
            end.columnIndex
        );

    const maximumColumn: number =
        Math.max(
            start.columnIndex,
            end.columnIndex
        );

    for (
        let rowIndex: number =
            minimumRow;
        rowIndex <= maximumRow;
        rowIndex++
    ) {
        for (
            let columnIndex: number =
                minimumColumn;
            columnIndex <= maximumColumn;
            columnIndex++
        ) {
            range.push({
                rowIndex,
                columnIndex
            });
        }
    }

    return range;
};
```

Cell-click handler:

```typescript
cellClick: (
    args: ICellClickEventArgs
): void => {
    const selectedPosition:
        CellPosition = {
            rowIndex:
                Number(args.rowIndex),
            columnIndex:
                Number(args.columnIndex)
        };

    if (rangeStart === null) {
        rangeStart =
            selectedPosition;

        return;
    }

    selectedRange =
        getRange(
            rangeStart,
            selectedPosition
        );

    rangeStart = null;

    console.log(
        'Selected range:',
        selectedRange
    );
}
```

This calculates the selected range in application state. It does not automatically highlight those cells.

Use built-in selection support or a validated rendering method for visual range selection.

## Comparison Logic

Do not query generated HeatMap cells using assumed attributes such as:

```typescript
document.querySelectorAll(
    '[data-value]'
);
```

The generated rendering structure is an implementation detail and can differ between SVG and Canvas modes.

Instead, calculate related cells from the original data source.

```typescript
interface MatchingCell {
    rowIndex: number;
    columnIndex: number;
    value: number;
}

const findSimilarValues = (
    data: number[][],
    targetValue: number,
    tolerance: number
): MatchingCell[] => {
    const matches:
        MatchingCell[] = [];

    data.forEach(
        (
            row: number[],
            rowIndex: number
        ): void => {
            row.forEach(
                (
                    value: number,
                    columnIndex: number
                ): void => {
                    if (
                        Math.abs(
                            value -
                            targetValue
                        ) <= tolerance
                    ) {
                        matches.push({
                            rowIndex,
                            columnIndex,
                            value
                        });
                    }
                }
            );
        }
    );

    return matches;
};
```

Use it after a cell click:

```typescript
cellClick: (
    args: ICellClickEventArgs
): void => {
    const selectedValue: number =
        Number(args.value);

    if (!Number.isFinite(selectedValue)) {
        return;
    }

    const matches:
        MatchingCell[] =
            findSimilarValues(
                data,
                selectedValue,
                10
            );

    console.log(
        'Similar values:',
        matches
    );
}
```

Do not use invalid assignment syntax in a function call:

```typescript
highlightSimilarValues(
    targetValue,
    tolerance = 10
);
```

Use:

```typescript
highlightSimilarValues(
    targetValue,
    10
);
```

## Performance Guidance

### Keep High-Frequency Events Lightweight

Avoid expensive operations during pointer movement.

Do not:

- Send a network request on every pointer movement.
- Query the entire document repeatedly.
- Rebuild the HeatMap during hover.
- Run complex aggregation repeatedly.
- Apply inline style changes to many generated cells.

Prefer:

- Built-in tooltips.
- Built-in highlighting.
- Lightweight text updates.
- Precomputed metadata.
- Work triggered by click instead of mouse movement.

### Avoid Direct DOM Dependencies

Do not rely on:

```text
Generated cell IDs
Generated SVG paths
Canvas internals
Undocumented CSS classes
data-row attributes
data-column attributes
data-value attributes
```

The rendering structure can change with:

- Rendering mode.
- Component version.
- HeatMap configuration.
- Browser behavior.
- Performance optimizations.

Use public events, properties, methods, and the original data source.

### Clean Up

Destroy the HeatMap when its host view is removed.

```typescript
heatmap.destroy();
```

Remove custom event listeners when they are no longer needed.

```typescript
toggleButton.removeEventListener(
    'click',
    toggleHandler
);
```

Clear application timers:

```typescript
window.clearInterval(
    intervalId
);
```

## Complete TypeScript Example

### Required HTML

```html
<div class="heatmap-actions">
    <button id="clearSelectionButton" type="button">
        Clear selection
    </button>
</div>

<div class="heatmap-wrapper">
    <div id="heatmap"></div>
</div>

<p
    id="event-info"
    aria-live="polite"
    aria-atomic="true"
>
    Select a HeatMap cell to view details.
</p>
```

### Required CSS

```css
.heatmap-actions {
    display: flex;
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
    outline: 2px solid #0066cc;
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
    min-height: 450px;
}

#event-info {
    margin-top: 12px;
    padding: 10px;
    color: #1a1a1a;
    background: #f5f5f5;
    border: 1px solid #cccccc;
    border-radius: 4px;
}
```

### TypeScript

```typescript
import {
    HeatMap,
    Legend,
    Tooltip,
    ICellClickEventArgs,
    ICellEventArgs,
    ITooltipEventArgs
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Legend,
    Tooltip
);

interface SelectedCell {
    rowIndex: number;
    columnIndex: number;
    value: number | null;
    xLabel: string;
    yLabel: string;
}

const data: number[][] = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 4]
];

const selectedCells:
    Map<string, SelectedCell> =
        new Map<string, SelectedCell>();

const eventInfo: HTMLElement | null =
    document.getElementById(
        'event-info'
    );

const createCellKey = (
    rowIndex: number,
    columnIndex: number
): string => {
    return (
        rowIndex +
        ':' +
        columnIndex
    );
};

const updateEventInformation = (
    args: ICellClickEventArgs
): void => {
    if (!eventInfo) {
        return;
    }

    const value: number =
        Number(args.value);

    const selectedCount: number =
        selectedCells.size;

    eventInfo.textContent =
        'Selected cell. Year: ' +
        String(args.yLabel) +
        '. Quarter: ' +
        String(args.xLabel) +
        '. Value: ' +
        (
            Number.isFinite(value)
                ? value.toFixed(0)
                : 'No data'
        ) +
        '. Selected-cell count: ' +
        selectedCount +
        '.';
};

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

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
        },

        titleSettings: {
            text:
                'Quarterly Performance',

            textStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '16px',
                color: '#1a1a1a'
            }
        },

        cellSettings: {
            showLabel: true,
            enableCellHighlight: true,

            border: {
                width: 1,
                color: '#ffffff'
            }
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        },

        showTooltip: true,

        tooltipRender: (
            args: ITooltipEventArgs
        ): void => {
            const value: number =
                Number(args.value);

            args.content = [
                'Year: ' +
                String(args.yLabel),
                'Quarter: ' +
                String(args.xLabel),
                'Value: ' +
                (
                    Number.isFinite(value)
                        ? value.toFixed(0)
                        : 'No data'
                )
            ];
        },

        cellRender: (
            args: ICellEventArgs
        ): void => {
            const value: number =
                Number(args.value);

            if (!Number.isFinite(value)) {
                args.displayText =
                    'No data';

                return;
            }

            if (value >= 80) {
                args.cellColor =
                    '#107c10';
            } else if (value < 30) {
                args.cellColor =
                    '#d13438';
            }
        },

        cellClick: (
            args: ICellClickEventArgs
        ): void => {
            const rowIndex: number =
                Number(args.rowIndex);

            const columnIndex: number =
                Number(args.columnIndex);

            const key: string =
                createCellKey(
                    rowIndex,
                    columnIndex
                );

            const value: number =
                Number(args.value);

            if (selectedCells.has(key)) {
                selectedCells.delete(key);
            } else {
                selectedCells.set(
                    key,
                    {
                        rowIndex,
                        columnIndex,
                        value:
                            Number.isFinite(
                                value
                            )
                                ? value
                                : null,
                        xLabel:
                            String(
                                args.xLabel
                            ),
                        yLabel:
                            String(
                                args.yLabel
                            )
                    }
                );
            }

            updateEventInformation(
                args
            );
        },

        cellDoubleClick: (
            args: ICellClickEventArgs
        ): void => {
            const row: string =
                encodeURIComponent(
                    String(args.yLabel)
                );

            const column: string =
                encodeURIComponent(
                    String(args.xLabel)
                );

            const detailUrl: string =
                '/details?row=' +
                row +
                '&column=' +
                column;

            console.log(
                'Open detail view:',
                detailUrl
            );
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
            selectedCells.clear();

            if (
                typeof heatmap
                    .clearSelection ===
                'function'
            ) {
                heatmap.clearSelection();
            }

            if (eventInfo) {
                eventInfo.textContent =
                    'Selection cleared.';
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

    <title>HeatMap Events and Interactions</title>

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
            outline: 2px solid #0066cc;
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
            min-height: 450px;
        }

        #event-info {
            margin-top: 12px;
            padding: 10px;
            color: #1a1a1a;
            background: #f5f5f5;
            border: 1px solid #cccccc;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="heatmap-actions">
        <button id="clearSelectionButton" type="button">
            Clear selection
        </button>
    </div>

    <div class="heatmap-wrapper">
        <div id="heatmap"></div>
    </div>

    <p
        id="event-info"
        aria-live="polite"
        aria-atomic="true"
    >
        Select a HeatMap cell to view details.
    </p>

    <script>
        var data = [
            [73, 39, 26, 39],
            [93, 58, 53, 38],
            [99, 28, 22, 4]
        ];

        var selectedCells =
            new Map();

        var eventInfo =
            document.getElementById(
                'event-info'
            );

        function createCellKey(
            rowIndex,
            columnIndex
        ) {
            return (
                rowIndex +
                ':' +
                columnIndex
            );
        }

        function updateEventInformation(
            args
        ) {
            if (!eventInfo) {
                return;
            }

            var value =
                Number(args.value);

            eventInfo.textContent =
                'Selected cell. Year: ' +
                String(args.yLabel) +
                '. Quarter: ' +
                String(args.xLabel) +
                '. Value: ' +
                (
                    Number.isFinite(value)
                        ? value.toFixed(0)
                        : 'No data'
                ) +
                '. Selected-cell count: ' +
                selectedCells.size +
                '.';
        }

        var heatmap =
            new ej.heatmap.HeatMap({
                width: '100%',
                height: '450px',

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
                },

                titleSettings: {
                    text:
                        'Quarterly Performance',

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontWeight: '600',
                        size: '16px',
                        color: '#1a1a1a'
                    }
                },

                cellSettings: {
                    showLabel: true,
                    enableCellHighlight: true,

                    border: {
                        width: 1,
                        color: '#ffffff'
                    }
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom'
                },

                showTooltip: true,

                tooltipRender:
                    function (args) {
                        var value =
                            Number(
                                args.value
                            );

                        args.content = [
                            'Year: ' +
                            String(
                                args.yLabel
                            ),
                            'Quarter: ' +
                            String(
                                args.xLabel
                            ),
                            'Value: ' +
                            (
                                Number.isFinite(
                                    value
                                )
                                    ? value
                                        .toFixed(0)
                                    : 'No data'
                            )
                        ];
                    },

                cellRender:
                    function (args) {
                        var value =
                            Number(
                                args.value
                            );

                        if (
                            !Number.isFinite(
                                value
                            )
                        ) {
                            args.displayText =
                                'No data';

                            return;
                        }

                        if (value >= 80) {
                            args.cellColor =
                                '#107c10';
                        } else if (
                            value < 30
                        ) {
                            args.cellColor =
                                '#d13438';
                        }
                    },

                cellClick:
                    function (args) {
                        var rowIndex =
                            Number(
                                args.rowIndex
                            );

                        var columnIndex =
                            Number(
                                args.columnIndex
                            );

                        var key =
                            createCellKey(
                                rowIndex,
                                columnIndex
                            );

                        var value =
                            Number(
                                args.value
                            );

                        if (
                            selectedCells
                                .has(key)
                        ) {
                            selectedCells
                                .delete(key);
                        } else {
                            selectedCells.set(
                                key,
                                {
                                    rowIndex:
                                        rowIndex,
                                    columnIndex:
                                        columnIndex,
                                    value:
                                        Number
                                            .isFinite(
                                                value
                                            )
                                            ? value
                                            : null,
                                    xLabel:
                                        String(
                                            args
                                                .xLabel
                                        ),
                                    yLabel:
                                        String(
                                            args
                                                .yLabel
                                        )
                                }
                            );
                        }

                        updateEventInformation(
                            args
                        );
                    },

                cellDoubleClick:
                    function (args) {
                        var row =
                            encodeURIComponent(
                                String(
                                    args.yLabel
                                )
                            );

                        var column =
                            encodeURIComponent(
                                String(
                                    args.xLabel
                                )
                            );

                        var detailUrl =
                            '/details?row=' +
                            row +
                            '&column=' +
                            column;

                        console.log(
                            'Open detail view:',
                            detailUrl
                        );
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
                        selectedCells.clear();

                        if (
                            typeof heatmap
                                .clearSelection ===
                            'function'
                        ) {
                            heatmap
                                .clearSelection();
                        }

                        if (eventInfo) {
                            eventInfo
                                .textContent =
                                    'Selection cleared.';
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
✅ Every injected module is imported.
✅ Global JavaScript does not call HeatMap.Inject.
✅ All CDN scripts use the same EJ2 version.
✅ The scripts load in dependency order.
✅ The HeatMap host element exists.
✅ heatmap.appendTo('#heatmap') is called.
✅ Event handlers are registered in the HeatMap configuration.
✅ cellClick is used for single-click interaction.
✅ cellDoubleClick is used for double-click interaction.
✅ cellRender is used for conditional cell rendering.
✅ Event values are validated before numeric formatting.
✅ Optional event arguments are checked before use.
✅ showTooltip is true when tooltipRender is used.
✅ Cell highlighting uses the supported HeatMap property.
✅ Persistent selection is not confused with hover highlighting.
✅ Custom selection state uses row and column indexes.
✅ Generated cells are not queried through undocumented attributes.
✅ Generated SVG or Canvas elements are not styled directly.
✅ Interaction details use textContent instead of unsafe innerHTML.
✅ Navigation parameters use encodeURIComponent.
✅ Double-click is not the only way to access essential actions.
✅ High-frequency handlers avoid expensive work.
✅ No random or fabricated values are generated.
✅ clearSelection is used only when supported.
✅ The HeatMap is destroyed when its host view is removed.
✅ Executable HTML uses actual angle brackets.
✅ No encoded HTML entities replace executable tags.
✅ No editor-generated anchor elements appear in CDN URLs.
✅ No editor-generated strong, br, or data-lexical-text markup remains.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

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

### Unsupported Mouse-Move Event

Do not use:

```typescript
cellMouseMove: (
    args: ICellEventArgs
): void => {
    console.log(args);
}
```

unless the installed HeatMap model explicitly exposes that event.

Use:

- `showTooltip` and `tooltipRender` for hover information.
- `cellClick` for click interaction.
- `cellDoubleClick` for double-click interaction.
- `cellRender` for conditional cell appearance.

### Direct Cell-Element Styling

Avoid:

```typescript
args.cellElement.style.transform =
    'scale(1.05)';
```

HeatMap rendering can use SVG or Canvas. Use built-in cell highlighting and rendering properties.

### Incorrect Highlight Property

Avoid:

```typescript
cellSettings: {
    enableCellHighlighting: true
}
```

Use the property exposed by the installed HeatMap API:

```typescript
cellSettings: {
    enableCellHighlight: true
}
```

### Assuming DOM Data Attributes

Avoid:

```typescript
document.querySelectorAll(
    '[data-row="0"]'
);
```

Avoid:

```typescript
document.querySelectorAll(
    '[data-value]'
);
```

Use the original data source, public events, and supported selection APIs.

### Unsafe Inner HTML

Avoid:

```typescript
info.innerHTML =
    '<strong>' +
    args.yLabel +
    '</strong>';
```

Use:

```typescript
info.textContent =
    String(args.yLabel);
```

### Invalid Default Assignment in Function Call

Incorrect:

```typescript
highlightSimilarValues(
    targetValue,
    tolerance = 10
);
```

Correct:

```typescript
highlightSimilarValues(
    targetValue,
    10
);
```

### Unencoded Navigation Values

Avoid:

```typescript
const url =
    '/details?row=' +
    args.yLabel +
    '&column=' +
    args.xLabel;
```

Use:

```typescript
const url =
    '/details?row=' +
    encodeURIComponent(
        String(args.yLabel)
    ) +
    '&column=' +
    encodeURIComponent(
        String(args.xLabel)
    );
```

### Right-Click Assumption

Do not describe `cellClick` as a context-menu event unless the event arguments expose validated right-click or native-event information.

For a custom context menu, register a separate `contextmenu` handler on an appropriate supported element and validate how the clicked cell is identified.

### Event Propagation Assumption

Do not call:

```typescript
args.event.stopPropagation();
```

unless the event argument type exposes the native event.

### Selection State Does Not Equal Visual Selection

This code stores selected cells:

```typescript
selectedCells.set(
    key,
    selectedCell
);
```

It does not automatically apply visual selection.

Use built-in selection or supported cell-rendering behavior for visual feedback.

### Excessive Work in Cell Render

Avoid:

```typescript
cellRender: (args) => {
    fetch('/api/value-details');
}
```

`cellRender` runs for each rendered cell.

Use preloaded data instead.

### Missing Keyboard Alternative

Do not provide essential functionality only through:

```text
Mouse click
Double-click
Hover
Drag
```

Also provide native buttons, links, or form controls where users must perform an action.

### Malformed CDN Link

Do not use an anchor element around the CDN URL.

Do not use a URL ending in:

```text
.min.jsscript
```

Use valid script elements with URLs ending in:

```text
.min.js
```

Example:

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