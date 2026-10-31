# Card Layouts & Customization (Vue 3)

## Table of Contents
- [Horizontal Layout](#horizontal-layout)
- [Stacked Sections](#stacked-sections)
- [Image Title Position Classes](#image-title-position-classes)
- [Advanced Custom Styling with Reactive State](#advanced-custom-styling-with-reactive-state)
- [Card Grid Layout Patterns](#card-grid-layout-patterns)
- [Responsive Card Patterns](#responsive-card-patterns)
- [Tips & Best Practices](#tips--best-practices)

## Horizontal Layout

The horizontal layout places an image side-by-side with content, ideal for product cards, team listings, and compact previews.

### Basic Horizontal Card

```vue
<template>
  <div class="e-card e-card-horizontal" style="width: 400px;">
    <img
      src="./product.jpg"
      alt="Product"
      style="width: 150px; height: 150px; object-fit: cover;"
    />
    <div class="e-card-stacked">
      <div class="e-card-header-title">Philips Trimmer</div>
      <div class="e-card-content">Premium quality product.</div>
      <div class="e-card-actions">
        <button class="e-card-btn" style="flex: 1;">View</button>
        <button class="e-card-btn" style="flex: 1;">Buy Now</button>
      </div>
    </div>
  </div>
</template>
```

### Horizontal Card with Header Image

```vue
<template>
  <div class="e-card e-card-horizontal" style="width: 400px;">
    <div
      class="e-card-header-image e-card-corner"
      :style="{
        backgroundImage: 'url(./avatar.jpg)',
        width: '120px',
        height: '120px',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    ></div>
    <div class="e-card-stacked">
      <div class="e-card-header">
        <div class="e-card-header-caption">
          <div class="e-card-header-title">John Smith</div>
          <div class="e-card-sub-title">Senior Developer</div>
        </div>
      </div>
      <div class="e-card-content">
        <p>10+ years building web applications.</p>
      </div>
    </div>
  </div>
</template>
```

## Stacked Sections

The `e-card-stacked` class groups content sections that should appear on the right side of a horizontal card. Without it, content may not align properly.

### Why Use e-card-stacked

- **Without it**: Content renders inline next to the image, causing layout issues
- **With it**: Content stacks vertically in a contained area next to the image

### Stacked Content with Multiple Sections

```vue
<template>
  <div class="e-card e-card-horizontal">
    <img src="./book.jpg" alt="Book" style="width: 120px; height: 180px; object-fit: cover;" />
    <div class="e-card-stacked">
      <div class="e-card-header-title">The Pragmatic Programmer</div>
      <div class="e-card-sub-title">by David Thomas, Andrew Hunt</div>
      <div class="e-card-separator"></div>
      <div class="e-card-content">
        <p>A classic guide to software craftsmanship covering topics from personal responsibility to pragmatic methodologies.</p>
      </div>
      <div class="e-card-actions">
        <button class="e-card-btn" style="flex: 1;">Preview</button>
        <button class="e-card-btn" style="flex: 1;">Buy</button>
      </div>
    </div>
  </div>
</template>
```

## Image Title Position Classes

The `e-card-title` can be positioned in any corner of the image using utility classes:

| Class | Position |
|-------|----------|
| `e-card-bottom-left` | Bottom-left corner (default) |
| `e-card-bottom-right` | Bottom-right corner |
| `e-card-top-left` | Top-left corner |
| `e-card-top-right` | Top-right corner |

### Multi-Card Layout with Position Variations

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
    <div class="e-card">
      <div class="e-card-image" :style="{ backgroundImage: 'url(./photo1.jpg)', height: '180px' }">
        <div class="e-card-title e-card-top-left">Top Left</div>
      </div>
    </div>
    <div class="e-card">
      <div class="e-card-image" :style="{ backgroundImage: 'url(./photo2.jpg)', height: '180px' }">
        <div class="e-card-title e-card-top-right">Top Right</div>
      </div>
    </div>
    <div class="e-card">
      <div class="e-card-image" :style="{ backgroundImage: 'url(./photo3.jpg)', height: '180px' }">
        <div class="e-card-title e-card-bottom-left">Bottom Left</div>
      </div>
    </div>
    <div class="e-card">
      <div class="e-card-image" :style="{ backgroundImage: 'url(./photo4.jpg)', height: '180px' }">
        <div class="e-card-title e-card-bottom-right">Bottom Right</div>
      </div>
    </div>
  </div>
</template>
```

## Advanced Custom Styling with Reactive State

Use Vue's reactive state to drive dynamic card styling.

### Theme Switcher Card

```vue
<template>
  <div :class="['e-card', isDark ? 'e-card-dark' : 'e-card-light']" style="max-width: 320px;">
    <div class="e-card-header">
      <div class="e-card-header-caption">
        <div class="e-card-header-title">Theme Preview</div>
        <div class="e-card-sub-title">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</div>
      </div>
    </div>
    <div class="e-card-content">
      <p>Card content adapts to the selected theme.</p>
    </div>
    <div class="e-card-actions">
      <button class="e-card-btn" @click="toggleTheme">
        Switch to {{ isDark ? 'Light' : 'Dark' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDark = ref(false);
const toggleTheme = () => { isDark.value = !isDark.value; };
</script>

<style scoped>
.e-card-light { background: #ffffff; color: #1a1a1a; }
.e-card-dark { background: #1a1a1a; color: #ffffff; }
</style>
```

### Interactive Favorite Card

```vue
<template>
  <div class="e-card" style="max-width: 280px;">
    <div
      class="e-card-image"
      :style="{
        backgroundImage: 'url(./product.jpg)',
        height: '200px'
      }"
    >
      <button
        @click="toggleFavorite"
        :style="{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          fontSize: '20px'
        }"
      >
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>
    <div class="e-card-header-title">{{ productName }}</div>
    <div class="e-card-sub-title">${{ price }}</div>
    <div class="e-card-actions">
      <button
        class="e-card-btn"
        :style="{ background: inCart ? '#dc3545' : '#28a745', color: 'white', flex: 1 }"
        @click="toggleCart"
      >
        {{ inCart ? 'Remove' : 'Add to Cart' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  productName: { type: String, required: true },
  price: { type: Number, required: true }
});

const isFavorite = ref(false);
const inCart = ref(false);
const toggleFavorite = () => { isFavorite.value = !isFavorite.value; };
const toggleCart = () => { inCart.value = !inCart.value; };
</script>
```

## Card Grid Layout Patterns

### Basic CSS Grid

```vue
<template>
  <div class="card-grid">
    <div class="e-card" v-for="item in items" :key="item.id">
      <div
        class="e-card-image"
        :style="{
          backgroundImage: `url(${item.image})`,
          height: '180px'
        }"
      ></div>
      <div class="e-card-header-title">{{ item.title }}</div>
      <div class="e-card-content">{{ item.description }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { id: 1, title: 'Card 1', description: 'First card', image: './img1.jpg' },
  { id: 2, title: 'Card 2', description: 'Second card', image: './img2.jpg' },
  { id: 3, title: 'Card 3', description: 'Third card', image: './img3.jpg' }
]);
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>
```

### Flexbox Card Layout

```vue
<template>
  <div class="card-flex">
    <div class="e-card" v-for="item in items" :key="item.id">
      <div class="e-card-header-title">{{ item.title }}</div>
      <div class="e-card-content">{{ item.description }}</div>
      <div class="e-card-actions">
        <button class="e-card-btn" @click="onAction(item)">Action</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = [
  { id: 1, title: 'Card 1', description: 'First card' },
  { id: 2, title: 'Card 2', description: 'Second card' }
];
const onAction = (item) => { console.log('Action on', item); };
</script>

<style scoped>
.card-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card-flex .e-card {
  flex: 1 1 280px;
  max-width: 320px;
}
</style>
```

## Responsive Card Patterns

### Mobile-First Responsive Grid

```vue
<template>
  <div class="responsive-grid">
    <div class="e-card" v-for="i in 6" :key="i">
      <div class="e-card-header-title">Card {{ i }}</div>
      <div class="e-card-content">Sample content for card {{ i }}.</div>
    </div>
  </div>
</template>

<style scoped>
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 600px) {
  .responsive-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .responsive-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1200px) {
  .responsive-grid { grid-template-columns: repeat(4, 1fr); }
}
</style>
```

### Responsive Card with Conditional Layout

```vue
<template>
  <div :class="['responsive-card', isHorizontal ? 'e-card-horizontal' : '']">
    <img v-if="image" :src="image" :alt="title" class="card-image" />
    <div class="e-card-stacked">
      <div class="e-card-header-title">{{ title }}</div>
      <div class="e-card-content">{{ description }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  title: String,
  description: String,
  image: String,
  breakpoint: { type: Number, default: 768 }
});

const isHorizontal = ref(window.innerWidth >= props.breakpoint);

const onResize = () => { isHorizontal.value = window.innerWidth >= props.breakpoint; };
onMounted(() => window.addEventListener('resize', onResize));
onUnmounted(() => window.removeEventListener('resize', onResize));
</script>

<style scoped>
.responsive-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}
.e-card-horizontal {
  flex-direction: row;
}
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
@media (min-width: 768px) {
  .card-image { width: 200px; height: auto; }
}
</style>
```

## Tips & Best Practices

1. **Always pair `e-card-horizontal` with `e-card-stacked`**: This is the proper structure for horizontal cards

2. **Use CSS Grid for card layouts**: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` provides natural responsive behavior

3. **Maintain image aspect ratios**: Use `object-fit: cover` to keep images proportional in their containers

4. **Set explicit dimensions**: Always set width/height on images to prevent layout shift during loading

5. **Mobile-first CSS**: Start with single-column layouts and add breakpoints for larger screens

6. **Avoid deep nesting**: Keep card structures flat (header → content → actions) for maintainability

7. **Test on multiple breakpoints**: Verify card layouts work on mobile, tablet, and desktop widths

**Next:** Learn about [embedding components](cards-embedding-components.md) to compose cards with other Syncfusion components.
