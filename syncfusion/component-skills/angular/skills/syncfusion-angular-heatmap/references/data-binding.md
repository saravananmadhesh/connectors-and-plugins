# Data Binding & Formats

**API Reference:** [references/api-reference.md](references/api-reference.md)

## Table of Contents

- [Data Binding Overview](#data-binding-overview)
- [JSON Array Format](#json-array-format)
  - [Basic Structure](#basic-structure)
  - [Complete Example: Sales Data](#complete-example-sales-data)
  - [Field Mapping in HeatMap](#field-mapping-in-heatmap)
- [2D Array Format](#2d-array-format)
  - [Basic Structure](#basic-structure-1)
  - [Complete Example: Numeric Matrix](#complete-example-numeric-matrix)
  - [When to Use 2D Arrays](#when-to-use-2d-arrays)
- [DataManager Integration](#datamanager-integration)
  - [Basic DataManager Setup](#basic-datamanager-setup)
  - [API Response Format](#api-response-format)
- [Live Data Updates](#live-data-updates)
  - [Update Entire DataSource](#update-entire-datasource)
  - [Real-time Polling Pattern](#real-time-polling-pattern)
- [Binding Best Practices](#binding-best-practices)
  - [Do](#do)
  - [Don't](#dont)
  - [Performance Tips](#performance-tips)

## Data Binding Overview

HeatMap supports multiple data formats to handle different scenarios:

| Format | Use Case | When to Use |
|--------|----------|------------|
| **JSON Array** | Structured labeled data | Most common, explicit dimensions |
| **2D Array** | Matrix/grid data | Numeric grids, numerical indices |
| **DataManager** | Remote/API data | Server-side filtering, large datasets |

## JSON Array Format

The most common format using objects with xName, yName, and value fields.

### Basic Structure

```typescript
dataSource: Object[] = [
    { xAxis: 'label1', yAxis: 'label1', value: 10 },
    { xAxis: 'label1', yAxis: 'label2', value: 15 },
    { xAxis: 'label2', yAxis: 'label1', value: 20 },
    { xAxis: 'label2', yAxis: 'label2', value: 25 }
];
```

### Complete Example: Sales Data

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, LegendService, TooltipService, AdaptorService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    imports: [HeatMapModule],
    providers: [LegendService, TooltipService, AdaptorService],
    standalone: true,
    selector: 'my-app',
    template: `
       <ejs-heatmap id='container' style="display:block;" 
            [dataSource]='dataSource' 
            [dataSourceSettings]='dataSourceSettings' 
            [xAxis]='xAxis' 
            [yAxis]='yAxis'
            [cellSettings]='cellSettings' 
            [titleSettings]='titleSettings' 
            [paletteSettings]='paletteSettings'>
        </ejs-heatmap>`
})
export class AppComponent {

    titleSettings: Object = {
        text: 'Annual Sales Revenue by Product Category',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontFamily: 'Segoe UI'
        }
    };

    // X-Axis represents the Categories (Regions or Product Groups)
    xAxis: Object = {
        labels: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Toys'],
        labelRotation: 45,
        labelIntersectAction: 'None',
    };

    // Y-Axis represents the Sales Years
    yAxis: Object = {
        title: { text: 'Fiscal Year' },
        labels: ['2019', '2020', '2021', '2022', '2023'],
    };

    // Updated Sales Data Source (Table Format)
    dataSource: Object[] = [
        { 'Category': 'Electronics', '2019': 850, '2020': 920, '2021': 1100, '2022': 1050, '2023': 1300 },
        { 'Category': 'Fashion', '2019': 420, '2020': 380, '2021': 450, '2022': 510, '2023': 580 },
        { 'Category': 'Home & Garden', '2019': 300, '2020': 450, '2021': 500, '2022': 480, '2023': 520 },
        { 'Category': 'Sports', '2019': 150, '2020': 200, '2021': 320, '2022': 340, '2023': 410 },
        { 'Category': 'Toys', '2019': 220, '2020': 250, '2021': 280, '2022': 300, '2023': 350 }
    ];

    dataSourceSettings: Object = {
        isJsonData: true,
        adaptorType: 'Table',
        xDataMapping: 'Category', // Maps the 'Category' field to the X-Axis
    };

    paletteSettings: Object = {
        palette: [
            { color: '#E5E7EB', label: 'Low Sales' },   // Light Grey
            { color: '#3B82F6', label: 'High Sales' }   // Blue
        ],
    };

    cellSettings: Object = {
        showLabel: true,
        format: '${value}k', // Shows value as $850k
        border: {
            width: 1,
            radius: 4,
            color: 'white'
        }
    };
}
```

### Field Mapping in HeatMap

```html
<ejs-heatmap [dataSource]='dataSource'
    [xAxis]='{ valueType: "Category", labels: ["Q1", "Q2", "Q3", "Q4"] }'
    [yAxis]='{ valueType: "Category", labels: ["Product A", "Product B", "Product C"] }'
    [cellSettings]='{ showLabel: true }'>
</ejs-heatmap>
```

**How it works:**
1. HeatMap iterates through dataSource array
2. Groups by xAxis values (Quarter)
3. Groups by yAxis values (Product)
4. Uses value field for cell color intensity

## 2D Array Format

Use 2D arrays for pure numeric grids or when data is already matrix-shaped.

### Basic Structure

```typescript
dataSource: Object[] = [
    [10, 15, 20],     // Row 1: [row1-col1, row1-col2, row1-col3]
    [20, 25, 30],     // Row 2: [row2-col1, row2-col2, row2-col3]
    [30, 35, 40]      // Row 3: [row3-col1, row3-col2, row3-col3]
];
```

### Complete Example: Numeric Matrix

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, LegendService, TooltipService, AdaptorService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    imports: [HeatMapModule],
    providers: [LegendService, TooltipService, AdaptorService],
    standalone: true,
    selector: 'my-app',
    template: `
        <ejs-heatmap id='heatmap' 
            [dataSource]='dataSource'
            [xAxis]='xAxis'
            [yAxis]='yAxis'>
        </ejs-heatmap>`
})
export class AppComponent {
    // 2D array: 5x5 correlation matrix
    dataSource: Object[] = [
        [1.0,  0.8,  0.6,  0.4,  0.2],  // Variable 1
        [0.8,  1.0,  0.7,  0.5,  0.3],  // Variable 2
        [0.6,  0.7,  1.0,  0.6,  0.4],  // Variable 3
        [0.4,  0.5,  0.6,  1.0,  0.7],  // Variable 4
        [0.2,  0.3,  0.4,  0.7,  1.0]   // Variable 5
    ];

    xAxis: Object = {
        labels: ['Var1', 'Var2', 'Var3', 'Var4', 'Var5'],
        valueType: 'Category'
    };

    yAxis: Object = {
        labels: ['Var1', 'Var2', 'Var3', 'Var4', 'Var5'],
        valueType: 'Category'
    };
}
```

### When to Use 2D Arrays

- **Correlation matrices:** All-vs-all comparisons
- **Heatmap grids:** Simple numeric data without complex labels
- **Performance:** Slightly faster for very large matrices
- **Data transformation:** When reshaping existing matrix data

## DataManager Integration

Bind HeatMap to remote data using DataManager for server-side operations.

### Basic DataManager Setup

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
    imports: [HeatMapModule],
    standalone: true,
    selector: 'app-remote-heatmap',
    template: `
        <ejs-heatmap id='heatmap' 
            [dataSource]='dataManager'
            [xAxis]='xAxis'
            [yAxis]='yAxis'>
        </ejs-heatmap>
    `,
    encapsulation: ViewEncapsulation.None
})
export class RemoteHeatMapComponent {
    dataManager: Object;

    ngOnInit() {
        // Connect to your API endpoint
        this.dataManager = new DataManager({
            url: 'https://api.example.com/heatmap-data',
            adaptor: new WebApiAdaptor(),
            crossDomain: true
        });
    }

    xAxis: Object = { valueType: 'Category', labels: ['Q1', 'Q2', 'Q3', 'Q4'] };
    yAxis: Object = { valueType: 'Category', labels: ['Product A', 'Product B'] };
}
```

### API Response Format

Expected server response (JSON array):

```json
[
    { "Quarter": "Q1", "Product": "Product A", "Sales": 45000 },
    { "Quarter": "Q1", "Product": "Product B", "Sales": 38000 },
    { "Quarter": "Q2", "Product": "Product A", "Sales": 52000 },
    { "Quarter": "Q2", "Product": "Product B", "Sales": 41000 }
]
```

## Live Data Updates

Dynamically update heatmap data when new data arrives.

### Update Entire DataSource

```typescript
export class DynamicHeatMapComponent {
    @ViewChild('heatmap') heatmapObj: HeatMapComponent;
    
    dataSource: Object[] = [];

    ngAfterViewInit() {
        // Update with new data after 2 seconds
        setTimeout(() => {
            this.dataSource = [
                { Q: 'Q1', P: 'A', V: 100 },
                { Q: 'Q1', P: 'B', V: 150 },
                { Q: 'Q2', P: 'A', V: 120 },
                { Q: 'Q2', P: 'B', V: 170 }
            ];
            // Refresh heatmap
            this.heatmapObj.refresh();
        }, 2000);
    }
}
```

### Real-time Polling Pattern

```typescript
export class RealtimeHeatMapComponent {
    @ViewChild('heatmap') heatmapObj: HeatMapComponent;
    dataSource: Object[] = [];
    pollInterval: Object;

    ngOnInit() {
        this.startPolling();
    }

    startPolling() {
        this.pollInterval = setInterval(() => {
            this.fetchLatestData();
        }, 5000);  // Poll every 5 seconds
    }

    fetchLatestData() {
        // Fetch from API
        this.http.get('api/heatmap-data').subscribe(data => {
            this.dataSource = data;
            this.heatmapObj.refresh();
        });
    }

    ngOnDestroy() {
        clearInterval(this.pollInterval);
    }
}
```

## Binding Best Practices

### Do

- **Use JSON format for labeled data:** Most readable and maintainable
- **Provide complete datasets:** Don't bind partial data expecting rendering
- **Validate data before binding:** Check for nulls, undefined values
- **Use DataManager for large datasets:** Better performance and memory efficiency

### Don't

- **Don't mix data formats:** Use consistent JSON or 2D arrays, not both
- **Don't bind data inline in template:** Move to component class for clarity
- **Don't update partial cells:** Update entire dataSource and call refresh()
- **Don't assume axis labels match data:** Explicitly define xAxis/yAxis labels

### Performance Tips

1. **Large Datasets (>10k cells):**
   - Canvas rendering automatically switches on (check `renderingMode`)
   - Consider server-side aggregation
   - Use DataManager with paging

2. **Frequent Updates:**
   - Batch updates into single refresh call
   - Use reactive data patterns (RxJS Observables)

3. **Memory Optimization:**
   - Limit time-series window (e.g., last 30 days)
   - Implement data aggregation on server

