# Performance Optimization

## Table of Contents
- [Overview](#overview)
- [Virtual Scrolling](#virtual-scrolling)
- [Paging](#paging)
- [Server-Side Engine](#server-side-engine)
- [Data Compression](#data-compression)
- [Optimization Techniques](#optimization-techniques)

## Overview

Performance optimization is essential when working with large datasets. Syncfusion PivotView supports multiple strategies to maintain responsiveness with millions of records.

**Common Issues:**
- Slow initial load: >5 seconds
- Drill operations stuttering
- High memory consumption
- UI freezing during interactions

**Solutions:** Virtual scrolling, paging, server-side engine, data compression

## Virtual Scrolling

### Enable Virtual Scrolling
Virtual scrolling renders only visible rows/columns, dramatically reducing memory and DOM nodes.

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :gridSettings="gridSettings"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';  // Large dataset: 100k+ rows

const dataSourceSettings = {
  dataSource: pivotData,  // Millions of records
  rows: [{ name: 'Country', expandAll: false }],  // Prevent auto-expand
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Amount' }, { name: 'Quantity' }],
  filters: []
};

const gridSettings = {
  columnWidth: 140,  // Must be in pixels for virtual scrolling
  rowHeight: 36
};

// Enable virtual scrolling on component level: :enableVirtualization="true"
// For single-page optimization (render only current viewport):
const virtualScrollSettings = {
  allowSinglePage: true
};

const height = 600;  // Larger viewport recommended
</script>
```

### Virtual Scrolling Benefits
| Issue | Without | With Virtual |
|-------|---------|--------------|
| Initial Load | **15-20s** | ~2-3s |
| Memory | **200-300MB** | ~20-30MB |
| Drill Down | **3-5s delay** | <500ms |
| Scroll Smoothness | **Stutters** | **Smooth** |

### Virtual Scrolling Configuration
```vue
<script setup>
// On template:
// <ejs-pivotview :enableVirtualization="true" :gridSettings="gridSettings" ...

const gridSettings = {
  columnWidth: 140  // Must be pixels, not percentage
};

// For single-page mode (better performance with large datasets):
const virtualScrollSettings = {
  allowSinglePage: true  // Render only current page, not adjacent pages
};

// Key points:
// - enableVirtualization is a component prop, not a gridSettings property
// - Use virtualScrollSettings.allowSinglePage for performance optimization
// - columnWidth in pixels is required (percentage values not supported)
</script>
```

## Paging

### Implement Client-Side Paging
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { ref } from 'vue';
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

const pageSize = 50000;  // Records per page
const currentPage = ref(1);
const totalPages = ref(10);

const dataSourceSettings = {
  dataSource: largeDataset.slice(0, pageSize),  // First page only
  // ... other settings
};

const loadNextPage = () => {
  const skip = (currentPage.value - 1) * pageSize;
  const take = pageSize;
  dataSourceSettings.dataSource = largeDataset.slice(skip, skip + take);
};

const loadPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadNextPage();
  }
};
</script>
```

### Paging Benefits
- Reduces initial data load
- Lower memory consumption
- Faster data retrieval
- Better for network-based data

## Server-Side Engine

### Server-Side Pivot Processing
For very large datasets, process aggregation on server:

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

// ✓ SECURE: Use server endpoint
// Point to server-side pivot engine API
const dataSourceSettings = {
  dataSource: new DataManager({
    url: 'https://your-server/api/pivot/data',
    adaptor: new UrlAdaptor()
  }),
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales', type: 'Sum' }],
  // URL contains: ?rows=Country&columns=Year&values=Sales&aggregateType=Sum
};

const height = 400;
</script>
```

### Server-Side API Example (C# ASP.NET Core)
```csharp
// Controller: PivotController.cs
[HttpPost("data")]
public IActionResult GetPivotData([FromBody] PivotRequest request)
{
    // request contains rows, columns, values from client
    
    using (var context = new SalesDbContext())
    {
        // Query database directly
        var query = context.Sales.AsQueryable();
        
        // Apply grouping server-side
        var grouped = query
            .GroupBy(x => new { x.Country, x.Year })
            .Select(g => new 
            { 
                g.Key.Country,
                g.Key.Year,
                TotalSales = g.Sum(x => x.Amount)
            })
            .ToList();
        
        return Ok(grouped);
    }
}
```

### Server-Side Advantages
- **Scalability:** Handles 100M+ records
- **Bandwidth:** Transmit only aggregated results (~1000 rows)
- **Memory:** Server RAM handles raw data
- **Speed:** Optimized database queries

## Data Compression

### Enable Data Compression
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :allowDeferLayoutUpdate="true"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
const dataSourceSettings = {
  dataSource: largeDataset
};
</script>
```

**Note:** `allowDeferLayoutUpdate` is a component property (set on `<ejs-pivotview>`), not in dataSourceSettings. It defers aggregation until user interaction for faster initial load.

### Compression Techniques
1. **Defer Layout Update:** Process aggregation only when needed
2. **Lazy Aggregation:** Don't aggregate before display
3. **Server Compression:** Use GZIP on network transmission

## Optimization Techniques

### Complete Large Dataset Example
```vue
<template>
  <div id="app">
    <div class="info">
      Records: {{ recordCount | toLocaleString }} | 
      Memory: {{ memoryUsage }}MB | 
      Status: {{ loadingStatus }}
    </div>
    
    <ejs-pivotview 
      ref="pivot"
      :dataSourceSettings="dataSourceSettings" 
      :gridSettings="gridSettings"
      :virtualScrollSettings="virtualScrollSettings"
      :enableVirtualization="true"
      :height="height"
      :created="onCreated"
      :dataBound="onDataBound">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

const pivot = ref(null);
const recordCount = ref(1000000);
const memoryUsage = ref(0);
const loadingStatus = ref('Loading...');

// Simulated large dataset
const largeDataset = generateLargeDataset(1000000);

const dataSourceSettings = {
  dataSource: largeDataset,
  
  // Field configuration
  rows: [
    { name: 'Region', expandAll: false },    // Prevent auto-expand
    { name: 'Country', expandAll: false }
  ],
  columns: [
    { name: 'Year', expandAll: false },
    { name: 'Quarter' }
  ],
  values: [
    { name: 'Amount', type: 'Sum' },
    { name: 'Quantity', type: 'Sum' }
  ],
  
  // Optimization settings
  allowDeferLayoutUpdate: true  // Defer aggregation until needed
};

const gridSettings = {
  columnWidth: 140,              // Pixels required for virtual scrolling
  rowHeight: 36,
  allowResizing: false,          // Disable resizing for performance
  selectionSettings: { mode: 'None' }  // Disable selection for performance
};

// Single-page optimization for virtual scrolling
const virtualScrollSettings = {
  allowSinglePage: true          // Render only current viewport
};

const height = 600;

// Generate large dataset for testing
function generateLargeDataset(count) {
  const regions = ['North America', 'Europe', 'Asia', 'South America'];
  const countries = ['USA', 'Canada', 'UK', 'Germany', 'China', 'Japan', 'India'];
  const years = [2020, 2021, 2022, 2023];
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      Region: regions[Math.floor(Math.random() * regions.length)],
      Country: countries[Math.floor(Math.random() * countries.length)],
      Year: years[Math.floor(Math.random() * years.length)],
      Quarter: quarters[Math.floor(Math.random() * quarters.length)],
      Amount: Math.random() * 100000,
      Quantity: Math.floor(Math.random() * 1000)
    });
  }
  return data;
}

const onCreated = () => {
  loadingStatus.value = 'Initializing...';
};

const onDataBound = () => {
  loadingStatus.value = 'Ready';
  
  // Get memory usage (approximate)
  if (performance.memory) {
    memoryUsage.value = Math.round(performance.memory.usedJSHeapSize / 1048576);
  }
};
</script>

<style scoped>
.info {
  padding: 10px;
  background: #f0f0f0;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
}
</style>
```

### Optimization Checklist
- [ ] **Virtual Scrolling:** Enabled for 50k+ records
- [ ] **Expandall: false:** Collapse by default to delay aggregation
- [ ] **Defer Layout Update:** True for 100k+ records
- [ ] **Server-Side:** For 1M+ records
- [ ] **Paging:** Implemented for gradual data loading
- [ ] **Fixed Heights/Widths:** No auto-sizing to prevent reflows
- [ ] **Lazy Aggregation:** Process only visible data
- [ ] **Caching:** Cache aggregates when possible

### Performance Targets
| Record Count | Strategy | Expected Load Time |
|-------------|----------|-------------------|
| <50k | Client-side virtualization | <2s |
| 50k-500k | Virtual scroll + defer update | 2-5s |
| 500k-5M | Server-side + paging | 3-8s |
| 5M+ | Server-side aggregation + cache | <5s |

### Best Practices
1. Test with realistic data volumes
2. Monitor memory usage: `performance.memory.usedJSHeapSize`
3. Use browser DevTools Performance tab
4. Profile drill-down operations
5. Cache computed aggregates
6. Implement server-side filtering
7. Use data compression on network

