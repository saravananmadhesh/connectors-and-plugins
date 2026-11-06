# Design Patterns

## Table of Contents
- [AppBar with Menu Component](#appbar-with-menu-component)
- [AppBar with DropDown Components](#appbar-with-dropdown-components)
- [AppBar with Sidebar](#appbar-with-sidebar)
- [Common Layout Patterns](#common-layout-patterns)
- [Vue 3 Composition API Patterns](#vue-3-composition-api-patterns)

## AppBar with Menu Component

Integrate the Menu component with AppBar for dropdown navigation menus. The `e-inherit` CSS class ensures the Menu inherits AppBar styling.

**When to use:**
- Multi-level navigation hierarchies
- Dropdown menus with submenus
- Grouped navigation options
- Professional menu structures

### Basic Menu Integration

```vue
<template>
  <ejs-appbar color-mode="Primary">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    
    <!-- Menus with e-inherit inherit AppBar styling -->
    <ejs-menu :items="companyMenuItems" class="e-inherit"></ejs-menu>
    <ejs-menu :items="productMenuItems" class="e-inherit"></ejs-menu>
    <ejs-menu :items="supportMenuItems" class="e-inherit"></ejs-menu>
    
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit">Login</button>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
import { MenuComponent } from "@syncfusion/ej2-vue-navigations";

const companyMenuItems = ref([
  {
    text: 'Company',
    items: [
      { text: 'About Us' },
      { text: 'Customers' },
      { text: 'Blog' },
      { text: 'Careers' }
    ]
  }
])

const productMenuItems = ref([
  {
    text: 'Products',
    items: [
      { text: 'Developer Tools' },
      { text: 'Analytics' },
      { text: 'Reporting' },
      { text: 'Help Desk' }
    ]
  }
])

const supportMenuItems = ref([
  {
    text: 'Support',
    items: [
      { text: 'Documentation' },
      { text: 'API Reference' },
      { text: 'Contact Us' }
    ]
  }
])
</script>
```

### Menu with Icons and Event Handling

```vue
<template>
  <ejs-appbar color-mode="Dark" mode="Dense">
    <ejs-menu :items="fileMenuItems" class="e-inherit" @select="handleMenuSelect"></ejs-menu>
    
    <div class="e-appbar-separator"></div>
    <button class="e-btn e-inherit e-icon-btn" title="Undo">
      <span class="e-btn-icon e-icons e-undo"></span>
    </button>
    <button class="e-btn e-inherit e-icon-btn" title="Redo">
      <span class="e-btn-icon e-icons e-redo"></span>
    </button>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
import { MenuComponent } from "@syncfusion/ej2-vue-navigations";

const fileMenuItems = ref([
  {
    text: 'New',
    iconCss: 'e-icons e-file',
    items: [
      { text: 'Document', iconCss: 'e-icons e-document' },
      { text: 'Spreadsheet', iconCss: 'e-icons e-spreadsheet' },
      { text: 'Presentation', iconCss: 'e-icons e-presentation' }
    ]
  },
  {
    text: 'Open',
    iconCss: 'e-icons e-folder-open'
  },
  {
    text: 'Save',
    iconCss: 'e-icons e-save'
  },
  { separator: true },
  {
    text: 'Exit',
    iconCss: 'e-icons e-exit'
  }
])

const handleMenuSelect = (args) => {
  console.log('Selected:', args.item.text)
}
</script>
```

## AppBar with DropDown Components

Combine AppBar with DropDownButton components for flexible content layouts.

**When to use:**
- Quick action buttons
- Dropdown selections without full menu
- Call-to-action buttons
- Split buttons for primary + secondary actions

### DropDownButton in AppBar

```vue
<template>
  <ejs-appbar color-mode="Primary">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    
    <ejs-dropdownbutton class="e-inherit" :items="productItems">
      Products
    </ejs-dropdownbutton>
    
    <button class="e-btn e-inherit">Documentation</button>
    
    <div class="e-appbar-spacer"></div>
    <div class="e-appbar-separator"></div>
    
    <ejs-dropdownbutton class="e-inherit" :items="accountItems">
      Account
    </ejs-dropdownbutton>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
import { DropDownButtonComponent } from "@syncfusion/ej2-vue-splitbuttons";

const productItems = ref([
  { text: 'Developer Tools' },
  { text: 'Analytics Platform' },
  { text: 'Reporting Suite' },
  { text: 'E-Signature' },
  { text: 'Help Desk' }
])

const accountItems = ref([
  { text: 'Profile' },
  { text: 'Settings' },
  { text: 'Preferences' },
  { separator: true },
  { text: 'Logout' }
])
</script>
```

### Multiple Dropdowns with Separators

```vue
<template>
  <ejs-appbar color-mode="Primary" mode="Dense">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    
    <!-- View Controls -->
    <ejs-dropdownbutton class="e-inherit" :items="viewOptions">
      View
    </ejs-dropdownbutton>
    
    <div class="e-appbar-separator"></div>
    
    <!-- Data Controls -->
    <ejs-dropdownbutton class="e-inherit" :items="sortOptions">
      Sort
    </ejs-dropdownbutton>
    
    <ejs-dropdownbutton class="e-inherit" :items="filterOptions">
      Filter
    </ejs-dropdownbutton>
    
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" :is-primary="true">Export</button>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
import { DropDownButtonComponent } from "@syncfusion/ej2-vue-splitbuttons";

const viewOptions = ref([
  { text: 'Grid View' },
  { text: 'List View' },
  { text: 'Kanban View' }
])

const sortOptions = ref([
  { text: 'By Name' },
  { text: 'By Date' },
  { text: 'By Priority' }
])

const filterOptions = ref([
  { text: 'Active' },
  { text: 'Archived' },
  { text: 'All' }
])
</script>
```

## AppBar with Sidebar

Combine AppBar with Sidebar for responsive navigation. Common on mobile apps where sidebar toggles on menu click.

**When to use:**
- Mobile-friendly navigation
- Collapsible menus
- Navigation drawers
- Responsive layouts

### Basic Sidebar Toggle

```vue
<template>
  <div id="responsive-wrapper">
    <!-- AppBar Header -->
    <ejs-appbar>
      <button class="e-btn e-inherit e-icon-btn" @click="toggleSidebar" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <div class="e-folder">
        <div class="e-folder-name">My Application</div>
      </div>
    </ejs-appbar>

    <!-- Sidebar Navigation -->
    <ejs-sidebar 
      ref="sidebarRef"
      width="250px"
      target=".main-content"
      media-query="(min-width: 600px)"
      :is-open="isOpen"
    >
      <div class="sidebar-menu">
        <div class="menu-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </ejs-sidebar>

    <!-- Main Content -->
    <div class="main-content" style="padding: 20px">
      <h2>Main Content Area</h2>
      <p>Click the menu icon to toggle sidebar on mobile devices.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
import { SidebarComponent } from "@syncfusion/ej2-vue-navigations";

const sidebarRef = ref(null)
const isOpen = ref(true)

const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggle()
  }
}
</script>

<style scoped>
#responsive-wrapper {
  display: flex;
  flex-direction: column;
}

.sidebar-menu {
  padding: 20px 0;
}

.menu-section h4 {
  padding: 0 20px;
  margin: 10px 0;
  color: #333;
}

.menu-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-section li {
  border-bottom: 1px solid #e0e0e0;
}

.menu-section a {
  display: block;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: background 0.3s;
}

.menu-section a:hover {
  background: #f0f0f0;
}
</style>
```

### Sidebar with TreeView Navigation

```vue
<template>
  <div id="responsive-wrapper">
    <!-- AppBar -->
    <ejs-appbar>
      <button class="e-btn e-inherit e-icon-btn" @click="toggleSidebar" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <div class="e-folder">
        <div class="e-folder-name">Documentation</div>
      </div>
    </ejs-appbar>

    <!-- Sidebar with TreeView -->
    <ejs-sidebar 
      ref="sidebarRef"
      width="220px"
      target=".main-sidebar-content"
      media-query="(min-width: 600px)"
      :is-open="isOpen"
    >
      <div class="res-main-menu">
        <div class="table-content">
          <input type="text" placeholder="Search..." class="search-input" />
          <p class="main-menu-header">TABLE OF CONTENTS</p>
        </div>
        <div>
          <ejs-treeview 
            class="main-treeview"
            :fields="treeFields"
            expand-on="Click"
          />
        </div>
      </div>
    </ejs-sidebar>

    <!-- Main Content -->
    <div class="main-sidebar-content" id="main-text">
      <div class="sidebar-content">
        <h2>Component Documentation</h2>
        <p>Select a topic from the sidebar to view documentation.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
import { SidebarComponent } from "@syncfusion/ej2-vue-navigations";
import { TreeViewComponent } from "@syncfusion/ej2-vue-navigations";

const sidebarRef = ref(null)
const isOpen = ref(true)

const navData = ref([
  { nodeId: '01', nodeText: 'Getting Started' },
  { nodeId: '02', nodeText: 'Installation' },
  {
    nodeId: '03',
    nodeText: 'Components',
    nodeChild: [
      { nodeId: '03-01', nodeText: 'Grid' },
      { nodeId: '03-02', nodeText: 'Chart' },
      { nodeId: '03-03', nodeText: 'Calendar' },
      { nodeId: '03-04', nodeText: 'Button' }
    ]
  },
  { nodeId: '04', nodeText: 'API Reference' },
  { nodeId: '05', nodeText: 'Support' }
])

const treeFields = ref({
  dataSource: navData.value,
  id: 'nodeId',
  text: 'nodeText',
  child: 'nodeChild'
})

const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggle()
  }
}
</script>

<style scoped>
#responsive-wrapper {
  display: flex;
  flex-direction: column;
}

.res-main-menu {
  padding: 10px 0;
}

.table-content {
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.main-menu-header {
  margin: 10px 0 5px 0;
  font-weight: 600;
  font-size: 0.9rem;
  color: #666;
}

.main-treeview {
  padding: 5px 0;
}

.sidebar-content {
  padding: 40px 20px;
}

.sidebar-content h2 {
  color: #0066cc;
  margin-top: 0;
}
</style>
```

## Common Layout Patterns

### Pattern 1: E-commerce Header
```vue
<ejs-appbar color-mode="Primary">
  <button class="e-btn e-inherit e-icon-btn" title="Menu">
    <span class="e-btn-icon e-icons e-menu"></span>
  </button>
  <span class="logo">ShopHub</span>
  
  <button class="e-btn e-inherit">Home</button>
  <button class="e-btn e-inherit">Shop</button>
  <button class="e-btn e-inherit">Sale</button>
  
  <div class="e-appbar-spacer"></div>
  <div class="e-appbar-separator"></div>
  
  <button class="e-btn e-inherit e-icon-btn" title="Search">
    <span class="e-btn-icon e-icons e-search"></span>
  </button>
  <button class="e-btn e-inherit e-icon-btn" title="Cart">
    <span class="e-btn-icon e-icons e-shopping-cart"></span>
  </button>
  <button class="e-btn e-inherit e-icon-btn" title="User">
    <span class="e-btn-icon e-icons e-user"></span>
  </button>
</ejs-appbar>
```

### Pattern 2: Admin Dashboard Header
```vue
<ejs-appbar color-mode="Dark">
  <button class="e-btn e-inherit e-icon-btn" title="Menu">
    <span class="e-btn-icon e-icons e-menu"></span>
  </button>
  <span>Dashboard</span>
  
  <div class="e-appbar-spacer"></div>
  
  <button class="e-btn e-inherit e-icon-btn" title="Notifications">
    <span class="e-btn-icon e-icons e-bell"></span>
  </button>
  <button class="e-btn e-inherit e-icon-btn" title="Messages">
    <span class="e-btn-icon e-icons e-mail"></span>
  </button>
  <div class="e-appbar-separator"></div>
  <button class="e-btn e-inherit e-icon-btn" title="User">
    <span class="e-btn-icon e-icons e-user"></span>
  </button>
</ejs-appbar>
```

### Pattern 3: Document Editor Toolbar
```vue
<ejs-appbar color-mode="Primary" mode="Dense">
  <!-- File Operations -->
  <button class="e-btn e-inherit e-icon-btn" title="New">
    <span class="e-btn-icon e-icons e-new"></span>
  </button>
  <button class="e-btn e-inherit e-icon-btn" title="Open">
    <span class="e-btn-icon e-icons e-open"></span>
  </button>
  <button class="e-btn e-inherit e-icon-btn" title="Save">
    <span class="e-btn-icon e-icons e-save"></span>
  </button>
  
  <div class="e-appbar-separator"></div>
  
  <!-- Edit Operations -->
  <button class="e-btn e-inherit e-icon-btn" title="Undo">
    <span class="e-btn-icon e-icons e-undo"></span>
  </button>
  <button class="e-btn e-inherit e-icon-btn" title="Redo">
    <span class="e-btn-icon e-icons e-redo"></span>
  </button>
  
  <div class="e-appbar-separator"></div>
  
  <!-- Formatting -->
  <button class="e-btn e-inherit e-icon-btn" title="Bold">
    <span class="e-btn-icon e-icons e-bold"></span>
  </button>
  <button class="e-btn e-inherit e-icon-btn" title="Italic">
    <span class="e-btn-icon e-icons e-italic"></span>
  </button>
  <button class="e-btn e-inherit e-icon-btn" title="Underline">
    <span class="e-btn-icon e-icons e-underline"></span>
  </button>
</ejs-appbar>
```

## Vue 3 Composition API Patterns

### Pattern: Reactive AppBar with State Management

```vue
<template>
  <ejs-appbar :color-mode="currentColorMode" :mode="currentMode" :is-sticky="isSticky">
    <button class="e-btn e-inherit e-icon-btn" @click="handleMenuClick" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span>{{ appTitle }}</span>
    
    <div class="e-appbar-spacer"></div>
    
    <button class="e-btn e-inherit" @click="toggleTheme">
      {{ currentColorMode === 'Primary' ? 'Light' : 'Primary' }}
    </button>
    
    <button class="e-btn e-inherit" @click="handleLogout">
      Logout
    </button>
  </ejs-appbar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

// State management
const currentColorMode = ref('Primary')
const currentMode = ref('Regular')
const isSticky = ref(false)
const appTitle = ref('Vue App')

// Computed properties
const isDarkMode = computed(() => currentColorMode.value === 'Dark')

// Event handlers
const handleMenuClick = () => {
  console.log('Menu clicked')
}

const toggleTheme = () => {
  currentColorMode.value = currentColorMode.value === 'Primary' ? 'Dark' : 'Primary'
  console.log('Theme changed to:', currentColorMode.value)
}

const handleLogout = () => {
  console.log('User logged out')
  // Perform logout logic here
}
</script>
```

### Pattern: AppBar with Component Events

```vue
<template>
  <ejs-appbar 
    color-mode="Primary"
    @created="onAppBarCreated"
    @destroyed="onAppBarDestroyed"
  >
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span>{{ message }}</span>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const message = ref('AppBar Ready')

const onAppBarCreated = (args) => {
  console.log('AppBar component created', args)
  message.value = 'AppBar Initialized'
}

const onAppBarDestroyed = (args) => {
  console.log('AppBar component destroyed', args)
  message.value = 'AppBar Destroyed'
}
</script>
```

These patterns provide solid foundations for building professional AppBar-based navigation systems in Vue 3.
