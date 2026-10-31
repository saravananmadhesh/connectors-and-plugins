# MySQL Database Binding in ASP.NET MVC Pivot Table

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
- [Retrieving Data from MySQL](#retrieving-data-from-mysql)
- [JSON Serialization](#json-serialization)
- [Pivot Table Configuration](#pivot-table-configuration)
- [Performance Optimization](#performance-optimization)
- [Error Handling & Troubleshooting](#error-handling--troubleshooting)

## Overview

MySQL is an open-source relational database management system ideal for web applications. The Syncfusion Pivot Table can connect to MySQL databases through a Web API service to retrieve and display data for analysis.

**Why MySQL:** Fast, reliable, widely supported, excellent for OLTP workloads, scales well for multi-tier applications.

**Ideal Use Cases:**
- E-commerce order analysis
- Inventory management
- Customer transaction history
- Sales reporting
- Performance monitoring

## Prerequisites & Setup

### Required NuGet Packages

```bash
Install-Package MySql.Data -Version 8.0.33
Install-Package Newtonsoft.Json -Version 13.0.3
```

### NuGet Installation Steps

1. Open **Package Manager Console** in Visual Studio
2. Run the commands above or search in **NuGet Package Manager UI**
3. Ensure MySql.Data version 8.0+ is installed

### System Requirements

- .NET Framework 4.6.2+ or .NET Core 3.1+
- Visual Studio 2019 or higher
- MySQL Server 5.7+ or MySQL 8.0+
- MySQL Workbench (optional, for database management)

## Connection String Configuration

### Connection String Format

```csharp
// Basic Connection String
"Server=localhost;Database=yourdatabase;Uid=username;Pwd=password;"

// With Port Specification
"Server=localhost;Port=3306;Database=yourdatabase;Uid=username;Pwd=password;"

// With Connection Pooling
"Server=localhost;Database=yourdatabase;Uid=username;Pwd=password;Pooling=true;Max Pool Size=10;"

// With Charset Specification
"Server=localhost;Database=yourdatabase;Uid=username;Pwd=password;Charset=utf8mb4;"
```

### Connection String Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| **Server** | MySQL server hostname or IP | `localhost` or `192.168.1.1` |
| **Port** | MySQL port (default 3306) | `3306` |
| **Database** | Database name | `yourdatabase` |
| **Uid** | Username for authentication | `myuser` |
| **Pwd** | Password for authentication | `mypassword` |
| **Pooling** | Enable connection pooling | `true` or `false` |
| **Max Pool Size** | Maximum pooled connections | `10`, `20`, `50` |
| **Charset** | Character encoding | `utf8mb4` (recommended) |

### Security Best Practices

```csharp
// ❌ AVOID: Hardcoded credentials
string conn = "Server=localhost;Uid=admin;Pwd=password123;Database=mydb;";

// ✅ CORRECT: Store in configuration file
string conn = Configuration.GetConnectionString("MySqlConnection");

// ✅ CORRECT: Use appsettings.json
{
  "ConnectionStrings": {
    "MySqlConnection": "Server=localhost;Database=mydb;Uid=admin;Pwd=***;"
  }
}
```

## Web API Service Implementation

### Create ASP.NET Core Web API Project

```csharp
// Step 1: Create project
// File → New → Project → ASP.NET Core Web API

// Step 2: In Package Manager Console
Install-Package MySql.Data
Install-Package Newtonsoft.Json
```

### Complete PivotController Implementation

```csharp
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
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

        [HttpGet(Name = "GetMySQLResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchMySQLData());
        }

        private DataTable FetchMySQLData()
        {
            try
            {
                // Get connection string from configuration
                string connectionString = _configuration.GetConnectionString("MySqlConnection");
                
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    
                    // Execute query
                    string query = "SELECT * FROM orders";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    
                    // Set command timeout for long-running queries
                    command.CommandTimeout = 300;
                    
                    // Populate DataTable
                    MySqlDataAdapter dataAdapter = new MySqlDataAdapter(command);
                    DataTable dataTable = new DataTable();
                    dataAdapter.Fill(dataTable);
                    
                    connection.Close();
                    return dataTable;
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"Error fetching MySQL data: {ex.Message}", ex);
            }
        }
    }
}
```

## Retrieving Data from MySQL

### Query Execution Patterns

**Simple SELECT Query:**
```csharp
string query = "SELECT * FROM customers";
MySqlCommand command = new MySqlCommand(query, connection);
```

**Parameterized Query (Prevent SQL Injection):**
```csharp
string query = "SELECT * FROM customers WHERE country = @country";
MySqlCommand command = new MySqlCommand(query, connection);
command.Parameters.AddWithValue("@country", "USA");
```

**Complex Query with JOIN:**
```csharp
string query = @"
    SELECT 
        c.customer_id,
        c.customer_name,
        o.order_date,
        o.total_amount
    FROM customers c
    INNER JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.order_date >= @startDate";
MySqlCommand command = new MySqlCommand(query, connection);
command.Parameters.AddWithValue("@startDate", DateTime.Now.AddYears(-1));
```

**Aggregation Query:**
```csharp
string query = @"
    SELECT 
        MONTH(order_date) as Month,
        SUM(total_amount) as Total,
        COUNT(*) as OrderCount
    FROM orders
    GROUP BY MONTH(order_date)";
```

### DataAdapter Pattern

```csharp
// Complete pattern for retrieving data
MySqlConnection connection = new MySqlConnection(connectionString);
connection.Open();

MySqlCommand command = new MySqlCommand("SELECT * FROM orders", connection);
MySqlDataAdapter adapter = new MySqlDataAdapter(command);

DataTable dataTable = new DataTable();
adapter.Fill(dataTable);  // Executes command and fills DataTable

connection.Close();
return dataTable;
```

## JSON Serialization

### Converting DataTable to JSON

```csharp
using Newtonsoft.Json;
using System.Data;

// Method 1: Direct serialization
DataTable dataTable = FetchMySQLData();
string json = JsonConvert.SerializeObject(dataTable);

// Method 2: With custom settings
JsonSerializerSettings settings = new JsonSerializerSettings
{
    NullValueHandling = NullValueHandling.Ignore,
    DateFormatString = "yyyy-MM-dd"
};
string json = JsonConvert.SerializeObject(dataTable, settings);

// Method 3: In HttpGet method
[HttpGet]
public object GetData()
{
    DataTable dt = FetchMySQLData();
    return JsonConvert.SerializeObject(dt);
}
```

### JSON Output Example

```json
[
  {
    "customer_id": 1,
    "name": "John Doe",
    "country": "USA",
    "sales": 15000
  },
  {
    "customer_id": 2,
    "name": "Jane Smith",
    "country": "UK",
    "sales": 12000
  }
]
```

## Pivot Table Configuration

### Configuration Setup

**Web.config:**
```xml
<appSettings>
  <add key="MySqlApi:BaseUrl" value="https://your-server.com/Pivot" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ApiUrl = System.Configuration.ConfigurationManager.AppSettings["MySqlApi:BaseUrl"];
    return View();
}
```

### Basic Configuration

```csharp
@Html.EJS().PivotView("PivotView")
    .Height("450")
    .DataSourceSettings(dataSource => dataSource
        .Url((string)ViewBag.ApiUrl)  // Web API endpoint
        .ExpandAll(false)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("ShipCity").Add();
        })
        .Columns(columns => {
            columns.Name("ShipName").Add();
        })
        .Values(values => {
            values.Name("Freight").Caption("Total Freight").Add();
        }))
    .ShowFieldList(true)
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .Render()
```

### Advanced Configuration with Grouping Bar

```csharp
@Html.EJS().PivotView("PivotView")
    .Height("500")
    .DataSourceSettings(dataSource => dataSource
        .Url((string)ViewBag.ApiUrl)
        .Rows(rows => {
            rows.Name("Country").Caption("Country").Add();
            rows.Name("Product").Caption("Product").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Caption("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Caption("Total Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Quantity").Caption("Qty Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .Filters(filters => {
            filters.Name("Region").Caption("Region").Add();
        }))
    .ShowGroupingBar(true)
    .ShowFieldList(true)
    .Render()
```

## Performance Optimization

### Connection Pooling Configuration

```csharp
// Enable connection pooling in appsettings.json
{
  "ConnectionStrings": {
    "MySqlConnection": "Server=localhost;Database=mydb;Uid=admin;Pwd=password;Pooling=true;Max Pool Size=50;Connection Lifetime=300;"
  }
}
```

### Query Optimization Techniques

**1. Use Appropriate Indexes:**
```sql
CREATE INDEX idx_customer_country ON customers(country);
CREATE INDEX idx_order_date ON orders(order_date);
```

**2. Avoid SELECT * - Select Specific Columns:**
```csharp
// ❌ SLOW
string query = "SELECT * FROM orders";

// ✅ FAST
string query = "SELECT order_id, customer_id, order_date, total_amount FROM orders";
```

**3. Use Pagination for Large Datasets:**
```csharp
string query = "SELECT * FROM orders LIMIT 10000 OFFSET 0";
```

**4. Pre-aggregate Data in Database:**
```csharp
string query = @"
    SELECT 
        customer_id,
        MONTH(order_date) as month,
        SUM(total_amount) as total
    FROM orders
    GROUP BY customer_id, MONTH(order_date)";
```

### Asynchronous Implementation

```csharp
[HttpGet]
public async Task<object> GetAsync()
{
    DataTable data = await FetchMySQLDataAsync();
    return JsonConvert.SerializeObject(data);
}

private async Task<DataTable> FetchMySQLDataAsync()
{
    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        await connection.OpenAsync();
        
        MySqlCommand command = new MySqlCommand("SELECT * FROM orders", connection);
        MySqlDataAdapter adapter = new MySqlDataAdapter(command);
        
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

## Error Handling & Troubleshooting

### Common Errors & Solutions

**Error: "Unable to connect to any of the specified MySQL hosts"**
```csharp
// Solution: Verify connection string
string connectionString = "Server=localhost;Database=mydb;Uid=root;Pwd=password;Port=3306;";

// Check if MySQL is running
// Verify credentials are correct
// Ensure database exists
```

**Error: "Table 'mydb.orders' doesn't exist"**
```csharp
// Solution: Verify table name (case-sensitive)
// Query INFORMATION_SCHEMA
string query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'mydb'";
```

**Error: "Out of memory exception"**
```csharp
// Solution: Use pagination or streaming
// Add CommandBehavior.SequentialAccess
MySqlCommand command = new MySqlCommand(query, connection);
MySqlDataReader reader = command.ExecuteReader(CommandBehavior.SequentialAccess);
```

### Connection String Validation

```csharp
private bool ValidateConnectionString(string connectionString)
{
    try
    {
        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            connection.Open();
            return true;
        }
    }
    catch (MySqlException ex)
    {
        Console.WriteLine($"Connection failed: {ex.Message}");
        return false;
    }
}
```

### Performance Monitoring

```csharp
// Measure query execution time
var stopwatch = System.Diagnostics.Stopwatch.StartNew();

DataTable dataTable = FetchMySQLData();

stopwatch.Stop();
Console.WriteLine($"Query executed in {stopwatch.ElapsedMilliseconds}ms");
```
