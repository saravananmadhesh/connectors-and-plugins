# Getting Started with WinUI Shimmer

This guide covers installation, basic setup, and creating your first Shimmer control in WinUI applications.

## Prerequisites

- **WinUI 3 Desktop app** for C# and .NET 5+ or .NET 6+
- **Windows App SDK** 1.0 or later
- **Windows 10 (1809)** or later, or Windows 11
- **Visual Studio 2019/2022** with WinUI workload

## Installation

### Step 1: Install NuGet Package

Install the Syncfusion WinUI Core package via NuGet Package Manager:

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Core.WinUI
```

**Or search in NuGet Package Manager:**
- Search: `Syncfusion.Core.WinUI`
- Install the latest version

### Step 2: Register Syncfusion License

Syncfusion controls require a license key. Register it in your `App.xaml.cs` before any control initialization:

```csharp
using Syncfusion.Licensing;

public App()
{
    // Register license key (before InitializeComponent)
    SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    this.InitializeComponent();
}
```

**License Types:**
- **Community License:** Free for individuals and small businesses (revenue < $1M)
- **Trial License:** 30-day evaluation
- **Commercial License:** For commercial applications

Get your license key from: https://www.syncfusion.com/account/claim-license-key

## Namespace Import

Import the Syncfusion Core namespace in your XAML or C# files:

**XAML:**
```xaml
xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core"
```

**C#:**
```csharp
using Syncfusion.UI.Xaml.Core;
```

## Basic Initialization

### XAML Approach

```xaml
<Window
    x:Class="MyApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core">
    
    <Grid>
        <syncfusion:SfShimmer x:Name="shimmer"/>
    </Grid>
</Window>
```

### C# Code-Behind Approach

```csharp
using Syncfusion.UI.Xaml.Core;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        // Create Shimmer
        SfShimmer shimmer = new SfShimmer();
        
        // Add to Grid
        this.Content = shimmer;
    }
}
```

## Default Behavior

When initialized without properties, the Shimmer control displays the default **CirclePersona** type:

```xaml
<syncfusion:SfShimmer />
```

**Default Settings:**
- Type: CirclePersona
- Fill: Light gray (#F6F6F6)
- WaveColor: White
- RepeatCount: 1

## Complete Example with Data Loading

Here's a complete example showing shimmer during data loading:

**MainWindow.xaml:**
```xaml
<Window
    x:Class="ShimmerDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core">
    
    <Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        
        <!-- Header -->
        <StackPanel Grid.Row="0" Padding="20" Spacing="10">
            <TextBlock Text="Shimmer Demo" 
                      FontSize="24" 
                      FontWeight="Bold"/>
            <Button x:Name="loadButton" 
                   Content="Load Articles" 
                   Click="LoadButton_Click"/>
        </StackPanel>
        
        <!-- Content Area -->
        <Grid Grid.Row="1" Padding="20">
            <!-- Shimmer (shown while loading) -->
            <syncfusion:SfShimmer 
                x:Name="shimmer"
                Type="Article"
                RepeatCount="5"
                Visibility="Collapsed"/>
            
            <!-- Actual Content (shown when loaded) -->
            <ListView x:Name="articlesListView" 
                     Visibility="Visible">
                <ListView.ItemTemplate>
                    <DataTemplate>
                        <StackPanel Padding="10">
                            <TextBlock Text="{Binding Title}" 
                                      FontSize="18" 
                                      FontWeight="SemiBold"/>
                            <TextBlock Text="{Binding Description}" 
                                      FontSize="14" 
                                      Foreground="Gray"
                                      TextWrapping="Wrap"/>
                        </StackPanel>
                    </DataTemplate>
                </ListView.ItemTemplate>
            </ListView>
        </Grid>
    </Grid>
</Window>
```

**MainWindow.xaml.cs:**
```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShimmerDemo
{
    public class Article
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
    
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
        }
        
        private async void LoadButton_Click(object sender, RoutedEventArgs e)
        {
            // Disable button
            loadButton.IsEnabled = false;
            
            // Show shimmer, hide content
            shimmer.Visibility = Visibility.Visible;
            articlesListView.Visibility = Visibility.Collapsed;
            
            try
            {
                // Simulate data loading
                await Task.Delay(2000);
                var articles = await LoadArticlesAsync();
                
                // Populate ListView
                articlesListView.ItemsSource = articles;
            }
            finally
            {
                // Hide shimmer, show content
                shimmer.Visibility = Visibility.Collapsed;
                articlesListView.Visibility = Visibility.Visible;
                loadButton.IsEnabled = true;
            }
        }
        
        private async Task<List<Article>> LoadArticlesAsync()
        {
            // Simulate API call
            await Task.Delay(1000);
            
            return new List<Article>
            {
                new Article 
                { 
                    Title = "Getting Started with WinUI", 
                    Description = "Learn the basics of WinUI development..." 
                },
                new Article 
                { 
                    Title = "Advanced Shimmer Techniques", 
                    Description = "Master shimmer loading patterns..." 
                },
                new Article 
                { 
                    Title = "Building Modern Apps", 
                    Description = "Create beautiful Windows applications..." 
                },
                new Article 
                { 
                    Title = "Performance Optimization", 
                    Description = "Optimize your app for best performance..." 
                },
                new Article 
                { 
                    Title = "UI/UX Best Practices", 
                    Description = "Design principles for great user experience..." 
                }
            };
        }
    }
}
```

## Key Points

### Show Shimmer While Loading
```csharp
// Before async operation
shimmer.Visibility = Visibility.Visible;
contentView.Visibility = Visibility.Collapsed;

// After operation completes
shimmer.Visibility = Visibility.Collapsed;
contentView.Visibility = Visibility.Visible;
```

### Choosing the Right Type
```xaml
<!-- For user profiles -->
<syncfusion:SfShimmer Type="Profile"/>

<!-- For articles/blogs -->
<syncfusion:SfShimmer Type="Article"/>

<!-- For shopping/products -->
<syncfusion:SfShimmer Type="Shopping"/>

<!-- For video content -->
<syncfusion:SfShimmer Type="Video"/>
```

### Repeating for Lists
```xaml
<!-- Show 5 article placeholders -->
<syncfusion:SfShimmer Type="Article" RepeatCount="5"/>

<!-- Show 8 product placeholders -->
<syncfusion:SfShimmer Type="Shopping" RepeatCount="8"/>
```

## Next Steps

- **Built-in Types:** See [built-in-types.md](built-in-types.md) to explore all 7 shimmer types
- **Custom Layouts:** See [custom-layouts.md](custom-layouts.md) to create custom shimmer designs
- **Customization:** See [customization.md](customization.md) to adjust colors, wave animation, and timing
