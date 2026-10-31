# Getting Started with Angular Carousel

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [Basic Implementation](#basic-implementation)
- [Data Binding Approaches](#data-binding-approaches)
- [Initial Configuration](#initial-configuration)

## Installation and Setup

### Dependencies

The Carousel component requires the following packages:

```javascript
|-- @syncfusion/ej2-angular-navigations
    |-- @syncfusion/ej2-angular-base
    |-- @syncfusion/ej2-navigations
        |-- @syncfusion/ej2-base
        |-- @syncfusion/ej2-buttons
```

### Install the Package

Add the Syncfusion navigations package to your Angular project:

```bash
npm install @syncfusion/ej2-angular-navigations
```

### Import the Module

In your component, import the `CarouselModule`:

```typescript
import { Component } from "@angular/core";
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CarouselModule],
  template: `<!-- carousel content -->`,
})
export class CarouselComponent {}
```

### CSS Theme Setup

Import the required CSS themes in your `styles.css` or `styles.scss`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/carousel/index.css";
```

## Basic Implementation

### Minimal Example

Create a basic carousel with static items:

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
                <img src="https://ej2.syncfusion.com/products/images/carousel/cardinal.png"
                     alt="Cardinal"
                     style="height:100%;width:100%;" />
                <figcaption>Cardinal</figcaption>
              </figure>
            </ng-template>
          </e-carousel-item>
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="https://ej2.syncfusion.com/products/images/carousel/hunei.png"
                     alt="Kingfisher"
                     style="height:100%;width:100%;" />
                <figcaption>Kingfisher</figcaption>
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

**Result:** Carousel displays two slides with automatic transitions every 5 seconds.

## Data Binding Approaches

### Approach 1: Item Binding (Static Items)

Use `<e-carousel-items>` for static or individually configured slides:

```typescript
@Component({
  template: `
    <ejs-carousel>
      <e-carousel-items>
        <e-carousel-item [interval]="3000">
          <ng-template #template>
            <div class="slide-content">Slide 1</div>
          </ng-template>
        </e-carousel-item>
        <e-carousel-item [interval]="4000">
          <ng-template #template>
            <div class="slide-content">Slide 2</div>
          </ng-template>
        </e-carousel-item>
      </e-carousel-items>
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

**Advantage:** Individual interval control per slide

### Approach 2: DataSource Binding (Dynamic Content)

Use `[dataSource]` with `itemTemplate` for data-driven carousels:

```typescript
import { Component } from "@angular/core";
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CarouselModule],
  template: `
    <div style="height: 400px;">
      <ejs-carousel [dataSource]="products">
        <ng-template #itemTemplate let-data>
          <figure class="img-container">
            <img [src]="data.image" [alt]="data.name" style="height:100%;width:100%;" />
            <figcaption class="img-caption">{{data.name}}</figcaption>
          </figure>
        </ng-template>
      </ejs-carousel>
    </div>
  `,
})
export class CarouselComponent {
  public products = [
    { name: "Cardinal", image: "https://ej2.syncfusion.com/products/images/carousel/cardinal.png" },
    { name: "Kingfisher", image: "https://ej2.syncfusion.com/products/images/carousel/hunei.png" },
    { name: "Keel-billed-toucan", image: "https://ej2.syncfusion.com/products/images/carousel/costa-rica.png" },
  ];
}
```

**Advantage:** Reusable with dynamic data, cleaner template syntax

## Initial Configuration

### Set Starting Slide

Use `selectedIndex` to specify which slide displays first:

```typescript
@Component({
  template: `
    <ejs-carousel [selectedIndex]="2">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  selectedIndex = 2; // Start at third slide (0-indexed)
}
```

### Disable Auto-Play

Set `autoPlay` to false for manual-only navigation:

```html
<ejs-carousel [autoPlay]="false">
  <!-- carousel items -->
</ejs-carousel>
```

### Set Custom Intervals

Configure auto-play timing (in milliseconds):

```typescript
@Component({
  template: `
    <ejs-carousel [autoPlay]="true" [interval]="7000">
      <!-- carousel items transition every 7 seconds -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

### Container Sizing

Always set explicit height on the carousel container:

```html
<div style="height: 400px; width: 100%;">
  <ejs-carousel>
    <!-- carousel items -->
  </ejs-carousel>
</div>
```

**Why:** The carousel fills its container, so container dimensions control the display size.

## First Render and Initialization

The carousel initializes automatically when the component loads. All properties are set at component creation and update reactively.

To access the carousel instance for programmatic control:

```typescript
import { ViewChild } from "@angular/core";
import { CarouselComponent as SyncCarousel } from "@syncfusion/ej2-angular-navigations";

@Component({
  template: `<ejs-carousel #myCarousel></ejs-carousel>`,
})
export class MyComponent {
  @ViewChild("myCarousel") carousel!: SyncCarousel;

  ngAfterViewInit() {
    // Access carousel instance after it's initialized
    console.log(this.carousel.selectedIndex);
  }
}
```

## Common Issues

**Issue:** Carousel not displaying
- **Solution:** Ensure container has explicit height and carousel items have content

**Issue:** Images not loading
- **Solution:** Verify image URLs are correct and accessible; check CORS if cross-origin

**Issue:** Auto-play not starting
- **Solution:** Confirm `autoPlay="true"` and container is visible in DOM
