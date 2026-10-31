# Troubleshooting Installation for Syncfusion WinUI

## Table of Contents
- [Installation Error Solutions](#installation-error-solutions)
- [NuGet Issues and Fixes](#nuget-issues-and-fixes)
- [License Validation Troubleshooting](#license-validation-troubleshooting)
- [Configuration Problem Fixes](#configuration-problem-fixes)
- [Debugging and Support](#debugging-and-support)

---

## Installation Error Solutions

### Error: "Package 'Syncfusion.WinUI' failed to install"

**Cause:** NuGet connection issue or corrupted download

**Solution:**

1. **Clear NuGet Cache**
   ```powershell
   # In Package Manager Console
   nuget locals all -clear
   ```

2. **Delete Project Artifacts**
   ```powershell
   # Close Visual Studio
   # Delete these folders from your project:
   Remove-Item -Path "bin" -Recurse
   Remove-Item -Path "obj" -Recurse
   Remove-Item -Path ".vs" -Recurse
   ```

3. **Restore and Reinstall**
   ```powershell
   dotnet restore
   Install-Package Syncfusion.WinUI
   ```

### Error: "Could not find a part of the path"

**Cause:** Project path contains spaces or special characters

**Solution:**

1. Move project to path without spaces:
   ```
   Bad:  C:\My Projects\WinUI App
   Good: C:\MyProjects\WinUIApp
   ```

2. Or rename project folder to remove spaces

3. Update all references in Visual Studio

### Error: "The system cannot find the file specified"

**Cause:** Missing .NET SDK or Visual Studio components

**Solution:**

1. **Check .NET Installation**
   ```powershell
   dotnet --version
   ```
   Should output: `8.0.xxx` or higher (latest: `.NET 10.0.xxx` recommended)

2. **If .NET not found:**
   - Download from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)
   - Install latest LTS version (.NET 10.0 recommended)
   - Restart Visual Studio and PowerShell

3. **Verify Visual Studio Workloads**
   - Visual Studio → Tools → Get Tools and Features
   - Ensure "Desktop development with C++" is checked
   - Ensure ".NET desktop development" is checked

### Error: "Project type not supported"

**Cause:** Project not configured for WinUI

**Solution:**

1. **Check .csproj file:**
   ```xml
   <Project Sdk="Microsoft.NET.Sdk.WindowsDesktop">
       <PropertyGroup>
           <TargetFramework>net8.0-windows</TargetFramework>
           <!-- Latest: net10.0-windows -->
           <UseWinUI>true</UseWinUI>
       </PropertyGroup>
   </Project>
   ```

2. **If missing UseWinUI:**
   - Edit .csproj
   - Add `<UseWinUI>true</UseWinUI>`
   - Reload project

---

## NuGet Issues and Fixes

### Error: "Unable to resolve dependency"

**Cause:** Dependency conflict or missing NuGet source

**Solution:**

1. **Check NuGet Sources**
   - Visual Studio → Tools → Options → NuGet Package Manager → Package Sources
   - Ensure `nuget.org` is enabled

2. **Add Official NuGet Source (if missing)**
   ```powershell
   # In Package Manager Console
   Register-PackageSource -Name NuGet -Location https://api.nuget.org/v3/index.json -ProviderName NuGet
   ```

3. **Update NuGet CLI**
   ```powershell
   Install-Module -Name NuGetProvider -Force
   ```

4. **Retry Installation**
   ```powershell
   Install-Package Syncfusion.WinUI -Force
   ```

### Error: "Access Denied" during package installation

**Cause:** Insufficient permissions or locked files

**Solution:**

1. **Run Visual Studio as Administrator**
   - Right-click Visual Studio icon
   - Select "Run as administrator"

2. **Close all instances of Visual Studio**
   - Fully close editor
   - Check Task Manager for devenv.exe processes
   - Kill remaining processes if needed

3. **Delete NuGet cache**
   ```powershell
   Remove-Item -Path "$env:LOCALAPPDATA\NuGet\Cache" -Recurse -Force
   ```

4. **Retry installation**

### Error: "The nuget server did not return a valid response"

**Cause:** Network issue or NuGet server temporarily unavailable

**Solution:**

1. **Test Internet Connection**
   ```powershell
   Test-NetConnection -ComputerName api.nuget.org -Port 443
   ```

2. **Wait and Retry**
   - NuGet.org sometimes experiences brief outages
   - Try again in 5-10 minutes

3. **Check Proxy Settings (if behind corporate proxy)**
   - Visual Studio → Tools → Options → NuGet Package Manager → Package Sources
   - Click source → Click ellipsis (...)
   - Configure proxy if needed

4. **Use Command Line NuGet**
   ```powershell
   nuget restore "YourProject.csproj"
   dotnet restore
   ```

### Error: "Downgrade packages to previous version"

**Cause:** Version conflict with existing packages

**Solution:**

1. **Check specific version**
   ```powershell
   Install-Package Syncfusion.WinUI -Version 22.1.36
   ```

2. **Or let NuGet resolve automatically**
   ```powershell
   Update-Package -Reinstall Syncfusion.WinUI
   ```

3. **Check for conflicting packages**
   ```powershell
   Get-Package
   # Look for multiple versions of Syncfusion packages
   ```

---

## License Validation Troubleshooting

### Error: "License required to create Syncfusion component"

**Cause:** License not registered or registration failed

**Solution:**

1. **Verify License Registration in Code**
   ```csharp
   // Check this is FIRST line before any Syncfusion component creation:
   SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
   ```

2. **Check License Key Validity**
   - Go to [accounts.syncfusion.com](https://accounts.syncfusion.com)
   - Verify license key hasn't expired
   - Copy complete key (no truncation)

3. **Test with Hardcoded Key**
   ```csharp
   public App()
   {
       try
       {
           SyncfusionLicenseProvider.RegisterLicense("PASTE_FULL_KEY_HERE");
           Debug.WriteLine("License registered successfully");
       }
       catch (Exception ex)
       {
           Debug.WriteLine($"License error: {ex.Message}");
       }
       this.InitializeComponent();
   }
   ```

4. **Check XAML Namespace**
   ```xml
   xmlns:syncfusion="using:Syncfusion.UI.Xaml.Controls"
   ```

### Error: "Invalid license key"

**Cause:** Corrupted or incomplete key

**Solution:**

1. **Get Fresh License Key**
   - Log in to [accounts.syncfusion.com](https://accounts.syncfusion.com)
   - Go to License Management
   - Copy entire key again
   - Verify no extra spaces at beginning/end

2. **Verify Key Format**
   - Should be Base64 encoded
   - Typically 200-400 characters
   - No line breaks or extra whitespace

3. **Test Registration**
   ```csharp
   string key = "YOUR_KEY_HERE";
   
   if (string.IsNullOrWhiteSpace(key))
       throw new Exception("Key is empty");
   
   if (key.Length < 100)
       throw new Exception("Key too short");
   
   SyncfusionLicenseProvider.RegisterLicense(key);
   ```

### Error: "License validation failed - No internet connection"

**Cause:** First-time license needs internet for validation

**Solution:**

1. **Ensure Internet Connection**
   ```powershell
   Test-NetConnection -ComputerName accounts.syncfusion.com -Port 443
   ```

2. **Run Application Online**
   - First run must have internet connection
   - License validates and caches
   - Subsequent runs work offline

3. **Check Firewall**
   - Allow application outbound HTTPS to `accounts.syncfusion.com`
   - Or disable firewall temporarily to test

4. **Use Offline Mode**
   - After first successful validation
   - License cached locally (~30 days)
   - Can work offline for cached period

---

## Configuration Problem Fixes

### Issue: Theme Not Applied

**Cause:** Theme set after component creation

**Solution:**

```csharp
public App()
{
    SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    // MUST be before InitializeComponent()
    SyncfusionThemesHelper.SetTheme("FluentDark");
    
    this.InitializeComponent();
}
```

### Issue: XAML Namespace Not Recognized

**Cause:** Incorrect namespace URL or NuGet not properly loaded

**Solution:**

1. **Verify Correct Namespace**
   ```xml
   <!-- CORRECT: -->
   xmlns:syncfusion="using:Syncfusion.UI.Xaml.Controls"
   
   <!-- INCORRECT (old, incorrect): -->
   xmlns:syncfusion="clr-namespace:Syncfusion.UI.Xaml.Controls"
   ```

2. **Force Reload**
   - Close XAML editor
   - Delete bin and obj folders
   - Rebuild solution
   - Reopen XAML editor

3. **IntelliSense Not Showing**
   - Edit → IntelliSense → Rescan Solution
   - Or restart Visual Studio

### Issue: Components Show Trial Warning

**Cause:** License not registered or expired

**Solution:**

1. **Check License in Code**
   ```csharp
   // Ensure this runs before any component:
   SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
   ```

2. **Check License Expiration**
   - Trial: 30 days from first use
   - Purchased: 1 year from activation
   - Community: Never expires

3. **Upgrade if Needed**
   - Go to [accounts.syncfusion.com](https://accounts.syncfusion.com)
   - Purchase license or get Community license
   - Register new key in code

### Issue: Localization Not Working

**Cause:** Culture not set before component creation

**Solution:**

```csharp
using System.Globalization;

public App()
{
    SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    // Set culture BEFORE InitializeComponent()
    CultureInfo.CurrentCulture = new CultureInfo("es-ES");
    CultureInfo.CurrentUICulture = new CultureInfo("es-ES");
    
    this.InitializeComponent();
}
```

---

## Debugging and Support

### Enable Verbose Logging

```csharp
using System.Diagnostics;

public App()
{
    // Enable diagnostic output
    PresentationTraceSources.DataBindingSource.Listeners.Add(
        new ConsoleTraceListener());
    PresentationTraceSources.DataBindingSource.Switch.Level = 
        SourceLevels.Warning;
    
    SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    this.InitializeComponent();
}
```

### Check Visual Studio Output Window

1. View → Output
2. In dropdown, select "Debug"
3. Look for Syncfusion-related messages
4. Check for license or component warnings

### Common Debug Checks

```csharp
public App()
{
    Debug.WriteLine($"AppDomain: {AppDomain.CurrentDomain.FriendlyName}");
    Debug.WriteLine($".NET Version: {System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription}");
    
    try
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        Debug.WriteLine("License: ✓ Registered successfully");
    }
    catch (Exception ex)
    {
        Debug.WriteLine($"License: ✗ Error - {ex.Message}");
    }
    
    this.InitializeComponent();
}
```

### Getting Support

**Before Contacting Support, Gather:**
- Visual Studio version and build number
- .NET SDK version (`dotnet --version`)
- Windows OS version
- Syncfusion NuGet package version
- Complete error message and stack trace
- Steps to reproduce the issue

**Contact Points:**
- **Priority Support:** [support.syncfusion.com](https://support.syncfusion.com)
- **Community Forums:** [Syncfusion Forums](https://www.syncfusion.com/forums)
- **Email Support:** [support@syncfusion.com](mailto:support@syncfusion.com)
- **GitHub Issues:** [Syncfusion GitHub](https://github.com/syncfusion)

### Create Minimal Reproduction

Helps support team debug faster:

```csharp
// MainWindow.xaml.cs - Minimal test
using Syncfusion.Licensing;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        // Test 1: License registration
        try
        {
            SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
            System.Diagnostics.Debug.WriteLine("✓ License OK");
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"✗ License Failed: {ex}");
        }
        
        // Test 2: Component creation
        try
        {
            var comboBox = new Syncfusion.UI.Xaml.Editors.SfComboBox();
            System.Diagnostics.Debug.WriteLine("✓ Component OK");
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"✗ Component Failed: {ex}");
        }
    }
}
```

---

## Quick Reference: Common Fix Commands

```powershell
# Clear NuGet cache
nuget locals all -clear

# Restore all packages
dotnet restore

# Clean build
dotnet clean
dotnet build

# Reinstall package
Update-Package -Reinstall Syncfusion.WinUI

# Force update
Install-Package Syncfusion.WinUI -Force -SkipDependencies

# Check installed version
Get-Package | grep Syncfusion
```
