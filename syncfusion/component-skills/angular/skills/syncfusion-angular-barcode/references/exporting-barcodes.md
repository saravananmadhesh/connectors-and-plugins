# Exporting Barcodes

## Table of Contents
- [Export Overview](#export-overview)
- [Exporting as Image File](#exporting-as-image-file)
- [Exporting as Base64 String](#exporting-as-base64-string)
- [Download Functionality](#download-functionality)
- [File Naming Conventions](#file-naming-conventions)
- [Export Use Cases](#export-use-cases)
- [Backend Integration](#backend-integration)

---

## Export Overview

The Syncfusion Barcode Generator provides multiple export options for different use cases:

| Export Method | Format | Use Case |
|--------------|--------|----------|
| **Image File** | PNG, SVG, JPG | Download, print, share |
| **Base64 String** | Data URL | Store in database, embed in email |
| **Direct Download** | Browser download | User-facing export buttons |

---

## Exporting as Image File

### Basic Export Method

```typescript
import { Component, ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

@Component({
  selector: 'app-export',
  template: `
    <div>
      <button (click)="downloadBarcode()">Download as PNG</button>

      <ejs-barcodegenerator
        #barcode
        type="Code128"
        value="EXPORT-123456"
        width="200px"
        height="150px">
      </ejs-barcodegenerator>
    </div>
  `
})
export class ExportComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  downloadBarcode() {
    // exportImage(fileName, exportType)
    this.barcode.exportImage('barcode', 'PNG');
  }
}


```

### Export Parameters

```typescript
// barcode.exportImage(fileName, exportType)

// PNG format
this.barcode.exportImage('my-barcode', 'PNG');
// Creates: my-barcode.png

// SVG format (scalable)
this.barcode.exportImage('my-barcode', 'SVG');
// Creates: my-barcode.svg

// JPG format (compressed)
this.barcode.exportImage('my-barcode', 'JPG');
// Creates: my-barcode.jpg

```

### Supported Formats

| Format | Extension | Use Case | File Size |
|--------|-----------|----------|-----------|
| **PNG** | .png | General purpose, print | Moderate |
| **SVG** | .svg | Scalable, web, print | Small |
| **JPG** | .jpg | Compressed, web | Very small |

### Full Export Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

@Component({
  selector: 'app-multi-export',
  template: `
    <div class="export-controls">
      <h3>Export Barcode</h3>

      <div class="button-group">
        <button (click)="exportAs('PNG')">Export as PNG</button>
        <button (click)="exportAs('JPG')">Export as JPG</button>
      </div>

      <ejs-barcodegenerator
        #barcode
        type="Code128"
        value="MULTI-EXPORT-001"
        width="250px"
        height="150px">
      </ejs-barcodegenerator>

      <p>Status: {{ exportStatus }}</p>
    </div>
  `,
  styles: [`
    .export-controls { padding: 20px; }
    .button-group { margin: 20px 0; }
    button {
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
    }
  `]
})
export class MultiExportComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  exportStatus = 'Ready';

  exportAs(format: 'PNG' | 'JPG') {
    try {
      this.exportStatus = `Exporting as ${format}...`;
      this.barcode.exportImage(`barcode-${Date.now()}`, format);
      this.exportStatus = `Successfully exported as ${format}`;
    } catch (error) {
      this.exportStatus = 'Export failed';
      console.error(error);
    }
  }
}
```

---

## Exporting as Base64 String

Base64 export allows you to store barcode data without creating files.

### Basic Base64 Export

```typescript
import { Component, ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

@Component({
  selector: 'app-base64',
  template: `
    <div>
      <button (click)="getBase64()">Get Base64 String</button>

      <ejs-barcodegenerator 
        #barcode
        type="QRCode" 
        value="https://example.com"
        width="200px" 
        height="200px">
      </ejs-barcodegenerator>

      <div *ngIf="base64String" class="result">
        <p>Base64 String:</p>
        <textarea readonly>{{ base64String }}</textarea>
      </div>
    </div>
  `
})
export class Base64Component {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  base64String = '';

  getBase64() {
    // Returns a Base64 Data URL string
    this.base64String = this.barcode.exportAsBase64Image('PNG');
    console.log('Base64 Data URL:', this.base64String);
  }
}
```

### Base64 Format

```typescript
// Returns Data URL format
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA....'
         │      │   │
         │      │   └─ Base64 encoded image data
         │      └──── Image MIME type
         └────────── Data URL scheme
```

### Supported Formats (Base64)

```typescript
// PNG
this.barcode.exportAsBase64Image('PNG');
// Returns: data:image/png;base64,...

// JPEG
this.barcode.exportAsBase64Image('JPG');
// Returns: data:image/jpeg;base64,...
```

### Store Base64 in Database

```typescript
export class StoreBarcodeService {
  constructor(private http: HttpClient) {}

  saveBarcode(barcodeData: string, productId: string) {
    return this.http.post('/api/barcodes', {
      productId: productId,
      barcodeImage: barcodeData,  // Base64 string
      timestamp: new Date()
    });
  }

  retrieveBarcode(productId: string) {
    return this.http.get(`/api/barcodes/${productId}`);
  }
}
```

---

## Download Functionality

### Manual Download with Custom Filename

```typescript
downloadBarcodeWithName(filename: string) {
  const element = document.createElement('a');
  const file = new Blob([/* barcode data */], { type: 'image/png' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
```

### Export with Timestamp

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class TimestampedExportComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  exportWithTimestamp() {
    const timestamp = new Date().toISOString()
      .slice(0, 10)
      .replace(/-/g, ''); // YYYYMMDD

    const filename = `barcode-${timestamp}`;

    // ✅ EJ2 BarcodeGenerator export API
    this.barcode.exportImage(filename, 'PNG');
  }
}
```

### Batch Download Multiple Barcodes

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class BatchExportComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  barcodes = [
    { id: 'PROD-001', value: 'SKU-001' },
    { id: 'PROD-002', value: 'SKU-002' },
    { id: 'PROD-003', value: 'SKU-003' }
  ];

  async exportAllBarcodes() {
    for (const item of this.barcodes) {
      // Update barcode value
      this.barcode.value = item.value;

      // Ensure the component refreshes with the new value before exporting
      this.barcode.dataBind();

      // Small delay to allow DOM render (optional but safe in batch exports)
      await this.sleep(100);

      // Export (fileName, format)
      this.barcode.exportImage(item.id, 'PNG');
    }

    alert('All barcodes exported');
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

---

## File Naming Conventions

### Standard Conventions

```typescript
// Date-based
`barcode-${new Date().toISOString().slice(0, 10)}`  // barcode-2026-03-21

// Product-based
`SKU-${productCode}-barcode`  // SKU-123456-barcode

// Batch-based
`BATCH-${batchNumber}-exported`  // BATCH-789-exported

// ID-based
`barcode-${uuid()}`  // barcode-550e8400-e29b-41d4-a716-446655440000
```

### Component with Naming Strategy

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class SmartNameComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  productCode = 'SKU-123456';
  batchNumber = '789';

  exportBarcode(namingStrategy: 'date' | 'product' | 'batch') {
    let filename = '';

    switch (namingStrategy) {
      case 'date':
        filename = `barcode-${this.getDateString()}`;
        break;
      case 'product':
        filename = `${this.productCode}-barcode`;
        break;
      case 'batch':
        filename = `BATCH-${this.batchNumber}`;
        break;
    }

    // ✅ EJ2 export API: exportImage(fileName, format)
    this.barcode.exportImage(filename, 'PNG');
  }

  getDateString(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
```

---

## Export Use Cases

### Use Case 1: E-commerce Product Export

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class ECommerceExportComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  product = {
    id: '123456',
    name: 'Widget Pro',
    sku: 'WGT-PRO-001'
  };

  generateProductBarcode() {
    this.barcode.value = this.product.sku;
    this.barcode.dataBind();

    const filename = `product-${this.product.id}-barcode`;
    this.barcode.exportImage(filename, 'PNG');
  }
}
```

### Use Case 2: Inventory Label Printing

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class InventoryLabelComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  printInventoryLabel(itemId: string) {
    const filename = `INV-${itemId}-${Date.now()}`;
    this.barcode.exportImage(filename, 'PNG');
    // Then print using window.print() or printer API
  }
}
``
```

### Use Case 3: QR Code Sharing

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class ShareQRComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  async shareQRCode() {
    // ✅ EJ2 Base64 export
    const base64 = this.barcode.exportAsBase64Image('PNG');

    // Share via Web Share API (if available)
    if (navigator.share) {
      await navigator.share({
        title: 'Event QR Code',
        text: 'Scan this to register for our event',
        files: [
          new File(
            [this.base64ToBlob(base64)],
            'event-qr.png',
            { type: 'image/png' }
          )
        ]
      });
    }
  }

  base64ToBlob(base64: string): Blob {
    const [header, data] = base64.split(',');
    const bstr = atob(data);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new Blob([u8arr], { type: 'image/png' });
  }
}
```

### Use Case 4: Database Storage

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class DatabaseStorageComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  constructor(private barcodeService: BarcodeService) {}

  saveBarcodeToDatabase(productId: string) {
    // ✅ EJ2 Base64 export
    const base64Image = this.barcode.exportAsBase64Image('PNG');

    this.barcodeService.saveBarcodeImage({
      productId: productId,
      imageData: base64Image,
      createdAt: new Date()
    }).subscribe(
      response => console.log('Saved successfully'),
      error => console.error('Save failed', error)
    );
  }
}
```

---

## Advanced Export Patterns

### Pattern 1: Batch Export Multiple Barcodes

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class BatchExportComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  products = [
    { sku: 'PROD-001', name: 'Widget' },
    { sku: 'PROD-002', name: 'Gadget' },
    { sku: 'PROD-003', name: 'Doohickey' }
  ];

  // Export all product barcodes as a ZIP would, or save to database
  async exportAllBarcodes() {
    const exportedBarcodes: Array<{
      sku: string;
      name: string;
      imageData: string;
      timestamp: Date;
    }> = [];

    for (const product of this.products) {
      // Update barcode value
      this.barcode.value = product.sku;
      this.barcode.dataBind();

      // Wait for render (optional but safe for batch operations)
      await this.sleep(200);

      // Get base64 (Data URL)
      const base64 = this.barcode.exportAsBase64Image('PNG');

      exportedBarcodes.push({
        sku: product.sku,
        name: product.name,
        imageData: base64,
        timestamp: new Date()
      });
    }

    // Save all to backend or storage
    return exportedBarcodes;
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Pattern 2: Email Integration with Embedded Barcode

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class EmailBarcodeComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  constructor(private emailService: EmailService) {}

  sendBarcodeEmail(toEmail: string, productInfo: any) {
    // Get barcode as base64 (Data URL)
    const barcodeImage = this.barcode.exportAsBase64Image('PNG');

    // Prepare email payload
    const emailPayload = {
      to: toEmail,
      subject: `Barcode for ${productInfo.name}`,
      htmlBody: `
        <h2>Product Barcode</h2>
        <p>Product: ${productInfo.name}</p>
        <p>SKU: ${productInfo.sku}</p>
        <img src="${barcodeImage}" alt="Product barcode" />
        <p>Scan this barcode to view product details.</p>
      `,
      attachments: [{
        filename: `barcode-${productInfo.sku}.png`,
        data: barcodeImage.split(',')[1], // Remove data:image/png;base64, prefix
        encoding: 'base64'
      }]
    };

    // Send to backend email service
    this.emailService.sendBarcodeEmail(emailPayload).subscribe(
      response => console.log('Email sent'),
      error => console.error('Email failed', error)
    );
  }
}
```

### Pattern 3: Print-Optimized Export

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class PrintOptimizedExportComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  printBarcode(quantity: number = 1) {
    // Create print window
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;

    let printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Barcode Print</title>
        <style>
          @media print {
            body { margin: 0; padding: 10mm; }
            .barcode-label {
              display: inline-block;
              margin: 5mm;
              padding: 10mm;
              border: 1px solid #ccc;
              page-break-inside: avoid;
            }
            img { max-width: 100%; height: auto; }
          }
        </style>
      </head>
      <body>
    `;

    // Generate a printable Data URL image
    const barcodeImage = this.barcode.exportAsBase64Image('PNG');

    for (let i = 0; i < quantity; i++) {
      printContent += `
        <div class="barcode-label">
          <p>Copy ${i + 1}</p>
          <img src="${barcodeImage}" alt="Barcode copy ${i + 1}" />
        </div>
      `;
    }

    printContent += `
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Trigger print after content loads
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
```

### Pattern 4: PDF Export with Multiple Barcodes

```typescript
import { ViewChild } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class PDFExportComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  // Note: Requires jsPDF and html2canvas libraries
  // npm install jspdf html2canvas

  async exportToPDF(products: any[]) {
    const jsPDF = (window as any).jsPDF;
    const html2canvas = (window as any).html2canvas;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let yPosition = 20;
    const pageWidth = pdf.internal.pageSize.getWidth();

    for (const product of products) {
      // Update and render barcode
      this.barcode.value = product.sku;
      this.barcode.dataBind();
      await this.sleep(200);

      // Prefer the rendered SVG (default render mode is SVG)
      const barcodeElement = document.querySelector('ejs-barcodegenerator svg');
      const canvas = await html2canvas(barcodeElement as HTMLElement);
      const imgData = canvas.toDataURL('image/png');

      // Add to PDF
      pdf.addImage(imgData, 'PNG', 20, yPosition, 80, 60);
      pdf.text(`SKU: ${product.sku}`, pageWidth - 40, yPosition + 10);
      pdf.text(`${product.name}`, 20, yPosition + 65);

      yPosition += 80;

      // New page if needed
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }
    }

    pdf.save('barcodes.pdf');
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Pattern 5: API Upload with Metadata

```typescript
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class APIUploadExportComponent {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  constructor(private http: HttpClient) {}

  async uploadBarcodeWithMetadata(productId: string, metadata: any) {
    // Get barcode image as Data URL
    const barcodeImage = this.barcode.exportAsBase64Image('PNG');

    // Prepare FormData for multipart upload
    const formData = new FormData();

    // Add image as blob
    const blob = this.dataURLToBlob(barcodeImage);
    formData.append('barcode_image', blob, `barcode-${productId}.png`);

    // Add metadata
    formData.append('product_id', productId);
    formData.append('barcode_value', this.barcode.value);
    formData.append('generated_at', new Date().toISOString());
    formData.append('metadata', JSON.stringify(metadata));

    // Upload to API
    return this.http.post('/api/barcodes/upload', formData).toPromise();
  }

  private dataURLToBlob(dataURL: string): Blob {
    const parts = dataURL.split(';base64,');
    const bstr = atob(parts[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new Blob([u8arr], { type: 'image/png' });
  }

  constructor(private http: HttpClient) {}
}
```

---

## Backend Integration

### Store & Retrieve Barcodes

```typescript
import { HttpClient } from '@angular/common/http';

// Angular Service
export class BarcodeService {
  constructor(private http: HttpClient) {}

  saveBarcodeImage(data: {
    productId: string;
    imageData: string;
    createdAt: Date;
  }) {
    return this.http.post('/api/barcodes', data);
  }

  getBarcodeImage(productId: string) {
    return this.http.get(`/api/barcodes/${productId}`);
  }

  exportMultiple(productIds: string[]) {
    return this.http.post('/api/barcodes/batch-export', {
      productIds: productIds
    });
  }
}
```

### Embed in Email

```typescript
// Generate QR code as base64, embed in HTML email
const emailBody = `
  <h1>Order Confirmation</h1>
  <p>Track your order:</p>
  <img src="${base64QRCode}" alt="Tracking QR Code" />
`;

// Send via backend email service
this.emailService.sendEmail({
  to: 'customer@example.com',
  subject: 'Your Order',
  htmlBody: emailBody
});
```

---

## Next Steps

- For linear barcodes, see [linear-barcodes.md](linear-barcodes.md)
- For QR codes, see [qr-codes.md](qr-codes.md)
- For Data Matrix, see [data-matrix-barcodes.md](data-matrix-barcodes.md)
- To customize appearance, see [customization.md](customization.md)
