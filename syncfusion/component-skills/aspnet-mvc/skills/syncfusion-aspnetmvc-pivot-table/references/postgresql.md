# PostgreSQL Database Binding in ASP.NET MVC Pivot Table

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
- [Retrieving Data from PostgreSQL](#retrieving-data-from-postgresql)
- [JSON Serialization](#json-serialization)
- [Pivot Table Configuration](#pivot-table-configuration)
- [Authentication Methods](#authentication-methods)
- [SSL/TLS Configuration](#ssltls-configuration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Overview

PostgreSQL is a powerful, open-source object-relational database known for reliability, advanced features, and full ACID compliance. The Syncfusion Pivot Table connects to PostgreSQL through Web API services to retrieve and visualize data.

**Why PostgreSQL:** Advanced SQL features, JSONB support, full-text search, scalability, cross-platform compatibility.

**Ideal Use Cases:**
- Time-series data analysis
- JSON/NoSQL hybrid workloads
- Geographic information systems (GIS)
- Analytics and reporting
- Complex data relationships

## Prerequisites & Setup

### Required NuGet Packages

```bash
Install-Package Npgsql -Version 7.0.4
Install-Package Npgsql.EntityFrameworkCore.PostgreSQL -Version 7.0.4
Install-Package Newtonsoft.Json -Version 13.0.3
```

### Installation Steps

1. Open **Package Manager Console**
2. Execute the NuGet commands above
3. Ensure Npgsql version 7.0+ for .NET Core compatibility

### System Requirements

- .NET Core 3.1+ or .NET 5+
- Visual Studio 2019 or higher
- PostgreSQL 10+
- pgAdmin (optional, database management tool)

## Connection String Configuration

### Connection String Format

```csharp
// Basic Connection String
"Host=localhost;Port=5432;Database=mydatabase;Username=myuser;Password=mypassword;"

// With SSL Required
"Host=localhost;Port=5432;Database=mydatabase;Username=myuser;Password=mypassword;SSL Mode=Require;"

// With Connection Pooling
"Host=localhost;Port=5432;Database=mydatabase;Username=myuser;Password=mypassword;Pooling=true;Minimum Pool Size=5;Maximum Pool Size=20;"

// With Timeout Settings
"Host=localhost;Port=5432;Database=mydatabase;Username=myuser;Password=mypassword;Command Timeout=300;Timeout=15;"
```

### Connection String Parameters

| Parameter | Description | Example | Default |
|-----------|-------------|---------|---------|
| **Host** | PostgreSQL server hostname | `localhost`, `db.example.com` | `localhost` |
| **Port** | PostgreSQL port | `5432` | `5432` |
| **Database** | Database name | `mydatabase` | Required |
| **Username** | User account | `myuser`, `postgres` | Required |
| **Password** | User password | `mypassword` | Required |
| **Pooling** | Connection pooling | `true` or `false` | `true` |
| **Minimum Pool Size** | Min pooled connections | `5`, `10` | `1` |
| **Maximum Pool Size** | Max pooled connections | `20`, `50` | `20` |
| **SSL Mode** | SSL encryption | `Require`, `Prefer`, `Disable` | `Prefer` |
| **Command Timeout** | Query timeout (seconds) | `300`, `600` | `30` |

### Environment-Specific Configuration

```csharp
// appsettings.json
{
  "ConnectionStrings": {
    "PostgreSQL": "Host=localhost;Port=5432;Database=Dev;Username=admin;Password=***;"
  }
}

// appsettings.production.json
{
  "ConnectionStrings": {
    "PostgreSQL": "Host=prod-db.example.com;Port=5432;Database=Prod;Username=produser;Password=***;SSL Mode=Require;"
  }
}
```

## Web API Service Implementation

### Create ASP.NET Core Web API

```csharp
// Create new ASP.NET Core Web API project
// File → New → Project → ASP.NET Core Web API
```

### Complete PivotController Implementation

```csharp
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
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

        [HttpGet(Name = "GetPostgreSQLResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchPostgreSQLData());
        }

        private DataTable FetchPostgreSQLData()
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("PostgreSQL");
                
                using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
                {
                    connection.Open();
                    
                    string query = "SELECT * FROM sales_data ORDER BY sale_date DESC";
                    NpgsqlCommand command = new NpgsqlCommand(query, connection);
                    command.CommandTimeout = 300;
                    
                    NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(command);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);
                    
                    return dataTable;
                }
            }
            catch (NpgsqlException ex)
            {
                throw new ApplicationException($"PostgreSQL error: {ex.Message}", ex);
            }
        }
    }
}
```

## Retrieving Data from PostgreSQL

### Query Execution Patterns

**Simple SELECT Query:**
```csharp
string query = "SELECT id, name, email, registration_date FROM users";
NpgsqlCommand command = new NpgsqlCommand(query, connection);
```

**Parameterized Query (SQL Injection Prevention):**
```csharp
string query = "SELECT * FROM users WHERE country = @country AND active = @active";
NpgsqlCommand command = new NpgsqlCommand(query, connection);
command.Parameters.AddWithValue("@country", "USA");
command.Parameters.AddWithValue("@active", true);
```

**Query with JSONB Data:**
```csharp
string query = @"
    SELECT 
        id,
        user_data->>'name' as name,
        user_data->>'email' as email,
        user_data->'profile'->>'age' as age
    FROM users";
```

**Complex Query with Common Table Expression (CTE):**
```csharp
string query = @"
    WITH monthly_sales AS (
        SELECT 
            DATE_TRUNC('month', sale_date) as month,
            SUM(amount) as total
        FROM sales
        GROUP BY DATE_TRUNC('month', sale_date)
    )
    SELECT * FROM monthly_sales
    WHERE total > 10000";
```

### DataAdapter Implementation

```csharp
NpgsqlConnection connection = new NpgsqlConnection(connectionString);
connection.Open();

NpgsqlCommand command = new NpgsqlCommand(query, connection);
NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(command);

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
DataTable dataTable = FetchPostgreSQLData();
string json = JsonConvert.SerializeObject(dataTable);

// With custom DateTime format
JsonSerializerSettings settings = new JsonSerializerSettings
{
    DateFormatString = "yyyy-MM-dd HH:mm:ss",
    NullValueHandling = NullValueHandling.Ignore
};
string json = JsonConvert.SerializeObject(dataTable, settings);
```

### JSON Response in Web API

```csharp
[HttpGet]
public IActionResult GetData()
{
    try
    {
        DataTable data = FetchPostgreSQLData();
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
  <add key="PostgreSqlApi:BaseUrl" value="https://your-server.com/Pivot" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ApiUrl = System.Configuration.ConfigurationManager.AppSettings["PostgreSqlApi:BaseUrl"];
    return View();
}
```

### Basic Setup

```csharp
@Html.EJS().PivotView("PivotView")
    .Height("450")
    .DataSourceSettings(dataSource => dataSource
        .Url((string)ViewBag.ApiUrl)  // Web API endpoint
        .EnableSorting(true)
        .ExpandAll(false)
        .Rows(rows => {
            rows.Name("servicetype").Add();
        })
        .Columns(columns => {
            columns.Name("openinghours_practice").Add();
        })
        .Values(values => {
            values.Name("revenue").Caption("Total Revenue").Add();
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
            rows.Name("servicecategory").Caption("Category").Add();
            rows.Name("servicetype").Caption("Service Type").Add();
        })
        .Columns(columns => {
            columns.Name("year").Caption("Year").Add();
        })
        .Values(values => {
            values.Name("revenue").Caption("Revenue").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("transactions").Caption("Transactions").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Count).Add();
        })
        .Filters(filters => {
            filters.Name("region").Caption("Region").Add();
        }))
    .ShowGroupingBar(true)
    .ShowFieldList(true)
    .Render()
```

## Authentication Methods

### MD5 Authentication

```csharp
// Connection string with MD5 (legacy)
string connectionString = "Host=localhost;Database=mydb;Username=user;Password=pass;";
// Npgsql automatically uses MD5 if server requires it
```

### SCRAM-SHA-256 Authentication

```csharp
// Modern authentication (recommended)
string connectionString = "Host=localhost;Database=mydb;Username=user;Password=pass;";
// Npgsql uses SCRAM-SHA-256 by default
```

### Configuring PostgreSQL for Authentication

```sql
-- Check authentication method in pg_hba.conf
-- For development (md5)
local   all             all                                     md5

-- For production (SCRAM-SHA-256)
local   all             all                                     scram-sha-256
host    all             all             127.0.0.1/32           scram-sha-256
```

## SSL/TLS Configuration

### Enable SSL in Connection String

```csharp
// Require SSL - connection fails without SSL
string connectionString = "Host=localhost;Database=mydb;Username=user;Password=pass;SslMode=Require;";

// Prefer SSL - uses if available
string connectionString = "Host=localhost;Database=mydb;Username=user;Password=pass;SslMode=Prefer;";

// With certificate validation
string connectionString = "Host=localhost;Database=mydb;Username=user;Password=pass;SslMode=Require;Trust Server Certificate=true;";
```

### Certificate Setup

```csharp
// Install your server certificate
ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) =>
{
    if (sslPolicyErrors == SslPolicyErrors.None)
        return true;
    
    // Log certificate errors
    Console.WriteLine($"SSL Error: {sslPolicyErrors}");
    return false;
};
```

## Performance Optimization

### Connection Pooling

```csharp
// Optimal pooling configuration
"Host=localhost;Database=mydb;Username=user;Password=pass;Pooling=true;Minimum Pool Size=5;Maximum Pool Size=50;Connection Idle Lifetime=300;"
```

### Query Optimization

**1. Use Prepared Statements:**
```csharp
NpgsqlCommand command = new NpgsqlCommand("SELECT * FROM users WHERE id = @id", connection);
command.Parameters.AddWithValue("@id", userId);
```

**2. Create Indexes:**
```sql
CREATE INDEX idx_users_country ON users(country);
CREATE INDEX idx_sales_date ON sales(sale_date);
```

**3. Use LIMIT for Large Results:**
```csharp
string query = "SELECT * FROM sales LIMIT 50000 OFFSET 0";
```

**4. Aggregate at Database Level:**
```csharp
string query = @"
    SELECT 
        DATE(sale_date) as date,
        sales_person,
        SUM(amount) as daily_total
    FROM sales
    GROUP BY DATE(sale_date), sales_person";
```

### Asynchronous Implementation

```csharp
[HttpGet]
public async Task<object> GetAsync()
{
    DataTable data = await FetchPostgreSQLDataAsync();
    return JsonConvert.SerializeObject(data);
}

private async Task<DataTable> FetchPostgreSQLDataAsync()
{
    string connectionString = _configuration.GetConnectionString("PostgreSQL");
    
    using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
    {
        await connection.OpenAsync();
        
        NpgsqlCommand command = new NpgsqlCommand("SELECT * FROM sales", connection);
        NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(command);
        
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

## Troubleshooting

### Common Connection Issues

**Error: "No such host is known"**
```csharp
// Solution: Check hostname/IP
// Verify PostgreSQL service is running
// Test connection: psql -h localhost -d mydb -U myuser
```

**Error: "FATAL: no pg_hba.conf entry"**
```csharp
// Solution: Check PostgreSQL authentication configuration
// Edit pg_hba.conf to allow connections
// Restart PostgreSQL service
```

**Error: "Timeout expired"**
```csharp
// Solution: Increase timeout
string connectionString = "...;Timeout=30;Command Timeout=300;";

// Or reduce dataset
string query = "SELECT * FROM sales LIMIT 10000";
```

### Connection String Validation

```csharp
public bool ValidatePostgreSQLConnection(string connectionString)
{
    try
    {
        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            NpgsqlCommand command = new NpgsqlCommand("SELECT version();", connection);
            string version = (string)command.ExecuteScalar();
            Console.WriteLine($"Connected to: {version}");
            return true;
        }
    }
    catch (NpgsqlException ex)
    {
        Console.WriteLine($"Connection failed: {ex.Message}");
        return false;
    }
}
```

### Performance Monitoring

```csharp
// Monitor query execution time
var stopwatch = System.Diagnostics.Stopwatch.StartNew();
DataTable data = FetchPostgreSQLData();
stopwatch.Stop();

Console.WriteLine($"Query completed in {stopwatch.ElapsedMilliseconds}ms");
Console.WriteLine($"Rows retrieved: {data.Rows.Count}");
```
