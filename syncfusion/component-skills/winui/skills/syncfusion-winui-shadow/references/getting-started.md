# Getting Started with WinUI Shadow

This guide covers the essential steps to install, configure, and use the Syncfusion WinUI Shadow (SfShadow) control in your WinUI 3 desktop application.

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
4. Name your project (e.g., "ShadowDemo")
5. Choose .NET version (.NET 5 or later)
6. Click **Create**

**Reference:** [Create your first WinUI 3 app](https://learn.microsoft.com/en-us/windows/apps/winui/winui3/create-your-first-winui3-app)

## Step 2: Install Syncfusion.Core.WinUI NuGet Package

### Option A: NuGet Package Manager (Visual Studio)

1. Right-click your project in Solution Explorer
2. Select **"Manage NuGet Packages"**
3. Click the **Browse** tab
4. Search for **"Syncfusion.Core.WinUI"**
5. Select the package and click **Install**
6. Accept the license agreement

### Option B: Package Manager Console

```powershell
Install-Package Syncfusion.Core.WinUI
```

### Option C: .NET CLI

```bash
dotnet add package Syncfusion.Core.WinUI
```

**Package URL:** https://www.nuget.org/packages/Syncfusion.Core.WinUI

## Step 3: Register Syncfusion License (Required)

Add the license registration in your `App.xaml.cs` file **before** any Syncfusion component initialization:

```csharp
using Microsoft.UI.Xaml;
using Syncfusion.Licensing;

namespace ShadowDemo
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
    x:Class="ShadowDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core">
    
    <!-- Your content here -->
    
</Page>
```

### In C# Code

Add the using directive at the top of your C# file:

```csharp
using Syncfusion.UI.Xaml.Core;
```

## Step 5: Initialize the Shadow Control

### Basic Initialization (XAML)

Add the SfShadow control to your page:

```xml
<Page
    x:Class="ShadowDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core">
    
    <Grid>
        <syncfusion:SfShadow>
            <Button Height="50" Width="100" Content="Button"/>
        </syncfusion:SfShadow>
    </Grid>
</Page>
```

### Basic Initialization (C#)

Create and configure the shadow control in code:

```csharp
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Core;

namespace ShadowDemo
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            
            // Create shadow control
            SfShadow shadow = new SfShadow();
            
            // Create button
            Button button = new Button();
            button.Height = 50;
            button.Width = 100;
            button.Content = "Button";
            
            // Set button as shadow content
            shadow.Content = button;
            
            // Add to page (assuming a Grid named 'RootGrid')
            RootGrid.Children.Add(shadow);
        }
    }
}
```

## Common Implementation Patterns

### 1. Applying Shadow to Buttons

Buttons are the most common use case for shadow effects.

**XAML Example:**
```xml
<syncfusion:SfShadow>
    <Button Height="50" Width="100" Content="Click Me"/>
</syncfusion:SfShadow>
```

**C# Example:**
```csharp
SfShadow shadow = new SfShadow();

Button button = new Button();
button.Height = 50;
button.Width = 100;
button.Content = "Click Me";

shadow.Content = button;
```

**Result:** The button will display with a default shadow effect, giving it depth and making it appear elevated.

### 2. Applying Shadow to Images

Create visually appealing image displays with shadow effects.

**XAML Example:**
```xml
<syncfusion:SfShadow>
    <Image Height="150" Width="150" Source="/Assets/photo.png"/>
</syncfusion:SfShadow>
```

**C# Example:**
```csharp
using Microsoft.UI.Xaml.Media.Imaging;

SfShadow shadow = new SfShadow();

Image image = new Image();
image.Height = 150;
image.Width = 150;

BitmapImage bitmapImage = new BitmapImage();
bitmapImage.UriSource = new Uri("ms-appx:///Assets/photo.png");
image.Source = bitmapImage;

shadow.Content = image;
```

**Use Cases:**
- Photo galleries
- Avatar displays
- Product images
- Icon showcases

### 3. Applying Shadow to Shapes and Paths

Apply shadows to custom shapes, paths, and vector graphics.

**XAML Example (Star Shape):**
```xml
<StackPanel Orientation="Horizontal">
    <syncfusion:SfShadow>
        <Path Data="M44.5 4L54.0608 33.4114H85L59.9696 51.5886L69.5304 81L44.5 62.8228L19.4696 81L29.0304 51.5886L4 33.4114H34.9392L44.5 4Z" 
              Fill="#FFD700"/>
    </syncfusion:SfShadow>
    <syncfusion:SfShadow>
        <Path Data="M44.5 4L54.0608 33.4114H85L59.9696 51.5886L69.5304 81L44.5 62.8228L19.4696 81L29.0304 51.5886L4 33.4114H34.9392L44.5 4Z" 
              Fill="#FFD700"/>
    </syncfusion:SfShadow>
    <syncfusion:SfShadow>
        <Path Data="M44.5 4L54.0608 33.4114H85L59.9696 51.5886L69.5304 81L44.5 62.8228L19.4696 81L29.0304 51.5886L4 33.4114H34.9392L44.5 4Z" 
              Fill="#FFD700"/>
    </syncfusion:SfShadow>
</StackPanel>
```

**C# Example (Multiple Stars):**
```csharp
using Microsoft.UI.Xaml.Shapes;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Data;
using Windows.UI;

StackPanel panel = new StackPanel();
panel.Orientation = Orientation.Horizontal;
panel.HorizontalAlignment = HorizontalAlignment.Center;
panel.VerticalAlignment = VerticalAlignment.Center;

string starData = "M44.5 4L54.0608 33.4114H85L59.9696 51.5886L69.5304 81L44.5 62.8228L19.4696 81L29.0304 51.5886L4 33.4114H34.9392L44.5 4Z";

// Create 5 stars with shadows
for (int i = 0; i < 5; i++)
{
    SfShadow shadow = new SfShadow();
    
    Path path = new Path();
    path.SetBinding(Path.DataProperty, new Binding() { Source = starData });
    path.Fill = new SolidColorBrush(Color.FromArgb(255, 255, 215, 0)); // Gold
    
    shadow.Content = path;
    panel.Children.Add(shadow);
}
```

**Use Cases:**
- Star ratings
- Custom icons
- Decorative elements
- Vector illustrations

### 4. Applying Shadow to Containers

Create card-like containers with depth.

**XAML Example:**
```xml
<syncfusion:SfShadow>
    <Border Background="White" 
            CornerRadius="8" 
            Padding="20" 
            Width="300" 
            Height="200">
        <StackPanel>
            <TextBlock Text="Card Title" FontSize="20" FontWeight="Bold"/>
            <TextBlock Text="Card content goes here..." Margin="0,10,0,0"/>
        </StackPanel>
    </Border>
</syncfusion:SfShadow>
```

## Complete Example: MainPage Implementation

Here's a complete working example showing multiple shadow applications:

**MainPage.xaml:**
```xml
<Page
    x:Class="ShadowDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    
    <StackPanel Padding="20" Spacing="20">
        <TextBlock Text="Shadow Examples" FontSize="24" FontWeight="Bold"/>
        
        <!-- Button with Shadow -->
        <StackPanel>
            <TextBlock Text="Button Shadow:" Margin="0,0,0,10"/>
            <syncfusion:SfShadow>
                <Button Height="50" Width="120" Content="Click Me"/>
            </syncfusion:SfShadow>
        </StackPanel>
        
        <!-- Image with Shadow -->
        <StackPanel>
            <TextBlock Text="Image Shadow:" Margin="0,0,0,10"/>
            <syncfusion:SfShadow>
                <Image Height="150" Width="150" Source="/Assets/photo.png"/>
            </syncfusion:SfShadow>
        </StackPanel>
        
        <!-- Card with Shadow -->
        <StackPanel>
            <TextBlock Text="Card Shadow:" Margin="0,0,0,10"/>
            <syncfusion:SfShadow>
                <Border Background="{ThemeResource CardBackgroundFillColorDefaultBrush}" 
                        CornerRadius="8" 
                        Padding="20" 
                        Width="300">
                    <TextBlock Text="Card Content"/>
                </Border>
            </syncfusion:SfShadow>
        </StackPanel>
    </StackPanel>
</Page>
```

**MainPage.xaml.cs:**
```csharp
using Microsoft.UI.Xaml.Controls;

namespace ShadowDemo
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }
    }
}
```

## Next Steps

Now that you have the basic Shadow control working:

1. **Customize the shadow** - See [customization.md](customization.md) for:
   - Changing shadow color
   - Adjusting blur radius
   - Setting corner radius
   - Positioning with offsets
   - Enabling/disabling shadows

2. **Explore advanced scenarios** - Combine shadows with:
   - Animations and transitions
   - Data binding
   - Custom controls
   - Responsive layouts

3. **Optimize performance** - Learn best practices for using shadows efficiently in complex UIs

## Troubleshooting

### Shadow not appearing
- **Check license registration:** Ensure `SyncfusionLicenseProvider.RegisterLicense()` is called in `App.xaml.cs`
- **Verify namespace:** Confirm `xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core"` is declared
- **Check NuGet package:** Verify Syncfusion.Core.WinUI is installed
- **Inspect content:** Ensure the shadow has content (a child element)

### Build errors
- **Clean and rebuild:** Try cleaning the solution and rebuilding
- **Update packages:** Ensure all Syncfusion packages are the same version
- **Check .NET version:** Verify you're using .NET 5 or later

### Runtime errors
- **License exception:** You need a valid Syncfusion license (trial, community, or commercial)
- **Missing DLLs:** Restore NuGet packages (`dotnet restore` or Visual Studio restore)

## Additional Resources

- **API Documentation:** https://help.syncfusion.com/cr/winui/Syncfusion.UI.Xaml.Core.SfShadow.html
- **Online Demos:** https://github.com/syncfusion/winui-demos
- **Knowledge Base:** https://www.syncfusion.com/kb/winui
- **Support:** https://www.syncfusion.com/support
