# Customization and Appearance

## Table of Contents

- [Navigator Appearance](#navigator-appearance)
  - [Color Examples](#color-examples)
- [Thumb Customization](#thumb-customization)
  - [Thumb Type Examples](#thumb-type-examples)
  - [Sized Thumbs](#sized-thumbs)
- [Border Customization](#border-customization)
  - [Border Examples](#border-examples)
- [RTL Support](#rtl-support)
- [Lightweight Mode](#lightweight-mode)
- [Theme Selection](#theme-selection)
- [Complete Example](#complete-example)
- [Common Design Patterns](#common-design-patterns)
  - [Pattern 1: Modern Blue Design](#pattern-1-modern-blue-design)
  - [Pattern 2: Dark Theme](#pattern-2-dark-theme)
  - [Pattern 3: High Contrast Accessibility](#pattern-3-high-contrast-accessibility)
  - [Pattern 4: Mobile Touch-Friendly](#pattern-4-mobile-touch-friendly)

## Navigator Appearance

Customize the colors of the selected and unselected regions using `navigatorstylesettings`:

```cshtml
<ejs-rangenavigator id="rangeNavigator">
    <!-- Customize appearance -->
    <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(0, 150, 255, 0.3)" 
        unselectedRegionColor="rgba(200, 200, 200, 0.2)">
    </e-rangenavigator-navigatorstylesettings>
    
    <!-- Series configuration -->
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

**Properties:**
- `selectedRegionColor` - Color of selected range area (RGBA recommended for transparency)
- `unselectedRegionColor` - Color of unselected areas

**Result:**
```
Unselected │ Selected Range │ Unselected
(Gray)     │ (Blue)         │ (Gray)
────────────────────────────────────────
```

### Color Examples

```cshtml
<!-- Professional Blue Selection -->
<e-rangenavigator-navigatorstylesettings 
    selectedRegionColor="rgba(0, 120, 215, 0.4)" 
    unselectedRegionColor="rgba(220, 220, 220, 0.2)">
</e-rangenavigator-navigatorstylesettings>

<!-- Vibrant Green Selection -->
<e-rangenavigator-navigatorstylesettings 
    selectedRegionColor="rgba(0, 176, 80, 0.4)" 
    unselectedRegionColor="rgba(240, 240, 240, 0.1)">
</e-rangenavigator-navigatorstylesettings>

<!-- Dark Theme -->
<e-rangenavigator-navigatorstylesettings 
    selectedRegionColor="rgba(100, 200, 255, 0.6)" 
    unselectedRegionColor="rgba(80, 80, 80, 0.3)">
</e-rangenavigator-navigatorstylesettings>
```

## Thumb Customization

Customize the sliders (thumbs) used to select the range:
Use either this
```cshtml
    <e-rangenavigator-navigatorstylesettings 
        thumb="@myThumb">
    </e-rangenavigator-navigatorstylesettings>
```
or this
```cshtml
<e-rangenavigator-navigatorstylesettings>
    <e-navigatorstylesettings-thumb>
    </e-navigatorstylesettings-thumb>
</e-rangenavigator-navigatorstylesettings>
```
```cshtml
@page
@model IndexModel
@using Syncfusion.EJ2.Charts @* Ensure this namespace is included *@
@{
    ViewData["Title"] = "Home page";

    // Initialize using explicit Syncfusion classes to satisfy strong typing
    var myThumb = new RangeNavigatorThumbSettings {
        Border = new RangeNavigatorBorder { Width = 2, Color = "#0078D4" },
        Fill = "#E8F4F8",
        Height = 20,
        Width = 20,
        Type = ThumbType.Rectangle
    };
}

<ejs-rangenavigator id="rangeNavigator">
    <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(0, 176, 80, 0.4)" 
        unselectedRegionColor="rgba(240, 240, 240, 0.1)"
        thumb="@myThumb">
    </e-rangenavigator-navigatorstylesettings>
    
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

**Properties:**
- `type` - Shape: "Circle" or "Rectangle"
- `fill` - Thumb background color
- `border` - Border style (width, color)
- `width` - Thumb width in pixels
- `height` - Thumb height in pixels

### Thumb Type Examples

**Circle Thumbs (Rounded):**

```cshtml
@page
@model IndexModel
@using Syncfusion.EJ2.Charts @* Ensure this namespace is included *@
@{
    ViewData["Title"] = "Home page";

    // Initialize using explicit Syncfusion classes to satisfy strong typing
    var myThumb = new RangeNavigatorThumbSettings {
        Border = new RangeNavigatorBorder { Width = 2, Color = "#0078D4" },
        Fill = "#E8F4F8",
        Height = 16,
        Width = 16,
        Type = ThumbType.Circle
    };
}

<ejs-rangenavigator id="rangeNavigator">
    <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(0, 176, 80, 0.4)" 
        unselectedRegionColor="rgba(240, 240, 240, 0.1)"
        thumb="@myThumb">
    </e-rangenavigator-navigatorstylesettings>
    
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

Result: ◯────○

**Rectangle Thumbs (Square):**

```cshtml
@page
@model IndexModel
@using Syncfusion.EJ2.Charts
@{
    // Define initial selected range (DateTime format matching your Data)
    var initialSelectedRange = new object[] { 
        new DateTime(2024, 3, 1), 
        new DateTime(2024, 7, 1) 
    };

    // Border configuration for the thumb
    var thumbBorder = new RangeNavigatorBorder { 
        Width = 2, 
        Color = "#0078D4" 
    };
}

<ejs-rangenavigator 
    id="lightweightRange" 
    valueType="DateTime" 
    datasource="@Model.Data" 
    xName="Date" 
    yName="Value"
    value="@initialSelectedRange"
    labelFormat="MMM">

    <e-rangenavigator-tooltip enable="true"></e-rangenavigator-tooltip>
    
    <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(255, 165, 0, 0.4)" 
        unselectedRegionColor="rgba(240, 240, 240, 0.2)">
        
        @* Use the e-stylesettings-thumb tag for inline thumb properties *@
        <e-navigatorstylesettings-thumb 
            type="Circle" 
            fill="#0078D4" 
            height="18" 
            width="18"
            border="@thumbBorder">
        </e-navigatorstylesettings-thumb>
        
    </e-rangenavigator-navigatorstylesettings>

    @* Lightweight mode: No series collection tag here *@
</ejs-rangenavigator>
```

Result: ▮────▮

### Sized Thumbs

**Small Thumbs (Compact):**

```cshtml
<e-rangenavigator-thumb 
     
<e-rangenavigator-navigatorStyleSettings 
    thumb="new RangeNavigatorThumbSettings{Width=12,Height=12
    Type=ThumbType.Circle 
    Fill="#333333"}">
</e-rangenavigator-navigatorStyleSettings>
```

**Large Thumbs (Touch-Friendly):**

```cshtml
<e-rangenavigator-navigatorStyleSettings
    thumb = new RangeNavigatorThumbSettings {
        Type=ThumbType.Circle
        Fill="#0078D4" 
        Height="24" 
        Width="24" 
        Border=new RangeNavigatorBorder {Width=2, Color="solid #005A9E"}
    }>
</e-rangenavigator-navigatorStyleSettings>
```

## Border Customization

Customize the border around the RangeNavigator component:

```cshtml
<ejs-rangenavigator id="rangeNavigator">
    <!-- Border properties -->
    <e-rangenavigator-navigatorborder 
        color="#0078D4" 
        width="2">
    </e-rangenavigator-navigatorborder>
    
    <!-- Series configuration -->
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

**Properties:**
- `color` - Border color (hex or named)
- `width` - Border thickness in pixels

### Border Examples

**Subtle Border:**

```cshtml
<e-rangenavigator-navigatorborder 
    color="#E0E0E0" 
    width="1">
</e-rangenavigator-navigatorborder>
```

**Bold Border:**

```cshtml
<e-rangenavigator-navigatorborder 
    color="#0078D4" 
    width="3">
</e-rangenavigator-navigatorborder>
```

**No Border:**

```cshtml
<e-rangenavigator-navigatorborder 
    width="0">
</e-rangenavigator-navigatorborder>
```

## RTL Support

Enable right-to-left (RTL) layout for Arabic, Hebrew, and other RTL languages:

```cshtml
<ejs-rangenavigator id="rangeNavigator" enableRtl="true">
    <!-- RTL layout automatically applied -->
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

**Changes in RTL Mode:**
- Axis labels flow right-to-left
- Left thumb becomes right thumb and vice versa
- Touch interactions reversed for RTL
- Period selector buttons arrange right-to-left

**LTR (Left-to-Right) Default:**
```
◄───────────────────────────►
Jan  Feb  Mar  Apr  May  Jun
```

**RTL (Right-to-Left):**
```
◄───────────────────────────►
Jun  May  Apr  Mar  Feb  Jan
```

## Lightweight Mode

Display range selection without chart visualization, useful for mobile or embedded scenarios:

```cshtml
<!-- Lightweight Range Selector (No Chart) -->
<!-- No series configuration = lightweight mode -->
<ejs-rangenavigator id="lightweightRange" 
    dataSource="@Model.Data"
    valueType="DateTime" 
    value="value" 
    xName="x" 
    yName="y">
</ejs-rangenavigator>
```

**When DataSource is empty:**
- No chart is rendered
- Only range slider and axis labels show
- Much lighter on performance
- Ideal for filters on mobile devices

**Result:**
```
┌──────────────────────────────┐
│                              │
│  ◄──────[Range]──────►      │  ← Just the slider
│                              │
│  Jan   Feb   Mar   Apr       │  ← Axis labels
└──────────────────────────────┘
```

## Theme Selection

RangeNavigator inherits theme settings from your application. Control the overall appearance through the `theme` property:

```cshtml
<ejs-rangenavigator id="rangeNavigator" theme="Bootstrap5">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

**Available Themes:**
- `Bootstrap` - Bootstrap 3 design
- `Bootstrap4` - Bootstrap 4 design
- `Bootstrap5` - Bootstrap 5 design (modern)
- `Bulma` - Bulma CSS framework
- `Fabric` - Microsoft Fabric design
- `HighContrast` - High contrast for accessibility
- `Material` - Material Design
- `MaterialDark` - Material Design dark
- `Tailwind` - Tailwind CSS design
- `TailwindDark` - Tailwind dark

**Theme application:**
- Themes automatically set colors, fonts, sizing
- Works system-wide for consistent design
- Can be overridden with custom styling


## Complete Example

```csharp
// Code-behind (IndexModel.cs)
public class IndexModel : PageModel
{
    public List<ChartData> Data { get; set; }
    
    public void OnGet()
    {
        Data = GenerateData();
    }
    
    private List<ChartData> GenerateData()
    {
        var data = new List<ChartData>();
        for (int month = 1; month <= 12; month++)
        {
            data.Add(new ChartData
            {
                Date = new DateTime(2024, month, 1),
                Value = 30 + (month * 3)
            });
        }
        return data;
    }
}

public class ChartData
{
    public DateTime Date { get; set; }
    public double Value { get; set; }
}
```

```cshtml
@page
@model IndexModel
@using Syncfusion.EJ2.Charts @* Ensure this namespace is included *@
@{
    var border = new RangeNavigatorBorder {
        Width = 2,
        Color = "solid #005A9E"
    };
    // Initial selected range: June 1st to August 1st, 2024
    var initialSelectedRange = new object[] { 
        new DateTime(2024, 6, 1), 
        new DateTime(2024, 8, 1) 
    };
}
<h4>Customized RangeNavigator</h4>

<ejs-rangenavigator 
    id="customizedRange" 
    valueType="DateTime" 
    theme="Bootstrap5" 
    enableRtl="false">
    
    <!-- Appearance customization -->
    <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(0, 120, 215, 0.5)" 
        unselectedRegionColor="rgba(230, 230, 230, 0.3)">
        <e-stylesettings-thumb
        type="Circle" 
        fill="#0078D4" 
        height="20" 
        width="20" 
        border="@border">
    </e-stylesettings-thumb>
    </e-rangenavigator-navigatorstylesettings>
    
    <!-- Thumb customization -->

    
    <!-- Border customization -->
    <e-rangenavigator-navigatorborder 
        color="#0078D4" 
        width="2">
    </e-rangenavigator-navigatorborder>
    
    <!-- Tooltip -->
    <e-rangenavigator-tooltip enable="true" labelFormat="MMMM dd, yyyy"></e-rangenavigator-tooltip>
    
    <!-- Series configuration -->
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="Date" 
            yName="Value" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>

<h4>RTL Example (Hebrew/Arabic)</h4>

<ejs-rangenavigator 
    id="rtlRange" 
    valueType="DateTime" 
    enableRtl="true">
    
    <!-- RTL styling -->
    <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(255, 165, 0, 0.4)" 
        unselectedRegionColor="rgba(240, 240, 240, 0.2)">
    </e-rangenavigator-navigatorstylesettings>
    
    <!-- Series configuration -->
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="Date" 
            yName="Value" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>

<h4>Lightweight Range Selector</h4>

<ejs-rangenavigator 
    id="lightweightRange" 
    valueType="DateTime" 
    datasource="@Model.Data" 
    xName="Date" 
    yName="Value" 
    type="Area"
    value="@initialSelectedRange">
    
    <!-- No series = lightweight mode -->
        <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(255, 165, 0, 0.4)" 
        unselectedRegionColor="rgba(240, 240, 240, 0.2)">
            <e-stylesettings-thumb 
            type="Circle" 
            fill="#0078D4" 
            height="18" 
            width="18">
            </e-stylesettings-thumb>
    </e-rangenavigator-navigatorstylesettings>
</ejs-rangenavigator>
```

## Common Design Patterns

### Pattern 1: Modern Blue Design

```cshtml
<ejs-rangenavigator 
    id="customizedRange" 
    valueType="DateTime" 
    theme="Bootstrap5">
    <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(0, 120, 215, 0.4)" 
        unselectedRegionColor="rgba(220, 220, 220, 0.2)">
        <e-stylesettings-thumb type="Circle" fill="#0078D4" height="18" width="18">
        </e-stylesettings-thumb>
    </e-rangenavigator-navigatorstylesettings>
    <e-rangenavigator-navigatorborder color="#0078D4" width="2">
    </e-rangenavigator-navigatorborder>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="Date" 
            yName="Value" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### Pattern 2: Dark Theme

```cshtml
<ejs-rangenavigator 
    id="customizedRange" 
    valueType="DateTime"
    theme="MaterialDark">
    <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(100, 200, 255, 0.6)" 
        unselectedRegionColor="rgba(80, 80, 80, 0.3)">
        <e-stylesettings-thumb type="Circle" fill="#0078D4" height="18" width="18">
        </e-stylesettings-thumb>
    </e-rangenavigator-navigatorstylesettings>
    <e-rangenavigator-navigatorborder color="#0078D4" width="2">
    </e-rangenavigator-navigatorborder>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="Date" 
            yName="Value" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### Pattern 3: High Contrast Accessibility

```cshtml
<ejs-rangenavigator 
    id="customizedRange" 
    valueType="DateTime"
    theme="HighContrast">
    <e-rangenavigator-navigatorstylesettings>
        <e-stylesettings-thumb type="Circle" fill="#FFFF00" height="20" width="20">
        </e-stylesettings-thumb>
    </e-rangenavigator-navigatorstylesettings>
    <e-rangenavigator-navigatorborder color="#0078D4" width="2">
    </e-rangenavigator-navigatorborder>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="Date" 
            yName="Value" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### Pattern 4: Mobile Touch-Friendly

```cshtml
<ejs-rangenavigator 
    id="customizedRange" 
    valueType="DateTime"
    theme="HighContrast"
    animationDuration="800">
    <e-rangenavigator-navigatorstylesettings>
        <e-stylesettings-thumb type="Circle" fill="#FFFF00" height="20" width="20">
        </e-stylesettings-thumb>
    </e-rangenavigator-navigatorstylesettings>
    <e-rangenavigator-navigatorborder color="#0078D4" width="2">
    </e-rangenavigator-navigatorborder>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="Date" 
            yName="Value" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```
