# Styling, Appearance, and Performance

## Table of Contents
- [CSS Customization](#css-customization)
- [Theme Integration](#theme-integration)
- [Responsive Design](#responsive-design)
- [WebP Image Format](#webp-image-format)
- [Customizing Partial Slides](#customizing-partial-slides)
- [Accessibility Styling](#accessibility-styling)

## CSS Customization

### Custom Carousel Container Styles

Apply custom CSS classes to the carousel wrapper:

```typescript
import { Component } from "@angular/core";
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CarouselModule],
  template: `
    <div class="custom-carousel-wrapper">
      <ejs-carousel cssClass="my-custom-carousel">
        <e-carousel-items>
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="image1.jpg" style="height:100%;width:100%;" />
              </figure>
            </ng-template>
          </e-carousel-item>
          <!-- additional items -->
        </e-carousel-items>
      </ejs-carousel>
    </div>
  `,
  styles: [`
    :host ::ng-deep .my-custom-carousel {
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
    }

    :host ::ng-deep .my-custom-carousel .e-carousel-item {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    :host ::ng-deep .my-custom-carousel .e-carousel-item img {
      object-fit: cover;
    }
  `],
})
export class CarouselComponent {}
```

### Style Navigation Buttons

Customize previous/next button appearance:

```typescript
@Component({
  styles: [`
    :host ::ng-deep .my-carousel .e-prev,
    :host ::ng-deep .my-carousel .e-next {
      background: rgba(255, 255, 255, 0.8);
      color: #333;
      border: none;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .my-carousel .e-prev:hover,
    :host ::ng-deep .my-carousel .e-next:hover {
      background: rgba(255, 255, 255, 1);
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  `],
})
export class CarouselComponent {}
```

### Style Indicators

Customize indicator appearance:

```typescript
@Component({
  styles: [`
    :host ::ng-deep .my-carousel .e-indicators {
      bottom: 20px;
    }

    :host ::ng-deep .my-carousel .e-indicator-item {
      width: 12px;
      height: 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      margin: 0 6px;
      cursor: pointer;
      transition: all 0.3s;
    }

    :host ::ng-deep .my-carousel .e-indicator-item.e-active {
      background: white;
      width: 36px;
      border-radius: 6px;
    }

    :host ::ng-deep .my-carousel .e-indicator-item:hover {
      background: rgba(255, 255, 255, 0.8);
    }
  `],
})
export class CarouselComponent {}
```

### Style Item Captions

Customize text overlays on carousel items:

```typescript
@Component({
  template: `
    <ejs-carousel>
      <e-carousel-items>
        <e-carousel-item>
          <ng-template #template>
            <figure class="img-container">
              <img src="image.jpg" />
              <figcaption class="custom-caption">
                <h2>Beautiful Landscape</h2>
                <p>Enjoy nature's finest</p>
              </figcaption>
            </figure>
          </ng-template>
        </e-carousel-item>
      </e-carousel-items>
    </ejs-carousel>
  `,
  styles: [`
    :host ::ng-deep .custom-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      color: white;
      padding: 40px 20px 20px;
      margin: 0;
    }

    :host ::ng-deep .custom-caption h2 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }

    :host ::ng-deep .custom-caption p {
      margin: 8px 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
  `],
})
export class CarouselComponent {}
```

## Theme Integration

### Available Themes

Syncfusion provides multiple pre-built themes:

```css
/* Material Theme (default) */
@import "@syncfusion/ej2-angular-navigations/styles/material.css";

/* Bootstrap Theme */
@import "@syncfusion/ej2-angular-navigations/styles/bootstrap.css";

/* Tailwind Theme */
@import "@syncfusion/ej2-angular-navigations/styles/tailwind.css";

/* High Contrast Theme */
@import "@syncfusion/ej2-angular-navigations/styles/highcontrast.css";

/* Fabric Theme */
@import "@syncfusion/ej2-angular-navigations/styles/fabric.css";
```

### Override Theme Colors

Customize theme colors via CSS variables:

```css
:root {
  /* Material theme color variables */
  --control-primary: #0066cc;
  --control-secondary: #f5f5f5;
  --control-border: #e0e0e0;
}

/* Override specific carousel colors */
.my-carousel .e-carousel-item {
  background: var(--control-secondary);
}

.my-carousel .e-prev,
.my-carousel .e-next {
  background: var(--control-primary);
}
```

### Dark Mode Theme

Implement dark mode variant:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --carousel-bg: #1a1a1a;
    --carousel-text: #ffffff;
    --carousel-border: #333333;
  }

  .e-carousel {
    background: var(--carousel-bg);
    color: var(--carousel-text);
  }

  .e-carousel .e-prev,
  .e-carousel .e-next {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--carousel-border);
  }
}
```

## Responsive Design

### Mobile Responsive Carousel

Adapt carousel layout for different screen sizes:

```typescript
@Component({
  template: `
    <div [ngClass]="{'carousel-mobile': isMobile, 'carousel-desktop': !isMobile}">
      <ejs-carousel [buttonsVisibility]="buttonVisibility"
                     [showIndicators]="showIndicators">
        <e-carousel-items>
          <!-- carousel items -->
        </e-carousel-items>
      </ejs-carousel>
    </div>
  `,
  styles: [`
    /* Desktop layout */
    .carousel-desktop {
      height: 500px;
      border-radius: 8px;
    }

    /* Mobile layout */
    .carousel-mobile {
      height: 300px;
      border-radius: 4px;
    }

    /* Tablet layout */
    @media (max-width: 768px) {
      .carousel-desktop {
        height: 350px;
      }
    }

    /* Small mobile */
    @media (max-width: 480px) {
      .carousel-mobile {
        height: 200px;
      }
    }
  `],
})
export class CarouselComponent implements OnInit {
  public isMobile = false;
  public buttonVisibility: "Visible" | "Hidden" | "VisibleOnHover" = "Visible";
  public showIndicators = true;

  ngOnInit() {
    this.adjustForScreenSize();
    window.addEventListener("resize", () => this.adjustForScreenSize());
  }

  private adjustForScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.buttonVisibility = this.isMobile ? "VisibleOnHover" : "Visible";
  }
}
```

### Flexible Container Sizing

Make carousel responsive with CSS:

```css
.carousel-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.carousel-container::before {
  content: "";
  display: block;
  padding-bottom: 66.67%; /* 3:2 aspect ratio */
}

.carousel-container .e-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

## WebP Image Format

### Load WebP Images for Performance

Use WebP format for better compression and faster loading:

```typescript
import { Component } from "@angular/core";
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CarouselModule],
  template: `
    <div style="height: 400px;">
      <ejs-carousel>
        <e-carousel-items>
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="https://www.gstatic.com/webp/gallery/1.webp"
                     alt="Majestic Valley View"
                     style="height:100%;width:100%;" />
                <figcaption>Majestic Valley View</figcaption>
              </figure>
            </ng-template>
          </e-carousel-item>
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="https://www.gstatic.com/webp/gallery/2.webp"
                     alt="Thrilling Rapids Adventure"
                     style="height:100%;width:100%;" />
                <figcaption>Thrilling Rapids Adventure</figcaption>
              </figure>
            </ng-template>
          </e-carousel-item>
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="https://www.gstatic.com/webp/gallery/3.webp"
                     alt="Snowy Stroll"
                     style="height:100%;width:100%;" />
                <figcaption>Snowy Stroll</figcaption>
              </figure>
            </ng-template>
          </e-carousel-item>
        </e-carousel-items>
      </ejs-carousel>
    </div>
  `,
})
export class CarouselComponent {}
```

### WebP with Fallback Support

Use picture element for browser compatibility:

```html
<ng-template #itemTemplate let-data>
  <figure class="img-container">
    <picture>
      <!-- WebP format for modern browsers -->
      <source [srcset]="data.imageWebP" type="image/webp">
      <!-- Fallback for older browsers -->
      <img [src]="data.imageJpg" [alt]="data.title" style="height:100%;width:100%;" />
    </picture>
    <figcaption>{{data.title}}</figcaption>
  </figure>
</ng-template>
```

```typescript
export class CarouselComponent {
  public images = [
    {
      title: "Image 1",
      imageWebP: "image1.webp",
      imageJpg: "image1.jpg"
    },
    {
      title: "Image 2",
      imageWebP: "image2.webp",
      imageJpg: "image2.jpg"
    },
  ];
}
```

### Benefits of WebP

| Aspect | Benefit |
|--------|---------|
| File Size | 25-35% smaller than JPEG/PNG |
| Load Speed | Faster initial render and transitions |
| Bandwidth | Reduced data usage on mobile |
| Quality | Maintains visual fidelity at lower file sizes |

## Customizing Partial Slides

### Adjust Partial Slide Width

Control the visibility of adjacent slides when `partialVisible` is enabled:

```css
:host ::ng-deep .e-carousel {
  /* Default partial slide size - 30% of container width */
}

:host ::ng-deep .e-carousel.custom-partial .e-carousel-item {
  /* Adjust width to show more or less of adjacent slides */
  width: 70%; /* Shows partial 30% of adjacent slide */
}
```

### Partial Slides Styling

Style partial slides differently from active slide:

```css
:host ::ng-deep .e-carousel-item {
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* Partial (non-active) slides */
:host ::ng-deep .e-carousel-item:not(.e-active) {
  opacity: 0.6;
  filter: blur(2px);
}
```

## Accessibility Styling

### High Contrast Mode

Ensure carousel is readable in high contrast:

```css
@media (prefers-contrast: more) {
  :host ::ng-deep .e-carousel {
    border: 2px solid currentColor;
  }

  :host ::ng-deep .e-carousel .e-prev,
  :host ::ng-deep .e-carousel .e-next {
    border: 2px solid currentColor;
    background: white;
    color: black;
  }

  :host ::ng-deep .e-carousel .e-indicator-item {
    border: 1px solid currentColor;
  }
}
```

### Focus Indicators

Highlight focusable elements for keyboard navigation:

```css
:host ::ng-deep .e-carousel .e-prev:focus,
:host ::ng-deep .e-carousel .e-next:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

:host ::ng-deep .e-carousel .e-indicator-item:focus {
  outline: 2px solid #4A90E2;
  border-radius: 50%;
}
```

### Color Contrast

Ensure text/buttons have sufficient contrast:

```css
/* Minimum WCAG AA contrast ratio: 4.5:1 for text */
:host ::ng-deep .e-carousel .custom-caption {
  background: rgba(0, 0, 0, 0.8); /* Darker overlay for contrast */
  color: #ffffff; /* White text on dark background */
}

:host ::ng-deep .e-carousel .e-prev,
:host ::ng-deep .e-carousel .e-next {
  background: #0066cc; /* Strong color contrast */
  color: white;
}
```

## Performance Tips

1. **Use WebP images:** Reduce file sizes and load times
2. **Lazy load images:** Load only visible/adjacent slides
3. **Optimize container height:** Avoid reflows with explicit sizing
4. **Minimize CSS:** Reduce style calculations
5. **Debounce resize events:** Avoid constant recalculations on resize
6. **Use requestAnimationFrame:** Smooth animations aligned with browser refresh

