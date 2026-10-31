# Templates and Customization

## Table of Contents
- [Item Templates](#item-templates)
- [Before Item Render Event](#before-item-render-event)
- [Rich Content Items](#rich-content-items)
- [Custom Icons](#custom-icons)
- [Dynamic Content](#dynamic-content)
- [Advanced Customization](#advanced-customization)

## Item Templates

Use the `itemTemplate` property to customize the appearance of menu items:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  {
    text: 'Edit',
    id: 'edit',
    iconCss: 'e-icons e-edit'
  },
  {
    text: 'Cut',
    id: 'cut',
    iconCss: 'e-icons e-cut'
  },
  {
    text: 'Copy',
    id: 'copy',
    iconCss: 'e-icons e-copy'
  }
])
</script>

<template>
  <div>
    <div id="target">Right click to open menu</div>
    
    <ejs-contextmenu
      target="#target"
      :items="items"
    >
      <!-- Item template for custom rendering -->
      <template #itemTemplate="{ item }">
        <div class="custom-item">
          <i :class="item.iconCss"></i>
          <span>{{ item.text }}</span>
        </div>
      </template>
    </ejs-contextmenu>
  </div>
</template>

<style scoped>
.custom-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
}

.custom-item i {
  font-size: 16px;
}
</style>
```

## Before Item Render Event

The `@beforeItemRender` event fires for each item, allowing element-level customization:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'New Document', id: 'new', category: 'create' },
  { text: 'Open', id: 'open', category: 'open' },
  { text: 'Save', id: 'save', category: 'save' },
  { text: 'Delete', id: 'delete', category: 'danger' }
])

const handleBeforeItemRender = (args) => {
  const category = args.item.category

  // Add color based on category
  switch (category) {
    case 'create':
      args.element.style.color = '#4caf50'
      break
    case 'danger':
      args.element.style.color = '#f44336'
      break
    case 'open':
      args.element.style.backgroundColor = '#f5f5f5'
      break
  }

  // Add badge for premium items
  if (args.item.id === 'save') {
    const badge = document.createElement('span')
    badge.className = 'item-badge'
    badge.textContent = 'PRO'
    args.element.appendChild(badge)
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
:deep(.item-badge) {
  display: inline-block;
  background-color: #ff9800;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  margin-left: 8px;
}
</style>
```

## Rich Content Items

Create menu items with rich HTML content:

```vue
<script setup>
import { ref } from 'vue'

interface RichItem {
  text: string
  id: string
  subtitle?: string
  icon?: string
  badge?: string
}

const items = ref<RichItem[]>([
  {
    text: 'Create New',
    id: 'create',
    subtitle: 'Start from scratch',
    icon: '✨'
  },
  {
    text: 'Open Recent',
    id: 'open',
    subtitle: 'Last 5 documents',
    icon: '⏱️'
  },
  {
    text: 'Premium Feature',
    id: 'premium',
    subtitle: 'Upgrade to unlock',
    icon: '⭐',
    badge: 'NEW'
  }
])

const handleBeforeItemRender = (args) => {
  const item = args.item as RichItem

  if (item.subtitle || item.badge) {
    // Create rich content structure
    const container = document.createElement('div')
    container.className = 'rich-item-container'

    const titleDiv = document.createElement('div')
    titleDiv.className = 'item-title'
    titleDiv.textContent = item.text

    if (item.icon) {
      const iconSpan = document.createElement('span')
      iconSpan.className = 'item-icon'
      iconSpan.textContent = item.icon
      titleDiv.prepend(iconSpan)
    }

    container.appendChild(titleDiv)

    if (item.subtitle) {
      const subtitleDiv = document.createElement('div')
      subtitleDiv.className = 'item-subtitle'
      subtitleDiv.textContent = item.subtitle
      container.appendChild(subtitleDiv)
    }

    if (item.badge) {
      const badgeSpan = document.createElement('span')
      badgeSpan.className = 'item-badge'
      badgeSpan.textContent = item.badge
      container.appendChild(badgeSpan)
    }

    // Replace element content
    args.element.innerHTML = ''
    args.element.appendChild(container)
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
:deep(.rich-item-container) {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 0;
}

:deep(.item-title) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

:deep(.item-icon) {
  font-size: 16px;
}

:deep(.item-subtitle) {
  font-size: 12px;
  color: #999;
  margin-left: 24px;
}

:deep(.item-badge) {
  display: inline-block;
  background-color: #2196f3;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  margin-top: 4px;
  margin-left: 24px;
  width: fit-content;
}
</style>
```

## Custom Icons

Integrate different icon libraries:

### Material Icons

```vue
<script setup>
import { ref } from 'vue'
// Import Material Icons CSS in your main.js or style

const items = ref([
  { text: 'Edit', id: 'edit', iconCss: 'material-icons-edit' },
  { text: 'Delete', id: 'delete', iconCss: 'material-icons-delete' },
  { text: 'Share', id: 'share', iconCss: 'material-icons-share' }
])
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
</template>

<style scoped>
:deep(.e-contextmenu .e-menu-item.e-icon-left) {
  padding-left: 8px;
}
</style>
```

### Font Awesome Icons

```vue
<script setup>
import { ref } from 'vue'
// Import Font Awesome CSS

const items = ref([
  { text: 'Download', id: 'download', iconCss: 'fa fa-download' },
  { text: 'Upload', id: 'upload', iconCss: 'fa fa-upload' },
  { text: 'Settings', id: 'settings', iconCss: 'fa fa-cog' }
])
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
</template>
```

### Custom SVG Icons

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Create', id: 'create' },
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' }
])

const handleBeforeItemRender = (args) => {
  const iconSvg = document.createElement('svg')
  iconSvg.setAttribute('width', '16')
  iconSvg.setAttribute('height', '16')
  iconSvg.setAttribute('viewBox', '0 0 24 24')

  const circle = document.createElement('circle')
  circle.setAttribute('cx', '12')
  circle.setAttribute('cy', '12')
  circle.setAttribute('r', '10')
  circle.setAttribute('fill', 'currentColor')

  iconSvg.appendChild(circle)
  args.element.insertBefore(iconSvg, args.element.firstChild)
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
```

## Dynamic Content

Update menu content based on application state:

```vue
<script setup>
import { ref, computed } from 'vue'

interface Document {
  id: string
  name: string
  type: 'folder' | 'file'
  permissions: string[]
}

const selectedFile = ref<Document | null>(null)

const documents = ref<Document[]>([
  { id: '1', name: 'folder.pdf', type: 'file', permissions: ['view', 'edit', 'share'] },
  { id: '2', name: 'images', type: 'folder', permissions: ['view'] }
])

const items = computed(() => {
  if (!selectedFile.value) return []

  const baseItems = [
    { text: 'Open', id: 'open', iconCss: 'e-icons e-folder-open' }
  ]

  if (selectedFile.value.permissions.includes('edit')) {
    baseItems.push(
      { text: 'Edit', id: 'edit', iconCss: 'e-icons e-edit' },
      { text: 'Rename', id: 'rename', iconCss: 'e-icons e-edit' }
    )
  }

  if (selectedFile.value.permissions.includes('share')) {
    baseItems.push(
      { separator: true },
      { text: 'Share', id: 'share', iconCss: 'e-icons e-share-point' }
    )
  }

  if (selectedFile.value.type === 'file') {
    baseItems.push({ text: 'Download', id: 'download', iconCss: 'e-icons e-download' })
  }

  return baseItems
})

const selectDocument = (doc) => {
  selectedFile.value = doc
}

const handleSelect = (args) => {
  console.log(`Action: ${args.item.id} on ${selectedFile.value?.name}`)
}
</script>

<template>
  <div class="dynamic-demo">
    <div class="file-list">
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="file-item"
        :class="{ selected: selectedFile?.id === doc.id }"
        @click="selectDocument(doc)"
        id="target"
      >
        {{ doc.name }}
      </div>
    </div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.dynamic-demo {
  display: flex;
  gap: 20px;
}

.file-list {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.file-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.file-item:hover {
  background-color: #f5f5f5;
}

.file-item.selected {
  background-color: #e3f2fd;
  border-left: 3px solid #2196f3;
}
</style>
```

## Advanced Customization

### Conditional Styling

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Save', id: 'save', level: 'normal' },
  { text: 'Delete', id: 'delete', level: 'danger' },
  { text: 'Premium Action', id: 'premium', level: 'premium' }
])

const handleBeforeItemRender = (args) => {
  const item = args.item

  if (item.level === 'danger') {
    args.element.style.color = '#f44336'
    args.element.style.fontWeight = 'bold'
  } else if (item.level === 'premium') {
    args.element.style.background = 'linear-gradient(90deg, #ffd700, #ffed4e)'
    args.element.style.borderRadius = '4px'
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
```

### Grouped Items with Headers

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Basic Actions', id: 'header1', separator: true },
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' },
  { text: 'Paste', id: 'paste' },
  { text: 'Advanced Actions', id: 'header2', separator: true },
  { text: 'Merge', id: 'merge' },
  { text: 'Split', id: 'split' }
])

const handleBeforeItemRender = (args) => {
  if (args.item.id.startsWith('header')) {
    args.element.style.fontWeight = 'bold'
    args.element.style.fontSize = '12px'
    args.element.style.textTransform = 'uppercase'
    args.element.style.color = '#666'
    args.element.style.cursor = 'default'
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
```

### Animated Items

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Smooth Transition', id: 'item1' },
  { text: 'Fade In', id: 'item2' },
  { text: 'Slide Up', id: 'item3' }
])

const handleBeforeItemRender = (args) => {
  args.element.style.animation = 'itemAppear 0.3s ease-out'
  args.element.style.animationDelay = `${Math.random() * 0.1}s`
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
@keyframes itemAppear {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

:deep(.e-contextmenu .e-menu-item) {
  overflow: visible !important;
}
</style>
```

### Complex Nested Rendering

```vue
<script setup>
import { ref } from 'vue'

interface ComplexItem {
  text: string
  id: string
  metadata?: {
    description: string
    shortcut: string
    tags: string[]
  }
}

const items = ref<ComplexItem[]>([
  {
    text: 'Save Document',
    id: 'save',
    metadata: {
      description: 'Save current document',
      shortcut: 'Ctrl+S',
      tags: ['file', 'save']
    }
  },
  {
    text: 'Format Text',
    id: 'format',
    metadata: {
      description: 'Apply text formatting',
      shortcut: 'Ctrl+Shift+F',
      tags: ['text', 'format']
    }
  }
])

const handleBeforeItemRender = (args) => {
  const item = args.item as ComplexItem

  if (item.metadata) {
    const html = `
      <div class="complex-item">
        <div class="item-main">
          <span class="item-title">${item.text}</span>
          <span class="item-shortcut">${item.metadata.shortcut}</span>
        </div>
        <div class="item-desc">${item.metadata.description}</div>
        <div class="item-tags">
          ${item.metadata.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `
    args.element.innerHTML = html
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
:deep(.complex-item) {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

:deep(.item-main) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.item-title) {
  font-weight: 500;
}

:deep(.item-shortcut) {
  font-size: 11px;
  color: #999;
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 2px;
}

:deep(.item-desc) {
  font-size: 12px;
  color: #666;
}

:deep(.item-tags) {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

:deep(.tag) {
  display: inline-block;
  background-color: #e0e0e0;
  color: #333;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
}
</style>
```

## Best Practices

1. **Keep templates simple:** Avoid heavy computations in beforeItemRender
2. **Use CSS classes:** Apply styling through `:deep()` selector
3. **Cache DOM elements:** Don't recreate elements on every render
4. **Handle long text:** Truncate with ellipsis for long item text
5. **Maintain accessibility:** Keep semantic HTML structure
6. **Test with icons:** Ensure icon libraries load before menu renders
