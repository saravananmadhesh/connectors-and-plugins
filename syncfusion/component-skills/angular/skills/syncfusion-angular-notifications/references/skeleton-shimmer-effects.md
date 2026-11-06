# Shimmer Effects and Animation

## Table of Contents
- [Overview](#overview)
- [Wave Effect](#wave-effect)
- [Pulse Effect](#pulse-effect)
- [Fade Effect](#fade-effect)
- [Changing Effects Dynamically](#changing-effects-dynamically)
- [Performance Considerations](#performance-considerations)
- [Combining Effects](#combining-effects)

## Overview

The Skeleton component supports three animation effects using the `shimmerEffect` property. These effects give visual feedback to users that content is loading and create a more polished experience.

**Available effects:**
- `Wave` (default) - Horizontal wave animation across the skeleton
- `Pulse` - Fade in and out animation (opacity change)
- `Fade` - Smooth opacity transition effect

## Wave Effect

The Wave effect creates a horizontal shimmering animation that moves across the skeleton from left to right. This is the default effect and provides a smooth, engaging loading experience.

### Basic Wave Effect

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-wave-skeleton',
  template: `
    <ejs-skeleton shape="Circle" width="60px" shimmerEffect="Wave"></ejs-skeleton>
  `
})
export class WaveSkeletonComponent {}
```

### Wave Effect Examples

```typescript
// Explicit wave effect (same as default)
<ejs-skeleton width="100%" height="15px" shimmerEffect="Wave"></ejs-skeleton>

// Circle with wave
<ejs-skeleton shape="Circle" width="50px" shimmerEffect="Wave"></ejs-skeleton>

// Rectangle with wave
<ejs-skeleton shape="Rectangle" width="200px" height="150px" shimmerEffect="Wave"></ejs-skeleton>

// Text paragraph with wave
<ejs-skeleton width="80%" height="12px" shimmerEffect="Wave"></ejs-skeleton>
```

### When to Use Wave

- Default choice for most loading states
- Best for card layouts and product grids
- Provides clear visual indication of loading
- Works well on light backgrounds
- Most commonly used effect

## Pulse Effect

The Pulse effect creates a fade in/out animation, where the skeleton fades between full opacity and semi-transparent. This effect is subtle and works well for minimalist designs.

### Basic Pulse Effect

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-pulse-skeleton',
  template: `
    <ejs-skeleton shape="Circle" width="60px" shimmerEffect="Pulse"></ejs-skeleton>
  `
})
export class PulseSkeletonComponent {}
```

### Pulse Effect Examples

```typescript
// Text with pulse
<ejs-skeleton width="100%" height="15px" shimmerEffect="Pulse"></ejs-skeleton>

// Circle with pulse
<ejs-skeleton shape="Circle" width="50px" shimmerEffect="Pulse"></ejs-skeleton>

// Rectangle with pulse
<ejs-skeleton shape="Rectangle" width="200px" height="150px" shimmerEffect="Pulse"></ejs-skeleton>
```

### When to Use Pulse

- Minimalist or modern designs
- When you want subtle animation
- For accessibility-focused designs (less motion)
- Mobile applications (reduces battery usage)
- Dark mode interfaces

## Fade Effect

The Fade effect creates a smooth opacity transition, providing a gentle loading animation similar to pulse but with different timing.

### Basic Fade Effect

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-fade-skeleton',
  template: `
    <ejs-skeleton shape="Circle" width="60px" shimmerEffect="Fade"></ejs-skeleton>
  `
})
export class FadeSkeletonComponent {}
```

### Fade Effect Examples

```typescript
// Text with fade
<ejs-skeleton width="100%" height="15px" shimmerEffect="Fade"></ejs-skeleton>

// Circle with fade
<ejs-skeleton shape="Circle" width="50px" shimmerEffect="Fade"></ejs-skeleton>

// Rectangle with fade
<ejs-skeleton shape="Rectangle" width="200px" height="150px" shimmerEffect="Fade"></ejs-skeleton>
```

### When to Use Fade

- Elegant, sophisticated designs
- When you want smooth transitions
- For content-heavy interfaces
- Accessibility-conscious designs
- Desktop applications

## Changing Effects Dynamically

You can change the shimmer effect based on user preferences, theme, or application state.

### Property Binding

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { NgIf } from '@angular/common';

@Component({
  imports: [SkeletonModule, NgIf],
  standalone: true,
  selector: 'app-dynamic-effect',
  template: `
    <div>
      <button (click)="toggleEffect()">Switch Effect</button>
      <p>Current effect: {{ currentEffect }}</p>
      
      <ejs-skeleton 
        shape="Circle" 
        width="60px" 
        [shimmerEffect]="currentEffect">
      </ejs-skeleton>
    </div>
  `
})
export class DynamicEffectComponent {
  currentEffect: 'Wave' | 'Pulse' | 'Fade' = 'Wave';
  
  toggleEffect() {
    const effects: Array<'Wave' | 'Pulse' | 'Fade'> = ['Wave', 'Pulse', 'Fade'];
    const currentIndex = effects.indexOf(this.currentEffect);
    this.currentEffect = effects[(currentIndex + 1) % effects.length];
  }
}
```

### Theme-Based Effect Selection

```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-theme-effect',
  template: `
    <ejs-skeleton 
      shape="Circle" 
      width="60px" 
      [shimmerEffect]="getEffectForTheme()">
    </ejs-skeleton>
  `
})
export class ThemeEffectComponent {
  private isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  getEffectForTheme(): 'Wave' | 'Pulse' | 'Fade' {
    // Reduce motion animation for dark mode
    return this.isDarkMode ? 'Pulse' : 'Wave';
  }
}
```

### Accessibility-Aware Effect

```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-accessible-effect',
  template: `
    <ejs-skeleton 
      shape="Circle" 
      width="60px" 
      [shimmerEffect]="getAccessibleEffect()">
    </ejs-skeleton>
  `
})
export class AccessibleEffectComponent {
  private prefersReducedMotion = 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  getAccessibleEffect(): 'Wave' | 'Pulse' | 'Fade' {
    // Use subtle effect if user prefers reduced motion
    return this.prefersReducedMotion ? 'Fade' : 'Wave';
  }
}
```

## Performance Considerations

### Multiple Skeletons

When using multiple skeleton components, animation performance can be affected. Consider these optimization strategies:

**Limit animated skeletons:**

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { NgFor } from '@angular/common';

@Component({
  imports: [SkeletonModule, NgFor],
  standalone: true,
  selector: 'app-optimized-list',
  template: `
    <div class="list-skeleton">
      <div class="list-item" *ngFor="let item of [1,2,3,4,5]; let i = index">
        <!-- Only animate first 3 items -->
        <ejs-skeleton 
          shape="Circle" 
          width="40px" 
          [shimmerEffect]="i < 3 ? 'Wave' : 'Pulse'">
        </ejs-skeleton>
        <div class="item-content">
          <ejs-skeleton 
            width="60%" 
            height="14px"
            [shimmerEffect]="i < 3 ? 'Wave' : 'Pulse'">
          </ejs-skeleton>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-item { display: flex; gap: 12px; margin-bottom: 16px; }
  `]
})
export class OptimizedListComponent {}
```

**Use lighter effects for large lists:**

```typescript
// For large lists, use Fade instead of Wave (lighter animation)
<div *ngFor="let item of manyItems">
  <ejs-skeleton 
    width="100%" 
    height="12px"
    shimmerEffect="Fade">
  </ejs-skeleton>
</div>
```

### Mobile Performance

On mobile devices, prefer lighter effects to reduce battery usage:

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-mobile-skeleton',
  template: `
    <ejs-skeleton 
      shape="Circle" 
      width="60px"
      [shimmerEffect]="isMobile ? 'Pulse' : 'Wave'">
    </ejs-skeleton>
  `
})
export class MobileSkeletonComponent {
  isMobile = window.innerWidth < 768;
  
  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }
}
```

## Combining Effects

Use different effects in the same layout for visual hierarchy:

### Hierarchy-Based Effects

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-hierarchy-effects',
  template: `
    <div class="card-skeleton">
      <!-- Primary content: Wave effect -->
      <ejs-skeleton 
        shape="Rectangle" 
        width="100%" 
        height="200px"
        shimmerEffect="Wave">
      </ejs-skeleton>
      
      <!-- Secondary content: Pulse effect -->
      <div class="secondary">
        <ejs-skeleton 
          width="70%" 
          height="16px"
          shimmerEffect="Pulse">
        </ejs-skeleton>
        <ejs-skeleton 
          width="50%" 
          height="14px"
          shimmerEffect="Pulse">
        </ejs-skeleton>
      </div>
      
      <!-- Tertiary content: Fade effect -->
      <div class="tertiary">
        <ejs-skeleton 
          width="30%" 
          height="12px"
          shimmerEffect="Fade">
        </ejs-skeleton>
      </div>
    </div>
  `,
  styles: [`
    .secondary { margin-top: 12px; }
    .tertiary { margin-top: 8px; }
  `]
})
export class HierarchyEffectsComponent {}
```

### Effect Transitions

```typescript
// Gradually transition between effects as content loads
export class ProgressiveSkeletonComponent implements OnInit {
  effects: Array<'Wave' | 'Pulse' | 'Fade'> = ['Wave'];
  
  ngOnInit() {
    setTimeout(() => this.effects.push('Pulse'), 500);
    setTimeout(() => this.effects.push('Fade'), 1000);
  }
}
```

