# Elasticsearch Database Binding in ASP.NET Core Pivot Table

## ⚠️ SECURITY NOTICE

**All Elasticsearch connections MUST use authenticated, configuration-based endpoints.** Never hardcode connection strings or URLs.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- Authentication and authorization ([Authorize] attributes)
- HTTPS/SSL for Elasticsearch connections
- Secure credential management (Azure Key Vault, user secrets)
- Input validation and sanitization

## Table of Contents
- [Creating a Web API Service to Fetch Elasticsearch Data](#creating-a-web-api-service-to-fetch-elasticsearch-data)
- [Connecting the Pivot Table to Elasticsearch Database](#connecting-the-pivot-table-to-elasticsearch-database-using-the-web-api-service)

## Creating a Web API Service to Fetch Elasticsearch Data

Follow these steps to create a Web API service that retrieves data from an Elasticsearch database and prepares it for the Pivot Table.

### Step 1: Create an ASP.NET Core Web Application

1. Open Visual Studio and create a new **ASP.NET Core Web App** project named **MyWebService**.
2. Refer to the [Microsoft documentation](https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-aspnet-core?view=vs-2022) for detailed project setup instructions.

### Step 2: Install the NEST NuGet Package

NEST is the official .NET client library for Elasticsearch. Install it to enable database connectivity:

1. Open the **NuGet Package Manager** Console in Visual Studio.
2. Search for the **NEST** package and install the latest version.
3. NEST provides a fluent API for building Elasticsearch queries and communicating with the server.

```bash
Install-Package NEST
Install-Package Newtonsoft.Json
```

### Step 3: Create a Web API Controller

1. Right-click on the **Controllers** folder and create a new Web API controller named **PivotController.cs**.
2. This controller will manage communication between your Elasticsearch database and the Pivot Table component.

### Step 4: Configure Elasticsearch Connection

> **⚠️ SECURITY:** Use IConfiguration for connection strings. See security notice at top of document.

**Step 4.1 — Add connection string to appsettings.json:**
```json
{
  "Elasticsearch": {
    "Uri": "https://your-elasticsearch-server.com:9200",
    "Username": "your-username",
    "Password": "your-password"
  }
}
```

**Step 4.2 — Configure secure connection in PivotController.cs:**

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Nest;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]  // Require authentication
    public class PivotController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        
        public PivotController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        private object FetchElasticsearchData()
        {
            // Use configuration for connection
            var connectionString = _configuration["Elasticsearch:Uri"];
            var username = _configuration["Elasticsearch:Username"];
            var password = _configuration["Elasticsearch:Password"];
            
            var uri = new Uri(connectionString);
            var connectionSettings = new ConnectionSettings(uri)
                .BasicAuthentication(username, password);
            var client = new ElasticClient(connectionSettings);
            
            // Search for documents in the "product" index
            var searchResponse = client.Search<object>(s => s
                .Index("product")
                .Size(1000)  // Limit number of documents returned
            );
            
            return searchResponse.Documents;
        }
    }
}
```

### Step 5: Implement Data Retrieval Logic

Define a **Get()** method that:
1. Calls **FetchElasticsearchData()** to retrieve documents from the Elasticsearch index
2. Converts the data to JSON format using **JsonConvert.SerializeObject()**
3. Returns the JSON data to the Pivot Table

```csharp
using Microsoft.AspNetCore.Mvc;
using Nest;
using Newtonsoft.Json;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        [HttpGet(Name = "GetElasticSearchData")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchElasticsearchData());
        }

        private static object FetchElasticsearchData()
        {
            // Elasticsearch server connection
            var connectionString = "<Enter your Elasticsearch server address>";
            var uri = new Uri(connectionString);
            var connectionSettings = new ConnectionSettings(uri);
            var client = new ElasticClient(connectionSettings);
            
            // Execute search query
            var searchResponse = client.Search<object>(s => s
                .Index("product")
                .Size(1000)
            );
            
            return searchResponse.Documents;
        }
    }
}
```

### Step 6: Run the Web API Application

1. Build and compile your ASP.NET Core project.
2. Run the application using **F5** or the **Run** button.
3. The Web API will be hosted at a local URL (typically `https://localhost:44323`).

### Step 7: Verify the Data Retrieval

1. Open your web browser and navigate to the Web API endpoint (e.g., `https://localhost:44323/pivot`).
2. The browser will display JSON data retrieved from Elasticsearch, confirming the connection is working correctly.

## Connecting the Pivot Table to Elasticsearch Database Using the Web API Service

This section explains how to bind the Pivot Table component to your Elasticsearch data through the Web API service you created.

### Step 1: Create a Pivot Table in ASP.NET Core

1. Follow the [Getting Started](../getting-started) documentation to set up a basic ASP.NET Core Pivot Table.
2. Ensure your project has all required EJ2 Pivot Table dependencies and scripts included.

### Step 2: Configure the Web API URL in the Pivot Table

In your **~/Views/Home/Index.cshtml** file, configure the Pivot Table to connect to your Web API endpoint:

1. Set the [url](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettings.html#Syncfusion_EJ2_PivotView_PivotViewDataSourceSettings_Url) property in [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html) to your API endpoint
2. Keep the `expandAll` and other options as needed

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:44323/pivot" expandAll="false" enableSorting="true">
     //Other codes here...
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 3: Define the Pivot Table Report

Structure how your Elasticsearch data will be displayed in the Pivot Table:

1. Add fields to the `rows`, `columns`, `values`, and `filters` properties of [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html) to organize and aggregate your data
2. Enable the field list by setting [showFieldList](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_ShowFieldList) to **true** so users can dynamically rearrange fields

Here's a sample configuration with report structure:

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:44323/pivot" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="State"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Product"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Quantity"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 4: Run and Verify the Pivot Table

1. Run your ASP.NET Core application.
2. The Pivot Table will automatically fetch data from your Elasticsearch database through the Web API.
3. Data will be organized and displayed according to the report structure you defined (rows, columns, values).
4. Users can interact with the field list to rearrange dimensions dynamically.

## Key Points to Remember

- **ElasticClient**: The main client object that communicates with your Elasticsearch server
- **ConnectionSettings**: Configures the connection details (server address, port, authentication)
- **Search Method**: Queries documents from an Elasticsearch index and retrieves them for analysis
- **Index Parameter**: Specifies which Elasticsearch index contains your data
- **Size Parameter**: Controls the number of documents returned to avoid performance issues
- **JsonConvert.SerializeObject()**: Converts Elasticsearch response to JSON format compatible with Pivot Table
- Default Elasticsearch port is **9200** - ensure it's accessible from your ASP.NET Core application

## Additional Resources

Explore a complete working example of the ASP.NET Core Pivot Table integrated with Elasticsearch in this [GitHub repository](https://github.com/SyncfusionExamples/how-to-bind-Elasticsearch-database-to-pivot-table).

