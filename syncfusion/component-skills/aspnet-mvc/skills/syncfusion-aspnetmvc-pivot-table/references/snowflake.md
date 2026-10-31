# Snowflake Database Binding in ASP.NET MVC Pivot Table

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
- [Connection String Configuration](#connection-string-configuration)
- [Web API Service Implementation](#web-api-service-implementation)
- [Retrieving Data from Snowflake](#retrieving-data-from-snowflake)
- [JSON Serialization](#json-serialization)
- [Pivot Table Configuration](#pivot-table-configuration)
- [Warehouse Configuration](#warehouse-configuration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Overview

Snowflake is a cloud-based data warehouse platform with separation of compute and storage, enabling elastic scalability and high-performance analytics. The Syncfusion Pivot Table connects to Snowflake through Web API services for cloud-native data analysis.

**Why Snowflake:** Cloud-native, elastic scalability, zero maintenance, secure data sharing, semi-structured data support.

**Ideal Use Cases:**
- Cloud data warehousing
- Real-time analytics
- Data lakes and lakes
- Cross-cloud data sharing
- IoT and sensor data analysis

## Prerequisites & Setup

### Required NuGet Packages

```bash
Install-Package Snowflake.Data -Version 2.4.27
Install-Package Newtonsoft.Json -Version 13.0.3
```

### Installation Steps

1. Open **Package Manager Console**
2. Execute the NuGet commands above
3. Ensure Snowflake.Data version 2.4+

### System Requirements

- .NET Core 3.1+ or .NET Framework 4.6.2+
- Visual Studio 2019 or higher
- Snowflake account (free trial available)
- Snowflake Web UI or SnowSQL (optional CLI tool)

## Connection String Configuration

### Connection String Formats

```csharp
// Basic Connection String
"account=xy12345;user=myuser;password=mypassword;db=mydb;schema=myschema;"

// With Warehouse Specification
"account=xy12345;user=myuser;password=mypassword;db=mydb;schema=myschema;warehouse=COMPUTE_WH;"

// With Region
"account=xy12345.us-east-1;user=myuser;password=mypassword;db=mydb;schema=myschema;"

// With Connection Pooling
"account=xy12345;user=myuser;password=mypassword;db=mydb;schema=myschema;warehouse=COMPUTE_WH;pooling=true;MaxPoolSize=10;"
```

### Connection String Parameters

| Parameter | Description | Example | Required |
|-----------|-------------|---------|----------|
| **account** | Snowflake account identifier | `xy12345` or `xy12345.us-east-1` | ✅ |
| **user** | Username | `myuser` | ✅ |
| **password** | Password | `mypassword` | ✅ |
| **db** | Database name | `mydb` | ✅ |
| **schema** | Schema name | `myschema` | ✅ |
| **warehouse** | Compute warehouse | `COMPUTE_WH` | ⚠️ Recommended |
| **role** | Database role | `ANALYST` | Optional |
| **pooling** | Connection pooling | `true` or `false` | Optional |
| **MaxPoolSize** | Maximum pooled connections | `10`, `20` | Optional |

### Finding Your Account Identifier

```csharp
// Your Snowflake URL: https://xy12345.snowflakecomputing.com
// Account identifier: xy12345

// With region specified
// URL: https://xy12345.us-east-1.snowflakecomputing.com
// Account identifier: xy12345.us-east-1
```

### Configuration in appsettings.json

```csharp
{
  "SnowflakeConnection": {
    "ConnectionString": "account=xy12345;user=analyst;password=***;db=analytics;schema=public;warehouse=COMPUTE_WH;",
    "Database": "analytics",
    "Schema": "public",
    "Warehouse": "COMPUTE_WH"
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
using Newtonsoft.Json;
using Snowflake.Data.Client;
using System.Data;

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

        [HttpGet(Name = "GetSnowflakeResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchSnowflakeData());
        }

        private DataTable FetchSnowflakeData()
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("SnowflakeConnection");
                
                using (SnowflakeDbConnection connection = new SnowflakeDbConnection())
                {
                    connection.ConnectionString = connectionString;
                    connection.Open();
                    
                    string query = "SELECT * FROM SALES_DATA LIMIT 100000";
                    SnowflakeDbCommand command = new SnowflakeDbCommand(query, connection);
                    command.CommandTimeout = 300;
                    
                    SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(command);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);
                    
                    connection.Close();
                    return dataTable;
                }
            }
            catch (SnowflakeDbException ex)
            {
                throw new ApplicationException($"Snowflake error: {ex.Message}", ex);
            }
        }
    }
}
```

## Retrieving Data from Snowflake

### Query Execution Patterns

**Simple SELECT Query:**
```csharp
string query = "SELECT * FROM SALES_DATA";
SnowflakeDbCommand command = new SnowflakeDbCommand(query, connection);
```

**Parameterized Query (SQL Injection Prevention):**
```csharp
string query = "SELECT * FROM SALES_DATA WHERE REGION = ? AND YEAR = ?";
SnowflakeDbCommand command = new SnowflakeDbCommand(query, connection);
command.Parameters.Add(new SnowflakeDbParameter { Value = "North America" });
command.Parameters.Add(new SnowflakeDbParameter { Value = 2024 });
```

**Query with Date Range:**
```csharp
string query = @"
    SELECT 
        DATE,
        CUSTOMER_ID,
        PRODUCT_CATEGORY,
        SALES_AMOUNT,
        QUANTITY
    FROM SALES_DATA
    WHERE DATE >= '2024-01-01' AND DATE < '2024-12-31'
    ORDER BY DATE DESC";
```

**Complex Query with Window Functions:**
```csharp
string query = @"
    SELECT 
        CUSTOMER_ID,
        SALES_AMOUNT,
        REGION,
        ROW_NUMBER() OVER (PARTITION BY REGION ORDER BY SALES_AMOUNT DESC) as rank
    FROM SALES_DATA
    WHERE SALES_AMOUNT > 1000";
```

### DataAdapter Implementation

```csharp
SnowflakeDbConnection connection = new SnowflakeDbConnection();
connection.ConnectionString = connectionString;
connection.Open();

SnowflakeDbCommand command = new SnowflakeDbCommand(query, connection);
SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(command);

DataTable dataTable = new DataTable();
adapter.Fill(dataTable);

connection.Close();
return dataTable;
```

## JSON Serialization

### DataTable to JSON Conversion

```csharp
using Newtonsoft.Json;

// Basic serialization
DataTable dataTable = FetchSnowflakeData();
string json = JsonConvert.SerializeObject(dataTable);

// With custom settings
JsonSerializerSettings settings = new JsonSerializerSettings
{
    DateFormatString = "yyyy-MM-dd HH:mm:ss",
    NullValueHandling = NullValueHandling.Ignore
};
string json = JsonConvert.SerializeObject(dataTable, settings);
```

### Response in Web API

```csharp
[HttpGet]
public IActionResult GetData()
{
    try
    {
        DataTable data = FetchSnowflakeData();
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
  <add key="SnowflakeApi:BaseUrl" value="https://your-server.com/Pivot" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ApiUrl = System.Configuration.ConfigurationManager.AppSettings["SnowflakeApi:BaseUrl"];
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
            rows.Name("REGION").Caption("Region").Add();
        })
        .Columns(columns => {
            columns.Name("YEAR").Caption("Year").Add();
        })
        .Values(values => {
            values.Name("SALES_AMOUNT").Caption("Total Sales").Add();
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
            rows.Name("REGION").Caption("Region").Add();
            rows.Name("PRODUCT_CATEGORY").Caption("Category").Add();
        })
        .Columns(columns => {
            columns.Name("YEAR").Caption("Year").Add();
            columns.Name("QUARTER").Caption("Quarter").Add();
        })
        .Values(values => {
            values.Name("SALES_AMOUNT").Caption("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("QUANTITY").Caption("Units").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .Filters(filters => {
            filters.Name("CUSTOMER_SEGMENT").Caption("Segment").Add();
        }))
    .ShowGroupingBar(true)
    .ShowFieldList(true)
    .Render()
```

## Warehouse Configuration

### Create Compute Warehouse

```sql
-- Create warehouse for analysis
CREATE WAREHOUSE IF NOT EXISTS COMPUTE_WH
  WAREHOUSE_SIZE = 'SMALL'
  AUTO_SUSPEND = 600
  AUTO_RESUME = TRUE;

-- Create warehouse for transformations
CREATE WAREHOUSE IF NOT EXISTS TRANSFORM_WH
  WAREHOUSE_SIZE = 'MEDIUM'
  AUTO_SUSPEND = 300
  AUTO_RESUME = TRUE;
```

### Set Active Warehouse in Connection

```csharp
// Specify warehouse in connection string
string connectionString = "account=xy12345;user=myuser;password=mypassword;db=mydb;schema=myschema;warehouse=COMPUTE_WH;";
```

### Role-Based Access Control

```sql
-- Create role for data analysts
CREATE ROLE ANALYST;

-- Grant warehouse usage
GRANT USAGE ON WAREHOUSE COMPUTE_WH TO ROLE ANALYST;

-- Grant database access
GRANT USAGE ON DATABASE mydb TO ROLE ANALYST;
GRANT USAGE ON SCHEMA mydb.myschema TO ROLE ANALYST;

-- Grant table permissions
GRANT SELECT ON ALL TABLES IN SCHEMA mydb.myschema TO ROLE ANALYST;

-- Assign role to user
GRANT ROLE ANALYST TO USER myuser;
```

### Set Default Warehouse

```csharp
// Via SQL query
string query = "ALTER USER myuser SET DEFAULT_WAREHOUSE = 'COMPUTE_WH'";

// Via connection priority
// Warehouse specified in connection string takes precedence
```

## Performance Optimization

### Query Optimization

**1. Avoid SELECT **
```csharp
// ❌ SLOW
string query = "SELECT * FROM LARGE_TABLE";

// ✅ FAST - Select specific columns
string query = "SELECT customer_id, order_date, amount FROM SALES_DATA";
```

**2. Use LIMIT for Testing:**
```csharp
// Add LIMIT during development
string query = "SELECT * FROM SALES_DATA LIMIT 10000";
```

**3. Partition Pruning:**
```csharp
// Use clustering keys to prune partitions
string query = @"
    SELECT * FROM SALES_DATA
    WHERE DATE >= '2024-01-01' AND DATE < '2024-03-31'";
```

**4. Pre-aggregate Large Datasets:**
```sql
-- Create materialized view for faster retrieval
CREATE MATERIALIZED VIEW sales_summary AS
SELECT 
    DATE_TRUNC('month', DATE) as month,
    REGION,
    PRODUCT_CATEGORY,
    SUM(SALES_AMOUNT) as total_sales,
    SUM(QUANTITY) as total_quantity
FROM SALES_DATA
GROUP BY month, REGION, PRODUCT_CATEGORY;
```

### Warehouse Sizing

```sql
-- Scale warehouse based on query complexity

-- Small (1-2 credits/hour) - Development/Testing
ALTER WAREHOUSE COMPUTE_WH SET WAREHOUSE_SIZE = 'SMALL';

-- Medium (4-8 credits/hour) - Regular Analytics
ALTER WAREHOUSE COMPUTE_WH SET WAREHOUSE_SIZE = 'MEDIUM';

-- Large (16-32 credits/hour) - Heavy Workloads
ALTER WAREHOUSE COMPUTE_WH SET WAREHOUSE_SIZE = 'LARGE';
```

### Connection Pooling

```csharp
// Enable connection pooling for better resource usage
string connectionString = "account=xy12345;user=myuser;password=password;db=mydb;schema=myschema;pooling=true;MaxPoolSize=20;";
```

### Asynchronous Implementation

```csharp
[HttpGet]
public async Task<object> GetAsync()
{
    DataTable data = await FetchSnowflakeDataAsync();
    return JsonConvert.SerializeObject(data);
}

private async Task<DataTable> FetchSnowflakeDataAsync()
{
    string connectionString = _configuration.GetConnectionString("SnowflakeConnection");
    
    using (SnowflakeDbConnection connection = new SnowflakeDbConnection())
    {
        connection.ConnectionString = connectionString;
        await connection.OpenAsync();
        
        SnowflakeDbCommand command = new SnowflakeDbCommand("SELECT * FROM SALES_DATA", connection);
        SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(command);
        
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

## Troubleshooting

### Common Connection Issues

**Error: "Invalid connection parameters"**
```csharp
// Solution: Verify connection string format and account identifier
// Check: account=xy12345 format (not URL or account name)
// Verify: user, password, db, schema exist in Snowflake
string connectionString = "account=xy12345;user=myuser;password=mypassword;db=mydb;schema=myschema;";
```

**Error: "Invalid username or password"**
```csharp
// Solution: Check credentials in Snowflake Web UI
// Verify user exists and is not locked
// Change password if needed
```

**Error: "Object does not exist or not authorized"**
```csharp
// Solution: Verify warehouse/database/schema exist
// Check user role permissions
// Ensure role has necessary grants
```

### Connection Validation

```csharp
public bool ValidateSnowflakeConnection(string connectionString)
{
    try
    {
        using (SnowflakeDbConnection connection = new SnowflakeDbConnection())
        {
            connection.ConnectionString = connectionString;
            connection.Open();
            
            SnowflakeDbCommand command = new SnowflakeDbCommand("SELECT CURRENT_WAREHOUSE(), CURRENT_DATABASE()", connection);
            SnowflakeDbDataReader reader = (SnowflakeDbDataReader)command.ExecuteReader();
            
            if (reader.Read())
            {
                Console.WriteLine($"Warehouse: {reader[0]}");
                Console.WriteLine($"Database: {reader[1]}");
            }
            
            return true;
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Connection failed: {ex.Message}");
        return false;
    }
}
```

### Performance Monitoring

```csharp
// Monitor query execution and Snowflake credits

var stopwatch = System.Diagnostics.Stopwatch.StartNew();
DataTable data = FetchSnowflakeData();
stopwatch.Stop();

Console.WriteLine($"Query completed in {stopwatch.ElapsedMilliseconds}ms");
Console.WriteLine($"Rows retrieved: {data.Rows.Count}");

// Check Snowflake query history for credit usage in Web UI:
// Monitoring → Query Query History
```
