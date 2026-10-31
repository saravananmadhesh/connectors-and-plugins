# Item Population and Templating

## Table of Contents
- [Populating with Item Directives](#populating-with-item-directives)
- [Data Source Binding](#data-source-binding)
- [Item Templates](#item-templates)
- [Selection and Navigation](#selection-and-navigation)
- [Partial Visible Slides](#partial-visible-slides)

## Populating with Item Directives

### Static Items with Templates

Use `<e-carousel-item>` to manually define each slide with individual templates:

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
                <figcaption class="img-caption">Cardinal</figcaption>
              </figure>
            </ng-template>
          </e-carousel-item>
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="https://ej2.syncfusion.com/products/images/carousel/hunei.png"
                     alt="Kingfisher"
                     style="height:100%;width:100%;" />
                <figcaption class="img-caption">Kingfisher</figcaption>
              </figure>
            </ng-template>
          </e-carousel-item>
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="https://ej2.syncfusion.com/products/images/carousel/keel-billed-toucan.png"
                     alt="Keel-billed-toucan"
                     style="height:100%;width:100%;" />
                <figcaption class="img-caption">Keel-billed-toucan</figcaption>
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

### Per-Item Intervals

Each item can have its own auto-play interval:

```typescript
@Component({
  template: `
    <ejs-carousel>
      <e-carousel-items>
        <e-carousel-item [interval]="3000">
          <ng-template #template>
            <div class="slide">Quick slide (3 sec)</div>
          </ng-template>
        </e-carousel-item>
        <e-carousel-item [interval]="5000">
          <ng-template #template>
            <div class="slide">Normal slide (5 sec)</div>
          </ng-template>
        </e-carousel-item>
        <e-carousel-item [interval]="8000">
          <ng-template #template>
            <div class="slide">Longer slide (8 sec)</div>
          </ng-template>
        </e-carousel-item>
      </e-carousel-items>
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

**Use case:** Variable content length requires different view times

## Data Source Binding

### Basic DataSource Binding

Bind a data array to the carousel and define a common template:

```typescript
import { Component } from "@angular/core";
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CarouselModule],
  template: `
    <div style="height: 400px;">
      <ejs-carousel [dataSource]="birds">
        <ng-template #itemTemplate let-data>
          <figure class="img-container">
            <img [src]="getImageUrl(data.imageName)"
                 [alt]="data.name"
                 style="height:100%;width:100%;" />
            <figcaption class="img-caption">{{data.name}}</figcaption>
          </figure>
        </ng-template>
      </ejs-carousel>
    </div>
  `,
})
export class CarouselComponent {
  public birds = [
    { id: 1, name: "Cardinal", imageName: "cardinal" },
    { id: 2, name: "Kingfisher", imageName: "hunei" },
    { id: 3, name: "Keel-billed-toucan", imageName: "costa-rica" },
    { id: 4, name: "Yellow-warbler", imageName: "kaohsiung" },
    { id: 5, name: "Bee-eater", imageName: "bee-eater" },
  ];

  getImageUrl(imageName: string): string {
    return `https://ej2.syncfusion.com/products/images/carousel/${imageName}.png`;
  }
}
```

### Dynamic Data with API

Load carousel items from an API:

```typescript
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CarouselModule],
  template: `
    <div style="height: 400px;">
      <ejs-carousel [dataSource]="products">
        <ng-template #itemTemplate let-data>
          <div class="product-slide">
            <img [src]="data.imageUrl" [alt]="data.name" />
            <h3>{{data.name}}</h3>
            <p>${{data.price}}</p>
          </div>
        </ng-template>
      </ejs-carousel>
    </div>
  `,
})
export class CarouselComponent implements OnInit {
  public products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get("/api/products")
      .subscribe((data: any) => {
        this.products = data;
      });
  }
}
```

## Item Templates

### Rich Content Templates

Templates support any HTML/Angular content:

```typescript
@Component({
  template: `
    <ejs-carousel [dataSource]="articles" [autoPlay]="false">
      <ng-template #itemTemplate let-article>
        <div class="article-slide">
          <img [src]="article.thumbnail" />
          <div class="article-content">
            <h2>{{article.title}}</h2>
            <p>{{article.excerpt}}</p>
            <span class="date">{{article.publishDate | date: 'MMM d, y'}}</span>
          </div>
        </div>
      </ng-template>
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  public articles = [
    {
      title: "Breaking News 1",
      excerpt: "Important update...",
      thumbnail: "news1.jpg",
      publishDate: new Date(),
    },
    // ... more articles
  ];
}
```

### Conditional Rendering in Templates

Show/hide content based on data:

```html
<ng-template #itemTemplate let-data>
  <div class="slide-content">
    <img [src]="data.image" />
    <div *ngIf="data.featured" class="featured-badge">Featured</div>
    <h3>{{data.title}}</h3>
    <p *ngIf="data.description">{{data.description}}</p>
  </div>
</ng-template>
```

### Template with Event Handlers

Add interactivity within templates:

```html
<ng-template #itemTemplate let-product>
  <div class="product-slide">
    <img [src]="product.image" />
    <h3>{{product.name}}</h3>
    <button (click)="addToCart(product)">Add to Cart</button>
  </div>
</ng-template>
```

```typescript
export class CarouselComponent {
  addToCart(product: any) {
    console.log("Added to cart:", product);
    // Handle cart logic
  }
}
```

## Selection and Navigation

### Set Initial Slide with selectedIndex

Display a specific slide when carousel initializes:

```typescript
@Component({
  template: `
    <ejs-carousel [selectedIndex]="2">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  selectedIndex = 2; // Start at index 2 (third slide)
}
```

### Programmatic Navigation with prev() and next()

Navigate slides using component methods:

```typescript
import { ViewChild } from "@angular/core";
import { CarouselComponent as SyncCarousel } from "@syncfusion/ej2-angular-navigations";

@Component({
  template: `
    <button (click)="previousSlide()">Previous</button>
    <ejs-carousel #carousel>
      <!-- carousel items -->
    </ejs-carousel>
    <button (click)="nextSlide()">Next</button>
  `,
})
export class CarouselComponent {
  @ViewChild("carousel") carousel!: SyncCarousel;

  previousSlide() {
    this.carousel.prev();
  }

  nextSlide() {
    this.carousel.next();
  }
}
```

### Auto-Play Control with play() and pause()

Resume or pause automatic slide transitions programmatically:

```typescript
import { ViewChild } from "@angular/core";
import { CarouselComponent as SyncCarousel } from "@syncfusion/ej2-angular-navigations";

@Component({
  template: `
    <button (click)="pauseSlideshow()">Pause</button>
    <button (click)="playSlideshow()">Play</button>
    <ejs-carousel #carousel [autoPlay]="true">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  @ViewChild("carousel") carousel!: SyncCarousel;

  pauseSlideshow() {
    this.carousel.pause();
  }

  playSlideshow() {
    this.carousel.play();
  }
}
```

**Use case:** Allow users to control auto-play independently from pauseOnHover setting

### Component Cleanup with destroy()

Clean up carousel resources when component is destroyed:

```typescript
import { ViewChild, OnDestroy } from "@angular/core";
import { CarouselComponent as SyncCarousel } from "@syncfusion/ej2-angular-navigations";

@Component({
  template: `
    <ejs-carousel #carousel>
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent implements OnDestroy {
  @ViewChild("carousel") carousel!: SyncCarousel;

  ngOnDestroy() {
    // Cleanup carousel before component is destroyed
    if (this.carousel) {
      this.carousel.destroy();
    }
  }
}
```

**Use case:** Proper resource cleanup when carousel component is removed from DOM

### Jump to Specific Slide

Set selectedIndex to jump to any slide:

```typescript
export class CarouselComponent {
  @ViewChild("carousel") carousel!: SyncCarousel;

  goToSlide(index: number) {
    this.carousel.selectedIndex = index;
  }

  goToFirstSlide() {
    this.carousel.selectedIndex = 0;
  }

  goToLastSlide() {
    this.carousel.selectedIndex = this.carousel.items.length - 1;
  }
}
```

## Partial Visible Slides

### Enable Partial Visibility

Show adjacent slides partially alongside the main slide:

```typescript
@Component({
  template: `
    <ejs-carousel [partialVisible]="true">
      <e-carousel-items>
        <e-carousel-item>
          <ng-template #template>
            <figure class="img-container">
              <img src="slide1.jpg" style="height:100%;width:100%;" />
            </figure>
          </ng-template>
        </e-carousel-item>
        <e-carousel-item>
          <ng-template #template>
            <figure class="img-container">
              <img src="slide2.jpg" style="height:100%;width:100%;" />
            </figure>
          </ng-template>
        </e-carousel-item>
      </e-carousel-items>
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

### Partial Visibility with Looping

Combine `partialVisible` with `loop` control:

```typescript
@Component({
  template: `
    <ejs-carousel [partialVisible]="true" [loop]="false">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

**Behavior:**
- With `loop=true`: Last slide shows as partial at the end
- With `loop=false`: Previous slide doesn't appear on first render

### Customizing Partial Slides Size

Control the width of visible partial slides via CSS:

```css
.e-carousel .e-carousel-items .e-carousel-item {
  /* Adjust partial slide size */
}
```

See styling-and-appearance.md for detailed CSS customization.

## Edge Cases

**Issue:** Data hasn't loaded when carousel initializes
- **Solution:** Use `*ngIf="dataSource.length > 0"` wrapper or check in ngOnInit

**Issue:** Updating dataSource doesn't refresh carousel
- **Solution:** Trigger change detection: `this.dataSource = [...this.dataSource]`

**Issue:** Item intervals ignored with dataSource
- **Solution:** Use item directives (not dataSource) for per-item interval control
