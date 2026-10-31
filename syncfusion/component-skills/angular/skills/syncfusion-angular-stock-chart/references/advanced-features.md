
# Advanced Features and Optimization

Learn about live data updates, accessibility, internationalization, annotations, and performance optimization for stock charts.

## Table of Contents
- [Advanced Features and Optimization](#advanced-features-and-optimization)
- [Live Data Updates](#live-data-updates)
  - [Live Data with setInterval](#live-data-with-setinterval)
- [Internationalization (i18n)](#internationalization-i18n)
  - [Localized Date Format](#localized-date-format)
  - [Currency Formatting by Locale](#currency-formatting-by-locale)
- [Stripline](#stripline)


## Live Data Updates

Update stock chart with real-time price data from WebSocket or polling API.

### Live Data with setInterval

Poll data every few seconds:

```typescript
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {
  StockChartAllModule,
  StockChartComponent,
  CandleSeriesService,
  DateTimeService,
  TooltipService,
  RangeTooltipService,
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [StockChartAllModule],
  providers: [
    CandleSeriesService,
    DateTimeService,
    TooltipService,
    RangeTooltipService,
  ],
  template: `
      <ejs-stockchart id="chart-container" #chart [primaryXAxis]='primaryXAxis' [periods]='periods' [title]="title">
        <e-stockchart-series-collection>
            <e-stockchart-series 
                [dataSource]='series1' 
                type='Candle' 
                xName='x' 
                high='high' 
                low='low' 
                open='open' 
                close='close' 
                name='India' 
                width=2>
            </e-stockchart-series>
        </e-stockchart-series-collection>
      </ejs-stockchart>
    `,
})
export class AppComponent implements OnInit, OnDestroy {
  public primaryXAxis: any = { valueType: 'DateTime' };
  public periods: any[] = [];
  public series1: Object[] = [];

  public title: string = 'Live Stock Chart';
  public intervalId: any;
  public date: Date = new Date(2019, 8, 16, 10, 0);

  @ViewChild('chart')
  public stock?: StockChartComponent;

  constructor() {
    // Generate initial 60 minutes of data
    for (let j = 0; j < 60; j++) {
      this.date = new Date(2019, 8, 16, 10, j);
      this.series1.push(this.generateData(this.date));
    }
  }

  ngOnInit() {
    this.periods = [
      { intervalType: 'Minutes', interval: 1, text: '1m' },
      { intervalType: 'Minutes', interval: 30, text: '30m' },
      { intervalType: 'Hours', interval: 1, text: '1H', selected: true },
      { intervalType: 'Hours', interval: 2, text: '2H' },
    ];

    this.intervalId = setInterval(() => {
      const chartElement = document.getElementById('chart-container');

      if (!chartElement) {
        clearInterval(this.intervalId);
      } else {
        this.date = new Date(this.date.getTime() + 60000);
        this.series1.push(this.generateData(this.date));

        if (this.series1.length > 100) this.series1.shift();

        if (this.stock) {
          this.series1.push(this.generateData(this.date));
          (this.stock as any).series[0].dataSource = this.series1;
        }
      }
    }, 3000);
  }
  private generateData(date: Date) {
    return {
      x: date,
      high: Math.floor(Math.random() * (100 - 90 + 1) + 90),
      low: Math.floor(Math.random() * (60 - 50 + 1) + 50),
      open: Math.floor(Math.random() * (85 - 65 + 1) + 65),
      close: Math.floor(Math.random() * (85 - 65 + 1) + 65),
    };
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```
## Internationalization (i18n)

Support multiple languages and locales.

### Localized Date Format

```typescript
<ejs-stockchart 
    locale='fr-FR'
    [primaryXAxis]='{ 
        valueType: "DateTime",
        labelFormat: "dd MMMM yyyy"
    }'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' 
            high='high' low='low' open='open' close='close'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Locale Examples:**
- `'en-US'`: English (United States)
- `'fr-FR'`: French (France)
- `'de-DE'`: German (Germany)
- `'ja-JP'`: Japanese (Japan)
- `'zh-CN'`: Chinese (Simplified)

### Currency Formatting by Locale

```typescript
@Component({
    template: `
        <select [(ngModel)]="selectedLocale" (change)="onLocaleChange()">
            <option value="en-US">English (USD)</option>
            <option value="fr-FR">French (EUR)</option>
            <option value="ja-JP">Japanese (JPY)</option>
        </select>
        <ejs-stockchart [primaryYAxis]='yAxisConfig'>
            <!-- Series -->
        </ejs-stockchart>
    `
})
export class I18nStockComponent {
    selectedLocale = 'en-US';
    yAxisConfig: any;

    currencySymbols: { [key: string]: string } = {
        'en-US': '$',
        'fr-FR': '€',
        'ja-JP': '¥'
    };

    onLocaleChange() {
        const symbol = this.currencySymbols[this.selectedLocale];
        this.yAxisConfig = {
            labelFormat: `${symbol}{value}.00`
        };
    }
}
```

## Stripline

```typescript
<ejs-stockchart [primaryXAxis]='primaryXAxis'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' 
            high='high' low='low' open='open' close='close'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>

this.primaryXAxis = {
           valueType: 'DateTime',
            stripLines: [{ start: 320, sizeType: 'Pixel', size: 1, color: 'green', dashArray: '10,5' },
        { start: 380, sizeType: 'Pixel', size: 1, color: 'red', dashArray: '10,5' }]
};
```

This implements live updates, accessibility, internationalization, and performance optimization in one component.

