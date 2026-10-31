# Right-to-Left (RTL) Support

The Range Navigator supports right-to-left (RTL) rendering for languages that read from right to left, such as Arabic, Hebrew, Persian, and Urdu. RTL support ensures proper text direction, layout mirroring, and cultural appropriateness.\

## Table of Contents

- [Enabling RTL](#enabling-rtl)
- [RTL Behavior](#rtl-behavior)
- [RTL with Different Value Types](#rtl-with-different-value-types)
  - [DateTime with RTL](#datetime-with-rtl)
  - [Numeric with RTL](#numeric-with-rtl)
- [RTL with Tooltip](#rtl-with-tooltip)
- [RTL with Period Selector](#rtl-with-period-selector)
- [Dynamic RTL Switching](#dynamic-rtl-switching)
- [RTL with Localization](#rtl-with-localization)
- [Complete RTL Example](#complete-rtl-example)
- [RTL with Custom Styling](#rtl-with-custom-styling)
- [Browser Compatibility](#browser-compatibility)
- [When to Use RTL](#when-to-use-rtl)
- [Best Practices](#best-practices)
- [Configuration Summary](#configuration-summary)
- [Key Points](#key-points)

## Enabling RTL

Enable RTL mode using the `enableRtl` property:

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            [enableRtl]="true" 
            valueType="DateTime" 
            labelFormat="MMM">
            <e-rangenavigator-series-collection>
                <e-rangenavigator-series 
                    [dataSource]="data" 
                    xName="date" 
                    yName="value" 
                    type="Area">
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>`
})
export class AppComponent {
    public data: Object[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 },
        { date: new Date(2023, 4, 1), value: 120 },
        { date: new Date(2023, 5, 1), value: 125 }
    ];
}

```

## RTL Behavior

When RTL is enabled:

1. **Layout Mirroring**: The entire Range Navigator layout is mirrored horizontally
2. **Slider Direction**: Sliders move from right to left
3. **Labels**: Text labels maintain proper RTL text direction
4. **Tooltip**: Tooltip position adjusts for RTL layout
5. **Period Selector**: Buttons are arranged right to left

## RTL with Different Value Types

### DateTime with RTL

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            [enableRtl]="true" 
            valueType="DateTime" 
            labelFormat="MMM yyyy">
            <e-rangenavigator-series-collection>
                <e-rangenavigator-series 
                    [dataSource]="data" 
                    xName="date" 
                    yName="value" 
                    type="Area">
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>`
})
export class AppComponent {
    public data: Object[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];
}

```

### Numeric with RTL

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            [enableRtl]="true" 
            valueType="Double">
            <e-rangenavigator-series-collection>
                <e-rangenavigator-series 
                    [dataSource]="data" 
                    xName="x" 
                    yName="y" 
                    type="Area">
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>`
})
export class AppComponent {
    public data: Object[] = [
        { x: 0, y: 10 },
        { x: 10, y: 30 },
        { x: 20, y: 25 },
        { x: 30, y: 45 },
        { x: 40, y: 35 }
    ];
}

```

## RTL with Tooltip

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService,
    RangeTooltipService // 1. Import the Tooltip service
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    // 2. Add services to providers
    providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            [enableRtl]="true" 
            valueType="DateTime" 
            labelFormat="MMM"
            [tooltip]="tooltipSettings">
            <e-rangenavigator-series-collection>
                <e-rangenavigator-series 
                    [dataSource]="data" 
                    xName="date" 
                    yName="value" 
                    type="Area">
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>`
})
export class AppComponent {
    public tooltipSettings: Object = { enable: true };
    
    public data: Object[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];
}

```

## RTL with Period Selector

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService,
    PeriodSelectorService // 1. Import the Period Selector service
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    // 2. Inject services into providers
    providers: [AreaSeriesService, DateTimeService, PeriodSelectorService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            [enableRtl]="true" 
            valueType="DateTime" 
            labelFormat="MMM yyyy"
            [periodSelectorSettings]="periodSettings">
            <e-rangenavigator-series-collection>
                <e-rangenavigator-series 
                    [dataSource]="data" 
                    xName="date" 
                    yName="value" 
                    type="Area">
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>`
})
export class AppComponent {
    public data: Object[] = [
        { date: new Date(2020, 0, 1), value: 100 },
        { date: new Date(2020, 3, 1), value: 110 },
        { date: new Date(2020, 6, 1), value: 105 },
        { date: new Date(2020, 9, 1), value: 115 },
        { date: new Date(2021, 0, 1), value: 120 },
        { date: new Date(2021, 3, 1), value: 130 }
    ];

    public periodSettings: Object = {
        periods: [
            { intervalType: 'Months', interval: 3, text: '3M' },
            { intervalType: 'Months', interval: 6, text: '6M' },
            { intervalType: 'Years', interval: 1, text: '1Y' },
            { text: 'All' }
        ],
        position: 'Top'
    };
}

```

## Dynamic RTL Switching

Allow users to toggle between LTR and RTL modes:

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <div [dir]="rtlEnabled ? 'rtl' : 'ltr'">
            <div style="margin-bottom: 10px;">
                <button (click)="toggleRtl()">
                    Toggle RTL (Currently: {{ rtlEnabled ? 'RTL' : 'LTR' }})
                </button>
            </div>

            <ejs-rangenavigator 
                id="rangeNavigator"
                [enableRtl]="rtlEnabled"
                valueType="DateTime"
                labelFormat="MMM">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series 
                        [dataSource]="data" 
                        xName="date" 
                        yName="value" 
                        type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    public rtlEnabled: boolean = false;

    public data: Object[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];

    public toggleRtl(): void {
        this.rtlEnabled = !this.rtlEnabled;
    }
}

```

## RTL with Localization

Combine RTL with localized content for complete internationalization:

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <div dir="rtl" lang="ar">
            <h2>مخطط المدى الزمني</h2>
            <p>اختر نطاقًا زمنيًا لعرض البيانات</p>

            <ejs-rangenavigator 
                id="rangeNavigator" 
                [enableRtl]="true" 
                valueType="DateTime" 
                labelFormat="MMM yyyy">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series 
                        [dataSource]="data" 
                        xName="date" 
                        yName="value" 
                        type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    public data: Object[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];
}

```

## Complete RTL Example

```typescript
import { Component } from '@angular/core';
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
        <div dir="rtl" class="App">
            <h2>متصفح نطاق أسعار الأسهم</h2>
            
            <ejs-rangenavigator 
                id="rangeNavigator"
                [enableRtl]="true"
                valueType="DateTime"
                labelFormat="MMM yyyy"
                [value]="initialValue"
                [tooltip]="tooltipSettings"
                [periodSelectorSettings]="periodSettings">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series 
                        [dataSource]="stockData" 
                        xName="date" 
                        yName="price" 
                        type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>

            <p>استخدم أشرطة التمرير لتحديد نطاق التاريخ</p>
        </div>`
})
export class AppComponent {
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

    public initialValue: Date[] = [new Date(2023, 2, 1), new Date(2023, 9, 1)];

    public tooltipSettings: Object = { 
        enable: true, 
        displayMode: 'Always' 
    };

    public periodSettings: Object = {
        periods: [
            { intervalType: 'Months', interval: 1, text: '1M' },
            { intervalType: 'Months', interval: 3, text: '3M' },
            { intervalType: 'Months', interval: 6, text: '6M' },
            { intervalType: 'Years', interval: 1, text: '1Y' },
            { text: 'All' }
        ],
        position: 'Top'
    };
}

```

## RTL with Custom Styling

```typescript
import { Component } from '@angular/core';
import { RangeNavigatorModule, AreaSeriesService, DateTimeService } from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator" 
            [enableRtl]="true" 
            valueType="DateTime"
            [navigatorStyleSettings]="styleSettings"
            [navigatorBorder]="borderSettings">
            <!-- Series configuration here -->
            <e-rangenavigator-series-collection>
                <e-rangenavigator-series [dataSource]="data" xName="x" yName="y" type="Area">
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>`
})
export class AppComponent {
    public data: any[] = [ /* your data */ ];

    // Define the style settings object
    public styleSettings: Object = {
        selectedRegionColor: 'rgba(33, 150, 243, 0.3)',
        thumb: {
            type: 'Circle',
            width: 20,
            height: 20,
            fill: '#2196F3',
            border: { width: 2, color: '#ffffff' }
        }
    };

    // Define the border settings object
    public borderSettings: Object = { 
        width: 2, 
        color: '#2196F3' 
    };
}

```

## Browser Compatibility

RTL support is fully compatible with all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## When to Use RTL

**Enable RTL when:**
- Application targets RTL language users (Arabic, Hebrew, etc.)
- UI needs to match cultural reading patterns
- Compliance with regional accessibility standards

**Key RTL Languages:**
- Arabic (العربية)
- Hebrew (עברית)
- Persian/Farsi (فارسی)
- Urdu (اردو)
- Pashto (پښتو)
- Sindhi (سنڌي)

## Best Practices

1. **Container Direction**: Set `dir="rtl"` on parent container
2. **Language Attribute**: Add `lang` attribute for proper language identification
3. **Test Thoroughly**: Verify all interactions work correctly in RTL mode
4. **Consistent Application**: Apply RTL across entire application, not just components
5. **Text Content**: Ensure all text content is properly localized
6. **Icons and Images**: Consider mirroring directional icons
7. **Testing**: Test with actual RTL language speakers

## Configuration Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| enableRtl | Boolean | false | Enable right-to-left rendering |

## Key Points

1. **Simple Enablement**: Set `enableRtl={true}` to enable RTL mode
2. **Full Support**: All Range Navigator features work in RTL mode
3. **Layout Mirroring**: Entire layout is automatically mirrored
4. **Works with All Features**: Compatible with tooltips, period selector, all value types
5. **Cultural Appropriateness**: Ensures proper display for RTL language users
6. **Accessibility**: Maintains full accessibility in RTL mode
7. **Dynamic Switching**: Can toggle RTL mode at runtime
8. **Browser Support**: Works across all modern browsers
