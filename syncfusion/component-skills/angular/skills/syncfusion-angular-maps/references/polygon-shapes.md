# Polygon Shapes in Angular Maps

Master polygon overlay features in Syncfusion Angular Maps to highlight custom geographic regions, draw boundaries, and mark zones of interest.

## Overview

Polygons enable custom shape overlays on maps for visualizing coverage zones, territorial boundaries, restricted areas, or any custom geographic regions. Polygons work on both geometry-based maps and online tile maps.

---

## Adding Polygon Shapes

Define polygons using latitude/longitude coordinate arrays:

```typescript
import { Component } from '@angular/core';
import { MapsModule, PolygonService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
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
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } }; // Your GeoJSON data
  
  public polygonSettings: object = {
    polygons: [
      {
        points: [
          { latitude: 40.7128, longitude: -74.0060 },  // New York
          { latitude: 41.8781, longitude: -87.6298 },  // Chicago
          { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
          { latitude: 40.7128, longitude: -74.0060 }   // Close the polygon
        ],
        fill: 'rgba(30, 144, 255, 0.4)',
        opacity: 0.7,
        borderColor: '#1E90FF',
        borderWidth: 2,
        borderOpacity: 1
      }
    ]
  };
}
```

---

## Polygon Customization

### Styling Properties

Customize polygon appearance with fill, border, and opacity settings:

```typescript
public polygonSettings: object = {
  polygons: [
    {
      points: this.triangleCoordinates,
      fill: '#FF5722',           // Fill color
      opacity: 0.6,              // Fill opacity (0-1)
      borderColor: '#D84315',    // Border color
      borderWidth: 3,            // Border width in pixels
      borderOpacity: 1           // Border opacity (0-1)
    }
  ]
};
```

### Multiple Polygons

Add multiple independent polygon shapes:

```typescript
public polygonSettings: object = {
  polygons: [
    // Coverage Zone 1
    {
      points: [
        { latitude: 40.7128, longitude: -74.0060 },
        { latitude: 42.3601, longitude: -71.0589 },
        { latitude: 39.9526, longitude: -75.1652 }
      ],
      fill: 'rgba(76, 175, 80, 0.4)',
      borderColor: '#4CAF50',
      borderWidth: 2
    },
    // Coverage Zone 2
    {
      points: [
        { latitude: 34.0522, longitude: -118.2437 },
        { latitude: 37.7749, longitude: -122.4194 },
        { latitude: 32.7157, longitude: -117.1611 }
      ],
      fill: 'rgba(255, 152, 0, 0.4)',
      borderColor: '#FF9800',
      borderWidth: 2
    },
    // Restricted Zone
    {
      points: [
        { latitude: 41.8781, longitude: -87.6298 },
        { latitude: 43.0389, longitude: -87.9065 },
        { latitude: 42.3314, longitude: -83.0458 }
      ],
      fill: 'rgba(244, 67, 54, 0.4)',
      borderColor: '#F44336',
      borderWidth: 2
    }
  ]
};
```

---

## Polygon Tooltips

Display information when users hover over polygons:

```typescript
import { Component } from '@angular/core';
import { MapsTooltipService, PolygonService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [PolygonService, MapsTooltipService],
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
    polygons: [
      {
        points: this.zoneCoordinates,
        fill: 'rgba(33, 150, 243, 0.4)',
        tooltipText: 'Service Area - Zone A',
        tooltipSettings: {
          visible: true,
          fill: '#212121',
          border: {
            color: '#424242',
            width: 1
          },
          textStyle: {
            color: '#FFFFFF',
            size: '12px',
            fontFamily: 'Segoe UI'
          }
        }
      }
    ]
  };
}
```

### Tooltip Templates

Use custom HTML templates for rich tooltip content:

```typescript
@Component({
  selector: 'app-root',
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [polygonSettings]="polygonSettings">
          <ng-template #polygonTooltip let-data>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 12px;
                        border-radius: 6px;
                        color: white;">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">
                {{data.zoneName}}
              </div>
              <div style="font-size: 11px;">
                <div>Area: {{data.area}} sq km</div>
                <div>Status: {{data.status}}</div>
                <div>Population: {{data.population | number}}</div>
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
  public polygonSettings: object = {
    polygons: [
      {
        points: this.zoneCoordinates,
        tooltipTemplate: '#polygonTooltip',
        tooltipSettings: { visible: true },
        // Data available in template
        zoneName: 'Metropolitan Area',
        area: 450,
        status: 'Active',
        population: 2500000
      }
    ]
  };
}
```

---

## Selection and Highlighting

Enable user interaction with polygons:

### Polygon Selection

Allow users to select polygons:

```typescript
public polygonSettings: object = {
  polygons: [
    {
      points: this.regionCoordinates,
      fill: 'rgba(156, 39, 176, 0.3)',
      selectionSettings: {
        enable: true,
        enableMultiSelect: true,
        fill: 'rgba(156, 39, 176, 0.7)',
        opacity: 0.9,
        border: {
          color: '#9C27B0',
          width: 3,
          opacity: 1
        }
      }
    }
  ]
};
```

### Polygon Highlighting

Provide visual feedback on hover:

```typescript
public polygonSettings: object = {
  polygons: [
    {
      points: this.areaCoordinates,
      fill: 'rgba(255, 193, 7, 0.3)',
      highlightSettings: {
        enable: true,
        fill: 'rgba(255, 193, 7, 0.6)',
        opacity: 0.8,
        border: {
          color: '#FFC107',
          width: 2,
          opacity: 1
        }
      }
    }
  ]
};
```

### Combined Selection and Highlighting

Use both features together for rich interactions:

```typescript
public polygonSettings: object = {
  polygons: [
    {
      points: this.territoryCoordinates,
      fill: 'rgba(0, 150, 136, 0.3)',
      borderColor: '#009688',
      borderWidth: 2,
      // Highlight on hover
      highlightSettings: {
        enable: true,
        fill: 'rgba(0, 150, 136, 0.5)',
        border: { color: '#00796B', width: 2 }
      },
      // Select on click
      selectionSettings: {
        enable: true,
        fill: 'rgba(0, 150, 136, 0.8)',
        border: { color: '#004D40', width: 3 }
      }
    }
  ]
};
```

---

## Use Cases

### Coverage Area Visualization

Display service or network coverage zones:

```typescript
export class CoverageMapComponent {
  public polygonSettings: object = {
    polygons: [
      {
        points: [
          { latitude: 37.7749, longitude: -122.4194 },
          { latitude: 37.8044, longitude: -122.2712 },
          { latitude: 37.3382, longitude: -121.8863 },
          { latitude: 37.3541, longitude: -121.9552 }
        ],
        fill: 'rgba(76, 175, 80, 0.3)',
        borderColor: '#4CAF50',
        borderWidth: 2,
        tooltipText: '5G Coverage Zone - Bay Area',
        tooltipSettings: { visible: true }
      },
      {
        points: [
          { latitude: 34.0522, longitude: -118.2437 },
          { latitude: 34.1478, longitude: -118.1445 },
          { latitude: 33.9425, longitude: -118.4081 },
          { latitude: 33.8121, longitude: -117.9190 }
        ],
        fill: 'rgba(255, 235, 59, 0.3)',
        borderColor: '#FFEB3B',
        borderWidth: 2,
        tooltipText: '4G Coverage Zone - Los Angeles',
        tooltipSettings: { visible: true }
      }
    ]
  };
}
```

### Restricted Zones

Mark no-fly zones, restricted areas, or dangerous regions:

```typescript
export class RestrictedZonesComponent {
  public polygonSettings: object = {
    polygons: [
      {
        points: this.militaryBasePerimeter,
        fill: 'rgba(244, 67, 54, 0.4)',
        borderColor: '#F44336',
        borderWidth: 3,
        tooltipText: 'Restricted Area - No Entry',
        tooltipSettings: {
          visible: true,
          fill: '#C62828',
          textStyle: { color: '#FFFFFF' }
        },
        selectionSettings: {
          enable: false  // Disable selection for restricted zones
        }
      }
    ]
  };
}
```

### Territory Boundaries

Display political or administrative boundaries:

```typescript
export class TerritoryComponent {
  public salesTerritories: any[] = [
    {
      name: 'North Territory',
      points: [/* coordinates */],
      color: '#2196F3',
      manager: 'John Smith',
      revenue: 5600000
    },
    {
      name: 'South Territory',
      points: [/* coordinates */],
      color: '#4CAF50',
      manager: 'Jane Doe',
      revenue: 7200000
    }
  ];
  
  public polygonSettings: object = {
    polygons: this.salesTerritories.map(territory => ({
      points: territory.points,
      fill: `${territory.color}33`, // Add transparency
      borderColor: territory.color,
      borderWidth: 2,
      tooltipText: `${territory.name} - Manager: ${territory.manager}`,
      tooltipSettings: { visible: true }
    }))
  };
}
```

### Delivery Zones

Visualize delivery or service areas:

```typescript
export class DeliveryZonesComponent {
  public polygonSettings: object = {
    polygons: [
      {
        points: this.zone1Coordinates,
        fill: 'rgba(46, 125, 50, 0.3)',
        borderColor: '#2E7D32',
        borderWidth: 2,
        tooltipSettings: {
          visible: true,
          template: '<div><b>Zone 1</b><br>Free delivery<br>15-30 min</div>'
        }
      },
      {
        points: this.zone2Coordinates,
        fill: 'rgba(251, 192, 45, 0.3)',
        borderColor: '#FBC02D',
        borderWidth: 2,
        tooltipSettings: {
          visible: true,
          template: '<div><b>Zone 2</b><br>$5 delivery fee<br>30-45 min</div>'
        }
      },
      {
        points: this.zone3Coordinates,
        fill: 'rgba(229, 57, 53, 0.3)',
        borderColor: '#E53935',
        borderWidth: 2,
        tooltipSettings: {
          visible: true,
          template: '<div><b>Zone 3</b><br>$10 delivery fee<br>45-60 min</div>'
        }
      }
    ]
  };
}
```

---

## Best Practices

### Coordinate Management

1. **Close Polygons Properly**: First and last points should be identical to close the polygon
2. **Order Points Correctly**: Define points in clockwise or counter-clockwise order
3. **Validate Coordinates**: Ensure latitude (-90 to 90) and longitude (-180 to 180) are valid
4. **Use Appropriate Precision**: Limit decimal places to 6 for coordinate precision
5. **Store Complex Shapes**: Use GeoJSON format for complex polygons with holes

### Visual Design

1. **Use Semi-Transparent Fills**: Set opacity between 0.3-0.6 to see underlying map features
2. **Choose Contrasting Borders**: Make borders visible against both fill and map
3. **Color Code Meaningfully**: Use intuitive colors (green=safe, red=danger, blue=water)
4. **Limit Polygon Count**: Keep visible polygons under 50 for optimal performance
5. **Provide Context**: Always include tooltips or labels to explain polygon meaning

### Performance Optimization

1. **Simplify Complex Polygons**: Reduce coordinate count for intricate shapes
2. **Lazy Load Polygons**: Load polygons progressively as users zoom/pan
3. **Use Appropriate Detail Level**: Match polygon complexity to zoom level
4. **Cache Polygon Data**: Store frequently used polygon coordinates
5. **Batch Updates**: Group multiple polygon operations into single refresh

### User Experience

1. **Enable Tooltips**: Always provide information about polygon purpose
2. **Support Interaction**: Allow selection/highlighting when appropriate
3. **Use Visual Hierarchy**: More important zones should have stronger visual presence
4. **Add Labels**: Consider adding text labels for large, important polygons
5. **Provide Legend**: Include a legend explaining polygon color coding

---

## Common Patterns

### Dynamic Polygon Creation

Create polygons based on user input or data:

```typescript
export class DynamicPolygonComponent {
  @ViewChild('maps') public mapObj!: MapsComponent;
  public drawnPoints: any[] = [];
  
  public onMapClick(args: IMouseEventArgs): void {
    // Add point on each click
    this.drawnPoints.push({
      latitude: args.latitude,
      longitude: args.longitude
    });
    
    // Create polygon after 3+ points
    if (this.drawnPoints.length >= 3) {
      this.createPolygon(this.drawnPoints);
    }
  }
  
  private createPolygon(points: any[]): void {
    const newPolygon = {
      points: [...points, points[0]], // Close the polygon
      fill: 'rgba(33, 150, 243, 0.4)',
      borderColor: '#2196F3',
      borderWidth: 2
    };
    
    this.polygonSettings.polygons.push(newPolygon);
    this.mapObj.refresh();
  }
  
  public clearPolygons(): void {
    this.drawnPoints = [];
    this.polygonSettings.polygons = [];
    this.mapObj.refresh();
  }
}
```

### Polygon from GeoJSON

Convert GeoJSON polygons to map polygons:

```typescript
export class GeoJsonPolygonComponent {
  public loadGeoJsonPolygons(geoJson: any): void {
    const polygons = geoJson.features
      .filter((feature: any) => feature.geometry.type === 'Polygon')
      .map((feature: any) => ({
        points: feature.geometry.coordinates[0].map((coord: number[]) => ({
          latitude: coord[1],
          longitude: coord[0]
        })),
        fill: feature.properties.fill || 'rgba(33, 150, 243, 0.4)',
        borderColor: feature.properties.borderColor || '#2196F3',
        tooltipText: feature.properties.name || 'Unnamed Region'
      }));
    
    this.polygonSettings = { polygons };
  }
}
```

### Conditional Polygon Styling

Style polygons based on data values:

```typescript
export class ConditionalPolygonComponent {
  public createPolygonsFromData(zoneData: any[]): void {
    this.polygonSettings = {
      polygons: zoneData.map(zone => {
        let fill, borderColor;
        
        // Style based on risk level
        if (zone.riskLevel === 'high') {
          fill = 'rgba(244, 67, 54, 0.4)';
          borderColor = '#F44336';
        } else if (zone.riskLevel === 'medium') {
          fill = 'rgba(255, 152, 0, 0.4)';
          borderColor = '#FF9800';
        } else {
          fill = 'rgba(76, 175, 80, 0.4)';
          borderColor = '#4CAF50';
        }
        
        return {
          points: zone.coordinates,
          fill,
          borderColor,
          borderWidth: 2,
          tooltipText: `${zone.name} - Risk: ${zone.riskLevel}`,
          tooltipSettings: { visible: true }
        };
      })
    };
  }
}
```

---

## Next Steps

- **[Data Visualization](./data-visualization.md)** - Learn about bubbles, color mapping, and legends
- **[User Interactions](./user-interactions.md)** - Implement selection, highlighting, and tooltips
- **[Map Providers](./map-providers.md)** - Use polygons with online map tiles
- **[Markers](../markers.md)** - Combine polygons with location markers
- **[Advanced Features](./advanced-features.md)** - Export maps with polygons

For complete API documentation, visit the [Syncfusion Angular Maps API Reference](https://ej2.syncfusion.com/angular/documentation/api/maps/polygonSettingsModel).

---

## API Reference Summary

### Shape Configuration APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `shapeData` | GeoJSON shape data | [shapeData](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapedata) |
| `geometryType` | Geometry type | [geometryType](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#geometrytype) |
| `ShapeSettings` | Shape styling | [ShapeSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)