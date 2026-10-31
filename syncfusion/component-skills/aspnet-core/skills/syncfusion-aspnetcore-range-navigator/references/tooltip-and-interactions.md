# Tooltips and Interactions

## Table of Contents

- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Customization](#tooltip-customization)
- [Animation Control](#animation-control)
- [Accessibility Features](#accessibility-features)
  - [Screen Reader Support](#screen-reader-support)
  - [Color Contrast](#color-contrast)
  - [Mobile Device Support](#mobile-device-support)
  - [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
  - [Events for Accessibility](#events-for-accessibility)
- [Complete Example](#complete-example)
- [Accessibility Checklist](#accessibility-checklist)

## Enabling Tooltips

By default, tooltips are disabled. Enable them using the `tooltip` property:

```cshtml
<ejs-rangenavigator id="rangeNavigator">
    <!-- Enable tooltip -->
    <e-rangenavigator-tooltip enable="true"></e-rangenavigator-tooltip>
    
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

**What tooltips show:**
- Start date/value when hovering over left thumb
- End date/value when hovering over right thumb
- Formatted according to `labelFormat` property

**Result:**
```
         [Tooltip: Mar 15, 2024]
                    ↓
┌─────────────────────────────────┐
│   /‾‾\ Area Chart      /‾‾\     │
│  /    \______________/    \    │
│◄────────────────────────────►   │
│                         [Tooltip: Sep 30, 2024]
│  Mar 15  Apr  May  Jun  Jul  Aug  Sep 30
└─────────────────────────────────┘
```

## Tooltip Customization

Customize tooltip appearance with colors, opacity, and text styling:

```cshtml
<ejs-rangenavigator id="rangeNavigator">
    <e-rangenavigator-tooltip 
        enable="true" 
        fill="#FFD700" 
        opacity="0.8">
        
        <!-- Text styling -->
        <e-rangetooltipsettings-textstyle 
            color="black" 
            fontFamily="Segoe UI" 
            fontSize="12px" 
            fontWeight="bold">
        </e-rangetooltipsettings-textstyle>
        
        <!-- Tooltip border -->
        <e-rangetooltipsettings-border 
            color="darkgoldenrod" 
            width="1">
        </e-rangetooltipsettings-border>
    </e-rangenavigator-tooltip>
    
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
- `fill` - Tooltip background color (hex or named)
- `opacity` - Transparency (0.0 to 1.0)
- `textStyle.color` - Text color
- `textStyle.fontFamily` - Font name
- `textStyle.fontSize` - Font size
- `textStyle.fontWeight` - bold, normal, lighter
- `border.color` - Border color
- `border.width` - Border thickness

## Animation Control

Control the speed of animations when interacting with the RangeNavigator:

```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    animationDuration="800">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

**Properties:**
- `animationDuration` - Duration in milliseconds (default: 500)

**Common values:**
- `0` - No animation (instant)
- `300` - Fast animation
- `500` - Default animation
- `800` - Slower animation
- `1000` - Very slow animation

**When to use:**
- Fast (300ms) - Desktop applications, high-performance requirements
- Default (500ms) - Balanced, general purpose
- Slow (800-1000ms) - Mobile devices, accessibility, emphasis on motion

**Example: Slow Animation for Mobile**

```cshtml
<ejs-rangenavigator id="mobileRange" animationDuration="1000">
    <!-- Mobile-friendly with slower animations -->
</ejs-rangenavigator>
```

## Accessibility Features

The RangeNavigator complies with WCAG 2.2 AA standards and includes:

### Screen Reader Support

- ARIA labels describe the component
- "RangeNavigator" region role identifies the component
- Current selection range announced via aria-label

### Color Contrast

All text and interactive elements meet minimum color contrast requirements.

### Mobile Device Support

- Touch-friendly thumb sizes (minimum 44x44 pixels)
- Works with screen readers on mobile devices
- Responsive to screen size changes

### Right-to-Left (RTL) Support

Enable RTL mode for right-to-left languages:

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

### Events for Accessibility

Handle component events for custom accessible behavior:

```cshtml
<ejs-rangenavigator 
    id="rangeNavigator" 
    loaded="onLoaded" 
    changed="onRangeChanged" 
    tooltipRender="onTooltipRender">
    <!-- ... configuration ... -->
</ejs-rangenavigator>

<script>
    function onLoaded(args) {
        console.log('Component ready - announce to screen reader');
    }
    
    function onRangeChanged(args) {
        // Update accessible text with new range
        document.getElementById('ariaLive').innerText = 
            'Range changed to: ' + args.start + ' to ' + args.end;
    }
    
    function onTooltipRender(args) {
        // Ensure tooltip has accessible text
        args.text = 'Selected value: ' + args.text;
    }
</script>

<!-- Accessible announcement region -->
<div id="ariaLive" role="status" aria-live="polite" style="display:none;"></div>
```

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
                Value = 20 + (month * 5)
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
<!-- Razor page (Index.cshtml) -->
<h4>Interactive RangeNavigator with Tooltips</h4>

<!-- Accessible status announcement -->
<div id="rangeStatus" 
    role="status" 
    aria-live="polite" 
    aria-atomic="true" 
    style="margin-bottom: 10px; padding: 10px; background: #F0F0F0;">
    Click range slider to select dates
</div>

<!-- RangeNavigator with full customization -->
<ejs-rangenavigator 
    id="rangeNavigator" 
    valueType="DateTime" 
    animationDuration="500" 
    enableRtl="false" 
    tabindex="0" 
    loaded="onLoaded" 
    changed="onRangeChanged">
    
    <!-- Tooltip configuration -->
    <e-rangenavigator-tooltip 
        enable="true"
        fill="#E8F4F8" 
        opacity="0.95">
        
        <e-rangetooltipsettings-textstyle 
            color="#333333" 
            fontFamily="Segoe UI" 
            fontSize="13px" 
            fontWeight="normal">
        </e-rangetooltipsettings-textstyle>
        
        <e-rangetooltipsettings-border 
            color="#0078D4" 
            width="1">
        </e-rangetooltipsettings-border>
    </e-rangenavigator-tooltip>
    
    <!-- Period selector -->
    <e-rangenavigator-periodselectorsettings position="Top">
        <e-periods>
            <e-period interval="1" intervalType="Months" text="1M"></e-period>
            <e-period interval="3" intervalType="Months" text="3M"></e-period>
            <e-period interval="6" intervalType="Months" text="6M"></e-period>
            <e-period interval="1" intervalType="Years" text="1Y"></e-period>
        </e-periods>
    </e-rangenavigator-periodselectorsettings>
    
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

<script>
    function onLoaded(args) {
        console.log('RangeNavigator loaded');
        updateAccessibleStatus('RangeNavigator ready. Use mouse to select range.');
    }
    
    function onRangeChanged(args) {
        var startDate = new Date(args.start).toLocaleDateString();
        var endDate = new Date(args.end).toLocaleDateString();
        updateAccessibleStatus('Range selected: ' + startDate + ' to ' + endDate);
        console.log('Range changed:', startDate, 'to', endDate);
    }
    
    function updateAccessibleStatus(message) {
        var statusDiv = document.getElementById('rangeStatus');
        statusDiv.innerText = message;
    }
</script>
```

## Accessibility Checklist

- ✓ WCAG 2.2 AA compliant
- ✓ Screen reader support with ARIA labels
- ✓ Color contrast meets standards
- ✓ Touch-friendly for mobile devices
- ✓ RTL support available
- ✓ Status messages announced to screen readers
- ✓ Tooltips with formatted, readable content
- ✓ Animation can be disabled or slowed
