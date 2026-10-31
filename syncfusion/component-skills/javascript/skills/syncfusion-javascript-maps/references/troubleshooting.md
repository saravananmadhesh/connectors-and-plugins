# Troubleshooting Guide for Maps

Use this guide to diagnose setup, rendering, provider, data-binding, interaction, performance, and cleanup problems in framework-neutral Syncfusion EJ2 Maps applications built with TypeScript or JavaScript.

Follow the diagnostic workflow in order before changing multiple settings at once.

- #diagnostic-workflow
- #minimal-typescript-diagnostic-example
- #minimal-javascript-diagnostic-example
- #installation-and-initialization
- #host-element-and-dimensions
- #tile-provider-issues
- #bing-maps-issues
- #geojson-loading-issues
- #module-injection-issues
- #marker-issues
- #bubble-issues
- #shape-data-binding-issues
- #color-mapping-issues
- #tooltip-and-selection-issues
- #marker-clustering-issues
- #performance-issues
- #memory-and-cleanup
- #browser-compatibility
- #typescript-specific-issues
- #javascript-specific-issues
- #accessibility-troubleshooting
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Diagnostic Workflow

Use this order when a map does not render or a feature does not work:

1. Confirm that the npm package or global JavaScript bundle loaded.
2. Confirm that the Maps host exists.
3. Confirm that the host has measurable dimensions.
4. Confirm that `appendTo()` uses the correct host.
5. Confirm that the layer has either `urlTemplate` or `shapeData`.
6. Confirm that all required TypeScript modules are imported and injected.
7. Confirm that marker and bubble settings are arrays.
8. Confirm that active marker and bubble entries use `visible: true`.
9. Validate coordinates, numeric data, mapping fields, and GeoJSON.
10. Inspect browser console errors.
11. Inspect failed requests in the Network panel.
12. Check Content Security Policy and network restrictions.
13. Reduce the configuration to a minimal example.
14. Add features back one at a time.
15. Destroy previous Maps instances before recreating the component.

Do not change the provider, data model, modules, dimensions, and event handlers simultaneously. Isolate one failure at a time.

## Minimal TypeScript Diagnostic Example

Install the Maps package:

```bash
npm install @syncfusion/ej2-maps
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

    <title>Maps Diagnostic Example</title>

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
                OpenStreetMap Diagnostic
            </h1>

            <p id="maps-description">
                A minimal Maps example used to verify package loading,
                host dimensions, tile requests, zooming, and panning.
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

    ./<script scr="app.ts"></script>
</body>
</html>
```

The TypeScript file must be compiled into `app.js` by the selected TypeScript or bundler configuration.

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

#maps-container {
    width: 100%;
    min-height: 600px;
}

.map-attribution {
    color: #475569;
    font-size: 12px;
}
```

### app.ts

```typescript
import {
    Maps,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom
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
            zoomFactor: 5
        },

        layers: [
            {
                urlTemplate:
                    'https://tile.openstreetmap.org/level/tileX/tileY.png'
            }
        ],

        loaded: (): void => {
            if (statusElement) {
                statusElement.textContent =
                    'The diagnostic map loaded successfully.';
            }
        }
    });

map.appendTo(
    host
);
```

If this example works, add markers, bubbles, GeoJSON, labels, tooltips, selection, legends, or other features individually.

## Minimal JavaScript Diagnostic Example

Use the versioned combined EJ2 bundle.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Maps JavaScript Diagnostic</title>

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

        #maps-container {
            width: 100%;
            min-height: 600px;
        }

        .map-attribution {
            color: #475569;
            font-size: 12px;
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
                OpenStreetMap Diagnostic
            </h1>

            <p id="maps-description">
                A minimal JavaScript example used to verify bundle
                loading, host dimensions, tile requests, and Maps
                initialization.
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
                    zoomFactor: 5
                },

                layers: [
                    {
                        urlTemplate:
                            'https://tile.openstreetmap.org/level/tileX/tileY.png'
                    }
                ],

                loaded:
                    function () {
                        statusElement.textContent =
                            'The diagnostic map loaded successfully.';
                    }
            });

        map.appendTo(
            host
        );
    </script>
</body>
</html>
```

Do not load the combined bundle together with individual EJ2 package bundles.

## Installation and Initialization

## Package Cannot Be Found

Error:

```text
Cannot find module '@syncfusion/ej2-maps'
```

Install the package:

```bash
npm install @syncfusion/ej2-maps
```

Verify installation:

```bash
npm list @syncfusion/ej2-maps
```

Check that the package appears under `dependencies` in `package.json`.

Do not install a separate community type package:

```bash
npm install --save-dev @types/syncfusion__ej2-maps
```

The Syncfusion package includes its own TypeScript declarations.

## Import Cannot Be Resolved

Correct:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';
```

Check:

- Package-name spelling.
- Import-name casing.
- `node_modules` availability.
- TypeScript module resolution.
- Bundler aliases.
- Lock-file consistency.
- Duplicate EJ2 versions.

Reinstall dependencies when the installation is incomplete:

```bash
rm -rf node_modules
npm install
```

Do not delete dependencies routinely. Use this only when installation or lock-file corruption is suspected.

## Maps Is Constructed Before the Host Exists

Incorrect:

```typescript
const map: Maps =
    new Maps({});

map.appendTo(
    '#missing-container'
);
```

Correct HTML:

```html
<div id="maps-container"></div>
```

Correct initialization:

```typescript
const host:
    HTMLElement | null =
        document.getElementById(
            'maps-container'
        );

if (!host) {
    throw new Error(
        'The Maps host element was not found.'
    );
}

const map: Maps =
    new Maps({});

map.appendTo(
    host
);
```

## Multiple Instances Use the Same Host

Destroy an existing instance before recreating Maps in the same dynamic host.

```typescript
let map:
    Maps | null =
        null;

const createMap =
    (): void => {
        map?.destroy();

        map =
            new Maps({
                width: '100%',
                height: '600px',
                layers
            });

        map.appendTo(
            '#maps-container'
        );
    };
```

## Host Element and Dimensions

## Blank Host Element

Incorrect:

```css
#maps-container {
}
```

Correct:

```css
#maps-container {
    width: 100%;
    min-height: 600px;
}
```

Also configure the component:

```typescript
const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',
        layers
    });
```

## Percentage Height Does Not Work

Potentially unusable:

```css
#maps-container {
    height: 100%;
}
```

Percentage height requires every relevant ancestor to have a definite height.

Safer:

```css
#maps-container {
    min-height: 600px;
}
```

```typescript
height:
    '600px'
```

## Hidden Ancestor Prevents Measurement

Maps may initialize with unusable dimensions if a parent is hidden during construction.

Problematic application state:

```css
.hidden-panel {
    display: none;
}
```

Initialize Maps after the panel becomes visible, or call `refresh()` after the host has measurable dimensions.

```typescript
panel.hidden =
    false;

map.refresh();
```

## Host Selector Does Not Match

Incorrect:

```html
<div id="map"></div>
```

```typescript
map.appendTo(
    '#maps-container'
);
```

Correct:

```html
<div id="maps-container"></div>
```

```typescript
map.appendTo(
    '#maps-container'
);
```

## Tile Provider Issues

## Blank or Gray OpenStreetMap Tiles

Use the correct URL:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/level/tileX/tileY.png'
```

Check the Network panel for:

- HTTP errors.
- DNS failures.
- Blocked requests.
- Content Security Policy violations.
- Proxy or firewall restrictions.
- Mixed-content blocking.
- Rate limitations.
- Provider outages.

Do not wrap the URL in an anchor.

Incorrect:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/......</a>'
```

## Incorrect Tile Filename Casing

Potentially incorrect:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/level/tileX/tileY.PNG'
```

Correct:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/level/tileX/tileY.png'
```

Remote servers can treat paths as case-sensitive.

## Content Security Policy Blocks Tiles

The application policy must permit images from the selected tile origin.

Inspect the console for messages mentioning:

```text
Content Security Policy
img-src
connect-src
```

Update the policy through the application’s security configuration after reviewing the provider and organizational requirements.

Do not disable Content Security Policy merely to make the map render.

## Mixed Content

A page loaded over HTTPS can block an HTTP provider URL.

Avoid:

```text
http://
```

Use:

```text
https://
```

where supported by the provider.

## Missing Attribution

OpenStreetMap examples should include visible attribution:

```html
<p class="map-attribution">
    Map data © OpenStreetMap contributors
</p>
```

A successfully rendered provider does not remove attribution or usage-policy obligations.

## Bing Maps Issues

Do not assign a Bing metadata URL directly to `urlTemplate`.

Incorrect:

```typescript
layers: [
    {
        urlTemplate:
            'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/Road'
    }
]
```

Use the asynchronous template resolver:

```typescript
const metadataUrl:
    string =
        'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/Road' +
        '?output=json&uriScheme=https&key=' +
        encodeURIComponent(
            bingMapsKey
        );

const map: Maps =
    new Maps({
        load:
            (args): void => {
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
                                'Unable to resolve the Bing tile URL.',
                                error
                            );
                        }
                    );
            },

        layers: [
            {}
        ]
    });
```

Check:

- The key is authorized.
- The key has not expired.
- The imagery type is valid.
- HTTPS is used.
- The metadata request succeeds.
- The promise rejection is handled.
- CSP permits metadata and tile requests.
- The production key is not logged.

Do not use Bing as an automatic fallback for OpenStreetMap failures. It has separate authentication and provider requirements.

## GeoJSON Loading Issues

## File Not Found

Check:

- File path.
- Filename casing.
- Server root.
- Build output.
- Static-asset configuration.
- Network response status.

Example:

```javascript
fetch(
    './data/world-map.geojson'
);
```

Expected project structure:

```text
project/
|-- data/
|   |-- world-map.geojson
|-- index.html
```

## Fetch Fails Through file Protocol

Do not open fetch-based examples through:

```text
file://
```

Start a local server:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Server Returns HTML Instead of GeoJSON

A missing file can return an HTML error page.

Validate the response:

```javascript
fetch(
    './data/world-map.geojson'
)
    .then(
        function (response) {
            if (!response.ok) {
                throw new Error(
                    'Unable to load GeoJSON. HTTP status: ' +
                    response.status
                );
            }

            return response.json();
        }
    );
```

If JSON parsing fails, inspect the response body in the Network panel.

## Invalid GeoJSON Root

Validate the root object:

```typescript
interface GeoJsonFeatureCollection {
    type: 'FeatureCollection';
    features: unknown[];
}

const validateGeoJson = (
    value:
        unknown
): asserts value is GeoJsonFeatureCollection => {
    if (
        typeof value !==
            'object' ||
        value === null
    ) {
        throw new Error(
            'GeoJSON must be an object.'
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
            'GeoJSON must be a FeatureCollection.'
        );
    }

    if (
        !Array.isArray(
            data.features
        ) ||
        data.features.length === 0
    ) {
        throw new Error(
            'GeoJSON does not contain features.'
        );
    }
};
```

## Incorrect Coordinate Order

GeoJSON coordinates commonly use:

```text
longitude, latitude
```

Application marker objects commonly use named fields:

```typescript
{
    latitude:
        37.7749,
    longitude:
        -122.4194
}
```

Do not reverse coordinate order during preprocessing.

## GeoJSON Is Too Large

Possible symptoms include:

- Slow initial rendering.
- Unresponsive zooming.
- High memory use.
- Long JSON parsing time.
- Browser tab instability.

Consider:

- Reducing unnecessary coordinate precision.
- Simplifying geometry before deployment.
- Loading only the required region.
- Reusing parsed geometry.
- Avoiding repeated fetches.
- Removing unused feature properties.

Preserve the original geographic source before simplification. Validate that small regions and boundaries remain correct.

Do not use TopoJSON directly unless the installed Maps API supports it. Convert it to supported GeoJSON when required.

## Module Injection Issues

Each enabled TypeScript feature requires the matching module.

### Zooming

```typescript
import {
    Maps,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom
);
```

### Markers

```typescript
import {
    Maps,
    Marker
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Marker
);
```

### Bubbles

```typescript
import {
    Bubble,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Bubble
);
```

### Tooltips

```typescript
import {
    Maps,
    MapsTooltip
} from '@syncfusion/ej2-maps';

Maps.Inject(
    MapsTooltip
);
```

### Selection

```typescript
import {
    Maps,
    Selection
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Selection
);
```

### Data Labels

```typescript
import {
    DataLabel,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    DataLabel
);
```

Import and inject modules before constructing Maps.

Incorrect:

```typescript
const map: Maps =
    new Maps({
        layers
    });

Maps.Inject(
    Marker
);
```

Correct:

```typescript
Maps.Inject(
    Marker
);

const map: Maps =
    new Maps({
        layers
    });
```

## Marker Issues

## Marker Settings Is Not an Array

Incorrect:

```typescript
markerSettings: {
    dataSource:
        markerData
}
```

Correct:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            markerData
    }
]
```

## Marker Visibility Is Missing

Incorrect:

```typescript
markerSettings: [
    {
        dataSource:
            markerData
    }
]
```

Correct:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            markerData
    }
]
```

## Coordinate Paths Are Missing

Preferred for named application fields:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            markerData,
        latitudeValuePath:
            'latitude',
        longitudeValuePath:
            'longitude'
    }
]
```

Field names are case-sensitive.

## Invalid Coordinates

Invalid longitude:

```typescript
{
    latitude:
        37.7749,
    longitude:
        200
}
```

Valid:

```typescript
{
    latitude:
        37.7749,
    longitude:
        -122.4194
}
```

Validation:

```typescript
const validateCoordinate = (
    latitude:
        number,
    longitude:
        number
): void => {
    if (
        !Number.isFinite(
            latitude
        ) ||
        latitude < -90 ||
        latitude > 90
    ) {
        throw new Error(
            'Latitude must be between -90 and 90.'
        );
    }

    if (
        !Number.isFinite(
            longitude
        ) ||
        longitude < -180 ||
        longitude > 180
    ) {
        throw new Error(
            'Longitude must be between -180 and 180.'
        );
    }
};
```

## Numeric Strings

Normalize API-provided coordinates before rendering:

```typescript
interface RawLocation {
    name: string;
    latitude: string | number;
    longitude: string | number;
}

interface LocationData {
    name: string;
    latitude: number;
    longitude: number;
}

const normalizeLocations = (
    rawLocations:
        RawLocation[]
): LocationData[] => {
    return rawLocations.map(
        (
            item:
                RawLocation
        ): LocationData => {
            const latitude:
                number =
                    Number(
                        item.latitude
                    );

            const longitude:
                number =
                    Number(
                        item.longitude
                    );

            validateCoordinate(
                latitude,
                longitude
            );

            return {
                name:
                    item.name,
                latitude,
                longitude
            };
        }
    );
};
```

## Marker Outside the Viewport

Use `centerPosition`, not `center`.

```typescript
centerPosition: {
    latitude: 37.7749,
    longitude: -122.4194
}
```

Configure zoom:

```typescript
zoomSettings: {
    enable: true,
    zoomFactor: 5
}
```

Import and inject `Zoom`.

## Marker Click Does Not Fire

Configure the event:

```typescript
const map: Maps =
    new Maps({
        markerClick:
            (args): void => {
                console.log(
                    'Marker clicked.',
                    args
                );
            },

        layers
    });
```

Visual selection is separate:

```typescript
selectionSettings: {
    enable: true
}
```

Marker selection does not need to be enabled merely for click application logic.

Validate the exact marker-click event model and its fields before using event data.

## Bubble Issues

## Bubble Settings Is Not an Array

Incorrect:

```typescript
bubbleSettings: {
    dataSource:
        bubbleData,
    valuePath:
        'population'
}
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

## Bubble Visibility Is Missing

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

## Bubble Is Used as a Coordinate Marker

Bubbles represent values associated with GeoJSON shapes.

Use markers for direct latitude and longitude locations.

Correct bubble architecture:

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
                    bubbleData,
                valuePath:
                    'population',
                minRadius: 5,
                maxRadius: 30
            }
        ]
    }
]
```

## Invalid Bubble Value Path

Data:

```typescript
const bubbleData = [
    {
        country:
            'India',
        population:
            1408000000
    }
];
```

Correct:

```typescript
valuePath:
    'population'
```

Incorrect:

```typescript
valuePath:
    'invalidProperty'
```

## Invalid Bubble Values

Validate:

```typescript
const validateBubbleValue = (
    value:
        number
): void => {
    if (
        !Number.isFinite(
            value
        ) ||
        value < 0
    ) {
        throw new Error(
            'Bubble values must be finite and nonnegative.'
        );
    }
};
```

## Invalid Radius Range

Avoid:

```typescript
minRadius:
    100,

maxRadius:
    10
```

Use:

```typescript
minRadius:
    5,

maxRadius:
    30
```

Validate:

```typescript
if (
    !Number.isFinite(
        minRadius
    ) ||
    !Number.isFinite(
        maxRadius
    ) ||
    minRadius < 0 ||
    maxRadius < minRadius
) {
    throw new Error(
        'Bubble radius settings are invalid.'
    );
}
```

## Shape Data Binding Issues

Application data and GeoJSON shapes are matched through:

```text
shapePropertyPath
shapeDataPath
```

Example:

```typescript
dataSource: [
    {
        country:
            'India',
        value:
            91
    }
],

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

Use the property name exposed by the GeoJSON feature properties:

```typescript
shapePropertyPath:
    'name'
```

Check:

- Exact field casing.
- Whitespace.
- Alternate country names.
- Abbreviations.
- Missing values.
- Duplicate data records.
- GeoJSON naming conventions.

For example, one dataset may use:

```text
United States of America
```

while the application data uses:

```text
United States
```

These values will not match without normalization.

## Color Mapping Issues

## Incorrect Property Name

Incorrect:

```typescript
colorMappings: []
```

Correct:

```typescript
colorMapping: []
```

## Missing Color Value Path

```typescript
shapeSettings: {
    fill: '#e2e8f0',
    colorValuePath:
        'value',

    colorMapping: [
        {
            from: 0,
            to: 49,
            color: '#dbeafe'
        },
        {
            from: 50,
            to: 99,
            color: '#60a5fa'
        },
        {
            from: 100,
            to: 150,
            color: '#1d4ed8'
        }
    ]
}
```

## Overlapping Ranges

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
        color: '#60a5fa'
    }
]
```

For integer values, use clearly separated ranges:

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
        color: '#60a5fa'
    }
]
```

## Gaps Between Ranges

A value outside every mapping uses the configured fallback behavior or fill.

If all expected values must be mapped, validate range coverage before rendering.

```typescript
const ranges = [
    {
        from: 0,
        to: 49
    },
    {
        from: 50,
        to: 99
    },
    {
        from: 100,
        to: 150
    }
];
```

Ensure the application’s expected minimum and maximum values are covered.

## Unvalidated Infinity Boundary

Avoid:

```typescript
{
    from: 100,
    to: Infinity,
    color: '#1d4ed8'
}
```

Use a finite validated maximum:

```typescript
{
    from: 100,
    to: 2000000000,
    color: '#1d4ed8'
}
```

## Numeric Strings

Incorrect source data:

```typescript
{
    country:
        'India',
    value:
        '91'
}
```

Normalize:

```typescript
const value:
    number =
        Number(
            rawItem.value
        );

if (
    !Number.isFinite(
        value
    )
) {
    throw new Error(
        'Color mapping value must be numeric.'
    );
}
```

## Tooltip and Selection Issues

## Marker Tooltip Does Not Appear

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

Configure the tooltip inside the marker entry:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            markerData,
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

## Shape Tooltip Does Not Appear

Shape tooltip settings belong at layer level:

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

        tooltipSettings: {
            visible: true,
            valuePath:
                'country'
        }
    }
]
```

## Bubble Tooltip Does Not Appear

Bubble tooltip settings belong inside a bubble entry:

```typescript
bubbleSettings: [
    {
        visible: true,
        dataSource:
            bubbleData,
        valuePath:
            'population',

        tooltipSettings: {
            visible: true,
            valuePath:
                'country'
        }
    }
]
```

## Selection Does Not Work

Import and inject `Selection`:

```typescript
import {
    Maps,
    Selection
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Selection
);
```

Marker selection belongs inside the marker entry:

```typescript
selectionSettings: {
    enable: true,
    enableMultiSelect: false,
    fill: '#facc15',

    border: {
        color: '#991b1b',
        width: 2
    }
}
```

Shape selection belongs at layer level:

```typescript
layers: [
    {
        shapeData:
            worldMap,

        selectionSettings: {
            enable: true,
            enableMultiSelect: false
        }
    }
]
```

## Marker Clustering Issues

Cluster settings belong inside the marker entry.

Correct:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            markerData,
        latitudeValuePath:
            'latitude',
        longitudeValuePath:
            'longitude',

        clusterSettings: {
            allowClustering: true,
            allowClusterExpand: true,
            allowDeepClustering: true,
            width: 24,
            height: 24,
            fill: '#7c3aed',
            shape: 'Circle',

            border: {
                color: '#ffffff',
                width: 2
            },

            labelStyle: {
                color: '#ffffff',
                size: '12px',
                fontWeight: '600'
            }
        }
    }
]
```

Incorrect:

```typescript
markerClusterSettings: {
    allowClustering: true
}
```

Do not add an unsupported radius property:

```typescript
clusterRadius:
    100
```

Do not use an unverified nested label model:

```typescript
labelSettings: {
    visible: true
}
```

Use:

```typescript
labelStyle: {
    color: '#ffffff'
}
```

If clusters do not appear, verify that:

- Markers are geographically close.
- The current zoom level causes visual overlap.
- `allowClustering` is true.
- Marker coordinates are valid.
- The marker entry is visible.
- Marker data contains multiple nearby items.

## Performance Issues

## Map Freezes During Interaction

Measure:

- GeoJSON feature count.
- Coordinate count.
- Marker count.
- Bubble count.
- Label count.
- Template complexity.
- Animation duration.
- Render-event frequency.
- Data-update frequency.
- Number of `refresh()` calls.

Do not optimize based only on an arbitrary marker threshold.

## Complex Marker Templates

Avoid heavy nested HTML, large images, repeated shadows, and expensive CSS filters.

Prefer a simple template:

```html
<script
    id="simple-marker-template"
    type="text/x-template"
>
    <span class="simple-marker"></span>
</script>
```

```css
.simple-marker {
    display: block;
    width: 18px;
    height: 18px;
    background: #dc2626;
    border: 2px solid #ffffff;
    border-radius: 50%;
}
```

## Excessive Refresh Calls

Incorrect:

```typescript
markerData.forEach(
    (
        marker
    ): void => {
        currentMarkers.push(
            marker
        );

        map.refresh();
    }
);
```

Correct:

```typescript
currentMarkers = [
    ...currentMarkers,
    ...nextMarkers
];

map.layers[0]
    .markerSettings[0]
    .dataSource =
        currentMarkers;

map.refresh();
```

## High-Frequency Event Work

Do not perform expensive calculations or DOM updates for every render or pointer event.

If throttling is required, use a complete implementation:

```typescript
const throttle = <
    TArguments extends
        unknown[]
>(
    callback:
        (
            ...args:
                TArguments
        ) => void,
    interval:
        number
): (
    ...args:
        TArguments
) => void => {
    let lastExecution:
        number =
            0;

    return (
        ...args:
            TArguments
    ): void => {
        const now:
            number =
                Date.now();

        if (
            now -
            lastExecution <
            interval
        ) {
            return;
        }

        lastExecution =
            now;

        callback(
            ...args
        );
    };
};
```

Use throttling only after confirming that the selected event exists and profiling demonstrates a need.

## Large GeoJSON

Recommended options:

- Simplify geometry before deployment.
- Load only required regions.
- Reuse parsed objects.
- Remove unused feature properties.
- Reduce coordinate precision carefully.
- Avoid repeated parsing.
- Cache immutable shape data in application state.

Do not silently replace GeoJSON with TopoJSON unless the Maps API and application pipeline support it.

## Memory and Cleanup

## Destroy Maps

```typescript
map.destroy();
```

Destroy the instance before removing its host from the DOM.

## Remove Application Listeners

```typescript
printButton?.removeEventListener(
    'click',
    handlePrint
);

map.destroy();
```

## Clear Timers

```typescript
if (
    updateTimer !==
    null
) {
    clearTimeout(
        updateTimer
    );

    updateTimer =
        null;
}
```

## Cancel Pending GeoJSON Requests

```typescript
const controller:
    AbortController =
        new AbortController();

fetch(
    './data/world-map.geojson',
    {
        signal:
            controller.signal
    }
);
```

Cleanup:

```typescript
controller.abort();
map.destroy();
```

Handle cancellation separately from real fetch errors:

```typescript
try {
    const response:
        Response =
            await fetch(
                './data/world-map.geojson',
                {
                    signal:
                        controller.signal
                }
            );

    if (!response.ok) {
        throw new Error(
            'Unable to load GeoJSON.'
        );
    }
} catch (
    error:
        unknown
) {
    if (
        error instanceof
            DOMException &&
        error.name ===
            'AbortError'
    ) {
        return;
    }

    console.error(
        error
    );
}
```

## Avoid Retaining Large Data

Do not keep unnecessary duplicate copies of:

- GeoJSON.
- Marker collections.
- Bubble collections.
- Export data.
- Render-event arguments.
- Component instances.

Use application-owned data deliberately and release references when the dynamic view is removed.

## Browser Compatibility

Do not add random vendor prefixes or polyfills before identifying the actual failure.

Diagnose:

- Console errors.
- Unsupported JavaScript syntax.
- Build target.
- CSP.
- Network requests.
- Browser zoom.
- Touch input.
- Pointer events.
- Provider compatibility.
- Storage restrictions.
- Export or print restrictions.

Do not include Internet Explorer 11 polyfills in a modern Maps setup unless the project explicitly targets an authorized legacy environment and the selected EJ2 release supports it.

Use the project’s compiler and bundler configuration to produce output for supported target browsers.

## TypeScript-Specific Issues

## Missing Feature Module

Incorrect:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';

const map: Maps =
    new Maps({
        layers: [
            {
                markerSettings: [
                    {
                        visible: true,
                        dataSource:
                            markerData
                    }
                ]
            }
        ]
    });
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

const map: Maps =
    new Maps({
        layers: [
            {
                markerSettings: [
                    {
                        visible: true,
                        dataSource:
                            markerData,
                        latitudeValuePath:
                            'latitude',
                        longitudeValuePath:
                            'longitude'
                    }
                ]
            }
        ]
    });

map.appendTo(
    '#maps-container'
);
```

## Type Errors in Event Handlers

Do not guess the event type.

Incorrect:

```typescript
markerClick:
    (
        args:
            IUnknownMarkerArgs
    ): void => {
        console.log(
            args.data
        );
    }
```

Use the exact event model exported by the installed package.

If verification is pending, keep the value unknown and guard it:

```typescript
markerClick:
    (
        args:
            unknown
    ): void => {
        console.log(
            'Marker click event:',
            args
        );
    }
```

Inspect the installed declaration files:

```bash
grep -R "markerClick" node_modules/@syncfusion/ej2-maps -n
```

Inspect exported event types:

```bash
grep -R "MarkerClick" node_modules/@syncfusion/ej2-maps -n
```

## Strict Compilation

Run:

```bash
npx tsc --noEmit
```

Useful compiler options include:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "resolveJsonModule": true
  }
}
```

Adopt strict options according to the existing project’s compatibility requirements.

## Stale Bundler Output

When stale build output is suspected:

```bash
rm -rf dist
npm run build
```

Clear tool-specific caches only when necessary.

## JavaScript-Specific Issues

## Global Namespace Is Undefined

Check before constructing Maps:

```javascript
if (
    typeof window.ej ===
        'undefined' ||
    !window.ej.maps
) {
    throw new Error(
        'The EJ2 Maps bundle was not loaded.'
    );
}
```

Load the bundle before application code:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

./<script scr="app.ts"></script>
```

## Mixed Global Bundles

Avoid:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-maps/dist/global/ej2-maps.min.js"
></script>
```

Use the combined bundle alone, or use a fully validated individual-package configuration.

## Mixed Versions

Avoid loading packages from different versions.

Incorrect concept:

```text
ej2-base 32.x
ej2-svg-base 33.x
ej2-maps 31.x
```

Keep all individual package scripts on the same release when that approach is required.

## Script Executes Before the Bundle

Incorrect:

```html
./<script scr="app.ts"></script>

<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

./<script scr="app.ts"></script>
```

## Accessibility Troubleshooting

## Meaning Is Available Only Through Color

Provide:

- Legend labels.
- Shape or marker names.
- Persistent summaries.
- Text details.
- Semantic tables.
- Selection status.

## Tooltip Is the Only Data Source

Important values should also be available through:

- Visible labels.
- A details panel.
- A text summary.
- A semantic table.

## Selected Element Is Not Distinguishable

Use more than fill color:

```typescript
selectionSettings: {
    enable: true,
    fill: '#facc15',

    border: {
        color: '#991b1b',
        width: 2
    }
}
```

Provide a text status describing the selection.

## Focus Is Not Visible

Do not remove focus outlines globally.

Avoid:

```css
*:focus {
    outline: none;
}
```

Use:

```css
.maps-actions button:focus-visible {
    outline: 3px solid #005fcc;
    outline-offset: 3px;
}
```

## Markers Are Difficult to Use on Touch Devices

Increase marker width and height where appropriate:

```typescript
width:
    24,

height:
    24
```

Also provide sufficient spacing around external controls.

## Excessive Live Announcements

Do not announce:

- Every mouse movement.
- Every tooltip render.
- Every pan update.
- Every zoom frame.
- Every marker-rendering event.

Announce meaningful selections, loading completion, and failures.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-maps is installed for TypeScript.
✅ No separate unverified @types package is installed.
✅ Maps imports use the correct package and casing.
✅ Every enabled TypeScript feature has its module imported.
✅ Every required module is injected before Maps construction.
✅ Unused modules are not injected.
✅ The global JavaScript bundle loads before application code.
✅ The global ej.maps namespace exists.
✅ Combined and individual EJ2 bundles are not mixed.
✅ Individual global scripts use the same version when required.
✅ Every script URL ends in .min.js.
✅ The Maps host exists before appendTo.
✅ The appendTo target matches the host ID.
✅ The host has measurable width and height.
✅ Maps width and height use valid CSS-size strings.
✅ Hidden ancestors do not prevent initial measurement.
✅ The layer contains urlTemplate or shapeData.
✅ OpenStreetMap URLs are plain strings.
✅ OpenStreetMap attribution is visible.
✅ Network access to provider services is available.
✅ CSP permits required tile and data requests.
✅ Provider credentials are valid.
✅ Bing metadata is resolved through getBingUrlTemplate.
✅ GeoJSON requests return successful responses.
✅ GeoJSON responses contain JSON rather than HTML.
✅ GeoJSON root type is FeatureCollection.
✅ GeoJSON features are not empty.
✅ shapePropertyPath matches a GeoJSON feature property.
✅ shapeDataPath matches application data.
✅ Field casing and values match exactly.
✅ markerSettings is an array.
✅ Active marker entries use visible: true.
✅ Marker coordinate paths match the data.
✅ Marker latitudes are finite and between -90 and 90.
✅ Marker longitudes are finite and between -180 and 180.
✅ Bubble settings is an array.
✅ Active bubble entries use visible: true.
✅ Bubble data is associated with GeoJSON shapes.
✅ Bubble valuePath matches numeric data.
✅ Bubble values are finite and nonnegative.
✅ Bubble radius settings are valid.
✅ colorMapping is singular.
✅ shapeSettings includes colorValuePath.
✅ Color ranges are finite and nonoverlapping.
✅ Values outside configured ranges have intentional fallback behavior.
✅ Tooltips are configured at the correct level.
✅ Tooltip value paths match the correct data source.
✅ Selection is imported and injected when enabled.
✅ Click events are not confused with visual selection.
✅ Cluster configuration uses clusterSettings.
✅ Cluster labels use labelStyle.
✅ No unsupported clusterRadius is used.
✅ Event names exist in the installed Maps package.
✅ Event argument fields are validated before use.
✅ High-frequency handlers remain lightweight.
✅ Data changes are batched.
✅ refresh is called once after complete updates.
✅ Application-owned listeners are removed.
✅ Pending timers are cleared.
✅ Pending fetches are cancelled where appropriate.
✅ map.destroy() is called when the dynamic host is removed.
✅ Important information is not available only through color or tooltips.
✅ Visible keyboard focus is preserved.
✅ Touch targets are usable.
✅ Provider attribution remains visible.
✅ No encoded HTML replaces executable markup.
✅ No editor-generated anchors or classes remain.
```

## Combined Mistakes and Future References

### Missing Host Dimensions

Incorrect:

```css
#maps-container {
}
```

Correct:

```css
#maps-container {
    width: 100%;
    min-height: 600px;
}
```

### Missing Host Element

Incorrect:

```typescript
map.appendTo(
    '#nonexistent'
);
```

Correct:

```html
<div id="maps-container"></div>
```

```typescript
map.appendTo(
    '#maps-container'
);
```

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

### Incorrect Bing Configuration

Incorrect:

```typescript
{
    type:
        'Bing',
    bingMapType:
        'Road',
    key:
        'YOUR_KEY'
}
```

Preferred validated workflow:

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

### Missing Marker Module

Incorrect:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';
```

with marker settings.

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

### Marker Settings as an Object

Incorrect:

```typescript
markerSettings: {
    dataSource:
        markerData
}
```

Correct:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            markerData
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

### Coordinate-Based Bubbles

Incorrect assumption:

```text
Bubble latitude and longitude fields work like markers
on a tile-provider layer.
```

Correct:

```text
Use markers for direct coordinates.
Use bubbles for data associated with GeoJSON shapes.
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

### Overlapping Color Ranges

Incorrect:

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

For integer values:

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

### Incorrect Cluster Property

Incorrect:

```typescript
markerClusterSettings: {
    allowClustering: true
}
```

Correct:

```typescript
clusterSettings: {
    allowClustering: true
}
```

### Unsupported Cluster Radius

Avoid:

```typescript
clusterSettings: {
    clusterRadius:
        100
}
```

unless the installed model explicitly supports it.

### Incorrect Cluster Label Settings

Incorrect:

```typescript
clusterSettings: {
    labelSettings: {
        visible: true
    }
}
```

Correct:

```typescript
clusterSettings: {
    labelStyle: {
        color: '#ffffff',
        size: '12px'
    }
}
```

### Marker Selection Required for Click Claim

Incorrect:

```text
markerClick requires marker selection to be enabled.
```

Correct:

```text
markerClick handles click application logic.
selectionSettings controls visual selection.
```

### Unverified Event Names

Do not use guessed event names such as:

```text
zoomEnd
panEnd
mouseMove
layerMouseMove
```

Validate event names and event models against the installed package.

### Separate Types Package

Incorrect:

```bash
npm install --save-dev @types/syncfusion__ej2-maps
```

Correct:

```bash
npm install @syncfusion/ej2-maps
```

### Universal Browser Prefix Fix

Avoid adding unrelated prefixes as a generic browser fix:

```css
-webkit-transform:
    translate3d(
        0,
        0,
        0
    );
```

Diagnose the actual browser error first.

### Default Legacy Promise Polyfill

Avoid adding an external Promise polyfill by default.

Validate the supported browser matrix and application compilation target first.

### TopoJSON Used Directly

Do not replace GeoJSON with TopoJSON without a validated conversion or supported API.

Convert unsupported geographic formats to valid GeoJSON before assignment to `shapeData`.

### Debugging Through Internal Selectors

Avoid using internal selectors as the primary diagnostic:

```javascript
document.querySelector(
    '.e-marker'
);
```

Prefer:

- Source data validation.
- Public Maps properties.
- Browser console errors.
- Network requests.
- Host-size inspection.
- Installed type declarations.

### Refresh Inside a Loop

Incorrect:

```typescript
items.forEach(
    (
        item
    ): void => {
        updateItem(
            item
        );

        map.refresh();
    }
);
```

Correct:

```typescript
items.forEach(
    (
        item
    ): void => {
        updateItem(
            item
        );
    }
);

map.refresh();
```

### Missing Cleanup

When the dynamic host is removed:

```typescript
controller.abort();

button.removeEventListener(
    'click',
    handleClick
);

map.destroy();
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

### Malformed Global Script

Incorrect:

```text
https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.jsscript
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Editor-Generated Markup

Remove the following from executable HTML, TypeScript, JavaScript, CSS, imports, commands, templates, and URLs:

```text
<a>
<strong data-lexical-text="true">
<br>
data-lexical-text
Editor-generated class names
Encoded executable HTML
```