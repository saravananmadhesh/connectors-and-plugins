# Advanced Scenarios

## Table of Contents
- [Dynamic Data Updates](#dynamic-data-updates)
- [Data Grouping](#data-grouping)
- [Empty Point Handling](#empty-point-handling)
- [Real-Time Data Binding](#real-time-data-binding)
- [Common Patterns](#common-patterns)
- [Performance Optimization](#performance-optimization)
- [EJ1 to EJ2 Migration](#ej1-to-ej2-migration)

## Dynamic Data Updates

### Update Chart Data at Runtime

Refresh chart with new data without recreating the component:

```typescript
@Component({
  template: `
    <div>
      <button (click)="updateData()">Refresh Data</button>
      <button (click)="appendData()">Add New Data</button>
      
      <ejs-accumulationchart id="container">
        <e-accumulation-series-collection>
          <e-accumulation-series
            [dataSource]="chartData"
            xName="x"
            yName="y"
            type="Pie">
          </e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>
    </div>
  `
})
export class DynamicUpdateComponent {
  chartData = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];

  updateData() {
    // Replace entire dataset
    this.chartData = [
      { x: 'A', y: 45 },
      { x: 'B', y: 35 },
      { x: 'C', y: 20 }
    ];
  }

  appendData() {
    // Add new data point
    this.chartData = [...this.chartData, { x: 'D', y: 15 }];
  }
}
```

### Incremental Data Updates

For performance optimization with large datasets:

```typescript
@Component({
  template: `
    <ejs-accumulationchart 
      #chart
      id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="chartData"
          xName="x"
          yName="y"
          type="Pie">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class IncrementalUpdateComponent implements ViewChild {
  @ViewChild('chart') chart!: any;
  chartData: any[] = [];

  ngAfterViewInit() {
    // Initial data load
    this.loadInitialData();
    
    // Subscribe to updates
    setInterval(() => this.fetchUpdates(), 5000);
  }

  loadInitialData() {
    this.chartData = [
      { x: 'Q1', y: 150000 },
      { x: 'Q2', y: 180000 }
    ];
  }

  fetchUpdates() {
    // Fetch new data and update chart
    const newData = [
      { x: 'Q3', y: 210000 },
      { x: 'Q4', y: 240000 }
    ];
    
    // Instead of replacing, merge with existing
    this.chartData = [...this.chartData, ...newData];
  }
}
```

### addPoint() and removePoint() Methods
The AccumulationChart series supports point-level data operations that update the chart without re-rendering the entire component.

#### addPoint()
Adds a new data point to the series.

**API Reference:**
- `series[0].addPoint(point: Object, animationDuration?: number)`

**Example Usage:**
```typescript
// Add a data point dynamically
(this.chart).series[0].addPoint({ x: 'New', y: 25 });
```

#### removePoint()
Removes an existing data point from the series by index.

**API Reference:**
- `series[0].removePoint(index: number, animationDuration?: number)`

**Example Usage:**
```typescript
// Remove the second data point
(this.chart).series[0].removePoint(1);
```

## Data Grouping

### Group Data by Category

Aggregate data points into groups:

```typescript
@Component({
  template: `
    <ejs-accumulationchart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="groupedData"
          xName="category"
          yName="total"
          type="Doughnut">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class DataGroupingComponent {
  rawData = [
    { category: 'Electronics', subcategory: 'Phones', sales: 50000 },
    { category: 'Electronics', subcategory: 'Tablets', sales: 35000 },
    { category: 'Clothing', subcategory: 'Shirts', sales: 28000 },
    { category: 'Clothing', subcategory: 'Pants', sales: 32000 },
    { category: 'Home', subcategory: 'Furniture', sales: 45000 },
    { category: 'Home', subcategory: 'Decor', sales: 22000 }
  ];

  groupedData: any[] = [];

  ngOnInit() {
    this.groupData();
  }

  groupData() {
    const grouped: { [key: string]: number } = {};

    this.rawData.forEach(item => {
      if (grouped[item.category]) {
        grouped[item.category] += item.sales;
      } else {
        grouped[item.category] = item.sales;
      }
    });

    this.groupedData = Object.entries(grouped).map(([category, total]) => ({
      category,
      total
    }));
  }
}
```

### Drill-Down Grouping

Create interactive drill-down charts:

```typescript
@Component({
  template: `
    <div>
      <button *ngIf="groupLevel > 0" (click)="drillUp()">← Back</button>
      <h3>{{ currentLevel }}</h3>
      
      <ejs-accumulationchart id="container"
        (pointClick)="onPointClick($event)">
        <e-accumulation-series-collection>
          <e-accumulation-series
            [dataSource]="displayData"
            xName="label"
            yName="value"
            type="Pie">
          </e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>
    </div>
  `
})
export class DrillDownComponent {
  groupLevel = 0;
  currentLevel = 'Product Categories';
  displayData: any[] = [];

  allData = {
    categories: [
      { label: 'Electronics', value: 85000 },
      { label: 'Clothing', value: 60000 },
      { label: 'Home', value: 67000 }
    ],
    Electronics: [
      { label: 'Phones', value: 50000 },
      { label: 'Tablets', value: 35000 }
    ],
    Clothing: [
      { label: 'Shirts', value: 28000 },
      { label: 'Pants', value: 32000 }
    ],
    Home: [
      { label: 'Furniture', value: 45000 },
      { label: 'Decor', value: 22000 }
    ]
  };

  ngOnInit() {
    this.displayData = this.allData.categories;
  }

  onPointClick(args: any) {
    const category = args.point.label;
    
    if (this.allData[category as keyof typeof this.allData]) {
      this.displayData = this.allData[category as keyof typeof this.allData];
      this.currentLevel = category;
      this.groupLevel++;
    }
  }

  drillUp() {
    if (this.groupLevel > 0) {
      this.displayData = this.allData.categories;
      this.currentLevel = 'Product Categories';
      this.groupLevel--;
    }
  }
}
```

## Empty Point Handling

### Handle Null/Zero Values

Configure behavior for missing or zero data points:

```typescript
@Component({
  template: `
    <ejs-accumulationchart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="dataWithGaps"
          xName="x"
          yName="y"
          type="Pie"
          [emptyPointSettings]="emptyPointConfig">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class EmptyPointComponent {
  dataWithGaps = [
    { x: 'Q1', y: 50000 },
    { x: 'Q2', y: 0 },           // Empty point
    { x: 'Q3', y: 35000 },
    { x: 'Q4', y: null }          // Null value
  ];

  // Show empty points as gray segments
  emptyPointConfig = {
    mode: 'Zero',                 // 'Zero', 'Drop', 'Average'
    fill: '#D3D3D3',
    border: { color: '#999' }
  };
}
```

### Empty Point Mode Options

| Mode | Behavior |
|------|----------|
| `Zero` | Treat as zero value (shows small segment) |
| `Drop` | Skip point entirely (gaps in data) |
| `Average` | Use average of neighboring values |

### Filter and Display Validation

```typescript
@Component({
  template: `
    <div>
      <label>
        <input type="checkbox" [(ngModel)]="showEmpty"> 
        Show Empty Points
      </label>
      
      <ejs-accumulationchart id="container">
        <e-accumulation-series
          [dataSource]="filteredData"
          xName="x"
          yName="y"
          type="Doughnut">
        </e-accumulation-series>
      </ejs-accumulationchart>
    </div>
  `
})
export class FilterEmptyComponent {
  showEmpty = true;
  originalData = [
    { x: 'A', y: 50000 },
    { x: 'B', y: null },
    { x: 'C', y: 35000 },
    { x: 'D', y: 0 }
  ];

  get filteredData(): any[] {
    if (this.showEmpty) {
      return this.originalData.map(item => ({
        ...item,
        y: item.y || 0
      }));
    }
    return this.originalData.filter(item => item.y && item.y > 0);
  }
}
```

## Real-Time Data Binding

### Live Data Updates from Service

```typescript
@Component({
  template: `
    <ejs-accumulationchart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="liveData"
          xName="timestamp"
          yName="value"
          type="Pie">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class LiveDataComponent implements OnInit, OnDestroy {
  liveData: any[] = [];
  private subscription: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Subscribe to real-time updates
    this.subscription = this.dataService.getRealtimeData()
      .subscribe(newData => {
        this.liveData = newData;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

@Injectable()
export class DataService {
  getRealtimeData() {
    return interval(2000).pipe(
      switchMap(() => this.fetchData())
    );
  }

  private fetchData() {
    return timer(0, 2000).pipe(
      map(() => [
        { timestamp: new Date(), value: Math.random() * 100 },
        { timestamp: new Date(), value: Math.random() * 80 },
        { timestamp: new Date(), value: Math.random() * 90 }
      ])
    );
  }
}
```

## Common Patterns

### Pattern 1: KPI Dashboard with Auto-Refresh

```typescript
@Component({
  selector: 'app-kpi-dashboard',
  template: `
    <div class="dashboard">
      <div class="chart-row">
        <div class="chart">
          <h4>Sales Distribution</h4>
          <ejs-accumulationchart>
            <e-accumulation-series-collection>
              <e-accumulation-series
                [dataSource]="salesData"
                type="Pie">
              </e-accumulation-series>
            </e-accumulation-series-collection>
          </ejs-accumulationchart>
        </div>
        
        <div class="chart">
          <h4>Regional Performance</h4>
          <ejs-accumulationchart>
            <e-accumulation-series-collection>
              <e-accumulation-series
                [dataSource]="regionalData"
                type="Doughnut">
              </e-accumulation-series>
            </e-accumulation-series-collection>
          </ejs-accumulationchart>
        </div>
      </div>
      
      <p class="last-update">Last updated: {{ lastUpdate | date: 'short' }}</p>
    </div>
  `,
  styles: [`
    .dashboard {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .chart {
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  `]
})
export class KPIDashboardComponent implements OnInit, OnDestroy {
  salesData: any[] = [];
  regionalData: any[] = [];
  lastUpdate = new Date();
  private refreshInterval: any;

  ngOnInit() {
    this.loadData();
    // Auto-refresh every 30 seconds
    this.refreshInterval = setInterval(() => this.loadData(), 30000);
  }

  loadData() {
    this.salesData = [
      { x: 'Product A', y: 45 },
      { x: 'Product B', y: 30 },
      { x: 'Product C', y: 25 }
    ];
    this.regionalData = [
      { x: 'North', y: 120 },
      { x: 'South', y: 95 },
      { x: 'East', y: 150 }
    ];
    this.lastUpdate = new Date();
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}
```

### Pattern 2: Comparison Chart with Toggle

```typescript
@Component({
  template: `
    <div>
      <div class="controls">
        <label>
          <input type="radio" [(ngModel)]="comparisonType" value="month"> 
          Monthly
        </label>
        <label>
          <input type="radio" [(ngModel)]="comparisonType" value="quarter"> 
          Quarterly
        </label>
        <label>
          <input type="radio" [(ngModel)]="comparisonType" value="year"> 
          Yearly
        </label>
      </div>
      
      <ejs-accumulationchart id="container">
        <e-accumulation-series-collection>
          <e-accumulation-series
            [dataSource]="getDataByType()"
            type="Pyramid">
          </e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>
    </div>
  `
})
export class ComparisonChartComponent {
  comparisonType = 'month';

  monthlyData = [
    { x: 'Jan', y: 50 },
    { x: 'Feb', y: 45 },
    { x: 'Mar', y: 60 }
  ];

  quarterlyData = [
    { x: 'Q1', y: 155 },
    { x: 'Q2', y: 165 },
    { x: 'Q3', y: 180 },
    { x: 'Q4', y: 190 }
  ];

  yearlyData = [
    { x: '2021', y: 600 },
    { x: '2022', y: 650 },
    { x: '2023', y: 720 }
  ];

  getDataByType() {
    switch (this.comparisonType) {
      case 'quarter':
        return this.quarterlyData;
      case 'year':
        return this.yearlyData;
      default:
        return this.monthlyData;
    }
  }
}
```

## Performance Optimization

### Lazy Load Large Datasets

```typescript
@Component({
  template: `
    <button (click)="loadMore()" [disabled]="allDataLoaded">
      Load More Data
    </button>
    <ejs-accumulationchart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="visibleData"
          type="Pie">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class LazyLoadComponent {
  visibleData: any[] = [];
  allData: any[] = [];
  pageSize = 20;
  currentPage = 0;

  get allDataLoaded(): boolean {
    return this.visibleData.length >= this.allData.length;
  }

  ngOnInit() {
    this.loadAllData();
    this.loadMore();
  }

  loadAllData() {
    // Generate large dataset
    this.allData = Array.from({ length: 1000 }, (_, i) => ({
      x: `Item ${i + 1}`,
      y: Math.floor(Math.random() * 100)
    }));
  }

  loadMore() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.visibleData = [...this.visibleData, ...this.allData.slice(start, end)];
    this.currentPage++;
  }
}
```

## EJ1 to EJ2 Migration

### Key API Changes

| EJ1 | EJ2 |
|-----|-----|
| `ejChart` | `ejs-accumulationchart` |
| `e-series` | `e-accumulation-series` |
| `type: "pie"` | `type="Pie"` |
| `tooltip: true` | `[tooltip]="{ enable: true }"` |
| Event: `dataBinding` | Event: `beforePrint` |

### Migration Example

**EJ1 Code:**
```typescript
angular.module('chartApp', ['ej.syncfusion.charts'])
  .controller('ChartController', function($scope) {
    $scope.seriesData = [
      { x: 'A', y: 30 },
      { x: 'B', y: 25 }
    ];
  });

// HTML:
// <ej-chart e-series="seriesData" e-type="pie">
```

**EJ2 Code:**
```typescript
@Component({
  template: `
    <ejs-accumulationchart>
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="seriesData"
          xName="x"
          yName="y"
          type="Pie">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class ChartComponent {
  seriesData = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 }
  ];
}
```

### Migration Checklist

- [ ] Update component selector from `ej-chart` to `ejs-accumulationchart`
- [ ] Change property binding syntax (two-way → property binding)
- [ ] Update event names (camelCase with `(event)`)
- [ ] Replace `e-series` with `e-accumulation-series`
- [ ] Update type values ('pie' → 'Pie')
- [ ] Migrate tooltip, legend configurations
- [ ] Test all interactive features
- [ ] Update styling and themes

## Key Takeaways

- **Dynamic Updates**: Change data at runtime; chart auto-refreshes
- **Data Grouping**: Aggregate and filter data for different views
- **Empty Handling**: Configure behavior for null/zero values
- **Real-Time**: Use observables for live data updates
- **Performance**: Implement pagination and lazy loading for large datasets
- **Migration**: Follow systematic approach for EJ1 to EJ2 updates

---

## API Reference Summary

### Advanced Configuration APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `groupTo` | Group small values threshold | [groupTo](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#groupto) |
| `groupMode` | Grouping mode (Value/Point) | [groupMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#groupmode) |
| `emptyPointSettings` | Empty point configuration | [emptyPointSettings](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#emptypointsettings) |
| `refresh()` | Refresh chart rendering | [refresh](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#refresh) |

### Render Events

| Event | Description | Documentation Link |
|-------|-------------|-------------------|
| `seriesRender` | Fires before series renders | [seriesRender](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#seriesrender) |
| `pointRender` | Fires before point renders | [pointRender](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#pointrender) |
| `animationComplete` | Fires after animation completes | [animationComplete](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#animationcomplete) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)