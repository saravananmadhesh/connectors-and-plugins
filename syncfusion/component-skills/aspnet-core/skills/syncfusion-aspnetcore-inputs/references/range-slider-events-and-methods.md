# Range Slider Events and Methods — ASP.NET Core

Complete reference for Range Slider event handling and programmatic methods.

## Table of Contents
- [Events](#events)
- [Methods](#methods)
- [Event Flow](#event-flow)
- [Examples](#examples)

---

## Events

### `created`
Fires when the component is initialized.

**Razor View (CSHTML):**
```html
<ejs-slider id="slider" 
                 min="0" 
                 max="100" 
                 value="50"
                 created="onSliderCreated">
</ejs-slider>

<script>
    function onSliderCreated(args) {
        console.log('Range Slider component created');
    }
</script>
```

### `input`
Fires as user drags the slider thumb (real-time).

**Razor View (CSHTML):**
```html
<ejs-slider id="slider" 
                 min="0" 
                 max="100" 
                 value="50"
                 input="onSliderInput">
</ejs-slider>

<div id="inputValue">Current: 50</div>

<script>
    function onSliderInput(args) {
        if (args.value !== undefined) {
            document.getElementById('inputValue').textContent = 'Current: ' + args.value;
        }
    }
</script>
```

**Use Cases:**
- Live preview/feedback
- Real-time calculations
- Instant UI updates
- Preview before finalizing

### `change`
Fires when user finishes dragging (on thumb release).

**Razor View (CSHTML):**
```html
<ejs-slider id="slider" 
                 min="0" 
                 max="100" 
                 startValue="30"
                 endValue="70"
                 type="Range"
                 change="onSliderChange">
</ejs-slider>

<div id="changeValue">Range: 30-70</div>

<script>
    function onSliderChange(args) {
        const start = args.startValue || '';
        const end = args.endValue || '';
        if (start && end) {
            document.getElementById('changeValue').textContent = 'Range: ' + start + '-' + end;
            // Save to database or perform action
        }
    }
</script>
```

**Use Cases:**
- Saving filter selections
- API calls after user finishes
- Expensive calculations
- Database updates

### `slideStart`
Fires when user starts dragging (thumb pressed).

**Razor View (CSHTML):**
```html
<ejs-slider id="slider" 
                 min="0" 
                 max="100" 
                 value="50"
                 slideStart="onSlideStart">
</ejs-slider>

<script>
    function onSlideStart(args) {
        console.log('User started dragging');
        console.log('Initial value:', args.value);
    }
</script>
```

### `slideEnd`
Fires when user stops dragging (thumb released).

**Razor View (CSHTML):**
```html
<ejs-slider id="slider" 
                 min="0" 
                 max="100" 
                 value="50"
                 slideEnd="onSlideEnd">
</ejs-slider>

<script>
    function onSlideEnd(args) {
        console.log('User finished dragging');
        console.log('Final value:', args.value);
    }
</script>
```

---

## Methods

### `getValue()`
Gets the current value(s).

**JavaScript:**
```javascript
const slider = document.getElementById('slider').ej2_instances[0];
const value = slider.getValue();
console.log('Current value:', value);
```

### `setValue(value)`
Sets the slider value programmatically.

**JavaScript:**
```javascript
const slider = document.getElementById('slider').ej2_instances[0];
slider.setValue(75);  // Single slider
// OR for range slider
slider.startValue = 30;
slider.endValue = 70;
```

**Use Case:**
```html
<ejs-slider id="slider" 
                 min="0" 
                 max="100" 
                 value="50">
</ejs-slider>

<div class="mt-3">
    <button class="btn btn-sm btn-primary" onclick="setToMinimum()">Set to Min (0)</button>
    <button class="btn btn-sm btn-secondary" onclick="setToMidpoint()">Set to Midpoint (50)</button>
    <button class="btn btn-sm btn-success" onclick="setToMaximum()">Set to Max (100)</button>
</div>

<script>
    function setToMinimum() {
        const slider = document.getElementById('slider').ej2_instances[0];
        slider.value = 0;
    }

    function setToMidpoint() {
        const slider = document.getElementById('slider').ej2_instances[0];
        slider.value = 50;
    }

    function setToMaximum() {
        const slider = document.getElementById('slider').ej2_instances[0];
        slider.value = 100;
    }
</script>
```

### `refresh()`
Refreshes the slider after property changes.

**JavaScript:**
```javascript
const slider = document.getElementById('slider').ej2_instances[0];
slider.min = 10;
slider.max = 90;
slider.refresh();
```

### `destroy()`
Destroys the slider component.

**JavaScript:**
```javascript
const slider = document.getElementById('slider').ej2_instances[0];
slider.destroy();
```

---

## Event Flow

### Single Slider Event Order

```
1. slideStart ──→ (User presses thumb)
2. input ──────→ (Dragging, fires multiple times)
3. input ──────→ (Dragging, fires multiple times)
4. slideEnd ──→ (User releases thumb)
5. change ────→ (Value finalized)
```

### Practical Example

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <div class="card" style="max-width: 400px; margin: 0 auto;">
        <div class="card-body">
            <h5 class="card-title">Event Flow Demo</h5>

            <ejs-slider id="eventDemo" 
                             min="0" 
                             max="100" 
                             value="50"
                             slideStart="onStart"
                             input="onInput"
                             slideEnd="onEnd"
                             change="onChange">
            </ejs-slider>

            <div id="eventLog" class="mt-3" style="background: #f5f5f5; padding: 10px; border-radius: 4px;">
                <p class="text-muted mb-0">Event log:</p>
                <div id="logContent" style="font-family: monospace; font-size: 12px;"></div>
            </div>
        </div>
    </div>
</div>

<script>
    const eventLog = [];

    function addLog(event, value) {
        const timestamp = new Date().toLocaleTimeString();
        eventLog.push(`${timestamp} - ${event}: ${value}`);
        updateLogDisplay();
    }

    function updateLogDisplay() {
        const logContent = document.getElementById('logContent');
        logContent.innerHTML = eventLog.slice(-10).join('<br>');  // Show last 10
    }

    function onStart(e) {
        addLog('slideStart', e.value);
    }

    function onInput(e) {
        addLog('input', e.value);
    }

    function onEnd(e) {
        addLog('slideEnd', e.value);
    }

    function onChange(e) {
        addLog('change', e.value);
    }
</script>
```

---

## Examples

### Dynamic Price Filter with Events

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <div class="card" style="max-width: 500px; margin: 0 auto;">
        <div class="card-body">
            <h5 class="card-title">Price Filter</h5>

            <ejs-slider id="priceFilter" 
                             min="0" 
                             max="1000" 
                             startValue="200"
                             endValue="800"
                             step="50"
                             slideStart="onPriceSlideStart"
                             input="onPriceInput"
                             change="onPriceChange"
                             type="Range">
            </ejs-slider>

            <div class="row mt-3">
                <div class="col-6">
                    <p class="text-muted small">Min Price</p>
                    <p class="h4">$<span id="minPrice">200</span></p>
                </div>
                <div class="col-6 text-end">
                    <p class="text-muted small">Max Price</p>
                    <p class="h4">$<span id="maxPrice">800</span></p>
                </div>
            </div>

            <div id="status" class="mt-2 text-muted small"></div>

            <button class="btn btn-primary w-100 mt-3" onclick="applyPriceFilter()">
                Apply Filter
            </button>
        </div>
    </div>
</div>

<script>
    let isFiltering = false;

    function onPriceSlideStart(e) {
        isFiltering = true;
        document.getElementById('status').textContent = 'Adjusting filter...';
    }

    function onPriceInput(e) {
        // Update display in real-time
        if (e.startValue !== undefined) {
            document.getElementById('minPrice').textContent = e.startValue;
        }
        if (e.endValue !== undefined) {
            document.getElementById('maxPrice').textContent = e.endValue;
        }
    }

    function onPriceChange(e) {
        isFiltering = false;
        document.getElementById('status').textContent = 'Filter ready to apply';
    }

    function applyPriceFilter() {
        const slider = document.getElementById('priceFilter').ej2_instances[0];
        console.log('Applying filter:', {
            min: slider.startValue,
            max: slider.endValue
        });
        
        // Simulate API call
        document.getElementById('status').textContent = 'Filtering products...';
        setTimeout(() => {
            document.getElementById('status').textContent = 'Found 45 products';
        }, 500);
    }
</script>
```

### Brightness Adjustment with Live Preview

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h4>Image Brightness Control</h4>

    <div class="row mt-4">
        <div class="col-md-6">
            <h6>Controls</h6>
            <ejs-slider id="brightnessSlider" 
                             min="0" 
                             max="200" 
                             value="100"
                             step="10"
                             input="updateBrightness">
            </ejs-slider>
            <p class="mt-2">
                Brightness: <strong id="brightnessValue">100</strong>%
            </p>
        </div>

        <div class="col-md-6">
            <h6>Preview</h6>
            <img id="previewImage" 
                 src="/images/sample.jpg" 
                 style="width: 100%; border-radius: 4px; filter: brightness(100%);">
        </div>
    </div>
</div>

<script>
    function updateBrightness(e) {
        const value = e.value;
        const percentage = (value / 100) * 100;
        
        document.getElementById('brightnessValue').textContent = value;
        
        const image = document.getElementById('previewImage');
        image.style.filter = 'brightness(' + (value / 100) + ')';
    }
</script>
```

---

## See Also

- `range-slider-getting-started.md` — Quick start guide
- `range-slider-types-and-orientation.md` — Types and orientations
- `range-slider-formatting-and-limits.md` — Formatting options
- `range-slider-api-reference.md` — Complete API reference
