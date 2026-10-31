# Legend in Vue Maps

## Table of Contents
- [What is a Legend](#what-is-a-legend)
- [Enabling Legends](#enabling-legends)
  - [Basic Legend Setup](#basic-legend-setup)
- [Positioning Strategies](#positioning-strategies)
  - [Legend Position Properties](#legend-position-properties)
  - [Position Examples](#position-examples)
  - [All Position Combinations](#all-position-combinations)
- [Legend Modes](#legend-modes)
  - [Default Mode](#default-mode)
  - [Interactive Mode](#interactive-mode)
- [Customizing Appearance](#customizing-appearance)
  - [Text Styling](#text-styling)
  - [Size and Spacing](#size-and-spacing)
  - [Title](#title)
- [Interactive Legends](#interactive-legends)
  - [Click to Highlight](#click-to-highlight)
- [Legend with Color Mapping](#legend-with-color-mapping)
  - [Automatic Legend from Color Mapping](#automatic-legend-from-color-mapping)
  - [Equal Mapping Legend](#equal-mapping-legend)
- [Complete Legend Example](#complete-legend-example)
- [Legend Best Practices](#legend-best-practices)
- [Accessibility Considerations](#accessibility-considerations)

## What is a Legend

A legend is a visual guide that explains what the colors or symbols on your map mean. It helps users interpret the data visualization.

**Why use legends?**
- Users understand what colors represent
- Provides context for numerical or categorical data
- Improves accessibility
- Professional appearance for dashboards

## Enabling Legends

### Basic Legend Setup

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps :legendSettings='legendSettings' >
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapePropertyPath='shapePropertyPath' :shapeDataPath='shapeDataPath' :dataSource='dataSource' :shapeSettings='shapeSettings' ></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Legend, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
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
        legendSettings: {
            visible: true,
            position: 'Top',
            alignment: 'Near'
        },
        shapeData: world_map,
        dataSource: [
            { "Country": "China", "Membership": "Permanent" },
            { "Country": "France", "Membership": "Permanent" },
            { "Country": "Russia", "Membership": "Permanent" },
            { "Country": "Kazakhstan", "Membership": "Non-Permanent" },
            { "Country": "Poland", "Membership": "Non-Permanent" },
            { "Country": "Sweden", "Membership": "Non-Permanent" }
        ],
        shapePropertyPath: 'name',
        shapeDataPath: 'Country',
        shapeSettings: {
            colorValuePath: 'Membership',
            colorMapping: [
                {
                    value: 'Permanent', color: '#D84444'
                },
                {
                    value: 'Non-Permanent', color: '#316DB5'
                }
            ]
        }
    }
},
provide: {
    maps: [Legend]
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

## Positioning Strategies

### Legend Position Properties

```javascript
legendSettings: {
  visible: true,
  
  // Position types
  position: 'Top',              // 'Top', 'Bottom', 'Left', 'Right'
  alignment: 'Near',            // 'Near', 'Center', 'Far'
  
  // For floating position
  location: {
    x: 100,                      // Pixel offset from edge
    y: 100
  }
}
```

### Position Examples

**Top with Center Alignment**
```javascript
legendSettings: {
  visible: true,
  position: 'Top',
  alignment: 'Center'
}
```

**Left Side Legend**
```javascript
legendSettings: {
  visible: true,
  position: 'Left',
  alignment: 'Far'
}
```

**Fixed Position (Floating)**
```javascript
legendSettings: {
  visible: true,
  mode: 'Default',
  location: {
    x: 150,
    y: 50
  }
}
```

### All Position Combinations

| Position | Alignment | Description |
|----------|-----------|-------------|
| Top | Near | Upper left |
| Top | Center | Top center |
| Top | Far | Upper right |
| Bottom | Near | Lower left |
| Bottom | Center | Bottom center |
| Bottom | Far | Lower right |
| Left | Near | Left top |
| Left | Center | Left middle |
| Left | Far | Left bottom |
| Right | Near | Right top |
| Right | Center | Right middle |
| Right | Far | Right bottom |

## Legend Modes

### Default Mode

Standard legend that lists all mapped values:

```javascript
legendSettings: {
  visible: true,
  mode: 'Default',              // Shows all items
  position: 'Bottom',
  alignment: 'Center'
}
```

### Interactive Mode

Users can click legend items to highlight/filter shapes:

```javascript
legendSettings: {
  visible: true,
  mode: 'Interactive',          // Click to highlight
  position: 'Bottom',
  alignment: 'Center'
}
```

**How interactive mode works:**
- Click a legend item → highlights that value on map
- Click again → removes highlight
- Useful for exploratory data analysis

## Customizing Appearance

### Text Styling

```javascript
legendSettings: {
  visible: true,
  
  // Font styling
  textStyle: {
    fontFamily: 'Arial',
    size: '14px',
    color: '#000',
    fontWeight: 'bold'
  },
  
  // Title styling
  titleStyle: {
    fontFamily: 'Arial',
    size: '16px',
    color: '#333',
    fontWeight: 'bold'
  }
}
```

### Size and Spacing

```javascript
legendSettings: {
  visible: true,
  
  // Legend item appearance
  width: '200px',               // Width of legend container
  height: 'auto',               // Height (auto or fixed)
  
  // Internal spacing
  shapeWidth: 15,              // Color box size
  shapeHeight: 15,
  
  // Background styling
  background: {
    color: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderWidth: 1
  }
}
```

### Title

```javascript
legendSettings: {
  visible: true,
  title: 'Population Categories',
  
  titleStyle: {
    size: '16px',
    fontWeight: 'bold'
  }
}
```

## Interactive Legends

### Click to Highlight

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer
        :shapeData="world_map"
        :dataSource="countryData"
        :shapeSettings="shapeSettings"
      >
      </e-layer>
    </e-layers>
    
    <e-legend-settings
      :visible="true"
      mode="Interactive"
      @legendItemRendering="onLegendItemRender"
    >
    </e-legend-settings>
  </ejs-maps>
</template>

<script>
export default {
  methods: {
    onLegendItemRender(args) {
      // Customize legend item appearance
      console.log('Legend item:', args.shapeName);
    }
  }
};
</script>
```

## Legend with Color Mapping

Legends automatically display items from your color mappings.

### Automatic Legend from Color Mapping

```vue
<template>
    <div id="app">
        <div class='wrapper'>
            <ejs-maps :legendSettings='legendSettings'>
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapePropertyPath='shapePropertyPath' :shapeDataPath='shapeDataPath' :dataSource='dataSource' :shapeSettings='shapeSettings' ></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Legend, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
import { population_density } from './population-density.js';

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
        legendSettings: {
            visible: true
        },
        shapeDataPath: 'name',
        shapePropertyPath: 'name',
        dataSource: population_density,
        shapeSettings: {
            colorValuePath: 'density',
            colorMapping: [
                {
                    from: 0, to: 100, color: ['red','blue']
                },
                {
                    from: 101, to: 200, color: ['green','yellow']
                },
                {
                    color: 'green'
                }
            ]
        }
    }
},
provide: {
    maps: [Legend]
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

**Key:** Add `label` property to each color mapping entry. This text appears in the legend.

### Equal Mapping Legend

```javascript
colorMapping: [
  { value: 'Developed', color: '#00FF00', label: 'Developed' },
  { value: 'Developing', color: '#FFFF00', label: 'Developing' },
  { value: 'Underdeveloped', color: '#FF0000', label: 'Underdeveloped' }
]
```

## Complete Legend Example

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer
        :shapeData="world_map"
        :dataSource="hdiByCoutry"
        :shapeDataPath="'Country'"
        :shapePropertyPath="'name'"
        :shapeSettings="shapeSettings"
      >
      </e-layer>
    </e-layers>
    
    <e-legend-settings
      :visible="true"
      title="Human Development Index"
      mode="Interactive"
      position="Bottom"
      alignment="Center"
      :textStyle="textStyle"
      :titleStyle="titleStyle"
    >
    </e-legend-settings>
  </ejs-maps>
</template>

<script>
export default {
  data() {
    return {
      world_map: world_map,
      
      hdiByCoutry: [
        { Country: 'Norway', HDI: 'Very High' },
        { Country: 'Bangladesh', HDI: 'Low' },
        { Country: 'Brazil', HDI: 'High' }
      ],
      
      shapeSettings: {
        colorValuePath: 'HDI',
        colorMapping: [
          { 
            value: 'Very High', 
            color: '#00AA00', 
            label: 'Very High'
          },
          { 
            value: 'High', 
            color: '#88DD00', 
            label: 'High'
          },
          { 
            value: 'Medium', 
            color: '#FFFF00', 
            label: 'Medium'
          },
          { 
            value: 'Low', 
            color: '#FF6600', 
            label: 'Low'
          }
        ]
      },
      
      textStyle: {
        fontFamily: 'Arial',
        size: '14px',
        color: '#333'
      },
      
      titleStyle: {
        fontFamily: 'Arial',
        size: '16px',
        fontWeight: 'bold',
        color: '#000'
      }
    };
  }
};
</script>
```

## Legend Best Practices

1. **Always add labels** to color mappings
2. **Use interactive mode** when exploring data
3. **Position appropriately** - don't cover important map areas
4. **Keep titles concise** - 2-4 words usually best
5. **Test on mobile** - legend on left/right responsive to screen size
6. **Match colors precisely** - colors in legend must match map
7. **Use accessible colors** - avoid red-green only combinations
8. **Sort meaningfully** - arrange items in logical order (low to high, alphabetical, etc.)

## Accessibility Considerations

Make your legend accessible:

```javascript
legendSettings: {
  visible: true,
  title: 'Population Ranges',  // Screen readers read this
  
  textStyle: {
    color: '#000',              // High contrast
    size: '14px'                // Readable size
  }
}
```

- Title is read by screen readers
- Sufficient color contrast
- Font size ≥12px for readability
- Interactive mode allows keyboard navigation
