# Syncfusion® ASP.NET Core - License Registration Guide

This comprehensive guide covers license key generation, registration, troubleshooting, and error resolution for Syncfusion® ASP.NET Core components (EJ2).

---

## Table of Contents

1. [Licensing Overview](#licensing-overview)
2. [Prerequisites for License Registration](#prerequisites-for-license-registration)
3. [Generating License Keys](#generating-license-keys)
4. [Registering License Keys](#registering-license-keys)
5. [Licensing Errors and Solutions](#licensing-errors-and-solutions)
6. [Troubleshooting FAQ](#troubleshooting-faq)

---

## Licensing Overview

### Who Needs a License Key?

License key registration is **required** for:
- **Evaluators** using trial/evaluation installations
- **Paid customers** using NuGet packages from `nuget.org`

License key registration is **NOT required** for:
- Applications using assemblies from **Licensed Installer** - no registration needed with licensed builds

### Difference Between Unlock Key and License Key

It's important to understand the distinction:

| Type | Purpose | Usage |
|------|---------|-------|
| **Unlock Key** | Unlocks Syncfusion® installers | Used only during installation |
| **License Key** | Validates runtime in application | Must be registered in your code |

### License Key Characteristics

- **Version-specific**: A license key for version X cannot be used for version Y
- **Platform-specific**: A license key for ASP.NET Core cannot be used for other platforms
- **Offline validation**: License validation happens offline during application execution - **no internet required**

---

## Prerequisites for License Registration

Before registering a license key:

1. **Have a Syncfusion Account**: Register at [https://www.syncfusion.com/account/register](https://www.syncfusion.com/account/register)
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
