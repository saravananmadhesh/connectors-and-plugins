# Inserting Media: Audio and Video

Audio and video insertion are HTML-mode features. Inject `Audio` and/or `Video` modules as needed.

## Inserting Audio

### Setup

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :value="value"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Audio, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', '|', 'Audio', '|', 'Undo', 'Redo']
};
const value = '<p>Click the Audio icon to insert audio.</p>';
provide('richtexteditor', [Toolbar, Link, Audio, HtmlEditor, QuickToolbar]);
</script>
```

### Server-Side Audio Upload

```vue
<script setup>
const insertAudioSettings = {
  saveUrl: '/api/upload-audio',
  path: '/uploads/audio/'
};
</script>

<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :insertAudioSettings="insertAudioSettings"
  />
</template>
```

### Audio Quick Toolbar

```vue
<script setup>
const quickToolbarSettings = {
  audio: ['AudioReplace', 'AudioRemove', 'AudioLayoutOption']
};
</script>
```

## Inserting Video

### Setup

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :value="value"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Video, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', '|', 'Video', '|', 'Undo', 'Redo']
};
const value = '<p>Click the Video icon to insert a video.</p>';
provide('richtexteditor', [Toolbar, Link, Video, HtmlEditor, QuickToolbar]);
</script>
```

### Server-Side Video Upload

```vue
<script setup>
const insertVideoSettings = {
  saveUrl: '/api/upload-video',
  path: '/uploads/video/'
};
</script>
```

### Video Quick Toolbar

```vue
<script setup>
const quickToolbarSettings = {
  video: ['VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoLayoutOption', 'VideoDimension']
};
</script>
```

## Audio + Video Together

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :quickToolbarSettings="quickToolbarSettings"
    :insertAudioSettings="insertAudioSettings"
    :insertVideoSettings="insertVideoSettings"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, Audio, Video, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', '|', 'Image', 'Audio', 'Video', '|', 'Undo', 'Redo']
};
const quickToolbarSettings = {
  audio: ['AudioReplace', 'AudioRemove', 'AudioLayoutOption'],
  video: ['VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoDimension']
};
const insertAudioSettings = { saveUrl: '/api/upload-audio', path: '/uploads/audio/' };
const insertVideoSettings = { saveUrl: '/api/upload-video', path: '/uploads/video/' };

provide('richtexteditor', [Toolbar, Link, Image, Audio, Video, HtmlEditor, QuickToolbar]);
</script>
```

## File Browser Integration

To allow browsing server files for image/audio/video insertion, configure `fileManagerSettings`:

```vue
<script setup>
const fileManagerSettings = {
  enable: true,
  path: '/uploads/',
  ajaxSettings: {
    url: '/api/file-manager',
    getImageUrl: '/api/file-manager/get-image',
    uploadUrl: '/api/file-manager/upload',
    downloadUrl: '/api/file-manager/download'
  }
};
</script>
```

> Audio and video are HTML-mode only features. They are not available when `editorMode="Markdown"`.
