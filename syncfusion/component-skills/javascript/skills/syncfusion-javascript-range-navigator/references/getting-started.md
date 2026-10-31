# Getting Started with Range Navigator

## Installation

The Range Navigator component is included in the `@syncfusion/ej2-charts` package.

```bash
npm install @syncfusion/ej2-charts
```

### Required Dependencies

The following packages are installed automatically as dependencies:

```text
@syncfusion/ej2-charts
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-svg-base
├── @syncfusion/ej2-pdf-export
├── @syncfusion/ej2-file-utils
├── @syncfusion/ej2-compression
├── @syncfusion/ej2-calendars
├── @syncfusion/ej2-popups
└── @syncfusion/ej2-navigations
```

### Verify Installation

```bash
npm list @syncfusion/ej2-charts
```

## When to Use Range Navigator

Range Navigator allows users to:

- Select a specific date range from a large dataset.
- Zoom into financial and time-series data.
- Filter data displayed in a Chart or Stock Chart.
- Analyze trends across large time periods.
- Provide an overview-and-detail visualization experience.

Common use cases:

- Stock market applications
- Financial dashboards
- Sales analytics
- IoT monitoring
- Historical trend analysis

## Module Setup

Before creating a Range Navigator, inject the required modules.

### TypeScript

```typescript
import {
    RangeNavigator,
    AreaSeries,
    DateTime
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

### Available Modules

#### Series Modules

```typescript
AreaSeries
LineSeries
StepLineSeries
```

#### Axis Modules

```typescript
DateTime
Category
Logarithmic
```

### Injection Rules

| Scenario | Required Modules |
|----------|------------------|
| Area Series + DateTime Axis | AreaSeries, DateTime |
| Line Series + DateTime Axis | LineSeries, DateTime |
| StepLine Series + DateTime Axis | StepLineSeries, DateTime |
| Category Data | Category |
| Logarithmic Scale | Logarithmic |

## HTML Container

The component requires a container element.

```html
<div
    id="range-navigator"
    style="width:100%; height:250px;">
</div>
```

### Important

- Width must be available when rendering.
- Height should be explicitly defined.
- Avoid rendering inside hidden containers initially.

## Basic Initialization

### TypeScript

```typescript
import {
    RangeNavigator,
    AreaSeries,
    DateTime
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);

const data = [
    { x: new Date(2023, 0, 1), y: 21 },
    { x: new Date(2023, 0, 2), y: 24 },
    { x: new Date(2023, 0, 3), y: 36 },
    { x: new Date(2023, 0, 4), y: 38 },
    { x: new Date(2023, 0, 5), y: 54 }
];

const rangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y',
        type: 'Area'
    }]
});

rangeNavigator.appendTo('#range-navigator');
```

### JavaScript

```javascript
ej.charts.RangeNavigator.Inject(
    ej.charts.AreaSeries,
    ej.charts.DateTime
);

var data = [
    { x: new Date(2023, 0, 1), y: 21 },
    { x: new Date(2023, 0, 2), y: 24 },
    { x: new Date(2023, 0, 3), y: 36 },
    { x: new Date(2023, 0, 4), y: 38 },
    { x: new Date(2023, 0, 5), y: 54 }
];

var rangeNavigator = new ej.charts.RangeNavigator({
    valueType: 'DateTime',
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y',
        type: 'Area'
    }]
});

rangeNavigator.appendTo('#range-navigator');
```

## Understanding Core Properties

### valueType

Defines the x-axis value type.

```typescript
valueType: 'DateTime'
```

Supported values:

```text
DateTime
Category
Double
Logarithmic
```

### series

Defines visualization data.

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    type: 'Area'
}]
```

### xName

Maps x-axis field.

```typescript
xName: 'date'
```

### yName

Maps y-axis field.

```typescript
yName: 'value'
```

### type

Specifies series type.

```typescript
type: 'Area'
```

Supported values:

```text
Area
Line
StepLine
```

## Data Binding

### Local Data

```typescript
const data = [
    { date: new Date(2023, 0, 1), value: 100 },
    { date: new Date(2023, 0, 2), value: 120 },
    { date: new Date(2023, 0, 3), value: 110 }
];

const rangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    series: [{
        dataSource: data,
        xName: 'date',
        yName: 'value',
        type: 'Line'
    }]
});
```

### Remote Data

```typescript
import {
    DataManager,
    UrlAdaptor
} from '@syncfusion/ej2-data';

const dataManager = new DataManager({
    url: 'https://api.example.com/data',
    adaptor: new UrlAdaptor(),
    crossDomain: true
});

const rangeNavigator = new RangeNavigator({
    dataSource: dataManager,
    xName: 'date',
    yName: 'value'
});
```

## Default Selected Range

An initial selection can be applied using the `value` property.

```typescript
value: [
    new Date(2023, 0, 2),
    new Date(2023, 0, 4)
]
```

Complete example:

```typescript
const rangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 0, 2),
        new Date(2023, 0, 4)
    ],
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y',
        type: 'Area'
    }]
});
```

## Label Formatting

### DateTime Labels

```typescript
labelFormat: 'MMM yyyy'
```

Examples:

```text
Jan 2024
Feb 2024
Mar 2024
```

### Category Labels

```typescript
valueType: 'Category'
```

## Range Navigator Events

### changed

Triggered when selection changes.

```typescript
const rangeNavigator = new RangeNavigator({
    changed: (args) => {
        console.log(args.start);
        console.log(args.end);
    }
});
```

Common use:

- Update a chart
- Filter grid data
- Refresh dashboard widgets

## Integrating With Chart

Range Navigator is commonly used to control a Chart.

```typescript
changed: (args) => {
    chart.primaryXAxis.zoomFactor = args.zoomFactor;
    chart.primaryXAxis.zoomPosition = args.zoomPosition;
    chart.refresh();
}
```

## Common Mistakes and Future References

### Missing Module Injection

Incorrect:

```typescript
import { RangeNavigator } from '@syncfusion/ej2-charts';
```

Correct:

```typescript
import {
    RangeNavigator,
    AreaSeries,
    DateTime
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

### Missing Theme CSS

Without theme CSS:

- Labels may appear unstyled.
- Layout may look broken.
- Component styling will not match Syncfusion themes.

### Invalid Date Data

Incorrect:

```typescript
{ x: '01/01/2024' }
```

Preferred:

```typescript
{ x: new Date(2024, 0, 1) }
```

### Missing appendTo

Incorrect:

```typescript
new RangeNavigator({...});
```

Correct:

```typescript
const rangeNavigator = new RangeNavigator({...});
rangeNavigator.appendTo('#range-navigator');
```

### Missing Container Height

Incorrect:

```html
<div id="range-navigator"></div>
```

Correct:

```html
<div
    id="range-navigator"
    style="height:250px;">
</div>
```

### Choosing the Wrong valueType

| Data Type | valueType |
|------------|------------|
| Date Data | DateTime |
| String Categories | Category |
| Numeric Values | Double |
| Log Scale Data | Logarithmic |

## What You Should Learn Next

- Series customization
- Period selectors
- Deferred update mode
- Tooltip customization
- Label formatting
- Remote data integration
- Events
- Range selection synchronization
- Chart integration
- Stock Chart integration
- Performance optimization for large datasets
- Export and print support