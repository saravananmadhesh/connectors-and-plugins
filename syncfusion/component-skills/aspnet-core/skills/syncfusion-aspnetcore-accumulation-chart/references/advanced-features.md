# Advanced Features

This guide covers advanced capabilities including annotations, export, print functionality, and migration guidance.

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Annotations](#annotations)
  - [Basic Annotations](#basic-annotations)
  - [Region Positioning](#region-positioning)
  - [Coordinate Units](#coordinate-units)
  - [Alignment](#alignment)
  - [Annotation Types](#annotation-types)
- [Export](#export)
  - [Export to PNG](#export-to-png)
  - [Export to JPEG](#export-to-jpeg)
  - [Export to SVG](#export-to-svg)
  - [Export to PDF](#export-to-pdf)
  - [Export Options](#export-options)
- [Print](#print)
- [EJ1 to EJ2 Migration](#ej1-to-ej2-migration)
  - [Key API Changes](#key-api-changes)
  - [EJ1 Code Example](#ej1-code-example)
  - [EJ2 Code Example](#ej2-code-example)
  - [Migration Benefits](#migration-benefits)
  - [Common Migration Issues](#common-migration-issues)
- [Performance Optimization](#performance-optimization)
  - [Reduce Data Points](#reduce-data-points)
  - [Disable Animations for Large Datasets](#disable-animations-for-large-datasets)
  - [Optimize Data Queries](#optimize-data-queries)
  - [Enable Smart Labels Selectively](#enable-smart-labels-selectively)
  - [Debounce Dynamic Updates](#debounce-dynamic-updates)
  - [Cache Data Client-Side](#cache-data-client-side)
- [Complete Advanced Example](#complete-advanced-example)

## Annotations

Annotations allow you to add custom content (text, shapes, images) to specific areas of the chart.

### Basic Annotations

Add text or HTML content to the chart:

```cshtml
<ejs-accumulationchart id="annotatedChart">
    <e-accumulationchart-accumulationannotations>
        <e-accumulationchart-accumulationannotation content="<div style='color:red; font-weight:bold;'>Peak Season</div>"
                                      region="Series"
                                      x="50%"
                                      y="50%">
        </e-accumulationchart-accumulationannotation>
    </e-accumulationchart-accumulationannotations>
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Region Positioning

Position annotations relative to `Chart` or `Series`:

**Chart Region (entire chart area):**

```cshtml
<ejs-accumulationchart id="chartRegion">
    <e-accumulationchart-accumulationannotations>
        <e-accumulationchart-accumulationannotation content="<div style='padding:10px; background:#f0f0f0; border-radius:5px;'><strong>Q4 2024</strong><br/>Total: $1.2M</div>"
                                      region="Chart"
                                      x="10%"
                                      y="5%">
        </e-accumulationchart-accumulationannotation>
    </e-accumulationchart-accumulationannotations>
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Series Region (chart series area only):**

```cshtml
<ejs-accumulationchart id="seriesRegion">
    <e-accumulationchart-accumulationannotations>
        <e-accumulationchart-accumulationannotation content="<div style='font-size:24px; font-weight:bold; color:#666;'>65%</div>"
                                      region="Series"
                                      x="50%"
                                      y="50%">
        </e-accumulationchart-accumulationannotation>
    </e-accumulationchart-accumulationannotations>
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value" type="Pie" innerRadius="50%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Use Cases:**
- **Chart region:** Headers, watermarks, external labels
- **Series region:** Center labels for doughnut, data callouts

### Coordinate Units

Specify position in `Pixel` or `Point` units:

**Pixel Units (absolute positioning):**

```cshtml
<ejs-accumulationchart id="pixelAnnotation">
    <e-accumulationchart-accumulationannotations>
        <e-accumulationchart-accumulationannotation content="<div>Fixed Position</div>"
                                      coordinateUnits="Pixel"
                                      x="100"
                                      y="50">
        </e-accumulationchart-accumulationannotation>
    </e-accumulationchart-accumulationannotations>
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Point Units (relative to data):**

```cshtml
<ejs-accumulationchart id="pointAnnotation">
    <e-accumulationchart-accumulationannotations>
        <e-accumulationchart-accumulationannotation content="<div>Data Point</div>"
                                      coordinateUnits="Point"
                                      x="2"
                                      y="45">
        </e-accumulationchart-accumulationannotation>
    </e-accumulationchart-accumulationannotations>
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Alignment

Fine-tune annotation positioning:

```cshtml
<ejs-accumulationchart id="alignedAnnotation">
    <e-accumulationchart-accumulationannotations>
        <e-accumulationchart-accumulationannotation content="<div style='padding:5px; background:#FFE5B4; border:1px solid #FFA500;'>Top Right Corner</div>"
                                      region="Chart"
                                      x="100%"
                                      y="0%"
                                      horizontalAlignment="Far"
                                      verticalAlignment="Top">
        </e-accumulationchart-accumulationannotation>
        
        <e-accumulationchart-accumulationannotation content="<div style='padding:5px; background:#E5F5FF; border:1px solid #007ACC;'>Bottom Center</div>"
                                      region="Chart"
                                      x="50%"
                                      y="100%"
                                      horizontalAlignment="Center"
                                      verticalAlignment="Bottom">
        </e-accumulationchart-accumulationannotation>
    </e-accumulationchart-accumulationannotations>
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Alignment Options:**
- **Horizontal:** `Near`, `Center`, `Far`
- **Vertical:** `Top`, `Middle`, `Bottom`

### Annotation Types

**Text Annotation:**

```cshtml
<e-accumulationchart-accumulationannotation content="<span style='font-size:16px; color:#333;'>Market Leader</span>">
</e-accumulationchart-accumulationannotation>
```

**Image Annotation:**

```cshtml
<e-accumulationchart-accumulationannotation content="<img src='/images/trophy.png' width='50' height='50' alt='Award'/>">
</e-accumulationchart-accumulationannotation>
```

**Shape Annotation (using HTML/CSS):**

```cshtml
<e-accumulationchart-accumulationannotation content="<div style='width:0; height:0; border-left:15px solid transparent; border-right:15px solid transparent; border-bottom:25px solid #FF6347;'></div>">
</e-accumulationchart-accumulationannotation>
```

**Complex HTML Annotation:**

```cshtml
<e-accumulationchart-accumulationannotation content="<div style='background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:white; padding:15px; border-radius:10px; box-shadow:0 4px 6px rgba(0,0,0,0.1);'><div style='font-size:28px; font-weight:bold;'>$1.2M</div><div style='font-size:14px; opacity:0.9;'>Total Revenue</div></div>">
</e-accumulationchart-accumulationannotation>
```

## Export

Export charts as images or PDF for reports and sharing.

### Export to PNG

```cshtml
<button onclick="exportPNG()" class="btn btn-primary">Export as PNG</button>

<ejs-accumulationchart id="exportChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>
    function exportPNG() {
        var chart = document.getElementById('exportChart').ej2_instances[0];
        chart.export('PNG', 'chart');
    }
</script>
```

### Export to JPEG

```cshtml
<button onclick="exportJPEG()" class="btn btn-primary">Export as JPEG</button>

<script>
    function exportJPEG() {
        var chart = document.getElementById('exportChart').ej2_instances[0];
        chart.export('JPEG', 'chart');
    }
</script>
```

### Export to SVG

```cshtml
<button onclick="exportSVG()" class="btn btn-primary">Export as SVG</button>

<script>
    function exportSVG() {
        var chart = document.getElementById('exportChart').ej2_instances[0];
        chart.export('SVG', 'chart');
    }
</script>
```

### Export to PDF

```cshtml
<button onclick="exportPDF()" class="btn btn-primary">Export as PDF</button>

<script>
    function exportPDF() {
        var chart = document.getElementById('exportChart').ej2_instances[0];
        chart.export('PDF', 'chart');
    }
</script>
```

### Export Options

Customize export output:

```cshtml
<button onclick="exportWithOptions()" class="btn btn-primary">Export with Options</button>

<script>
    function exportWithOptions() {
        var chart = document.getElementById('exportChart').ej2_instances[0];
        
        var exportSettings = {
            type: 'PNG',
            fileName: 'sales-report-2024',
            orientation: 'Landscape',  // For PDF
            width: 1920,               // Custom width
            height: 1080               // Custom height
        };
        
        chart.export(exportSettings.type, exportSettings.fileName);
    }
</script>
```

**Export All Formats with One Click:**

```cshtml
<button onclick="exportAll()" class="btn btn-success">Export All Formats</button>

<script>
    function exportAll() {
        var chart = document.getElementById('exportChart').ej2_instances[0];
        var fileName = 'chart-' + Date.now();
        
        chart.export('PNG', fileName);
        setTimeout(() => chart.export('JPEG', fileName), 500);
        setTimeout(() => chart.export('SVG', fileName), 1000);
        setTimeout(() => chart.export('PDF', fileName), 1500);
    }
</script>
```

## Print

Print charts directly from the browser:

```cshtml
<button onclick="printChart()" class="btn btn-info">
    <i class="fa fa-print"></i> Print Chart
</button>

<ejs-accumulationchart id="printChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>
    function printChart() {
        var chart = document.getElementById('printChart').ej2_instances[0];
        chart.print();
    }
</script>
```

**Print with Custom Settings:**

```cshtml
<script>
    function printWithSettings() {
        var chart = document.getElementById('printChart').ej2_instances[0];
        
        // Apply print-specific styling before printing
        chart.beforePrint = function(args) {
            args.htmlContent.querySelector('.e-accumulationchart').style.border = '2px solid #000';
        };
        
        chart.print();
    }
</script>
```

**Keyboard Shortcut for Print:**

```cshtml
<ejs-accumulationchart id="keyboardPrint">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>
    // Ctrl+P to print chart
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            var chart = document.getElementById('keyboardPrint').ej2_instances[0];
            if (chart) {
                chart.print();
            }
        }
    });
</script>
```

## EJ1 to EJ2 Migration

Guidance for migrating from Essential JS 1 (EJ1) to Essential JS 2 (EJ2).

### Key API Changes

| EJ1 Property | EJ2 Property | Notes |
|-------------|--------------|-------|
| `e-series` | `e-accumulation-series-collection` | Tag helper name changed |
| Not applicable | `dataSource` | Direct data binding instead of points |
| `e-legend` | `e-accumulationchart-legendsettings` | Nested in settings object |
| `title.text` | `title` | Direct property instead of nested |
| `size.height` | `height` | Simplified property |
| `size.width` | `width` | Simplified property |
| `e-annotations` | `e-accumulationchart-accumulationannotations` | Tag name changed |
| `e-data-label` | `e-accumulationseries-datalabel` | Tag name changed |

### EJ1 Code Example

```cshtml
<!-- EJ1 (Legacy) -->
@(Html.EJ().Chart("chart")
    .Series(sr =>
    {
        sr.Points(pt =>
        {
            pt.X("Chrome").Y(65.3).Add();
            pt.X("Safari").Y(18.2).Add();
        }).Type(SeriesType.Pie).LabelPosition(AccumulationLabelPosition.Outside).Add();
    })
    .Legend(lg => lg.Visible(true))
    .Title(tt => tt.Text("Browser Statistics"))
)
```

### EJ2 Code Example

```cshtml
<!-- EJ2 (Modern) -->
@{
    List<BrowserData> data = new List<BrowserData>
    {
        new BrowserData { Browser = "Chrome", Share = 65.3 },
        new BrowserData { Browser = "Safari", Share = 18.2 }
    };
}

<ejs-accumulationchart id="chart" title="Browser Statistics">
    <e-accumulationchart-legendsettings visible="true">
    </e-accumulationchart-legendsettings>
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@data" 
                              xName="Browser" 
                              yName="Share"
                              type="Pie">
            <e-accumulationseries-datalabel visible="true" position="Outside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Migration Benefits

**Performance:**
- Faster rendering with optimized SVG
- Better memory management
- Improved animation performance

**Features:**
- More chart types (3D support coming)
- Enhanced accessibility (WCAG 2.2)
- Better touch support for mobile
- Improved theming options

**Development Experience:**
- Simplified API surface
- Better TypeScript support
- Comprehensive documentation
- Active community support

### Common Migration Issues

**Issue 1: Data Binding**

```csharp
// EJ1: Used Point objects
Series.Points.Add(new Point { X = "Chrome", Y = 65.3 });

// EJ2: Use direct data binding
List<Data> chartData = new List<Data> { new Data { Category = "Chrome", Value = 65.3 } };
```

**Issue 2: Event Names**

```javascript
// EJ1
load: function(args) { }

// EJ2
load="onLoad"   // In tag helper
function onLoad(args) { }
```

**Issue 3: Series Configuration**

```cshtml
<!-- EJ1 -->
<e-series type="Pie" label-position="Outside">

<!-- EJ2 -->
<e-accumulation-series type="Pie">
    <e-accumulationseries-datalabel position="Outside">
    </e-accumulationseries-datalabel>
</e-accumulation-series>
```

## Performance Optimization

### Reduce Data Points

```cshtml
<!-- Use grouping to limit visible points -->
<e-accumulation-series dataSource="@largeDataSet" 
                      xName="Category" 
                      yName="Value"
                      groupTo="10"
                      groupMode="Point">
</e-accumulation-series>
```

### Disable Animations for Large Datasets

```cshtml
<ejs-accumulationchart id="optimizedChart" enableAnimation="false">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@largeDataSet" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Optimize Data Queries

```csharp
// Efficient: Select only needed data
public List<ChartData> GetChartData()
{
    return _context.Sales
        .GroupBy(s => s.Category)
        .Select(g => new ChartData 
        { 
            Category = g.Key, 
            Value = g.Sum(s => s.Amount) 
        })
        .OrderByDescending(x => x.Value)
        .Take(10)  // Limit to top 10
        .ToList();
}

// Inefficient: Load all data then filter
public List<ChartData> GetChartDataSlow()
{
    var allSales = _context.Sales.ToList();  // Loads everything
    return allSales
        .GroupBy(s => s.Category)
        .Select(g => new ChartData { Category = g.Key, Value = g.Sum(s => s.Amount) })
        .ToList();
}
```

### Enable Smart Labels Selectively

```cshtml
<!-- Only enable for charts with many small slices -->
<ejs-accumulationchart id="smartChart" enableSmartLabels="@(chartData.Count > 8)">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true" position="Outside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Debounce Dynamic Updates

```javascript
let updateTimeout;

function updateChartData(newData) {
    clearTimeout(updateTimeout);
    
    updateTimeout = setTimeout(function() {
        var chart = document.getElementById('chart').ej2_instances[0];
        chart.series[0].dataSource = newData;
        chart.refresh();
    }, 300);  // Wait 300ms before updating
}
```

### Cache Data Client-Side

```javascript
var cachedData = null;
var cacheExpiry = null;

function getChartData() {
    var now = Date.now();
    
    // Return cached data if still valid
    if (cachedData && cacheExpiry && now < cacheExpiry) {
        return Promise.resolve(cachedData);
    }
    
    // Fetch fresh data
    return fetch('/api/chart/data')
        .then(response => response.json())
        .then(data => {
            cachedData = data;
            cacheExpiry = now + (5 * 60 * 1000);  // Cache for 5 minutes
            return data;
        });
}
```

## Complete Advanced Example

```cshtml
@{
    List<AdvancedData> data = new List<AdvancedData>
    {
        new AdvancedData { Category = "Product A", Value = 45, Color = "#4285F4" },
        new AdvancedData { Category = "Product B", Value = 28, Color = "#34A853" },
        new AdvancedData { Category = "Product C", Value = 18, Color = "#FBBC04" },
        new AdvancedData { Category = "Product D", Value = 9, Color = "#EA4335" }
    };
}

<div class="card">
    <div class="card-header">
        <h4>Sales Distribution Q4 2024</h4>
        <div class="btn-group">
            <button onclick="exportPNG()" class="btn btn-sm btn-primary">PNG</button>
            <button onclick="exportPDF()" class="btn btn-sm btn-success">PDF</button>
            <button onclick="printChart()" class="btn btn-sm btn-info">Print</button>
        </div>
    </div>
    <div class="card-body">
        <ejs-accumulationchart id="advancedChart" 
                              title="Product Revenue Distribution"
                              enableAnimation="true"
                              enableSmartLabels="true">
            
            <!-- Annotations -->
            <e-accumulationchart-accumulationannotations>
                <e-accumulationchart-accumulationannotation content="<div style='font-size:28px; font-weight:bold; color:#666;'>$1.2M<br/><span style='font-size:14px; color:#999;'>Total Revenue</span></div>"
                                              region="Series"
                                              x="50%"
                                              y="50%"
                                              horizontalAlignment="Center"
                                              verticalAlignment="Middle">
                </e-accumulationchart-accumulationannotation>
            </e-accumulationchart-accumulationannotations>
            
            <!-- Legend -->
            <e-accumulationchart-legendsettings visible="true" position="Right">
            </e-accumulationchart-legendsettings>
            
            <!-- Tooltip -->
            <e-accumulationchart-tooltipsettings enable="true" format="${point.x}: ${point.y}%">
            </e-accumulationchart-tooltipsettings>
            
            <!-- Series -->
            <e-accumulation-series-collection>
                <e-accumulation-series dataSource="@data" 
                                      xName="Category" 
                                      yName="Value"
                                      pointColorMapping="Color"
                                      type="Pie"
                                      innerRadius="55%"
                                      explode="true"
                                      explodeOffset="10%">
                    <e-accumulationseries-datalabel visible="true" position="Outside">
                    </e-accumulationseries-datalabel>
                    <e-accumulationseries-border color="#ffffff" width="3">
                    </e-accumulationseries-border>
                </e-accumulation-series>
            </e-accumulation-series-collection>
        </ejs-accumulationchart>
    </div>
</div>

<script>
    function exportPNG() {
        document.getElementById('advancedChart').ej2_instances[0].export('PNG', 'sales-distribution');
    }
    
    function exportPDF() {
        document.getElementById('advancedChart').ej2_instances[0].export('PDF', 'sales-distribution');
    }
    
    function printChart() {
        document.getElementById('advancedChart').ej2_instances[0].print();
    }
</script>
```

```csharp
public class AdvancedData
{
    public string Category { get; set; }
    public double Value { get; set; }
    public string Color { get; set; }
}
```

This creates a production-ready chart with annotations, export capabilities, and optimized performance.
