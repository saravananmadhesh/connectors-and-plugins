# Skeleton API Reference (Vue 3)

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Enums](#enums)
- [Usage Examples](#usage-examples)

---

## Import

```ts
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
```

---

## Properties

### cssClass
`string` — Default: `""`

Defines one or more CSS classes (space-separated) for customizing the Skeleton's appearance. Use to override shimmer color, background, border-radius, and animation speed.

```vue
<template>
  <SkeletonComponent shape="Circle" width="60px" cssClass="my-custom-skeleton" />
</template>

<script setup>
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

### enablePersistence
`boolean` — Default: `false`

Enable or disable persisting the component's state between page reloads. When `true`, state is stored in browser local storage.

```vue
<template>
  <SkeletonComponent height="15px" :enablePersistence="true" />
</template>
```

---

### enableRtl
`boolean` — Default: `false`

Enable or disable rendering the component in right-to-left direction. Mirrors shimmer animation and layout for RTL languages.

```vue
<template>
  <SkeletonComponent height="15px" width="80%" :enableRtl="true" />
</template>
```

---

### height
`string | number` — Default: `""`

Defines the height of the Skeleton. Height is required for `"Text"` and `"Rectangle"` shapes. It is **not required** when `shape` is `"Circle"` or `"Square"` (width is used as the dimension for those).

```vue
<template>
  <SkeletonComponent height="20px" width="60%" />
  <SkeletonComponent shape="Rectangle" width="100%" height="150px" />
</template>
```

---

### label
`string` — Default: `"Loading…"`

Defines the `aria-label` attribute value for accessibility. Customize to describe the specific content being loaded, improving screen reader context.

```vue
<template>
  <SkeletonComponent shape="Circle" width="48px" label="Loading user avatar" />
</template>
```

---

### locale
`string` — Default: `''`

Overrides the global culture and localization value for this component. The default global culture is `'en-US'`.

```vue
<template>
  <SkeletonComponent height="15px" locale="fr-FR" />
</template>
```

---

### shape
`string | SkeletonType` — Default: `SkeletonType.Text` (`"Text"`)

Defines the visual shape of the Skeleton. Accepted values: `"Text"`, `"Circle"`, `"Square"`, `"Rectangle"`.

```vue
<template>
  <SkeletonComponent shape="Circle" width="48px" />
  <SkeletonComponent shape="Square" width="32px" />
  <SkeletonComponent shape="Rectangle" width="100%" height="150px" />
  <SkeletonComponent height="15px" /> <!-- Text (default) -->
</template>
```

---

### shimmerEffect
`string | ShimmerEffect` — Default: `ShimmerEffect.Wave` (`"Wave"`)

Defines the animation effect of the Skeleton. Accepted values: `"Wave"`, `"Pulse"`, `"Fade"`.

```vue
<template>
  <SkeletonComponent shape="Circle" width="48px" shimmerEffect="Pulse" />
  <SkeletonComponent height="15px" shimmerEffect="Fade" />
  <SkeletonComponent height="15px" shimmerEffect="Wave" /> <!-- default -->
</template>
```

---

### visible
`boolean` — Default: `true`

Defines the visibility state of the Skeleton. Set to `false` to hide the skeleton when content has loaded. Bind to a reactive `ref` for dynamic show/hide.

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

---

### width
`string | number` — Default: `""`

Defines the width of the Skeleton. Width is **required** for `"Circle"` and `"Square"` shapes (used as the sole dimension). Width is also required for `"Rectangle"`. Optional for `"Text"`.

```vue
<template>
  <SkeletonComponent shape="Circle" width="60px" />
  <SkeletonComponent shape="Rectangle" width="100%" height="200px" />
  <SkeletonComponent height="15px" width="75%" />
</template>
```

---

## Methods

### destroy()
`void`

Destroys the Skeleton component instance, removing event listeners and cleaning up internal state. Call when programmatically removing the component outside of Vue's lifecycle. Access the component through a template `ref`:

```vue
<template>
  <div>
    <SkeletonComponent ref="skeletonRef" height="15px" width="80%" />
    <button @click="handleDestroy">Destroy</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';

const skeletonRef = ref(null);

const handleDestroy = () => {
  skeletonRef.value?.destroy();
};
</script>
```

---

## Enums

### SkeletonType
Defines the `shape` prop values:

| Value | Description |
|---|---|
| `Text` | Horizontal line (default) |
| `Circle` | Circle/round shape |
| `Square` | Equal-sided square |
| `Rectangle` | Rectangular block |

### ShimmerEffect
Defines the `shimmerEffect` prop values:

| Value | Description |
|---|---|
| `Wave` | Left-to-right sweeping wave (default) |
| `Pulse` | Uniform fade in/out pulsing |
| `Fade` | Gradual fade animation |

---

## Usage Examples

### All properties combined
```vue
<template>
  <SkeletonComponent
    shape="Rectangle"
    width="100%"
    height="200px"
    shimmerEffect="Pulse"
    cssClass="my-card-skeleton"
    label="Loading featured image"
    :visible="true"
    :enableRtl="false"
    :enablePersistence="false"
  />
</template>
```

### Minimal text skeleton
```vue
<template>
  <SkeletonComponent height="15px" />
</template>
```

### Circle with custom label
```vue
<template>
  <SkeletonComponent shape="Circle" width="48px" label="Loading profile photo" />
</template>
```

### Hidden skeleton (content loaded)
```vue
<template>
  <SkeletonComponent height="20px" width="50%" :visible="false" />
</template>
```
