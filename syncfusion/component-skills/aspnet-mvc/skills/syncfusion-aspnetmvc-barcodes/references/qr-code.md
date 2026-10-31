# QR Code Generator — ASP.NET MVC

## Table of Contents
- [Overview](#overview)
- [Basic QR Code](#basic-qr-code)
- [Color Customization](#color-customization)
- [Dimension Customization](#dimension-customization)
- [Embedding a Logo](#embedding-a-logo)
- [Error Correction and Logo Readability](#error-correction-and-logo-readability)

---

## Overview

`Html.EJS().QRCodeGenerator()` renders a 2D QR code. QR codes can encode **numeric, alphanumeric, and Shift JIS (JIS8)** characters.

**Versioning:** QR codes range from Version 1 (21×21 modules) to Version 40 (177×177 modules), increasing by 4 modules per side per version. Each version has a fixed data capacity. By default, the component **automatically selects the version** based on the length of the input value — you don't need to set it manually.

**Use cases:** URLs, product identifiers, consumer advertising, industrial tracking.

---

## Basic QR Code

```cshtml
@(Html.EJS().QRCodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Value("Syncfusion")
    .Render())
```

```csharp
public ActionResult qrcode()
{
    return View();
}
```

**Key methods:**

| Method | Description |
|---|---|
| `"container"` | Unique DOM element ID (required for JS access) |
| `.Value()` | Data to encode (string) |
| `.Width()` / `.Height()` | Dimensions of the rendered QR code |

---

## Color Customization

Use `.foreColor()` to change the QR code module color. Useful when the barcode appears on a colored background or branded media.

```cshtml
@(Html.EJS().QRCodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .ForeColor("red")
    .Value("Syncfusion")
    .Render())
```

> Any valid CSS color value works: named colors (`"blue"`), hex (`"#1a73e8"`), RGB (`"rgb(0,0,255)"`).

---

## Dimension Customization

Adjust `.Width()` and `.Height()` to fit your layout. Both accept CSS length values (px, %).

```cshtml
@(Html.EJS().QRCodeGenerator("container")
    .Width("300px")
    .Height("300px")
    .ForeColor("red")
    .Value("Syncfusion")
    .Render())
```

> For square QR codes (standard), keep `width` and `height` equal. Non-square dimensions may distort readability.

---

## Embedding a Logo

Add a recognizable icon to enhance visual identity and make the QR source easier to identify. Logo embedding is configured via the `.logo()` method using SVG mode.

### Supported Image Sources

The `imageSource` property of the logo accepts:

| Source Type | Example |
|---|---|
| **Local path** (relative) | `"images/logo.png"` |
| **Local path** (absolute) | `"/assets/icons/logo.svg"` |
| **Remote URL** | `"https://example.com/image.jpg"` |
| **Base64 encoded** | `"data:image/png;base64,iVBORw0KGgo..."` |

### Logo Dimensions

- `width` and `height` define logo size in pixels
- Defaults to **30% of QR code size** if not specified
- **Maximum allowed:** 30% of QR code dimensions — larger logos break readability

### Implementation

```cshtml
 @(Html.EJS().QRCodeGenerator("container")
     .Width("200px")
     .Height("150px")
     .Mode(Syncfusion.EJ2.BarcodeGenerator.RenderingMode.SVG)
     .Logo(s => s.ImageSource("https://www.syncfusion.com/web-stories/wp-content/uploads/sites/2/2022/02/cropped-Syncfusion-logo.png"))
     .Value("SYNCFUSION")
     .Render())
```

## Error Correction and Logo Readability

When a logo is embedded, part of the QR code data modules are covered. Error correction allows the QR code to remain scannable despite partially obscured content.

Use the `errorCorrectionLevel` property to increase redundancy when adding a logo:

| Level | Redundancy | When to Use |
|---|---|---|
| `"Low"` | ~7% recovery | No logo, clean background |
| `"Medium"` | ~15% recovery | Small logo |
| `"High"` | ~30% recovery | Larger logo, important data |

> Always **test scan readability** after adding a logo. If the QR code fails to scan, increase `errorCorrectionLevel` to `"Medium"` or `"High"`.
