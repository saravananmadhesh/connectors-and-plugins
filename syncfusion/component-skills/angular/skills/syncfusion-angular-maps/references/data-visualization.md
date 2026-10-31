# Data Visualization in Angular Maps

Master data visualization techniques in Syncfusion Angular Maps to create compelling geographic visualizations. This guide covers bubbles, color mapping, data labels, legends, navigation lines, and annotations for rich data representation.

## Table of Contents

- [Bubbles](#bubbles)
  - [Enabling Bubbles](#enabling-bubbles)
  - [Bubble Shapes](#bubble-shapes)
  - [Bubble Customization](#bubble-customization)
  - [Multiple Bubble Groups](#multiple-bubble-groups)
- [Color Mapping](#color-mapping)
  - [Range Color Mapping](#range-color-mapping)
  - [Equal Color Mapping](#equal-color-mapping)
  - [Desaturation Color Mapping](#desaturation-color-mapping)
  - [Multiple Colors for Gradients](#multiple-colors-for-gradients)
- [Data Labels](#data-labels)
  - [Adding Data Labels](#adding-data-labels)
  - [Smart Labels](#smart-labels)
  - [Label Templates](#label-templates)
- [Legends](#legends)
  - [Legend Modes](#legend-modes)
  - [Legend Positioning](#legend-positioning)
  - [Interactive Legends](#interactive-legends)
- [Navigation Lines](#navigation-lines)
  - [Creating Routes](#creating-routes)
  - [Arrow Configuration](#arrow-configuration)
- [Annotations](#annotations)
  - [Adding Custom Content](#adding-custom-content)
  - [Positioning Annotations](#positioning-annotations)

---

## Bubbles

Bubbles provide size-based visualization of data values across geographic regions, with circular or square shapes proportional to underlying data.

### Enabling Bubbles

Enable bubbles by setting the `visible` property in `bubbleSettings` to true and binding your data source:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer [shapeData]="worldMap" [bubbleSettings]="bubbleSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public bubbleSettings: object[] = [{
    visible: true,
    dataSource: [
      { latitude: 37.0902, longitude: -95.7129, population: 325020000 },
      { latitude: 56.1304, longitude: -106.3468, population: 37742154 },
      { latitude: 23.6345, longitude: -102.5528, population: 129163276 }
    ],
    valuePath: 'population',
    minRadius: 5,
    maxRadius: 20
  }];
}
```

### Bubble Shapes

Choose between circular and square bubble shapes:

```typescript
public bubbleSettings: object[] = [{
  visible: true,
  dataSource: this.populationData,
  valuePath: 'population',
  bubbleType: 'Square',  // 'Circle' (default) or 'Square'
  minRadius: 10,
  maxRadius: 30
}];
```

### Bubble Customization

Customize bubble appearance with colors, borders, opacity, and animations:

```typescript
public bubbleSettings: object[] = [{
  visible: true,
  dataSource: this.populationData,
  valuePath: 'population',
  fill: '#7AB8E8',
  opacity: 0.8,
  border: {
    color: '#1E5A8E',
    width: 2,
    opacity: 1
  },
  animationDuration: 1000,
  animationDelay: 100,
  // Set colors from data source field
  colorValuePath: 'color'
}];
```

**Setting Bubble Radius Range:**

```typescript
public bubbleSettings: object[] = [{
  visible: true,
  dataSource: this.populationData,
  valuePath: 'population',
  minRadius: 5,   // Minimum bubble size
  maxRadius: 40   // Maximum bubble size
}];
```

### Multiple Bubble Groups

Display multiple datasets using separate bubble groups:

```typescript
public bubbleSettings: object[] = [
  {
    visible: true,
    dataSource: this.malePopulation,
    valuePath: 'population',
    fill: '#6495ED',
    minRadius: 5,
    maxRadius: 20
  },
  {
    visible: true,
    dataSource: this.femalePopulation,
    valuePath: 'population',
    fill: '#FF69B4',
    minRadius: 5,
    maxRadius: 20
  }
];
```

### Bubble Tooltips

Enable tooltips to display additional bubble information:

```typescript
public bubbleSettings: object[] = [{
  visible: true,
  dataSource: this.populationData,
  valuePath: 'population',
  tooltipSettings: {
    visible: true,
    valuePath: 'name',
    template: '<div><b>${name}</b><br>Population: ${population}</div>'
  }
}];
```

---

## Color Mapping

Color mapping customizes shape colors based on data values, supporting range, equal, and desaturation types.

### Range Color Mapping

Assign colors based on numeric value ranges:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [dataSource]="populationDensity"
          shapePropertyPath="name"
          shapeDataPath="name"
          [shapeSettings]="shapeSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };// GeoJSON data
  
  public populationDensity: object[] = [
    { name: 'United States', density: 33 },
    { name: 'United Kingdom', density: 255 },
    { name: 'United Arab Emirates', density: 99 }
  ];
  
  public shapeSettings: object = {
    colorValuePath: 'density',
    colorMapping: [
      { from: 0, to: 100, color: '#E8F5E9', label: 'Low Density' },
      { from: 100, to: 200, color: '#81C784', label: 'Medium Density' },
      { from: 200, to: 300, color: '#2E7D32', label: 'High Density' }
    ]
  };
}
```

### Equal Color Mapping

Assign colors when data values match specific categories:

```typescript
public unCountries: object[] = [
  { Country: 'China', Membership: 'Permanent' },
  { Country: 'France', Membership: 'Permanent' },
  { Country: 'Bolivia', Membership: 'Non-Permanent' },
  { Country: 'Ethiopia', Membership: 'Non-Permanent' }
];

public shapeSettings: object = {
  colorValuePath: 'Membership',
  colorMapping: [
    { value: 'Permanent', color: '#1976D2', label: 'Permanent Members' },
    { value: 'Non-Permanent', color: '#64B5F6', label: 'Non-Permanent Members' }
  ]
};
```

### Desaturation Color Mapping

Vary opacity across a numeric range while maintaining a single base color:

```typescript
public shapeSettings: object = {
  colorValuePath: 'density',
  colorMapping: [
    {
      from: 0,
      to: 100,
      color: '#1976D2',
      minOpacity: 0.3,
      maxOpacity: 1,
      label: 'Population Density'
    }
  ]
};
```

### Multiple Colors for Gradients

Create smooth color gradients with multiple color stops:

```typescript
public shapeSettings: object = {
  colorValuePath: 'density',
  colorMapping: [
    {
      from: 0,
      to: 300,
      color: ['#E3F2FD', '#90CAF9', '#42A5F5', '#1976D2', '#0D47A1'],
      label: 'Density Range'
    }
  ]
};
```

### Handling Excluded Items

Apply colors to items outside defined mapping ranges:

```typescript
public shapeSettings: object = {
  colorValuePath: 'density',
  colorMapping: [
    { from: 0, to: 100, color: '#C8E6C9' },
    { from: 100, to: 200, color: '#81C784' },
    { color: '#E0E0E0', label: 'No Data' }  // For excluded items
  ]
};
```

### Color Mapping for Bubbles

Apply color mapping to bubble visualizations:

```typescript
public bubbleSettings: object[] = [{
  visible: true,
  dataSource: this.populationData,
  valuePath: 'population',
  colorValuePath: 'density',
  colorMapping: [
    { from: 0, to: 100, color: '#FFEB3B' },
    { from: 100, to: 500, color: '#FF9800' },
    { from: 500, to: 1000, color: '#F44336' }
  ]
}];
```

---

## Data Labels

Data labels display text information about map shapes, making data more readable and accessible.

**Important:** To render data labels, you must import and inject `DataLabelService` in the component `providers`.

### Adding Data Labels

Enable data labels and specify the field to display:

```typescript
import { Component } from '@angular/core';
import { MapsModule, DataLabelService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [DataLabelService],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="usaMap"
          [dataLabelSettings]="dataLabelSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/usa.json' } };// GeoJSON data
  
  public dataLabelSettings: object = {
    visible: true,
    labelPath: 'name',  // Field from shape data or dataSource
    smartLabelMode: 'Trim'
  };
}
```

**Using Data Source Fields:**

```typescript
public dataSource: object[] = [
  { name: 'Texas', abbreviation: 'TX', population: 29000000 },
  { name: 'California', abbreviation: 'CA', population: 39500000 }
];

public dataLabelSettings: object = {
  visible: true,
  labelPath: 'abbreviation',  // Field from dataSource
  smartLabelMode: 'Hide'
};
```

### Customizing Data Labels

Control label appearance with styling options:

```typescript
public dataLabelSettings: object = {
  visible: true,
  labelPath: 'name',
  fill: '#FFFFFF',
  opacity: 0.9,
  border: {
    color: '#1976D2',
    width: 1,
    opacity: 1
  },
  textStyle: {
    fontFamily: 'Segoe UI',
    size: '12px',
    fontWeight: 'Bold',
    color: '#212121'
  }
};
```

### Smart Labels

Control label behavior when labels exceed shape boundaries:

```typescript
public dataLabelSettings: object = {
  visible: true,
  labelPath: 'name',
  smartLabelMode: 'Trim',  // 'None', 'Hide', or 'Trim'
  intersectionAction: 'Hide'  // 'None', 'Hide', or 'Trim'
};
```

**Smart Label Modes:**
- **None**: No action taken when labels overflow
- **Hide**: Hide labels that exceed shape boundaries
- **Trim**: Trim labels with ellipsis when they overflow

**Intersection Actions:**
- **None**: No action when labels overlap
- **Hide**: Hide overlapping labels
- **Trim**: Trim overlapping labels

### Label Animation

Animate data labels during initial rendering:

```typescript
public dataLabelSettings: object = {
  visible: true,
  labelPath: 'name',
  animationDuration: 1000  // Duration in milliseconds
};
```

### Label Templates

Use custom HTML templates for advanced label layouts:

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="usaMap"
          [dataSource]="stateData"
          [dataLabelSettings]="dataLabelSettings">
          <ng-template #labelTemplate let-data>
            <div style="background: #1976D2; color: white; padding: 5px; border-radius: 3px;">
              <div style="font-weight: bold;">{{data.name}}</div>
              <div style="font-size: 10px;">Pop: {{data.population}}</div>
            </div>
          </ng-template>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public usaMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/usa.json' } };
  public dataLabelSettings: object = {
    visible: true,
    template: '#labelTemplate'
  };
}
```

---

## Legends

Legends provide visual keys for interpreting map colors, markers, and bubbles.

### Legend Modes

Choose between default and interactive legend modes:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps [legendSettings]="legendSettings">
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [dataSource]="populationData"
          [shapeSettings]="shapeSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public legendSettings: object = {
    visible: true,
    mode: 'Interactive',  // 'Default' or 'Interactive'
    invertedPointer: true
  };
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public shapeSettings: object = {
    colorValuePath: 'population',
    colorMapping: [
      { from: 0, to: 100000, color: '#E3F2FD', label: 'Low' },
      { from: 100000, to: 1000000, color: '#42A5F5', label: 'Medium' },
      { from: 1000000, to: 10000000, color: '#0D47A1', label: 'High' }
    ]
  };
}
```

### Legend Positioning

Position legends using dock or absolute positioning:

**Dock Positioning:**

```typescript
public legendSettings: object = {
  visible: true,
  position: 'Bottom',  // 'Top', 'Left', 'Bottom', 'Right'
  alignment: 'Center',  // 'Near', 'Center', 'Far'
  orientation: 'Horizontal'  // 'Horizontal' or 'Vertical'
};
```

**Absolute Positioning:**

```typescript
public legendSettings: object = {
  visible: true,
  position: 'Float',
  location: {
    x: 50,  // X coordinate
    y: 100  // Y coordinate
  }
};
```

### Customizing Legends

Control legend appearance with extensive styling options:

```typescript
public legendSettings: object = {
  visible: true,
  background: '#FFFFFF',
  border: {
    color: '#1976D2',
    width: 2,
    opacity: 1
  },
  fill: '#E3F2FD',
  opacity: 0.9,
  textStyle: {
    fontFamily: 'Segoe UI',
    size: '12px',
    fontWeight: 'Normal',
    color: '#212121'
  },
  title: {
    text: 'Population Density',
    textStyle: {
      size: '14px',
      fontWeight: 'Bold'
    }
  },
  height: '100px',
  width: '300px'
};
```

### Legend Shapes

Customize legend item shapes:

```typescript
public legendSettings: object = {
  visible: true,
  shape: 'Diamond',  // 'Circle', 'Rectangle', 'Triangle', 'Diamond', etc.
  shapeWidth: 20,
  shapeHeight: 20,
  shapePadding: 10,
  shapeBorder: {
    color: '#1976D2',
    width: 1
  }
};
```

### Interactive Legends

Enable legend toggle functionality to show/hide map elements:

```typescript
public legendSettings: object = {
  visible: true,
  toggleLegendSettings: {
    enable: true,
    applyShapeSettings: false,
    fill: '#D3D3D3',
    opacity: 0.5,
    border: {
      color: '#424242',
      width: 1
    }
  }
};
```

### Controlling Legend Visibility

Hide specific legend items or control visibility from data:

```typescript
// Hide specific legend items
public shapeSettings: object = {
  colorMapping: [
    { from: 0, to: 100, color: '#C8E6C9', showLegend: true },
    { from: 100, to: 200, color: '#81C784', showLegend: false }  // Hidden
  ]
};

// Control from data source
public legendSettings: object = {
  visible: true,
  showLegendPath: 'showInLegend'  // Field in dataSource
};
```

### Bubble and Marker Legends

Display legends for bubbles and markers:

```typescript
// Bubble legend
public legendSettings: object = {
  visible: true,
  type: 'Bubbles'
};

// Marker legend
public legendSettings: object = {
  visible: true,
  type: 'Markers',
  useMarkerShape: true  // Match legend shape to marker shape
};

public markerSettings: object[] = [{
  visible: true,
  dataSource: this.cities,
  legendText: 'name'  // Field to display in legend
}];
```

---

## Navigation Lines

Navigation lines draw curved paths between locations to visualize routes and connections.

### Creating Routes

Draw navigation lines between two geographic points:

```typescript
import { Component } from '@angular/core';
import { NavigationLine } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [NavigationLine],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [navigationLineSettings]="navigationLineSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };// GeoJSON data
  
  public navigationLineSettings: object[] = [{
    visible: true,
    latitude: [40.7128, 51.5074],   // Start and end latitudes
    longitude: [-74.0060, -0.1278],  // Start and end longitudes
    color: '#1976D2',
    width: 3,
    angle: 0.5,  // Curvature of the line
    dashArray: '0'
  }];
}
```

### Customizing Navigation Lines

Style navigation lines with colors, widths, and dash patterns:

```typescript
public navigationLineSettings: object[] = [
  {
    visible: true,
    latitude: [34.0522, 40.7128],
    longitude: [-118.2437, -74.0060],
    color: '#FF5722',
    width: 4,
    dashArray: '5,5',  // Dashed line pattern
    angle: 0.8
  },
  {
    visible: true,
    latitude: [51.5074, 48.8566],
    longitude: [-0.1278, 2.3522],
    color: '#4CAF50',
    width: 2,
    angle: 0.3
  }
];
```

### Arrow Configuration

Add directional arrows to navigation lines:

```typescript
public navigationLineSettings: object[] = [{
  visible: true,
  latitude: [40.7128, 51.5074],
  longitude: [-74.0060, -0.1278],
  color: '#1976D2',
  width: 3,
  angle: 0.5,
  arrowSettings: {
    showArrow: true,
    position: 'End',  // 'Start' or 'End'
    size: 10,
    color: '#0D47A1',
    offset: 0  // Distance from end point
  }
}];
```

### Highlighting and Selection

Enable user interaction with navigation lines:

```typescript
public navigationLineSettings: object[] = [{
  visible: true,
  latitude: [40.7128, 51.5074],
  longitude: [-74.0060, -0.1278],
  highlightSettings: {
    enable: true,
    fill: '#FFEB3B',
    border: { color: '#FFC107', width: 2 }
  },
  selectionSettings: {
    enable: true,
    fill: '#FF5722',
    border: { color: '#D84315', width: 2 }
  }
}];
```

---

## Annotations

Annotations overlay custom HTML content at precise map locations for enhanced visualizations.

### Adding Custom Content

Place custom HTML elements anywhere on the map:

```typescript
import { Component } from '@angular/core';
import { Annotations } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [Annotations],
  template: `
    <ejs-maps [annotations]="annotations">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
    
    <div id="custom-annotation" style="display:none;">
      <div style="background: #1976D2; color: white; padding: 10px; border-radius: 5px;">
        <h3 style="margin: 0;">United States</h3>
        <p style="margin: 5px 0;">Population: 331 Million</p>
      </div>
    </div>
    <div id="custom-annotation1" style="color: red; font-size: 20px;">📍 Major City</div>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } }; // GeoJSON data
  
  public annotations: object[] = [
    {
      content: '#custom-annotation',
      x: '40%',  // Position as percentage or pixels
      y: '30%',
      zIndex: 1
    },
    {
      content: '#custom-annotation1',
      x: 200,  // Absolute pixel position
      y: 150
    }
  ];
}
```

### Positioning Annotations

Control annotation placement with coordinates and alignment:

```typescript
public annotations: object[] = [{
  content: '#annotation-template',
  x: '50%',  // Horizontal position
  y: '20%',  // Vertical position
  horizontalAlignment: 'Center',  // 'Near', 'Center', 'Far', 'None'
  verticalAlignment: 'Near',      // 'Near', 'Center', 'Far', 'None'
  zIndex: 10  // Stack order
}];
```

### Annotation Z-Index

Layer annotations by controlling their z-index:

```typescript
public annotations: object[] = [
  {
    content: '#annotation',
    x: '50%',
    y: '50%',
    zIndex: 0  // Lowest layer
  },
  {
    content: '#annotation1',
    x: '50%',
    y: '55%',
    zIndex: 100  // Highest layer
  }
];
```

```html
<div id="annotation" class="background-annotation">Background Layer</div>
<div id="annotation1" class="foreground-annotation">Foreground Layer</div>
```

### Multiple Annotations

Add multiple annotations for complex layouts:

```typescript
public annotations: object[] = [
  {
    content: '#annotation',
    x: '50%',
    y: '5%',
    horizontalAlignment: 'Center',
    zIndex: 1
  },
  {
    content: '#annotation1',
    x: '10%',
    y: '90%',
    zIndex: 1
  },
  {
    content: '#annotation2',
    x: '90%',
    y: '95%',
    horizontalAlignment: 'Far',
    zIndex: 1
  }
];
```

```html
<div id="annotation" class="title">World Population Map</div>
<div id="annotation1" class="legend-info">Legend: Population in millions</div>
<div id="annotation2" class="source">Data Source: UN Statistics 2024</div>
```

---

## Best Practices

### Data Visualization

1. **Choose Appropriate Visualization Types**: Use bubbles for quantitative data, color mapping for ranges or categories, and navigation lines for connections
2. **Maintain Visual Hierarchy**: Use size and color to emphasize important data points
3. **Avoid Overcrowding**: Limit the number of bubbles, labels, or markers to prevent visual clutter
4. **Use Consistent Color Schemes**: Maintain consistent color palettes across all visualizations
5. **Provide Context**: Always include legends and data labels to explain what's being visualized

### Performance Optimization

1. **Limit Data Points**: Keep bubble and marker counts reasonable (< 1000 for optimal performance)
2. **Use Smart Labels**: Enable `smartLabelMode` to automatically manage label overflow
3. **Optimize Color Mapping**: Use range mapping instead of creating individual mappings for many values
4. **Lazy Load Large Datasets**: Load visualization data progressively for better initial render times

### Accessibility

1. **Add Descriptive Labels**: Use clear, descriptive text in data labels and legends
2. **Ensure Color Contrast**: Maintain sufficient contrast between shapes and backgrounds
3. **Provide Alternative Text**: Include ARIA labels for screen readers
4. **Support Keyboard Navigation**: Enable keyboard interaction for legend items

### User Experience

1. **Enable Tooltips**: Provide additional context through interactive tooltips
2. **Use Interactive Legends**: Allow users to toggle data layers on and off
3. **Add Meaningful Animations**: Use subtle animations to draw attention without distraction
4. **Test on Multiple Devices**: Ensure visualizations work well on desktop and mobile

---

## Common Patterns

### Population Density Visualization

```typescript
export class PopulationDensityComponent {
  public shapeSettings: object = {
    colorValuePath: 'density',
    colorMapping: [
      { from: 0, to: 50, color: '#FFFFCC', label: 'Very Low' },
      { from: 50, to: 100, color: '#FFD700', label: 'Low' },
      { from: 100, to: 200, color: '#FF8C00', label: 'Medium' },
      { from: 200, to: 500, color: '#FF4500', label: 'High' },
      { from: 500, to: 2000, color: '#8B0000', label: 'Very High' }
    ]
  };
  
  public legendSettings: object = {
    visible: true,
    position: 'Bottom',
    mode: 'Interactive'
  };
  
  public dataLabelSettings: object = {
    visible: true,
    labelPath: 'name',
    smartLabelMode: 'Trim'
  };
}
```

### Multi-Metric Dashboard

```typescript
export class DashboardComponent {
  public bubbleSettings: object[] = [
    {
      visible: true,
      dataSource: this.economicData,
      valuePath: 'gdp',
      colorValuePath: 'growth',
      tooltipSettings: {
        visible: true,
        template: '<div><b>${country}</b><br>GDP: $${gdp}B<br>Growth: ${growth}%</div>'
      }
    }
  ];
  
  public markerSettings: object[] = [{
    visible: true,
    dataSource: this.capitals,
    shape: 'Diamond',
    fill: '#FFD700'
  }];
  
  public navigationLineSettings: object[] = [{
    visible: true,
    latitude: this.tradeRouteLatitudes,
    longitude: this.tradeRouteLongitudes,
    dashArray: '4,4',
    arrowSettings: { showArrow: true, position: 'End' }
  }];
}
```

### Category-Based Color Mapping

```typescript
export class CategoryMapComponent {
  public shapeSettings: object = {
    colorValuePath: 'category',
    colorMapping: [
      { value: 'Developed', color: '#4CAF50', label: 'Developed Nations' },
      { value: 'Developing', color: '#FFC107', label: 'Developing Nations' },
      { value: 'Least Developed', color: '#F44336', label: 'Least Developed' }
    ]
  };
  
  public legendSettings: object = {
    visible: true,
    position: 'Right',
    toggleLegendSettings: {
      enable: true
    }
  };
}
```

---

## Next Steps

- **[User Interactions](./user-interactions.md)** - Learn about zooming, panning, selection, and highlighting
- **[Map Providers](./map-providers.md)** - Integrate Bing Maps, OpenStreetMap, and Azure Maps
- **[Markers](../markers.md)** - Add and customize location markers
- **[Customization](./customization.md)** - Customize map appearance and themes
- **[Advanced Features](./advanced-features.md)** - Explore print, export, and state persistence

For complete API documentation, visit the [Syncfusion Angular Maps API Reference](https://ej2.syncfusion.com/angular/documentation/api/maps/).

---

## API Reference Summary

### Bubble APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `BubbleSettings` | Bubble configuration model | [BubbleSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings) |
| `dataSource` | Bubble data array | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#datasource) |
| `valuePath` | Size value field | [valuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#valuepath) |
| `minRadius` | Minimum bubble size | [minRadius](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#minradius) |
| `maxRadius` | Maximum bubble size | [maxRadius](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#maxradius) |
| `colorMapping` | Color mapping config | [colorMapping](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#colormapping) |

### Color Mapping APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `ColorMappingSettings` | Color mapping model | [ColorMappingSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings) |
| `from` | Range start value | [from](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#from) |
| `to` | Range end value | [to](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#to) |
| `color` | Mapping color | [color](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#color) |

### Data Label & Legend APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `DataLabelSettings` | Data label configuration | [DataLabelSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings) |
| `LegendSettings` | Legend configuration | [LegendSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings) |
| `NavigationLineSettings` | Navigation line config | [NavigationLineSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings) |
| `Annotation` | Annotation configuration | [Annotation](https://ej2.syncfusion.com/angular/documentation/api/maps/annotation) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)