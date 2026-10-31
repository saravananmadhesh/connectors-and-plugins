# Use Case Scenarios

## Table of Contents
1. [Application Navigation](#application-navigation)
2. [Context Menus](#context-menus)
3. [File Management Menu](#file-management-menu)
4. [User Dashboard](#user-dashboard)
5. [Admin Control Panel](#admin-control-panel)
6. [E-Commerce Navigation](#e-commerce-navigation)

## Application Navigation

### Desktop Application Main Menu

```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const items = ref([
  {
    text: 'File',
    id: 'file',
    iconCss: 'e-icons e-folder-open',
    items: [
      { text: 'New', id: 'new', iconCss: 'e-icons e-new' },
      { text: 'Open', id: 'open', iconCss: 'e-icons e-open' },
      { text: 'Save', id: 'save', iconCss: 'e-icons e-save' },
      { text: 'Save As', id: 'saveas', iconCss: 'e-icons e-save-as' },
      { separator: true },
      { text: 'Print', id: 'print', iconCss: 'e-icons e-print' },
      { separator: true },
      { text: 'Exit', id: 'exit', iconCss: 'e-icons e-exit' }
    ]
  },
  {
    text: 'Edit',
    id: 'edit',
    iconCss: 'e-icons e-edit',
    items: [
      { text: 'Undo', id: 'undo', iconCss: 'e-icons e-undo' },
      { text: 'Redo', id: 'redo', iconCss: 'e-icons e-redo' },
      { separator: true },
      { text: 'Cut', id: 'cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', id: 'copy', iconCss: 'e-icons e-copy' },
      { text: 'Paste', id: 'paste', iconCss: 'e-icons e-paste' },
      { separator: true },
      { text: 'Select All', id: 'selectall' }
    ]
  },
  {
    text: 'View',
    id: 'view',
    iconCss: 'e-icons e-view',
    items: [
      { text: 'Zoom In', id: 'zoomin', iconCss: 'e-icons e-plus' },
      { text: 'Zoom Out', id: 'zoomout', iconCss: 'e-icons e-minus' },
      { text: 'Reset', id: 'reset' },
      { separator: true },
      { text: 'Full Screen', id: 'fullscreen' }
    ]
  },
  {
    text: 'Help',
    id: 'help',
    iconCss: 'e-icons e-help',
    items: [
      { text: 'Documentation', id: 'docs' },
      { text: 'Support', id: 'support' },
      { separator: true },
      { text: 'About', id: 'about' }
    ]
  }
]);

const handleSelect = (args) => {
  console.log('Selected:', args.item.id);
  
  // Execute actions based on menu selection
  const actions = {
    'new': () => console.log('Creating new document'),
    'open': () => console.log('Opening file dialog'),
    'save': () => console.log('Saving document'),
    'exit': () => console.log('Exiting application'),
    'undo': () => console.log('Undo action'),
    'cut': () => console.log('Cut action'),
    'zoomin': () => console.log('Zoom in'),
    'fullscreen': () => document.documentElement.requestFullscreen()
  };
  
  const action = actions[args.item.id];
  if (action) action();
};
</script>

<template>
  <div class="desktop-menu">
    <header class="app-header">
      <h1>Document Editor</h1>
    </header>
    
    <ejs-menu
      :items="items"
      @select="handleSelect"
      orientation="Horizontal"
    ></ejs-menu>
    
    <div class="editor-content">
      <p>Your document content here...</p>
    </div>
  </div>
</template>

<style scoped>
.desktop-menu {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-header {
  background-color: #f5f5f5;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.editor-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
```

## Context Menus

### Right-Click Context Menu

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const contextItems = ref([
  { text: 'Cut', iconCss: 'e-icons e-cut' },
  { text: 'Copy', iconCss: 'e-icons e-copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste' },
  { separator: true },
  { text: 'Delete', iconCss: 'e-icons e-delete' },
  { separator: true },
  { text: 'Properties', iconCss: 'e-icons e-properties' }
]);

let contextX = 0;
let contextY = 0;

const handleContextMenu = (e) => {
  e.preventDefault();
  
  contextX = e.clientX;
  contextY = e.clientY;
  
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.open();
};

const handleDocumentClick = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.close();
};
</script>

<template>
  <div
    @contextmenu="handleContextMenu"
    @click="handleDocumentClick"
    class="context-menu-area"
  >
    <p>Right-click here to see context menu</p>
    
    <ejs-menu
      ref="menuRef"
      :items="contextItems"
      :style="{ left: contextX + 'px', top: contextY + 'px' }"
      class="context-menu"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.context-menu-area {
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #f9f9f9;
  position: relative;
}

:deep(.context-menu) {
  position: fixed;
  z-index: 10000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
```

## File Management Menu

### File Explorer Navigation

```vue
<script setup>
import { ref } from 'vue';

const currentPath = ref('/Documents');
const files = ref([
  { name: 'Project1', type: 'folder' },
  { name: 'Report.pdf', type: 'file' },
  { name: 'Data.xlsx', type: 'file' }
]);

const items = ref([
  {
    text: 'File',
    items: [
      { text: 'New Folder' },
      { text: 'New File' },
      { separator: true },
      { text: 'Upload' },
      { text: 'Download' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Rename' },
      { text: 'Copy' },
      { text: 'Move' },
      { text: 'Delete' }
    ]
  },
  {
    text: 'View',
    items: [
      { text: 'List View' },
      { text: 'Grid View' },
      { text: 'Thumbnail View' },
      { separator: true },
      { text: 'Refresh' }
    ]
  }
]);

const handleMenuSelect = (args) => {
  const action = args.item.text;
  
  switch(action) {
    case 'New Folder':
      console.log('Creating new folder');
      break;
    case 'Upload':
      console.log('Opening file upload');
      break;
    case 'Delete':
      console.log('Deleting selected items');
      break;
    // ... more actions
  }
};
</script>

<template>
  <div class="file-manager">
    <div class="breadcrumb">
      <span>Home</span> > <span>{{ currentPath }}</span>
    </div>
    
    <ejs-menu
      :items="items"
      @select="handleMenuSelect"
      orientation="Horizontal"
    ></ejs-menu>
    
    <div class="file-list">
      <div v-for="file in files" :key="file.name" class="file-item">
        <span class="file-icon">📄</span>
        <span class="file-name">{{ file.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-manager {
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 20px;
  color: #666;
}

.file-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
}

.file-item:hover {
  background-color: #f0f0f0;
}

.file-icon {
  margin-right: 10px;
  font-size: 20px;
}
</style>
```

## User Dashboard

### Dashboard User Menu

```vue
<script setup>
import { ref } from 'vue';

const currentUser = ref({ name: 'John Doe', role: 'Admin' });

const items = ref([
  {
    text: 'Dashboard',
    items: [
      { text: 'Overview' },
      { text: 'Analytics' },
      { text: 'Reports' }
    ]
  },
  {
    text: 'Account',
    items: [
      { text: 'Profile' },
      { text: 'Settings' },
      { text: 'Preferences' }
    ]
  },
  {
    text: 'User',
    items: [
      { text: `${currentUser.value.name}` },
      { separator: true },
      { text: 'Change Password' },
      { text: 'Two-Factor Auth' },
      { separator: true },
      { text: 'Logout' }
    ]
  }
]);

const handleMenuSelect = (args) => {
  if (args.item.text === 'Logout') {
    console.log('Logging out...');
    // Perform logout action
  }
};
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>User Dashboard</h1>
      <ejs-menu
        :items="items"
        @select="handleMenuSelect"
        orientation="Horizontal"
      ></ejs-menu>
    </header>
    
    <main class="dashboard-content">
      <p>Welcome, {{ currentUser.name }}!</p>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.dashboard-header {
  background-color: #007bff;
  color: white;
  padding: 20px;
}

.dashboard-content {
  flex: 1;
  padding: 20px;
}
</style>
```

## Admin Control Panel

### Admin Navigation with Permissions

```vue
<script setup>
import { ref, computed } from 'vue';

const userRole = ref('admin');

const allItems = [
  {
    text: 'Dashboard',
    role: 'all',
    items: [{ text: 'Overview' }, { text: 'Analytics' }]
  },
  {
    text: 'Users',
    role: 'admin',
    items: [
      { text: 'List Users' },
      { text: 'Add User' },
      { text: 'Manage Roles' }
    ]
  },
  {
    text: 'Content',
    role: 'editor',
    items: [
      { text: 'Pages' },
      { text: 'Posts' },
      { text: 'Media' }
    ]
  },
  {
    text: 'Settings',
    role: 'admin',
    items: [
      { text: 'System Settings' },
      { text: 'Security' },
      { text: 'Backup' }
    ]
  },
  {
    text: 'Reports',
    role: 'all',
    items: [
      { text: 'Traffic' },
      { text: 'Users' },
      { text: 'Revenue' }
    ]
  }
];

const filteredItems = computed(() => {
  return allItems.filter(item => {
    return item.role === 'all' || item.role === userRole.value;
  });
});

const handleMenuSelect = (args) => {
  console.log(`Navigating to: ${args.item.text}`);
};
</script>

<template>
  <div class="admin-panel">
    <div class="role-selector">
      <label>Current Role: </label>
      <select v-model="userRole">
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="user">User</option>
      </select>
    </div>
    
    <ejs-menu
      :items="filteredItems"
      @select="handleMenuSelect"
      orientation="Vertical"
      cssClass="admin-menu"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.admin-panel {
  padding: 20px;
}

.role-selector {
  margin-bottom: 20px;
}

.role-selector select {
  margin-left: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

:deep(.admin-menu) {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
}

:deep(.admin-menu .e-menu-item) {
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

:deep(.admin-menu .e-menu-item:hover) {
  border-left-color: #007bff;
  background-color: #e8f4f8;
}
</style>
```

## E-Commerce Navigation

### E-Commerce Product Menu

```vue
<script setup>
import { ref } from 'vue';

const cartCount = ref(5);
const wishlistCount = ref(3);

const items = ref([
  {
    text: 'Shop',
    id: 'shop',
    items: [
      {
        text: 'Categories',
        items: [
          { text: 'Electronics' },
          { text: 'Fashion' },
          { text: 'Books' },
          { text: 'Home & Garden' }
        ]
      },
      { separator: true },
      { text: 'Best Sellers' },
      { text: 'New Arrivals' },
      { text: 'On Sale' }
    ]
  },
  {
    text: 'Account',
    id: 'account',
    items: [
      { text: 'My Profile' },
      { text: 'My Orders' },
      { text: 'Wishlist' },
      { text: 'Settings' }
    ]
  },
  {
    text: 'Help',
    id: 'help',
    items: [
      { text: 'Track Order' },
      { text: 'Returns' },
      { text: 'Contact Support' },
      { text: 'FAQ' }
    ]
  }
]);

const handleMenuSelect = (args) => {
  if (args.item.text === 'My Orders') {
    console.log('Navigate to orders page');
  }
};
</script>

<template>
  <div class="ecommerce-nav">
    <header class="ecommerce-header">
      <h1>E-Shop</h1>
      
      <ejs-menu
        :items="items"
        @select="handleMenuSelect"
        orientation="Horizontal"
        class="main-nav"
      ></ejs-menu>
      
      <div class="header-icons">
        <span class="icon">
          🔍 Search
        </span>
        <span class="icon">
          ❤️ Wishlist ({{ wishlistCount }})
        </span>
        <span class="icon">
          🛒 Cart ({{ cartCount }})
        </span>
      </div>
    </header>
  </div>
</template>

<style scoped>
.ecommerce-nav {
  width: 100%;
}

.ecommerce-header {
  background-color: #ff9800;
  color: white;
  padding: 12px 20px;
}

.ecommerce-header h1 {
  margin: 0 0 12px 0;
  font-size: 24px;
}

.header-icons {
  display: flex;
  gap: 20px;
  margin-top: 12px;
  font-size: 14px;
}

.icon {
  cursor: pointer;
}

.icon:hover {
  opacity: 0.8;
}

:deep(.main-nav) {
  background-color: #ff9800;
}

:deep(.main-nav .e-menu-item) {
  color: white;
}

:deep(.main-nav .e-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
```

## Multi-Level Navigation with Icons

```vue
<script setup>
import { ref } from 'vue';
import '@syncfusion/ej2-icons/styles/material.css';

const items = ref([
  {
    text: 'Products',
    iconCss: 'e-icons e-box',
    items: [
      {
        text: 'Electronics',
        iconCss: 'e-icons e-monitor',
        items: [
          { text: 'Computers', iconCss: 'e-icons e-desktop' },
          { text: 'Mobile Phones', iconCss: 'e-icons e-mobile' }
        ]
      },
      {
        text: 'Fashion',
        iconCss: 'e-icons e-shopping-cart',
        items: [
          { text: 'Men' },
          { text: 'Women' },
          { text: 'Kids' }
        ]
      }
    ]
  },
  {
    text: 'Orders',
    iconCss: 'e-icons e-clipboard',
    items: [
      { text: 'Active Orders', iconCss: 'e-icons e-check' },
      { text: 'Completed', iconCss: 'e-icons e-checkmark' },
      { text: 'Cancelled', iconCss: 'e-icons e-close' }
    ]
  }
]);
</script>

<template>
  <ejs-menu
    :items="items"
    class="professional-menu"
  ></ejs-menu>
</template>

<style scoped>
:deep(.professional-menu) {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.professional-menu .e-menu-item) {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

:deep(.professional-menu .e-menu-item:hover) {
  background-color: #f5f5f5;
  border-left-color: #007bff;
  transform: translateX(4px);
}
</style>
```

## Related Topics

- [Properties and Configuration](./properties-and-configuration.md) - All available properties
- [Methods and API](./methods-api.md) - Component methods
- [Events and Callbacks](./events-and-callbacks.md) - Event handling patterns
