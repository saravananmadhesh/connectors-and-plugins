# Getting Started with WinUI BusyIndicator

This guide covers installation, basic setup, and creating your first BusyIndicator control in WinUI applications.

## Prerequisites

- **WinUI 3 Desktop app** for C# and .NET 5+
- **Windows App SDK** 1.0 or later
- **Windows 10 (1809)** or later, or Windows 11
- **Visual Studio 2019/2022** with WinUI workload

## Installation

### Step 1: Install NuGet Package

Install the Syncfusion WinUI Notifications package via NuGet Package Manager:

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Notifications.WinUI
```

**Or search in NuGet Package Manager:**
- Search: `Syncfusion.Notifications.WinUI`
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

Import the Syncfusion Notifications namespace in your XAML or C# files:

**XAML:**
```xaml
xmlns:notification="using:Syncfusion.UI.Xaml.Notifications"
```

**C#:**
```csharp
using Syncfusion.UI.Xaml.Notifications;
```

## Basic Initialization

### XAML Approach

```xaml
<Page
    x:Class="MyApp.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:notification="using:Syncfusion.UI.Xaml.Notifications">
    
    <Grid>
        <notification:SfBusyIndicator 
            x:Name="busyIndicator"
            IsActive="True"/>
    </Grid>
</Page>
```

### C# Code-Behind Approach

```csharp
using Syncfusion.UI.Xaml.Notifications;

public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
        
        // Create BusyIndicator
        SfBusyIndicator busyIndicator = new SfBusyIndicator();
        busyIndicator.IsActive = true;
        
        // Add to Grid
        this.Content = busyIndicator;
    }
}
```

## IsActive Property

The `IsActive` property controls whether the BusyIndicator is visible and animating.

**Show indicator:**
```csharp
busyIndicator.IsActive = true;
```

**Hide indicator:**
```csharp
busyIndicator.IsActive = false;
```

### Controlling Visibility During Operations

```csharp
private async void LoadDataButton_Click(object sender, RoutedEventArgs e)
{
    // Show indicator
    busyIndicator.IsActive = true;
    
    try
    {
        // Perform async operation
        await LoadDataFromApiAsync();
    }
    finally
    {
        // Always hide indicator
        busyIndicator.IsActive = false;
    }
}

private async Task LoadDataFromApiAsync()
{
    await Task.Delay(3000); // Simulate API call
    // Your data loading logic
}
```

## First Complete Example

Create a simple data loading scenario with BusyIndicator:

**MainPage.xaml:**
```xaml
<Page
    x:Class="BusyIndicatorDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:notification="using:Syncfusion.UI.Xaml.Notifications">
    
    <Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        
        <!-- Control Panel -->
        <StackPanel Grid.Row="0" Padding="20" Spacing="10">
            <TextBlock Text="BusyIndicator Demo" 
                      FontSize="24" 
                      FontWeight="Bold"/>
            <Button x:Name="loadButton" 
                   Content="Load Data" 
                   Click="LoadButton_Click"/>
        </StackPanel>
        
        <!-- Content Area with BusyIndicator -->
        <Grid Grid.Row="1">
            <ListView x:Name="dataListView" 
                     Visibility="{x:Bind IsDataLoaded, Mode=OneWay}"/>
            
            <notification:SfBusyIndicator 
                x:Name="busyIndicator"
                IsActive="False"
                AnimationType="DottedCircularFluent"
                BusyContent="Loading data..."/>
        </Grid>
    </Grid>
</Page>
```

**MainPage.xaml.cs:**
```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Notifications;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusyIndicatorDemo
{
    public sealed partial class MainPage : Page
    {
        private bool isDataLoaded = false;
        
        public bool IsDataLoaded
        {
            get => isDataLoaded;
            set
            {
                isDataLoaded = value;
                // Update ListView visibility
                dataListView.Visibility = value ? Visibility.Visible : Visibility.Collapsed;
            }
        }
        
        public MainPage()
        {
            this.InitializeComponent();
        }
        
        private async void LoadButton_Click(object sender, RoutedEventArgs e)
        {
            // Disable button during loading
            loadButton.IsEnabled = false;
            
            // Show busy indicator
            busyIndicator.IsActive = true;
            
            try
            {
                // Simulate data loading
                await Task.Delay(2000);
                var data = await LoadDataAsync();
                
                // Populate ListView
                dataListView.ItemsSource = data;
                IsDataLoaded = true;
            }
            catch (Exception ex)
            {
                // Handle error
                ContentDialog dialog = new ContentDialog
                {
                    Title = "Error",
                    Content = $"Failed to load data: {ex.Message}",
                    CloseButtonText = "OK",
                    XamlRoot = this.XamlRoot
                };
                await dialog.ShowAsync();
            }
            finally
            {
                // Always hide indicator and enable button
                busyIndicator.IsActive = false;
                loadButton.IsEnabled = true;
            }
        }
        
        private async Task<List<string>> LoadDataAsync()
        {
            // Simulate API call
            await Task.Delay(2000);
            
            return new List<string>
            {
                "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"
            };
        }
    }
}
```

## Key Points

### Always Use Try-Finally
```csharp
busyIndicator.IsActive = true;
try
{
    await PerformOperationAsync();
}
finally
{
    busyIndicator.IsActive = false; // Ensures indicator is hidden
}
```

**Why:** If an exception occurs, the finally block ensures the indicator is hidden.

### Default Behavior
- **IsActive = false:** Indicator is not visible
- **IsActive = true:** Indicator appears with default animation (DottedCircularFluent)
- **Animation:** Continuous loop until IsActive is set to false

### Thread Safety
BusyIndicator must be updated on the UI thread. If updating from a background thread:

```csharp
await DispatcherQueue.EnqueueAsync(() =>
{
    busyIndicator.IsActive = true;
});
```

## Next Steps

- **Animation Types:** See [animation-types.md](animation-types.md) to explore 8 different animation styles
- **Content:** See [content.md](content.md) to add custom messages and templates
- **Customization:** See [customization.md](customization.md) to adjust size, speed, and colors
