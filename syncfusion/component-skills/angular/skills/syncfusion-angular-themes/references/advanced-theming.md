# Advanced Theming Features

## Table of Contents
- [Size Modes (Touch Support)](#size-modes-touch-support)
- [Component-Specific Styling](#component-specific-styling)
- [Theme Studio Customization](#theme-studio-customization)

## Size Modes (Touch Support)

Syncfusion Angular components provide two size modes to optimize UX across different devices and input methods:

- **Normal mode (default):** Standard control sizes optimized for mouse/keyboard input
- **Touch mode (bigger):** Enlarged controls with increased spacing for touch/mobile devices

### Global Size Mode

Enable touch mode for the entire application by adding the `e-bigger` class to `<body>`:

```html
<!-- index.html -->
<body class="e-bigger">
  <app-root></app-root>
</body>
```

**Effect:** All Syncfusion components increase in size with larger tap targets (44x44px minimum).

### Component-Specific Size Mode

Apply touch mode to individual components:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <!-- Regular size button -->
      <ejs-button>Normal Button</ejs-button>
      
      <!-- Touch-optimized button via container class -->
      <div class="e-bigger">
        <ejs-button>Touch Button</ejs-button>
      </div>
      
      <!-- Touch-optimized grid via cssClass prop -->
      <ejs-grid cssClass="e-bigger" [dataSource]="data"></ejs-grid>
    </div>
  `
})
export class AppComponent {
  data = [
    { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 }
  ];
}
```

### Runtime Size Mode Switching

Toggle size mode dynamically based on user preference or device detection:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h3>Size Mode: {{ isTouchMode ? 'Touch' : 'Normal' }}</h3>
      <ejs-button (click)="toggleSizeMode()">
        Toggle Size Mode
      </ejs-button>
      
      <div style="margin-top: 20px">
        <ejs-button isPrimary="true">Sample Button</ejs-button>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  isTouchMode = false;

  ngOnInit(): void {
    // Auto-detect touch device on mount
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.isTouchMode = isTouchDevice;
    this.applySizeMode();
  }

  toggleSizeMode(): void {
    this.isTouchMode = !this.isTouchMode;
    this.applySizeMode();
  }

  private applySizeMode(): void {
    if (this.isTouchMode) {
      document.body.classList.add('e-bigger');
    } else {
      document.body.classList.remove('e-bigger');
    }
  }
}
```

## Component-Specific Styling

### Button Customization

```css
/* src/styles.css */
.e-btn {
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.e-btn.e-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.e-btn.e-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}
```

### Custom Component Classes

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ejs-button cssClass="custom-success-btn">Success</ejs-button>
    <ejs-button cssClass="custom-warning-btn">Warning</ejs-button>
    <ejs-button cssClass="custom-error-btn">Error</ejs-button>
  `,
  styles: [`
    .custom-success-btn.e-btn {
      background: #4caf50;
      color: white;
    }
    
    .custom-warning-btn.e-btn {
      background: #ff9800;
      color: white;
    }
    
    .custom-error-btn.e-btn {
      background: #f44336;
      color: white;
    }
    
    .custom-success-btn.e-btn:hover,
    .custom-warning-btn.e-btn:hover,
    .custom-error-btn.e-btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  `]
})
export class AppComponent { }
```

### ViewEncapsulation for Component Styling

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ejs-button cssClass="gradient-btn">Gradient Button</ejs-button>
  `,
  styles: [`
    .gradient-btn.e-btn {
      background: linear-gradient(135deg, #75e1ef 0%, #5ccde0 100%);
      color: #000000;
      border: none;
      border-radius: 20px;
      padding: 12px 24px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .gradient-btn.e-btn:hover {
      background: linear-gradient(135deg, #5ccde0 0%, #4ab8c9 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(117, 225, 239, 0.4);
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
```

**⚠️ Important:** Always target Syncfusion component root classes (e.g., `.e-btn`, `.e-input`, `.e-grid`) for proper style application.

## Theme Studio Customization

### Accessing Theme Studio

Visit [https://ej2.syncfusion.com/themestudio/?theme=tailwind3](https://ej2.syncfusion.com/themestudio/?theme=tailwind3)

**Available themes:**
- Material 3: `?theme=material3`
- Fluent 2: `?theme=fluent2`
- Bootstrap 5.3: `?theme=bootstrap5.3`
- Tailwind 3.4: `?theme=tailwind3`

### Customizing Theme Colors

Theme Studio exposes common theme variables for customization:

1. **Select base theme** (Material 3, Fluent 2, Bootstrap 5.3, Tailwind 3.4)
2. **Pick colors** using color pickers for primary, secondary, success, warning, error
3. **Preview changes** in real-time across multiple components
4. **Filter components** to generate CSS for specific components only (reduces bundle size)
5. **Download theme** as ZIP containing CSS, SCSS, and `settings.json`

### Using Downloaded Theme

```typescript
// Option 1: Import in styles.css
// @import './custom-theme/custom-material3.css';

// Option 2: Add to angular.json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.css",
              "src/custom-theme/custom-material3.css"
            ]
          }
        }
      }
    }
  }
}
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ejs-button isPrimary="true">Custom Theme Button</ejs-button>
  `
})
export class AppComponent { }
```

### Re-importing Settings

To modify an existing custom theme:

1. Click **Import** icon in Theme Studio
2. Upload previously downloaded `settings.json`
3. Modify colors as needed
4. Download updated theme

**Use case:** Update brand colors across application without recreating theme from scratch.

### Filtering Components

Reduce CSS bundle size by including only used components:

1. Click **Filter** icon in Theme Studio
2. Select components (e.g., Button, Grid, Dropdown)
3. Click **Apply**
4. Download filtered theme (smaller CSS file)

**Example:** If app only uses Button, Grid, and Calendar, filter to those components instead of downloading full theme CSS (~300KB+ reduction).
