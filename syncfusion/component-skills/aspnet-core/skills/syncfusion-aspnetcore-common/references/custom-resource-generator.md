# Custom Resource Generator (CRG) Reference Guide

## Table of Contents
- [Overview](#overview)
- [Search and Select Controls](#search-and-select-controls)
- [Download Custom Resources](#download-custom-resources)
- [Use Custom Resources](#use-custom-resources-in-aspnet-core)
- [Import Previous Settings](#import-previous-settings)

---

## Overview

The **Custom Resource Generator (CRG)** is a web-based tool provided by Syncfusion® that allows developers to generate selective control scripts (JavaScript ES5) and styles for ASP.NET Core controls. This optimization approach reduces bundle size by including only the controls and themes your application requires.

### Available Since
Syncfusion® ASP.NET Core v18.1.0.42 and above

### Access CRG
Visit: https://crg.syncfusion.com/

---

## Search and Select Controls

### Step 1: Open CRG Application

Navigate to [Syncfusion® Custom Resource Generator](https://crg.syncfusion.com/)

### Step 2: Control Categorization

Syncfusion® ASP.NET Core controls are categorized based on module support:

#### Injectable Module Supported Controls
- Rendered as **TreeView with checkboxes**
- Allow selective feature/module selection
- Provide fine-grained control over dependencies

#### Injectable Module Non-Supported Controls
- Rendered as **simple checkbox format**
- Include all features when selected

### Step 3: Search and Select Controls

**For Non-Injectable Module Controls:**

1. Type the required control name in the search bar
2. Check the control checkbox
3. Dependencies are automatically resolved - no need to manually select dependent controls

**Example:** Searching for "Calendar" and selecting it

### Step 4: Select Features for Injectable Modules

**For Injectable Module Supported Controls:**

1. Click the **expand icon** next to the control name
2. Select specific features/modules you need

**Or** select the control's checkbox to include all injectable modules

### Step 5: Select Built-in Themes

1. Navigate to the **"Select Themes"** option
2. Choose one or more built-in themes from the list
   - Material
   - Bootstrap
   - Tailwind
   - Fabric
   - High Contrast
   - And others...

> **Note:** You can select multiple themes simultaneously

---

## Download Custom Resources

### Step 1: Initiate Download

1. Locate the **DOWNLOAD** button at the bottom of the page
2. Select the **Minified** option for production environments (generates minified output)

### Step 2: Configure Export Settings

1. A pop-up dialog will appear
2. Change the filename as desired (default filename available)
3. Click the **GENERATE** button

### Step 3: Bundling Process

- The CRG tool begins bundling the selected controls
- A progress indicator shows the bundling status
- Output will be downloaded as a **ZIP file**

### Step 4: Examine Output

Extract the ZIP file. The output contains:

- **Custom script files** for selected controls
- **Custom style files** for selected themes
- **import.json** file - stores current CRG settings for future imports

#### Customized Folder Structure

For Material and Tailwind themes, customized theme files are provided without Google Fonts references:
```
customized/
├── material-custom.css
├── tailwind-custom.css
└── ... (other customized assets)
```

---

## Use Custom Resources in ASP.NET Core

### Step 1: Extract to wwwroot

Extract the downloaded ZIP file to the `~/wwwroot` folder of your ASP.NET Core web application.

**Example Folder Structure:**
```
wwwroot/
├── syncfusion/
│   ├── ej2-base/
│   ├── ej2-calendars/
│   ├── ej2-buttons/
│   └── ... (other controls)
├── styles/
│   ├── material.css
│   ├── bootstrap.css
│   └── ... (other themes)
└── index.html
```

### Step 2: Reference in _Layout.cshtml

Update the `<head>` section of `~/Pages/Shared/_Layout.cshtml` (or `~/Views/Shared/_Layout.cshtml`):

```html
<head>
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="~/path-to-extracted/material.css" />
    
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="~/path-to-extracted/ej2-base.min.js"></script>
    <script src="~/path-to-extracted/ej2-calendars.min.js"></script>
    <script src="~/path-to-extracted/ej2-buttons.min.js"></script>
</head>
```

> **Important:** Reference scripts and styles in the correct dependency order

### Step 3: Run Application

1. Build the ASP.NET Core application
2. Run the application
3. The custom resources will load with only the required controls

---

## Import Previous Settings

### Scenario
You've already generated custom resources and now need to:
- Add more controls
- Upgrade to a newer Syncfusion® version
- Modify existing selections

### Solution: Import import.json

**No need to regenerate from scratch!**

### Import Steps

#### Step 1: Locate IMPORT SETTINGS Button
Click the **IMPORT SETTINGS** button at the bottom of the CRG page

#### Step 2: Upload import.json File
1. A file upload dialog will appear
2. Select the `import.json` file from your previous CRG export
3. Previously stored configuration will be restored

#### Step 3: Make Changes
- Add more controls
- Remove controls
- Change theme selections
- Update any other settings

#### Step 4: Download Updated Resources
Follow the [Download Custom Resources](#download-custom-resources) steps to generate the updated bundle with your modifications

### Benefits
- **Time Saving**: No need to reconfigure all selections
- **Consistency**: Maintain existing configurations
- **Flexibility**: Easy upgrades and modifications

---

## Best Practices

### Performance Optimization
- ✅ Use CRG to bundle only required controls
- ✅ Select minified output for production
- ✅ Choose specific features for injectable modules
- ❌ Avoid the "all controls" CDN for production

### File Management
- ✅ Keep the `import.json` file in version control
- ✅ Document which controls and features are included
- ✅ Update documentation when CRG bundles change

### Theme Selection
- ✅ Select only themes your application uses
- ✅ Consider using customized versions if you don't need Google Fonts
- ✅ Test themes across different browser/device combinations

---

## Key Differences: CRG vs Other Methods

| Aspect | CRG | CDN | NPM + Gulp |
|---|---|---|---|
| **Bundle Size** | Small (selective) | Large | Medium |
| **Setup Time** | Minimal | Instant | Moderate |
| **Flexibility** | High | Low | High |
| **For Production** | ✅ Recommended | ❌ Not recommended | ✅ Recommended |
| **Customization** | ✅ Yes | ❌ No | ✅ Yes |
| **Offline Use** | ✅ Yes | ❌ No | ✅ Yes |

