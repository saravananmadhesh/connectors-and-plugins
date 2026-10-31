# Interactivity: Tooltips, Legends & Selection

## Table of Contents

- [Tooltip Configuration](#tooltip-configuration)
  - [Enable Tooltips](#enable-tooltips)
  - [Tooltip Customization](#tooltip-customization)
  - [Tooltip Properties](#tooltip-properties)
  - [Format Placeholders](#format-placeholders)
- [Tooltip Templates](#tooltip-templates)
  - [HTML Template](#html-template)
  - [Dynamic Template Based on Data](#dynamic-template-based-on-data)
- [Legend Setup](#legend-setup)
  - [Enable Legend](#enable-legend)
  - [Legend Positioning](#legend-positioning)
  - [Legend Customization](#legend-customization)
  - [Legend Properties](#legend-properties)
- [Legend Interactions](#legend-interactions)
  - [Toggle Series Visibility](#toggle-series-visibility)
  - [Legend Item Render Handler](#legend-item-render-handler)
- [Point Selection](#point-selection)
  - [Enable Point Selection](#enable-point-selection)
  - [Selection Styling](#selection-styling)
- [Advanced Interactivity](#advanced-interactivity)
  - [Highlight on Hover](#highlight-on-hover)
  - [Track User Interactions](#track-user-interactions)
- [Troubleshooting](#troubleshooting)

---

## Tooltip Configuration

### Enable Tooltips

Enable basic tooltip functionality:

```typescript
import { Component } from '@angular/core';
import { CircularChart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-tooltip-chart',
  standalone: true,
  imports: [
    CircularChart3DAllModule
  ],
  template: `
    <ejs-circularchart3d id="chart" [tooltip]="{ enable: true }">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="chartData" 
          xName="category" 
          yName="value" 
          type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class TooltipChartComponent {
  chartData = [
    { category: 'Product A', value: 35 },
    { category: 'Product B', value: 25 },
    { category: 'Product C', value: 40 }
  ];
}
```

### Tooltip Customization

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      [tooltip]="{
        enable: true,
        header: 'Sales Details',
        format: '<b>${point.x}</b>: ${point.y} units',
        fill: '#333',
        textStyle: { color: 'white', size: '14px' },
        border: { width: 1, color: '#ccc' },
        opacity: 0.9
      }">
      ...
    </ejs-circularchart3d>
  `
})
```

### Tooltip Properties

| Property | Type | Description |
|----------|------|-------------|
| `enable` | boolean | Enable/disable tooltips |
| `header` | string | Tooltip header text |
| `format` | string | Tooltip content format with placeholders |
| `fill` | string | Background color |
| `opacity` | number | Transparency (0-1) |
| `textStyle` | FontModel | Font size, color, family |
| `border` | BorderModel | Border color and width |
| `duration` | number | Tooltip display duration in ms |
| `enableAnimation` | boolean | Tooltip will animate while moving from one point to another |
| `enableMarker` | boolean | Enables the marker in the chart tooltip |
| `enableTextWrap` | boolean | To wrap the tooltip long text based on available space. This is only application for chart tooltip |
| `fadeOutDuration` | number | Duration of the fade-out animation for hiding the tooltip |
| `location` | LocationModel | Specifies the location of the tooltip, relative to the chart |
| `template` | string/Function | A custom template used to format the tooltip content. You can use ${x} and ${y} as placeholder text to display the corresponding data points |

### Format Placeholders

```typescript
tooltip = {
  format: '${series.name} : ${point.x} - ${point.y}'
  // ${series.name}: Series name
  // ${point.x}: X value
  // ${point.y}: Y value
  // ${point.percentage}: Percentage of total
  // ${point.index}: Point index
}
```
### Inline Tooltip Formatting

The Circular 3D Chart tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows point and series values to be formatted without using additional events.

Add a colon (`:`) followed by the required format specifier to a supported tooltip token.

```typescript
import { Component } from '@angular/core';
import { CircularChart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-tooltip-chart',
  standalone: true,
  imports: [
    CircularChart3DAllModule
  ],
  template: `
    <ejs-circularchart3d
      id="chart"
      [tooltip]="tooltip">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series
          [dataSource]="chartData"
          xName="category"
          yName="value"
          name="Sales"
          type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class TooltipChartComponent {
  public chartData: Object[] = [
    { category: 'Product A', value: 35.456 },
    { category: 'Product B', value: 25.782 },
    { category: 'Product C', value: 40.125 }
  ];

  public tooltip: Object = {
    enable: true,
    format: '${series.name}<br>' +
      '${point.x}: ${point.y:n2}'
  };
}
```

In this example:

- `${point.x}` displays the category value of the Circular 3D Chart point.
- `${point.y:n2}` formats the numeric point value with two decimal places.
- `${series.name}` displays the resolved Circular 3D Chart series name.

Inline formatting can be applied to the following Circular 3D Chart tooltip tokens:

- `point.x`: Specifies the category or x-value of the Circular 3D Chart point.
- `point.y`: Specifies the numeric y-value of the point.
- `point.percentage`: Specifies the percentage contribution of the point.
- `point.text`: Specifies the text mapped to the point when text mapping is configured.
- `point.tooltip`: Specifies the tooltip value mapped from the data source.
- `point.index`: Specifies the index of the point.
- `point.color`: Specifies the fill color applied to the point.
- `point.visible`: Specifies the visibility state of the point.
- `series.name`: Specifies the name assigned to the Circular 3D Chart series.
- `series.opacity`: Specifies the opacity applied to the Circular 3D Chart series.

> The availability of point-specific tokens depends on the Circular 3D Chart data source and series configuration. For example, `point.text` and `point.tooltip` require the corresponding field mappings. The `series.name` tokens return string values, so DateTime or number formatting is not applied to these tokens.

Supported DateTime format specifiers include:

- `MMM yyyy`: Abbreviated month and four-digit year.
- `MM:yy`: Two-digit month and two-digit year.
- `dd MMM`: Two-digit day and abbreviated month.

Supported number format specifiers include:

- `n2`: Number with two decimal places.
- `n0`: Number without decimal places.
- `c2`: Currency with two decimal places.
- `p1`: Percentage with one decimal place.
- `e1`: Exponential notation with one decimal place.

```typescript
public tooltip: Object = {
  enable: true,
  header: '${series.name}',
  format: 'Value: ${point.y:n2}<br>' +
    'Percentage: ${point.percentage:p1}<br>' +
    'Opacity: ${series.opacity:n2}'
};
```

In this example:

- `${point.y:n2}` formats the point value with two decimal places.
- `${point.percentage:p1}` formats the percentage contribution with one decimal place.
- `${series.opacity:n2}` formats the series opacity with two decimal places.

When the x-value contains DateTime data, a DateTime format can be specified directly in the `point.x` token.

```typescript
public chartData: Object[] = [
  { date: new Date(2024, 0, 1), value: 35 },
  { date: new Date(2024, 1, 1), value: 25 },
  { date: new Date(2024, 2, 1), value: 40 }
];

public tooltip: Object = {
  enable: true,
  format: '${point.x:MMM yyyy}: ${point.y:n2}'
};
```

```html
<ejs-circularchart3d [tooltip]="tooltip">
  <e-circularchart3d-series-collection>
    <e-circularchart3d-series
      [dataSource]="chartData"
      xName="date"
      yName="value"
      name="Sales"
      type="Pie">
    </e-circularchart3d-series>
  </e-circularchart3d-series-collection>
</ejs-circularchart3d>
```

In this example, `${point.x:MMM yyyy}` formats the DateTime category as an abbreviated month and four-digit year.

If a format specifier does not match the resolved value type, the original value is displayed.

Do not use Angular pipes inside the Circular 3D Chart tooltip `format` string. Use a supported inline format specifier, such as `${point.y:n2}`, or use the tooltip template or `tooltipRender` event for specialized formatting.

---

## Tooltip Templates

### HTML Template

Use HTML for rich tooltip content:

```typescript
import { Component, ViewChild } from '@angular/core';
import { CircularChart3DComponent } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-tooltip-template',
  standalone: true,
  imports: [CircularChart3DComponent],
  template: `
    <ejs-circularchart3d id="chart" #chart
      [tooltip]="{
        enable: true,
        template: tooltipTemplate
      }">
      ...
    </ejs-circularchart3d>
  `,
  styles: [`
    .tooltip-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px;
      border-radius: 8px;
      min-width: 200px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .tooltip-header {
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .tooltip-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .tooltip-row:last-child {
      border-bottom: none;
    }
  `]
})
export class TooltipTemplateComponent {
  tooltipTemplate = `
    <div class="tooltip-container">
      <div class="tooltip-header">${point.x}</div>
      <div class="tooltip-row">
        <span>Value:</span>
        <strong>${point.y}</strong>
      </div>
      <div class="tooltip-row">
        <span>Percentage:</span>
        <strong>${point.percentage}%</strong>
      </div>
    </div>
  `;

  chartData = [
    { x: 'Product A', y: 35 },
    { x: 'Product B', y: 25 },
    { x: 'Product C', y: 40 }
  ];
}
```

### Dynamic Template Based on Data

```typescript
@Component({
  template: `
    <ejs-circularchart3d [tooltip]="tooltipSettings">
      ...
    </ejs-circularchart3d>
  `
})
export class DynamicTooltipComponent {
  tooltipSettings = {
    enable: true,
    template: this.getTooltipTemplate()
  };

  getTooltipTemplate() {
    return `
      <div style="padding: 10px; background: #f9f9f9; border-radius: 4px;">
        <p><strong>${point.x}</strong></p>
        <p>Count: ${point.y}</p>
        <p style="color: #666; font-size: 12px;">
          ${point.percentage}% of total
        </p>
      </div>
    `;
  }
}
```

---

## Legend Setup

### Enable Legend

Display legend showing all series:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      [legendSettings]="{ visible: true, position: 'Bottom' }">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Pie"
          name="Sales">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class LegendChartComponent {
  data = [
    { x: 'Q1', y: 25 },
    { x: 'Q2', y: 28 },
    { x: 'Q3', y: 22 },
    { x: 'Q4', y: 25 }
  ];
}
```

### Legend Positioning

```typescript
legendSettings = {
  visible: true,
  position: 'Bottom'        // 'Bottom', 'Top', 'Left', 'Right'
}

// Positions:
// - 'Top': Above chart
// - 'Bottom': Below chart (default)
// - 'Left': Left side
// - 'Right': Right side
```

### Legend Customization

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      [legendSettings]="{
        visible: true,
        position: 'Right',
        width: '200px',
        height: 'auto',
        alignment: 'Center',
        background: '#f5f5f5',
        border: { width: 1, color: '#ddd' },
        itemPadding: 12,
        textStyle: { 
          fontFamily: 'Arial',
          size: '13px',
          color: '#333'
        },
        toggleVisibility: true
      }">
      ...
    </ejs-circularchart3d>
  `
})
```

### Legend Properties

| Property | Type | Description |
|----------|------|-------------|
| `visible` | boolean | Show/hide legend |
| `position` | LegendPosition | Legend location |
| `width` | string | Legend width |
| `height` | string | Legend height |
| `alignment` | string | Legend alignment (Center, Near, Far) |
| `background` | string | Background color |
| `itemPadding` | number | Space between items |
| `toggleVisibility` | boolean | Click legend to toggle series |
| `textStyle` | FontModel | Font styling |
| `border` | BorderModel | Legend border |
| `containerPadding ` | ContainerPaddingModel | Options to customize left, right, top and bottom padding for legend container of the chart. |
| `description` | string | Description for legends |
| `enableHighlight` | boolean | The series get highlighted, while hovering the legend |
| `enablePages` | boolean | Legend will be visible using pages |
| `isInversed ` | boolean | Inverses legend item content (image and text) |
| `location` | LocationModel | Specifies the location of the legend, relative to the chart |
| `margin` | MarginModel | Options to customize left, right, top and bottom margins of the chart |
| `maximumLabelWidth ` | number | Minimum label width for the legend text |
| `maximumTitleWidth ` | number | Maximum width for the legend title |
| `opacity` | number | Opacity of the legend |
| `padding` | number | Option to customize the padding around the legend items |
| `reverse` | boolean | Reverses the order of legend items |
| `shapeHeight` | number | Shape height of the legend in pixels |
| `shapePadding` | number | Padding between the legend shape and text |
| `shapeWidth` | number | Shape width of the legend in pixels |
| `tabIndex ` | number | TabIndex value for the legend |
| `textOverflow` | LabelOverflow | Defines the text overflow behavior to employ when the individual legend text overflows |
| `textWrap` | TextWrap | Defines the text wrap behavior to employ when the individual legend text overflows |
| `title` | string | Title for legends |
| `titlePosition` | LegendTitlePosition | Legend title position |
| `titleStyle` | FontModel | Options to customize the legend title |


---

## Legend Interactions

### Toggle Series Visibility

Allow users to show/hide series by clicking legend:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      [legendSettings]="{
        visible: true,
        toggleVisibility: true
      }">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="series1Data" 
          name="Series 1"
          type="Pie">
        </e-circularchart3d-series>
        <e-circularchart3d-series 
          [dataSource]="series2Data" 
          name="Series 2"
          type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class ToggleLegendComponent {
  series1Data = [{ x: 'A', y: 30 }];
  series2Data = [{ x: 'B', y: 25 }];
}
```

### Legend Item Render Handler

Handle legend item selection:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      (legendItemRender)="onLegendItemRender($event)"
      [legendSettings]="{ visible: true }">
      ...
    </ejs-circularchart3d>
  `
})
export class LegendRenderComponent {
  onLegendItemRender(args: any) {
    // args.text: Legend item text
    // args.fill: Legend color
    // args.shape: Legend shape
    console.log('Legend item Rendered:', args.text);
  }
}
```

---

## Point Selection

### Enable Point Selection

Allow users to click and select points:

```typescript
import { Component, ViewChild } from '@angular/core';
import { CircularChart3DComponent } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [CircularChart3DComponent],
  template: `
    <div>
      <p>Selected Points: {{ selectedPoints }}</p>
      <ejs-circularchart3d id="chart" #chart
        [selectionMode]="'Point'"
        (pointRender)="onPointRender($event)">
        <e-circularchart3d-series-collection>
          <e-circularchart3d-series 
            [dataSource]="data" 
            xName="x" 
            yName="y" 
            type="Pie">
          </e-circularchart3d-series>
        </e-circularchart3d-series-collection>
      </ejs-circularchart3d>
    </div>
  `
})
export class PointSelectionComponent {
  @ViewChild('chart')
  chart!: CircularChart3DComponent;

  selectedPoints: string[] = [];

  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 },
    { x: 'D', y: 25 }
  ];

  onPointRender(args: any) {
    if (args.point.isSelected) {
      this.selectedPoints.push(args.point.x);
    }
  }
}
```

### Selection Styling

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      [selectionMode]="'Point'"
      [pointRender]="pointRenderSettings">
      ...
    </ejs-circularchart3d>
  `
})
export class SelectionStyleComponent {
  pointRenderSettings = {
    border: {
      color: '#333',
      width: 2
    },
    opacity: 0.8
  };
}
```

---

## Advanced Interactivity

### Highlight on Hover

Highlight points when hovering:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      id="chart-container"
      [highlightMode]="'Point'" 
      [highlightPattern]="'DiagonalForward'">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="chartData" 
          xName="x" 
          yName="y">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class HoverHighlightComponent {
  public chartData: Object[] = [
    { x: 'Tesla', y: 137429 },
    { x: 'Aion', y: 80308 },
    { x: 'Wuling', y: 76418 }
  ];
}
```

### Track User Interactions

Monitor and respond to chart events:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      (pointRender)="onPointRender($event)"
      (seriesRender)="onSeriesRender($event)"
      (chartMouseClick)="onChartClick($event)">
      ...
    </ejs-circularchart3d>
  `
})
export class InteractionTrackingComponent {
  onPointRender(args: any) {
    console.log('Point rendered:', args.point.x, args.point.y);
  }

  onSeriesRender(args: any) {
    console.log('Series rendered:', args.series.name);
  }

  onChartClick(args: any) {
    console.log('Chart clicked at:', args.pageX, args.pageY);
  }
}
```

---

## Troubleshooting

**Tooltips not showing?**
- Verify `CircularChartTooltip3DService` is provided
- Check that `tooltip.enable: true`
- Ensure `(pointRender)` event is bound correctly

**Legend not displaying?**
- Set `legendSettings.visible: true`
- Ensure series have `name` property
- Check `legendSettings.position` value

**Selection not working?**
- Verify `selectionMode` is set (e.g., 'Point')
- Check that click handler is properly bound
- Ensure point event listeners are attached

---

