# Tooltip

Tooltips display the selected start and end values when users interact with the range sliders. The Range Navigator provides extensive customization options for tooltip appearance and behavior.

## Table of Contents

- [Enabling Tooltip](#enabling-tooltip)
  - [Module Injection Required](#module-injection-required)
  - [Basic Tooltip Implementation](#basic-tooltip-implementation)
- [Tooltip Customization](#tooltip-customization)
  - [Complete Tooltip Customization](#complete-tooltip-customization)
  - [Tooltip Fill Color Examples](#tooltip-fill-color-examples)
  - [Text Style Customization](#text-style-customization)
- [Display Modes](#display-modes)
  - [OnDemand Mode (Default)](#ondemand-mode-default)
  - [Always Mode](#always-mode)
  - [Display Mode Comparison](#display-mode-comparison)
- [Numeric Value Tooltip](#numeric-value-tooltip)
- [Tooltip with Period Selector](#tooltip-with-period-selector)
- [Complete Tooltip Example](#complete-tooltip-example)
- [Tooltip Configuration Summary](#tooltip-configuration-summary)



## Enabling Tooltip

### Module Injection Required

To use tooltips, inject the `RangeTooltipService` module as provider:

```typescript
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService, 
    RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    standalone: true,
    imports: [ RangeNavigatorModule ],
    /* Provide services here instead of using <Inject> */
    providers: [ AreaSeriesService, DateTimeService, RangeTooltipService ],
    selector: 'app-container',
    template: `<ejs-rangenavigator id='container' [tooltip]='tooltip'></ejs-rangenavigator>`
})
export class AppComponent {
    public tooltip: Object = { enable: true };
}

```

### Basic Tooltip Implementation

```typescript
import { Component, OnInit } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService, 
    RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            valueType="DateTime" 
            labelFormat="MMM"
            [dataSource]="data"
            xName="date"
            yName="value"
            type="Area"
            [tooltip]="tooltip">
        </ejs-rangenavigator>`
})
export class AppComponent implements OnInit {
    public data: Object[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];

    public tooltip: Object = { 
        enable: true 
    };

    ngOnInit(): void { }
}

```

## Tooltip Customization

Customize tooltip appearance using these properties:

- **enable**: Show or hide tooltip
- **fill**: Background color of tooltip
- **opacity**: Transparency level (0 to 1)
- **textStyle**: Font customization (size, color, family, style, weight)
- **displayMode**: When to show tooltip ('OnDemand' or 'Always')

### Complete Tooltip Customization

```typescript
import { Component, OnInit } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService, 
    RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            valueType="DateTime" 
            labelFormat="MMM"
            [dataSource]="data"
            xName="date"
            yName="value"
            type="Area"
            [tooltip]="tooltip">
        </ejs-rangenavigator>`
})
export class AppComponent implements OnInit {
    public data: Object[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 },
        { date: new Date(2023, 4, 1), value: 120 }
    ];

    public tooltip: Object = {
        enable: true,
        fill: '#2196F3',
        opacity: 0.9,
        textStyle: {
            size: '14px',
            color: '#ffffff',
            fontFamily: 'Segoe UI',
            fontWeight: '600'
        },
        displayMode: 'Always'
    };

    ngOnInit(): void { }
}

```

### Tooltip Fill Color Examples

```typescript
// Material Design Blue
tooltip={ enable: true, fill: '#2196F3', opacity: 0.9 }

// Success Green
tooltip={ enable: true, fill: '#4CAF50', opacity: 0.85 }

// Dark Theme
tooltip={ enable: true, fill: '#212121', opacity: 0.95 }

// Gradient (requires CSS)
tooltip={ enable: true, fill: '#FF6B6B', opacity: 0.9 }
```

### Text Style Customization

```typescript
tooltip={
  enable: true,
  textStyle: {
    size: '16px',           // Font size
    color: '#ffffff',       // Text color
    fontFamily: 'Arial',    // Font family
    fontStyle: 'normal',    // normal | italic | oblique
    fontWeight: 'bold'      // normal | bold | 100-900
  }
}
```

## Display Modes

The `displayMode` property controls when tooltips appear.

### OnDemand Mode (Default)

Tooltips appear only when user hovers over or drags the thumb:

```typescript
tooltip={{
  enable: true,
  displayMode: 'OnDemand'
}}
```

**Use OnDemand when:**
- Clean UI is preferred
- Tooltips might obstruct view
- Users are experienced
- Screen space is limited

### Always Mode

Tooltips are always visible on both thumbs:

```typescript
tooltip={{
  enable: true,
  displayMode: 'Always'
}}
```

**Use Always when:**
- Range values are critical
- Users need constant feedback
- Data precision is important
- Training or demo scenarios

### Display Mode Comparison

```typescript
import { Component, OnInit } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService, 
    RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
    template: `
        <div>
            <div>
                <button (click)="setDisplayMode('OnDemand')">OnDemand</button>
                <button (click)="setDisplayMode('Always')">Always</button>
            </div>

            <ejs-rangenavigator 
                id="rangeNavigator" 
                valueType="DateTime" 
                [dataSource]="data"
                xName="date"
                yName="value"
                type="Area"
                [tooltip]="tooltip">
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent implements OnInit {
    public data: Object[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];

    // Tooltip object initialized with default state
    public tooltip: Object = {
        enable: true,
        displayMode: 'OnDemand'
    };

    public setDisplayMode(mode: string): void {
        // In Angular, we trigger a re-render by updating the object reference
        this.tooltip = {
            enable: true,
            displayMode: mode
        };
    }

    ngOnInit(): void { }
}

```

## Numeric Value Tooltip

For numeric data, tooltips display the selected numeric range:

```typescript
import { Component, OnInit } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, RangeTooltipService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            valueType="Double" 
            [dataSource]="data"
            xName="x"
            yName="y"
            type="Area"
            [tooltip]="tooltip">
        </ejs-rangenavigator>`
})
export class AppComponent implements OnInit {
    public data: Object[] = [
        { x: 0, y: 10 },
        { x: 10, y: 30 },
        { x: 20, y: 25 },
        { x: 30, y: 45 },
        { x: 40, y: 35 }
    ];

    public tooltip: Object = {
        enable: true,
        fill: '#4CAF50',
        textStyle: {
            size: '14px',
            color: '#ffffff'
        }
    };

    ngOnInit(): void { }
}
```

## Tooltip with Period Selector

```typescript
import { Component, OnInit } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService, 
    RangeTooltipService,
    PeriodSelectorService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [
        AreaSeriesService, 
        DateTimeService, 
        RangeTooltipService, 
        PeriodSelectorService
    ],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            valueType="DateTime" 
            labelFormat="MMM yyyy"
            [dataSource]="data"
            xName="date"
            yName="value"
            type="Area"
            [tooltip]="tooltip"
            [periodSelectorSettings]="periodSelector">
        </ejs-rangenavigator>`
})
export class AppComponent implements OnInit {
    public data: Object[] = [
        { date: new Date(2020, 0, 1), value: 100 },
        { date: new Date(2020, 3, 1), value: 110 },
        { date: new Date(2020, 6, 1), value: 105 },
        { date: new Date(2020, 9, 1), value: 115 },
        { date: new Date(2021, 0, 1), value: 120 },
        { date: new Date(2021, 3, 1), value: 130 }
    ];

    public tooltip: Object = {
        enable: true,
        displayMode: 'Always'
        fill: '#2196F3',
        opacity: 0.9
    };

    public periodSelector: Object = {
        periods: [
            { intervalType: 'Months', interval: 3, text: '3M' },
            { intervalType: 'Months', interval: 6, text: '6M' },
            { intervalType: 'Years', interval: 1, text: '1Y' }
        ]
    };

    ngOnInit(): void { }
}

```

## Complete Tooltip Example

```typescript
import { Component, OnInit } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService, 
    RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
    template: `
        <div class="App">
            <h2>Stock Price Navigator with Tooltip</h2>
            <ejs-rangenavigator 
                id="rangeNavigator" 
                valueType="DateTime" 
                labelFormat="MMM"
                [value]="value"
                [dataSource]="stockData"
                xName="date"
                yName="price"
                type="Area"
                [tooltip]="tooltip">
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent implements OnInit {
    public stockData: Object[] = [
        { date: new Date(2023, 0, 1), price: 100 },
        { date: new Date(2023, 1, 1), price: 110 },
        { date: new Date(2023, 2, 1), price: 105 },
        { date: new Date(2023, 3, 1), price: 115 },
        { date: new Date(2023, 4, 1), price: 120 },
        { date: new Date(2023, 5, 1), price: 125 },
        { date: new Date(2023, 6, 1), price: 130 },
        { date: new Date(2023, 7, 1), price: 128 },
        { date: new Date(2023, 8, 1), price: 135 },
        { date: new Date(2023, 9, 1), price: 140 },
        { date: new Date(2023, 10, 1), price: 138 },
        { date: new Date(2023, 11, 1), price: 145 }
    ];

    public value: Date[] = [new Date(2023, 2, 1), new Date(2023, 9, 1)];

    public tooltip: Object = {
        enable: true,
        displayMode: 'Always'
        fill: '#2196F3',
        opacity: 0.95,
        textStyle: {
            size: '14px',
            color: '#ffffff',
            fontFamily: 'Segoe UI',
            fontWeight: '600'
        }
    };

    ngOnInit(): void {
        // Data is pre-initialized, but you can logic here if needed
    }
}

```

## Tooltip Configuration Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| enable | Boolean | false | Enable or disable tooltip |
| fill | String | Theme-based | Background color |
| opacity | Number | 0.95 | Transparency (0-1) |
| displayMode | String | 'OnDemand' | 'OnDemand' or 'Always' |
| labelFormat | String | Auto | Date/time format string |
| textStyle.size | String | '12px' | Font size |
| textStyle.color | String | '#ffffff' | Text color |
| textStyle.fontFamily | String | 'Segoe UI' | Font family |
| textStyle.fontWeight | String | 'normal' | Font weight |
| textStyle.fontStyle | String | 'normal' | Font style |
