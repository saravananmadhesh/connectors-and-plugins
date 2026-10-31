# Range Slider Formatting and Limits — ASP.NET Core

This reference covers formatting labels, setting limits, step values, and custom formatting.

## Table of Contents
- [Min and Max Values](#min-and-max-values)
- [Step Increments](#step-increments)
- [Label Formatting](#label-formatting)

---

## Min and Max Values

### Setting Range Boundaries

**Razor View (CSHTML):**
```html
<!-- 0 to 100 (default) -->
<ejs-slider id="basic" 
                 min="0" 
                 max="100" 
                 value="50">
</ejs-slider>

<!-- 0 to 1000 (large range) -->
<ejs-slider id="large" 
                 min="0" 
                 max="1000" 
                 value="500">
</ejs-slider>

<!-- -50 to 50 (negative values) -->
<ejs-slider id="negative" 
                 min="-50" 
                 max="50" 
                 value="0">
</ejs-slider>

<!-- 20 to 80 (restricted range) -->
<ejs-slider id="restricted" 
                 min="20" 
                 max="80" 
                 value="50">
</ejs-slider>
```

## Step Increments

### Fixed Step Value

Snap slider to increments:

**Razor View (CSHTML):**
```html
<!-- Step of 10 -->
<ejs-slider id="step10" 
                 min="0" 
                 max="100" 
                 value="50"
                 step="10">
</ejs-slider>

<!-- Step of 5 -->
<ejs-slider id="step5" 
                 min="0" 
                 max="100" 
                 value="50"
                 step="5">
</ejs-slider>

<!-- Step of 25 -->
<ejs-slider id="step25" 
                 min="0" 
                 max="100" 
                 value="50"
                 step="25">
</ejs-slider>
```

### Use Cases for Different Steps

**Razor View (CSHTML):**
```html
<!-- Volume (step: 1) -->
<div class="mb-3">
    <label>Volume (1% increments)</label>
    <ejs-slider id="volume" 
                     min="0" 
                     max="100" 
                     value="50"
                     step="1">
    </ejs-slider>
</div>

<!-- Difficulty (step: 10) -->
<div class="mb-3">
    <label>Difficulty (10% increments)</label>
    <ejs-slider id="difficulty" 
                     min="0" 
                     max="100" 
                     value="50"
                     step="10">
    </ejs-slider>
</div>

<!-- Year (step: 5) -->
<div class="mb-3">
    <label>Year (5-year increments)</label>
    <ejs-slider id="year" 
                     min="2000" 
                     max="2030" 
                     value="2015"
                     step="5">
    </ejs-slider>
</div>
```

---

## Label Formatting

### Custom Value Display

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h4>Formatted Label Display</h4>

    <!-- Dollar Format -->
    <div class="mb-4">
        <label>Price (with $ format)</label>
        <ejs-slider id="priceFormat" 
                         min="0" 
                         max="1000" 
                         value="500"
                         step="50"
                         input="formatPrice">
        </ejs-slider>
        <p>Selected: $<span id="priceDisplay">500</span></p>
    </div>

    <!-- Percentage Format -->
    <div class="mb-4">
        <label>Percentage Discount</label>
        <ejs-slider id="discountFormat" 
                         min="0" 
                         max="100" 
                         value="25"
                         step="5"
                         input="formatDiscount">
        </ejs-slider>
        <p>Discount: <span id="discountDisplay">25</span>%</p>
    </div>

    <!-- Temperature Format -->
    <div class="mb-4">
        <label>Temperature (with unit)</label>
        <ejs-slider id="tempFormat" 
                         min="0" 
                         max="100" 
                         value="20"
                         step="1"
                         input="formatTemp">
        </ejs-slider>
        <p>Temperature: <span id="tempDisplay">20</span>°C</p>
    </div>
</div>

<script>
    function formatPrice(e) {
        document.getElementById('priceDisplay').textContent = e.value;
    }

    function formatDiscount(e) {
        document.getElementById('discountDisplay').textContent = e.value;
    }

    function formatTemp(e) {
        document.getElementById('tempDisplay').textContent = e.value;
    }
</script>
```

### Tooltip Formatting

**Razor View (CSHTML):**
```html
<ejs-slider id="tooltipFormat" 
                 min="0" 
                 max="100" 
                 value="50"
                 tooltipFormat="getTooltip">
</ejs-slider>

<script>
    function getTooltip(value) {
        if (value < 33) {
            return 'Low: ' + value;
        } else if (value < 67) {
            return 'Medium: ' + value;
        } else {
            return 'High: ' + value;
        }
    }
</script>
```

---

## See Also

- `range-slider-getting-started.md` — Quick start guide
- `range-slider-types-and-orientation.md` — Types and orientations
- `range-slider-styling.md` — Custom styling
- `range-slider-api-reference.md` — Complete API reference
