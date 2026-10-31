# Templates & Custom UI — Syncfusion Angular Uploader

## Table of Contents
- [File List Template](#file-list-template)
- [Custom Upload UI (Hide Default List)](#custom-upload-ui-hide-default-list)
- [Customize Action Buttons](#customize-action-buttons)
- [Customize the Progress Bar](#customize-the-progress-bar)
- [Preview Images Before Uploading](#preview-images-before-uploading)
- [Resize Images Before Uploading](#resize-images-before-uploading)

---

## File List Template

Use the `template` property to customize how each file appears in the file list. You can provide an HTML string or use Angular's template approach.

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
      [template]="fileListTemplate">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  // HTML string template for each file item
  public fileListTemplate: string = `
    <span class="wrapper">
      <span class="icon sf-icon-\${type}"></span>
      <span class="name">\${name}</span>
    </span>
    <span class="file-size-td file-size">\${size}</span>
    <span class="e-icons e-file-delete-btn" title="Remove"></span>
  `;
}
```

> When using a template, remove and progress bar actions must be handled through corresponding events (`removing`, `progress`) since the default UI elements are replaced.

---

## Custom Upload UI (Hide Default List)

Build a completely custom upload interface by:
1. Setting `showFileList="false"` to hide the default file list
2. Handling file events to build your own UI
3. Calling `upload()` and `remove()` with `true` as the second argument to indicate custom UI

```typescript
import { Component, ViewChild } from '@angular/core';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { SelectedEventArgs, FileInfo } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="uploader-wrapper">
      <!-- Hidden uploader, no default file list -->
      <ejs-uploader
        #uploader
        [asyncSettings]="asyncSettings"
        [showFileList]="false"
        [autoUpload]="false"
        (selected)="onFilesSelected($event)"
        (success)="onUploadSuccess($event)"
        (failure)="onUploadFailure($event)">
      </ejs-uploader>

      <!-- Custom file list -->
      <ul class="custom-file-list">
        <li *ngFor="let file of selectedFiles" class="file-item">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ getFileSize(file.size) }}</span>
          <span class="file-status">{{ file.status }}</span>
          <button (click)="removeFile(file)">✕</button>
        </li>
      </ul>

      <!-- Custom action buttons -->
      <button (click)="uploadAll()" [disabled]="selectedFiles.length === 0">
        Upload All
      </button>
      <button (click)="clearAll()">Clear</button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  public selectedFiles: FileInfo[] = [];

  onFilesSelected(args: SelectedEventArgs): void {
    this.selectedFiles = this.selectedFiles.concat(args.filesData);
  }

  onUploadSuccess(args: any): void {
    const fileIndex = this.selectedFiles.findIndex(f => f.name === args.file.name);
    if (fileIndex > -1 && args.operation === 'upload') {
      this.selectedFiles[fileIndex].status = 'Uploaded';
    }
  }

  onUploadFailure(args: any): void {
    const fileIndex = this.selectedFiles.findIndex(f => f.name === args.file.name);
    if (fileIndex > -1) {
      this.selectedFiles[fileIndex].status = 'Failed';
    }
  }

  uploadAll(): void {
    // Pass true as second arg to indicate custom UI
    this.uploader.upload(this.selectedFiles, true);
  }

  removeFile(file: FileInfo): void {
    // Pass true as second arg to indicate custom UI
    this.uploader.remove(file, true);
    this.selectedFiles = this.selectedFiles.filter(f => f.name !== file.name);
  }

  clearAll(): void {
    this.uploader.clearAll();
    this.selectedFiles = [];
  }

  getFileSize(bytes: number): string {
    return this.uploader.bytesToSize(bytes);
  }
}
```

---

## Customize Action Buttons

Use the `buttons` property to provide custom text or HTML elements for the browse, clear, and upload buttons:

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
      [autoUpload]="false"
      [buttons]="customButtons">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  // Plain text customization
  public customButtons = {
    browse: 'Choose Files',
    clear: 'Remove All',
    upload: 'Send to Server'
  };
}
```

**Using HTML elements for buttons:**
```typescript
import { Component, OnInit } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      [autoUpload]="false"
      [buttons]="htmlButtons">
    </ejs-uploader>
  `
})
export class AppComponent implements OnInit {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  public htmlButtons: any = {};

  ngOnInit(): void {
    // Create HTML elements for buttons
    const browseElem = document.createElement('span');
    browseElem.innerHTML = '📁 Browse';

    const uploadElem = document.createElement('span');
    uploadElem.innerHTML = '⬆️ Upload';

    const clearElem = document.createElement('span');
    clearElem.innerHTML = '🗑️ Clear';

    this.htmlButtons = {
      browse: browseElem,
      upload: uploadElem,
      clear: clearElem
    };
  }
}
```

---

## Customize the Progress Bar

Override Uploader CSS to customize the upload progress bar appearance:

```css
/* Custom progress bar height and color */
.e-upload .e-upload-files .e-upload-file-list .e-file-container .e-progress-bar-container {
  height: 6px;
  background-color: #e0e0e0;
}

.e-upload .e-upload-files .e-upload-file-list .e-file-container .e-progress-bar {
  background-color: #4caf50;  /* Green progress */
  height: 6px;
}
```

In Angular with `ViewEncapsulation.None` or `::ng-deep`:
```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `<ejs-uploader [asyncSettings]="asyncSettings"></ejs-uploader>`,
  styles: [`
    .e-upload .e-progress-bar-container {
      height: 8px;
      border-radius: 4px;
    }
    .e-upload .e-progress-bar {
      background-color: #007bff;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };
}
```

---

## Preview Images Before Uploading

Display thumbnails of selected images before they are uploaded using the `selected` event and `FileReader`:

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
      allowedExtensions=".jpg,.jpeg,.png,.gif,.webp"
      (selected)="onFilesSelected($event)">
    </ejs-uploader>

    <div class="preview-container">
      <div *ngFor="let preview of imagePreviews" class="preview-item">
        <img [src]="preview.dataUrl" [alt]="preview.name" width="120" height="120" style="object-fit:cover;">
        <span>{{ preview.name }}</span>
      </div>
    </div>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  public imagePreviews: Array<{ name: string; dataUrl: string }> = [];

  onFilesSelected(args: SelectedEventArgs): void {
    args.filesData.forEach(fileInfo => {
      const rawFile = fileInfo.rawFile as File;
      if (rawFile && rawFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push({
            name: fileInfo.name,
            dataUrl: e.target.result
          });
        };
        reader.readAsDataURL(rawFile);
      }
    });
  }
}
```

> For a complete working demo: https://ej2.syncfusion.com/angular/demos/#/material/uploader/image-preview

---

## Resize Images Before Uploading

Resize images client-side using Canvas before uploading to the server:

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
      [showFileList]="false"
      [autoUpload]="false"
      allowedExtensions=".jpg,.jpeg,.png"
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

  private readonly MAX_WIDTH = 1200;
  private readonly MAX_HEIGHT = 900;

  onFilesSelected(args: SelectedEventArgs): void {
    args.cancel = true;  // Prevent default upload
    args.filesData.forEach(fileInfo => {
      this.resizeAndUpload(fileInfo);
    });
  }

  private resizeAndUpload(fileInfo: any): void {
    const rawFile = fileInfo.rawFile as File;
    const reader = new FileReader();

    reader.onload = (readerEvent: any) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate scaled dimensions
        if (width > this.MAX_WIDTH) {
          height = Math.round(height * (this.MAX_WIDTH / width));
          width = this.MAX_WIDTH;
        }
        if (height > this.MAX_HEIGHT) {
          width = Math.round(width * (this.MAX_HEIGHT / height));
          height = this.MAX_HEIGHT;
        }

        // Draw resized image on canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to Blob and create a new FileInfo object
        canvas.toBlob(blob => {
          if (blob) {
            const resizedFile = {
              name: fileInfo.name,
              rawFile: blob,
              size: blob.size,
              type: fileInfo.type,
              validationMessage: '',
              statusCode: '1',
              status: 'Ready to Upload'
            };
            // Upload with custom UI flag = true
            this.uploader.upload(resizedFile as any, true);
          }
        }, 'image/jpeg', 0.9);
      };
      img.src = readerEvent.target.result;
    };
    reader.readAsDataURL(rawFile);
  }
}
```
