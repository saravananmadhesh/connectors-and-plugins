# Menu Items and Data Binding

## Table of Contents
- [MenuItemModel Interface](#menuitemintern-interface)
- [Creating Static Menu Items](#creating-static-menu-items)
- [Data Binding with Local Sources](#data-binding-with-local-sources)
- [Dynamic Menu Item Generation](#dynamic-menu-item-generation)
- [Nested Submenus](#nested-submenus)
- [Item Separators](#item-separators)

## MenuItemModel Interface

The `MenuItemModel` interface defines the structure for context menu items:

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Display text for the menu item |
| `id` | string | Unique identifier for the item |
| `iconCss` | string | CSS class for the icon |
| `items` | MenuItemModel[] | Nested submenu items |
| `separator` | boolean | Whether to render as separator |
| `disabled` | boolean | Disable the menu item |
| `url` | string | Navigation URL |
| `htmlAttributes` | Record<string, string> | Custom HTML attributes |

## Creating Static Menu Items

Define menu items as a simple array:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' },
  { text: 'Paste', id: 'paste' },
  { text: 'Delete', id: 'delete' }
])
</script>

<template>
  <div>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
  </div>
</template>
```

## Data Binding with Local Sources

### Simple Array Binding

Bind menu items from a local data array:

```vue
<script setup>
import { ref } from 'vue'

interface MenuItem {
  text: string
  id: string
  icon?: string
}

const menuData = ref<MenuItem[]>([
  { text: 'Cut', id: 'cut', icon: 'e-icons e-cut' },
  { text: 'Copy', id: 'copy', icon: 'e-icons e-copy' },
  { text: 'Paste', id: 'paste', icon: 'e-icons e-paste' }
])

const items = ref(menuData.value.map(item => ({
  text: item.text,
  id: item.id,
  iconCss: item.icon
})))
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
</template>
```

### Dynamic Array Binding with Computed

Use `computed()` to dynamically generate menu items:

```vue
<script setup>
import { ref, computed } from 'vue'

const userRole = ref('viewer')

const items = computed(() => {
  const baseItems = [
    { text: 'View', id: 'view' },
    { text: 'Download', id: 'download' }
  ]

  if (userRole.value === 'editor') {
    baseItems.push({ text: 'Edit', id: 'edit' })
  }

  if (userRole.value === 'admin') {
    baseItems.push(
      { separator: true },
      { text: 'Delete', id: 'delete' }
    )
  }

  return baseItems
})
</script>

<template>
  <div>
    <select v-model="userRole">
      <option value="viewer">Viewer</option>
      <option value="editor">Editor</option>
      <option value="admin">Admin</option>
    </select>
    
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
  </div>
</template>
```

## Hierarchical Data Binding

Bind hierarchical data with parent-child relationships:

```vue
<script setup>
import { ref } from 'vue'

interface IRecord {
  id: number
  text: string
  parentId?: number
}

const data = ref<IRecord[]>([
  { id: 1, text: 'File' },
  { id: 2, text: 'New', parentId: 1 },
  { id: 3, text: 'Open', parentId: 1 },
  { id: 4, text: 'Save', parentId: 1 },
  { id: 5, text: 'Edit' },
  { id: 6, text: 'Cut', parentId: 5 },
  { id: 7, text: 'Copy', parentId: 5 },
  { id: 8, text: 'Paste', parentId: 5 }
])

function getMenuItems() {
  const menuItems = []
  
  for (const record of data.value) {
    if (!record.parentId) {
      // Root level item
      const item = {
        text: record.text,
        id: `item-${record.id}`,
        items: []
      }
      
      // Find children
      const children = data.value.filter(r => r.parentId === record.id)
      if (children.length > 0) {
        item.items = children.map(child => ({
          text: child.text,
          id: `item-${child.id}`
        }))
      }
      
      menuItems.push(item)
    }
  }
  
  return menuItems
}

const items = ref(getMenuItems())
</script>

<template>
  <div>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
  </div>
</template>
```

## Dynamic Menu Item Generation

Generate menu items based on conditions or data:

```vue
<script setup>
import { ref, computed } from 'vue'

interface FileItem {
  name: string
  type: 'file' | 'folder'
}

const selectedFile = ref<FileItem | null>(null)

const items = computed(() => {
  const commonItems = [
    { text: 'Open', iconCss: 'e-icons e-folder-open' },
    { text: 'Cut', iconCss: 'e-icons e-cut' },
    { text: 'Copy', iconCss: 'e-icons e-copy' }
  ]

  if (selectedFile.value?.type === 'folder') {
    return [
      ...commonItems,
      { text: 'New Folder', iconCss: 'e-icons e-folder' },
      { text: 'Paste', iconCss: 'e-icons e-paste' }
    ]
  }

  if (selectedFile.value?.type === 'file') {
    return [
      ...commonItems,
      { text: 'Rename', iconCss: 'e-icons e-edit' },
      { text: 'Delete', iconCss: 'e-icons e-delete' }
    ]
  }

  return commonItems
})

const selectFile = (file) => {
  selectedFile.value = file
}
</script>

<template>
  <div>
    <div id="target" @click="selectFile({ name: 'file.txt', type: 'file' })">
      Right click on a file
    </div>
    <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
  </div>
</template>
```

## Nested Submenus

Create multi-level hierarchical menus:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' },
      { separator: true },
      { text: 'Exit' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' },
      { separator: true },
      { text: 'Find' }
    ]
  },
  {
    text: 'View',
    items: [
      {
        text: 'Zoom',
        items: [
          { text: '100%' },
          { text: '150%' },
          { text: '200%' }
        ]
      },
      { text: 'Full Screen' }
    ]
  }
])
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
</template>
```

## Item Separators

Add visual separators between menu items:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' },
  { separator: true },  // Visual separator
  { text: 'Select All' },
  { separator: true },
  { text: 'Delete' }
])
</script>

<template>
  <div id="target">Right click to open menu</div>
  <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
</template>
```

## Remote Data Binding

Load menu items from a remote API:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const loading = ref(false)

const loadMenuItems = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/menu-items')
    const data = await response.json()
    items.value = data
  } catch (error) {
    console.error('Failed to load menu items:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMenuItems()
})
</script>

<template>
  <div>
    <div v-if="loading">Loading menu...</div>
    <div v-else id="target">Right click to open menu</div>
    <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
  </div>
</template>
```

## Best Practices

1. **Use unique IDs:** Always assign unique `id` values to menu items
2. **Limit nesting:** Keep submenu nesting to 2-3 levels maximum
3. **Group items:** Use separators to logically group related items
4. **Clear labels:** Use descriptive text that clearly indicates action
5. **Conditional rendering:** Use `computed()` for dynamic menus
6. **Optimize data:** Transform data at component level, not in template
7. **Handle large datasets:** Consider pagination or lazy loading for many items

## Example: File Manager Context Menu

```vue
<script setup>
import { ref, computed } from 'vue'

interface FileSystemItem {
  id: string
  name: string
  type: 'file' | 'folder'
  canDelete: boolean
}

const selectedItem = ref<FileSystemItem | null>(null)
const files = ref<FileSystemItem[]>([
  { id: '1', name: 'document.pdf', type: 'file', canDelete: true },
  { id: '2', name: 'images', type: 'folder', canDelete: true }
])

const items = computed(() => {
  const baseItems = [
    { text: 'Open', iconCss: 'e-icons e-folder-open', id: 'open' },
    { separator: true }
  ]

  if (selectedItem.value?.type === 'folder') {
    baseItems.push({ text: 'New Folder', iconCss: 'e-icons e-folder', id: 'new-folder' })
  }

  baseItems.push(
    { text: 'Cut', iconCss: 'e-icons e-cut', id: 'cut' },
    { text: 'Copy', iconCss: 'e-icons e-copy', id: 'copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste', id: 'paste' },
    { separator: true }
  )

  if (selectedItem.value?.canDelete) {
    baseItems.push(
      { text: 'Rename', iconCss: 'e-icons e-edit', id: 'rename' },
      { text: 'Delete', iconCss: 'e-icons e-delete', id: 'delete' }
    )
  }

  return baseItems
})

const selectItem = (item) => {
  selectedItem.value = item
}

const handleSelect = (args) => {
  const action = args.item?.id
  console.log(`Performing action: ${action} on ${selectedItem.value?.name}`)
}
</script>

<template>
  <div class="file-manager">
    <div class="file-list">
      <div
        v-for="file in files"
        :key="file.id"
        class="file-item"
        @click="selectItem(file)"
        :class="{ selected: selectedItem?.id === file.id }"
        id="target"
      >
        <span class="icon">
          {{ file.type === 'folder' ? '📁' : '📄' }}
        </span>
        <span>{{ file.name }}</span>
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
.file-manager {
  padding: 20px;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
}

.file-item:hover {
  background-color: #f5f5f5;
}

.file-item.selected {
  background-color: #e3f2fd;
  border-color: #2196f3;
}

.icon {
  font-size: 18px;
}
</style>
```
