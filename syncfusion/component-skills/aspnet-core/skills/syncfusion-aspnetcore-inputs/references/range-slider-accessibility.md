# Range Slider Accessibility — ASP.NET Core

This reference covers WCAG 2.2 compliance, keyboard navigation, ARIA attributes, and accessible slider implementation.

## Table of Contents
- [Accessibility Overview](#accessibility-overview)
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [Examples](#examples)

---

## Accessibility Overview

Accessible Range Sliders ensure all users can interact with controls using keyboard, screen readers, and assistive technologies.

**Key Principles:**
- Operable with keyboard (Tab, Arrow Keys)
- Proper labeling and descriptions
- ARIA roles and attributes
- Screen reader compatibility
- Visual focus indicators

---

## WCAG Compliance

### Level A - Basic Compliance

**Minimal Requirements:**
- Keyboard accessibility (Tab, Arrow keys)
- Basic labels
- 4.5:1 color contrast for thumb
- Focus indicator (minimum 2px outline)

### Level AA - Recommended (Industry Standard)

**Requirements:**
- Full keyboard navigation
- Associated labels with `aria-label` or `aria-labelledby`
- Focus indicator clearly visible
- 4.5:1 color contrast
- Meaningful value change announcements

### Level AAA - Enhanced Compliance

**Requirements:**
- Enhanced focus indicator (3px minimum)
- 7:1 color contrast
- Additional assistance for complex ranges
- Voice control support
- Multiple input methods

---

## Keyboard Navigation

### Tab Navigation

Slider must be reachable with Tab key:

**Razor View (CSHTML):**
```html
<!-- Sliders will be tabbed in order -->
<ejs-textbox id="name" placeholder="Name" type="text"></ejs-textbox>

<!-- User tabs here -->
<ejs-slider id="quantity" 
                 min="1" 
                 max="100" 
                 value="50">
</ejs-slider>

<!-- User tabs here -->
<button type="submit">Submit</button>
```

### Arrow Key Navigation

Once focused, use arrow keys to adjust value:

| Key | Action |
|-----|--------|
| ← (Left) | Decrease value |
| → (Right) | Increase value |
| ↓ (Down) | Decrease value (vertical) |
| ↑ (Up) | Increase value (vertical) |
| Home | Set to minimum |
| End | Set to maximum |
| Page Up | Increase by step × 5 |
| Page Down | Decrease by step × 5 |

**Example:**
```html
<ejs-slider id="keyboardSlider" 
                 min="0" 
                 max="100" 
                 value="50"
                 step="1">
</ejs-slider>

<!-- When focused:
     - Use arrow keys to adjust volume
     - Use Home/End for min/max
-->
```

### Visible Focus Indicator

**CSS (wwwroot/css/accessibility.css):**
```css
/* High contrast focus indicator */
ejs-slider:focus,
ejs-slider:focus-visible {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
}

.e-handle:focus {
    box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.25);
    border: 2px solid #4A90E2;
}

/* High contrast mode support */
@media (prefers-contrast: more) {
    ejs-slider:focus,
    ejs-slider:focus-visible {
        outline: 4px solid #000;
        outline-offset: 3px;
    }
}
```

---

## ARIA Attributes

### aria-label

Provide descriptive label for screen readers:

**Razor View (CSHTML):**
```html
<!-- Single slider with label -->
<ejs-slider id="volume" 
                 min="0" 
                 max="100" 
                 value="50">
</ejs-slider>
```

### aria-labelledby

Link slider to external label element:

**Razor View (CSHTML):**
```html
<label id="volumeLabel">Volume Control</label>

<ejs-slider id="volumeSlider" 
                 min="0" 
                 max="100" 
                 value="50">
</ejs-slider>
```

### aria-valuenow / aria-valuemin / aria-valuemax

For single sliders, provide current value:

**Razor View (CSHTML):**
```html
<ejs-slider id="accessible" 
                 min="0" 
                 max="100" 
                 value="50">
</ejs-slider>
```

---

## Screen Reader Support

### Announcements on Value Change

Make value changes audible to screen reader users:

**Razor View (CSHTML):**
```html
<div class="container">
    <label id="sliderLabel">Select Brightness</label>
    
    <ejs-slider id="brightness" 
                     min="0" 
                     max="100" 
                     value="50"
                     change="announceBrightnessChange">
    </ejs-slider>

    <!-- Screen reader will announce changes -->
    <div id="announcement" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>
</div>

<script>
    function announceBrightnessChange(e) {
        const message = `Brightness adjusted to ${e.value} percent`;
        document.getElementById('announcement').textContent = message;
    }
</script>

<style>
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
</style>
```

### Form Context

Use fieldset for grouped sliders:

**Razor View (CSHTML):**
```html
<fieldset>
    <legend>Image Adjustments</legend>

    <div class="form-group">
        <label for="brightnessSlider">Brightness</label>
        <ejs-slider id="brightnessSlider" 
                         min="0" 
                         max="100" 
                         value="50">
        </ejs-slider>
    </div>

    <div class="form-group">
        <label for="contrastSlider">Contrast</label>
        <ejs-slider id="contrastSlider" 
                         min="0" 
                         max="100" 
                         value="50">
        </ejs-slider>
    </div>

    <div class="form-group">
        <label for="saturationSlider">Saturation</label>
        <ejs-slider id="saturationSlider" 
                         min="0" 
                         max="100" 
                         value="50">
        </ejs-slider>
    </div>
</fieldset>
```

---

## Examples

### Accessible Volume Control

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <div class="card" style="max-width: 300px; margin: 0 auto;">
        <div class="card-body">
            <label for="volumeControl" class="form-label">
                Volume Level
            </label>

            <div class="d-flex align-items-center gap-2">
                <span class="e-icons e-volume-low" aria-hidden="true"></span>

                <ejs-slider id="volumeControl" 
                                 min="0" 
                                 max="100" 
                                 value="50"
                                 step="1"
                                 change="updateVolume">
                </ejs-slider>

                <span class="e-icons e-volume-high" aria-hidden="true"></span>
            </div>

            <div id="volumeDisplay" role="status" aria-live="polite">
                Volume: <strong>50%</strong>
            </div>

            <p id="volumeHelp" class="form-text text-muted small">
                Use arrow keys to adjust volume when focused.
            </p>
        </div>
    </div>
</div>

<script>
    function updateVolume(e) {
        document.getElementById('volumeDisplay').innerHTML = 
            `Volume: <strong>${e.value}%</strong>`;
    }
</script>

<style>
    .form-label {
        font-weight: 600;
        margin-bottom: 1rem;
    }

    [role="status"] {
        margin-top: 1rem;
        padding: 0.5rem;
        background-color: #f8f9fa;
        border-radius: 4px;
    }
</style>
```

### Accessible Price Range Filter

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <div class="card">
        <div class="card-body">
            <fieldset>
                <legend>Filter Products by Price</legend>

                <ejs-slider id="priceFilter" 
                                 min="0" 
                                 max="1000" 
                                 step="50"
                                 change="updatePriceDisplay"
                                 type="Range">
                </ejs-slider>

                <div id="priceFilterLabel" class="sr-only">
                    Select price range between $0 and $1000
                </div>

                <div id="priceFilterHelp" class="form-text text-muted small">
                    Drag to select price range. Use arrow keys for precise adjustments.
                </div>

                <div id="priceDisplay" role="status" aria-live="polite" class="mt-3">
                    <p>Price Range: $<span id="minPrice">200</span> - $<span id="maxPrice">800</span></p>
                </div>

                <button class="btn btn-primary w-100 mt-4" onclick="applyFilter()">
                    Apply Filter
                </button>
            </fieldset>
        </div>
    </div>
</div>

<script>
    function updatePriceDisplay(e) {
        console.log('Changed');
    }

    function applyFilter() {
        console.log('Filter applied');
    }
</script>

<style>
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    fieldset {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 1rem;
        margin-bottom: 1rem;
    }

    legend {
        font-size: 1.1rem;
        font-weight: 600;
        padding: 0 0.5rem;
    }

    [role="status"] {
        padding: 0.5rem;
        background-color: #f8f9fa;
        border-radius: 4px;
    }
</style>
```

---

## Accessibility Testing Checklist

- ✅ Slider is focusable with Tab key
- ✅ Arrow keys adjust value when focused
- ✅ Focus indicator is clearly visible
- ✅ Proper aria-label or aria-labelledby present
- ✅ Value changes are announced to screen readers
- ✅ Color contrast meets WCAG AA standard (4.5:1)
- ✅ Works with NVDA, JAWS, or VoiceOver
- ✅ Keyboard shortcuts documented
- ✅ Help text provided (aria-describedby)
- ✅ Form fieldsets group related sliders

---

## See Also

- `range-slider-getting-started.md` — Quick start guide
- `range-slider-types-and-orientation.md` — Types and orientations
- `range-slider-events-and-methods.md` — Event handling
- `range-slider-api-reference.md` — Complete API reference

