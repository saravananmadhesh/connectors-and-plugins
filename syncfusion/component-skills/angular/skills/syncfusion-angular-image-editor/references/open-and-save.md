# Open and Save in Angular Image Editor

## Table of Contents
- [Supported Formats](#supported-formats)
- [Opening Images](#opening-images)
- [Saving Images](#saving-images)
- [Open/Save Events](#opensave-events)
- [Advanced Options](#advanced-options)

---

## Supported Formats

The Image Editor supports: **PNG, JPEG, SVG, WEBP, BMP**

- **Default save format**: PNG
- **Recommended web formats**: PNG, WEBP (best compression)
- **Photo format**: JPEG (with quality control)

---

## Opening Images

### From Local File Path

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-open-save',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="openLocalImage()">Open Image</button>
  `
})
export class OpenSaveComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  openLocalImage() {
    this.imageEditor?.open('path/to/image.png');
  }
}
```

### From Base64 String

```typescript
openBase64Image() {
  const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...';
  this.imageEditor?.open(base64String);
}
```

### From File Uploader

```typescript
@Component({
  template: `
    <input type="file" #fileInput (change)="onFileSelected($event)">
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
  `
})
export class FileUploaderComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      this.imageEditor?.open(e.target.result);
    };
    
    reader.readAsDataURL(file);
  }
}
```

### From Blob Storage

```typescript
openFromBlob(blob: Blob) {
  const blobUrl = URL.createObjectURL(blob);
  this.imageEditor?.open(blobUrl);
}
```

### Opening Images from Different Sources

The `open()` method accepts:
- **URL path**: `'path/to/image.png'`
- **Base64 string**: `'data:image/png;base64,...'`
- **ImageData object**: ImageData from canvas

---

## Saving Images

### Export to File

```typescript
exportImage() {
  this.imageEditor?.export('edited-image', 'png');
}

exportAsJpeg() {
  this.imageEditor?.export('photo', 'jpeg', 90); // 90% quality
}

exportAsWebp() {
  this.imageEditor?.export('optimized', 'webp');
}
```

### Save as Base64

```typescript
saveAsBase64() {
  this.imageEditor?.getImageData()
    .then((data: any) => {
      console.log('Base64 String:', data);
      // Send to server or store
    });
}
```

### Save as Blob

```typescript
saveAsBlob() {
  this.imageEditor?.getImageData()
    .then((dataUrl: any) => {
      // Convert data URL to blob
      fetch(dataUrl)
        .then(response => response.blob())
        .then(blob => {
          // Upload to server or save
          this.uploadToServer(blob);
        });
    });
}

uploadToServer(blob: Blob) {
  const formData = new FormData();
  formData.append('image', blob, 'edited-image.png');
  
  // POST to server
  fetch('/api/upload', { method: 'POST', body: formData });
}
```

### Save as Byte Array

```typescript
saveAsByteArray() {
  this.imageEditor?.getImageData()
    .then((dataUrl: any) => {
      // Convert to byte array
      const bytes = new Uint8Array(/* ... */);
      // Send to server for storage
    });
}
```

### Keyboard Shortcut

```
Ctrl + S  →  Download in original format
```

---

## Open/Save Events

### File Opened Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [fileOpened]="onFileOpened"
    ></ejs-imageeditor>
  `
})
export class FileOpenedEventComponent {
  onFileOpened(args: any) {
    console.log('File Name:', args.fileName);
    console.log('File Type:', args.fileType);
    
    // Add watermark automatically
    // this.addWatermark();
  }
}
```

### Before Save Event

The `beforeSave` event is triggered before saving the image:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [beforeSave]="onBeforeSave"
    ></ejs-imageeditor>
  `
})
export class BeforeSaveComponent {
  onBeforeSave(args: any) {
    console.log('Before saving image');
    
    // Validate before save
    if (!this.validateImage()) {
      args.cancel = true;
    }
  }

  validateImage() {
    // Your validation logic
    return true;
  }
}
```

### Saved Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [saved]="onSaved"
    ></ejs-imageeditor>
  `
})
export class SavedEventComponent {
  onSaved(args: any) {
    console.log('Image saved successfully');
  }
}
```

### Created Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [created]="onCreated"
    ></ejs-imageeditor>
  `
})
export class CreatedEventComponent {
  onCreated() {
    console.log('Image Editor ready');
    // Load default image or initialize
  }
}
```

### Destroyed Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [destroyed]="onDestroyed"
    ></ejs-imageeditor>
  `
})
export class DestroyedEventComponent {
  onDestroyed() {
    console.log('Image Editor destroyed');
    // Cleanup resources
  }
}
```

---

## Advanced Options

### Add Watermark While Opening

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [fileOpened]="addWatermark"
    ></ejs-imageeditor>
    <button (click)="loadImage()">Load</button>
  `
})
export class WatermarkComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  loadImage() {
    this.imageEditor?.open('image.png');
  }

  addWatermark() {
    // Text watermark
    this.imageEditor?.drawText(
      50, 50,
      '© 2024 My Company',
      'Arial', 20, false, false, '#FFFFFF'
    );
  }
}
```

### Custom Save Workflow

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      #imageEditor
      [toolbar]="['Open', 'Save']"
      [beforeSave]="onBeforeSave"
    ></ejs-imageeditor>
  `
})
export class CustomSaveComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  onBeforeSave(args: any) {
    args.cancel = true; // Prevent default download

    this.imageEditor?.getImageData()
      .then((data: any) => {
        // Custom save logic - upload to server
        const filename = prompt('Enter filename:', 'image');
        if (filename) {
          this.uploadImage(data, filename);
        }
      });
  }

  uploadImage(imageData: any, filename: string) {
    // Send to server
    console.log('Uploading:', filename);
  }
}
```

### Multiple Format Export

```typescript
@Component({
  template: `
    <button (click)="exportPNG()">PNG</button>
    <button (click)="exportJPEG()">JPEG</button>
    <button (click)="exportSVG()">SVG</button>
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
  `
})
export class MultiFormatComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  exportPNG() {
    this.imageEditor?.export('image', 'png');
  }

  exportJPEG() {
    this.imageEditor?.export('photo', 'jpeg', 85);
  }

  exportSVG() {
    this.imageEditor?.export('vector', 'svg');
  }
}
```

### Quality Control for JPEG

```typescript
saveJpegWithQuality(quality: number) {
  // Quality: 0-100
  // 100 = highest quality (larger file)
  // 50 = medium quality (balanced)
  // 10 = low quality (smallest file)
  
  this.imageEditor?.export('photo', 'jpeg', quality);
}

// Examples:
exportHighQuality() {
  this.saveJpegWithQuality(95); // Professional
}

exportBalanced() {
  this.saveJpegWithQuality(75); // Web standard
}

exportCompressed() {
  this.saveJpegWithQuality(50); // Email/mobile
}
```

### Batch Operations

```typescript
@Component({
  selector: 'app-batch-processor',
  template: `
    <button (click)="processMultiple()">Process Images</button>
  `
})
export class BatchProcessorComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  
  images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

  async processMultiple() {
    for (const img of this.images) {
      await this.processImage(img);
    }
  }

  processImage(imagePath: string): Promise<void> {
    return new Promise((resolve) => {
      this.imageEditor?.open(imagePath);
      
      setTimeout(() => {
        // Apply edits
        this.imageEditor?.rotate(90);
        this.imageEditor?.applyImageFilter('Warm');
        
        // Save
        this.imageEditor?.export(`edited-${imagePath}`, 'png');
        
        resolve();
      }, 500);
    });
  }
}
```

---

## Complete Example: Full Workflow

```typescript
@Component({
  selector: 'app-image-editor-full',
  template: `
    <div style="padding: 20px;">
      <input type="file" #fileInput (change)="onFileSelected($event)">
      <button (click)="saveToPng()">Save PNG</button>
      <button (click)="saveToJpeg()">Save JPEG</button>
      <button (click)="saveBase64()">Copy Base64</button>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor 
          #imageEditor
          [fileOpened]="onFileOpened"
        ></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class FullWorkflowComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      this.imageEditor?.open(e.target.result);
    };
    
    reader.readAsDataURL(file);
  }

  onFileOpened(args: any) {
    console.log('Loaded:', args.fileName);
  }

  saveToPng() {
    this.imageEditor?.export('edited-image', 'png');
  }

  saveToJpeg() {
    this.imageEditor?.export('photo', 'jpeg', 90);
  }

  saveBase64() {
    this.imageEditor?.getImageData()
      .then((data: any) => {
        // Copy to clipboard
        navigator.clipboard.writeText(data);
        alert('Base64 copied to clipboard');
      });
  }
}
```

---

## Edge Cases & Troubleshooting

**Issue:** Image won't open
- **Solution:** Verify file format is supported; check CORS for remote URLs

**Issue:** Save dialog doesn't appear
- **Solution:** Ensure browser allows downloads; check popup/save permissions

**Issue:** Base64 string is huge
- **Solution:** Use WEBP format for better compression; reduce image dimensions

**Issue:** Quality loss in JPEG export
- **Solution:** Increase quality parameter (closer to 100); consider PNG for lossless
