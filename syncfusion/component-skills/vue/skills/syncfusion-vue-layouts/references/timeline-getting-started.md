# Getting Started with Timeline (Vue 3)

## Table of Contents
- [Installation](#installation)
- [CSS Themes](#css-themes)
- [Basic Setup](#basic-setup)
- [First Working Example](#first-working-example)
- [Container Height Requirement](#container-height-requirement)

## Installation

The Timeline component is part of `@syncfusion/ej2-vue-layouts`:

```bash
npm install @syncfusion/ej2-vue-layouts --save
```

This installs:
- `@syncfusion/ej2-vue-base` - Vue 3 base utilities
- `@syncfusion/ej2-base` - Core Syncfusion base
- `@syncfusion/ej2-layouts` - Layout components

## CSS Themes

Import the required CSS in your main file or component:

### Tailwind 3

```js
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/timeline/index.css";
```

## Basic Setup

The Timeline uses two child directives:
1. **`<e-items>`** - Container for all items
2. **`<e-item>`** - Individual timeline item

### Minimal Example

```vue
<template>
  <div style="height: 350px;">
    <TimelineComponent>
      <e-items>
        <e-item content="Shipped" />
        <e-item content="Departed" />
        <e-item content="Arrived" />
        <e-item content="Out for Delivery" />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<script setup>
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-vue-layouts/styles/tailwind3.css';
</script>
```

### Import Statements

```js
import {
  TimelineComponent,
  ItemsDirective,
  ItemDirective
} from '@syncfusion/ej2-vue-layouts';
```

> **Note:** In Vue 3 SFCs, use `<e-items>` and `<e-item>` in the template. The imported `ItemsDirective` and `ItemDirective` are the source identifiers but Vue's directive system uses the kebab-case variants in templates.

## First Working Example

```vue
<template>
  <div style="height: 350px; padding: 20px;">
    <h2>Order Tracking</h2>
    <TimelineComponent>
      <e-items>
        <e-item content="Order Placed" oppositeContent="10:00 AM" />
        <e-item content="Order Confirmed" oppositeContent="10:15 AM" />
        <e-item content="Shipped" oppositeContent="2:30 PM" />
        <e-item content="Out for Delivery" oppositeContent="9:00 AM" />
        <e-item content="Delivered" oppositeContent="11:45 AM" />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<script setup>
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-vue-layouts/styles/tailwind3.css';
</script>
```

## Container Height Requirement

**⚠️ Important:** The Timeline component requires its parent container to have an explicit height. Without it, items will not render.

```vue
<!-- ✅ Correct: explicit height -->
<div style="height: 350px;">
  <TimelineComponent>...</TimelineComponent>
</div>

<!-- ❌ Wrong: no height -->
<div>
  <TimelineComponent>...</TimelineComponent>
</div>
```

### Common Height Patterns

```vue
<template>
  <!-- Fixed pixel height -->
  <div style="height: 400px;">
    <TimelineComponent />
  </div>

  <!-- Percentage-based height -->
  <div style="height: 80%;">
    <TimelineComponent />
  </div>

  <!-- Viewport-relative height -->
  <div style="height: 50vh;">
    <TimelineComponent />
  </div>

  <!-- Fill parent flex container -->
  <div class="parent">
    <TimelineComponent />
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  height: 600px;
}
.parent > :first-child {
  flex: 1;
  min-height: 0;
}
</style>
```

## Items Array Property

As an alternative to child directives, you can pass items as a data array:

```vue
<template>
  <div style="height: 350px;">
    <TimelineComponent :items="items" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent } from '@syncfusion/ej2-vue-layouts';

const items = ref([
  { content: 'Step 1', oppositeContent: 'Phase 1' },
  { content: 'Step 2', oppositeContent: 'Phase 2' },
  { content: 'Step 3', oppositeContent: 'Phase 3' }
]);
</script>
```

## Next Steps

**Next:** Learn about [layout configuration](timeline-layout-configuration.md) for orientations and alignment.
