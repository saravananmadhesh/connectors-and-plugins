# Data Binding in Syncfusion Angular Bullet Chart

Data binding is the process of connecting your Bullet Chart to data sources. The Bullet Chart supports both static local data and dynamic remote data binding.

## Table of Contents 

- [Local Data Binding](#local-data-binding)
  - [Basic Local Data Setup](#basic-local-data-setup)
  - [Data Source Properties](#data-source-properties)
  - [Essential Field Mapping](#essential-field-mapping)
- [Data Examples by Use Case](#data-examples-by-use-case)
  - [Sales Performance](#sales-performance)
  - [Employee Performance](#employee-performance)
  - [Budget vs Actual](#budget-vs-actual)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Triggering Data Reload](#triggering-data-reload)
  - [Reactive Data Updates with NgOnInit](#reactive-data-updates-with-ngoninit)
- [Remote Data Binding (HTTP Services)](#remote-data-binding-http-services)
  - [Using HttpClient](#using-httpclient)
  - [Mock API Response Format](#mock-api-response-format)
  - [Complete Example with Error Handling](#complete-example-with-error-handling)
- [Data Binding with Categories](#data-binding-with-categories)
- [Performance Considerations](#performance-considerations)
  - [Large Data Sets](#large-data-sets)
  - [Data Refresh Optimization](#data-refresh-optimization)
- [Common Data Binding Patterns](#common-data-binding-patterns)
  - [Pattern 1: Static Initialization](#pattern-1-static-initialization)
  - [Pattern 2: API Integration](#pattern-2-api-integration)
  - [Pattern 3: Real-time Updates](#pattern-3-real-time-updates)
- [Data Binding Best Practices](#data-binding-best-practices)
- [Troubleshooting](#troubleshooting)


## Local Data Binding

### Basic Local Data Setup

Bind a static array of data to the Bullet Chart:

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-bulletchart 
        [dataSource]='data' 
        valueField='value' 
        targetField='target'>
    </ejs-bulletchart>`
})
export class AppComponent implements OnInit {
    public data: any;

    ngOnInit(): void {
        this.data = [
            { value: 100, target: 80 },
            { value: 200, target: 180 },
            { value: 300, target: 280 },
            { value: 400, target: 380 }
        ];
    }
}
```

### Data Source Properties

The `dataSource` property accepts an array where each element represents one bullet:

```typescript
interface BulletChartDataItem {
    value: number;          // REQUIRED: Actual/feature measure
    target: number;         // REQUIRED: Target/comparative measure
    category?: string;      // OPTIONAL: Label for the bullet
    [key: string]: any;     // Additional custom properties
}
```

### Essential Field Mapping

Use these properties to map data fields:

| Property | Purpose | Example Value |
|----------|---------|---------------|
| `valueField` | Maps to actual value | `'value'`, `'actual'`, `'sales'` |
| `targetField` | Maps to target value | `'target'`, `'goal'`, `'benchmark'` |
| `categoryField` | Maps to category label | `'category'`, `'name'`, `'region'` |

**Example with Field Mapping:**

```typescript
data = [
    { actual: 25000, goal: 30000, name: 'Q1' },
    { actual: 28000, goal: 30000, name: 'Q2' },
    { actual: 35000, goal: 30000, name: 'Q3' }
];

template = `<ejs-bulletchart 
    [dataSource]='data' 
    valueField='actual' 
    targetField='goal'
    categoryField='name'>
</ejs-bulletchart>`
```

## Data Examples by Use Case

### Sales Performance

```typescript
public salesData = [
    { region: 'North', actual: 25000, target: 30000 },
    { region: 'South', actual: 28000, target: 30000 },
    { region: 'East', actual: 35000, target: 30000 },
    { region: 'West', actual: 22000, target: 30000 }
];
```

### Employee Performance

```typescript
public employeeData = [
    { name: 'Alice Johnson', score: 85, targetScore: 80 },
    { name: 'Bob Smith', score: 72, targetScore: 80 },
    { name: 'Charlie Davis', score: 90, targetScore: 80 },
    { name: 'Diana Wilson', score: 78, targetScore: 80 }
];
```

### Budget vs Actual

```typescript
public budgetData = [
    { department: 'Marketing', actual: 45000, budget: 50000 },
    { department: 'Operations', actual: 120000, budget: 100000 },
    { department: 'R&D', actual: 75000, budget: 80000 },
    { department: 'HR', actual: 35000, budget: 40000 }
];
```

## Dynamic Data Updates

Update chart data in response to user interactions or application state changes:

### Triggering Data Reload

```typescript
import { Component, ViewChild } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';
import { BulletChartComponent } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `
        <button (click)="updateData()">Refresh Data</button>
        <ejs-bulletchart 
            #bulletChart
            [dataSource]='data' 
            valueField='value' 
            targetField='target'>
        </ejs-bulletchart>
    `
})
export class AppComponent {
    @ViewChild('bulletChart', { static: false }) 
    bulletChart!: BulletChartComponent;

    public data: any;

    constructor() {
        this.data = this.getInitialData();
    }

    updateData(): void {
        this.data = this.getInitialData();
        if (this.bulletChart) {
            this.bulletChart.refresh();
        }
    }

    getInitialData(): any {
        return [
            { value: Math.random() * 100, target: 80 },
            { value: Math.random() * 100, target: 80 }
        ];
    }
}
```

### Reactive Data Updates with NgOnInit

```typescript
ngOnInit(): void {
    // Simulate data fetching every 5 seconds
    setInterval(() => {
        this.data = this.generateRandomData();
        this.bulletChart.refresh();
    }, 5000);
}

generateRandomData(): any {
    return [
        { value: Math.round(Math.random() * 100), target: 80 },
        { value: Math.round(Math.random() * 100), target: 90 }
    ];
}
```

## Remote Data Binding (HTTP Services)

### Using HttpClient

Fetch data from an API endpoint:

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `<ejs-bulletchart 
        [dataSource]='data' 
        valueField='value' 
        targetField='target'>
    </ejs-bulletchart>`
})
export class AppComponent implements OnInit {
    public data: any;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get('/api/bullet-chart-data')
            .subscribe(response => {
                this.data = response;
            });
    }
}
```

### Mock API Response Format

Your API should return data in this structure:

```json
[
    { "value": 100, "target": 80, "category": "Q1" },
    { "value": 200, "target": 180, "category": "Q2" },
    { "value": 300, "target": 280, "category": "Q3" }
]
```

### Complete Example with Error Handling

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `
    <div>
      <button (click)="loadData()">Load Data</button>
      <p *ngIf="loading">Loading...</p>
      <p *ngIf="error" style="color: red;">{{ error }}</p>
      <ejs-bulletchart
        *ngIf="data.length"
        [dataSource]="data"
        valueField="value"
        targetField="target"
        categoryField="category">
      </ejs-bulletchart>
    </div>
    `
})
export class AppComponent implements OnInit {
    public data: any;
    public loading: boolean = false;
    public error: string = '';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.loading = true;
        this.error = '';
        
        this.http.get<any>('/api/bullet-chart-data')
            .subscribe(
                (response) => {
                    this.data = response;
                    this.loading = false;
                },
                (error: HttpErrorResponse) => {
                    this.error = `Failed to load data: ${error.statusText}`;
                    this.loading = false;
                }
            );
    }
}
```

## Data Binding with Categories

Display labels for each bullet chart:

```typescript
public data = [
    { category: 'Revenue', value: 25000, target: 30000 },
    { category: 'Profit', value: 8000, target: 10000 },
    { category: 'Growth', value: 12, target: 15 }
];

template = `<ejs-bulletchart 
    [dataSource]='data' 
    valueField='value' 
    targetField='target'
    categoryField='category'>
</ejs-bulletchart>`
```

## Performance Considerations

### Large Data Sets

For datasets with many records (100+), consider:

1. **Pagination**: Load data in chunks
2. **Virtual Scrolling**: Render only visible items
3. **Data Filtering**: Pre-filter on server side

```typescript
// Fetch paginated data
loadPage(pageNumber: number): void {
    this.http.get(`/api/data?page=${pageNumber}&size=50`)
        .subscribe(response => {
            this.data = response;
        });
}
```

### Data Refresh Optimization

Use `refresh()` method only when needed:

```typescript
// Bad: Refreshes entire chart every time
onDataChange(): void {
    this.chart.refresh();
}

// Good: Update array reference to trigger change detection
updateDataArray(): void {
    this.data = [...this.newData];  // Creates new reference
}
```

## Common Data Binding Patterns

### Pattern 1: Static Initialization

```typescript
ngOnInit(): void {
    this.data = this.getStaticData();
}

getStaticData(): any {
    return [
        { value: 100, target: 80 },
        { value: 200, target: 180 }
    ];
}
```

### Pattern 2: API Integration

```typescript
ngOnInit(): void {
    this.dataService.getBulletChartData()
        .subscribe(data => this.data = data);
}
```

### Pattern 3: Real-time Updates

```typescript
ngOnInit(): void {
    this.dataService.getBulletChartDataStream()
        .subscribe(data => {
            this.data = data;
            this.chart?.refresh();
        });
}
```

## Data Binding Best Practices

1. **Always provide both valueField and targetField** - Chart needs both for comparison
2. **Ensure numeric values** - value and target should be numbers
3. **Use meaningful categories** - Help users identify each bullet
4. **Validate data structure** - Catch mapping errors early
5. **Handle empty data** - Provide fallback when no data exists
6. **Cache API responses** - Reduce unnecessary requests
7. **Error handling** - Always handle HTTP errors gracefully

## Troubleshooting

**Chart appears empty?**
- Verify `valueField` and `targetField` match your data property names
- Ensure data array is not null or undefined
- Check that data contains actual numeric values

**Data not updating?**
- Use `chart.refresh()` after data changes
- Create new array reference for change detection: `this.data = [...newData]`
- Verify HttpClient module is imported

**API calls not working?**
- Check CORS configuration on server
- Verify API endpoint URL is correct
- Use browser DevTools Network tab to diagnose
