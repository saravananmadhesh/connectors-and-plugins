# Styling & Customization

## Table of Contents
- [Theme Switching](#theme-switching)
- [CSS Customization](#css-customization)
- [Animation Variations](#animation-variations)
- [Responsive Design](#responsive-design)
- [Custom Themes](#custom-themes)

---

## Theme Switching

### Material Theme

```vue
<script setup>
import { ref } from 'vue';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
</script>

<template>
  <ejs-sidebar
    type="Over"
    width="250px"
    class="e-material"
  >
    <nav>
      <a href="#home">Home</a>
      <a href="#products">Products</a>
    </nav>
  </ejs-sidebar>
</template>
```

### Bootstrap5 Theme

```vue
<script setup>
import { ref } from 'vue';
import '@syncfusion/ej2-base/styles/bootstrap5.css';
import '@syncfusion/ej2-navigations/styles/bootstrap5.css';
</script>

<template>
  <ejs-sidebar type="Over" class="e-bootstrap5">
    <nav>
      <a href="#home">Home</a>
      <a href="#products">Products</a>
    </nav>
  </ejs-sidebar>
</template>
```

### Dynamic Theme Switching

```vue
<script setup>
import { ref, computed, watch } from 'vue';

const currentTheme = ref('material');
const themes = ref(['material', 'bootstrap5', 'fluent', 'tailwind']);

// Dynamically import theme CSS
const loadTheme = (theme) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://cdn.jsdelivr.net/npm/@syncfusion/ej2-base/styles/${theme}.css`;
  document.head.appendChild(link);

  const navLink = document.createElement('link');
  navLink.rel = 'stylesheet';
  navLink.href = `https://cdn.jsdelivr.net/npm/@syncfusion/ej2-navigations/styles/${theme}.css`;
  document.head.appendChild(navLink);
};

const handleThemeChange = (newTheme) => {
  currentTheme.value = newTheme;
  loadTheme(newTheme);
  document.body.className = `e-${newTheme}`;
};

watch(() => currentTheme.value, (newTheme) => {
  handleThemeChange(newTheme);
}, { immediate: true });
</script>

<template>
  <div>
    <div class="theme-selector">
      <select v-model="currentTheme">
        <option v-for="theme in themes" :key="theme" :value="theme">
          {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
        </option>
      </select>
    </div>

    <ejs-sidebar type="Over" width="250px">
      <h3>Themed Sidebar</h3>
      <p>Theme: {{ currentTheme }}</p>
    </ejs-sidebar>
  </div>
</template>

<style scoped>
.theme-selector {
  margin: 20px;
}

.theme-selector select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
</style>
```

---

## CSS Customization

### Custom Width & Spacing

```vue
<template>
  <ejs-sidebar
    type="Over"
    width="350px"
  >
    <div class="sidebar-header">
      <h3>Custom Styled</h3>
    </div>
    <nav class="custom-nav">
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <a href="#contact">Contact</a>
    </nav>
  </ejs-sidebar>
</template>

<style scoped>
:deep(.e-sidebar) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

:deep(.e-sidebar h3) {
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.custom-nav {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.custom-nav a {
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.custom-nav a:hover {
  background: rgba(255, 255, 255, 0.1);
  border-left-color: #ffd700;
  padding-left: 25px;
}

.custom-nav a.active {
  background: rgba(255, 255, 255, 0.2);
  border-left-color: #ffd700;
}
</style>
```

### Color Variations

```vue
<script setup>
import { ref } from 'vue';

const sidebarColor = ref('primary');
const colorOptions = ref([
  { name: 'Primary', value: 'primary' },
  { name: 'Success', value: 'success' },
  { name: 'Warning', value: 'warning' },
  { name: 'Danger', value: 'danger' }
]);
</script>

<template>
  <div>
    <div class="controls">
      <button
        v-for="option in colorOptions"
        :key="option.value"
        @click="sidebarColor = option.value"
        :class="{ active: sidebarColor === option.value }"
      >
        {{ option.name }}
      </button>
    </div>

    <ejs-sidebar
      type="Over"
      :class="[`sidebar-${sidebarColor}`]"
    >
      <h3>{{ sidebarColor.toUpperCase() }}</h3>
      <p>Color: {{ sidebarColor }}</p>
    </ejs-sidebar>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 10px;
  margin: 20px;
}

.controls button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.controls button.active {
  background: #333;
  color: white;
  border-color: #333;
}

:deep(.sidebar-primary) {
  background: #2196f3;
  color: white;
}

:deep(.sidebar-success) {
  background: #4caf50;
  color: white;
}

:deep(.sidebar-warning) {
  background: #ff9800;
  color: white;
}

:deep(.sidebar-danger) {
  background: #f44336;
  color: white;
}
</style>
```

---

## Animation Variations

### Slide Animation

```vue
<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <div>
    <button @click="isOpen = !isOpen">
      Toggle Sidebar
    </button>

    <ejs-sidebar
      type="Slide"
      width="250px"
      :isOpen="isOpen"
      @change="isOpen = $event.isOpen"
      class="slide-animation"
    >
      <h3>Slide Animation</h3>
      <p>Content slides smoothly from the side</p>
    </ejs-sidebar>
  </div>
</template>

<style scoped>
:deep(.e-sidebar.slide-animation) {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
```

### Push Animation

```vue
<template>
  <ejs-sidebar
    type="Push"
    width="250px"
    class="push-animation"
  >
    <h3>Push Animation</h3>
    <p>Content pushes main area when opening</p>
  </ejs-sidebar>
</template>

<style scoped>
:deep(.e-sidebar.push-animation) {
  transition: all 0.3s ease-out;
}

:deep(.e-sidebar.push-animation.e-open + .e-main) {
  transition: margin-left 0.3s ease-out;
}
</style>
```

### Fade Effect

```vue
<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <ejs-sidebar
    type="Over"
    width="250px"
    :isOpen="isOpen"
    class="fade-animation"
  >
    <h3>Fade Effect</h3>
    <p>Backdrop fades in smoothly</p>
  </ejs-sidebar>
</template>

<style scoped>
:deep(.e-sidebar.fade-animation) {
  animation: fadeIn 0.3s ease-in;
}

:deep(.e-sidebar-overlay.fade-animation) {
  animation: fadeInBackdrop 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInBackdrop {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}
</style>
```

---

## Responsive Design

### Media Query Breakpoints

```vue
<script setup>
import { ref, computed } from 'vue';

const isOpen = ref(false);

const sidebarWidth = computed(() => {
  // Determine width based on viewport
  if (window.innerWidth < 768) {
    return '100%'; // Mobile: full width
  } else if (window.innerWidth < 1024) {
    return '280px'; // Tablet
  } else {
    return '320px'; // Desktop
  }
});
</script>

<template>
  <ejs-sidebar
    type="Over"
    :width="sidebarWidth"
    :mediaQuery="'(max-width: 768px)'"
  >
    <h3>Responsive Sidebar</h3>
  </ejs-sidebar>
</template>

<style scoped>
/* Mobile: Full-width overlay */
@media (max-width: 768px) {
  :deep(.e-sidebar) {
    width: 100% !important;
  }
}

/* Tablet: Medium width */
@media (min-width: 769px) and (max-width: 1023px) {
  :deep(.e-sidebar) {
    width: 280px !important;
  }
}

/* Desktop: Standard width */
@media (min-width: 1024px) {
  :deep(.e-sidebar) {
    width: 320px !important;
  }
}
</style>
```

### Auto Display Type

```vue
<script setup>
import { ref } from 'vue';

const sidebarType = ref('Auto');

const handleResize = () => {
  if (window.innerWidth < 768) {
    sidebarType.value = 'Over';
  } else {
    sidebarType.value = 'Push';
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <ejs-sidebar
    :type="sidebarType"
    :mediaQuery="'(max-width: 768px)'"
  >
    <h3>Auto Responsive</h3>
    <p>Type: {{ sidebarType }}</p>
  </ejs-sidebar>
</template>
```

### Collapsible Sidebar for Mobile

```vue
<script setup>
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<template>
  <div class="responsive-layout">
    <header class="header">
      <button v-if="isMobile" @click="isOpen = !isOpen" class="toggle-btn">
        ☰
      </button>
      <h1>My App</h1>
    </header>

    <div class="container">
      <ejs-sidebar
        v-if="!isMobile"
        type="Push"
        :isOpen="true"
        :closeOnDocumentClick="false"
      >
        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </nav>
      </ejs-sidebar>

      <ejs-sidebar
        v-else
        type="Over"
        :isOpen="isOpen"
        @change="isOpen = $event.isOpen"
      >
        <nav>
          <a href="#home" @click="isOpen = false">Home</a>
          <a href="#products" @click="isOpen = false">Products</a>
          <a href="#contact" @click="isOpen = false">Contact</a>
        </nav>
      </ejs-sidebar>

      <main class="content">
        <h2>Main Content</h2>
      </main>
    </div>
  </div>
</template>

<style scoped>
.responsive-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
}

.container {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px;
}

@media (max-width: 768px) {
  .container {
    position: relative;
  }

  .content {
    width: 100%;
  }
}
</style>
```

---

## Custom Themes

### Dark Mode Theme

```vue
<script setup>
import { ref } from 'vue';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.setAttribute(
    'data-theme',
    isDarkMode.value ? 'dark' : 'light'
  );
};
</script>

<template>
  <div>
    <button @click="toggleDarkMode">
      {{ isDarkMode ? '🌙' : '☀️' }} Theme
    </button>

    <ejs-sidebar
      type="Over"
      width="250px"
      :class="{ 'dark-theme': isDarkMode }"
    >
      <h3>Theme Demo</h3>
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
      </nav>
    </ejs-sidebar>
  </div>
</template>

<style scoped>
:deep(.dark-theme) {
  background: #1e1e1e;
  color: #e0e0e0;
}

:deep(.dark-theme h3) {
  color: #ffffff;
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

:deep(.dark-theme nav a) {
  color: #e0e0e0;
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

:deep(.dark-theme nav a:hover) {
  background: rgba(255, 255, 255, 0.1);
}

:deep(.dark-theme nav a.active) {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}
</style>
```

### Gradient Background

```vue
<template>
  <ejs-sidebar type="Over" width="250px" class="gradient-sidebar">
    <h3>Gradient Theme</h3>
    <nav>
      <a href="#item1">Item 1</a>
      <a href="#item2">Item 2</a>
      <a href="#item3">Item 3</a>
    </nav>
  </ejs-sidebar>
</template>

<style scoped>
:deep(.gradient-sidebar) {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  );
  color: white;
}

:deep(.gradient-sidebar h3) {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

:deep(.gradient-sidebar nav a) {
  color: rgba(255, 255, 255, 0.9);
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

:deep(.gradient-sidebar nav a:hover) {
  background: rgba(0, 0, 0, 0.1);
  border-left-color: rgba(255, 255, 255, 0.5);
  padding-left: 25px;
}
</style>
```

### Material Design 3 Style

```vue
<script setup>
import { ref } from 'vue';

const selectedItem = ref(null);
</script>

<template>
  <ejs-sidebar type="Over" width="280px" class="material-3">
    <div class="sidebar-content">
      <h3>Material Design 3</h3>
      <nav>
        <a
          href="#home"
          :class="{ active: selectedItem === 'home' }"
          @click="selectedItem = 'home'"
        >
          <span class="icon">🏠</span>
          <span>Home</span>
        </a>
        <a
          href="#products"
          :class="{ active: selectedItem === 'products' }"
          @click="selectedItem = 'products'"
        >
          <span class="icon">📦</span>
          <span>Products</span>
        </a>
        <a
          href="#settings"
          :class="{ active: selectedItem === 'settings' }"
          @click="selectedItem = 'settings'"
        >
          <span class="icon">⚙️</span>
          <span>Settings</span>
        </a>
      </nav>
    </div>
  </ejs-sidebar>
</template>

<style scoped>
:deep(.material-3) {
  background: #fffbfe;
  border-right: 1px solid #e0e0e0;
}

:deep(.material-3 h3) {
  padding: 16px;
  margin: 0;
  font-size: 22px;
  font-weight: 500;
  color: #1a1a1a;
  border-bottom: 1px solid #e0e0e0;
}

:deep(.material-3 nav) {
  padding: 8px 0;
}

:deep(.material-3 nav a) {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 4px 8px;
  color: #49454f;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

:deep(.material-3 nav a:hover) {
  background: rgba(73, 69, 79, 0.08);
  color: #1a1a1a;
}

:deep(.material-3 nav a.active) {
  background: #eae1ff;
  color: #6750a4;
}

:deep(.material-3 nav a .icon) {
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```
