# File Validation — Syncfusion Angular Uploader

## Table of Contents
- [File Type Validation](#file-type-validation)
- [File Size Validation](#file-size-validation)
- [Maximum Files Count](#maximum-files-count)
- [Prevent Duplicate Files](#prevent-duplicate-files)
- [MIME Type Validation Before Upload](#mime-type-validation-before-upload)
- [Validate Images on Drag-and-Drop](#validate-images-on-drag-and-drop)
- [Required File Input Validation](#required-file-input-validation)

---

## File Type Validation

Use `allowedExtensions` to restrict uploads to specific file types. Provide comma-separated extensions:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      allowedExtensions=".jpg,.jpeg,.png,.gif,.webp">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };
}
```

**Common extension groups:**
```typescript
// Images
allowedExtensions=".jpg,.jpeg,.png,.gif,.bmp,.webp,.svg"

// Documents
allowedExtensions=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"

// Archives
allowedExtensions=".zip,.rar,.7z,.tar,.gz"

// Videos
allowedExtensions=".mp4,.avi,.mov,.wmv,.mkv"
```

> The `accept` HTML attribute on the input element also enables type validation:
> ```html
> <ejs-uploader [htmlAttributes]="{ accept: '.jpg,.png' }"></ejs-uploader>
> ```

---

## File Size Validation

Use `minFileSize` and `maxFileSize` (in bytes) to prevent uploads of files that are too small or too large:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      [minFileSize]="1024"
      [maxFileSize]="5242880">
    </ejs-uploader>
  `
  // minFileSize: 1 KB  |  maxFileSize: 5 MB
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };
}
```

**Size reference:**
```
1 KB  = 1,024 bytes
1 MB  = 1,048,576 bytes
5 MB  = 5,242,880 bytes
10 MB = 10,485,760 bytes
25 MB = 26,214,400 bytes
30 MB = 31,457,280 bytes (default max)
```

| Property | Default | Description |
|----------|---------|-------------|
| `minFileSize` | `0` | Minimum file size in bytes (0 = no minimum) |
| `maxFileSize` | `30000000` | Maximum file size in bytes (~28.6 MB) |

---

## Maximum Files Count

Limit the number of files that can be queued using the `selected` event. Modify `eventArgs.modifiedFilesData` to enforce the limit:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { SelectedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      [autoUpload]="false"
      (selected)="onFilesSelected($event)">
    </ejs-uploader>
    <p *ngIf="limitExceeded" style="color: red;">Maximum 5 files allowed.</p>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  public limitExceeded = false;
  private readonly MAX_FILES = 5;

  onFilesSelected(args: SelectedEventArgs): void {
    // getFilesData() returns currently queued files
    // args.filesData contains newly selected files
    const currentCount = args.filesData.length;
    if (currentCount > this.MAX_FILES) {
      this.limitExceeded = true;
      // Keep only the first MAX_FILES items
      args.modifiedFilesData = args.filesData.splice(0, this.MAX_FILES);
      args.isModified = true;
    } else {
      this.limitExceeded = false;
    }
  }
}
```

---

## Prevent Duplicate Files

Use the `selected` event to compare newly selected files against the existing file list and remove duplicates:

```typescript
import { Component, ViewChild } from '@angular/core';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { SelectedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      #uploader
      [asyncSettings]="asyncSettings"
      (selected)="onFilesSelected($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  onFilesSelected(args: SelectedEventArgs): void {
    // Get already-queued files
    const existingFiles = this.uploader.getFilesData();
    const existingNames = new Set(existingFiles.map(f => f.name));

    // Filter out duplicates from newly selected files
    args.modifiedFilesData = args.filesData.filter(
      newFile => !existingNames.has(newFile.name)
    );
    args.isModified = true;

    const duplicateCount = args.filesData.length - args.modifiedFilesData.length;
    if (duplicateCount > 0) {
      console.warn(`${duplicateCount} duplicate file(s) were skipped.`);
    }
  }
}
```

---

## MIME Type Validation Before Upload

Use the `uploading` event to inspect the file MIME type before the upload request is sent to the server:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      (uploading)="onFileUploading($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  // Allowed MIME types
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

  onFileUploading(args: any): void {
    const file: File = args.fileData.rawFile as File;
    const mimeType = file.type;

    if (!this.ALLOWED_TYPES.includes(mimeType)) {
      // Cancel the upload for invalid MIME types
      args.cancel = true;
      alert(`File type "${mimeType}" is not allowed.`);
    }
  }
}
```

---

## Validate Images on Drag-and-Drop

`allowedExtensions` applies when browsing files, but drag-and-drop validation requires manual filtering via the `selected` event:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { SelectedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      allowedExtensions=".jpg,.jpeg,.png,.bmp,.gif,.tiff"
      (selected)="onFilesSelected($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  // Accepted image MIME types
  private readonly ALLOWED_MIME_PREFIXES = ['image/'];

  onFilesSelected(args: SelectedEventArgs): void {
    // Filter out non-image files dropped by user
    const imageFiles = args.filesData.filter(file => {
      const rawFile = file.rawFile as File;
      return rawFile && this.ALLOWED_MIME_PREFIXES.some(prefix =>
        rawFile.type.startsWith(prefix)
      );
    });

    if (imageFiles.length !== args.filesData.length) {
      args.modifiedFilesData = imageFiles;
      args.isModified = true;
    }
  }
}
```

---

## Required File Input Validation

Mark the uploader as required using the `required` HTML attribute. Use `data-required-message` to provide a custom validation error message:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <form id="uploadForm" (ngSubmit)="onSubmit()">
      <ejs-uploader
        [asyncSettings]="asyncSettings"
        [autoUpload]="false"
        [htmlAttributes]="{ required: 'true', 'data-required-message': 'Please select a file to upload.' }">
      </ejs-uploader>
      <button type="submit">Submit</button>
    </form>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  onSubmit(): void {
    console.log('Form submitted');
  }
}
```

> For form-based required validation with ngModel or FormGroup, see the **Form Integration** reference.
