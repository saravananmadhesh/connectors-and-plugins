# Adaptive

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Adaptive UI Setup](#basic-adaptive-ui-setup)
- [Adaptive UI Features](#adaptive-ui-features)
- [Screen Size Considerations](#screen-size-considerations)

## When to Use

Use adaptive UI when you need to:
- **Mobile devices** - Optimize for small screens (mobile phones, tablets)
- **Responsive design** - Support multiple screen sizes seamlessly
- **Full-screen dialogs** - Better UX for edit/filter/sort on mobile
- **Touch devices** - Larger touch targets for mobile interaction
- **Smaller screens** - 320px-480px width viewports
- **Improved usability** - Prevent cramped interface on narrow screens
- **Cross-device support** - Single app works on desktop and mobile
- **Progressive enhancement** - Desktop layout falls back to mobile when needed
- **Better form handling** - Edit dialogs take full screen on mobile

## Mandatory Rules

Before implementing adaptive UI:
- ✓ **enableAdaptiveUI: true** - Enable adaptive UI feature
- ✓ **Edit mode: 'Dialog'** - Dialog edit mode required for adaptive dialogs
- ✓ **Filter type: 'Excel' or 'Menu'** - Filter dialogs render adaptively
- ✓ **CSS classes** - `.e-bigger`

## Basic Adaptive UI Setup

Enable adaptive mode with full-screen mobile dialogs:

```vue
<template>
  <div class="e-bigger e-adaptive-demo">
    <div class="e-mobile-layout">
      <div class="e-mobile-content">
        <ejs-treegrid 
          ref="treegrid"
          :dataSource="data"
          childMapping="subtasks"
          :treeColumnIndex="1"
          height="100%"
          :enableAdaptiveUI="true"
          :allowPaging="true"
          :allowSorting="true"
          :allowFiltering="true"
          :editSettings="editSettings"
          :toolbar="toolbar"
          :filterSettings="filterSettings">
        </ejs-treegrid>
      </div>
    </div>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import { Page, Edit, Sort, Filter, Toolbar } from '@syncfusion/ej2-vue-treegrid';

const treegrid = ref(null);
const data = ref([...]);

const editSettings = ref({
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true,
  mode: 'Dialog'  // Dialog mode required for adaptive
});

const toolbar = ref(['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search']);
const filterSettings = ref({ type: 'Excel' });

provide('treegrid', [Page, Edit, Sort, Filter, Toolbar]);
</script>
```

## Adaptive UI Features

| Feature | Behavior |
|---------|----------|
| **Edit Dialog** | Full-screen form with all fields visible |
| **Filter Menu** | Full-screen filter UI with operator options |
| **Sort UI** | Full-screen sort column selection |
| **Toolbar buttons** | Adjusted for touch interaction |
| **Column headers** | Responsive width and touch targets |
| **Pager** | Mobile-friendly pagination controls |

## Screen Size Considerations

| Device | Width | Height | Optimal |
|--------|-------|--------|---------|
| **Phone** | 320px-480px | Variable | Adaptive required |
| **Large Phone** | 480px-768px | Variable | Adaptive helpful |
| **Tablet** | 768px-1024px | Variable | Adaptive optional |
| **Desktop** | 1024px+ | Variable | Not needed |
