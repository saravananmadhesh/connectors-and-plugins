# SQL Server Database Connections - Syncfusion TypeScript Pivot View

**Framework:** Syncfusion EJ2 Pivot View (TypeScript)  
**Backend:** ASP.NET Core / C# Web API  
**Database Driver:** Microsoft.Data.SqlClient (System.Data.SqlClient)  
**NuGet Packages:** Microsoft.Data.SqlClient, Newtonsoft.Json

---

## ⚠️ SECURITY NOTICE

**All SQL Server connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Parameterized queries (prevent SQL injection)
- Authentication and authorization ([Authorize] attributes)
- Encrypted connections (SSL/TLS)
- Secure credential management (Azure Key Vault, user secrets)

## Overview

Connecting a Pivot Table to a SQL Server database requires setting up an ASP.NET Core Web API service that retrieves data from SQL Server and exposes it as a JSON endpoint. This backend service handles database connectivity, query execution, and data serialization for consumption by the Pivot Table component.

### When to Use SQL Server Connection

- **Enterprise Applications**: Use for large-scale business data analysis
- **On-Premises Data**: Store sensitive data in controlled SQL Server environments
- **Complex Queries**: Execute advanced SQL operations on server-side
- **Real-Time Analysis**: Connect to live operational databases
- **Data Warehousing**: Analyze aggregated data from data warehouse schemas
- **Compliance Requirements**: Meet regulatory data storage requirements

---

## Architecture Overview

```
TypeScript Pivot View
        ↓ (HTTP Request)
ASP.NET Core Web API
        ↓ (SqlConnection)
SQL Server Database
        ↓ (DataTable)
JSON Serialization
        ↓ (HTTP Response)
TypeScript Pivot View
```

**Flow:**
1. Pivot Table makes HTTP GET request to Web API endpoint
2. Web API opens SQL Server connection
3. Executes SQL query via SqlCommand
4. Populates DataTable using SqlDataAdapter
5. Serializes DataTable to JSON using JsonConvert
6. Returns JSON response to Pivot Table
7. Pivot Table binds data to component

---

## Setup: SQL Server Database Connection

### Prerequisites

- ✅ ASP.NET Core Web Application created
- ✅ SQL Server database accessible
- ✅ Valid connection string with authentication
- ✅ Appropriate database permissions

### Step 1: Create ASP.NET Core Application

Create a new ASP.NET Core Web App project in Visual Studio:

```csharp
// Project Type: ASP.NET Core Web API
// Project Name: PivotWebService
// .NET Version: .NET 6.0 or higher
```

### Step 2: Install NuGet Packages

Install required packages via NuGet Package Manager:

```bash
Install-Package Microsoft.Data.SqlClient
Install-Package Newtonsoft.Json
```

**Alternative:** Search NuGet packages in Visual Studio Package Manager Console

### Step 3: Create Web API Controller

Create `PivotController.cs` in the `Controllers` folder:

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        // Controller will be populated in next steps
    }
}
```

---

## Basic SQL Server Query Execution

### Simple Data Retrieval

Fetch all data from a table:

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        private static DataTable FetchSQLResult()
        {
            // Replace with your connection string
            string connectionString = @"Server=localhost;Database=PivotDB;Integrated Security=true;";
            
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                
                // Query to retrieve data
                string query = "SELECT * FROM SalesData";
                SqlCommand cmd = new SqlCommand(query, sqlConnection);
                
                // Use DataAdapter to populate DataTable
                SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
                DataTable dataTable = new DataTable();
                dataAdapter.Fill(dataTable);
                
                sqlConnection.Close();
                return dataTable;
            }
        }

        [HttpGet(Name = "GetSQLResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchSQLResult());
        }
    }
}
```

### Filtered Query Execution

Fetch data with WHERE clause filters:

```csharp
private static DataTable FetchFilteredData(string year, string country)
{
    string connectionString = @"Server=localhost;Database=PivotDB;Integrated Security=true;";
    
    using (SqlConnection sqlConnection = new SqlConnection(connectionString))
    {
        sqlConnection.Open();
        
        // Parameterized query for security
        string query = "SELECT * FROM SalesData WHERE Year = @Year AND Country = @Country";
        SqlCommand cmd = new SqlCommand(query, sqlConnection);
        
        // Add parameters to prevent SQL injection
        cmd.Parameters.AddWithValue("@Year", year);
        cmd.Parameters.AddWithValue("@Country", country);
        
        SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
        DataTable dataTable = new DataTable();
        dataAdapter.Fill(dataTable);
        
        return dataTable;
    }
}

[HttpGet("filter")]
public object GetFiltered(string year, string country)
{
    return JsonConvert.SerializeObject(FetchFilteredData(year, country));
}
```

---

## Advanced SQL Server Configurations

### Multiple Table Join

Query data from multiple related tables:

```csharp
private static DataTable FetchJoinedData()
{
    string connectionString = @"Server=localhost;Database=PivotDB;Integrated Security=true;";
    
    using (SqlConnection sqlConnection = new SqlConnection(connectionString))
    {
        sqlConnection.Open();
        
        // JOIN query combining multiple tables
        string query = @"
            SELECT 
                s.SalesID,
                s.Amount,
                s.Quantity,
                s.Date,
                p.ProductName,
                p.Category,
                c.CustomerName,
                c.Country
            FROM SalesData s
            INNER JOIN Products p ON s.ProductID = p.ProductID
            INNER JOIN Customers c ON s.CustomerID = c.CustomerID
            WHERE s.Date >= DATEADD(YEAR, -1, GETDATE())
        ";
        
        SqlCommand cmd = new SqlCommand(query, sqlConnection);
        SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
        DataTable dataTable = new DataTable();
        dataAdapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Aggregation and Grouping

Perform server-side aggregation:

```csharp
private static DataTable FetchAggregatedData()
{
    string connectionString = @"Server=localhost;Database=PivotDB;Integrated Security=true;";
    
    using (SqlConnection sqlConnection = new SqlConnection(connectionString))
    {
        sqlConnection.Open();
        
        // Server-side aggregation reduces data volume
        string query = @"
            SELECT 
                YEAR(Date) AS Year,
                MONTH(Date) AS Month,
                Country,
                Category,
                SUM(Amount) AS TotalAmount,
                SUM(Quantity) AS TotalQuantity,
                COUNT(*) AS RecordCount,
                AVG(Amount) AS AverageAmount
            FROM SalesData
            GROUP BY YEAR(Date), MONTH(Date), Country, Category
        ";
        
        SqlCommand cmd = new SqlCommand(query, sqlConnection);
        SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
        DataTable dataTable = new DataTable();
        dataAdapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Stored Procedure Execution

Call stored procedures for complex logic:

```csharp
private static DataTable FetchFromStoredProcedure(int year)
{
    string connectionString = @"Server=localhost;Database=PivotDB;Integrated Security=true;";
    
    using (SqlConnection sqlConnection = new SqlConnection(connectionString))
    {
        sqlConnection.Open();
        
        // Execute stored procedure
        using (SqlCommand cmd = new SqlCommand("sp_GetSalesReport", sqlConnection))
        {
            cmd.CommandType = CommandType.StoredProcedure;
            
            // Pass parameters to procedure
            cmd.Parameters.AddWithValue("@Year", year);
            
            SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
            DataTable dataTable = new DataTable();
            dataAdapter.Fill(dataTable);
            
            return dataTable;
        }
    }
}

[HttpGet("report/{year}")]
public object GetSalesReport(int year)
{
    return JsonConvert.SerializeObject(FetchFromStoredProcedure(year));
}
```

---

## TypeScript Integration

### Configure Pivot View with SQL Server API

Setup Pivot Table to connect to SQL Server Web API:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView;

let pivotTableObj = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44323/Pivot',  // Web API endpoint
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
    filters: [],
    height: '100%'
});

pivotTableObj.appendTo('#PivotTable');
```

### Dynamic Query Execution

Pass query parameters from TypeScript to backend:

```typescript
// TypeScript: Dynamic data loading based on filters
let loadSalesData = (year: string, country: string) => {
    let url = `https://localhost:44323/Pivot/filter?year=${year}&country=${country}`;
    
    let pivotTableObj = new PivotView({
        dataSourceSettings: {
            url: url,
            type: 'JSON'
        },
        rows: [
            { name: 'Product', caption: 'Product' }
        ],
        columns: [
            { name: 'Quarter', caption: 'Quarter' }
        ],
        values: [
            { name: 'Amount', caption: 'Sales', type: 'Sum' }
        ]
    });
    
    pivotTableObj.appendTo('#PivotTable');
};

// Call with specific parameters
loadSalesData('2023', 'USA');
```

---

## Connection String Configurations

### Windows Authentication

Integrated Security (no username/password required):

```csharp
string connectionString = @"Server=localhost;Database=PivotDB;Integrated Security=true;";
```

### SQL Server Authentication

Username and password authentication:

```csharp
string connectionString = @"Server=localhost;Database=PivotDB;User Id=sa;Password=YourPassword;";
```

### Remote Server Connection

Connect to remote SQL Server instances:

```csharp
string connectionString = @"Server=192.168.1.10,1433;Database=PivotDB;User Id=admin;Password=secure123;";
```

### Connection Pooling

Optimize performance with connection pooling:

```csharp
string connectionString = @"
    Server=localhost;
    Database=PivotDB;
    Integrated Security=true;
    Min Pool Size=5;
    Max Pool Size=100;
    Pooling=true;
";
```

---

## Common Patterns

### Performance Optimization: Pagination

Load large datasets in chunks:

```csharp
private static DataTable FetchPagedData(int pageIndex, int pageSize)
{
    string connectionString = @"Server=localhost;Database=PivotDB;Integrated Security=true;";
    
    using (SqlConnection sqlConnection = new SqlConnection(connectionString))
    {
        sqlConnection.Open();
        
        // OFFSET/FETCH for pagination
        string query = @"
            SELECT * FROM SalesData
            ORDER BY SalesID
            OFFSET @Offset ROWS
            FETCH NEXT @PageSize ROWS ONLY
        ";
        
        SqlCommand cmd = new SqlCommand(query, sqlConnection);
        cmd.Parameters.AddWithValue("@Offset", pageIndex * pageSize);
        cmd.Parameters.AddWithValue("@PageSize", pageSize);
        
        SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
        DataTable dataTable = new DataTable();
        dataAdapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Error Handling

Implement robust error management:

```csharp
private static DataTable FetchWithErrorHandling()
{
    string connectionString = @"Server=localhost;Database=PivotDB;Integrated Security=true;";
    
    try
    {
        using (SqlConnection sqlConnection = new SqlConnection(connectionString))
        {
            sqlConnection.Open();
            
            string query = "SELECT * FROM SalesData";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            
            // Set command timeout to prevent long-running queries
            cmd.CommandTimeout = 300; // 5 minutes
            
            SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
            DataTable dataTable = new DataTable();
            dataAdapter.Fill(dataTable);
            
            return dataTable;
        }
    }
    catch (SqlException sqlEx)
    {
        // Handle SQL-specific errors
        Console.WriteLine($"SQL Error: {sqlEx.Message}");
        return new DataTable();
    }
    catch (Exception ex)
    {
        // Handle general exceptions
        Console.WriteLine($"Error: {ex.Message}");
        return new DataTable();
    }
}
```

### Caching Results

Reduce database load with caching:

```csharp
using Microsoft.Extensions.Caching.Memory;

[ApiController]
[Route("[controller]")]
public class PivotController : ControllerBase
{
    private readonly IMemoryCache _cache;

    public PivotController(IMemoryCache cache)
    {
        _cache = cache;
    }

    [HttpGet(Name = "GetSQLResult")]
    public object Get()
    {
        string cacheKey = "sql_pivot_data";
        
        if (!_cache.TryGetValue(cacheKey, out DataTable cachedData))
        {
            // Data not in cache, fetch from database
            cachedData = FetchSQLResult();
            
            // Cache for 1 hour
            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromHours(1));
            
            _cache.Set(cacheKey, cachedData, cacheOptions);
        }
        
        return JsonConvert.SerializeObject(cachedData);
    }

    private static DataTable FetchSQLResult()
    {
        // Database query logic
        string connectionString = @"Server=localhost;Database=PivotDB;Integrated Security=true;";
        
        using (SqlConnection sqlConnection = new SqlConnection(connectionString))
        {
            sqlConnection.Open();
            string query = "SELECT * FROM SalesData";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
            DataTable dataTable = new DataTable();
            dataAdapter.Fill(dataTable);
            return dataTable;
        }
    }
}
```

---

## API Reference

### SqlConnection Class

| Property/Method | Purpose | Example |
|-----------------|---------|---------|
| `ConnectionString` | Database connection details | `@"Server=localhost;Database=DB;..."` |
| `Open()` | Establish connection | `sqlConnection.Open();` |
| `Close()` | Terminate connection | `sqlConnection.Close();` |
| `Dispose()` | Release resources (via `using`) | Automatic with `using` statement |

### SqlCommand Class

| Property/Method | Purpose | Example |
|-----------------|---------|---------|
| `CommandText` | SQL query or procedure name | `"SELECT * FROM Table"` |
| `CommandType` | Query type (Text/StoredProcedure) | `CommandType.Text` |
| `Parameters` | Parameter collection | `cmd.Parameters.AddWithValue()` |
| `ExecuteReader()` | Execute query, return reader | For streaming results |
| `ExecuteScalar()` | Execute, return single value | For COUNT, SUM, etc. |

### SqlDataAdapter Class

| Property/Method | Purpose | Example |
|-----------------|---------|---------|
| `Fill(DataTable)` | Populate DataTable from query | `adapter.Fill(dataTable);` |
| `SelectCommand` | Command for SELECT | `adapter.SelectCommand = cmd;` |

---

## Troubleshooting

### Connection String Issues

**Problem:** "Login failed for user"
- **Cause:** Invalid credentials or authentication mismatch
- **Solution:** Verify username/password or enable Windows Authentication
- **Check:** Connection string format matches SQL Server security model

**Problem:** "Cannot open database"
- **Cause:** Database doesn't exist or permission denied
- **Solution:** Verify database name; check user permissions
- **Check:** User account has db_datareader role

### Query Execution Errors

**Problem:** "Timeout expired"
- **Cause:** Query takes too long to execute
- **Solution:** Optimize SQL query; increase `CommandTimeout`
- **Implementation:**
  ```csharp
  cmd.CommandTimeout = 600; // 10 minutes
  ```

**Problem:** "Invalid column name"
- **Cause:** Column referenced in query doesn't exist
- **Solution:** Verify column names match database schema
- **Check:** Use SQL Server Management Studio to inspect table structure

### JSON Serialization Issues

**Problem:** "DateTime formatting error"
- **Cause:** DateTime columns not properly serialized
- **Solution:** Configure JSON serialization settings
- **Implementation:**
  ```csharp
  var settings = new JsonSerializerSettings
  {
      DateFormatString = "yyyy-MM-ddTHH:mm:ss"
  };
  return JsonConvert.SerializeObject(dataTable, settings);
  ```

**Problem:** "Circular reference detected"
- **Cause:** Self-referential data structures
- **Solution:** Use `ReferenceLoopHandling` setting
- **Implementation:**
  ```csharp
  var settings = new JsonSerializerSettings
  {
      ReferenceLoopHandling = ReferenceLoopHandling.Ignore
  };
  ```

---

## Best Practices

### 1. Always Use Parameterized Queries
Prevent SQL injection attacks:
```csharp
cmd.Parameters.AddWithValue("@Year", year);
```

### 2. Use Connection Pooling
Improve performance for multiple connections:
```csharp
string connectionString = @"...;Pooling=true;Min Pool Size=5;";
```

### 3. Implement Timeout Handling
Prevent long-running queries from blocking:
```csharp
cmd.CommandTimeout = 300; // 5 minutes max
```

### 4. Use `using` Statements
Ensure resources are properly disposed:
```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    // Connection automatically closed and disposed
}
```

### 5. Leverage Stored Procedures
Encapsulate complex logic on database:
```csharp
cmd.CommandType = CommandType.StoredProcedure;
cmd.CommandText = "sp_GetMonthlySalesReport";
```

### 6. Implement Caching
Reduce database load for frequently accessed data:
```csharp
_cache.Set(cacheKey, data, TimeSpan.FromHours(1));
```

### 7. Monitor Query Performance
Track slow queries and optimize:
- Use SQL Profiler to identify bottlenecks
- Create indexes on frequently queried columns
- Use query execution plans to optimize

### 8. Handle Errors Gracefully
Provide meaningful feedback:
```csharp
catch (SqlException ex)
{
    return BadRequest("Database error: " + ex.Message);
}
```

---
