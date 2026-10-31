# Customization & Appearance

## Table of Contents
- [Chart Title](#chart-title)
    - [Basic Title](#basic-title)
    - [Title Styling](#title-styling)
    - [Title Wrapping](#title-wrapping)
    - [Title API Properties](#title-api-properties)
- [Background & Border](#background--border)
    - [Chart Background](#chart-background)
    - [Chart Border](#chart-border)
    - [Border Properties](#border-properties)
- [Chart Area](#chart-area)
    - [ChartArea Properties](#chartarea-properties)
- [Margins](#margins)
    - [Margin Properties](#margin-properties)
- [Themes](#themes)
    - [Available Themes](#available-themes)
    - [Apply Theme](#apply-theme)
    - [Theme Effect](#theme-effect)
    - [Example: Dark Theme](#example-dark-theme)
- [Chart Dimensions](#chart-dimensions)
    - [Width and Height](#width-and-height)
    - [Responsive Sizing](#responsive-sizing)
    - [Dimension API Properties](#dimension-api-properties)
- [Transposed Chart](#transposed-chart)
    - [Effect](#effect)
    - [Use case](#use-case)
- [Localization & RTL](#localization--rtl)
    - [Locale Setting](#locale-setting)
    - [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Axis Customization](#axis-customization)
    - [Axis Title](#axis-title)
    - [Axis Title Styling](#axis-title-styling)
    - [Axis Label Format](#axis-label-format)
    - [Axis Range](#axis-range)
    - [Axis Line Styling](#axis-line-styling)
    - [Grid Line Styling](#grid-line-styling)
- [Series Styling](#series-styling)
    - [Series Color](#series-color)
    - [Series Opacity](#series-opacity)
    - [Series Width](#series-width)
    - [Candle Styling](#candle-styling)
    - [Pattern Fill](#pattern-fill)
- [Gradients](#gradients)
    - [Linear Gradient](#linear-gradient)
    - [Radial Gradient](#radial-gradient)
- [Export & Print](#export--print)
    - [Export Chart](#export-chart)
    - [Export Formats](#export-formats)
    - [Export Example](#export-example)
    - [Print Chart](#print-chart)
    - [Print Settings](#print-settings)
    - [Complete Customization Example](#complete-customization-example)

## Chart Title

Add and customize the main chart title.

### Basic Title

```cshtml
<ejs-stockchart id="stockChart" title="Apple Inc. Stock Price">
</ejs-stockchart>
```

### Title Styling

Customize title appearance:

```cshtml
<ejs-stockchart id="stockChart" title="Apple Inc. Stock Price">
    <e-stockchart-titlestyle 
        color="#333333" 
        size="18px" 
        fontWeight="Bold"
        fontFamily="Arial"
        fontStyle="Normal">
    </e-stockchart-titlestyle>
</ejs-stockchart>
```

**Text Style Properties:**
- **color**: Title color (hex or named)
- **size**: Font size with unit (px, em, %)
- **fontWeight**: Normal, Bold, 100-900
- **fontFamily**: Font name
- **fontStyle**: Normal, Italic, Oblique
- **opacity**: 0.0 to 1.0
- **textAlignment**: Left, Center, Right

### Title Wrapping

Control text wrapping for long titles:

```cshtml
<ejs-stockchart id="stockChart" title="Stock Price Chart for Apple Inc. with Real-Time Data">
    <e-title-text-style 
        size="16px" 
        textOverflow="Wrap">
    </e-title-text-style>
</ejs-stockchart>
```

**Properties:**
- **textOverflow**: Wrap, Trim, None

### Title API Properties

**API Property:** `title`

**Type:** `string`

**Default:** `""` (empty string)

**Description:** Sets the title text displayed at the top of the chart.

**API Property:** `titleStyle`

**Type:** `StockChartTitleStyle`

**Default:** `null`

**Description:** Customizes the appearance of the chart title including font, color, and alignment.

## Background & Border

### Chart Background

**API Property:** `background`

**Type:** `string`

**Default:** `null` (transparent or theme-based)

**Description:** Sets the background color of the Stock Chart. Accepts hex, rgba, or named color values.

```cshtml
<ejs-stockchart id="stockChart" 
    background="#f5f5f5">
</ejs-stockchart>
```

With transparency:

```cshtml
<ejs-stockchart id="stockChart" 
    background="rgba(245, 245, 245, 0.5)">
</ejs-stockchart>
```

### Chart Border

**API Property:** `border`

**Type:** `StockChartChartBorder`

**Default:** `null`

**Description:** Configures the border color and width of the Stock Chart.

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-border 
        color="#0066cc" 
        width="2">
    </e-stockchart-border>
</ejs-stockchart>
```

**Border Properties:**
- `color`: Border color (hex or named color)
- `width`: Border thickness in pixels

## Chart Area

**API Property:** `chartArea`

**Type:** `StockChartChartArea`

**Default:** `null`

**Description:** Configures the border and background of the chart plotting area (excludes title, legend, axes labels).

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-chartarea 
        background="white"
        opacity="1.0">
        <e-stockchartarea-border 
            color="#cccccc" 
            width="1">
        </e-stockchartarea-border>
    </e-stockchart-chartarea>
</ejs-stockchart>
```

**ChartArea Properties:**
- `background`: Background color of plotting area
- `opacity`: Background opacity (0.0 to 1.0)
- `border`: Border settings for plotting area

## Margins

**API Property:** `margin`

**Type:** `StockChartChartMargin`

**Default:** `null` (auto-calculated based on content)

**Description:** Customizes the space around the chart (left, right, top, bottom).

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-margin 
        left="40" 
        right="40" 
        top="20" 
        bottom="20">
    </e-stockchart-margin>
</ejs-stockchart>
```

**Margin Properties:**
- `left`: Left margin in pixels
- `right`: Right margin in pixels
- `top`: Top margin in pixels
- `bottom`: Bottom margin in pixels

**Use case:** Fine-tune spacing for embedding in specific layouts or adjusting for custom legends/titles.

## Themes

Change overall chart appearance with built-in themes.

### Available Themes

**Light Themes:**
- Material (default)
- Fabric
- Bootstrap
- HighContrastLight

**Dark Themes:**
- MaterialDark
- FabricDark
- BootstrapDark
- HighContrast

### Apply Theme

```cshtml
<ejs-stockchart id="stockChart" theme="Material">
</ejs-stockchart>
```

### Theme Effect

Themes automatically change:
- Background color
- Grid line colors
- Axis labels
- Data point colors
- Tooltip background
- Series colors

### Example: Dark Theme

```cshtml
<ejs-stockchart id="stockChart" theme="MaterialDark" title="Stock Price">
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

## Chart Dimensions

Control chart size and layout.

### Width and Height

```cshtml
<ejs-stockchart id="stockChart" 
    width="100%" 
    height="500">
</ejs-stockchart>
```

**Width/Height Format:**
- Pixel value: "800px" or "800"
- Percentage: "100%"
- Auto: "auto"

### Responsive Sizing

Make chart responsive to container:

```cshtml
<ejs-stockchart id="stockChart" 
    width="100%" 
    height="500">
</ejs-stockchart>
```

With CSS:

```css
#stockChart {
    width: 100%;
    max-width: 1200px;
    height: auto;
    min-height: 400px;
}

@media (max-width: 768px) {
    #stockChart {
        min-height: 300px;
    }
}
```

### Dimension API Properties

**API Property:** `width`

**Type:** `string`

**Default:** `null` (100% of container)

**Description:** Sets the width of the Stock Chart. Accepts pixel values ("800px"), percentages ("100%"), or "auto".

**API Property:** `height`

**Type:** `string`

**Default:** `null` (450px default)

**Description:** Sets the height of the Stock Chart. Accepts pixel values or percentages.

## Transposed Chart

**API Property:** `isTransposed`

**Type:** `bool`

**Default:** `false`

**Description:** Renders the Stock Chart in transposed manner (swaps X and Y axes).

```cshtml
<ejs-stockchart id="stockChart" isTransposed="true">
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

**Effect:**
- X-axis becomes vertical
- Y-axis becomes horizontal
- Data renders rotated 90 degrees

**Use case:** Alternative view for comparing multiple stocks or for specific dashboard layouts.

## Localization & RTL

### Locale Setting

**API Property:** `locale`

**Type:** `string`

**Default:** `""` (uses global 'en-US')

**Description:** Overrides the global culture and localization value for the Stock Chart.

```cshtml
<ejs-stockchart id="stockChart" locale="de-DE">
</ejs-stockchart>
```

Requires loading locale files:

```html
<script src="https://cdn.syncfusion.com/ej2/locale/de.js"></script>
```

### Right-to-Left (RTL) Support

**API Property:** `enableRtl`

**Type:** `bool`

**Default:** `false`

**Description:** Enables right-to-left rendering for the Stock Chart.

```cshtml
<ejs-stockchart id="stockChart" enableRtl="true">
</ejs-stockchart>
```

**Effect:**
- Legend renders right-to-left
- Axis labels align for RTL
- Tooltips position for RTL layout

**Use case:** Arabic, Hebrew, or other RTL language support.

## Axis Customization

### Axis Title

Add titles to axes:

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-primaryxaxis 
        title="Date" 
        valueType="DateTime">
    </e-stockchart-primaryxaxis>    
    <e-stockchart-primaryyaxis title="Price (USD)">
    </e-stockchart-primaryyaxis>
</ejs-stockchart>
```

### Axis Title Styling

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-primaryyaxis title="Price (USD)">        
        <e-titlestyle 
            color="#0066cc" 
            size="14px" 
            fontWeight="Bold">
        </e-titlestyle>
</e-stockchart-primaryyaxis>
</ejs-stockchart>
```

### Axis Label Format

Format axis values:

```cshtml
<ejs-stockchart id="stockChart">
    <!-- Date format for X-axis -->
    <e-stockchart-primaryxaxis 
    valueType="DateTime"
    labelFormat="MMM d, yyyy">
</e-stockchart-primaryxaxis>
    <!-- Fixed point with 2 decimals for Y-axis -->
<e-stockchart-primaryyaxis labelFormat="N2">
</e-stockchart-primaryyaxis>
</ejs-stockchart>
```

### Axis Range

Define minimum and maximum axis values:

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-primaryyaxis 
        minimum="100" 
        maximum="200" 
        interval="10">
    </e-stockchart-primaryyaxis>
</ejs-stockchart>
```

### Axis Line Styling

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-primaryyaxis>
        <e-linestyle color="red" width="2">
        </e-linestyle>
    </e-stockchart-primaryyaxis>
</ejs-stockchart>
```

### Grid Line Styling

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-primaryyaxis>
        <e-majorgridlines color="lightgray" width="1" dashArray="5,5">
        </e-majorgridlines>
    </e-stockchart-primaryyaxis>
</ejs-stockchart>
```

## Series Styling

### Series Color

```cshtml
@{
    var stockData = new List<object>
    {
        new {
            x = new DateTime(2023, 1, 1),
            close = 152.00
        },
        new {
            x = new DateTime(2023, 1, 2),
            close = 156.50
        },
        new {
            x = new DateTime(2023, 1, 3),
            close = 154.00
        }
    }; 
 }
 <ejs-stockchart id="stockChart">
     <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             yName="close"
                             type="Line"
                             fill="steelblue">
        </e-stockchart-series>
     </e-stockchart-series-collection>   
</ejs-stockchart>
```

### Series Opacity

```cshtml
<ejs-stockchart id="stockChart">
     <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             yName="close"
                             type="Line"
                             opacity="0.7"
                             fill="steelblue">
        </e-stockchart-series>
     </e-stockchart-series-collection>   
</ejs-stockchart>
```

### Series Width

For line series:

```cshtml
<ejs-stockchart id="stockChart">
     <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             yName="close"
                             type="Line"
                             width=3>
        </e-stockchart-series>
     </e-stockchart-series-collection>   
</ejs-stockchart>
```

### Candle Styling

```cshtml
@{
    var stockData = new List<object>
    {
        new {
            x = new DateTime(2023, 1, 1),
            open = 150.00,
            high = 155.50,
            low = 148.75,
            close = 152.00,
            volume = 1000000
        },
        new {
            x = new DateTime(2023, 1, 2),
            open = 152.00,
            high = 158.00,
            low = 151.50,
            close = 156.50,
            volume = 1200000
        },
        new {
            x = new DateTime(2023, 1, 3),
            open = 156.50,
            high = 160.00,
            low = 150.00,
            close = 154.00,
            volume = 900000
        }
    };
}
 <ejs-stockchart id="stockChart">
     <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             yName="close"
                             type="Candle" 
                             bullFillColor="orange" 
                             bearFillColor="blue">
        </e-stockchart-series>
     </e-stockchart-series-collection>   
</ejs-stockchart>
```

### Pattern Fill

Add patterns for accessibility:

```cshtml
@{
    var stockData = new List<object>
    {
        new {
            x = new DateTime(2023, 1, 1),
            close = 152.00
        },
        new {
            x = new DateTime(2023, 1, 2),
            close = 156.50
        },
        new {
            x = new DateTime(2023, 1, 3),
            close = 154.00
        }
    };
}
 <ejs-stockchart id="stockChart">
     <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             yName="close"
                             type="Area" 
                             fill="url(#diagonalHatch)"
                             opacity="1.0">
        </e-stockchart-series>
     </e-stockchart-series-collection>   
</ejs-stockchart>
<svg width="0" height="0">
    <defs>
        <pattern id="diagonalHatch"
                 patternUnits="userSpaceOnUse"
                 width="8"
                 height="8">
            <path d="M0 8 L8 0"
                  stroke="#4F46E5"
                  stroke-width="2" />
        </pattern>
    </defs>
</svg>
```

## Gradients

Apply gradient fills for visual enhancement.

### Linear Gradient

```cshtml
@{
    var stockData = new List<object>
    {
        new {
            x = new DateTime(2023, 1, 1),
            close = 152.00
        },
        new {
            x = new DateTime(2023, 1, 2),
            close = 156.50
        },
        new {
            x = new DateTime(2023, 1, 3),
            close = 154.00
        }
    };
}
 <ejs-stockchart id="stockChart">
     <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             yName="close"
                             type="Area" 
                             fill="url(#myGradient)"
                             opacity="1.0">
        </e-stockchart-series>
     </e-stockchart-series-collection>   
</ejs-stockchart>
<svg width="0" height="0">
    <defs>
        <linearGradient id="myGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
        </linearGradient>
    </defs>
</svg>
```

### Radial Gradient

```cshtml
@{
    var stockData = new List<object>
    {
        new {
            x = new DateTime(2023, 1, 1),
            close = 152.00
        },
        new {
            x = new DateTime(2023, 1, 2),
            close = 156.50
        },
        new {
            x = new DateTime(2023, 1, 3),
            close = 154.00
        }
    };
}
 <ejs-stockchart id="stockChart">
     <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             yName="close"
                             type="Area" 
                             fill="url(#radialGradient)"
                             opacity="1.0">
        </e-stockchart-series>
     </e-stockchart-series-collection>   
</ejs-stockchart>
<svg width="0" height="0">
    <defs>
        <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
        </radialGradient>
    </defs>
</svg>
```

## Export & Print

### Export Chart

The rendered stock chart can be exported to JPEG, PNG, SVG, or PDF format using the export dropdown button in the period selector toolbar. You can choose the required format using the export dropdown button in stock-chart.

```cshtml
<ejs-stockchart id="stockChart">
</ejs-stockchart>
```

### Export Formats

- **PNG**: Raster image format
- **JPEG**: Compressed raster image
- **SVG**: Vector format
- **PDF**: Portable document format
- **XLSX**: Excel spreadsheet format
- **CSV**: Text‑based data format

### Print Chart

The rendered stock chart can be printed directly using print button in period selector toolbar.

```cshtml
<ejs-stockchart id="stockChart">
</ejs-stockchart>
```

## Complete Customization Example

```cshtml
@{
    var stockData = new List<object>
    {
        new {
            x = new DateTime(2023, 1, 1),
            open = 150.00,
            high = 155.50,
            low = 148.75,
            close = 152.00,
            volume = 1000000
        },
        new {
            x = new DateTime(2023, 1, 2),
            open = 152.00,
            high = 158.00,
            low = 151.50,
            close = 156.50,
            volume = 1200000
        },
        new {
            x = new DateTime(2023, 1, 3),
            open = 156.50,
            high = 160.00,
            low = 150.00,
            close = 154.00,
            volume = 900000
        }
    };
}
<ejs-stockchart id="stockChart" 
    title="Apple Inc. - Stock Performance" 
    theme="MaterialDark"
    width="100%"
    height="600">
    
    <!-- Title styling -->
    <e-stockchart-titlestyle 
        color="white" 
        size="20px" 
        fontWeight="Bold"
        fontFamily="Segoe UI">
    </e-stockchart-titlestyle>
    
    <!-- X-axis configuration -->
    <e-stockchart-primaryxaxis 
        title="Date" 
        valueType="DateTime"
        labelFormat="MMM d, yyyy">
        <e-titlestyle color="white" size="14px">
        </e-titlestyle>
    </e-stockchart-primaryxaxis>
    
    <!-- Y-axis configuration -->
    <e-stockchart-primaryyaxis 
        title="Price (USD)"
        labelFormat="N2"
        minimum="100"
        maximum="200">
        <e-titlestyle color="white" size="14px">
        </e-titlestyle>
    </e-stockchart-primaryyaxis>
    
    <!-- Legend -->
    <e-stockchart-legendsettings 
        visible="true" 
        position="Bottom">
    </e-stockchart-legendsettings>
    
    <!-- Series styling -->
    <e-stockchart-series-collection>
        <e-stockchart-series 
            name="AAPL"
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle"
            bullFillColor="orange"
            bearFillColor="blue"
            opacity="0.8">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

This creates a professional, customized stock chart with dark theme, proper formatting, and export capabilities.
