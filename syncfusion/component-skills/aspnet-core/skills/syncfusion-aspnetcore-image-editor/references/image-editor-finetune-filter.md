# Fine-Tune & Filters — Syncfusion ASP.NET Core Image Editor

## Table of Contents
- [Fine-Tuning](#fine-tuning)
  - [finetuneImage()](#finetuneimage)
  - [FinetuneSettings Property](#finetunesettings-property)
  - [FinetuneValueChanging Event](#finetunevaluechanging-event)
- [Image Filters](#image-filters)
  - [applyImageFilter()](#applyimagefilter)
  - [ImageFiltering Event](#imagefiltering-event)

---

## Fine-Tuning

Fine-tuning allows precise adjustments to image properties like brightness, contrast, and saturation. Each fine-tune operation accepts an intensity value to control the degree of the adjustment.

### finetuneImage()

```javascript
imageEditor.finetuneImage(finetuneType, value);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `finetuneType` | string (ImageFinetuneOption) | The adjustment type |
| `value` | number | Intensity of the adjustment |

**Fine-tune types (ImageFinetuneOption):**

| Type | Range | Description |
|------|-------|-------------|
| `'Brightness'` | -100 to 100 | Lighten or darken the image |
| `'Contrast'` | -100 to 100 | Increase or decrease tonal difference |
| `'Saturation'` | -100 to 100 | Adjust color intensity |
| `'Hue'` | -100 to 100 | Shift color hue |
| `'Exposure'` | -100 to 100 | Control exposure level |
| `'Blur'` | 0 to 100 | Apply Gaussian blur |
| `'Opacity'` | 0 to 100 | Control overall image transparency |

**Brightness adjustment:**

```cshtml
<input id="brightnessSlider" type="range" min="-100" max="100" value="0"
       oninput="adjustBrightness(this.value)" />
<label>Brightness: <span id="brightnessValue">0</span></label>
<ejs-imageeditor id="image-editor" created="onCreated"></ejs-imageeditor>

<script>
function onCreated() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imgUrl = ej.base.Browser.isDevice
        ? '/images/flower.png'
        : '/images/bridge.png';
    imageEditorObj.open(imgUrl);
}

function adjustBrightness(value) {
    document.getElementById('brightnessValue').textContent = value;
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.finetuneImage(ej.imageeditor.ImageFinetuneOption.Brightness, parseInt(value));
}
</script>
```

**Multiple adjustments example:**

```cshtml
<ejs-button id="enhance" content="Enhance Photo" onclick="enhancePhoto()"></ejs-button>
<ejs-imageeditor id="image-editor"></ejs-imageeditor>

<script>
function enhancePhoto() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.finetuneImage(ej.imageeditor.ImageFinetuneOption.Brightness, 10);
    imageEditorObj.finetuneImage(ej.imageeditor.ImageFinetuneOption.Contrast, 15);
    imageEditorObj.finetuneImage(ej.imageeditor.ImageFinetuneOption.Saturation, 20);
}
</script>
```

**Blur and opacity:**

```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
imageEditorObj.finetuneImage(ej.imageeditor.ImageFinetuneOption.Blur, 30);     // moderate blur
imageEditorObj.finetuneImage(ej.imageeditor.ImageFinetuneOption.Opacity, 80);  // 80% opacity
```

---

### FinetuneSettings Property

Configure which fine-tune options are available in the toolbar using the controller ViewBag pattern:

```csharp
// Controller action
public IActionResult Index()
{
    ViewBag.finetuneSettings = new
    {
        Brightness = true,
        Contrast = true,
        Saturation = true,
        Hue = true,
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

Set any property to `false` to hide that fine-tune option from the toolbar UI.

---

### FinetuneValueChanging Event

Triggered when a fine-tune adjustment is applied. Provides the type and value being changed; set `cancel: true` to prevent the adjustment.

```cshtml
<ejs-imageeditor id="image-editor" finetuneValueChanging="onFinetuneChanging"></ejs-imageeditor>

<script>
function onFinetuneChanging(args) {
    // args.finetune - the type of fine-tune (ImageFinetuneOption string)
    // args.value    - the adjustment value being applied
    // args.cancel   - set true to cancel

    // Example: clamp blur to max 50
    if (args.finetune === 'Blur' && args.value > 50) {
        args.value = 50;
    }

    console.log('Finetune:', args.finetune, 'Value:', args.value);
}
</script>
```

---

## Image Filters

Filters are pre-defined visual effects applied to the entire image to change its mood or style.

### applyImageFilter()

```javascript
imageEditor.applyImageFilter(filterType);
```

**Filter types (ImageFilterOption):**

| Filter | Description |
|--------|-------------|
| `'Default'` | Remove all filters — restore original |
| `'Chrome'` | High-contrast black and white with vivid colors |
| `'Cold'` | Cool blue-toned effect |
| `'Warm'` | Warm orange/yellow-toned effect |
| `'Grayscale'` | Convert to grayscale |
| `'BlackAndWhite'` | High-contrast black and white |
| `'Sepia'` | Vintage brown-toned effect |
| `'Invert'` | Invert all colors |

```cshtml
<div>
    <ejs-button id="filterSepia" content="Sepia" onclick="applySepia()"></ejs-button>
    <ejs-button id="filterGray" content="Grayscale" onclick="applyGrayscale()"></ejs-button>
    <ejs-button id="filterInvert" content="Invert" onclick="applyInvert()"></ejs-button>
    <ejs-button id="filterClear" content="Clear Filter" onclick="clearFilter()"></ejs-button>
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

function applySepia() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.applyImageFilter(ej.imageeditor.ImageFilterOption.Sepia);
}

function applyGrayscale() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.applyImageFilter(ej.imageeditor.ImageFilterOption.Grayscale);
}

function applyInvert() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.applyImageFilter(ej.imageeditor.ImageFilterOption.Invert);
}

function clearFilter() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.applyImageFilter(ej.imageeditor.ImageFilterOption.Default);
}
</script>
```

---

### ImageFiltering Event

Triggered when a filter is being applied. Set `cancel: true` to prevent the filter from being applied.

```cshtml
<ejs-imageeditor id="image-editor" imageFiltering="onImageFiltering"></ejs-imageeditor>

<script>
function onImageFiltering(args) {
    // args.filter - the filter type being applied (ImageFilterOption string)
    // args.cancel - set true to prevent the filter

    // Example: prevent Invert filter
    if (args.filter === 'Invert') {
        args.cancel = true;
        alert('Invert filter is not allowed.');
    }

    console.log('Filter applied:', args.filter);
}
</script>
```


