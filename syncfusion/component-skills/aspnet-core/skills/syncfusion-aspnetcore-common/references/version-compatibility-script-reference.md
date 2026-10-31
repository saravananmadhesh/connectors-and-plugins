# Version Compatibility & Script Reference Guide

## Table of Contents
- [Version Compatibility](#version-compatibility)
- [CDN Reference](#cdn-reference)

---

## Version Compatibility

### Syncfusion® Version Information

Syncfusion® follows a quarterly release schedule with version numbers using the format: **Major.Minor.Revision**

#### Version Number Breakdown

For example, version `33.1.44`:

- **Major (33)**: Changes every three months, includes significant updates, new features, bug fixes, and breaking changes
- **Minor (1)**: Signifies new features and bug fixes without breaking changes
- **Revision (44)**: Patch number for weekly releases, includes bug fixes only

### Supported .NET Versions

| .NET Version | Minimum Syncfusion® Version |
|---|---|
| .NET 10.0 | 31.2.10 and above |
| .NET 9.0 | 27.2.2 and above |
| .NET 8.0 | 23.1.36 and above |
| .NET 7.0 | 20.4.0.38 and above |
| .NET 6.0 | 19.3.0.43 and above |
| .NET 5.0 | 18.4.0.30 and above |
| .NET Core 3.1.3 | 18.1.0.52 and above |
| .NET Core 3.1.2 | 18.1.0.42 and above |
| .NET Core 3.1.1 | 17.4.0.46 and above |
| .NET Core 3.1 | 17.4.0.39 and above |
| .NET Core 3.0 | 17.3.0.14 and above |
| .NET Core 2.2 | 16.4.0.42 and above |
| .NET Core 2.1 | 16.2.0.41 and above |
| .NET Core 2.0 | 15.3.0.26 and above |
| .NET Core 1.1 | 14.4.0.15 and above |
| .NET Core 1.0 | 14.2.0.26 and above |

---

## Script Reference

### CDN Reference for All Controls

The quickest way to get started with Syncfusion® controls through a single script and style reference.

**NOTE**: Version **must be same** as installed `Syncfusion.EJ2.AspNet.Core` package version.

#### URLs

| Resource | URL |
|---|---|
| Scripts | `https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js` |
| Styles | `https://cdn.syncfusion.com/ej2/33.1.44/{THEME-NAME}.css` |

#### Example Setup in _Layout.cshtml

```html
<head>
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />

    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```
---
