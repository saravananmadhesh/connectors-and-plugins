# Properties Reference

## Table of Contents
- [Overview](#overview)
- [Core Properties](#core-properties)
  - [target](#target)
  - [width](#width)
  - [position](#position)
  - [type](#type)
  - [isOpen](#isopen)
- [Display Properties](#display-properties)
  - [showBackdrop](#showbackdrop)
  - [animate](#animate)
  - [zIndex](#zindex)
- [Behavior Properties](#behavior-properties)
  - [closeOnDocumentClick](#closeondocumentclick)
  - [enableGestures](#enablegestures)
  - [enableRtl](#enablertl)
  - [mediaQuery](#mediaquery)
  - [enableDock](#enabledock)
  - [dockSize](#docksize)
  - [enablePersistence](#enablepersistence)
- [Quick Reference Table](#quick-reference-table)

---

## Overview

The Sidebar component provides 18 properties to control appearance, behavior, and state. This reference covers all properties with types, defaults, and practical examples.

---

## Core Properties

### target

**Type:** `HTMLElement | string`  
**Default:** `null`

Specifies the container element where the sidebar should be rendered. This allows placing the sidebar inside a specific DOM element instead of the document body.

**Use Cases:**
- Rendering sidebar within a specific container
- Multiple sidebars in different containers
- Custom layout patterns

**Example:**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const containerRef = ref(null);
</script>

<template>
  <div>
    <!-- Target container for sidebar -->
    <div ref="containerRef" class="sidebar-container" style="position: relative; height: 500px;">
      <ejs-sidebar
        :target="containerRef"
        width="250px"
        type="Push"
      >
        <div>Sidebar content inside target container</div>
      </ejs-sidebar>
    </div>
  </div>
</template>
```

---

### width

**Type:** `string | number`  
**Default:** `'auto'`

Sets the width of the sidebar. Can be specified in pixels (e.g., `'250px'`) or percentage (e.g., `'25%'`).

**Example:**
```vue
<template>
  <ejs-sidebar width="280px" />
  <ejs-sidebar width="25%" />
  <ejs-sidebar :width="250" />
</template>
```

---

### position

**Type:** `'Left' | 'Right'`  
**Default:** `'Left'`

Determines sidebar placement relative to main content.

**Example:**
```vue
<template>
  <!-- Left-aligned sidebar (default) -->
  <ejs-sidebar position="Left" />

  <!-- Right-aligned sidebar (for RTL or alternative layouts) -->
  <ejs-sidebar position="Right" />
</template>
```

---

### type

**Type:** `'Over' | 'Push' | 'Slide' | 'Auto'`  
**Default:** `'Auto'`

Specifies how the sidebar interacts with main content:
- **Over** - Floats above content, no content movement
- **Push** - Pushes content aside when open
- **Slide** - Translates content without resizing
- **Auto** - Over on mobile, Push on desktop

**Example:**
```vue
<template>
  <!-- Floating drawer menu (mobile pattern) -->
  <ejs-sidebar type="Over" />

  <!-- Sidebar with content shift (desktop pattern) -->
  <ejs-sidebar type="Push" />

  <!-- Responsive behavior -->
  <ejs-sidebar type="Auto" />
</template>
```

---

### isOpen

**Type:** `boolean`  
**Default:** `false`

Controls the open/closed state of the sidebar. For `Auto` type, this property is ignored on mobile (type becomes Over regardless).

**Example:**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const isOpen = ref(true);

const handleChange = (args) => {
  isOpen.value = args.element.classList.contains('e-open');
};
</script>

<template>
  <ejs-sidebar
    :isOpen="isOpen"
    @change="handleChange"
  >
    Content
  </ejs-sidebar>
</template>
```

---

## Display Properties

### showBackdrop

**Type:** `boolean`  
**Default:** `false`

Displays a semi-transparent overlay behind the sidebar when open. Commonly used with `Over` type sidebars.

**Example:**
```vue
<template>
  <ejs-sidebar
    type="Over"
    :showBackdrop="true"
    :closeOnDocumentClick="true"
  />
</template>
```

**CSS Styling:**
```vue
<style scoped>
:deep(.e-sidebar-overlay) {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
}
</style>
```

---

### animate

**Type:** `boolean`  
**Default:** `true`

Enables smooth CSS transitions when opening/closing the sidebar.

**Example:**
```vue
<template>
  <!-- With animation -->
  <ejs-sidebar :animate="true" />

  <!-- Without animation (instant) -->
  <ejs-sidebar :animate="false" />
</template>
```

---

### zIndex

**Type:** `string | number`  
**Default:** `1000`

Sets the CSS z-index for the sidebar (applicable to `Over` type). Controls layering above other elements.

**Example:**
```vue
<template>
  <ejs-sidebar
    type="Over"
    :zIndex="9999"
    :showBackdrop="true"
  />
</template>
```

---

## Behavior Properties

### closeOnDocumentClick

**Type:** `boolean`  
**Default:** `false`

Automatically closes the sidebar when clicking on the main content area. Useful for drawer/modal-like behavior.

**Example:**
```vue
<template>
  <ejs-sidebar
    type="Over"
    :closeOnDocumentClick="true"
  />
</template>
```

---

### enableGestures

**Type:** `boolean`  
**Default:** `true`

Enables touch swipe gestures on mobile devices to open/close the sidebar.

**Example:**
```vue
<template>
  <ejs-sidebar
    :enableGestures="true"
    type="Over"
  />
</template>
```

---

### enableRtl

**Type:** `boolean`  
**Default:** `false`

Renders the sidebar in right-to-left (RTL) mode for Arabic, Hebrew, and other RTL languages.

**Example:**
```vue
<template>
  <ejs-sidebar
    :enableRtl="true"
    position="Right"
  />
</template>
```

---

### mediaQuery

**Type:** `string | MediaQueryList`  
**Default:** `null`

CSS media query string that triggers sidebar state. Sidebar auto-opens when media query matches.

**Example:**
```vue
<template>
  <!-- Open sidebar on screens wider than 768px -->
  <ejs-sidebar
    mediaQuery="(min-width: 768px)"
    :isOpen="false"
    type="Over"
  />

  <!-- Custom breakpoint -->
  <ejs-sidebar
    mediaQuery="(max-width: 600px)"
  />
</template>
```

---

### enableDock

**Type:** `boolean`  
**Default:** `false`

Enables dock/minimize mode - sidebar collapses to a narrow panel showing only icons.

**Example:**
```vue
<template>
  <ejs-sidebar
    :enableDock="true"
    dockSize="50px"
    width="250px"
  />
</template>
```

---

### dockSize

**Type:** `string | number`  
**Default:** `'auto'`

Width of the sidebar when docked (only applicable when `enableDock={true}`).

**Example:**
```vue
<template>
  <ejs-sidebar
    :enableDock="true"
    dockSize="50px"
    width="250px"
    type="Push"
  />
</template>
```

---

### enablePersistence

**Type:** `boolean`  
**Default:** `false`

Saves sidebar state (position and type) to browser storage and restores it on page reload.

**Example:**
```vue
<template>
  <ejs-sidebar
    :enablePersistence="true"
    position="Left"
    type="Auto"
  />
</template>
```

---

## Quick Reference Table

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| **target** | `HTMLElement \| string` | `null` | Container element |
| **width** | `string \| number` | `'auto'` | Sidebar width |
| **position** | `'Left' \| 'Right'` | `'Left'` | Placement |
| **type** | `'Over' \| 'Push' \| 'Slide' \| 'Auto'` | `'Auto'` | Display mode |
| **isOpen** | `boolean` | `false` | Open state |
| **showBackdrop** | `boolean` | `false` | Overlay |
| **animate** | `boolean` | `true` | Animations |
| **zIndex** | `string \| number` | `1000` | Layer |
| **closeOnDocumentClick** | `boolean` | `false` | Auto-close |
| **enableGestures** | `boolean` | `true` | Touch swipe |
| **enableRtl** | `boolean` | `false` | RTL mode |
| **mediaQuery** | `string \| MediaQueryList` | `null` | Responsive |
| **enableDock** | `boolean` | `false` | Dock mode |
| **dockSize** | `string \| number` | `'auto'` | Dock width |
| **enablePersistence** | `boolean` | `false` | Save state |

---

## Binding Properties with v-bind

All properties use Vue's `:` binding syntax for reactivity:

```vue
<script setup>
import { ref } from 'vue';

const width = ref('250px');
const isOpen = ref(false);
const type = ref('Over');

const updateWidth = (newWidth) => {
  width.value = newWidth;
};
</script>

<template>
  <ejs-sidebar
    :width="width"
    :isOpen="isOpen"
    :type="type"
    :animate="true"
    :showBackdrop="true"
  >
    Responsive Sidebar
  </ejs-sidebar>
</template>
```

---

## Combining Multiple Properties

```vue
<script setup>
import { ref } from 'vue';

const sidebarConfig = ref({
  width: '280px',
  type: 'Push',
  position: 'Left',
  isOpen: true,
  animate: true,
  enableDock: false,
  dockSize: '50px',
  enableRtl: false,
  enableGestures: true
});
</script>

<template>
  <ejs-sidebar
    :width="sidebarConfig.width"
    :type="sidebarConfig.type"
    :position="sidebarConfig.position"
    :isOpen="sidebarConfig.isOpen"
    :animate="sidebarConfig.animate"
    :enableDock="sidebarConfig.enableDock"
    :dockSize="sidebarConfig.dockSize"
    :enableRtl="sidebarConfig.enableRtl"
    :enableGestures="sidebarConfig.enableGestures"
  >
    Sidebar Content
  </ejs-sidebar>
</template>
```
