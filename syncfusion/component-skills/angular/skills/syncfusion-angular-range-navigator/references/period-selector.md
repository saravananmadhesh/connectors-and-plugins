# Period Selector & Range Selection

The Period Selector provides quick selection buttons for common date ranges, enhancing user experience for timeline navigation.

## Table of Contents

- [Enable Period Selector](#enable-period-selector)
  - [Basic Period Selector](#basic-period-selector)
- [Available Periods](#available-periods)
  - [Standard Periods](#standard-periods)
  - [Interval Types](#interval-types)
- [Period Selector with Styling](#period-selector-with-styling)
  - [Background and Button Colors](#background-and-button-colors)
- [Positioning Period Selector](#positioning-period-selector)
  - [Top Position](#top-position)
  - [Bottom Position](#bottom-position)
- [Handling Period Selection Events](#handling-period-selection-events)
  - [Track Period Changes](#track-period-changes)
- [Custom Periods](#custom-periods)
  - [Define Custom Date Ranges With interval](#define-custom-date-ranges-with-interval)
- [Hide Period Selector](#hide-period-selector)
- [Combining Period Selector with Other Features](#combining-period-selector-with-other-features)
  - [Period Selector with Tooltip](#period-selector-with-tooltip)
  - [Period Selector with Multiple Series](#period-selector-with-multiple-series)
- [Best Practices](#best-practices)
- [Complete Example with All Features](#complete-example-with-all-features)

## Enable Period Selector

Period Selector displays preset buttons like "1M", "3M", "6M", "1Y" for quick range selection.

### Basic Period Selector

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartModule, RangeNavigatorModule } from '@syncfusion/ej2-angular-charts'
import { AreaSeriesService, DateTimeService, PeriodSelectorService} from '@syncfusion/ej2-angular-charts'




import { Component, OnInit } from '@angular/core';
import { chartData } from './datasource'

@Component({
imports: [
         ChartModule, RangeNavigatorModule
    ],

providers: [ AreaSeriesService, DateTimeService, PeriodSelectorService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-rangenavigator id="rn-container" valueType='DateTime' [periodSelectorSettings]='periodsValue'>
            <e-rangenavigator-series-collection>
                <e-rangenavigator-series [dataSource]='chartData' type='Area' xName='x' yName='close' width=2>
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>`
})
export class AppComponent implements OnInit {
    public periodsValue?: Object[];
    public chartData?: Object[];
    public tooltip?: Object[];
    public labelFormat?: string;
    ngOnInit(): void {
        this.periodsValue = {
            periods: [
                { text: '1M', interval: 1, intervalType: 'Months' },{ text: '3M', interval: 3, intervalType:'Months'},
                { text: '6M', interval: 6, intervalType: 'Months' }, { text: 'YTD' },
                { text: '1Y', interval: 1, intervalType: 'Years' },
                { text: '2Y', interval: 2, intervalType: 'Years', selected: true },
                { text: 'All' }
            ]
        } as any;
        this.chartData = chartData;
    }
}
```

## Available Periods

### Standard Periods

```typescript
export class StandardPeriodsComponent {
  periodSelector = {
    periods: [
      // 1 Day
      { text: '1D', interval: 1, intervalType: 'Days' },
      
      // 1 Week
      { text: '1W', interval: 1, intervalType: 'Weeks' },
      
      // 1 Month
      { text: '1M', interval: 1, intervalType: 'Months' },
      
      // 3 Months
      { text: '3M', interval: 3, intervalType: 'Months' },
      
      // 6 Months
      { text: '6M', interval: 6, intervalType: 'Months' },
      
      // 1 Year
      { text: '1Y', interval: 1, intervalType: 'Years' },
      
      // Year-to-Date
      { text: 'YTD', interval: 1, intervalType: 'Years' },
      
      // All data
      { text: 'All', interval: 1, intervalType: 'Years' }
    ]
  };
}
```

### Interval Types

Available interval types for period selector:

| Type | Description |
|------|-------------|
| `Days` | Day intervals |
| `Weeks` | Week intervals (7 days) |
| `Months` | Month intervals |
| `Years` | Year intervals |
| `Hours` | Hour intervals |
| `Minutes` | Minute intervals |

## Period Selector with Styling

### Background and Button Colors

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [periodSelectorSettings]="periodSelector">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class StyledPeriodComponent {
  periodSelector = {
    periods: [
      { text: '1M', interval: 1, intervalType: 'Months' },
      { text: '3M', interval: 3, intervalType: 'Months' },
      { text: '1Y', interval: 1, intervalType: 'Years' }
    ],
    height: 50,
    buttonStyle: {
      backgroundColor: '#f0f0f0',
      color: '#333',
      border: '1px solid #ccc',
      borderRadius: '4px'
    }
  };
}
```

## Positioning Period Selector

### Top Position

```typescript
export class TopPeriodComponent {
  periodSelector = {
    periods: [...],
    position: 'Top'  // Default position
  };
}
```

### Bottom Position

```typescript
export class BottomPeriodComponent {
  periodSelector = {
    periods: [...],
    position: 'Bottom'
  };
}
```

## Handling Period Selection Events

### Track Period Changes

```typescript
import { Component, ViewChild } from '@angular/core';
// Import the Component class for typing
import { RangeNavigatorComponent, RangeNavigatorModule, ChartModule, 
         AreaSeriesService, DateTimeService, PeriodSelectorService } from '@syncfusion/ej2-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ChartModule, RangeNavigatorModule, CommonModule],
  providers: [AreaSeriesService, DateTimeService, PeriodSelectorService],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-rangenavigator 
      #rangeNav
      valueType="DateTime"
      (periodSelectorChange)="onPeriodChange($event)"
      [periodSelectorSettings]="periodSelector">
      <!-- A series is required for the navigator to calculate ranges -->
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series [dataSource]="data" xName="x" yName="y" type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>

    <div *ngIf="selectedPeriod">
      Selected period: {{ selectedPeriod }}
    </div>
  `
})
export class AppComponent {
  // Fix 1: Correct type
  @ViewChild('rangeNav') rangeNav!: RangeNavigatorComponent;
  
  selectedPeriod: string = '';
  data = [{ x: new Date(2023, 0, 1), y: 10 }, { x: new Date(2023, 11, 31), y: 20 }];

  periodSelector = {
    periods: [
        { text: '1M', interval: 1, intervalType: 'Months' },
        { text: '3M', interval: 3, intervalType: 'Months' },
        { text: '1Y', interval: 1, intervalType: 'Years' }
      ]
  }

  onPeriodChange(args: any): void {
    // Fix 2: Use selectedPeriodText
    this.selectedPeriod = args.selectedPeriodText;
    console.log('Period changed to:', args.selectedPeriodText);
  }
}

```

## Custom Periods

### Define Custom Date Ranges With interval

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [periodSelectorSettings]="periodSelector">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class CustomPeriodComponent {
  periodSelector = {
    periods: [
      { text: '1M', interval: 1, intervalType: 'Months' },
      { text: '3M', interval: 3, intervalType: 'Months' },
      { text: 'Q3', interval: 1, intervalType: 'Quarter' },
      { text: '6M', interval: 6, intervalType: 'Months' },
      { text: '1Y', interval: 1, intervalType: 'Years' },
    ]
  };
}
```

## Hide Period Selector

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [periodSelectorSettings]="{ periods: [] }">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class NoPeriodComponent { }
```

## Combining Period Selector with Other Features

### Period Selector with Tooltip

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [periodSelectorSettings]="periodSelector"
      [tooltip]="tooltipSettings">
      <!-- series -->
    </ejs-rangenavigator>
  `,
  providers: [RangeTooltipService]
})
export class CombinedFeaturesComponent {
  periodSelector = {
    periods: [
      { text: '1M', interval: 1, intervalType: 'Months' },
      { text: '6M', interval: 6, intervalType: 'Months' },
      { text: '1Y', interval: 1, intervalType: 'Years' }
    ]
  };

  tooltipSettings = {
    enable: true,
    format: '${valueX}: ${valueY}'
  };
}
```

### Period Selector with Multiple Series

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [periodSelectorSettings]="periodSelector">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          xName="date" 
          yName="series1" 
          type="Area">
        </e-rangenavigator-series>
        <e-rangenavigator-series 
          xName="date" 
          yName="series2" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class MultiSeriesPeriodComponent {
  periodSelector = {
    periods: [
      { text: '1M', interval: 1, intervalType: 'Months' },
      { text: '3M', interval: 3, intervalType: 'Months' },
      { text: '1Y', interval: 1, intervalType: 'Years' }
    ]
  };
}
```


## Best Practices

1. **Sensible Defaults:** Always provide commonly used periods (1M, 3M, 6M, 1Y)
2. **Clear Labels:** Use intuitive text labels (e.g., "1M" for 1 month)
3. **Position:** Place period selector above the chart for better visibility
4. **Mobile Optimization:** Ensure buttons are large enough to tap on mobile devices
5. **Feedback:** Highlight the currently selected period
6. **Custom Periods:** Add domain-specific periods relevant to your data

## Complete Example with All Features

```typescript
import { Component } from '@angular/core';
import {
  RangeNavigatorModule,
  AreaSeriesService,
  DateTimeService,
  RangeTooltipService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-period-selector-demo',
  standalone: true,
  imports: [
    RangeNavigatorModule
  ],
  providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
  template: `
    <ejs-rangenavigator 
      id="rn-container"
      valueType="DateTime"
      [periodSelectorSettings]="periodSelector"
      [tooltip]="tooltipSettings"
      (changed)="onRangeChanged($event)">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          [dataSource]="chartData"
          xName="date" 
          yName="value" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
    <div style="margin-top: 20px;">
      <p>Selected Range: {{ selectedRange }}</p>
    </div>
  `
})
export class PeriodSelectorDemoComponent {
  chartData = [
    { date: new Date(2020, 0, 1), value: 50 },
    { date: new Date(2020, 6, 1), value: 100 },
    { date: new Date(2021, 0, 1), value: 80 },
    { date: new Date(2022, 0, 1), value: 120 },
    { date: new Date(2023, 0, 1), value: 90 }
  ];

  periodSelector = {
    periods: [
      { text: '1M', interval: 1, intervalType: 'Months' },
      { text: '3M', interval: 3, intervalType: 'Months' },
      { text: '6M', interval: 6, intervalType: 'Months' },
      { text: '1Y', interval: 1, intervalType: 'Years' },
      { text: 'All', interval: 1, intervalType: 'Years' }
    ]
  };

  tooltipSettings = {
    enable: true,
    format: 'Date: ${valueX}<br>Value: ${valueY}'
  };

  selectedRange = 'Select a period';

  onRangeChanged(args: any): void {
    this.selectedRange = `From ${args.start.toDateString()} to ${args.end.toDateString()}`;
  }
}
```
