# Customization in Angular Maps

Master appearance customization in Syncfusion Angular Maps to create visually stunning and on-brand geographic visualizations. This comprehensive guide covers themes, sizing, styling, projections, and responsive design.

## Table of Contents

- [Map Sizing](#map-sizing)
  - [Fixed Dimensions](#fixed-dimensions)
  - [Responsive Sizing](#responsive-sizing)
- [Title Configuration](#title-configuration)
  - [Main Title](#main-title)
  - [Subtitle](#subtitle)
- [Themes](#themes)
  - [Built-in Themes](#built-in-themes)
  - [Theme Switching](#theme-switching)
- [Container Customization](#container-customization)
  - [Background and Borders](#background-and-borders)
  - [Margins](#margins)
- [Map Area Styling](#map-area-styling)
  - [Background Colors](#background-colors)
  - [Area Borders](#area-borders)
- [Shape Customization](#shape-customization)
  - [Fill Colors](#fill-colors)
  - [Auto Palette](#auto-palette)
  - [Border Styling](#border-styling)
- [Projection Types](#projection-types)
  - [Available Projections](#available-projections)
  - [Choosing Projections](#choosing-projections)

---

## Map Sizing

Control map dimensions using width and height properties.

### Fixed Dimensions

Set specific pixel or percentage values:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps 
      [width]="width"
      [height]="height">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };// Your GeoJSON data
  
  // Fixed pixel dimensions
  public width: string = '800px';
  public height: string = '600px';
  
  // Or use percentages
  // public width: string = '100%';
  // public height: string = '80vh';
}
```

### Responsive Sizing

Create responsive maps that adapt to container size:

```typescript
@Component({
  selector: 'app-root',
  template: `
    <div class="map-container">
      <ejs-maps 
        width="100%"
        height="100%">
        <e-layers>
          <e-layer [shapeData]="worldMap"></e-layer>
        </e-layers>
      </ejs-maps>
    </div>
  `,
  styles: [`
    .map-container {
      width: 100%;
      height: 600px;
      min-height: 400px;
      max-height: 800px;
    }
    
    @media (max-width: 768px) {
      .map-container {
        height: 400px;
      }
    }
  `]
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };// GeoJSON data
}
```

---

## Title Configuration

Add descriptive titles and subtitles to provide context.

### Main Title

Configure the primary map title:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps [titleSettings]="titleSettings">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };// GeoJSON data
  
  public titleSettings: object = {
    text: 'World Population Distribution',
    alignment: 'Center',  // 'Near', 'Center', 'Far'
    textStyle: {
      fontFamily: 'Segoe UI',
      size: '18px',
      fontWeight: 'Bold',
      color: '#212121',
      opacity: 1
    },
    description: 'Global population data for 2024'
  };
}
```

### Subtitle

Add a subtitle below the main title:

```typescript
public titleSettings: object = {
  text: 'Global Economic Indicators',
  alignment: 'Center',
  textStyle: {
    size: '20px',
    fontWeight: 'Bold',
    color: '#1976D2'
  },
  subtitleSettings: {
    text: 'GDP Distribution by Country - 2024',
    alignment: 'Center',
    textStyle: {
      size: '14px',
      fontWeight: 'Normal',
      color: '#757575',
      fontStyle: 'Italic'
    }
  }
};
```

---

## Container Customization

Style the outer map container.

### Background and Borders

Customize container appearance:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps 
      [background]="background"
      [border]="border">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };// GeoJSON data
  
  public background: string = '#F5F5F5';  // Light gray background
  
  public border: object = {
    color: '#1976D2',   // Blue border
    width: 2,           // Border width in pixels
    opacity: 1          // Full opacity
  };
}
```

### Margins

Control spacing around the map:

```typescript
public margin: object = {
  left: 20,    // Left margin in pixels
  right: 20,   // Right margin in pixels
  top: 30,     // Top margin in pixels
  bottom: 30   // Bottom margin in pixels
};
```

**Complete Container Setup:**

```typescript
@Component({
  template: `
    <ejs-maps 
      [background]="background"
      [border]="border"
      [margin]="margin"
      width="100%"
      height="600px">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public background: string = '#FFFFFF';
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public border: object = {
    color: '#E0E0E0',
    width: 1,
    opacity: 0.8
  };
  
  public margin: object = {
    left: 40,
    right: 40,
    top: 50,
    bottom: 40
  };
}
```

---

## Map Area Styling

Customize the inner map rendering area.

### Background Colors

Set the map area background:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps [mapsArea]="mapsArea">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };// GeoJSON data
  
  public mapsArea: object = {
    background: '#E3F2FD',  // Light blue background for ocean
    border: {
      color: '#BBDEFB',
      width: 1,
      opacity: 1
    }
  };
}
```

### Area Borders

Add borders around the map rendering area:

```typescript
public mapsArea: object = {
  background: '#FFFFFF',
  border: {
    color: '#424242',
    width: 2,
    opacity: 0.8
  }
};
```

---

## Shape Customization

Style the map shapes (countries, states, regions).

### Fill Colors

Set uniform fill colors for all shapes:

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
          [shapeSettings]="shapeSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };// GeoJSON data
  
  public shapeSettings: object = {
    fill: '#81C784',     // Green fill color
    opacity: 0.8         // 80% opacity
  };
}
```

### Auto Palette

Automatically assign colors from a palette:

```typescript
public shapeSettings: object = {
  autofill: true,  // Enable automatic coloring
  palette: [
    '#E3F2FD',  // Light blue
    '#BBDEFB',  // Blue
    '#90CAF9',  // Medium blue
    '#64B5F6',  // Darker blue
    '#42A5F5',  // Deep blue
    '#2196F3'   // Primary blue
  ],
  border: {
    color: '#1976D2',
    width: 0.5
  }
};
```

### Border Styling

Customize shape borders:

```typescript
public shapeSettings: object = {
  fill: '#E0E0E0',
  border: {
    color: '#424242',       // Dark gray border
    width: 1,               // Border width in pixels
    opacity: 1              // Full opacity
  },
  dashArray: '0',           // Solid line (use '5,5' for dashed)
  opacity: 1                // Shape fill opacity
};
```

**Data-Driven Shape Colors:**

```typescript
public shapeSettings: object = {
  colorValuePath: 'color',  // Field in dataSource containing color values
  border: {
    color: '#FFFFFF',
    width: 1
  }
};

public dataSource: object[] = [
  { name: 'United States', color: '#2196F3' },
  { name: 'Canada', color: '#4CAF50' },
  { name: 'Mexico', color: '#FF9800' }
];
```

**Data-Driven Border Customization:**

```typescript
public shapeSettings: object = {
  fill: '#E0E0E0',
  borderColorValuePath: 'borderColor',  // Field for border color
  borderWidthValuePath: 'borderWidth',  // Field for border width
  border: {
    // Default fallback values if fields not found
    color: '#424242',
    width: 1
  }
};

public dataSource: object[] = [
  { name: 'United States', borderColor: '#1976D2', borderWidth: 2 },
  { name: 'Canada', borderColor: '#388E3C', borderWidth: 3 }
];
```

---

## Projection Types

Choose how the Earth's surface is projected onto a 2D map.

### Available Projections

Syncfusion Maps supports 8 projection types:

```typescript
import { Component } from '@angular/core';
import { ProjectionType } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <div>
      <select (change)="changeProjection($event.target.value)">
        <option value="Mercator">Mercator</option>
        <option value="Equirectangular">Equirectangular</option>
        <option value="Miller">Miller</option>
        <option value="Eckert3">Eckert III</option>
        <option value="Eckert5">Eckert V</option>
        <option value="Eckert6">Eckert VI</option>
        <option value="Winkel3">Winkel Tripel</option>
        <option value="AitOff">Aitoff</option>
      </select>
      
      <ejs-maps [projectionType]="projectionType">
        <e-layers>
          <e-layer [shapeData]="worldMap"></e-layer>
        </e-layers>
      </ejs-maps>
    </div>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };// GeoJSON data
  public projectionType: ProjectionType = 'Mercator';
  
  public changeProjection(projection: string): void {
    this.projectionType = projection as ProjectionType;
  }
}
```

**Projection Characteristics:**

1. **Mercator** (Default)
   - Preserves shape and angles
   - Distorts size near poles
   - Best for navigation and web maps

2. **Equirectangular**
   - Simple plate carrée projection
   - Equal spacing of meridians and parallels
   - Moderate distortion

3. **Miller**
   - Compromise between Mercator and cylindrical
   - Less distortion at high latitudes
   - Good for world maps

4. **Eckert III**
   - Pseudocylindrical equal-area
   - Pole lines half the equator
   - Minimizes distortion

5. **Eckert V**
   - Pseudocylindrical compromise
   - Sinusoidal meridians
   - Balanced appearance

6. **Eckert VI**
   - Pseudocylindrical equal-area
   - Sinusoidal meridians
   - Popular for world maps

7. **Winkel Tripel** (Winkel3)
   - Compromise projection
   - Used by National Geographic
   - Low overall distortion

8. **Aitoff**
   - Modified azimuthal
   - Elliptical world map
   - Aesthetic appearance

### Choosing Projections

Select projections based on use case:

```typescript
export class ProjectionSelectorComponent {
  // For web mapping and navigation
  public webMapProjection: ProjectionType = 'Mercator';
  
  // For statistical/thematic world maps
  public thematicProjection: ProjectionType = 'Winkel3';
  
  // For equal-area analysis
  public equalAreaProjection: ProjectionType = 'Eckert6';
  
  // For aesthetic presentation
  public presentationProjection: ProjectionType = 'Miller';
}
```

---

## Best Practices

### Visual Design

1. **Maintain Consistency**: Use consistent colors and styles across related visualizations
2. **Ensure Readability**: Choose high-contrast colors for text and borders
3. **Follow Brand Guidelines**: Match corporate color schemes and fonts
4. **Use Appropriate Themes**: Select themes that match your application's design system
5. **Test Across Devices**: Verify appearance on different screen sizes and resolutions

### Performance Optimization

1. **Limit Palette Colors**: Use 6-12 colors maximum in auto-palette
2. **Optimize Border Width**: Keep borders thin (0.5-2px) for better rendering
3. **Use Simple Projections**: Mercator and Equirectangular render fastest
4. **Cache Styles**: Store frequently used style objects
5. **Minimize Reflows**: Batch styling changes before refresh

### Accessibility

1. **Provide High Contrast**: Ensure sufficient color contrast ratios (WCAG 4.5:1)
2. **Use Descriptive Titles**: Add clear, informative titles
3. **Support Dark Mode**: Implement dark theme variants
4. **Avoid Color-Only Communication**: Use patterns or labels in addition to colors
5. **Test with Screen Readers**: Verify ARIA labels work correctly

### Responsive Design

1. **Use Relative Units**: Prefer percentages over fixed pixels
2. **Set Min/Max Dimensions**: Prevent maps from becoming too small or large
3. **Adjust Margins**: Reduce margins on smaller screens
4. **Scale Text**: Use viewport-relative font sizes (vw, vh)
5. **Test Breakpoints**: Verify appearance at common device widths

---

## Common Patterns

### Corporate Branding

Apply corporate colors and styling:

```typescript
export class CorporateMapComponent {
  // Corporate color palette
  private brandColors = {
    primary: '#1976D2',
    secondary: '#FFC107',
    accent: '#FF5722',
    background: '#F5F5F5',
    text: '#212121'
  };
  
  public titleSettings: object = {
    text: 'Global Operations',
    textStyle: {
      color: this.brandColors.text,
      fontFamily: 'Roboto, sans-serif',
      size: '20px',
      fontWeight: 'Bold'
    }
  };
  
  public background: string = this.brandColors.background;
  
  public border: object = {
    color: this.brandColors.primary,
    width: 2
  };
  
  public shapeSettings: object = {
    palette: [
      this.brandColors.primary + '33',  // Primary with transparency
      this.brandColors.secondary + '33',
      this.brandColors.accent + '33'
    ],
    autofill: true,
    border: {
      color: this.brandColors.primary,
      width: 1
    }
  };
}
```

### Dark Mode Implementation

Create a dark mode variant:

```typescript
export class DarkModeMapComponent {
  public isDarkMode: boolean = false;
  
  public get titleSettings(): object {
    return {
      text: 'Population Map',
      textStyle: {
        color: this.isDarkMode ? '#FFFFFF' : '#212121',
        size: '18px'
      }
    };
  }
  
  public get background(): string {
    return this.isDarkMode ? '#212121' : '#FFFFFF';
  }
  
  public get mapsArea(): object {
    return {
      background: this.isDarkMode ? '#303030' : '#F5F5F5',
      border: {
        color: this.isDarkMode ? '#424242' : '#E0E0E0',
        width: 1
      }
    };
  }
  
  public get shapeSettings(): object {
    return {
      fill: this.isDarkMode ? '#424242' : '#E0E0E0',
      border: {
        color: this.isDarkMode ? '#BDBDBD' : '#9E9E9E',
        width: 0.5
      }
    };
  }
  
  public toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}
```

### Themed Map Collections

Create multiple themed variations:

```typescript
export class ThemedMapCollectionComponent {
  public themes = {
    ocean: {
      mapsArea: { background: '#E3F2FD' },
      shapeSettings: {
        fill: '#81C784',
        border: { color: '#4CAF50', width: 1 }
      }
    },
    desert: {
      mapsArea: { background: '#FFF9C4' },
      shapeSettings: {
        fill: '#FFB74D',
        border: { color: '#FF9800', width: 1 }
      }
    },
    monochrome: {
      mapsArea: { background: '#FAFAFA' },
      shapeSettings: {
        palette: ['#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242'],
        autofill: true,
        border: { color: '#212121', width: 0.5 }
      }
    }
  };
  
  public currentTheme: string = 'ocean';
  
  public get mapsArea(): object {
    return this.themes[this.currentTheme].mapsArea;
  }
  
  public get shapeSettings(): object {
    return this.themes[this.currentTheme].shapeSettings;
  }
}
```

---

## Next Steps

- **[Data Visualization](./data-visualization.md)** - Apply colors through color mapping
- **[User Interactions](./user-interactions.md)** - Customize selection and highlight styles
- **[Map Providers](./map-providers.md)** - Style tile-based maps
- **[Accessibility](./accessibility.md)** - Implement accessible color schemes
- **[Advanced Features](./advanced-features.md)** - Export customized maps

For complete API documentation, visit the [Syncfusion Angular Maps API Reference](https://ej2.syncfusion.com/angular/documentation/api/maps/).

---

## API Reference Summary

### Appearance APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `theme` | Built-in theme selection | [theme](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#theme) |
| `background` | Map background color | [background](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#background) |
| `ShapeSettings` | Shape styling model | [ShapeSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings) |
| `palette` | Color palette array | [palette](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#palette) |
| `border` | Border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#border) |
| `titleSettings` | Title configuration | [titleSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#titlesettings) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)