# Connecting to External Data Sources

## ⚠️ CRITICAL SECURITY NOTICE

**All database connections MUST be handled through authenticated backend APIs.** Never expose database connection strings or credentials to the client-side application. This documentation assumes you have:

✅ A secure backend API (ASP.NET Core, Node.js, etc.)
✅ Proper authentication and authorization
✅ Server-side database connection handling
✅ Input validation and SQL injection prevention

❌ **NEVER** connect directly to databases from the browser
❌ **NEVER** expose connection strings in client code
❌ **NEVER** accept user-provided database endpoints

## Table of Contents
- [Overview](#overview)
- [MySQL Server](#mysql-server)
- [SQL Server](#sql-server)
- [MongoDB](#mongodb)
- [PostgreSQL](#postgresql)
- [Oracle](#oracle)
- [Elasticsearch](#elasticsearch)
- [Snowflake](#snowflake)

## Overview

PivotView can connect to multiple external databases and data sources through Web API controllers. This approach:
- Reduces client-side data transfer
- Improves security
- Enables real-time data access
- Supports large datasets

### Typical Architecture
```
Data Source (MySQL, SQL Server, etc.)
        ↓
Web API Controller (C#, Node.js, etc.)
        ↓
PivotView Component (Vue Client)
```

## MySQL Server

### Prerequisites
- MySQL database running
- NuGet package: `MySql.Data`

### Step 1: Create ASP.NET Core Web App
Create a new project named `MyWebService` with ASP.NET Core.

### Step 2: Install MySql.Data Package
```bash
Install-Package MySql.Data
```

### Step 3: Create PivotController
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
        [HttpGet(Name = "GetMySQLResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(GetMySQLResult());
        }

        public dynamic GetMySQLResult()
        {
            // SECURITY: Get connection string from environment variables or configuration
            // NEVER hardcode credentials in code
            string connectionString = System.Environment.GetEnvironmentVariable("MYSQL_CONNECTION_STRING")
                ?? throw new InvalidOperationException("MySQL connection string not configured");
            
            MySqlConnection connection = new MySqlConnection(connectionString);
            connection.Open();
            
            MySqlCommand command = new MySqlCommand("SELECT * FROM orders", connection);
            MySqlDataAdapter dataAdapter = new MySqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            dataAdapter.Fill(dataTable);
            connection.Close();
            
            return dataTable;
        }
    }
}
```

### Step 4: Bind in Vue Component
```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

// ✓ SECURE: Use server endpoint
const dataSourceSettings = {
  url: 'https://your-server/api/pivot',
  expandAll: false,
  rows: [{ name: 'OrderID' }],
  columns: [{ name: 'Date' }],
  values: [{ name: 'Amount' }],
  filters: []
};
const height = 350;
</script>
```

## SQL Server

### Prerequisites
- SQL Server instance running
- NuGet package: `System.Data.SqlClient`

### Controller Implementation
```csharp
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        [HttpGet(Name = "GetSQLResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(GetSQLResult());
        }

        public dynamic GetSQLResult()
        {
            // SECURITY: Get connection string from secure configuration
            // NEVER hardcode credentials in code
            var configuration = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .AddJsonFile("appsettings.json")
                .Build();
            
            string connectionString = configuration["ConnectionStrings:SqlServer"]
                ?? throw new InvalidOperationException("SQL Server connection string not configured");
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM sales", connection);
                SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
                DataTable dataTable = new DataTable();
                dataAdapter.Fill(dataTable);
                return dataTable;
            }
        }
    }
}
```

## MongoDB

### Prerequisites
- MongoDB instance running
- NuGet package: `MongoDB.Driver`

### Controller Implementation
```csharp
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        [HttpGet(Name = "GetMongoData")]
        public async Task<object> Get()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("mydb");
            var collection = database.GetCollection<dynamic>("orders");
            
            var data = await collection.Find(x => true).ToListAsync();
            return JsonConvert.SerializeObject(data);
        }
    }
}
```

## PostgreSQL

### Prerequisites
- PostgreSQL database running
- NuGet package: `Npgsql`

### Controller Implementation
```csharp
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        [HttpGet(Name = "GetPostgreSQL")]
        public object Get()
        {
            return JsonConvert.SerializeObject(GetPostgreSQLData());
        }

        public dynamic GetPostgreSQLData()
        {
            // SECURITY: Get connection string from environment variables
            // NEVER hardcode credentials in code
            string connectionString = System.Environment.GetEnvironmentVariable("POSTGRESQL_CONNECTION_STRING")
                ?? throw new InvalidOperationException("PostgreSQL connection string not configured");
            
            using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
            {
                connection.Open();
                NpgsqlCommand command = new NpgsqlCommand("SELECT * FROM sales", connection);
                NpgsqlDataAdapter dataAdapter = new NpgsqlDataAdapter(command);
                DataTable dataTable = new DataTable();
                dataAdapter.Fill(dataTable);
                return dataTable;
            }
        }
    }
}
```

## Oracle

### Prerequisites
- Oracle database running
- NuGet package: `Oracle.ManagedDataAccess`

### Controller Implementation
```csharp
using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;
using System.Data;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        [HttpGet(Name = "GetOracleData")]
        public object Get()
        {
            return JsonConvert.SerializeObject(GetOracleData());
        }

        public dynamic GetOracleData()
        {
            // SECURITY: Get connection string from environment variables
            // NEVER hardcode credentials in code
            string connectionString = System.Environment.GetEnvironmentVariable("ORACLE_CONNECTION_STRING")
                ?? throw new InvalidOperationException("Oracle connection string not configured");
            
            using (OracleConnection connection = new OracleConnection(connectionString))
            {
                connection.Open();
                OracleCommand command = new OracleCommand("SELECT * FROM sales", connection);
                OracleDataAdapter dataAdapter = new OracleDataAdapter(command);
                DataTable dataTable = new DataTable();
                dataAdapter.Fill(dataTable);
                return dataTable;
            }
        }
    }
}
```

## Elasticsearch

### Prerequisites
- Elasticsearch cluster running
- NuGet package: `Elasticsearch.Net`

### Controller Implementation
```csharp
using Microsoft.AspNetCore.Mvc;
using Elasticsearch.Net;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        [HttpGet(Name = "GetElasticsearchData")]
        public object Get()
        {
            // ✓ SECURE: Use Elasticsearch server endpoint
            string elasticsearchUrl = "https://your-elasticsearch-server:9200";  // e.g., 'https://your-server:9200'
            
            var settings = new ConnectionSettings(new Uri(elasticsearchUrl));
            var client = new ElasticLowLevelClient(settings);
            
            var response = client.Search<dynamic>("myindex", "sidx", 
                new { query = new { match_all = new { } } });
            
            return JsonConvert.SerializeObject(response);
        }
    }
}
```

## Snowflake

### Prerequisites
- Snowflake account active
- NuGet package: `Snowflake.Data`

### Controller Implementation
```csharp
using Microsoft.AspNetCore.Mvc;
using Snowflake.Data.Client;
using System.Data;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        [HttpGet(Name = "GetSnowflakeData")]
        public object Get()
        {
            return JsonConvert.SerializeObject(GetSnowflakeData());
        }

        public dynamic GetSnowflakeData()
        {
            // SECURITY: Get connection string from environment variables or Azure Key Vault
            // NEVER hardcode credentials in code
            string connectionString = System.Environment.GetEnvironmentVariable("SNOWFLAKE_CONNECTION_STRING")
                ?? throw new InvalidOperationException("Snowflake connection string not configured");
            
            using (SnowflakeDbConnection connection = 
                new SnowflakeDbConnection() { ConnectionString = connectionString })
            {
                connection.Open();
                SnowflakeDbCommand command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM sales";
                
                SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter(command);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);
                connection.Close();
                return dataTable;
            }
        }
    }
}
```

### Best Practices for External Data Sources
1. **Security**: Use parameterized queries to prevent SQL injection
2. **Performance**: Implement caching and query optimization
3. **Error Handling**: Wrap connections in try-catch blocks
4. **Connection Pooling**: Reuse connections efficiently
5. **Credentials**: Store credentials in secure configuration, not in code
6. **Testing**: Test with realistic data volumes

