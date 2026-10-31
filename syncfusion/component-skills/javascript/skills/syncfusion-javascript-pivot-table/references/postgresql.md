# PostgreSQL Database Connections - Syncfusion TypeScript Pivot View

**Framework:** Syncfusion EJ2 Pivot View (TypeScript)  
**Backend:** ASP.NET Core / C# Web API  
**Database Driver:** Npgsql (Modern PostgreSQL data provider)  
**NuGet Packages:** Npgsql.EntityFrameworkCore.PostgreSQL, Newtonsoft.Json

---

## ⚠️ SECURITY NOTICE

**All PostgreSQL connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Parameterized queries (prevent SQL injection)
- Authentication and authorization ([Authorize] attributes)
- SSL/TLS encrypted connections
- Secure credential management (Azure Key Vault, user secrets)

## Overview

PostgreSQL is a powerful open-source relational database with advanced features like JSON support and full-text search. Connecting a Pivot Table to PostgreSQL requires an ASP.NET Core Web API using Npgsql to retrieve data.

### When to Use PostgreSQL Connection

- **JSONB Support**: Store and query JSON data efficiently
- **Advanced Features**: Window functions, CTEs, partial indexes
- **High Concurrency**: MVCC for better concurrent access
- **Open Source**: No licensing costs, extensive community support
- **Scalability**: Both vertical and horizontal scaling options
- **Cloud Deployment**: Popular on AWS RDS, Azure, Google Cloud

---

## Setup: PostgreSQL Database Connection

### Step 1: Create ASP.NET Core Application

```csharp
// Project Type: ASP.NET Core Web API
// Project Name: PivotPostgreSQLService
// .NET Version: .NET 6.0 or higher
```

### Step 2: Install NuGet Package

```bash
Install-Package Npgsql.EntityFrameworkCore.PostgreSQL
Install-Package Newtonsoft.Json
```

### Step 3: Create Web API Controller

```csharp
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Newtonsoft.Json;
using System.Data;

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

## Basic PostgreSQL Query Execution

### Simple Data Retrieval

Fetch data from PostgreSQL table:

```csharp
public dynamic GetPostgreSQLResult()
{
    NpgsqlConnection connection = new NpgsqlConnection(
        "Server=localhost;Database=pivotdb;User Id=postgres;Password=password;"
    );
    
    connection.Open();
    NpgsqlCommand cmd = new NpgsqlCommand("SELECT * FROM sales_data", connection);
    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
    DataTable dt = new DataTable();
    da.Fill(dt);
    connection.Close();
    
    return dt;
}

[HttpGet(Name = "GetPostgreSQLResult")]
public object Get()
{
    return JsonConvert.SerializeObject(GetPostgreSQLResult());
}
```

### Parameterized Queries

Execute with parameter binding:

```csharp
public dynamic GetFilteredPostgreSQLData(string year, string country)
{
    using (NpgsqlConnection connection = new NpgsqlConnection(
        "Server=localhost;Database=pivotdb;User Id=postgres;Password=password;"
    ))
    {
        connection.Open();
        
        NpgsqlCommand cmd = new NpgsqlCommand(
            "SELECT * FROM sales_data WHERE year = @Year AND country = @Country",
            connection
        );
        
        cmd.Parameters.AddWithValue("@Year", year);
        cmd.Parameters.AddWithValue("@Country", country);
        
        NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        
        return dt;
    }
}
```

---

## Advanced PostgreSQL Configurations

### Window Functions

Complex analytical queries:

```csharp
public dynamic GetWindowFunctionData()
{
    using (NpgsqlConnection connection = new NpgsqlConnection(
        "Server=localhost;Database=pivotdb;User Id=postgres;Password=password;"
    ))
    {
        connection.Open();
        
        string query = @"
            SELECT 
                employee_id,
                name,
                salary,
                department,
                ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank,
                AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary,
                LAG(salary) OVER (PARTITION BY department ORDER BY salary) AS prev_salary
            FROM employees
        ";
        
        NpgsqlCommand cmd = new NpgsqlCommand(query, connection);
        NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        
        return dt;
    }
}
```

### JSONB Queries

Query JSON data:

```csharp
public dynamic GetJSONBData()
{
    using (NpgsqlConnection connection = new NpgsqlConnection(
        "Server=localhost;Database=pivotdb;User Id=postgres;Password=password;"
    ))
    {
        connection.Open();
        
        // Query JSONB column
        string query = @"
            SELECT 
                id,
                data->>'name' AS name,
                data->>'email' AS email,
                data->'metadata'->>'country' AS country,
                (data->'metrics'->>'views')::int AS views
            FROM customer_data
            WHERE data @> '{\"\"status""\": ""active""}'
        ";
        
        NpgsqlCommand cmd = new NpgsqlCommand(query, connection);
        NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        
        return dt;
    }
}
```

### Common Table Expressions (CTE)

Complex hierarchical queries:

```csharp
public dynamic GetCTEData()
{
    using (NpgsqlConnection connection = new NpgsqlConnection(
        "Server=localhost;Database=pivotdb;User Id=postgres;Password=password;"
    ))
    {
        connection.Open();
        
        string query = @"
            WITH ranked_sales AS (
                SELECT 
                    salesperson_id,
                    name,
                    amount,
                    ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank
                FROM sales
            )
            SELECT * FROM ranked_sales WHERE rank <= 10
        ";
        
        NpgsqlCommand cmd = new NpgsqlCommand(query, connection);
        NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        
        return dt;
    }
}
```

### Stored Procedure Execution

Call PostgreSQL function:

```csharp
public dynamic CallPostgreSQLFunction(int year)
{
    using (NpgsqlConnection connection = new NpgsqlConnection(
        "Server=localhost;Database=pivotdb;User Id=postgres;Password=password;"
    ))
    {
        connection.Open();
        
        NpgsqlCommand cmd = new NpgsqlCommand("get_annual_sales", connection)
        {
            CommandType = CommandType.StoredProcedure
        };
        
        cmd.Parameters.AddWithValue("p_year", year);
        
        NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        
        return dt;
    }
}
```

---

## TypeScript Integration

### Configure Pivot Table with PostgreSQL API

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44323/Pivot',
        type: 'JSON'
    },
    rows: [
        { name: 'country', caption: 'Country' }
    ],
    columns: [
        { name: 'year', caption: 'Year' }
    ],
    values: [
        { name: 'amount', caption: 'Total Sales', type: 'Sum' }
    ]
});

pivotTableObj.appendTo('#PivotTable');
```

---

## Connection String Configurations

### Basic Connection

Standard PostgreSQL connection:

```csharp
string connString = "Server=localhost;Database=pivotdb;User Id=postgres;Password=password;";
```

### Remote Server

Connect to remote PostgreSQL:

```csharp
string connString = "Server=db.example.com;Database=pivotdb;User Id=admin;Password=secure123;Port=5432;";
```

### Connection Pooling

Optimize with pooling:

```csharp
string connString = @"
    Server=localhost;
    Database=pivotdb;
    User Id=postgres;
    Password=password;
    MaximumPoolSize=100;
    MinimumPoolSize=5;
    ConnectionIdleLifetime=300;
";
```

---

## Common Patterns

### Pagination with OFFSET/LIMIT

Handle large datasets:

```csharp
public dynamic GetPagedPostgreSQLData(int pageIndex, int pageSize)
{
    using (NpgsqlConnection connection = new NpgsqlConnection(
        "Server=localhost;Database=pivotdb;User Id=postgres;Password=password;"
    ))
    {
        connection.Open();
        
        int offset = pageIndex * pageSize;
        string query = $@"
            SELECT * FROM sales_data
            ORDER BY sale_id
            LIMIT @Limit OFFSET @Offset
        ";
        
        NpgsqlCommand cmd = new NpgsqlCommand(query, connection);
        cmd.Parameters.AddWithValue("@Limit", pageSize);
        cmd.Parameters.AddWithValue("@Offset", offset);
        
        NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        
        return dt;
    }
}
```

### Full-Text Search

Search text fields:

```csharp
public dynamic FullTextSearch(string searchTerm)
{
    using (NpgsqlConnection connection = new NpgsqlConnection(
        "Server=localhost;Database=pivotdb;User Id=postgres;Password=password;"
    ))
    {
        connection.Open();
        
        string query = @"
            SELECT id, title, description, 
                   ts_rank(to_tsvector(description), 
                          plainto_tsquery(@Search)) AS rank
            FROM documents
            WHERE to_tsvector(description) @@ plainto_tsquery(@Search)
            ORDER BY rank DESC
        ";
        
        NpgsqlCommand cmd = new NpgsqlCommand(query, connection);
        cmd.Parameters.AddWithValue("@Search", searchTerm);
        
        NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        
        return dt;
    }
}
```

### Error Handling

Manage PostgreSQL errors:

```csharp
[HttpGet(Name = "GetPostgreSQLResult")]
public object Get()
{
    try
    {
        return JsonConvert.SerializeObject(GetPostgreSQLResult());
    }
    catch (NpgsqlException ex)
    {
        return BadRequest($"PostgreSQL Error: {ex.Message}");
    }
    catch (Exception ex)
    {
        return BadRequest($"Error: {ex.Message}");
    }
}
```

---

## API Reference

### NpgsqlConnection

| Property | Purpose | Example |
|----------|---------|---------|
| `ConnectionString` | Connection info | `"Server=...;Database=...;User Id=...;"` |
| `Open()` | Establish connection | `connection.Open();` |
| `Close()` | Close connection | `connection.Close();` |

### NpgsqlCommand

| Property | Purpose | Example |
|----------|---------|---------|
| `CommandText` | SQL query | `"SELECT * FROM table"` |
| `CommandType` | Text or StoredProcedure | `CommandType.StoredProcedure` |
| `Parameters` | Parameter collection | `cmd.Parameters.AddWithValue()` |

---

## Troubleshooting

### Connection Issues

**Problem:** "Could not connect to server"
- **Cause:** PostgreSQL server not running
- **Solution:** Start PostgreSQL service
- **Check:** Port 5432 is open

**Problem:** "FATAL: no password supplied"
- **Cause:** Authentication required but not provided
- **Solution:** Add password to connection string
- **Check:** PostgreSQL user and password correct

### Query Issues

**Problem:** "Relation does not exist"
- **Cause:** Table name incorrect or case-sensitive mismatch
- **Solution:** Check table name (PostgreSQL is case-sensitive for quoted identifiers)
- **Check:** Use `\dt` in psql to list tables

---

## Best Practices

### 1. Use Parameterized Queries
```csharp
cmd.Parameters.AddWithValue("@Year", year);
```

### 2. Enable Connection Pooling
```csharp
MaximumPoolSize=100;MinimumPoolSize=5;
```

### 3. Leverage JSONB
```sql
data @> '{"status": "active"}'
```

### 4. Use Window Functions
```sql
ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)
```

### 5. Create Indexes
- Index frequently queried columns
- Improves query performance

---
