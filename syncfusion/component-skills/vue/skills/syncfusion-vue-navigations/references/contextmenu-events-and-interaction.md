# Events and Interaction

## Table of Contents
- [Event Overview](#event-overview)
- [Select Event](#select-event)
- [Before Open Event](#before-open-event)
- [On Open Event](#on-open-event)
- [Before Close Event](#before-close-event)
- [On Close Event](#on-close-event)
- [Before Item Render Event](#before-item-render-event)
- [Created Event](#created-event)
- [Event Handling Patterns](#event-handling-patterns)

## Event Overview

The ContextMenu component provides 7 events for handling user interactions:

| Event | When Fired | Args Type |
|-------|-----------|-----------|
| `@select` | When menu item is clicked | MenuEventArgs |
| `@beforeOpen` | Before context menu opens | BeforeOpenCloseMenuEventArgs |
| `@onOpen` | After context menu opens | OpenCloseMenuEventArgs |
| `@beforeClose` | Before context menu closes | BeforeOpenCloseMenuEventArgs |
| `@onClose` | After context menu closes | OpenCloseMenuEventArgs |
| `@beforeItemRender` | Before each item renders | MenuEventArgs |
| `@created` | After component creation | Event |

## Select Event

Fires when a menu item is clicked.

### Basic Implementation

```vue
<script setup>
import { ref } from 'vue'

const selectedItem = ref('')

const items = ref([
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' },
  { text: 'Paste', id: 'paste' }
])

const handleSelect = (args) => {
  selectedItem.value = args.item.text
  console.log(`Selected: ${args.item.text}`)
}
</script>

<template>
  <div>
    <div v-if="selectedItem">Last selected: {{ selectedItem }}</div>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>
```

### MenuEventArgs Structure

```typescript
interface MenuEventArgs {
  element: HTMLElement        // DOM element of clicked item
  item: MenuItemModel         // Menu item data
  event: PointerEvent         // Original browser event
  isSubMenu: boolean          // Whether item has submenu
}
```

### Advanced Select Handling

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' },
  { text: 'Paste', id: 'paste' },
  { text: 'Settings', id: 'settings', items: [
    { text: 'Preferences' },
    { text: 'Options' }
  ]}
])

const recentActions = ref([])

const handleSelect = (args) => {
  // Don't process parent items with submenus
  if (args.isSubMenu) {
    return
  }

  // Log action
  const action = {
    item: args.item.text,
    timestamp: new Date(),
    x: args.event.clientX,
    y: args.event.clientY
  }

  recentActions.value.unshift(action)
  if (recentActions.value.length > 10) {
    recentActions.value.pop()
  }

  console.log(`Action: ${args.item.text} at (${args.event.clientX}, ${args.event.clientY})`)
}
</script>

<template>
  <div>
    <div>
      <h3>Recent Actions:</h3>
      <ul>
        <li v-for="(action, index) in recentActions" :key="index">
          {{ action.item }} at {{ action.timestamp.toLocaleTimeString() }}
        </li>
      </ul>
    </div>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>
```

## Before Open Event

Fires before the context menu opens, allowing you to prevent or modify opening behavior.

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' }
])

const allowOpen = ref(true)
const openCount = ref(0)

const handleBeforeOpen = (args) => {
  openCount.value++
  
  // Prevent opening on every third attempt
  if (openCount.value % 3 === 0) {
    args.cancel = true
    console.log('Menu open prevented')
    return
  }

  // Get target element
  const target = args.element
  console.log(`Opening menu at: (${args.event.clientX}, ${args.event.clientY})`)
}
</script>

<template>
  <div>
    <p>Menu attempts: {{ openCount }}</p>
    <div id="target">Right click to open menu (every 3rd will be blocked)</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      @beforeOpen="handleBeforeOpen"
    ></ejs-contextmenu>
  </div>
</template>
```

### BeforeOpenCloseMenuEventArgs Structure

```typescript
interface BeforeOpenCloseMenuEventArgs {
  element: HTMLElement        // Element that triggered menu
  event: PointerEvent         // Browser event
  cancel: boolean             // Set to true to prevent opening/closing
}
```

## On Open Event

Fires after the context menu successfully opens.

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'View', id: 'view' },
  { text: 'Edit', id: 'edit' }
])

const menuIsOpen = ref(false)
const openPositions = ref([])

const handleOpen = (args) => {
  menuIsOpen.value = true
  
  const position = {
    x: args.event.clientX,
    y: args.event.clientY,
    time: new Date()
  }
  
  openPositions.value.push(position)
  console.log(`Menu opened at: (${args.event.clientX}, ${args.event.clientY})`)
  
  // Apply animation
  const menu = args.element
  menu.style.animation = 'slideIn 0.3s ease-out'
}
</script>

<template>
  <div>
    <p v-if="menuIsOpen" class="open-indicator">Menu is open</p>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      @onOpen="handleOpen"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.open-indicator {
  color: green;
  font-weight: bold;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
```

### OpenCloseMenuEventArgs Structure

```typescript
interface OpenCloseMenuEventArgs {
  element: HTMLElement        // Menu element
  event: PointerEvent         // Browser event
}
```

## Before Close Event

Fires before the context menu closes.

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' }
])

const closeWarning = ref('')

const handleBeforeClose = (args) => {
  // Example: confirm before closing on specific conditions
  const shouldConfirm = false // Add your condition here
  
  if (shouldConfirm) {
    // You can't actually show a dialog here, but you can prevent close
    args.cancel = true
    closeWarning.value = 'Close prevented'
    setTimeout(() => {
      closeWarning.value = ''
    }, 2000)
    return
  }

  console.log('Menu closing...')
}
</script>

<template>
  <div>
    <div v-if="closeWarning" class="warning">{{ closeWarning }}</div>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      @beforeClose="handleBeforeClose"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.warning {
  color: orange;
  padding: 10px;
  background-color: #fffacd;
  border-radius: 4px;
}
</style>
```

## On Close Event

Fires after the context menu closes.

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Action 1', id: 'action1' },
  { text: 'Action 2', id: 'action2' }
])

const menuIsOpen = ref(false)
const lastClosedTime = ref(null)

const handleClose = (args) => {
  menuIsOpen.value = false
  lastClosedTime.value = new Date()
  
  console.log(`Menu closed at: ${lastClosedTime.value.toLocaleTimeString()}`)
  
  // Perform cleanup or state update
  document.body.style.backgroundColor = ''
}
</script>

<template>
  <div>
    <p v-if="!menuIsOpen && lastClosedTime" class="closed-indicator">
      Last closed: {{ lastClosedTime.toLocaleTimeString() }}
    </p>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      @onClose="handleClose"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.closed-indicator {
  color: gray;
  font-size: 12px;
}
</style>
```

## Before Item Render Event

Fires for each menu item before rendering, allowing customization.

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Enable', id: 'enable' },
  { text: 'Disable', id: 'disable' },
  { text: 'Delete', id: 'delete' },
  { text: 'Archive', id: 'archive' }
])

const userRole = ref('viewer')

const handleBeforeItemRender = (args) => {
  // Disable items based on user role
  if (userRole.value === 'viewer') {
    if (['delete', 'disable'].includes(args.item.id)) {
      args.item.disabled = true
    }
  }

  // Color code by action type
  if (args.item.id === 'delete') {
    args.element.style.color = 'red'
  } else if (args.item.id === 'archive') {
    args.element.style.color = 'orange'
  }

  console.log(`Rendering item: ${args.item.text}`)
}
</script>

<template>
  <div>
    <div>
      <label>User Role: </label>
      <select v-model="userRole">
        <option value="viewer">Viewer</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      @beforeItemRender="handleBeforeItemRender"
    ></ejs-contextmenu>
  </div>
</template>
```

## Created Event

Fires when the component is created and initialized.

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Item 1', id: 'item1' },
  { text: 'Item 2', id: 'item2' }
])

const contextMenuRef = ref(null)
const createdMessage = ref('')

const handleCreated = (args) => {
  const instance = contextMenuRef.value?.ej2_instances[0]
  createdMessage.value = 'ContextMenu component initialized'
  console.log('ContextMenu created:', instance)
  
  // Now you can programmatically interact with the menu
  setTimeout(() => {
    // Automatically open menu after a delay
    // instance?.open(100, 100)
  }, 1000)
}
</script>

<template>
  <div>
    <div v-if="createdMessage" class="success">{{ createdMessage }}</div>
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      ref="contextMenuRef"
      target="#target"
      :items="items"
      @created="handleCreated"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.success {
  color: green;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
```

## Event Handling Patterns

### Multiple Event Handlers

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' }
])

const eventLog = ref([])

const logEvent = (eventName, details) => {
  eventLog.value.unshift({
    event: eventName,
    details,
    time: new Date().toLocaleTimeString()
  })
  if (eventLog.value.length > 20) {
    eventLog.value.pop()
  }
}

const handleBeforeOpen = (args) => {
  logEvent('beforeOpen', `Position: (${args.event.clientX}, ${args.event.clientY})`)
}

const handleOpen = (args) => {
  logEvent('onOpen', 'Menu opened')
}

const handleSelect = (args) => {
  logEvent('select', `Item: ${args.item.text}`)
}

const handleClose = (args) => {
  logEvent('onClose', 'Menu closed')
}
</script>

<template>
  <div class="event-demo">
    <div class="event-log">
      <h3>Event Log</h3>
      <ul>
        <li v-for="(log, index) in eventLog" :key="index">
          <strong>{{ log.event }}:</strong> {{ log.details }}
          <span class="time">{{ log.time }}</span>
        </li>
      </ul>
    </div>
    
    <div id="target" class="target-area">Right click to open menu</div>
    
    <ejs-contextmenu
      target="#target"
      :items="items"
      @beforeOpen="handleBeforeOpen"
      @onOpen="handleOpen"
      @select="handleSelect"
      @onClose="handleClose"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.event-demo {
  display: flex;
  gap: 20px;
}

.event-log {
  flex: 1;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
}

.event-log ul {
  list-style: none;
  padding: 0;
}

.event-log li {
  padding: 8px;
  border-bottom: 1px solid #eee;
  font-size: 12px;
}

.time {
  float: right;
  color: #999;
}

.target-area {
  flex: 1;
  border: 2px dashed #999;
  padding: 40px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
```

### Conditional Event Handling

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' },
  { text: 'Share', id: 'share' }
])

const selectedElement = ref(null)
const confirmDelete = ref(false)

const handleSelect = (args) => {
  if (args.item.id === 'delete') {
    confirmDelete.value = true
    selectedElement.value = args.element
  } else {
    performAction(args.item.id)
  }
}

const performAction = (action) => {
  console.log(`Performing: ${action}`)
  confirmDelete.value = false
}

const confirmDeletion = () => {
  performAction('delete')
}
</script>

<template>
  <div>
    <div v-if="confirmDelete" class="confirmation-dialog">
      <p>Are you sure you want to delete?</p>
      <button @click="confirmDeletion">Yes, Delete</button>
      <button @click="confirmDelete = false">Cancel</button>
    </div>
    
    <div id="target">Right click to open menu</div>
    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.confirmation-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 1000;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-of-type {
  background-color: #f44336;
  color: white;
}

button:last-of-type {
  background-color: #2196f3;
  color: white;
}
</style>
```

## Best Practices

1. **Log events for debugging:** Use the event log pattern for complex interactions
2. **Prevent default behavior:** Use `args.cancel = true` when needed
3. **Validate before actions:** Check user permissions in event handlers
4. **Clean up on close:** Reset UI state in `@onClose` handler
5. **Use refs for instance access:** Get component instance from `@created` event
6. **Handle async operations:** Use promises in select handlers for API calls
