# Navigation Controls and Indicators

## Table of Contents
- [Navigator Buttons](#navigator-buttons)
- [Indicators](#indicators)
- [Indicator Types](#indicator-types)
- [Custom Templates](#custom-templates)
- [Play Button Control](#play-button-control)

## Navigator Buttons

### Show or Hide Buttons

Control button visibility with `buttonsVisibility` property:

```typescript
import { Component } from "@angular/core";
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";
import { CarouselButtonVisibility } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CarouselModule],
  template: `
    <div style="height: 400px;">
      <ejs-carousel [buttonsVisibility]="buttonVisibility">
        <e-carousel-items>
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="https://ej2.syncfusion.com/products/images/carousel/cardinal.png"
                     alt="Cardinal"
                     style="height:100%;width:100%;" />
              </figure>
            </ng-template>
          </e-carousel-item>
          <!-- additional items -->
        </e-carousel-items>
      </ejs-carousel>
    </div>
  `,
})
export class CarouselComponent {
  public buttonVisibility: CarouselButtonVisibility = "Visible";
  // Options: "Visible" | "Hidden" | "VisibleOnHover"
}
```

**Button Visibility Options:**

| Option | Behavior |
|--------|----------|
| `Visible` | Previous/next buttons always visible |
| `Hidden` | Buttons not displayed (use keyboard/swipe navigation) |
| `VisibleOnHover` | Buttons appear only when mouse hovers over carousel |

### Change Button Visibility

Toggle buttons dynamically:

```typescript
export class CarouselComponent {
  public buttonVisibility: CarouselButtonVisibility = "Visible";

  toggleButtons() {
    this.buttonVisibility = 
      this.buttonVisibility === "Visible" ? "Hidden" : "Visible";
  }
}
```

## Indicators

### Show or Hide Indicators

Control position indicator visibility:

```typescript
@Component({
  template: `
    <ejs-carousel [showIndicators]="true">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  public showIndicators = true;
}
```

**Indicators display:**
- Current position within the slide sequence
- Total number of slides
- Interactive navigation (click to jump to slide)

### Custom Indicator Templates

Replace default indicators with custom markup:

```typescript
@Component({
  template: `
    <ejs-carousel>
      <ng-template #indicatorsTemplate let-data>
        <div class="custom-indicator">
          <span class="indicator-dot"
                [class.active]="data.index === currentIndex"></span>
        </div>
      </ng-template>
      <e-carousel-items>
        <e-carousel-item>
          <ng-template #template>
            <figure class="img-container">
              <img src="slide1.jpg" style="height:100%;width:100%;" />
            </figure>
          </ng-template>
        </e-carousel-item>
        <!-- additional items -->
      </e-carousel-items>
    </ejs-carousel>
  `,
  styles: [`
    .custom-indicator .indicator-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255,255,255,0.5);
      margin: 0 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .custom-indicator .indicator-dot.active {
      background: white;
      width: 16px;
    }
  `],
})
export class CarouselComponent {
  public currentIndex = 0;
}
```

### Indicator with Slide Preview

Show thumbnail previews in indicators:

```typescript
@Component({
  template: `
    <ejs-carousel [dataSource]="slides">
      <ng-template #indicatorsTemplate let-data>
        <div class="indicator-preview">
          <img [src]="slides[data.index]?.thumbnail"
               class="preview-image"
               alt="Preview" />
        </div>
      </ng-template>
      <ng-template #itemTemplate let-data>
        <figure class="img-container">
          <img [src]="data.fullImage" style="height:100%;width:100%;" />
        </figure>
      </ng-template>
    </ejs-carousel>
  `,
  styles: [`
    .indicator-preview {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      overflow: hidden;
    }
    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `],
})
export class CarouselComponent {
  public slides = [
    { 
      fullImage: "full1.jpg", 
      thumbnail: "thumb1.jpg" 
    },
    { 
      fullImage: "full2.jpg", 
      thumbnail: "thumb2.jpg" 
    },
    // ... more slides
  ];
}
```

## Indicator Types

### Default Indicator

Simple dots showing position (default type):

```typescript
@Component({
  template: `
    <ejs-carousel [indicatorsType]="'Default'">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

**Appearance:** Dots at bottom of carousel, clickable to navigate

### Dynamic Indicator

Animated indicator that emphasizes current slide:

```typescript
@Component({
  template: `
    <ejs-carousel [indicatorsType]="'Dynamic'">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

**Appearance:** Indicator grows/animates to show active slide

### Fraction Indicator

Shows current position as fraction (e.g., "2 of 5"):

```typescript
@Component({
  template: `
    <ejs-carousel [indicatorsType]="'Fraction'">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

**Use case:** Clear numerical position feedback

### Progress Indicator

Visual progress bar showing position:

```typescript
@Component({
  template: `
    <ejs-carousel [indicatorsType]="'Progress'">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

**Use case:** Visual representation of progress through slides

### Switch Indicator Types

Toggle between indicator types:

```typescript
@Component({
  template: `
    <div class="controls">
      <button (click)="indicatorsType = 'Default'">Dots</button>
      <button (click)="indicatorsType = 'Fraction'">Fraction</button>
      <button (click)="indicatorsType = 'Progress'">Progress</button>
    </div>
    <ejs-carousel [indicatorsType]="indicatorsType">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  public indicatorsType: "Default" | "Dynamic" | "Fraction" | "Progress" = "Default";
}
```

## Custom Templates

### Previous Button Template

Customize the previous navigation button:

```typescript
@Component({
  template: `
    <ejs-carousel>
      <ng-template #previousButtonTemplate>
        <button ejs-button 
                cssClass="e-flat e-round"
                iconCss="e-icons e-chevron-left-double">
        </button>
      </ng-template>
      <e-carousel-items>
        <e-carousel-item>
          <ng-template #template>
            <figure class="img-container">
              <img src="slide.jpg" style="height:100%;width:100%;" />
            </figure>
          </ng-template>
        </e-carousel-item>
      </e-carousel-items>
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

### Next Button Template

Customize the next navigation button:

```typescript
@Component({
  template: `
    <ejs-carousel>
      <ng-template #nextButtonTemplate>
        <button ejs-button 
                cssClass="e-flat e-round"
                iconCss="e-icons e-chevron-right-double">
        </button>
      </ng-template>
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

### Button Templates with Icons

Create custom styled navigation buttons:

```typescript
@Component({
  template: `
    <ejs-carousel>
      <ng-template #previousButtonTemplate>
        <div class="custom-nav-button">
          <i class="fa fa-arrow-left"></i>
        </div>
      </ng-template>
      <ng-template #nextButtonTemplate>
        <div class="custom-nav-button">
          <i class="fa fa-arrow-right"></i>
        </div>
      </ng-template>
      <!-- carousel items -->
    </ejs-carousel>
  `,
  styles: [`
    .custom-nav-button {
      background: rgba(0, 0, 0, 0.5);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s;
    }
    .custom-nav-button:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  `],
})
export class CarouselComponent {}
```

## Play Button Control

### Show or Hide Play Button

Control auto-play button visibility:

```typescript
@Component({
  template: `
    <ejs-carousel [showPlayButton]="true">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  public showPlayButton = true; // Toggle auto-play control
}
```

**Dependency:** `buttonsVisibility` must not be "Hidden" for play button to appear

### Play Button Template

Customize play/pause button:

```typescript
import { ViewChild } from "@angular/core";
import { CarouselComponent as SyncCarousel } from "@syncfusion/ej2-angular-navigations";

@Component({
  template: `
    <ejs-carousel [showPlayButton]="true" #carousel>
      <ng-template #playButtonTemplate>
        <button class="custom-play-btn"
                (click)="togglePlayPause()">
          {{isPlaying ? 'Pause' : 'Play'}}
        </button>
      </ng-template>
      <!-- carousel items -->
    </ejs-carousel>
  `,
  styles: [`
    .custom-play-btn {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .custom-play-btn:hover {
      background: #0056b3;
    }
  `],
})
export class CarouselComponent {
  @ViewChild("carousel") carousel!: SyncCarousel;
  
  public isPlaying = true;

  togglePlayPause() {
    this.carousel.autoPlay = !this.carousel.autoPlay;
    this.isPlaying = this.carousel.autoPlay;
  }
}
```

### Play Button State Management

Track play/pause state from component:

```typescript
export class CarouselComponent {
  @ViewChild("carousel") carousel!: SyncCarousel;

  public playButtonLabel = "Pause";

  toggleAutoPlay() {
    this.carousel.autoPlay = !this.carousel.autoPlay;
    this.updatePlayButtonLabel();
  }

  private updatePlayButtonLabel() {
    this.playButtonLabel = this.carousel.autoPlay ? "Pause" : "Play";
  }
}
```

## Navigation Best Practices

1. **Button visibility for touch devices:** Use "VisibleOnHover" on desktop, "Visible" on mobile
2. **Indicator clarity:** Choose type based on user need (dots for simple, fraction for position, progress for visual feedback)
3. **Template consistency:** Match button and indicator styling to carousel design
4. **Accessibility:** Ensure buttons have proper contrast and labels for screen readers
5. **Play button dependency:** Keep `showPlayButton` aligned with `autoPlay` setting
