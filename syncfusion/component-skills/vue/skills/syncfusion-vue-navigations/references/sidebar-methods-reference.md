# Methods Reference

## Table of Contents
- [Overview](#overview)
- [show()](#show)
- [hide()](#hide)
- [toggle()](#toggle)
- [destroy()](#destroy)
- [Method Patterns](#method-patterns)

---

## Overview

The Sidebar component provides 4 public methods for programmatic control. All methods return `void`. Methods are accessed via template refs using `$refs` or `ref()` in the Composition API.

---

## show()

Displays the sidebar if currently closed. Triggers the `open` event. Optionally accepts an Event parameter that triggered the show action.

**Signature:**
```typescript
show(e?: Event): void
```

**Parameters:**
| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `e` | `Event` | Yes | The DOM event that triggered the show action (e.g., click, keydown) |

**Returns:** `void`

**Example 1: Basic show() without event**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);

const handleShow = () => {
  sidebarRef.value?.show();
};
</script>

<template>
  <div>
    <button @click="handleShow">Open Sidebar</button>
    <ejs-sidebar 
      ref="sidebarRef"
      type="Over"
      width="250px"
    >
      <div>Sidebar Content</div>
    </ejs-sidebar>
  </div>
</template>
```

**Example 2: show() with event parameter from click handler**
```vue
<script setup>
const handleShowWithEvent = (e) => {
  sidebarRef.value?.show(e);
};
</script>

<template>
  <button @click="handleShowWithEvent">
    Open Sidebar
  </button>
</template>
```

**Example 3: show() with keyboard event**
```vue
<script setup>
import { onMounted } from 'vue';

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    sidebarRef.value?.show(e);
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress);
});
</script>

<template>
  <input 
    type="button" 
    value="Show on Enter"
  />
</template>
```

---

## hide()

Hides the sidebar if currently open. Triggers the `close` event. Optionally accepts an Event parameter that triggered the hide action.

**Signature:**
```typescript
hide(e?: Event): void
```

**Parameters:**
| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `e` | `Event` | Yes | The DOM event that triggered the hide action |

**Returns:** `void`

**Example 1: Basic hide() without event**
```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);

const handleHide = () => {
  sidebarRef.value?.hide();
};
</script>

<template>
  <div>
    <button @click="handleHide">Close Sidebar</button>
    <ejs-sidebar ref="sidebarRef" type="Over" width="250px" />
  </div>
</template>
```

**Example 2: hide() with event from button click**
```vue
<script setup>
const handleHideWithEvent = (e) => {
  sidebarRef.value?.hide(e);
};
</script>

<template>
  <button @click="handleHideWithEvent">
    Close Sidebar
  </button>
</template>
```

**Example 3: hide() on escape key press**
```vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      sidebarRef.value?.hide(e);
    }
  };

  document.addEventListener('keydown', handleEscapeKey);
});
</script>
```

---

## toggle()

Toggles the sidebar between open and closed states. Automatically triggers appropriate `open` or `close` events.

**Signature:**
```typescript
toggle(): void
```

**Returns:** `void`

**Example 1: Basic toggle**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);

const handleToggle = () => {
  sidebarRef.value?.toggle();
};
</script>

<template>
  <div>
    <button class="e-btn e-primary" @click="handleToggle">
      ☰ Menu
    </button>
    <ejs-sidebar 
      ref="sidebarRef"
      type="Over"
      width="250px"
    >
      <div>Navigation Items</div>
    </ejs-sidebar>
  </div>
</template>
```

**Example 2: Toggle with state synchronization**
```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);
const isOpen = ref(false);

const handleToggle = () => {
  sidebarRef.value?.toggle();
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <button @click="handleToggle">
      {{ isOpen ? 'Close' : 'Open' }} Sidebar
    </button>
    <ejs-sidebar ref="sidebarRef" type="Over" />
  </div>
</template>
```

**Example 3: Toggle with hamburger menu**
```vue
<script setup>
const handleHamburgerClick = () => {
  sidebarRef.value?.toggle();
};
</script>

<template>
  <div class="header">
    <button class="hamburger" @click="handleHamburgerClick">
      ☰
    </button>
    <h1>App Title</h1>
  </div>
  
  <ejs-sidebar ref="sidebarRef" type="Over" width="250px">
    Navigation content
  </ejs-sidebar>
</template>
```

---

## destroy()

Removes the sidebar component from the DOM and detaches all event handlers, attributes, and classes. After calling `destroy()`, the component must be re-initialized to use again.

**Signature:**
```typescript
destroy(): void
```

**Returns:** `void`

**Example 1: Basic destroy**
```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);

const handleDestroy = () => {
  sidebarRef.value?.destroy();
};
</script>

<template>
  <div>
    <button @click="handleDestroy">
      Destroy Sidebar
    </button>
    <ejs-sidebar ref="sidebarRef" />
  </div>
</template>
```

**Example 2: Cleanup on component unmount**
```vue
<script setup>
import { onUnmounted } from 'vue';

onUnmounted(() => {
  // Cleanup: destroy sidebar when component unmounts
  sidebarRef.value?.destroy();
});
</script>

<template>
  <ejs-sidebar ref="sidebarRef" type="Over" />
</template>
```

**Example 3: Destroy and recreate pattern**
```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);
const destroyed = ref(false);

const handleDestroyAndRecreate = () => {
  if (!destroyed.value) {
    sidebarRef.value?.destroy();
    destroyed.value = true;
  } else {
    destroyed.value = false;
  }
};
</script>

<template>
  <div>
    <button @click="handleDestroyAndRecreate">
      {{ destroyed ? 'Recreate' : 'Destroy' }}
    </button>
    <ejs-sidebar v-if="!destroyed" ref="sidebarRef" type="Over" />
  </div>
</template>
```

---

## Method Patterns

### Pattern 1: Using Template Refs

```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);

const open = () => sidebarRef.value?.show();
const close = () => sidebarRef.value?.hide();
const toggle = () => sidebarRef.value?.toggle();
</script>

<template>
  <div>
    <button @click="open">Open</button>
    <button @click="close">Close</button>
    <button @click="toggle">Toggle</button>
    <ejs-sidebar ref="sidebarRef" />
  </div>
</template>
```

### Pattern 2: Chained Operations

```vue
<script setup>
const openAndAutoClose = () => {
  // Open sidebar
  sidebarRef.value?.show();
  
  // Auto-close after 3 seconds
  setTimeout(() => {
    sidebarRef.value?.hide();
  }, 3000);
};

const toggleMultipleTimes = () => {
  sidebarRef.value?.toggle();
  
  setTimeout(() => {
    sidebarRef.value?.toggle();
  }, 500);
};
</script>
```

### Pattern 3: Conditional Method Calls

```vue
<script setup>
import { ref } from 'vue';

const isAuthorized = ref(false);

const conditionalOpen = () => {
  if (isAuthorized.value) {
    sidebarRef.value?.show();
  } else {
    alert('Not authorized');
  }
};

const safeClose = () => {
  if (sidebarRef.value?.element) {
    sidebarRef.value.hide();
  }
};
</script>
```

### Pattern 4: Event-Based Method Triggering

```vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Open sidebar on component mount
  sidebarRef.value?.show();
  
  // Listen for external events
  window.addEventListener('custom-open-sidebar', () => {
    sidebarRef.value?.show();
  });
});
</script>
```

### Pattern 5: Methods in Event Handlers

```vue
<script setup>
const handleNavigationClick = (e) => {
  if (e.target.tagName === 'A') {
    // Close sidebar when a link is clicked
    sidebarRef.value?.hide();
  }
};

const handleBackdropClick = () => {
  // Custom backdrop handling
  sidebarRef.value?.hide();
};
</script>

<template>
  <ejs-sidebar
    ref="sidebarRef"
    type="Over"
    @click="handleNavigationClick"
  >
    Navigation content
  </ejs-sidebar>
</template>
```

### Pattern 6: Keyboard Shortcuts

```vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const handleKeyboard = (e) => {
    // Alt + M to toggle menu
    if (e.altKey && e.key === 'm') {
      sidebarRef.value?.toggle();
    }
    
    // Ctrl + O to open
    if (e.ctrlKey && e.key === 'o') {
      sidebarRef.value?.show();
    }
    
    // Ctrl + C to close
    if (e.ctrlKey && e.key === 'c') {
      sidebarRef.value?.hide();
    }
  };
  
  document.addEventListener('keydown', handleKeyboard);
});
</script>
```
