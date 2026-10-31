# Titles, Subtitles, and Empty Points Handling

## Table of Contents
- [Chart Titles](#chart-titles)
  - [Basic Title](#basic-title)
  - [Title Visibility](#title-visibility)
  - [Title Position](#title-position)
- [Title Customization](#title-customization)
  - [Basic Title Styling](#basic-title-styling)
  - [Title Style Properties](#title-style-properties)
  - [Title Style Examples](#title-style-examples)
  - [Complete Title Example](#complete-title-example)
- [Subtitles](#subtitles)
  - [Basic Subtitle](#basic-subtitle)
  - [Subtitle Visibility](#subtitle-visibility)
  - [When to Use Subtitles](#when-to-use-subtitles)
- [Subtitle Customization](#subtitle-customization)
  - [Basic Subtitle Styling](#basic-subtitle-styling)
  - [Subtitle Style Properties](#subtitle-style-properties)
  - [Subtitle Style Examples](#subtitle-style-examples)
  - [Complete Title and Subtitle Example](#complete-title-and-subtitle-example)
- [Empty Points](#empty-points)
  - [Understanding Empty Points](#understanding-empty-points)
  - [Empty Point Modes](#empty-point-modes)
    - [Mode 1: Gap (Default)](#mode-1-gap-default)
    - [Mode 2: Average](#mode-2-average)
    - [Mode 3: Drop](#mode-3-drop)
    - [Mode 4: Zero](#mode-4-zero)
  - [Mode Comparison Table](#mode-comparison-table)
- [Empty Point Customization](#empty-point-customization)
  - [Basic Empty Point Customization](#basic-empty-point-customization)
  - [Custom Color for Empty Points](#custom-color-for-empty-points)
  - [Complete Example with Empty Points](#complete-example-with-empty-points)
  - [Data Preparation Best Practices](#data-preparation-best-practices)
- [Best Practices](#best-practices)


## Chart Titles

Add a title to your pie/donut chart using the `Title` property to display information about the plotted data.

### Basic Title

```cshtml
<ejs-circularchart3d id="container" title="Sales Distribution by Region" tilt="-45">
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Region" yName="Sales">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>
```

**Result:** "Sales Distribution by Region" appears as the chart title, typically centered above the chart.

### Title Visibility

Titles are visible by default. To hide a title, use an empty string:

```cshtml
<ejs-circularchart3d id="container" title="" tilt="-45">
</ejs-circularchart3d>
```

### Title Position

The chart title is displayed above the chart. You can customize its appearance using `TitleStyle`.

## Title Customization

Customize the appearance of the title using the `TitleStyle` property:

### Basic Title Styling

```cshtml
<ejs-circularchart3d id="container" title="Market Share Analysis" tilt="-45">
    <e-circularchart3d-titlestyle size="18px" color="#333333" fontWeight="bold" fontStyle="normal">
    </e-circularchart3d-titlestyle>
</ejs-circularchart3d>
```

### Title Style Properties

| Property | Values | Example |
|----------|--------|---------|
| `Size` | Font size | "18px", "20px" |
| `Color` | Color value | "#333333", "blue" |
| `FontWeight` | bold, normal | "bold" |
| `FontStyle` | italic, normal | "italic" |
| `FontFamily` | Font name | "Arial", "Times New Roman" |
| `TextAlignment` | center, left, right | "center" |
| `TextOverflow` | wrap, trim | "wrap" |
| `Opacity` | 0 to 1 | 0.8 |

### Title Style Examples

**Example 1: Bold red title**
```cshtml
<e-circularchart3d-titlestyle size="20px" color="red" fontWeight="bold">
</e-circularchart3d-titlestyle>
```

**Example 2: Italic centered title with custom font**
```cshtml
<e-circularchart3d-titlestyle size="16px" color="#2C3E50" fontFamily="Georgia" fontStyle="italic" textAlignment="center">
</e-circularchart3d-titlestyle>
```

**Example 3: Large semi-transparent title**
```cshtml
<e-circularchart3d-titlestyle size="24px" color="black" fontWeight="bold" opacity="0.7">
</e-circularchart3d-titlestyle>
```

### Complete Title Example

```cshtml
<ejs-circularchart3d id="container" title="Q4 2024 Revenue Distribution" tilt="-45">
    <e-circularchart3d-titlestyle size="18px" color="#1F77B4" fontWeight="bold" fontFamily="Arial">
    </e-circularchart3d-titlestyle>
    <e-circularchart3d-legendsettings visible="true">
    </e-circularchart3d-legendsettings>
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Region" yName="Revenue">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>
```

## Subtitles

Add a subtitle below the main title for additional context using the `SubTitle` property:

### Basic Subtitle

```cshtml
<ejs-circularchart3d id="container" title="Sales Distribution" subTitle="By Product Category" tilt="-45">
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Sales">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>
```

**Result:**
```
Sales Distribution
By Product Category
[Chart appears below]
```

### Subtitle Visibility

To hide the subtitle, use an empty string:

```cshtml
<ejs-circularchart3d id="container" subTitle="" tilt="-45">
</ejs-circularchart3d>
```

### When to Use Subtitles

- **Additional context:** "Overall Performance - Last Quarter"
- **Time period:** "Monthly Breakdown - January 2024"
- **Data source:** "Data from Annual Survey - 500 Respondents"
- **Geographic scope:** "Global Distribution - 50 Countries"

## Subtitle Customization

Customize subtitle appearance using the `SubTitleStyle` property:

### Basic Subtitle Styling

```cshtml
<ejs-circularchart3d id="container" title="Sales Distribution" subTitle="By Region and Product" tilt="-45">
    <e-circularchart3d-subtitlestyle size="14px" color="#666666" fontWeight="normal" fontStyle="italic">
    </e-circularchart3d-subtitlestyle>
</ejs-circularchart3d>
```

### Subtitle Style Properties

Same as title style:

| Property | Values | Example |
|----------|--------|---------|
| `Size` | Font size | "14px", "16px" |
| `Color` | Color value | "#666666", "gray" |
| `FontWeight` | bold, normal | "normal" |
| `FontStyle` | italic, normal | "italic" |
| `FontFamily` | Font name | "Arial", "Verdana" |
| `TextAlignment` | center, left, right | "center" |
| `TextOverflow` | wrap, trim | "wrap" |
| `Opacity` | 0 to 1 | 0.8 |

### Subtitle Style Examples

**Example 1: Gray italic subtitle**
```cshtml
<e-circularchart3d-subtitlestyle size="14px" color="#999999" fontStyle="italic">
</e-circularchart3d-subtitlestyle>
```

**Example 2: Bold descriptive subtitle**
```cshtml
<e-circularchart3d-subtitlestyle size="13px" color="#333333" fontWeight="bold">
</e-circularchart3d-subtitlestyle>
```

**Example 3: Semi-transparent smaller subtitle**
```cshtml
<e-circularchart3d-subtitlestyle size="12px" color="gray" fontStyle="italic" opacity="0.6">
</e-circularchart3d-subtitlestyle>
```

### Complete Title and Subtitle Example

```cshtml
<ejs-circularchart3d id="container" title="2024 Market Analysis" subTitle="Software Development Tools" tilt="-45">
    <e-circularchart3d-titlestyle size="20px" color="#1F77B4" fontWeight="bold">
    </e-circularchart3d-titlestyle>
    <e-circularchart3d-subtitlestyle size="14px" color="#666666" fontStyle="italic">
    </e-circularchart3d-subtitlestyle>
    <e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Right">
    </e-circularchart3d-legendsettings>
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Tool" yName="Usage">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>
```

## Empty Points

Data points containing `null` or `undefined` values are considered empty points. These are not plotted in the chart by default. Customize their handling using the `EmptyPointSettings` property in the series.

### Understanding Empty Points

**Data with empty values:**
```csharp
List<ChartData> data = new()
{
    new ChartData { Category = "Q1", Value = 35 },
    new ChartData { Category = "Q2", Value = null },    // Empty point
    new ChartData { Category = "Q3", Value = 42 },
    new ChartData { Category = "Q4", Value = null }     // Empty point
};
```

### Empty Point Modes

The `Mode` property defines how empty points are handled:

#### Mode 1: Gap (Default)
```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
    <e-circularchart3dseries-emptyPointSettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Gap">
    </e-circularchart3dseries-emptyPointSettings>
</e-circularchart3d-series>
```

**Behavior:** Empty points are skipped; not plotted at all.

#### Mode 2: Average
```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
    <e-circularchart3dseries-emptyPointSettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Average">
    </e-circularchart3dseries-emptyPointSettings>
</e-circularchart3d-series>
```

**Behavior:** Empty points are replaced with the average of surrounding points.

#### Mode 3: Drop
```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
    <e-circularchart3dseries-emptyPointSettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Drop">
    </e-circularchart3dseries-emptyPointSettings>
</e-circularchart3d-series>
```

**Behavior:** Empty points are replaced with zero value.

#### Mode 4: Zero
```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
    <e-circularchart3dseries-emptyPointSettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Zero">
    </e-circularchart3dseries-emptyPointSettings>
</e-circularchart3d-series>
```

**Behavior:** Empty points are treated as zero (same as Drop in pie charts).

### Mode Comparison Table

| Mode | Behavior | Use Case |
|------|----------|----------|
| Gap | Skip empty points | When data is sparse or missing data isn't significant |
| Average | Use average of neighbors | Interpolating missing values in trends |
| Drop | Treat as zero | When zero is a valid state |
| Zero | Same as Drop | Explicit zero handling |

## Empty Point Customization

Customize the appearance of empty points with specific styling:

### Basic Empty Point Customization

```cshtml
<e-circularchart3dseries-emptyPointSettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Gap" fill="#FF6B6B">
</e-circularchart3dseries-emptyPointSettings>
```

**Result:** If empty points are rendered, they appear in red (#FF6B6B).

### Custom Color for Empty Points

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
    <e-circularchart3dseries-emptyPointSettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Drop" fill="#E0E0E0">
    </e-circularchart3dseries-emptyPointSettings>
</e-circularchart3d-series>
```

**Result:** Empty points (treated as zero) appear in light gray.

### Complete Example with Empty Points

```cshtml
<ejs-circularchart3d id="container" title="Product Performance (Incomplete Data)" tilt="-45">
    <e-circularchart3d-legendsettings visible="true">
    </e-circularchart3d-legendsettings>
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@incompleteData" xName="Product" yName="Sales">
            <e-circularchart3dseries-emptyPointSettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Average" fill="#CCCCCC">
            </e-circularchart3dseries-emptyPointSettings>
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>
```

### Data Preparation Best Practices

1. **Handle null values in code:**
```csharp
// Instead of null, consider using 0 or Average mode
var data = rawData.Select(x => new ChartData 
{ 
    Category = x.Category,
    Value = x.Value ?? 0  // Use 0 if null
}).ToList();
```

2. **Filter empty points:**
```csharp
// Remove empty points entirely
var data = rawData.Where(x => x.Value.HasValue).ToList();
```

3. **Mark empty points distinctly:**
```csharp
public class ChartData
{
    public string Category { get; set; }
    public double? Value { get; set; }
    public bool IsEmpty { get; set; }  // Flag for styling
}
```

## Best Practices

1. **Titles and Subtitles**
   - Keep titles concise and descriptive
   - Use subtitles for additional context
   - Maintain visual hierarchy (title larger than subtitle)
   - Test with different screen sizes

2. **Empty Point Handling**
   - Choose the appropriate mode based on data type
   - Use Gap mode for sparse data
   - Use Average mode for continuous trends
   - Use Drop/Zero for categorical data with missing values

3. **Visual Communication**
   - Style empty points distinctly so users know they're missing
   - Document why data might be empty
   - Consider whether missing data is significant to your analysis

4. **Styling**
   - Maintain color contrast for readability
   - Use colors that don't clash with the main chart colors
   - Test with different themes
