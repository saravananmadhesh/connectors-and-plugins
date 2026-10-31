# Customization in WinUI BusyIndicator

This guide covers the customization properties available in the BusyIndicator control: size, duration (speed), and color.

## Overview

The BusyIndicator provides three key customization properties:

1. **SizeFactor** - Control the physical size of the indicator
2. **DurationFactor** - Control the animation speed
3. **Color** - Customize the indicator color

These properties allow you to match the indicator's appearance to your application's design.

## SizeFactor Property

The `SizeFactor` property controls the physical size of the animated indicator.

**Property Details:**
- **Type:** `double`
- **Default:** `0.5`
- **Range:** `0.0` to `1.0`
- **Effect:** Higher values = larger indicator

### Basic Usage

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DottedCircularFluent"
    SizeFactor="0.2"/>
```

**C#:**
```csharp
busyIndicator.SizeFactor = 0.2; // Small indicator
```

### Size Examples

```xaml
<!-- Extra Small -->
<notification:SfBusyIndicator 
    IsActive="True"
    SizeFactor="0.2"
    BusyContent="Small indicator"/>

<!-- Small (default is 0.5) -->
<notification:SfBusyIndicator 
    IsActive="True"
    SizeFactor="0.5"
    BusyContent="Default size"/>

<!-- Large -->
<notification:SfBusyIndicator 
    IsActive="True"
    SizeFactor="0.8"
    BusyContent="Large indicator"/>

<!-- Extra Large -->
<notification:SfBusyIndicator 
    IsActive="True"
    SizeFactor="1.0"
    BusyContent="Maximum size"/>
```

### When to Use Different Sizes

**Small (0.2 - 0.4):**
- Inline indicators in lists
- Toolbar or statusbar indicators
- Secondary loading indicators
- Space-constrained layouts

**Medium (0.5 - 0.6) - Default:**
- General purpose loading
- Form submissions
- Data grid loading
- Most common scenarios

**Large (0.7 - 1.0):**
- Full-screen modal overlays
- Initial application loading
- Critical operations requiring user attention
- Large display areas

### Responsive Sizing

Adjust size based on available space:

```csharp
private void UpdateSizeBasedOnLayout()
{
    double availableWidth = this.ActualWidth;
    
    if (availableWidth < 400)
    {
        busyIndicator.SizeFactor = 0.3; // Small for narrow layouts
    }
    else if (availableWidth < 800)
    {
        busyIndicator.SizeFactor = 0.5; // Medium for standard layouts
    }
    else
    {
        busyIndicator.SizeFactor = 0.8; // Large for wide layouts
    }
}
```

## DurationFactor Property

The `DurationFactor` property controls the animation speed (duration).

**Property Details:**
- **Type:** `double`
- **Default:** `0.5`
- **Range:** `0.0` to `1.0`
- **Effect:** Higher values = slower animation (longer duration)

### Basic Usage

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DottedCircularFluent"
    DurationFactor="0.9"/>
```

**C#:**
```csharp
busyIndicator.DurationFactor = 0.9; // Slow animation
```

### Speed Examples

```xaml
<!-- Fast Animation -->
<notification:SfBusyIndicator 
    IsActive="True"
    DurationFactor="0.2"
    BusyContent="Fast"/>

<!-- Medium Speed (default) -->
<notification:SfBusyIndicator 
    IsActive="True"
    DurationFactor="0.5"
    BusyContent="Normal"/>

<!-- Slow Animation -->
<notification:SfBusyIndicator 
    IsActive="True"
    DurationFactor="0.9"
    BusyContent="Slow"/>
```

### When to Use Different Speeds

**Fast (0.1 - 0.3):**
- Quick operations (< 2 seconds)
- Progress-oriented tasks
- Active/urgent processes
- High-priority notifications

**Medium (0.4 - 0.6) - Default:**
- General purpose loading
- Standard operations
- Balanced visual feedback
- Most common scenarios

**Slow (0.7 - 1.0):**
- Long operations (> 5 seconds)
- Background tasks
- Subtle activity indication
- Calming, non-intrusive feedback

### Animation Speed Guidelines

```csharp
private void SetDurationBasedOnOperationType(OperationType type)
{
    switch (type)
    {
        case OperationType.QuickRefresh:
            busyIndicator.DurationFactor = 0.2; // Fast
            break;
            
        case OperationType.DataLoad:
            busyIndicator.DurationFactor = 0.5; // Normal
            break;
            
        case OperationType.LongCalculation:
            busyIndicator.DurationFactor = 0.8; // Slow
            break;
            
        case OperationType.BackgroundSync:
            busyIndicator.DurationFactor = 0.9; // Very slow, subtle
            break;
    }
}
```

## Color Property

The `Color` property customizes the color of the animated indicator elements.

**Property Details:**
- **Type:** `Brush` (typically `SolidColorBrush`)
- **Default:** System accent color
- **Common Usage:** Match brand colors, theme colors, or status colors

### Basic Usage

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DottedCircle"
    Color="Red"/>
```

**C#:**
```csharp
busyIndicator.Color = new SolidColorBrush(Colors.Red);
```

### Color Examples

```xaml
<!-- Brand Color -->
<notification:SfBusyIndicator 
    IsActive="True"
    Color="DodgerBlue"
    BusyContent="Loading..."/>

<!-- Success Green -->
<notification:SfBusyIndicator 
    IsActive="True"
    Color="ForestGreen"
    BusyContent="Saving..."/>

<!-- Warning Orange -->
<notification:SfBusyIndicator 
    IsActive="True"
    Color="OrangeRed"
    BusyContent="Processing..."/>

<!-- Error Red -->
<notification:SfBusyIndicator 
    IsActive="True"
    Color="Crimson"
    BusyContent="Retrying..."/>
```

### Custom Colors

Use hex color codes:

```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    Color="#FF6A00"
    BusyContent="Custom brand color"/>
```

**C#:**
```csharp
// Hex color
busyIndicator.Color = new SolidColorBrush(
    Microsoft.UI.ColorHelper.FromArgb(255, 255, 106, 0)
);

// Named color
busyIndicator.Color = new SolidColorBrush(Colors.DeepSkyBlue);
```

### Theme-Aware Colors

Use theme resources for automatic light/dark theme support:

```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    Color="{ThemeResource SystemAccentColor}"
    BusyContent="Theme-aware"/>
```

**Common Theme Resources:**
- `SystemAccentColor` - System accent color
- `SystemAccentColorLight1` - Lighter accent
- `SystemAccentColorDark1` - Darker accent
- `ApplicationForegroundThemeBrush` - Foreground color

### Status-Based Colors

Change color based on operation status:

```csharp
private void UpdateColorByStatus(OperationStatus status)
{
    switch (status)
    {
        case OperationStatus.Loading:
            busyIndicator.Color = new SolidColorBrush(Colors.DodgerBlue);
            busyIndicator.BusyContent = "Loading...";
            break;
            
        case OperationStatus.Processing:
            busyIndicator.Color = new SolidColorBrush(Colors.Orange);
            busyIndicator.BusyContent = "Processing...";
            break;
            
        case OperationStatus.Completing:
            busyIndicator.Color = new SolidColorBrush(Colors.ForestGreen);
            busyIndicator.BusyContent = "Almost done...";
            break;
            
        case OperationStatus.Error:
            busyIndicator.Color = new SolidColorBrush(Colors.Crimson);
            busyIndicator.BusyContent = "Retrying...";
            break;
    }
}
```

## Combining Customizations

Combine properties for complete customization:

### Example 1: Large, Slow, Blue Indicator
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DoubleCircle"
    SizeFactor="0.8"
    DurationFactor="0.7"
    Color="DodgerBlue"
    BusyContent="Processing large dataset..."/>
```

**Use Case:** Long calculation with prominent indicator.

### Example 2: Small, Fast, Green Indicator
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="SingleCircle"
    SizeFactor="0.3"
    DurationFactor="0.2"
    Color="ForestGreen"
    BusyContent="Saved!"/>
```

**Use Case:** Quick save confirmation with subtle feedback.

### Example 3: Modal Overlay with Custom Styling
```xaml
<Grid Background="#E0000000">
    <notification:SfBusyIndicator 
        IsActive="True"
        AnimationType="LinearFluent"
        SizeFactor="0.6"
        DurationFactor="0.5"
        Color="White"
        BusyContent="Loading application..."
        BusyContentPosition="Bottom"/>
</Grid>
```

**Use Case:** Full-screen loading with high contrast on dark overlay.

### Example 4: Dynamic Customization
```csharp
private void ConfigureForOperation(OperationType type, string message)
{
    busyIndicator.IsActive = true;
    busyIndicator.BusyContent = message;
    
    switch (type)
    {
        case OperationType.QuickLoad:
            busyIndicator.AnimationType = BusyIndicatorAnimationType.DottedCircle;
            busyIndicator.SizeFactor = 0.4;
            busyIndicator.DurationFactor = 0.3;
            busyIndicator.Color = new SolidColorBrush(Colors.DodgerBlue);
            break;
            
        case OperationType.FileUpload:
            busyIndicator.AnimationType = BusyIndicatorAnimationType.LinearBox;
            busyIndicator.SizeFactor = 0.5;
            busyIndicator.DurationFactor = 0.5;
            busyIndicator.Color = new SolidColorBrush(Colors.Orange);
            break;
            
        case OperationType.HeavyComputation:
            busyIndicator.AnimationType = BusyIndicatorAnimationType.DoubleCircle;
            busyIndicator.SizeFactor = 0.7;
            busyIndicator.DurationFactor = 0.8;
            busyIndicator.Color = new SolidColorBrush(Colors.Purple);
            break;
    }
}
```

## Performance Considerations

### GPU Acceleration
- All animations are GPU-accelerated
- No performance difference between customization values
- Safe to animate multiple indicators simultaneously

### Best Practices
1. **Avoid frequent changes:** Don't rapidly change SizeFactor/DurationFactor during operation
2. **Set once:** Configure properties before activating the indicator
3. **Reasonable ranges:** Stay within recommended ranges (avoid extreme values)

### Memory Usage
Customization properties have negligible memory impact. No concerns for multiple instances.

## Accessibility Considerations

### High Contrast Themes
Test your color choices in high contrast mode:

```csharp
// Detect high contrast mode
var accessibilitySettings = new Windows.UI.ViewManagement.AccessibilitySettings();
if (accessibilitySettings.HighContrast)
{
    // Use system colors for accessibility
    busyIndicator.Color = new SolidColorBrush(
        Windows.UI.ViewManagement.UISettings().GetColorValue(
            Windows.UI.ViewManagement.UIColorType.Foreground
        )
    );
}
```

### Color Contrast
Ensure sufficient contrast between indicator color and background (WCAG 2.1 Level AA requires 4.5:1 ratio).

## Next Steps

- **Getting Started:** See [getting-started.md](getting-started.md) for installation and setup
- **Animation Types:** See [animation-types.md](animation-types.md) to choose animation styles
- **Content:** See [content.md](content.md) for content customization options
