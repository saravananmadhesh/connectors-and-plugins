# Data Labels

## Table of Contents

- [Data Labels](#data-labels)
  - [Overview](#overview)
  - [Module Injection](#module-injection)
  - [Enabling Data Labels](#enabling-data-labels)
    - [TypeScript Example](#typescript-example)
    - [JavaScript Example](#javascript-example)
  - [Label Content](#label-content)
    - [Default Label Content](#default-label-content)
    - [Mapped Label Content](#mapped-label-content)
  - [Positioning](#positioning)
    - [Inside Position](#inside-position)
    - [Outside Position](#outside-position)
    - [Connector Lines](#connector-lines)
  - [Smart Labels and Arrangement](#smart-labels-and-arrangement)
  - [Formatting and Templates](#formatting-and-templates)
    - [Format String](#format-string)
    - [Format Placeholders](#format-placeholders)
    - [Data Label Template](#data-label-template)
  - [Customization Options](#customization-options)
    - [Font Customization](#font-customization)
    - [Fill Border and Rounded Corners](#fill-border-and-rounded-corners)
    - [Margin](#margin)
    - [Label Rotation](#label-rotation)
    - [Text Wrapping](#text-wrapping)
  - [Complete TypeScript Example](#complete-typescript-example)
  - [Complete JavaScript Example](#complete-javascript-example)
  - [Common Data Label Patterns](#common-data-label-patterns)
    - [Category Only](#category-only)
    - [Preformatted Category and Value](#preformatted-category-and-value)
    - [Category and Percentage](#category-and-percentage)
    - [Styled Outside Labels](#styled-outside-labels)
  - [Troubleshooting](#troubleshooting)
    - [Data Labels Are Not Displayed](#data-labels-are-not-displayed)
    - [Mapped Label Text Is Not Displayed](#mapped-label-text-is-not-displayed)
    - [Labels Are Overlapping](#labels-are-overlapping)
    - [Labels Are Clipped](#labels-are-clipped)
    - [Label Background Is Not Applied](#label-background-is-not-applied)
    - [Label Font Weight Is Not Applied](#label-font-weight-is-not-applied)
    - [Rounded Corners Are Not Applied](#rounded-corners-are-not-applied)
    - [Label Rotation Is Not Applied](#label-rotation-is-not-applied)
    - [Connector Lines Are Not Displayed](#connector-lines-are-not-displayed)
    - [Template Is Not Displayed](#template-is-not-displayed)


## Overview

Data labels display information directly on or near Accumulation Chart points. They can show category names, numeric values, percentages, or custom content without requiring users to open a tooltip or refer to the legend.

The Accumulation Chart data-label settings support visibility, label-field mapping, inside and outside positioning, templates, font styling, borders, connector lines, fill colors, margins, rounded corners, rotation, and text wrapping.

Use data labels to:

- Display category names.
- Display exact values.
- Display percentage contributions.
- Highlight important information.
- Improve chart readability.
- Reduce dependence on legends and tooltips.

Avoid displaying too much content in every label. Long labels can overlap or reduce the available chart area.

## Module Injection

Import and inject `AccumulationDataLabel` before enabling data labels.

For Pie and Doughnut charts, inject `PieSeries`.

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel
);
```

For JavaScript with the global EJ2 namespace:

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationDataLabel
);
```

The series module must match the configured chart type:

- `PieSeries` for Pie and Doughnut charts.
- `FunnelSeries` for Funnel charts.
- `PyramidSeries` for Pyramid charts.

## Enabling Data Labels

Set the series `dataLabel.visible` property to `true`.

### TypeScript Example

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel
);

interface SalesData {
  category: string;
  value: number;
}

const chartData: SalesData[] = [
  {
    category: 'Product A',
    value: 45
  },
  {
    category: 'Product B',
    value: 30
  },
  {
    category: 'Product C',
    value: 15
  },
  {
    category: 'Product D',
    value: 10
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        dataLabel: {
          visible: true
        }
      }
    ]
  });

chart.appendTo('#chart');
```

### JavaScript Example

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationDataLabel
);

var chartData = [
  {
    category: 'Product A',
    value: 45
  },
  {
    category: 'Product B',
    value: 30
  },
  {
    category: 'Product C',
    value: 15
  },
  {
    category: 'Product D',
    value: 10
  }
];

var chart =
  new ej.charts.AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        dataLabel: {
          visible: true
        }
      }
    ]
  });

chart.appendTo('#chart');
```

## Label Content

### Default Label Content

When data labels are enabled without a `name`, `format`, or `template`, the chart displays its default point-label content.

For predictable documentation examples, explicitly map the required label content using `dataLabel.name`.

### Mapped Label Content

Use `dataLabel.name` to map label text from a field in the data source. The `name` property identifies the data-source field containing the label value.

```typescript
interface SalesData {
  category: string;
  value: number;
  label: string;
}

const chartData: SalesData[] = [
  {
    category: 'Product A',
    value: 45,
    label: 'Product A: 45%'
  },
  {
    category: 'Product B',
    value: 30,
    label: 'Product B: 30%'
  },
  {
    category: 'Product C',
    value: 15,
    label: 'Product C: 15%'
  },
  {
    category: 'Product D',
    value: 10,
    label: 'Product D: 10%'
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        dataLabel: {
          visible: true,
          name: 'label'
        }
      }
    ]
  });

chart.appendTo('#chart');
```

The mapped field must exist in every relevant data object.

## Positioning

Use `dataLabel.position` to place labels inside or outside chart segments.

The supported positions are `Inside` and `Outside`. The documented default position is `Inside`.

### Inside Position

Use `Inside` for charts with a small number of sufficiently large segments.

```typescript
dataLabel: {
  visible: true,
  position: 'Inside',
  name: 'label'
}
```

Inside labels work best when:

- The segments are large.
- The label text is short.
- The label color contrasts with the segment color.
- The chart has only a few categories.

### Outside Position

Use `Outside` to display labels outside the chart segments.

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'label'
}
```

Outside labels work best when:

- The chart contains small segments.
- Labels require more space.
- Connector lines help associate labels with points.
- The label color does not contrast with every point color.

### Connector Lines

Use `connectorStyle` to customize connector lines for outside labels. Connector-line customization is available for Pie, Funnel, and Pyramid series.

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'label',
  connectorStyle: {
    length: '12%',
    width: 1,
    color: '#666666',
    type: 'Curve'
  }
}
```

Common connector types include:

- `Line`
- `Curve`

Use a moderate connector length. Excessively long connectors can make the chart difficult to follow.

## Smart Labels and Arrangement

Set the chart-level `enableSmartLabels` property to `true` to reduce data-label overlap.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    enableSmartLabels: true,
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'label'
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Smart labels are most useful with outside labels.

They can:

- Reposition labels to reduce overlap.
- Adjust connector-line placement.
- Arrange labels around the chart.
- Recalculate label positions when the chart layout changes.

A complete smart-label example is:

```typescript
interface ProductData {
  product: string;
  value: number;
  label: string;
}

const chartData: ProductData[] = [
  {
    product: 'Product A',
    value: 18,
    label: 'Product A: 18'
  },
  {
    product: 'Product B',
    value: 18,
    label: 'Product B: 18'
  },
  {
    product: 'Product C',
    value: 17,
    label: 'Product C: 17'
  },
  {
    product: 'Product D',
    value: 13.5,
    label: 'Product D: 13.5'
  },
  {
    product: 'Product E',
    value: 19,
    label: 'Product E: 19'
  },
  {
    product: 'Product F',
    value: 23.5,
    label: 'Product F: 23.5'
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    enableSmartLabels: true,
    width: '100%',
    height: '420px',
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'value',
        type: 'Pie',
        radius: '80%',
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'label',
          connectorStyle: {
            length: '12%',
            type: 'Curve'
          }
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Smart labels reduce overlap but cannot guarantee a readable result when too many long labels are displayed in a small container. Increase the chart dimensions, shorten the labels, or reduce the number of visible labels when necessary.

## Formatting and Templates

Data-label content can be supplied in three primary ways:

- Default label content.
- A data-source field mapped through `name`.
- A custom HTML template through `template`.

Use `name` for simple and reliable mapped text. Use `template` when custom HTML content or structure is required.

### Format String

If the targeted package version supports the series data-label `format` property, point tokens can be used to assemble label content.

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  format: '${point.x}: ${point.y}'
}
```

Percentage example:

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  format:
    '${point.x} (${point.percentage}%)'
}
```

For maximum compatibility, map preformatted text through `dataLabel.name`.

```typescript
interface ProductData {
  product: string;
  value: number;
  label: string;
}

const chartData: ProductData[] = [
  {
    product: 'Product A',
    value: 45,
    label: 'Product A: 45%'
  },
  {
    product: 'Product B',
    value: 30,
    label: 'Product B: 30%'
  }
];
```

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'label'
}
```

### Format Placeholders

Common point tokens include:

- `${point.x}` for the X-value or category.
- `${point.y}` for the numeric Y-value.
- `${point.percentage}` for the percentage contribution.
- `${series.name}` for the series name.

Use tokens without a space between `$` and `{`.

Correct:

```typescript
format: '${point.x}: ${point.y}'
```

Incorrect:

```typescript
format: '$ {point.x}: $ {point.y}'
```

Do not assume that `${point.text}` automatically maps to an arbitrary `text` field. For custom data-source text, use `dataLabel.name`.

### Data Label Template

Use `template` when custom HTML content is required.

The data-label settings API documents `${point.x}` and `${point.y}` as template placeholders.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        dataLabel: {
          visible: true,
          position: 'Outside',
          template:
            '<div class="data-label-template">' +
            '<strong>${point.x}</strong><br>' +
            '<span>${point.y}</span>' +
            '</div>'
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Use application CSS to style the template.

```css
.data-label-template {
  padding: 5px 8px;
  border: 1px solid #808080;
  border-radius: 4px;
  background: #FFFFFF;
  color: #242424;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
  text-align: center;
}
```

Do not insert unsanitized user content into templates.

## Customization Options

### Font Customization

Use the `font` property to customize data-label text.

```typescript
dataLabel: {
  visible: true,
  font: {
    color: '#FFFFFF',
    fontFamily: 'Segoe UI',
    size: '12px',
    fontStyle: 'Normal',
    fontWeight: '600'
  }
}
```

Use `fontWeight`, not `weight`.

Incorrect:

```typescript
font: {
  weight: 'Bold'
}
```

Correct:

```typescript
font: {
  fontWeight: '600'
}
```

### Fill Border and Rounded Corners

Use `fill` for the data-label background color.

Use `border` for the label border.

Use `rx` and `ry` for rounded corners. The rounded-corner properties require a configured border.

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'label',
  fill: '#F0F8FF',
  border: {
    color: '#1F77B4',
    width: 1
  },
  rx: 4,
  ry: 4
}
```

Do not use a nested `background` object.

Incorrect:

```typescript
dataLabel: {
  background: {
    color: '#F0F8FF',
    opacity: 0.9
  }
}
```

Correct:

```typescript
dataLabel: {
  fill: 'rgba(240, 248, 255, 0.9)'
}
```

### Margin

Use `margin` to configure padding around data-label text.

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'label',
  margin: {
    left: 6,
    right: 6,
    top: 4,
    bottom: 4
  }
}
```

### Label Rotation

Use `enableRotation` and `angle` together when data-label rotation is required.

```typescript
dataLabel: {
  visible: true,
  position: 'Inside',
  name: 'label',
  enableRotation: true,
  angle: 45
}
```

Do not set only `angle` and assume rotation is enabled.

Use rotation carefully because angled labels can become difficult to read, especially in small segments.

### Text Wrapping

Use `maxWidth` and `textWrap` to wrap long data-label text.

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'label',
  maxWidth: 100,
  textWrap: 'Wrap'
}
```

Common wrapping modes include:

- `Normal`
- `Wrap`
- `AnyWhere`

Use an exact value supported by the installed EJ2 package version.

## Complete TypeScript Example

The following complete example includes:

- A Pie series.
- Smart labels.
- Outside positioning.
- Mapped label content.
- Curved connector lines.
- Correct font configuration.
- Data-label fill.
- Border and rounded corners.
- Margin.
- Tooltip support.
- Legend support.
- Responsive dimensions.

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
);

interface RegionalData {
  region: string;
  value: number;
  label: string;
  color: string;
}

const chartData: RegionalData[] = [
  {
    region: 'North',
    value: 135,
    label: 'North: 135',
    color: '#0F6CBD'
  },
  {
    region: 'South',
    value: 198,
    label: 'South: 198',
    color: '#D83B01'
  },
  {
    region: 'East',
    value: 160,
    label: 'East: 160',
    color: '#107C10'
  },
  {
    region: 'West',
    value: 121,
    label: 'West: 121',
    color: '#8764B8'
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Regional Sales Distribution',
    width: '100%',
    height: '440px',
    enableSmartLabels: true,
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${point.x}</b><br>' +
        'Value: ${point.y:n2}<br>' +
        'Share: ${point.percentage:n1}%'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'value',
        pointColorMapping: 'color',
        type: 'Pie',
        name: 'Regional Sales',
        radius: '78%',
        border: {
          color: '#FFFFFF',
          width: 1
        },
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'label',
          fill: '#F8FAFC',
          font: {
            color: '#1F4E79',
            fontFamily: 'Segoe UI',
            size: '13px',
            fontStyle: 'Normal',
            fontWeight: '600'
          },
          border: {
            color: '#1F77B4',
            width: 1
          },
          rx: 4,
          ry: 4,
          margin: {
            left: 6,
            right: 6,
            top: 4,
            bottom: 4
          },
          connectorStyle: {
            length: '12%',
            width: 1,
            color: '#666666',
            type: 'Curve'
          },
          maxWidth: 120,
          textWrap: 'Wrap'
        }
      }
    ]
  });

chart.appendTo('#chart');

window.addEventListener('beforeunload', () => {
  chart.destroy();
});
```

**HTML:**

```html
<div
  id="chart"
  role="region"
  aria-label="Pie chart showing regional sales distribution"
></div>
```

**CSS:**

```css
#chart {
  width: 100%;
  min-height: 440px;
}
```

## Complete JavaScript Example

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationDataLabel,
  ej.charts.AccumulationLegend,
  ej.charts.AccumulationTooltip
);

var chartData = [
  {
    region: 'North',
    value: 135,
    label: 'North: 135',
    color: '#0F6CBD'
  },
  {
    region: 'South',
    value: 198,
    label: 'South: 198',
    color: '#D83B01'
  },
  {
    region: 'East',
    value: 160,
    label: 'East: 160',
    color: '#107C10'
  },
  {
    region: 'West',
    value: 121,
    label: 'West: 121',
    color: '#8764B8'
  }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Regional Sales Distribution',
    width: '100%',
    height: '440px',
    enableSmartLabels: true,
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${point.x}</b><br>' +
        'Value: ${point.y:n2}<br>' +
        'Share: ${point.percentage:n1}%'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'value',
        pointColorMapping: 'color',
        type: 'Pie',
        name: 'Regional Sales',
        radius: '78%',
        border: {
          color: '#FFFFFF',
          width: 1
        },
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'label',
          fill: '#F8FAFC',
          font: {
            color: '#1F4E79',
            fontFamily: 'Segoe UI',
            size: '13px',
            fontStyle: 'Normal',
            fontWeight: '600'
          },
          border: {
            color: '#1F77B4',
            width: 1
          },
          rx: 4,
          ry: 4,
          margin: {
            left: 6,
            right: 6,
            top: 4,
            bottom: 4
          },
          connectorStyle: {
            length: '12%',
            width: 1,
            color: '#666666',
            type: 'Curve'
          },
          maxWidth: 120,
          textWrap: 'Wrap'
        }
      }
    ]
  });

chart.appendTo('#chart');
```

## Common Data Label Patterns

### Category Only

Map the category field through `name`.

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'category'
}
```

### Preformatted Category and Value

```typescript
interface ChartData {
  category: string;
  value: number;
  label: string;
}

const chartData: ChartData[] = [
  {
    category: 'Product A',
    value: 45,
    label: 'Product A: 45'
  }
];
```

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'label'
}
```

### Category and Percentage

Prepare the text before binding when a stable percentage label is required.

```typescript
interface ChartData {
  category: string;
  value: number;
}

const rawData: ChartData[] = [
  {
    category: 'Product A',
    value: 45
  },
  {
    category: 'Product B',
    value: 30
  },
  {
    category: 'Product C',
    value: 25
  }
];

const total: number = rawData.reduce(
  (
    result: number,
    item: ChartData
  ): number => result + item.value,
  0
);

const chartData = rawData.map(
  (item: ChartData) => ({
    ...item,
    label:
      `${item.category}: ` +
      `${((item.value / total) * 100).toFixed(1)}%`
  })
);
```

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'label'
}
```

### Styled Outside Labels

```typescript
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'label',
  fill: '#E7F0F8',
  font: {
    size: '13px',
    fontWeight: '600',
    color: '#2F5496'
  },
  border: {
    color: '#2F5496',
    width: 1
  },
  rx: 4,
  ry: 4,
  connectorStyle: {
    length: '10%',
    type: 'Curve'
  }
}
```

## Troubleshooting

### Data Labels Are Not Displayed

- Import `AccumulationDataLabel`.
- Inject `AccumulationDataLabel`.
- Set `dataLabel.visible` to `true`.
- Place `dataLabel` inside the series configuration.
- Ensure that the series is rendered successfully.
- Ensure that `xName` and `yName` map to valid fields.
- Ensure that the chart container has a valid height.
- Check the browser console for runtime errors.

### Mapped Label Text Is Not Displayed

- Set `dataLabel.name` to the data-source field name.
- Ensure that every relevant data object contains that field.
- Ensure that the mapped field contains a displayable value.
- Do not set `name` to a literal label string.
- Do not assume that an arbitrary `text` field is used automatically.

### Labels Are Overlapping

- Set `enableSmartLabels` to `true`.
- Use `position: 'Outside'`.
- Increase the chart dimensions.
- Reduce `dataLabel.font.size`.
- Shorten label text.
- Use `maxWidth` and `textWrap`.
- Reduce the number of visible labels.
- Increase the connector length carefully.

### Labels Are Clipped

- Increase the chart width or height.
- Reduce the series `radius`.
- Increase the chart-level margin when required.
- Shorten label text.
- Use `position: 'Inside'` for sufficiently large segments.
- Reduce the connector length.
- Move the legend to another position.

### Label Background Is Not Applied

- Use `dataLabel.fill`.
- Do not use a nested `background` object.
- Supply a valid CSS color.
- Use an `rgba` value when transparency is required.

### Label Font Weight Is Not Applied

- Use `font.fontWeight`.
- Do not use `font.weight`.
- Use a supported value such as `400`, `500`, `600`, or `Bold`.

### Rounded Corners Are Not Applied

- Configure `dataLabel.border`.
- Set a border width greater than zero.
- Set `rx` and `ry`.
- Ensure that the fill and border are visible.

### Label Rotation Is Not Applied

- Set `enableRotation` to `true`.
- Set `angle` to the required degree value.
- Use rotation primarily with inside labels.
- Avoid extreme angles that reduce readability.

### Connector Lines Are Not Displayed

- Use `position: 'Outside'`.
- Configure `connectorStyle`.
- Ensure that the connector color contrasts with the background.
- Ensure that the connector width is greater than zero.
- Ensure that the series type supports connector lines.

### Template Is Not Displayed

- Set `dataLabel.visible` to `true`.
- Provide valid HTML in `template`.
- Use supported placeholders such as `${point.x}` and `${point.y}`.
- Ensure that global CSS does not hide the template.
- Avoid untrusted HTML content.
- Check the browser console for template errors.