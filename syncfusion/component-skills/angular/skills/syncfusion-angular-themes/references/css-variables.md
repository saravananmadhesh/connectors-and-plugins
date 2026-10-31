# CSS Variables for Theme Customization

## Table of Contents
- [Overview](#overview)
- [CSS Variable Structure](#css-variable-structure)
- [Accessing Theme Variables](#accessing-theme-variables)
- [Color Customization](#color-customization)

## Overview

Syncfusion Angular themes leverage CSS variables (custom properties) for dynamic color customization. CSS variables enable reusable values across stylesheets and support runtime modifications via TypeScript for interactive or context-aware styling.

**Key advantages:**
- Dynamic runtime color changes without rebuilding
- Consistent styling across all components
- Easy theme customization without modifying theme files
- Support for user preference-based color schemes

**Supported themes:**
- Material 3 (RGB format)
- Fluent 2 (Hex format)
- Bootstrap 5.3 (Hex format)
- Tailwind 3.4 (Hex format)

## CSS Variable Structure

### Material 3 Theme (RGB Format)

Material 3 uses **RGB values** (comma-separated, no `rgb()` wrapper):

```css
:root {
  --color-sf-primary: 98, 0, 238;           /* Primary brand color */
  --color-sf-on-primary: 255, 255, 255;     /* Text on primary */
  --color-sf-surface: 255, 251, 255;        /* Background */
}

.e-dark-mode {
  --color-sf-primary: 208, 188, 255;
  --color-sf-surface: 28, 27, 31;
}
```

**⚠️ Important:** Material 3 requires RGB format. Using hex values will produce inconsistent results.

### Fluent 2 / Bootstrap 5.3 / Tailwind 3.4 (Hex Format)

These themes use standard **hex color values**:

```css
/* Fluent 2 */
:root {
  --color-sf-primary: #0078d4;
  --color-sf-neutral-background1: #ffffff;
}

/* Bootstrap 5.3 */
:root {
  --bs-primary: #0d6efd;
  --bs-body-bg: #ffffff;
}

/* Tailwind 3.4 */
:root {
  --tw-primary: #3b82f6;
}
```

## Accessing Theme Variables

### In CSS Files

Use the `var()` function to reference CSS variables:

```css
.custom-button {
  /* Material 3 - RGB format requires rgb() wrapper */
  background-color: rgb(var(--color-sf-primary));
  color: rgb(var(--color-sf-on-primary));
  border: 1px solid rgb(var(--color-sf-primary));
}

.custom-card {
  /* Fluent 2/Bootstrap/Tailwind - direct hex usage */
  background-color: var(--color-sf-neutral-background1);
  border-color: var(--color-sf-stroke-accessible);
  color: var(--color-sf-neutral-foreground1);
}

.custom-alert {
  /* Bootstrap 5.3 - Using semantic color variables */
  background-color: var(--bs-warning);
  color: var(--bs-dark);
  border: 1px solid var(--bs-warning);
}

.custom-badge {
  /* Tailwind 3.4 - Using utility colors */
  background-color: var(--tw-primary);
  color: var(--tw-gray-50);
}
```

## Color Customization

### Material 3 (RGB Format)

```css
/* src/styles.css */
.custom-theme {
  --color-sf-primary: 255, 87, 34;          /* Deep Orange RGB */
  --color-sf-on-primary: 255, 255, 255;
}
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="custom-theme">
      <ejs-button isPrimary="true">Custom Primary</ejs-button>
    </div>
  `,
  styles: [`
    @import '@syncfusion/ej2-angular-buttons/styles/material3.css';
  `]
})
export class AppComponent { }
```

### Fluent 2 (Hex Format)

```css
/* src/styles.css */
.custom-fluent {
  --color-sf-primary: #0078d4;
  --color-sf-primary-hover: #106ebe;
  --color-sf-primary-active: #005a9e;
}
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="custom-fluent">
      <ejs-button isPrimary="true">Custom Primary</ejs-button>
    </div>
  `,
  styles: [`
    @import '@syncfusion/ej2-angular-buttons/styles/fluent2.css';
  `]
})
export class AppComponent { }
```

### Bootstrap 5.3 (Hex Format)

```css
.custom-bootstrap {
  --bs-primary: #6f42c1;
  --bs-primary-rgb: 111, 66, 193;
}
```

### Tailwind 3.4 (Hex Format)

```css
.custom-tailwind {
  --tw-primary: #8b5cf6;
  --tw-primary-dark: #7c3aed;
}
```

### Runtime Color Modification with TypeScript

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <input type="color" (change)="changePrimaryColor($event)" value="#6200ee" />
      <ejs-button isPrimary="true">Dynamic Color Button</ejs-button>
    </div>
  `
})
export class AppComponent {
  changePrimaryColor(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    
    // Convert hex to RGB for Material 3
    const rgb = this.hexToRgb(color);
    
    // Set CSS variable
    document.documentElement.style.setProperty(
      '--color-sf-primary', 
      `${rgb.r}, ${rgb.g}, ${rgb.b}`
    );
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }
}
```
