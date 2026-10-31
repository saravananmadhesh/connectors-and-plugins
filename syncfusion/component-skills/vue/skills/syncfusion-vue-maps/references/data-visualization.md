# Data Visualization Elements in Vue Maps

## Table of Contents
- [Bubbles](#bubbles)  
  - [Basic Bubble Setup](#basic-bubble-setup)
  - [Bubble Size Configuration](#bubble-size-configuration)
  - [Bubble Colors](#bubble-colors)
  - [Multiple Bubble Groups](#multiple-bubble-groups)
- [Data Labels](#data-labels)
  - [Basic Data Labels](#basic-data-labels)
  - [Label Positioning](#label-positioning)
  - [Custom Label Templates](#custom-label-templates)
- [Navigation Lines](#navigation-lines)
  -[Basic Navigation Lines](#basic-navigation-lines)
  - [Curved vs Straight Lines](#curved-vs-straight-lines)
- [Combining Multiple Elements](#combining-multiple-elements)
  - [Complete Data Visualization Example](#complete-data-visualization-example)
- [Smart Label Modes](#smart-label-modes)
  - [Label Modes](#label-modes)
  - [Intersection Action](#intersection-action)
- [Customizing Appearance](#customizing-appearance)
  - [Bubble Styling](#bubble-styling)
  - [Label Styling](#label-styling)
  - [Navigation Line Styling](#navigation-line-styling)
- [Performance Tips](#performance-tips)
- [Common Patterns](#common-patterns)
  - [Pattern 1: GDP Distribution (Bubble + Color)](#pattern-1-gdp-distribution-bubble--color)
  - [Pattern 2: Trade Routes (Lines + Markers)](#pattern-2-trade-routes-lines--markers)
  - [Pattern 3: Regional Analysis (Labels + Styling)](#pattern-3-regional-analysis-labels--styling)

## Bubbles

Bubbles are circles whose size represents data magnitude. Use them to visualize numerical data on a map.

### Basic Bubble Setup

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer :shapeData='shapeData' :shapePropertyPath='shapePropertyPath' :shapeDataPath='shapeDataPath' :bubbleSettings='bubbleSettings' ></e-layer>
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayersDirective, LayerDirective, Inject, Bubble } from '@syncfusion/ej2-vue-maps';
import { world_map } from '@syncfusion/ej2-map-data';

export default {
  components: {
    'ejs-maps': MapsComponent,
    'e-layers': LayersDirective,
    'e-layer': LayerDirective
  },
  provide: {
    maps: [Bubble]
  },
  data() {
    return {
      shapeData: world_map,
        shapeDataPath: 'name',
        shapePropertyPath: 'name',
        bubbleSettings: [{
            visible: true,
            bubbleType: 'Square',
            dataSource: [
                { name: 'India', population: '38332521' },
                { name: 'Pakistan', population: '3090416' }
            ],
            valuePath: 'population'
        }] 
    }
  }
};
</script>
```

### Bubble Size Configuration

```javascript
bubbleSettings: [
  {
    visible: true,
    dataSource: populationData,
    valuePath: 'Population',    // Numeric field for sizing
    minRadius: 5,               // Smallest bubble size
    maxRadius: 50,              // Largest bubble size
    
    // The component automatically scales values between min/max radius
    // Smallest value in data → minRadius
    // Largest value in data → maxRadius
    // Middle values → proportionally scaled
  }
]
```

**How sizing works:**
- Maps finds min and max values in your data
- Scales each value proportionally between minRadius and maxRadius
- Larger numbers = larger bubbles

### Bubble Colors

```javascript
bubbleSettings: [
  {
    visible: true,
    dataSource: data,
    valuePath: 'value',
    colorValuePath: 'category',  // Use different field for color
    fill: '#0066CC',             // Default fill
    
    // Or use color mapping
    colorMapping: [
      { value: 'High', color: '#FF0000' },
      { value: 'Medium', color: '#FFFF00' },
      { value: 'Low', color: '#00FF00' }
    ]
  }
]
```

### Multiple Bubble Groups

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapePropertyPath='shapePropertyPath' :shapeDataPath='shapeDataPath' :bubbleSettings='bubbleSettings' ></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script setup>
import { provide } from "vue";

import { MapsComponent as EjsMaps, Bubble, LayerDirective as ELayer, LayersDirective as ELayers } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

const shapeData = world_map;
const shapeDataPath = 'name';
const shapePropertyPath = 'name';

const bubbleSettings = [{
    visible: true,
    minRadius: 5,
    valuePath: "femaleRatio",
    colorValuePath: "femaleRatioColor",
    dataSource: [
        {
            country: "United States", femaleRatio: 50.50442726, maleRatio: 49.49557274, femaleRatioColor: "green", maleRatioColor: "blue"
        },
        {
            country: "India", femaleRatio: 48.18032713, maleRatio: 51.81967287, femaleRatioColor: "blue", maleRatioColor: "#c2d2d6"
        },
        {
            country: "Oman", femaleRatio: 34.15597234, maleRatio: 65.84402766, femaleRatioColor: "#09156d", maleRatioColor: "orange"
        },
        {
            country: "United Arab Emirates", femaleRatio: 27.59638942, maleRatio: 72.40361058, femaleRatioColor: "#09156d", maleRatioColor: "orange"
        }
    ],
    maxRadius: 20,
},
{
    visible: true,
    bubbleType: 'Circle',
    opacity: 0.4,
    minRadius: 15,
    valuePath: "maleRatio",
    colorValuePath: "maleRatioColor",
    dataSource: [
                {
                    country: "United States", femaleRatio: 50.50442726, maleRatio: 49.49557274, femaleRatioColor: "green", maleRatioColor: "blue"
                },
                {
                    country: "India", femaleRatio: 48.18032713, maleRatio: 51.81967287, femaleRatioColor: "blue", maleRatioColor: "#c2d2d6"
                },
                {
                    country: "Oman", femaleRatio: 34.15597234, maleRatio: 65.84402766, femaleRatioColor: "#09156d", maleRatioColor: "orange"
                },
                {
                    country: "United Arab Emirates", femaleRatio: 27.59638942, maleRatio: 72.40361058, femaleRatioColor: "#09156d", maleRatioColor: "orange"
                }
            ],
    maxRadius: 25,
}];

provide('maps',  [Bubble]);

</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

## Data Labels

Data labels display text information directly on map shapes. Use them to show country names, values, or statistics.

### Basic Data Labels

```vue
<template>
    <div id="app">
        <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapeSettings='shapeSettings'
                    :dataLabelSettings='dataLabelSettings'></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script setup>
import { provide } from "vue";

import { MapsComponent as EjsMaps, DataLabel, LayerDirective as ELayer, LayersDirective as ELayers } from '@syncfusion/ej2-vue-maps';
import { usMap } from './usa.js';

const shapeData = usMap;
const shapeSettings = {
    autofill: true
};

const dataLabelSettings = {
    visible: true,
    labelPath: 'name'
};

provide('maps',  [DataLabel]);

</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

### Label Positioning

```javascript
dataLabelSettings: {
  visible: true,
  labelPath: 'Country',
  
  // How to show labels
  smartLabelMode: 'Trim',        // 'Trim', 'Hide', 'None'
  
  // Position relative to shape
  intersectionAction: 'Trim',    // 'Trim', 'Hide', 'None', 'Trim'
  
  // Animation
  animationDuration: 500,
  animationDelay: 0
}
```

### Custom Label Templates

```vue
<template>
    <div id="template">
        <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapeSettings='shapeSettings' :shapePropertyPath='shapePropertyPath' :shapeDataPath='shapeDataPath' :dataSource='dataSource'
                    :dataLabelSettings='dataLabelSettings'></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script setup>
import { provide } from "vue";

import { MapsComponent as EjsMaps, DataLabel, LayersDirective as ELayer, LayersDirective as ELayers } from '@syncfusion/ej2-vue-maps';
import { usMap } from './usa.js';
import { createApp } from 'vue';

const app = createApp({});


let contentVue = app.component("contentTemplate", {
    template: '<div><div><img src="https://ej2.syncfusion.com/demos/src/maps/images/weather-clear.png" style="width:22px;height:22px"> </div>  </img></div>',
        data() {
            return {
                data: {}
            };
        }
});
let contentTemplate = function() {
    return { template: contentVue };
};

const shapeData = usMap;
const shapeSettings = {
    autofill:true
};
const shapePropertyPath = 'name';
const shapeDataPath = 'Name';
const dataSource = [
    { "Name": "Iowa", "Population": "29863010" },
    { "Name": "Utah", "Population": "1263010" },
    { "Name": "Texas"," Population": "963010" }
];
const dataLabelSettings = {
    visible: true,
    labelPath: 'Name',
    template: contentTemplate
};

provide('maps',  [DataLabel]);

</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

## Navigation Lines

Navigation lines draw connections between locations, useful for showing routes, flows, or relationships.

### Basic Navigation Lines

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :shapeData='shapeData' >
                    <e-navigationLineSettings>
                    <e-navigationLineSetting visible = true :latitude ='latitude' :longitude ='longitude' :color ='color' :angle ='angle' :width="width" :dashArray='dashArray' >
                    </e-navigationLineSetting>
                    </e-navigationLineSettings>
                    </e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, NavigationLine, LayerDirective, LayersDirective, NavigationLineSettingDirective, NavigationLineSettingsDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective,
"e-navigationLineSettings":NavigationLineSettingsDirective,
"e-navigationLineSetting":NavigationLineSettingDirective
},
data () {
    return {
        shapeData: world_map,
        latitude: [40.7128, 36.7783],
        longitude: [-74.0060, -119.4179],
        color: 'black',
        angle: 90,
        width: 2,
        dashArray: '4'
    }
},
provide: {
    maps: [NavigationLine]
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

### Curved vs Straight Lines

```javascript
navigationLineSettings: [
  {
    shapeData: world_map,
    latitude: [40.7128, 36.7783],
    longitude: [-74.0060, -119.4179],
    color: 'black',
    angle: 90,
    width: 2,
    dashArray: '4'
  }
]
```

## Combining Multiple Elements

Use bubbles, labels, and lines together for rich visualizations.

### Complete Data Visualization Example

```vue
<template>
<ejs-maps>
  <e-layers>
    <e-layer
      :shapeData="world_map"
      :dataSource="countryData"
      :shapeDataPath="'Country'"
      :shapePropertyPath="'name'"
      :shapeSettings="shapeSettings"
      :dataLabelSettings="dataLabelSettings"
      :bubbleSettings="bubbleSettings"
      :navigationLineSettings="navigationLineSettings"
    >
    </e-layer>
  </e-layers>
</ejs-maps>
</template>

<script>
import { MapsComponent, NavigationLine, LayerDirective, LayersDirective, NavigationLineSettingDirective, NavigationLineSettingsDirective, DataLabel, Bubble, Marker } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
provide: {
  maps: [DataLabel, Bubble, Marker, NavigationLine]
},
data() {
  return {
    world_map: world_map,
    navigationLineSettings : [
    {
        visible: true,
        latitude: [22.403410892712124, 29.756032197482973],
        longitude: [-97.8717041015625, -95.36270141601562],
        angle: 0,
        dashArray: 1,
        width: 5,
        color: 'white',
    },
    {
        visible: true,
        angle: 0,
        color: 'white',
        dashArray: 1,
        width: 5,
        latitude: [22.403410892712124, 30.180747605060766 ],
        longitude: [-97.8717041015625, -85.81283569335938]
    },
    ],
    
    
    // Base data for all elements
    countryData: [
      { Country: 'USA', GDP: 21060000, Population: 331000000 },
      { Country: 'China', GDP: 14723000, Population: 1439000000 }
    ],
    
    // Shape styling (background colors)
    shapeSettings: {
      fill: '#E5E5E5',
      colorValuePath: 'GDP',
      colorMapping: [
        { value: 21060000, color: '#FF0000' },
        { value: 14723000, color: '#FFFF00' }
      ]
    },
    
    // Country labels
    dataLabelSettings: {
      visible: true,
      labelPath: 'Country'
    },
    
    // Bubbles for population
    bubbleSettings: [
      {
        visible: true,
        dataSource: [
        { Country: 'USA', GDP: 21060000, Population: 331000000 },
        { Country: 'China', GDP: 14723000, Population: 1439000000 }
      ],
        valuePath: 'Population',
        minRadius: 10,
        maxRadius: 40,
        fill: '#0066CC'
      }
    ],
    
    // Capital city markers
    capitalMarkers: [
      { latitude: 38.9072, longitude: -77.0369, name: 'Washington DC' },
      { latitude: 39.9042, longitude: 116.4074, name: 'Beijing' }
    ],
    
    // Trade routes
    tradeRoutes: [
      {
        dataSource: [
          { 
            from: { latitude: 38.9072, longitude: -77.0369 },
            to: { latitude: 39.9042, longitude: 116.4074 }
          }
        ],
        line: { color: '#000', width: 2 }
      }
    ]
  };
}
};
</script>
```

## Smart Label Modes

Handle overlapping labels automatically.

### Label Modes

```javascript
dataLabelSettings: {
  visible: true,
  labelPath: 'Country',
  
  // smartLabelMode controls what happens with overlapping labels
  smartLabelMode: 'Trim',    // Options:
  // 'Trim' - Truncate text if overlapping
  // 'Hide' - Hide label if it overlaps
  // 'None' - Show all labels (may overlap)
}
```

### Intersection Action

```javascript
dataLabelSettings: {
  visible: true,
  labelPath: 'Country',
  
  // intersectionAction: how to handle shape/label conflicts
  intersectionAction: 'Trim',  // 'Trim' or 'Hide'
}
```

## Customizing Appearance

### Bubble Styling

```javascript
bubbleSettings: [
  {
    visible: true,
    dataSource: data,
    valuePath: 'value',
    
    // Visual properties
    fill: '#0066CC',
    opacity: 0.7,
    border: {
      width: 2,
      color: '#FFFFFF'
    },
    
    // Size
    minRadius: 5,
    maxRadius: 50
  }
]
```

### Label Styling

```javascript
dataLabelSettings: {
  visible: true,
  labelPath: 'field',
  
  textStyle: {
    fontFamily: 'Arial',
    size: '14px',
    color: '#000',
    fontWeight: 'bold',
    fontStyle: 'normal',
    opacity: 1.0
  }
}
```

### Navigation Line Styling

```javascript
navigationLineSettings: [
  {
    shapeData: world_map,
    latitude: [40.7128, 36.7783],
    longitude: [-74.0060, -119.4179],
    color: 'black',
    angle: 90,
    width: 2,
    dashArray: '4',
    arrowSettings: {
        showArrow: true,
        size: 10,
        position: 'Start'
    },
  }
]
```

## Performance Tips

When using multiple visualization elements:

1. **Start with one element** - Add bubbles first, then labels, then lines
2. **Test on large datasets** - Many elements + many shapes = performance impact
3. **Use appropriate smartLabelMode** - 'Hide' works better than 'Trim' for dense data
4. **Simplify line data** - Fewer routes = better performance
5. **Use opacity** - Can improve visual clarity without adding complexity

## Common Patterns

### Pattern 1: GDP Distribution (Bubble + Color)

```javascript
data() {
  return {
    shapeSettings: {
      colorValuePath: 'GDP',           // Color intensity
      colorMapping: [...]
    },
    bubbleSettings: [{
      valuePath: 'GDP',                // Bubble size
      minRadius: 10,
      maxRadius: 40
    }]
  }
}
```

### Pattern 2: Trade Routes (Lines + Markers)

```javascript
data() {
  return {
    navigationLineSettings: [...],
    markerData: [...]                  // Capital cities
  }
}
```

### Pattern 3: Regional Analysis (Labels + Styling)

```javascript
data() {
  return {
    dataLabelSettings: {
      visible: true,
      labelPath: 'Region'
    },
    shapeSettings: {
      colorValuePath: 'Status'
    }
  }
}
```
