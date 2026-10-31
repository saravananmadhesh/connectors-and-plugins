# Color Picker Customization in WinUI DropDown Color Picker

> **Important:** Ensure the `Syncfusion.Editors.WinUI` NuGet package is updated to the latest version for all customization features to work properly.

## Table of Contents
- [Overview](#overview)
- [Using AttachedFlyout](#using-attachedflyout)
- [DropDownFlyout Property](#dropdownflyout-property)
- [Embedded Color Picker](#embedded-color-picker)
- [Brush Type Options](#brush-type-options)
- [Size Customization](#size-customization)
- [Color Picker Features](#color-picker-features)

## Overview

The DropDown Color Picker allows you to embed and customize an `SfColorPicker` control inside the dropdown flyout. This enables fine-grained control over which color selection features are available to users.

### Key Concept

Instead of using the default color picker in the dropdown, you can:
- Define a custom `SfColorPicker` with specific options
- Choose which brush types to support (solid, linear gradient, radial gradient)
- Control the size and appearance of the picker
- Limit color modes or features based on your needs

## Using AttachedFlyout

### What is AttachedFlyout?

`AttachedFlyout` is a WinUI property that associates a flyout with a control. The `DropDownFlyout` is a special flyout designed for dropdown scenarios.

### Basic Syntax

```xaml
<editors:SfDropDownColorPicker Name="colorPicker">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <!-- Content goes here -->
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPicker>
```

## DropDownFlyout Property

### What is DropDownFlyout?

`DropDownFlyout` is a specialized flyout that works with `SfDropDownBase` controls (including `SfDropDownColorPicker`). It:
- Opens when the dropdown button is clicked
- Automatically closes when user clicks OK or cancels
- Supports custom content (usually a color picker)
- Handles positioning and alignment

### Reference

For all customization options available on the embedded `SfColorPicker`, refer to the WinUI Color Picker documentation at:
- [Syncfusion WinUI Color Picker Documentation](https://help.syncfusion.com/winui/color-picker/getting-started)

## Embedded Color Picker

### Basic Embedded Example

```xaml
<editors:SfDropDownColorPicker Name="colorPicker">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <editors:SfColorPicker Width="250" />
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPicker>
```

When user clicks the dropdown button, the `SfColorPicker` flyout opens allowing color selection.

### Default Behavior

- Size adjusts to fit content plus OK/Cancel buttons
- Color picker opens at the specified width/height
- Selected color from picker becomes the DropDown Color Picker's `SelectedBrush`

## Brush Type Options

### Available Brush Types

The `BrushTypeOptions` property controls which color selection types are available:

```csharp
[Flags]
public enum BrushTypeOptions
{
    SolidColorBrush = 1,
    LinearGradientBrush = 2,
    RadialGradientBrush = 4
}
```

### Single Brush Type

```xaml
<!-- Only solid colors -->
<editors:SfColorPicker BrushTypeOptions="SolidColorBrush" />

<!-- Only linear gradients -->
<editors:SfColorPicker BrushTypeOptions="LinearGradientBrush" />

<!-- Only radial gradients -->
<editors:SfColorPicker BrushTypeOptions="RadialGradientBrush" />
```

### Multiple Brush Types

```xaml
<!-- Solid colors and linear gradients -->
<editors:SfColorPicker BrushTypeOptions="SolidColorBrush, LinearGradientBrush" />

<!-- All brush types -->
<editors:SfColorPicker BrushTypeOptions="SolidColorBrush, LinearGradientBrush, RadialGradientBrush" />
```

### Use Cases

**Solid Only** - Simple color selection:
```xaml
<editors:SfDropDownColorPicker>
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <editors:SfColorPicker BrushTypeOptions="SolidColorBrush" />
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPicker>
```

**Gradients Only** - Advanced users:
```xaml
<editors:SfDropDownColorPicker>
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <editors:SfColorPicker BrushTypeOptions="LinearGradientBrush, RadialGradientBrush" />
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPicker>
```

## Size Customization

### Setting Width and Height

Control the size of the embedded color picker:

```xaml
<editors:SfDropDownColorPicker Name="colorPicker">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <editors:SfColorPicker Width="300" 
                                   Height="350" />
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPicker>
```

### Recommended Sizes

| Use Case | Width | Height |
|----------|-------|--------|
| Compact | 200 | 250 |
| Standard | 250 | 300 |
| Large | 300 | 350 |
| Full Screen | 400+ | 450+ |

### Responsive Sizing

```xaml
<editors:SfColorPicker Width="{x:Bind pickerWidth, Mode=OneWay}"
                       Height="{x:Bind pickerHeight, Mode=OneWay}" />
```

## Color Picker Features

### Advanced Configuration Example

```xaml
<editors:SfDropDownColorPicker x:Name="advancedColorPicker"
                               SelectedBrush="Blue">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <editors:SfColorPicker BrushTypeOptions="SolidColorBrush, LinearGradientBrush"
                                   Width="280"
                                   Height="320" />
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPicker>
```

### Handling Color Selection from Embedded Picker

The embedded color picker's selection automatically updates the DropDown Color Picker's `SelectedBrush`:

```csharp
// Listen for changes on the DropDown Color Picker
advancedColorPicker.SelectedBrushChanged += (sender, e) =>
{
    Debug.WriteLine($"Color selected: {(e.NewBrush as SolidColorBrush)?.Color}");
};
```

### Custom Initialization

Set up the embedded picker with specific initial values:

```csharp
SfDropDownColorPicker dropdownPicker = new SfDropDownColorPicker();

// Access the embedded picker through its properties
// (Embedded picker is created dynamically when dropdown opens)

dropdownPicker.SelectedBrush = new SolidColorBrush(Colors.Green);
```

### Limitation: Accessing Embedded Picker

The embedded `SfColorPicker` is created inside the `DropDownFlyout` and may not be directly accessible from code-behind until the dropdown is opened. For most use cases, configure it entirely in XAML and listen to the DropDown Color Picker's events.

If you need to programmatically control the embedded picker:
1. Create a shared ViewModel
2. Bind the embedded picker to ViewModel properties
3. Update through the ViewModel

**Example with ViewModel:**

```csharp
public class ColorPickerViewModel : INotifyPropertyChanged
{
    private BrushTypeOptions _brushTypes = BrushTypeOptions.SolidColorBrush;
    
    public BrushTypeOptions SupportedBrushTypes
    {
        get => _brushTypes;
        set { _brushTypes = value; OnPropertyChanged(); }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string name = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}
```

```xaml
<editors:SfDropDownColorPicker x:Name="colorPicker">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <editors:SfColorPicker BrushTypeOptions="{x:Bind ViewModel.SupportedBrushTypes, Mode=TwoWay}" />
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPicker>
```

## Complete Example: Theme Color Picker

This example shows a customized color picker for theme selection:

```xaml
<Page
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    <StackPanel Padding="20" Spacing="10">
        <TextBlock Text="Select Theme Color" FontSize="18" FontWeight="Bold" />
        
        <editors:SfDropDownColorPicker x:Name="themeColorPicker"
                                       SelectedBrush="Blue"
                                       Width="150"
                                       Height="40">
            <FlyoutBase.AttachedFlyout>
                <editors:DropDownFlyout>
                    <!-- Only solid colors for themes -->
                    <editors:SfColorPicker BrushTypeOptions="SolidColorBrush"
                                           Width="250"
                                           Height="280" />
                </editors:DropDownFlyout>
            </FlyoutBase.AttachedFlyout>
        </editors:SfDropDownColorPicker>
        
        <!-- Preview area -->
        <Rectangle x:Name="colorPreview"
                   Fill="{x:Bind themeColorPicker.SelectedBrush, Mode=OneWay}"
                   Width="300"
                   Height="100"
                   RadiusX="8"
                   RadiusY="8" />
        
        <TextBlock x:Name="colorInfo" Text="Color: Blue" />
    </StackPanel>
</Page>
```

```csharp
public sealed partial class ThemeColorPickerPage : Page
{
    public ThemeColorPickerPage()
    {
        this.InitializeComponent();
        themeColorPicker.SelectedBrushChanged += ThemeColorPicker_SelectedBrushChanged;
    }
    
    private void ThemeColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
    {
        var brush = e.NewBrush as SolidColorBrush;
        if (brush != null)
        {
            colorInfo.Text = $"Color: RGB({brush.Color.R}, {brush.Color.G}, {brush.Color.B})";
            ApplyTheme(brush);
        }
    }
    
    private void ApplyTheme(SolidColorBrush color)
    {
        // Apply theme to application
        (Application.Current as App)?.SetThemeColor(color);
    }
}
```
