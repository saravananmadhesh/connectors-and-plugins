# How-To Guides & Practical Patterns

Practical solutions to common uploader tasks and real-world scenarios.

## Table of Contents
- [Programmatic Upload](#programmatic-upload)
- [Invisible Upload](#invisible-upload)
- [Additional Data on Upload](#additional-data-on-upload)
- [Confirm Dialog Before Remove](#confirm-dialog-before-remove)
- [HTML Attributes & Input Element](#html-attributes--input-element)
- [MIME Type Validation](#mime-type-validation)
- [Convert Images to Binary](#convert-images-to-binary)
- [Custom Button Elements](#custom-button-elements)
- [Detect Input Files](#detect-input-files)
- [Get Total File Size](#get-total-file-size)
- [Hide Drop Area](#hide-drop-area)
- [Open & Edit Uploaded Files](#open--edit-uploaded-files)
- [Sort Selected Files](#sort-selected-files)
- [External Button Trigger](#external-button-trigger)
- [Validate Image on Drop](#validate-image-on-drop)
- [Accessibility (WAI-ARIA)](#accessibility-wai-aria)
- [WAI-ARIA Compliance Standards](#wai-aria-compliance-standards)

---

## Programmatic Upload

Trigger file upload programmatically without user interaction.

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  autoUpload: false,  // Disable auto-upload
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Upload specific file (first selected)
document.getElementById('uploadFirstBtn')?.addEventListener('click', () => {
  const files = uploader.getFilesData();
  if (files.length > 0) {
    uploader.upload([files[0]]);
  }
});

// Upload all selected files
document.getElementById('uploadAllBtn')?.addEventListener('click', () => {
  uploader.upload(uploader.getFilesData());
});

// Upload specific file by name
function uploadFileByName(fileName: string): void {
  const files = uploader.getFilesData();
  const file = files.find(f => f.name === fileName);
  if (file) {
    uploader.upload([file]);
  }
}
```

**Use Case:** Submit files on demand, batch processing, scheduled uploads.

---

## Invisible Upload

Upload files without showing the uploader UI.

```typescript
import { Uploader, UploadingEventArgs } from '@syncfusion/ej2-inputs';

// Hide uploader with CSS
const styles = document.createElement('style');
styles.textContent = `
  #fileupload {
    display: none !important;
  }
`;
document.head.appendChild(styles);

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  autoUpload: true
});
uploader.appendTo('#fileupload');

// Trigger file selection programmatically
document.getElementById('customUploadBtn')?.addEventListener('click', () => {
  // Get the file input element
  const fileInput = document.querySelector('#fileupload') as HTMLInputElement;
  fileInput?.click();
});

// Handle upload events
uploader.selected = (args: any) => {
  console.log('Files ready to upload (hidden UI):', args.filesData);
};

uploader.success = (args: any) => {
  console.log('Upload successful (invisible)');
  // Show custom message
  document.getElementById('message')!.textContent = 'File uploaded successfully!';
};

uploader.failure = (args: any) => {
  console.error('Upload failed:', args.error);
  document.getElementById('message')!.textContent = 'Upload failed!';
};
```

**Use Case:** Minimal UI, background uploads, single-file uploads without dialog.

---

## Additional Data on Upload

Send extra metadata with file upload.

```typescript
import { Uploader, UploadingEventArgs } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Send additional data using customFormData in the uploading event
uploader.uploading = (args: UploadingEventArgs) => {
  // Add static or dynamic metadata before upload
  args.customFormData = [
    { userId: '12345' },
    { projectId: 'proj-abc' },
    { environment: 'production' },
    { 'X-File-Timestamp': new Date().toISOString() }
  ];
};

// Get data from form fields and send with upload
uploader.uploading = (args: UploadingEventArgs) => {
  const formData = new FormData(document.getElementById('myForm') as HTMLFormElement);
  args.customFormData = [
    { formField1: formData.get('field1') as string },
    { formField2: formData.get('field2') as string }
  ];
};
```

**Server-side handling (ASP.NET Core example):**
```csharp
public IActionResult Save(IFormFile UploadFiles)
{
    var timestamp = Request.Form["X-File-Timestamp"].ToString();
    var category = Request.Form["X-File-Category"].ToString();
    // Process file with custom data
    return Ok();
}
```

---

## Confirm Dialog Before Remove

Show confirmation dialog before deleting files.

```typescript
import { Uploader, RemovingEventArgs, FileInfo } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
import { createElement } from '@syncfusion/ej2-base';

let fileToRemove: FileInfo[] = [];

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  removing: onBeforeRemove
});
uploader.appendTo('#fileupload');

// Initialize confirmation dialog
const dialog = new Dialog({
  content: 'Are you sure you want to remove this file?',
  buttons: [
    {
      click: confirmRemove,
      buttonModel: { content: 'Yes', cssClass: 'e-flat', isPrimary: true }
    },
    {
      click: () => dialog.hide(),
      buttonModel: { content: 'No', cssClass: 'e-flat' }
    }
  ],
  width: '300px',
  visible: false,
  target: '#container'
});
dialog.appendTo('#confirmDialog');

function onBeforeRemove(args: RemovingEventArgs): void {
  fileToRemove = [];
  args.cancel = true;  // Prevent default removal
  fileToRemove.push(args.filesData[0]);
  dialog.show();
}

function confirmRemove(): void {
  dialog.hide();
  if (fileToRemove.length > 0) {
    // Remove with force=true to bypass the component's remove handler
    uploader.remove(fileToRemove[0], false, true);
  }
}
```

HTML:
```html
<input type="file" id="fileupload" />
<div id="confirmDialog"></div>
```

---

## HTML Attributes & Input Element

Control HTML5 file input attributes.

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Set HTML attributes on the input element
const fileInput = document.getElementById('fileupload') as HTMLInputElement;

// Accept specific file types
fileInput.setAttribute('accept', '.jpg,.jpeg,.png,.gif');

// Allow multiple file selection
fileInput.setAttribute('multiple', 'true');

// Set ID and name
fileInput.setAttribute('id', 'myFileInput');
fileInput.setAttribute('name', 'uploadedFiles');

// Add ARIA label for accessibility
fileInput.setAttribute('aria-label', 'Select files to upload');

// Disable input
fileInput.setAttribute('disabled', 'true');
```

Alternatively, set in HTML directly:
```html
<input 
  type="file" 
  id="fileupload" 
  name="UploadFiles"
  accept=".jpg,.jpeg,.png,.pdf"
  multiple 
  aria-label="Upload files"
/>
```

---

## MIME Type Validation

Validate file MIME types before upload.

```typescript
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Allowed MIME types
const allowedMimes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf'
];

uploader.selected = (args: SelectedEventArgs) => {
  const validFiles = [];
  const invalidFiles = [];

  args.filesData.forEach((file: any) => {
    if (allowedMimes.includes(file.type)) {
      validFiles.push(file);
    } else {
      invalidFiles.push({
        name: file.name,
        reason: `Invalid MIME type: ${file.type}`
      });
    }
  });

  // Show warnings for invalid files
  if (invalidFiles.length > 0) {
    invalidFiles.forEach(f => {
      console.warn(`Rejected: ${f.name} (${f.reason})`);
    });
  }

  // Keep only valid files
  args.filesData = validFiles;
  args.modifiedFilesData = validFiles;
};
```

---

## Convert Images to Binary

Convert images to binary format for storage or transmission.

```typescript
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload-binary',
    removeUrl: 'https://api.example.com/remove'
  },
  allowedExtensions: '.jpg,.jpeg,.png'
});
uploader.appendTo('#fileupload');

uploader.uploading = async (args: any) => {
  if (args.file.type.startsWith('image/')) {
    args.cancel = true;  // Cancel default upload

    try {
      // Read file as binary
      const arrayBuffer = await args.file.rawFile.arrayBuffer();
      const binary = new Uint8Array(arrayBuffer);

      // Send as binary data
      const response = await fetch('https://api.example.com/upload-binary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'X-File-Name': args.file.name
        },
        body: binary
      });

      const result = await response.json();
      console.log('Binary upload successful:', result);
    } catch (error) {
      console.error('Binary upload failed:', error);
    }
  }
};

// Alternative: Convert to Base64 binary
function convertToBase64Binary(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

---

## Custom Button Elements

Replace default buttons with custom HTML elements.

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  autoUpload: false
});
uploader.appendTo('#fileupload');

// Custom browse button
document.getElementById('customBrowseBtn')?.addEventListener('click', () => {
  const fileInput = document.querySelector('#fileupload') as HTMLInputElement;
  fileInput?.click();
});

// Custom upload button
document.getElementById('customUploadBtn')?.addEventListener('click', () => {
  uploader.upload(uploader.getFilesData());
});

// Custom clear button
document.getElementById('customClearBtn')?.addEventListener('click', () => {
  uploader.clearAll();
});
```

HTML:
```html
<div class="custom-uploader">
  <input type="file" id="fileupload" multiple />
  
  <div class="custom-buttons">
    <button id="customBrowseBtn" class="btn-browse">
      <i class="icon-folder"></i> Choose Files
    </button>
    <button id="customUploadBtn" class="btn-upload">
      <i class="icon-upload"></i> Upload Now
    </button>
    <button id="customClearBtn" class="btn-clear">
      <i class="icon-trash"></i> Clear All
    </button>
  </div>
</div>
```

---

## Detect Input Files

Check if files are selected in the uploader.

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Check if uploader has files
function hasFiles(): boolean {
  const files = uploader.getFilesData();
  return files && files.length > 0;
}

// Get file count
function getFileCount(): number {
  const files = uploader.getFilesData();
  return files ? files.length : 0;
}

// Enable/disable upload button based on file selection
function updateUploadButton(): void {
  const uploadBtn = document.getElementById('uploadBtn') as HTMLButtonElement;
  uploadBtn.disabled = !hasFiles();
}

uploader.selected = () => updateUploadButton();
uploader.removing = () => updateUploadButton();

// Initially disable button
updateUploadButton();
```

---

## Get Total File Size

Calculate total size of selected files. Use the built-in `bytesToSize` method to convert bytes to a standard human-readable format:

```typescript
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

function getTotalFileSize(): number {
  const files = uploader.getFilesData();
  return files.reduce((total, file) => total + file.size, 0);
}

// Display total size using built-in bytesToSize method
uploader.selected = (args: SelectedEventArgs) => {
  args.filesData.forEach((file: any) => {
    // Use the built-in bytesToSize method for standard formatting
    console.log(`${file.name}: ${uploader.bytesToSize(file.size)}`);
  });

  const totalSize = getTotalFileSize();
  console.log(`Total size: ${uploader.bytesToSize(totalSize)}`);

  // Update UI
  document.getElementById('totalSize')!.textContent = `Total: ${uploader.bytesToSize(totalSize)}`;
};
```

### Check File Size Before Uploading

Use the `uploading` event and `bytesToSize` method to get and display file size before it is sent to the server:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  autoUpload: false,
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  uploading: onBeforeUpload
});
uploader.appendTo('#fileupload');

function onBeforeUpload(args: any): void {
  // Get the file size in bytes
  const sizeInBytes: number = args.fileData.size;
  // Convert to standard readable format using bytesToSize
  console.log('File size is: ' + uploader.bytesToSize(sizeInBytes));
}
```

---

## Hide Drop Area

Disable the default drag-and-drop visual area.

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Hide drop area with CSS
const styles = document.createElement('style');
styles.textContent = `
  /* Hide the drop area container */
  .e-uploader .e-file-drop {
    display: none !important;
  }

  /* Hide drag-over effects */
  .e-uploader.e-drag-over {
    background: none !important;
    border: none !important;
  }

  /* Keep only browse button visible */
  .e-uploader .e-file-select {
    display: block !important;
  }
`;
document.head.appendChild(styles);
```

Alternative: Set the `dropArea` to a non-existent or separate element to effectively disable drag-drop on the component:
```typescript
// Point drop area to a non-interactive element to disable default drop zone
uploader.dropArea = document.getElementById('non-drop-target') as HTMLElement;
```

---

## Open & Edit Uploaded Files

Handle files after successful upload.

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

uploader.success = async (args: any) => {
  const uploadedFile = JSON.parse(args.responseText);
  const fileUrl = uploadedFile.fileUrl;
  const fileName = uploadedFile.name;

  // Based on file type, open or edit
  if (fileName.endsWith('.pdf')) {
    openPdfViewer(fileUrl);
  } else if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) {
    openImageEditor(fileUrl);
  } else if (fileName.endsWith('.txt')) {
    openTextEditor(fileUrl);
  } else {
    downloadFile(fileUrl, fileName);
  }
};

function openPdfViewer(fileUrl: string): void {
  window.open(fileUrl, '_blank');
}

function openImageEditor(fileUrl: string): void {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div class="image-viewer">
      <img src="${fileUrl}" alt="Uploaded Image" />
      <button onclick="this.parentElement.parentElement.remove()">Close</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function openTextEditor(fileUrl: string): void {
  fetch(fileUrl)
    .then(res => res.text())
    .then(content => {
      const editor = document.createElement('textarea');
      editor.value = content;
      document.body.appendChild(editor);
    });
}

function downloadFile(fileUrl: string, fileName: string): void {
  const a = document.createElement('a');
  a.href = fileUrl;
  a.download = fileName;
  a.click();
}
```

---

## Sort Selected Files

Sort files by name, size, or date.

```typescript
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Sort by name (A-Z)
function sortByName(files: any[]): any[] {
  return [...files].sort((a, b) => a.name.localeCompare(b.name));
}

// Sort by size (smallest first)
function sortBySize(files: any[]): any[] {
  return [...files].sort((a, b) => a.size - b.size);
}

// Sort by date (newest first)
function sortByDate(files: any[]): any[] {
  return [...files].sort((a, b) => b.lastModified - a.lastModified);
}

uploader.selected = (args: SelectedEventArgs) => {
  // Get sort preference from dropdown
  const sortType = (document.getElementById('sortSelect') as HTMLSelectElement)?.value || 'name';

  let sortedFiles = args.filesData;
  switch (sortType) {
    case 'name':
      sortedFiles = sortByName(sortedFiles);
      break;
    case 'size':
      sortedFiles = sortBySize(sortedFiles);
      break;
    case 'date':
      sortedFiles = sortByDate(sortedFiles);
      break;
  }

  args.filesData = sortedFiles;
  args.modifiedFilesData = sortedFiles;
};
```

---

## External Button Trigger

Trigger file input from external button elements.

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Method 1: Click the hidden input
document.getElementById('externalBrowseBtn')?.addEventListener('click', () => {
  const fileInput = document.querySelector('#fileupload') as HTMLInputElement;
  fileInput?.click();
});

// Method 2: Custom trigger with filter
document.getElementById('imageBrowseBtn')?.addEventListener('click', () => {
  const fileInput = document.querySelector('#fileupload') as HTMLInputElement;
  fileInput!.accept = '.jpg,.jpeg,.png,.gif';
  fileInput?.click();
});

// Method 3: Different categories
document.getElementById('documentBrowseBtn')?.addEventListener('click', () => {
  const fileInput = document.querySelector('#fileupload') as HTMLInputElement;
  fileInput!.accept = '.pdf,.doc,.docx,.xls,.xlsx';
  fileInput?.click();
});
```

HTML:
```html
<div class="button-group">
  <button id="externalBrowseBtn" class="btn">Browse Files</button>
  <button id="imageBrowseBtn" class="btn">Browse Images</button>
  <button id="documentBrowseBtn" class="btn">Browse Documents</button>
</div>

<input type="file" id="fileupload" />
```

---

## Validate Image on Drop

Validate images specifically when dropped. Use the `selected` event, which fires for both browse and drop actions. Check `args.event` to detect the event origin:

```typescript
import { Uploader, SelectedEventArgs, FileInfo } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  allowedExtensions: '.jpg,.jpeg,.png,.gif'
});
uploader.appendTo('#fileupload');

uploader.selected = (args: SelectedEventArgs) => {
  const validImages: FileInfo[] = [];
  const invalidImages: { name: string; reason: string }[] = [];

  args.filesData.forEach((file: FileInfo) => {
    if (!file.type.startsWith('image/')) {
      invalidImages.push({ name: file.name, reason: 'Not an image' });
    } else if (file.size > 5242880) { // 5 MB
      invalidImages.push({ name: file.name, reason: 'File too large' });
    } else {
      validImages.push(file);
    }
  });

  // Replace the file list with only valid images
  args.modifiedFilesData = validImages;
  args.isModified = true;

  if (invalidImages.length > 0) {
    console.warn('Invalid images:', invalidImages);
  }
};
```

---

## Accessibility (WAI-ARIA)

Implement WCAG 2.1 accessibility standards.

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Add ARIA attributes
const fileInput = document.getElementById('fileupload') as HTMLInputElement;
fileInput.setAttribute('aria-label', 'File upload');
fileInput.setAttribute('aria-describedby', 'fileHelp');

// Add ARIA live region for status messages
const statusRegion = document.createElement('div');
statusRegion.setAttribute('aria-live', 'polite');
statusRegion.setAttribute('aria-atomic', 'true');
statusRegion.id = 'uploadStatus';
document.body.appendChild(statusRegion);

// Update aria-live region on events
uploader.selected = (args: any) => {
  const message = `${args.filesData.length} file(s) selected. Ready to upload.`;
  statusRegion.textContent = message;
};

uploader.uploading = (args: any) => {
  statusRegion.textContent = `Uploading ${args.file.name}...`;
};

uploader.success = (args: any) => {
  statusRegion.textContent = `${args.file.name} uploaded successfully`;
};

uploader.failure = (args: any) => {
  statusRegion.textContent = `Error uploading ${args.file.name} (operation: ${args.operation})`;
};

// Keyboard navigation support
fileInput.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (e.target === fileInput) {
      fileInput.click();
    }
  }
});
```

HTML with accessibility:
```html
<div class="upload-section" role="region" aria-label="File upload section">
  <label for="fileupload" id="fileLabel">Upload Files:</label>
  <input 
    type="file" 
    id="fileupload" 
    aria-labelledby="fileLabel"
    aria-describedby="fileHelp"
    multiple
  />
  
  <p id="fileHelp" class="help-text">
    Accepted formats: JPG, PNG, PDF. Maximum size: 5MB per file.
  </p>
  
  <div id="uploadStatus" aria-live="polite" aria-atomic="true"></div>
</div>
```

---

## WAI-ARIA Compliance Standards

The Syncfusion Uploader component follows accessibility guidelines and standards, including ADA, Section 508, WCAG 2.2, and WAI-ARIA roles.

### Accessibility Compliance Summary

| Accessibility Criteria | Support |
|------------------------|---------|
| WCAG 2.2 | ✓ Full support |
| Section 508 | ✓ Full support |
| Screen Reader | ✓ Full support |
| Right-To-Left (RTL) | ✓ Full support |
| Color Contrast | ✓ Full support |
| Mobile Device | ✓ Full support |
| Keyboard Navigation | ✓ Full support |

### Keyboard Shortcuts

| Keyboard shortcut | Action |
|-------------------|--------|
| `Tab` | Move focus to next element |
| `Shift + Tab` | Move focus to previous element |
| `Enter` | Trigger the corresponding button action |
| `Esc` | Close the file browser dialog / cancel upload on drop |

### Basic Accessible Setup

The Uploader component provides built-in ARIA accessibility support for on-screen readers and assistive technology devices:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  }
});
uploader.appendTo('#fileupload');

// Add ARIA attributes
const fileInput = document.getElementById('fileupload') as HTMLInputElement;
fileInput.setAttribute('aria-label', 'File upload');
fileInput.setAttribute('aria-describedby', 'fileHelp');

// Add ARIA live region for status messages
const statusRegion = document.createElement('div');
statusRegion.setAttribute('aria-live', 'polite');
statusRegion.setAttribute('aria-atomic', 'true');
statusRegion.id = 'uploadStatus';
document.body.appendChild(statusRegion);

// Update aria-live region on events
uploader.selected = (args: any) => {
  statusRegion.textContent = `${args.filesData.length} file(s) selected. Ready to upload.`;
};
uploader.uploading = (args: any) => {
  statusRegion.textContent = `Uploading ${args.file.name}...`;
};
uploader.success = (args: any) => {
  statusRegion.textContent = `${args.file.name} uploaded successfully`;
};
uploader.failure = (args: any) => {
  statusRegion.textContent = `Error: ${args.operation} failed for ${args.file.name}`;
};
```

HTML with full accessibility attributes:
```html
<div class="upload-section" role="region" aria-label="File upload section">
  <label for="fileupload" id="fileLabel">Upload Files:</label>
  <input
    type="file"
    id="fileupload"
    aria-labelledby="fileLabel"
    aria-describedby="fileHelp"
    multiple
  />
  <p id="fileHelp" class="help-text">
    Accepted formats: JPG, PNG, PDF. Maximum size: 5MB per file.
  </p>
  <div id="uploadStatus" aria-live="polite" aria-atomic="true"></div>
</div>
```

---

## Next Steps

- **For setup**: Read [getting-started.md](getting-started.md)
- **For validation**: Read [file-validation.md](file-validation.md)
- **For styling**: Read [customization-and-styling.md](customization-and-styling.md)
- **For advanced features**: Read [advanced-features.md](advanced-features.md)
