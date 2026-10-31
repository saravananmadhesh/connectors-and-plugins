# Legend Configuration

## Table of Contents

- [Legend Configuration](#legend-configuration)
  - [Overview](#overview)
  - [Module Injection](#module-injection)
  - [Positioning](#positioning)
    - [Automatic Positioning](#automatic-positioning)
    - [Basic Positioning](#basic-positioning)
    - [Right Position](#right-position)
    - [Left Position](#left-position)
    - [Top Position](#top-position)
    - [Bottom Position](#bottom-position)
    - [Custom Positioning](#custom-positioning)
  - [Alignment](#alignment)
    - [Right Legend with Near Alignment](#right-legend-with-near-alignment)
    - [Bottom Legend with Far Alignment](#bottom-legend-with-far-alignment)
    - [Top Legend with Center Alignment](#top-legend-with-center-alignment)
  - [Styling and Customization](#styling-and-customization)
    - [Border and Background](#border-and-background)
    - [Text Style](#text-style)
    - [Legend Shape and Spacing](#legend-shape-and-spacing)
    - [Legend Size](#legend-size)
    - [Long Label Handling](#long-label-handling)
    - [Reverse Legend Items](#reverse-legend-items)
  - [Visibility Control](#visibility-control)
    - [Show or Hide the Legend](#show-or-hide-the-legend)
    - [Exclude a Point from the Legend](#exclude-a-point-from-the-legend)
  - [Interactive Legend Features](#interactive-legend-features)
    - [Toggle Point Visibility](#toggle-point-visibility)
    - [Highlight on Legend Hover](#highlight-on-legend-hover)
    - [Legend Click Event](#legend-click-event)
  - [Responsive Legend](#responsive-legend)
  - [Legend with Custom Point Colors](#legend-with-custom-point-colors)
  - [Complete TypeScript Example](#complete-typescript-example)
  - [Complete JavaScript Example](#complete-javascript-example)
  - [Common Legend Patterns](#common-legend-patterns)
    - [Top Legend with Horizontal Layout](#top-legend-with-horizontal-layout)
    - [Right Legend with Vertical Layout](#right-legend-with-vertical-layout)
    - [Hidden Legend](#hidden-legend)
    - [Custom Styled Legend](#custom-styled-legend)
    - [Reversed Legend](#reversed-legend)
    - [Legend with Paging](#legend-with-paging)
  - [Troubleshooting](#troubleshooting)
    - [Legend Is Not Displayed](#legend-is-not-displayed)
    - [Legend Position Is Incorrect](#legend-position-is-incorrect)
    - [Custom Legend Location Is Not Applied](#custom-legend-location-is-not-applied)
    - [Legend Text Style Is Not Applied](#legend-text-style-is-not-applied)
    - [Long Legend Text Is Clipped](#long-legend-text-is-clipped)
    - [Legend Overlaps the Chart](#legend-overlaps-the-chart)
    - [Legend Click Does Not Toggle a Point](#legend-click-does-not-toggle-a-point)
    - [Legend Highlight Is Not Working](#legend-highlight-is-not-working)
    - [Custom Point Colors Are Not Reflected in the Legend](#custom-point-colors-are-not-reflected-in-the-legend)


## Overview

The Accumulation Chart legend identifies the points rendered in Pie, Doughnut, Funnel, and Pyramid series.

For an Accumulation Chart, each point generally produces a separate legend item. The legend text is obtained from the field mapped through the series `xName` property.

By default, the legend position is selected automatically based on the available chart dimensions. It is commonly placed on the right when sufficient horizontal space is available and at the bottom when a vertical layout is more appropriate.

The `AccumulationLegend` module must be imported and injected before enabling the legend.

## Module Injection

**TypeScript:**

```typescript
import {
  AccumulationChart,
  AccumulationLegend,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend
);
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationLegend
);
```

Inject the series module that corresponds to the configured series type:

- `PieSeries` for Pie and Doughnut charts.
- `FunnelSeries` for Funnel charts.
- `PyramidSeries` for Pyramid charts.

## Positioning

Use `legendSettings.position` to position the legend around the chart.

Supported positions include:

- `Auto`
- `Left`
- `Right`
- `Top`
- `Bottom`
- `Custom`

The `Left`, `Right`, `Top`, and `Bottom` positions are supported for Accumulation Chart legends. A custom position is configured through `position: 'Custom'` and the `location` property

### Automatic Positioning

Use `Auto` when the chart should choose a suitable legend position based on the available dimensions.

```typescript
legendSettings: {
  visible: true,
  position: 'Auto'
}
```

### Basic Positioning

**TypeScript:**

```typescript
import {
  AccumulationChart,
  AccumulationLegend,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend
);

interface RegionalData {
  region: string;
  value: number;
}

const chartData: RegionalData[] = [
  {
    region: 'North',
    value: 135
  },
  {
    region: 'South',
    value: 198
  },
  {
    region: 'East',
    value: 160
  },
  {
    region: 'West',
    value: 121
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Regional Distribution',
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'value',
        type: 'Pie',
        name: 'Regions'
      }
    ]
  });

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationLegend
);

var chartData = [
  {
    region: 'North',
    value: 135
  },
  {
    region: 'South',
    value: 198
  },
  {
    region: 'East',
    value: 160
  },
  {
    region: 'West',
    value: 121
  }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Regional Distribution',
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'value',
        type: 'Pie',
        name: 'Regions'
      }
    ]
  });

chart.appendTo('#chart');
```

### Right Position

```typescript
legendSettings: {
  visible: true,
  position: 'Right'
}
```

A right-positioned legend normally uses the available vertical space.

### Left Position

```typescript
legendSettings: {
  visible: true,
  position: 'Left'
}
```

A left-positioned legend is useful when the application layout or reading direction requires the legend before the chart.

### Top Position

```typescript
legendSettings: {
  visible: true,
  position: 'Top'
}
```

A top-positioned legend is useful for wide dashboard layouts.

### Bottom Position

```typescript
legendSettings: {
  visible: true,
  position: 'Bottom'
}
```

A bottom-positioned legend is useful when horizontal space beside the chart is limited.

### Custom Positioning

Set `position` to `Custom` and provide numeric X and Y coordinates through `location`.

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

The coordinates must be provided through `location`. Do not place `x` and `y` directly inside `legendSettings`.

Incorrect:

```typescript
legendSettings: {
  position: 'Custom',
  x: '100px',
  y: '50px'
}
```

Correct:

```typescript
legendSettings: {
  position: 'Custom',
  location: {
    x: 100,
    y: 50
  }
}
```

The `location` values are numeric. Do not pass CSS strings such as `100px`. A custom location applies only when `position` is set to `Custom`.

## Alignment

Use `alignment` to align the legend within the space associated with its position.

Supported values include:

- `Near`
- `Center`
- `Far`

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  alignment: 'Center'
}
```

For a legend positioned on the left or right:

- `Near` aligns it toward the top.
- `Center` aligns it near the vertical center.
- `Far` aligns it toward the bottom.

For a legend positioned at the top or bottom:

- `Near` aligns it toward the starting side.
- `Center` aligns it near the horizontal center.
- `Far` aligns it toward the ending side.

The exact visual direction of `Near` and `Far` can also be affected by right-to-left rendering.

### Right Legend with Near Alignment

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  alignment: 'Near'
}
```

### Bottom Legend with Far Alignment

```typescript
legendSettings: {
  visible: true,
  position: 'Bottom',
  alignment: 'Far'
}
```

### Top Legend with Center Alignment

```typescript
legendSettings: {
  visible: true,
  position: 'Top',
  alignment: 'Center'
}
```

## Styling and Customization

Use the legend settings to customize its background, border, text, symbols, spacing, size, and label behavior.

### Border and Background

Use `background` and `border` to customize the legend container.

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  background: '#F5F5F5',
  border: {
    color: '#808080',
    width: 1
  }
}
```

Use a valid CSS color for `background` and `border.color`.

### Text Style

Use `textStyle` to customize legend-label text.

```typescript
legendSettings: {
  visible: true,
  textStyle: {
    color: '#333333',
    fontFamily: 'Segoe UI',
    size: '14px',
    fontStyle: 'Normal',
    fontWeight: '400'
  }
}
```

Use `size`, not `fontSize`.

Incorrect:

```typescript
textStyle: {
  fontSize: '14px'
}
```

Correct:

```typescript
textStyle: {
  size: '14px'
}
```

### Legend Shape and Spacing

Use `shapeWidth` and `shapeHeight` to customize the legend symbol dimensions.

Use `shapePadding` to control the space between the symbol and its text.

```typescript
legendSettings: {
  visible: true,
  shapeWidth: 15,
  shapeHeight: 15,
  shapePadding: 8
}
```

Use `itemPadding` to control spacing between complete legend items.

```typescript
legendSettings: {
  visible: true,
  itemPadding: 12
}
```

Use `containerPadding` when additional spacing is required inside the legend container.

```typescript
legendSettings: {
  visible: true,
  containerPadding: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  }
}
```

The legend settings model supports layout, item padding, container padding, fixed item width, paging, and maximum-column configuration.

### Legend Size

Use `width` and `height` to constrain the legend area.

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  width: '180px',
  height: '240px'
}
```

When the available legend area cannot display every item, paging can be used.

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  width: '180px',
  height: '200px',
  enablePages: true
}
```

### Long Label Handling

Use `maximumLabelWidth` to constrain the maximum width of legend labels.

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  maximumLabelWidth: 140
}
```

Use `textWrap` when long labels should wrap.

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  maximumLabelWidth: 140,
  textWrap: 'Wrap'
}
```

Depending on the desired behavior, supported text-wrapping values can include:

- `Normal`
- `Wrap`
- `AnyWhere`

Use an exact value supported by the installed EJ2 package version.

Do not describe `maximumLabelWidth` itself as enabling wrapping. It constrains the label width. The configured `textWrap` behavior determines how long text is handled.

### Reverse Legend Items

Use `reverse` to reverse the displayed order of legend items.

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  reverse: true
}
```

This changes the legend-item order without changing the data-source order.

## Visibility Control

### Show or Hide the Legend

Set `visible` to `true` to show the legend.

```typescript
legendSettings: {
  visible: true
}
```

Set it to `false` to hide the legend.

```typescript
legendSettings: {
  visible: false
}
```

A legend may be unnecessary when:

- Every point has a clear data label.
- The chart contains only a few directly labeled segments.
- The surrounding UI already identifies every category.
- The legend reduces the available plot area too much.

### Exclude a Point from the Legend

An Accumulation Chart point with an empty X-value does not produce a normal category label in the legend. Syncfusion documents this as a way to collapse the corresponding legend item.

```typescript
const chartData = [
  {
    category: 'Product A',
    value: 40
  },
  {
    category: '',
    value: 25
  },
  {
    category: 'Product C',
    value: 35
  }
];
```

Use this behavior carefully because an empty category value can also reduce the accessibility and clarity of the corresponding point.

For general scenarios, keep meaningful category names and use an event-based customization only when there is a validated need to remove a specific legend item.

## Interactive Legend Features

### Toggle Point Visibility

In an Accumulation Chart, legend items represent points. Clicking a legend item can toggle the visibility of its corresponding point.

Use `toggleVisibility` to control this behavior.

```typescript
legendSettings: {
  visible: true,
  toggleVisibility: true
}
```

Disable legend-click visibility changes when the legend should be informational only.

```typescript
legendSettings: {
  visible: true,
  toggleVisibility: false
}
```

Do not describe Accumulation Chart legend interaction as toggling an entire multi-series collection. Accumulation Chart legends generally represent individual points.

### Highlight on Legend Hover

Use `enableHighlight` to highlight the corresponding point when a legend item is hovered.

```typescript
legendSettings: {
  visible: true,
  enableHighlight: true
}
```

The legend settings model includes an `enableHighlight` option for highlighting through legend interaction.

When chart-level highlighting is also configured, import and inject the corresponding `AccumulationHighlight` module.

```typescript
import {
  AccumulationChart,
  AccumulationHighlight,
  AccumulationLegend,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend,
  AccumulationHighlight
);
```

### Legend Click Event

Use `legendClick` when application logic must run after a legend item is clicked.

```typescript
import {
  AccumulationChart,
  AccumulationLegend,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend
);

const statusElement: HTMLElement | null =
  document.getElementById('legend-status');

const chart: AccumulationChart =
  new AccumulationChart({
    legendClick: (args): void => {
      if (statusElement) {
        statusElement.textContent =
          `Legend item selected: ${String(args.legendText)}`;
      }
    },
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'value',
        type: 'Pie',
        name: 'Regions'
      }
    ]
  });

chart.appendTo('#chart');
```

Use a live status region when the interaction result should be announced to assistive technologies.

```html
<p id="legend-status" aria-live="polite">
  Select a legend item to update the chart.
</p>
```

## Responsive Legend

Use `position: 'Auto'` when the built-in responsive positioning is sufficient.

```typescript
legendSettings: {
  visible: true,
  position: 'Auto',
  alignment: 'Center'
}
```

When application-specific breakpoints are required, update `legendSettings.position` on resize and refresh the chart.

```typescript
const mobileBreakpoint: number = 768;

function getLegendPosition():
  'Right' | 'Bottom' {
  return window.innerWidth > mobileBreakpoint
    ? 'Right'
    : 'Bottom';
}

const chart: AccumulationChart =
  new AccumulationChart({
    legendSettings: {
      visible: true,
      position: getLegendPosition(),
      alignment: 'Center'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');

let resizeTimer: number | undefined;

const handleResize = (): void => {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(() => {
    const nextPosition:
      'Right' | 'Bottom' =
      getLegendPosition();

    if (
      chart.legendSettings.position !==
      nextPosition
    ) {
      chart.legendSettings.position =
        nextPosition;

      chart.refresh();
    }
  }, 150);
};

window.addEventListener(
  'resize',
  handleResize
);

window.addEventListener('beforeunload', () => {
  window.clearTimeout(resizeTimer);

  window.removeEventListener(
    'resize',
    handleResize
  );

  chart.destroy();
});
```

Do not use an unverified `resizeRedraw` property. The chart already responds to supported resize behavior, and application-specific legend changes can be handled through a debounced resize listener.

## Legend with Custom Point Colors

Use `pointColorMapping` to map point colors from the data source. The legend symbols use the colors of their corresponding points.

```typescript
import {
  AccumulationChart,
  AccumulationLegend,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend
);

interface ProductData {
  product: string;
  revenue: number;
  color: string;
}

const chartData: ProductData[] = [
  {
    product: 'Product A',
    revenue: 25000,
    color: '#FF5733'
  },
  {
    product: 'Product B',
    revenue: 18000,
    color: '#3366FF'
  },
  {
    product: 'Product C',
    revenue: 12000,
    color: '#33CC33'
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Revenue by Product',
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        pointColorMapping: 'color',
        type: 'Pie',
        name: 'Revenue'
      }
    ]
  });

chart.appendTo('#chart');
```

Every mapped color value must be a valid CSS color.

## Complete TypeScript Example

The following complete example includes:

- A Pie series.
- Module-safe legend configuration.
- Right-side positioning.
- Center alignment.
- Custom background and border.
- Correct text-style properties.
- Shape sizing.
- Container and item padding.
- Long-label handling.
- Legend paging.
- Point-color mapping.
- Point visibility toggling.
- Legend highlighting.
- Responsive positioning.

```typescript
import {
  AccumulationChart,
  AccumulationHighlight,
  AccumulationLegend,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend,
  AccumulationHighlight
);

interface RegionalData {
  region: string;
  value: number;
  color: string;
}

const chartData: RegionalData[] = [
  {
    region: 'Northern Region',
    value: 135,
    color: '#0F6CBD'
  },
  {
    region: 'Southern Region',
    value: 198,
    color: '#D83B01'
  },
  {
    region: 'Eastern Region',
    value: 160,
    color: '#107C10'
  },
  {
    region: 'Western Region',
    value: 121,
    color: '#8764B8'
  }
];

const mobileBreakpoint: number = 768;

function getLegendPosition():
  'Right' | 'Bottom' {
  return window.innerWidth > mobileBreakpoint
    ? 'Right'
    : 'Bottom';
}

const statusElement: HTMLElement | null =
  document.getElementById('legend-status');

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Regional Distribution',
    width: '100%',
    height: '420px',
    legendClick: (args): void => {
      if (statusElement) {
        statusElement.textContent =
          `Legend item selected: ${String(args.legendText)}`;
      }
    },
    legendSettings: {
      visible: true,
      position: getLegendPosition(),
      alignment: 'Center',
      background: '#FFFFFF',
      border: {
        color: '#D3D3D3',
        width: 1
      },
      textStyle: {
        color: '#424242',
        fontFamily: 'Segoe UI',
        size: '12px',
        fontStyle: 'Normal',
        fontWeight: '400'
      },
      shapeWidth: 12,
      shapeHeight: 12,
      shapePadding: 8,
      itemPadding: 12,
      containerPadding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      },
      maximumLabelWidth: 160,
      textWrap: 'Wrap',
      enablePages: true,
      toggleVisibility: true,
      enableHighlight: true
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'value',
        pointColorMapping: 'color',
        type: 'Pie',
        name: 'Regions'
      }
    ]
  });

chart.appendTo('#chart');

let resizeTimer: number | undefined;

const handleResize = (): void => {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(() => {
    const nextPosition:
      'Right' | 'Bottom' =
      getLegendPosition();

    if (
      chart.legendSettings.position !==
      nextPosition
    ) {
      chart.legendSettings.position =
        nextPosition;

      chart.refresh();
    }
  }, 150);
};

window.addEventListener(
  'resize',
  handleResize
);

window.addEventListener('beforeunload', () => {
  window.clearTimeout(resizeTimer);

  window.removeEventListener(
    'resize',
    handleResize
  );

  chart.destroy();
});
```

**HTML:**

```html
<div
  id="chart"
  role="region"
  aria-label="Pie chart showing regional distribution"
></div>

<p id="legend-status" aria-live="polite">
  Select a legend item to update the chart.
</p>
```

**CSS:**

```css
#chart {
  width: 100%;
  min-height: 420px;
}
```

## Complete JavaScript Example

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationLegend,
  ej.charts.AccumulationHighlight
);

var chartData = [
  {
    region: 'Northern Region',
    value: 135,
    color: '#0F6CBD'
  },
  {
    region: 'Southern Region',
    value: 198,
    color: '#D83B01'
  },
  {
    region: 'Eastern Region',
    value: 160,
    color: '#107C10'
  },
  {
    region: 'Western Region',
    value: 121,
    color: '#8764B8'
  }
];

var mobileBreakpoint = 768;
var resizeTimer;
var statusElement =
  document.getElementById('legend-status');

function getLegendPosition() {
  return window.innerWidth > mobileBreakpoint
    ? 'Right'
    : 'Bottom';
}

var chart =
  new ej.charts.AccumulationChart({
    title: 'Regional Distribution',
    width: '100%',
    height: '420px',
    legendClick: function (args) {
      if (statusElement) {
        statusElement.textContent =
          'Legend item selected: ' +
          String(args.legendText);
      }
    },
    legendSettings: {
      visible: true,
      position: getLegendPosition(),
      alignment: 'Center',
      background: '#FFFFFF',
      border: {
        color: '#D3D3D3',
        width: 1
      },
      textStyle: {
        color: '#424242',
        fontFamily: 'Segoe UI',
        size: '12px',
        fontStyle: 'Normal',
        fontWeight: '400'
      },
      shapeWidth: 12,
      shapeHeight: 12,
      shapePadding: 8,
      itemPadding: 12,
      containerPadding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      },
      maximumLabelWidth: 160,
      textWrap: 'Wrap',
      enablePages: true,
      toggleVisibility: true,
      enableHighlight: true
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'value',
        pointColorMapping: 'color',
        type: 'Pie',
        name: 'Regions'
      }
    ]
  });

chart.appendTo('#chart');

function handleResize() {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(
    function () {
      var nextPosition =
        getLegendPosition();

      if (
        chart.legendSettings.position !==
        nextPosition
      ) {
        chart.legendSettings.position =
          nextPosition;

        chart.refresh();
      }
    },
    150
  );
}

window.addEventListener(
  'resize',
  handleResize
);

window.addEventListener(
  'beforeunload',
  function () {
    window.clearTimeout(resizeTimer);

    window.removeEventListener(
      'resize',
      handleResize
    );

    chart.destroy();
  }
);
```

## Common Legend Patterns

### Top Legend with Horizontal Layout

```typescript
legendSettings: {
  visible: true,
  position: 'Top',
  alignment: 'Center',
  layout: 'Horizontal'
}
```

### Right Legend with Vertical Layout

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  alignment: 'Center',
  layout: 'Vertical'
}
```

### Hidden Legend

```typescript
legendSettings: {
  visible: false
}
```

### Custom Styled Legend

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  alignment: 'Center',
  background: '#F8F9FA',
  border: {
    color: '#0078D4',
    width: 2
  },
  textStyle: {
    color: '#005A9E',
    fontFamily: 'Segoe UI',
    size: '13px',
    fontWeight: '500'
  },
  shapeWidth: 14,
  shapeHeight: 14,
  shapePadding: 8,
  itemPadding: 12
}
```

### Reversed Legend

```typescript
legendSettings: {
  visible: true,
  position: 'Bottom',
  reverse: true
}
```

### Legend with Paging

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  width: '180px',
  height: '200px',
  enablePages: true
}
```

## Troubleshooting

### Legend Is Not Displayed

- Import `AccumulationLegend`.
- Inject `AccumulationLegend` through `AccumulationChart.Inject(...)`.
- Set `legendSettings.visible` to `true`.
- Ensure that the series is rendered successfully.
- Ensure that `xName` maps to meaningful category values.
- Ensure that the chart container has a valid width and height.
- Confirm that the legend text color contrasts with its background.
- Check the browser console for runtime errors.

### Legend Position Is Incorrect

- Set `legendSettings.position` to a supported value.
- Use `Auto`, `Left`, `Right`, `Top`, `Bottom`, or `Custom`.
- Use `location` only when `position` is `Custom`.
- Use numeric `location.x` and `location.y` values.
- Do not use direct `x` and `y` properties inside `legendSettings`.
- Check whether `enableRtl` changes the visual interpretation of `Near` and `Far`.

### Custom Legend Location Is Not Applied

- Set `position` to `Custom`.
- Configure `location: { x, y }`.
- Use numeric coordinates.
- Do not use values such as `100px`.
- Ensure that the coordinates place the legend inside the visible chart area.

### Legend Text Style Is Not Applied

- Use `legendSettings.textStyle`.
- Use `textStyle.size`, not `textStyle.fontSize`.
- Supply a valid font-size string such as `12px`.
- Ensure that the text color contrasts with the background.
- Check whether the selected theme supplies stronger defaults.

### Long Legend Text Is Clipped

- Set `maximumLabelWidth`.
- Configure an appropriate `textWrap` value.
- Increase the legend width.
- Move the legend to the top or bottom.
- Shorten excessively long category names.
- Enable paging when many legend items exist.

### Legend Overlaps the Chart

- Use `position: 'Auto'`.
- Move the legend to `Top` or `Bottom`.
- Increase the chart dimensions.
- Reduce the legend item padding.
- Reduce the legend text size carefully.
- Set explicit legend `width` and `height`.
- Verify that a custom location does not overlap the series.

### Legend Click Does Not Toggle a Point

- Set `toggleVisibility` to `true`.
- Ensure that the legend item represents a valid rendered point.
- Ensure that application code does not cancel the `legendClick` event.
- Confirm that another element is not covering the legend.
- Check whether pointer events are disabled by CSS.

### Legend Highlight Is Not Working

- Set `legendSettings.enableHighlight` to `true`.
- Import and inject `AccumulationHighlight` when chart highlighting is required.
- Ensure that pointer events are not blocked.
- Confirm that the hovered legend item maps to a rendered point.

### Custom Point Colors Are Not Reflected in the Legend

- Set the series `pointColorMapping` to the data-source color-field name.
- Ensure that every data point contains that field.
- Ensure that every mapped value is a valid CSS color.
- Do not set `pointColorMapping` to a literal color value.
- Check whether a point-render event is replacing the mapped color.