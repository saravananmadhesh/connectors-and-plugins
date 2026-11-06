# Installation and Package Setup for Syncfusion WinUI

> **Important:** After installation, ensure all Syncfusion NuGet packages are updated to the latest available version via the NuGet Package Manager.

## NuGet Package Installation

### Option 1: Package Manager Console (Recommended)

**Step 1: Open Package Manager Console**
- Visual Studio → Tools → NuGet Package Manager → Package Manager Console

**Step 2: Install Syncfusion Package**
```powershell
Install-Package Syncfusion.WinUI
```

**Step 3: Wait for Installation**
- NuGet downloads and installs all dependencies
- Check Output window for success message

### Option 2: NuGet Package Manager UI

**Step 1: Open NuGet Package Manager**
- Right-click Project → Manage NuGet Packages

**Step 2: Search for Syncfusion**
- Click "Browse" tab
- Search: "Syncfusion.WinUI"

**Step 3: Select and Install**
- Click "Syncfusion.WinUI" in results
- Click "Install" button
- Accept license terms

### Option 3: .NET CLI

```powershell
dotnet add package Syncfusion.WinUI
```

---

## Package Details

### Main Package
```
Syncfusion.WinUI - Latest version
├── All Syncfusion WinUI components
├── Core framework libraries
├── Themes (FluentLight, FluentDark, Material, etc.)
└── Documentation and samples
```

### Component-Specific Packages (Optional)
If you only need specific components:

```powershell
# Install individual component packages
Install-Package Syncfusion.WinUI.Core          # Core library (required)
Install-Package Syncfusion.WinUI.Inputs        # Input controls
Install-Package Syncfusion.WinUI.Grids         # Data Grid
Install-Package Syncfusion.WinUI.Charts        # Charts
Install-Package Syncfusion.WinUI.DataViz       # Data visualization
```

**Recommendation:** Use `Syncfusion.WinUI` (complete package) for simplicity unless you have specific size constraints.

---

## Registering License in Code

### Method 1: In App.xaml.cs (Recommended)

```csharp
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        // Register Syncfusion License
        // IMPORTANT: Do this before creating any Syncfusion components
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY_HERE");
        
        this.InitializeComponent();
    }
}
```

### Method 2: In MainWindow.xaml.cs

```csharp
using Syncfusion.Licensing;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        // Register license before creating components
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY_HERE");
    }
}
```

### Method 3: Using Environment Variable (Secure)

**Step 1: Set Environment Variable**

Windows (Command Prompt as Admin):
```cmd
setx SYNCFUSION_LICENSE_KEY "YOUR_LICENSE_KEY_HERE"
```

PowerShell (as Admin):
```powershell
[Environment]::SetEnvironmentVariable("SYNCFUSION_LICENSE_KEY", "YOUR_LICENSE_KEY_HERE", "User")
```

**Step 2: Read from Code**

```csharp
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        // Read license from environment variable
        string licenseKey = Environment.GetEnvironmentVariable("SYNCFUSION_LICENSE_KEY");
        
        if (!string.IsNullOrEmpty(licenseKey))
        {
            SyncfusionLicenseProvider.RegisterLicense(licenseKey);
        }
        
        this.InitializeComponent();
    }
}
```

---

## Using Syncfusion Components in XAML

### Step 1: Add Namespace Declaration

In your XAML file (MainWindow.xaml, UserControl, etc.):

```xml
<Window x:Class="YourApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:syncfusion="using:Syncfusion.UI.Xaml.Controls"
        xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    <!-- Your content -->
</Window>
```

### Step 2: Use Syncfusion Components

```xml
<!-- Example: ComboBox -->
<editors:SfComboBox x:Name="comboBox"
                    Width="250"
                    PlaceholderText="Select a social media"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />

<!-- Example: DatePicker -->
<syncfusion:SfDatePicker SelectedDate="2026-03-21" />

<!-- Example: MaskedTextBox -->
<syncfusion:SfMaskedTextBox 
    x:Name="maskedTextBox"
    Width="200"
    MaskType="Simple"
    Mask="(000) 000-0000"
    PromptChar="#" />
```

### Step 3: Compile and Run

```powershell
# Build project
dotnet build

# Run application
dotnet run
```

---

## CSS/Theme Registration

### Automatic Theme Registration

Syncfusion WinUI uses built-in themes (no separate CSS needed like web components).

**Available Themes:**
- FluentLight (default)
- FluentDark
- MaterialLight
- MaterialDark
- WinUI (Windows native theme)

### Setting Theme in Code

```csharp
using Syncfusion.WinUI.Theme;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Set application theme
        SyncfusionThemesHelper.SetTheme("FluentDark");
        
        this.InitializeComponent();
    }
}
```

### Available Namespaces

```csharp
// For components
using Syncfusion.UI.Xaml.Controls;

// For licensing
using Syncfusion.Licensing;

// For theming
using Syncfusion.WinUI.Theme;

// For data binding (if using data controls)
using Syncfusion.UI.Xaml.Data;
```

---

## Verifying Installation

### Check 1: NuGet Package Installed

1. Open Package Manager Console
2. Run: `Get-Package`
3. Look for "Syncfusion.WinUI" in the list

```powershell
# Expected output:
# Id                      Version   ProjectName
# Syncfusion.WinUI        22.1.36   YourProject
```

### Check 2: IntelliSense Works

1. In XAML editor, type: `<syncfusion:`
2. IntelliSense should show available components
3. If not: Reload VS or restart IntelliSense

### Check 3: Compile Successfully

```powershell
dotnet build
```

Should complete without errors.

### Check 4: Component Renders

Create simple test:

```xml
<!-- MainWindow.xaml -->
<Window x:Class="TestApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:syncfusion="using:Syncfusion.UI.Xaml.Controls"
        xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    <Grid>
        <editors:SfComboBox x:Name="testComboBox" 
                          Width="250"
                          PlaceholderText="Select an item"
                          HorizontalAlignment="Center" 
                          VerticalAlignment="Center"/>
    </Grid>
</Window>
```

Run application - button should appear and be clickable.

---

## Troubleshooting Installation

### Issue: "Syncfusion license required"
**Cause:** License not registered in code
**Solution:** Add `SyncfusionLicenseProvider.RegisterLicense()` to App.xaml.cs

### Issue: Namespace not found in XAML
**Cause:** NuGet package not installed
**Solution:** 
1. Delete `bin` and `obj` folders
2. Run: `dotnet restore`
3. Run: `dotnet build`
4. Reload Visual Studio

### Issue: IntelliSense not showing Syncfusion components
**Cause:** IntelliSense cache outdated
**Solution:**
1. Close XAML editor
2. Edit project file to touch it
3. Reload solution
4. Or restart Visual Studio

### Issue: Package restore fails
**Cause:** Network/NuGet configuration issue
**Solution:**
```powershell
# Clear NuGet cache
nuget locals all -clear

# Restore packages
dotnet restore

# Or in Package Manager Console
Update-Package -Reinstall
```

---

## Project File Configuration

### .csproj File Structure

```xml
<Project Sdk="Microsoft.NET.Sdk.WindowsDesktop">

  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net8.0-windows</TargetFramework>
    <UseWinUI>true</UseWinUI>
    <Platforms>x86;x64;ARM64</Platforms>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Syncfusion.WinUI" Version="*" />
    <PackageReference Include="Microsoft.WindowsAppSDK" Version="1.6.240923001" />
  </ItemGroup>

</Project>
```

### Important Properties
- `<TargetFramework>`: Must be `net8.0-windows` or higher (latest: `net10.0-windows` recommended)
- `<UseWinUI>`: Must be `true`
- `<Platforms>`: x86, x64, ARM64 (add as needed)

---

## Offline Installation

### When Online Installation Isn't Available

1. **Download packages on another machine:**
   ```powershell
   nuget download Syncfusion.WinUI -DirectDownload -OutputDirectory "C:\packages"
   ```

2. **Copy packages to offline machine**

3. **Configure local NuGet feed:**
   - Create folder: `C:\LocalNuGet`
   - Copy package files there
   - In Visual Studio: Tools → Options → NuGet Package Manager → Package Sources
   - Add source: `Name: Local` → `Source: C:\LocalNuGet`

4. **Install from local source:**
   ```powershell
   Install-Package Syncfusion.WinUI -Source C:\LocalNuGet
   ```

---

## Next Steps

After successful installation:
1. Register your license (see [License Validation](license-validation.md))
2. Explore available components in your project
3. Configure themes and features (see [Feature Configuration](configuration-basics.md))
4. Review component documentation and samples
5. Start building your WinUI application
