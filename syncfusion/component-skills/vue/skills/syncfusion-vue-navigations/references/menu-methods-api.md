# Methods and API Reference

## Table of Contents
1. [Instance Methods](#instance-methods)
2. [Item Management](#item-management)
3. [State Modification](#state-modification)
4. [State Queries](#state-queries)
5. [Menu Control](#menu-control)
6. [Lifecycle](#lifecycle)

## Instance Methods

### Accessing Methods with Template Refs

In Vue 3, use template refs to access component methods. Unlike React's `useRef()`, Vue uses the ref attribute and `$refs` object:

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const menuRef = ref(null);
const items = ref([...]);

onMounted(() => {
  // Access menu component instance
  const menuInstance = menuRef.value.ej2_instances[0];
  
  // Call methods on the instance
  menuInstance.open();
});
</script>

<template>
  <ejs-menu
    ref="menuRef"
    :items="items"
  ></ejs-menu>
</template>
```

## Item Management

### insertBefore()
**Signature:** `insertBefore(items: MenuItemModel[], target?: string | number): void`

Inserts menu items before the specified target item.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File' },
  { text: 'Edit' },
  { text: 'View' }
]);

const addItemBefore = () => {
  const newItem = { text: 'Insert' };
  const menuInstance = menuRef.value.ej2_instances[0];
  
  // Insert before the 'Edit' item
  menuInstance.insertBefore([newItem], 'Edit');
};
</script>

<template>
  <div>
    <button @click="addItemBefore">Add Item</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

### insertAfter()
**Signature:** `insertAfter(items: MenuItemModel[], target?: string | number): void`

Inserts menu items after the specified target item.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File' },
  { text: 'Edit' },
  { text: 'View' }
]);

const addItemAfter = () => {
  const newItem = { text: 'Insert' };
  const menuInstance = menuRef.value.ej2_instances[0];
  
  // Insert after the 'Edit' item
  menuInstance.insertAfter([newItem], 'Edit');
};
</script>

<template>
  <div>
    <button @click="addItemAfter">Add Item</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

### removeItems()
**Signature:** `removeItems(items: string[] | number[]): void`

Removes specified menu items from the menu.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file' },
  { text: 'Edit', id: 'edit' },
  { text: 'View', id: 'view' }
]);

const removeMenuItem = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  
  // Remove the 'Edit' item
  menuInstance.removeItems(['edit']);
};

const removeMultipleItems = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  
  // Remove multiple items
  menuInstance.removeItems(['edit', 'view']);
};
</script>

<template>
  <div>
    <button @click="removeMenuItem">Remove Edit</button>
    <button @click="removeMultipleItems">Remove Multiple</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

## State Modification

### enableItems()
**Signature:** `enableItems(items: string[] | number[], enable?: boolean): void`

Enables or disables specified menu items. Disabled items appear grayed out and are not clickable.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file', disabled: false },
  { text: 'Edit', id: 'edit', disabled: false },
  { text: 'View', id: 'view', disabled: false }
]);

const disableEdit = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.enableItems(['edit'], false);
};

const enableEdit = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.enableItems(['edit'], true);
};
</script>

<template>
  <div>
    <button @click="disableEdit">Disable Edit</button>
    <button @click="enableEdit">Enable Edit</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

### hideItems()
**Signature:** `hideItems(items: string[] | number[], hide?: boolean): void`

Hides or shows specified menu items from display.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file' },
  { text: 'Edit', id: 'edit' },
  { text: 'View', id: 'view' }
]);

const hideAdvanced = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.hideItems(['edit', 'view'], true);
};

const showAll = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.hideItems(['edit', 'view'], false);
};
</script>

<template>
  <div>
    <button @click="hideAdvanced">Hide Advanced</button>
    <button @click="showAll">Show All</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

### showItems()
**Signature:** `showItems(items: string[] | number[]): void`

Shows previously hidden menu items.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file' },
  { text: 'Edit', id: 'edit' },
  { text: 'Premium Features', id: 'premium' }
]);

const showPremiumFeatures = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.showItems(['premium']);
};
</script>

<template>
  <div>
    <button @click="showPremiumFeatures">Show Premium</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

### setItem()
**Signature:** `setItem(item: MenuItemModel, id: string | number): void`

Updates a menu item with new properties.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file' },
  { text: 'Edit', id: 'edit' }
]);

const updateFileMenu = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  const updatedItem = {
    text: 'File Operations',
    iconCss: 'e-icons e-folder'
  };
  
  menuInstance.setItem(updatedItem, 'file');
};
</script>

<template>
  <div>
    <button @click="updateFileMenu">Update File Menu</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

## State Queries

### getItemIndex()
**Signature:** `getItemIndex(item: string | number): number`

Returns the index position of a menu item.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file' },
  { text: 'Edit', id: 'edit' },
  { text: 'View', id: 'view' }
]);

const logItemIndex = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  const editIndex = menuInstance.getItemIndex('edit');
  
  console.log('Edit item is at index:', editIndex); // Output: 1
};
</script>

<template>
  <div>
    <button @click="logItemIndex">Log Item Index</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

## Menu Control

### open()
**Signature:** `open(target?: Element | string): void`

Opens the hamburger menu or specified sub-menu. Commonly used in hamburger/mobile mode.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([...]);

const openMenu = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.open();
};

const openFileSubmenu = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  
  // Open specific sub-menu by targeting element or ID
  const fileItem = document.getElementById('file-menu');
  menuInstance.open(fileItem);
};
</script>

<template>
  <div>
    <button @click="openMenu">Open Menu</button>
    <button @click="openFileSubmenu">Open File Submenu</button>
    <ejs-menu
      ref="menuRef"
      :items="items"
      :hamburgerMode="true"
    ></ejs-menu>
  </div>
</template>
```

### close()
**Signature:** `close(target?: Element | string): void`

Closes the hamburger menu or specified open sub-menu.

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([...]);

const closeMenu = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.close();
};

const closeAllSubmenus = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  
  // Close all open sub-menus
  menuInstance.close();
};
</script>

<template>
  <div>
    <button @click="closeMenu">Close Menu</button>
    <button @click="closeAllSubmenus">Close All</button>
    <ejs-menu
      ref="menuRef"
      :items="items"
      :hamburgerMode="true"
    ></ejs-menu>
  </div>
</template>
```

## Lifecycle

### destroy()
**Signature:** `destroy(): void`

Destroys the menu component instance and removes it from the DOM. Use this for cleanup.

```vue
<script setup>
import { ref, onBeforeUnmount } from 'vue';

const menuRef = ref(null);
const items = ref([...]);

const destroyMenu = () => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.destroy();
};

// Automatic cleanup on component unmount
onBeforeUnmount(() => {
  destroyMenu();
});
</script>

<template>
  <div>
    <button @click="destroyMenu">Destroy Menu</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

## Complete Methods Example

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const menuRef = ref(null);
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
      { text: 'Paste', id: 'paste' }
    ]
  }
]);

const menuMethods = {
  insertNew() {
    const instance = menuRef.value.ej2_instances[0];
    instance.insertAfter([{ text: 'Print', id: 'print' }], 'save');
  },
  
  removeItem() {
    const instance = menuRef.value.ej2_instances[0];
    instance.removeItems(['cut']);
  },
  
  toggleDisable() {
    const instance = menuRef.value.ej2_instances[0];
    const index = instance.getItemIndex('edit');
    instance.enableItems(['edit'], index !== -1);
  },
  
  hideAdvanced() {
    const instance = menuRef.value.ej2_instances[0];
    instance.hideItems(['paste']);
  },
  
  updateItem() {
    const instance = menuRef.value.ej2_instances[0];
    instance.setItem({ text: 'File Manager' }, 'file');
  },
  
  openMenu() {
    const instance = menuRef.value.ej2_instances[0];
    instance.open();
  },
  
  closeMenu() {
    const instance = menuRef.value.ej2_instances[0];
    instance.close();
  }
};
</script>

<template>
  <div class="menu-demo">
    <div class="button-group">
      <button @click="menuMethods.insertNew">Insert Item</button>
      <button @click="menuMethods.removeItem">Remove Item</button>
      <button @click="menuMethods.toggleDisable">Toggle Disable</button>
      <button @click="menuMethods.hideAdvanced">Hide Advanced</button>
      <button @click="menuMethods.updateItem">Update Item</button>
      <button @click="menuMethods.openMenu">Open</button>
      <button @click="menuMethods.closeMenu">Close</button>
    </div>
    
    <ejs-menu
      ref="menuRef"
      :items="items"
      class="e-menu-demo"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.menu-demo {
  padding: 20px;
}

.button-group {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
```

## Method Access Pattern Summary

| Pattern | Usage |
|---------|-------|
| `ref="menuRef"` | Template reference to menu |
| `menuRef.value.ej2_instances[0]` | Get component instance |
| `instance.insertBefore(...)` | Insert items |
| `instance.removeItems(...)` | Remove items |
| `instance.enableItems(...)` | Toggle enable/disable |
| `instance.hideItems(...)` | Toggle visibility |
| `instance.open()` | Open menu/submenu |
| `instance.close()` | Close menu/submenu |

## Related Topics

- [Properties and Configuration](./properties-and-configuration.md) - Component properties
- [Events and Callbacks](./events-and-callbacks.md) - Event handling
- [State Queries Reference](./event-arguments-reference.md) - Event arguments
