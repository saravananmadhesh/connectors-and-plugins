# Icon Integration and Data Binding

Learn how to integrate icons into breadcrumb items and use various data binding methods.

## Icon Integration

The breadcrumb component supports multiple icon formats: Font icons, images, and SVG icons.

### Font Icons (e-icons)

Use Syncfusion's built-in e-icons font family:

```vue
<template>
  <ejs-breadcrumb :items="itemsWithFontIcons"></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const itemsWithFontIcons = ref([
  { text: 'Home', iconCss: 'e-icons e-home', url: '/' },
  { text: 'Downloads', iconCss: 'e-icons e-download', url: '/downloads' },
  { text: 'Documents', iconCss: 'e-icons e-folder', url: '/documents' }
])
</script>

<style>
@import '@syncfusion/ej2-icons/styles/material.css';
</style>
```

### Bootstrap Icons (e-bicons)

Use Syncfusion's bootstrap icons:

```vue
<template>
  <ejs-breadcrumb :items="itemsWithBootstrapIcons"></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const itemsWithBootstrapIcons = ref([
  { text: 'Home', iconCss: 'e-bicons e-home', url: '/' },
  { text: 'Products', iconCss: 'e-bicons e-box', url: '/products' },
  { text: 'Settings', iconCss: 'e-bicons e-gear', url: '/settings' },
  { text: 'Download', iconCss: 'e-bicons e-download', url: '/download' }
])
</script>

<style>
@import '@syncfusion/ej2-icons/styles/bootstrap.css';
</style>
```

### Available Font Icons

Common e-icons classes:
- `e-home` - Home icon
- `e-folder` - Folder icon
- `e-file` - File icon
- `e-download` - Download icon
- `e-upload` - Upload icon
- `e-settings` - Settings icon
- `e-search` - Search icon
- `e-delete` - Delete icon
- `e-edit` - Edit icon

Common e-bicons classes:
- `e-box` - Box icon
- `e-folder` - Folder icon
- `e-file` - File icon
- `e-circuit` - Circuit icon
- `e-gear` - Settings gear
- `e-star` - Star icon
- `e-check` - Check mark
- `e-close` - Close icon

### Image Icons

Use images as breadcrumb icons:

```vue
<template>
  <ejs-breadcrumb :items="itemsWithImages"></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const itemsWithImages = ref([
  { 
    text: 'Home', 
    iconCss: 'e-icon-home',
    url: '/' 
  },
  { 
    text: 'Products', 
    iconCss: 'e-icon-products',
    url: '/products' 
  }
])
</script>

<style>
.e-icon-home::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url('/images/home.png');
  background-size: contain;
  margin-right: 6px;
}

.e-icon-products::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url('/images/products.png');
  background-size: contain;
  margin-right: 6px;
}
</style>
```

### SVG Icons

Embed SVG icons directly:

```vue
<template>
  <ejs-breadcrumb :items="itemsWithSvg">
    <template #itemTemplate="{ data }">
      <span class="icon-item">
        <svg v-if="data.svgIcon" :viewBox="data.viewBox" class="icon">
          <use :href="'#' + data.svgIcon"></use>
        </svg>
        {{ data.text }}
      </span>
    </template>
  </ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const itemsWithSvg = ref([
  { 
    text: 'Dashboard',
    svgIcon: 'icon-dashboard',
    viewBox: '0 0 24 24',
    url: '/'
  },
  { 
    text: 'Analytics',
    svgIcon: 'icon-analytics',
    viewBox: '0 0 24 24',
    url: '/analytics'
  }
])
</script>

<style scoped>
.icon-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
```

## Icon Positioning

Control where icons appear relative to the text:

### Left Position (Default)

```vue
<template>
  <ejs-breadcrumb :items="items"></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', iconCss: 'e-icons e-home' },
  { text: 'Products', iconCss: 'e-icons e-box' },
  { text: 'Current', iconCss: 'e-icons e-location' }
])
</script>
```

**Result:** 🏠 Home > 📦 Products > 📍 Current

### Right Position

```vue
<template>
  <ejs-breadcrumb :items="items"></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', iconCss: 'e-icons e-home e-icon-right' },
  { text: 'Products', iconCss: 'e-icons e-box e-icon-right' },
  { text: 'Current', iconCss: 'e-icons e-location e-icon-right' }
])
</script>

<style>
.e-icon-right {
  order: 2;
  margin-right: 0;
  margin-left: 6px;
}
</style>
```

**Result:** Home 🏠 > Products 📦 > Current 📍

### Icon Only

```vue
<template>
  <ejs-breadcrumb :items="items">
    <template #itemTemplate="{ data }">
      <span :title="data.text" class="icon-only">
        <i :class="data.iconCss"></i>
      </span>
    </template>
  </ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', iconCss: 'e-icons e-home' },
  { text: 'Products', iconCss: 'e-icons e-box' },
  { text: 'Settings', iconCss: 'e-icons e-settings' }
])
</script>

<style scoped>
.icon-only {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
```

## Data Binding Methods

### Method 1: Static Array Binding

Bind to a predefined array:

```vue
<template>
  <ejs-breadcrumb :items="staticItems"></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const staticItems = ref([
  { text: 'Home', url: '/' },
  { text: 'Shop', url: '/shop' },
  { text: 'Products', url: '/products' }
])
</script>
```

### Method 2: Dynamic Array with v-for

Generate breadcrumb items dynamically:

```vue
<template>
  <ejs-breadcrumb :items="dynamicItems"></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'
import { BreadcrumbComponent } from '@syncfusion/ej2-vue-navigations'

const dynamicItems = ref([
  { id: 1, text: 'Home', url: '/' },
  { id: 2, text: 'Products', url: '/products' },
  { id: 3, text: 'Electronics', url: '/products/electronics' }
])
</script>
```

### Method 3: Computed Items

Transform data using computed properties:

```vue
<template>
  <ejs-breadcrumb :items="computedBreadcrumbs"></ejs-breadcrumb>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPath = ref('/products/electronics/smartphones')

const computedBreadcrumbs = computed(() => {
  const segments = currentPath.value.split('/').filter(s => s)
  let url = ''
  
  return [
    { text: 'Home', url: '/' },
    ...segments.map(segment => {
      url += '/' + segment
      return {
        text: segment.charAt(0).toUpperCase() + segment.slice(1),
        url: url
      }
    })
  ]
})
</script>
```

### Method 4: Fetched Data

Bind to data from an API:

```vue
<template>
  <div>
    <ejs-breadcrumb 
      v-if="breadcrumbs.length > 0"
      :items="breadcrumbs"
    ></ejs-breadcrumb>
    <div v-else>Loading breadcrumbs...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const breadcrumbs = ref([])

const fetchBreadcrumbs = async () => {
  try {
    const response = await fetch('/api/breadcrumbs')
    breadcrumbs.value = await response.json()
  } catch (error) {
    console.error('Error fetching breadcrumbs:', error)
  }
}

onMounted(() => {
  fetchBreadcrumbs()
})
</script>
```

## URL-Based Generation

Automatically generate breadcrumb items from a URL path:

### Current URL Path

```vue
<template>
  <ejs-breadcrumb 
    :url="currentPath"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentPath = ref('')

onMounted(() => {
  // Get current URL path
  currentPath.value = window.location.pathname
})
</script>
```

### Static URL Path

```vue
<template>
  <ejs-breadcrumb 
    url="/products/electronics/smartphones"
  ></ejs-breadcrumb>
</template>

<script setup>
// URL: /products/electronics/smartphones
// Generates:
// - Home > / 
// - products > /products
// - electronics > /products/electronics
// - smartphones > /products/electronics/smartphones
</script>
```

### Customizing Generated Items

Use `beforeItemRender` to modify auto-generated items:

```vue
<template>
  <ejs-breadcrumb 
    url="/products/electronics/smartphones"
    @beforeItemRender="customizeGeneratedItem"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const iconMap = {
  'products': 'e-icons e-box',
  'electronics': 'e-icons e-circuit',
  'smartphones': 'e-icons e-mobile'
}

const customizeGeneratedItem = (args) => {
  const urlSegment = args.item.url.split('/').filter(s => s).pop()
  
  if (urlSegment && iconMap[urlSegment]) {
    args.item.iconCss = iconMap[urlSegment]
  }
  
  // Customize text
  args.item.text = args.item.text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>
```

## Complex Data Binding Examples

### Multi-Level Category Navigation

```vue
<template>
  <div>
    <button 
      v-for="category in categories"
      :key="category.id"
      @click="selectCategory(category)"
      :class="{ active: selectedCategory?.id === category.id }"
    >
      {{ category.name }}
    </button>
    
    <ejs-breadcrumb :items="breadcrumbPath"></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = ref([
  {
    id: 1,
    name: 'Electronics',
    parent: null,
    url: '/electronics'
  },
  {
    id: 2,
    name: 'Smartphones',
    parent: 1,
    url: '/electronics/smartphones'
  },
  {
    id: 3,
    name: 'iPhone',
    parent: 2,
    url: '/electronics/smartphones/iphone'
  }
])

const selectedCategory = ref(null)

const breadcrumbPath = computed(() => {
  if (!selectedCategory.value) {
    return [{ text: 'Home', url: '/' }]
  }

  const path = []
  let current = selectedCategory.value

  while (current) {
    path.unshift({
      text: current.name,
      url: current.url
    })
    current = categories.value.find(c => c.id === current.parent)
  }

  path.unshift({ text: 'Home', url: '/' })
  return path
})

const selectCategory = (category) => {
  selectedCategory.value = category
}
</script>

<style scoped>
button {
  padding: 8px 12px;
  margin-right: 4px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 3px;
}

button.active {
  background: #2196f3;
  color: white;
}
</style>
```

### File System Navigation

```vue
<template>
  <div class="file-browser">
    <div class="breadcrumb-container">
      <ejs-breadcrumb 
        :items="fileBreadcrumbs"
        enableNavigation
        @itemClick="navigateToFolder"
      ></ejs-breadcrumb>
    </div>
    
    <div class="file-list">
      <div 
        v-for="file in currentFiles"
        :key="file.id"
        class="file-item"
        @click="selectFile(file)"
      >
        <i :class="file.iconCss"></i>
        <span>{{ file.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const fileSystem = {
  root: {
    id: '/',
    name: 'root',
    type: 'folder',
    children: [
      { id: '/home', name: 'home', type: 'folder' },
      { id: '/documents', name: 'documents', type: 'folder' },
      { id: '/readme.txt', name: 'readme.txt', type: 'file' }
    ]
  },
  '/home': {
    id: '/home',
    name: 'home',
    type: 'folder',
    parent: '/',
    children: [
      { id: '/home/user', name: 'user', type: 'folder' },
      { id: '/home/profile.jpg', name: 'profile.jpg', type: 'file' }
    ]
  },
  '/documents': {
    id: '/documents',
    name: 'documents',
    type: 'folder',
    parent: '/',
    children: [
      { id: '/documents/report.pdf', name: 'report.pdf', type: 'file' },
      { id: '/documents/letter.docx', name: 'letter.docx', type: 'file' }
    ]
  }
}

const currentPath = ref('/')

const currentFiles = computed(() => {
  const folder = fileSystem[currentPath.value]
  if (!folder) return []

  return folder.children.map(child => ({
    ...child,
    iconCss: child.type === 'folder' 
      ? 'e-icons e-folder' 
      : 'e-icons e-file'
  }))
})

const fileBreadcrumbs = computed(() => {
  const parts = currentPath.value.split('/').filter(p => p)
  const breadcrumbs = [{ text: 'Root', url: '/' }]

  let path = ''
  parts.forEach(part => {
    path += '/' + part
    breadcrumbs.push({
      text: part,
      url: path
    })
  })

  return breadcrumbs
})

const selectFile = (file) => {
  if (file.type === 'folder') {
    currentPath.value = file.id
  } else {
    console.log('Selected file:', file.name)
  }
}

const navigateToFolder = (args) => {
  args.cancel = true
  currentPath.value = args.item.url
}
</script>

<style scoped>
.file-browser {
  padding: 20px;
}

.breadcrumb-container {
  margin-bottom: 20px;
}

.file-list {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.file-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-item:hover {
  background-color: #f5f5f5;
}

.file-item i {
  font-size: 1.2em;
}
</style>
```

### E-Commerce Product Path

```vue
<template>
  <ejs-breadcrumb :items="productBreadcrumbs"></ejs-breadcrumb>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentProduct = ref({
  category: 'Electronics',
  subcategory: 'Smartphones',
  brand: 'Apple',
  model: 'iPhone 14 Pro',
  sku: 'APL-IP14P-256GB'
})

const productBreadcrumbs = computed(() => [
  { text: 'Home', url: '/', iconCss: 'e-icons e-home' },
  { 
    text: currentProduct.value.category, 
    url: `/shop/${currentProduct.value.category.toLowerCase()}`,
    iconCss: 'e-icons e-box'
  },
  { 
    text: currentProduct.value.subcategory, 
    url: `/shop/${currentProduct.value.category.toLowerCase()}/${currentProduct.value.subcategory.toLowerCase()}`,
    iconCss: 'e-icons e-search'
  },
  { 
    text: currentProduct.value.brand, 
    url: `/shop/brands/${currentProduct.value.brand.toLowerCase()}`,
    iconCss: 'e-bicons e-tag'
  },
  { 
    text: currentProduct.value.model, 
    url: `/product/${currentProduct.value.sku}`,
    iconCss: 'e-icons e-location'
  }
])
</script>
```

## Real-World Examples

### GitHub Repository Path

```vue
<ejs-breadcrumb :items="githubPath"></ejs-breadcrumb>

<script setup>
// For: https://github.com/syncfusion/ej2-vue-ui-components/blob/main/README.md

const githubPath = ref([
  { text: 'syncfusion', url: '/syncfusion' },
  { text: 'ej2-vue-ui-components', url: '/syncfusion/ej2-vue-ui-components' },
  { text: 'main', url: '/syncfusion/ej2-vue-ui-components/tree/main' },
  { text: 'README.md', url: '/syncfusion/ej2-vue-ui-components/blob/main/README.md' }
])
</script>
```

### E-Learning Course Path

```vue
<ejs-breadcrumb :items="coursePath"></ejs-breadcrumb>

<script setup>
const coursePath = ref([
  { text: 'Courses', url: '/courses', iconCss: 'e-icons e-book' },
  { text: 'Web Development', url: '/courses/web-dev', iconCss: 'e-icons e-code' },
  { text: 'Vue.js', url: '/courses/web-dev/vue', iconCss: 'e-icons e-chevron-right' },
  { text: 'Breadcrumb Component', url: '/courses/web-dev/vue/breadcrumb', iconCss: 'e-icons e-location' }
])
</script>
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
