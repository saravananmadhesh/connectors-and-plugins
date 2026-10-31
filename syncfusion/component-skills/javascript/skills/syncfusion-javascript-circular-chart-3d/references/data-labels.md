# Data Labels

- #enabling-data-labels
  - #required-module
  - #basic-configuration
  - #complete-typescript-example
  - #complete-javascript-example
- #label-positioning
  - #inside-labels
  - #outside-labels
- #label-appearance
  - #background-and-border
  - #font-customization
  - #rotation
- #label-templates
  - #template-placeholders
  - #complete-typescript-template
  - #complete-javascript-template
- #connector-lines
- #text-mapping
- #format-options
- #custom-text-rendering
- #complete-typescript-data-label-example
- #complete-javascript-data-label-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Enabling Data Labels

### Purpose

A data label displays information associated with an individual point in the 3D Circular Chart.

Use data labels when:

- Users must identify segments without relying only on colors.
- Category names must remain visible.
- Values must be readable without pointer interaction.
- The chart must remain understandable when printed or exported.
- Tooltips alone are insufficient because they require interaction.

The 3D Circular Chart arranges visible data labels to reduce overlap. The final arrangement depends on the chart dimensions, number of points, label text, label position, tilt, rotation, and connector length.

### Required Module

TypeScript applications must import and inject `CircularChartDataLabel3D` before enabling data labels.

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);
```

Module responsibilities:

```text
CircularChart3D          -> Creates and manages the chart.
PieSeries3D              -> Renders the 3D pie or doughnut series.
CircularChartDataLabel3D -> Renders and manages data labels.
```

If the legend is visible, also import and inject `CircularChartLegend3D`.

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D
);
```

If tooltips are enabled, also import and inject `CircularChartTooltip3D`.

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartTooltip3D
);
```

### Basic Configuration

Set `dataLabel.visible` to `true` inside the series.

```typescript
dataLabel: {
    visible: true
}
```

Data labels are disabled by default. The default label position is `Inside`.

### Complete TypeScript Example

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface MonthlyData {
    month: string;
    value: number;
}

const data: MonthlyData[] = [
    { month: 'Jan', value: 13 },
    { month: 'Feb', value: 13.5 },
    { month: 'Mar', value: 7 },
    { month: 'Apr', value: 13.5 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Monthly Distribution',
    tilt: -45,

    legendSettings: {
        visible: false
    },

    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'value',

        dataLabel: {
            visible: true,
            position: 'Inside'
        }
    }]
});

chart.appendTo('#element');
```

Required HTML:

```html
<div id="element"></div>
```

Expected behavior:

```text
1. PieSeries3D renders one segment for each data object.
2. CircularChartDataLabel3D renders the labels.
3. The month field identifies each point.
4. The value field controls each segment size.
5. Labels appear inside their corresponding segments.
6. The legend remains hidden.
```

### Complete JavaScript Example

```javascript
var data = [
    { month: 'Jan', value: 13 },
    { month: 'Feb', value: 13.5 },
    { month: 'Mar', value: 7 },
    { month: 'Apr', value: 13.5 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Monthly Distribution',
    tilt: -45,

    legendSettings: {
        visible: false
    },

    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'value',

        dataLabel: {
            visible: true,
            position: 'Inside'
        }
    }]
});

chart.appendTo('#element');
```

## Label Positioning

### Purpose

Use `dataLabel.position` to place labels inside or outside chart segments.

Supported values:

```text
Inside  -> Places labels inside their corresponding segments.
Outside -> Places labels outside the chart with connector lines.
```

The default position is `Inside`.

### Inside Labels

```typescript
dataLabel: {
    visible: true,
    position: 'Inside'
}
```

Use inside labels when:

- The chart contains a small number of segments.
- Segments are large enough to contain text.
- Label text is short.
- A compact layout is required.
- Connector lines are not required.

Inside labels may become difficult to read when:

- A segment is very small.
- The label contains several words.
- The segment color does not contrast with the label text.
- A large inner radius creates a thin doughnut ring.
- Tilt and depth reduce the visible segment area.

Complete TypeScript example:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface SalesData {
    category: string;
    value: number;
}

const data: SalesData[] = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',

        dataLabel: {
            visible: true,
            position: 'Inside',
            name: 'category',
            font: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px',
                color: '#ffffff'
            }
        }
    }]
});

chart.appendTo('#element');
```

Complete JavaScript example:

```javascript
var data = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',

        dataLabel: {
            visible: true,
            position: 'Inside',
            name: 'category',
            font: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px',
                color: '#ffffff'
            }
        }
    }]
});

chart.appendTo('#element');
```

### Outside Labels

```typescript
dataLabel: {
    visible: true,
    position: 'Outside',
    connectorStyle: {
        length: '40px'
    }
}
```

Outside labels use connector lines to associate text with corresponding segments. Connector lines are visible when labels use the `Outside` position.

Use outside labels when:

- The chart contains small segments.
- Labels contain longer category names.
- A doughnut chart has a large inner radius.
- Label readability is more important than compactness.
- Segment colors make inside text difficult to read.

Complete TypeScript example:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface BrowserData {
    browser: string;
    share: number;
}

const data: BrowserData[] = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#element');
```

Complete JavaScript example:

```javascript
var data = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#element');
```

## Label Appearance

### Purpose

The data-label model supports the following primary properties:

```text
visible
position
name
format
template
fill
border
font
angle
enableRotation
connectorStyle
```

These properties configure data-label content, appearance, placement, and rotation.

### Background and Border

Use `fill` to set the label background.

Use `border` to set the label boundary.

```typescript
dataLabel: {
    visible: true,
    position: 'Outside',

    fill: '#ffffff',

    border: {
        width: 1,
        color: '#cccccc'
    }
}
```

Complete configuration:

```typescript
dataLabel: {
    visible: true,
    position: 'Outside',
    name: 'category',

    fill: '#ffffff',

    border: {
        width: 1,
        color: '#cccccc'
    },

    font: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        size: '12px',
        color: '#333333'
    },

    connectorStyle: {
        length: '35px',
        width: 1,
        color: '#777777'
    }
}
```

### Font Customization

Use `dataLabel.font` to control text appearance.

```typescript
dataLabel: {
    visible: true,

    font: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
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
fontWeight -> Sets text thickness.
size       -> Sets the font size.
color      -> Sets text color.
opacity    -> Sets text transparency.
```

Use sufficient contrast between:

```text
dataLabel.font.color
dataLabel.fill
segment color when position is Inside
chart background when position is Outside
```

### Rotation

Set `enableRotation` to `true` to enable data-label rotation.

Use `angle` to specify the label angle.

```typescript
dataLabel: {
    visible: true,
    position: 'Outside',
    enableRotation: true,
    angle: 45
}
```

The default angle is `0`, and rotation is disabled by default.

Use rotation when:

- Rotated labels improve a specialized layout.
- Label orientation must match surrounding content.
- A fixed angle is part of the presentation design.

Avoid rotation when:

- Labels contain long text.
- Readability is more important than visual styling.
- The chart must support quick scanning.
- Labels are already arranged outside with long connector lines.

## Label Templates

### Purpose

Use `dataLabel.template` to create data-label content with custom HTML.

The documented template placeholders include:

```text
${point.x}
${point.y}
```

These placeholders display the corresponding point values.

Use a template when:

- The label requires multiple lines.
- Category and value must appear together.
- Custom HTML structure is required.
- A styled information card is required.
- The standard `name` and `format` properties are insufficient.

Avoid a template when:

- A plain category or value is sufficient.
- The label can be created through `name`.
- Only numeric formatting is required.
- Rendering performance is more important than rich HTML.

### Template Placeholders

Basic template:

```typescript
dataLabel: {
    visible: true,
    position: 'Outside',
    template:
        '<div class="data-label-template">' +
        '<strong>${point.x}</strong><br>' +
        '<span>${point.y}</span>' +
        '</div>'
}
```

Do not assume that every arbitrary data-source field is available as a direct `${point.fieldName}` template token.

For example, avoid:

```typescript
template: '${point.x}: ${point.y}${point.unit}'
```

unless `${point.unit}` has been explicitly validated.

When arbitrary custom text is required, precompute a label field and map it through `dataLabel.name`, or use the `textRender` event.

### Template CSS

```css
.data-label-template {
    min-width: 80px;
    padding: 6px 8px;
    color: #333333;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-family: "Segoe UI", sans-serif;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
    box-sizing: border-box;
}
```

Using a reusable CSS class is preferable to repeating large inline style strings.

### Complete TypeScript Template

Required HTML:

```html
<div id="element"></div>
```

Required CSS:

```css
.data-label-template {
    min-width: 80px;
    padding: 6px 8px;
    color: #333333;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-family: "Segoe UI", sans-serif;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
    box-sizing: border-box;
}
```

TypeScript:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface MonthlyData {
    month: string;
    value: number;
}

const data: MonthlyData[] = [
    { month: 'Jan', value: 13 },
    { month: 'Feb', value: 13.5 },
    { month: 'Mar', value: 17 },
    { month: 'Apr', value: 13.5 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Monthly Distribution',
    tilt: -45,

    legendSettings: {
        visible: false
    },

    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'value',

        dataLabel: {
            visible: true,
            position: 'Outside',

            template:
                '<div class="data-label-template">' +
                '<strong>${point.x}</strong><br>' +
                '<span>${point.y}</span>' +
                '</div>',

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#element');
```

### Complete JavaScript Template

```javascript
var data = [
    { month: 'Jan', value: 13 },
    { month: 'Feb', value: 13.5 },
    { month: 'Mar', value: 17 },
    { month: 'Apr', value: 13.5 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Monthly Distribution',
    tilt: -45,

    legendSettings: {
        visible: false
    },

    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'value',

        dataLabel: {
            visible: true,
            position: 'Outside',

            template:
                '<div class="data-label-template">' +
                '<strong>${point.x}</strong><br>' +
                '<span>${point.y}</span>' +
                '</div>',

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#element');
```

## Connector Lines

### Purpose

Connector lines associate outside labels with their corresponding segments.

A connector line is relevant only when:

```typescript
position: 'Outside'
```

Connector lines can be customized through `color`, `width`, `length`, and `dashArray`. The connector model also supports connector type where applicable.

### Complete Connector Configuration

```typescript
dataLabel: {
    visible: true,
    position: 'Outside',

    connectorStyle: {
        length: '50px',
        width: 2,
        color: '#f4429e',
        dashArray: '5,3'
    }
}
```

Property behavior:

```text
length    -> Controls the distance between the chart and label.
width     -> Controls connector thickness.
color     -> Controls connector color.
dashArray -> Defines the dash-and-gap pattern.
```

Examples:

```typescript
connectorStyle: {
    length: '30px',
    width: 1,
    color: '#666666',
    dashArray: ''
}
```

```typescript
connectorStyle: {
    length: '50px',
    width: 3,
    color: '#cc0000',
    dashArray: '5,5'
}
```

Use shorter connectors when:

- The chart has enough space.
- Labels are short.
- The chart contains few segments.

Use longer connectors when:

- Labels need additional separation.
- The series contains small adjacent segments.
- The chart uses a large outer radius.

Long connectors require additional chart space and can push labels toward the container boundary.

## Text Mapping

### Purpose

Use `dataLabel.name` to map a data-source field as the label text.

Data:

```typescript
const data = [
    {
        month: 'Jan',
        value: 3,
        labelText: 'January'
    },
    {
        month: 'Feb',
        value: 3.5,
        labelText: 'February'
    },
    {
        month: 'Mar',
        value: 7,
        labelText: 'March'
    },
    {
        month: 'Apr',
        value: 13.5,
        labelText: 'April'
    }
];
```

Configuration:

```typescript
dataLabel: {
    visible: true,
    name: 'labelText'
}
```

The `name` property identifies the data-source field containing label text.

### Complete TypeScript Text Mapping

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface MonthlyData {
    month: string;
    value: number;
    labelText: string;
}

const data: MonthlyData[] = [
    {
        month: 'Jan',
        value: 3,
        labelText: 'January'
    },
    {
        month: 'Feb',
        value: 3.5,
        labelText: 'February'
    },
    {
        month: 'Mar',
        value: 7,
        labelText: 'March'
    },
    {
        month: 'Apr',
        value: 13.5,
        labelText: 'April'
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Monthly Distribution',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'value',

        dataLabel: {
            visible: true,
            name: 'labelText',
            position: 'Outside',

            connectorStyle: {
                length: '35px'
            }
        }
    }]
});

chart.appendTo('#element');
```

### Complete JavaScript Text Mapping

```javascript
var data = [
    {
        month: 'Jan',
        value: 3,
        labelText: 'January'
    },
    {
        month: 'Feb',
        value: 3.5,
        labelText: 'February'
    },
    {
        month: 'Mar',
        value: 7,
        labelText: 'March'
    },
    {
        month: 'Apr',
        value: 13.5,
        labelText: 'April'
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Monthly Distribution',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'value',

        dataLabel: {
            visible: true,
            name: 'labelText',
            position: 'Outside',

            connectorStyle: {
                length: '35px'
            }
        }
    }]
});

chart.appendTo('#element');
```

### Multiple Data Fields

If a label must contain multiple custom fields, create the final label text in the data source.

```typescript
interface QuarterlyData {
    quarter: string;
    value: number;
    unit: string;
    labelText: string;
}

const source = [
    { quarter: 'Q1', value: 45, unit: 'K' },
    { quarter: 'Q2', value: 52, unit: 'K' },
    { quarter: 'Q3', value: 38, unit: 'K' }
];

const data: QuarterlyData[] = source.map((item) => ({
    ...item,
    labelText: `${item.quarter}: ${item.value}${item.unit}`
}));
```

Map the precomputed field:

```typescript
dataLabel: {
    visible: true,
    name: 'labelText',
    position: 'Outside'
}
```

This pattern avoids relying on unverified arbitrary template tokens.

## Format Options

### Purpose

Use `dataLabel.format` to format the resolved label value.

The format supports global string formats such as currency, number, and percentage formats. It also supports a `{value}` placeholder for combining the value with static text.

### Number Formatting

```typescript
dataLabel: {
    visible: true,
    format: 'n2'
}
```

Expected result:

```text
13    -> 13.00
13.5  -> 13.50
```

### Currency Formatting

```typescript
dataLabel: {
    visible: true,
    format: 'C2'
}
```

The exact currency symbol and separators depend on the chart locale.

Do not assume that currency formatting always produces a dollar symbol.

### Percentage Formatting

```typescript
dataLabel: {
    visible: true,
    format: 'P1'
}
```

Percentage formats scale fractional values.

Example:

```text
Source value 0.125 with P1 -> 12.5%
```

Do not apply `P1` directly to a value already stored as `12.5` unless the intended output is a scaled percentage.

### Placeholder Formatting

Use `{value}` to combine a resolved label value with static text.

```typescript
dataLabel: {
    visible: true,
    format: '{value} units'
}
```

Example:

```text
13 -> 13 units
```

Another example:

```typescript
dataLabel: {
    visible: true,
    format: '${value}'
}
```

Use only the documented placeholder syntax required by the installed EJ2 version. The CircularChart3D data-label API documents `{value}` for custom text formatting.

### Format Decision Guide

```text
Use name:
A data-source text field should be displayed.

Use format:
A value requires number, currency, percentage, or static-text formatting.

Use template:
Structured HTML content is required.

Use textRender:
Content or styling must be changed conditionally at runtime.
```

## Custom Text Rendering

### Purpose

Use the chart-level `textRender` event to customize data-label text before it is rendered.

Use `textRender` when:

- Labels require conditional content.
- Labels must be shortened dynamically.
- A category needs special emphasis.
- Labels must display calculated text.
- Rendering must be cancelled for selected points.

Avoid `textRender` when a static `name`, `format`, `font`, `fill`, or `border` configuration is sufficient.

### Required Event Type

```typescript
import {
    CircularChart3DTextRenderEventArgs
} from '@syncfusion/ej2-charts';
```

### Change Label Text

```typescript
textRender: (
    args: CircularChart3DTextRenderEventArgs
): void => {
    if (args.point) {
        args.text = `${args.point.x}: ${args.point.y}`;
    }
}
```

### Conditional Text

```typescript
textRender: (
    args: CircularChart3DTextRenderEventArgs
): void => {
    if (
        args.point &&
        Number(args.point.y) > 20
    ) {
        args.text = `${args.point.x}: High`;
    }
}
```

### Truncate Long Labels

```typescript
textRender: (
    args: CircularChart3DTextRenderEventArgs
): void => {
    const maximumLength: number = 18;

    if (
        args.text &&
        args.text.length > maximumLength
    ) {
        args.text =
            args.text.substring(0, maximumLength - 3) +
            '...';
    }
}
```

### Display Calculated Percentage

Calculate the total before creating the chart.

```typescript
const total: number = data.reduce(
    (sum: number, item: BrowserData): number =>
        sum + item.share,
    0
);
```

Use the event to calculate the selected point's contribution.

```typescript
textRender: (
    args: CircularChart3DTextRenderEventArgs
): void => {
    if (
        args.point &&
        args.point.y !== undefined
    ) {
        const value: number = Number(args.point.y);
        const percentage: number =
            total === 0
                ? 0
                : (value / total) * 100;

        args.text =
            `${args.point.x}: ` +
            `${percentage.toFixed(1)}%`;
    }
}
```

This approach avoids assuming that a `percentage` property always exists on the event point.

### Complete TypeScript textRender Example

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChart3DTextRenderEventArgs
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface BrowserData {
    browser: string;
    share: number;
}

const data: BrowserData[] = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

const total: number = data.reduce(
    (sum: number, item: BrowserData): number =>
        sum + item.share,
    0
);

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    tilt: -45,

    textRender: (
        args: CircularChart3DTextRenderEventArgs
    ): void => {
        if (
            args.point &&
            args.point.y !== undefined
        ) {
            const value: number =
                Number(args.point.y);

            const percentage: number =
                total === 0
                    ? 0
                    : (value / total) * 100;

            args.text =
                `${args.point.x}: ` +
                `${percentage.toFixed(1)}%`;
        }
    },

    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',

        dataLabel: {
            visible: true,
            position: 'Outside',

            connectorStyle: {
                length: '35px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#element');
```

### Complete JavaScript textRender Example

```javascript
var data = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

var total = data.reduce(function (sum, item) {
    return sum + item.share;
}, 0);

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    tilt: -45,

    textRender: function (args) {
        if (
            args.point &&
            args.point.y !== undefined
        ) {
            var value = Number(args.point.y);

            var percentage =
                total === 0
                    ? 0
                    : (value / total) * 100;

            args.text =
                args.point.x +
                ': ' +
                percentage.toFixed(1) +
                '%';
        }
    },

    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',

        dataLabel: {
            visible: true,
            position: 'Outside',

            connectorStyle: {
                length: '35px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#element');
```

## Complete TypeScript Data Label Example

The following example includes:

- Strongly typed data.
- Required module injection.
- Outside data labels.
- Text mapping.
- Background and border customization.
- Font customization.
- Connector customization.
- Conditional `textRender` formatting.
- Legend and tooltip support.

Required HTML:

```html
<div id="element"></div>
```

TypeScript:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D,
    CircularChart3DTextRenderEventArgs
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);

interface BrowserData {
    browser: string;
    share: number;
    labelText: string;
    color: string;
}

const data: BrowserData[] = [
    {
        browser: 'Chrome',
        share: 62.92,
        labelText: 'Chrome',
        color: '#0066cc'
    },
    {
        browser: 'Firefox',
        share: 15.23,
        labelText: 'Firefox',
        color: '#d83b01'
    },
    {
        browser: 'Safari',
        share: 19.97,
        labelText: 'Safari',
        color: '#107c10'
    },
    {
        browser: 'Others',
        share: 2.88,
        labelText: 'Others',
        color: '#5c2d91'
    }
];

const total: number = data.reduce(
    (sum: number, item: BrowserData): number =>
        sum + item.share,
    0
);

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Browser Market Share',
    subTitle: 'Outside Data Labels',
    tilt: -45,
    depth: 50,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y:n2}%</b>'
    },

    textRender: (
        args: CircularChart3DTextRenderEventArgs
    ): void => {
        if (
            args.point &&
            args.point.y !== undefined
        ) {
            const value: number =
                Number(args.point.y);

            const percentage: number =
                total === 0
                    ? 0
                    : (value / total) * 100;

            args.text =
                `${args.point.x}: ` +
                `${percentage.toFixed(1)}%`;
        }
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color',
        radius: '75%',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'labelText',

            fill: '#ffffff',

            border: {
                width: 1,
                color: '#cccccc'
            },

            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                size: '12px',
                color: '#333333',
                opacity: 1
            },

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666',
                dashArray: ''
            }
        }
    }]
});

chart.appendTo('#element');
```

Expected behavior:

```text
1. PieSeries3D renders the 3D circular series.
2. CircularChartDataLabel3D renders outside labels.
3. The textRender event calculates and displays percentages.
4. Connector lines associate labels with segments.
5. Labels use a white background and gray border.
6. The legend identifies the categories.
7. The tooltip displays the exact numeric values.
8. Point colors come from the data-source color field.
```

## Complete JavaScript Data Label Example

```javascript
var data = [
    {
        browser: 'Chrome',
        share: 62.92,
        labelText: 'Chrome',
        color: '#0066cc'
    },
    {
        browser: 'Firefox',
        share: 15.23,
        labelText: 'Firefox',
        color: '#d83b01'
    },
    {
        browser: 'Safari',
        share: 19.97,
        labelText: 'Safari',
        color: '#107c10'
    },
    {
        browser: 'Others',
        share: 2.88,
        labelText: 'Others',
        color: '#5c2d91'
    }
];

var total = data.reduce(function (sum, item) {
    return sum + item.share;
}, 0);

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Browser Market Share',
    subTitle: 'Outside Data Labels',
    tilt: -45,
    depth: 50,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y:n2}%</b>'
    },

    textRender: function (args) {
        if (
            args.point &&
            args.point.y !== undefined
        ) {
            var value = Number(args.point.y);

            var percentage =
                total === 0
                    ? 0
                    : (value / total) * 100;

            args.text =
                args.point.x +
                ': ' +
                percentage.toFixed(1) +
                '%';
        }
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color',
        radius: '75%',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'labelText',

            fill: '#ffffff',

            border: {
                width: 1,
                color: '#cccccc'
            },

            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                size: '12px',
                color: '#333333',
                opacity: 1
            },

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666',
                dashArray: ''
            }
        }
    }]
});

chart.appendTo('#element');
```

## Runtime Validation Checklist

```text
✅ CircularChart3D is imported in TypeScript.
✅ PieSeries3D is imported and injected.
✅ CircularChartDataLabel3D is imported and injected.
✅ CircularChartLegend3D is imported and injected when the legend is visible.
✅ CircularChartTooltip3D is imported and injected when the tooltip is enabled.
✅ dataLabel.visible is true.
✅ xName matches a category field in every data object.
✅ yName matches a numeric field in every data object.
✅ dataLabel.name matches an existing data-source field when used.
✅ Inside labels use sufficient color contrast.
✅ Outside labels have sufficient surrounding chart space.
✅ connectorStyle is used with Outside labels.
✅ Template HTML is valid and does not contain editor-generated markup.
✅ Template placeholders use validated point tokens.
✅ Number formats match the underlying value type.
✅ Percentage formats are applied to fractional values when scaling is intended.
✅ textRender is used only when static configuration is insufficient.
✅ Percentage calculations handle a total of zero.
✅ Chart width and height provide sufficient room for labels.
✅ The radius leaves room for outside labels and connectors.
✅ The target HTML element exists.
✅ chart.appendTo('#element') is called.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Missing Data Label Module

Incorrect:

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);
```

while using:

```typescript
dataLabel: {
    visible: true
}
```

Correct:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);
```

### Unnecessary Legend Module

Do not import and inject `CircularChartLegend3D` when the legend is disabled and no legend behavior is used.

Minimal data-label injection:

```typescript
CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);
```

If the legend is visible:

```typescript
CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D
);
```

### Incorrect Constructor Pattern

Avoid:

```typescript
const chart = new CircularChart3D({
    series: []
}, '#element');
```

Preferred:

```typescript
const chart = new CircularChart3D({
    series: []
});

chart.appendTo('#element');
```

### Missing Host Element

Required HTML:

```html
<div id="element"></div>
```

Required attachment:

```typescript
chart.appendTo('#element');
```

The IDs must match exactly.

### Encoded HTML in Executable Templates

Incorrect:

```typescript
template:
    '<div>${point.x}</div>'
```

Correct:

```typescript
template:
    '<div>${point.x}</div>'
```

HTML entities are appropriate when displaying HTML as prose, not inside an executable template string.

### Editor-Generated Anchor Markup

Incorrect:

```typescript
template:
    '</a>">'
```

Correct:

```typescript
template:
    'images/status.png'
```

Do not place rich-text editor anchor elements inside executable code.

### Invalid Arbitrary Template Token

Avoid relying on:

```typescript
template:
    '${point.x}: ${point.y}${point.unit}'
```

unless `${point.unit}` has been validated.

Preferred custom-field pattern:

```typescript
const data = source.map((item) => ({
    ...item,
    labelText:
        `${item.category}: ` +
        `${item.value}${item.unit}`
}));
```

```typescript
dataLabel: {
    visible: true,
    name: 'labelText'
}
```

### Incorrect Percentage Assumption

Incorrect:

```typescript
dataLabel: {
    visible: true,
    format: 'p1'
}
```

when the source values are already stored as:

```text
62.92
15.23
19.97
2.88
```

Percentage formatting normally scales fractional values.

If the values already represent percentage points, use:

```typescript
dataLabel: {
    visible: true,
    format: '{value}%'
}
```

or calculate the contribution explicitly in `textRender`.

### Incorrect textRender Styling Assumption

Avoid assuming every generic text event argument supports direct properties such as:

```typescript
args.color = 'red';
args.border.width = 1;
```

Prefer configuring common styling through:

```typescript
dataLabel.font
dataLabel.fill
dataLabel.border
```

Use `textRender` primarily for validated text changes and conditional rendering.

### Unsafe Percentage Property Assumption

Avoid:

```typescript
args.text =
    args.point.percentage + '%';
```

unless the installed event type and runtime object have been validated to expose `percentage`.

Runtime-safe alternative:

```typescript
const total = data.reduce(
    (sum, item) => sum + item.value,
    0
);

textRender: (args) => {
    if (
        args.point &&
        args.point.y !== undefined
    ) {
        const percentage =
            total === 0
                ? 0
                : Number(args.point.y) /
                    total *
                    100;

        args.text =
            percentage.toFixed(1) + '%';
    }
}
```

### Connector Used with Inside Position

The connector line is intended for outside labels.

Incorrect expectation:

```typescript
dataLabel: {
    visible: true,
    position: 'Inside',
    connectorStyle: {
        length: '50px'
    }
}
```

Correct:

```typescript
dataLabel: {
    visible: true,
    position: 'Outside',
    connectorStyle: {
        length: '50px'
    }
}
```

### Excessive Connector Length

A long connector can push labels outside the visible chart area.

Start with:

```typescript
connectorStyle: {
    length: '30px'
}
```

Increase the value only after validating:

```text
Chart width
Chart height
Series radius
Legend position
Label length
Number of segments
```

### Excessive Label Content

Avoid displaying all of the following in every label:

```text
Category
Raw value
Percentage
Index
Description
Status
```

Prefer:

```text
Data label -> Category or short value.
Tooltip    -> Detailed information.
Legend     -> Category identification.
Table      -> Exact accessible data.
```

### Low Contrast

Incorrect:

```typescript
dataLabel: {
    position: 'Inside',
    font: {
        color: '#777777'
    }
}
```

on a similarly dark segment.

Use a contrasting text color or move labels outside:

```typescript
dataLabel: {
    position: 'Outside',
    fill: '#ffffff',
    font: {
        color: '#1a1a1a'
    }
}
```

### Label Overlap Assumption

The chart arranges labels to reduce overlap, but no layout can guarantee perfect results for every dataset and container size.

When overlap remains:

```text
Increase chart dimensions.
Reduce label text length.
Use shorter fonts.
Reduce the number of categories.
Use a legend for category names.
Use tooltips for detailed values.
Move labels outside.
Reduce series radius.
Adjust connector length.
Group minor categories into Others.
```