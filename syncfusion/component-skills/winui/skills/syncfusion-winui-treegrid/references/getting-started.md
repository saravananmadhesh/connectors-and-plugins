# Getting Started with WinUI TreeGrid

This guide covers the essential steps to create your first WinUI TreeGrid application, from project setup to rendering hierarchical data.

## Prerequisites

- **Visual Studio 2022 or later** with WinUI workload installed
- **.NET 6.0 SDK or later**
- **Windows 10 version 1809 (build 17763) or later**
- **Windows App SDK 1.0 or later**

## Step 1: Create a WinUI 3 Application

Create a new WinUI 3 desktop application:

1. Open Visual Studio 2022
2. Create a new project
3. Search for "WinUI 3" templates
4. Select **"Blank App, Packaged (WinUI 3 in Desktop)"**
5. Configure project name and location
6. Select target and minimum Windows versions

## Step 2: Install NuGet Package

Add the Syncfusion TreeGrid NuGet package to your project.

### Via Package Manager Console

```powershell
Install-Package Syncfusion.Grid.WinUI
```

### Via NuGet Package Manager

1. Right-click project → **Manage NuGet Packages**
2. Search for **"Syncfusion.Grid.WinUI"**
3. Click **Install**

### Via .csproj File

```xml
<ItemGroup>
  <PackageReference Include="Syncfusion.Grid.WinUI" Version="*" />
</ItemGroup>
```

**Note:** Replace `*` with a specific version number for production applications.

## Step 3: Register License Key (If Applicable)

If using Syncfusion with a license, register it in `App.xaml.cs`:

```csharp
public App()
{
    // Register Syncfusion license
    Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    this.InitializeComponent();
}
```

**License Options:**
- **Free:** Community license for qualifying individuals/organizations
- **Trial:** 30-day evaluation period
- **Commercial:** For commercial applications

## Step 4: Import Namespace

Add the TreeGrid namespace to your XAML or C# files.

### In XAML

```xaml
<Window
    x:Class="TreeGridApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:treeGrid="using:Syncfusion.UI.Xaml.TreeGrid">
    <!-- TreeGrid control goes here -->
</Window>
```

### In C# Code-Behind

```csharp
using Syncfusion.UI.Xaml.TreeGrid;
```

## Step 5: Initialize TreeGrid Control

### XAML Initialization

```xaml
<Window
    x:Class="TreeGridApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:treeGrid="using:Syncfusion.UI.Xaml.TreeGrid">
    
    <Grid x:Name="rootGrid">
        <treeGrid:SfTreeGrid x:Name="sfTreeGrid" />
    </Grid>
</Window>
```

### C# Code Initialization

```csharp
using Syncfusion.UI.Xaml.TreeGrid;

namespace TreeGridApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            SfTreeGrid sfTreeGrid = new SfTreeGrid();
            rootGrid.Children.Add(sfTreeGrid);
        }
    }
}
```

## Step 6: Verify Basic Rendering

Run the application to verify the TreeGrid control renders (it will be empty without data).

**Expected Result:** An empty grid with default styling appears in your window.

## Troubleshooting

### Package Not Found
- Ensure NuGet package source includes `nuget.org`
- Clear NuGet cache: `dotnet nuget locals all --clear`
- Restart Visual Studio

### Namespace Not Recognized
- Verify `Syncfusion.Grid.WinUI` package is installed
- Rebuild solution (Ctrl+Shift+B)
- Check spelling: `Syncfusion.UI.Xaml.TreeGrid` (case-sensitive)

### Runtime License Errors
- Register license key in `App.xaml.cs` constructor
- Verify license key is valid and not expired
- Check license key format (should be a long string)

### Design-Time Errors
- Restart Visual Studio
- Clean and rebuild solution
- Check Windows SDK version compatibility

---

**Next Steps:** Proceed to data-binding.md to learn how to populate the TreeGrid with hierarchical data.
