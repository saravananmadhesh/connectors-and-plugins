# Appearance and Styling

## Table of Contents
- [Overview](#overview)
- [Predefined Palette](#predefined-palette)
- [Custom Palettes](#custom-palettes)
- [Gradient Styling](#gradient-styling)
- [Best Practices](#best-practices)

## Overview

The Syncfusion WinUI Funnel Chart provides flexible appearance customization through predefined palettes, custom color schemes, and gradient effects. These features allow you to match your application's design system and create visually appealing data visualizations.

## Predefined Palette

The funnel chart includes a default predefined palette that applies automatically:

### XAML
```xml
<chart:SfFunnelChart x:Name="chart"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
</chart:SfFunnelChart>
```

### C#
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
this.Content = chart;
```

**Result:** The chart automatically applies the default Syncfusion color palette to segments.

**Note:** Currently, there is only one predefined palette. To use custom colors, define your own `PaletteBrushes`.

## Custom Palettes

Create custom color schemes using the `PaletteBrushes` property:

### Basic Custom Palette

```xml
<Grid>
    <Grid.Resources>
        <BrushCollection x:Key="customBrushes">
            <SolidColorBrush Color="#4dd0e1"/>
            <SolidColorBrush Color="#26c6da"/>
            <SolidColorBrush Color="#00bcd4"/>
            <SolidColorBrush Color="#00acc1"/>
            <SolidColorBrush Color="#0097a7"/>
            <SolidColorBrush Color="#00838f"/>
        </BrushCollection>
    </Grid.Resources>
    
    <chart:SfFunnelChart x:Name="chart"
                         ItemsSource="{Binding Data}"
                         XBindingPath="Category"
                         YBindingPath="Value"
                         PaletteBrushes="{StaticResource customBrushes}">
    </chart:SfFunnelChart>
</Grid>
```

### C# Implementation

```csharp
SfFunnelChart chart = new SfFunnelChart();

List<Brush> customBrushes = new List<Brush>();
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 77, 208, 225)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 38, 198, 218)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 188, 212)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 172, 193)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 151, 167)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 131, 143)));

chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.PaletteBrushes = customBrushes;

this.Content = chart;
```

**How it works:**
- Colors are applied to segments in order
- First color → First segment (top)
- Second color → Second segment, etc.
- If more segments than colors, the palette cycles

### Color Scheme Examples

#### Blue Monochrome
```xml
<BrushCollection x:Key="blueMonochrome">
    <SolidColorBrush Color="#E3F2FD"/>
    <SolidColorBrush Color="#BBDEFB"/>
    <SolidColorBrush Color="#90CAF9"/>
    <SolidColorBrush Color="#64B5F6"/>
    <SolidColorBrush Color="#42A5F5"/>
    <SolidColorBrush Color="#2196F3"/>
</BrushCollection>
```

#### Green Success Theme
```xml
<BrushCollection x:Key="greenSuccess">
    <SolidColorBrush Color="#C8E6C9"/>
    <SolidColorBrush Color="#A5D6A7"/>
    <SolidColorBrush Color="#81C784"/>
    <SolidColorBrush Color="#66BB6A"/>
    <SolidColorBrush Color="#4CAF50"/>
    <SolidColorBrush Color="#43A047"/>
</BrushCollection>
```

#### Warm Sunset
```xml
<BrushCollection x:Key="warmSunset">
    <SolidColorBrush Color="#FFECB3"/>
    <SolidColorBrush Color="#FFD54F"/>
    <SolidColorBrush Color="#FFB74D"/>
    <SolidColorBrush Color="#FF9800"/>
    <SolidColorBrush Color="#FF6F00"/>
    <SolidColorBrush Color="#E65100"/>
</BrushCollection>
```

#### Purple Corporate
```xml
<BrushCollection x:Key="purpleCorporate">
    <SolidColorBrush Color="#E1BEE7"/>
    <SolidColorBrush Color="#CE93D8"/>
    <SolidColorBrush Color="#BA68C8"/>
    <SolidColorBrush Color="#AB47BC"/>
    <SolidColorBrush Color="#9C27B0"/>
    <SolidColorBrush Color="#8E24AA"/>
</BrushCollection>
```

#### Professional Contrast
```xml
<BrushCollection x:Key="professionalContrast">
    <SolidColorBrush Color="#3498DB"/>
    <SolidColorBrush Color="#E74C3C"/>
    <SolidColorBrush Color="#2ECC71"/>
    <SolidColorBrush Color="#F39C12"/>
    <SolidColorBrush Color="#9B59B6"/>
    <SolidColorBrush Color="#1ABC9C"/>
</BrushCollection>
```

## Gradient Styling

Apply gradient effects using `LinearGradientBrush` or `RadialGradientBrush`:

### Linear Gradients

```xml
<Grid>
    <Grid.Resources>
        <BrushCollection x:Key="gradientBrushes">
            <!-- Peach Gradient -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#FFE7C7"/>
                <GradientStop Offset="0" Color="#FCB69F"/>
            </LinearGradientBrush>
            
            <!-- Yellow Gradient -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#fadd7d"/>
                <GradientStop Offset="0" Color="#fccc2d"/>
            </LinearGradientBrush>
            
            <!-- Green Gradient -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#DCFA97"/>
                <GradientStop Offset="0" Color="#96E6A1"/>
            </LinearGradientBrush>
            
            <!-- Pink Gradient -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#DDD6F3"/>
                <GradientStop Offset="0" Color="#FAACA8"/>
            </LinearGradientBrush>
            
            <!-- Blue Gradient -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#A8EAEE"/>
                <GradientStop Offset="0" Color="#7BB0F9"/>
            </LinearGradientBrush>
        </BrushCollection>
    </Grid.Resources>
    
    <chart:SfFunnelChart x:Name="chart"
                         ItemsSource="{Binding Data}"
                         XBindingPath="Category"
                         YBindingPath="Value"
                         PaletteBrushes="{StaticResource gradientBrushes}">
    </chart:SfFunnelChart>
</Grid>
```

### C# Implementation

```csharp
SfFunnelChart chart = new SfFunnelChart();

List<Brush> customBrushes = new List<Brush>();

// Gradient 1: Peach
LinearGradientBrush gradientColor1 = new LinearGradientBrush();
GradientStop stop1 = new GradientStop() { Offset = 1, Color = Color.FromArgb(255, 255, 231, 199) };
GradientStop stop2 = new GradientStop() { Offset = 0, Color = Color.FromArgb(255, 252, 182, 159) };
gradientColor1.GradientStops.Add(stop1);
gradientColor1.GradientStops.Add(stop2);

// Gradient 2: Yellow
LinearGradientBrush gradientColor2 = new LinearGradientBrush();
stop1 = new GradientStop() { Offset = 1, Color = Color.FromArgb(255, 250, 221, 125) };
stop2 = new GradientStop() { Offset = 0, Color = Color.FromArgb(255, 252, 204, 45) };
gradientColor2.GradientStops.Add(stop1);
gradientColor2.GradientStops.Add(stop2);

// Add more gradients...

customBrushes.Add(gradientColor1);
customBrushes.Add(gradientColor2);

chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.PaletteBrushes = customBrushes;

this.Content = chart;
```

### Gradient Direction Control

```xml
<!-- Vertical Gradient (Top to Bottom) -->
<LinearGradientBrush StartPoint="0,0" EndPoint="0,1">
    <GradientStop Offset="0" Color="#667eea"/>
    <GradientStop Offset="1" Color="#764ba2"/>
</LinearGradientBrush>

<!-- Horizontal Gradient (Left to Right) -->
<LinearGradientBrush StartPoint="0,0" EndPoint="1,0">
    <GradientStop Offset="0" Color="#f093fb"/>
    <GradientStop Offset="1" Color="#f5576c"/>
</LinearGradientBrush>

<!-- Diagonal Gradient -->
<LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
    <GradientStop Offset="0" Color="#4facfe"/>
    <GradientStop Offset="1" Color="#00f2fe"/>
</LinearGradientBrush>
```

### Multi-Stop Gradients

```xml
<!-- Three-Color Gradient -->
<LinearGradientBrush>
    <GradientStop Offset="0" Color="#FF6B6B"/>
    <GradientStop Offset="0.5" Color="#FFD93D"/>
    <GradientStop Offset="1" Color="#6BCF7F"/>
</LinearGradientBrush>

<!-- Complex Multi-Stop -->
<LinearGradientBrush>
    <GradientStop Offset="0" Color="#ee0979"/>
    <GradientStop Offset="0.33" Color="#ff6a00"/>
    <GradientStop Offset="0.66" Color="#ffd700"/>
    <GradientStop Offset="1" Color="#00ff87"/>
</LinearGradientBrush>
```

### Radial Gradients

```xml
<BrushCollection x:Key="radialGradients">
    <!-- Radial Gradient 1 -->
    <RadialGradientBrush Center="0.5,0.5" RadiusX="0.5" RadiusY="0.5">
        <GradientStop Offset="0" Color="#FFE5E5"/>
        <GradientStop Offset="1" Color="#FF6B6B"/>
    </RadialGradientBrush>
    
    <!-- Radial Gradient 2 -->
    <RadialGradientBrush Center="0.5,0.5" RadiusX="0.5" RadiusY="0.5">
        <GradientStop Offset="0" Color="#FFF9E5"/>
        <GradientStop Offset="1" Color="#FFD700"/>
    </RadialGradientBrush>
</BrushCollection>
```

### Popular Gradient Themes

#### Sunset Vibes
```xml
<LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
    <GradientStop Offset="0" Color="#fa709a"/>
    <GradientStop Offset="1" Color="#fee140"/>
</LinearGradientBrush>
```

#### Ocean Blues
```xml
<LinearGradientBrush StartPoint="0,0" EndPoint="0,1">
    <GradientStop Offset="0" Color="#2E3192"/>
    <GradientStop Offset="1" Color="#1BFFFF"/>
</LinearGradientBrush>
```

#### Forest Green
```xml
<LinearGradientBrush StartPoint="0,0" EndPoint="1,0">
    <GradientStop Offset="0" Color="#134E5E"/>
    <GradientStop Offset="1" Color="#71B280"/>
</LinearGradientBrush>
```

#### Fire Flame
```xml
<LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
    <GradientStop Offset="0" Color="#f12711"/>
    <GradientStop Offset="1" Color="#f5af19"/>
</LinearGradientBrush>
```

## Best Practices

### 1. Color Selection

**Monochromatic Schemes:**
- Use variations of a single color for professional look
- Create hierarchy through lightness/darkness
- Ideal for business dashboards

**Analogous Colors:**
- Use colors next to each other on color wheel
- Creates harmonious, pleasing appearance
- Good for reports and presentations

**Complementary Colors:**
- Use opposite colors for high contrast
- Draws attention effectively
- Best for emphasizing specific segments

**Custom Branding:**
- Match your organization's color palette
- Maintain brand consistency across applications
- Consider accessibility guidelines

### 2. Gradient Usage

**When to use gradients:**
- Modern, polished appearance needed
- Visual interest without complexity
- Gradual progression representation

**When to avoid gradients:**
- Simple, minimal designs preferred
- High data density charts
- Print-focused documents (may not render well)
- Accessibility concerns (some users find them distracting)

### 3. Accessibility

**Color Contrast:**
- Ensure sufficient contrast for readability
- Test with color blindness simulators
- WCAG AA: 4.5:1 contrast ratio minimum

**Don't rely solely on color:**
- Use data labels to convey information
- Combine with patterns or textures when possible
- Provide alternative text descriptions

**Color Blindness Considerations:**
- Avoid red-green combinations
- Use blue-orange or purple-yellow instead
- Test with tools like Color Oracle

### 4. Performance

**Solid Colors:**
- Faster rendering than gradients
- Better performance with many segments
- Lower memory usage

**Gradients:**
- Slightly higher rendering cost
- Minimal impact for 5-10 segments
- Consider device capabilities

**Best practice:** Use solid colors for dynamic, frequently updating charts; use gradients for static or slowly updating visualizations.

### 5. Number of Colors

- **Minimum:** 3-4 colors for small datasets
- **Optimal:** 5-8 colors for typical funnels
- **Maximum:** Avoid more than 12 distinct colors (hard to distinguish)
- Colors repeat if more segments than colors in palette

## Common Patterns

### Corporate Blue Scheme
```xml
<chart:SfFunnelChart PaletteBrushes="{StaticResource corporateBlue}">
    <chart:SfFunnelChart.Resources>
        <BrushCollection x:Key="corporateBlue">
            <SolidColorBrush Color="#1565C0"/>
            <SolidColorBrush Color="#1976D2"/>
            <SolidColorBrush Color="#1E88E5"/>
            <SolidColorBrush Color="#2196F3"/>
            <SolidColorBrush Color="#42A5F5"/>
        </BrushCollection>
    </chart:SfFunnelChart.Resources>
</chart:SfFunnelChart>
```

### Modern Gradient Funnel
```xml
<chart:SfFunnelChart PaletteBrushes="{StaticResource modernGradients}"
                     ShowDataLabels="True">
    <!-- Gradient definitions here -->
</chart:SfFunnelChart>
```

### High Contrast Theme
```xml
<BrushCollection x:Key="highContrast">
    <SolidColorBrush Color="#000000"/>
    <SolidColorBrush Color="#FFFFFF"/>
    <SolidColorBrush Color="#FFD700"/>
    <SolidColorBrush Color="#FF0000"/>
    <SolidColorBrush Color="#00FF00"/>
</BrushCollection>
```

## Troubleshooting

### Colors Not Applying
- Verify `PaletteBrushes` property is set
- Check BrushCollection is defined in Resources
- Ensure StaticResource reference is correct
- Confirm x:Key matches the reference

### Gradients Not Visible
- Verify GradientStop Offset values (0.0 to 1.0)
- Check color values are valid
- Ensure gradient has at least 2 GradientStops
- Test with solid colors first

### Colors Repeating Unexpectedly
- Add more colors to the palette
- Check segment count vs color count
- This is normal behavior when segments exceed palette size

### Poor Color Contrast
- Use color contrast analyzers
- Adjust lightness/darkness
- Add data labels for clarity
- Test in different lighting conditions
