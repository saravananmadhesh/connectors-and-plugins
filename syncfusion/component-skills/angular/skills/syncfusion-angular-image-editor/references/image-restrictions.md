# Image Restrictions in Angular Image Editor

Validate uploaded images by file type and size.

## Allowed File Extensions

```typescript
import { Component } from '@angular/core';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-restrictions',
  template: `
    <ejs-imageeditor 
      [uploadSettings]="uploadSettings"
    ></ejs-imageeditor>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class RestrictionsComponent {
  uploadSettings = {
    allowedExtensions: '.jpg,.png,.svg,.webp,.bmp'
  };
}
```

## File Size Restrictions

```typescript
uploadSettings = {
  minFileSize: 1024,        // 1 KB minimum
  maxFileSize: 5242880      // 5 MB maximum
};
```

## Combined Restrictions

```typescript
uploadSettings = {
  allowedExtensions: '.jpg,.png,.svg',
  minFileSize: 512,         // 512 bytes
  maxFileSize: 2097152      // 2 MB
};
```

## Validation Error Handling

```typescript
@Component({
  template: `
    <input type="file" #fileInput (change)="onFileSelected($event)">
    <p *ngIf="validationError" style="color: red;">{{ validationError }}</p>
    <ejs-imageeditor [uploadSettings]="uploadSettings"></ejs-imageeditor>
  `
})
export class ValidationComponent {
  validationError = '';
  uploadSettings = {
    allowedExtensions: '.jpg,.png',
    maxFileSize: 1048576  // 1 MB
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    // Check extension
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!this.uploadSettings.allowedExtensions.includes(ext)) {
      this.validationError = `File type not allowed. Use: ${this.uploadSettings.allowedExtensions}`;
      return;
    }
    
    // Check size
    if (file.size > this.uploadSettings.maxFileSize) {
      this.validationError = `File too large. Max: 1 MB`;
      return;
    }
    
    this.validationError = '';
  }
}
```

## Default Restrictions

If not specified, defaults allow:
- Extensions: `.jpg, .png, .svg, .webp, .bmp`
- Size: Unlimited

## Complete Example

```typescript
@Component({
  selector: 'app-image-validator',
  template: `
    <div style="padding: 20px;">
      <input 
        type="file" 
        #fileInput 
        (change)="onFileSelected($event)"
        accept=".jpg,.jpeg,.png,.svg,.webp,.bmp"
      >
      <p *ngIf="validationError" style="color: red; font-weight: bold;">
        ❌ {{ validationError }}
      </p>
      <p *ngIf="validationSuccess" style="color: green;">
        ✓ File validated and ready
      </p>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor 
          #imageEditor
          [uploadSettings]="uploadSettings"
        ></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class ImageValidatorComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  validationError = '';
  validationSuccess = false;
  
  uploadSettings = {
    allowedExtensions: '.jpg,.jpeg,.png,.svg,.webp,.bmp',
    minFileSize: 1024,           // 1 KB
    maxFileSize: 10485760        // 10 MB
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.validationError = '';
    this.validationSuccess = false;

    // Check extension
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!this.uploadSettings.allowedExtensions.includes(ext)) {
      this.validationError = `Invalid file type. Allowed: JPG, PNG, SVG, WEBP, BMP`;
      return;
    }

    // Check size
    if (file.size < this.uploadSettings.minFileSize) {
      this.validationError = `File too small. Minimum: 1 KB`;
      return;
    }

    if (file.size > this.uploadSettings.maxFileSize) {
      this.validationError = `File too large. Maximum: 10 MB`;
      return;
    }

    // Load validated image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageEditor?.open(e.target.result);
      this.validationSuccess = true;
    };
    reader.readAsDataURL(file);
  }
}
```

## Best Practices

1. **Set realistic limits** - 5-20 MB typical for web
2. **Warn users clearly** - Display supported formats
3. **Allow common formats** - JPG, PNG minimum
4. **Compress before save** - Use WEBP format
5. **Test with edge cases** - Very small/large files

## Edge Cases

**Issue:** Base64 images bypass extension check
- **Solution:** Validate file size still applies; check MIME type in base64 string

**Issue:** SVG files rejected despite allowance
- **Solution:** Ensure .svg extension allowed; check content-type header
