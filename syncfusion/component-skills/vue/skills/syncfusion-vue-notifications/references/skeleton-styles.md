# Skeleton Styles and Visibility (Vue 3)

## Table of Contents
- [Custom CSS with cssClass](#custom-css-with-cssclass)
- [Visibility Control](#visibility-control)
- [Loading to Content Transition](#loading-to-content-transition)
- [CSS Customization Examples](#css-customization-examples)

---

## Custom CSS with cssClass

Use the `cssClass` prop to apply one or more CSS classes to a `SkeletonComponent`. This lets you override the default skeleton appearance — changing shimmer wave color, background color, dimensions, border radius, or animation speed.

```vue
<template>
  <SkeletonComponent shape="Circle" width="60px" cssClass="e-customize" />
</template>

<script setup>
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

Define the class in your CSS file:

```css
/* Example: custom purple shimmer wave */
.e-customize.e-skeleton {
  background-color: #e8d5f5;
}

.e-customize.e-skeleton::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(150, 80, 200, 0.4),
    transparent
  );
}
```

Multiple classes are supported (space-separated):

```vue
<template>
  <SkeletonComponent height="15px" width="80%" cssClass="e-custom-bg e-custom-wave" />
</template>
```

---

## Visibility Control

Use the `visible` prop to show or hide the skeleton placeholder based on your application's loading state. In Vue 3, bind the prop to a `ref` so the skeleton reacts to state changes automatically:

- `visible={true}` — Skeleton is displayed (default)
- `visible={false}` — Skeleton is hidden

```vue
<template>
  <SkeletonComponent height="15px" width="60%" :visible="isLoading" />
</template>

<script setup>
import { ref } from 'vue';
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';

const isLoading = ref(true);
</script>
```

The `visible` prop enables dynamic toggling without mounting/unmounting the component. Set it to `false` when content has finished loading, then render your actual content.

---

## Loading to Content Transition

A common pattern is to conditionally render either the skeleton or the real content based on loading state. Use `v-if` / `v-else` in Vue 3:

```vue
<template>
  <div class="user-profile">
    <template v-if="loading">
      <SkeletonComponent shape="Circle" width="48px" />
      <div>
        <SkeletonComponent width="120px" height="15px" />
        <br />
        <SkeletonComponent width="80px" height="12px" />
      </div>
    </template>
    <template v-else>
      <div class="avatar" />
      <div>
        <strong>{{ user?.name }}</strong>
        <p class="role">{{ user?.role }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';

const loading = ref(true);
const user = ref(null);

onMounted(() => {
  // Simulate data fetch
  setTimeout(() => {
    user.value = { name: 'Jane Smith', role: 'Developer' };
    loading.value = false;
  }, 2000);
});
</script>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #6366f1;
}
.role {
  margin: 0;
  font-size: 12px;
}
</style>
```

Alternatively, use the `visible` prop to hide the skeleton while keeping it in the DOM:

```vue
<template>
  <div>
    <SkeletonComponent height="20px" width="200px" :visible="loading" />
    <h2 v-if="!loading">Content Loaded!</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1500);
});
</script>
```

> Vue 3's `onMounted` lifecycle hook replaces React's `useEffect(..., [])`. Both run once after the component mounts. Use `ref()` for component-local reactive state instead of `useState`.

---

## CSS Customization Examples

### Change background color
```css
.my-skeleton.e-skeleton {
  background-color: #dbeafe; /* light blue */
}
```

### Change wave/shimmer color
```css
.my-skeleton.e-skeleton::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.5),
    transparent
  );
}
```

### Slow down animation
```css
.my-skeleton.e-skeleton::after {
  animation-duration: 2.5s;
}
```

### Rounded rectangle
```css
.rounded-skeleton.e-skeleton {
  border-radius: 8px;
}
```

Apply the class:
```vue
<template>
  <SkeletonComponent shape="Rectangle" width="100%" height="120px" cssClass="rounded-skeleton" />
</template>
```
