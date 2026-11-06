# Getting Started with WinUI Ribbon

This guide walks you through the initial setup and basic implementation of the Syncfusion WinUI Ribbon control in your application.

## Installation

### Step 1: Install NuGet Package

Install the Syncfusion Ribbon package using one of these methods:

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Ribbon.WinUI
```

**NuGet Package Manager UI:**
1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.Ribbon.WinUI"
3. Click Install

**Package Version:** Use the latest stable version compatible with your WinUI SDK.

### Step 2: Configure License

Syncfusion components require a license key. Register it in your `App.xaml.cs`:

```csharp
using Microsoft.UI.Xaml;

namespace MyRibbonApp
{
    public partial class App : Application
    {
        public App()
        {
            // Register Syncfusion license BEFORE InitializeComponent
            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
            
            this.InitializeComponent();
        }
        
        // ... rest of App code
    }
}
```

**License Options:**
- **Community License:** Free for companies with <$1M revenue
- **Trial License:** 30-day evaluation
- **Commercial License:** Full features

Get your license at: https://www.syncfusion.com/sales/products

## Basic Implementation

### Step 3: Add Namespace

Add the Ribbon namespace to your XAML page:

```xaml
<Page x:Class="MyRibbonApp.MainPage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:ribbon="using:Syncfusion.UI.Xaml.Ribbon">
    
    <!-- Page content -->
</Page>
```

### Step 4: Create Ribbon Control

Add the `SfRibbon` control to your page:

```xaml
<Grid x:Name="rootGrid">
    <ribbon:SfRibbon x:Name="sfRibbon">
        <!-- Ribbon content will go here -->
    </ribbon:SfRibbon>
</Grid>
```

### Step 5: Add Ribbon Tabs

Create tabs to categorize commands:

```xaml
<ribbon:SfRibbon x:Name="sfRibbon">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home" />
        <ribbon:RibbonTab Header="Insert" />
        <ribbon:RibbonTab Header="View" />
        <ribbon:RibbonTab Header="Layout" />
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

### Step 6: Add Ribbon Groups

Organize commands within tabs using groups:

```xaml
<ribbon:SfRibbon x:Name="sfRibbon">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home">
            <ribbon:RibbonGroup Header="Clipboard" />
            <ribbon:RibbonGroup Header="Font" />
            <ribbon:RibbonGroup Header="Paragraph" />
        </ribbon:RibbonTab>
        <ribbon:RibbonTab Header="Insert" />
        <ribbon:RibbonTab Header="View" />
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

### Step 7: Add Ribbon Buttons

Populate groups with buttons:

```xaml
<ribbon:RibbonTab Header="Home">
    <ribbon:RibbonGroup Header="Clipboard">
        <ribbon:RibbonButton Content="Cut"
                           Icon="Cut"
                           AllowedSizeModes="Normal"
                           Click="OnCutClick" />
        <ribbon:RibbonButton Content="Copy"
                           Icon="Copy"
                           AllowedSizeModes="Normal"
                           Click="OnCopyClick" />
        <ribbon:RibbonButton Content="Paste"
                           Icon="Paste"
                           AllowedSizeModes="Large"
                           Click="OnPasteClick" />
    </ribbon:RibbonGroup>
</ribbon:RibbonTab>
```

**Code-behind for button handlers:**

```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace MyRibbonApp
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }
        
        private void OnCutClick(object sender, RoutedEventArgs e)
        {
            // Implement cut logic
        }
        
        private void OnCopyClick(object sender, RoutedEventArgs e)
        {
            // Implement copy logic
        }
        
        private void OnPasteClick(object sender, RoutedEventArgs e)
        {
            // Implement paste logic
        }
    }
}
```

## Minimal Working Example

Complete minimal example with functional ribbon:

```xaml
<Page x:Class="MyRibbonApp.MainPage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:ribbon="using:Syncfusion.UI.Xaml.Ribbon"
      Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    
    <Grid x:Name="rootGrid">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto" />
            <RowDefinition Height="*" />
        </Grid.RowDefinitions>
        
        <!-- Ribbon -->
        <ribbon:SfRibbon x:Name="sfRibbon" Grid.Row="0">
            <ribbon:SfRibbon.Tabs>
                <ribbon:RibbonTab Header="Home">
                    <ribbon:RibbonGroup Header="Actions">
                        <ribbon:RibbonButton Content="Save"
                                           Icon="Save"
                                           AllowedSizeModes="Large"
                                           Click="OnSaveClick" />
                        <ribbon:RibbonButton Content="Open"
                                           Icon="OpenFile"
                                           AllowedSizeModes="Normal"
                                           Click="OnOpenClick" />
                    </ribbon:RibbonGroup>
                </ribbon:RibbonTab>
                <ribbon:RibbonTab Header="View">
                    <ribbon:RibbonGroup Header="Zoom">
                        <ribbon:RibbonButton Content="Zoom In"
                                           Icon="ZoomIn"
                                           AllowedSizeModes="Normal" />
                        <ribbon:RibbonButton Content="Zoom Out"
                                           Icon="ZoomOut"
                                           AllowedSizeModes="Normal" />
                    </ribbon:RibbonGroup>
                </ribbon:RibbonTab>
            </ribbon:SfRibbon.Tabs>
        </ribbon:SfRibbon>
        
        <!-- Main content area -->
        <Grid Grid.Row="1" Padding="20">
            <TextBlock Text="Your application content goes here"
                     VerticalAlignment="Center"
                     HorizontalAlignment="Center"
                     FontSize="20" />
        </Grid>
    </Grid>
</Page>
```

## Programmatic Creation

You can also create the ribbon entirely in C#:

```csharp
using Syncfusion.UI.Xaml.Ribbon;
using Microsoft.UI.Xaml.Controls;

public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
        CreateRibbon();
    }
    
    private void CreateRibbon()
    {
        // Create ribbon
        SfRibbon ribbon = new SfRibbon();
        
        // Create tabs
        RibbonTab homeTab = new RibbonTab { Header = "Home" };
        RibbonTab insertTab = new RibbonTab { Header = "Insert" };
        
        // Create group
        RibbonGroup clipboardGroup = new RibbonGroup { Header = "Clipboard" };
        
        // Create buttons
        RibbonButton cutButton = new RibbonButton
        {
            Content = "Cut",
            Icon = new SymbolIcon(Symbol.Cut),
            AllowedSizeModes = RibbonElementSizeModes.Normal
        };
        cutButton.Click += OnCutClick;
        
        RibbonButton copyButton = new RibbonButton
        {
            Content = "Copy",
            Icon = new SymbolIcon(Symbol.Copy),
            AllowedSizeModes = RibbonElementSizeModes.Normal
        };
        copyButton.Click += OnCopyClick;
        
        // Assemble hierarchy
        clipboardGroup.Items.Add(cutButton);
        clipboardGroup.Items.Add(copyButton);
        homeTab.Items.Add(clipboardGroup);
        ribbon.Tabs.Add(homeTab);
        ribbon.Tabs.Add(insertTab);
        
        // Add to page
        rootGrid.Children.Add(ribbon);
    }
    
    private void OnCutClick(object sender, RoutedEventArgs e) { }
    private void OnCopyClick(object sender, RoutedEventArgs e) { }
}
```

## Common Setup Issues

### Issue 1: License Error
**Problem:** "Invalid license" or trial expired message

**Solution:**
- Verify license key is registered before `InitializeComponent()`
- Check license key is valid and not expired
- Ensure license matches Syncfusion version

### Issue 2: Namespace Not Found
**Problem:** Cannot find `Syncfusion.UI.Xaml.Ribbon` namespace

**Solution:**
- Verify NuGet package is installed
- Clean and rebuild solution
- Check package version compatibility with WinUI SDK
- Restart Visual Studio if IntelliSense not updating

### Issue 3: Ribbon Not Appearing
**Problem:** Empty space where ribbon should be

**Solution:**
- Check Grid.Row assignment if using RowDefinitions
- Verify ribbon is in visible container
- Check Height="Auto" for ribbon row
- Ensure at least one tab with content exists

### Issue 4: Icons Not Displaying
**Problem:** Buttons show text but no icons

**Solution:**
- Use proper icon types: `SymbolIcon`, `FontIcon`, `BitmapIcon`
- For SymbolIcon, use valid `Symbol` enum values
- For FontIcon, specify correct Glyph code
- For BitmapIcon, verify image path is correct

## Next Steps

Now that you have a basic ribbon set up:

1. **Organize Commands** - Structure tabs and groups logically → [tabs-and-groups.md](tabs-and-groups.md)
2. **Add More Items** - Implement dropdowns, split buttons, toggle buttons → [ribbon-items.md](ribbon-items.md)
3. **Add Backstage** - Create settings/options menu → [backstage.md](backstage.md)
4. **Enable Simplified Mode** - Add compact layout option → [simplified-layout.md](simplified-layout.md)

## Quick Reference

**Essential Properties:**
- `SfRibbon.Tabs` - Collection of ribbon tabs
- `RibbonTab.Header` - Tab label text
- `RibbonTab.Items` - Collection of ribbon groups
- `RibbonGroup.Header` - Group label text
- `RibbonGroup.Items` - Collection of ribbon items
- `RibbonButton.Content` - Button label
- `RibbonButton.Icon` - Button icon
- `RibbonButton.AllowedSizeModes` - Button size (Small/Normal/Large)

**Essential Events:**
- `RibbonButton.Click` - Button click event
- `SfRibbon.SelectedTabChanged` - Tab selection changed
