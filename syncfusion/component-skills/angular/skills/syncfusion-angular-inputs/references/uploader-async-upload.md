# Asynchronous Upload — Syncfusion Angular Uploader

## Table of Contents
- [Multiple File Upload](#multiple-file-upload)
- [Single File Upload](#single-file-upload)
- [Save Action](#save-action)
- [Remove Action](#remove-action)
- [Auto Upload vs Manual Upload](#auto-upload-vs-manual-upload)
- [Sequential Upload](#sequential-upload)
- [Preloaded Files](#preloaded-files)
- [Adding Custom HTTP Headers](#adding-custom-http-headers)

---

## Multiple File Upload

By default, the Uploader allows selecting and uploading multiple files at once. The `multiple` property controls this behavior (defaults to `true`).

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

## Single File Upload

Disable `multiple` to allow only one file at a time. Each new selection replaces the previous file:

```typescript
<ejs-uploader
  [asyncSettings]="asyncSettings"
  [multiple]="false">
</ejs-uploader>
```

---

## Save Action

The `saveUrl` endpoint handles file data sent via POST request. After a successful upload, the file name turns green and the remove icon changes to a delete icon.

**Angular template:**
```typescript
<ejs-uploader
  [asyncSettings]="asyncSettings"
  (success)="onSuccess($event)"
  (failure)="onFailure($event)">
</ejs-uploader>
```

**Server-side (ASP.NET Core):**
```csharp
public async Task<IActionResult> Save(IFormFile UploadFiles)
{
    if (UploadFiles.Length > 0)
    {
        if (!Directory.Exists(uploads))
            Directory.CreateDirectory(uploads);

        var filePath = Path.Combine(uploads, UploadFiles.FileName);
        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await UploadFiles.CopyToAsync(fileStream);
        }
    }
    return Ok();
}
```

**Returning server responses to the client:**
```csharp
// JSON response
return Json(new { Success = true, Message = "Files uploaded successfully" });

// String response
return Content("success");
```

**Accessing server response on client:**
```typescript
onSuccess(args: any): void {
  if (args.operation === 'upload') {
    // Server response is in: args.e.target.responseText
    const response = JSON.parse(args.e.target.responseText);
    console.log('Server response:', response);
  }
}
```

---

## Remove Action

The `removeUrl` endpoint handles file removal from the server. The `removing` event fires before the request is sent.

**Send only filename (not raw file):**
```typescript
<ejs-uploader
  [asyncSettings]="asyncSettings"
  (removing)="onFileRemove($event)">
</ejs-uploader>
```

```typescript
import { RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';

onFileRemove(args: RemovingEventArgs): void {
  // Set false to send only the file name (not the complete file data)
  args.postRawFile = false;
}
```

**Server-side (file name only):**
```csharp
public void Remove(string UploadFiles)
{
    if (UploadFiles != null)
    {
        var filePath = Path.Combine(uploads, UploadFiles);
        if (System.IO.File.Exists(filePath))
            System.IO.File.Delete(filePath);
    }
}
```

> When `postRawFile` is `true` (default), the full file data is sent. When `false`, only the filename is sent.

**Differentiating save vs remove in success event:**
```typescript
onSuccess(args: any): void {
  if (args.operation === 'upload') {
    console.log('File uploaded:', args.file.name);
  } else if (args.operation === 'remove') {
    console.log('File removed:', args.file.name);
  }
}
```

---

## Auto Upload vs Manual Upload

| Mode | `autoUpload` | Behavior | Action Buttons |
|------|-------------|----------|----------------|
| Auto (default) | `true` | Uploads immediately on file selection | Hidden |
| Manual | `false` | Queues files; user clicks Upload button | Upload + Clear shown |

**Manual upload with custom button labels:**
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
      [buttons]="buttons">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  public buttons = {
    browse: 'Choose Files',
    clear: 'Clear All',
    upload: 'Upload Now'
  };
}
```

---

## Sequential Upload

By default, multiple files upload simultaneously. Enable `sequentialUpload` to process files one at a time — useful to reduce server load and network failures:

```typescript
<ejs-uploader
  [asyncSettings]="asyncSettings"
  [sequentialUpload]="true">
</ejs-uploader>
```

When enabled:
- Files upload one after another
- The next file uploads only when the current one succeeds or fails
- Reduces network contention and server strain

---

## Preloaded Files

Display files already on the server in the file list using the `files` property. Users can view and remove preloaded files:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { FilesPropModel } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      [files]="preloadedFiles"
      [autoUpload]="false">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  // Mandatory fields: name, size, type
  public preloadedFiles: FilesPropModel[] = [
    { name: 'Annual Report', size: 500000, type: '.pdf' },
    { name: 'Profile Photo', size: 200000, type: '.png' },
    { name: 'Contract', size: 120000, type: '.docx' }
  ];
}
```

> Preloaded files appear with an "uploaded successfully" state by default.

---

## Adding Custom HTTP Headers

Inject additional headers into upload and remove requests using the `uploading` and `removing` events and the `currentRequest` property:

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
      (uploading)="addHeaders($event)"
      (removing)="addHeaders($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  addHeaders(args: any): void {
    args.currentRequest.setRequestHeader('custom-header', 'MyValue');
    args.currentRequest.setRequestHeader('x-tenant-id', 'tenant-123');
  }
}
```

> For JWT authentication, see the Advanced Patterns reference — it uses the same `currentRequest.setRequestHeader` approach with an `Authorization: Bearer <token>` header.
