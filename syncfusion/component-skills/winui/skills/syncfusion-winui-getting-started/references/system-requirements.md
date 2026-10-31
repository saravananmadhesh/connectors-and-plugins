# System Requirements for Syncfusion WinUI Components

## Operating System Requirements

### Windows OS Versions
- **Windows 10:** Version 1809 or later (October 2018 Update minimum)
- **Windows 11:** All versions supported
- **Windows Server:** 2016 or later (for server-based applications)

**Not supported:**
- Windows 7, Windows 8, Windows 8.1
- Windows Embedded systems

### CPU and Memory
- **Processor:** Any modern processor (1.4 GHz or higher)
- **RAM:** Minimum 4 GB (8 GB recommended for development)
- **Disk Space:** 2-5 GB for Visual Studio + Syncfusion packages

---

## .NET Framework Requirements

### Supported .NET Versions
- **.NET 5.0:** EOL (not recommended for new projects)
- **.NET 6.0:** LTS - Older LTS version
- **.NET 7.0:** EOL (not recommended)
- **.NET 8.0:** LTS - Recommended for stability
- **.NET 9.0:** Current release
- **.NET 10.0:** Latest LTS version (recommended)

**Current minimum:** .NET 8.0  
**Production recommended:** .NET 10.0 LTS (latest) or .NET 8.0 LTS

### .NET Framework (Legacy)
- Syncfusion WinUI components are NOT compatible with .NET Framework 4.x
- Migrate to .NET 5+ for WinUI 3 support

---

## Visual Studio Requirements

### Supported Versions
- **Visual Studio 2019:** Version 16.9 or later
- **Visual Studio 2022:** Version 17.0 or later (recommended)

### Required Workloads
Before installing, ensure these workloads are installed in Visual Studio:

1. **Desktop & Mobile**
   - ✓ Desktop development with C++
   - ✓ Universal Windows Platform development

2. **Development Tools**
   - ✓ .NET desktop development

3. **Optional but Recommended**
   - ✓ .NET development tools
   - ✓ NuGet Package Manager

### Installation Command (Visual Studio 2022)
```powershell
# Install required workloads via command line
vsdevcmd -clean
"C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\VSDevcmd.bat"
```

---

## WinUI 3 Requirements

### WinUI 3 Minimum Version
- **Recommended:** Latest stable version (check Visual Studio for updates)
- **Minimum:** WinUI 3.0 or higher

### WinUI Installation Options

**Option 1: NuGet Package** (Recommended)
```xml
<!-- In .csproj -->
<ItemGroup>
    <PackageReference Include="Microsoft.WindowsAppSDK" Version="1.6.240923001" />
</ItemGroup>
```

**Option 2: Visual Studio Template**
- Create new project → WinUI 3 Desktop App
- Visual Studio automatically configures WinUI

### App Manifest Configuration
Ensure your `Package.appxmanifest` includes:
```xml
<TargetDeviceFamily Name="Windows.Universal" MinVersion="10.0.17763.0" MaxVersionTested="10.0.22621.0" />
```

---

## NuGet and Package Management

### NuGet Client Version
- **Minimum:** NuGet 5.10+
- **Recommended:** Latest version (update via Visual Studio)

### Update NuGet
```powershell
# In Visual Studio Package Manager Console
Update-Package -Reinstall NuGet.CommandLine
```

### Internet Connectivity
- **Online Installation:** Internet required for first-time package download
- **Offline Installation:** Use offline NuGet feed or download packages separately

---

## Development Machine Setup Checklist

Before installing Syncfusion WinUI components:

- [ ] Running Windows 10 v1809+ or Windows 11
- [ ] .NET 8.0+ SDK installed (latest .NET 10.0 recommended) (check: `dotnet --version`)
- [ ] Visual Studio 2019 v16.9+ or VS 2022 installed
- [ ] Required Visual Studio workloads installed
- [ ] WinUI 3 SDK installed
- [ ] NuGet Package Manager updated to latest version
- [ ] Administrator rights on development machine
- [ ] Internet access or offline NuGet cache configured
- [ ] PowerShell 5.0 or PowerShell Core 7.0+

---

## Checking Your System

### Verify .NET Version
```powershell
dotnet --version
```
Output example: `8.0.101`

### Verify Windows OS Version
```powershell
[System.Environment]::OSVersion
```
Output example: `Microsoft Windows NT 10.0.22621.0`

### Verify Visual Studio Installation
```powershell
"C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\devenv.exe" /version
```

---

## Browser Requirements

WinUI applications are desktop applications, not web-based. However, if you're hosting web content in WinUI:

- **WebView2:** Chromium-based
- **Supported Browsers (for WebView2):** Based on Chromium 90+
- **System WebView:** Automatically installed with Windows 10/11

---

## Hardware Acceleration

### GPU Requirements (Optional)
- **Integrated Graphics:** Intel UHD, AMD Radeon (standard)
- **Dedicated GPU:** NVIDIA, AMD (recommended for animation-heavy apps)
- **GPU Driver:** Update via Windows Update or manufacturer website

**Performance Note:** WinUI 3 has hardware acceleration built-in. No additional configuration needed for most users.

---

## Deployment Requirements

When distributing your WinUI application:

### End-User System Requirements
- Windows 10 v1809+ or Windows 11
- .NET 8.0+ runtime (latest .NET 10.0 recommended) (include with app via self-contained deployment)
- WebView2 (optional, if using embedded web content)

### Deployment Options

**Option 1: Self-Contained Deployment**
```xml
<!-- In .csproj -->
<SelfContained>true</SelfContained>
<RuntimeIdentifier>win-x64</RuntimeIdentifier>
```
- Includes .NET runtime with app
- Larger package size (~200-400 MB)
- Works on machines without .NET installed

**Option 2: Framework-Dependent Deployment**
```xml
<SelfContained>false</SelfContained>
```
- Requires .NET runtime on target machine
- Smaller package size (~20-50 MB)
- Requires users to install .NET first

---

## Network and Firewall

If installing Syncfusion packages online:

- **NuGet.org:** Allow outbound HTTPS to `nuget.org`
- **Syncfusion Feeds:** Allow `nuget.syncfusion.com` (if using Syncfusion private feed)
- **Proxy Settings:** Configure in Visual Studio if behind corporate proxy

---

## Accessibility and Features

### Windows Features to Enable
For full accessibility and feature support:

1. **Narrator (Screen Reader)**
   - Settings → Ease of Access → Narrator

2. **High Contrast Mode**
   - Settings → Ease of Access → High Contrast

3. **Text Scaling**
   - Settings → Ease of Access → Text size

### Locale and Input Settings
- **Region & Language:** Set to target locale for localization testing
- **Keyboard Layout:** Test with different layouts for RTL support
