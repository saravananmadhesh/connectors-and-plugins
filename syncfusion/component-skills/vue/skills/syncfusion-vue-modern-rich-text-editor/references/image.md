# Image Reference

This reference covers image insertion, configuration options, upload handling, and quick toolbar actions for images in the Modern Rich Text Editor.

## Table of Contents

- [Overview](#overview)
- [Image Configuration](#image-configuration)
- [Allowed Image Formats](#allowed-image-formats)
- [Size Restrictions](#size-restrictions)
- [Save Formats](#save-formats)
- [Image Dimensions](#image-dimensions)
- [Image Display Options](#image-display-options)
- [Insertion Methods](#insertion-methods)
- [Image Quick Toolbar](#image-quick-toolbar)
- [Remote Upload](#remote-upload)

---

## Overview

The Modern Rich Text Editor provides comprehensive image support including local uploads, web URLs, server-side management, and rich image editing options through the quick toolbar.

---

## Image Configuration

Configure image handling through the `imageSettings` property:

```html
<template>
  <ejs-richtexteditor-ui
    :imageSettings="imageSettings"
    :toolbarSettings="toolbarSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['Image']
};

const imageSettings = {
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
  maxFileSize: 30000000,
  uploadUrl: 'https://api.example.com/upload',
  imageUrl: '/uploads/',
  removeUrl: 'https://api.example.com/remove'
};
</script>
```

### Configuration Properties

| Property | Type | Required | Purpose |
| --- | --- | --- | --- |
| `allowedTypes` | `string[]` | No | Array of allowed image file extensions (e.g., `['.jpg', '.png']`) |
| `maxFileSize` | `number` | No | Maximum file size in bytes (e.g., `5242880` for 5MB) |
| `uploadUrl` | `string` | Yes* | Server endpoint for image uploads |
| `imageUrl` | `string` | Yes* | Base URL for resolving uploaded image paths |
| `removeUrl` | `string` | No | Server endpoint for deleting images |
| `dimension` | `object` | No | Width/height constraints and defaults |
| `saveFormat` | `'Blob' \| 'Base64'` | No | Format for storing images |

*Required if using server-side uploads.

---

## Allowed Image Formats

The `allowedTypes` property specifies which file extensions can be selected, dropped, pasted, or uploaded.

### Default Supported Formats

- JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- GIF (`.gif`)
- BMP (`.bmp`)
- WebP (`.webp`)

### Configuring Allowed Formats

```html
<template>
  <ejs-richtexteditor-ui :imageSettings="imageSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const imageSettings = {
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']
};
</script>
```

---

## Size Restrictions

The `maxFileSize` property specifies the maximum permitted image file size in bytes.

```html
<template>
  <ejs-richtexteditor-ui :imageSettings="imageSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const imageSettings = {
  // 5MB file size limit
  maxFileSize: 5242880
};
</script>
```

Common file size limits:
- 1MB = `1048576` bytes
- 5MB = `5242880` bytes
- 10MB = `10485760` bytes
- 50MB = `52428800` bytes

---

## Save Formats

The RichTextEditor supports two primary formats for saving images: Blob (server-based) and Base64 (embedded).

### Blob Format (Recommended - Default)

Images are uploaded to a server and stored by filename. The editor stores only the filename/URL reference.

**Advantages:**
- Smaller document size
- Better performance with many images
- Centralized image management
- Server-side optimization and caching

**Disadvantages:**
- Requires server storage infrastructure
- Cross-domain (CORS) considerations
- Temporary file cleanup needed

```html
<template>
  <ejs-richtexteditor-ui :imageSettings="imageSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const imageSettings = {
  saveFormat: 'Blob',
  uploadUrl: 'https://api.example.com/upload',
  imageUrl: '/uploads/'
};
</script>
```

### Base64 Format

Images are embedded directly in the document as Base64-encoded data.

**Advantages:**
- Self-contained document (no external dependencies)
- Easy to share and archive
- No server infrastructure needed

**Disadvantages:**
- 33% larger file size than original
- Slower parsing with many images
- Poor email client compatibility
- High mobile network usage

```html
<template>
  <ejs-richtexteditor-ui :imageSettings="imageSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const imageSettings = {
  saveFormat: 'Base64'
};
</script>
```

---

## Image Dimensions

Configure custom dimensions or preset sizes for images with min/max constraints.

```html
<template>
  <ejs-richtexteditor-ui
    :imageSettings="imageSettings"
    :quickToolbarSettings="quickToolbarSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const imageSettings = {
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

const quickToolbarSettings = {
  image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
};
</script>
```

### Dimension Properties

| Property | Type | Purpose |
| --- | --- | --- |
| `width` | `string \| number` | Default width (CSS string or pixels) |
| `height` | `string \| number` | Default height (CSS string or pixels) |
| `minWidth` | `string \| number` | Minimum allowed width |
| `maxWidth` | `string \| number` | Maximum allowed width |
| `minHeight` | `string \| number` | Minimum allowed height |
| `maxHeight` | `string \| number` | Maximum allowed height |

---

## Image Display Options

### Display Mode

Control how images are rendered in the document — flowing with text (`inline`) or on a separate line (`break`).

**Display Modes:**
- `inline` (default) — Image flows within the current text line
- `break` (block) — Image placed on a separate line

```html
<template>
  <ejs-richtexteditor-ui :quickToolbarSettings="quickToolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const quickToolbarSettings = {
  image: ['Display']
};
</script>
```

### Text Wrapping

Control how text flows around the selected image.

**Wrap Text Options:**
- `inline` — Text flows normally around the image
- `left` — Text wraps to the right of the image
- `right` — Text wraps to the left of the image
- `none` — No text wrapping

```html
<script setup>
const quickToolbarSettings = {
  image: ['WrapText']
};
</script>
```

### Image Alignment

Set horizontal alignment of the selected image.

**Alignment Options:**
- `left` — Align image to the left
- `center` — Align image to the center
- `right` — Align image to the right
- `none` — Default (no alignment style)

```html
<script setup>
const quickToolbarSettings = {
  image: ['Align']
};
</script>
```

---

## Insertion Methods

### Local Storage Upload

Upload images from your local machine using the Image toolbar button.

```html
<template>
  <ejs-richtexteditor-ui
    :imageSettings="imageSettings"
    :toolbarSettings="toolbarSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['Image']
};

const imageSettings = {
  uploadUrl: 'https://api.example.com/upload',
  imageUrl: '/uploads/'
};
</script>
```

When clicked, a file browse dialog opens allowing selection of local images.

### Web URLs

Insert an image from an online source by providing the image URL.

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['Image']
};
</script>
```

The Image dialog includes a URL input field for pasting web image URLs.

### Drag and Drop

Drag images from your file explorer directly into the editor to upload them.

### Paste from Clipboard

Paste images copied to your clipboard directly into the editor.

---

## Image Quick Toolbar

The Image Quick Toolbar appears when an image is selected, providing instant access to image editing operations.

### Available Quick Toolbar Items

| Item | Purpose |
| --- | --- |
| `AltText` | Add or edit alternative text for accessibility |
| `Caption` | Add a caption below the image |
| `Align` | Set horizontal alignment (left, center, right) |
| `Display` | Toggle display mode (inline/block) |
| `WrapText` | Control text wrapping around the image |
| `Dimension` | Adjust image width and height |
| `Replace` | Replace with a different image |
| `Remove` | Delete the image |

### Default Configuration

```html
<template>
  <ejs-richtexteditor-ui :quickToolbarSettings="quickToolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const quickToolbarSettings = {
  image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
};
</script>
```

### Alt Text

Add descriptive alternative text for accessibility and SEO.

```html
<script setup>
const quickToolbarSettings = {
  image: ['AltText']
};
</script>
```

### Caption

Captions are rendered as `<figcaption>` elements inside a `<figure>` container.

**HTML Output:**
```html
<figure>
    <img src="image.png" alt="Sample" class="e-img-inline" />
    <figcaption>Image Caption Text</figcaption>
</figure>
```

```html
<script setup>
const quickToolbarSettings = {
  image: ['Caption']
};
</script>
```

### Resizing

Adjust image dimensions with a dimension editor dialog.

```html
<script setup>
const quickToolbarSettings = {
  image: ['Dimension']
};
</script>
```

---

## Remote Upload

Remote image upload enables centralized image management on your server.

### Client Configuration

```html
<template>
  <ejs-richtexteditor-ui :imageSettings="imageSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const imageSettings = {
  uploadUrl: 'https://api.example.com/images/upload',
  imageUrl: '/uploads/',
  removeUrl: 'https://api.example.com/images/remove',
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
  maxFileSize: 5 * 1024 * 1024  // 5MB limit
};
</script>
```

### Upload Endpoint Contract

The upload endpoint receives the file in a form field named `UploadFiles` and must return a JSON response with the filename:

```json
{
  "name": "uploaded-image.jpg"
}
```

The editor combines this filename with the `imageUrl` setting to create the final image source.

### Rename Images on Upload

Implement server-side renaming to ensure uploaded images follow your naming standards:

```html
<template>
  <ejs-richtexteditor-ui
    :imageSettings="imageSettings"
    @fileUploadSuccess="onFileUploadSuccess">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const imageSettings = {
  uploadUrl: 'https://api.example.com/images/upload',
  imageUrl: '/uploads/'
};

const onFileUploadSuccess = (args) => {
  if (args.source === 'Image') {
    console.log('Image uploaded successfully');
    console.log('Renamed filename:', args.response);
  }
};
</script>
```

### Secure Upload with Authentication

Add authentication headers to image upload requests:

```html
<template>
  <ejs-richtexteditor-ui
    :imageSettings="imageSettings"
    @fileUploading="onFileUploading">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const imageSettings = {
  uploadUrl: 'https://api.example.com/images/upload',
  imageUrl: '/uploads/'
};

const onFileUploading = (args) => {
  // Add authentication token to request headers
  args.currentRequest.setRequestHeader('Authorization', `Bearer ${getAuthToken()}`);
};

const getAuthToken = () => {
  // Retrieve your authentication token
  return localStorage.getItem('authToken');
};
</script>
```

---

## Keyboard Shortcuts

### Insert Image

**Windows/Linux:** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>
**macOS:** <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>

Opens the Insert Image dialog to upload or select an image.

---

## Complete Image Configuration Example

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :imageSettings="imageSettings"
    :quickToolbarSettings="quickToolbarSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Image', 'Link', 'Table', '|',
    'Undo', 'Redo'
  ]
};

const imageSettings = {
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  maxFileSize: 10 * 1024 * 1024,  // 10MB
  uploadUrl: 'https://api.example.com/images/upload',
  imageUrl: '/uploads/',
  removeUrl: 'https://api.example.com/images/remove',
  saveFormat: 'Blob',
  dimension: {
    width: '400px',
    height: 'auto',
    minWidth: '100px',
    maxWidth: '1200px'
  }
};

const quickToolbarSettings = {
  image: [
    'AltText', 'Caption', '|',
    'Align', 'Display', 'WrapText', '|',
    'Dimension', 'Replace', 'Remove'
  ]
};
</script>
```
