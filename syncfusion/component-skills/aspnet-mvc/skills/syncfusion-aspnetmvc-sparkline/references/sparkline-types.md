# Sparkline Types Configuration

## Table of Contents
- [Overview](#overview)
- [Line Type](#line-type)
  - [When to Use Line Type](#when-to-use-line-type)
  - [Basic Implementation of Line Type](#basic-implementation-of-line-type)
  - [Line Type Characteristics](#line-type-characteristics)
- [Column Type](#column-type)
  - [When to Use Column Type](#when-to-use-column-type)
  - [Basic Implementation of Column Type](#basic-implementation-of-column-type)
  - [Column Type Characteristics](#column-type-characteristics)
- [Area Type](#area-type)
  - [When to Use Area Type](#when-to-use-area-type)
  - [Basic Implementation of Area Type](#basic-implementation-of-area-type)
  - [Area Type Characteristics](#area-type-characteristics)
- [Pie Type](#pie-type)
  - [When to Use Pie Type](#when-to-use-pie-type)
  - [Basic Implementation of Pie Type](#basic-implementation-of-pie-type)
  - [Pie Type Characteristics](#pie-type-characteristics)
- [Win-Loss Type](#win-loss-type)
  - [When to Use Win-Loss Type](#when-to-use)
  - [Basic Implementation of Win-Loss Type](#basic-implementation)
  - [Win-Loss Type Characteristics](#win-loss-type-characteristics)
- [Choosing the Right Type](#choosing-the-right-type)
  - [Decision Matrix](#decision-matrix)
  - [Implementation Strategy](#implementation-strategy)
  - [Tips for Better Results](#tips-for-better-results)

## Overview

The Sparkline component supports five different visualization types, each suited to different data scenarios. The type property determines how your data is rendered. Each type presents data in a unique way to highlight different patterns and relationships.

All sparkline types are rendered in a compact format without axes or labels, making them ideal for embedding in dashboards, tables, or reports.

## Line Type

The Line type displays data points connected by a continuous line, making it perfect for showing trends and variations over time.

### When to Use Line Type
- Time-series data (stock prices, temperature trends)
- Continuous data with regular intervals
- Identifying upward/downward trends
- Performance metrics over periods

### Basic Implementation of Line Type

```csharp
// Controller
public class TrendData
{
    public int Month { get; set; }
    public double Revenue { get; set; }
}

public static List<TrendData> GetLineData()
{
    List<TrendData> data = new List<TrendData>
    {
        new TrendData { Month = 1, Revenue = 2000 },
        new TrendData { Month = 2, Revenue = 2500 },
        new TrendData { Month = 3, Revenue = 2100 },
        new TrendData { Month = 4, Revenue = 3200 },
        new TrendData { Month = 5, Revenue = 2800 },
        new TrendData { Month = 6, Revenue = 3500 }
    };
    return data;
}
```

```cshtml
<!-- View -->
@Html.EJS().Sparkline("lineChart")
    .XName("Month")
    .YName("Revenue")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Line Type Characteristics
- **Visual**: Connected points forming a continuous line
- **Best For**: Trends, progressions, continuous data
- **Data Density**: Handles dense data well
- **Readability**: Clear visualization of rise and fall patterns

## Column Type

The Column type displays data as vertical bars, making it ideal for comparing individual values or categories side-by-side.

### When to Use Column Type
- Comparing discrete values
- Categorical data comparison
- Sales by category
- Performance across departments
- Year-over-year comparisons

### Basic Implementation of Column Type

```csharp
// Controller
public class CategoryData
{
    public string Category { get; set; }
    public int Sales { get; set; }
}

public static List<CategoryData> GetColumnData()
{
    List<CategoryData> data = new List<CategoryData>
    {
        new CategoryData { Category = "Q1", Sales = 50000 },
        new CategoryData { Category = "Q2", Sales = 65000 },
        new CategoryData { Category = "Q3", Sales = 58000 },
        new CategoryData { Category = "Q4", Sales = 72000 }
    };
    return data;
}
```

```cshtml
<!-- View -->
@Html.EJS().Sparkline("columnChart")
    .XName("Category")
    .YName("Sales")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Column Type Characteristics
- **Visual**: Vertical bars for each data point
- **Best For**: Comparisons, discrete values, categories
- **Data Density**: Works best with fewer data points
- **Readability**: Easy to compare bar heights

## Area Type

The Area type displays data as a filled region between the line and axis, emphasizing magnitude and cumulative values over time.

### When to Use Area Type
- Cumulative data visualization
- Area of influence or coverage
- Stacked metrics
- Website traffic trends
- Population growth
- Stock price movements with emphasis on magnitude

### Basic Implementation of Area Type

```csharp
// Controller
public class AreaData
{
    public int Week { get; set; }
    public int Users { get; set; }
}

public static List<AreaData> GetAreaData()
{
    List<AreaData> data = new List<AreaData>
    {
        new AreaData { Week = 1, Users = 1000 },
        new AreaData { Week = 2, Users = 1500 },
        new AreaData { Week = 3, Users = 1200 },
        new AreaData { Week = 4, Users = 1800 },
        new AreaData { Week = 5, Users = 2100 }
    };
    return data;
}
```

```cshtml
<!-- View -->
@Html.EJS().Sparkline("areaChart")
    .XName("Week")
    .YName("Users")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Area Type Characteristics
- **Visual**: Filled region under a line
- **Best For**: Cumulative values, magnitude emphasis
- **Data Density**: Good for moderate data points
- **Readability**: Strong visual emphasis on total values

## Pie Type

The Pie type displays data as a circular segmented chart, showing proportions and percentages of a whole.

### When to Use Pie Type
- Composition and part-to-whole relationships
- Budget allocation
- Market share analysis
- Survey responses distribution
- Resource allocation percentages

### Basic Implementation of Pie Type

```csharp
// Controller
public class CompositionData
{
    public string Segment { get; set; }
    public int Value { get; set; }
}

public static List<CompositionData> GetPieData()
{
    List<CompositionData> data = new List<CompositionData>
    {
        new CompositionData { Segment = "Chrome", Value = 45 },
        new CompositionData { Segment = "Firefox", Value = 25 },
        new CompositionData { Segment = "Safari", Value = 20 },
        new CompositionData { Segment = "Edge", Value = 10 }
    };
    return data;
}
```

```cshtml
<!-- View -->
@Html.EJS().Sparkline("pieChart")
    .XName("Segment")
    .YName("Value")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Pie)
    .Height("100")
    .Width("100")
    .DataSource(Model)
    .Render()
```

### Pie Type Characteristics
- **Visual**: Circular segments proportional to values
- **Best For**: Percentages, composition, parts of whole
- **Data Density**: Works best with 3-7 segments
- **Readability**: Quick visual understanding of proportions
- **Note**: Pie sparklines are typically square (equal width/height for proper appearance)

## Win-Loss Type

The Win-Loss type displays data as binary outcomes, showing wins (positive values) and losses (negative values) or successes and failures.

### When to Use Win-Loss Type
- Win/loss records in sports
- Pass/fail test results
- Profit/loss by period
- Success/failure metrics
- Binary outcome tracking
- Streak analysis

### Basic Implementation of Win-Loss Type

```csharp
// Controller
public class WinLossData
{
    public int Game { get; set; }
    public int Result { get; set; }  // 1 for win, -1 for loss, 0 for tie
}

public static List<WinLossData> GetWinLossData()
{
    List<WinLossData> data = new List<WinLossData>
    {
        new WinLossData { Game = 1, Result = 1 },    // Win
        new WinLossData { Game = 2, Result = 1 },    // Win
        new WinLossData { Game = 3, Result = -1 },   // Loss
        new WinLossData { Game = 4, Result = 1 },    // Win
        new WinLossData { Game = 5, Result = -1 },   // Loss
        new WinLossData { Game = 6, Result = 1 },    // Win
        new WinLossData { Game = 7, Result = 0 }     // Tie
    };
    return data;
}
```

```cshtml
<!-- View -->
@Html.EJS().Sparkline("winlossChart")
    .XName("Game")
    .YName("Result")
    .Type(Syncfusion.EJ2.Charts.SparklineType.WinLoss)
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Win-Loss Type Characteristics
- **Visual**: Positive columns (wins), negative columns (losses), or gaps (ties)
- **Best For**: Binary outcomes, streaks, performance metrics
- **Data Values**: Positive = win, Negative = loss, Zero = tie/neutral
- **Readability**: Instantly shows win/loss patterns and streaks

## Choosing the Right Type

### Decision Matrix

| Use Case | Recommended Type | Why |
|----------|-----------------|-----|
| Stock price trend | Line or Area | Shows progression and magnitude over time |
| Sales comparison | Column | Easy to compare bar heights |
| Budget allocation | Pie | Shows percentage composition |
| Website traffic | Area | Emphasizes cumulative growth |
| Performance record | Win-Loss | Clear win/loss visualization |
| Temperature variation | Line | Shows trend patterns |
| Market share | Pie | Visual proportion representation |
| Success rate | Win-Loss | Binary outcome tracking |
| Revenue trend | Area | Cumulative focus with trend |
| Category metrics | Column | Direct value comparison |

### Implementation Strategy

1. **Identify Your Data Type**: Is it continuous (time-series), categorical, compositional, or binary?
2. **Consider Your Audience**: What pattern should they recognize quickly?
3. **Evaluate Data Density**: How many data points will you display?
4. **Assess Available Space**: Some types work better in compact spaces
5. **Test Visual Clarity**: Ensure the chosen type clearly communicates your message

### Tips for Better Results

- Use consistent colors across multiple sparklines for easier comparison
- Pair sparklines with actual numeric values when precision matters
- Group sparklines by type when displaying multiple metrics
- Consider responsive sizing for mobile displays
- Test your data ranges to ensure visibility (avoid charts with nearly identical values)
