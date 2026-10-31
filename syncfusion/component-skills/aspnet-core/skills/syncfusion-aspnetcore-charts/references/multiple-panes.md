# Multiple Panes

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Basic Multiple Panes](#basic-multiple-panes)
- [Pane Configuration](#pane-configuration)
  - [Define Rows](#define-rows)
  - [Define Columns](#define-columns)
- [Axis Association](#axis-association)
  - [Associate Axis with Pane](#associate-axis-with-pane)
- [Synchronized Axes](#synchronized-axes)
- [Common Use Cases](#common-use-cases)
  - [Stock Chart with Volume](#stock-chart-with-volume)
  - [Multiple Metrics Dashboard](#multiple-metrics-dashboard)
- [Pane Customization](#pane-customization)
  - [Borders](#borders)
  - [Background](#background)

Create charts with multiple plotting areas for comparing related datasets on different scales.

## Basic Multiple Panes

```cshtml
<ejs-chart id="chart" title="Stock Analysis">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    
    <!-- Define rows (panes) -->
    <e-chart-rows>
        <e-chart-row height="60%"></e-chart-row>
        <e-chart-row height="40%"></e-chart-row>
    </e-chart-rows>
    
    <!-- Define axes for each pane -->
    <e-chart-axes>
        <e-chart-axis name="VolumeAxis" 
                     rowIndex="1" 
                     opposedPosition="true">
        </e-chart-axis>
    </e-chart-axes>
    
    <!-- Assign series to panes -->
    <e-series-collection>
        <e-series dataSource="@ViewBag.PriceData" 
                  xName="Date" yName="Close" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Candle"
                  name="Price">
        </e-series>
        <e-series dataSource="@ViewBag.VolumeData" 
                  xName="Date" yName="Volume" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  yAxisName="VolumeAxis"
                  name="Volume">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Pane Configuration

### Define Rows

```cshtml
<e-chart-rows>
    <e-chart-row height="50%"></e-chart-row>
    <e-chart-row height="30%"></e-chart-row>
    <e-chart-row height="20%"></e-chart-row>
</e-chart-rows>
```

**Height options:** Percentage (%), Pixels (px)

### Define Columns

```cshtml
<e-chart-columns>
    <e-chart-column width="50%"></e-chart-column>
    <e-chart-column width="50%"></e-chart-column>
</e-chart-columns>
```

## Axis Association

### Associate Axis with Pane

```cshtml
<e-chart-axes>
    <e-chart-axis name="SecondaryY" 
                 rowIndex="1"
                 opposedPosition="true">
    </e-chart-axis>
</e-chart-axes>

<e-series yAxisName="SecondaryY"></e-series>
```

**rowIndex:** Zero-based pane index  
**columnIndex:** For column-based panes

## Synchronized Axes

Axes automatically synchronize across panes when using same x-axis.

```cshtml
<e-chart-primaryxaxis>
    <e-axis-line width="0"></e-axis-line>
    <e-axis-majorgridlines width="0"></e-axis-majorgridlines>
</e-chart-primaryxaxis>
```

## Common Use Cases

### Stock Chart with Volume

```cshtml
<ejs-chart id="stockChart">
    <e-chart-rows>
        <e-chart-row height="70%"></e-chart-row>
        <e-chart-row height="30%"></e-chart-row>
    </e-chart-rows>
    
    <e-chart-axes>
        <e-chart-axis name="VolumeAxis" rowIndex="1"></e-chart-axis>
    </e-chart-axes>
    
    <e-series-collection>
        <e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Candle"
                  xName="Date" 
                  open="Open" high="High" low="Low" close="Close">
        </e-series>
        <e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  xName="Date" yName="Volume" 
                  yAxisName="VolumeAxis">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Multiple Metrics Dashboard

```cshtml
<ejs-chart id="dashboard">
    <e-chart-rows>
        <e-chart-row height="33.3%"></e-chart-row>
        <e-chart-row height="33.3%"></e-chart-row>
        <e-chart-row height="33.3%"></e-chart-row>
    </e-chart-rows>
    
    <e-chart-axes>
        <e-chart-axis name="Axis1" rowIndex="0"></e-chart-axis>
        <e-chart-axis name="Axis2" rowIndex="1"></e-chart-axis>
        <e-chart-axis name="Axis3" rowIndex="2"></e-chart-axis>
    </e-chart-axes>
    
    <e-series-collection>
        <e-series yAxisName="Axis1" name="Revenue"></e-series>
        <e-series yAxisName="Axis2" name="Profit"></e-series>
        <e-series yAxisName="Axis3" name="Orders"></e-series>
    </e-series-collection>
</ejs-chart>
```

## Pane Customization

### Borders

```cshtml
<e-chart-row height="50%">
    <e-row-border width="2" color="#E0E0E0"></e-row-border>
</e-chart-row>
```

### Background

```cshtml
<e-chart-row height="50%" background="#F5F5F5">
</e-chart-row>
```

This enables sophisticated multi-pane chart layouts for comprehensive data analysis.
