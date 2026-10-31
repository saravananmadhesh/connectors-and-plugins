# Microsoft SQL Server Database Binding in ASP.NET Core Pivot Table

## ⚠️ SECURITY NOTICE

**All SQL Server connections MUST use secure, configuration-based connection strings.** Never hardcode credentials or connection strings.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Parameterized queries (prevent SQL injection)
- Authentication and authorization ([Authorize] attributes)
- Encrypted connections (SSL/TLS)
- Secure credential management (Azure Key Vault, user secrets)

## Table of Contents
- [Creating a Web API Service to Fetch SQL Server Data](#creating-a-web-api-service-to-fetch-sql-server-data)
- [Connecting the Pivot Table to a Microsoft SQL Server Database](#connecting-the-pivot-table-to-a-microsoft-sql-server-database-using-the-web-api-service)

## Creating a Web API Service to Fetch SQL Server Data

Follow these steps to create a Web API service that retrieves data from a Microsoft SQL Server database and prepares it for the Pivot Table.

### Step 1: Download the Sample Application

Download the ASP.NET Core Web Application from this [GitHub](https://github.com/SyncfusionExamples/how-to-bind-SQL-database-to-pivot-table) repository. This sample includes a complete implementation of SQL Server connectivity with the Pivot Table component.

### Step 2: Understand the Application Structure

The downloaded application includes the following key components:

- **PivotController.cs** file under the **Controllers** folder – Facilitates data communication between the SQL Server database and the Pivot Table component.
- **Database1.mdf** file under the **App_Data** folder – Contains example data in MDF (Master Database File) format.

### Step 3: Connect to SQL Server and Retrieve Data

In the **PivotController.cs** file, use the [Microsoft SqlClient](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient) library to connect to SQL Server and retrieve data.

1. **Establish Connection**: Use **SqlConnection** with a valid connection string to connect to the SQL Server database (e.g., **Database1.mdf**).
2. **Query and Fetch Data**: Execute a SQL query using **SqlCommand** to retrieve data for the Pivot Table (e.g., `SELECT * FROM table1`).
3. **Structure the Data**: Use the **Fill** method of **SqlDataAdapter** to populate query results into a **DataTable** for JSON serialization.

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace PivotController.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        private static DataTable FetchSQLResult()
        {
            string conSTR = @"<Enter your valid connection string here>";
            string xquery = "SELECT * FROM table1";
            SqlConnection sqlConnection = new(conSTR);
            sqlConnection.Open();
            SqlCommand cmd = new(xquery, sqlConnection);
            SqlDataAdapter dataAdapter = new(cmd);
            DataTable dataTable = new();
            dataAdapter.Fill(dataTable);
            return dataTable;
        }
    }
}
```

> Replace `<Enter your valid connection string here>` with the actual connection string for your SQL Server database.

### Step 4: Serialize Data to JSON

In the **PivotController.cs** file, define a **Get** method that calls **FetchSQLResult** to retrieve data from SQL Server as a **DataTable**. Then, use **JsonConvert.SerializeObject** from the **Newtonsoft.Json** library to convert the **DataTable** into JSON format.

> Ensure the **Newtonsoft.Json** NuGet package is installed in your project to use **JsonConvert**.

```csharp
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;

namespace PivotController.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        [HttpGet(Name = "GetSQLResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchSQLResult());
        }

        private static DataTable FetchSQLResult()
        {
            string conSTR = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=" + Environment.CurrentDirectory
                + @"\App_Data\Database1.mdf;Integrated Security=True";
            string xquery = "SELECT * FROM table1";
            SqlConnection sqlConnection = new(conSTR);
            sqlConnection.Open();
            SqlCommand cmd = new(xquery, sqlConnection);
            SqlDataAdapter dataAdapter = new(cmd);
            DataTable dataTable = new();
            dataAdapter.Fill(dataTable);
            return dataTable;
        }
    }
}
```

### Step 5: Run the Web API Application

1. Build and run the **PivotController** application.
2. The application will be hosted at `https://localhost:7139/` (the port number may vary depending on your system configuration).

### Step 6: Access the JSON Data

1. Access the Web API endpoint at `https://localhost:7139/pivot` to view the JSON data retrieved from the SQL Server database.
2. The browser will display the JSON data in the format expected by the Pivot Table component.

## Connecting the Pivot Table to a Microsoft SQL Server Database Using the Web API Service

This section explains how to connect the Pivot Table component to a Microsoft SQL Server database by retrieving data from the Web API service created in the previous section.

### Step 1: Set Up the ASP.NET Core Pivot Table

1. Download the ASP.NET Core Pivot Table sample from the [GitHub](https://github.com/SyncfusionExamples/how-to-bind-SQL-database-to-pivot-table) repository.
2. Ensure your ASP.NET Core project is configured with the necessary EJ2 Pivot Table dependencies by following the [Getting Started](../getting-started) documentation.

### Step 2: Configure the Web API URL in the Pivot Table

1. In the **~/Views/Home/Index.cshtml** file, configure the Pivot Table to use the hosted Web API URL (`https://localhost:7139/pivot`) by setting the [url](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettings.html#Syncfusion_EJ2_PivotView_PivotViewDataSourceSettings_Url) property within [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html).
2. Below is the sample code to configure the Pivot Table to fetch data from the Web API:

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:7139/pivot" expandAll="false" enableSorting="true">
     //Other codes here...
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 3: Define the Pivot Table Report

1. Configure the Pivot Table report in the **~/Views/Home/Index.cshtml** file to structure the data retrieved from the SQL Server database.
2. Add fields to the `rows`, `columns`, `values`, and `filters` properties of [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html) to define how data fields are organized and aggregated in the Pivot Table.
3. Enable the field list by setting the [showFieldList](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_ShowFieldList) property to **true** and including the `FieldList` module in the services section. This allows users to dynamically add or rearrange fields across the columns, rows, and values axes using an interactive user interface.

Here's the sample code with the report configuration and field list support:

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:7139/pivot" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="State"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Product" caption="Product"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Quantity"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 4: Run and Verify the Pivot Table

1. Run the ASP.NET Core application.
2. The Pivot Table will display the data fetched from the SQL Server database via the Web API, structured according to the defined report.
3. The resulting Pivot Table will display data organized by Country and State (rows), Product (columns), with Quantity and Sold Amount as values.

## Key Points

- **SqlConnection**: Establishes connection to SQL Server database
- **SqlCommand**: Executes SQL queries against the database
- **SqlDataAdapter**: Populates DataTable with query results
- **JsonConvert.SerializeObject()**: Converts DataTable to JSON format for Pivot Table consumption
- Connection string must be valid and database/table must exist before querying
- Port number (7139) in the examples may vary based on system configuration

## Additional Resources

Explore a complete example of the ASP.NET Core Pivot Table integrated with an ASP.NET Core Web Application to fetch data from a SQL Server database in this [GitHub](https://github.com/SyncfusionExamples/how-to-bind-SQL-database-to-pivot-table) repository.
