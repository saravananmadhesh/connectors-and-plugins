# Inserting Images (HTML Mode)

Image insertion is an HTML-mode feature. Inject the `Image` module.

## Table of Contents
- [Add Image Toolbar Item](#add-image-toolbar-item)
- [Image Save Formats](#image-save-formats)
- [Server-Side Upload](#server-side-upload)
- [Drag and Drop Images](#drag-and-drop-images)
- [Image Resize](#image-resize)
- [Check Image Size Before Upload](#check-image-size-before-upload)
- [Rename Images on Server](#rename-images-on-server)

## Add Image Toolbar Item

```vue
<template>
  <ejs-richtexteditor :toolbarSettings="toolbarSettings" :value="value" />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', '|', 'Image', '|', 'Undo', 'Redo']
};
const value = '<p>Click the image icon in the toolbar to insert an image.</p>';
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

The image dialog allows users to:
- Enter an image URL from an online source
- Upload a file from their local computer
- Set alt text and dimensions

## Image Save Formats

Images can be saved as `Blob` or `Base64` using `insertImageSettings.saveFormat`.

```vue
<script setup>
// Save as Base64 (embedded in HTML)
const insertImageSettings = {
  saveFormat: 'Base64'
};

// Save as Blob (default — creates a blob URL)
const insertImageSettingsBlob = {
  saveFormat: 'Blob'
};
</script>
```

## Server-Side Upload

Configure `insertImageSettings` to upload images to a server endpoint:

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :insertImageSettings="insertImageSettings"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = { items: ['Image'] };
const insertImageSettings = {
  saveUrl: 'https://your-server.com/api/upload-image',
  path: '/uploads/images/'
};
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

- `saveUrl` — Server endpoint that receives the uploaded image file
- `path` — Path prefix appended to the returned filename for the `src` attribute

## Drag and Drop Images

Drag-and-drop is enabled by default when the `Image` module is injected. The dropped image is uploaded using the `saveUrl` if configured, or converted to Base64/Blob otherwise.

```vue
<script setup>
const insertImageSettings = {
  saveUrl: 'https://your-server.com/api/upload-image',
  path: '/uploads/'
};
</script>
```

## Image Resize

Image resize handles appear via the `QuickToolbar` when the user clicks an image. Use `Dimension` in `quickToolbarSettings.image` to allow manual width/height input.

```vue
<script setup>
const quickToolbarSettings = {
  image: ['Replace', 'Align', 'Caption', 'Remove', 'Dimension', 'AltText']
};
</script>
```

## Check Image Size Before Upload

Use the `imageUploadingEventArgs` in the `beforeImageUpload` event to validate file size:

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :insertImageSettings="insertImageSettings"
    :beforeImageUpload="onBeforeImageUpload"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = { items: ['Image'] };
const insertImageSettings = { saveUrl: '/api/upload-image' };

const onBeforeImageUpload = (args) => {
  // args.fileInfo contains file details
  const maxSizeKB = 500;
  if (args.fileInfo && args.fileInfo.size > maxSizeKB * 1024) {
    args.cancel = true;
    alert(`Image size exceeds ${maxSizeKB}KB limit.`);
  }
};
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

## Rename Images on Server

When a file with the same name already exists, use the `imageUploadSuccess` event to rename:

```vue
<template>
  <ejs-richtexteditor
    :insertImageSettings="insertImageSettings"
    :imageUploadSuccess="onImageUploadSuccess"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const insertImageSettings = {
  saveUrl: '/api/upload-image',
  path: '/uploads/'
};

const onImageUploadSuccess = (args) => {
  // Server returns the new filename in the response
  if (args.e.currentTarget.getResponseHeader('name') != null) {
    args.file.name = args.e.currentTarget.getResponseHeader('name');
    const filename = document.querySelectorAll('.e-file-name')[0];
    if (filename) {
      filename.innerHTML = args.file.name.replace(document.querySelectorAll('.e-file-type')[0].innerHTML, '');
    }
  }
};
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

> For Markdown mode image insertion, only URL-based images are supported — file upload dialogs are not available in Markdown mode.
