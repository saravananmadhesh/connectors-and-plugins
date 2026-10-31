# Axis Configuration & Types

The Range Navigator supports two primary axis types for different data scenarios: DateTime and Numeric axes. This guide covers configuration, customization, and best practices.

## Table of Contents

- [DateTime Axis](#datetime-axis)
  - [Basic DateTime Axis](#basic-datetime-axis)
  - [Interval Types for DateTime Axis](#interval-types-for-datetime-axis)
  - [DateTime Range Configuration](#datetime-range-configuration)
  - [DateTime Label Format](#datetime-label-format)
- [Numeric Axis](#numeric-axis)
  - [Basic Numeric Axis](#basic-numeric-axis)
  - [Numeric Range and Intervals](#numeric-range-and-intervals)
  - [Custom Numeric Intervals](#custom-numeric-intervals)
- [Axis Label Customization](#axis-label-customization)
  - [Label Format Function](#label-format-function)
  - [Numeric Label Formatting](#numeric-label-formatting)
- [Axis Style and Appearance](#axis-style-and-appearance)
  - [Label Style](#label-style)
- [Grid Line Configuration](#grid-line-configuration)
  - [Customize Grid Lines](#customize-grid-lines)
- [Comparison: DateTime vs Numeric Axis](#comparison-datetime-vs-numeric-axis)
- [Best Practices](#best-practices)
- [Examples](#examples)
  - [Stock Price Data with DateTime Axis](#stock-price-data-with-datetime-axis)
  - [Sensor Data with Numeric Axis](#sensor-data-with-numeric-axis)


## DateTime Axis

DateTime axis is ideal for time-series data and chronological navigation.

### Basic DateTime Axis

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      id="rn-container"
      valueType="DateTime"
      [intervalType]="'Months'">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          [dataSource]="chartData"
          xName="date" 
          yName="value" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class DateTimeAxisComponent {
  chartData = [
    { date: new Date(2023, 0, 1), value: 100 },
    { date: new Date(2023, 1, 1), value: 120 },
    { date: new Date(2023, 2, 1), value: 140 },
    { date: new Date(2023, 3, 1), value: 135 }
  ];
}
```

### Interval Types for DateTime Axis

Supported interval types:

| Type | Description | Use Case |
|------|-------------|----------|
| `Years` | Yearly intervals | Long-term trends |
| `Months` | Monthly intervals | Quarterly or annual reports |
| `Days` | Daily intervals | Weekly or monthly data |
| `Hours` | Hourly intervals | Real-time monitoring |
| `Minutes` | Minute intervals | High-frequency data |
| `Seconds` | Second intervals | Millisecond-level precision |

```typescript
@Component({
  template: `
    <!-- Daily data -->
    <ejs-rangenavigator 
      valueType="DateTime"
      [intervalType]="'Days'">
      <!-- series -->
    </ejs-rangenavigator>

    <!-- Hourly data -->
    <ejs-rangenavigator 
      valueType="DateTime"
      [intervalType]="'Hours'">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class IntervalTypesComponent { }
```

### DateTime Range Configuration

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [minimum]="minDate"
      [maximum]="maxDate"
      [intervalType]="'Months'">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class DateTimeRangeComponent {
  public minDate: Date = new Date(2020, 0, 1);
  public maxDate: Date = new Date(2024, 11, 31);
}
```

### DateTime Label Format

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [labelFormat]="'MMM dd, yyyy'">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class DateFormatComponent { }
```

Common date format patterns:
- `'dd/MM/yyyy'` → 01/01/2023
- `'MMM dd, yyyy'` → Jan 01, 2023
- `'yyyy-MM-dd'` → 2023-01-01
- `'dd-MMM'` → 01-Jan
- `'MMM yyyy'` → Jan 2023

## Numeric Axis

Numeric axis is used for browsing numeric ranges without time considerations.

### Basic Numeric Axis

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      id="rn-container"
      
      valueType="Double">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          [dataSource]="numericData"
          xName="index" 
          yName="value" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class NumericAxisComponent {
  numericData = [
    { index: 0, value: 50 },
    { index: 10, value: 75 },
    { index: 20, value: 100 },
    { index: 30, value: 90 }
  ];
}
```

### Numeric Range and Intervals

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="Double"
      [minimum]="0"
      [maximum]="1000"
      [interval]="100">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          xName="index" 
          yName="value" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class NumericRangeComponent { }
```

### Custom Numeric Intervals

```typescript
export class CustomIntervalComponent {
  template = `
    <ejs-rangenavigator 
      valueType="Double"
      [minimum]="0"
      [maximum]="500"
      [interval]="50">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          xName="index" 
          yName="value" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `;
}
```

## Axis Label Customization

### Label Format Function

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      
      [labelFormat]="labelFormatFunc">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          [dataSource]="chartData"
          xName="index" 
          yName="value" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class LabelFormatFunctionComponent {
  public chartData = [
    { date: new Date(2024, 0, 1), value: 100 },
    { date: new Date(2024, 5, 1), value: 150 },
    { date: new Date(2024, 11, 1), value: 120 }
  ];
  labelFormatFunc = (args: any): string => {
    const date = new Date(args.value);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
}
```

### Numeric Label Formatting

```typescript
export class NumericLabelFormatComponent {
  labelFormatFunc = (args: any): string => {
    if (args.value >= 1000000) {
      return (args.value / 1000000).toFixed(1) + 'M';
    } else if (args.value >= 1000) {
      return (args.value / 1000).toFixed(1) + 'K';
    }
    return args.value.toString();
  };
}
```

## Axis Style and Appearance

### Label Style

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [labelStyle]="labelStyle">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          xName="index" 
          yName="value" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class AxisStyleComponent {
  labelStyle = {
    color: '#555555',
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '500',
    size: '14px'
  };

}
```

## Grid Line Configuration

### Customize Grid Lines

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [majorGridLines]="majorGridLines">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          xName="index" 
          yName="value" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class GridLineComponent {
  public majorGridLines = {
    width: 1,
    color: 'red',
    dashArray: '2,2'
  };
}
```

## Comparison: DateTime vs Numeric Axis

| Feature | DateTime | Numeric |
|---------|----------|---------|
| Data Type | Time-series data | Sequential or numeric data |
| Primary Use | Stock prices, sensor readings | Index-based, statistical data |
| Interval Types | Years, Months, Days, Hours, Minutes, Seconds | Fixed numeric intervals |
| Label Format | Date formats | Number formats |
| Common Scenario | Timeline navigation | Range selection for sequences |
| Period Selector | Highly useful | Less common |

## Best Practices

1. **DateTime Axis:** Use for any time-based data (stock prices, sensor readings, analytics)
2. **Numeric Axis:** Use for index-based data or non-temporal ranges
3. **Label Clarity:** Always use clear, readable date/numeric formats
4. **Interval Selection:** Match intervals to your data granularity
5. **Range Configuration:** Set appropriate minimum/maximum values for optimal navigation
6. **Performance:** For large datasets, consider interval optimization

## Examples

### Stock Price Data with DateTime Axis

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [labelFormat]="'dd-MMM'"
      [intervalType]="'Months'">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]='stockData' 
          xName='date' 
          yName='close' 
          type'Area'>
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class StockPriceComponent {
  stockData = [
    { date: new Date(2023, 0, 1), close: 150 },
    { date: new Date(2023, 1, 1), close: 155 },
    // ... more data
  ];
}
```

### Sensor Data with Numeric Axis

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="Double"
      [minimum]="0"
      [maximum]="100"
      [interval]="10">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          xName="index" 
          yName="temperature" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class SensorDataComponent {
  sensorData = [
    { index: 0, temperature: 25 },
    { index: 1, temperature: 26 },
    // ... more readings
  ];
}
```
