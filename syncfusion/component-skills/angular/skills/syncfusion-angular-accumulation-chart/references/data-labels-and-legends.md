# Data Labels and Legends

This guide explains how to use **data labels** and **legends** in the **Syncfusion Angular Accumulation Chart** (Pie / Doughnut / Funnel / Pyramid), including:

- Enabling data labels
- Positioning and formatting labels
- Using label templates
- Configuring legends
- Customizing legend layout and appearance
- Handling label and legend events

---

## Table of Contents

- [Required Imports and Providers](#required-imports-and-providers)
- [Data Labels Overview](#data-labels-overview)
- [Label Positioning](#label-positioning)
- [Label Formatting](#label-formatting)
- [Label Templates](#label-templates)
- [Legends](#legends)
- [Legend Customization](#legend-customization)
- [Legend Events](#legend-events)
- [Combining Labels and Legends](#combining-labels-and-legends)
- [Key Takeaways](#key-takeaways)
- [API Reference Summary](#api-reference-summary)

---

## Required Imports and Providers

For **Pie** and **Doughnut** accumulation charts, use `PieSeriesService`. For **Funnel**, use `FunnelSeriesService`. For **Pyramid**, use `PyramidSeriesService`. To enable **data labels**, inject `AccumulationDataLabelService`. To enable **legends**, inject `AccumulationLegendService`. Syncfusion’s Angular examples for data labels and legends show these provider patterns directly.

### Base setup for Pie / Doughnut with Data Labels + Legend

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService,
  AccumulationLegendService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [AccumulationChartModule],
  providers: [
    PieSeriesService,
    AccumulationDataLabelService,
    AccumulationLegendService
  ],
  template: `
    <ejs-accumulationchart [legendSettings]="legendSettings">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y"
          [dataLabel]="dataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class AppComponent {
  public data = [
    { x: 'North', y: 12000 },
    { x: 'South', y: 15000 },
    { x: 'East', y: 10000 },
    { x: 'West', y: 8000 }
  ];

  public dataLabel = {
    visible: true
  };

  public legendSettings = {
    visible: true
  };
}
```

---

## Data Labels Overview

Data labels display information about each data point directly on the chart. The  data labels are enabled through the series-level `dataLabel` property and require `AccumulationDataLabelService` in Angular providers. 

### Enable Data Labels

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-data-label-basic',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService],
  template: `
    <ejs-accumulationchart>
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y"
          type="Pie"
          [dataLabel]="{ visible: true }">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class DataLabelBasicComponent {
  public data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];
}
```

### Label Content Options

The `name` property lets you show a field from the data source, while `format` supports formatted text.

```typescript
// Show values from data source field
[dataLabel]="{ visible: true, name: 'y' }"

// Show categories
[dataLabel]="{ visible: true, name: 'x' }"

// Show custom field
[dataLabel]="{ visible: true, name: 'customField' }"

// Show percentage
[dataLabel]="{ visible: true, format: '${point.y}%' }"

// Show numeric formatting
[dataLabel]="{ visible: true, format: 'n2' }"
```


## Label Positioning

The accumulation data label API supports `position: 'Inside' | 'Outside'`, and the documentation explicitly states that accumulation chart labels can be placed either inside or outside the chart.

### Inside Position

```typescript
public dataLabel = {
  visible: true,
  position: 'Inside'
};
```

Inside labels are useful when you want compact labels placed directly inside slices or segments.

### Outside Position

```typescript
public dataLabel = {
  visible: true,
  position: 'Outside'
};
```

Outside labels are useful when you want clearer labeling for crowded pie or doughnut charts.

### Smart Labels

`enableSmartLabels` is a chart-level property that arranges labels to avoid overlap. 

```typescript
@Component({
  standalone: true,
  selector: 'app-smart-labels',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService],
  template: `
    <ejs-accumulationchart [enableSmartLabels]="true">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y"
          [dataLabel]="dataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class SmartLabelsComponent {
  public data = [
    { x: 'Alpha', y: 30, text: 'Alpha' },
    { x: 'Beta', y: 25, text: 'Beta' },
    { x: 'Gamma', y: 20, text: 'Gamma' },
    { x: 'Delta', y: 15, text: 'Delta' },
    { x: 'Epsilon', y: 10, text: 'Epsilon' }
  ];

  public dataLabel = {
    visible: true,
    position: 'Outside',
    name: 'text'
  };
}
```

### Pyramid / Funnel Labels

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PyramidSeriesService,
  AccumulationDataLabelService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-pyramid-labels',
  imports: [AccumulationChartModule],
  providers: [
    PyramidSeriesService,
    AccumulationDataLabelService
  ],
  template: `
    <ejs-accumulationchart>
      <e-accumulation-series-collection>
        <e-accumulation-series
          type="Pyramid"
          [dataSource]="data"
          xName="stage"
          yName="value"
          [dataLabel]="dataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class PyramidLabelsComponent {
  public data = [
    { stage: 'Leads', value: 100 },
    { stage: 'Qualified', value: 70 },
    { stage: 'Proposal', value: 40 },
    { stage: 'Won', value: 20 }
  ];

  public dataLabel = {
    visible: true,
    position: 'Inside',
    name: 'stage'
  };
}
```

---

## Label Formatting

### Numeric formatting

```typescript
public dataLabel = {
  visible: true,
  format: 'n2'
};
```

### Percentage labels using `textRender`

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService,
  IAccTextRenderEventArgs
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-percentage-labels',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService],
  template: `
    <ejs-accumulationchart (textRender)="onTextRender($event)">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y"
          [dataLabel]="{ visible: true }">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class PercentageLabelsComponent {
  public data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 45 }
  ];

  onTextRender(args: IAccTextRenderEventArgs): void {
    args.text = `${args.point.percentage}%`;
  }
}
```
**Note**: `IAccTextRenderEventArgs` is the correct event argument interface to use for accumulation chart text render events.


### Rotated labels

```typescript
public dataLabel = {
  visible: true,
  angle: 90,
  enableRotation: true
};
```

### Text wrapping

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService],
  template: `
    <ejs-accumulationchart id="chart-container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="pieData"
          xName="x"
          yName="y"
          type="Pie"
          [dataLabel]="dataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})

export class AppComponent {
  public pieData = [
    { x: 'January sales performance', y: 18, text: 'January sales performance' },
    { x: 'February regional growth', y: 23, text: 'February regional growth' },
    { x: 'March marketing campaign results', y: 29, text: 'March marketing campaign results' }
  ];

  public dataLabel = {
    visible: true,
    position: 'Inside',
    maxWidth: 100,
    textWrap: 'Wrap',
    name: 'text',
    enableRotation: true
  };
}
```

---

## Label Templates

### Template example

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-label-template',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService],
  template: `
    <ejs-accumulationchart [enableSmartLabels]="true">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y"
          [dataLabel]="dataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class LabelTemplateComponent {
  public data = [
    { x: 'Chrome', y: 61.3, text: 'Chrome' },
    { x: 'Safari', y: 24.6, text: 'Safari' },
    { x: 'Edge', y: 5.0, text: 'Edge' }
  ];

  public dataLabel = {
    visible: true,
    name: 'text',
    position: 'Outside',
    template: '<div>${point.x}</div><div>${point.y}</div>'
  };
}
```

### Customizing labels with `textRender`

```typescript
onTextRender(args: IAccTextRenderEventArgs): void {
  if (args.point.y > 20) {
    args.color = '#ffffff';
    args.border.width = 1;
  }
}
```

### Connector style for outside labels

When labels are outside the chart, `connectorStyle` can control the connector line. 

```typescript
public dataLabel = {
  visible: true,
  name: 'text',
  position: 'Outside',
  connectorStyle: {
    length: '50px',
    width: 2,
    dashArray: '5,3',
    color: '#f4429e',
    type: 'Curve'
  }
};
```

---

## Legends

In an accumulation chart, the legend is configured with the chart-level `legendSettings` property. 

### Basic legend

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationLegendService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-legend-basic',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationLegendService],
  template: `
    <ejs-accumulationchart [legendSettings]="legendSettings">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class LegendBasicComponent {
  public data = [
    { x: 'North', y: 12000 },
    { x: 'South', y: 15000 },
    { x: 'East', y: 10000 }
  ];

  public legendSettings = {
    visible: true
  };
}
```

### Legend properties

```typescript
public legendSettings = {
  visible: true,
  position: 'Right',
  alignment: 'Center',
  toggleVisibility: true,
  enableHighlight: true,
  width: '200px',
  height: '100px'
};
```

### Legend shape

```typescript
<e-accumulation-series
  [dataSource]="data"
  xName="x"
  yName="y"
  legendShape="Rectangle">
</e-accumulation-series>
```

---

## Data Labels with `mappingKey` for Multiple Pie Series

When working with multiple Pie or Doughnut series, you can add a custom field such as `mappingKey` to each data source. This field identifies the source series and can be used in data labels, templates, and the `textRender` event.

> **Note:** `mappingKey` is not a built-in Syncfusion Accumulation Chart property. It is a custom data-source field that can be referenced through `dataLabel.name`, label templates, or render events.

### Complete Example

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService,
  AccumulationLegendService,
  IAccTextRenderEventArgs
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-multiple-pie-series',
  imports: [AccumulationChartModule],
  providers: [
    PieSeriesService,
    AccumulationDataLabelService,
    AccumulationLegendService
  ],
  template: `
    <ejs-accumulationchart
      id="multiple-pie-series"
      [enableSmartLabels]="true"
      [legendSettings]="legendSettings"
      (textRender)="onTextRender($event)">

      <e-accumulation-series-collection>
        <e-accumulation-series
          type="Pie"
          radius="70%"
          [dataSource]="salesData"
          xName="x"
          yName="y"
          [dataLabel]="salesDataLabel">
        </e-accumulation-series>

        <e-accumulation-series
          type="Pie"
          radius="45%"
          [dataSource]="profitData"
          xName="x"
          yName="y"
          [dataLabel]="profitDataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class MultiplePieSeriesComponent {
  public salesData = [
    { x: 'North', y: 35, mappingKey: 'Sales' },
    { x: 'South', y: 25, mappingKey: 'Sales' },
    { x: 'East', y: 20, mappingKey: 'Sales' },
    { x: 'West', y: 20, mappingKey: 'Sales' }
  ];

  public profitData = [
    { x: 'North', y: 15, mappingKey: 'Profit' },
    { x: 'South', y: 20, mappingKey: 'Profit' },
    { x: 'East', y: 10, mappingKey: 'Profit' },
    { x: 'West', y: 12, mappingKey: 'Profit' }
  ];

  public salesDataLabel = {
    visible: true,
    position: 'Outside',
    name: 'mappingKey',
    template:
      '<div><b>${point.mappingKey}</b></div>' +
      '<div>${point.x}: ${point.y}</div>'
  };

  public profitDataLabel = {
    visible: true,
    position: 'Inside',
    name: 'mappingKey'
  };

  public legendSettings = {
    visible: true,
    position: 'Right'
  };

  public onTextRender(args: IAccTextRenderEventArgs): void {
    const point = args.point as unknown as {
      x: string;
      y: number;
      mappingKey?: string;
    };

    if (point.mappingKey) {
      args.text = `${point.mappingKey} - ${point.x}: ${point.y}`;
    }
  }
}
```

### Mapping Key Usage

The custom `mappingKey` field can be used in three ways.

#### Use the Mapping Key as the Label Text

```typescript
public dataLabel = {
  visible: true,
  position: 'Inside',
  name: 'mappingKey'
};
```

The `name` property maps the data label text directly to the specified data-source field.

#### Use the Mapping Key in a Label Template

```typescript
public dataLabel = {
  visible: true,
  position: 'Outside',
  template:
    '<div><b>${point.mappingKey}</b></div>' +
    '<div>${point.x}: ${point.y}</div>'
};
```

The template can display the mapping key together with the category and value.

#### Use the Mapping Key in `textRender`

```typescript
public onTextRender(args: IAccTextRenderEventArgs): void {
  const point = args.point as unknown as {
    x: string;
    y: number;
    mappingKey?: string;
  };

  if (point.mappingKey) {
    args.text = `${point.mappingKey} - ${point.x}: ${point.y}`;
  }
}
```

The `textRender` event provides additional control when label text must be generated dynamically.

### Example Label Output

```text
Sales - North: 35
Sales - South: 25
Profit - North: 15
Profit - South: 20
```

### Key Considerations

- `mappingKey` is a custom field defined in the data source.
- Use `dataLabel.name` when the label should display only the mapped field.
- Use `dataLabel.template` when the label should display multiple fields.
- Use `textRender` when the label requires conditional or dynamic formatting.
- Inject `AccumulationDataLabelService` to enable data labels.
- Inject `AccumulationLegendService` when legends are enabled.
- Place `[enableSmartLabels]` on `<ejs-accumulationchart>`, not on `<e-accumulation-series>`.

---

## Legend Customization

### Position and alignment

```typescript
public legendSettings = {
  visible: true,
  position: 'Top',
  alignment: 'Near'
};
```

Legend support `Top`, `Bottom`, `Left`, `Right`, and `Custom` positions, plus `Near`, `Center`, and `Far` alignment.

### Reverse legend order

```typescript
public legendSettings = {
  visible: true,
  reverse: true
};
```

### Legend size and border

```typescript
public legendSettings = {
  width: '150',
  height: '100',
  border: { width: 1, color: 'pink' }
};
```

### Legend item size

```typescript
public legendSettings = {
  shapeHeight: 15,
  shapeWidth: 15
};
```

### Legend text wrap

```typescript
public legendSettings = {
  visible: true,
  position: 'Right',
  textWrap: 'Wrap',
  maximumLabelWidth: 60,
  height: '44%',
  width: '64%'
};
```

### Legend title

```typescript
public legendSettings = {
  title: 'Months',
  position: 'Bottom'
};
```

### Legend layout

```typescript
public legendSettings = {
  visible: true,
  layout: 'Auto',
  maximumColumns: 3,
  fixedWidth: true
};
```

### Custom legend template

```typescript
public legendSettings = {
  visible: true,
  template: '<div><span>${x}</span></div>'
};
```

---

## Legend Events

### `legendRender`

Use `legendRender` to customize legend appearance before rendering.

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationLegendService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-legend-render',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationLegendService],
  template: `
    <ejs-accumulationchart
      [legendSettings]="legendSettings"
      (legendRender)="onLegendRender($event)">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class LegendRenderComponent {
  public data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];

  public legendSettings = {
    visible: true
  };

  onLegendRender(args: ILegendRenderEventArgs): void {
    args.text = `${args.text} (Custom)`;
  }
}
```

### `legendClick`

Use `legendClick` to respond to legend interactions. 

```typescript
@Component({
  standalone: true,
  selector: 'app-legend-click',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationLegendService],
  template: `
    <ejs-accumulationchart
      [legendSettings]="legendSettings"
      (legendClick)="onLegendClick($event)">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class LegendClickComponent {
  public data = [
    { x: 'North', y: 12000 },
    { x: 'South', y: 15000 },
    { x: 'East', y: 10000 }
  ];

  public legendSettings = {
    visible: true,
    toggleVisibility: true
  };

  onLegendClick(args: IAccLegendClickEventArgs): void {
    console.log('Legend clicked:', args);
  }
}
```

---

## Combining Labels and Legends

### Complete example: labels + legend

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService,
  AccumulationLegendService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-sales-chart',
  imports: [AccumulationChartModule],
  providers: [
    PieSeriesService,
    AccumulationDataLabelService,
    AccumulationLegendService
  ],
  template: `
    <ejs-accumulationchart
      id="container"
      [title]="'Sales by Region'"
      [legendSettings]="legendSettings"
      (legendRender)="onLegendRender($event)">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="salesData"
          xName="region"
          yName="sales"
          type="Pie"
          [dataLabel]="dataLabel"
          legendShape="Rectangle">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `,
  styles: [`
    #container {
      height: 420px;
    }
  `]
})
export class SalesChartComponent {
  public salesData = [
    { region: 'North', sales: 12000 },
    { region: 'South', sales: 15000 },
    { region: 'East', sales: 10000 },
    { region: 'West', sales: 8000 }
  ];

  public legendSettings = {
    visible: true,
    position: 'Right',
    enableHighlight: true
  };

  public dataLabel = {
    visible: true,
    position: 'Inside'
  };

  onLegendRender(args: ILegendRenderEventArgs): void {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
    if (args.pointIndex != null) {
      args.fill = colors[args.pointIndex % colors.length];
    }
  }
}
```

### Multi-level information display

```typescript
@Component({
  standalone: true,
  selector: 'app-product-performance',
  imports: [AccumulationChartModule],
  providers: [
    PieSeriesService,
    AccumulationDataLabelService,
    AccumulationLegendService
  ],
  template: `
    <ejs-accumulationchart
      [title]="'Product Performance'"
      [legendSettings]="legendSettings">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          type="Pie"
          innerRadius="55%"
          xName="x"
          yName="y"
          [dataLabel]="dataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class ProductPerformanceComponent {
  public data = [
    { x: 'Product A', y: 35, text: '35 units' },
    { x: 'Product B', y: 25, text: '25 units' },
    { x: 'Product C', y: 20, text: '20 units' },
    { x: 'Product D', y: 20, text: '20 units' }
  ];

  public legendSettings = {
    visible: true,
    position: 'Right'
  };

  public dataLabel = {
    visible: true,
    position: 'Inside',
    name: 'text'
  };
}
```

---

## Smart Labels

Smart labels automatically arrange Outside data labels so they do not overlap each other. This is especially useful for pie/doughnut charts with many segments where labels would otherwise collide.

### ⚠️ CRITICAL: `enableSmartLabels` belongs on `<ejs-accumulationchart>`, NOT on `<e-accumulation-series>`

This is the most common mistake. Because smart label rearrangement is a **chart-level** layout pass, the property must go on the **host chart component**.

```html
<!-- ✅ CORRECT — on ejs-accumulationchart -->
<ejs-accumulationchart [enableSmartLabels]="true" [tooltip]="tooltip" [legendSettings]="legend">
  <e-accumulation-series-collection>
    <e-accumulation-series [dataSource]="data" xName="x" yName="y" [dataLabel]="dataLabel">
    </e-accumulation-series>
  </e-accumulation-series-collection>
</ejs-accumulationchart>

<!-- ❌ WRONG — causes NG8002 in strict mode -->
<ejs-accumulationchart>
  <e-accumulation-series-collection>
    <e-accumulation-series [enableSmartLabels]="true" [dataSource]="data" ...>
    </e-accumulation-series>
  </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Error when placed on `<e-accumulation-series>`

```
NG8002: Can't bind to 'enableSmartLabels' since it isn't a known property of 'e-accumulation-series'.
```

**Root cause:** `enableSmartLabels` is not an `@Input()` on `AccumulationSeries`. It is an `@Input()` on `AccumulationChart` (the host `ejs-accumulationchart` element).

### Complete Smart Labels Example

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService],
  template: `
    <ejs-accumulationchart
      id="chart-container"
      [enableSmartLabels]="true">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="piedata"
          xName="x"
          yName="y"
          [dataLabel]="datalabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class AppComponent {
  public piedata = [
    { x: 'Cardiology',       y: 1420 },
    { x: 'Orthopedics',      y: 980  },
    { x: 'Neurology',        y: 860  },
    { x: 'Pediatrics',       y: 1105 },
    { x: 'General Medicine', y: 720  }
  ];

  public datalabel = {
    visible: true,
    name: 'text',
    position: 'Outside'
  };
}
```

### Property Location Quick Reference

| Property | Belongs on | Type | Notes |
|---|---|---|---|
| `[enableSmartLabels]` | `<ejs-accumulationchart>` | `boolean` | Chart-level layout pass — prevents label overlap |
| `[dataLabel]` | `<e-accumulation-series>` | `Object` | Per-series label config |
| `[legendSettings]` | `<ejs-accumulationchart>` | `Object` | Chart-level legend config |
| `[tooltip]` | `<ejs-accumulationchart>` | `Object` | Chart-level tooltip config |

---

## Key Takeaways

- **Labels**: Display data point information directly on chart
- **Positioning**: Use Inside/Outside based on chart complexity
- **Smart Labels**: Enable `[enableSmartLabels]="true"` on `<ejs-accumulationchart>` to prevent label overlap — **never on `<e-accumulation-series>`**
- **Formatting**: Use format strings and render events for customization
- **Legends**: Identify series/categories with visual markers
- **Interaction**: Enable legend highlighting and click handling
- **Best Practice**: Use both labels and legends for comprehensive data visualization

---

## API Reference Summary

### Chart-Level Label APIs (on `<ejs-accumulationchart>`)

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `enableSmartLabels` | ⚠️ **Chart-level** — auto-arrange Outside labels to prevent overlap. Goes on `<ejs-accumulationchart>`, NOT on `<e-accumulation-series>` | [enableSmartLabels](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#enablesmartlabels) |

### Data Label APIs (on `<e-accumulation-series>` via `[dataLabel]`)

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `AccumulationDataLabelSettings` | Data label configuration model | [AccumulationDataLabelSettings](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings) |
| `visible` | Show/hide data labels | [visible](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#visible) |
| `position` | Label position (Inside/Outside) | [position](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#position) |
| `name` | Data field for label text | [name](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#name) |
| `template` | Custom label template | [template](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#template) |
| `connectorStyle` | Connector line styling | [connectorStyle](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#connectorstyle) |
| `font` | Label font settings | [font](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#font) |
| `border` | Label border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#border) |

### Legend APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `LegendSettings` | Legend configuration model | [LegendSettings](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings) |
| `visible` | Show/hide legend | [visible](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#visible) |
| `position` | Legend position (Top/Bottom/Left/Right) | [position](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#position) |
| `alignment` | Legend alignment | [alignment](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#alignment) |
| `toggleVisibility` | Enable legend click toggle | [toggleVisibility](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#togglevisibility) |
| `textStyle` | Legend text styling | [textStyle](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#textstyle) |

### Events

| Event | Description | Documentation Link |
|-------|-------------|-------------------|
| `textRender` | Fires before text renders | [textRender](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/index-default#textrender) |
| `legendRender` | Fires before legend renders | [legendRender](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/index-default#legendrender) |
| `legendClick` | Fires on legend click | [legendClick](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/index-default#legendclick) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)