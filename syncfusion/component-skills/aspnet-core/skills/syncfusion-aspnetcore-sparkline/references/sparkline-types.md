# Sparkline Types & Configuration

## Table of Contents
- [Overview of Sparkline Types](#overview-of-sparkline-types)
- [Line Type](#line-type)
- [Column Type](#column-type)
- [Area Type](#area-type)
- [Win-Loss Type](#win-loss-type)
- [Pie Type](#pie-type)
- [Choosing the Right Type](#choosing-the-right-type)

## Overview of Sparkline Types

Sparkline supports five distinct chart types, each suited for different data visualization scenarios. The type property controls which visual representation is rendered.

Supported types:
- `Line` - Default; best for trend analysis
- `Column` - Best for comparing discrete values
- `Area` - Best for cumulative trends
- `WinLoss` - Best for binary outcomes
- `Pie` - Best for proportional distribution

## Line Type

The Line type displays data as connected points forming a trend line. Best for showing continuous data trends over time.

**Use when:**
- Visualizing temporal trends (stock prices, temperature)
- Comparing multiple series in limited space
- Showing smooth data progression
- Highlighting peaks and valleys in data

**Implementation:**

```cshtml
<ejs-sparkline id="lineSparkline" 
    type="Line"
    dataSource="ViewBag.DataPoints"
    xName="xval" 
    yName="yval"
    height="80">
</ejs-sparkline>
```

**C# Model:**
```csharp
public class DataSource
{
    public int x { get; set; }
    public string xval { get; set; }
    public double yval { get; set; }
    
    public static List<DataSource> GetLineData()
    {
        List<DataSource> data = new List<DataSource>();
        data.Add(new DataSource() { x = 0, xval = "2005", yval = 20090440 });
        data.Add(new DataSource() { x = 1, xval = "2006", yval = 20264080 });
        data.Add(new DataSource() { x = 2, xval = "2007", yval = 20434180 });
        data.Add(new DataSource() { x = 3, xval = "2008", yval = 21007310 });
        data.Add(new DataSource() { x = 4, xval = "2009", yval = 21262640 });
        return data;
    }
}
```

**Output:** A thin line connecting each data point, showing the trend direction and velocity.

## Column Type

The Column type displays data as vertical bars at each point. Best for comparing discrete, categorical values.

**Use when:**
- Comparing sales by month or region
- Showing monthly revenue or expense amounts
- Displaying performance metrics across categories
- Highlighting significant variations between periods

**Implementation:**

```cshtml
<ejs-sparkline id="columnSparkline" 
    type="Column"
    dataSource="ViewBag.DataPoints"
    xName="xval" 
    yName="yval"
    height="80">
</ejs-sparkline>
```

**C# Model:**
```csharp
public static List<DataSource> GetColumnData()
{
    List<DataSource> data = new List<DataSource>();
    data.Add(new DataSource() { x = 0, xval = "Q1", yval = 5000 });
    data.Add(new DataSource() { x = 1, xval = "Q2", yval = 7500 });
    data.Add(new DataSource() { x = 2, xval = "Q3", yval = 6200 });
    data.Add(new DataSource() { x = 3, xval = "Q4", yval = 9100 });
    return data;
}
```

**Output:** Vertical bars at each point proportional to the y-value, making individual values easily comparable at a glance.

## Area Type

The Area type fills the region under the trend line. Best for showing cumulative or aggregated data trends.

**Use when:**
- Visualizing cumulative totals (revenue over time)
- Showing portfolio value progression
- Displaying website traffic trends
- Emphasizing the magnitude of data changes

**Implementation:**

```cshtml
<ejs-sparkline id="areaSparkline" 
    type="Area"
    dataSource="ViewBag.DataPoints"
    xName="xval" 
    yName="yval"
    height="80">
</ejs-sparkline>
```

**C# Model:**
```csharp
public static List<DataSource> GetAreaData()
{
    List<DataSource> data = new List<DataSource>();
    data.Add(new DataSource() { x = 0, xval = "Jan", yval = 1000 });
    data.Add(new DataSource() { x = 1, xval = "Feb", yval = 2500 });
    data.Add(new DataSource() { x = 2, xval = "Mar", yval = 3200 });
    data.Add(new DataSource() { x = 3, xval = "Apr", yval = 4100 });
    return data;
}
```

**Output:** A filled area under the trend line, emphasizing both the trend and magnitude of data.

## Win-Loss Type

The Win-Loss type displays each data point as either tall (positive/win) or short (negative/loss) bar. Used for binary outcomes.

**Use when:**
- Showing project successes and failures
- Displaying test pass/fail results
- Visualizing game wins and losses
- Tracking boolean outcomes (completed/incomplete)

**Implementation:**

```cshtml
<ejs-sparkline id="winLossSparkline" 
    type="WinLoss"
    dataSource="ViewBag.DataPoints"
    xName="xval" 
    yName="yval"
    height="80">
</ejs-sparkline>
```

**C# Model:**
```csharp
public static List<DataSource> GetWinLossData()
{
    List<DataSource> data = new List<DataSource>();
    data.Add(new DataSource() { x = 0, xval = "Game1", yval = 1 });      // Win
    data.Add(new DataSource() { x = 1, xval = "Game2", yval = -1 });     // Loss
    data.Add(new DataSource() { x = 2, xval = "Game3", yval = 1 });      // Win
    data.Add(new DataSource() { x = 3, xval = "Game4", yval = 1 });      // Win
    data.Add(new DataSource() { x = 4, xval = "Game5", yval = -1 });     // Loss
    return data;
}
```

**Output:** Positive values show as tall bars (wins), negative values as short bars (losses). Perfect for quick win/loss ratio visualization.

## Pie Type

The Pie type displays data as a pie chart showing proportional distribution. Each point represents a slice.

**Use when:**
- Showing portfolio allocation percentages
- Visualizing market share distribution
- Displaying budget allocation across categories
- Showing component proportions in a total

**Implementation:**

```cshtml
<ejs-sparkline id="pieSparkline" 
    type="Pie"
    dataSource="ViewBag.DataPoints"
    xName="xval" 
    yName="yval"
    height="80">
</ejs-sparkline>
```

**C# Model:**
```csharp
public static List<DataSource> GetPieData()
{
    List<DataSource> data = new List<DataSource>();
    data.Add(new DataSource() { x = 0, xval = "Product A", yval = 35 });
    data.Add(new DataSource() { x = 1, xval = "Product B", yval = 28 });
    data.Add(new DataSource() { x = 2, xval = "Product C", yval = 22 });
    data.Add(new DataSource() { x = 3, xval = "Product D", yval = 15 });
    return data;
}
```

**Output:** Circular pie showing each point as a proportional slice. Best for dashboard summaries where space is limited.

## Choosing the Right Type

| Data Scenario | Recommended Type | Reason |
|---|---|---|
| Stock price over time | Line | Shows trend and velocity smoothly |
| Monthly sales comparison | Column | Easy comparison of discrete periods |
| Revenue accumulation | Area | Emphasizes growing total magnitude |
| Test results (pass/fail) | Win-Loss | Binary outcomes clear at a glance |
| Portfolio composition | Pie | Proportional distribution visible immediately |
| Temperature trend | Line | Continuous progression over time |
| Quarterly revenue | Column | Period-by-period comparison |
| Employee count growth | Area | Shows cumulative hiring trend |
| Project completion status | Win-Loss | Immediate pass/fail visualization |
| Market share | Pie | Relative size of each segment |

## Implementation Best Practices

1. **Set appropriate height:** Use `height="80"` to `height="100"` for readability
2. **Provide meaningful labels:** Use clear xval labels (dates, periods, names)
3. **Scale data appropriately:** Ensure yval range matches your use case
4. **Match type to data:** Choose the visualization that best represents your data's meaning
5. **Test with real data:** Verify the type works well with your actual dataset before deploying

**Example: Switching types with same data:**

```cshtml
<!-- Try different types with identical data -->
<ejs-sparkline id="sparkline1" type="Line" dataSource="ViewBag.Data" xName="xval" yName="yval"></ejs-sparkline>
<ejs-sparkline id="sparkline2" type="Column" dataSource="ViewBag.Data" xName="xval" yName="yval"></ejs-sparkline>
<ejs-sparkline id="sparkline3" type="Area" dataSource="ViewBag.Data" xName="xval" yName="yval"></ejs-sparkline>
```

Each type reveals different insights from the same dataset!
