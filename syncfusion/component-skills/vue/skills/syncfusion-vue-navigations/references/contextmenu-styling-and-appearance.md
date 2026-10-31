# Styling and Appearance

## Table of Contents
- [CSS Customization](#css-customization)
- [Theme Switching](#theme-switching)
- [Animation Settings](#animation-settings)
- [Dark Mode](#dark-mode)
- [Responsive Design](#responsive-design)
- [Custom CSS Classes](#custom-css-classes)

## CSS Customization

### Basic Styling with :deep()

Use the `:deep()` selector to customize Syncfusion component styles:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' },
  { text: 'Share', id: 'share' }
])
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
</template>

<style scoped>
/* Customize the context menu container */
:deep(.e-contextmenu) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid #e0e0e0;
}

/* Customize menu items */
:deep(.e-contextmenu .e-menu-item) {
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
}

/* Hover state */
:deep(.e-contextmenu .e-menu-item:hover) {
  background-color: #f5f5f5;
  color: #2196f3;
}

/* Active state */
:deep(.e-contextmenu .e-menu-item.e-focused) {
  background-color: #e3f2fd;
  border-left: 3px solid #2196f3;
}

/* Icon styling */
:deep(.e-contextmenu .e-menu-item.e-icon-left) {
  padding-left: 12px;
}

:deep(.e-contextmenu .e-icon-left .e-menu-icon) {
  width: 20px;
  height: 20px;
  margin-right: 12px;
}

/* Separator styling */
:deep(.e-contextmenu .e-separator) {
  margin: 4px 0;
  height: 1px;
  background-color: #e0e0e0;
}
</style>
```

### Advanced Color Customization

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Create', id: 'create', category: 'action' },
  { text: 'Edit', id: 'edit', category: 'action' },
  { text: 'Delete', id: 'delete', category: 'danger' },
  { text: 'Archive', id: 'archive', category: 'warning' }
])

const handleBeforeItemRender = (args) => {
  const category = args.item.category

  switch (category) {
    case 'danger':
      args.element.style.color = '#d32f2f'
      break
    case 'warning':
      args.element.style.color = '#f57c00'
      break
    case 'action':
      args.element.style.color = '#1976d2'
      break
  }
}
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu
    target="#target"
    :items="items"
    @beforeItemRender="handleBeforeItemRender"
  ></ejs-contextmenu>
</template>

<style scoped>
:deep(.e-contextmenu) {
  background: linear-gradient(135deg, #fff 0%, #f9f9f9 100%);
  border-radius: 8px;
}
</style>
```

## Theme Switching

### Built-in Themes

Syncfusion provides multiple themes. Switch by changing CSS imports:

```vue
<script setup>
import { ref } from 'vue'
// Import theme based on user selection
// import '@syncfusion/ej2-base/styles/material.css'
// import '@syncfusion/ej2-navigations/styles/context-menu.material.css'

const items = ref([
  { text: 'Option 1', id: 'opt1' },
  { text: 'Option 2', id: 'opt2' }
])

const theme = ref('material') // material, bootstrap, fabric, highcontrast

const switchTheme = (newTheme) => {
  theme.value = newTheme
  // Dynamically import theme CSS here
  console.log(`Switched to ${newTheme} theme`)
}
</script>

<template>
  <div>
    <div class="theme-switcher">
      <button @click="switchTheme('material')">Material</button>
      <button @click="switchTheme('bootstrap')">Bootstrap</button>
      <button @click="switchTheme('fabric')">Fabric</button>
      <button @click="switchTheme('tailwind')">Tailwind</button>
    </div>
    
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
  </div>
</template>

<style scoped>
.theme-switcher {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
```

### Custom Theme Colors

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' }
])

const primaryColor = ref('#2196f3')
const accentColor = ref('#ff9800')

const themeVariables = computed(() => ({
  '--primary-color': primaryColor.value,
  '--accent-color': accentColor.value,
  '--hover-color': `${primaryColor.value}20`,
  '--text-color': '#333'
}))
</script>

<template>
  <div>
    <div class="color-picker">
      <label>Primary Color:</label>
      <input type="color" v-model="primaryColor">
      
      <label>Accent Color:</label>
      <input type="color" v-model="accentColor">
    </div>
    
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
  </div>
</template>

<style scoped>
.color-picker {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
}

.color-picker label {
  font-weight: 500;
}

.color-picker input {
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

:deep(.e-contextmenu) {
  background-color: var(--bg-color, white);
}

:deep(.e-contextmenu .e-menu-item) {
  color: var(--text-color, #333);
}

:deep(.e-contextmenu .e-menu-item:hover) {
  background-color: var(--hover-color, #f5f5f5);
  color: var(--primary-color, #2196f3);
}

:deep(.e-contextmenu .e-menu-item.e-focused) {
  background-color: var(--primary-color, #2196f3);
  color: white;
}
</style>
```

## Animation Settings

Configure opening and closing animations:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Option 1', id: 'opt1' },
  { text: 'Option 2', id: 'opt2' },
  { text: 'Option 3', id: 'opt3' }
])

// Animation settings
const animationSettings = ref({
  effect: 'FadeIn', // FadeIn, SlideDown, ZoomIn, etc.
  duration: 300,
  easing: 'ease-out'
})

const animationTypes = [
  'FadeIn',
  'SlideDown',
  'ZoomIn',
  'SlideUp',
  'SlideLeft',
  'SlideRight'
]

const changeAnimation = (effect) => {
  animationSettings.value.effect = effect
}
</script>

<template>
  <div>
    <div class="animation-controls">
      <label>Animation Effect:</label>
      <select v-model="animationSettings.effect">
        <option v-for="type in animationTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
      
      <label>Duration (ms):</label>
      <input type="number" v-model.number="animationSettings.duration" min="100" max="1000">
    </div>
    
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      :animationSettings="animationSettings"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.animation-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
}

.animation-controls label {
  font-weight: 500;
}

.animation-controls select,
.animation-controls input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
</style>
```

## Dark Mode

Implement dark mode with CSS variables:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' },
  { text: 'Share', id: 'share' }
])

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.setAttribute(
    'data-theme',
    isDarkMode.value ? 'dark' : 'light'
  )
}
</script>

<template>
  <div>
    <button @click="toggleDarkMode" class="theme-toggle">
      {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </button>
    
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
  </div>
</template>

<style scoped>
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #333333;
  --text-secondary: #999999;
  --border-color: #e0e0e0;
  --hover-bg: #f5f5f5;
}

:root[data-theme='dark'] {
  --bg-primary: #1e1e1e;
  --bg-secondary: #2d2d2d;
  --text-primary: #f5f5f5;
  --text-secondary: #999999;
  --border-color: #404040;
  --hover-bg: #3d3d3d;
}

.theme-toggle {
  margin-bottom: 20px;
  padding: 10px 16px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

:deep(.e-contextmenu) {
  background-color: var(--bg-primary);
  border-color: var(--border-color);
}

:deep(.e-contextmenu .e-menu-item) {
  color: var(--text-primary);
}

:deep(.e-contextmenu .e-menu-item:hover) {
  background-color: var(--hover-bg);
}

:deep(.e-contextmenu .e-separator) {
  background-color: var(--border-color);
}
</style>
```

## Responsive Design

Make context menus responsive for different screen sizes:

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit', iconCss: 'e-icons e-edit' },
  { text: 'Delete', id: 'delete', iconCss: 'e-icons e-delete' },
  { text: 'Share', id: 'share', iconCss: 'e-icons e-share-point' },
  { separator: true },
  { text: 'Archive', id: 'archive', iconCss: 'e-icons e-folder' }
])

const screenSize = ref('desktop')

const handleResize = () => {
  const width = window.innerWidth
  if (width < 480) {
    screenSize.value = 'mobile'
  } else if (width < 768) {
    screenSize.value = 'tablet'
  } else {
    screenSize.value = 'desktop'
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div>
    <p class="screen-info">Current screen: {{ screenSize }}</p>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
  </div>
</template>

<style scoped>
.screen-info {
  font-size: 12px;
  color: #999;
  margin-bottom: 20px;
}

/* Mobile styles */
@media (max-width: 480px) {
  :deep(.e-contextmenu) {
    max-width: 90vw;
    min-width: 150px;
  }

  :deep(.e-contextmenu .e-menu-item) {
    padding: 12px 16px;
    font-size: 16px;
  }
}

/* Tablet styles */
@media (max-width: 768px) {
  :deep(.e-contextmenu) {
    max-width: 80vw;
  }

  :deep(.e-contextmenu .e-menu-item) {
    padding: 10px 14px;
    font-size: 14px;
  }
}

/* Desktop styles */
@media (min-width: 768px) {
  :deep(.e-contextmenu) {
    max-width: 300px;
  }

  :deep(.e-contextmenu .e-menu-item) {
    padding: 10px 16px;
    font-size: 14px;
  }
}
</style>
```

## Custom CSS Classes

Use the `cssClass` property for custom styling:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Option 1', id: 'opt1' },
  { text: 'Option 2', id: 'opt2' }
])

const cssClass = ref('custom-context-menu')

const toggleStyle = () => {
  cssClass.value = cssClass.value === 'custom-context-menu' 
    ? 'custom-context-menu-alt'
    : 'custom-context-menu'
}
</script>

<template>
  <div>
    <button @click="toggleStyle">Toggle Style</button>
    
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      :cssClass="cssClass"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
:deep(.custom-context-menu) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

:deep(.custom-context-menu .e-menu-item) {
  color: white;
  font-weight: 500;
}

:deep(.custom-context-menu .e-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.2);
}

:deep(.custom-context-menu-alt) {
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-color: #f0f4f8;
}

:deep(.custom-context-menu-alt .e-menu-item) {
  color: #1a202c;
}

:deep(.custom-context-menu-alt .e-menu-item:hover) {
  background-color: #e2e8f0;
}
</style>
```

### Material Design Style

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' }
])
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu target="#target" :items="items" css-class="material-design"></ejs-contextmenu>
</template>

<style scoped>
:deep(.material-design) {
  border-radius: 2px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: #ffffff;
  padding: 8px 0;
}

:deep(.material-design .e-menu-item) {
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.87);
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.material-design .e-menu-item:hover) {
  background-color: #f5f5f5;
}

:deep(.material-design .e-menu-item.e-focused) {
  background-color: #f5f5f5;
}
</style>
```

### Glassmorphism Style

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' }
])
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu target="#target" :items="items" css-class="glassmorphism"></ejs-contextmenu>
</template>

<style scoped>
:deep(.glassmorphism) {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

:deep(.glassmorphism .e-menu-item) {
  color: white;
  padding: 12px 16px;
  transition: all 0.3s ease;
}

:deep(.glassmorphism .e-menu-item:hover) {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}
</style>
```

## Best Practices

1. **Use CSS variables:** Define theme colors as CSS variables
2. **Test responsiveness:** Ensure menu works on all screen sizes
3. **Maintain accessibility:** Keep sufficient color contrast
4. **Optimize animations:** Keep animation duration under 300ms
5. **Use :deep() properly:** Scope styles correctly with `:deep()` selector
6. **Load themes early:** Import theme CSS in main.js or component root
7. **Consider dark mode:** Provide dark mode support for better UX
