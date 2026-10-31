# Data Binding in Pivot Table

## ⚠️ SECURITY NOTICE

**All remote data connections MUST use authenticated, configuration-based endpoints.** Never hardcode URLs or use untrusted data sources.

✅ **Required Security Controls:**
- Configuration-based URLs (IConfiguration, appsettings.json)
- Authentication and authorization ([Authorize] attributes)
- HTTPS/SSL for all remote connections
- Parameterized queries for database access
- Input validation and sanitization

## Table of Contents
- [Local JSON Binding](#local-json-binding)
- [Remote JSON Binding](#remote-json-binding)
- [CSV Data Binding](#csv-data-binding)
- [Format Settings](#format-settings)
- [Mapping](#mapping)
- [Values in Row Axis](#values-in-row-axis)
- [Show No Data Items](#show-no-data-items)
- [Show Value Headers Always](#show-value-headers-always)
- [Customize Empty Value Cells](#customize-empty-value-cells)
- [OData Services](#odata-services)
- [OData V4 Services](#odata-v4-services)
- [Web API](#web-api)
- [Querying in Data Manager](#querying-in-data-manager)
- [Best Practices](#best-practices)

## Local JSON Binding

Bind local JSON data directly from an IEnumerable collection passed from the controller via ViewBag:

**Controller Code:**
```csharp
public IActionResult Index()
{
    ViewBag.DataSource = GetPivotData();
    return View();
}

private IEnumerable GetPivotData()
{
    return new List<PivotData>
    {
        new PivotData { Country = "USA", Year = "2021", Amount = 100000, Sold = 50 },
        new PivotData { Country = "USA", Year = "2022", Amount = 120000, Sold = 60 },
        new PivotData { Country = "Canada", Year = "2021", Amount = 80000, Sold = 40 },
        new PivotData { Country = "Canada", Year = "2022", Amount = 95000, Sold = 55 }
    };
}

public class PivotData
{
    public string Country { get; set; }
    public string Year { get; set; }
    public double Amount { get; set; }
    public int Sold { get; set; }
}
```

**View Code (Tag Helper):**
```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sales Amount"></e-field>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Points:**
- Field names in `<e-field name="">` are **case-sensitive** and must match data properties exactly
- Data is passed via `ViewBag.DataSource` from the controller
- All row, column, and value fields must be explicitly defined
- `expandAll="false"` collapses field headers on initial load

## Remote JSON Binding

> **⚠️ SECURITY:** Use configuration-based URLs with authentication. See security notice at top of document.

**Step 1 — Add configuration to appsettings.json:**
```json
{
  "DataSource": {
    "JsonUrl": "https://your-server.com/api/sales-data.json"
  }
}
```

**Step 2 — Inject IConfiguration in the view:**
```html
@inject IConfiguration Configuration
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings url="@Configuration["DataSource:JsonUrl"]" expandAll="false">
        <e-rows>
            <e-field name="EnerType"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="EneSource"></e-field>
        </e-columns>
        <e-values>
            <e-field name="PowUnits"></e-field>
            <e-field name="ProCost"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Features:**
- Supports both direct downloadable JSON files (*.json) and web service URLs
- Automatic data fetching and parsing by the component
- `expandAll="false"` collapses field headers on initial load
- URL must be accessible from the client browser
- CORS must be properly configured for cross-domain requests

## CSV Data Binding

### Local CSV Data

Convert CSV data into a 2D string array and bind it to the Pivot Table:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings dataSource="getCSVData()" type="CSV">
        <e-rows>
            <e-field name="Region"></e-field>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Item Type"></e-field>
            <e-field name="Sales Channel"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Total Cost"></e-field>
            <e-field name="Total Revenue"></e-field>
            <e-field name="Total Profit"></e-field>
        </e-values>
        <e-formatsettings>
            <e-field name="Total Cost" format="C0" useGrouping="true"></e-field>
            <e-field name="Total Revenue" format="C0" useGrouping="true"></e-field>
            <e-field name="Total Profit" format="C0" useGrouping="true"></e-field>
        </e-formatsettings>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
function getCSVData() {
    var dataSource = [];
    var csvData = "Region,Country,Item Type,Sales Channel,Total Cost,Total Revenue,Total Profit\r\nNorth America,Canada,Vegetables,Online,274426.74,464953.08,190526.34\r\nEurope,Armenia,Cereal,Online,1115824.08,1959909.60,844085.52\r\nSub-Saharan Africa,Eritrea,Cereal,Online,333060.84,585010.80,251949.96";
    var jsonObject = csvData.split(/\r?\n|\r/);
    for (var i = 0; i < jsonObject.length; i++) {
        if (!ej.base.isNullOrUndefined(jsonObject[i]) && jsonObject[i] !== '') {
            dataSource.push(jsonObject[i].split(','));
        }
    }
    return dataSource;
}
</script>
```

**Key Points:**
- CSV data must be converted to a 2D string array format
- First row is treated as headers and matched to field names
- `type="CSV"` identifies the data as CSV format
- DataSource receives a function reference (as string) that returns the array

### Remote CSV Data

Load CSV data from a remote URL:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings url="https://bi.syncfusion.com/productservice/api/sales" type="CSV" expandAll="false">
        <e-rows>
            <e-field name="Region"></e-field>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Item Type"></e-field>
            <e-field name="Sales Channel"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Total Cost"></e-field>
            <e-field name="Total Revenue"></e-field>
            <e-field name="Total Profit"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Note:** CSV format is approximately 50% smaller than JSON, making it ideal for large datasets and significantly reducing bandwidth usage.

## Format Settings

Apply number and date formatting to value fields:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sales Amount"></e-field>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
        <e-formatsettings>
            <e-field name="Amount" format="C2" useGrouping="true"></e-field>
            <e-field name="Sold" format="N0"></e-field>
        </e-formatsettings>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Available Format Codes:**
- `"N2"` - Number with 2 decimals (1234.56)
- `"C2"` - Currency with 2 decimals ($1,234.56)
- `"P2"` - Percentage (12.34%)
- `"E2"` - Exponential (1.23E+03)
- `"N0"` - Whole number (1,234)

## Show Value Headers Always

Ensure value headers remain visible even with a single value field:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" alwaysShowValueHeader="true">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Benefit:** Maintains consistent header visibility for better user experience and clearer data interpretation.

## Customize Empty Value Cells

Fill empty cells with custom text instead of leaving them blank:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" emptyCellsTextContent="**">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Usage Examples:**
- `"**"` - Asterisk indicator for empty values
- `"-"` - Dash symbol
- `"0"` - Zero value replacement
- `"(blank)"` - Custom text label
- `"N/A"` - Not available indicator

## Mapping

Field mapping allows you to customize how fields appear and behave in the Pivot Table without changing the original data source. This enables you to define field properties such as display names, data types, aggregation methods, and UI control visibility:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" showGroupingBar="true" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" allowLabelFilter="true" allowValueFilter="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country" caption="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
        <e-fieldmapping>
            <e-field name="Quarter" showSortIcon="false"></e-field>
            <e-field name="Products" showFilterIcon="false" showRemoveIcon="false"></e-field>
            <e-field name="Amount" caption="Sold Amount" showValueTypeIcon="false"></e-field>
        </e-fieldmapping>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Field Identification and Display:**
- `name` - Field name from data source (must match exactly, case-sensitive)
- `caption` - User-friendly display name shown in UI and Field List

**Aggregation and Calculation:**
- `summaryType` - Aggregation type (Sum, Avg, Product, Count, Min, Max, etc.)
- `dataType` - Field data type ('string', 'number', 'datetime', 'date', or 'boolean')
- `showNoDataItems` - Display items even when no data exists

**Field UI Customization:**
- `showSortIcon` - Show/hide sort button for the field (default: true)
- `showFilterIcon` - Show/hide filter button for the field (default: true)
- `showRemoveIcon` - Show/hide remove button for the field (default: true)
- `showValueTypeIcon` - Show/hide value type dropdown icon for value fields (default: true)

## Values in Row Axis

Display value fields in the row axis instead of columns:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" valueAxis="row">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Result Layout:**
```
Country     Product      Year    Quarter    Sold    Amount
USA         Bike         2021    Q1         100     50000
                         Q2      150        75000
```

## Show No Data Items

Display all field items even when they lack data in certain combinations:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country" showNoDataItems="true"></e-field>
            <e-field name="Products" showNoDataItems="true"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year" showNoDataItems="true"></e-field>
            <e-field name="Quarter" showNoDataItems="true"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Effect:** Displays blank cells for items without data, providing a complete view of all possible combinations.

## OData Services

Connect to OData v2 services using the OData Adaptor. OData (Open Data Protocol) is a web-based protocol that provides a standard way to create and consume data APIs. The DataManager handles communication and data retrieval automatically:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%" showFieldList="true">
    <e-datasourcesettings expandAll="false" enableSorting="true">
        <e-data-manager url="https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders/" adaptor="ODataAdaptor" crossdomain="true"></e-data-manager>
        <e-rows>
            <e-field name="ShipCountry"></e-field>
            <e-field name="ShipCity"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="CustomerID" caption="Customer ID"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Freight" caption="Freight"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Configuration:**
- `<e-data-manager>` - Container for remote data source configuration
- `url` - OData service endpoint URL
- `adaptor="ODataAdaptor"` - Specifies OData v2 protocol
- `crossdomain="true"` - Enable CORS for cross-domain requests

## OData V4 Services

Connect to OData V4 services with enhanced query capabilities. OData V4 services provide improved performance and advanced querying options compared to OData v2:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%" showFieldList="true">
    <e-datasourcesettings expandAll="false" enableSorting="true">
        <e-data-manager url="https://services.odata.org/V4/Northwind/Northwind.svc/Orders/" adaptor="ODataV4Adaptor" crossdomain="true"></e-data-manager>
        <e-rows>
            <e-field name="ShipCountry"></e-field>
            <e-field name="ShipCity"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="CustomerID" caption="Customer ID"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Freight" caption="Freight"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Configuration:**
- `adaptor="ODataV4Adaptor"` - Specifies OData V4 protocol (enhanced features)
- Supports advanced filtering and query operations
- Improved performance over OData v2

## Web API

Connect to RESTful Web API endpoints using WebApiAdaptor. Web API binding allows direct connection to custom web services for dynamic data loading:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%">
    <e-datasourcesettings expandAll="false" enableSorting="true">
        <e-data-manager url="https://bi.syncfusion.com/northwindservice/api/orders" adaptor="WebApiAdaptor" crossdomain="true"></e-data-manager>
        <e-formatsettings>
            <e-field name="UnitPrice" format="C0" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="ShipCountry" caption="Ship Country"></e-field>
            <e-field name="ShipCity" caption="Ship City"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="ProductName" caption="Product Name"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Quantity" caption="Quantity"></e-field>
            <e-field name="UnitPrice" caption="Unit Price"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Configuration:**
- `adaptor="WebApiAdaptor"` - Specifies RESTful Web API communication
- `url` - Web API endpoint URL
- Can be combined with format settings for number/currency formatting
- Ideal for custom business logic and data processing

## Querying in Data Manager

Customize data retrieval by applying custom queries to filter, sort, or limit data at the data source level. Use the `load` event to define queries before pivot rendering:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" width="100%" showFieldList="true" load="onLoad">
    <e-datasourcesettings expandAll="false" enableSorting="true">
        <e-data-manager url="https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders" adaptor="ODataAdaptor" crossdomain="true"></e-data-manager>
        <e-rows>
            <e-field name="ShipCountry"></e-field>
            <e-field name="ShipCity"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="CustomerID" caption="Customer ID"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Freight" caption="Freight"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
function onLoad(args) {
    var dataSource = args.dataSourceSettings.dataSource;
    // Apply filtering: only get first 2 records
    dataSource.defaultQuery = new ej.data.Query().take(2);
    
    // Example with where condition to filter USA records
    // dataSource.defaultQuery = new ej.data.Query()
    //     .where('ShipCountry', 'equal', 'USA')
    //     .take(10);
}
</script>
```

**Query Operations:**
- `.take(n)` - Limit number of records retrieved from data source
- `.where(field, operator, value)` - Filter data based on conditions
- `.orderBy(field)` - Sort data ascending
- `.orderByDescending(field)` - Sort data descending
- `.skip(n)` - Skip n records (useful for paging)

**Operators for where() clause:**
- `'equal'` - Equals condition
- `'notequal'` - Not equals
- `'greaterthan'` - Greater than
- `'lessthan'` - Less than
- `'like'` - String contains

**Benefits:**
- Reduces bandwidth by filtering at source
- Improves performance for large datasets
- Processes only required data

## Best Practices

✓ **Field names are case-sensitive** - Must match data source exactly
✓ **Local data** - Pass `IEnumerable<T>` via ViewBag from controller
✓ **Remote data** - Use `url` attribute directly for JSON or set `type="CSV"` for CSV
✓ **Test with browser console** - Verify data loads correctly and field names match
✓ **Large datasets** - Implement virtual scrolling or paging
✓ **CSV format** - Use for text-heavy data to reduce bandwidth (~50% vs JSON)
✓ **Data validation** - Ensure numbers aren't strings, dates are properly formatted
✓ **Format settings** - Apply consistent number formatting across value fields
✓ **Field mapping** - Use display names (captions) different from data field names
✓ **Show No Data Items** - Enable for complete categorical analysis of all combinations
