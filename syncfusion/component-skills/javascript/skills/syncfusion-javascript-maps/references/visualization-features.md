# Visualization Features in Maps

The Syncfusion EJ2 Maps component supports GeoJSON shape rendering, shape color mapping, bubbles, custom polygon overlays, data labels, legends, tooltips, selection, zooming, and panning.

Use the appropriate visualization for the data:

- Use **GeoJSON shapes** to render countries, states, or other geographic boundaries.
- Use **shape color mapping** to encode values associated with GeoJSON regions.
- Use **bubbles** to represent values associated with GeoJSON shapes.
- Use **markers** for locations defined directly by latitude and longitude.
- Use **custom polygons** for coordinate-defined zones or boundaries.
- Use **data labels** to display text on GeoJSON shapes.

- #required-modules
- #visualization-selection-guide
- #world-map-data-setup
  - #download-the-world-map
  - #validate-the-world-map
  - #import-geojson-in-typescript
- #bubble-visualization
  - #bubble-data-binding
  - #bubble-size
  - #bubble-color-mapping
  - #multiple-bubble-groups
  - #bubble-selection-and-tooltips
- #geojson-shape-rendering
  - #basic-shape-layer
  - #shape-data-binding
- #custom-polygon-overlays
- #shape-color-mapping
  - #range-color-mapping
  - #equal-color-mapping
  - #desaturation-color-mapping
- #data-labels
- #complete-typescript-example
- #complete-javascript-example
- #openstreetmap-polygon-example
- #accessibility-guidance
- #performance-guidance
- #runtime-validation-checklist
- #troubleshooting
- #combined-mistakes-and-future-references

## Required Modules

TypeScript Maps features require their corresponding modules to be imported and injected before creating the Maps instance.

```text
Bubbles         -> Bubble
Shape labels    -> DataLabel
Legend          -> Legend
Tooltips        -> MapsTooltip
Custom polygons -> Polygon
Selection       -> Selection
Zoom and pan    -> Zoom
```

A GeoJSON map containing bubbles, data labels, a legend, tooltips, selection, zooming, and panning requires:

```typescript
import {
    Bubble,
    DataLabel,
    Legend,
    Maps,
    MapsTooltip,
    Selection,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Bubble,
    DataLabel,
    Legend,
    MapsTooltip,
    Selection,
    Zoom
);
```

A tile map containing a custom polygon overlay requires:

```typescript
import {
    Maps,
    Polygon,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Polygon,
    Zoom
);
```

Complete global JavaScript bundles do not require explicit `Maps.Inject(...)` calls.

## Visualization Selection Guide

### Use Bubbles

Use bubbles when numeric values are associated with GeoJSON shapes.

Examples include:

- Population by country.
- Revenue by state.
- Sales by territory.
- Engagement by region.
- Resource consumption by district.

Bubble data must be associated with a shape layer through matching fields.

### Use Markers

Use markers when data is based directly on latitude and longitude.

Examples include:

- Offices.
- Stores.
- Airports.
- Warehouses.
- Delivery points.
- Incident locations.

Do not use a shape-bound bubble configuration as a replacement for coordinate-based markers.

### Use GeoJSON Shapes

Use a GeoJSON shape layer when rendering:

- Countries.
- States.
- Provinces.
- Districts.
- Administrative boundaries.
- Custom geographic features.

### Use Custom Polygons

Use `polygonSettings.polygons` when the application supplies explicit latitude and longitude points for a custom area.

Examples include:

- Delivery zones.
- Restricted areas.
- Coverage boundaries.
- Service regions.
- Temporary geographic overlays.

## World Map Data Setup

GeoJSON shape, bubble, shape-label, and shape-color-mapping examples require complete geographic shape data.

The Maps package does not automatically provide every world, country, or state GeoJSON file.

## Download the World Map

Create a data directory:

```bash
mkdir -p src/data
```

Download a Natural Earth-derived country GeoJSON file:

```bash
curl -L "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" -o "src/data/world-map.geojson"
```

Using `wget`:

```bash
wget "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" -O "src/data/world-map.geojson"
```

Using PowerShell:

```powershell
Invoke-WebRequest `
  -Uri "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" `
  -OutFile "src/data/world-map.geojson"
```

Manual download:

```text
https://datahub.io/core/geo-countries/_r/-/data/countries.geojson
```

Dataset information:

```text
https://github.com/datasets/geo-countries
```

Review the dataset license and confirm that it is appropriate for the application before redistributing it.

## Validate the World Map

Create `scripts/validate-world-map.mjs`:

```javascript
import {
    readFile
} from 'node:fs/promises';

const filePath =
    'src/data/world-map.geojson';

const fileContent =
    await readFile(
        filePath,
        'utf8'
    );

const worldMap =
    JSON.parse(
        fileContent
    );

if (
    worldMap.type !==
    'FeatureCollection'
) {
    throw new Error(
        'The world-map file must be a GeoJSON FeatureCollection.'
    );
}

if (
    !Array.isArray(
        worldMap.features
    ) ||
    worldMap.features.length === 0
) {
    throw new Error(
        'The world-map file does not contain GeoJSON features.'
    );
}

console.log(
    'The world-map GeoJSON is valid.'
);

console.log(
    'Feature count:',
    worldMap.features.length
);
```

Run:

```bash
node scripts/validate-world-map.mjs
```

## Import GeoJSON in TypeScript

Rename the file for JSON module imports:

```bash
mv src/data/world-map.geojson src/data/world-map.json
```

Enable JSON imports in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

Import the file:

```typescript
import worldMap
    from './data/world-map.json';
```

If the bundler does not support JSON imports, convert the GeoJSON file into a TypeScript module.

## Bubble Visualization

Bubbles represent numeric values associated with geographic shapes.

The bubble size is determined by the field assigned to `valuePath`.

A second field can be assigned to `colorValuePath` when bubble size and bubble color represent different metrics.

## Bubble Data Binding

`bubbleSettings` is an array on a GeoJSON layer.

```typescript
interface CountryMetrics {
    country: string;
    population: number;
    engagement: number;
}

const countryMetrics:
    CountryMetrics[] = [
        {
            country:
                'United States of America',
            population:
                331900000,
            engagement:
                72
        },
        {
            country:
                'Brazil',
            population:
                214300000,
            engagement:
                54
        },
        {
            country:
                'India',
            population:
                1408000000,
            engagement:
                88
        }
    ];
```

Configuration:

```typescript
layers: [
    {
        shapeData:
            worldMap,

        shapePropertyPath:
            'name',

        shapeDataPath:
            'country',

        bubbleSettings: [
            {
                visible: true,
                dataSource:
                    countryMetrics,
                valuePath:
                    'population',
                minRadius: 8,
                maxRadius: 36
            }
        ]
    }
]
```

The following fields must match:

```text
GeoJSON shape property -> shapePropertyPath
Application data field -> shapeDataPath
Bubble size field      -> valuePath
```

## Bubble Size

```typescript
bubbleSettings: [
    {
        visible: true,
        dataSource:
            countryMetrics,
        valuePath:
            'population',
        minRadius: 8,
        maxRadius: 36,
        opacity: 0.8,

        border: {
            color: '#1e3a8a',
            width: 1
        }
    }
]
```

Validate that:

- `valuePath` exists in every applicable data item.
- Every value is numeric and finite.
- Values are nonnegative.
- `minRadius` is finite and nonnegative.
- `maxRadius` is finite.
- `minRadius` does not exceed `maxRadius`.

Avoid claiming a specific mathematical interpolation formula unless it has been validated for the installed Maps version.

## Bubble Color Mapping

Use `colorValuePath` with singular `colorMapping`.

```typescript
bubbleSettings: [
    {
        visible: true,
        dataSource:
            countryMetrics,
        valuePath:
            'population',
        colorValuePath:
            'engagement',
        minRadius: 8,
        maxRadius: 36,
        opacity: 0.85,

        colorMapping: [
            {
                from: 0,
                to: 39,
                color: '#bfdbfe',
                label:
                    'Low engagement'
            },
            {
                from: 40,
                to: 69,
                color: '#60a5fa',
                label:
                    'Moderate engagement'
            },
            {
                from: 70,
                to: 100,
                color: '#1d4ed8',
                label:
                    'High engagement'
            }
        ]
    }
]
```

Use `from` and `to` for numeric ranges.

Do not use exact `value` entries as numeric thresholds.

Incorrect:

```typescript
colorMapping: [
    {
        value: 1000000,
        color: '#dbeafe'
    },
    {
        value: 5000000,
        color: '#2563eb'
    }
]
```

Use finite, nonoverlapping ranges.

## Multiple Bubble Groups

Multiple bubble groups can be configured as multiple entries in the same GeoJSON layer when each group is associated with the same shape data.

```typescript
interface CountryIncome {
    country: string;
    averageIncome: number;
}

const incomeData:
    CountryIncome[] = [
        {
            country:
                'United States of America',
            averageIncome:
                65000
        },
        {
            country:
                'Brazil',
            averageIncome:
                9500
        },
        {
            country:
                'India',
            averageIncome:
                2400
        }
    ];
```

Configuration:

```typescript
bubbleSettings: [
    {
        visible: true,
        dataSource:
            countryMetrics,
        valuePath:
            'population',
        minRadius: 8,
        maxRadius: 32,
        fill: '#2563eb',
        opacity: 0.7
    },
    {
        visible: true,
        dataSource:
            incomeData,
        valuePath:
            'averageIncome',
        minRadius: 5,
        maxRadius: 20,
        fill: '#f59e0b',
        opacity: 0.7
    }
]
```

Use multiple bubble groups only when the visual encoding remains understandable. Multiple overlapping bubble series can make the map difficult to interpret.

## Bubble Selection and Tooltips

Import and inject `Selection` and `MapsTooltip`.

```typescript
import {
    Bubble,
    Maps,
    MapsTooltip,
    Selection
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Bubble,
    Selection,
    MapsTooltip
);
```

Configure the settings inside the bubble entry:

```typescript
bubbleSettings: [
    {
        visible: true,
        dataSource:
            countryMetrics,
        valuePath:
            'population',
        minRadius: 8,
        maxRadius: 36,

        selectionSettings: {
            enable: true,
            enableMultiSelect: false,
            fill: '#facc15',
            opacity: 1,

            border: {
                color: '#991b1b',
                width: 2
            }
        },

        tooltipSettings: {
            visible: true,
            valuePath:
                'country'
        }
    }
]
```

Selection opacity controls the selected bubble's appearance. It does not control the opacity of every unselected bubble.

## GeoJSON Shape Rendering

A GeoJSON shape layer renders geographic boundaries from `shapeData`.

This is different from a custom polygon overlay.

## Basic Shape Layer

```typescript
const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        layers: [
            {
                shapeData:
                    worldMap,

                shapeSettings: {
                    fill: '#8dd3c7',
                    opacity: 0.8,

                    border: {
                        color: '#334155',
                        width: 1
                    }
                }
            }
        ]
    });

map.appendTo(
    '#maps-container'
);
```

Do not add:

```typescript
type:
    'Geometry'
```

unless the installed layer model explicitly requires it for the selected scenario.

## Shape Data Binding

Application data can be bound to GeoJSON shapes through `shapePropertyPath` and `shapeDataPath`.

```typescript
interface CountryMetrics {
    country: string;
    population: number;
    engagement: number;
}
```

```typescript
layers: [
    {
        shapeData:
            worldMap,

        dataSource:
            countryMetrics,

        shapePropertyPath:
            'name',

        shapeDataPath:
            'country'
    }
]
```

Do not use an arbitrary JavaScript path such as:

```typescript
shapePropertyPath:
    'properties.name'
```

Use the property name exposed by the GeoJSON feature properties:

```typescript
shapePropertyPath:
    'name'
```

Field casing must match exactly.

## Custom Polygon Overlays

Custom polygon overlays use coordinate points rather than GeoJSON `shapeData`.

Import and inject `Polygon`:

```typescript
import {
    Maps,
    Polygon
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Polygon
);
```

Example:

```typescript
const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        centerPosition: {
            latitude: 37.6,
            longitude: -122.25
        },

        layers: [
            {
                urlTemplate:
                    'https://tile.openstreetmap.org/level/tileX/tileY.png',

                polygonSettings: {
                    polygons: [
                        {
                            points: [
                                {
                                    latitude:
                                        37.9,
                                    longitude:
                                        -122.6
                                },
                                {
                                    latitude:
                                        37.9,
                                    longitude:
                                        -121.9
                                },
                                {
                                    latitude:
                                        37.3,
                                    longitude:
                                        -121.9
                                },
                                {
                                    latitude:
                                        37.3,
                                    longitude:
                                        -122.6
                                }
                            ],

                            fill:
                                '#dc2626',
                            opacity:
                                0.3,
                            borderColor:
                                '#991b1b',
                            borderWidth:
                                2,
                            borderOpacity:
                                1
                        }
                    ]
                }
            }
        ]
    });

map.appendTo(
    '#maps-container'
);
```

Validate each polygon:

- It contains at least three distinct points.
- Every latitude is finite and between `-90` and `90`.
- Every longitude is finite and between `-180` and `180`.
- Opacity is between `0` and `1`.
- Border opacity is between `0` and `1`.
- Border width is finite and nonnegative.

Do not describe a GeoJSON shape layer as a custom polygon overlay. They use different configuration models.

## Shape Color Mapping

Shape color mapping associates application data with GeoJSON shapes and assigns fills based on values.

Use:

```typescript
shapeSettings: {
    colorValuePath:
        'population',

    colorMapping: [
        // Mapping entries
    ]
}
```

The property is singular:

```text
colorMapping
```

Do not use:

```text
colorMappings
```

## Range Color Mapping

Use range mapping for continuous numeric data.

```typescript
shapeSettings: {
    fill: '#e2e8f0',
    colorValuePath:
        'population',

    colorMapping: [
        {
            from: 0,
            to: 99999999,
            color: '#dbeafe',
            label:
                'Below 100 million'
        },
        {
            from: 100000000,
            to: 499999999,
            color: '#60a5fa',
            label:
                '100 to 499 million'
        },
        {
            from: 500000000,
            to: 2000000000,
            color: '#1d4ed8',
            label:
                '500 million or more'
        }
    ]
}
```

Use finite, nonoverlapping ranges.

Avoid:

```typescript
{
    from: 500000000,
    to: Infinity,
    color: '#1d4ed8'
}
```

Use a validated finite upper boundary derived from the application data.

Discrete ranges do not automatically create a continuous gradient. Each configured range uses its assigned color.

## Equal Color Mapping

Use exact-value mapping for categorical fields.

```typescript
interface CountryRisk {
    country: string;
    risk: string;
}

const riskData:
    CountryRisk[] = [
        {
            country:
                'United States of America',
            risk:
                'Warning'
        },
        {
            country:
                'Brazil',
            risk:
                'Critical'
        },
        {
            country:
                'India',
            risk:
                'Normal'
        }
    ];
```

Configuration:

```typescript
shapeSettings: {
    fill: '#d1d5db',
    colorValuePath:
        'risk',

    colorMapping: [
        {
            value:
                'Critical',
            color:
                '#b91c1c',
            label:
                'Critical'
        },
        {
            value:
                'Warning',
            color:
                '#d97706',
            label:
                'Warning'
        },
        {
            value:
                'Normal',
            color:
                '#047857',
            label:
                'Normal'
        }
    ]
}
```

Use exact-value mapping for unrelated categories such as:

- Status.
- Risk.
- Priority.
- Region type.
- Membership.
- Operational state.

Do not rely only on red and green to communicate meaning.

## Desaturation Color Mapping

Use opacity interpolation within a color-mapping entry.

```typescript
shapeSettings: {
    fill: '#e2e8f0',
    colorValuePath:
        'engagement',

    colorMapping: [
        {
            from: 0,
            to: 100,
            color: '#2563eb',
            minOpacity: 0.35,
            maxOpacity: 1,
            label:
                'Engagement'
        }
    ]
}
```

Do not add:

```typescript
desaturation:
    true
```

unless the installed model explicitly provides such a property.

When using opacity-based mapping:

- Keep low-opacity shapes distinguishable.
- Preserve visible region boundaries.
- Keep data labels readable.
- Test against the actual page background.
- Avoid making important values nearly invisible.

## Data Labels

Maps data labels apply to shapes through the layer-level `dataLabelSettings`.

Import and inject `DataLabel`:

```typescript
import {
    DataLabel,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    DataLabel
);
```

Configuration:

```typescript
dataLabelSettings: {
    visible: true,
    labelPath:
        'country',
    smartLabelMode:
        'Trim',

    textStyle: {
        fontFamily:
            'Segoe UI',
        size:
            '12px',
        color:
            '#111827',
        fontWeight:
            '500'
    }
}
```

Use the exact casing:

```text
dataLabelSettings
```

Do not use:

```text
datalabelSettings
```

The label path can refer to:

- A property in the GeoJSON shape.
- A property in the layer data source when shape binding is configured.

Marker and bubble models do not automatically use the shape data-label model.

For marker text, use a validated marker template.

For bubble details, use tooltips, legends, annotations, or persistent application-owned content.

## Complete TypeScript Example

This example renders:

- A local world-map GeoJSON file.
- Shape range color mapping based on population.
- Shape data labels.
- Bubbles sized by population.
- Bubbles colored by engagement.
- Shape and bubble tooltips.
- A layer legend.
- Zooming and panning.
- Runtime data validation.
- A semantic data table.

### Data Setup

Download the world map:

```bash
mkdir -p src/data
curl -L "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" -o "src/data/world-map.json"
```

Enable JSON imports:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

### index.html

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
        Maps Visualization Features
    </title>

    ./styles.css
</head>

<body>
    <main class="page-container">
        <section
            class="maps-card"
            aria-labelledby="maps-heading"
            aria-describedby="maps-description"
        >
            <h1 id="maps-heading">
                Country Population and Engagement
            </h1>

            <p id="maps-description">
                Country fills represent population ranges.
                Bubble size represents population, and bubble color
                represents engagement.
            </p>

            <div id="maps-container"></div>

            <section
                class="data-section"
                aria-labelledby="data-heading"
            >
                <h2 id="data-heading">
                    Country metrics
                </h2>

                <div class="table-wrapper">
                    <table>
                        <caption>
                            Text equivalent of the country visualization
                        </caption>

                        <thead>
                            <tr>
                                <th scope="col">Country</th>
                                <th scope="col">Population</th>
                                <th scope="col">Engagement</th>
                            </tr>
                        </thead>

                        <tbody id="metrics-table-body"></tbody>
                    </table>
                </div>
            </section>

            <p
                id="maps-status"
                class="visually-hidden"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the visualization.
            </p>
        </section>
    </main>

    ./<script scr="app.ts"></script>
</body>
</html>
```

### styles.css

```css
html,
body {
    margin: 0;
    min-height: 100%;
}

body {
    color: #111827;
    background: #f1f5f9;
    font-family:
        "Segoe UI",
        Arial,
        sans-serif;
}

.page-container {
    width: 100%;
    min-height: 100vh;
    padding: 24px;
    box-sizing: border-box;
}

.maps-card {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
}

.maps-card h1 {
    margin: 0 0 8px;
    font-size: 24px;
}

.maps-card > p {
    margin: 0 0 16px;
    color: #374151;
    line-height: 1.5;
}

#maps-container {
    width: 100%;
    min-height: 600px;
}

.data-section {
    margin-top: 24px;
}

.data-section h2 {
    margin: 0 0 12px;
    font-size: 20px;
}

.table-wrapper {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

caption {
    padding: 0 0 12px;
    font-weight: 600;
    text-align: left;
}

th,
td {
    padding: 10px 12px;
    border: 1px solid #94a3b8;
    text-align: left;
}

thead th {
    color: #ffffff;
    background: #334155;
}

tbody th {
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

    .maps-card {
        padding: 12px;
    }

    #maps-container {
        min-height: 520px;
    }
}
```

### app.ts

```typescript
import {
    Bubble,
    DataLabel,
    Legend,
    Maps,
    MapsTooltip,
    Selection,
    Zoom,
    type LayerSettingsModel
} from '@syncfusion/ej2-maps';

import worldMap
    from './data/world-map.json';

Maps.Inject(
    Bubble,
    DataLabel,
    Legend,
    MapsTooltip,
    Selection,
    Zoom
);

interface CountryMetrics {
    country: string;
    population: number;
    engagement: number;
}

const countryMetrics:
    CountryMetrics[] = [
        {
            country:
                'United States of America',
            population:
                331900000,
            engagement:
                72
        },
        {
            country:
                'Brazil',
            population:
                214300000,
            engagement:
                54
        },
        {
            country:
                'India',
            population:
                1408000000,
            engagement:
                88
        },
        {
            country:
                'Australia',
            population:
                26000000,
            engagement:
                64
        },
        {
            country:
                'Canada',
            population:
                39000000,
            engagement:
                76
        }
    ];

const validateWorldMap = (
    value:
        unknown
): void => {
    if (
        typeof value !==
            'object' ||
        value ===
            null
    ) {
        throw new Error(
            'The world-map data must be an object.'
        );
    }

    const data =
        value as {
            type?: unknown;
            features?: unknown;
        };

    if (
        data.type !==
        'FeatureCollection'
    ) {
        throw new Error(
            'The world-map data must be a GeoJSON FeatureCollection.'
        );
    }

    if (
        !Array.isArray(
            data.features
        ) ||
        data.features.length === 0
    ) {
        throw new Error(
            'The world-map data does not contain features.'
        );
    }
};

const validateCountryMetrics = (
    data:
        CountryMetrics[]
): void => {
    const countryNames:
        Set<string> =
            new Set<string>();

    data.forEach(
        (
            item:
                CountryMetrics
        ): void => {
            const country:
                string =
                    item.country.trim();

            if (!country) {
                throw new Error(
                    'Every data item requires a country name.'
                );
            }

            if (
                countryNames.has(
                    country
                )
            ) {
                throw new Error(
                    'Duplicate country data: ' +
                    country
                );
            }

            if (
                !Number.isFinite(
                    item.population
                ) ||
                item.population < 0
            ) {
                throw new Error(
                    'Population for "' +
                    country +
                    '" must be a finite nonnegative number.'
                );
            }

            if (
                !Number.isFinite(
                    item.engagement
                ) ||
                item.engagement < 0 ||
                item.engagement > 100
            ) {
                throw new Error(
                    'Engagement for "' +
                    country +
                    '" must be between 0 and 100.'
                );
            }

            countryNames.add(
                country
            );
        }
    );
};

const renderMetricsTable = (
    data:
        CountryMetrics[]
): void => {
    const tableBody:
        HTMLTableSectionElement | null =
            document.getElementById(
                'metrics-table-body'
            ) as
                HTMLTableSectionElement |
                null;

    if (!tableBody) {
        return;
    }

    tableBody.replaceChildren();

    data.forEach(
        (
            item:
                CountryMetrics
        ): void => {
            const row:
                HTMLTableRowElement =
                    document.createElement(
                        'tr'
                    );

            const countryCell:
                HTMLTableCellElement =
                    document.createElement(
                        'th'
                    );

            countryCell.scope =
                'row';

            countryCell.textContent =
                item.country;

            const populationCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            populationCell.textContent =
                item.population
                    .toLocaleString();

            const engagementCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            engagementCell.textContent =
                item.engagement +
                '%';

            row.append(
                countryCell,
                populationCell,
                engagementCell
            );

            tableBody.appendChild(
                row
            );
        }
    );
};

validateWorldMap(
    worldMap
);

validateCountryMetrics(
    countryMetrics
);

renderMetricsTable(
    countryMetrics
);

const host:
    HTMLElement | null =
        document.getElementById(
            'maps-container'
        );

const statusElement:
    HTMLElement | null =
        document.getElementById(
            'maps-status'
        );

if (!host) {
    throw new Error(
        'The Maps host element "#maps-container" was not found.'
    );
}

const layers:
    LayerSettingsModel[] = [
        {
            shapeData:
                worldMap,

            dataSource:
                countryMetrics,

            shapePropertyPath:
                'name',

            shapeDataPath:
                'country',

            shapeSettings: {
                fill: '#e2e8f0',
                colorValuePath:
                    'population',

                colorMapping: [
                    {
                        from: 0,
                        to: 99999999,
                        color: '#dbeafe',
                        label:
                            'Below 100 million'
                    },
                    {
                        from: 100000000,
                        to: 499999999,
                        color: '#60a5fa',
                        label:
                            '100 to 499 million'
                    },
                    {
                        from: 500000000,
                        to: 2000000000,
                        color: '#1d4ed8',
                        label:
                            '500 million or more'
                    }
                ],

                border: {
                    color: '#64748b',
                    width: 0.5
                }
            },

            dataLabelSettings: {
                visible: true,
                labelPath:
                    'country',
                smartLabelMode:
                    'Trim',

                textStyle: {
                    fontFamily:
                        'Segoe UI',
                    size: '11px',
                    color: '#111827',
                    fontWeight: '500'
                }
            },

            tooltipSettings: {
                visible: true,
                valuePath:
                    'country'
            },

            bubbleSettings: [
                {
                    visible: true,
                    dataSource:
                        countryMetrics,
                    valuePath:
                        'population',
                    colorValuePath:
                        'engagement',
                    minRadius: 8,
                    maxRadius: 36,
                    opacity: 0.85,

                    border: {
                        color: '#1e3a8a',
                        width: 1
                    },

                    colorMapping: [
                        {
                            from: 0,
                            to: 39,
                            color: '#bfdbfe',
                            label:
                                'Low engagement'
                        },
                        {
                            from: 40,
                            to: 69,
                            color: '#60a5fa',
                            label:
                                'Moderate engagement'
                        },
                        {
                            from: 70,
                            to: 100,
                            color: '#1d4ed8',
                            label:
                                'High engagement'
                        }
                    ],

                    selectionSettings: {
                        enable: true,
                        enableMultiSelect:
                            false,
                        fill: '#facc15',
                        opacity: 1,

                        border: {
                            color: '#991b1b',
                            width: 2
                        }
                    },

                    tooltipSettings: {
                        visible: true,
                        valuePath:
                            'country'
                    }
                }
            ]
        }
    ];

const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        titleSettings: {
            text:
                'Country Population and Engagement'
        },

        zoomSettings: {
            enable: true,
            enablePanning: true,
            mouseWheelZoom: true,
            pinchZooming: true,
            minZoom: 1,
            maxZoom: 10,
            zoomFactor: 1
        },

        legendSettings: {
            visible: true,
            type: 'Layers',
            mode: 'Default',
            position: 'Bottom',
            alignment: 'Center',

            title: {
                text:
                    'Population range'
            }
        },

        layers,

        loaded:
            (): void => {
                if (statusElement) {
                    statusElement.textContent =
                        'The country visualization loaded successfully.';
                }
            }
    });

map.appendTo(
    host
);
```

## Complete JavaScript Example

Required structure:

```text
project/
|-- data/
|   |-- world-map.geojson
|-- index.html
```

Run the page through an HTTP server because it loads GeoJSON through `fetch()`.

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
        Maps Visualization Features
    </title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        html,
        body {
            margin: 0;
            min-height: 100%;
        }

        body {
            color: #111827;
            background: #f1f5f9;
            font-family:
                "Segoe UI",
                Arial,
                sans-serif;
        }

        .page-container {
            width: 100%;
            min-height: 100vh;
            padding: 24px;
            box-sizing: border-box;
        }

        .maps-card {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px;
            box-sizing: border-box;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
        }

        .maps-card h1 {
            margin: 0 0 8px;
            font-size: 24px;
        }

        .maps-card > p {
            margin: 0 0 16px;
            color: #374151;
            line-height: 1.5;
        }

        #maps-container {
            width: 100%;
            min-height: 600px;
        }

        .data-section {
            margin-top: 24px;
        }

        .data-section h2 {
            margin: 0 0 12px;
            font-size: 20px;
        }

        .table-wrapper {
            width: 100%;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        caption {
            padding: 0 0 12px;
            font-weight: 600;
            text-align: left;
        }

        th,
        td {
            padding: 10px 12px;
            border: 1px solid #94a3b8;
            text-align: left;
        }

        thead th {
            color: #ffffff;
            background: #334155;
        }

        tbody th {
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

            .maps-card {
                padding: 12px;
            }

            #maps-container {
                min-height: 520px;
            }
        }
    </style>
</head>

<body>
    <main class="page-container">
        <section
            class="maps-card"
            aria-labelledby="maps-heading"
            aria-describedby="maps-description"
        >
            <h1 id="maps-heading">
                Country Population and Engagement
            </h1>

            <p id="maps-description">
                Country fills represent population ranges.
                Bubble size represents population, and bubble color
                represents engagement.
            </p>

            <div id="maps-container"></div>

            <section
                class="data-section"
                aria-labelledby="data-heading"
            >
                <h2 id="data-heading">
                    Country metrics
                </h2>

                <div class="table-wrapper">
                    <table>
                        <caption>
                            Text equivalent of the country visualization
                        </caption>

                        <thead>
                            <tr>
                                <th scope="col">Country</th>
                                <th scope="col">Population</th>
                                <th scope="col">Engagement</th>
                            </tr>
                        </thead>

                        <tbody id="metrics-table-body"></tbody>
                    </table>
                </div>
            </section>

            <p
                id="maps-status"
                class="visually-hidden"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the visualization.
            </p>
        </section>
    </main>

    <script>
        var countryMetrics = [
            {
                country:
                    'United States of America',
                population:
                    331900000,
                engagement:
                    72
            },
            {
                country:
                    'Brazil',
                population:
                    214300000,
                engagement:
                    54
            },
            {
                country:
                    'India',
                population:
                    1408000000,
                engagement:
                    88
            },
            {
                country:
                    'Australia',
                population:
                    26000000,
                engagement:
                    64
            },
            {
                country:
                    'Canada',
                population:
                    39000000,
                engagement:
                    76
            }
        ];

        function validateWorldMap(
            worldMap
        ) {
            if (
                !worldMap ||
                typeof worldMap !==
                    'object'
            ) {
                throw new Error(
                    'The world-map data must be an object.'
                );
            }

            if (
                worldMap.type !==
                'FeatureCollection'
            ) {
                throw new Error(
                    'The world-map data must be a GeoJSON FeatureCollection.'
                );
            }

            if (
                !Array.isArray(
                    worldMap.features
                ) ||
                worldMap.features.length === 0
            ) {
                throw new Error(
                    'The world-map data does not contain features.'
                );
            }
        }

        function validateCountryMetrics(
            data
        ) {
            var countryNames =
                new Set();

            data.forEach(
                function (item) {
                    if (
                        typeof item.country !==
                            'string' ||
                        item.country
                            .trim()
                            .length === 0
                    ) {
                        throw new Error(
                            'Every data item requires a country name.'
                        );
                    }

                    if (
                        countryNames.has(
                            item.country
                        )
                    ) {
                        throw new Error(
                            'Duplicate country data: ' +
                            item.country
                        );
                    }

                    if (
                        !Number.isFinite(
                            item.population
                        ) ||
                        item.population < 0
                    ) {
                        throw new Error(
                            'Population for "' +
                            item.country +
                            '" must be a finite nonnegative number.'
                        );
                    }

                    if (
                        !Number.isFinite(
                            item.engagement
                        ) ||
                        item.engagement < 0 ||
                        item.engagement > 100
                    ) {
                        throw new Error(
                            'Engagement for "' +
                            item.country +
                            '" must be between 0 and 100.'
                        );
                    }

                    countryNames.add(
                        item.country
                    );
                }
            );
        }

        function renderMetricsTable(
            data
        ) {
            var tableBody =
                document.getElementById(
                    'metrics-table-body'
                );

            if (!tableBody) {
                return;
            }

            tableBody.replaceChildren();

            data.forEach(
                function (item) {
                    var row =
                        document.createElement(
                            'tr'
                        );

                    var countryCell =
                        document.createElement(
                            'th'
                        );

                    countryCell.scope =
                        'row';

                    countryCell.textContent =
                        item.country;

                    var populationCell =
                        document.createElement(
                            'td'
                        );

                    populationCell.textContent =
                        item.population
                            .toLocaleString();

                    var engagementCell =
                        document.createElement(
                            'td'
                        );

                    engagementCell.textContent =
                        item.engagement +
                        '%';

                    row.append(
                        countryCell,
                        populationCell,
                        engagementCell
                    );

                    tableBody.appendChild(
                        row
                    );
                }
            );
        }

        validateCountryMetrics(
            countryMetrics
        );

        renderMetricsTable(
            countryMetrics
        );

        var host =
            document.getElementById(
                'maps-container'
            );

        var statusElement =
            document.getElementById(
                'maps-status'
            );

        if (!host) {
            throw new Error(
                'The Maps host element "#maps-container" was not found.'
            );
        }

        fetch(
            './data/world-map.geojson'
        )
            .then(
                function (response) {
                    if (!response.ok) {
                        throw new Error(
                            'Unable to load the world-map file. ' +
                            'HTTP status: ' +
                            response.status
                        );
                    }

                    return response.json();
                }
            )
            .then(
                function (worldMap) {
                    validateWorldMap(
                        worldMap
                    );

                    var map =
                        new ej.maps.Maps({
                            width: '100%',
                            height: '600px',

                            titleSettings: {
                                text:
                                    'Country Population and Engagement'
                            },

                            zoomSettings: {
                                enable: true,
                                enablePanning: true,
                                mouseWheelZoom: true,
                                pinchZooming: true,
                                minZoom: 1,
                                maxZoom: 10,
                                zoomFactor: 1
                            },

                            legendSettings: {
                                visible: true,
                                type: 'Layers',
                                mode: 'Default',
                                position: 'Bottom',
                                alignment: 'Center',

                                title: {
                                    text:
                                        'Population range'
                                }
                            },

                            layers: [
                                {
                                    shapeData:
                                        worldMap,

                                    dataSource:
                                        countryMetrics,

                                    shapePropertyPath:
                                        'name',

                                    shapeDataPath:
                                        'country',

                                    shapeSettings: {
                                        fill:
                                            '#e2e8f0',
                                        colorValuePath:
                                            'population',

                                        colorMapping: [
                                            {
                                                from: 0,
                                                to: 99999999,
                                                color:
                                                    '#dbeafe',
                                                label:
                                                    'Below 100 million'
                                            },
                                            {
                                                from: 100000000,
                                                to: 499999999,
                                                color:
                                                    '#60a5fa',
                                                label:
                                                    '100 to 499 million'
                                            },
                                            {
                                                from: 500000000,
                                                to: 2000000000,
                                                color:
                                                    '#1d4ed8',
                                                label:
                                                    '500 million or more'
                                            }
                                        ],

                                        border: {
                                            color:
                                                '#64748b',
                                            width: 0.5
                                        }
                                    },

                                    dataLabelSettings: {
                                        visible: true,
                                        labelPath:
                                            'country',
                                        smartLabelMode:
                                            'Trim',

                                        textStyle: {
                                            fontFamily:
                                                'Segoe UI',
                                            size:
                                                '11px',
                                            color:
                                                '#111827',
                                            fontWeight:
                                                '500'
                                        }
                                    },

                                    tooltipSettings: {
                                        visible: true,
                                        valuePath:
                                            'country'
                                    },

                                    bubbleSettings: [
                                        {
                                            visible: true,
                                            dataSource:
                                                countryMetrics,
                                            valuePath:
                                                'population',
                                            colorValuePath:
                                                'engagement',
                                            minRadius: 8,
                                            maxRadius: 36,
                                            opacity: 0.85,

                                            border: {
                                                color:
                                                    '#1e3a8a',
                                                width: 1
                                            },

                                            colorMapping: [
                                                {
                                                    from: 0,
                                                    to: 39,
                                                    color:
                                                        '#bfdbfe',
                                                    label:
                                                        'Low engagement'
                                                },
                                                {
                                                    from: 40,
                                                    to: 69,
                                                    color:
                                                        '#60a5fa',
                                                    label:
                                                        'Moderate engagement'
                                                },
                                                {
                                                    from: 70,
                                                    to: 100,
                                                    color:
                                                        '#1d4ed8',
                                                    label:
                                                        'High engagement'
                                                }
                                            ],

                                            selectionSettings: {
                                                enable: true,
                                                enableMultiSelect:
                                                    false,
                                                fill:
                                                    '#facc15',
                                                opacity: 1,

                                                border: {
                                                    color:
                                                        '#991b1b',
                                                    width: 2
                                                }
                                            },

                                            tooltipSettings: {
                                                visible: true,
                                                valuePath:
                                                    'country'
                                            }
                                        }
                                    ]
                                }
                            ],

                            loaded:
                                function () {
                                    if (
                                        statusElement
                                    ) {
                                        statusElement.textContent =
                                            'The country visualization loaded successfully.';
                                    }
                                }
                        });

                    map.appendTo(
                        host
                    );
                }
            )
            .catch(
                function (error) {
                    console.error(
                        error
                    );

                    if (
                        statusElement
                    ) {
                        statusElement.textContent =
                            'The visualization could not be loaded. ' +
                            error.message;
                    }
                }
            );
    </script>
</body>
</html>
```

Run the JavaScript example through a local HTTP server:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## OpenStreetMap Polygon Example

This focused example renders a custom polygon overlay on an OpenStreetMap tile layer.

### TypeScript

```typescript
import {
    Maps,
    Polygon,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Polygon,
    Zoom
);

const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        centerPosition: {
            latitude: 37.6,
            longitude: -122.25
        },

        zoomSettings: {
            enable: true,
            enablePanning: true,
            zoomFactor: 8
        },

        layers: [
            {
                urlTemplate:
                    'https://tile.openstreetmap.org/level/tileX/tileY.png',

                polygonSettings: {
                    polygons: [
                        {
                            points: [
                                {
                                    latitude:
                                        37.9,
                                    longitude:
                                        -122.6
                                },
                                {
                                    latitude:
                                        37.9,
                                    longitude:
                                        -121.9
                                },
                                {
                                    latitude:
                                        37.3,
                                    longitude:
                                        -121.9
                                },
                                {
                                    latitude:
                                        37.3,
                                    longitude:
                                        -122.6
                                }
                            ],

                            fill:
                                '#dc2626',
                            opacity:
                                0.3,
                            borderColor:
                                '#991b1b',
                            borderWidth:
                                2,
                            borderOpacity:
                                1
                        }
                    ]
                }
            }
        ]
    });

map.appendTo(
    '#maps-container'
);
```

Required attribution:

```html
<p class="map-attribution">
    Map data © OpenStreetMap contributors
</p>
```

## Accessibility Guidance

1. Do not rely only on bubble size.

2. Do not rely only on shape or bubble color.

3. Use meaningful legend labels.

4. Provide a visible summary of the map's primary conclusion.

5. Provide a semantic table when users need exact values.

6. Ensure shape labels remain readable against mapped fills.

7. Measure final text-to-fill contrast.

8. Avoid red and green as the only category distinction.

9. Keep selected-bubble borders visible against both the bubble and map.

10. Do not make tooltip content the only source of essential information.

11. Avoid low-opacity mappings that make boundaries difficult to perceive.

12. Test shape labels at 200 percent and 400 percent browser zoom.

13. Ensure bubbles remain usable on touch devices.

14. Avoid excessive bubble overlap.

15. Use persistent text to explain what bubble size and color represent.

16. Preserve visible keyboard focus for application-owned controls.

17. Validate visualization behavior with screen readers and keyboard navigation.

## Performance Guidance

Performance depends on:

- Number of GeoJSON features.
- Coordinate precision.
- Geometry complexity.
- Number of bubbles.
- Number of labels.
- Number of color mappings.
- Tooltips.
- Legends.
- Templates.
- Browser and device.
- Update frequency.

Recommended practices:

- Reuse parsed GeoJSON objects.
- Avoid repeatedly downloading unchanged shape data.
- Reduce unnecessary coordinate precision where appropriate.
- Aggregate insignificant bubble values.
- Avoid excessive labels.
- Keep tooltip templates simple.
- Batch data changes.
- Call `refresh()` once after a complete update.
- Avoid logging every render event.
- Profile representative production data.
- Test on the slowest supported device.
- Destroy the Maps instance when its dynamic host is removed.

Cleanup:

```typescript
map.destroy();
```

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-maps is installed for TypeScript.
✅ Maps is imported.
✅ Bubble is imported and injected when bubbles are used.
✅ DataLabel is imported and injected when labels are visible.
✅ Legend is imported and injected when the legend is visible.
✅ MapsTooltip is imported and injected when tooltips are visible.
✅ Polygon is imported and injected when custom polygons are used.
✅ Selection is imported and injected when selection is enabled.
✅ Zoom is imported and injected when zooming or panning is enabled.
✅ Every injected module is imported.
✅ Unused optional modules are not injected.
✅ Global JavaScript does not call Maps.Inject.
✅ The global EJ2 bundle loads before application code.
✅ The CDN script URL ends in .min.js.
✅ The Maps host exists.
✅ The host ID matches the appendTo selector.
✅ The host has a measurable height.
✅ The world-map file exists for GeoJSON examples.
✅ The GeoJSON root type is FeatureCollection.
✅ The GeoJSON features collection is not empty.
✅ shapePropertyPath matches a GeoJSON feature property.
✅ shapeDataPath matches the application data.
✅ Field casing matches exactly.
✅ bubbleSettings is an array.
✅ Every active bubble entry has visible set to true.
✅ Bubble valuePath matches a numeric data field.
✅ Bubble colorValuePath matches the intended color field.
✅ Bubble values are finite and nonnegative.
✅ minRadius and maxRadius are finite.
✅ minRadius does not exceed maxRadius.
✅ colorMapping is singular.
✅ Numeric ranges use from and to.
✅ Exact categories use value.
✅ Ranges do not overlap.
✅ Range boundaries are finite.
✅ Values outside ranges have an intentional fallback fill.
✅ Data labels use dataLabelSettings.
✅ DataLabel is injected in TypeScript.
✅ labelPath matches shape or bound application data.
✅ Custom polygons use polygonSettings.polygons.
✅ Custom polygons contain at least three distinct points.
✅ Polygon latitudes are finite and between -90 and 90.
✅ Polygon longitudes are finite and between -180 and 180.
✅ Polygon opacity is between 0 and 1.
✅ Tooltip fields match the correct data source.
✅ Legend labels explain each visual encoding.
✅ Important information is not communicated only through color or size.
✅ Dynamic updates are validated and batched.
✅ Refresh is called once after complete updates.
✅ map.destroy() is called when a dynamic host is removed.
✅ No encoded HTML replaces executable markup.
✅ No rich-text anchors wrap URLs.
✅ No malformed .jsscript URL exists.
```

## Troubleshooting

### Bubbles Do Not Appear

Check:

- `Bubble` is imported and injected.
- `bubbleSettings` is an array.
- `visible` is true.
- `shapeData` exists.
- `shapePropertyPath` matches the GeoJSON.
- `shapeDataPath` matches the bubble data.
- `valuePath` exists.
- Bubble values are finite and nonnegative.
- `minRadius` and `maxRadius` are valid.

### Bubble Colors Do Not Apply

Check:

- `colorValuePath` exists.
- `colorMapping` is spelled correctly.
- Values fall inside configured ranges.
- Numeric values are not strings.
- Ranges do not overlap.
- Range boundaries are finite.

### Shape Colors Do Not Apply

Check:

```typescript
shapeSettings: {
    colorValuePath:
        'population',
    colorMapping: []
}
```

Also verify:

```text
shapePropertyPath
shapeDataPath
dataSource
```

### Shape Data Does Not Bind

Do not use:

```typescript
shapePropertyPath:
    'properties.name'
```

Use the actual GeoJSON feature-property name:

```typescript
shapePropertyPath:
    'name'
```

### Data Labels Do Not Appear

Import and inject `DataLabel`:

```typescript
import {
    DataLabel,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    DataLabel
);
```

Use:

```typescript
dataLabelSettings: {
    visible: true,
    labelPath:
        'country'
}
```

### Polygon Does Not Appear

Check:

- `Polygon` is imported and injected.
- `polygonSettings.polygons` is configured.
- The polygon contains at least three points.
- Coordinates are valid.
- Opacity is greater than zero.
- The polygon is inside the visible map region.
- The map is centered and zoomed appropriately.

### World Map Does Not Load

Check:

- The file path is correct.
- The filename casing matches.
- JSON is valid.
- The root type is `FeatureCollection`.
- The features array is not empty.
- JavaScript examples run through HTTP.
- TypeScript JSON imports are enabled.

### JavaScript Fetch Fails

Do not open the example through:

```text
file://
```

Run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Combined Mistakes and Future References

### Bubble Settings as an Object

Incorrect:

```typescript
bubbleSettings: {
    dataSource:
        bubbleData
}
```

Correct:

```typescript
bubbleSettings: [
    {
        visible: true,
        dataSource:
            bubbleData
    }
]
```

### Missing Bubble Visibility

Incorrect:

```typescript
bubbleSettings: [
    {
        dataSource:
            bubbleData,
        valuePath:
            'population'
    }
]
```

Correct:

```typescript
bubbleSettings: [
    {
        visible: true,
        dataSource:
            bubbleData,
        valuePath:
            'population'
    }
]
```

### Coordinate-Only Bubble Data on a Tile Layer

Avoid treating bubble settings as coordinate markers:

```typescript
bubbleSettings: [
    {
        dataSource: [
            {
                latitude:
                    37.7749,
                longitude:
                    -122.4194,
                population:
                    800000
            }
        ]
    }
]
```

Use markers for direct coordinate locations.

Use bubbles for data associated with GeoJSON shapes.

### Incorrect Color-Mapping Property

Incorrect:

```typescript
colorMappings: []
```

Correct:

```typescript
colorMapping: []
```

### Numeric Thresholds Using Value

Incorrect:

```typescript
colorMapping: [
    {
        value: 1000000,
        color: '#dbeafe'
    }
]
```

Correct range mapping:

```typescript
colorMapping: [
    {
        from: 0,
        to: 999999,
        color: '#dbeafe'
    }
]
```

### Unvalidated Infinity Boundary

Avoid:

```typescript
{
    from: 500000000,
    to: Infinity,
    color: '#1d4ed8'
}
```

Use a finite validated boundary:

```typescript
{
    from: 500000000,
    to: 2000000000,
    color: '#1d4ed8'
}
```

### Overlapping Color Ranges

Avoid:

```typescript
colorMapping: [
    {
        from: 0,
        to: 50,
        color: '#dbeafe'
    },
    {
        from: 50,
        to: 100,
        color: '#1d4ed8'
    }
]
```

For integer data, use clearly separated ranges:

```typescript
colorMapping: [
    {
        from: 0,
        to: 49,
        color: '#dbeafe'
    },
    {
        from: 50,
        to: 100,
        color: '#1d4ed8'
    }
]
```

### Unsupported Desaturation Flag

Avoid:

```typescript
desaturation:
    true
```

Use:

```typescript
colorMapping: [
    {
        from: 0,
        to: 100,
        color: '#2563eb',
        minOpacity: 0.35,
        maxOpacity: 1
    }
]
```

### Incorrect Shape Property Path

Incorrect:

```typescript
shapePropertyPath:
    'properties.name'
```

Correct:

```typescript
shapePropertyPath:
    'name'
```

### GeoJSON Shapes Confused with Polygon Overlays

GeoJSON shape layer:

```typescript
layers: [
    {
        shapeData:
            worldMap
    }
]
```

Custom polygon overlay:

```typescript
layers: [
    {
        polygonSettings: {
            polygons: [
                {
                    points: []
                }
            ]
        }
    }
]
```

These are different features.

### Unnecessary Geometry Type

Avoid:

```typescript
type:
    'Geometry'
```

unless the installed layer model explicitly requires it.

### Incorrect Data-Label Casing

Incorrect:

```typescript
datalabelSettings: {
    visible: true
}
```

Correct:

```typescript
dataLabelSettings: {
    visible: true
}
```

### Shape Data Labels Copied to Markers

Avoid:

```typescript
markerSettings: [
    {
        dataLabelSettings: {
            visible: true
        }
    }
]
```

Use a marker template when visible marker text is required.

### Shape Data Labels Copied to Bubbles

Avoid:

```typescript
bubbleSettings: [
    {
        dataLabelSettings: {
            visible: true
        }
    }
]
```

Use validated bubble tooltip, legend, annotation, or persistent application content.

### Undefined Geometry Import

Avoid:

```typescript
import * as usaGeometry
    from 'path/to/usa.json';
```

Download, validate, and import a real GeoJSON file.

### Unvalidated OSM and Shape-Layer Combination

Avoid combining unrelated layers without validating the base-layer and sublayer architecture:

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png'
    },
    {
        shapeData:
            worldMap
    },
    {
        markerSettings: [
            {}
        ]
    }
]
```

Use a focused GeoJSON visualization or a focused tile-layer visualization unless a validated sublayer scenario is required.

### Fixed Performance Thresholds

Avoid:

```text
Color mapping is always efficient for more than 100 regions.
Bubbles always become slow after 100 items.
```

Use representative application data and profile the target browsers and devices.

### Encoded Executable HTML

Incorrect:

```html
&lt;div id="maps-container"&gt;&lt;/div&gt;
```

Correct:

```html
<div id="maps-container"></div>
```

### Tile URL Wrapped in an Anchor

Incorrect:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/......</a>'
```

Correct:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/level/tileX/tileY.png'
```

### Malformed Script URL

Incorrect:

```text
https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.jsscript
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Editor-Generated Markup

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, templates, commands, or URLs:

```text
<a>
<strong data-lexical-text="true">
<br>
data-lexical-text
Editor-generated class names
```