# Performance Best Practices

## Table of Contents
- [Overview](#overview)
- [When to Use](#when-to-use)
- [Improving Loading Performance with Large Datasets](#improving-loading-performance-with-large-datasets)
  - [Paging for Large Datasets](#paging-for-large-datasets)
  - [Row Virtualization](#row-virtualization)
  - [Infinite Scrolling](#infinite-scrolling)
  - [Column Virtualization](#column-virtualization)
  - [Browser Height Limitation in Virtual Scrolling](#browser-height-limitation-in-virtual-scrolling)
- [Optimizing Rendering with Templates](#optimizing-rendering-with-templates)
- [Reducing Initial Load Time with CRG](#reducing-initial-load-time-with-crg)
- [Updating Cell Values Without Server Calls](#updating-cell-values-without-server-calls)
- [Server-Side Data Operations](#server-side-data-operations)
- [Handling Large JSON Payloads](#handling-large-json-payloads)
- [Excel Export Limitations](#excel-export-limitations)

## Overview

This guide provides comprehensive strategies for optimizing Syncfusion Vue Grid performance, especially when dealing with large datasets and numerous columns. The Grid component renders each cell as a DOM element. For example, 10 rows with 10 columns create 100 DOM elements. To maintain optimal performance, limit the number of rendered rows and columns, and combine multiple optimization techniques based on your use case.

## When to Use

- **Large Datasets (1000+ rows)**: Implement virtualization, paging, or infinite scrolling
- **Many Columns (100+)**: Enable column virtualization for horizontal scrolling efficiency
- **Custom Row/Cell Content**: Use column templates instead of event handlers
- **Production Applications**: Apply CRG optimization for faster initial load
- **Live Updates**: Use setCellValue for client-side updates without server refresh
- **Massive Exports**: Consider CSV format instead of Excel for datasets exceeding 1,048,576 rows

## Improving Loading Performance with Large Datasets

### Paging for Large Datasets

Paging is the recommended approach for enhancing performance efficiency when dealing with large datasets. It displays grid data in segmented pages, reducing DOM elements and improving navigation responsiveness.

**How It Works:**
- Divides large dataset into manageable page sizes
- Only the current page data loads and renders
- Reduces initial render time and memory consumption
- Particularly effective for traditional data display scenarios

**Configuration Example (Vue 3):**

```javascript
import { GridComponent as EjsGrid, Page, Inject } from "@syncfusion/ej2-vue-grids";
import { computed } from "vue";

export default {
  components: { EjsGrid },
  setup() {
    const pageSettings = { pageSize: 25, pageCount: 5 };
    const data = computed(() => [...largeDataset]);
    
    return { data, pageSettings };
  },
  template: `
    <ejs-grid :dataSource="data" :pageSettings="pageSettings">
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' width='100'></e-column>
        <e-column field='CustomerName' headerText='Customer Name' width='150'></e-column>
      </e-columns>
      <e-inject :services="[Page]"></e-inject>
    </ejs-grid>
  `
};
```

**Benefits:**
- Clear navigation experience for users
- Optimal performance for datasets up to 10,000+ rows
- Familiar user interface pattern
- Minimal memory overhead

**When to Use:** Best for tabular data that users browse page-by-page, financial reports, administrative dashboards.

### Row Virtualization

Virtual scrolling efficiently handles large volumes of data by rendering only the visible rows within the Grid viewport rather than the entire dataset simultaneously. This approach optimizes rendering by dynamically loading only the needed rows.

**How It Works:**
- Grid calculates visible viewport area
- Dynamically loads/unloads rows based on scroll position
- Maintains scroll position smoothly
- Ideal for 10,000+ rows

**Configuration Example (Vue 3):**

```javascript
import { GridComponent as EjsGrid, VirtualScroll, Inject } from "@syncfusion/ej2-vue-grids";

export default {
  components: { EjsGrid },
  setup() {
    const enableVirtualization = true;
    const height = 400; // viewport height in pixels
    const data = computed(() => [...hugeDataset]); // 100,000+ rows
    
    return { data, enableVirtualization, height };
  },
  template: `
    <ejs-grid 
      :dataSource="data" 
      :enableVirtualization="enableVirtualization"
      :height="height"
    >
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' width='100'></e-column>
      </e-columns>
      <e-inject :services="[VirtualScroll]"></e-inject>
    </ejs-grid>
  `
};
```

**Combined Row and Column Virtualization:**
Enable both for grids with many rows and many columns, optimizing performance for extreme cases.

```javascript
const enableVirtualization = true;
const virtualScrollSettings = { mode: 'Both' }; // both row and column virtualization
```

**When to Use:** Real-time dashboards, analytical tools, log viewers showing thousands of records.

### Infinite Scrolling

Infinite scrolling implements a "load-on-demand" concept, fetching data only when needed. When the scrollbar reaches the end of the vertical scroller, a new data block automatically loads.

**How It Works:**
- Initial dataset loads normally
- User scrolls toward bottom
- System detects scroll position
- Next data block fetches and appends
- Continuous experience without pagination UI

**Configuration Example (Vue 3):**

```javascript
import { GridComponent as EjsGrid, Page, Inject } from "@syncfusion/ej2-vue-grids";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

export default {
  components: { EjsGrid },
  setup() {
    const data = new DataManager({
      url: 'url',
      adaptor: new UrlAdaptor()
    });
    
    const pageSettings = { 
      pageSize: 25,
      enableInfiniteScrolling: true 
    };
    
    return { data, pageSettings };
  },
  template: `
    <ejs-grid :dataSource="data" :pageSettings="pageSettings" height="400">
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' width='100'></e-column>
      </e-columns>
      <e-inject :services="[Page]"></e-inject>
    </ejs-grid>
  `
};
```

**Benefits:**
- Seamless experience with extensive datasets
- "Load-on-demand" concept
- Reduces initial page payload
- Better for mobile applications

**When to Use:** Social media feeds, search results, mobile-first applications, APIs with cursor-based pagination.

### Column Virtualization

Column virtualization optimizes rendering for grids with many columns by displaying only columns currently within the viewport. Users can scroll horizontally to view additional columns.

**How It Works:**
- Calculates viewport width
- Renders only visible columns
- Others load/unload during horizontal scroll
- Dramatically improves initial render for 100+ column grids

**Configuration Example (Vue 3):**

```javascript
import { GridComponent as EjsGrid, VirtualScroll, Inject } from "@syncfusion/ej2-vue-grids";

export default {
  components: { EjsGrid },
  setup() {
    const enableVirtualization = true;
    const data = computed(() => generateLargeDataset(1000, 150)); // 1000 rows, 150 columns
    
    return { data, enableVirtualization };
  },
  template: `
    <ejs-grid 
      :dataSource="data" 
      :enableVirtualization="enableVirtualization"
      height="600"
    >
      <!-- Column definitions for 150+ columns -->
      <e-columns>
        <e-column field='Column1' headerText='Column 1' width='100'></e-column>
        <!-- ... repeat for all columns ... -->
      </e-columns>
      <e-inject :services="[VirtualScroll]"></e-inject>
    </ejs-grid>
  `
};
```

**Combined Virtualization:**
```javascript
const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

// Enables virtualization for both rows and columns
const virtualScrollSettings = {
  mode: 'Both', // Row and Column virtualization
  enableCacheRow: true
};
```

**When to Use:** Financial dashboards with 100+ data points, comprehensive reporting tools, scientific data analysis applications.

### Browser Height Limitation in Virtual Scrolling

Virtual scrolling can face browser limitations due to maximum DOM scrollable heights. Different browsers have different height limits (typically 16 million pixels). When datasets exceed this limit, implement server-side virtualization with paging.

**Solution - Server-Side Virtualization with Paging:**

```javascript
import { GridComponent as EjsGrid, Page, Inject } from "@syncfusion/ej2-vue-grids";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

export default {
  components: { EjsGrid },
  setup() {
    // Use URL adaptor for server-side paging
    const data = new DataManager({
      url: 'url',
      adaptor: new UrlAdaptor()
    });
    
    // Configure paging for millions of records
    const pageSettings = { 
      pageSize: 50,
      pageCount: 5
    };
    
    return { data, pageSettings };
  },
  template: `
    <ejs-grid :dataSource="data" :pageSettings="pageSettings">
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' width='100'></e-column>
      </e-columns>
      <e-inject :services="[Page]"></e-inject>
    </ejs-grid>
  `
};
```

**Recommended Approach for Massive Datasets:**
- Combine server-side paging with URL adaptor
- Each page fetches fixed-size chunks (25-100 rows)
- Browser scrolls within page only
- Eliminates browser height limitations

When to Use: Datasets with millions of records, data warehouses exceeding browser limits.

## Optimizing Rendering with Templates

When integrating custom elements (images, buttons, formatted text) into columns, use the Column Template feature instead of event handlers like `rowDataBound` or `queryCellInfo`.

**Why Avoid Event Handlers:**
- Triggered for each row and cell rendering
- Introduces rendering delays
- Rendered elements persist, causing longer render times over time
- Performance degrades as grid grows

**Using Column Template (Recommended):**

```javascript
import { GridComponent as EjsGrid, Column } from "@syncfusion/ej2-vue-grids";

export default {
  components: { EjsGrid, Column },
  setup() {
    const data = computed(() => [...largeDataset]);
    
    return { data };
  },
  template: `
    <ejs-grid :dataSource="data">
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' width='100'></e-column>
        
        <!-- Template for custom rendering -->
        <e-column headerText='Status' width='100'>
          <template #default="{ data }">
            <span :class="'status-' + data.Status">{{ data.Status }}</span>
          </template>
        </e-column>
        
        <!-- Template for images -->
        <e-column headerText='Image' width='100'>
          <template #default="{ data }">
            <img :src="data.ImageUrl" width='30' height='30' />
          </template>
        </e-column>
        
        <!-- Template for formatted numbers -->
        <e-column field='Amount' headerText='Amount' width='100'>
          <template #default="{ data }">
            ${{ data.Amount.toFixed(2) }}
          </template>
        </e-column>
      </e-columns>
    </ejs-grid>
  `
};
```

**Benefits of Column Templates:**
- Efficient rendering process
- No event-based overhead
- Renders once during initial grid load
- Dramatically faster for large datasets

**Comparison:**

| Approach | Trigger | Performance | Use Case |
|----------|---------|-------------|----------|
| Column Template | Once during render | Excellent | Static/formatted content |
| rowDataBound Event | Every row render | Poor for 1000+ rows | Dynamic row-level changes |
| queryCellInfo Event | Every cell render | Very Poor | Rare cell-level changes |

## Reducing Initial Load Time with CRG

The default ej2.min.js script contains all Syncfusion component scripts, adding unnecessary bulk to projects. Use the Custom Resource Generator (CRG) to download only the scripts and CSS for needed components and their modules.

**How CRG Works:**
1. Visit crg.syncfusion.com/
2. Select only required components (Grid, not Calendar, Rich Text Editor, etc.)
3. Select only required modules (Paging, Sorting, not Print, Export, etc.)
4. Download custom bundle
5. Reference custom bundle instead of default ej2.min.js

**Configuration Example:**

```html
<!-- BEFORE: Using default bundle (2.5MB) -->
<script src="cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
<link rel="stylesheet" href="cdn.syncfusion.com/ej2/material.css">

<!-- AFTER: Using custom CRG bundle (~400KB for Grid only) -->
<script src="/dist/ej2-grid-custom.min.js"></script>
<link rel="stylesheet" href="/dist/ej2-grid-material.min.css">
```

**Vue Project Example:**

```javascript
// In main.js, import only grid-specific modules
import { GridComponent as EjsGrid, Page, Sort, Filter, Inject } from "@syncfusion/ej2-vue-grids";

// Install only grid plugin
import { GridPlugin } from "@syncfusion/ej2-vue-grids";

app.use(GridPlugin);
```

**Benefits:**
- Reduced initial script load: 2.5MB → ~400KB for Grid-only
- Faster page load and time-to-interactive
- Lower bandwidth consumption
- Improved mobile experience

**CRG Website:** "crg.syncfusion.com"

## Updating Cell Values Without Server Calls

Efficiently update cell values without triggering database refresh, especially beneficial for live update scenarios. Use the `setCellValue` method to update Grid UI only.

**When to Use:**
- Live data updates (stock prices, sensor readings)
- Client-side edits before batch submission
- Temporary value display
- Avoiding unnecessary server round-trips

**Configuration Example (Vue 3):**

```javascript
import { GridComponent as EjsGrid, Page, Edit, Inject } from "@syncfusion/ej2-vue-grids";
import { ref } from "vue";

export default {
  components: { EjsGrid },
  setup() {
    const grid = ref(null);
    const data = computed(() => [...dataset]);
    
    // Simulate live data update (e.g., from WebSocket)
    const updateCellValue = (rowIndex, columnField, newValue) => {
      grid.value.setCellValue(rowIndex, columnField, newValue);
    };
    
    // Example: Update price when WebSocket receives data
    const handlePriceUpdate = (rowIndex, price) => {
      updateCellValue(rowIndex, 'Price', price);
    };
    
    // Simulate WebSocket updates
    const simulateLiveUpdates = () => {
      setInterval(() => {
        const randomRow = Math.floor(Math.random() * data.value.length);
        const newPrice = (Math.random() * 1000).toFixed(2);
        handlePriceUpdate(randomRow, newPrice);
      }, 1000);
    };
    
    const buttonClick = () => {
      // Update specific cell without server call
      updateCellValue(0, 'OrderID', 'ORD-999');
      updateCellValue(0, 'Customer', 'Updated Customer');
    };
    
    return { 
      grid, 
      data, 
      updateCellValue, 
      buttonClick,
      simulateLiveUpdates 
    };
  },
  template: `
    <div>
      <button @click="buttonClick">Update Cell Values</button>
      <button @click="simulateLiveUpdates">Start Live Updates</button>
      
      <ejs-grid ref="grid" :dataSource="data">
        <e-columns>
          <e-column field='OrderID' headerText='Order ID' width='100'></e-column>
          <e-column field='Customer' headerText='Customer' width='150'></e-column>
          <e-column field='Price' headerText='Price' width='100'></e-column>
        </e-columns>
        <e-inject :services="[Page, Edit]"></e-inject>
      </ejs-grid>
    </div>
  `
};
```

**Benefits:**
- No server round-trip required
- Instant UI update
- Reduced network traffic
- Smooth live update experience

**Difference from Regular Editing:**
- `setCellValue`: Client-side only, no database write
- Regular Edit: Save to database via server call
- Use setCellValue for preview, live data, temporary changes

## Server-Side Data Operations

When using DataManager with server-side adaptors (OData, ODataV4, WebAPI, URL), optimize data operations by executing them in the suggested order on the server.

**Recommended Processing Order:**

1. **Filtering** - Reduce dataset first
2. **Sorting** - Order filtered results
3. **Aggregates** - Calculate on sorted data
4. **Paging** - Apply after calculations
5. **Grouping** - Final grouping structure

This order minimizes processing overhead and ensures accurate results.

**Example: ASP.NET Core Implementation**

```csharp
[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly OrderContext _context;
    
    public OrdersController(OrderContext context)
    {
        _context = context;
    }
    
    [HttpPost("orders")]
    public IActionResult GetOrders([FromBody] DataManagerRequest dm)
    {
        // Step 1: Filtering
        IQueryable<Order> query = _context.Orders;
        if (dm.Where != null && dm.Where.Count > 0)
        {
            query = QueryableExtensions.ApplyFilters(query, dm.Where);
        }
        
        // Step 2: Sorting
        if (dm.Sorted != null && dm.Sorted.Count > 0)
        {
            foreach (var sort in dm.Sorted)
            {
                query = sort.Direction == "Ascending"
                    ? query.OrderBy(p => EF.Property<object>(p, sort.Name))
                    : query.OrderByDescending(p => EF.Property<object>(p, sort.Name));
            }
        }
        
        // Step 3: Aggregates (optional)
        // Calculate on filtered/sorted data
        
        // Step 4: Paging
        var count = query.Count();
        query = query.Skip((dm.Skip ?? 0)).Take(dm.Take ?? 10);
        
        // Step 5: Grouping (optional)
        // Apply grouping if specified
        
        var data = query.ToList();
        return Ok(new { result = data, count = count });
    }
}
```

**Benefits:**
- Reduced server memory usage
- Faster query execution
- Accurate calculations
- Optimal database query performance

## Handling Large JSON Payloads

When passing large amounts of records between client and server, JSON serialization may encounter MaxJsonLength limitations.

**Issue:**
- Default MaxJsonLength: 2,097,152 characters (~2MB)
- Serialization fails for larger datasets
- Error: "The length of the string exceeds the value set on the maxJsonLength property"

**Solution 1: Configuration in web.config**

```xml
<configuration>
  <system.web.extensions>
    <scripting>
      <webServices>
        <jsonSerialization maxJsonLength="50000000"/>
      </webServices>
    </scripting>
  </system.web.extensions>
</configuration>
```

**Solution 2: C# Code Configuration**

```csharp
public class OrdersController : ControllerBase
{
    [HttpPost("orders")]
    public IActionResult GetOrders([FromBody] DataManagerRequest dm)
    {
        // Increase max JSON length in code
        var serializer = new System.Web.Script.Serialization.JavaScriptSerializer
        {
            MaxJsonLength = int.MaxValue
        };
        
        var orders = GetOrdersFromDatabase();
        var jsonResult = serializer.Serialize(orders);
        
        return Ok(orders);
    }
}
```

**Solution 3: ASP.NET Core Configuration**

```csharp
// In Startup.cs or Program.cs
services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.WriteIndented = true;
        options.JsonSerializerOptions.DefaultIgnoreCondition = 
            JsonIgnoreCondition.WhenWritingNull;
    });
```

**Best Practices:**
- Implement paging to avoid serializing massive datasets
- Use CSV export for datasets exceeding 100MB
- Consider compression for JSON responses
- Validate dataset size before serialization

## Excel Export Limitations

**Important:** Microsoft Excel supports maximum 1,048,576 rows per sheet. Exporting millions of records to Excel format will truncate data or fail.

**Excel Row Limits by Version:**
- Excel 2007 and later: 1,048,576 rows × 16,384 columns
- Excel 97-2003: 65,536 rows × 256 columns

**Solution: Use CSV Format for Large Exports**

```javascript
import { GridComponent as EjsGrid, Page, ExcelExport, PdfExport, Inject } from "@syncfusion/ej2-vue-grids";

export default {
  components: { EjsGrid },
  setup() {
    const grid = ref(null);
    const data = computed(() => [...millionRecordDataset]);
    
    // For large datasets exceeding Excel limits, export as CSV
    const exportAsCSV = () => {
      // CSV can handle unlimited rows
      // Implementation depends on backend CSV generation service
      const csvData = generateCSVFromGrid(grid.value.getCurrentViewRecords());
      downloadCSV(csvData);
    };
    
    const exportAsExcel = () => {
      // Use only for datasets < 1,048,576 rows
      if (data.value.length > 1048576) {
        alert('Dataset too large for Excel. Use CSV export instead.');
        return;
      }
      grid.value.excelExport();
    };
    
    return { grid, data, exportAsCSV, exportAsExcel };
  },
  template: `
    <ejs-grid ref="grid" :dataSource="data">
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' width='100'></e-column>
      </e-columns>
      <e-toolbar-settings :items="['ExcelExport', 'PdfExport']"></e-toolbar-settings>
      <e-inject :services="[Page, ExcelExport, PdfExport]"></e-inject>
    </ejs-grid>
    <button @click="exportAsCSV">Export as CSV (Large Datasets)</button>
  `
};
```

**Recommended Export Formats:**

| Dataset Size | Recommended Format | Reason |
|--------------|-------------------|---------|
| < 10,000 | Excel | Standard office format |
| 10,000 - 100,000 | CSV | Handles larger datasets |
| 100,000 - 1,000,000 | CSV | Better performance, unlimited rows |
| > 1,000,000 | CSV or Database Dump | Excel incompatible, CSV efficient |

**CSV Generation Best Practice:**

```javascript
const generateCSVFromGrid = (data) => {
  const headers = ['OrderID', 'Customer', 'Amount', 'Date'];
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(col => {
        const value = row[col];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"`
          : value;
      }).join(',')
    )
  ].join('\n');
  return csvContent;
};

const downloadCSV = (csvData) => {
  const blob = new Blob([csvData], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `GridExport_${new Date().getTime()}.csv`;
  link.click();
};
```

**Benefits of CSV:**
- Unlimited row support
- Smaller file size than Excel
- Better performance for large exports
- Standard format for data interchange
