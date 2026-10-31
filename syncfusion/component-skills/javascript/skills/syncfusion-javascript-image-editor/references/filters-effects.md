# Filters and Effects

## Table of Contents
- [Filter Effects](#filter-effects)
- [Fine-Tuning Adjustments](#fine-tuning-adjustments)
- [Effect Combinations](#effect-combinations)
- [Common Patterns](#common-patterns)

## Filter Effects

### Available Filters

Apply preset filter effects to images using `applyImageFilter()` with `ImageFilterOption` enum values:

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({ width: '550px', height: '330px' });
imageEditor.appendTo('#imageeditor');

// Available ImageFilterOption enum values
// ImageFilterOption.Default    — Default (no filter)
// ImageFilterOption.Chrome     — Chrome effect
// ImageFilterOption.Cold       — Cold color tone
// ImageFilterOption.Warm       — Warm color tone
// ImageFilterOption.Grayscale  — Grayscale
// ImageFilterOption.Sepia      — Sepia tone
// ImageFilterOption.Invert     — Invert colors
// ImageFilterOption.Sharpen    — Sharpen
// ImageFilterOption.Blur       — Gaussian blur
```

### Apply Filter

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Apply image filters using the ImageFilterOption enum
imageEditor.applyImageFilter(ImageFilterOption.Blur);        // Blur
imageEditor.applyImageFilter(ImageFilterOption.Sharpen);     // Sharpen
imageEditor.applyImageFilter(ImageFilterOption.Grayscale);   // Black and white
imageEditor.applyImageFilter(ImageFilterOption.Sepia);       // Sepia tone
imageEditor.applyImageFilter(ImageFilterOption.Invert);      // Invert colors
imageEditor.applyImageFilter(ImageFilterOption.Chrome);      // Chrome
imageEditor.applyImageFilter(ImageFilterOption.Cold);        // Cold tone
imageEditor.applyImageFilter(ImageFilterOption.Warm);        // Warm tone
imageEditor.applyImageFilter(ImageFilterOption.Default);     // Remove filter
```

### Filter via Toolbar

```typescript
const imageEditor = new ImageEditor({
    toolbar: ['Filter'],
    // User clicks Filter → Select effect from dropdown
    // Effect applied immediately
});
```

## Fine-Tuning Adjustments

### Brightness

Adjust image brightness:

```typescript
// Increase brightness (positive value brightens)
imageEditor.finetuneImage('brightness', 30);  // +30

// Decrease brightness (negative value darkens)
imageEditor.finetuneImage('brightness', -20); // -20

// Reset to original (0)
imageEditor.finetuneImage('brightness', 0);
```

### Contrast

Adjust image contrast:

```typescript
// Increase contrast (makes darks darker, lights lighter)
imageEditor.finetuneImage('contrast', 25);

// Decrease contrast (makes image more uniform)
imageEditor.finetuneImage('contrast', -15);
```

### Saturation

Adjust color saturation:

```typescript
// Increase saturation (more vibrant colors)
imageEditor.finetuneImage('saturation', 30);

// Decrease saturation (less vibrant, toward grayscale)
imageEditor.finetuneImage('saturation', -40);

// Complete desaturation = -100 (black and white)
imageEditor.finetuneImage('saturation', -100);
```

### Hue

Shift color hue:

```typescript
// Shift hue (rotate on color wheel)
imageEditor.finetuneImage('hue', 45);        // Shift 45 degrees
imageEditor.finetuneImage('hue', -120);      // Shift -120 degrees
imageEditor.finetuneImage('hue', 180);       // Invert all colors
```

### Blur

Apply blur effect:

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Apply Gaussian blur
imageEditor.applyImageFilter(ImageFilterOption.Blur);
```

### Sharpen

Enhance image sharpness:

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Apply sharpen filter
imageEditor.applyImageFilter(ImageFilterOption.Sharpen);
```

### Opacity/Alpha

```typescript
// Note: Transparency adjustments in filters
imageEditor.finetuneImage('opacity', 80);    // 80% opaque
imageEditor.finetuneImage('opacity', 50);    // 50% opaque
```

## Effect Combinations

### Black and White with Contrast

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// First convert to grayscale
imageEditor.applyImageFilter(ImageFilterOption.Grayscale);

// Then increase contrast for effect
imageEditor.finetuneImage('contrast', 20);
```

### Sepia with Saturation

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Apply sepia tone
imageEditor.applyImageFilter(ImageFilterOption.Sepia);

// Adjust saturation for intensity
imageEditor.finetuneImage('saturation', 15);
```

### Warm Tone

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Apply warm filter
imageEditor.applyImageFilter(ImageFilterOption.Warm);

// Adjust hue slightly
imageEditor.finetuneImage('hue', 15);
```

### Cool Tone

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Apply cold filter
imageEditor.applyImageFilter(ImageFilterOption.Cold);

// Adjust hue toward blue
imageEditor.finetuneImage('hue', -30);
```

### Vintage Look

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Apply sepia as base
imageEditor.applyImageFilter(ImageFilterOption.Sepia);

// Reduce contrast slightly
imageEditor.finetuneImage('contrast', -10);

// Reduce exposure slightly
imageEditor.finetuneImage('exposure', -5);
```

### High Contrast Black and White

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Convert to grayscale
imageEditor.applyImageFilter(ImageFilterOption.Grayscale);

// Increase contrast significantly
imageEditor.finetuneImage('contrast', 40);

// Slightly increase brightness
imageEditor.finetuneImage('brightness', 5);
```

## Fine-Tuning Values

### Value Ranges

| Property | Range | Default | Effect |
|----------|-------|---------|--------|
| brightness | -100 to +100 | 0 | -100 = black, +100 = bright |
| contrast | -100 to +100 | 0 | -100 = flat, +100 = extreme |
| saturation | -100 to +100 | 0 | -100 = grayscale, +100 = vivid |
| hue | -180 to +180 | 0 | Color wheel rotation |
| exposure | -100 to +100 | 0 | -100 = underexposed, +100 = overexposed |
| opacity | 0 to 100 | 100 | Transparency level |
| blur | 0 to 100 | 0 | Blur intensity |

## Common Patterns

### Pattern: Reset All Adjustments

```typescript
function resetAllEffects(imageEditor: ImageEditor) {
    imageEditor.finetuneImage('brightness', 0);
    imageEditor.finetuneImage('contrast', 0);
    imageEditor.finetuneImage('saturation', 0);
    imageEditor.finetuneImage('hue', 0);
    imageEditor.finetuneImage('exposure', 0);
    imageEditor.finetuneImage('opacity', 100);
    imageEditor.finetuneImage('blur', 0);
    imageEditor.applyImageFilter(ImageFilterOption.Default);
}

document.getElementById('resetBtn').onclick = () => resetAllEffects(imageEditor);
```

### Pattern: Adjustment Sliders

```typescript
function setupEffectSliders(imageEditor: ImageEditor) {
    const effects = [
        { name: 'brightness', id: 'brightnessSlider', min: -100, max: 100 },
        { name: 'contrast', id: 'contrastSlider', min: -100, max: 100 },
        { name: 'saturation', id: 'saturationSlider', min: -100, max: 100 },
        { name: 'hue', id: 'hueSlider', min: -180, max: 180 },
        { name: 'exposure', id: 'exposureSlider', min: -100, max: 100 }
    ];

    effects.forEach(effect => {
        const slider = document.getElementById(effect.id) as HTMLInputElement;
        slider.min = String(effect.min);
        slider.max = String(effect.max);
        slider.value = '0';

        slider.addEventListener('input', (e) => {
            const value = parseInt((e.target as HTMLInputElement).value);
            imageEditor.finetuneImage(effect.name, value);
        });
    });
}
```

### Pattern: Preset Filter Gallery

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

function createFilterGallery(imageEditor: ImageEditor) {
    const presets = [
        { name: 'Grayscale', apply: () => imageEditor.applyImageFilter(ImageFilterOption.Grayscale) },
        { name: 'Sepia',     apply: () => imageEditor.applyImageFilter(ImageFilterOption.Sepia) },
        { name: 'Invert',    apply: () => imageEditor.applyImageFilter(ImageFilterOption.Invert) },
        { name: 'Chrome',    apply: () => imageEditor.applyImageFilter(ImageFilterOption.Chrome) },
        { name: 'Warm',      apply: () => imageEditor.applyImageFilter(ImageFilterOption.Warm) },
        { name: 'Cold',      apply: () => imageEditor.applyImageFilter(ImageFilterOption.Cold) },
        { name: 'Blur',      apply: () => imageEditor.applyImageFilter(ImageFilterOption.Blur) },
        { name: 'Sharpen',   apply: () => imageEditor.applyImageFilter(ImageFilterOption.Sharpen) },
        { name: 'Saturated', apply: () => imageEditor.finetuneImage('saturation', 50) },
    ];

    const gallery = document.getElementById('filterGallery');

    presets.forEach(preset => {
        const btn = document.createElement('button');
        btn.textContent = preset.name;
        btn.onclick = () => {
            imageEditor.undo();  // Undo previous filter
            preset.apply();
        };
        gallery.appendChild(btn);
    });
}
```

### Pattern: Before/After Comparison

```typescript
function setupBeforeAfter(imageEditor: ImageEditor, originalUrl: string) {
    document.getElementById('beforeBtn').onclick = () => {
        // Reload original image
        imageEditor.open(originalUrl);
    };

    document.getElementById('afterBtn').onclick = () => {
        // Current state is the edited version — no action needed
        console.log('Showing edited state');
    };
}
```

### Pattern: Auto-Enhance

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

function autoEnhance(imageEditor: ImageEditor) {
    // Slightly increase contrast
    imageEditor.finetuneImage('contrast', 10);

    // Increase saturation mildly
    imageEditor.finetuneImage('saturation', 15);

    // Slight sharpening via filter
    imageEditor.applyImageFilter(ImageFilterOption.Sharpen);
}

document.getElementById('autoEnhanceBtn').onclick = () => autoEnhance(imageEditor);
```

