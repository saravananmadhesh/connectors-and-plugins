# Appearance and Styling

## Table of Contents
- [Overview](#overview)
- [Predefined Palette](#predefined-palette)
- [Custom Palette Brushes](#custom-palette-brushes)
- [Applying Gradients](#applying-gradients)
- [Color Customization Patterns](#color-customization-patterns)
- [Best Practices](#best-practices)

---

## Overview

The appearance of the SfPyramidChart can be customized using predefined palettes, custom color collections, or gradient brushes. These styling options allow you to create visually appealing charts that match your application's design language.

**Available Customization Methods:**
- **Predefined Palette:** Use the default built-in color scheme
- **Custom Palette:** Define your own collection of solid colors
- **Gradients:** Apply linear or radial gradients for rich visual effects

---

## Predefined Palette

The SfPyramidChart includes a default predefined palette that automatically applies colors to segments. This is the simplest way to add color to your chart.

### Using Default Palette

The default palette is applied automatically without any configuration:

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
// Default palette applied automatically
this.Content = chart;
```

**Default Color Scheme:**
The predefined palette provides a balanced, professional color scheme that works well for most scenarios. Each segment automatically receives a distinct color from the palette in sequential order.

---

## Custom Palette Brushes

Define your own color palette by creating a `BrushCollection` and assigning it to the `PaletteBrushes` property.

### Step 1: Define Custom Colors

Create a collection of `SolidColorBrush` objects:

**XAML:**
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
    
    <chart:SfPyramidChart x:Name="chart"                          
                          PaletteBrushes="{StaticResource customBrushes}"
                          ItemsSource="{Binding Data}"
                          XBindingPath="Category"
                          YBindingPath="Value">
    </chart:SfPyramidChart>
</Grid>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();

// Create custom brush collection
List<Brush> customBrushes = new List<Brush>();
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 77, 208, 225)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 38, 198, 218)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 188, 212)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 172, 193)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 151, 167)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 131, 143)));

// Apply custom palette
chart.PaletteBrushes = customBrushes;

chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

this.Content = chart;
```

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| **Palette** | ChartColorPalette | Set to `Custom` to use PaletteBrushes |
| **PaletteBrushes** | IList<Brush> | Collection of brushes for segments |

**Important Notes:**
- Must set `Palette="Custom"` when using custom brushes
- Colors are applied in the order they appear in the collection
- If you have more segments than colors, the palette cycles through colors again
- Can include any WinUI brush type (SolidColorBrush, GradientBrush, etc.)

### Color Cycling Behavior

```csharp
// Example: 3 colors for 6 segments
List<Brush> customBrushes = new List<Brush>()
{
    new SolidColorBrush(Colors.Red),    // Segment 0, 3
    new SolidColorBrush(Colors.Blue),   // Segment 1, 4
    new SolidColorBrush(Colors.Green)   // Segment 2, 5
};

// Colors will cycle: Red, Blue, Green, Red, Blue, Green
```

---

## Applying Gradients

Gradients add depth and visual interest to pyramid segments. Use `LinearGradientBrush` or `RadialGradientBrush` within your palette collection.

### Linear Gradient Brushes

**XAML:**
```xml
<Grid>
    <Grid.Resources>
        <BrushCollection x:Key="gradientBrushes">
            <!-- Gradient 1: Orange to Pink -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#FFE7C7"/>
                <GradientStop Offset="0" Color="#FCB69F"/>
            </LinearGradientBrush>
            
            <!-- Gradient 2: Yellow -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#fadd7d"/>
                <GradientStop Offset="0" Color="#fccc2d"/>
            </LinearGradientBrush>
            
            <!-- Gradient 3: Green -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#DCFA97"/>
                <GradientStop Offset="0" Color="#96E6A1"/>
            </LinearGradientBrush>
            
            <!-- Gradient 4: Purple to Pink -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#DDD6F3"/>
                <GradientStop Offset="0" Color="#FAACA8"/>
            </LinearGradientBrush>
            
            <!-- Gradient 5: Blue -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#A8EAEE"/>
                <GradientStop Offset="0" Color="#7BB0F9"/>
            </LinearGradientBrush>
        </BrushCollection>
    </Grid.Resources>
    
    <chart:SfPyramidChart PaletteBrushes="{StaticResource gradientBrushes}"
                          ItemsSource="{Binding Data}"
                          XBindingPath="Category"
                          YBindingPath="Value">
    </chart:SfPyramidChart>
</Grid>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();

List<Brush> gradientBrushes = new List<Brush>();

// Gradient 1: Orange to Pink
LinearGradientBrush gradient1 = new LinearGradientBrush();
gradient1.GradientStops.Add(new GradientStop { Offset = 1, Color = Color.FromArgb(255, 255, 231, 199) });
gradient1.GradientStops.Add(new GradientStop { Offset = 0, Color = Color.FromArgb(255, 252, 182, 159) });
gradientBrushes.Add(gradient1);

// Gradient 2: Yellow
LinearGradientBrush gradient2 = new LinearGradientBrush();
gradient2.GradientStops.Add(new GradientStop { Offset = 1, Color = Color.FromArgb(255, 250, 221, 125) });
gradient2.GradientStops.Add(new GradientStop { Offset = 0, Color = Color.FromArgb(255, 252, 204, 45) });
gradientBrushes.Add(gradient2);

// Gradient 3: Green
LinearGradientBrush gradient3 = new LinearGradientBrush();
gradient3.GradientStops.Add(new GradientStop { Offset = 1, Color = Color.FromArgb(255, 220, 250, 151) });
gradient3.GradientStops.Add(new GradientStop { Offset = 0, Color = Color.FromArgb(255, 150, 230, 161) });
gradientBrushes.Add(gradient3);

// Apply gradient palette
chart.PaletteBrushes = gradientBrushes;

chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

this.Content = chart;
```

### Gradient Properties

| Property | Type | Description |
|----------|------|-------------|
| **Offset** | double | Position in gradient (0.0 to 1.0) |
| **Color** | Color | Color at this gradient stop |

**Gradient Direction:**
- `Offset="0"`: Start of gradient (typically top/left)
- `Offset="1"`: End of gradient (typically bottom/right)
- Can add multiple GradientStops for complex color transitions

### Radial Gradient Example

```xml
<RadialGradientBrush>
    <GradientStop Offset="0" Color="#FFD700"/>
    <GradientStop Offset="1" Color="#FF8C00"/>
</RadialGradientBrush>
```

---

## Color Customization Patterns

### Pattern 1: Monochromatic Scheme

Use shades of a single color for a cohesive look:

```xml
<BrushCollection x:Key="monochromaticBlue">
    <SolidColorBrush Color="#0D47A1"/>
    <SolidColorBrush Color="#1976D2"/>
    <SolidColorBrush Color="#2196F3"/>
    <SolidColorBrush Color="#42A5F5"/>
    <SolidColorBrush Color="#64B5F6"/>
    <SolidColorBrush Color="#90CAF9"/>
</BrushCollection>
```

### Pattern 2: Complementary Colors

Use opposite colors from the color wheel:

```xml
<BrushCollection x:Key="complementary">
    <SolidColorBrush Color="#FF5722"/>  <!-- Orange -->
    <SolidColorBrush Color="#2196F3"/>  <!-- Blue -->
    <SolidColorBrush Color="#FF6F00"/>  <!-- Deep Orange -->
    <SolidColorBrush Color="#03A9F4"/>  <!-- Light Blue -->
</BrushCollection>
```

### Pattern 3: Analogous Colors

Use adjacent colors on the color wheel:

```xml
<BrushCollection x:Key="analogous">
    <SolidColorBrush Color="#FFEB3B"/>  <!-- Yellow -->
    <SolidColorBrush Color="#FFC107"/>  <!-- Amber -->
    <SolidColorBrush Color="#FF9800"/>  <!-- Orange -->
    <SolidColorBrush Color="#FF5722"/>  <!-- Deep Orange -->
</BrushCollection>
```

### Pattern 4: Corporate/Brand Colors

Match your organization's color scheme:

```xml
<BrushCollection x:Key="brandColors">
    <SolidColorBrush Color="#1E3A8A"/>  <!-- Primary -->
    <SolidColorBrush Color="#3B82F6"/>  <!-- Secondary -->
    <SolidColorBrush Color="#60A5FA"/>  <!-- Accent -->
    <SolidColorBrush Color="#93C5FD"/>  <!-- Light -->
</BrushCollection>
```

### Pattern 5: Seasonal Themes

```xml
<!-- Spring Theme -->
<BrushCollection x:Key="springColors">
    <SolidColorBrush Color="#FFB3BA"/>  <!-- Pink -->
    <SolidColorBrush Color="#FFDFBA"/>  <!-- Peach -->
    <SolidColorBrush Color="#FFFFBA"/>  <!-- Yellow -->
    <SolidColorBrush Color="#BAFFC9"/>  <!-- Mint -->
    <SolidColorBrush Color="#BAE1FF"/>  <!-- Sky -->
</BrushCollection>

<!-- Autumn Theme -->
<BrushCollection x:Key="autumnColors">
    <SolidColorBrush Color="#D35400"/>  <!-- Burnt Orange -->
    <SolidColorBrush Color="#E67E22"/>  <!-- Pumpkin -->
    <SolidColorBrush Color="#F39C12"/>  <!-- Sunflower -->
    <SolidColorBrush Color="#784212"/>  <!-- Brown -->
    <SolidColorBrush Color="#E74C3C"/>  <!-- Red -->
</BrushCollection>
```

---

## Best Practices

### Color Selection Guidelines

1. **Contrast:** Ensure sufficient contrast between adjacent segments
2. **Accessibility:** Consider color-blind friendly palettes
3. **Consistency:** Match your application's overall design theme
4. **Count:** Provide at least as many colors as you have data points
5. **Visibility:** Test colors on different backgrounds and screen brightness

### Recommended Color Counts

| Segment Count | Recommended Colors | Strategy |
|---------------|-------------------|----------|
| 3-5 segments | 5-6 colors | Distinct hues |
| 6-8 segments | 8-10 colors | Varied shades |
| 9+ segments | 10-12 colors | Mix solids and gradients |

### Performance Considerations

- **Solid colors** have slightly better performance than gradients
- **Simple gradients** (2 stops) perform better than complex ones (5+ stops)
- Palette definition has minimal impact; applied brushes matter more

### Color Accessibility

```xml
<!-- WCAG AA Compliant Color Scheme -->
<BrushCollection x:Key="accessibleColors">
    <SolidColorBrush Color="#0077B6"/>  <!-- High contrast blue -->
    <SolidColorBrush Color="#F77F00"/>  <!-- High contrast orange -->
    <SolidColorBrush Color="#06A77D"/>  <!-- High contrast green -->
    <SolidColorBrush Color="#D62828"/>  <!-- High contrast red -->
    <SolidColorBrush Color="#6A4C93"/>  <!-- High contrast purple -->
</BrushCollection>
```

### Common Pitfalls

**❌ Avoid:**
```xml
<!-- Too similar colors -->
<SolidColorBrush Color="#2196F3"/>
<SolidColorBrush Color="#2199F3"/>  <!-- Only 1 digit different -->

<!-- Low contrast -->
<SolidColorBrush Color="#FFEB3B"/>  <!-- Light yellow -->
<SolidColorBrush Color="#FFFFCC"/>  <!-- Very light yellow -->
```

**✅ Prefer:**
```xml
<!-- Distinct, accessible colors -->
<SolidColorBrush Color="#2196F3"/>  <!-- Blue -->
<SolidColorBrush Color="#F44336"/>  <!-- Red -->
<SolidColorBrush Color="#4CAF50"/>  <!-- Green -->
```

### Testing Your Palette

Test your color scheme by:
1. Viewing on different display types (LCD, OLED)
2. Checking in light and dark mode
3. Using color-blindness simulators
4. Testing with actual data that has many segments
5. Reviewing with stakeholders

---

## Complete Example

Here's a full example combining custom colors and gradients:

```xml
<Window
    x:Class="PyramidChartApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:local="using:PyramidChartApp">
    
    <Grid>
        <Grid.Resources>
            <!-- Mixed solid and gradient brushes -->
            <BrushCollection x:Key="mixedPalette">
                <!-- Solid color -->
                <SolidColorBrush Color="#FF5722"/>
                
                <!-- Linear gradient -->
                <LinearGradientBrush>
                    <GradientStop Offset="0" Color="#FFD54F"/>
                    <GradientStop Offset="1" Color="#FFA726"/>
                </LinearGradientBrush>
                
                <!-- Solid color -->
                <SolidColorBrush Color="#66BB6A"/>
                
                <!-- Linear gradient -->
                <LinearGradientBrush>
                    <GradientStop Offset="0" Color="#42A5F5"/>
                    <GradientStop Offset="1" Color="#1976D2"/>
                </LinearGradientBrush>
                
                <!-- Solid color -->
                <SolidColorBrush Color="#AB47BC"/>
            </BrushCollection>
        </Grid.Resources>
        
        <chart:SfPyramidChart Header="Sales by Region"                              
                              PaletteBrushes="{StaticResource mixedPalette}"
                              ItemsSource="{Binding Data}"
                              XBindingPath="Region"
                              YBindingPath="Sales"
                              EnableTooltip="True"
                              ShowDataLabels="True">
            
            <chart:SfPyramidChart.DataContext>
                <local:ChartViewModel/>
            </chart:SfPyramidChart.DataContext>
            
            <chart:SfPyramidChart.Legend>
                <chart:ChartLegend/>
            </chart:SfPyramidChart.Legend>
            
        </chart:SfPyramidChart>
    </Grid>
</Window>
```

This creates a visually rich pyramid chart with alternating solid colors and gradients, providing depth while maintaining clarity.
