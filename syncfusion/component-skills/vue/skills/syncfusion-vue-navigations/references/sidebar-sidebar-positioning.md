# Sidebar Positioning & Behavior

## Table of Contents
- [Sidebar Types](#sidebar-types)
- [Position (Left/Right)](#position-leftright)
- [Width Configuration](#width-configuration)
- [Dock Mode](#dock-mode)
- [Multiple Sidebars](#multiple-sidebars)
- [Responsive Auto Mode](#responsive-auto-mode)

---

## Sidebar Types

The `type` property controls how the sidebar interacts with main content.

### Type: Over (Floating)

**Behavior:** Sidebar floats above the main content without pushing or shifting it.

**Best For:**
- Mobile drawer menus
- Modal-like sidebars
- Floating panels

**Example:**
```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

const isOpen = ref(false);
</script>

<template>
  <div class="app">
    <ejs-button @click="isOpen = !isOpen">
      ☰ Menu
    </ejs-button>

    <ejs-sidebar
      type="Over"
      width="280px"
      :isOpen="isOpen"
      @change="(args) => isOpen = args.element.classList.contains('e-open')"
      :showBackdrop="true"
      :closeOnDocumentClick="true"
    >
      <h3>Over Type Sidebar</h3>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </ejs-sidebar>

    <div class="content">
      <h1>Main Content Area</h1>
      <p>Content remains in same position when sidebar opens.</p>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
```

### Type: Push (Content Shift)

**Behavior:** Sidebar pushes main content aside when open. Content width reduces to accommodate sidebar.

**Best For:**
- Desktop navigation layouts
- Persistent sidebars
- Dashboard layouts

**Example:**
```vue
<script setup>
import { ref } from 'vue';

const isOpen = ref(true);
</script>

<template>
  <div class="dashboard">
    <ejs-sidebar
      type="Push"
      width="250px"
      position="Left"
      :isOpen="isOpen"
      :animate="true"
    >
      <h3>Push Type Sidebar</h3>
      <ul>
        <li><a href="#profile">Profile</a></li>
        <li><a href="#settings">Settings</a></li>
        <li><a href="#logout">Logout</a></li>
      </ul>
    </ejs-sidebar>

    <div class="main-content">
      <h1>Dashboard</h1>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
}

.main-content {
  flex: 1;
}
</style>
```

### Type: Slide (Translate)

**Behavior:** Sidebar slides in without pushing content. Main content stays full-width but may be covered by sidebar.

**Best For:**
- Side panels
- Secondary navigation
- Complementary content areas

**Example:**
```vue
<template>
  <ejs-sidebar
    type="Slide"
    width="300px"
    position="Right"
  >
    <h3>Slide Type Sidebar</h3>
    <p>Sidebar slides without affecting main content layout.</p>
  </ejs-sidebar>
</template>
```

### Type: Auto (Responsive)

**Behavior:** Automatically switches type based on screen size.
- Mobile (< 768px): Over type
- Desktop (≥ 768px): Push type

**Best For:**
- Responsive applications
- Mobile-first designs

**Example:**
```vue
<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <ejs-sidebar
    type="Auto"
    width="250px"
    :isOpen="isOpen"
    mediaQuery="(min-width: 768px)"
  >
    <h3>Auto Type Sidebar</h3>
    <p>Over on mobile, Push on desktop.</p>
  </ejs-sidebar>
</template>
```

**Type Comparison Table:**

| Type | Interaction | Content Movement | Use Case |
|------|-------------|------------------|----------|
| **Over** | Float above | None | Mobile menus |
| **Push** | Side-by-side | Shifts right | Desktop nav |
| **Slide** | Slide in | None/Covered | Panels |
| **Auto** | Responsive | Depends on screen | Responsive apps |

---

## Position (Left/Right)

The `position` property determines sidebar placement relative to content.

### Position: Left (Default)

**Standard for LTR languages (English, French, etc.)**

```vue
<template>
  <ejs-sidebar
    position="Left"
    width="250px"
    type="Push"
  >
    <!-- Left-aligned sidebar -->
  </ejs-sidebar>
</template>
```

### Position: Right

**Standard for RTL languages (Arabic, Hebrew) or alternative layouts**

```vue
<template>
  <ejs-sidebar
    position="Right"
    width="250px"
    type="Push"
    :enableRtl="true"
  >
    <!-- Right-aligned sidebar -->
  </ejs-sidebar>
</template>
```

### CSS Layout with Left/Right Positioning

```vue
<style scoped>
/* Left positioned sidebar */
.sidebar-left {
  display: flex;
  flex-direction: row;
}

.sidebar-left :deep(.e-sidebar) {
  order: 1;
}

.sidebar-left .main-content {
  order: 2;
  flex: 1;
}

/* Right positioned sidebar */
.sidebar-right {
  display: flex;
  flex-direction: row-reverse;
}

.sidebar-right :deep(.e-sidebar) {
  order: 2;
}

.sidebar-right .main-content {
  order: 1;
  flex: 1;
}
</style>
```

---

## Width Configuration

### Fixed Width in Pixels

```vue
<template>
  <ejs-sidebar width="250px" />
  <ejs-sidebar width="300px" />
</template>
```

### Responsive Width

```vue
<template>
  <ejs-sidebar width="25%" />
  <ejs-sidebar width="100%" />
</template>
```

### Dynamic Width Based on Content

```vue
<template>
  <ejs-sidebar width="auto">
    <!-- Width auto-adjusts to content -->
  </ejs-sidebar>
</template>
```

### Width Adjustment Example

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarWidth = ref('250px');

const handleResize = () => {
  if (window.innerWidth < 768) {
    sidebarWidth.value = '80vw';  // 80% of viewport on mobile
  } else {
    sidebarWidth.value = '250px';  // Fixed on desktop
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <ejs-sidebar :width="sidebarWidth">
    Responsive Sidebar
  </ejs-sidebar>
</template>
```

---

## Dock Mode

**Dock Mode** allows sidebars to collapse to a narrow "icon bar" while keeping functionality.

### Basic Dock Setup

```vue
<template>
  <ejs-sidebar
    :enableDock="true"
    dockSize="50px"
    width="250px"
    type="Push"
  >
    <!-- Sidebar content -->
  </ejs-sidebar>
</template>
```

### Icon-Based Dock Navigation

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const isDocked = ref(false);
const sidebarWidth = ref('250px');

const toggleDock = () => {
  isDocked.value = !isDocked.value;
  sidebarWidth.value = isDocked.value ? '50px' : '250px';
};
</script>

<template>
  <div class="dashboard">
    <button @click="toggleDock">
      {{ isDocked ? '→' : '←' }}
    </button>

    <ejs-sidebar
      :width="sidebarWidth"
      :enableDock="true"
      dockSize="50px"
      type="Push"
    >
      <div class="sidebar-nav">
        <a href="#home" title="Home">🏠</a>
        <a href="#products" title="Products">📦</a>
        <a href="#orders" title="Orders">📋</a>
        <a href="#settings" title="Settings">⚙️</a>
      </div>
    </ejs-sidebar>

    <div class="main-content">
      Main Content
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 20px;
}

.main-content {
  flex: 1;
}
</style>
```

---

## Multiple Sidebars

### Left and Right Sidebars

```vue
<script setup>
import { ref } from 'vue';

const leftOpen = ref(false);
const rightOpen = ref(false);
</script>

<template>
  <div class="layout">
    <!-- Left Sidebar -->
    <ejs-sidebar
      type="Push"
      position="Left"
      width="250px"
      :isOpen="leftOpen"
    >
      <h3>Left Navigation</h3>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
      </ul>
    </ejs-sidebar>

    <!-- Main Content -->
    <div class="main-content">
      <button @click="leftOpen = !leftOpen">← Toggle Left</button>
      <h1>Content</h1>
      <button @click="rightOpen = !rightOpen">Toggle Right →</button>
    </div>

    <!-- Right Sidebar -->
    <ejs-sidebar
      type="Push"
      position="Right"
      width="250px"
      :isOpen="rightOpen"
    >
      <h3>Right Panel</h3>
      <p>Additional information panel</p>
    </ejs-sidebar>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
```

---

## Responsive Auto Mode

### Auto Type with Media Query

```vue
<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <ejs-sidebar
    type="Auto"
    :isOpen="isOpen"
    width="250px"
    mediaQuery="(min-width: 768px)"
  >
    <!-- Automatically switches between Over (mobile) and Push (desktop) -->
  </ejs-sidebar>
</template>
```

### Custom Breakpoints

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sidebarType = ref('Over');
const isOpen = ref(false);

const handleResize = () => {
  const width = window.innerWidth;
  
  if (width < 576) {
    sidebarType.value = 'Over';
    isOpen.value = false;
  } else if (width < 992) {
    sidebarType.value = 'Over';
  } else {
    sidebarType.value = 'Push';
    isOpen.value = true;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <ejs-sidebar
    :type="sidebarType"
    :isOpen="isOpen"
    width="250px"
  >
    Responsive Sidebar
  </ejs-sidebar>
</template>
```

### Complete Responsive Example

```vue
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const windowWidth = ref(window.innerWidth);

const sidebarConfig = computed(() => {
  const width = windowWidth.value;
  
  return {
    type: width < 768 ? 'Over' : 'Push',
    width: width < 576 ? '90vw' : '250px',
    position: 'Left',
    showBackdrop: width < 768,
    closeOnDocumentClick: width < 768
  };
});

const isOpen = computed(() => windowWidth.value >= 768);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
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
      :type="sidebarConfig.type"
      :width="sidebarConfig.width"
      :position="sidebarConfig.position"
      :showBackdrop="sidebarConfig.showBackdrop"
      :closeOnDocumentClick="sidebarConfig.closeOnDocumentClick"
      :isOpen="isOpen"
    >
      Responsive Sidebar
    </ejs-sidebar>

    <div class="main-content">
      <p>Screen width: {{ windowWidth }}px</p>
      <p>Sidebar type: {{ sidebarConfig.type }}</p>
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
  padding: 20px;
}
</style>
```
