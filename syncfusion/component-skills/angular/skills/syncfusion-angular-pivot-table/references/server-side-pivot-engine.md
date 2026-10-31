# Server-Side Pivot Engine

## ⚠️ SECURITY NOTICE

Server-side pivot engine implementations MUST include proper security measures:

✅ **Required Security Controls:**
- Authentication & Authorization (JWT, OAuth, etc.)
- Input validation and sanitization
- Rate limiting to prevent abuse
- HTTPS/TLS encryption
- CORS configuration
- API key management
- Request logging and monitoring

❌ **Security Risks:**
- Never expose unprotected endpoints
- Never trust client-provided data without validation
- Never skip authentication for "internal" APIs
- Never use HTTP for sensitive data

See the [Security & Authentication](#security--authentication) section for implementation details.

## Table of Contents
- [Overview](#overview)
- [When to Use Server-Side Engine](#when-to-use-server-side-engine)
- [Setup Prerequisites](#setup-prerequisites)
- [Angular Client Configuration](#angular-client-configuration)
- [Server-Side Data Sources](#server-side-data-sources)
- [Virtual Scrolling Integration](#virtual-scrolling-integration)
- [Export Operations](#export-operations)
- [Security & Authentication](#security--authentication)
- [Performance Comparison](#performance-comparison)
- [Troubleshooting](#troubleshooting)

---

## Overview

The server-side Pivot Engine processes data on an ASP.NET Core backend instead of the client, enabling efficient handling of large datasets (100K+ rows). Only viewport data is sent to the client, reducing network traffic and improving rendering performance.

**Key Benefits:**
- Handles millions of rows without client-side performance degradation
- Processes aggregation, filtering, sorting, grouping on server
- Only renders visible data to browser
- Works seamlessly with virtual scrolling
- Reduces memory consumption on client
- Supports multiple data source types

**When NOT to Use:**
- Small datasets (<50K rows) - Client-side processing sufficient
- Offline-first applications - Requires network connection
- Low-latency operations - Network calls add latency

---

## When to Use Server-Side Engine

| Scenario | Recommendation | Reason |
|----------|---|---|
| **Dataset: >100K rows** | ✅ **Use Server-Side** | Client processing becomes slow |
| **Dataset: 50K-100K rows** | ✅ **Recommended** | Better performance on client |
| **Dataset: <50K rows** | ❌ **Use Client-Side** | Simpler setup, faster local operations |
| **Real-time filtering/sorting** | ✅ **Server-Side** | Reduces client processing |
| **Multiple concurrent users** | ✅ **Server-Side** | Better resource distribution |
| **Limited client memory** | ✅ **Server-Side** | Only viewport in memory |
| **Complex aggregations** | ✅ **Server-Side** | Server handles heavy lifting |
| **Offline capability needed** | ❌ **Client-Side** | Server-side requires connection |

---

## Setup Prerequisites

### Required Software
- ASP.NET Core 3.1 or higher
- Visual Studio 2019 or later
- Angular 12+ with TypeScript
- Syncfusion.Pivot.Engine NuGet package

### Step 1: Download Server-Side Application

1. Clone or download the server-side example:
   ```bash
   git clone https://github.com/SyncfusionExamples/server-side-pivot-engine-for-pivot-table.git
   ```

2. Open **PivotController** project in Visual Studio

3. NuGet will automatically restore packages including:
   - `Syncfusion.Pivot.Engine` - Server-side processing
   - `Syncfusion.ExcelExport.AspNetCore` - Export functionality
   - Required data access libraries

### Step 2: Server Application Structure

**Key Files:**
- **Controllers/PivotController.cs** - Handles client requests and server operations
- **DataSource/DataSource.cs** - Defines data source models (PivotViewData, PivotJSONData, etc.)
- **DataSource/sales.csv** - Sample CSV data
- **DataSource/sales-analysis.json** - Sample JSON data

### Step 3: Run Server Locally

```bash
# In Visual Studio: Press F5 or Ctrl+F5
# Server hosts at: https://localhost:44350/api/pivot/post
```

Verify server is running by checking the URL in browser or Postman.

---

## Angular Client Configuration

### Basic Setup

Set `mode: 'Server'` and specify server URL:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
  selector: 'app-pivot-server',
  template: `<ejs-pivotview [dataSourceSettings]="dataSourceSettings"></ejs-pivotview>`
})
export class AppComponent implements OnInit {
  public dataSourceSettings: DataSourceSettingsModel;

  ngOnInit(): void {
    this.dataSourceSettings = {
      // CRITICAL: mode = 'Server'
      mode: 'Server',
      // Point to running server-side controller
      url: 'https://localhost:44350/api/pivot/post',
      
      // Define report structure
      rows: [
        { name: 'Country', caption: 'Country' },
        { name: 'Region', caption: 'Region' }
      ],
      columns: [
        { name: 'Year', caption: 'Production Year' }
      ],
      values: [
        { name: 'Sales', caption: 'Sales Amount', type: 'Sum' },
        { name: 'Quantity', caption: 'Units Sold', type: 'Count' }
      ],
      
      // Format numeric values
      formatSettings: [
        { name: 'Sales', format: 'C' }  // Currency format
      ]
    };
  }
}
```

### Configuration Properties

**Essential Properties:**
- `mode: 'Server'` - Enable server-side processing (REQUIRED)
- `url: string` - Server endpoint URL (REQUIRED)
- `type: 'JSON'|'CSV'` - Data source type (default: JSON)
- `rows/columns/values` - Report configuration

**Performance Properties:**
- `enableVirtualization: true` - Enable virtual scrolling
- `virtualRowHeight: 36` - Row height in virtual mode
- `virtualColumnHeight: 36` - Column header height

---

## Server-Side Data Sources

### Collection-Based Data Source

**Server-Side Code (DataSource.cs):**

```csharp
public class PivotViewData
{
    public string ProductID { get; set; }
    public string Country { get; set; }
    public string Product { get; set; }
    public double Sold { get; set; }
    public double Price { get; set; }
    public string Year { get; set; }

    // Generate sample collection data
    public List<PivotViewData> GetVirtualData()
    {
        List<PivotViewData> data = new List<PivotViewData>();
        for (int i = 1; i <= 100; i++)
        {
            data.Add(new PivotViewData
            {
                ProductID = "PRO-" + (100 + i),
                Country = GetRandomCountry(),
                Product = GetRandomProduct(),
                Year = GetRandomYear(),
                Sold = (i * 15) + 10,
                Price = (3.4 * i) + 500
            });
        }
        return data;
    }
}
```

**Server-Side Controller (PivotController.cs):**

```csharp
private PivotEngine<DataSource.PivotViewData> PivotEngine = 
    new PivotEngine<DataSource.PivotViewData>();

public async Task<object> GetData(FetchData param)
{
    return await _cache.GetOrCreateAsync("dataSource" + param.Hash,
        async (cacheEntry) =>
        {
            cacheEntry.SetSize(1);
            cacheEntry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(60);
            
            // Return collection data source
            return new DataSource.PivotViewData().GetVirtualData();
        });
}
```

**Angular Configuration:**

```typescript
this.dataSourceSettings = {
    url: 'https://localhost:44350/api/pivot/post',
    mode: 'Server',
    type: 'JSON',  // Collection → JSON type
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sold', type: 'Sum' }]
};
```

---

### JSON Data Source (Local File)

**Server-Side Code:**

```csharp
public class PivotJSONData
{
    public string Date { get; set; }
    public string Sector { get; set; }
    public string EnerType { get; set; }
    public int PowUnits { get; set; }
    public int ProCost { get; set; }

    // Read JSON from file
    public List<PivotJSONData> ReadJSONData(string filePath)
    {
        using (StreamReader reader = new StreamReader(filePath))
        {
            string json = reader.ReadToEnd();
            return JsonConvert.DeserializeObject<List<PivotJSONData>>(json);
        }
    }
}
```

**Controller:**

```csharp
private PivotEngine<DataSource.PivotJSONData> PivotEngine = 
    new PivotEngine<DataSource.PivotJSONData>();

public async Task<object> GetData(FetchData param)
{
    return await _cache.GetOrCreateAsync("dataSource" + param.Hash,
        async (cacheEntry) =>
        {
            cacheEntry.SetSize(1);
            cacheEntry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(60);
            
            // Load local JSON file
            string path = _hostingEnvironment.ContentRootPath + 
                         "/DataSource/sales-analysis.json";
            return new DataSource.PivotJSONData().ReadJSONData(path);
        });
}
```

**Angular Configuration:**

```typescript
this.dataSourceSettings = {
    url: 'https://localhost:44350/api/pivot/post',
    mode: 'Server',
    type: 'JSON',
    rows: [{ name: 'EneSource', caption: 'Energy Source' }],
    columns: [{ name: 'EnerType', caption: 'Energy Type' }],
    values: [{ name: 'PowUnits', type: 'Sum' }],
    formatSettings: [{ name: 'ProCost', format: 'C' }]
};
```

---

### JSON Data Source (Remote URL)

**Server-Side Code:**

```csharp
public async Task<object> GetData(FetchData param)
{
    return await _cache.GetOrCreateAsync("dataSource" + param.Hash,
        async (cacheEntry) =>
        {
            cacheEntry.SetSize(1);
            cacheEntry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(60);
            
            // Load from CDN or remote server
            string remoteUrl = "http://cdn.syncfusion.com/data/sales-analysis.json";
            return new DataSource.PivotJSONData().ReadJSONData(remoteUrl);
        });
}
```

---

### CSV Data Source

**Server-Side Code:**

```csharp
public class PivotCSVData
{
    public string Region { get; set; }
    public string Country { get; set; }
    public string ItemType { get; set; }
    public int UnitsSold { get; set; }
    public double UnitPrice { get; set; }

    public List<PivotCSVData> ReadCSVData(string csvUrl)
    {
        List<PivotCSVData> data = new List<PivotCSVData>();
        using (StreamReader reader = new StreamReader(
            new WebClient().OpenRead(csvUrl)))
        {
            string line;
            bool isHeader = true;
            while ((line = reader.ReadLine()) != null)
            {
                if (isHeader) { isHeader = false; continue; }
                
                string[] fields = line.Split(',');
                data.Add(new PivotCSVData
                {
                    Region = fields[0],
                    Country = fields[1],
                    ItemType = fields[2],
                    UnitsSold = int.Parse(fields[3]),
                    UnitPrice = double.Parse(fields[4])
                });
            }
        }
        return data;
    }
}
```

**Controller:**

```csharp
private PivotEngine<DataSource.PivotCSVData> PivotEngine = 
    new PivotEngine<DataSource.PivotCSVData>();

public async Task<object> GetData(FetchData param)
{
    return await _cache.GetOrCreateAsync("dataSource" + param.Hash,
        async (cacheEntry) =>
        {
            cacheEntry.SetSize(1);
            cacheEntry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(60);
            
            // Load local CSV
            string path = _hostingEnvironment.ContentRootPath + "/DataSource/sales.csv";
            return new DataSource.PivotCSVData().ReadCSVData(path);
        });
}
```

**Angular Configuration:**

```typescript
this.dataSourceSettings = {
    url: 'https://localhost:44350/api/pivot/post',
    mode: 'Server',
    type: 'CSV',
    rows: [{ name: 'ItemType', caption: 'Item Type' }],
    columns: [{ name: 'Region', caption: 'Region' }],
    values: [{ name: 'UnitsSold', type: 'Sum' }],
    formatSettings: [{ name: 'UnitPrice', format: 'C' }]
};
```

---

### DataTable Data Source

**Server-Side Code:**

```csharp
public class BusinessObjectsDataView
{
    public DataTable GetDataTable()
    {
        DataTable dt = new DataTable("SalesData");
        
        // Define columns
        dt.Columns.Add("ProductID", typeof(string));
        dt.Columns.Add("Country", typeof(string));
        dt.Columns.Add("Sales", typeof(double));
        dt.Columns.Add("Year", typeof(string));
        
        // Get data from database
        List<PivotViewData> data = new PivotViewData().GetVirtualData();
        
        // Add rows to DataTable
        foreach (PivotViewData row in data)
        {
            dt.Rows.Add(row.ProductID, row.Country, row.Sold, row.Year);
        }
        
        return dt;
    }
}
```

**Controller:**

```csharp
private PivotEngine<DataSource.PivotViewData> PivotEngine = 
    new PivotEngine<DataSource.PivotViewData>();

public async Task<object> GetData(FetchData param)
{
    return await _cache.GetOrCreateAsync("dataSource" + param.Hash,
        async (cacheEntry) =>
        {
            cacheEntry.SetSize(1);
            cacheEntry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(60);
            
            return new DataSource.BusinessObjectsDataView().GetDataTable();
        });
}
```

---

## Virtual Scrolling Integration

Server-side engine works optimally with virtual scrolling to handle massive datasets.

### Configuration

```typescript
@Component({
  selector: 'app-virtual-scroll',
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [gridSettings]="gridSettings">
  </ejs-pivotview>`
})
export class AppComponent implements OnInit {
  dataSourceSettings: DataSourceSettingsModel;
  gridSettings: any;

  ngOnInit(): void {
    this.gridSettings = {
      // Enable virtual scrolling
      enableVirtualization: true,
      // Virtual row height (pixels)
      virtualRowHeight: 36
    };

    this.dataSourceSettings = {
      url: 'https://localhost:44350/api/pivot/post',
      mode: 'Server',
      
      // Virtual scrolling works with server-side to render only visible rows
      enableVirtualization: true,
      
      rows: [{ name: 'Country' }],
      columns: [{ name: 'Year' }],
      values: [{ name: 'Sales', type: 'Sum' }]
    };
  }
}
```

### Performance with Virtual Scrolling

| Dataset Size | Without Virtual | With Virtual |
|---|---|---|
| 100K rows | Slow initial load, responsive | Fast, smooth scrolling |
| 1M rows | Very slow, browser lag | Responsive, handles easily |
| 10M+ rows | Browser crashes | Efficient, scalable |

---

## Export Operations

### Excel Export

**Angular:**

```typescript
import { ViewChild } from '@angular/core';
import { PivotView } from '@syncfusion/ej2-angular-pivotview';

@Component({
  selector: 'app-export',
  template: `
    <button (click)="onExcelExport()">Export to Excel</button>
    <ejs-pivotview 
      #pivotGrid
      [dataSourceSettings]="dataSourceSettings"
      [allowExcelExport]="true">
    </ejs-pivotview>
  `
})
export class AppComponent {
  @ViewChild('pivotGrid') pivotGrid: PivotView;

  onExcelExport() {
    this.pivotGrid.excelExport();
  }
}
```

**Server-Side (PivotController.cs):**

```csharp
private ExcelExport excelExport = new ExcelExport();

public async Task<object> Post([FromBody] object args)
{
    FetchData param = JsonConvert.DeserializeObject<FetchData>(args.ToString());
    
    if (param.Action == "onExcelExport" || param.Action == "onCsvExport")
    {
        EngineProperties engine = await GetEngine(param);
        
        if (param.Action == "onExcelExport")
        {
            return excelExport.ExportToExcel("Excel", engine, null, 
                                           param.ExcelExportProperties);
        }
        else
        {
            return excelExport.ExportToExcel("CSV", engine, null, 
                                           param.ExcelExportProperties);
        }
    }
    else
    {
        return await GetPivotValues(param);
    }
}
```

### Export with Header & Footer

```typescript
import { ExcelExportProperties } from '@syncfusion/ej2-grids';

onExcelExportWithHeaders() {
    let exportProperties: ExcelExportProperties = {
        header: {
            headerRows: 2,
            rows: [
                { cells: [{ colSpan: 13, value: "Sales Report 2024", 
                  style: { fontSize: 20, bold: true, hAlign: 'Center' } }] }
            ]
        },
        footer: {
            footerRows: 2,
            rows: [
                { cells: [{ colSpan: 13, value: "Thank you for your business!", 
                  style: { bold: true, hAlign: 'Center' } }] }
            ]
        }
    };
    
    this.pivotGrid.excelExport(exportProperties);
}
```

### Export as Native Pivot

Export to Excel as interactive pivot table:

```typescript
onExportAsPivot() {
    this.pivotGrid.exportAsPivot();  // Angular
}
```

**Server-Side:**

```csharp
private PivotExportEngine<PivotViewData> pivotExport = 
    new PivotExportEngine<PivotViewData>();

public async Task<object> Post([FromBody] object args)
{
    // ... other actions ...
    else if (param.Action == "onPivotExcelExport" || 
             param.Action == "onPivotCsvExport")
    {
        EngineProperties engine = await GetEngine(param);
        return pivotExport.ExportAsPivot(
            param.Action == "onPivotExcelExport" ? ExportType.Excel : ExportType.CSV,
            engine, param);
    }
}
```

---

## Security & Authentication

### Add Authentication Headers

Use `beforeServiceInvoke` to add authorization tokens:

```typescript
@Component({
  selector: 'app-secure-pivot'
})
export class AppComponent implements OnInit {
  @ViewChild('pivotGrid') pivotGrid: PivotView;

  ngOnInit(): void {
    this.dataSourceSettings = {
      url: 'https://api.company.com/pivot/data',
      mode: 'Server',
      // ... configuration
    };
  }

  // This event fires before every server request
  beforeServiceInvoke(args: BeforeServiceInvokeEventArgs) {
    // Get token from secure storage (NOT from localStorage)
    const token = this.getTokenFromSecureStore();
    
    // Add authorization header
    if (args.internalProperties.headers) {
        args.internalProperties.headers['Authorization'] = `Bearer ${token}`;
    } else {
        args.internalProperties.headers = {
            'Authorization': `Bearer ${token}`
        };
    }
  }

  private getTokenFromSecureStore(): string {
    // Retrieve JWT token from:
    // - SessionStorage (cleared on browser close)
    // - In-memory store
    // - Secure HTTP-only cookie via backend
    // NEVER hard-code or use localStorage for sensitive tokens
    return sessionStorage.getItem('authToken');
  }
}
```

**In Template:**

```html
<ejs-pivotview 
  #pivotGrid
  [dataSourceSettings]="dataSourceSettings"
  (beforeServiceInvoke)="beforeServiceInvoke($event)">
</ejs-pivotview>
```

### Server-Side Authentication

```csharp
[Authorize]  // Require authentication
[Route("/api/pivot/post")]
[HttpPost]
public async Task<object> Post([FromBody] object args)
{
    // Validate JWT token from Authorization header
    var token = Request.Headers["Authorization"].ToString();
    
    // Verify token and get user identity
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    
    if (string.IsNullOrEmpty(userId))
    {
        return Unauthorized();
    }
    
    // Process request with user context
    FetchData param = JsonConvert.DeserializeObject<FetchData>(args.ToString());
    // ... rest of implementation
}
```

---

## Performance Comparison

| Aspect | Client-Side | Server-Side |
|---|---|---|
| **Dataset Size** | <100K rows | 100K - 10M+ rows |
| **Initial Load** | Depends on dataset | Fast (only viewport) |
| **Filtering Speed** | Instant (local) | 100-500ms (network) |
| **Sorting Speed** | Instant | 100-500ms |
| **Memory Usage** | Full dataset in RAM | Minimal (viewport only) |
| **Network Usage** | One large transfer | Multiple small transfers |
| **Setup Complexity** | Simple | Moderate |
| **Scalability** | Limited to ~100K | Unlimited |
| **Offline Support** | Yes | No |

**Recommendation:**
- **<50K rows** → Client-side
- **50K-100K** → Evaluate case-by-case
- **>100K** → Server-side mandatory

---

## Troubleshooting

### Issue: 401 Unauthorized Errors

**Cause:** Missing or invalid authentication token

**Solution:**
```typescript
// Implement beforeServiceInvoke to add headers
(beforeServiceInvoke)="beforeServiceInvoke($event)"

beforeServiceInvoke(args: any) {
    const token = this.authService.getToken();
    args.internalProperties.headers['Authorization'] = `Bearer ${token}`;
}
```

### Issue: CORS Errors

**Cause:** Server doesn't allow cross-origin requests

**Server Fix:**
```csharp
services.AddCors(options => {
    options.AddPolicy("AllowAngularApp", builder => {
        builder.WithOrigins("https://localhost:4200")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});

app.UseCors("AllowAngularApp");
```

### Issue: Slow Server Response

**Causes & Solutions:**
1. **Large dataset without paging** → Enable virtual scrolling
2. **Expensive calculations** → Use indexed columns
3. **Database slow** → Add proper indexes
4. **Network latency** → Minimize data transfer
5. **Memory cache expired** → Increase cache duration

```csharp
// Increase cache duration
cacheEntry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(120);
```

### Issue: Data Not Loading

**Debug Steps:**
1. Verify server is running: `https://localhost:44350/api/pivot/post`
2. Check browser DevTools Network tab for requests
3. Verify URL in Angular matches server URL
4. Check server logs for exceptions
5. Verify authentication headers if using security

**Verify Request:**
```bash
# Using curl or Postman
curl -X POST "https://localhost:44350/api/pivot/post" \
  -H "Content-Type: application/json" \
  -d '{"hash":"test"}'
```

### Issue: Memory Leaks with Large Datasets

**Symptoms:** Browser becomes slow after prolonged use

**Solutions:**
1. Enable virtual scrolling
2. Increase memory cache expiration carefully
3. Use server-side compression
4. Monitor browser memory in DevTools

---

## Best Practices

1. **Use Virtual Scrolling** - Always enable for 100K+ rows
2. **Implement Caching** - Cache data and engine properties on server
3. **Add Authentication** - Secure server endpoints
4. **Monitor Performance** - Track response times in production
5. **Optimize Queries** - Use indexed columns and filtered datasets
6. **Handle Errors** - Implement retry logic for network failures
7. **Document Setup** - Keep deployment guide updated
8. **Test Scalability** - Load test with realistic dataset sizes
