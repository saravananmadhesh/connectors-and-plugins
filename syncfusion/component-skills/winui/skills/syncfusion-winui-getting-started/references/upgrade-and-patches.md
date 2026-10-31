# Upgrades and Patches for Syncfusion WinUI

## Trial to Purchased License Upgrade

### When to Upgrade

- Trial license expires in 30 days
- Planning production deployment
- Need priority support
- Want to use components commercially

### Trial Limitations

Before expiration:
- All features available
- May display "TRIAL VERSION" text in some components
- No commercial restrictions (trial can be used commercially temporarily)
- Unlimited deployment during trial

After expiration:
- Components may show trial messages
- Some features might be disabled
- Functionality limited to trial mode

### Upgrade Process

**Step 1: Purchase License**

1. Visit [Syncfusion Shop](https://www.syncfusion.com/sales/products)
2. Select WinUI license type:
   - **Developer License:** $995/year - Single developer
   - **Business License:** $1,295/year - Multiple developers
   - **Team License:** Contact sales - Team of developers
   - **Site License:** Contact sales - Entire organization
3. Complete purchase
4. Receive license key via email and dashboard

**Step 2: Access New License**

1. Log in to [accounts.syncfusion.com](https://accounts.syncfusion.com)
2. Go to License Management
3. Find your new purchased license
4. Copy the license key

**Step 3: Update Application Code**

```csharp
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        // Update with your new purchased license key
        SyncfusionLicenseProvider.RegisterLicense("YOUR_PURCHASED_LICENSE_KEY");
        
        this.InitializeComponent();
    }
}
```

**Step 4: Rebuild and Test**

```powershell
# Clean previous build
dotnet clean

# Rebuild application
dotnet build

# Run and verify no trial messages appear
dotnet run
```

**Step 5: Deploy**

1. Ensure application builds successfully
2. Verify all components work without trial notifications
3. Deploy to production

### Verification Checklist

- [ ] New license key copied completely (no truncation)
- [ ] Code updated with new key
- [ ] Application rebuilds successfully
- [ ] No "TRIAL VERSION" messages in running app
- [ ] All features accessible
- [ ] License expiration date is 1 year from today

---

## Version Updates and Service Packs

### Understanding Version Numbers

```
Syncfusion.WinUI 22.1.36
                 ↑  ↑  ↑
            Major Minor Patch

22 = Major version (released annually)
1  = Minor release (quarterly updates)
36 = Service patch (hotfixes and improvements)
```

### Checking Current Version

**Method 1: Package Manager Console**
```powershell
Get-Package | grep Syncfusion.WinUI
```

Output:
```
Syncfusion.WinUI    22.1.36    YourProject
```

**Method 2: .csproj File**
```xml
<ItemGroup>
    <PackageReference Include="Syncfusion.WinUI" Version="22.1.36" />
</ItemGroup>
```

**Method 3: Code**
```csharp
var assembly = typeof(Syncfusion.UI.Xaml.Editors.SfComboBox).Assembly;
var version = assembly.GetName().Version;
Console.WriteLine($"Syncfusion Version: {version}");
```

### Checking for Updates

**Method 1: NuGet Package Manager UI**
1. Right-click Project → Manage NuGet Packages
2. Click "Updates" tab
3. Look for Syncfusion.WinUI in the list
4. Green arrow = update available

**Method 2: Command Line**
```powershell
# Check online for latest version
dotnet package search Syncfusion.WinUI

# Or in Package Manager Console
Get-Package -OutdatedIncludePrerelease
```

### Types of Updates

| Type | Example | Frequency | Breaking Changes |
|------|---------|-----------|------------------|
| **Major** | 21 → 22 | Annually | Possible |
| **Minor** | 22.1 → 22.2 | Quarterly | Usually no |
| **Patch** | 22.1.35 → 22.1.36 | Monthly+ | No |

---

## Updating to Latest Version

### Before Updating

**Backup Current State:**
```powershell
# Create git commit
git add -A
git commit -m "Before Syncfusion update to version X.X.X"
```

**Document Current Version:**
```powershell
Get-Package | grep Syncfusion
```

### Updating to Specific Version

**Method 1: Package Manager Console**
```powershell
Update-Package Syncfusion.WinUI -Version 22.2.0
```

**Method 2: NuGet UI**
1. Right-click Project → Manage NuGet Packages
2. Go to Updates tab
3. Select Syncfusion.WinUI
4. Choose version in dropdown
5. Click Update

**Method 3: Edit .csproj**
```xml
<!-- Change version -->
<ItemGroup>
    <PackageReference Include="Syncfusion.WinUI" Version="22.2.0" />
</ItemGroup>
```

Then restore:
```powershell
dotnet restore
```

### Updating to Latest Version

```powershell
# In Package Manager Console
Update-Package Syncfusion.WinUI

# Or via CLI
dotnet add package Syncfusion.WinUI --version "*"
```

### After Updating

**Step 1: Clean and Rebuild**
```powershell
dotnet clean
dotnet build
```

**Step 2: Run Application**
```powershell
dotnet run
```

**Step 3: Test Key Features**
- Components render correctly
- No license errors
- Previous functionality works
- Performance acceptable

**Step 4: Check Release Notes**
- Visit [Syncfusion Release Notes](https://www.syncfusion.com/downloads/release-notes)
- Review breaking changes
- Check for new requirements or deprecations

---

## Service Packs and Hotfixes

### What's in a Service Pack

Service packs (patch versions, e.g., .36 in 22.1.36) include:
- Bug fixes
- Performance improvements
- Security patches
- Minor enhancements
- No breaking changes

### Installing Service Pack

```powershell
# For example, updating from 22.1.35 to 22.1.36
Install-Package Syncfusion.WinUI -Version 22.1.36

# Or via CLI
dotnet add package Syncfusion.WinUI --version 22.1.36
```

### Staying Current

**Automatic:** NuGet checks for updates automatically when you open Manage NuGet Packages

**Manual Check:**
```powershell
# Check for latest patch for current minor version
Nuget list Syncfusion.WinUI -AllVersions | Select-String "22.1"
```

---

## Major Version Upgrades

### Breaking Changes to Expect

When upgrading major versions (e.g., 21 → 22):

- Some API methods might be deprecated
- Component signatures might change
- Assembly versions will change
- Resource namespaces might be updated
- Theme structure might be different

### Pre-Upgrade Checklist

Before upgrading major versions:

- [ ] Review release notes for breaking changes
- [ ] Create backup branch: `git checkout -b backup-v21`
- [ ] Document current version and date
- [ ] Plan rollback strategy
- [ ] Schedule testing time
- [ ] Notify team of planned update

### Upgrade Steps

**Step 1: Update Package**
```powershell
Update-Package Syncfusion.WinUI -Version 22.0.0
```

**Step 2: Clean Build**
```powershell
dotnet clean
dotnet build -c Release
```

**Step 3: Fix Compilation Errors**
- Address breaking changes noted in release notes
- Update namespaces if required
- Fix deprecated API calls

**Step 4: Update Configuration**
- Check license registration (new versions might need updates)
- Update theme settings if structure changed
- Verify all features work

**Step 5: Comprehensive Testing**
- Test all components in application
- Check edge cases
- Performance test
- User acceptance testing

**Step 6: Deploy**
- Create release notes documenting update
- Deploy to production
- Monitor for issues

### Rollback Strategy

If major issues occur after upgrade:

```powershell
# Rollback to previous version
Update-Package Syncfusion.WinUI -Version 21.2.0

# Recompile
dotnet clean
dotnet build

# Test
dotnet run
```

---

## Applying Patches in CI/CD

### GitHub Actions

```yaml
name: Update Syncfusion

on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly Monday
  workflow_dispatch:

jobs:
  update:
    runs-on: windows-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0'
    
    - name: Update Syncfusion
      run: |
        dotnet add package Syncfusion.WinUI --version "*"
        dotnet build
        dotnet test
    
    - name: Create Pull Request
      uses: peter-evans/create-pull-request@v4
      with:
        commit-message: 'chore: update Syncfusion packages'
        title: 'Chore: Update Syncfusion WinUI packages'
        body: 'Automated package update for Syncfusion WinUI'
```

### Azure DevOps

```yaml
trigger:
- main

pool:
  vmImage: 'windows-latest'

steps:
- task: UseDotNet@2
  inputs:
    version: '8.0'

- script: |
    dotnet add package Syncfusion.WinUI --version "*"
    dotnet restore
    dotnet build
    dotnet test
  displayName: 'Update and Test'
```

---

## Version Management Best Practices

### Dependency Lock Files

Use `Directory.Packages.props` for centralized version control:

```xml
<Project>
  <ItemGroup>
    <PackageVersion Include="Syncfusion.WinUI" Version="22.1.36" />
    <PackageVersion Include="Microsoft.WindowsAppSDK" Version="1.6.240923001" />
  </ItemGroup>
</Project>
```

Then in .csproj:
```xml
<ItemGroup>
    <PackageReference Include="Syncfusion.WinUI" />
</ItemGroup>
```

### Semantic Versioning in Code

```csharp
// Define version requirements
const int REQUIRED_MAJOR_VERSION = 22;
const int MINIMUM_MINOR_VERSION = 1;

// Verify at runtime
var assembly = typeof(Syncfusion.UI.Xaml.Editors.SfComboBox).Assembly;
var version = assembly.GetName().Version;

if (version.Major < REQUIRED_MAJOR_VERSION ||
    (version.Major == REQUIRED_MAJOR_VERSION && version.Minor < MINIMUM_MINOR_VERSION))
{
    throw new Exception($"Syncfusion {REQUIRED_MAJOR_VERSION}.{MINIMUM_MINOR_VERSION}+ required");
}
```

### Monitoring for Security Updates

- Subscribe to [Syncfusion Blog](https://www.syncfusion.com/blogs)
- Check [Security Advisories](https://www.syncfusion.com/security)
- Set up GitHub alerts if using GitHub-hosted code
- Review release notes regularly

---

## Support and Documentation

### Finding Release Notes
1. Visit [Syncfusion Release Notes](https://www.syncfusion.com/downloads/release-notes)
2. Select "WinUI" product
3. View changes for specific version

### Upgrade Assistance
- **Community Forums:** [Syncfusion Forums](https://www.syncfusion.com/forums/winui)
- **Priority Support:** [support.syncfusion.com](https://support.syncfusion.com)
- **Email:** [support@syncfusion.com](mailto:support@syncfusion.com)

### Staying Informed
- Check product updates monthly
- Subscribe to release notifications
- Review breaking changes before major upgrades
- Plan updates during maintenance windows
