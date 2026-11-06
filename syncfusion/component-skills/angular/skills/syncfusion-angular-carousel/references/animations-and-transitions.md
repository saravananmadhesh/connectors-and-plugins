# Animations and Transitions

## Table of Contents
- [Animation Effects](#animation-effects)
- [Transition Timing](#transition-timing)
- [Auto-Play Control](#auto-play-control)
- [Event Handling](#event-handling)
- [Swipe and Touch](#swipe-and-touch)

## Animation Effects

### No Animation (None)

Slides change instantly without any animation effect:

```typescript
import { Component } from "@angular/core";
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";
import { CarouselAnimationEffect } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CarouselModule],
  template: `
    <div style="height: 400px;">
      <ejs-carousel [animationEffect]="'None'">
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
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="https://ej2.syncfusion.com/products/images/carousel/hunei.png"
                     alt="Kingfisher"
                     style="height:100%;width:100%;" />
              </figure>
            </ng-template>
          </e-carousel-item>
        </e-carousel-items>
      </ejs-carousel>
    </div>
  `,
})
export class CarouselComponent {
  public animationEffect: CarouselAnimationEffect = "None";
}
```

**Use case:** Fast slide transitions without animation overhead, ideal for rapid navigation or simple galleries

### Slide Animation (Default)

Slides move horizontally from one position to another:

```typescript
import { Component } from "@angular/core";
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";
import { CarouselAnimationEffect } from "@syncfusion/ej2-angular-navigations";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CarouselModule],
  template: `
    <div style="height: 400px;">
      <ejs-carousel [animationEffect]="animationEffect">
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
          <e-carousel-item>
            <ng-template #template>
              <figure class="img-container">
                <img src="https://ej2.syncfusion.com/products/images/carousel/hunei.png"
                     alt="Kingfisher"
                     style="height:100%;width:100%;" />
              </figure>
            </ng-template>
          </e-carousel-item>
        </e-carousel-items>
      </ejs-carousel>
    </div>
  `,
})
export class CarouselComponent {
  public animationEffect: CarouselAnimationEffect = "Slide";
}
```

### Fade Animation

Current slide fades out while next slide fades in:

```typescript
@Component({
  template: `
    <ejs-carousel [animationEffect]="'Fade'">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

**Use case:** Elegant transitions for image galleries or photo galleries

### Custom Animation

Apply custom CSS animation effects:

```typescript
@Component({
  template: `
    <ejs-carousel [animationEffect]="'Custom'" cssClass="parallax-carousel">
      <!-- carousel items -->
    </ejs-carousel>
  `,
  styles: [`
    :host ::ng-deep .parallax-carousel {
      /* Custom animation styles applied here */
    }
    :host ::ng-deep .parallax-carousel .e-carousel-item {
      animation: parallax 0.6s ease-in-out;
    }
    
    @keyframes parallax {
      0% {
        opacity: 0;
        transform: translateX(30px) scale(0.95);
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }
  `],
})
export class CarouselComponent {}
```

### Switch Animation Effect

Toggle between animations:

```typescript
@Component({
  template: `
    <div class="controls">
      <button (click)="animationEffect = 'Slide'">Slide</button>
      <button (click)="animationEffect = 'Fade'">Fade</button>
      <button (click)="animationEffect = 'Custom'">Custom</button>
    </div>
    <ejs-carousel [animationEffect]="animationEffect">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  public animationEffect: CarouselAnimationEffect = "Slide";
}
```

## Transition Timing

### Configure Auto-Play Interval

Set the time each slide displays (in milliseconds):

```typescript
@Component({
  template: `
    <ejs-carousel [autoPlay]="true" [interval]="4000">
      <!-- carousel items display for 4 seconds each -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

### Per-Item Intervals

Each carousel item can have its own display duration:

```typescript
@Component({
  template: `
    <ejs-carousel>
      <e-carousel-items>
        <e-carousel-item [interval]="2000">
          <ng-template #template>
            <div class="slide">Quick slide (2 sec)</div>
          </ng-template>
        </e-carousel-item>
        <e-carousel-item [interval]="4000">
          <ng-template #template>
            <div class="slide">Medium slide (4 sec)</div>
          </ng-template>
        </e-carousel-item>
        <e-carousel-item [interval]="6000">
          <ng-template #template>
            <div class="slide">Longer slide (6 sec)</div>
          </ng-template>
        </e-carousel-item>
      </e-carousel-items>
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

**Note:** Per-item intervals require item directives; not available with dataSource binding

### Dynamic Interval Adjustment

Change intervals programmatically:

```typescript
export class CarouselComponent {
  public interval = 5000;

  setFastSpeed() {
    this.interval = 2000; // 2 seconds
  }

  setNormalSpeed() {
    this.interval = 5000; // 5 seconds
  }

  setSlowSpeed() {
    this.interval = 8000; // 8 seconds
  }
}
```

## Auto-Play Control

### Enable/Disable Auto-Play

Control automatic slide progression:

```typescript
@Component({
  template: `
    <div class="controls">
      <button (click)="autoPlay = true">Start</button>
      <button (click)="autoPlay = false">Stop</button>
    </div>
    <ejs-carousel [autoPlay]="autoPlay">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  public autoPlay = true;
}
```

### Pause on Hover

Automatically pause when user hovers over carousel (enabled by default):

```typescript
@Component({
  template: `
    <ejs-carousel [pauseOnHover]="true">
      <!-- carousel pauses when hovering -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

### Disable Pause on Hover

Continue auto-play during hover:

```typescript
@Component({
  template: `
    <ejs-carousel [pauseOnHover]="false">
      <!-- carousel continues during hover -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

### Looping Control

Enable or disable infinite slide cycling:

```typescript
@Component({
  template: `
    <ejs-carousel [loop]="true">
      <!-- loops back to first slide after last -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  public loop = true; // Enable continuous looping
}
```

**With loop=false:** Last slide is the end; next button disabled at last slide

## Event Handling

### Listen to Slide Transitions

Capture events before and after slide changes:

```typescript
import { Component } from "@angular/core";
import { SlideChangingEventArgs, SlideChangedEventArgs } from "@syncfusion/ej2-angular-navigations";

@Component({
  template: `
    <ejs-carousel (slideChanging)="onSlideChanging($event)"
                   (slideChanged)="onSlideChanged($event)">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  onSlideChanging(args: SlideChangingEventArgs) {
    console.log("Transitioning from slide", args.currentIndex, "to", args.nextIndex);
    // Perform any setup before slide change
  }

  onSlideChanged(args: SlideChangedEventArgs) {
    console.log("Transitioned to slide", args.currentIndex);
    // Perform any cleanup after slide change
  }
}
```

### Event Arguments Reference

#### SlideChangingEventArgs (Before Transition)

Triggered before a slide change occurs. Can be cancelled to prevent transition.

**Available Properties:**
```typescript
{
  cancel: boolean;                      // Set to true to prevent slide change
  currentIndex: number;                 // Current slide index (0-based)
  currentSlide: HTMLElement;            // DOM element of current slide
  nextIndex: number;                    // Index of slide about to display
  nextSlide: HTMLElement;               // DOM element of next slide
  isSwiped: boolean;                    // Whether transition triggered by swipe/drag
  slideDirection: 'Next' | 'Previous';  // Direction of transition
  name: string;                         // Event name: 'slideChanging'
}
```

#### SlideChangedEventArgs (After Transition)

Triggered after slide change completes.

**Available Properties:**
```typescript
{
  currentIndex: number;                 // Current slide index (0-based)
  currentSlide: HTMLElement;            // DOM element of current slide
  previousIndex: number;                // Index of previous slide
  previousSlide: HTMLElement;           // DOM element of previous slide
  isSwiped: boolean;                    // Whether transition triggered by swipe/drag
  slideDirection: 'Next' | 'Previous';  // Direction of transition
  name: string;                         // Event name: 'slideChanged'
}
```

### Track Current Slide Index

Update component state when slide changes:

```typescript
export class CarouselComponent {
  public currentSlideIndex = 0;

  onSlideChanged(args: SlideChangedEventArgs) {
    this.currentSlideIndex = args.currentSlide;
    console.log(`Now viewing slide ${this.currentSlideIndex + 1}`);
  }
}
```

### Cancel Slide Transition

Prevent slide change in slideChanging event:

```typescript
export class CarouselComponent {
  onSlideChanging(args: SlideChangingEventArgs) {
    // Example: Prevent transition if form has unsaved changes
    if (this.hasUnsavedChanges) {
      args.cancel = true;
      console.log("Slide change prevented due to unsaved changes");
    }
  }

  private hasUnsavedChanges = false;
}
```

### Custom Actions on Slide Change

Execute logic when specific slides load:

```typescript
export class CarouselComponent {
  onSlideChanged(args: SlideChangedEventArgs) {
    const currentSlide = args.currentSlide;

    if (currentSlide === 0) {
      // First slide logic
      console.log("Loading first slide");
    } else if (currentSlide === this.totalSlides - 1) {
      // Last slide logic
      console.log("Loading last slide");
    }
  }

  private totalSlides = 5;
}
```

## Swipe and Touch

### Enable Touch Swipe

Allow swiping to change slides on touch devices (enabled by default):

```typescript
@Component({
  template: `
    <ejs-carousel [enableTouchSwipe]="true">
      <!-- users can swipe to navigate -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

### Disable Touch Swipe

Prevent swiping navigation:

```typescript
@Component({
  template: `
    <ejs-carousel [enableTouchSwipe]="false">
      <!-- swipe navigation disabled -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {}
```

### Configure Swipe Modes

Control which input methods (touch/mouse) trigger slide transitions:

```typescript
import { CarouselSwipeMode } from "@syncfusion/ej2-angular-navigations";

@Component({
  template: `
    <ejs-carousel [swipeMode]="swipeMode">
      <!-- carousel items -->
    </ejs-carousel>
  `,
})
export class CarouselComponent {
  // Touch only
  public swipeMode1 = CarouselSwipeMode.Touch;

  // Mouse only
  public swipeMode2 = CarouselSwipeMode.Mouse;

  // Both touch and mouse
  public swipeMode3 = CarouselSwipeMode.Touch & CarouselSwipeMode.Mouse;

  // Disable both
  public swipeMode4 = ~CarouselSwipeMode.Touch & ~CarouselSwipeMode.Mouse;

  // Default (all modes enabled)
  public swipeMode = this.swipeMode3;
}
```

**Swipe Mode Options:**

| Mode | Behavior |
|------|----------|
| `CarouselSwipeMode.Touch` | Swipe transitions via touch only |
| `CarouselSwipeMode.Mouse` | Drag transitions via mouse only |
| `Touch & Mouse` | Both touch and mouse trigger transitions |
| `~Touch & ~Mouse` | Disable all swipe/drag interactions |

### Responsive Swipe Configuration

Enable different swipe modes based on device:

```typescript
export class CarouselComponent implements OnInit {
  public swipeMode: CarouselSwipeMode;

  ngOnInit() {
    if (this.isTouchDevice()) {
      this.swipeMode = CarouselSwipeMode.Touch;
    } else {
      this.swipeMode = CarouselSwipeMode.Mouse;
    }
  }

  private isTouchDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
  }
}
```

## Animation Best Practices

1. **Choose animation based on content:** Slide for continuous flow, Fade for artistic galleries
2. **Balance intervals:** Too fast = hard to read, too slow = boring (3-5 seconds ideal)
3. **Pause on hover:** Enable for content users might want to read
4. **Swipe support:** Always enable for mobile users
5. **Event handlers:** Use slideChanged for analytics or state updates, slideChanging for validation
