# Upload Modes & Features

Explore different upload strategies and advanced file handling features.

## Table of Contents
- [Async Upload](#async-upload)
- [Chunked Upload](#chunked-upload)
- [Drag-and-Drop Upload](#drag-and-drop-upload)
- [Form Submission Upload](#form-submission-upload)
- [Paste to Upload](#paste-to-upload)
- [Directory Upload](#directory-upload)
- [File Source Options](#file-source-options)
- [Event Handling](#event-handling)

---

## Async Upload

### Standard Async Upload

Asynchronous upload sends files to the server without page reload:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove'
  },
  autoUpload: true  // Automatically upload on selection
});
uploader.appendTo('#fileupload');
```

### Multiple File Upload

By default, the uploader allows selecting and uploading multiple files simultaneously:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  }
  // multiple is true by default
});
uploader.appendTo('#fileupload');
```

### Single File Upload

Disable multiple file selection to allow only one file at a time:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  multiple: false
});
uploader.appendTo('#fileupload');
```

### Manual Upload Control

Trigger upload programmatically:

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove'
  },
  autoUpload: false  // Don't auto-upload
});
uploader.appendTo('#fileupload');

// Trigger upload from button click
document.getElementById('uploadBtn')?.addEventListener('click', () => {
  uploader.upload(uploader.getFilesData());
});

// Trigger upload for specific file
document.getElementById('uploadSingleBtn')?.addEventListener('click', () => {
  const firstFile = uploader.getFilesData()[0];
  uploader.upload([firstFile]);
});
```

### Sequential Upload

By default, the uploader processes multiple files simultaneously. Enable `sequentialUpload` to process files one after another, which helps reduce upload traffic and failures:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  sequentialUpload: true  // Upload files one by one
});
uploader.appendTo('#fileupload');
```

### Preloaded Files

Display files already uploaded to the server by configuring the `files` property. Preloaded files appear with the successfully uploaded state. The `name`, `size`, and `type` properties are mandatory:

```typescript
import { Uploader, FilesPropModel } from '@syncfusion/ej2-inputs';

const preLoadFiles: FilesPropModel[] = [
  { name: 'Books', size: 500, type: '.png' },
  { name: 'Movies', size: 12000, type: '.pdf' },
  { name: 'Study materials', size: 500000, type: '.docx' },
];

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  files: preLoadFiles
});
uploader.appendTo('#fileupload');
```

### Save Action & Server Response Handling

The save action handles the upload operation on the server. After uploading, the selected file name changes to green and the remove icon changes to a bin icon:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: '/api/FileUploader/Save'
  },
  success: onSuccessHandler
});
uploader.appendTo('#fileupload');

function onSuccessHandler(args: any): void {
  if (args.operation === 'upload') {
    console.log('File uploaded successfully:', args.file.name);
  } else if (args.operation === 'remove') {
    console.log('File removed successfully:', args.file.name);
  }
}
```

> You can differentiate the operation in the success event arguments: `eventArgs.operation` is `'upload'` for save and `'remove'` for the remove action.

### Remove Action with postRawFile

Control whether to send the full raw file or only the file name during file removal using the `postRawFile` property of `RemovingEventArgs`:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

// Send only the file name (not the raw file) during removal
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
  },
  removing: function (args) {
    args.postRawFile = false; // Only send file name to server
  }
});
uploader.appendTo('#fileupload');
```

> When `postRawFile` is `true` (default), the complete file data is sent to the server's Remove action.

### Adding Additional HTTP Headers

Add custom headers to save and remove action requests using the `uploading` and `removing` events. This is useful for sending validation tokens or authorization headers:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  uploading: addHeaders,
  removing: addHeaders
});
uploader.appendTo('#fileupload');

function addHeaders(args: any): void {
  args.currentRequest.setRequestHeader('custom-header', 'Syncfusion');
}
```

---

## Chunked Upload

### Resumable Chunked Upload

Upload large files in chunks, with resume capability:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save-chunk',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove',
    chunkSize: 5242880  // 5 MB chunks
  },
  minFileSize: 26214400,  // Min 25 MB (trigger chunking)
  allowedExtensions: '.iso,.zip,.rar,.exe'
});
uploader.appendTo('#fileupload');

// Track chunk uploads
uploader.chunkSuccess = (args: any) => {
  console.log(`Chunk ${args.chunkIndex + 1} uploaded, size: ${args.chunkSize} bytes`);
};

// Handle chunk failure (auto-retry)
uploader.chunkFailure = (args: any) => {
  console.warn(`Chunk ${args.chunkIndex} failed for file: ${args.file.name}`);
  // The component handles retry automatically based on retryCount/retryAfterDelay
};

// Track upload progress
uploader.progress = (args: any) => {
  const percent = Math.round((args.event.loaded / args.event.total) * 100);
  console.log(`Overall progress: ${percent}%`);
};
```

### Chunk Configuration

```typescript
// Common chunk sizes
const configs = {
  // Small chunks (better for poor connections)
  smallChunks: {
    chunkSize: 1048576  // 1 MB
  },
  
  // Medium chunks (balanced)
  mediumChunks: {
    chunkSize: 5242880  // 5 MB
  },
  
  // Large chunks (faster for good connections)
  largeChunks: {
    chunkSize: 10485760 // 10 MB
  }
};
```

### Retry Configuration

Configure automatic retry behavior for failed chunk uploads:

- **retryAfterDelay**: Time in milliseconds to wait before retrying a failed chunk (default: 500ms)
- **retryCount**: Number of retry attempts before triggering the `failure` event (default: 3)

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
    chunkSize: 102400,       // 100 KB chunks
    retryCount: 5,           // Retry up to 5 times
    retryAfterDelay: 3000    // Wait 3 seconds before retry
  }
});
uploader.appendTo('#fileupload');
```

> If a chunk continuously fails after all retries, the request is aborted and the `failure` event triggers.

### Server-Side Chunk Handling

The server receives multiple requests for the same file. Use the `chunk-index` and `total-chunk` values from form data to handle assembly:

```csharp
// ASP.NET Core example
public async Task<IActionResult> Save(IFormFile UploadFiles)
{
    if (UploadFiles.Length > 0)
    {
        var fileName = UploadFiles.FileName;
        if (!Directory.Exists(uploads))
            Directory.CreateDirectory(uploads);

        if (UploadFiles.ContentType == "application/octet-stream") // Chunk upload
        {
            var chunkIndex = Request.Form["chunk-index"];
            var totalChunk = Request.Form["total-chunk"];
            var tempFilePath = Path.Combine(uploads, fileName + ".part");

            using (var fileStream = new FileStream(tempFilePath,
                chunkIndex == "0" ? FileMode.Create : FileMode.Append))
            {
                await UploadFiles.CopyToAsync(fileStream);
            }

            // Combine chunks when last chunk arrives
            if (Convert.ToInt32(chunkIndex) == Convert.ToInt32(totalChunk) - 1)
            {
                var finalFilePath = Path.Combine(uploads, fileName);
                System.IO.File.Move(tempFilePath, finalFilePath);
                return Ok(new { status = "File uploaded successfully" });
            }
            return Ok(new { status = "Chunk uploaded successfully" });
        }
        else // Normal upload
        {
            var filePath = Path.Combine(uploads, fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
                await UploadFiles.CopyToAsync(fileStream);
            return Ok(new { status = "File uploaded successfully" });
        }
    }
    return BadRequest(new { status = "No file to upload" });
}
```

> `chunk-index` indicates the current chunk index (0-based) and `total-chunk` represents the total number of chunks for the file.

---

## Drag-and-Drop Upload

### Enable Drag-and-Drop

By default, the uploader component acts as the drop area element, highlighted when files are dragged over it:

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove'
  },
  dropEffect: 'Copy',  // Visual effect during drag
  multiple: true
});
uploader.appendTo('#fileupload');
```

### Custom Drop Area using dropArea Property

Set an external target element as the drop area using the `dropArea` property. The element can be an HTML element reference or its ID:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  autoUpload: false,
  dropArea: document.getElementById('droparea')  // External drop target
});
uploader.appendTo('#fileupload');
```

HTML:
```html
<div id="droparea" style="border: 2px dashed #ccc; padding: 40px; text-align: center;">
  Drop files here
</div>
<input type="file" id="fileupload" name="UploadFiles" />
```

### Customize Drop Area Appearance

Override the default drop area styles to match your design:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  dropArea: document.getElementById('droparea')
});
uploader.appendTo('#fileupload');

document.getElementById('browse')!.onclick = function () {
  document.getElementsByClassName('e-file-select-wrap')[0]
    .querySelector('button')!.click();
  return false;
};
```

CSS:
```css
/* Custom drop area */
#droparea {
  border: 2px dashed #0078d4;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  background: #f4f8ff;
  transition: background 0.2s ease;
}

#droparea.e-upload-drag-hover {
  background: #e0ecff;
  border-color: #005a9e;
}
```

---

## Form Submission Upload

### Upload with Form Data

Combine file upload with form submission:

```typescript
import { Uploader, UploadingEventArgs } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove'
  }
});
uploader.appendTo('#fileupload');

// Handle form submission
document.getElementById('submitBtn')?.addEventListener('click', (e: Event) => {
  e.preventDefault();

  // Get form data
  const form = document.getElementById('myForm') as HTMLFormElement;
  const formData = new FormData(form);

  // Get uploaded files
  const files = uploader.getFilesData();
  
  // Add files to form data
  files.forEach((file: any, index: number) => {
    formData.append(`files[${index}]`, file.rawFile);
  });

  // Submit to server
  fetch('https://api.example.com/submit', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Form submitted successfully:', data);
  })
  .catch(error => console.error('Submission error:', error));
});
```

HTML:
```html
<form id="myForm">
  <input type="text" name="userName" placeholder="User name" required />
  <input type="email" name="email" placeholder="Email" required />
  
  <input type="file" id="fileupload" name="UploadFiles" multiple />
  
  <button type="button" id="submitBtn">Submit</button>
</form>
```

---

## Paste to Upload

The uploader allows uploading image files by pasting from the clipboard. Any currently copied image can be pasted directly into the uploader:

```typescript
import { Uploader, UploadingEventArgs } from '@syncfusion/ej2-inputs';
import { getUniqueID } from '@syncfusion/ej2-base';

const uploader = new Uploader({
  autoUpload: false,
  uploading: onUploadBegin
});
uploader.appendTo('#fileupload');

function onUploadBegin(args: UploadingEventArgs): void {
  // Check whether the file is uploading from paste
  if (args.fileData.fileSource === 'paste') {
    // Generate a unique name for the pasted image
    const newName: string = getUniqueID(
      args.fileData.name.substring(0, args.fileData.name.lastIndexOf('.'))
    ) + '.png';
    args.customFormData = [{ 'fileName': newName }];
  }
}
```

> When pasting an image, it is saved on the server with the filename `image.png` by default. Use `getUniqueID` to generate a unique filename. The server can then rename the file using the `fileName` value sent via `customFormData`.

---

## Directory Upload

Enable the `directoryUpload` property to allow users to upload entire folders. The uploader iterates through all files and sub-directories within the selected folder:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  directoryUpload: true
});
uploader.appendTo('#fileupload');
```

> Directory upload is only available in browsers that support the **HTML5 directory** attribute. In Edge, directory upload works via drag-and-drop. When enabled, only folders can be selected (not individual files).

---

## File Source Options

### Getting File Information

Access file data programmatically:

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove'
  }
});
uploader.appendTo('#fileupload');

// Get all files
const allFiles = uploader.getFilesData();
console.log('Total files:', allFiles.length);

allFiles.forEach((file: any) => {
  console.log({
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    rawFile: file.rawFile
  });
});
```

### Reading File Content

Access file content before upload:

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove'
  }
});
uploader.appendTo('#fileupload');

uploader.selected = (args: any) => {
  args.filesData.forEach((file: any) => {
    const reader = new FileReader();

    // For text files
    if (file.type.includes('text') || file.name.endsWith('.json')) {
      reader.onload = (e: any) => {
        const content = e.target.result;
        console.log(`${file.name} content:`, content);
      };
      reader.readAsText(file.rawFile);
    }

    // For images
    if (file.type.includes('image')) {
      reader.onload = (e: any) => {
        const dataUrl = e.target.result;
        const img = document.createElement('img');
        img.src = dataUrl;
        img.style.maxWidth = '100px';
        document.getElementById('preview')?.appendChild(img);
      };
      reader.readAsDataURL(file.rawFile);
    }

    // For binary files (checksums)
    reader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      console.log(`${file.name} size: ${arrayBuffer.byteLength} bytes`);
    };
    reader.readAsArrayBuffer(file.rawFile);
  });
};
```

---

## Event Handling

### Complete Event Lifecycle

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove'
  }
});
uploader.appendTo('#fileupload');

// 1. Files selected
uploader.selected = (args: any) => {
  console.log('1. Files selected:', args.filesData.length);
};

// 2. File upload starts
uploader.uploading = (args: any) => {
  console.log('2. Uploading:', args.file.name);
  // Can cancel: args.cancel = true;
};

// 3. Upload progress
uploader.progress = (args: any) => {
  const percent = Math.round((args.event.loaded / args.event.total) * 100);
  console.log(`3. Progress: ${percent}%`);
};

// 4. Upload succeeds
uploader.success = (args: any) => {
  console.log('4. Success:', args.file.name, 'operation:', args.operation);
};

// 5. Upload fails
uploader.failure = (args: any) => {
  console.log('5. Failure:', args.file.name, 'operation:', args.operation);
};

// 6. File being removed
uploader.removing = (args: RemovingEventArgs) => {
  console.log('6. Removing:', args.filesData);
};

// 7. All uploads complete
uploader.actionComplete = (args: ActionCompleteEventArgs) => {
  console.log('7. All uploads complete:', args.fileData);
};
```

### Pausing/Resuming Uploads

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove'
  },
  autoUpload: false
});
uploader.appendTo('#fileupload');

// Start upload
document.getElementById('startBtn')?.addEventListener('click', () => {
  uploader.upload(uploader.getFilesData());
});

// Pause upload
document.getElementById('pauseBtn')?.addEventListener('click', () => {
  uploader.pause(uploader.getFilesData());
});

// Resume upload
document.getElementById('resumeBtn')?.addEventListener('click', () => {
  uploader.resume(uploader.getFilesData());
});

// Cancel upload
document.getElementById('cancelBtn')?.addEventListener('click', () => {
  uploader.cancel(uploader.getFilesData());
});
```

---

## Next Steps

- **For validation**: Read [file-validation.md](file-validation.md)
- **For customization**: Read [customization-and-styling.md](customization-and-styling.md)
- **For advanced features**: Read [advanced-features.md](advanced-features.md)
