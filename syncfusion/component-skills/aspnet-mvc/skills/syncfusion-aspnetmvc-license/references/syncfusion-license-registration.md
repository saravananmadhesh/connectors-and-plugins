# Syncfusion License Registration for ASP.NET MVC EJ2

## Overview
This guide covers license key generation, registration, validation, and management for Syncfusion EJ2 ASP.NET MVC applications.

---

## License Key Requirements

### Who Needs a License Key?

License key registration is **required** for:
- **Trial users** (30-60 day evaluation)
- **Paid customers** using NuGet packages from `nuget.org` (Syncfusion.EJ2.MVC5)
- **Community users** with free community license

License key registration is **NOT required** for:
- Applications using assemblies from **Licensed Installer** (pre-licensed builds)

### Key Characteristics

- **Version-specific**: Key for v33 cannot be used in v32 application
- **Platform-specific**: ASP.NET MVC key ≠ ASP.NET Core key
- **Offline validation**: No internet required; validation occurs locally at startup
- **Environment-independent**: Same key works across environments (dev, test, prod)

---

## Step 1: Generate License Key

### Access Syncfusion Portal

1. Go to [Syncfusion License & Downloads](https://www.syncfusion.com/account/downloads)
2. Log in with your Syncfusion account
   - If no account: Register at https://www.syncfusion.com/account/register
   - For trial: [Start Free Trial](https://www.syncfusion.com/account/manage-trials/start-trials)

### Generate Key Steps

1. Click **License & Downloads** or **Trial & Downloads**
2. Select your license status (Active License, Trial, Community)
3. Click **Generate License Key**
4. **Critical**: Select correct version and platform:
   - **Version**: 33.1.44 (must match Syncfusion.EJ2.MVC5 NuGet version)
   - **Platform**: **ASP.NET MVC** (NOT ASP.NET Core, WinForms, etc.)
5. Copy the generated key (40-character GUID format)
6. Save in secure location (never commit to repo)

**Example Key Format:**
```
abcd1234-efgh5678-ijkl9012-mnop3456
```

---

## Step 2: Register License in Global.asax.cs

### Required Location

- **File**: `~/Global.asax.cs`
- **Method**: `Application_Start()`
- **Timing**: MUST execute before any Syncfusion control initialization

### Basic Registration

```csharp
using Syncfusion.Licensing;

public class MvcApplication : System.Web.HttpApplication
{
    protected void Application_Start()
    {
        // Register Syncfusion License (FIRST LINE)
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY_HERE");
        
        // Other startup code
        AreaRegistration.RegisterAllAreas();
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        RouteConfig.RegisterRoutes(RouteTable.Routes);
        BundleConfig.RegisterBundles(BundleTable.Bundles);
    }
}
```

### Secure Registration (Recommended for Production)

**Never hardcode license keys. Use environment variables or Key Vault:**

```csharp
using Syncfusion.Licensing;
using System;
using System.Configuration;

public class MvcApplication : System.Web.HttpApplication
{
    protected void Application_Start()
    {
        // Try environment variable first (Recommended)
        string licenseKey = Environment.GetEnvironmentVariable("SYNCFUSION_LICENSE_KEY");
        
        // Fallback to Web.config (for development)
        if (string.IsNullOrEmpty(licenseKey))
        {
            licenseKey = ConfigurationManager.AppSettings["SyncfusionLicense"];
        }
        
        // Log warning if no license found
        if (string.IsNullOrEmpty(licenseKey))
        {
            System.Diagnostics.Debug.WriteLine("WARNING: Syncfusion license key not found!");
            // Proceed anyway - will show license warning dialog in app
        }
        else
        {
            SyncfusionLicenseProvider.RegisterLicense(licenseKey);
        }
        
        AreaRegistration.RegisterAllAreas();
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        RouteConfig.RegisterRoutes(RouteTable.Routes);
        BundleConfig.RegisterBundles(BundleTable.Bundles);
    }
}
```

---

## Step 3: Store License Securely

### Development Environment

**Set Environment Variable (Windows):**
```cmd
# Command Prompt
set SYNCFUSION_LICENSE_KEY=your-license-key-here

# Or set permanently:
setx SYNCFUSION_LICENSE_KEY "your-license-key-here"
```

**Set Environment Variable (PowerShell):**
```powershell
$env:SYNCFUSION_LICENSE_KEY = "your-license-key-here"
```

**Set in Web.config (Development Only):**
```xml
<configuration>
  <appSettings>
    <add key="SyncfusionLicense" value="your-license-key-here" />
  </appSettings>
</configuration>
```

⚠️ **Never commit Web.config with license key to source control**

### Production Environment

**Option 1: Azure Key Vault** (Recommended)
```csharp
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

protected void Application_Start()
{
    var keyVaultUrl = "https://your-vault.vault.azure.net/";
    var secretClient = new SecretClient(new Uri(keyVaultUrl), new DefaultAzureCredential());
    
    KeyVaultSecret secret = secretClient.GetSecret("SyncfusionLicense");
    string licenseKey = secret.Value;
    
    SyncfusionLicenseProvider.RegisterLicense(licenseKey);
    
    // ... rest of startup
}
```

**Option 2: AWS Secrets Manager**
```csharp
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;

protected void Application_Start()
{
    var secretsClient = new AmazonSecretsManagerClient();
    var getSecretRequest = new GetSecretValueRequest 
    { 
        SecretId = "syncfusion-license" 
    };
    
    var response = secretsClient.GetSecretValueAsync(getSecretRequest).Result;
    string licenseKey = response.SecretString;
    
    SyncfusionLicenseProvider.RegisterLicense(licenseKey);
    
    // ... rest of startup
}
```

**Option 3: Environment Variables (IIS)**
1. Open IIS Manager
2. Select your application pool
3. Right-click → Advanced Settings
4. Under "Environment Variables" section, add:
   - Name: `SYNCFUSION_LICENSE_KEY`
   - Value: Your license key
5. Restart application pool

---

## Step 4: Verify License Registration

### Test in Controller

```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        try
        {
            // Attempt to use a Syncfusion control to verify license
            var schedule = new Syncfusion.EJ2.Schedule.Schedule();
            ViewBag.LicenseStatus = "✓ License registered successfully";
        }
        catch (Exception ex)
        {
            ViewBag.LicenseStatus = $"✗ License error: {ex.Message}";
        }
        
        return View();
    }
}
```

### Check Browser Output

1. Run application (Ctrl+F5)
2. If license is registered: No warning dialog appears
3. If license missing/invalid: License validation dialog appears in top-right

---

## Common License Errors

| Error | Cause | Solution |
|-------|-------|----------|
| **No license registered** | License key not set in Application_Start | Register key in Global.asax.cs Application_Start() |
| **Invalid license key** | Key malformed or corrupted | Regenerate key from Syncfusion portal |
| **Version mismatch** | Key for different version | Regenerate key for v33.1.44 (or your version) |
| **Platform mismatch** | Key for ASP.NET Core used in MVC | Regenerate for ASP.NET MVC platform |
| **Trial expired** | 30-day trial period ended | Purchase license or start new trial |
| **License validation dialog appears** | Any of above issues | Check browser console for specific error |

### Troubleshooting

1. **Verify license key is correct:**
   - Copy exactly from Syncfusion portal
   - Check for spaces or special characters
   - Ensure it's in quotes in code

2. **Verify version match:**
   ```powershell
   # Check NuGet package version
   Get-Package Syncfusion.EJ2.MVC5
   # Result should be: Version 33.1.44
   ```

3. **Verify platform selection:**
   - License portal: Confirm "ASP.NET MVC" selected, not "ASP.NET Core"

4. **Rebuild application:**
   - Clean solution (Build → Clean Solution)
   - Rebuild solution (Build → Rebuild Solution)
   - This clears cached assemblies

5. **Check debug output:**
   - Open Debug output (View → Output, select Debug)
   - Look for Syncfusion license initialization messages
   - Report any errors

---

## License Upgrade & Renewal

### Upgrading from Trial to Paid

1. Purchase license: [Syncfusion Store](https://www.syncfusion.com/sales/products)
2. Go to [License & Downloads](https://www.syncfusion.com/account/downloads)
3. Generate new license key for your purchased version
4. Replace trial key with new key in Global.asax.cs
5. Rebuild application

**No code restructuring needed** - same NuGet package works with both trial and paid keys.

### Renewing Expiring License

1. Log in to Syncfusion account
2. Go to License & Downloads
3. Click "Renew" on expiring license
4. Complete payment
5. Generate new license key immediately
6. Update key in application before expiration
7. Restart application to pick up new key

### Downgrading Version

- Contact Syncfusion Support for legacy version license keys
- Each version requires its own license key
- Not recommended for production environments

---

## Best Practices

### Security
✓ **Never hardcode** license keys in source files  
✓ **Use environment variables** or Key Vault for all environments  
✓ **Add to .gitignore**: License key files and credentials  
✓ **Rotate keys** before expiration  
✓ **Audit access** to license credentials  
✓ **Use least privilege**: Limit who can access keys  

### Management
✓ **Version consistency**: Keep NuGet and license version in sync  
✓ **Separate keys per environment** (dev, test, prod) for tracking  
✓ **Calendar reminders**: Alert before license expiration  
✓ **Documentation**: Record version, platform, expiry dates  
✓ **Fallback strategy**: Have temporary keys available  

### CI/CD Integration

**GitHub Actions:**
```yaml
env:
  SYNCFUSION_LICENSE_KEY: ${{ secrets.SYNCFUSION_LICENSE_KEY }}

jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: msbuild Solution.sln
```

**Azure DevOps:**
```yaml
variables:
  SYNCFUSION_LICENSE_KEY: $(SyncfusionLicenseKey)

steps:
  - task: MSBuild@1
    inputs:
      solution: 'Solution.sln'
```

---

## References

- [Syncfusion License & Downloads](https://www.syncfusion.com/account/downloads)
- [License Registration Documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/licensing/how-to-register-in-an-application)
- [License Generation Guide](https://ej2.syncfusion.com/aspnetmvc/documentation/licensing/how-to-generate)
- [Syncfusion Support Portal](https://support.syncfusion.com)
2. **Have an Active License or Trial**:
   - Active paid license
   - Active 30-day trial
   - Or start a [free trial](https://www.syncfusion.com/account/manage-trials/start-trials)
3. **Know Your ASP.NET Core Version**: License keys are version-specific
4. **Reference Syncfusion.Licensing NuGet Package**: Required for license registration

---

## Generating License Keys

### Where to Get License Keys

License keys can be generated from two locations:

1. **For Licensed Products**: [License & Downloads](https://www.syncfusion.com/account/downloads)
2. **For Trial Products**: [Trial & Downloads](https://www.syncfusion.com/account/manage-trials/downloads)

### Getting Started if You Don't Have an Account

**For NuGet.org Direct Users:**

If you obtained Syncfusion assemblies directly from NuGet.org without a Syncfusion account:

1. Register for a free account: [https://www.syncfusion.com/account/register](https://www.syncfusion.com/account/register)
2. Start a trial: [https://www.syncfusion.com/account/manage-trials/start-trials](https://www.syncfusion.com/account/manage-trials/start-trials)
3. Go to [Trial & Downloads](https://www.syncfusion.com/account/manage-trials/downloads) to generate your license key

### Claim License Key Page

Syncfusion provides a "Claim License Key" page where license keys can be generated based on your account status:

#### Account Status Scenarios

**1. Active License**
- You have a valid, active Syncfusion license
- License key will be generated immediately
- No expiry date

**2. Active Trial**
- You have an active 30-day trial license
- License key will be generated with **expiry date**
- Must purchase license before trial expires

**3. Expired License**
- Your license subscription has expired
- Temporary 5-day license key can be generated
- **Must renew subscription** to obtain valid keys for latest versions

**4. No Trial or License**
- You can claim either:
  - A new trial license (30 days)
  - Purchase a valid license

### Important Notes on License Key Generation

- License keys are **version and platform specific**
- Ensure you select **ASP.NET Core** as the platform
- Select the correct version (must match your installed version)
- Refer to this for detailed help: [license-generation and version](./syncfusion-license-guide.md)
---

## Registering License Keys

### Basic Registration Code

License keys must be registered before any Syncfusion control is initialized:

```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR LICENSE KEY");
```

### For ASP.NET Core (.NET 8.0 / .NET 9.0)

Register the license key in **`Program.cs`**:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Register Syncfusion license
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR LICENSE KEY");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();
app.Run();
```

### For ASP.NET Core with JavaScript Components

If using Syncfusion® JavaScript Components in your ASP.NET Core application:

**In `Program.cs` (for ASP.NET Core components):**
```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR LICENSE KEY");
```

**In `_Layout.cshtml` (for JavaScript components - v20.1 and above):**
```html
<script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
<script>
    Syncfusion.licensing.registerLicense("YOUR LICENSE KEY");
</script>
```

### Registration Requirements

- **Place the license key in double quotes**: `"YOUR LICENSE KEY"`
- **Register before initializing controls**: License must be registered before any Syncfusion control is created
- **Ensure Syncfusion.Licensing.dll is referenced**: Add the NuGet package reference if not already present
- **Version consistency**: All Syncfusion assemblies must be the same version

---

## Licensing Errors and Solutions

### Error 1: License Key Not Registered / Trial Expired

**Error Message:**
```
This application was built using a trial version of Syncfusion® 
Essential Studio® You should include the valid license key to 
remove the license validation message permanently.
```

**When It Occurs:**
- No license key has been registered
- Trial license has expired after 30 days

**Solutions:**

1. **If you have a valid Syncfusion license:**
   - Generate a license key from [License & Downloads](https://www.syncfusion.com/account/downloads)
   - Register the key in your application (see [Registering License Keys](#registering-license-keys))

2. **If you have an active trial:**
   - Generate a trial license key from [Trial & Downloads](https://www.syncfusion.com/account/manage-trials/downloads)
   - Register the key in your application

3. **If you don't have a trial or license:**
   - Create a Syncfusion account: [Register](https://www.syncfusion.com/account/register)
   - Start a 30-day free trial: [Start Trial](https://www.syncfusion.com/account/manage-trials/start-trials)
   - Generate the trial license key from [Trial & Downloads](https://www.syncfusion.com/account/manage-trials/downloads)

4. **From the licensing warning message:**
   - Click "Claim your FREE account" on the licensing warning dialog
   - Follow the claim license key flow

---

### Error 2: Invalid Key

**Error Message:**
```
The included Syncfusion® license key is invalid.
```

**When It Occurs:**
- License key is malformed or incorrect
- Using a license key from a different version
- Using a license key from a different platform

**Solutions:**

1. **Verify the license key:**
   - Ensure you copied the entire key correctly
   - Check for extra spaces or characters
   - Verify it's enclosed in double quotes in code

2. **Generate the correct license key:**
   - License keys are **version-specific** - ensure it matches your installed version
   - License keys are **platform-specific** - ensure it's for ASP.NET Core, not another platform
   - Generate from [License & Downloads](https://www.syncfusion.com/account/downloads)

3. **Replace with correct key:**
   - Obtain a valid license key for your specific version and platform
   - Register it in your application

---

### Error 3: Platform Mismatch

**Error Message:**
```
The included Syncfusion® license is invalid (Platform mismatch).
```

**When It Occurs:**
- You're using a license key for a different platform (e.g., WinForms key for ASP.NET Core)

**Solutions:**

License keys are platform-specific. You must:

1. Generate a license key specifically for **ASP.NET Core** platform
2. Go to [License & Downloads](https://www.syncfusion.com/account/downloads)
3. Select **ASP.NET Core** as the platform
4. Select your version
5. Generate and register the key

---

### Error 4: Version Mismatch

**Error Message:**
```
The included Syncfusion® license ({Registered Version}) is invalid for version {Required version}.
```

**When It Occurs:**
- You're using a license key for a different version (e.g., v33 key for v34 application)

**Solutions:**

License keys are version-specific. You must:

1. Identify your installed Syncfusion version
2. Go to [License & Downloads](https://www.syncfusion.com/account/downloads)
3. Select your **exact version** (must match your installed version)
4. Select ASP.NET Core as the platform
5. Generate and register the correct version's license key

---

### Error 5: Trial Expired

**Error Message:**
```
Your Syncfusion® trial license has expired.
```

**When It Occurs:**
- Your 30-day trial period has ended

**Solutions:**

1. **Purchase a license:** [Buy Here](https://www.syncfusion.com/sales/products)
2. **OR start a new trial** if eligible: [Start New Trial](https://www.syncfusion.com/account/manage-trials/start-trials)
3. Generate a license key for your purchased or new trial license
4. Register the new key in your application

---

### Error 6: Facing Licensing Error After Registering Correct Keys

**When This Occurs:**
- Even after registering a valid license key, the error persists

**Troubleshooting Steps:**

1. **Verify Syncfusion.Licensing reference:**
   - Ensure the `Syncfusion.Licensing` NuGet package is installed
   - Check that it's the correct version matching other Syncfusion packages

2. **Check version consistency:**
   - All Syncfusion assemblies must be the **same version**
   - Verify license key matches installed version
   - Mismatch between packages causes errors

3. **Registration timing:**
   - License key must be registered **before any Syncfusion control is initialized**
   - In `Program.cs` or `Global.asax`, register it at the very beginning
   - Verify it's not commented out or in conditional code

4. **Assembly location:**
   - Same version Syncfusion assemblies must be in application output folders
   - After rebuilding, verify DLLs in `bin` folder are correct version

5. **Rebuild application:**
   - After upgrading Syncfusion version and license key:
     - **Clean** the solution
     - **Rebuild** the solution
     - This clears cached assemblies and forces fresh compilation

6. **Check Build Server:**
   - If issue occurs on build server, verify same process followed there
   - Build servers need license key registration if using NuGet packages

---

## Troubleshooting FAQ

### Q: Is Internet Connection Required for License Validation?

**A:** No. Syncfusion license validation is **offline**:
- License validation happens during application execution
- No internet connection is required
- Apps without internet connection can still use Syncfusion components
- Licensed applications can be deployed on systems without internet access

### Q: How to Upgrade from Trial to Paid License?

**A:** Two options exist:

**Option 1: Using Licensed Installer**
1. Uninstall the trial version
2. Install the fully licensed build from [License & Downloads](https://www.syncfusion.com/account/downloads)
3. No code changes needed

**Option 2: Using NuGet Packages**
1. Keep the same NuGet packages (no reinstall needed)
2. Generate a paid license key from [License & Downloads](https://www.syncfusion.com/account/downloads)
3. Replace the trial license key in your code with the paid license key
4. Rebuild your application

**Note:** License registration is only required for NuGet packages and evaluation installers, not for Licensed installer builds.

### Q: Where Can I Get a License Key?

**A:** License keys are generated from:

- **Licensed Products:** [https://www.syncfusion.com/account/downloads](https://www.syncfusion.com/account/downloads)
- **Trial Products:** [https://www.syncfusion.com/account/manage-trials/downloads](https://www.syncfusion.com/account/manage-trials/downloads)

**Important:** License keys are version and platform specific. Select:
- **Platform:** ASP.NET Core
- **Version:** Your exact installed version
- Generate and copy the resulting key

### Q: Can I Use the Same License Key for Different Projects?

**A:** Yes, if the projects use:
- The **same Syncfusion version**
- The **same platform** (ASP.NET Core)

The license key is tied to version and platform, not to specific projects.

### Q: What if My License Key is in Different Format?

**A:** License keys must be a string within double quotes:
```csharp
// Correct
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY_STRING");

// Incorrect
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense(YOUR_LICENSE_KEY_STRING);
```

Ensure the key is always in quotes.

### Q: Build Server Licensing

When using Syncfusion components on a build server:

| Source | License Required | Key Type |
|--------|------------------|----------|
| NuGet Package | Yes | Use any developer license |
| Trial Installer | Yes | Use any developer trial license |
| Licensed Installer | No | Not applicable |

All developer or trial licenses can be used for build servers.

### Q: My Account Shows No Trial or License

**To get a license key:**

1. No Syncfusion account?
   - Create account: [Register](https://www.syncfusion.com/account/register)

2. Want to try for free?
   - Start 30-day trial: [Start Trial](https://www.syncfusion.com/account/manage-trials/start-trials)

3. Ready to buy?
   - Purchase license: [Buy Now](https://www.syncfusion.com/sales/products)

Then generate your license key from the appropriate downloads page.

---

## Best Practices

### 1. Version Management

- Always verify your installed Syncfusion version before generating a license key
- Keep all Syncfusion packages at the same version
- Update the license key when upgrading Syncfusion version

### 2. Registration Placement

- Register license key in `Program.cs` before building the app
- Ensure registration happens before any Syncfusion component is initialized
- Do not register inside conditional or optional code paths

### 3. Licensing in Team Environments

- Share license key securely (e.g., environment variables, configuration files)
- All team members can use the same license key for development
- Build servers use the same license key as development

### 4. Deployment

- Include registered license key in all deployment environments (dev, staging, production)
- No internet connection is needed for license validation
- License key should be consistent across all environments

### 5. Documentation

- Document your Syncfusion version for future reference
- Keep license key in a secure, accessible location for your team
- Note the expiry date of trial licenses if applicable

---
