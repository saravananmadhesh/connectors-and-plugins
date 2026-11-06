# Signature Customization — ASP.NET Core

This reference covers customization of stroke width, stroke color, background color, and background image in the Syncfusion ASP.NET Core Signature control.

## Table of Contents
- [Stroke Width](#stroke-width)
- [Stroke Color](#stroke-color)
- [Background Color](#background-color)
- [Background Image](#background-image)
- [Complete Customization Example](#complete-customization-example)

---

## Stroke Width

Control stroke thickness using `maxStrokeWidth`, `minStrokeWidth`, and `velocity`. The component calculates a variable stroke width based on these three values to produce a natural, smooth signature.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `maxStrokeWidth` | `number` | `2` | Maximum thickness of the stroke |
| `minStrokeWidth` | `number` | `0.5` | Minimum thickness of the stroke |
| `velocity` | `number` | `0.7` | Rate of stroke width change (0–1); lower values = greater width variation |

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs

<div class='wrap'>
    <h4>Sign here</h4>
    <ejs-signature id="signature" 
                   maxStrokeWidth="3"
                   minStrokeWidth="0.5"
                   velocity="0.7">
    </ejs-signature>
</div>

<style>
    .wrap {
        margin: 0 auto;
        width: 300px;
        text-align: center;
    }
    #signature {
        border: 1px solid lightgray;
        height: 200px;
        width: 100%;
    }
</style>
```

**Tip:** Increase `maxStrokeWidth` for bold strokes. Lower `velocity` produces more dramatic width variation between fast and slow strokes.

---

## Stroke Color

Use `strokeColor` to set the pen/ink color. Accepts hex codes (`#000000`), RGB values (`rgb(0,0,0)`), or CSS color names (`red`). The default is `#000000` (black).

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<div>
    <input type="text" id="colorInput" placeholder="e.g. #e91e63 or red" />
    
    <ejs-button id="applyColorBtn" 
                cssClass="e-primary" 
                content="Set Stroke Color">
    </ejs-button>
    
    <div id="signature-control">
        <ejs-signature id="signature" strokeColor="#000000"></ejs-signature>
    </div>
</div>

<script>
    document.getElementById("applyColorBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var color = document.getElementById('colorInput').value;
        signature.strokeColor = color;
    });
</script>
```

---

## Background Color

Use `backgroundColor` to fill the canvas background. Accepts hex codes, RGB values, or CSS color names. The default is `''` (transparent/white).

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<div>
    <input type="text" id="bgInput" placeholder="e.g. #f0f0f0 or lightyellow" />
    
    <ejs-button id="applyBgBtn" 
                cssClass="e-primary" 
                content="Set Background Color">
    </ejs-button>
    
    <div id="signature-control">
        <ejs-signature id="signature" backgroundColor="#ffffff"></ejs-signature>
    </div>
</div>

<script>
    document.getElementById("applyBgBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var bgColor = document.getElementById('bgInput').value;
        signature.backgroundColor = bgColor;
    });
</script>
```

---

## Background Image

Use `backgroundImage` to set a background image (e.g., lined paper, company logo, dotted grid).

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<div>
    <input type="text" id="bgImageInput" 
           placeholder="Enter image URL or base64" />
    
    <ejs-button id="applyBgImageBtn" 
                cssClass="e-primary" 
                content="Set Background Image">
    </ejs-button>
    
    <div id="signature-control">
        <ejs-signature id="signature" 
                       backgroundImage="path/to/paper.png">
        </ejs-signature>
    </div>
</div>

<script>
    document.getElementById("applyBgImageBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var imageUrl = document.getElementById('bgImageInput').value;
        signature.backgroundImage = imageUrl;
    });
</script>
```

---

## Complete Customization Example

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<div class="container mt-4">
    <h3>Signature Customization</h3>
    
    <div class="controls mb-3">
        <div class="form-group">
            <label>Stroke Color:</label>
            <input type="color" id="strokeColorPicker" value="#000000" />
        </div>
        
        <div class="form-group">
            <label>Background Color:</label>
            <input type="color" id="bgColorPicker" value="#ffffff" />
        </div>
        
        <div class="form-group">
            <label>Max Stroke Width: <span id="maxWidthValue">2</span></label>
            <input type="range" id="maxWidthSlider" min="1" max="10" value="2" />
        </div>
        
        <div class="form-group">
            <label>Velocity: <span id="velocityValue">0.7</span></label>
            <input type="range" id="velocitySlider" 
                   min="0" max="1" step="0.1" value="0.7" />
        </div>
    </div>
    
    <ejs-signature id="signature"
                   strokeColor="#000000"
                   backgroundColor="#ffffff"
                   maxStrokeWidth="2"
                   minStrokeWidth="0.5"
                   velocity="0.7">
    </ejs-signature>
</div>

<script>
    var signature = document.getElementById('signature').ej2_instances[0];
    
    document.getElementById('strokeColorPicker').addEventListener('change', function(e) {
        signature.strokeColor = e.target.value;
    });
    
    document.getElementById('bgColorPicker').addEventListener('change', function(e) {
        signature.backgroundColor = e.target.value;
    });
    
    document.getElementById('maxWidthSlider').addEventListener('input', function(e) {
        signature.maxStrokeWidth = parseFloat(e.target.value);
        document.getElementById('maxWidthValue').textContent = e.target.value;
    });
    
    document.getElementById('velocitySlider').addEventListener('input', function(e) {
        signature.velocity = parseFloat(e.target.value);
        document.getElementById('velocityValue').textContent = e.target.value;
    });
</script>
```

---

## See Also

- `signature-getting-started.md` — Quick start guide
- `signature-api.md` — Complete API reference
- `signature-user-interaction.md` — User interaction patterns
- `signature-open-save.md` — Open/Save operations
