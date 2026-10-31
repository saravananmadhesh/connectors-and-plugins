# File Sources — Syncfusion Angular Uploader

## Table of Contents
- [Browse Dialog (Default)](#browse-dialog-default)
- [Drag and Drop](#drag-and-drop)
- [Custom Drop Area](#custom-drop-area)
- [Customize Drop Area Appearance](#customize-drop-area-appearance)
- [Clipboard Paste Upload](#clipboard-paste-upload)
- [Directory Upload](#directory-upload)
- [Trigger Browse from External Button](#trigger-browse-from-external-button)

---

## Browse Dialog (Default)

By default, the Uploader renders a "Browse" button that opens the OS file selection dialog. The `multiple` property controls single vs multi-file selection:

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
      [multiple]="true">
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

---

## Drag and Drop

The Uploader component itself acts as the default drop area. Users can drag files from their file system and drop them directly onto the Uploader:

```typescript
// No extra configuration needed — drag-and-drop is enabled by default
<ejs-uploader [asyncSettings]="asyncSettings"></ejs-uploader>
```

**Controlling the drag effect:**
```typescript
// DropEffect options: 'Default' | 'Copy' | 'Move' | 'Link' | 'None'
<ejs-uploader
  [asyncSettings]="asyncSettings"
  dropEffect="Copy">
</ejs-uploader>
```

---

## Custom Drop Area

Set the `dropArea` property to use an external HTML element as the drag-and-drop target:

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div #dropArea class="custom-drop-zone">
      <span>Drag and drop files here</span>
    </div>
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      [dropArea]="dropElement">
    </ejs-uploader>
  `,
  styles: [`
    .custom-drop-zone {
      border: 2px dashed #aaa;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      background: #f9f9f9;
      margin-bottom: 16px;
    }
  `]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('dropArea') dropAreaRef!: ElementRef;
  public dropElement!: HTMLElement;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  ngAfterViewInit(): void {
    this.dropElement = this.dropAreaRef.nativeElement;
  }
}
```

**Using an element ID string:**
```typescript
// dropArea also accepts a CSS selector string
<ejs-uploader
  [asyncSettings]="asyncSettings"
  dropArea="#myDropZone">
</ejs-uploader>

<div id="myDropZone">Drop here</div>
```

---

## Customize Drop Area Appearance

Override the `.e-upload-drag-hover` CSS class to style the drop area during a drag-over event:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader [asyncSettings]="asyncSettings"></ejs-uploader>
  `,
  styles: [`
    /* Style when files are dragged over */
    :host ::ng-deep .e-upload-drag-hover {
      outline: 3px dashed #007bff;
      background-color: #e8f4ff;
    }
    /* Hide the default drop area text */
    :host ::ng-deep .e-upload .e-file-drop {
      display: none;
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

## Clipboard Paste Upload

The Uploader supports pasting images directly from the clipboard (Ctrl+V / Cmd+V):

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <p>Copy an image to clipboard and press Ctrl+V anywhere on the page.</p>
    <ejs-uploader [asyncSettings]="asyncSettings"></ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };
}
```

> Pasted images are saved on the server with the default filename `image.png`.  
> Use the `getUniqueID` utility method to generate unique filenames on the server side.

**Server-side rename example (ASP.NET):**
```csharp
public void Save() {
    var httpPostedFile = HttpContext.Current.Request.Files["UploadFiles"];
    var fileSave = HttpContext.Current.Server.MapPath("UploadedFiles");
    var fileSavePath = Path.Combine(fileSave, httpPostedFile.FileName);

    if (!System.IO.File.Exists(fileSavePath)) {
        httpPostedFile.SaveAs(fileSavePath);
        // Rename with unique ID from form data
        var newName = HttpContext.Current.Request.Form["fileName"];
        System.IO.File.Move(fileSavePath, Path.Combine(fileSave, newName));
    }
}
```

---

## Directory Upload

Enable `directoryUpload` to allow users to upload entire folder structures:

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
      [directoryUpload]="true">
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

> When `directoryUpload` is enabled, only folders can be selected/dropped — individual files cannot.  
> Supported in browsers that support HTML5 directory selection.  
> In Microsoft Edge, use drag-and-drop to upload directories.

**Server-side directory structure preservation (ASP.NET):**
```csharp
public void Save() {
    var httpPostedFile = HttpContext.Current.Request.Files["UploadFiles"];
    var fileSave = HttpContext.Current.Server.MapPath("UploadedFiles");
    // File name includes subdirectory path (e.g., "folder/subfolder/file.txt")
    string[] folders = httpPostedFile.FileName.Split('/');
    string fileSavePath = "";

    if (folders.Length > 1) {
        for (var i = 0; i < folders.Length - 1; i++) {
            var newFolder = Path.Combine(fileSave, folders[i]);
            Directory.CreateDirectory(newFolder);
            fileSave = newFolder;
        }
        fileSavePath = Path.Combine(fileSave, folders[folders.Length - 1]);
    } else {
        fileSavePath = Path.Combine(fileSave, httpPostedFile.FileName);
    }

    if (!System.IO.File.Exists(fileSavePath))
        httpPostedFile.SaveAs(fileSavePath);
}
```

---

## Trigger Browse from External Button

Open the file browser dialog from an external button by accessing the Uploader's internal `<input>` element:

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- External trigger button -->
    <button (click)="openFileBrowser()">📎 Attach Files</button>

    <!-- Hide the default browse button but keep the component functional -->
    <ejs-uploader
      #uploader
      [asyncSettings]="asyncSettings"
      [autoUpload]="false">
    </ejs-uploader>
  `,
  styles: [`
    /* Optionally hide default uploader wrapper UI */
    :host ::ng-deep .e-file-select-wrap { display: none; }
  `]
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  openFileBrowser(): void {
    // Access the hidden file input and trigger a click
    const fileInput = (this.uploader as any).element as HTMLInputElement;
    fileInput.click();
  }
}
```

**Alternative: Use the `.e-file-select-wrap button` selector:**
```typescript
openFileBrowser(): void {
  const browseButton = document.querySelector('.e-file-select-wrap button') as HTMLElement;
  if (browseButton) browseButton.click();
}
```
