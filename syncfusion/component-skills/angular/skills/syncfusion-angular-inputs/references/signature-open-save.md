# Opening and Saving Signatures

## Table of Contents
- [Overview](#overview)
- [Open/Load Signatures](#openload-signatures)
- [Save as Base64](#save-as-base64)
- [Save as Blob](#save-as-blob)
- [Save as Image File](#save-as-image-file)
- [Save With Background](#save-with-background)
- [Complete Save/Load Example](#complete-saveload-example)

## Overview

The Signature component supports opening pre-drawn signatures and saving in multiple formats:

- **Load:** Open signatures from Base64 or URLs
- **Save as Base64:** Export for storage and reload
- **Save as Blob:** Export for database storage
- **Save as Image:** Download PNG, JPEG, or SVG files
- **Save with Background:** Option to include/exclude background

## Open/Load Signatures

### Load Method

Load a pre-drawn signature using the `load()` method:

```typescript
load(signature: string, width?: number, height?: number): void
```

### Parameters

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `signature` | string | Required | Base64-encoded image or hosted/online URL |
| `width` | number | Yes | Width of loaded signature |
| `height` | number | Yes | Height of loaded signature |

### Supported Formats

- **PNG Base64**
- **JPEG Base64**
- **SVG Base64**
- **Hosted URLs** (PNG, JPEG, SVG)

### Basic Load Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-load-signature',
  template: `
    <div class="e-section-control">
      <div id="input">
        <input 
          type="text" 
          id="signatureInput"
          placeholder="Enter Base64 or URL of signature">
        <button ejs-button cssClass="e-primary" (click)="openSignature()">
          Load Signature
        </button>
      </div>
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    #input {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    input {
      flex: 1;
      min-width: 200px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    button {
      padding: 8px 16px;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
    }
  `]
})
export class LoadSignatureComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  openSignature(): void {
    const sign = (document.getElementById('signatureInput') as HTMLInputElement).value;
    try {
      this.signature?.load(sign);
    } catch (error) {
      alert('Invalid signature format. Please enter valid Base64 or URL.');
    }
  }
}
```

### Load from URL

```typescript
loadFromUrl(): void {
  const url = 'https://example.com/signatures/john-doe.png';
  this.signature?.load(url);
}
```

## Save as Base64

### getSignature Method

Export the signature as a Base64 string:

```typescript
getSignature(): string
```

**Returns:** Base64-encoded image string

**Use Case:** Store in database, transfer via API, or reload later with `load()` method.

### Save as Base64 Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@Component({
  imports: [SignatureModule, ButtonModule, DialogModule],
  standalone: true,
  selector: 'app-save-base64',
  template: `
    <div class="e-section-control">
      <h4>Sign here</h4>
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature">
        </canvas>
      </div>
      <button ejs-button cssClass="e-primary" (click)="onSave()">
        Save as Base64
      </button>
      
      <ejs-dialog 
        #dialog 
        header="Base64 of the Signature" 
        [animationSettings]="animationSettings"
        showCloseIcon="true"
        width="80%"
        [visible]="false">
      </ejs-dialog>
    </div>
  `,
  styles: [`
    #signature-control {
      margin-bottom: 20px;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
      margin-bottom: 15px;
    }
    
    button {
      padding: 8px 16px;
    }
  `]
})
export class SaveBase64Component {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  @ViewChild('dialog')
  public dialog?: any;

  public animationSettings: any = { effect: 'Zoom', duration: 400 };

  onSave(): void {
    if (this.signature?.isEmpty()) {
      alert('Please draw a signature first');
      return;
    }
    
    const base64String = this.signature?.getSignature();
    this.dialog.content = `<textarea style="width: 100%; height: 300px;">${base64String}</textarea>`;
    this.dialog.show();
  }
}
```

### Using Base64 with Database

```typescript
async saveSignatureToDatabase(): Promise<void> {
  const base64 = this.signature?.getSignature();
  
  try {
    const response = await fetch('/api/signatures/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.userId,
        signature: base64,
        timestamp: new Date()
      })
    });
    
    if (response.ok) {
      alert('Signature saved successfully');
    }
  } catch (error) {
    console.error('Error saving signature:', error);
  }
}
```

## Save as Blob

### saveAsBlob Method

Export the signature as binary blob data:

```typescript
saveAsBlob(): Blob
```

**Returns:** Blob object for database storage or file upload

**Use Case:** Direct database storage, file uploads, or API transmission.

### Save as Blob Example

```typescript
saveSignatureAsBlob(): void {
  const blob = this.signature?.saveAsBlob();
  
  // Send to server
  const formData = new FormData();
  formData.append('signature', blob as Blob, 'signature.png');
  
  fetch('/api/upload-signature', {
    method: 'POST',
    body: formData
  });
}
```

### getBlob Method with URL

```typescript
getBlob(url?: string): Blob
```

Get blob from a specific URL or base64 string.

## Save as Image File

### save Method

Download the signature as an image file:

```typescript
save(type?: SignatureFileType, fileName?: string): void
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | SignatureFileType | "Png" | File format: "Png", "Jpeg", "Svg" |
| `fileName` | string | "Signature" | Downloaded file name |

### Supported File Types

| Type | Format | Use Case |
|------|--------|----------|
| **Png** | PNG (lossless) | Default, best for signatures |
| **Jpeg** | JPEG (lossy) | Smaller file size, web-friendly |
| **Svg** | SVG (scalable) | Vector format, scalable quality |

### Save as Image Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { SignatureFileType } from '@syncfusion/ej2-inputs';

@Component({
  imports: [SignatureModule, SplitButtonModule],
  standalone: true,
  selector: 'app-save-image',
  template: `
    <div class="e-section-control">
      <div>
        <span>Sign here</span>
        <ejs-splitbutton 
          content="Save" 
          [items]="items" 
          iconCss="e-sign-icons e-save"
          (select)="onSelect($event)">
        </ejs-splitbutton>
      </div>
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
    }
  `]
})
export class SaveImageComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  public items: ItemModel[] = [
    { text: 'Png' },
    { text: 'Jpeg' },
    { text: 'Svg' }
  ];

  onSelect(args: MenuEventArgs): void {
    const fileType = args.item.text as SignatureFileType;
    this.signature?.save(fileType, 'MySignature');
  }
}
```

## Save With Background

### saveWithBackground Property

Control whether background is included when saving:

```typescript
saveWithBackground: boolean  // Default: true
```

When `true`: Background color/image is included in the saved file  
When `false`: Only the signature strokes are saved (transparent background)

### Example with Purple Background

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { SignatureFileType } from '@syncfusion/ej2-inputs';

@Component({
  imports: [SignatureModule, SplitButtonModule],
  standalone: true,
  selector: 'app-save-with-bg',
  template: `
    <div class="e-section-control">
      <div>
        <span>Sign here (Purple Background)</span>
        <ejs-splitbutton 
          content="Save" 
          [items]="items" 
          iconCss="e-sign-icons e-save"
          (select)="onSelect($event)">
        </ejs-splitbutton>
      </div>
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature"
          backgroundColor="rgb(103, 58, 183)"
          [saveWithBackground]="true"
          style="border: 2px solid rgb(103, 58, 183);">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    canvas {
      height: 400px;
      width: 100%;
    }
  `]
})
export class SaveWithBgComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  public items: ItemModel[] = [
    { text: 'Png' },
    { text: 'Jpeg' },
    { text: 'Svg' }
  ];

  onSelect(args: MenuEventArgs): void {
    const fileType = args.item.text as SignatureFileType;
    this.signature?.save(fileType, 'Signature');
  }
}
```

### Toggling Background in Save

```typescript
toggleSaveWithBackground(includeBackground: boolean): void {
  this.signature!.saveWithBackground = includeBackground;
}
```

## Complete Save/Load Example

Full workflow with save and load functionality:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-complete-flow',
  template: `
    <div class="e-section-control">
      <div id="controls">
        <div>
          <h4>Signature 1: Create & Save</h4>
          <canvas 
            ejs-signature 
            #sig1 
            id="signature1"
            style="border: 1px solid #ccc; height: 300px; width: 100%;">
          </canvas>
          <div style="margin-top: 10px;">
            <button ejs-button cssClass="e-primary" (click)="saveSignature1()">
              Save Signature 1
            </button>
          </div>
        </div>
        
        <div>
          <h4>Signature 2: Load Saved</h4>
          <canvas 
            ejs-signature 
            #sig2 
            id="signature2"
            style="border: 1px solid #ccc; height: 300px; width: 100%;">
          </canvas>
          <div style="margin-top: 10px;">
            <button ejs-button cssClass="e-success" (click)="loadSignature2()">
              Load Signature 1 into Signature 2
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .e-section-control {
      padding: 20px;
    }
    
    #controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    @media (max-width: 768px) {
      #controls {
        grid-template-columns: 1fr;
      }
    }
    
    h4 {
      margin-top: 0;
    }
    
    button {
      width: 100%;
      padding: 10px;
    }
  `]
})
export class CompleteSaveLoadComponent {
  @ViewChild('sig1')
  public sig1?: SignatureComponent;

  @ViewChild('sig2')
  public sig2?: SignatureComponent;

  private savedSignature: string = '';

  saveSignature1(): void {
    if (this.sig1?.isEmpty()) {
      alert('Please draw a signature in Signature 1');
      return;
    }
    
    this.savedSignature = this.sig1?.getSignature() || '';
    alert('Signature 1 saved! Now load it into Signature 2.');
  }

  loadSignature2(): void {
    if (!this.savedSignature) {
      alert('Please save Signature 1 first');
      return;
    }
    
    this.sig2?.load(this.savedSignature);
    alert('Signature loaded into Signature 2');
  }
}
```

## Best Practices

1. **Always validate before save:** Check `isEmpty()` before saving
2. **Handle load errors:** Wrap `load()` in try-catch for invalid inputs
3. **Choose format wisely:**
   - PNG: Maximum quality, best for professional documents
   - JPEG: Smaller file size, web-friendly
   - SVG: Scalable vector format
4. **Persist with background:** Use `saveWithBackground` for consistent appearance
5. **Database storage:** Use Base64 for easy storage and retrieval
6. **File uploads:** Use Blob for direct API uploads
