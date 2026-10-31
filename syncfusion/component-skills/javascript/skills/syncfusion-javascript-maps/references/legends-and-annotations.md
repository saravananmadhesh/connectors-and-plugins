# Legends and Annotations in Maps

Legends explain the colors, ranges, sizes, and symbols used in a Maps visualization. Annotations place custom HTML content at positions relative to the Maps rendering area.

This guide provides complete framework-neutral TypeScript and JavaScript examples for:

- Shape legends.
- Default and Interactive legend modes.
- Docked and floating legend positions.
- Shape color mapping.
- Bubble and marker legends.
- Map-relative annotations.
- Shape, marker, and bubble tooltips.
- Local world-map GeoJSON loading.
- Runtime validation.
- Accessibility and troubleshooting.

- #required-modules
- #legend-configuration
  - #basic-legend
  - #legend-modes
  - #legend-positioning
  - #floating-legend
  - #legend-type
  - #legend-styling
  - #legend-toggle-behavior
- #shape-color-mapping-legend
- #bubble-legend
- #marker-legend
- #annotations
  - #basic-annotation
  - #annotation-template
  - #annotation-positioning
  - #multiple-annotations
  - #geographic-locations
- #tooltips
  - #shape-tooltips
  - #marker-tooltips
  - #bubble-tooltips
- #world-map-data-setup
  - #download-the-world-map-file
  - #validate-the-world-map-file
  - #import-the-world-map-in-typescript
- #complete-typescript-example
- #complete-javascript-example
- #accessibility-guidance
- #runtime-validation-checklist
- #troubleshooting
- #combined-mistakes-and-future-references

## Required Modules

TypeScript Maps features require their corresponding modules to be imported and injected before creating the Maps instance.

Feature mapping:

```text
Legend      -> Legend
Annotations -> Annotations
Tooltips    -> MapsTooltip
Markers     -> Marker
Bubbles     -> Bubble
Zooming     -> Zoom
```

Example:

```typescript
import {
    Annotations,
    Bubble,
    Legend,
    Maps,
    MapsTooltip,
    Marker,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Legend,
    Annotations,
    MapsTooltip,
    Marker,
    Bubble,
    Zoom
);
```

Only import and inject modules used by the example.

For a shape map with a legend, annotation, tooltip, and zooming:

```typescript
import {
    Annotations,
    Legend,
    Maps,
    MapsTooltip,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Legend,
    Annotations,
    MapsTooltip,
    Zoom
);
```

When using the complete global EJ2 JavaScript bundle, explicit module injection is not required.

## Legend Configuration

Enable the Maps legend through `legendSettings.visible`.

In a TypeScript module-based application, import and inject `Legend` first.

```typescript
import {
    Legend,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Legend
);
```

## Basic Legend

```typescript
const map: Maps =
    new Maps({
        legendSettings: {
            visible: true,
            mode: 'Default',
            position: 'Bottom',
            alignment: 'Center',

            title: {
                text: 'Population'
            }
        },

        layers
    });

map.appendTo(
    '#maps-container'
);
```

The legend title uses a title-settings object.

Incorrect:

```typescript
legendSettings: {
    title:
        'Population'
}
```

Correct:

```typescript
legendSettings: {
    title: {
        text:
            'Population'
    }
}
```

## Legend Modes

Maps supports Default and Interactive legend modes.

### Default Mode

Default mode displays legend symbols and their corresponding labels.

```typescript
legendSettings: {
    visible: true,
    mode: 'Default'
}
```

### Interactive Mode

Interactive mode displays an indicator that corresponds to the range of the map shape being interacted with.

```typescript
legendSettings: {
    visible: true,
    mode: 'Interactive',
    invertedPointer: false
}
```

Display the pointer on the opposite side:

```typescript
legendSettings: {
    visible: true,
    mode: 'Interactive',
    invertedPointer: true
}
```

Interactive mode does not automatically mean that clicking a legend item hides or displays an entire Maps layer.

Use the dedicated legend toggle settings when legend-item visibility changes are required.

## Legend Positioning

Maps legends can be docked using:

```text
Top
Bottom
Left
Right
```

The docked legend can be aligned using:

```text
Near
Center
Far
```

### Bottom-Left Equivalent

Use Bottom position with Near alignment:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    alignment: 'Near'
}
```

### Bottom-Right Equivalent

Use Bottom position with Far alignment:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    alignment: 'Far'
}
```

### Top-Center

```typescript
legendSettings: {
    visible: true,
    position: 'Top',
    alignment: 'Center'
}
```

### Right-Center

```typescript
legendSettings: {
    visible: true,
    position: 'Right',
    alignment: 'Center'
}
```

Do not use combined corner values such as:

```text
TopLeft
TopRight
BottomLeft
BottomRight
```

## Floating Legend

Use `Float` with a pixel-based location for absolute positioning.

```typescript
legendSettings: {
    visible: true,
    position: 'Float',

    location: {
        x: 30,
        y: 40
    }
}
```

Use responsive testing when applying a floating legend. A fixed location that works on a desktop can overlap map content on a smaller viewport.

## Legend Type

Use `legendSettings.type` to identify the Maps element represented by the legend.

Supported legend targets include:

```text
Layers
Bubbles
Markers
```

### Layer Legend

```typescript
legendSettings: {
    visible: true,
    type: 'Layers'
}
```

### Bubble Legend

```typescript
legendSettings: {
    visible: true,
    type: 'Bubbles'
}
```

### Marker Legend

```typescript
legendSettings: {
    visible: true,
    type: 'Markers'
}
```

The selected legend type must match the configured visualization.

## Legend Styling

```typescript
legendSettings: {
    visible: true,
    mode: 'Default',
    position: 'Bottom',
    alignment: 'Center',
    width: '500px',
    background: '#ffffff',
    opacity: 1,
    shapeWidth: 14,
    shapeHeight: 14,
    shapePadding: 8,

    title: {
        text: 'Population range'
    },

    border: {
        color: '#64748b',
        width: 1
    },

    textStyle: {
        color: '#111827',
        size: '13px',
        fontFamily: 'Segoe UI',
        fontWeight: '500'
    },

    titleStyle: {
        color: '#111827',
        size: '14px',
        fontFamily: 'Segoe UI',
        fontWeight: '600'
    }
}
```

Omit `height` when automatic legend height is sufficient.

Do not assume that this value is supported:

```typescript
height: 'auto'
```

Use a validated CSS-size string when an explicit height is required.

## Legend Toggle Behavior

Use `toggleVisibility` when legend items should control the visibility of their related map elements.

```typescript
legendSettings: {
    visible: true,
    mode: 'Default',
    type: 'Layers',
    toggleVisibility: true
}
```

This is separate from Interactive mode.

Do not describe Interactive mode as a complete show-or-hide layer mechanism.

## Shape Color Mapping Legend

A shape legend can be generated from `shapeSettings.colorMapping`.

The layer must bind the GeoJSON shape properties to the application data.

```typescript
interface CountryData {
    country: string;
    population: number;
}

const populationData:
    CountryData[] = [
        {
            country:
                'United States of America',
            population:
                331900000
        },
        {
            country:
                'Brazil',
            population:
                214300000
        },
        {
            country:
                'India',
            population:
                1408000000
        }
    ];
```

Layer configuration:

```typescript
layers: [
    {
        shapeData:
            worldMap,

        dataSource:
            populationData,

        shapePropertyPath:
            'name',

        shapeDataPath:
            'country',

        shapeSettings: {
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
        },

        tooltipSettings: {
            visible: true,
            valuePath:
                'country'
        }
    }
]
```

Legend configuration:

```typescript
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
}
```

The following fields must match exactly:

```text
GeoJSON property -> shapePropertyPath
Data-source field -> shapeDataPath
Numeric field    -> colorValuePath
```

Field names are case-sensitive.

## Bubble Legend

`bubbleSettings` is a collection on the Maps layer.

```typescript
interface BubbleData {
    country: string;
    population: number;
}

const bubbleData:
    BubbleData[] = [
        {
            country:
                'United States of America',
            population:
                331900000
        },
        {
            country:
                'Brazil',
            population:
                214300000
        },
        {
            country:
                'India',
            population:
                1408000000
        }
    ];
```

Bubble configuration:

```typescript
layers: [
    {
        shapeData:
            worldMap,

        shapePropertyPath:
            'name',

        bubbleSettings: [
            {
                visible: true,
                dataSource:
                    bubbleData,
                valuePath:
                    'population',
                colorValuePath:
                    'population',
                minRadius: 5,
                maxRadius: 30,

                tooltipSettings: {
                    visible: true,
                    valuePath:
                        'country'
                }
            }
        ]
    }
]
```

Legend configuration:

```typescript
legendSettings: {
    visible: true,
    type: 'Bubbles',

    title: {
        text:
            'Population'
    }
}
```

Required TypeScript modules:

```typescript
import {
    Bubble,
    Legend,
    Maps,
    MapsTooltip
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Bubble,
    Legend,
    MapsTooltip
);
```

## Marker Legend

`markerSettings` is a collection on the Maps layer.

```typescript
interface LocationData {
    name: string;
    category: string;
    latitude: number;
    longitude: number;
}

const locationData:
    LocationData[] = [
        {
            name:
                'San Francisco',
            category:
                'Office',
            latitude:
                37.7749,
            longitude:
                -122.4194
        },
        {
            name:
                'Sacramento',
            category:
                'Capital',
            latitude:
                38.5816,
            longitude:
                -121.4944
        }
    ];
```

Marker configuration:

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png',

        markerSettings: [
            {
                visible: true,
                dataSource:
                    locationData,
                latitudeValuePath:
                    'latitude',
                longitudeValuePath:
                    'longitude',
                colorValuePath:
                    'category',
                shapeValuePath:
                    'category',
                legendText:
                    'name',

                tooltipSettings: {
                    visible: true,
                    valuePath:
                        'name'
                }
            }
        ]
    }
]
```

Legend configuration:

```typescript
legendSettings: {
    visible: true,
    type: 'Markers',

    title: {
        text:
            'Locations'
    }
}
```

Required TypeScript modules:

```typescript
import {
    Legend,
    Maps,
    MapsTooltip,
    Marker,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Legend,
    MapsTooltip,
    Marker,
    Zoom
);
```

## Annotations

Annotations place custom content relative to the Maps rendering area.

They are suitable for:

- Explanatory notes.
- Map titles.
- Branding.
- Data-source notices.
- Static information panels.
- Nongeographic overlays.

Annotations use:

```text
content
x
y
horizontalAlignment
verticalAlignment
zIndex
```

They do not use latitude and longitude.

## Basic Annotation

```typescript
annotations: [
    {
        content:
            '<div class="maps-annotation">Population data</div>',
        x: '2%',
        y: '4%',
        horizontalAlignment:
            'Near',
        verticalAlignment:
            'Near',
        zIndex: '1'
    }
]
```

Required TypeScript module:

```typescript
import {
    Annotations,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Annotations
);
```

## Annotation Template

For nontrivial content, use an application-owned HTML template.

HTML:

```html
<script
    id="maps-annotation-template"
    type="text/x-template"
>
    <div class="maps-annotation">
        <strong>Population data</strong>
        <span>
            Values represent selected countries.
        </span>
    </div>
</script>
```

Maps configuration:

```typescript
annotations: [
    {
        content:
            '#maps-annotation-template',
        x: '2%',
        y: '4%',
        horizontalAlignment:
            'Near',
        verticalAlignment:
            'Near',
        zIndex: '1'
    }
]
```

CSS:

```css
.maps-annotation {
    display: grid;
    gap: 4px;
    max-width: 220px;
    padding: 10px 12px;
    color: #111827;
    background: rgb(255 255 255 / 95%);
    border: 1px solid #64748b;
    border-radius: 6px;
    box-shadow:
        0 2px 8px
        rgb(15 23 42 / 15%);
    font-family:
        "Segoe UI",
        sans-serif;
    font-size: 13px;
}
```

## Annotation Positioning

Annotations support pixel or percentage positions.

Percentage position:

```typescript
annotations: [
    {
        content:
            '#maps-annotation-template',
        x: '5%',
        y: '10%'
    }
]
```

Pixel position:

```typescript
annotations: [
    {
        content:
            '#maps-annotation-template',
        x: '40px',
        y: '60px'
    }
]
```

Supported alignments include:

```text
Near
Center
Far
None
```

Example:

```typescript
annotations: [
    {
        content:
            '#maps-annotation-template',
        x: '50%',
        y: '10%',
        horizontalAlignment:
            'Center',
        verticalAlignment:
            'Near',
        zIndex: '1'
    }
]
```

## Multiple Annotations

```typescript
annotations: [
    {
        content:
            '#maps-annotation-template',
        x: '2%',
        y: '4%',
        horizontalAlignment:
            'Near',
        verticalAlignment:
            'Near',
        zIndex: '1'
    },
    {
        content:
            '<div class="maps-source-note">' +
            'Source: application population dataset' +
            '</div>',
        x: '2%',
        y: '94%',
        horizontalAlignment:
            'Near',
        verticalAlignment:
            'Far',
        zIndex: '1'
    }
]
```

Keep annotation content short and ensure that it does not obscure important map shapes, markers, bubbles, labels, tooltips, or legend items.

## Geographic Locations

Do not use latitude and longitude in an annotation.

Incorrect:

```typescript
annotations: [
    {
        content:
            'San Francisco',
        latitude:
            37.7749,
        longitude:
            -122.4194
    }
]
```

Use a marker for geographic coordinates:

```typescript
markerSettings: [
    {
        visible: true,

        dataSource: [
            {
                name:
                    'San Francisco',
                latitude:
                    37.7749,
                longitude:
                    -122.4194
            }
        ],

        latitudeValuePath:
            'latitude',

        longitudeValuePath:
            'longitude',

        tooltipSettings: {
            visible: true,
            valuePath:
                'name'
        }
    }
]
```

## Tooltips

In TypeScript, import and inject `MapsTooltip` when any Maps tooltip is enabled.

```typescript
import {
    Maps,
    MapsTooltip
} from '@syncfusion/ej2-maps';

Maps.Inject(
    MapsTooltip
);
```

## Shape Tooltips

Shape tooltip settings belong at the layer level.

```typescript
layers: [
    {
        shapeData:
            worldMap,

        dataSource:
            populationData,

        shapePropertyPath:
            'name',

        shapeDataPath:
            'country',

        tooltipSettings: {
            visible: true,
            valuePath:
                'country'
        }
    }
]
```

Use a simple built-in tooltip first.

Validate all template fields against the layer data source before introducing a custom tooltip template.

## Marker Tooltips

Marker tooltip settings belong inside each marker settings entry.

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locationData,
        latitudeValuePath:
            'latitude',
        longitudeValuePath:
            'longitude',

        tooltipSettings: {
            visible: true,
            valuePath:
                'name'
        }
    }
]
```

## Bubble Tooltips

Bubble tooltip settings belong inside each bubble settings entry.

```typescript
bubbleSettings: [
    {
        visible: true,
        dataSource:
            bubbleData,
        valuePath:
            'population',
        minRadius: 5,
        maxRadius: 30,

        tooltipSettings: {
            visible: true,
            valuePath:
                'country'
        }
    }
]
```

## World Map Data Setup

A GeoJSON shape map requires a complete world-map file.

OpenStreetMap tile layers do not require a world-map file.

## Download the World Map File

Create the data directory:

```bash
mkdir -p src/data
```

Download the Natural Earth-derived country GeoJSON file:

```bash
curl -L "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" -o "src/data/world-map.geojson"
```

Using wget:

```bash
wget "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" -O "src/data/world-map.geojson"
```

Using PowerShell:

```powershell
Invoke-WebRequest `
  -Uri "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" `
  -OutFile "src/data/world-map.geojson"
```

Manual download address:

```text
https://datahub.io/core/geo-countries/_r/-/data/countries.geojson
```

Dataset information:

```text
https://github.com/datasets/geo-countries
```

Review the dataset license and suitability before redistributing it.

## Validate the World Map File

Create `scripts/validate-world-map.mjs`:

```javascript
import {
    readFile
} from 'node:fs/promises';

const path =
    'src/data/world-map.geojson';

const text =
    await readFile(
        path,
        'utf8'
    );

const worldMap =
    JSON.parse(
        text
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
    'The world-map GeoJSON file is valid.'
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

## Import the World Map in TypeScript

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

Import the data:

```typescript
import worldMap
    from './data/world-map.json';
```

If the project does not support JSON imports, convert the GeoJSON file into a TypeScript module using the conversion workflow from the Maps getting-started reference.

## Complete TypeScript Example

This example renders:

- A local world map.
- Population color mapping.
- A layer legend.
- Shape tooltips.
- A map-relative annotation.
- Zooming and panning.

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
        Maps Legends and Annotations
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
                Country Population Map
            </h1>

            <p id="maps-description">
                Selected countries are grouped into population
                ranges. Hover over a mapped country to view its name.
            </p>

            <div id="maps-container"></div>

            <p
                id="maps-status"
                class="visually-hidden"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the population map.
            </p>
        </section>
    </main>

    <script
        id="maps-annotation-template"
        type="text/x-template"
    >
        <div class="maps-annotation">
            <strong>Population ranges</strong>
            <span>
                Colors represent selected country populations.
            </span>
        </div>
    </script>

    ./<script scr="app.ts"></script>
</body>
</html>
```

The TypeScript source is compiled into `app.js` by the selected bundler or TypeScript build process.

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

.maps-annotation {
    display: grid;
    gap: 4px;
    max-width: 220px;
    padding: 10px 12px;
    color: #111827;
    background: rgb(255 255 255 / 95%);
    border: 1px solid #64748b;
    border-radius: 6px;
    box-shadow:
        0 2px 8px
        rgb(15 23 42 / 15%);
    font-size: 13px;
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
    Annotations,
    Legend,
    Maps,
    MapsTooltip,
    Zoom,
    type AnnotationModel,
    type LayerSettingsModel,
    type LegendSettingsModel
} from '@syncfusion/ej2-maps';

import worldMap
    from './data/world-map.json';

Maps.Inject(
    Legend,
    Annotations,
    MapsTooltip,
    Zoom
);

interface CountryPopulation {
    country: string;
    population: number;
}

const populationData:
    CountryPopulation[] = [
        {
            country:
                'United States of America',
            population:
                331900000
        },
        {
            country:
                'Brazil',
            population:
                214300000
        },
        {
            country:
                'India',
            population:
                1408000000
        },
        {
            country:
                'Australia',
            population:
                26000000
        },
        {
            country:
                'Canada',
            population:
                39000000
        }
    ];

const validateWorldMap = (
    data: unknown
): void => {
    if (
        typeof data !==
            'object' ||
        data === null
    ) {
        throw new Error(
            'The world-map data must be an object.'
        );
    }

    const geoJson =
        data as {
            type?: unknown;
            features?: unknown;
        };

    if (
        geoJson.type !==
        'FeatureCollection'
    ) {
        throw new Error(
            'The world-map data must be a GeoJSON FeatureCollection.'
        );
    }

    if (
        !Array.isArray(
            geoJson.features
        ) ||
        geoJson.features.length === 0
    ) {
        throw new Error(
            'The world-map GeoJSON does not contain features.'
        );
    }
};

const validatePopulationData = (
    data:
        CountryPopulation[]
): void => {
    data.forEach(
        (
            item:
                CountryPopulation
        ): void => {
            if (
                !item.country.trim()
            ) {
                throw new Error(
                    'Every population item requires a country name.'
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
        }
    );
};

validateWorldMap(
    worldMap
);

validatePopulationData(
    populationData
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

const legendSettings:
    LegendSettingsModel = {
        visible: true,
        type: 'Layers',
        mode: 'Default',
        position: 'Bottom',
        alignment: 'Center',
        background: '#ffffff',
        opacity: 1,
        shapeWidth: 14,
        shapeHeight: 14,
        shapePadding: 8,
        removeDuplicateLegend: true,

        title: {
            text:
                'Population range'
        },

        border: {
            color: '#64748b',
            width: 1
        },

        textStyle: {
            color: '#111827',
            size: '13px',
            fontFamily:
                'Segoe UI',
            fontWeight: '500'
        }
    };

const annotations:
    AnnotationModel[] = [
        {
            content:
                '#maps-annotation-template',
            x: '2%',
            y: '4%',
            horizontalAlignment:
                'Near',
            verticalAlignment:
                'Near',
            zIndex: '1'
        }
    ];

const layers:
    LayerSettingsModel[] = [
        {
            shapeData:
                worldMap,

            dataSource:
                populationData,

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

            tooltipSettings: {
                visible: true,
                valuePath:
                    'country'
            }
        }
    ];

const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        titleSettings: {
            text:
                'Selected Country Populations'
        },

        zoomSettings: {
            enable: true,
            enablePanning: true,
            minZoom: 1,
            maxZoom: 10,
            zoomFactor: 1
        },

        legendSettings,
        annotations,
        layers,

        loaded: (): void => {
            if (statusElement) {
                statusElement.textContent =
                    'The country population map loaded successfully.';
            }
        }
    });

map.appendTo(
    host
);
```

## Complete JavaScript Example

This example loads the world-map GeoJSON through `fetch()`.

Required structure:

```text
project/
|-- data/
|   |-- world-map.geojson
|-- index.html
```

Run the page through a local HTTP server.

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
        Maps Legends and Annotations
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

        .maps-annotation {
            display: grid;
            gap: 4px;
            max-width: 220px;
            padding: 10px 12px;
            color: #111827;
            background: rgb(255 255 255 / 95%);
            border: 1px solid #64748b;
            border-radius: 6px;
            box-shadow:
                0 2px 8px
                rgb(15 23 42 / 15%);
            font-size: 13px;
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
                Country Population Map
            </h1>

            <p id="maps-description">
                Selected countries are grouped into population
                ranges. Hover over a mapped country to view its name.
            </p>

            <div id="maps-container"></div>

            <p
                id="maps-status"
                class="visually-hidden"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the population map.
            </p>
        </section>
    </main>

    <script
        id="maps-annotation-template"
        type="text/x-template"
    >
        <div class="maps-annotation">
            <strong>Population ranges</strong>
            <span>
                Colors represent selected country populations.
            </span>
        </div>
    </script>

    <script>
        var populationData = [
            {
                country:
                    'United States of America',
                population:
                    331900000
            },
            {
                country:
                    'Brazil',
                population:
                    214300000
            },
            {
                country:
                    'India',
                population:
                    1408000000
            },
            {
                country:
                    'Australia',
                population:
                    26000000
            },
            {
                country:
                    'Canada',
                population:
                    39000000
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
                worldMap.features.length ===
                    0
            ) {
                throw new Error(
                    'The world-map GeoJSON does not contain features.'
                );
            }
        }

        function validatePopulationData(
            data
        ) {
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
                            'Every population item requires a country name.'
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
                }
            );
        }

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

        validatePopulationData(
            populationData
        );

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
                                    'Selected Country Populations'
                            },

                            zoomSettings: {
                                enable: true,
                                enablePanning: true,
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
                                background: '#ffffff',
                                opacity: 1,
                                shapeWidth: 14,
                                shapeHeight: 14,
                                shapePadding: 8,
                                removeDuplicateLegend: true,

                                title: {
                                    text:
                                        'Population range'
                                },

                                border: {
                                    color:
                                        '#64748b',
                                    width: 1
                                },

                                textStyle: {
                                    color:
                                        '#111827',
                                    size: '13px',
                                    fontFamily:
                                        'Segoe UI',
                                    fontWeight:
                                        '500'
                                }
                            },

                            annotations: [
                                {
                                    content:
                                        '#maps-annotation-template',
                                    x: '2%',
                                    y: '4%',
                                    horizontalAlignment:
                                        'Near',
                                    verticalAlignment:
                                        'Near',
                                    zIndex: '1'
                                }
                            ],

                            layers: [
                                {
                                    shapeData:
                                        worldMap,

                                    dataSource:
                                        populationData,

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

                                    tooltipSettings: {
                                        visible: true,
                                        valuePath:
                                            'country'
                                    }
                                }
                            ],

                            loaded:
                                function () {
                                    if (
                                        statusElement
                                    ) {
                                        statusElement.textContent =
                                            'The country population map loaded successfully.';
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
                            'The map could not be loaded. ' +
                            error.message;
                    }
                }
            );
    </script>
</body>
</html>
```

Start a local server:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Accessibility Guidance

1. Do not rely only on legend color.

2. Use meaningful legend labels:

```typescript
{
    from: 0,
    to: 99999999,
    color: '#dbeafe',
    label:
        'Below 100 million'
}
```

3. Provide a visible map heading and summary.

4. Use meaningful tooltip values.

5. Ensure annotation text remains readable against its background.

6. Measure the final text-to-fill contrast.

7. Avoid red and green as the only category distinction.

8. Keep annotations from covering essential map content.

9. Use a persistent text summary when the map communicates decision-critical data.

10. Do not make tooltip content the only source of important information.

11. Ensure the legend remains usable at browser zoom levels.

12. Test Interactive mode with keyboard and assistive technologies before relying on it.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-maps is installed for TypeScript.
✅ Maps is imported.
✅ Legend is imported and injected when the legend is visible.
✅ Annotations is imported and injected when annotations are used.
✅ MapsTooltip is imported and injected when a tooltip is visible.
✅ Marker is imported and injected when markerSettings is used.
✅ Bubble is imported and injected when bubbleSettings is used.
✅ Zoom is imported and injected when zooming is enabled.
✅ Every injected module is imported.
✅ Unused optional modules are not injected.
✅ Global JavaScript does not call Maps.Inject.
✅ The global EJ2 bundle loads before application code.
✅ The Maps host exists.
✅ The host ID matches the appendTo selector.
✅ The host has a measurable height.
✅ The world-map file exists for shape maps.
✅ The world-map root type is FeatureCollection.
✅ The GeoJSON features collection is not empty.
✅ ShapePropertyPath matches a GeoJSON property.
✅ ShapeDataPath matches an application data field.
✅ ColorValuePath matches a numeric data field.
✅ ColorMapping is singular, not colorMappings.
✅ Color ranges do not overlap.
✅ Color ranges use finite limits.
✅ Legend mode is Default or Interactive.
✅ Legend position is Top, Bottom, Left, Right, or Float.
✅ Legend alignment is Near, Center, or Far.
✅ Float position uses a valid location.
✅ Legend title uses a title-settings object.
✅ Legend type matches Layers, Bubbles, or Markers.
✅ bubbleSettings is an array.
✅ markerSettings is an array.
✅ Marker data includes latitude and longitude fields.
✅ Marker paths match the marker data.
✅ Annotations use x and y.
✅ Annotations do not use latitude and longitude.
✅ Annotation template selectors exist.
✅ Tooltip fields match the correct data source.
✅ OSM tile URLs are plain strings.
✅ OpenStreetMap attribution is visible when OSM is used.
✅ No mixed tile and shape configuration exists unintentionally.
✅ JavaScript GeoJSON loading runs through HTTP.
✅ Important information is not communicated only through color.
✅ No encoded HTML replaces executable markup.
✅ No rich-text anchor wraps a URL.
✅ Every CDN script URL ends in .min.js.
```

## Troubleshooting

### Legend Does Not Appear

Import and inject `Legend`:

```typescript
import {
    Legend,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Legend
);
```

Enable it:

```typescript
legendSettings: {
    visible: true
}
```

Ensure that the configured layer, bubble, or marker provides data from which legend items can be generated.

### Incorrect Legend Mode

Incorrect:

```typescript
mode:
    'List'
```

Correct:

```typescript
mode:
    'Default'
```

or:

```typescript
mode:
    'Interactive'
```

### Incorrect Legend Position

Incorrect:

```typescript
position:
    'BottomRight'
```

Correct:

```typescript
position:
    'Bottom',

alignment:
    'Far'
```

### Legend Title Does Not Render

Incorrect:

```typescript
title:
    'Population'
```

Correct:

```typescript
title: {
    text:
        'Population'
}
```

### Color Mapping Does Not Apply

Check:

- `shapeData` exists.
- `dataSource` exists.
- `shapePropertyPath` matches the GeoJSON property.
- `shapeDataPath` matches the application data field.
- `colorValuePath` matches the numeric field.
- `colorMapping` is spelled correctly.
- Values fall inside a configured range.

Correct property:

```typescript
colorMapping: []
```

Incorrect property:

```typescript
colorMappings: []
```

### Annotation Does Not Appear

Import and inject `Annotations`:

```typescript
import {
    Annotations,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Annotations
);
```

Check that:

- `content` is valid.
- A selector referenced by `content` exists.
- `x` and `y` are valid.
- The annotation is not behind another element.
- The annotation is not positioned outside the visible area.

### Geographic Annotation Is Misplaced

Annotations do not use map coordinates.

Use markers for latitude and longitude.

### Tooltip Does Not Appear

Import and inject `MapsTooltip`:

```typescript
import {
    Maps,
    MapsTooltip
} from '@syncfusion/ej2-maps';

Maps.Inject(
    MapsTooltip
);
```

Also ensure that the tooltip settings are placed at the correct level:

```text
Shape tooltip  -> Layer tooltipSettings
Marker tooltip -> Individual markerSettings entry
Bubble tooltip -> Individual bubbleSettings entry
```

### Marker Does Not Appear

Check:

- `Marker` is injected.
- `markerSettings` is an array.
- `visible` is true.
- Latitude and longitude paths are configured.
- Data fields match the paths.
- Numeric coordinates are valid.

### Bubble Does Not Appear

Check:

- `Bubble` is injected.
- `bubbleSettings` is an array.
- `visible` is true.
- `valuePath` matches the data.
- Values are finite and nonnegative.
- The shape-binding properties are valid.

### World Map Is Undefined

Do not leave:

```typescript
shapeData:
    usaGeometry
```

unless `usaGeometry` is imported or defined.

Download the world-map file:

```text
https://datahub.io/core/geo-countries/_r/-/data/countries.geojson
```

Then import or fetch it.

### GeoJSON Fetch Fails

Do not open the page through:

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

### Legend or Annotation Covers the Map

Try:

- Docking the legend at Bottom.
- Reducing annotation width.
- Moving the annotation with `x` and `y`.
- Increasing Maps margins.
- Hiding nonessential content on smaller screens.
- Testing at multiple viewport sizes.

## Combined Mistakes and Future References

### Unsupported List Legend Mode

Incorrect:

```typescript
mode:
    'List'
```

Correct:

```typescript
mode:
    'Default'
```

### Unsupported Corner Position

Incorrect:

```typescript
position:
    'TopRight'
```

Correct:

```typescript
position:
    'Top',

alignment:
    'Far'
```

### Plain-String Legend Title

Incorrect:

```typescript
title:
    'Population'
```

Correct:

```typescript
title: {
    text:
        'Population'
}
```

### Incorrect Color Mapping Property

Incorrect:

```typescript
shapeSettings: {
    colorMappings: []
}
```

Correct:

```typescript
shapeSettings: {
    colorMapping: []
}
```

### Missing Color Value Path

Incorrect:

```typescript
shapeSettings: {
    colorMapping: [
        {
            from: 0,
            to: 100,
            color: '#2563eb'
        }
    ]
}
```

Correct:

```typescript
shapeSettings: {
    colorValuePath:
        'value',

    colorMapping: [
        {
            from: 0,
            to: 100,
            color: '#2563eb'
        }
    ]
}
```

### Overlapping Ranges

Avoid ambiguous boundaries:

```typescript
colorMapping: [
    {
        from: 0,
        to: 100,
        color: '#dbeafe'
    },
    {
        from: 100,
        to: 200,
        color: '#2563eb'
    }
]
```

Use clearly separated integer ranges when the data is integer-based:

```typescript
colorMapping: [
    {
        from: 0,
        to: 99,
        color: '#dbeafe'
    },
    {
        from: 100,
        to: 200,
        color: '#2563eb'
    }
]
```

### Infinity in a Color Range

Avoid:

```typescript
{
    from: 5000000,
    to: Infinity,
    color: '#dc2626'
}
```

Use a finite upper bound based on validated data:

```typescript
{
    from: 5000000,
    to: 2000000000,
    color: '#dc2626'
}
```

### Bubble Settings as an Object

Incorrect:

```typescript
bubbleSettings: {
    visible: true,
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

### Marker Settings as an Object

Incorrect:

```typescript
markerSettings: {
    visible: true,
    dataSource:
        locationData
}
```

Correct:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locationData
    }
]
```

### Annotation with Latitude and Longitude

Incorrect:

```typescript
annotations: [
    {
        content:
            'San Francisco',
        latitude:
            37.7749,
        longitude:
            -122.4194
    }
]
```

Use a marker:

```typescript
markerSettings: [
    {
        visible: true,

        dataSource: [
            {
                name:
                    'San Francisco',
                latitude:
                    37.7749,
                longitude:
                    -122.4194
            }
        ],

        latitudeValuePath:
            'latitude',

        longitudeValuePath:
            'longitude'
    }
]
```

### Missing Annotation Module

Incorrect:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';

const map: Maps =
    new Maps({
        annotations: [
            {
                content:
                    'Population'
            }
        ]
    });
```

Correct:

```typescript
import {
    Annotations,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Annotations
);
```

### Missing Legend Module

Incorrect:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';

const map: Maps =
    new Maps({
        legendSettings: {
            visible: true
        }
    });
```

Correct:

```typescript
import {
    Legend,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Legend
);
```

### Missing Tooltip Module

Incorrect:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';

const map: Maps =
    new Maps({
        layers: [
            {
                tooltipSettings: {
                    visible: true
                }
            }
        ]
    });
```

Correct:

```typescript
import {
    Maps,
    MapsTooltip
} from '@syncfusion/ej2-maps';

Maps.Inject(
    MapsTooltip
);
```

### Tooltip at the Wrong Level

Incorrect marker configuration:

```typescript
layers: [
    {
        markerSettings: [
            {
                visible: true
            }
        ],

        tooltipSettings: {
            valuePath:
                'markerName'
        }
    }
]
```

Correct:

```typescript
markerSettings: [
    {
        visible: true,

        tooltipSettings: {
            visible: true,
            valuePath:
                'markerName'
        }
    }
]
```

### Assuming Interactive Mode Toggles Layers

Incorrect statement:

```text
Interactive mode allows users to click legend items
to hide or display entire layers.
```

Correct guidance:

```text
Interactive mode displays an indicator for the corresponding
legend range during map interaction. Use toggleVisibility when
related map elements must be toggled through the legend.
```

### Mixing OSM and Shape Data Incorrectly

Avoid:

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png',
        shapeData:
            worldMap,
        shapeSettings: {
            colorMapping: []
        }
    }
]
```

Use a focused tile layer:

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png'
    }
]
```

Or a focused GeoJSON shape layer:

```typescript
layers: [
    {
        shapeData:
            worldMap
    }
]
```

Configure validated sublayers separately when both rendering strategies are required.

### Incorrect Maps Center Property

Incorrect:

```typescript
center: {
    latitude: 37.7749,
    longitude: -122.4194
}
```

Correct:

```typescript
centerPosition: {
    latitude: 37.7749,
    longitude: -122.4194
}
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

### Undefined Application Data

Do not leave undefined identifiers:

```typescript
shapeData:
    usaGeometry,

dataSource:
    stateData
```

Define, import, fetch, or provide exact download instructions for every required data source.

### Encoded Annotation HTML

Do not use encoded executable content:

```typescript
content:
    '&lt;div&gt;Population&lt;/div&gt;'
```

Use actual HTML:

```typescript
content:
    '<div>Population</div>'
```

Or use a template selector:

```typescript
content:
    '#maps-annotation-template'
```

### Malformed Script URL

Incorrect:

```text
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.jsscript"></script>
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Editor-Generated Markup

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, commands, templates, or URLs:

```text
<a>
<strong data-lexical-text="true">
<br>
data-lexical-text
Editor-generated class names
```