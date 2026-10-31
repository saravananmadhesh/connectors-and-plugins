# Common Patterns Reference for Syncfusion Angular Chart

## Table of Contents

- [Introduction](#introduction)
- [Trend Analysis Dashboard](#trend-analysis-dashboard)
- [Financial Stock Chart](#financial-stock-chart)
- [Real-Time Monitoring Dashboard](#real-time-monitoring-dashboard)
- [Multi-Axis Comparison Charts](#multi-axis-comparison-charts)
- [Drill-Down Charts](#drill-down-charts)
- [Responsive Dashboard Layouts](#responsive-dashboard-layouts)
- [Performance Comparison Charts](#performance-comparison-charts)
- [Time-Series Analysis](#time-series-analysis)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)

## Introduction

This reference provides complete, production-ready patterns for common chart implementations. Each pattern includes full TypeScript code, styling, data handling, and integration guidance for building sophisticated data visualization solutions with Syncfusion Angular Charts.

## Trend Analysis Dashboard

Create a comprehensive dashboard showing trends across multiple metrics with comparisons and forecasts.

### Implementation

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { ChartModule, LineSeriesService, ColumnSeriesService, CategoryService, LegendService, TooltipService, DataLabelService, ZoomService, ScrollBarService, DateTimeService, AreaSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, SplineSeriesService } from '@syncfusion/ej2-angular-charts';
import { ILoadedEventArgs, IPointRenderEventArgs } from '@syncfusion/ej2-charts';

@Component({
  selector: 'app-trend-dashboard',
  standalone: true,
  imports: [ChartModule],
  providers: [
    LineSeriesService, ColumnSeriesService, CategoryService, LegendService, TooltipService, DataLabelService, ZoomService, ScrollBarService, DateTimeService, AreaSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, SplineSeriesService
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h2>Sales Trend Analysis - 2024</h2>
        <div class="controls">
          <select (change)="changeTimeRange($event.target.value)">
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button (click)="exportDashboard()">Export Report</button>
        </div>
      </div>

      <div class="kpi-cards">
        <div class="kpi-card">
          <h3>Total Sales</h3>
          <p class="value">{{ totalSales | currency }}</p>
          <span class="change positive">+15.3%</span>
        </div>
        <div class="kpi-card">
          <h3>Average</h3>
          <p class="value">{{ averageSales | currency }}</p>
          <span class="change">+8.2%</span>
        </div>
        <div class="kpi-card">
          <h3>Best Month</h3>
          <p class="value">{{ bestMonth }}</p>
          <span class="sub-text">{{ bestMonthValue | currency }}</span>
        </div>
      </div>

      <div class="chart-grid">
        <div class="chart-panel main-chart">
          <ejs-chart #mainChart
            [primaryXAxis]='primaryXAxis'
            [primaryYAxis]='primaryYAxis'
            [title]='chartTitle'
            [tooltip]='tooltip'
            [legendSettings]='legendSettings'
            [crosshair]='crosshair'
            (pointRender)='pointRender($event)'
            (loaded)='onChartLoaded($event)'>
            <e-series-collection>
              <e-series 
                [dataSource]='actualData' 
                xName='month' 
                yName='sales'
                name='Actual Sales'
                type='Column'
                [marker]='marker'
                fill='#4CAF50'>
              </e-series>
              <e-series 
                [dataSource]='targetData' 
                xName='month' 
                yName='target'
                name='Target'
                type='Line'
                width='3'
                fill='#FF5722'
                [marker]='targetMarker'>
              </e-series>
              <e-series 
                [dataSource]='forecastData' 
                xName='month' 
                yName='forecast'
                name='Forecast'
                type='Line'
                width='2'
                dashArray='5,5'
                fill='#2196F3'
                opacity='0.7'>
              </e-series>
            </e-series-collection>
          </ejs-chart>
        </div>

        <div class="chart-panel">
          <ejs-chart #growthChart
            [primaryXAxis]='xAxis2'
            [primaryYAxis]='yAxis2'
            [title]='"Month-over-Month Growth"'
            [tooltip]='tooltip'>
            <e-series-collection>
              <e-series 
                [dataSource]='growthData' 
                xName='month' 
                yName='growth'
                type='Area'
                fill='#9C27B0'
                opacity='0.6'
                [border]='areaBorder'>
              </e-series>
            </e-series-collection>
          </ejs-chart>
        </div>

        <div class="chart-panel">
          <ejs-chart #categoryChart
            [primaryXAxis]='categoryXAxis'
            [primaryYAxis]='categoryYAxis'
            [title]='"Sales by Category"'
            [tooltip]='tooltip'
            [legendSettings]='legendSettings'>
            <e-series-collection>
              <e-series 
                [dataSource]='categoryData' 
                xName='category' 
                yName='value'
                type='StackingColumn'
                name='Q1'>
              </e-series>
              <e-series 
                [dataSource]='categoryData' 
                xName='category' 
                yName='value2'
                type='StackingColumn'
                name='Q2'>
              </e-series>
              <e-series 
                [dataSource]='categoryData' 
                xName='category' 
                yName='value3'
                type='StackingColumn'
                name='Q3'>
              </e-series>
            </e-series-collection>
          </ejs-chart>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      background: #f5f5f5;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .controls select, .controls button {
      margin-left: 10px;
      padding: 8px 16px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }

    .kpi-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .kpi-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .kpi-card h3 {
      margin: 0 0 10px 0;
      color: #666;
      font-size: 14px;
    }

    .kpi-card .value {
      font-size: 32px;
      font-weight: bold;
      margin: 10px 0;
      color: #333;
    }

    .kpi-card .change {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 14px;
    }

    .kpi-card .change.positive {
      background: #E8F5E9;
      color: #4CAF50;
    }

    .chart-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }

    .chart-panel {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .main-chart {
      grid-column: 1 / -1;
    }

    @media (max-width: 768px) {
      .chart-grid {
        grid-template-columns: 1fr;
      }
      .main-chart {
        grid-column: 1;
      }
    }
  `]
})
export class TrendDashboardComponent implements OnInit {
  @ViewChild('mainChart') mainChart: ChartComponent;
  @ViewChild('growthChart') growthChart: ChartComponent;
  @ViewChild('categoryChart') categoryChart: ChartComponent;

  public actualData: Object[] = [];
  public targetData: Object[] = [];
  public forecastData: Object[] = [];
  public growthData: Object[] = [];
  public categoryData: Object[] = [];

  public totalSales: number = 0;
  public averageSales: number = 0;
  public bestMonth: string = '';
  public bestMonthValue: number = 0;

  public chartTitle: string = 'Monthly Sales Performance';

  public primaryXAxis: Object = {
    valueType: 'Category',
    title: 'Month',
    labelRotation: -45,
    majorGridLines: { width: 0 }
  };

  public primaryYAxis: Object = {
    title: 'Sales ($)',
    labelFormat: '${value}K',
    majorGridLines: { width: 1, color: '#E0E0E0' }
  };

  public xAxis2: Object = { valueType: 'Category' };
  public yAxis2: Object = { labelFormat: '{value}%' };

  public categoryXAxis: Object = { valueType: 'Category' };
  public categoryYAxis: Object = { labelFormat: '${value}K' };

  public tooltip: Object = {
    enable: true,
    shared: true,
    format: '<b>${point.x}</b><br/>${series.name}: <b>${point.y}</b>'
  };

  public legendSettings: Object = {
    visible: true,
    position: 'Bottom'
  };

  public crosshair: Object = {
    enable: true,
    lineType: 'Vertical'
  };

  public marker: Object = {
    visible: true,
    height: 8,
    width: 8,
    dataLabel: {
      visible: true,
      position: 'Top',
      font: { fontWeight: '600', color: '#ffffff' }
    }
  };

  public targetMarker: Object = {
    visible: true,
    shape: 'Diamond',
    height: 10,
    width: 10
  };

  public areaBorder: Object = {
    width: 2,
    color: '#9C27B0'
  };

  ngOnInit(): void {
    this.loadData();
    this.calculateKPIs();
  }

  loadData(): void {
    // Actual sales data
    this.actualData = [
      { month: 'Jan', sales: 35 },
      { month: 'Feb', sales: 28 },
      { month: 'Mar', sales: 34 },
      { month: 'Apr', sales: 32 },
      { month: 'May', sales: 40 },
      { month: 'Jun', sales: 45 },
      { month: 'Jul', sales: 42 },
      { month: 'Aug', sales: 48 },
      { month: 'Sep', sales: 50 },
      { month: 'Oct', sales: 46 },
      { month: 'Nov', sales: 52 },
      { month: 'Dec', sales: 55 }
    ];

    // Target data
    this.targetData = [
      { month: 'Jan', target: 38 },
      { month: 'Feb', target: 30 },
      { month: 'Mar', target: 36 },
      { month: 'Apr', target: 34 },
      { month: 'May', target: 38 },
      { month: 'Jun', target: 42 },
      { month: 'Jul', target: 45 },
      { month: 'Aug', target: 47 },
      { month: 'Sep', target: 48 },
      { month: 'Oct', target: 50 },
      { month: 'Nov', target: 51 },
      { month: 'Dec', target: 53 }
    ];

    // Forecast (next 3 months)
    this.forecastData = [
      { month: 'Oct', forecast: 46 },
      { month: 'Nov', forecast: 52 },
      { month: 'Dec', forecast: 55 },
      { month: 'Jan 2025', forecast: 58 },
      { month: 'Feb 2025', forecast: 60 },
      { month: 'Mar 2025', forecast: 62 }
    ];

    // Growth data
    this.growthData = this.calculateGrowth(this.actualData);

    // Category data
    this.categoryData = [
      { category: 'Electronics', value: 120, value2: 135, value3: 150 },
      { category: 'Clothing', value: 80, value2: 85, value3: 90 },
      { category: 'Food', value: 60, value2: 65, value3: 70 },
      { category: 'Books', value: 45, value2: 50, value3: 48 }
    ];
  }

  calculateGrowth(data: any[]): any[] {
    return data.map((item, index) => {
      if (index === 0) return { month: item.month, growth: 0 };
      let prevValue = data[index - 1].sales;
      let growth = ((item.sales - prevValue) / prevValue) * 100;
      return { month: item.month, growth: growth };
    });
  }

  calculateKPIs(): void {
    this.totalSales = this.actualData.reduce((sum, item: any) => sum + item.sales, 0);
    this.averageSales = this.totalSales / this.actualData.length;
    
    let maxItem = this.actualData.reduce((max: any, item: any) => 
      item.sales > max.sales ? item : max
    );
    this.bestMonth = maxItem.month;
    this.bestMonthValue = maxItem.sales;
  }

  pointRender(args: IPointRenderEventArgs): void {
    // Highlight points below target
    if (args.series.name === 'Actual Sales') {
      let target = this.targetData.find((t: any) => t.month === args.point.x);
      if (target && args.point.y < target.target) {
        args.fill = '#FF9800';  // Orange for below target
      }
    }
  }

  changeTimeRange(range: string): void {
    // Implement time range change logic
    console.log('Changing to:', range);
  }

  onChartLoaded(args: ILoadedEventArgs): void {
    console.log('Chart loaded successfully');
  }

  exportDashboard(): void {
    this.mainChart.export('PDF', 'TrendAnalysis', 'Landscape', [
      this.mainChart,
      this.growthChart,
      this.categoryChart
    ]);
  }
}
```

## Financial Stock Chart

Implement a professional stock chart with candlestick patterns and technical indicators.

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { ChartModule, LineSeriesService, ColumnSeriesService, CategoryService, LegendService, TooltipService, DataLabelService, ZoomService, ScrollBarService, DateTimeService, AreaSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, SplineSeriesService } from '@syncfusion/ej2-angular-charts';
import { ILoadedEventArgs, IPointRenderEventArgs } from '@syncfusion/ej2-charts';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [
    LineSeriesService, ColumnSeriesService, CategoryService, LegendService, TooltipService, DataLabelService, ZoomService, ScrollBarService, DateTimeService, AreaSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, SplineSeriesService
  ],
  template: `
    <div class="stock-container">
      <div class="stock-header">
        <div class="stock-info">
          <h2>{{ stockSymbol }}</h2>
          <div class="price">
            <span class="current">\${{ currentPrice }}</span>
            <span [class]="priceChange >= 0 ? 'positive' : 'negative'">
              {{ priceChange >= 0 ? '+' : '' }}{{ priceChange.toFixed(2) }}
              ({{ priceChangePercent.toFixed(2) }}%)
            </span>
          </div>
        </div>
        <div class="controls">
          <button *ngFor="let range of timeRanges" 
                  (click)="changeRange(range)"
                  [class.active]="selectedRange === range">
            {{ range }}
          </button>
        </div>
      </div>

      <ejs-chart #stockChart
        [primaryXAxis]='primaryXAxis'
        [primaryYAxis]='primaryYAxis'
        [tooltip]='tooltip'
        [crosshair]='crosshair'
        [zoomSettings]='zoomSettings'
        [legendSettings]='legendSettings'
        [height]='chartHeight'
        (loaded)='onChartLoaded($event)'>
        
        <e-series-collection>
          <!-- Candlestick Series -->
          <e-series 
            [dataSource]='stockData' 
            xName='date' 
            high='high'
            low='low'
            open='open'
            close='close'
            type='Candle'
            name='{{ stockSymbol }}'
            bearFillColor='#F44336'
            bullFillColor='#4CAF50'>
          </e-series>

          <!-- Volume -->
          <e-series 
            [dataSource]='stockData' 
            xName='date' 
            yName='volume'
            type='Column'
            name='Volume'
            yAxisName='volumeAxis'
            opacity='0.5'
            fill='#9E9E9E'>
          </e-series>

          <!-- Moving Average 20 -->
          <e-series 
            [dataSource]='ma20Data' 
            xName='date' 
            yName='value'
            type='Line'
            name='MA(20)'
            width='2'
            fill='#2196F3'
            dashArray='5,5'>
          </e-series>

          <!-- Moving Average 50 -->
          <e-series 
            [dataSource]='ma50Data' 
            xName='date' 
            yName='value'
            type='Line'
            name='MA(50)'
            width='2'
            fill='#FF9800'>
          </e-series>
        </e-series-collection>

        <e-axes>
          <e-axis 
            name='volumeAxis'
            opposedPosition='true'
            majorGridLines='{ width: 0 }'
            labelFormat='{value}M'
            minimum='0'
            maximum='1000'
            interval='250'>
          </e-axis>
        </e-axes>
      </ejs-chart>

      <div class="indicators">
        <div class="indicator">
          <span>Open:</span> \${{ latestData.open }}
        </div>
        <div class="indicator">
          <span>High:</span> \${{ latestData.high }}
        </div>
        <div class="indicator">
          <span>Low:</span> \${{ latestData.low }}
        </div>
        <div class="indicator">
          <span>Close:</span> \${{ latestData.close }}
        </div>
        <div class="indicator">
          <span>Volume:</span> {{ latestData.volume }}M
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stock-container {
      padding: 20px;
      background: #fff;
    }

    .stock-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .stock-info h2 {
      margin: 0;
      font-size: 24px;
    }

    .price {
      margin-top: 10px;
    }

    .price .current {
      font-size: 32px;
      font-weight: bold;
      margin-right: 10px;
    }

    .price .positive {
      color: #4CAF50;
    }

    .price .negative {
      color: #F44336;
    }

    .controls button {
      margin-left: 5px;
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .controls button.active {
      background: #2196F3;
      color: white;
      border-color: #2196F3;
    }

    .indicators {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .indicator span {
      font-weight: bold;
      margin-right: 5px;
    }
  `]
})
export class StockChartComponent implements OnInit {
  @ViewChild('stockChart') stockChart: ChartComponent;

  public stockSymbol: string = 'AAPL';
  public currentPrice: number = 175.50;
  public priceChange: number = 2.35;
  public priceChangePercent: number = 1.35;
  public chartHeight: string = '500px';

  public stockData: Object[] = [];
  public ma20Data: Object[] = [];
  public ma50Data: Object[] = [];
  public latestData: any = {};

  public timeRanges: string[] = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y'];
  public selectedRange: string = '1M';

  public primaryXAxis: Object = {
    valueType: 'DateTime',
    majorGridLines: { width: 0 },
    crosshairTooltip: { enable: true }
  };

  public primaryYAxis: Object = {
    title: 'Price ($)',
    labelFormat: '${value}',
    opposedPosition: true,
    lineStyle: { width: 0 }
  };

  public tooltip: Object = {
    enable: true,
    shared: true
  };

  public crosshair: Object = {
    enable: true,
    lineType: 'Both'
  };

  public zoomSettings: Object = {
    enableSelectionZooming: true,
    enablePan: true,
    enableMouseWheelZooming: true,
    mode: 'X'
  };

  public legendSettings: Object = {
    visible: true
  };

  ngOnInit(): void {
    this.loadStockData();
    this.calculateMovingAverages();
  }

  loadStockData(): void {
    // Generate sample stock data
    const startDate = new Date(2024, 0, 1);
    const dataPoints = 90;
    
    let basePrice = 170;
    this.stockData = [];

    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      const open = basePrice + (Math.random() * 10 - 5);
      const close = open + (Math.random() * 8 - 4);
      const high = Math.max(open, close) + Math.random() * 3;
      const low = Math.min(open, close) - Math.random() * 3;
      const volume = Math.floor(Math.random() * 500 + 200);

      this.stockData.push({
        date: date,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: volume
      });

      basePrice = close;
    }

    this.latestData = this.stockData[this.stockData.length - 1];
    this.currentPrice = this.latestData.close;
  }

  calculateMovingAverages(): void {
    this.ma20Data = this.calculateMA(this.stockData, 20);
    this.ma50Data = this.calculateMA(this.stockData, 50);
  }

  calculateMA(data: any[], period: number): any[] {
    const ma = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1)
        .reduce((acc, item) => acc + item.close, 0);
      ma.push({
        date: data[i].date,
        value: parseFloat((sum / period).toFixed(2))
      });
    }
    return ma;
  }

  changeRange(range: string): void {
    this.selectedRange = range;
    // Reload data based on range
    this.loadStockData();
    this.calculateMovingAverages();
  }

  onChartLoaded(args: any): void {
    console.log('Stock chart loaded');
  }
}
```

## Real-Time Monitoring Dashboard

Create a live dashboard that updates with real-time data streams.

```typescript
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { interval, Subscription } from 'rxjs';
import { ChartModule, LineSeriesService, ColumnSeriesService, CategoryService, LegendService, TooltipService, DataLabelService, ZoomService, ScrollBarService, DateTimeService, AreaSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, SplineSeriesService } from '@syncfusion/ej2-angular-charts';
import { ILoadedEventArgs, IPointRenderEventArgs } from '@syncfusion/ej2-charts';

@Component({
  selector: 'app-realtime-monitor',
  standalone: true,
  imports: [ChartModule],
  providers: [
    LineSeriesService, ColumnSeriesService, CategoryService, LegendService, TooltipService, DataLabelService, ZoomService, ScrollBarService, DateTimeService, AreaSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, SplineSeriesService
  ],
  template: `
    <div class="monitor-container">
      <div class="monitor-header">
        <h2>System Performance Monitor</h2>
        <div class="status">
          <span class="indicator" [class.active]="isLive"></span>
          <span>{{ isLive ? 'LIVE' : 'PAUSED' }}</span>
          <button (click)="toggleLive()">
            {{ isLive ? 'Pause' : 'Resume' }}
          </button>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <h3>CPU Usage</h3>
          <ejs-chart #cpuChart
            [primaryXAxis]='xAxis'
            [primaryYAxis]='cpuYAxis'
            [height]='"200px"'
            [chartArea]='chartArea'>
            <e-series-collection>
              <e-series 
                [dataSource]='cpuData' 
                xName='time' 
                yName='value'
                type='SplineArea'
                fill='#FF6B6B'
                opacity='0.6'
                [animation]='animation'>
              </e-series>
            </e-series-collection>
          </ejs-chart>
          <div class="current-value">{{ currentCPU }}%</div>
        </div>

        <div class="metric-card">
          <h3>Memory Usage</h3>
          <ejs-chart #memoryChart
            [primaryXAxis]='xAxis'
            [primaryYAxis]='memoryYAxis'
            [height]='"200px"'
            [chartArea]='chartArea'>
            <e-series-collection>
              <e-series 
                [dataSource]='memoryData' 
                xName='time' 
                yName='value'
                type='SplineArea'
                fill='#4ECDC4'
                opacity='0.6'
                [animation]='animation'>
              </e-series>
            </e-series-collection>
          </ejs-chart>
          <div class="current-value">{{ currentMemory }}%</div>
        </div>

        <div class="metric-card">
          <h3>Network Traffic</h3>
          <ejs-chart #networkChart
            [primaryXAxis]='xAxis'
            [primaryYAxis]='networkYAxis'
            [height]='"200px"'
            [chartArea]='chartArea'>
            <e-series-collection>
              <e-series 
                [dataSource]='networkData' 
                xName='time' 
                yName='value'
                type='SplineArea'
                fill='#95E1D3'
                opacity='0.6'
                [animation]='animation'>
              </e-series>
            </e-series-collection>
          </ejs-chart>
          <div class="current-value">{{ currentNetwork }} MB/s</div>
        </div>

        <div class="metric-card">
          <h3>Disk I/O</h3>
          <ejs-chart #diskChart
            [primaryXAxis]='xAxis'
            [primaryYAxis]='diskYAxis'
            [height]='"200px"'
            [chartArea]='chartArea'>
            <e-series-collection>
              <e-series 
                [dataSource]='diskData' 
                xName='time' 
                yName='value'
                type='SplineArea'
                fill='#F38181'
                opacity='0.6'
                [animation]='animation'>
              </e-series>
            </e-series-collection>
          </ejs-chart>
          <div class="current-value">{{ currentDisk }} MB/s</div>
        </div>
      </div>

      <div class="alerts-panel">
        <h3>Recent Alerts</h3>
        <div class="alert" *ngFor="let alert of alerts" [class]="alert.severity">
          <span class="time">{{ alert.time | date:'HH:mm:ss' }}</span>
          <span class="message">{{ alert.message }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .monitor-container {
      padding: 20px;
      background: #1a1a1a;
      color: #fff;
      min-height: 100vh;
    }

    .monitor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #666;
    }

    .indicator.active {
      background: #4CAF50;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .metric-card {
      background: #2a2a2a;
      padding: 20px;
      border-radius: 8px;
      position: relative;
    }

    .metric-card h3 {
      margin: 0 0 15px 0;
      font-size: 14px;
      color: #888;
    }

    .current-value {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 24px;
      font-weight: bold;
    }

    .alerts-panel {
      background: #2a2a2a;
      padding: 20px;
      border-radius: 8px;
    }

    .alert {
      padding: 10px;
      margin: 10px 0;
      border-left: 4px solid;
      background: #333;
    }

    .alert.warning {
      border-color: #FFC107;
    }

    .alert.error {
      border-color: #F44336;
    }

    .alert .time {
      margin-right: 10px;
      color: #888;
    }
  `]
})
export class RealtimeMonitorComponent implements OnInit, OnDestroy {
  @ViewChild('cpuChart') cpuChart: ChartComponent;
  @ViewChild('memoryChart') memoryChart: ChartComponent;
  @ViewChild('networkChart') networkChart: ChartComponent;
  @ViewChild('diskChart') diskChart: ChartComponent;

  public isLive: boolean = true;
  private dataSubscription: Subscription;
  private maxDataPoints: number = 30;

  public cpuData: Object[] = [];
  public memoryData: Object[] = [];
  public networkData: Object[] = [];
  public diskData: Object[] = [];

  public currentCPU: number = 0;
  public currentMemory: number = 0;
  public currentNetwork: number = 0;
  public currentDisk: number = 0;

  public alerts: any[] = [];

  public xAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'HH:mm:ss',
    majorGridLines: { width: 0 },
    visible: false
  };

  public cpuYAxis: Object = {
    minimum: 0,
    maximum: 100,
    interval: 25,
    labelFormat: '{value}%',
    majorGridLines: { width: 1, color: '#333' }
  };

  public memoryYAxis: Object = {
    minimum: 0,
    maximum: 100,
    interval: 25,
    labelFormat: '{value}%',
    majorGridLines: { width: 1, color: '#333' }
  };

  public networkYAxis: Object = {
    minimum: 0,
    maximum: 100,
    interval: 25,
    labelFormat: '{value}',
    majorGridLines: { width: 1, color: '#333' }
  };

  public diskYAxis: Object = {
    minimum: 0,
    maximum: 100,
    interval: 25,
    labelFormat: '{value}',
    majorGridLines: { width: 1, color: '#333' }
  };

  public chartArea: Object = {
    border: { width: 0 },
    background: 'transparent'
  };

  public animation: Object = {
    enable: false
  };

  ngOnInit(): void {
    this.initializeData();
    this.startDataStream();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  initializeData(): void {
    const now = new Date();
    for (let i = this.maxDataPoints - 1; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 1000);
      this.cpuData.push({ time: time, value: 0 });
      this.memoryData.push({ time: time, value: 0 });
      this.networkData.push({ time: time, value: 0 });
      this.diskData.push({ time: time, value: 0 });
    }
  }

  startDataStream(): void {
    this.dataSubscription = interval(1000).subscribe(() => {
      if (this.isLive) {
        this.updateData();
      }
    });
  }

  updateData(): void {
    const now = new Date();
    
    // Generate random data
    this.currentCPU = parseFloat((Math.random() * 100).toFixed(1));
    this.currentMemory = parseFloat((Math.random() * 100).toFixed(1));
    this.currentNetwork = parseFloat((Math.random() * 100).toFixed(1));
    this.currentDisk = parseFloat((Math.random() * 100).toFixed(1));

    // Add new data points
    this.cpuData.push({ time: now, value: this.currentCPU });
    this.memoryData.push({ time: now, value: this.currentMemory });
    this.networkData.push({ time: now, value: this.currentNetwork });
    this.diskData.push({ time: now, value: this.currentDisk });

    // Remove old data points
    if (this.cpuData.length > this.maxDataPoints) {
      this.cpuData.shift();
      this.memoryData.shift();
      this.networkData.shift();
      this.diskData.shift();
    }

    // Check thresholds and create alerts
    this.checkThresholds();

    // Update charts
    this.refreshCharts();
  }

  checkThresholds(): void {
    if (this.currentCPU > 80) {
      this.addAlert('error', 'High CPU usage detected: ' + this.currentCPU + '%');
    }
    if (this.currentMemory > 85) {
      this.addAlert('warning', 'High memory usage: ' + this.currentMemory + '%');
    }
  }

  addAlert(severity: string, message: string): void {
    this.alerts.unshift({
      time: new Date(),
      severity: severity,
      message: message
    });
    
    // Keep only last 5 alerts
    if (this.alerts.length > 5) {
      this.alerts.pop();
    }
  }

  refreshCharts(): void {
    if (this.cpuChart) this.cpuChart.refresh();
    if (this.memoryChart) this.memoryChart.refresh();
    if (this.networkChart) this.networkChart.refresh();
    if (this.diskChart) this.diskChart.refresh();
  }

  toggleLive(): void {
    this.isLive = !this.isLive;
  }
}
```

## Multi-Axis Comparison Charts

Compare different metrics with different scales on the same chart.

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, ColumnSeriesService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-axes>
            <e-axis rowIndex=1 name='yAxis1' opposedPosition='true' title='Temperature (Celsius)' [majorGridLines]='majorGridLines' labelFormat='{value}°C'
                   [minimum]='24' [maximum]='36' [interval]='2' [lineStyle]='lineStyle'>
            </e-axis>
        </e-axes>
        <e-rows>
             <e-row height=50%></e-row>
             <e-row height=50%></e-row>
        </e-rows>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Germany'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y1' name='Japan' yAxisName='yAxis1' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public majorGridLines?: Object;
    public primaryYAxis?: Object;
    public lineStyle?: Object;
    public marker?: Object;
    public rows?: Object;
    ngOnInit(): void {
        this.chartData = [
                { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
                { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
                { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
                { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }
        ];
        this.primaryXAxis = {
            title: 'Months',
            valueType: 'Category',
            interval: 1
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 90, interval: 20,
            lineStyle: { width: 0 },
            title: 'Temperature (Fahrenheit)',
            labelFormat: '{value}°F'
        };
        this.majorGridLines = { width: 0};
        this.lineStyle = { width: 0};
        this.marker = {
            visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' }
        }
        this.title = 'Weather Condition';
    }

}
```

## Best Practices

### 1. Performance Optimization

```typescript
// Use Canvas for large datasets
<ejs-chart [enableCanvas]='true' *ngIf="dataPoints > 5000">
```

### 2. Memory Management

```typescript
ngOnDestroy() {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  if (this.chart) {
    this.chart.destroy();
  }
}
```

### 3. Responsive Design

```typescript
@HostListener('window:resize')
onResize() {
  if (this.chart) {
    this.chart.refresh();
  }
}
```

## Troubleshooting

### Issue: Chart not updating with new data
**Solution:** Call `refresh()` after data changes or use `setData()` method.

### Issue: Performance degradation
**Solution:** Enable canvas rendering, reduce animations, implement data virtualization.

### Issue: Legend items not interactive
**Solution:** Ensure LegendService is provided in module/component.

## Migration Guide

### From EJ1 to EJ2

**Property Changes:**
```typescript
// EJ1
<ej-chart [series]="[{ points: data }]">

// EJ2
<ejs-chart>
  <e-series-collection>
    <e-series [dataSource]='data'>
  </e-series-collection>
</ejs-chart>
```

**Event Changes:**
```typescript
// EJ1
(load)="chartLoad($event)"

// EJ2
(loaded)="chartLoaded($event)"
```

---

## Critical: Data Label API Hierarchy Pattern

### ⚠️ Common Mistake to Avoid

**INCORRECT:** Creating `dataLabel` as independent series property
```typescript
❌ WRONG
public dataLabelSettings = {
  visible: true,
  position: 'Top',
  format: '${point.y}K'
};

// Template:
<e-series [dataLabel]="dataLabelSettings"></e-series> <!-- ❌ Property doesn't exist -->
```

**CORRECT:** `dataLabel` must be NESTED inside `marker`
```typescript
✅ CORRECT
public markerSettings = {
  visible: false,  // Hide marker dots
  dataLabel: {     // ← NESTED INSIDE MARKER
    visible: true,
    position: 'Top',
    format: '${point.y}K',
    font: { size: '12px', fontWeight: '600' }
  }
};

// Template:
<e-series [marker]="markerSettings"></e-series> <!-- ✅ Correct binding -->
```

### API Hierarchy Structure

```
marker (root property on series)
  ├─ visible: boolean (show/hide marker dot)
  ├─ width: number
  ├─ height: number
  ├─ shape: string
  ├─ fill: string
  ├─ border: { ... }
  └─ dataLabel (NESTED OBJECT) ← Key point
      ├─ visible: boolean
      ├─ position: string
      ├─ format: string
      ├─ font: { size, color, fontWeight }
      └─ alignment: string
```

### Code Example: Stacked Column Chart

```typescript
import { MarkerSettingsModel } from '@syncfusion/ej2-angular-charts';

export class StackedColumnChartComponent {
  // ✅ CORRECT STRUCTURE
  public markerSettings: MarkerSettingsModel = {
    visible: false,                    // Don't show marker dots
    dataLabel: {                       // ← NESTED
      visible: true,
      position: 'Top',
      format: '${point.y}K',
      font: {
        size: '12px',
        fontWeight: '600',
        color: '#1f2937'
      }
    }
  };
}
```

```html
<ejs-chart>
  <e-series-collection>
    <e-series
      [dataSource]="quarterlyData"
      type="StackingColumn"
      xName="month"
      yName="q1"
      [marker]="markerSettings">  <!-- ✅ Bind [marker] not [dataLabel] -->
    </e-series>
  </e-series-collection>
</ejs-chart>
```

### Verification Checklist

- [ ] Property name is `marker`, not `dataLabel`
- [ ] `dataLabel` is nested INSIDE `marker` object
- [ ] Template uses `[marker]="markerSettings"` binding
- [ ] NOT using `[dataLabel]` binding
- [ ] Refer to `chart-elements.md` for complete examples

### Key Lesson

**Always read complete code examples from skill file, not just keyword search.** Syncfusion's API hierarchy is:
- `marker` = root property
- `dataLabel` = nested configuration
- `[marker]="..."` = template binding

This pattern applies to many Syncfusion components where nested objects contain feature-specific settings.

---
