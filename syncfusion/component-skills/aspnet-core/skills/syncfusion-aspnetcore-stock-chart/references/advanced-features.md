# Advanced Features

## Table of Contents
- [Trend Lines](#trend-lines)
    - [Supported Trend Line Types](#supported-trend-line-types)
    - [Linear Trend Line](#linear-trend-line)
    - [Exponential Trend Line](#exponential-trend-line)
    - [Logarithmic Trend Line](#logarithmic-trend-line)
    - [Polynomial Trend Line](#polynomial-trend-line)
    - [Power Trend Line](#power-trend-line)
    - [Moving Average Trend Line](#moving-average-trend-line)
    - [Multiple Trend Lines](#multiple-trend-lines)
- [Stock Events](#stock-events)
    - [Add Stock Events](#add-stock-events)
    - [Event Types](#event-types)
    - [Event Customization](#event-customization)
- [Annotations](#annotations)
    - [Add Text Annotation](#add-text-annotation)
    - [Annotation Properties](#annotation-properties)
    - [Image Annotation](#image-annotation)
    - [Shape Annotation](#shape-annotation)
    - [Coordinate Units](#coordinate-units)
    - [Multiple Annotations](#multiple-annotations)
- [Multiple Axes](#multiple-axes)
    - [Add Secondary Y-Axis](#add-secondary-y-axis)
    - [Axes API Properties](#axes-api-properties)
    - [Multiple X-Axes](#multiple-x-axes)
- [Multiple Rows](#multiple-rows)
    - [Create Multiple Rows](#create-multiple-rows)
    - [Row API Properties](#row-api-properties)
    - [Row Height Distribution](#row-height-distribution)
- [Range Selector](#range-selector)
    - [Enable Range Selector](#enable-range-selector)
    - [Period Definition](#period-definition)
    - [Custom Range Selection](#custom-range-selection)
- [Period Selector](#period-selector)
    - [Enable Period Selector](#enable-period-selector)
    - [Period Configuration](#period-configuration)
- [Accessibility Features](#accessibility-features)
    - [Keyboard Navigation](#keyboard-navigation)
    - [ARIA Support](#aria-support)
    - [High Contrast Mode](#high-contrast-mode)
    - [Color Accessibility](#color-accessibility)
    - [Text and Font Size](#text-and-font-size)
    - [Complete Accessible Configuration](#complete-accessible-configuration)

## Trend Lines

Trend lines show direction and speed of price movements, helping identify trading patterns.

### Supported Trend Line Types

Stock Chart supports 6 trend line types:

| Type | Use Case | Best For |
|------|----------|----------|
| Linear | Basic trend | Simple price direction |
| Exponential | Accelerating change | Rapid price movements |
| Logarithmic | Decelerating change | Slowing trends |
| Polynomial | Complex patterns | Fitting curved trends |
| Power | Rate-based growth | Proportional changes |
| Moving Average | Smoothed trends | Noise reduction |

### Linear Trend Line

Simplest trend line showing best-fit straight line:

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle">
            <e-stockseries-stockcharttrendlines>
                <e-trendline 
                    type="Linear" 
                    fill="red" 
                    width="2">
                </e-trendline>
            </e-stockseries-stockcharttrendlines>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Exponential Trend Line

Curved line for accelerating changes:

```cshtml
<e-trendline 
    type="Exponential" 
    fill="blue" 
    width="2">
</e-trendline>
```

**Limitation:** Cannot be used with zero or negative values

### Logarithmic Trend Line

Curved line for decreasing rate of change:

```cshtml
<e-trendline 
    type="Logarithmic" 
    fill="green" 
    width="2">
</e-trendline>
```

### Polynomial Trend Line

Flexible curved line for complex patterns:

```cshtml
<e-trendline 
    type="Polynomial" 
    polynomialOrder="3" 
    fill="purple" 
    width="2">
</e-trendline>
```

**polynomialOrder**: Degree of polynomial (2-5). Higher values fit data more closely but may overfit.

### Power Trend Line

Best fit for data with specific growth rate:

```cshtml
<e-trendline 
    type="Power" 
    fill="orange" 
    width="2">
</e-trendline>
```

### Moving Average Trend Line

Smooths out price fluctuations:

```cshtml
<e-trendline 
    type="MovingAverage" 
    period="5" 
    fill="brown" 
    width="2">
</e-trendline>
```

**period**: Number of days for moving average calculation

### Multiple Trend Lines

Combine different trend lines for comprehensive analysis:

```cshtml
<e-stockchart-series 
    dataSource="stockData" 
    xName="x" 
    yName="close" 
    type="Candle">
    <e-stockseries-stockcharttrendlines>
        <e-trendline 
            type="Linear" 
            fill="red" 
            width="2">
        </e-trendline>        
        <e-trendline 
            type="MovingAverage" 
            period="20" 
            fill="blue" 
            width="2">
        </e-trendline>
    </e-stockseries-stockcharttrendlines>
</e-stockchart-series>
```

## Stock Events

Annotations on chart to mark important market events (earnings, dividends, stock splits, etc.).

### Add Stock Events

```cshtml
<ejs-stockchart id="stockChart">
    @{
        var stockEvents = new List<object>
        {
            new { x = new DateTime(2023, 2, 15), type = "Dividend", description = "Dividend Announcement" },
            new { x = new DateTime(2023, 3, 20), type = "Split", description = "Stock Split 2:1" },
            new { x = new DateTime(2023, 5, 10), type = "Flag", description = "Earnings Call" }
        };
    }
    
    <e-stockchart-stockevents>
        @foreach (var evt in stockEvents)
        {
            <e-stockchart-stockevent date="@((DateTime)evt.GetType().GetProperty("x").GetValue(evt, null))" 
                type="@((Syncfusion.EJ2.Charts.FlagType)evt.GetType().GetProperty("type").GetValue(evt, null))" 
                description="@((string)evt.GetType().GetProperty("description").GetValue(evt, null))">
            </e-stockchart-stockevent>
        }
    </e-stockchart-stockevents>
</ejs-stockchart>
```

### Event Types

- **Flag**: Default flag marker
- **Circle**: Circle marker
- **Square**: Square marker
- **Triangle**: Triangle marker
- **Diamond**: Diamond marker
- **Dividend**: Dividend marker
- **Split**: Stock split marker
- **ArrowUp**: Up arrow
- **ArrowDown**: Down arrow
- **ArrowRight**: Right arrow
- **ArrowLeft**: Left arrow

### Event Customization

```cshtml
 <e-stockchart-stockevent date="new DateTime(2023, 2, 15)"
                          type="Flag"
                          description="Dividend: $0.25"
                          background="red">
                          <e-textstyle color="white"></e-textstyle>
 </e-stockchart-stockevent>
```

**Use case:** Mark significant market events for trader reference

## Annotations

Annotations allow adding custom notes, shapes, or images to specific chart locations.

### Add Text Annotation

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-annotations>
        <e-stockchart-annotation 
            content="<div style='background:lightblue;padding:5px;'>Buy Signal</div>"
            x="2023-03-15"
            y="150"
            coordinateUnits="Point"
            region="Series">
        </e-stockchart-annotation>
    </e-stockchart-annotations>
</ejs-stockchart>
```

### Annotation Properties

**API Properties:**
- `content`: HTML content for the annotation (string)
- `x`: X-axis position (date or numeric value)
- `y`: Y-axis position (price value)
- `coordinateUnits`: Coordinate system (Point, Pixel)
- `region`: Placement region (Series, Chart)
- `xAxisName`: Target X-axis name for multi-axis charts
- `yAxisName`: Target Y-axis name for multi-axis charts
- `horizontalAlignment`: Near, Far, Center
- `verticalAlignment`: Top, Bottom, Middle

### Image Annotation

```cshtml
<e-stockchart-annotation 
    content="<img src='logo.png' width='50' height='50' />"
    x="2023-05-01"
    y="175"
    coordinateUnits="Point"
    region="Series">
</e-stockchart-annotation>
```

### Shape Annotation

```cshtml
<e-stockchart-annotation 
    content="<div style='width:100px;height:50px;background:red;opacity:0.5;'></div>"
    x="2023-04-01"
    y="160"
    coordinateUnits="Point"
    region="Series">
</e-stockchart-annotation>
```

### Coordinate Units

**Point:** Position based on data point coordinates (date and price)
**Pixel:** Position based on pixel coordinates from chart origin

### Multiple Annotations

```cshtml
<e-stockchart-annotations>
    <e-stockchart-annotation 
        content="<div>Support Level</div>"
        x="2023-01-01"
        y="140"
        coordinateUnits="Point"
        horizontalAlignment="Center">
    </e-stockchart-annotation>
    
    <e-stockchart-annotation 
        content="<div>Resistance Level</div>"
        x="2023-01-01"
        y="180"
        coordinateUnits="Point"
        horizontalAlignment="Center">
    </e-stockchart-annotation>
</e-stockchart-annotations>
```

## Multiple Axes

Add secondary axes for displaying multiple series with different scales.

### Add Secondary Y-Axis

```cshtml
<ejs-stockchart id="stockChart">
    <!-- Primary Y-axis for price -->
    <e-stockchart-primaryyaxis 
        title="Price (USD)"
        name="primaryYAxis">
    </e-stockchart-primaryyaxis>
    
    <!-- Secondary axes collection -->
    <e-stockchart-axes>
        <e-stockchart-axis 
            name="volumeAxis"
            title="Volume"
            opposedPosition="true"
            minimum="0">
        </e-stockchart-axis>
    </e-stockchart-axes>
    
    <!-- Series bound to different axes -->
    <e-stockchart-series-collection>
        <e-stockchart-series 
            name="Price"
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle"
            yAxisName="primaryYAxis">
        </e-stockchart-series>
        
        <e-stockchart-series 
            name="Volume"
            dataSource="stockData" 
            xName="x" 
            yName="volume" 
            type="Column"
            yAxisName="volumeAxis">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Axes API Properties

**Type:** `List<StockChartStockChartAxis>`

**Default:** `null`

**Key Properties:**
- `name`: Axis identifier
- `title`: Axis title text
- `opposedPosition`: Position axis on opposite side (default: false)
- `minimum`: Minimum axis value
- `maximum`: Maximum axis value
- `interval`: Label interval
- `labelFormat`: Format string for labels
- `visible`: Show/hide axis

### Multiple X-Axes

```cshtml
<e-stockchart-axes>
    <e-stockchart-axis 
        name="secondaryXAxis"
        title="Quarter"
        opposedPosition="true">
    </e-stockchart-axis>
</e-stockchart-axes>
```

## Multiple Rows

Split chart vertically into multiple plotting areas.

### Create Multiple Rows

```cshtml
<ejs-stockchart id="stockChart">
    <!-- Define rows -->
    <e-stockchart-rows>
        <e-stockchart-row height="70%"></e-stockchart-row>
        <e-stockchart-row height="30%"></e-stockchart-row>
    </e-stockchart-rows>
    
    <!-- Axes for each row -->
    <e-stockchart-axes>
        <e-stockchart-axis 
            name="yAxis1"
            rowIndex="0"
            title="Price">
        </e-stockchart-axis>
        
        <e-stockchart-axis 
            name="yAxis2"
            rowIndex="1"
            title="Volume"
            opposedPosition="true">
        </e-stockchart-axis>
    </e-stockchart-axes>
    
    <!-- Series in different rows -->
    <e-stockchart-series-collection>
        <e-stockchart-series 
            name="Price"
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle"
            yAxisName="yAxis1">
        </e-stockchart-series>
        
        <e-stockchart-series 
            name="Volume"
            dataSource="stockData" 
            xName="x" 
            yName="volume" 
            type="Column"
            yAxisName="yAxis2">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Row API Properties

**Type:** `List<StockChartStockChartRow>`

**Default:** `null`

**Key Properties:**
- `height`: Row height (percentage or pixel value)
- `border`: Row border settings

**Use case:** Separate price and volume charts, or display multiple indicators in dedicated areas

### Row Height Distribution

```cshtml
<e-stockchart-rows>
    <e-stockchart-row height="60%"></e-stockchart-row>  <!-- Main price chart -->
    <e-stockchart-row height="20%"></e-stockchart-row>  <!-- Volume -->
    <e-stockchart-row height="20%"></e-stockchart-row>  <!-- RSI indicator -->
</e-stockchart-rows>
```

## Range Selector

Allows users to select specific time ranges to filter chart data.

### Enable Range Selector

```cshtml
<ejs-stockchart id="stockChart" enableSelector="true">
    <e-stockchart-stockchartperiods>
        <e-stockchart-stockchartperiod interval="1" intervalType="Years" text="1Y"></e-stockchart-stockchartperiod>
        <e-stockchart-stockchartperiod interval="6" intervalType="Months" text="6M"></e-stockchart-stockchartperiod>
        <e-stockchart-stockchartperiod interval="3" intervalType="Months" text="3M"></e-stockchart-stockchartperiod>
        <e-stockchart-stockchartperiod interval="1" intervalType="Months" text="1M"></e-stockchart-stockchartperiod>
    </e-stockchart-stockchartperiods>
</ejs-stockchart>
```

### Period Definition

Each period includes:
- **type**: Date unit (Years, Months, Weeks, Days, Hours, Minutes, Seconds)
- **count**: Number of units
- **intervalType**: Display interval
- **label**: Button text shown to user

### Custom Range Selection

Users can also select custom date ranges through the range selector interface.

**Use case:** Allow quick filtering to common timeframes (1M, 3M, 6M, 1Y)

## Period Selector

Allows users to switch between different time intervals (Daily, Weekly, Monthly).

### Enable Period Selector

```cshtml
<ejs-stockchart id="stockChart" enablePeriodSelector="true">  
    <e-stockchart-stockchartperiods>
        <e-stockchart-stockchartperiod intervalType="Minutes" interval="15" text="15m"></e-stockchart-stockchartperiod>
        <e-stockchart-stockchartperiod intervalType="Hours" interval="1" text="1h"></e-stockchart-stockchartperiod>
        <e-stockchart-stockchartperiod intervalType="Days" interval="1" text="1d"></e-stockchart-stockchartperiod>
        <e-stockchart-stockchartperiod intervalType="Weeks" interval="1" text="1w"></e-stockchart-stockchartperiod>
        <e-stockchart-stockchartperiod intervalType="Months" interval="1" text="1mo"></e-stockchart-stockchartperiod>
    </e-stockchart-stockchartperiods>
</ejs-stockchart>
```

### Period Configuration

- **intervalType**: Data aggregation interval (Minutes, Hours, Days, Weeks, Months, Years)
- **interval**: Number of intervals
- **label**: Display text

**Use case:** Allow switching between intraday (minutes/hours) and longer timeframes (days/months)

## Accessibility Features

### Keyboard Navigation

Enable keyboard access to chart interactions:

```cshtml
<ejs-stockchart id="stockChart">
    <!-- Chart configuration -->
</ejs-stockchart>
```

**Keyboard Shortcuts:**
- Arrow Keys: Navigate through data points
- Enter: Select data point
- Escape: Deselect current selection
- Tab: Move focus between elements

### ARIA Support

Proper ARIA labels and roles for screen reader compatibility:

```cshtml
<ejs-stockchart id="stockChart">
   <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### High Contrast Mode

Support for high contrast themes:

```cshtml
<ejs-stockchart id="stockChart" theme="HighContrast">
</ejs-stockchart>
```

Available themes: Material, Fabric, Bootstrap, HighContrastLight, MaterialDark, FabricDark, BootstrapDark, HighContrast

### Color Accessibility

Avoid color-only differentiation. Use patterns or styles:

```cshtml
<e-stockchart-series 
    type="Line" 
    fill="red" 
    width="3"
    dashArray="5,5">  <!-- Add pattern for color-blind users -->
</e-stockchart-series>
```

### Text and Font Size

Ensure readable text sizes:

```cshtml
<e-stockchart-tooltipsettings>
    <e-stocktooltipsettings-textstyle size="16px">  <!-- Minimum readable size -->
    </e-stocktooltipsettings-textstyle>
</e-stockchart-tooltipsettings>
```

### Complete Accessible Configuration

```cshtml
<ejs-stockchart id="stockChart"
    theme="HighContrast">    
    <e-stockchart-tooltipsettings enable="true">
        <e-stocktooltipsettings-textstyle size="16px" fontFamily="Arial">
        </e-stocktooltipsettings-textstyle>
    </e-stockchart-tooltipsettings>    
    <e-stockchart-series-collection>
        <e-stockchart-series 
            name="AAPL"
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Benefits:**
- Screen reader compatible
- Keyboard navigable
- High contrast visual
- Readable font sizes
- Pattern support for color-blind users

**Accessibility Standards:** Follows WCAG 2.1 Level AA guidelines
