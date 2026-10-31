# MongoDB Database Connections - Syncfusion TypeScript Pivot View

**Framework:** Syncfusion EJ2 Pivot View (TypeScript)  
**Backend:** ASP.NET Core / C# Web API  
**Database Driver:** MongoDB.Driver (NEST - NoSQL database)  
**NuGet Packages:** MongoDB.Driver, MongoDB.Bson, Newtonsoft.Json

---

## ⚠️ SECURITY NOTICE

**All MongoDB connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- MongoDB authentication enabled
- Authentication and authorization ([Authorize] attributes)
- Encrypted connections (SSL/TLS)
- Secure credential management (Azure Key Vault, user secrets)

## Overview

MongoDB is a NoSQL document database that stores data in JSON-like documents. Connecting a Pivot Table to MongoDB requires an ASP.NET Core Web API service that retrieves documents from MongoDB collections and serializes them to JSON format for the Pivot Table component.

### When to Use MongoDB Connection

- **Unstructured Data**: Store documents without rigid schema
- **Flexible Schema**: Evolve data model without migrations
- **Real-Time Applications**: High-speed data ingestion and retrieval
- **Complex Hierarchies**: Store nested objects and arrays
- **Big Data Analysis**: Process large volumes of document data
- **Cloud-Native Solutions**: MongoDB Atlas cloud hosting

---

## Architecture Overview

```
TypeScript Pivot View
        ↓ (HTTP Request)
ASP.NET Core Web API
        ↓ (MongoClient)
MongoDB Database
        ↓ (Document Collection)
JSON Serialization
        ↓ (HTTP Response)
TypeScript Pivot View
```

**Flow:**
1. Pivot Table requests data from Web API
2. Web API connects via MongoClient
3. Queries MongoDB collection using BSON filters
4. Deserializes documents to C# objects
5. Serializes to JSON using JsonConvert
6. Returns JSON response
7. Pivot Table binds data

---

## Setup: MongoDB Connection

### Prerequisites

- ✅ ASP.NET Core Web Application created
- ✅ MongoDB instance running (local or remote)
- ✅ MongoDB connection string
- ✅ Target database and collection exists
- ✅ Appropriate user permissions

### Step 1: Create ASP.NET Core Application

Create new ASP.NET Core Web API project:

```csharp
// Project Type: ASP.NET Core Web API
// Project Name: PivotMongoDBService
// .NET Version: .NET 6.0 or higher
```

### Step 2: Install NuGet Packages

Install MongoDB drivers:

```bash
Install-Package MongoDB.Driver
Install-Package MongoDB.Bson
Install-Package Newtonsoft.Json
```

### Step 3: Create Web API Controller

Create `PivotController.cs` with MongoDB support:

```csharp
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        // Controller populated in next steps
    }
}
```

---

## Basic MongoDB Data Retrieval

### Simple Collection Query

Fetch all documents from collection:

```csharp
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        private static List<ProductDetails> FetchMongoDbResult()
        {
            // MongoDB connection string
            string connectionString = "mongodb://localhost:27017";
            MongoClient client = new MongoClient(connectionString);
            
            // Access database and collection
            IMongoDatabase database = client.GetDatabase("sample_training");
            var collection = database.GetCollection<ProductDetails>("ProductDetails");
            
            // Retrieve all documents
            return collection.Find(new BsonDocument()).ToList();
        }

        // Define MongoDB document model
        public class ProductDetails
        {
            public ObjectId Id { get; set; }
            public int Sold { get; set; }
            public double Amount { get; set; }
            public string? Country { get; set; }
            public string? Products { get; set; }
            public string? Year { get; set; }
            public string? Quarter { get; set; }
        }

        [HttpGet(Name = "GetMongoDbResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchMongoDbResult());
        }
    }
}
```

### Filtered Query with BSON

Query with filtering criteria:

```csharp
private static List<ProductDetails> FetchFilteredMongoData(string country, int minAmount)
{
    string connectionString = "mongodb://localhost:27017";
    MongoClient client = new MongoClient(connectionString);
    IMongoDatabase database = client.GetDatabase("sample_training");
    var collection = database.GetCollection<ProductDetails>("ProductDetails");
    
    // BSON filter for WHERE clause equivalent
    var filter = Builders<ProductDetails>.Filter.And(
        Builders<ProductDetails>.Filter.Eq(p => p.Country, country),
        Builders<ProductDetails>.Filter.Gte(p => p.Amount, minAmount)
    );
    
    return collection.Find(filter).ToList();
}

[HttpGet("filter")]
public object GetFiltered(string country, int minAmount)
{
    return JsonConvert.SerializeObject(FetchFilteredMongoData(country, minAmount));
}
```

---

## Advanced MongoDB Configurations

### Aggregation Pipeline

Perform complex data transformations:

```csharp
private static List<BsonDocument> FetchAggregatedData()
{
    string connectionString = "mongodb://localhost:27017";
    MongoClient client = new MongoClient(connectionString);
    IMongoDatabase database = client.GetDatabase("sample_training");
    var collection = database.GetCollection<BsonDocument>("ProductDetails");
    
    // MongoDB aggregation pipeline
    var pipeline = new[]
    {
        new BsonDocument("$group", new BsonDocument
        {
            { "_id", "$Country" },
            { "TotalAmount", new BsonDocument("$sum", "$Amount") },
            { "TotalSold", new BsonDocument("$sum", "$Sold") },
            { "AverageAmount", new BsonDocument("$avg", "$Amount") },
            { "Count", new BsonDocument("$sum", 1) }
        }),
        new BsonDocument("$sort", new BsonDocument("TotalAmount", -1))
    };
    
    return collection.Aggregate<BsonDocument>(pipeline).ToList();
}
```

### Faceted Search

Multi-dimensional data aggregation:

```csharp
private static BsonDocument FetchFacetedData()
{
    string connectionString = "mongodb://localhost:27017";
    MongoClient client = new MongoClient(connectionString);
    IMongoDatabase database = client.GetDatabase("sample_training");
    var collection = database.GetCollection<BsonDocument>("ProductDetails");
    
    // Faceted aggregation for multiple dimensions
    var pipeline = new[]
    {
        new BsonDocument("$facet", new BsonDocument
        {
            {
                "byCountry",
                new BsonArray(new[]
                {
                    new BsonDocument("$group", new BsonDocument
                    {
                        { "_id", "$Country" },
                        { "Total", new BsonDocument("$sum", "$Amount") }
                    })
                })
            },
            {
                "byYear",
                new BsonArray(new[]
                {
                    new BsonDocument("$group", new BsonDocument
                    {
                        { "_id", "$Year" },
                        { "Total", new BsonDocument("$sum", "$Amount") }
                    })
                })
            },
            {
                "summary",
                new BsonArray(new[]
                {
                    new BsonDocument("$group", new BsonDocument
                    {
                        { "_id", null },
                        { "TotalAmount", new BsonDocument("$sum", "$Amount") },
                        { "TotalCount", new BsonDocument("$sum", 1) }
                    })
                })
            }
        })
    };
    
    return collection.Aggregate<BsonDocument>(pipeline).First();
}
```

### Text Search

Full-text search across documents:

```csharp
private static List<ProductDetails> FetchTextSearchResults(string searchText)
{
    string connectionString = "mongodb://localhost:27017";
    MongoClient client = new MongoClient(connectionString);
    IMongoDatabase database = client.GetDatabase("sample_training");
    var collection = database.GetCollection<ProductDetails>("ProductDetails");
    
    // Text search filter
    var filter = Builders<ProductDetails>.Filter.Text(searchText);
    
    return collection.Find(filter).ToList();
}
```

---

## TypeScript Integration

### Configure Pivot View with MongoDB API

Setup Pivot Table for MongoDB backend:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44323/Pivot',  // MongoDB Web API
        type: 'JSON'
    },
    rows: [
        { name: 'Country', caption: 'Country' }
    ],
    columns: [
        { name: 'Year', caption: 'Year' }
    ],
    values: [
        { name: 'Amount', caption: 'Total Sales', type: 'Sum' }
    ],
    filters: [
        { name: 'Quarter', caption: 'Quarter' }
    ],
    height: '100%'
});

pivotTableObj.appendTo('#PivotTable');
```

### Dynamic Filtering

Pass filter parameters from TypeScript:

```typescript
let loadMongoData = (country: string, minYear: number) => {
    let url = `https://localhost:44323/Pivot/filter?country=${country}&minAmount=100`;
    
    let pivotTableObj = new PivotView({
        dataSourceSettings: {
            url: url,
            type: 'JSON'
        },
        rows: [
            { name: 'Products', caption: 'Products' }
        ],
        columns: [
            { name: 'Quarter', caption: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Quantity', type: 'Sum' }
        ]
    });
    
    pivotTableObj.appendTo('#PivotTable');
};
```

---

## Connection String Configurations

### Local MongoDB Instance

Connect to localhost:

```csharp
string connectionString = "mongodb://localhost:27017";
```

### MongoDB Atlas Cloud

Connect to cloud-hosted MongoDB:

```csharp
string connectionString = "mongodb+srv://username:password@cluster0.mongodb.net/database?retryWrites=true&w=majority";
```

### Replica Set Connection

For high availability:

```csharp
string connectionString = "mongodb://host1:27017,host2:27017,host3:27017/?replicaSet=rs0";
```

### Connection with Authentication

Username/password authentication:

```csharp
string connectionString = "mongodb://user:password@localhost:27017/admin";
```

---

## Common Patterns

### Pagination with Skip/Limit

Load large datasets in pages:

```csharp
private static List<ProductDetails> FetchPagedMongoData(int pageIndex, int pageSize)
{
    string connectionString = "mongodb://localhost:27017";
    MongoClient client = new MongoClient(connectionString);
    IMongoDatabase database = client.GetDatabase("sample_training");
    var collection = database.GetCollection<ProductDetails>("ProductDetails");
    
    int skip = pageIndex * pageSize;
    
    return collection.Find(new BsonDocument())
        .Skip(skip)
        .Limit(pageSize)
        .ToList();
}
```

### Sorting Results

Order results by field:

```csharp
private static List<ProductDetails> FetchSortedData(string sortField)
{
    string connectionString = "mongodb://localhost:27017";
    MongoClient client = new MongoClient(connectionString);
    IMongoDatabase database = client.GetDatabase("sample_training");
    var collection = database.GetCollection<ProductDetails>("ProductDetails");
    
    var sortDefinition = Builders<ProductDetails>.Sort.Descending(sortField);
    
    return collection.Find(new BsonDocument())
        .Sort(sortDefinition)
        .ToList();
}
```

### Bulk Operations

Insert/update multiple documents:

```csharp
private static void PerformBulkInsert(List<ProductDetails> items)
{
    string connectionString = "mongodb://localhost:27017";
    MongoClient client = new MongoClient(connectionString);
    IMongoDatabase database = client.GetDatabase("sample_training");
    var collection = database.GetCollection<ProductDetails>("ProductDetails");
    
    collection.InsertMany(items);
}
```

### Error Handling

Manage MongoDB-specific errors:

```csharp
private static List<ProductDetails> FetchWithErrorHandling()
{
    try
    {
        string connectionString = "mongodb://localhost:27017";
        MongoClient client = new MongoClient(connectionString);
        IMongoDatabase database = client.GetDatabase("sample_training");
        var collection = database.GetCollection<ProductDetails>("ProductDetails");
        
        return collection.Find(new BsonDocument()).ToList();
    }
    catch (MongoConnectionException ex)
    {
        Console.WriteLine($"Connection error: {ex.Message}");
        return new List<ProductDetails>();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
        return new List<ProductDetails>();
    }
}
```

---

## API Reference

### MongoClient

| Property/Method | Purpose | Example |
|-----------------|---------|---------|
| `GetDatabase(name)` | Access database | `client.GetDatabase("mydb")` |
| `ListDatabases()` | List all databases | For discovery |
| `DropDatabase(name)` | Delete database | Permanent deletion |

### IMongoCollection<T>

| Property/Method | Purpose | Example |
|-----------------|---------|---------|
| `Find(filter)` | Query documents | `collection.Find(filter)` |
| `InsertOne(doc)` | Insert single document | `collection.InsertOne(item)` |
| `InsertMany(docs)` | Insert multiple documents | `collection.InsertMany(items)` |
| `UpdateOne(filter, update)` | Update one document | `collection.UpdateOne(filter, update)` |
| `DeleteOne(filter)` | Delete document | `collection.DeleteOne(filter)` |
| `Aggregate(pipeline)` | Run aggregation | `collection.Aggregate(pipeline)` |

### FilterDefinition<T>

| Property/Method | Purpose | Example |
|-----------------|---------|---------|
| `Text(search)` | Text search | `Text("searchterm")` |
| `Eq(field, value)` | Equality | `Eq(p => p.Country, "USA")` |
| `Gte(field, value)` | Greater than or equal | `Gte(p => p.Amount, 100)` |
| `And(filters...)` | Combine filters | `And(filter1, filter2)` |

---

## Troubleshooting

### Connection Issues

**Problem:** "Connection refused"
- **Cause:** MongoDB server not running
- **Solution:** Start MongoDB service
- **Check:** Connection string matches running instance

**Problem:** "Authentication failed"
- **Cause:** Invalid credentials
- **Solution:** Verify username/password
- **Check:** User exists in authentication database

### Query Issues

**Problem:** "Document type not serializable"
- **Cause:** C# model doesn't match MongoDB document
- **Solution:** Align model properties with BSON fields
- **Implementation:**
  ```csharp
  [BsonElement("productName")]
  public string? ProductName { get; set; }
  ```

**Problem:** "Aggregation pipeline error"
- **Cause:** Invalid stage or field reference
- **Solution:** Verify field names; check stage syntax
- **Check:** MongoDB documentation for stage specifications

---

## Best Practices

### 1. Use Strongly-Typed Collections
Define C# models for type safety:
```csharp
public class ProductDetails
{
    public ObjectId Id { get; set; }
    public string? Country { get; set; }
    public double Amount { get; set; }
}
```

### 2. Create Indexes
Improve query performance:
- Create indexes on frequently queried fields
- Use compound indexes for multi-field queries

### 3. Use Connection Pooling
Manage connection resources efficiently:
```csharp
var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.MaxConnectionPoolSize = 100;
```

### 4. Implement Pagination
Handle large datasets efficiently:
```csharp
collection.Find(filter).Skip(skip).Limit(pageSize)
```

### 5. Aggregate on Server
Reduce client-side processing:
```csharp
collection.Aggregate(pipeline)
```

### 6. Error Handling
Catch database-specific exceptions:
```csharp
catch (MongoConnectionException ex) { }
```

---
