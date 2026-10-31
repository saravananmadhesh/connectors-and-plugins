# Advanced Features

Explore JWT authentication, localization, image preview/resize, and complex upload workflows.

## Table of Contents
- [JWT Authentication](#jwt-authentication)
- [Localization & Multi-Language](#localization--multi-language)
- [File Preview](#file-preview)
- [Image Resizing](#image-resizing)
- [Template Customization](#template-customization)
- [Form Data Binding](#form-data-binding)
- [File Removal & Cleanup](#file-removal--cleanup)

> **Note:** The Localization section includes a full reference table of all available localization keys.

---

## JWT Authentication

### Secure Upload with Bearer Token

Use the `uploading` and `removing` events along with `currentRequest.setRequestHeader` to add JWT tokens to upload and remove requests:

```typescript
import { Uploader, RemovingEventArgs } from '@syncfusion/ej2-inputs';

const token = 'Your.JWT.Token'; // Replace with a valid JWT token

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  uploading: onFileUploading,
  removing: onFileRemove
});
uploader.appendTo('#fileupload');

function onFileUploading(args: any): void {
  // Add JWT to request header before file upload
  args.currentRequest.setRequestHeader('Authorization', `Bearer ${token}`);
}

function onFileRemove(args: RemovingEventArgs): void {
  // Add JWT to request header before file removal
  args.postRawFile = false;
  args.currentRequest.setRequestHeader('Authorization', `Bearer ${token}`);
}
```

> Replace `Your.JWT.Token` with a valid JWT issued by your authentication system for production use.

### Server-Side Token Validation (ASP.NET Core)

```csharp
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

public class HomeController : Controller
{
    private readonly string _uploads = Path.Combine(
        Directory.GetCurrentDirectory(), "Uploaded Files");

    public async Task<IActionResult> Save(IFormFile UploadFiles)
    {
        if (!IsAuthorized())
            return Unauthorized();

        if (UploadFiles == null || UploadFiles.Length == 0)
            return BadRequest("Invalid file.");

        Directory.CreateDirectory(_uploads);
        var filePath = Path.Combine(_uploads, UploadFiles.FileName);
        var append = UploadFiles.ContentType == "application/octet-stream"; // chunk upload
        await SaveFileAsync(UploadFiles, filePath, append);
        return Ok();
    }

    public IActionResult Remove(string UploadFiles)
    {
        if (!IsAuthorized())
            return Unauthorized();

        var filePath = Path.Combine(_uploads, UploadFiles);
        if (System.IO.File.Exists(filePath))
            System.IO.File.Delete(filePath);
        return Ok();
    }

    private bool IsAuthorized()
    {
        var authorizationHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authorizationHeader)
            || !authorizationHeader.StartsWith("Bearer "))
            return false;
        var token = authorizationHeader["Bearer ".Length..];
        return token == "Your.JWT.Token"; // Replace with real JWT validation
    }

    private async Task SaveFileAsync(IFormFile file, string path, bool append)
    {
        await using var fileStream = new FileStream(
            path, append ? FileMode.Append : FileMode.Create);
        await file.CopyToAsync(fileStream);
    }
}
```

---

## Localization & Multi-Language

### Localization Keys Reference

The following keys are available to customize the uploader's static text content:

| Key | Description |
|-----|-------------|
| `Browse` | Customize the browse button text |
| `Clear` | Customize the clear button text |
| `Upload` | Customize the upload button text |
| `dropFilesHint` | Customize the drop area text |
| `uploadFailedMessage` | Status text when file upload fails |
| `uploadSuccessMessage` | Status text when file uploads successfully |
| `removedSuccessMessage` | Status text when file is removed from server |
| `removedFailedMessage` | Status text when file removal fails |
| `inProgress` | Status text while upload is in progress |
| `pauseUpload` | Status text while uploading is paused |
| `fileUploadCancel` | Status text when upload is canceled |
| `readyToUploadMessage` | Status text when file is ready to upload |
| `invalidMaxFileSize` | Status text when file size exceeds maximum |
| `invalidFileType` | Status text when file type is invalid |
| `invalidMinFileSize` | Status text when file size is below minimum |
| `remove` | Tooltip text for the remove icon |
| `cancel` | Tooltip text for the cancel icon |
| `delete` | Tooltip text for the delete icon |
| `totalFiles` | Tooltip text for total files indicator |
| `size` | Tooltip text for size indicator |

### Setup Localization

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';
import { L10n } from '@syncfusion/ej2-base';

// Define custom localization strings
L10n.load({
  'fr-CH': {
    'uploader': {
      'invalidMinFileSize': 'La taille du fichier est trop petite! S\'il vous plaît télécharger des fichiers avec une taille minimale de 10 Ko',
      'invalidMaxFileSize': 'La taille du fichier dépasse 28 Mo',
      'invalidFileType': 'Le type de fichier n\'est pas autorisé',
      'Browse': 'Feuilleter',
      'Clear': 'Clair',
      'Upload': 'Télécharger',
      'dropFilesHint': 'ou Déposer des fichiers ici',
      'uploadFailedMessage': 'Impossible d\'importer le fichier',
      'uploadSuccessMessage': 'Fichier téléchargé avec succès',
      'removedSuccessMessage': 'Fichier supprimé avec succès',
      'removedFailedMessage': 'Le fichier n\'a pas pu être supprimé',
      'inProgress': 'Téléchargement',
      'readyToUploadMessage': 'Prêt à télécharger',
      'remove': 'Retirer',
      'cancel': 'Annuler',
      'delete': 'Supprimer le fichier',
      'totalFiles': 'Total des fichiers',
      'size': 'taille'
    }
  },
  'es': {
    'uploader': {
      'Browse': 'Elegir archivo',
      'Clear': 'Limpiar todo',
      'Upload': 'Cargar archivos',
      'dropFilesHint': 'Suelta los archivos aquí para cargar',
      'invalidFileType': 'Tipo de archivo no compatible'
    }
  }
});

// Create uploader with French (Swiss) locale
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  locale: 'fr-CH'
});
uploader.appendTo('#fileupload');
```

### Language Switcher

```typescript
class MultiLanguageUploader {
  private uploader: Uploader;
  private currentLocale = 'en';

  constructor() {
    this.uploader = new Uploader({
      asyncSettings: {
        saveUrl: 'https://api.example.com/upload',
        removeUrl: 'https://api.example.com/remove'
      },
      locale: 'en'
    });
    this.uploader.appendTo('#fileupload');
    this.setupLanguageSwitcher();
  }

  private setupLanguageSwitcher(): void {
    document.querySelectorAll('.language-selector').forEach(btn => {
      btn.addEventListener('click', (e: any) => {
        const locale = e.target.dataset.locale;
        this.switchLanguage(locale);
      });
    });
  }

  private switchLanguage(locale: string): void {
    this.currentLocale = locale;
    this.uploader.locale = locale;
    // Recreate component to apply new locale
    this.uploader.destroy();
    this.uploader = new Uploader({
      asyncSettings: {
        saveUrl: 'https://api.example.com/upload',
        removeUrl: 'https://api.example.com/remove'
      },
      locale: locale
    });
    this.uploader.appendTo('#fileupload');
  }
}

// Usage
new MultiLanguageUploader();
```

HTML:
```html
<div>
  <button class="language-selector" data-locale="en">English</button>
  <button class="language-selector" data-locale="es">Español</button>
  <button class="language-selector" data-locale="fr">Français</button>
  <button class="language-selector" data-locale="ar">العربية</button>
</div>

<input type="file" id="fileupload" />
```

---

## File Preview

### Image Preview Before Upload

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

class ImagePreviewUploader {
  private uploader: Uploader;

  constructor() {
    this.uploader = new Uploader({
      asyncSettings: {
        saveUrl: 'https://api.example.com/upload',
        removeUrl: 'https://api.example.com/remove'
      },
      allowedExtensions: '.jpg,.jpeg,.png,.gif,.webp'
    });
    this.uploader.appendTo('#fileupload');
    this.attachPreviewHandler();
  }

  private attachPreviewHandler(): void {
    this.uploader.selected = (args: any) => {
      const previewContainer = document.getElementById('preview');
      if (previewContainer) {
        previewContainer.innerHTML = ''; // Clear previous previews
      }

      args.filesData.forEach((file: any) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const preview = document.createElement('div');
          preview.className = 'image-preview';
          preview.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}" />
            <p>${file.name}</p>
            <small>${(file.size / 1024).toFixed(2)} KB</small>
          `;
          
          previewContainer?.appendChild(preview);
        };

        reader.readAsDataURL(file.rawFile);
      });
    };
  }
}

new ImagePreviewUploader();
```

HTML:
```html
<input type="file" id="fileupload" accept="image/*" multiple />
<div id="preview" class="preview-container"></div>
```

CSS:
```css
.preview-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.image-preview {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background: #f9f9f9;
}

.image-preview img {
  max-width: 100%;
  max-height: 120px;
  margin-bottom: 10px;
}

.image-preview p {
  margin: 5px 0;
  font-weight: 600;
  word-break: break-word;
}

.image-preview small {
  color: #999;
}
```

### Document Preview

```typescript
uploader.selected = (args: any) => {
  args.filesData.forEach((file: any) => {
    // For PDF files
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Use PDF.js library
        const loadingTask = pdfjsLib.getDocument(e.target.result);
        loadingTask.promise.then((pdf: any) => {
          console.log(`PDF loaded: ${pdf.numPages} pages`);
        });
      };
      reader.readAsArrayBuffer(file.rawFile);
    }
  });
};
```

---

## Image Resizing

### Resize Images Before Upload

```typescript
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';

class ImageResizeUploader {
  private uploader: Uploader;
  private maxWidth = 800;
  private maxHeight = 600;
  private quality = 0.8;

  constructor() {
    this.uploader = new Uploader({
      asyncSettings: {
        saveUrl: 'https://api.example.com/upload',
        removeUrl: 'https://api.example.com/remove'
      },
      allowedExtensions: '.jpg,.jpeg,.png'
    });
    this.uploader.appendTo('#fileupload');
    this.attachResizeHandler();
  }

  private attachResizeHandler(): void {
    this.uploader.selected = async (args: SelectedEventArgs) => {
      const resizedFiles = [];

      for (const file of args.filesData) {
        if (file.type.startsWith('image/')) {
          const resized = await this.resizeImage(file.rawFile);
          resizedFiles.push(resized);
        } else {
          resizedFiles.push(file.rawFile);
        }
      }

      // Replace files with resized versions
      args.modifiedFilesData = resizedFiles.map((file, index) => ({
        name: args.filesData[index].name,
        rawFile: file,
        size: file.size,
        type: file.type
      }));
    };
  }

  private resizeImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          // Calculate new dimensions
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > this.maxWidth) {
              height = (height * this.maxWidth) / width;
              width = this.maxWidth;
            }
          } else {
            if (height > this.maxHeight) {
              width = (width * this.maxHeight) / height;
              height = this.maxHeight;
            }
          }

          // Create canvas and resize
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob: Blob | null) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Image resize failed'));
              }
            },
            file.type,
            this.quality
          );
        };

        img.onerror = () => reject(new Error('Image load failed'));
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }
}

new ImageResizeUploader();
```

---

## Template Customization

### File List Template

Use the `template` property to customize the default appearance of each file in the list. Handle remove and progress bar actions using the corresponding events when a template is defined:

```typescript
import { Uploader, FileInfo, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import { detach } from '@syncfusion/ej2-base';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  template: "<span class='wrapper'><span class='icon sf-icon-${type}'></span>" +
    "<span class='name file-name'>${name}</span></span>" +
    "<span class='file-size-td file-size'>${size} bytes</span> " +
    "<span class='e-icons e-file-remove-btn' title='Remove'></span> <br/> " +
    "<progress id='progressBar' class='progressbar' value='0' max='100'></progress> " +
    "<span class='percent-td percent'></span>",
  dropArea: document.getElementById('dropArea'),
  progress: onFileUpload,
  selected: onSelect,
  success: onUploadSuccess,
  failure: onUploadFailed
});
uploader.appendTo('#fileupload');

function onFileUpload(args: any): void {
  const li = (uploader as any).uploadWrapper.querySelector(
    '[data-file-name="' + args.file.name + '"]') as HTMLElement;
  const progressValue = Math.round((args.e.loaded / args.e.total) * 100);
  li.getElementsByTagName('progress')[0].value = progressValue;
  li.getElementsByClassName('percent')[0].textContent = progressValue.toString() + ' %';
}

function onUploadSuccess(args: any): void {
  const li = (uploader as any).uploadWrapper.querySelector(
    '[data-file-name="' + args.file.name + '"]') as HTMLElement;
  if (args.operation === 'remove') {
    // Handle remove success
  } else {
    const progressBar = li.getElementsByTagName('progress')[0];
    progressBar.classList.add('e-upload-success');
    li.getElementsByClassName('percent')[0].classList.add('e-upload-success');
  }
}

function onUploadFailed(args: any): void {
  const li = (uploader as any).uploadWrapper.querySelector(
    '[data-file-name="' + args.file.name + '"]') as HTMLElement;
  const progressBar = li.getElementsByTagName('progress')[0];
  progressBar.classList.add('e-upload-failed');
  li.getElementsByClassName('percent')[0].classList.add('e-upload-failed');
}

function onSelect(args: SelectedEventArgs): void {
  // Handle file selection
}
```

### Custom Template (showFileList: false)

Design a fully custom file list by disabling the default list with `showFileList: false`. When using a custom template, pass `true` as the second argument to `upload()` and `remove()` methods:

```typescript
import { Uploader, FileInfo } from '@syncfusion/ej2-inputs';
import { createElement, isNullOrUndefined, detach, EventHandler } from '@syncfusion/ej2-base';

let filesDetails: FileInfo[] = [];
let filesList: HTMLElement[] = [];

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  dropArea: document.querySelector('.control_wrapper') as HTMLElement,
  selected: onFileSelect,
  progress: onFileUpload,
  success: onUploadSuccess,
  failure: onUploadFailed,
  removing: onFileRemove
});
uploader.appendTo('#fileupload');

function onFileSelect(args: any): void {
  // Create custom file list items
  for (let i = 0; i < args.filesData.length; i++) {
    const liEle = createElement('li', {
      className: 'file-lists',
      attrs: { 'data-file-name': args.filesData[i].name }
    });
    liEle.appendChild(createElement('span', {
      className: 'file-name',
      innerHTML: args.filesData[i].name
    }));
    liEle.appendChild(createElement('span', {
      className: 'file-size',
      innerHTML: uploader.bytesToSize(args.filesData[i].size)
    }));
    // Append to custom list
    document.querySelector('.ul-element')?.appendChild(liEle);
    filesList.push(liEle);
  }
  filesDetails = filesDetails.concat(args.filesData);
  // Pass `true` for custom template upload
  uploader.upload(args.filesData, true);
  args.cancel = true;
}

function onFileRemove(args: any): void {
  // Handle custom removal logic
  if (!isNullOrUndefined(args.currentTarget)) {
    if (filesDetails[filesList.indexOf(args.currentTarget.parentElement)].statusCode !== '2') {
      detach(args.currentTarget.parentElement);
      filesList.splice(filesList.indexOf(args.currentTarget.parentElement), 1);
    }
  }
}

function onFileUpload(args: any): void {
  const li = document.querySelector('[data-file-name="' + args.file.name + '"]');
  const progressValue = Math.round((args.e.loaded / args.e.total) * 100);
  if (!isNaN(progressValue) && li) {
    (li.getElementsByTagName('progress')[0] as HTMLProgressElement).value = progressValue;
  }
}

function onUploadSuccess(args: any): void { /* Handle success */ }
function onUploadFailed(args: any): void { /* Handle failure */ }
```

> When using a custom template, use `UploaderObj.upload(filesData, true)` and `UploaderObj.remove(filesData, true)` to ensure the component processes files correctly with the custom UI.

---

## Form Data Binding

### Integrate with Form Submission

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

class FormWithUpload {
  private uploader: Uploader;

  constructor() {
    this.uploader = new Uploader({
      asyncSettings: {
        saveUrl: 'https://api.example.com/upload',
        removeUrl: 'https://api.example.com/remove'
      },
      autoUpload: false
    });
    this.uploader.appendTo('#fileupload');
    this.setupFormSubmission();
  }

  private setupFormSubmission(): void {
    document.getElementById('submitForm')?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this.submitFormWithFiles();
    });
  }

  private async submitFormWithFiles(): Promise<void> {
    const form = document.getElementById('myForm') as HTMLFormElement;
    const formData = new FormData(form);

    // Add files from uploader
    const files = this.uploader.getFilesData();
    files.forEach((file: any, index: number) => {
      formData.append(`attachments[${index}]`, file.rawFile);
    });

    try {
      const response = await fetch('https://api.example.com/submit-form', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        alert('Form submitted successfully!');
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Form submission failed. Please try again.');
    }
  }
}

new FormWithUpload();
```

HTML:
```html
<form id="myForm">
  <input type="text" name="fullName" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <textarea name="message" placeholder="Message" required></textarea>
  
  <label>Attachments:</label>
  <input type="file" id="fileupload" name="attachments" multiple />
  
  <button type="button" id="submitForm">Submit Form</button>
</form>
```

---

## File Removal & Cleanup

### Handle File Removal

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');

// Before a file is removed (can cancel)
uploader.removing = (args: RemovingEventArgs) => {
  console.log('Files being removed:', args.filesData);
  args.filesData.forEach((file: FileInfo) => {
    console.log(`Removing: ${file.name} (${file.size} bytes)`);
  });
};

// Before file list is cleared
uploader.clearing = (args: ClearingEventArgs) => {
  console.log('File list clearing. Files:', args.filesData);
};
```

### Clear All Files Programmatically

```typescript
// Clear all files
document.getElementById('clearAllBtn')?.addEventListener('click', () => {
  uploader.clearAll();
  console.log('All files cleared');
});

// Remove specific file
function removeFileByName(fileName: string): void {
  const files = uploader.getFilesData();
  const fileToRemove = files.find(f => f.name === fileName);
  
  if (fileToRemove) {
    uploader.remove(fileToRemove);
  }
}
```

---

## Next Steps

- **For styling**: Read [customization-and-styling.md](customization-and-styling.md)
- **For troubleshooting**: Read [troubleshooting-and-examples.md](troubleshooting-and-examples.md)
- **For validation**: Read [file-validation.md](file-validation.md)
