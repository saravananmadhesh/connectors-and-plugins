# Navigation and Routing

Learn how to implement navigation functionality in breadcrumb components and integrate them with Vue Router.

## Enabling Navigation

The `enableNavigation` property controls whether breadcrumb items are clickable. By default, it's set to `true`.

### Navigation Enabled (Clickable Items)

```vue
<template>
  <div>
    <h3>Navigation Enabled</h3>
    <ejs-breadcrumb 
      :items="items" 
      enableNavigation
      @itemClick="onItemClick"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' }
])

const onItemClick = (args) => {
  console.log('Item clicked:', args.item.text)
  console.log('URL:', args.item.url)
  // Navigate to the URL
  window.location.href = args.item.url
}
</script>
```

### Navigation Disabled (Display Only)

```vue
<template>
  <ejs-breadcrumb 
    :items="items"
    :enableNavigation="false"
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

## URL Types

The breadcrumb component supports both relative and absolute URLs for navigation.

### Relative URLs

Use relative paths for internal navigation within your application:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Parent Folder', url: '../' },
  { text: 'Documents', url: './documents' },
  { text: 'Project Files', url: './documents/projects' }
])
</script>
```

### Absolute URLs

Use absolute paths (full domain) for external links or specific routes:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: 'https://example.com' },
  { text: 'Documentation', url: 'https://docs.example.com/guide' },
  { text: 'API Reference', url: 'https://api.example.com/reference' }
])
</script>
```

## Handling Item Clicks

### Basic Item Click Event

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
  { text: 'Home', url: '/' },
  { text: 'Shop', url: '/shop' },
  { text: 'Products', url: '/shop/products' }
])

const handleItemClick = (args) => {
  console.log('Item:', args.item)
  console.log('URL:', args.item.url)
  console.log('Element:', args.element)
  console.log('Native Event:', args.event)
}
</script>
```

### Preventing Navigation

Cancel navigation by setting `args.cancel = true`:

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    enableNavigation
    @itemClick="onItemClick"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/', disabled: false },
  { text: 'Admin', url: '/admin', disabled: false },
  { text: 'Settings', url: '/admin/settings', disabled: false }
])

const isAdmin = ref(false)

const onItemClick = (args) => {
  // Prevent navigation to admin area if user is not admin
  if (args.item.url === '/admin' && !isAdmin.value) {
    args.cancel = true
    console.log('Access denied: Admin area requires authentication')
  } else {
    // Allow navigation
    window.location.href = args.item.url
  }
}
</script>
```

## Detecting Modifier Keys

Check if the user clicked with Ctrl, Shift, or other modifier keys:

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    enableNavigation
    @itemClick="onItemClick"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'External', url: 'https://example.com' },
  { text: 'Page', url: '/page' }
])

const onItemClick = (args) => {
  const nativeEvent = args.event

  if (nativeEvent.ctrlKey || nativeEvent.metaKey) {
    // Ctrl or Cmd key: Open in new tab
    window.open(args.item.url, '_blank')
    args.cancel = true
  } else if (nativeEvent.shiftKey) {
    // Shift key: Open in new window
    window.open(args.item.url, '_blank')
    args.cancel = true
  } else {
    // Normal click: Navigate in current tab
    window.location.href = args.item.url
  }
}
</script>
```

## Before Item Render Event

Use the `beforeItemRender` event to customize items before rendering or modify behavior:

### Opening URLs in New Tab

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    enableNavigation
    @beforeItemRender="onBeforeItemRender"
    @itemClick="onItemClick"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/', target: '_self' },
  { text: 'External Docs', url: 'https://docs.example.com', target: '_blank' },
  { text: 'Product', url: '/product', target: '_self' }
])

const onBeforeItemRender = (args) => {
  const item = args.item
  
  if (item.target === '_blank') {
    // Set attributes for new tab opening
    args.element.setAttribute('target', '_blank')
    args.element.setAttribute('rel', 'noopener noreferrer')
  }
}

const onItemClick = (args) => {
  // Handle navigation
  const url = args.item.url
  const target = args.item.target || '_self'
  
  window.open(url, target)
  args.cancel = true // Prevent default navigation
}
</script>
```

### Adding Custom CSS Classes

```vue
<template>
  <ejs-breadcrumb 
    :items="items"
    @beforeItemRender="onBeforeItemRender"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/', active: false },
  { text: 'Products', url: '/products', active: false },
  { text: 'Current', url: '/current', active: true }
])

const onBeforeItemRender = (args) => {
  if (args.item.active) {
    args.element.classList.add('e-active-item')
  }
}
</script>

<style>
.e-active-item {
  font-weight: bold;
  color: #2196f3;
  text-decoration: underline;
}
</style>
```

## Enable Active Item Navigation

By default, the last breadcrumb item (current page) is not clickable. Use `enableActiveItemNavigation` to make it clickable:

### Disabled (Default)

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    enableNavigation
    :enableActiveItemNavigation="false"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Smartphones', url: '/products/smartphones' } // This is not clickable
])
</script>
```

### Enabled

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    enableNavigation
    :enableActiveItemNavigation="true"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Smartphones', url: '/products/smartphones' } // This is clickable
])

const onItemClick = (args) => {
  // Refresh or reload the current page
  window.location.href = args.item.url
}
</script>
```

## Integration with Vue Router

### Using Vue Router for Navigation

```vue
<template>
  <ejs-breadcrumb 
    :items="breadcrumbItems" 
    enableNavigation
    @itemClick="navigateToRoute"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const breadcrumbItems = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' }
])

const navigateToRoute = (args) => {
  // Cancel default navigation
  args.cancel = true
  
  // Use Vue Router to navigate
  router.push(args.item.url)
}
</script>
```

### Dynamic Breadcrumb from Router

```vue
<template>
  <ejs-breadcrumb 
    :items="currentBreadcrumbs" 
    enableNavigation
    @itemClick="navigateToRoute"
  ></ejs-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentBreadcrumbs = computed(() => {
  const path = route.path.split('/').filter(p => p)
  const breadcrumbs = [{ text: 'Home', url: '/' }]
  
  let url = ''
  path.forEach(segment => {
    url += '/' + segment
    breadcrumbs.push({
      text: segment.charAt(0).toUpperCase() + segment.slice(1),
      url: url
    })
  })
  
  return breadcrumbs
})

const navigateToRoute = (args) => {
  args.cancel = true
  router.push(args.item.url)
}
</script>
```

### Prevent Navigation on Last Item

```vue
<template>
  <ejs-breadcrumb 
    :items="breadcrumbItems" 
    enableNavigation
    @itemClick="handleNavigation"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const breadcrumbItems = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Current Item', url: '/products/current' }
])

const handleNavigation = (args) => {
  const isLastItem = args.item === breadcrumbItems.value[breadcrumbItems.value.length - 1]
  
  if (isLastItem) {
    // Don't navigate if it's the current item
    args.cancel = true
  } else {
    args.cancel = true
    router.push(args.item.url)
  }
}
</script>
```

## Setting Active Item

Highlight the current active breadcrumb:

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    :activeItem="currentPage"
    enableNavigation
    @itemClick="onItemClick"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' }
])

const currentPage = ref(route.path)

const onItemClick = (args) => {
  currentPage.value = args.item.url
}
</script>
```

## Complete Navigation Example

```vue
<template>
  <div class="navigation-demo">
    <h2>Breadcrumb Navigation</h2>
    <p>Current Path: {{ currentPath }}</p>
    
    <ejs-breadcrumb 
      :items="navigationItems" 
      :activeItem="currentPath"
      enableNavigation
      @beforeItemRender="customizeItem"
      @itemClick="handleNavigation"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentPath = ref(route.path)

const navigationItems = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' }
])

watch(() => route.path, (newPath) => {
  currentPath.value = newPath
})

const customizeItem = (args) => {
  if (args.item.url === currentPath.value) {
    args.element.classList.add('e-active')
  }
}

const handleNavigation = (args) => {
  args.cancel = true
  
  // Check if navigation is allowed
  if (canNavigateTo(args.item.url)) {
    router.push(args.item.url)
  } else {
    console.warn('Navigation to this page is not allowed')
  }
}

const canNavigateTo = (url) => {
  // Add your navigation validation logic here
  return true
}
</script>

<style scoped>
.navigation-demo {
  padding: 20px;
}

:deep(.e-active) {
  font-weight: bold;
  color: #2196f3;
}
</style>
```

## Event Arguments Reference

### itemClick Event Arguments

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | boolean | Set to `true` to prevent default navigation |
| `element` | HTMLElement | The clicked breadcrumb item element |
| `event` | MouseEvent | The native click event object |
| `item` | BreadcrumbItemModel | The breadcrumb item data |
| `name` | string | Event name: 'itemClick' |

### beforeItemRender Event Arguments

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | boolean | Set to `true` to prevent rendering |
| `element` | HTMLElement | The breadcrumb item element |
| `item` | BreadcrumbItemModel | The breadcrumb item data |
| `name` | string | Event name: 'beforeItemRender' |

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
