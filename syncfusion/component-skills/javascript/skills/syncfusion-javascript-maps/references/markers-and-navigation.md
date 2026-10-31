# Markers and Navigation in Maps

Markers identify geographic locations, while navigation lines connect coordinates to represent routes, journeys, dependencies, or other geographic relationships.

This guide provides complete framework-neutral Syncfusion EJ2 Maps examples for TypeScript and JavaScript, including:

- OpenStreetMap tile rendering.
- Marker data and coordinate mapping.
- Marker appearance and templates.
- Marker tooltips and selection.
- Marker click handling.
- Dynamic marker updates.
- Navigation-line configuration.
- Dynamic route updates.
- Marker clustering.
- Runtime validation.
- Accessibility, performance, and troubleshooting.

- #required-modules
- #marker-configuration
  - #marker-data-model
  - #basic-marker-setup
  - #marker-appearance
  - #marker-templates
  - #image-markers
- #dynamic-marker-updates
- #navigation-lines
  - #navigation-line-data-model
  - #basic-navigation-line-setup
  - #navigation-line-styling
  - #dynamic-navigation-line-updates
- #marker-tooltips
- #marker-selection
- #marker-events
- #marker-clustering
- #complete-typescript-example
- #complete-javascript-example
- #accessibility-guidance
- #performance-guidance
- #runtime-validation-checklist
- #troubleshooting
- #combined-mistakes-and-future-references

## Required Modules

TypeScript Maps features require their corresponding modules to be imported and injected before creating the Maps instance.

```text
Markers          -> Marker
Navigation lines -> NavigationLine
Marker tooltips  -> MapsTooltip
Marker selection -> Selection
Zooming          -> Zoom
```

A map containing markers, navigation lines, tooltips, selection, zooming, and panning requires:

```typescript
import {
    Maps,
    MapsTooltip,
    Marker,
    NavigationLine,
    Selection,
    Zoom
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Marker,
    NavigationLine,
    Selection,
    MapsTooltip
);
```

Import and injection must occur before Maps construction.

Do not inject unused modules.

When the complete global EJ2 JavaScript bundle is used, explicit module injection is not required.

## Marker Configuration

The `markerSettings` property is an array on a Maps layer.

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

Every marker-settings entry should explicitly enable rendering:

```typescript
visible: true
```

## Marker Data Model

Application marker data can contain latitude, longitude, and any additional fields needed by the application.

```typescript
interface LocationData {
    id: string;
    name: string;
    city: string;
    category: string;
    latitude: number;
    longitude: number;
}
```

Example:

```typescript
const locations: LocationData[] = [
    {
        id: 'san-francisco',
        name: 'San Francisco',
        city: 'San Francisco',
        category: 'Start',
        latitude: 37.7749,
        longitude: -122.4194
    },
    {
        id: 'flagstaff',
        name: 'Flagstaff',
        city: 'Flagstaff',
        category: 'Stop',
        latitude: 35.1983,
        longitude: -111.6513
    },
    {
        id: 'los-angeles',
        name: 'Los Angeles',
        city: 'Los Angeles',
        category: 'Destination',
        latitude: 34.0522,
        longitude: -118.2437
    }
];
```

Map the coordinate fields through:

```typescript
latitudeValuePath:
    'latitude',

longitudeValuePath:
    'longitude'
```

Application-specific fields such as `id`, `name`, `city`, and `category` can be used by templates, tooltips, event handlers, and external detail panels.

## Basic Marker Setup

```typescript
const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        centerPosition: {
            latitude: 36.5,
            longitude: -116
        },

        zoomSettings: {
            enable: true,
            enablePanning: true,
            zoomFactor: 4
        },

        layers: [
            {
                urlTemplate:
                    'https://tile.openstreetmap.org/level/tileX/tileY.png',

                markerSettings: [
                    {
                        visible: true,
                        dataSource:
                            locations,
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

Do not wrap the OpenStreetMap tile URL in an anchor element.

Do not add `type: 'OSM'` unless the installed layer model explicitly requires it for the selected implementation.

## Marker Appearance

Configure shared marker appearance inside the marker-settings entry.

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locations,
        latitudeValuePath:
            'latitude',
        longitudeValuePath:
            'longitude',

        width: 24,
        height: 24,
        shape: 'Circle',
        fill: '#dc2626',
        opacity: 1,
        dashArray: '',

        border: {
            color: '#ffffff',
            width: 2
        }
    }
]
```

Common marker appearance properties include:

```text
width     -> Marker width.
height    -> Marker height.
shape     -> Marker shape.
fill      -> Marker fill color.
opacity   -> Marker opacity.
dashArray -> Marker-border dash pattern.
border    -> Marker-border appearance.
offset    -> Marker position adjustment.
```

Validate marker shape values against the `MarkerType` definition in the installed package.

Do not describe a small example list as the complete set of supported marker shapes.

## Marker Templates

Use the `template` property to render application-owned HTML marker content.

HTML template:

```html
<script
    id="maps-marker-template"
    type="text/x-template"
>
    <div class="maps-marker-template">
        <span class="maps-marker-dot"></span>
        <span>${name}</span>
    </div>
</script>
```

Marker configuration:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locations,
        latitudeValuePath:
            'latitude',
        longitudeValuePath:
            'longitude',
        template:
            '#maps-marker-template'
    }
]
```

CSS:

```css
.maps-marker-template {
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
    font-family:
        "Segoe UI",
        Arial,
        sans-serif;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
}

.maps-marker-dot {
    width: 8px;
    height: 8px;
    background: #dc2626;
    border-radius: 50%;
}
```

Template placeholders must match fields in the marker data.

Do not insert untrusted data into template HTML without validating and sanitizing it according to the application's security requirements.

## Image Markers

Use image-based markers only after validating the image URL and marker-shape requirements of the installed package.

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locations,
        latitudeValuePath:
            'latitude',
        longitudeValuePath:
            'longitude',
        shape: 'Image',
        imageUrl:
            './images/location-marker.png',
        width: 28,
        height: 28
    }
]
```

Ensure that:

- The image exists.
- The browser can access it.
- Content Security Policy permits the image source.
- The image has suitable dimensions.
- The image remains recognizable at different zoom levels.
- Meaning is not conveyed by the image alone.

Do not configure both `template` and `imageUrl` in the same basic marker-settings entry.

## Dynamic Marker Updates

Maintain marker data in an application-owned typed array.

```typescript
let currentLocations:
    LocationData[] = [
        ...locations
    ];
```

Validate new data before assigning it to Maps.

```typescript
const addLocations = (
    newLocations:
        LocationData[]
): void => {
    const nextLocations:
        LocationData[] = [
            ...currentLocations,
            ...newLocations
        ];

    validateLocations(
        nextLocations
    );

    currentLocations =
        nextLocations;

    const firstLayer =
        map.layers[0];

    const markerSettings =
        firstLayer
            .markerSettings[0];

    markerSettings.dataSource =
        currentLocations;

    map.refresh();
};
```

Example update:

```typescript
addLocations([
    {
        id: 'new-york',
        name: 'New York',
        city: 'New York',
        category: 'Office',
        latitude: 40.7128,
        longitude: -74.006
    }
]);
```

Do not assume that `dataSource` is always an array at runtime. It may support other data-source types.

Maintaining a separate typed application collection prevents unsafe calls such as:

```typescript
markerSettings
    .dataSource
    .concat(
        newLocations
    );
```

Call `refresh()` once after the complete validated update.

## Navigation Lines

Navigation lines connect geographic points.

Use `navigationLineSettings` as an array on the Maps layer.

```typescript
layers: [
    {
        urlTemplate:
            'https://tile.openstreetmap.org/level/tileX/tileY.png',

        navigationLineSettings: [
            {
                latitude: [
                    37.7749,
                    35.1983,
                    34.0522
                ],

                longitude: [
                    -122.4194,
                    -111.6513,
                    -118.2437
                ],

                color: '#2563eb',
                width: 3,
                opacity: 0.9,
                dashArray: '8 4'
            }
        ]
    }
]
```

Import and inject `NavigationLine` in TypeScript.

```typescript
import {
    Maps,
    NavigationLine
} from '@syncfusion/ej2-maps';

Maps.Inject(
    NavigationLine
);
```

## Navigation-Line Data Model

Maintain routes in application-owned data.

```typescript
interface RouteData {
    id: string;
    name: string;
    latitude: number[];
    longitude: number[];
    color: string;
    width: number;
    opacity: number;
    dashArray?: string;
}
```

Example:

```typescript
const routes: RouteData[] = [
    {
        id: 'western-route',
        name: 'Western route',
        latitude: [
            37.7749,
            35.1983,
            34.0522
        ],
        longitude: [
            -122.4194,
            -111.6513,
            -118.2437
        ],
        color: '#2563eb',
        width: 3,
        opacity: 0.9,
        dashArray: '8 4'
    }
];
```

Each route requires:

- A nonempty unique ID.
- A meaningful name.
- At least two latitude values.
- At least two longitude values.
- Matching latitude and longitude array lengths.
- Finite latitude values from `-90` to `90`.
- Finite longitude values from `-180` to `180`.
- A finite positive width.
- An opacity from `0` to `1`.

Navigation lines can represent paths containing more than two points when supported by the installed model.

## Basic Navigation-Line Setup

```typescript
navigationLineSettings:
    routes.map(
        (
            route:
                RouteData
        ) => {
            return {
                latitude:
                    route.latitude,
                longitude:
                    route.longitude,
                color:
                    route.color,
                width:
                    route.width,
                opacity:
                    route.opacity,
                dashArray:
                    route.dashArray ?? ''
            };
        }
    )
```

Do not assign navigation lines to a nonexistent Maps-root `navigationLineSettings` property.

Incorrect:

```typescript
map.navigationLineSettings =
    routes;
```

Correct:

```typescript
map.layers[0]
    .navigationLineSettings =
        routeSettings;
```

## Navigation-Line Styling

```typescript
navigationLineSettings: [
    {
        latitude: [
            37.7749,
            35.1983,
            34.0522
        ],

        longitude: [
            -122.4194,
            -111.6513,
            -118.2437
        ],

        color: '#dc2626',
        width: 4,
        opacity: 0.8,
        dashArray: '10 5'
    }
]
```

Common navigation-line properties include:

```text
latitude  -> Latitude collection.
longitude -> Longitude collection.
color     -> Route color.
width     -> Route width.
opacity   -> Route opacity.
dashArray -> Route dash pattern.
visible   -> Route visibility where supported.
angle     -> Curvature or angle configuration where supported.
arrowSettings -> Navigation-line arrow configuration.
```

Validate animation, angle, and arrow settings against the installed model before using them.

## Dynamic Navigation-Line Updates

Maintain an application-owned route collection.

```typescript
let currentRoutes:
    RouteData[] = [
        ...routes
    ];
```

Convert application routes into Maps settings:

```typescript
const createNavigationLineSettings = (
    routeCollection:
        RouteData[]
) => {
    return routeCollection.map(
        (
            route:
                RouteData
        ) => {
            return {
                latitude:
                    route.latitude,
                longitude:
                    route.longitude,
                color:
                    route.color,
                width:
                    route.width,
                opacity:
                    route.opacity,
                dashArray:
                    route.dashArray ?? ''
            };
        }
    );
};
```

Update routes safely:

```typescript
const updateRoutes = (
    nextRoutes:
        RouteData[]
): void => {
    validateRoutes(
        nextRoutes
    );

    currentRoutes =
        nextRoutes.map(
            (
                route:
                    RouteData
            ): RouteData => {
                return {
                    ...route,
                    latitude: [
                        ...route.latitude
                    ],
                    longitude: [
                        ...route.longitude
                    ]
                };
            }
        );

    map.layers[0]
        .navigationLineSettings =
            createNavigationLineSettings(
                currentRoutes
            );

    map.refresh();
};
```

Add a route:

```typescript
updateRoutes([
    ...currentRoutes,
    {
        id: 'return-route',
        name: 'Return route',
        latitude: [
            34.0522,
            37.7749
        ],
        longitude: [
            -118.2437,
            -122.4194
        ],
        color: '#16a34a',
        width: 2,
        opacity: 0.8,
        dashArray: '5 5'
    }
]);
```

Validate the complete route collection before assignment and call `refresh()` once.

## Marker Tooltips

Import and inject `MapsTooltip`.

```typescript
import {
    Maps,
    MapsTooltip
} from '@syncfusion/ej2-maps';

Maps.Inject(
    MapsTooltip
);
```

Place tooltip settings inside the marker-settings entry.

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locations,
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

Use the built-in `valuePath` configuration first.

A custom template can be provided after validating the template context.

```html
<script
    id="maps-marker-tooltip-template"
    type="text/x-template"
>
    <div class="maps-tooltip">
        <strong>${name}</strong>
        <span>${city}</span>
    </div>
</script>
```

```typescript
tooltipSettings: {
    visible: true,
    valuePath:
        'name',
    template:
        '#maps-marker-tooltip-template'
}
```

Do not make tooltip content the only source of essential location information.

## Marker Selection

Import and inject `Selection`.

```typescript
import {
    Maps,
    Selection
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Selection
);
```

Configure selection inside the marker-settings entry.

```typescript
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
```

The `opacity` property controls the appearance of a selected marker.

It does not represent the opacity of all unselected markers.

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

Do not rely on an undocumented modifier-key interaction. Test multi-selection with the installed package, browser, operating system, and input device.

## Marker Events

Common marker-related Maps events can include:

```text
markerClick
markerRendering
markerClusterClick
markerClusterRendering
```

Navigation-line rendering can be customized through:

```text
navigationLineRendering
```

Validate the exact event names, exported argument models, and event fields against the installed `@syncfusion/ej2-maps` version.

Use `markerClick` for application logic such as updating a details panel.

Visual selection remains controlled by `selectionSettings`.

```typescript
const map: Maps =
    new Maps({
        markerClick:
            (args): void => {
                console.log(
                    'A marker was clicked.',
                    args
                );
            },

        markerRendering:
            (args): void => {
                console.log(
                    'A marker is rendering.',
                    args
                );
            },

        navigationLineRendering:
            (args): void => {
                console.log(
                    'A navigation line is rendering.',
                    args
                );
            },

        layers
    });
```

Keep high-frequency rendering handlers lightweight.

Do not assume that an event contains `args.data` until the installed event model has been validated.

## Safe Marker Event Data Validation

Define a type guard:

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

    const candidate =
        value as
            Partial<
                LocationData
            >;

    return (
        typeof candidate.id ===
            'string' &&
        candidate.id.trim().length > 0 &&
        typeof candidate.name ===
            'string' &&
        candidate.name.trim().length > 0 &&
        typeof candidate.latitude ===
            'number' &&
        Number.isFinite(
            candidate.latitude
        ) &&
        typeof candidate.longitude ===
            'number' &&
        Number.isFinite(
            candidate.longitude
        )
    );
};
```

Use it only after validating which event member holds the marker data.

```typescript
markerClick:
    (args): void => {
        const eventData =
            args as {
                data?:
                    unknown;
            };

        if (
            !isLocationData(
                eventData.data
            )
        ) {
            return;
        }

        renderMarkerDetails(
            eventData.data
        );
    }
```

Replace the contextual or guarded argument with the exact exported event type after verifying the installed package.

## Marker Clustering

Marker clustering groups nearby markers to reduce overlap.

Cluster configuration belongs inside the marker-settings entry under `clusterSettings`.

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locations,
        latitudeValuePath:
            'latitude',
        longitudeValuePath:
            'longitude',

        clusterSettings: {
            allowClustering: true,
            allowClusterExpand: true,
            allowDeepClustering: true,
            width: 26,
            height: 26,
            fill: '#7c3aed',
            shape: 'Circle',
            opacity: 1,

            border: {
                color: '#ffffff',
                width: 2
            },

            labelStyle: {
                color: '#ffffff',
                size: '12px',
                fontFamily:
                    'Segoe UI',
                fontWeight: '600'
            }
        }
    }
]
```

Supported cluster settings can include:

```text
allowClustering
allowClusterExpand
allowDeepClustering
fill
width
height
shape
opacity
border
labelStyle
connectorLineSettings
dashArray
offset
imageUrl
```

Validate cluster shape and image settings against the installed package.

Do not use:

```typescript
markerClusterSettings: {
    allowClustering: true
}
```

Do not use an unsupported `clusterRadius` unless the installed model explicitly provides it.

Do not use an unverified nested `labelSettings`.

Use:

```typescript
labelStyle: {
    color: '#ffffff'
}
```

Clustering should be enabled based on measured application performance and visual density, not a fixed marker-count threshold.

## Complete TypeScript Example

This example provides:

- OpenStreetMap tiles.
- Three route waypoints.
- A multi-point navigation line.
- Marker tooltips.
- Marker selection.
- Marker-click details.
- Zooming and panning.
- Runtime marker and route validation.
- OpenStreetMap attribution.

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
        Maps Markers and Navigation Lines
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
                Western Route
            </h1>

            <p id="maps-description">
                The route connects San Francisco, Flagstaff,
                and Los Angeles. Select a marker to view its
                location details.
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
                    Waypoint details
                </h2>

                <p>
                    Select a waypoint marker to view its details.
                </p>
            </section>

            <section
                class="route-summary"
                aria-labelledby="route-summary-heading"
            >
                <h2 id="route-summary-heading">
                    Route summary
                </h2>

                <ol>
                    <li>Start: San Francisco</li>
                    <li>Stop: Flagstaff</li>
                    <li>Destination: Los Angeles</li>
                </ol>
            </section>

            <p
                id="maps-status"
                class="visually-hidden"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the route map.
            </p>
        </section>
    </main>

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

.map-attribution {
    margin: 8px 0 0;
    color: #475569;
    font-size: 12px;
}

.details-panel,
.route-summary {
    margin-top: 20px;
    padding: 16px;
    color: #111827;
    background: #f8fafc;
    border: 1px solid #94a3b8;
    border-radius: 6px;
}

.details-panel h2,
.route-summary h2 {
    margin: 0 0 8px;
    font-size: 18px;
}

.details-panel p {
    margin: 4px 0;
}

.route-summary ol {
    margin: 0;
    padding-left: 24px;
}

.route-summary li {
    margin: 6px 0;
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
    NavigationLine,
    Selection,
    Zoom,
    type LayerSettingsModel,
    type NavigationLineSettingsModel
} from '@syncfusion/ej2-maps';

Maps.Inject(
    Zoom,
    Marker,
    NavigationLine,
    Selection,
    MapsTooltip
);

interface LocationData {
    id: string;
    name: string;
    city: string;
    category: string;
    latitude: number;
    longitude: number;
}

interface RouteData {
    id: string;
    name: string;
    latitude: number[];
    longitude: number[];
    color: string;
    width: number;
    opacity: number;
    dashArray?: string;
}

const locations:
    LocationData[] = [
        {
            id: 'san-francisco',
            name: 'San Francisco',
            city: 'San Francisco',
            category: 'Start',
            latitude: 37.7749,
            longitude: -122.4194
        },
        {
            id: 'flagstaff',
            name: 'Flagstaff',
            city: 'Flagstaff',
            category: 'Stop',
            latitude: 35.1983,
            longitude: -111.6513
        },
        {
            id: 'los-angeles',
            name: 'Los Angeles',
            city: 'Los Angeles',
            category: 'Destination',
            latitude: 34.0522,
            longitude: -118.2437
        }
    ];

const routes:
    RouteData[] = [
        {
            id: 'western-route',
            name: 'Western route',
            latitude: [
                37.7749,
                35.1983,
                34.0522
            ],
            longitude: [
                -122.4194,
                -111.6513,
                -118.2437
            ],
            color: '#2563eb',
            width: 3,
            opacity: 0.9,
            dashArray: '8 4'
        }
    ];

const validateLocations = (
    locationCollection:
        LocationData[]
): void => {
    const ids:
        Set<string> =
            new Set<string>();

    locationCollection.forEach(
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

const validateRoutes = (
    routeCollection:
        RouteData[]
): void => {
    const ids:
        Set<string> =
            new Set<string>();

    routeCollection.forEach(
        (
            route:
                RouteData
        ): void => {
            if (
                !route.id.trim()
            ) {
                throw new Error(
                    'Every navigation line requires a nonempty ID.'
                );
            }

            if (
                ids.has(
                    route.id
                )
            ) {
                throw new Error(
                    'Duplicate navigation-line ID: ' +
                    route.id
                );
            }

            if (
                route.latitude.length < 2 ||
                route.longitude.length < 2
            ) {
                throw new Error(
                    'Route "' +
                    route.name +
                    '" requires at least two coordinates.'
                );
            }

            if (
                route.latitude.length !==
                route.longitude.length
            ) {
                throw new Error(
                    'Route "' +
                    route.name +
                    '" must contain matching latitude and longitude arrays.'
                );
            }

            route.latitude.forEach(
                (
                    latitude:
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
                            'Route "' +
                            route.name +
                            '" contains an invalid latitude.'
                        );
                    }
                }
            );

            route.longitude.forEach(
                (
                    longitude:
                        number
                ): void => {
                    if (
                        !Number.isFinite(
                            longitude
                        ) ||
                        longitude < -180 ||
                        longitude > 180
                    ) {
                        throw new Error(
                            'Route "' +
                            route.name +
                            '" contains an invalid longitude.'
                        );
                    }
                }
            );

            if (
                !Number.isFinite(
                    route.width
                ) ||
                route.width <= 0
            ) {
                throw new Error(
                    'Route "' +
                    route.name +
                    '" requires a finite positive width.'
                );
            }

            if (
                !Number.isFinite(
                    route.opacity
                ) ||
                route.opacity < 0 ||
                route.opacity > 1
            ) {
                throw new Error(
                    'Route "' +
                    route.name +
                    '" requires an opacity between 0 and 1.'
                );
            }

            ids.add(
                route.id
            );
        }
    );
};

const createNavigationLineSettings = (
    routeCollection:
        RouteData[]
): NavigationLineSettingsModel[] => {
    return routeCollection.map(
        (
            route:
                RouteData
        ): NavigationLineSettingsModel => {
            return {
                latitude: [
                    ...route.latitude
                ],
                longitude: [
                    ...route.longitude
                ],
                color:
                    route.color,
                width:
                    route.width,
                opacity:
                    route.opacity,
                dashArray:
                    route.dashArray ?? ''
            };
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
        'Waypoint type: ' +
        marker.category;

    const city:
        HTMLParagraphElement =
            document.createElement(
                'p'
            );

    city.textContent =
        'City: ' +
        marker.city;

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
        city,
        coordinates
    );
};

validateLocations(
    locations
);

validateRoutes(
    routes
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
            urlTemplate:
                'https://tile.openstreetmap.org/level/tileX/tileY.png',

            markerSettings: [
                {
                    visible: true,
                    dataSource:
                        locations,
                    latitudeValuePath:
                        'latitude',
                    longitudeValuePath:
                        'longitude',
                    width: 22,
                    height: 22,
                    shape: 'Circle',
                    fill: '#dc2626',
                    opacity: 1,

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
            ],

            navigationLineSettings:
                createNavigationLineSettings(
                    routes
                )
        }
    ];

const map: Maps =
    new Maps({
        width: '100%',
        height: '600px',

        centerPosition: {
            latitude: 36,
            longitude: -117
        },

        zoomSettings: {
            enable: true,
            enablePanning: true,
            mouseWheelZoom: true,
            pinchZooming: true,
            doubleClickZoom: true,
            minZoom: 1,
            maxZoom: 13,
            zoomFactor: 4,

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

        layers,

        markerClick:
            (args): void => {
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
                        locations.find(
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
                        ' waypoint selected.';
                }
            },

        loaded:
            (): void => {
                if (statusElement) {
                    statusElement.textContent =
                        'The western route map loaded successfully.';
                }
            }
    });

map.appendTo(
    host
);
```

The exact marker-click event type and data member must be verified against the installed `@syncfusion/ej2-maps` version. The runtime guard prevents unvalidated event data from being used directly.

## Complete JavaScript Example

This example uses the complete global EJ2 bundle.

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
        Maps Markers and Navigation Lines
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

        .details-panel,
        .route-summary {
            margin-top: 20px;
            padding: 16px;
            color: #111827;
            background: #f8fafc;
            border: 1px solid #94a3b8;
            border-radius: 6px;
        }

        .details-panel h2,
        .route-summary h2 {
            margin: 0 0 8px;
            font-size: 18px;
        }

        .details-panel p {
            margin: 4px 0;
        }

        .route-summary ol {
            margin: 0;
            padding-left: 24px;
        }

        .route-summary li {
            margin: 6px 0;
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
                Western Route
            </h1>

            <p id="maps-description">
                The route connects San Francisco, Flagstaff,
                and Los Angeles. Select a marker to view its
                location details.
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
                    Waypoint details
                </h2>

                <p>
                    Select a waypoint marker to view its details.
                </p>
            </section>

            <section
                class="route-summary"
                aria-labelledby="route-summary-heading"
            >
                <h2 id="route-summary-heading">
                    Route summary
                </h2>

                <ol>
                    <li>Start: San Francisco</li>
                    <li>Stop: Flagstaff</li>
                    <li>Destination: Los Angeles</li>
                </ol>
            </section>

            <p
                id="maps-status"
                class="visually-hidden"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the route map.
            </p>
        </section>
    </main>

    <script>
        var locations = [
            {
                id: 'san-francisco',
                name: 'San Francisco',
                city: 'San Francisco',
                category: 'Start',
                latitude: 37.7749,
                longitude: -122.4194
            },
            {
                id: 'flagstaff',
                name: 'Flagstaff',
                city: 'Flagstaff',
                category: 'Stop',
                latitude: 35.1983,
                longitude: -111.6513
            },
            {
                id: 'los-angeles',
                name: 'Los Angeles',
                city: 'Los Angeles',
                category: 'Destination',
                latitude: 34.0522,
                longitude: -118.2437
            }
        ];

        var routes = [
            {
                id: 'western-route',
                name: 'Western route',
                latitude: [
                    37.7749,
                    35.1983,
                    34.0522
                ],
                longitude: [
                    -122.4194,
                    -111.6513,
                    -118.2437
                ],
                color: '#2563eb',
                width: 3,
                opacity: 0.9,
                dashArray: '8 4'
            }
        ];

        function validateLocations(
            locationCollection
        ) {
            var ids =
                new Set();

            locationCollection.forEach(
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
                        typeof location.name !==
                            'string' ||
                        location.name
                            .trim()
                            .length === 0
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

        function validateRoutes(
            routeCollection
        ) {
            var ids =
                new Set();

            routeCollection.forEach(
                function (route) {
                    if (
                        typeof route.id !==
                            'string' ||
                        route.id
                            .trim()
                            .length === 0
                    ) {
                        throw new Error(
                            'Every navigation line requires a nonempty ID.'
                        );
                    }

                    if (
                        ids.has(
                            route.id
                        )
                    ) {
                        throw new Error(
                            'Duplicate navigation-line ID: ' +
                            route.id
                        );
                    }

                    if (
                        !Array.isArray(
                            route.latitude
                        ) ||
                        !Array.isArray(
                            route.longitude
                        ) ||
                        route.latitude.length < 2 ||
                        route.longitude.length < 2
                    ) {
                        throw new Error(
                            'Route "' +
                            route.name +
                            '" requires at least two coordinates.'
                        );
                    }

                    if (
                        route.latitude.length !==
                        route.longitude.length
                    ) {
                        throw new Error(
                            'Route "' +
                            route.name +
                            '" must contain matching latitude and longitude arrays.'
                        );
                    }

                    route.latitude.forEach(
                        function (
                            latitude
                        ) {
                            if (
                                !Number.isFinite(
                                    latitude
                                ) ||
                                latitude < -90 ||
                                latitude > 90
                            ) {
                                throw new Error(
                                    'Route "' +
                                    route.name +
                                    '" contains an invalid latitude.'
                                );
                            }
                        }
                    );

                    route.longitude.forEach(
                        function (
                            longitude
                        ) {
                            if (
                                !Number.isFinite(
                                    longitude
                                ) ||
                                longitude < -180 ||
                                longitude > 180
                            ) {
                                throw new Error(
                                    'Route "' +
                                    route.name +
                                    '" contains an invalid longitude.'
                                );
                            }
                        }
                    );

                    if (
                        !Number.isFinite(
                            route.width
                        ) ||
                        route.width <= 0
                    ) {
                        throw new Error(
                            'Route "' +
                            route.name +
                            '" requires a finite positive width.'
                        );
                    }

                    if (
                        !Number.isFinite(
                            route.opacity
                        ) ||
                        route.opacity < 0 ||
                        route.opacity > 1
                    ) {
                        throw new Error(
                            'Route "' +
                            route.name +
                            '" requires an opacity between 0 and 1.'
                        );
                    }

                    ids.add(
                        route.id
                    );
                }
            );
        }

        function createNavigationLineSettings(
            routeCollection
        ) {
            return routeCollection.map(
                function (route) {
                    return {
                        latitude:
                            route.latitude.slice(),
                        longitude:
                            route.longitude.slice(),
                        color:
                            route.color,
                        width:
                            route.width,
                        opacity:
                            route.opacity,
                        dashArray:
                            route.dashArray ||
                            ''
                    };
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
                'Waypoint type: ' +
                marker.category;

            var city =
                document.createElement(
                    'p'
                );

            city.textContent =
                'City: ' +
                marker.city;

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
                city,
                coordinates
            );
        }

        validateLocations(
            locations
        );

        validateRoutes(
            routes
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
                    latitude: 36,
                    longitude: -117
                },

                zoomSettings: {
                    enable: true,
                    enablePanning: true,
                    mouseWheelZoom: true,
                    pinchZooming: true,
                    doubleClickZoom: true,
                    minZoom: 1,
                    maxZoom: 13,
                    zoomFactor: 4,

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
                                    locations,
                                latitudeValuePath:
                                    'latitude',
                                longitudeValuePath:
                                    'longitude',
                                width: 22,
                                height: 22,
                                shape: 'Circle',
                                fill: '#dc2626',
                                opacity: 1,

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
                        ],

                        navigationLineSettings:
                            createNavigationLineSettings(
                                routes
                            )
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
                            locations.find(
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
                                ' waypoint selected.';
                        }
                    },

                loaded:
                    function () {
                        if (
                            statusElement
                        ) {
                            statusElement.textContent =
                                'The western route map loaded successfully.';
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

## Accessibility Guidance

1. Give every marker a meaningful name.

2. Do not rely only on marker color.

3. Use shape, text, borders, labels, tooltips, or detail panels as additional distinctions.

4. Provide a persistent route summary.

5. Update a visible detail panel after marker activation.

6. Do not make tooltip content the only source of location information.

7. Keep selected-marker borders visible against both the map and marker fill.

8. Use marker dimensions that remain usable on touch devices.

9. Avoid requiring precise pointer movement.

10. Test marker templates with keyboard and assistive technologies.

11. Preserve visible focus around application-owned controls.

12. Keep route names and descriptions available outside the visual route line.

13. Avoid relying only on differently colored route lines.

14. Announce only meaningful marker selections through live regions.

15. Do not announce every hover, pan, zoom, or render event.

## Performance Guidance

- Validate markers and routes before rendering.
- Keep marker templates simple.
- Avoid rebuilding unchanged marker collections.
- Batch marker updates.
- Batch navigation-line updates.
- Call `refresh()` once after a complete update.
- Avoid logging every marker-rendering event.
- Debounce zoom-driven or pan-driven application updates.
- Enable clustering only after profiling representative data.
- Test marker clustering at different zoom levels.
- Test performance on target mobile devices.
- Avoid unnecessary animation for very large marker collections.
- Remove application-owned event listeners when the view is removed.
- Destroy the Maps instance when its dynamic host is removed.

Cleanup:

```typescript
map.destroy();
```

If application-owned listeners were added:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);

map.destroy();
```

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-maps is installed for TypeScript.
✅ Maps is imported.
✅ Marker is imported and injected when markers are used.
✅ NavigationLine is imported and injected when routes are used.
✅ MapsTooltip is imported and injected when marker tooltips are visible.
✅ Selection is imported and injected when marker selection is enabled.
✅ Zoom is imported and injected when zooming or panning is enabled.
✅ Every injected module is imported.
✅ Unused modules are not injected.
✅ Global JavaScript does not call Maps.Inject.
✅ The global EJ2 bundle loads before application code.
✅ The CDN URL ends in .min.js.
✅ The Maps host exists.
✅ The host ID matches the appendTo selector.
✅ The host has a measurable height.
✅ The OpenStreetMap URL is a plain string.
✅ The tile URL contains level, tileX, and tileY placeholders.
✅ OpenStreetMap attribution is visible.
✅ markerSettings is an array.
✅ Every active marker-settings entry has visible set to true.
✅ LatitudeValuePath matches the marker data.
✅ LongitudeValuePath matches the marker data.
✅ Every marker ID is nonempty.
✅ Every marker ID is unique.
✅ Every marker name is nonempty.
✅ Every latitude is finite and between -90 and 90.
✅ Every longitude is finite and between -180 and 180.
✅ Marker template selectors exist.
✅ Marker template fields match marker data.
✅ Image marker paths are accessible.
✅ Tooltips are configured inside a marker-settings entry.
✅ Tooltip fields match marker data.
✅ Selection settings are configured inside a marker-settings entry.
✅ Selection opacity is understood as selected-marker opacity.
✅ enableMultiSelect is configured intentionally.
✅ Cluster configuration uses clusterSettings.
✅ Clustering uses labelStyle instead of an unsupported labelSettings.
✅ navigationLineSettings is an array on the layer.
✅ Every route ID is nonempty.
✅ Every route ID is unique.
✅ Every route contains at least two coordinates.
✅ Every route has matching latitude and longitude array lengths.
✅ Every route coordinate is finite and within its valid range.
✅ Every route width is finite and positive.
✅ Every route opacity is between 0 and 1.
✅ Navigation-line dash formats are validated.
✅ Dynamic marker updates use application-owned typed arrays.
✅ Dynamic route updates validate the complete next collection.
✅ Refresh is called once after each complete update.
✅ Event names exist in the installed Maps package.
✅ Event members are validated before use.
✅ Marker event data is checked before casting.
✅ DOM updates use textContent instead of unsafe innerHTML.
✅ Important information is not communicated only through colors.
✅ Application-owned listeners and timers are cleaned up.
✅ map.destroy() is called when a dynamic host is removed.
✅ No encoded HTML replaces executable markup.
✅ No rich-text anchors wrap tile URLs.
✅ No malformed .jsscript URL exists.
```

## Troubleshooting

### Markers Do Not Appear

Check:

- `Marker` is imported and injected.
- `markerSettings` is an array.
- `visible` is true.
- The marker data source exists.
- Coordinate paths match the data.
- Coordinates are finite and valid.
- Markers are inside the visible map area.
- The host has a measurable height.

### Marker Tooltip Does Not Appear

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

Enable the tooltip inside the marker entry:

```typescript
tooltipSettings: {
    visible: true,
    valuePath:
        'name'
}
```

### Marker Selection Does Not Work

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

Enable marker selection:

```typescript
selectionSettings: {
    enable: true
}
```

### Navigation Lines Do Not Appear

Check:

- `NavigationLine` is imported and injected.
- `navigationLineSettings` is on the layer.
- Latitude and longitude collections exist.
- Both collections have matching lengths.
- Both collections contain at least two coordinates.
- All coordinates are finite and valid.
- Width is greater than zero.
- Opacity is greater than zero.

### Marker Template Does Not Appear

Check:

- The template selector exists.
- The selector begins with `#`.
- Template fields match marker data.
- The marker has valid coordinates.
- Template CSS does not hide the element.
- The template is present before Maps initialization.

### Image Marker Does Not Appear

Check:

- The marker uses a supported image-compatible shape.
- `imageUrl` points to an existing file.
- The server returns an image.
- CSP permits the image source.
- Width and height are greater than zero.

### Marker Cluster Does Not Appear

Use:

```typescript
clusterSettings: {
    allowClustering: true
}
```

Do not use:

```typescript
markerClusterSettings: {
    allowClustering: true
}
```

Clustering may be more visible when several markers are geographically close at the current zoom level.

### Dynamic Marker Update Fails

Do not assume that the runtime data source always supports `concat()`.

Maintain an application-owned array, validate the complete next state, assign it to the marker-settings entry, and call `refresh()` once.

### Dynamic Route Update Fails

Do not assign routes at the Maps root.

Incorrect:

```typescript
map.navigationLineSettings =
    nextRoutes;
```

Correct:

```typescript
map.layers[0]
    .navigationLineSettings =
        nextRouteSettings;

map.refresh();
```

### Marker Click Data Is Undefined

The event data structure can vary with the package version and configuration.

Validate the exact marker-click event model and inspect the event safely before accessing its fields.

Do not assume:

```typescript
args.data
```

without verification.

### OpenStreetMap Tiles Do Not Load

Check:

- Network connectivity.
- Tile URL.
- CSP configuration.
- HTTPS usage.
- Tile-provider availability.
- Rich-text corruption in the URL.
- Browser console network errors.

Correct URL:

```typescript
urlTemplate:
    'https://tile.openstreetmap.org/level/tileX/tileY.png'
```

## Combined Mistakes and Future References

### Marker Settings as an Object

Incorrect:

```typescript
markerSettings: {
    dataSource:
        locations
}
```

Correct:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locations
    }
]
```

### Missing Marker Visibility

Incorrect:

```typescript
markerSettings: [
    {
        dataSource:
            locations
    }
]
```

Correct:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locations
    }
]
```

### Missing Coordinate Paths

Incorrect:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locations
    }
]
```

Preferred for named application fields:

```typescript
markerSettings: [
    {
        visible: true,
        dataSource:
            locations,
        latitudeValuePath:
            'latitude',
        longitudeValuePath:
            'longitude'
    }
]
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

### Encoded Marker Template

Incorrect:

```typescript
template:
    '&lt;div&gt;${name}&lt;/div&gt;'
```

Correct:

```typescript
template:
    '<div>${name}</div>'
```

Preferred for nontrivial content:

```typescript
template:
    '#maps-marker-template'
```

### Template and Image Configured Together

Avoid:

```typescript
markerSettings: [
    {
        template:
            '#maps-marker-template',
        imageUrl:
            './images/marker.png'
    }
]
```

Use either a template marker or an image marker in a focused configuration.

### Unsafe Dynamic Data Source Update

Avoid:

```typescript
map.layers[0]
    .markerSettings[0]
    .dataSource =
        map.layers[0]
            .markerSettings[0]
            .dataSource
            .concat(
                newMarkers
            );
```

Maintain and validate an application-owned array:

```typescript
const nextLocations:
    LocationData[] = [
        ...currentLocations,
        ...newLocations
    ];

validateLocations(
    nextLocations
);

currentLocations =
    nextLocations;

map.layers[0]
    .markerSettings[0]
    .dataSource =
        currentLocations;

map.refresh();
```

### Navigation Lines on the Maps Root

Incorrect:

```typescript
map.navigationLineSettings.push(
    newRoute
);
```

Correct:

```typescript
map.layers[0]
    .navigationLineSettings =
        nextRouteSettings;

map.refresh();
```

### Mismatched Route Arrays

Incorrect:

```typescript
{
    latitude: [
        37.7749,
        35.1983,
        34.0522
    ],

    longitude: [
        -122.4194,
        -111.6513
    ]
}
```

Correct:

```typescript
{
    latitude: [
        37.7749,
        35.1983,
        34.0522
    ],

    longitude: [
        -122.4194,
        -111.6513,
        -118.2437
    ]
}
```

### Marker Selection Opacity Misinterpretation

Incorrect statement:

```text
Selection opacity controls the opacity of unselected markers.
```

Correct:

```text
Selection opacity configures the appearance of the selected marker.
```

### Marker Settings Accessed from the Maps Root

Incorrect:

```typescript
map.markerSettings
    .selectionSettings
    .opacity = 0.3;
```

Correct location:

```typescript
map.layers[0]
    .markerSettings[0]
    .selectionSettings;
```

Prefer configuring selection before rendering rather than mutating it during a click event.

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
    clusterRadius: 100
}
```

unless the installed cluster model explicitly supports it.

### Incorrect Cluster Label Model

Avoid:

```typescript
clusterSettings: {
    labelSettings: {
        visible: true
    }
}
```

Use:

```typescript
clusterSettings: {
    labelStyle: {
        color: '#ffffff',
        size: '12px'
    }
}
```

### Fixed Clustering Threshold Claim

Avoid:

```text
Always enable clustering for more than 100 markers.
```

Use:

```text
Enable and tune clustering after profiling representative
marker data on target browsers, devices, and zoom levels.
```

### Unsafe Marker Details

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

### Unvalidated Event Data

Avoid:

```typescript
markerClick:
    (
        args
    ): void => {
        console.log(
            args.data.latitude
        );
    }
```

Validate the event model and event data first.

### Refresh Inside an Update Loop

Incorrect:

```typescript
routes.forEach(
    (
        route:
            RouteData
    ): void => {
        updateRoute(
            route
        );

        map.refresh();
    }
);
```

Correct:

```typescript
routes.forEach(
    (
        route:
            RouteData
    ): void => {
        updateRoute(
            route
        );
    }
);

map.refresh();
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