# Pie vs Donut Configuration

## Table of Contents

- [Pie Chart Implementation](#pie-chart-implementation)
  - [Basic Pie Chart](#basic-pie-chart)
  - [When to Use Pie Charts](#when-to-use-pie-charts)
- [Donut Chart Implementation](#donut-chart-implementation)
  - [Basic Donut Chart](#basic-donut-chart)
  - [Inner Radius Configuration](#inner-radius-configuration)
  - [Typical Configurations](#typical-configurations)
  - [When to Use Donut Charts](#when-to-use-donut-charts)
- [Converting Between Types](#converting-between-types)
  - [Dynamic Type Switching](#dynamic-type-switching)
- [Radius Customization](#radius-customization)
  - [Default Radius](#default-radius)
  - [Custom Fixed Radius](#custom-fixed-radius)
  - [Various Radius Per Slice](#various-radius-per-slice)
- [Series Configuration](#series-configuration)
  - [Key Series Properties](#key-series-properties)
- [Color Mapping](#color-mapping)
  - [Map Colors from Data Source](#map-colors-from-data-source)
  - [Using Palettes](#using-palettes)
- [Troubleshooting](#troubleshooting)


---

## Pie Chart Implementation

### Basic Pie Chart

Create a simple pie chart by setting the series `type` to `'Pie'`:

```typescript
import { Component } from '@angular/core';
import { CircularChart3DComponent, CircularChartSeriesCollectionDirective, CircularChartSeriesDirective } from '@syncfusion/ej2-angular-charts';
import { PieSeries3DService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CircularChart3DAllModule
  ],
  template: `
    <ejs-circularchart3d id="pie-container">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="pieData" 
          xName="country" 
          yName="gdp" 
          type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class PieChartComponent {
  pieData = [
    { country: 'USA', gdp: 26 },
    { country: 'China', gdp: 18 },
    { country: 'Japan', gdp: 9 },
    { country: 'Germany', gdp: 6 },
    { country: 'UK', gdp: 5 },
    { country: 'France', gdp: 4 },
    { country: 'Others', gdp: 32 }
  ];
}
```

### When to Use Pie Charts

Use pie charts for:
- **Part-to-whole relationships:** Show how individual items make up a total
- **Percentage distributions:** Visualize market share or budget allocation
- **Simple categories:** 2-5 categories for clarity (avoid too many slices)
- **Emphasis on single segments:** Highlight one dominant category

**Best practice:** Limit to 5-7 slices for readability.

---

## Donut Chart Implementation

### Basic Donut Chart

Convert a pie to a donut by setting `innerRadius` property:

```typescript
import { Component } from '@angular/core';
import { CircularChart3DComponent, CircularChartSeriesCollectionDirective, CircularChartSeriesDirective } from '@syncfusion/ej2-angular-charts';
import { PieSeries3DService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [
    CircularChart3DComponent,
    CircularChartSeriesCollectionDirective,
    CircularChartSeriesDirective
  ],
  providers: [PieSeries3DService],
  template: `
    <ejs-circularchart3d id="donut-container">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="donutData" 
          xName="browser" 
          yName="users" 
          type="Pie"
          innerRadius="50%">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class DonutChartComponent {
  donutData = [
    { browser: 'Chrome', users: 48 },
    { browser: 'Firefox', users: 20 },
    { browser: 'Safari', users: 18 },
    { browser: 'Edge', users: 14 }
  ];
}
```

### Inner Radius Configuration

The `innerRadius` property accepts percentage values (0-100%):

```typescript
// Pie chart (no hole)
innerRadius = '0%';

// Donut with 40% hole
innerRadius = '40%';

// Donut with 60% hole (large center)
innerRadius = '60%';

// Donut with 80% hole (thin ring)
innerRadius = '80%';
```

### Typical Configurations

| innerRadius | Use Case |
|------------|----------|
| 0% | Pie chart (default) |
| 30-40% | Standard donut chart |
| 40-50% | Donut with balanced proportions |
| 50-60% | Donut emphasizing center content |
| 70%+ | Thin ring charts (for special effects) |

### When to Use Donut Charts

Use donut charts for:
- **Additional center information:** Display summary or key metric in the center
- **Visual variation:** Differentiate from pie charts in dashboard layouts
- **Space efficiency:** More visually compact than pie charts
- **Focus and emphasis:** Draw attention to the ring rather than the whole

---

## Converting Between Types

### Dynamic Type Switching

Allow users to switch between pie and donut:

```typescript
import { Component } from '@angular/core';
import { CircularChart3DComponent, CircularChartSeriesCollectionDirective, CircularChartSeriesDirective } from '@syncfusion/ej2-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-chart',
  standalone: true,
  imports: [
    CommonModule,
    CircularChart3DComponent,
    CircularChartSeriesCollectionDirective,
    CircularChartSeriesDirective
  ],
  template: `
    <div>
      <div style="margin-bottom: 20px;">
        <button (click)="switchToPie()">Show as Pie</button>
        <button (click)="switchToDonut()">Show as Donut</button>
        <span style="margin-left: 20px;">Current: {{ isDonut ? 'Donut' : 'Pie' }}</span>
      </div>
      
      <ejs-circularchart3d id="chart">
        <e-circularchart3d-series-collection>
          <e-circularchart3d-series 
            [dataSource]="chartData" 
            xName="label" 
            yName="value" 
            type="Pie"
            [innerRadius]="isDonut ? '50%' : '0%'">
          </e-circularchart3d-series>
        </e-circularchart3d-series-collection>
      </ejs-circularchart3d>
    </div>
  `,
  styles: [`
    button {
      padding: 8px 16px;
      margin-right: 10px;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button:hover {
      background-color: #f0f0f0;
    }
  `]
})
export class DynamicChartComponent {
  isDonut = false;
  
  chartData = [
    { label: 'Q1', value: 25 },
    { label: 'Q2', value: 28 },
    { label: 'Q3', value: 22 },
    { label: 'Q4', value: 25 }
  ];

  switchToPie() {
    this.isDonut = false;
  }

  switchToDonut() {
    this.isDonut = true;
  }
}
```

---

## Radius Customization

### Default Radius

By default, the radius is 80% of the minimum of chart width and height:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      [width]="'100%'" 
      [height]="'400px'">
      <!-- Pie will use 80% of min(width, height) -->
    </ejs-circularchart3d>
  `
})
```

### Custom Fixed Radius

Set a specific radius value:

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
          radius="200px">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
```

### Various Radius Per Slice

Assign different radii to each slice from data source:

```typescript
@Component({
  template: `
    <ejs-circularchart3d id="chart">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="variousRadiusData" 
          xName="x" 
          yName="y" 
          type="Pie"
          [radius]="'radius'">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class VariousRadiusComponent {
  variousRadiusData = [
    { x: 'Product A', y: 30, radius: '100%' },
    { x: 'Product B', y: 25, radius: '90%' },
    { x: 'Product C', y: 20, radius: '80%' },
    { x: 'Product D', y: 25, radius: '70%' }
  ];
}
```

---

## Series Configuration

### Key Series Properties

```typescript
@Component({
  template: `
    <ejs-circularchart3d [title]="'Sales Distribution'">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data"
          xName="category"              // Property for slice labels
          yName="sales"                 // Property for values
          name="Sales"                  // Series name for legend
          type="Pie"                    // 'Pie' or other types
          radius="80%"                  // Chart radius
          innerRadius="0%"              // 0% for pie, >0% for donut
          [cornerRadius]="0"            // Rounded corners (0 = sharp)
          [explode]="false"             // Separate slices on selection
          [emptyPointSettings]="{}"     // Handle missing data
          [pointColorMapping]="'color'"><!-- Use color from data -->
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
```

---

## Color Mapping

### Map Colors from Data Source

Use `pointColorMapping` to assign colors from data:

```typescript
import { Component } from '@angular/core';
import { CircularChart3DComponent, CircularChartSeriesCollectionDirective, CircularChartSeriesDirective } from '@syncfusion/ej2-angular-charts';
import { PieSeries3DService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-color-mapping',
  standalone: true,
  imports: [
    CircularChart3DComponent,
    CircularChartSeriesCollectionDirective,
    CircularChartSeriesDirective
  ],
  providers: [PieSeries3DService],
  template: `
    <ejs-circularchart3d id="chart">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="coloredData" 
          xName="department" 
          yName="budget" 
          type="Pie"
          pointColorMapping="color">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class ColorMappingComponent {
  coloredData = [
    { department: 'Engineering', budget: 45, color: '#5DADE2' },
    { department: 'Marketing', budget: 25, color: '#F39C12' },
    { department: 'Sales', budget: 20, color: '#48C9B0' },
    { department: 'Operations', budget: 10, color: '#E74C3C' }
  ];
}
```

### Using Palettes

Apply predefined color palettes to all slices:

```typescript
@Component({
  template: `
    <ejs-circularchart3d [palettes]="['#5DADE2', '#F39C12', '#48C9B0', '#E74C3C']">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class PaletteChartComponent {
  data = [
    { x: 'Item A', y: 30 },
    { x: 'Item B', y: 25 },
    { x: 'Item C', y: 20 },
    { x: 'Item D', y: 25 }
  ];
}
```

---

## Troubleshooting

**Pie not displaying as circle?**
- Verify chart container has equal width and height
- Check that `type="Pie"` is set correctly

**Donut appears as pie?**
- Ensure `innerRadius` is set to value > 0%
- Verify property binding syntax is correct

**Slices have wrong colors?**
- Check `pointColorMapping` property name matches data property
- Verify color values in data are valid hex or named colors

---
