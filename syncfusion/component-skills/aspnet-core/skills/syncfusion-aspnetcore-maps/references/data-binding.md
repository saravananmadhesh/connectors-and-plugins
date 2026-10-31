# Data Binding in Maps

## Table of Contents

- [Overview](#overview)
- [Data Binding Fundamentals](#data-binding-fundamentals)
  - [The Three-Property System](#the-three-property-system)
  - [How Matching Works](#how-matching-works)
  - [Basic Binding Example](#basic-binding-example)
- [Key Properties](#key-properties)
  - [dataSource](#datasource)
  - [shapeDataPath](#shapedatapath)
  - [shapePropertyPath](#shapepropertypath)
- [Binding JSON Data](#binding-json-data)
  - [From Static JSON File](#from-static-json-file)
  - [From Inline C# Object](#from-inline-c-object)
- [Binding from Database](#binding-from-database)
  - [Using Entity Framework](#using-entity-framework)
  - [Collections and Arrays](#collections-and-arrays)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Updating Data Source](#updating-data-source)
  - [Real-Time Data Updates](#real-time-data-updates)
  - [Filtering Data Dynamically](#filtering-data-dynamically)
- [Data Transformation](#data-transformation)
  - [Normalizing Data](#normalizing-data)
  - [Aggregating Data](#aggregating-data)
  - [Calculating Derived Values](#calculating-derived-values)
- [Complete Examples](#complete-examples)
  - [Example 1: Population Density Map](#example-1-population-density-map)
  - [Example 2: Sales Dashboard with Database Data](#example-2-sales-dashboard-with-database-data)
- [Best Practices](#best-practices)
  - [1. Consistent Naming](#1-consistent-naming)
  - [2. Handle Missing Matches](#2-handle-missing-matches)
  - [3. Validate Data Before Binding](#3-validate-data-before-binding)
  - [4. Use Caching for Static Data](#4-use-caching-for-static-data)
- [Troubleshooting](#troubleshooting)
  - [Data Not Binding to Shapes](#data-not-binding-to-shapes)
  - [Only Some Shapes Show Data](#only-some-shapes-show-data)
  - [Tooltip Shows Undefined Values](#tooltip-shows-undefined-values)
  - [Performance Issues with Large Datasets](#performance-issues-with-large-datasets)

## Overview

Data binding connects your business data to geographical shapes on the map. This enables visualization of statistical data, creating choropleth maps, adding context to regions, and driving visual features like color mapping and data labels.

**Why Data Binding?**
- Visualize statistics on geographical regions
- Create data-driven color schemes
- Display region-specific information in tooltips
- Enable data labels showing metrics
- Drive marker and bubble visualizations

**What Can Be Bound?**
- Statistical data (population, revenue, counts)
- Categorical data (status, type, classification)
- Metadata (names, codes, descriptions)
- Time-series data (yearly data, trends)

## Data Binding Fundamentals

### The Three-Property System

Data binding in Maps uses three key properties:

1. **`dataSource`** - Your business data (array of objects)
2. **`shapeDataPath`** - Property in dataSource to match against shapes
3. **`shapePropertyPath`** - Property in GeoJSON to match against dataSource

### How Matching Works

```
DataSource Record:          GeoJSON Feature:
{ Country: "USA", ... }  →  properties: { name: "USA" }
        ↓                              ↓
   shapeDataPath                shapePropertyPath
     "Country"                      ["name"]
```

When `dataSource.Country === geoJson.properties.name`, the data binds to that shape.

### Basic Binding Example

```cshtml
@{
    // GeoJSON with country shapes
    var worldMap = JsonConvert.DeserializeObject(
        System.IO.File.ReadAllText("wwwroot/maps/world.json")
    );
    
    // Business data
    var populationData = new[] {
        new { Country = "United States", Population = 331000000 },
        new { Country = "China", Population = 1400000000 },
        new { Country = "India", Population = 1380000000 }
    };
    
    var propertyPath = new[] { "name" };
}

<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer 
            shapeData="worldMap"
            dataSource="populationData"
            shapeDataPath="Country"
            shapePropertyPath="propertyPath">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Result:** Countries in `populationData` will match corresponding shapes in GeoJSON by name.

## Key Properties

### dataSource

The collection of business data to bind to map shapes.

**Type:** `object[]` (array of objects)

**Example:**
```csharp
var dataSource = new[] {
    new { State = "California", Revenue = 500000 },
    new { State = "Texas", Revenue = 450000 },
    new { State = "New York", Revenue = 600000 }
};
```

```cshtml
<e-maps-layer dataSource="dataSource">
```

### shapeDataPath

Property name in your dataSource that contains the matching value.

**Type:** `string`

**Example:**
```csharp
// If dataSource has: { Country: "USA", ... }
shapeDataPath="Country"

// If dataSource has: { RegionName: "California", ... }
shapeDataPath="RegionName"
```

```cshtml
<e-maps-layer shapeDataPath="Country">
```

### shapePropertyPath

Property path in GeoJSON `properties` object to match against.

**Type:** `string[]` (array of strings for nested properties)

**Examples:**
```csharp
// For: geoJson.properties.name
var propertyPath = new[] { "name" };

// For: geoJson.properties.admin.code
var propertyPath = new[] { "admin", "code" };

// For: geoJson.properties.country_code
var propertyPath = new[] { "country_code" };
```

```cshtml
<e-maps-layer shapePropertyPath="propertyPath">
```

**Common GeoJSON Property Names:**
- `name` - Full country/region name
- `iso_a2` / `iso_a3` - ISO country codes
- `admin` - Administrative name
- `code` - Custom identifier

## Binding JSON Data

### From Static JSON File

**Data File (wwwroot/data/sales-data.json):**
```json
[
  { "State": "California", "Sales": 45000, "Stores": 12 },
  { "State": "Texas", "Sales": 38000, "Stores": 10 },
  { "State": "Florida", "Sales": 32000, "Stores": 8 }
]
```

**Razor Page:**
```cshtml
@{
    var usaMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/usa.json"));
    var salesData = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/data/sales-data.json"));
    var propertyPath = new[] { "name" };
}

<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer 
            shapeData="usaMap"
            dataSource="salesData"
            shapeDataPath="State"
            shapePropertyPath="propertyPath">
            
            <e-layersettings-shapesettings colorValuePath="Sales">
            </e-layersettings-shapesettings>
            
            <e-layersettings-tooltipsettings visible="true" valuePath="State" template="tooltipTemplate">
            </e-layersettings-tooltipsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<div id="tooltipTemplate"><strong>${State}</strong><br/>
    Sales: $${Sales}<br/>
    Stores: ${Stores}
</div>
```

### From Inline C# Object

```cshtml
@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var electionData = new[] {
        new { Country = "United States", Winner = "Democrats", Votes = 81000000 },
        new { Country = "United Kingdom", Winner = "Conservatives", Votes = 14000000 },
        new { Country = "France", Winner = "La République", Votes = 20000000 },
        new { Country = "Germany", Winner = "CDU", Votes = 16000000 }
    };
    
    var propertyPath = new[] { "name" };
}

<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer 
            shapeData="worldMap"
            dataSource="electionData"
            shapeDataPath="Country"
            shapePropertyPath="propertyPath">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

## Binding from Database

### Using Entity Framework

**Model:**
```csharp
public class RegionStatistics
{
    public int Id { get; set; }
    public string RegionName { get; set; }
    public int Population { get; set; }
    public decimal GDP { get; set; }
    public string Category { get; set; }
}
```

**Controller/Page Model:**
```csharp
public class IndexModel : PageModel
{
    private readonly ApplicationDbContext _context;
    
    public object WorldMapData { get; set; }
    public List<RegionStatistics> RegionData { get; set; }
    
    public IndexModel(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public void OnGet()
    {
        // Load GeoJSON
        string geoJson = System.IO.File.ReadAllText("wwwroot/maps/world.json");
        WorldMapData = JsonConvert.DeserializeObject(geoJson);
        
        // Load data from database
        RegionData = _context.RegionStatistics
            .Where(r => r.Category == "Country")
            .OrderBy(r => r.RegionName)
            .ToList();
    }
}
```

**Razor Page:**
```cshtml
@page
@model IndexModel
@{
    var propertyPath = new[] { "name" };
}

<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer 
            shapeData="@Model.WorldMapData"
            dataSource="@Model.RegionData"
            shapeDataPath="RegionName"
            shapePropertyPath="propertyPath">
            
            <e-layersettings-shapesettings colorValuePath="GDP">
            </e-layersettings-shapesettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Collections and Arrays

**Data with arrays:**
```csharp
var regionData = new[] {
    new {
        State = "California",
        Cities = new[] { "Los Angeles", "San Francisco", "San Diego" },
        TopIndustries = new[] { "Technology", "Entertainment", "Agriculture" }
    }
};
```

**Display in tooltips:**
```cshtml
<e-layersettings-tooltipsettings visible="true" valuePath="State" template="tooltipTemplate">
</e-layersettings-tooltipsettings>

<div id="tooltipTemplate">
    <strong>${State}</strong><br/>
    Cities: ${Cities.join(', ')}<br/>
    Industries: ${TopIndustries.join(', ')}
</div>
```

## Dynamic Data Updates

### Updating Data Source

```cshtml
<button onclick="updateMapData()">Update Data</button>

<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer 
            shapeData="worldMap"
            dataSource="initialData"
            shapeDataPath="Country"
            shapePropertyPath="@(new[] { "name" })">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<script>
    function updateMapData() {
        var maps = document.getElementById('maps').ej2_instances[0];
        
        // Fetch new data
        fetch('/api/map-data/latest')
            .then(response => response.json())
            .then(newData => {
                // Update data source
                maps.layers[0].dataSource = newData;
                maps.refresh();
            });
    }
</script>
```

### Real-Time Data Updates

```cshtml
<script>
    // Update every 30 seconds
    setInterval(function() {
        refreshMapData();
    }, 30000);
    
    function refreshMapData() {
        var maps = document.getElementById('maps').ej2_instances[0];
        
        fetch('/api/map-data/realtime')
            .then(response => response.json())
            .then(data => {
                maps.layers[0].dataSource = data;
                maps.refresh();
            })
            .catch(error => {
                console.error('Failed to update data:', error);
            });
    }
</script>
```

### Filtering Data Dynamically

```cshtml
<select onchange="filterData(this.value)">
    <option value="all">All Regions</option>
    <option value="high">High Performance</option>
    <option value="medium">Medium Performance</option>
    <option value="low">Low Performance</option>
</select>

<script>
    var originalData = @Html.Raw(JsonConvert.SerializeObject(Model.FullDataset));
    
    function filterData(category) {
        var maps = document.getElementById('maps').ej2_instances[0];
        
        var filteredData = category === 'all' 
            ? originalData 
            : originalData.filter(item => item.Performance === category);
        
        maps.layers[0].dataSource = filteredData;
        maps.refresh();
    }
</script>
```

## Data Transformation

### Normalizing Data

Transform API data to match GeoJSON property names:

```csharp
public async Task OnGetAsync()
{
    var apiData = await FetchFromApi();
    
    // Transform: API uses "country_name", GeoJSON uses "name"
    var normalizedData = apiData.Select(item => new {
        Country = item.country_name,  // Rename to match shapeDataPath
        Population = item.population,
        Revenue = item.annual_revenue
    }).ToArray();
    
    DataSource = normalizedData;
}
```

### Aggregating Data

Aggregate detailed data for map visualization:

```csharp
public void OnGet()
{
    // Detailed city-level data
    var cityData = _context.CityStatistics.ToList();
    
    // Aggregate to state level
    var stateData = cityData
        .GroupBy(c => c.StateName)
        .Select(g => new {
            State = g.Key,
            TotalPopulation = g.Sum(c => c.Population),
            AverageIncome = g.Average(c => c.MedianIncome),
            CityCount = g.Count()
        })
        .ToArray();
    
    DataSource = stateData;
}
```

### Calculating Derived Values

```csharp
var enhancedData = rawData.Select(item => new {
    Country = item.Name,
    Population = item.Population,
    GDP = item.GDP,
    // Calculate derived values
    GDPPerCapita = item.Population > 0 ? item.GDP / item.Population : 0,
    PopulationDensity = item.Area > 0 ? item.Population / item.Area : 0,
    Category = item.GDP > 1000000 ? "High" : item.GDP > 500000 ? "Medium" : "Low"
}).ToArray();
```

## Complete Examples

### Example 1: Population Density Map

```cshtml
@page
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var populationData = new[] {
        new { Country = "China", Population = 1400000000, Area = 9596961, Density = 145 },
        new { Country = "India", Population = 1380000000, Area = 3287263, Density = 420 },
        new { Country = "United States", Population = 331000000, Area = 9833517, Density = 34 },
        new { Country = "Indonesia", Population = 273500000, Area = 1904569, Density = 144 }
    };
    
    var colorMapping = new List<MapsColorMapping> {
        new MapsColorMapping { From = 0, To = 100, Color = "#C6E7F0", Label = "< 100" },
        new MapsColorMapping { From = 100, To = 200, Color = "#6AB7D6", Label = "100-200" },
        new MapsColorMapping { From = 200, To = 500, Color = "#1A7FA0", Label = "> 200" }
    };
    
    var propertyPath = new[] { "name" };
}

<ejs-maps id="maps" height="600px">
    <e-maps-titlesettings text="Population Density by Country (per km²)"></e-maps-titlesettings>
    <e-maps-legendsettings visible="true"></e-maps-legendsettings>
    
    <e-maps-layers>
        <e-maps-layer 
            shapeData="worldMap"
            dataSource="populationData"
            shapeDataPath="Country"
            shapePropertyPath="propertyPath">
            
            <e-layersettings-shapesettings 
                colorValuePath="Density"
                fill="#E5E5E5"
                colorMapping="colorMapping">
            </e-layersettings-shapesettings>
            
            <e-layersettings-tooltipsettings visible="true" valuePath="Country" template="tooltipTemplate">
            </e-layersettings-tooltipsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<div id="tooltipTemplate" style="padding: 8px;">
    <strong>${Country}</strong><br/>
    Population: ${Population.toLocaleString()}<br/>
    Area: ${Area.toLocaleString()} km²<br/>
    Density: ${Density}/km²
</div>
```

### Example 2: Sales Dashboard with Database Data

```cshtml
@page
@model SalesDashboardModel

@{
    var propertyPath = new[] { "name" };
}

<div>
    <h2>Regional Sales Performance</h2>
    <p>Last Updated: @Model.LastUpdated.ToString("g")</p>
    
    <ejs-maps id="salesMap" height="600px">
        <e-maps-layers>
            <e-maps-layer 
                shapeData="@Model.UsaMapData"
                dataSource="@Model.SalesData"
                shapeDataPath="StateName"
                shapePropertyPath="propertyPath">
                
                <e-layersettings-shapesettings 
                    colorValuePath="Revenue"
                    colorMapping="@Model.ColorMapping">
                </e-layersettings-shapesettings>
                
                <e-layersettings-datalabelsettings 
                    visible="true" 
                    labelPath="StateName"
                    smartLabelMode="Trim">
                </e-layersettings-datalabelsettings>
                
                <e-layersettings-tooltipsettings visible="true" template="tooltipTemplate">
                </e-layersettings-tooltipsettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<div id="tooltipTemplate">
    <strong>${StateName}</strong><br/>
    Revenue: $${Revenue.toLocaleString()}<br/>
    Stores: ${StoreCount}<br/>
    Growth: ${GrowthRate}%
</div>
```

## Best Practices

### 1. Consistent Naming

Use consistent property names between dataSource and GeoJSON:

```csharp
// ✅ Good: Clear, consistent naming
var data = new[] {
    new { StateName = "California", Value = 100 }
};
// GeoJSON: properties.name = "California"
shapeDataPath="StateName"
shapePropertyPath = new[] { "name" }

// ❌ Bad: Unclear, inconsistent
var data = new[] {
    new { x = "CA", y = 100 }
};
```

### 2. Handle Missing Matches

Not all dataSource records may match GeoJSON shapes:

```csharp
// Include logging for unmatched records
var dataWithLogging = data.Select(item => {
    if (!geoJsonShapes.Any(s => s.Name == item.Region)) {
        _logger.LogWarning($"No shape found for: {item.Region}");
    }
    return item;
}).ToArray();
```

### 3. Validate Data Before Binding

```csharp
public void OnGet()
{
    var rawData = LoadData();
    
    // Validate and clean
    DataSource = rawData
        .Where(item => !string.IsNullOrEmpty(item.RegionName))
        .Where(item => item.Value >= 0)
        .Select(item => new {
            Region = item.RegionName.Trim(),
            Value = item.Value
        })
        .ToArray();
}
```

### 4. Use Caching for Static Data

```csharp
private static object _cachedGeoJson;
private static object _cachedDataSource;

public void OnGet()
{
    if (_cachedGeoJson == null) {
        _cachedGeoJson = LoadGeoJson();
    }
    
    if (_cachedDataSource == null || DataNeedsRefresh()) {
        _cachedDataSource = LoadData();
    }
}
```

## Troubleshooting

### Data Not Binding to Shapes

**Problem:** Shapes render but show no data.

**Solutions:**
1. **Verify property names match exactly:**
   ```csharp
   // DataSource has "USA", GeoJSON has "United States" - WON'T MATCH
   // Use consistent naming or transform data
   ```

2. **Check case sensitivity:**
   ```csharp
   // "USA" ≠ "usa" - ensure consistent casing
   ```

3. **Inspect GeoJSON properties:**
   ```javascript
   // Open browser dev tools, check GeoJSON structure
   console.log(worldMapData.features[0].properties);
   ```

4. **Test with simple data first:**
   ```csharp
   var testData = new[] {
       new { Country = "United States", Value = 100 }
   };
   ```

### Only Some Shapes Show Data

**Problem:** Some shapes have data, others don't.

**Solutions:**
1. Check for spelling differences in region names
2. Verify all dataSource records have matching shapes
3. Log unmatched records for debugging
4. Use ISO codes instead of names for reliability

### Tooltip Shows Undefined Values

**Problem:** Tooltip template shows `${undefined}`.

**Solutions:**
1. **Verify property exists in dataSource:**
   ```cshtml
   <!-- If dataSource has "Revenue" not "Sales" -->
   <div>${Revenue}</div>  <!-- ✅ -->
   <div>${Sales}</div>    <!-- ❌ shows undefined -->
   ```

2. **Use null-checking in templates:**
   ```cshtml
   <div>${Population ? Population.toLocaleString() : 'N/A'}</div>
   ```

### Performance Issues with Large Datasets

**Problem:** Slow rendering with many data records.

**Solutions:**
1. **Filter to visible regions only**
2. **Aggregate data before binding**
3. **Use pagination/lazy loading for very large datasets**
4. **Cache processed data**
5. **Optimize data transformation logic**
