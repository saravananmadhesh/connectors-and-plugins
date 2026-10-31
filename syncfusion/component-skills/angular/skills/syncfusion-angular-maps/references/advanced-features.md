# Advanced Features

Complete guide to advanced Maps capabilities including print, export, state persistence, public methods, events, routes, and drilldown navigation.

## Table of Contents
- [Print and Export](#print-and-export)
- [State Persistence](#state-persistence)
- [Public Methods](#public-methods)
- [Events](#events)
- [Creating Routes Between Markers](#creating-routes-between-markers)
- [Custom Path Rendering](#custom-path-rendering)
- [Drilldown Navigation](#drilldown-navigation)
- [Best Practices](#best-practices)

## Print and Export

### Printing Maps

Enable direct printing from the browser:

```typescript
import { Component } from '@angular/core';
import { MapsModule, PrintService, Maps } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [PrintService],
  template: `
    <button (click)='printMap()'>Print Map</button>
    
    <ejs-maps 
      #maps
      id='maps-container'
      [allowPrint]='true'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  @ViewChild('maps') maps: Maps;
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  printMap() {
    this.maps.print();
  }
}
```

### Exporting to Image

Export maps as PNG, JPEG, or SVG:

```typescript
import { Component } from '@angular/core';
import { MapsModule, ImageExportService, Maps } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [ImageExportService],
  template: `
    <div>
      <button (click)='exportPNG()'>Export as PNG</button>
      <button (click)='exportJPEG()'>Export as JPEG</button>
      <button (click)='exportSVG()'>Export as SVG</button>
    </div>
    
    <ejs-maps 
      #maps
      id='maps-container'
      [allowImageExport]='true'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  @ViewChild('maps') maps: Maps;
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  exportPNG() {
    this.maps.export('PNG', 'map-export');
  }
  
  exportJPEG() {
    this.maps.export('JPEG', 'map-export');
  }
  
  exportSVG() {
    this.maps.export('SVG', 'map-export');
  }
}
```

### Exporting to PDF

```typescript
import { Component } from '@angular/core';
import { MapsModule, PdfExportService, Maps } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [PdfExportService],
  template: `
    <button (click)='exportPDF()'>Export as PDF</button>
    
    <ejs-maps 
      #maps
      id='maps-container'
      [allowPdfExport]='true'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  @ViewChild('maps') maps: Maps;
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  exportPDF() {
    this.maps.export('PDF', 'map-export', 'Portrait');  // or 'Landscape'
  }
}
```

### Export as Base64 String

```typescript
exportAsBase64() {
  // Returns base64 string instead of downloading
  this.maps.export('PNG', 'map', null, false).then((dataUrl: string) => {
    console.log('Base64 string:', dataUrl);
    // Use dataUrl for uploading, displaying, etc.
  });
}
```

## State Persistence

Save and restore map state across page reloads:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps 
      id='maps-container'
      [enablePersistence]='true'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
}
```

**What gets persisted:**
- Zoom level and position
- Selected shapes/markers
- Pan position
- Layer visibility

**Storage location:** Browser's `localStorage`

**Clear persisted state:**
```typescript
localStorage.removeItem('maps-container');
```

## Public Methods

### getMinMaxLatitudeLongitude

Get the current visible geographic bounds:

```typescript
import { Component, ViewChild } from '@angular/core';
import { MapsModule, Maps } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <button (click)='getBounds()'>Get Bounds</button>
    
    <ejs-maps #maps id='maps-container'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  @ViewChild('maps') maps: Maps;
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  getBounds() {
    const bounds = this.maps.getMinMaxLatitudeLongitude();
    console.log('Bounds:', bounds);
    // {
    //   minLatitude: -55.0,
    //   maxLatitude: 75.0,
    //   minLongitude: -180.0,
    //   maxLongitude: 180.0
    // }
  }
}
```

### refresh

Manually refresh the map:

```typescript
refreshMap() {
  this.maps.refresh();
}
```

### addMarker

Dynamically add markers:

```typescript
addMarkerDynamically() {
  const newMarker = {
    latitude: 35.6762,
    longitude: 139.6503,
    name: 'Tokyo'
  };
  
  this.maps.layers[0].markerSettings[0].dataSource.push(newMarker);
  this.maps.refresh();
}
```

### removeMarker

Remove specific markers:

```typescript
removeMarker(index: number) {
  this.maps.layers[0].markerSettings[0].dataSource.splice(index, 1);
  this.maps.refresh();
}
```

## Events

The Maps component provides comprehensive event handling:

### load

Triggered before rendering:

```typescript
@Component({
  template: `
    <ejs-maps (load)='onLoad($event)'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  onLoad(args: any) {
    console.log('Map is loading...');
    // Modify map settings before render
  }
}
```

### loaded

Triggered after rendering completes:

```typescript
onLoaded(args: any) {
  console.log('Map loaded successfully');
}
```

### click

Triggered on map click:

```typescript
@Component({
  template: `
    <ejs-maps (click)='onClick($event)'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  onClick(args: any) {
    console.log('Clicked at:', args.latitude, args.longitude);
    console.log('Target:', args.target);
  }
}
```

### shapeSelected / markerClick / bubbleClick

Handle element-specific interactions:

```typescript
@Component({
  template: `
    <ejs-maps 
      (shapeSelected)='onShapeSelected($event)'
      (markerClick)='onMarkerClick($event)'
      (bubbleClick)='onBubbleClick($event)'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  onShapeSelected(args: any) {
    console.log('Shape selected:', args.data);
  }
  
  onMarkerClick(args: any) {
    console.log('Marker clicked:', args.data);
  }
  
  onBubbleClick(args: any) {
    console.log('Bubble clicked:', args.data);
  }
}
```

### Zoom Events

```typescript
@Component({
  template: `
    <ejs-maps 
      (zoom)='onZoom($event)'
      (pan)='onPan($event)'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  onZoom(args: any) {
    console.log('Zoom level:', args.scale);
    console.log('Type:', args.type);  // 'ZoomIn', 'ZoomOut', 'Reset'
  }
  
  onPan(args: any) {
    console.log('Pan to:', args.x, args.y);
  }
}
```

## Creating Routes Between Markers

Draw navigation routes connecting multiple markers:

```typescript
import { Component } from '@angular/core';
import { MapsModule, MarkerService, NavigationLineService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService, NavigationLineService],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [markerSettings]='markerSettings'
          [navigationLineSettings]='navigationLineSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  // Cities to connect
  public cities = [
    { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { name: 'London', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 }
  ];
  
  // Markers for cities
  public markerSettings: object[] = [{
    visible: true,
    shape: 'Circle',
    fill: '#FF6347',
    height: 15,
    width: 15,
    dataSource: this.cities
  }];
  
  // Routes between cities
  public navigationLineSettings: object[] = [
    // New York to London
    {
      visible: true,
      latitude: [40.7128, 51.5074],
      longitude: [-74.0060, -0.1278],
      color: '#4169E1',
      width: 3,
      angle: -0.2,
      showArrow: true,
      arrowSettings: {
        showArrow: true,
        position: 'End',
        size: 10
      }
    },
    // London to Tokyo
    {
      visible: true,
      latitude: [51.5074, 35.6762],
      longitude: [-0.1278, 139.6503],
      color: '#FF6347',
      width: 3,
      angle: 0.2,
      showArrow: true,
      arrowSettings: {
        showArrow: true,
        position: 'End',
        size: 10
      }
    }
  ];
}
```

### Curved Routes

Create curved paths using angle property:

```typescript
public navigationLineSettings: object[] = [{
  visible: true,
  latitude: [startLat, endLat],
  longitude: [startLng, endLng],
  angle: -0.5,  // Negative = curve upward, Positive = curve downward
  dashArray: '5,5',  // Dashed line
  color: '#4169E1',
  width: 4
}];
```

## Custom Path Rendering

Draw custom paths on the map:

```typescript
import { Component } from '@angular/core';
import { MapsModule, NavigationLineService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [NavigationLineService],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [navigationLineSettings]='navigationLineSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  // Multi-point path
  public navigationLineSettings: object[] = [{
    visible: true,
    latitude: [40.7128, 48.8566, 51.5074, 35.6762],
    longitude: [-74.0060, 2.3522, -0.1278, 139.6503],
    color: '#FF6347',
    width: 3,
    dashArray: '10,5',
    selectionSettings: {
      enable: true,
      fill: '#FFD700',
      border: { color: '#000000', width: 3 }
    }
  }];
}
```

## Drilldown Navigation

Navigate from world map → country map → state map:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';
import { usa_map } from './usa-map';
import { california_map } from './california-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <div>
      <button (click)='goToWorld()'>World</button>
      <button (click)='goToUSA()'>USA</button>
      <button (click)='goToCalifornia()'>California</button>
    </div>
    
    <ejs-maps 
      id='maps-container'
      [baseLayerIndex]='baseLayerIndex'
      (shapeSelected)='onShapeSelected($event)'>
      <e-layers>
        <!-- Layer 0: World -->
        <e-layer 
          [shapeData]='worldMap'
          [selectionSettings]='selectionSettings'>
        </e-layer>
        
        <!-- Layer 1: USA -->
        <e-layer 
          [shapeData]='usaMap'
          [selectionSettings]='selectionSettings'>
        </e-layer>
        
        <!-- Layer 2: California -->
        <e-layer [shapeData]='californiaMap'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };;
  public usaMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/usa.json' } };;
  public californiaMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/california.json' } };;
  
  public baseLayerIndex: number = 0;  // Start with world map
  
  public selectionSettings: object = {
    enable: true,
    fill: '#4CAF50',
    opacity: 1
  };
  
  onShapeSelected(args: any) {
    // Automatic drilldown on shape click
    if (this.baseLayerIndex === 0 && args.data && args.data.name === 'United States') {
      this.baseLayerIndex = 1;  // Go to USA map
    } else if (this.baseLayerIndex === 1 && args.data && args.data.name === 'California') {
      this.baseLayerIndex = 2;  // Go to California map
    }
  }
  
  goToWorld() {
    this.baseLayerIndex = 0;
  }
  
  goToUSA() {
    this.baseLayerIndex = 1;
  }
  
  goToCalifornia() {
    this.baseLayerIndex = 2;
  }
}
```

### Breadcrumb Navigation

Implement breadcrumb for drilldown:

```typescript
export class AppComponent {
  public breadcrumb: string[] = ['World'];
  public baseLayerIndex: number = 0;
  
  onShapeSelected(args: any) {
    if (this.baseLayerIndex === 0 && args.data.name === 'United States') {
      this.baseLayerIndex = 1;
      this.breadcrumb = ['World', 'USA'];
    }
  }
  
  navigateToBreadcrumb(index: number) {
    this.baseLayerIndex = index;
    this.breadcrumb = this.breadcrumb.slice(0, index + 1);
  }
}
```

## Best Practices

### 1. Export Configuration

```typescript
// ✅ Good: Provide export options
exportWithOptions() {
  const fileName = `map-export-${Date.now()}`;
  this.maps.export('PNG', fileName);
}
```

### 2. Event Handling Performance

```typescript
// ✅ Good: Debounce frequent events
import { debounce } from 'lodash';

constructor() {
  this.debouncedZoom = debounce(this.onZoom.bind(this), 300);
}

onZoom(args: any) {
  // Handle zoom
}
```

### 3. State Persistence

```typescript
// ✅ Good: Clear old state when needed
clearPersistedState() {
  localStorage.removeItem('maps-container');
  window.location.reload();
}
```

### 4. Navigation Lines

```typescript
// ✅ Good: Limit navigation lines
if (routes.length > 100) {
  routes = routes.slice(0, 100);  // Limit for performance
}
```

### 5. Drilldown Management

```typescript
// ✅ Good: Track navigation history
export class AppComponent {
  private history: number[] = [0];
  
  drillDown(layerIndex: number) {
    this.history.push(layerIndex);
    this.baseLayerIndex = layerIndex;
  }
  
  drillUp() {
    if (this.history.length > 1) {
      this.history.pop();
      this.baseLayerIndex = this.history[this.history.length - 1];
    }
  }
}
```

## Common Patterns

### Pattern 1: Export Dashboard

```typescript
exportDashboard() {
  // Export as multiple formats
  Promise.all([
    this.maps.export('PNG', 'map'),
    this.maps.export('PDF', 'map-report', 'Portrait')
  ]).then(() => {
    console.log('Export complete');
  });
}
```

### Pattern 2: Interactive Routes

```typescript
public routes: any[] = [];

addRoute(start: any, end: any) {
  this.routes.push({
    visible: true,
    latitude: [start.lat, end.lat],
    longitude: [start.lng, end.lng],
    color: this.getRouteColor(),
    showArrow: true
  });
  this.maps.refresh();
}

clearRoutes() {
  this.routes = [];
  this.maps.refresh();
}
```

### Pattern 3: Hierarchical Drilldown

```typescript
export class AppComponent {
  private layers = [
    { name: 'World', data: world_map },
    { name: 'North America', data: north_america_map },
    { name: 'USA', data: usa_map },
    { name: 'California', data: california_map }
  ];
  
  drillToLayer(layerName: string) {
    const index = this.layers.findIndex(l => l.name === layerName);
    if (index >= 0) {
      this.baseLayerIndex = index;
    }
  }
}
```

## Next Steps

- **[User Interactions](user-interactions.md)** - Zoom, pan, and selection
- **[Markers](markers.md)** - Learn about marker drag and drop
- **[Customization](customization.md)** - Style your maps
- **[Getting Started](getting-started.md)** - Review basics

---

## API Reference Summary

### Advanced APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `projectionType` | Map projection type | [projectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#projectiontype) |
| `centerPosition` | Map center point | [centerPosition](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#centerposition) |
| `print()` | Print map | [print](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#print) |
| `export()` | Export map (Image/PDF) | [export](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#export) |
| `refresh()` | Refresh map | [refresh](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#refresh) |
| `addLayer()` | Add layer dynamically | [addlayer](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#addlayer) |

### Render Events

| Event | Description | Documentation Link |
|-------|-------------|-------------------|
| `layerRendering` | Fires before layer renders | [layerRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#layerrendering) |
| `shapeRendering` | Fires before shape renders | [shapeRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#shaperendering) |
| `beforePrint` | Fires before print | [beforePrint](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#beforeprint) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)