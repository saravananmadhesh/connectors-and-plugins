# Server-Side Pivot Engine in ASP.NET MVC Pivot Table

## ⚠️ SECURITY NOTICE

**All remote data connections MUST use authenticated, configuration-based endpoints.** Never hardcode URLs or use untrusted data sources.

✅ **Required Security Controls:**
- Configuration-based URLs (Web.config, ConfigurationManager)
- Authentication and authorization (AuthorizeAttribute)
- HTTPS/SSL for all remote connections
- Parameterized queries for database access
- Input validation and sanitization

## Table of Contents
- [Overview](#overview)
- [Architecture & Benefits](#architecture--benefits)
- [Prerequisites & Setup](#prerequisites--setup)
- [PivotController Integration](#pivotcontroller-integration)
- [DataSourceSettings Configuration](#datasourcesettings-configuration)
- [Supported Data Sources](#supported-data-sources)
- [DataSource Implementation](#datasource-implementation)
- [GetData Method](#getdata-method)
- [PivotEngine Generic Class](#pivotengine-generic-class)
- [Report Configuration](#report-configuration)
- [Caching Strategy](#caching-strategy)
- [Performance Benefits](#performance-benefits)
- [Troubleshooting](#troubleshooting)

## Overview

The **server-side pivot engine** processes data aggregation, filtering, and sorting on the backend server instead of on the client browser. This enables analysis of massive datasets (millions of rows) that would overwhelm client-side processing.

**When to Use Server-Side Engine:**
- Dataset size > 100,000 rows
- Complex filtering/sorting on large fields
- Need for real-time data updates
- Sensitive data requiring server-side security
- Limited client-side browser memory
- Network bandwidth optimization

## Architecture & Benefits

### Server-Side Processing Flow

```
1. Client Browser
   ↓ (HTTP Request with Field Configuration)
2. PivotController.GetData()
   ↓ (Receives field configuration)
3. DataSource Manager
   ↓ (Reads from data source)
4. PivotEngine<T> Generic Class
   ↓ (Aggregates → Groups → Applies Filters/Sorts)
5. Memory Cache
   ↓ (Returns aggregated summary data)
6. Client Browser
   ↓ (Receives only summary - dramatically smaller payload)
7. Pivot Table Renders Summary Grid
```

### Performance Benefits

| Metric | Client-Side | Server-Side | Improvement |
|--------|---|---|---|
| **Data Volume** | 1M rows | 1M rows | Same source |
| **Network Payload** | ~50MB JSON | ~500KB aggregated | **99% smaller** |
| **Aggregation Time** | 10+ seconds | 2-3 seconds | **5x faster** |
| **Client Memory** | 200+ MB | ~10MB | **95% less** |
| **Browser Responsiveness** | Freezes | Responsive | Smooth |

### Advantages

✓ **Scalability**: Handle millions of records effortlessly
✓ **Performance**: Server CPU handles heavy lifting
✓ **Memory**: Client loads only summarized data
✓ **Security**: Raw data never leaves server
✓ **Bandwidth**: 99% reduction in network traffic
✓ **Functionality**: Virtual scrolling + paging support

## Prerequisites & Setup

### Required NuGet Packages

**Client-Side (ASP.NET MVC application):**
```bash
Install-Package Syncfusion.EJ2.MVC5 -Version 24.1.41
Install-Package Syncfusion.EJ2.PivotView -Version 24.1.41
```

**Server-Side (Pivot Engine):**
```bash
Install-Package Syncfusion.EJ2.Pivot -Version 24.1.41
Install-Package Syncfusion.Pivot.Engine -Version 24.1.41
Install-Package Newtonsoft.Json -Version 13.0.1
```

### Project Structure

```
YourProject/
├── Controllers/
│   └── PivotController.cs          // Handles aggregation requests
├── Models/
│   └── DataSource.cs               // Data source definitions
├── Data/
│   ├── sales-analysis.json         // Sample data files
│   ├── sales.csv
│   └── SalesDbContext.cs           // EF DbContext
├── Views/
│   └── PivotView.cshtml            // UI view
└── App_Data/
    └── [Data files location]
```

## PivotController Integration

### Download PivotController from GitHub

Syncfusion provides pre-built PivotController implementation:

1. **Option A: Download from Release Page**
   - URL: `https://github.com/SyncfusionExamples/ej2-pivottable-aspnetmvc-server`
   - Clone: `git clone https://github.com/SyncfusionExamples/ej2-pivottable-aspnetmvc-server.git`

2. **Option B: Manual Implementation**

```csharp
using Syncfusion.EJ2.Pivot;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

[ApiController]
[Route("api/[controller]")]
public class PivotController : ControllerBase
{
    private IMemoryCache _cache;
    private IWebHostEnvironment _hostingEnvironment;
    private DataSource _dataSource;

    public PivotController(IMemoryCache cache, IWebHostEnvironment hostingEnvironment)
    {
        _cache = cache;
        _hostingEnvironment = hostingEnvironment;
        _dataSource = new DataSource();
    }

    [HttpPost]
    [Route("post")]
    public async Task<object> Post([FromBody] PivotViewData data)
    {
        return await GetData(data.GetData);
    }

    private async Task<object> GetData(FetchData fetchData)
    {
        // Aggregation implementation here
        return null;
    }
}
```

## DataSourceSettings Configuration

### Enable Server-Side Rendering

**Web.config:**
```xml
<appSettings>
  <add key="PivotApi:BaseUrl" value="https://your-server.com/api/pivot/post" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.PivotUrl = System.Configuration.ConfigurationManager.AppSettings["PivotApi:BaseUrl"];
    return View();
}
```

**View:**
```csharp
@Html.EJS().PivotView("PivotView")
    .Height("300")
    .DataSourceSettings(dataSource => dataSource
        .Url((string)ViewBag.PivotUrl)                     // PivotController endpoint from config
        .Mode(Syncfusion.EJ2.PivotView.RenderMode.Server)  // Server-side mode
        .Type(DataSourceType.JSON)                          // Data type
        .Rows(rows => rows
            .Name("Region").Add()
            .Name("Country").Add())
        .Columns(columns => columns
            .Name("Year").Add())
        .Values(values => values
            .Name("Sales").Add()
            .Name("Profit").Add()))
    .ShowFieldList(true)
    .ShowGroupingBar(true)
    .Width("100%")
    .Render()
```

### Configuration Parameters

- **Url**: PivotController endpoint URL (must be accessible)
- **Mode**: Set to `RenderMode.Server` for server-side processing
- **Type**: Data source type (JSON, CSV, DataTable, Collection)
- **AllowServerPaging**: Enable server-side paging (optional)
- **AllowServerFiltering**: Enable server-side filtering (optional)

## Supported Data Sources

### 1. Collection (IEnumerable<T>)

**Use Case**: In-memory List<T> data, ADO.NET DataTable

```csharp
public class DataSource
{
    public List<SalesData> GetCollectionData()
    {
        List<SalesData> data = new List<SalesData>
        {
            new SalesData { Region = "East", Country = "USA", Year = 2023, Sales = 100000, Profit = 25000 },
            new SalesData { Region = "West", Country = "Canada", Year = 2023, Sales = 80000, Profit = 15000 },
            new SalesData { Region = "East", Country = "USA", Year = 2024, Sales = 120000, Profit = 35000 }
        };
        return data;
    }
}

public class SalesData
{
    public string Region { get; set; }
    public string Country { get; set; }
    public int Year { get; set; }
    public double Sales { get; set; }
    public double Profit { get; set; }
}
```

### 2. JSON (Local File)

**File**: `~/Data/sales-analysis.json`

```json
[
  { "Region": "East", "Country": "USA", "Year": 2023, "Sales": 100000, "Profit": 25000 },
  { "Region": "West", "Country": "Canada", "Year": 2023, "Sales": 80000, "Profit": 15000 }
]
```

**Server-Side Implementation:**

```csharp
public List<SalesData> ReadJSONData(string filePath)
{
    using (StreamReader reader = new StreamReader(filePath))
    {
        string json = reader.ReadToEnd();
        return Newtonsoft.Json.JsonConvert.DeserializeObject<List<SalesData>>(json);
    }
}
```

### 3. JSON (Remote URL)

**Fetch from CDN or remote server:**

```csharp
public List<SalesData> ReadRemoteJSONData(string remoteUrl)
{
    using (WebClient client = new WebClient())
    {
        string json = client.DownloadString(remoteUrl);
        return Newtonsoft.Json.JsonConvert.DeserializeObject<List<SalesData>>(json);
    }
}
```

### 4. CSV (Comma-Separated Values)

**File**: `~/Data/sales.csv`

```csv
Region,Country,Year,Sales,Profit
East,USA,2023,100000,25000
West,Canada,2023,80000,15000
```

**Server-Side Implementation:**

```csharp
public List<SalesData> ReadCSVData(string filePath)
{
    List<SalesData> data = new List<SalesData>();
    
    using (StreamReader reader = new StreamReader(filePath))
    {
        reader.ReadLine(); // Skip header
        string line;
        while ((line = reader.ReadLine()) != null)
        {
            string[] values = line.Split(',');
            data.Add(new SalesData
            {
                Region = values[0],
                Country = values[1],
                Year = int.Parse(values[2]),
                Sales = double.Parse(values[3]),
                Profit = double.Parse(values[4])
            });
        }
    }
    return data;
}
```

### 5. DataTable (ADO.NET)

**Use Case**: Direct SQL Server query results

```csharp
public DataTable ReadDataTableData()
{
    DataTable dt = new DataTable();
    dt.Columns.Add("Region");
    dt.Columns.Add("Country");
    dt.Columns.Add("Year");
    dt.Columns.Add("Sales");
    dt.Columns.Add("Profit");
    
    using (SqlConnection conn = new SqlConnection("connection_string"))
    {
        SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM Sales", conn);
        adapter.Fill(dt);
    }
    return dt;
}
```

### 6. Dynamic Objects

**Flexible schema approach:**

```csharp
public List<dynamic> ReadDynamicData()
{
    return new List<dynamic>
    {
        new { Region = "East", Country = "USA", Year = 2023, Sales = 100000, Profit = 25000 },
        new { Region = "West", Country = "Canada", Year = 2023, Sales = 80000, Profit = 15000 }
    };
}
```

## DataSource Implementation

### DataSource.cs Structure

```csharp
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;

public class DataSource
{
    private List<SalesData> _cachedData;
    
    public List<SalesData> GetCollectionData()
    {
        if (_cachedData == null)
        {
            _cachedData = new List<SalesData>
            {
                new SalesData { Region = "East", Country = "USA", Year = 2023, Sales = 100000, Profit = 25000 },
                new SalesData { Region = "West", Country = "Canada", Year = 2023, Sales = 80000, Profit = 15000 }
            };
        }
        return _cachedData;
    }
    
    public List<SalesData> ReadJSONData(string filePath)
    {
        using (StreamReader reader = new StreamReader(filePath))
        {
            string json = reader.ReadToEnd();
            return JsonConvert.DeserializeObject<List<SalesData>>(json);
        }
    }
    
    public List<SalesData> ReadCSVData(string filePath)
    {
        List<SalesData> data = new List<SalesData>();
        using (StreamReader reader = new StreamReader(filePath))
        {
            reader.ReadLine(); // Skip header
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                string[] values = line.Split(',');
                data.Add(new SalesData
                {
                    Region = values[0],
                    Country = values[1],
                    Year = int.Parse(values[2]),
                    Sales = double.Parse(values[3]),
                    Profit = double.Parse(values[4])
                });
            }
        }
        return data;
    }
}

public class SalesData
{
    public string Region { get; set; }
    public string Country { get; set; }
    public int Year { get; set; }
    public double Sales { get; set; }
    public double Profit { get; set; }
}
```

## GetData Method

### Request/Response Flow

**Client sends PivotViewData:**
```json
{
  "GetData": {
    "Hash": "user-123-session-456",
    "Rows": ["Region", "Country"],
    "Columns": ["Year"],
    "Values": [{"Name": "Sales", "Type": "Sum"}]
  }
}
```

**PivotController.GetData() Implementation:**

```csharp
public async Task<object> GetData(FetchData fetchData)
{
    string cacheKey = "dataSource" + fetchData.Hash;
    
    return await _cache.GetOrCreateAsync(cacheKey, async (cacheEntry) =>
    {
        cacheEntry.SetSize(1);
        cacheEntry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(60);
        
        PivotEngine<DataSource.SalesData> pivotEngine = new PivotEngine<DataSource.SalesData>();
        
        // Load data from appropriate source
        IEnumerable<DataSource.SalesData> data = _dataSource.GetCollectionData();
        
        // Process aggregation
        var pivot = pivotEngine.CreatePivotTableAsync(data, fetchData).Result;
        
        return pivot;  // Returns aggregated summary only
    });
}
```

## PivotEngine Generic Class

### Instantiation Examples

```csharp
// For Collection data
PivotEngine<SalesData> engine1 = new PivotEngine<SalesData>();

// For dynamic data
PivotEngine<dynamic> engine2 = new PivotEngine<dynamic>();
```

### CreatePivotTableAsync Method

```csharp
public async Task<PivotTableData> CreatePivotTableAsync<T>(
    IEnumerable<T> data, 
    FetchData fetchData)
{
    // 1. Group by row fields
    // 2. Group by column fields
    // 3. Aggregate values
    // 4. Apply filters
    // 5. Apply sorting
    // 6. Return PivotTableData
}
```

## Report Configuration

### Field Mapping Requirements

Field names MUST match DataSource columns:

```csharp
@Html.EJS().PivotView("PivotView")
    .DataSourceSettings(dataSource => dataSource
        .Url((string)ViewBag.PivotUrl)  // Use configuration from ViewBag
        .Mode(RenderMode.Server)
        .Rows(rows => rows
            .Name("Region").Add()      // Matches SalesData.Region
            .Name("Country").Add())    // Matches SalesData.Country
        .Columns(columns => columns
            .Name("Year").Add())       // Matches SalesData.Year
        .Values(values => values
            .Name("Sales").Add()       // Matches SalesData.Sales
            .Name("Profit").Add()))    // Matches SalesData.Profit
    .Render();
```

## Caching Strategy

### Per-User Caching with Hash

```csharp
// Each user gets unique cache entry based on Hash
string cacheKey = "dataSource" + fetchData.Hash;

_cache.GetOrCreateAsync(cacheKey, async (cacheEntry) =>
{
    cacheEntry.SetSize(1);
    cacheEntry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(60);
    
    // Load and aggregate data
    return aggregatedData;
});
```

**Caching Benefits:**
- Per-user isolation
- Automatic expiration (60 minutes)
- Memory controlled (1 unit per entry)
- Subsequent requests reuse previous aggregation

## Performance Benefits

### Before vs After Server-Side Engine

**Without Server-Side (Client-Side):**
- Transfer: 500 MB download
- Time: 2-5 minutes on slow networks
- Browser memory: 200+ MB
- User experience: Frozen browser

**With Server-Side Engine:**
- Transfer: 500 KB download
- Time: 1-2 seconds
- Browser memory: ~10 MB
- User experience: Responsive, smooth scrolling

## Streaming Data

For real-time data updates:

```csharp
public class StreamingPivotData
{
    [HttpGet("stream")]
    public IAsyncEnumerable<PivotData> StreamPivotData()
    {
        return _context.Sales
            .AsAsyncEnumerable()
            .GroupBy(x => new { x.Country, x.Year })
            .Select(g => new PivotData
            {
                Country = g.Key.Country,
                Year = g.Key.Year,
                Sales = g.Sum(x => x.Amount)
            });
    }
}
```

## Caching Server Results

```csharp
[HttpPost("aggregate")]
[ResponseCache(Duration = 3600)]  // Cache for 1 hour
public ActionResult GetAggregatedData([FromBody] PivotRequest request)
{
    // Implementation
}
```

## Database Optimization

### Materialized Views

```sql
CREATE MATERIALIZED VIEW mv_pivot_summary AS
SELECT 
    Country,
    Year,
    SUM(Amount) as Sales,
    COUNT(*) as Quantity
FROM Sales
GROUP BY Country, Year;

CREATE INDEX idx_country_year ON mv_pivot_summary(Country, Year);
```

### Query Optimization

```csharp
// Use indexes
var result = _context.Sales
    .Where(x => x.Year >= 2020)  // Filter first
    .GroupBy(x => new { x.Country, x.Year })
    .Select(g => new { /* ... */ })
    .ToList();
```

## Performance Metrics

| Scenario | Client-Side | Server-Side |
|----------|------------|-------------|
| 1M rows | Timeout | 2-3 seconds |
| Memory usage | 500MB+ | 50MB |
| Initial load | Very slow | Fast |
| Filtering | Slow | Instant |

## Best Practices

- Aggregate at source when possible
- Use materialized views for complex calculations
- Implement query pagination
- Cache frequently accessed aggregations
- Monitor query performance
- Test with production dataset size
