# Custom Layouts in WinUI Shimmer

## Table of Contents
- [Overview](#overview)
- [CustomLayout Property](#customlayout-property)
- [Building Custom Layouts](#building-custom-layouts)
- [Using Rectangle Elements](#using-rectangle-elements)
- [Using Ellipse Elements](#using-ellipse-elements)
- [Complex Layout Examples](#complex-layout-examples)
- [Best Practices](#best-practices)
- [Performance Considerations](#performance-considerations)

## Overview

The `CustomLayout` property allows you to create shimmer layouts that exactly match your specific content structure. When the 7 built-in types don't fit your needs, custom layouts provide complete control over the shimmer design.

**Use Custom Layouts When:**
- Your content structure is unique
- Built-in types don't match your layout
- You need precise control over placeholder positions
- Creating branded/styled loading experiences

## CustomLayout Property

The `CustomLayout` property accepts any `UIElement`, typically a `Grid`, `StackPanel`, or `Canvas` containing shape elements.

**Property Details:**
- **Type:** `UIElement`
- **Default:** `null` (uses Type property instead)
- **Common Usage:** Grid with Rectangle and Ellipse elements

**XAML:**
```xaml
<syncfusion:SfShimmer>
    <syncfusion:SfShimmer.CustomLayout>
        <!-- Your custom layout here -->
    </syncfusion:SfShimmer.CustomLayout>
</syncfusion:SfShimmer>
```

**C#:**
```csharp
Grid customLayout = new Grid();
// Add elements to customLayout
shimmer.CustomLayout = customLayout;
```

## Building Custom Layouts

### Basic Structure

Custom layouts typically use:
- **Grid** - For structured, grid-based layouts
- **StackPanel** - For simple stacked elements
- **Canvas** - For absolute positioning
- **Rectangle** - For text lines, content blocks
- **Ellipse** - For circular avatars, icons

### Simple Custom Layout Example

```xaml
<syncfusion:SfShimmer>
    <syncfusion:SfShimmer.CustomLayout>
        <StackPanel Spacing="10">
            <!-- Title -->
            <Rectangle Height="20" Width="250" 
                      RadiusX="3" RadiusY="3"
                      HorizontalAlignment="Left"/>
            
            <!-- Subtitle -->
            <Rectangle Height="15" Width="200" 
                      RadiusX="3" RadiusY="3"
                      HorizontalAlignment="Left"/>
            
            <!-- Content -->
            <Rectangle Height="100" 
                      RadiusX="5" RadiusY="5"/>
        </StackPanel>
    </syncfusion:SfShimmer.CustomLayout>
</syncfusion:SfShimmer>
```

## Using Rectangle Elements

Rectangles are the primary building blocks for shimmer placeholders.

### Properties

- **Width/Height** - Size of placeholder
- **RadiusX/RadiusY** - Rounded corners (3-5 for text, 5-10 for content blocks)
- **HorizontalAlignment/VerticalAlignment** - Positioning
- **Margin** - Spacing around element

### Text Line Placeholders

```xaml
<!-- Title (large text) -->
<Rectangle Height="20" Width="300" RadiusX="3" RadiusY="3"/>

<!-- Body text -->
<Rectangle Height="14" Width="400" RadiusX="3" RadiusY="3"/>

<!-- Caption/small text -->
<Rectangle Height="12" Width="150" RadiusX="2" RadiusY="2"/>
```

### Content Block Placeholders

```xaml
<!-- Image placeholder -->
<Rectangle Height="200" Width="300" RadiusX="8" RadiusY="8"/>

<!-- Card placeholder -->
<Rectangle Height="150" RadiusX="10" RadiusY="10"/>

<!-- Button placeholder -->
<Rectangle Height="40" Width="120" RadiusX="20" RadiusY="20"/>
```

### Variable Width Lines (Natural Text)

Simulate real text with varying line widths:

```xaml
<StackPanel Spacing="8">
    <Rectangle Height="14" Width="450" RadiusX="3" RadiusY="3"/>
    <Rectangle Height="14" Width="420" RadiusX="3" RadiusY="3"/>
    <Rectangle Height="14" Width="380" RadiusX="3" RadiusY="3"/>
    <Rectangle Height="14" Width="400" RadiusX="3" RadiusY="3"/>
    <Rectangle Height="14" Width="250" RadiusX="3" RadiusY="3"/>
</StackPanel>
```

## Using Ellipse Elements

Ellipses create circular placeholders for avatars and icons.

### Circular Avatar

```xaml
<!-- Small avatar (32x32) -->
<Ellipse Width="32" Height="32"/>

<!-- Medium avatar (48x48) -->
<Ellipse Width="48" Height="48"/>

<!-- Large avatar (64x64) -->
<Ellipse Width="64" Height="64"/>

<!-- Profile picture (100x100) -->
<Ellipse Width="100" Height="100"/>
```

### Icon Placeholder

```xaml
<!-- Small icon -->
<Ellipse Width="24" Height="24"/>

<!-- Medium icon -->
<Ellipse Width="32" Height="32"/>
```

## Complex Layout Examples

### Example 1: User Card Layout

```xaml
<syncfusion:SfShimmer>
    <syncfusion:SfShimmer.CustomLayout>
        <Grid ColumnSpacing="15" RowSpacing="10" Padding="15">
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="60"/>
                <ColumnDefinition Width="*"/>
            </Grid.ColumnDefinitions>
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
            </Grid.RowDefinitions>
            
            <!-- Avatar -->
            <Ellipse Grid.Column="0" Grid.RowSpan="3" 
                    Width="60" Height="60"/>
            
            <!-- Name -->
            <Rectangle Grid.Column="1" Grid.Row="0" 
                      Height="18" Width="180" 
                      RadiusX="3" RadiusY="3"
                      HorizontalAlignment="Left"/>
            
            <!-- Role -->
            <Rectangle Grid.Column="1" Grid.Row="1" 
                      Height="14" Width="140" 
                      RadiusX="3" RadiusY="3"
                      HorizontalAlignment="Left"/>
            
            <!-- Email -->
            <Rectangle Grid.Column="1" Grid.Row="2" 
                      Height="14" Width="200" 
                      RadiusX="3" RadiusY="3"
                      HorizontalAlignment="Left"/>
        </Grid>
    </syncfusion:SfShimmer.CustomLayout>
</syncfusion:SfShimmer>
```

### Example 2: Blog Post Card

```xaml
<syncfusion:SfShimmer>
    <syncfusion:SfShimmer.CustomLayout>
        <Grid RowSpacing="12">
            <Grid.RowDefinitions>
                <RowDefinition Height="200"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
            </Grid.RowDefinitions>
            
            <!-- Featured image -->
            <Rectangle Grid.Row="0" RadiusX="8" RadiusY="8"/>
            
            <!-- Title -->
            <Rectangle Grid.Row="1" Height="22" Width="350" 
                      RadiusX="3" RadiusY="3"
                      HorizontalAlignment="Left"/>
            
            <!-- Excerpt -->
            <StackPanel Grid.Row="2" Spacing="6">
                <Rectangle Height="14" Width="400" RadiusX="3" RadiusY="3"/>
                <Rectangle Height="14" Width="380" RadiusX="3" RadiusY="3"/>
                <Rectangle Height="14" Width="320" RadiusX="3" RadiusY="3"/>
            </StackPanel>
            
            <!-- Metadata (author, date) -->
            <StackPanel Grid.Row="3" Orientation="Horizontal" Spacing="15">
                <Ellipse Width="24" Height="24"/>
                <Rectangle Height="12" Width="100" RadiusX="2" RadiusY="2"/>
                <Rectangle Height="12" Width="80" RadiusX="2" RadiusY="2"/>
            </StackPanel>
        </Grid>
    </syncfusion:SfShimmer.CustomLayout>
</syncfusion:SfShimmer>
```

### Example 3: Dashboard Stat Card

```xaml
<syncfusion:SfShimmer>
    <syncfusion:SfShimmer.CustomLayout>
        <Grid RowSpacing="10" Padding="20">
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
            </Grid.RowDefinitions>
            
            <!-- Icon/Metric -->
            <Ellipse Grid.Row="0" Width="48" Height="48" 
                    HorizontalAlignment="Left"/>
            
            <!-- Value -->
            <Rectangle Grid.Row="1" Height="32" Width="120" 
                      RadiusX="4" RadiusY="4"
                      HorizontalAlignment="Left"/>
            
            <!-- Label -->
            <Rectangle Grid.Row="2" Height="16" Width="160" 
                      RadiusX="3" RadiusY="3"
                      HorizontalAlignment="Left"/>
        </Grid>
    </syncfusion:SfShimmer.CustomLayout>
</syncfusion:SfShimmer>
```

### Example 4: E-commerce Product Detail

```xaml
<syncfusion:SfShimmer>
    <syncfusion:SfShimmer.CustomLayout>
        <Grid ColumnSpacing="20" RowSpacing="15">
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="300"/>
                <ColumnDefinition Width="*"/>
            </Grid.ColumnDefinitions>
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
            </Grid.RowDefinitions>
            
            <!-- Product image -->
            <Rectangle Grid.Column="0" Grid.RowSpan="5" 
                      Height="400" RadiusX="10" RadiusY="10"/>
            
            <!-- Product name -->
            <Rectangle Grid.Column="1" Grid.Row="0" 
                      Height="28" Width="400" 
                      RadiusX="4" RadiusY="4"
                      HorizontalAlignment="Left"/>
            
            <!-- Price -->
            <Rectangle Grid.Column="1" Grid.Row="1" 
                      Height="24" Width="120" 
                      RadiusX="4" RadiusY="4"
                      HorizontalAlignment="Left"/>
            
            <!-- Rating -->
            <StackPanel Grid.Column="1" Grid.Row="2" 
                       Orientation="Horizontal" Spacing="10">
                <Rectangle Height="20" Width="100" RadiusX="3" RadiusY="3"/>
                <Rectangle Height="16" Width="60" RadiusX="3" RadiusY="3"/>
            </StackPanel>
            
            <!-- Description -->
            <StackPanel Grid.Column="1" Grid.Row="3" Spacing="8">
                <Rectangle Height="14" Width="500" RadiusX="3" RadiusY="3"/>
                <Rectangle Height="14" Width="480" RadiusX="3" RadiusY="3"/>
                <Rectangle Height="14" Width="450" RadiusX="3" RadiusY="3"/>
                <Rectangle Height="14" Width="490" RadiusX="3" RadiusY="3"/>
                <Rectangle Height="14" Width="350" RadiusX="3" RadiusY="3"/>
            </StackPanel>
            
            <!-- Action buttons -->
            <StackPanel Grid.Column="1" Grid.Row="4" 
                       Orientation="Horizontal" Spacing="10">
                <Rectangle Height="44" Width="140" RadiusX="22" RadiusY="22"/>
                <Rectangle Height="44" Width="140" RadiusX="22" RadiusY="22"/>
            </StackPanel>
        </Grid>
    </syncfusion:SfShimmer.CustomLayout>
</syncfusion:SfShimmer>
```

### Example 5: Chat Message Layout

```xaml
<syncfusion:SfShimmer>
    <syncfusion:SfShimmer.CustomLayout>
        <StackPanel Spacing="15">
            <!-- Message 1 -->
            <Grid ColumnSpacing="10">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="40"/>
                    <ColumnDefinition Width="*"/>
                </Grid.ColumnDefinitions>
                
                <Ellipse Grid.Column="0" Width="40" Height="40"/>
                
                <StackPanel Grid.Column="1" Spacing="5">
                    <Rectangle Height="12" Width="80" RadiusX="2" RadiusY="2"/>
                    <Rectangle Height="40" Width="250" RadiusX="8" RadiusY="8"/>
                </StackPanel>
            </Grid>
            
            <!-- Message 2 -->
            <Grid ColumnSpacing="10">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="40"/>
                    <ColumnDefinition Width="*"/>
                </Grid.ColumnDefinitions>
                
                <Ellipse Grid.Column="0" Width="40" Height="40"/>
                
                <StackPanel Grid.Column="1" Spacing="5">
                    <Rectangle Height="12" Width="80" RadiusX="2" RadiusY="2"/>
                    <Rectangle Height="60" Width="300" RadiusX="8" RadiusY="8"/>
                </StackPanel>
            </Grid>
            
            <!-- Message 3 -->
            <Grid ColumnSpacing="10">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="40"/>
                    <ColumnDefinition Width="*"/>
                </Grid.ColumnDefinitions>
                
                <Ellipse Grid.Column="0" Width="40" Height="40"/>
                
                <StackPanel Grid.Column="1" Spacing="5">
                    <Rectangle Height="12" Width="80" RadiusX="2" RadiusY="2"/>
                    <Rectangle Height="35" Width="200" RadiusX="8" RadiusY="8"/>
                </StackPanel>
            </Grid>
        </StackPanel>
    </syncfusion:SfShimmer.CustomLayout>
</syncfusion:SfShimmer>
```

## Best Practices

### 1. Match Actual Content Structure

Design shimmer that closely resembles the real content:

```xaml
<!-- ✓ Good - Matches content structure -->
<syncfusion:SfShimmer>
    <syncfusion:SfShimmer.CustomLayout>
        <!-- Matches your actual Grid layout -->
        <Grid ColumnSpacing="10" RowSpacing="10">
            <!-- Same structure as actual content -->
        </Grid>
    </syncfusion:SfShimmer.CustomLayout>
</syncfusion:SfShimmer>

<!-- ✗ Avoid - Generic, doesn't match content -->
<syncfusion:SfShimmer>
    <syncfusion:SfShimmer.CustomLayout>
        <StackPanel>
            <Rectangle Height="50"/>
            <Rectangle Height="50"/>
        </StackPanel>
    </syncfusion:SfShimmer.CustomLayout>
</syncfusion:SfShimmer>
```

### 2. Use Appropriate Corner Radius

```xaml
<!-- Text lines: Small radius (2-3px) -->
<Rectangle Height="14" Width="300" RadiusX="3" RadiusY="3"/>

<!-- Content blocks: Medium radius (5-8px) -->
<Rectangle Height="100" RadiusX="5" RadiusY="5"/>

<!-- Cards: Larger radius (8-12px) -->
<Rectangle Height="200" RadiusX="10" RadiusY="10"/>

<!-- Buttons: Full rounding -->
<Rectangle Height="40" Width="120" RadiusX="20" RadiusY="20"/>
```

### 3. Maintain Consistent Spacing

```xaml
<Grid RowSpacing="10" ColumnSpacing="15" Padding="20">
    <!-- Consistent spacing throughout -->
</Grid>
```

### 4. Variable Line Widths for Text

```xaml
<!-- ✓ Natural - Varying widths -->
<StackPanel Spacing="6">
    <Rectangle Height="14" Width="450" RadiusX="3" RadiusY="3"/>
    <Rectangle Height="14" Width="420" RadiusX="3" RadiusY="3"/>
    <Rectangle Height="14" Width="280" RadiusX="3" RadiusY="3"/>
</StackPanel>

<!-- ✗ Unnatural - All same width -->
<StackPanel Spacing="6">
    <Rectangle Height="14" Width="400" RadiusX="3" RadiusY="3"/>
    <Rectangle Height="14" Width="400" RadiusX="3" RadiusY="3"/>
    <Rectangle Height="14" Width="400" RadiusX="3" RadiusY="3"/>
</StackPanel>
```

### 5. Consider Aspect Ratios

```xaml
<!-- 16:9 for video -->
<Rectangle Width="320" Height="180" RadiusX="8" RadiusY="8"/>

<!-- 1:1 for square images/avatars -->
<Rectangle Width="200" Height="200" RadiusX="10" RadiusY="10"/>

<!-- 3:4 for portrait images -->
<Rectangle Width="240" Height="320" RadiusX="8" RadiusY="8"/>
```

### 6. Use HorizontalAlignment for Natural Layout

```xaml
<!-- Left-aligned text (natural) -->
<Rectangle Height="14" Width="300" 
          RadiusX="3" RadiusY="3"
          HorizontalAlignment="Left"/>

<!-- Centered title -->
<Rectangle Height="20" Width="250" 
          RadiusX="3" RadiusY="3"
          HorizontalAlignment="Center"/>
```

## Performance Considerations

### Optimize Element Count

```csharp
// ✓ Good - Reasonable element count
<Grid> <!-- 5-15 elements typically fine -->
    <Ellipse/>
    <Rectangle/>
    <Rectangle/>
    <Rectangle/>
</Grid>

// ✗ Avoid - Excessive elements
<Grid> <!-- 50+ elements may impact performance -->
    <!-- Too many small rectangles -->
</Grid>
```

### Reuse Layouts

Create reusable custom layout resources:

```xaml
<Page.Resources>
    <Grid x:Key="CustomCardShimmer" RowSpacing="10">
        <Grid.RowDefinitions>
            <RowDefinition Height="150"/>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="Auto"/>
        </Grid.RowDefinitions>
        
        <Rectangle Grid.Row="0" RadiusX="8" RadiusY="8"/>
        <Rectangle Grid.Row="1" Height="18" Width="200" RadiusX="3" RadiusY="3"/>
        <Rectangle Grid.Row="2" Height="14" Width="250" RadiusX="3" RadiusY="3"/>
    </Grid>
</Page.Resources>

<!-- Use the resource -->
<syncfusion:SfShimmer CustomLayout="{StaticResource CustomCardShimmer}"/>
```

### Memory Impact

- Custom layouts use minimal memory
- GPU-accelerated rendering
- Safe to use multiple custom shimmers simultaneously

## Next Steps

- **Getting Started:** See [getting-started.md](getting-started.md) for installation and basic usage
- **Built-in Types:** See [built-in-types.md](built-in-types.md) if a built-in type might work instead
- **Customization:** See [customization.md](customization.md) to adjust colors and animation
