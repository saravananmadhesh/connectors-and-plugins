# Getting Started with SfColorPalette

This guide covers the initial setup and basic implementation of the Syncfusion WinUI Color Palette control.

## Overview

The **SfColorPalette** control provides a swatch-based color selection interface with theme colors, standard colors, a More Colors dialog, and recently used colors. It is ideal for document editors, drawing tools, and any application that needs palette-based color selection.

## Installation Steps

### Step 1: Create a WinUI 3 Application

1. Open **Visual Studio**
2. Create a new project
3. Select **"Blank App, Packaged (WinUI 3 in Desktop)"**
4. Name your project (e.g., "ColorPaletteDemo")
5. Click **Create**

### Step 2: Add NuGet Package

Add the Syncfusion Editors NuGet package to your project:

**Using Package Manager Console:**
```powershell
Install-Package Syncfusion.Editors.WinUI
```

**Using NuGet Package Manager UI:**
1. Right-click on your project in Solution Explorer
2. Select **"Manage NuGet Packages"**
3. Search for **"Syncfusion.Editors.WinUI"**
4. Click **Install**
5. Accept the license terms

**Using .csproj file:**
```xml
<ItemGroup>
    <PackageReference Include="Syncfusion.Editors.WinUI" Version="*" />
</ItemGroup>
```

## Basic Implementation

### Step 3: Import Namespace

Add the Syncfusion namespace to your XAML page:

```xml
xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
```

**Complete Page Declaration:**
```xml
<Page
    x:Class="ColorPaletteDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors">

    <Grid>
        <!-- Your Color Palette will go here -->
    </Grid>
</Page>
```

### Step 4: Add SfColorPalette Control

**Minimal XAML:**
```xml
<editors:SfColorPalette Name="colorPalette" />
```

**With Basic Properties:**
```xml
<editors:SfColorPalette 
    Name="colorPalette"
    ShowMoreColorsButton="True"
    ShowNoColorButton="True" />
```

### Step 5: Initialize in Code-Behind

**Import namespace in C#:**
```csharp
using Syncfusion.UI.Xaml.Editors;
using Microsoft.UI.Xaml.Media;
using Windows.UI;
```

**Create programmatically:**
```csharp
public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();

        // Optional: Create and add programmatically
        SfColorPalette colorPalette = new SfColorPalette();
        grid.Children.Add(colorPalette);
    }
}
```

## First Complete Example

### MainPage.xaml
```xml
<Page
    x:Class="ColorPaletteDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors">

    <Grid Padding="20">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto" />
            <RowDefinition Height="Auto" />
            <RowDefinition Height="Auto" />
        </Grid.RowDefinitions>

        <TextBlock 
            Text="Color Palette Demo" 
            FontSize="24" 
            FontWeight="Bold"
            Margin="0,0,0,20" />

        <!-- Color Palette -->
        <editors:SfColorPalette 
            x:Name="colorPalette"
            Grid.Row="1"
            ShowMoreColorsButton="True"
            ShowNoColorButton="True"
            SelectedBrushChanged="ColorPalette_SelectedBrushChanged" />

        <!-- Preview -->
        <StackPanel Grid.Row="2" Margin="0,20,0,0">
            <TextBlock Text="Selected Color Preview:" Margin="0,0,0,8" />
            <Rectangle 
                x:Name="previewRectangle"
                Width="200" 
                Height="60"
                Stroke="Black"
                StrokeThickness="1" />
        </StackPanel>
    </Grid>
</Page>
```

### MainPage.xaml.cs
```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Syncfusion.UI.Xaml.Editors;

namespace ColorPaletteDemo
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }

        private void ColorPalette_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
        {
            // Update preview with selected color
            previewRectangle.Fill = e.NewBrush;
        }
    }
}
```

## Accessing a Color Programmatically

Use the `SelectedBrush` property to get or set the selected color at any time:

```xml
<!-- Bind button background to palette selection -->
<editors:SfColorPalette x:Name="colorPalette" SelectedBrush="Yellow" />
<Button Background="{Binding ElementName=colorPalette, Path=SelectedBrush}" Content="Preview" />
```

```csharp
// Set selected color
colorPalette.SelectedBrush = new SolidColorBrush(Colors.Yellow);

// Get selected color
if (colorPalette.SelectedBrush is SolidColorBrush brush)
{
    var color = brush.Color; // Windows.UI.Color
}
```

> **Default value:** `SelectedBrush` defaults to `Transparent (#00FFFFFF)`.

## Handling the SelectedBrushChanged Event

```xml
<editors:SfColorPalette 
    SelectedBrushChanged="ColorPalette_SelectedBrushChanged"
    Name="colorPalette" />
```

```csharp
private void ColorPalette_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    var oldBrush = e.OldBrush;
    var newBrush = e.NewBrush;
    // React to color change
}
```

## Showing the No Color Button

Enable a "No Color" button to allow transparent color selection:

```xml
<editors:SfColorPalette ShowNoColorButton="True" Name="colorPalette" />
```

```csharp
colorPalette.ShowNoColorButton = true;
```

> **Default value:** `ShowNoColorButton` is `false`.

## Showing the More Colors Button

Enable the More Colors button to open a color spectrum dialog for extended choices:

```xml
<editors:SfColorPalette ShowMoreColorsButton="True" Name="colorPalette" />
```

```csharp
colorPalette.ShowMoreColorsButton = true;
```

> **Default value:** `ShowMoreColorsButton` is `true`.

## Getting Recently Used Colors

Colors selected from the More Colors dialog are tracked in `RecentColors`:

```csharp
// Get the recently selected color list
var recentColors = colorPalette.RecentColors;
```

> **Note:** Only colors selected from the More Colors dialog appear in `RecentColors`. Theme and standard color selections are not included.

## Control Structure Overview

The SfColorPalette visual layout includes:

1. **Automatic Color Button** — Resets to the configured default color
2. **No Color Button** — Selects transparent (shown when `ShowNoColorButton="True"`)
3. **Theme Colors Panel** — Base theme colors with optional shade variants
4. **Standard Colors Panel** — Fixed standard colors with optional shade variants
5. **Recent Colors Panel** — Shows previously selected colors from More Colors dialog
6. **More Colors Button** — Opens the full color spectrum dialog

## Troubleshooting

### Issue: Control Not Appearing
**Solution:** Verify namespace import: `xmlns:editors="using:Syncfusion.UI.Xaml.Editors"`

### Issue: Build Errors After Adding NuGet
**Solution:** Clean and rebuild the solution. Ensure NuGet packages are fully restored.

### Issue: SelectedBrush Not Updating Target
**Solution:** Ensure the binding mode is correct, or wire the `SelectedBrushChanged` event and apply manually.
