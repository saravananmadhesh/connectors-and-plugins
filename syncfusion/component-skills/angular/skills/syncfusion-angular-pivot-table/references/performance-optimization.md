# Performance Optimization

## ⚠️ SECURITY NOTICE

When using remote data sources for performance optimization (server-side aggregation, remote APIs), **always use trusted, authenticated endpoints**. See [core-concepts.md Security Best Practices](./core-concepts.md#security-best-practices) for comprehensive security guidelines.

## Table of Contents
- [Virtual Scrolling](#virtual-scrolling)
- [Paging](#paging)
- [Data Compression](#data-compression)
- [Deferred Updates](#deferred-updates)
- [Best Practices](#best-practices)

## Virtual Scrolling

Virtual scrolling improves responsiveness for large reports by rendering only visible rows and columns. Enable it with `enableVirtualization: true` on the PivotView and consider `virtualScrollSettings.allowSinglePage = true` to limit rendering to the current view page. Key limitations: use pixel `columnWidth`, avoid runtime column/row sizing changes (auto-fit, resizing, text wrap), and pre-process heavy grouping/formatting. When using a stand-alone `PivotFieldList`, synchronize it to the `PivotView` via events. Keep virtual scrolling focused on enabling the optimization rather than embedding extensive cross-references.

---

## Paging

Paging reduces DOM and processing by splitting large result sets into pages. Enable paging via `allowPaging: true` and configure `pageSettings` to limit records per page. For very large datasets, combine paging with a server-side pivot engine so the server returns only the requested page of aggregated results.

---

## Data Compression

### Reduce Data Transfer

```typescript
@Component({
  selector: 'app-compressed-data'
})
export class AppComponent {
  constructor(private api: ApiService) { }

  ngOnInit() {
    // Request only required fields from server
    this.api.getPivotData({
      fields: ['Region', 'Year', 'Sales'],  // Only needed fields
      filter: {
        year: { min: 2023, max: 2024 },    // Pre-filter
        region: ['North', 'South']          // Limit regions
      }
    }).subscribe(data => {
      this.dataSourceSettings.dataSource = data;
    });
  }

  dataSourceSettings: IDataOptions = {
    rows: [{ name: 'Region' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };
}
```

### Enable Data Compression

For datasets with many repeated records, enable data compression to summarize duplicates:

```typescript
allowDataCompression: true,  // Summarize repeated records

dataSourceSettings: IDataOptions = {
  dataSource: largeDataset,
  rows: [{ name: 'Region' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales', type: 'Sum' }]
  // Example: 1000 records with 400 duplicates → 600 unique records
};
```

### Server-Side Aggregation

⚠️ **SECURITY**: Only use authenticated backend endpoints for server-side processing.

```typescript
// Instead of sending 100K rows, have server pre-aggregate
// Send only summarized data to client
import { environment } from '../environments/environment';

dataSourceSettings: IDataOptions = {
  url: environment.pivotApiEndpoint,  // 🔒 Use environment config
  mode: 'Server',
  rows: [{ name: 'Region' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales', type: 'Sum' }]
  // Server returns: Region x Year x Sales (much smaller)
};

// Note: Implement authentication headers in your HTTP interceptor
// or use DataManager with headers configuration
```

---

## Defer Layout Update

Enable deferred layout updates to allow users to perform multiple field operations without immediate re-rendering. Use the `allowDeferLayoutUpdate` property with the Field List:

```typescript
import { FieldListService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  selector: 'app-defer-layout',
  template: `
    <ejs-pivotview 
      #pivotGrid
      [dataSourceSettings]="dataSourceSettings"
      [allowDeferLayoutUpdate]="true"
      [showFieldList]="true">
    </ejs-pivotview>
  `,
  providers: [FieldListService]
})
export class AppComponent {
  dataSourceSettings: IDataOptions = {
    dataSource: data,
    rows: [{ name: 'Region' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };
}
```

With `allowDeferLayoutUpdate: true`, users can:
- Drag fields between row, column, value, and filter axes
- Apply sorting and filtering via Field List
- All changes batch together until "Apply" button is clicked
- Reduces multiple re-renders to a single update

---

### When to Use Deferred Updates

Use deferred updates when:
- Making many field changes at once
- Each change would trigger expensive recalculation
- Want to batch multiple changes before refresh

```
Without Deferred Updates:
Change Row Field → Full recalculation
Change Column Field → Full recalculation
Change Filter → Full recalculation
Total: 3 recalculations

With Deferred Updates:
Change Row Field (no refresh)
Change Column Field (no refresh)
Change Filter (no refresh)
Click Apply → Single recalculation
Total: 1 recalculation
```

## Large Dataset Handling


### Large dataset guidance

When working with very large datasets, follow these best practices to improve loading and rendering performance. The guidance below is extracted from the canonical performance best-practices document.

Virtual scrolling

Virtual scrolling improves performance by rendering only the visible rows and columns in the viewport. This reduces initial load time and memory usage because the control processes only the data currently in view. As the user scrolls, additional data loads automatically. For very large datasets prefer virtual scrolling and consider enabling single-page mode (`virtualScrollSettings.allowSinglePage = true`) to render only the current view page.

Paging

Paging breaks large datasets into smaller pages instead of loading all data at once. Use paging when virtual scrolling cannot be applied (for example, when browser pixel height limitations exist). Enable paging with `allowPaging: true` and configure `pageSettings` to control records per page.

Server-side engine

For multi-million record scenarios, use a server-side pivot engine rather than processing raw input on the client. With this pattern the pivot engine runs in a dedicated web service that connects directly to your data source, performs pivot calculations server-side, and sends only aggregated results to the client. This minimizes network bandwidth and client rendering work.

Key server-side advantages:
- Server performs heavy pivot calculations and pre-aggregation.
- Server can return aggregated data only for the current viewport (supports server-side virtual scrolling/paging).
- Server-side caching (by end-user GUID/session) lets repeated UI interactions reuse computed engine state.

Refer to the full server-side pivot engine documentation for implementation details and examples: https://ej2.syncfusion.com/angular/documentation/pivotview/server-side-pivot-engine

---


### 2. Pre-Filter at Source

```typescript
const request = {
  dataSource: 'Sales',
  filters: {
    Year: [2024],
    Status: ['Completed'],
    Amount: { min: 1000, max: 500000 }
  }
};

// Server returns only matching records
// Instead of filtering on client
```

### 3. Optimize Sorting

Avoid sorting during initial rendering for large datasets:

```typescript
// ❌ Avoid: Sorting large non-string fields initially
sortSettings: [{
  name: 'Date',  // Large date field
  order: 'Descending'
}]

// ✅ Better: Pre-sort data at source
// Load dataSource already sorted as needed
```

### 4. Member Filtering Performance

Set display limits for filter dialogs:

```typescript
filterSettings: [{
  name: 'Country',
  type: 'Include',
  items: ['USA', 'Canada'],
  showAllMembers: false,    // Limit display
  maxNodeLimitInMemberEditor: 100  // Show max 100 members
}];
```

### 5. Avoid Built-in Grouping

Pre-process grouped data instead of using built-in grouping:

```typescript
// ❌ Avoid: Built-in grouping (impacts performance)
groupSettings: [{
  name: 'Date',
  type: 'Date',
  groupInterval: ['Years', 'Months']
}]

// ✅ Better: Pre-group in data source
const processedData = rawData.map(item => ({
  ...item,
  Date_Year: new Date(item.Date).getFullYear(),
  Date_Month: new Date(item.Date).toLocaleString('default', { month: 'long' })
}));
```

### 6. Value Filtering Alternatives

For better performance, use label or member filtering instead of value filtering:

```typescript
// ✅ Better performance: Label filtering
filterSettings: [{
  name: 'Country',
  type: 'Label',
  condition: 'Contains',
  value1: 'United'
}]

// ❌ Slower: Value filtering (considers entire rows/columns)
filterSettings: [{
  name: 'Country',
  type: 'Value',
  measure: 'Sales',
  condition: 'GreaterThan',
  value1: '1000'
}];
```

### 7. Use Appropriate Visualization

```typescript
// Large dataset in pivot grid - use high row/column count
virtualScrollSettings.verticalPageSize = 50;

// Large dataset in chart - limit to key metrics
chartSettings = { chartSeries: { type: 'Column' } };  // Line charts can handle fewer categories
```

### 8. Limit Component Size

Set specific dimensions to control viewport:

```typescript
pivotGridSettings: any = {
  height: '600px',    // Limit height
  width: '1000px'     // Limit width
};
```

### 9. Monitor Memory Usage

```typescript
// Check browser memory
console.memory.usedJSHeapSize  // Should stay below 500MB

// Reduce dataset if memory exceeds limit
if (memoryUsage > 500_000_000) {  // 500MB
  // Apply stricter filters
  // Increase virtual scrolling page size
  // Switch to server-side processing
}
```

### 10. Test Performance

```typescript
// Measure rendering time
const start = performance.now();
this.pivotGrid.refresh();
const end = performance.now();

console.log(`Refresh time: ${end - start}ms`);
// Target: < 2000ms for large datasets
```

---

## Performance Comparison

| Configuration | Data Size | Render Time | Memory | Best For |
|---------------|-----------|-------------|--------|----------|
| Local JSON | < 50K | 500-1000ms | 50-100MB | Small reports |
| Local + Virtual Scroll | 50K-500K | 100-300ms | 100-200MB | Medium datasets |
| Server-side + Paging | 500K-10M | 100-200ms | 20-50MB | Large datasets |
| Server-side + Streaming | 10M+ | 50-100ms | < 20MB | Enterprise scale |
