# Events and Callbacks

## Table of Contents
1. [Event Binding Overview](#event-binding-overview)
2. [User Interaction Events](#user-interaction-events)
3. [Menu State Events](#menu-state-events)
4. [Rendering Events](#rendering-events)
5. [Lifecycle Events](#lifecycle-events)
6. [Complete Event Example](#complete-event-example)

## Event Binding Overview

Vue 3 uses the `@` symbol (v-on) for event binding. Events are bound directly in the template with handler functions.

### Basic Event Binding Pattern

```vue
<script setup>
import { ref } from 'vue';

const handlers = {
  onItemSelect(args) {
    console.log('Item selected:', args.item);
  }
};
</script>

<template>
  <ejs-menu
    :items="items"
    @select="handlers.onItemSelect"
  ></ejs-menu>
</template>
```

### Using Arrow Functions in Event Handlers

```vue
<script setup>
import { ref } from 'vue';

const selectedItem = ref(null);

const handleSelect = (args) => {
  selectedItem.value = args.item.text;
  console.log('Selected:', args.item.text);
};
</script>

<template>
  <div>
    <p>Selected: {{ selectedItem }}</p>
    <ejs-menu
      :items="items"
      @select="handleSelect"
    ></ejs-menu>
  </div>
</template>
```

## User Interaction Events

### @select (onSelect)
**Triggered:** When a menu item is clicked/selected.  
**Use Case:** Track which menu item was selected, navigate, or trigger actions.

```vue
<script setup>
import { ref } from 'vue';

const selectedItems = ref([]);

const handleItemSelect = (args) => {
  selectedItems.value.push({
    text: args.item.text,
    timestamp: new Date()
  });
};
</script>

<template>
  <div>
    <h3>Selected Items:</h3>
    <ul>
      <li v-for="item in selectedItems" :key="item.timestamp">
        {{ item.text }}
      </li>
    </ul>
    
    <ejs-menu
      :items="items"
      @select="handleItemSelect"
    ></ejs-menu>
  </div>
</template>
```

**Event Arguments:**
- `item` - Selected menu item object
- `element` - DOM element of the selected item
- `event` - Native DOM event

## Menu State Events

### @beforeOpen (onBeforeOpen)
**Triggered:** Before a sub-menu opens (before animation).  
**Use Case:** Prevent certain menus from opening, dynamically load menu items, or validate state.

```vue
<script setup>
import { ref } from 'vue';

const canOpenMenu = (itemId) => {
  // Prevent opening if user is not authenticated
  return !!localStorage.getItem('userToken');
};

const handleBeforeOpen = (args) => {
  const itemId = args.item?.id;
  
  if (!canOpenMenu(itemId)) {
    args.cancel = true; // Prevent menu from opening
    console.log('Menu blocked - user not authenticated');
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

**Event Arguments:**
- `item` - Menu item being opened
- `element` - DOM element
- `event` - Native DOM event
- `cancel` - Set to true to prevent opening

### @beforeClose (onBeforeClose)
**Triggered:** Before a sub-menu closes (before animation).  
**Use Case:** Prompt user, save state, or cancel close operation.

```vue
<script setup>
import { ref } from 'vue';

const hasUnsavedChanges = ref(false);

const handleBeforeClose = (args) => {
  if (hasUnsavedChanges.value) {
    args.cancel = true; // Keep menu open
    console.log('Cannot close - unsaved changes');
  }
};
</script>

<template>
  <ejs-menu
    :items="items"
    @beforeClose="handleBeforeClose"
  ></ejs-menu>
</template>
```

**Event Arguments:**
- `item` - Menu item being closed
- `element` - DOM element
- `event` - Native DOM event
- `cancel` - Set to true to prevent closing

### @onOpen (onOpen)
**Triggered:** After a sub-menu has opened (after animation completes).  
**Use Case:** Focus first item, log analytics, update UI state.

```vue
<script setup>
import { ref } from 'vue';

const openMenus = ref([]);

const handleMenuOpen = (args) => {
  const itemText = args.item.text;
  openMenus.value.push(itemText);
  
  // Focus first child item
  const firstChild = args.element?.querySelector('.e-menu-item');
  firstChild?.focus();
};
</script>

<template>
  <div>
    <p>Open Menus: {{ openMenus.join(' > ') }}</p>
    <ejs-menu
      :items="items"
      @onOpen="handleMenuOpen"
    ></ejs-menu>
  </div>
</template>
```

**Event Arguments:**
- `item` - Opened menu item
- `element` - DOM element
- `event` - Native DOM event

### @onClose (onClose)
**Triggered:** After a sub-menu has closed (after animation completes).  
**Use Case:** Cleanup, save user preferences, update analytics.

```vue
<script setup>
import { ref } from 'vue';

const closedMenus = ref([]);

const handleMenuClose = (args) => {
  closedMenus.value.push({
    item: args.item.text,
    closedAt: new Date()
  });
};
</script>

<template>
  <ejs-menu
    :items="items"
    @onClose="handleMenuClose"
  ></ejs-menu>
</template>
```

**Event Arguments:**
- `item` - Closed menu item
- `element` - DOM element
- `event` - Native DOM event

## Rendering Events

### @beforeItemRender (onBeforeItemRender)
**Triggered:** Before each menu item is rendered.  
**Use Case:** Customize item appearance, apply dynamic classes/styles, or modify item properties at render time.

```vue
<script setup>
import { ref } from 'vue';

const userRole = ref('guest');

const handleBeforeItemRender = (args) => {
  const item = args.item;
  
  // Hide admin items for non-admins
  if (item.adminOnly && userRole.value !== 'admin') {
    args.element.style.display = 'none';
  }
  
  // Add custom class for disabled items
  if (item.disabled) {
    args.element.classList.add('disabled-item');
  }
  
  // Highlight premium items
  if (item.isPremium) {
    args.element.classList.add('premium-badge');
  }
};
</script>

<template>
  <ejs-menu
    :items="items"
    @beforeItemRender="handleBeforeItemRender"
  ></ejs-menu>
</template>

<style scoped>
:deep(.disabled-item) {
  opacity: 0.5;
  cursor: not-allowed;
}

:deep(.premium-badge)::after {
  content: ' ⭐ Premium';
  color: gold;
  font-weight: bold;
}
</style>
```

**Event Arguments:**
- `item` - Menu item being rendered
- `element` - DOM element for the item
- `isParent` - Whether item has children

## Lifecycle Events

### @created (onCreated)
**Triggered:** After the menu component is fully initialized and rendered.  
**Use Case:** Focus element, initialize integrations, load additional data, setup shortcuts.

```vue
<script setup>
import { ref, onMounted } from 'vue';

const menuRef = ref(null);
const isMenuReady = ref(false);

const handleMenuCreated = () => {
  isMenuReady.value = true;
  console.log('Menu is ready');
  
  // Setup keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardNavigation);
};

const handleKeyboardNavigation = (e) => {
  if (e.altKey && e.key === 'm') {
    // Alt+M to open menu
    const instance = menuRef.value.ej2_instances[0];
    instance.open();
  }
};

onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <div>
    <p v-if="isMenuReady" class="status-ok">✓ Menu Ready</p>
    <p v-else class="status-loading">Loading...</p>
    
    <ejs-menu
      ref="menuRef"
      :items="items"
      @created="handleMenuCreated"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.status-ok {
  color: green;
  font-weight: bold;
}

.status-loading {
  color: orange;
}
</style>
```

**Event Arguments:**
- `e` - Event object
- `element` - Menu DOM element

## Complete Event Example

```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const items = ref([
  {
    text: 'File',
    id: 'file',
    items: [
      { text: 'New', id: 'new' },
      { text: 'Open', id: 'open' },
      { text: 'Save', id: 'save' }
    ]
  },
  {
    text: 'Edit',
    id: 'edit',
    items: [
      { text: 'Cut', id: 'cut' },
      { text: 'Copy', id: 'copy' },
      { text: 'Paste', id: 'paste', disabled: true }
    ]
  },
  {
    text: 'View',
    id: 'view',
    items: [
      { text: 'Zoom In', id: 'zoomin' },
      { text: 'Zoom Out', id: 'zoomout' },
      { text: 'Reset', id: 'reset' }
    ]
  }
]);

const eventLog = ref([]);
const selectedItem = ref(null);
const openMenuItems = ref([]);

const logEvent = (eventType, details) => {
  eventLog.value.unshift({
    type: eventType,
    details: details,
    timestamp: new Date().toLocaleTimeString()
  });
  
  // Keep only last 10 events
  if (eventLog.value.length > 10) {
    eventLog.value.pop();
  }
};

const handlers = {
  onSelect(args) {
    selectedItem.value = args.item.text;
    logEvent('SELECT', `Selected: ${args.item.text}`);
  },
  
  onBeforeOpen(args) {
    logEvent('BEFORE_OPEN', `Opening: ${args.item.text}`);
  },
  
  onBeforeClose(args) {
    logEvent('BEFORE_CLOSE', `Closing: ${args.item.text}`);
  },
  
  onOpen(args) {
    openMenuItems.value.push(args.item.text);
    logEvent('OPEN', `Opened: ${args.item.text}`);
  },
  
  onClose(args) {
    openMenuItems.value = openMenuItems.value.filter(
      item => item !== args.item.text
    );
    logEvent('CLOSE', `Closed: ${args.item.text}`);
  },
  
  onBeforeItemRender(args) {
    // Add custom styling for items
    if (args.item.disabled) {
      args.element.classList.add('disabled-style');
    }
  },
  
  onCreated() {
    logEvent('CREATED', 'Menu component initialized');
  }
};

const clearLog = () => {
  eventLog.value = [];
};
</script>

<template>
  <div class="event-demo">
    <div class="main-container">
      <div class="menu-section">
        <h3>Menu with Events</h3>
        <ejs-menu
          :items="items"
          @select="handlers.onSelect"
          @beforeOpen="handlers.onBeforeOpen"
          @beforeClose="handlers.onBeforeClose"
          @onOpen="handlers.onOpen"
          @onClose="handlers.onClose"
          @beforeItemRender="handlers.onBeforeItemRender"
          @created="handlers.onCreated"
          class="e-menu-demo"
        ></ejs-menu>
      </div>
      
      <div class="info-section">
        <div class="selected-item">
          <strong>Selected Item:</strong>
          <p>{{ selectedItem || 'None' }}</p>
        </div>
        
        <div class="open-menus">
          <strong>Open Menus:</strong>
          <ul>
            <li v-for="menu in openMenuItems" :key="menu">
              {{ menu }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="event-log-section">
      <div class="log-header">
        <strong>Event Log</strong>
        <button @click="clearLog" class="clear-btn">Clear</button>
      </div>
      
      <div class="event-log">
        <div
          v-for="(event, index) in eventLog"
          :key="index"
          :class="['log-entry', event.type.toLowerCase()]"
        >
          <span class="event-type">{{ event.type }}</span>
          <span class="event-time">{{ event.timestamp }}</span>
          <span class="event-detail">{{ event.details }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-demo {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.main-container {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.menu-section {
  flex: 1;
}

.info-section {
  flex: 1;
  border-left: 1px solid #ddd;
  padding-left: 20px;
}

.selected-item,
.open-menus {
  margin-bottom: 20px;
}

.open-menus ul {
  list-style: none;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.open-menus li {
  padding: 5px;
  color: #0066cc;
  font-weight: bold;
}

.event-log-section {
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.clear-btn {
  padding: 5px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #c82333;
}

.event-log {
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
}

.log-entry {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 15px;
  font-size: 12px;
}

.event-type {
  font-weight: bold;
  width: 120px;
  color: white;
  padding: 2px 8px;
  border-radius: 3px;
  background-color: #999;
}

.log-entry.select .event-type {
  background-color: #28a745;
}

.log-entry.before_open .event-type {
  background-color: #ffc107;
}

.log-entry.before_close .event-type {
  background-color: #fd7e14;
}

.log-entry.open .event-type {
  background-color: #17a2b8;
}

.log-entry.close .event-type {
  background-color: #6c757d;
}

.log-entry.created .event-type {
  background-color: #007bff;
}

.event-time {
  color: #666;
  min-width: 100px;
}

.event-detail {
  color: #333;
  flex: 1;
}

h3 {
  margin-top: 0;
  color: #333;
}

:deep(.disabled-style) {
  opacity: 0.6;
  color: #999;
}
</style>
```

## Event Handler Reference Summary

| Event | When Triggered | Common Use Cases |
|-------|----------------|------------------|
| `@select` | Item clicked | Track selection, navigate |
| `@beforeOpen` | Before submenu opens | Validate, prevent open |
| `@beforeClose` | Before submenu closes | Save state, prevent close |
| `@onOpen` | After submenu opens | Focus items, animations |
| `@onClose` | After submenu closes | Cleanup, analytics |
| `@beforeItemRender` | Before item renders | Customize styling |
| `@created` | Component initialized | Setup, load data |

## Related Topics

- [Properties and Configuration](./properties-and-configuration.md) - Component properties
- [Event Arguments Reference](./event-arguments-reference.md) - Detailed argument types
- [Methods and API](./methods-api.md) - Component methods
