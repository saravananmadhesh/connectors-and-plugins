# Features & Interaction

## Table of Contents

- [Features & Interaction](#features--interaction)
  - [Overview](#overview)
  - [Module Injection](#module-injection)
  - [Tooltips](#tooltips)
    - [Enable Tooltips](#enable-tooltips)
    - [Tooltip Formatting](#tooltip-formatting)
    - [Inline Tooltip Formatting](#inline-tooltip-formatting)
    - [Financial Series Tooltip](#financial-series-tooltip)
    - [Tooltip Appearance](#tooltip-appearance)
    - [Shared Tooltip](#shared-tooltip)
    - [Tooltip Template](#tooltip-template)
  - [Crosshair and Trackball](#crosshair-and-trackball)
    - [Enable Crosshair](#enable-crosshair)
    - [Crosshair Axis Tooltips](#crosshair-axis-tooltips)
    - [Trackball-Style Interaction](#trackball-style-interaction)
  - [Legend](#legend)
    - [Enable and Position the Legend](#enable-and-position-the-legend)
    - [Legend Styling](#legend-styling)
    - [Legend Spacing](#legend-spacing)
    - [Interactive Legend](#interactive-legend)
    - [Custom Legend Position](#custom-legend-position)
  - [Selection](#selection)
    - [Point Selection](#point-selection)
    - [Series Selection](#series-selection)
    - [Cluster Selection](#cluster-selection)
    - [Multiple Selection](#multiple-selection)
    - [Initial Selection](#initial-selection)
    - [Selection Events](#selection-events)
    - [Conditional Point Styling](#conditional-point-styling)
  - [Zooming and Panning](#zooming-and-panning)
    - [Enable Selection Zooming](#enable-selection-zooming)
    - [Mouse-Wheel and Pinch Zooming](#mouse-wheel-and-pinch-zooming)
    - [Panning](#panning)
    - [Zoom Toolbar](#zoom-toolbar)
    - [Programmatic Zoom](#programmatic-zoom)
    - [Reset Zoom](#reset-zoom)


## Overview

The EJ2 Chart supports tooltips, crosshairs, trackball-style shared tooltips, legends, highlighting, point and series selection, zooming, panning, annotations, and interaction events. These features are provided through separate modules that must be injected before the corresponding feature is enabled.

The Chart package supports interactive features such as zooming, tooltips, selection, crosshairs, trackballs, and annotations.

## Module Injection

Import and inject the modules required by the configured series and interactive features.

```typescript
import {
  Category,
  Chart,
  ChartAnnotation,
  ColumnSeries,
  Crosshair,
  Highlight,
  Legend,
  LineSeries,
  Selection,
  Tooltip,
  Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  ColumnSeries,
  Category,
  Tooltip,
  Crosshair,
  Legend,
  Highlight,
  Selection,
  Zoom,
  ChartAnnotation
);
```

The modules provide:

- `Tooltip` for point and shared tooltips.
- `Crosshair` for horizontal and vertical crosshair lines.
- `Legend` for chart legends.
- `Highlight` for series and legend highlighting.
- `Selection` for point, series, and cluster selection.
- `Zoom` for selection, mouse-wheel, pinch, and toolbar zooming.
- `ChartAnnotation` for HTML annotations.
- `Category` for Category axes.
- `LineSeries` for Line series.
- `ColumnSeries` for Column series.

Inject only the modules used by the Chart.

## Tooltips

### Enable Tooltips

Import and inject `Tooltip`, then set `tooltip.enable` to `true`.

```typescript
import {
  Chart,
  LineSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Tooltip
);

const chart: Chart = new Chart({
  tooltip: {
    enable: true
  },
  series: [
    {
      dataSource: chartData,
      xName: 'x',
      yName: 'y',
      type: 'Line',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Tooltip Formatting

Use `format` to control the tooltip content.

```typescript
tooltip: {
  enable: true,
  format:
    '<b>${point.x}</b><br>' +
    '${series.name}: ${point.y:n2}'
}
```

Common tooltip tokens include:

- `${point.x}`
- `${point.y}`
- `${series.name}`
- `${series.type}`
- `${series.opacity}`

Use normal HTML inside the TypeScript or JavaScript string.

Correct:

```typescript
format:
  '<b>${point.x}</b><br>' +
  '${series.name}: ${point.y:n2}'
```

Do not leave HTML entities such as `<b>` inside executable TypeScript or JavaScript code.

### Inline Tooltip Formatting

Tooltip values can be formatted directly by adding a format specifier to supported tokens.

```typescript
tooltip: {
  enable: true,
  format:
    '<b>${series.name}</b><br>' +
    '${point.x:MMM yyyy}: ${point.y:n2}<br>' +
    'Opacity: ${series.opacity:n1}'
}
```

In this example:

- `${point.x:MMM yyyy}` formats a compatible DateTime X-value.
- `${point.y:n2}` displays the Y-value with two decimal places.
- `${series.opacity:n1}` displays the opacity with one decimal place.

Common DateTime formats include:

- `MMM yyyy`
- `MM/yy`
- `dd MMM`
- `dd MMM yyyy`
- `HH:mm`

Common number formats include:

- `n2` for two decimal places.
- `n0` for no decimal places.
- `c2` for currency with two decimal places.
- `p1` for percentage with one decimal place.
- `e1` for exponential notation with one decimal place.

Use DateTime formatting only when the resolved value is a valid DateTime value.

Use numeric formatting only when the resolved value is numeric.

### Financial Series Tooltip

Financial series can display open, high, low, and close values.

```typescript
tooltip: {
  enable: true,
  format:
    '<b>${point.x:dd MMM}</b><br>' +
    'Open: ${point.open:n2}<br>' +
    'High: ${point.high:n2}<br>' +
    'Low: ${point.low:n2}<br>' +
    'Close: ${point.close:n2}<br>' +
    'Volume: ${point.volume:n0}'
}
```

The availability of a point token depends on the configured series type and field mappings.

For example:

- `${point.open}` requires an `open` mapping.
- `${point.high}` requires a `high` mapping.
- `${point.low}` requires a `low` mapping.
- `${point.close}` requires a `close` mapping.
- `${point.volume}` requires compatible volume data.

### Tooltip Appearance

Use `fill`, `border`, `opacity`, `textStyle`, and animation settings to customize tooltip appearance.

```typescript
tooltip: {
  enable: true,
  enableAnimation: true,
  duration: 300,
  fadeOutDuration: 1000,
  fill: '#FFFFFF',
  opacity: 0.95,
  border: {
    color: '#808080',
    width: 1
  },
  textStyle: {
    color: '#242424',
    fontFamily: 'Segoe UI',
    size: '12px',
    fontWeight: '400'
  },
  format:
    '<b>${series.name}</b><br>' +
    '${point.x}: ${point.y:n2}'
}
```

Do not configure an unverified tooltip `padding` object.

Do not use generic values such as `Light` or `Dark` for `tooltip.theme` unless they are explicitly supported by the installed EJ2 version. Prefer the chart theme together with `fill`, `border`, and `textStyle`.

### Shared Tooltip

Set `shared` to `true` to display values from multiple series for the same X-position.

```typescript
tooltip: {
  enable: true,
  shared: true,
  format:
    '<b>${point.x}</b><br>' +
    '${series.name}: ${point.y:n2}'
}
```

A shared tooltip works best when related series contain compatible X-values.

### Tooltip Template

Use `template` when custom HTML content is required.

```typescript
tooltip: {
  enable: true,
  template:
    '<div class="chart-tooltip-template">' +
    '<strong>${series.name}</strong><br>' +
    '<span>${point.x}: ${point.y}</span>' +
    '</div>'
}
```

```css
.chart-tooltip-template {
  padding: 8px 10px;
  border: 1px solid #808080;
  border-radius: 4px;
  background: #FFFFFF;
  color: #242424;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
}
```

Do not insert unsanitized user-provided HTML into tooltip templates.

### Raw Datasource Record in `tooltipRender`

The original datasource record is available only through `args.data.rawData` in the `tooltipRender` event. It is not available as a `${point.data.<field>}` tooltip-format token.

#### TypeScript

```ts
import { Category, Chart, HiloOpenCloseSeries, ITooltipRenderEventArgs, Tooltip } from '@syncfusion/ej2-charts';

Chart.Inject(Category, HiloOpenCloseSeries, Tooltip);

interface HiloOpenCloseData {
    x: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

const tooltipRender = (args: ITooltipRenderEventArgs): void => {
    if (!args.data || !args.data.rawData) {
        return;
    }
    const rawData: HiloOpenCloseData = args.data.rawData as HiloOpenCloseData;
    args.headerText = `<b>${rawData.x}</b>`;
    args.text = [
        `Open: ${rawData.open}`,
        `High: ${rawData.high}`,
        `Low: ${rawData.low}`,
        `Close: ${rawData.close}`
    ];
};
```

#### JavaScript

```js
function tooltipRender(args) {
    if (!args.data || !args.data.rawData) {
        return;
    }
    var rawData = args.data.rawData;
    args.headerText = '<b>' + rawData.x + '</b>';
    args.text = [
        'Open: ' + rawData.open,
        'High: ' + rawData.high,
        'Low: ' + rawData.low,
        'Close: ' + rawData.close
    ];
}
```

Use datasource property names directly, such as `args.data.rawData.x` and `args.data.rawData.high`.

## Crosshair and Trackball

The Crosshair module displays horizontal, vertical, or combined reference lines. Crosshair axis tooltips can be enabled separately through each axis.

### Enable Crosshair

Import and inject `Crosshair`.

```typescript
import {
  Chart,
  Crosshair,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Crosshair
);
```

Configure the crosshair:

```typescript
crosshair: {
  enable: true,
  lineType: 'Both',
  line: {
    width: 1,
    color: '#808080',
    dashArray: '5,5'
  }
}
```

Supported line types include:

- `Vertical`
- `Horizontal`
- `Both`

Use the `line` object for crosshair-line styling.

Do not use an additional unverified `lineStyle` property.

### Crosshair Axis Tooltips

Enable the crosshair tooltip on the required axes.

```typescript
primaryXAxis: {
  valueType: 'DateTime',
  crosshairTooltip: {
    enable: true,
    fill: '#242424',
    textStyle: {
      color: '#FFFFFF',
      size: '12px'
    }
  }
},
primaryYAxis: {
  crosshairTooltip: {
    enable: true,
    fill: '#242424',
    textStyle: {
      color: '#FFFFFF',
      size: '12px'
    }
  }
}
```

The crosshair tooltip supports visibility, fill, and text-style customization.

### Trackball-Style Interaction

Use a shared tooltip with a vertical crosshair to create a trackball-style comparison across series.

```typescript
crosshair: {
  enable: true,
  lineType: 'Vertical',
  line: {
    width: 1,
    color: '#808080',
    dashArray: '4,4'
  }
},
tooltip: {
  enable: true,
  shared: true
},
series: [
  {
    dataSource: chartData,
    xName: 'date',
    yName: 'sales',
    type: 'Line',
    name: 'Sales',
    marker: {
      visible: true,
      width: 8,
      height: 8
    }
  },
  {
    dataSource: chartData,
    xName: 'date',
    yName: 'revenue',
    type: 'Line',
    name: 'Revenue',
    marker: {
      visible: true,
      width: 8,
      height: 8
    }
  }
]
```

Configure point markers inside each series.

Do not configure a `marker` inside the chart-level `crosshair` object.

## Legend

### Enable and Position the Legend

Import and inject `Legend`, then use `legendSettings`.

```typescript
import {
  Chart,
  Legend,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Legend
);
```

Configure the legend:

```typescript
legendSettings: {
  visible: true,
  position: 'Bottom',
  alignment: 'Center',
  border: {
    color: '#D3D3D3',
    width: 1
  }
}
```

Supported positions include:

- `Auto`
- `Top`
- `Bottom`
- `Left`
- `Right`
- `Custom`

Supported alignments include:

- `Near`
- `Center`
- `Far`

Use `legendSettings`, not `legend`.

### Legend Styling

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  background: '#FFFFFF',
  border: {
    color: '#D3D3D3',
    width: 1
  },
  textStyle: {
    size: '14px',
    color: '#333333',
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '400'
  },
  shapeHeight: 10,
  shapeWidth: 10,
  shapePadding: 8
}
```

Use `shapePadding` to control the space between the legend shape and its text.

Do not use an unverified `shapeMargin` object.

### Legend Spacing

Use `padding`, `itemPadding`, `margin`, and `containerPadding` where supported by the installed package version.

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  padding: 8,
  itemPadding: 12,
  margin: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  },
  containerPadding: {
    left: 8,
    right: 8,
    top: 8,
    bottom: 8
  }
}
```

### Interactive Legend

Set `toggleVisibility` to control whether selecting a legend item changes the corresponding series visibility.

```typescript
legendSettings: {
  visible: true,
  toggleVisibility: true
}
```

Use `enableHighlight` to highlight the associated series when users hover over a legend item.

```typescript
legendSettings: {
  visible: true,
  enableHighlight: true
}
```

Import and inject `Highlight` when highlight interaction is used.

```typescript
import {
  Chart,
  Highlight,
  Legend,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Legend,
  Highlight
);
```

### Custom Legend Position

Use `position: 'Custom'` with numeric `location` values.

```typescript
legendSettings: {
  visible: true,
  position: 'Custom',
  location: {
    x: 100,
    y: 50
  }
}
```

Do not place `x` and `y` directly inside `legendSettings`.

## Selection

Selection is configured through chart-level properties, not through a nested `selection` object.

Import and inject `Selection`.

```typescript
import {
  Chart,
  ColumnSeries,
  Selection
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Selection
);
```

### Point Selection

Use `selectionMode: 'Point'`.

```typescript
const chart: Chart = new Chart({
  selectionMode: 'Point',
  isMultiSelect: false,
  selectionPattern: 'DiagonalForward',
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Series Selection

Use `selectionMode: 'Series'`.

```typescript
const chart: Chart = new Chart({
  selectionMode: 'Series',
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value1',
      type: 'Column',
      name: 'Current'
    },
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value2',
      type: 'Column',
      name: 'Previous'
    }
  ]
});

chart.appendTo('#chart');
```

### Cluster Selection

Use `selectionMode: 'Cluster'` to select points from multiple series that share an X-position.

```typescript
const chart: Chart = new Chart({
  selectionMode: 'Cluster',
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value1',
      type: 'Column',
      name: 'Current'
    },
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value2',
      type: 'Column',
      name: 'Previous'
    }
  ]
});

chart.appendTo('#chart');
```

### Multiple Selection

Set `isMultiSelect` to `true`.

```typescript
const chart: Chart = new Chart({
  selectionMode: 'Point',
  isMultiSelect: true,
  selectionPattern: 'DiagonalForward',
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Initial Selection

Use `selectedDataIndexes` to select points initially.

```typescript
const chart: Chart = new Chart({
  selectionMode: 'Point',
  selectedDataIndexes: [
    {
      series: 0,
      point: 2
    }
  ],
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Selection Events

Use `selectionComplete` to respond after selection.

```typescript
const statusElement: HTMLElement | null =
  document.getElementById(
    'selection-status'
  );

const chart: Chart = new Chart({
  selectionMode: 'Point',
  selectionComplete: (args): void => {
    if (statusElement) {
      statusElement.textContent =
        'Chart selection was updated.';
    }

    console.log(
      'Selected values:',
      args.selectedDataValues
    );
  },
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

```html
<p id="selection-status" aria-live="polite">
  Select a chart point.
</p>
```

### Conditional Point Styling

Conditional point coloring is a rendering customization, not selection.

```typescript
import {
  IPointRenderEventArgs
} from '@syncfusion/ej2-charts';

const chart: Chart = new Chart({
  pointRender: (
    args: IPointRenderEventArgs
  ): void => {
    const value: number =
      Number(args.point?.y);

    if (value > 50) {
      args.fill = '#D13438';
    } else if (value < 20) {
      args.fill = '#107C10';
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Configure `pointRender` at the Chart level.

## Zooming and Panning

Import and inject `Zoom` before enabling zoom behavior.

```typescript
import {
  Chart,
  LineSeries,
  Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Zoom
);
```

The Chart supports rectangular selection zooming, pinch zooming, mouse-wheel zooming, panning, and toolbar-based zoom controls.

### Enable Selection Zooming

```typescript
zoomSettings: {
  enableSelectionZooming: true,
  mode: 'X'
}
```

Supported zoom modes include:

- `X`
- `Y`
- `XY`

Do not use an unverified `zoomSettings.enable` property.

### Mouse-Wheel and Pinch Zooming

```typescript
zoomSettings: {
  mode: 'XY',
  enableSelectionZooming: true,
  enableMouseWheelZooming: true,
  enablePinchZooming: true
}
```

### Panning

Set `enablePan` to `true`.

```typescript
zoomSettings: {
  mode: 'XY',
  enableSelectionZooming: true,
  enableMouseWheelZooming: true,
  enablePinchZooming: true,
  enablePan: true
}
```

### Zoom Toolbar

Set `showToolbar` to `true` and configure `toolbarItems`.

```typescript
zoomSettings: {
  mode: 'XY',
  enableSelectionZooming: true,
  enableMouseWheelZooming: true,
  enablePinchZooming: true,
  enablePan: true,
  showToolbar: true,
  toolbarItems: [
    'Zoom',
    'ZoomIn',
    'ZoomOut',
    'Pan',
    'Reset'
  ]
}
```

### Programmatic Zoom

Use axis `zoomFactor` and `zoomPosition`.

```typescript
chart.primaryXAxis.zoomFactor =
  0.5;

chart.primaryXAxis.zoomPosition =
  0.25;

chart.refresh();
```

In this example:

- `zoomFactor: 0.5` displays 50 percent of the X-axis range.
- `zoomPosition: 0.25` starts the visible range 25 percent into the complete range.

Both values normally range from `0` to `1`.

Do not use an unverified `chart.zoom({ start, end })` method.

### Reset Zoom

Reset the zoom factor and position on the affected axes.

```typescript
function resetZoom(): void {
  chart.primaryXAxis.zoomFactor =
    1;

  chart.primaryXAxis.zoomPosition =
    0;

  chart.primaryYAxis.zoomFactor =
    1;

  chart.primaryYAxis.zoomPosition =
    0;

  chart.refresh();
}
```

Use a native button:

```html
<button id="reset-zoom" type="button">
  Reset zoom
</button>
```

```typescript
const resetButton:
  HTMLButtonElement | null =
  document.getElementById(
    'reset-zoom'
  ) as HTMLButtonElement | null;

resetButton?.addEventListener(
  'click',
  resetZoom
);
```

Do not call the `zoomComplete` event as a method. It is an event callback, not a zoom-reset API.

## Annotations

Chart annotations display custom HTML content at a point or pixel location.

Import and inject `ChartAnnotation`.

```typescript
import {
  Chart,
  ChartAnnotation,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  ChartAnnotation
);
```

The Chart API provides a ChartAnnotation module and annotation settings for displaying custom content.

### Point-Based Annotation

Use `coordinateUnits: 'Point'` to place annotation content relative to axis values.

```typescript
annotations: [
  {
    content:
      '<div class="chart-annotation">' +
      '<strong>Peak</strong>' +
      '</div>',
    x: 'Mar',
    y: 50,
    coordinateUnits: 'Point',
    region: 'Series'
  }
]
```

```css
.chart-annotation {
  padding: 6px 8px;
  border: 1px solid #D13438;
  border-radius: 4px;
  background: #FFFFFF;
  color: #D13438;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
}
```

The X-value must be compatible with the X-axis type.

### Pixel-Based Annotation

Use `coordinateUnits: 'Pixel'` with pixel or percentage positions.

```typescript
annotations: [
  {
    content:
      '<div class="chart-summary">' +
      'Sales Summary' +
      '</div>',
    x: '50%',
    y: '10%',
    coordinateUnits: 'Pixel',
    region: 'Chart'
  }
]
```

### Annotation Region

Common annotation regions include:

- `Chart`
- `Series`

Use `Chart` when the location should be interpreted relative to the complete chart.

Use `Series` when the annotation should be positioned relative to the series area.

### Multiple Annotations

```typescript
annotations: [
  {
    content:
      '<div class="chart-annotation">' +
      '<strong>Peak Sales</strong>' +
      '</div>',
    x: 'Mar',
    y: 95,
    coordinateUnits: 'Point',
    region: 'Series'
  },
  {
    content:
      '<div class="chart-note">' +
      'Quarterly Review' +
      '</div>',
    x: '80%',
    y: '10%',
    coordinateUnits: 'Pixel',
    region: 'Chart'
  }
]
```

The standard Chart annotation API displays custom HTML content. It does not use annotation objects with `type: 'Line'` or `type: 'Rectangle'`.

Use strip lines, additional series, SVG overlays, or application-owned elements when line or rectangular range highlighting is required.

Do not insert unsanitized user content into an annotation.

## Common Configurations

### Interactive Dashboard

```typescript
const chart: Chart = new Chart({
  tooltip: {
    enable: true,
    shared: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
  },
  crosshair: {
    enable: true,
    lineType: 'Both',
    line: {
      width: 1,
      color: '#808080',
      dashArray: '4,4'
    }
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    enableHighlight: true
  },
  selectionMode: 'Point',
  isMultiSelect: false,
  zoomSettings: {
    mode: 'XY',
    enableSelectionZooming: true,
    enableMouseWheelZooming: true,
    enablePinchZooming: true,
    enablePan: true,
    showToolbar: true,
    toolbarItems: [
      'Zoom',
      'ZoomIn',
      'ZoomOut',
      'Pan',
      'Reset'
    ]
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Financial Chart Interaction

```typescript
tooltip: {
  enable: true,
  shared: true,
  format:
    '<b>${point.x:dd MMM}</b><br>' +
    'Open: ${point.open:n2}<br>' +
    'High: ${point.high:n2}<br>' +
    'Low: ${point.low:n2}<br>' +
    'Close: ${point.close:n2}'
},
crosshair: {
  enable: true,
  lineType: 'Vertical',
  line: {
    width: 1,
    color: '#808080',
    dashArray: '5,5'
  }
},
zoomSettings: {
  mode: 'X',
  enableMouseWheelZooming: true,
  enablePinchZooming: true,
  enablePan: true,
  showToolbar: true
}
```

### Analysis Chart with Annotations

```typescript
const chart: Chart = new Chart({
  tooltip: {
    enable: true
  },
  selectionMode: 'Point',
  selectionPattern:
    'DiagonalForward',
  annotations: [
    {
      content:
        '<div class="chart-annotation">' +
        'Peak Sales' +
        '</div>',
      x: 'Mar',
      y: 95,
      coordinateUnits: 'Point',
      region: 'Series'
    }
  ],
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Multi-Series Legend Interaction

```typescript
const chart: Chart = new Chart({
  legendSettings: {
    visible: true,
    position: 'Right',
    enableHighlight: true,
    toggleVisibility: true,
    textStyle: {
      size: '12px'
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'profit',
      type: 'Line',
      name: 'Profit'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Area',
      name: 'Revenue',
      opacity: 0.5
    }
  ]
});

chart.appendTo('#chart');
```

Inject `AreaSeries` when an Area series is configured.

## Event Handlers

### Point Render Event

Use `pointRender` to customize a point before it is rendered.

```typescript
import {
  IPointRenderEventArgs
} from '@syncfusion/ej2-charts';

const chart: Chart = new Chart({
  pointRender: (
    args: IPointRenderEventArgs
  ): void => {
    if (args.point.index === 0) {
      args.fill = '#FF5733';
      args.border = {
        color: '#9B2C1F',
        width: 2
      };
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Point Click Event

Use `pointClick` for application-specific point interaction.

```typescript
import {
  IPointEventArgs
} from '@syncfusion/ej2-charts';

const statusElement: HTMLElement | null =
  document.getElementById(
    'point-status'
  );

const chart: Chart = new Chart({
  pointClick: (
    args: IPointEventArgs
  ): void => {
    if (
      args.point &&
      statusElement
    ) {
      statusElement.textContent =
        `Selected ${String(args.point.x)}, ` +
        `value ${String(args.point.y)}.`;
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

```html
<p id="point-status" aria-live="polite">
  Select a chart point.
</p>
```

### Legend Render Event

Use `legendRender` to customize legend text before it is rendered.

```typescript
import {
  ILegendRenderEventArgs
} from '@syncfusion/ej2-charts';

const chart: Chart = new Chart({
  legendRender: (
    args: ILegendRenderEventArgs
  ): void => {
    args.text =
      args.text.toUpperCase();
  },
  legendSettings: {
    visible: true
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Chart Mouse Move Event

```typescript
import {
  IMouseEventArgs
} from '@syncfusion/ej2-charts';

const chart: Chart = new Chart({
  chartMouseMove: (
    args: IMouseEventArgs
  ): void => {
    console.log(
      `Position: ${args.x}, ${args.y}`
    );
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

Avoid excessive work inside `chartMouseMove` because it can fire frequently.

### Zoom Complete Event

Use `zoomComplete` to respond after a zoom operation.

```typescript
const chart: Chart = new Chart({
  zoomComplete: (args): void => {
    console.log(
      'Zoom operation completed.',
      args
    );
  },
  zoomSettings: {
    mode: 'X',
    enableSelectionZooming: true,
    enableMouseWheelZooming: true
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

Do not call `zoomComplete` to perform zooming or reset the chart.

## Complete TypeScript Example

```typescript
import {
  Category,
  Chart,
  ChartAnnotation,
  ColumnSeries,
  Crosshair,
  Highlight,
  IPointEventArgs,
  Legend,
  LineSeries,
  Selection,
  Tooltip,
  Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  LineSeries,
  Category,
  Tooltip,
  Crosshair,
  Legend,
  Highlight,
  Selection,
  Zoom,
  ChartAnnotation
);

interface BusinessData {
  month: string;
  sales: number;
  revenue: number;
}

const chartData: BusinessData[] = [
  {
    month: 'Jan',
    sales: 35,
    revenue: 42
  },
  {
    month: 'Feb',
    sales: 48,
    revenue: 52
  },
  {
    month: 'Mar',
    sales: 62,
    revenue: 68
  },
  {
    month: 'Apr',
    sales: 55,
    revenue: 64
  },
  {
    month: 'May',
    sales: 74,
    revenue: 82
  }
];

const statusElement: HTMLElement | null =
  document.getElementById(
    'chart-status'
  );

const chart: Chart = new Chart({
  title: 'Sales and Revenue Analysis',
  width: '100%',
  height: '440px',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    crosshairTooltip: {
      enable: true,
      fill: '#242424',
      textStyle: {
        color: '#FFFFFF',
        size: '12px'
      }
    }
  },
  primaryYAxis: {
    title: 'Amount',
    crosshairTooltip: {
      enable: true,
      fill: '#242424',
      textStyle: {
        color: '#FFFFFF',
        size: '12px'
      }
    }
  },
  tooltip: {
    enable: true,
    shared: true,
    enableAnimation: true,
    fill: '#FFFFFF',
    opacity: 0.95,
    border: {
      color: '#808080',
      width: 1
    },
    textStyle: {
      color: '#242424',
      fontFamily: 'Segoe UI',
      size: '12px'
    },
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
  },
  crosshair: {
    enable: true,
    lineType: 'Both',
    line: {
      width: 1,
      color: '#808080',
      dashArray: '4,4'
    }
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    alignment: 'Center',
    toggleVisibility: true,
    enableHighlight: true,
    shapeWidth: 12,
    shapeHeight: 12,
    shapePadding: 8,
    textStyle: {
      color: '#333333',
      fontFamily: 'Segoe UI',
      size: '12px'
    }
  },
  selectionMode: 'Point',
  isMultiSelect: true,
  selectionPattern:
    'DiagonalForward',
  zoomSettings: {
    mode: 'XY',
    enableSelectionZooming: true,
    enableMouseWheelZooming: true,
    enablePinchZooming: true,
    enablePan: true,
    showToolbar: true,
    toolbarItems: [
      'Zoom',
      'ZoomIn',
      'ZoomOut',
      'Pan',
      'Reset'
    ]
  },
  annotations: [
    {
      content:
        '<div class="chart-annotation">' +
        '<strong>Peak Revenue</strong>' +
        '</div>',
      x: 'May',
      y: 82,
      coordinateUnits: 'Point',
      region: 'Series'
    }
  ],
  pointClick: (
    args: IPointEventArgs
  ): void => {
    if (
      args.point &&
      statusElement
    ) {
      statusElement.textContent =
        `Selected ${String(args.point.x)}, ` +
        `value ${String(args.point.y)}.`;
    }
  },
  selectionComplete: (): void => {
    if (statusElement) {
      statusElement.textContent =
        'The chart selection was updated.';
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Line',
      name: 'Revenue',
      width: 2,
      marker: {
        visible: true,
        width: 8,
        height: 8
      }
    }
  ]
});

chart.appendTo('#chart');

const resetButton:
  HTMLButtonElement | null =
  document.getElementById(
    'reset-zoom'
  ) as HTMLButtonElement | null;

const resetZoom = (): void => {
  chart.primaryXAxis.zoomFactor =
    1;

  chart.primaryXAxis.zoomPosition =
    0;

  chart.primaryYAxis.zoomFactor =
    1;

  chart.primaryYAxis.zoomPosition =
    0;

  chart.refresh();

  if (statusElement) {
    statusElement.textContent =
      'The chart zoom was reset.';
  }
};

resetButton?.addEventListener(
  'click',
  resetZoom
);

window.addEventListener(
  'beforeunload',
  (): void => {
    resetButton?.removeEventListener(
      'click',
      resetZoom
    );

    chart.destroy();
  }
);
```

**HTML:**

```html
<div
  id="chart"
  role="region"
  aria-label="Interactive chart showing monthly sales and revenue"
></div>

<button id="reset-zoom" type="button">
  Reset zoom
</button>

<p id="chart-status" aria-live="polite">
  Interact with the chart to view details.
</p>
```

**CSS:**

```css
#chart {
  width: 100%;
  min-height: 440px;
}

.chart-annotation {
  padding: 6px 8px;
  border: 1px solid #D13438;
  border-radius: 4px;
  background: #FFFFFF;
  color: #D13438;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
}

#reset-zoom {
  min-height: 40px;
  margin-top: 12px;
  padding: 8px 16px;
}

#reset-zoom:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
}
```

## Complete JavaScript Example

```javascript
ej.charts.Chart.Inject(
  ej.charts.ColumnSeries,
  ej.charts.LineSeries,
  ej.charts.Category,
  ej.charts.Tooltip,
  ej.charts.Crosshair,
  ej.charts.Legend,
  ej.charts.Highlight,
  ej.charts.Selection,
  ej.charts.Zoom,
  ej.charts.ChartAnnotation
);

var chartData = [
  {
    month: 'Jan',
    sales: 35,
    revenue: 42
  },
  {
    month: 'Feb',
    sales: 48,
    revenue: 52
  },
  {
    month: 'Mar',
    sales: 62,
    revenue: 68
  },
  {
    month: 'Apr',
    sales: 55,
    revenue: 64
  },
  {
    month: 'May',
    sales: 74,
    revenue: 82
  }
];

var statusElement =
  document.getElementById(
    'chart-status'
  );

var chart = new ej.charts.Chart({
  title: 'Sales and Revenue Analysis',
  width: '100%',
  height: '440px',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    crosshairTooltip: {
      enable: true
    }
  },
  primaryYAxis: {
    title: 'Amount',
    crosshairTooltip: {
      enable: true
    }
  },
  tooltip: {
    enable: true,
    shared: true,
    enableAnimation: true,
    fill: '#FFFFFF',
    border: {
      color: '#808080',
      width: 1
    },
    textStyle: {
      color: '#242424',
      size: '12px'
    },
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
  },
  crosshair: {
    enable: true,
    lineType: 'Both',
    line: {
      width: 1,
      color: '#808080',
      dashArray: '4,4'
    }
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    alignment: 'Center',
    toggleVisibility: true,
    enableHighlight: true,
    shapeWidth: 12,
    shapeHeight: 12,
    shapePadding: 8
  },
  selectionMode: 'Point',
  isMultiSelect: true,
  selectionPattern:
    'DiagonalForward',
  zoomSettings: {
    mode: 'XY',
    enableSelectionZooming: true,
    enableMouseWheelZooming: true,
    enablePinchZooming: true,
    enablePan: true,
    showToolbar: true,
    toolbarItems: [
      'Zoom',
      'ZoomIn',
      'ZoomOut',
      'Pan',
      'Reset'
    ]
  },
  annotations: [
    {
      content:
        '<div class="chart-annotation">' +
        '<strong>Peak Revenue</strong>' +
        '</div>',
      x: 'May',
      y: 82,
      coordinateUnits: 'Point',
      region: 'Series'
    }
  ],
  pointClick: function (args) {
    if (
      args.point &&
      statusElement
    ) {
      statusElement.textContent =
        'Selected ' +
        String(args.point.x) +
        ', value ' +
        String(args.point.y) +
        '.';
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Line',
      name: 'Revenue',
      width: 2,
      marker: {
        visible: true,
        width: 8,
        height: 8
      }
    }
  ]
});

chart.appendTo('#chart');

var resetButton =
  document.getElementById(
    'reset-zoom'
  );

function resetZoom() {
  chart.primaryXAxis.zoomFactor =
    1;

  chart.primaryXAxis.zoomPosition =
    0;

  chart.primaryYAxis.zoomFactor =
    1;

  chart.primaryYAxis.zoomPosition =
    0;

  chart.refresh();

  if (statusElement) {
    statusElement.textContent =
      'The chart zoom was reset.';
  }
}

if (resetButton) {
  resetButton.addEventListener(
    'click',
    resetZoom
  );
}

window.addEventListener(
  'beforeunload',
  function () {
    if (resetButton) {
      resetButton.removeEventListener(
        'click',
        resetZoom
      );
    }

    chart.destroy();
  }
);
```

## Troubleshooting

### Tooltip Is Not Displayed

- Import and inject `Tooltip`.
- Set `tooltip.enable` to `true`.
- Ensure that no overlay blocks pointer interaction.
- Use supported tooltip tokens.
- Ensure that values are compatible with their format specifiers.
- Check the browser console for errors.

### Shared Tooltip Does Not Show Every Series

- Set `tooltip.shared` to `true`.
- Ensure that related series contain compatible X-values.
- Ensure that every series is visible.
- Ensure that tooltip interaction is supported by the configured series types.
- Ensure that X-values use consistent data types.

### Crosshair Is Not Displayed

- Import and inject `Crosshair`.
- Set `crosshair.enable` to `true`.
- Use `Vertical`, `Horizontal`, or `Both` for `lineType`.
- Configure styling through `crosshair.line`.
- Ensure that pointer events are enabled.
- Ensure that another element does not cover the Chart.

### Crosshair Axis Tooltip Is Not Displayed

- Enable the Chart crosshair.
- Set `axis.crosshairTooltip.enable` to `true`.
- Enable it separately on every required axis.
- Ensure that the axis is visible.
- Check that its fill and text colors have sufficient contrast.

### Legend Is Not Displayed

- Import and inject `Legend`.
- Use `legendSettings`, not `legend`.
- Set `legendSettings.visible` to `true`.
- Assign a meaningful `name` to every series.
- Ensure that sufficient layout space is available.

### Legend Highlight Is Not Working

- Import and inject `Highlight`.
- Set `legendSettings.enableHighlight` to `true`.
- Ensure that pointer interaction is not blocked.
- Ensure that the corresponding series is visible.

### Selection Is Not Working

- Import and inject `Selection`.
- Use `selectionMode`, not a nested `selection` object.
- Use `Point`, `Series`, or `Cluster`.
- Set `isMultiSelect` when multiple selection is required.
- Ensure that pointer events are enabled.
- Ensure that the Chart is not covered by another element.

### Zooming Is Not Working

- Import and inject `Zoom`.
- Enable at least one supported zoom behavior.
- Use `enableSelectionZooming`, `enableMouseWheelZooming`, or `enablePinchZooming`.
- Do not rely on an unverified `zoomSettings.enable`.
- Use `X`, `Y`, or `XY` for the zoom mode.
- Ensure that pointer events are enabled.

### Panning Is Not Working

- Import and inject `Zoom`.
- Set `zoomSettings.enablePan` to `true`.
- Zoom into the Chart before attempting to pan.
- Ensure that the toolbar is in Pan mode when the toolbar is used.

### Reset Zoom Does Not Work

- Set axis `zoomFactor` to `1`.
- Set axis `zoomPosition` to `0`.
- Reset every affected axis.
- Call `refresh()`.
- Do not invoke the `zoomComplete` event as a method.

### Annotation Is Not Displayed

- Import and inject `ChartAnnotation`.
- Add annotation settings to the chart-level `annotations` collection.
- Use `Point` or `Pixel` for `coordinateUnits`.
- Ensure that the X and Y positions are valid.
- Ensure that point coordinates match the axis value types.
- Ensure that annotation content is valid HTML.
- Check whether another chart element covers the annotation.

## Next Steps

- **Configure axes:** See `references/axes-customization.md`.
- **Customize styling:** See `references/styling-appearance.md`.
- **Advanced features:** See `references/advanced-features.md`.
- **Configure series:** See `references/series-configuration.md`.
- **Handle data:** See `references/data-handling.md`.
- **Accessibility:** See `references/accessibility-rtl.md`.