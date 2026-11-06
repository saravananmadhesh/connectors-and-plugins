# Opening & Closing Sidebar

## Table of Contents
- [Toggle Functionality](#toggle-functionality)
- [Programmatic Show/Hide](#programmatic-showhide)
- [Auto-Close Behavior](#auto-close-behavior)
- [Event Handling](#event-handling)
- [Animation & Transitions](#animation--transitions)
- [Complete Examples](#complete-examples)

---

## Toggle Functionality

### Basic Toggle with Button

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

const sidebarRef = ref(null);

const handleToggle = () => {
  sidebarRef.value?.toggle();
};
</script>

<template>
  <div>
    <ejs-button @click="handleToggle">
      ☰ Toggle Menu
    </ejs-button>

    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      width="250px"
    >
      <!-- Sidebar content -->
    </ejs-sidebar>
  </div>
</template>
```

### Toggle with State Management

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const isOpen = ref(false);

const handleChange = (args) => {
  const nowOpen = args.element.classList.contains('e-open');
  isOpen.value = nowOpen;
};
</script>

<template>
  <div>
    <button @click="isOpen = !isOpen">
      Toggle: {{ isOpen ? 'Close' : 'Open' }}
    </button>

    <ejs-sidebar
      :isOpen="isOpen"
      @change="handleChange"
      type="Over"
    >
      Content
    </ejs-sidebar>
  </div>
</template>
```

---

## Programmatic Show/Hide

### Show Method

Opens the sidebar programmatically.

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);

const openSidebar = () => {
  sidebarRef.value?.show();
};
</script>

<template>
  <div>
    <button @click="openSidebar">Open Sidebar</button>
    <ejs-sidebar ref="sidebarRef" type="Over" width="250px">
      Sidebar Content
    </ejs-sidebar>
  </div>
</template>
```

### Hide Method

Closes the sidebar programmatically.

```vue
<script setup>
const closeSidebar = () => {
  sidebarRef.value?.hide();
};
</script>

<template>
  <button @click="closeSidebar">Close Sidebar</button>
</template>
```

### Show/Hide Based on Conditions

```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);
const userRole = ref('guest');

const handleLogin = (role) => {
  userRole.value = role;
  // Show sidebar only for authenticated users
  if (role !== 'guest' && sidebarRef.value) {
    sidebarRef.value.show();
  }
};

const handleLogout = () => {
  userRole.value = 'guest';
  // Hide sidebar on logout
  if (sidebarRef.value) {
    sidebarRef.value.hide();
  }
};
</script>

<template>
  <div>
    <div v-if="userRole === 'guest'">
      <button @click="handleLogin('user')">Login</button>
    </div>
    <div v-else>
      <button @click="handleLogout">Logout</button>
    </div>

    <ejs-sidebar
      ref="sidebarRef"
      type="Push"
      width="250px"
    >
      <h3>Welcome, {{ userRole }}!</h3>
    </ejs-sidebar>
  </div>
</template>
```

---

## Auto-Close Behavior

### Close on Document Click

Automatically closes sidebar when user clicks on main content area.

```vue
<template>
  <ejs-sidebar
    type="Over"
    width="250px"
    :closeOnDocumentClick="true"
    :showBackdrop="true"
  >
    {/* Closes when backdrop/content clicked */}
  </ejs-sidebar>
</template>
```

**Note:** Works best with `showBackdrop={true}` for better UX.

### Close on Escape Key

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);

onMounted(() => {
  const handleEscape = (event) => {
    if (event.key === 'Escape' && sidebarRef.value) {
      sidebarRef.value.hide();
    }
  };

  document.addEventListener('keydown', handleEscape);
});
</script>

<template>
  <ejs-sidebar
    ref="sidebarRef"
    type="Over"
    width="250px"
  >
    Press ESC to close
  </ejs-sidebar>
</template>
```

### Close on Navigation Item Click

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);

const handleNavigation = (e) => {
  if (e.target.tagName === 'A') {
    // Close sidebar when any link is clicked
    sidebarRef.value?.hide();
  }
};
</script>

<template>
  <ejs-sidebar
    ref="sidebarRef"
    type="Over"
    width="250px"
  >
    <nav @click="handleNavigation">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </ejs-sidebar>
</template>
```

### Close After Delay

```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);

const openAndAutoClose = () => {
  if (sidebarRef.value) {
    sidebarRef.value.show();
    // Auto-close after 5 seconds
    setTimeout(() => {
      sidebarRef.value?.hide();
    }, 5000);
  }
};
</script>

<template>
  <div>
    <button @click="openAndAutoClose">Open (Auto-closes in 5s)</button>
    <ejs-sidebar ref="sidebarRef" type="Over" width="250px">
      This sidebar will auto-close
    </ejs-sidebar>
  </div>
</template>
```

---

## Event Handling

### Open Event Handler

```vue
<script setup>
const handleOpen = (args) => {
  console.log('Sidebar is opening');
  // Perform actions before sidebar opens
};
</script>

<template>
  <ejs-sidebar @open="handleOpen">
    Content
  </ejs-sidebar>
</template>
```

### Close Event Handler

```vue
<script setup>
const handleClose = (args) => {
  console.log('Sidebar is closing');
  // Perform actions before sidebar closes
};
</script>

<template>
  <ejs-sidebar @close="handleClose">
    Content
  </ejs-sidebar>
</template>
```

### Change Event Handler

```vue
<script setup>
const handleChange = (args) => {
  const isNowOpen = args.element.classList.contains('e-open');
  console.log('Sidebar is now', isNowOpen ? 'open' : 'closed');
};
</script>

<template>
  <ejs-sidebar @change="handleChange">
    Content
  </ejs-sidebar>
</template>
```

---

## Animation & Transitions

### Disable Animations

```vue
<template>
  <ejs-sidebar
    :animate="false"
    type="Over"
    width="250px"
  >
    No animations
  </ejs-sidebar>
</template>
```

### Custom Animation Duration with CSS

```vue
<template>
  <ejs-sidebar
    class="custom-animation"
    :animate="true"
    type="Over"
    width="250px"
  >
    Custom animation
  </ejs-sidebar>
</template>

<style scoped>
:deep(.custom-animation) {
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
```

---

## Complete Examples

### Example 1: Simple Drawer Menu

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

const isOpen = ref(false);
</script>

<template>
  <div class="container">
    <header>
      <ejs-button @click="isOpen = !isOpen">☰</ejs-button>
      <h1>My App</h1>
    </header>

    <div class="main">
      <ejs-sidebar
        type="Over"
        width="250px"
        :isOpen="isOpen"
        @change="(args) => isOpen = args.element.classList.contains('e-open')"
        :showBackdrop="true"
        :closeOnDocumentClick="true"
      >
        <nav>
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </ejs-sidebar>

      <div class="content">
        <h1>Welcome</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: #1976d2;
  color: white;
  padding: 10px 20px;
  display: flex;
  gap: 20px;
}

.main {
  flex: 1;
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
```

### Example 2: Dashboard with Persistent Sidebar

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const isOpen = ref(true);
</script>

<template>
  <div class="dashboard">
    <ejs-sidebar
      type="Push"
      width="250px"
      :isOpen="isOpen"
      position="Left"
    >
      <div class="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      <ul>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#analytics">Analytics</a></li>
        <li><a href="#reports">Reports</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </ejs-sidebar>

    <div class="dashboard-content">
      <header>
        <button @click="isOpen = !isOpen">☰ Menu</button>
        <h1>Dashboard</h1>
      </header>
      <main>
        <p>Dashboard content goes here</p>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.dashboard-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

header {
  background: #f5f5f5;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
}

main {
  flex: 1;
  padding: 20px;
}
</style>
```

### Example 3: Sidebar with Keyboard Shortcuts

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);

const handleKeyboard = (e) => {
  // Alt + M to toggle menu
  if (e.altKey && e.key === 'm') {
    e.preventDefault();
    sidebarRef.value?.toggle();
  }
  
  // Escape to close
  if (e.key === 'Escape') {
    sidebarRef.value?.hide();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboard);
});
</script>

<template>
  <div>
    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      width="280px"
    >
      <h3>Menu</h3>
      <p style="padding: 10px; font-size: 12px; color: #666;">
        Press Alt+M to toggle | Esc to close
      </p>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#services">Services</a></li>
      </ul>
    </ejs-sidebar>

    <div class="content">
      <h1>Content Area</h1>
      <p>Use Alt+M to toggle the sidebar</p>
    </div>
  </div>
</template>

<style scoped>
.content {
  padding: 20px;
}
</style>
```

### Example 4: Mobile-First Responsive Sidebar

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);
const isOpen = ref(false);
const isMobile = ref(window.innerWidth < 768);

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="app">
    <ejs-sidebar
      ref="sidebarRef"
      :type="isMobile ? 'Over' : 'Push'"
      width="250px"
      :isOpen="isMobile ? isOpen : true"
      :showBackdrop="isMobile"
      :closeOnDocumentClick="isMobile"
    >
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#orders">Orders</a>
        <a href="#settings">Settings</a>
      </nav>
    </ejs-sidebar>

    <div class="main-content">
      <header>
        <button v-if="isMobile" @click="isOpen = !isOpen">☰</button>
        <h1>App</h1>
      </header>
      <main>
        <p>Responsive sidebar example</p>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

header {
  background: #1976d2;
  color: white;
  padding: 15px 20px;
}

main {
  padding: 20px;
}
</style>
```
