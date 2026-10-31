# Frames, Upload Restrictions, Localization, Accessibility & Undo-Redo

## Table of Contents
- [Frames](#frames)
  - [drawFrame()](#drawframe)
  - [FrameChange Event](#framechange-event)
- [Upload Restrictions](#upload-restrictions)
  - [Allowed Extensions](#allowed-extensions)
  - [File Size Limits](#file-size-limits)
- [Localization](#localization)
  - [Setting the Locale](#setting-the-locale)
  - [Locale Key Reference](#locale-key-reference)
- [Accessibility](#accessibility)
  - [Compliance Summary](#compliance-summary)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
- [Undo & Redo](#undo--redo)
  - [undo() and redo() Methods](#undo-and-redo-methods)
  - [AllowUndoRedo Property](#allowundoredo-property)
  - [Undo/Redo History Limit](#undoredo-history-limit)

---

## Frames

The frame feature adds decorative borders around the image. Frame types include mat, bevel, line, hook, and inset — each with customizable color, size, and style.

### drawFrame()

```javascript
imageEditor.drawFrame(frameType, color, gradientColor, size, inset, offset, borderRadius, frameLineStyle, lineCount);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `frameType` | string | Frame type: `'Mat'`, `'Bevel'`, `'Line'`, `'Hook'`, `'Inset'` |
| `color` | string | Frame color |
| `gradientColor` | string | Gradient color for the frame |
| `size` | number | Thickness/size of the frame |
| `inset` | number | Inset value (for Line, Hook, Inset types) |
| `offset` | number | Offset value (for Line and Inset types) |
| `borderRadius` | number | Border radius (for Line type) |
| `frameLineStyle` | string | Line style for Line type: `'Solid'`, `'Dashed'`, `'Dotted'` |
| `lineCount` | number | Number of lines (for Line type) |

**Mat frame (simple solid border):**

```cshtml
<ejs-button id="addMat" content="Add Mat Frame" onclick="addMatFrame()"></ejs-button>
<ejs-imageeditor id="image-editor" created="onCreated"></ejs-imageeditor>

<script>
function onCreated() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imgUrl = ej.base.Browser.isDevice
        ? '/images/flower.png'
        : '/images/bridge.png';
    imageEditorObj.open(imgUrl);
}

function addMatFrame() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.drawFrame(ej.imageeditor.FrameType.Mat, '#FFFFFF', '#FFFFFF', 20, 0, 0, 0, ej.imageeditor.FrameLineStyle.Solid, 1);
}
</script>
```

**Bevel frame:**

```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
imageEditorObj.drawFrame(ej.imageeditor.FrameType.Bevel, '#8B4513', '#D2691E', 25, 0, 0, 0, ej.imageeditor.FrameLineStyle.Solid, 1);
```

**Line frame with dashed style:**

```javascript
imageEditorObj.drawFrame(ej.imageeditor.FrameType.Line, '#000000', '#000000', 5, 10, 5, 8, ej.imageeditor.FrameLineStyle.Dashed, 2);
```

**Hook frame:**

```javascript
imageEditorObj.drawFrame(ej.imageeditor.FrameType.Hook, '#336699', '#336699', 15, 8, 0, 0, ej.imageeditor.FrameLineStyle.Solid, 1);
```

**Inset frame:**

```javascript
imageEditorObj.drawFrame(ej.imageeditor.FrameType.Inset, '#222222', '#444444', 20, 12, 5, 0, ej.imageeditor.FrameLineStyle.Solid, 1);
```

---

### FrameChange Event

Triggered when a frame is applied or changed.

```cshtml
<ejs-imageeditor id="image-editor" frameChange="onFrameChange"></ejs-imageeditor>

<script>
function onFrameChange(args) {
    // args.previousFrameSetting - frame settings before the change
    //   { size, color, inset, offset, gradientColor }
    // args.currentFrameSetting  - frame settings after the change
    // args.cancel               - set true to cancel the frame change
    console.log('Previous frame:', args.previousFrameSetting);
    console.log('New frame:', args.currentFrameSetting);
}
</script>
```

---

## Upload Restrictions

Control which files users can open in the Image Editor using `UploadSettings`.

> **Note:** If `UploadSettings` is not defined, the editor allows `.jpg`, `.png`, `.svg`, `.webp`, and `.bmp` with no size restrictions by default.

### Allowed Extensions

Use the controller ViewBag pattern to set upload settings:

```csharp
// Controller action
public IActionResult Index()
{
    ViewBag.uploadSettings = new
    {
        AllowedExtensions = ".jpg, .png, .webp"
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

> Format: comma-separated string of extensions, each prefixed with a dot (e.g., `'.jpg, .png'`).

### File Size Limits

Restrict the minimum and maximum file size (in bytes):

```csharp
// Controller action
public IActionResult Index()
{
    ViewBag.uploadSettings = new
    {
        AllowedExtensions = ".jpg, .png, .webp, .bmp",
        MinFileSize = 10000,
        MaxFileSize = 5000000
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

| Property | Type | Description |
|----------|------|-------------|
| `AllowedExtensions` | string | Comma-separated list of allowed extensions |
| `MinFileSize` | number | Minimum file size in bytes |
| `MaxFileSize` | number | Maximum file size in bytes |

> Users receive clear alert messages when uploads violate these restrictions.
> Base64 uploads bypass extension validation but still respect size limits.

---

## Localization

Translate the Image Editor UI into any language using the Syncfusion `L10n` library.

### Setting the Locale

```cshtml
<ejs-imageeditor id="image-editor" locale="de"></ejs-imageeditor>

<script>
    // Load the translation object before the component renders
    ej.base.L10n.load({
        'de': {
            'image-editor': {
                'Crop': 'Zuschneiden',
                'ZoomIn': 'Hereinzoomen',
                'ZoomOut': 'Herauszoomen',
                'Undo': 'Rückgängig',
                'Redo': 'Wiederholen',
                'Save': 'Speichern',
                'Reset': 'Zurücksetzen',
                'Annotation': 'Anmerkung',
                'Filter': 'Filter',
                'Finetune': 'Feinabstimmung',
                'Transform': 'Transformieren'
                // ... additional keys
            }
        }
    });
</script>
```

### Locale Key Reference

Key locale strings used in the Image Editor:

| Key | Default Text |
|-----|-------------|
| `Crop` | Crop |
| `ZoomIn` | Zoom In |
| `ZoomOut` | Zoom Out |
| `Undo` | Undo |
| `Redo` | Redo |
| `Transform` | Transform |
| `Annotation` | Annotation |
| `Finetune` | Finetune |
| `Brightness` | Brightness |
| `Contrast` | Contrast |
| `Hue` | Hue |
| `Saturation` | Saturation |
| `Opacity` | Opacity |
| `Blur` | Blur |
| `Exposure` | Exposure |
| `Filter` | Filter |
| `Chrome` | Chrome |
| `Cold` | Cold |
| `Warm` | Warm |
| `Grayscale` | Grayscale |
| `Sepia` | Sepia |
| `Invert` | Invert |
| `Text` | Add Text |
| `Reset` | Reset |
| `Save` | Save |
| `RotateLeft` | Rotate Left |
| `RotateRight` | Rotate Right |
| `HorizontalFlip` | Horizontal Flip |
| `VerticalFlip` | Vertical Flip |
| `OK` | Apply |
| `Cancel` | Discard |
| `Frame` | Frame |
| `Resize` | Resize |
| `Redact` | Redact |
| `Straighten` | Straighten |
| `SaveAs` | Save As |
| `ConfirmDialogHeader` | Confirm Save Changes |
| `AlertDialogHeader` | Unsupported file |
| `ZOrder` | Z-Order |
| `BringForward` | Bring Forward |
| `SendBackward` | Send Backward |
| `BringToFront` | Bring to Front |
| `SendToBack` | Send to Back |

For the full list of ~100+ localization keys, refer to official Syncfusion documentation or the `Locale` property in the Image Editor API reference.

---

## Accessibility

### Compliance Summary

| Criteria | Support |
|----------|---------|
| WCAG 2.2 Level AA | ✅ |
| Section 508 | ✅ |
| Screen Reader | ✅ |
| Right-to-Left (RTL) | ✅ |
| Color Contrast | ✅ |
| Mobile / Touch | ✅ |
| Keyboard Navigation | ✅ |

### Keyboard Shortcuts

| Key Combination | Action |
|-----------------|--------|
| `Ctrl + Z` | Undo the last action |
| `Ctrl + Y` | Redo the last undone action |
| `Ctrl + S` | Save/export the image (same format as opened) |
| `Ctrl + O` | Open an image |
| `Delete` | Delete the selected annotation |
| `Enter` | Apply crop selection or image resize |
| `Escape` | Discard current operation (annotation drawing, crop, etc.) |

No additional configuration is needed — all keyboard shortcuts work out of the box.

---

## Undo & Redo

### undo() and redo() Methods

All actions (annotations, transformations, filters, crops) are automatically tracked:

```cshtml
<ejs-button id="undoBtn" content="Undo" onclick="doUndo()"></ejs-button>
<ejs-button id="redoBtn" content="Redo" onclick="doRedo()"></ejs-button>
<ejs-imageeditor id="image-editor"></ejs-imageeditor>

<script>
function doUndo() {
    ej.base.getComponent(document.getElementById('image-editor'), 'image-editor').undo();
}

function doRedo() {
    ej.base.getComponent(document.getElementById('image-editor'), 'image-editor').redo();
}
</script>
```

### AllowUndoRedo Property

Disable undo/redo tracking entirely (useful for performance in scenarios where history is not needed):

```cshtml
<ejs-imageeditor id="image-editor" allowUndoRedo="false"></ejs-imageeditor>
```

### Undo/Redo History Limit

The Image Editor stores up to **16 steps** of undo/redo history. When the 17th action is performed, the oldest action is dropped from history. This limit is fixed and cannot be configured.


