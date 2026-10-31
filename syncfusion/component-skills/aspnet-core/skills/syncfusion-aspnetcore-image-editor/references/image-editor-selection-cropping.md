# Selection & Cropping — Syncfusion ASP.NET Core Image Editor

## Table of Contents
- [Overview](#overview)
- [select() Method](#select-method)
  - [Custom Selection](#custom-selection)
  - [Square Selection](#square-selection)
  - [Circle Selection](#circle-selection)
  - [Aspect Ratio Selection](#aspect-ratio-selection)
  - [Custom Ratio Selection](#custom-ratio-selection)
- [crop() Method](#crop-method)
- [Maintaining Original Image Size](#maintaining-original-image-size)
- [Locking Selection Area](#locking-selection-area)
- [SelectionChanging Event](#selectionchanging-event)
- [Cropping Event](#cropping-event)

---

## Overview

Cropping in the Image Editor is a two-step process:
1. **Select** — define the region using `select()`
2. **Crop** — execute the crop using `crop()`

Both operations are available programmatically or through the built-in toolbar. After cropping, the image is scaled to fill the canvas for better visibility; use `preventScaling` to preserve the original cropped size.

---

## select() Method

```javascript
imageEditor.select(type, startX, startY, width, height);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Selection type: `'Custom'`, `'Square'`, `'Circle'`, `'3:2'`, `'2:3'`, `'4:3'`, `'3:4'`, `'5:4'`, `'4:5'`, `'5:7'`, `'7:5'`, `'9:16'`, `'16:9'` |
| `startX` | number | X-coordinate of the selection's top-left corner |
| `startY` | number | Y-coordinate of the selection's top-left corner |
| `width` | number | Width of the selection (for Custom type) |
| `height` | number | Height of the selection (for Custom type) |

### Custom Selection

Specify precise position and dimensions:

```cshtml
<ejs-button id="selectCustom" content="Custom Select" onclick="doCustomSelect()"></ejs-button>
<ejs-imageeditor id="image-editor" created="onCreated"></ejs-imageeditor>

<script>
function onCreated() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imgUrl = ej.base.Browser.isDevice
        ? '/images/flower.png'
        : '/images/bridge.png';
    imageEditorObj.open(imgUrl);
}

function doCustomSelect() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var dimension = imageEditorObj.getImageDimension();
    // Select a 200×150 region starting at the image origin
    imageEditorObj.select('Custom', dimension.x, dimension.y, 200, 150);
}
</script>
```

### Square Selection

```javascript
imageEditor.select('Square');
// or with starting position:
imageEditor.select('Square', 100, 100);
```

### Circle Selection

Produces a circular/elliptical crop result:

```javascript
imageEditor.select('Circle');
```

### Aspect Ratio Selection

Lock the selection to a predefined ratio:

```cshtml
<ejs-button id="select16x9" content="16:9 Widescreen" onclick="selectWidescreen()"></ejs-button>
<ejs-imageeditor id="image-editor"></ejs-imageeditor>

<script>
function selectWidescreen() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.select('16:9');
}
</script>
```

Available aspect ratios: `'2:3'`, `'3:2'`, `'3:4'`, `'4:3'`, `'4:5'`, `'5:4'`, `'5:7'`, `'7:5'`, `'9:16'`, `'16:9'`

### Custom Ratio Selection

For ratios not available in the toolbar, pass a custom ratio string:

```javascript
// Custom 3:1 ratio not in toolbar — use select() directly
imageEditor.select('3:1', 50, 50);
```

The selection respects the specified ratio even when resized by the user.

---

## crop() Method

After calling `select()`, execute the crop:

```cshtml
<ejs-button id="cropBtn" content="Crop" onclick="doCrop()"></ejs-button>
<ejs-imageeditor id="image-editor" created="onCreated"></ejs-imageeditor>

<script>
function onCreated() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imgUrl = ej.base.Browser.isDevice
        ? '/images/flower.png'
        : '/images/bridge.png';
    imageEditorObj.open(imgUrl);
}

function doCrop() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    // Step 1: Apply circle selection
    imageEditorObj.select('Circle');
    // Step 2: Crop after user adjusts selection, or crop programmatically
    imageEditorObj.crop();
}
</script>
```

---

## Maintaining Original Image Size

By default, the editor scales the cropped result for better visibility. To preserve the exact pixel dimensions of the crop, set `preventScaling: true` in the `Cropping` event:

```cshtml
<ejs-imageeditor id="image-editor" cropping="onCropping"></ejs-imageeditor>

<script>
function onCropping(args) {
    // Prevent the editor from upscaling the cropped region
    args.preventScaling = true;
}
</script>
```

This ensures that the saved image also retains the exact cropped size.

---

## Locking Selection Area

To prevent users from resizing a crop selection after it is placed, cancel the `Resizing` event:

```cshtml
<ejs-imageeditor id="image-editor" resizing="onResizing"></ejs-imageeditor>

<script>
function onResizing(args) {
    // Block all resize handles — locks the selection size
    args.cancel = true;
}
</script>
```

---

## SelectionChanging Event

Triggered while the selection is being resized via mouse interaction. Use it to constrain or adjust the selection programmatically.

```cshtml
<ejs-imageeditor id="image-editor" selectionChanging="onSelectionChanging"></ejs-imageeditor>

<script>
function onSelectionChanging(args) {
    // args.action                 - 'inserting' or 'resizing'
    // args.previousSelectionPoint - selection before this action (type, x, y, width, height)
    // args.currentSelectionPoint  - selection after this action (type, x, y, width, height)
    // args.cancel                 - set true to cancel this selection change

    // Example: enforce minimum selection size of 100x100
    if (args.currentSelectionPoint.width < 100 || args.currentSelectionPoint.height < 100) {
        args.cancel = true;
    }
}
</script>
```

---

## Cropping Event

Triggered when the crop is executed. Provides the start and end coordinates of the crop region.

```cshtml
<ejs-imageeditor id="image-editor" cropping="onCropping"></ejs-imageeditor>

<script>
function onCropping(args) {
    // args.startPoint      - { x, y } top-left of the crop selection
    // args.endPoint        - { x, y } bottom-right of the crop selection
    // args.cancel          - set true to cancel the crop
    // args.preventScaling  - set true to prevent auto-scaling of cropped output
    console.log('Cropping region:', args.startPoint, 'to', args.endPoint);
}
</script>
```


