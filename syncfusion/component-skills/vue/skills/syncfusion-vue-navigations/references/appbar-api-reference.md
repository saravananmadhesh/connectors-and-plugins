# API Reference

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Methods](#methods)
- [Template Usage](#template-usage)
- [Type Definitions](#type-definitions)
- [Common Patterns](#common-patterns)

## Properties

The AppBar component supports the following properties:

### colorMode

**Type:** `string`  
**Default:** `'Light'`  
**Values:** `'Light'`, `'Dark'`, `'Primary'`, `'Inherit'`

Sets the color scheme of the AppBar.

```vue
<template>
  <div class="example-container">
    <div>
      <label>Select Color Mode:</label>
      <select v-model="selectedMode" @change="updateColorMode">
        <option value="Light">Light</option>
        <option value="Dark">Dark</option>
        <option value="Primary">Primary</option>
        <option value="Inherit">Inherit</option>
      </select>
    </div>

    <ejs-appbar :colorMode="selectedMode">
      <button class="e-btn e-inherit" title="Home">Home</button>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit" title="Logout">Logout</button>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const selectedMode = ref('Light')

const updateColorMode = () => {
  console.log(`Color mode changed to: ${selectedMode.value}`)
}
</script>

<style scoped>
.example-container {
  padding: 20px;
}

.example-container select {
  margin-left: 10px;
  padding: 5px;
}
</style>
```

### mode

**Type:** `string`  
**Default:** `'Regular'`  
**Values:** `'Regular'`, `'Prominent'`, `'Dense'`

Sets the size/height mode of the AppBar.

```vue
<template>
  <div>
    <div class="mode-selector">
      <label>AppBar Mode:</label>
      <select v-model="appBarMode">
        <option value="Regular">Regular</option>
        <option value="Prominent">Prominent</option>
        <option value="Dense">Dense</option>
      </select>
    </div>

    <ejs-appbar :mode="appBarMode" color-mode="Primary">
      <button class="e-btn e-inherit e-icon-btn" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span class="app-title">{{ appBarMode }} AppBar</span>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit" title="Settings">Settings</button>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const appBarMode = ref('Regular')
</script>

<style scoped>
.mode-selector {
  padding: 10px;
  background-color: #f5f5f5;
}

.mode-selector select {
  margin-left: 10px;
}

.app-title {
  font-weight: 500;
}
</style>
```

### position

**Type:** `string`  
**Default:** `'Top'`  
**Values:** `'Top'`, `'Bottom'`

Sets whether the AppBar appears at top or bottom of the viewport.

```vue
<template>
  <div>
    <div class="controls">
      <label>Position:</label>
      <select v-model="appPosition">
        <option value="Top">Top</option>
        <option value="Bottom">Bottom</option>
      </select>
    </div>

    <ejs-appbar :position="appPosition" color-mode="Primary">
      <button class="e-btn e-inherit e-icon-btn" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span>{{ appPosition }} AppBar</span>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit" title="More">More</button>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const appPosition = ref('Top')
</script>
```

### isSticky

**Type:** `boolean`  
**Default:** `false`

Makes the AppBar sticky to the viewport (remains visible during scrolling).

```vue
<template>
  <div>
    <ejs-appbar 
      color-mode="Primary" 
      :is-sticky="stickyEnabled"
    >
      <button class="e-btn e-inherit e-icon-btn" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span>{{ stickyEnabled ? 'Sticky' : 'Normal' }} AppBar</span>
      <div class="e-appbar-spacer"></div>
      <label class="sticky-toggle">
        <input v-model="stickyEnabled" type="checkbox" />
        Enable Sticky
      </label>
    </ejs-appbar>

    <!-- Scrollable content -->
    <div class="scrollable-content">
      <div v-for="i in 50" :key="i" class="content-item">
        <h3>Section {{ i }}</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const stickyEnabled = ref(false)
</script>

<style scoped>
.sticky-toggle {
  margin-right: 10px;
  cursor: pointer;
}

.scrollable-content {
  max-height: 500px;
  overflow-y: auto;
  padding: 20px;
}

.content-item {
  padding: 20px;
  border-bottom: 1px solid #ddd;
  background-color: #fafafa;
}

.content-item h3 {
  margin-top: 0;
}
</style>
```

### enableRtl

**Type:** `boolean`  
**Default:** `false`

Enables right-to-left layout for RTL languages.

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <ejs-appbar 
      color-mode="Primary"
      :enable-rtl="isRTL"
    >
      <button class="e-btn e-inherit e-icon-btn" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span>{{ isRTL ? 'تطبيق' : 'Application' }}</span>
      <div class="e-appbar-spacer"></div>
      <button 
        class="e-btn e-inherit"
        @click="toggleRTL"
        title="Toggle RTL"
      >
        {{ isRTL ? 'LTR' : 'RTL' }}
      </button>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const isRTL = ref(false)

const toggleRTL = () => {
  isRTL.value = !isRTL.value
}
</script>

<style scoped>
[dir="rtl"] .e-appbar {
  direction: rtl;
}
</style>
```

### enablePersistence

**Type:** `boolean`  
**Default:** `false`

Enables state persistence to browser local storage.

```vue
<template>
  <ejs-appbar 
    color-mode="Primary"
    :enable-persistence="true"
    id="persistent-appbar"
  >
    <button 
      class="e-btn e-inherit e-icon-btn"
      @click="toggleMenu"
      title="Menu"
    >
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span>Persistent AppBar</span>
    <div class="e-appbar-spacer"></div>
    <span class="status">{{ persistenceMessage }}</span>
  </ejs-appbar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const persistenceMessage = ref('State will be saved')

const toggleMenu = () => {
  console.log('Menu state being persisted...')
}

watch(() => localStorage.getItem('persistent-appbar'), (newVal) => {
  if (newVal) {
    persistenceMessage.value = 'State restored from storage'
  }
})
</script>

<style scoped>
.status {
  font-size: 0.9rem;
  color: #666;
  margin-right: 10px;
}
</style>
```

### locale

**Type:** `string`  
**Default:** `'en-US'`

Sets the locale/language for the AppBar component.

```vue
<template>
  <div>
    <div class="locale-selector">
      <label>Locale:</label>
      <select v-model="selectedLocale" @change="updateLocale">
        <option value="en-US">English</option>
        <option value="es-ES">Spanish</option>
        <option value="fr-FR">French</option>
        <option value="de-DE">German</option>
        <option value="ar-SA">Arabic</option>
      </select>
    </div>

    <ejs-appbar 
      color-mode="Primary"
      :locale="selectedLocale"
      :enable-rtl="isArabic"
    >
      <button class="e-btn e-inherit" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span>{{ localeLabel }}</span>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const selectedLocale = ref('en-US')

const localeLabels = {
  'en-US': 'English Application',
  'es-ES': 'Aplicación Española',
  'fr-FR': 'Application Française',
  'de-DE': 'Deutsche Anwendung',
  'ar-SA': 'التطبيق العربي'
}

const localeLabel = computed(() => 
  localeLabels[selectedLocale.value] || 'Application'
)

const isArabic = computed(() => 
  selectedLocale.value === 'ar-SA'
)

const updateLocale = () => {
  console.log(`Locale changed to: ${selectedLocale.value}`)
}
</script>

<style scoped>
.locale-selector {
  padding: 10px;
  background-color: #f5f5f5;
}

.locale-selector select {
  margin-left: 10px;
}
</style>
```

### htmlAttributes

**Type:** `Record<string, string>`  
**Default:** `{}`

Sets custom HTML attributes on the AppBar container element.

```vue
<template>
  <ejs-appbar 
    color-mode="Primary"
    :html-attributes="customAttributes"
  >
    <button class="e-btn e-inherit" title="Home">Home</button>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" title="Help">Help</button>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const customAttributes = ref({
  'data-role': 'banner',
  'data-analytics': 'main-navigation',
  'data-testid': 'header-appbar',
  'aria-label': 'Main application header'
})
</script>
```

## Events

The AppBar component emits the following events:

### created

**Type:** `Event`

Fired after the AppBar component is created.

```vue
<template>
  <ejs-appbar 
    color-mode="Primary"
    @created="onAppBarCreated"
  >
    <span>{{ createdMessage }}</span>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const createdMessage = ref('Creating...')

const onAppBarCreated = () => {
  createdMessage.value = 'AppBar initialized'
  console.log('AppBar created event fired')
}
</script>
```

### destroyed

**Type:** `Event`

Fired when the AppBar component is destroyed/unmounted.

```vue
<template>
  <div>
    <button @click="toggleAppBar">{{ showAppBar ? 'Hide' : 'Show' }} AppBar</button>
    
    <ejs-appbar 
      v-if="showAppBar"
      color-mode="Primary"
      @destroyed="onAppBarDestroyed"
    >
      <span>Temporary AppBar</span>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const showAppBar = ref(true)

const toggleAppBar = () => {
  showAppBar.value = !showAppBar.value
}

const onAppBarDestroyed = () => {
  console.log('AppBar destroyed event fired')
}
</script>
```

## Methods

The AppBar component provides the following methods for programmatic control:

### refresh()

Refreshes/redraws the AppBar component.

```vue
<template>
  <div>
    <button @click="refreshAppBar">Refresh AppBar</button>

    <ejs-appbar 
      ref="appBarRef"
      color-mode="Primary"
    >
      <span>{{ refreshCount }} refreshes</span>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit" title="Settings">Settings</button>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const appBarRef = ref(null)
const refreshCount = ref(0)

const refreshAppBar = () => {
  if (appBarRef.value) {
    appBarRef.value.refresh?.()
    refreshCount.value++
    console.log(`AppBar refreshed (count: ${refreshCount.value})`)
  }
}
</script>
```

### destroy()

Destroys the AppBar component completely.

```vue
<template>
  <div>
    <button @click="destroyAppBar">Destroy AppBar</button>
    <button v-if="!isDestroyed" @click="recreateAppBar">Recreate</button>

    <ejs-appbar 
      v-if="!isDestroyed"
      ref="appBarRef"
      color-mode="Primary"
    >
      <span>Active AppBar</span>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const appBarRef = ref(null)
const isDestroyed = ref(false)

const destroyAppBar = () => {
  if (appBarRef.value) {
    appBarRef.value.destroy?.()
    isDestroyed.value = true
  }
}

const recreateAppBar = () => {
  isDestroyed.value = false
}
</script>
```

## Template Usage

### Component Registration

**Local Import:**
```typescript
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

export default {
  components: {
    'ejs-appbar': AppBarComponent
  }
}
```

**Global Registration (main.ts):**
```typescript
import { createApp } from 'vue'
import { registerLicense } from '@syncfusion/ej2-base'
import { AppBarComponent } from '@syncfusion/ej2-vue-navigations'

const app = createApp(App)
app.component('ejs-appbar', AppBarComponent)
app.mount('#app')
```

### Basic Template Structure

```vue
<template>
  <ejs-appbar 
    color-mode="Primary"
    mode="Regular"
    position="Top"
    :is-sticky="false"
    @created="onCreated"
    @destroyed="onDestroyed"
  >
    <!-- AppBar content here -->
  </ejs-appbar>
</template>
```

## Type Definitions

```typescript
// Color Mode Type
type AppBarColorMode = 'Light' | 'Dark' | 'Primary' | 'Inherit'

// Mode Type
type AppBarMode = 'Regular' | 'Prominent' | 'Dense'

// Position Type
type AppBarPosition = 'Top' | 'Bottom'

// HTML Attributes
type HtmlAttributes = Record<string, string | number | boolean>

// AppBar Component Props
interface AppBarComponentProps {
  colorMode?: AppBarColorMode
  mode?: AppBarMode
  position?: AppBarPosition
  isSticky?: boolean
  enableRtl?: boolean
  enablePersistence?: boolean
  locale?: string
  htmlAttributes?: HtmlAttributes
  cssClass?: string
}

// AppBar Events
interface AppBarEvents {
  created?: () => void
  destroyed?: () => void
}
```

## Common Patterns

### Pattern 1: Responsive AppBar

```vue
<template>
  <ejs-appbar 
    :mode="isMobile ? 'Dense' : 'Regular'"
    :color-mode="isDarkMode ? 'Dark' : 'Light'"
    :is-sticky="true"
  >
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span class="brand">{{ appName }}</span>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" @click="toggleTheme" title="Toggle Theme">
      {{ isDarkMode ? '☀️' : '🌙' }}
    </button>
  </ejs-appbar>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const appName = ref('My App')
const windowWidth = ref(0)
const isDarkMode = ref(false)

const isMobile = computed(() => windowWidth.value < 768)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
```

### Pattern 2: AppBar with State Management

```vue
<template>
  <ejs-appbar 
    :color-mode="appState.colorMode"
    :mode="appState.mode"
    :position="appState.position"
    :is-sticky="appState.isSticky"
  >
    <button 
      class="e-btn e-inherit e-icon-btn"
      @click="toggleMenu"
      title="Menu"
    >
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span>{{ appState.title }}</span>
    <div class="e-appbar-spacer"></div>
    <button 
      class="e-btn e-inherit"
      @click="logout"
      title="Logout"
    >
      Logout
    </button>
  </ejs-appbar>
</template>

<script setup>
import { reactive } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const appState = reactive({
  title: 'My Application',
  colorMode: 'Primary',
  mode: 'Regular',
  position: 'Top',
  isSticky: false
})

const toggleMenu = () => {
  console.log('Menu toggled')
}

const logout = () => {
  console.log('User logged out')
}
</script>
```

### Pattern 3: AppBar with Navigation

```vue
<template>
  <ejs-appbar color-mode="Primary" :is-sticky="true">
    <button class="e-btn e-inherit e-icon-btn" @click="handleHome">
      <span class="e-btn-icon e-icons e-home"></span>
    </button>
    
    <ejs-menu :items="navigationItems" class="e-inherit"></ejs-menu>
    
    <div class="e-appbar-spacer"></div>
    
    <button 
      class="e-btn e-inherit"
      @click="handleSearch"
      title="Search"
    >
      Search
    </button>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
import { MenuComponent, MenuItemsDirective, MenuItemDirective } from "@syncfusion/ej2-vue-navigations";

const navigationItems = ref([
  {
    text: 'Products',
    items: [
      { text: 'Features' },
      { text: 'Pricing' }
    ]
  },
  { text: 'Documentation' },
  { text: 'Support' }
])

const handleHome = () => {
  console.log('Navigate to home')
}

const handleSearch = () => {
  console.log('Open search')
}
</script>
```

This API reference provides complete documentation for implementing the Syncfusion AppBar component in Vue 3 applications.
