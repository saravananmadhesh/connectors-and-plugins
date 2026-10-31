# Skeleton Shapes (Vue 3)

## Table of Contents
- [Overview](#overview)
- [Available Shapes](#available-shapes)
- [Dimension Rules by Shape](#dimension-rules-by-shape)
- [Shape Examples](#shape-examples)
- [Multi-Shape Card Layout](#multi-shape-card-layout)
- [Choosing the Right Shape](#choosing-the-right-shape)

---

## Overview

Use the `shape` prop on `SkeletonComponent` to select the visual form of the loading placeholder. Each shape is designed to mirror a specific type of real content, helping users understand what is loading.

```vue
<template>
  <SkeletonComponent shape="Circle" width="60px" />
</template>
```

Default shape is `"Text"` when `shape` is omitted.

---

## Available Shapes

### Text (default)
Horizontal line representing a text row or headline. Use for paragraphs, titles, labels.

```vue
<template>
  <SkeletonComponent height="15px" width="70%" />
</template>
```

### Circle
Round placeholder for avatars, profile photos, or circular icons.

```vue
<template>
  <SkeletonComponent shape="Circle" width="60px" />
</template>
```

### Square
Equal-sided placeholder for compact icons, thumbnails, or grid tiles.

```vue
<template>
  <SkeletonComponent shape="Square" width="40px" />
</template>
```

### Rectangle
Rectangular placeholder for images, cards, banners, or large content blocks.

```vue
<template>
  <SkeletonComponent shape="Rectangle" width="100%" height="150px" />
</template>
```

---

## Dimension Rules by Shape

| Shape | Width | Height | Notes |
|-------|-------|--------|-------|
| `Text` | Optional | **Required** | Height controls line thickness |
| `Rectangle` | **Required** | **Required** | Both dimensions define the block |
| `Circle` | **Required** | Not needed | `width` is used as diameter |
| `Square` | **Required** | Not needed | `width` is used as side length |

> Height is ignored for `Circle` and `Square`; `width` alone determines their size.

---

## Shape Examples

### Circle — Avatar
```vue
<template>
  <SkeletonComponent shape="Circle" width="60px" />
</template>
```

### Square — Icon tile
```vue
<template>
  <SkeletonComponent shape="Square" width="40px" />
</template>
```

### Rectangle — Banner image
```vue
<template>
  <SkeletonComponent shape="Rectangle" width="100%" height="200px" />
</template>
```

### Text — Headline
```vue
<template>
  <SkeletonComponent height="20px" width="50%" />
</template>
```

### Text — Body paragraph lines
```vue
<template>
  <div>
    <SkeletonComponent height="14px" width="100%" />
    <br />
    <SkeletonComponent height="14px" width="95%" />
    <br />
    <SkeletonComponent height="14px" width="80%" />
  </div>
</template>
```

---

## Multi-Shape Card Layout

Combine shapes to build a full card skeleton that mirrors real card content. In Vue 3, wrap the layout in a SFC and use `<script setup>` for clean code:

```vue
<template>
  <div class="card-skeleton">
    <!-- Profile row -->
    <div class="profile-row">
      <SkeletonComponent shape="Circle" width="60px" />
      <div class="profile-text">
        <SkeletonComponent width="30%" height="15px" />
        <br />
        <SkeletonComponent width="15%" height="15px" />
      </div>
    </div>

    <!-- Image placeholder -->
    <SkeletonComponent shape="Rectangle" width="100%" height="150px" />

    <!-- Action buttons row -->
    <div class="action-row">
      <SkeletonComponent shape="Rectangle" width="20%" height="32px" />
      <SkeletonComponent shape="Rectangle" width="20%" height="32px" />
    </div>
  </div>
</template>

<script setup>
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
</script>

<style scoped>
.card-skeleton {
  padding: 16px;
  max-width: 320px;
}
.profile-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.profile-text {
  flex: 1;
}
.action-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
</style>
```

---

## Choosing the Right Shape

| Content type | Recommended shape |
|---|---|
| Avatar / profile photo | `Circle` |
| Icon / badge | `Square` |
| Image / banner / card | `Rectangle` |
| Text line / heading | `Text` (default) |
| Button | `Rectangle` with small height |
| Paragraph block | Multiple `Text` lines stacked |
