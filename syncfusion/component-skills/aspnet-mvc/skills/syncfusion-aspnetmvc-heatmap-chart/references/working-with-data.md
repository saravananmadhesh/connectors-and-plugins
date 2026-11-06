# Working with Data in HeatMap

## Table of Contents
- [Data Binding Overview](#data-binding-overview)
- [Array-Table Binding](#array-table-binding)
- [Array-Cell Binding](#array-cell-binding)
- [JSON-Table Binding](#json-table-binding)
- [JSON-Cell Binding](#json-cell-binding)
- [Data Adaptor Types](#data-adaptor-types)
- [Dynamic Data Updates](#dynamic-data-updates)

## Data Binding Overview

HeatMap supports four primary data binding patterns:

| Binding Type | Format | Use Case |
|-------------|--------|----------|
| Array-Table | 2D array | Grid-like data, predefined structure |
| Array-Cell | Triplets (row, col, value) | Sparse data, irregular grids |
| JSON-Table | Object array | From API responses, structured data |
| JSON-Cell | Object array with coordinates | Flexible data source mapping |

Each binding type uses the `AdaptorType` property to determine how data is interpreted.

## Array-Table Binding

### Overview

Array-table binding uses a two-dimensional array where each inner array represents a row of values. This is the default binding type.

**Structure:**
- Outer array = rows
- Inner array = columns within each row
- Values = numeric data for visualization

### Basic Example

```csharp
// Controller
public ActionResult Index()
{
    List<List<double>> data = new List<List<double>>
    {
        new List<double> { 36, 162, 36, 34 },  // Row 1
        new List<double> { 52, 60, 34, 56 },   // Row 2
        new List<double> { 33, 34, 52, 41 }    // Row 3
    };

    return View(data);
}
```

```csharp
// View
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "Col1", "Col2", "Col3", "Col4" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "Row1", "Row2", "Row3" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource((IEnumerable<object>)Model)
    .Render()
```

### Array-Table with Headers

Bind array data with explicit row and column headers:

```csharp
public class ArrayTableData
{
    public List<List<double>> Data { get; set; }
    public List<string> RowHeaders { get; set; }
    public List<string> ColHeaders { get; set; }
}

// Controller
var data = new ArrayTableData
{
    Data = new List<List<double>>
    {
        new List<double> { 100, 110, 120, 130 },
        new List<double> { 150, 160, 170, 180 }
    },
    RowHeaders = new List<string> { "Sales Q1", "Sales Q2" },
    ColHeaders = new List<string> { "Jan", "Feb", "Mar", "Apr" }
};
```

```csharp
// View
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(Model.ColHeaders);
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(Model.RowHeaders);
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource((IEnumerable<object>)Model.Data)
    .Render()
```

## Array-Cell Binding

### Overview

Array-cell binding uses triplets of `(row, column, value)` coordinates. Ideal for sparse data or irregular grids.

**Structure:**
```csharp
new { RowIndex = 0, ColumnIndex = 0, Value = 100 }
```

### Basic Example

```csharp
// Controller
public ActionResult Index()
{
    var cellData = new List<dynamic>
    {
        new { RowIndex = 0, ColumnIndex = 0, Value = 36 },
        new { RowIndex = 0, ColumnIndex = 1, Value = 162 },
        new { RowIndex = 1, ColumnIndex = 0, Value = 52 },
        new { RowIndex = 1, ColumnIndex = 2, Value = 34 }
        // Missing cells will not display
    };

    return View(cellData);
}
```

```csharp
// View
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "USA", "GER", "IND" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "2016", "2017" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource(new HeatMapData
    {
        AdaptorType = Syncfusion.EJ2.HeatMap.AdaptorType.Cell,
        Data = (IEnumerable<object>)Model
    })
    .Render()
```

### Cell Data with Custom Properties

```csharp
var cellData = new List<dynamic>
{
    new { RowIndex = 0, ColumnIndex = 0, Value = 100, Status = "Active" },
    new { RowIndex = 0, ColumnIndex = 1, Value = 200, Status = "Completed" },
    new { RowIndex = 1, ColumnIndex = 0, Value = 50, Status = "Pending" }
};
```

## JSON-Table Binding

### Overview

JSON-table binding binds an array of JSON objects where each object represents a row with properties mapping to columns.

**Requirements:**
- `IsJsonData = true`
- `AdaptorType = Table`
- `XDataMapping` property specifies row header field

### Basic Example

```csharp
// Model
public class SalesData
{
    public string Month { get; set; }
    public double Jan { get; set; }
    public double Feb { get; set; }
    public double Mar { get; set; }
    public double Apr { get; set; }
}

// Controller
var jsonData = new List<SalesData>
{
    new SalesData { Month = "2016", Jan = 36, Feb = 162, Mar = 36, Apr = 34 },
    new SalesData { Month = "2017", Jan = 52, Feb = 60, Mar = 34, Apr = 56 },
    new SalesData { Month = "2018", Jan = 33, Feb = 34, Mar = 52, Apr = 41 }
};

return View(jsonData);
```

```csharp
// View
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "Jan", "Feb", "Mar", "Apr" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "2016", "2017", "2018" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource(new HeatMapData
    {
        IsJsonData = true,
        AdaptorType = Syncfusion.EJ2.HeatMap.AdaptorType.Table,
        XDataMapping = "Month",
        Data = (IEnumerable<object>)Model
    })
    .Render()
```

### JSON-Table with Computed Properties

Include computed columns derived from row data:

```csharp
public class SalesAnalysis
{
    public string Category { get; set; }
    public double Q1 { get; set; }
    public double Q2 { get; set; }
    public double Q3 { get; set; }
    public double Total => Q1 + Q2 + Q3;  // Computed
}

// Controller
var analysisData = new List<SalesAnalysis>
{
    new SalesAnalysis { Category = "Electronics", Q1 = 1000, Q2 = 1200, Q3 = 1400 },
    new SalesAnalysis { Category = "Furniture", Q1 = 800, Q2 = 900, Q3 = 950 }
};
```

## JSON-Cell Binding

### Overview

JSON-cell binding uses an array of JSON objects with explicit row/column mapping via properties.

**Structure:**
```csharp
new { X = "value", Y = "value", Value = 100 }
```

### Basic Example

```csharp
// Model
public class CellRecord
{
    public string X { get; set; }      // Column header
    public string Y { get; set; }      // Row header
    public double Value { get; set; }  // Cell value
}

// Controller
var cellRecords = new List<CellRecord>
{
    new CellRecord { X = "Jan", Y = "2016", Value = 36 },
    new CellRecord { X = "Feb", Y = "2016", Value = 162 },
    new CellRecord { X = "Jan", Y = "2017", Value = 52 },
    new CellRecord { X = "Feb", Y = "2017", Value = 60 }
};

return View(cellRecords);
```

```csharp
// View
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource(new HeatMapData
    {
        IsJsonData = true,
        AdaptorType = Syncfusion.EJ2.HeatMap.AdaptorType.Cell,
        XDataMapping = "X",
        YDataMapping = "Y",
        ValueMapping = "Value",
        Data = (IEnumerable<object>)Model
    })
    .Render()
```

### JSON-Cell with Custom Mapping

Map custom property names to HeatMap coordinates:

```csharp
public class CustomCellData
{
    public string Product { get; set; }   // Maps to X
    public string Month { get; set; }     // Maps to Y
    public double Sales { get; set; }     // Maps to Value
}

// View
.DataSource(new HeatMapData
{
    IsJsonData = true,
    AdaptorType = Syncfusion.EJ2.HeatMap.AdaptorType.Cell,
    XDataMapping = "Product",
    YDataMapping = "Month",
    ValueMapping = "Sales",
    Data = (IEnumerable<object>)Model
})
```

## Data Adaptor Types

### Adaptor Comparison

| Adaptor | Input Type | Binding Mode | Use Case |
|---------|-----------|--------------|----------|
| Default (Table) | 2D Array | Array-Table | Predefined rectangular grid |
| Cell | Array of triplets | Array-Cell | Sparse/irregular data |
| Table | JSON Array | JSON-Table | Structured object data |
| Cell | JSON Array | JSON-Cell | Flexible coordinate mapping |

### Selecting the Right Adaptor

**Use Array-Table if:**
- Data is perfectly rectangular
- All cells have values
- From 2D array collection

**Use Array-Cell if:**
- Data is sparse (many missing cells)
- Irregular grid structure
- From coordinate-based source

**Use JSON-Table if:**
- Data from REST API as objects
- Properties represent columns
- First property is row header

**Use JSON-Cell if:**
- Flexible X/Y/Value property names
- Custom coordinate mapping needed
- Properties don't fit standard format

## Dynamic Data Updates

### Updating Data Source

Change data dynamically:

```csharp
@Html.EJS().HeatMap("container")
    .XAxis(xaxis => { /* ... */ })
    .YAxis(yaxis => { /* ... */ })
    .DataSource((IEnumerable<object>)Model)
    .ActionComplete("onDataBound")
    .Render()

<script>
function updateData(newData) {
    var heatmapObject = document.getElementById("container").ej2_instances[0];
    heatmapObject.dataSource = newData;
    heatmapObject.refresh();
}

function onDataBound(args) {
    console.log("HeatMap data bound successfully");
}
</script>
```

### Refreshing with New Data Set

```csharp
function loadNewDataSet() {
    $.ajax({
        url: '/Home/GetUpdatedData',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var heatmap = document.getElementById("container").ej2_instances[0];
            heatmap.dataSource = response;
            heatmap.refresh();
        }
    });
}
```

### Controller Support

```csharp
[HttpGet]
public JsonResult GetUpdatedData()
{
    var freshData = new List<List<double>>
    {
        new List<double> { 100, 110, 120 },
        new List<double> { 200, 210, 220 }
    };

    return Json(freshData, JsonRequestBehavior.AllowGet);
}
```

Working with data in HeatMap requires understanding the four binding patterns and selecting the appropriate adaptor type for your data structure.
