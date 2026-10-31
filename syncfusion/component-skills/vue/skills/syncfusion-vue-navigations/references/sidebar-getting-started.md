# Getting Started with Vue Sidebar

## Table of Contents
- [Installation](#installation)
  - [1. Install Syncfusion Packages](#1-install-syncfusion-packages)
  - [2. Import CSS Styles](#2-import-css-styles)
  - [3. Import Components](#3-import-components)
- [Basic Sidebar Implementation](#basic-sidebar-implementation)
  - [Minimal Example](#minimal-example)
  - [With State Management](#with-state-management)
  - [With Toggle Button](#with-toggle-button)
- [Theme Configuration](#theme-configuration)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [Responsive Sidebar](#responsive-sidebar)
- [Complete Setup Example](#complete-setup-example)

---

## Installation

### 1. Install Syncfusion Packages

Install the required packages using npm:

```bash
npm install @syncfusion/ej2-vue-navigations
npm install @syncfusion/ej2-vue-buttons
```

For Material or Bootstrap themes:
```bash
npm install @syncfusion/ej2-base
npm install @syncfusion/ej2-theme-bootstrap5
npm install @syncfusion/ej2-theme-material
```

### 2. Import CSS Styles

Add theme CSS imports to your application entry point (`main.js` or `main.ts`):

```javascript
// Default theme (Material)
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/sidebar/index.css";

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');
```

### 3. Import Components

In your Vue component:

```vue
<script setup>
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
</script>

<template>
  <ejs-sidebar>Sidebar Content</ejs-sidebar>
  <ejs-button>Button</ejs-button>
</template>
```

---

## Basic Sidebar Implementation

### Minimal Example

```vue
<script setup>
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import '@syncfusion/ej2-navigations/styles/material.css';
</script>

<template>
  <ejs-sidebar width="250px">
    <h3>Sidebar Content</h3>
    <p>This is a basic sidebar.</p>
  </ejs-sidebar>
</template>
```

### With State Management

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

const isOpen = ref(false);

const handleToggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="container">
    <ejs-button @click="handleToggle">
      Toggle Sidebar
    </ejs-button>

    <ejs-sidebar
      width="250px"
      :isOpen="isOpen"
      @change="(args) => isOpen = args.element.classList.contains('e-open')"
      type="Over"
    >
      <h3>Navigation</h3>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
      </ul>
    </ejs-sidebar>

    <div class="main-content">
      <h1>Main Content Area</h1>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
```

### With Toggle Button

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

const sidebarRef = ref(null);

const openSidebar = () => {
  sidebarRef.value?.show();
};

const closeSidebar = () => {
  sidebarRef.value?.hide();
};

const toggleSidebar = () => {
  sidebarRef.value?.toggle();
};
</script>

<template>
  <div>
    <div class="button-group">
      <ejs-button @click="openSidebar">Show</ejs-button>
      <ejs-button @click="closeSidebar">Hide</ejs-button>
      <ejs-button @click="toggleSidebar">Toggle</ejs-button>
    </div>

    <ejs-sidebar
      ref="sidebarRef"
      width="250px"
      type="Over"
    >
      Sidebar Content
    </ejs-sidebar>
  </div>
</template>

<style scoped>
.button-group {
  margin-bottom: 20px;
}

.button-group button {
  margin-right: 10px;
}
</style>
```

---

## Theme Configuration

### Theme Options

Syncfusion provides multiple built-in themes:

| Theme | CSS File | Best For |
|-------|----------|----------|
| Material | `material.css` | Modern Material Design |
| Bootstrap | `bootstrap5.css` | Bootstrap-styled apps |
| Fluent | `fluent.css` | Microsoft Fluent Design |
| Tailwind | `tailwind.css` | Tailwind CSS projects |

### Applying Themes

```javascript
// In main.js

// Material Theme (Default)
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-base/styles/material.css';

// Bootstrap Theme
// import '@syncfusion/ej2-navigations/styles/bootstrap5.css';
// import '@syncfusion/ej2-base/styles/bootstrap5.css';

// Fluent Theme
// import '@syncfusion/ej2-navigations/styles/fluent.css';
// import '@syncfusion/ej2-base/styles/fluent.css';

// Tailwind Theme
// import '@syncfusion/ej2-navigations/styles/tailwind.css';
// import '@syncfusion/ej2-base/styles/tailwind.css';
```

### Custom Theme with CSS

```vue
<style scoped>
/* Sidebar background */
:deep(.e-sidebar) {
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
}

/* Sidebar header */
:deep(.e-sidebar h3) {
  color: #333;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

/* Navigation links */
:deep(.e-sidebar ul li a) {
  color: #555;
  padding: 12px 20px;
  display: block;
  text-decoration: none;
  transition: background-color 0.3s;
}

:deep(.e-sidebar ul li a:hover) {
  background-color: #e3f2fd;
  color: #1976d2;
}
</style>
```

---

## Initial State Management

### Control Sidebar Open State

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

// Start with sidebar open
const isOpen = ref(true);

const handleChange = (args) => {
  const nowOpen = args.element.classList.contains('e-open');
  isOpen.value = nowOpen;
};
</script>

<template>
  <ejs-sidebar
    :isOpen="isOpen"
    @change="handleChange"
    type="Push"
    width="250px"
  >
    {/* Content */}
  </ejs-sidebar>
</template>
```

### Using Template Refs for Direct Control

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);

const handleShowClick = () => {
  sidebarRef.value?.show();
};

const handleHideClick = () => {
  sidebarRef.value?.hide();
};

const handleToggleClick = () => {
  sidebarRef.value?.toggle();
};
</script>

<template>
  <div>
    <div>
      <button @click="handleShowClick">Show</button>
      <button @click="handleHideClick">Hide</button>
      <button @click="handleToggleClick">Toggle</button>
    </div>

    <ejs-sidebar
      ref="sidebarRef"
      width="250px"
      type="Over"
    >
      Sidebar Content
    </ejs-sidebar>
  </div>
</template>
```

---

## RTL (Right-to-Left) Support

### Enable RTL for Arabic/Hebrew Languages

```vue
<script setup>
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
</script>

<template>
  <ejs-sidebar
    :enableRtl="true"
    position="Right"
    type="Over"
    width="250px"
  >
    محتوى الشريط الجانبي
  </ejs-sidebar>
</template>
```

### RTL CSS Adjustments

```vue
<style scoped>
/* RTL specific styles */
:deep([dir="rtl"] .e-sidebar) {
  border-right: none;
  border-left: 1px solid #ddd;
}

:deep([dir="rtl"] .e-sidebar ul) {
  text-align: right;
}

:deep([dir="rtl"] .e-sidebar ul li a) {
  padding-right: 20px;
  padding-left: 12px;
}

:deep([dir="rtl"] .e-sidebar ul li a:hover) {
  padding-right: 25px;
  padding-left: 12px;
}
</style>
```

---

## Responsive Sidebar

### Mobile-First Responsive Design

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarWidth = ref('250px');
const sidebarType = ref('Over');

const handleResize = () => {
  if (window.innerWidth < 768) {
    sidebarWidth.value = '80vw';
    sidebarType.value = 'Over';
  } else {
    sidebarWidth.value = '250px';
    sidebarType.value = 'Push';
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="container">
    <ejs-sidebar
      :width="sidebarWidth"
      :type="sidebarType"
    >
      Responsive Sidebar
    </ejs-sidebar>

    <div class="content">
      Main Content
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.content {
  flex: 1;
}

@media (max-width: 767px) {
  .container {
    flex-direction: column;
  }
}
</style>
```

### Using mediaQuery Property

```vue
<script setup>
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
</script>

<template>
  <ejs-sidebar
    type="Auto"
    :isOpen="false"
    width="250px"
    mediaQuery="(min-width: 768px)"
  >
    Responsive Sidebar (Auto type)
  </ejs-sidebar>
</template>
```

---

## Complete Setup Example

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-base/styles/material.css';

const sidebarRef = ref(null);
const isOpen = ref(false);
const theme = ref('material');

const toggleSidebar = () => {
  sidebarRef.value?.toggle();
};

const handleChange = (args) => {
  const nowOpen = args.element.classList.contains('e-open');
  isOpen.value = nowOpen;
};

// Close sidebar on Escape key
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    sidebarRef.value?.hide();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div class="app">
    <header class="header">
      <ejs-button
        class="hamburger"
        @click="toggleSidebar"
        aria-label="Toggle navigation menu"
      >
        ☰ Menu
      </ejs-button>
      <h1>My App</h1>
    </header>

    <div class="main-container">
      <ejs-sidebar
        ref="sidebarRef"
        width="250px"
        type="Over"
        :isOpen="isOpen"
        @change="handleChange"
        showBackdrop
        closeOnDocumentClick
        position="Left"
      >
        <nav class="sidebar-nav">
          <h3>Navigation</h3>
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#orders">Orders</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
      </ejs-sidebar>

      <main class="content">
        <h2>Welcome to the App</h2>
        <p>Click the hamburger menu to open the sidebar.</p>
        <p>Press ESC to close the sidebar.</p>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #1976d2;
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.header h1 {
  margin: 0;
}

.main-container {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 40px;
  background-color: #f5f5f5;
}

.sidebar-nav h3 {
  padding: 20px;
  margin: 0;
  border-bottom: 1px solid #ddd;
  color: #333;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav ul li {
  margin: 0;
}

.sidebar-nav ul li a {
  display: block;
  padding: 12px 20px;
  color: #555;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.sidebar-nav ul li a:hover {
  background-color: #e3f2fd;
  color: #1976d2;
  padding-left: 25px;
}

@media (max-width: 768px) {
  .app {
    width: 100%;
  }
}
</style>
```
