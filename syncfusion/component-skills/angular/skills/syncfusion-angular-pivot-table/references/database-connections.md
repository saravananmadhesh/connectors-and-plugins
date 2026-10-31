# Database Connectivity

## ⚠️ CRITICAL SECURITY NOTICE

**All database connections MUST be handled through authenticated backend APIs.** Never expose database connection strings or credentials to the client-side application. This documentation assumes you have:

✅ A secure backend API (ASP.NET Core, Node.js, etc.)
✅ Proper authentication and authorization
✅ Server-side database connection handling
✅ Input validation and SQL injection prevention

❌ **NEVER** connect directly to databases from the browser
❌ **NEVER** expose connection strings in client code
❌ **NEVER** accept user-provided database endpoints

## Table of Contents
- [Connection Patterns](#connection-patterns)
- [SQL Server](#sql-server)
- [MySQL](#mysql)
- [PostgreSQL](#postgresql)
- [MongoDB](#mongodb)
- [Elasticsearch](#elasticsearch)
- [Oracle](#oracle)
- [Snowflake](#snowflake)
- [Connection Best Practices](#connection-best-practices)

## Connection Patterns

### Server-Side Engine Connection

⚠️ **SECURITY**: This pattern uses a secure backend API. Never expose database connections to the client.

```typescript
// Client-side: Configure AUTHENTICATED endpoint only
import { environment } from '../environments/environment';

dataSourceSettings: IDataOptions = {
  url: environment.apiEndpoint,  // Use environment config, not hardcoded URLs
  mode: 'Server',
  rows: [{ name: 'Region' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales', type: 'Sum' }]
};

// Server-side: C# ASP.NET Core
[HttpPost("api/pivot/data")]
public IActionResult GetPivotData(PivotViewDataOptions options)
{
  var connectionString = "your_db_connection_string";
  var data = FetchDataFromDatabase(connectionString);
  
  var pivotEngine = new PivotEngine();
  var result = pivotEngine.ProcessJsonData(data, options);
  
  return Ok(result);
}
```

---

## SQL Server

### Basic Connection

```csharp
// C# Connection String
string connectionString = "Server=server_name;" +
  "Database=database_name;" +
  "User Id=sa;" +
  "Password=your_password;";

using (SqlConnection conn = new SqlConnection(connectionString))
{
  conn.Open();
  string query = "SELECT * FROM SalesData WHERE Year = 2024";
  SqlCommand cmd = new SqlCommand(query, conn);
  SqlDataReader reader = cmd.ExecuteReader();
  // Read and process data
}
```

### API Endpoint

```csharp
[HttpPost]
public IActionResult GetSalesData(PivotViewDataOptions options)
{
  var connectionString = Configuration.GetConnectionString("DefaultConnection");
  
  using (SqlConnection conn = new SqlConnection(connectionString))
  {
    conn.Open();
    
    // Build dynamic query based on filters
    string query = BuildDynamicQuery(options);
    
    SqlCommand cmd = new SqlCommand(query, conn);
    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
    DataTable dt = new DataTable();
    adapter.Fill(dt);
    
    // Convert to JSON
    var jsonData = ConvertDataTableToJson(dt);
    var engine = new PivotEngine();
    var result = engine.ProcessJsonData(jsonData, options);
    
    return Ok(result);
  }
}
```

### Angular Client

```typescript
@Component({
  selector: 'app-sql-pivot'
})
export class AppComponent {
  dataSourceSettings: IDataOptions = {
    url: 'https://your-server/api/sales-data',
    mode: 'Server',
    rows: [{ name: 'Region' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };
}
```

---

## MySQL

### Connection Setup

```csharp
// C# Connection String
string connectionString = "Server=localhost;" +
  "Database=sales_db;" +
  "User Id=root;" +
  "Password=password;";

using (MySqlConnection conn = new MySqlConnection(connectionString))
{
  conn.Open();
  MySqlCommand cmd = new MySqlCommand("SELECT * FROM sales", conn);
  // Execute query
}
```

### Query Data

```csharp
public List<dynamic> GetMySQLData()
{
  var connector = "Server=mysql-server;Database=analytics;User Id=user;Password=pass;";
  var data = new List<dynamic>();
  
  using (var conn = new MySqlConnection(connector))
  {
    conn.Open();
    var query = "SELECT Region, Year, SUM(Sales) as Sales FROM sales_data GROUP BY Region, Year";
    var cmd = new MySqlCommand(query, conn);
    
    using (var reader = cmd.ExecuteReader())
    {
      while (reader.Read())
      {
        data.Add(new {
          Region = reader["Region"],
          Year = reader["Year"],
          Sales = reader["Sales"]
        });
      }
    }
  }
  
  return data;
}
```

---

## PostgreSQL

### Connection Setup

```csharp
// C# Connection String
string connectionString = "Host=localhost;" +
  "Username=postgres;" +
  "Password=password;" +
  "Database=sales_db;";

using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
{
  conn.Open();
  NpgsqlCommand cmd = new NpgsqlCommand("SELECT * FROM sales", conn);
  // Execute query
}
```

### Aggregate Query

```csharp
public List<dynamic> GetPostgreSQLData()
{
  var connectionString = "Host=pg-server;Database=analytics;User Id=analyst;Password=pwd;";
  var data = new List<dynamic>();
  
  using (var conn = new NpgsqlConnection(connectionString))
  {
    conn.Open();
    var query = @"
      SELECT 
        region,
        EXTRACT(YEAR FROM transaction_date) as year,
        SUM(amount) as sales,
        COUNT(*) as transactions
      FROM transactions
      WHERE transaction_date >= NOW() - INTERVAL '2 years'
      GROUP BY region, year
      ORDER BY year, region
    ";
    
    using (var cmd = new NpgsqlCommand(query, conn))
    {
      using (var reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          data.Add(new {
            Region = reader["region"],
            Year = reader["year"],
            Sales = reader["sales"],
            Transactions = reader["transactions"]
          });
        }
      }
    }
  }
  
  return data;
}
```

---

## MongoDB

### Connection & Query

```csharp
// C# MongoDB
var connectionString = "mongodb://localhost:27017";
var client = new MongoClient(connectionString);
var database = client.GetDatabase("sales_db");
var collection = database.GetCollection<BsonDocument>("sales");

var filter = Builders<BsonDocument>.Filter.Gte("amount", 1000);
var documents = collection.Find(filter).ToList();
```

### Aggregation Pipeline

```csharp
public List<dynamic> GetMongoDBData()
{
  var connectionString = "mongodb+srv://user:pwd@cluster.mongodb.net";
  var client = new MongoClient(connectionString);
  var database = client.GetDatabase("warehouse");
  var collection = database.GetCollection<BsonDocument>("orders");
  
  var pipeline = new[]
  {
    new BsonDocument("$match", new BsonDocument("status", "completed")),
    new BsonDocument("$group", new BsonDocument
    {
      { "_id", new BsonDocument("region", "$region").Add("year", new BsonDocument("$year", "$orderDate")) },
      { "totalSales", new BsonDocument("$sum", "$amount") },
      { "count", new BsonDocument("$sum", 1) }
    }),
    new BsonDocument("$project", new BsonDocument
    {
      { "region", "$_id.region" },
      { "year", "$_id.year" },
      { "Sales", "$totalSales" },
      { "Count", "$count" }
    })
  };
  
  var results = collection.Aggregate<dynamic>(pipeline).ToList();
  return results;
}
```

---

## Elasticsearch

### Connection & Query

```csharp
// C# Elasticsearch
var settings = new ConnectionSettings(new Uri("http://localhost:9200"))
  .DefaultIndex("sales");
var client = new ElasticClient(settings);

var response = client.Search<SalesData>(s => s
  .Query(q => q
    .Match(m => m
      .Field("status")
      .Query("completed")
    )
  )
);
```

### Aggregation Query

```csharp
public List<dynamic> GetElasticsearchData()
{
  var settings = new ConnectionSettings(new Uri("https://elastic-cloud.example.com"))
    .ApiKeyAuthentication("api_key_id", "api_key");
  
  var client = new ElasticClient(settings);
  
  var response = client.Search<dynamic>(s => s
    .Index("sales-*")
    .Size(1000)
  );
  
  return ExtractAggregationResults(response);
}
```

---

## Oracle

### Connection Setup

```csharp
// C# Oracle
string connectionString = "Data Source=oracle_db;User Id=scott;Password=tiger;";

using (OracleConnection conn = new OracleConnection(connectionString))
{
  conn.Open();
  OracleCommand cmd = new OracleCommand("SELECT * FROM SALES", conn);
  // Execute query
}
```

### Query Data

```csharp
public List<dynamic> GetOracleData()
{
  var connectionString = "Data Source=ORACL12C;User Id=admin;Password=pwd;";
  var data = new List<dynamic>();
  
  using (var conn = new OracleConnection(connectionString))
  {
    conn.Open();
    var query = @"
      SELECT 
        region,
        EXTRACT(YEAR FROM transaction_date) as year,
        SUM(amount) as sales,
        COUNT(*) as count
      FROM transactions
      WHERE TRUNC(transaction_date) >= TRUNC(SYSDATE - 730)
      GROUP BY region, EXTRACT(YEAR FROM transaction_date)
    ";
    
    using (var cmd = new OracleCommand(query, conn))
    {
      using (var reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          data.Add(new {
            Region = reader["region"],
            Year = reader["year"],
            Sales = reader["sales"]
          });
        }
      }
    }
  }
  
  return data;
}
```

---

## Snowflake

### Connection & Query

```csharp
// C# Snowflake
using (IDbConnection conn = new SnowflakeDbConnection())
{
  conn.ConnectionString = "account=xy12345;user=user_name;" +
    "password=user_password;warehouse=compute_wh;database=SALES_DB;";
  
  conn.Open();
  using (IDbCommand cmd = conn.CreateCommand())
  {
    cmd.CommandText = "SELECT * FROM SALES_TABLE";
    using (IDataReader reader = cmd.ExecuteReader())
    {
      // Read results
    }
  }
}
```

### Cloud Data Warehouse Query

```csharp
public List<dynamic> GetSnowflakeData()
{
  var connectionString = "account=cloud;user=analyst;" +
    "password=secure_pwd;warehouse=analytics;database=DW;";
  
  var data = new List<dynamic>();
  
  using (var conn = new SnowflakeDbConnection())
  {
    conn.ConnectionString = connectionString;
    conn.Open();
    
    var query = @"
      SELECT 
        REGION,
        YEAR(TRANSACTION_DATE) as YEAR,
        SUM(AMOUNT) as SALES,
        COUNT(*) as TRANSACTIONS
      FROM TRANSACTIONS
      WHERE TRANSACTION_DATE >= DATEADD(year, -2, CURRENT_DATE)
      GROUP BY REGION, YEAR(TRANSACTION_DATE)
      ORDER BY REGION, YEAR
    ";
    
    using (var cmd = new SnowflakeDbCommand(query, (SnowflakeDbConnection)conn))
    {
      using (var reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          data.Add(new {
            Region = reader["REGION"],
            Year = reader["YEAR"],
            Sales = reader["SALES"]
          });
        }
      }
    }
  }
  
  return data;
}
```

---

## Connection Best Practices

### 1. Use Connection Pooling
```csharp
// Connection pooling enabled by default in most drivers
// Reuse connections efficiently
```

### 2. Secure Credentials
```csharp
// Use Azure Key Vault or environment variables
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
// Never hardcode credentials
```

### 3. Query Optimization
```csharp
// Pre-aggregate data at database level
// Filter early (WHERE clause before grouping)
// Limit columns returned (SELECT specific columns)

string query = "SELECT region, year, SUM(amount) FROM sales " +
  "WHERE status='completed' " +
  "GROUP BY region, year";
```

### 4. Error Handling
```csharp
try
{
  using (var conn = new SqlConnection(connectionString))
  {
    conn.Open();
    // Execute queries
  }
}
catch (SqlException ex)
{
  logger.Error("Database error: " + ex.Message);
  throw;
}
finally
{
  // Connection automatically closed and returned to pool
}
```

### 5. Caching
```csharp
// Cache query results to reduce database load
var cache = new MemoryCache(new MemoryCacheOptions());
const string CACHE_KEY = "pivot_data";

if (!cache.TryGetValue(CACHE_KEY, out List<dynamic> data))
{
  data = FetchFromDatabase();
  cache.Set(CACHE_KEY, data, TimeSpan.FromHours(1));
}

return data;
```
