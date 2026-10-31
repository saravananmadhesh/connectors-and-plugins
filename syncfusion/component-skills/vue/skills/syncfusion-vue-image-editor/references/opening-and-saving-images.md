# Opening and Saving Images

## Table of Contents
- [Supported Image Formats](#supported-image-formats)
- [Opening Images](#opening-images)
- [Saving and Exporting](#saving-and-exporting)
- [File Format Conversion](#file-format-conversion)

## Supported Image Formats

The Image Editor supports the following image formats:
- **PNG** - Portable Network Graphics (recommended for lossless editing)
- **JPEG/JPG** - Joint Photographic Experts Group (standard photo format)
- **WEBP** - Modern format with good compression
- **BMP** - Bitmap format
- **SVG** - Scalable Vector Graphics (for vector images)

When saving edited images, the **default format is PNG**. You can specify a different format when exporting.

## Opening Images

### Opening from URL

The `open()` method accepts URLs to remote images:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.open('https://example.com/image.jpg');
```

Example with device detection:

```javascript
import { Browser } from "@syncfusion/ej2-base";

const imageUrl = Browser.isDevice
  ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
  : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";

imageEditor.open(imageUrl);
```

### Opening Local Images

Place images in your project directory and reference them by filename:

```javascript
imageEditor.open('images/sample.png');
```

### Opening from Base64 String

Convert images to base64 for data URLs:

```javascript
const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANS...';
imageEditor.open(base64String);
```

### Opening from File Upload

Integrate with file upload components to load user-selected images:

```vue
<template>
  <div>
    <input type="file" accept="image/*" @change="onFileSelect" />
    <ejs-imageeditor ref="imageEditorObj"></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imageEditorObj = ref(null);

const onFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageEditor = imageEditorObj.value?.ej2Instances;
      imageEditor.open(e.target.result); // e.target.result is base64
    };
    reader.readAsDataURL(file);
  }
};
</script>
```

## Saving and Exporting

### Default Save

The `save()` method exports the edited image as PNG (default):

```javascript
imageEditor.save();
```

This automatically downloads the file as `image.png`.

### Converting to Blob

Convert the edited image to a Blob object for programmatic handling:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.toBlob((blob) => {
  console.log('Blob size:', blob.size);
  console.log('Blob type:', blob.type);
});
```

### Saving Blob to File

Upload or store the blob programmatically:

```javascript
imageEditor.toBlob((blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'edited-image.png';
  link.click();
  URL.revokeObjectURL(url);
});
```

### Uploading to Server

Send the edited image to a server endpoint:

```javascript
const uploadImage = () => {
  imageEditor.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append('image', blob, 'edited-image.png');
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      console.log('Image uploaded successfully');
    }
  });
};
```

## File Format Conversion

### Specify Output Format

When saving, you can specify the desired format:

```javascript
// Save as JPEG
imageEditor.toBlob((blob) => {
  // Note: The format depends on the blob type
  // JPEG typically has smaller file size than PNG
}, 'image/jpeg');

// Save as WEBP
imageEditor.toBlob((blob) => {
  // Modern format with good compression
}, 'image/webp');
```

### Common Format Use Cases

| Format | Best For | File Size |
|--------|----------|-----------|
| **PNG** | Lossless, transparency, graphics | Medium-Large |
| **JPEG** | Photographs, realistic images | Small-Medium |
| **WEBP** | Web optimization, modern browsers | Small |
| **BMP** | Legacy systems, uncompressed | Large |
| **SVG** | Vector graphics, scalable images | Small |

## Complete Example

```vue
<template>
  <div>
    <div>
      <input 
        type="file" 
        accept="image/*" 
        @change="onFileSelect" 
        placeholder="Select image"
      />
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px"
      width="100%"
    ></ejs-imageeditor>
    <div>
      <button @click="saveAsDefault">Save as PNG</button>
      <button @click="saveAsJPEG">Save as JPEG</button>
      <button @click="uploadToServer">Upload to Server</button>
    </div>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);

const onFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageEditor = imageEditorObj.value?.ej2Instances;
      imageEditor.open(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const saveAsDefault = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.save();
};

const saveAsJPEG = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edited-image.jpg';
    link.click();
    URL.revokeObjectURL(url);
  }, 'image/jpeg');
};

const uploadToServer = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append('image', blob, 'edited-image.png');
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      console.log('Uploaded successfully');
    } else {
      console.error('Upload failed');
    }
  });
};
</script>
```
