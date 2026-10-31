# Navigators and Indicators

## Table of Contents
- [Navigators Overview](#navigators-overview)
- [Navigator Button Visibility Modes](#navigator-button-visibility-modes)
- [Custom Navigator Templates](#custom-navigator-templates)
- [Indicators Overview](#indicators-overview)
- [Indicator Types](#indicator-types)
- [Indicator Templates](#indicator-templates)
- [Play Button Control](#play-button-control)

## Navigators Overview

The navigators are previous and next buttons that allow users to manually transition between slides. Control their visibility and appearance using the `buttonsVisibility` property and template customization.

## Navigator Button Visibility Modes

The `buttonsVisibility` property controls when the previous/next buttons appear:

### Mode 1: Always Hidden

```vue
<template>
  <div class='control-container'>
    <ejs-carousel buttonsVisibility="Hidden">
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

### Mode 2: Always Visible

```vue
<ejs-carousel buttonsVisibility="Visible">
  <e-carousel-items>
    <!-- items -->
  </e-carousel-items>
</ejs-carousel>
```

Buttons remain visible at all times, allowing continuous manual navigation.

### Mode 3: Visible on Hover

```vue
<ejs-carousel buttonsVisibility="VisibleOnHover">
  <e-carousel-items>
    <!-- items -->
  </e-carousel-items>
</ejs-carousel>
```

Buttons only appear when the user hovers over the carousel, reducing visual clutter on desktop while keeping navigation available on mobile.

## Custom Navigator Templates

Customize the appearance of previous and next buttons using slots:

```vue
<template>
  <div class='control-container'>
    <ejs-carousel buttonsVisibility="Visible">
      <template #previousButtonTemplate>
        <button class="custom-prev-btn">
          <span class="e-icons e-chevron-left-double"></span> Prev
        </button>
      </template>

      <template #nextButtonTemplate>
        <button class="custom-next-btn">
          Next <span class="e-icons e-chevron-right-double"></span>
        </button>
      </template>

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

**Available icons:** Use Syncfusion icon classes like `e-chevron-left`, `e-arrow-left`, `e-chevron-right`, `e-arrow-right`, or any custom SVG.

## Indicators Overview

Indicators show the current slide position and allow click-to-navigate to specific slides. Control indicators with `showIndicators` property (default: `true`).

### Show or Hide Indicators

```vue
<ejs-carousel :showIndicators="true">
  <e-carousel-items>
    <!-- items -->
  </e-carousel-items>
</ejs-carousel>
```

Set `:showIndicators="false"` to hide indicators completely.

## Indicator Types

Choose from four indicator types using the `indicatorsType` property:

### Type 1: Default Indicator

A set of dots representing each slide:

```vue
<ejs-carousel indicatorsType="Default">
  <e-carousel-items>
    <e-carousel-item template='<h3>Slide 1</h3>' />
    <e-carousel-item template='<h3>Slide 2</h3>' />
    <e-carousel-item template='<h3>Slide 3</h3>' />
    <e-carousel-item template='<h3>Slide 4</h3>' />
    <e-carousel-item template='<h3>Slide 5</h3>' />
  </e-carousel-items>
</ejs-carousel>
```

### Type 2: Dynamic Indicator

Dynamically styled dots that visually respond to slide position:

```vue
<ejs-carousel indicatorsType="Dynamic">
  <e-carousel-items>
    <!-- items -->
  </e-carousel-items>
</ejs-carousel>
```

### Type 3: Fraction Indicator

Displays current slide and total count as a fraction (e.g., "2/5"):

```vue
<ejs-carousel indicatorsType="Fraction">
  <e-carousel-items>
    <!-- items -->
  </e-carousel-items>
</ejs-carousel>
```

### Type 4: Progress Indicator

Shows a progress bar representing completion through slides:

```vue
<ejs-carousel indicatorsType="Progress">
  <e-carousel-items>
    <!-- items -->
  </e-carousel-items>
</ejs-carousel>
```

## Indicator Templates

### Custom Indicator Template

Customize indicator appearance using the slot:

```vue
<template>
  <ejs-carousel>
    <template #indicatorsTemplate="{ index }">
      <div class="indicator" :data-indicator-index="index"></div>
    </template>

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
</script>
```

### Indicator Template with Preview Images

Show thumbnail previews in indicators:

```vue
<template>
  <ejs-carousel>
    <template #indicatorsTemplate="{ index }">
      <div class="indicator" :data-indicator-index="index">
        <div class="preview-content">{{ slides[index] }}</div>
      </div>
    </template>

    <e-carousel-items>
      <e-carousel-item template='<div class="slide-content">Slide 1</div>' />
      <e-carousel-item template='<div class="slide-content">Slide 2</div>' />
      <e-carousel-item template='<div class="slide-content">Slide 3</div>' />
      <e-carousel-item template='<div class="slide-content">Slide 4</div>' />
      <e-carousel-item template='<div class="slide-content">Slide 5</div>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const slides = ref(["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"]);
</script>
```

## Play Button Control

### Show or Hide Play Button

The `showPlayButton` property adds a play/pause button to control auto-play:

```vue
<template>
  <div class='control-container'>
    <ejs-carousel :showPlayButton="true">
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

**Note:** Requires `buttonsVisibility` to be set (at least "Visible" or "VisibleOnHover").

### Custom Play Button Template

Customize the play/pause button:

```vue
<template>
  <div class='control-container'>
    <ejs-carousel 
      :showPlayButton="true" 
      :autoPlay="isPlaying"
      buttonsVisibility="Visible"
    >
      <template #playButtonTemplate>
        <button @click="togglePlay" class="e-btn e-info playBtn">
          {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
        </button>
      </template>

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
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const isPlaying = ref(true);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
}
</script>
```

## Best Practices

- **Desktop:** Use "VisibleOnHover" to keep interface clean while providing navigation
- **Mobile:** Use "Visible" since hover doesn't work on touch devices
- **Accessibility:** Always include either indicators or play button for non-disabled users
- **Customization:** Templates allow complete UI control while maintaining functionality
