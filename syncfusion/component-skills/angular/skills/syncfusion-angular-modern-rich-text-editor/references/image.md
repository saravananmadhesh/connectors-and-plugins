# Image Handling

## Table of Contents
- [Overview](#overview)
- [Insert Images](#insert-images)
  - [Local Storage](#local-storage)
  - [Web URLs](#web-urls)
- [Image Configuration Options](#image-configuration-options)
  - [Allowed Image Formats (`allowedTypes`)](#allowed-image-formats-allowedtypes)
  - [Image Size Restrictions (`maxFileSize`)](#image-size-restrictions-maxfilesize)
  - [Image Save Formats (`saveFormat`)](#image-save-formats-saveformat)
  - [Limitations of Base64 & Blob](#limitations-of-base64--blob)
  - [Dimension (`dimension`)](#dimension-dimension)
  - [Image Display Options](#image-display-options)
    - [Display](#display)
  - [Image Resizing (`resize`)](#image-resizing-resize)
- [Image Quick Toolbar](#image-quick-toolbar)
  - [Caption](#caption)
  - [Alt Text](#alt-text)
  - [Replace](#replace)
  - [Text Wrap (`WrapText`)](#text-wrap-wraptext)
  - [Alignment (`Align`)](#alignment-align)
  - [Remove](#remove)
  - [Customizing Quick Toolbar Items](#customizing-quick-toolbar-items)
- [Remote Image Upload](#remote-image-upload)
  - [Writing an Endpoint for Image Upload](#writing-an-endpoint-for-image-upload)
  - [Rename Images Before Inserting](#rename-images-before-inserting)
  - [Secure image upload with authentication](#secure-image-upload-with-authentication)
- [Keyboard shortcut](#keyboard-shortcut)
- [API Reference](#api-reference)
  - [ImageDisplayMode](#imagedisplaymode)
  - [ImageSaveFormat](#imagesaveformat)
  - [ImageQuickToolbarItem](#imagequicktoolbaritem)
  - [ImageSettings](#imagesettings)
  - [ImageSettingsModel](#imagesettingsmodel)
  - [BackgroundColor](#backgroundcolor)
  - [BackgroundColorModel](#backgroundcolormodel)
  - [ColorModeType](#colormodetype)
  - [ColorPickerType](#colorpickertype)
  - [FontColor](#fontcolor)
  - [FontColorModel](#fontcolormodel)

---

## Overview

Image insertion in the Modern Rich Text Editor supports multiple methods to accommodate different workflows and use cases. The editor provides flexible options for inserting images from local storage and web URLs. This reference covers allowed formats, size restrictions, save formats, display options, resizing, the image quick toolbar, and remote upload.

## Insert Images

Image insertion in the Modern Rich Text Editor supports multiple methods to accommodate different workflows and use cases. The editor provides flexible options for inserting images from local storage and web URLs.

### Local Storage

To upload images from your local machine, click the `Image` tool in the toolbar. By default, this tool opens a dialog box where you can browse and select an image to insert from your local machine.

```ts
public imageSettings: object = {
    uploadUrl: 'https://api.example.com/upload',
    imageUrl: '/uploads/'
};
public toolbarSettings: object = {
    items: ['Image']
};
```

```html
<ejs-richtexteditor-ui
    [imageSettings]="imageSettings"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

### Web URLs

To insert an image from an online source, click the `Image` tool in the toolbar. By default, this tool opens a dialog box with an input field where you can provide the image URL from the web to insert the image.

```ts
public imageSettings: object = {
    uploadUrl: 'https://api.example.com/upload',
    imageUrl: '/uploads/'
};
public toolbarSettings: object = {
    items: ['Image']
};
```

```html
<ejs-richtexteditor-ui
    [imageSettings]="imageSettings"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

## Image Configuration Options

Comprehensive configuration options enable fine-tuned control over image insertion, storage, and display in the Modern Rich Text Editor. This section covers supported formats, size restrictions, save formats, and display configurations.

### Allowed Image Formats (`allowedTypes`)

The [`allowedTypes`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesettings#allowedTypes) property specifies the image file extensions that can be selected, dropped, pasted, or uploaded.

**Default Supported Formats:**
- JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- GIF (`.gif`)
- BMP (`.bmp`)
- WebP (`.webp`)

```ts
public imageSettings: object = {
    allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']
};
```

### Image Size Restrictions (`maxFileSize`)

The [`maxFileSize`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesettings#maxFileSize) property specifies the maximum permitted image file size in bytes.

```ts
public imageSettings: object = {
    // File size restriction (in bytes)
    maxFileSize: 5242880           // 5MB in bytes
};
```

### Image Save Formats (`saveFormat`)

The RichTextEditor supports two primary formats for saving images: Blob (server-based) and Base64 (embedded). Each format offers distinct advantages and trade-offs based on your use case.

#### Blob Format (Recommended - Default)

```ts
public imageSettings: object = {
    saveFormat: 'Blob'
};
```

#### Base64 Format

```ts
public imageSettings: object = {
    saveFormat: 'Base64'
};
```

### Limitations of Base64 & Blob

Understanding the limitations of each format helps you choose the right approach for your specific requirements.

#### Base64 Limitations

| Issue | Impact | Solution |
|-------|--------|----------|
| File size increase | 33% larger than original | Compress images first |
| Email compatibility | Large Base64 breaks email clients | Use URLs for emails |
| Performance | Slower parsing with many images | Limit to < 5 images per document |
| Mobile concerns | Large payload on mobile devices | Use Blob format for mobile apps |
| Debugging | Hard to inspect in dev tools | Use Blob for development |

#### Blob Limitations

| Issue | Impact | Solution |
|-------|--------|----------|
| Server storage required | Additional infrastructure | Plan storage capacity |
| Cross-domain issues | CORS restrictions | Configure CORS headers |
| Temporary files | Need cleanup mechanism | Implement file lifecycle management |
| Session dependency | Files tied to session | Persist files properly |

### Dimension (`dimension`)

Configure custom dimensions or preset sizes for images with min/max constraints. The [`dimension`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesettings#dimension) property allows you to set default and constraint values for image sizing. You can specify width and height as CSS strings (e.g., `'300px'`, `'auto'`) or numeric values (interpreted as pixels).

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    // Enable Dimension in quick toolbar
    public imageSettings: object = {
        uploadUrl: 'https://api.example.com/upload',
        imageUrl: '/uploads/',
        dimension: {
            width: '300px',
            height: 'auto',
            minWidth: '50px',
            maxWidth: '1000px',
            minHeight: '50px',
            maxHeight: '800px'
        }
    };
    public quickToolbarSettings: object = {
        image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
    };
}
```

```html
<ejs-richtexteditor-ui
    [imageSettings]="imageSettings"
    [quickToolbarSettings]="quickToolbarSettings">
</ejs-richtexteditor-ui>
```

### Image Display Options

Control how images are rendered and positioned within the editor content through display modes and wrapping options.

#### Display

Configure how images are rendered in the document - either flowing with text or on a separate line.

**Display Modes:**
- `inline` (default) - Image flows within the current text line
- `break` (block) - Image placed on a separate line

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    // Enable Display in quick toolbar
    public imageSettings: object = {
        uploadUrl: 'https://api.example.com/upload',
        imageUrl: '/uploads/'
    };
    public quickToolbarSettings: object = {
        image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
    };
}
```

```html
<ejs-richtexteditor-ui
    [imageSettings]="imageSettings"
    [quickToolbarSettings]="quickToolbarSettings">
</ejs-richtexteditor-ui>
```

### Image Resizing (`resize`)

Enable and configure image resizing with constraints and event tracking.

The [`resize`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesettings#resize) property controls whether images can be resized by users. By default, image resizing is enabled. Use the [`dimension`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesettings#dimension) property to set minimum and maximum constraints for resizable images.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    // Enable Image Resize with min/max constraints
    public imageSettings: object = {
        uploadUrl: 'https://api.example.com/upload',
        imageUrl: '/uploads/',
        resize: true,  // Enable resizing (default: true)
        dimension: {
            minWidth: '50px',
            maxWidth: '800px',
            minHeight: '50px',
            maxHeight: '600px'
        }
    };
    public quickToolbarSettings: object = {
        image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
    };
}
```

```html
<ejs-richtexteditor-ui
    [imageSettings]="imageSettings"
    [quickToolbarSettings]="quickToolbarSettings">
</ejs-richtexteditor-ui>
```

## Image Quick Toolbar

The Image Quick Toolbar provides instant access to common image operations when an image is selected in the editor. It offers a streamlined interface for managing image properties, alignment, sizing, and other aspects without requiring modal dialogs.

### Available Quick Toolbar Items

The Image Quick Toolbar appears automatically when an image is selected. It provides quick access to common image operations through dedicated toolbar buttons.

#### Caption

Captions are rendered as `<figcaption>` elements inside a `<figure>` container.

**HTML Output:**

```html
<figure>
    <img src="image.png" alt="Sample" class="e-img-inline" />
    <figcaption>Image Caption Text</figcaption>
</figure>
```

```ts
// Enable Caption in quick toolbar
public quickToolbarSettings: object = {
    image: ['Caption']
};
```

```html
<ejs-richtexteditor-ui [quickToolbarSettings]="quickToolbarSettings"></ejs-richtexteditor-ui>
```

#### Alt Text

Use the Alt Text quick toolbar item to add descriptive alternative text for the image.

```ts
// Enable Alt Text in quick toolbar (default)
public quickToolbarSettings: object = {
    image: ['AltText']
};
```

#### Replace

Use the Replace quick toolbar item to replace the currently selected image with a new image source.

```ts
// Enable Replace in quick toolbar
public quickToolbarSettings: object = {
    image: ['Replace']
};
```

#### Text Wrap (`WrapText`)

Control how text flows around the selected image using the Text Wrap quick toolbar item. Configure text wrapping to position images inline with text or allow text to wrap around them.

```ts
// Enable WrapText in quick toolbar
public quickToolbarSettings: object = {
    image: ['WrapText']
};
```

**Text Wrap Modes:**
- `'left'` - Wraps text to the right of the image
- `'right'` - Wraps text to the left of the image
- `'none'` - No text wrapping (default)

#### Alignment (`Align`)

Set horizontal alignment of the selected image using the Alignment quick toolbar item. You can align images to the left, center, or right within the editor.

```ts
// Enable Align in quick toolbar
public quickToolbarSettings: object = {
    image: ['Align']
};
```

**Available Alignment Options:**
- `'left'` - Align image to the left
- `'center'` - Center the image
- `'right'` - Align image to the right
- `'none'` - Remove alignment (default)

#### Remove

Delete the selected image from the editor using the Remove quick toolbar item. This provides a quick way to remove images without using the delete key.

```ts
// Enable Remove in quick toolbar (recommended)
public quickToolbarSettings: object = {
    image: ['Remove']
};
```

### Customizing Quick Toolbar Items

The Modern Rich Text Editor provides comprehensive customization options for the image quick toolbar, offering a rich set of tools including 'AltText', 'Caption', 'Align', 'Display', 'WrapText', 'Dimension', 'Replace', and 'Remove'. By configuring these toolbar items through the [`quickToolbarSettings`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/quickToolbarSettings) property, you can create a tailored editing experience that streamlines image operations.

**Default Quick Toolbar Items for Images:**
The default image quick toolbar includes:
- `AltText` - Edit alternative text
- `Caption` - Add/edit image caption
- `Align` - Align image (left, center, right, none)
- `Display` - Change display mode (inline, block)
- `WrapText` - Set text wrapping (left, right, none)
- `Dimension` - Adjust width and height
- `Replace` - Replace with a different image
- `Remove` - Delete the image

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    public quickToolbarSettings: object = {
        image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
    };
}
```

```html
<ejs-richtexteditor-ui [quickToolbarSettings]="quickToolbarSettings"></ejs-richtexteditor-ui>
```

## Remote Image Upload

Remote image upload enables centralized image management on your server, providing better control over storage, performance, and security. This section covers implementing a complete server-side upload pipeline with authentication and validation.

### Writing an Endpoint for Image Upload

When a user uploads an image through the RichTextEditor, the component sends the file to your server using the form field name `UploadFiles`. Your server processes the file and returns a JSON response containing the filename, which the editor combines with the [`imageUrl`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesettings#imageUrl) setting to create the final image source.

#### Client-Side Configuration

Configure the Modern Rich Text Editor component with the upload endpoint and base URL:

```ts
public imageSettings: object = {
    uploadUrl: 'https://api.example.com/images/upload',  // POST endpoint for uploads
    imageUrl: '/uploads/',                               // Base URL to resolve uploaded filenames
    removeUrl: 'https://api.example.com/images/remove',  // DELETE endpoint for removal
    allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],     // Allowed file types
    maxFileSize: 5 * 1024 * 1024                         // 5MB limit
};
```

```html
<ejs-richtexteditor-ui [imageSettings]="imageSettings"></ejs-richtexteditor-ui>
```

### Rename Images Before Inserting

You can implement server-side renaming to ensure all uploaded images follow your naming standards. The client receives the renamed filename and automatically inserts it using the [`imageUrl`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesettings#imageUrl) configuration.

#### Client-Side Configuration

```ts
public imageSettings: object = {
    uploadUrl: 'https://api.example.com/images/upload',
    imageUrl: '/uploads/'
};
```

```html
<ejs-richtexteditor-ui
    [imageSettings]="imageSettings"
    (fileUploadSuccess)="onFileUploadSuccess($event)">
</ejs-richtexteditor-ui>
```

```ts
public onFileUploadSuccess(args: any): void {
    if (args.source === 'Image') {
        console.log('Image uploaded successfully');
        console.log('Renamed filename:', args.response);
    }
}
```

### Secure image upload with authentication

You can add additional data with the image uploaded from the Modern Rich Text Editor on the client side, which can even be received on the server side. By using the `fileUploading` event and its arguments you can access the current request and set the request header within this event. On the server side, you can fetch the custom headers by accessing the form collection from the current request, which retrieves the values sent using the POST method.

#### Client-Side Configuration

```ts
public imageSettings: object = {
    uploadUrl: 'https://api.example.com/images/upload',
    imageUrl: '/uploads/'
};
```

```html
<ejs-richtexteditor-ui
    [imageSettings]="imageSettings"
    (fileUploading)="onFileUploading($event)">
</ejs-richtexteditor-ui>
```

```ts
public onFileUploading(args: any): void {
    args.currentRequest.setRequestHeader('Authorization', 'Syncfusion');
}
```

## Keyboard shortcut

| Action | Windows / Linux | macOS | Description |
| :--- | :--- | :--- | :--- |
| **Insert Image** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> | Opens the image upload dialog. |
---

## API Reference

### ImageDisplayMode

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagedisplaymode>

Default display mode for inserted images.

- `'inline'` — Places the image within the current text flow.
- `'break'` — Places the image on a separate line.

Members: `inline`, `break`.

---

### ImageSaveFormat

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesaveformat>

Local representation chosen for the next image insertion when the editor uses a local proxy source (no `uploadUrl`).

- `Blob`
- `Base64`

---

### ImageQuickToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagequicktoolbaritem>

Members:

- `AltText`
- `Caption`
- `Align`
- `Display`
- `WrapText`
- `Dimension`
- `Replace`
- `Remove`
- `|`
- `CustomToolbarItem`

---

### ImageSettings

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesettings>

Configures the image settings of the RichTextEditor.

#### Properties

- `allowedTypes: string[]` — Specifies the image file extensions that can be selected, dropped, pasted, or uploaded. API names use TypeScript camel casing. Defaults to `['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']`.
- `dimension: ImageDimensionOptions` — Specifies the default and permitted dimensions of an image. Defaults to `{ width: 'auto', height: 'auto', minWidth: 0, maxWidth: null, minHeight: 0, maxHeight: null }`.
- `display: ImageDisplayMode` — Specifies how an image is positioned in the editor content. Possible values are: `inline` (places the image within the current text flow), `break` (places the image on a separate line). Defaults to `'inline'`.
- `imageUrl: string | null` — Specifies the public base URL used to resolve uploaded image names returned by the server. For example, when `imageUrl` is `/uploads/images/` and the server returns `sample.png`, the resulting source is `/uploads/images/sample.png`. Defaults to `null`.
- `maxFileSize: number` — Specifies the maximum permitted image file size, in bytes. Defaults to `30000000`.
- `removeUrl: string | null` — Specifies the server endpoint used to remove an uploaded image. Defaults to `null`.
- `resize: boolean` — Specifies whether users can resize images in the editor. Defaults to `true`.
- `saveFormat: ImageSaveFormat` — Specifies how local images are represented when an upload endpoint is not configured. Possible values are: `Blob` (creates a temporary object URL for the image), `Base64` (embeds the image as a Base64 data URL). Defaults to `'Blob'`.
- `uploadUrl: string | null` — Specifies the server endpoint used to upload image files. When this property is not configured, the editor uses `saveFormat` to create a local image source. Defaults to `null`.

---

### ImageSettingsModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/imagesettingsmodel>

Interface for a class `ImageSettings`.

#### Properties

- `allowedTypes: string[]` — Specifies the image file extensions that can be selected, dropped, pasted, or uploaded. API names use TypeScript camel casing.
- `dimension: ImageDimensionOptions` — Specifies the default and permitted dimensions of an image.
- `display: ImageDisplayMode` — Specifies how an image is positioned in the editor content. Possible values are: `inline` (places the image within the current text flow), `break` (places the image on a separate line).
- `imageUrl: string | null` — Specifies the public base URL used to resolve uploaded image names returned by the server. For example, when `imageUrl` is `/uploads/images/` and the server returns `sample.png`, the resulting source is `/uploads/images/sample.png`.
- `maxFileSize: number` — Specifies the maximum permitted image file size, in bytes.
- `removeUrl: string | null` — Specifies the server endpoint used to remove an uploaded image.
- `resize: boolean` — Specifies whether users can resize images in the editor.
- `saveFormat: ImageSaveFormat` — Specifies how local images are represented when an upload endpoint is not configured. Possible values are: `Blob` (creates a temporary object URL for the image), `Base64` (embeds the image as a Base64 data URL).
- `uploadUrl: string | null` — Specifies the server endpoint used to upload image files. When this property is not configured, the editor uses `saveFormat` to create a local image source.

---

### BackgroundColor

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/backgroundcolor>

Defines the configuration for the background color (text highlight color) picker.

#### Properties

- `columns: number` — Specifies the number of columns in the color palette. Defaults to `5`.
- `default: string` — Specifies the default background color. Defaults to `'#FFF7C7'`.
- `mode: ColorModeType` — Specifies the color mode. Defaults to `'Palette'`.
- `modeSwitcher: boolean` — Enables or disables the mode switcher button. Defaults to `false`.
- `preset: { [key: string]: string[] }` — Specifies custom color codes keyed by group label. Defaults to `{ Custom: ['#000000', '#FFFFFF', '#FCE3E0', '#FFEDD4', '#EBF7D1', '#FFF7C7', '#DBF5E0', '#D6F5EB', '#D4F2F2', '#D4F0FA', '#DBEBFC', '#E0E5FC', '#E5E3FC', '#EDE0FC', '#F2E0FC', '#FAE0F2', '#FCE0E8', '#FCE0E3', '#F5EBDE', '#F7F2E0', '#F0F2DB', '#E5EBF0', '#EDEDED', '#E0E0E5', '#DEE0EB'] }`.
- `showRecentColors: boolean` — Indicates whether the recent colors section is shown in the picker. Defaults to `true`.

---

### BackgroundColorModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/backgroundcolormodel>

Interface for a class `BackgroundColor`.

#### Properties

- `columns: number` — Specifies the number of columns in the color palette.
- `default: string` — Specifies the default background color.
- `mode: ColorModeType` — Specifies the color mode.
- `modeSwitcher: boolean` — Enables or disables the mode switcher button.
- `preset: { [key: string]: string[] }` — Specifies custom color codes keyed by group label.
- `showRecentColors: boolean` — Indicates whether the recent colors section is shown in the picker.

---

### ColorModeType

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/colormodetype>

Enumerates the color picker display modes supported by the font color and background color pickers.

- `Palette` — Renders a fixed swatch grid.
- `Picker` — Renders an inline color picker only (no palette).

Members: `Palette`, `Picker`.

---

### ColorPickerType

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/colorpickertype>

Identifies which editor color picker triggered an event or is being referenced in a payload.

- `FontColor`
- `BackgroundColor`

---

### FontColor

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontcolor>

Defines the configuration for the font color picker. Controls the default color, color palette, mode, number of columns, mode switcher, and recent-colors visibility shown in the FontColor toolbar item.

#### Properties

- `columns: number` — Specifies the number of columns in the color palette. Defaults to `5`.
- `default: string` — Specifies the default font color. Defaults to `'#DC2626'`.
- `mode: ColorModeType` — Specifies the color mode. Defaults to `'Palette'`.
- `modeSwitcher: boolean` — Enables or disables the mode switcher button. Defaults to `false`.
- `preset: { [key: string]: string[] }` — Specifies custom color codes keyed by group label. Defaults to `{ Custom: ['#000000', '#FFFFFF', '#DC2626', '#B8590D', '#8C7000', '#5B21B6', '#4D700F', '#1F7333', '#146B52', '#0D6666', '#0A6185', '#1A5499', '#2640A6', '#383399', '#612E9E', '#732494', '#941F6B', '#9E2447', '#992938', '#704724', '#7A612E', '#5C611F', '#404C61', '#4D4D4D', '#242947'] }`.
- `showRecentColors: boolean` — Indicates whether the recent colors section is shown in the picker. Defaults to `true`.

---

### FontColorModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontcolormodel>

Interface for a class `FontColor`.

#### Properties

- `columns: number` — Specifies the number of columns in the color palette.
- `default: string` — Specifies the default font color.
- `mode: ColorModeType` — Specifies the color mode.
- `modeSwitcher: boolean` — Enables or disables the mode switcher button.
- `preset: { [key: string]: string[] }` — Specifies custom color codes keyed by group label.
- `showRecentColors: boolean` — Indicates whether the recent colors section is shown in the picker.
