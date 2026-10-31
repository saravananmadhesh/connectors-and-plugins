# Range Slider Styling and Appearance — ASP.NET Core

This reference covers styling options, CSS customization, predefined themes, and appearance modes.

## Table of Contents
- [Predefined Styles](#predefined-styles)
- [CSS Customization](#css-customization)
- [Theme Support](#theme-support)
- [Size and Density](#size-and-density)
- [Examples](#examples)

---

## Predefined Styles

### Primary Theme (Default)

**Razor View (CSHTML):**
```html
<ejs-slider id="primary" 
            value="50"
            cssClass="e-primary">
</ejs-slider>
```

### Success Theme

**Razor View (CSHTML):**
```html
<ejs-slider id="success" 
            value="50"
            cssClass="e-success">
</ejs-slider>
```

### Warning Theme

**Razor View (CSHTML):**
```html
<ejs-slider id="warning" 
            value="50"
            cssClass="e-warning">
</ejs-slider>
```

### Danger Theme

**Razor View (CSHTML):**
```html
<ejs-slider id="danger" 
            value="50"
            cssClass="e-danger">
</ejs-slider>
```

### Dark Theme

**Razor View (CSHTML):**
```html
<ejs-slider id="dark" 
            value="50"
            cssClass="e-dark">
</ejs-slider>
```

---

## CSS Customization

### Custom Track Color

**CSS (wwwroot/css/range-slider-custom.css):**
```css
.custom-track .e-track {
    background: linear-gradient(to right, #FF6B6B, #FFE66D);
}

.custom-track .e-selection {
    background: linear-gradient(to right, #4ECDC4, #44A08D);
}
```

**Razor View (CSHTML):**
```html
<ejs-slider id="customTrack" 
            value="50"
            cssClass="custom-track">
</ejs-slider>
```

### Custom Thumb Styling

**CSS (wwwroot/css/range-slider-custom.css):**
```css
.custom-thumb .e-handle {
    width: 20px;
    height: 20px;
    border: 2px solid #2E86C1;
    border-radius: 50%;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.custom-thumb .e-handle:focus {
    box-shadow: 0 0 0 8px rgba(46, 134, 193, 0.2);
}

.custom-thumb .e-handle.e-active {
    background: #2E86C1;
    border-color: #1B4965;
}
```

**Razor View (CSHTML):**
```html
<ejs-slider id="customThumb" 
            value="50"
            cssClass="custom-thumb">
</ejs-slider>
```

### Gradient Track

**CSS (wwwroot/css/range-slider-custom.css):**
```css
.gradient-track .e-track {
    background: linear-gradient(90deg, 
        rgba(255, 107, 107, 0.3) 0%,
        rgba(255, 230, 109, 0.3) 50%,
        rgba(78, 205, 196, 0.3) 100%);
}

.gradient-track .e-selection {
    background: linear-gradient(90deg, 
        #FF6B6B 0%,
        #FFE66D 50%,
        #4ECDC4 100%);
}
```

**Razor View (CSHTML):**
```html
<ejs-slider id="gradientTrack" 
            value="50"
            cssClass="gradient-track">
</ejs-slider>
```

---

## Theme Support

### Material Theme

**CSS Link in _Layout.cshtml:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/latest/material.css" />
```

### Bootstrap Theme

**CSS Link in _Layout.cshtml:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/latest/bootstrap.css" />
```

### Tailwind Theme

**CSS Link in _Layout.cshtml:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/latest/tailwind.css" />
```

### Fabric Theme

**CSS Link in _Layout.cshtml:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/latest/fabric.css" />
```

---

## Size and Density

### Small Slider

**Razor View (CSHTML):**
```html
<ejs-slider id="small" 
            value="50"
            cssClass="e-small">
</ejs-slider>
```

### Bigger Slider

**Razor View (CSHTML):**
```html
<ejs-slider id="bigger" 
            value="50"
            cssClass="e-bigger">
</ejs-slider>
```

### Custom Sizing

**CSS (wwwroot/css/range-slider-custom.css):**
```css
.extra-small-slider {
    height: 2px;
}

.extra-small-slider .e-handle {
    width: 12px;
    height: 12px;
}

.extra-large-slider {
    height: 6px;
}

.extra-large-slider .e-handle {
    width: 28px;
    height: 28px;
}
```

**Razor View (CSHTML):**
```html
<ejs-slider id="extraSmall" 
                 min="0" 
                 max="100" 
                 value="50"
                 cssClass="extra-small-slider">
</ejs-slider>

<ejs-slider id="extraLarge" 
                 min="0" 
                 max="100" 
                 value="50"
                 cssClass="extra-large-slider">
</ejs-slider>
```

---

## Examples

### Style Variations Showcase

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Range Slider Styles";
}

<div class="container mt-5">
    <h2>Range Slider Style Variations</h2>

    <!-- Predefined Themes -->
    <h4 class="mt-5">Predefined Themes</h4>
    <div class="row">
        <div class="col-md-6 mb-4">
            <label>Primary</label>
            <ejs-slider id="primary" 
                             min="0" 
                             max="100" 
                             value="50"
                             cssClass="e-primary">
            </ejs-slider>
        </div>

        <div class="col-md-6 mb-4">
            <label>Success</label>
            <ejs-slider id="success" 
                             min="0" 
                             max="100" 
                             value="50"
                             cssClass="e-success">
            </ejs-slider>
        </div>

        <div class="col-md-6 mb-4">
            <label>Warning</label>
            <ejs-slider id="warning" 
                             min="0" 
                             max="100" 
                             value="50"
                             cssClass="e-warning">
            </ejs-slider>
        </div>

        <div class="col-md-6 mb-4">
            <label>Danger</label>
            <ejs-slider id="danger" 
                             min="0" 
                             max="100" 
                             value="50"
                             cssClass="e-danger">
            </ejs-slider>
        </div>
    </div>

    <!-- Size Variations -->
    <h4 class="mt-5">Sizes</h4>
    <div class="mb-4">
        <label>Small</label>
        <ejs-slider id="small" 
                         min="0" 
                         max="100" 
                         value="50"
                         cssClass="e-small">
        </ejs-slider>
    </div>

    <div class="mb-4">
        <label>Normal</label>
        <ejs-slider id="normal" 
                         min="0" 
                         max="100" 
                         value="50">
        </ejs-slider>
    </div>

    <div class="mb-4">
        <label>Bigger</label>
        <ejs-slider id="bigger" 
                         min="0" 
                         max="100" 
                         value="50"
                         cssClass="e-bigger">
        </ejs-slider>
    </div>

    <!-- Custom Gradients -->
    <h4 class="mt-5">Custom Gradient</h4>
    <div class="mb-4">
        <label>Gradient Track</label>
        <ejs-slider id="gradient" 
                         min="0" 
                         max="100" 
                         value="50"
                         cssClass="gradient-track">
        </ejs-slider>
    </div>
</div>

<link rel="stylesheet" href="~/css/range-slider-custom.css" />

<style>
    .gradient-track .e-track {
        background: linear-gradient(90deg, 
            rgba(255, 107, 107, 0.3) 0%,
            rgba(255, 230, 109, 0.3) 50%,
            rgba(78, 205, 196, 0.3) 100%);
    }

    .gradient-track .e-selection {
        background: linear-gradient(90deg, 
            #FF6B6B 0%,
            #FFE66D 50%,
            #4ECDC4 100%);
    }

    label {
        font-weight: 600;
        display: block;
        margin-bottom: 0.5rem;
    }
</style>
```

### Material Design Slider

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h3>Material Design Price Range</h3>

    <div class="card mt-4">
        <div class="card-body">
            <h5 class="card-title">Select Your Budget</h5>

            <ejs-slider id="materialRange" 
                             min="0" 
                             max="5000" 
                             startValue="1000"
                             endValue="4000"
                             step="100"
                             change="updateMaterialDisplay"
                             type="Range"
                             cssClass="e-primary">
            </ejs-slider>

            <div class="row mt-4">
                <div class="col-6">
                    <h6 class="text-muted">Minimum</h6>
                    <h3>$<span id="matMin">1000</span></h3>
                </div>
                <div class="col-6 text-end">
                    <h6 class="text-muted">Maximum</h6>
                    <h3>$<span id="matMax">4000</span></h3>
                </div>
            </div>

            <button class="btn btn-primary w-100 mt-4">Apply Budget</button>
        </div>
    </div>
</div>

<script>
    function updateMaterialDisplay(e) {
        document.getElementById('matMin').textContent = e.startValue;
        document.getElementById('matMax').textContent = e.endValue;
    }
</script>

<style>
    .card {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        border: none;
    }

    .card-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #333;
    }

    h6 {
        font-size: 0.875rem;
        font-weight: 500;
        color: #999;
    }
</style>
```

---

## See Also

- `range-slider-getting-started.md` — Quick start guide
- `range-slider-types-and-orientation.md` — Types and orientations
- `range-slider-events-and-methods.md` — Event handling
- `range-slider-api-reference.md` — Complete API reference
