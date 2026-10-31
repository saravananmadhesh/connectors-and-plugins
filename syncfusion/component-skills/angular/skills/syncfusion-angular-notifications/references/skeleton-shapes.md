# Shapes in Skeleton Component

## Table of Contents
- [Overview](#overview)
- [Circle Shape](#circle-shape)
- [Square Shape](#square-shape)
- [Rectangle Shape](#rectangle-shape)
- [Text Shape](#text-shape)
- [Building Complex Layouts](#building-complex-layouts)
- [Responsive Shapes](#responsive-shapes)

## Overview

The Skeleton component supports four built-in shape variants to design layouts of any page. Use the `shape` property to create previews of different content types. Each shape serves a specific purpose in your skeleton layout.

**Available shapes:**
- `Text` (default) - For text content and paragraphs
- `Circle` - For avatars and profile pictures
- `Square` - For small thumbnails and icons
- `Rectangle` - For images, cards, and large content blocks

## Circle Shape

Circle shapes are ideal for displaying avatars, profile pictures, and thumbnail images.

### Basic Circle Skeleton

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-circle-skeleton',
  template: `<ejs-skeleton shape="Circle" width="48px"></ejs-skeleton>`
})
export class CircleSkeletonComponent {}
```

**Key points for Circle:**
- Set `width` property to define diameter
- `height` is not needed (uses width for both dimensions)
- Commonly used sizes: 32px (small), 48px (medium), 64px (large)

### Circle Sizes

```typescript
// Small avatar (user in list)
<ejs-skeleton shape="Circle" width="32px"></ejs-skeleton>

// Medium avatar (card header)
<ejs-skeleton shape="Circle" width="48px"></ejs-skeleton>

// Large avatar (profile page)
<ejs-skeleton shape="Circle" width="80px"></ejs-skeleton>
```

## Square Shape

Square shapes are ideal for thumbnails, icons, and small image placeholders.

### Basic Square Skeleton

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-square-skeleton',
  template: `<ejs-skeleton shape="Square" width="48px"></ejs-skeleton>`
})
export class SquareSkeletonComponent {}
```

**Key points for Square:**
- Set `width` property to define dimensions
- `height` is not needed (uses width for both dimensions)
- Useful for icon placeholders and thumbnail grids

### Square Sizes

```typescript
// Small icon
<ejs-skeleton shape="Square" width="24px"></ejs-skeleton>

// Medium thumbnail
<ejs-skeleton shape="Square" width="48px"></ejs-skeleton>

// Large thumbnail
<ejs-skeleton shape="Square" width="100px"></ejs-skeleton>
```

## Rectangle Shape

Rectangle shapes are perfect for images, cards, and large content blocks.

### Basic Rectangle Skeleton

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-rectangle-skeleton',
  template: `<ejs-skeleton shape="Rectangle" width="50px" height="25px"></ejs-skeleton>`
})
export class RectangleSkeletonComponent {}
```

**Key points for Rectangle:**
- Requires both `width` and `height` properties
- Use percentage for responsive widths: `width="100%"`
- Common for banner images and content blocks

### Rectangle Dimensions

```typescript
// Horizontal banner (aspect ratio 16:9)
<ejs-skeleton shape="Rectangle" width="100%" height="225px"></ejs-skeleton>

// Square image
<ejs-skeleton shape="Rectangle" width="200px" height="200px"></ejs-skeleton>

// Vertical image (portrait)
<ejs-skeleton shape="Rectangle" width="150px" height="300px"></ejs-skeleton>

// Thumbnail
<ejs-skeleton shape="Rectangle" width="80px" height="80px"></ejs-skeleton>
```

## Text Shape

Text shapes are used for text content, paragraphs, and paragraph lines.

### Basic Text Skeleton

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-text-skeleton',
  template: `<ejs-skeleton shape="Text" width="50%" height="15px"></ejs-skeleton>`
})
export class TextSkeletonComponent {}
```

**Key points for Text:**
- Use percentage for `width` to make it flexible
- Set small `height` values (12-16px) to match text line height
- Default shape when no `shape` property is specified

### Text Variations

```typescript
// Full width paragraph
<ejs-skeleton width="100%" height="15px"></ejs-skeleton>

// Heading
<ejs-skeleton width="40%" height="20px"></ejs-skeleton>

// Partial paragraph (second line)
<ejs-skeleton width="75%" height="15px"></ejs-skeleton>

// Small text
<ejs-skeleton width="30%" height="12px"></ejs-skeleton>
```

## Building Complex Layouts

Combine different shapes to create realistic skeleton layouts that match your actual content.

### Profile Card Layout

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-profile-skeleton',
  template: `
    <div id="skeletonCard" class="profile-card">
      <!-- Avatar -->
      <div class="cardProfile">
        <ejs-skeleton id="cardProfile" shape="Circle" width="60px"></ejs-skeleton>
      </div>
      
      <!-- Profile Info -->
      <div class="cardinfo">
        <ejs-skeleton id="text1" width="30%" height="15px"></ejs-skeleton><br/>
        <ejs-skeleton id="text2" width="15%" height="15px"></ejs-skeleton>
      </div>
      
      <!-- Image -->
      <div class="cardContent">
        <ejs-skeleton id="cardImage" shape="Rectangle" width="100%" height="150px"></ejs-skeleton>
      </div>
      
      <!-- Actions -->
      <div class="cardoptions">
        <ejs-skeleton id="rightOption" shape="Rectangle" width="20%" height="32px"></ejs-skeleton>
        <ejs-skeleton id="leftOption" shape="Rectangle" width="20%" height="32px"></ejs-skeleton>
      </div>
    </div>
  `,
  styles: [`
    .profile-card { padding: 16px; }
    .cardProfile { margin-bottom: 12px; }
    .cardinfo { margin-bottom: 12px; }
    .cardContent { margin-bottom: 12px; }
    .cardoptions { display: flex; gap: 8px; }
  `]
})
export class ProfileSkeletonComponent {}
```

### List Item Layout

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { NgFor } from '@angular/common';

@Component({
  imports: [SkeletonModule, NgFor],
  standalone: true,
  selector: 'app-list-skeleton',
  template: `
    <div class="list-skeleton">
      <div class="list-item" *ngFor="let item of [1,2,3,4,5]">
        <div class="item-avatar">
          <ejs-skeleton shape="Circle" width="40px"></ejs-skeleton>
        </div>
        <div class="item-content">
          <ejs-skeleton width="60%" height="14px"></ejs-skeleton>
          <ejs-skeleton width="40%" height="12px"></ejs-skeleton>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-item { display: flex; gap: 12px; margin-bottom: 16px; }
    .item-avatar { flex-shrink: 0; }
    .item-content { flex: 1; }
  `]
})
export class ListSkeletonComponent {}
```

### Article Header Layout

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-article-skeleton',
  template: `
    <div class="article-skeleton">
      <!-- Featured Image -->
      <ejs-skeleton shape="Rectangle" width="100%" height="300px"></ejs-skeleton>
      
      <!-- Title -->
      <div class="skeleton-spacing">
        <ejs-skeleton width="80%" height="24px"></ejs-skeleton>
      </div>
      
      <!-- Meta Info -->
      <div class="skeleton-spacing">
        <ejs-skeleton width="40%" height="12px"></ejs-skeleton>
      </div>
      
      <!-- Paragraph 1 -->
      <div class="skeleton-paragraph">
        <ejs-skeleton width="100%" height="12px"></ejs-skeleton>
        <ejs-skeleton width="100%" height="12px"></ejs-skeleton>
        <ejs-skeleton width="85%" height="12px"></ejs-skeleton>
      </div>
      
      <!-- Paragraph 2 -->
      <div class="skeleton-paragraph">
        <ejs-skeleton width="100%" height="12px"></ejs-skeleton>
        <ejs-skeleton width="100%" height="12px"></ejs-skeleton>
        <ejs-skeleton width="75%" height="12px"></ejs-skeleton>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-spacing { margin: 12px 0; }
    .skeleton-paragraph { margin: 16px 0; }
    ejs-skeleton { display: block; margin-bottom: 4px; }
  `]
})
export class ArticleSkeletonComponent {}
```

## Responsive Shapes

Use percentage-based widths to make shapes responsive to container changes.

### Responsive Grid Layout

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { NgFor } from '@angular/common';

@Component({
  imports: [SkeletonModule, NgFor],
  standalone: true,
  selector: 'app-responsive-grid',
  template: `
    <div class="grid-container">
      <div class="grid-item" *ngFor="let item of [1,2,3,4,5,6]">
        <!-- Square image -->
        <ejs-skeleton shape="Rectangle" width="100%" height="0" 
                      [style.paddingBottom]="'100%'"></ejs-skeleton>
        
        <!-- Title -->
        <div class="skeleton-content">
          <ejs-skeleton width="80%" height="16px"></ejs-skeleton>
          <ejs-skeleton width="60%" height="12px"></ejs-skeleton>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .grid-container { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .grid-item { position: relative; }
    .skeleton-content { padding: 8px 0; }
  `]
})
export class ResponsiveGridComponent {}
```

### Mobile-First Responsive

```typescript
// Mobile: single column
<div class="skeleton-container" [ngClass]="{'mobile': isMobile}">
  <ejs-skeleton width="100%" height="200px"></ejs-skeleton>
</div>

// Desktop: adjust height
<ejs-skeleton width="100%" [height]="isDesktop ? '400px' : '200px'"></ejs-skeleton>
```

