# Drawing Signatures Programmatically

## Overview

The `draw()` method enables you to render text as a digital signature with customizable font properties. This is useful for programmatically generating signatures, creating watermarks, or batch processing signature text.

## Draw Method Syntax

```typescript
draw(text: string, fontFamily?: string, fontSize?: number): void
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | (required) | The text to render as signature |
| `fontFamily` | string | "Arial" | Font family for rendering (Arial, Serif, Sans-serif, Cursive, Fantasy) |
| `fontSize` | number | 30 | Font size in pixels |

### Return Value

Returns `void`. The signature is rendered directly on the canvas.

## Supported Font Families

| Font Family | Description |
|------------|-------------|
| **Arial** | Sans-serif font (default, modern, clean) |
| **Serif** | Formal serif font (traditional, professional) |
| **Sans-serif** | Generic sans-serif fallback |
| **Cursive** | Handwriting-style font (informal, elegant) |
| **Fantasy** | Decorative font (artistic, unique) |

## Basic Usage

### Simple Text Drawing

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [SignatureModule],
  standalone: true,
  selector: 'app-draw',
  template: `
    <div>
      <button (click)="drawSignature()">Draw Default</button>
      <canvas ejs-signature #signature id="signature"></canvas>
    </div>
  `
})
export class DrawComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  drawSignature(): void {
    // Draws "John Doe" in Arial, 30px
    this.signature?.draw('John Doe');
  }
}
```

## Drawing with Custom Font Family

### Using Different Fonts

```typescript
drawWithFont(): void {
  // Arial - Modern, clean
  this.signature?.draw('John Doe', 'Arial', 30);

  // Serif - Formal, professional
  this.signature?.draw('Jane Smith', 'Serif', 28);

  // Cursive - Handwriting style
  this.signature?.draw('Robert Brown', 'Cursive', 35);
}
```

## Drawing with User Input

### Interactive Font and Size Selection

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, DropDownListModule, ButtonModule],
  standalone: true,
  selector: 'app-interactive-draw',
  template: `
    <div class="e-section-control">
      <div id="input">
        <table>
          <tbody>
            <tr>
              <td><label>Enter Text:</label></td>
              <td><input type="text" id="text" placeholder="Enter text to draw"></td>
            </tr>
            <tr>
              <td><label>Font Family:</label></td>
              <td>
                <ejs-dropdownlist 
                  id="font" 
                  #font 
                  [dataSource]="fontItems" 
                  [value]="fontValue"
                  [fields]="fontfields"
                  [popupHeight]="'200px'">
                </ejs-dropdownlist>
              </td>
            </tr>
            <tr>
              <td><label>Font Size:</label></td>
              <td>
                <ejs-dropdownlist 
                  id="size" 
                  #size 
                  [dataSource]="sizeData" 
                  [value]="sizeValue"
                  [fields]="sizefields"
                  [popupHeight]="'200px'">
                </ejs-dropdownlist>
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <button ejs-button cssClass="e-primary" (click)="onDraw()">
          Draw Signature
        </button>
      </div>
      <div id="signature-control">
        <canvas ejs-signature #signature id="signature"></canvas>
      </div>
    </div>
  `,
  styles: [`
    table {
      border-collapse: collapse;
      margin-bottom: 15px;
    }
    
    td {
      padding: 10px;
      border: 1px solid #ddd;
    }
    
    label {
      font-weight: bold;
    }
    
    input, ejs-dropdownlist {
      width: 100%;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
    }
  `]
})
export class InteractiveDrawComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  @ViewChild('font')
  public font?: DropDownListComponent;

  @ViewChild('size')
  public size?: DropDownListComponent;

  public fontValue: string = 'Arial';
  public sizeValue: number = 20;
  
  public fontItems: Object[] = [
    { value: 'Arial' },
    { value: 'Serif' },
    { value: 'Sans-serif' },
    { value: 'Cursive' },
    { value: 'Fantasy' }
  ];

  public fontfields: Object = { text: 'value', value: 'value' };

  public sizeData: Object[] = [
    { value: '16' },
    { value: '20' },
    { value: '24' },
    { value: '28' },
    { value: '32' },
    { value: '36' },
    { value: '40' }
  ];

  public sizefields: Object = { text: 'value', value: 'value' };

  onDraw(): void {
    const text = (document.getElementById('text') as HTMLInputElement).value;
    const fontFamily = (this.font as any).value || 'Arial';
    const fontSize = (this.size as any).value || 20;

    if (text.trim()) {
      this.signature?.draw(text, fontFamily, fontSize);
    } else {
      alert('Please enter text to draw');
    }
  }
}
```

## Complete Draw Example with Clear

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-draw-complete',
  template: `
    <div class="e-section-control">
      <div id="controls">
        <button ejs-button cssClass="e-primary" (click)="drawCursive()">
          Draw (Cursive)
        </button>
        <button ejs-button cssClass="e-primary" (click)="drawSerif()">
          Draw (Serif)
        </button>
        <button ejs-button cssClass="e-danger" (click)="clearCanvas()">
          Clear
        </button>
      </div>
      <div id="signature-control">
        <canvas ejs-signature #signature id="signature"></canvas>
      </div>
    </div>
  `,
  styles: [`
    #controls {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
      display: block;
    }
  `]
})
export class DrawCompleteComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  drawCursive(): void {
    // Draw in Cursive font
    this.signature?.draw('John Doe', 'Cursive', 35);
  }

  drawSerif(): void {
    // Draw in Serif font
    this.signature?.draw('John Doe', 'Serif', 30);
  }

  clearCanvas(): void {
    this.signature?.clear();
  }
}
```

## Important Notes

### Clearing Before Drawing

The `draw()` method adds to the existing canvas. To replace previous content, call `clear()` first:

```typescript
drawNewSignature(): void {
  this.signature?.clear(); // Clear previous content
  this.signature?.draw('New Signature', 'Arial', 30);
}
```

### Default Values

If parameters are omitted, defaults are used:

```typescript
// Uses default Arial, 30px
this.signature?.draw('Text');

// Uses default 30px
this.signature?.draw('Text', 'Cursive');

// Fully specified
this.signature?.draw('Text', 'Serif', 28);
```

### Font Size Recommendations

| Use Case | Font Size |
|----------|-----------|
| Small display (widgets) | 16-20px |
| Standard form | 24-30px |
| Large display (posters) | 36-48px |
| Document signatures | 28-36px |

### Combining Draw with Customization

```typescript
applyDrawWithCustomization(): void {
  // Set colors and width
  this.signature!.strokeColor = '#1a73e8';
  this.signature!.backgroundColor = '#f5f5f5';
  
  // Draw the signature
  this.signature?.draw('Authorized By', 'Serif', 24);
}
```

## Use Cases

1. **Watermarks:** Draw approval text on documents
2. **Batch Signatures:** Generate signatures for batch exports
3. **Templates:** Pre-populate signature fields with names
4. **Authentication:** Display authorized by information
5. **Reports:** Add signature lines to generated PDFs
