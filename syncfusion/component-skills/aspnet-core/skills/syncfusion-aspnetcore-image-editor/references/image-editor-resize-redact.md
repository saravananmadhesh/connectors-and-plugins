# Resize & Redact — Syncfusion ASP.NET Core Image Editor

## Table of Contents
- [Resize](#resize)
  - [resize() Method](#resize-method)
  - [Resizing Event](#resizing-event)
- [Redact](#redact)
  - [drawRedact()](#drawredact)
  - [selectRedact()](#selectredact)
  - [deleteRedact()](#deleteredact)
  - [updateRedact()](#updateredact)
  - [getRedacts()](#getredacts)
  - [Complete Redact Example](#complete-redact-example)

---

## Resize

### resize() Method

Change the pixel dimensions of the image.

```javascript
imageEditor.resize(width, height, isAspectRatio);
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | number | — | Target width in pixels |
| `height` | number | — | Target height in pixels |
| `isAspectRatio` | boolean | false | Maintain original aspect ratio |

**Behavior when `isAspectRatio: true`:**
- The specified `width` is applied exactly
- The `height` is automatically recalculated to maintain the original aspect ratio

**Behavior when `isAspectRatio: false`:**
- Both `width` and `height` are applied exactly, regardless of the original ratio

```cshtml
<ejs-button id="resize800" content="Resize to 800px" onclick="resizeTo800()"></ejs-button>
<ejs-button id="resizeCustom" content="Resize 400x300" onclick="resizeCustom()"></ejs-button>
<ejs-imageeditor id="image-editor" created="onCreated"></ejs-imageeditor>

<script>
function onCreated() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imgUrl = ej.base.Browser.isDevice
        ? '/images/flower.png'
        : '/images/bridge.png';
    imageEditorObj.open(imgUrl);
}

// Resize to 800px wide, auto-calculate height to maintain aspect ratio
function resizeTo800() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.resize(800, 0, true);
}

// Resize to exact 400×300, ignoring aspect ratio
function resizeCustom() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.resize(400, 300, false);
}
</script>
```

---

### Resizing Event

Triggered when a resize operation is performed. Provides before/after dimensions and allows cancellation.

```cshtml
<ejs-imageeditor id="image-editor" resizing="onResizing"></ejs-imageeditor>

<script>
function onResizing(args) {
    // args.previousWidth   - width before resize
    // args.previousHeight  - height before resize
    // args.width           - target width after resize
    // args.height          - target height after resize
    // args.isAspectRatio   - whether aspect ratio is maintained
    // args.cancel          - set true to cancel the resize

    // Example: prevent resizing larger than 2000px
    if (args.width > 2000 || args.height > 2000) {
        args.cancel = true;
        console.warn('Resize cancelled: max 2000×2000 allowed.');
    }

    console.log('Resize:', args.previousWidth + 'x' + args.previousHeight,
                '->', args.width + 'x' + args.height);
}
</script>
```

---

## Redact

Redaction allows you to conceal sensitive areas of an image using blur or pixelate effects. This is useful for privacy compliance — hiding faces, license plates, personal information, etc.

### drawRedact()

Draw a redaction region on the image:

```javascript
imageEditor.drawRedact(type, x, y, width, height, value);
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | `'Blur'` | Redact type: `'Blur'` or `'Pixelate'` |
| `x` | number | center | X-coordinate of redact region |
| `y` | number | center | Y-coordinate of redact region |
| `width` | number | 100 | Width of redact region |
| `height` | number | 50 | Height of redact region |
| `value` | number | 20 | Blur intensity or pixel size |

```cshtml
<ejs-button id="blurFace" content="Blur Face Area" onclick="blurFace()"></ejs-button>
<ejs-button id="pixelate" content="Pixelate Text" onclick="pixelateText()"></ejs-button>
<ejs-imageeditor id="image-editor" created="onCreated"></ejs-imageeditor>

<script>
function onCreated() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imgUrl = ej.base.Browser.isDevice
        ? '/images/flower.png'
        : '/images/bridge.png';
    imageEditorObj.open(imgUrl);
}

// Apply blur redaction
function blurFace() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.drawRedact('Blur', 100, 50, 120, 120, 25);
}

// Apply pixelate redaction
function pixelateText() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.drawRedact('Pixelate', 50, 200, 200, 30, 10);
}
</script>
```

---

### selectRedact()

Select a specific redaction region by its ID (to view or prepare for update/delete):

```javascript
imageEditor.selectRedact(id);
```

```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
var redacts = imageEditorObj.getRedacts();
if (redacts.length > 0) {
    imageEditorObj.selectRedact(redacts[0].id);
}
```

---

### deleteRedact()

Remove a redaction region by its ID:

```javascript
imageEditorObj.deleteRedact(id);
```

```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
var redacts = imageEditorObj.getRedacts();
if (redacts.length > 0) {
    imageEditorObj.deleteRedact(redacts[0].id);
}
```

---

### updateRedact()

Update the properties of an existing redaction:

```javascript
imageEditorObj.updateRedact(setting, isSelected);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `setting` | object | Updated redact settings (id + new property values) |
| `isSelected` | boolean | Show redaction in selected state after update |

```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
var redacts = imageEditorObj.getRedacts();
if (redacts.length > 0) {
    var firstRedact = redacts[0];
    // Increase blur intensity on the first redaction
    firstRedact.value = 40;
    firstRedact.width = 150;
    imageEditorObj.updateRedact(firstRedact, true);
}
```

---

### getRedacts()

Retrieve all redaction regions currently on the image:

```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
var redacts = imageEditorObj.getRedacts();
```

Returns an array of redact objects, each containing:
- `id` — unique identifier
- `type` — `'Blur'` or `'Pixelate'`
- `x`, `y` — position
- `width`, `height` — dimensions
- `value` — blur/pixel intensity

---

### Complete Redact Example

```cshtml
<div>
    <ejs-button id="addBlur" content="Add Blur" onclick="addBlur()"></ejs-button>
    <ejs-button id="addPixelate" content="Add Pixelate" onclick="addPixelate()"></ejs-button>
    <ejs-button id="deleteFirst" content="Delete First" onclick="deleteFirst()"></ejs-button>
    <ejs-button id="updateFirst" content="Increase Blur" onclick="increaseBlur()"></ejs-button>
</div>
<ejs-imageeditor id="image-editor" created="onCreated"></ejs-imageeditor>

<script>
function onCreated() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imgUrl = ej.base.Browser.isDevice
        ? '/images/flower.png'
        : '/images/bridge.png';
    imageEditorObj.open(imgUrl);
}

function addBlur() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.drawRedact('Blur', 100, 100, 150, 60, 20);
}

function addPixelate() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.drawRedact('Pixelate', 300, 100, 100, 40, 8);
}

function deleteFirst() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var redacts = imageEditorObj.getRedacts();
    if (redacts && redacts.length > 0) {
        imageEditorObj.deleteRedact(redacts[0].id);
    }
}

function increaseBlur() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var redacts = imageEditorObj.getRedacts();
    if (redacts && redacts.length > 0) {
        var r = redacts[0];
        r.value = Math.min(100, r.value + 10);
        imageEditorObj.updateRedact(r, true);
    }
}
</script>
```


