# Server-Side Pivot Engine in Pivot View

## ⚠️ SECURITY NOTICE

**Server-side pivot engines MUST use authenticated, configuration-based endpoints.** Never hardcode API URLs.

✅ **Required Security Controls:**
- Configuration-based URLs (environment variables or config files)
- Authentication and authorization ([Authorize] attributes)
- HTTPS/SSL for all API connections
- Input validation on server endpoints
- Rate limiting and throttling

## Overview

The server-side pivot engine processes large datasets on a backend server instead of the client, reducing network traffic and improving performance. Only viewport data is sent to the client through Web API, enabling efficient analysis of millions of rows without browser limitations.

## When to Use

Use server-side engine when you need to:
- Process datasets with millions of rows
- Reduce network bandwidth usage
- Improve client-side performance
- Perform server-side aggregations
- Work with large relational databases
- Enable virtual scrolling on huge datasets
- Implement enterprise-scale reporting

## Architecture Overview

**Client Side (TypeScript):**
- Displays viewport data only
- Manages user interactions
- Sends configuration to server
- Renders pivot table

**Server Side (ASP.NET Core):**
- Processes entire dataset
- Performs aggregations
- Executes filters and sorts
- Sends only visible data to client

## Server-Side Application Setup

### Download and Install

1. **Clone repository** from GitHub:
```bash
git clone https://github.com/SyncfusionExamples/server-side-pivot-engine-for-pivot-table
cd PivotController
```

2. **Install dependencies**:
```bash
dotnet restore
```

3. **Build and run**:
```bash
dotnet run
```

The application hosts at `https://localhost:44350/api/pivot/post` by default.

### File Structure

```
PivotController/
├── Controllers/
│   └── PivotController.cs          # API endpoints
├── DataSource/
│   ├── DataSource.cs               # Model classes
│   ├── sales.csv                   # Sample CSV data
│   └── sales-analysis.json         # Sample JSON data
└── Program.cs                      # Application startup
```

## Basic TypeScript Configuration

Connect to server-side engine:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44350/api/pivot/post',  // Server endpoint
        mode: 'Server',                                  // Server-side mode
        type: 'JSON',                                    // Data type
        
        rows: [{ name: 'ProductID', caption: 'Product ID' }],
        columns: [{ name: 'Year', caption: 'Production Year' }],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Price', caption: 'Sold Amount' }
        ],
        formatSettings: [{ name: 'Price', format: 'C' }],
        filters: []
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Server-Side Data Sources

### Collection/List Data

Define model in C#:

```csharp
public class PivotViewData
{
    public string ProductID { get; set; }
    public string Country { get; set; }
    public string Product { get; set; }
    public double Sold { get; set; }
    public double Price { get; set; }
    public string Year { get; set; }
}
```

Provide data in controller:

```csharp
public async Task<object> GetData(FetchData param)
{
    var data = new PivotViewData().GetVirtualData();
    return await PivotEngine.GetAggregateAsync(param, (IEnumerable<PivotViewData>)data);
}
```

TypeScript configuration:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44350/api/pivot/post',
        mode: 'Server',
        type: 'JSON',  // Default for collection data
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    }
});
```

### JSON File Data

Load JSON from file:

```csharp
public List<PivotJSONData> ReadJSONData(string url)
{
    var stream = System.IO.File.OpenRead(url);
    var reader = new System.IO.StreamReader(stream);
    var content = reader.ReadToEnd();
    return JsonConvert.DeserializeObject<List<PivotJSONData>>(content);
}

public async Task<object> GetData(FetchData param)
{
    var data = new PivotViewData()
        .ReadJSONData("DataSource/sales-analysis.json");
    return await PivotEngine.GetAggregateAsync(param, (IEnumerable<PivotJSONData>)data);
}
```

### CSV File Data

Load and parse CSV:

```csharp
public List<PivotCSVData> ReadCSVData(string filePath)
{
    var data = new List<PivotCSVData>();
    var lines = System.IO.File.ReadAllLines(filePath);
    
    foreach (var line in lines.Skip(1)) // Skip header
    {
        var values = line.Split(',');
        data.Add(new PivotCSVData
        {
            Product = values[0],
            Sold = int.Parse(values[1]),
            Price = double.Parse(values[2]),
            Year = values[3]
        });
    }
    return data;
}
```

### Database Query Data

Query relational database:

```csharp
public List<PivotDatabaseData> GetDatabaseData()
{
    var data = new List<PivotDatabaseData>();
    
    using (var connection = new SqlConnection(connectionString))
    {
        connection.Open();
        var command = connection.CreateCommand();
        command.CommandText = "SELECT ProductID, Country, Sold, Price, Year FROM Sales";
        
        using (var reader = command.ExecuteReader())
        {
            while (reader.Read())
            {
                data.Add(new PivotDatabaseData
                {
                    ProductID = reader["ProductID"].ToString(),
                    Country = reader["Country"].ToString(),
                    Sold = (int)reader["Sold"],
                    Price = (double)reader["Price"],
                    Year = reader["Year"].ToString()
                });
            }
        }
    }
    return data;
}
```

## Advanced Server-Side Configuration

### Virtual Scrolling with Server Engine

Enable efficient large dataset handling:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44350/api/pivot/post',
        mode: 'Server',
        type: 'JSON',
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    
    // Virtual scrolling for performance
    enableVirtualization: true,
    
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Server-Side Filtering

Apply filters on server:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44350/api/pivot/post',
        mode: 'Server',
        type: 'JSON',
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }],
        
        // Filters applied on server
        filterSettings: [
            {
                name: 'Country',
                type: 'Include',
                items: ['USA', 'Canada']
            }
        ]
    },
    height: 350
});
```

### Custom Aggregations

Implement server-side custom calculations:

```csharp
public class CustomPivotEngine
{
    public object GetCustomAggregate(List<SalesData> data, string aggregationType)
    {
        switch (aggregationType)
        {
            case "Median":
                return data.Select(d => d.Amount).OrderBy(x => x)
                    .ElementAt(data.Count / 2);
            
            case "StdDev":
                var mean = data.Average(d => d.Amount);
                var variance = data.Average(d => Math.Pow(d.Amount - mean, 2));
                return Math.Sqrt(variance);
            
            default:
                return null;
        }
    }
}
```

## Performance Optimization

### Caching Server Results

```csharp
private readonly IMemoryCache _cache;

public async Task<object> GetData(FetchData param)
{
    var cacheKey = $"pivot_{param.Hash}";
    
    if (!_cache.TryGetValue(cacheKey, out object result))
    {
        var data = GetPivotData();
        result = await PivotEngine.GetAggregateAsync(param, data);
        
        _cache.Set(cacheKey, result, 
            new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromSeconds(300)));
    }
    
    return result;
}
```

### Paging on Server

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44350/api/pivot/post',
        mode: 'Server',
        type: 'JSON',
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    
    // Server-side paging
    enablePaging: true,
    pageSettings: { pageSize: 50 },
    
    height: 350
});
```

## Common Patterns

### Pattern 1: Simple Server Connection

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44350/api/pivot/post',
        mode: 'Server',
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    }
});
```

### Pattern 2: Virtual Scrolling + Server Engine

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44350/api/pivot/post',
        mode: 'Server',
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    enableVirtualization: true
});
```

### Pattern 3: Server + Filtering + Field List

```typescript
import { PivotView, FieldList } from '@syncfusion/ej2-pivotview';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44350/api/pivot/post',
        mode: 'Server',
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }],
        filterSettings: [{ name: 'Country' }]
    },
    showFieldList: true
});
```

## API Reference

### Server DataSourceSettings

| Property | Type | Example | Description |
|----------|------|---------|-------------|
| `url` | string | 'https://localhost:44350/api/pivot/post' | Server endpoint |
| `mode` | string | 'Server' | Processing mode |
| `type` | string | 'JSON' | Data type format |

## Troubleshooting

### Server Connection Failed

**Problem:** Cannot connect to server
- Verify server is running: `dotnet run`
- Check URL is correct: `https://localhost:44350/api/pivot/post`
- Verify firewall allows connection
- Check CORS settings if cross-domain

### Empty Pivot Table

**Problem:** Connected but no data displayed
- Verify rows, columns, values are configured
- Check field names match exactly (case-sensitive)
- Verify data source has data
- Check server logs for errors

### Performance Still Slow

**Problem:** Server-side still slow with large data
- Enable virtual scrolling
- Add caching for repeated queries
- Optimize database queries
- Consider data compression
- Monitor server CPU/memory usage

## Best Practices

1. **Validate server endpoint** - Test connectivity before deployment
2. **Implement caching** - Reduce redundant queries
3. **Enable virtual scrolling** - For large result sets
4. **Optimize queries** - Profile and tune database queries
5. **Monitor performance** - Track server response times
6. **Secure endpoints** - Implement authentication/authorization
7. **Handle errors gracefully** - Provide user feedback
8. **Scale infrastructure** - Plan for growth in data volume


