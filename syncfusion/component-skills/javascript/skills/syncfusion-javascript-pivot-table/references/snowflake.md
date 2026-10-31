# Snowflake Database Connections - Syncfusion TypeScript Pivot View

**Framework:** Syncfusion EJ2 Pivot View (TypeScript)  
**Backend:** ASP.NET Core / C# Web API  
**Database Driver:** Snowflake.Data (Cloud data warehouse)  
**NuGet Packages:** Snowflake.Data, Newtonsoft.Json

---

## ⚠️ SECURITY NOTICE

**All Snowflake connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Parameterized queries (prevent SQL injection)
- Authentication and authorization ([Authorize] attributes)
- Encrypted connections (SSL/TLS enabled by default)
- Secure credential management (Azure Key Vault, user secrets)

## Overview

Snowflake is a cloud-native data warehouse that scales compute and storage independently. Connecting a Pivot Table to Snowflake requires an ASP.NET Core Web API using the Snowflake.Data connector for secure authentication and data retrieval.

### When to Use Snowflake Connection

- **Cloud Data Warehouse**: Analyze massive datasets in cloud
- **Scalable Analytics**: Independent scaling of compute and storage
- **Data Sharing**: Securely share data across organizations
- **Zero Copy Cloning**: Create database clones without copying data
- **Time-Travel**: Query historical data at any point in time
- **Multi-Cloud**: Deploy across AWS, Azure, GCP

---

## Setup: Snowflake Database Connection

### Step 1: Create ASP.NET Core Application

```csharp
// Project Type: ASP.NET Core Web API
// Project Name: PivotSnowflakeService
// .NET Version: .NET 6.0 or higher
```

### Step 2: Install NuGet Package

```bash
Install-Package Snowflake.Data
Install-Package Newtonsoft.Json
```

### Step 3: Create Web API Controller

```csharp
using Microsoft.AspNetCore.Mvc;
using Snowflake.Data.Client;
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

## Basic Snowflake Query Execution

### Simple Data Retrieval

Fetch data from Snowflake table:

```csharp
public static DataTable FetchSnowflakeResult()
{
    using (SnowflakeDbConnection snowflakeConnection = new SnowflakeDbConnection())
    {
        // Snowflake connection string
        snowflakeConnection.ConnectionString = @"
            account=myaccount;
            user=myuser;
            password=mypassword;
            db=analytics_db;
            schema=sales;
        ";
        
        snowflakeConnection.Open();
        SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(
            "SELECT * FROM CALL_CENTER",
            snowflakeConnection
        );
        
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        snowflakeConnection.Close();
        
        return dataTable;
    }
}

[HttpGet(Name = "GetSnowflakeResult")]
public object Get()
{
    return JsonConvert.SerializeObject(FetchSnowflakeResult());
}
```

### Parameterized Queries

Execute with parameters:

```csharp
public static DataTable FetchFilteredSnowflakeData(string year, string region)
{
    using (SnowflakeDbConnection snowflakeConnection = new SnowflakeDbConnection())
    {
        snowflakeConnection.ConnectionString = @"
            account=myaccount;
            user=myuser;
            password=mypassword;
            db=analytics_db;
            schema=sales;
        ";
        
        snowflakeConnection.Open();
        
        string query = "SELECT * FROM SALES WHERE YEAR = ? AND REGION = ?";
        SnowflakeDbCommand command = new SnowflakeDbCommand(query, snowflakeConnection);
        
        // Add parameters
        command.Parameters.AddWithValue("year", year);
        command.Parameters.AddWithValue("region", region);
        
        SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(command);
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

---

## Advanced Snowflake Configurations

### Time-Travel Queries

Query historical data:

```csharp
public static DataTable FetchTimeTraveData(string timestampMinutesAgo)
{
    using (SnowflakeDbConnection snowflakeConnection = new SnowflakeDbConnection())
    {
        snowflakeConnection.ConnectionString = @"
            account=myaccount;
            user=myuser;
            password=mypassword;
            db=analytics_db;
            schema=sales;
        ";
        
        snowflakeConnection.Open();
        
        // Query data from specific point in time
        string query = $@"
            SELECT * FROM SALES
            AT(OFFSET => -{timestampMinutesAgo} * 60)
        ";
        
        SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(query, snowflakeConnection);
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Complex Aggregation

Multi-level grouping and aggregation:

```csharp
public static DataTable FetchAggregatedSnowflakeData()
{
    using (SnowflakeDbConnection snowflakeConnection = new SnowflakeDbConnection())
    {
        snowflakeConnection.ConnectionString = @"
            account=myaccount;
            user=myuser;
            password=mypassword;
            db=analytics_db;
            schema=sales;
        ";
        
        snowflakeConnection.Open();
        
        string query = @"
            SELECT 
                YEAR(SALE_DATE) AS Year,
                MONTH(SALE_DATE) AS Month,
                REGION,
                PRODUCT_CATEGORY,
                SUM(AMOUNT) AS TotalAmount,
                SUM(QUANTITY) AS TotalQuantity,
                COUNT(*) AS RecordCount,
                AVG(AMOUNT) AS AverageAmount
            FROM SALES
            GROUP BY YEAR(SALE_DATE), MONTH(SALE_DATE), REGION, PRODUCT_CATEGORY
            ORDER BY Year DESC, Month DESC
        ";
        
        SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(query, snowflakeConnection);
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Semi-Structured Data (Variant)

Query JSON/Variant columns:

```csharp
public static DataTable QueryVariantData()
{
    using (SnowflakeDbConnection snowflakeConnection = new SnowflakeDbConnection())
    {
        snowflakeConnection.ConnectionString = @"
            account=myaccount;
            user=myuser;
            password=mypassword;
            db=analytics_db;
            schema=data;
        ";
        
        snowflakeConnection.Open();
        
        string query = @"
            SELECT 
                id,
                metadata:name::string AS name,
                metadata:email::string AS email,
                metadata:tracking:country::string AS country,
                CAST(metadata:metrics:views AS NUMBER) AS views
            FROM raw_events
            WHERE metadata:status = 'active'
        ";
        
        SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(query, snowflakeConnection);
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Stored Procedures

Call Snowflake stored procedures:

```csharp
public static DataTable CallSnowflakeProcedure(int year)
{
    using (SnowflakeDbConnection snowflakeConnection = new SnowflakeDbConnection())
    {
        snowflakeConnection.ConnectionString = @"
            account=myaccount;
            user=myuser;
            password=mypassword;
            db=analytics_db;
            schema=public;
        ";
        
        snowflakeConnection.Open();
        
        SnowflakeDbCommand command = new SnowflakeDbCommand("CALL get_annual_report(?)", snowflakeConnection);
        command.Parameters.AddWithValue("year", year);
        
        SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(command);
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

---

## TypeScript Integration

### Configure Pivot Table with Snowflake API

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44323/Pivot',
        type: 'JSON'
    },
    rows: [
        { name: 'REGION', caption: 'Region' }
    ],
    columns: [
        { name: 'YEAR', caption: 'Year' }
    ],
    values: [
        { name: 'AMOUNT', caption: 'Total Sales', type: 'Sum' }
    ],
    filters: [
        { name: 'PRODUCT_CATEGORY', caption: 'Category' }
    ]
});

pivotTableObj.appendTo('#PivotTable');
```

---

## Connection String Configurations

### Basic Connection

Standard Snowflake authentication:

```csharp
string connectionString = @"
    account=myaccount;
    user=myuser;
    password=mypassword;
    db=mydb;
    schema=myschema;
";
```

### OAuth Authentication

Token-based authentication:

```csharp
string connectionString = @"
    account=myaccount;
    user=myuser;
    authenticator=oauth;
    token=your_oauth_token;
    db=mydb;
    schema=myschema;
";
```

### Key Pair Authentication

Private key authentication:

```csharp
string connectionString = @"
    account=myaccount;
    user=myuser;
    private_key_path=/path/to/private/key;
    private_key_passphrase=passphrase;
    db=mydb;
    schema=myschema;
";
```

### Warehouse Specification

Specify compute resources:

```csharp
string connectionString = @"
    account=myaccount;
    user=myuser;
    password=mypassword;
    db=mydb;
    schema=myschema;
    warehouse=compute_wh;
    role=analyst_role;
";
```

---

## Common Patterns

### Pagination with LIMIT/OFFSET

Handle large result sets:

```csharp
public static DataTable FetchPagedSnowflakeData(int pageIndex, int pageSize)
{
    using (SnowflakeDbConnection snowflakeConnection = new SnowflakeDbConnection())
    {
        snowflakeConnection.ConnectionString = @"
            account=myaccount;
            user=myuser;
            password=mypassword;
            db=analytics_db;
            schema=sales;
        ";
        
        snowflakeConnection.Open();
        
        int offset = pageIndex * pageSize;
        string query = $@"
            SELECT * FROM SALES
            ORDER BY SALE_ID
            LIMIT {pageSize} OFFSET {offset}
        ";
        
        SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(query, snowflakeConnection);
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Error Handling

Manage Snowflake-specific errors:

```csharp
[HttpGet(Name = "GetSnowflakeResult")]
public object Get()
{
    try
    {
        return JsonConvert.SerializeObject(FetchSnowflakeResult());
    }
    catch (SnowflakeDbException ex)
    {
        return BadRequest($"Snowflake Error: {ex.Message}");
    }
    catch (Exception ex)
    {
        return BadRequest($"Error: {ex.Message}");
    }
}
```

---

## API Reference

### SnowflakeDbConnection

| Property | Purpose | Example |
|----------|---------|---------|
| `ConnectionString` | Connection settings | `"account=...;user=...;password=..."` |
| `Open()` | Establish connection | `connection.Open();` |
| `Close()` | Close connection | `connection.Close();` |

### SnowflakeDbDataAdapter

| Method | Purpose |
|--------|---------|
| `Fill(DataTable)` | Execute query and populate DataTable |

---

## Troubleshooting

### Connection Issues

**Problem:** "Invalid account identifier"
- **Cause:** Wrong Snowflake account name
- **Solution:** Verify account identifier
- **Check:** Format: `account-identifier.region.provider`

**Problem:** "Authentication failed"
- **Cause:** Invalid credentials
- **Solution:** Check username/password
- **Check:** User exists and has appropriate role

### Query Issues

**Problem:** "Object does not exist"
- **Cause:** Table/schema not found
- **Solution:** Verify schema and table name
- **Check:** Snowflake is case-sensitive for unquoted identifiers

---

## Best Practices

### 1. Use Parameterized Queries
```csharp
command.Parameters.AddWithValue("year", year);
```

### 2. Specify Warehouse
```csharp
warehouse=compute_wh;
```

### 3. Use Time-Travel for Audits
```csharp
AT(OFFSET => -15 * 60)  // 15 minutes ago
```

### 4. Leverage Query Results Cache
- Snowflake automatically caches results
- Re-runs return immediately

### 5. Monitor Query Performance
- Use QUERY_HISTORY view
- Optimize with appropriate warehouse size

---
