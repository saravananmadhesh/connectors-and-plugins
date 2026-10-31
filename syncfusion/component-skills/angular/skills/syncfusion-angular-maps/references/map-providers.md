# Map Providers Integration in Angular Maps

Integrate online map tile services into Syncfusion Angular Maps to display real-world geographic data. This guide covers OpenStreetMap, Bing Maps, Azure Maps, and other third-party providers.

## Table of Contents

- [OpenStreetMap (OSM)](#openstreetmap-osm)
  - [Basic Integration](#basic-integration)
  - [Custom Tile Servers](#custom-tile-servers)
  - [OSM Attribution Requirements](#osm-attribution-requirements)
- [Bing Maps](#bing-maps)
  - [Prerequisites and API Key](#prerequisites-and-api-key)
  - [Adding Bing Maps](#adding-bing-maps)
  - [Bing Map Types](#bing-map-types)
- [Azure Maps](#azure-maps)
  - [Azure Prerequisites](#azure-prerequisites)
  - [Integration Steps](#integration-steps)
  - [Azure Map Styles](#azure-map-styles)
- [Other Map Providers](#other-map-providers)
  - [TomTom Maps](#tomtom-maps)
  - [Custom Providers](#custom-providers)
- [Common Features](#common-features)
  - [Zooming and Panning](#zooming-and-panning)
  - [Markers and Navigation Lines](#markers-and-navigation-lines)
  - [Sublayers](#sublayers)
  - [Legends](#legends)

---

## OpenStreetMap (OSM)

OpenStreetMap is an open-source, community-driven map provider offering free tile services under the Open Database License.

### Basic Integration

Integrate OSM using the `urlTemplate` property:

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
        <e-layer [urlTemplate]="urlTemplate"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  // OpenStreetMap standard tile server
  public urlTemplate: string = 'your URL link';
}
```

**URL Template Placeholders:**
- `{z}` - Zoom level (automatically replaced by Maps)
- `{x}` - Tile X coordinate (automatically replaced by Maps)
- `{y}` - Tile Y coordinate (automatically replaced by Maps)

### Custom Tile Servers

Use alternative OSM tile servers for different styles:

```typescript
export class OsmVariantsComponent {
  // Standard OSM
  public osmStandard: string = 'your URL link';
  
  // OSM Humanitarian style
  public osmHumanitarian: string = 'your URL link';
  
  // OSM Transport
  public osmTransport: string = 'your URL link';
  
  // Current active template
  public urlTemplate: string = this.osmStandard;
  
  public switchStyle(style: string): void {
    switch(style) {
      case 'standard':
        this.urlTemplate = this.osmStandard;
        break;
      case 'humanitarian':
        this.urlTemplate = this.osmHumanitarian;
        break;
      case 'transport':
        this.urlTemplate = this.osmTransport;
        break;
    }
  }
}
```

### OSM Attribution Requirements

OSM requires proper attribution per their license:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <div style="position: relative;">
      <ejs-maps>
        <e-layers>
          <e-layer [urlTemplate]="urlTemplate"></e-layer>
        </e-layers>
      </ejs-maps>
  `
})
export class AppComponent {
  public urlTemplate: string = 'your URL link';
}
```

---

## Bing Maps

Bing Maps is Microsoft's online map service offering satellite imagery, road maps, and hybrid views.

### Prerequisites and API Key

**Requirements:**
1. Microsoft account
2. Bing Maps Dev Center account
3. API key (Basic or Enterprise)

**Obtain a Bing Maps Key:**
1. Visit [Bing Maps Dev Center](https://www.microsoft.com/en-us/maps/create-a-bing-maps-key)
2. Sign in with Microsoft account
3. Create a new key for your application
4. Choose key type (Basic/Enterprise)
5. Copy the generated key

### Adding Bing Maps

Bing Maps requires a special URL conversion using the `getBingUrlTemplate` method:

```typescript
import { Component } from '@angular/core';
import { MapsModule, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps (load)="onLoad($event)">
      <e-layers>
        <e-layer></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public onLoad(args: ILoadEventArgs): void {
    // Replace YOUR_BING_MAPS_KEY with your actual key
    const bingUrl = 'your URL link';
    
    args.maps.getBingUrlTemplate(bingUrl).then((url: string) => {
      args.maps.layers[0].urlTemplate = url;
    });
  }
}
```

### Bing Map Types

Bing Maps supports multiple map visualization styles:

**Available Types:**
- **Aerial**: Satellite imagery
- **AerialWithLabel**: Satellite with labels
- **Road**: Standard road map
- **CanvasDark**: Dark theme roads
- **CanvasLight**: Light theme roads
- **CanvasGray**: Grayscale roads

```typescript
import { Component } from '@angular/core';
import { ILoadEventArgs } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <div>
      <select (change)="changeBingMapType($event.target.value)">
        <option value="Aerial">Aerial</option>
        <option value="AerialWithLabel">Aerial with Labels</option>
        <option value="Road">Road</option>
        <option value="CanvasDark">Canvas Dark</option>
        <option value="CanvasLight" selected>Canvas Light</option>
        <option value="CanvasGray">Canvas Gray</option>
      </select>
      
      <ejs-maps #maps (load)="onLoad($event)">
        <e-layers>
          <e-layer></e-layer>
        </e-layers>
      </ejs-maps>
    </div>
  `
})
export class AppComponent {
  @ViewChild('maps') public mapObj!: MapsComponent;
  private bingApiKey: string = 'YOUR_BING_MAPS_KEY';
  private currentMapType: string = 'CanvasLight';
  
  public onLoad(args: ILoadEventArgs): void {
    this.loadBingMap(args.maps, this.currentMapType);
  }
  
  public changeBingMapType(mapType: string): void {
    this.currentMapType = mapType;
    this.loadBingMap(this.mapObj, mapType);
  }
  
  private loadBingMap(mapsInstance: any, mapType: string): void {
    const bingUrl = 'your URL link';
    
    mapsInstance.getBingUrlTemplate(bingUrl).then((url: string) => {
      mapsInstance.layers[0].urlTemplate = url;
      mapsInstance.refresh();
    });
  }
}
```

---

## Azure Maps

Azure Maps is Microsoft's cloud-based geospatial services platform offering various map styles and global coverage.

### Azure Prerequisites

**Requirements:**
1. Microsoft Azure account
2. Azure Maps account resource
3. Subscription key (Primary or Secondary)

**Obtain Azure Maps Subscription Key:**
1. Sign in to [Azure Portal](https://portal.azure.com)
2. Create an Azure Maps Account resource
3. Navigate to Authentication settings
4. Copy Primary Key or Secondary Key

**Pricing Information:**
- Refer to [Azure Maps Pricing](https://azure.microsoft.com/en-in/pricing/details/azure-maps/)

### Integration Steps

Add Azure Maps using the subscription key:

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
        <e-layer [urlTemplate]="urlTemplate"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  // Replace YOUR_AZURE_MAPS_KEY with your subscription key
  public urlTemplate: string = 'your URL link';
```

### Azure Map Styles

Azure Maps provides multiple pre-defined styles:

```typescript
export class AzureMapStylesComponent {
  private azureKey: string = 'YOUR_AZURE_MAPS_KEY';
  private baseUrl: string = 'your URL link';
  
  // Satellite imagery
  public satelliteStyle: string = 'your URL link';
  
  // Road map style
  public roadStyle: string = 'your URL link';
  
  // Grayscale road map
  public grayscaleStyle: string = 'your URL link';
  
  // Night mode
  public nightStyle: string = 'your URL link';
  
  // Current active style
  public urlTemplate: string = this.satelliteStyle;
}
```

---

## Other Map Providers

Integrate third-party map providers using standard URL templates.

### TomTom Maps

Add TomTom Maps with API key:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer [urlTemplate]="urlTemplate"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  // Replace YOUR_TOMTOM_KEY with your TomTom API key
  public urlTemplate: string = 'your URL link';
}
```

**TomTom Map Styles:**

```typescript
export class TomTomStylesComponent {
  private tomtomKey: string = 'YOUR_TOMTOM_KEY';
  
  // Basic style
  public basic: string = 'your URL link';
  
  // Hybrid (satellite + labels)
  public hybrid: string = 'your URL link';
  
  // Labels only
  public labels: string = 'your URL link';
  
  public urlTemplate: string = this.basic;
}
```

### Custom Providers

Integrate any tile-based map provider using the URL template pattern:

```typescript
export class CustomProviderComponent {
  // Generic template structure
  // Replace with your provider's URL and parameters
  public urlTemplate: string = 'your URL link';
  
  // Example: MapBox (requires API key)
  public mapboxTemplate: string = 'your URL link';
  
  // Example: Stamen Terrain (no key required)
  public stamenTerrain: string = 'your URL link';
  
  // Example: CartoDB Positron (no key required)
  public cartoDBPositron: string = 'your URL link';
}
```

**URL Template Components:**
- **{z}**: Zoom level placeholder
- **{x}**: Tile X coordinate placeholder
- **{y}**: Tile Y coordinate placeholder
- **Auth params**: API keys, tokens, or credentials

---

## Common Features

These features work consistently across all map providers.

### Zooming and Panning

Enable zoom and pan for any tile-based map:

```typescript
import { Component } from '@angular/core';
import { ZoomService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [ZoomService],
  template: `
    <ejs-maps [zoomSettings]="zoomSettings">
      <e-layers>
        <e-layer [urlTemplate]="urlTemplate"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public urlTemplate: string = 'your URL link';
  
  public zoomSettings: object = {
    enable: true,
    enablePanning: true,
    mouseWheelZoom: true,
    doubleClickZoom: true,
    pinchZooming: true,
    zoomFactor: 4,
    minZoom: 1,
    maxZoom: 18,
    toolbarSettings: {
      buttonSettings: {
        toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
      }
    }
  };
}
```

### Markers and Navigation Lines

Add markers and routes on any map provider:

```typescript
import { Component } from '@angular/core';
import { ZoomService, MarkerService, NavigationLine } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [ZoomService, MarkerService, NavigationLine],
  template: `
    <ejs-maps 
      [zoomSettings]="zoomSettings"
      [centerPosition]="centerPosition">
      <e-layers>
        <e-layer 
          [urlTemplate]="urlTemplate"
          [markerSettings]="markerSettings"
          [navigationLineSettings]="navigationLineSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public urlTemplate: string = 'your URL link';
  
  public zoomSettings: object = {
    enable: true,
    zoomFactor: 4
  };
  
  public centerPosition: object = {
    latitude: 39.8283,
    longitude: -98.5795
  };
  
  // Add markers
  public markerSettings: object[] = [{
    visible: true,
    height: 25,
    width: 15,
    dataSource: [
      { latitude: 40.7128, longitude: -74.0060, city: 'New York' },
      { latitude: 34.0522, longitude: -118.2437, city: 'Los Angeles' },
      { latitude: 41.8781, longitude: -87.6298, city: 'Chicago' }
    ],
    tooltipSettings: {
      visible: true,
      valuePath: 'city'
    }
  }];
  
  // Draw navigation lines
  public navigationLineSettings: object[] = [{
    visible: true,
    latitude: [40.7128, 34.0522],
    longitude: [-74.0060, -118.2437],
    color: '#1976D2',
    width: 3,
    angle: 0.5,
    arrowSettings: {
      showArrow: true,
      position: 'End',
      size: 8
    }
  }];
}
```

### Sublayers

Overlay GeoJSON shapes on tile-based maps:

```typescript
import { Component } from '@angular/core';
import { usaMap } from './usa-map';  // Your GeoJSON data

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps [zoomSettings]="zoomSettings">
      <e-layers>
        <!-- Base tile layer -->
        <e-layer [urlTemplate]="urlTemplate"></e-layer>
        
        <!-- GeoJSON sublayer -->
        <e-layer 
          [type]="'SubLayer'"
          [shapeData]="usaMap"
          [shapeSettings]="shapeSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public urlTemplate: string = 'your URL link';
  public usaMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/usa.json' } };
  
  public zoomSettings: object = {
    enable: true,
    zoomFactor: 4
  };
  
  public shapeSettings: object = {
    fill: 'rgba(30, 144, 255, 0.3)',  // Semi-transparent blue
    border: {
      color: '#1E90FF',
      width: 2
    }
  };
}
```

**Multiple Sublayers:**

```typescript
public layers: object[] = [
  // Base map
  {
    urlTemplate: 'your URL link';
  },
  // Country boundaries
  {
    type: 'SubLayer',
    shapeData: this.worldMap,
    shapeSettings: {
      fill: 'transparent',
      border: { color: '#424242', width: 1 }
    }
  },
  // Highlighted regions
  {
    type: 'SubLayer',
    shapeData: this.highlightedRegions,
    shapeSettings: {
      fill: 'rgba(255, 87, 34, 0.4)',
      border: { color: '#FF5722', width: 2 }
    }
  }
];
```

### Legends

Add legends to tile-based maps:

```typescript
import { Component } from '@angular/core';
import { MarkerService, Legend } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MarkerService, Legend],
  template: `
    <ejs-maps [legendSettings]="legendSettings">
      <e-layers>
        <e-layer 
          [urlTemplate]="urlTemplate"
          [markerSettings]="markerSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public urlTemplate: string = 'your URL link';
  
  public legendSettings: object = {
    visible: true,
    type: 'Markers',
    position: 'Bottom',
    alignment: 'Center',
    useMarkerShape: true,
    toggleLegendSettings: {
      enable: true
    }
  };
  
  public markerSettings: object[] = [{
    visible: true,
    dataSource: [
      { latitude: 40.7128, longitude: -74.0060, category: 'Major City', color: '#F44336' },
      { latitude: 41.8781, longitude: -87.6298, category: 'Major City', color: '#F44336' },
      { latitude: 33.4484, longitude: -112.0740, category: 'Regional Hub', color: '#2196F3' }
    ],
    colorValuePath: 'color',
    legendText: 'category'
  }];
}
```

---

## Best Practices

### Provider Selection

1. **Consider Usage Limits**: Check provider's free tier limits and pricing
2. **Evaluate Coverage**: Ensure provider covers your target regions
3. **Check Licensing**: Understand attribution and licensing requirements
4. **Test Performance**: Evaluate tile loading speed for your users
5. **Plan for Fallbacks**: Implement fallback providers in case of service issues

### API Key Management

1. **Secure Key Storage**: Never commit API keys to source control
2. **Use Environment Variables**: Store keys in environment configurations
3. **Implement Key Rotation**: Regularly rotate API keys for security
4. **Monitor Usage**: Track API usage to avoid unexpected charges
5. **Restrict Key Access**: Use domain/IP restrictions when possible

```typescript
// Use environment variables for API keys
import { environment } from '../environments/environment';

export class SecureMapComponent {
  private apiKey: string = environment.mapApiKey;
  
  public urlTemplate: string = 'your URL link';
}
```

### Performance Optimization

1. **Set Appropriate Zoom Limits**: Restrict maxZoom based on tile availability
2. **Cache Tiles Locally**: Enable browser caching for faster loading
3. **Optimize Marker Count**: Limit markers visible at once (use clustering)
4. **Lazy Load Features**: Load additional features only when needed
5. **Minimize Sublayer Complexity**: Keep GeoJSON sublayers simple

### Error Handling

Implement robust error handling for tile loading failures:

```typescript
import { Component, ViewChild } from '@angular/core';
import { MapsComponent } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps 
      #maps
      (load)="onLoad($event)"
      (loadFailed)="onLoadFailed($event)">
      <e-layers>
        <e-layer [urlTemplate]="urlTemplate"></e-layer>
      </e-layers>
    </ejs-maps>
    
    <div *ngIf="errorMessage" class="error-banner">
      {{errorMessage}}
      <button (click)="retry()">Retry</button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('maps') public mapObj!: MapsComponent;
  public errorMessage: string = '';
  public urlTemplate: string = 'your URL link';
  
  public onLoadFailed(args: any): void {
    this.errorMessage = 'Failed to load map tiles. Please check your connection.';
    console.error('Map load error:', args);
  }
  
  public retry(): void {
    this.errorMessage = '';
    this.mapObj.refresh();
  }
}
```

---

## Common Patterns

### Multi-Provider Support

Switch between multiple map providers:

```typescript
export class MultiProviderComponent {
  @ViewChild('maps') public mapObj!: MapsComponent;
  
  public providers: any = {
    osm: 'your URL link',
    bing: null,  // Loaded dynamically
    azure: 'your URL link';
  };
  
  public currentProvider: string = 'osm';
  public urlTemplate: string = this.providers.osm;
  
  public switchProvider(provider: string): void {
    if (provider === 'bing') {
      this.loadBingMaps();
    } else {
      this.currentProvider = provider;
      this.urlTemplate = this.providers[provider];
      this.mapObj.refresh();
    }
  }
  
  private loadBingMaps(): void {
    const bingUrl = 'your URL link';
    
    this.mapObj.getBingUrlTemplate(bingUrl).then((url: string) => {
      this.providers.bing = url;
      this.urlTemplate = url;
      this.currentProvider = 'bing';
      this.mapObj.refresh();
    });
  }
}
```

### Hybrid Visualization

Combine tile maps with custom data overlays:

```typescript
export class HybridMapComponent {
  public urlTemplate: string = 'your URL link';
  
  // Base tile layer with custom data overlay
  public layers: object[] = [
    {
      urlTemplate: this.urlTemplate
    },
    {
      type: 'SubLayer',
      shapeData: this.stateData,
      dataSource: this.electionData,
      shapePropertyPath: 'name',
      shapeDataPath: 'state',
      shapeSettings: {
        colorValuePath: 'result',
        colorMapping: [
          { value: 'Democrat', color: 'rgba(0, 0, 255, 0.3)' },
          { value: 'Republican', color: 'rgba(255, 0, 0, 0.3)' }
        ]
      }
    }
  ];
  
  public markerSettings: object[] = [{
    visible: true,
    dataSource: this.capitalCities,
    shape: 'Diamond',
    fill: '#FFD700'
  }];
}
```

### Progressive Enhancement

Start with basic map, enhance with features:

```typescript
export class ProgressiveMapComponent implements OnInit {
  public urlTemplate: string = 'your URL link';
  public markersLoaded: boolean = false;
  public overlaysLoaded: boolean = false;
  
  ngOnInit(): void {
    // Load base map first
    this.loadBaseMap();
    
    // Load markers after base map
    setTimeout(() => this.loadMarkers(), 1000);
    
    // Load overlays last
    setTimeout(() => this.loadOverlays(), 2000);
  }
  
  private loadBaseMap(): void {
    // Base map already configured
    console.log('Base map loaded');
  }
  
  private loadMarkers(): void {
    this.markerSettings = [{
      visible: true,
      dataSource: this.cityData
    }];
    this.markersLoaded = true;
  }
  
  private loadOverlays(): void {
    this.layers.push({
      type: 'SubLayer',
      shapeData: this.overlayData
    });
    this.overlaysLoaded = true;
  }
}
```

---

For complete API documentation, visit the [Syncfusion Angular Maps API Reference](https://ej2.syncfusion.com/angular/documentation/api/maps/).

---

## API Reference Summary

### Map Provider APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `urlTemplate` | Tile URL template | [urlTemplate](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#urltemplate) |
| `LayerSettings` | Layer configuration | [LayerSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)