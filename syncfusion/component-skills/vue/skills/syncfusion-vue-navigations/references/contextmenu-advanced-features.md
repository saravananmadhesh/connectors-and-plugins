# Advanced Features

## Table of Contents
- [Scrollable Menus](#scrollable-menus)
- [Animation Effects](#animation-effects)
- [Filter and Element Selection](#filter-and-element-selection)
- [Hover Delay](#hover-delay)
- [Persistence](#persistence)
- [Performance Optimization](#performance-optimization)

## Scrollable Menus

Enable scrolling for menus with many items:

```vue
<script setup>
import { ref } from 'vue'

// Generate large menu
const items = ref(Array.from({ length: 50 }, (_, i) => ({
  text: `Item ${i + 1}`,
  id: `item-${i + 1}`
})))

const enableScrolling = ref(true)
const itemCount = ref(50)

const addMoreItems = () => {
  const currentCount = items.value.length
  const newItems = Array.from({ length: 10 }, (_, i) => ({
    text: `Item ${currentCount + i + 1}`,
    id: `item-${currentCount + i + 1}`
  }))
  items.value.push(...newItems)
  itemCount.value = items.value.length
}

const removeItems = () => {
  if (items.value.length > 10) {
    items.value.pop()
    itemCount.value = items.value.length
  }
}
</script>

<template>
  <div>
    <div class="controls">
      <label>
        <input type="checkbox" v-model="enableScrolling">
        Enable Scrolling
      </label>
      <p>Items: {{ itemCount }}</p>
      <button @click="addMoreItems">Add 10 Items</button>
      <button @click="removeItems">Remove Item</button>
    </div>

    <div id="target">Right click to open menu ({{ itemCount }} items)</div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      :enableScrolling="enableScrolling"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.controls {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.controls p {
  margin: 10px 0;
  font-weight: bold;
}

button {
  padding: 8px 12px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
}

#target {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
```

### Custom Scroll Height

```vue
<script setup>
import { ref } from 'vue'

const items = ref(Array.from({ length: 30 }, (_, i) => ({
  text: `Option ${i + 1}`,
  id: `opt-${i + 1}`
})))

const scrollHeight = ref('300px')
</script>

<template>
  <div>
    <div class="controls">
      <label>Scroll Height:</label>
      <select v-model="scrollHeight">
        <option value="200px">200px</option>
        <option value="300px">300px</option>
        <option value="400px">400px</option>
        <option value="500px">500px</option>
      </select>
    </div>

    <div id="target">Right click to open menu</div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      enableScrolling
      :cssClass="`scroll-${scrollHeight.replace('px', '')}`"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
:deep(.scroll-200 .e-contextmenu) {
  max-height: 200px;
  overflow-y: auto;
}

:deep(.scroll-300 .e-contextmenu) {
  max-height: 300px;
  overflow-y: auto;
}

:deep(.scroll-400 .e-contextmenu) {
  max-height: 400px;
  overflow-y: auto;
}

:deep(.scroll-500 .e-contextmenu) {
  max-height: 500px;
  overflow-y: auto;
}
</style>
```

## Animation Effects

### Built-in Animation Types

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Option 1', id: 'opt1' },
  { text: 'Option 2', id: 'opt2' },
  { text: 'Option 3', id: 'opt3' }
])

const animationEffect = ref('FadeIn')
const animationDuration = ref(300)

const effectTypes = [
  'FadeIn',
  'SlideDown',
  'ZoomIn',
  'SlideUp',
  'SlideLeft',
  'SlideRight',
  'None'
]

const animationSettings = ref({
  effect: animationEffect.value,
  duration: animationDuration.value
})

const updateAnimation = () => {
  animationSettings.value = {
    effect: animationEffect.value,
    duration: animationDuration.value
  }
}
</script>

<template>
  <div>
    <div class="controls">
      <label>Animation Effect:</label>
      <select v-model="animationEffect" @change="updateAnimation">
        <option v-for="effect in effectTypes" :key="effect" :value="effect">
          {{ effect }}
        </option>
      </select>

      <label>Duration (ms):</label>
      <input 
        type="number" 
        v-model.number="animationDuration"
        @change="updateAnimation"
        min="0"
        max="1000"
        step="50"
      >
    </div>

    <div id="target">Right click to see {{ animationEffect }} animation</div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      :animationSettings="animationSettings"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.controls select,
.controls input {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

#target {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
```

### Custom Animation Timing

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Fast Animation', id: 'fast' },
  { text: 'Normal Animation', id: 'normal' },
  { text: 'Slow Animation', id: 'slow' }
])

const animationSettings = ref({
  effect: 'ZoomIn',
  duration: 300,
  easing: 'ease-out'
})
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu
    target="#target"
    :items="items"
    :animationSettings="animationSettings"
  ></ejs-contextmenu>
</template>

<style scoped>
@keyframes customZoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

:deep(.e-contextmenu) {
  animation: customZoomIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
```

## Filter and Element Selection

Use filter to select specific elements for context menu:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' },
  { text: 'Share', id: 'share' }
])

const filter = ref('.context-enabled')

const toggleFilter = () => {
  filter.value = filter.value === '.context-enabled' ? '.content' : '.context-enabled'
}

const handleSelect = (args) => {
  const target = args.element
  console.log(`Action: ${args.item.text}`)
}
</script>

<template>
  <div>
    <button @click="toggleFilter">Toggle Filter</button>
    <p class="filter-info">Current filter: <code>{{ filter }}</code></p>

    <div class="content">
      <div class="box context-enabled">
        <p>This box has context menu enabled</p>
        <p>Filter: {{ filter }}</p>
      </div>
      
      <div class="box">
        <p>This box doesn't have context menu</p>
      </div>
      
      <div class="box context-enabled">
        <p>This box has context menu enabled</p>
      </div>
    </div>

    <ejs-contextmenu
      :filter="filter"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.filter-info {
  font-size: 12px;
  color: #666;
  margin: 10px 0;
}

code {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

.content {
  display: flex;
  gap: 15px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.box {
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  flex: 1;
  min-width: 200px;
  cursor: context-menu;
}

.box.context-enabled {
  border-color: #2196f3;
  background-color: #f0f7ff;
}

button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
```

## Hover Delay

Configure delay before submenu appears on hover:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  {
    text: 'File',
    id: 'file',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' }
    ]
  },
  {
    text: 'Edit',
    id: 'edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]
  }
])

const hoverDelay = ref(300)

const delayPresets = [
  { label: 'Instant', value: 0 },
  { label: 'Fast (300ms)', value: 300 },
  { label: 'Normal (500ms)', value: 500 },
  { label: 'Slow (1000ms)', value: 1000 }
]

const showItemOnClick = ref(false)
</script>

<template>
  <div>
    <div class="controls">
      <label>Hover Delay:</label>
      <select v-model.number="hoverDelay">
        <option v-for="preset in delayPresets" :key="preset.value" :value="preset.value">
          {{ preset.label }}
        </option>
      </select>

      <label>
        <input type="checkbox" v-model="showItemOnClick">
        Show on Click
      </label>
    </div>

    <div id="target">Right click to open menu</div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      :hoverDelay="hoverDelay"
      :showItemOnClick="showItemOnClick"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.controls select,
.controls input {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#target {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
```

## Persistence

Store menu state across sessions:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const items = ref([
  { text: 'Item 1', id: 'item1' },
  { text: 'Item 2', id: 'item2' },
  { text: 'Item 3', id: 'item3' }
])

const enablePersistence = ref(true)
const lastSelectedItem = ref(null)

onMounted(() => {
  // Load persisted data
  const saved = localStorage.getItem('contextMenuLastItem')
  if (saved) {
    lastSelectedItem.value = saved
  }
})

const handleSelect = (args) => {
  const selectedId = args.item.id
  lastSelectedItem.value = selectedId

  // Persist to localStorage
  localStorage.setItem('contextMenuLastItem', selectedId)
  console.log(`Saved: ${selectedId}`)
}

const clearPersistence = () => {
  localStorage.removeItem('contextMenuLastItem')
  lastSelectedItem.value = null
}
</script>

<template>
  <div>
    <div class="status">
      <label>
        <input type="checkbox" v-model="enablePersistence">
        Enable Persistence
      </label>
      <p v-if="lastSelectedItem">Last selected: <strong>{{ lastSelectedItem }}</strong></p>
      <button @click="clearPersistence">Clear Saved Data</button>
    </div>

    <div id="target">Right click to open menu</div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      :enablePersistence="enablePersistence"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.status {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.status p {
  margin: 10px 0;
}

button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
}

#target {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
```

## Performance Optimization

### Virtual Scrolling for Large Lists

```vue
<script setup>
import { ref, computed } from 'vue'

// Generate very large dataset
const allItems = ref(Array.from({ length: 1000 }, (_, i) => ({
  text: `Item ${i + 1}`,
  id: `item-${i + 1}`
})))

const pageSize = ref(50)
const currentPage = ref(0)

const visibleItems = computed(() => {
  const start = currentPage.value * pageSize.value
  const end = start + pageSize.value
  return allItems.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(allItems.value.length / pageSize.value)
)

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}
</script>

<template>
  <div>
    <div class="controls">
      <p>Total items: {{ allItems.length }} | Page {{ currentPage + 1 }} of {{ totalPages }}</p>
      <button @click="prevPage">Previous</button>
      <button @click="nextPage">Next</button>
    </div>

    <div id="target">Right click to open menu</div>

    <ejs-contextmenu
      target="#target"
      :items="visibleItems"
      :enableScrolling="true"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.controls {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
}

#target {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
```

### Lazy Loading Items

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { text: 'Loading...', id: 'loading', disabled: true }
])

const isLoading = ref(false)

const loadItems = async () => {
  if (isLoading.value) return

  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Replace placeholder with actual items
  items.value = [
    { text: 'Item 1', id: 'item1' },
    { text: 'Item 2', id: 'item2' },
    { text: 'Item 3', id: 'item3' }
  ]

  isLoading.value = false
}

const handleCreated = () => {
  loadItems()
}
</script>

<template>
  <div>
    <div v-if="isLoading" class="loading-indicator">
      Loading menu items...
    </div>

    <div id="target">Right click to open menu</div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      @created="handleCreated"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.loading-indicator {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
  color: #1976d2;
}

#target {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
```

## Best Practices

1. **Enable scrolling for large menus:** Keep menu height manageable
2. **Use appropriate animation effects:** Balance UX with performance
3. **Optimize for touch devices:** Increase hover delay for touch users
4. **Lazy load items:** Load complex items only when needed
5. **Cache persistent data:** Use localStorage for frequently accessed items
6. **Limit submenu depth:** Keep nesting to 2-3 levels
7. **Test performance:** Monitor performance with large datasets
8. **Use computed properties:** Cache expensive calculations
