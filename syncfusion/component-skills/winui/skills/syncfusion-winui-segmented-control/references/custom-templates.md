# Custom Templates in WinUI Segmented Control

## Table of Contents
- [Overview](#overview)
- [Ellipse Style](#ellipse-style)
- [Circle Style](#circle-style)
- [Image with Text Style](#image-with-text-style)
- [Top Indicator Style](#top-indicator-style)
- [Gradient Background Style](#gradient-background-style)

> **See also:** [ui-customization.md](ui-customization.md) for Border Customization, Corner Radius, Border Colors, Item Template Selector, and Item Container Style Selector.

## Overview

Custom templates let you define unique segment appearances beyond the default text-only display. Use `ItemTemplate` for content layout, `SelectedSegmentStyle` for selection indicator, and `ItemContainerStyle` for individual item containers. The examples below demonstrate five common patterns.

## Ellipse Style

Create rounded pill-shaped segments with a highlighted background selection.

```xaml
<Grid.Resources>
    <Style TargetType="syncfusion:SelectedSegmentBorder" x:Key="ellipseStyle">
        <Setter Property="CornerRadius" Value="25"/>
        <Setter Property="Background" Value="#FFE521"/>
    </Style>
</Grid.Resources>

<syncfusion:SfSegmentedControl 
    Height="50"
    CornerRadius="25"
    ItemBorderThickness="0"
    SelectedSegmentStyle="{StaticResource ellipseStyle}">

    <syncfusion:SfSegmentedControl.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="#464646"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="#464646"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemForeground" Color="White"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="#464646"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </syncfusion:SfSegmentedControl.Resources>

    <syncfusion:SfSegmentedControl.ItemContainerStyle>
        <Style TargetType="syncfusion:SfSegmentedItem">
            <Setter Property="CornerRadius" Value="25"/>
        </Style>
    </syncfusion:SfSegmentedControl.ItemContainerStyle>

    <x:String>Small</x:String>
    <x:String>Medium</x:String>
    <x:String>Large</x:String>
</syncfusion:SfSegmentedControl>
```

**Key points:**
- Set matching `CornerRadius="25"` on the control, item container style, and selected segment style.
- Use `ItemBorderThickness="0"` to remove dividers between pill segments.
- Override `SyncfusionSegmentedItemSelectedForeground` to match the dark background.

## Circle Style

Create circular color-swatch pickers where selection is indicated by a border ring.

```xaml
<Grid.Resources>
    <Style TargetType="syncfusion:SelectedSegmentBorder" x:Key="circleStyle">
        <Setter Property="BorderThickness" Value="2"/>
        <Setter Property="BorderBrush" Value="{ThemeResource SystemBaseHighColor}"/>
        <Setter Property="Width" Value="50"/>
        <Setter Property="Height" Value="50"/>
        <Setter Property="Margin" Value="-5,0,0,0"/>
        <Setter Property="CornerRadius" Value="25"/>
        <Setter Property="Background" Value="Transparent"/>
        <Setter Property="Canvas.ZIndex" Value="2"/>
    </Style>
</Grid.Resources>

<syncfusion:SfSegmentedControl 
    BorderThickness="0"
    SelectedIndex="2"
    ItemBorderThickness="0"
    SelectionAnimationType="None"
    SelectedSegmentStyle="{StaticResource circleStyle}"
    ItemsSource="{Binding Colors}">

    <syncfusion:SfSegmentedControl.ItemContainerStyle>
        <Style TargetType="syncfusion:SfSegmentedItem">
            <Setter Property="Width" Value="40"/>
            <Setter Property="Height" Value="40"/>
            <Setter Property="CornerRadius" Value="20"/>
            <Setter Property="Padding" Value="0"/>
            <Setter Property="Margin" Value="8,0,8,0"/>
        </Style>
    </syncfusion:SfSegmentedControl.ItemContainerStyle>

    <syncfusion:SfSegmentedControl.ItemTemplate>
        <DataTemplate>
            <Border Width="40" Height="40" Background="{Binding Color}" CornerRadius="20"/>
        </DataTemplate>
    </syncfusion:SfSegmentedControl.ItemTemplate>
</syncfusion:SfSegmentedControl>
```

**ViewModel:**

```csharp
public class ColorModel
{
    public Brush Color { get; set; }
}

public class ColorViewModel
{
    public ObservableCollection<ColorModel> Colors { get; set; }

    public ColorViewModel()
    {
        Colors = new ObservableCollection<ColorModel>
        {
            new ColorModel { Color = new SolidColorBrush(Colors.Red) },
            new ColorModel { Color = new SolidColorBrush(Colors.Blue) },
            new ColorModel { Color = new SolidColorBrush(Colors.Green) },
            new ColorModel { Color = new SolidColorBrush(Colors.Orange) }
        };
    }
}
```

**Key points:**
- Use `SelectionAnimationType="None"` — slide animation looks awkward on scattered circles.
- `Canvas.ZIndex="2"` on the border ring ensures it renders above the color swatch.
- Negative `Margin` on `SelectedSegmentBorder` compensates for the larger ring size.

## Image with Text Style

Combine SVG icon paths with text labels in a stacked layout.

```xaml
<syncfusion:SfSegmentedControl 
    SelectedIndex="2"
    ItemsSource="{Binding FileTypes}">

    <syncfusion:SfSegmentedControl.ItemTemplate>
        <DataTemplate>
            <StackPanel Height="50">
                <Path 
                    Data="{Binding IconPath}"
                    Fill="{Binding IconColor}"
                    Stretch="Uniform"
                    Width="16"
                    Height="16"
                    Margin="0,8,0,0"/>
                <TextBlock 
                    Text="{Binding Name}"
                    Margin="0,6,0,0"
                    HorizontalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfSegmentedControl.ItemTemplate>
</syncfusion:SfSegmentedControl>
```

**Model:**

```csharp
public class FileTypeModel
{
    public string Name { get; set; }
    public string IconPath { get; set; } // SVG geometry path data
    public Brush IconColor { get; set; }
}
```

**Key points:**
- Set an explicit `Height` on the `StackPanel` to keep all segments uniform.
- Use `Stretch="Uniform"` on `Path` so icons scale proportionally.
- Bind `IconColor` to a `Brush` property — change it in response to selection if needed.

## Top Indicator Style

Create a tab-bar-like appearance where selection is shown by a colored top border stripe.

```xaml
<Grid.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="IndicatorBrush" Color="#6C58EA"/>
            </ResourceDictionary>
            <ResourceDictionary x:Key="Dark">
                <SolidColorBrush x:Key="IndicatorBrush" Color="#9B8AFF"/>
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>

        <Style TargetType="syncfusion:SelectedSegmentBorder" x:Key="topIndicatorStyle">
            <Setter Property="Margin" Value="0,-6,0,0"/>
            <Setter Property="BorderThickness" Value="0,4,0,0"/>
            <Setter Property="BorderBrush" Value="{ThemeResource IndicatorBrush}"/>
            <Setter Property="Background" Value="Transparent"/>
        </Style>
    </ResourceDictionary>
</Grid.Resources>

<syncfusion:SfSegmentedControl 
    SelectedIndex="2"
    BorderThickness="0"
    ItemBorderThickness="0,4,0,0"
    SelectedSegmentStyle="{StaticResource topIndicatorStyle}"
    ItemsSource="{Binding Tabs}">

    <syncfusion:SfSegmentedControl.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="Transparent"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#F0F0F0"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverBackground" Color="#F0F0F0"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </syncfusion:SfSegmentedControl.Resources>

    <syncfusion:SfSegmentedControl.ItemContainerStyle>
        <Style TargetType="syncfusion:SfSegmentedItem">
            <Setter Property="BorderBrush" Value="Transparent"/>
            <Setter Property="Padding" Value="12,8"/>
            <Setter Property="Margin" Value="2,0"/>
        </Style>
    </syncfusion:SfSegmentedControl.ItemContainerStyle>

    <syncfusion:SfSegmentedControl.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <SymbolIcon Symbol="{Binding Icon}" Width="16" Height="16"/>
                <TextBlock Text="{Binding Name}" Margin="8,0,0,0" VerticalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfSegmentedControl.ItemTemplate>
</syncfusion:SfSegmentedControl>
```

**Key points:**
- `ItemBorderThickness="0,4,0,0"` adds an unselected top border (in a muted color) to all items.
- The selected segment's `BorderBrush` uses a theme-aware `IndicatorBrush` for light/dark support.
- Negative `Margin` on `SelectedSegmentBorder` aligns the indicator stripe with the item top edge.

## Gradient Background Style

Apply per-item linear gradient backgrounds for colorful segment displays.

```xaml
<syncfusion:SfSegmentedControl ItemsSource="{Binding GradientItems}">
    <syncfusion:SfSegmentedControl.ItemTemplate>
        <DataTemplate>
            <Grid Width="80" Height="40">
                <Grid.Background>
                    <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                        <GradientStop Color="{Binding StartColor}" Offset="0"/>
                        <GradientStop Color="{Binding EndColor}" Offset="1"/>
                    </LinearGradientBrush>
                </Grid.Background>
                <TextBlock 
                    Text="{Binding Name}"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center"
                    Foreground="White"/>
            </Grid>
        </DataTemplate>
    </syncfusion:SfSegmentedControl.ItemTemplate>
</syncfusion:SfSegmentedControl>
```

**Model:**

```csharp
public class GradientSegmentModel
{
    public string Name { get; set; }
    public Color StartColor { get; set; }
    public Color EndColor { get; set; }
}
```

**Key points:**
- Set explicit `Width` and `Height` on the root `Grid` for uniform sizing.
- Ensure `Foreground="White"` has sufficient contrast against all gradient colors.
- Combine with a transparent `SelectedSegmentBorder` and border-based selection indicator for best results.
