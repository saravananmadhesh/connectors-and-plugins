# Getting Started with WinUI Barcode

This guide walks through the complete setup process for implementing the Syncfusion WinUI Barcode control (SfBarcode) in a desktop application, from project creation to your first working barcode.

## Prerequisites

Before starting, ensure you have:
- **Visual Studio 2022 or 2026** with WinUI workload installed
- **.NET 9.0 or higher** SDK
- **Windows 10 SDK** (version 10.0.17763.0 or higher)
- **Windows 10** (version 1809+) or **Windows 11**

## Step 1: Create WinUI 3 Project

### Using Visual Studio

1. Open Visual Studio
2. Click **Create a new project**
3. Search for "WinUI" in the templates
4. Select **Blank App, Packaged (WinUI 3 in Desktop)**
5. Click **Next**
6. Configure your project:
   - **Project name:** e.g., "BarcodeApp"
   - **Location:** Choose your directory
   - **Solution name:** Leave as default or customize
7. Click **Create**
8. Select target framework (**.NET 9.0 or higher**)
9. Click **Create**

The project structure will include:
- `MainWindow.xaml` - Main window UI
- `MainWindow.xaml.cs` - Code-behind
- `App.xaml` and `App.xaml.cs` - Application entry point

## Step 2: Install Syncfusion.Barcode.WinUI NuGet Package

### Using NuGet Package Manager UI

1. Right-click on your project in Solution Explorer
2. Select **Manage NuGet Packages**
3. Click the **Browse** tab
4. Search for **"Syncfusion.Barcode.WinUI"**
5. Select the package from the search results
6. Click **Install**
7. Accept the license agreement

### Using Package Manager Console

Open the Package Manager Console (Tools → NuGet Package Manager → Package Manager Console) and run:

```powershell
Install-Package Syncfusion.Barcode.WinUI
```

### Using .NET CLI

```bash
dotnet add package Syncfusion.Barcode.WinUI
```

### Verify Installation

After installation, verify the package reference in your `.csproj` file:

```xml
<ItemGroup>
  <PackageReference Include="Syncfusion.Barcode.WinUI" Version="25.1.35" />
</ItemGroup>
```

## Step 3: Add Namespace Imports

### In XAML (MainWindow.xaml)

Add the Syncfusion namespace to your XAML page:

```xml
<Window
    x:Class="BarcodeApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:BarcodeApp"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Barcode"
    mc:Ignorable="d">
    
    <!-- Your UI content here -->
</Window>
```

**Key:** `xmlns:syncfusion="using:Syncfusion.UI.Xaml.Barcode"`

### In C# Code-Behind (MainWindow.xaml.cs)

Add the using directive at the top of your C# file:

```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Barcode;  // Add this line

namespace BarcodeApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
        }
    }
}
```

## Step 4: Create Your First Barcode

### XAML Approach (Declarative)

Add the barcode control in your `MainWindow.xaml`:

```xml
<Window
    x:Class="BarcodeApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Barcode">
    
    <Grid>
        <syncfusion:SfBarcode x:Name="barcode" 
                               Value="48625310"
                               Height="150">
            <syncfusion:SfBarcode.Symbology>
                <syncfusion:CodabarBarcode />
            </syncfusion:SfBarcode.Symbology>
        </syncfusion:SfBarcode>
    </Grid>
</Window>
```

### C# Code-Behind Approach (Programmatic)

Alternatively, create the barcode entirely in code:

```csharp
using Microsoft.UI.Xaml;
using Syncfusion.UI.Xaml.Barcode;

namespace BarcodeApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Create barcode control
            SfBarcode barcode = new SfBarcode();
            barcode.Value = "48625310";
            barcode.Height = 150;
            
            // Set symbology
            CodabarBarcode codabarBarcode = new CodabarBarcode();
            barcode.Symbology = codabarBarcode;
            
            // Add to grid (assuming you have a Grid named Root_Grid)
            Root_Grid.Children.Add(barcode);
        }
    }
}
```

**XAML for code-behind approach:**
```xml
<Grid x:Name="Root_Grid">
    <!-- Barcode will be added programmatically -->
</Grid>
```

## Understanding the Basic Structure

Every barcode requires two essential properties:

### 1. Value Property
The text or data to encode in the barcode.

```xml
Value="48625310"
```

**Important:** The value must contain only characters supported by the chosen symbology (see symbology-types.md for character sets).

### 2. Symbology Property
The type of barcode to generate. This is set using a symbology class instance.

```xml
<syncfusion:SfBarcode.Symbology>
    <syncfusion:CodabarBarcode />
</syncfusion:SfBarcode.Symbology>
```

**Available symbologies:**
- 1D: CodabarBarcode, Code11Barcode, Code32Barcode, Code39Barcode, Code39ExtendedBarcode, Code93Barcode, Code93ExtendedBarcode, Code128ABarcode, Code128BBarcode, Code128CBarcode, UpcBarcode, GS1Code128Barcode
- 2D: QRBarcode, DataMatrixBarcode, Pdf417Barcode

## Complete Working Example

Here's a complete, ready-to-run example:

**MainWindow.xaml:**
```xml
<Window
    x:Class="BarcodeApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Barcode"
    Title="Barcode Example" 
    Height="400" 
    Width="600">
    
    <Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
        <StackPanel HorizontalAlignment="Center" 
                    VerticalAlignment="Center" 
                    Spacing="20">
            
            <TextBlock Text="Codabar Barcode" 
                       FontSize="18" 
                       FontWeight="Bold" 
                       HorizontalAlignment="Center"/>
            
            <syncfusion:SfBarcode x:Name="barcode" 
                                   Value="48625310"
                                   Height="150"
                                   Width="300">
                <syncfusion:SfBarcode.Symbology>
                    <syncfusion:CodabarBarcode />
                </syncfusion:SfBarcode.Symbology>
            </syncfusion:SfBarcode>
            
        </StackPanel>
    </Grid>
</Window>
```

**MainWindow.xaml.cs:**
```csharp
using Microsoft.UI.Xaml;

namespace BarcodeApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
        }
    }
}
```

## Running Your Application

1. Press **F5** or click **Start** in Visual Studio
2. The application will launch showing your barcode
3. The value "48625310" will be encoded as a Codabar barcode
4. The text appears below the barcode bars by default

## Next Steps

Now that you have a basic barcode working:

- **Choose a different symbology:** See [symbology-types.md](symbology-types.md) to select the right barcode type for your data
- **Customize text display:** See [text-customization.md](text-customization.md) to control text alignment, spacing, and visibility
- **Change appearance:** See [visual-customization.md](visual-customization.md) to adjust colors, bar widths, and rotation
- **Configure symbology settings:** See [symbology-settings.md](symbology-settings.md) for advanced options like checksums and error correction

## Troubleshooting

### Issue: "The type 'SfBarcode' was not found"
**Solution:** Verify the namespace is correctly added:
```xml
xmlns:syncfusion="using:Syncfusion.UI.Xaml.Barcode"
```

### Issue: NuGet package not installing
**Solution:** 
- Ensure you have internet connectivity
- Check your NuGet package source settings (Tools → Options → NuGet Package Manager → Package Sources)
- Try clearing NuGet cache: `dotnet nuget locals all --clear`

### Issue: Barcode not rendering
**Solution:** 
- Ensure both `Value` and `Symbology` properties are set
- Verify the `Value` contains valid characters for the chosen symbology
- Set explicit Height/Width if the barcode appears too small

### Issue: Invalid value for symbology
**Solution:** Each symbology supports specific characters. For example:
- Code11: Only digits (0-9) and dash (-)
- Code39: Alphanumeric and specific special characters
- See [symbology-types.md](symbology-types.md) for complete character sets
