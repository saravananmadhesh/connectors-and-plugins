# Oracle Database Connections - Syncfusion TypeScript Pivot View

**Framework:** Syncfusion EJ2 Pivot View (TypeScript)  
**Backend:** ASP.NET Core / C# Web API  
**Database Driver:** Oracle.ManagedDataAccess.Core  
**NuGet Packages:** Oracle.ManagedDataAccess.Core, Newtonsoft.Json

---

## ⚠️ SECURITY NOTICE

**All Oracle database connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Parameterized queries (prevent SQL injection)
- Authentication and authorization ([Authorize] attributes)
- Encrypted connections (SSL/TLS)
- Secure credential management (Azure Key Vault, user secrets)

## Overview

Oracle is an enterprise-grade relational database for mission-critical applications. Connecting a Pivot Table to Oracle requires an ASP.NET Core Web API using Oracle.ManagedDataAccess to retrieve data and serialize it for the Pivot Table.

### When to Use Oracle Connection

- **Enterprise Systems**: Large-scale business applications
- **High Availability**: Require redundancy and failover support
- **Complex Transactions**: ACID compliance for critical data
- **Data Security**: Encryption and role-based access control
- **Legacy Systems**: Migrate from existing Oracle deployments
- **Compliance**: Meet industry regulatory requirements

---

## Setup: Oracle Database Connection

### Step 1: Create ASP.NET Core Application

```csharp
// Project Type: ASP.NET Core Web API
// Project Name: PivotOracleService
// .NET Version: .NET 6.0 or higher
```

### Step 2: Install NuGet Package

```bash
Install-Package Oracle.ManagedDataAccess.Core
Install-Package Newtonsoft.Json
```

### Step 3: Create Web API Controller

```csharp
using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;
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

## Basic Oracle Query Execution

### Simple Data Retrieval

Fetch records from Oracle table:

```csharp
private static DataTable FetchOracleResult()
{
    string connectionString = "Data Source=localhost;User Id=scott;Password=tiger;";
    OracleConnection oracleConnection = new OracleConnection(connectionString);
    oracleConnection.Open();
    
    OracleCommand command = new OracleCommand("SELECT * FROM EMPLOYEES", oracleConnection);
    OracleDataAdapter dataAdapter = new OracleDataAdapter(command);
    DataTable dataTable = new DataTable();
    dataAdapter.Fill(dataTable);
    
    oracleConnection.Close();
    return dataTable;
}

[HttpGet(Name = "GetOracleResult")]
public object Get()
{
    return JsonConvert.SerializeObject(FetchOracleResult());
}
```

### Parameterized Queries

Execute with parameters:

```csharp
private static DataTable FetchFilteredOracleData(string department, decimal minSalary)
{
    string connectionString = "Data Source=localhost;User Id=scott;Password=tiger;";
    
    using (OracleConnection oracleConnection = new OracleConnection(connectionString))
    {
        oracleConnection.Open();
        
        OracleCommand command = new OracleCommand(
            "SELECT * FROM EMPLOYEES WHERE DEPT = :Dept AND SALARY >= :Salary",
            oracleConnection
        );
        
        // Add parameters
        command.Parameters.Add("Dept", OracleDbType.Varchar2).Value = department;
        command.Parameters.Add("Salary", OracleDbType.Decimal).Value = minSalary;
        
        OracleDataAdapter dataAdapter = new OracleDataAdapter(command);
        DataTable dataTable = new DataTable();
        dataAdapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

---

## Advanced Oracle Configurations

### Complex Joins

Multi-table queries:

```csharp
private static DataTable FetchOracleJoinData()
{
    string connectionString = "Data Source=localhost;User Id=scott;Password=tiger;";
    
    using (OracleConnection oracleConnection = new OracleConnection(connectionString))
    {
        oracleConnection.Open();
        
        string query = @"
            SELECT 
                e.EMPLOYEE_ID,
                e.NAME,
                e.SALARY,
                d.DEPARTMENT_NAME,
                j.JOB_TITLE,
                m.NAME AS ManagerName
            FROM EMPLOYEES e
            INNER JOIN DEPARTMENTS d ON e.DEPT_ID = d.DEPT_ID
            LEFT JOIN JOBS j ON e.JOB_ID = j.JOB_ID
            LEFT JOIN EMPLOYEES m ON e.MANAGER_ID = m.EMPLOYEE_ID
        ";
        
        OracleCommand command = new OracleCommand(query, oracleConnection);
        OracleDataAdapter dataAdapter = new OracleDataAdapter(command);
        DataTable dataTable = new DataTable();
        dataAdapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Analytical Queries

Window functions for complex analytics:

```csharp
private static DataTable FetchAnalyticalData()
{
    string connectionString = "Data Source=localhost;User Id=scott;Password=tiger;";
    
    using (OracleConnection oracleConnection = new OracleConnection(connectionString))
    {
        oracleConnection.Open();
        
        string query = @"
            SELECT 
                EMPLOYEE_ID,
                NAME,
                SALARY,
                DEPARTMENT_ID,
                ROW_NUMBER() OVER (PARTITION BY DEPARTMENT_ID ORDER BY SALARY DESC) AS SalaryRank,
                AVG(SALARY) OVER (PARTITION BY DEPARTMENT_ID) AS DeptAvgSalary,
                SUM(SALARY) OVER (PARTITION BY DEPARTMENT_ID) AS DeptTotalSalary
            FROM EMPLOYEES
        ";
        
        OracleCommand command = new OracleCommand(query, oracleConnection);
        OracleDataAdapter dataAdapter = new OracleDataAdapter(command);
        DataTable dataTable = new DataTable();
        dataAdapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Stored Procedure Calls

Execute Oracle stored procedures:

```csharp
private static DataTable CallOracleProcedure(int year)
{
    string connectionString = "Data Source=localhost;User Id=scott;Password=tiger;";
    
    using (OracleConnection oracleConnection = new OracleConnection(connectionString))
    {
        oracleConnection.Open();
        
        using (OracleCommand command = new OracleCommand("PKG_REPORTS.GetAnnualReport", oracleConnection))
        {
            command.CommandType = CommandType.StoredProcedure;
            
            // Input parameter
            command.Parameters.Add("p_year", OracleDbType.Int32).Value = year;
            
            // Output cursor parameter
            command.Parameters.Add("p_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
            
            OracleDataAdapter dataAdapter = new OracleDataAdapter(command);
            DataTable dataTable = new DataTable();
            dataAdapter.Fill(dataTable);
            
            return dataTable;
        }
    }
}
```

---

## TypeScript Integration

### Configure Pivot Table with Oracle API

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj = new PivotView({
    dataSourceSettings: {
        url: 'https://localhost:44323/Pivot',
        type: 'JSON'
    },
    rows: [
        { name: 'DEPARTMENT_NAME', caption: 'Department' }
    ],
    columns: [
        { name: 'JOB_TITLE', caption: 'Job Title' }
    ],
    values: [
        { name: 'SALARY', caption: 'Total Salary', type: 'Sum' }
    ]
});

pivotTableObj.appendTo('#PivotTable');
```

---

## Connection String Configurations

### Basic Connection

Direct database connection:

```csharp
string connectionString = "Data Source=localhost;User Id=scott;Password=tiger;";
```

### Network Connection

TNS Name entry:

```csharp
string connectionString = "Data Source=ORACLEDB;User Id=scott;Password=tiger;";
```

### Connection Pool

Optimize resource usage:

```csharp
string connectionString = @"
    Data Source=localhost;
    User Id=scott;Password=tiger;
    Min Pool Size=5;
    Max Pool Size=100;
";
```

---

## Common Patterns

### Pagination with ROWNUM

Handle large result sets:

```csharp
private static DataTable FetchPagedOracleData(int pageIndex, int pageSize)
{
    string connectionString = "Data Source=localhost;User Id=scott;Password=tiger;";
    
    using (OracleConnection oracleConnection = new OracleConnection(connectionString))
    {
        oracleConnection.Open();
        
        int offset = pageIndex * pageSize;
        string query = $@"
            SELECT * FROM (
                SELECT ROW_NUMBER() OVER (ORDER BY EMPLOYEE_ID) AS RowNum, a.*
                FROM EMPLOYEES a
            )
            WHERE RowNum > :Offset AND RowNum <= :PageEnd
        ";
        
        OracleCommand command = new OracleCommand(query, oracleConnection);
        command.Parameters.Add("Offset", OracleDbType.Int32).Value = offset;
        command.Parameters.Add("PageEnd", OracleDbType.Int32).Value = offset + pageSize;
        
        OracleDataAdapter dataAdapter = new OracleDataAdapter(command);
        DataTable dataTable = new DataTable();
        dataAdapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

### Error Handling

Manage Oracle-specific errors:

```csharp
[HttpGet(Name = "GetOracleResult")]
public object Get()
{
    try
    {
        return JsonConvert.SerializeObject(FetchOracleResult());
    }
    catch (OracleException ex)
    {
        return BadRequest($"Oracle Database Error: {ex.Message}");
    }
    catch (Exception ex)
    {
        return BadRequest($"Error: {ex.Message}");
    }
}
```

---

## API Reference

### OracleConnection

| Property/Method | Purpose | Example |
|-----------------|---------|---------|
| `ConnectionString` | Connection info | `"Data Source=...;User Id=...;Password=..."` |
| `Open()` | Establish connection | `connection.Open();` |
| `Close()` | Close connection | `connection.Close();` |

### OracleCommand

| Property | Purpose | Example |
|----------|---------|---------|
| `CommandText` | SQL query or procedure | `"SELECT * FROM EMPLOYEES"` |
| `CommandType` | Text or StoredProcedure | `CommandType.StoredProcedure` |
| `Parameters` | Parameter collection | Add parameters with `Parameters.Add()` |

### OracleDbType

Common data types:
- `Varchar2` - Text
- `Int32` - Integer
- `Decimal` - Decimal number
- `DateTime` - Date/Time
- `RefCursor` - Cursor for procedures

---

## Troubleshooting

### Connection Issues

**Problem:** "TNS entry not found"
- **Cause:** Invalid data source name
- **Solution:** Check TNS names configuration
- **Check:** ORACLE_HOME environment variable set

**Problem:** "Invalid user ID"
- **Cause:** Credentials incorrect
- **Solution:** Verify Oracle user and password
- **Check:** User has appropriate privileges

### Query Issues

**Problem:** "ORA-00942: Table or view does not exist"
- **Cause:** Table not found or no permissions
- **Solution:** Verify table name; check user permissions
- **Check:** Use SELECT * FROM ALL_TABLES to list accessible tables

---

## Best Practices

### 1. Use Parameterized Queries
```csharp
command.Parameters.Add("Dept", OracleDbType.Varchar2).Value = dept;
```

### 2. Implement Connection Pooling
```csharp
Min Pool Size=5;Max Pool Size=100;
```

### 3. Use RefCursor for Procedures
```csharp
command.Parameters.Add("p_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
```

### 4. Set Command Timeout
```csharp
command.CommandTimeout = 300;
```

### 5. Leverage Window Functions
```sql
ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)
```

---
