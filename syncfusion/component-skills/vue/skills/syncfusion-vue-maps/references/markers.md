# Markers in Vue Maps

## Table of Contents
- [Adding Markers to Maps](#adding-markers-to-maps)
  - [Basic Marker Setup](#basic-marker-setup)
- [Marker Data Structure](#marker-data-structure)
  - [Required Fields](#required-fields)
  - [Complete Marker Object](#complete-marker-object)
  - [Example: Store Locator Data](#example-store-locator-data)
- [Marker Shapes and Customization](#marker-shapes-and-customization)
  - [Built-in Marker Shapes](#built-in-marker-shapes)
  - [Size and Styling](#size-and-styling)
  - [Conditional Marker Styling](#conditional-marker-styling)
- [Custom Marker Templates](#custom-marker-templates)
  - [Template Marker Example](#template-marker-example)
- [Marker Clustering](#marker-clustering)
  - [Enable Clustering](#enable-clustering)
- [Interactive Markers](#interactive-markers)
  - [Click Event Handling](#click-event-handling)
  - [Hover Effects](#hover-effects)
- [Marker Tooltips](#marker-tooltips)
  - [Simple Tooltip](#simple-tooltip)
  - [Custom Tooltip Template](#custom-tooltip-template)
- [Dynamic Marker Updates](#dynamic-marker-updates)
  - [Adding Markers Dynamically](#adding-markers-dynamically)
- [Common Marker Use Cases](#common-marker-use-cases)
  - [Use Case 1: Store Locator](#use-case-1-store-locator)
  - [Use Case 2: Travel Route (Markers for Start/End)](#use-case-2-travel-route-markers-for-startend)
  - [Use Case 3: Event Locations](#use-case-3-event-locations)
  - [Use Case 4: Density Map (Size-based on Value)](#use-case-4-density-map-size-based-on-value)

## Adding Markers to Maps

Markers are visual indicators placed at specific geographical coordinates. Use markers to highlight specific locations like cities, stores, landmarks, or events.

### Basic Marker Setup

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :shapeData='shapeData' :markerSettings='markerSettings'></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Marker, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
data () {
    return {
      shapeData: world_map,
        markerSettings: [
            {
                dataSource: [
                    { latitude: 49.95121990866204, longitude: 18.468749999999998 },
                    { latitude: 59.88893689676585, longitude: -109.3359375 },
                    { latitude: -6.64607562172573, longitude: -55.54687499999999 }
                ],
                visible: true,
                height: 20,
                width: 20,
                animationDuration: 0
            }
        ]
    }
},
provide: {
    maps: [Marker]
}
}
</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

**Key steps:**
1. Import `Marker` service and provide it
2. Import `MarkersDirective` and `MarkerDirective`
3. Create marker data with latitude and longitude
4. Add `<e-markers>` inside your layer with `:dataSource`

## Marker Data Structure

Each marker requires latitude, longitude, and optional properties:

### Required Fields

```javascript
[
  {
    latitude: 40.7128,    // Required: Y-coordinate
    longitude: -74.0060,  // Required: X-coordinate
    // ... additional fields
  }
]
```

### Complete Marker Object

```javascript
markerData: [
  {
    // Location (required)
    latitude: 40.7128,
    longitude: -74.0060,
    
    // Display properties
    name: 'New York',
    city: 'New York',
    population: 8336817,
    
    // Custom marker properties
    shape: 'Circle',           // Control marker shape
    width: 20,                 // Size
    height: 20,
    imageUrl: 'pin.png',      // Custom image
    
    // Tooltip
    tooltipText: 'Population: 8.3M'
  }
]
```

### Example: Store Locator Data

```javascript
storeData: [
  {
    latitude: 40.7128,
    longitude: -74.0060,
    storeName: 'NYC Store',
    address: '123 Main St',
    phone: '555-0001',
    revenue: 2500000
  },
  {
    latitude: 34.0522,
    longitude: -118.2437,
    storeName: 'LA Store',
    address: '456 Oak Ave',
    phone: '555-0002',
    revenue: 1800000
  }
]
```

## Marker Shapes and Customization

### Built-in Marker Shapes

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer :shapeData="world_map">
        <e-markers
          :dataSource="markerData"
          :shape="markerShape"
          :width="15"
          :height="15"
        >
        </e-markers>
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
export default {
  data() {
    return {
      markerShape: 'Circle',  // or 'Rectangle', 'Diamond', 'Star', 'Triangle', 'Image', 'Cross', 'HorizontalBar', 'VerticalBar'
      markerData: [
        { latitude: 40.7128, longitude: -74.0060, name: 'New York' }
      ]
    };
  }
};
</script>
```

**Available shapes:**
- `Circle` - Default circular marker
- `Rectangle` - Square marker
- `Diamond` - Diamond-shaped
- `Star` - Five-pointed star
- `Triangle` - Triangle pointing up
- `Cross` - Plus/cross symbol
- `HorizontalBar` - Horizontal bar
- `VerticalBar` - Vertical bar
- `Image` - Custom image marker

### Size and Styling

```javascript
markerSettings: {
  shape: 'Circle',
  width: 20,              // In pixels
  height: 20,
  fill: '#0066CC',        // Background color
  border: {
    width: 2,
    color: '#FFFFFF'      // Border color
  },
  opacity: 1.0            // 0-1 transparency
}
```

### Conditional Marker Styling

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer :shapeData="world_map">
        <e-markers
          :dataSource="storeData"
          :settings="markerSettings"
          @markerRendering="onMarkerRendering"
        >
        </e-markers>
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
export default {
  methods: {
    onMarkerRendering(args) {
      // High revenue stores get larger markers
      if (args.data.revenue > 2000000) {
        args.width = 25;
        args.height = 25;
        args.fill = '#FF0000';  // Red for high revenue
      } else {
        args.width = 15;
        args.height = 15;
        args.fill = '#0066CC';  // Blue for normal
      }
    }
  }
};
</script>
```

## Custom Marker Templates

Use templates for rich, customized marker content beyond simple shapes.

### Template Marker Example

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :shapeData='shapeData' >
                        <e-markerSettings>
                            <e-markerSetting visible= true :template='contentTemplate' :dataSource ="dataSource" animationDuration = 0 ></e-markerSetting>
                            <e-markerSetting visible= true :template='contentTemplate1' :dataSource ="dataSource1" animationDuration = 0 ></e-markerSetting>
                            <e-markerSetting visible= true :template='contentTemplate2' :dataSource ="dataSource2" animationDuration = 0 ></e-markerSetting>
                        </e-markerSettings>
                    </e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Marker, LayerDirective, LayersDirective, MarkerSettingDirective, MarkerSettingsDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
import {createApp} from 'vue';

const app = createApp({});
 
const cTemplate = app.component('MapsComponent', {
    template: '<div id="marker4" style="color:red" class="markerTemplate">Europe</div>',
    data() { return {  }; }
});

const cTemplate1 = app.component('MapsComponent1', {
    template: '<div id="marker5" class="markerTemplate" style="width:50px;color:blue">NorthAmerica</div>',
    data() { return {  }; }
});

const cTemplate2 = app.component('MapsComponent2', {
    template: '<div id="marker6" class="markerTemplate" style="width:50px;color:green">South America </div>',
    data() { return {  }; }
});

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective,
"e-markerSettings":MarkerSettingsDirective,
"e-markerSetting":MarkerSettingDirective
},
data () {
    return{
        shapeData: world_map,
        dataSource: [
          { latitude: 49.95121990866204, longitude: 18.468749999999998 }
       ],
      dataSource1: [
          { latitude: 59.88893689676585, longitude: -109.3359375 }
      ],
       dataSource2: [
         { latitude: -6.64607562172573, longitude: -55.54687499999999 }
       ],
       contentTemplate: function () {
          return {
          template: cTemplate
        }
      },
      contentTemplate1: function () {
          return {
          template: cTemplate1
        }
      },
      contentTemplate2: function () {
          return {
          template: cTemplate2
        }
      },
    }
},
provide: {
    maps: [ Marker]
}
}
</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

## Marker Clustering

When you have many markers close together, clustering groups them for better readability.

### Enable Clustering

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps  :titleSettings='titleSettings' :zoomSettings='zoomSettings'  :useGroupingSeparator='useGroupingSeparator' format='n'>
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapeSettings='shapeSettings' :markerClusterSettings='markerClusterSettings' :markerSettings='markerSettings'></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Marker, Zoom, MapsTooltip, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
import { cluster } from './marker-cluster.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
data () {
    return{
        useGroupingSeparator: true,
        zoomSettings: {
            enable: true,
        },
        shapeData: world_map,
        shapeSettings: {
            fill: '#C1DFF5'
        },
        titleSettings: {
            text: 'Top 13 largest cities in the World',
            textStyle: {
                size: '16px'
            }
        },
        markerClusterSettings: {
             allowClustering: true,
             shape: 'Circle',
             height: 40,
             width: 40,
             labelStyle : { color: 'white'},
        },
        markerSettings: [
            {
                dataSource: cluster,
                visible: true,
                shape: 'Balloon',
                height:20,
                width:20,
                animationDuration:0,
                tooltipSettings: {
                    visible: true,
                    valuePath: 'area',
                }
            },
        ]
    }
},
provide: {
    maps: [Marker, Zoom, MapsTooltip]
}
}
</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

**Clustering options:**
- `enable: true` - Turn on clustering
- `distance: 40` - Pixels distance before grouping
- `allowClusterSelection: true` - Click cluster to expand

## Interactive Markers

Make markers respond to user interactions like clicks and hovers.

### Click Event Handling

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer :shapeData="world_map">
        <e-markers
          :dataSource="markerData"
          @markerClick="onMarkerClick"
        >
        </e-markers>
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, Marker, Zoom, MapsTooltip, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
  data() {
    return {
      markerData: [
        { latitude: 40.7128, longitude: -74.0060, name: 'New York' }
      ]
    };
  },
  methods: {
    onMarkerClick(args) {
      console.log('Clicked marker:', args.data.name);
      // Handle marker click - open popup, navigate, etc.
    }
  }
};
</script>
```

### Hover Effects

```vue
<script>
export default {
  methods: {
    onMarkerRendering(args) {
      // Apply hover styling
      args.border = {
        width: 1,
        color: '#FFFFFF'
      };
    }
  }
};
</script>
```

## Marker Tooltips

Tooltips display information when hovering over markers.

### Simple Tooltip

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :shapeData='shapeData' :markerSettings='markerSettings'></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Marker, MapsTooltip, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { usMap } from './usa.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective,
},
data () {
    return {
        shapeData: usMap,
        markerSettings: [{
            dataSource: [
                { latitude: 40.7424509, longitude: -74.0081468, city: 'New York' }
            ],
        visible:true,
        shape:'Circle',
        fill:'white',
        width:3,
        animationDuration:0,
        border: { width:2, color:'green'},
        tooltipSettings: {
            visible: true,
            valuePath:'city'
        }
        }]
    }
},
provide: {
    maps: [Marker, MapsTooltip]
}
}
</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

### Custom Tooltip Template

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps>
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapePropertyPath='shapePropertyPath' :shapeDataPath='shapeDataPath' :dataSource='dataSource' :tooltipSettings='tooltipSettings' ></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, MapsTooltip, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
import { default_data } from './default-data.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
data () {
    return{
        shapeData: world_map,
        shapePropertyPath: 'continent',
        shapeDataPath: 'continent',
        dataSource: default_data,
        tooltipSettings: {
            visible: true,
            valuePath: 'continent',
            template: '<div style="width:60px; text-align:center; background-color: white; border: 2px solid black; padding-bottom: 10px;padding-top: 10px;padding-left: 10px;padding-right: 10px;"><span>${continent}</span></div>',
            textStyle: {
                color: 'black'
            }
        }
    }
},
provide: {
    maps: [MapsTooltip]
}
}
</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

## Dynamic Marker Updates

Update markers in real-time based on user interactions or data changes.

### Adding Markers Dynamically

```vue
<template>
  <div>
    <button @click="addMarker">Add Marker</button>
    <ejs-maps ref="mapsRef">
      <e-layers>
        <e-layer :shapeData="world_map">
          <e-markers :dataSource="markerData"></e-markers>
        </e-layer>
      </e-layers>
    </ejs-maps>
  </div>
</template>

<script>
import { MapsComponent, Marker, Zoom, MapsTooltip, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
  data() {
    return {
      markerData: [
        { latitude: 40.7128, longitude: -74.0060, name: 'New York' }
      ]
    };
  },
  methods: {
    addMarker() {
      this.markerData.push({
        latitude: 34.0522,
        longitude: -118.2437,
        name: 'Los Angeles'
      });
    }
  }
  provide: {
    maps: [Marker, MapsTooltip]
}
};
</script>
```

## Common Marker Use Cases

### Use Case 1: Store Locator

```javascript
data() {
  return {
    storeData: [
      {
        latitude: 40.7128,
        longitude: -74.0060,
        storeName: 'Fifth Avenue',
        address: '1000 Fifth Ave',
        hours: '9AM - 9PM'
      }
    ]
  };
}
```

### Use Case 2: Travel Route (Markers for Start/End)

```javascript
routeMarkers: [
  { latitude: 40.7128, longitude: -74.0060, type: 'Start' },
  { latitude: 34.0522, longitude: -118.2437, type: 'End' }
]
```

### Use Case 3: Event Locations

```javascript
eventMarkers: [
  {
    latitude: 40.7128,
    longitude: -74.0060,
    eventName: 'Tech Conference 2026',
    date: '2026-06-15'
  }
]
```

### Use Case 4: Density Map (Size-based on Value)

```vue
<e-markers
  :dataSource="densityData"
  @markerRendering="scaleMarkerByValue"
>
</e-markers>

<script>
methods: {
  scaleMarkerByValue(args) {
    // Scale marker size based on data value
    const maxValue = Math.max(...this.densityData.map(d => d.value));
    const scale = (args.data.value / maxValue) * 30;
    args.width = scale;
    args.height = scale;
  }
}
</script>
```
