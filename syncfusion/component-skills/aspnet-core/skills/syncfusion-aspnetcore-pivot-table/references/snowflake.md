# Snowflake Database Binding in ASP.NET Core Pivot Table

## ⚠️ SECURITY NOTICE

**All Snowflake connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Parameterized queries (prevent SQL injection)
- Authentication and authorization ([Authorize] attributes)
- Encrypted connections (SSL/TLS enabled by default)
- Secure credential management (Azure Key Vault, user secrets)

## Table of Contents
- [Creating a Web API Service to Fetch Snowflake Data](#creating-a-web-api-service-to-fetch-snowflake-data)
- [Connecting the Pivot Table to a Snowflake Database](#connecting-the-pivot-table-to-a-snowflake-database-using-the-web-api-service)

## Creating a Web API Service to Fetch Snowflake Data

Follow these steps to create a Web API service that retrieves data from a Snowflake database and prepares it for the Pivot Table.

### Step 1: Create an ASP.NET Core Web Application
1. Open Visual Studio and create a new **ASP.NET Core Web App** project named **MyWebService**.
2. Follow the official [Microsoft documentation](https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-aspnet-core?view=vs-2022) for detailed instructions on creating an ASP.NET Core Web application.

### Step 2: Install the Snowflake NuGet Package
To enable Snowflake database connectivity:
1. Open the **NuGet Package Manager** in your project solution and search for [Snowflake.Data](https://www.nuget.org/packages/Snowflake.Data).
2. Install the [Snowflake.Data](https://www.nuget.org/packages/Snowflake.Data) package to add Snowflake support.

### Step 3: Create a Web API Controller
1. Under the **Controllers** folder, create a new Web API controller named **PivotController.cs**.
2. This controller facilitates data communication between the Snowflake database and the Pivot Table.

### Step 4: Connect to Snowflake and Retrieve Data
In the **PivotController.cs** file, use the **Snowflake.Data** library to connect to a Snowflake database and retrieve data for the Pivot Table.

1. **Establish Connection**: Use **SnowflakeDbConnection** with a valid connection string (e.g., `account=myaccount;user=myuser;password=mypassword;db=mydb;schema=myschema;`) to connect to the Snowflake database.
2. **Query and Fetch Data**: Execute a SQL query (e.g., `SELECT * FROM CALL_CENTER`) using **SnowflakeDbDataAdapter** to retrieve data for the Pivot Table.
3. **Structure the Data**: Use **SnowflakeDbDataAdapter**'s **Fill** method to populate query results into a **DataTable** for JSON serialization.

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
        public static DataTable FetchSnowflakeResult()
        {
            using (SnowflakeDbConnection snowflakeConnection = new SnowflakeDbConnection())
            {
                string connectionString = "<Enter your valid connection string here>";
                snowflakeConnection.ConnectionString = connectionString;
                snowflakeConnection.Open();
                SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter("select * from CALL_CENTER", snowflakeConnection);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);
                snowflakeConnection.Close();
                return dataTable;
            }
        }
    }
}
```

### Step 5: Serialize Data to JSON
In the **PivotController.cs** file, define a **Get** method that calls **FetchSnowflakeResult** to retrieve data from the Snowflake database as a **DataTable**. Then, use **JsonConvert.SerializeObject** from the **Newtonsoft.Json** library to convert the **DataTable** into JSON format. This JSON data will be used by the Pivot Table component.

> Ensure the **Newtonsoft.Json** NuGet package is installed in your project to use **JsonConvert**.

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
        [HttpGet(Name = "GetSnowflakeResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchSnowflakeResult());
        }

        public static DataTable FetchSnowflakeResult()
        {
            using (SnowflakeDbConnection snowflakeConnection = new SnowflakeDbConnection())
            {
                string connectionString = "<Enter your valid connection string here>";
                snowflakeConnection.ConnectionString = connectionString;
                snowflakeConnection.Open();
                SnowflakeDbDataAdapter adapter = new SnowflakeDbDataAdapter("select * from CALL_CENTER", snowflakeConnection);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);
                snowflakeConnection.Close();
                return dataTable;
            }
        }
    }
}
```

### Step 6: Run the Web API Service
1. Build and run the application.
2. The application will be hosted at `https://localhost:44378/` (the port number may vary based on your configuration).

### Step 7: Access the JSON Data
1. Access the Web API endpoint at `https://localhost:44378/Pivot` to view the JSON data retrieved from the Snowflake database.
2. The browser will display the JSON data, confirming successful Snowflake connection and data retrieval.

## Connecting the Pivot Table to a Snowflake Database Using the Web API Service

This section explains how to connect the Pivot Table component to a Snowflake database by retrieving data from the Web API service created in the previous section.

### Step 1: Create a Pivot Table in ASP.NET Core
1. Set up a basic ASP.NET Core Pivot Table by following the [Getting Started](../getting-started) documentation.
2. Ensure your ASP.NET Core project is configured with the necessary EJ2 Pivot Table dependencies.

### Step 2: Configure the Web API URL in the Pivot Table
1. In the **~/Views/Home/Index.cshtml** file, map the Web API URL (`https://localhost:44378/Pivot`) to the Pivot Table using the [url](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettings.html#Syncfusion_EJ2_PivotView_PivotViewDataSourceSettings_Url) property within the [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html).
2. Below is the sample code to configure the Pivot Table to fetch data from the Web API:

```csharp
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:44378/pivot" expandAll="false" enableSorting="true">
     //Other codes here...
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 3: Define the Pivot Table Report
1. Configure the Pivot Table report in the **~/Views/Home/Index.cshtml** file to structure the data retrieved from the Snowflake database.
2. Add fields to the `rows`, `columns`, `values`, and `filters` properties of [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html) to define the report structure, specifying how data fields are organized and aggregated in the Pivot Table.
3. Enable the field list by setting the [showFieldList](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_ShowFieldList) property to **true** and including the `FieldList` module in the services section. This allows users to dynamically add or rearrange fields across the columns, rows, and values axes using an interactive user interface.

```csharp
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:44378/Pivot" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="CC_STATE" caption="State"></e-field>
            <e-field name="CC_CITY" caption="City"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="CC_COUNTRY" caption="Country"></e-field>
        </e-columns>
        <e-values>
            <e-field name="CC_EMPLOYEES" caption="Employees"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 4: Run and Verify the Pivot Table
1. Run the ASP.NET Core application.
2. The Pivot Table will display the data fetched from the Snowflake database via the Web API, structured according to the defined report.
3. Verify that data loads correctly and rows/columns/values are properly organized.

## Key Points

- **SnowflakeDbConnection**: Establishes connection to Snowflake cloud data warehouse using connection parameters for account, user, password, database, and schema.
- **SnowflakeDbDataAdapter**: Populates DataTable from Snowflake query results, supporting large-scale cloud data retrieval.
- **JsonConvert.SerializeObject**: Converts DataTable to JSON format compatible with Pivot Table's data binding requirements.
- **Connection String**: Should contain account name, credentials, warehouse, database, and schema information for proper Snowflake connectivity.
- **DataTable Fill method**: Efficiently handles large result sets from Snowflake queries for Pivot Table aggregation.

## Additional Resources

Explore a complete example of the ASP.NET Core Pivot Table integrated with a Snowflake database in this [GitHub repository](https://github.com/SyncfusionExamples/how-to-bind-Snowflake-database-to-pivot-table).
