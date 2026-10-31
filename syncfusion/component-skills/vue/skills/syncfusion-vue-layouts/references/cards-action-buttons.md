# Action Buttons (Vue 3)

## Table of Contents
- [Adding Action Buttons](#adding-action-buttons)
- [Horizontal Layout (Default)](#horizontal-layout-default)
- [Vertical Layout](#vertical-layout)
- [Icon Buttons](#icon-buttons)
- [Button Styling](#button-styling)
- [Interactive Button Examples](#interactive-button-examples)
- [Best Practices](#best-practices)
- [CSS Classes Reference](#css-classes-reference)

## Adding Action Buttons

Action buttons allow users to interact with card content. They are organized in an action container at the bottom of the card.

### Basic Button Structure

Action buttons are contained within a `div` with the `e-card-actions` class:

```vue
<template>
  <div class="e-card">
    <div class="e-card-content">
      Card content
    </div>
    <div class="e-card-actions">
      <button class="e-card-btn">Button 1</button>
      <button class="e-card-btn">Button 2</button>
    </div>
  </div>
</template>
```

### Button and Link Elements

Use both `button` and `anchor` elements with the `e-card-btn` class:

```vue
<template>
  <div class="e-card-actions">
    <button class="e-card-btn">Action Button</button>
    <a href="#" class="e-card-btn">Link Button</a>
  </div>
</template>
```

### Multiple Action Buttons

```vue
<template>
  <div class="e-card-actions">
    <button class="e-card-btn">View</button>
    <button class="e-card-btn">Edit</button>
    <button class="e-card-btn">Delete</button>
  </div>
</template>
```

## Horizontal Layout (Default)

By default, action buttons are positioned horizontally from left to right:

```vue
<template>
  <div class="e-card" style="max-width: 300px;">
    <div class="e-card-header-title">Product Name</div>
    <div class="e-card-content">
      High-quality product with excellent features.
    </div>
    <div class="e-card-actions">
      <button class="e-card-btn">View</button>
      <button class="e-card-btn">Add to Cart</button>
      <button class="e-card-btn">Share</button>
    </div>
  </div>
</template>
```

**Output:** Buttons displayed side-by-side from left to right.

## Vertical Layout

Add the `e-card-vertical` class to the actions container to stack buttons vertically:

```vue
<template>
  <div class="e-card-actions e-card-vertical">
    <button class="e-card-btn">More</button>
    <a href="#" class="e-card-btn">Share</a>
    <button class="e-card-btn">Archive</button>
  </div>
</template>
```

### Complete Vertical Buttons Card

```vue
<template>
  <div class="e-card" style="max-width: 300px;">
    <div class="e-card-header-title">Eiffel Tower</div>
    <div class="e-card-content">
      The Eiffel Tower is acknowledged as the universal symbol of Paris and France.
    </div>
    <div class="e-card-actions e-card-vertical">
      <button class="e-card-btn">More</button>
      <a href="#" class="e-card-btn">Share</a>
      <button class="e-card-btn">Save</button>
    </div>
  </div>
</template>
```

## Icon Buttons

### Icon with Text

```vue
<template>
  <div class="e-card-actions">
    <button class="e-card-btn">
      <span>📌</span> Bookmark
    </button>
    <button class="e-card-btn">
      <span>❤️</span> Like
    </button>
    <button class="e-card-btn">
      <span>🔗</span> Share
    </button>
  </div>
</template>
```

### Icon Only Buttons

```vue
<template>
  <div class="e-card-actions">
    <button class="e-card-btn" title="Bookmark">📌</button>
    <button class="e-card-btn" title="Like">❤️</button>
    <button class="e-card-btn" title="Share">🔗</button>
  </div>
</template>
```

### Using Image Icons

```vue
<template>
  <div class="e-card-actions">
    <button class="e-card-btn">
      <img src="./bookmark.png" alt="Bookmark" style="width: 20px;" />
    </button>
    <button class="e-card-btn">
      <img src="./like.png" alt="Like" style="width: 20px;" />
    </button>
    <button class="e-card-btn">
      <img src="./share.png" alt="Share" style="width: 20px;" />
    </button>
  </div>
</template>
```

## Button Styling

### Custom Button Styling

Style buttons with inline CSS or CSS classes:

```vue
<template>
  <button
    class="e-card-btn"
    :style="{
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 'bold',
      borderRadius: '4px'
    }"
  >
    Custom Button
  </button>
</template>
```

### Primary and Secondary Buttons

```vue
<template>
  <div class="e-card-actions">
    <button
      class="e-card-btn"
      :style="{
        background: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 16px'
      }"
    >
      Primary
    </button>
    <button
      class="e-card-btn"
      :style="{
        background: '#e9ecef',
        color: '#333',
        border: 'none',
        padding: '8px 16px'
      }"
    >
      Secondary
    </button>
  </div>
</template>
```

### Disabled Buttons

```vue
<template>
  <button
    class="e-card-btn"
    disabled
    :style="{
      opacity: 0.5,
      cursor: 'not-allowed'
    }"
  >
    Disabled Button
  </button>
</template>
```

## Interactive Button Examples

### Example 1: E-Commerce Card

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
      <div class="e-card-title e-card-top-right">
        Sale
      </div>
    </div>
    <div class="e-card-header-title">Wireless Headphones</div>
    <div class="e-card-sub-title">$99.99</div>
    <div class="e-card-content">
      <p>Premium sound quality with noise cancellation</p>
    </div>
    <div class="e-card-actions">
      <button
        class="e-card-btn"
        @click="inCart = !inCart"
        :style="{
          background: inCart ? '#dc3545' : '#28a745',
          color: 'white',
          flex: 1
        }"
      >
        {{ inCart ? 'Remove' : 'Add to Cart' }}
      </button>
      <button
        class="e-card-btn"
        :style="{
          background: '#6c757d',
          color: 'white'
        }"
      >
        ❤️
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inCart = ref(false);
</script>
```

### Example 2: Team Member Card

```vue
<template>
  <div class="e-card">
    <div class="e-card-header">
      <div
        class="e-card-header-image e-card-corner"
        :style="{
          backgroundImage: 'url(./avatar.jpg)',
          width: '80px',
          height: '80px'
        }"
      ></div>
      <div class="e-card-header-caption">
        <div class="e-card-header-title">Sarah Johnson</div>
        <div class="e-card-sub-title">Product Designer</div>
      </div>
    </div>
    <div class="e-card-content">
      <p>10+ years of experience in UX/UI design</p>
      <p v-if="expanded">Email: sarah@company.com | Phone: +1-234-567-8900</p>
    </div>
    <div class="e-card-actions">
      <button class="e-card-btn" @click="expanded = !expanded">
        {{ expanded ? 'Less Info' : 'More Info' }}
      </button>
      <a href="#" class="e-card-btn">Message</a>
      <a href="#" class="e-card-btn">Connect</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const expanded = ref(false);
</script>
```

### Example 3: Settings Card

```vue
<template>
  <div class="e-card">
    <div class="e-card-header-title">Notification Settings</div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
      <label>
        <input type="checkbox" v-model="notifications" />
        Enable notifications
      </label>
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-actions e-card-vertical">
      <button
        class="e-card-btn"
        :style="{
          background: '#007bff',
          color: 'white',
          padding: '10px'
        }"
      >
        Save Settings
      </button>
      <button
        class="e-card-btn"
        :style="{
          background: '#e9ecef',
          padding: '10px'
        }"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notifications = ref(true);
</script>
```

## Best Practices

1. **Limit buttons**: Keep 2-4 action buttons per card for clarity

2. **Clear labels**: Use descriptive button text (avoid "Click here")

3. **Consistent styling**: Maintain consistent button appearance across cards

4. **Logical order**: Place primary actions (e.g., "Buy Now") first

5. **Visual hierarchy**: Use color and styling to highlight important actions

6. **Responsive spacing**: Buttons should have adequate spacing on mobile devices

7. **Accessibility**: Use semantic HTML (`<button>` or `<a>`) with descriptive labels

## CSS Classes Reference

| Class | Purpose |
|-------|---------|
| `e-card-actions` | Action button container |
| `e-card-btn` | Individual button styling |
| `e-card-vertical` | Vertical button alignment |

**Next:** Learn about [layouts and customization](cards-layouts-customization.md) for horizontal card layouts and advanced positioning.
