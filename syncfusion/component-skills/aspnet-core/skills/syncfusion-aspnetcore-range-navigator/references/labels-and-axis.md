# Labels, Grid Lines, and Axis Configuration

## Table of Contents

- [Multi-level Labels](#multi-level-labels)
  - [Enabling Multi-level Labels](#enabling-multi-level-labels)
- [Label Grouping](#label-grouping)
  - [Month Grouping](#month-grouping)
  - [Year Grouping](#year-grouping)
  - [Supported GroupBy Values](#supported-groupby-values)
- [Label Positioning](#label-positioning)
  - [Outside Labels (Default)](#outside-labels-default)
  - [Inside Labels](#inside-labels)
- [Label Formatting](#label-formatting)
  - [DateTime Label Format](#datetime-label-format)
  - [Numeric Label Format](#numeric-label-format)
- [Smart Label Handling](#smart-label-handling)
  - [Hide Overlapping Labels](#hide-overlapping-labels)
- [Grid Line Customization](#grid-line-customization)
  - [Grid Line Styling](#grid-line-styling)
- [Tick Line Customization](#tick-line-customization)
  - [Tick Line Styling](#tick-line-styling)
  - [Positioning Ticks](#positioning-ticks)
- [Complete Example](#complete-example)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Financial Time Series with Year/Month Labels](#pattern-1-financial-time-series-with-yearmonth-labels)
  - [Pattern 2: Daily Data with Dense Labels](#pattern-2-daily-data-with-dense-labels)
  - [Pattern 3: Numeric Scale with Currency](#pattern-3-numeric-scale-with-currency)
  - [Pattern 4: Clean Minimal Design](#pattern-4-clean-minimal-design)

## Multi-level Labels

Multi-level labels display two rows of labels on the axis. This is useful for hierarchical data like Year/Month or Quarter/Month.

### Enabling Multi-level Labels

Set `enableGrouping="true"` on the RangeNavigator:

```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    valueType="DateTime" 
    enableGrouping="true">
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

**Result:**
```
┌─────────────────────────────────────────┐
│          2024                           │  ← Primary level (Year)
│  Jan  Feb  Mar  Apr  May  Jun  Jul  Aug │  ← Secondary level (Month)
└─────────────────────────────────────────┘
```

**Note:** Multi-level labels only work with DateTime valueType.

## Label Grouping

Control how labels are grouped using the `groupBy` property. This determines the primary level label interval.

### Month Grouping

```cshtml
<ejs-rangenavigator valueType="DateTime" 
    enableGrouping="true" groupBy="Months">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

**Result:**
```
2024 Q1  │ 2024 Q2  │ 2024 Q3  │ 2024 Q4
─────────┼──────────┼──────────┼─────────
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
```

### Year Grouping

```cshtml
<ejs-rangenavigator valueType="DateTime" 
    enableGrouping="true" groupBy="Years">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

**Result:**
```
2022  │  2023  │  2024  │  2025
──────┼────────┼────────┼──────
Jan Jul Jan Jul Jan Jul Jan Jul
```

### Supported GroupBy Values

```
Auto       - Automatic grouping based on interval
Years      - Group by year
Quarter    - Group by quarter (3 months)
Months     - Group by month
Weeks      - Group by week
Days       - Group by day
Hours      - Group by hour
Minutes    - Group by minute
```

## Label Positioning

Control where labels appear relative to the axis line.

### Outside Labels (Default)

```cshtml
<ejs-rangenavigator valueType="DateTime" 
    labelPosition="Outside">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

**Result:**
```
─────────────────────────────────────
Jan   Feb   Mar   Apr   May   Jun     ← Labels outside (below)
```

### Inside Labels

```cshtml
<ejs-rangenavigator valueType="DateTime" 
    labelPosition="Inside">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

**Result:**
```
────Jan──Feb──Mar──Apr──May──Jun────  ← Labels inside
─────────────────────────────────────
```

## Label Formatting

Format labels to display in specific date/number formats.

### DateTime Label Format
```csharp
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    public List<RangeData> Data { get; set; }
    
    public void OnGet()
    {
        // Example: Generate 1 year of daily data from 2005-01-01
        Data = GetDateTimeData(new DateTime(2005, 1, 1), new DateTime(2006, 1, 1), 10, 100);
    }
    
    // Equivalent to your TypeScript GetDateTimeData function
    public List<RangeData> GetDateTimeData(DateTime start, DateTime end, double min, double max)
    {
        List<RangeData> series = new List<RangeData>();
        Random rand = new Random();
        DateTime current = start;

        while (current <= end)
        {
            // getRandomInt logic
            double value = rand.Next((int)min, (int)max + 1);
            
            series.Add(new RangeData { 
                x = current, 
                y = value 
            });

            // Increment by 1 day
            current = current.AddDays(1);
        }
        return series;
    }

    // Static data method for fallback
    public List<RangeData> GetChartData()
    {
        return new List<RangeData>
        {
            new RangeData { x = new DateTime(2005, 1, 1), y = 20 },
            new RangeData { x = new DateTime(2006, 1, 26), y = 87 }
        };
    }
}

public class RangeData
{
    public DateTime x { get; set; }
    public double y { get; set; }
}
```
```cshtml
<ejs-rangenavigator id="rangeNavigator" 
                    valueType="DateTime" 
                    intervalType="Months" 
                    labelFormat="yy"
                    value="@(new object[] { new DateTime(2018, 6, 1), new DateTime(2018, 7, 1) })">
        <e-rangenavigator-labelstyle color="red" size="10px"></e-rangenavigator-labelstyle>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            dataSource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

**Common date formats:**
- `EEEE` - Full day name (Monday, Tuesday, etc.)
- `yMd` - Date format (04/10/2024)
- `MMM` - Short month name (Jan, Feb, Mar, etc.)
- `MMMM` - Full month name (January, February, etc.)
- `hm` - Time format (12:00 AM)
- `hms` - Time with seconds (12:00:00 AM)
- `MMM dd, yyyy` - Long format (Apr 10, 2024)
- `yyyy-MM-dd` - ISO format (2024-04-10)

**Result examples:**
```
Format: "MMM dd"
Output: Jan 01 | Jan 15 | Feb 01 | Feb 15 | Mar 01

Format: "yyyy-MM"
Output: 2024-01 | 2024-02 | 2024-03 | 2024-04

Format: "MMMM"
Output: January | February | March | April
```

### Numeric Label Format
```csharp
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;
public class IndexModel : PageModel
{
    public List<RangeData> Data { get; set; }
    
    public void OnGet() { Data = GetChartData(); }
    
    public List<RangeData> GetChartData()
    {
        return new List<RangeData>
        {
            new RangeData { x = 10.0, y = 31.8 },
            new RangeData { x = 20.0, y = 23.8 },
            new RangeData { x = 30.0, y = 41.8 },
            // ... add more points
            new RangeData { x = 100.0, y = 71.7 }
        };
    }
}

public class RangeData
{
    public double x { get; set; }
    public double y { get; set; }
}

```
```cshtml
<ejs-rangenavigator id="rangeNavigator" valueType="Double"     labelFormat="n1">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            dataSource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

**Numeric formats:**
- `n1` - Number with 1 decimal (1000.0)
- `n2` - Number with 2 decimals (1000.00)
- `p1` - Percentage 1 decimal (1.0%)
- `c1` - Currency (USD) 1 decimal ($1000.0)
- `{value}$` - Custom with suffix (1000$)
- `{value}K` - Thousands shorthand (10K)
- `{value}M` - Millions shorthand (1.5M)

## Smart Label Handling

The `labelIntersectAction` property prevents overlapping labels when space is tight.

### Hide Overlapping Labels

```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    labelIntersectAction="Hide"
    valueType="DateTime" 
    intervalType="Months" 
    labelFormat="dd MMMM-yy"
    value="@(new object[] { new DateTime(2018, 6, 1), new DateTime(2018, 7, 1) })">
        <e-rangenavigator-labelstyle color="red" size="10px"></e-rangenavigator-labelstyle>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            dataSource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>

```

**Result:**
```
Without Hide: Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
With Hide:    Jan     Mar     May     Jul     Sep     Nov    ← Only non-overlapping labels show
```

## Grid Line Customization

Customize the vertical grid lines that help read values from the chart.

### Grid Line Styling

```cshtml
<ejs-rangenavigator valueType="DateTime">
    <e-rangenavigator-majorgridlines 
        width="2" 
        color="#FF0000" 
        dashArray="4,5">
    </e-rangenavigator-majorgridlines>
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

**Properties:**
- `width="2"` - Line thickness in pixels
- `color="#FF0000"` - Line color (hex or named)
- `dashArray="4,5"` - Dashed pattern (solid: omit, dashed: "4,5")

**Result:**
```
│ ╱ ││ ╱ ││ ╱ ││ ╱ │  ← Dashed red grid lines
│/ ││/ ││/ ││/ │
```

## Tick Line Customization

Customize tick marks on the axis line (small lines at label positions).

### Tick Line Styling

```cshtml
<ejs-rangenavigator valueType="DateTime">
    <e-rangenavigator-majorticklines 
        width="2" 
        color="#0000FF">
    </e-rangenavigator-majorticklines>
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

**Properties:**
- `width="1"` - Tick line thickness
- `color="blue"` - Tick line color
- `dashArray="2,3"` - Dash pattern for ticks

**Result:**
```
────┬────┬────┬────┬────  ← Tick marks at labels
Jan  Feb  Mar  Apr  May
```

### Positioning Ticks

Ticks are drawn by default on the outside of the axis. Customize their appearance to match grid lines or labels.

## Complete Example

```csharp
// Code-behind (IndexModel.cs)
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    public List<RangeData> Data { get; set; }
    
    public void OnGet()
    {
        Data = GenerateData();
    }
    
    private List<RangeData> GenerateData()
    {
        var data = new List<RangeData>();
        for (int year = 2020; year <= 2024; year++)
        {
            for (int month = 1; month <= 12; month++)
            {
                data.Add(new RangeData
                {
                    x = new DateTime(year, month, 1),
                    y = 30 + (year % 2 * 20) + (month % 3 * 10)
                });
            }
        }
        return data;
    }
}


public class RangeData
{
    public DateTime x { get; set; }
    public double y { get; set; }
}


public class ChartData
{
    public DateTime Date { get; set; }
    public double Value { get; set; }
}
```

```cshtml
<div>
<ejs-rangenavigator id="rangeNavigator" 
                    valueType="DateTime" 
                    intervalType="Months" 
                    labelFormat="dd MMMM-yy"
                    value="@(new object[] { new DateTime(2018, 6, 1), new DateTime(2018, 7, 1) })">
        <e-rangenavigator-labelstyle color="red" size="10px"></e-rangenavigator-labelstyle>
        <e-rangenavigator-majorgridlines 
        width="2" 
        color="#FF0000" 
        dashArray="4,5">
        
    </e-rangenavigator-majorgridlines>
        <e-rangenavigator-majorticklines 
        width="2" 
        color="#0000FF">
    </e-rangenavigator-majorticklines><e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            dataSource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>

</div>

```

## Common Patterns

### Pattern 1: Financial Time Series with Year/Month Labels

```cshtml
<ejs-rangenavigator valueType="DateTime" 
    enableGrouping="true" 
    labelFormat="MMM">
    <e-rangenavigator-labelstyle groupBy="Years"></e-rangenavigator-labelstyle>
    <e-rangenavigator-majorgridlines width="1" color="#E0E0E0"></e-rangenavigator-majorgridlines>
</ejs-rangenavigator>
```

### Pattern 2: Daily Data with Dense Labels

```cshtml
<ejs-rangenavigator valueType="DateTime" 
    labelFormat="MM/dd" 
    labelIntersectAction="Hide" 
    interval="5" 
    intervalType="Days">
    <e-rangenavigator-majorgridlines width="1" color="#F0F0F0" dashArray="2,2"></e-rangenavigator-majorgridlines>
</ejs-rangenavigator>
```

### Pattern 3: Numeric Scale with Currency

```cshtml
<ejs-rangenavigator valueType="Double" id="rangeNavigator" 
    labelFormat="c0">
    <e-rangenavigator-majorgridlines width="1" color="#EEEEEE"></e-rangenavigator-majorgridlines>
    <e-rangenavigator-majorticklines width="1" color="#999999"></e-rangenavigator-majorticklines>
</ejs-rangenavigator>
```

### Pattern 4: Clean Minimal Design

```cshtml
<ejs-rangenavigator valueType="DateTime" 
    labelPosition="Inside" 
    labelIntersectAction="Hide">
    <e-rangenavigator-majorgridlines width="0.5" color="#F5F5F5"></e-rangenavigator-majorgridlines>
</ejs-rangenavigator>
```
