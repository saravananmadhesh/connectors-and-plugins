# Content Integration

## Table of Contents
- [ListView Integration](#listview-integration)
- [TreeView Integration](#treeview-integration)
- [Custom HTML Content](#custom-html-content)
- [Dynamic Data Binding](#dynamic-data-binding)
- [Menu Structures](#menu-structures)

---

## ListView Integration

### Basic ListView in Sidebar

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

const sidebarRef = ref(null);
const listItems = ref([
  { text: 'Home', id: '1' },
  { text: 'Profile', id: '2' },
  { text: 'Settings', id: '3' },
  { text: 'Logout', id: '4' }
]);

const handleListClick = (args) => {
  console.log('Selected:', args.text);
  sidebarRef.value?.hide();
};
</script>

<template>
  <div>
    <ejs-button @click="sidebarRef?.toggle()">
      ☰ Menu
    </ejs-button>

    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      width="280px"
    >
      <h3>Navigation</h3>
      <ejs-listview
        :dataSource="listItems"
        @click="handleListClick"
      />
    </ejs-sidebar>

    <div class="content">
      <h1>Main Content</h1>
    </div>
  </div>
</template>
```

### ListView with Icons and Actions

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const selectedItem = ref(null);
const sidebarRef = ref(null);

const listItems = ref([
  { 
    text: 'Home',
    icon: '🏠',
    id: 'home'
  },
  { 
    text: 'Products',
    icon: '📦',
    id: 'products'
  },
  { 
    text: 'Orders',
    icon: '📋',
    id: 'orders'
  },
  { 
    text: 'Settings',
    icon: '⚙️',
    id: 'settings'
  },
  { 
    text: 'Logout',
    icon: '🚪',
    id: 'logout'
  }
]);

const handleItemSelect = (args) => {
  selectedItem.value = args.text;
  sidebarRef.value?.hide();
};

const itemTemplate = (props) => {
  return `
    <div class="list-item-template">
      <span class="item-icon">${props.icon}</span>
      <span class="item-text">${props.text}</span>
    </div>
  `;
};
</script>

<template>
  <div>
    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      width="300px"
      :showBackdrop="true"
    >
      <h3>Menu</h3>
      <ejs-listview
        :dataSource="listItems"
        :template="itemTemplate"
        @click="handleItemSelect"
        cssClass="sidebar-list"
      />
    </ejs-sidebar>

    <div class="content">
      <h1>Selected: {{ selectedItem || 'None' }}</h1>
    </div>
  </div>
</template>

<style scoped>
:deep(.sidebar-list .e-list-item) {
  padding: 12px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.sidebar-list .e-list-item:hover) {
  background-color: #f5f5f5;
  border-left: 4px solid #1976d2;
  padding-left: 16px;
}

:deep(.sidebar-list .e-list-item.e-active) {
  background-color: #e3f2fd;
  color: #1976d2;
}

.list-item-template {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-icon {
  font-size: 20px;
}

.item-text {
  flex: 1;
}
</style>
```

---

## TreeView Integration

### Basic TreeView in Sidebar

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

const sidebarRef = ref(null);

const treeData = ref([
  {
    id: '1',
    text: 'Products',
    expanded: true,
    children: [
      { id: '1-1', text: 'Electronics' },
      { id: '1-2', text: 'Clothing' },
      { id: '1-3', text: 'Books' }
    ]
  },
  {
    id: '2',
    text: 'Services',
    expanded: false,
    children: [
      { id: '2-1', text: 'Consulting' },
      { id: '2-2', text: 'Support' }
    ]
  },
  {
    id: '3',
    text: 'Settings'
  }
]);

const handleNodeClick = (args) => {
  console.log('Clicked:', args.node.textContent);
};
</script>

<template>
  <div>
    <ejs-button @click="sidebarRef?.toggle()">
      ☰ Menu
    </ejs-button>

    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      width="300px"
    >
      <h3>Navigation</h3>
      <ejs-treeview
        :fields="{ dataSource: treeData, id: 'id', text: 'text', child: 'children' }"
        @nodeClicked="handleNodeClick"
      />
    </ejs-sidebar>

    <div class="content">
      <h1>Hierarchical Navigation</h1>
    </div>
  </div>
</template>
```

### TreeView with Multi-level Categories

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);
const expandedNodes = ref(['1']);

const categoryData = ref([
  {
    id: '1',
    text: '🏢 Business',
    expanded: true,
    children: [
      {
        id: '1-1',
        text: '👥 Teams',
        children: [
          { id: '1-1-1', text: '📌 Management' },
          { id: '1-1-2', text: '👨‍💼 Sales' },
          { id: '1-1-3', text: '🛠️ Engineering' }
        ]
      },
      {
        id: '1-2',
        text: '📊 Reports',
        children: [
          { id: '1-2-1', text: '📈 Analytics' },
          { id: '1-2-2', text: '💰 Finance' }
        ]
      }
    ]
  },
  {
    id: '2',
    text: '⚙️ Administration',
    children: [
      { id: '2-1', text: '🔐 Security' },
      { id: '2-2', text: '👤 Users' },
      { id: '2-3', text: '🎨 Settings' }
    ]
  }
]);

const handleNodeClick = (args) => {
  // Navigate or perform action
  console.log('Navigate to:', args.node.textContent);
};
</script>

<template>
  <ejs-sidebar
    ref="sidebarRef"
    type="Push"
    width="320px"
  >
    <h3>Menu</h3>
    <ejs-treeview
      :fields="{ dataSource: categoryData, id: 'id', text: 'text', child: 'children' }"
      @nodeClicked="handleNodeClick"
    />
  </ejs-sidebar>
</template>
```

---

## Custom HTML Content

### Simple HTML Content

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const isOpen = ref(false);
</script>

<template>
  <ejs-sidebar
    type="Over"
    width="250px"
    :isOpen="isOpen"
  >
    <div class="sidebar-content">
      <h3>Settings</h3>
      <div class="setting">
        <label>
          <input type="checkbox" />
          Dark Mode
        </label>
      </div>
      <div class="setting">
        <label>
          <input type="checkbox" />
          Notifications
        </label>
      </div>
      <button class="primary-btn">Save</button>
    </div>
  </ejs-sidebar>
</template>

<style scoped>
.sidebar-content {
  padding: 20px;
}

.setting {
  margin: 15px 0;
}

.primary-btn {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
}
</style>
```

### Complex Layout Content

```vue
<script setup>
import { ref } from 'vue';

const userInfo = ref({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '👤'
});

const menuItems = ref([
  { label: 'Profile', icon: '👤' },
  { label: 'Settings', icon: '⚙️' },
  { label: 'Help', icon: '❓' },
  { label: 'Logout', icon: '🚪' }
]);
</script>

<template>
  <ejs-sidebar type="Over" width="280px">
    <div class="sidebar-layout">
      <!-- User Info Section -->
      <div class="user-info">
        <div class="avatar">{{ userInfo.avatar }}</div>
        <div>
          <h4>{{ userInfo.name }}</h4>
          <p>{{ userInfo.email }}</p>
        </div>
      </div>

      <!-- Divider -->
      <hr />

      <!-- Menu Items -->
      <nav class="menu">
        <div
          v-for="item in menuItems"
          :key="item.label"
          class="menu-item"
        >
          <span class="icon">{{ item.icon }}</span>
          <span class="label">{{ item.label }}</span>
        </div>
      </nav>

      <!-- Footer -->
      <div class="sidebar-footer">
        <p style="font-size: 12px; color: #999;">v1.0.0</p>
      </div>
    </div>
  </ejs-sidebar>
</template>

<style scoped>
.sidebar-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
}

.user-info {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 15px;
}

.avatar {
  font-size: 32px;
  line-height: 1;
}

.user-info h4 {
  margin: 0;
  font-size: 14px;
}

.user-info p {
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #666;
}

.menu {
  flex: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
  margin-bottom: 5px;
}

.menu-item:hover {
  background: #f0f0f0;
}

.icon {
  font-size: 18px;
}

.label {
  font-size: 14px;
}

.sidebar-footer {
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}
</style>
```

---

## Dynamic Data Binding

### Dynamic Menu from API

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const menuItems = ref([]);
const isLoading = ref(true);

const loadMenuItems = async () => {
  try {
    // Simulate API call
    const response = await new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, label: 'Dashboard', icon: '📊' },
          { id: 2, label: 'Users', icon: '👥' },
          { id: 3, label: 'Reports', icon: '📈' },
          { id: 4, label: 'Settings', icon: '⚙️' }
        ]);
      }, 1000);
    });
    menuItems.value = response;
  } catch (error) {
    console.error('Error loading menu:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadMenuItems();
});
</script>

<template>
  <ejs-sidebar type="Push" width="250px">
    <h3>Menu</h3>
    <div v-if="isLoading" class="loading">
      Loading...
    </div>
    <nav v-else class="menu">
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="menu-item"
      >
        <span class="icon">{{ item.icon }}</span>
        <span class="label">{{ item.label }}</span>
      </div>
    </nav>
  </ejs-sidebar>
</template>

<style scoped>
.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}

.menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:hover {
  background: #f5f5f5;
}
</style>
```

---

## Menu Structures

### Flat Menu Structure

```vue
<template>
  <ejs-sidebar type="Over">
    <nav>
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </ejs-sidebar>
</template>

<style scoped>
:deep(.e-sidebar nav) {
  display: flex;
  flex-direction: column;
}

:deep(.e-sidebar nav a) {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  text-decoration: none;
  color: #333;
  transition: background 0.2s;
}

:deep(.e-sidebar nav a:hover) {
  background: #f5f5f5;
}
</style>
```

### Grouped Menu Structure

```vue
<script setup>
import { ref } from 'vue';

const menuGroups = ref([
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', icon: '📊' },
      { label: 'Products', icon: '📦' }
    ]
  },
  {
    title: 'Management',
    items: [
      { label: 'Users', icon: '👥' },
      { label: 'Roles', icon: '🔐' }
    ]
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', icon: '⚙️' },
      { label: 'Help', icon: '❓' }
    ]
  }
]);
</script>

<template>
  <ejs-sidebar type="Push" width="280px">
    <div
      v-for="group in menuGroups"
      :key="group.title"
      class="menu-group"
    >
      <h4 class="group-title">{{ group.title }}</h4>
      <nav>
        <div
          v-for="item in group.items"
          :key="item.label"
          class="menu-item"
        >
          <span class="icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </div>
      </nav>
    </div>
  </ejs-sidebar>
</template>

<style scoped>
.menu-group {
  padding: 10px 0;
}

.group-title {
  padding: 10px 20px;
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-item:hover {
  background: #f5f5f5;
}

.icon {
  font-size: 18px;
  min-width: 24px;
  text-align: center;
}
</style>
```
