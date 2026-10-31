# Styling & Appearance

## Table of Contents

- [Styling & Appearance](#styling--appearance)
  - [Overview](#overview)
  - [Color Schemes](#color-schemes)
    - [Custom Color Palettes](#custom-color-palettes)
    - [Custom Color per Series](#custom-color-per-series)
    - [Point Color Mapping](#point-color-mapping)
    - [Conditional Point Coloring](#conditional-point-coloring)
    - [Linear Gradient](#linear-gradient)
    - [Radial Gradient](#radial-gradient)
  - [Fonts and Text](#fonts-and-text)
    - [Title and Subtitle](#title-and-subtitle)
    - [Axis Label Font](#axis-label-font)
    - [Axis Title Font](#axis-title-font)
    - [Data Label Font](#data-label-font)
    - [Legend Font](#legend-font)
    - [Tooltip Font](#tooltip-font)
  - [Borders and Backgrounds](#borders-and-backgrounds)
    - [Chart Background and Border](#chart-background-and-border)
    - [Series Border](#series-border)
    - [Marker Border](#marker-border)
    - [Data Label Border](#data-label-border)
    - [Tooltip Border](#tooltip-border)
  - [Chart Area Styling](#chart-area-styling)
    - [Plot Area Background](#plot-area-background)
    - [Chart Area Border](#chart-area-border)
    - [Background Image](#background-image)
    - [Grid Lines](#grid-lines)
  - [Responsive Design](#responsive-design)
    - [Responsive Sizing](#responsive-sizing)
    - [Responsive Configuration](#responsive-configuration)
    - [CSS Media Queries](#css-media-queries)
  - [Themes](#themes)
    - [Apply a Theme](#apply-a-theme)
    - [Supported Themes](#supported-themes)
    - [Dynamic Theme Switching](#dynamic-theme-switching)
    - [Custom Appearance](#custom-appearance)


## Overview

The EJ2 Chart appearance can be customized through built-in themes, chart-level color palettes, series fills, data-driven point colors, gradients, text styles, chart-area settings, borders, grid lines, markers, data labels, legends, and tooltips.

Use supported Chart properties for generated SVG elements. Use application CSS primarily for the chart container and surrounding controls.

The Chart supports custom color palettes through the `palettes` property, data-driven colors through `pointColorMapping`, and conditional point customization through rendering events.

## Color Schemes

### Custom Color Palettes

Use the chart-level `palettes` property to provide a custom color collection.

```typescript
const chart: Chart = new Chart({
  palettes: [
    '#FF5733',
    '#33A852',
    '#3357FF',
    '#8764B8',
    '#C19C00'
  ],
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
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

Use `palettes`, not `palette`.

Incorrect:

```typescript
palette: [
  '#FF5733',
  '#33A852'
]
```

Correct:

```typescript
palettes: [
  '#FF5733',
  '#33A852'
]
```

The palette accepts standard CSS color formats, including hexadecimal, RGB, RGBA, HSL, and HWB values.

Built-in theme names must not be assigned to `palettes`.

Incorrect:

```typescript
palettes: 'Material'
```

Correct:

```typescript
theme: 'Material'
```

### Custom Color per Series

Use the series `fill` property to assign a specific color.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'sales',
    type: 'Column',
    name: 'Sales',
    fill: '#FF5733'
  },
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'revenue',
    type: 'Column',
    name: 'Revenue',
    fill: '#33A852'
  }
]
```

A series-level `fill` overrides the color that would otherwise be assigned from the chart palette.

### Point Color Mapping

Use `pointColorMapping` to map individual point colors from the data source.

```typescript
interface SalesData {
  month: string;
  sales: number;
  color: string;
}

const chartData: SalesData[] = [
  {
    month: 'Jan',
    sales: 35,
    color: '#0F6CBD'
  },
  {
    month: 'Feb',
    sales: 52,
    color: '#107C10'
  },
  {
    month: 'Mar',
    sales: 28,
    color: '#D13438'
  },
  {
    month: 'Apr',
    sales: 44,
    color: '#8764B8'
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      pointColorMapping: 'color',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

Every mapped value must be a valid CSS color.

### Conditional Point Coloring

Use the chart-level `pointRender` event to assign a point color conditionally.

**TypeScript:**

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

    if (value > 80) {
      args.fill = '#D13438';
    } else if (value > 50) {
      args.fill = '#C19C00';
    } else {
      args.fill = '#107C10';
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

**JavaScript:**

```javascript
pointRender: function (args) {
  var value = Number(args.point.y);

  if (value > 80) {
    args.fill = '#D13438';
  } else if (value > 50) {
    args.fill = '#C19C00';
  } else {
    args.fill = '#107C10';
  }
}
```

Configure `pointRender` at the Chart level, not inside a series.

Do not communicate essential status through color alone. Supplement conditional colors with data labels, tooltips, a legend, or descriptive text.

### Linear Gradient

The current Chart API supports series-level linear gradients through `linearGradient`. The gradient uses coordinates and a collection of color stops.

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        gradientColorStop: [
          {
            color: '#4F46E5',
            offset: 0,
            opacity: 1,
            lighten: 0,
            brighten: 0
          },
          {
            color: '#22D3EE',
            offset: 100,
            opacity: 0.95,
            lighten: 0,
            brighten: 0.4
          }
        ]
      }
    }
  ]
});

chart.appendTo('#chart');
```

Gradient settings include:

- `x1` and `y1` for the starting position.
- `x2` and `y2` for the ending position.
- `gradientColorStop` for the color stops.
- `offset` values between `0` and `100`.
- `opacity` values between `0` and `1`.
- `lighten` values for lightness adjustment.
- `brighten` values for brightness adjustment.

Do not depend on a manually declared external SVG gradient when the supported `linearGradient` property satisfies the requirement.

### Radial Gradient

Use `radialGradient` when colors should transition outward from a center point.

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      radialGradient: {
        cx: 0.5,
        cy: 0.5,
        r: 0.5,
        fx: 0.5,
        fy: 0.5,
        gradientColorStop: [
          {
            color: '#60A5FA',
            offset: 0,
            opacity: 1
          },
          {
            color: '#1D4ED8',
            offset: 100,
            opacity: 1
          }
        ]
      }
    }
  ]
});

chart.appendTo('#chart');
```

Use gradient properties supported by the installed `@syncfusion/ej2-charts` package version.

## Fonts and Text

### Title and Subtitle

Use `title`, `subTitle`, `titleStyle`, and `subTitleStyle`.

```typescript
const chart: Chart = new Chart({
  title: 'Sales Report',
  subTitle: 'Quarter 4, 2026',
  titleStyle: {
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '600',
    size: '18px',
    color: '#333333',
    opacity: 1,
    textAlignment: 'Center'
  },
  subTitleStyle: {
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '400',
    size: '14px',
    color: '#666666',
    opacity: 1,
    textAlignment: 'Center'
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

Use `fontWeight` for bold text.

Incorrect:

```typescript
titleStyle: {
  fontStyle: 'Bold'
}
```

Correct:

```typescript
titleStyle: {
  fontStyle: 'Normal',
  fontWeight: '600'
}
```

Use `textAlignment`, not `alignment`, inside compatible Chart text-style settings.

### Axis Label Font

Use the axis `labelStyle` property.

```typescript
primaryXAxis: {
  labelStyle: {
    size: '12px',
    color: '#333333',
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '400',
    opacity: 1
  }
},
primaryYAxis: {
  labelStyle: {
    size: '12px',
    color: '#333333',
    fontFamily: 'Arial',
    fontWeight: '400'
  }
}
```

### Axis Title Font

Use a string for the axis `title` and `titleStyle` for its appearance.

```typescript
primaryXAxis: {
  title: 'Months',
  titleStyle: {
    size: '14px',
    fontFamily: 'Arial',
    fontWeight: '600',
    color: '#333333'
  }
}
```

Incorrect:

```typescript
primaryXAxis: {
  title: {
    text: 'Months',
    style: {
      size: '14px'
    }
  }
}
```

Correct:

```typescript
primaryXAxis: {
  title: 'Months',
  titleStyle: {
    size: '14px'
  }
}
```

### Data Label Font

For a regular Cartesian Chart, data labels are configured inside `marker.dataLabel`.

Import and inject `DataLabel` before enabling them.

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  DataLabel
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  DataLabel
);
```

Configure the data label:

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'sales',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Outer',
        format: '${point.y:n0}',
        font: {
          size: '12px',
          color: '#242424',
          fontFamily: 'Arial',
          fontWeight: '600'
        }
      }
    }
  }
]
```

Do not place a regular Chart data label directly at the series root.

### Legend Font

Use `legendSettings`, not `legend`.

Import and inject `Legend` when the legend is visible.

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  textStyle: {
    size: '12px',
    color: '#333333',
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '400'
  }
}
```

### Tooltip Font

Import and inject `Tooltip` when tooltips are enabled.

```typescript
tooltip: {
  enable: true,
  fill: '#FFFFFF',
  border: {
    color: '#333333',
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

Preserve inline tooltip formatting such as `${point.y:n2}`.

## Borders and Backgrounds

### Chart Background and Border

Use the chart-level `background` and `border` properties.

```typescript
const chart: Chart = new Chart({
  background: '#F8FAFC',
  border: {
    color: '#D3D3D3',
    width: 1
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

### Series Border

Use the series `border` property.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'sales',
    type: 'Column',
    fill: '#FF5733',
    opacity: 0.8,
    border: {
      color: '#9B2C1F',
      width: 1
    }
  }
]
```

### Marker Border

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'sales',
    type: 'Line',
    marker: {
      visible: true,
      width: 10,
      height: 10,
      fill: '#FFFFFF',
      border: {
        color: '#333333',
        width: 2
      }
    }
  }
]
```

### Data Label Border

```typescript
marker: {
  dataLabel: {
    visible: true,
    position: 'Outer',
    fill: '#FFFFFF',
    border: {
      color: '#808080',
      width: 1
    },
    rx: 4,
    ry: 4
  }
}
```

### Tooltip Border

```typescript
tooltip: {
  enable: true,
  fill: '#FFFFFF',
  border: {
    color: '#333333',
    width: 1
  },
  textStyle: {
    color: '#242424',
    size: '12px'
  }
}
```

## Chart Area Styling

### Plot Area Background

Use `chartArea.background` to customize the plotting area.

```typescript
chartArea: {
  background: '#F9F9F9'
}
```

Do not rely on an unverified chart-level `plotAreaBackground` property.

### Chart Area Border

```typescript
chartArea: {
  background: '#FFFFFF',
  border: {
    color: '#DDDDDD',
    width: 1
  }
}
```

The `chartArea` property can be combined with axis grid-line settings.

```typescript
const chart: Chart = new Chart({
  chartArea: {
    background: '#F5F5F5',
    border: {
      color: '#D3D3D3',
      width: 1
    }
  },
  primaryXAxis: {
    valueType: 'Category',
    majorGridLines: {
      color: '#E0E0E0',
      width: 1
    }
  },
  primaryYAxis: {
    majorGridLines: {
      color: '#E0E0E0',
      width: 1
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

### Background Image

Use `chartArea.backgroundImage` when the plot area requires an image.

```typescript
chartArea: {
  backgroundImage: '/assets/chart-background.png'
}
```

Ensure that:

- The image URL is valid.
- The image is available when the chart renders.
- The image does not reduce text or series contrast.
- The image is decorative and does not carry essential information.

### Grid Lines

Use axis-level `majorGridLines` and `minorGridLines`.

```typescript
primaryYAxis: {
  majorGridLines: {
    width: 1,
    color: '#E0E0E0',
    dashArray: '5,5'
  },
  minorTicksPerInterval: 4,
  minorGridLines: {
    width: 0.5,
    color: '#F0F0F0',
    dashArray: '2,2'
  }
}
```

Set `minorTicksPerInterval` to a value greater than zero when minor grid lines are required.

## Responsive Design

### Responsive Sizing

Use a percentage width and a stable height.

```typescript
const chart: Chart = new Chart({
  width: '100%',
  height: '420px',
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

Use application CSS to define the chart container.

```css
#chart {
  width: 100%;
  min-height: 420px;
}
```

Avoid `height: '100%'` unless the complete parent hierarchy has resolved heights.

Do not call `chart.refresh()` continuously for every raw resize event.

### Responsive Configuration

When application-specific settings must change at a breakpoint, use a debounced resize handler.

```typescript
let resizeTimer: number | undefined;

const getResponsiveSettings = (): {
  height: string;
  legendPosition: 'Right' | 'Bottom';
  titleSize: string;
} => {
  const isMobile: boolean =
    window.innerWidth < 768;

  return {
    height: isMobile
      ? '320px'
      : '420px',
    legendPosition: isMobile
      ? 'Bottom'
      : 'Right',
    titleSize: isMobile
      ? '16px'
      : '18px'
  };
};

const initialSettings =
  getResponsiveSettings();

const chart: Chart = new Chart({
  width: '100%',
  height: initialSettings.height,
  title: 'Sales',
  titleStyle: {
    size: initialSettings.titleSize
  },
  legendSettings: {
    visible: true,
    position:
      initialSettings.legendPosition,
    alignment: 'Center'
  },
  primaryXAxis: {
    valueType: 'Category'
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

const handleResize = (): void => {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(() => {
    const nextSettings =
      getResponsiveSettings();

    chart.height =
      nextSettings.height;

    chart.legendSettings.position =
      nextSettings.legendPosition;

    chart.titleStyle.size =
      nextSettings.titleSize;

    chart.refresh();
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

Avoid changing the chart type solely because the viewport changes. A Line Chart and Column Chart communicate different visual relationships. Change the type only when the application has validated the semantic impact.

### CSS Media Queries

Use CSS for container dimensions and application-owned elements.

```css
.chart-container {
  width: 100%;
  min-height: 420px;
  padding: 16px;
  box-sizing: border-box;
}

@media (max-width: 767px) {
  .chart-container {
    min-height: 320px;
    padding: 8px;
  }
}
```

Avoid depending on undocumented internal selectors such as `.e-chart-title`. Use `titleStyle` for the generated Chart title.

## Themes

### Apply a Theme

Use the chart-level `theme` property.

```typescript
const chart: Chart = new Chart({
  theme: 'Material',
  primaryXAxis: {
    valueType: 'Category'
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

Themes control the default colors and text appearance. Explicit series fills, palettes, point mappings, backgrounds, and text settings can override theme defaults.

### Supported Themes

Common theme families include:

- `Material`
- `MaterialDark`
- `Material3`
- `Material3Dark`
- `Fabric`
- `FabricDark`
- `Bootstrap`
- `BootstrapDark`
- `Bootstrap4`
- `Bootstrap5`
- `Bootstrap5Dark`
- `Bootstrap5_3`
- `Bootstrap5_3Dark`
- `Tailwind`
- `TailwindDark`
- `Tailwind3`
- `Tailwind3Dark`
- `Fluent`
- `FluentDark`
- `Fluent2`
- `Fluent2Dark`
- `HighContrast`

Use an exact theme value supported by the installed `@syncfusion/ej2-charts` package version. Syncfusion also provides Material 3, Fluent 2, Tailwind 3, Bootstrap 5.3, and their corresponding dark themes within its current theme families.

Use `HighContrast`, not `Highcontrast`.

### Dynamic Theme Switching

```typescript
type SupportedTheme =
  | 'Material'
  | 'MaterialDark'
  | 'Fluent'
  | 'FluentDark'
  | 'Fluent2'
  | 'Fluent2Dark'
  | 'Bootstrap5'
  | 'Bootstrap5Dark'
  | 'HighContrast';

function switchTheme(
  themeName: SupportedTheme
): void {
  chart.theme = themeName;
  chart.refresh();
}

const themeSelector:
  HTMLSelectElement | null =
  document.getElementById(
    'theme-selector'
  ) as HTMLSelectElement | null;

themeSelector?.addEventListener(
  'change',
  (): void => {
    switchTheme(
      themeSelector.value as SupportedTheme
    );
  }
);
```

Example HTML:

```html
<label for="theme-selector">
  Chart theme
</label>

<select id="theme-selector">
  <option value="Material">
    Material
  </option>
  <option value="Fluent">
    Fluent
  </option>
  <option value="Fluent2">
    Fluent 2
  </option>
  <option value="Bootstrap5">
    Bootstrap 5
  </option>
  <option value="HighContrast">
    High Contrast
  </option>
</select>
```

### Custom Appearance

A custom Chart appearance is created by assigning supported properties. It is not registered as a new built-in theme.

```typescript
interface CustomChartAppearance {
  palettes: string[];
  background: string;
  chartArea: {
    background: string;
    border: {
      color: string;
      width: number;
    };
  };
  titleStyle: {
    color: string;
    size: string;
    fontFamily: string;
    fontWeight: string;
  };
}

const customAppearance:
  CustomChartAppearance = {
    palettes: [
      '#FF5733',
      '#33A852',
      '#3357FF'
    ],
    background: '#FFFFFF',
    chartArea: {
      background: '#F9F9F9',
      border: {
        color: '#DDDDDD',
        width: 1
      }
    },
    titleStyle: {
      color: '#242424',
      size: '20px',
      fontFamily: 'Segoe UI',
      fontWeight: '600'
    }
  };

chart.palettes =
  customAppearance.palettes;

chart.background =
  customAppearance.background;

chart.chartArea =
  customAppearance.chartArea;

chart.titleStyle =
  customAppearance.titleStyle;

chart.refresh();
```

Use `palettes`, not `palette`.

## Common Configurations

### Modern Dashboard Style

```typescript
const chart: Chart = new Chart({
  theme: 'Fluent',
  palettes: [
    '#0078D4',
    '#50E6FF',
    '#00BCF2',
    '#1081D1'
  ],
  background: '#FFFFFF',
  chartArea: {
    background: '#FFFFFF',
    border: {
      color: '#E0E0E0',
      width: 1
    }
  },
  title: 'Sales Dashboard',
  titleStyle: {
    fontFamily: 'Segoe UI',
    size: '18px',
    color: '#333333',
    fontStyle: 'Normal',
    fontWeight: '600'
  },
  primaryXAxis: {
    valueType: 'Category',
    labelStyle: {
      color: '#666666'
    },
    majorGridLines: {
      width: 0
    }
  },
  primaryYAxis: {
    labelStyle: {
      color: '#666666'
    },
    majorGridLines: {
      color: '#E0E0E0',
      width: 1
    }
  },
  legendSettings: {
    visible: true,
    position: 'Right',
    textStyle: {
      color: '#333333'
    }
  },
  tooltip: {
    enable: true,
    fill: '#FFFFFF',
    border: {
      color: '#DDDDDD',
      width: 1
    },
    textStyle: {
      color: '#242424'
    },
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
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

### Minimalist Style

```typescript
const chart: Chart = new Chart({
  theme: 'Bootstrap',
  palettes: [
    '#333333',
    '#666666',
    '#999999'
  ],
  background: '#FFFFFF',
  chartArea: {
    background: '#FFFFFF',
    border: {
      width: 0
    }
  },
  primaryXAxis: {
    valueType: 'Category',
    majorGridLines: {
      width: 0
    },
    majorTickLines: {
      width: 0
    },
    lineStyle: {
      width: 0
    }
  },
  primaryYAxis: {
    majorGridLines: {
      color: '#E0E0E0',
      width: 1
    },
    majorTickLines: {
      width: 0
    },
    lineStyle: {
      width: 0
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales',
      width: 2,
      marker: {
        visible: false
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Conditional Analysis Chart

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  DataLabel,
  IPointRenderEventArgs,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  DataLabel,
  Tooltip
);

const chart: Chart = new Chart({
  pointRender: (
    args: IPointRenderEventArgs
  ): void => {
    const value: number =
      Number(args.point?.y);

    if (value >= 80) {
      args.fill = '#D13438';
    } else if (value >= 50) {
      args.fill = '#C19C00';
    } else {
      args.fill = '#107C10';
    }
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'Value: ${point.y:n2}'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      marker: {
        dataLabel: {
          visible: true,
          position: 'Outer',
          format: '${point.y:n0}',
          font: {
            color: '#242424',
            fontWeight: '600'
          }
        }
      }
    }
  ]
});

chart.appendTo('#chart');
```

## Complete TypeScript Example

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  DataLabel,
  IPointRenderEventArgs,
  Legend,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  DataLabel,
  Legend,
  Tooltip
);

interface SalesData {
  month: string;
  sales: number;
  target: number;
}

const chartData: SalesData[] = [
  {
    month: 'Jan',
    sales: 42,
    target: 50
  },
  {
    month: 'Feb',
    sales: 58,
    target: 55
  },
  {
    month: 'Mar',
    sales: 76,
    target: 65
  },
  {
    month: 'Apr',
    sales: 68,
    target: 70
  },
  {
    month: 'May',
    sales: 84,
    target: 75
  }
];

const getResponsiveHeight = (): string =>
  window.innerWidth < 768
    ? '340px'
    : '440px';

const getLegendPosition = ():
  'Bottom' | 'Right' =>
  window.innerWidth < 768
    ? 'Bottom'
    : 'Right';

const chart: Chart = new Chart({
  title: 'Monthly Sales Performance',
  subTitle: 'Fiscal Year 2026',
  theme: 'Fluent2',
  width: '100%',
  height: getResponsiveHeight(),
  background: '#FFFFFF',
  palettes: [
    '#0F6CBD',
    '#8764B8'
  ],
  pointRender: (
    args: IPointRenderEventArgs
  ): void => {
    if (
      args.series.name === 'Sales' &&
      Number(args.point?.y) >= 75
    ) {
      args.fill = '#107C10';
    }
  },
  titleStyle: {
    color: '#1F4E79',
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: '600',
    size: '18px',
    textAlignment: 'Center'
  },
  subTitleStyle: {
    color: '#666666',
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: '400',
    size: '13px',
    textAlignment: 'Center'
  },
  chartArea: {
    background: '#F8FAFC',
    border: {
      color: '#D3D3D3',
      width: 1
    }
  },
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    titleStyle: {
      color: '#424242',
      fontFamily: 'Segoe UI',
      size: '13px',
      fontWeight: '600'
    },
    labelStyle: {
      color: '#5A5A5A',
      fontFamily: 'Segoe UI',
      size: '12px'
    },
    majorGridLines: {
      width: 0
    },
    majorTickLines: {
      width: 0
    }
  },
  primaryYAxis: {
    title: 'Sales',
    labelFormat: '{value}',
    titleStyle: {
      color: '#424242',
      fontFamily: 'Segoe UI',
      size: '13px',
      fontWeight: '600'
    },
    labelStyle: {
      color: '#5A5A5A',
      fontFamily: 'Segoe UI',
      size: '12px'
    },
    majorGridLines: {
      color: '#E0E0E0',
      width: 1,
      dashArray: '4,4'
    },
    majorTickLines: {
      width: 0
    },
    lineStyle: {
      width: 0
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
      color: '#333333',
      fontFamily: 'Segoe UI',
      size: '12px'
    }
  },
  tooltip: {
    enable: true,
    shared: true,
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
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      border: {
        color: '#FFFFFF',
        width: 1
      },
      cornerRadius: {
        topLeft: 4,
        topRight: 4,
        bottomLeft: 0,
        bottomRight: 0
      },
      marker: {
        dataLabel: {
          visible: true,
          position: 'Outer',
          format: '${point.y:n0}',
          fill: '#FFFFFF',
          border: {
            color: '#808080',
            width: 1
          },
          rx: 3,
          ry: 3,
          font: {
            color: '#242424',
            fontFamily: 'Segoe UI',
            size: '11px',
            fontWeight: '600'
          }
        }
      }
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'target',
      type: 'Column',
      name: 'Target',
      opacity: 0.75,
      border: {
        color: '#FFFFFF',
        width: 1
      },
      cornerRadius: {
        topLeft: 4,
        topRight: 4,
        bottomLeft: 0,
        bottomRight: 0
      }
    }
  ]
});

chart.appendTo('#chart');

let resizeTimer: number | undefined;

const handleResize = (): void => {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(() => {
    chart.height =
      getResponsiveHeight();

    chart.legendSettings.position =
      getLegendPosition();

    chart.refresh();
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
  class="chart-container"
  role="region"
  aria-label="Column chart showing monthly sales and targets"
></div>
```

**CSS:**

```css
.chart-container {
  width: 100%;
  min-height: 440px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  background: #FFFFFF;
  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.1);
}

@media (max-width: 767px) {
  .chart-container {
    min-height: 340px;
    padding: 8px;
  }
}
```

## Complete JavaScript Example

```javascript
ej.charts.Chart.Inject(
  ej.charts.ColumnSeries,
  ej.charts.Category,
  ej.charts.DataLabel,
  ej.charts.Legend,
  ej.charts.Tooltip
);

var chartData = [
  {
    month: 'Jan',
    sales: 42,
    target: 50
  },
  {
    month: 'Feb',
    sales: 58,
    target: 55
  },
  {
    month: 'Mar',
    sales: 76,
    target: 65
  },
  {
    month: 'Apr',
    sales: 68,
    target: 70
  },
  {
    month: 'May',
    sales: 84,
    target: 75
  }
];

function getResponsiveHeight() {
  return window.innerWidth < 768
    ? '340px'
    : '440px';
}

function getLegendPosition() {
  return window.innerWidth < 768
    ? 'Bottom'
    : 'Right';
}

var chart = new ej.charts.Chart({
  title: 'Monthly Sales Performance',
  subTitle: 'Fiscal Year 2026',
  theme: 'Fluent2',
  width: '100%',
  height: getResponsiveHeight(),
  background: '#FFFFFF',
  palettes: [
    '#0F6CBD',
    '#8764B8'
  ],
  pointRender: function (args) {
    if (
      args.series.name === 'Sales' &&
      Number(args.point.y) >= 75
    ) {
      args.fill = '#107C10';
    }
  },
  titleStyle: {
    color: '#1F4E79',
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: '600',
    size: '18px',
    textAlignment: 'Center'
  },
  chartArea: {
    background: '#F8FAFC',
    border: {
      color: '#D3D3D3',
      width: 1
    }
  },
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    labelStyle: {
      color: '#5A5A5A',
      size: '12px'
    },
    majorGridLines: {
      width: 0
    }
  },
  primaryYAxis: {
    title: 'Sales',
    labelStyle: {
      color: '#5A5A5A',
      size: '12px'
    },
    majorGridLines: {
      color: '#E0E0E0',
      width: 1,
      dashArray: '4,4'
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
    }
  },
  tooltip: {
    enable: true,
    shared: true,
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
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      cornerRadius: {
        topLeft: 4,
        topRight: 4,
        bottomLeft: 0,
        bottomRight: 0
      },
      marker: {
        dataLabel: {
          visible: true,
          position: 'Outer',
          format: '${point.y:n0}'
        }
      }
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'target',
      type: 'Column',
      name: 'Target',
      opacity: 0.75,
      cornerRadius: {
        topLeft: 4,
        topRight: 4,
        bottomLeft: 0,
        bottomRight: 0
      }
    }
  ]
});

chart.appendTo('#chart');
```

## Troubleshooting

### Custom Palette Is Not Applied

- Use `palettes`, not `palette`.
- Provide an array of valid CSS colors.
- Check whether a series-level `fill` overrides the palette.
- Check whether `pointColorMapping` overrides the series color.
- Check whether `pointRender` changes the point fill.
- Ensure that the series renders successfully.

### Theme Is Not Applied

- Set the chart-level `theme` property.
- Use an exact theme name supported by the installed package.
- Use `HighContrast`, not `Highcontrast`.
- Check whether explicit colors override theme defaults.
- Call `refresh()` after changing the theme dynamically.

### Point Color Is Not Updated

- Configure `pointRender` at the Chart level.
- Use `args.fill`.
- Ensure that `args.point.y` resolves to a valid number.
- Do not place `pointRender` inside a series object.
- Check whether `pointColorMapping` or a gradient overrides the color.

### Gradient Is Not Displayed

- Use `linearGradient` or `radialGradient` on a supported series.
- Provide at least two gradient color stops.
- Keep offsets between `0` and `100`.
- Keep opacity values between `0` and `1`.
- Use valid CSS colors.
- Verify gradient support in the installed package version.

### Chart Title Style Is Not Applied

- Use `titleStyle`.
- Use `fontWeight` for bold text.
- Use `fontStyle` for values such as `Normal` or `Italic`.
- Use `textAlignment`, not `alignment`.
- Ensure that explicit application CSS is not covering the chart title.

### Axis Title Style Is Not Applied

- Use a string for the axis `title`.
- Use `titleStyle` for the appearance.
- Do not configure `title` as an object containing `text` and `style`.

### Data Label Style Is Not Applied

- Import and inject `DataLabel`.
- Place `dataLabel` inside `marker`.
- Set `marker.dataLabel.visible` to `true`.
- Use `font.fontWeight`, not `font.weight`.
- Use a supported data-label position.

### Legend Style Is Not Applied

- Import and inject `Legend`.
- Use `legendSettings`, not `legend`.
- Set `legendSettings.visible` to `true`.
- Use `legendSettings.textStyle`.

### Tooltip Style Is Not Applied

- Import and inject `Tooltip`.
- Set `tooltip.enable` to `true`.
- Use `tooltip.fill` for the background.
- Use `tooltip.border` for the border.
- Use `tooltip.textStyle` for text appearance.

### Chart Is Not Responsive

- Use `width: '100%'`.
- Give the chart or parent container a resolved height.
- Avoid `height: '100%'` without resolved parent heights.
- Use CSS media queries for container sizing.
- Debounce resize handlers.
- Avoid calling `refresh()` continuously during raw resize events.

### Background Image Reduces Readability

- Use a low-contrast decorative image.
- Ensure that labels, grid lines, and series remain visible.
- Add an appropriate chart-area background or opacity.
- Do not use a background image as the only source of essential information.

## Next Steps

- **Configure interactions:** See `references/features-interaction.md`.
- **Add advanced features:** See `references/advanced-features.md`.
- **Handle data:** See `references/data-handling.md`.
- **Configure series:** See `references/series-configuration.md`.
- **Customize axes:** See `references/axes-customization.md`.
- **Configure tooltips:** See `references/tooltip-configuration.md`.
