# Markers

Complete guide to adding, customizing, and working with markers in Angular Maps to pinpoint specific locations.

## Table of Contents
- [Overview](#overview)
- [Adding Basic Markers](#adding-basic-markers)
- [Marker Shapes](#marker-shapes)
- [Custom Marker Templates](#custom-marker-templates)
- [Marker Customization](#marker-customization)
- [Multiple Marker Groups](#multiple-marker-groups)
- [Data-Driven Markers](#data-driven-markers)
- [Marker Clustering](#marker-clustering)
- [Marker Drag and Drop](#marker-drag-and-drop)
- [Marker Tooltips](#marker-tooltips)
- [Marker Zooming](#marker-zooming)
- [Best Practices](#best-practices)

## Overview

Markers are visual indicators that pinpoint specific locations on maps. They're essential for:
- 📍 **Location highlighting** - Show points of interest, store locations, or landmarks
- 🗺️ **Data visualization** - Display quantitative data at specific coordinates
- 🎯 **Interactive maps** - Enable click, hover, and selection interactions
- 📊 **Analytics dashboards** - Visualize geographic data points

**Key requirement:** Inject `MarkerService` in your component providers.

## Adding Basic Markers

### Step 1: Inject MarkerService

```typescript
import { Component } from '@angular/core';
import { MapsModule, MarkerService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService],  // Required!
  template: `...`
})
export class AppComponent { }
```

### Step 2: Define Marker Data

Marker data requires `latitude` and `longitude` fields:

```typescript
public markerData: object[] = [
  { latitude: 40.7128, longitude: -74.0060, name: 'New York' },
  { latitude: 51.5074, longitude: -0.1278, name: 'London' },
  { latitude: 35.6762, longitude: 139.6503, name: 'Tokyo' },
  { latitude: -33.8688, longitude: 151.2093, name: 'Sydney' }
];
```

### Step 3: Configure Marker Settings

```typescript
import { Component } from '@angular/core';
import { MapsModule, MarkerService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [markerSettings]='markerSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public markerSettings: object[] = [{
    visible: true,
    dataSource: [
      { latitude: 40.7128, longitude: -74.0060, name: 'New York' },
      { latitude: 51.5074, longitude: -0.1278, name: 'London' },
      { latitude: 35.6762, longitude: 139.6503, name: 'Tokyo' }
    ]
  }];
}
```

## Marker Shapes

The Maps component supports multiple built-in marker shapes:

### Available Shapes

- **Balloon** - Speech bubble shape
- **Circle** - Round marker (default)
- **Cross** - X-shaped marker
- **Diamond** - Diamond shape
- **Image** - Custom image
- **Rectangle** - Square/rectangular shape
- **Star** - Star shape
- **Triangle** - Triangular marker
- **VerticalLine** - Vertical line
- **HorizontalLine** - Horizontal line

### Using Built-in Shapes

```typescript
public markerSettings: object[] = [{
  visible: true,
  shape: 'Diamond',  // Change shape
  height: 15,
  width: 15,
  fill: '#FF6347',
  dataSource: [
    { latitude: 40.7128, longitude: -74.0060, name: 'New York' }
  ]
}];
```

### Using Image Markers

#### Method 1: Single Image for All Markers

```typescript
public markerSettings: object[] = [{
  visible: true,
  shape: 'Image',
  imageUrl: 'assets/marker-icon.png',
  height: 30,
  width: 30,
  dataSource: [
    { latitude: 40.7128, longitude: -74.0060, name: 'New York' }
  ]
}];
```

#### Method 2: Different Images from Data Source

```typescript
public markerSettings: object[] = [{
  visible: true,
  shape: 'Image',
  imageUrlValuePath: 'iconPath',  // Field containing image path
  height: 30,
  width: 30,
  dataSource: [
    { 
      latitude: 40.7128, 
      longitude: -74.0060, 
      name: 'New York',
      iconPath: 'assets/city-icon.png'
    },
    { 
      latitude: 51.5074, 
      longitude: -0.1278, 
      name: 'London',
      iconPath: 'assets/capital-icon.png'
    }
  ]
}];
```

## Custom Marker Templates

For advanced customization, use HTML templates:

```typescript
import { Component } from '@angular/core';
import { MapsModule, MarkerService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [markerSettings]='markerSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
    
    <!-- Marker template -->
    <ng-template #markerTemplate let-data>
      <div style="background: #FF6347; color: white; padding: 5px 10px; border-radius: 5px;">
        <strong>{{data.name}}</strong><br>
        <small>{{data.population}}</small>
      </div>
    </ng-template>
  `
})
export class AppComponent {
  @ViewChild('markerTemplate', { static: true }) markerTemplate: any;
  
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public markerSettings: object[] = [];
  
  ngAfterViewInit() {
    this.markerSettings = [{
      visible: true,
      template: this.markerTemplate,
      dataSource: [
        { latitude: 40.7128, longitude: -74.0060, name: 'New York', population: '8.3M' },
        { latitude: 51.5074, longitude: -0.1278, name: 'London', population: '9.0M' }
      ]
    }];
  }
}
```

## Marker Customization

### Visual Customization Properties

```typescript
public markerSettings: object[] = [{
  visible: true,
  dataSource: markerData,
  
  // Shape and size
  shape: 'Circle',
  height: 20,
  width: 20,
  
  // Colors
  fill: '#FF6347',
  opacity: 0.8,
  
  // Border
  border: {
    color: '#000000',
    width: 2,
    opacity: 1
  },
  
  // Dash pattern
  dashArray: '5,5',
  
  // Position offset
  offset: {
    x: 0,
    y: -10
  },
  
  // Animation
  animationDuration: 1000,
  animationDelay: 500
}];
```

### Individual Marker Sizing

Use value paths to set different sizes for each marker:

```typescript
public markerSettings: object[] = [{
  visible: true,
  shape: 'Circle',
  widthValuePath: 'markerWidth',    // Field for width
  heightValuePath: 'markerHeight',  // Field for height
  dataSource: [
    { 
      latitude: 40.7128, 
      longitude: -74.0060, 
      name: 'New York',
      markerWidth: 25,
      markerHeight: 25
    },
    { 
      latitude: 51.5074, 
      longitude: -0.1278, 
      name: 'London',
      markerWidth: 15,
      markerHeight: 15
    }
  ]
}];
```

## Multiple Marker Groups

Create multiple marker groups with different styles:

```typescript
import { Component } from '@angular/core';
import { MapsModule, MarkerService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [markerSettings]='markerSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  // Multiple marker groups
  public markerSettings: object[] = [
    // Group 1: Capital cities
    {
      visible: true,
      shape: 'Star',
      fill: '#FFD700',
      height: 20,
      width: 20,
      dataSource: [
        { latitude: 40.7128, longitude: -74.0060, name: 'New York', type: 'Capital' },
        { latitude: 51.5074, longitude: -0.1278, name: 'London', type: 'Capital' }
      ]
    },
    // Group 2: Major cities
    {
      visible: true,
      shape: 'Circle',
      fill: '#FF6347',
      height: 15,
      width: 15,
      dataSource: [
        { latitude: 34.0522, longitude: -118.2437, name: 'Los Angeles', type: 'Major' },
        { latitude: 48.8566, longitude: 2.3522, name: 'Paris', type: 'Major' }
      ]
    },
    // Group 3: Ports
    {
      visible: true,
      shape: 'Diamond',
      fill: '#4169E1',
      height: 12,
      width: 12,
      dataSource: [
        { latitude: 1.3521, longitude: 103.8198, name: 'Singapore', type: 'Port' },
        { latitude: 22.3193, longitude: 114.1694, name: 'Hong Kong', type: 'Port' }
      ]
    }
  ];
}
```

## Data-Driven Markers

### Binding Shapes from Data Source

```typescript
public markerSettings: object[] = [{
  visible: true,
  shapeValuePath: 'markerShape',  // Field containing shape name
  colorValuePath: 'markerColor',  // Field containing color
  dataSource: [
    { 
      latitude: 40.7128, 
      longitude: -74.0060, 
      name: 'New York',
      markerShape: 'Star',
      markerColor: '#FFD700'
    },
    { 
      latitude: 51.5074, 
      longitude: -0.1278, 
      name: 'London',
      markerShape: 'Circle',
      markerColor: '#FF6347'
    }
  ]
}];
```

### Custom Latitude/Longitude Fields

```typescript
public markerSettings: object[] = [{
  visible: true,
  latitudeValuePath: 'lat',   // Custom latitude field name
  longitudeValuePath: 'lng',  // Custom longitude field name
  dataSource: [
    { lat: 40.7128, lng: -74.0060, name: 'New York' },
    { lat: 51.5074, lng: -0.1278, name: 'London' }
  ]
}];
```

## Marker Clustering

When markers overlap at certain zoom levels, clustering improves readability.

### Enabling Clustering

```typescript
import { Component } from '@angular/core';
import { MapsModule, MarkerService, ZoomService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService, ZoomService],
  template: `
    <ejs-maps 
      id='maps-container'
      [zoomSettings]='zoomSettings'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [markerSettings]='markerSettings'
          [markerClusterSettings]='markerClusterSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public markerSettings: object[] = [{
    visible: true,
    shape: 'Circle',
    height: 10,
    width: 10,
    dataSource: [
      // Many markers in close proximity
      { latitude: 40.7128, longitude: -74.0060, name: 'Location 1' },
      { latitude: 40.7580, longitude: -73.9855, name: 'Location 2' },
      { latitude: 40.7489, longitude: -73.9680, name: 'Location 3' },
      // ... more markers
    ]
  }];
  
  // Enable clustering
  public markerClusterSettings: object = {
    allowClustering: true,
    allowClusterExpand: true,
    shape: 'Circle',
    height: 40,
    width: 40,
    fill: '#FF6347',
    opacity: 0.8,
    labelStyle: {
      color: 'white',
      size: '14px'
    }
  };
  
  public zoomSettings: object = {
    enable: true
  };
}
```

### Cluster Customization

```typescript
public markerClusterSettings: object = {
  allowClustering: true,
  allowClusterExpand: true,  // Allow clicking to expand
  
  // Visual styling
  shape: 'Circle',
  height: 50,
  width: 50,
  fill: '#4169E1',
  opacity: 0.9,
  
  // Border
  border: {
    color: '#FFFFFF',
    width: 3
  },
  
  // Label (shows count)
  labelStyle: {
    color: 'white',
    size: '16px',
    fontWeight: 'bold'
  },
  
  // Position offset
  offset: {
    x: 0,
    y: 0
  },
  
  // Connector lines (when expanded)
  connectorLineSettings: {
    color: '#000000',
    width: 2,
    opacity: 0.5
  }
};
```

### Per-Group Clustering

Enable clustering for specific marker groups:

```typescript
public markerSettings: object[] = [
  // Group 1: With clustering
  {
    visible: true,
    dataSource: denseMarkerData,
    clusterSettings: {
      allowClustering: true,
      shape: 'Circle',
      fill: '#FF6347'
    }
  },
  // Group 2: Without clustering
  {
    visible: true,
    dataSource: sparseMarkerData
    // No clusterSettings - markers always visible
  }
];
```

## Marker Drag and Drop

Allow users to reposition markers by dragging:

```typescript
import { Component } from '@angular/core';
import { MapsModule, MarkerService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService],
  template: `
    <ejs-maps 
      id='maps-container'
      (markerDragStart)='onMarkerDragStart($event)'
      (markerDragEnd)='onMarkerDragEnd($event)'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [markerSettings]='markerSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public markerSettings: object[] = [{
    visible: true,
    enableDrag: true,  // Enable drag and drop
    shape: 'Circle',
    height: 20,
    width: 20,
    fill: '#FF6347',
    dataSource: [
      { latitude: 40.7128, longitude: -74.0060, name: 'New York' },
      { latitude: 51.5074, longitude: -0.1278, name: 'London' }
    ]
  }];
  
  onMarkerDragStart(args: any) {
    console.log('Marker drag started:', args);
    console.log('Original position:', args.latitude, args.longitude);
  }
  
  onMarkerDragEnd(args: any) {
    console.log('Marker drag ended:', args);
    console.log('New position:', args.latitude, args.longitude);
    
    // Update data source with new position
    const marker = this.markerSettings[args.markerIndex].dataSource[args.dataIndex];
    marker.latitude = args.latitude;
    marker.longitude = args.longitude;
  }
}
```

**Event Properties:**
- `dataIndex` - Index of the marker in dataSource
- `markerIndex` - Index of the marker group
- `layerIndex` - Index of the layer
- `latitude` - New latitude coordinate
- `longitude` - New longitude coordinate
- `x`, `y` - Mouse pointer position

## Marker Tooltips

Display additional information on hover:

```typescript
import { Component } from '@angular/core';
import { MapsModule, MarkerService, MapsTooltipService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService, MapsTooltipService],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [markerSettings]='markerSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public markerSettings: object[] = [{
    visible: true,
    shape: 'Circle',
    fill: '#FF6347',
    dataSource: [
      { 
        latitude: 40.7128, 
        longitude: -74.0060, 
        name: 'New York',
        population: '8.3M',
        country: 'USA'
      }
    ],
    tooltipSettings: {
      visible: true,
      valuePath: 'name',  // Simple tooltip
      // Or use format for complex tooltips:
      format: '${name}<br>Population: ${population}<br>Country: ${country}'
    }
  }];
}
```

## Marker Zooming

Automatically zoom to fit all markers:

```typescript
import { Component } from '@angular/core';
import { MapsModule, MarkerService, ZoomService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService, ZoomService],
  template: `
    <ejs-maps 
      id='maps-container'
      [zoomSettings]='zoomSettings'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [markerSettings]='markerSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public markerSettings: object[] = [{
    visible: true,
    dataSource: [
      { latitude: 40.7128, longitude: -74.0060, name: 'New York' },
      { latitude: 51.5074, longitude: -0.1278, name: 'London' },
      { latitude: 35.6762, longitude: 139.6503, name: 'Tokyo' }
    ]
  }];
  
  public zoomSettings: object = {
    enable: true,
    shouldZoomInitially: true  // Auto-zoom to fit all markers
  };
}
```

## Best Practices

### 1. Inject Required Services

Always inject `MarkerService` when using markers:

```typescript
@Component({
  providers: [MarkerService]  // Required!
})
```

Add other services as needed:
- `MapsTooltipService` - For marker tooltips
- `ZoomService` - For zoom functionality
- `SelectionService` - For marker selection

### 2. Optimize Large Marker Sets

For maps with many markers:

```typescript
// ✅ Good: Use clustering
public markerClusterSettings: object = {
  allowClustering: true
};

// ✅ Good: Reduce marker size
public markerSettings: object[] = [{
  height: 8,
  width: 8
}];

// ✅ Good: Load markers on demand
async loadMarkersForRegion(region: string) {
  const markers = await this.fetchMarkers(region);
  this.markerSettings[0].dataSource = markers;
}
```

### 3. Use Appropriate Shapes

- **Circle** - Default, general purpose
- **Star** - Highlight important locations
- **Diamond** - Distinguish secondary locations
- **Image** - Brand-specific or custom icons
- **Balloon** - For labels/callouts

### 4. Consistent Data Structure

Maintain consistent field names across marker groups:

```typescript
// ✅ Good: Consistent structure
{ latitude: 40.7, longitude: -74.0, name: 'NYC' }
{ latitude: 51.5, longitude: -0.1, name: 'London' }

// ❌ Bad: Inconsistent structure
{ lat: 40.7, lng: -74.0, city: 'NYC' }
{ latitude: 51.5, longitude: -0.1, name: 'London' }
```

### 5. Marker Visibility

Control when markers appear:

```typescript
// Show/hide based on zoom level or conditions
public markerSettings: object[] = [{
  visible: this.currentZoomLevel > 5
}];
```

### 6. Accessibility

Provide meaningful tooltip content:

```typescript
tooltipSettings: {
  visible: true,
  format: '${name} - ${description}'  // Descriptive text
}
```

### 7. Performance Tips

- Limit markers to <1000 per layer for smooth performance
- Use clustering for dense marker areas
- Lazy load markers as users pan/zoom
- Simplify custom templates

## Common Patterns

### Pattern 1: Store Locator

```typescript
public markerSettings: object[] = [{
  visible: true,
  shape: 'Image',
  imageUrl: 'assets/store-icon.png',
  height: 30,
  width: 30,
  dataSource: storeLocations,
  tooltipSettings: {
    visible: true,
    format: '${storeName}<br>${address}<br>Phone: ${phone}'
  }
}];
```

### Pattern 2: Real-Time Tracking

```typescript
// Update marker positions in real-time
setInterval(() => {
  this.updateMarkerPositions();
}, 5000);

updateMarkerPositions() {
  this.markerSettings[0].dataSource = this.fetchLatestPositions();
}
```

### Pattern 3: Interactive Selection

```typescript
import { SelectionService } from '@syncfusion/ej2-angular-maps';

@Component({
  providers: [MarkerService, SelectionService]
})

public selectionSettings: object = {
  enable: true,
  enableMultiSelect: true
};
```

## Next Steps

- **[Data Visualization](data-visualization.md)** - Add bubbles, legends, and color mapping
- **[User Interactions](user-interactions.md)** - Enable zoom, pan, and selection
- **[Advanced Features](advanced-features.md)** - Create routes between markers
- **[Customization](customization.md)** - Style and theme your markers

---

## API Reference Summary

### Marker APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `MarkerSettings` | Marker configuration model | [MarkerSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings) |
| `dataSource` | Marker data array | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#datasource) |
| `shape` | Marker shape type | [shape](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#shape) |
| `latitudeValuePath` | Latitude data field | [latitudeValuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#latitudevaluepath) |
| `longitudeValuePath` | Longitude data field | [longitudeValuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#longitudevaluepath) |
| `template` | Custom marker template | [template](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#template) |
| `imageUrl` | Image marker URL | [imageUrl](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#imageurl) |
| `tooltipSettings` | Marker tooltip config | [tooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#tooltipsettings) |

### Marker Events

| Event | Description | Documentation Link |
|-------|-------------|-------------------|
| `markerClick` | Fires on marker click | [markerClick](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#markerclick) |
| `markerMouseMove` | Fires on marker hover | [markerMouseMove](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#markermousemove) |
| `markerRendering` | Fires before marker renders | [markerRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#markerrendering) |

### Enumerations

| Enum | Values | Documentation Link |
|------|--------|-------------------|
| `MarkerType` | Balloon, Circle, Cross, Diamond, Image, Rectangle, Star, Triangle | [MarkerType](https://ej2.syncfusion.com/angular/documentation/api/maps/markerType) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)