# Hamburger and Mobile Mode

## Table of Contents
1. [Overview](#overview)
2. [Basic Setup](#basic-setup)
3. [Mobile Detection](#mobile-detection)
4. [Responsive Implementation](#responsive-implementation)
5. [Hamburger Control](#hamburger-control)
6. [Sidebar Integration](#sidebar-integration)
7. [Touch Gestures](#touch-gestures)
8. [Mobile-Specific Styling](#mobile-specific-styling)

## Overview

Hamburger mode displays the menu as a toggle button on mobile devices, expanding into a slide-out menu. This component automatically adapts to small screens using the `hamburgerMode` property.

### When to Use Hamburger Mode

- Mobile devices (< 768px)
- Responsive web applications
- Limited horizontal space
- Navigation-heavy applications

## Basic Setup

### Enable Hamburger Mode

```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const items = ref([
  { text: 'Home' },
  { text: 'About' },
  { text: 'Services' },
  { text: 'Contact' }
]);
</script>

<template>
  <!-- Basic hamburger menu -->
  <ejs-menu
    :items="items"
    :hamburgerMode="true"
  ></ejs-menu>
</template>
```

### With Title

```vue
<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>

<template>
  <ejs-menu
    :items="items"
    :hamburgerMode="true"
    title="Navigation Menu"
  ></ejs-menu>
</template>
```

## Mobile Detection

### Automatic Mobile Detection

```vue
<script setup>
import { ref, computed } from 'vue';

const windowWidth = ref(window.innerWidth);

// Update on resize
window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});

const isMobile = computed(() => windowWidth.value < 768);

const items = ref([...]);
</script>

<template>
  <ejs-menu
    :items="items"
    :hamburgerMode="isMobile"
    :title="isMobile ? 'Menu' : undefined"
  ></ejs-menu>
</template>
```

### Manual Mobile Detection Hook

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(false);
const items = ref([...]);

const checkMobileView = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobileView();
  window.addEventListener('resize', checkMobileView);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobileView);
});
</script>

<template>
  <ejs-menu
    :items="items"
    :hamburgerMode="isMobile"
  ></ejs-menu>
</template>
```

## Responsive Implementation

### Conditional Hamburger Mode

```vue
<script setup>
import { ref, computed } from 'vue';

const windowWidth = ref(window.innerWidth);
const items = ref([
  { text: 'Dashboard', id: 'dashboard' },
  { text: 'Products', id: 'products', items: [
    { text: 'Electronics' },
    { text: 'Clothing' }
  ]},
  { text: 'Orders', id: 'orders' },
  { text: 'Settings', id: 'settings' }
]);

const breakpoint = 768; // Mobile breakpoint

const useHamburger = computed(() => windowWidth.value < breakpoint);

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});
</script>

<template>
  <div class="responsive-menu-container">
    <ejs-menu
      :items="items"
      :hamburgerMode="useHamburger"
      :title="useHamburger ? 'Menu' : undefined"
      orientation="Vertical"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.responsive-menu-container {
  width: 100%;
}

@media (max-width: 768px) {
  :deep(.e-menu) {
    width: 100%;
  }
  
  :deep(.e-hamburger) {
    display: block;
  }
}

@media (min-width: 769px) {
  :deep(.e-hamburger) {
    display: none;
  }
}
</style>
```

### Multi-Breakpoint Setup

```vue
<script setup>
import { ref, computed } from 'vue';

const windowWidth = ref(window.innerWidth);
const items = ref([...]);

const breakpoints = {
  mobile: 576,
  tablet: 768,
  desktop: 1024
};

const deviceType = computed(() => {
  if (windowWidth.value < breakpoints.mobile) return 'small-mobile';
  if (windowWidth.value < breakpoints.tablet) return 'mobile';
  if (windowWidth.value < breakpoints.desktop) return 'tablet';
  return 'desktop';
});

const useHamburger = computed(() => {
  return deviceType.value === 'small-mobile' || 
         deviceType.value === 'mobile' ||
         deviceType.value === 'tablet';
});

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});
</script>

<template>
  <ejs-menu
    :items="items"
    :hamburgerMode="useHamburger"
  ></ejs-menu>
</template>
```

## Hamburger Control

### Opening and Closing Programmatically

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([...]);

const openMenu = () => {
  const instance = menuRef.value.ej2_instances[0];
  instance.open();
};

const closeMenu = () => {
  const instance = menuRef.value.ej2_instances[0];
  instance.close();
};

const toggleMenu = () => {
  const instance = menuRef.value.ej2_instances[0];
  // Check if menu is open and toggle
  const element = instance.element;
  if (element.classList.contains('e-menu-open')) {
    instance.close();
  } else {
    instance.open();
  }
};
</script>

<template>
  <div>
    <div class="controls">
      <button @click="openMenu">Open</button>
      <button @click="closeMenu">Close</button>
      <button @click="toggleMenu">Toggle</button>
    </div>
    
    <ejs-menu
      ref="menuRef"
      :items="items"
      :hamburgerMode="true"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### Menu State Tracking

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const isMenuOpen = ref(false);
const items = ref([...]);

const handleMenuOpen = () => {
  isMenuOpen.value = true;
};

const handleMenuClose = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div>
    <p>Menu is {{ isMenuOpen ? 'OPEN' : 'CLOSED' }}</p>
    
    <ejs-menu
      ref="menuRef"
      :items="items"
      :hamburgerMode="true"
      @onOpen="handleMenuOpen"
      @onClose="handleMenuClose"
    ></ejs-menu>
  </div>
</template>
```

## Sidebar Integration

### Integrating with Sidebar Component

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-popups';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);
const items = ref([
  { text: 'Home', id: 'home' },
  { text: 'About', id: 'about' },
  { text: 'Services', id: 'services' },
  { text: 'Contact', id: 'contact' }
]);

const toggleSidebar = () => {
  const sidebar = sidebarRef.value.ej2_instances[0];
  sidebar.toggle();
};

const handleMenuSelect = (args) => {
  // Close sidebar when item selected
  const sidebar = sidebarRef.value.ej2_instances[0];
  sidebar.hide();
};
</script>

<template>
  <div class="sidebar-layout">
    <button @click="toggleSidebar" class="menu-btn">☰</button>
    
    <ejs-sidebar
      ref="sidebarRef"
      type="Push"
      width="250px"
    >
      <ejs-menu
        :items="items"
        @select="handleMenuSelect"
      ></ejs-menu>
    </ejs-sidebar>
    
    <div class="content">
      <p>Main Content Area</p>
    </div>
  </div>
</template>

<style scoped>
.sidebar-layout {
  display: flex;
  height: 100vh;
}

.menu-btn {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
```

## Touch Gestures

### Swipe to Open/Close

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([...]);
let touchStartX = 0;
let touchStartY = 0;

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  
  const diffX = touchEndX - touchStartX;
  const diffY = Math.abs(touchEndY - touchStartY);
  
  // Swipe right to open (at least 50px)
  if (diffX > 50 && diffY < 100) {
    const instance = menuRef.value.ej2_instances[0];
    instance.open();
  }
  
  // Swipe left to close (at least 50px)
  if (diffX < -50 && diffY < 100) {
    const instance = menuRef.value.ej2_instances[0];
    instance.close();
  }
};
</script>

<template>
  <div
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    style="height: 100vh"
  >
    <ejs-menu
      ref="menuRef"
      :items="items"
      :hamburgerMode="true"
    ></ejs-menu>
  </div>
</template>
```

## Mobile-Specific Styling

### Mobile Menu Styling

```vue
<template>
  <ejs-menu
    :items="items"
    :hamburgerMode="true"
    class="mobile-menu"
  ></ejs-menu>
</template>

<style scoped>
:deep(.mobile-menu) {
  width: 100%;
}

:deep(.mobile-menu .e-hamburger) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

:deep(.mobile-menu .e-hamburger::before) {
  content: '☰';
  font-size: 24px;
}

:deep(.mobile-menu .e-menu-wrapper) {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  overflow-y: auto;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

:deep(.mobile-menu.e-menu-open .e-menu-wrapper) {
  transform: translateX(0);
}

@media (max-width: 480px) {
  :deep(.mobile-menu .e-menu-item) {
    padding: 16px 20px;
    font-size: 16px;
  }
  
  :deep(.mobile-menu .e-menu-icon) {
    margin-right: 16px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  :deep(.mobile-menu .e-menu-item) {
    padding: 12px 16px;
    font-size: 15px;
  }
}
</style>
```

### Overlay Background

```vue
<template>
  <div class="menu-container">
    <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu"></div>
    
    <ejs-menu
      ref="menuRef"
      :items="items"
      :hamburgerMode="true"
      @onOpen="isMenuOpen = true"
      @onClose="isMenuOpen = false"
      class="overlay-menu"
    ></ejs-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const isMenuOpen = ref(false);
const items = ref([...]);

const closeMenu = () => {
  const instance = menuRef.value.ej2_instances[0];
  instance.close();
};
</script>

<style scoped>
.menu-container {
  position: relative;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

:deep(.overlay-menu) {
  position: relative;
  z-index: 1000;
}
</style>
```

## Complete Mobile Menu Example

```vue
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const menuRef = ref(null);
const windowWidth = ref(window.innerWidth);
const isMenuOpen = ref(false);

const items = ref([
  {
    text: 'Home',
    id: 'home',
    iconCss: 'e-icons e-home'
  },
  {
    text: 'Products',
    id: 'products',
    iconCss: 'e-icons e-product',
    items: [
      { text: 'Electronics' },
      { text: 'Clothing' },
      { text: 'Books' }
    ]
  },
  {
    text: 'Services',
    id: 'services',
    iconCss: 'e-icons e-service',
    items: [
      { text: 'Support' },
      { text: 'Consulting' }
    ]
  },
  {
    text: 'About',
    id: 'about',
    iconCss: 'e-icons e-info'
  },
  {
    text: 'Contact',
    id: 'contact',
    iconCss: 'e-icons e-contact'
  }
]);

const isMobile = computed(() => windowWidth.value < 768);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const handleMenuSelect = (args) => {
  console.log('Selected:', args.item.text);
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="mobile-app">
    <header class="app-header">
      <h1>Mobile Menu Demo</h1>
      <span class="device-info">{{ isMobile ? 'Mobile' : 'Desktop' }}</span>
    </header>
    
    <nav class="app-nav">
      <ejs-menu
        ref="menuRef"
        :items="items"
        :hamburgerMode="isMobile"
        title="Menu"
        orientation="Vertical"
        @select="handleMenuSelect"
        @onOpen="isMenuOpen = true"
        @onClose="isMenuOpen = false"
      ></ejs-menu>
    </nav>
    
    <main class="app-content">
      <p>Welcome to the mobile-responsive menu demo!</p>
      <p>Resize your browser to see hamburger mode activate.</p>
    </main>
  </div>
</template>

<style scoped>
.mobile-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-header {
  background-color: #007bff;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  margin: 0;
  font-size: 20px;
}

.device-info {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.app-nav {
  flex-shrink: 0;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 18px;
  }
  
  .app-content {
    padding: 16px;
  }
}
</style>
```

## Related Topics

- [Properties and Configuration](./properties-and-configuration.md) - Hamburger mode property
- [Methods and API](./methods-api.md) - open() and close() methods
- [Styling and Appearance](./styling-and-appearance.md) - Responsive styling
