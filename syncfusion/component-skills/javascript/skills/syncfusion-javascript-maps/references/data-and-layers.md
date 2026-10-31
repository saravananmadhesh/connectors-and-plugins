# Data and Layers in Maps

Layers are the primary rendering units in the Syncfusion EJ2 Maps component. A layer can display an online tile provider, GeoJSON shapes, markers, bubbles, navigation lines, polygons, labels, or a validated combination of these features.

Maps supports a main layer and overlay sublayers. Sublayers are configured with `type: 'SubLayer'` and can display additional geographic information over the main layer.

- #required-modules
- #layers-overview
- #layer-types
  - #online-tile-provider-layer
  - #geojson-shape-layer
  - #sublayer
- #openstreetmap-layer
- #bing-maps-layer
- #geojson-data-setup
  - #download-the-world-map
  - #validate-the-world-map
  - #import-geojson-in-typescript
- #data-binding-patterns
  - #marker-data-binding
  - #bubble-data-binding
  - #shape-data-binding
- #working-with-multiple-layers
  - #main-layer-and-sublayers
  - #base-layer-index
  - #layer-visibility
  - #safe-layer-updates
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #performance-and-accessibility
- #troubleshooting
- #combined-mistakes-and-future-references

## Required Modules

TypeScript Maps features require their corresponding modules to be imported and injected before creating the Maps instance.

```text
Markers          -> Marker
Bubbles          -> Bubble
Tooltips         -> MapsTooltip
Zoom and panning -> Zoom
Data labels      -> DataLabel
Legend           -> Legend
Selection        -> Selection
Navigation lines -> NavigationLine
Polygons         -> Polygon
```

Example for a GeoJSON layer with markers, bubbles, labels, tooltips, a legend, selection, and zooming:

```typescript
import {
    Bubble,
    DataLabel,
    Legend,
    Maps,
    MapsTooltip,
    Marker,
    Selection,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Bubble,
    DataLabel,
    Legend,
    MapsTooltip,
    Marker,
    Selection,
    Zoom
);
```

Only import and inject modules used by the example.

The complete global EJ2 JavaScript bundle does not require explicit `Maps.Inject(...)` calls.

## Layers Overview

The `layers` property contains the Maps layer collection.

```typescript
const map: Maps =
    new Maps({
        layers: [
            {
                // Main layer
            },
            {
                type: 'SubLayer'

                // Overlay layer
            }
        ]
    });

map.appendTo(
    '#maps-container'
);
```

A layer can contain:

```text
urlTemplate
shapeData
dataSource
shapePropertyPath
shapeDataPath
shapeSettings
markerSettings
bubbleSettings
navigationLineSettings
polygonSettings
dataLabelSettings
tooltipSettings
selectionSettings
highlightSettings
visible
type
```

Do not assume that every visualization should be placed in a separate layer.

For example, markers can be configured directly inside an OpenStreetMap tile layer:

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
                    'longitude'
            }
        ]
    }
]
```

## Layer Types

## Online Tile Provider Layer

A tile-provider layer uses `urlTemplate`.

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png'
    }
]
```

Use a tile-provider layer for:

- OpenStreetMap.
- Bing Maps.
- Azure Maps.
- Custom tile providers.
- Other validated tile services.

A tile-provider layer does not require GeoJSON `shapeData`.

## GeoJSON Shape Layer

A GeoJSON layer uses `shapeData`.

```typescript
layers: [
    {
        shapeData:
            worldMap,

        shapeSettings: {
            fill: '#dbeafe',

            border: {
                color: '#64748b',
                width: 0.5
            }
        }
    }
]
```

Use a GeoJSON shape layer for:

- Countries.
- States.
- Provinces.
- Districts.
- Administrative boundaries.
- Custom geographic shapes.
- Shape color mapping.
- Shape selection.
- Shape labels.
- Region-bound bubbles.

The Maps component supports GeoJSON geographic data and multiple layers.

Do not add:

```typescript
type:
    'Geometry'
```

unless the installed `LayerType` model explicitly requires it for the selected scenario.

## Sublayer

Use `type: 'SubLayer'` for an overlay shape layer.

```typescript
layers: [
    {
        shapeData:
            countryMap,

        shapeSettings: {
            fill: '#e2e8f0'
        }
    },
    {
        type: 'SubLayer',
        shapeData:
            stateBoundary,

        shapeSettings: {
            fill:
                'rgb(37 99 235 / 25%)',

            border: {
                color: '#2563eb',
                width: 1
            }
        }
    }
]
```

A sublayer can display shapes and supplementary visualization features over the main layer.

Use sublayers when rendering:

- State boundaries over a country.
- Rivers over administrative regions.
- Service areas over a base shape map.
- Highlighted territories.
- Additional GeoJSON overlays.

Do not use `SubLayer` merely to separate marker or bubble code without a valid layering requirement.

## OpenStreetMap Layer

Use a plain OpenStreetMap tile URL:

```typescript
const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        centerPosition: {
            latitude: 37.7749,
            longitude: -122.4194
        },

        zoomSettings: {
            enable: true,
            enablePanning: true,
            zoomFactor: 5
        },

        layers: [
            {
                urlTemplate:
                    'https://tile.openstreetmap.org/level/tileX/tileY.png'
            }
        ]
    });

map.appendTo(
    '#maps-container'
);
```

Do not use:

```typescript
type:
    'OSM'
```

unless it is required by the installed layer model.

Do not wrap the URL in rich-text anchor markup.

Display visible attribution:

```html
<p class="map-attribution">
    Map data © OpenStreetMap contributors
</p>
```

Review the current OpenStreetMap tile usage and attribution requirements before production deployment.

## Bing Maps Layer

Do not assign the Bing metadata endpoint directly to `urlTemplate`.

Use `getBingUrlTemplate()` to resolve the metadata response into a valid tile URL.

```typescript
import {
    Maps,
    type ILoadEventArgs
} from '@syncfusion/ej2-maps';

const bingMapsKey:
    string =
        'YOUR_AUTHORIZED_BING_MAPS_KEY';

const imageryType:
    string =
        'Road';

const metadataUrl:
    string =
        'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/' +
        imageryType +
        '?output=json&uriScheme=https&key=' +
        encodeURIComponent(
            bingMapsKey
        );

const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        load: (
            args:
                ILoadEventArgs
        ): void => {
            args.maps
                .getBingUrlTemplate(
                    metadataUrl
                )
                .then(
                    (
                        tileUrl:
                            string
                    ): void => {
                        args.maps
                            .layers[0]
                            .urlTemplate =
                                tileUrl;
                    }
                )
                .catch(
                    (
                        error:
                            unknown
                    ): void => {
                        console.error(
                            'Unable to resolve the Bing Maps tile URL.',
                            error
                        );
                    }
                );
        },

        layers: [
            {}
        ]
    });

map.appendTo(
    '#maps-container'
);
```

Validate the exact load-event model exported by the installed package.

Common imagery types include:

```text
Aerial
AerialWithLabel
Road
CanvasDark
CanvasLight
CanvasGray
```

Do not store production provider keys in public source control.

## GeoJSON Data Setup

A GeoJSON shape layer requires complete shape data.

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

Review the dataset license before redistribution.

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

## Import GeoJSON in TypeScript

Rename the file:

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

Import it:

```typescript
import worldMap
    from './data/world-map.json';
```

If the project does not support JSON imports, convert the GeoJSON file into a TypeScript module.

## Data Binding Patterns

## Marker Data Binding

Markers represent coordinate-based locations.

Define the application data:

```typescript
interface LocationData {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

const locationData:
    LocationData[] = [
        {
            id:
                'san-francisco',
            name:
                'San Francisco',
            latitude:
                37.7749,
            longitude:
                -122.4194
        },
        {
            id:
                'los-angeles',
            name:
                'Los Angeles',
            latitude:
                34.0522,
            longitude:
                -118.2437
        },
        {
            id:
                'new-york',
            name:
                'New York',
            latitude:
                40.7128,
            longitude:
                -74.006
        }
    ];
```

Place `markerSettings` inside the layer as an array:

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
                    'longitude'
            }
        ]
    }
]
```

Import and inject `Marker`:

```typescript
import {
    Maps,
    Marker
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Marker
);
```

Each location should contain:

- A nonempty unique ID.
- A meaningful name.
- A finite latitude from `-90` to `90`.
- A finite longitude from `-180` to `180`.

## Bubble Data Binding

Bubbles are associated with GeoJSON shapes.

They are not direct latitude-and-longitude markers.

```typescript
interface CountryMetrics {
    country: string;
    population: number;
}

const countryMetrics:
    CountryMetrics[] = [
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

Configure valid shape binding:

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

Import and inject `Bubble`:

```typescript
import {
    Bubble,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Bubble
);
```

Do not configure `bubbleSettings` as an object.

## Shape Data Binding

Bind application data to GeoJSON shapes through:

```text
shapePropertyPath
shapeDataPath
```

Example data:

```typescript
interface RegionData {
    country: string;
    value: number;
}

const regionData:
    RegionData[] = [
        {
            country:
                'United States of America',
            value:
                82
        },
        {
            country:
                'Brazil',
            value:
                56
        },
        {
            country:
                'India',
            value:
                91
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
            regionData,

        shapePropertyPath:
            'name',

        shapeDataPath:
            'country',

        shapeSettings: {
            fill: '#e2e8f0',
            colorValuePath:
                'value',

            colorMapping: [
                {
                    from: 0,
                    to: 39,
                    color: '#dbeafe'
                },
                {
                    from: 40,
                    to: 69,
                    color: '#60a5fa'
                },
                {
                    from: 70,
                    to: 100,
                    color: '#1d4ed8'
                }
            ]
        }
    }
]
```

Use:

```typescript
shapePropertyPath:
    'name'
```

Do not use:

```typescript
shapePropertyPath:
    'properties.name'
```

The property name must match the GeoJSON feature property.

## Working with Multiple Layers

## Main Layer and Sublayers

Use one main shape layer and validated overlay sublayers.

```typescript
const layers:
    LayerSettingsModel[] = [
        {
            shapeData:
                worldMap,

            shapeSettings: {
                fill: '#e2e8f0',

                border: {
                    color: '#64748b',
                    width: 0.5
                }
            }
        },
        {
            type: 'SubLayer',
            shapeData:
                overlayGeoJson,

            shapeSettings: {
                fill:
                    'rgb(37 99 235 / 30%)',

                border: {
                    color: '#2563eb',
                    width: 1
                }
            }
        }
    ];
```

A sublayer overlays the main layer and can display additional geographic shapes and visual features.

Do not create empty geometry layers merely to hold markers.

For a tile map, markers can remain in the tile layer:

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
                    'longitude'
            }
        ]
    }
]
```

## Base Layer Index

`baseLayerIndex` identifies the active main layer when multiple main layers are configured for scenarios such as drill-down or alternate layer views.

```typescript
const map: Maps =
    new Maps({
        baseLayerIndex: 0,

        layers: [
            {
                shapeData:
                    worldMap
            },
            {
                shapeData:
                    countryMap
            }
        ]
    });
```

Do not confuse `baseLayerIndex` with sublayer visibility.

## Layer Visibility

Toggle a layer through its `visible` property.

```typescript
const setLayerVisibility = (
    layerIndex:
        number,
    visible:
        boolean
): void => {
    const layer =
        map.layers[
            layerIndex
        ];

    if (!layer) {
        throw new Error(
            'The layer index is outside the Maps layer collection.'
        );
    }

    layer.visible =
        visible;

    map.refresh();
};
```

Hide a layer:

```typescript
setLayerVisibility(
    1,
    false
);
```

Show a layer:

```typescript
setLayerVisibility(
    1,
    true
);
```

Avoid calling `refresh()` more than once for a group of related updates.

## Safe Layer Updates

Do not assign marker data to the layer-level `dataSource`.

Incorrect:

```typescript
map.layers[0]
    .dataSource =
        newMarkerData;
```

Marker data belongs inside a marker-settings entry:

```typescript
map.layers[0]
    .markerSettings[0]
    .dataSource =
        nextLocations;
```

Shape-binding data belongs at layer level:

```typescript
map.layers[0]
    .dataSource =
        nextRegionData;
```

Bubble data belongs inside a bubble-settings entry:

```typescript
map.layers[0]
    .bubbleSettings[0]
    .dataSource =
        nextBubbleData;
```

Batch related changes:

```typescript
const updateLayerData = (
    nextRegionData:
        RegionData[],
    nextLocations:
        LocationData[]
): void => {
    validateRegionData(
        nextRegionData
    );

    validateLocations(
        nextLocations
    );

    map.layers[0]
        .dataSource =
            nextRegionData;

    map.layers[0]
        .markerSettings[0]
        .dataSource =
            nextLocations;

    map.refresh();
};
```

## Complete TypeScript Example

This example renders:

- A local world-map GeoJSON layer.
- Shape data binding.
- Shape color mapping.
- Region-bound bubbles.
- Coordinate-based markers.
- Labels and tooltips.
- A legend.
- Zooming and panning.
- Runtime validation.
- A semantic data table.

### Data Setup

```bash
mkdir -p src/data
curl -L "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" -o "src/data/world-map.json"
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
        Maps Data and Layers
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
                Country Metrics
            </h1>

            <p id="maps-description">
                Country colors and bubbles represent regional values.
                Markers identify selected office locations.
            </p>

            <div id="maps-container"></div>

            <section
                class="data-section"
                aria-labelledby="data-heading"
            >
                <h2 id="data-heading">
                    Regional values
                </h2>

                <div class="table-wrapper">
                    <table>
                        <caption>
                            Text equivalent of the regional data
                        </caption>

                        <thead>
                            <tr>
                                <th scope="col">Country</th>
                                <th scope="col">Value</th>
                                <th scope="col">Population</th>
                            </tr>
                        </thead>

                        <tbody id="region-table-body"></tbody>
                    </table>
                </div>
            </section>

            <p
                id="maps-status"
                class="visually-hidden"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the map.
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
}

.maps-card > p {
    margin: 0 0 16px;
    line-height: 1.5;
}

#maps-container {
    width: 100%;
    min-height: 600px;
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
    Marker,
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
    Marker,
    Selection,
    Zoom
);

interface RegionData {
    country: string;
    value: number;
    population: number;
}

interface LocationData {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

const regionData:
    RegionData[] = [
        {
            country:
                'United States of America',
            value: 82,
            population:
                331900000
        },
        {
            country:
                'Brazil',
            value: 56,
            population:
                214300000
        },
        {
            country:
                'India',
            value: 91,
            population:
                1408000000
        },
        {
            country:
                'Australia',
            value: 64,
            population:
                26000000
        },
        {
            country:
                'Canada',
            value: 76,
            population:
                39000000
        }
    ];

const locationData:
    LocationData[] = [
        {
            id:
                'san-francisco',
            name:
                'San Francisco',
            latitude:
                37.7749,
            longitude:
                -122.4194
        },
        {
            id:
                'mumbai',
            name:
                'Mumbai',
            latitude:
                19.076,
            longitude:
                72.8777
        },
        {
            id:
                'sydney',
            name:
                'Sydney',
            latitude:
                -33.8688,
            longitude:
                151.2093
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

const validateRegionData = (
    data:
        RegionData[]
): void => {
    const countries:
        Set<string> =
            new Set<string>();

    data.forEach(
        (
            item:
                RegionData
        ): void => {
            if (
                !item.country.trim()
            ) {
                throw new Error(
                    'Every region requires a country name.'
                );
            }

            if (
                countries.has(
                    item.country
                )
            ) {
                throw new Error(
                    'Duplicate region data: ' +
                    item.country
                );
            }

            if (
                !Number.isFinite(
                    item.value
                )
            ) {
                throw new Error(
                    'The value for "' +
                    item.country +
                    '" must be finite.'
                );
            }

            if (
                !Number.isFinite(
                    item.population
                ) ||
                item.population < 0
            ) {
                throw new Error(
                    'The population for "' +
                    item.country +
                    '" must be finite and nonnegative.'
                );
            }

            countries.add(
                item.country
            );
        }
    );
};

const validateLocations = (
    data:
        LocationData[]
): void => {
    const ids:
        Set<string> =
            new Set<string>();

    data.forEach(
        (
            item:
                LocationData
        ): void => {
            if (
                !item.id.trim() ||
                ids.has(
                    item.id
                )
            ) {
                throw new Error(
                    'Every marker requires a unique nonempty ID.'
                );
            }

            if (
                !Number.isFinite(
                    item.latitude
                ) ||
                item.latitude < -90 ||
                item.latitude > 90
            ) {
                throw new Error(
                    'Invalid latitude for "' +
                    item.name +
                    '".'
                );
            }

            if (
                !Number.isFinite(
                    item.longitude
                ) ||
                item.longitude < -180 ||
                item.longitude > 180
            ) {
                throw new Error(
                    'Invalid longitude for "' +
                    item.name +
                    '".'
                );
            }

            ids.add(
                item.id
            );
        }
    );
};

const renderRegionTable = (
    data:
        RegionData[]
): void => {
    const tableBody:
        HTMLTableSectionElement | null =
            document.getElementById(
                'region-table-body'
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
                RegionData
        ): void => {
            const row:
                HTMLTableRowElement =
                    document.createElement(
                        'tr'
                    );

            const country:
                HTMLTableCellElement =
                    document.createElement(
                        'th'
                    );

            country.scope =
                'row';

            country.textContent =
                item.country;

            const value:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            value.textContent =
                String(
                    item.value
                );

            const population:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            population.textContent =
                item.population
                    .toLocaleString();

            row.append(
                country,
                value,
                population
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

validateRegionData(
    regionData
);

validateLocations(
    locationData
);

renderRegionTable(
    regionData
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
                regionData,

            shapePropertyPath:
                'name',

            shapeDataPath:
                'country',

            shapeSettings: {
                fill: '#e2e8f0',
                colorValuePath:
                    'value',

                colorMapping: [
                    {
                        from: 0,
                        to: 39,
                        color: '#dbeafe',
                        label:
                            'Low'
                    },
                    {
                        from: 40,
                        to: 69,
                        color: '#60a5fa',
                        label:
                            'Moderate'
                    },
                    {
                        from: 70,
                        to: 100,
                        color: '#1d4ed8',
                        label:
                            'High'
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
                    color: '#111827',
                    size: '11px',
                    fontFamily:
                        'Segoe UI',
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
                        regionData,
                    valuePath:
                        'population',
                    minRadius: 7,
                    maxRadius: 30,
                    fill: '#f59e0b',
                    opacity: 0.75,

                    border: {
                        color: '#92400e',
                        width: 1
                    },

                    tooltipSettings: {
                        visible: true,
                        valuePath:
                            'country'
                    }
                }
            ],

            markerSettings: [
                {
                    visible: true,
                    dataSource:
                        locationData,
                    latitudeValuePath:
                        'latitude',
                    longitudeValuePath:
                        'longitude',
                    width: 18,
                    height: 18,
                    fill: '#dc2626',

                    border: {
                        color: '#ffffff',
                        width: 2
                    },

                    tooltipSettings: {
                        visible: true,
                        valuePath:
                            'name'
                    },

                    selectionSettings: {
                        enable: true,
                        enableMultiSelect:
                            false,
                        fill: '#facc15',

                        border: {
                            color: '#991b1b',
                            width: 2
                        }
                    }
                }
            ]
        }
    ];

const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

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

            title: {
                text:
                    'Regional value'
            }
        },

        layers,

        loaded:
            (): void => {
                if (
                    statusElement
                ) {
                    statusElement.textContent =
                        'The Maps visualization loaded successfully.';
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

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Maps Data and Layers</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"><script>

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

        #maps-container {
            width: 100%;
            min-height: 600px;
        }

        .map-status {
            margin-top: 12px;
            color: #374151;
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
                Country Metrics
            </h1>

            <p id="maps-description">
                Country colors and bubbles represent regional values.
                Markers identify selected office locations.
            </p>

            <div id="maps-container"></div>

            <p
                id="maps-status"
                class="map-status"
                aria-live="polite"
            >
                Loading the map.
            </p>
        </section>
    </main>

    <script>
        var regionData = [
            {
                country:
                    'United States of America',
                value: 82,
                population:
                    331900000
            },
            {
                country:
                    'Brazil',
                value: 56,
                population:
                    214300000
            },
            {
                country:
                    'India',
                value: 91,
                population:
                    1408000000
            }
        ];

        var locationData = [
            {
                id:
                    'san-francisco',
                name:
                    'San Francisco',
                latitude:
                    37.7749,
                longitude:
                    -122.4194
            },
            {
                id:
                    'mumbai',
                name:
                    'Mumbai',
                latitude:
                    19.076,
                longitude:
                    72.8777
            }
        ];

        function validateWorldMap(
            worldMap
        ) {
            if (
                !worldMap ||
                worldMap.type !==
                    'FeatureCollection' ||
                !Array.isArray(
                    worldMap.features
                ) ||
                worldMap.features.length === 0
            ) {
                throw new Error(
                    'The world-map data must be a nonempty GeoJSON FeatureCollection.'
                );
            }
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
                'The Maps host element was not found.'
            );
        }

        fetch(
            './data/world-map.geojson'
        )
            .then(
                function (response) {
                    if (!response.ok) {
                        throw new Error(
                            'Unable to load the world-map file. HTTP status: ' +
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

                                title: {
                                    text:
                                        'Regional value'
                                }
                            },

                            layers: [
                                {
                                    shapeData:
                                        worldMap,

                                    dataSource:
                                        regionData,

                                    shapePropertyPath:
                                        'name',

                                    shapeDataPath:
                                        'country',

                                    shapeSettings: {
                                        fill:
                                            '#e2e8f0',
                                        colorValuePath:
                                            'value',

                                        colorMapping: [
                                            {
                                                from: 0,
                                                to: 39,
                                                color:
                                                    '#dbeafe',
                                                label:
                                                    'Low'
                                            },
                                            {
                                                from: 40,
                                                to: 69,
                                                color:
                                                    '#60a5fa',
                                                label:
                                                    'Moderate'
                                            },
                                            {
                                                from: 70,
                                                to: 100,
                                                color:
                                                    '#1d4ed8',
                                                label:
                                                    'High'
                                            }
                                        ],

                                        border: {
                                            color:
                                                '#64748b',
                                            width: 0.5
                                        }
                                    },

                                    bubbleSettings: [
                                        {
                                            visible: true,
                                            dataSource:
                                                regionData,
                                            valuePath:
                                                'population',
                                            minRadius: 7,
                                            maxRadius: 30,
                                            fill:
                                                '#f59e0b',
                                            opacity: 0.75
                                        }
                                    ],

                                    markerSettings: [
                                        {
                                            visible: true,
                                            dataSource:
                                                locationData,
                                            latitudeValuePath:
                                                'latitude',
                                            longitudeValuePath:
                                                'longitude',
                                            width: 18,
                                            height: 18,
                                            fill:
                                                '#dc2626'
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
                                            'The Maps visualization loaded successfully.';
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

                    statusElement.textContent =
                        'The map could not be loaded. ' +
                        error.message;
                }
            );
    </script>
</body>
</html>
```

Start a local HTTP server:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-maps is installed.
✅ Maps is imported.
✅ Every enabled feature module is imported and injected.
✅ Global JavaScript does not call Maps.Inject.
✅ The global EJ2 bundle loads before application code.
✅ The Maps host exists.
✅ The host has a measurable height.
✅ layers is an array.
✅ A tile layer uses a valid urlTemplate.
✅ An OSM URL contains level, tileX, and tileY.
✅ OpenStreetMap attribution is visible.
✅ A GeoJSON layer uses complete shapeData.
✅ GeoJSON is a nonempty FeatureCollection.
✅ Main layers and SubLayer overlays are configured intentionally.
✅ shapePropertyPath matches a GeoJSON feature property.
✅ shapeDataPath matches application data.
✅ Field casing matches exactly.
✅ markerSettings is an array.
✅ Active marker entries use visible: true.
✅ Latitude and longitude paths match marker data.
✅ Coordinates are finite and within valid ranges.
✅ bubbleSettings is an array.
✅ Active bubble entries use visible: true.
✅ Bubble valuePath matches numeric data.
✅ Bubbles are associated with GeoJSON shapes.
✅ Shape data is assigned at layer level.
✅ Marker data is assigned inside markerSettings.
✅ Bubble data is assigned inside bubbleSettings.
✅ Layer indexes are validated before runtime updates.
✅ Related updates are batched.
✅ refresh is called once after complete updates.
✅ Important information is not communicated only through color or size.
✅ GeoJSON fetch examples run through HTTP.
✅ map.destroy() is called when a dynamic view is removed.
```

## Performance and Accessibility

- Reuse parsed GeoJSON objects.
- Avoid repeatedly downloading unchanged shape data.
- Reduce unnecessary geometry precision when appropriate.
- Aggregate insignificant bubble data.
- Use marker clustering after profiling.
- Avoid excessive labels.
- Batch runtime updates.
- Call `refresh()` once.
- Do not log every rendering event.
- Provide visible map summaries.
- Do not rely only on color or bubble size.
- Provide semantic tables for decision-critical values.
- Preserve visible focus.
- Test keyboard, screen-reader, touch, zoom, and reflow behavior.
- Destroy Maps instances when their dynamic hosts are removed.

```typescript
map.destroy();
```

## Troubleshooting

### Layer Does Not Render

Check:

- The layer is in the `layers` array.
- `visible` is not false.
- Tile layers contain a valid `urlTemplate`.
- Shape layers contain valid `shapeData`.
- The host has a measurable size.
- The requested provider or GeoJSON file is available.

### Sublayer Does Not Appear

Check:

```typescript
type:
    'SubLayer'
```

Also confirm that:

- The sublayer contains valid shape data.
- Its shapes overlap the visible main layer.
- Fill and border opacity are visible.
- It is ordered after the main layer.

### Markers Do Not Appear

Check:

- `Marker` is injected.
- `markerSettings` is an array.
- `visible` is true.
- Coordinate paths match.
- Coordinates are valid.

### Bubbles Do Not Appear

Check:

- `Bubble` is injected.
- `bubbleSettings` is an array.
- `visible` is true.
- `valuePath` matches numeric data.
- Shape binding is correct.
- GeoJSON shape data exists.

### Shape Data Does Not Bind

Check:

```typescript
shapePropertyPath:
    'name',

shapeDataPath:
    'country'
```

Do not use:

```typescript
shapePropertyPath:
    'properties.name'
```

### Layer Visibility Does Not Update

Assign visibility and call `refresh()` once:

```typescript
map.layers[
    layerIndex
].visible =
    visible;

map.refresh();
```

### GeoJSON Fetch Fails

Do not open the JavaScript example through `file://`.

Use:

```bash
python -m http.server 8000
```

## Combined Mistakes and Future References

### Rich-Text Tile URL

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

### Unnecessary OSM Type

Avoid:

```typescript
type:
    'OSM'
```

Use `urlTemplate` for the tile layer.

### Incorrect Bing Configuration

Incorrect:

```typescript
urlTemplate:
    'http://dev.virtualearth.net/REST/v1/Imagery/Metadata/Road'
```

Correct:

```typescript
args.maps
    .getBingUrlTemplate(
        metadataUrl
    )
    .then(
        (
            tileUrl:
                string
        ): void => {
            args.maps
                .layers[0]
                .urlTemplate =
                    tileUrl;
        }
    );
```

### Unnecessary Geometry Type

Avoid:

```typescript
type:
    'Geometry'
```

for a basic GeoJSON main layer unless the installed model explicitly requires it.

Use:

```typescript
shapeData:
    worldMap
```

### Marker Settings as an Object

Incorrect:

```typescript
markerSettings: {
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

### Coordinate Bubbles on OSM

Incorrect assumption:

```text
Bubble latitude and longitude values work like markers
on a basic tile layer.
```

Correct:

```text
Markers represent coordinate-based points.
Bubbles represent values associated with GeoJSON shapes.
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

### Empty Overlay Layers

Avoid:

```typescript
layers: [
    {
        urlTemplate:
            osmUrl
    },
    {
        markerSettings: [
            {}
        ]
    },
    {
        bubbleSettings: [
            {}
        ]
    }
]
```

Place coordinate markers in the applicable tile layer.

Place region-bound bubbles in a valid GeoJSON layer.

### Incorrect Runtime Data Target

Incorrect marker update:

```typescript
map.layers[0]
    .dataSource =
        markerData;
```

Correct:

```typescript
map.layers[0]
    .markerSettings[0]
    .dataSource =
        markerData;
```

### Refresh After Every Assignment

Avoid:

```typescript
layer.visible =
    false;

map.refresh();

layer.dataSource =
    nextData;

map.refresh();
```

Preferred:

```typescript
layer.visible =
    false;

layer.dataSource =
    nextData;

map.refresh();
```

### Fixed Performance Threshold

Avoid:

```text
Always cluster more than 1000 markers.
```

Profile representative application data on target browsers and devices.

### Encoded Executable HTML

Incorrect:

```html
&lt;div id="maps-container"&gt;&lt;/div&gt;
```

Correct:

```html
<div id="maps-container"></div>
```

### Malformed Script URL

Incorrect:

```text
https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.jsscript
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"><script>
```

### Editor-Generated Markup

Remove the following from executable content:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```