# Legends, Tooltips & Titles

- #legend-configuration
  - #required-legend-module
  - #enable-the-legend
  - #legend-position
  - #legend-alignment
  - #complete-legend-examples
- #legend-customization
  - #legend-appearance
  - #legend-dimensions
  - #legend-text-style
  - #legend-accessibility-description
  - #legend-toggle-visibility
  - #legend-events
- #tooltips
  - #required-tooltip-module
  - #enable-the-tooltip
  - #tooltip-header
  - #tooltip-format
  - #inline-tooltip-formatting
  - #tooltip-appearance
  - #tooltip-animation
  - #tooltip-event
- #tooltip-templates
  - #format-or-template
  - #custom-tooltip-template
  - #complete-tooltip-template-examples
- #titles--subtitles
  - #chart-title
  - #chart-subtitle
  - #complete-title-examples
- #text-formatting
  - #title-text-style
  - #subtitle-text-style
  - #legend-text-style-1
  - #tooltip-text-style
- #complete-combined-examples
  - #complete-typescript-example
  - #complete-javascript-example
- #combined-mistakes-and-future-references

## Legend Configuration

### Purpose

The legend identifies the category represented by each segment in the 3D Circular Chart.

The chart creates one legend item for each data point. The text of the legend item is obtained from the data field mapped to the series `xName` property.

For example, consider the following series configuration:

```typescript
series: [{
    dataSource: [
        { x: 'Chrome', y: 62.92 },
        { x: 'Firefox', y: 15.23 }
    ],
    xName: 'x',
    yName: 'y'
}]
```

The chart creates the following legend items:

```text
Chrome
Firefox
```

Use the legend when:

- The chart contains multiple segments.
- Data labels are hidden.
- Users must identify categories by color.
- Users must show or hide individual segments.
- A dashboard requires a compact category reference.

### Required Legend Module

TypeScript applications must import and inject `CircularChartLegend3D` before using the legend.

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D
);
```

The modules have the following responsibilities:

```text
CircularChart3D       -> Creates the 3D Circular Chart.
PieSeries3D           -> Renders the 3D pie series.
CircularChartLegend3D -> Renders and manages the chart legend.
```

The EJ2 global JavaScript bundle includes the chart feature modules, so explicit module injection is not required when using `ej.charts.CircularChart3D`.

### Enable the Legend

Set `legendSettings.visible` to `true`.

```typescript
legendSettings: {
    visible: true
}
```

To hide the legend, set `visible` to `false`.

```typescript
legendSettings: {
    visible: false
}
```

### Legend Position

Use `legendSettings.position` to place the legend around the chart.

```typescript
legendSettings: {
    visible: true,
    position: 'Right'
}
```

Supported values:

```text
Right  -> Displays the legend on the right side.
Left   -> Displays the legend on the left side.
Top    -> Displays the legend above the chart.
Bottom -> Displays the legend below the chart.
Auto   -> Allows the chart to determine the legend position.
```

Recommended usage:

```text
Desktop dashboard -> Right
Mobile layout     -> Bottom
Limited width     -> Top or Bottom
Limited height    -> Left or Right
```

Changing the legend position can change the space available for the chart. Provide sufficient width and height when the legend contains many items.

### Legend Alignment

Use `legendSettings.alignment` to control the legend alignment inside the selected legend position.

```typescript
legendSettings: {
    visible: true,
    position: 'Right',
    alignment: 'Near'
}
```

Supported values:

```text
Near   -> Aligns the legend toward the beginning.
Center -> Aligns the legend in the center.
Far    -> Aligns the legend toward the end.
```

The visual result depends on the legend position.

```text
position: 'Right', alignment: 'Near'
Result: The legend appears on the right and begins near the top.

position: 'Right', alignment: 'Far'
Result: The legend appears on the right and moves toward the bottom.

position: 'Top', alignment: 'Near'
Result: The legend appears above the chart and begins near the left.

position: 'Top', alignment: 'Far'
Result: The legend appears above the chart and moves toward the right.
```

### Complete Legend Examples

#### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D
);

interface BrowserData {
    x: string;
    y: number;
}

const data: BrowserData[] = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center'
    },
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

#### JavaScript

```javascript
var data = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center'
    },
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

## Legend Customization

### Purpose

Legend customization controls the size, position, border, background, symbols, text, and interactive behavior of the legend.

Use legend customization to:

- Match application branding.
- Improve contrast and readability.
- Handle long category names.
- Fit the legend into a fixed dashboard layout.
- Improve accessibility.
- Control whether legend items toggle corresponding points.

### Legend Appearance

Use `background`, `opacity`, and `border` to style the legend container.

```typescript
legendSettings: {
    visible: true,
    background: '#ffffff',
    opacity: 1,
    border: {
        width: 1,
        color: '#dddddd'
    }
}
```

Property behavior:

```text
background   -> Sets the legend background color.
opacity      -> Sets legend transparency.
border.width -> Sets border thickness.
border.color -> Sets border color.
```

### Legend Dimensions

Use `width` and `height` to define the legend area.

```typescript
legendSettings: {
    visible: true,
    position: 'Right',
    width: '200px',
    height: '300px'
}
```

Use custom dimensions when:

- The chart contains many points.
- Legend labels are long.
- The surrounding layout requires a fixed legend size.
- The legend must align with other dashboard elements.

Do not use a large fixed legend size inside a small responsive container. The legend can consume the area required by the chart.

### Legend Symbols

Use `shapeWidth` and `shapeHeight` to control the size of the symbol displayed beside each legend label.

```typescript
legendSettings: {
    visible: true,
    shapeWidth: 12,
    shapeHeight: 12
}
```

Use smaller legend symbols in compact dashboards and larger symbols when greater visual distinction is required.

### Legend Padding

Use `padding` to control the spacing between legend items.

```typescript
legendSettings: {
    visible: true,
    padding: 12
}
```

Increasing the padding improves separation between items but requires additional legend space.

### Legend Text Style

Use `legendSettings.textStyle` to style all legend labels.

```typescript
legendSettings: {
    visible: true,
    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '500',
        size: '12px',
        color: '#333333',
        opacity: 1
    }
}
```

Property behavior:

```text
fontFamily -> Sets the typeface.
fontStyle  -> Sets Normal, Italic, or Oblique styling.
fontWeight -> Sets the text thickness.
size       -> Sets the font size.
color      -> Sets the text color.
opacity    -> Sets the text transparency.
```

### Legend Accessibility Description

Use `description` to provide a meaningful accessibility description for the legend.

```typescript
legendSettings: {
    visible: true,
    description: 'Browser market share categories'
}
```

Use a concise description that explains the purpose of the legend. Do not repeat every legend item in the description.

### Legend Toggle Visibility

Set `toggleVisibility` to `true` to allow users to show or hide a segment by selecting its legend item.

```typescript
legendSettings: {
    visible: true,
    toggleVisibility: true
}
```

Runtime behavior:

```text
Visible segment + legend click -> Segment becomes hidden.
Hidden segment + legend click  -> Segment becomes visible.
```

Set `toggleVisibility` to `false` when legend selection must not change the chart.

```typescript
legendSettings: {
    visible: true,
    toggleVisibility: false
}
```

### Legend Events

#### Purpose

Use legend events only when the default legend behavior is insufficient.

The primary legend events are:

```text
legendRender -> Runs before a legend item is rendered.
legendClick  -> Runs when a user selects a legend item.
```

#### TypeScript Legend Event Example

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartLegend3D,
    CircularChart3DLegendRenderEventArgs,
    CircularChart3DLegendClickEventArgs
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D
);

const chart: CircularChart3D = new CircularChart3D({
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    legendRender: (args: CircularChart3DLegendRenderEventArgs): void => {
        args.text = 'Browser: ' + args.text;
    },
    legendClick: (args: CircularChart3DLegendClickEventArgs): void => {
        console.log('Selected legend item:', args.legendText);
    },
    series: [{
        dataSource: [
            { x: 'Chrome', y: 62.92 },
            { x: 'Firefox', y: 15.23 },
            { x: 'Safari', y: 19.97 },
            { x: 'Others', y: 2.88 }
        ],
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

#### JavaScript Legend Event Example

```javascript
var chart = new ej.charts.CircularChart3D({
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    legendRender: function (args) {
        args.text = 'Browser: ' + args.text;
    },
    legendClick: function (args) {
        console.log('Selected legend item:', args.legendText);
    },
    series: [{
        dataSource: [
            { x: 'Chrome', y: 62.92 },
            { x: 'Firefox', y: 15.23 },
            { x: 'Safari', y: 19.97 },
            { x: 'Others', y: 2.88 }
        ],
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

## Tooltips

### Purpose

A tooltip displays contextual information when the pointer moves over a 3D Circular Chart segment.

Use tooltips when:

- Users need exact values.
- Data labels are hidden.
- The chart container has limited space.
- Additional details should appear only during interaction.
- The chart must display category, value, percentage, or custom content.

Tooltips are disabled by default and must be explicitly enabled.

### Required Tooltip Module

TypeScript applications must import and inject `CircularChartTooltip3D`.

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartTooltip3D
);
```

Module responsibilities:

```text
CircularChart3D        -> Creates the chart.
PieSeries3D            -> Renders the 3D pie series.
CircularChartTooltip3D -> Renders and manages tooltips.
```

### Enable the Tooltip

Set `tooltip.enable` to `true`.

```typescript
tooltip: {
    enable: true
}
```

Complete TypeScript example:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartTooltip3D
);

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    tilt: -45,
    tooltip: {
        enable: true
    },
    series: [{
        dataSource: [
            { x: 'Chrome', y: 62.92 },
            { x: 'Firefox', y: 15.23 },
            { x: 'Safari', y: 19.97 },
            { x: 'Others', y: 2.88 }
        ],
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

Complete JavaScript example:

```javascript
var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    tilt: -45,
    tooltip: {
        enable: true
    },
    series: [{
        dataSource: [
            { x: 'Chrome', y: 62.92 },
            { x: 'Firefox', y: 15.23 },
            { x: 'Safari', y: 19.97 },
            { x: 'Others', y: 2.88 }
        ],
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

Runtime behavior:

```text
1. The user moves the pointer over a chart segment.
2. The chart identifies the corresponding point.
3. Tooltip tokens are resolved using the point and series.
4. The tooltip content is rendered.
5. The tooltip is hidden after the interaction ends.
```

### Tooltip Header

Use `header` to display a heading above the tooltip content.

```typescript
tooltip: {
    enable: true,
    header: 'Browser Market Share'
}
```

Use a header when the tooltip requires context that is not obvious from the point value.

To avoid unnecessary repeated content, use an empty header when the body already provides enough information.

```typescript
tooltip: {
    enable: true,
    header: ''
}
```

### Tooltip Format

Use `format` to define the tooltip content without creating a custom HTML template.

```typescript
tooltip: {
    enable: true,
    format: '${point.x}: <b>${point.y}</b>'
}
```

Example output:

```text
Chrome: 62.92
```

Use `format` when:

- The tooltip requires simple text.
- A small amount of inline HTML is sufficient.
- No image or complex layout is required.
- The content can be created using supported tooltip tokens.

### Inline Tooltip Formatting

Inline formatting applies a display format directly to a supported token.

Add a colon after the token name, followed by the required format.

```typescript
tooltip: {
    enable: true,
    format:
        '${series.name}<br>' +
        '${point.x}: ${point.y:n2}<br>' +
        'Share: ${point.percentage:n1}%<br>' +
        'Opacity: ${series.opacity}'
}
```

Example output:

```text
Browser Market Share
Chrome: 62.92
Share: 62.9%
Opacity: 1
```

Common tokens:

```text
${point.x}          -> Displays the point x-value.
${point.y}          -> Displays the point y-value.
${point.percentage} -> Displays the point percentage.
${point.index}      -> Displays the point index.
${series.name}      -> Displays the series name.
${series.opacity}   -> Displays the series opacity.
```

Number format examples:

```text
${point.y:n0}          -> Displays no decimal places.
${point.y:n2}          -> Displays two decimal places.
${point.y:c2}          -> Displays currency with two decimal places.
${point.y:p1}          -> Displays a percentage with one decimal place.
${point.y:e1}          -> Displays exponential notation.
${point.percentage:n1} -> Displays the calculated percentage with one decimal place.
```

Date format examples:

```text
${point.x:MMM yyyy} -> Jan 2025
${point.x:MM:yy}    -> 01:25
${point.x:dd MMM}   -> 10 Jan
```

Use a date format only when the resolved token contains a date value. Use a number format only when the resolved token contains a numeric value.

Formatting changes only the displayed text.

```text
Original value  -> 125.6789
Displayed value -> 125.68
```

The original data source remains unchanged.

### Tooltip Appearance

Use `fill`, `opacity`, `border`, and `textStyle` to customize the tooltip appearance.

```typescript
tooltip: {
    enable: true,
    fill: '#252423',
    opacity: 0.9,
    border: {
        width: 1,
        color: '#ffffff'
    },
    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '12px',
        color: '#ffffff'
    }
}
```

Property behavior:

```text
fill         -> Sets the tooltip background.
opacity      -> Sets the tooltip transparency.
border       -> Sets the tooltip border.
textStyle    -> Sets the tooltip text appearance.
enableMarker -> Controls the marker displayed in the tooltip.
```

Marker example:

```typescript
tooltip: {
    enable: true,
    enableMarker: true
}
```

Header-line example:

```typescript
tooltip: {
    enable: true,
    header: 'Browser Statistics',
    showHeaderLine: true
}
```

### Tooltip Animation

Use `enableAnimation` to enable or disable tooltip movement animation.

```typescript
tooltip: {
    enable: true,
    enableAnimation: true
}
```

Use `fadeOutDuration` to control how long the tooltip fade-out animation lasts.

```typescript
tooltip: {
    enable: true,
    fadeOutDuration: 1000
}
```

Use shorter durations for frequently updated dashboards and longer durations when users need more time to read the content.

### Tooltip Event

Use `tooltipRender` when tooltip content must be changed dynamically.

Use cases:

- Add business-specific labels.
- Cancel the tooltip for selected points.
- Change tooltip text based on point values.
- Localize tooltip content.
- Add conditional information.

#### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartTooltip3D,
    CircularChart3DTooltipEventArgs
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartTooltip3D
);

const chart: CircularChart3D = new CircularChart3D({
    tooltip: {
        enable: true
    },
    tooltipRender: (args: CircularChart3DTooltipEventArgs): void => {
        if (args.point && args.point.x !== undefined && args.point.y !== undefined) {
            args.text = args.point.x + ': ' + args.point.y + '%';
        }
    },
    series: [{
        dataSource: [
            { x: 'Chrome', y: 62.92 },
            { x: 'Firefox', y: 15.23 },
            { x: 'Safari', y: 19.97 },
            { x: 'Others', y: 2.88 }
        ],
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

#### JavaScript

```javascript
var chart = new ej.charts.CircularChart3D({
    tooltip: {
        enable: true
    },
    tooltipRender: function (args) {
        if (args.point && args.point.x !== undefined && args.point.y !== undefined) {
            args.text = args.point.x + ': ' + args.point.y + '%';
        }
    },
    series: [{
        dataSource: [
            { x: 'Chrome', y: 62.92 },
            { x: 'Firefox', y: 15.23 },
            { x: 'Safari', y: 19.97 },
            { x: 'Others', y: 2.88 }
        ],
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

## Tooltip Templates

### Purpose

A tooltip template provides custom HTML content and layout.

Use a template when:

- The tooltip requires multiple sections.
- Custom colors and spacing are required.
- An image or icon must be displayed.
- The application needs a card-style tooltip.
- The built-in `format` property cannot create the required layout.

### Format or Template

Use `format` for simple tooltip content.

```typescript
tooltip: {
    enable: true,
    format: '${point.x}: ${point.y}'
}
```

Use `template` for structured HTML content.

```typescript
tooltip: {
    enable: true,
    template:
        '<div class="chart-tooltip">' +
        '<strong>${point.x}</strong><br>' +
        '<span>Value: ${point.y}</span>' +
        '</div>'
}
```

Do not configure both properties for the same presentation requirement unless the intended precedence has been validated. Select one approach based on the required output.

### Custom Tooltip Template

```typescript
tooltip: {
    enable: true,
    template:
        '<div style="background:#f5f5f5;padding:10px;border-radius:6px;">' +
        '<div style="font-weight:600;">${point.x}</div>' +
        '<div>Value: ${point.y}</div>' +
        '<div style="color:#666666;font-size:12px;">' +
        'Share: ${point.percentage}%' +
        '</div>' +
        '</div>'
}
```

Multi-line template:

```typescript
tooltip: {
    enable: true,
    template:
        '<div style="padding:8px;">' +
        '<b>${point.x}</b><br>' +
        'Value: ${point.y}<br>' +
        'Percentage: ${point.percentage}%' +
        '</div>'
}
```

A CSS class is preferable when the tooltip style is shared or reused.

```css
.chart-tooltip {
    min-width: 140px;
    padding: 10px;
    color: #333333;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 6px;
    font-family: "Segoe UI", sans-serif;
    font-size: 12px;
}
```

Template using the CSS class:

```typescript
tooltip: {
    enable: true,
    template:
        '<div class="chart-tooltip">' +
        '<strong>${point.x}</strong><br>' +
        '<span>Value: ${point.y}</span><br>' +
        '<span>Share: ${point.percentage}%</span>' +
        '</div>'
}
```

### Complete Tooltip Template Examples

#### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartTooltip3D
);

interface BrowserData {
    x: string;
    y: number;
}

const data: BrowserData[] = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    tilt: -45,
    tooltip: {
        enable: true,
        template:
            '<div class="chart-tooltip">' +
            '<strong>${point.x}</strong><br>' +
            '<span>Value: ${point.y}</span><br>' +
            '<span>Share: ${point.percentage}%</span>' +
            '</div>'
    },
    series: [{
        name: 'Browser Market Share',
        dataSource: data,
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

#### JavaScript

```javascript
var data = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    tilt: -45,
    tooltip: {
        enable: true,
        template:
            '<div class="chart-tooltip">' +
            '<strong>${point.x}</strong><br>' +
            '<span>Value: ${point.y}</span><br>' +
            '<span>Share: ${point.percentage}%</span>' +
            '</div>'
    },
    series: [{
        name: 'Browser Market Share',
        dataSource: data,
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

## Titles & Subtitles

### Purpose

A title describes the primary subject of the chart.

A subtitle provides supporting context such as:

- Reporting period.
- Region.
- Business unit.
- Data source description.
- Comparison criteria.

Example:

```text
Title    -> Browser Market Share
Subtitle -> November 2023
```

Keep titles concise. Place detailed contextual information in the subtitle instead of creating an excessively long title.

### Chart Title

Use the chart-level `title` property.

```typescript
title: 'Browser Market Share'
```

No additional module is required for titles.

### Chart Subtitle

Use the chart-level `subTitle` property.

```typescript
subTitle: 'November 2023'
```

The subtitle is displayed with the title and provides secondary context.

### Complete Title Examples

#### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);

interface BrowserData {
    x: string;
    y: number;
}

const data: BrowserData[] = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    subTitle: 'November 2023',
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

#### JavaScript

```javascript
var data = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    subTitle: 'November 2023',
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y'
    }]
});

chart.appendTo('#element');
```

## Text Formatting

### Purpose

Text formatting controls the visual appearance of the title, subtitle, legend labels, and tooltip text.

Use consistent formatting to improve:

- Readability.
- Visual hierarchy.
- Application branding.
- Accessibility.
- Dashboard consistency.

### Title Text Style

Use `titleStyle` to customize title text.

```typescript
titleStyle: {
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: 'Bold',
    size: '18px',
    color: '#333333',
    opacity: 1,
    textAlignment: 'Center'
}
```

Property behavior:

```text
fontFamily   -> Sets the title typeface.
fontStyle    -> Sets Normal, Italic, or Oblique styling.
fontWeight   -> Sets the title thickness.
size         -> Sets the title font size.
color        -> Sets the title color.
opacity      -> Sets the title transparency.
textAlignment -> Aligns the title text.
```

### Subtitle Text Style

Use `subTitleStyle` to customize subtitle text.

```typescript
subTitleStyle: {
    fontFamily: 'Segoe UI',
    fontStyle: 'Italic',
    fontWeight: 'Normal',
    size: '14px',
    color: '#666666',
    opacity: 1,
    textAlignment: 'Center'
}
```

The subtitle should normally have less visual emphasis than the title.

Recommended hierarchy:

```text
Title:
Larger size
Higher weight
Darker color

Subtitle:
Smaller size
Normal weight
Lighter color
```

### Legend Text Style

Use `legendSettings.textStyle`.

```typescript
legendSettings: {
    visible: true,
    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '12px',
        color: '#333333',
        opacity: 1
    }
}
```

### Tooltip Text Style

Use `tooltip.textStyle`.

```typescript
tooltip: {
    enable: true,
    fill: '#252423',
    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '12px',
        color: '#ffffff'
    }
}
```

Use sufficient contrast between `tooltip.fill` and `tooltip.textStyle.color`.

## Complete Combined Examples

### Complete TypeScript Example

The following TypeScript example combines:

- 3D pie series.
- Data labels.
- Legend display and customization.
- Tooltip formatting.
- Title and subtitle.
- Title, subtitle, legend, and tooltip text styles.
- Legend rendering.
- Tooltip rendering.

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D,
    CircularChart3DLegendRenderEventArgs,
    CircularChart3DTooltipEventArgs
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);

interface BrowserData {
    x: string;
    y: number;
}

const data: BrowserData[] = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    subTitle: 'November 2023',
    tilt: -45,

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: '18px',
        color: '#333333',
        opacity: 1,
        textAlignment: 'Center'
    },

    subTitleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Italic',
        fontWeight: 'Normal',
        size: '14px',
        color: '#666666',
        opacity: 1,
        textAlignment: 'Center'
    },

    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center',
        background: '#ffffff',
        opacity: 1,
        padding: 12,
        shapeWidth: 12,
        shapeHeight: 12,
        description: 'Browser market share categories',
        toggleVisibility: true,
        border: {
            width: 1,
            color: '#dddddd'
        },
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#333333',
            opacity: 1
        }
    },

    tooltip: {
        enable: true,
        header: 'Browser Statistics',
        format:
            '${series.name}<br>' +
            '${point.x}: ${point.y:n2}<br>' +
            'Share: ${point.percentage:n1}%',
        fill: '#252423',
        opacity: 0.9,
        enableAnimation: true,
        enableMarker: true,
        showHeaderLine: true,
        fadeOutDuration: 1000,
        border: {
            width: 1,
            color: '#ffffff'
        },
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#ffffff'
        }
    },

    legendRender: (args: CircularChart3DLegendRenderEventArgs): void => {
        if (args.text) {
            args.text = 'Browser: ' + args.text;
        }
    },

    tooltipRender: (args: CircularChart3DTooltipEventArgs): void => {
        if (args.point && args.point.y !== undefined && Number(args.point.y) < 3) {
            args.text = 'Other browsers: ' + args.point.y + '%';
        }
    },

    series: [{
        name: 'Browser Market Share',
        dataSource: data,
        xName: 'x',
        yName: 'y',
        dataLabel: {
            visible: true,
            position: 'Outside',
            connectorStyle: {
                length: '40px'
            },
            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '500',
                size: '12px',
                color: '#333333'
            }
        }
    }]
});

chart.appendTo('#element');
```

Required HTML container:

```html
<div id="element"></div>
```

### Complete JavaScript Example

```javascript
var data = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    subTitle: 'November 2023',
    tilt: -45,

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: '18px',
        color: '#333333',
        opacity: 1,
        textAlignment: 'Center'
    },

    subTitleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Italic',
        fontWeight: 'Normal',
        size: '14px',
        color: '#666666',
        opacity: 1,
        textAlignment: 'Center'
    },

    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center',
        background: '#ffffff',
        opacity: 1,
        padding: 12,
        shapeWidth: 12,
        shapeHeight: 12,
        description: 'Browser market share categories',
        toggleVisibility: true,
        border: {
            width: 1,
            color: '#dddddd'
        },
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#333333',
            opacity: 1
        }
    },

    tooltip: {
        enable: true,
        header: 'Browser Statistics',
        format:
            '${series.name}<br>' +
            '${point.x}: ${point.y:n2}<br>' +
            'Share: ${point.percentage:n1}%',
        fill: '#252423',
        opacity: 0.9,
        enableAnimation: true,
        enableMarker: true,
        showHeaderLine: true,
        fadeOutDuration: 1000,
        border: {
            width: 1,
            color: '#ffffff'
        },
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#ffffff'
        }
    },

    legendRender: function (args) {
        if (args.text) {
            args.text = 'Browser: ' + args.text;
        }
    },

    tooltipRender: function (args) {
        if (args.point && args.point.y !== undefined && Number(args.point.y) < 3) {
            args.text = 'Other browsers: ' + args.point.y + '%';
        }
    },

    series: [{
        name: 'Browser Market Share',
        dataSource: data,
        xName: 'x',
        yName: 'y',
        dataLabel: {
            visible: true,
            position: 'Outside',
            connectorStyle: {
                length: '40px'
            },
            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '500',
                size: '12px',
                color: '#333333'
            }
        }
    }]
});

chart.appendTo('#element');
```

Required HTML container:

```html
<div id="element"></div>
```

## Combined Mistakes and Future References

### Module Mistakes

```text
Incorrect:
Using legendSettings without importing and injecting CircularChartLegend3D.

Correct:
Import CircularChartLegend3D and include it in CircularChart3D.Inject(...).
```

```text
Incorrect:
Enabling tooltip without importing and injecting CircularChartTooltip3D.

Correct:
Import CircularChartTooltip3D and include it in CircularChart3D.Inject(...).
```

```text
Incorrect:
Enabling data labels without importing and injecting CircularChartDataLabel3D.

Correct:
Import CircularChartDataLabel3D and include it in CircularChart3D.Inject(...).
```

### Initialization Mistakes

```text
Avoid:
new CircularChart3D(configuration, '#element');

Preferred:
const chart = new CircularChart3D(configuration);
chart.appendTo('#element');
```

Always ensure the target element exists before calling `appendTo`.

```html
<div id="element"></div>
```

### Legend Mistakes

```text
❌ Enabling both a large legend and long outside data labels in a small container.
❌ Setting a fixed legend width or height without testing responsive layouts.
❌ Hiding both the legend and data labels when users need category identification.
❌ Assuming alignment and position perform the same task.
❌ Using low-contrast legend text.
❌ Using legend events when a standard property already provides the behavior.
```

### Tooltip Mistakes

```text
❌ Forgetting tooltip.enable.
❌ Using a tooltip token that is not available for the resolved point or series.
❌ Applying a number format to a string value.
❌ Applying a date format to a category string.
❌ Assuming inline formatting changes the original data.
❌ Using a complex template when the format property is sufficient.
❌ Encoding HTML tags as < and > inside executable code.
❌ Using tooltipRender for static content that can be configured through format.
❌ Using low-contrast tooltip text and background colors.
```

### Template Mistakes

```text
❌ Embedding editor-generated anchor tags inside a template string.
❌ Using an external image without ensuring that the image is accessible.
❌ Adding excessive HTML that makes the tooltip difficult to read.
❌ Using inline styles throughout a large application instead of a reusable CSS class.
❌ Displaying too much information in a small tooltip.
```

### Title and Text Mistakes

```text
❌ Using a generic title such as "Chart".
❌ Repeating the same text in the title and subtitle.
❌ Using a subtitle that is more visually prominent than the title.
❌ Using very long titles in responsive layouts.
❌ Using colors with insufficient contrast.
❌ Using inconsistent fonts across the title, legend, tooltip, and data labels.
```

### Runtime Validation Checklist

```text
✅ CircularChart3D is imported in TypeScript.
✅ PieSeries3D is imported and injected.
✅ CircularChartLegend3D is imported and injected when legends are used.
✅ CircularChartTooltip3D is imported and injected when tooltips are used.
✅ CircularChartDataLabel3D is imported and injected when data labels are used.
✅ The JavaScript global EJ2 chart script is loaded before the application script.
✅ The data source exists.
✅ xName matches the category field.
✅ yName matches the numeric value field.
✅ legendSettings.visible is enabled when a legend is required.
✅ tooltip.enable is enabled when a tooltip is required.
✅ Tooltip tokens match available point and series values.
✅ The title describes the chart subject.
✅ The subtitle provides secondary context.
✅ Text colors provide sufficient contrast.
✅ The target container exists.
✅ chart.appendTo('#element') is called.
✅ No editor-generated HTML is present inside executable code.
✅ The TypeScript and JavaScript examples produce equivalent behavior.
```