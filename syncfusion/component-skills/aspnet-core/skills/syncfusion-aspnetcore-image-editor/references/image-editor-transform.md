# Transformations — Syncfusion ASP.NET Core Image Editor

Covers rotate, flip, straighten, zoom, and panning operations that transform the image and its annotations together.

## Table of Contents
- [Rotate](#rotate)
- [Flip](#flip)
- [Straighten](#straighten)
- [Zoom](#zoom)
  - [ZoomSettings](#zoomsettings)
- [Panning](#panning)
- [Events](#events)
  - [Rotating Event](#rotating-event)
  - [Flipping Event](#flipping-event)
  - [Zooming Event](#zooming-event)
  - [Panning Event](#panning-event)

---

## Rotate

The `rotate()` method rotates the image and all its annotations by the specified number of degrees. Positive values rotate clockwise; negative values rotate counter-clockwise.

> **Best practice:** Pass multiples of 90° (90, 180, 270, -90) for clean alignment.

```cshtml
@{
    var imageTool = new string[] { };
}
<ejs-button id="rotateLeft" cssClass="e-primary" content="Rotate Left" onclick="rotateLeft()"></ejs-button>
<ejs-button id="rotateRight" cssClass="e-primary" content="Rotate Right" onclick="rotateRight()"></ejs-button>
<ejs-imageeditor id="image-editor" created="created" toolbar="@imageTool"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function rotateLeft() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.rotate(-90);   // 90° counter-clockwise
}

function rotateRight() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.rotate(90);    // 90° clockwise
}
</script>
```

---

## Flip

The `flip()` method mirrors the image and its annotations along the specified axis.

- `'Horizontal'` — mirror left-to-right
- `'Vertical'` — mirror top-to-bottom

```cshtml
@{
    var imageTool = new string[] { };
}
<ejs-button id="flipH" cssClass="e-primary" content="Flip Horizontal" onclick="flipHorizontal()"></ejs-button>
<ejs-button id="flipV" cssClass="e-primary" content="Flip Vertical" onclick="flipVertical()"></ejs-button>
<ejs-imageeditor id="image-editor" created="created" toolbar="@imageTool"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function flipHorizontal() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.flip('Horizontal');
}

function flipVertical() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.flip('Vertical');
}
</script>
```

---

## Straighten

The `straightenImage()` method rotates the image slightly to correct perspective or horizon alignment. The degree must be within **−45 to +45**.

- Positive value → clockwise
- Negative value → counter-clockwise

```cshtml
<ejs-imageeditor id="image-editor" created="created"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function straighten(degree) {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.straightenImage(degree);  // e.g., 5 for slight clockwise correction
}
</script>
```

---

## Zoom

The `zoom()` method magnifies or reduces the image view.

**Parameters:**
- `zoomFactor` — multiplier value (e.g., `2` for 2×, `0.5` for 50%)
- `zoomPoint` *(optional)* — `{ x, y }` coordinates to zoom toward a specific point

```cshtml
@{
    var imageTool = new string[] { };
}
<ejs-button id="zoomIn" cssClass="e-primary" content="Zoom In" onclick="zoomIn()"></ejs-button>
<ejs-button id="zoomOut" cssClass="e-primary" content="Zoom Out" onclick="zoomOut()"></ejs-button>
<ejs-imageeditor id="image-editor" created="created" toolbar="@imageTool"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function zoomIn() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.zoom(2);   // zoom to 2× magnification
}

function zoomOut() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.zoom(0.5); // zoom to 50%
}

function zoomToPoint() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    // Zoom 2× toward point (200, 150) on the canvas
    imageEditorObj.zoom(2, { x: 200, y: 150 });
}
</script>
```

### ZoomSettings

Configure zoom limits using a server-side `ImageEditorZoomSettings` object and pass it via the `zoomSettings` attribute on the tag helper.

```cshtml
@using Syncfusion.EJ2.ImageEditor
@{
    var imageTool = new string[] { };
    var zoomSettings = new ImageEditorZoomSettings {
        MinZoomFactor = 0.1,
        MaxZoomFactor = 5
    };
}

<ejs-imageeditor id="image-editor" zoomSettings="@zoomSettings" toolbar="@imageTool"></ejs-imageeditor>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `MinZoomFactor` | double | 0.1 | Minimum zoom level (10% of original) |
| `MaxZoomFactor` | double | 10 | Maximum zoom level (10× original) |

> When the image is zoomed beyond the canvas boundaries, panning becomes available automatically.

---

## Panning

Panning lets users drag the image to view parts that extend beyond the canvas. It activates automatically when:
- An image is zoomed beyond canvas bounds
- A crop selection is active and the image is larger than the selection

No configuration required — panning is built into the editor interaction model.

```cshtml
<ejs-imageeditor id="image-editor" panning="onPanning"></ejs-imageeditor>

<script>
function onPanning(args) {
    console.log('Pan start:', args.startPoint);
    console.log('Pan end:', args.endpoint);
}
</script>
```

---

## Events

### Rotating Event

Triggered when a rotation is applied. Provides previous and current rotation degrees. Set `cancel: true` to prevent the rotation.

```cshtml
<ejs-imageeditor id="image-editor" rotating="onRotating"></ejs-imageeditor>

<script>
function onRotating(args) {
    // args.previousDegree - degree before this rotation
    // args.currentDegree  - degree after rotation
    // args.cancel         - set true to cancel
    console.log('Rotated from', args.previousDegree, 'to', args.currentDegree);
}
</script>
```

### Flipping Event

Triggered when a flip is applied.

```cshtml
<ejs-imageeditor id="image-editor" flipping="onFlipping"></ejs-imageeditor>

<script>
function onFlipping(args) {
    // args.direction - 'Horizontal' or 'Vertical'
    // args.cancel    - set true to cancel
    console.log('Flip direction:', args.direction);
}
</script>
```

### Zooming Event

Triggered when a zoom action occurs. Includes previous and current zoom factors plus the trigger type.

```cshtml
<ejs-imageeditor id="image-editor" zooming="onZooming"></ejs-imageeditor>

<script>
function onZooming(args) {
    // args.previousZoomFactor - zoom before action
    // args.currentZoomFactor  - zoom after action
    // args.zoomPoint          - { x, y } zoom origin point
    // args.zoomTrigger        - trigger type (Toolbar, Pinch, MouseWheel, etc.)
    // args.cancel             - set true to cancel
    console.log('Zoom:', args.previousZoomFactor, '->', args.currentZoomFactor);
}
</script>
```

### Panning Event

Triggered when the user starts dragging the image.

```cshtml
<ejs-imageeditor id="image-editor" panning="onPanning"></ejs-imageeditor>

<script>
function onPanning(args) {
    // args.startPoint - { x, y } where drag started
    // args.endpoint   - { x, y } current drag position
    // args.cancel     - set true to cancel panning
}
</script>
```

