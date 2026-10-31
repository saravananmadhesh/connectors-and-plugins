# Filtering and Fine-tuning in Angular Image Editor

## Table of Contents
- [Image Filters](#image-filters)
- [Fine-tuning Operations](#fine-tuning-operations)
- [Event Handling](#event-handling)
- [Complete Examples](#complete-examples)

---

## Image Filters

Apply preset visual effects to instantly change image appearance.

### Available Filters

```typescript
// Filter options available:
// 'Default' - Remove all filters
// 'Cold' - Cool blue tone
// 'Warm' - Warm orange tone
// 'Chrome' - Chrome effect
// 'Sepia' - Vintage brown tone
// 'Invert' - Inverted colors
// 'Grayscale' - Black and white
// 'BlackAndWhite' - High contrast black and white
```

### Apply Filter

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-filters',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="applyCold()">Cold</button>
    <button (click)="applyWarm()">Warm</button>
    <button (click)="applySepia()">Sepia</button>
    <button (click)="applyInvert()">Invert</button>
    <button (click)="applyGrayscale()">Grayscale</button>
    <button (click)="removeFilter()">Default</button>
  `
})
export class FiltersComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  applyCold() {
    this.imageEditor?.applyImageFilter('Cold');
  }

  applyWarm() {
    this.imageEditor?.applyImageFilter('Warm');
  }

  applySepia() {
    this.imageEditor?.applyImageFilter('Sepia');
  }

  applyInvert() {
    this.imageEditor?.applyImageFilter('Invert');
  }

  applyGrayscale() {
    this.imageEditor?.applyImageFilter('Grayscale');
  }

  removeFilter() {
    this.imageEditor?.applyImageFilter('Default');
  }
}
```

### Filter Effects Summary

| Filter | Effect | Use Case |
|--------|--------|----------|
| `Cold` | Blue cast, cool tones | Winter photos, cooling warmth |
| `Warm` | Orange cast, warm tones | Sunset photos, adding warmth |
| `Chrome` | Metallic chrome effect | Modern, stylized look |
| `Sepia` | Brown vintage tone | Vintage, nostalgic feel |
| `Invert` | Inverted colors | Creative effect, negative |
| `Grayscale` | Black and white | Classic, timeless look |
| `BlackAndWhite` | High contrast B&W | Dramatic, artistic |

### Toolbar Filter Selection

Users can select filters through toolbar:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [toolbar]="['Filter', 'Finetune', 'Save']"
    ></ejs-imageeditor>
  `
})
export class FilterToolbarComponent { }
```

---

## Fine-tuning Operations

Make precise adjustments to image properties.

### Brightness Adjustment

```typescript
increaseBrightness() {
  // Value range: typically -100 to 100
  this.imageEditor?.finetuneImage('Brightness', 30);
}

decreaseBrightness() {
  this.imageEditor?.finetuneImage('Brightness', -30);
}
```

### Contrast Adjustment

```typescript
increaseContrast() {
  this.imageEditor?.finetuneImage('Contrast', 40);
}

decreaseContrast() {
  this.imageEditor?.finetuneImage('Contrast', -40);
}
```

### Saturation Adjustment

```typescript
increaseSaturation() {
  this.imageEditor?.finetuneImage('Saturation', 50);
}

decreaseSaturation() {
  this.imageEditor?.finetuneImage('Saturation', -50);
}
```

### Hue Adjustment

```typescript
shiftHue() {
  this.imageEditor?.finetuneImage('Hue', 45);
}

resetHue() {
  this.imageEditor?.finetuneImage('Hue', 0);
}
```

### Exposure Adjustment

```typescript
increaseExposure() {
  this.imageEditor?.finetuneImage('Exposure', 25);
}

decreaseExposure() {
  this.imageEditor?.finetuneImage('Exposure', -25);
}
```

### Blur Effect

```typescript
applyBlur() {
  this.imageEditor?.finetuneImage('Blur', 10);
}

removeBlur() {
  this.imageEditor?.finetuneImage('Blur', 0);
}
```

### Opacity Adjustment

```typescript
makeTransparent() {
  this.imageEditor?.finetuneImage('Opacity', 0.5); // 50% opacity
}

makeOpaque() {
  this.imageEditor?.finetuneImage('Opacity', 1.0); // 100% opacity
}
```

### Combining Adjustments

```typescript
enhancePhoto() {
  // Increase brightness
  this.imageEditor?.finetuneImage('Brightness', 15);
  
  // Increase contrast
  this.imageEditor?.finetuneImage('Contrast', 20);
  
  // Increase saturation
  this.imageEditor?.finetuneImage('Saturation', 30);
}
```

---

## Event Handling

### Image Filtering Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [imageFiltering]="onImageFiltering"
    ></ejs-imageeditor>
  `
})
export class ImageFilteringEventComponent {
  onImageFiltering(args: any) {
    console.log('Filter Type:', args.filter);
    
    // Can prevent filter application
    if (args.filter === 'Sepia') {
      args.cancel = true; // Prevent sepia filter
    }
  }
}
```

### Fine-tune Value Changing Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [finetuneValueChanging]="onFinetuneChanging"
    ></ejs-imageeditor>
  `
})
export class FinetuneEventComponent {
  onFinetuneChanging(args: any) {
    console.log('Finetune Type:', args.finetune);      // 'Brightness', 'Contrast', etc.
    console.log('Value:', args.value);
    
    // Limit brightness adjustment
    if (args.finetune === 'Brightness' && args.value > 50) {
      args.value = 50;
    }
    
    // Prevent specific adjustments
    if (args.finetune === 'Blur') {
      args.cancel = true;
    }
  }
}
```

---

## Complete Examples

### Professional Photo Enhancement

```typescript
@Component({
  selector: 'app-photo-enhancer',
  template: `
    <div style="padding: 20px;">
      <h3>Photo Enhancer</h3>
      <div style="margin-bottom: 10px;">
        <button (click)="enhanceAuto()">Auto Enhance</button>
        <button (click)="increaseBrightness()">Brighter</button>
        <button (click)="decreaseBrightness()">Darker</button>
        <button (click)="vibrancy()">Vibrant</button>
        <button (click)="vintage()">Vintage</button>
      </div>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor 
          #imageEditor
          [toolbar]="['Open', 'Finetune', 'Filter', 'Undo', 'Redo', 'Save']"
        ></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class PhotoEnhancerComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  enhanceAuto() {
    this.imageEditor?.finetuneImage('Brightness', 10);
    this.imageEditor?.finetuneImage('Contrast', 15);
    this.imageEditor?.finetuneImage('Saturation', 20);
  }

  increaseBrightness() {
    this.imageEditor?.finetuneImage('Brightness', 20);
  }

  decreaseBrightness() {
    this.imageEditor?.finetuneImage('Brightness', -20);
  }

  vibrancy() {
    this.imageEditor?.applyImageFilter('Warm');
    this.imageEditor?.finetuneImage('Saturation', 30);
  }

  vintage() {
    this.imageEditor?.applyImageFilter('Sepia');
    this.imageEditor?.finetuneImage('Contrast', -10);
  }
}
```

### Slider-Based Adjustment

```typescript
@Component({
  selector: 'app-slider-adjustment',
  template: `
    <div style="padding: 20px;">
      <div style="margin-bottom: 20px;">
        <label>Brightness:</label>
        <input 
          type="range" 
          min="-100" 
          max="100" 
          value="0"
          (change)="onBrightnessChange($event)"
        >
        <span>{{ brightnessValue }}</span>
      </div>
      <div style="margin-bottom: 20px;">
        <label>Contrast:</label>
        <input 
          type="range" 
          min="-100" 
          max="100" 
          value="0"
          (change)="onContrastChange($event)"
        >
        <span>{{ contrastValue }}</span>
      </div>
      <div style="margin-bottom: 20px;">
        <label>Saturation:</label>
        <input 
          type="range" 
          min="-100" 
          max="100" 
          value="0"
          (change)="onSaturationChange($event)"
        >
        <span>{{ saturationValue }}</span>
      </div>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor #imageEditor></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class SliderAdjustmentComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  
  brightnessValue = 0;
  contrastValue = 0;
  saturationValue = 0;

  onBrightnessChange(event: any) {
    this.brightnessValue = event.target.value;
    this.imageEditor?.finetuneImage('Brightness', this.brightnessValue);
  }

  onContrastChange(event: any) {
    this.contrastValue = event.target.value;
    this.imageEditor?.finetuneImage('Contrast', this.contrastValue);
  }

  onSaturationChange(event: any) {
    this.saturationValue = event.target.value;
    this.imageEditor?.finetuneImage('Saturation', this.saturationValue);
  }
}
```

### Creative Effects Suite

```typescript
@Component({
  selector: 'app-effects-suite',
  template: `
    <div style="padding: 20px;">
      <div style="margin-bottom: 10px;">
        <button (click)="duotone()">Duotone</button>
        <button (click)="dramaticlighting()">Dramatic</button>
        <button (click)="softfocus()">Soft Focus</button>
        <button (click)="noir()">Film Noir</button>
        <button (click)="reset()">Reset</button>
      </div>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor #imageEditor></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class EffectsSuiteComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  duotone() {
    this.imageEditor?.applyImageFilter('Cold');
    this.imageEditor?.finetuneImage('Saturation', -50);
    this.imageEditor?.finetuneImage('Contrast', 30);
  }

  dramaticlighting() {
    this.imageEditor?.finetuneImage('Contrast', 50);
    this.imageEditor?.finetuneImage('Brightness', -10);
    this.imageEditor?.finetuneImage('Saturation', 20);
  }

  softfocus() {
    this.imageEditor?.finetuneImage('Blur', 15);
    this.imageEditor?.finetuneImage('Brightness', 10);
  }

  noir() {
    this.imageEditor?.applyImageFilter('BlackAndWhite');
    this.imageEditor?.finetuneImage('Contrast', 40);
    this.imageEditor?.finetuneImage('Brightness', -5);
  }

  reset() {
    this.imageEditor?.applyImageFilter('Default');
    this.imageEditor?.finetuneImage('Brightness', 0);
    this.imageEditor?.finetuneImage('Contrast', 0);
    this.imageEditor?.finetuneImage('Saturation', 0);
  }
}
```

---

## Best Practices

1. **Combine filters and fine-tuning** for complex effects
2. **Use undo/redo** to experiment without losing original
3. **Save after adjustments** to preserve edits
4. **Monitor event handlers** for performance with extreme values
5. **Provide presets** for common adjustments
6. **Use sliders** for user-controlled fine-tuning

---

## Edge Cases & Troubleshooting

**Issue:** Changes not visible immediately
- **Solution:** Wait for event to complete; some effects render asynchronously

**Issue:** Over-adjusting creates poor quality
- **Solution:** Use moderate values (±50 range); extreme values may distort image

**Issue:** Cannot undo filter application
- **Solution:** Ensure undo is enabled and history hasn't reached 16-step limit

**Issue:** Filter + fine-tune combination looks different than expected
- **Solution:** Apply in consistent order; different sequences may yield different visual results
