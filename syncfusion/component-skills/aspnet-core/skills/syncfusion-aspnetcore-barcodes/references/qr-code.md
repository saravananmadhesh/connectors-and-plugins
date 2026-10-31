# QR Code Generator — ASP.NET Core

## Table of Contents
- [Overview](#overview)
- [Basic QR Code](#basic-qr-code)
- [Color Customization](#color-customization)
- [Dimension Customization](#dimension-customization)
- [Embedding a Logo](#embedding-a-logo)
- [Error Correction and Logo Readability](#error-correction-and-logo-readability)

---

## Overview

The `<ejs-qrcodegenerator>` tag helper renders a 2D QR code. QR codes can encode **numeric, alphanumeric, and Shift JIS (JIS8)** characters.

**Versioning:** QR codes range from Version 1 (21×21 modules) to Version 40 (177×177 modules), increasing by 4 modules per side per version. Each version has a fixed data capacity. By default, the component **automatically selects the version** based on the length of the input value — you don't need to set it manually.

**Use cases:** URLs, product identifiers, consumer advertising, industrial tracking.

---

## Basic QR Code

```cshtml
<ejs-qrcodegenerator id="container"
    width="200px"
    height="150px"
    value="Syncfusion">
</ejs-qrcodegenerator>
```

**Key attributes:**

| Attribute | Description |
|---|---|
| `id` | Unique DOM element ID (required for JS access) |
| `value` | Data to encode (string) |
| `width` / `height` | Dimensions of the rendered QR code |
| `mode` | Rendering mode — use `"SVG"` for vector output |

---

## Color Customization

Use `foreColor` to change the QR code module color. Useful when the barcode appears on a colored background or branded media.

```cshtml
<ejs-qrcodegenerator id="container"
    width="200px"
    height="150px"
    value="Syncfusion"
    foreColor="red"
    mode="SVG">
</ejs-qrcodegenerator>
```

> Any valid CSS color value works: named colors (`"blue"`), hex (`"#1a73e8"`), RGB (`"rgb(0,0,255)"`).

---

## Dimension Customization

Adjust `width` and `height` to fit your layout. Both accept CSS length values (px, %).

```cshtml
<ejs-qrcodegenerator id="container"
    width="300px"
    height="30px"
    value="Syncfusion">
</ejs-qrcodegenerator>
```

> For square QR codes (standard), keep `width` and `height` equal. Non-square dimensions may distort readability.

---

## Embedding a Logo

Add a recognizable icon to enhance visual identity and make the QR source easier to identify. Logo embedding is configured via JavaScript after the component renders.

### Supported Image Sources

The `imageSource` property of the logo object accepts:

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
<ejs-qrcodegenerator id="container"
    width="200px"
    height="150px"
    mode="SVG"
    value="Syncfusion">
</ejs-qrcodegenerator>

<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function () {
        var barcode = document.getElementById("container").ej2_instances[0];
        barcode.logo = {
            imageSource: 'https://www.syncfusion.com/web-stories/wp-content/uploads/sites/2/2022/02/cropped-Syncfusion-logo.png'
        };
    });
</script>
```

---

## Error Correction and Logo Readability

When a logo is embedded, part of the QR code data modules are covered. Error correction allows the QR code to remain scannable despite partially obscured content.

Use the `errorCorrectionLevel` property to increase redundancy when adding a logo:

| Level | Redundancy | When to Use |
|---|---|---|
| `"Low"` | ~7% recovery | No logo, clean background |
| `"Medium"` | ~15% recovery | Small logo |
| `"High"` | ~30% recovery | Larger logo, important data |

> Always **test scan readability** after adding a logo. If the QR code fails to scan, increase `errorCorrectionLevel` to `"Medium"` or `"High"`.
