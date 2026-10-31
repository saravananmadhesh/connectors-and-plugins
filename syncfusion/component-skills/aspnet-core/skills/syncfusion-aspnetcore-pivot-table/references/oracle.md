# Oracle Database Binding in ASP.NET Core Pivot Table

## ⚠️ SECURITY NOTICE

**All Oracle connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Parameterized queries (prevent SQL injection)
- Authentication and authorization ([Authorize] attributes)
- Encrypted connections (SSL/TLS)
- Secure credential management (Azure Key Vault, user secrets)

## Table of Contents
- [Creating a Web API Service to Fetch Oracle Data](#creating-a-web-api-service-to-fetch-oracle-data)
- [Connecting the Pivot Table to an Oracle Database](#connecting-the-pivot-table-to-an-oracle-database-using-the-web-api-service)

## Creating a Web API Service to Fetch Oracle Data

Follow these steps to create a Web API service that retrieves data from an Oracle database and prepares it for the Pivot Table.

### Step 1: Create an ASP.NET Core Web Application

1. Open Visual Studio and create a new **ASP.NET Core Web App** project named **MyWebService**.
2. Refer to the [Microsoft documentation](https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-aspnet-core?view=vs-2022) for detailed project setup instructions.

### Step 2: Install the Oracle NuGet Package

To enable Oracle database connectivity, install the Oracle Managed Data Access provider:

1. Open the **NuGet Package Manager** in your project solution.
2. Search for [Oracle.ManagedDataAccess.Core](https://www.nuget.org/packages/Oracle.ManagedDataAccess.Core/) and install it.
3. This package provides the necessary classes to connect to Oracle databases and execute queries.

```bash
Install-Package Oracle.ManagedDataAccess.Core
Install-Package Newtonsoft.Json
```

### Step 3: Create a Web API Controller

1. Create a new Web API controller named **PivotController.cs** in the **Controllers** folder.
2. This controller will handle requests from the Pivot Table and manage communication with the Oracle database.

### Step 4: Connect to Oracle and Retrieve Data

In the **PivotController.cs** file, use the Oracle Managed Data Access library to establish a connection to your Oracle database and retrieve data.

1. **Establish Connection**: Use **OracleConnection** with a valid connection string (e.g., `Data Source=localhost;User Id=myuser;Password=mypassword;`) to connect to the Oracle database.
2. **Query and Fetch Data**: Execute a SQL query using **OracleCommand** to retrieve data for the Pivot Table.
3. **Structure the Data**: Use **OracleDataAdapter**'s **Fill** method to populate query results into a **DataTable** for JSON serialization.

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
        private static DataTable FetchOracleResult()
        {
            // Replace with your Oracle connection string
            string connectionString = "<Enter your valid connection string here>";
            OracleConnection oracleConnection = new OracleConnection(connectionString);
            oracleConnection.Open();
            
            // Execute SQL query to retrieve data
            OracleCommand command = new OracleCommand("SELECT * FROM EMPLOYEES", oracleConnection);
            OracleDataAdapter dataAdapter = new OracleDataAdapter(command);
            
            DataTable dataTable = new DataTable();
            dataAdapter.Fill(dataTable);
            oracleConnection.Close();
            
            return dataTable;
        }
    }
}
```

### Step 5: Serialize Data to JSON

Define a **Get()** method that:
1. Calls **FetchOracleResult()** to retrieve data from the Oracle database as a **DataTable**
2. Converts the data to JSON format using **JsonConvert.SerializeObject()**
3. Returns the JSON data to the Pivot Table

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
        [HttpGet(Name = "GetOracleResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchOracleResult());
        }

        private static DataTable FetchOracleResult()
        {
            // Oracle database connection
            string connectionString = "<Enter your valid connection string here>";
            OracleConnection oracleConnection = new OracleConnection(connectionString);
            oracleConnection.Open();
            
            OracleCommand command = new OracleCommand("SELECT * FROM EMPLOYEES", oracleConnection);
            OracleDataAdapter dataAdapter = new OracleDataAdapter(command);
            
            DataTable dataTable = new DataTable();
            dataAdapter.Fill(dataTable);
            oracleConnection.Close();
            
            return dataTable;
        }
    }
}
```

### Step 6: Run the Web API Application

1. Build your ASP.NET Core project to ensure there are no compilation errors.
2. Run the application using **F5** or the **Run** button in Visual Studio.
3. The Web API will be hosted at a local URL (typically `https://localhost:44346`).

### Step 7: Verify the Data Retrieval

1. Open your web browser and navigate to the Web API endpoint (e.g., `https://localhost:44346/pivot`).
2. The browser will display the JSON data retrieved from your Oracle database, confirming successful connectivity.

## Connecting the Pivot Table to an Oracle Database Using the Web API Service

This section explains how to bind the Pivot Table component to your Oracle database through the Web API service you created.

### Step 1: Create a Pivot Table in ASP.NET Core

1. Follow the [Getting Started](../getting-started) documentation to set up a basic ASP.NET Core Pivot Table.
2. Ensure your project has all required EJ2 Pivot Table dependencies and scripts configured properly.

### Step 2: Configure the Web API URL in the Pivot Table

In your **~/Views/Home/Index.cshtml** file, configure the Pivot Table to connect to your Web API endpoint:

1. Set the [url](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettings.html#Syncfusion_EJ2_PivotView_PivotViewDataSourceSettings_Url) property in [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html) to point to your API endpoint
2. This URL tells the Pivot Table where to fetch the Oracle data from

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:44346/pivot" expandAll="false" enableSorting="true">
     //Other codes here...
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 3: Define the Pivot Table Report

Structure how your Oracle data will be displayed in the Pivot Table:

1. Add fields to the `rows`, `columns`, `values`, and `filters` properties of [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html) to organize and aggregate your data from Oracle
2. Enable the field list by setting [showFieldList](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_ShowFieldList) to **true** so users can dynamically rearrange fields

Here's a sample configuration with report structure:

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:44346/pivot" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="JOB" caption="Job"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="DEPARTMENT_ID" caption="Department ID"></e-field>
        </e-columns>
        <e-values>
            <e-field name="EMPLOYEE_ID" caption="Employee ID"></e-field>
            <e-field name="SALARY" caption="Salary"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 4: Run and Verify the Pivot Table

1. Run your ASP.NET Core application.
2. The Pivot Table will automatically fetch data from your Oracle database through the Web API endpoint.
3. Data will be organized and displayed according to the report structure you defined (rows, columns, values).
4. Users can interact with the field list to dynamically rearrange dimensions and analyze data.

## Key Points to Remember

- **OracleConnection**: Establishes connection to your Oracle database using a connection string
- **OracleCommand**: Executes SQL queries against the Oracle database
- **OracleDataAdapter**: Populates a DataTable with query results from Oracle
- **Connection String**: Must include server address, user ID, and password for Oracle authentication
- **JsonConvert.SerializeObject()**: Converts DataTable to JSON format that Pivot Table consumes
- Replace table and column names in SQL queries with your actual Oracle schema objects (e.g., EMPLOYEES, DEPARTMENTS)
- Ensure your Oracle database is accessible from your ASP.NET Core application

## Additional Resources

Explore a complete example of the ASP.NET Core Pivot Table integrated with an Oracle database in this [GitHub repository](https://github.com/SyncfusionExamples/how-to-bind-Oracle-database-to-pivot-table).
