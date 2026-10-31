# Horizontal Layout in Syncfusion Angular Cards

## Table of Contents
- [Horizontal Card Layout](#horizontal-card-layout)
- [Using e-card-horizontal Class](#using-e-card-horizontal-class)
- [Stacked Sections](#stacked-sections)
- [Element Positioning](#element-positioning)
- [Combining Images with Content](#combining-images-with-content)
- [Responsive Horizontal Layout](#responsive-horizontal-layout)
- [Complete Examples](#complete-examples)

---

## Horizontal Card Layout

By default, all card elements stack vertically following the natural DOM flow. Horizontal layout arranges elements **side-by-side** (left to right), creating more compact cards that are ideal for:

- **Product previews** with image and details
- **User profile cards** with avatar and information
- **Media listings** with thumbnail and metadata
- **Compact item cards** with icon and description

### Vertical vs Horizontal

**Default Vertical Layout:**

```html
<div class="e-card">
  <!-- Elements stack vertically -->
  <div class="e-card-image"></div>
  <div class="e-card-header"></div>
  <div class="e-card-content"></div>
</div>
```

**Horizontal Layout:**

```html
<div class="e-card e-card-horizontal">
  <!-- Elements arrange side-by-side -->
  <img src="image.jpg" alt="Image">
  <div class="e-card-stacked">
    <div class="e-card-header"></div>
    <div class="e-card-content"></div>
  </div>
</div>
```

---

## Using e-card-horizontal Class

### Basic Horizontal Setup

Add the `e-card-horizontal` class to the card root to enable horizontal layout:

```html
<div class="e-card e-card-horizontal">
  <img src="product.jpg" alt="Product" style="width: 200px; height: 200px;">
  <div>
    <div class="e-card-header">
      <div class="e-card-header-caption">
        <div class="e-card-header-title">Product Name</div>
      </div>
    </div>
    <div class="e-card-content">
      Product description goes here
    </div>
  </div>
</div>
```

### CSS for Horizontal Layout

```css
.e-card.e-card-horizontal {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.e-card.e-card-horizontal > * {
  flex-shrink: 0;
}

.e-card.e-card-horizontal img {
  object-fit: cover;
}
```

### Element Order

Elements in the HTML maintain their visual order:

```html
<!-- Image appears on left, content on right -->
<div class="e-card e-card-horizontal">
  <img src="left.jpg">
  <div class="content">Content</div>
</div>

<!-- Image appears on right, content on left -->
<div class="e-card e-card-horizontal">
  <div class="content">Content</div>
  <img src="right.jpg">
</div>
```

---

## Stacked Sections

The `e-card-stacked` class forces **vertical alignment** for specific sections within a horizontal layout, creating mixed layouts:

### Basic Stacked Usage

```html
<div class="e-card e-card-horizontal">
  <img src="image.jpg" alt="Image" style="width: 150px; height: 150px;">
  
  <div class="e-card-stacked">
    <!-- Everything inside this div stacks vertically -->
    <div class="e-card-header">
      <div class="e-card-header-caption">
        <div class="e-card-header-title">Title</div>
      </div>
    </div>
    <div class="e-card-content">Content</div>
  </div>
</div>
```

### CSS for Stacked Layout

```css
.e-card-stacked {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.e-card-stacked > * {
  margin: 0;
}
```

### Multiple Stacked Sections

```html
<div class="e-card e-card-horizontal">
  <div class="e-card-stacked">
    <div class="e-card-header">Header 1</div>
    <div class="e-card-content">Content 1</div>
  </div>
  
  <div class="e-card-stacked">
    <div class="e-card-header">Header 2</div>
    <div class="e-card-content">Content 2</div>
  </div>
</div>
```

---

## Element Positioning

### Image on Left (Default)

```html
<div class="e-card e-card-horizontal">
  <img src="image.jpg" alt="Left" style="width: 180px; height: 180px; object-fit: cover;">
  <div class="e-card-stacked">
    <div class="e-card-header">
      <div class="e-card-header-title">Title</div>
    </div>
    <div class="e-card-content">Description</div>
  </div>
</div>
```

### Image on Right

```html
<div class="e-card e-card-horizontal">
  <div class="e-card-stacked">
    <div class="e-card-header">
      <div class="e-card-header-title">Title</div>
    </div>
    <div class="e-card-content">Description</div>
  </div>
  <img src="image.jpg" alt="Right" style="width: 180px; height: 180px; object-fit: cover;">
</div>
```

### Image Sizing Options

```html
<!-- Small thumbnail -->
<img src="image.jpg" style="width: 80px; height: 80px; object-fit: cover;">

<!-- Medium size -->
<img src="image.jpg" style="width: 150px; height: 150px; object-fit: cover;">

<!-- Large image -->
<img src="image.jpg" style="width: 250px; height: 250px; object-fit: cover;">

<!-- Full height -->
<img src="image.jpg" style="width: auto; height: 100%; object-fit: cover;">
```

---

## Combining Images with Content

### Image + Header + Content Pattern (from utils)

```typescript
// horizontal-card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-card',
  standalone: true,
  template: `
    <div style="margin: 50px;display: flex;flex-direction: row;justify-content: center;">
      <div tabindex="0" class="e-card e-card-horizontal" style="width:400px">
        <img src="./Code.png" alt="Sample" style="height: 180px">
        <div class="e-card-stacked">
          <div class="e-card-header">
            <div class="e-card-header-caption">
              <div class="e-card-header-title">Philips Trimmer</div>
            </div>
          </div>
          <div class="e-card-content">
            Powered by the innovative DuraPower Technology which optimizes power consumption, Philips trimmers are designed to last longer
            than 4 ordinary trimmers.
          </div>
        </div>
      </div>
    </div>
  `
})
export class HorizontalCardComponent {}
```

### Image + Actions

```html
<div class="e-card e-card-horizontal">
  <img src="product.jpg" style="width: 140px; height: 140px; object-fit: cover;">
  <div class="e-card-stacked">
    <div class="e-card-header">
      <div class="e-card-header-title">Product</div>
    </div>
    <div class="e-card-content">Description</div>
    <div class="e-card-actions">
      <button class="e-card-btn">Add</button>
      <button class="e-card-btn">Share</button>
    </div>
  </div>
</div>
```

### Compact Horizontal Card

Minimal horizontal card with image, title, and single action:

```html
<div class="e-card e-card-horizontal" style="max-width: 350px;">
  <img src="icon.svg" style="width: 80px; height: 80px; object-fit: contain;">
  <div class="e-card-stacked">
    <div class="e-card-header">
      <div class="e-card-header-title" style="font-size: 16px;">Feature Name</div>
    </div>
    <div class="e-card-content" style="font-size: 13px;">Quick description</div>
  </div>
</div>
```

---

## Responsive Horizontal Layout

### Mobile to Desktop Adaptation

```css
/* Desktop: Horizontal layout */
@media (min-width: 768px) {
  .e-card.responsive-card {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }

  .e-card.responsive-card img {
    width: 200px;
    height: 200px;
  }
}

/* Mobile: Vertical layout */
@media (max-width: 767px) {
  .e-card.responsive-card {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .e-card.responsive-card img {
    width: 100%;
    height: auto;
  }
}
```

### Component with Responsive Layout

```typescript
// responsive-card.component.ts
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-responsive-card',
  standalone: true,
  template: `
    <div class="e-card" [class.e-card-horizontal]="isDesktop">
      <img src="product.jpg" alt="Product" style="width: 150px; height: 150px; object-fit: cover;">
      <div [class.e-card-stacked]="isDesktop">
        <div class="e-card-header">
          <div class="e-card-header-title">Responsive Card</div>
        </div>
        <div class="e-card-content">
          This card switches between horizontal (desktop) and vertical (mobile) layouts
        </div>
      </div>
    </div>
  `,
  styles: [`
    .e-card {
      max-width: 500px;
    }
  `]
})
export class ResponsiveCardComponent {
  isDesktop = window.innerWidth >= 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isDesktop = window.innerWidth >= 768;
  }
}
```

---

## Complete Examples

### Example 1: Product Card (Horizontal)

```typescript
// product-card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div class="product-container">
      <div class="e-card e-card-horizontal">
        <img src="assets/laptop.jpg" alt="Laptop" style="width: 180px; height: 180px; object-fit: cover; border-radius: 4px;">
        
        <div class="e-card-stacked" style="flex: 1;">
          <div class="e-card-header">
            <div class="e-card-header-caption">
              <div class="e-card-header-title">Premium Laptop</div>
              <div class="e-card-sub-title">Electronics • New Arrival</div>
            </div>
          </div>
          
          <div class="e-card-content">
            <p><strong>Price:</strong> $999.99</p>
            <p>High-performance laptop with latest processors and vibrant display.</p>
          </div>
          
          <div class="e-card-actions">
            <button class="e-card-btn">View Details</button>
            <button class="e-card-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-container {
      padding: 20px;
    }
  `]
})
export class ProductCardComponent {}
```

### Example 2: Team Member Card (Horizontal)

```typescript
// team-member-card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-team-member-card',
  standalone: true,
  template: `
    <div class="e-card e-card-horizontal" style="max-width: 450px;">
      <div style="width: 100px; height: 100px; background-image: url('assets/avatar.jpg'); 
                  background-size: cover; border-radius: 8px;"></div>
      
      <div class="e-card-stacked">
        <div class="e-card-header">
          <div class="e-card-header-caption">
            <div class="e-card-header-title">Sarah Johnson</div>
            <div class="e-card-sub-title">Senior Product Manager</div>
          </div>
        </div>
        
        <div class="e-card-content" style="font-size: 13px; line-height: 1.5;">
          <p><strong>Email:</strong> sarah@company.com</p>
          <p><strong>Team:</strong> Product Development</p>
        </div>
        
        <div class="e-card-actions">
          <a href="mailto:sarah@company.com" class="e-card-btn">Contact</a>
          <button class="e-card-btn">View Profile</button>
        </div>
      </div>
    </div>
  `
})
export class TeamMemberCardComponent {}
```

### Example 3: Feature Card Grid

```typescript
// feature-cards.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-feature-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="features-grid">
      <div class="e-card e-card-horizontal" *ngFor="let feature of features">
        <img [src]="feature.icon" alt="{{ feature.title }}" style="width: 80px; height: 80px; object-fit: contain; padding: 10px;">
        
        <div class="e-card-stacked">
          <div class="e-card-header">
            <div class="e-card-header-title" style="font-size: 16px;">{{ feature.title }}</div>
          </div>
          <div class="e-card-content" style="font-size: 13px;">
            {{ feature.description }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      padding: 20px;
    }

    .e-card {
      border: 1px solid #eee;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .e-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class FeatureCardsComponent {
  features: Feature[] = [
    {
      icon: 'assets/speed.svg',
      title: 'Lightning Fast',
      description: 'Optimized performance for instant loading and smooth interactions'
    },
    {
      icon: 'assets/secure.svg',
      title: 'Secure',
      description: 'Enterprise-grade security with end-to-end encryption'
    },
    {
      icon: 'assets/scalable.svg',
      title: 'Scalable',
      description: 'Grows with your business from startup to enterprise'
    }
  ];
}
```

### Example 4: Article Preview Card

```typescript
// article-preview.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  template: `
    <div class="e-card e-card-horizontal" style="max-width: 600px;">
      <img src="assets/article-thumb.jpg" alt="Article" style="width: 150px; height: 150px; object-fit: cover;">
      
      <div class="e-card-stacked">
        <div class="e-card-header">
          <div class="e-card-header-caption">
            <div class="e-card-header-title">Angular Performance Best Practices</div>
            <div class="e-card-sub-title">By Jane Smith • Mar 27, 2026</div>
          </div>
        </div>
        
        <div class="e-card-content">
          Learn essential techniques to optimize your Angular applications for peak performance. This comprehensive guide covers lazy loading, change detection optimization, and more.
        </div>
        
        <div class="e-card-actions">
          <button class="e-card-btn">Read Article</button>
          <button class="e-card-btn">Save</button>
        </div>
      </div>
    </div>
  `
})
export class ArticlePreviewComponent {}
```

---

## Common Patterns

### Pattern: Icon + Information

Quick horizontal layout for list items:

```html
<div class="e-card e-card-horizontal" style="padding: 12px;">
  <img src="icon.svg" style="width: 40px; height: 40px;">
  <div class="e-card-stacked" style="gap: 0;">
    <div style="font-weight: 600; font-size: 14px;">Title</div>
    <div style="font-size: 12px; color: #666;">Subtitle</div>
  </div>
</div>
```

### Pattern: Image + Quick Details

Compact product or item display:

```html
<div class="e-card e-card-horizontal" style="max-width: 280px;">
  <img src="product.jpg" style="width: 100px; height: 100px;">
  <div class="e-card-stacked">
    <div class="e-card-header-title" style="font-size: 14px;">Product</div>
    <div class="e-card-content" style="font-size: 12px;">Quick description</div>
  </div>
</div>
```

---

## Styling Tips

**Make horizontal cards stand out:**

```css
.e-card.e-card-horizontal {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.e-card.e-card-horizontal:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

.e-card.e-card-horizontal img {
  border-radius: 4px;
}
```

---

## Troubleshooting

**Issue:** Elements not appearing side-by-side
- **Check:** `e-card-horizontal` class is applied
- **Verify:** Parent has `display: flex; flex-direction: row;`

**Issue:** Content overflowing
- **Solution:** Add `overflow: hidden` to card
- **Or:** Use `flex: 1` on content wrapper

**Issue:** Image distorted
- **Fix:** Use `object-fit: cover` or `contain`
- **Ensure:** Image has explicit width and height

---

**Next:** Customize card appearance in [Styling and Customization](../styling-customization.md) reference.
