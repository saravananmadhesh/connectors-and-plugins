# Styling and Appearance Customization

## Table of Contents
- [CSS Structure and Classes](#css-structure-and-classes)
- [Basic Sizing](#basic-sizing)
- [Predefined Sizing Classes](#predefined-sizing-classes)
- [Rounded Corners with e-corner](#rounded-corners-with-e-corner)
- [Floating Label Customization](#floating-label-customization)
- [Validation State Colors](#validation-state-colors)
- [Borders and Rounded Corners](#borders-and-rounded-corners)
- [Toggle Password Visibility](#toggle-password-visibility)
- [Change TextBox Color Based on Value](#change-textbox-color-based-on-value)
- [Advanced Customization](#advanced-customization)
- [Theme Integration](#theme-integration)

---

## CSS Structure and Classes

The TextBox component uses a hierarchical CSS class structure for styling:

### Main CSS Classes

```css
.e-input              /* Base input element */
.e-float-input        /* Floating label wrapper */
.e-input-group        /* Input group container */
.e-control-wrapper    /* Primary wrapper element */
.e-error              /* Error validation state */
.e-warning            /* Warning validation state */
.e-success            /* Success validation state */
.e-disabled           /* Disabled state */
.e-readonly           /* Read-only state */
```

### Component Structure

```
.e-float-input.e-control-wrapper
  └── input[type="text"]
  └── label.e-float-text
      ├── .e-label-top
      ├── .e-label-bottom
```

### Inspect Element Example

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-inspect',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <ejs-textbox 
      #myTextbox
      placeholder="Inspect me"
      [floatLabelType]="'Auto'"
    ></ejs-textbox>
  `
})
export class InspectComponent {
  @ViewChild('myTextbox') textboxRef!: ElementRef;

  ngAfterViewInit() {
    // Access element for inspection
    console.log(this.textboxRef.nativeElement);
  }
}
```

---

## Basic Sizing

### Height and Font Customization

Use CSS to customize the height and font size of the TextBox:

```css
.e-input:not(:valid), .e-input:valid,
.e-float-input.e-control-wrapper input:not(:valid), .e-float-input.e-control-wrapper input:valid,
.e-float-input input:not(:valid), .e-float-input input:valid,
.e-input-group input:not(:valid), .e-input-group input:valid {
  font-size: 30px;
  height: 40px;
}
```

### Height Customization via cssClass

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-sizing',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h3>Small</h3>
      <ejs-textbox 
        placeholder="Small input"
        [cssClass]="'small'"
      ></ejs-textbox>

      <h3>Medium (Default)</h3>
      <ejs-textbox 
        placeholder="Medium input"
      ></ejs-textbox>

      <h3>Large</h3>
      <ejs-textbox 
        placeholder="Large input"
        [cssClass]="'large'"
      ></ejs-textbox>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.small input {
      font-size: 12px;
      padding: 4px 8px;
      height: 24px;
    }

    :host ::ng-deep .e-float-input.large input {
      font-size: 18px;
      padding: 12px 16px;
      height: 44px;
    }
  `]
})
export class SizingComponent {}
```

### Font Size and Padding

```css
/* Custom sizing */
.e-float-input input {
  font-size: 16px;
  padding: 12px 16px;
  height: 40px;
}

/* Compact */
.e-float-input.compact input {
  font-size: 12px;
  padding: 6px 10px;
  height: 28px;
}

/* Spacious */
.e-float-input.spacious input {
  font-size: 18px;
  padding: 16px 20px;
  height: 48px;
}
```

### Width Customization

Use the `width` property to set a specific width, or use CSS:

```typescript
<ejs-textbox placeholder="300px wide" width="300px"></ejs-textbox>
<ejs-textbox placeholder="Full width" [cssClass]="'full-width'"></ejs-textbox>
```

```css
:host ::ng-deep .e-float-input.full-width {
  width: 100%;
}
```

---

## Predefined Sizing Classes

The TextBox component supports built-in sizing variants via the `cssClass` property:

| `cssClass` Value | Description |
|-----------------|-------------|
| *(none)* | Normal size (default) |
| `e-small` | Smaller-sized TextBox |
| `e-bigger` | Larger-sized TextBox |

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-predefined-sizing',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h4>Bigger Size</h4>
      <ejs-textbox placeholder="Enter Name" floatLabelType="Auto" cssClass="e-bigger"></ejs-textbox>

      <h4>Normal Size (default)</h4>
      <ejs-textbox placeholder="Enter Name" floatLabelType="Auto"></ejs-textbox>

      <h4>Small Size</h4>
      <ejs-textbox placeholder="Enter Name" floatLabelType="Auto" cssClass="e-small"></ejs-textbox>
    </div>
  `
})
export class PredefinedSizingComponent {}
```

---

## Rounded Corners with e-corner

Add rounded corners to the TextBox by setting `e-corner` in the `cssClass` property. Combine with `e-outline` for a box-model appearance where the rounded corners are clearly visible.

> **Note:** The rounded corner styling is visible only in box model (outlined) inputs.

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-rounded-corner',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox placeholder="Enter Date" cssClass="e-outline e-corner"></ejs-textbox>
    </div>
  `
})
export class RoundedCornerComponent {}
```

---

## Floating Label Customization

### Label Color

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-label-color',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        placeholder="Blue label"
        [floatLabelType]="'Auto'"
        [cssClass]="'blue-label'"
      ></ejs-textbox>

      <ejs-textbox 
        placeholder="Pink label"
        [floatLabelType]="'Auto'"
        [cssClass]="'pink-label'"
      ></ejs-textbox>

      <ejs-textbox 
        placeholder="Green label"
        [floatLabelType]="'Auto'"
        [cssClass]="'green-label'"
      ></ejs-textbox>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.blue-label label.e-float-text {
      color: #2563eb;
    }

    :host ::ng-deep .e-float-input.pink-label label.e-float-text {
      color: #ec4899;
    }

    :host ::ng-deep .e-float-input.green-label label.e-float-text {
      color: #059669;
    }
  `]
})
export class LabelColorComponent {}
```

### Label Font Size

```css
/* Larger floating label */
.e-float-input label.e-float-text {
  font-size: 14px;
  font-weight: 500;
}

/* Smaller floating label */
.e-float-input.compact label.e-float-text {
  font-size: 10px;
  font-weight: 400;
}
```

### Label Position and Timing

```css
/* Adjust label animation timing */
.e-float-input input ~ label.e-float-text {
  transition: all 0.3s ease;
}

/* Faster animation */
.e-float-input.fast-label input ~ label.e-float-text {
  transition: all 0.1s ease;
}

/* Smooth delay */
.e-float-input.delayed-label input ~ label.e-float-text {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Validation State Colors

### Error State Styling

```typescript
@Component({
  selector: 'app-error-styling',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        placeholder="Error state"
        [floatLabelType]="'Auto'"
        [cssClass]="'e-error error-custom'"
      ></ejs-textbox>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.error-custom {
      border-color: #dc2626 !important;
    }

    :host ::ng-deep .e-float-input.error-custom input {
      color: #7f1d1d;
    }

    :host ::ng-deep .e-float-input.error-custom label.e-float-text {
      color: #dc2626;
    }

    :host ::ng-deep .e-float-input.error-custom input::placeholder {
      color: #fca5a5;
    }
  `]
})
export class ErrorStylingComponent {}
```

### Warning State Styling

```css
.e-float-input.e-warning {
  border-color: #ffca1c !important;
  background-color: #fffbeb;
}

.e-float-input.e-warning input {
  color: #854d0e;
}

.e-float-input.e-warning label.e-float-text {
  color: #ffca1c;
}
```

### Success State Styling

```css
.e-float-input.e-success {
  border-color: #22b24b !important;
  background-color: #f0fdf4;
}

.e-float-input.e-success input {
  color: #166534;
}

.e-float-input.e-success label.e-float-text {
  color: #22b24b;
}
```

### Combined Validation Styling

```typescript
@Component({
  selector: 'app-validation-styling',
  standalone: true,
  imports: [TextBoxModule],
  styles: [`
    :host ::ng-deep {
      /* Error styling */
      .e-float-input.e-error {
        border-color: #dc2626 !important;
      }
      .e-float-input.e-error input {
        background-color: #fef2f2;
      }
      .e-float-input.e-error label {
        color: #dc2626;
      }

      /* Warning styling */
      .e-float-input.e-warning {
        border-color: #ffca1c !important;
      }
      .e-float-input.e-warning input {
        background-color: #fffbeb;
      }
      .e-float-input.e-warning label {
        color: #ffca1c;
      }

      /* Success styling */
      .e-float-input.e-success {
        border-color: #22b24b !important;
      }
      .e-float-input.e-success input {
        background-color: #f0fdf4;
      }
      .e-float-input.e-success label {
        color: #22b24b;
      }
    }
  `]
})
export class ValidationStylingComponent {}
```

---

## Borders and Rounded Corners

### Border Styling

```typescript
@Component({
  selector: 'app-border-styling',
  standalone: true,
  imports: [TextBoxModule],
  styles: [`
    :host ::ng-deep {
      /* Thick border */
      .e-float-input.thick-border {
        border: 3px solid #2563eb;
      }

      /* Dashed border */
      .e-float-input.dashed-border {
        border: 2px dashed #059669;
      }

      /* Dotted border */
      .e-float-input.dotted-border {
        border: 2px dotted #7c3aed;
      }

      /* No border */
      .e-float-input.no-border {
        border: none;
        border-bottom: 2px solid #ccc;
      }
    }
  `]
})
export class BorderStylingComponent {}
```

### Rounded Corners

```typescript
@Component({
  selector: 'app-rounded-corners',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h3>Slightly Rounded</h3>
      <ejs-textbox 
        placeholder="4px radius"
        [cssClass]="'rounded-sm'"
      ></ejs-textbox>

      <h3>Medium Rounded</h3>
      <ejs-textbox 
        placeholder="8px radius"
        [cssClass]="'rounded-md'"
      ></ejs-textbox>

      <h3>Fully Rounded (Pill)</h3>
      <ejs-textbox 
        placeholder="9999px radius"
        [cssClass]="'rounded-full'"
      ></ejs-textbox>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.rounded-sm {
      border-radius: 4px;
      overflow: hidden;
    }

    :host ::ng-deep .e-float-input.rounded-md {
      border-radius: 8px;
      overflow: hidden;
    }

    :host ::ng-deep .e-float-input.rounded-full {
      border-radius: 9999px;
      overflow: hidden;
    }
  `]
})
export class RoundedCornersComponent {}
```

---

## Toggle Password Visibility

Add an eye icon using the [`addIcon`](api.md#addicon) method and handle click events to toggle visibility by changing the input element's `type` between `password` and `text`.

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-password-toggle',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox #textbox id="password" placeholder="Enter Password" type="password" (created)="onCreate()"></ejs-textbox>
    </div>
  `
})
export class PasswordToggleComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  public onCreate(): void {
    this.textboxObj.addIcon('append', 'e-icons e-eye');
    document.getElementsByClassName('e-eye')[0].addEventListener('click', () => {
      const textObj = this.textboxObj;
      if (textObj.element.type === 'password') {
        textObj.element.type = 'text';
      } else {
        textObj.element.type = 'password';
      }
    });
  }
}
```

---

## Change TextBox Color Based on Value

Dynamically change the TextBox color based on user input by listening to the `keyup` event and applying or removing CSS validation classes:

```typescript
import { Component } from '@angular/core';
import { TextBoxModule, InputEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-value-based-color',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <label>Normal Input</label>
      <ejs-textbox placeholder="Enter numeric values" (input)="onInput($event)"></ejs-textbox>

      <label>Floating Input</label>
      <ejs-textbox placeholder="Enter numeric values" floatLabelType="Auto" (input)="onInput($event)"></ejs-textbox>
    </div>
  `
})
export class ValueBasedColorComponent {
  public onInput(args: InputEventArgs): void {
    const str = args.value.match(/^[0-9]+$/);
    if (!(str && str.length > 0) && args.value.length) {
      args.container.classList.add('e-error');
    } else {
      args.container.classList.remove('e-error');
    }
  }
}
```

---

## Advanced Customization

### Shadow and Elevation

```typescript
@Component({
  selector: 'app-shadow-elevation',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h3>Subtle Shadow</h3>
      <ejs-textbox 
        placeholder="Subtle shadow"
        [cssClass]="'shadow-sm'"
      ></ejs-textbox>

      <h3>Medium Shadow</h3>
      <ejs-textbox 
        placeholder="Medium shadow"
        [cssClass]="'shadow-md'"
      ></ejs-textbox>

      <h3>Large Shadow</h3>
      <ejs-textbox 
        placeholder="Large shadow"
        [cssClass]="'shadow-lg'"
      ></ejs-textbox>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.shadow-sm {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    :host ::ng-deep .e-float-input.shadow-md {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                  0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    :host ::ng-deep .e-float-input.shadow-lg {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                  0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  `]
})
export class ShadowElevationComponent {}
```

### Focus States

```css
/* Custom focus styling */
.e-float-input input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  border-color: #2563eb;
}

.e-float-input.dark-mode input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  border-color: #3b82f6;
}
```

### Hover States

```css
.e-float-input:hover {
  border-color: #2563eb;
}

.e-float-input:hover input {
  background-color: #f8fafc;
}

.e-float-input.e-error:hover {
  border-color: #dc2626;
}
```

### Disabled State Styling

```typescript
@Component({
  selector: 'app-disabled-styling',
  standalone: true,
  imports: [TextBoxModule],
  styles: [`
    :host ::ng-deep .e-float-input[disabled],
    :host ::ng-deep .e-float-input.e-disabled {
      background-color: #f3f4f6;
      opacity: 0.6;
    }

    :host ::ng-deep .e-float-input.e-disabled input {
      cursor: not-allowed;
      color: #9ca3af;
    }

    :host ::ng-deep .e-float-input.e-disabled label {
      color: #9ca3af;
    }
  `]
})
export class DisabledStylingComponent {}
```

---

## Theme Integration

### Material Theme

```typescript
// In component
import '@syncfusion/ej2-inputs/styles/material.css';

@Component({
  selector: 'app-material-theme',
  standalone: true,
  imports: [TextBoxModule]
})
export class MaterialThemeComponent {}
```

### Bootstrap Theme

```typescript
import '@syncfusion/ej2-inputs/styles/bootstrap.css';
```

### Custom Theme Variables

```css
/* Define CSS variables for theming */
:root {
  --primary-color: #2563eb;
  --error-color: #dc2626;
  --warning-color: #ffca1c;
  --success-color: #22b24b;
  --border-radius: 4px;
  --border-color: #e5e7eb;
}

/* Apply custom theme */
.e-float-input {
  border-color: var(--border-color);
  border-radius: var(--border-radius);
}

.e-float-input.e-error {
  border-color: var(--error-color);
}

.e-float-input.e-warning {
  border-color: var(--warning-color);
}

.e-float-input.e-success {
  border-color: var(--success-color);
}
```

### Dark Mode Support

```typescript
@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [TextBoxModule],
  styles: [`
    :host ::ng-deep {
      /* Light mode */
      .e-float-input {
        background-color: #ffffff;
        color: #000000;
        border-color: #e5e7eb;
      }

      /* Dark mode */
      .dark-mode .e-float-input {
        background-color: #1f2937;
        color: #f3f4f6;
        border-color: #374151;
      }

      .dark-mode .e-float-input input {
        background-color: #1f2937;
        color: #f3f4f6;
      }

      .dark-mode .e-float-input label {
        color: #d1d5db;
      }
    }
  `]
})
export class DarkModeComponent {}
```

---

## Next Steps

- Learn about [multiline-sizing.md](multiline-sizing.md) for textarea styling
- Explore [accessibility-migration.md](accessibility-migration.md) for high contrast mode
- Check [adornments-customization.md](adornments-customization.md) for styled adornments

