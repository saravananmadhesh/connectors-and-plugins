# Customization

Learn how to customize breadcrumb appearance, behavior, templates, and overflow handling.

## Overflow Modes

Control how breadcrumb items display when space is limited. The breadcrumb component provides 6 overflow modes:

### 1. Menu Mode (Default)

Shows fitting items plus a dropdown menu for hidden items.

```vue
<template>
  <div>
    <h3>Menu Overflow Mode</h3>
    <ejs-breadcrumb 
      :items="items" 
      :maxItems="3"
      overflowMode="Menu"
      width="100%"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' },
  { text: 'iPhone 14', url: '/products/electronics/smartphones/iphone-14' }
])
</script>
```

**Behavior:** First item + visible items + dropdown menu with remaining items

### 2. Collapsed Mode

Shows first and last items with ellipsis (...) for hidden items.

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    :maxItems="3"
    overflowMode="Collapsed"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' }
])
</script>
```

**Display:** Home > ... > Smartphones

**Behavior:** Click ellipsis to expand all items

### 3. Scroll Mode

Shows a horizontal scrollbar when items exceed available space.

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    :maxItems="3"
    overflowMode="Scroll"
    width="300px"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' },
  { text: 'iPhone 14 Pro', url: '/products/electronics/smartphones/iphone-14-pro' }
])
</script>
```

**Behavior:** User can scroll horizontally to view hidden items

### 4. Wrap Mode

Displays items on multiple lines when space is limited.

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    :maxItems="3"
    overflowMode="Wrap"
    width="250px"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' }
])
</script>
```

**Behavior:** Items wrap to next line maintaining full visibility

### 5. Hidden Mode

Shows only items that fit; remaining items are hidden.

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    :maxItems="3"
    overflowMode="Hidden"
    width="300px"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' }
])
</script>
```

**Behavior:** Overflow items are completely hidden

### 6. None Mode

Shows all items on a single line without wrapping or scrolling.

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    overflowMode="None"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' }
])
</script>
```

**Behavior:** All items display on single line; may overflow container

## Overflow Mode Comparison

| Mode | Single Line | Interactive | Best Use Case |
|------|------------|------------|---------------|
| Menu | No | Yes (dropdown) | Long paths with navigation |
| Collapsed | Yes | Yes (expand) | Compact display with drill-down |
| Scroll | No | Yes (scrollbar) | Horizontal scrolling support |
| Wrap | No | No | Multi-line layouts |
| Hidden | Yes | No | Limited space, non-critical paths |
| None | Yes | No | Fixed paths, no overflow |

## Managing Maximum Items

Use `maxItems` to control how many items display before overflow kicks in:

```vue
<template>
  <div>
    <ejs-breadcrumb 
      :items="items" 
      :maxItems="maxItemsCount"
      overflowMode="Menu"
    ></ejs-breadcrumb>
    
    <div style="margin-top: 20px;">
      <label>
        Max Items:
        <input 
          v-model.number="maxItemsCount" 
          type="number" 
          min="1" 
          max="10"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const maxItemsCount = ref(3)

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' },
  { text: 'iPhone 14', url: '/products/electronics/smartphones/iphone-14' }
])
</script>
```

## Item-Level Disabling

Disable specific breadcrumb items while keeping others interactive:

### Static Disabled Items

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    enableNavigation
    @itemClick="handleItemClick"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/', disabled: false },
  { text: 'Products', url: '/products', disabled: false },
  { text: 'Admin', url: '/admin', disabled: true }, // Disabled
  { text: 'Settings', url: '/admin/settings', disabled: true } // Disabled
])

const handleItemClick = (args) => {
  if (args.item.disabled) {
    args.cancel = true
    console.log('This item is disabled')
  }
}
</script>
```

### Conditional Disabling

```vue
<template>
  <div>
    <label>
      <input v-model="isAdmin" type="checkbox" />
      Admin User
    </label>
    
    <ejs-breadcrumb 
      :items="dynamicItems" 
      enableNavigation
      @itemClick="handleItemClick"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isAdmin = ref(false)

const baseItems = [
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Admin Panel', url: '/admin' },
  { text: 'Settings', url: '/admin/settings' }
]

const dynamicItems = computed(() => {
  return baseItems.map(item => ({
    ...item,
    disabled: (item.url.includes('/admin') && !isAdmin.value)
  }))
})

const handleItemClick = (args) => {
  if (args.item.disabled) {
    args.cancel = true
  }
}
</script>
```

## Item Templates

Customize how breadcrumb items are rendered using Vue slots:

### Basic Item Template

```vue
<template>
  <ejs-breadcrumb :items="items">
    <template #itemTemplate="{ data }">
      <span class="custom-item">
        <i v-if="data.iconCss" :class="data.iconCss"></i>
        <span class="item-text">{{ data.text }}</span>
      </span>
    </template>
  </ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', iconCss: 'e-icons e-home' },
  { text: 'Products', iconCss: 'e-bicons e-box' },
  { text: 'Electronics', iconCss: 'e-bicons e-circuit' }
])
</script>

<style scoped>
.custom-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-text {
  font-weight: 500;
}
</style>
```

### Conditional Item Rendering

```vue
<template>
  <ejs-breadcrumb :items="items">
    <template #itemTemplate="{ data }">
      <div class="custom-item">
        <span v-if="data.type === 'folder'" class="badge badge-folder">
          📁 {{ data.text }}
        </span>
        <span v-else-if="data.type === 'file'" class="badge badge-file">
          📄 {{ data.text }}
        </span>
        <span v-else>{{ data.text }}</span>
      </div>
    </template>
  </ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Root', type: 'folder' },
  { text: 'Documents', type: 'folder' },
  { text: 'Projects', type: 'folder' },
  { text: 'README.md', type: 'file' }
])
</script>

<style scoped>
.custom-item {
  padding: 4px 8px;
}

.badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.9em;
}

.badge-folder {
  background-color: #fff3cd;
  color: #856404;
}

.badge-file {
  background-color: #d1ecf1;
  color: #0c5460;
}
</style>
```

### Rich Content Templates

```vue
<template>
  <ejs-breadcrumb :items="items">
    <template #itemTemplate="{ data }">
      <div class="rich-item">
        <img 
          v-if="data.image" 
          :src="data.image" 
          :alt="data.text"
          class="item-image"
        />
        <div class="item-info">
          <span class="item-title">{{ data.text }}</span>
          <span v-if="data.subtitle" class="item-subtitle">
            {{ data.subtitle }}
          </span>
        </div>
      </div>
    </template>
  </ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', image: '/images/home.png' },
  { text: 'Categories', subtitle: '5 items' },
  { text: 'Electronics', image: '/images/electronics.png', subtitle: '120 products' }
])
</script>

<style scoped>
.rich-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 8px;
}

.item-image {
  width: 24px;
  height: 24px;
  border-radius: 3px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-title {
  font-weight: 600;
  font-size: 0.95em;
}

.item-subtitle {
  font-size: 0.8em;
  color: #666;
}
</style>
```

## Separator Templates

Customize the separator (divider) between breadcrumb items:

### Basic Separator Template

```vue
<template>
  <ejs-breadcrumb :items="items">
    <template #separatorTemplate>
      <span class="custom-separator">/</span>
    </template>
  </ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' }
])
</script>

<style scoped>
.custom-separator {
  margin: 0 8px;
  color: #999;
  font-weight: bold;
}
</style>
```

### Icon Separators

```vue
<template>
  <ejs-breadcrumb :items="items">
    <template #separatorTemplate>
      <i class="e-icons e-arrow-right"></i>
    </template>
  </ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Dashboard', url: '/' },
  { text: 'Analytics', url: '/analytics' },
  { text: 'Reports', url: '/analytics/reports' }
])
</script>

<style scoped>
:deep(.e-arrow-right) {
  margin: 0 6px;
  color: #2196f3;
}
</style>
```

## CSS Styling and Classes

### Using CSS Class Property

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    cssClass="custom-breadcrumb"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' }
])
</script>

<style>
.custom-breadcrumb {
  background-color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-breadcrumb .e-breadcrumb-item {
  color: #2196f3;
  font-weight: 500;
}

.custom-breadcrumb .e-breadcrumb-item:hover {
  color: #1976d2;
  text-decoration: underline;
}
</style>
```

### Dynamic Class Binding

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    :cssClass="dynamicClass"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref, computed } from 'vue'

const isDarkMode = ref(false)

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Services', url: '/services' }
])

const dynamicClass = computed(() => {
  return isDarkMode.value ? 'dark-theme' : 'light-theme'
})
</script>

<style>
.light-theme {
  background-color: white;
  color: #333;
}

.dark-theme {
  background-color: #333;
  color: white;
}

.dark-theme .e-breadcrumb-item {
  color: #aaa;
}

.dark-theme .e-breadcrumb-item:hover {
  color: #fff;
}
</style>
```

### Advanced Styling with beforeItemRender

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    @beforeItemRender="customizeItemStyle"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Level 1', level: 1 },
  { text: 'Level 2', level: 2 },
  { text: 'Level 3', level: 3 }
])

const customizeItemStyle = (args) => {
  const level = args.item.level
  
  // Apply color based on level
  if (level === 1) {
    args.element.style.color = '#1976d2'
  } else if (level === 2) {
    args.element.style.color = '#388e3c'
  } else {
    args.element.style.color = '#f57c00'
  }
  
  // Add background to last item
  if (level === items.value.length) {
    args.element.style.backgroundColor = '#f5f5f5'
    args.element.style.padding = '4px 8px'
    args.element.style.borderRadius = '3px'
  }
}
</script>
```

## Theme Styling

### Bootstrap 5 Theme

```vue
<style>
@import '@syncfusion/ej2-vue-navigations/styles/bootstrap5.css';
</style>
```

### Material Design Theme

```vue
<style>
@import '@syncfusion/ej2-vue-navigations/styles/material3.css';
</style>
```

### Tailwind Theme

```vue
<style>
@import '@syncfusion/ej2-vue-navigations/styles/tailwind.css';
</style>
```

### Custom Theme Colors

```vue
<style>
:root {
  --breadcrumb-bg: #f9f9f9;
  --breadcrumb-text: #333;
  --breadcrumb-hover: #2196f3;
}

.e-breadcrumb {
  background-color: var(--breadcrumb-bg);
}

.e-breadcrumb-item {
  color: var(--breadcrumb-text);
}

.e-breadcrumb-item:hover {
  color: var(--breadcrumb-hover);
}
</style>
```

## Complete Customization Example

```vue
<template>
  <div class="customization-demo">
    <div class="controls">
      <label>
        Overflow Mode:
        <select v-model="selectedMode">
          <option value="Menu">Menu</option>
          <option value="Collapsed">Collapsed</option>
          <option value="Scroll">Scroll</option>
          <option value="Wrap">Wrap</option>
          <option value="Hidden">Hidden</option>
          <option value="None">None</option>
        </select>
      </label>
      
      <label>
        Max Items:
        <input v-model.number="maxItems" type="number" min="1" max="10" />
      </label>
      
      <label>
        <input v-model="isDarkMode" type="checkbox" />
        Dark Mode
      </label>
    </div>
    
    <ejs-breadcrumb 
      :items="items" 
      :maxItems="maxItems"
      :overflowMode="selectedMode"
      :cssClass="isDarkMode ? 'dark-theme' : 'light-theme'"
      @beforeItemRender="customizeItem"
    >
      <template #separatorTemplate>
        <i class="e-icons e-arrow-right"></i>
      </template>
    </ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMode = ref('Menu')
const maxItems = ref(3)
const isDarkMode = ref(false)

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' },
  { text: 'iPhone 14 Pro', url: '/products/electronics/smartphones/iphone-14-pro' }
])

const customizeItem = (args) => {
  if (args.item === items.value[items.value.length - 1]) {
    args.element.classList.add('e-active')
  }
}
</script>

<style scoped>
.customization-demo {
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.controls input,
.controls select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.light-theme {
  background-color: white;
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.dark-theme {
  background-color: #333;
  padding: 12px 16px;
  border-radius: 4px;
}

:deep(.dark-theme .e-breadcrumb-item) {
  color: #aaa;
}

:deep(.e-active) {
  font-weight: bold;
  color: #2196f3;
}
</style>
```

## Component Registration

For the official Syncfusion Vue UG registration pattern, use Options API with `export default`:

**Local Import:**
```typescript
import { BreadcrumbComponent } from "@syncfusion/ej2-vue-navigations";

export default {
  name: "App",
  components: {
    'ejs-breadcrumb': BreadcrumbComponent
  },
  data() {
    return {
      items: [
        { text: 'Home', url: '/' },
        { text: 'Products', url: '/products' }
      ]
    }
  }
}
```

**Global Registration (main.ts):**
```typescript
import { createApp } from 'vue'
import { BreadcrumbComponent } from '@syncfusion/ej2-vue-navigations'

const app = createApp(App)
app.component('ejs-breadcrumb', BreadcrumbComponent)
app.mount('#app')
```

```
