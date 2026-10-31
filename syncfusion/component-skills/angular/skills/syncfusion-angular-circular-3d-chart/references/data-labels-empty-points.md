# Data Labels & Empty Points

## Table of Contents

- [Enable Data Labels](#enable-data-labels)
  - [Basic Data Label Setup](#basic-data-label-setup)
  - [Data Label Properties](#data-label-properties)
- [Label Positioning](#label-positioning)
  - [Inside Position](#inside-position)
  - [Outside Position](#outside-position)
- [Data Label Templates](#data-label-templates)
  - [Display Custom Values](#display-custom-values)
  - [Template Variables](#template-variables)
  - [Complex Template Example](#complex-template-example)
  - [Formatting Numbers](#formatting-numbers)
- [Connector Lines](#connector-lines)
  - [Enable Connector Lines](#enable-connector-lines)
  - [Connector Line Options](#connector-line-options)
- [Empty Point Handling](#empty-point-handling)
  - [Detect Empty Points](#detect-empty-points)
  - [Configure Empty Point Behavior](#configure-empty-point-behavior)
  - [Empty Point Modes](#empty-point-modes)
  - [Example Handle Missing Data](#example-handle-missing-data)
- [Point Customization](#point-customization)
  - [Individual Point Colors](#individual-point-colors)
  - [Point Borders](#point-borders)
- [Advanced Scenarios](#advanced-scenarios)
  - [Dynamic Label Updates](#dynamic-label-updates)
- [Troubleshooting](#troubleshooting)


---

## Enable Data Labels

### Basic Data Label Setup

Enable labels with the default configuration:

```typescript
import { Component } from '@angular/core';
import { CircularChart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-data-labels',
  standalone: true,
  imports: [
    CircularChart3DAllModule
  ],
  template: `
    <ejs-circularchart3d id="chart">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="chartData" 
          xName="category" 
          yName="value" 
          type="Pie"
          [dataLabel]="{ visible: true }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class DataLabelsComponent {
  chartData = [
    { category: 'Chrome', value: 48 },
    { category: 'Firefox', value: 20 },
    { category: 'Safari', value: 18 },
    { category: 'Edge', value: 14 }
  ];
}
```

### Data Label Properties

```typescript
dataLabel = {
  visible: true,                    // Enable/disable labels
  position: 'Inside',              // 'Inside' or 'Outside'
  name: 'category',                // Property to display as text
  font: { size: '14px', bold: true },
  border: { width: 1, color: '#ccc' },
  fill: '#ffffff',
  angle: 30,
  enableRotation: true
}
```

---

## Label Positioning

### Inside Position

Place labels inside the pie slices:

```typescript
@Component({
  template: `
    <ejs-circularchart3d id="chart">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Pie"
          [dataLabel]="{ visible: true, position: 'Inside', name: 'x' }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class InsideLabelsComponent {
  data = [
    { x: 'Q1', y: 25 },
    { x: 'Q2', y: 28 },
    { x: 'Q3', y: 22 },
    { x: 'Q4', y: 25 }
  ];
}
```

**Use Inside position when:**
- You want compact labels without extra space
- All slices are large enough to fit text
- You prefer minimal visual clutter

### Outside Position

Place labels outside slices with connector lines:

```typescript
@Component({
  template: `
    <ejs-circularchart3d id="chart">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="category" 
          yName="percentage" 
          type="Pie"
          [dataLabel]="{ 
            visible: true, 
            position: 'Outside', 
            name: 'category',
            connectorStyle: { type: 'Line', color: '#999' }
          }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class OutsideLabelsComponent {
  data = [
    { category: 'North', percentage: 25 },
    { category: 'South', percentage: 20 },
    { category: 'East', percentage: 30 },
    { category: 'West', percentage: 25 }
  ];
}
```

**Use Outside position when:**
- Slices are small and labels won't fit inside
- You need to label all points clearly
- You want a clear visual hierarchy

---

## Data Label Templates

### Display Custom Values

Show calculated or formatted values:

```typescript
@Component({
  template: `
    <ejs-circularchart3d id="chart">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="category" 
          yName="value" 
          type="Pie"
          [dataLabel]="{ 
            visible: true, 
            template: '<div>${point.x}: ${point.y}%</div>'
          }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class TemplateLabelsComponent {
  data = [
    { category: 'Product A', value: 35 },
    { category: 'Product B', value: 25 },
    { category: 'Product C', value: 40 }
  ];
}
```

### Template Variables

Available placeholder variables in templates:

| Variable | Description |
|----------|-------------|
| `${point.x}` | X value (category/label) |
| `${point.y}` | Y value (numeric value) |
| `${point.index}` | Point index in series |
| `${series.name}` | Series name |
| `${point.percentage}` | Percentage of total |

### Complex Template Example

```typescript
template = `
  <div style="
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 8px;
    border-radius: 4px;
    font-weight: bold;
  ">
    <div>${point.x}</div>
    <div>${point.y} items</div>
    <div>${point.percentage}%</div>
  </div>
`;
```

### Formatting Numbers

Format numeric values in labels:

```typescript
@Component({
imports: [
         CircularChart3DAllModule
    ],

providers: [CircularChart3DAllModule],
standalone: true,
    selector: 'app-container',
    template: `<ejs-circularchart3d style='display:block;' align='center' [tilt]='tilt' [legendSettings]="legendSettings">
    <e-circularchart3d-series-collection>
    <e-circularchart3d-series [dataSource]='dataSource' xName='x' yName='y' [dataLabel]='dataLabel'>
    </e-circularchart3d-series></e-circularchart3d-series-collection>
    </ejs-circularchart3d>`
})
export class AppComponent implements OnInit {
    public dataSource?: Object[];
    public legendSettings?: Object;
    public dataLabel?: Object;
    public tilt?: number;
    ngOnInit(): void {
        this.dataSource = [
          { x: 'Jan', y: 13, text: 'Jan: 13' }, 
          { x: 'Feb', y: 13, text: 'Feb: 13' },
          { x: 'Mar', y: 17, text: 'Mar: 17' }, 
          { x: 'Apr', y: 13.5, text: 'Apr: 13.5' }];
        this.legendSettings = { visible: false };
        this.dataLabel = {
          visible: true,
          format: 'n2'
        };
        this.tilt= -45
    }
}
```

---

## Connector Lines

### Enable Connector Lines

Connector lines connect outside labels to their slices:

```typescript
@Component({
imports: [
         CircularChart3DAllModule
    ],

providers: [CircularChart3DAllModule],
standalone: true,
    selector: 'app-container',
    template: `<ejs-circularchart3d style='display:block;' align='center' [tilt]='tilt' [legendSettings]="legendSettings">
    <e-circularchart3d-series-collection>
    <e-circularchart3d-series [dataSource]='dataSource' xName='x' yName='y' [dataLabel]='dataLabel'>
    </e-circularchart3d-series></e-circularchart3d-series-collection>
    </ejs-circularchart3d>`
})
export class AppComponent implements OnInit {
    public dataSource?: Object[];
    public legendSettings?: Object;
    public dataLabel?: Object;
    public tilt?: number;
    ngOnInit(): void {
        this.dataSource = [
          { x: 'Jan', y: 13, text: 'Jan: 13' }, 
          { x: 'Feb', y: 13, text: 'Feb: 13' },
          { x: 'Mar', y: 17, text: 'Mar: 17' }, 
          { x: 'Apr', y: 13.5, text: 'Apr: 13.5' }];
        this.legendSettings = { visible: false };
        this.dataLabel = {
          visible: true,
          name: 'text',
          position: 'Outside',
          connectorStyle: {
            length: '50px',
            width: 2,                  
            color: '#f4429e',
            dashArray: '5,3'
          }
        };
        this.tilt= -45
    }
}
```

### Connector Line Options

```typescript
connectorStyle = {
  color: '#999',          // Connector line color
  width: 1,               // Line width in pixels
  length: '5',           // Length from point (px)
  dashArray: '',          // '2,2' for dashed, '5,5,2' for pattern
  opacity: 1              // Line opacity (0-1)
}
```

---

## Empty Point Handling

### Detect Empty Points

Empty points are data items with null or undefined values:

```typescript
data = [
  { category: 'Q1', value: 25 },
  { category: 'Q2', value: null },      // Empty point
  { category: 'Q3', value: undefined }, // Empty point
  { category: 'Q4', value: 28 }
]
```

### Configure Empty Point Behavior

```typescript
@Component({
imports: [
         CircularChart3DAllModule
    ],

providers: [CircularChart3DAllModule],
standalone: true,
  selector: 'app-container',
  template: `<ejs-circularchart3d style='display:block;' align='center' [tilt]='tilt' [legendSettings]="legendSettings">
    <e-circularchart3d-series-collection>
    <e-circularchart3d-series [dataSource]='dataSource' xName='x' yName='y' [emptyPointSettings]='emptyPointSettings' [dataLabel]='dataLabel'>
    </e-circularchart3d-series></e-circularchart3d-series-collection>
    </ejs-circularchart3d>`
})
export class AppComponent {
  ...
  this.emptyPointSettings = { mode: 'Zero' };

}
```

### Empty Point Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| `Gap` | Skip empty point (no slice) | Missing data |
| `Zero` | Treat as zero value | Zero sales/no activity |
| `Drop` | Ignores the point | Used to ignore the empty point while rendering |
| `Average` | Use average of neighbors | Interpolate missing data |

### Example: Handle Missing Data

```typescript
@Component({
  selector: 'app-empty-points',
  template: `
    <ejs-circularchart3d id="chart">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="salesData" 
          xName="month" 
          yName="sales" 
          type="Pie"
          [emptyPointSettings]="{
            mode: 'Gap',
            fill: '#f0f0f0',
          }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class EmptyPointsComponent {
  salesData = [
    { month: 'Jan', sales: 1000 },
    { month: 'Feb', sales: null },      // Data not available
    { month: 'Mar', sales: 1500 },
    { month: 'Apr', sales: undefined }  // Data not available
  ];
}
```

---

## Point Customization

### Individual Point Colors

Customize color for each data point:

```typescript
@Component({
  template: `
    <ejs-circularchart3d>
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="coloredData" 
          xName="item" 
          yName="count" 
          type="Pie"
          pointColorMapping="customColor">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class PointColorsComponent {
  coloredData = [
    { item: 'A', count: 30, customColor: '#FF6B6B' },
    { item: 'B', count: 25, customColor: '#4ECDC4' },
    { item: 'C', count: 20, customColor: '#45B7D1' },
    { item: 'D', count: 25, customColor: '#FFA07A' }
  ];
}
```

### Point Borders

Add borders to data points:

```typescript
pointRender = {
  border: {
    color: '#fff',
    width: 2
  },
  rx: 0,
  ry: 0
}
```

---

## Advanced Scenarios

### Dynamic Label Updates

Update labels based on data changes:

```typescript
export class DynamicLabelsComponent {
  data: any[] = [];
  labelFormat = '${point.x}: ${point.y}';

  updateChart(newData: any[]) {
    this.data = newData;
    // Chart re-renders with new data and labels
  }

  changeFormat() {
    // Switch between display formats
    this.labelFormat = this.labelFormat === '${point.x}: ${point.y}' 
      ? '${point.percentage}%' 
      : '${point.x}: ${point.y}';
  }
}
```

---

## Troubleshooting

**Labels overlapping?**
- Use `position: 'Outside'` for clarity
- Enable `enableSmartLabels: true`
- Increase chart container size

**Empty points showing?**
- Verify data property names match (xName, yName)
- Check for null/undefined values
- Set `emptyPointSettings.mode: 'Gap'`

**Template not rendering?**
- Check template syntax for typos
- Verify placeholder variables are correct (${point.x}, ${point.y})
- Check browser console for errors

---
