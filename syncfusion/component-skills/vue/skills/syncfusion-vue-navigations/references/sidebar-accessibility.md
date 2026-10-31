# Accessibility

## Table of Contents
- [WCAG 2.1 Compliance](#wcag-21-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)

---

## WCAG 2.1 Compliance

### Level AA Compliance

The Sidebar component is designed to meet WCAG 2.1 Level AA standards:

```vue
<script setup>
import { ref } from 'vue';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';

const sidebarRef = ref(null);
const isOpen = ref(false);

// Accessible toggle with proper semantics
const handleToggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="accessible-sidebar-demo">
    <!-- Proper button semantics for toggle -->
    <button
      @click="handleToggle"
      :aria-expanded="isOpen"
      aria-label="Toggle Navigation Menu"
      class="sidebar-toggle"
    >
      <span aria-hidden="true">☰</span>
      <span class="sr-only">Toggle Menu</span>
    </button>

    <!-- Accessible Sidebar -->
    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      width="250px"
      :isOpen="isOpen"
      @change="isOpen = $event.isOpen"
      role="navigation"
      aria-label="Main Navigation"
    >
      <nav>
        <a href="#home" class="nav-link">Home</a>
        <a href="#products" class="nav-link">Products</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>
    </ejs-sidebar>

    <main id="main-content" class="main-content">
      <h1>Main Content</h1>
      <p>Content goes here...</p>
    </main>
  </div>
</template>

<style scoped>
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sidebar-toggle {
  padding: 10px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 20px;
  border-radius: 4px;
  transition: background 0.2s;
}

.sidebar-toggle:hover,
.sidebar-toggle:focus {
  background: #e0e0e0;
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

.nav-link {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.nav-link:hover,
.nav-link:focus {
  background: #f5f5f5;
  outline: 2px solid #0066cc;
  outline-offset: -2px;
}
</style>
```

---

## Keyboard Navigation

### Tab Navigation

```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);
const menuItems = ref([
  { label: 'Dashboard', id: 'dashboard' },
  { label: 'Users', id: 'users' },
  { label: 'Reports', id: 'reports' },
  { label: 'Settings', id: 'settings' }
]);
const focusedItem = ref(0);

const handleKeyDown = (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    focusedItem.value = (focusedItem.value + 1) % menuItems.value.length;
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    focusedItem.value = (focusedItem.value - 1 + menuItems.value.length) % menuItems.value.length;
  }
};
</script>

<template>
  <ejs-sidebar
    ref="sidebarRef"
    type="Over"
    role="navigation"
    @keydown="handleKeyDown"
  >
    <nav>
      <a
        v-for="(item, index) in menuItems"
        :key="item.id"
        :href="`#${item.id}`"
        :tabindex="focusedItem === index ? 0 : -1"
        :class="{ focused: focusedItem === index }"
        class="keyboard-nav-item"
      >
        {{ item.label }}
      </a>
    </nav>
  </ejs-sidebar>
</template>

<style scoped>
.keyboard-nav-item {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
}

.keyboard-nav-item:focus {
  outline: 2px solid #0066cc;
  outline-offset: -2px;
  background: #f5f5f5;
}

.keyboard-nav-item.focused {
  background: #e3f2fd;
  color: #0066cc;
}
</style>
```

### Escape Key Close

```vue
<script setup>
import { ref, onMounted } from 'vue';

const sidebarRef = ref(null);
const isOpen = ref(false);

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false;
    // Return focus to toggle button
    document.querySelector('[aria-label="Toggle Menu"]')?.focus();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey);
});
</script>

<template>
  <div>
    <button
      aria-label="Toggle Menu"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      Menu
    </button>

    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      :isOpen="isOpen"
      @change="isOpen = $event.isOpen"
      role="navigation"
      aria-label="Main Navigation"
    >
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
      </nav>
    </ejs-sidebar>
  </div>
</template>
```

### Alt+M Keyboard Shortcut

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sidebarRef = ref(null);
const isOpen = ref(false);

const handleKeyboardShortcut = (event) => {
  // Alt + M to toggle menu
  if (event.altKey && event.key === 'm') {
    event.preventDefault();
    isOpen.value = !isOpen.value;
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcut);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcut);
});
</script>

<template>
  <div>
    <button
      aria-label="Toggle Menu (Alt+M)"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      Menu
    </button>

    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      :isOpen="isOpen"
      role="navigation"
    >
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
      </nav>
    </ejs-sidebar>
  </div>
</template>
```

---

## ARIA Attributes

### Role and Labels

```vue
<template>
  <ejs-sidebar
    type="Over"
    role="navigation"
    aria-label="Main Navigation Sidebar"
    aria-labelledby="sidebar-heading"
  >
    <h2 id="sidebar-heading">Navigation</h2>
    <nav aria-label="Menu Links">
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <a href="#contact">Contact</a>
    </nav>
  </ejs-sidebar>
</template>
```

### Live Regions

```vue
<script setup>
import { ref } from 'vue';

const statusMessage = ref('');
const isOpen = ref(false);

const handleToggle = () => {
  isOpen.value = !isOpen.value;
  statusMessage.value = isOpen.value ? 'Navigation menu opened' : 'Navigation menu closed';
};
</script>

<template>
  <div>
    <!-- Live region for announcements -->
    <div
      class="sr-only"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ statusMessage }}
    </div>

    <button
      @click="handleToggle"
      :aria-expanded="isOpen"
      aria-label="Toggle Navigation"
    >
      Menu
    </button>

    <ejs-sidebar
      type="Over"
      :isOpen="isOpen"
      role="navigation"
      aria-label="Main Navigation"
    >
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
      </nav>
    </ejs-sidebar>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

### Disabled State

```vue
<script setup>
import { ref } from 'vue';

const isDisabled = ref(false);
</script>

<template>
  <div>
    <button @click="isDisabled = !isDisabled">
      {{ isDisabled ? 'Enable' : 'Disable' }} Sidebar
    </button>

    <ejs-sidebar
      type="Over"
      :disabled="isDisabled"
      :aria-disabled="isDisabled"
      role="navigation"
    >
      <nav>
        <a href="#home" :aria-disabled="isDisabled">Home</a>
        <a href="#products" :aria-disabled="isDisabled">Products</a>
      </nav>
    </ejs-sidebar>
  </div>
</template>
```

---

## Screen Reader Support

### Semantic HTML

```vue
<template>
  <ejs-sidebar
    type="Over"
    role="navigation"
    aria-label="Primary Navigation"
  >
    <!-- Use semantic nav element -->
    <nav>
      <!-- Use semantic heading -->
      <h2 id="nav-heading">Menu</h2>

      <!-- Use semantic list for menu items -->
      <ul aria-labelledby="nav-heading">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#products">Products</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  </ejs-sidebar>
</template>

<style scoped>
nav {
  padding: 0;
}

nav h2 {
  margin: 0;
  padding: 15px 20px;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  border-bottom: 1px solid #f0f0f0;
}

nav a {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
}

nav a:hover,
nav a:focus {
  background: #f5f5f5;
  outline: 2px solid #0066cc;
  outline-offset: -2px;
}
</style>
```

### Icon Accessibility

```vue
<script setup>
import { ref } from 'vue';

const menuItems = ref([
  { label: 'Home', icon: '🏠', ariaLabel: 'Go to Home page' },
  { label: 'Products', icon: '📦', ariaLabel: 'View Products' },
  { label: 'Settings', icon: '⚙️', ariaLabel: 'Open Settings' }
]);
</script>

<template>
  <ejs-sidebar type="Over" role="navigation">
    <nav>
      <a
        v-for="item in menuItems"
        :key="item.label"
        :href="`#${item.label.toLowerCase()}`"
        :aria-label="item.ariaLabel"
      >
        <!-- Icons need aria-hidden -->
        <span aria-hidden="true">{{ item.icon }}</span>
        <!-- Visible text for screen readers -->
        <span class="label">{{ item.label }}</span>
      </a>
    </nav>
  </ejs-sidebar>
</template>

<style scoped>
nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  text-decoration: none;
  color: inherit;
}

.label {
  flex: 1;
}
</style>
```

---

## Focus Management

### Focus Trap

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sidebarRef = ref(null);
const isOpen = ref(false);

const focusTrap = (event) => {
  if (!isOpen.value) return;

  const sidebar = sidebarRef.value?.$el;
  if (!sidebar) return;

  const focusableElements = sidebar.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', focusTrap);
});

onUnmounted(() => {
  document.removeEventListener('keydown', focusTrap);
});
</script>

<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-label="Toggle Menu"
    >
      Menu
    </button>

    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      :isOpen="isOpen"
      role="navigation"
    >
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
      </nav>
    </ejs-sidebar>
  </div>
</template>
```

### Initial Focus

```vue
<script setup>
import { ref, watch, nextTick } from 'vue';

const sidebarRef = ref(null);
const isOpen = ref(false);

const handleToggle = () => {
  isOpen.value = !isOpen.value;
};

watch(
  () => isOpen.value,
  async (newVal) => {
    if (newVal) {
      // Move focus to sidebar when opened
      await nextTick();
      const firstLink = sidebarRef.value?.$el.querySelector('a');
      firstLink?.focus();
    }
  }
);
</script>

<template>
  <div>
    <button
      @click="handleToggle"
      :aria-expanded="isOpen"
      aria-label="Toggle Navigation Menu"
    >
      Menu
    </button>

    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      :isOpen="isOpen"
      role="navigation"
      aria-label="Navigation Menu"
    >
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
      </nav>
    </ejs-sidebar>
  </div>
</template>
```

### Restore Focus

```vue
<script setup>
import { ref } from 'vue';

const sidebarRef = ref(null);
const isOpen = ref(false);
let previouslyFocusedElement = null;

const handleSidebarClose = () => {
  if (isOpen.value) {
    isOpen.value = false;
    // Restore focus to the toggle button
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }
};

const handleToggle = () => {
  if (!isOpen.value) {
    previouslyFocusedElement = document.activeElement;
  }
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <button
      @click="handleToggle"
      :aria-expanded="isOpen"
      aria-label="Toggle Menu"
    >
      Menu
    </button>

    <ejs-sidebar
      ref="sidebarRef"
      type="Over"
      :isOpen="isOpen"
      @change="handleSidebarClose"
      role="navigation"
    >
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
      </nav>
    </ejs-sidebar>
  </div>
</template>
```

---

## High Contrast Mode

```vue
<script setup>
import { ref, onMounted } from 'vue';

const prefersHighContrast = ref(false);

const checkHighContrast = () => {
  prefersHighContrast.value = window.matchMedia('(prefers-contrast: more)').matches;
};

onMounted(() => {
  checkHighContrast();
  window.matchMedia('(prefers-contrast: more)').addListener(checkHighContrast);
});
</script>

<template>
  <ejs-sidebar
    type="Over"
    :class="{ 'high-contrast': prefersHighContrast }"
    role="navigation"
  >
    <nav>
      <a href="#home">Home</a>
      <a href="#products">Products</a>
    </nav>
  </ejs-sidebar>
</template>

<style scoped>
:deep(.high-contrast) {
  background: #000;
  color: #fff;
  border: 3px solid #fff;
}

:deep(.high-contrast a) {
  border: 2px solid #fff;
  padding: 14px 20px;
}

:deep(.high-contrast a:focus) {
  outline: 4px solid #fff;
  outline-offset: 2px;
}
</style>
```

---

## Accessibility Testing Checklist

- ✅ Keyboard Navigation: All interactive elements accessible via keyboard
- ✅ ARIA Labels: Proper role and aria-label attributes
- ✅ Focus Management: Visible focus indicators, focus trap, focus restoration
- ✅ Screen Reader: Semantic HTML, alt text for icons, live regions
- ✅ Color Contrast: WCAG AA minimum 4.5:1 ratio
- ✅ Mobile Accessibility: Touch targets minimum 44x44px
- ✅ High Contrast Mode: Support for high contrast display preferences
