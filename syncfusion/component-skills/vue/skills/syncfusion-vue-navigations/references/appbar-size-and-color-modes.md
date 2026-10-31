# Size and Color Modes

## Table of Contents
- [Mode Property Overview](#mode-property-overview)
- [Regular Mode](#regular-mode)
- [Prominent Mode](#prominent-mode)
- [Dense Mode](#dense-mode)
- [ColorMode Property Overview](#colormode-property-overview)
- [Light Mode](#light-mode)
- [Dark Mode](#dark-mode)
- [Primary Mode](#primary-mode)
- [Inherit Mode](#inherit-mode)
- [Combining Modes](#combining-modes)
- [Mode Combinations Guide](#mode-combinations-guide)

## Mode Property Overview

The `mode` property controls the AppBar height and visual presentation:

| Mode | Height | Use Case |
|------|--------|----------|
| **Regular** | Standard | Default for most applications |
| **Prominent** | Large (200px) | Feature-rich headers, branding |
| **Dense** | Compact (48px) | Toolbars, mobile interfaces |

```vue
<template>
  <div class="mode-selector">
    <label>Select Mode:</label>
    <select v-model="selectedMode" @change="updateMode">
      <option value="Regular">Regular</option>
      <option value="Prominent">Prominent</option>
      <option value="Dense">Dense</option>
    </select>
  </div>

  <ejs-appbar :mode="selectedMode" color-mode="Primary">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span class="mode-label">{{ selectedMode }} Mode</span>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" title="Info">{{ selectedMode }}</button>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const selectedMode = ref('Regular')

const updateMode = () => {
  console.log(`Mode changed to: ${selectedMode.value}`)
}
</script>

<style scoped>
.mode-selector {
  padding: 15px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
}

.mode-selector select {
  margin-left: 10px;
  padding: 5px;
}

.mode-label {
  font-weight: 500;
}
</style>
```

## Regular Mode

Regular mode is the default AppBar size (56px on mobile, 64px on desktop).

**When to use:**
- Standard application headers
- Most common navigation scenarios
- Balanced appearance for content and navigation
- Default for all AppBar instances

```vue
<template>
  <ejs-appbar color-mode="Primary" mode="Regular">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span class="app-title">Regular AppBar</span>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" title="Notifications">
      <span class="e-btn-icon e-icons e-bell"></span>
    </button>
    <button class="e-btn e-inherit" title="Settings">
      <span class="e-btn-icon e-icons e-settings"></span>
    </button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
.app-title {
  font-weight: 500;
  margin-left: 12px;
}
</style>
```

**Key Characteristics:**
- Default height: 56px (mobile), 64px (desktop)
- Comfortable spacing for touch and click interactions
- Suitable for most applications
- Standard AppBar if no mode specified

## Prominent Mode

Prominent mode creates a larger, more visually striking AppBar (200px height).

**When to use:**
- Featured hero sections
- Brand-heavy headers with large logos
- Primary heading placement
- Marketing or showcase applications
- Search bars with prominent positioning

```vue
<template>
  <ejs-appbar color-mode="Primary" mode="Prominent">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    
    <div class="prominent-content">
      <h1>Prominent AppBar</h1>
      <p class="subtitle">This AppBar takes up more space for branding</p>
    </div>
    
    <div class="e-appbar-spacer"></div>
    
    <button class="e-btn e-inherit" title="Help">Help</button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
.prominent-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  flex: 1;
}

.prominent-content h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  margin: 8px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
}
</style>
```

**Key Characteristics:**
- Height: 200px
- Large visual presence
- Ideal for featuring content
- Takes significant viewport space
- Premium, distinctive appearance

## Dense Mode

Dense mode creates a compact AppBar (48px height) for space-constrained interfaces.

**When to use:**
- Toolbars and editing interfaces
- Mobile apps with limited screen space
- Data-heavy dashboards
- Secondary navigation bars
- Administrative interfaces

```vue
<template>
  <ejs-appbar color-mode="Primary" mode="Dense">
    <button class="e-btn e-inherit e-icon-btn" title="Save">
      <span class="e-btn-icon e-icons e-save"></span>
    </button>
    <button class="e-btn e-inherit e-icon-btn" title="Print">
      <span class="e-btn-icon e-icons e-print"></span>
    </button>
    <div class="e-appbar-separator"></div>
    <button class="e-btn e-inherit e-icon-btn" title="Undo">
      <span class="e-btn-icon e-icons e-undo"></span>
    </button>
    <button class="e-btn e-inherit e-icon-btn" title="Redo">
      <span class="e-btn-icon e-icons e-redo"></span>
    </button>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit e-icon-btn" title="More">
      <span class="e-btn-icon e-icons e-more"></span>
    </button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>
```

**Key Characteristics:**
- Height: 48px (compact)
- Fits more content in viewport
- Icon-focused design
- Minimal text
- Efficient space usage

## ColorMode Property Overview

The `color-mode` property controls the AppBar color scheme:

| Mode | Background | Text Color | Use Case |
|------|-----------|-----------|----------|
| **Light** | Light | Dark | Clean, modern, default |
| **Dark** | Dark | Light | Professional, contrast |
| **Primary** | Brand color | Adjusted | Branded, theme-aligned |
| **Inherit** | Parent color | Adjusted | Contextual, flexible |

```vue
<template>
  <div class="color-selector">
    <label>Select Color Mode:</label>
    <select v-model="selectedColorMode" @change="updateColorMode">
      <option value="Light">Light</option>
      <option value="Dark">Dark</option>
      <option value="Primary">Primary</option>
      <option value="Inherit">Inherit</option>
    </select>
  </div>

  <ejs-appbar :color-mode="selectedColorMode">
    <button class="e-btn e-inherit" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span class="color-label">{{ selectedColorMode }} Color</span>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" title="Info">Info</button>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const selectedColorMode = ref('Light')

const updateColorMode = () => {
  console.log(`Color mode changed to: ${selectedColorMode.value}`)
}
</script>

<style scoped>
.color-selector {
  padding: 15px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
}

.color-selector select {
  margin-left: 10px;
  padding: 5px;
}

.color-label {
  font-weight: 500;
}
</style>
```

## Light Mode

Light color mode provides a clean, bright appearance with dark text.

**When to use:**
- Standard applications
- Daytime viewing
- High-contrast requirements
- Professional, corporate settings
- Most common choice

```vue
<template>
  <ejs-appbar color-mode="Light">
    <button class="e-btn e-inherit e-icon-btn" title="Home">
      <span class="e-btn-icon e-icons e-home"></span>
    </button>
    <span>Light AppBar</span>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" title="Settings">Settings</button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
/* Light mode: Light background, dark text */
:deep(.e-appbar.e-light) {
  background-color: #f8f9fa;
  color: #333;
}
</style>
```

**Key Characteristics:**
- Background: Light gray (#f8f9fa)
- Text: Dark (#333)
- Contrast ratio: 4.5:1+ (WCAG AA)
- Default appearance
- Best for bright environments

## Dark Mode

Dark color mode provides a sophisticated appearance with light text on dark background.

**When to use:**
- Modern, trendy applications
- Night/low-light environments
- Eye-strain reduction
- Premium applications
- Code editors and development tools

```vue
<template>
  <ejs-appbar color-mode="Dark">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span>Dark AppBar</span>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" title="Settings">Settings</button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
/* Dark mode: Dark background, light text */
:deep(.e-appbar.e-dark) {
  background-color: #212529;
  color: #fff;
}
</style>
```

**Key Characteristics:**
- Background: Dark gray (#212529)
- Text: White (#fff)
- Contrast ratio: 5.1:1 (WCAG AAA)
- Modern appearance
- Reduces eye strain in low light

## Primary Mode

Primary color mode uses the application's brand color.

**When to use:**
- Branding and brand alignment
- Marketing applications
- Product launches
- Theme-aware applications
- Visual identity emphasis

```vue
<template>
  <ejs-appbar color-mode="Primary">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span class="brand-text">BrandApp</span>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" title="Login">Login</button>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
/* Primary mode: Brand color with adjusted text */
:deep(.e-appbar.e-primary) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.brand-text {
  font-weight: 600;
  font-size: 1.1rem;
}
</style>
```

**Key Characteristics:**
- Background: Primary brand color
- Text: Adjusted for readability
- Contrast: Optimized for brand color
- Creates visual hierarchy
- Brand identity reinforcement

## Inherit Mode

Inherit color mode uses the parent container's colors.

**When to use:**
- Nested AppBar instances
- Context-aware layouts
- Flexible component integration
- Maintaining parent styling
- Adaptive applications

```vue
<template>
  <div class="custom-theme">
    <ejs-appbar color-mode="Inherit">
      <button class="e-btn e-inherit e-icon-btn" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span>Inherited AppBar</span>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit" title="Settings">Settings</button>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
.custom-theme {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 0;
}

/* AppBar inherits from custom-theme */
:deep(.e-appbar.e-inherit) {
  background-color: inherit;
  color: inherit;
}
</style>
```

**Key Characteristics:**
- Inherits from parent element
- Flexible styling
- No fixed colors
- Adaptable to any parent style
- Contextual appearance

## Combining Modes

Mix `mode` and `color-mode` for powerful combinations:

### Regular + Dark (Professional)

```vue
<template>
  <ejs-appbar mode="Regular" color-mode="Dark">
    <!-- Professional, standard-sized header -->
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>
```

### Prominent + Primary (Branded)

```vue
<template>
  <ejs-appbar mode="Prominent" color-mode="Primary">
    <div class="prominent-branding">
      <h1>Featured Application</h1>
      <p>With prominent branded header</p>
    </div>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
.prominent-branding {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 20px;
}

.prominent-branding h1 {
  margin: 0;
  font-size: 32px;
}

.prominent-branding p {
  margin: 8px 0 0 0;
}
</style>
```

### Dense + Light (Compact & Clean)

```vue
<template>
  <ejs-appbar mode="Dense" color-mode="Light">
    <!-- Compact, clean toolbar -->
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>
```

## Mode Combinations Guide

### Desktop Applications

**Navigation Header:**
```vue
<ejs-appbar mode="Regular" color-mode="Primary"></ejs-appbar>
```

**Toolbar:**
```vue
<ejs-appbar mode="Dense" color-mode="Light"></ejs-appbar>
```

**Featured Section:**
```vue
<ejs-appbar mode="Prominent" color-mode="Primary"></ejs-appbar>
```

### Mobile Applications

**Header:**
```vue
<ejs-appbar mode="Regular" color-mode="Dark"></ejs-appbar>
```

**Bottom Navigation:**
```vue
<ejs-appbar mode="Dense" color-mode="Primary" position="Bottom"></ejs-appbar>
```

### Theme Switching

```vue
<template>
  <div class="app-container">
    <div class="theme-toggle">
      <button @click="toggleTheme">
        {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
      </button>
    </div>

    <ejs-appbar 
      :color-mode="isDarkMode ? 'Dark' : 'Light'"
      mode="Regular"
    >
      <span>Theme-aware AppBar</span>
    </ejs-appbar>

    <div class="content">
      <p>Content adapts to current theme</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<style scoped>
.app-container {
  transition: background-color 0.3s ease;
}

.theme-toggle {
  padding: 10px;
}

.theme-toggle button {
  padding: 8px 16px;
  cursor: pointer;
}

.content {
  padding: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
```

### Complete Mode Showcase

```vue
<template>
  <div class="showcase">
    <h2>Mode & Color Combinations</h2>

    <!-- Regular Light -->
    <h3>Regular + Light</h3>
    <ejs-appbar mode="Regular" color-mode="Light">
      <span>Regular Light AppBar</span>
    </ejs-appbar>

    <!-- Regular Dark -->
    <h3>Regular + Dark</h3>
    <ejs-appbar mode="Regular" color-mode="Dark">
      <span>Regular Dark AppBar</span>
    </ejs-appbar>

    <!-- Dense Primary -->
    <h3>Dense + Primary</h3>
    <ejs-appbar mode="Dense" color-mode="Primary">
      <span>Dense Primary AppBar</span>
    </ejs-appbar>

    <!-- Prominent Primary -->
    <h3>Prominent + Primary</h3>
    <ejs-appbar mode="Prominent" color-mode="Primary">
      <span>Prominent Primary AppBar</span>
    </ejs-appbar>
  </div>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>

<style scoped>
.showcase {
  padding: 20px;
}

.showcase h3 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}
</style>
```

This comprehensive guide covers all size and color mode combinations for creating the perfect AppBar for any application context.
