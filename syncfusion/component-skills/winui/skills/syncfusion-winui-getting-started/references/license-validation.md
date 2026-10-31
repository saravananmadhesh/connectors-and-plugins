# License Validation and Activation for Syncfusion WinUI

> **Prerequisites:** Ensure all Syncfusion NuGet packages are installed and updated to the latest version before registering your license.

## Table of Contents
- [License Registration in Code](#license-registration-in-code)
- [Offline License Validation](#offline-license-validation)
- [Internet Connection Requirements](#internet-connection-requirements)
- [Trial to Purchased Upgrade](#trial-to-purchased-upgrade)
- [Common License Errors](#common-license-errors)
- [CI/CD License Validation](#cicd-license-validation)

---

## License Registration in Code

### Basic License Registration

```csharp
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        // Register license BEFORE any Syncfusion component is created
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY_HERE");
        this.InitializeComponent();
    }
}
```

**Critical Points:**
- Call `RegisterLicense()` FIRST, before any Syncfusion component creation
- License key must be complete and valid
- Only call once per application session

### Getting Your License Key

1. Log in to [accounts.syncfusion.com](https://accounts.syncfusion.com)
2. Go to License Management dashboard
3. Find your WinUI license
4. Copy the full license key (usually 200+ characters)

### License Key Format

```
Example license key structure (Base64 encoded):
Mzk1OTAyQDMxMzkyZTM0MmUzMGQ0NWNmVmhFWHFOcGt4SFFKbStCQkViUjRzPQ==

Your actual key will be much longer.
```

---

## Secure License Storage

### Method 1: Environment Variable (Recommended)

**Step 1: Set Environment Variable**

**Windows Command Prompt (as Admin):**
```cmd
setx SYNCFUSION_LICENSE "your_license_key_here"
```

**Windows PowerShell (as Admin):**
```powershell
[Environment]::SetEnvironmentVariable("SYNCFUSION_LICENSE", "your_license_key_here", "User")
```

**Verify it's set:**
```powershell
$env:SYNCFUSION_LICENSE
```

**Step 2: Read in Code**

```csharp
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        string licenseKey = Environment.GetEnvironmentVariable("SYNCFUSION_LICENSE");
        
        if (string.IsNullOrEmpty(licenseKey))
        {
            MessageBox.Show("License not found in environment variable.");
            return;
        }
        
        try
        {
            SyncfusionLicenseProvider.RegisterLicense(licenseKey);
        }
        catch (Exception ex)
        {
            MessageBox.Show($"License registration failed: {ex.Message}");
        }
        
        this.InitializeComponent();
    }
}
```

### Method 2: App Configuration File

**Step 1: Add to app.config (Desktop Framework)**

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <appSettings>
    <add key="SyncfusionLicense" value="your_license_key_here"/>
  </appSettings>
</configuration>
```

**Step 2: Read in Code**

```csharp
using System.Configuration;
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        string licenseKey = ConfigurationManager.AppSettings["SyncfusionLicense"];
        SyncfusionLicenseProvider.RegisterLicense(licenseKey);
        this.InitializeComponent();
    }
}
```

### Method 3: Settings File (WinUI 3)

**Step 1: Create appsettings.json**

```json
{
  "Syncfusion": {
    "License": "your_license_key_here"
  }
}
```

**Step 2: Read in Code**

```csharp
using System.Text.Json;
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        try
        {
            string json = File.ReadAllText("appsettings.json");
            using (JsonDocument doc = JsonDocument.Parse(json))
            {
                var licenseKey = doc.RootElement
                    .GetProperty("Syncfusion")
                    .GetProperty("License")
                    .GetString();
                
                SyncfusionLicenseProvider.RegisterLicense(licenseKey);
            }
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"Error loading license: {ex.Message}");
        }
        
        this.InitializeComponent();
    }
}
```

**Important:** Do NOT commit `appsettings.json` with actual license key to version control. Use `.gitignore`.

---

## Offline License Validation

### When to Use Offline Validation

- Network unavailable during application startup
- CI/CD build environment with no internet
- Secure/isolated development environments
- Air-gapped systems

### How Offline Validation Works

1. First run with internet: License validates and caches locally
2. Subsequent runs without internet: Cached license used
3. License cache persists for ~30 days

### Cache Location

**Windows:**
```
C:\Users\[YourUsername]\AppData\Local\Syncfusion\License\
```

### Enabling Offline Validation

No special code needed - happens automatically:

```csharp
public partial class App : Application
{
    public App()
    {
        // This works online and offline
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        this.InitializeComponent();
    }
}
```

### Troubleshooting Offline Issues

**Problem:** "License validation failed" in offline mode

**Solution 1: Clear cache and reconnect**
```powershell
# Delete cache folder
Remove-Item -Path "C:\Users\$env:USERNAME\AppData\Local\Syncfusion\License\" -Recurse

# Run app with internet connection once
# This recreates the cache
```

**Solution 2: Manually cache license**
1. Run application with internet once
2. Verify all Syncfusion components work
3. Cache is created automatically
4. Then run offline

---

## Internet Connection Requirements

### When Internet Is Required

**First Time Setup:**
- License validation happens during first `RegisterLicense()` call
- Internet required for this validation
- Subsequent runs can work offline

**Periodic Validation:**
- Syncfusion validates license periodically (roughly every 30 days)
- Brief internet connection needed during validation
- If offline, uses cached license

### If Internet Unavailable

**During Development:**
- Use trial license (no internet needed)
- Or obtain and cache license on machine with internet

**In Production:**
- Validate license once with internet
- Cache persists for ~30 days
- Plan for periodic internet access for re-validation

### Firewall Configuration

If behind corporate firewall, allow outbound HTTPS to:
- `https://accounts.syncfusion.com` (license validation)
- `https://nuget.org` (package download)

---

## Trial to Purchased Upgrade

### Trial License Details

- **Duration:** 30 days from first use
- **Display:** "TRIAL VERSION" may appear in some components
- **Expiration:** Component functionality limited or disabled after 30 days
- **No Purchase Required:** Try all features freely

### Upgrade Process

**Step 1: Purchase License**
1. Go to [Syncfusion Shop](https://www.syncfusion.com/sales/products)
2. Select WinUI license type (Developer, Business, Team, etc.)
3. Complete purchase
4. Receive license key via email or dashboard

**Step 2: Get New License Key**
1. Log in to [accounts.syncfusion.com](https://accounts.syncfusion.com)
2. Go to License Management
3. Find your new purchased license
4. Copy the license key

**Step 3: Update Application Code**

Replace trial key with purchased key:

```csharp
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        // OLD (Trial or Community):
        // SyncfusionLicenseProvider.RegisterLicense("TRIAL_OR_COMMUNITY_KEY");
        
        // NEW (Purchased):
        SyncfusionLicenseProvider.RegisterLicense("YOUR_PURCHASED_LICENSE_KEY");
        
        this.InitializeComponent();
    }
}
```

**Step 4: Test Before Deployment**
1. Rebuild application
2. Run and verify components work without trial messages
3. Check that all features are available
4. Deploy to production

### What Changes After Upgrade

| Aspect | Trial | Purchased |
|--------|-------|-----------|
| Trial text | Shows "TRIAL" | No trial text |
| Features | All available | All available |
| Duration | 30 days | 1 year |
| Support | None | Priority support |
| Expiration behavior | Components disabled | Can renew license |

---

## Common License Errors

### Error: "License required to create Syncfusion component"

**Cause:** License not registered or invalid key

**Solution:**
```csharp
// Make sure this is in App.xaml.cs BEFORE InitializeComponent()
SyncfusionLicenseProvider.RegisterLicense("YOUR_VALID_LICENSE_KEY");
```

### Error: "Invalid license key"

**Cause:** 
- Incomplete or corrupted license key
- Wrong key format
- Key for different product

**Solution:**
1. Get license key again from dashboard
2. Copy complete key (no truncation)
3. Verify key is for WinUI, not other Syncfusion product
4. Try again

### Error: "License expired"

**Cause:** Trial (30 days) or purchased license (1 year) expired

**Solution:**
- **For Trial:** Upgrade to Community or Purchased license
- **For Purchased:** Renew license in dashboard

### Error: "Platform not licensed"

**Cause:** License is for different platform (e.g., ASP.NET, not WinUI)

**Solution:**
- Verify you have WinUI license (not React, Vue, Blazor)
- Contact support to convert or get correct license

### Error: "Too many instances"

**Cause:** License limit exceeded

**Solution:**
- Check how many machines/developers using license
- Upgrade to higher tier (Business/Team) if needed
- Contact sales for upgrade

---

## CI/CD License Validation

### GitHub Actions Example

```yaml
name: Build

on: [push]

jobs:
  build:
    runs-on: windows-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0'
    
    - name: Set Syncfusion License
      env:
        SYNCFUSION_LICENSE: ${{ secrets.SYNCFUSION_LICENSE }}
      run: |
        [Environment]::SetEnvironmentVariable("SYNCFUSION_LICENSE", "${{ secrets.SYNCFUSION_LICENSE }}", "User")
    
    - name: Restore NuGet
      run: dotnet restore
    
    - name: Build
      run: dotnet build --configuration Release
    
    - name: Test
      run: dotnet test
```

### Azure Pipelines Example

```yaml
trigger:
- main

pool:
  vmImage: 'windows-latest'

variables:
  buildConfiguration: 'Release'

steps:
- task: UseDotNet@2
  inputs:
    version: '8.0'

- script: |
    set SYNCFUSION_LICENSE=$(SyncfusionLicense)
    dotnet restore
    dotnet build --configuration $(buildConfiguration)
    dotnet test
  displayName: 'Build and Test'
  env:
    SYNCFUSION_LICENSE: $(SyncfusionLicense)
```

### GitLab CI Example

```yaml
stages:
  - build

build:
  stage: build
  image: mcr.microsoft.com/dotnet/sdk:8.0
  script:
    - export SYNCFUSION_LICENSE=$SYNCFUSION_LICENSE_KEY
    - dotnet restore
    - dotnet build --configuration Release
    - dotnet test
```

**Important:**
1. Store license in CI/CD secrets (never hardcoded)
2. Reference secret as environment variable
3. Read from environment in application code
4. Ensure build agents have network access initially for license validation

---

## License Management Dashboard

### Access Dashboard
1. Go to [accounts.syncfusion.com](https://accounts.syncfusion.com)
2. Log in with your account
3. Click "License Management"

### Dashboard Features

**View All Licenses:**
- License key
- Product (WinUI, Blazor, etc.)
- License type (Community, Trial, Purchased)
- Activation date
- Expiration date

**Actions:**
- Copy license key
- Download license certificate
- View license details
- Regenerate key (if lost)

### Multiple Projects

You can have multiple licenses:
```
License 1: Project A (Community)
License 2: Project B (Trial)
License 3: Project C (Purchased)
```

Each project can use different license key.

---

## Support and Help

### License Questions
- Email: [support@syncfusion.com](mailto:support@syncfusion.com)
- Phone: Contact sales for phone support
- Portal: [support.syncfusion.com](https://support.syncfusion.com)

### Common Resources
- [Where to get license key](https://help.syncfusion.com/common/essential-studio/licensing/license-key)
- [How to register license](https://help.syncfusion.com/common/essential-studio/licensing/how-to-register-the-syncfusion-license)
- [License validation troubleshooting](https://help.syncfusion.com/common/essential-studio/licensing/troubleshooting)
