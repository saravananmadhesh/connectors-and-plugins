# Event Arguments Reference

## Table of Contents
1. [Overview](#overview)
2. [MenuEventArgs](#menueventargs)
3. [BeforeOpenCloseMenuEventArgs](#beforeopencloseemenueventargs)
4. [OpenCloseMenuEventArgs](#opencloseemenueventargs)
5. [Type Usage Patterns](#type-usage-patterns)

## Overview

Each event in the Syncfusion Vue Menu emits specific event arguments. Understanding these argument types helps you write proper TypeScript types and access the correct properties.

### Event Arguments by Event Type

| Event | Argument Type |
|-------|---------------|
| `@select` | `MenuEventArgs` |
| `@beforeOpen` | `BeforeOpenCloseMenuEventArgs` |
| `@beforeClose` | `BeforeOpenCloseMenuEventArgs` |
| `@onOpen` | `OpenCloseMenuEventArgs` |
| `@onClose` | `OpenCloseMenuEventArgs` |
| `@beforeItemRender` | `MenuEventArgs` |
| `@created` | Generic Event |

## MenuEventArgs

Used by `@select` and `@beforeItemRender` events.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `item` | `MenuItemModel` | The menu item object |
| `element` | `HTMLElement` | The DOM element of the menu item |
| `event` | `Event` | Native DOM event |
| `isParent` | `boolean` | Whether item has children |
| `target` | `HTMLElement` | The target element that triggered the event |

### MenuItemModel Structure

```typescript
interface MenuItemModel {
  text?: string;              // Item display text
  iconCss?: string;           // CSS class for icon
  id?: string;                // Unique identifier
  url?: string;               // Navigation URL
  items?: MenuItemModel[];    // Child items
  disabled?: boolean;         // Disabled state
  separator?: boolean;        // Render as separator
  htmlAttributes?: Object;    // Custom HTML attributes
  [key: string]: any;         // Any custom properties
}
```

### Usage Example

```vue
<script setup>
import { ref } from 'vue';

const handleSelect = (args) => {
  // Access item properties
  console.log('Text:', args.item.text);
  console.log('ID:', args.item.id);
  console.log('Disabled:', args.item.disabled);
  console.log('Has Children:', args.isParent);
  
  // Access DOM element
  console.log('Element:', args.element);
  
  // Access native event
  console.log('Native Event:', args.event);
};

const handleBeforeItemRender = (args) => {
  const item = args.item;
  const element = args.element;
  
  // Conditionally modify rendering
  if (item.custom) {
    element.classList.add('custom-item');
  }
};
</script>

<template>
  <ejs-menu
    :items="items"
    @select="handleSelect"
    @beforeItemRender="handleBeforeItemRender"
  ></ejs-menu>
</template>
```

## BeforeOpenCloseMenuEventArgs

Used by `@beforeOpen` and `@beforeClose` events. These events allow you to prevent the action.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `item` | `MenuItemModel` | The menu item being opened/closed |
| `element` | `HTMLElement` | The submenu DOM element |
| `event` | `Event` | Native DOM event that triggered the action |
| `cancel` | `boolean` | Set to true to cancel the action |

### Usage Example

```vue
<script setup>
import { ref } from 'vue';

const authToken = ref(localStorage.getItem('authToken'));

const handleBeforeOpen = (args) => {
  const itemId = args.item.id;
  
  // Prevent opening premium items if not authenticated
  if (args.item.isPremium && !authToken.value) {
    args.cancel = true;
    console.warn('Cannot open premium menu - authentication required');
  }
};

const handleBeforeClose = (args) => {
  const hasUnsavedData = false; // Check actual state
  
  if (hasUnsavedData) {
    // Prompt user before closing
    if (!confirm('You have unsaved changes. Close anyway?')) {
      args.cancel = true; // Stay open
    }
  }
};
</script>

<template>
  <ejs-menu
    :items="items"
    @beforeOpen="handleBeforeOpen"
    @beforeClose="handleBeforeClose"
  ></ejs-menu>
</template>
```

## OpenCloseMenuEventArgs

Used by `@onOpen` and `@onClose` events. These fire after the action completes.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `item` | `MenuItemModel` | The menu item that opened/closed |
| `element` | `HTMLElement` | The DOM element |
| `event` | `Event` | Native DOM event |

### Usage Example

```vue
<script setup>
import { ref } from 'vue';

const menuHistory = ref([]);

const handleOpen = (args) => {
  // Track opened menus for breadcrumb
  menuHistory.value.push(args.item.text);
  
  // Log to analytics
  trackEvent('menu_opened', {
    item: args.item.text,
    timestamp: Date.now()
  });
};

const handleClose = (args) => {
  // Remove from breadcrumb
  menuHistory.value.pop();
  
  // Cleanup or save state
  saveMenuState();
};

const trackEvent = (eventName, data) => {
  // Send to analytics service
  console.log(`Event: ${eventName}`, data);
};

const saveMenuState = () => {
  // Save current menu state
  console.log('State saved');
};
</script>

<template>
  <div>
    <div class="breadcrumb">
      <span v-for="(item, i) in menuHistory" :key="i">
        {{ item }}{{ i < menuHistory.length - 1 ? ' > ' : '' }}
      </span>
    </div>
    
    <ejs-menu
      :items="items"
      @onOpen="handleOpen"
      @onClose="handleClose"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.breadcrumb {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 12px;
}
</style>
```

## Type Usage Patterns

### Pattern 1: Destructuring Event Arguments

```vue
<script setup>
// Destructure to access specific properties
const handleSelect = ({ item, element, event }) => {
  console.log('Selected:', item.text);
};

const handleBeforeOpen = ({ item, cancel }) => {
  if (shouldPreventOpen(item.id)) {
    cancel = true;
  }
};
</script>

<template>
  <ejs-menu
    :items="items"
    @select="handleSelect"
    @beforeOpen="handleBeforeOpen"
  ></ejs-menu>
</template>
```

### Pattern 2: Type Annotations (TypeScript)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { MenuEventArgs, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-vue-navigations';

const handleSelect = (args: MenuEventArgs) => {
  // TypeScript knows args.item.text exists
  const text = args.item?.text || '';
};

const handleBeforeOpen = (args: BeforeOpenCloseMenuEventArgs) => {
  // TypeScript knows cancel is a boolean property
  if (args.item?.isPremium) {
    args.cancel = true;
  }
};
</script>

<template>
  <ejs-menu
    :items="items"
    @select="handleSelect"
    @beforeOpen="handleBeforeOpen"
  ></ejs-menu>
</template>
```

### Pattern 3: Accessing Nested Properties

```vue
<script setup>
const handleSelect = (args) => {
  // Safely access nested properties
  const itemId = args.item?.id;
  const itemText = args.item?.text;
  const elementClass = args.element?.className;
  
  // Optional chaining prevents errors if properties don't exist
  const firstChild = args.item?.items?.[0]?.text;
};
</script>

<template>
  <ejs-menu
    :items="items"
    @select="handleSelect"
  ></ejs-menu>
</template>
```

### Pattern 4: Event Filtering and Validation

```vue
<script setup>
import { ref } from 'vue';

const handleSelect = (args) => {
  // Filter by item type
  if (args.item.separator) {
    // Ignore separators
    return;
  }
  
  // Validate before processing
  if (!args.item.id || !args.item.text) {
    console.warn('Invalid menu item');
    return;
  }
  
  // Process valid item
  processMenuItem(args.item);
};

const processMenuItem = (item) => {
  console.log('Processing:', item.text);
};
</script>

<template>
  <ejs-menu
    :items="items"
    @select="handleSelect"
  ></ejs-menu>
</template>
```

### Pattern 5: Multiple Event Handlers

```vue
<script setup>
import { ref } from 'vue';

const eventLog = ref([]);

const logEvent = (type, detail) => {
  eventLog.value.push({ type, detail, timestamp: Date.now() });
};

const handlers = {
  select: (args) => {
    logEvent('SELECT', args.item.text);
    performAction(args.item);
  },
  
  beforeOpen: (args) => {
    logEvent('BEFORE_OPEN', args.item.text);
    if (shouldBlock(args.item)) {
      args.cancel = true;
    }
  },
  
  onOpen: (args) => {
    logEvent('OPEN', args.item.text);
    focusFirstItem(args.element);
  },
  
  beforeClose: (args) => {
    logEvent('BEFORE_CLOSE', args.item.text);
  },
  
  onClose: (args) => {
    logEvent('CLOSE', args.item.text);
    cleanup();
  }
};

const performAction = (item) => { /* ... */ };
const shouldBlock = (item) => { /* ... */ };
const focusFirstItem = (element) => { /* ... */ };
const cleanup = () => { /* ... */ };
</script>

<template>
  <ejs-menu
    :items="items"
    @select="handlers.select"
    @beforeOpen="handlers.beforeOpen"
    @onOpen="handlers.onOpen"
    @beforeClose="handlers.beforeClose"
    @onClose="handlers.onClose"
  ></ejs-menu>
</template>
```

### Pattern 6: Async Event Handlers

```vue
<script setup>
import { ref } from 'vue';

const isLoading = ref(false);

const handleBeforeOpen = async (args) => {
  // Load submenu items dynamically
  if (!args.item.items || args.item.items.length === 0) {
    isLoading.value = true;
    
    try {
      const items = await fetchMenuItems(args.item.id);
      args.item.items = items;
    } catch (error) {
      console.error('Failed to load menu items:', error);
      args.cancel = true;
    } finally {
      isLoading.value = false;
    }
  }
};

const fetchMenuItems = async (itemId) => {
  const response = await fetch(`/api/menu/${itemId}`);
  return response.json();
};
</script>

<template>
  <div>
    <p v-if="isLoading">Loading menu items...</p>
    <ejs-menu
      :items="items"
      @beforeOpen="handleBeforeOpen"
    ></ejs-menu>
  </div>
</template>
```

## Common Event Argument Scenarios

### Scenario 1: Prevent Specific Menu from Opening

```vue
<script setup>
const restrictedMenus = ['Admin', 'Settings'];
const userRole = 'user';

const handleBeforeOpen = (args) => {
  const itemText = args.item.text;
  
  if (restrictedMenus.includes(itemText) && userRole !== 'admin') {
    args.cancel = true;
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

### Scenario 2: Track Menu Usage

```vue
<script setup>
import { ref } from 'vue';

const menuStats = ref({
  opened: 0,
  closed: 0,
  selected: 0,
  lastItem: null
});

const handleSelect = (args) => {
  menuStats.value.selected++;
  menuStats.value.lastItem = args.item.text;
};

const handleOpen = () => {
  menuStats.value.opened++;
};

const handleClose = () => {
  menuStats.value.closed++;
};
</script>

<template>
  <div>
    <p>Usage: {{ menuStats.selected }} selections, {{ menuStats.opened }} opens</p>
    <ejs-menu
      :items="items"
      @select="handleSelect"
      @onOpen="handleOpen"
      @onClose="handleClose"
    ></ejs-menu>
  </div>
</template>
```

## Related Topics

- [Events and Callbacks](./events-and-callbacks.md) - Event handler implementation
- [Methods and API](./methods-api.md) - Component methods
- [Properties and Configuration](./properties-and-configuration.md) - Component properties
