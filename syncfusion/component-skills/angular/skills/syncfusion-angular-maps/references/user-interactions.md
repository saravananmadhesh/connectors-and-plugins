# User Interactions in Angular Maps

Master user interaction techniques in Syncfusion Angular Maps to create engaging, interactive geographic visualizations. This comprehensive guide covers zooming, panning, selection, highlighting, tooltips, and event handling.

## Table of Contents

- [Zooming](#zooming)
  - [Enabling Zoom Features](#enabling-zoom-features)
  - [Zoom Types](#zoom-types)
  - [Zoom Toolbar Configuration](#zoom-toolbar-configuration)
  - [Zoom Limits and Animation](#zoom-limits-and-animation)
- [Panning](#panning)
  - [Enabling Panning](#enabling-panning)
  - [Pan with Zoom](#pan-with-zoom)
- [Selection](#selection)
  - [Shape Selection](#shape-selection)
  - [Bubble and Marker Selection](#bubble-and-marker-selection)
  - [Polygon Selection](#polygon-selection)
  - [Multi-Select](#multi-select)
- [Highlighting](#highlighting)
  - [Shape Highlighting](#shape-highlighting)
  - [Interactive Elements](#interactive-elements)
- [Tooltips](#tooltips)
  - [Layer Tooltips](#layer-tooltips)
  - [Tooltip Customization](#tooltip-customization)
  - [Tooltip Templates](#tooltip-templates)
- [Events](#events)
  - [User Action Events](#user-action-events)
  - [Rendering Events](#rendering-events)
  - [Lifecycle Events](#lifecycle-events)

---

## Zooming

Zooming enables users to focus on specific map regions for detailed analysis. The Maps component supports multiple zoom interaction methods.

### Enabling Zoom Features

Enable basic zooming functionality:

```typescript
import { Component } from '@angular/core';
import { MapsModule, ZoomService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [ZoomService],
  template: `
    <ejs-maps [zoomSettings]="zoomSettings">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public zoomSettings: object = {
    enable: true,
    enablePanning: true,
    zoomFactor: 1,  // Initial zoom level
    maxZoom: 20,     // Maximum zoom level
    minZoom: 1       // Minimum zoom level
  };
}
```

### Zoom Types

Configure different zoom interaction methods:

**Mouse Wheel Zooming:**

```typescript
public zoomSettings: object = {
  enable: true,
  mouseWheelZoom: true,  // Enable scroll wheel zoom
  enablePanning: true
};
```

**Pinch Zooming (Touch Devices):**

```typescript
public zoomSettings: object = {
  enable: true,
  pinchZooming: true,  // Enable pinch-to-zoom on touch devices
  enablePanning: true
};
```

**Double-Click Zooming:**

```typescript
public zoomSettings: object = {
  enable: true,
  doubleClickZoom: true,  // Zoom in on double click
  enablePanning: true
};
```

**Single-Click Zooming:**

```typescript
public zoomSettings: object = {
  enable: true,
  zoomOnClick: true,  // Zoom in on single click
  enablePanning: true
};
```

**Selection Zooming (Rectangle Selection):**

```typescript
public zoomSettings: object = {
  enable: true,
  enableSelectionZooming: true,  // Draw rectangle to zoom
  enablePanning: false  // Must be false for selection zooming
};
```

### Zoom Toolbar Configuration

Add a zoom toolbar with interactive controls:

```typescript
public zoomSettings: object = {
  enable: true,
  enablePanning: true,
  toolbarSettings: {
    buttonSettings: {
      toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
    }
  }
};
```

**Available Toolbar Items:**
- **Zoom**: Enable rectangular selection zoom
- **ZoomIn**: Zoom in by one level
- **ZoomOut**: Zoom out by one level
- **Pan**: Enable panning mode
- **Reset**: Reset to initial zoom level

**Customize Toolbar Appearance:**

```typescript
public zoomSettings: object = {
  enable: true,
  toolbarSettings: {
    backgroundColor: '#FFFFFF',
    borderColor: '#1976D2',
    borderWidth: 1,
    borderOpacity: 1,
    horizontalAlignment: 'Far',  // 'Near', 'Center', 'Far'
    verticalAlignment: 'Near',   // 'Near', 'Center', 'Far'
    orientation: 'Horizontal',   // 'Horizontal' or 'Vertical'
    buttonSettings: {
      toolbarItems: ['ZoomIn', 'ZoomOut', 'Reset'],
      fill: '#E3F2FD',
      color: '#1976D2',
      borderColor: '#1976D2',
      borderWidth: 1,
      borderOpacity: 1,
      radius: 30,
      selectionColor: '#0D47A1',
      highlightColor: '#64B5F6',
      padding: 5,
      opacity: 1
    }
  }
};
```

**Customize Toolbar Tooltips:**

```typescript
public zoomSettings: object = {
  enable: true,
  toolbarSettings: {
    buttonSettings: {
      toolbarItems: ['ZoomIn', 'ZoomOut', 'Reset']
    },
    tooltipSettings: {
      visible: true,
      fill: '#212121',
      borderColor: '#424242',
      borderWidth: 1,
      borderOpacity: 1,
      fontColor: '#FFFFFF',
      fontFamily: 'Segoe UI',
      fontSize: '12px',
      fontStyle: 'Normal',
      fontWeight: 'Normal',
      fontOpacity: 1
    }
  }
};
```

### Zoom Limits and Animation

Control zoom behavior with limits and animations:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [ZoomService],
  template: `
    <ejs-maps [zoomSettings]="zoomSettings">
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [animationDuration]="animationDuration">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public zoomSettings: object = {
    enable: true,
    minZoom: 2,      // Minimum zoom level
    maxZoom: 15,     // Maximum zoom level
    zoomFactor: 3,   // Initial zoom level
    mouseWheelZoom: true,
    enablePanning: true
  };
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public animationDuration: number = 500;  // Zoom animation duration in ms
}
```

### Center Position Zooming

Zoom to a specific geographic location:

```typescript
import { Component, ViewChild } from '@angular/core';
import { MapsComponent } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [ZoomService],
  template: `
    <ejs-maps 
      #maps
      [centerPosition]="centerPosition"
      [zoomSettings]="zoomSettings">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
    
    <button (click)="zoomToLocation()">Zoom to New York</button>
  `
})
export class AppComponent {
  @ViewChild('maps') public mapObj!: MapsComponent;
  
  public centerPosition: object = {
    latitude: 40.7128,   // Center latitude
    longitude: -74.0060  // Center longitude
  };

  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public zoomSettings: object = {
    enable: true,
    zoomFactor: 8,
    enablePanning: true
  };
  
  public zoomToLocation(): void {
    this.mapObj.centerPosition = { latitude: 40.7128, longitude: -74.0060 };
    this.mapObj.zoomSettings.zoomFactor = 10;
    this.mapObj.refresh();
  }
}
```

---

## Panning

Panning allows users to navigate across the map by dragging.

### Enabling Panning

Enable panning with zoom functionality:

```typescript
public zoomSettings: object = {
  enable: true,
  enablePanning: true,  // Enable map panning
  mouseWheelZoom: true
};
```

### Pan with Zoom

Combine panning with various zoom modes:

```typescript
public zoomSettings: object = {
  enable: true,
  enablePanning: true,
  mouseWheelZoom: true,
  doubleClickZoom: true,
  pinchZooming: true,
  toolbarSettings: {
    buttonSettings: {
      toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
    }
  }
};
```

**Programmatic Panning:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { MapsComponent } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps #maps [zoomSettings]="zoomSettings">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
    
    <button (click)="panToCenter()">Pan to Center</button>
  `
})
export class AppComponent {
  @ViewChild('maps') public mapObj!: MapsComponent;
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public panToCenter(): void {
    this.mapObj.centerPosition = { latitude: 0, longitude: 0 };
    this.mapObj.refresh();
  }
}
```

---

## Selection

Selection allows users to interact with and highlight specific map elements.

### Shape Selection

Enable selection for map shapes:

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
        <e-layer 
          [shapeData]="worldMap"
          [selectionSettings]="selectionSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public selectionSettings: object = {
    enable: true,
    fill: '#FF5722',
    opacity: 1,
    border: {
      color: '#D84315',
      width: 2,
      opacity: 1
    },
    enableMultiSelect: false  // Single selection by default
  };
}
```

### Multi-Select

Enable selection of multiple shapes:

```typescript
public selectionSettings: object = {
  enable: true,
  fill: '#FF5722',
  enableMultiSelect: true  // Allow multiple selections
};
```

### Bubble and Marker Selection

Enable selection for bubbles:

```typescript
public bubbleSettings: object[] = [{
  visible: true,
  dataSource: this.populationData,
  valuePath: 'population',
  selectionSettings: {
    enable: true,
    fill: '#FFEB3B',
    opacity: 1,
    border: { color: '#FBC02D', width: 2 }
  }
}];
```

Enable selection for markers:

```typescript
import { Component } from '@angular/core';
import { MarkerService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [markerSettings]="markerSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public markerSettings: object[] = [{
    visible: true,
    dataSource: [
      { latitude: 40.7128, longitude: -74.0060, name: 'New York' },
      { latitude: 51.5074, longitude: -0.1278, name: 'London' }
    ],
    selectionSettings: {
      enable: true,
      fill: '#4CAF50',
      opacity: 1,
      border: { color: '#2E7D32', width: 2 }
    }
  }];
}
```

### Polygon Selection

Enable selection for polygon shapes:

```typescript
import { Component } from '@angular/core';
import { PolygonService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  providers: [PolygonService],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [polygonSettings]="polygonSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public polygonSettings: object = {
    polygons: [{
      points: [
        { latitude: 40.7128, longitude: -74.0060 },
        { latitude: 41.8781, longitude: -87.6298 },
        { latitude: 34.0522, longitude: -118.2437 }
      ],
      fill: '#E3F2FD',
      opacity: 0.7,
      selectionSettings: {
        enable: true,
        enableMultiSelect: true,
        fill: '#1976D2',
        opacity: 0.8,
        border: { color: '#0D47A1', width: 2 }
      }
    }]
  };
}
```

### Initial Shape Selection

Pre-select shapes when the map loads:

```typescript
public initialShapeSelection: object[] = [
  {
    shapePath: 'name',
    shapeValue: 'United States'
  },
  {
    shapePath: 'name',
    shapeValue: 'Canada'
  }
];
```

### Initial Marker Selection

Pre-select markers when the map loads:

```typescript
public initialMarkerSelection: object[] = [
  {
    latitude: 40.7128,
    longitude: -74.0060
  },
  {
    latitude: 51.5074,
    longitude: -0.1278
  }
];
```

### Programmatic Selection

Programmatically select shapes using public methods:

```typescript
import { Component, ViewChild } from '@angular/core';
import { MapsComponent } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps #maps>
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [selectionSettings]="selectionSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
    
    <button (click)="selectShape()">Select USA</button>
  `
})
export class AppComponent {
  @ViewChild('maps') public mapObj!: MapsComponent;
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public selectionSettings: object = {
    enable: true,
    fill: '#FF5722'
  };
  
  public selectShape(): void {
    // Parameters: layerIndex, propertyName, propertyValue, selected
    this.mapObj.shapeSelection(0, 'name', 'United States', true);
  }
}
```

---

## Highlighting

Highlighting provides visual feedback when users hover over map elements.

### Shape Highlighting

Enable highlighting for map shapes:

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
          [highlightSettings]="highlightSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public highlightSettings: object = {
    enable: true,
    fill: '#64B5F6',
    opacity: 0.7,
    border: {
      color: '#1976D2',
      width: 2,
      opacity: 1
    }
  };
}
```

### Interactive Elements

Enable highlighting for bubbles, markers, and polygons:

**Bubble Highlighting:**

```typescript
public bubbleSettings: object[] = [{
  visible: true,
  dataSource: this.populationData,
  valuePath: 'population',
  highlightSettings: {
    enable: true,
    fill: '#FFC107',
    opacity: 0.8,
    border: { color: '#FF8F00', width: 2 }
  }
}];
```

**Marker Highlighting:**

```typescript
import { Component } from '@angular/core';
import { MarkerService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  providers: [MarkerService],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [markerSettings]="markerSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public markerSettings: object[] = [{
    visible: true,
    dataSource: this.cities,
    highlightSettings: {
      enable: true,
      fill: '#E91E63',
      opacity: 1,
      border: { color: '#C2185B', width: 2 }
    }
  }];
}
```

**Polygon Highlighting:**

```typescript
import { Component } from '@angular/core';
import { PolygonService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  providers: [PolygonService],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [polygonSettings]="polygonSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public polygonSettings: object = {
    polygons: [{
      points: this.polygonCoordinates,
      highlightSettings: {
        enable: true,
        fill: '#9C27B0',
        opacity: 0.6,
        border: { color: '#6A1B9A', width: 2 }
      }
    }]
  };
}
```

---

## Tooltips

Tooltips display additional information when users hover over or touch map elements.

### Layer Tooltips

Enable tooltips for map shapes:

```typescript
import { Component } from '@angular/core';
import { MapsTooltipService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MapsTooltipService],
  template: `
    <ejs-maps [tooltipDisplayMode]="tooltipDisplayMode">
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [dataSource]="populationData"
          shapePropertyPath="name"
          shapeDataPath="country"
          [tooltipSettings]="tooltipSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public populationData: object[] = [
    { country: 'United States', population: 331000000 },
    { country: 'China', population: 1440000000 }
  ];
  
  public tooltipDisplayMode: string = 'MouseMove';  // 'MouseMove', 'Click', 'DoubleClick'
  
  public tooltipSettings: object = {
    visible: true,
    valuePath: 'country',
    format: '${country}: ${population} people'
  };
}
```

### Tooltip Customization

Customize tooltip appearance:

```typescript
public tooltipSettings: object = {
  visible: true,
  valuePath: 'name',
  fill: '#212121',
  border: {
    color: '#424242',
    width: 1,
    opacity: 1
  },
  textStyle: {
    fontFamily: 'Segoe UI',
    size: '13px',
    fontWeight: 'Normal',
    color: '#FFFFFF',
    opacity: 1
  },
  format: '<b>${name}</b><br>Population: ${population}'
};
```

### Tooltip Templates

Use custom HTML templates for rich tooltip content:

```typescript
import { Component } from '@angular/core';
import { MapsTooltipService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MapsTooltipService],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [dataSource]="countryData"
          [tooltipSettings]="tooltipSettings">
          <ng-template #tooltipTemplate let-data>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        padding: 15px; 
                        border-radius: 8px; 
                        color: white; 
                        box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
              <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">
                {{data.name}}
              </div>
              <div style="font-size: 12px; opacity: 0.9;">
                <div>Population: {{data.population | number}}</div>
                <div>GDP: ${{data.gdp}}T</div>
                <div>Capital: {{data.capital}}</div>
              </div>
            </div>
          </ng-template>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public tooltipSettings: object = {
    visible: true,
    template: '#tooltipTemplate'
  };
}
```

### Tooltip Duration (Mobile)

Control tooltip display duration on mobile devices:

```typescript
public tooltipSettings: object = {
  visible: true,
  valuePath: 'name',
  duration: 3000  // Display for 3 seconds (0 = infinite)
};
```

### Marker and Bubble Tooltips

Enable tooltips for markers and bubbles:

```typescript
// Marker tooltip
public markerSettings: object[] = [{
  visible: true,
  dataSource: this.cities,
  tooltipSettings: {
    visible: true,
    valuePath: 'name',
    template: '<div><b>${name}</b><br>Lat: ${latitude}<br>Lng: ${longitude}</div>'
  }
}];

// Bubble tooltip
public bubbleSettings: object[] = [{
  visible: true,
  dataSource: this.populationData,
  valuePath: 'population',
  tooltipSettings: {
    visible: true,
    valuePath: 'country',
    format: '${country}: ${population}'
  }
}];
```

---

## Events

Handle user interactions and lifecycle events to create dynamic map experiences.

### User Action Events

**Click Event:**

```typescript
import { Component } from '@angular/core';
import { IMouseEventArgs } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps (click)="onMapClick($event)">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public onMapClick(args: IMouseEventArgs): void {
    console.log('Map clicked at:', args.x, args.y);
    console.log('Target:', args.target);
  }
}
```

**Double Click Event:**

```typescript
public onDoubleClick(args: IMouseEventArgs): void {
  console.log('Map double-clicked');
  // Implement custom double-click behavior
}
```

**Right Click Event:**

```typescript
public onRightClick(args: IMouseEventArgs): void {
  console.log('Right-clicked on map');
  args.cancel = true;  // Prevent default context menu
  // Show custom context menu
}
```

**Shape Selected Event:**

```typescript
import { IShapeSelectedEventArgs } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps (shapeSelected)="onShapeSelected($event)">
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [selectionSettings]="selectionSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public onShapeSelected(args: IShapeSelectedEventArgs): void {
    console.log('Shape selected:', args.data);
    console.log('Shape name:', args.shapeName);
    console.log('Layer index:', args.layerIndex);
  }
}
```

**Item Highlight Event:**

```typescript
import { ISelectionEventArgs } from '@syncfusion/ej2-angular-maps';

public onItemHighlight(args: ISelectionEventArgs): void {
  console.log('Item highlighted:', args.data);
  // Customize highlight behavior
}
```

**Item Selection Event:**

```typescript
public onItemSelection(args: ISelectionEventArgs): void {
  console.log('Item selected:', args.data);
  console.log('Is selected:', args.isSelected);
  // Custom selection handling
}
```

**Marker Click Event:**

```typescript
import { IMarkerClickEventArgs } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps (markerClick)="onMarkerClick($event)">
      <e-layers>
        <e-layer [shapeData]="worldMap" [markerSettings]="markerSettings"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public onMarkerClick(args: IMarkerClickEventArgs): void {
    console.log('Marker clicked:', args.data);
    console.log('Marker index:', args.markerIndex);
  }
}
```

**Bubble Click Event:**

```typescript
import { IBubbleClickEventArgs } from '@syncfusion/ej2-angular-maps';

public onBubbleClick(args: IBubbleClickEventArgs): void {
  console.log('Bubble clicked:', args.data);
  console.log('Bubble value:', args.value);
}
```

### Rendering Events

**Shape Rendering Event:**

```typescript
import { IShapeRenderingEventArgs } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps (shapeRendering)="onShapeRendering($event)">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public onShapeRendering(args: IShapeRenderingEventArgs): void {
    // Customize shape appearance during rendering
    if (args.data['name'] === 'United States') {
      args.fill = '#FF5722';
    }
  }
}
```

**Marker Rendering Event:**

```typescript
import { IMarkerRenderingEventArgs } from '@syncfusion/ej2-angular-maps';

public onMarkerRendering(args: IMarkerRenderingEventArgs): void {
  // Customize marker appearance
  if (args.data['population'] > 10000000) {
    args.fill = '#F44336';
    args.height = 20;
    args.width = 20;
  }
}
```

**Bubble Rendering Event:**

```typescript
import { IBubbleRenderingEventArgs } from '@syncfusion/ej2-angular-maps';

public onBubbleRendering(args: IBubbleRenderingEventArgs): void {
  // Customize bubble appearance
  if (args.data['value'] > 1000000) {
    args.fill = '#4CAF50';
  }
}
```

**Legend Rendering Event:**

```typescript
import { ILegendRenderingEventArgs } from '@syncfusion/ej2-angular-maps';

public onLegendRendering(args: ILegendRenderingEventArgs): void {
  // Customize legend items
  args.fill = '#' + Math.floor(Math.random() * 16777215).toString(16);
}
```

**Data Label Rendering Event:**

```typescript
import { ILabelRenderingEventArgs } from '@syncfusion/ej2-angular-maps';

public onDataLabelRendering(args: ILabelRenderingEventArgs): void {
  // Customize data labels
  if (args.text.length > 10) {
    args.text = args.text.substring(0, 10) + '...';
  }
}
```

### Lifecycle Events

**Load Event:**

```typescript
import { ILoadEventArgs } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps (load)="onLoad($event)">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public onLoad(args: ILoadEventArgs): void {
    console.log('Maps component loading');
    // Perform initialization tasks
  }
}
```

**Loaded Event:**

```typescript
import { ILoadedEventArgs } from '@syncfusion/ej2-angular-maps';

public onLoaded(args: ILoadedEventArgs): void {
  console.log('Maps component loaded');
  // Component is fully rendered and ready
}
```

**Zoom Event:**

```typescript
import { IMapZoomEventArgs } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps 
      (zoom)="onZoom($event)"
      [zoomSettings]="zoomSettings">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public onZoom(args: IMapZoomEventArgs): void {
    console.log('Zoom level:', args.scale);
    console.log('Type:', args.type);  // 'ZoomIn' or 'ZoomOut'
  }
}
```

**Pan Event:**

```typescript
import { IMapPanEventArgs } from '@syncfusion/ej2-angular-maps';

public onPan(args: IMapPanEventArgs): void {
  console.log('Panning to:', args.x, args.y);
}
```

**Resize Event:**

```typescript
import { IResizeEventArgs } from '@syncfusion/ej2-angular-maps';

public onResize(args: IResizeEventArgs): void {
  console.log('Map resized:', args.currentSize);
}
```

**Tooltip Render Event:**

```typescript
import { ITooltipRenderEventArgs } from '@syncfusion/ej2-angular-maps';

public onTooltipRender(args: ITooltipRenderEventArgs): void {
  // Customize tooltip content before rendering
  args.content = '<b>' + args.content + '</b>';
}
```

**Animation Complete Event:**

```typescript
import { IAnimationCompleteEventArgs } from '@syncfusion/ej2-angular-maps';

public onAnimationComplete(args: IAnimationCompleteEventArgs): void {
  console.log('Animation completed');
  // Perform post-animation tasks
}
```

---

## Best Practices

### User Experience

1. **Enable Multiple Zoom Methods**: Provide mouse wheel, toolbar, and double-click zooming for flexibility
2. **Add Visual Feedback**: Use highlighting to provide immediate feedback on hover
3. **Configure Appropriate Zoom Limits**: Set reasonable minZoom and maxZoom values to prevent confusion
4. **Enable Tooltips**: Always provide tooltips with meaningful information
5. **Use Smooth Animations**: Set animationDuration to 300-500ms for smooth interactions

### Performance Optimization

1. **Throttle Event Handlers**: Debounce or throttle high-frequency events like mouse move
2. **Limit Selection Elements**: Avoid enabling selection on too many elements simultaneously
3. **Use Event Delegation**: Handle events at the layer level rather than individual shapes when possible
4. **Optimize Tooltip Content**: Keep tooltip content lightweight for fast rendering
5. **Cache Event Data**: Store frequently accessed event data to avoid repeated calculations

### Accessibility

1. **Provide Keyboard Navigation**: Enable zoom with +/- keys and panning with arrow keys
2. **Add ARIA Labels**: Include descriptive ARIA labels for interactive elements
3. **Support Screen Readers**: Ensure tooltips and labels are screen reader friendly
4. **Maintain Focus Management**: Implement proper focus handling for keyboard navigation
5. **Use High Contrast Colors**: Ensure selection and highlight colors have sufficient contrast

### Mobile Optimization

1. **Enable Touch Interactions**: Always enable pinchZooming for touch devices
2. **Increase Touch Targets**: Make interactive elements large enough for touch (minimum 44x44px)
3. **Optimize Tooltip Duration**: Set appropriate tooltip duration for mobile displays
4. **Test on Multiple Devices**: Verify interactions work on various screen sizes
5. **Reduce Visual Complexity**: Simplify visualizations for smaller screens

---

## Common Patterns

### Interactive Dashboard Map

```typescript
export class InteractiveDashboardComponent {
  public zoomSettings: object = {
    enable: true,
    enablePanning: true,
    mouseWheelZoom: true,
    doubleClickZoom: true,
    toolbarSettings: {
      buttonSettings: {
        toolbarItems: ['ZoomIn', 'ZoomOut', 'Reset']
      }
    }
  };
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public selectionSettings: object = {
    enable: true,
    enableMultiSelect: true,
    fill: '#FF5722'
  };
  
  public highlightSettings: object = {
    enable: true,
    fill: '#64B5F6'
  };
  
  public tooltipSettings: object = {
    visible: true,
    template: '#customTooltip'
  };
  
  public onShapeSelected(args: IShapeSelectedEventArgs): void {
    // Load detailed data for selected region
    this.loadRegionData(args.shapeName);
  }
}
```

### Drill-Down Interaction

```typescript
export class DrillDownMapComponent {
  public currentLevel: string = 'world';
  
  public onShapeClick(args: IMouseEventArgs): void {
    if (this.currentLevel === 'world') {
      // Drill down to country level
      this.loadCountryData(args.target);
      this.currentLevel = 'country';
    } else if (this.currentLevel === 'country') {
      // Drill down to state level
      this.loadStateData(args.target);
      this.currentLevel = 'state';
    }
  }
  
  public navigateUp(): void {
    if (this.currentLevel === 'state') {
      this.loadCountryData();
      this.currentLevel = 'country';
    } else if (this.currentLevel === 'country') {
      this.loadWorldData();
      this.currentLevel = 'world';
    }
  }
}
```

### Advanced Zoom Control

```typescript
export class AdvancedZoomComponent {
  @ViewChild('maps') public mapObj!: MapsComponent;
  
  public zoomToRegion(bounds: { north: number; south: number; east: number; west: number }): void {
    const centerLat = (bounds.north + bounds.south) / 2;
    const centerLng = (bounds.east + bounds.west) / 2;
    
    this.mapObj.centerPosition = {
      latitude: centerLat,
      longitude: centerLng
    };
    
    // Calculate appropriate zoom level based on bounds
    const zoomLevel = this.calculateZoomLevel(bounds);
    this.mapObj.zoomSettings.zoomFactor = zoomLevel;
    this.mapObj.refresh();
  }
  
  private calculateZoomLevel(bounds: any): number {
    // Calculate zoom level based on lat/lng bounds
    const latDiff = Math.abs(bounds.north - bounds.south);
    const lngDiff = Math.abs(bounds.east - bounds.west);
    const maxDiff = Math.max(latDiff, lngDiff);
    
    return Math.min(20, Math.max(1, Math.floor(180 / maxDiff)));
  }
}
```

---

## Next Steps

- **[Data Visualization](./data-visualization.md)** - Learn about bubbles, color mapping, and legends
- **[Map Providers](./map-providers.md)** - Integrate online map services
- **[Polygon Shapes](./polygon-shapes.md)** - Draw and customize polygon overlays
- **[Advanced Features](./advanced-features.md)** - Explore print, export, and methods
- **[Accessibility](./accessibility.md)** - Implement accessibility features

For complete API documentation, visit the [Syncfusion Angular Maps API Reference](https://ej2.syncfusion.com/angular/documentation/api/maps/).

---

## API Reference Summary

### Zoom & Pan APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `ZoomSettings` | Zoom configuration model | [ZoomSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings) |
| `enable` | Enable/disable zooming | [enable](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#enable) |
| `zoomFactor` | Zoom level factor | [zoomFactor](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#zoomfactor) |
| `mouseWheelZoom` | Mouse wheel zoom | [mouseWheelZoom](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#mousewheelzoom) |
| `pinchZoom` | Pinch zoom (touch) | [pinchZoom](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#pinchzoom) |
| `toolbars` | Zoom toolbar buttons | [toolbars](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#toolbars) |

### Tooltip & Selection APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `TooltipSettings` | Tooltip configuration | [TooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettings) |
| `SelectionSettings` | Selection configuration | [SelectionSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/selectionSettings) |
| `HighlightSettings` | Highlight configuration | [HighlightSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/highlightSettings) |

### Interaction Events

| Event | Description | Documentation Link |
|-------|-------------|-------------------|
| `click` | Fires on map click | [click](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#click) |
| `doubleClick` | Fires on double-click | [doubleClick](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#doubleclick) |
| `zoom` | Fires during zoom | [zoom](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#zoom) |
| `pan` | Fires during pan | [pan](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#pan) |
| `shapeSelected` | Fires on shape selection | [shapeSelected](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#shapeselected) |
| `tooltipRender` | Fires before tooltip | [tooltipRender](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#tooltiprender) |

**For complete API documentation, see:**[api-reference.md](references/api-reference.md)