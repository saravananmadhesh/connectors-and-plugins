# Signature Component — User Interaction

This reference covers Signature control user interactions including undo/redo, clear, disabled, and read-only states.

## Table of Contents
- [Undo and Redo](#undo-and-redo)
- [Clear](#clear)
- [Disabled State](#disabled-state)
- [ReadOnly State](#readonly-state)
- [Complete Example](#complete-example)

---

## Undo and Redo

### Undo Method

Reverts the last action in the signature by decreasing SnapIndex to index previous snap.

Use `canUndo()` method to check if undo is available:

```html
<div class='wrap'>
    <ejs-button id="undoBtn" cssClass="e-primary" content="Undo" disabled="true"></ejs-button>
    <ejs-signature id="signature" change="change"></ejs-signature>
</div>

<script>
    document.getElementById("undoBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        if (!signature.isReadOnly && !signature.disabled) {
            signature.undo();
        }
    });

    function change() {
        var signature = document.getElementById("signature").ej2_instances[0];
        var undoBtn = document.getElementById("undoBtn").ej2_instances[0];
        
        if (signature.canUndo()) {
            undoBtn.disabled = false;
        } else {
            undoBtn.disabled = true;
        }
    }
</script>
```

### Redo Method

Reverts the last undo action by increasing SnapIndex to get the next snap.

Use `canRedo()` method to check if redo is available:

```html
<div class='wrap'>
    <ejs-button id="redoBtn" cssClass="e-primary" content="Redo" disabled="true"></ejs-button>
    <ejs-signature id="signature" change="change"></ejs-signature>
</div>

<script>
    document.getElementById("redoBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        if (!signature.isReadOnly && !signature.disabled) {
            signature.redo();
        }
    });

    function change() {
        var signature = document.getElementById("signature").ej2_instances[0];
        var redoBtn = document.getElementById("redoBtn").ej2_instances[0];
        
        if (signature.canRedo()) {
            redoBtn.disabled = false;
        } else {
            redoBtn.disabled = true;
        }
    }
</script>
```

---

## Clear

The `clear()` method clears the signature canvas and makes it empty. This action is recorded in undo/redo history.

Use `isEmpty()` method to check if signature is empty:

```html
<div class='wrap'>
    <ejs-button id="clearBtn" cssClass="e-primary" content="Clear" disabled="true"></ejs-button>
    <ejs-signature id="signature" change="change"></ejs-signature>
</div>

<script>
    document.getElementById("clearBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        if (!signature.isReadOnly && !signature.disabled) {
            signature.clear();
        }
    });

    function change() {
        var signature = document.getElementById("signature").ej2_instances[0];
        var clearBtn = document.getElementById("clearBtn").ej2_instances[0];
        
        if (!signature.isEmpty()) {
            clearBtn.disabled = false;
        } else {
            clearBtn.disabled = true;
        }
    }
</script>
```

---

## Disabled State

The `disabled` property enables/disables the Signature control. When disabled:
- User cannot draw on the signature pad
- Component cannot receive focus
- Visual feedback shows disabled state

```html
<div class='wrap'>
    <ejs-checkbox id="disable" label="Disabled" change="disableChange"></ejs-checkbox>
    <ejs-signature id="signature"></ejs-signature>
</div>

<script>
    function disableChange(args) {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.disabled = args.checked;
    }
</script>
```

---

## ReadOnly State

The `isReadOnly` property sets the Signature to read-only mode:
- Component can receive focus
- User cannot draw on the signature pad
- Useful for viewing signed documents

```html
<div class='wrap'>
    <ejs-checkbox id="readonly" label="ReadOnly" change="readOnlyChange"></ejs-checkbox>
    <ejs-signature id="signature"></ejs-signature>
</div>

<script>
    function readOnlyChange(args) {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.isReadOnly = args.checked;
    }
</script>
```

    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        
        const touch = e.touches[0];
        console.log('Touch started at:', touch.clientX, touch.clientY);
    });
</script>
```

### touchmove (Finger Movement)

Fires as user moves finger while touching.

**Razor View (CSHTML):**
```html
<div id="signaturePad" style="border: 2px solid #ccc; height: 300px; touch-action: none;"></div>

<script>
    const canvas = document.getElementById('signaturePad');
    let isDrawing = false;

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
    });

    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        
        if (isDrawing) {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            // Draw line to new position
            drawLine(x, y);
        }
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        isDrawing = false;
    });
</script>
```

### touchend (Finger Release)

Fires when user lifts finger from canvas.

---

## Stroke Settings

### Stroke Width

Control the thickness of drawn lines.

**Razor View (CSHTML):**
```html
<label>Stroke Width</label>
<input type="range" id="strokeWidth" min="1" max="10" value="2" />

<div id="signaturePad" style="border: 2px solid #ccc; height: 300px;"></div>

<script>
    const canvas = document.getElementById('signaturePad');
    const ctx = canvas.getContext('2d');

    document.getElementById('strokeWidth').addEventListener('change', function(e) {
        ctx.lineWidth = e.target.value;
    });
</script>
```

### Stroke Color

Set the color of the signature stroke.

**Razor View (CSHTML):**
```html
<label>Color</label>
<input type="color" id="strokeColor" value="#000000" />

<div id="signaturePad" style="border: 2px solid #ccc; height: 300px;"></div>

<script>
    const canvas = document.getElementById('signaturePad');
    const ctx = canvas.getContext('2d');

    document.getElementById('strokeColor').addEventListener('change', function(e) {
        ctx.strokeStyle = e.target.value;
    });
</script>
```

### Line Join Style

Control how lines connect at angles.

**Razor View (CSHTML):**
```html
<select id="lineJoin">
    <option value="round">Round (Smooth)</option>
    <option value="bevel">Bevel</option>
    <option value="miter">Miter (Sharp)</option>
</select>

<div id="signaturePad" style="border: 2px solid #ccc; height: 300px;"></div>

<script>
    const canvas = document.getElementById('signaturePad');
    const ctx = canvas.getContext('2d');

    document.getElementById('lineJoin').addEventListener('change', function(e) {
        ctx.lineJoin = e.target.value;
    });
</script>
```

### Line Cap Style

Control the style of line endpoints.

**Razor View (CSHTML):**
```html
<select id="lineCap">
    <option value="round">Round</option>
    <option value="square">Square</option>
    <option value="butt">Butt</option>
</select>

<div id="signaturePad" style="border: 2px solid #ccc; height: 300px;"></div>

<script>
    const canvas = document.getElementById('signaturePad');
    const ctx = canvas.getContext('2d');

    document.getElementById('lineCap').addEventListener('change', function(e) {
        ctx.lineCap = e.target.value;
    });
</script>
```

---

## Examples

### Simple Drawing Pad

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Drawing Pad</h5>

            <canvas id="drawingCanvas" 
                    width="600" 
                    height="400"
                    style="border: 2px solid #333; display: block; cursor: crosshair; background: white;">
            </canvas>

            <div class="mt-3">
                <button class="btn btn-secondary" onclick="clearCanvas()">Clear</button>
                <button class="btn btn-primary" onclick="saveDrawing()">Save</button>
            </div>
        </div>
    </div>
</div>

<script>
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000';

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function draw(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        if (!isDrawing) return;
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.closePath();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveDrawing() {
        const imageData = canvas.toDataURL('image/png');
        console.log('Drawing saved:', imageData);
        alert('Drawing saved');
    }
</script>
```

### Configurable Signature Pad

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Signature Pad with Options</h5>

            <!-- Controls -->
            <div class="row mb-3">
                <div class="col-md-4">
                    <label class="form-label">Width</label>
                    <input type="range" class="form-range" id="widthControl" min="1" max="20" value="2" />
                    <small id="widthValue" class="text-muted">2px</small>
                </div>

                <div class="col-md-4">
                    <label class="form-label">Color</label>
                    <input type="color" id="colorControl" value="#000000" class="form-control form-control-color" />
                </div>

                <div class="col-md-4">
                    <label class="form-label">Line Join</label>
                    <select id="joinControl" class="form-select">
                        <option value="round">Round</option>
                        <option value="bevel">Bevel</option>
                        <option value="miter">Miter</option>
                    </select>
                </div>
            </div>

            <!-- Canvas -->
            <canvas id="signatureCanvas" 
                    width="600" 
                    height="300"
                    style="border: 2px solid #ccc; display: block; cursor: crosshair; background: white; margin-bottom: 1rem;">
            </canvas>

            <!-- Buttons -->
            <div>
                <button class="btn btn-outline-secondary" onclick="clearSignature()">Clear</button>
                <button class="btn btn-primary" onclick="saveSignature()">Save Signature</button>
            </div>
        </div>
    </div>
</div>

<script>
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    // Setup initial canvas context
    updateCanvasSettings();

    function updateCanvasSettings() {
        const width = document.getElementById('widthControl').value;
        const color = document.getElementById('colorControl').value;
        const join = document.getElementById('joinControl').value;

        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineJoin = join;
        ctx.lineCap = 'round';

        document.getElementById('widthValue').textContent = width + 'px';
    }

    // Event listeners for controls
    document.getElementById('widthControl').addEventListener('input', updateCanvasSettings);
    document.getElementById('colorControl').addEventListener('change', updateCanvasSettings);
    document.getElementById('joinControl').addEventListener('change', updateCanvasSettings);

    // Canvas drawing events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }

    function draw(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    }

    function handleTouchStart(e) {
        e.preventDefault();
        isDrawing = true;
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        if (!isDrawing) return;
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.closePath();
    }

    function clearSignature() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveSignature() {
        const imageData = canvas.toDataURL('image/png');
        // Send to server or process
        console.log('Signature saved');
        alert('Signature saved successfully');
    }
</script>
```

---

## See Also

- `signature-getting-started.md` — Quick start guide
- `signature-customization.md` — Styling and appearance
- `signature-open-save.md` — Saving and exporting
- `signature-toolbar-integration.md` — Undo/redo functionality
- `signature-api.md` — Complete API reference
