# Lightweight Mode

By default, when the `dataSource` for `series` is empty, a lightweight Range Selector will be displayed without the chart series. This mode is particularly useful for mobile devices, reduced data scenarios, or when you only need the range selection interface without data visualization.

## Table of Contents

- [What is Lightweight Mode?](#what-is-lightweight-mode)
- [When to Use Lightweight Mode](#when-to-use-lightweight-mode)
- [Basic Lightweight Implementation](#basic-lightweight-implementation)
- [Lightweight with Numeric Data](#lightweight-with-numeric-data)
- [Lightweight with Customization](#lightweight-with-customization)
- [Lightweight with Tooltip](#lightweight-with-tooltip)
- [Lightweight with Period Selector](#lightweight-with-period-selector)
- [Lightweight for Mobile Devices](#lightweight-for-mobile-devices)
- [Lightweight with External Chart](#lightweight-with-external-chart)
- [Configuration Requirements for Lightweight Mode](#configuration-requirements-for-lightweight-mode)
  - [For DateTime](#for-datetime)
  - [For Numeric](#for-numeric)
- [Performance Benefits](#performance-benefits)
- [Complete Lightweight Example](#complete-lightweight-example)
- [Lightweight vs Full Mode Comparison](#lightweight-vs-full-mode-comparison)

## What is Lightweight Mode?

Lightweight mode provides a simplified Range Navigator that:
- Displays only the range selection interface (sliders and axis)
- Removes the chart series visualization
- Reduces rendering overhead and improves performance
- Ideal for mobile devices with limited screen space
- Useful when data visualization is handled elsewhere

## When to Use Lightweight Mode

**Use lightweight mode when:**
- Deploying on mobile devices where performance matters
- Chart data is displayed in a separate component
- You only need range selection functionality
- Minimizing UI complexity
- Reducing initial load time
- Screen space is constrained

**Don't use lightweight mode when:**
- Users need to see data distribution
- Visual context helps with range selection
- Desktop application with ample resources
- Data preview is essential for decision-making

## Basic Lightweight Implementation

When no series or dataSource is provided, Range Navigator automatically enters lightweight mode:

```typescript
import { Component } from '@angular/core';
import { RangeNavigatorModule, DateTimeService } from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [DateTimeService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            valueType="DateTime"
            [minimum]="minDate"
            [maximum]="maxDate"
            [value]="value"
            labelFormat="MMM yyyy">
        </ejs-rangenavigator>`
})
export class AppComponent {
    public minDate: Date = new Date(2023, 0, 1);
    public maxDate: Date = new Date(2023, 11, 31);
    public value: Date[] = [new Date(2023, 2, 1), new Date(2023, 9, 1)];
}

```

## Lightweight with Numeric Data

```typescript
import { Component } from '@angular/core';
import { RangeNavigatorModule } from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            valueType="Double"
            [minimum]="0"
            [maximum]="100"
            [interval]="10"
            [value]="value">
        </ejs-rangenavigator>`
})
export class AppComponent {
    public value: number[] = [20, 80];
}

```

## Lightweight with Customization

You can still customize the appearance in lightweight mode:

```typescript
import { Component } from '@angular/core';
import { RangeNavigatorModule, DateTimeService } from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [DateTimeService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            valueType="DateTime"
            [minimum]="minDate"
            [maximum]="maxDate"
            [value]="value"
            labelFormat="MMM"
            [navigatorStyleSettings]="navigatorStyle"
            [navigatorBorder]="navigatorBorder">
        </ejs-rangenavigator>`
})
export class AppComponent {
    public minDate: Date = new Date(2023, 0, 1);
    public maxDate: Date = new Date(2023, 11, 31);
    public value: Date[] = [new Date(2023, 3, 1), new Date(2023, 8, 1)];

    public navigatorStyle: Object = {
        selectedRegionColor: 'rgba(33, 150, 243, 0.3)',
        thumb: {
            type: 'Circle',
            width: 20,
            height: 20,
            fill: '#2196F3',
            border: { width: 2, color: '#ffffff' }
        }
    };

    public navigatorBorder: Object = { 
        width: 2, 
        color: '#2196F3' 
    };
}


```

## Lightweight with Tooltip

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    DateTimeService, 
    PeriodSelectorService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [DateTimeService, PeriodSelectorService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            valueType="DateTime"
            [minimum]="minDate"
            [maximum]="maxDate"
            [value]="value"
            [periodSelectorSettings]="periodSettings">
        </ejs-rangenavigator>`
})
export class AppComponent {
    public minDate = new Date(2020, 0, 1);
    public maxDate = new Date(2023, 11, 31);
    public value = [new Date(2022, 0, 1), new Date(2023, 11, 31)];

    public periodSettings: Object = {
        position: 'Top',
        periods: [
            { intervalType: 'Months', interval: 1, text: '1M' },
            { intervalType: 'Months', interval: 3, text: '3M' },
            { intervalType: 'Years', interval: 1, text: '1Y' },
            { text: 'All' }
        ]
    };
}

```

## Lightweight with Period Selector

Combine lightweight mode with period selector for a clean, button-based interface:

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    DateTimeService, 
    PeriodSelectorService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [DateTimeService, PeriodSelectorService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            valueType="DateTime"
            [minimum]="minDate"
            [maximum]="maxDate"
            [value]="value"
            [periodSelectorSettings]="periodSettings">
        </ejs-rangenavigator>`
})
export class AppComponent {
    public minDate = new Date(2020, 0, 1);
    public maxDate = new Date(2023, 11, 31);
    public value = [new Date(2022, 0, 1), new Date(2023, 11, 31)];

    public periodSettings: Object = {
        position: 'Top',
        periods: [
            { intervalType: 'Months', interval: 1, text: '1M' },
            { intervalType: 'Months', interval: 3, text: '3M' },
            { intervalType: 'Years', interval: 1, text: '1Y' },
            { text: 'All' }
        ]
    };
}

```

## Lightweight for Mobile Devices

```typescript
import { Component, HostListener } from '@angular/core';
import { 
    RangeNavigatorModule, 
    DateTimeService, 
    AreaSeriesService 
} from '@syncfusion/ej2-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule, CommonModule],
    providers: [DateTimeService, AreaSeriesService],
    template: `
        <ejs-rangenavigator id="responsiveRN" valueType="DateTime" [value]="value">
            <e-rangenavigator-series-collection *ngIf="!isMobile">
                <e-rangenavigator-series [dataSource]="data" xName="date" yName="value" type="Area">
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>`
})
export class AppComponent {
    public isMobile: boolean = window.innerWidth < 768;
    public value = [new Date(2023, 0, 1), new Date(2023, 5, 1)];
    public data = [{ date: new Date(2023, 0, 1), value: 100 }, /* ... */];

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }
}

```

## Lightweight with External Chart

Use lightweight Range Navigator to control a separate chart component:

```typescript
import { Component } from '@angular/core';
import { 
    ChartModule, 
    RangeNavigatorModule, 
    LineSeriesService, 
    DateTimeService, 
    RangeTooltipService
} from '@syncfusion/ej2-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [ChartModule, RangeNavigatorModule, CommonModule],
    providers: [LineSeriesService, DateTimeService, RangeTooltipService],
    template: `
        <div>
            <!-- Main Chart -->
            <ejs-chart [primaryXAxis]="xAxis" title="Sales Data">
                <e-series-collection>
                    <e-series [dataSource]="filteredData" xName="date" yName="value" type="Line">
                    </e-series>
                </e-series-collection>
            </ejs-chart>

            <!-- Lightweight Range Navigator -->
            <ejs-rangenavigator 
                id="rangeNavigator" 
                valueType="DateTime"
                [minimum]="minDate"
                [maximum]="maxDate"
                [value]="value"
                labelFormat="MMM"
                (changed)="handleRangeChange($event)">
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    public minDate: Date = new Date(2023, 0, 1);
    public maxDate: Date = new Date(2023, 11, 31);
    public value: Date[] = [new Date(2023, 0, 1), new Date(2023, 5, 1)];
    public xAxis: Object = { valueType: 'DateTime' };

    public data: any[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 },
        { date: new Date(2023, 4, 1), value: 120 },
        { date: new Date(2023, 5, 1), value: 125 },
        { date: new Date(2023, 6, 1), value: 130 },
        { date: new Date(2023, 7, 1), value: 128 },
        { date: new Date(2023, 8, 1), value: 135 },
        { date: new Date(2023, 9, 1), value: 140 },
        { date: new Date(2023, 10, 1), value: 138 },
        { date: new Date(2023, 11, 1), value: 145 }
    ];

    public filteredData: any[] = this.data.filter(
        item => item.date >= this.value[0] && item.date <= this.value[1]
    );

    public handleRangeChange(args: any): void {
        this.filteredData = this.data.filter(
            item => item.date >= (args.start as Date) && item.date <= (args.end as Date)
        );
    }
}

```

## Configuration Requirements for Lightweight Mode

When using lightweight mode, you must explicitly set:

### For DateTime

```typescript
<ejs-rangenavigator
  valueType="DateTime"
  [minimum]="minDate"    <!-- Required -->
  [maximum]="maxDate"    <!-- Required -->
  [value]="value"         <!-- Optional initial range -->
  labelFormat="MMM yyyy"  <!-- Optional format -->
></ejs-rangenavigator>

```

### For Numeric

```typescript
<ejs-rangenavigator
  valueType="Double"
  [minimum]="0"          <!-- Required -->
  [maximum]="100"        <!-- Required -->
  [interval]="10"        <!-- Optional -->
  [value]="[20, 80]"     <!-- Optional initial range -->
></ejs-rangenavigator>

```

## Performance Benefits

Lightweight mode provides:

- **Faster Rendering**: No series data to process or render
- **Reduced Memory**: Smaller memory footprint without chart data
- **Smaller Bundle**: Only core Range Navigator modules needed
- **Better Mobile Experience**: Simplified UI for small screens
- **Quick Initialization**: Instant load without data processing

## Complete Lightweight Example

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    RangeNavigatorModule, 
    DateTimeService, 
    RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule, CommonModule],
    providers: [DateTimeService, RangeTooltipService],
    template: `
        <div class="App">
            <h2>Lightweight Range Navigator</h2>
            <p>Performance-optimized for mobile devices</p>
            
            <ejs-rangenavigator 
                id="rangeNavigator" 
                valueType="DateTime"
                [minimum]="minDate"
                [maximum]="maxDate"
                [value]="initialValue"
                labelFormat="MMM yyyy"
                intervalType="Months"
                [tooltip]="tooltip"
                [navigatorStyleSettings]="navigatorStyle"
                (changed)="handleChange($event)">
            </ejs-rangenavigator>

            <div style="margin-top: 20px;">
                <h3>Selected Range:</h3>
                <!-- In Angular, we use class properties instead of useState -->
                <p>From: {{ selectedRange.start | date:'mediumDate' }}</p>
                <p>To: {{ selectedRange.end | date:'mediumDate' }}</p>
            </div>
        </div>`
})
export class AppComponent {
    public minDate: Date = new Date(2023, 0, 1);
    public maxDate: Date = new Date(2023, 11, 31);
    
    // Equivalent to initial state value
    public initialValue: Date[] = [new Date(2023, 0, 1), new Date(2023, 5, 1)];
    
    // Class property to track the "state" of the selection
    public selectedRange = {
        start: new Date(2023, 0, 1),
        end: new Date(2023, 5, 1)
    };

    public tooltip: Object = { 
        enable: true,
        displayMode: 'Always'
    };

    public navigatorStyle: Object = {
        selectedRegionColor: 'rgba(33, 150, 243, 0.3)',
        thumb: {
            type: 'Circle',
            width: 20,
            height: 20,
            fill: '#2196F3',
            border: { width: 2, color: '#ffffff' }
        }
    };

    // Using 'any' to bypass the need for IChangedEventArgs import
    public handleChange(args: any): void {
        // Updating class properties triggers automatic UI updates in Angular
        this.selectedRange = {
            start: args.start,
            end: args.end
        };
        console.log('Selected:', args.start, 'to', args.end);
    }
}

```

## Lightweight vs Full Mode Comparison

| Feature | Lightweight | Full (with Series) |
|---------|-------------|-------------------|
| Series Visualization | ❌ No | ✅ Yes |
| Range Selection | ✅ Yes | ✅ Yes |
| Tooltip | ✅ Yes | ✅ Yes |
| Period Selector | ✅ Yes | ✅ Yes |
| Customization | ✅ Yes | ✅ Yes |
| Performance | ⚡ Fast | ✓ Standard |
| Memory Usage | 🔽 Low | ✓ Normal |
| Mobile Friendly | ✅ Excellent | ✓ Good |
| Data Context | ❌ No visual | ✅ Visual context |
