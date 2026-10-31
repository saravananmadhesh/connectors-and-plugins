# Data Binding

## Table of Contents
1. [Binding Overview](#binding-overview)
2. [Local Data Binding](#local-data-binding)
3. [Hierarchical Data](#hierarchical-data)
4. [Field Mapping](#field-mapping)
5. [Self-Referential Data](#self-referential-data)
6. [Dynamic Data Binding](#dynamic-data-binding)
7. [Remote Data Binding](#remote-data-binding)
8. [Computed Binding](#computed-binding)

## Binding Overview

Vue 3 uses reactive `ref()` to bind data to menu items. The `:items` property accepts any array structure when combined with the `fields` property for custom field mapping.

### Basic Binding Pattern

```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

// Simple array of items
const items = ref([
  { text: 'File' },
  { text: 'Edit' },
  { text: 'View' }
]);
</script>

<template>
  <!-- Bind with :items property -->
  <ejs-menu :items="items"></ejs-menu>
</template>
```

## Local Data Binding

### Standard MenuItemModel Array

Use the standard `MenuItemModel` structure for straightforward binding.

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'File',
    id: 'file',
    items: [
      { text: 'New', id: 'new', iconCss: 'e-icons e-new' },
      { text: 'Open', id: 'open', iconCss: 'e-icons e-open' },
      { text: 'Save', id: 'save', iconCss: 'e-icons e-save' }
    ]
  },
  {
    text: 'Edit',
    id: 'edit',
    items: [
      { text: 'Cut', id: 'cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', id: 'copy', iconCss: 'e-icons e-copy' },
      { text: 'Paste', id: 'paste', iconCss: 'e-icons e-paste' }
    ]
  },
  {
    text: 'View',
    id: 'view'
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### Array with Custom Properties

Add custom properties beyond MenuItemModel for application-specific needs.

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'File',
    iconCss: 'e-icons e-folder',
    badge: 'new',
    permission: 'read',
    items: [
      { text: 'Recent', customData: { type: 'recent' } },
      { text: 'New Project', customData: { type: 'new', disabled: false } }
    ]
  },
  {
    text: 'View',
    permission: 'read',
    items: [
      { text: 'Zoom In', level: 1 },
      { text: 'Zoom Out', level: 2 }
    ]
  }
]);

const getMenuClass = (item) => {
  return {
    'badge-item': item.badge,
    'restricted': item.permission !== 'read'
  };
};
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

## Hierarchical Data

Organize menu items in a hierarchical (parent-child) tree structure.

### Multi-Level Hierarchy

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      {
        text: 'Recent',
        items: [
          { text: 'File1.txt' },
          { text: 'File2.txt' },
          { text: 'File3.txt' }
        ]
      },
      { separator: true },
      { text: 'Save' },
      { text: 'Save As' },
      { text: 'Exit' }
    ]
  },
  {
    text: 'Edit',
    items: [
      {
        text: 'Find',
        items: [
          { text: 'Find Next' },
          { text: 'Find Previous' }
        ]
      },
      { text: 'Replace' },
      { separator: true },
      { text: 'Select All' }
    ]
  },
  {
    text: 'Format',
    items: [
      {
        text: 'Text',
        items: [
          { text: 'Bold' },
          { text: 'Italic' },
          { text: 'Underline' }
        ]
      },
      {
        text: 'Paragraph',
        items: [
          { text: 'Left Align' },
          { text: 'Center' },
          { text: 'Right Align' }
        ]
      }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

## Field Mapping

Use the `fields` property to bind data from sources with custom field names.

### Custom Field Names

```vue
<script setup>
import { ref } from 'vue';

// Data from external source with different field names
const data = ref([
  {
    NodeId: 1,
    NodeText: 'File',
    Icon: 'e-icons e-folder',
    Children: [
      { NodeId: 2, NodeText: 'New', Icon: 'e-icons e-new' },
      { NodeId: 3, NodeText: 'Open', Icon: 'e-icons e-open' }
    ]
  },
  {
    NodeId: 4,
    NodeText: 'Edit',
    Children: [
      { NodeId: 5, NodeText: 'Cut', Icon: 'e-icons e-cut' }
    ]
  }
]);

// Map custom field names to MenuItemModel properties
const fields = {
  itemId: 'NodeId',      // id field
  text: 'NodeText',      // text field
  iconCss: 'Icon',       // icon field
  children: 'Children'   // children field
};
</script>

<template>
  <ejs-menu
    :items="data"
    :fields="fields"
  ></ejs-menu>
</template>
```

### Complex Field Mapping

```vue
<script setup>
import { ref } from 'vue';

// Database model structure
const items = ref([
  {
    menu_id: 'file',
    menu_label: 'File',
    menu_icon: 'file-icon',
    menu_url: '/file',
    is_disabled: false,
    submenu: [
      { menu_id: 'new', menu_label: 'New', menu_url: '/file/new' },
      { menu_id: 'open', menu_label: 'Open', menu_url: '/file/open' }
    ]
  }
]);

const fields = {
  itemId: 'menu_id',
  text: 'menu_label',
  iconCss: 'menu_icon',
  url: 'menu_url',
  children: 'submenu',
  disabled: 'is_disabled'
};
</script>

<template>
  <ejs-menu
    :items="items"
    :fields="fields"
  ></ejs-menu>
</template>
```

## Self-Referential Data

Bind data where parent-child relationships are defined through ID references rather than nested arrays.

### Self-Referential Structure

```vue
<script setup>
import { ref, computed } from 'vue';

// Flat data with parent IDs
const flatData = ref([
  { id: 1, text: 'File', parentId: null },
  { id: 2, text: 'New', parentId: 1 },
  { id: 3, text: 'Open', parentId: 1 },
  { id: 4, text: 'Save', parentId: 1 },
  { id: 5, text: 'Edit', parentId: null },
  { id: 6, text: 'Cut', parentId: 5 },
  { id: 7, text: 'Copy', parentId: 5 },
  { id: 8, text: 'Paste', parentId: 5 }
]);

// Convert flat data to hierarchical structure
const hierarchicalItems = computed(() => {
  const buildTree = (parentId) => {
    return flatData.value
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        items: buildTree(item.id)
      }))
      .filter(item => item.items.length > 0 || item.parentId === null);
  };
  
  return buildTree(null);
});
</script>

<template>
  <ejs-menu :items="hierarchicalItems"></ejs-menu>
</template>
```

### Self-Referential with Custom Field Names

```vue
<script setup>
import { ref, computed } from 'vue';

const data = ref([
  { id: 1, name: 'Dashboard', parent: 0 },
  { id: 2, name: 'Users', parent: 0 },
  { id: 3, name: 'View Users', parent: 2 },
  { id: 4, name: 'Add User', parent: 2 },
  { id: 5, name: 'Reports', parent: 0 },
  { id: 6, name: 'Sales Report', parent: 5 }
]);

const fields = {
  itemId: 'id',
  text: 'name',
  children: 'items'
};

const buildHierarchy = (items, parentId = 0) => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => ({
      ...item,
      items: buildHierarchy(items, item.id)
    }));
};

const hierarchicalData = computed(() => {
  return buildHierarchy(data.value);
});
</script>

<template>
  <ejs-menu
    :items="hierarchicalData"
    :fields="fields"
  ></ejs-menu>
</template>
```

## Dynamic Data Binding

Update menu items reactively based on user actions or application state.

### Adding Items Dynamically

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'File', id: 'file', items: [] },
  { text: 'Edit', id: 'edit', items: [] }
]);

const addMenuItem = (parentId, newItem) => {
  // Find parent item
  const parent = findItemById(items.value, parentId);
  if (parent) {
    if (!parent.items) {
      parent.items = [];
    }
    parent.items.push(newItem);
  }
};

const findItemById = (items, id) => {
  for (let item of items) {
    if (item.id === id) return item;
    if (item.items) {
      const found = findItemById(item.items, id);
      if (found) return found;
    }
  }
  return null;
};

const handleAddNewFile = () => {
  addMenuItem('file', {
    text: 'New Recent File',
    id: 'recent_' + Date.now()
  });
};
</script>

<template>
  <div>
    <button @click="handleAddNewFile">Add Recent File</button>
    <ejs-menu :items="items"></ejs-menu>
  </div>
</template>
```

### Updating Items Reactively

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Export', id: 'export', disabled: false },
  { text: 'Import', id: 'import', disabled: false }
]);

const isProcessing = ref(false);

const handleExport = (args) => {
  if (args.item.id === 'export') {
    isProcessing.value = true;
    
    // Disable menu while processing
    items.value.forEach(item => {
      item.disabled = true;
    });
    
    setTimeout(() => {
      isProcessing.value = false;
      items.value.forEach(item => {
        item.disabled = false;
      });
    }, 2000);
  }
};
</script>

<template>
  <div>
    <p v-if="isProcessing">Processing...</p>
    <ejs-menu
      :items="items"
      @select="handleExport"
    ></ejs-menu>
  </div>
</template>
```

### Filtering Items Dynamically

```vue
<script setup>
import { ref, computed } from 'vue';

const allItems = ref([
  { text: 'Admin Panel', id: 'admin', role: 'admin' },
  { text: 'User Profile', id: 'profile', role: 'user' },
  { text: 'Settings', id: 'settings', role: 'user' },
  { text: 'System Logs', id: 'logs', role: 'admin' }
]);

const userRole = ref('user');

// Filter items based on user role
const filteredItems = computed(() => {
  return allItems.value.filter(item => {
    return !item.role || item.role === userRole.value;
  });
});

const switchRole = (role) => {
  userRole.value = role;
};
</script>

<template>
  <div>
    <div class="role-selector">
      <button @click="switchRole('user')">User View</button>
      <button @click="switchRole('admin')">Admin View</button>
      <p>Current Role: {{ userRole }}</p>
    </div>
    
    <ejs-menu :items="filteredItems"></ejs-menu>
  </div>
</template>

<style scoped>
.role-selector {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

## Remote Data Binding

Load menu items from a remote API or database.

### Fetching from API

```vue
<script setup>
import { ref, onMounted } from 'vue';

const items = ref([]);
const isLoading = ref(true);
const error = ref(null);

const fetchMenuItems = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('/api/menu-items');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    items.value = data;
  } catch (err) {
    error.value = err.message;
    console.error('Failed to fetch menu items:', err);
  } finally {
    isLoading.value = false;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchMenuItems();
});
</script>

<template>
  <div>
    <p v-if="isLoading" class="loading">Loading menu...</p>
    <p v-if="error" class="error">Error: {{ error }}</p>
    
    <ejs-menu v-if="!isLoading && items.length" :items="items"></ejs-menu>
  </div>
</template>

<style scoped>
.loading {
  color: orange;
}

.error {
  color: red;
}
</style>
```

### Lazy Loading Sub-Menus

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Projects', id: 'projects', items: [] },
  { text: 'Files', id: 'files', items: [] }
]);

const loadedItems = new Set();

const handleBeforeOpen = async (args) => {
  const itemId = args.item.id;
  
  // Only load once per item
  if (loadedItems.has(itemId)) return;
  
  try {
    const response = await fetch(`/api/menu/${itemId}`);
    const subItems = await response.json();
    args.item.items = subItems;
    loadedItems.add(itemId);
  } catch (error) {
    console.error(`Failed to load submenu for ${itemId}:`, error);
  }
};
</script>

<template>
  <ejs-menu
    :items="items"
    @beforeOpen="handleBeforeOpen"
  ></ejs-menu>
</template>
```

## Computed Binding

Use Vue's `computed()` for derived menu structures.

### Computed Transformations

```vue
<script setup>
import { ref, computed } from 'vue';

const rawData = ref([
  { category: 'File', actions: ['New', 'Open', 'Save'] },
  { category: 'Edit', actions: ['Cut', 'Copy', 'Paste'] }
]);

// Transform flat data to menu structure
const menuItems = computed(() => {
  return rawData.value.map(category => ({
    text: category.category,
    id: category.category.toLowerCase(),
    items: category.actions.map(action => ({
      text: action,
      id: action.toLowerCase()
    }))
  }));
});
</script>

<template>
  <ejs-menu :items="menuItems"></ejs-menu>
</template>
```

### Conditional Computed Data

```vue
<script setup>
import { ref, computed } from 'vue';

const user = ref({ role: 'user', isPremium: false });

const items = ref([
  { text: 'Basic', role: 'all' },
  { text: 'Premium', role: 'premium', items: [{ text: 'P1' }, { text: 'P2' }] },
  { text: 'Admin', role: 'admin' }
]);

// Filter based on user state
const availableItems = computed(() => {
  const roles = [user.value.role];
  if (user.value.isPremium) roles.push('premium');
  
  return items.value.filter(item => {
    return !item.role || roles.includes(item.role) || item.role === 'all';
  });
});

const upgradeToPremium = () => {
  user.value.isPremium = true;
};
</script>

<template>
  <div>
    <button @click="upgradeToPremium">Upgrade to Premium</button>
    <ejs-menu :items="availableItems"></ejs-menu>
  </div>
</template>
```

## Complete Data Binding Example

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';

// Different data sources
const staticItems = ref([
  { text: 'File', items: [{ text: 'New' }, { text: 'Open' }] }
]);

const remoteItems = ref([]);
const userRole = ref('user');

// Computed filtered items
const filteredItems = computed(() => {
  return staticItems.value.filter(item => {
    return !item.minRole || userRole.value === 'admin';
  });
});

// Load remote data
onMounted(async () => {
  try {
    const response = await fetch('/api/menu');
    remoteItems.value = await response.json();
  } catch (error) {
    console.error('Failed to load remote data:', error);
  }
});

// Add new items
const addNewItem = (text) => {
  staticItems.value.push({ text, items: [] });
};
</script>

<template>
  <div class="data-binding-demo">
    <button @click="addNewItem('Custom')">Add Item</button>
    <select v-model="userRole">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
    
    <ejs-menu :items="filteredItems"></ejs-menu>
  </div>
</template>
```

## Related Topics

- [Properties and Configuration](./properties-and-configuration.md) - Field mapping details
- [Methods and API](./methods-api.md) - Dynamic item manipulation
- [Menu Items Customization](./menu-items-customization.md) - Advanced item features
