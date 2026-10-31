# Styling and Customization in Syncfusion Angular Cards

## Table of Contents
- [CSS Class Hierarchy](#css-class-hierarchy)
- [Customizing Card Appearance](#customizing-card-appearance)
- [Header Styling](#header-styling)
- [Content Styling](#content-styling)
- [Image Customization](#image-customization)
- [Button Styling](#button-styling)
- [Divider Customization](#divider-customization)
- [Layout Styling](#layout-styling)
- [Theme Integration](#theme-integration)
- [Advanced Patterns](#advanced-patterns)

---

## CSS Class Hierarchy

Understanding the Card's CSS structure enables precise customization:

```
.e-card (Root container)
├── .e-card-header (Header section)
│   ├── .e-card-header-image (Avatar/icon)
│   └── .e-card-header-caption (Text wrapper)
│       ├── .e-card-header-title (Main title)
│       └── .e-card-sub-title (Subtitle)
├── .e-card-image (Content image with optional title)
│   └── .e-card-title (Image overlay title)
├── .e-card-content (Main content area)
├── .e-card-separator (Visual divider)
└── .e-card-actions (Button container)
    └── .e-card-btn (Individual buttons)
```

---

## Customizing Card Appearance

### Basic Card Styling

Customize the root card container:

```css
.e-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
```

### Card Padding and Spacing

```css
.e-card {
  padding: 0; /* Content sections handle their own padding */
}

/* Optional: Add padding around entire card */
.e-card-wrapper {
  padding: 16px;
}
```

### Card Background Colors

**Solid Color:**

```css
.e-card {
  background-color: #f5f5f5;
}
```

**Gradient Background:**

```css
.e-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

**Image Background:**

```css
.e-card {
  background-image: url('pattern.png');
  background-size: 200px;
  background-repeat: repeat;
}
```

### Card Border Customization

```css
/* Thick border */
.e-card {
  border: 3px solid #007bff;
  border-radius: 8px;
}

/* Colored left border */
.e-card {
  border-left: 4px solid #28a745;
}

/* Rounded corners */
.e-card {
  border-radius: 12px;
}

/* Soft shadows */
.e-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Strong shadows */
.e-card {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

### Card Hover Effects

```css
.e-card {
  transition: all 0.3s ease;
}

.e-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

/* Lift effect */
.e-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

/* Scale effect */
.e-card:hover {
  transform: scale(1.02);
}
```

---

## Header Styling

### Header Container

```css
.e-card-header {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}
```

### Header Title Styling

```css
.e-card-header-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* Large title */
.e-card-header-title {
  font-size: 22px;
  font-weight: 700;
}

/* Colored title */
.e-card-header-title {
  color: #007bff;
}

/* Title with underline */
.e-card-header-title {
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
}
```

### Header Subtitle Styling

```css
.e-card-header .e-card-sub-title {
  font-size: 14px;
  color: #999;
  margin-top: 4px;
  font-weight: 400;
}

/* Colored subtitle */
.e-card-header .e-card-sub-title {
  color: #28a745;
}

/* Styled subtitle */
.e-card-header .e-card-sub-title {
  font-style: italic;
  letter-spacing: 0.5px;
}
```

### Header Image Styling

```css
.e-card-header-image {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin-right: 12px;
  object-fit: cover;
}

/* Circular image */
.e-card-header-image {
  border-radius: 50%;
}

/* Image with border */
.e-card-header-image {
  border: 2px solid #ddd;
}

/* Image with shadow */
.e-card-header-image {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Colored Header Backgrounds

```css
/* Blue header */
.e-card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: none;
  color: white;
}

.e-card-header .e-card-header-title {
  color: white;
}

.e-card-header .e-card-sub-title {
  color: rgba(255, 255, 255, 0.9);
}

/* Dark header */
.e-card-header {
  background-color: #333;
}

.e-card-header .e-card-header-title {
  color: white;
}
```

---

## Content Styling

### Card Content Area

```css
.e-card-content {
  padding: 16px;
  color: #555;
  line-height: 1.6;
}

/* Larger content padding */
.e-card-content {
  padding: 24px;
}

/* Content with background */
.e-card-content {
  background-color: #f5f5f5;
}
```

### Content Text Styling

```css
.e-card-content {
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Justified text */
.e-card-content {
  text-align: justify;
}

/* Monospace text (for code) */
.e-card-content code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}
```

### Content Lists

```css
.e-card-content ul,
.e-card-content ol {
  margin: 12px 0;
  padding-left: 24px;
}

.e-card-content li {
  margin-bottom: 6px;
}
```

### Multiple Content Sections

```css
.e-card-content + .e-card-content {
  border-top: 1px solid #eee;
  padding-top: 16px;
}
```

---

## Image Customization

### Card Image Container

```css
.e-card-image {
  background-size: cover;
  background-position: center;
  height: 250px;
  position: relative;
}

/* Responsive height */
.e-card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* Square image */
.e-card-image {
  aspect-ratio: 1 / 1;
}
```

### Image Filters

```css
/* Brightness */
.e-card-image {
  filter: brightness(0.8);
}

/* Grayscale */
.e-card-image {
  filter: grayscale(100%);
}

/* Sepia effect */
.e-card-image {
  filter: sepia(30%);
}

/* Blur effect */
.e-card-image {
  filter: blur(2px);
}

/* Multiple filters */
.e-card-image {
  filter: brightness(0.9) contrast(1.1) saturate(1.2);
}

/* Hover effect */
.e-card:hover .e-card-image {
  filter: brightness(1) grayscale(0%);
}
```

### Image Gradient Overlay

```css
/* Gradient overlay for text contrast */
.e-card-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  z-index: 1;
}

/* Dark overlay */
.e-card-image::before {
  background: rgba(0, 0, 0, 0.4);
}

/* Gradient overlay (top to bottom) */
.e-card-image::before {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
}
```

### Image Title Positioning

```css
/* Bottom-left (default) */
.e-card-image .e-card-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  color: white;
  padding: 12px 16px;
  z-index: 2;
}

/* Top-left */
.e-card-image .e-card-title.top-left {
  top: 0;
  bottom: auto;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
}

/* Top-right */
.e-card-image .e-card-title.top-right {
  top: 0;
  bottom: auto;
  left: auto;
  right: 0;
  text-align: right;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
}

/* Bottom-right */
.e-card-image .e-card-title.bottom-right {
  right: 0;
  left: auto;
  text-align: right;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}
```

---

## Button Styling

### Button Container

```css
.e-card-actions {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
}
```

### Button Styling

```css
.e-card-btn {
  flex: 1;
  padding: 10px 16px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.e-card-btn:hover {
  background-color: #f0f0f0;
  border-color: #999;
}

.e-card-btn:active {
  background-color: #e0e0e0;
}
```

### Themed Buttons

```css
/* Primary button */
.e-card-btn.primary {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.e-card-btn.primary:hover {
  background-color: #0056b3;
}

/* Success button */
.e-card-btn.success {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

/* Danger button */
.e-card-btn.danger {
  background-color: #dc3545;
  color: white;
  border-color: #dc3545;
}

/* Outline button */
.e-card-btn.outline {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.e-card-btn.outline:hover {
  background-color: #007bff;
  color: white;
}
```

---

## Divider Customization

### Basic Divider

```css
.e-card-separator {
  height: 1px;
  background-color: #ddd;
  margin: 16px 0;
}
```

### Custom Divider Styles

```css
/* Thick divider */
.e-card-separator {
  height: 3px;
  background-color: #999;
}

/* Colored divider */
.e-card-separator {
  height: 2px;
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* Dashed divider */
.e-card-separator {
  height: 0;
  border-top: 1px dashed #ccc;
  margin: 12px 0;
}

/* Dotted divider */
.e-card-separator {
  height: 0;
  border-top: 1px dotted #ccc;
}

/* Reduced spacing */
.e-card-separator {
  margin: 8px 0;
}

/* Increased spacing */
.e-card-separator {
  margin: 24px 0;
}

/* With padding */
.e-card-separator {
  padding: 12px 0;
  border-top: 1px solid #eee;
}
```

---

## Layout Styling

### Horizontal Layout

```css
.e-card-horizontal {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.e-card-horizontal > * {
  flex-shrink: 0;
}

.e-card-stacked {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}
```

### Responsive Layout

```css
/* Desktop */
@media (min-width: 768px) {
  .e-card-responsive {
    display: flex;
    flex-direction: row;
  }

  .e-card-responsive img {
    width: 200px;
    height: 200px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .e-card-responsive {
    display: flex;
    flex-direction: column;
  }

  .e-card-responsive img {
    width: 100%;
    height: auto;
  }
}
```

---

## Theme Integration

### Material Design 3 Theme

```css
/* Material 3 primary colors */
:root {
  --md-sys-color-primary: #006fbe;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-surface: #fffbfe;
  --md-sys-color-on-surface: #1c1b1f;
}

.e-card {
  background-color: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

.e-card-header {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}
```

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  .e-card {
    background-color: #222;
    color: #eee;
    border-color: #444;
  }

  .e-card-header {
    background-color: #333;
    border-color: #444;
  }

  .e-card-actions {
    background-color: #333;
    border-color: #444;
  }

  .e-card-btn {
    background-color: #444;
    color: #eee;
    border-color: #555;
  }

  .e-card-separator {
    background-color: #444;
  }
}
```

---

## Advanced Patterns

### Glassmorphism Effect

```css
.e-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### Neumorphism Effect

```css
.e-card {
  background: #e0e5ec;
  box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #fff;
}

.e-card:hover {
  box-shadow: inset 9px 9px 16px #a3b1c6, inset -9px -9px 16px #fff;
}
```

### 3D Effect

```css
.e-card {
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  transition: transform 0.3s ease;
}

.e-card:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
}
```

### Gradient Text

```css
.e-card-header-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Animated Border

```css
.e-card {
  position: relative;
  border: 2px solid;
  border-image: linear-gradient(45deg, #667eea, #764ba2) 1;
  animation: borderAnimation 3s infinite;
}

@keyframes borderAnimation {
  0%, 100% {
    border-image: linear-gradient(45deg, #667eea, #764ba2) 1;
  }
  50% {
    border-image: linear-gradient(225deg, #667eea, #764ba2) 1;
  }
}
```

### Card Elevation

```css
.e-card {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
              0 1px 1px 0 rgba(0, 0, 0, 0.14),
              0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.e-card:hover {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
              0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
```

---

## Complete Styling Example

```typescript
// styled-card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-styled-card',
  standalone: true,
  template: `
    <div class="premium-card">
      <div class="e-card">
        <div class="e-card-header">
          <div class="e-card-header-image" style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%;"></div>
          <div class="e-card-header-caption">
            <div class="e-card-header-title">Premium Card</div>
            <div class="e-card-sub-title">Advanced Styling</div>
          </div>
        </div>
        
        <div class="e-card-image" style="height: 200px; background: linear-gradient(135deg, #667eea, #764ba2);"></div>
        
        <div class="e-card-content">
          A beautifully styled card with custom colors, shadows, and effects.
        </div>
        
        <div class="e-card-actions">
          <button class="e-card-btn primary">Learn More</button>
          <button class="e-card-btn outline">Save</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .premium-card {
      padding: 20px;
    }

    .e-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
    }

    .e-card:hover {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
      transform: translateY(-4px);
    }

    .e-card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .e-card-header-title {
      color: white;
    }

    .e-card-sub-title {
      color: rgba(255, 255, 255, 0.9) !important;
    }

    .e-card-content {
      padding: 24px;
      font-size: 15px;
      line-height: 1.6;
    }

    .e-card-actions {
      background: #f5f5f5;
    }

    .e-card-btn {
      padding: 12px 16px;
      font-weight: 600;
    }

    .e-card-btn.primary {
      background: #007bff;
      color: white;
      border: none;
    }

    .e-card-btn.outline {
      background: white;
      color: #007bff;
      border: 2px solid #007bff;
    }
  `]
})
export class StyledCardComponent {}
```

---

## Troubleshooting

**Issue:** Styles not applying
- **Check:** CSS specificity - use more specific selectors if needed
- **Verify:** Styles load after theme CSS
- **Try:** Use `!important` as last resort

**Issue:** Theme colors not working
- **Solution:** Ensure theme CSS is imported
- **Check:** Correct theme file name (material3.css vs material.css)

**Issue:** Hover effects not smooth
- **Add:** `transition: all 0.3s ease;` to elements

---

**Ready to create beautiful, custom cards!** Each technique builds on CSS fundamentals to create unique card designs that match your brand.
