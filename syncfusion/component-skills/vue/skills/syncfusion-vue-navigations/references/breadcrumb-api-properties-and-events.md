# API Properties and Events

Complete reference for breadcrumb component properties, events, and event arguments.

## Component Properties

The breadcrumb component provides 11 configurable properties to control its behavior and appearance.

### activeItem

**Type:** `string`

**Default:** `''`

Specifies the URL or ID of the currently active breadcrumb item. This helps highlight the user's current location.

```vue
<template>
  <div>
    <ejs-breadcrumb 
      :items="items" 
      :activeItem="currentPage"
    ></ejs-breadcrumb>
    
    <div style="margin-top: 20px;">
      <button @click="currentPage = '/'">Go to Home</button>
      <button @click="currentPage = '/products'">Go to Products</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref('/products')

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' }
])
</script>
```

### cssClass

**Type:** `string`

**Default:** `''`

Applies custom CSS classes to the breadcrumb container for styling purposes.

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    cssClass="custom-breadcrumb themed-dark"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Current', url: '/current' }
])
</script>

<style>
.custom-breadcrumb {
  background-color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 4px;
}

.custom-breadcrumb.themed-dark {
  background-color: #333;
  color: white;
}
</style>
```

### disabled

**Type:** `boolean`

**Default:** `false`

Disables the entire breadcrumb component, making it non-interactive.

```vue
<template>
  <div>
    <label>
      <input v-model="isBreadcrumbDisabled" type="checkbox" />
      Disable Breadcrumb
    </label>
    
    <ejs-breadcrumb 
      :items="items" 
      :disabled="isBreadcrumbDisabled"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isBreadcrumbDisabled = ref(false)

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' }
])
</script>
```

### enableNavigation

**Type:** `boolean`

**Default:** `true`

Controls whether breadcrumb items are clickable and navigable.

```vue
<!-- Navigation Enabled -->
<ejs-breadcrumb 
  :items="items" 
  enableNavigation
  @itemClick="onItemClick"
></ejs-breadcrumb>

<!-- Navigation Disabled (Display Only) -->
<ejs-breadcrumb 
  :items="items" 
  :enableNavigation="false"
></ejs-breadcrumb>
```

### enableActiveItemNavigation

**Type:** `boolean`

**Default:** `false`

When `true`, allows clicking on the last (active) breadcrumb item. By default, the current page item is not clickable.

```vue
<template>
  <div>
    <label>
      <input v-model="canClickActiveItem" type="checkbox" />
      Allow clicking active item
    </label>
    
    <ejs-breadcrumb 
      :items="items" 
      enableNavigation
      :enableActiveItemNavigation="canClickActiveItem"
      @itemClick="onItemClick"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const canClickActiveItem = ref(false)

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' } // Last item (active)
])

const onItemClick = (args) => {
  console.log('Clicked:', args.item.text)
  if (args.item === items.value[items.value.length - 1]) {
    console.log('User clicked the active item')
  }
}
</script>
```

### enableRtl

**Type:** `boolean`

**Default:** `false`

Enables right-to-left (RTL) rendering for languages like Arabic, Hebrew, and Persian.

```vue
<template>
  <div>
    <label>
      <input v-model="isRtl" type="checkbox" />
      Enable RTL
    </label>
    
    <ejs-breadcrumb 
      :items="items" 
      :enableRtl="isRtl"
      :dir="isRtl ? 'rtl' : 'ltr'"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isRtl = ref(false)

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' }
])
</script>
```

### items

**Type:** `BreadcrumbItemModel[]`

**Default:** `[]`

Array of breadcrumb items to display. Each item requires `text` and optionally `url`, `disabled`, and `iconCss` properties.

```vue
<template>
  <ejs-breadcrumb :items="dynamicItems"></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const dynamicItems = ref([
  { text: 'Home', url: '/', id: 'home' },
  { text: 'Products', url: '/products', id: 'products' },
  { text: 'Electronics', url: '/products/electronics', id: 'electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones', id: 'smartphones' }
])

// Update items dynamically
const addItem = (item) => {
  dynamicItems.value.push(item)
}

const removeItem = (id) => {
  dynamicItems.value = dynamicItems.value.filter(item => item.id !== id)
}
</script>
```

### maxItems

**Type:** `number`

**Default:** `Undefined`

Specifies the maximum number of breadcrumb items to display before overflow handling kicks in. Set in conjunction with `overflowMode`.

```vue
<template>
  <div>
    <label>
      Max Items: 
      <input v-model.number="itemLimit" type="number" min="1" max="10" />
    </label>
    
    <ejs-breadcrumb 
      :items="items" 
      :maxItems="itemLimit"
      overflowMode="Menu"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const itemLimit = ref(3)

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/electronics' },
  { text: 'Smartphones', url: '/smartphones' },
  { text: 'iPhone 14', url: '/iphone-14' }
])
</script>
```

### overflowMode

**Type:** `string`

**Default:** `'Menu'`

Specifies how breadcrumb items are displayed when they exceed available space.

**Valid Values:**
- `'Menu'` - Show dropdown menu for overflow items
- `'Collapsed'` - Show first and last items with ellipsis
- `'Scroll'` - Add horizontal scrollbar
- `'Wrap'` - Display items on multiple lines
- `'Hidden'` - Hide overflow items
- `'None'` - Show all items on single line

```vue
<template>
  <div>
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
    
    <ejs-breadcrumb 
      :items="items" 
      :maxItems="3"
      :overflowMode="selectedMode"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMode = ref('Menu')

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/electronics' },
  { text: 'Smartphones', url: '/smartphones' },
  { text: 'Current Item', url: '/current' }
])
</script>
```

### itemTemplate

**Type:** `string | Function`

**Default:** `Undefined`

Custom template for rendering breadcrumb items. Allows customization of item appearance and content.

```vue
<template>
  <ejs-breadcrumb :items="items">
    <template #itemTemplate="{ data }">
      <div class="custom-item">
        <i v-if="data.iconCss" :class="data.iconCss"></i>
        <span class="text">{{ data.text }}</span>
        <span v-if="data.badge" class="badge">{{ data.badge }}</span>
      </div>
    </template>
  </ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', iconCss: 'e-icons e-home' },
  { text: 'Products', iconCss: 'e-icons e-box', badge: '5 new' },
  { text: 'Cart', iconCss: 'e-icons e-shopping-cart', badge: '2' }
])
</script>

<style scoped>
.custom-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background-color: #f44336;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.75em;
}
</style>
```

### separatorTemplate

**Type:** `string | Function`

**Default:** `Undefined`

Custom template for rendering the separator between breadcrumb items.

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
  { text: 'Level 1', url: '/' },
  { text: 'Level 2', url: '/level2' },
  { text: 'Level 3', url: '/level3' }
])
</script>

<style scoped>
:deep(.e-arrow-right) {
  margin: 0 8px;
  color: #2196f3;
  font-size: 1.2em;
}
</style>
```

### url

**Type:** `string`

**Default:** `Undefined`

Automatically generates breadcrumb items from a URL path. When set, breadcrumb items are generated based on the path segments.

```vue
<template>
  <ejs-breadcrumb 
    url="/products/electronics/smartphones"
  ></ejs-breadcrumb>
</template>

<script setup>
// Auto-generates:
// Home > / 
// products > /products
// electronics > /products/electronics
// smartphones > /products/electronics/smartphones
</script>
```

## Item Properties

Each breadcrumb item in the `items` array has the following properties:

### text

**Type:** `string`

**Required:** Yes

The display text for the breadcrumb item.

```javascript
{ text: 'Home', url: '/' }
```

### url

**Type:** `string`

**Required:** No

The URL to navigate to when the item is clicked. If not provided, the item is not clickable.

```javascript
{ text: 'Products', url: '/products' }
```

### disabled

**Type:** `boolean`

**Default:** `false`

When `true`, the breadcrumb item is disabled and cannot be clicked.

```vue
<script setup>
const items = ref([
  { text: 'Admin', url: '/admin', disabled: true }, // Disabled
  { text: 'Settings', url: '/settings', disabled: false } // Enabled
])
</script>
```

### iconCss

**Type:** `string`

**Default:** `''`

CSS classes for displaying an icon next to the breadcrumb text. Use e-icons or e-bicons classes.

```javascript
{ 
  text: 'Home', 
  url: '/', 
  iconCss: 'e-icons e-home' 
}
```

### id

**Type:** `string`

**Default:** `''`

Unique identifier for the breadcrumb item. Useful for tracking and referencing items.

```javascript
{ 
  id: 'home-item',
  text: 'Home', 
  url: '/',
  iconCss: 'e-icons e-home' 
}
```

## Component Events

The breadcrumb component emits 3 events for handling user interactions and lifecycle events.

### beforeItemRender

**Event Arguments:** `BreadcrumbBeforeItemRenderEventArgs`

Fires before each breadcrumb item is rendered. Use this event to customize items before display.

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
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Current', url: '/current', isCurrent: true }
])

const onBeforeItemRender = (args) => {
  // Customize the item element before rendering
  if (args.item.isCurrent) {
    args.element.classList.add('current-page')
    args.element.setAttribute('aria-current', 'page')
  }
  
  // Add target="_blank" to external links
  if (args.item.url?.includes('http')) {
    args.element.setAttribute('target', '_blank')
    args.element.setAttribute('rel', 'noopener noreferrer')
  }
}
</script>

<style>
.current-page {
  font-weight: bold;
  color: #2196f3;
}
</style>
```

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | boolean | Set to `true` to prevent rendering |
| `element` | HTMLElement | The breadcrumb item element |
| `item` | BreadcrumbItemModel | The breadcrumb item data |
| `name` | string | Event name: 'beforeItemRender' |

### itemClick

**Event Arguments:** `BreadcrumbClickEventArgs`

Fires when a breadcrumb item is clicked. Use this event to handle navigation or prevent default behavior.

```vue
<template>
  <div>
    <ejs-breadcrumb 
      :items="items"
      enableNavigation
      @itemClick="onItemClick"
    ></ejs-breadcrumb>
    
    <div v-if="lastClickedItem">
      <p>Last clicked: {{ lastClickedItem.text }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' }
])

const lastClickedItem = ref(null)

const onItemClick = (args) => {
  lastClickedItem.value = args.item
  
  // Prevent default navigation and handle manually
  args.cancel = true
  
  // Custom navigation logic
  console.log('Navigating to:', args.item.url)
  window.history.pushState({}, '', args.item.url)
  
  // Check for modifier keys
  if (args.event.ctrlKey || args.event.metaKey) {
    // Ctrl/Cmd: Open in new tab
    window.open(args.item.url, '_blank')
  } else if (args.event.shiftKey) {
    // Shift: Open in new window
    window.open(args.item.url)
  }
}
</script>
```

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | boolean | Set to `true` to prevent default navigation |
| `element` | HTMLElement | The clicked breadcrumb item element |
| `event` | MouseEvent | Native click event object |
| `item` | BreadcrumbItemModel | The breadcrumb item data |
| `name` | string | Event name: 'itemClick' |

### created

**Event Arguments:** `Event`

Fires when the breadcrumb component has been fully initialized and rendered.

```vue
<template>
  <ejs-breadcrumb 
    :items="items"
    @created="onBreadcrumbCreated"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' }
])

const onBreadcrumbCreated = () => {
  console.log('Breadcrumb component created and initialized')
  // Initialize external libraries or perform setup tasks
}
</script>
```

## Complete API Example

```vue
<template>
  <div class="api-demo">
    <h2>Breadcrumb API Reference</h2>
    
    <div class="controls">
      <label>
        <input v-model="properties.enableNavigation" type="checkbox" />
        Enable Navigation
      </label>
      
      <label>
        <input v-model="properties.enableRtl" type="checkbox" />
        Enable RTL
      </label>
      
      <label>
        <input v-model.number="properties.maxItems" type="number" min="1" />
        Max Items
      </label>
      
      <select v-model="properties.overflowMode">
        <option value="Menu">Menu</option>
        <option value="Collapsed">Collapsed</option>
        <option value="Scroll">Scroll</option>
      </select>
      
      <button @click="resetProperties">Reset</button>
    </div>
    
    <ejs-breadcrumb 
      :items="breadcrumbItems"
      :enableNavigation="properties.enableNavigation"
      :enableRtl="properties.enableRtl"
      :maxItems="properties.maxItems"
      :overflowMode="properties.overflowMode"
      :activeItem="properties.activeItem"
      @beforeItemRender="onBeforeItemRender"
      @itemClick="onItemClick"
      @created="onCreated"
    ></ejs-breadcrumb>
    
    <div class="event-log">
      <h3>Event Log</h3>
      <div v-for="event in eventLog" :key="event.id" class="log-entry">
        {{ event.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const properties = ref({
  enableNavigation: true,
  enableRtl: false,
  maxItems: 3,
  overflowMode: 'Menu',
  activeItem: '/products'
})

const breadcrumbItems = ref([
  { text: 'Home', url: '/', iconCss: 'e-icons e-home' },
  { text: 'Products', url: '/products', iconCss: 'e-icons e-box' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' }
])

const eventLog = ref([])
let eventId = 0

const addEventLog = (message) => {
  eventLog.value.unshift({
    id: eventId++,
    message: `${new Date().toLocaleTimeString()}: ${message}`
  })
  if (eventLog.value.length > 5) {
    eventLog.value.pop()
  }
}

const onBeforeItemRender = (args) => {
  addEventLog(`beforeItemRender: ${args.item.text}`)
}

const onItemClick = (args) => {
  addEventLog(`itemClick: ${args.item.text}`)
}

const onCreated = () => {
  addEventLog('created: Breadcrumb initialized')
}

const resetProperties = () => {
  properties.value = {
    enableNavigation: true,
    enableRtl: false,
    maxItems: 3,
    overflowMode: 'Menu',
    activeItem: '/products'
  }
}
</script>

<style scoped>
.api-demo {
  padding: 20px;
}

.controls {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.controls input,
.controls select,
.controls button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.controls button {
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  border: none;
}

.event-log {
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.log-entry {
  padding: 4px 0;
  font-family: monospace;
  font-size: 0.9em;
  color: #333;
  border-bottom: 1px solid #eee;
}
</style>
```

## Template Usage

### Component Registration

**Local Import (Options API):**
```typescript
import { BreadcrumbComponent } from "@syncfusion/ej2-vue-navigations";

export default {
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

### Basic Template Structure

```vue
<template>
  <ejs-breadcrumb 
    :items="items"
    enableNavigation
    :maxItems="3"
    overflowMode="Menu"
    @beforeItemRender="onBeforeItemRender"
    @itemClick="onItemClick"
  ></ejs-breadcrumb>
</template>
```

## Type Definitions

For TypeScript projects, use these type definitions:

```typescript
// Breadcrumb Item
interface BreadcrumbItemModel {
  id?: string
  text: string
  url?: string
  disabled?: boolean
  iconCss?: string
}

// Event Arguments
interface BreadcrumbClickEventArgs {
  cancel: boolean
  element: HTMLElement
  event: MouseEvent
  item: BreadcrumbItemModel
  name: string
}

interface BreadcrumbBeforeItemRenderEventArgs {
  cancel: boolean
  element: HTMLElement
  item: BreadcrumbItemModel
  name: string
}
```

## Summary Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `activeItem` | string | '' | URL of active item |
| `cssClass` | string | '' | Custom CSS classes |
| `disabled` | boolean | false | Disable component |
| `enableNavigation` | boolean | true | Allow navigation |
| `enableActiveItemNavigation` | boolean | false | Make last item clickable |
| `enableRtl` | boolean | false | Enable RTL rendering |
| `items` | BreadcrumbItemModel[] | [] | Breadcrumb items |
| `maxItems` | number | Undefined | Max display items |
| `overflowMode` | string | 'Menu' | Menu/Collapsed/Scroll/Wrap/Hidden/None |
| `itemTemplate` | Function | Undefined | Custom item template |
| `separatorTemplate` | Function | Undefined | Custom separator template |
| `url` | string | Undefined | Auto-generate from URL |
