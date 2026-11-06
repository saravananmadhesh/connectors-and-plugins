# Core Operations

## Table of Contents
- [Opening Images](#opening-images)
- [Supported File Formats](#supported-file-formats)
- [Saving and Exporting](#saving-and-exporting)
- [File Validation](#file-validation)
- [File Size Restrictions](#file-size-restrictions)
- [Common Patterns](#common-patterns)

## Opening Images

### Basic Image Loading

Load an image from a URL or file path:

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({ width: '550px', height: '330px' });
imageEditor.appendTo('#imageeditor');

// Open image from URL — always validate or sanitize URL inputs in production to prevent SSRF
imageEditor.open('url');

// Open image from local path
imageEditor.open('url');
```

### Using Open Method

The `open()` method is the primary way to load images. It returns `void`; use the `fileOpened` event to react after an image loads:

```typescript
// Simple open
imageEditor.open('url');

// React to image load via event
const imageEditor = new ImageEditor({
    fileOpened: (args) => {
        console.log(`Image loaded: ${args.fileName} (${args.fileType})`);
        const dimension = imageEditor.getImageDimension();
        console.log(`Image size: ${dimension.width} x ${dimension.height}`);
    }
});
```

### Opening from File Input

Allow users to select images from their computer:

```typescript
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const openBtn = document.getElementById('openBtn') as HTMLElement;

openBtn.onclick = () => {
    fileInput.click();
};

fileInput.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Read file as data URL
            imageEditor.open(e.target.result as string);
        };
        reader.readAsDataURL(file);
    }
});
```

### File Opened Event

Respond to successful image loading via the `fileOpened` event:

```typescript
const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    fileOpened: (args) => {
        console.log(`Image loaded: ${args.fileName}, valid: ${args.isValidImage}`);
        // Perform operations after image loads
        const dimension = imageEditor.getImageDimension();
    }
});
```

### Getting Image Dimensions

Query the current image dimensions:

```typescript
// Get image dimension object
const dimension = imageEditor.getImageDimension();

console.log(`X: ${dimension.x}`);                    // Left position
console.log(`Y: ${dimension.y}`);                    // Top position
console.log(`Width: ${dimension.width}`);            // Image width
console.log(`Height: ${dimension.height}`);          // Image height
```

## Supported File Formats

### Image Format Support

The Image Editor supports the following image file formats for loading:

| Format | Extension | Support | Notes |
|--------|-----------|---------|-------|
| JPEG | `.jpg`, `.jpeg` | ✓ Full support | Commonly used, good compression |
| PNG | `.png` | ✓ Full support | Supports transparency |
| SVG | `.svg` | ✓ Full support | Vector format, scalable |
| WebP | `.webp` | ✓ Full support | Modern format, better compression |
| BMP | `.bmp` | ✓ Full support | Uncompressed bitmap format |

### Format Selection for Export

When saving/exporting, choose based on your needs:

```typescript
// Export as PNG (preserves transparency)
imageEditor.export('PNG');

// Export as JPEG (smaller file size)
imageEditor.export('JPEG');

// Export as WebP (modern compression)
imageEditor.export('WEBP');

// Export as SVG (vector format)
imageEditor.export('SVG');
```

## Saving and Exporting

### Export Method

Export and download the edited image. `export()` returns `void` and triggers a browser download:

```typescript
// Export to PNG (default)
imageEditor.export('PNG', 'image.png');

// Export to JPEG with quality (0–1 scale, default 1)
imageEditor.export('JPEG', 'image.jpg', 0.95);

// Export to WebP
imageEditor.export('WEBP', 'image.webp');

// Export to SVG
imageEditor.export('SVG', 'image.svg');
```

### Programmatic Save Handling

Intercept save events to handle data yourself. Use `getImageData()` to retrieve the raw pixel data:

```typescript
const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    beforeSave: (args) => {
        // Cancel the default browser download
        args.cancel = true;
        
        // Get image pixel data as ImageData
        const imageData = imageEditor.getImageData();
        
        // Process or upload imageData as needed
        console.log('Image data retrieved, uploading...');
    }
});
```

### saved Event

Use the `saved` event to respond after export completes:

```typescript
const imageEditor = new ImageEditor({
    saved: (args) => {
        console.log(`Saved as: ${args.fileName} (${args.fileType})`);
    }
});
```

## File Validation

### Input Validation

Validate files before opening:

```typescript
function validateImageFile(file: File): boolean {
    const validFormats = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/bmp'];
    
    // Check MIME type
    if (!validFormats.includes(file.type)) {
        console.error('Invalid file format. Supported: JPEG, PNG, SVG, WebP, BMP');
        return false;
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        console.error('File too large. Maximum size: 10MB');
        return false;
    }
    
    return true;
}

// Use in file input handler
fileInput.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files[0];
    
    if (file && validateImageFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageEditor.open(e.target.result as string);
        };
        reader.readAsDataURL(file);
    }
});
```

### Filename Validation

Ensure valid filenames for export:

```typescript
function sanitizeFilename(filename: string): string {
    // Remove invalid characters
    return filename
        .replace(/[^a-zA-Z0-9._-]/g, '_')  // Replace special chars
        .replace(/^\.+/, '')                // Remove leading dots
        .substring(0, 255);                 // Limit length
}

// Use when exporting
const originalName = 'user@photo (1).jpg';
const safeFilename = sanitizeFilename(originalName); // 'user_photo__1_.jpg'
imageEditor.save(safeFilename);
```

## File Size Restrictions

### Maximum File Sizes

While the Image Editor doesn't enforce strict limits, practical constraints apply:

```typescript
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB as practical limit

async function openImageWithValidation(file: File): Promise<void> {
    // Validate size
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File exceeds maximum size of 50MB`);
    }
    
    // Compress if needed
    if (file.size > 5 * 1024 * 1024) { // > 5MB
        console.warn('Large file detected, performance may be affected');
    }
    
    // Proceed with opening
    const reader = new FileReader();
    reader.onload = (e) => {
        imageEditor.open(e.target.result as string);
    };
    reader.readAsDataURL(file);
}
```

### Canvas Size Limitations

Very large images may cause performance issues:

```typescript
// Check image dimensions after loading
const imageEditor = new ImageEditor({
    imageLoaded: () => {
        const dimension = imageEditor.getImageDimension();
        
        // Warn if very large
        const totalPixels = dimension.width * dimension.height;
        if (totalPixels > 50000000) { // > 50 megapixels
            console.warn('Very large image loaded, editing may be slow');
        }
    }
});
```

## Common Patterns

### Pattern: Open Image with Loading Indicator

```typescript
const loadingDiv = document.getElementById('loading');

const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    fileOpened: () => {
        loadingDiv.style.display = 'none';
    }
});

function openImageWithLoading(url: string) {
    loadingDiv.style.display = 'block';
    imageEditor.open(url);
}

openImageWithLoading('assets/sample.jpg');
```

### Pattern: Export Multiple Formats

```typescript
function exportMultipleFormats(baseFilename: string) {
    const name = baseFilename.replace(/\.[^/.]+$/, ''); // Remove extension
    
    // Export as PNG (lossless)
    imageEditor.export('PNG', `${name}.png`);
    
    // Export as JPEG (compressed)
    imageEditor.export('JPEG', `${name}.jpg`, 0.9);
    
    // Export as WebP (modern)
    imageEditor.export('WEBP', `${name}.webp`);
}

document.getElementById('saveAllBtn').onclick = () => {
    exportMultipleFormats('edited-image');
};
```

### Pattern: Upload to Server Using getImageData

```typescript
async function uploadImageToServer(): Promise<void> {
    // Get raw pixel data from canvas
    const imageData: ImageData = imageEditor.getImageData();
    
    // Draw to a temporary canvas to convert to blob
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    canvas.getContext('2d').putImageData(imageData, 0, 0);
    
    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'edited-image.png');
        
        const response = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            console.log('Upload successful');
        }
    }, 'image/png');
}

document.getElementById('uploadBtn').onclick = uploadImageToServer;
```

### Pattern: Reload Original Image

```typescript
let originalImageUrl: string = 'assets/sample.jpg';

const imageEditor = new ImageEditor({ width: '550px', height: '330px' });

function reloadOriginal() {
    imageEditor.reset(); // Revert all changes in-place
}

// Or re-open from the stored URL
function reopenOriginal() {
    imageEditor.clearImage();
    imageEditor.open(originalImageUrl);
}

document.getElementById('reloadBtn').onclick = reloadOriginal;
```

