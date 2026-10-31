# Customization and Persistence in Maps

The Syncfusion EJ2 Maps component supports built-in themes, component-level styling, marker and bubble customization, navigation-line styling, printing, image export, and built-in state persistence.

Use public Maps configuration properties and application-owned wrapper classes for essential styling. Avoid depending on undocumented internal CSS selectors because generated DOM structure and class names can change between releases.

- #required-modules
- #container-customization
- #maps-appearance
  - #background-and-border
  - #maps-area
  - #title-settings
- #theme-configuration
- #feature-styling
  - #marker-styling
  - #marker-template
  - #bubble-styling
  - #shape-styling
  - #polygon-styling
  - #navigation-line-styling
  - #legend-styling
  - #tooltip-styling
- #responsive-design
- #built-in-persistence
- #application-preference-persistence
  - #preference-model
  - #preference-validation
  - #save-preferences
  - #restore-preferences
  - #clear-preferences
- #print-functionality
- #image-export
- #complete-typescript-example
- #complete-javascript-example
- #accessibility-guidance
- #performance-guidance
- #runtime-validation-checklist
- #troubleshooting
- #combined-mistakes-and-future-references

## Required Modules

TypeScript Maps features require their corresponding modules to be imported and injected before Maps construction.

```text
Markers          -> Marker
Marker tooltips  -> MapsTooltip
Zoom and panning -> Zoom
Print            -> Print
Image export     -> ImageExport
```

A map with markers, tooltips, zooming, printing, and image export requires:

```typescript
import {
    ImageExport,
    Maps,
    MapsTooltip,
    Marker,
    Print,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Marker,
    MapsTooltip,
    Print,
    ImageExport
);
```

Printing also requires `allowPrint: true`, while image export requires `allowImageExport: true`. The Maps `print()` method prints the rendered component, and `export()` supports PNG, JPEG, and SVG image output.

Import and injection must occur before constructing Maps.

Do not inject unused modules.

The complete global EJ2 JavaScript bundle does not require explicit `Maps.Inject(...)` calls.

## Container Customization

Use an application-owned wrapper for:

- Outer background.
- Border radius.
- Shadow.
- Padding.
- Responsive maximum width.
- Page spacing.
- Overflow handling.

HTML:

```html
<main class="page-container">
    <section
        class="maps-card"
        aria-labelledby="maps-heading"
        aria-describedby="maps-description"
    >
        <h1 id="maps-heading">
            Office Locations
        </h1>

        <p id="maps-description">
            An interactive map showing selected office locations.
        </p>

        <div id="maps-container"></div>

        <p class="map-attribution">
            Map data © OpenStreetMap contributors
        </p>
    </section>
</main>
```

CSS:

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
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    box-shadow:
        0 4px 16px
        rgb(15 23 42 / 10%);
}

#maps-container {
    width: 100%;
    min-height: 600px;
}
```

Avoid depending on generated internal selectors such as:

```css
.e-map {
    background: #f0f0f0;
}

.e-marker {
    opacity: 0.9;
}

.e-bubble {
    stroke-width: 1px;
}
```

Use Maps properties, marker settings, bubble settings, shape settings, tooltip settings, and application-owned templates instead.

## Maps Appearance

## Background and Border

Use the Maps `background` and `border` properties.

```typescript
const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',
        background: '#ffffff',

        border: {
            color: '#94a3b8',
            width: 1
        },

        layers
    });

map.appendTo(
    '#maps-container'
);
```

The Maps model exposes public properties for component background, border, margin, Maps area, title, theme, dimensions, persistence, RTL rendering, and accessibility description.

Use the wrapper for border radius and shadows because these are application-container concerns.

## Maps Area

Use `mapsArea` to customize the area surrounding the rendered map content.

```typescript
mapsArea: {
    background: '#f8fafc',

    border: {
        color: '#cbd5e1',
        width: 1
    }
}
```

Use the component `margin` property for internal spacing:

```typescript
margin: {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
}
```

## Title Settings

Use the Maps title model for component-owned title text.

```typescript
titleSettings: {
    text: 'Office Locations',
    alignment: 'Center',

    textStyle: {
        color: '#111827',
        size: '20px',
        fontFamily: 'Segoe UI',
        fontWeight: '600'
    },

    subtitleSettings: {
        text: 'North American offices',
        alignment: 'Center',

        textStyle: {
            color: '#475569',
            size: '13px',
            fontFamily: 'Segoe UI',
            fontWeight: '400'
        }
    }
}
```

A visible semantic HTML heading should still be provided when the Maps visualization is part of a document or application page.

## Theme Configuration

Apply a built-in theme through the Maps `theme` property.

```typescript
const map: Maps =
    new Maps({
        theme: 'Material',
        layers
    });

map.appendTo(
    '#maps-container'
);
```

The Maps model exposes `theme` as a supported property, with `Material` as its default.

Theme values can vary by installed EJ2 version. Validate the selected value against the installed `MapsTheme` type.

Possible theme families can include:

```text
Material
Fabric
Bootstrap
HighContrast
Tailwind
Fluent
Material3
```

Do not present an arbitrary object as a Maps custom theme:

```typescript
const customTheme = {
    backgroundColor: '#f5f5f5',
    textStyle: {
        color: '#333333'
    },
    lineSettings: {
        color: '#999999'
    }
};
```

There is no general Maps property that accepts this arbitrary object.

Customize individual Maps models instead:

```typescript
const map: Maps =
    new Maps({
        background: '#f5f5f5',

        titleSettings: {
            text: 'Office Locations',

            textStyle: {
                color: '#333333',
                size: '18px',
                fontFamily: 'Arial'
            }
        },

        layers: [
            {
                shapeSettings: {
                    fill: '#dbeafe',

                    border: {
                        color: '#64748b',
                        width: 1
                    }
                }
            }
        ]
    });
```

## Feature Styling

## Marker Styling

`markerSettings` is an array on a layer.

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
        width: 28,
        height: 28,
        shape: 'Circle',
        fill: '#dc2626',
        opacity: 0.9,

        border: {
            color: '#ffffff',
            width: 2
        }
    }
]
```

Validate marker-shape values against the installed `MarkerType` definition.

## Marker Template

Use an application-owned HTML template for custom markers.

HTML:

```html
<script
    id="office-marker-template"
    type="text/x-template"
>
    <div class="office-marker">
        <span class="office-marker-dot"></span>
        <span>${name}</span>
    </div>
</script>
```

CSS:

```css
.office-marker {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 8px;
    color: #111827;
    background: #ffffff;
    border: 1px solid #475569;
    border-radius: 999px;
    box-shadow:
        0 2px 6px
        rgb(15 23 42 / 20%);
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
}

.office-marker-dot {
    width: 8px;
    height: 8px;
    background: #dc2626;
    border-radius: 50%;
}
```

Configuration:

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
        template:
            '#office-marker-template'
    }
]
```

Do not place encoded markup in the template:

```typescript
template:
    '&lt;div&gt;${name}&lt;/div&gt;'
```

Use actual HTML or a template selector.

## Bubble Styling

`bubbleSettings` is an array on a GeoJSON shape layer.

```typescript
bubbleSettings: [
    {
        visible: true,
        dataSource:
            bubbleData,
        valuePath:
            'population',
        minRadius: 8,
        maxRadius: 40,
        fill: '#dc2626',
        opacity: 0.75,

        border: {
            color: '#7f1d1d',
            width: 2
        }
    }
]
```

Bubbles represent values associated with GeoJSON shapes. Use coordinate-based markers for direct latitude and longitude locations.

## Shape Styling

Use `shapeSettings` for GeoJSON shapes.

```typescript
shapeSettings: {
    fill: '#ccffcc',
    opacity: 0.8,

    border: {
        color: '#333333',
        width: 1.5
    }
}
```

Do not assume `dashArray` is available inside every border model. Validate it against the installed shape-settings type before using it.

## Polygon Styling

Custom polygon overlays use `polygonSettings.polygons`.

```typescript
polygonSettings: {
    polygons: [
        {
            points: [
                {
                    latitude: 37.9,
                    longitude: -122.6
                },
                {
                    latitude: 37.9,
                    longitude: -121.9
                },
                {
                    latitude: 37.3,
                    longitude: -121.9
                },
                {
                    latitude: 37.3,
                    longitude: -122.6
                }
            ],

            fill: '#dc2626',
            opacity: 0.3,
            borderColor: '#991b1b',
            borderWidth: 2,
            borderOpacity: 1
        }
    ]
}
```

GeoJSON shapes and custom polygon overlays are separate features.

## Navigation-Line Styling

Navigation lines belong inside a layer.

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

        color: '#dc2626',
        width: 3,
        opacity: 0.75,
        dashArray: '5 5'
    }
]
```

Validate that:

- Latitude and longitude arrays contain at least two values.
- Both arrays have the same length.
- Coordinates are finite and valid.
- Width is finite and positive.
- Opacity is between `0` and `1`.

## Legend Styling

Use the public `legendSettings` model.

```typescript
legendSettings: {
    visible: true,
    mode: 'Default',
    type: 'Layers',
    position: 'Bottom',
    alignment: 'Center',
    background: '#ffffff',
    opacity: 1,
    shapeWidth: 14,
    shapeHeight: 14,

    title: {
        text: 'Office category'
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
    }
}
```

Do not rely on undocumented `.e-map-legend` selectors for essential legend appearance.

## Tooltip Styling

Use `tooltipSettings` inside the applicable layer, marker entry, or bubble entry.

Marker tooltip:

```typescript
tooltipSettings: {
    visible: true,
    valuePath: 'name',

    textStyle: {
        color: '#ffffff',
        size: '13px',
        fontFamily: 'Segoe UI',
        fontWeight: '500'
    },

    fill: '#1f2937',

    border: {
        color: '#111827',
        width: 1
    }
}
```

Do not depend on `.e-map-tooltip` for required runtime styling unless the selector has been validated for the installed release.

## Responsive Design

Use responsive width with a definite height.

```typescript
const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',
        layers
    });
```

CSS:

```css
#maps-container {
    width: 100%;
    min-height: 600px;
}

@media (max-width: 1024px) {
    #maps-container {
        min-height: 540px;
    }
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

Avoid switching between several viewport-relative heights without validating the resulting component size.

Potentially difficult to maintain:

```css
@media (max-width: 768px) {
    #maps-container {
        height: 60vh;
    }
}

@media (max-width: 1024px) {
    #maps-container {
        height: 70vh;
    }
}
```

Use a stable component height appropriate for the application layout.

If `height: '100%'` is used, every relevant ancestor must have a definite computed height.

## Built-In Persistence

Maps exposes the `enablePersistence` property for preserving supported component state between page reloads.

```typescript
const map: Maps =
    new Maps({
        enablePersistence: true,
        width: '100%',
        height: '600px',
        layers
    });

map.appendTo(
    '#maps-container'
);
```

Use built-in persistence when the default component persistence behavior matches the application requirement.

Do not store the same state through both built-in persistence and a custom storage implementation unless their responsibilities are clearly separated.

Use custom persistence when the application needs:

- A versioned preferences schema.
- User-specific storage.
- Theme preferences.
- Explicit layer visibility.
- Expiration.
- Server synchronization.
- Storage consent handling.
- Validation and migration.
- A reset function.

## Application Preference Persistence

Store only the application-owned preferences that must survive reloads.

Do not serialize the complete Maps instance.

Avoid:

```typescript
localStorage.setItem(
    'map',
    JSON.stringify(
        map
    )
);
```

The Maps instance contains runtime state that is not an appropriate storage model.

## Preference Model

```typescript
interface MapCenter {
    latitude: number;
    longitude: number;
}

interface MapPreferences {
    version: 1;
    center: MapCenter;
    zoomFactor: number;
    colorScheme: 'light' | 'dark';
    visibleLayerIndexes: number[];
    savedAt: number;
}
```

Default preferences:

```typescript
const defaultPreferences:
    MapPreferences = {
        version: 1,

        center: {
            latitude: 37.7749,
            longitude: -122.4194
        },

        zoomFactor: 5,
        colorScheme: 'light',
        visibleLayerIndexes: [
            0
        ],
        savedAt: 0
    };
```

## Preference Validation

Never trust parsed browser-storage data without validation.

```typescript
const isMapCenter = (
    value:
        unknown
): value is MapCenter => {
    if (
        typeof value !==
            'object' ||
        value === null
    ) {
        return false;
    }

    const center =
        value as
            Partial<
                MapCenter
            >;

    return (
        typeof center.latitude ===
            'number' &&
        Number.isFinite(
            center.latitude
        ) &&
        center.latitude >= -90 &&
        center.latitude <= 90 &&
        typeof center.longitude ===
            'number' &&
        Number.isFinite(
            center.longitude
        ) &&
        center.longitude >= -180 &&
        center.longitude <= 180
    );
};

const isMapPreferences = (
    value:
        unknown
): value is MapPreferences => {
    if (
        typeof value !==
            'object' ||
        value === null
    ) {
        return false;
    }

    const preferences =
        value as
            Partial<
                MapPreferences
            >;

    return (
        preferences.version === 1 &&
        isMapCenter(
            preferences.center
        ) &&
        typeof preferences.zoomFactor ===
            'number' &&
        Number.isFinite(
            preferences.zoomFactor
        ) &&
        preferences.zoomFactor >= 1 &&
        preferences.zoomFactor <= 13 &&
        (
            preferences.colorScheme ===
                'light' ||
            preferences.colorScheme ===
                'dark'
        ) &&
        Array.isArray(
            preferences.visibleLayerIndexes
        ) &&
        preferences.visibleLayerIndexes.every(
            (
                index:
                    unknown
            ): boolean => {
                return (
                    typeof index ===
                        'number' &&
                    Number.isInteger(
                        index
                    ) &&
                    index >= 0
                );
            }
        ) &&
        typeof preferences.savedAt ===
            'number' &&
        Number.isFinite(
            preferences.savedAt
        )
    );
};
```

## Save Preferences

```typescript
const preferencesKey:
    string =
        'office-map-preferences-v1';

const savePreferences = (
    storage:
        Storage,
    map:
        Maps,
    colorScheme:
        'light' | 'dark'
): void => {
    const visibleLayerIndexes:
        number[] =
            map.layers
                .map(
                    (
                        layer,
                        index:
                            number
                    ): number | null => {
                        return (
                            layer.visible !==
                            false
                        )
                            ? index
                            : null;
                    }
                )
                .filter(
                    (
                        index:
                            number | null
                    ): index is number => {
                        return (
                            index !==
                            null
                        );
                    }
                );

    const preferences:
        MapPreferences = {
            version: 1,

            center: {
                latitude:
                    Number(
                        map.centerPosition
                            .latitude
                    ),
                longitude:
                    Number(
                        map.centerPosition
                            .longitude
                    )
            },

            zoomFactor:
                Number(
                    map.zoomSettings
                        .zoomFactor
                ),

            colorScheme,
            visibleLayerIndexes,
            savedAt:
                Date.now()
        };

    storage.setItem(
        preferencesKey,
        JSON.stringify(
            preferences
        )
    );
};
```

Browser storage can fail in restricted environments. Handle failures:

```typescript
const trySavePreferences = (
    preferences:
        MapPreferences
): boolean => {
    try {
        localStorage.setItem(
            preferencesKey,
            JSON.stringify(
                preferences
            )
        );

        return true;
    } catch (
        error:
            unknown
    ) {
        console.error(
            'Unable to save Maps preferences.',
            error
        );

        return false;
    }
};
```

## Restore Preferences

```typescript
const loadPreferences = (
    storage:
        Storage
): MapPreferences => {
    try {
        const saved:
            string | null =
                storage.getItem(
                    preferencesKey
                );

        if (!saved) {
            return {
                ...defaultPreferences,

                center: {
                    ...defaultPreferences
                        .center
                },

                visibleLayerIndexes: [
                    ...defaultPreferences
                        .visibleLayerIndexes
                ]
            };
        }

        const parsed:
            unknown =
                JSON.parse(
                    saved
                );

        if (
            !isMapPreferences(
                parsed
            )
        ) {
            storage.removeItem(
                preferencesKey
            );

            return {
                ...defaultPreferences,

                center: {
                    ...defaultPreferences
                        .center
                },

                visibleLayerIndexes: [
                    ...defaultPreferences
                        .visibleLayerIndexes
                ]
            };
        }

        return parsed;
    } catch (
        error:
            unknown
    ) {
        console.error(
            'Unable to restore Maps preferences.',
            error
        );

        return {
            ...defaultPreferences,

            center: {
                ...defaultPreferences
                    .center
            },

            visibleLayerIndexes: [
                ...defaultPreferences
                    .visibleLayerIndexes
            ]
        };
    }
};
```

Apply validated preferences before constructing Maps:

```typescript
const preferences:
    MapPreferences =
        loadPreferences(
            localStorage
        );

const map: Maps =
    new Maps({
        centerPosition: {
            latitude:
                preferences.center
                    .latitude,
            longitude:
                preferences.center
                    .longitude
        },

        zoomSettings: {
            enable: true,
            zoomFactor:
                preferences.zoomFactor
        },

        layers
    });
```

Restore layer visibility after checking layer indexes:

```typescript
layers.forEach(
    (
        layer,
        index:
            number
    ): void => {
        layer.visible =
            preferences
                .visibleLayerIndexes
                .includes(
                    index
                );
    }
);
```

## Clear Preferences

```typescript
const clearPreferences = (
    storage:
        Storage
): void => {
    storage.removeItem(
        preferencesKey
    );
};
```

Reset the map:

```typescript
const resetMapPreferences =
    (): void => {
        clearPreferences(
            localStorage
        );

        map.centerPosition = {
            ...defaultPreferences
                .center
        };

        map.zoomSettings
            .zoomFactor =
                defaultPreferences
                    .zoomFactor;

        map.layers.forEach(
            (
                layer,
                index:
                    number
            ): void => {
                layer.visible =
                    defaultPreferences
                        .visibleLayerIndexes
                        .includes(
                            index
                        );
            }
        );

        document.documentElement
            .dataset.theme =
                defaultPreferences
                    .colorScheme;

        map.refresh();
    };
```

## Print Functionality

Import and inject `Print`.

```typescript
import {
    Maps,
    Print
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Print
);
```

Enable printing:

```typescript
const map: Maps =
    new Maps({
        allowPrint: true,
        layers
    });

map.appendTo(
    '#maps-container'
);
```

Print from a native button:

```html
<button
    id="print-map-button"
    type="button"
>
    Print map
</button>
```

```typescript
const printButton:
    HTMLButtonElement | null =
        document.getElementById(
            'print-map-button'
        ) as
            HTMLButtonElement |
            null;

const handlePrint =
    (): void => {
        map.print();
    };

printButton?.addEventListener(
    'click',
    handlePrint
);
```

The Maps print feature requires the Print module in TypeScript, `allowPrint: true`, and a call to `print()`.

Do not write:

```typescript
printWindow.document.write(
    map.print()
);
```

`map.print()` performs the print action. It is not documented as returning printable HTML.

If a report requires a custom title, place the title in the page markup and create print-specific CSS.

```css
@media print {
    .maps-actions,
    .map-attribution {
        display: none;
    }

    .maps-card {
        max-width: none;
        padding: 0;
        border: 0;
        box-shadow: none;
    }

    #maps-container {
        min-height: 600px;
    }
}
```

## Image Export

Import and inject `ImageExport`.

```typescript
import {
    ImageExport,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    ImageExport
);
```

Enable image export:

```typescript
const map: Maps =
    new Maps({
        allowImageExport: true,
        layers
    });

map.appendTo(
    '#maps-container'
);
```

Export as PNG:

```typescript
const exportMapAsPng =
    (): void => {
        const fileName:
            string =
                'office-map-' +
                Date.now();

        map.export(
            'PNG',
            fileName
        );
    };
```

Supported image export formats include PNG, JPEG, and SVG. The method requires the image type and filename.

Button:

```html
<button
    id="export-map-button"
    type="button"
>
    Export PNG
</button>
```

```typescript
const exportButton:
    HTMLButtonElement | null =
        document.getElementById(
            'export-map-button'
        ) as
            HTMLButtonElement |
            null;

exportButton?.addEventListener(
    'click',
    exportMapAsPng
);
```

## Complete TypeScript Example

This example provides:

- OpenStreetMap.
- Configurable title and background.
- Styled markers.
- Marker tooltips.
- Zooming and panning.
- Light and dark application themes.
- Validated local-storage preferences.
- Print.
- PNG export.
- Native controls.
- OpenStreetMap attribution.
- Safe cleanup.

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
        Maps Customization and Persistence
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
                Office Locations
            </h1>

            <p id="maps-description">
                Explore office locations, change the application
                color scheme, save preferences, print the map,
                or export the current view as a PNG image.
            </p>

            <div
                class="maps-actions"
                aria-label="Map actions"
            >
                <button
                    id="light-theme-button"
                    type="button"
                >
                    Light theme
                </button>

                <button
                    id="dark-theme-button"
                    type="button"
                >
                    Dark theme
                </button>

                <button
                    id="save-map-button"
                    type="button"
                >
                    Save preferences
                </button>

                <button
                    id="reset-map-button"
                    type="button"
                >
                    Reset preferences
                </button>

                <button
                    id="print-map-button"
                    type="button"
                >
                    Print map
                </button>

                <button
                    id="export-map-button"
                    type="button"
                >
                    Export PNG
                </button>
            </div>

            <div id="maps-container"></div>

            <p class="map-attribution">
                Map data © OpenStreetMap contributors
            </p>

            <p
                id="maps-status"
                class="status-message"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the map.
            </p>
        </section>
    </main>

    <script scr="index.js"></script>
</body>
</html>
```

### styles.css

```css
:root {
    color-scheme: light;
    --page-background: #f1f5f9;
    --card-background: #ffffff;
    --primary-text: #111827;
    --secondary-text: #475569;
    --border-color: #cbd5e1;
    --button-background: #2563eb;
    --button-text: #ffffff;
    --focus-color: #005fcc;
}

:root[data-theme="dark"] {
    color-scheme: dark;
    --page-background: #0f172a;
    --card-background: #1e293b;
    --primary-text: #f8fafc;
    --secondary-text: #cbd5e1;
    --border-color: #64748b;
    --button-background: #60a5fa;
    --button-text: #0f172a;
    --focus-color: #facc15;
}

html,
body {
    margin: 0;
    min-height: 100%;
}

body {
    color: var(--primary-text);
    background: var(--page-background);
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
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow:
        0 4px 16px
        rgb(15 23 42 / 12%);
}

.maps-card h1 {
    margin: 0 0 8px;
    font-size: 24px;
}

.maps-card > p {
    color: var(--secondary-text);
    line-height: 1.5;
}

.maps-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 16px 0;
}

.maps-actions button {
    min-height: 42px;
    padding: 8px 14px;
    color: var(--button-text);
    background: var(--button-background);
    border: 1px solid transparent;
    border-radius: 6px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
}

.maps-actions button:focus-visible {
    outline: 3px solid var(--focus-color);
    outline-offset: 3px;
}

#maps-container {
    width: 100%;
    min-height: 600px;
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
}

.map-attribution,
.status-message {
    margin: 8px 0 0;
    color: var(--secondary-text);
    font-size: 13px;
}

@media (max-width: 768px) {
    .page-container {
        padding: 12px;
    }

    .maps-card {
        padding: 12px;
    }

    .maps-actions {
        display: grid;
        grid-template-columns: 1fr;
    }

    #maps-container {
        min-height: 500px;
    }
}

@media print {
    .maps-actions {
        display: none;
    }

    .page-container,
    .maps-card {
        padding: 0;
    }

    .maps-card {
        max-width: none;
        border: 0;
        box-shadow: none;
    }
}
```

### app.ts

```typescript
import {
    ImageExport,
    Maps,
    MapsTooltip,
    Marker,
    Print,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Marker,
    MapsTooltip,
    Print,
    ImageExport
);

interface LocationData {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

interface MapCenter {
    latitude: number;
    longitude: number;
}

interface MapPreferences {
    version: 1;
    center: MapCenter;
    zoomFactor: number;
    colorScheme: 'light' | 'dark';
    visibleLayerIndexes: number[];
    savedAt: number;
}

const preferencesKey:
    string =
        'office-map-preferences-v1';

const defaultPreferences:
    MapPreferences = {
        version: 1,

        center: {
            latitude: 37.7749,
            longitude: -122.4194
        },

        zoomFactor: 5,
        colorScheme: 'light',
        visibleLayerIndexes: [
            0
        ],
        savedAt: 0
    };

const locationData:
    LocationData[] = [
        {
            id: 'san-francisco',
            name: 'San Francisco',
            latitude: 37.7749,
            longitude: -122.4194
        },
        {
            id: 'los-angeles',
            name: 'Los Angeles',
            latitude: 34.0522,
            longitude: -118.2437
        },
        {
            id: 'seattle',
            name: 'Seattle',
            latitude: 47.6062,
            longitude: -122.3321
        }
    ];

const isMapCenter = (
    value:
        unknown
): value is MapCenter => {
    if (
        typeof value !==
            'object' ||
        value === null
    ) {
        return false;
    }

    const center =
        value as
            Partial<
                MapCenter
            >;

    return (
        typeof center.latitude ===
            'number' &&
        Number.isFinite(
            center.latitude
        ) &&
        center.latitude >= -90 &&
        center.latitude <= 90 &&
        typeof center.longitude ===
            'number' &&
        Number.isFinite(
            center.longitude
        ) &&
        center.longitude >= -180 &&
        center.longitude <= 180
    );
};

const isMapPreferences = (
    value:
        unknown
): value is MapPreferences => {
    if (
        typeof value !==
            'object' ||
        value === null
    ) {
        return false;
    }

    const preferences =
        value as
            Partial<
                MapPreferences
            >;

    return (
        preferences.version === 1 &&
        isMapCenter(
            preferences.center
        ) &&
        typeof preferences.zoomFactor ===
            'number' &&
        Number.isFinite(
            preferences.zoomFactor
        ) &&
        preferences.zoomFactor >= 1 &&
        preferences.zoomFactor <= 13 &&
        (
            preferences.colorScheme ===
                'light' ||
            preferences.colorScheme ===
                'dark'
        ) &&
        Array.isArray(
            preferences.visibleLayerIndexes
        ) &&
        preferences.visibleLayerIndexes.every(
            (
                index:
                    unknown
            ): boolean => {
                return (
                    typeof index ===
                        'number' &&
                    Number.isInteger(
                        index
                    ) &&
                    index >= 0
                );
            }
        )
    );
};

const loadPreferences =
    (): MapPreferences => {
        try {
            const saved:
                string | null =
                    localStorage.getItem(
                        preferencesKey
                    );

            if (!saved) {
                return {
                    ...defaultPreferences,

                    center: {
                        ...defaultPreferences
                            .center
                    },

                    visibleLayerIndexes: [
                        ...defaultPreferences
                            .visibleLayerIndexes
                    ]
                };
            }

            const parsed:
                unknown =
                    JSON.parse(
                        saved
                    );

            if (
                !isMapPreferences(
                    parsed
                )
            ) {
                localStorage.removeItem(
                    preferencesKey
                );

                return {
                    ...defaultPreferences,

                    center: {
                        ...defaultPreferences
                            .center
                    },

                    visibleLayerIndexes: [
                        ...defaultPreferences
                            .visibleLayerIndexes
                    ]
                };
            }

            return parsed;
        } catch (
            error:
                unknown
        ) {
            console.error(
                'Unable to restore Maps preferences.',
                error
            );

            return {
                ...defaultPreferences,

                center: {
                    ...defaultPreferences
                        .center
                },

                visibleLayerIndexes: [
                    ...defaultPreferences
                        .visibleLayerIndexes
                ]
            };
        }
    };

const preferences:
    MapPreferences =
        loadPreferences();

document.documentElement
    .dataset.theme =
        preferences
            .colorScheme;

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
        theme: 'Material',
        background: '#ffffff',
        allowPrint: true,
        allowImageExport: true,

        centerPosition: {
            ...preferences.center
        },

        zoomSettings: {
            enable: true,
            enablePanning: true,
            mouseWheelZoom: true,
            pinchZooming: true,
            minZoom: 1,
            maxZoom: 13,
            zoomFactor:
                preferences.zoomFactor
        },

        titleSettings: {
            text:
                'Office Locations',

            textStyle: {
                color: '#111827',
                size: '20px',
                fontFamily:
                    'Segoe UI',
                fontWeight: '600'
            }
        },

        layers: [
            {
                visible:
                    preferences
                        .visibleLayerIndexes
                        .includes(
                            0
                        ),

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
                        opacity: 0.95,

                        border: {
                            color: '#ffffff',
                            width: 2
                        },

                        tooltipSettings: {
                            visible: true,
                            valuePath:
                                'name',
                            fill:
                                '#1f2937',

                            textStyle: {
                                color:
                                    '#ffffff',
                                size:
                                    '13px',
                                fontFamily:
                                    'Segoe UI'
                            }
                        }
                    }
                ]
            }
        ],

        loaded:
            (): void => {
                if (
                    statusElement
                ) {
                    statusElement.textContent =
                        'The office map loaded successfully.';
                }
            }
    });

map.appendTo(
    host
);

let currentColorScheme:
    'light' | 'dark' =
        preferences
            .colorScheme;

const setColorScheme = (
    colorScheme:
        'light' | 'dark'
): void => {
    currentColorScheme =
        colorScheme;

    document.documentElement
        .dataset.theme =
            colorScheme;

    if (
        statusElement
    ) {
        statusElement.textContent =
            colorScheme ===
            'dark'
                ? 'Dark application theme enabled.'
                : 'Light application theme enabled.';
    }
};

const saveCurrentPreferences =
    (): void => {
        const visibleLayerIndexes:
            number[] =
                map.layers
                    .map(
                        (
                            layer,
                            index:
                                number
                        ): number | null => {
                            return (
                                layer.visible !==
                                false
                            )
                                ? index
                                : null;
                        }
                    )
                    .filter(
                        (
                            index:
                                number | null
                        ): index is number => {
                            return (
                                index !==
                                null
                            );
                        }
                    );

        const nextPreferences:
            MapPreferences = {
                version: 1,

                center: {
                    latitude:
                        Number(
                            map.centerPosition
                                .latitude
                        ),
                    longitude:
                        Number(
                            map.centerPosition
                                .longitude
                        )
                },

                zoomFactor:
                    Number(
                        map.zoomSettings
                            .zoomFactor
                    ),

                colorScheme:
                    currentColorScheme,

                visibleLayerIndexes,
                savedAt:
                    Date.now()
            };

        try {
            localStorage.setItem(
                preferencesKey,
                JSON.stringify(
                    nextPreferences
                )
            );

            if (
                statusElement
            ) {
                statusElement.textContent =
                    'Map preferences were saved.';
            }
        } catch (
            error:
                unknown
        ) {
            console.error(
                'Unable to save Maps preferences.',
                error
            );

            if (
                statusElement
            ) {
                statusElement.textContent =
                    'Map preferences could not be saved.';
            }
        }
    };

const resetPreferences =
    (): void => {
        localStorage.removeItem(
            preferencesKey
        );

        currentColorScheme =
            defaultPreferences
                .colorScheme;

        document.documentElement
            .dataset.theme =
                currentColorScheme;

        map.centerPosition = {
            ...defaultPreferences
                .center
        };

        map.zoomSettings
            .zoomFactor =
                defaultPreferences
                    .zoomFactor;

        map.layers.forEach(
            (
                layer,
                index:
                    number
            ): void => {
                layer.visible =
                    defaultPreferences
                        .visibleLayerIndexes
                        .includes(
                            index
                        );
            }
        );

        map.refresh();

        if (
            statusElement
        ) {
            statusElement.textContent =
                'Map preferences were reset.';
        }
    };

const exportMap =
    (): void => {
        map.export(
            'PNG',
            'office-map-' +
                Date.now()
        );
    };

const printMap =
    (): void => {
        map.print();
    };

const lightThemeButton:
    HTMLButtonElement | null =
        document.getElementById(
            'light-theme-button'
        ) as
            HTMLButtonElement |
            null;

const darkThemeButton:
    HTMLButtonElement | null =
        document.getElementById(
            'dark-theme-button'
        ) as
            HTMLButtonElement |
            null;

const saveButton:
    HTMLButtonElement | null =
        document.getElementById(
            'save-map-button'
        ) as
            HTMLButtonElement |
            null;

const resetButton:
    HTMLButtonElement | null =
        document.getElementById(
            'reset-map-button'
        ) as
            HTMLButtonElement |
            null;

const printButton:
    HTMLButtonElement | null =
        document.getElementById(
            'print-map-button'
        ) as
            HTMLButtonElement |
            null;

const exportButton:
    HTMLButtonElement | null =
        document.getElementById(
            'export-map-button'
        ) as
            HTMLButtonElement |
            null;

const handleLightTheme =
    (): void => {
        setColorScheme(
            'light'
        );
    };

const handleDarkTheme =
    (): void => {
        setColorScheme(
            'dark'
        );
    };

lightThemeButton?.addEventListener(
    'click',
    handleLightTheme
);

darkThemeButton?.addEventListener(
    'click',
    handleDarkTheme
);

saveButton?.addEventListener(
    'click',
    saveCurrentPreferences
);

resetButton?.addEventListener(
    'click',
    resetPreferences
);

printButton?.addEventListener(
    'click',
    printMap
);

exportButton?.addEventListener(
    'click',
    exportMap
);
```

When the dynamic view is removed:

```typescript
lightThemeButton?.removeEventListener(
    'click',
    handleLightTheme
);

darkThemeButton?.removeEventListener(
    'click',
    handleDarkTheme
);

saveButton?.removeEventListener(
    'click',
    saveCurrentPreferences
);

resetButton?.removeEventListener(
    'click',
    resetPreferences
);

printButton?.removeEventListener(
    'click',
    printMap
);

exportButton?.removeEventListener(
    'click',
    exportMap
);

map.destroy();
```

## Complete JavaScript Example

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
        Maps Customization and Persistence
    </title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"><script>

    <style>
        :root {
            color-scheme: light;
            --page-background: #f1f5f9;
            --card-background: #ffffff;
            --primary-text: #111827;
            --secondary-text: #475569;
            --border-color: #cbd5e1;
            --button-background: #2563eb;
            --button-text: #ffffff;
            --focus-color: #005fcc;
        }

        :root[data-theme="dark"] {
            color-scheme: dark;
            --page-background: #0f172a;
            --card-background: #1e293b;
            --primary-text: #f8fafc;
            --secondary-text: #cbd5e1;
            --border-color: #64748b;
            --button-background: #60a5fa;
            --button-text: #0f172a;
            --focus-color: #facc15;
        }

        html,
        body {
            margin: 0;
            min-height: 100%;
        }

        body {
            color: var(--primary-text);
            background: var(--page-background);
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
            padding: 20px;
            box-sizing: border-box;
            overflow: hidden;
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            box-shadow:
                0 4px 16px
                rgb(15 23 42 / 12%);
        }

        .maps-card h1 {
            margin: 0 0 8px;
        }

        .maps-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 16px 0;
        }

        .maps-actions button {
            min-height: 42px;
            padding: 8px 14px;
            color: var(--button-text);
            background: var(--button-background);
            border: 1px solid transparent;
            border-radius: 6px;
            font: inherit;
            font-weight: 600;
            cursor: pointer;
        }

        .maps-actions button:focus-visible {
            outline: 3px solid var(--focus-color);
            outline-offset: 3px;
        }

        #maps-container {
            width: 100%;
            min-height: 600px;
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 8px;
        }

        .map-attribution,
        .status-message {
            color: var(--secondary-text);
            font-size: 13px;
        }

        @media (max-width: 768px) {
            .page-container {
                padding: 12px;
            }

            .maps-card {
                padding: 12px;
            }

            .maps-actions {
                display: grid;
                grid-template-columns: 1fr;
            }

            #maps-container {
                min-height: 500px;
            }
        }

        @media print {
            .maps-actions {
                display: none;
            }

            .maps-card {
                max-width: none;
                padding: 0;
                border: 0;
                box-shadow: none;
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
                Office Locations
            </h1>

            <p id="maps-description">
                Explore office locations, change the application
                theme, save preferences, print the map, or export PNG.
            </p>

            <div class="maps-actions">
                <button
                    id="light-theme-button"
                    type="button"
                >
                    Light theme
                </button>

                <button
                    id="dark-theme-button"
                    type="button"
                >
                    Dark theme
                </button>

                <button
                    id="save-map-button"
                    type="button"
                >
                    Save preferences
                </button>

                <button
                    id="reset-map-button"
                    type="button"
                >
                    Reset preferences
                </button>

                <button
                    id="print-map-button"
                    type="button"
                >
                    Print map
                </button>

                <button
                    id="export-map-button"
                    type="button"
                >
                    Export PNG
                </button>
            </div>

            <div id="maps-container"></div>

            <p class="map-attribution">
                Map data © OpenStreetMap contributors
            </p>

            <p
                id="maps-status"
                class="status-message"
                aria-live="polite"
            >
                Loading the map.
            </p>
        </section>
    </main>

    <script>
        var preferencesKey =
            'office-map-preferences-v1';

        var defaultPreferences = {
            version: 1,

            center: {
                latitude: 37.7749,
                longitude: -122.4194
            },

            zoomFactor: 5,
            colorScheme: 'light',
            visibleLayerIndexes: [
                0
            ],
            savedAt: 0
        };

        var locationData = [
            {
                id: 'san-francisco',
                name: 'San Francisco',
                latitude: 37.7749,
                longitude: -122.4194
            },
            {
                id: 'los-angeles',
                name: 'Los Angeles',
                latitude: 34.0522,
                longitude: -118.2437
            },
            {
                id: 'seattle',
                name: 'Seattle',
                latitude: 47.6062,
                longitude: -122.3321
            }
        ];

        function isValidCenter(
            center
        ) {
            return (
                center &&
                Number.isFinite(
                    center.latitude
                ) &&
                center.latitude >= -90 &&
                center.latitude <= 90 &&
                Number.isFinite(
                    center.longitude
                ) &&
                center.longitude >= -180 &&
                center.longitude <= 180
            );
        }

        function isValidPreferences(
            preferences
        ) {
            return (
                preferences &&
                preferences.version === 1 &&
                isValidCenter(
                    preferences.center
                ) &&
                Number.isFinite(
                    preferences.zoomFactor
                ) &&
                preferences.zoomFactor >= 1 &&
                preferences.zoomFactor <= 13 &&
                (
                    preferences.colorScheme ===
                        'light' ||
                    preferences.colorScheme ===
                        'dark'
                ) &&
                Array.isArray(
                    preferences.visibleLayerIndexes
                )
            );
        }

        function loadPreferences() {
            try {
                var saved =
                    localStorage.getItem(
                        preferencesKey
                    );

                if (!saved) {
                    return JSON.parse(
                        JSON.stringify(
                            defaultPreferences
                        )
                    );
                }

                var parsed =
                    JSON.parse(
                        saved
                    );

                if (
                    !isValidPreferences(
                        parsed
                    )
                ) {
                    localStorage.removeItem(
                        preferencesKey
                    );

                    return JSON.parse(
                        JSON.stringify(
                            defaultPreferences
                        )
                    );
                }

                return parsed;
            } catch (
                error
            ) {
                console.error(
                    'Unable to restore Maps preferences.',
                    error
                );

                return JSON.parse(
                    JSON.stringify(
                        defaultPreferences
                    )
                );
            }
        }

        var preferences =
            loadPreferences();

        var currentColorScheme =
            preferences.colorScheme;

        document.documentElement
            .dataset.theme =
                currentColorScheme;

        var statusElement =
            document.getElementById(
                'maps-status'
            );

        var map =
            new ej.maps.Maps({
                width: '100%',
                height: '600px',
                theme: 'Material',
                background: '#ffffff',
                allowPrint: true,
                allowImageExport: true,

                centerPosition: {
                    latitude:
                        preferences
                            .center
                            .latitude,
                    longitude:
                        preferences
                            .center
                            .longitude
                },

                zoomSettings: {
                    enable: true,
                    enablePanning: true,
                    mouseWheelZoom: true,
                    pinchZooming: true,
                    minZoom: 1,
                    maxZoom: 13,
                    zoomFactor:
                        preferences
                            .zoomFactor
                },

                layers: [
                    {
                        visible:
                            preferences
                                .visibleLayerIndexes
                                .indexOf(
                                    0
                                ) !== -1,

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

                loaded:
                    function () {
                        statusElement.textContent =
                            'The office map loaded successfully.';
                    }
            });

        map.appendTo(
            '#maps-container'
        );

        function setColorScheme(
            colorScheme
        ) {
            currentColorScheme =
                colorScheme;

            document.documentElement
                .dataset.theme =
                    colorScheme;

            statusElement.textContent =
                colorScheme ===
                'dark'
                    ? 'Dark application theme enabled.'
                    : 'Light application theme enabled.';
        }

        function savePreferences() {
            var visibleLayerIndexes =
                [];

            map.layers.forEach(
                function (
                    layer,
                    index
                ) {
                    if (
                        layer.visible !==
                        false
                    ) {
                        visibleLayerIndexes.push(
                            index
                        );
                    }
                }
            );

            var nextPreferences = {
                version: 1,

                center: {
                    latitude:
                        Number(
                            map.centerPosition
                                .latitude
                        ),
                    longitude:
                        Number(
                            map.centerPosition
                                .longitude
                        )
                },

                zoomFactor:
                    Number(
                        map.zoomSettings
                            .zoomFactor
                    ),

                colorScheme:
                    currentColorScheme,

                visibleLayerIndexes:
                    visibleLayerIndexes,

                savedAt:
                    Date.now()
            };

            try {
                localStorage.setItem(
                    preferencesKey,
                    JSON.stringify(
                        nextPreferences
                    )
                );

                statusElement.textContent =
                    'Map preferences were saved.';
            } catch (
                error
            ) {
                console.error(
                    error
                );

                statusElement.textContent =
                    'Map preferences could not be saved.';
            }
        }

        function resetPreferences() {
            localStorage.removeItem(
                preferencesKey
            );

            currentColorScheme =
                'light';

            document.documentElement
                .dataset.theme =
                    'light';

            map.centerPosition = {
                latitude: 37.7749,
                longitude: -122.4194
            };

            map.zoomSettings
                .zoomFactor =
                    5;

            map.layers[0]
                .visible =
                    true;

            map.refresh();

            statusElement.textContent =
                'Map preferences were reset.';
        }

        document
            .getElementById(
                'light-theme-button'
            )
            .addEventListener(
                'click',
                function () {
                    setColorScheme(
                        'light'
                    );
                }
            );

        document
            .getElementById(
                'dark-theme-button'
            )
            .addEventListener(
                'click',
                function () {
                    setColorScheme(
                        'dark'
                    );
                }
            );

        document
            .getElementById(
                'save-map-button'
            )
            .addEventListener(
                'click',
                savePreferences
            );

        document
            .getElementById(
                'reset-map-button'
            )
            .addEventListener(
                'click',
                resetPreferences
            );

        document
            .getElementById(
                'print-map-button'
            )
            .addEventListener(
                'click',
                function () {
                    map.print();
                }
            );

        document
            .getElementById(
                'export-map-button'
            )
            .addEventListener(
                'click',
                function () {
                    map.export(
                        'PNG',
                        'office-map-' +
                            Date.now()
                    );
                }
            );
    </script>
</body>
</html>
```

## Accessibility Guidance

1. Use semantic HTML headings outside the map.

2. Provide a concise description of the map’s purpose.

3. Use native buttons for print, export, theme, save, and reset actions.

4. Preserve visible focus indicators.

5. Do not rely only on marker, bubble, route, or shape colors.

6. Ensure dark themes provide sufficient text and control contrast.

7. Ensure tooltip text remains readable against tooltip fill.

8. Do not make tooltips the only source of important information.

9. Provide visible status messages for meaningful preference changes.

10. Do not announce every pan, zoom, hover, or render event.

11. Respect user storage and privacy requirements.

12. Provide a reset option for persisted preferences.

13. Validate the map at 200 percent and 400 percent browser zoom.

14. Test print output before production deployment.

15. Include required provider attribution in printed output when necessary.

## Performance Guidance

- Use public Maps properties instead of broad internal CSS overrides.
- Avoid injecting style elements repeatedly.
- Reuse parsed GeoJSON and application data.
- Do not serialize the complete Maps instance.
- Store only minimal preferences.
- Validate stored data once during restoration.
- Batch layer and appearance updates.
- Call `refresh()` once after a complete update.
- Avoid throttling tooltip rendering with delayed callbacks unless profiling demonstrates a real problem.
- Keep marker and tooltip templates simple.
- Cache immutable layer data in typed application structures.
- Remove listeners and clear timers when the dynamic view is removed.
- Destroy the Maps instance during cleanup.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-maps is installed.
✅ Maps is imported.
✅ Print is imported and injected when print is used.
✅ ImageExport is imported and injected when image export is used.
✅ Marker is imported and injected when markers are used.
✅ MapsTooltip is imported and injected when tooltips are visible.
✅ Zoom is imported and injected when zooming is enabled.
✅ Every optional module is injected before Maps construction.
✅ Unused modules are not injected.
✅ Global JavaScript does not call Maps.Inject.
✅ The Maps host exists.
✅ The host has measurable dimensions.
✅ Application-owned wrapper classes provide essential layout styling.
✅ Undocumented internal selectors are not required.
✅ The Maps theme is valid for the installed version.
✅ Background and border use public Maps properties.
✅ markerSettings is an array.
✅ bubbleSettings is an array.
✅ Navigation lines belong inside a layer.
✅ Custom polygons use polygonSettings.polygons.
✅ allowPrint is true when print is used.
✅ allowImageExport is true when image export is used.
✅ Print and export buttons are native buttons.
✅ Storage values are parsed inside try-catch.
✅ Stored preferences are validated before use.
✅ Stored latitude and longitude values are within valid ranges.
✅ Stored zoom values are finite and within application limits.
✅ Stored layer indexes are validated.
✅ The storage schema includes a version.
✅ A reset-preferences action is available.
✅ The complete Maps instance is not serialized.
✅ Preference updates are batched.
✅ refresh is called once after complete runtime updates.
✅ Provider attribution remains visible.
✅ Important meaning is not communicated by color alone.
✅ Application-owned listeners are removed during cleanup.
✅ map.destroy() is called when a dynamic host is removed.
```

## Troubleshooting

### Print Does Not Work

Check:

```typescript
import {
    Maps,
    Print
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Print
);
```

Also enable:

```typescript
allowPrint:
    true
```

Then call:

```typescript
map.print();
```

### Image Export Does Not Work

Check:

```typescript
import {
    ImageExport,
    Maps
} from '@syncfusion/ej2-maps';

Maps.Inject(
    ImageExport
);
```

Enable:

```typescript
allowImageExport:
    true
```

Export:

```typescript
map.export(
    'PNG',
    'office-map'
);
```

### Theme Does Not Change

Check that:

- The selected EJ2 theme is supported.
- The application CSS variables are applied to the outer page.
- Theme buttons update `document.documentElement.dataset.theme`.
- Component-owned colors are updated through Maps properties when required.

Changing application CSS variables does not automatically replace every explicit Maps color.

### Preferences Do Not Restore

Check:

- Browser storage is available.
- The key matches.
- JSON is valid.
- The schema version matches.
- The stored center is valid.
- The zoom factor is valid.
- Layer indexes exist.
- Storage access is not blocked.

### Map State Is Stale

Add a schema version:

```typescript
version:
    1
```

Remove or migrate incompatible saved data when the application model changes.

### Responsive Height Does Not Work

Avoid percentage height unless ancestors have definite heights.

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

### CSS Overrides Do Not Apply

Prefer public configuration properties.

Generated SVG and HTML internals may not use the assumed selectors.

Use:

```typescript
markerSettings
bubbleSettings
shapeSettings
legendSettings
tooltipSettings
titleSettings
mapsArea
background
border
```

## Combined Mistakes and Future References

### Undocumented Internal Selectors

Avoid essential styling through:

```css
.e-map {
    background-color: #f0f0f0;
}

.e-marker {
    opacity: 0.9;
}

.e-bubble {
    stroke-width: 1px;
}
```

Use application-owned wrappers and public Maps settings.

### Arbitrary Custom Theme Object

Incorrect:

```typescript
const customTheme = {
    backgroundColor: '#f5f5f5',
    textStyle: {
        color: '#333333'
    }
};
```

There is no general Maps property that accepts this object.

Use supported models:

```typescript
const map: Maps =
    new Maps({
        background: '#f5f5f5',

        titleSettings: {
            text: 'Map',

            textStyle: {
                color: '#333333'
            }
        }
    });
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

### Template and Built-In Marker Styling Mixed Unnecessarily

Avoid:

```typescript
markerSettings: [
    {
        template:
            '#marker-template',
        shape:
            'Circle',
        imageUrl:
            './marker.png'
    }
]
```

Use a focused template marker, built-in marker, or image marker configuration.

### Encoded Marker Template

Incorrect:

```typescript
template:
    '&lt;svg&gt;&lt;/svg&gt;'
```

Correct:

```typescript
template:
    '#office-marker-template'
```

### Incorrect Print Import Without Injection

Incorrect:

```typescript
import {
    Print
} from '@syncfusion/ej2-maps';

map.print();
```

Correct:

```typescript
import {
    Maps,
    Print
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Print
);
```

Also configure:

```typescript
allowPrint:
    true
```

### Treating print() as HTML

Incorrect:

```typescript
printWindow.document.write(
    map.print()
);
```

Correct:

```typescript
map.print();
```

Use page markup and print CSS for report titles.

### Missing Image-Export Flag

Incorrect:

```typescript
Maps.Inject(
    ImageExport
);

map.export(
    'PNG',
    'map'
);
```

without enabling export.

Correct:

```typescript
const map: Maps =
    new Maps({
        allowImageExport:
            true
    });
```

### Unvalidated Persistence Events

Avoid guessed event names:

```typescript
zoomEnd:
    saveMapState,

panEnd:
    saveMapState
```

Use validated Maps events or explicit user-triggered Save Preferences behavior.

### Parsing Storage Without Validation

Incorrect:

```typescript
const preferences =
    JSON.parse(
        localStorage.getItem(
            'mapState'
        )
    );
```

Correct:

```typescript
const saved =
    localStorage.getItem(
        preferencesKey
    );

if (saved) {
    const parsed:
        unknown =
            JSON.parse(
                saved
            );

    if (
        isMapPreferences(
            parsed
        )
    ) {
        // Apply validated preferences.
    }
}
```

### Serializing the Complete Maps Instance

Incorrect:

```typescript
localStorage.setItem(
    'map',
    JSON.stringify(
        map
    )
);
```

Store only the required application preferences.

### Uninitialized Class Property

Avoid:

```typescript
class MapManager {
    private preferences:
        MapPreferences;

    constructor() {
        this.loadPreferences();
    }
}
```

when `loadPreferences()` does not definitely assign a valid value.

Prefer:

```typescript
class MapManager {
    private preferences:
        MapPreferences =
            defaultPreferences;
}
```

Or assign the validated return value in the constructor.

### Unsafe Style Injection

Avoid repeatedly creating style elements:

```typescript
const styleTag =
    document.createElement(
        'style'
    );

styleTag.innerHTML =
    darkThemeStyles;

document.head.appendChild(
    styleTag
);
```

Use predefined CSS variables and a data attribute:

```typescript
document.documentElement
    .dataset.theme =
        'dark';
```

### Tooltip Throttling Without a Measured Need

Avoid:

```typescript
map.tooltipRender =
    (
        args
    ): void => {
        setTimeout(
            (): void => {
                processTooltip(
                    args
                );
            },
            100
        );
    };
```

This can delay interaction and process stale events.

Keep tooltip rendering lightweight and optimize only after profiling.

### Untyped Layer Cache

Avoid:

```typescript
private cache:
    {
        [
            key:
                string
        ]:
            any
    } = {};
```

Use typed storage:

```typescript
class LayerCache<
    T
> {
    private readonly cache:
        Map<
            string,
            T
        > =
            new Map<
                string,
                T
            >();

    public get(
        key:
            string
    ): T | undefined {
        return this.cache.get(
            key
        );
    }

    public set(
        key:
            string,
        value:
            T
    ): void {
        this.cache.set(
            key,
            value
        );
    }
}
```

### Percentage Height Without Parent Height

Potentially unusable:

```css
#maps-container {
    height: 100%;
}
```

Safer:

```css
#maps-container {
    min-height: 600px;
}
```

### Missing Cleanup

When the dynamic view is removed:

```typescript
printButton?.removeEventListener(
    'click',
    printMap
);

exportButton?.removeEventListener(
    'click',
    exportMap
);

map.destroy();
```

### Editor-Generated Markup

Remove the following from executable HTML, TypeScript, JavaScript, CSS, templates, imports, commands, and URLs:

```text
<strong data-lexical-text="true">
<br>
data-lexical-text
Editor-generated class names
Encoded executable HTML
```