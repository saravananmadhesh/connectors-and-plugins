# Range Slider Types and Orientation — ASP.NET Core

This reference covers different slider types, orientations, and configuration options.

## Table of Contents
- [Slider Types](#slider-types)
- [Orientation](#orientation)
- [Color Ranges](#color-ranges)
- [Min-Max Configuration](#min-max-configuration)
- [Examples](#examples)

---

## Slider Types

### Type: Default (Single Value)

Single thumb for selecting one value:

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h4>Single Value Slider</h4>
    
    <ejs-slider id="default" 
                value="30">
    </ejs-slider>
    
    <p>Value: <span id="defaultValue">30</span></p>
</div>

<script>
    document.getElementById('default').addEventListener('change', function(e) {
        document.getElementById('defaultValue').textContent = e.value;
    });
</script>
```

**Use Cases:**
- Volume control
- Brightness/opacity
- Single parameter adjustment
- Age selection

### Type: MinRange

Two thumbs for selecting a min range:

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h4>MinRange Slider</h4>
    
    <ejs-slider id="minrange" 
                value="ViewBag.range"
                type="MinRange">
    </ejs-slider>
</div>

```

### Type: Range

Two thumbs for selecting a range:

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h4>Range Slider (Two Handles)</h4>
    
    <ejs-slider id="range" 
                value="ViewBag.range"
                type="Range">
    </ejs-slider>
    
    <p>Range: <span id="rangeMin">30</span> - <span id="rangeMax">70</span></p>
</div>

<script>
    document.getElementById('range').addEventListener('change', function(e) {
        document.getElementById('rangeMin').textContent = e.value[0];
        document.getElementById('rangeMax').textContent = e.value[1];
    });
</script>
```

**Use Cases:**
- Price range filter
- Date range selection
- Score/rating ranges
- Search filters (min-max)

---

## Orientation

### Horizontal Slider (Default)

**Razor View (CSHTML):**
```html
<ejs-slider id="horizontal" 
                 min="0" 
                 max="100" 
                 value="50"
                 orientation="Horizontal">
</ejs-slider>
```

**Visual:**
```
──────●──────────
0     50        100
```

**Use Cases:**
- Most common
- Desktop applications
- Horizontal space availability

### Vertical Slider

**Razor View (CSHTML):**
```html
<div style="height: 300px;">
    <ejs-slider id="vertical" 
                     min="0" 
                     max="100" 
                     value="50"
                     orientation="Vertical">
    </ejs-slider>
</div>
```

**Visual:**
```
100
 |
 |
50├──●
 |
 |
 0
```

**Use Cases:**
- Volume control (audio apps)
- Vertical space layouts
- Brightness/color adjustment
- Mobile interfaces (portrait)

---

## Color Ranges

### Single Color Track

Standard single-color track:

**Razor View (CSHTML):**
```html
<ejs-slider id="colorSlider" 
                 min="0" 
                 max="100" 
                 value="50"
                 cssClass="e-primary">
</ejs-slider>
```

### Color-Coded Range Visualization

Show different colors for different ranges (requires CSS):

**CSS (wwwroot/css/range-slider.css):**
```css
/* Color ranges for temperature slider */
.temp-cold::before {
    background: linear-gradient(to right, #0066cc 0%, #00ccff 100%);
}

.temp-warm::before {
    background: linear-gradient(to right, #ffcc00 0%, #ff6600 100%);
}

.temp-hot::before {
    background: linear-gradient(to right, #ff6600 0%, #cc0000 100%);
}
```

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h4>Temperature Range (Color Coded)</h4>
    
    <ejs-slider id="tempSlider" 
                     min="0" 
                     max="100" 
                     value="50"
                     cssClass="temp-warm"
                     input="updateTempColor">
    </ejs-slider>
    
    <p id="tempDisplay">Temperature: 50°</p>
</div>

<script>
    function updateTempColor(e) {
        const slider = document.getElementById('tempSlider');
        const value = e.value;
        
        slider.classList.remove('temp-cold', 'temp-warm', 'temp-hot');
        
        if (value < 35) {
            slider.classList.add('temp-cold');
        } else if (value < 65) {
            slider.classList.add('temp-warm');
        } else {
            slider.classList.add('temp-hot');
        }
        
        document.getElementById('tempDisplay').textContent = 'Temperature: ' + value + '°';
    }
</script>
```

---

## Min-Max Configuration

### Setting Minimum Value

**Razor View (CSHTML):**
```html
<!-- Min value of 20 -->
<ejs-slider id="minSlider" 
                 min="20" 
                 max="100" 
                 value="50">
</ejs-slider>
```

### Setting Maximum Value

**Razor View (CSHTML):**
```html
<!-- Max value of 80 -->
<ejs-slider id="maxSlider" 
                 min="0" 
                 max="80" 
                 value="40">
</ejs-slider>
```

### Dynamic Min-Max Updates

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h4>Dynamic Range</h4>
    
    <div class="mb-3">
        <label>Select Category:</label>
        <select class="form-select" onchange="updateRange(this.value)">
            <option value="budget">Budget ($0-500)</option>
            <option value="midrange">Mid-Range ($500-2000)</option>
            <option value="premium">Premium ($2000-5000)</option>
        </select>
    </div>

    <ejs-slider id="dynamicSlider" 
                     min="0" 
                     max="500" 
                     startValue="100"
                     endValue="400"
                     step="10"
                     type="Range">
    </ejs-slider>
</div>

<script>
    function updateRange(category) {
        const slider = document.getElementById('dynamicSlider').ej2_instances[0];
        
        const ranges = {
            budget: { min: 0, max: 500, start: 100, end: 400 },
            midrange: { min: 500, max: 2000, start: 800, end: 1800 },
            premium: { min: 2000, max: 5000, start: 2500, end: 4500 }
        };
        
        const range = ranges[category];
        slider.min = range.min;
        slider.max = range.max;
        slider.startValue = range.start;
        slider.endValue = range.end;
    }
</script>
```

---

## Examples

### Volume Control (Horizontal Single)

**Razor View (CSHTML):**
```html
<div class="card" style="max-width: 300px; margin: 20px auto;">
    <div class="card-body">
        <h5 class="card-title">Volume Control</h5>

        <div class="d-flex align-items-center gap-2">
            <span class="e-icons e-volume-low"></span>
            
            <ejs-slider id="volumeSlider" 
                             min="0" 
                             max="100" 
                             value="50"
                             step="1"
                             input="updateVolume">
            </ejs-slider>
            
            <span class="e-icons e-volume-high"></span>
        </div>

        <div class="text-center mt-2">
            <p>Volume: <strong id="volumeDisplay">50</strong>%</p>
        </div>
    </div>
</div>

<script>
    function updateVolume(e) {
        document.getElementById('volumeDisplay').textContent = e.value;
    }
</script>
```

### Brightness Control (Vertical Single)

**Razor View (CSHTML):**
```html
<div class="d-flex justify-content-center gap-4 mt-5">
    <div>
        <h5>Brightness</h5>
        <div style="height: 200px;">
            <ejs-slider id="brightness" 
                             min="0" 
                             max="100" 
                             value="50"
                             orientation="Vertical"
                             input="updateBrightness">
            </ejs-slider>
        </div>
        <p class="text-center mt-2">
            <span id="brightnessValue">50</span>%
        </p>
    </div>

    <!-- Visual feedback -->
    <div id="brightnessPreview" 
         style="width: 100px; height: 100px; background-color: gray; border-radius: 8px;">
    </div>
</div>

<script>
    function updateBrightness(e) {
        const value = e.value;
        document.getElementById('brightnessValue').textContent = value;
        
        // Update visual brightness (0-100 = 0%-100% lightness)
        const lightness = value;
        const preview = document.getElementById('brightnessPreview');
        preview.style.backgroundColor = 'hsl(0, 0%, ' + lightness + '%)';
    }
</script>
```

### Price Range Filter (Horizontal Range)

**Razor View (CSHTML):**
```html
<div class="card mt-5" style="max-width: 400px; margin: 0 auto;">
    <div class="card-body">
        <h5 class="card-title">Filter by Price</h5>

        <ejs-slider id="priceRange" 
                         min="0" 
                         max="1000" 
                         startValue="100"
                         endValue="500"
                         step="25"
                         change="updatePriceDisplay"
                         type="Range">
        </ejs-slider>

        <div class="row mt-3">
            <div class="col-6">
                <p class="text-muted">Min Price</p>
                <p class="h5">$<span id="minPrice">100</span></p>
            </div>
            <div class="col-6 text-end">
                <p class="text-muted">Max Price</p>
                <p class="h5">$<span id="maxPrice">500</span></p>
            </div>
        </div>

        <button class="btn btn-primary w-100 mt-3" onclick="filterProducts()">
            Apply Filter
        </button>
    </div>
</div>

<script>
    function updatePriceDisplay(e) {
        if (e.startValue !== undefined) {
            document.getElementById('minPrice').textContent = e.startValue;
        }
        if (e.endValue !== undefined) {
            document.getElementById('maxPrice').textContent = e.endValue;
        }
    }

    function filterProducts() {
        const slider = document.getElementById('priceRange').ej2_instances[0];
        console.log('Filtering products:', {
            minPrice: slider.startValue,
            maxPrice: slider.endValue
        });
    }
</script>
```

---

## See Also

- `range-slider-getting-started.md` — Quick start guide
- `range-slider-formatting-and-limits.md` — Formatting options
- `range-slider-styling.md` — Custom styling
- `range-slider-api-reference.md` — Complete API reference
