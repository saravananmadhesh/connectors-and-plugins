# 3D Chart Dimensions

Configure 3D perspective, depth, rotation, and chart dimensions.

## Table of Contents

- [Chart Size](#chart-size)
  - [Set Chart Width and Height](#set-chart-width-and-height)
  - [Responsive Sizing](#responsive-sizing)
- [3D Perspective Controls](#3d-perspective-controls)
  - [Rotation](#rotation)
  - [Tilt](#tilt)
  - [Depth](#depth)
- [Perspective Projection](#perspective-projection)
  - [Field of View](#field-of-view)
- [Wall Styling](#wall-styling)
  - [Wall Properties](#wall-properties)
- [Isometric View](#isometric-view)
  - [Set Isometric Angles](#set-isometric-angles)
- [Common 3D Configurations](#common-3d-configurations)
  - [Configuration 1 Standard 3D View](#configuration-1-standard-3d-view)
  - [Configuration 2 Front View Nearly 2D](#configuration-2-front-view-nearly-2d)
  - [Configuration 3 Isometric View](#configuration-3-isometric-view)
  - [Configuration 4 High-Angle View](#configuration-4-high-angle-view)
- [Dynamically Adjust 3D Settings](#dynamically-adjust-3d-settings)
- [Aspect Ratio Control](#aspect-ratio-control)
  - [Maintain Aspect Ratio](#maintain-aspect-ratio)
- [Performance Optimization](#performance-optimization)
- [Accessibility Considerations](#accessibility-considerations)


## Chart Size

### Set Chart Width and Height

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-dimensions',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis' [width]="'800px'" [height]="'600px'">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class DimensionsComponent {
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

### Responsive Sizing

```typescript
@Component({
  template: `
    <div style="width: 100%; height: 500px;">
      <ejs-chart3d [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class ResponsiveChartComponent {
  primaryXAxis = {
    valueType: 'Category'
  }

  data = [{ x: 'A', y: 40 }];
}
```

## 3D Perspective Controls

### Rotation

Rotate the 3D chart along different axes:

```typescript
@Component({
  template: `
    <ejs-chart3d [rotation]="45" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class RotationComponent {
  primaryXAxis = {
    valueType: 'Category'
  }
  data = [{ x: 'A', y: 40 }];
}
```

### Tilt

Adjust vertical perspective:

```typescript
@Component({
  template: `
    <ejs-chart3d [tilt]="30" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class TiltComponent {
  primaryXAxis = {
    valueType: 'Category'
  }
  data = [{ x: 'A', y: 40 }];
}
```

### Depth

Control the depth/thickness of 3D elements:

```typescript
@Component({
  template: `
    <ejs-chart3d [depth]="100" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class DepthComponent {
  primaryXAxis = {
    valueType: 'Category'
  }
  data = [{ x: 'A', y: 40 }];
}
```

## Perspective Projection

### Field of View

Control the perspective angle:

```typescript
@Component({
  template: `
    <ejs-chart3d [perspectiveAngle]="50" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class PerspectiveComponent {
  primaryXAxis = {
    valueType: 'Category'
  }
  data = [{ x: 'A', y: 40 }];
}
```

## Wall Styling

### Wall Properties

```typescript
@Component({
  template: `
    <ejs-chart3d [wallSize]="1" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class WallComponent {
  primaryXAxis = {
    valueType: 'Category'
  }
  data = [{ x: 'A', y: 40 }];
}
```

## Isometric View

### Set Isometric Angles

```typescript
@Component({
  template: `
    <ejs-chart3d [rotation]="45" [tilt]="45" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class IsometricComponent {
  primaryXAxis = {
    valueType: 'Category'
  }
  data = [{ x: 'A', y: 40 }];
}
```

## Common 3D Configurations

### Configuration 1: Standard 3D View

```typescript
rotation = 45;
tilt = 15;
depth = 100;
```

### Configuration 2: Front View (Nearly 2D)

```typescript
rotation = 0;
tilt = 0;
depth = 20;
```

### Configuration 3: Isometric View

```typescript
rotation = 45;
tilt = 45;
depth = 100;
```

### Configuration 4: High-Angle View

```typescript
rotation = 30;
tilt = 60;
depth = 80;
```

## Dynamically Adjust 3D Settings

```typescript
import { Component, ViewChild } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-dynamic-3d',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <div>
      <label>
        Rotation: 
        <input type="range" min="0" max="360" [(ngModel)]="rotation" (change)="updateChart()">
        {{ rotation }}°
      </label>
      
      <label>
        Tilt: 
        <input type="range" min="-90" max="90" [(ngModel)]="tilt" (change)="updateChart()">
        {{ tilt }}°
      </label>
      
      <label>
        Depth: 
        <input type="range" min="10" max="200" [(ngModel)]="depth" (change)="updateChart()">
        {{ depth }}
      </label>
      
      <ejs-chart3d 
        #chart [primaryXAxis]='primaryXAxis'
        [rotation]="rotation" 
        [tilt]="tilt" 
        [depth]="depth">
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class Dynamic3DComponent {
  @ViewChild('chart') chart!: Chart3DComponent;
  
  rotation = 45;
  tilt = 15;
  depth = 100;

  primaryXAxis = {
    valueType: 'Category'
  }
  
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];

  updateChart() {
    if (this.chart) {
      this.chart.refresh();
    }
  }
}
```

## Aspect Ratio Control

### Maintain Aspect Ratio

```typescript
@Component({
  template: `
    <div style="aspect-ratio: 16 / 9; width: 100%;">
      <ejs-chart3d [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class AspectRatioComponent {
  primaryXAxis = {
    valueType: 'Category'
  }
  data = [{ x: 'A', y: 40 }];
}
```

## Performance Optimization

- **Keep depth reasonable:** 50-150 for balance
- **Simplify rotation/tilt:** Avoid rapid changes
- **Disable shadows:** For better performance
- **Reduce data points:** With complex 3D settings

## Accessibility Considerations

3D perspectives can be challenging for:
- Screen reader users (provide data summary)
- Colorblind users (use patterns, not color alone)
- Motion-sensitive users (avoid rapid rotation)

Consider providing a 2D alternative or summary.
