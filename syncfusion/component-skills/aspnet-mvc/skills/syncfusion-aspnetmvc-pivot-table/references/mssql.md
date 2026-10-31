# SQL Server Database Binding in ASP.NET MVC Pivot Table

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
- [Retrieving Data from SQL Server](#retrieving-data-from-sql-server)
- [JSON Serialization](#json-serialization)
- [Pivot Table Configuration](#pivot-table-configuration)
- [Authentication Methods](#authentication-methods)
- [Azure SQL Database Integration](#azure-sql-database-integration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Overview

SQL Server is Microsoft's enterprise relational database management system offering advanced analytics, integration with Azure services, and comprehensive security features. The Syncfusion Pivot Table connects to SQL Server through Web API services for enterprise analytics.

**Why SQL Server:** Strong T-SQL support, Azure integration, built-in BI features, advanced security, excellent performance tuning.

**Ideal Use Cases:**
- Enterprise business intelligence
- Financial and accounting systems
- Customer relationship management (CRM)
- Supply chain management
- Real-time dashboard analytics

## Prerequisites & Setup

### Required NuGet Packages

```bash
# For .NET Core / .NET 5+
Install-Package System.Data.SqlClient -Version 4.8.5
Install-Package Newtonsoft.Json -Version 13.0.3
```

### Installation Steps

1. Open **Package Manager Console**
2. Execute the NuGet commands above
3. System.Data.SqlClient is included in .NET Framework by default

### System Requirements

- .NET Framework 4.6.2+ or .NET Core 3.1+
- Visual Studio 2019 or higher
- SQL Server 2017+ or Express Edition
- SQL Server Management Studio (optional)

## Connection String Configuration

### Connection String Formats

```csharp
// Basic Connection (Named Instance)
"Server=localhost\\SQLEXPRESS;Database=mydb;Integrated Security=true;"

// With Port Specification
"Server=localhost,1433;Database=mydb;User Id=sa;Password=yourpassword;"

// With Connection Pooling
"Server=localhost;Database=mydb;User Id=sa;Password=password;Pooling=true;Min Pool Size=5;Max Pool Size=20;"

// With Encryption
"Server=localhost;Database=mydb;User Id=sa;Password=password;Encrypt=true;TrustServerCertificate=false;"

// Named Instance Without Port
"Server=(local)\\MYINSTANCE;Database=mydb;Integrated Security=true;"
```

### Connection String Parameters

| Parameter | Description | Example | Default |
|-----------|-------------|---------|---------|
| **Server** | SQL Server hostname/IP | `localhost` or `server.database.windows.net` | Required |
| **Database** | Database name | `mydb` | Required |
| **User Id** | SQL login name | `sa` or `myuser` | Optional (if Integrated Security) |
| **Password** | SQL login password | `yourpassword` | Optional (if Integrated Security) |
| **Integrated Security** | Use Windows authentication | `true` or `false` | `false` |
| **Pooling** | Connection pooling | `true` or `false` | `true` |
| **Min Pool Size** | Minimum pooled connections | `5`, `10` | `0` |
| **Max Pool Size** | Maximum pooled connections | `20`, `50` | `100` |
| **Encrypt** | Encryption for data transfer | `true` or `false` | `false` |
| **TrustServerCertificate** | Trust self-signed certificates | `true` or `false` | `false` |
| **Command Timeout** | Query timeout (seconds) | `300`, `600` | `30` |

### Environment-Specific Configuration

```csharp
// appsettings.json (Development)
{
  "ConnectionStrings": {
    "SqlServer": "Server=localhost\\SQLEXPRESS;Database=Dev;Integrated Security=true;"
  }
}

// appsettings.production.json (Production)
{
  "ConnectionStrings": {
    "SqlServer": "Server=myserver.database.windows.net;Database=Prod;User Id=sqladmin;Password=***;Encrypt=true;"
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
using System.Data;
using System.Data.SqlClient;

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

        [HttpGet(Name = "GetSqlServerResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchSqlServerData());
        }

        private DataTable FetchSqlServerData()
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("SqlServer");
                
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    
                    string query = "SELECT * FROM Sales";
                    SqlCommand command = new SqlCommand(query, connection);
                    command.CommandTimeout = 300;
                    
                    SqlDataAdapter adapter = new SqlDataAdapter(command);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);
                    
                    return dataTable;
                }
            }
            catch (SqlException ex)
            {
                throw new ApplicationException($"SQL Server error: {ex.Message}", ex);
            }
        }
    }
}
```

## Retrieving Data from SQL Server

### Query Execution Patterns

**Simple SELECT Query:**
```csharp
string query = "SELECT OrderID, CustomerID, OrderDate, Amount FROM Orders";
SqlCommand command = new SqlCommand(query, connection);
```

**Parameterized Query (SQL Injection Prevention):**
```csharp
string query = "SELECT * FROM Orders WHERE CustomerID = @customerId AND OrderDate >= @startDate";
SqlCommand command = new SqlCommand(query, connection);
command.Parameters.AddWithValue("@customerId", 123);
command.Parameters.AddWithValue("@startDate", DateTime.Now.AddYears(-1));
```

**T-SQL Query with Common Table Expression (CTE):**
```csharp
string query = @"
    WITH CustomerOrders AS (
        SELECT 
            CustomerID,
            COUNT(*) as OrderCount,
            SUM(Amount) as TotalAmount
        FROM Orders
        GROUP BY CustomerID
    )
    SELECT * FROM CustomerOrders WHERE OrderCount > 5";
```

**Query with Window Functions:**
```csharp
string query = @"
    SELECT 
        OrderID,
        CustomerID,
        Amount,
        ROW_NUMBER() OVER (PARTITION BY CustomerID ORDER BY Amount DESC) as OrderRank
    FROM Orders";
```

### DataAdapter Implementation

```csharp
SqlConnection connection = new SqlConnection(connectionString);
connection.Open();

SqlCommand command = new SqlCommand(query, connection);
SqlDataAdapter adapter = new SqlDataAdapter(command);

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
DataTable dataTable = FetchSqlServerData();
string json = JsonConvert.SerializeObject(dataTable);

// With custom DateTime format
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
        DataTable data = FetchSqlServerData();
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
  <add key="SqlServerApi:BaseUrl" value="https://your-server.com/Pivot" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ApiUrl = System.Configuration.ConfigurationManager.AppSettings["SqlServerApi:BaseUrl"];
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
            rows.Name("CustomerID").Caption("Customer").Add();
        })
        .Columns(columns => {
            columns.Name("OrderDate").Caption("Order Date").Add();
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
            rows.Name("Category").Caption("Category").Add();
            rows.Name("Subcategory").Caption("Subcategory").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Caption("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Caption("Total Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Orders").Caption("Order Count").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Count).Add();
        })
        .Filters(filters => {
            filters.Name("Region").Caption("Region").Add();
        }))
    .ShowGroupingBar(true)
    .ShowFieldList(true)
    .Render()
```

## Authentication Methods

### SQL Authentication

```csharp
// Connect with SQL login credentials
string connectionString = "Server=myserver;Database=mydb;User Id=sqluser;Password=password;";
```

### Windows (Integrated) Authentication

```csharp
// Use Windows credentials (recommended for Windows environments)
string connectionString = "Server=myserver;Database=mydb;Integrated Security=true;";
```

### Configuring Authentication in SQL Server

```sql
-- Check current authentication mode
EXEC xp_logininfo;

-- Enable SQL authentication (if needed)
-- Run SQL Server Management Studio as administrator
-- Right-click server → Properties → Security
-- Set "Server authentication" to "SQL Server and Windows Authentication mode"

-- Create SQL login
CREATE LOGIN sqluser WITH PASSWORD = 'YourPassword@2024';

-- Create database user
CREATE USER dbuser FOR LOGIN sqluser;

-- Grant permissions
GRANT SELECT ON DATABASE::mydb TO dbuser;
```

## Azure SQL Database Integration

### Azure Connection String

```csharp
// Connect to Azure SQL Database
string connectionString = "Server=myserver.database.windows.net;Database=mydb;User Id=sqladmin@myserver;Password=yourpassword;Encrypt=true;TrustServerCertificate=false;Connection Timeout=30;";

// With managed identity (Azure services)
string connectionString = "Server=myserver.database.windows.net;Database=mydb;Encrypt=true;TrustServerCertificate=false;";
// Use DefaultAzureCredential in code
```

### Using Managed Identity

```csharp
// In Startup.cs
services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
});

// Connection with managed identity
var credential = new DefaultAzureCredential();
var connectionString = "Server=myserver.database.windows.net;Database=mydb;Encrypt=true;TrustServerCertificate=false;";

using (SqlConnection connection = new SqlConnection(connectionString))
{
    var token = credential.GetToken(new Azure.Core.TokenRequestContext(
        new[] { "https://database.windows.net/.default" }));
    
    connection.AccessToken = token.Token;
    connection.Open();
    // Execute queries
}
```

## Performance Optimization

### Connection Pooling

```csharp
// Enable connection pooling
string connectionString = "Server=myserver;Database=mydb;Integrated Security=true;Pooling=true;Min Pool Size=5;Max Pool Size=50;";
```

### Query Optimization

**1. Create Indexes:**
```sql
CREATE INDEX idx_orders_date ON Orders(OrderDate);
CREATE INDEX idx_orders_customer ON Orders(CustomerID);
```

**2. Select Specific Columns:**
```csharp
// ❌ SLOW
string query = "SELECT * FROM Orders";

// ✅ FAST
string query = "SELECT OrderID, CustomerID, OrderDate, Amount FROM Orders";
```

**3. Use Appropriate WHERE Clauses:**
```csharp
string query = @"
    SELECT TOP 50000 * FROM Orders
    WHERE OrderDate >= @startDate
    ORDER BY OrderDate DESC";
command.Parameters.AddWithValue("@startDate", DateTime.Now.AddYears(-1));
```

**4. Stored Procedures for Complex Logic:**
```sql
-- Create stored procedure
CREATE PROCEDURE sp_GetOrdersSummary
    @StartDate DATETIME,
    @EndDate DATETIME
AS
BEGIN
    SELECT 
        CustomerID,
        COUNT(*) as OrderCount,
        SUM(Amount) as TotalAmount
    FROM Orders
    WHERE OrderDate BETWEEN @StartDate AND @EndDate
    GROUP BY CustomerID;
END;
```

```csharp
// Execute stored procedure
string query = "sp_GetOrdersSummary";
SqlCommand command = new SqlCommand(query, connection);
command.CommandType = CommandType.StoredProcedure;
command.Parameters.AddWithValue("@StartDate", startDate);
command.Parameters.AddWithValue("@EndDate", endDate);
```

### Asynchronous Implementation

```csharp
[HttpGet]
public async Task<object> GetAsync()
{
    DataTable data = await FetchSqlServerDataAsync();
    return JsonConvert.SerializeObject(data);
}

private async Task<DataTable> FetchSqlServerDataAsync()
{
    string connectionString = _configuration.GetConnectionString("SqlServer");
    
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        await connection.OpenAsync();
        
        SqlCommand command = new SqlCommand("SELECT * FROM Orders", connection);
        SqlDataAdapter adapter = new SqlDataAdapter(command);
        
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

## Troubleshooting

### Common Connection Issues

**Error: "A network-related or instance-specific error occurred"**
```csharp
// Solution: Verify SQL Server is running
// Check: Server name, instance name, port
// Enable SQL Server TCP/IP protocol
// Verify firewall allows connections
```

**Error: "Login failed for user"**
```csharp
// Solution: Check SQL Server authentication mode
// Verify username and password
// Check SQL login exists and is not locked
```

**Error: "Cannot open database requested by the login"**
```csharp
// Solution: Verify database exists
// Check user has database access
// Verify default database is set correctly
```

### Connection String Validation

```csharp
public bool ValidateSqlServerConnection(string connectionString)
{
    try
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            SqlCommand command = new SqlCommand("SELECT @@VERSION", connection);
            string version = (string)command.ExecuteScalar();
            Console.WriteLine($"Connected to: {version}");
            return true;
        }
    }
    catch (SqlException ex)
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
DataTable data = FetchSqlServerData();
stopwatch.Stop();

Console.WriteLine($"Query completed in {stopwatch.ElapsedMilliseconds}ms");
Console.WriteLine($"Rows retrieved: {data.Rows.Count}");

// Check SQL Server query execution plan
// In SQL Server Management Studio: Include Actual Execution Plan (Ctrl+L)
```
