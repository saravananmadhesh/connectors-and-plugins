# DataMatrix Generator — ASP.NET MVC

## Overview

`Html.EJS().DataMatrixGenerator()` renders a **2D DataMatrix barcode** — a grid of dark and light dots or blocks forming a square or rectangular symbol.

**Data types supported:** Numeric and alphanumeric characters.

**Use cases:** Labels, printed media (letters, packaging), and applications requiring compact 2D encoding readable by barcode scanners and mobile phones.

---

## Basic DataMatrix

```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .Value("Syncfusion")
    .Render())
```

**Key methods:**

| Method | Description |
|---|---|
| `"container"` | Unique DOM element ID (required for JS access) |
| `.Value()` | Data to encode |
| `.Width()` / `.Height()` | Rendered dimensions |

---

## Color Customization

Use `.foreColor()` to change the dot/block color. Useful for branded or colorful printed media.

```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .ForeColor("red")
    .Value("Syncfusion")
    .Render())
```

> Accepts any valid CSS color: named colors, hex codes, or RGB values.

---

## Dimension Customization

Control the rendered size via `.Width()` and `.Height()`:

```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("300px")
    .Height("300px")
    .ForeColor("red")
    .Value("Syncfusion")
    .Render())
```

---

## Display Text Customization

By default, the encoded value is shown as text below the DataMatrix symbol. Override or hide the label using `.DisplayText()`.

### Custom label text

```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .ForeColor("red")
    .DisplayText(s => s.Text("text"))
    .Value("SYNCFUSION")
    .Render())
```

| Property | Type | Description |
|---|---|---|
| `Text` | string | Override the displayed text label |
| `Visibility` | bool | `true` shows the label (default), `false` hides it |

> Use `DisplayText` when you want to show a human-readable label that differs from the raw encoded value.

---

## Background Color

Set the background color of the DataMatrix barcode using `.BackgroundColor()`:

```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .BackgroundColor("lightgray")
    .Value("Syncfusion")
    .Render())
```

| Property | Type | Default | Description |
|---|---|---|---|
| `.BackgroundColor()` | string | "white" | Sets the background color (accepts CSS color values) |

---

## Encoding Type

Define the encoding type for the DataMatrix using `.Encoding()`:

```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .Encoding(Syncfusion.EJ2.BarcodeGenerator.DataMatrixEncoding.Auto)
    .Value("Syncfusion")
    .Render())
```

| Property | Type | Default | Description |
|---|---|---|---|
| `.Encoding()` | DataMatrixEncoding | Auto | Specifies encoding type (Auto, ASCII, Base64, ANSI) |

---

## DataMatrix Size

Control the encoding size of the DataMatrix using `.Size()`:

```cshtml
    @(Html.EJS().DataMatrixGenerator("container")
        .Width("200px")
        .Height("150px")
        .Size(Syncfusion.EJ2.BarcodeGenerator.DataMatrixSize.Size10x10)
        .Value("Syncfusion")
        .Render())
```

| Property | Type | Default | Description |
|---|---|---|---|
| `.Size()` | DataMatrixSize | Auto | Predefined sizes from Auto (10x10 to 144x144) |

---

## Margin

Set the margin around the DataMatrix barcode using `.Margin()`:

```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .Margin(m => m.Left(10).Right(10).Top(10).Bottom(10))
    .Value("Syncfusion")
    .Render())
```

| Property | Type | Description |
|---|---|---|
| `.Margin()` | DataMatrixGeneratorMargin | Sets space around the barcode |

---

## Rendering Mode

Choose between SVG and Canvas rendering modes using `.Mode()`:

```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .Mode(Syncfusion.EJ2.BarcodeGenerator.RenderingMode.SVG)
    .Value("Syncfusion")
    .Render())
```

| Property | Type | Default | Description |
|---|---|---|---|
| `.Mode()` | RenderingMode | SVG | Rendering mode (SVG or Canvas) |

---
