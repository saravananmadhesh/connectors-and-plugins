# Customization — Barcode, QR Code & DataMatrix (ASP.NET MVC)

All three Syncfusion ASP.NET MVC barcode generators share the same customization properties for color, dimensions, and display text. This reference covers each property with examples for all three components.

---

## Foreground Color (`ForeColor`)

Use `.ForeColor()` to change the barcode module/dot color. This is useful when the barcode is rendered on a colored or branded background.

**Applies to:** `BarcodeGenerator`, `QRCodeGenerator`, `DataMatrixGenerator`

### BarcodeGenerator
```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("300px")
    .Height("300px")
    .ForeColor("red")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code128)
    .Value("SYNCFUSION")
    .Render())
```

### QR Code Generator
```cshtml
@(Html.EJS().QRCodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .ForeColor("red")
    .Value("Syncfusion")
    .Render())
```

### DataMatrix Generator
```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .ForeColor("red")
    .Value("Syncfusion")
    .Render())
```

> Accepts any valid CSS color: named (`"red"`, `"blue"`), hex (`"#1a73e8"`), or RGB (`"rgb(255,0,0)"`).

---

## Dimensions (`Width` / `Height`)

Control the rendered size using CSS length values.

**Applies to:** All three generators.

```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("300px")
    .Height("300px")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code128)
    .Value("SYNCFUSION")
    .Render())
```

> For QR codes, keep `Width` equal to `Height` for a square output. Non-square QR codes may reduce scan reliability.

---

## Display Text (`DisplayText.text`)

Override the text label shown below the barcode symbol. By default, the `Value` is displayed as-is.

**Applies to:** `BarcodeGenerator`, `DataMatrixGenerator`

### BarcodeGenerator — custom label
```cshtml
<div>
    @(Html.EJS().BarcodeGenerator("container")
        .Width("200px")
        .Height("150px")
        .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Code128)
        .Value("SYNCFUSION")
        .DisplayText(s => s.Text("text"))
        .Invalid("invalidInput")
        .Render())

</div>

    <script>
        function invalidInput(args) {
            //Handle invalid input
            alert("Invalid input value");
    }
    </script>
```

### DataMatrix Generator — custom label
```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .ForeColor("red")
    .DisplayText(s => s.Text("text"))
    .Value("SYNCFUSION")
    .Render())
```

---

## Rendering Mode (`mode`)

The `mode` property controls the rendering output format.

| Value | Output |
|---|---|
| `"SVG"` | Scalable Vector Graphics — recommended for sharp rendering at any size |

> Use `mode="SVG"` for best results across screen and print contexts. SVG output scales cleanly at any resolution.
