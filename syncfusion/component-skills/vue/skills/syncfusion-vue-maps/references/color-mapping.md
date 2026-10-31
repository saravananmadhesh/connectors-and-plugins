# Color Mapping in Vue Maps

## Table of Contents
- [Understanding Color Mapping](#understanding-color-mapping)
- [Range Color Mapping](#range-color-mapping)
  - [Basic Range Setup](#basic-range-setup)
  - [Range Examples](#range-examples)
- [Equal Color Mapping](#equal-color-mapping)
  - [Basic Equal Setup](#basic-equal-setup)
  - [Equal Mapping Examples](#equal-mapping-examples)
- [Desaturation Color Mapping](#desaturation-color-mapping)
  - [Desaturation Setup](#desaturation-setup)
- [Setting Up colorValuePath](#setting-up-colorvaluepath)
  - [Finding the Right Field](#finding-the-right-field)
  - [Numeric vs Categorical](#numeric-vs-categorical)
- [Multiple Color Mappings](#multiple-color-mappings)
  - [Multiple Range Mappings](#multiple-range-mappings)
  - [Conditional Logic in Events](#conditional-logic-in-events)
- [Color Mapping Edge Cases](#color-mapping-edge-cases)
  - [Handling Missing Data](#handling-missing-data)
  - [Values Outside Range](#values-outside-range)
  - [Null or Undefined Values](#null-or-undefined-values)
- [Choropleth Map Examples](#choropleth-map-examples)
  - [Example 1: Population Density Map](#example-1-population-density-map)
  - [Example 2: Development Index Map](#example-2-development-index-map)
  - [Example 3: Election Results Map](#example-3-election-results-map)
  - [Example 4: COVID-19 Infection Rate](#example-4-covid-19-infection-rate)
- [Best Practices](#best-practices)
- [Performance Tips](#performance-tips)

## Understanding Color Mapping

Color mapping applies colors to map shapes based on data values. This is how you create choropleth maps (color-coded regions).

**Three types of color mapping:**
1. **Range** - Numeric ranges get color bands
2. **Equal** - Discrete categories get specific colors
3. **Desaturation** - Single color with varying opacity

## Range Color Mapping

Use range mapping for **continuous numerical data** (population, GDP, temperature).

### Basic Range Setup

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer
        :shapeData="world_map"
        :dataSource="populationData"
        :shapeDataPath="'Country'"
        :shapePropertyPath="'name'"
        :shapeSettings="shapeSettings"
      >
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  data() {
    return {
      world_map: world_map,
      populationData: [
        { Country: 'United States', Population: 331000000 },
        { Country: 'Russia', Population: 145900000 },
        { Country: 'China', Population: 1439000000 },
        { Country: 'India', Population: 1380000000 },
        { Country: 'Brazil', Population: 212500000 }
      ],
      shapeSettings: {
        colorValuePath: 'Population',  // Numeric field for colors
        colorMapping: [
          // Low population
          { from: 0, to: 100000000, color: '#FFE5E5', label: '0-100M' },
          // Medium population
          { from: 100000000, to: 500000000, color: '#FF6B6B', label: '100M-500M' },
          // High population
          { from: 500000000, to: 1439000000, color: '#CC0000', label: '500M+' }
        ]
      }
    };
  }
};
</script>
```

**Key points:**
- `from` and `to` define the range (inclusive)
- Values outside all ranges use default fill color
- `label` is optional (good for legends)

### Range Examples

```javascript
// Population ranges
colorMapping: [
  { from: 0, to: 10000000, color: '#90EE90' },      // Light green
  { from: 10000000, to: 100000000, color: '#32CD32' }, // Medium green
  { from: 100000000, to: 1000000000, color: '#008000' } // Dark green
]

// Temperature ranges (weather map)
colorMapping: [
  { from: -50, to: 0, color: '#0000FF' },    // Blue (cold)
  { from: 0, to: 15, color: '#00FFFF' },     // Cyan (cool)
  { from: 15, to: 25, color: '#00FF00' },    // Green (mild)
  { from: 25, to: 35, color: '#FFFF00' },    // Yellow (warm)
  { from: 35, to: 50, color: '#FF0000' }     // Red (hot)
]

// GDP ranges
colorMapping: [
  { from: 0, to: 100000, color: '#F0F0F0' },      // Light gray
  { from: 100000, to: 500000, color: '#B0B0B0' }, // Medium gray
  { from: 500000, to: 1000000, color: '#606060' } // Dark gray
]
```

## Equal Color Mapping

Use equal mapping for **discrete categories** (membership status, regions, classifications).

### Basic Equal Setup

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer
        :shapeData="world_map"
        :dataSource="membershipData"
        :shapeDataPath="'Country'"
        :shapePropertyPath="'name'"
        :shapeSettings="shapeSettings"
      >
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  data() {
    return {
      world_map: world_map,
      membershipData: [
        { Country: 'United States', Membership: 'Permanent' },
        { Country: 'Russia', Membership: 'Permanent' },
        { Country: 'China', Membership: 'Permanent' },
        { Country: 'India', Membership: 'Non-Permanent' },
        { Country: 'Brazil', Membership: 'Non-Permanent' }
      ],
      shapeSettings: {
        colorValuePath: 'Membership',  // Categorical field
        colorMapping: [
          // Each value gets a specific color
          { value: 'Permanent', color: '#D84444' },
          { value: 'Non-Permanent', color: '#316DB5' }
        ]
      }
    };
  }
};
</script>
```

### Equal Mapping Examples

```javascript
// Classification system
colorMapping: [
  { value: 'Developed', color: '#00FF00' },
  { value: 'Developing', color: '#FFFF00' },
  { value: 'Underdeveloped', color: '#FF0000' }
]

// Status
colorMapping: [
  { value: 'Active', color: '#00AA00' },
  { value: 'Inactive', color: '#CCCCCC' },
  { value: 'Pending', color: '#FFAA00' }
]

// Regions
colorMapping: [
  { value: 'North America', color: '#FF6B6B' },
  { value: 'South America', color: '#4ECDC4' },
  { value: 'Europe', color: '#45B7D1' },
  { value: 'Africa', color: '#F7DC6F' },
  { value: 'Asia', color: '#BB8FCE' }
]
```

## Desaturation Color Mapping

Use desaturation for **gradient effects** - one color fading from light to dark.

### Desaturation Setup

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer
        :shapeData="world_map"
        :dataSource="populationData"
        :shapeDataPath="'Country'"
        :shapePropertyPath="'name'"
        :shapeSettings="shapeSettings"
      >
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  data() {
    return {
      world_map: world_map,
      populationData: [
        { Country: 'China', Population: 1439000000 },
        { Country: 'India', Population: 1380000000 },
        { Country: 'USA', Population: 331000000 }
      ],
      shapeSettings: {
         colorValuePath: 'Population',
          colorMapping: [
            {
            from: 0, to: 1500000000,
              color: '#0066CC',           // Base color (blue)
              minOpacity: 0.1,            // Lightest (for min value)
              maxOpacity: 1.0             // Darkest (for max value)
            },
            {
                from: 1500000000, to: 4500000000,
                  color: '#3def15',           // Base color (blue)
                  minOpacity: 0.1,            // Lightest (for min value)
                  maxOpacity: 1.0             // Darkest (for max value)
                }
          ]
      }
    };
  }
};
</script>
```

**How it works:**
- Minimum value in data → lightest (minOpacity)
- Maximum value in data → darkest (maxOpacity)
- Values in between scale proportionally

## Setting Up colorValuePath

The `colorValuePath` property tells Maps which data field to use for coloring.

### Finding the Right Field

```javascript
// Your data
countryData: [
  { 
    Country: 'USA',           // Good for shapeDataPath
    Population: 331000000,    // Good for colorValuePath
    GDP: 21060000,            // Also good for colorValuePath
    Region: 'North America'   // Good for equal colorMapping
  }
]

// Configuration
shapeSettings: {
  colorValuePath: 'Population'  // Must match a field in countryData
}
```

### Numeric vs Categorical

```javascript
// For numeric data (use range mapping)
shapeSettings: {
  colorValuePath: 'Population',
  colorMapping: [
    { from: 0, to: 100000000, color: '#FFE5E5' }
  ]
}

// For categorical data (use equal mapping)
shapeSettings: {
  colorValuePath: 'Status',
  colorMapping: [
    { value: 'Active', color: '#00FF00' }
  ]
}
```

## Multiple Color Mappings

Apply multiple color rules to the same layer.

### Multiple Range Mappings

```javascript
shapeSettings: {
  colorValuePath: 'Population',
  colorMapping: [
    // Population ranges
    { from: 0, to: 100000000, color: '#FFE5E5' },
    { from: 100000000, to: 500000000, color: '#FF6B6B' },
    { from: 500000000, to: 1500000000, color: '#CC0000' },
    
    // Ensure coverage - larger than max expected value
    { from: 1500000000, to: 2000000000, color: '#990000' }
  ]
}
```

### Conditional Logic in Events

For complex color rules, use events:

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer
        :shapeData="world_map"
        :dataSource="complexData"
        @shapeRendering="applyComplexColoring"
      >
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  methods: {
    applyComplexColoring(args) {
      // Custom logic for coloring
      if (args.data.Population > 1000000000) {
        args.shapeSettings.fill = '#CC0000';  // Dark red
      } else if (args.data.Population > 100000000) {
        args.shapeSettings.fill = '#FF6B6B';  // Light red
      } else {
        args.shapeSettings.fill = '#FFE5E5';  // Very light red
      }
    }
  }
};
</script>
```

## Color Mapping Edge Cases

### Handling Missing Data

Shapes without matching data use the default fill:

```javascript
shapeSettings: {
  fill: '#CCCCCC',              // Default for unmatched shapes
  colorValuePath: 'Population',
  colorMapping: [...]
}
```

### Values Outside Range

If a value falls outside all specified ranges, it uses the default fill.

```javascript
colorMapping: [
  { from: 0, to: 100000000, color: '#FFE5E5' }
  // Countries with population > 100M are not in this range
  // They get the default fill color
]
```

**Solution: Use a catch-all range or event handler:**

```javascript
// Option 1: Add catch-all range
colorMapping: [
  { from: 0, to: 100000000, color: '#FFE5E5' },
  { from: 100000000, to: 2000000000, color: '#CC0000' }  // Catch-all
]

// Option 2: Use shapeRendering event for fallback
@shapeRendering="handleOutOfRangeValues"
```

### Null or Undefined Values

Handles missing data gracefully:

```javascript
data() {
  return {
    countryData: [
      { Country: 'USA', Population: 331000000 },
      { Country: 'Unknown', Population: null },  // Missing data
      { Country: 'NoData', Population: undefined }  // Missing data
    ]
  }
}
// Shapes with null/undefined get default fill
```

## Choropleth Map Examples

### Example 1: Population Density Map

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer
        :shapeData="world_map"
        :dataSource="populationDensity"
        :shapeDataPath="'Country'"
        :shapePropertyPath="'name'"
        :shapeSettings="populationSettings"
      >
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  data() {
    return {
      world_map: world_map,
      populationDensity: [
        { Country: 'Netherlands', Density: 508 },
        { Country: 'Belgium', Density: 375 },
        { Country: 'USA', Density: 36 }
      ],
      populationSettings: {
        colorValuePath: 'Density',
        colorMapping: [
          { from: 0, to: 50, color: '#FFFFCC', label: 'Sparse' },
          { from: 50, to: 100, color: '#FFEDA0', label: 'Low' },
          { from: 100, to: 200, color: '#FEB24C', label: 'Medium' },
          { from: 200, to: 400, color: '#FD8D3C', label: 'High' },
          { from: 400, to: 1000, color: '#E31A1C', label: 'Very High' }
        ]
      }
    };
  }
};
</script>
```

### Example 2: Development Index Map

```javascript
data() {
  return {
    developmentData: [
      { Country: 'Norway', HDI: 'Very High' },
      { Country: 'Ethiopia', HDI: 'Low' },
      { Country: 'Brazil', HDI: 'High' }
    ],
    shapeSettings: {
      colorValuePath: 'HDI',
      colorMapping: [
        { value: 'Very High', color: '#00AA00' },
        { value: 'High', color: '#88DD00' },
        { value: 'Medium', color: '#FFFF00' },
        { value: 'Low', color: '#FF6600' },
        { value: 'Very Low', color: '#CC0000' }
      ]
    }
  }
}
```

### Example 3: Election Results Map

```javascript
data() {
  return {
    electionData: [
      { State: 'California', Winner: 'Party A' },
      { State: 'Texas', Winner: 'Party B' },
      { State: 'Florida', Winner: 'Party A' }
    ],
    shapeSettings: {
      colorValuePath: 'Winner',
      colorMapping: [
        { value: 'Party A', color: '#0000FF' },  // Blue
        { value: 'Party B', color: '#FF0000' }   // Red
      ]
    }
  }
}
```

### Example 4: COVID-19 Infection Rate

```javascript
data() {
  return {
    covidData: [
      { Country: 'USA', CasesPerMillion: 25000 },
      { Country: 'Brazil', CasesPerMillion: 15000 },
      { Country: 'India', CasesPerMillion: 8000 }
    ],
    shapeSettings: {
      colorValuePath: 'CasesPerMillion',
      colorMapping: [
        { from: 0, to: 5000, color: '#90EE90', label: 'Low' },
        { from: 5000, to: 10000, color: '#FFD700', label: 'Medium' },
        { from: 10000, to: 20000, color: '#FF8C00', label: 'High' },
        { from: 20000, to: 50000, color: '#DC143C', label: 'Critical' }
      ]
    }
  }
}
```

## Best Practices

1. **Match mapping type to data** - Use range for numeric, equal for categorical
2. **Use consistent color scales** - Light to dark typically represents low to high
3. **Provide legends** - Help users understand the color scheme
4. **Test edge cases** - Verify behavior with missing or extreme values
5. **Choose colors for accessibility** - Avoid red-green only; include blue
6. **Label mappings** - Use the `label` property to explain what colors mean

## Performance Tips

- Color mapping updates on shape render - large datasets may impact performance
- Use events (shapeRendering) for complex conditional coloring
- Simpler color mappings render faster than many rules
