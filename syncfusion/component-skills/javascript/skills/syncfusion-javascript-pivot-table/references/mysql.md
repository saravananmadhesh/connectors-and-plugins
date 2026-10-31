# MySQL Database Connections - Syncfusion TypeScript Pivot View

**Framework:** Syncfusion EJ2 Pivot View (TypeScript)  
**Backend:** ASP.NET Core / C# Web API  
**Database Driver:** MySql.Data (MySQL Connector)  
**NuGet Packages:** MySql.Data, Newtonsoft.Json

---

## ⚠️ SECURITY NOTICE

**All MySQL connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Parameterized queries (prevent SQL injection)
- Authentication and authorization ([Authorize] attributes)
- SSL/TLS encrypted connections
- Secure credential management (Azure Key Vault, user secrets)

## Overview

MySQL is a popular open-source relational database that provides cost-effective data storage. Connecting a Pivot Table to MySQL requires an ASP.NET Core Web API service using the MySql.Data connector to retrieve data and serialize it to JSON.

### When to Use MySQL Connection

- **Cost-Effective Solutions**: No licensing fees for open-source database
- **Web Applications**: Industry-standard for web-based analytics
- **High Performance**: Optimized for read-heavy query patterns
- **Scalability**: Horizontal scaling with partitioning strategies
- **Wide Compatibility**: Supported on multiple hosting platforms
- **Standard SQL**: Compatible with familiar SQL syntax

---

## Setup: MySQL Database Connection

### Step 1: Create ASP.NET Core Application

```csharp
// Project Type: ASP.NET Core Web API
// Project Name: PivotMySQLService
// .NET Version: .NET 6.0 or higher
```

### Step 2: Install NuGet Package

```bash
Install-Package MySql.Data
Install-Package Newtonsoft.Json
```

### Step 3: Create Web API Controller

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
        // Controller implementation follows
    }
}
```

---

## Basic MySQL Query Execution

### Simple Data Retrieval

Fetch all records from table:

```csharp
public dynamic GetMySQLResult()
{
    // Connection string with credentials
    MySqlConnection connection = new MySqlConnection(
        "Server=localhost;Database=pivotdb;Uid=root;Pwd=password;"
    );
    
    connection.Open();
    MySqlCommand command = new MySqlCommand("SELECT * FROM orders", connection);
    MySqlDataAdapter dataAdapter = new MySqlDataAdapter(command);
    DataTable dataTable = new DataTable();
    dataAdapter.Fill(dataTable);
    connection.Close();
    
    return dataTable;
}

[HttpGet(Name = "GetMySQLResult")]
public object Get()
{
    return JsonConvert.SerializeObject(GetMySQLResult());
}
```

### Parameterized Queries

Execute with parameter binding:

```csharp
public dynamic GetFilteredOrders(string status, decimal minAmount)
{
    MySqlConnection connection = new MySqlConnection(
        "Server=localhost;Database=pivotdb;Uid=root;Pwd=password;"
    );
    
    connection.Open();
    MySqlCommand command = new MySqlCommand(
        "SELECT * FROM orders WHERE status = @Status AND amount >= @Amount",
        connection
    );
    
    // Add parameters
    command.Parameters.AddWithValue("@Status", status);
    command.Parameters.AddWithValue("@Amount", minAmount);
    
    MySqlDataAdapter dataAdapter = new MySqlDataAdapter(command);
    DataTable dataTable = new DataTable();
    dataAdapter.Fill(dataTable);
    connection.Close();
    
    return dataTable;
}

[HttpGet("filter")]
public object GetFiltered(string status, decimal minAmount)
{
    return JsonConvert.SerializeObject(GetFilteredOrders(status, minAmount));
}
```

---

## Advanced MySQL Configurations

### JOIN Operations

Query from multiple tables:

```csharp
public dynamic GetJoinedData()
{
    MySqlConnection connection = new MySqlConnection(
        "Server=localhost;Database=pivotdb;Uid=root;Pwd=password;"
    );
    
    connection.Open();
    string query = @"
        SELECT 
            o.OrderID,
            o.Amount,
            o.Date,
            c.CustomerName,
            c.Country,
            p.ProductName,
            p.Category
        FROM orders o
        INNER JOIN customers c ON o.CustomerID = c.CustomerID
        LEFT JOIN products p ON o.ProductID = p.ProductID
        WHERE o.Date >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
    ";
    
    MySqlCommand command = new MySqlCommand(query, connection);
    MySqlDataAdapter dataAdapter = new MySqlDataAdapter(command);
    DataTable dataTable = new DataTable();
    dataAdapter.Fill(dataTable);
    connection.Close();
    
    return dataTable;
}
```

### Aggregation Queries

Server-side data aggregation:

```csharp
public dynamic GetAggregatedData()
{
    MySqlConnection connection = new MySqlConnection(
        "Server=localhost;Database=pivotdb;Uid=root;Pwd=password;"
    );
    
    connection.Open();
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
        FROM orders
        GROUP BY YEAR(Date), MONTH(Date), Country, Category
        ORDER BY Year DESC, Month DESC
    ";
    
    MySqlCommand command = new MySqlCommand(query, connection);
    MySqlDataAdapter dataAdapter = new MySqlDataAdapter(command);
    DataTable dataTable = new DataTable();
    dataAdapter.Fill(dataTable);
    connection.Close();
    
    return dataTable;
}
```

### Stored Procedure Execution

Call MySQL stored procedure:

```csharp
public dynamic GetFromProcedure(int year)
{
    MySqlConnection connection = new MySqlConnection(
        "Server=localhost;Database=pivotdb;Uid=root;Pwd=password;"
    );
    
    connection.Open();
    MySqlCommand command = new MySqlCommand("GetYearlySalesReport", connection)
    {
        CommandType = CommandType.StoredProcedure
    };
    
    command.Parameters.AddWithValue("@YearParam", year);
    
    MySqlDataAdapter dataAdapter = new MySqlDataAdapter(command);
    DataTable dataTable = new DataTable();
    dataAdapter.Fill(dataTable);
    connection.Close();
    
    return dataTable;
}
```

---

## TypeScript Integration

### Configure Pivot Table with MySQL API

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44323/Pivot',
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
    ]
});

pivotTableObj.appendTo('#PivotTable');
```

---

## Connection String Configurations

### Basic Connection

Standard MySQL connection:

```csharp
string connString = "Server=localhost;Database=pivotdb;Uid=root;Pwd=password;";
```

### Remote Server

Connect to remote MySQL:

```csharp
string connString = "Server=192.168.1.10;Database=pivotdb;Uid=admin;Pwd=secure123;Port=3306;";
```

### Connection Pooling

Optimize with pooling:

```csharp
string connString = @"
    Server=localhost;
    Database=pivotdb;
    Uid=root;
    Pwd=password;
    Pooling=true;
    Min Pool Size=5;
    Max Pool Size=100;
    Connection Lifetime=300;
";
```

---

## Common Patterns

### Pagination

Handle large datasets:

```csharp
public dynamic GetPagedData(int pageIndex, int pageSize)
{
    MySqlConnection connection = new MySqlConnection(
        "Server=localhost;Database=pivotdb;Uid=root;Pwd=password;"
    );
    
    connection.Open();
    int offset = pageIndex * pageSize;
    string query = $@"
        SELECT * FROM orders
        ORDER BY OrderID
        LIMIT @Limit OFFSET @Offset
    ";
    
    MySqlCommand command = new MySqlCommand(query, connection);
    command.Parameters.AddWithValue("@Limit", pageSize);
    command.Parameters.AddWithValue("@Offset", offset);
    
    MySqlDataAdapter dataAdapter = new MySqlDataAdapter(command);
    DataTable dataTable = new DataTable();
    dataAdapter.Fill(dataTable);
    connection.Close();
    
    return dataTable;
}
```

### Error Handling

Manage connection errors:

```csharp
public object GetSafeData()
{
    try
    {
        MySqlConnection connection = new MySqlConnection(
            "Server=localhost;Database=pivotdb;Uid=root;Pwd=password;"
        );
        
        connection.Open();
        MySqlCommand command = new MySqlCommand("SELECT * FROM orders", connection);
        command.CommandTimeout = 300;
        
        MySqlDataAdapter dataAdapter = new MySqlDataAdapter(command);
        DataTable dataTable = new DataTable();
        dataAdapter.Fill(dataTable);
        connection.Close();
        
        return JsonConvert.SerializeObject(dataTable);
    }
    catch (MySqlException ex)
    {
        return BadRequest("Database error: " + ex.Message);
    }
}
```

---

## API Reference

### MySqlConnection

| Property | Purpose | Example |
|----------|---------|---------|
| `ConnectionString` | Connection details | `"Server=...;Database=...;Uid=...;Pwd=..."` |
| `Open()` | Establish connection | `connection.Open();` |
| `Close()` | Close connection | `connection.Close();` |

### MySqlCommand

| Property | Purpose | Example |
|----------|---------|---------|
| `CommandText` | SQL query | `"SELECT * FROM table"` |
| `CommandType` | Query type | `CommandType.Text or StoredProcedure` |
| `Parameters` | Parameter collection | `cmd.Parameters.AddWithValue()` |

### MySqlDataAdapter

| Method | Purpose |
|--------|---------|
| `Fill(DataTable)` | Populate DataTable |

---

## Troubleshooting

### Connection Issues

**Problem:** "Unable to connect to MySQL"
- **Cause:** Server not running or credentials invalid
- **Solution:** Verify MySQL service; check credentials
- **Check:** Port 3306 accessible

**Problem:** "Access denied for user"
- **Cause:** Wrong username/password
- **Solution:** Verify MySQL user credentials
- **Check:** User has appropriate database permissions

### Query Issues

**Problem:** "Unknown column"
- **Cause:** Column doesn't exist in table
- **Solution:** Verify column name against schema
- **Check:** Use `SHOW COLUMNS FROM table;`

---

## Best Practices

### 1. Always Use Parameterized Queries
```csharp
cmd.Parameters.AddWithValue("@Status", status);
```

### 2. Enable Connection Pooling
```csharp
Pooling=true;Min Pool Size=5;Max Pool Size=100;
```

### 3. Set Command Timeout
```csharp
command.CommandTimeout = 300;
```

### 4. Use `using` Statements
```csharp
using (MySqlConnection connection = new MySqlConnection(connString))
{
    // Automatically disposed
}
```

### 5. Create Database Indexes
- Index frequently queried columns
- Improves query performance

---
