# API Reference: Events

## Table of Contents
- [Slide Changing Event](#slide-changing-event)
- [Slide Changed Event](#slide-changed-event)
- [Event Arguments](#event-arguments)
- [Common Event Patterns](#common-event-patterns)

## Slide Changing Event

The `slideChanging` event fires **before** a slide transition occurs. This is a **cancelable** event.

**Syntax:**
```vue
@slideChanging="onSlideChanging"
```

**Event Arguments:**
- `args.currentSlide` - Index of currently displayed slide (before transition)
- `args.nextSlide` - Index of slide about to display (after transition)
- `args.cancel` - Set to `true` to prevent the slide change

**Example: Preventing Slide Change**

```vue
<template>
  <div>
    <ejs-carousel @slideChanging="onSlideChanging">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
        <e-carousel-item template='<h3>Slide 4</h3>' />
        <e-carousel-item template='<h3>Slide 5</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <p>{{ transitionBlocked ? 'Slide change blocked' : 'Ready' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const transitionBlocked = ref(false);

const onSlideChanging = (args) => {
  // Prevent transition to slide 3
  if (args.nextSlide === 2) {
    args.cancel = true;
    transitionBlocked.value = true;
    setTimeout(() => {
      transitionBlocked.value = false;
    }, 2000);
  }
};
</script>
```

**Example: Pre-loading Content**

```vue
<template>
  <ejs-carousel @slideChanging="preloadNextSlide">
    <e-carousel-items>
      <e-carousel-item 
        v-for="item in items" 
        :key="item.id"
        :template="`<img src='${item.image}' />`"
      />
    </e-carousel-items>
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const items = ref([
  { id: 1, image: 'slide1.jpg' },
  { id: 2, image: 'slide2.jpg' },
  { id: 3, image: 'slide3.jpg' }
]);

const preloadNextSlide = (args) => {
  const nextItem = items.value[args.nextSlide];
  if (nextItem) {
    const img = new Image();
    img.src = nextItem.image;
    console.log(`Preloading image: ${nextItem.image}`);
  }
};
</script>
```

## Slide Changed Event

The `slideChanged` event fires **after** a slide transition completes. This is **non-cancelable**.

**Syntax:**
```vue
@slideChanged="onSlideChanged"
```

**Event Arguments:**
- `args.currentSlide` - Index of currently displayed slide (after transition)
- `args.previousSlide` - Index of previously displayed slide

**Example: Updating UI After Slide Change**

```vue
<template>
  <div>
    <ejs-carousel @slideChanged="onSlideChanged">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
        <e-carousel-item template='<h3>Slide 4</h3>' />
        <e-carousel-item template='<h3>Slide 5</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <div class="slideInfo">
      <span>{{ currentSlideNum }} / 5</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const currentSlideNum = ref(1);

const onSlideChanged = (args) => {
  currentSlideNum.value = args.currentSlide + 1;
  console.log(`Transitioned from slide ${args.previousSlide} to slide ${args.currentSlide}`);
};
</script>
```

**Example: Analytics Tracking**

```vue
<template>
  <ejs-carousel @slideChanged="trackSlideView">
    <e-carousel-items>
      <e-carousel-item template='<h3>Product 1</h3>' />
      <e-carousel-item template='<h3>Product 2</h3>' />
      <e-carousel-item template='<h3>Product 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const viewHistory = ref([]);

const trackSlideView = (args) => {
  const slideView = {
    slideIndex: args.currentSlide,
    timestamp: new Date().toISOString()
  };
  viewHistory.value.push(slideView);
  
  // Send to analytics service
  console.log('Tracked view:', slideView);
};
</script>
```

## Event Arguments

### slideChanging Arguments

```typescript
interface SlideChangingArgs {
  currentSlide: number;      // Current slide index (before change)
  nextSlide: number;         // Next slide index (being transitioned to)
  cancel: boolean;           // Set true to prevent transition
}
```

### slideChanged Arguments

```typescript
interface SlideChangedArgs {
  currentSlide: number;      // Current slide index (after change)
  previousSlide: number;     // Previous slide index
}
```

## Common Event Patterns

### Pattern 1: Dual Event Handlers

Combine both events for complete transition lifecycle:

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
    </e-carousel-items>
  </ejs-carousel>
  <div class="status">{{ transitionStatus }}</div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const transitionStatus = ref('Ready');

const onSlideChanging = (args) => {
  transitionStatus.value = `Transitioning from slide ${args.currentSlide} to slide ${args.nextSlide}...`;
};

const onSlideChanged = (args) => {
  transitionStatus.value = `Now showing slide ${args.currentSlide}`;
};
</script>
```

### Pattern 2: Conditional Transitions

Block transitions based on business logic:

```vue
<template>
  <div>
    <ejs-carousel @slideChanging="validateTransition">
      <e-carousel-items>
        <e-carousel-item template='<h3>Required Info</h3>' />
        <e-carousel-item template='<h3>Payment Details</h3>' />
        <e-carousel-item template='<h3>Confirmation</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const isFormValid = ref(false);
const error = ref('');

const validateTransition = (args) => {
  // Prevent going to next slide until form is valid
  if (args.nextSlide > args.currentSlide && !isFormValid.value) {
    args.cancel = true;
    error.value = 'Please complete the form before proceeding';
  } else {
    error.value = '';
  }
};
</script>
```

### Pattern 3: Synchronized State

Keep component state synchronized with carousel position:

```vue
<template>
  <div>
    <ejs-carousel @slideChanged="updateState">
      <e-carousel-items>
        <e-carousel-item template='<h3>Introduction</h3>' />
        <e-carousel-item template='<h3>Features</h3>' />
        <e-carousel-item template='<h3>Pricing</h3>' />
        <e-carousel-item template='<h3>Contact</h3>' />
      </e-carousel-items>
    </ejs-carousel>

    <!-- Synchronized content -->
    <div class="content">
      <div v-show="activeSection === 'intro'">Introduction content...</div>
      <div v-show="activeSection === 'features'">Features content...</div>
      <div v-show="activeSection === 'pricing'">Pricing content...</div>
      <div v-show="activeSection === 'contact'">Contact content...</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const activeSection = ref('intro');
const sections = ['intro', 'features', 'pricing', 'contact'];

const updateState = (args) => {
  activeSection.value = sections[args.currentSlide];
};
</script>
```

### Pattern 4: Event History Tracking

Track complete slide navigation history:

```vue
<template>
  <div>
    <ejs-carousel @slideChanged="recordNavigation">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>

    <div class="history">
      <h4>Navigation History:</h4>
      <ul>
        <li v-for="(entry, idx) in navigationHistory" :key="idx">
          {{ entry.action }} - Slide {{ entry.slideIndex }} @ {{ entry.time }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const navigationHistory = ref([]);

const recordNavigation = (args) => {
  const direction = args.currentSlide > args.previousSlide ? 'Forward' : 'Backward';
  navigationHistory.value.push({
    action: direction,
    slideIndex: args.currentSlide + 1,
    time: new Date().toLocaleTimeString()
  });
};
</script>
```

## Event Handling Best Practices

- **slideChanging:** Use for validation, preloading, or preventing navigation
- **slideChanged:** Use for tracking, UI updates, or state synchronization
- Always check `args.cancel` is not already `true` before setting it
- Keep event handlers lightweight; move heavy computation elsewhere
- Use `requestAnimationFrame` for DOM updates in events
- Consider debouncing if event fires very frequently

## Related References
- [Getting Started](getting-started.md) - Installation and setup
- [API Methods](api-methods.md) - Control carousel programmatically
- [Animations and Transitions](animations-and-transitions.md) - Animation details
