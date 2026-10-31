# Advanced How-To Patterns — Syncfusion Angular Uploader

## Table of Contents
- [Upload Files Programmatically](#upload-files-programmatically)
- [Invisible (Background) Upload](#invisible-background-upload)
- [Add Additional Form Data](#add-additional-form-data)
- [JWT Authentication](#jwt-authentication)
- [Confirm Dialog Before Removing Files](#confirm-dialog-before-removing-files)
- [Get Total Size of Selected Files](#get-total-size-of-selected-files)
- [Sort Selected Files](#sort-selected-files)
- [Open and Edit Uploaded Files](#open-and-edit-uploaded-files)
- [Convert Uploaded Images to Binary](#convert-uploaded-images-to-binary)
- [Check File Size Before Upload](#check-file-size-before-upload)

---

## Upload Files Programmatically

Use the `upload()` method to trigger uploads without user interaction. Use `getFilesData()` to retrieve queued files:

```typescript
import { Component, ViewChild } from '@angular/core';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { FileInfo } from '@syncfusion/ej2-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      #uploader
      [asyncSettings]="asyncSettings"
      [autoUpload]="false">
    </ejs-uploader>
    <button (click)="uploadAll()">Upload All Files</button>
    <button (click)="uploadFirst()">Upload First File Only</button>
  `
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  uploadAll(): void {
    // No argument = upload all queued files
    this.uploader.upload();
  }

  uploadFirst(): void {
    // Pass specific file data to upload only those files
    const filesData: FileInfo[] = this.uploader.getFilesData();
    if (filesData.length > 0) {
      this.uploader.upload(filesData[0]);
    }
  }
}
```

> **Behavior:**
> - No argument → uploads ALL selected/queued files
> - With file argument → uploads ONLY the specified files

---

## Invisible (Background) Upload

Upload files silently without showing the default file list or UI, triggered by the `selected` event:

```typescript
import { Component, ViewChild } from '@angular/core';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { SelectedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <p>Select files to upload silently in the background.</p>
    <ejs-uploader
      #uploader
      [asyncSettings]="asyncSettings"
      [showFileList]="false"
      (selected)="onFilesSelected($event)"
      (success)="onSuccess($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  public uploadStatus: string = '';

  onFilesSelected(args: SelectedEventArgs): void {
    // Immediately upload when files are selected
    this.uploader.upload(args.filesData, true);
  }

  onSuccess(args: any): void {
    if (args.operation === 'upload') {
      this.uploadStatus = `${args.file.name} uploaded successfully!`;
    }
  }
}
```

---

## Add Additional Form Data

Send extra key-value pairs along with file upload requests using `customFormData` in the `uploading` event:

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

  public userId = 'user-42';
  public category = 'documents';

  onFileUploading(args: any): void {
    // Add additional form data as key-value array
    args.customFormData = [
      { userId: this.userId },
      { category: this.category },
      { timestamp: new Date().toISOString() }
    ];
  }
}
```

**Retrieve on server-side (ASP.NET):**
```csharp
var userId = HttpContext.Current.Request.Form["userId"];
var category = HttpContext.Current.Request.Form["category"];
```

---

## JWT Authentication

Secure file upload and remove operations by injecting a JWT token into request headers:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      (uploading)="onFileUploading($event)"
      (removing)="onFileRemoving($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  // In production: retrieve this from your auth service
  private readonly jwtToken = 'your-jwt-token-here';

  onFileUploading(args: any): void {
    args.currentRequest.setRequestHeader('Authorization', `Bearer ${this.jwtToken}`);
  }

  onFileRemoving(args: RemovingEventArgs): void {
    args.postRawFile = false;  // Send only filename, not raw file
    args.currentRequest.setRequestHeader('Authorization', `Bearer ${this.jwtToken}`);
  }
}
```

**Server-side JWT validation (ASP.NET Core):**
```csharp
private bool IsAuthorized()
{
    var authHeader = Request.Headers["Authorization"].ToString();
    if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        return false;

    var token = authHeader["Bearer ".Length..];
    // Replace with your actual JWT validation logic
    return token == "your-valid-token";
}

public async Task<IActionResult> Save(IFormFile UploadFiles)
{
    if (!IsAuthorized()) return Unauthorized();
    // ... handle file save
}
```

---

## Confirm Dialog Before Removing Files

Show a confirmation prompt before allowing file removal using the `beforeRemove` event:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { BeforeRemoveEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      (beforeRemove)="onBeforeRemove($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  onBeforeRemove(args: BeforeRemoveEventArgs): void {
    const fileName = args.filesData[0]?.name;
    const confirmed = window.confirm(`Are you sure you want to remove "${fileName}"?`);
    if (!confirmed) {
      args.cancel = true;  // Cancel the removal
    }
  }
}
```

**Using EJ2 Dialog for a styled confirmation:**
```typescript
// For a styled EJ2 Dialog confirmation, use the DialogComponent
// from @syncfusion/ej2-angular-popups to show a modal with Yes/No
// buttons, and call uploader.remove() only when user confirms.
// See the Dialog skill for full implementation.
```

---

## Get Total Size of Selected Files

Calculate the combined size of all selected files using the `selected` event:

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
    <p *ngIf="totalSizeStr">Total selected: <strong>{{ totalSizeStr }}</strong></p>
  `
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  public totalSizeStr: string = '';

  onFilesSelected(args: SelectedEventArgs): void {
    const totalBytes = args.filesData.reduce((sum, file) => sum + (file.size || 0), 0);
    // bytesToSize converts bytes to human-readable KB/MB string
    this.totalSizeStr = this.uploader.bytesToSize(totalBytes);
  }
}
```

---

## Sort Selected Files

Sort files alphabetically or by any property using the `selected` event:

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
      (selected)="onFilesSelected($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  onFilesSelected(args: SelectedEventArgs): void {
    // Sort alphabetically by file name
    args.modifiedFilesData = args.filesData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    args.isModified = true;
  }
}
```

**Sort by file size (smallest first):**
```typescript
onFilesSelected(args: SelectedEventArgs): void {
  args.modifiedFilesData = args.filesData.sort((a, b) => (a.size || 0) - (b.size || 0));
  args.isModified = true;
}
```

---

## Open and Edit Uploaded Files

Open uploaded files from the server after a successful upload using the `success` event:

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
      (success)="onUploadSuccess($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  onUploadSuccess(args: any): void {
    if (args.operation === 'upload') {
      // Server returns the saved file path in response statusText
      const liElements = document.querySelectorAll('.e-upload-file-list');
      liElements.forEach(li => {
        if (li.getAttribute('data-file-name') === args.file.name) {
          // Store file path from server response
          li.setAttribute('file-path', args.e.target.statusText);

          // Add click handler to open the file
          li.addEventListener('click', (event: any) => {
            if (!event.target.classList.contains('e-file-delete-btn')) {
              this.openFileOnServer(li.getAttribute('file-path')!);
            }
          });
        }
      });
    }
  }

  openFileOnServer(filePath: string): void {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/uploader/open');
    xhr.setRequestHeader('filePath', filePath);
    xhr.send();
  }
}
```

---

## Convert Uploaded Images to Binary

Read uploaded images as binary data on the server side (ASP.NET):

```csharp
[AcceptVerbs("Post")]
public void Save()
{
    try
    {
        if (System.Web.HttpContext.Current.Request.Files.AllKeys.Length > 0)
        {
            var httpPostedFile = System.Web.HttpContext.Current.Request.Files["UploadFiles"];
            if (httpPostedFile != null)
            {
                byte[] fileBytes;
                using (BinaryReader br = new BinaryReader(httpPostedFile.InputStream))
                {
                    fileBytes = br.ReadBytes((int)httpPostedFile.InputStream.Length);
                    // fileBytes now contains the binary data of the uploaded image
                    // Store in database or process as needed
                }
                HttpResponse response = System.Web.HttpContext.Current.Response;
                response.Clear();
                response.ContentType = "application/json; charset=utf-8";
                response.StatusCode = 200;
                response.End();
            }
        }
    }
    catch (Exception e)
    {
        HttpResponse response = System.Web.HttpContext.Current.Response;
        response.StatusCode = 204;
        response.StatusDescription = e.Message;
        response.End();
    }
}
```

---

## Check File Size Before Upload

Inspect file sizes in the `uploading` event before the request is sent, and optionally cancel oversized uploads:

```typescript
import { Component, ViewChild } from '@angular/core';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      #uploader
      [asyncSettings]="asyncSettings"
      (uploading)="onFileUploading($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  private readonly MAX_ALLOWED_BYTES = 10 * 1024 * 1024; // 10 MB

  onFileUploading(args: any): void {
    const fileData = args.fileData;
    const fileSizeStr = this.uploader.bytesToSize(fileData.size);
    console.log(`Uploading: ${fileData.name} (${fileSizeStr})`);

    if (fileData.size > this.MAX_ALLOWED_BYTES) {
      args.cancel = true;
      alert(`File "${fileData.name}" (${fileSizeStr}) exceeds the 10 MB limit.`);
    }
  }
}
```

> `bytesToSize(bytes)` converts a byte count to a human-readable string like `"4.5 MB"` or `"512 KB"`.
