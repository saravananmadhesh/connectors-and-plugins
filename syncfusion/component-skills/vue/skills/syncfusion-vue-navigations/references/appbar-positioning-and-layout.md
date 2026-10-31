---
name: syncfusion-vue-appbar-positioning
---

# Positioning and Layout

## Table of Contents
- [Position Overview](#position-overview)
- [Top AppBar (Default)](#top-appbar-default)
- [Bottom AppBar](#bottom-appbar)
- [Sticky AppBar](#sticky-appbar)
- [Spacer for Content Alignment](#spacer-for-content-alignment)
- [Separator for Visual Grouping](#separator-for-visual-grouping)
- [Responsive Design](#responsive-design)

## Position Overview

The AppBar position can be controlled using:
- **`position` prop:** Sets vertical position ("Top" | "Bottom")
- **`is-sticky` prop:** Makes AppBar fixed during scroll (boolean)

| Position | Use Case |
|----------|----------|
| **Top** | Default, main navigation, most common |
| **Bottom** | Mobile apps, action bars, floating actions |
| **Sticky** | Keep navigation visible while scrolling content |

## Top AppBar (Default)

Top positioning is the default behavior. The AppBar sits at the top of your content.

**When to use:**
- Main application header
- Navigation menus
- Logo and branding placement
- Desktop applications

```vue
<template>
  <div class="app-container">
    <ejs-appbar color-mode="Primary">
      <button class="e-btn e-inherit e-icon-btn" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit" title="Free Trial">FREE TRIAL</button>
    </ejs-appbar>
    
    <div class="appbar-content">
      <p>Main content of your application goes here.</p>
      <p>Scroll down to see more content while AppBar stays at top.</p>
    </div>
  </div>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.appbar-content {
  padding: 20px;
  font-size: 14px;
  flex: 1;
}
</style>
```

**Key Points:**
- Default position value is "Top"
- Content flows below the AppBar
- No prop needed to set top position
- Uses native HTML buttons with `e-btn` and `e-inherit` classes

## Bottom AppBar

Bottom positioning places the AppBar at the bottom of your content. Use for mobile action bars or floating action buttons.

**When to use:**
- Mobile apps (bottom navigation is standard)
- Action bars (Save, Cancel, Delete buttons)
- Floating action buttons
- Secondary navigation

```vue
<template>
  <div class="app-container">
    <div class="main-content">
      <h2>Document or Form Content</h2>
      <p>Your main content goes here.</p>
    </div>
    
    <ejs-appbar color-mode="Primary" position="Bottom">
      <button class="e-btn e-inherit" title="Cancel" @click="handleCancel">Cancel</button>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit e-btn-primary" title="Save" @click="handleSave">Save</button>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const handleCancel = () => {
  console.log('Cancel clicked')
}

const handleSave = () => {
  console.log('Save clicked')
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  height: 400px;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.e-btn-primary {
  background-color: #007bff;
  color: white;
}
</style>
```

**Common Patterns:**
- **Mobile navigation:** Bottom AppBar with home, search, profile buttons
- **Document editor:** Bottom AppBar with Save/Cancel/Delete
- **List with actions:** Bottom AppBar with select, delete, share options

## Sticky AppBar

Sticky AppBar stays fixed at the top (or bottom) of the viewport while you scroll the content beneath it.

**When to use:**
- Keep navigation always accessible
- Long scrolling pages or documents
- Fixed toolbars that users always need access to
- Sticky headers in dashboards

### Method 1: Using `is-sticky` Prop

```vue
<template>
  <div class="app-container">
    <ejs-appbar color-mode="Primary" :is-sticky="true">
      <button class="e-btn e-inherit e-icon-btn" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span class="app-title">My App</span>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit" title="Profile">Profile</button>
    </ejs-appbar>
    
    <div class="scroll-content">
      <h2>Scroll Down to See Sticky AppBar</h2>
      <div v-for="i in 30" :key="i" class="paragraph">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.scroll-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.paragraph {
  margin-bottom: 10px;
}

.app-title {
  font-weight: 500;
  margin-left: 10px;
}
</style>
```

### Sticky + Bottom Position

Combine sticky with bottom position for action bars:

```vue
<template>
  <ejs-appbar 
    color-mode="Primary" 
    position="Bottom" 
    :is-sticky="true"
  >
    <button class="e-btn e-inherit" title="Discard" @click="handleDiscard">Discard</button>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit e-btn-primary" title="Submit" @click="handleSubmit">Submit</button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const handleDiscard = () => {
  console.log('Discarded')
}

const handleSubmit = () => {
  console.log('Submitted')
}
</script>
```

## Spacer for Content Alignment

The spacer (`e-appbar-spacer`) creates flexible horizontal spacing to push content to edges.

**When to use:**
- Logo/brand on left, navigation in center, user profile on right
- Left-aligned menu button, right-aligned search box
- Centering content with balanced spacing

### Single Spacer (Right-Align)

```vue
<template>
  <ejs-appbar color-mode="Primary">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span class="app-name">My App</span>
    <div class="e-appbar-spacer"></div>
    <!-- Everything below pushes to the right -->
    <button class="e-btn e-inherit" title="Settings">Settings</button>
    <button class="e-btn e-inherit" title="Logout">Logout</button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
.app-name {
  font-weight: 500;
  margin-left: 10px;
}
</style>
```

### Multiple Spacers (Distributed Layout)

```vue
<template>
  <ejs-appbar color-mode="Primary">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <div class="e-appbar-spacer"></div>
    <!-- Center content -->
    <span class="centered-title">Centered Title</span>
    <div class="e-appbar-spacer"></div>
    <!-- Right-aligned buttons -->
    <button class="e-btn e-inherit" title="Help">Help</button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
.centered-title {
  font-weight: 500;
  white-space: nowrap;
}
</style>
```

**Key Points:**
- `<div class="e-appbar-spacer"></div>` takes remaining horizontal space
- Multiple spacers distribute content evenly
- No width/flex properties needed—spacer handles it

## Separator for Visual Grouping

The separator (`e-appbar-separator`) displays a vertical line to visually group related buttons or content.

**When to use:**
- Group editing tools (Cut, Copy, Paste)
- Separate navigation from actions (Menu | Home, About | Settings, Logout)
- Organize toolbar buttons into logical sections

```vue
<template>
  <ejs-appbar color-mode="Primary" mode="Dense">
    <!-- Editing tools group -->
    <button class="e-btn e-inherit e-icon-btn" title="Cut">
      <span class="e-btn-icon e-icons e-cut"></span>
    </button>
    <button class="e-btn e-inherit e-icon-btn" title="Copy">
      <span class="e-btn-icon e-icons e-copy"></span>
    </button>
    <button class="e-btn e-inherit e-icon-btn" title="Paste">
      <span class="e-btn-icon e-icons e-paste"></span>
    </button>
    
    <!-- Visual separator -->
    <div class="e-appbar-separator"></div>
    
    <!-- Formatting group -->
    <button class="e-btn e-inherit e-icon-btn" title="Bold">
      <span class="e-btn-icon e-icons e-bold"></span>
    </button>
    <button class="e-btn e-inherit e-icon-btn" title="Italic">
      <span class="e-btn-icon e-icons e-italic"></span>
    </button>
    <button class="e-btn e-inherit e-icon-btn" title="Underline">
      <span class="e-btn-icon e-icons e-underline"></span>
    </button>
    
    <!-- Another separator -->
    <div class="e-appbar-separator"></div>
    
    <!-- Alignment group -->
    <button class="e-btn e-inherit e-icon-btn" title="Align Left">
      <span class="e-btn-icon e-icons e-align-left"></span>
    </button>
    <button class="e-btn e-inherit e-icon-btn" title="Align Center">
      <span class="e-btn-icon e-icons e-align-center"></span>
    </button>
    <button class="e-btn e-inherit e-icon-btn" title="Align Right">
      <span class="e-btn-icon e-icons e-align-right"></span>
    </button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>
```

## Responsive Design

Use media queries to adjust AppBar layout for different screen sizes.

### Example: Responsive Navigation

```vue
<template>
  <ejs-appbar color-mode="Primary">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span class="brand">My Brand</span>
    
    <!-- Visible on desktop, hidden on mobile -->
    <div class="nav-desktop">
      <button class="e-btn e-inherit" title="Home">Home</button>
      <button class="e-btn e-inherit" title="About">About</button>
      <button class="e-btn e-inherit" title="Services">Services</button>
    </div>
    
    <div class="e-appbar-spacer"></div>
    
    <button class="e-btn e-inherit" title="Contact">Contact</button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
/* Desktop: Show navigation buttons */
@media (min-width: 768px) {
  .nav-desktop {
    display: flex;
    gap: 10px;
  }
}

/* Mobile: Hide navigation buttons */
@media (max-width: 767px) {
  .nav-desktop {
    display: none;
  }
}

.brand {
  margin-left: 10px;
  font-weight: 500;
}
</style>
```

### Responsive Bottom AppBar

For mobile-first apps, switch to bottom AppBar on mobile and top on desktop:

```vue
<template>
  <ejs-appbar 
    color-mode="Primary"
    :position="isMobile ? 'Bottom' : 'Top'"
  >
    <button class="e-btn e-inherit e-icon-btn" title="Home">
      <span class="e-btn-icon e-icons e-home"></span>
    </button>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" title="Profile">Profile</button>
  </ejs-appbar>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const isMobile = ref(false)

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  isMobile.value = window.innerWidth < 768
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
```

## Complete Example: Full-Featured Layout

```vue
<template>
  <div class="app-container">
    <!-- Main Navigation AppBar - Sticky at top -->
    <ejs-appbar 
      color-mode="Primary" 
      :is-sticky="true"
    >
      <button class="e-btn e-inherit e-icon-btn" title="Menu" @click="handleMenu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span class="logo">MyApp</span>
      
      <div class="e-appbar-spacer"></div>
      <div class="e-appbar-separator"></div>
      
      <button class="e-btn e-inherit" title="Profile" @click="handleProfile">Profile</button>
    </ejs-appbar>
    
    <!-- Main content with long scrolling -->
    <div class="content-area">
      <h2>Long Content Area</h2>
      <p>Your page content goes here. The AppBar stays sticky at the top.</p>
      <div v-for="i in 50" :key="i" class="content-block">
        <h3>Section {{ i }}</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
    
    <!-- Bottom Action AppBar - Fixed at bottom -->
    <ejs-appbar 
      color-mode="Primary" 
      position="Bottom"
    >
      <button class="e-btn e-inherit" title="Cancel" @click="handleCancel">Cancel</button>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit e-btn-primary" title="Save" @click="handleSave">Save</button>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const handleMenu = () => {
  console.log('Menu clicked')
}

const handleProfile = () => {
  console.log('Profile clicked')
}

const handleCancel = () => {
  console.log('Cancel clicked')
}

const handleSave = () => {
  console.log('Save clicked')
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-area {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.content-block {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.logo {
  font-weight: 600;
  margin-left: 10px;
}

.e-btn-primary {
  background-color: #007bff;
  color: white;
}
</style>
```

This creates a sophisticated layout with sticky top navigation and fixed bottom actions, all written in Vue 3 Composition API style.

