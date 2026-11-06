# Events Reference

## Table of Contents
- [Overview](#overview)
- [change Event](#change-event)
- [open Event](#open-event)
- [close Event](#close-event)
- [created Event](#created-event)
- [destroyed Event](#destroyed-event)
- [Event Patterns](#event-patterns)

---

## Overview

The Sidebar component provides 5 events for lifecycle and state tracking. Events can be preventable (open, close) or notification-only (change, created, destroyed). Events are bound using Vue's `@event` syntax.

---

## change Event

Triggers when the sidebar state changes (expand/collapse). This is the primary event for tracking state transitions. Note: For `Auto` type sidebars, state changes on viewport resize will not include user interaction flag.

**Event Type:** `(args: ChangeEventArgs) => void`

**Example 1: Track sidebar state changes**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarState = ref('closed');

const handleChange = (args) => {
  if (args.element.classList.contains('e-open')) {
    sidebarState.value = 'open';
    console.log('Sidebar opened');
  } else {
    sidebarState.value = 'closed';
    console.log('Sidebar closed');
  }
};
</script>

<template>
  <div>
    <div>Sidebar is: {{ sidebarState }}</div>
    <ejs-sidebar
      @change="handleChange"
      type="Over"
      width="250px"
    >
      Content
    </ejs-sidebar>
  </div>
</template>
```

**Example 2: Differentiate user interaction from programmatic changes**
```vue
<script setup>
const handleChange = (args) => {
  if (args.isInteracted) {
    console.log('User manually toggled sidebar');
  } else {
    console.log('Sidebar state changed programmatically');
  }
};
</script>

<template>
  <ejs-sidebar @change="handleChange" />
</template>
```

**Example 3: Log event details**
```vue
<script setup>
const handleChange = (args) => {
  console.log(`Event: ${args.name}`);
  console.log(`Is User Interaction: ${args.isInteracted}`);
  console.log(`Element:`, args.element);
};
</script>

<template>
  <ejs-sidebar @change="handleChange" />
</template>
```

---

## open Event

Triggers when the sidebar is about to open. You can prevent the opening by setting `args.cancel = true`.

**Event Type:** `(args: EventArgs) => void`

**Example 1: Allow conditional opening**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const isAuthorized = ref(true);

const handleOpen = (args) => {
  if (!isAuthorized.value) {
    args.cancel = true;  // Prevent opening
    alert('Not authorized to open sidebar');
  } else {
    console.log('Opening sidebar...');
  }
};
</script>

<template>
  <ejs-sidebar
    @open="handleOpen"
    type="Over"
  >
    Sidebar Content
  </ejs-sidebar>
</template>
```

**Example 2: Access event details**
```vue
<script setup>
const handleOpen = (args) => {
  console.log('Open triggered by:', args.event);
  console.log('User interaction:', args.isInteracted);
  console.log('Element:', args.element);
};
</script>

<template>
  <ejs-sidebar @open="handleOpen" />
</template>
```

**Example 3: Cancel based on external state**
```vue
<script setup>
import { ref } from 'vue';

const userPreferences = ref({
  sidebarDisabled: false
});

const handleOpen = (args) => {
  if (userPreferences.value.sidebarDisabled) {
    args.cancel = true;
    console.log('Sidebar is disabled');
  }
};
</script>

<template>
  <ejs-sidebar @open="handleOpen" />
</template>
```

---

## close Event

Triggers when the sidebar is about to close. You can prevent the closing by setting `args.cancel = true`.

**Event Type:** `(args: EventArgs) => void`

**Example 1: Confirm before closing**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const hasUnsavedChanges = ref(false);

const handleClose = (args) => {
  if (hasUnsavedChanges.value) {
    const proceed = window.confirm(
      'You have unsaved changes. Close anyway?'
    );
    if (!proceed) {
      args.cancel = true;  // Prevent closing
    }
  }
};
</script>

<template>
  <ejs-sidebar
    @close="handleClose"
    type="Over"
  >
    Sidebar Content
  </ejs-sidebar>
</template>
```

**Example 2: Track close events**
```vue
<script setup>
const handleClose = (args) => {
  console.log('Closing sidebar...');
  console.log('User triggered:', args.isInteracted);
  
  if (args.isInteracted) {
    console.log('User clicked to close');
  } else {
    console.log('Close triggered programmatically');
  }
};
</script>

<template>
  <ejs-sidebar @close="handleClose" />
</template>
```

**Example 3: Save state before closing**
```vue
<script setup>
const handleClose = (args) => {
  // Save current sidebar state to localStorage
  localStorage.setItem('sidebarOpen', 'false');
  console.log('Sidebar state saved');
};
</script>

<template>
  <ejs-sidebar @close="handleClose" />
</template>
```

---

## created Event

Triggers after the sidebar component is initialized, rendered into the DOM, and ready to use. This is the ideal place to set up additional event listeners, initialize child components, or perform setup tasks.

**Event Type:** `() => void`

**Example 1: Initialize on component creation**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);

const handleCreated = () => {
  console.log('Sidebar created and initialized');
  console.log('Sidebar element:', sidebarRef.value?.element);
};
</script>

<template>
  <ejs-sidebar
    ref="sidebarRef"
    @created="handleCreated"
    type="Over"
  >
    Sidebar Content
  </ejs-sidebar>
</template>
```

**Example 2: Setup custom event listeners**
```vue
<script setup>
const handleCreated = () => {
  const sidebarElement = sidebarRef.value?.element;
  
  // Add custom keyboard shortcuts
  sidebarElement?.addEventListener('keydown', (e) => {
    if (e.key === 's') {
      // Custom action
      console.log('Custom keyboard shortcut triggered');
    }
  });

  console.log('Custom event listeners attached');
};
</script>

<template>
  <ejs-sidebar ref="sidebarRef" @created="handleCreated" />
</template>
```

**Example 3: Initialize related components**
```vue
<script setup>
const handleCreated = () => {
  console.log('Sidebar is ready');
  
  // Initialize child components
  initializeNavigationItems();
  loadUserPreferences();
};

const initializeNavigationItems = () => {
  console.log('Navigation items initialized');
};

const loadUserPreferences = () => {
  console.log('User preferences loaded');
};
</script>

<template>
  <ejs-sidebar @created="handleCreated" />
</template>
```

---

## destroyed Event

Triggers after the sidebar component is destroyed and removed from the DOM. Useful for cleanup tasks, removing event listeners, or triggering related actions.

**Event Type:** `() => void`

**Example 1: Cleanup on destruction**
```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);

const handleDestroyed = () => {
  console.log('Sidebar destroyed');
  // Perform cleanup
  console.log('Cleanup tasks executed');
};
</script>

<template>
  <ejs-sidebar
    ref="sidebarRef"
    @destroyed="handleDestroyed"
  />
</template>
```

**Example 2: Log component lifecycle**
```vue
<script setup>
const handleCreated = () => {
  console.log('Sidebar: Created at', new Date().toLocaleTimeString());
};

const handleDestroyed = () => {
  console.log('Sidebar: Destroyed at', new Date().toLocaleTimeString());
};
</script>

<template>
  <div>
    <ejs-sidebar
      @created="handleCreated"
      @destroyed="handleDestroyed"
    />
  </div>
</template>
```

**Example 3: Notify parent component**
```vue
<script setup>
import { emit } from 'vue';

const handleDestroyed = () => {
  // Notify parent that sidebar is destroyed
  emit('sidebar-destroyed');
};
</script>

<template>
  <ejs-sidebar @destroyed="handleDestroyed" />
</template>
```

---

## Event Patterns

### Pattern 1: Multiple Event Handlers

```vue
<script setup>
const handleOpen = (args) => {
  console.log('Opening');
};

const handleClose = (args) => {
  console.log('Closing');
};

const handleChange = (args) => {
  console.log('State changed');
};

const handleCreated = () => {
  console.log('Created');
};

const handleDestroyed = () => {
  console.log('Destroyed');
};
</script>

<template>
  <ejs-sidebar
    @open="handleOpen"
    @close="handleClose"
    @change="handleChange"
    @created="handleCreated"
    @destroyed="handleDestroyed"
  />
</template>
```

### Pattern 2: Event Delegation

```vue
<script setup>
const handleEvent = (eventName, args) => {
  console.log(`Event: ${eventName}`, args);
};

const handleSidebarOpen = (args) => {
  handleEvent('open', args);
};

const handleSidebarClose = (args) => {
  handleEvent('close', args);
};

const handleSidebarChange = (args) => {
  handleEvent('change', args);
};
</script>

<template>
  <ejs-sidebar
    @open="handleSidebarOpen"
    @close="handleSidebarClose"
    @change="handleSidebarChange"
  />
</template>
```

### Pattern 3: Event Logging

```vue
<script setup>
import { ref } from 'vue';

const eventLog = ref([]);

const logEvent = (eventName, details) => {
  eventLog.value.push({
    event: eventName,
    timestamp: new Date().toLocaleTimeString(),
    details
  });
};

const handleOpen = (args) => {
  logEvent('open', { isInteracted: args.isInteracted });
};

const handleClose = (args) => {
  logEvent('close', { isInteracted: args.isInteracted });
};

const handleChange = (args) => {
  logEvent('change', { isOpen: args.element.classList.contains('e-open') });
};
</script>

<template>
  <div>
    <ejs-sidebar
      @open="handleOpen"
      @close="handleClose"
      @change="handleChange"
    />
    
    <div class="event-log">
      <h3>Event Log:</h3>
      <ul>
        <li v-for="(log, i) in eventLog" :key="i">
          {{ log.timestamp }} - {{ log.event }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

### Pattern 4: State Management with Events

```vue
<script setup>
import { ref } from 'vue';

const state = ref({
  isOpen: false,
  eventCount: 0,
  lastEvent: null,
  userInteractions: 0,
  programmaticChanges: 0
});

const handleChange = (args) => {
  state.value.isOpen = args.element.classList.contains('e-open');
  state.value.eventCount++;
  state.value.lastEvent = 'change';
  
  if (args.isInteracted) {
    state.value.userInteractions++;
  } else {
    state.value.programmaticChanges++;
  }
};

const handleOpen = () => {
  state.value.lastEvent = 'open';
};

const handleClose = () => {
  state.value.lastEvent = 'close';
};
</script>

<template>
  <div>
    <ejs-sidebar
      @open="handleOpen"
      @close="handleClose"
      @change="handleChange"
    />
    
    <div class="state-display">
      <p>Is Open: {{ state.isOpen }}</p>
      <p>Total Events: {{ state.eventCount }}</p>
      <p>User Interactions: {{ state.userInteractions }}</p>
      <p>Programmatic Changes: {{ state.programmaticChanges }}</p>
      <p>Last Event: {{ state.lastEvent }}</p>
    </div>
  </div>
</template>
```

### Pattern 5: Preventing Default Actions

```vue
<script setup>
import { ref } from 'vue';

const allowClose = ref(true);

const handleOpen = (args) => {
  // Example: Prevent opening on certain conditions
  if (!allowClose.value) {
    args.cancel = true;
    console.log('Opening prevented');
  }
};

const handleClose = (args) => {
  // Example: Require confirmation before closing
  if (!confirm('Really close the sidebar?')) {
    args.cancel = true;
  }
};
</script>

<template>
  <ejs-sidebar
    @open="handleOpen"
    @close="handleClose"
  />
</template>
```

### Pattern 6: Composite Event Handling

```vue
<script setup>
const handleStateChange = (args) => {
  // Single handler for multiple related events
  const isOpen = args.element.classList.contains('e-open');
  const eventType = args.name || 'change';
  
  console.log(`Sidebar is now ${isOpen ? 'open' : 'closed'}`);
  console.log(`Event: ${eventType}`);
  
  // Trigger side effects
  if (isOpen) {
    onSidebarOpen();
  } else {
    onSidebarClose();
  }
};

const onSidebarOpen = () => {
  console.log('Execute open actions');
};

const onSidebarClose = () => {
  console.log('Execute close actions');
};
</script>

<template>
  <ejs-sidebar
    @change="handleStateChange"
    @open="handleStateChange"
    @close="handleStateChange"
  />
</template>
```
