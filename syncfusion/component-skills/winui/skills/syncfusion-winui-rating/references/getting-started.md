# Getting Started with WinUI Rating

This guide covers the essential steps to install, configure, and use the Syncfusion WinUI Rating (SfRating) control in your WinUI 3 desktop application.

## Prerequisites

Before you begin, ensure you have:
- **Visual Studio 2019 or later** with WinUI 3 workload installed
- **Windows 10 SDK** (version 1809 or later)
- **.NET 5, .NET 6, or .NET 7** SDK
- **Windows App SDK** installed

## Step 1: Create a WinUI 3 Desktop Application

If you don't have an existing WinUI 3 project:

1. Open Visual Studio
2. Create a new project
3. Select **"Blank App, Packaged (WinUI 3 in Desktop)"** template
4. Name your project (e.g., "RatingDemo")
5. Choose .NET version (.NET 5 or later)
6. Click **Create**

**Reference:** [Create your first WinUI 3 app](https://learn.microsoft.com/en-us/windows/apps/winui/winui3/create-your-first-winui3-app)

## Step 2: Install Syncfusion.Editors.WinUI NuGet Package

### Option A: NuGet Package Manager (Visual Studio)

1. Right-click your project in Solution Explorer
2. Select **"Manage NuGet Packages"**
3. Click the **Browse** tab
4. Search for **"Syncfusion.Editors.WinUI"**
5. Select the package and click **Install**
6. Accept the license agreement

### Option B: Package Manager Console

```powershell
Install-Package Syncfusion.Editors.WinUI
```

### Option C: .NET CLI

```bash
dotnet add package Syncfusion.Editors.WinUI
```

**Package URL:** https://www.nuget.org/packages/Syncfusion.Editors.WinUI

## Step 3: Register Syncfusion License (Required)

Add the license registration in your `App.xaml.cs` file **before** any Syncfusion component initialization:

```csharp
using Microsoft.UI.Xaml;
using Syncfusion.Licensing;

namespace RatingDemo
{
    public partial class App : Application
    {
        public App()
        {
            // Register Syncfusion license FIRST
            SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
            
            this.InitializeComponent();
        }

        // ... rest of App class
    }
}
```

**Getting a License Key:**
- **Community License:** Free for qualifying developers - https://www.syncfusion.com/products/communitylicense
- **Trial License:** 30-day evaluation - https://www.syncfusion.com/downloads
- **Commercial License:** For commercial projects - https://www.syncfusion.com/sales/products

## Step 4: Import the Namespace

### In XAML

Add the Syncfusion namespace declaration to your page:

```xml
<Page
    x:Class="RatingDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors">
    
    <!-- Your content here -->
    
</Page>
```

### In C# Code

Add the using directive at the top of your C# file:

```csharp
using Syncfusion.UI.Xaml.Editors;
```

## Step 5: Initialize the Rating Control

There are two approaches to initialize the Rating control:

### Approach 1: Using ItemsCount (Recommended - Simpler)

This is the simpler and more commonly used approach.

**XAML:**
```xml
<Page
    x:Class="RatingDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors">
    
    <Grid>
        <syncfusion:SfRating Value="3" ItemsCount="5"/>
    </Grid>
</Page>
```

**C#:**
```csharp
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Editors;

namespace RatingDemo
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            
            // Create rating control
            SfRating rating = new SfRating();
            rating.Value = 3;
            rating.ItemsCount = 5;
            
            // Add to page (assuming a Grid named 'RootGrid')
            RootGrid.Children.Add(rating);
        }
    }
}
```

**Result:** Creates a 5-star rating with 3 stars filled.

### Approach 2: Using Items Collection

This approach gives you more control over individual rating items.

**XAML:**
```xml
<Page
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors">
    
    <Grid>
        <syncfusion:SfRating Value="3">
            <syncfusion:SfRating.Items>
                <syncfusion:SfRatingItem Content="1"/>
                <syncfusion:SfRatingItem Content="2"/>
                <syncfusion:SfRatingItem Content="3"/>
                <syncfusion:SfRatingItem Content="4"/>
                <syncfusion:SfRatingItem Content="5"/>
            </syncfusion:SfRating.Items>
        </syncfusion:SfRating>
    </Grid>
</Page>
```

**C#:**
```csharp
// Create rating control
SfRating rating = new SfRating();

// Add items to the rating control
rating.Items.Add(new SfRatingItem() { Content = "1" });
rating.Items.Add(new SfRatingItem() { Content = "2" });
rating.Items.Add(new SfRatingItem() { Content = "3" });
rating.Items.Add(new SfRatingItem() { Content = "4" });
rating.Items.Add(new SfRatingItem() { Content = "5" });

// Set rating value
rating.Value = 3;
```

**When to use Items Collection:**
- Need individual control over each item
- Want to add custom properties to specific items
- Creating non-uniform rating scales

**When to use ItemsCount:**
- Standard uniform ratings (most common)
- Simpler, cleaner code
- All items are identical

## Complete Working Example

Here's a complete MainPage implementation with a rating control:

**MainPage.xaml:**
```xml
<Page
    x:Class="RatingDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    
    <StackPanel 
        Padding="40" 
        Spacing="30"
        HorizontalAlignment="Center"
        VerticalAlignment="Center">
        
        <TextBlock 
            Text="Product Rating" 
            FontSize="24" 
            FontWeight="Bold"/>
        
        <!-- Simple 5-star rating -->
        <StackPanel Spacing="10">
            <TextBlock Text="Rate this product:"/>
            <syncfusion:SfRating 
                x:Name="ProductRating"
                Value="0" 
                ItemsCount="5"
                ValueChanged="ProductRating_ValueChanged"/>
        </StackPanel>
        
        <!-- Display selected value -->
        <TextBlock 
            x:Name="RatingText"
            Text="No rating selected"
            FontStyle="Italic"/>
    </StackPanel>
</Page>
```

**MainPage.xaml.cs:**
```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Editors;

namespace RatingDemo
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }

        private void ProductRating_ValueChanged(object sender, ValueChangedEventArgs e)
        {
            // Update text when rating changes
            if (e.NewValue > 0)
            {
                RatingText.Text = $"You rated: {e.NewValue} stars";
            }
            else
            {
                RatingText.Text = "No rating selected";
            }
        }
    }
}
```

## Setting Rating Values

### Setting Initial Value

**XAML:**
```xml
<syncfusion:SfRating Value="4" ItemsCount="5"/>
```

**C#:**
```csharp
rating.Value = 4;
```

### Binding to ViewModel

**XAML:**
```xml
<syncfusion:SfRating 
    Value="{Binding UserRating, Mode=TwoWay}" 
    ItemsCount="5"/>
```

**ViewModel:**
```csharp
public class ProductViewModel : INotifyPropertyChanged
{
    private double _userRating;
    public double UserRating
    {
        get => _userRating;
        set
        {
            _userRating = value;
            OnPropertyChanged(nameof(UserRating));
        }
    }

    // INotifyPropertyChanged implementation...
}
```

## Common Initial Configurations

### Standard 5-Star Rating

```xml
<syncfusion:SfRating Value="0" ItemsCount="5"/>
```

### 10-Point Scale

```xml
<syncfusion:SfRating Value="0" ItemsCount="10"/>
```

### Pre-filled Rating (Display Mode)

```xml
<syncfusion:SfRating 
    Value="4.5" 
    ItemsCount="5"
    IsReadOnly="True"/>
```

### Rating with Custom Size

```xml
<syncfusion:SfRating 
    Value="3" 
    ItemsCount="5"
    ItemSize="40"/>
```

## Next Steps

Now that you have the basic Rating control working:

1. **Add precision modes** - See [precision.md](precision.md) for:
   - Full precision (whole stars)
   - Half precision (half stars)
   - Exact precision (any decimal)

2. **Customize appearance** - See [customization.md](customization.md) for:
   - Styling rated/unrated items
   - Changing item size
   - Orientation options
   - Read-only mode
   - Clearing ratings

3. **Use custom templates** - See [templates.md](templates.md) for:
   - Path-based templates
   - Image-based templates (emoji ratings)
   - Custom DataTemplateSelector

4. **Add tooltips** - See [tooltip-features.md](tooltip-features.md) for:
   - Enabling tooltips
   - Custom formatting

## Troubleshooting

### Rating not appearing
- **Check license registration:** Ensure `SyncfusionLicenseProvider.RegisterLicense()` is called in `App.xaml.cs`
- **Verify namespace:** Confirm `xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors"` is declared
- **Check NuGet package:** Verify Syncfusion.Editors.WinUI is installed

### Stars too small/large
- Adjust `ItemSize` property (default is 24)
- Try values between 20-50 for optimal display

### Value not updating
- Check if `IsReadOnly` is set to `false` (default)
- Verify ValueChanged event is properly hooked up
- Ensure Value uses TwoWay binding if bound to ViewModel

### Build errors
- **Clean and rebuild:** Try cleaning the solution and rebuilding
- **Update packages:** Ensure all Syncfusion packages are the same version
- **Check .NET version:** Verify you're using .NET 5 or later

### Runtime errors
- **License exception:** You need a valid Syncfusion license (trial, community, or commercial)
- **Missing DLLs:** Restore NuGet packages (`dotnet restore` or Visual Studio restore)

## Additional Resources

- **API Documentation:** https://help.syncfusion.com/cr/winui/Syncfusion.UI.Xaml.Editors.SfRating.html
- **Online Demos:** https://github.com/syncfusion/winui-demos
- **Knowledge Base:** https://www.syncfusion.com/kb/winui
- **Support:** https://www.syncfusion.com/support
