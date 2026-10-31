# Image Manipulation

## Table of Contents
- [Zooming](#zooming)
- [Panning](#panning)
- [Resizing Images](#resizing-images)
- [Rotation](#rotation)
- [Flipping](#flipping)
- [Straightening](#straightening)
- [Image Dimensions](#image-dimensions)
- [Common Patterns](#common-patterns)

## Zooming

### Zoom Levels and Percentages

Control the magnification level of the image:

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({ width: '550px', height: '330px' });
imageEditor.appendTo('#imageeditor');

// Set zoom level (1.0 = 100%, 2.0 = 200%, 0.5 = 50%)
imageEditor.zoom(1.5);       // Zoom to 150%
imageEditor.zoom(2);         // Zoom to 200%
imageEditor.zoom(1);         // Reset to 100% (fit image)
imageEditor.zoom(0.5);       // Zoom out to 50%
```

### Zoom In/Out Methods

Increment or decrement zoom by calling `zoom()` with a new factor:

```typescript
// Zoom in (increase factor)
imageEditor.zoom(2);   // 200%

// Zoom out (decrease factor)
imageEditor.zoom(0.5); // 50%
```

### Toolbar Zoom Buttons

Enable zoom controls in toolbar:

```typescript
const imageEditor = new ImageEditor({
    toolbar: ['ZoomIn', 'ZoomOut']
});
```

### Mouse Wheel Zooming

Users can zoom using Ctrl + mouse wheel:

```typescript
// Mouse wheel zooming is enabled by default
// Ctrl + scroll wheel: zoom in/out
// This works automatically with zoom enabled
```

### Keyboard Shortcuts for Zoom

Users can zoom with keyboard:

```
Ctrl + '+' key  : Zoom in
Ctrl + '-' key  : Zoom out
```

## Panning

### Pan an Image

Move the image within the editor canvas:

```typescript
// Panning is enabled when:
// 1. Image is larger than editor canvas (zoomed in)
// 2. Selection is applied for cropping

// Users pan by clicking and dragging the image
// This works automatically after zooming
```

### When Panning Is Available

Panning activates in these scenarios:

```typescript
const imageEditor = new ImageEditor({ width: '550px', height: '330px' });
imageEditor.appendTo('#imageeditor');

// Zoom in first, then enable panning
imageEditor.zoom(2);
imageEditor.pan(true);
```

### Programmatic Panning

Use `pan()` to enable panning or to scroll the canvas to specific coordinates:

```typescript
// Enable panning mode
imageEditor.pan(true);

// Pan to specific coordinates
imageEditor.pan(true, 100, 50);

// Disable panning
imageEditor.pan(false);
```

## Resizing Images

### Scale Image Dimensions

Resize the image to specific dimensions:

```typescript
// Resize using resize method
imageEditor.resize(800, 600);  // Resize to 800x600 pixels

// Resize with aspect ratio preservation
const originalDimension = imageEditor.getImageDimension();
const newWidth = 600;
const aspectRatio = originalDimension.width / originalDimension.height;
const newHeight = newWidth / aspectRatio;

imageEditor.resize(newWidth, newHeight);
```

### Percentage-Based Resizing

Scale image by percentage:

```typescript
function resizeByPercentage(percent: number) {
    const dimension = imageEditor.getImageDimension();
    const newWidth = dimension.width * (percent / 100);
    const newHeight = dimension.height * (percent / 100);
    
    imageEditor.resize(newWidth, newHeight);
}

resizeByPercentage(50);   // Resize to 50%
resizeByPercentage(150);  // Resize to 150%
```

### Constraint Resizing

Maintain aspect ratio when resizing:

```typescript
function resizeWithConstraint(maxWidth: number, maxHeight: number) {
    const dimension = imageEditor.getImageDimension();
    let newWidth = dimension.width;
    let newHeight = dimension.height;
    
    // Scale down if larger than max
    if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = (dimension.height / dimension.width) * newWidth;
    }
    
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (dimension.width / dimension.height) * newHeight;
    }
    
    imageEditor.resize(newWidth, newHeight);
}

// Resize to fit within 1000x1000
resizeWithConstraint(1000, 1000);
```

## Rotation

### Rotate Image

Rotate image by 90-degree increments or custom angles:

```typescript
// Rotate 90 degrees clockwise
imageEditor.rotate(90);

// Rotate 180 degrees
imageEditor.rotate(180);

// Rotate 270 degrees (or -90)
imageEditor.rotate(270);

// Rotate back to 0 degrees
imageEditor.rotate(0);

// Rotate by custom angle
imageEditor.rotate(45);
```

### Using Toolbar Rotation

Enable rotation controls in the toolbar:

```typescript
const imageEditor = new ImageEditor({
    toolbar: ['Transform'] // Includes rotate and flip options
});
```

### Rotate with Step Buttons

```typescript
// Rotate left (counter-clockwise 90°)
imageEditor.rotate(-90);

// Rotate right (clockwise 90°)
imageEditor.rotate(90);
```

## Flipping

### Flip Horizontally

Mirror image left-to-right:

```typescript
// Flip horizontally (mirror image)
imageEditor.flip('Horizontal');

// Flip again to restore original orientation
imageEditor.flip('Horizontal');
```

### Flip Vertically

Mirror image top-to-bottom:

```typescript
// Flip vertically (upside down)
imageEditor.flip('Vertical');

// Flip again to restore original orientation
imageEditor.flip('Vertical');
```

### Toolbar Flip Options

Enable flip controls:

```typescript
const imageEditor = new ImageEditor({
    toolbar: ['Flip'],
    // Users see options: Flip Left, Flip Right, Flip Vertical
});
```

### Combined Transformations

Combine rotation and flipping:

```typescript
// Rotate 90 degrees then flip
imageEditor.rotate(90);
imageEditor.flip('Horizontal');

// Result: Image rotated and mirrored
```

## Straightening

### Straighten Crooked Images

Use straighten slider to correct image tilt:

```typescript
// Straightening is accessed via toolbar
// Shows a slider for angle adjustment: typically -45° to +45°

const imageEditor = new ImageEditor({
    toolbar: ['Straighten'] // Enable straighten tool
});
```

### Straighten with Context Menu

```typescript
// Via toolbar:
// 1. User clicks Crop button
// 2. In crop context toolbar, clicks Straighten
// 3. Slider appears to adjust tilt angle
// 4. Applies straightening to image
```

### Programmatic Straightening

Use `straightenImage()` to straighten by a precise degree:

```typescript
// Straighten clockwise by 5 degrees
imageEditor.straightenImage(5);

// Straighten counter-clockwise by 3 degrees
imageEditor.straightenImage(-3);
```

## Image Dimensions

### Get Current Image Size

Retrieve image dimensions and position:

```typescript
const dimension = imageEditor.getImageDimension();

console.log(`Image width: ${dimension.width}px`);
console.log(`Image height: ${dimension.height}px`);
console.log(`Left position (X): ${dimension.x}px`);
console.log(`Top position (Y): ${dimension.y}px`);
console.log(`Canvas width: ${dimension.clientWidth}px`);
console.log(`Canvas height: ${dimension.clientHeight}px`);
```

### Responsive Sizing

Auto-adjust editor based on container by using percentage values:

```typescript
const imageEditor = new ImageEditor({
    width: '100%',
    height: '100%'
});

// Refresh component after programmatic property changes
window.addEventListener('resize', () => {
    imageEditor.refresh();
});
```

## Common Patterns

### Pattern: Fit Image to Width

```typescript
function fitToWidth() {
    const dimension = imageEditor.getImageDimension();
    const container = document.getElementById('imageeditor');
    const zoom = container.clientWidth / dimension.width;
    imageEditor.zoom(zoom);
}

document.getElementById('fitWidthBtn').onclick = fitToWidth;
```

### Pattern: Fit Image to Height

```typescript
function fitToHeight() {
    const dimension = imageEditor.getImageDimension();
    const container = document.getElementById('imageeditor');
    const zoom = container.clientHeight / dimension.height;
    imageEditor.zoom(zoom);
}

document.getElementById('fitHeightBtn').onclick = fitToHeight;
```

### Pattern: Rotate Gallery

```typescript
function createRotateGallery() {
    const rotateBtn = document.getElementById('rotateBtn');
    const rotations = [0, 90, 180, 270];
    let currentIndex = 0;
    
    rotateBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % rotations.length;
        imageEditor.rotate(rotations[currentIndex]);
    };
}

createRotateGallery();
```

### Pattern: Zoom with Buttons

Use the `zooming` event to track the current zoom factor, then step it up or down:

```typescript
let currentZoomFactor = 1;

const imageEditor = new ImageEditor({
    zooming: (args) => {
        currentZoomFactor = args.currentZoomFactor;
    }
});

document.getElementById('zoomInBtn').onclick = () => {
    imageEditor.zoom(currentZoomFactor + 0.1);
};

document.getElementById('zoomOutBtn').onclick = () => {
    imageEditor.zoom(Math.max(0.1, currentZoomFactor - 0.1));
};

document.getElementById('zoomResetBtn').onclick = () => {
    imageEditor.zoom(1);
};
```

### Pattern: Mirror Image Horizontally then Rotate

```typescript
function mirrorThenRotate() {
    // Mirror left-right
    imageEditor.flip('Horizontal');
    
    // Then rotate 90 degrees
    imageEditor.rotate(90);
}

document.getElementById('transformBtn').onclick = mirrorThenRotate;
```

