# Data Binding in Syncfusion HeatMap

- #overview
- #supported-data-binding-types
- #array-table-binding
- #array-cell-binding
- #json-table-binding
- #json-cell-binding
- #data-adaptor-configuration
- #external-data-sources
- #real-time-data-updates
- #missing-and-invalid-values
- #performance-considerations
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Overview

The Syncfusion HeatMap supports two-dimensional array data and structured JSON data. Data adaptors allow table-based and cell-based data to be transformed into the matrix format required by the HeatMap.

The primary data-binding approaches are:

```text
Array table binding
Array cell binding
JSON table binding
JSON cell binding
```

Use table binding when each source item represents a complete row.

Use cell binding when each source item identifies one cell through its row, column, and value.

## Supported Data-Binding Types

### Array Table Binding

Use a two-dimensional array in which each inner array represents a row.

```typescript
dataSource: [
    [9.5, 2.2, 4.2],
    [4.3, 8.9, 10.8],
    [3.9, 2.7, 2.5]
]
```

### Array Cell Binding

Use an array containing explicit row index, column index, and value positions.

```typescript
dataSource: [
    [0, 0, 15],
    [0, 2, 18],
    [1, 1, 20]
]
```

### JSON Table Binding

Use objects in which each object represents one complete row.

```typescript
dataSource: [
    {
        Year: '2021',
        Q1: 73,
        Q2: 39,
        Q3: 26
    },
    {
        Year: '2022',
        Q1: 93,
        Q2: 58,
        Q3: 53
    }
]
```

### JSON Cell Binding

Use objects in which each object represents one cell.

```typescript
dataSource: [
    {
        Product: 'Product A',
        Month: 'Jan',
        Sales: 73
    },
    {
        Product: 'Product A',
        Month: 'Feb',
        Sales: 39
    }
]
```

## Array Table Binding

Array table binding is the default and simplest HeatMap data-binding approach.

Each inner array represents one row. Each value inside the row represents one column.

```text
Outer array length -> Number of rows
Inner array length -> Number of columns
```

### TypeScript

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const heatmapData: number[][] = [
    [9.5, 2.2, 4.2, 8.2, -0.5, 3.2],
    [4.3, 8.9, 10.8, 6.5, 5.1, 6.2],
    [3.9, 2.7, 2.5, 3.7, 2.6, 5.1],
    [2.4, -3.7, 4.1, 6.0, 5.0, 2.4],
    [2.0, 7.0, -4.1, 8.9, 2.7, 5.9]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: heatmapData,

        xAxis: {
            labels: [
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013'
            ]
        },

        yAxis: {
            labels: [
                'USA',
                'Germany',
                'UK',
                'France',
                'Japan'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### JavaScript

```javascript
var heatmapData = [
    [9.5, 2.2, 4.2, 8.2, -0.5, 3.2],
    [4.3, 8.9, 10.8, 6.5, 5.1, 6.2],
    [3.9, 2.7, 2.5, 3.7, 2.6, 5.1],
    [2.4, -3.7, 4.1, 6.0, 5.0, 2.4],
    [2.0, 7.0, -4.1, 8.9, 2.7, 5.9]
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

        dataSource: heatmapData,

        xAxis: {
            labels: [
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013'
            ]
        },

        yAxis: {
            labels: [
                'USA',
                'Germany',
                'UK',
                'France',
                'Japan'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### Matrix Validation

The matrix and axis labels must remain synchronized.

For the following data:

```typescript
const data: number[][] = [
    [10, 20, 30],
    [40, 50, 60]
];
```

use three X-axis labels:

```typescript
xAxis: {
    labels: [
        'A',
        'B',
        'C'
    ]
}
```

and two Y-axis labels:

```typescript
yAxis: {
    labels: [
        'X',
        'Y'
    ]
}
```

Avoid inconsistent row lengths:

```typescript
const invalidData = [
    [10, 20, 30],
    [40, 50]
];
```

Prefer:

```typescript
const validData = [
    [10, 20, 30],
    [40, 50, 60]
];
```

## Array Cell Binding

Array cell binding represents each cell as an array containing:

```text
X position
Y position
Cell value
```

This approach is useful for:

- Sparse data.
- Explicit cell positions.
- Irregular datasets.
- Data in which only selected coordinates have values.

The `Adaptor` module is required in a module-based TypeScript application.

### TypeScript

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Adaptor);

const cellData: number[][] = [
    [0, 0, 15],
    [2, 0, 18],
    [1, 1, 20],
    [3, 2, 22]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: cellData,

        dataSourceSettings: {
            isJsonData: false,
            adaptorType: 'Cell',
            xDataMapping: '0',
            yDataMapping: '1',
            valueMapping: '2'
        },

        xAxis: {
            labels: [
                'Col 1',
                'Col 2',
                'Col 3',
                'Col 4'
            ]
        },

        yAxis: {
            labels: [
                'Row 1',
                'Row 2',
                'Row 3'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### JavaScript

```javascript
var cellData = [
    [0, 0, 15],
    [2, 0, 18],
    [1, 1, 20],
    [3, 2, 22]
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

        dataSource: cellData,

        dataSourceSettings: {
            isJsonData: false,
            adaptorType: 'Cell',
            xDataMapping: '0',
            yDataMapping: '1',
            valueMapping: '2'
        },

        xAxis: {
            labels: [
                'Col 1',
                'Col 2',
                'Col 3',
                'Col 4'
            ]
        },

        yAxis: {
            labels: [
                'Row 1',
                'Row 2',
                'Row 3'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

Do not call `HeatMap.Inject` in the global JavaScript example.

## JSON Table Binding

JSON table binding uses one object per row.

Use this approach when:

- Source rows have meaningful field names.
- Data comes from a JSON API.
- Every source object contains values for several columns.
- A row includes a label field and multiple value fields.

The `Adaptor` module is required in TypeScript.

### Data Structure

```typescript
interface SalesRow {
    Year: string;
    Q1: number;
    Q2: number;
    Q3: number;
    Q4: number;
}

const jsonTableData: SalesRow[] = [
    {
        Year: '2021',
        Q1: 73,
        Q2: 39,
        Q3: 26,
        Q4: 39
    },
    {
        Year: '2022',
        Q1: 93,
        Q2: 58,
        Q3: 53,
        Q4: 38
    },
    {
        Year: '2023',
        Q1: 99,
        Q2: 28,
        Q3: 22,
        Q4: 4
    }
];
```

### TypeScript

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Adaptor);

interface SalesRow {
    Year: string;
    Q1: number;
    Q2: number;
    Q3: number;
    Q4: number;
}

const jsonTableData: SalesRow[] = [
    {
        Year: '2021',
        Q1: 73,
        Q2: 39,
        Q3: 26,
        Q4: 39
    },
    {
        Year: '2022',
        Q1: 93,
        Q2: 58,
        Q3: 53,
        Q4: 38
    },
    {
        Year: '2023',
        Q1: 99,
        Q2: 28,
        Q3: 22,
        Q4: 4
    }
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: jsonTableData,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Table',
            xDataMapping: 'Year'
        },

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
var jsonTableData = [
    {
        Year: '2021',
        Q1: 73,
        Q2: 39,
        Q3: 26,
        Q4: 39
    },
    {
        Year: '2022',
        Q1: 93,
        Q2: 58,
        Q3: 53,
        Q4: 38
    },
    {
        Year: '2023',
        Q1: 99,
        Q2: 28,
        Q3: 22,
        Q4: 4
    }
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

        dataSource: jsonTableData,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Table',
            xDataMapping: 'Year'
        },

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

The exact table-field arrangement must match the adaptor configuration expected by the installed HeatMap version. Confirm JSON-table mappings through the available type definitions before connecting a production API.

## JSON Cell Binding

JSON cell binding uses one object per cell.

Use it when:

- Cells have explicit row and column categories.
- The source data is sparse.
- Cell values include meaningful category fields.
- Data comes from a row-column-value API.
- Additional metadata must be maintained separately.

### TypeScript

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Adaptor);

interface SalesCell {
    Product: string;
    Month: string;
    Sales: number;
}

const cellData: SalesCell[] = [
    {
        Product: 'Product A',
        Month: 'Jan',
        Sales: 73
    },
    {
        Product: 'Product A',
        Month: 'Feb',
        Sales: 39
    },
    {
        Product: 'Product B',
        Month: 'Jan',
        Sales: 93
    },
    {
        Product: 'Product B',
        Month: 'Feb',
        Sales: 58
    },
    {
        Product: 'Product C',
        Month: 'Jan',
        Sales: 99
    }
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: cellData,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'Month',
            yDataMapping: 'Product',
            valueMapping: 'Sales'
        },

        xAxis: {
            valueType: 'Category',

            labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr'
            ]
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                'Product A',
                'Product B',
                'Product C',
                'Product D'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### JavaScript

```javascript
var cellData = [
    {
        Product: 'Product A',
        Month: 'Jan',
        Sales: 73
    },
    {
        Product: 'Product A',
        Month: 'Feb',
        Sales: 39
    },
    {
        Product: 'Product B',
        Month: 'Jan',
        Sales: 93
    },
    {
        Product: 'Product B',
        Month: 'Feb',
        Sales: 58
    },
    {
        Product: 'Product C',
        Month: 'Jan',
        Sales: 99
    }
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

        dataSource: cellData,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'Month',
            yDataMapping: 'Product',
            valueMapping: 'Sales'
        },

        xAxis: {
            valueType: 'Category',

            labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr'
            ]
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                'Product A',
                'Product B',
                'Product C',
                'Product D'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

Do not place the mappings directly on the HeatMap.

Incorrect:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: cellData,
        xName: 'Month',
        yName: 'Product',
        valueName: 'Sales'
    });
```

Correct:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: cellData,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'Month',
            yDataMapping: 'Product',
            valueMapping: 'Sales'
        }
    });
```

## Data Adaptor Configuration

Use the `Adaptor` module when the source data must be transformed before it can be rendered.

### Required TypeScript Module

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Adaptor);
```

### Table Adaptor

Use `Table` when each source item represents a complete row.

```typescript
dataSourceSettings: {
    isJsonData: true,
    adaptorType: 'Table'
}
```

Typical use cases:

- Time-series rows.
- Product-comparison rows.
- Financial periods.
- Rows containing several metric fields.

### Cell Adaptor

Use `Cell` when each source item represents one cell.

```typescript
dataSourceSettings: {
    isJsonData: true,
    adaptorType: 'Cell',
    xDataMapping: 'Month',
    yDataMapping: 'Product',
    valueMapping: 'Sales'
}
```

Typical use cases:

- Sparse matrices.
- Explicit coordinates.
- Category-based row and column values.
- API responses containing one record per cell.

### Global JavaScript

Do not call:

```javascript
ej.heatmap.HeatMap.Inject(
    ej.heatmap.Adaptor
);
```

The global HeatMap package provides the feature modules required by the global constructor.

## External Data Sources

External data must be retrieved and validated before it is assigned to the HeatMap.

Do not simulate API data when the application requires actual server data.

### TypeScript with Fetch

Required HTML:

```html
<p id="heatmap-status" aria-live="polite">
    Loading HeatMap data.
</p>

<div id="heatmap"></div>
```

TypeScript:

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const statusElement: HTMLElement | null =
    document.getElementById(
        'heatmap-status'
    );

const isNumericMatrix = (
    value: unknown
): value is number[][] => {
    if (!Array.isArray(value)) {
        return false;
    }

    if (value.length === 0) {
        return false;
    }

    const expectedColumnCount: number =
        Array.isArray(value[0])
            ? value[0].length
            : 0;

    if (expectedColumnCount === 0) {
        return false;
    }

    return value.every(
        (row: unknown): boolean => {
            return (
                Array.isArray(row) &&
                row.length ===
                    expectedColumnCount &&
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

const loadHeatMapData =
    async (): Promise<void> => {
        try {
            const response: Response =
                await fetch(
                    '/api/heatmap-data'
                );

            if (!response.ok) {
                throw new Error(
                    'Request failed with status ' +
                    response.status
                );
            }

            const responseData: unknown =
                await response.json();

            if (
                !isNumericMatrix(
                    responseData
                )
            ) {
                throw new Error(
                    'The API response is not a ' +
                    'valid numeric matrix.'
                );
            }

            const heatmap: HeatMap =
                new HeatMap({
                    width: '100%',
                    height: '450px',

                    dataSource:
                        responseData,

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
                            '2023',
                            '2024'
                        ]
                    }
                });

            heatmap.appendTo(
                '#heatmap'
            );

            if (statusElement) {
                statusElement.textContent =
                    'HeatMap data loaded.';
            }
        } catch (error: unknown) {
            console.error(
                'Failed to load HeatMap data:',
                error
            );

            if (statusElement) {
                statusElement.textContent =
                    'Unable to load HeatMap data.';
            }
        }
    };

void loadHeatMapData();
```

The expected axis labels must match the actual API matrix dimensions. If API dimensions vary, construct the labels from validated response metadata rather than hard-coding them.

### JavaScript with XMLHttpRequest

```javascript
var statusElement =
    document.getElementById(
        'heatmap-status'
    );

function isNumericMatrix(value) {
    if (
        !Array.isArray(value) ||
        value.length === 0 ||
        !Array.isArray(value[0])
    ) {
        return false;
    }

    var columnCount =
        value[0].length;

    if (columnCount === 0) {
        return false;
    }

    return value.every(
        function (row) {
            return (
                Array.isArray(row) &&
                row.length ===
                    columnCount &&
                row.every(
                    function (cell) {
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
}

function loadHeatMapData() {
    var request =
        new XMLHttpRequest();

    request.open(
        'GET',
        '/api/heatmap-data',
        true
    );

    request.onload =
        function () {
            if (
                request.status < 200 ||
                request.status >= 300
            ) {
                console.error(
                    'Request failed:',
                    request.status
                );

                if (statusElement) {
                    statusElement
                        .textContent =
                            'Unable to load HeatMap data.';
                }

                return;
            }

            try {
                var responseData =
                    JSON.parse(
                        request.responseText
                    );

                if (
                    !isNumericMatrix(
                        responseData
                    )
                ) {
                    throw new Error(
                        'Invalid HeatMap matrix.'
                    );
                }

                var heatmap =
                    new ej.heatmap.HeatMap({
                        width: '100%',
                        height: '450px',

                        dataSource:
                            responseData
                    });

                heatmap.appendTo(
                    '#heatmap'
                );

                if (statusElement) {
                    statusElement
                        .textContent =
                            'HeatMap data loaded.';
                }
            } catch (error) {
                console.error(
                    'Unable to parse data:',
                    error
                );

                if (statusElement) {
                    statusElement
                        .textContent =
                            'The HeatMap response was invalid.';
                }
            }
        };

    request.onerror =
        function () {
            console.error(
                'A network error occurred.'
            );

            if (statusElement) {
                statusElement.textContent =
                    'A network error occurred.';
            }
        };

    request.send();
}

loadHeatMapData();
```

This is an XMLHttpRequest example, not JSONP. JSONP uses script-based callback behavior and should not be used as a label for an ordinary XHR request.

## Real-Time Data Updates

Update the `dataSource` and refresh the HeatMap when new data arrives.

### TypeScript

```typescript
const updateHeatMapData = (
    newData: number[][]
): void => {
    heatmap.dataSource =
        newData;

    heatmap.refresh();
};
```

Example:

```typescript
const newData: number[][] = [
    [85, 42, 31, 44, 99, 5],
    [98, 63, 58, 43, 31, 73]
];

updateHeatMapData(
    newData
);
```

### JavaScript

```javascript
function updateHeatMapData(
    newData
) {
    heatmap.dataSource =
        newData;

    heatmap.refresh();
}
```

### Timed Updates

Store the interval ID so it can be cleared.

```typescript
const intervalId: number =
    window.setInterval(
        (): void => {
            const newData:
                number[][] = [
                    [85, 42, 31, 44],
                    [98, 63, 58, 43],
                    [90, 38, 29, 57]
                ];

            heatmap.dataSource =
                newData;

            heatmap.refresh();
        },
        5000
    );
```

Stop updates when they are no longer required:

```typescript
window.clearInterval(
    intervalId
);
```

Destroy the HeatMap when its view is removed:

```typescript
heatmap.destroy();
```

### Update Frequency

Avoid refreshing more frequently than the users can interpret the data.

For rapid incoming values:

- Buffer updates.
- Keep only the latest complete dataset.
- Refresh on a controlled interval.
- Pause updates when the view is hidden.
- Disable unnecessary animation.
- Avoid rebuilding the HeatMap instance.
- Validate matrix dimensions before every update.

## Missing and Invalid Values

A dataset may contain:

- `null`.
- `undefined`.
- `NaN`.
- Empty positions.
- Missing sparse cells.
- Nonnumeric API values.

Do not assume all invalid values are rendered identically.

Validate source data before binding it.

### Normalizing a Matrix

```typescript
type HeatMapValue =
    number | null;

const normalizeMatrix = (
    data: unknown[][]
): HeatMapValue[][] => {
    return data.map(
        (
            row: unknown[]
        ): HeatMapValue[] => {
            return row.map(
                (
                    cell: unknown
                ): HeatMapValue => {
                    if (
                        cell === null ||
                        cell === undefined ||
                        cell === ''
                    ) {
                        return null;
                    }

                    const value: number =
                        Number(cell);

                    return Number.isFinite(
                        value
                    )
                        ? value
                        : null;
                }
            );
        }
    );
};
```

Example:

```typescript
const rawData: unknown[][] = [
    [10, '20', null],
    [40, 'invalid', 60]
];

const normalizedData:
    HeatMapValue[][] =
        normalizeMatrix(rawData);
```

Result:

```typescript
[
    [10, 20, null],
    [40, null, 60]
]
```

Configure missing-value appearance through supported HeatMap empty-point or cell-rendering settings for the installed version.

## Performance Considerations

### Rendering Mode

HeatMap can support SVG and Canvas rendering modes.

Select the rendering mode according to:

- Dataset size.
- Required interaction.
- Export requirements.
- Accessibility needs.
- Browser and device performance.
- Visual-quality requirements.

Do not claim that Canvas mode is selected automatically unless the installed HeatMap version explicitly documents that behavior.

When supported, configure the required rendering mode explicitly:

```typescript
renderingMode: 'Canvas'
```

or:

```typescript
renderingMode: 'SVG'
```

Validate the exact property values in the installed package.

### Large Matrices

For large matrices:

- Prefer compact axis labels.
- Avoid expensive `cellRender` processing.
- Keep tooltip calculations lightweight.
- Avoid repeated full refreshes.
- Filter or aggregate data when detailed cells are not required.
- Consider Canvas rendering.
- Avoid constructing large HTML strings per cell.
- Test memory usage on target devices.

### Avoid Recreating the Component

Avoid:

```typescript
const heatmap =
    new HeatMap({
        dataSource: newData
    });

heatmap.appendTo('#heatmap');
```

for every data update.

Prefer:

```typescript
heatmap.dataSource =
    newData;

heatmap.refresh();
```

## Complete TypeScript Example

### Required HTML

```html
<div class="heatmap-actions">
    <button id="refreshDataButton" type="button">
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
    HeatMap loaded with the initial data.
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

const initialData: number[][] = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 4]
];

const updatedData: number[][] = [
    [85, 42, 31, 44],
    [98, 63, 58, 43],
    [90, 38, 29, 57]
];

const statusElement: HTMLElement | null =
    document.getElementById(
        'heatmap-status'
    );

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource:
            initialData,

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
        }
    });

heatmap.appendTo('#heatmap');

const refreshDataButton:
    HTMLElement | null =
        document.getElementById(
            'refreshDataButton'
        );

if (refreshDataButton) {
    refreshDataButton.addEventListener(
        'click',
        (): void => {
            heatmap.dataSource =
                updatedData;

            heatmap.refresh();

            if (statusElement) {
                statusElement.textContent =
                    'The HeatMap data was updated.';
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

    <title>HeatMap Data Binding</title>

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
    </style>
</head>
<body>
    <div class="heatmap-actions">
        <button id="refreshDataButton" type="button">
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
        HeatMap loaded with the initial data.
    </p>

    <script>
        var initialData = [
            [73, 39, 26, 39],
            [93, 58, 53, 38],
            [99, 28, 22, 4]
        ];

        var updatedData = [
            [85, 42, 31, 44],
            [98, 63, 58, 43],
            [90, 38, 29, 57]
        ];

        var statusElement =
            document.getElementById(
                'heatmap-status'
            );

        var heatmap =
            new ej.heatmap.HeatMap({
                width: '100%',
                height: '450px',

                dataSource:
                    initialData,

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
                    }
            });

        heatmap.appendTo('#heatmap');

        var refreshDataButton =
            document.getElementById(
                'refreshDataButton'
            );

        if (refreshDataButton) {
            refreshDataButton
                .addEventListener(
                    'click',
                    function () {
                        heatmap.dataSource =
                            updatedData;

                        heatmap.refresh();

                        if (statusElement) {
                            statusElement
                                .textContent =
                                    'The HeatMap data was updated.';
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
✅ Adaptor is imported and injected for adaptor-based TypeScript binding.
✅ Every injected module is imported.
✅ Global JavaScript does not call HeatMap.Inject.
✅ All global scripts use the same EJ2 version.
✅ The global scripts load in dependency order.
✅ The HeatMap host element exists.
✅ heatmap.appendTo('#heatmap') is called.
✅ The appendTo selector matches the host ID.
✅ Matrix rows use consistent column counts.
✅ X-axis labels match the matrix-column count.
✅ Y-axis labels match the matrix-row count.
✅ Array table binding uses a two-dimensional matrix.
✅ Array cell binding uses explicit cell coordinates.
✅ JSON table binding uses dataSourceSettings with Table adaptor.
✅ JSON cell binding uses dataSourceSettings with Cell adaptor.
✅ JSON cell mappings use xDataMapping, yDataMapping, and valueMapping.
✅ API responses are validated before binding.
✅ Fetch requests check response.ok.
✅ XMLHttpRequest handles HTTP and network failures.
✅ JSON parsing errors are handled.
✅ Missing and invalid values are normalized explicitly.
✅ Real-time updates replace dataSource and refresh the existing HeatMap.
✅ Interval IDs are stored and cleared.
✅ HeatMap instances are destroyed when their host views are removed.
✅ Rendering mode is selected explicitly when required.
✅ Large datasets avoid expensive per-cell processing.
✅ Executable HTML uses actual angle brackets.
✅ No encoded tags replace executable HTML.
✅ No editor-generated anchor tags appear in CDN URLs.
✅ No editor-generated strong, br, or data-lexical-text markup remains.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Direct Object Mapping on HeatMap

Incorrect:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: cellData,
        xName: 'Month',
        yName: 'Product',
        valueName: 'Sales'
    });
```

Correct:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: cellData,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'Month',
            yDataMapping: 'Product',
            valueMapping: 'Sales'
        }
    });
```

### Missing Adaptor Module

Incorrect TypeScript:

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const heatmap: HeatMap =
    new HeatMap({
        dataSourceSettings: {
            adaptorType: 'Cell'
        }
    });
```

Correct:

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Adaptor
);
```

### TypeScript Injection in Global JavaScript

Avoid:

```javascript
ej.heatmap.HeatMap.Inject(
    ej.heatmap.Adaptor
);
```

Use the global constructor directly:

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        dataSource: data,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'Month',
            yDataMapping: 'Product',
            valueMapping: 'Sales'
        }
    });

heatmap.appendTo('#heatmap');
```

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

### Invalid Matrix Shape

Avoid:

```typescript
const data = [
    [10, 20, 30],
    [40, 50]
];
```

Prefer:

```typescript
const data = [
    [10, 20, 30],
    [40, 50, 60]
];
```

### Label Count Mismatch

Incorrect:

```typescript
dataSource: [
    [10, 20, 30],
    [40, 50, 60]
],

xAxis: {
    labels: [
        'A',
        'B'
    ]
},

yAxis: {
    labels: [
        'X',
        'Y',
        'Z'
    ]
}
```

Correct:

```typescript
dataSource: [
    [10, 20, 30],
    [40, 50, 60]
],

xAxis: {
    labels: [
        'A',
        'B',
        'C'
    ]
},

yAxis: {
    labels: [
        'X',
        'Y'
    ]
}
```

### Missing Fetch Status Check

Avoid:

```typescript
const response =
    await fetch(
        '/api/heatmap-data'
    );

const data =
    await response.json();
```

Use:

```typescript
const response: Response =
    await fetch(
        '/api/heatmap-data'
    );

if (!response.ok) {
    throw new Error(
        'Request failed with status ' +
        response.status
    );
}

const data: unknown =
    await response.json();
```

### Incorrect JSONP Description

An XMLHttpRequest example is not JSONP.

XMLHttpRequest:

```javascript
var request =
    new XMLHttpRequest();

request.open(
    'GET',
    '/api/heatmap-data',
    true
);
```

Describe it as an XHR request.

### Recreating HeatMap During Updates

Avoid:

```typescript
const heatmap =
    new HeatMap({
        dataSource: newData
    });

heatmap.appendTo('#heatmap');
```

for every update.

Use:

```typescript
heatmap.dataSource =
    newData;

heatmap.refresh();
```

### Unmanaged Interval

Avoid:

```typescript
setInterval(
    updateHeatMapData,
    5000
);
```

without retaining the interval ID.

Use:

```typescript
const intervalId: number =
    window.setInterval(
        updateHeatMapData,
        5000
    );

window.clearInterval(
    intervalId
);
```

### Automatic Canvas Assumption

Do not state:

```text
Canvas rendering is selected automatically for large data.
```

Choose and validate the rendering mode explicitly when required.

### Nonnumeric Value Assumption

Do not rely on every nonnumeric value being rendered identically.

Normalize external values:

```typescript
const value: number =
    Number(rawValue);

const normalizedValue:
    number | null =
        Number.isFinite(value)
            ? value
            : null;
```

### Malformed CDN Link

Do not wrap the URL in an anchor element.

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

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, templates, commands, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```