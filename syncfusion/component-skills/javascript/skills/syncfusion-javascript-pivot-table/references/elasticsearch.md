# Elasticsearch Database Connections - Syncfusion TypeScript Pivot View

**Framework:** Syncfusion EJ2 Pivot View (TypeScript)  
**Backend:** ASP.NET Core / C# Web API  
**Database Driver:** NEST (Elasticsearch .NET client)  
**NuGet Packages:** NEST, Newtonsoft.Json

---

## ⚠️ SECURITY NOTICE

**All Elasticsearch connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Elasticsearch authentication enabled
- Authentication and authorization ([Authorize] attributes)
- Encrypted connections (HTTPS/SSL)
- Secure credential management (Azure Key Vault, user secrets)

## Overview

Elasticsearch is a distributed search and analytics engine optimized for real-time data analysis. Connecting a Pivot Table to Elasticsearch requires an ASP.NET Core Web API using the NEST library to query indexed data and serialize results to JSON.

### When to Use Elasticsearch Connection

- **Full-Text Search**: High-performance text search across millions of documents
- **Real-Time Analytics**: Analyze logs and metrics in real-time
- **Time-Series Data**: Optimize for timestamp-based queries
- **Scalability**: Horizontal scaling across multiple nodes
- **Flexible Indexing**: Dynamic mapping of document fields
- **Aggregations**: Complex multi-level data aggregations

---

## Setup: Elasticsearch Connection

### Step 1: Create ASP.NET Core Application

```csharp
// Project Type: ASP.NET Core Web API
// Project Name: PivotElasticsearchService
// .NET Version: .NET 6.0 or higher
```

### Step 2: Install NuGet Package

```bash
Install-Package NEST
Install-Package Newtonsoft.Json
```

### Step 3: Create Web API Controller

```csharp
using Microsoft.AspNetCore.Mvc;
using Nest;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        // Controller implementation
    }
}
```

---

## Basic Elasticsearch Query Execution

### Simple Data Retrieval

Retrieve documents from index:

```csharp
private static object FetchElasticsearchData()
{
    // Elasticsearch connection string (URI)
    var connectionString = "http://localhost:9200";
    var uri = new Uri(connectionString);
    var connectionSettings = new ConnectionSettings(uri);
    
    // Create Elasticsearch client
    var client = new ElasticClient(connectionSettings);
    
    // Search with size limit
    var searchResponse = client.Search<object>(s => s
        .Index("products")  // Index name
        .Size(1000)         // Maximum 1000 results
    );
    
    return searchResponse.Documents;
}

[HttpGet(Name = "GetElasticsearchData")]
public object Get()
{
    return JsonConvert.SerializeObject(FetchElasticsearchData());
}
```

### Filtered Query

Execute query with filters:

```csharp
private static object FetchFilteredElasticsearchData(string category, decimal minPrice)
{
    var connectionString = "http://localhost:9200";
    var uri = new Uri(connectionString);
    var connectionSettings = new ConnectionSettings(uri);
    var client = new ElasticClient(connectionSettings);
    
    // Query with filters
    var searchResponse = client.Search<object>(s => s
        .Index("products")
        .Query(q => q
            .Bool(b => b
                .Must(
                    m => m.Match(mq => mq
                        .Field("category")
                        .Query(category)
                    ),
                    m => m.Range(rq => rq
                        .Field("price")
                        .GreaterThanOrEquals(minPrice)
                    )
                )
            )
        )
        .Size(1000)
    );
    
    return searchResponse.Documents;
}

[HttpGet("filter")]
public object GetFiltered(string category, decimal minPrice)
{
    return JsonConvert.SerializeObject(FetchFilteredElasticsearchData(category, minPrice));
}
```

---

## Advanced Elasticsearch Configurations

### Full-Text Search

Perform full-text search across documents:

```csharp
private static object FullTextSearch(string searchText)
{
    var uri = new Uri("http://localhost:9200");
    var connectionSettings = new ConnectionSettings(uri);
    var client = new ElasticClient(connectionSettings);
    
    // Full-text search with relevance scoring
    var searchResponse = client.Search<object>(s => s
        .Index("documents")
        .Query(q => q
            .Match(m => m
                .Field("content")
                .Query(searchText)
                .Fuzziness(Fuzziness.Auto)
            )
        )
        .Sort(sort => sort
            .Descending("_score")  // Sort by relevance
        )
        .Size(100)
    );
    
    return searchResponse.Documents;
}
```

### Aggregations

Multi-level data aggregation:

```csharp
private static object GetAggregatedData()
{
    var uri = new Uri("http://localhost:9200");
    var connectionSettings = new ConnectionSettings(uri);
    var client = new ElasticClient(connectionSettings);
    
    // Aggregation pipeline
    var searchResponse = client.Search<object>(s => s
        .Index("sales")
        .Size(0)  // Don't return documents, just aggregations
        .Aggregations(a => a
            .Terms("by_category", t => t
                .Field("category.keyword")
                .Aggregations(aa => aa
                    .Sum("total_amount", sm => sm
                        .Field("amount")
                    )
                    .Average("avg_amount", am => am
                        .Field("amount")
                    )
                )
            )
            .DateHistogram("by_date", dh => dh
                .Field("date")
                .Interval(DateInterval.Month)
                .Aggregations(aa => aa
                    .Sum("daily_total", sm => sm
                        .Field("amount")
                    )
                )
            )
        )
    );
    
    var aggregations = searchResponse.Aggregations;
    return aggregations;
}
```

### Range Queries

Query date and numeric ranges:

```csharp
private static object RangeQuery(string startDate, string endDate, decimal minAmount)
{
    var uri = new Uri("http://localhost:9200");
    var connectionSettings = new ConnectionSettings(uri);
    var client = new ElasticClient(connectionSettings);
    
    // Range query on date and numeric fields
    var searchResponse = client.Search<object>(s => s
        .Index("transactions")
        .Query(q => q
            .Bool(b => b
                .Must(
                    m => m.Range(r => r
                        .Field("date")
                        .GreaterThanOrEquals(startDate)
                        .LessThanOrEquals(endDate)
                    ),
                    m => m.Range(r => r
                        .Field("amount")
                        .GreaterThanOrEquals(minAmount)
                    )
                )
            )
        )
        .Size(1000)
    );
    
    return searchResponse.Documents;
}
```

### Boolean Query

Complex query combinations:

```csharp
private static object BooleanQuery(string status, string region, string exclude)
{
    var uri = new Uri("http://localhost:9200");
    var connectionSettings = new ConnectionSettings(uri);
    var client = new ElasticClient(connectionSettings);
    
    // Boolean query with MUST, SHOULD, MUST NOT
    var searchResponse = client.Search<object>(s => s
        .Index("orders")
        .Query(q => q
            .Bool(b => b
                .Must(
                    m => m.Term(t => t
                        .Field("status.keyword")
                        .Value(status)
                    )
                )
                .Should(
                    sh => sh.Term(t => t
                        .Field("region.keyword")
                        .Value(region)
                    ),
                    sh => sh.Match(m => m
                        .Field("priority")
                        .Query("high")
                    )
                )
                .MustNot(
                    mn => mn.Term(t => t
                        .Field("category.keyword")
                        .Value(exclude)
                    )
                )
            )
        )
        .Size(500)
    );
    
    return searchResponse.Documents;
}
```

---

## TypeScript Integration

### Configure Pivot Table with Elasticsearch API

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44323/Pivot',
        type: 'JSON'
    },
    rows: [
        { name: 'category', caption: 'Category' }
    ],
    columns: [
        { name: 'region', caption: 'Region' }
    ],
    values: [
        { name: 'amount', caption: 'Total Sales', type: 'Sum' }
    ],
    filters: [
        { name: 'status', caption: 'Status' }
    ]
});

pivotTableObj.appendTo('#PivotTable');
```

---

## Connection Configurations

### Local Elasticsearch

For local development:

```csharp
var uri = new Uri("http://localhost:9200");
var connectionSettings = new ConnectionSettings(uri);
var client = new ElasticClient(connectionSettings);
```

### Remote Elasticsearch

Connect to remote cluster:

```csharp
var pool = new SingleNodeConnectionPool(new Uri("http://es.example.com:9200"));
var connectionSettings = new ConnectionSettings(pool);
var client = new ElasticClient(connectionSettings);
```

### Elasticsearch with Authentication

Basic authentication:

```csharp
var pool = new SingleNodeConnectionPool(new Uri("http://localhost:9200"));
var connectionSettings = new ConnectionSettings(pool)
    .BasicAuthentication("username", "password");
var client = new ElasticClient(connectionSettings);
```

### Elasticsearch Cloud (Elastic Cloud)

Connect to Elastic Cloud:

```csharp
var connectionSettings = new ConnectionSettings(
    new Uri("https://my-deployment-id.es.us-east-1.aws.cloud.es.io:9243")
)
.BasicAuthentication("elastic", "your_password")
.ServerCertificateValidationCallback(CertificateValidations.AuthorizedOnly);
var client = new ElasticClient(connectionSettings);
```

---

## Common Patterns

### Pagination with From/Size

Handle large result sets:

```csharp
private static object FetchPagedElasticsearchData(int pageIndex, int pageSize)
{
    var uri = new Uri("http://localhost:9200");
    var connectionSettings = new ConnectionSettings(uri);
    var client = new ElasticClient(connectionSettings);
    
    int from = pageIndex * pageSize;
    
    var searchResponse = client.Search<object>(s => s
        .Index("products")
        .From(from)
        .Size(pageSize)
        .Query(q => q.MatchAll())
    );
    
    return searchResponse.Documents;
}
```

### Sorting Results

Order results by field:

```csharp
private static object FetchSortedData(string sortField)
{
    var uri = new Uri("http://localhost:9200");
    var connectionSettings = new ConnectionSettings(uri);
    var client = new ElasticClient(connectionSettings);
    
    var searchResponse = client.Search<object>(s => s
        .Index("products")
        .Sort(sort => sort
            .Descending(sortField)
        )
        .Size(1000)
    );
    
    return searchResponse.Documents;
}
```

### Error Handling

Manage Elasticsearch errors:

```csharp
[HttpGet(Name = "GetElasticsearchData")]
public object Get()
{
    try
    {
        var uri = new Uri("http://localhost:9200");
        var connectionSettings = new ConnectionSettings(uri);
        var client = new ElasticClient(connectionSettings);
        
        var searchResponse = client.Search<object>(s => s
            .Index("products")
            .Size(1000)
        );
        
        if (!searchResponse.IsValid)
        {
            return BadRequest($"Elasticsearch Error: {searchResponse.ServerError?.Error?.Reason}");
        }
        
        return JsonConvert.SerializeObject(searchResponse.Documents);
    }
    catch (Exception ex)
    {
        return BadRequest($"Error: {ex.Message}");
    }
}
```

---

## API Reference

### ElasticClient

| Method | Purpose | Example |
|--------|---------|---------|
| `Search()` | Execute search query | `client.Search<T>(s => s.Index(...))` |
| `Index()` | Index document | `client.Index(document)` |
| `Bulk()` | Bulk operations | `client.Bulk(b => b.Index(...))` |
| `DeleteByQuery()` | Delete matching docs | `client.DeleteByQuery(dq => dq.Query(...))` |

### Query Builders

| Builder | Purpose | Example |
|---------|---------|---------|
| `Match()` | Full-text match | `.Query(q => q.Match(...))` |
| `Term()` | Exact match | `.Query(q => q.Term(...))` |
| `Range()` | Range query | `.Query(q => q.Range(...))` |
| `Bool()` | Boolean logic | `.Query(q => q.Bool(...))` |

---

## Troubleshooting

### Connection Issues

**Problem:** "Connection refused on 9200"
- **Cause:** Elasticsearch not running
- **Solution:** Start Elasticsearch service
- **Check:** Port 9200 accessible

**Problem:** "Unauthorized (401)"
- **Cause:** Invalid credentials
- **Solution:** Verify username/password
- **Check:** User has appropriate permissions

### Query Issues

**Problem:** "index not found"
- **Cause:** Index doesn't exist
- **Solution:** Create index or verify name
- **Check:** Use `GET _cat/indices` to list indices

**Problem:** "Field not found"
- **Cause:** Field not in index mapping
- **Solution:** Verify field name and mapping
- **Check:** Use `GET index_name/_mapping` to view fields

---

## Best Practices

### 1. Use Connection Pooling
```csharp
var pool = new SingleNodeConnectionPool(new Uri("http://localhost:9200"));
```

### 2. Implement Error Handling
```csharp
if (!searchResponse.IsValid) { }
```

### 3. Use Aggregations
```csharp
.Aggregations(a => a.Terms(...))
```

### 4. Optimize Query Size
```csharp
.Size(1000)  // Limit results
```

### 5. Leverage Full-Text Search
```csharp
.Query(q => q.Match(...))
```

---
