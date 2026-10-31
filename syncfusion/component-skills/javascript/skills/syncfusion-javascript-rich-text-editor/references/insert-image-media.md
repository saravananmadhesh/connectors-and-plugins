# Insert Images, Audio, and Video

> Requires module injection: `Image`, `Audio`, `Video`, `QuickToolbar`

## Table of Contents
- [Images](#images)
- [Audio](#audio)
- [Video](#video)
- [File Browser Integration](#file-browser-integration)

---

## Images

### Required module

```typescript
import { RichTextEditor, Toolbar, Image, Link, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Image, Link, HtmlEditor, QuickToolbar);
```

### Add Image toolbar item

```typescript
const editor = new RichTextEditor({
  toolbarSettings: { items: ['Image'] }
});
editor.appendTo('#editor');
```

### Image save format

```typescript
const editor = new RichTextEditor({
  insertImageSettings: {
    saveFormat: 'Base64'   // 'Blob' (default) | 'Base64'
  }
});
```

- **Blob** (default): `<img src="blob:http://...">` — good for large images, not persisted on server
- **Base64**: `<img src="data:image/jpeg;base64,...">` — self-contained, larger HTML string

### Upload images to server

```typescript
const editor = new RichTextEditor({
  insertImageSettings: {
    saveUrl: 'url',
    removeUrl: 'url',
    path: 'url'
  }
});
```

### Delete image from server after removal

```typescript
import { AfterImageDeleteEventArgs } from '@syncfusion/ej2-richtexteditor';

const editor = new RichTextEditor({
  afterImageDelete: (args: AfterImageDeleteEventArgs) => {
    const fileName = args.src.split('/').pop();
    const formData = new FormData();
    formData.append('UploadFiles', new File([''], fileName));
    fetch(editor.insertImageSettings.removeUrl, { method: 'POST', body: formData });
  }
});
```

### Image settings reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `saveFormat` | `'Blob' \| 'Base64'` | `'Blob'` | Format for storing images |
| `saveUrl` | `string` | — | Server endpoint to upload image |
| `removeUrl` | `string` | — | Server endpoint to delete image |
| `path` | `string` | — | Server path where uploaded images are stored |
| `maxFileSize` | `number` | `30000000` | Max file size in bytes |
| `allowedTypes` | `string[]` | `['.jpg', '.jpeg', '.png']` | Permitted file types |
| `width` | `string` | `'auto'` | Default width on insert |
| `height` | `string` | `'auto'` | Default height on insert |
| `display` | `'inline' \| 'block'` | `'inline'` | Default display position |

### Image quick toolbar options

```typescript
quickToolbarSettings: {
  image: [
    'Replace', 'Align', 'WrapText', 'Caption', 'Remove',
    'InsertLink', 'OpenImageLink', '|',
    'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'
  ]
}
```

| Item | Description |
|------|-------------|
| `Replace` | Replace image with URL or local file |
| `Align` | Block-level alignment (left/center/right) |
| `WrapText` | Float image left/right for text wrap |
| `Caption` | Toggle caption below image |
| `AltText` | Set alternative text |
| `Dimension` | Change width and height |
| `Display` | Toggle inline vs block |
| `Remove` | Delete image from content |

### Secure upload with auth header

```typescript
import { UploadingEventArgs } from '@syncfusion/ej2-richtexteditor';

const editor = new RichTextEditor({
  imageUploading: (args: UploadingEventArgs) => {
    args.currentRequest.setRequestHeader('Authorization', 'Bearer your-token');
  }
});
```

### Disable drag-and-drop

```typescript
const editor = new RichTextEditor({
  actionBegin: (args: any) => {
    if (args.type === 'drop' || args.type === 'dragstart') {
      args.cancel = true;
    }
  }
});
```

---

## Audio

### Required module

```typescript
import { RichTextEditor, HtmlEditor, Toolbar, QuickToolbar, Audio } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(HtmlEditor, Toolbar, QuickToolbar, Audio);
```

### Add Audio toolbar item

```typescript
const editor = new RichTextEditor({
  toolbarSettings: { items: ['Audio'] },
  insertAudioSettings: {
    saveFormat: 'Blob',   // 'Blob' (default) | 'Base64'
    saveUrl: 'url',
    path: 'url'
  }
});
editor.appendTo('#editor');
```

### Audio quick toolbar

```typescript
quickToolbarSettings: {
  audio: ['AudioReplace', 'AudioRemove', 'AudioLayoutOption']
}
```

---

## Video

### Required module

```typescript
import { RichTextEditor, HtmlEditor, Toolbar, QuickToolbar, Video } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(HtmlEditor, Toolbar, QuickToolbar, Video);
```

### Add Video toolbar item

```typescript
const editor = new RichTextEditor({
  toolbarSettings: { items: ['Video'] },
  insertVideoSettings: {
    saveFormat: 'Blob',
    saveUrl: 'url',
    path: 'url'
  }
});
editor.appendTo('#editor');
```

### Video quick toolbar

```typescript
quickToolbarSettings: {
  video: ['VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoLayoutOption', 'VideoDimension']
}
```

---

## File Browser Integration

Requires the `FileManager` module.

```typescript
import { RichTextEditor, HtmlEditor, Toolbar, Image, FileManager } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(HtmlEditor, Toolbar, Image, FileManager);

const editor = new RichTextEditor({
  toolbarSettings: { items: ['Image', 'FileManager'] },
  fileManagerSettings: {
    enable: true,
    path: 'url',
    ajaxSettings: {
      url: 'url',
      uploadUrl: 'url',
      downloadUrl: 'url',
      getImageUrl: 'url'
    }
  }
});
```
