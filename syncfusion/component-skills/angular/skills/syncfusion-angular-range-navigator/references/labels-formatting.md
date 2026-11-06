# Labels, Ticks & Formatting

This guide covers axis label customization, grid tick configuration, and formatting options for the Range Navigator component.

## Table of Contents

- [Axis Labels](#axis-labels)
  - [Label Customization](#label-customization)
  - [Label Format Patterns](#label-format-patterns)
  - [Custom Label Format Function](#custom-label-format-function)
  - [Numeric Label Formatting](#numeric-label-formatting)
- [Grid Lines and Ticks](#grid-lines-and-ticks)
  - [Grid Line Configuration](#grid-line-configuration)
  - [Grid Line Styling](#grid-line-styling)
  - [Hide Grid Lines](#hide-grid-lines)
- [Label Position and Rotation](#label-position-and-rotation)
  - [Label Positioning](#label-positioning)
  - [Label Rotation](#label-rotation)
- [Interval and Label Spacing](#interval-and-label-spacing)
  - [Custom Intervals](#custom-intervals)
  - [Numeric Intervals](#numeric-intervals)
- [Number Formatting](#number-formatting)
  - [Currency Format](#currency-format)
  - [Percentage Format](#percentage-format)
  - [Scientific Notation](#scientific-notation)
- [Locale-Specific Formatting](#locale-specific-formatting)
  - [Date Formatting with Locale](#date-formatting-with-locale)
- [Axis Label Events](#axis-label-events)
  - [Label Format with Conditions](#label-format-with-conditions)
- [Text Alignment and Wrapping](#text-alignment-and-wrapping)
  - [Label Alignment](#label-alignment)
- [Complex Formatting Example](#complex-formatting-example)
- [Multi-Level Labels](#multi-level-labels)
- [Best Practices](#best-practices)
- [Complete Example](#complete-example)

## Axis Labels

### Label Customization

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [labelFormat]="'MMM dd'"
      [labelStyle]="labelStyle">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class LabelCustomizationComponent {
  labelStyle = {
    color: '#555555',
    fontFamily: 'Segoe UI, sans-serif',
    fontStyle: 'Normal',
    fontWeight: '500',
    size: '14px'
  };
}
```

### Label Format Patterns

Common date format patterns:

| Pattern | Output | Example |
|---------|--------|---------|
| `'dd/MM/yyyy'` | Day/Month/Year | 01/01/2023 |
| `'MMM dd, yyyy'` | Month Day, Year | Jan 01, 2023 |
| `'yyyy-MM-dd'` | ISO format | 2023-01-01 |
| `'dd-MMM'` | Day-Month | 01-Jan |
| `'MMM yyyy'` | Month Year | Jan 2023 |
| `'ddd, MMM dd'` | Day name, Month Day | Mon, Jan 01 |

```typescript
@Component({
  template: `
    <!-- Day/Month/Year format -->
    <ejs-rangenavigator [labelFormat]="'dd/MM/yyyy'">
      <!-- series -->
    </ejs-rangenavigator>

    <!-- Month Year format -->
    <ejs-rangenavigator [labelFormat]="'MMM yyyy'">
      <!-- series -->
    </ejs-rangenavigator>

    <!-- ISO format -->
    <ejs-rangenavigator [labelFormat]="'yyyy-MM-dd'">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class DateFormatComponent { }
```

### Custom Label Format Function

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [labelFormat]="labelFormatFunc">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class CustomLabelFormatComponent {
  labelFormatFunc = (args: any): string => {
    const date = new Date(args.value);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${month[date.getMonth()]} '${date.getFullYear().toString().slice(2)}`;
  };
}
```

### Numeric Label Formatting

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="Double"
      [labelFormat]="numericLabelFunc">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class NumericLabelComponent {
  numericLabelFunc = (args: any): string => {
    if (args.value >= 1000000) {
      return (args.value / 1000000).toFixed(1) + 'M';
    } else if (args.value >= 1000) {
      return (args.value / 1000).toFixed(1) + 'K';
    }
    return args.value.toString();
  };
}
```

## Grid Lines and Ticks

### Grid Line Configuration

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [majorGridLines]="majorGridLines"
      [majorTickLines]="majorTickLines">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class GridLineComponent {
  majorGridLines = {
    visible: true,
    width: 1,
    color: 'rgba(200, 200, 200, 0.5)',
    dashArray: '2,2'
  };

  majorTickLines = {
    visible: true,
    width: 2,
    color: '#555555'
  };

}
```

### Grid Line Styling

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [majorGridLines]="customGridSettings">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class GridStyleComponent {
  customGridSettings = {
    visible: true,
    width: 2,
    color: '#3498db',
    dashArray: '5,5'
  };
}
```

### Hide Grid Lines

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [majorGridLines]="{ visible: false }">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class NoGridComponent { }
```

## Label Position and Rotation

### Label Positioning

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [labelPosition]="'Outside'">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class LabelPositionComponent { }
```

Label position options: `Inside`, `Outside`

### Label Rotation

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [labelStyle]="labelStyle">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class LabelRotationComponent {
  labelStyle = {
    size: '14px',
    angle: 45,  // Rotation angle
    enableRotation: true
  };
}
```

## Interval and Label Spacing

### Custom Intervals

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [intervalType]="'Months'"
      [interval]="1">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class CustomIntervalComponent { }
```

### Numeric Intervals

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="Double"
      [interval]="50"
      [minimum]="0"
      [maximum]="500">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class NumericIntervalComponent { }
```

## Number Formatting

### Currency Format

```typescript
export class CurrencyFormatComponent {
  labelFormatFunc = (args: any): string => {
    return '$' + args.value.toFixed(2);
  };
}
```

### Percentage Format

```typescript
export class PercentageFormatComponent {
  labelFormatFunc = (args: any): string => {
    return args.value.toFixed(1) + '%';
  };
}
```

### Scientific Notation

```typescript
export class ScientificFormatComponent {
  labelFormatFunc = (args: any): string => {
    return args.value.toExponential(2);
  };
}
```

## Locale-Specific Formatting

### Date Formatting with Locale

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
export class LocaleFormatComponent {
  ngOnInit(): void {
    // Set locale for date formatting
    const locale = navigator.language; // e.g., 'en-US', 'fr-FR', 'de-DE'
  }

  // Format dates based on locale
  formatDateLocale(date: Date, locale: string): string {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
```

## Axis Label Events

### Label Format with Conditions

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      (labelRender)="onLabelRender($event)">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class LabelEventComponent {
  onLabelRender(args: any): void {
    // Modify label based on value
    if (args.value > 500) {
      args.text = '<span style="color: red;">' + args.text + '</span>';
    }
  }
}
```

## Text Alignment and Wrapping

### Label Alignment

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [labelStyle]="labelStyle">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class LabelAlignmentComponent {
  labelStyle = {
    textAlignment: 'Center',  // Left, Center, Right
    fontWeight: 'Bold',
    size: '16px'
  };
}
```

## Complex Formatting Example

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [labelFormat]="advancedLabelFormat">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class ComplexFormatComponent {
  advancedLabelFormat = (args: any): string => {
    const date = new Date(args.value);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Show quarter format
    const quarter = Math.ceil(month / 3);
    return `Q${quarter} '${year.toString().slice(2)}`;
  };
}
```

## Multi-Level Labels

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartModule, RangeNavigatorModule } from '@syncfusion/ej2-angular-charts'
import { AreaSeriesService, DateTimeService, RangeTooltipService} from '@syncfusion/ej2-angular-charts'




import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule, RangeNavigatorModule
    ],

providers: [ AreaSeriesService, DateTimeService, RangeTooltipService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-rangenavigator id="rn-container" labelPosition='Outside' valueType='DateTime' [value]='value'  intervalType='Quarter' [enableGrouping]='grouping' [dataSource]='chartData' xName='x' yName='y' tooltip='tooltip'></ejs-rangenavigator>`
})

export class AppComponent implements OnInit {
    public data: object[] = [];
    public value: number = 0;
    public point: object = {};
    public chartData?: Object[];
    public values?: Object[];
    public grouping?: boolean;
    public tooltip?: Object;
    ngOnInit(): void {
        this.chartData =[];
        for (let j = 1; j < 1090; j++) {
            this.value += (Math.random() * 10 - 5);
            this.value = this.value < 0 ? Math.abs(this.value) : this.value;
            this.point = { x: new Date(2000, 0, j), y: this.value, z: (this.value + 10) };
            this.chartData.push(this.point);
        };
        this.values = [new Date("2001, 1,1"), new Date("2002,1,1")];
        this.grouping = true;
        this.tooltip= { enable: true };
    }
}
```

## Best Practices

1. **Date Format:** Use clear, internationally understandable formats
2. **Label Density:** Avoid too many labels; adjust interval appropriately
3. **Readability:** Ensure fonts are large enough to read
4. **Consistency:** Use same formatting across the application
5. **Performance:** Avoid complex formatting functions for large datasets
6. **Accessibility:** High contrast between labels and background
7. **RTL Support:** Consider RTL text direction if needed

## Complete Example

```typescript
import { Component } from '@angular/core';
import {
  RangeNavigatorModule,
  AreaSeriesService,
  DateTimeService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-labels-formatting',
  standalone: true,
  imports: [
    RangeNavigatorModule
  ],
  providers: [AreaSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator 
      id="rn-container"
      valueType="DateTime"
      [labelFormat]="'MMM dd, yyyy'"
      [labelStyle]="labelStyle"
      [majorGridLines]="majorGridLines"
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
export class LabelsFormattingComponent {
  chartData = [
    { date: new Date(2023, 0, 1), value: 50 },
    { date: new Date(2023, 1, 1), value: 65 },
    { date: new Date(2023, 2, 1), value: 75 },
    { date: new Date(2023, 3, 1), value: 60 }
  ];

  labelStyle = {
    color: '#2c3e50',
    fontFamily: 'Segoe UI, sans-serif',
    fontWeight: '500',
    size: '12px'
  };

  majorGridLines = {
    visible: true,
    width: 1,
    color: '#ecf0f1',
    dashArray: '2,2'
  };
}
```
