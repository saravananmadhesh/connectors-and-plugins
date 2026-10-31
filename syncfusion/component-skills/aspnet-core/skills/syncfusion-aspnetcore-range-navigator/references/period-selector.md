# Period Selector Configuration

## Table of Contents

- [What is Period Selector](#what-is-period-selector)
- [Table of Contents](#table-of-contents)
- [What is Period Selector](#what-is-period-selector)
- [Basic Configuration](#basic-configuration)
- [Pre-defined Periods](#pre-defined-periods)
  - [Standard Stock Chart Periods](#standard-stock-chart-periods)
  - [Custom Business Periods](#custom-business-periods)
  - [All Supported Interval Types](#all-supported-interval-types)
- [Positioning](#positioning)
  - [Top Position (Default)](#top-position-default)
  - [Bottom Position](#bottom-position)
- [Height Customization](#height-customization)
- [Visibility Control](#visibility-control)
  - [Hide Range Navigator, Show Only Period Selector](#hide-range-navigator-show-only-period-selector)
- [Complete Examples](#complete-examples)
  - [Example 1 Stock Chart with Standard Periods](#example-1-stock-chart-with-standard-periods)
  - [Example 2 Lightweight Period Selector Only](#example-2-lightweight-period-selector-only)
  - [Example 3 Custom Business Periods](#example-3-custom-business-periods)
- [Common Patterns](#common-patterns)
  - [Pattern 1 FinanceStock Dashboard](#pattern-1-financestock-dashboard)
  - [Pattern 2 Analytics Dashboard](#pattern-2-analytics-dashboard)
  - [Pattern 3 Mobile-Friendly](#pattern-3-mobile-friendly)

## What is Period Selector

The Period Selector is a row of quick-selection buttons that appear above or below the RangeNavigator. Users click these buttons to instantly select pre-defined time periods without manually dragging sliders.

```
┌──────────────────────────────────────────┐
│  [1D] [5D] [1M] [3M] [6M] [1Y]  ← Period Buttons
├──────────────────────────────────────────┤
│   /‾‾\                        /‾‾\      │
│  /    \ Area Chart with range/    \     │
│ /      \____________________/      \    │
│◄──────────────────────────────────────►  │ ← Range Slider
│  Jan   Feb   Mar   Apr   May   Jun      │
└──────────────────────────────────────────┘
```

## Basic Configuration

Enable the Period Selector using `periodselectorsettings`:

```cshtml
<ejs-rangenavigator id="rangeNavigator" valueType="DateTime">
    <!-- Period Selector Configuration -->
    <e-rangenavigator-periodselectorsettings>
        <e-periods>
            <e-period interval="1" intervalType="Days" text="1D"></e-period>
            <e-period interval="5" intervalType="Days" text="5D"></e-period>
            <e-period interval="1" intervalType="Months" text="1M"></e-period>
            <e-period interval="3" intervalType="Months" text="3M"></e-period>
            <e-period interval="6" intervalType="Months" text="6M"></e-period>
            <e-period interval="1" intervalType="Years" text="1Y"></e-period>
        </e-periods>
    </e-rangenavigator-periodselectorsettings>
    
    <!-- Series Configuration -->
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

Each `<e-period>` element defines:
- `interval` - Number of time units (e.g., 1, 5, 3)
- `intervalType` - Unit type (Days, Months, Years, etc.)
- `text` - Button label shown to user

## Pre-defined Periods

Commonly used period buttons for stock/financial data:

### Standard Stock Chart Periods

```cshtml
<e-rangenavigator-periodselectorsettings>
    <e-periods>
        <!-- Intraday -->
        <e-period interval="1" intervalType="Hours" text="1H"></e-period>
        <e-period interval="4" intervalType="Hours" text="4H"></e-period>
        
        <!-- Days -->
        <e-period interval="1" intervalType="Days" text="1D"></e-period>
        <e-period interval="5" intervalType="Days" text="5D"></e-period>
        
        <!-- Weeks/Months -->
        <e-period interval="1" intervalType="Weeks" text="1W"></e-period>
        <e-period interval="1" intervalType="Months" text="1M"></e-period>
        <e-period interval="3" intervalType="Months" text="3M"></e-period>
        <e-period interval="6" intervalType="Months" text="6M"></e-period>
        
        <!-- Years -->
        <e-period interval="1" intervalType="Years" text="1Y"></e-period>
        <e-period interval="5" intervalType="Years" text="5Y"></e-period>
    </e-periods>
</e-rangenavigator-periodselectorsettings>
```

### Custom Business Periods

```cshtml
<e-rangenavigator-periodselectorsettings>
    <e-periods>
        <!-- Quarterly reporting -->
        <e-period interval="1" intervalType="Months" text="MTD"></e-period>
        <e-period interval="1" intervalType="Quarter" text="QTD"></e-period>
        <e-period interval="1" intervalType="Years" text="YTD"></e-period>
        <e-period interval="2" intervalType="Years" text="2Y"></e-period>
    </e-periods>
</e-rangenavigator-periodselectorsettings>
```

### All Supported Interval Types

```
Auto        - Automatically determine interval
Years       - Yearly (1Y, 2Y, 5Y, 10Y)
Quarter     - Quarterly (Q1, Q2, Q3, Q4)
Months      - Monthly (1M, 3M, 6M, 12M)
Weeks       - Weekly (1W, 4W)
Days        - Daily (1D, 5D, 10D)
Hours       - Hourly (1H, 4H, 8H)
Minutes     - Minute intervals (15, 30, 60)
Seconds     - Second intervals (rarely used)
```

## Positioning

Control where the Period Selector appears relative to the RangeNavigator.

### Top Position (Default)

```cshtml
<e-rangenavigator-periodselectorsettings position="Top">
    <e-periods>
        <e-period interval="1" intervalType="Days" text="1D"></e-period>
        <e-period interval="1" intervalType="Months" text="1M"></e-period>
    </e-periods>
</e-rangenavigator-periodselectorsettings>
```

Result:
```
┌─────────────────────────────┐
│ [1D] [1M] ← Buttons on top  │
├─────────────────────────────┤
│   Chart with Range Slider   │
└─────────────────────────────┘
```

### Bottom Position

```cshtml
<e-rangenavigator-periodselectorsettings position="Bottom">
    <e-periods>
        <e-period interval="1" intervalType="Days" text="1D"></e-period>
        <e-period interval="1" intervalType="Months" text="1M"></e-period>
    </e-periods>
</e-rangenavigator-periodselectorsettings>
```

Result:
```
┌─────────────────────────────┐
│   Chart with Range Slider   │
├─────────────────────────────┤
│ [1D] [1M] ← Buttons below   │
└─────────────────────────────┘
```

**When to use:**
- `Top` - Most common, keeps focus on buttons
- `Bottom` - When you want chart to be the primary focus

## Height Customization

Set the height of the Period Selector row:

```cshtml
<e-rangenavigator-periodselectorsettings height="60">
    <e-periods>
        <e-period interval="1" intervalType="Days" text="1D"></e-period>
        <e-period interval="1" intervalType="Months" text="1M"></e-period>
    </e-periods>
</e-rangenavigator-periodselectorsettings>
```

**Default height:** 43px

**Common heights:**
- `43` - Default (compact)
- `50` - Comfortable touch targets
- `60` - Larger buttons for accessibility
- `80` - Extra large for mobile

The height adjusts button size and padding automatically.

## Visibility Control

### Hide Range Navigator, Show Only Period Selector

Use `disableRangeSelector` to display only period buttons without the range slider:

```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    valueType="DateTime" 
    disableRangeSelector="true">
    
    <e-rangenavigator-periodselectorsettings>
        <e-periods>
            <e-period interval="1" intervalType="Days" text="1D"></e-period>
            <e-period interval="5" intervalType="Days" text="5D"></e-period>
            <e-period interval="1" intervalType="Months" text="1M"></e-period>
            <e-period interval="3" intervalType="Months" text="3M"></e-period>
            <e-period interval="6" intervalType="Months" text="6M"></e-period>
            <e-period interval="1" intervalType="Years" text="1Y"></e-period>
        </e-periods>
    </e-rangenavigator-periodselectorsettings>
    
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

Result:
```
┌──────────────────────────────┐
│ [1D] [5D] [1M] [3M] [6M] [1Y]│ ← Only period buttons
├──────────────────────────────┤
│     Area Chart               │ ← No draggable range slider
└──────────────────────────────┘
```

**Use case:** Lightweight interface for mobile or when you only want preset ranges.

## Complete Examples

### Example 1: Stock Chart with Standard Periods

```csharp
// Code-behind (IndexModel.cs)
public class IndexModel : PageModel
{
    public List<StockData> StockData { get; set; }
    
    public void OnGet()
    {
        StockData = GenerateStockData();
    }
    
    private List<StockData> GenerateStockData()
    {
        var data = new List<StockData>();
        var random = new Random();
        var startDate = DateTime.Now.AddYears(-5);
        
        for (int i = 0; i < 365; i++)
        {
            data.Add(new StockData
            {
                Date = startDate.AddDays(i),
                Price = 100 + random.Next(-20, 50)
            });
        }
        return data;
    }
}

public class StockData
{
    public DateTime Date { get; set; }
    public double Price { get; set; }
}
```

```cshtml
<!-- Razor page (Index.cshtml) -->
<h4>Stock Price Range Selector</h4>

<ejs-rangenavigator id="stockChart" valueType="DateTime">
    <e-rangenavigator-periodselectorsettings position="Top">
        <e-periods>
            <e-period interval="1" intervalType="Days" text="1D"></e-period>
            <e-period interval="5" intervalType="Days" text="5D"></e-period>
            <e-period interval="1" intervalType="Months" text="1M"></e-period>
            <e-period interval="3" intervalType="Months" text="3M"></e-period>
            <e-period interval="6" intervalType="Months" text="6M"></e-period>
            <e-period interval="1" intervalType="Years" text="1Y"></e-period>
            <e-period interval="5" intervalType="Years" text="5Y"></e-period>
        </e-periods>
    </e-rangenavigator-periodselectorsettings>
    
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.StockData" 
            xName="Date" 
            yName="Price" 
            type="Line">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### Example 2: Lightweight Period Selector Only

```cshtml
<!-- Simple period buttons without draggable slider -->
<h4>Select Time Period</h4>
 
<ejs-rangenavigator id="lightweightRange" 
    valueType="DateTime"
    datasource="@Model.Data" 
    xName="x" 
    yName="y" 
    type="Area">
    <!-- Period Selector Configuration -->
<e-rangenavigator-periodselectorsettings position="Bottom">
    <e-periods>
        <e-period interval="1" intervalType="Days" text="Today"></e-period>
        <e-period interval="7" intervalType="Days" text="This Week"></e-period>
        <e-period interval="1" intervalType="Months" text="This Month"></e-period>
        <e-period interval="3" intervalType="Months" text="This Quarter"></e-period>
        <e-period interval="1" intervalType="Years" text="This Year"></e-period>
    </e-periods>
</e-rangenavigator-periodselectorsettings>
</ejs-rangenavigator>
```

### Example 3: Custom Business Periods

```cshtml
<!-- Quarterly business analysis -->
<h4>Sales Performance by Quarter</h4>

<ejs-rangenavigator id="quarterlyChart" valueType="DateTime">
    <e-rangenavigator-periodselectorsettings position="Bottom" height="55">
        <e-periods>
            <e-period interval="1" intervalType="Months" text="Monthly"></e-period>
            <e-period interval="1" intervalType="Quarter" text="Quarterly"></e-period>
            <e-period interval="1" intervalType="Years" text="Yearly"></e-period>
            <e-period interval="5" intervalType="Years" text="5 Years"></e-period>
        </e-periods>
    </e-rangenavigator-periodselectorsettings>
    
    <e-rangenavigator-tooltip enable="true"></e-rangenavigator-tooltip>
    
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.SalesData" 
            xName="Date" 
            yName="Sales" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

## Common Patterns

### Pattern 1: Finance/Stock Dashboard

```cshtml
<ejs-rangenavigator valueType="DateTime">
    <e-rangenavigator-periodselectorsettings position="Top">
        <e-periods>
            <e-period interval="1" intervalType="Days" text="1D"></e-period>
            <e-period interval="1" intervalType="Weeks" text="1W"></e-period>
            <e-period interval="1" intervalType="Months" text="1M"></e-period>
            <e-period interval="3" intervalType="Months" text="3M"></e-period>
            <e-period interval="6" intervalType="Months" text="6M"></e-period>
            <e-period interval="1" intervalType="Years" text="1Y"></e-period>
            <e-period interval="2" intervalType="Years" text="2Y"></e-period>
        </e-periods>
    </e-rangenavigator-periodselectorsettings>
</ejs-rangenavigator>
```

### Pattern 2: Analytics Dashboard

```cshtml
<ejs-rangenavigator valueType="DateTime">
    <e-rangenavigator-periodselectorsettings position="Top">
        <e-periods>
            <e-period interval="7" intervalType="Days" text="Last 7 Days"></e-period>
            <e-period interval="14" intervalType="Days" text="Last 14 Days"></e-period>
            <e-period interval="30" intervalType="Days" text="Last 30 Days"></e-period>
            <e-period interval="3" intervalType="Months" text="Last 3 Months"></e-period>
            <e-period interval="1" intervalType="Years" text="Last Year"></e-period>
        </e-periods>
    </e-rangenavigator-periodselectorsettings>
</ejs-rangenavigator>
```

### Pattern 3: Mobile-Friendly

```cshtml
<ejs-rangenavigator valueType="DateTime">
    <e-rangenavigator-periodselectorsettings position="Top" height="60">
        <e-periods>
            <e-period interval="1" intervalType="Days" text="Today"></e-period>
            <e-period interval="1" intervalType="Weeks" text="Week"></e-period>
            <e-period interval="1" intervalType="Months" text="Month"></e-period>
            <e-period interval="1" intervalType="Years" text="Year"></e-period>
        </e-periods>
    </e-rangenavigator-periodselectorsettings>
</ejs-rangenavigator>
```
