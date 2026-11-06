# Export & Printing

Learn to export barcodes to image formats, Base64 strings, and PDFs. Implement download functionality and integrate with server-side workflows.

---

## Export to Image Files

### Export as JPG

```typescript
import { BarcodeGenerator, BarcodeExportType } from '@syncfusion/ej2-barcode-generator';

const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    width: '200px',
    height: '150px'
});

barcode.appendTo('#barcode');

// Download as JPG file
const filename = 'my-barcode';
barcode.exportImage(filename, 'JPG');
```

This triggers a browser download with filename `my-barcode.jpg`.

### Export as PNG

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    width: '200px',
    height: '150px'
});

barcode.appendTo('#barcode');

// Download as PNG file
barcode.exportImage('my-barcode', 'PNG');
```

PNG provides lossless compression and transparency support.

### Export with Dynamic Filename

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'PRODUCT-SKU-123',
    width: '200px',
    height: '150px'
});

barcode.appendTo('#barcode');

// Generate filename based on data and timestamp
const timestamp = new Date().toISOString().slice(0, 10);
const filename = `barcode_${barcode.serverModule ? barcode.serverModule : 'export'}_${timestamp}`;
barcode.exportImage(filename, 'PNG');
```

---

## Export as Base64 String

Export barcode as Base64 for storage, API transmission, or database storage:

```typescript
import { BarcodeGenerator } from '@syncfusion/ej2-barcode-generator';

const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    width: '200px',
    height: '150px'
});

barcode.appendTo('#barcode');

// Export as Base64 string
(async () => {
    const base64String = await barcode.exportAsBase64Image('PNG');
    console.log(base64String);
    // Result: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
})();
```

### Using Base64 in HTML

```typescript
(async () => {
    const base64String = await barcode.exportAsBase64Image('PNG');
    
    // Display in image element
    const img = document.createElement('img');
    img.src = base64String;
    document.body.appendChild(img);
})();
```

### Sending Base64 to Server

```typescript
(async () => {
    const base64String = await barcode.exportAsBase64Image('PNG');
    
    // Send to server
const response = await fetch('/api/save-barcode', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // ⚠️ REQUIRED in production: Add your auth mechanism
    'Authorization': `Bearer ${userToken}`,   // JWT / OAuth token
    'X-CSRF-Token': getCsrfToken(),            // CSRF protection
  },
  body: JSON.stringify({ barcode: barcodeData })
});
    
    const result = await response.json();
    console.log('Barcode saved:', result);
})();
```

### Storing in Database

```typescript
// Backend (Node.js / Express)
app.post('/api/save-barcode', async (req, res) => {
    const { barcode, productId } = req.body;
    
    // Store Base64 string directly in database
    const product = await Product.findByIdAndUpdate(
        productId,
        { barcode: barcode },
        { new: true }
    );
    
    res.json({ success: true, productId: product._id });
});
```

---

## Image Format Comparison

| Format | File Size | Quality | Use Case |
|--------|-----------|---------|----------|
| PNG | Medium | Lossless, Sharp | Recommended (web, PDF, storage) |
| JPG | Small | Lossy | Not recommended (quality loss) |

**Recommendation:** Use PNG for barcodes (preserves sharpness, required for scanning).

---

## Printing Barcodes

### Print to Paper

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'PRINT-ME',
    width: '200px',
    height: '150px'
});

barcode.appendTo('#barcode');

// Trigger browser print dialog
function printBarcode() {
    window.print();
}

// Add print button
const printBtn = document.createElement('button');
printBtn.textContent = 'Print Barcode';
printBtn.onclick = printBarcode;
document.body.appendChild(printBtn);
```

### Print Stylesheet

```html
<style media="print">
    /* Hide everything except barcode */
    body * { display: none; }
    
    #barcode,
    #barcode * { display: block; }
    
    #barcode {
        width: 80mm;        /* 3.15 inches for standard label */
        height: 60mm;       /* Proportional height */
        page-break-inside: avoid;
        margin: 0;
        padding: 10mm;
    }
    
    /* Ensure quality when printing */
    #barcode svg {
        max-width: 100%;
        height: auto;
    }
</style>
```

### Multiple Barcodes on One Page

```typescript
function printMultipleBarcodes(barcodes: string[]) {
    // Create container
    const container = document.createElement('div');
    container.id = 'print-container';
    
    barcodes.forEach((value, index) => {
        const div = document.createElement('div');
        div.className = 'barcode-page-item';
        div.id = `barcode-${index}`;
        container.appendChild(div);
        
        const barcode = new BarcodeGenerator({
            type: 'Code128',
            value: value,
            width: '200px',
            height: '150px'
        });
        
        barcode.appendTo(`#barcode-${index}`);
    });
    
    document.body.appendChild(container);
    window.print();
}

// CSS for grid
const style = document.createElement('style');
style.textContent = `
    #print-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        padding: 20px;
    }
    
    .barcode-page-item {
        text-align: center;
        border: 1px solid #ddd;
        padding: 15px;
    }
    
    @media print {
        #print-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;
document.head.appendChild(style);

// Print 10 barcodes
const skus = Array.from({length: 10}, (_, i) => `SKU-${1000 + i}`);
printMultipleBarcodes(skus);
```
---

## Download with Custom Filename

```typescript
function downloadBarcode(barcode: BarcodeGenerator, filename: string, format: 'PNG' | 'JPG' = 'PNG') {
    // Remove special characters and add timestamp
    const sanitized = filename.replace(/[^a-zA-Z0-9-_]/g, '_');
    const timestamp = new Date().toISOString().slice(0, 10);
    const fullFilename = `${sanitized}_${timestamp}`;
    
    barcode.exportImage(fullFilename, format);
}

// Usage
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'PRODUCT-SKU-123'
});

barcode.appendTo('#barcode');

downloadBarcode(barcode, 'Product Label', 'PNG');
```

---

## Batch Export

```typescript
async function batchExportBarcodes(barcodeData: string[]) {
    const exports: string[] = [];
    
    for (const data of barcodeData) {
        const barcode = new BarcodeGenerator({
            type: 'Code128',
            value: data,
            width: '200px',
            height: '150px'
        });
        
        // Create temporary container
        const container = document.createElement('div');
        container.style.display = 'none';
        document.body.appendChild(container);
        
        barcode.appendTo(container);
        
        // Export as Base64
        const base64 = await barcode.exportAsBase64Image('PNG');
        exports.push(base64);
        
        // Cleanup
        container.remove();
    }
    
    return exports;
}

// Export multiple barcodes
(async () => {
    const skus = ['SKU-001', 'SKU-002', 'SKU-003'];
    const exported = await batchExportBarcodes(skus);
    
    exported.forEach((base64, index) => {
        console.log(`Barcode ${index + 1}:`, base64.substring(0, 50) + '...');
    });
})();
```

---

## Web API Integration

### Save to Server

```typescript
async function saveBarcodeToServer(barcode: BarcodeGenerator, productId: string) {
    const image = await barcode.exportAsBase64Image('PNG');
    
    const payload = {
        productId: productId,
        barcode: image,
        createdAt: new Date().toISOString()
    };
    
    const response = await fetch('/api/products/update-barcode', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    return response.json();
}

// Usage
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNC-2024'
});

barcode.appendTo('#barcode');

saveBarcodeToServer(barcode, 'PROD-123').then(result => {
    console.log('Barcode saved:', result);
});
```

### Retrieve from Server

```typescript
async function loadBarcodeFromServer(productId: string) {
    const response = await fetch(`/api/products/${productId}/barcode`);
    const { barcode } = await response.json();
    
    const img = document.createElement('img');
    img.src = barcode;  // Base64 string
    document.getElementById('barcode-display').appendChild(img);
}

loadBarcodeFromServer('PROD-123');
```

---

## Quality Considerations

### DPI (Dots Per Inch)

For printing clear barcodes:

```typescript
// Web display: 72 DPI (default)
const webBarcode = new BarcodeGenerator({
    width: '200px',
    height: '150px'
});

// Print output: 300 DPI is ideal
// Scale up dimensions for print
const printBarcode = new BarcodeGenerator({
    width: '600px',      // 3x larger
    height: '450px',     // 3x larger
    mode: 'SVG'          // SVG scales without quality loss
});
```

### Encoding Considerations

```typescript
// PNG: Lossless, best for barcodes
await barcode.exportAsBase64Image('PNG');

// JPG: Lossy, not recommended (can damage barcode)
await barcode.exportAsBase64Image('JPG');  // Only if space critical
```

---

## Troubleshooting

**Issue:** "Barcode unreadable after export"
- Use PNG format (lossless)
- Increase barcode dimensions in generator
- Check contrast when printing

**Issue:** "Download fails in browser"
- Check: CORS headers (if cross-domain)
- Verify: File size not too large
- Try: Different browser

**Issue:** "Print quality is poor"
- Switch mode to SVG (scales better)
- Increase dimensions before export
- Use "Best" print quality setting

---

## Next Steps

For custom validation and event handling, see [Validation & Events](validation-events.md).
