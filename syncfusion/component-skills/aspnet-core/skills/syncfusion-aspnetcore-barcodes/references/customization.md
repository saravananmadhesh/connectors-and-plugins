# Customization — Barcode, QR Code & DataMatrix

All three Syncfusion ASP.NET Core barcode generators share the same customization properties for color, dimensions, and display text. This reference covers each property with examples for all three components.

---

## Foreground Color (`foreColor`)

Use `foreColor` to change the barcode module/dot color. This is useful when the barcode is rendered on a colored or branded background.

**Applies to:** `ejs-barcodegenerator`, `ejs-qrcodegenerator`, `ejs-datamatrixgenerator`

### BarcodeGenerator
```cshtml
<ejs-barcodegenerator id="container"
    width="300px" height="300px"
    type="Code128"
    foreColor="red"
    value="SYNCFUSION"
    mode="SVG">
</ejs-barcodegenerator>
```

### QR Code Generator
```cshtml
<ejs-qrcodegenerator id="container"
    width="200px" height="150px"
    value="Syncfusion"
    foreColor="red"
    mode="SVG">
</ejs-qrcodegenerator>
```

### DataMatrix Generator
```cshtml
<ejs-datamatrixgenerator id="container"
    width="200px" height="150px"
    value="Syncfusion"
    foreColor="red"
    mode="SVG">
</ejs-datamatrixgenerator>
```

> Accepts any valid CSS color: named (`"red"`, `"blue"`), hex (`"#1a73e8"`), or RGB (`"rgb(255,0,0)"`).

---

## Dimensions (`width` / `height`)

Control the rendered size using CSS length values.

**Applies to:** All three generators.

```cshtml
<ejs-barcodegenerator id="container"
    width="300px"
    height="300px"
    type="Code128"
    value="SYNCFUSION"
    mode="SVG">
</ejs-barcodegenerator>
```

> For QR codes, keep `width` equal to `height` for a square output. Non-square QR codes may reduce scan reliability.

---

## Display Text (`displayText.text`)

Override the text label shown below the barcode symbol. By default, the `value` is displayed as-is.

**Applies to:** `ejs-barcodegenerator`, `ejs-datamatrixgenerator`

### BarcodeGenerator — custom label
```cshtml
<ejs-barcodegenerator id="container"
    width="300px" height="300px"
    type="Code128"
    foreColor="red"
    value="SYNCFUSION"
    mode="SVG">
    <e-barcodegenerator-displaytext text="text"></e-barcodegenerator-displaytext>
</ejs-barcodegenerator>
```

### DataMatrix Generator — custom label
```cshtml
<ejs-datamatrixgenerator id="container"
    width="300px" height="300px"
    value="Syncfusion"
    foreColor="red"
    mode="SVG">
    <e-datamatrixgenerator-displaytext text="Custom Label"></e-datamatrixgenerator-displaytext>
</ejs-datamatrixgenerator>
```

---

## Display Text Visibility (`displayText.visibility`)

Show or hide the text label below the barcode symbol.

**Applies to:** `ejs-barcodegenerator`, `ejs-datamatrixgenerator`

### Hide label on DataMatrix
```cshtml
<ejs-datamatrixgenerator id="container"
    width="300px" height="300px"
    value="Syncfusion"
    mode="SVG">
    <e-datamatrixgenerator-displaytext visibility="false"></e-datamatrixgenerator-displaytext>
</ejs-datamatrixgenerator>
```

| Property | Values | Default | Effect |
|---|---|---|---|
| `visibility` | `true` / `false` | `true` | Show or hide the text label |
| `text` | string | `value` | Override the displayed label |

---

## Rendering Mode (`mode`)

Both BarcodeGenerator and DataMatrix support the `mode` attribute.

| Value | Output |
|---|---|
| `"SVG"` | Scalable Vector Graphics — recommended for sharp rendering at any size |

> Use `mode="SVG"` for best results across screen and print contexts.
