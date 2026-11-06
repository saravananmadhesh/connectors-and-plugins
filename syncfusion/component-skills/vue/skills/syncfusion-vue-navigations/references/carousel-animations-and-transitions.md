# Animations and Transitions

## Table of Contents
- [Animation Effects](#animation-effects)
- [Setting Intervals Between Slides](#setting-intervals-between-slides)
- [Auto Play Configuration](#auto-play-configuration)
- [Pause on Hover](#pause-on-hover)
- [Looping Slides](#looping-slides)
- [Slide Changing Events](#slide-changing-events)
- [Touch Swipe Control](#touch-swipe-control)
- [Swipe Modes](#swipe-modes)

## Animation Effects

The `animationEffect` property controls the visual transition between slides.

### Fade Animation

Slides fade out and fade in for a smooth transition:

```vue
<template>
  <div class='control-container'>
    <ejs-carousel animationEffect="Fade">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
        <e-carousel-item template='<h3>Slide 4</h3>' />
        <e-carousel-item template='<h3>Slide 5</h3>' />
      </e-carousel-items>
    </ejs-carousel>
  </div>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

### Slide Animation (Default)

Slides move horizontally across the carousel area (default behavior):

```vue
<ejs-carousel animationEffect="Slide">
  <!-- items -->
</ejs-carousel>
```

Or omit the prop entirely since "Slide" is the default.

### Custom Animation

Define custom CSS animations using the `Custom` effect with CSS class:

```vue
<template>
  <ejs-carousel animationEffect="Custom" cssClass="parallax">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style>
.e-carousel.parallax .e-carousel-item {
  animation: parallaxMove 0.5s ease-in-out;
}

@keyframes parallaxMove {
  0% {
    transform: translateX(100%) rotateY(30deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotateY(0);
    opacity: 1;
  }
}
</style>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

## Setting Intervals Between Slides

Control how long each slide displays before transitioning. Intervals are specified in milliseconds.

### Different Intervals Per Item

When using item binding, each item can have its own interval:

```vue
<ejs-carousel>
  <e-carousel-items>
    <e-carousel-item template='<h3>Slide 1 - 3 seconds</h3>' :interval="3000" />
    <e-carousel-item template='<h3>Slide 2 - 1 second</h3>' :interval="1000" />
    <e-carousel-item template='<h3>Slide 3 - 2 seconds</h3>' :interval="2000" />
    <e-carousel-item template='<h3>Slide 4 - 5 seconds</h3>' :interval="5000" />
    <e-carousel-item template='<h3>Slide 5 - 6 seconds</h3>' :interval="6000" />
  </e-carousel-items>
</ejs-carousel>
```

**Default interval:** 5000 ms (5 seconds)

## Auto Play Configuration

### Enable Auto Play

Slides transition automatically using the `autoPlay` property:

```vue
<template>
  <div class='control-container'>
    <ejs-carousel :autoPlay="true">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
        <e-carousel-item template='<h3>Slide 4</h3>' />
        <e-carousel-item template='<h3>Slide 5</h3>' />
      </e-carousel-items>
    </ejs-carousel>
  </div>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

**Default:** `:autoPlay="false"`

### Disable Auto Play

```vue
<ejs-carousel :autoPlay="false">
  <!-- Manual navigation only -->
</ejs-carousel>
```

## Pause on Hover

By default, auto-play pauses when the user hovers over the carousel. Control this with `pauseOnHover`:

### Enable Pause on Hover (Default)

```vue
<ejs-carousel :autoPlay="true" :pauseOnHover="true">
  <!-- Auto-play stops on hover, resumes when mouse leaves -->
</ejs-carousel>
```

### Disable Pause on Hover

Keep auto-play running even when hovering:

```vue
<template>
  <div class='control-container'>
    <ejs-carousel :autoPlay="true" :pauseOnHover="false">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
        <e-carousel-item template='<h3>Slide 4</h3>' />
        <e-carousel-item template='<h3>Slide 5</h3>' />
      </e-carousel-items>
    </ejs-carousel>
  </div>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

## Looping Slides

Control whether slides repeat infinitely or stop at the end.

### Enable Loop (Default)

```vue
<ejs-carousel :loop="true">
  <!-- After last slide, returns to first slide -->
</ejs-carousel>
```

### Disable Loop

```vue
<template>
  <div class='control-container'>
    <ejs-carousel :loop="false">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
  </div>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

**Behavior:**
- With `:loop="true"`: Next button on last slide goes to first slide
- With `:loop="false"`: Next button disabled on last slide; auto-play stops

## Slide Changing Events

Listen to slide transitions using `slideChanging` and `slideChanged` events:

```vue
<template>
  <ejs-carousel 
    @slideChanging="onSlideChanging" 
    @slideChanged="onSlideChanged"
  >
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
      <e-carousel-item template='<h3>Slide 4</h3>' />
      <e-carousel-item template='<h3>Slide 5</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const onSlideChanging = (args) => {
  console.log('About to change to slide:', args.nextSlide);
  // Perform actions before slide change (preload images, etc.)
}

const onSlideChanged = (args) => {
  console.log('Changed to slide:', args.currentSlide);
  // Perform actions after slide change (update UI, log analytics, etc.)
}
</script>
```

**Event Properties:**
- `args.currentSlide` - Current slide index
- `args.nextSlide` - Next slide index (in slideChanging)

## Touch Swipe Control

Enable or disable touch swipe gestures using the `enableTouchSwipe` property:

### Enable Touch Swipe (Default)

```vue
<ejs-carousel :enableTouchSwipe="true">
  <!-- Users can swipe left/right to navigate -->
</ejs-carousel>
```

### Disable Touch Swipe

```vue
<template>
  <div class='control-container'>
    <ejs-carousel :enableTouchSwipe="false">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
  </div>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

## Swipe Modes

The `swipeMode` property defines which input types trigger slide transitions using bitwise operators:

### Touch Only

```vue
<template>
  <ejs-carousel :swipeMode="1">
    <!-- Touch gestures work, mouse drag does not -->
  </ejs-carousel>
</template>
```

### Mouse Only

```vue
<ejs-carousel :swipeMode="2">
  <!-- Mouse drag works, touch gestures do not -->
</ejs-carousel>
```

### Touch and Mouse (Default)

```vue
<ejs-carousel :swipeMode="3">
  <!-- Both touch and mouse drag work -->
</ejs-carousel>
```

### Disable Both

```vue
<ejs-carousel :swipeMode="0">
  <!-- No swipe/drag navigation -->
</ejs-carousel>
```

**Note:** Swipe mode is separate from button navigation. Disabling swipe modes doesn't affect prev/next buttons or keyboard navigation.

## Best Practices

- **Auto-play:** Use 5-10 seconds per slide for readability
- **Animations:** Fade for clean transitions, Slide for directional clarity
- **Mobile:** Enable touch swipe with Touch or Touch & Mouse mode
- **Events:** Use slideChanged for analytics, slideChanging for validation
- **Loop:** Disable for ordered content; enable for decorative galleries
