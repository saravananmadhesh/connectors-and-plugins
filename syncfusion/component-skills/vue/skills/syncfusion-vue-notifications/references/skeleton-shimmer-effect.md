# Skeleton Shimmer Effects (Vue 3)

## Table of Contents
- [Overview](#overview)
- [Effect Types](#effect-types)
- [Usage](#usage)
- [Examples](#examples)
- [Choosing an Effect](#choosing-an-effect)

---

## Overview

Shimmer effects provide animated visual feedback that signals to users the application is actively loading content. Configure the animation style with the `shimmerEffect` prop.

```vue
<template>
  <SkeletonComponent shape="Circle" width="48px" shimmerEffect="Pulse" />
</template>
```

Default effect is `"Wave"` when `shimmerEffect` is omitted.

---

## Effect Types

### Wave (default)
A flowing highlight sweeps across the skeleton from left to right, mimicking a scan or reflection. Best for most general-purpose loading states.

```vue
<template>
  <SkeletonComponent height="15px" width="100%" shimmerEffect="Wave" />
</template>
```

### Pulse
The entire skeleton fades in and out uniformly, creating a breathing or pulsing rhythm. Works well for lists and items where you want a subtler, less directional animation.

```vue
<template>
  <SkeletonComponent height="15px" width="100%" shimmerEffect="Pulse" />
</template>
```

### Fade
A gradual fade in/out animation. Provides the most subtle visual feedback; appropriate when you want a calm, non-distracting loading state.

```vue
<template>
  <SkeletonComponent height="15px" width="100%" shimmerEffect="Fade" />
</template>
```

---

## Usage

Apply `shimmerEffect` directly on any `SkeletonComponent`. All skeletons in a layout can share the same effect or use different ones:

```vue
<template>
  <div class="effect-demo">
    <SkeletonComponent height="15px" width="100%" shimmerEffect="Wave" />
    <SkeletonComponent height="15px" width="80%" shimmerEffect="Pulse" />
    <SkeletonComponent height="15px" width="60%" shimmerEffect="Fade" />
  </div>
</template>

<script setup>
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
</script>

<style scoped>
.effect-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

---

## Examples

### List Skeleton with Pulse
Pulse is ideal for list items where the whole row fades together:

```vue
<template>
  <ul class="list-skeleton">
    <li v-for="i in 3" :key="i" class="list-item">
      <SkeletonComponent shape="Circle" width="40px" shimmerEffect="Pulse" />
      <div class="text-block">
        <SkeletonComponent width="60%" height="14px" shimmerEffect="Pulse" />
        <br />
        <SkeletonComponent width="40%" height="12px" shimmerEffect="Pulse" />
      </div>
    </li>
  </ul>
</template>

<script setup>
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
</script>

<style scoped>
.list-skeleton {
  list-style: none;
  padding: 0;
}
.list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.text-block {
  flex: 1;
}
</style>
```

> Use `v-for="i in 3"` with `:key="i"` to render repeated skeleton rows. This replaces React's `{[1, 2, 3].map(...)}` syntax.

### Card Skeleton with Wave (default)
```vue
<template>
  <div class="card-skeleton">
    <SkeletonComponent shape="Rectangle" width="100%" height="180px" />
    <br />
    <SkeletonComponent height="18px" width="60%" />
    <br />
    <SkeletonComponent height="14px" width="90%" />
    <br />
    <SkeletonComponent height="14px" width="75%" />
  </div>
</template>

<script setup>
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
</script>

<style scoped>
.card-skeleton {
  padding: 16px;
}
</style>
```

### Fade Effect for Subtle Transitions
```vue
<template>
  <div>
    <SkeletonComponent shape="Circle" width="56px" shimmerEffect="Fade" />
    <br />
    <SkeletonComponent height="16px" width="50%" shimmerEffect="Fade" />
  </div>
</template>

<script setup>
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

## Choosing an Effect

| Effect | Best for | Visual style |
|--------|----------|------------|
| `Wave` | General use, cards, images | Directional left-to-right sweep |
| `Pulse` | Lists, repeated items | Uniform in/out breathing |
| `Fade` | Subtle or low-distraction UI | Soft, non-directional fade |

> All three effects respect the `prefers-reduced-motion` media query for users who prefer reduced animation.
