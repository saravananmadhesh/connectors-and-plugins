# Map Providers and Selection in Maps

The Syncfusion EJ2 Maps component supports online tile providers, GeoJSON shape maps, markers, bubbles, zooming, panning, highlighting, and selection.

This guide provides framework-neutral TypeScript and JavaScript implementations for:

- OpenStreetMap tile rendering.
- Bing Maps integration.
- Custom tile providers.
- Zooming and panning.
- Selectable markers.
- Selectable GeoJSON shapes.
- Selectable bubbles.
- Single and multiple selection.
- Marker, shape, and bubble events.
- Safe external detail panels.
- Provider security and attribution.
- Runtime validation and troubleshooting.

- #required-modules
- #map-provider-overview
- #openstreetmap
  - #openstreetmap-configuration
  - #openstreetmap-attribution
- #bing-maps
  - #bing-maps-prerequisites
  - #bing-imagery-types
  - #bing-maps-configuration
  - #bing-maps-key-handling
- #custom-tile-providers
- #zooming-and-panning
- #marker-selection
  - #marker-selection-settings
  - #marker-multi-selection
  - #initial-marker-selection
  - #marker-click-event
- #shape-selection
  - #shape-selection-settings
  - #shape-multi-selection
  - #shape-selection-event
- #bubble-selection
- #world-map-data-setup
  - #download-the-world-map-file
  - #validate-the-world-map-file
  - #import-the-world-map-in-typescript
- #complete-typescript-openstreetmap-example
- #complete-javascript-openstreetmap-example
- #complete-typescript-shape-selection-example
- #complete-javascript-shape-selection-example
- #provider-security-and-deployment
- #accessibility-guidance
- #runtime-validation-checklist
- #troubleshooting
- #combined-mistakes-and-future-references

## Required Modules

TypeScript Maps features require their corresponding modules to be imported and injected before creating the Maps instance.

Feature mapping:

```text
Zooming and panning -> Zoom
Markers             -> Marker
Bubbles             -> Bubble
Selection           -> Selection
Tooltips            -> MapsTooltip
Navigation lines    -> NavigationLine
```

Example for an OpenStreetMap layer with selectable markers, tooltips, zooming, and panning:

```typescript
import {
    Maps,
    MapsTooltip,
    Marker,
    Selection,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Marker,
    Selection,
    MapsTooltip
);
```

Example for a GeoJSON shape map with selection and zooming:

```typescript
import {
    Maps,
    Selection,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Selection
);
```

Example for selectable bubbles:

```typescript
import {
    Bubble,
    Maps,
    MapsTooltip,
    Selection,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Bubble,
    Selection,
    MapsTooltip
);
```

Only import and inject modules used by the example.

When using the complete global EJ2 JavaScript bundle, explicit module injection is not required.

## Map Provider Overview

A map provider supplies the background tiles displayed by a tile-based Maps layer.

Provider selection is independent of shape, marker, or bubble selection. Selection is implemented by the Maps component and its configured layers.

Common provider categories include:

```text
OpenStreetMap
Bing Maps
Azure Maps
Custom tile providers
Other third-party tile services
```

Every provider may have different requirements for:

- Authentication.
- API keys.
- Attribution.
- Pricing.
- Usage limits.
- Request rates.
- Caching.
- Allowed applications.
- Content Security Policy.
- Tile URL formats.
- Browser restrictions.

Review the selected provider's current terms before deploying a production application.

## OpenStreetMap

OpenStreetMap can be rendered through a tile URL template.

It does not require:

```text
world-map.ts
world-map.json
world-map.geojson
shapeData
```

The browser requests tiles from the configured OpenStreetMap tile service.

## OpenStreetMap Configuration

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
        ]
    });

map.appendTo(
    '#maps-container'
);
```

Do not wrap the tile URL in an HTML anchor.

Do not add:

```typescript
type: 'OSM'
```

unless the installed `LayerSettingsModel` explicitly requires it for the selected implementation.

## OpenStreetMap Attribution

Display attribution required by the tile provider.

```html
<p class="map-attribution">
    Map data © OpenStreetMap contributors
</p>
```

Do not describe the public OpenStreetMap tile service as having unrestricted or unlimited production usage.

A production application must consider:

- Attribution requirements.
- Tile usage policies.
- Service capacity.
- Rate controls.
- Caching rules.
- Network availability.
- Failure handling.
- Commercial usage suitability.

## Bing Maps

Bing Maps requires an authorized key and an asynchronous metadata request.

Do not assign the Bing metadata endpoint directly to `urlTemplate`.

The Maps component's `getBingUrlTemplate()` method resolves the Bing metadata response into a tile URL template.

## Bing Maps Prerequisites

Before using Bing Maps:

1. Confirm that the application has access to an authorized Bing Maps account or key.
2. Review the current provider requirements.
3. Restrict the key where supported.
4. Do not commit a production key to a public repository.
5. Confirm that the imagery type is available.
6. Handle metadata request failures.
7. Use HTTPS.

New Microsoft mapping projects should verify which Microsoft geospatial service is currently appropriate before assuming that a new Bing Maps key can be created.

## Bing Imagery Types

Common Bing imagery types include:

```text
Aerial
AerialWithLabel
Road
CanvasDark
CanvasLight
CanvasGray
```

Do not use an unsupported or misspelled imagery type.

Incorrect:

```text
Collinette
```

## Bing Maps Configuration

```typescript
import {
    Maps,
    type ILoadEventArgs
} from '@syncfusion/ej2-maps';

const bingMapsKey:
    string =
        'YOUR_AUTHORIZED_BING_MAPS_KEY';

const bingMapType:
    string =
        'AerialWithLabel';

const bingMetadataUrl:
    string =
        'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/' +
        bingMapType +
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
                    bingMetadataUrl
                )
                .then(
                    (
                        url:
                            string
                    ): void => {
                        args.maps
                            .layers[0]
                            .urlTemplate =
                                url;
                    }
                )
                .catch(
                    (
                        error:
                            unknown
                    ): void => {
                        console.error(
                            'Unable to resolve the Bing Maps tile template.',
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

Validate the exact load-event model exported by the installed `@syncfusion/ej2-maps` version.

The layer starts empty because the Bing tile URL is resolved asynchronously during loading.

## Bing Maps Key Handling

Do not place a production key directly into source control.

Development placeholder:

```typescript
const bingMapsKey:
    string =
        'YOUR_AUTHORIZED_BING_MAPS_KEY';
```

A bundler-based application can supply the key through build-time configuration.

The exact environment-variable mechanism depends on the selected build tool.

Example concept:

```typescript
const bingMapsKey:
    string =
        applicationConfiguration
            .bingMapsKey;
```

Browser applications expose any key required to request client-side map tiles. Apply provider-supported restrictions and monitoring.

Do not log keys:

```typescript
console.log(
    bingMapsKey
);
```

## Custom Tile Providers

A compatible third-party tile provider can be configured through `urlTemplate`.

```typescript
const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        layers: [
            {
                urlTemplate:
                    'https://provider.example.com/' +
                    'level/tileX/tileY.png' +
                    '?key=YOUR_PROVIDER_KEY'
            }
        ]
    });

map.appendTo(
    '#maps-container'
);
```

Before using a custom provider:

- Verify the provider's expected placeholders.
- Convert provider placeholders when necessary.
- Use HTTPS.
- Validate authentication parameters.
- Review attribution requirements.
- Review rate and caching policies.
- Handle authentication and request failures.
- Restrict keys where possible.
- Update Content Security Policy.
- Confirm cross-origin tile access.

Do not assume that a provider's `{z}/{x}/{y}` URL can be copied directly into Maps without adaptation.

The Maps template normally uses:

```text
level
tileX
tileY
```

## Zooming and Panning

Import and inject `Zoom` in TypeScript.

```typescript
import {
    Maps,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom
);
```

Configure supported interactions:

```typescript
zoomSettings: {
    enable: true,
    enablePanning: true,
    mouseWheelZoom: true,
    pinchZooming: true,
    zoomOnClick: false,
    doubleClickZoom: true,
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
}
```

Interaction behavior is configurable. Do not assume that every interaction is enabled automatically.

## Marker Selection

Markers represent geographic locations identified by latitude and longitude.

`markerSettings` is an array on the layer.

Required data model:

```typescript
interface LocationData {
    id: string;
    name: string;
    category: string;
    latitude: number;
    longitude: number;
}
```

Example data:

```typescript
const locationData:
    LocationData[] = [
        {
            id: 'sf-office',
            name:
                'San Francisco Office',
            category:
                'Office',
            latitude:
                37.7749,
            longitude:
                -122.4194
        },
        {
            id: 'sacramento-capital',
            name:
                'Sacramento',
            category:
                'Capital',
            latitude:
                38.5816,
            longitude:
                -121.4944
        },
        {
            id: 'san-jose-office',
            name:
                'San Jose Office',
            category:
                'Office',
            latitude:
                37.3382,
            longitude:
                -121.8863
        }
    ];
```

## Marker Selection Settings

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
        width: 18,
        height: 18,
        fill: '#2563eb',

        border: {
            color: '#ffffff',
            width: 2
        },

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
                'name'
        }
    }
]
```

The `opacity` value controls the appearance of the selected item. It does not represent the opacity of every unselected marker.

Required modules:

```typescript
import {
    Maps,
    MapsTooltip,
    Marker,
    Selection
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Marker,
    Selection,
    MapsTooltip
);
```

## Marker Multi-Selection

Enable multiple marker selection:

```typescript
selectionSettings: {
    enable: true,
    enableMultiSelect: true,
    fill: '#facc15',

    border: {
        color: '#991b1b',
        width: 2
    }
}
```

Do not promise a particular Ctrl+Click or modifier-key behavior without testing it against the installed Maps version, operating system, browser, and input device.

## Initial Marker Selection

Initial marker selection works only when marker selection is enabled.

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

        selectionSettings: {
            enable: true,
            enableMultiSelect: false,
            fill: '#facc15'
        },

        initialMarkerSelection: [
            {
                latitude:
                    37.7749,
                longitude:
                    -122.4194
            }
        ]
    }
]
```

## Marker Click Event

Use `markerClick` for application logic associated with a marker click.

The click event and visual selection settings are separate concerns.

```typescript
const handleMarkerClick = (
    args:
        unknown
): void => {
    console.log(
        'A marker was clicked.',
        args
    );
};
```

Use the exact marker-click event model exported by the installed Maps package.

Do not assume an event member exists until it has been validated.

When application marker data is available from the event, validate it before using it.

```typescript
const isLocationData = (
    value:
        unknown
): value is LocationData => {
    if (
        typeof value !==
            'object' ||
        value ===
            null
    ) {
        return false;
    }

    const item =
        value as
            Partial<
                LocationData
            >;

    return (
        typeof item.id ===
            'string' &&
        typeof item.name ===
            'string' &&
        typeof item.latitude ===
            'number' &&
        Number.isFinite(
            item.latitude
        ) &&
        typeof item.longitude ===
            'number' &&
        Number.isFinite(
            item.longitude
        )
    );
};
```

## Safe Marker Detail Panel

Required HTML:

```html
<section
    id="marker-details"
    class="details-panel"
    aria-live="polite"
    aria-labelledby="marker-details-heading"
>
    <h2 id="marker-details-heading">
        Location details
    </h2>

    <p>
        Select a marker to view its details.
    </p>
</section>
```

Safe DOM update:

```typescript
const renderMarkerDetails = (
    marker:
        LocationData
): void => {
    const details:
        HTMLElement | null =
            document.getElementById(
                'marker-details'
            );

    if (!details) {
        return;
    }

    details.replaceChildren();

    const heading:
        HTMLHeadingElement =
            document.createElement(
                'h2'
            );

    heading.id =
        'marker-details-heading';

    heading.textContent =
        marker.name;

    const category:
        HTMLParagraphElement =
            document.createElement(
                'p'
            );

    category.textContent =
        'Category: ' +
        marker.category;

    const coordinates:
        HTMLParagraphElement =
            document.createElement(
                'p'
            );

    coordinates.textContent =
        'Latitude: ' +
        marker.latitude +
        ', Longitude: ' +
        marker.longitude;

    details.append(
        heading,
        category,
        coordinates
    );
};
```

Do not assign untrusted data through `innerHTML`.

## Shape Selection

Shape selection applies to a GeoJSON shape layer.

It requires:

- Complete GeoJSON `shapeData`.
- The `Selection` module in TypeScript.
- Selection settings at the layer level.
- Valid shape binding when application data is used.

## Shape Selection Settings

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
        },

        selectionSettings: {
            enable: true,
            enableMultiSelect: false,
            fill: '#facc15',
            opacity: 1,

            border: {
                color: '#991b1b',
                width: 2
            }
        }
    }
]
```

Selection settings belong on the layer.

Incorrect:

```typescript
shapeSettings: {
    selectionSettings: {
        enable: true
    }
}
```

Correct:

```typescript
layers: [
    {
        shapeData:
            worldMap,

        selectionSettings: {
            enable: true
        }
    }
]
```

## Shape Multi-Selection

```typescript
selectionSettings: {
    enable: true,
    enableMultiSelect: true,
    fill: '#facc15',

    border: {
        color: '#991b1b',
        width: 2
    }
}
```

## Shape Selection Event

Use the validated `shapeSelected` event for shape-selection application logic.

```typescript
const map: Maps =
    new Maps({
        shapeSelected: (
            args:
                unknown
        ): void => {
            console.log(
                'A map shape was selected.',
                args
            );
        },

        layers
    });
```

Replace `unknown` with the exact exported event model after validating the installed package.

Do not assume that:

```typescript
args.shapeData.properties.name
```

always exists. GeoJSON property structures vary among datasets.

## Shape Detail Panel

Use an application-owned helper that accepts an already validated region name.

```typescript
const renderShapeDetails = (
    regionName:
        string
): void => {
    const details:
        HTMLElement | null =
            document.getElementById(
                'shape-details'
            );

    if (!details) {
        return;
    }

    details.textContent =
        'Selected region: ' +
        regionName;
};
```

Determine `regionName` from a validated event field or from the application's shape-binding data.

## Bubble Selection

`bubbleSettings` is an array on a GeoJSON shape layer.

Data model:

```typescript
interface BubbleData {
    country: string;
    population: number;
}
```

Example:

```typescript
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
                    bubbleData,
                valuePath:
                    'population',
                minRadius: 5,
                maxRadius: 30,
                fill: '#2563eb',
                opacity: 0.8,

                selectionSettings: {
                    enable: true,
                    enableMultiSelect: false,
                    fill: '#22c55e',
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
]
```

Required modules:

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

Use `bubbleClick` for validated bubble-click application logic.

```typescript
const map: Maps =
    new Maps({
        bubbleClick: (
            args:
                unknown
        ): void => {
            console.log(
                'A bubble was clicked.',
                args
            );
        },

        layers
    });
```

Use the exact exported event model for production code.

## World Map Data Setup

GeoJSON shape and bubble examples require a complete world-map file.

OpenStreetMap marker examples do not require this file.

## Download the World Map File

Create a data directory:

```bash
mkdir -p src/data
```

Download the Natural Earth-derived GeoJSON file:

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

Manual download:

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

const filePath =
    'src/data/world-map.geojson';

const text =
    await readFile(
        filePath,
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

Rename the GeoJSON file:

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

## Complete TypeScript OpenStreetMap Example

This example provides:

- OpenStreetMap tiles.
- Zooming and panning.
- Selectable markers.
- Marker tooltips.
- Marker-click details.
- Visible attribution.
- A polite selection-status region.

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
        OpenStreetMap Marker Selection
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
                California Locations
            </h1>

            <p id="maps-description">
                Select a marker to view the location name,
                category, and coordinates.
            </p>

            <div id="maps-container"></div>

            <p class="map-attribution">
                Map data © OpenStreetMap contributors
            </p>

            <section
                id="marker-details"
                class="details-panel"
                aria-live="polite"
                aria-labelledby="marker-details-heading"
            >
                <h2 id="marker-details-heading">
                    Location details
                </h2>

                <p>
                    Select a marker to view its details.
                </p>
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

.map-attribution {
    margin: 8px 0 0;
    color: #475569;
    font-size: 12px;
}

.details-panel {
    margin-top: 20px;
    padding: 16px;
    color: #111827;
    background: #f8fafc;
    border: 1px solid #94a3b8;
    border-radius: 6px;
}

.details-panel h2 {
    margin: 0 0 8px;
    font-size: 18px;
}

.details-panel p {
    margin: 4px 0;
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
    Maps,
    MapsTooltip,
    Marker,
    Selection,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Marker,
    Selection,
    MapsTooltip
);

interface LocationData {
    id: string;
    name: string;
    category: string;
    latitude: number;
    longitude: number;
}

const locationData:
    LocationData[] = [
        {
            id: 'sf-office',
            name:
                'San Francisco Office',
            category:
                'Office',
            latitude:
                37.7749,
            longitude:
                -122.4194
        },
        {
            id:
                'sacramento-capital',
            name:
                'Sacramento',
            category:
                'Capital',
            latitude:
                38.5816,
            longitude:
                -121.4944
        },
        {
            id:
                'san-jose-office',
            name:
                'San Jose Office',
            category:
                'Office',
            latitude:
                37.3382,
            longitude:
                -121.8863
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
                    'Every location requires a nonempty ID.'
                );
            }

            if (
                ids.has(
                    location.id
                )
            ) {
                throw new Error(
                    'Duplicate location ID: ' +
                    location.id
                );
            }

            if (
                !location.name.trim()
            ) {
                throw new Error(
                    'Every location requires a name.'
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
                    'Invalid latitude for "' +
                    location.name +
                    '".'
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
                    'Invalid longitude for "' +
                    location.name +
                    '".'
                );
            }

            ids.add(
                location.id
            );
        }
    );
};

const renderMarkerDetails = (
    marker:
        LocationData
): void => {
    const details:
        HTMLElement | null =
            document.getElementById(
                'marker-details'
            );

    if (!details) {
        return;
    }

    details.replaceChildren();

    const heading:
        HTMLHeadingElement =
            document.createElement(
                'h2'
            );

    heading.id =
        'marker-details-heading';

    heading.textContent =
        marker.name;

    const category:
        HTMLParagraphElement =
            document.createElement(
                'p'
            );

    category.textContent =
        'Category: ' +
        marker.category;

    const coordinates:
        HTMLParagraphElement =
            document.createElement(
                'p'
            );

    coordinates.textContent =
        'Latitude: ' +
        marker.latitude +
        ', Longitude: ' +
        marker.longitude;

    details.append(
        heading,
        category,
        coordinates
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
            doubleClickZoom: true,
            minZoom: 1,
            maxZoom: 13,
            zoomFactor: 6,

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
                        width: 18,
                        height: 18,
                        fill: '#2563eb',

                        border: {
                            color: '#ffffff',
                            width: 2
                        },

                        selectionSettings: {
                            enable: true,
                            enableMultiSelect:
                                false,
                            fill: '#facc15',
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
                                'name'
                        }
                    }
                ]
            }
        ],

        markerClick: (
            args:
                unknown
        ): void => {
            const eventData =
                args as {
                    data?:
                        unknown;
                };

            if (
                typeof eventData.data !==
                    'object' ||
                eventData.data ===
                    null
            ) {
                return;
            }

            const candidate =
                eventData.data as
                    Partial<
                        LocationData
                    >;

            const selected:
                LocationData | undefined =
                    locationData.find(
                        (
                            location:
                                LocationData
                        ): boolean => {
                            return (
                                candidate.id ===
                                location.id
                            );
                        }
                    );

            if (!selected) {
                return;
            }

            renderMarkerDetails(
                selected
            );

            if (statusElement) {
                statusElement.textContent =
                    selected.name +
                    ' was selected.';
            }
        },

        loaded: (): void => {
            if (statusElement) {
                statusElement.textContent =
                    'The California location map loaded successfully.';
            }
        }
    });

map.appendTo(
    host
);
```

The exact marker-click event type and the event data member must be validated against the installed package. The runtime guard prevents unvalidated event data from being blindly trusted.

## Complete JavaScript OpenStreetMap Example

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
        OpenStreetMap Marker Selection
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

        .map-attribution {
            margin: 8px 0 0;
            color: #475569;
            font-size: 12px;
        }

        .details-panel {
            margin-top: 20px;
            padding: 16px;
            color: #111827;
            background: #f8fafc;
            border: 1px solid #94a3b8;
            border-radius: 6px;
        }

        .details-panel h2 {
            margin: 0 0 8px;
            font-size: 18px;
        }

        .details-panel p {
            margin: 4px 0;
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
                California Locations
            </h1>

            <p id="maps-description">
                Select a marker to view the location name,
                category, and coordinates.
            </p>

            <div id="maps-container"></div>

            <p class="map-attribution">
                Map data © OpenStreetMap contributors
            </p>

            <section
                id="marker-details"
                class="details-panel"
                aria-live="polite"
                aria-labelledby="marker-details-heading"
            >
                <h2 id="marker-details-heading">
                    Location details
                </h2>

                <p>
                    Select a marker to view its details.
                </p>
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

    <script>
        var locationData = [
            {
                id: 'sf-office',
                name:
                    'San Francisco Office',
                category:
                    'Office',
                latitude:
                    37.7749,
                longitude:
                    -122.4194
            },
            {
                id:
                    'sacramento-capital',
                name:
                    'Sacramento',
                category:
                    'Capital',
                latitude:
                    38.5816,
                longitude:
                    -121.4944
            },
            {
                id:
                    'san-jose-office',
                name:
                    'San Jose Office',
                category:
                    'Office',
                latitude:
                    37.3382,
                longitude:
                    -121.8863
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
                            'Every location requires a nonempty ID.'
                        );
                    }

                    if (
                        ids.has(
                            location.id
                        )
                    ) {
                        throw new Error(
                            'Duplicate location ID: ' +
                            location.id
                        );
                    }

                    if (
                        typeof location.name !==
                            'string' ||
                        location.name
                            .trim()
                            .length === 0
                    ) {
                        throw new Error(
                            'Every location requires a name.'
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
                            'Invalid latitude for "' +
                            location.name +
                            '".'
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
                            'Invalid longitude for "' +
                            location.name +
                            '".'
                        );
                    }

                    ids.add(
                        location.id
                    );
                }
            );
        }

        function renderMarkerDetails(
            marker
        ) {
            var details =
                document.getElementById(
                    'marker-details'
                );

            if (!details) {
                return;
            }

            details.replaceChildren();

            var heading =
                document.createElement(
                    'h2'
                );

            heading.id =
                'marker-details-heading';

            heading.textContent =
                marker.name;

            var category =
                document.createElement(
                    'p'
                );

            category.textContent =
                'Category: ' +
                marker.category;

            var coordinates =
                document.createElement(
                    'p'
                );

            coordinates.textContent =
                'Latitude: ' +
                marker.latitude +
                ', Longitude: ' +
                marker.longitude;

            details.append(
                heading,
                category,
                coordinates
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
                    doubleClickZoom: true,
                    minZoom: 1,
                    maxZoom: 13,
                    zoomFactor: 6,

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
                                width: 18,
                                height: 18,
                                fill: '#2563eb',

                                border: {
                                    color:
                                        '#ffffff',
                                    width: 2
                                },

                                selectionSettings: {
                                    enable: true,
                                    enableMultiSelect:
                                        false,
                                    fill: '#facc15',
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
                                        'name'
                                }
                            }
                        ]
                    }
                ],

                markerClick:
                    function (args) {
                        var candidate =
                            args &&
                            args.data;

                        if (
                            !candidate ||
                            typeof candidate !==
                                'object'
                        ) {
                            return;
                        }

                        var selected =
                            locationData.find(
                                function (
                                    location
                                ) {
                                    return (
                                        candidate.id ===
                                        location.id
                                    );
                                }
                            );

                        if (!selected) {
                            return;
                        }

                        renderMarkerDetails(
                            selected
                        );

                        if (
                            statusElement
                        ) {
                            statusElement.textContent =
                                selected.name +
                                ' was selected.';
                        }
                    },

                loaded:
                    function () {
                        if (
                            statusElement
                        ) {
                            statusElement.textContent =
                                'The California location map loaded successfully.';
                        }
                    }
            });

        map.appendTo(
            host
        );
    </script>
</body>
</html>
```

## Complete TypeScript Shape Selection Example

This example uses a local GeoJSON world map.

### Required Data Setup

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
        World Map Shape Selection
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
                Select a Country
            </h1>

            <p id="maps-description">
                Select one or more country shapes. Selected
                countries use a yellow fill and dark red border.
            </p>

            <div id="maps-container"></div>

            <p
                id="shape-details"
                class="details-panel"
                aria-live="polite"
            >
                No country is selected.
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

.details-panel {
    margin-top: 16px;
    padding: 12px;
    color: #111827;
    background: #f8fafc;
    border: 1px solid #94a3b8;
    border-radius: 6px;
}
```

### app.ts

```typescript
import {
    Maps,
    Selection,
    Zoom
} from '@syncfusion/ej2-maps';

import worldMap
    from './data/world-map.json';

Maps.Inject(
    Zoom,
    Selection
);

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

validateWorldMap(
    worldMap
);

const host:
    HTMLElement | null =
        document.getElementById(
            'maps-container'
        );

const details:
    HTMLElement | null =
        document.getElementById(
            'shape-details'
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

        zoomSettings: {
            enable: true,
            enablePanning: true,
            minZoom: 1,
            maxZoom: 10,
            zoomFactor: 1
        },

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
                },

                selectionSettings: {
                    enable: true,
                    enableMultiSelect: true,
                    fill: '#facc15',
                    opacity: 1,

                    border: {
                        color: '#991b1b',
                        width: 2
                    }
                }
            }
        ],

        shapeSelected: (
            args:
                unknown
        ): void => {
            console.log(
                'A shape was selected.',
                args
            );

            if (details) {
                details.textContent =
                    'A country shape was selected. ' +
                    'Inspect the validated event argument to obtain ' +
                    'the country property used by your GeoJSON file.';
            }
        }
    });

map.appendTo(
    host
);
```

The exact shape-property member exposed by `shapeSelected` depends on the installed event model and the GeoJSON property structure. Validate it before reading a country name.

## Complete JavaScript Shape Selection Example

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

    <title>
        World Map Shape Selection
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
        }

        .maps-card > p {
            margin: 0 0 16px;
            line-height: 1.5;
        }

        #maps-container {
            width: 100%;
            min-height: 600px;
        }

        .details-panel {
            margin-top: 16px;
            padding: 12px;
            color: #111827;
            background: #f8fafc;
            border: 1px solid #94a3b8;
            border-radius: 6px;
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
                Select a Country
            </h1>

            <p id="maps-description">
                Select one or more country shapes. Selected
                countries use a yellow fill and dark red border.
            </p>

            <div id="maps-container"></div>

            <p
                id="shape-details"
                class="details-panel"
                aria-live="polite"
            >
                Loading the world map.
            </p>
        </section>
    </main>

    <script>
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

        var host =
            document.getElementById(
                'maps-container'
            );

        var details =
            document.getElementById(
                'shape-details'
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

                            zoomSettings: {
                                enable: true,
                                enablePanning: true,
                                minZoom: 1,
                                maxZoom: 10,
                                zoomFactor: 1
                            },

                            layers: [
                                {
                                    shapeData:
                                        worldMap,

                                    shapeSettings: {
                                        fill: '#dbeafe',

                                        border: {
                                            color:
                                                '#64748b',
                                            width: 0.5
                                        }
                                    },

                                    selectionSettings: {
                                        enable: true,
                                        enableMultiSelect:
                                            true,
                                        fill: '#facc15',
                                        opacity: 1,

                                        border: {
                                            color:
                                                '#991b1b',
                                            width: 2
                                        }
                                    }
                                }
                            ],

                            shapeSelected:
                                function (args) {
                                    console.log(
                                        'A shape was selected.',
                                        args
                                    );

                                    if (
                                        details
                                    ) {
                                        details.textContent =
                                            'A country shape was selected. ' +
                                            'Validate the event data and GeoJSON ' +
                                            'property structure before displaying ' +
                                            'the country name.';
                                    }
                                },

                            loaded:
                                function () {
                                    if (
                                        details
                                    ) {
                                        details.textContent =
                                            'The world map loaded. Select a country.';
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
                        details
                    ) {
                        details.textContent =
                            'The world map could not be loaded. ' +
                            error.message;
                    }
                }
            );
    </script>
</body>
</html>
```

Run through a local server:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Provider Security and Deployment

### HTTPS

Use HTTPS provider URLs.

Avoid:

```text
http://
```

Preferred:

```text
https://
```

Mixed-content policies can block HTTP tile requests from an HTTPS application.

### Content Security Policy

A Content Security Policy may need to permit:

- The EJ2 script origin.
- The tile image origin.
- GeoJSON fetch origins.
- Bing metadata requests.
- Custom provider API requests.

Example policy requirements depend on the selected provider and application architecture.

### API Keys

Do not:

- Commit production keys to public repositories.
- Log keys.
- Place unrestricted keys in documentation.
- Share one unrestricted key among unrelated environments.
- Assume browser-side keys are secret.

Use provider-supported restrictions and monitoring.

### Attribution

Display the attribution required by the provider.

Do not assume that attribution is optional.

### Rate and Usage Limits

Do not make permanent claims such as:

```text
No usage limits
Unlimited free tiles
No throttling
Always free
```

Provider terms, prices, availability, quotas, and rate policies can change.

### Failure Handling

Applications should handle:

- Metadata request failures.
- Authentication failures.
- Missing keys.
- Invalid keys.
- Tile-service outages.
- Network loss.
- CSP restrictions.
- Invalid provider responses.
- GeoJSON fetch failures.

Keep failure messages useful but do not expose secrets.

## Accessibility Guidance

1. Do not rely only on selected fill color.

2. Update a visible detail panel when a marker, shape, or bubble is selected.

3. Use meaningful names for markers and data regions.

4. Use a selection border that contrasts with selected and unselected fills.

5. Preserve visible keyboard focus.

6. Test selection using keyboard, mouse, touch, and screen-reader combinations supported by the application.

7. Do not put essential information only in a tooltip.

8. Use native buttons for application-owned controls.

9. Keep live announcements limited to meaningful selections and data updates.

10. Avoid announcing every pointer movement or zoom change.

11. Provide persistent text explaining what selection does.

12. Ensure multi-selection status can be understood without color.

13. Keep marker targets usable on touch screens.

14. Avoid interactions requiring highly precise pointer movement.

15. Verify browser zoom and reflow behavior.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-maps is installed for TypeScript.
✅ Maps is imported.
✅ Zoom is imported and injected when zooming is enabled.
✅ Marker is imported and injected when markers are used.
✅ Bubble is imported and injected when bubbles are used.
✅ Selection is imported and injected when selection is enabled.
✅ MapsTooltip is imported and injected when tooltips are enabled.
✅ NavigationLine is imported and injected when navigation lines are used.
✅ Every injected module is imported.
✅ Unused modules are not injected.
✅ Global JavaScript does not call Maps.Inject.
✅ The global EJ2 bundle loads before application code.
✅ Every CDN script URL ends in .min.js.
✅ The Maps host element exists.
✅ The host ID matches the appendTo selector.
✅ The host has a measurable height.
✅ centerPosition is used instead of center.
✅ Tile URLs are plain strings.
✅ OSM URLs contain level, tileX, and tileY placeholders.
✅ OSM attribution is visible.
✅ Provider terms have been reviewed.
✅ Provider authentication is configured.
✅ Production keys are not committed to public source control.
✅ Bing metadata is resolved through getBingUrlTemplate.
✅ Bing metadata uses HTTPS.
✅ Bing promise failures are handled.
✅ markerSettings is an array.
✅ bubbleSettings is an array.
✅ Marker visible is true.
✅ Bubble visible is true.
✅ Latitude and longitude paths match marker data.
✅ Latitude values are finite and between -90 and 90.
✅ Longitude values are finite and between -180 and 180.
✅ Shape selectionSettings is placed on the layer.
✅ Marker selectionSettings is placed in a marker entry.
✅ Bubble selectionSettings is placed in a bubble entry.
✅ enableMultiSelect is configured intentionally.
✅ Selection opacity is understood as selected-item opacity.
✅ GeoJSON shape data exists for shape selection.
✅ GeoJSON root type is FeatureCollection.
✅ GeoJSON features are not empty.
✅ Shape-data fields match GeoJSON properties.
✅ Event names exist in the installed Maps package.
✅ Event argument members are validated before use.
✅ Event data is checked before casting.
✅ DOM updates use textContent rather than unsafe innerHTML.
✅ High-frequency events do not perform expensive logging.
✅ Refresh is not repeatedly called inside update loops.
✅ Important selection state is available without relying only on color.
✅ Application-owned listeners and timers are cleaned up.
✅ map.destroy() is called when a dynamic host is removed.
✅ No encoded HTML replaces executable markup.
✅ No rich-text anchor wraps a tile URL.
✅ No malformed .jsscript URL exists.
```

## Troubleshooting

### OpenStreetMap Tiles Do Not Load

Check:

- The URL is correct.
- The URL is a plain JavaScript string.
- The browser has network access.
- CSP permits tile images.
- The provider is available.
- The page uses HTTPS.
- No rich-text markup is embedded in the URL.

Correct:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/level/tileX/tileY.png'
```

### Bing Maps Does Not Load

Check:

- An authorized key is available.
- The key was appended to the metadata URL.
- The metadata request uses HTTPS.
- `getBingUrlTemplate()` is called.
- The returned promise resolves.
- The resolved URL is assigned to the layer.
- Metadata errors are caught.
- CSP permits the metadata and tile origins.

Do not assign the metadata endpoint directly to `urlTemplate`.

### Zooming Does Not Work

Import and inject `Zoom`:

```typescript
import {
    Maps,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom
);
```

Enable zooming:

```typescript
zoomSettings: {
    enable: true
}
```

### Panning Does Not Work

```typescript
zoomSettings: {
    enable: true,
    enablePanning: true
}
```

Ensure `Zoom` is injected in TypeScript.

### Marker Does Not Render

Check:

- `Marker` is injected.
- `markerSettings` is an array.
- `visible` is true.
- Latitude and longitude paths are configured.
- Data fields match the paths.
- Coordinates are numeric and valid.
- The marker is within the visible map region.

### Marker Does Not Select

Check:

```typescript
selectionSettings: {
    enable: true
}
```

Ensure `Selection` is imported and injected.

The marker-click event does not replace marker selection settings.

### Shape Does Not Select

Selection settings must be on the layer:

```typescript
layers: [
    {
        shapeData:
            worldMap,

        selectionSettings: {
            enable: true
        }
    }
]
```

Do not place them inside `shapeSettings`.

### Bubble Does Not Select

Check:

- `Bubble` is injected.
- `Selection` is injected.
- `bubbleSettings` is an array.
- `visible` is true.
- `valuePath` matches a finite numeric field.
- `selectionSettings.enable` is true.

### Multiple Selection Does Not Work

Set:

```typescript
enableMultiSelect:
    true
```

Do not rely on undocumented modifier-key behavior.

### Shape Event Does Not Contain the Expected Name

GeoJSON property structures differ among datasets.

Inspect the validated event object and the GeoJSON properties. Do not assume:

```typescript
args.shapeData.properties.name
```

exists in every dataset or Maps version.

### Detail Panel Is Unsafe

Avoid:

```typescript
details.innerHTML =
    '<h2>' +
    marker.name +
    '</h2>';
```

Use:

```typescript
const heading:
    HTMLHeadingElement =
        document.createElement(
            'h2'
        );

heading.textContent =
    marker.name;
```

### GeoJSON Does Not Load

Do not open a `fetch()` example through:

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

### Global Namespace Is Undefined

Ensure the complete EJ2 bundle loads before application code:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Then use:

```javascript
new ej.maps.Maps();
```

## Combined Mistakes and Future References

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

### Unnecessary OSM Type

Avoid:

```typescript
type:
    'OSM'
```

Use:

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png'
    }
]
```

### Unlimited OpenStreetMap Usage Claim

Avoid:

```text
OpenStreetMap has no usage limits.
```

Use:

```text
OpenStreetMap tiles are subject to the selected tile
provider's attribution, usage, capacity, and rate policies.
```

### Bing Metadata Assigned Directly

Incorrect:

```typescript
layers: [
    {
        urlTemplate:
            'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/Road'
    }
]
```

Correct:

```typescript
args.maps
    .getBingUrlTemplate(
        bingMetadataUrl
    )
    .then(
        (
            url:
                string
        ): void => {
            args.maps
                .layers[0]
                .urlTemplate =
                    url;
        }
    );
```

### HTTP Bing Metadata URL

Incorrect:

```text
http://dev.virtualearth.net/...
```

Correct:

```text
https://dev.virtualearth.net/...
```

### Unsupported Bing Type

Incorrect:

```text
Collinette
```

Use a validated imagery type such as:

```text
Aerial
AerialWithLabel
Road
CanvasDark
CanvasLight
CanvasGray
```

### Hardcoded Production Key

Avoid:

```typescript
const bingMapsKey =
    'REAL_PRODUCTION_KEY';
```

Use an authorized build-time or application configuration value.

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

### Marker Paths Missing

Incorrect:

```typescript
markerSettings: [
    {
        visible: true,
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
            locationData,
        latitudeValuePath:
            'latitude',
        longitudeValuePath:
            'longitude'
    }
]
```

### Shape Selection Inside Shape Settings

Incorrect:

```typescript
shapeSettings: {
    selectionSettings: {
        enable: true
    }
}
```

Correct:

```typescript
layers: [
    {
        shapeData:
            worldMap,

        selectionSettings: {
            enable: true
        }
    }
]
```

### Incorrect Selection Opacity Description

Incorrect:

```text
Selection opacity controls the opacity of unselected elements.
```

Correct:

```text
Selection opacity configures the selected element's appearance.
```

### Unverified Ctrl+Click Claim

Avoid:

```text
Ctrl+Click always performs multi-selection.
```

Use:

```typescript
selectionSettings: {
    enable: true,
    enableMultiSelect: true
}
```

Test the actual input behavior on supported browsers and devices.

### Click Event Treated as Selection Event

Incorrect statement:

```text
markerClick fires when marker selection completes.
```

Correct guidance:

```text
markerClick handles marker-click application logic.
selectionSettings controls the visual selected state.
```

### Unsafe innerHTML

Incorrect:

```typescript
details.innerHTML =
    '<h2>' +
    marker.name +
    '</h2>';
```

Correct:

```typescript
const heading:
    HTMLHeadingElement =
        document.createElement(
            'h2'
        );

heading.textContent =
    marker.name;

details.replaceChildren(
    heading
);
```

### Undefined Bounds Calculation

Avoid:

```typescript
const bounds =
    calculateBounds(
        args.shapeData
    );
```

unless `calculateBounds` is completely implemented and validated.

Do not leave hidden helper functions in runnable examples.

### Invalid Navigation-Line Search

Incorrect:

```typescript
line.includes(
    selectedMarker.latitude
);
```

Navigation-line settings are configuration objects.

Use application-owned route identifiers and a complete validated update model when route highlighting is required.

### Refresh Inside a Loop

Avoid:

```typescript
lines.forEach(
    (
        line
    ): void => {
        line.opacity =
            0.5;

        map.refresh();
    }
);
```

Preferred:

```typescript
lines.forEach(
    (
        line
    ): void => {
        line.opacity =
            0.5;
    }
);

map.refresh();
```

### Invalid Event Names

Do not assume that the following names exist:

```text
zoomEnd
panEnd
mouseMove
layerRender
```

Use event names and event models exported by the installed Maps package.

### Unvalidated Event Fields

Avoid assuming:

```typescript
args.data
args.shapeData
args.tooltip.content
```

exist without validating the exact event model.

### Mixing Tile and Shape Data

Avoid an unvalidated layer such as:

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png',
        shapeData:
            worldMap
    }
]
```

Use a focused tile layer or a focused GeoJSON shape layer. Configure validated sublayers when both are required.

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

### Missing OpenStreetMap Attribution

Incorrect:

```html
<div id="maps-container"></div>
```

with no attribution.

Correct:

```html
<div id="maps-container"></div>

<p class="map-attribution">
    Map data © OpenStreetMap contributors
</p>
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

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, commands, or URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```