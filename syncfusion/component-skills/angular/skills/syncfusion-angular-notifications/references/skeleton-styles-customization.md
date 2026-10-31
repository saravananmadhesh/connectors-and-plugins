# Styling and Customization

## Table of Contents
- [Overview](#overview)
- [Using cssClass](#using-cssclass)
- [Custom Colors](#custom-colors)
- [Controlling Visibility](#controlling-visibility)
- [Dimensions and Sizing](#dimensions-and-sizing)
- [CSS Variables and Theming](#css-variables-and-theming)
- [Theme Studio Integration](#theme-studio-integration)
- [Advanced Styling Examples](#advanced-styling-examples)

## Overview

The Skeleton component provides multiple ways to customize its appearance:
- `cssClass` property for custom CSS classes
- `visible` property for conditional rendering
- Width and height properties for sizing
- CSS variables for theming
- Direct CSS customization

## Using cssClass

The `cssClass` property allows you to apply custom CSS classes to the Skeleton component for complete styling control.

### Basic cssClass Usage

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-custom-skeleton',
  template: `
    <ejs-skeleton shape="Circle" width="60px" cssClass="e-customize"></ejs-skeleton>
  `,
  styles: [`
    :global(.e-customize) {
      background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    }
  `]
})
export class CustomSkeletonComponent {}
```

### Multiple CSS Classes

```typescript
// Combine multiple classes
<ejs-skeleton 
  shape="Rectangle" 
  width="100%" 
  height="150px"
  cssClass="skeleton-primary skeleton-large">
</ejs-skeleton>
```

## Custom Colors

Customize the skeleton's wave color, background color, and gradient effects.

### Wave Color Customization

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-wave-color-skeleton',
  template: `
    <ejs-skeleton 
      shape="Rectangle" 
      width="100%" 
      height="100px"
      cssClass="custom-wave">
    </ejs-skeleton>
  `,
  styles: [`
    :global(.custom-wave) {
      background: linear-gradient(
        90deg,
        #c8e6ff 25%,
        #90caf9 50%,
        #c8e6ff 75%
      );
    }
  `]
})
export class WaveColorComponent {}
```

### Background Color

```typescript
// Light background
<ejs-skeleton 
  width="100%" 
  height="50px"
  cssClass="light-skeleton">
</ejs-skeleton>

// Dark background
<ejs-skeleton 
  width="100%" 
  height="50px"
  cssClass="dark-skeleton">
</ejs-skeleton>
```

**CSS for background colors:**

```css
.light-skeleton {
  background-color: #f5f5f5;
}

.dark-skeleton {
  background-color: #2a2a2a;
}

/* With gradient */
.gradient-skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
}
```

### Themed Colors

```typescript
// Primary color theme
<ejs-skeleton 
  width="100%" 
  height="50px"
  cssClass="primary-theme">
</ejs-skeleton>

// Success color theme
<ejs-skeleton 
  width="100%" 
  height="50px"
  cssClass="success-theme">
</ejs-skeleton>

// Warning color theme
<ejs-skeleton 
  width="100%" 
  height="50px"
  cssClass="warning-theme">
</ejs-skeleton>
```

**CSS for themed colors:**

```css
.primary-theme {
  background: linear-gradient(
    90deg,
    #e3f2fd 25%,
    #bbdefb 50%,
    #e3f2fd 75%
  );
}

.success-theme {
  background: linear-gradient(
    90deg,
    #e8f5e9 25%,
    #c8e6c9 50%,
    #e8f5e9 75%
  );
}

.warning-theme {
  background: linear-gradient(
    90deg,
    #fff3e0 25%,
    #ffe0b2 50%,
    #fff3e0 75%
  );
}
```

## Controlling Visibility

The `visible` property controls whether the skeleton is displayed. Use this for conditional rendering of loading states.

### Basic Visibility Control

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-visible-skeleton',
  template: `
    <ejs-skeleton 
      shape="Circle" 
      width="60px" 
      [visible]="isLoading">
    </ejs-skeleton>
  `
})
export class VisibleSkeletonComponent {
  isLoading = true;
}
```

### Conditional Rendering Pattern

```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { NgIf } from '@angular/common';

@Component({
  imports: [SkeletonModule, NgIf],
  standalone: true,
  selector: 'app-conditional-skeleton',
  template: `
    <!-- Show skeleton while loading -->
    <div *ngIf="isLoading">
      <ejs-skeleton shape="Rectangle" width="100%" height="200px"></ejs-skeleton>
    </div>
    
    <!-- Show content when loaded -->
    <div *ngIf="!isLoading">
      <img [src]="imageUrl" alt="Content">
    </div>
  `
})
export class ConditionalSkeletonComponent implements OnInit {
  isLoading = true;
  imageUrl = '';
  
  ngOnInit() {
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.imageUrl = 'assets/image.jpg';
    }, 2000);
  }
}
```

### Visibility Binding

```typescript
// Simple boolean binding
<ejs-skeleton width="100%" height="50px" [visible]="showSkeleton"></ejs-skeleton>

// Conditional visibility
<ejs-skeleton width="100%" height="50px" [visible]="!isDataLoaded"></ejs-skeleton>

// Negation binding
<ejs-skeleton width="100%" height="50px" [visible]="isLoading ? true : false"></ejs-skeleton>
```

### Hide Visibility

```typescript
// Explicitly hide
<ejs-skeleton 
  shape="Circle" 
  width="60px" 
  [visible]="false">
</ejs-skeleton>
```

## Dimensions and Sizing

Control the width and height of skeleton elements for precise layout matching.

> **Note:** For `Text` and `Rectangle` skeletons, when `width` is not set, the component applies `width: 100%` as an **inline** style on the host element. Because inline styles override most stylesheet rules, custom CSS widths may not take effect unless the `width` property is explicitly set.

### Fixed Dimensions

```typescript
// Circle with fixed width
<ejs-skeleton shape="Circle" width="60px"></ejs-skeleton>

// Square with fixed width
<ejs-skeleton shape="Square" width="48px"></ejs-skeleton>

// Rectangle with fixed dimensions
<ejs-skeleton shape="Rectangle" width="300px" height="150px"></ejs-skeleton>

// Text with fixed dimensions
<ejs-skeleton width="80%" height="15px"></ejs-skeleton>
```

### Responsive Dimensions

```typescript
// Full width
<ejs-skeleton width="100%" height="100px"></ejs-skeleton>

// Percentage width
<ejs-skeleton width="75%" height="50px"></ejs-skeleton>

// Viewport width
<ejs-skeleton width="50vw" height="100px"></ejs-skeleton>
```

### Dynamic Sizing

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-dynamic-size',
  template: `
    <ejs-skeleton 
      shape="Rectangle"
      [width]="skeletonWidth"
      [height]="skeletonHeight">
    </ejs-skeleton>
  `
})
export class DynamicSizeComponent {
  skeletonWidth: string | number = '100%';
  skeletonHeight: string | number = 200;
  
  // Change size based on viewport
  constructor() {
    window.addEventListener('resize', () => {
      this.skeletonWidth = window.innerWidth > 768 ? '100%' : '90%';
    });
  }
}
```

### Size by Content Type

```typescript
// Avatar skeleton
<ejs-skeleton shape="Circle" width="48px"></ejs-skeleton>

// Icon skeleton
<ejs-skeleton shape="Square" width="24px"></ejs-skeleton>

// Banner skeleton
<ejs-skeleton shape="Rectangle" width="100%" height="300px"></ejs-skeleton>

// Text line skeleton
<ejs-skeleton width="80%" height="16px"></ejs-skeleton>

// Paragraph skeleton
<div>
  <ejs-skeleton width="100%" height="14px"></ejs-skeleton>
  <ejs-skeleton width="100%" height="14px"></ejs-skeleton>
  <ejs-skeleton width="85%" height="14px"></ejs-skeleton>
</div>
```

## CSS Variables and Theming

Use CSS variables for consistent theming across multiple skeletons.

### Define CSS Variables

```css
:root {
  --skeleton-primary-color: #e0e0e0;
  --skeleton-wave-color: #f0f0f0;
  --skeleton-radius: 4px;
  --skeleton-animation-speed: 1.5s;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --skeleton-primary-color: #424242;
    --skeleton-wave-color: #616161;
  }
}
```

### Use CSS Variables in Components

```css
.skeleton-custom {
  background-color: var(--skeleton-primary-color);
  border-radius: var(--skeleton-radius);
}

.skeleton-wave-custom {
  background: linear-gradient(
    90deg,
    var(--skeleton-primary-color) 25%,
    var(--skeleton-wave-color) 50%,
    var(--skeleton-primary-color) 75%
  );
}
```

### Component-Level Variables

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-themed-skeleton',
  template: `
    <div class="themed-container">
      <ejs-skeleton width="100%" height="100px" cssClass="themed-skeleton"></ejs-skeleton>
    </div>
  `,
  styles: [`
    .themed-container {
      --skeleton-primary: #f0f0f0;
      --skeleton-wave: #e0e0e0;
    }
    
    :global(.themed-skeleton) {
      background: linear-gradient(
        90deg,
        var(--skeleton-primary) 25%,
        var(--skeleton-wave) 50%,
        var(--skeleton-primary) 75%
      );
    }
  `]
})
export class ThemedSkeletonComponent {}
```

## Theme Studio Integration

Customize themes using Theme Studio, then import them in your application.

### Using Theme Studio

1. Visit [Theme Studio](https://ej2.syncfusion.com/angular/documentation/appearance/theme-studio)
2. Select "Skeleton" component
3. Customize colors, sizing, and effects
4. Export the custom theme CSS
5. Import in your application

### Importing Custom Theme

```css
/* In styles.css */
@import 'path/to/custom-skeleton-theme.css';
```

### Applying Custom Theme

```typescript
@Component({
  imports: [SkeletonModule],
  standalone: true,
  template: `<ejs-skeleton width="100%" height="100px"></ejs-skeleton>`
})
export class CustomThemeComponent {}
```

## Advanced Styling Examples

### Skeleton with Border

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-bordered-skeleton',
  template: `
    <ejs-skeleton 
      width="100%" 
      height="150px"
      cssClass="bordered-skeleton">
    </ejs-skeleton>
  `,
  styles: [`
    :global(.bordered-skeleton) {
      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 16px;
    }
  `]
})
export class BorderedSkeletonComponent {}
```

### Skeleton with Box Shadow

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-shadow-skeleton',
  template: `
    <ejs-skeleton 
      width="300px" 
      height="200px"
      cssClass="shadow-skeleton">
    </ejs-skeleton>
  `,
  styles: [`
    :global(.shadow-skeleton) {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
  `]
})
export class ShadowSkeletonComponent {}
```

### Skeleton with Rounded Corners

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-rounded-skeleton',
  template: `
    <ejs-skeleton 
      width="200px" 
      height="200px"
      cssClass="rounded-skeleton">
    </ejs-skeleton>
  `,
  styles: [`
    :global(.rounded-skeleton) {
      border-radius: 16px;
      overflow: hidden;
    }
  `]
})
export class RoundedSkeletonComponent {}
```

### Skeleton with Animation Delay

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-staggered-skeleton',
  template: `
    <div class="staggered-list">
      <ejs-skeleton width="100%" height="50px" style="--delay: 0ms"></ejs-skeleton>
      <ejs-skeleton width="100%" height="50px" style="--delay: 100ms"></ejs-skeleton>
      <ejs-skeleton width="100%" height="50px" style="--delay: 200ms"></ejs-skeleton>
    </div>
  `,
  styles: [`
    :global(ejs-skeleton[style*="--delay"]) {
      animation-delay: var(--delay);
    }
  `]
})
export class StaggeredSkeletonComponent {}
```

### Responsive Card Skeleton

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-card-skeleton-custom',
  template: `
    <div class="card-skeleton-container">
      <ejs-skeleton shape="Circle" width="50px" cssClass="card-avatar"></ejs-skeleton>
      <div class="card-content">
        <ejs-skeleton width="60%" height="16px"></ejs-skeleton>
        <ejs-skeleton width="40%" height="14px"></ejs-skeleton>
      </div>
    </div>
  `,
  styles: [`
    .card-skeleton-container {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    :global(.card-avatar) {
      flex-shrink: 0;
    }
    
    .card-content {
      flex: 1;
    }
  `]
})
export class CardSkeletonCustomComponent {}
```

