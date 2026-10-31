# Badge Customization (Vue 3)

## Table of Contents
- [Color Customization](#color-customization)
- [Size Customization](#size-customization)
- [Custom Positioning](#custom-positioning)
- [Dynamic Class Binding](#dynamic-class-binding)

---

## Color Customization

The Badge provides eight built-in color variants. When those don't match your design requirements, apply a custom CSS class to override the badge's background and text colors.

The pattern is to keep a built-in color class for the base styles and add your own class to override color properties:

```vue
<template>
  <div>
    <h1>Color Customization <span class="e-badge e-badge-primary e-badge-pill green">New</span></h1>
    <h1>Color Customization <span class="e-badge e-badge-primary e-badge-pill blue">New</span></h1>
    <h1>Color Customization <span class="e-badge e-badge-primary e-badge-pill purple">New</span></h1>
    <h1>Color Customization <span class="e-badge e-badge-primary e-badge-pill gradient">New</span></h1>
  </div>
</template>
```

Define the custom classes in your CSS file:

```css
/* Example custom color overrides */
.e-badge.green {
  background-color: #4CAF50;
  color: #fff;
}

.e-badge.purple {
  background-color: #9C27B0;
  color: #fff;
}

.e-badge.gradient {
  background: linear-gradient(45deg, #f06, #48f);
  color: #fff;
}
```

> Use specific selectors (e.g., `.e-badge.green`) to avoid conflicts with other elements.

---

## Size Customization

The Badge automatically scales with its text content. To explicitly control the badge size, change the `font-size` CSS property — the badge dimensions respond proportionally:

```vue
<template>
  <div>
    <h1>Badge Component <span class="e-badge e-badge-primary size_1">New</span></h1>
    <h1>Badge Component <span class="e-badge e-badge-primary size_2">New</span></h1>
    <h1>Badge Component <span class="e-badge e-badge-primary size_3">New</span></h1>
  </div>
</template>
```

Define size classes in your CSS:

```css
.e-badge.size_1 {
  font-size: 10px;
}

.e-badge.size_2 {
  font-size: 14px;
}

.e-badge.size_3 {
  font-size: 18px;
}
```

> Changing `font-size` is the recommended way to resize badges — the padding, border-radius, and line-height all scale relative to the font size.

---

## Custom Positioning

The built-in `.e-badge-bottom` class only supports top and bottom placement. For left-side or other arbitrary positions, apply a custom CSS class that overrides the badge's `top`, `right`, `bottom`, and `left` properties:

```vue
<template>
  <div>
    <div class="block">
      <!-- Left-top custom position -->
      <div class="badge-block">
        <div class="firefox svg_icons" />
        <span class="e-badge e-badge-warning e-badge-notification e-badge-overlap leftTop">99+</span>
      </div>
      <div class="badge-block">
        <div class="facebook svg_icons" />
        <span class="e-badge e-badge-danger e-badge-notification e-badge-overlap leftTop">99+</span>
      </div>
      <div class="badge-block">
        <div class="skype svg_icons" />
        <span class="e-badge e-badge-secondary e-badge-notification e-badge-overlap leftTop">18</span>
      </div>
    </div>
    <div class="badge-block">
      <!-- Left-bottom custom position -->
      <div class="badge-block">
        <div class="firefox svg_icons" />
        <span class="e-badge e-badge-warning e-badge-notification e-badge-overlap leftBottom">99+</span>
      </div>
      <div class="badge-block">
        <div class="facebook svg_icons" />
        <span class="e-badge e-badge-danger e-badge-notification e-badge-overlap leftBottom">99+</span>
      </div>
      <div class="badge-block">
        <div class="skype svg_icons" />
        <span class="e-badge e-badge-secondary e-badge-notification e-badge-overlap leftBottom">18</span>
      </div>
    </div>
  </div>
</template>
```

Define the custom position classes in CSS:

```css
/* Left-top position */
.e-badge.leftTop {
  right: auto;
  left: -10px;
  top: -10px;
}

/* Left-bottom position */
.e-badge.leftBottom {
  right: auto;
  left: -10px;
  top: auto;
  bottom: -10px;
}
```

> Always keep `.e-badge-overlap` when using custom positions — it sets the `position: absolute` needed for CSS coordinate overrides to work.

---

## Dynamic Class Binding

In Vue 3, drive the badge classes from reactive data using `:class` binding. This replaces React's `className={...}` template literal pattern:

```vue
<template>
  <div class="badge-list">
    <h1>
      Inbox
      <span :class="['e-badge', 'e-badge-' + color, 'e-badge-pill']">
        {{ count }}
      </span>
    </h1>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const color = ref('primary');

const increment = () => {
  count.value++;
  // Switch to danger when count is high
  color.value = count.value > 5 ? 'danger' : 'primary';
};
</script>
```

> Vue's `:class` accepts both string and array forms. Use the array form (`['e-badge', 'e-badge-' + color]`) when building classes from multiple parts conditionally. Use the object form (`{ 'e-badge-pill': isPill }`) for boolean toggles.
