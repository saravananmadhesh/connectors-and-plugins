# Customization in WinUI Rating

The WinUI Rating control offers extensive customization options to match your application's design and user experience requirements. This guide covers all customization features available.

## Table of Contents
- [Style Customization](#style-customization)
- [Item Size](#item-size)
- [Orientation](#orientation)
- [Read-Only Mode](#read-only-mode)
- [Clear Rating](#clear-rating)
- [Placeholder Value](#placeholder-value)
- [Combining Customizations](#combining-customizations)

## Style Customization

Customize the appearance of rated (filled) and unrated (empty) items using the `RatedItemStyle` and `UnratedItemStyle` properties.

### Basic Styling

**Properties:**
- `RatedItemStyle` - Style for selected/filled rating items
- `UnratedItemStyle` - Style for unselected/empty rating items

**XAML:**
```xml
<Page.Resources>
    <!-- Style for rated (filled) items -->
    <Style TargetType="Path" x:Key="ratedStyle">
        <Setter Property="Fill" Value="#FFD700"/>
        <Setter Property="Stroke" Value="#FFD700"/>
        <Setter Property="StrokeThickness" Value="1"/>
    </Style>
    
    <!-- Style for unrated (empty) items -->
    <Style TargetType="Path" x:Key="unratedStyle">
        <Setter Property="Fill" Value="LightGray"/>
        <Setter Property="Stroke" Value="LightGray"/>
        <Setter Property="StrokeThickness" Value="1"/>
    </Style>
</Page.Resources>

<syncfusion:SfRating 
    Value="3"
    ItemsCount="5" 
    RatedItemStyle="{StaticResource ratedStyle}"
    UnratedItemStyle="{StaticResource unratedStyle}"/>
```

**C#:**
```csharp
using Windows.UI;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Shapes;

// RatedItemStyle
Style ratedStyle = new Style(typeof(Path));

Setter fillSetter = new Setter();
fillSetter.Property = Path.FillProperty;
fillSetter.Value = new SolidColorBrush(Color.FromArgb(255, 255, 215, 0)); // Gold
ratedStyle.Setters.Add(fillSetter);

Setter strokeSetter = new Setter();
strokeSetter.Property = Path.StrokeProperty;
strokeSetter.Value = new SolidColorBrush(Color.FromArgb(255, 255, 215, 0));
ratedStyle.Setters.Add(strokeSetter);

Setter thicknessSetter = new Setter();
thicknessSetter.Property = Path.StrokeThicknessProperty;
thicknessSetter.Value = 1;
ratedStyle.Setters.Add(thicknessSetter);

// UnratedItemStyle
Style unratedStyle = new Style(typeof(Path));

Setter unratedFillSetter = new Setter();
unratedFillSetter.Property = Path.FillProperty;
unratedFillSetter.Value = new SolidColorBrush(Colors.LightGray);
unratedStyle.Setters.Add(unratedFillSetter);

Setter unratedStrokeSetter = new Setter();
unratedStrokeSetter.Property = Path.StrokeProperty;
unratedStrokeSetter.Value = new SolidColorBrush(Colors.LightGray);
unratedStyle.Setters.Add(unratedStrokeSetter);

Setter unratedThicknessSetter = new Setter();
unratedThicknessSetter.Property = Path.StrokeThicknessProperty;
unratedThicknessSetter.Value = 1;
unratedStyle.Setters.Add(unratedThicknessSetter);

// Apply styles
SfRating rating = new SfRating();
rating.Value = 3;
rating.ItemsCount = 5;
rating.RatedItemStyle = ratedStyle;
rating.UnratedItemStyle = unratedStyle;
```

### Custom Color Schemes

**Blue Theme:**
```xml
<Page.Resources>
    <Style TargetType="Path" x:Key="blueRatedStyle">
        <Setter Property="Fill" Value="#0078D4"/>
        <Setter Property="Stroke" Value="#0078D4"/>
    </Style>
    <Style TargetType="Path" x:Key="blueUnratedStyle">
        <Setter Property="Fill" Value="#E6E6E6"/>
        <Setter Property="Stroke" Value="#CCCCCC"/>
    </Style>
</Page.Resources>

<syncfusion:SfRating 
    Value="4"
    ItemsCount="5"
    RatedItemStyle="{StaticResource blueRatedStyle}"
    UnratedItemStyle="{StaticResource blueUnratedStyle}"/>
```

**Red Theme (for negative feedback):**
```xml
<Page.Resources>
    <Style TargetType="Path" x:Key="redRatedStyle">
        <Setter Property="Fill" Value="#E74C3C"/>
        <Setter Property="Stroke" Value="#C0392B"/>
    </Style>
    <Style TargetType="Path" x:Key="redUnratedStyle">
        <Setter Property="Fill" Value="Transparent"/>
        <Setter Property="Stroke" Value="#CCCCCC"/>
        <Setter Property="StrokeThickness" Value="2"/>
    </Style>
</Page.Resources>

<syncfusion:SfRating 
    Value="2"
    ItemsCount="5"
    RatedItemStyle="{StaticResource redRatedStyle}"
    UnratedItemStyle="{StaticResource redUnratedStyle}"/>
```

**Theme-Adaptive Styling:**
```xml
<Page.Resources>
    <Style TargetType="Path" x:Key="accentRatedStyle">
        <Setter Property="Fill" Value="{ThemeResource SystemAccentColor}"/>
        <Setter Property="Stroke" Value="{ThemeResource SystemAccentColor}"/>
    </Style>
    <Style TargetType="Path" x:Key="subtleUnratedStyle">
> See also: [references/customization-advanced.md](customization-advanced.md) for Read-Only Mode, Clear Rating, Placeholder Value, Combining Customizations, and examples.
    </Style>
</Page.Resources>

<syncfusion:SfRating 
    Value="3"
    ItemsCount="5"
    RatedItemStyle="{StaticResource accentRatedStyle}"
    UnratedItemStyle="{StaticResource subtleUnratedStyle}"/>
```

## Item Size

Control the size of rating items using the `ItemSize` property.

**Property:** `ItemSize`  
**Type:** `double`  
**Default:** `24`

### Setting Item Size

**XAML:**
```xml
<syncfusion:SfRating 
    Value="3"
    ItemsCount="5" 
    ItemSize="50"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.Value = 3;
rating.ItemsCount = 5;
rating.ItemSize = 50;
```

### Common Size Guidelines

| Size | Use Case | Context |
|------|----------|---------|
| 16-20 | Small inline ratings | Lists, tables, compact views |
| 24-32 | Standard forms | Default, general purpose |
| 40-50 | Prominent ratings | Hero sections, main feedback |
| 60+ | Large displays | Kiosks, touch interfaces |

### Size Examples

**Small (16px) - In Lists:**
```xml
<ListView ItemsSource="{Binding Products}">
    <ListView.ItemTemplate>
        <DataTemplate>
            <Grid Padding="10">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="*"/>
                    <ColumnDefinition Width="Auto"/>
                </Grid.ColumnDefinitions>
                
                <TextBlock Grid.Column="0" Text="{Binding Name}"/>
                <syncfusion:SfRating 
                    Grid.Column="1"
                    Value="{Binding Rating}" 
                    ItemsCount="5"
                    ItemSize="16"
                    IsReadOnly="True"/>
            </Grid>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

**Large (60px) - Feedback Form:**
```xml
<StackPanel HorizontalAlignment="Center" VerticalAlignment="Center">
    <TextBlock 
        Text="How was your experience?" 
        FontSize="24" 
        FontWeight="Bold"
        HorizontalAlignment="Center"
        Margin="0,0,0,20"/>
    <syncfusion:SfRating 
        Value="0" 
        ItemsCount="5"
        ItemSize="60"/>
</StackPanel>
```

## Orientation

Change the layout direction using the `Orientation` property.

**Property:** `Orientation`  
**Type:** `Orientation` enum  
**Default:** `Horizontal`  
**Options:** `Horizontal`, `Vertical`

### Horizontal Orientation (Default)

**XAML:**
```xml
<syncfusion:SfRating 
    Value="3"
    ItemsCount="5" 
    Orientation="Horizontal"/>
```

### Vertical Orientation

**XAML:**
```xml
<syncfusion:SfRating 
    Value="3"
    ItemsCount="5" 
    Orientation="Vertical"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.Value = 3;
rating.ItemsCount = 5;
rating.Orientation = Orientation.Vertical;
```

### Use Cases for Vertical Orientation

**Sidebar Widget:**
```xml
<Border 
    BorderBrush="Gray" 
    BorderThickness="1" 
    Padding="15"
    Width="100">
    <StackPanel>
        <TextBlock Text="Rating" FontWeight="Bold" Margin="0,0,0,10"/>
        <syncfusion:SfRating 
            Value="4" 
            ItemsCount="5"
            Orientation="Vertical"
            ItemSize="30"
            HorizontalAlignment="Center"/>
    </StackPanel>
</Border>
```

## Read-Only Mode
> See also: [references/customization-advanced.md](customization-advanced.md) for Read-Only Mode, Clear Rating, Placeholder Value, Combining Customizations, and examples.
