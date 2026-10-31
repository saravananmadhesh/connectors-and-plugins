# Getting Started with Maps

The Syncfusion EJ2 Maps component renders geographical data from online tile providers such as OpenStreetMap or from local GeoJSON shape data.

This guide provides complete framework-neutral examples for:

- TypeScript with npm and module imports.
- JavaScript with the global EJ2 CDN bundle.
- OpenStreetMap tile rendering.
- Local world-map GeoJSON rendering.
- Downloading and preparing a world-map file.
- Zooming and panning.
- Responsive container configuration.
- Runtime validation and troubleshooting.

- #typescript-setup
  - #prerequisites
  - #install-the-package
  - #optional-webpack-quick-start
- #javascript-setup
  - #combined-cdn-bundle
  - #local-script-setup
- #openstreetmap-example
  - #typescript-openstreetmap-example
  - #javascript-openstreetmap-example
- #world-map-geojson-setup
  - #when-a-world-map-file-is-needed
  - #download-the-world-map-file
  - #verify-the-downloaded-file
  - #convert-the-json-file-to-typescript
  - #typescript-world-map-example
  - #javascript-world-map-example
- #map-container-setup
- #configuration-basics
- #running-the-application
- #openstreetmap-attribution
- #runtime-validation-checklist
- #common-setup-issues
- #combined-mistakes-and-future-references

## TypeScript Setup

### Prerequisites

Install the following tools:

- Node.js.
- npm.
- Git when cloning the quick-start repository.
- A modern browser.
- A code editor such as Visual Studio Code.
- Basic TypeScript and bundler knowledge.

Use a Node.js version supported by the selected bundler and the installed Syncfusion EJ2 release.

### Install the Package

Install the focused Maps package:

```bash
npm install @syncfusion/ej2-maps
```

The package installs its required EJ2 runtime dependencies through npm.

The following packages are used in applicable Maps scenarios:

```text
@syncfusion/ej2-base       -> Core EJ2 functionality.
@syncfusion/ej2-svg-base   -> SVG rendering support.
@syncfusion/ej2-data       -> Applicable data-binding scenarios.
@syncfusion/ej2-pdf-export -> PDF export scenarios.
```

A basic OpenStreetMap tile example does not need to install each dependency separately.

### Optional Webpack Quick Start

Clone the Syncfusion webpack quick-start project:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
cd ej2-quickstart
npm install
npm install @syncfusion/ej2-maps
```

Alternatively, install `@syncfusion/ej2-maps` in an existing TypeScript application that uses Webpack, Vite, or another bundler.

## JavaScript Setup

### Combined CDN Bundle

The simplest global JavaScript setup uses the versioned combined EJ2 bundle:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"><script>
```

The global Maps constructor is:

```javascript
ej.maps.Maps
```

Do not load the combined EJ2 bundle together with individual `ej2-base`, `ej2-data`, `ej2-svg-base`, and `ej2-maps` bundles.

Use either:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"><script>
```

or a validated collection of individual package scripts from the same EJ2 version.

### Local Script Setup

Download or copy the combined EJ2 global bundle into an application-owned resources directory.

Example structure:

```text
project/
|-- resources/
|   |-- scripts/
|       |-- ej2.min.js
|-- index.html
```

Load the local script before creating the Maps instance:

```html
<script src="resources/scripts/ej2.min.js"><script>
```

## OpenStreetMap Example

OpenStreetMap is an online tile-provider implementation.

It uses:

```text
urlTemplate
```

It does not require:

```text
world-map.ts
world-map.json
world-map.geojson
shapeData
```

The browser requests the visible map tiles from the configured OpenStreetMap tile server.

## TypeScript OpenStreetMap Example

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

    <title>Syncfusion OpenStreetMap</title>

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
                OpenStreetMap
            </h1>

            <p id="maps-description">
                An interactive OpenStreetMap view centered near
                San Francisco, California.
            </p>

            <div id="maps-container"></div>

            <p class="map-attribution">
                Map data © OpenStreetMap contributors
            </p>
        </section>
    </main>

    ./app.tsscript>
</body>
</html>
```

The actual entry-file path depends on the selected bundler. A webpack quick-start project may compile `app.ts` into a JavaScript bundle rather than load the TypeScript file directly.

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
    font-family: "Segoe UI", Arial, sans-serif;
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
            latitude: 37.6872,
            longitude: -122.0808
        },

        zoomSettings: {
            enable: true,
            enablePanning: true,
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
                    'https://tile.openstreetmap.org/level/tileX/tileY.png'
            }
        ]
    });

map.appendTo(
    host
);
```

The `Zoom` module is imported and injected because zooming, panning, and the zoom toolbar are enabled.

## JavaScript OpenStreetMap Example

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Syncfusion OpenStreetMap</title>

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
            font-family: "Segoe UI", Arial, sans-serif;
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

        @media (max-width: 768px) {
            .page-container {
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
                OpenStreetMap
            </h1>

            <p id="maps-description">
                An interactive OpenStreetMap view centered near
                San Francisco, California.
            </p>

            <div id="maps-container"></div>

            <p class="map-attribution">
                Map data © OpenStreetMap contributors
            </p>
        </section>
    </main>

    <script>
        var host =
            document.getElementById(
                'maps-container'
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
                    latitude: 37.6872,
                    longitude: -122.0808
                },

                zoomSettings: {
                    enable: true,
                    enablePanning: true,
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
                            'https://tile.openstreetmap.org/level/tileX/tileY.png'
                    }
                ]
            });

        map.appendTo(
            host
        );
    </script>
</body>
</html>
```

The complete global EJ2 bundle contains the feature modules, so the global JavaScript example does not call `Maps.Inject(...)`.

## World Map GeoJSON Setup

## When a World Map File Is Needed

A world-map file is required when the Maps component renders geographical shapes through:

```typescript
shapeData
```

Example:

```typescript
layers: [
    {
        shapeData:
            worldMap
    }
]
```

A world-map file is not needed for the OpenStreetMap `urlTemplate` example.

Use a GeoJSON world map when:

- The application must render country boundaries.
- The application must color countries from local data.
- The application needs offline geographical shapes.
- The application needs country selection or highlighting.
- The application needs data labels tied to GeoJSON properties.
- The application must avoid online tile requests.

The application must obtain and store the GeoJSON data. The `@syncfusion/ej2-maps` package does not automatically provide every geographical shape file.

## Download the World Map File

A Natural Earth-derived country GeoJSON file can be downloaded from:

```text
https://datahub.io/core/geo-countries/_r/-/data/countries.geojson
```

Repository and dataset information:

```text
https://github.com/datasets/geo-countries
```

```text
https://datahub.io/core/geo-countries
```

Review the dataset license and suitability before distributing it with the application.

Create a data directory:

```bash
mkdir -p src/data
```

### Download with curl

```bash
curl -L \
  "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" \
  -o "src/data/world-map.geojson"
```

Single-line version:

```bash
curl -L "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" -o "src/data/world-map.geojson"
```

### Download with wget

```bash
wget \
  "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" \
  -O "src/data/world-map.geojson"
```

### Download with PowerShell

```powershell
Invoke-WebRequest `
  -Uri "https://datahub.io/core/geo-countries/_r/-/data/countries.geojson" `
  -OutFile "src/data/world-map.geojson"
```

### Manual Download

1. Open:

```text
https://datahub.io/core/geo-countries/_r/-/data/countries.geojson
```

2. Save the downloaded file as:

```text
src/data/world-map.geojson
```

3. Confirm that the file begins with a GeoJSON object similar to:

```json
{
  "type": "FeatureCollection",
  "features": []
}
```

Do not copy a shortened documentation excerpt containing:

```typescript
export const worldMap = // Paste data here
```

The complete GeoJSON coordinate collection is required.

## Verify the Downloaded File

### Verify that the file exists

```bash
ls -lh src/data/world-map.geojson
```

### Check the beginning of the file

```bash
head -c 200 src/data/world-map.geojson
```

### Validate with Node.js

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

const data =
    JSON.parse(
        text
    );

if (
    data.type !==
    'FeatureCollection'
) {
    throw new Error(
        'The world-map file must be a GeoJSON FeatureCollection.'
    );
}

if (
    !Array.isArray(
        data.features
    ) ||
    data.features.length === 0
) {
    throw new Error(
        'The world-map file does not contain GeoJSON features.'
    );
}

console.log(
    'World-map GeoJSON is valid.'
);

console.log(
    'Feature count:',
    data.features.length
);
```

Run:

```bash
node scripts/validate-world-map.mjs
```

### Optional jq Validation

```bash
jq -e \
  '.type == "FeatureCollection" and (.features | length > 0)' \
  src/data/world-map.geojson
```

## Import the GeoJSON Directly

If the TypeScript project supports JSON imports, rename the file:

```bash
mv \
  src/data/world-map.geojson \
  src/data/world-map.json
```

Enable JSON module imports in `tsconfig.json`:

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
import worldMapData
    from './data/world-map.json';

const worldMap:
    object =
        worldMapData;
```

If the bundler does not support JSON imports, convert the GeoJSON into a TypeScript module.

## Convert the JSON File to TypeScript

Create `scripts/create-world-map-module.mjs`:

```javascript
import {
    mkdir,
    readFile,
    writeFile
} from 'node:fs/promises';

const inputPath =
    'src/data/world-map.geojson';

const outputPath =
    'src/data/world-map.ts';

const text =
    await readFile(
        inputPath,
        'utf8'
    );

const data =
    JSON.parse(
        text
    );

if (
    data.type !==
    'FeatureCollection'
) {
    throw new Error(
        'The input must be a GeoJSON FeatureCollection.'
    );
}

if (
    !Array.isArray(
        data.features
    ) ||
    data.features.length === 0
) {
    throw new Error(
        'The GeoJSON file does not contain features.'
    );
}

await mkdir(
    'src/data',
    {
        recursive: true
    }
);

const moduleContent =
    'export const worldMap: object = ' +
    JSON.stringify(data) +
    ';\n';

await writeFile(
    outputPath,
    moduleContent,
    'utf8'
);

console.log(
    'Created:',
    outputPath
);
```

Run:

```bash
node scripts/create-world-map-module.mjs
```

The generated file can be imported with:

```typescript
import {
    worldMap
} from './data/world-map';
```

Do not manually edit the generated coordinate array unless the source data must be intentionally changed.

## TypeScript World Map Example

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

    <title>Syncfusion World Map</title>

    ./styles.css
</head>

<body>
    <main class="page-container">
        <section
            class="maps-card"
            aria-labelledby="world-map-heading"
            aria-describedby="world-map-description"
        >
            <h1 id="world-map-heading">
                World Map
            </h1>

            <p id="world-map-description">
                A world map rendered from local GeoJSON country
                boundaries.
            </p>

            <div id="maps-container"></div>
        </section>
    </main>

    ./app.tsscript>
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
    font-family: "Segoe UI", Arial, sans-serif;
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

.maps-card p {
    margin: 0 0 16px;
    line-height: 1.5;
}

#maps-container {
    width: 100%;
    min-height: 600px;
}
```

### app.ts using world-map.ts

```typescript
import {
    Maps,
    Zoom
} from '@syncfusion/ej2-maps';

import {
    worldMap
} from './data/world-map';

Maps.Inject(
    Zoom
);

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
                }
            }
        ]
    });

map.appendTo(
    host
);
```

### app.ts using world-map.json

```typescript
import {
    Maps,
    Zoom
} from '@syncfusion/ej2-maps';

import worldMapData
    from './data/world-map.json';

Maps.Inject(
    Zoom
);

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
                    worldMapData,

                shapeSettings: {
                    fill: '#dbeafe',

                    border: {
                        color: '#64748b',
                        width: 0.5
                    }
                }
            }
        ]
    });

map.appendTo(
    host
);
```

## JavaScript World Map Example

For global JavaScript, load the GeoJSON with `fetch()` and initialize Maps after the request completes.

This example requires a local HTTP server. It should not be opened directly through `file://`.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Syncfusion World Map</title>

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
            font-family: "Segoe UI", Arial, sans-serif;
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

        .maps-card p {
            margin: 0 0 16px;
            line-height: 1.5;
        }

        #maps-container {
            width: 100%;
            min-height: 600px;
        }

        #maps-status {
            margin-top: 8px;
            color: #475569;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <main class="page-container">
        <section
            class="maps-card"
            aria-labelledby="world-map-heading"
            aria-describedby="world-map-description"
        >
            <h1 id="world-map-heading">
                World Map
            </h1>

            <p id="world-map-description">
                A world map rendered from a local GeoJSON file.
            </p>

            <div id="maps-container"></div>

            <p
                id="maps-status"
                aria-live="polite"
            >
                Loading world-map data.
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
                                        fill:
                                            '#dbeafe',

                                        border: {
                                            color:
                                                '#64748b',
                                            width: 0.5
                                        }
                                    }
                                }
                            ],

                            loaded:
                                function () {
                                    if (
                                        statusElement
                                    ) {
                                        statusElement.textContent =
                                            'World map loaded successfully.';
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
                            'The world map could not be loaded. ' +
                            error.message;
                    }
                }
            );
    </script>
</body>
</html>
```

Recommended structure:

```text
project/
|-- data/
|   |-- world-map.geojson
|-- index.html
```

Run through a local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Map Container Setup

The Maps host must have measurable dimensions.

```html
<div id="maps-container"></div>
```

```css
#maps-container {
    width: 100%;
    min-height: 600px;
}
```

Configure the component dimensions:

```typescript
const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',
        layers
    });
```

Avoid percentage height unless every relevant ancestor has a definite height.

Potentially unusable:

```typescript
height:
    '100%'
```

Safer:

```typescript
height:
    '600px'
```

## Configuration Basics

## Tile Map Configuration

```typescript
const map: Maps =
    new Maps({
        centerPosition: {
            latitude: 37.6872,
            longitude: -122.0808
        },

        zoomSettings: {
            enable: true,
            enablePanning: true,
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
```

## GeoJSON Shape Map Configuration

```typescript
const map: Maps =
    new Maps({
        zoomSettings: {
            enable: true,
            enablePanning: true
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
                }
            }
        ]
    });
```

## Core Properties

```text
centerPosition -> Initial latitude and longitude for applicable Maps views.
zoomSettings   -> Zoom, panning, limits, and toolbar behavior.
layers         -> Tile-provider or GeoJSON shape layers.
width          -> Component width as a CSS-size string.
height         -> Component height as a CSS-size string.
```

## Tile and Shape Layer Difference

Tile-provider layer:

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png'
    }
]
```

GeoJSON shape layer:

```typescript
layers: [
    {
        shapeData:
            worldMap
    }
]
```

Do not configure both approaches unintentionally in a basic getting-started example.

## Running the Application

### TypeScript Webpack Quick Start

```bash
npm start
```

Open the local address printed by the development server.

A common webpack development address is:

```text
http://localhost:8080
```

The actual port depends on the project configuration.

### JavaScript Local Server

Using Python:

```bash
python -m http.server 8000
```

Using Node.js:

```bash
npx http-server
```

Open the address printed by the server.

Do not rely on opening the page directly through `file://`, especially when the example uses `fetch()` to load GeoJSON.

## OpenStreetMap Attribution

When using OpenStreetMap tiles, display the attribution required by the provider.

Example:

```html
<p class="map-attribution">
    Map data © OpenStreetMap contributors
</p>
```

Review the current OpenStreetMap tile usage policy before deploying a production application.

Do not remove attribution merely because the Maps component displays the tiles successfully.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-maps is installed for TypeScript.
✅ Maps is imported.
✅ Zoom is imported when zooming or panning is enabled.
✅ Zoom is injected before Maps construction.
✅ Global JavaScript does not use TypeScript module injection.
✅ The global EJ2 bundle loads before application code.
✅ All global scripts use the same EJ2 version.
✅ The combined bundle is not mixed with individual package scripts.
✅ Every script URL ends in .min.js.
✅ The Maps host element exists.
✅ The host ID matches the appendTo selector.
✅ The host has a measurable width.
✅ The host has a measurable height.
✅ Width and height use valid CSS-size strings.
✅ centerPosition is used instead of an unsupported center property.
✅ centerPosition contains numeric latitude and longitude values.
✅ zoomSettings values are valid.
✅ The tile URL is a plain string.
✅ The tile URL contains level, tileX, and tileY placeholders.
✅ The tile URL is not wrapped in an anchor.
✅ OpenStreetMap attribution is visible.
✅ Network access to the tile service is available.
✅ Content Security Policy allows tile-image requests.
✅ The tile provider permits the intended usage.
✅ OSM examples do not require a world-map file.
✅ GeoJSON examples provide complete shapeData.
✅ The GeoJSON root type is FeatureCollection.
✅ The GeoJSON features collection is not empty.
✅ JSON imports are enabled when importing world-map.json.
✅ fetch-based GeoJSON examples run through HTTP.
✅ map.appendTo is called after the host exists.
✅ The Maps instance is destroyed when a dynamic host view is removed.
✅ Executable HTML uses actual angle brackets.
✅ No encoded HTML replaces executable tags.
✅ No rich-text anchor wraps a URL.
✅ No malformed .jsscript URL exists.
```

## Common Setup Issues

### Map Does Not Render

Check:

1. The host element exists.
2. The host ID matches the selector.
3. The host has a measurable height.
4. The Maps package or global bundle loaded.
5. The Maps instance is created after the host exists.
6. The layer contains either `urlTemplate` or `shapeData`.
7. Browser console errors are resolved.

Safe initialization:

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
    new Maps({
        width: '100%',
        height: '600px',
        layers
    });

map.appendTo(
    host
);
```

### Zoom Does Not Work in TypeScript

Incorrect:

```typescript
import {
    Maps
} from '@syncfusion/ej2-maps';
```

with:

```typescript
zoomSettings: {
    enable: true
}
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

### Initial Center Is Not Applied

Avoid:

```typescript
center: {
    latitude: 37.6872,
    longitude: -122.0808
}
```

Use:

```typescript
centerPosition: {
    latitude: 37.6872,
    longitude: -122.0808
}
```

### Blank or Gray Tiles

Possible causes:

- The browser has no network access.
- The tile URL is incorrect.
- Content Security Policy blocks tile images.
- The tile provider is temporarily unavailable.
- The provider is rate-limiting requests.
- A proxy or firewall blocks the tile domain.
- The URL was copied with malformed HTML.

Correct URL:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/level/tileX/tileY.png'
```

### World Map Does Not Load

Check:

- The file exists at the requested path.
- The page runs through an HTTP server.
- The file contains valid JSON.
- The root type is `FeatureCollection`.
- The `features` array is not empty.
- The browser can access the file.
- The filename and letter casing match.
- The server returns JSON rather than an HTML error page.

### TypeScript Cannot Import world-map.json

Enable:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

Or convert the file into:

```text
world-map.ts
```

using the provided conversion script.

### Global Namespace Is Undefined

If this fails:

```javascript
new ej.maps.Maps();
```

check that this script loads first:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Do not initialize Maps before the script has loaded.

### Percentage Height Does Not Work

Potential problem:

```css
#maps-container {
    height: 100%;
}
```

If the parent has no definite height, the map may receive an unusable computed height.

Use:

```css
#maps-container {
    min-height: 600px;
}
```

and:

```typescript
height:
    '600px'
```

### OpenStreetMap Attribution Is Missing

Add visible attribution:

```html
<p class="map-attribution">
    Map data © OpenStreetMap contributors
</p>
```

Review the provider requirements before production deployment.

## Cleanup

When an application dynamically removes the Maps host, destroy the instance:

```typescript
map.destroy();
```

If application-owned listeners were added, remove them before destroying the map:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);

map.destroy();
```

## Next Steps

After the base map renders, continue with separate focused references for:

- Markers.
- Bubbles.
- Navigation lines.
- GeoJSON layers.
- Data binding.
- Shape color mapping.
- Data labels.
- Tooltips.
- Legends.
- Selection and highlighting.
- Zooming and panning.
- Exporting and printing.
- Accessibility.
- Localization and RTL.

## Combined Mistakes and Future References

### Malformed Quick-Start Link

Incorrect:

```html
<a href="https://github.com/SyncfusionExamples/ej2-quickstart-webpack">
    https://github.com/SyncfusionExamples/ej2-quickstart-webpack
</a>
```

inside a shell command.

Correct:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
```

### Incorrect center Property

Incorrect:

```typescript
center: {
    latitude: 37.6872,
    longitude: -122.0808
}
```

Correct:

```typescript
centerPosition: {
    latitude: 37.6872,
    longitude: -122.0808
}
```

### Missing Zoom Module

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

### Unnecessary OSM Type Property

Avoid adding:

```typescript
type:
    'OSM'
```

to a basic tile layer unless the installed layer model explicitly requires it.

Use:

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png'
    }
]
```

### Assuming OSM Needs world-map.ts

Incorrect assumption:

```text
OpenStreetMap cannot render without world-map.ts.
```

Correct:

```text
OpenStreetMap uses online tiles through urlTemplate.
A world-map file is needed only for a GeoJSON shape layer.
```

### Missing GeoJSON Data

Incorrect:

```typescript
import {
    worldMap
} from './world-map';
```

without creating the file.

Correct options:

1. Download the GeoJSON file.
2. Import it with `resolveJsonModule`.
3. Convert it into `world-map.ts`.
4. Ask the application owner to provide an approved GeoJSON file.

Download source:

```text
https://datahub.io/core/geo-countries/_r/-/data/countries.geojson
```

### Loading GeoJSON Through file Protocol

Potentially blocked:

```text
file:///project/index.html
```

Use a local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Mixing Combined and Individual Scripts

Incorrect:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-maps/dist/global/ej2-maps.min.js"></script>
```

Correct combined-bundle approach:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Global JavaScript Injection

Avoid:

```javascript
ej.maps.Maps.Inject(
    ej.maps.Zoom
);
```

when using the complete validated global bundle.

Create the component directly:

```javascript
var map =
    new ej.maps.Maps({
        zoomSettings: {
            enable: true
        },

        layers: [
            {
                urlTemplate:
                    'https://tile.openstreetmap.org/level/tileX/tileY.png'
            }
        ]
    });
```

### Missing Host Height

Incorrect:

```html
<div id="maps-container"></div>
```

without CSS dimensions.

Correct:

```css
#maps-container {
    width: 100%;
    min-height: 600px;
}
```

### Inconsistent Host IDs

Incorrect:

```html
<div id="map"></div>
```

with:

```typescript
map.appendTo(
    '#container'
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

### Opening a Fetch Example Directly

Avoid:

```text
Open index.html directly from the file system.
```

when the example uses:

```javascript
fetch(
    './data/world-map.geojson'
);
```

Use an HTTP server.

### Missing OpenStreetMap Attribution

Incorrect:

```html
<div id="maps-container"></div>
```

with no attribution for OSM tiles.

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

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, shell commands, imports, or URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```