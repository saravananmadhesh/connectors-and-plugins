# Annotations — Syncfusion ASP.NET Core Image Editor

## ⚠️ Security Note: Use Local Assets Only

**DO NOT** use `drawImage()` with external URLs. Only reference local assets:
- ✅ `imageEditor.drawImage('/images/logo.png', ...)` — Local asset
- ❌ `imageEditor.drawImage('https://external-site.com/logo.png', ...)` — Security risk

See [Security & Trust Boundary](../SKILL.md#security--trust-boundary) for details.

## Table of Contents
- [Text Annotations](#text-annotations)
  - [drawText()](#drawtext)
  - [Multiline Text](#multiline-text)
  - [Custom Font Families](#custom-font-families)
- [Shape Annotations](#shape-annotations)
  - [drawRectangle()](#drawrectangle)
  - [drawEllipse()](#drawellipse)
  - [drawLine()](#drawline)
  - [drawArrow()](#drawarrow)
  - [drawPath()](#drawpath)
- [Image Annotations](#image-annotations)
  - [drawImage()](#drawimage)
- [Freehand Drawing](#freehand-drawing)
- [Managing Annotations](#managing-annotations)
  - [deleteShape()](#deleteshape)
  - [getShapeSetting()](#getshapesetting)
- [Z-Order Management](#z-order-management)
- [Events](#events)
  - [ShapeChanging Event](#shapechanging-event)
  - [ShapeChange Event](#shapechange-event)

---

## Text Annotations

### drawText()

Insert a text annotation at a specified position with full typography control.

```javascript
imageEditor.drawText(x, y, text, fontFamily, fontSize, bold, italic, color,
                     isSelected, degree, fillColor, strokeColor, strokeWidth,
                     transformCollection, underline, strikethrough);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `x` | number | X-coordinate of the text position |
| `y` | number | Y-coordinate of the text position |
| `text` | string | Text content |
| `fontFamily` | string | Font family name (e.g., `'Arial'`) |
| `fontSize` | number | Font size in pixels |
| `bold` | boolean | Bold style |
| `italic` | boolean | Italic style |
| `color` | string | Font color (e.g., `'#FF0000'`, `'red'`) |
| `isSelected` | boolean | Show text in selected state after insert |
| `degree` | number | Rotation angle |
| `fillColor` | string | Background fill color of the text box |
| `strokeColor` | string | Outline color of the text annotation |
| `strokeWidth` | number | Outline stroke width |
| `transformCollection` | object[] | Pre-existing transform data |
| `underline` | boolean | Underline text |
| `strikethrough` | boolean | Strikethrough text |

**Basic example:**

```cshtml
<ejs-button id="addText" cssClass="e-primary" content="Add Text" onclick="addText()"></ejs-button>
<ejs-imageeditor id="image-editor" created="onCreated"></ejs-imageeditor>

<script>
function onCreated() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function addText() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var dimension = imageEditorObj.getImageDimension();
    imageEditorObj.drawText(dimension.x, dimension.y, 'Hello World', 'Arial', 20, true, false, '#000000');
}
</script>
```

**With fill and stroke:**

```javascript
// Bold italic text with yellow background and red outline
imageEditor.drawText(50, 50, 'Sample', 'Georgia', 18, true, true, '#003366',
                     true, 0, '#FFFF00', '#FF0000', 2);
```

**With underline and strikethrough:**

```javascript
imageEditor.drawText(50, 80, 'Formatted Text', 'Arial', 16, false, false, '#333333',
                     false, 0, 'transparent', 'transparent', 0, null, true, false);
```

### Multiline Text

Insert a newline character (`\n`) in the text string to create multi-line text annotations:

```javascript
imageEditor.drawText(50, 50, 'Line One\nLine Two\nLine Three', 'Arial', 16, false, false, '#000000');
```

### Custom Font Families

Extend the font family dropdown by configuring the `fontFamily` property via the controller:

**Controller (HomeController.cs):**
```csharp
public IActionResult Index()
{
    ViewBag.fontFamily = new
    {
        Default = "Arial",
        Items = new[]
        {
            new { Id = "Arial", Text = "Arial" },
            new { Id = "Georgia", Text = "Georgia" },
            new { Id = "Courier New", Text = "Courier New" },
            new { Id = "MyCustomFont", Text = "My Custom Font" }
        }
    };
    return View();
}
```

**View (Index.cshtml):**
```cshtml
<ejs-imageeditor id="image-editor" created="created" fontFamily="@ViewBag.fontFamily"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}
</script>
```

> The font value is determined by the `Id` property. Ensure any custom font is loaded via CSS `@font-face` before referencing it.

---

## Shape Annotations

### drawRectangle()

```javascript
imageEditor.drawRectangle(x, y, width, height, strokeWidth, strokeColor, fillColor,
                           degree, isSelected, borderRadius);
```

```cshtml
<ejs-button id="addRect" cssClass="e-primary" content="Add Rectangle" onclick="addRect()"></ejs-button>
<ejs-imageeditor id="image-editor" created="created"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function addRect() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var dimension = imageEditorObj.getImageDimension();
    // Draw a blue rectangle with rounded corners
    imageEditorObj.drawRectangle(dimension.x + 10, dimension.y + 60, 150, 70, null, '', '', null, null, 8);
}
</script>
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `x` | number | Top-left X |
| `y` | number | Top-left Y |
| `width` | number | Rectangle width |
| `height` | number | Rectangle height |
| `strokeWidth` | number | Border width |
| `strokeColor` | string | Border color |
| `fillColor` | string | Fill color |
| `degree` | number | Rotation angle |
| `isSelected` | boolean | Select after insert |
| `borderRadius` | number | Corner radius |

### drawEllipse()

```javascript
imageEditor.drawEllipse(x, y, radiusX, radiusY, strokeWidth, strokeColor, fillColor, degree, isSelected);
```

```javascript
// Draw a red ellipse centered at (200, 150)
imageEditor.drawEllipse(200, 150, 80, 50, 2, '#FF0000', 'rgba(255,0,0,0.2)', 0, true);
```

| Parameter | Description |
|-----------|-------------|
| `x`, `y` | Center coordinates |
| `radiusX` | Horizontal radius |
| `radiusY` | Vertical radius |

### drawLine()

```javascript
imageEditor.drawLine(startX, startY, endX, endY, strokeWidth, strokeColor, isSelected);
```

```javascript
// Draw a green line from (50, 50) to (250, 200)
imageEditor.drawLine(50, 50, 250, 200, 3, '#00AA00', true);
```

### drawArrow()

```javascript
imageEditor.drawArrow(startX, startY, endX, endY, strokeWidth, strokeColor,
                      arrowStart, arrowEnd, isSelected);
```

```javascript
// Arrow with a solid arrowhead at end
imageEditor.drawArrow(50, 100, 250, 100, 2, '#FF6600', 'None', 'ArrowSolid', true);
```

**Arrow head types:** `'None'`, `'Arrow'`, `'ArrowSolid'`, `'Circle'`, `'CircleSolid'`, `'Square'`, `'SquareSolid'`, `'Bar'`

### drawPath()

Draw a custom path using an array of `{ x, y }` points:

```javascript
imageEditor.drawPath(points, strokeWidth, strokeColor, isSelected);
```

```javascript
var points = [
    { x: 100, y: 100 },
    { x: 150, y: 50 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 }
];
imageEditor.drawPath(points, 2, '#8800AA', true);
```

---

## Image Annotations

### drawImage()

Overlay an image (logo, watermark, icon) onto the canvas:

```javascript
imageEditor.drawImage(data, x, y, width, height, isAspectRatio, degree, opacity, isSelected);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | string | Image URL or base64 data URL |
| `x` | number | Top-left X position |
| `y` | number | Top-left Y position |
| `width` | number | Image width |
| `height` | number | Image height |
| `isAspectRatio` | boolean | Maintain aspect ratio |
| `degree` | number | Rotation angle |
| `opacity` | number | Opacity (0–1) |
| `isSelected` | boolean | Show selected after insert |

```javascript
// Add a semi-transparent logo watermark
imageEditor.drawImage('logo.png', 10, 10, 100, 50, true, 0, 0.5, false);
```

---

## Freehand Drawing

Enable or disable freehand pen drawing with `freeHandDraw()`:

```cshtml
<ejs-button id="btnEnable" cssClass="e-primary" content="Enable Freehand" onclick="clickHandler()"></ejs-button>
<ejs-button id="btnApply" cssClass="e-primary" content="Apply" onclick="applyClickHandler()"></ejs-button>
<ejs-imageeditor id="image-editor" created="created"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function clickHandler() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.freeHandDraw(true);
}

function applyClickHandler() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.freeHandDraw(false);
}
</script>
```

Customize stroke via the `shapeChanging` event when freehand draw mode is active.

---

## Managing Annotations

### deleteShape()

Remove an annotation by its shape ID:

```cshtml
<ejs-button id="btnClick" cssClass="e-primary" content="Add Shape" onclick="clickHandler()"></ejs-button>
<ejs-button id="delBtnClick" content="Delete Shape" onclick="deleteHandler()"></ejs-button>
<ejs-imageeditor id="image-editor" created="created"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function clickHandler() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var dimension = imageEditorObj.getImageDimension();
    imageEditorObj.drawRectangle(dimension.x, dimension.y);
}

function deleteHandler() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.deleteShape('shape_1');
}
</script>
```

### getShapeSetting()

Retrieve all current annotations as an array of `ShapeSettings` objects. Each item includes `id`, `type`, position, size, and styling details.

```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
var shapes = imageEditorObj.getShapeSetting();
shapes.forEach(function(shape) {
    console.log('Shape ID:', shape.id, 'Type:', shape.type);
});
```

---

## Z-Order Management

Control the layer order of annotations using the quick access toolbar when an annotation is selected. The toolbar provides:

| Action | Description |
|--------|-------------|
| **Bring Forward** | Move selected annotation one layer ahead |
| **Send Backward** | Move selected annotation one layer behind |
| **Bring to Front** | Move selected annotation to top of all layers |
| **Send to Back** | Move selected annotation behind all other layers |

These are available in the context toolbar when an annotation is selected; no additional code required.

---

## Events

### ShapeChanging Event

Triggered while an annotation is being modified through toolbar interaction. Useful for customizing default colors or preventing specific changes.

```cshtml
<ejs-imageeditor id="image-editor" created="created" shapeChanging="shapeChanging"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function shapeChanging(args) {
    // args.currentShapeSettings  - settings being applied
    // args.previousShapeSettings - settings before change
    // args.cancel                - set true to cancel

    // Example: override default stroke color for Rectangle shapes
    if (args.currentShapeSettings.type === 'Rectangle') {
        args.currentShapeSettings.strokeColor = 'red';
    }
}
</script>
```

**Customize font color and family for text annotations:**

```javascript
function shapeChanging(args) {
    if (args.currentShapeSettings.type === 'Text') {
        args.currentShapeSettings.color = 'red';
        args.currentShapeSettings.fontFamily = 'Times New Roman';
    }
}
```

**Customize freehand stroke color and width:**

```javascript
function shapeChanging(args) {
    if (args.currentShapeSettings.type === 'FreehandDraw') {
        args.currentShapeSettings.strokeColor = 'red';
        args.currentShapeSettings.strokeWidth = 10;
    }
}
```

### ShapeChange Event

Triggered after an annotation change is completed.

```cshtml
<ejs-imageeditor id="image-editor" created="created" shapeChange="shapeChange"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function shapeChange(args) {
    // Fires after the annotation has been updated
    console.log('Shape changed:', args.currentShapeSettings);
}
</script>
```

