# Badge Types and Shapes (Vue 3)

## Table of Contents
- [Color Variants](#color-variants)
- [Shape Types](#shape-types)
  - [Circle](#circle)
  - [Pill](#pill)
  - [Link](#link)
  - [Notification](#notification)
  - [Dot](#dot)
  - [Overlap](#overlap)
- [Badge Positioning](#badge-positioning)
- [Combining Modifier Classes](#combining-modifier-classes)

---

## Color Variants

The Badge component provides eight predefined color variants. Each carries a semantic meaning to communicate intent to users. In Vue 3, use a `v-for` to render a showcase grid or apply a class binding for dynamic selection:

| Class | Purpose |
|---|---|
| `e-badge-primary` | General notifications, default state |
| `e-badge-secondary` | Supplementary or secondary information |
| `e-badge-success` | Positive outcomes, confirmations |
| `e-badge-danger` | Errors, critical issues requiring attention |
| `e-badge-warning` | Caution, items needing review |
| `e-badge-info` | Informational messages or guidance |
| `e-badge-light` | Subtle indicators on dark backgrounds |
| `e-badge-dark` | Prominent indicators on light backgrounds |

```vue
<template>
  <div class="sample_container">
    <div v-for="variant in variants" :key="variant" class="block">
      <div class="e-card e-badge-showcase">
        <div class="e-card-content">
          <div>
            <span :class="['e-badge', `e-badge-${variant}`]">{{ variant }}</span>
          </div>
        </div>
        <div class="e-card-content">
          <div><code>.e-badge-{{ variant }}</code></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const variants = [
  'primary', 'secondary', 'success', 'danger',
  'warning', 'info', 'light', 'dark'
];
</script>
```

---

## Shape Types

### Circle

Apply `.e-badge-circle` to render a circular badge. Typically combined with `.e-badge-notification` and `.e-badge-overlap` for icon overlays:

```vue
<template>
  <div>
    <div class="badge-block">
      <div class="skype svg_icons" />
      <span class="e-badge e-badge-success e-badge-overlap e-badge-notification e-badge-circle">18</span>
    </div>
    <div class="badge-block">
      <div class="twitter svg_icons" />
      <span class="e-badge e-badge-info e-badge-overlap e-badge-notification e-badge-circle">9</span>
    </div>
    <div class="badge-block">
      <div class="facebook svg_icons" />
      <span class="e-badge e-badge-info e-badge-overlap e-badge-notification e-badge-circle">2</span>
    </div>
    <div class="badge-block">
      <div class="firefox svg_icons" />
      <span class="e-badge e-badge-danger e-badge-overlap e-badge-notification e-badge-circle">35</span>
    </div>
  </div>
</template>
```

### Pill

Apply `.e-badge-pill` for a rounded-rectangle (pill) shape — ideal for text labels and "New" indicators:

```vue
<template>
  <h1>Badge Component <span class="e-badge e-badge-primary e-badge-pill">New</span></h1>
</template>
```

### Link

When badge classes are applied to an `<a>` tag, the badge gains hover state styling automatically:

```vue
<template>
  <div class="badge-block">
    <a href="#" class="e-badge e-badge-primary">Link Badge</a>
  </div>
</template>
```

### Notification

Apply `.e-badge-notification` to create a counter badge. Use for alert counts and status changes that need immediate attention.

> **Note:** Ensure the parent element has `position: relative` for correct placement.

```vue
<template>
  <div>
    <div class="badge-block">
      <div class="skype svg_icons" />
      <span class="e-badge e-badge-success e-badge-overlap e-badge-notification">99+</span>
    </div>
    <div class="badge-block">
      <div class="twitter svg_icons" />
      <span class="e-badge e-badge-info e-badge-overlap e-badge-notification">27</span>
    </div>
    <div class="badge-block">
      <div class="facebook svg_icons" />
      <span class="e-badge e-badge-info e-badge-overlap e-badge-notification">2</span>
    </div>
    <div class="badge-block">
      <div class="firefox svg_icons" />
      <span class="e-badge e-badge-danger e-badge-overlap e-badge-notification">35</span>
    </div>
  </div>
</template>
```

### Dot

Apply `.e-badge-dot` to render a small dot with no text content — ideal for presence/availability indicators.

> **Note:** Leave the `<span>` empty. Set the parent to `position: relative`.

```vue
<template>
  <div>
    <div class="badge-block">
      <div class="skype svg_icons" />
      <span class="e-badge e-badge-success e-badge-overlap e-badge-dot" />
    </div>
    <div class="badge-block">
      <div class="twitter svg_icons" />
      <span class="e-badge e-badge-info e-badge-overlap e-badge-dot" />
    </div>
    <div class="badge-block">
      <div class="facebook svg_icons" />
      <span class="e-badge e-badge-info e-badge-overlap e-badge-dot" />
    </div>
    <div class="badge-block">
      <div class="firefox svg_icons" />
      <span class="e-badge e-badge-danger e-badge-overlap e-badge-dot" />
    </div>
  </div>
</template>
```

### Overlap

Apply `.e-badge-overlap` to make the badge extend beyond the boundary of the parent element. Combine it with `.e-badge-notification` or `.e-badge-dot` for icon overlays:

```vue
<template>
  <div>
    <div class="badge-block">
      <div class="skype svg_icons" />
      <span class="e-badge e-badge-success e-badge-overlap e-badge-notification">99+</span>
    </div>
    <div class="badge-block">
      <div class="twitter svg_icons" />
      <span class="e-badge e-badge-info e-badge-overlap e-badge-notification">27</span>
    </div>
    <div class="badge-block">
      <div class="facebook svg_icons" />
      <span class="e-badge e-badge-info e-badge-overlap e-badge-notification">2</span>
    </div>
    <div class="badge-block">
      <div class="firefox svg_icons" />
      <span class="e-badge e-badge-danger e-badge-overlap e-badge-notification">35</span>
    </div>
  </div>
</template>
```

---

## Badge Positioning

Notification and dot badges default to **top** placement. Add `.e-badge-bottom` to move the badge to the bottom of the parent.

This is particularly useful for avatar components where bottom placement communicates status more intuitively:

```vue
<template>
  <div>
    <div class="badge-block">
      <div class="firefox svg_icons" />
      <!-- Bottom position -->
      <span class="e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom" />
    </div>
    <div class="badge-block">
      <div class="skype svg_icons" />
      <span class="e-badge e-badge-info e-badge-overlap e-badge-dot e-badge-bottom" />
    </div>
    <div class="badge-block">
      <div class="facebook svg_icons" />
      <!-- Default top position (no e-badge-bottom) -->
      <span class="e-badge e-badge-info e-badge-overlap e-badge-dot" />
    </div>
    <div class="badge-block">
      <div class="twitter svg_icons" />
      <span class="e-badge e-badge-danger e-badge-overlap e-badge-dot e-badge-bottom" />
    </div>
  </div>
</template>
```

---

## Combining Modifier Classes

Modifier classes compose freely. The typical pattern for icon notification badges is:

```
e-badge  +  [color]  +  e-badge-overlap  +  e-badge-notification  +  [optional: e-badge-circle]
```

| Goal | Classes to combine |
|---|---|
| Notification counter on icon (default) | `e-badge e-badge-{color} e-badge-overlap e-badge-notification` |
| Circular notification counter | `e-badge e-badge-{color} e-badge-overlap e-badge-notification e-badge-circle` |
| Bottom dot indicator | `e-badge e-badge-{color} e-badge-overlap e-badge-dot e-badge-bottom` |
| Pill-shaped label | `e-badge e-badge-{color} e-badge-pill` |
