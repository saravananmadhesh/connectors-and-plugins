# Oracle Database Binding in ASP.NET MVC Pivot Table

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
- [Retrieving Data from Oracle](#retrieving-data-from-oracle)
- [JSON Serialization](#json-serialization)
- [Pivot Table Configuration](#pivot-table-configuration)
- [Authentication Methods](#authentication-methods)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Overview

Oracle Database is an enterprise-grade relational database management system known for reliability, scalability, and advanced security features. The Syncfusion Pivot Table connects to Oracle databases through Web API services for enterprise data analysis.

**Why Oracle:** Enterprise reliability, advanced security, complex query optimization, ACID compliance, superior performance tuning.

**Ideal Use Cases:**
- Enterprise financial reporting
- Complex business analytics
- Government/compliance systems
- Large-scale OLTP/OLAP workloads
- Enterprise resource planning (ERP)

## Prerequisites & Setup

### Required NuGet Packages

```bash
Install-Package Oracle.ManagedDataAccess.Core -Version 21.12.0
Install-Package Newtonsoft.Json -Version 13.0.3
```

### Installation Steps

1. Open **Package Manager Console**
2. Execute the NuGet commands above
3. Ensure Oracle.ManagedDataAccess.Core version 21+

### System Requirements

- .NET Core 3.1+ or .NET Framework 4.6.2+
- Visual Studio 2019 or higher
- Oracle Database 11g Release 2+
- SQL Developer (optional, database tool)

## Connection String Configuration

### Connection String Formats

```csharp
// Basic Connection (SQL*Net)
"Data Source=localhost:1521/orcl;User Id=scott;Password=tiger;"

// Using TNS Name
"Data Source=mydb;User Id=scott;Password=tiger;"

// With Service Name
"Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=orcl)));User Id=scott;Password=tiger;"

// With Connection Pooling
"Data Source=localhost:1521/orcl;User Id=scott;Password=tiger;Pooling=true;Min Pool Size=5;Max Pool Size=50;"

// With DBA Privileges
"Data Source=localhost:1521/orcl;User Id=sys;Password=password;DBA Privilege=SYSDBA;"
```

### Connection String Parameters

| Parameter | Description | Example | Default |
|-----------|-------------|---------|---------|
| **Data Source** | Database identifier | `localhost:1521/orcl` | Required |
| **User Id** | Username | `scott` | Required |
| **Password** | User password | `tiger` | Required |
| **Pooling** | Connection pooling | `true` or `false` | `false` |
| **Min Pool Size** | Minimum pooled connections | `5`, `10` | `1` |
| **Max Pool Size** | Maximum pooled connections | `50`, `100` | `100` |
| **Command Timeout** | Query timeout (seconds) | `300`, `600` | `0` |
| **DBA Privilege** | Connect as DBA | `SYSDBA`, `SYSOPER` | None |

### TNS Configuration

```csharp
// Create TNSNAMES.ORA file
// Edit tnsnames.ora located in:
// Windows: $ORACLE_HOME\network\admin\

MYDB =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.1.100)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = orcl)
    )
  )

// Then use in connection string
string connStr = "Data Source=MYDB;User Id=scott;Password=tiger;";
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
using Oracle.ManagedDataAccess.Client;
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

        [HttpGet(Name = "GetOracleResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchOracleData());
        }

        private DataTable FetchOracleData()
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("OracleConnection");
                
                using (OracleConnection connection = new OracleConnection(connectionString))
                {
                    connection.Open();
                    
                    // Oracle SQL with proper casing (case-sensitive)
                    string query = "SELECT * FROM EMPLOYEES WHERE DEPARTMENT_ID < 100";
                    OracleCommand command = new OracleCommand(query, connection);
                    command.CommandTimeout = 300;
                    
                    OracleDataAdapter adapter = new OracleDataAdapter(command);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);
                    
                    return dataTable;
                }
            }
            catch (OracleException ex)
            {
                throw new ApplicationException($"Oracle error: {ex.Message}", ex);
            }
        }
    }
}
```

## Retrieving Data from Oracle

### Query Execution Patterns

**Simple SELECT Query:**
```csharp
string query = "SELECT EMPLOYEE_ID, EMPLOYEE_NAME, SALARY FROM EMPLOYEES";
OracleCommand command = new OracleCommand(query, connection);
```

**Parameterized Query (SQL Injection Prevention):**
```csharp
string query = "SELECT * FROM EMPLOYEES WHERE DEPARTMENT_ID = :deptId";
OracleCommand command = new OracleCommand(query, connection);
command.Parameters.Add(":deptId", 10);
```

**Query with Date Functions:**
```csharp
string query = @"
    SELECT 
        EMPLOYEE_ID,
        EMPLOYEE_NAME,
        HIRE_DATE,
        TRUNC(HIRE_DATE) as hire_date_only,
        MONTHS_BETWEEN(SYSDATE, HIRE_DATE) as months_employed
    FROM EMPLOYEES
    WHERE HIRE_DATE >= TRUNC(SYSDATE - 365)";
```

**Complex Query with Window Functions:**
```csharp
string query = @"
    SELECT 
        EMPLOYEE_ID,
        EMPLOYEE_NAME,
        SALARY,
        DEPARTMENT_ID,
        ROW_NUMBER() OVER (PARTITION BY DEPARTMENT_ID ORDER BY SALARY DESC) as salary_rank
    FROM EMPLOYEES";
```

### DataAdapter Implementation

```csharp
OracleConnection connection = new OracleConnection(connectionString);
connection.Open();

OracleCommand command = new OracleCommand(query, connection);
OracleDataAdapter adapter = new OracleDataAdapter(command);

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
DataTable dataTable = FetchOracleData();
string json = JsonConvert.SerializeObject(dataTable);

// With custom formatting
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
        DataTable data = FetchOracleData();
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
  <add key="OracleApi:BaseUrl" value="https://your-server.com/Pivot" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ApiUrl = System.Configuration.ConfigurationManager.AppSettings["OracleApi:BaseUrl"];
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
            rows.Name("JOB").Caption("Job Title").Add();
        })
        .Columns(columns => {
            columns.Name("DEPARTMENT_ID").Caption("Department").Add();
        })
        .Values(values => {
            values.Name("SALARY").Caption("Total Salary").Add();
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
            rows.Name("DEPARTMENT_ID").Caption("Department").Add();
            rows.Name("JOB").Caption("Job").Add();
        })
        .Columns(columns => {
            columns.Name("EMPLOYEE_NAME").Caption("Employee").Add();
        })
        .Values(values => {
            values.Name("SALARY").Caption("Salary").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("EMPLOYEE_ID").Caption("Count").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Count).Add();
        })
        .Filters(filters => {
            filters.Name("CC_EMPLOYEES").Caption("Status").Add();
        }))
    .ShowGroupingBar(true)
    .ShowFieldList(true)
    .Render()
```

## Authentication Methods

### SQL*Net Authentication

```csharp
// Standard database user authentication
string connectionString = "Data Source=localhost:1521/orcl;User Id=scott;Password=tiger;";
// Default Oracle authentication using username/password
```

### Windows (OCI) Authentication

```csharp
// Connect using Windows credentials
string connectionString = "Data Source=orcl;User Id=/;";
// Slash authentication - uses Windows login
```

### LDAP/External Authentication

```csharp
// Use external identity provider
string connectionString = "Data Source=orcl;User Id=username@domain;Password=password;";
// Oracle configured with LDAP directory
```

### Configuring Authentication in Oracle

```sql
-- Check current authentication method
SELECT * FROM v$parameter WHERE name LIKE '%auth%';

-- Enable external authentication
ALTER SYSTEM SET OS_AUTHENT_PREFIX='' SCOPE=BOTH;

-- Create user with password
CREATE USER scott IDENTIFIED BY tiger;
GRANT CONNECT, RESOURCE TO scott;
```

## Performance Optimization

### Connection Pooling

```csharp
// Enable connection pooling configuration
string connStr = "Data Source=orcl;User Id=scott;Password=tiger;Pooling=true;Min Pool Size=5;Max Pool Size=50;";

// Configure pooling behavior
OracleConnection.ClearAllPools();  // Clear pool if needed
```

### Query Optimization

**1. Use Indexes:**
```sql
CREATE INDEX idx_emp_deptid ON EMPLOYEES(DEPARTMENT_ID);
CREATE INDEX idx_emp_salary ON EMPLOYEES(SALARY);
```

**2. Select Specific Columns:**
```csharp
// ❌ SLOW - Select all columns
string query = "SELECT * FROM EMPLOYEES";

// ✅ FAST - Select only needed columns
string query = "SELECT EMPLOYEE_ID, EMPLOYEE_NAME, SALARY FROM EMPLOYEES";
```

**3. Use ROWNUM for Large Results:**
```csharp
string query = "SELECT * FROM (SELECT * FROM EMPLOYEES ORDER BY SALARY DESC) WHERE ROWNUM <= 10000";
```

**4. Pre-aggregate Data:**
```sql
-- Create materialized view for faster retrieval
CREATE MATERIALIZED VIEW emp_summary AS
SELECT 
    DEPARTMENT_ID,
    COUNT(*) as emp_count,
    AVG(SALARY) as avg_salary,
    SUM(SALARY) as total_salary
FROM EMPLOYEES
GROUP BY DEPARTMENT_ID;
```

### Asynchronous Implementation

```csharp
[HttpGet]
public async Task<object> GetAsync()
{
    DataTable data = await FetchOracleDataAsync();
    return JsonConvert.SerializeObject(data);
}

private async Task<DataTable> FetchOracleDataAsync()
{
    string connectionString = _configuration.GetConnectionString("OracleConnection");
    
    using (OracleConnection connection = new OracleConnection(connectionString))
    {
        await connection.OpenAsync();
        
        OracleCommand command = new OracleCommand("SELECT * FROM EMPLOYEES", connection);
        OracleDataAdapter adapter = new OracleDataAdapter(command);
        
        DataTable dataTable = new DataTable();
        adapter.Fill(dataTable);
        
        return dataTable;
    }
}
```

## Troubleshooting

### Common Connection Issues

**Error: "ORA-12514: TNS:listener does not currently know of service requested"**
```csharp
// Solution: Verify service name in connection string
// Check listener: lsnrctl status
// Verify tnsnames.ora configuration
string connStr = "Data Source=orcl;User Id=scott;Password=tiger;";
```

**Error: "ORA-01017: invalid username/password"**
```csharp
// Solution: Verify credentials
// Check user exists in Oracle
// SQL> SELECT USERNAME FROM DBA_USERS;
```

**Error: "ORA-12505: TNS:listener could not resolve SID"**
```csharp
// Solution: Use service name instead of SID
string connStr = "Data Source=(DESCRIPTION=...SERVICE_NAME=orcl);User Id=scott;Password=tiger;";
```

### Connection String Validation

```csharp
public bool ValidateOracleConnection(string connectionString)
{
    try
    {
        using (OracleConnection connection = new OracleConnection(connectionString))
        {
            connection.Open();
            OracleCommand command = new OracleCommand("SELECT * FROM v$version", connection);
            OracleDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Console.WriteLine($"Oracle Version: {reader[0]}");
            }
            return true;
        }
    }
    catch (OracleException ex)
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
DataTable data = FetchOracleData();
stopwatch.Stop();

Console.WriteLine($"Query executed in {stopwatch.ElapsedMilliseconds}ms");
Console.WriteLine($"Rows retrieved: {data.Rows.Count}");
```
