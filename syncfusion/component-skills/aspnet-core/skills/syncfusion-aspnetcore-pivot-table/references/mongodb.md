# MongoDB Database Binding in ASP.NET Core Pivot Table

## ⚠️ SECURITY NOTICE

**All MongoDB connections MUST use authenticated, configuration-based connection strings.** Never hardcode connection strings or credentials.

✅ **Required Security Controls:**
- Configuration-based connection strings (IConfiguration)
- MongoDB authentication enabled
- HTTPS/SSL for connections
- Secure credential management (Azure Key Vault, user secrets)
- [Authorize] attributes on API endpoints

## Table of Contents
- [Creating a Web API Service to Fetch MongoDB Data](#creating-a-web-api-service-to-fetch-mongodb-data)
- [Connecting the Pivot Table to a MongoDB Database](#connecting-the-pivot-table-to-a-mongodb-database-using-the-web-api-service)

## Creating a Web API Service to Fetch MongoDB Data

Follow these steps to create a Web API service that retrieves data from a MongoDB database and prepares it for the Pivot Table.

### Step 1: Create an ASP.NET Core Web Application

1. Open Visual Studio and create a new **ASP.NET Core Web App** project named **MyWebService**.
2. Follow the official [Microsoft documentation](https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-aspnet-core?view=vs-2022) for detailed instructions on creating an ASP.NET Core Web application.

### Step 2: Install the MongoDB NuGet Packages

To enable MongoDB database connectivity:

1. Open the **NuGet Package Manager** in your project solution and search for the packages [MongoDB.Driver](https://www.nuget.org/packages/MongoDB.Driver) and [MongoDB.Bson](https://www.nuget.org/packages/MongoDB.Bson).
2. Install both packages to add MongoDB support.

**Installation Commands:**

```bash
Install-Package MongoDB.Driver -Version 2.18.0
Install-Package MongoDB.Bson -Version 2.18.0
Install-Package Newtonsoft.Json -Version 13.0.3
```

### Step 3: Create a Web API Controller

1. Under the **Controllers** folder, create a new Web API controller named **PivotController.cs**.
2. This controller facilitates data communication between the MongoDB database and the Pivot Table.

### Step 4: Connect to MongoDB and Retrieve Data

In the **PivotController.cs** file, use the [MongoDB.Driver](https://www.nuget.org/packages/MongoDB.Driver) and [MongoDB.Bson](https://www.nuget.org/packages/MongoDB.Bson) libraries to connect to a MongoDB database and retrieve data for the Pivot Table.

1. **Establish Connection**: Use **MongoClient** with a valid connection string to connect to the MongoDB database.
2. **Access the Database and Collection**: Use the **GetDatabase** method to access the specified database and the **GetCollection** method to target the desired collection.
3. **Retrieve and Structure Data**: Use the **Find** method of the **IMongoCollection** interface with an empty **BsonDocument** to retrieve data from the collection. The **ToList** method converts the data into a **List** for JSON serialization.

```csharp
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MongoDB.Driver;
using MongoDB.Bson;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        private static List<ProductDetails> FetchMongoDbResult()
        {
            // Replace with your own connection string.
            string connectionString = "<Enter your valid connection string here>";
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase("sample_training");
            var collection = database.GetCollection<ProductDetails>("ProductDetails");
            return collection.Find(new BsonDocument()).ToList();
        }

        public class ProductDetails
        {
            public ObjectId Id { get; set; }
            public int Sold { get; set; }
            public double Amount { get; set; }
            public string? Country { get; set; }
            public string? Products { get; set; }
            public string? Year { get; set; }
            public string? Quarter { get; set; }
        }
    }
}
```

**Connection String Format:**

```csharp
// Local MongoDB Connection
"mongodb://localhost:27017"

// Remote MongoDB Connection
"mongodb://mongo-server:27017"

// MongoDB with Authentication
"mongodb://username:password@localhost:27017/database?authSource=admin"

// MongoDB Atlas (Cloud)
"mongodb+srv://username:password@cluster.mongodb.net/database"
```

### Step 5: Serialize Data to JSON

In the **PivotController.cs** file, define a **Get** method that calls **FetchMongoDbResult** to retrieve data from the MongoDB database as a **List**. Then, use **JsonConvert.SerializeObject** from the **Newtonsoft.Json** library to convert the data into JSON format.

> Ensure the **Newtonsoft.Json** NuGet package is installed in your project to use **JsonConvert**.

```csharp
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MyWebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        [HttpGet(Name = "GetMongoDbResult")]
        public object Get()
        {
            return JsonConvert.SerializeObject(FetchMongoDbResult());
        }

        private static List<ProductDetails> FetchMongoDbResult()
        {
            // Replace with your own connection string.
            string connectionString = "<Enter your valid connection string here>";
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase("sample_training");
            var collection = database.GetCollection<ProductDetails>("ProductDetails");
            return collection.Find(new BsonDocument()).ToList();
        }

        public class ProductDetails
        {
            public ObjectId Id { get; set; }
            public int Sold { get; set; }
            public double Amount { get; set; }
            public string? Country { get; set; }
            public string? Products { get; set; }
            public string? Year { get; set; }
            public string? Quarter { get; set; }
        }
    }
}
```

### Step 6: Run the Web API Service

1. Build and run the application.
2. The application will be hosted at `https://localhost:44346/` (the port number may vary based on your configuration).

### Step 7: Access the JSON Data

1. Access the Web API endpoint at `https://localhost:44346/Pivot` to view the JSON data retrieved from the MongoDB database.
2. The browser will display the JSON data with all product details in a proper JSON format.

## Connecting the Pivot Table to a MongoDB Database Using the Web API Service

This section explains how to connect the Pivot Table component to a MongoDB database by retrieving data from the Web API service created in the previous section.

### Step 1: Create a Pivot Table in ASP.NET Core

1. Set up a basic ASP.NET Core Pivot Table by following the [Getting Started](../getting-started) documentation.
2. Ensure your ASP.NET Core project is configured with the necessary EJ2 Pivot Table dependencies.

### Step 2: Configure the Web API URL in the Pivot Table

1. In the **~/Views/Home/Index.cshtml** file, map the Web API URL (`https://localhost:44346/Pivot`) to the Pivot Table using the [url](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettings.html#Syncfusion_EJ2_PivotView_PivotViewDataSourceSettings_Url) property within the [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html).
2. Below is the sample code to configure the Pivot Table to fetch data from the Web API:

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:44346/pivot" expandAll="false" enableSorting="true">
     //Other codes here...
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 3: Define the Pivot Table Report

1. Configure the Pivot Table report in the **~/Views/Home/Index.cshtml** file to structure the data retrieved from the MongoDB database.
2. Add fields to the `rows`, `columns`, `values`, and `filters` properties of [e-datasourcesettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewDataSourceSettingsBuilder.html) to define the report structure.
3. Enable the field list by setting the [showFieldList](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_ShowFieldList) property to **true** and including the `FieldList` module in the services section. This allows users to dynamically add or rearrange fields using an interactive user interface.

Here's the sample code with the report configuration and field list support:

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings Url="https://localhost:44346/Pivot" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Step 4: Run and Verify the Pivot Table

1. Run the ASP.NET Core application.
2. The Pivot Table will display the data fetched from the MongoDB database via the Web API, structured according to the defined report.
3. The resulting Pivot Table will display data organized by Country and Products (rows), Year (columns), with Sold units and Amount as values.

## Key Points

- **MongoClient**: Establishes connection to MongoDB database
- **GetDatabase()**: Accesses the specific MongoDB database
- **GetCollection()**: Targets a specific collection in the database
- **Find()**: Retrieves documents from the collection
- **JsonConvert.SerializeObject()**: Converts retrieved data to JSON format for Pivot Table consumption
- Connection string must be valid and database/collection must exist before querying

## Additional Resources

Explore a complete example of the ASP.NET Core Pivot Table integrated with an ASP.NET Core Web Application to fetch data from a MongoDB database in this [GitHub](https://github.com/SyncfusionExamples/how-to-bind-MongoDB-to-pivot-table) repository.
