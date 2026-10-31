# Styling and Appearance

## Table of Contents
1. [Themes](#themes)
2. [CSS Classes](#css-classes)
3. [Custom Styling](#custom-styling)
4. [Icons Integration](#icons-integration)
5. [Dark Mode](#dark-mode)
6. [Responsive Design](#responsive-design)
7. [Animation and Effects](#animation-and-effects)

## Themes

### Built-in Syncfusion Themes

Syncfusion provides multiple pre-built themes. Import the desired theme CSS file in your component.

```vue
<script setup>
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-icons/styles/material.css';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const items = ref([...]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### Available Theme Options

| Theme | CSS Import | Description |
|-------|-----------|-------------|
| Material | `material.css` | Default Material Design theme |
| Material Dark | `material-dark.css` | Dark variant of Material Design |
| Bootstrap | `bootstrap.css` | Bootstrap-inspired styling |
| Bootstrap Dark | `bootstrap-dark.css` | Dark variant of Bootstrap |
| Tailwind | `tailwind.css` | Tailwind CSS styling |
| Tailwind Dark | `tailwind-dark.css` | Dark variant of Tailwind |
| Fabric | `fabric.css` | Microsoft Fabric design |
| Fabric Dark | `fabric-dark.css` | Dark variant of Fabric |
| High Contrast | `highcontrast.css` | High contrast for accessibility |

### Switching Themes at Runtime

```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const items = ref([...]);
const currentTheme = ref('material');
const availableThemes = ['material', 'bootstrap', 'tailwind', 'fabric'];

const switchTheme = (theme) => {
  currentTheme.value = theme;
  
  // Update theme dynamically
  const links = document.querySelectorAll('link[href*="styles"]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href.includes('styles')) {
      const newHref = href.replace(/\/\w+\.css/, `/${theme}.css`);
      link.setAttribute('href', newHref);
    }
  });
};
</script>

<template>
  <div>
    <div class="theme-switcher">
      <button
        v-for="theme in availableThemes"
        :key="theme"
        @click="switchTheme(theme)"
        :class="{ active: currentTheme === theme }"
      >
        {{ theme }}
      </button>
    </div>
    
    <ejs-menu :items="items"></ejs-menu>
  </div>
</template>

<style scoped>
.theme-switcher {
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: white;
}
</style>
```

## CSS Classes

### Syncfusion Menu CSS Classes

| Class | Purpose |
|-------|---------|
| `.e-menu` | Root menu container |
| `.e-menu-item` | Individual menu item |
| `.e-menu-parent` | Parent menu item with children |
| `.e-menu-caret` | Caret indicator for nested items |
| `.e-disabled` | Disabled menu item |
| `.e-focused` | Focused menu item |
| `.e-separator` | Separator line |
| `.e-hamburger` | Hamburger menu icon |
| `.e-menu-icon` | Icon container |

### Applying Custom Classes

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'File', id: 'file' },
  { text: 'Edit', id: 'edit' }
]);
</script>

<template>
  <ejs-menu
    :items="items"
    cssClass="custom-menu-theme"
  ></ejs-menu>
</template>

<style scoped>
:deep(.custom-menu-theme) {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}

:deep(.custom-menu-theme .e-menu-item) {
  padding: 12px 16px;
  font-size: 14px;
}

:deep(.custom-menu-theme .e-menu-item:hover) {
  background-color: #e9ecef;
}

:deep(.custom-menu-theme .e-menu-item.e-focused) {
  background-color: #007bff;
  color: white;
}
</style>
```

## Custom Styling

### Inline Style Properties

```vue
<script setup>
import { ref } from 'vue';

const items = ref([...]);

const menuStyle = {
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};
</script>

<template>
  <ejs-menu
    :items="items"
    :style="menuStyle"
  ></ejs-menu>
</template>
```

### Scoped Styling with Deep Selector

```vue
<template>
  <div class="menu-container">
    <ejs-menu :items="items"></ejs-menu>
  </div>
</template>

<style scoped>
.menu-container :deep(.e-menu) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 10px;
}

.menu-container :deep(.e-menu-item) {
  color: white;
  padding: 12px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.menu-container :deep(.e-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

.menu-container :deep(.e-menu-item.e-focused) {
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.menu-container :deep(.e-separator) {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
```

### Custom Colors and Gradients

```vue
<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>

<template>
  <ejs-menu :items="items" class="gradient-menu"></ejs-menu>
</template>

<style scoped>
:deep(.gradient-menu) {
  background: linear-gradient(to right, #667eea, #764ba2);
}

:deep(.gradient-menu .e-menu-item) {
  color: white;
}

:deep(.gradient-menu .e-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.15);
}

:deep(.gradient-menu .e-menu-item.e-focused) {
  background-color: rgba(0, 0, 0, 0.2);
}

:deep(.gradient-menu .e-menu-parent::after) {
  border-left-color: white;
}
</style>
```

## Icons Integration

### Using Syncfusion Icons

```vue
<script setup>
import { ref } from 'vue';
import '@syncfusion/ej2-icons/styles/material.css';

const items = ref([
  {
    text: 'File',
    iconCss: 'e-icons e-folder-open',
    items: [
      { text: 'New', iconCss: 'e-icons e-new' },
      { text: 'Open', iconCss: 'e-icons e-open' },
      { text: 'Save', iconCss: 'e-icons e-save' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### Icon Size and Positioning

```vue
<template>
  <ejs-menu :items="items" class="custom-icon-menu"></ejs-menu>
</template>

<style scoped>
:deep(.custom-icon-menu .e-menu-icon) {
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

:deep(.custom-icon-menu .e-menu-item) {
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
```

### Font Awesome Integration

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'Social Media',
    iconCss: 'fas fa-share-alt',
    items: [
      { text: 'Facebook', iconCss: 'fab fa-facebook' },
      { text: 'Twitter', iconCss: 'fab fa-twitter' },
      { text: 'LinkedIn', iconCss: 'fab fa-linkedin' }
    ]
  }
]);
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <ejs-menu :items="items" class="fa-menu"></ejs-menu>
</template>

<style scoped>
:deep(.fa-menu .e-menu-icon) {
  margin-right: 8px;
}
</style>
```

## Dark Mode

### Automatic Dark Mode Detection

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';

const isDarkMode = ref(false);

const prefersDarkMode = computed(() => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
});

onMounted(() => {
  isDarkMode.value = prefersDarkMode.value;
  
  // Listen for changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      isDarkMode.value = e.matches;
    });
});
</script>

<template>
  <ejs-menu
    :items="items"
    :class="{ 'dark-mode': isDarkMode }"
  ></ejs-menu>
</template>

<style scoped>
:deep(.dark-mode) {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

:deep(.dark-mode .e-menu-item) {
  color: #e0e0e0;
}

:deep(.dark-mode .e-menu-item:hover) {
  background-color: #333;
}
</style>
```

### Manual Dark Mode Toggle

```vue
<script setup>
import { ref } from 'vue';

const isDarkMode = ref(false);
const items = ref([...]);

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
      Toggle {{ isDarkMode ? 'Light' : 'Dark' }} Mode
    </button>
    
    <ejs-menu
      :items="items"
      class="themeable-menu"
    ></ejs-menu>
  </div>
</template>

<style scoped>
:deep(.themeable-menu) {
  transition: background-color 0.3s, color 0.3s;
}

:root[data-theme="dark"] :deep(.themeable-menu) {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

:root[data-theme="dark"] :deep(.themeable-menu .e-menu-item:hover) {
  background-color: #333;
}

:root[data-theme="light"] :deep(.themeable-menu) {
  background-color: #ffffff;
  color: #333;
}

:root[data-theme="light"] :deep(.themeable-menu .e-menu-item:hover) {
  background-color: #f5f5f5;
}
</style>
```

## Responsive Design

### Responsive Styling

```vue
<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>

<template>
  <ejs-menu :items="items" class="responsive-menu"></ejs-menu>
</template>

<style scoped>
:deep(.responsive-menu) {
  display: flex;
  flex-wrap: wrap;
}

:deep(.responsive-menu .e-menu-item) {
  flex: 1 1 auto;
  min-width: 100px;
}

/* Mobile devices (< 768px) */
@media (max-width: 768px) {
  :deep(.responsive-menu .e-menu-item) {
    flex: 1 1 100%;
    padding: 12px;
  }
  
  :deep(.responsive-menu .e-menu-icon) {
    font-size: 18px;
  }
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  :deep(.responsive-menu .e-menu-item) {
    flex: 1 1 50%;
  }
}

/* Desktop (> 1024px) */
@media (min-width: 1024px) {
  :deep(.responsive-menu .e-menu-item) {
    flex: 0 1 auto;
  }
}
</style>
```

## Animation and Effects

### Custom Animation Timing

```vue
<script setup>
import { ref } from 'vue';

const items = ref([...]);

const animationSettings = {
  effect: 'SlideDown',
  duration: 300,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
};
</script>

<template>
  <ejs-menu
    :items="items"
    :animationSettings="animationSettings"
  ></ejs-menu>
</template>

<style scoped>
:deep(.e-menu-item) {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
```

### Custom Transitions

```vue
<template>
  <ejs-menu :items="items" class="custom-animation"></ejs-menu>
</template>

<style scoped>
:deep(.custom-animation .e-menu-item) {
  transition: all 0.4s ease-out;
}

:deep(.custom-animation .e-menu-item:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

:deep(.custom-animation .e-menu-parent::after) {
  transition: transform 0.3s ease;
}

:deep(.custom-animation .e-menu-item.e-expanded::after) {
  transform: rotate(180deg);
}
</style>
```

## Complete Styling Example

```vue
<script setup>
import { ref } from 'vue';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-icons/styles/material.css';

const items = ref([
  {
    text: 'Dashboard',
    iconCss: 'e-icons e-dashboard',
    items: []
  },
  {
    text: 'Reports',
    iconCss: 'e-icons e-bar-chart',
    items: [
      { text: 'Sales', iconCss: 'e-icons e-chart' },
      { text: 'Inventory', iconCss: 'e-icons e-inventory' }
    ]
  }
]);

const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<template>
  <div class="app">
    <button @click="toggleTheme" class="theme-btn">
      {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
    </button>
    
    <ejs-menu
      :items="items"
      :class="{ dark: isDarkMode }"
      class="styled-menu"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.app {
  padding: 20px;
}

.theme-btn {
  margin-bottom: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

:deep(.styled-menu) {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

:deep(.styled-menu .e-menu-item) {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

:deep(.styled-menu .e-menu-item:hover) {
  background-color: #f0f0f0;
  border-left-color: #007bff;
}

:deep(.styled-menu.dark) {
  background-color: #1e1e1e;
}

:deep(.styled-menu.dark .e-menu-item) {
  color: #e0e0e0;
}

:deep(.styled-menu.dark .e-menu-item:hover) {
  background-color: #333;
}
</style>
```

## Related Topics

- [Properties and Configuration](./properties-and-configuration.md) - Animation settings
- [Menu Items Customization](./menu-items-customization.md) - Custom item styling
- [Hamburger and Mobile Mode](./hamburger-mode.md) - Mobile styling
