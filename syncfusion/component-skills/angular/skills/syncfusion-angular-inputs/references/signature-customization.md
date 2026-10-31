# Customization in Angular Signature Component

## Table of Contents
- [Overview](#overview)
- [Stroke Width Control](#stroke-width-control)
- [Stroke Color](#stroke-color)
- [Background Color](#background-color)
- [Background Image](#background-image)
- [Combining Customizations](#combining-customizations)

## Overview

Customize the Signature component's appearance by modifying stroke properties, background colors, and images. The component uses Canvas API methods (moveTo and lineTo) to render strokes with customizable width, color, and background styling.

## Stroke Width Control

Control stroke width dynamically using properties that enable realistic pen pressure simulation:

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `minStrokeWidth` | number | 0.5 | Minimum width of stroke |
| `maxStrokeWidth` | number | 2.5 | Maximum width of stroke |
| `velocity` | number | 0.7 | Velocity for stroke thickness calculation |

### How It Works

The Signature component calculates stroke width based on:
- **Velocity:** How fast the user draws
- **minStrokeWidth:** Minimum possible width
- **maxStrokeWidth:** Maximum possible width

Slower drawing = thinner strokes; faster drawing = thicker strokes.

### Stroke Width Example

```typescript
import { Component } from '@angular/core';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [SignatureModule],
  standalone: true,
  selector: 'app-stroke-width',
  template: `
    <div class="e-section-control">
      <h4>Sign with Custom Stroke Width</h4>
      <canvas 
        ejs-signature 
        #signature 
        id="signature"
        [maxStrokeWidth]="3"
        [minStrokeWidth]="0.5"
        [velocity]="0.7">
      </canvas>
    </div>
  `,
  styles: [`
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
    }
  `]
})
export class StrokeWidthComponent {}
```

### Fine-tuning Stroke Appearance

**Light, Thin Strokes:**
```typescript
<canvas 
  ejs-signature
  [minStrokeWidth]="0.3"
  [maxStrokeWidth]="1.5"
  [velocity]="0.5">
</canvas>
```

**Bold, Thick Strokes:**
```typescript
<canvas 
  ejs-signature
  [minStrokeWidth]="1.5"
  [maxStrokeWidth]="4"
  [velocity]="0.9">
</canvas>
```

**Controlled Consistent Width:**
```typescript
<canvas 
  ejs-signature
  [minStrokeWidth]="1.5"
  [maxStrokeWidth]="1.5"
  [velocity]="0.7">
</canvas>
```

## Stroke Color

Specify the stroke color using the `strokeColor` property:

```typescript
strokeColor: string  // Default: "#000000"
```

### Supported Color Formats

| Format | Example |
|--------|---------|
| **Hex** | `#ff0000`, `#000` |
| **RGB** | `rgb(255, 0, 0)` |
| **RGBA** | `rgba(255, 0, 0, 0.5)` |
| **Color Names** | `red`, `blue`, `green` |

### Basic Stroke Color Example

```typescript
import { Component } from '@angular/core';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [SignatureModule],
  standalone: true,
  selector: 'app-stroke-color',
  template: `
    <div class="e-section-control">
      <canvas 
        ejs-signature 
        id="signature"
        [strokeColor]="'#2196F3'">
      </canvas>
    </div>
  `
})
export class StrokeColorComponent {}
```

### Dynamic Stroke Color with User Input

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-dynamic-stroke-color',
  template: `
    <div class="e-section-control">
      <div id="input">
        <input 
          type="color" 
          id="colorPicker" 
          value="#000000"
          (change)="updateStrokeColor($event)">
        <label for="colorPicker">Select Stroke Color:</label>
      </div>
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    #input {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    
    input[type="color"] {
      width: 60px;
      height: 40px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
    }
  `]
})
export class DynamicStrokeColorComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  updateStrokeColor(event: any): void {
    const color = event.target.value;
    this.signature!.strokeColor = color;
  }
}
```

### Color Presets

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-color-presets',
  template: `
    <div class="e-section-control">
      <div id="colorButtons">
        <button ejs-button (click)="setColor('#000000')">Black</button>
        <button ejs-button (click)="setColor('#2196F3')">Blue</button>
        <button ejs-button (click)="setColor('#4CAF50')">Green</button>
        <button ejs-button (click)="setColor('#FF5722')">Orange</button>
        <button ejs-button (click)="setColor('#9C27B0')">Purple</button>
      </div>
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    #colorButtons {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    button {
      padding: 8px 16px;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
    }
  `]
})
export class ColorPresetsComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  setColor(color: string): void {
    this.signature!.strokeColor = color;
  }
}
```

## Background Color

Set the background color using the `backgroundColor` property:

```typescript
backgroundColor: string  // Default: "#ffffff"
```

### Background Color Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-bg-color',
  template: `
    <div class="e-section-control">
      <div id="input">
        <input 
          type="color" 
          id="bgColorPicker" 
          value="#ffffff"
          (change)="updateBgColor($event)">
        <label for="bgColorPicker">Background Color:</label>
      </div>
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    #input {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    
    input[type="color"] {
      width: 60px;
      height: 40px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
    }
  `]
})
export class BgColorComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  updateBgColor(event: any): void {
    const bgColor = event.target.value;
    this.signature!.backgroundColor = bgColor;
  }
}
```

## Background Image

Set a background image using the `backgroundImage` property. The image can be hosted locally or retrieved from an online source via URL:

```typescript
backgroundImage: string  // Accepts URL or base64
```

### Background Image Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-bg-image',
  template: `
    <div class="e-section-control">
      <div id="input">
        <input 
          type="text" 
          id="imageUrl"
          placeholder="Enter image URL"
          value="https://example.com/watermark.png">
        <button ejs-button cssClass="e-primary" (click)="setBgImage()">
          Set Background Image
        </button>
      </div>
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    #input {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }
    
    input {
      flex: 1;
      min-width: 200px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    button {
      padding: 8px 16px;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
    }
  `]
})
export class BgImageComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  setBgImage(): void {
    const bgImage = (document.getElementById('imageUrl') as HTMLInputElement).value;
    this.signature!.backgroundImage = bgImage;
  }
}
```

## Combining Customizations

### Complete Customization Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-full-customization',
  template: `
    <div class="e-section-control">
      <div id="presets">
        <button ejs-button cssClass="e-primary" (click)="applyLightTheme()">
          Light Theme
        </button>
        <button ejs-button cssClass="e-primary" (click)="applyDarkTheme()">
          Dark Theme
        </button>
        <button ejs-button cssClass="e-primary" (click)="applyFormalTheme()">
          Formal Theme
        </button>
      </div>
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature"
          [maxStrokeWidth]="2"
          [minStrokeWidth]="0.5"
          [velocity]="0.7">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    #presets {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    button {
      padding: 8px 16px;
    }
    
    canvas {
      border: 2px solid #999;
      height: 400px;
      width: 100%;
      border-radius: 4px;
    }
  `]
})
export class FullCustomizationComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  applyLightTheme(): void {
    this.signature!.backgroundColor = '#ffffff';
    this.signature!.strokeColor = '#000000';
    this.signature!.maxStrokeWidth = 2;
  }

  applyDarkTheme(): void {
    this.signature!.backgroundColor = '#1a1a1a';
    this.signature!.strokeColor = '#ffffff';
    this.signature!.maxStrokeWidth = 2.5;
  }

  applyFormalTheme(): void {
    this.signature!.backgroundColor = '#f5f5f5';
    this.signature!.strokeColor = '#1565c0';
    this.signature!.minStrokeWidth = 1;
    this.signature!.maxStrokeWidth = 2;
    this.signature!.velocity = 0.6;
  }
}
```

### Professional Document Theme

```typescript
setupDocumentTheme(): void {
  // Light cream background with dark blue signature
  this.signature!.backgroundColor = '#fffef0';
  this.signature!.strokeColor = '#003366';
  
  // Consistent stroke width for legibility
  this.signature!.minStrokeWidth = 1;
  this.signature!.maxStrokeWidth = 2;
  this.signature!.velocity = 0.6;
}
```

### Digital Art Theme

```typescript
setupArtTheme(): void {
  // Dark background with vibrant colors
  this.signature!.backgroundColor = '#1a1a2e';
  this.signature!.strokeColor = '#00d4ff';
  
  // Variable width for expressive drawing
  this.signature!.minStrokeWidth = 0.5;
  this.signature!.maxStrokeWidth = 5;
  this.signature!.velocity = 0.8;
}
```

## See Also

- [Save With Background](./open-save.md#save-with-background)
- [User Interactions](./user-interactions.md)
- [Complete Toolbar Integration](./toolbar-integration.md)
