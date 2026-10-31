# MongoDB Database Binding in ASP.NET MVC Pivot Table

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
- [Retrieving Data from MongoDB](#retrieving-data-from-mongodb)
- [Document Mapping](#document-mapping)
- [JSON Serialization](#json-serialization)
- [Pivot Table Configuration](#pivot-table-configuration)
- [Aggregation Pipeline](#aggregation-pipeline)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Overview

MongoDB is a popular NoSQL document database that stores data in flexible JSON-like documents. The Syncfusion Pivot Table can connect to MongoDB through Web API services to retrieve collection data for analysis.

**Why MongoDB:** Flexible schema, horizontal scalability, high performance, great for unstructured data, document-oriented.

**Ideal Use Cases:**
- User profile analytics
- IoT sensor data
- Content management systems
- Real-time analytics
- Social media data analysis

## Prerequisites & Setup

### Required NuGet Packages

```bash
Install-Package MongoDB.Driver -Version 2.20.0
Install-Package MongoDB.Bson -Version 2.20.0
Install-Package Newtonsoft.Json -Version 13.0.3
```

### Installation Steps

1. Open **Package Manager Console**
2. Execute the NuGet commands above
3. Ensure MongoDB.Driver version 2.19+ for latest features

### System Requirements

- .NET Core 3.1+ or .NET 5+
- Visual Studio 2019 or higher
- MongoDB Server 4.0+
- MongoDB Compass (optional, GUI management tool)

## Connection Configuration

### Connection String Format

```csharp
// Basic Connection String
"mongodb://localhost:27017"

// With Authentication
"mongodb://username:password@localhost:27017"

// MongoDB Atlas Cloud
"mongodb+srv://username:password@cluster0.mongodb.net/database?retryWrites=true&w=majority"

// With Connection Pooling
"mongodb://localhost:27017/?maxPoolSize=50&minPoolSize=10"

// With Timeout Settings
"mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&socketTimeoutMS=10000"
```

### Connection String Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| **Host** | MongoDB server hostname | `localhost:27017` |
| **Username** | Authentication username | `admin` |
| **Password** | Authentication password | `password123` |
| **Database** | Default database | `mydb` |
| **maxPoolSize** | Maximum connection pool | `50` |
| **minPoolSize** | Minimum connection pool | `10` |
| **serverSelectionTimeoutMS** | Server selection timeout | `5000` |
| **socketTimeoutMS** | Socket timeout | `10000` |
| **retryWrites** | Automatic retry on failure | `true` |

### Connection String Configuration

```csharp
// appsettings.json
{
  "MongoConnection": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "sample_training",
    "CollectionName": "ProductDetails"
  }
}

// appsettings.production.json
{
  "MongoConnection": {
    "ConnectionString": "mongodb+srv://user:pass@cluster.mongodb.net/prod_db?retryWrites=true&w=majority",
    "DatabaseName": "production_db",
    "CollectionName": "products"
  }
}
```

## Web API Service Implementation

### Create ASP.NET Core Web API

```csharp
// File → New → Project → ASP.NET Core Web API
```

### Complete PivotController Implementation

```csharp
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PivotController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet(Name = "GetMongoDbResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchMongoDbData());
        }

        private List<ProductDetails> FetchMongoDbData()
        {
            try
            {
                string connectionString = _configuration["MongoConnection:ConnectionString"];
                string databaseName = _configuration["MongoConnection:DatabaseName"];
                string collectionName = _configuration["MongoConnection:CollectionName"];

                MongoClient client = new MongoClient(connectionString);
                IMongoDatabase database = client.GetDatabase(databaseName);
                var collection = database.GetCollection<ProductDetails>(collectionName);

                // Retrieve all documents from collection
                return collection.Find(new BsonDocument()).ToList();
            }
            catch (MongoException ex)
            {
                throw new ApplicationException($"MongoDB error: {ex.Message}", ex);
            }
        }
    }

    // Model class matches MongoDB document structure
    public class ProductDetails
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("country")]
        public string Country { get; set; }

        [BsonElement("products")]
        public string Products { get; set; }

        [BsonElement("year")]
        public string Year { get; set; }

        [BsonElement("quarter")]
        public string Quarter { get; set; }

        [BsonElement("sold")]
        public int Sold { get; set; }

        [BsonElement("amount")]
        public double Amount { get; set; }
    }
}
```

## Retrieving Data from MongoDB

### Basic Query Methods

**Retrieve All Documents:**
```csharp
var collection = database.GetCollection<ProductDetails>("products");
var allDocuments = collection.Find(new BsonDocument()).ToList();
```

**With Filter (WHERE Clause Equivalent):**
```csharp
var collection = database.GetCollection<ProductDetails>("products");
var filter = Builders<ProductDetails>.Filter.Eq(p => p.Country, "USA");
var filteredDocs = collection.Find(filter).ToList();
```

**With Multiple Conditions:**
```csharp
var filter = Builders<ProductDetails>.Filter.And(
    Builders<ProductDetails>.Filter.Eq(p => p.Country, "USA"),
    Builders<ProductDetails>.Filter.Gte(p => p.Amount, 1000)
);
var documents = collection.Find(filter).ToList();
```

**Sorting and Limiting:**
```csharp
var sort = Builders<ProductDetails>.Sort.Descending(p => p.Amount);
var documents = collection.Find(new BsonDocument())
    .Sort(sort)
    .Limit(1000)
    .ToList();
```

### Projection (Select Specific Fields)

```csharp
// Exclude _id field
var projection = Builders<ProductDetails>.Projection
    .Exclude(p => p.Id)
    .Include(p => p.Country)
    .Include(p => p.Amount);

var documents = collection.Find(new BsonDocument())
    .Project<ProductDetails>(projection)
    .ToList();
```

## Document Mapping

### BsonElement Attributes

```csharp
public class SalesData
{
    // Maps to MongoDB _id field
    [BsonId]
    public ObjectId Id { get; set; }

    // Maps to MongoDB field name
    [BsonElement("customer_name")]
    public string CustomerName { get; set; }

    // Default mapping - property name to field name
    [BsonElement("sales_amount")]
    public decimal SalesAmount { get; set; }

    // Ignore field in serialization
    [BsonIgnore]
    public string TemporaryData { get; set; }
}
```

### Handling Nested Documents

```csharp
public class Order
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("customer")]
    public Customer CustomerInfo { get; set; }

    [BsonElement("items")]
    public List<OrderItem> OrderItems { get; set; }
}

public class Customer
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("address")]
    public Address CustomerAddress { get; set; }
}

public class OrderItem
{
    [BsonElement("product_id")]
    public string ProductId { get; set; }

    [BsonElement("quantity")]
    public int Quantity { get; set; }
}
```

## JSON Serialization

### List to JSON Conversion

```csharp
// Basic serialization
List<ProductDetails> data = FetchMongoDbData();
string json = JsonConvert.SerializeObject(data);

// With custom settings
JsonSerializerSettings settings = new JsonSerializerSettings
{
    NullValueHandling = NullValueHandling.Ignore,
    DateFormatString = "yyyy-MM-dd HH:mm:ss"
};
string json = JsonConvert.SerializeObject(data, settings);
```

### Response in Web API

```csharp
[HttpGet]
public IActionResult GetData()
{
    try
    {
        List<ProductDetails> data = FetchMongoDbData();
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
  <add key="MongoDbApi:BaseUrl" value="https://your-server.com/Pivot" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ApiUrl = System.Configuration.ConfigurationManager.AppSettings["MongoDbApi:BaseUrl"];
    return View();
}
```

### Basic Configuration

```csharp
@Html.EJS().PivotView("PivotView")
    .Height("450")
    .DataSourceSettings(dataSource => dataSource
        .Url((string)ViewBag.ApiUrl)
        .ExpandAll(false)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Amount").Caption("Total Amount").Add();
        }))
    .ShowFieldList(true)
    .Render()
```

### Advanced Configuration

```csharp
@Html.EJS().PivotView("PivotView")
    .Height("500")
    .DataSourceSettings(dataSource => dataSource
        .Url((string)ViewBag.ApiUrl)
        .Rows(rows => {
            rows.Name("Country").Caption("Country").Add();
            rows.Name("Products").Caption("Product").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Caption("Year").Add();
        })
        .Values(values => {
            values.Name("Sold").Caption("Units Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Amount").Caption("Sales Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .Filters(filters => {
            filters.Name("Quarter").Caption("Quarter").Add();
        }))
    .ShowGroupingBar(true)
    .ShowFieldList(true)
    .Render()
```

## Aggregation Pipeline

### MongoDB Aggregation

```csharp
var pipeline = new[]
{
    new BsonDocument("$match", new BsonDocument("country", "USA")),
    new BsonDocument("$group", new BsonDocument
    {
        { "_id", "$year" },
        { "totalAmount", new BsonDocument("$sum", "$amount") },
        { "totalSold", new BsonDocument("$sum", "$sold") }
    }),
    new BsonDocument("$sort", new BsonDocument("_id", 1))
};

var result = collection.Aggregate<BsonDocument>(pipeline).ToList();
```

### Group and Sum Example

```csharp
var groupStage = new BsonDocument("$group", new BsonDocument
{
    { "_id", "$country" },
    { "totalAmount", new BsonDocument("$sum", "$amount") },
    { "avgSold", new BsonDocument("$avg", "$sold") }
});

var pipeline = new[] { groupStage };
var result = collection.Aggregate<BsonDocument>(pipeline).ToList();
```

## Performance Optimization

### Connection Pooling

```csharp
// Optimal connection settings
string connectionString = "mongodb://localhost:27017/?maxPoolSize=50&minPoolSize=10&maxIdleTimeMS=30000";
MongoClient client = new MongoClient(connectionString);
```

### Indexing

```csharp
// Create index on frequently queried field
var indexKeys = Builders<ProductDetails>.IndexKeys.Ascending(p => p.Country);
collection.Indexes.CreateOne(new CreateIndexModel<ProductDetails>(indexKeys));

// Compound index
var compoundKeys = Builders<ProductDetails>.IndexKeys
    .Ascending(p => p.Country)
    .Ascending(p => p.Year);
collection.Indexes.CreateOne(new CreateIndexModel<ProductDetails>(compoundKeys));
```

### Projection to Reduce Data Transfer

```csharp
var projection = Builders<ProductDetails>.Projection
    .Include(p => p.Country)
    .Include(p => p.Amount)
    .Exclude(p => p.Id);

var data = collection.Find(new BsonDocument())
    .Project<ProductDetails>(projection)
    .ToList();
```

### Asynchronous Implementation

```csharp
[HttpGet]
public async Task<object> GetAsync()
{
    List<ProductDetails> data = await FetchMongoDbDataAsync();
    return JsonConvert.SerializeObject(data);
}

private async Task<List<ProductDetails>> FetchMongoDbDataAsync()
{
    var collection = database.GetCollection<ProductDetails>("products");
    return await collection.Find(new BsonDocument()).ToListAsync();
}
```

## Troubleshooting

### Common Connection Issues

**Error: "Unable to connect to server"**
```csharp
// Solution: Check MongoDB is running
// Verify connection string format
// Test connection: mongo mongodb://localhost:27017
```

**Error: "Authentication failed"**
```csharp
// Solution: Verify username/password
// Check credentials in MongoDB
// Ensure user has access to database
```

**Error: "Collection not found"**
```csharp
// Solution: Verify collection name
// Check database in MongoDB Compass
// Ensure correct database is selected
```

### Connection Validation

```csharp
public bool ValidateMongoDBConnection(string connectionString)
{
    try
    {
        MongoClient client = new MongoClient(connectionString);
        var admin = client.GetDatabase("admin");
        var command = new BsonDocument("ping", 1);
        admin.RunCommand<BsonDocument>(command);
        Console.WriteLine("MongoDB connection successful");
        return true;
    }
    catch (MongoException ex)
    {
        Console.WriteLine($"MongoDB connection failed: {ex.Message}");
        return false;
    }
}
```

### Performance Monitoring

```csharp
// Monitor query performance
var stopwatch = System.Diagnostics.Stopwatch.StartNew();
var data = collection.Find(new BsonDocument()).ToList();
stopwatch.Stop();

Console.WriteLine($"Query completed in {stopwatch.ElapsedMilliseconds}ms");
Console.WriteLine($"Documents retrieved: {data.Count}");
```
