# Getting Started with WinUI NumberBox

This reference covers initial setup and basic usage of the Syncfusion WinUI NumberBox control.

## Installation and Setup

### Step 1: Create WinUI 3 Application
Create a new WinUI 3 desktop app for C# and .NET 5 using Visual Studio.

### Step 2: Install NuGet Package
Install the Syncfusion Editors package:
```
Install-Package Syncfusion.Editors.WinUI
```

Or via Package Manager Console:
```powershell
Install-Package Syncfusion.Editors.WinUI
```

### Step 3: Add XAML Namespace
In your XAML page, add the editors namespace:
```xaml
xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
```

## Adding NumberBox in XAML

### Basic NumberBox
```xaml
<Page
    x:Class="GettingStarted.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    <Grid Name="grid">
        <editors:SfNumberBox 
            HorizontalAlignment="Center"
            VerticalAlignment="Center" 
            Value="15.35" />
    </Grid>
</Page>
```

### NumberBox with Header and Description
```xaml
<editors:SfNumberBox 
    x:Name="numberBox" 
    Width="300" 
    Height="75" 
    Header="Amount to withdraw" 
    Description="Please enter only positive digits."
    Value="100" />
```

## Adding NumberBox in C#

### Basic NumberBox Creation
```csharp
using Syncfusion.UI.Xaml.Editors;

namespace GettingStarted
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            
            // Create NumberBox instance
            SfNumberBox sfNumberBox = new SfNumberBox();
            sfNumberBox.HorizontalAlignment = HorizontalAlignment.Center;
            sfNumberBox.VerticalAlignment = VerticalAlignment.Center;
            sfNumberBox.Value = 15.35;

            grid.Children.Add(sfNumberBox);
        }
    }
}
```

## Supported Data Types

The NumberBox supports multiple numeric data types via the `ValueType` property:

- **Double** (default) - Floating-point numbers
- **Decimal** - High-precision decimal numbers
- **Float** - Single-precision floating-point
- **Long** - 64-bit integers
- **Int** - 32-bit integers
- **UInt** - Unsigned 32-bit integers
- **Byte** - Unsigned 8-bit integers
- **SByte** - Signed 8-bit integers

### Setting Data Type

**XAML:**
```xaml
<editors:SfNumberBox 
    ValueType="Decimal"
    Value="3213124.20"
    Minimum="2000.87"
    Maximum="5100000.24" />
```

**C#:**
```csharp
SfNumberBox numberBox = new SfNumberBox();
numberBox.ValueType = NumericType.Decimal;
numberBox.Value = 3213124.20;
numberBox.Minimum = 2000.87;
numberBox.Maximum = 5100000.24;
```

### Important: Type Matching
When using `Decimal` type, always specify Minimum and Maximum as decimal literals to avoid type-casting issues:
```csharp
// Correct
numberBox.ValueType = NumericType.Decimal;
numberBox.Minimum = 2000.87m;  // Note the 'm' suffix for decimal

// Avoid
numberBox.Minimum = 2000.87;   // Will be interpreted as double
```

## Value Editing and Validation

The NumberBox validates input in two scenarios:
1. When the **Enter** key is pressed
2. When the control **loses focus**

### Example with Validation Event

**XAML:**
```xaml
<editors:SfNumberBox 
    x:Name="priceInput"
    Value="0"
    CustomFormat="C2"
    Minimum="0"
    Maximum="999.99"
    ValueChanged="PriceInput_ValueChanged" />
```

**C#:**
```csharp
private void PriceInput_ValueChanged(object sender, ValueChangedEventArgs e)
{
    var oldValue = e.OldValue;      // Previous value
    var newValue = e.NewValue;      // Current validated value
    
    Debug.WriteLine($"Value changed from {oldValue} to {newValue}");
}
```

## Placeholder Text (Watermark)

Display hint text when the NumberBox is empty and focused:

**XAML:**
```xaml
<editors:SfNumberBox 
    HorizontalAlignment="Center" 
    VerticalAlignment="Center" 
    PlaceholderText="Enter input here..." />
```

**C#:**
```csharp
SfNumberBox sfNumberBox = new SfNumberBox();
sfNumberBox.PlaceholderText = "Enter input here...";
sfNumberBox.HorizontalAlignment = HorizontalAlignment.Center;
sfNumberBox.VerticalAlignment = VerticalAlignment.Center;
```

**Note:** Placeholder text only displays when:
- AllowNull is **true** (default)
- Value is **null** or empty

## Header Customization

### Simple Header Text

**XAML:**
```xaml
<editors:SfNumberBox 
    Header="Your Age"
    Value="25" />
```

### Custom Header Template

Create a custom header layout with icons or styling:

**XAML:**
```xaml
<editors:SfNumberBox Value="100" CustomFormat="#,0.00" Width="250" Height="75">
    <editors:SfNumberBox.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <FontIcon FontFamily="Segoe MDL2 Assets" Glyph="&#xEF40;"/>
                <TextBlock Text="Amount" FontSize="14" Margin="5"/>
            </StackPanel>
        </DataTemplate>
    </editors:SfNumberBox.HeaderTemplate>
</editors:SfNumberBox>
```

## Description Text

Display helper text below the NumberBox:

**XAML:**
```xaml
<editors:SfNumberBox 
    Header="Age"
    Value="25"
    Description="Please enter your age in years."
    Width="300" 
    Height="75" />
```

**C#:**
```csharp
SfNumberBox sfNumberBox = new SfNumberBox();
sfNumberBox.Header = "Age";
sfNumberBox.Description = "Please enter your age in years.";
sfNumberBox.Value = 25;
```

## Clear Button

Show a clear button to quickly reset the value:

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="10"
    ShowClearButton="True" 
    IsEditable="True" 
    Height="75" 
    Width="300" />
```

**C#:**
```csharp
SfNumberBox sfNumberBox = new SfNumberBox();
sfNumberBox.ShowClearButton = true;
sfNumberBox.IsEditable = true;
sfNumberBox.Value = 10;
```

**Note:** Clear button only appears when:
- Control is **focused**
- `IsEditable` is **true**

## Complete Getting Started Example

A complete example with multiple features:

**XAML:**
```xaml
<Page
    x:Class="NumberBoxDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    
    <StackPanel Padding="20" Spacing="20">
        <TextBlock Text="NumberBox Examples" FontSize="24" FontWeight="Bold"/>
        
        <!-- Basic Number Input -->
        <editors:SfNumberBox 
            Header="Basic Number"
            Value="100"
            Width="300" 
            Height="75" />
        
        <!-- Currency Input -->
        <editors:SfNumberBox 
            Header="Price"
            Value="99.99"
            CustomFormat="C2"
            Minimum="0"
            Maximum="999.99"
            Width="300" 
            Height="75" />
        
        <!-- Percentage Input -->
        <editors:SfNumberBox 
            Header="Discount"
            Value="10"
            CustomFormat="P2"
            Minimum="0"
            Maximum="100"
            Width="300" 
            Height="75" />
    </StackPanel>
</Page>
```

**C#:**
```csharp
public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
    }
}
```

## Common Issues and Solutions

### Issue: Value not updating
**Solution:** Check that validation passed (Enter key or focus loss). The value only updates after validation.

### Issue: Placeholder text not showing
**Solution:** Verify `AllowNull="True"` and value is empty. Placeholder only shows under these conditions.

### Issue: Decimal precision lost
**Solution:** Use `ValueType="Decimal"` instead of default `Double` for high-precision values.

### Issue: Format not applying
**Solution:** Ensure `CustomFormat` is a valid format string. Common formats: C2 (currency), P2 (percent), N3 (decimal).
