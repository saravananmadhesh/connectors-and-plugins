# API Reference — Syncfusion ASP.NET Core Image Editor

**Source:** https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.imageeditor.imageeditor.html

## Table of Contents
- [Tag Helper Syntax](#tag-helper-syntax)
- [Properties](#properties)
  - [Core Properties](#core-properties)
  - [ZoomSettings](#zoomsettings)
  - [FinetuneSettings](#finetunesettings)
  - [SelectionSettings](#selectionsettings)
  - [UploadSettings](#uploadsettings)
  - [FontFamily](#fontfamily)
  - [Toolbar](#toolbar)
- [Events](#events)
- [Client-Side Methods](#client-side-methods)
  - [Image Operations](#image-operations)
  - [Transformation Methods](#transformation-methods)
  - [Selection & Crop Methods](#selection--crop-methods)
  - [Annotation Methods](#annotation-methods)
  - [Fine-Tune & Filter Methods](#fine-tune--filter-methods)
  - [Redact Methods](#redact-methods)
  - [Undo & Redo Methods](#undo--redo-methods)

---

## Tag Helper Syntax

```cshtml
<ejs-imageeditor id="image-editor"
                 height="500px"
                 width="100%"
                 allowUndoRedo="true"
                 disabled="false"
                 cssClass=""
                 imageSmoothingEnabled="false"
                 locale="en-US"
                 showQuickAccessToolbar="true"
                 theme="Bootstrap5"
                 toolbarTemplate=""
                 quickAccessToolbarTemplate=""
                 created="onCreated"
                 fileOpened="onFileOpened"
                 saving="onSaving"
                 beforeSave="onBeforeSave"
                 saved="onSaved"
                 cropping="onCropping"
                 rotating="onRotating"
                 flipping="onFlipping"
                 zooming="onZooming"
                 panning="onPanning"
                 resizing="onResizing"
                 shapeChanging="onShapeChanging"
                 shapeChange="onShapeChange"
                 selectionChanging="onSelectionChanging"
                 finetuneValueChanging="onFinetuneValueChanging"
                 imageFiltering="onImageFiltering"
                 frameChange="onFrameChange"
                 toolbarCreated="onToolbarCreated"
                 toolbarItemClicked="onToolbarItemClicked"
                 toolbarUpdating="onToolbarUpdating"
                 quickAccessToolbarOpen="onQATOpen"
                 quickAccessToolbarItemClick="onQATItemClick"
                 click="onClick"
                 editComplete="onEditComplete"
                 destroyed="onDestroyed">
</ejs-imageeditor>
```

---

## Properties

### Core Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowUndoRedo` | bool | `true` | Enable/disable undo-redo history (16 steps) |
| `cssClass` | string | `""` | One or more CSS classes for customizing appearance |
| `disabled` | bool | `false` | Disable all editor interactions when `true` |
| `height` | string | `"100%"` | Height of the Image Editor container |
| `width` | string | `"100%"` | Width of the Image Editor container |
| `htmlAttributes` | object | — | Additional HTML attributes (title, name, etc.) |
| `imageSmoothingEnabled` | bool | `false` | Enable high-quality image smoothing during render |
| `locale` | string | `"en-US"` | Culture for localization |
| `showQuickAccessToolbar` | bool | `true` | Show/hide the quick access toolbar |
| `theme` | Theme | `Bootstrap5` | Controls appearance of shape selection handles |
| `toolbar` | object | default items | Configure main toolbar items |
| `toolbarTemplate` | string | `null` | CSS selector for a custom toolbar template element |
| `quickAccessToolbarTemplate` | string | `null` | CSS selector for a custom quick access toolbar template |

**Theme enum values:**

| Value | Description |
|-------|-------------|
| `Bootstrap5` | Bootstrap 5 theme (default) |
| `Bootstrap5Dark` | Bootstrap 5 dark theme |
| `Fabric` | Microsoft Fabric theme |
| `FabricDark` | Fabric dark theme |
| `Fluent` | Fluent design theme |
| `FluentDark` | Fluent dark theme |
| `Tailwind` | Tailwind CSS theme |
| `TailwindDark` | Tailwind dark theme |
| `Material` | Material design theme |
| `MaterialDark` | Material dark theme |
| `HighContrast` | High contrast accessibility theme |

---

### ZoomSettings

Configure zoom constraints using the controller ViewBag pattern with `ImageEditorZoomSettings`:

```csharp
// Controller action
@using Syncfusion.EJ2.ImageEditor
public IActionResult Index()
{
    ImageEditorZoomSettings zoomSettings = new ImageEditorZoomSettings
    {
        MinZoomFactor = 0.1,
        MaxZoomFactor = 10
    };
    ViewBag.zoomSettings = zoomSettings;
    return View();
}
```

```cshtml
@* View *@
@using Syncfusion.EJ2.ImageEditor
<ejs-imageeditor id="image-editor"
                 zoomSettings="@ViewBag.zoomSettings">
</ejs-imageeditor>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `minZoomFactor` | double | `0.1` | Minimum zoom level (0.1 = 10% of original) |
| `maxZoomFactor` | double | `10` | Maximum zoom level (10 = 1000% of original) |

**ZoomTrigger enum** (available in `ZoomEventArgs.zoomTrigger`):

| Value | Description |
|-------|-------------|
| `Toolbar` | Zoom triggered via toolbar buttons |
| `MouseWheel` | Zoom via Ctrl+scroll |
| `Pinch` | Touch pinch gesture |
| `Commands` | Keyboard shortcuts (Ctrl +/-) |

---

### FinetuneSettings

Configure which fine-tune options appear in the toolbar using the controller ViewBag pattern:

```csharp
// Controller action
public IActionResult Index()
{
    ViewBag.finetuneSettings = new
    {
        Brightness = true,
        Contrast = true,
        Hue = true,
        Saturation = true,
        Exposure = true,
        Blur = true,
        Opacity = true
    };
    return View();
}
```

```cshtml
@* View *@
<ejs-imageeditor id="image-editor"
                 finetuneSettings="@ViewBag.finetuneSettings">
</ejs-imageeditor>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `brightness` | bool | `true` | Show Brightness slider |
| `contrast` | bool | `true` | Show Contrast slider |
| `hue` | bool | `true` | Show Hue slider |
| `saturation` | bool | `true` | Show Saturation slider |
| `exposure` | bool | `true` | Show Exposure slider |
| `blur` | bool | `true` | Show Blur slider |
| `opacity` | bool | `true` | Show Opacity slider |

---

### SelectionSettings

Configure default selection behavior using the controller ViewBag pattern.

---

### UploadSettings

Restrict the type and size of images that can be opened using the controller ViewBag pattern:

```csharp
// Controller action
public IActionResult Index()
{
    ViewBag.uploadSettings = new
    {
        AllowedExtensions = ".jpg, .png, .webp",
        MinFileSize = 1000,
        MaxFileSize = 10000000
    };
    return View();
}
```

```cshtml
@* View *@
<ejs-imageeditor id="image-editor"
                 uploadSettings="@ViewBag.uploadSettings">
</ejs-imageeditor>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `AllowedExtensions` | string | `.jpg, .png, .svg, .webp, .bmp` | Comma-separated allowed extensions |
| `MinFileSize` | number | 0 | Minimum file size in bytes |
| `MaxFileSize` | number | unlimited | Maximum file size in bytes |

---

### FontFamily

Add custom font families to the text annotation font picker using the controller ViewBag pattern:

```csharp
// Controller action
public IActionResult Index()
{
    ViewBag.fontFamily = new
    {
        Default = "Arial",
        Items = new object[]
        {
            new { id = "Arial", text = "Arial" },
            new { id = "Georgia", text = "Georgia" },
            new { id = "CourierNew", text = "Courier New" },
            new { id = "Impact", text = "Impact" },
            new { id = "TimesNewRoman", text = "Times New Roman" }
        }
    };
    return View();
}
```

```cshtml
@* View *@
<ejs-imageeditor id="image-editor"
                 fontFamily="@ViewBag.fontFamily">
</ejs-imageeditor>
```

---

### Toolbar

The `toolbar` property accepts an array of toolbar item strings or custom item objects:

```cshtml
@{
    var imageTool = new object[] { "Undo", "Redo", "Crop", "Annotate", "Filter", "Save" };
}
<ejs-imageeditor id="image-editor" toolbar="@imageTool"></ejs-imageeditor>
```

To hide the toolbar entirely:

```cshtml
@{
    var imageTool = new string[] { };
}
<ejs-imageeditor id="image-editor" toolbar="@imageTool"></ejs-imageeditor>
```

---

## Events

All events are specified as JavaScript function name strings on the tag helper.

| Event Attribute | Event Args Type | Triggered When |
|----------------|-----------------|----------------|
| `created` | — | After the Image Editor component is fully rendered |
| `destroyed` | — | After the component is destroyed |
| `click` | `ImageEditorClickEventArgs` | User clicks on the image canvas |
| `editComplete` | — | After an editing action completes |
| `fileOpened` | `FileOpenEventArgs` | After an image is loaded (fileName, fileType) |
| `saving` | `SaveEventArgs` | When image is being saved (fileName, fileType, cancel) |
| `beforeSave` | `BeforeSaveEventArgs` | Just before image download begins (cancel) |
| `saved` | `SaveEventArgs` | After image is saved successfully |
| `cropping` | `CropEventArgs` | When crop is executed (startPoint, endPoint, cancel, preventScaling) |
| `rotating` | `RotateEventArgs` | When rotation is applied (previousDegree, currentDegree, cancel) |
| `flipping` | `FlipEventArgs` | When flip is applied (direction, cancel) |
| `zooming` | `ZoomEventArgs` | When zoom changes (previousZoomFactor, currentZoomFactor, zoomPoint, zoomTrigger, cancel) |
| `panning` | `PanEventArgs` | When panning starts (startPoint, endpoint, cancel) |
| `resizing` | `ResizeEventArgs` | When resize is applied (previousWidth, previousHeight, width, height, isAspectRatio, cancel) |
| `selectionChanging` | `SelectionChangeEventArgs` | While selection region is being changed (action, previousSelectionPoint, currentSelectionPoint, cancel) |
| `shapeChanging` | `ShapeChangeEventArgs` | While an annotation is being modified (previousShapeSettings, currentShapeSettings, cancel) |
| `shapeChange` | `ShapeChangeEventArgs` | After an annotation change completes |
| `finetuneValueChanging` | `FinetuneEventArgs` | When fine-tune is applied (finetune, value, cancel) |
| `imageFiltering` | `ImageFilterEventArgs` | When a filter is applied (filter, cancel) |
| `frameChange` | `FrameChangeEventArgs` | When frame changes (previousFrameSetting, currentFrameSetting, cancel) |
| `toolbarCreated` | — | After main toolbar initializes |
| `toolbarItemClicked` | `ToolbarClickEventArgs` | When any toolbar item is clicked (item) |
| `toolbarUpdating` | `ToolbarEventArgs` | When contextual toolbar opens (toolbarItems) |
| `quickAccessToolbarOpen` | `QuickAccessToolbarEventArgs` | When quick access toolbar opens (toolbarItems) |
| `quickAccessToolbarItemClick` | `QuickAccessToolbarEventArgs` | When quick access toolbar item is clicked (item) |

---

## Client-Side Methods

Access the instance via:
```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
```

### Image Operations

| Method | Signature | Description |
|--------|-----------|-------------|
| `open` | `open(data, isBase64?, imageSettings?)` | Load an image (URL, base64, Blob) |
| `export` | `export(type?, fileName?, quality?)` | Save image to device (`'PNG'`, `'JPEG'`, `'SVG'`, `'WEBP'`) |
| `getImageData` | `getImageData()` | Returns `ImageData` object of current canvas state |
| `clearImage` | `clearImage()` | Remove the current image from the editor |
| `reset` | `reset()` | Revert all changes back to original image state |

### Transformation Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `rotate` | `rotate(degree)` | Rotate image by degrees (positive = clockwise) |
| `flip` | `flip(direction)` | Flip image: `'Horizontal'` or `'Vertical'` |
| `straightenImage` | `straightenImage(degree)` | Straighten image ±45° range |
| `zoom` | `zoom(zoomFactor, zoomPoint?)` | Zoom image to a factor, optionally toward a point |

### Selection & Crop Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `select` | `select(type, startX?, startY?, width?, height?)` | Define a selection region |
| `crop` | `crop()` | Execute crop on the current selection |

### Annotation Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `drawText` | `drawText(x, y, text, fontFamily, fontSize, bold, italic, color, isSelected?, degree?, fillColor?, strokeColor?, strokeWidth?, transformCollection?, underline?, strikethrough?)` | Insert text annotation |
| `drawRectangle` | `drawRectangle(x, y, width, height, strokeWidth?, strokeColor?, fillColor?, degree?, isSelected?, borderRadius?)` | Insert rectangle annotation |
| `drawEllipse` | `drawEllipse(x, y, radiusX, radiusY, strokeWidth?, strokeColor?, fillColor?, degree?, isSelected?)` | Insert ellipse annotation |
| `drawLine` | `drawLine(startX, startY, endX, endY, strokeWidth?, strokeColor?, isSelected?)` | Insert line annotation |
| `drawArrow` | `drawArrow(startX, startY, endX, endY, strokeWidth?, strokeColor?, arrowStart?, arrowEnd?, isSelected?)` | Insert arrow annotation |
| `drawPath` | `drawPath(points, strokeWidth?, strokeColor?, isSelected?)` | Insert path from array of `{x,y}` points |
| `drawImage` | `drawImage(data, x?, y?, width?, height?, isAspectRatio?, degree?, opacity?, isSelected?)` | Insert image overlay/annotation |
| `freeHandDraw` | `freeHandDraw(enable)` | Enable (`true`) or disable (`false`) freehand drawing mode |
| `deleteShape` | `deleteShape(id)` | Delete annotation with the given shape ID |
| `getShapeSetting` | `getShapeSetting()` | Returns array of all current `ShapeSettings` objects |

### Fine-Tune & Filter Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `finetuneImage` | `finetuneImage(finetuneType, value)` | Apply fine-tune using `ej.imageeditor.ImageFinetuneOption` enum (e.g., `ej.imageeditor.ImageFinetuneOption.Brightness`) |
| `applyImageFilter` | `applyImageFilter(filterType)` | Apply a filter using `ej.imageeditor.ImageFilterOption` enum (e.g., `ej.imageeditor.ImageFilterOption.Sepia`) |

### Redact Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `drawRedact` | `drawRedact(type?, x?, y?, width?, height?, value?)` | Draw a blur or pixelate redaction region |
| `selectRedact` | `selectRedact(id)` | Select a redaction region by ID |
| `deleteRedact` | `deleteRedact(id)` | Remove a redaction region by ID |
| `updateRedact` | `updateRedact(setting, isSelected?)` | Update properties of an existing redaction |
| `getRedacts` | `getRedacts()` | Returns array of all current redaction objects |

### Undo & Redo Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `undo` | `undo()` | Undo the most recent action (up to 16 steps) |
| `redo` | `redo()` | Redo the most recently undone action |

### Frame Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `drawFrame` | `drawFrame(frameType, color, gradientColor, size, inset, offset, borderRadius, frameLineStyle, lineCount)` | Apply a decorative frame; use `ej.imageeditor.FrameType` and `ej.imageeditor.FrameLineStyle` enums |
