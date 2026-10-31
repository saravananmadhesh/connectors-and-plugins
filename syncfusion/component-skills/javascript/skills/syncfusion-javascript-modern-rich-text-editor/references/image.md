# Images in Syncfusion JavaScript Modern Rich Text Editor

Image insertion in the Modern Rich Text Editor supports multiple methods to accommodate different workflows and use cases. The editor provides flexible options for inserting images from local storage and web URLs, comprehensive configuration of supported formats, size restrictions, save formats, display modes, resizing, and a contextual quick toolbar that surfaces the most relevant image operations.

## Table of contents

- [Insert an image](#insert-an-image)
- [Configuration options](#configuration-options)
- [Dimension](#dimension)
- [Display options](#display-options)
- [Resizing](#resizing)
- [Image quick toolbar](#image-quick-toolbar)
- [Remote upload](#remote-upload)
- [Keyboard shortcut](#keyboard-shortcut)
- [API references](#api-references)

## Insert an image

### Local storage

To upload images from your local machine, click the `Image` tool in the toolbar. By default, this tool opens a dialog box where you can browse and select an image to insert from your local machine.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor = new RichTextEditorUI({
    imageSettings: {
        uploadUrl: 'https://api.example.com/upload',
        imageUrl: '/uploads/'
    },
    toolbarSettings: {
        items: ['Image']
    }
});

editor.appendTo('#editor');
```

### Web URLs

To insert an image from an online source, click the `Image` tool in the toolbar. By default, this tool opens a dialog box with an input field where you can provide the image URL from the web to insert the image.

## Configuration options

### Allowed image formats

The `allowedTypes` property specifies the image file extensions that can be selected, dropped, pasted, or uploaded.

Default supported formats:

- JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- GIF (`.gif`)
- BMP (`.bmp`)
- WebP (`.webp`)

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor = new RichTextEditorUI({
    imageSettings: {
        allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']
    }
});

editor.appendTo('#editor');
```

### Image size restrictions

The `maxFileSize` property specifies the maximum permitted image file size in bytes.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor = new RichTextEditorUI({
    imageSettings: {
        // File size restriction (in bytes)
        maxFileSize: 5242880           // 5MB in bytes
    }
});

editor.appendTo('#editor');
```

### Image save formats

The RichTextEditor supports two primary formats for saving images: Blob (server-based) and Base64 (embedded). Each format offers distinct advantages and trade-offs based on your use case.

#### Blob format (recommended, default)

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor = new RichTextEditorUI({
    imageSettings: {
        saveFormat: 'Blob'
    }
});

editor.appendTo('#editor');
```

#### Base64 format

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor = new RichTextEditorUI({
    imageSettings: {
        saveFormat: 'Base64'
    }
});

editor.appendTo('#editor');
```

### Limitations of Base64 & Blob

Understanding the limitations of each format helps you choose the right approach for your specific requirements.

Base64 limitations:

| Issue | Impact | Solution |
| --- | --- | --- |
| File size increase | 33% larger than original | Compress images first |
| Email compatibility | Large Base64 breaks email clients | Use URLs for emails |
| Performance | Slower parsing with many images | Limit to < 5 images per document |
| Mobile concerns | Large payload on mobile devices | Use Blob format for mobile apps |
| Debugging | Hard to inspect in dev tools | Use Blob for development |

Blob limitations:

| Issue | Impact | Solution |
| --- | --- | --- |
| Server storage required | Additional infrastructure | Plan storage capacity |
| Cross-domain issues | CORS restrictions | Configure CORS headers |
| Temporary files | Need cleanup mechanism | Implement file lifecycle management |
| Session dependency | Files tied to session | Persist files properly |

## Dimension

Configure custom dimensions or preset sizes for images with min/max constraints. The `dimension` property allows you to set default and constraint values for image sizing. You can specify width and height as CSS strings (e.g., `'300px'`, `'auto'`) or numeric values (interpreted as pixels).

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Enable Dimension in quick toolbar
const editor = new RichTextEditorUI({
    imageSettings: {
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
    },
    quickToolbarSettings: {
        image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
    }
});

editor.appendTo('#editor');
```

## Display options

Control how images are rendered and positioned within the editor content through display modes and wrapping options.

### Display

Configure how images are rendered in the document — either flowing with text or on a separate line.

Display modes:

- `inline` (default) — Image flows within the current text line.
- `break` (block) — Image placed on a separate line.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Enable Display in quick toolbar
const editor = new RichTextEditorUI({
    imageSettings: {
        uploadUrl: 'https://api.example.com/upload',
        imageUrl: '/uploads/'
    },
    quickToolbarSettings: {
        image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
    }
});

editor.appendTo('#editor');
```

## Resizing

The `resize` property controls whether images can be resized by users. By default, image resizing is enabled. Use the `dimension` property to set minimum and maximum constraints for resizable images.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Enable Image Resize with min/max constraints
const editor = new RichTextEditorUI({
    imageSettings: {
        uploadUrl: 'https://api.example.com/upload',
        imageUrl: '/uploads/',
        resize: true,  // Enable resizing (default: true)
        dimension: {
            minWidth: '50px',
            maxWidth: '800px',
            minHeight: '50px',
            maxHeight: '600px'
        }
    },
    quickToolbarSettings: {
        image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
    }
});

editor.appendTo('#editor');
```

## Image quick toolbar

The Image Quick Toolbar provides instant access to common image operations when an image is selected in the editor. It appears automatically when an image is selected. It offers a streamlined interface for managing image properties, alignment, sizing, and other aspects without requiring modal dialogs.

### Caption

Captions are rendered as `<figcaption>` elements inside a `<figure>` container.

```html
<figure>
    <img src="image.png" alt="Sample" class="e-img-inline" />
    <figcaption>Image Caption Text</figcaption>
</figure>
```

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Enable Caption in quick toolbar
const editor = new RichTextEditorUI({
    quickToolbarSettings: {
        image: ['Caption']
    }
});

editor.appendTo('#editor');
```

### Alt Text

Use the Alt Text quick toolbar item to add descriptive alternative text for the image.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Enable Alt Text in quick toolbar (default)
const editor = new RichTextEditorUI({
    quickToolbarSettings: {
        image: ['AltText']
    }
});

editor.appendTo('#editor');
```

### Replace

Use the Replace quick toolbar item to replace the currently selected image with a new image source.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Enable Replace in quick toolbar
const editor = new RichTextEditorUI({
    quickToolbarSettings: {
        image: ['Replace']
    }
});

editor.appendTo('#editor');
```

### Text Wrap

Control how text flows around the selected image using the Text Wrap quick toolbar item. Configure text wrapping to position images inline with text or allow text to wrap around them.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Enable WrapText in quick toolbar
const editor = new RichTextEditorUI({
    quickToolbarSettings: {
        image: ['WrapText']
    }
});

editor.appendTo('#editor');
```

Text wrap modes:

- `'left'` — Wraps text to the right of the image.
- `'right'` — Wraps text to the left of the image.
- `'none'` — No text wrapping (default).

### Alignment

Set horizontal alignment of the selected image using the Alignment quick toolbar item. You can align images to the left, center, or right within the editor.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Enable Align in quick toolbar
const editor = new RichTextEditorUI({
    quickToolbarSettings: {
        image: ['Align']
    }
});

editor.appendTo('#editor');
```

Available alignment options:

- `'left'` — Align image to the left.
- `'center'` — Center the image.
- `'right'` — Align image to the right.
- `'none'` — Remove alignment (default).

### Remove

Delete the selected image from the editor using the Remove quick toolbar item. This provides a quick way to remove images without using the delete key.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Enable Remove in quick toolbar (recommended)
const editor = new RichTextEditorUI({
    quickToolbarSettings: {
        image: ['Remove']
    }
});

editor.appendTo('#editor');
```

### Customizing quick toolbar items

The default image quick toolbar includes:

- `AltText` — Edit alternative text.
- `Caption` — Add/edit image caption.
- `Align` — Align image (left, center, right, none).
- `Display` — Change display mode (inline, block).
- `WrapText` — Set text wrapping (left, right, none).
- `Dimension` — Adjust width and height.
- `Replace` — Replace with a different image.
- `Remove` — Delete the image.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Customize Quick Toolbar Items
const editor = new RichTextEditorUI({
    quickToolbarSettings: {
        image: [
            'AltText',
            'Caption',
            '|',
            'Align',
            'Display',
            'WrapText',
            '|',
            'Dimension',
            'Replace',
            'Remove'
        ]
    }
});

editor.appendTo('#editor');
```

## Remote upload

Remote image upload enables centralized image management on your server, providing better control over storage, performance, and security. This section covers implementing a complete server-side upload pipeline with authentication and validation.

When a user uploads an image through the RichTextEditor, the component sends the file to your server using the form field name `UploadFiles`. Your server processes the file and returns a JSON response containing the filename, which the editor combines with the `imageUrl` setting to create the final image source.

### Client-side configuration

Configure the Modern Rich Text Editor component with the upload endpoint and base URL:

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// ============================================
// CLIENT-SIDE: Configure the RichTextEditor
// ============================================
const editor = new RichTextEditorUI({
    imageSettings: {
        uploadUrl: 'https://api.example.com/images/upload',  // POST endpoint for uploads
        imageUrl: '/uploads/',                               // Base URL to resolve uploaded filenames
        removeUrl: 'https://api.example.com/images/remove',  // DELETE endpoint for removal
        allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],     // Allowed file types
        maxFileSize: 5 * 1024 * 1024                         // 5MB limit
    }
});
editor.appendTo('#editor');
```

## Keyboard shortcut

The default keyboard shortcut for inserting an image is **Ctrl+Shift+I** (Windows) / `⌘ ⇧ I` (macOS). To remap the shortcut, override `keyBindings.image` on `toolbarSettings` — see [toolbar.md](toolbar.md) → *Configuring keyboard shortcuts*.


## API references

Image configuration types, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `ImageSettings`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/imagesettings>

Configures the image settings of the RichTextEditor.

#### Properties

- `allowedTypes` — `string[]` — Specifies the image file extensions that can be selected, dropped, pasted, or uploaded. API names use TypeScript camel casing.
  - Defaults to `['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']`.
- `dimension` — `ImageDimensionOptions` — Specifies the default and permitted dimensions of an image.
  - Defaults to `{ width: 'auto', height: 'auto', minWidth: 0, maxWidth: null, minHeight: 0, maxHeight: null }`.
- `display` — `ImageDisplayMode` — Specifies how an image is positioned in the editor content. Possible values are:
  - `inline` — Places the image within the current text flow.
  - `break` — Places the image on a separate line.

  Defaults to `'inline'`.

- `imageUrl` — `string | null` — Specifies the public base URL used to resolve uploaded image names returned by the server. For example, when `imageUrl` is `/uploads/images/` and the server returns `sample.png`, the resulting source is `/uploads/images/sample.png`.
  - Defaults to `null`.
- `maxFileSize` — `number` — Specifies the maximum permitted image file size, in bytes.
  - Defaults to `30000000`.
- `removeUrl` — `string | null` — Specifies the server endpoint used to remove an uploaded image.
  - Defaults to `null`.
- `resize` — `boolean` — Specifies whether users can resize images in the editor.
  - Defaults to `true`.
- `saveFormat` — `ImageSaveFormat` — Specifies how local images are represented when an upload endpoint is not configured. Possible values are:
  - `Blob` — Creates a temporary object URL for the image.
  - `Base64` — Embeds the image as a Base64 data URL.

  Defaults to `'Blob'`.

- `uploadUrl` — `string | null` — Specifies the server endpoint used to upload image files. When this property is not configured, the editor uses `saveFormat` to create a local image source.
  - Defaults to `null`.

### `ImageDisplayMode`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/imagedisplaymode>

Default display mode for inserted images.

- `'inline'` — Places the image within the current text flow.
- `'break'` — Places the image on a separate line.

Enum members:

- `inline`
- `break`

### `ImageSaveFormat`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/imagesaveformat>

Local representation chosen for the next image insertion when the editor uses a local proxy source (no `uploadUrl`).

Enum members:

- `Blob`
- `Base64`

### `ImageSettingsModel`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/imagesettingsmodel>

Interface for the class `ImageSettings`.

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `allowedTypes` | `string[]` | Specifies the image file extensions that can be selected, dropped, pasted, or uploaded. API names use TypeScript camel casing. |
| `dimension` | `ImageDimensionOptions` | Specifies the default and permitted dimensions of an image. |
| `display` | `ImageDisplayMode` | Specifies how an image is positioned in the editor content. Possible values are: `inline` (places the image within the current text flow); `break` (places the image on a separate line). |
| `imageUrl` | `string \| null` | Specifies the public base URL used to resolve uploaded image names returned by the server. For example, when `imageUrl` is `/uploads/images/` and the server returns `sample.png`, the resulting source is `/uploads/images/sample.png`. |
| `maxFileSize` | `number` | Specifies the maximum permitted image file size, in bytes. |
| `removeUrl` | `string \| null` | Specifies the server endpoint used to remove an uploaded image. |
| `resize` | `boolean` | Specifies whether users can resize images in the editor. |
| `saveFormat` | `ImageSaveFormat` | Specifies how local images are represented when an upload endpoint is not configured. Possible values are: `Blob` (creates a temporary object URL for the image); `Base64` (embeds the image as a Base64 data URL). |
| `uploadUrl` | `string \| null` | Specifies the server endpoint used to upload image files. When this property is not configured, the editor uses `saveFormat` to create a local image source. |


### `ImageQuickToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/imagequicktoolbaritem>

Built-in items exposed by the Image Quick Toolbar.

#### Enum members

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
