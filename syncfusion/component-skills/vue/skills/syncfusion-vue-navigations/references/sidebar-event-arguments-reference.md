# Event Arguments Reference

## Table of Contents
- [Overview](#overview)
- [ChangeEventArgs](#changeeventargs)
- [EventArgs](#eventargs)
- [SidebarModel](#sidebarmodel)

---

## Overview

This reference documents the argument objects passed to Sidebar event handlers. Understanding these objects is essential for implementing proper event handling in Vue 3 components.

---

## ChangeEventArgs

Passed to the `change` event handler. Represents state change notification with user interaction tracking.

**Type Definition:**
```typescript
interface ChangeEventArgs {
  element: HTMLElement      // The Sidebar DOM element
  name: string             // Event name string ('change')
  cancel?: boolean         // Set to true to prevent the state change
  isInteracted: boolean    // True if state changed by user interaction
                           // False if changed programmatically
}
```

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | Reference to the Sidebar DOM element |
| `name` | `string` | The name of the event ('change') |
| `cancel` | `boolean` (optional) | Set to `true` to prevent the state change |
| `isInteracted` | `boolean` | Indicates whether the state change was caused by user interaction (click, gesture, key) vs programmatic methods (show/hide/toggle) |

**Usage Examples:**

**Example 1: Check interaction type**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const changeLog = ref([]);

const handleChange = (args) => {
  if (args.isInteracted) {
    console.log('User manually changed sidebar state');
    changeLog.value.push('User action');
  } else {
    console.log('State changed by program (show/hide/toggle methods)');
    changeLog.value.push('Programmatic change');
  }
};
</script>

<template>
  <div>
    <ul>
      <li v-for="(log, i) in changeLog" :key="i">{{ log }}</li>
    </ul>
    <ejs-sidebar @change="handleChange" />
  </div>
</template>
```

**Example 2: Access element properties**
```vue
<script setup>
const handleChange = (args) => {
  const isOpen = args.element.classList.contains('e-open');
  const isAnimating = args.element.classList.contains('e-animate');
  console.log('Open:', isOpen, 'Animating:', isAnimating);
};
</script>

<template>
  <ejs-sidebar @change="handleChange" />
</template>
```

**Example 3: Cancel state change (edge case)**
```vue
<script setup>
import { ref } from 'vue';

const restrictedMode = ref(false);

const handleChange = (args) => {
  // Rarely used, but example for reference
  if (restrictedMode.value && !args.isInteracted) {
    args.cancel = true;
    console.log('State change cancelled in restricted mode');
  }
};
</script>

<template>
  <ejs-sidebar @change="handleChange" />
</template>
```

---

## EventArgs

Passed to `open`, `close`, `created`, and `destroyed` event handlers. Provides detailed event information including the triggering event and sidebar model.

**Type Definition:**
```typescript
interface EventArgs {
  cancel?: boolean              // Set to true to prevent the action (open/close)
  element: HTMLElement          // The Sidebar DOM element
  event?: MouseEvent | Event    // Original DOM event that triggered the action
  isInteracted?: boolean        // True if triggered by user interaction
  model: SidebarModel          // Current Sidebar configuration model
}
```

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` (optional) | For `open`/`close` events, set to `true` to prevent the action |
| `element` | `HTMLElement` | Reference to the Sidebar DOM element |
| `event` | `MouseEvent \| Event` (optional) | The original DOM event that triggered this event (e.g., click, keydown) |
| `isInteracted` | `boolean` (optional) | Indicates whether the event was triggered by user interaction |
| `model` | `SidebarModel` | The complete Sidebar configuration model at time of event |

**Usage Examples:**

**Example 1: Prevent opening based on conditions**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const userAuthorized = ref(false);

const handleOpen = (args) => {
  if (!userAuthorized.value) {
    args.cancel = true;
    console.log('Opening cancelled - authorization required');
  }
};
</script>

<template>
  <ejs-sidebar @open="handleOpen" type="Over">
    Sidebar Content
  </ejs-sidebar>
</template>
```

**Example 2: Access event source**
```vue
<script setup>
const handleClose = (args) => {
  if (args.event) {
    console.log('Close triggered by:', args.event.type);
    console.log('Target element:', args.event.target);
  }
};
</script>

<template>
  <ejs-sidebar @close="handleClose" />
</template>
```

**Example 3: Access sidebar model configuration**
```vue
<script setup>
const handleOpen = (args) => {
  // Check current configuration
  console.log('Current sidebar type:', args.model.type);
  console.log('Current position:', args.model.position);
  console.log('Current width:', args.model.width);
  console.log('Animations enabled:', args.model.animate);
};
</script>

<template>
  <ejs-sidebar @open="handleOpen" />
</template>
```

**Example 4: Distinguish event types**
```vue
<script setup>
const handleOpen = (args) => {
  if (args.isInteracted) {
    console.log('User triggered opening (click, gesture, key)');
  } else {
    console.log('Program triggered opening (show/toggle methods)');
  }
};
</script>

<template>
  <ejs-sidebar @open="handleOpen" />
</template>
```

**Example 5: Conditional actions on close**
```vue
<script setup>
const handleClose = (args) => {
  // Different logic for user vs programmatic close
  if (args.isInteracted) {
    // User-triggered close - save preference
    localStorage.setItem('userClosedSidebar', 'true');
  } else {
    // Programmatic close
    console.log('Sidebar closed by app logic');
  }
};
</script>

<template>
  <ejs-sidebar @close="handleClose" />
</template>
```

---

## SidebarModel

Reference object containing the complete Sidebar configuration at time of event.

**Type Definition:**
```typescript
interface SidebarModel {
  type: 'Over' | 'Push' | 'Slide' | 'Auto'
  position: 'Left' | 'Right'
  width: string | number
  target?: HTMLElement | string
  isOpen: boolean
  animate: boolean
  showBackdrop: boolean
  closeOnDocumentClick: boolean
  enableDock: boolean
  dockSize: string | number
  enableGestures: boolean
  enableRtl: boolean
  enablePersistence: boolean
  mediaQuery?: string | MediaQueryList
  zIndex: string | number
}
```

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'Over' \| 'Push' \| 'Slide' \| 'Auto'` | Display mode |
| `position` | `'Left' \| 'Right'` | Sidebar placement |
| `width` | `string \| number` | Current width setting |
| `target` | `HTMLElement \| string` (optional) | Container element |
| `isOpen` | `boolean` | Current open state |
| `animate` | `boolean` | Animation enabled |
| `showBackdrop` | `boolean` | Overlay visible |
| `closeOnDocumentClick` | `boolean` | Auto-close enabled |
| `enableDock` | `boolean` | Dock mode enabled |
| `dockSize` | `string \| number` | Dock width |
| `enableGestures` | `boolean` | Touch gestures enabled |
| `enableRtl` | `boolean` | RTL mode enabled |
| `enablePersistence` | `boolean` | Persistence enabled |
| `mediaQuery` | `string \| MediaQueryList` (optional) | Responsive query |
| `zIndex` | `string \| number` | CSS z-index |

**Usage Example:**

```vue
<script setup>
const handleEventWithModel = (args) => {
  const config = args.model;
  
  console.log('Sidebar Configuration:');
  console.log('- Type:', config.type);
  console.log('- Position:', config.position);
  console.log('- Width:', config.width);
  console.log('- Is Open:', config.isOpen);
  console.log('- Has Backdrop:', config.showBackdrop);
  console.log('- Gestures Enabled:', config.enableGestures);
  console.log('- RTL Mode:', config.enableRtl);
};
</script>

<template>
  <ejs-sidebar
    @open="handleEventWithModel"
    @close="handleEventWithModel"
  />
</template>
```

---

## Event Arguments in Vue 3

### Accessing Arguments in Template

```vue
<template>
  <ejs-sidebar
    @change="(args) => console.log('Event args:', args)"
    @open="(args) => handleOpen(args)"
    @close="(args) => handleClose(args)"
  />
</template>
```

### Type Hints in Composition API

```vue
<script setup>
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

interface ChangeEventArgs {
  element: HTMLElement;
  name: string;
  cancel?: boolean;
  isInteracted: boolean;
}

interface EventArgs {
  cancel?: boolean;
  element: HTMLElement;
  event?: MouseEvent | Event;
  isInteracted?: boolean;
  model: SidebarModel;
}

const handleChange = (args: ChangeEventArgs) => {
  console.log('Change event:', args);
};

const handleOpen = (args: EventArgs) => {
  console.log('Open event:', args);
};
</script>
```

### Destructuring Arguments

```vue
<script setup>
const handleChange = ({ element, isInteracted, name }) => {
  console.log(`${name}: User interaction = ${isInteracted}`);
};

const handleOpen = ({ cancel, event, model }) => {
  if (model.isOpen) {
    console.log('Already open');
  }
};
</script>

<template>
  <ejs-sidebar
    @change="handleChange"
    @open="handleOpen"
  />
</template>
```

### Using Reactive References with Event Args

```vue
<script setup>
import { ref } from 'vue';

const eventDetails = ref({
  lastEvent: null,
  isOpen: false,
  userInteraction: false,
  timestamp: null
});

const handleChange = (args) => {
  eventDetails.value = {
    lastEvent: args.name,
    isOpen: args.element.classList.contains('e-open'),
    userInteraction: args.isInteracted,
    timestamp: new Date().toLocaleTimeString()
  };
};
</script>

<template>
  <div>
    <ejs-sidebar @change="handleChange" />
    <div>
      <p>Last Event: {{ eventDetails.lastEvent }}</p>
      <p>Is Open: {{ eventDetails.isOpen }}</p>
      <p>User Action: {{ eventDetails.userInteraction }}</p>
      <p>Time: {{ eventDetails.timestamp }}</p>
    </div>
  </div>
</template>
```
