# Syncfusion License Key – Generation and Versioning Guide

## Overview
This explains:
- How to generate a Syncfusion license key for licensed products
- Which Syncfusion license key version should be used in an application

---

## 1. How to Generate a License Key for Licensed Products

### Licensing Model Change (v31.1.17 and Later)
- Before v31.x: License keys were generated **per platform** (ASP.NET Core, Blazor, Angular, etc.).
- From v31.1.17 onward: License keys are generated **per edition**.

Available editions:
- Essential Studio UI Edition
- Document SDK
- PDF Viewer SDK
- DOCX Editor SDK
- Spreadsheet Editor SDK
- Enterprise Edition (includes all of the above)

---

### Steps to Generate License Key (v31.1.17 or Higher)
1. Log in to https://www.syncfusion.com
2. Navigate to **My Dashboard → License & Downloads**
3. Click **Get License Key**
4. Select version **31.x.x or higher**
5. Choose required editions or SDKs
6. Click **Get License Key** and copy the generated key

> Recommendation: Customers who purchased before v31.x.x should select all editions to generate an Enterprise Edition key.

---

### Generating License Key for v30.2 or Earlier

**Trial License**
- Go to *Trial & Downloads*
- Select the platform and project name
- Click *Get License Key*

**Licensed Products**
- Navigate to *License & Downloads*
- Generate the license key for products available under your account

---

## 2. Which Syncfusion License Key Version Should I Use?

### Key Rules
- Licensing system introduced from v16.2.0.41
- License keys are **version-specific** and **platform-specific**
- A new license key is required for each new **volume release**

---

### Versioning Guidelines

**Volume Upgrades**
- Example: v16.2 → v16.3 requires a new license key
- Example: v21.1 → v22.1 requires a new license key

**Service Packs / NuGet Releases**
- No new key is required if the update is within the same volume
- Example: v21.1.35 → v21.2.4 does not require a new key

---

## Best Practices
- Ensure all Syncfusion NuGet packages use the same version
- License key version must match the referenced assemblies
- Register the key before initializing any Syncfusion controls
- Clean and rebuild the solution after upgrading

---

