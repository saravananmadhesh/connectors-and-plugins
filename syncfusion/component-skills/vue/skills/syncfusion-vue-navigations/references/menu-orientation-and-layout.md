# Orientation and Layout

## Table of Contents
1. [Orientation Overview](#orientation-overview)
2. [Horizontal Menu](#horizontal-menu)
3. [Vertical Menu](#vertical-menu)
4. [Layout Configuration](#layout-configuration)
5. [Submenu Positioning](#submenu-positioning)
6. [Scrolling Options](#scrolling-options)
7. [Responsive Layout](#responsive-layout)
8. [RTL Layout](#rtl-layout)

## Orientation Overview

The Syncfusion Menu component supports multiple layout orientations to accommodate different UI patterns and use cases. Choose between horizontal (default) for top navigation and vertical for side navigation.

### Orientation Types

| Orientation | Use Case | Common Pattern |
|-------------|----------|-----------------|
| `Horizontal` | Top menu bars, breadcrumbs | Navigation bars, application menus |
| `Vertical` | Side navigation, context menus | Sidebar, dropdown menus |

### Supported Properties

- `orientation` - Menu layout direction (Horizontal/Vertical)
- `enableScrolling` - Enable scrolling for overflow items
- `showItemOnClick` - Show submenu on click (vs hover)
- `target` - Element selector for positioning

## Horizontal Menu

### Basic Horizontal Menu

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]
  },
  {
    text: 'View'
  },
  {
    text: 'Help'
  }
]);
</script>

<template>
  <ejs-menu
    :items="items"
    orientation="Horizontal"
  ></ejs-menu>
</template>

<style scoped>
:deep(.e-menu) {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
}

:deep(.e-menu .e-menu-item) {
  padding: 12px 16px;
  display: inline-block;
  vertical-align: top;
}

:deep(.e-menu .e-menu-item:hover) {
  background-color: #f5f5f5;
}
</style>
```

### Top Navigation Bar Example

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Home' },
  { text: 'Products', items: [
    { text: 'Laptops' },
    { text: 'Phones' },
    { text: 'Tablets' }
  ]},
  { text: 'Services', items: [
    { text: 'Support' },
    { text: 'Documentation' }
  ]},
  { text: 'About' },
  { text: 'Contact' }
]);
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">MyApp</div>
    <ejs-menu
      :items="items"
      orientation="Horizontal"
      class="navbar-menu"
    ></ejs-menu>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background-color: #007bff;
  padding: 12px 20px;
  gap: 20px;
}

.navbar-brand {
  color: white;
  font-weight: bold;
  font-size: 18px;
}

:deep(.navbar-menu) {
  flex: 1;
}

:deep(.navbar-menu .e-menu-item) {
  color: white;
  padding: 8px 16px;
}

:deep(.navbar-menu .e-menu-item:hover) {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
```

## Vertical Menu

### Basic Vertical Menu

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'Dashboard',
    iconCss: 'e-icons e-home'
  },
  {
    text: 'Users',
    iconCss: 'e-icons e-people',
    items: [
      { text: 'All Users' },
      { text: 'Add User' },
      { text: 'Manage Roles' }
    ]
  },
  {
    text: 'Reports',
    iconCss: 'e-icons e-chart-line',
    items: [
      { text: 'Sales' },
      { text: 'Analytics' }
    ]
  },
  {
    text: 'Settings',
    iconCss: 'e-icons e-settings'
  }
]);
</script>

<template>
  <ejs-menu
    :items="items"
    orientation="Vertical"
    class="vertical-menu"
  ></ejs-menu>
</template>

<style scoped>
:deep(.vertical-menu) {
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
  height: 100%;
}

:deep(.vertical-menu .e-menu-item) {
  padding: 12px 16px;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
}

:deep(.vertical-menu .e-menu-item:hover),
:deep(.vertical-menu .e-menu-item.e-focused) {
  background-color: #e9ecef;
  border-left-color: #007bff;
  padding-left: 16px;
}

:deep(.vertical-menu .e-menu-item.e-selected) {
  background-color: #e3f2fd;
  color: #007bff;
  border-left-color: #007bff;
}
</style>
```

### Sidebar Navigation

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Profile', iconCss: 'e-icons e-user' },
  { text: 'Account', iconCss: 'e-icons e-key' },
  { text: 'Billing', iconCss: 'e-icons e-credit-card' },
  { separator: true },
  { text: 'Logout', iconCss: 'e-icons e-sign-out' }
]);

const selectedItem = ref(null);

const handleSelect = (args) => {
  selectedItem.value = args.item.text;
};
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h3>Account</h3>
    </div>
    <ejs-menu
      :items="items"
      orientation="Vertical"
      @select="handleSelect"
      class="sidebar-menu"
    ></ejs-menu>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #2c3e50;
  min-height: 100vh;
  padding-top: 20px;
}

.sidebar-header {
  padding: 0 16px 20px;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h3 {
  color: white;
  margin: 0;
  font-size: 16px;
}

:deep(.sidebar-menu) {
  background-color: transparent;
  border: none;
}

:deep(.sidebar-menu .e-menu-item) {
  color: #ecf0f1;
  padding: 12px 16px;
  border-left: 3px solid transparent;
}

:deep(.sidebar-menu .e-menu-item:hover) {
  background-color: #34495e;
  border-left-color: #3498db;
}

:deep(.sidebar-menu .e-menu-item.e-selected) {
  background-color: #3498db;
  color: white;
  border-left-color: #3498db;
}

:deep(.sidebar-menu .e-icons) {
  margin-right: 12px;
}
</style>
```

## Layout Configuration

### Mixed Orientation Layout

```vue
<script setup>
import { ref } from 'vue';

const topItems = ref([
  { text: 'Home' },
  { text: 'About' },
  { text: 'Contact' }
]);

const sideItems = ref([
  { text: 'Overview', iconCss: 'e-icons e-chart-line' },
  { text: 'Analytics', iconCss: 'e-icons e-chart-bar' },
  { text: 'Reports', iconCss: 'e-icons e-document' }
]);
</script>

<template>
  <div class="layout-container">
    <!-- Top Navigation -->
    <nav class="top-nav">
      <ejs-menu
        :items="topItems"
        orientation="Horizontal"
      ></ejs-menu>
    </nav>

    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Side Navigation -->
      <aside class="side-nav">
        <ejs-menu
          :items="sideItems"
          orientation="Vertical"
        ></ejs-menu>
      </aside>

      <!-- Main Content Area -->
      <main class="main-content">
        <h1>Dashboard</h1>
        <p>Main content goes here</p>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-nav {
  background-color: #007bff;
  padding: 12px 20px;
  flex: 0 0 auto;
}

.content-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.side-nav {
  width: 220px;
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .side-nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
    max-height: 200px;
  }
}
</style>
```

## Submenu Positioning

### Automatic Submenu Positioning

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'File', items: [
    { text: 'New' },
    { text: 'Open' },
    { text: 'Recent', items: [
      { text: 'File 1' },
      { text: 'File 2' },
      { text: 'File 3' }
    ]}
  ]},
  { text: 'Edit', items: [
    { text: 'Undo' },
    { text: 'Redo' }
  ]}
]);
</script>

<template>
  <div class="position-demo">
    <p>Submenus automatically position to avoid viewport edges</p>
    <ejs-menu
      :items="items"
      orientation="Horizontal"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.position-demo {
  padding: 20px;
}

:deep(.e-menu) {
  width: 100%;
}
</style>
```

### Custom Submenu Positioning

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'File', items: [
    { text: 'New' },
    { text: 'Open' }
  ]},
  { text: 'Edit', items: [
    { text: 'Cut' },
    { text: 'Copy' }
  ]}
]);

const handleBeforeOpen = (args) => {
  // Custom positioning logic
  const menuElement = args.element;
  if (menuElement) {
    // Adjust position based on viewport
    const rect = menuElement.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      menuElement.style.left = 'auto';
      menuElement.style.right = '0px';
    }
  }
};
</script>

<template>
  <ejs-menu
    :items="items"
    orientation="Horizontal"
    @beforeOpen="handleBeforeOpen"
  ></ejs-menu>
</template>
```

## Scrolling Options

### Horizontal Scrolling

```vue
<script setup>
import { ref } from 'vue';

const items = ref(Array.from({ length: 20 }, (_, i) => ({
  text: `Menu Item ${i + 1}`
})));
</script>

<template>
  <ejs-menu
    :items="items"
    orientation="Horizontal"
    :enableScrolling="true"
    class="scrollable-menu"
  ></ejs-menu>
</template>

<style scoped>
:deep(.scrollable-menu) {
  width: 100%;
  max-width: 800px;
}

:deep(.scrollable-menu .e-hscroll-bar) {
  height: 8px;
  background-color: #ddd;
}

:deep(.scrollable-menu .e-hscroll-bar .e-scroll-bar-thumb) {
  background-color: #999;
}
</style>
```

### Vertical Scrolling with Large Menus

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Category A', items: Array.from({ length: 30 }, (_, i) => ({
    text: `Item A${i + 1}`
  }))}
]);
</script>

<template>
  <ejs-menu
    :items="items"
    orientation="Vertical"
    :enableScrolling="true"
    class="vertical-scrollable"
  ></ejs-menu>
</template>

<style scoped>
:deep(.vertical-scrollable) {
  height: 400px;
  width: 250px;
  overflow-y: auto;
}

:deep(.vertical-scrollable .e-menu-item) {
  padding: 10px 12px;
}
</style>
```

## Responsive Layout

### Mobile-First Responsive Layout

```vue
<script setup>
import { ref, computed } from 'vue';

const items = ref([
  { text: 'Home' },
  { text: 'Products', items: [
    { text: 'Laptops' },
    { text: 'Phones' }
  ]},
  { text: 'Contact' }
]);

const isMobile = computed(() => window.innerWidth < 768);

const menuOrientation = computed(() => 
  isMobile.value ? 'Vertical' : 'Horizontal'
);
</script>

<template>
  <ejs-menu
    :items="items"
    :orientation="menuOrientation"
    :hamburgerMode="isMobile"
    class="responsive-menu"
  ></ejs-menu>
</template>

<style scoped>
.responsive-menu {
  width: 100%;
}

@media (max-width: 768px) {
  :deep(.responsive-menu) {
    flex-direction: column;
  }

  :deep(.responsive-menu .e-menu-item) {
    width: 100%;
  }
}

@media (max-width: 480px) {
  :deep(.responsive-menu .e-menu-item) {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
```

### Breakpoint-Based Layout Switching

```vue
<script setup>
import { ref, onMounted } from 'vue';

const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024
};

const currentBreakpoint = ref('desktop');

const handleResize = () => {
  const width = window.innerWidth;
  if (width < breakpoints.mobile) {
    currentBreakpoint.value = 'mobile';
  } else if (width < breakpoints.tablet) {
    currentBreakpoint.value = 'tablet';
  } else {
    currentBreakpoint.value = 'desktop';
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});
</script>

<template>
  <div class="responsive-container">
    <p>Current breakpoint: {{ currentBreakpoint }}</p>
    <ejs-menu :items="items"></ejs-menu>
  </div>
</template>
```

## RTL Layout

### Right-to-Left Menu

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'ملف', items: [
    { text: 'جديد' },
    { text: 'فتح' },
    { text: 'حفظ' }
  ]},
  { text: 'تحرير', items: [
    { text: 'قص' },
    { text: 'نسخ' },
    { text: 'لصق' }
  ]}
]);
</script>

<template>
  <div class="rtl-container">
    <ejs-menu
      :items="items"
      orientation="Horizontal"
      :enableRtl="true"
      locale="ar-AE"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.rtl-container {
  direction: rtl;
  text-align: right;
}

:deep(.rtl-container .e-menu) {
  text-align: right;
}

:deep(.rtl-container .e-menu-item) {
  text-align: right;
  padding-left: 0;
  padding-right: 16px;
}
</style>
```

### Toggle Between RTL and LTR

```vue
<script setup>
import { ref } from 'vue';

const isRTL = ref(false);

const items = ref([
  { text: 'Menu Item 1' },
  { text: 'Menu Item 2' },
  { text: 'Menu Item 3' }
]);

const toggleRTL = () => {
  isRTL.value = !isRTL.value;
};
</script>

<template>
  <div>
    <button @click="toggleRTL">
      Switch to {{ isRTL ? 'LTR' : 'RTL' }}
    </button>

    <div :class="{ 'rtl-container': isRTL }">
      <ejs-menu
        :items="items"
        :enableRtl="isRTL"
        :locale="isRTL ? 'ar-AE' : 'en-US'"
      ></ejs-menu>
    </div>
  </div>
</template>

<style scoped>
.rtl-container {
  direction: rtl;
  text-align: right;
}

:deep(.rtl-container .e-menu) {
  text-align: right;
}

:deep(.rtl-container .e-menu-item) {
  text-align: right;
}
</style>
```

## Advanced Layout Patterns

### Multi-Column Menu

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Products', items: [
    { text: 'Laptops' },
    { text: 'Phones' },
    { text: 'Tablets' },
    { text: 'Accessories' }
  ]},
  { text: 'Services', items: [
    { text: 'Support' },
    { text: 'Training' },
    { text: 'Consulting' }
  ]}
]);
</script>

<template>
  <ejs-menu
    :items="items"
    orientation="Horizontal"
    class="multi-column-menu"
  ></ejs-menu>
</template>

<style scoped>
:deep(.multi-column-menu .e-menu .e-menu) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 12px;
}

:deep(.multi-column-menu .e-menu-item) {
  grid-column: auto;
}
</style>
```

### Mega Menu Layout

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Products' },
  { text: 'Solutions' },
  { text: 'Resources' }
]);
</script>

<template>
  <div class="mega-menu-container">
    <ejs-menu
      :items="items"
      orientation="Horizontal"
      class="mega-menu"
    ></ejs-menu>

    <!-- Mega menu content panels -->
    <div class="mega-menu-panel">
      <div class="mega-menu-column">
        <h4>Category 1</h4>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <div class="mega-menu-column">
        <h4>Category 2</h4>
        <ul>
          <li>Item 4</li>
          <li>Item 5</li>
          <li>Item 6</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mega-menu-container {
  position: relative;
}

.mega-menu-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-top: none;
  display: none;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  min-width: 600px;
}

.mega-menu-panel.active {
  display: grid;
}

.mega-menu-column {
  padding: 12px;
}

.mega-menu-column h4 {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.mega-menu-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mega-menu-column li {
  padding: 6px 0;
  color: #666;
  cursor: pointer;
}

.mega-menu-column li:hover {
  color: #007bff;
}
</style>
```

## Related Topics

- [Properties and Configuration](./properties-and-configuration.md) - All orientation properties
- [Hamburger Mode](./hamburger-mode.md) - Mobile responsive layouts
- [Styling and Appearance](./styling-and-appearance.md) - Styling for different orientations
- [Accessibility](./accessibility.md) - Accessible layouts and navigation
