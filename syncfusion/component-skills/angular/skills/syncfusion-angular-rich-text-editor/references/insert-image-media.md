# Inserting Images, Video, Audio & Files in Syncfusion Angular Rich Text Editor

## Table of Contents
- [Images Overview](#images-overview)
- [Image Upload to Server](#image-upload-to-server)
- [Image Save Format (Blob vs Base64)](#image-save-format)
- [Image Size Restriction](#image-size-restriction)
- [Secure Image Upload with Auth Header](#secure-image-upload-with-auth-header)
- [Video Insertion](#video-insertion)
- [Audio Insertion](#audio-insertion)
- [File Browser Integration](#file-browser-integration)
- [Common insertImageSettings Reference](#common-inserimagesettings-reference)

---

## Images Overview

Add `Image` to toolbar items. Requires `ImageService` in providers.

The image toolbar button opens a dialog that allows:
- Inserting by URL (web source)
- Uploading from local machine
- Using the file browser (if configured)

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarSettingsModel, QuickToolbarSettingsModel,
  ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      [toolbarSettings]="tools"
      [quickToolbarSettings]="quickTools">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class AppComponent {
  public tools: ToolbarSettingsModel = {
    items: ['Bold', 'Italic', '|', 'Image', '|', 'Undo', 'Redo']
  };
  public quickTools: QuickToolbarSettingsModel = {
    image: ['Replace', 'Align', 'WrapText', 'Caption', 'Remove',
            'InsertLink', 'OpenImageLink', '|',
            'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension']
  };
}
```

---

## Image Upload to Server

Use `insertImageSettings.saveUrl` to configure the server upload endpoint. `path` sets the public path for the saved images.

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ImageSettingsModel,
  ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      [toolbarSettings]="tools"
      [insertImageSettings]="imageSettings">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class AppComponent {
  public tools = { items: ['Image'] };
  public imageSettings: ImageSettingsModel = {
    saveUrl: '/api/Home/SaveImage',
    removeUrl: '/api/Home/RemoveImage',
    path: '/Uploads/'
  };
}
```

**ASP.NET Core server-side handler:**
```csharp
[AcceptVerbs("Post")]
public void SaveImage(IList<IFormFile> UploadFiles)
{
    foreach (IFormFile file in UploadFiles)
    {
        string filename = hostingEnv.WebRootPath + "\\Uploads\\" +
            ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

        if (!Directory.Exists(hostingEnv.WebRootPath + "\\Uploads"))
            Directory.CreateDirectory(hostingEnv.WebRootPath + "\\Uploads");

        if (!System.IO.File.Exists(filename))
        {
            using FileStream fs = System.IO.File.Create(filename);
            file.CopyTo(fs);
            Response.StatusCode = 200;
        }
    }
}
```

---

## Image Save Format

Images can be saved as `Blob` (default) or `Base64`:

```typescript
import { ImageSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

public imageSettings: ImageSettingsModel = {
  saveFormat: 'Base64'  // or 'Blob' (default)
};
```

- **Blob:** Generates a blob URL (`blob:http://...`) — use with server upload
- **Base64:** Embeds the image directly as a base64 string — no upload needed but increases content size

---

## Image Size Restriction

Restrict uploads to a maximum file size (bytes). Default is 30,000,000 bytes (30 MB):

```typescript
public imageSettings: ImageSettingsModel = {
  maxFileSize: 2000000  // 2 MB limit
};
```

---

## Secure Image Upload with Auth Header

Add authorization headers to the upload request via the `imageUploading` event:

```typescript
import { UploadingEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  template: `
    <ejs-richtexteditor
      [insertImageSettings]="imageSettings"
      (imageUploading)="onImageUploading($event)">
    </ejs-richtexteditor>
  `
})
export class AppComponent {
  public imageSettings: ImageSettingsModel = {
    saveUrl: '/api/SaveFiles',
    path: '/Files/'
  };

  onImageUploading(args: UploadingEventArgs): void {
    args.currentRequest.setRequestHeader('Authorization', 'Bearer YOUR_TOKEN');
  }
}
```

---

## Video Insertion

Requires `VideoService` in providers and `Video` in toolbar items:

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarSettingsModel, QuickToolbarSettingsModel,
  ToolbarService, LinkService, ImageService, HtmlEditorService,
  VideoService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      [toolbarSettings]="tools"
      [quickToolbarSettings]="quickTools">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
              VideoService, QuickToolbarService]
})
export class AppComponent {
  public tools: ToolbarSettingsModel = { items: ['Video'] };
  public quickTools: QuickToolbarSettingsModel = {
    showOnRightClick: true,
    video: ['VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoLayoutOption', 'VideoDimension']
  };
}
```

---

## Audio Insertion

Requires `AudioService` in providers and `Audio` in toolbar items:

```typescript
import {
  RichTextEditorModule, ToolbarService, LinkService, ImageService,
  HtmlEditorService, AudioService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

// In component:
// providers: [..., AudioService]
// template: <ejs-richtexteditor [toolbarSettings]="tools" [quickToolbarSettings]="quickTools">
public tools: ToolbarSettingsModel = { items: ['Audio'] };
public quickTools: QuickToolbarSettingsModel = {
  showOnRightClick: true,
  audio: ['AudioReplace', 'Remove', 'AudioLayoutOption']
};
```

---

## File Browser Integration

Allows browsing and selecting existing server files. Requires `FileManagerService`.

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarSettingsModel, FileManagerSettingsModel,
  ToolbarService, LinkService, ImageService, HtmlEditorService,
  FileManagerService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      [toolbarSettings]="tools"
      [fileManagerSettings]="fileManagerSettings">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
              FileManagerService, QuickToolbarService]
})
export class AppComponent {
  public tools: ToolbarSettingsModel = {
    items: ['Image', 'FileManager']
  };
  public fileManagerSettings: FileManagerSettingsModel = {
    enable: true,
    path: '/Pictures/Food',
    ajaxSettings: {
      url: '/api/FileManager/FileOperations',
      getImageUrl: '/api/FileManager/GetImage',
      uploadUrl: '/api/FileManager/Upload',
      downloadUrl: '/api/FileManager/Download'
    }
  };
}
```

---

## Common insertImageSettings Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `saveUrl` | string | — | Server endpoint to upload images |
| `removeUrl` | string | — | Server endpoint to delete uploaded images |
| `path` | string | — | Public path prefix for inserted image URLs |
| `saveFormat` | `'Blob' \| 'Base64'` | `'Blob'` | How to store images in content |
| `maxFileSize` | number | 30000000 | Max upload size in bytes |
| `width` | string | `'auto'` | Default width for inserted images |
| `height` | string | `'auto'` | Default height for inserted images |
| `allowedTypes` | string[] | `['.jpeg', '.jpg', '.png']` | Allowed file extensions |
