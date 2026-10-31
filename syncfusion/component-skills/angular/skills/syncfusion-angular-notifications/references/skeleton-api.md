# API Reference

## Table of Contents
- [Overview](#overview)
- [Properties](#properties)
- [Methods](#methods)
- [Type Definitions](#type-definitions)
- [Examples by Property](#examples-by-property)

## Overview

The Skeleton component provides a comprehensive API for creating loading placeholders. This reference covers all properties, methods, type definitions, and usage examples.

## Properties

All properties can be bound using property binding syntax `[property]="value"` in Angular templates.

### cssClass

**Type:** `string`  
**Default:** `""`

Defines single or multiple CSS classes (separated by space) to be used for customization of the Skeleton component.

**Usage:**
```typescript
<ejs-skeleton cssClass="e-customize custom-skeleton"></ejs-skeleton>
```

**Example:**
```typescript
@Component({
  template: `
    <ejs-skeleton 
      width="100%" 
      height="100px"
      cssClass="custom-wave light-theme">
    </ejs-skeleton>
  `,
  styles: [`
    :global(.custom-wave) {
      background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    }
    :global(.light-theme) {
      background-color: #f5f5f5;
    }
  `]
})
export class CustomSkeletonComponent {}
```

### enablePersistence

**Type:** `boolean`  
**Default:** `false`

Enable or disable persisting component's state between page reloads. When enabled, the component state is stored in browser storage and restored on page reload.

**Usage:**
```typescript
<ejs-skeleton [enablePersistence]="true"></ejs-skeleton>
```

**Example:**
```typescript
@Component({
  template: `
    <ejs-skeleton 
      width="100%" 
      height="50px"
      [enablePersistence]="true">
    </ejs-skeleton>
  `
})
export class PersistentSkeletonComponent {}
```

### enableRtl

**Type:** `boolean`  
**Default:** `false`

Enable or disable rendering component in right-to-left (RTL) direction. Automatically handles layout mirroring for RTL languages like Arabic, Hebrew, and Persian.

**Usage:**
```typescript
<ejs-skeleton [enableRtl]="true"></ejs-skeleton>
```

**Example:**
```typescript
@Component({
  template: `
    <div [dir]="direction">
      <ejs-skeleton 
        width="100%" 
        height="100px"
        [enableRtl]="isRtl">
      </ejs-skeleton>
    </div>
  `
})
export class RtlSkeletonComponent {
  direction: 'ltr' | 'rtl' = 'rtl';
  isRtl = true;
}
```

### height

**Type:** `string | number`  
**Default:** `""`

Defines the height of the Skeleton component. Height is not required when shape is "Circle" or "Square" (they use width for both dimensions). Can be specified in pixels, percentages, or other CSS units.

**Usage:**
```typescript
<ejs-skeleton height="100px"></ejs-skeleton>
<ejs-skeleton height="50%"></ejs-skeleton>
<ejs-skeleton [height]="200"></ejs-skeleton>
```

**Example:**
```typescript
@Component({
  template: `
    <!-- Fixed height in pixels -->
    <ejs-skeleton width="100%" height="100px"></ejs-skeleton>
    
    <!-- Percentage height -->
    <ejs-skeleton width="80%" height="50%"></ejs-skeleton>
    
    <!-- Dynamic height -->
    <ejs-skeleton 
      width="100%" 
      [height]="dynamicHeight">
    </ejs-skeleton>
  `
})
export class HeightSkeletonComponent {
  dynamicHeight = 150;
}
```

### label

**Type:** `string`  
**Default:** `"Loading…"`

Defines the 'aria-label' for Skeleton component accessibility. This text is read by screen readers to describe the loading state to users with visual impairments.

**Usage:**
```typescript
<ejs-skeleton label="Loading content, please wait..."></ejs-skeleton>
```

**Example:**
```typescript
@Component({
  template: `
    <ejs-skeleton 
      shape="Circle" 
      width="50px"
      label="User profile photo loading">
    </ejs-skeleton>
    
    <ejs-skeleton 
      width="100%" 
      height="150px"
      label="Featured image placeholder">
    </ejs-skeleton>
    
    <ejs-skeleton 
      width="80%" 
      height="15px"
      label="Article title loading">
    </ejs-skeleton>
  `
})
export class AccessibleSkeletonComponent {}
```

### locale

**Type:** `string`  
**Default:** `''` (uses global culture)

Overrides the global culture and localization value for this component. Default global culture is 'en-US'. Allows you to use different locale-specific settings.

**Usage:**
```typescript
<ejs-skeleton locale="ar"></ejs-skeleton>
<ejs-skeleton locale="zh"></ejs-skeleton>
```

**Example:**
```typescript
@Component({
  template: `
    <!-- Uses component-specific locale -->
    <ejs-skeleton width="100%" height="50px" locale="de"></ejs-skeleton>
    
    <!-- Uses global locale -->
    <ejs-skeleton width="100%" height="50px"></ejs-skeleton>
  `
})
export class LocaleSkeletonComponent {}
```

### shape

**Type:** `string | SkeletonType`  
**Default:** `SkeletonType.Text`

Defines the shape of the Skeleton component. Supported shapes are used to match the layout of different content types.

**Supported shapes:**
- `Text` (default) - For text content and paragraphs
- `Circle` - For avatars and profile pictures
- `Square` - For thumbnails and icons
- `Rectangle` - For images and cards

**Usage:**
```typescript
<ejs-skeleton shape="Text"></ejs-skeleton>
<ejs-skeleton shape="Circle" width="50px"></ejs-skeleton>
<ejs-skeleton shape="Square" width="48px"></ejs-skeleton>
<ejs-skeleton shape="Rectangle" width="200px" height="150px"></ejs-skeleton>

<!-- Using enum -->
<ejs-skeleton [shape]="shapeType"></ejs-skeleton>
```

**Example:**
```typescript
import { Component } from '@angular/core';
import { SkeletonType } from '@syncfusion/ej2-angular-notifications';

@Component({
  template: `
    <!-- Text skeleton (default) -->
    <ejs-skeleton width="80%" height="15px"></ejs-skeleton>
    
    <!-- Circle skeleton -->
    <ejs-skeleton shape="Circle" width="50px"></ejs-skeleton>
    
    <!-- Square skeleton -->
    <ejs-skeleton shape="Square" width="48px"></ejs-skeleton>
    
    <!-- Rectangle skeleton -->
    <ejs-skeleton shape="Rectangle" width="100%" height="200px"></ejs-skeleton>
    
    <!-- Dynamic shape -->
    <ejs-skeleton [shape]="currentShape" width="100px"></ejs-skeleton>
  `
})
export class ShapeSkeletonComponent {
  currentShape: SkeletonType = 'Circle';
  
  changeShape(newShape: SkeletonType) {
    this.currentShape = newShape;
  }
}
```

### shimmerEffect

**Type:** `string | ShimmerEffect`  
**Default:** `ShimmerEffect.Wave`

Defines the animation effect of the Skeleton component. Supported effects create different visual animations to indicate loading state.

**Supported effects:**
- `Wave` (default) - Horizontal wave animation
- `Pulse` - Fade in/out animation
- `Fade` - Smooth opacity transition

**Usage:**
```typescript
<ejs-skeleton shimmerEffect="Wave"></ejs-skeleton>
<ejs-skeleton shimmerEffect="Pulse"></ejs-skeleton>
<ejs-skeleton shimmerEffect="Fade"></ejs-skeleton>

<!-- Using enum -->
<ejs-skeleton [shimmerEffect]="effectType"></ejs-skeleton>
```

**Example:**
```typescript
import { Component } from '@angular/core';
import { ShimmerEffect } from '@syncfusion/ej2-angular-notifications';

@Component({
  template: `
    <!-- Wave effect (default) -->
    <ejs-skeleton width="100%" height="50px" shimmerEffect="Wave"></ejs-skeleton>
    
    <!-- Pulse effect -->
    <ejs-skeleton width="100%" height="50px" shimmerEffect="Pulse"></ejs-skeleton>
    
    <!-- Fade effect -->
    <ejs-skeleton width="100%" height="50px" shimmerEffect="Fade"></ejs-skeleton>
    
    <!-- Dynamic effect -->
    <ejs-skeleton 
      width="100%" 
      height="50px"
      [shimmerEffect]="currentEffect">
    </ejs-skeleton>
  `
})
export class ShimmerEffectComponent {
  currentEffect: ShimmerEffect = 'Wave';
  
  changeEffect(newEffect: ShimmerEffect) {
    this.currentEffect = newEffect;
  }
}
```

### visible

**Type:** `boolean`  
**Default:** `true`

Defines the visibility state of Skeleton component. Set to `false` to hide the skeleton, typically when content has finished loading.

**Usage:**
```typescript
<ejs-skeleton [visible]="isLoading"></ejs-skeleton>
<ejs-skeleton [visible]="!isContentReady"></ejs-skeleton>
```

**Example:**
```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { NgIf } from '@angular/common';

@Component({
  imports: [SkeletonModule, NgIf],
  template: `
    <!-- Show skeleton while loading -->
    <div *ngIf="isLoading">
      <ejs-skeleton 
        width="100%" 
        height="200px"
        [visible]="isLoading">
      </ejs-skeleton>
    </div>
    
    <!-- Show content when loaded -->
    <div *ngIf="!isLoading">
      <img [src]="imageUrl" alt="Content">
    </div>
  `
})
export class VisibleSkeletonComponent implements OnInit {
  isLoading = true;
  imageUrl = '';
  
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.imageUrl = 'assets/image.jpg';
    }, 2000);
  }
}
```

### width

**Type:** `string | number`  
**Default:** `""`

Defines the width of the Skeleton component. Width will be prioritized and used as dimension when shape is "Circle" or "Square". Can be specified in pixels, percentages, or other CSS units.

**Usage:**
```typescript
<ejs-skeleton width="100px"></ejs-skeleton>
<ejs-skeleton width="100%"></ejs-skeleton>
<ejs-skeleton width="50vw"></ejs-skeleton>
<ejs-skeleton [width]="dynamicWidth"></ejs-skeleton>
```

**Example:**
```typescript
@Component({
  template: `
    <!-- Fixed width in pixels -->
    <ejs-skeleton width="200px" height="100px"></ejs-skeleton>
    
    <!-- Percentage width -->
    <ejs-skeleton width="100%" height="100px"></ejs-skeleton>
    
    <!-- Viewport width -->
    <ejs-skeleton width="50vw" height="100px"></ejs-skeleton>
    
    <!-- Dynamic width -->
    <ejs-skeleton 
      [width]="containerWidth" 
      height="100px">
    </ejs-skeleton>
  `
})
export class WidthSkeletonComponent {
  containerWidth = '75%';
  
  updateWidth(newWidth: string) {
    this.containerWidth = newWidth;
  }
}
```

## Methods

### destroy

**Signature:** `destroy(): void`

Destroys the Skeleton component instance, removing it from the DOM and cleaning up event listeners and resources.

**Usage:**
```typescript
@Component({
  template: `
    <ejs-skeleton #skeleton width="100%" height="50px"></ejs-skeleton>
    <button (click)="destroySkeleton()">Destroy</button>
  `
})
export class DestroySkeletonComponent {
  @ViewChild('skeleton') skeletonComponent!: any;
  
  destroySkeleton() {
    if (this.skeletonComponent) {
      this.skeletonComponent.destroy();
    }
  }
}
```

## Type Definitions

### SkeletonType

Enum representing the shape types available for the Skeleton component.

```typescript
export type SkeletonType = 'Text' | 'Circle' | 'Square' | 'Rectangle';

// Or using enum
export enum SkeletonTypeEnum {
  Text = 'Text',
  Circle = 'Circle',
  Square = 'Square',
  Rectangle = 'Rectangle'
}
```

**Values:**
- `'Text'` - Default rectangular shape for text content
- `'Circle'` - Circular shape for avatars
- `'Square'` - Square shape for icons
- `'Rectangle'` - Rectangular shape for images

### ShimmerEffect

Enum representing the animation effect types available for the Skeleton component.

```typescript
export type ShimmerEffect = 'Wave' | 'Pulse' | 'Fade';

// Or using enum
export enum ShimmerEffectEnum {
  Wave = 'Wave',
  Pulse = 'Pulse',
  Fade = 'Fade'
}
```

**Values:**
- `'Wave'` - Horizontal wave animation (default)
- `'Pulse'` - Fade in/out animation
- `'Fade'` - Smooth opacity transition

## Examples by Property

### Complete Example: All Properties

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { SkeletonType, ShimmerEffect } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-complete-skeleton',
  template: `
    <div class="skeleton-examples">
      <!-- Text skeleton with all common properties -->
      <ejs-skeleton 
        width="100%" 
        height="15px"
        shape="Text"
        shimmerEffect="Wave"
        cssClass="custom-skeleton"
        label="Loading text content"
        [visible]="true"
        [enableRtl]="false"
        [enablePersistence]="false"
        locale="en-US">
      </ejs-skeleton>
      
      <!-- Circle skeleton -->
      <ejs-skeleton 
        shape="Circle"
        width="50px"
        shimmerEffect="Pulse"
        label="Loading profile picture"
        cssClass="avatar-skeleton">
      </ejs-skeleton>
      
      <!-- Square skeleton -->
      <ejs-skeleton 
        shape="Square"
        width="48px"
        shimmerEffect="Fade"
        label="Loading thumbnail"
        cssClass="thumbnail-skeleton">
      </ejs-skeleton>
      
      <!-- Rectangle skeleton -->
      <ejs-skeleton 
        shape="Rectangle"
        width="100%"
        height="200px"
        shimmerEffect="Wave"
        label="Loading image"
        cssClass="image-skeleton">
      </ejs-skeleton>
      
      <!-- Dynamic skeleton -->
      <ejs-skeleton 
        [width]="dynamicWidth"
        [height]="dynamicHeight"
        [shape]="currentShape"
        [shimmerEffect]="currentEffect"
        [visible]="isVisible"
        [cssClass]="dynamicClass">
      </ejs-skeleton>
    </div>
  `,
  styles: [`
    .skeleton-examples {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
    }
    
    :global(.custom-skeleton) {
      border-radius: 4px;
    }
    
    :global(.avatar-skeleton) {
      border-radius: 50%;
    }
  `]
})
export class CompleteSkeletonComponent {
  dynamicWidth = '100%';
  dynamicHeight = 100;
  currentShape: SkeletonType = 'Rectangle';
  currentEffect: ShimmerEffect = 'Wave';
  isVisible = true;
  dynamicClass = 'dynamic-skeleton';
}
```

### Loading State Example

```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { NgIf } from '@angular/common';

@Component({
  imports: [SkeletonModule, NgIf],
  template: `
    <!-- Loading state -->
    <div *ngIf="isLoading" class="loading-container">
      <ejs-skeleton shape="Circle" width="50px" shimmerEffect="Wave"></ejs-skeleton>
      <div class="loading-content">
        <ejs-skeleton width="60%" height="14px"></ejs-skeleton>
        <ejs-skeleton width="40%" height="12px"></ejs-skeleton>
      </div>
    </div>
    
    <!-- Loaded state -->
    <div *ngIf="!isLoading" class="loaded-container">
      <img [src]="userData.avatar" alt="User">
      <div>
        <h3>{{ userData.name }}</h3>
        <p>{{ userData.bio }}</p>
      </div>
    </div>
  `
})
export class LoadingStateComponent implements OnInit {
  isLoading = true;
  userData = { avatar: '', name: '', bio: '' };
  
  ngOnInit() {
    // Simulate API call
    setTimeout(() => {
      this.userData = {
        avatar: 'assets/avatar.jpg',
        name: 'John Doe',
        bio: 'Software Developer'
      };
      this.isLoading = false;
    }, 2000);
  }
}
```

