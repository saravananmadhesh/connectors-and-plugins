# API Reference: Methods

## Table of Contents
- [Navigation Methods](#navigation-methods)
- [Playback Methods](#playback-methods)
- [Lifecycle Methods](#lifecycle-methods)

## Navigation Methods

### next()

Navigate to the next slide. If at the last slide and `loop` is enabled, wraps to the first slide.

**Syntax:**
```typescript
carouselRef.value?.next();
```

**Example:**

```vue
<template>
  <div>
    <ejs-carousel ref="carouselRef">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
        <e-carousel-item template='<h3>Slide 4</h3>' />
        <e-carousel-item template='<h3>Slide 5</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <button @click="goNext">Next Slide</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const carouselRef = ref(null);

const goNext = () => {
  carouselRef.value?.next();
};
</script>
```

### prev()

Navigate to the previous slide. If at the first slide and `loop` is enabled, wraps to the last slide.

**Syntax:**
```typescript
carouselRef.value?.prev();
```

**Example:**

```vue
<template>
  <div>
    <ejs-carousel ref="carouselRef">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <button @click="goPrev">Previous Slide</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const carouselRef = ref(null);

const goPrev = () => {
  carouselRef.value?.prev();
};
</script>
```

## Playback Methods

### play()

Start auto-play if currently stopped.

**Syntax:**
```typescript
carouselRef.value?.play();
```

**Example:**

```vue
<template>
  <div>
    <ejs-carousel ref="carouselRef" :autoPlay="false">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <button @click="startAutoPlay">Start Auto Play</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const carouselRef = ref(null);

const startAutoPlay = () => {
  carouselRef.value?.play();
};
</script>
```

### pause()

Pause auto-play if currently running.

**Syntax:**
```typescript
carouselRef.value?.pause();
```

**Example:**

```vue
<template>
  <div>
    <ejs-carousel ref="carouselRef" :autoPlay="true">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <button @click="stopAutoPlay">Pause Auto Play</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const carouselRef = ref(null);

const stopAutoPlay = () => {
  carouselRef.value?.pause();
};
</script>
```

## Lifecycle Methods

### destroy()

Destroy the carousel component and clean up resources. Call this when removing the carousel from the DOM.

**Syntax:**
```typescript
carouselRef.value?.destroy();
```

**Example:**

```vue
<template>
  <div>
    <ejs-carousel v-if="isVisible" ref="carouselRef">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <button @click="removeCarousel">Remove Carousel</button>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const carouselRef = ref(null);
const isVisible = ref(true);

const removeCarousel = () => {
  carouselRef.value?.destroy();
  isVisible.value = false;
};

// Auto-cleanup on component unmount
onBeforeUnmount(() => {
  carouselRef.value?.destroy();
});
</script>
```

## Complete Methods Example

Interactive carousel with all methods:

```vue
<template>
  <div class="carousel-demo">
    <ejs-carousel 
      ref="carouselRef"
      :autoPlay="isPlaying"
      :selectedIndex="currentIndex"
    >
      <e-carousel-items>
        <e-carousel-item template='<div class="slide"><h2>Slide 1</h2></div>' />
        <e-carousel-item template='<div class="slide"><h2>Slide 2</h2></div>' />
        <e-carousel-item template='<div class="slide"><h2>Slide 3</h2></div>' />
        <e-carousel-item template='<div class="slide"><h2>Slide 4</h2></div>' />
        <e-carousel-item template='<div class="slide"><h2>Slide 5</h2></div>' />
      </e-carousel-items>
    </ejs-carousel>

    <div class="controls">
      <button @click="goPrevious" class="btn-nav">← Previous</button>
      <button @click="togglePlayPause" class="btn-play">
        {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
      </button>
      <button @click="goNext" class="btn-nav">Next →</button>
    </div>

    <div class="info">
      <p>Current Slide: {{ currentIndex + 1 }} / 5</p>
      <p>Auto-play: {{ isPlaying ? 'ON' : 'OFF' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const carouselRef = ref(null);
const currentIndex = ref(0);
const isPlaying = ref(true);

const goNext = () => {
  carouselRef.value?.next();
  currentIndex.value = (currentIndex.value + 1) % 5;
};

const goPrevious = () => {
  carouselRef.value?.prev();
  currentIndex.value = (currentIndex.value - 1 + 5) % 5;
};

const togglePlayPause = () => {
  if (isPlaying.value) {
    carouselRef.value?.pause();
    isPlaying.value = false;
  } else {
    carouselRef.value?.play();
    isPlaying.value = true;
  }
};
</script>

<style scoped>
.carousel-demo {
  max-width: 600px;
  margin: 0 auto;
}

.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.btn-nav, .btn-play {
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  transition: all 0.3s;
}

.btn-nav:hover, .btn-play:hover {
  background: #f5f5f5;
}

.info {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}
</style>
```

## Method Reference Table

| Method | Purpose | Returns | Usage |
|--------|---------|---------|-------|
| `next()` | Move to next slide | `void` | `carouselRef.value?.next()` |
| `prev()` | Move to previous slide | `void` | `carouselRef.value?.prev()` |
| `play()` | Start auto-play | `void` | `carouselRef.value?.play()` |
| `pause()` | Stop auto-play | `void` | `carouselRef.value?.pause()` |
| `destroy()` | Clean up and remove | `void` | `carouselRef.value?.destroy()` |

## Best Practices

- Always use optional chaining (`?.`) when calling methods on template refs
- Initialize carousel with `ref="carouselRef"` to access methods
- Call `destroy()` in `onBeforeUnmount()` for proper cleanup
- Use `play()` and `pause()` for manual playback control
- Use `next()` and `prev()` for custom navigation buttons
- Track `selectedIndex` reactively to keep UI in sync with carousel state

## Related References
- [Getting Started](getting-started.md) - Installation and setup
- [API Events](api-events.md) - Respond to carousel events
- [API Properties](api-properties.md) - Configure carousel behavior
