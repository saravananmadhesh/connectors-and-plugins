---
name: syncfusion-aspnetmvc-barcodes
description: Use this skill whenever the user asks to generate, customize, render, or export barcodes, QR codes, or DataMatrix codes using Syncfusion ASP.NET MVC Barcode components. Trigger this skill for requests involving BarcodeGenerator,QRCodeGenerator, or DataMatrixGenerator, including barcode types such as Code39,Code128, and Codabar, visual customization (color, size, display text), QR logo embedding, and exporting barcodes as JPG, PNG, or Base64 in ASP.NET MVC projects.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Barcodes (ASP.NET MVC)

Syncfusion EJ2 ASP.NET MVC provides three barcode components via HTML helpers:

| Component | HTML Helper | Use When |
|---|---|---|
| **BarcodeGenerator** | `Html.EJS().BarcodeGenerator()` | Linear 1D barcodes (Code39, Code128, Codabar, etc.) |
| **QR Code Generator** | `Html.EJS().QRCodeGenerator()` | 2D QR codes, optional logo embedding |
| **DataMatrix Generator** | `Html.EJS().DataMatrixGenerator()` | 2D DataMatrix barcodes |

All three support color customization, dimension control, display text, and export to image or Base64.

## When to Use This Skill

- Rendering any barcode type in an ASP.NET MVC view
- Choosing between BarcodeGenerator, QR Code, and DataMatrix
- Customizing barcode appearance (color, size, text)
- Embedding a logo in a QR code
- Exporting barcodes as images or Base64 strings

## Important: API Verification Required

**API Verification Required**: Always verify API class names, properties, and method signatures by reading reference files (`references/*.md`) BEFORE generating code examples. Do not assume or infer class names.

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- NuGet package installation (`Syncfusion.EJ2.MVC5`)
- Namespace registration in `Web.config`
- CDN stylesheet and script setup in `_Layout.cshtml`
- Script manager registration (`@Html.EJS().ScriptManager()`)
- First render of all three barcode components

### Barcode Types (1D — BarcodeGenerator)
📄 **Read:** [references/barcode-types.md](references/barcode-types.md)
- Code39, Code39 Extended
- Code11, Codabar, Code32
- Code93, Code93 Extended
- Code128 (Code Sets A/B/C) and special characters
- When to choose each type

### QR Code Generator
📄 **Read:** [references/qr-code.md](references/qr-code.md)
- QR code versioning (v1–v40, auto-selected)
- Basic QR code rendering
- Color and dimension customization
- Embedding a logo/icon (local path, URL, Base64)
- Logo size limits and errorCorrectionLevel guidance

### DataMatrix Generator
📄 **Read:** [references/data-matrix.md](references/data-matrix.md)
- DataMatrix overview and use cases
- Basic rendering
- Color and dimension customization
- Display text customization

### Customization (Color, Dimensions, Text)
📄 **Read:** [references/customization.md](references/customization.md)
- `foreColor` property for all three generators
- `Width` and `Height` dimension control
- `DisplayText` → `text` for custom label override
- Rendering mode (`SVG`)

### Export
📄 **Read:** [references/export.md](references/export.md)
- `exportImage(filename, format)` — download as JPG or PNG
- `exportAsBase64Image(format)` — returns Base64 string
- Supported formats: JPG, PNG
- Applies to all three barcode components

## Quick Start

### BarcodeGenerator (Code128)
```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code128)
    .Value("SYNCFUSION")
    .Render())
```

### QR Code
```cshtml
@(Html.EJS().QRCodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Value("https://syncfusion.com")
    .Render())
```

### DataMatrix
```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .Value("Syncfusion")
    .Render())
```

## Common Patterns

### Choose barcode type based on content
- **Numeric only, telecom** → Codabar or Code11
- **Uppercase alphanumeric** → Code39
- **Full ASCII, variable length** → Code128 (most common for general use)
- **Italian pharmaceutical** → Code32
- **Dense alphanumeric** → Code93
- **URL, large payload, 2D** → QR Code
- **Label/print media, 2D** → DataMatrix

### Apply red foreground color (BarcodeGenerator)
```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("300px")
    .Height("300px")
    .ForeColor("red")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code128)
    .Value("SYNCFUSION")
    .Render())
```

### Export barcode on button click
```cshtml
<button onclick="exportBarcode()">Export</button>
<script>
  function exportBarcode() {
    var barcode = document.getElementById("container").ej2_instances[0];
    barcode.exportImage('MyBarcode', 'JPG');
  }
</script>
```
