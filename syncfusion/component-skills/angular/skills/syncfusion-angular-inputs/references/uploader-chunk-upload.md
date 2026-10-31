# Chunk Upload — Syncfusion Angular Uploader

## Table of Contents
- [Overview](#overview)
- [Enabling Chunk Upload](#enabling-chunk-upload)
- [Retry Configuration](#retry-configuration)
- [Pause and Resume](#pause-and-resume)
- [Cancel Upload](#cancel-upload)
- [Chunk Events](#chunk-events)
- [Server-Side Implementation](#server-side-implementation)

---

## Overview

Chunk upload splits large files into smaller byte-sized chunks and transmits them to the server sequentially via AJAX. This enables:
- Uploading very large files that exceed server request limits
- Pausing and resuming uploads after network interruptions
- Retry logic for individual failed chunks

> Chunk upload requires **asynchronous mode** (`asyncSettings` with `saveUrl` configured).  
> Files smaller than the configured `chunkSize` upload normally without chunking.  
> Available since Essential Studio Vol 2, 2018 release.

---

## Enabling Chunk Upload

Set `chunkSize` in `asyncSettings` (value in bytes). This activates chunk mode for files larger than the specified size:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader [asyncSettings]="chunkSettings"></ejs-uploader>
  `
})
export class AppComponent {
  public chunkSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove',
    chunkSize: 500000  // 500 KB chunks
  };
}
```

**How it works:**
1. File is split into `chunkSize`-byte pieces
2. Chunks are sent sequentially (next chunk only after current one succeeds)
3. If a chunk fails, remaining chunks are not sent
4. When all chunks succeed, the server reassembles the file and the `success` event fires

---

## Retry Configuration

Control how failed chunks are retried before the upload aborts:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="chunkSettings"
      (failure)="onFailure($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  public chunkSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove',
    chunkSize: 500000,
    retryCount: 5,        // Retry failed chunks up to 5 times (default: 3)
    retryAfterDelay: 3000 // Wait 3000ms before each retry (default: 500ms)
  };

  onFailure(args: any): void {
    // Fires after all retries are exhausted
    console.error('Upload permanently failed:', args.file.name);
  }
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `retryCount` | `3` | Maximum number of retry attempts per failed chunk |
| `retryAfterDelay` | `500` | Milliseconds to wait before retrying a failed chunk |

---

## Pause and Resume

Chunk uploads support pause and resume via the `pause()` and `resume()` methods, or via the UI pause icon that appears after upload begins.

> Pause/resume is only available when chunk upload is enabled.

```typescript
import { Component, ViewChild } from '@angular/core';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { FileInfo } from '@syncfusion/ej2-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader #uploader [asyncSettings]="chunkSettings"></ejs-uploader>
    <button (click)="pauseUpload()">Pause</button>
    <button (click)="resumeUpload()">Resume</button>
  `
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public chunkSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove',
    chunkSize: 500000
  };

  pauseUpload(): void {
    const filesData: FileInfo[] = this.uploader.getFilesData();
    if (filesData.length > 0) {
      this.uploader.pause(filesData[0]);  // Pause first in-progress file
    }
  }

  resumeUpload(): void {
    const filesData: FileInfo[] = this.uploader.getFilesData();
    if (filesData.length > 0) {
      this.uploader.resume(filesData[0]); // Resume the paused file
    }
  }
}
```

---

## Cancel Upload

Cancel an in-progress chunk upload. Partially uploaded chunks are removed from the server:

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
      [asyncSettings]="chunkSettings"
      (canceling)="onCanceled($event)">
    </ejs-uploader>
    <button (click)="cancelUpload()">Cancel</button>
  `
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public chunkSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove',
    chunkSize: 500000
  };

  cancelUpload(): void {
    const filesData = this.uploader.getFilesData();
    if (filesData.length > 0) {
      this.uploader.cancel(filesData);
    }
  }

  onCanceled(args: any): void {
    console.log('Upload canceled for:', args.file.name);
  }
}
```

**Retry a canceled upload:**
```typescript
// Retry from the beginning (default upload mode behavior)
this.uploader.retry(filesData[0]);

// Retry from the canceled stage (chunk mode - resumes from failure point)
this.uploader.retry(filesData[0], true);
```

> **Retry behavior difference:**
> - **Chunk upload:** Resumes from the failed chunk without restarting
> - **Default upload:** Restarts the entire file upload from the beginning

---

## Chunk Events

| Event | Description | Key Args |
|-------|-------------|----------|
| `(chunkSuccess)` | Fires after each chunk uploads successfully | `chunkIndex`, `totalChunk`, `chunkSize`, `file` |
| `(chunkFailure)` | Fires when a chunk fails to upload | `chunkIndex`, `totalChunk`, `chunkSize`, `file`, `cancel` |
| `(chunkUploading)` | Fires before each chunk is sent | `fileData`, `currentRequest`, `customFormData` |
| `(pausing)` | Fires when a chunk upload is paused | `file`, `chunkIndex` |
| `(resuming)` | Fires when a paused chunk upload resumes | `file`, `chunkIndex` |
| `(canceling)` | Fires when an upload is canceled | `file` |

**Track progress across chunks:**
```typescript
<ejs-uploader
  [asyncSettings]="chunkSettings"
  (chunkSuccess)="onChunkSuccess($event)"
  (chunkFailure)="onChunkFailure($event)"
  (success)="onAllChunksDone($event)">
</ejs-uploader>
```

```typescript
onChunkSuccess(args: any): void {
  const percent = Math.round(((args.chunkIndex + 1) / args.totalChunk) * 100);
  console.log(`Chunk ${args.chunkIndex + 1}/${args.totalChunk} (${percent}%)`);
}

onChunkFailure(args: any): void {
  console.warn(`Chunk ${args.chunkIndex} failed for ${args.file.name}`);
  // Set args.cancel = true to prevent the failure event from firing
}

onAllChunksDone(args: any): void {
  // Fires when ALL chunks have been successfully uploaded
  console.log('All chunks complete for:', args.file.name);
}
```

---

## Server-Side Implementation

Server-side chunk assembly using ASP.NET Core:

```csharp
public string uploads = Path.Combine(Directory.GetCurrentDirectory(), "Uploaded Files");

public async Task<IActionResult> Save(IFormFile UploadFiles)
{
    try
    {
        if (UploadFiles.Length > 0)
        {
            var fileName = UploadFiles.FileName;

            if (!Directory.Exists(uploads))
                Directory.CreateDirectory(uploads);

            if (UploadFiles.ContentType == "application/octet-stream") // Chunk upload
            {
                // Retrieve chunk metadata from form data
                var chunkIndex = Request.Form["chunk-index"];
                var totalChunk = Request.Form["total-chunk"];

                // Append chunks to a .part file
                var tempFilePath = Path.Combine(uploads, fileName + ".part");
                using (var fileStream = new FileStream(
                    tempFilePath,
                    chunkIndex == "0" ? FileMode.Create : FileMode.Append))
                {
                    await UploadFiles.CopyToAsync(fileStream);
                }

                // When last chunk arrives, rename .part to final file
                if (Convert.ToInt32(chunkIndex) == Convert.ToInt32(totalChunk) - 1)
                {
                    var finalFilePath = Path.Combine(uploads, fileName);
                    System.IO.File.Move(tempFilePath, finalFilePath);
                    return Ok(new { status = "File uploaded successfully" });
                }

                return Ok(new { status = "Chunk uploaded successfully" });
            }
            else // Normal upload (file size < chunkSize)
            {
                var filePath = Path.Combine(uploads, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await UploadFiles.CopyToAsync(fileStream);
                }
                return Ok(new { status = "File uploaded successfully" });
            }
        }
        return BadRequest(new { status = "No file to upload" });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { status = "Error", message = ex.Message });
    }
}
```

> Key form data values sent with each chunk:
> - `chunk-index` — Zero-based index of the current chunk
> - `total-chunk` — Total number of chunks for the file
