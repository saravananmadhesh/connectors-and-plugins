# Customization in WinUI Shimmer

This guide covers the customization properties available in the Shimmer control: fill color, wave color, wave width, wave duration, and repeat count.

## Overview

The Shimmer control provides five key customization properties:

1. **Fill** - Background color of the shimmer view
2. **WaveColor** - Color of the animated wave
3. **WaveWidth** - Width of the wave animation
4. **WaveDuration** - Speed/duration of the wave animation
5. **RepeatCount** - Number of times the view repeats

These properties allow you to match the shimmer appearance to your application's theme and design.

## Fill Property

The `Fill` property sets the background color of the shimmer placeholder elements.

**Property Details:**
- **Type:** `Brush` (typically `SolidColorBrush`)
- **Default:** Light gray (#F6F6F6)
- **Common Usage:** Match app background or theme colors

### Basic Usage

**XAML:**
```xaml
<syncfusion:SfShimmer Fill="#89CFF0"/>
```

**C#:**
```csharp
shimmer.Fill = new SolidColorBrush(ColorHelper.FromArgb(255, 137, 207, 240));
```

### Color Examples

```xaml
<!-- Light gray (default-like) -->
<syncfusion:SfShimmer Fill="#F6F6F6"/>

<!-- White -->
<syncfusion:SfShimmer Fill="#FFFFFF"/>

<!-- Light blue -->
<syncfusion:SfShimmer Fill="#E3F2FD"/>

<!-- Subtle purple -->
<syncfusion:SfShimmer Fill="#F3E5F5"/>

<!-- Dark theme -->
<syncfusion:SfShimmer Fill="#2C2C2C"/>
```

### Theme-Aware Fill

Use theme resources for automatic light/dark theme support:

```xaml
<syncfusion:SfShimmer 
    Fill="{ThemeResource CardBackgroundFillColorDefaultBrush}"/>
```

**Common Theme Resources:**
- `CardBackgroundFillColorDefaultBrush`
- `LayerFillColorDefaultBrush`
- `SubtleFillColorSecondaryBrush`

### Dynamic Fill Color

```csharp
private void UpdateFillForTheme()
{
    var uiSettings = new Windows.UI.ViewManagement.UISettings();
    var backgroundColor = uiSettings.GetColorValue(
        Windows.UI.ViewManagement.UIColorType.Background
    );
    
    // Adjust fill based on theme
    if (IsLightColor(backgroundColor))
    {
        // Light theme
        shimmer.Fill = new SolidColorBrush(Colors.LightGray);
    }
    else
    {
        // Dark theme
        shimmer.Fill = new SolidColorBrush(Color.FromArgb(255, 44, 44, 44));
    }
}
```

## WaveColor Property

The `WaveColor` property sets the color of the animated wave that moves across the shimmer.

**Property Details:**
- **Type:** `Brush` (typically `SolidColorBrush`)
- **Default:** White (#FFFFFF)
- **Effect:** Wave should be lighter than Fill for best visibility

### Basic Usage

**XAML:**
```xaml
<syncfusion:SfShimmer WaveColor="#89CFF0"/>
```

**C#:**
```csharp
shimmer.WaveColor = new SolidColorBrush(ColorHelper.FromArgb(255, 137, 207, 240));
```

### Wave Color Examples

```xaml
<!-- Standard (white wave on gray) -->
<syncfusion:SfShimmer 
    Fill="#F6F6F6"
    WaveColor="#FFFFFF"/>

<!-- Subtle wave -->
<syncfusion:SfShimmer 
    Fill="#F0F0F0"
    WaveColor="#F8F8F8"/>

<!-- Dark theme (light wave on dark background) -->
<syncfusion:SfShimmer 
    Fill="#2C2C2C"
    WaveColor="#3C3C3C"/>

<!-- Branded (blue theme) -->
<syncfusion:SfShimmer 
    Fill="#E3F2FD"
    WaveColor="#BBDEFB"/>
```

### Contrast Guidelines

**Wave should be lighter than Fill:**
```xaml
<!-- ✓ Good contrast -->
<syncfusion:SfShimmer 
    Fill="#E0E0E0"
    WaveColor="#F5F5F5"/>

<!-- ✗ Poor contrast (wave darker than fill) -->
<syncfusion:SfShimmer 
    Fill="#E0E0E0"
    WaveColor="#C0C0C0"/>
```

**Recommended contrast ratio:** 1.2:1 to 1.5:1 between Fill and WaveColor

## WaveDuration Property

The `WaveDuration` property controls the speed of the wave animation in milliseconds.

**Property Details:**
- **Type:** `int`
- **Default:** 1000 (1 second)
- **Range:** Typically 500-3000ms
- **Effect:** Higher values = slower animation

### Basic Usage

**XAML:**
```xaml
<syncfusion:SfShimmer WaveDuration="3000"/>
```

**C#:**
```csharp
shimmer.WaveDuration = 3000; // 3 seconds
```

### Duration Examples

```xaml
<!-- Fast (0.8 seconds) -->
<syncfusion:SfShimmer WaveDuration="800"/>

<!-- Normal/Default (1 second) -->
<syncfusion:SfShimmer WaveDuration="1000"/>

<!-- Slow (2 seconds) -->
<syncfusion:SfShimmer WaveDuration="2000"/>

<!-- Very slow (3 seconds) -->
<syncfusion:SfShimmer WaveDuration="3000"/>
```

### When to Use Different Speeds

**Fast (500-900ms):**
- Quick operations (<2 seconds)
- Energetic, active feel
- User expects fast loading

**Normal (1000-1500ms):**
- Standard data loading
- Balanced feel
- Most common use case

**Slow (1500-3000ms):**
- Long operations (>5 seconds)
- Calm, relaxed feel
- Background/ambient loading

### Matching Duration to Loading Time

```csharp
private void SetDurationBasedOnLoadTime(int estimatedLoadTimeMs)
{
    if (estimatedLoadTimeMs < 2000)
    {
        shimmer.WaveDuration = 800; // Fast loading
    }
    else if (estimatedLoadTimeMs < 5000)
    {
        shimmer.WaveDuration = 1200; // Normal loading
    }
    else
    {
        shimmer.WaveDuration = 2000; // Long loading
    }
}
```

## WaveWidth Property

The `WaveWidth` property controls the width of the animated wave in pixels.

**Property Details:**
- **Type:** `double`
- **Default:** 200
- **Range:** Typically 50-300
- **Effect:** Larger values = wider wave

### Basic Usage

**XAML:**
```xaml
<syncfusion:SfShimmer 
    WaveWidth="70"
    WaveColor="#89CFF0"/>
```

**C#:**
```csharp
shimmer.WaveWidth = 70;
```

### Width Examples

```xaml
<!-- Narrow wave -->
<syncfusion:SfShimmer WaveWidth="50"/>

<!-- Medium wave -->
<syncfusion:SfShimmer WaveWidth="100"/>

<!-- Default wave -->
<syncfusion:SfShimmer WaveWidth="200"/>

<!-- Wide wave -->
<syncfusion:SfShimmer WaveWidth="300"/>
```

### Visual Effects

**Narrow waves (50-100):**
- Subtle shimmer effect
- Less prominent animation
- Good for dark themes

**Medium waves (100-200):**
- Balanced appearance
- Standard shimmer effect
- Most versatile

**Wide waves (200-300):**
- Prominent shimmer
- Bold animation
- Good for light themes

### Combining Wave Properties

```xaml
<!-- Fast, narrow wave -->
<syncfusion:SfShimmer 
    WaveWidth="60"
    WaveDuration="800"
    WaveColor="#FFFFFF"/>

<!-- Slow, wide wave -->
<syncfusion:SfShimmer 
    WaveWidth="250"
    WaveDuration="2000"
    WaveColor="#F0F0F0"/>
```

## RepeatCount Property

The `RepeatCount` property sets how many times the built-in shimmer view is repeated vertically.

**Property Details:**
- **Type:** `int`
- **Default:** 1
- **Use Case:** Lists, feeds, multiple items
- **Note:** Only works with built-in types (not CustomLayout)

### Basic Usage

**XAML:**
```xaml
<syncfusion:SfShimmer 
    Type="Article"
    RepeatCount="5"/>
```

**C#:**
```csharp
shimmer.Type = ShimmerType.Article;
shimmer.RepeatCount = 5;
```

### Repeat Count Examples

```xaml
<!-- Single item -->
<syncfusion:SfShimmer Type="Profile" RepeatCount="1"/>

<!-- Small list (3-5 items) -->
<syncfusion:SfShimmer Type="CirclePersona" RepeatCount="5"/>

<!-- Medium list (8-10 items) -->
<syncfusion:SfShimmer Type="Article" RepeatCount="8"/>

<!-- Large list (15+ items) -->
<syncfusion:SfShimmer Type="Feed" RepeatCount="15"/>
```

### Calculating Repeat Count

Match visible viewport items:

```csharp
private int CalculateRepeatCount(double viewportHeight, double itemHeight)
{
    return (int)Math.Ceiling(viewportHeight / itemHeight) + 1; // +1 for partial item
}

// Usage
double viewportHeight = scrollViewer.ActualHeight;
double itemHeight = 80; // Typical item height

shimmer.RepeatCount = CalculateRepeatCount(viewportHeight, itemHeight);
```

### Best Practices

**Viewport-based:**
```csharp
// ✓ Good - Shows items that fit in view
shimmer.RepeatCount = 8; // For visible area
```

**Avoid excessive counts:**
```csharp
// ✗ Avoid - Unnecessarily high count
shimmer.RepeatCount = 100; // Too many, may impact performance
```

## Combining Customizations

### Example 1: Light Theme Shimmer

```xaml
<syncfusion:SfShimmer 
    Type="Article"
    Fill="#F8F8F8"
    WaveColor="#FFFFFF"
    WaveDuration="1200"
    WaveWidth="180"
    RepeatCount="5"/>
```

### Example 2: Dark Theme Shimmer

```xaml
<syncfusion:SfShimmer 
    Type="Video"
    Fill="#1E1E1E"
    WaveColor="#2C2C2C"
    WaveDuration="1500"
    WaveWidth="150"
    RepeatCount="6"/>
```

### Example 3: Branded Shimmer

```xaml
<syncfusion:SfShimmer 
    Type="Shopping"
    Fill="#E8F5E9"
    WaveColor="#F1F8E9"
    WaveDuration="1000"
    WaveWidth="200"
    RepeatCount="8"/>
```

### Example 4: High-Contrast Shimmer

```xaml
<syncfusion:SfShimmer 
    Type="Feed"
    Fill="#000000"
    WaveColor="#333333"
    WaveDuration="1800"
    WaveWidth="120"
    RepeatCount="10"/>
```

### Dynamic Customization

```csharp
private void ConfigureShimmerForTheme(string theme)
{
    switch (theme)
    {
        case "Light":
            shimmer.Fill = new SolidColorBrush(Colors.LightGray);
            shimmer.WaveColor = new SolidColorBrush(Colors.White);
            shimmer.WaveDuration = 1200;
            break;
            
        case "Dark":
            shimmer.Fill = new SolidColorBrush(Color.FromArgb(255, 30, 30, 30));
            shimmer.WaveColor = new SolidColorBrush(Color.FromArgb(255, 44, 44, 44));
            shimmer.WaveDuration = 1500;
            break;
            
        case "HighContrast":
            shimmer.Fill = new SolidColorBrush(Colors.Black);
            shimmer.WaveColor = new SolidColorBrush(Color.FromArgb(255, 51, 51, 51));
            shimmer.WaveDuration = 1800;
            break;
    }
}
```

## Performance Considerations

### GPU Acceleration
- All shimmer animations are GPU-accelerated
- No performance difference between customization values
- Safe to use multiple shimmers with different settings

### Memory Impact
- Customization properties have negligible memory impact
- RepeatCount affects memory linearly (higher count = slightly more memory)
- Recommended maximum RepeatCount: 20-30 items

### Best Practices
1. **Set properties once:** Configure before showing shimmer
2. **Avoid frequent changes:** Don't animate property values
3. **Reasonable RepeatCount:** Match viewport, avoid excessive counts

## Accessibility Considerations

### High Contrast Mode

Adapt shimmer for high contrast themes:

```csharp
var accessibilitySettings = new Windows.UI.ViewManagement.AccessibilitySettings();

if (accessibilitySettings.HighContrast)
{
    shimmer.Fill = new SolidColorBrush(Colors.Black);
    shimmer.WaveColor = new SolidColorBrush(Color.FromArgb(255, 40, 40, 40));
}
```

### Color Contrast

Ensure sufficient contrast between Fill and WaveColor:
- **Minimum contrast ratio:** 1.2:1
- **Recommended contrast ratio:** 1.3:1 to 1.5:1

### Motion Sensitivity

For users sensitive to motion, consider slower animations:

```csharp
var animationSettings = new Windows.UI.ViewManagement.UISettings();

// Check if animations are enabled
if (!animationSettings.AnimationsEnabled)
{
    // Use slower, subtler shimmer
    shimmer.WaveDuration = 2500;
    shimmer.WaveWidth = 100;
}
```

## Next Steps

- **Getting Started:** See [getting-started.md](getting-started.md) for installation and basic usage
- **Built-in Types:** See [built-in-types.md](built-in-types.md) to choose the right shimmer type
- **Custom Layouts:** See [custom-layouts.md](custom-layouts.md) to create custom shimmer designs
