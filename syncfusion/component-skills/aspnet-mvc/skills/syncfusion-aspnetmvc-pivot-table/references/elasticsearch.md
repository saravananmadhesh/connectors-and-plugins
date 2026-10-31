# Elasticsearch Database Binding in ASP.NET MVC Pivot Table

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
- [Prerequisites & Setup](#prerequisites--setup)
- [Connection Configuration](#connection-configuration)
- [Web API Service Implementation](#web-api-service-implementation)
- [Retrieving Data from Elasticsearch](#retrieving-data-from-elasticsearch)
- [Search Query Patterns](#search-query-patterns)
- [JSON Serialization](#json-serialization)
- [Pivot Table Configuration](#pivot-table-configuration)
- [Index Management](#index-management)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Overview

Elasticsearch is a distributed search and analytics engine built on Apache Lucene, designed for high-performance full-text search and real-time analytics. The Syncfusion Pivot Table connects to Elasticsearch through the NEST client library for searching and analyzing indexed data.

**Why Elasticsearch:** Full-text search, real-time analytics, distributed architecture, complex aggregations, high scalability.

**Ideal Use Cases:**
- Log and event data analysis
- Full-text search analytics
- Real-time metrics and monitoring
- Application performance monitoring (APM)
- Time-series data analytics

## Prerequisites & Setup

### Required NuGet Packages

```bash
Install-Package NEST -Version 7.20.0
Install-Package Elasticsearch.Net -Version 7.20.0
Install-Package Newtonsoft.Json -Version 13.0.3
```

### Installation Steps

1. Open **Package Manager Console**
2. Execute the NuGet commands above
3. Ensure NEST version 7.x for Elasticsearch 7.x compatibility

### System Requirements

- .NET Core 3.1+ or .NET Framework 4.6.2+
- Visual Studio 2019 or higher
- Elasticsearch 7.x or 8.x
- Kibana (optional, for index management)

## Connection Configuration

### Connection String Setup

```csharp
// Single Node Connection
var settings = new ConnectionSettings(new Uri("http://localhost:9200"));
var client = new ElasticClient(settings);

// Multiple Nodes (Cluster)
var nodes = new Uri[]
{
    new Uri("http://cluster-node-1:9200"),
    new Uri("http://cluster-node-2:9200"),
    new Uri("http://cluster-node-3:9200")
};
var connectionPool = new StaticConnectionPool(nodes);
var settings = new ConnectionSettings(connectionPool);
var client = new ElasticClient(settings);

// With Authentication
var settings = new ConnectionSettings(new Uri("https://elasticsearch-server:9200"))
    .BasicAuthentication("elastic", "password123")
    .ServerCertificateValidationCallback(CertificateValidations.AllowAll);
var client = new ElasticClient(settings);
```

### Configuration in Startup

```csharp
// In Startup.cs ConfigureServices
services.AddSingleton<IElasticClient>(serviceProvider =>
{
    var settings = new ConnectionSettings(new Uri("http://localhost:9200"))
        .DefaultIndex("sales-data");
    return new ElasticClient(settings);
});
```

## Web API Service Implementation

### Create ASP.NET Core Web API

```csharp
// File → New → Project → ASP.NET Core Web API
```

### Complete PivotController Implementation

```csharp
using Microsoft.AspNetCore.Mvc;
using Nest;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        private readonly IElasticClient _elasticClient;
        private const string IndexName = "sales-data";

        public PivotController(IElasticClient elasticClient)
        {
            _elasticClient = elasticClient;
        }

        [HttpGet(Name = "GetElasticsearchResult")]
        public object Get()
        {
            List<SalesDocument> documents = FetchElasticsearchData();
            return JsonConvert.SerializeObject(documents);
        }

        private List<SalesDocument> FetchElasticsearchData()
        {
            try
            {
                // Search with size limit for Pivot Table
                var searchResponse = _elasticClient.Search<SalesDocument>(s => s
                    .Index(IndexName)
                    .Size(10000)
                    .Query(q => q.MatchAll())
                );

                if (!searchResponse.IsValid)
                {
                    throw new ApplicationException($"Elasticsearch error: {searchResponse.ServerError?.Error?.Reason}");
                }

                return searchResponse.Documents.ToList();
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"Error fetching Elasticsearch data: {ex.Message}", ex);
            }
        }
    }

    // POCO class matching Elasticsearch document structure
    public class SalesDocument
    {
        public string Id { get; set; }
        public string CustomerName { get; set; }
        public string Region { get; set; }
        public string Product { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal SalesAmount { get; set; }
        public int Quantity { get; set; }
    }
}
```

## Retrieving Data from Elasticsearch

### Basic Search Query

```csharp
// Search all documents
var searchResponse = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(10000)
    .Query(q => q.MatchAll())
);

var documents = searchResponse.Documents.ToList();
```

### Filter Query (WHERE Equivalent)

```csharp
// Single filter condition
var searchResponse = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(10000)
    .Query(q => q
        .Term(f => f.Region, "North America")
    )
);

// Multiple filters (must match all)
var searchResponse = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(10000)
    .Query(q => q
        .Bool(b => b
            .Must(
                m => m.Term(f => f.Region, "North America"),
                m => m.Range(r => r.Field(f => f.SalesAmount).GreaterThan(1000))
            )
        )
    )
);
```

### Date Range Query

```csharp
// Query data within date range
var searchResponse = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(10000)
    .Query(q => q
        .Range(r => r
            .Field(f => f.SaleDate)
            .GreaterThanOrEquals(DateTime.Now.AddYears(-1))
            .LessThan(DateTime.Now)
        )
    )
);
```

### Full-Text Search

```csharp
// Search customer names
var searchResponse = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(10000)
    .Query(q => q
        .Match(m => m
            .Field(f => f.CustomerName)
            .Query("John")
        )
    )
);
```

### Sorting and Limit Results

```csharp
// Sort by sales amount, limit results
var searchResponse = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(5000)
    .Sort(sort => sort
        .Descending(f => f.SalesAmount)
    )
    .Query(q => q.MatchAll())
);
```

## Search Query Patterns

### Aggregation Queries

```csharp
// Group by region and sum sales
var aggregationResponse = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(0)  // Don't retrieve documents, only aggregations
    .Aggregations(a => a
        .Terms("by_region", t => t
            .Field(f => f.Region)
            .Size(100)
        )
        .Sum("total_sales", su => su
            .Field(f => f.SalesAmount)
        )
    )
);
```

### Date Histogram Aggregation

```csharp
// Group by time periods
var dateAggResponse = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(0)
    .Aggregations(a => a
        .DateHistogram("sales_over_time", dh => dh
            .Field(f => f.SaleDate)
            .Interval(DateInterval.Month)
            .Aggregations(sa => sa
                .Sum("monthly_total", su => su.Field(f => f.SalesAmount))
            )
        )
    )
);
```

## JSON Serialization

### Document List to JSON

```csharp
using Newtonsoft.Json;

// Basic serialization
List<SalesDocument> documents = FetchElasticsearchData();
string json = JsonConvert.SerializeObject(documents);

// With custom settings
JsonSerializerSettings settings = new JsonSerializerSettings
{
    DateFormatString = "yyyy-MM-dd HH:mm:ss",
    NullValueHandling = NullValueHandling.Ignore
};
string json = JsonConvert.SerializeObject(documents, settings);
```

### Response in Web API

```csharp
[HttpGet]
public IActionResult GetData()
{
    try
    {
        List<SalesDocument> data = FetchElasticsearchData();
        return Ok(JsonConvert.SerializeObject(data));
    }
    catch (Exception ex)
    {
        return BadRequest(new { error = ex.Message });
    }
}
```

## Pivot Table Configuration

### Configuration Setup

**Web.config:**
```xml
<appSettings>
  <add key="ElasticsearchApi:BaseUrl" value="https://your-server.com/Pivot" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ApiUrl = System.Configuration.ConfigurationManager.AppSettings["ElasticsearchApi:BaseUrl"];
    return View();
}
```

### Basic Configuration

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("PivotView").DataSourceSettings(dataSource => dataSource
    .Url((string)ViewBag.ApiUrl)
    .ExpandAll(false)
    .EnableSorting(true)
    .Rows(rows => {
        rows.Name("Region").Caption("Region").Add();
    })
    .Columns(columns => {
        columns.Name("Product").Caption("Product").Add();
    })
    .Values(values => {
        values.Name("SalesAmount").Caption("Total Sales").Add();
    })).Height("450").ShowFieldList(true).Render()
```

### Advanced Configuration

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("PivotView").DataSourceSettings(dataSource => dataSource
    .Url((string)ViewBag.ApiUrl)
    .Rows(rows => {
        rows.Name("Region").Caption("Region").Add();
        rows.Name("Product").Caption("Product").Add();
    })
    .Columns(columns => {
        columns.Name("SaleDate").Caption("Year").Add();
    })
    .Values(values => {
        values.Name("SalesAmount").Caption("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        values.Name("Quantity").Caption("Units").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
    })
    .Filters(filters => {
        filters.Name("CustomerName").Caption("Customer").Add();
    })).Height("500").ShowGroupingBar(true).ShowFieldList(true).Render()
```

## Index Management

### Create Index with Mapping

```csharp
// Define mapping for sales data
var createIndexResponse = _elasticClient.Indices.Create("sales-data", c => c
    .Map<SalesDocument>(m => m
        .Properties(p => p
            .Keyword(k => k
                .Name(f => f.Id)
            )
            .Text(t => t
                .Name(f => f.CustomerName)
                .Analyzer("standard")
            )
            .Keyword(k => k
                .Name(f => f.Region)
            )
            .Keyword(k => k
                .Name(f => f.Product)
            )
            .Date(d => d
                .Name(f => f.SaleDate)
                .Format("yyyy-MM-dd")
            )
            .Number(n => n
                .Name(f => f.SalesAmount)
                .Type(NumberType.Double)
            )
            .Number(n => n
                .Name(f => f.Quantity)
                .Type(NumberType.Integer)
            )
        )
    )
);
```

### Index Document

```csharp
// Index single document
var indexResponse = _elasticClient.Index(new SalesDocument
{
    Id = "1",
    CustomerName = "John Doe",
    Region = "North America",
    Product = "Widget A",
    SaleDate = DateTime.Now,
    SalesAmount = 5000,
    Quantity = 10
}, i => i.Index("sales-data"));

// Bulk index documents
var bulkResponse = _elasticClient.Bulk(b => b
    .Index("sales-data")
    .IndexMany(documents)
);
```

## Performance Optimization

### Query Optimization

**1. Use appropriate size limits:**
```csharp
// ❌ SLOW - Retrieve all documents
var response = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Query(q => q.MatchAll())
);

// ✅ FAST - Limit results for Pivot Table
var response = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(10000)  // Reasonable limit
    .Query(q => q.MatchAll())
);
```

**2. Filter before aggregation:**
```csharp
// Filter to relevant data, then aggregate
var response = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(0)
    .Query(q => q
        .Range(r => r
            .Field(f => f.SaleDate)
            .GreaterThanOrEquals(DateTime.Now.AddMonths(-3))
        )
    )
    .Aggregations(a => a
        .Terms("by_region", t => t.Field(f => f.Region))
    )
);
```

**3. Create indexes on frequently queried fields:**
```csharp
// Create field-specific index
var createIndexResponse = _elasticClient.Indices.Create("sales-data-optimized", c => c
    .Settings(s => s
        .NumberOfShards(5)
        .NumberOfReplicas(1)
    )
);
```

### Asynchronous Implementation

```csharp
[HttpGet]
public async Task<object> GetAsync()
{
    List<SalesDocument> data = await FetchElasticsearchDataAsync();
    return JsonConvert.SerializeObject(data);
}

private async Task<List<SalesDocument>> FetchElasticsearchDataAsync()
{
    var searchResponse = await _elasticClient.SearchAsync<SalesDocument>(s => s
        .Index("sales-data")
        .Size(10000)
        .Query(q => q.MatchAll())
    );

    return searchResponse.Documents.ToList();
}
```

## Troubleshooting

### Common Connection Issues

**Error: "Unable to connect to node"**
```csharp
// Solution: Verify Elasticsearch is running
// Check port 9200 is accessible
// Verify connection string: http://localhost:9200
```

**Error: "Index [sales-data] does not exist"**
```csharp
// Solution: Create index first
var response = _elasticClient.Indices.Create("sales-data", c => c
    .Map<SalesDocument>(m => m.AutoMap())
);
// Then index documents
```

**Error: "No mapping found for [field_name]"**
```csharp
// Solution: Ensure field names match document properties
// Verify POCO class has required fields
// Create index with proper mapping
```

### Connection Validation

```csharp
public bool ValidateElasticsearchConnection(IElasticClient client)
{
    try
    {
        var response = client.Ping();
        
        if (response.IsValid)
        {
            Console.WriteLine("Elasticsearch connection successful");
            return true;
        }
        else
        {
            Console.WriteLine($"Ping failed: {response.ServerError?.Error?.Reason}");
            return false;
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Connection error: {ex.Message}");
        return false;
    }
}

// Usage
var elasticSettings = new ConnectionSettings(new Uri("http://localhost:9200"));
var elasticClient = new ElasticClient(elasticSettings);
ValidateElasticsearchConnection(elasticClient);
```

### Performance Monitoring

```csharp
// Monitor query performance
var stopwatch = System.Diagnostics.Stopwatch.StartNew();
var searchResponse = _elasticClient.Search<SalesDocument>(s => s
    .Index("sales-data")
    .Size(10000)
    .Query(q => q.MatchAll())
);
stopwatch.Stop();

Console.WriteLine($"Query completed in {stopwatch.ElapsedMilliseconds}ms");
Console.WriteLine($"Documents retrieved: {searchResponse.Total}");
Console.WriteLine($"Took (server): {searchResponse.Took}ms");
```
