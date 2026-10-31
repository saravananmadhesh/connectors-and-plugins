# Images, Titles & Dividers (Vue 3)

## Table of Contents
- [Card Images](#card-images)
- [Image Titles](#image-titles)
- [Dividers](#dividers)
- [Title Position Classes Reference](#title-position-classes-reference)
- [Common Patterns](#common-patterns)
- [Tips & Best Practices](#tips--best-practices)

## Card Images

### Full-Width Card Images

The `e-card-image` class creates a full-width image section that spans the entire width of the card:

```vue
<template>
  <div class="e-card">
    <div
      class="e-card-image"
      :style="{ backgroundImage: 'url(./image.jpg)', height: '200px' }"
    ></div>
    <div class="e-card-content">
      Content below the image
    </div>
  </div>
</template>
```

**Key points:**
- By default, card images occupy 100% of their parent element's width
- Set explicit height to control image display area
- Use CSS `backgroundImage` property with background sizing

### Image Styling

```vue
<template>
  <div
    class="e-card-image"
    :style="{
      backgroundImage: 'url(./photo.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '250px'
    }"
  ></div>
</template>
```

### Image with Content Overlay

Position content over the image using absolute positioning:

```vue
<template>
  <div style="position: relative;">
    <div
      class="e-card-image"
      :style="{
        backgroundImage: 'url(./background.jpg)',
        height: '300px'
      }"
    ></div>
    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: rgba(0,0,0,0.5); color: white;">
      Overlay content here
    </div>
  </div>
</template>
```

## Image Titles

### Basic Image Title

The `e-card-title` class displays a title overlay on top of card images. By default, titles appear in the bottom-left corner with an overlay effect:

```vue
<template>
  <div class="e-card">
    <div
      class="e-card-image"
      :style="{ backgroundImage: 'url(./image.jpg)', height: '200px' }"
    >
      <div class="e-card-title">Image Title</div>
    </div>
    <div class="e-card-content">
      Card content
    </div>
  </div>
</template>
```

### Title Positioning

By default, titles appear in the bottom-left position. Use positioning classes to change location:

```vue
<template>
  <!-- Bottom-left (default) -->
  <div class="e-card-title e-card-bottom-left">Title</div>

  <!-- Bottom-right -->
  <div class="e-card-title e-card-bottom-right">Title</div>

  <!-- Top-left -->
  <div class="e-card-title e-card-top-left">Title</div>

  <!-- Top-right -->
  <div class="e-card-title e-card-top-right">Title</div>
</template>
```

### Complete Image Title Example

```vue
<template>
  <div class="e-card">
    <div
      class="e-card-image"
      :style="{
        backgroundImage: 'url(./city.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '250px'
      }"
    >
      <div class="e-card-title e-card-bottom-left">
        Beautiful City
      </div>
    </div>
    <div class="e-card-content">
      <p>Stunning urban landscape photography</p>
    </div>
  </div>
</template>
```

### Customizing Title Appearance

Style the title with CSS:

```vue
<template>
  <div
    class="e-card-image"
    :style="{ backgroundImage: 'url(./image.jpg)', height: '200px' }"
  >
    <div
      class="e-card-title e-card-top-right"
      :style="{
        fontSize: '24px',
        fontWeight: 'bold',
        padding: '15px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
      }"
    >
      Custom Title
    </div>
  </div>
</template>
```

### Interactive Title Position Selection

```vue
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <button
        v-for="pos in positions"
        :key="pos.value"
        @click="position = pos.value"
        :style="{
          marginRight: '10px',
          padding: '8px 12px',
          cursor: 'pointer',
          background: position === pos.value ? '#007bff' : '#e9ecef',
          color: position === pos.value ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px'
        }"
      >
        {{ pos.label }}
      </button>
    </div>

    <div class="e-card">
      <div
        class="e-card-image"
        :style="{
          backgroundImage: 'url(./sample.jpg)',
          height: '300px'
        }"
      >
        <div :class="['e-card-title', position]">
          Image Title
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const position = ref('e-card-bottom-left');
const positions = [
  { value: 'e-card-bottom-left', label: 'Bottom-Left' },
  { value: 'e-card-bottom-right', label: 'Bottom-Right' },
  { value: 'e-card-top-left', label: 'Top-Left' },
  { value: 'e-card-top-right', label: 'Top-Right' }
];
</script>
```

## Dividers

### Card Separator Element

The `e-card-separator` class creates a horizontal divider line between card sections:

```vue
<template>
  <div class="e-card">
    <div class="e-card-header-title">Section 1</div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
      First content section
    </div>
  </div>
</template>
```

### Multiple Dividers

Use multiple dividers to create distinct content sections:

```vue
<template>
  <div class="e-card">
    <div class="e-card-header-title">City Guide</div>
    <div class="e-card-separator"></div>

    <div class="e-card-content">
      <h3>Sydney</h3>
      <p>Sydney is a city on the east coast of Australia...</p>
    </div>
    <div class="e-card-separator"></div>

    <div class="e-card-content">
      <h3>New York</h3>
      <p>New York City has been described as the cultural capital...</p>
    </div>
    <div class="e-card-separator"></div>

    <div class="e-card-content">
      <h3>London</h3>
      <p>London is the capital and most populous city of England...</p>
    </div>
  </div>
</template>
```

### Divider with Images and Content

```vue
<template>
  <div class="e-card">
    <div
      class="e-card-image"
      :style="{
        backgroundImage: 'url(./header.jpg)',
        height: '150px'
      }"
    ></div>
    <div class="e-card-separator"></div>

    <div class="e-card-content">
      <h2>Main Heading</h2>
      <p>Important content goes here</p>
    </div>
    <div class="e-card-separator"></div>

    <div class="e-card-content">
      <h3>Additional Details</h3>
      <ul>
        <li>Detail point 1</li>
        <li>Detail point 2</li>
        <li>Detail point 3</li>
      </ul>
    </div>
  </div>
</template>
```

## Title Position Classes Reference

| Class | Position |
|-------|----------|
| `e-card-bottom-left` | Bottom-left corner (default) |
| `e-card-bottom-right` | Bottom-right corner |
| `e-card-top-left` | Top-left corner |
| `e-card-top-right` | Top-right corner |

## Common Patterns

### Pattern 1: Gallery Card

```vue
<template>
  <div class="e-card" style="max-width: 300px;">
    <div
      class="e-card-image"
      :style="{
        backgroundImage: 'url(./gallery.jpg)',
        height: '250px'
      }"
    >
      <div class="e-card-title e-card-top-right">
        Featured
      </div>
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
      <p>Beautiful sunset over the mountains</p>
    </div>
  </div>
</template>
```

### Pattern 2: Article Preview

```vue
<template>
  <div class="e-card">
    <div
      class="e-card-image"
      :style="{
        backgroundImage: 'url(./article-header.jpg)',
        height: '200px'
      }"
    >
      <div class="e-card-title e-card-bottom-left">
        Technology
      </div>
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
      <h2>Article Title</h2>
      <p>Article summary and excerpt...</p>
    </div>
  </div>
</template>
```

### Pattern 3: Feature Showcase

```vue
<template>
  <div class="e-card">
    <div class="e-card-header-title">Feature Name</div>
    <div class="e-card-separator"></div>
    <div
      class="e-card-image"
      :style="{
        backgroundImage: 'url(./feature.jpg)',
        height: '150px'
      }"
    ></div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
      Feature description and details
    </div>
  </div>
</template>
```

## Tips & Best Practices

1. **Use dividers sparingly**: They organize content but too many can make a card feel cluttered

2. **Consistent image heights**: Keep image heights consistent across a grid of cards for better alignment

3. **Title contrast**: Ensure title text has sufficient contrast against background images (use `textShadow` if needed)

4. **Image optimization**: Compress images for better performance and faster loading

5. **Responsive heights**: Use percentage heights or viewport units for responsive layouts

**Next:** Learn about [action buttons](cards-action-buttons.md) to add interactive elements to your cards.
