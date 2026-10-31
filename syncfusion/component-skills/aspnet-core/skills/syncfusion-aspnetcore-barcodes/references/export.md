# Export — Barcode, QR Code & DataMatrix

Export functionality is shared across all three Syncfusion barcode generators: `ejs-barcodegenerator`, `ejs-qrcodegenerator`, and `ejs-datamatrixgenerator`.

---

## Export as Image File

Download the barcode as an image file directly in the browser using `exportImage()`.

```typescript
var barcode = document.getElementById("barcode").ej2_instances[0];
var filename = 'Export';
barcode.exportImage(filename, 'JPG');
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `filename` | string | Name of the downloaded file (without extension) |
| `format` | string | Image format — `'JPG'` or `'PNG'` |

**Example with a button trigger:**

```cshtml
<ejs-barcodegenerator id="barcode"
    width="200px" height="150px"
    type="Code128" value="SYNCFUSION"
    mode="SVG">
</ejs-barcodegenerator>

<button onclick="exportBarcode()">Download Barcode</button>

<script>
  function exportBarcode() {
    var barcode = document.getElementById("barcode").ej2_instances[0];
    barcode.exportImage('MyBarcode', 'PNG');
  }
</script>
```

---

## Export as Base64 String

Get the barcode as a Base64-encoded image string using `exportAsBase64Image()`. Useful for embedding in emails, storing in databases, or sending via API.

```typescript
var barcode = document.getElementById("barcode").ej2_instances[0];
await barcode.exportAsBase64Image('JPG');
```

**Returns:** A Base64 string representing the image data.

**Example with async/await:**

```html
<button onclick="getBase64()">Get Base64</button>

<script>
  async function getBase64() {
    var barcode = document.getElementById("barcode").ej2_instances[0];
    var base64 = await barcode.exportAsBase64Image('PNG');
    console.log(base64); // Use or store the Base64 string
  }
</script>
```

---

## Supported Formats

| Format | Value | Notes |
|---|---|---|
| JPEG | `'JPG'` | Smaller file size, lossy compression |
| PNG | `'PNG'` | Lossless compression, better for high-contrast barcodes |

> Prefer `'PNG'` for barcodes to avoid JPEG compression artifacts that can affect scan reliability.

---

## Applies To All Generators

The same `exportImage()` and `exportAsBase64Image()` API works identically for all three components:

```javascript
// QR Code
var qr = document.getElementById("qrcode").ej2_instances[0];
qr.exportImage('MyQR', 'PNG');

// DataMatrix
var dm = document.getElementById("datamatrix").ej2_instances[0];
dm.exportImage('MyDM', 'PNG');
```
