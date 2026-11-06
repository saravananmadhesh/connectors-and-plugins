# Getting Started with Dashboard Layout (Vue 3)

## Table of Contents
- [Installation](#installation)
- [Setup & Configuration](#setup--configuration)
- [Basic Implementation](#basic-implementation)
- [Adding Panels](#adding-panels)
- [First Dashboard](#first-dashboard)
- [Common Setup Issues](#common-setup-issues)

## Installation

### Dependencies

The Dashboard Layout component requires the following packages:

```
@syncfusion/ej2-vue-layouts
├── @syncfusion/ej2-vue-base
│   ├── @syncfusion/ej2-base
│   └── vue (>=3.0)
└── @syncfusion/ej2-layouts
```

### Package Installation

Install the Syncfusion Vue layouts package using npm:

```bash
npm install @syncfusion/ej2-vue-layouts --save
```

Or using yarn:

```bash
yarn add @syncfusion/ej2-vue-layouts
```

## Setup & Configuration

### Import Dashboard Layout Component

```vue
<script setup>
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';
</script>
```

### Import CSS Styles

Add the required CSS imports to your main component or `App.vue` file:

```vue
<script setup>
// Import base theme (choose one)
import '@syncfusion/ej2-base/styles/tailwind3.css';
// OR
// import '@syncfusion/ej2-base/styles/bootstrap5.css';
// import '@syncfusion/ej2-base/styles/fluent2.css';
// import '@syncfusion/ej2-base/styles/material3.css';

// Import Dashboard Layout styles
import '@syncfusion/ej2-vue-layouts/styles/tailwind3.css';
// OR
// import '@syncfusion/ej2-vue-layouts/styles/bootstrap5.css';
// import '@syncfusion/ej2-vue-layouts/styles/fluent2.css';
// import '@syncfusion/ej2-vue-layouts/styles/material3.css';
</script>
```

**Note:** Choose only one theme. Using multiple themes simultaneously may cause styling conflicts.

### Theme Options

- **tailwind3** - Tailwind CSS 3 theme (recommended)
- **bootstrap5** - Bootstrap 5 theme
- **fluent2** - Microsoft Fluent 2 theme
- **material3** - Material Design 3 theme

### Using CSS Resource Generator (CRG)

For optimal bundle size, use Syncfusion's Custom Resource Generator to include only required component styles.

## Basic Implementation

### Minimal Dashboard Layout

Create your first Dashboard Layout with default settings:

```vue
<template>
  <DashboardLayoutComponent id="default_dashboard" :columns="5" />
</template>

<script setup>
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-vue-layouts/styles/tailwind3.css';
</script>
```

### Dashboard Layout with Panels

Add panels to your dashboard using the `panels` property:

```vue
<template>
  <DashboardLayoutComponent
    id="default_dashboard"
    :columns="5"
    :panels="panels"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const panels = ref([
  {
    id: 'panel1',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'Panel 1',
    content: 'Welcome to Syncfusion Vue Dashboard Layout'
  },
  {
    id: 'panel2',
    row: 0,
    col: 2,
    sizeX: 2,
    sizeY: 1,
    header: 'Panel 2',
    content: 'This is panel 2'
  }
]);
</script>
```

## Adding Panels

### Static Panels (Defined Upfront)

Define all panels in the panels array:

```vue
<script setup>
const staticPanels = [
  {
    id: 'analytics',
    header: 'Analytics',
    content: '<div>Analytics dashboard</div>',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 2
  },
  {
    id: 'metrics',
    header: 'Key Metrics',
    content: '<div>Key metrics panel</div>',
    row: 0,
    col: 2,
    sizeX: 2,
    sizeY: 2
  },
  {
    id: 'reports',
    header: 'Reports',
    content: '<div>Reports panel</div>',
    row: 2,
    col: 0,
    sizeX: 4,
    sizeY: 1
  }
];
</script>
```

### Dynamic Panels (HTML Attribute Method)

Define panels directly in HTML using data attributes:

```vue
<template>
  <DashboardLayoutComponent id="layout" :columns="5" :cellSpacing="[5, 5]">
    <div id="panel1" class="e-panel" data-row="0" data-col="0" data-sizex="2" data-sizey="1">
      <div class="e-panel-header">
        Panel 1
        <span class="e-icons e-close" />
      </div>
      <div class="e-panel-content">
        Content for panel 1
      </div>
    </div>

    <div id="panel2" class="e-panel" data-row="0" data-col="2" data-sizex="2" data-sizey="1">
      <div class="e-panel-header">
        Panel 2
        <span class="e-icons e-close" />
      </div>
      <div class="e-panel-content">
        Content for panel 2
      </div>
    </div>
  </DashboardLayoutComponent>
</template>
```

## First Dashboard

### Complete Functional Dashboard Example

```vue
<template>
  <div style="padding: 20px;">
    <h1>My Dashboard</h1>
    <DashboardLayoutComponent
      ref="dashboardRef"
      id="dashboard"
      :columns="5"
      :cellSpacing="[10, 10]"
      :panels="panels"
      :allowDragging="true"
      :dragStop="handleDragStop"
      :change="handleChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-vue-layouts/styles/tailwind3.css';

const dashboardRef = ref(null);

const panels = ref([
  {
    id: 'panel1',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 2,
    header: 'Sales Overview',
    content: '<div style="padding: 20px;"><h3>Total Sales: $150,000</h3><p>This month\'s revenue</p></div>'
  },
  {
    id: 'panel2',
    row: 0,
    col: 2,
    sizeX: 2,
    sizeY: 2,
    header: 'User Activity',
    content: '<div style="padding: 20px;"><h3>Active Users: 2,450</h3><p>Currently online</p></div>'
  },
  {
    id: 'panel3',
    row: 2,
    col: 0,
    sizeX: 3,
    sizeY: 1,
    header: 'Performance Metrics',
    content: '<div style="padding: 20px;"><p>System uptime: 99.9%</p><p>Response time: 45ms</p></div>'
  }
]);

const handleDragStop = () => {
  console.log('Panel rearranged');
};

const handleChange = (args) => {
  console.log('Layout changed:', args);
};
</script>
```

## Common Setup Issues

### Issue 1: CSS Not Loading

**Problem:** Component renders but has no styling.

**Solution:** Verify CSS imports are at the top of your main file:

```vue
<script setup>
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-vue-layouts/styles/tailwind3.css';
</script>
```

### Issue 2: TypeScript Errors with Refs

**Problem:** `dashboardRef.current` is undefined.

**Solution:** Use the proper ref typing:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref<DashboardLayoutComponent | null>(null);

// Access via .value, not .current
const panel = dashboardRef.value?.serialize();
</script>
```

### Issue 3: Panels Not Showing

**Problem:** Dashboard renders but no panels appear.

**Solution:** Ensure all required fields are present:

```vue
<script setup>
const panels = ref([
  {
    id: 'panel1',      // Required: unique ID
    row: 0,            // Required: row position
    col: 0,            // Required: column position
    sizeX: 1,          // Required: width in cells
    sizeY: 1           // Required: height in cells
  }
]);
</script>
```

### Issue 4: Mobile View Broken

**Problem:** Layout doesn't work on mobile devices.

**Solution:** Set proper `mediaQuery` for mobile:

```vue
<template>
  <DashboardLayoutComponent
    :columns="5"
    mediaQuery="max-width: 768px"
    :panels="panels"
  />
</template>
```

### Issue 5: Theme Conflicts

**Problem:** Multiple themes applied, causing visual issues.

**Solution:** Use only one theme. Remove conflicting imports.

**Next:** Learn about [core functionality](dashboard-core-functionality.md) for panels, dragging, resizing, and grid configuration.
