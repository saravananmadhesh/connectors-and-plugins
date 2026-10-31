# Barcode Types — BarcodeGenerator (ASP.NET MVC)

## Table of Contents
- [Overview](#overview)
- [Code39](#code39)
- [Code39 Extended](#code39-extended)
- [Code11](#code11)
- [Codabar](#codabar)
- [Code32](#code32)
- [Code93](#code93)
- [Code93 Extended](#code93-extended)
- [Code128](#code128)
- [Choosing the Right Type](#choosing-the-right-type)

---

## Overview

`Html.EJS().BarcodeGenerator()` supports multiple 1D barcode symbologies via the `.Type()` method. Set `.Value()` to the data you want encoded.

```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code128)
    .Value("YOUR_VALUE")
    .Render())
```

The controller action simply returns the view — no additional barcode-specific configuration is required in the controller:

```csharp
public ActionResult Index()
{
    return View();
}
```

---

## Code39

**Character set:** Digits 0–9, uppercase letters A–Z, and symbols: space, `-`, `+`, `.`, `$`, `/`, `%`

**Use case:** General-purpose labeling where only uppercase alphanumeric data is needed. No checksum required for common use.

**Constraint:** Length can be any size, but readability degrades beyond ~25 characters.

```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code39)
    .Value("SYNCFUSION")
    .Render())
```

---

## Code39 Extended

An extended version of Code39 that supports the **full ASCII character set**, including lowercase letters (a–z) and keyboard special characters.

**Use case:** When you need Code39 compatibility but also require lowercase or special characters.

```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code39Extension)
    .Value("SYNCFUSION")
    .Render())
```

> Note: The enum value is `Code39Extension` (not `Code39Extended`).

---

## Code11

**Character set:** Digits 0–9, dash (`-`), and start/stop code.

**Use case:** Primarily for labeling **telecommunication equipment**. Compact numeric-only symbology.

```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code11)
    .Value("112")
    .Render())
```

---

## Codabar

**Character set:** `0123456789 - $ : / . + A B C D`

Characters A, B, C, and D serve as start/stop characters.

**Use case:** Libraries, blood banks, and the package delivery industry.

```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Codabar)
    .Value("123456789")
    .Render())
```

---

## Code32

**Use case:** Coding **pharmaceuticals, cosmetics, and dietetics** — specifically Italian Pharmacode.

**Value structure:**
- Must be exactly **8 digits** of Pharmacode (prefix with `0` if needed)
- A leading `A` character (ASCII 65) is not encoded
- A 9th checksum digit (modulo 10) is automatically calculated

```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code32)
    .Value("01234567")
    .Render())
```

> Always provide exactly 8 digits. The barcode automatically appends the checksum.

---

## Code93

**Character set (Standard Mode):** Uppercase A–Z, digits 0–9, and special characters: `*`, `-`, `$`, `%`, `(Space)`, `.`, `/`, `+`

**Use case:** Complements Code39 with higher data density. Continuous, variable-length, self-checking.

```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code93)
    .Value("01234567")
    .Render())
```

---

## Code93 Extended

Supports the **full 128 ASCII character set** using pairs of Code93 characters. Continuous, variable-length, and self-checking.

**Use case:** When full ASCII support is required with the density benefits of Code93.

---

## Code128

The most versatile 1D barcode. Variable length, high density, capable of encoding the **full 128-character ASCII set** and extended character sets. Includes a built-in checksum digit.

### Code Sets

| Code Set | Characters Encoded |
|---|---|
| **Code Set A** | Standard uppercase, punctuation, control characters (ASCII 0–95), 7 special chars |
| **Code Set B** | Standard uppercase + lowercase, punctuation (ASCII 32–127), 7 special chars |
| **Code Set C** | 100 digit pairs (00–99) — encodes numeric data at double density |

### Special Characters

The last 7 characters of Sets A/B (values 96–102) and last 3 of Set C (values 100–102) are non-data characters with special reader significance.

```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code128)
    .Value("SYNCFUSION")
    .Render())
```

> Code128 is the recommended default for general-purpose 1D barcodes.

---

## Choosing the Right Type

| Scenario | Recommended Type |
|---|---|
| Numeric only (telecom) | `Code11` |
| Numeric + libraries/logistics | `Codabar` |
| Italian pharmaceutical | `Code32` |
| Uppercase alphanumeric only | `Code39` |
| Full ASCII with Code39 compat | `Code39Extension` |
| High-density alphanumeric | `Code93` |
| Full ASCII, high-density | `Code93Extension` |
| General purpose (default) | `Code128` |
| Dense numeric data | `Code128` (uses Code Set C internally) |
