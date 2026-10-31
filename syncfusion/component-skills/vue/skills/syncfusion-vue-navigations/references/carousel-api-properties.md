# API Reference: Properties

## Table of Contents
- [Data Properties](#data-properties)
- [Animation & Timing](#animation--timing)
- [Navigation & Indicators](#navigation--indicators)
- [Templates & Rendering](#templates--rendering)
- [Interaction Properties](#interaction-properties)
- [Layout & Display](#layout--display)
- [Accessibility Properties](#accessibility-properties)

## Data Properties

### items
**Type:** `Array<any>`  
**Default:** `[]`

Array of carousel items. Each item can contain any object structure. Use with `itemTemplate` for custom rendering.

```vue
<script setup>
const items = ref([
  { id: 1, title: 'Slide 1' },
  { id: 2, title: 'Slide 2' },
  { id: 3, title: 'Slide 3' }
]);
</script>

<template>
  <ejs-carousel :dataSource="items">
    <e-carousel-items />
  </ejs-carousel>
</template>
```

### selectedIndex
**Type:** `number`  
**Default:** `0`

Zero-based index of the currently displayed slide. Binding this reactively changes the slide.

```vue
<template>
  <div>
    <ejs-carousel :selectedIndex="activeSlide">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <button @click="activeSlide = 0">First</button>
    <button @click="activeSlide = 1">Second</button>
    <button @click="activeSlide = 2">Third</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const activeSlide = ref(0);
</script>
```

## Animation & Timing

### animationEffect
**Type:** `"Slide" | "Fade" | "Custom"`  
**Default:** `"Slide"`

Visual transition effect between slides.

```vue
<ejs-carousel animationEffect="Fade">
  <!-- Fade transition -->
</ejs-carousel>

<ejs-carousel animationEffect="Slide">
  <!-- Horizontal slide -->
</ejs-carousel>

<ejs-carousel animationEffect="Custom" cssClass="parallax">
  <!-- Custom CSS animation -->
</ejs-carousel>
```

### interval
**Type:** `number`  
**Default:** `5000`

Milliseconds before transitioning to next slide (for each `<e-carousel-item>` child).

```vue
<ejs-carousel>
  <e-carousel-items>
    <e-carousel-item template='...' :interval="3000" />
    <e-carousel-item template='...' :interval="5000" />
    <e-carousel-item template='...' :interval="2000" />
  </e-carousel-items>
</ejs-carousel>
```

### autoPlay
**Type:** `boolean`  
**Default:** `false`

Enable automatic slide transitions.

```vue
<ejs-carousel :autoPlay="true">
  <!-- Slides transition automatically -->
</ejs-carousel>
```

### pauseOnHover
**Type:** `boolean`  
**Default:** `true`

When `autoPlay` is enabled, pause transitions when user hovers over carousel.

```vue
<ejs-carousel :autoPlay="true" :pauseOnHover="true">
  <!-- Auto-play pauses on hover -->
</ejs-carousel>

<ejs-carousel :autoPlay="true" :pauseOnHover="false">
  <!-- Auto-play continues during hover -->
</ejs-carousel>
```

## Navigation & Indicators

### buttonsVisibility
**Type:** `"Hidden" | "Visible" | "VisibleOnHover"`  
**Default:** `"Visible"`

Controls when next/previous buttons appear.

```vue
<ejs-carousel buttonsVisibility="Hidden">
  <!-- No navigation buttons -->
</ejs-carousel>

<ejs-carousel buttonsVisibility="Visible">
  <!-- Always show buttons -->
</ejs-carousel>

<ejs-carousel buttonsVisibility="VisibleOnHover">
  <!-- Show buttons only on hover -->
</ejs-carousel>
```

### indicatorsType
**Type:** `"Default" | "Dynamic" | "Fraction" | "Progress"`  
**Default:** `"Default"`

Visual indicator style for current slide position.

```vue
<!-- Default: Dot indicators at bottom -->
<ejs-carousel indicatorsType="Default">
  <!-- ● ○ ○ ○ ○ -->
</ejs-carousel>

<!-- Dynamic: Larger active indicator -->
<ejs-carousel indicatorsType="Dynamic">
  <!-- Shows preview on hover -->
</ejs-carousel>

<!-- Fraction: Slide number display -->
<ejs-carousel indicatorsType="Fraction">
  <!-- 1/5, 2/5, etc. -->
</ejs-carousel>

<!-- Progress: Visual progress bar -->
<ejs-carousel indicatorsType="Progress">
  <!-- ████░░░░░ -->
</ejs-carousel>
```

### showPlayButton
**Type:** `boolean`  
**Default:** `false`

Display a play/pause button in the carousel controls.

```vue
<ejs-carousel :showPlayButton="true" :autoPlay="true">
  <!-- Shows play/pause button -->
</ejs-carousel>
```

### loop
**Type:** `boolean`  
**Default:** `true`

When reaching the last slide, loop back to first slide with next button.

```vue
<ejs-carousel :loop="true">
  <!-- Slides loop infinitely -->
</ejs-carousel>

<ejs-carousel :loop="false">
  <!-- Carousel stops at last slide -->
</ejs-carousel>
```

## Templates & Rendering

### itemTemplate
**Type:** `function | string`  
**Default:** `null`

Custom template function for rendering carousel items. Receives item data object as parameter.

```vue
<template>
  <ejs-carousel :dataSource="products" :itemTemplate="renderProduct">
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
  { id: 1, image: 'product1.jpg', title: 'Product 1' },
  { id: 2, image: 'product2.jpg', title: 'Product 2' },
  { id: 3, image: 'product3.jpg', title: 'Product 3' }
]);

const renderProduct = (props) => {
  return `
    <div class="product-item">
      <img src="${props.image}" alt="${props.title}" />
      <h4>${props.title}</h4>
    </div>
  `;
};
</script>
```

### indicatorsTemplate
**Type:** `function | string`  
**Default:** `null`

Custom template for indicator elements.

```vue
<template>
  <ejs-carousel :indicatorsTemplate="renderIndicator">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<script setup>
const renderIndicator = (props) => {
  return `<button class="indicator" data-index="${props.index}"></button>`;
};
</script>
```

## Interaction Properties

### enableTouchSwipe
**Type:** `boolean`  
**Default:** `true`

Enable or disable touch swipe navigation on mobile devices.

```vue
<ejs-carousel :enableTouchSwipe="true">
  <!-- Touch swipe enabled -->
</ejs-carousel>
```

### swipeMode
**Type:** `number`  
**Default:** `3`

Define which input types support swipe/drag navigation:
- `0`: Disabled
- `1`: Touch only
- `2`: Mouse only
- `3`: Touch and Mouse

```vue
<ejs-carousel :swipeMode="1">
  <!-- Touch gestures only -->
</ejs-carousel>

<ejs-carousel :swipeMode="3">
  <!-- Both touch and mouse drag -->
</ejs-carousel>
```

## Layout & Display

### height
**Type:** `number | string`  
**Default:** `auto`

Carousel container height in pixels or CSS units.

```vue
<ejs-carousel height="400px">
  <!-- 400px height -->
</ejs-carousel>

<ejs-carousel :height="400">
  <!-- 400px height -->
</ejs-carousel>
```

### width
**Type:** `number | string`  
**Default:** `"100%"`

Carousel container width in pixels or percentage.

```vue
<ejs-carousel width="600px">
  <!-- 600px width -->
</ejs-carousel>

<ejs-carousel width="80%">
  <!-- 80% of parent container -->
</ejs-carousel>
```

### partialVisible
**Type:** `boolean`  
**Default:** `false`

Display partial portions of adjacent slides for preview.

```vue
<ejs-carousel :partialVisible="true">
  <!-- Shows edge of next slide -->
</ejs-carousel>
```

### cssClass
**Type:** `string`  
**Default:** `""`

Additional CSS class applied to carousel root element for styling customization.

```vue
<ejs-carousel cssClass="dark-theme premium-carousel">
  <!-- Custom classes for styling -->
</ejs-carousel>
```

## Accessibility Properties

### ariaLabel
**Type:** `string`  
**Default:** `"Carousel"`

ARIA label for screen readers.

```vue
<ejs-carousel ariaLabel="Product Gallery Carousel">
  <!-- Accessible description for screen readers -->
</ejs-carousel>
```

### role
**Type:** `string`  
**Default:** `"region"`

ARIA role for semantic HTML.

```vue
<ejs-carousel role="region">
  <!-- Semantic HTML structure -->
</ejs-carousel>
```

## Property Binding Examples

### Complete Configuration

```vue
<template>
  <ejs-carousel
    :selectedIndex="currentSlide"
    :dataSource="galleryItems"
    :itemTemplate="itemTemplate"
    animationEffect="Fade"
    :autoPlay="true"
    :pauseOnHover="true"
    :loop="true"
    buttonsVisibility="Visible"
    indicatorsType="Dynamic"
    :showPlayButton="true"
    :enableTouchSwipe="true"
    :swipeMode="3"
    height="500px"
    width="100%"
    :partialVisible="false"
    cssClass="custom-carousel"
    ariaLabel="Featured Products"
    @slideChanged="onSlideChanged"
  >
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const currentSlide = ref(0);
const galleryItems = ref([
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, title: 'Item 3' }
]);

const itemTemplate = (props) => {
  return `<h3>${props.title}</h3>`;
};

const onSlideChanged = (args) => {
  currentSlide.value = args.currentSlide;
};
</script>
```

## Related References
- [Getting Started](getting-started.md) - Installation and setup
- [Populating Items](populating-items.md) - Data binding patterns
- [API Methods](api-methods.md) - Available methods
- [API Events](api-events.md) - Event handling
