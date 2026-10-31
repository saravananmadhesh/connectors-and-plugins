# Barcode Types — BarcodeGenerator

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

The `<ejs-barcodegenerator>` tag helper supports multiple 1D barcode symbologies via the `type` attribute. Set the `value` attribute to the data you want encoded, and `mode="SVG"` for SVG rendering.

```cshtml
<ejs-barcodegenerator id="container"
    width="200px"
    height="150px"
    type="Code128"
    value="YOUR_VALUE"
    mode="SVG">
</ejs-barcodegenerator>
```

---

## C# Enum for Type Binding

When binding `type` from a C# model property, use the `BarcodeType` enum
from the `Syncfusion.EJ2.BarcodeGenerator` namespace:

```csharp
using Syncfusion.EJ2.BarcodeGenerator;

BarcodeType type = BarcodeType.Code128;
```

### Available Enum Values

| Enum Value | Barcode Type |
|---|---|
| `BarcodeType.Code128` | Code128 (auto set) |
| `BarcodeType.Code128A` | Code128 Set A |
| `BarcodeType.Code128B` | Code128 Set B |
| `BarcodeType.Code128C` | Code128 Set C |
| `BarcodeType.Code39` | Code39 |
| `BarcodeType.Code39Extension` | Code39 Extended |
| `BarcodeType.Code93` | Code93 |
| `BarcodeType.Code93Extension` | Code93 Extended |
| `BarcodeType.Code11` | Code11 |
| `BarcodeType.Codabar` | Codabar |
| `BarcodeType.Code32` | Code32 |

### String Literal vs C# Variable

| Usage | Example | Works? |
|---|---|---|
| Static string literal in tag helper | `type="Code128"` | ✅ Razor coerces at compile time |
| C# `string` variable | `type="@myStringVar"` | ❌ `CS0029` — no implicit conversion |
| C# `BarcodeType` variable | `type="@myEnumVar"` | ✅ Correct approach |

> **Rule:** Any time `type` is bound from a C# model property or variable, declare it as `BarcodeType`, not `string`, and add `using Syncfusion.EJ2.BarcodeGenerator;` to the page model.

---

## Code39

**Character set:** Digits 0–9, uppercase letters A–Z, and symbols: space, `-`, `+`, `.`, `$`, `/`, `%`

**Use case:** General purpose labeling where only uppercase alphanumeric data is needed. No checksum required for common use.

**Constraint:** Length can be any size, but readability degrades beyond ~25 characters.

```cshtml
<ejs-barcodegenerator id="container"
    width="200px" height="150px"
    type="Code39"
    value="SYNCFUSION"
    mode="SVG">
</ejs-barcodegenerator>
```

---

## Code39 Extended

An extended version of Code39 that supports the **full ASCII character set**, including lowercase letters (a–z) and keyboard special characters.

**Use case:** When you need Code39 compatibility but also require lowercase or special characters.

```cshtml
<ejs-barcodegenerator id="container"
    width="200px" height="150px"
    type="Code39Extension"
    value="SYNCFUSION"
    mode="SVG">
</ejs-barcodegenerator>
```

> Note: The `type` value is `Code39Extension` (not `Code39Extended`).

---

## Code11

**Character set:** Digits 0–9, dash (`-`), and start/stop code.

**Use case:** Primarily for labeling **telecommunication equipment**. Compact numeric-only symbology.

```cshtml
<ejs-barcodegenerator id="container"
    width="200px" height="150px"
    type="Code11"
    value="112"
    mode="SVG">
</ejs-barcodegenerator>
```

---

## Codabar

**Character set:** `0123456789 - $ : / . + A B C D`

Characters A, B, C, and D serve as start/stop characters.

**Use case:** Libraries, blood banks, and package delivery industry.

```cshtml
<ejs-barcodegenerator id="container"
    width="200px" height="150px"
    type="Codabar"
    value="123456789"
    mode="SVG">
</ejs-barcodegenerator>
```

---

## Code32

**Use case:** Coding **pharmaceuticals, cosmetics, and dietetics** — specifically Italian Pharmacode.

**Value structure:**
- Must be exactly **8 digits** of Pharmacode (prefix with `0` if needed)
- A leading `A` character (ASCII 65) is not encoded
- A 9th checksum digit (modulo 10) is automatically calculated

```cshtml
<ejs-barcodegenerator id="container"
    width="200px" height="150px"
    type="Code32"
    value="01234567"
    mode="SVG">
</ejs-barcodegenerator>
```

> Always provide exactly 8 digits. The barcode automatically appends the checksum.

---

## Code93

**Character set (Standard Mode):** Uppercase A–Z, digits 0–9, and special characters: `*`, `-`, `$`, `%`, `(Space)`, `.`, `/`, `+`

**Use case:** Complements Code39 with higher data density. Continuous, variable-length, self-checking.

```cshtml
<ejs-barcodegenerator id="container"
    width="200px" height="150px"
    type="Code93"
    value="01234567"
    mode="SVG">
</ejs-barcodegenerator>
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
<ejs-barcodegenerator id="container"
    width="200px" height="150px"
    type="Code128"
    value="SYNCFUSION"
    mode="SVG">
</ejs-barcodegenerator>
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
