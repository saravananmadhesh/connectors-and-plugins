---
name: syncfusion-javascript-maps
description: "Guide to implementing Syncfusion Maps in TypeScript and JavaScript. Use this skill whenever the user needs to create interactive maps, add markers, visualize geographical data, work with map layers, apply color mapping, add annotations, configure legends, or handle map interactions and events. Works with TypeScript (module-based) and JavaScript (CDN/ES5)."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion Maps in TypeScript and JavaScript

The Syncfusion EJ2 Maps component visualizes geographic information through online tile providers, GeoJSON shape layers, markers, bubbles, custom polygons, navigation lines, labels, legends, annotations, tooltips, selection, zooming, panning, printing, and exporting.

This skill covers framework-neutral implementations for:

- TypeScript applications using npm and module imports.
- JavaScript applications using a versioned EJ2 global bundle.
- OpenStreetMap and authenticated map providers.
- GeoJSON geographic shapes.
- Coordinate-based markers.
- Region-bound bubbles.
- Custom polygon overlays.
- Shape and bubble color mapping.
- Navigation lines.
- Legends, annotations, and tooltips.
- Selection and highlighting.
- Built-in and application-owned persistence.
- Printing and image export.
- Accessibility, validation, performance, and cleanup.

## Platform Support

### TypeScript

Use TypeScript when the application uses:

- The `@syncfusion/ej2-maps` npm package.
- TypeScript compilation.
- Webpack, Vite, or another module bundler.
- Explicit feature-module injection.
- Strongly typed data and configuration models.
- Compile-time validation and IDE IntelliSense.

Install the package:

```bash
npm install @syncfusion/ej2-maps
```

Basic import:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';
```

Feature modules must be imported and injected before constructing Maps.

```typescript
import {
    Maps,
    Marker,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Marker
);
```

### JavaScript

Use global JavaScript when the application uses:

- A versioned EJ2 CDN bundle.
- A locally hosted EJ2 global bundle.
- Traditional HTML and JavaScript files.
- The global `ej.maps.Maps` constructor.
- No TypeScript compilation.

Global constructor:

```javascript
ej.maps.Maps
```

Use the complete versioned EJ2 global bundle:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Do not mix the complete bundle with separate `ej2-base`, `ej2-data`, `ej2-svg-base`, and `ej2-maps` scripts.

Global JavaScript using the complete bundle does not require explicit `Maps.Inject(...)` calls.

### JavaScript Compatibility

The global JavaScript examples use ES5-compatible syntax where practical:

```text
var declarations
Traditional functions
No TypeScript annotations
No ECMAScript module imports
Global ej namespace
```

Browser support must still match the supported-browser matrix of the installed EJ2 release.

Do not promise unrestricted legacy-browser compatibility.

## When to Use This Skill

Use this skill when the task requires:

- Rendering an online map provider.
- Rendering countries, states, or custom regions from GeoJSON.
- Displaying coordinate-based locations.
- Visualizing regional magnitude with bubbles.
- Applying data-driven shape or bubble colors.
- Drawing custom coordinate-defined polygon areas.
- Connecting locations with navigation lines.
- Adding data labels to geographic shapes.
- Displaying legends and tooltips.
- Adding map-relative annotation content.
- Selecting or highlighting shapes, markers, or bubbles.
- Supporting zooming and panning.
- Persisting supported map state.
- Storing validated application preferences.
- Printing the rendered map.
- Exporting the map as PNG, JPEG, or SVG.
- Supporting responsive layouts.
- Optimizing large geographic datasets.
- Diagnosing setup, network, data-binding, or rendering failures.

## Visualization Selection Guide

### Use Markers

Use markers for locations defined directly by latitude and longitude.

Examples:

- Offices.
- Stores.
- Airports.
- Warehouses.
- Incident points.
- Route waypoints.

### Use Bubbles

Use bubbles for numeric values associated with GeoJSON shapes.

Examples:

- Population by country.
- Revenue by state.
- Sales by territory.
- Engagement by region.

Bubbles are not direct replacements for coordinate markers.

### Use GeoJSON Shapes

Use `shapeData` for:

- Countries.
- States.
- Provinces.
- Districts.
- Administrative boundaries.
- Custom geographic feature collections.

### Use Custom Polygons

Use `polygonSettings.polygons` for application-defined areas based on coordinate points.

Examples:

- Delivery zones.
- Restricted regions.
- Coverage areas.
- Service boundaries.

### Use Navigation Lines

Use navigation lines to display:

- Routes.
- Journeys.
- Connections.
- Flight paths.
- Geographic dependencies.

## Feature Module Reference

```text
Zooming and panning -> Zoom
Markers             -> Marker
Bubbles             -> Bubble
Navigation lines    -> NavigationLine
Tooltips            -> MapsTooltip
Legends             -> Legend
Annotations         -> Annotations
Selection           -> Selection
Data labels         -> DataLabel
Custom polygons     -> Polygon
Printing            -> Print
Image export        -> ImageExport
PDF export          -> PdfExport
```

Import and inject only the modules used by an example.

Example:

```typescript
import {
    Maps,
    MapsTooltip,
    Marker,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Marker,
    MapsTooltip
);
```

Keep imports and injection synchronized.

Incorrect:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Marker
);
```

Correct:

```typescript
import {
    Maps,
    Marker
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Marker
);
```

## Implementation Rules

### Use Explicit DOM Attachment

Preferred TypeScript:

```typescript
const map: Maps =
    new Maps({
        layers
    });

map.appendTo(
    '#maps-container'
);
```

Preferred JavaScript:

```javascript
var map =
    new ej.maps.Maps({
        layers: layers
    });

map.appendTo(
    '#maps-container'
);
```

### Verify the Host Element

```typescript
const host:
    HTMLElement | null =
        document.getElementById(
            'maps-container'
        );

if (!host) {
    throw new Error(
        'The Maps host element "#maps-container" was not found.'
    );
}
```

### Provide Measurable Dimensions

```css
#maps-container {
    width: 100%;
    min-height: 600px;
}
```

Configure Maps with a definite height:

```typescript
width:
    '100%',

height:
    '600px'
```

Avoid relying on:

```typescript
height:
    '100%'
```

unless every relevant ancestor has a definite computed height.

### Use centerPosition

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

### Keep Feature Configuration at the Correct Level

```text
Shape data             -> Layer shapeData
Shape binding data     -> Layer dataSource
Shape tooltip          -> Layer tooltipSettings
Shape selection        -> Layer selectionSettings
Markers                -> Layer markerSettings array
Marker tooltip          -> Marker entry tooltipSettings
Marker selection        -> Marker entry selectionSettings
Bubbles                -> Layer bubbleSettings array
Bubble tooltip          -> Bubble entry tooltipSettings
Bubble selection        -> Bubble entry selectionSettings
Navigation lines       -> Layer navigationLineSettings array
Custom polygons        -> Layer polygonSettings
Shape labels           -> Layer dataLabelSettings
```

## Documentation and Navigation Guide

### Getting Started and Setup

Read:

```text
references/getting-started.md
```

Use this reference for:

- Package installation.
- TypeScript imports.
- Module injection.
- JavaScript CDN setup.
- OpenStreetMap initialization.
- Host dimensions.
- World-map data acquisition.
- First Maps implementation.

### Data and Layers

Read:

```text
references/data-and-layers.md
```

Use this reference for:

- Online tile layers.
- GeoJSON shape layers.
- Main layers.
- Sublayers.
- `baseLayerIndex`.
- Shape data binding.
- Marker and bubble data placement.
- Layer visibility.
- Safe runtime updates.

### Markers and Navigation

Read:

```text
references/markers-and-navigation.md
```

Use this reference for:

- Coordinate-based markers.
- Marker appearance.
- Marker templates.
- Marker images.
- Marker tooltips.
- Marker selection.
- Marker events.
- Marker clustering.
- Navigation lines.
- Dynamic marker and route updates.

### Visualization Features

Read:

```text
references/visualization-features.md
```

Use this reference for:

- Region-bound bubbles.
- GeoJSON shape rendering.
- Custom polygon overlays.
- Shape color mapping.
- Bubble color mapping.
- Shape data labels.
- Combined regional visualizations.

### Legends and Annotations

Read:

```text
references/legends-and-annotations.md
```

Use this reference for:

- Default and Interactive legends.
- Docked and floating legends.
- Layer, marker, and bubble legends.
- Legend toggle behavior.
- Map-relative annotations.
- Shape, marker, and bubble tooltips.

### Map Providers and Selection

Read:

```text
references/map-providers-and-selection.md
```

Use this reference for:

- OpenStreetMap.
- Bing Maps.
- Custom tile providers.
- Provider authentication.
- Provider security and attribution.
- Shape selection.
- Marker selection.
- Bubble selection.
- Single and multiple selection.
- Validated interaction events.

### Customization and Persistence

Read:

```text
references/customization-and-persistence.md
```

Use this reference for:

- Built-in themes.
- Public appearance models.
- Application-owned wrapper CSS.
- Responsive layouts.
- Built-in persistence.
- Validated browser-storage preferences.
- Printing.
- PNG, JPEG, and SVG export.
- Cleanup.

### Troubleshooting

Read:

```text
references/troubleshooting.md
```

Use this reference for:

- Installation failures.
- Bundle-loading failures.
- Missing module injection.
- Host and dimension problems.
- Tile-provider failures.
- GeoJSON loading failures.
- Marker and bubble issues.
- Data-binding problems.
- Color-mapping failures.
- Tooltip and selection issues.
- Performance and memory problems.
- TypeScript and JavaScript diagnostics.

## TypeScript Quick Start

This example renders OpenStreetMap with a marker, marker tooltip, zooming, and panning.

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

    <title>Syncfusion Maps</title>

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
                Office Location
            </h1>

            <p id="maps-description">
                An interactive OpenStreetMap view showing the
                San Francisco office location.
            </p>

            <div id="maps-container"></div>

            <p class="map-attribution">
                Map data © OpenStreetMap contributors
            </p>

            <p
                id="maps-status"
                aria-live="polite"
            >
                Loading the map.
            </p>
        </section>
    </main>

    <script scr="app.ts"></script>
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
    color: #475569;
    line-height: 1.5;
}

#maps-container {
    width: 100%;
    min-height: 600px;
}

.map-attribution {
    margin: 8px 0 0;
    font-size: 12px;
}

@media (max-width: 768px) {
    .page-container {
        padding: 12px;
    }

    .maps-card {
        padding: 12px;
    }

    #maps-container {
        min-height: 500px;
    }
}
```

### app.ts

```typescript
import {
    Maps,
    MapsTooltip,
    Marker,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Marker,
    MapsTooltip
);

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
                'san-francisco-office',
            name:
                'San Francisco Office',
            latitude:
                37.7749,
            longitude:
                -122.4194
        }
    ];

const validateLocations = (
    locations:
        LocationData[]
): void => {
    const ids:
        Set<string> =
            new Set<string>();

    locations.forEach(
        (
            location:
                LocationData
        ): void => {
            if (
                !location.id.trim()
            ) {
                throw new Error(
                    'Every marker requires a nonempty ID.'
                );
            }

            if (
                ids.has(
                    location.id
                )
            ) {
                throw new Error(
                    'Duplicate marker ID: ' +
                    location.id
                );
            }

            if (
                !location.name.trim()
            ) {
                throw new Error(
                    'Every marker requires a name.'
                );
            }

            if (
                !Number.isFinite(
                    location.latitude
                ) ||
                location.latitude < -90 ||
                location.latitude > 90
            ) {
                throw new Error(
                    'Invalid marker latitude.'
                );
            }

            if (
                !Number.isFinite(
                    location.longitude
                ) ||
                location.longitude < -180 ||
                location.longitude > 180
            ) {
                throw new Error(
                    'Invalid marker longitude.'
                );
            }

            ids.add(
                location.id
            );
        }
    );
};

validateLocations(
    locationData
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
            mouseWheelZoom: true,
            pinchZooming: true,
            minZoom: 1,
            maxZoom: 13,
            zoomFactor: 5,

            toolbarSettings: {
                buttonSettings: {
                    toolbarItems: [
                        'Zoom',
                        'ZoomIn',
                        'ZoomOut',
                        'Pan',
                        'Reset'
                    ]
                }
            }
        },

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
                        width: 24,
                        height: 24,
                        shape: 'Circle',
                        fill: '#dc2626',

                        border: {
                            color: '#ffffff',
                            width: 2
                        },

                        tooltipSettings: {
                            visible: true,
                            valuePath:
                                'name'
                        }
                    }
                ]
            }
        ],

        loaded: (): void => {
            if (
                statusElement
            ) {
                statusElement.textContent =
                    'The map loaded successfully.';
            }
        }
    });

map.appendTo(
    host
);
```

## JavaScript Quick Start

This example provides equivalent behavior in one standalone HTML file.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Syncfusion Maps</title>


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

        .map-attribution {
            color: #475569;
            font-size: 12px;
        }

        @media (max-width: 768px) {
            .page-container {
                padding: 12px;
            }

            #maps-container {
                min-height: 500px;
            }
        }
    </style>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>

<body>
    <main class="page-container">
        <section
            class="maps-card"
            aria-labelledby="maps-heading"
            aria-describedby="maps-description"
        >
            <h1 id="maps-heading">
                Office Location
            </h1>

            <p id="maps-description">
                An interactive OpenStreetMap view showing the
                San Francisco office location.
            </p>

            <div id="maps-container"></div>

            <p class="map-attribution">
                Map data © OpenStreetMap contributors
            </p>

            <p
                id="maps-status"
                aria-live="polite"
            >
                Loading the map.
            </p>
        </section>
    </main>

    <script>
        var locationData = [
            {
                id:
                    'san-francisco-office',
                name:
                    'San Francisco Office',
                latitude:
                    37.7749,
                longitude:
                    -122.4194
            }
        ];

        function validateLocations(
            locations
        ) {
            var ids =
                new Set();

            locations.forEach(
                function (location) {
                    if (
                        typeof location.id !==
                            'string' ||
                        location.id
                            .trim()
                            .length === 0
                    ) {
                        throw new Error(
                            'Every marker requires a nonempty ID.'
                        );
                    }

                    if (
                        ids.has(
                            location.id
                        )
                    ) {
                        throw new Error(
                            'Duplicate marker ID: ' +
                            location.id
                        );
                    }

                    if (
                        !Number.isFinite(
                            location.latitude
                        ) ||
                        location.latitude < -90 ||
                        location.latitude > 90
                    ) {
                        throw new Error(
                            'Invalid marker latitude.'
                        );
                    }

                    if (
                        !Number.isFinite(
                            location.longitude
                        ) ||
                        location.longitude < -180 ||
                        location.longitude > 180
                    ) {
                        throw new Error(
                            'Invalid marker longitude.'
                        );
                    }

                    ids.add(
                        location.id
                    );
                }
            );
        }

        validateLocations(
            locationData
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

        if (
            typeof window.ej ===
                'undefined' ||
            !window.ej.maps
        ) {
            throw new Error(
                'The EJ2 Maps global bundle was not loaded.'
            );
        }

        var map =
            new ej.maps.Maps({
                width: '100%',
                height: '600px',

                centerPosition: {
                    latitude: 37.7749,
                    longitude: -122.4194
                },

                zoomSettings: {
                    enable: true,
                    enablePanning: true,
                    mouseWheelZoom: true,
                    pinchZooming: true,
                    minZoom: 1,
                    maxZoom: 13,
                    zoomFactor: 5,

                    toolbarSettings: {
                        buttonSettings: {
                            toolbarItems: [
                                'Zoom',
                                'ZoomIn',
                                'ZoomOut',
                                'Pan',
                                'Reset'
                            ]
                        }
                    }
                },

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
                                width: 24,
                                height: 24,
                                shape: 'Circle',
                                fill: '#dc2626',

                                border: {
                                    color:
                                        '#ffffff',
                                    width: 2
                                },

                                tooltipSettings: {
                                    visible: true,
                                    valuePath:
                                        'name'
                                }
                            }
                        ]
                    }
                ],

                loaded:
                    function () {
                        statusElement.textContent =
                            'The map loaded successfully.';
                    }
            });

        map.appendTo(
            host
        );
    </script>
</body>
</html>
```

## GeoJSON World Map Setup

OpenStreetMap does not require a world-map file.

GeoJSON shape, color-mapping, shape-label, and bubble examples require complete `shapeData`.

Download a world-map GeoJSON file:

```bash
mkdir -p src/data
curl -L "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" -o "src/data/world-map.geojson"
```

Manual download:

```text
https://datahub.io/core/geo-countries/_r/-/data/countries.geojson
```

Validate it:

```javascript
import {
    readFile
} from 'node:fs/promises';

const content =
    await readFile(
        'src/data/world-map.geojson',
        'utf8'
    );

const worldMap =
    JSON.parse(
        content
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
        'The world-map file does not contain features.'
    );
}
```

For TypeScript JSON imports, enable:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

Then import:

```typescript
import worldMap
    from './data/world-map.json';
```

## Common Patterns

## Regional Data Visualization

Use a GeoJSON layer with complete data binding.

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
                    color: '#dbeafe',
                    label: 'Low'
                },
                {
                    from: 40,
                    to: 69,
                    color: '#60a5fa',
                    label: 'Moderate'
                },
                {
                    from: 70,
                    to: 100,
                    color: '#1d4ed8',
                    label: 'High'
                }
            ]
        }
    }
]
```

Use singular:

```text
colorMapping
```

Do not use:

```text
colorMappings
```

## Multi-Layer Maps

Use a validated main layer and `SubLayer` overlays.

```typescript
layers: [
    {
        shapeData:
            worldMap
    },
    {
        type: 'SubLayer',
        shapeData:
            overlayGeoJson,

        shapeSettings: {
            fill:
                'rgb(37 99 235 / 30%)'
        }
    }
]
```

Do not create empty layers merely to separate marker and bubble configuration.

## Interactive Experience

Use:

```text
Zoom        -> Zooming and panning
MapsTooltip -> Tooltips
Selection   -> Visual selection
```

Keep click events and visual selection separate.

Use external persistent details when information is important. Do not rely only on hover tooltips.

## Navigation and Route Visualization

```typescript
navigationLineSettings: [
    {
        latitude: [
            37.7749,
            34.0522
        ],

        longitude: [
            -122.4194,
            -118.2437
        ],

        color: '#2563eb',
        width: 3,
        opacity: 0.8,
        dashArray: '8 4'
    }
]
```

Validate:

- At least two coordinate pairs.
- Matching latitude and longitude array lengths.
- Finite coordinate values.
- Latitude between `-90` and `90`.
- Longitude between `-180` and `180`.
- Positive line width.
- Opacity between `0` and `1`.

Distance and duration are application-owned values. Navigation lines do not automatically calculate route distance, travel duration, or road directions.

## Key Features at a Glance

### Markers

Use for geographic points based on latitude and longitude.

### Bubbles

Use for magnitude visualization associated with GeoJSON shapes.

### GeoJSON Shapes

Use for geographic boundaries supplied through `shapeData`.

### Custom Polygons

Use for coordinate-defined overlays supplied through `polygonSettings.polygons`.

### Color Mapping

Use range, equal-value, or opacity-based shape and bubble coloring.

### Layers

Use main layers and validated `SubLayer` overlays.

### Navigation Lines

Use coordinate paths to connect locations.

### Legends

Use to explain layer, bubble, or marker colors and symbols.

### Annotations

Use for map-relative HTML overlays positioned through `x` and `y`.

Annotations do not use latitude and longitude. Use markers for geographic points.

### Tooltips

Use for contextual information associated with shapes, markers, or bubbles.

### Persistence

Use `enablePersistence` when built-in component persistence meets the application requirement.

Use validated application-owned storage for custom preferences, schema versioning, expiration, layer visibility, or user-specific settings.

### Print and Export

Use:

```text
Print       -> Print module and allowPrint
ImageExport -> ImageExport module and allowImageExport
PdfExport   -> PdfExport module and allowPdfExport
```

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-maps is installed.
✅ Maps is imported.
✅ Every enabled TypeScript feature has its module imported.
✅ Every imported runtime module is injected before construction.
✅ Unused optional modules are not injected.
✅ Global JavaScript does not call Maps.Inject.
✅ The complete EJ2 bundle loads before application code.
✅ Combined and individual bundles are not mixed.
✅ Every CDN script URL ends in .min.js.
✅ The Maps host exists.
✅ The appendTo target matches the host ID.
✅ The host has measurable width and height.
✅ Maps width and height use valid CSS-size strings.
✅ centerPosition is used instead of center.
✅ Zoom is injected when zooming or panning is enabled.
✅ Tile URLs are plain strings.
✅ OpenStreetMap URLs contain level, tileX, and tileY.
✅ OpenStreetMap attribution is visible.
✅ Provider terms and network requirements are reviewed.
✅ Maps provider credentials are protected as far as the provider permits.
✅ The layer contains urlTemplate or shapeData.
✅ GeoJSON is a nonempty FeatureCollection.
✅ shapePropertyPath matches a GeoJSON feature property.
✅ shapeDataPath matches application data.
✅ markerSettings is an array.
✅ Every active marker entry uses visible: true.
✅ Marker coordinate paths match marker data.
✅ Marker IDs are nonempty and unique when required.
✅ Marker latitudes are finite and between -90 and 90.
✅ Marker longitudes are finite and between -180 and 180.
✅ bubbleSettings is an array.
✅ Every active bubble entry uses visible: true.
✅ Bubble data is associated with GeoJSON shapes.
✅ Bubble valuePath matches finite numeric values.
✅ colorMapping uses the singular property name.
✅ Color ranges are finite and nonoverlapping.
✅ Navigation-line coordinate arrays have matching lengths.
✅ Annotations use x and y rather than latitude and longitude.
✅ Layer indexes are validated before runtime updates.
✅ Storage preferences are validated before use.
✅ Print and export flags match injected modules.
✅ Runtime updates are batched.
✅ refresh is called once after complete updates.
✅ Important information is not communicated only by color, size, or hover.
✅ Application-owned listeners and timers are cleaned up.
✅ Pending requests are cancelled where appropriate.
✅ map.destroy() is called when a dynamic host is removed.
✅ No encoded HTML replaces executable markup.
✅ No rich-text anchors or editor-generated classes remain.
```

## Accessibility Guidance

- Provide a semantic heading.
- Provide a concise map description.
- Include meaningful marker and region names.
- Do not rely only on marker color.
- Do not rely only on bubble size.
- Do not rely only on mapped shape color.
- Provide descriptive legend labels.
- Provide persistent selection details.
- Preserve visible focus.
- Use native buttons for print, export, reset, and other application actions.
- Provide semantic tables for decision-critical visualization data.
- Keep marker targets usable on touch devices.
- Do not make tooltip content the only source of essential information.
- Avoid excessive live-region announcements.
- Include required provider attribution.
- Test keyboard, touch, screen-reader, browser zoom, and reflow behavior.
- Do not claim that the complete application is automatically compliant with an accessibility standard.

## Performance and Cleanup

- Reuse parsed GeoJSON.
- Avoid repeatedly fetching unchanged shapes.
- Simplify geometry only after validating geographic accuracy.
- Validate marker, bubble, shape, and route data before rendering.
- Keep marker and tooltip templates simple.
- Use clustering only after profiling.
- Batch runtime changes.
- Call `refresh()` once.
- Avoid expensive render-event logging.
- Avoid recreating Maps in the same host without cleanup.
- Remove application-owned event listeners.
- Clear pending timers.
- Cancel pending requests where appropriate.
- Destroy Maps when its dynamic view is removed.

```typescript
map.destroy();
```

## Combined Mistakes and Future References

### Incorrect Center Property

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

### Missing Zoom Injection

Incorrect:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';

const map: Maps =
    new Maps({
        zoomSettings: {
            enable: true
        }
    });
```

Correct:

```typescript
import {
    Maps,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom
);
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

### Missing Feature Visibility

Incorrect:

```typescript
markerSettings: [
    {
        dataSource:
            locationData
    }
]
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

Use:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/level/tileX/tileY.png'
```

### Coordinate-Based Bubble Assumption

Incorrect:

```text
Bubbles can always be positioned like markers by supplying
latitude and longitude on a basic tile layer.
```

Correct:

```text
Use markers for direct coordinates.
Use bubbles for values associated with GeoJSON shapes.
```

### Incorrect Color-Mapping Property

Incorrect:

```typescript
colorMappings: []
```

Correct:

```typescript
colorMapping: []
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

### Annotation with Geographic Coordinates

Incorrect:

```typescript
annotations: [
    {
        latitude:
            37.7749,
        longitude:
            -122.4194
    }
]
```

Use a marker for geographic coordinates.

Use `x` and `y` for an annotation:

```typescript
annotations: [
    {
        content:
            '#annotation-template',
        x:
            '5%',
        y:
            '10%'
    }
]
```

### Navigation Lines at the Maps Root

Incorrect:

```typescript
map.navigationLineSettings =
    routes;
```

Correct:

```typescript
map.layers[0]
    .navigationLineSettings =
        routes;
```

### Undefined Geographic Data

Avoid:

```typescript
shapeData:
    worldMap
```

unless `worldMap` has been imported, defined, or fetched successfully.

### Unvalidated Event Names

Do not assume these events exist:

```text
zoomEnd
panEnd
mouseMove
layerRender
```

Validate events and event types against the installed package.

### Malformed CDN Markup

Incorrect:

```html
https://cdn.syncfusion.com/...
    https://cdn.syncfusion.com/...
</a>
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Mixing Combined and Individual Bundles

Incorrect:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-maps/dist/global/ej2-maps.min.js"></script>
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Encoded Executable HTML

Incorrect:

```html
&lt;div id="maps-container"&gt;&lt;/div&gt;
```

Correct:

```html
<div id="maps-container"></div>
```

### Missing Cleanup

When the dynamic view is removed:

```typescript
button.removeEventListener(
    'click',
    handleClick
);

controller.abort();

map.destroy();
```

### Editor-Generated Markup

Remove the following from executable HTML, TypeScript, JavaScript, CSS, imports, commands, templates, and URLs:

```text
<a>
<strong data-lexical-text="true">
<br>
data-lexical-text
Editor-generated class names
Encoded executable tags
```