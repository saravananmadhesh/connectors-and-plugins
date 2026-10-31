# DataMatrix Generator — ASP.NET Core

## Overview

The `<ejs-datamatrixgenerator>` tag helper renders a **2D DataMatrix barcode** — a grid of dark and light dots or blocks forming a square or rectangular symbol.

**Data types supported:** Numeric and alphanumeric characters.

**Use cases:** Labels, printed media (letters, packaging), and applications requiring compact 2D encoding readable by barcode scanners and mobile phones.

---

## Basic DataMatrix

```cshtml
<ejs-datamatrixgenerator id="container"
    width="200px"
    height="150px"
    value="Syncfusion"
    mode="SVG">
</ejs-datamatrixgenerator>
```

**Key attributes:**

| Attribute | Description |
|---|---|
| `id` | Unique DOM element ID (required for JS access) |
| `value` | Data to encode |
| `width` / `height` | Rendered dimensions |
| `mode` | Use `"SVG"` for vector output |

---

## Color Customization

Use `foreColor` to change the dot/block color. Useful for branded or colorful printed media.

```cshtml
<ejs-datamatrixgenerator id="container"
    width="200px"
    height="150px"
    value="Syncfusion"
    foreColor="red"
    mode="SVG">
</ejs-datamatrixgenerator>
```

> Accepts any valid CSS color: named colors, hex codes, or RGB values.

---

## Dimension Customization

Control the rendered size via `width` and `height`:

```cshtml
<ejs-datamatrixgenerator id="container"
    width="300px"
    height="300px"
    value="Syncfusion"
    foreColor="red"
    mode="SVG">
</ejs-datamatrixgenerator>
```

---

## Display Text Customization

By default, the encoded value is shown as text below the DataMatrix symbol. You can control text visibility using the `<e-datamatrixgenerator-displaytext>` child tag.

### Hide the display text

```cshtml
<ejs-datamatrixgenerator id="container"
    width="300px"
    height="300px"
    value="Syncfusion"
    foreColor="red"
    mode="SVG">
    <e-datamatrixgenerator-displaytext visibility="false">
    </e-datamatrixgenerator-displaytext>
</ejs-datamatrixgenerator>
```

| Property | Type | Description |
|---|---|---|
| `visibility` | bool | `true` shows the label (default), `false` hides it |

> If you want to show a different text label than the encoded value, use `text` property in `<e-datamatrixgenerator-displaytext>`.
