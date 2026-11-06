# Styling and Customization in Vue 3 Toolbar

## Table of Contents
- [Built-in Themes](#built-in-themes)
- [CSS Classes](#css-classes)
- [Custom Styling](#custom-styling)
- [Dynamic Styling](#dynamic-styling)
- [Item Customization](#item-customization)
- [Icon Styling](#icon-styling)
- [Width and Sizing](#width-and-sizing)
- [Spacing and Alignment](#spacing-and-alignment)

---

## Built-in Themes

Syncfusion provides pre-built themes. Apply by importing the appropriate CSS.

### Theme Options

| Theme | File | Import |
|-------|------|--------|
| Tailwind 3 | `tailwind3.css` | `@syncfusion/ej2-base/styles/tailwind3.css` |
| Bootstrap 5.3 | `bootstrap5.3.css` | `@syncfusion/ej2-base/styles/bootstrap5.3.css` |
| Fluent 2 | `fluent2.css` | `@syncfusion/ej2-base/styles/fluent2.css` |
| Material 3 | `material3.css` | `@syncfusion/ej2-base/styles/material3.css` |

### Applying a Theme

In your main.js or main.ts:

```javascript
// Tailwind 3 theme
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-buttons/styles/tailwind3.css';
import '@syncfusion/ej2-popups/styles/tailwind3.css';
import '@syncfusion/ej2-navigations/styles/tailwind3.css';

// Component imports
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');
```

### Theme-Specific Example

```vue
<template>
  <div>
    <h3>Tailwind 3 Styled Toolbar</h3>
    <ejs-toolbar>
      <e-items>
        <e-item text="Cut" prefixIcon="e-icons e-cut"></e-item>
        <e-item text="Copy" prefixIcon="e-icons e-copy"></e-item>
        <e-item text="Paste" prefixIcon="e-icons e-paste"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

The theme applies automatically to all components.

---

## CSS Classes

Syncfusion Toolbar uses specific CSS classes you can target for customization.

### Main Toolbar Classes

| Class | Target | Purpose |
|-------|--------|---------|
| `.e-toolbar` | Root container | Main toolbar wrapper |
| `.e-toolbar-item` | Individual item | Each toolbar item |
| `.e-tbar-btn` | Button item | Button-type items |
| `.e-tbar-separator` | Separator | Divider between items |
| `.e-tbar-text` | Text content | Item text label |
| `.e-tbar-icon` | Icon element | Item icon |
| `.e-pop-wrapper` | Popup container | Overflow popup |
| `.e-tbar-nav-arrow` | Scroll arrow | Left/right navigation arrows |
| `.e-tbar-overflow-button` | Overflow button | Popup trigger button |
| `.e-hscroll-left` | Left scroll button | Left navigation button |
| `.e-hscroll-right` | Right scroll button | Right navigation button |

### Class Hierarchy Example

```html
<div class="e-toolbar">
  <button class="e-tbar-btn e-toolbar-item">
    <span class="e-tbar-icon e-icons e-cut"></span>
    <span class="e-tbar-text">Cut</span>
  </button>
  <div class="e-tbar-separator e-toolbar-item"></div>
  <button class="e-tbar-btn e-toolbar-item">
    <span class="e-tbar-icon e-icons e-copy"></span>
    <span class="e-tbar-text">Copy</span>
  </button>
</div>
```

---

## Custom Styling

### Scoped CSS in Vue Components

Apply styles only to your toolbar component:

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item text="Cut" prefixIcon="e-cut-icon"></e-item>
      <e-item text="Copy" prefixIcon="e-copy-icon"></e-item>
      <e-item text="Paste" prefixIcon="e-paste-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
/* Toolbar background */
:deep(.e-toolbar) {
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 8px;
}

/* Toolbar items */
:deep(.e-toolbar-item) {
  margin: 0 4px;
  border-radius: 4px;
}

/* Buttons */
:deep(.e-tbar-btn) {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.e-tbar-btn:hover) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

:deep(.e-tbar-btn:active) {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(0);
}

/* Icon styling */
:deep(.e-tbar-icon) {
  font-size: 18px;
  margin-right: 6px;
}

/* Text styling */
:deep(.e-tbar-text) {
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
}

/* Separator */
:deep(.e-tbar-separator) {
  background: rgba(255, 255, 255, 0.3);
  margin: 0 8px;
}

/* Scroll arrows */
:deep(.e-tbar-nav-arrow) {
  color: white;
}

:deep(.e-tbar-nav-arrow:hover) {
  background: rgba(255, 255, 255, 0.2);
}
</style>
```

### Advanced Custom Styling

```vue
<template>
  <ejs-toolbar class="custom-toolbar">
    <e-items>
      <e-item text="Save" prefixIcon="e-save-icon" cssClass="primary-btn"></e-item>
      <e-item text="Delete" prefixIcon="e-delete-icon" cssClass="danger-btn"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Settings" prefixIcon="e-settings-icon" cssClass="secondary-btn"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
.custom-toolbar :deep(.e-toolbar) {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
}

/* Primary button style */
.custom-toolbar :deep(.primary-btn) {
  background: #007bff;
  color: white;
}

.custom-toolbar :deep(.primary-btn:hover) {
  background: #0056b3;
}

/* Danger button style */
.custom-toolbar :deep(.danger-btn) {
  background: #dc3545;
  color: white;
}

.custom-toolbar :deep(.danger-btn:hover) {
  background: #a02622;
}

/* Secondary button style */
.custom-toolbar :deep(.secondary-btn) {
  background: #6c757d;
  color: white;
}

.custom-toolbar :deep(.secondary-btn:hover) {
  background: #545b62;
}
</style>
```

---

## Dynamic Styling

Apply styles conditionally using Vue's dynamic class binding.

### State-Based Styling

```vue
<template>
  <div>
    <ejs-toolbar ref="toolbar" :cssClass="toolbarTheme">
      <e-items>
        <template v-for="(item, index) in items" :key="index">
          <e-item 
            :text="item.text" 
            :prefixIcon="item.icon"
            :cssClass="item.isActive ? 'active-btn' : ''"
            @click="selectItem(index)"
          ></e-item>
        </template>
      </e-items>
    </ejs-toolbar>
    
    <button @click="toggleTheme">Toggle Theme</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const isDarkMode = ref(false);
const activeItemIndex = ref(0);

const items = ref([
  { text: 'Bold', icon: 'e-bold-icon', isActive: true },
  { text: 'Italic', icon: 'e-italic-icon', isActive: false },
  { text: 'Underline', icon: 'e-underline-icon', isActive: false }
]);

const toolbarTheme = ref('light-theme');

const selectItem = (index) => {
  items.value.forEach((item, i) => {
    item.isActive = i === index;
  });
  activeItemIndex.value = index;
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  toolbarTheme.value = isDarkMode.value ? 'dark-theme' : 'light-theme';
};
</script>

<style scoped>
.light-theme :deep(.e-toolbar) {
  background: #ffffff;
  border: 1px solid #e0e0e0;
}

.light-theme :deep(.e-tbar-btn) {
  color: #333333;
  background: #f5f5f5;
}

.light-theme :deep(.e-tbar-btn:hover) {
  background: #e0e0e0;
}

.dark-theme :deep(.e-toolbar) {
  background: #2d2d2d;
  border: 1px solid #444444;
}

.dark-theme :deep(.e-tbar-btn) {
  color: #ffffff;
  background: #3d3d3d;
}

.dark-theme :deep(.e-tbar-btn:hover) {
  background: #4d4d4d;
}

:deep(.active-btn) {
  background: #007bff !important;
  color: white !important;
}

:deep(.active-btn:hover) {
  background: #0056b3 !important;
}
</style>
```

---

## Item Customization

### Using CSS Classes with Items

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item text="Important" prefixIcon="e-important-icon" cssClass="important-item"></e-item>
      <e-item text="Normal" prefixIcon="e-normal-icon"></e-item>
      <e-item text="Disabled" prefixIcon="e-disabled-icon" cssClass="disabled-item" disabled="true"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
:deep(.important-item) {
  border: 2px solid #ff6b6b;
  background: #ffe0e0;
}

:deep(.important-item .e-tbar-text) {
  color: #c92a2a;
  font-weight: bold;
}

:deep(.disabled-item) {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

---

## Icon Styling

### Icon Size and Color

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item text="Small" prefixIcon="e-icons e-small-icon" cssClass="small-icon"></e-item>
      <e-item text="Medium" prefixIcon="e-icons e-medium-icon" cssClass="medium-icon"></e-item>
      <e-item text="Large" prefixIcon="e-icons e-large-icon" cssClass="large-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
:deep(.small-icon .e-tbar-icon) {
  font-size: 14px;
  color: #666;
}

:deep(.medium-icon .e-tbar-icon) {
  font-size: 20px;
  color: #333;
}

:deep(.large-icon .e-tbar-icon) {
  font-size: 28px;
  color: #000;
}

/* Icon hover effects */
:deep(.small-icon:hover .e-tbar-icon) {
  color: #007bff;
  transition: color 0.3s ease;
}

:deep(.medium-icon:hover .e-tbar-icon) {
  color: #007bff;
  transition: color 0.3s ease;
}

:deep(.large-icon:hover .e-tbar-icon) {
  color: #007bff;
  transition: color 0.3s ease;
}
</style>
```

### Using Font Awesome Icons

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item text="Home" prefixIcon="fa fa-home"></e-item>
      <e-item text="Edit" prefixIcon="fa fa-edit"></e-item>
      <e-item text="Delete" prefixIcon="fa fa-trash"></e-item>
      <e-item text="Download" prefixIcon="fa fa-download"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
/* Font Awesome icon sizing */
:deep(.e-tbar-icon) {
  font-size: 18px;
  width: 20px;
  text-align: center;
}
</style>
```

---

## Width and Sizing

### Toolbar Width

```vue
<template>
  <div>
    <h3>Full Width</h3>
    <ejs-toolbar width="100%">
      <e-items>
        <e-item text="Left" align="Left"></e-item>
        <e-item text="Right" align="Right"></e-item>
      </e-items>
    </ejs-toolbar>

    <h3>Fixed Width</h3>
    <ejs-toolbar width="600px">
      <e-items>
        <e-item text="Item 1"></e-item>
        <e-item text="Item 2"></e-item>
      </e-items>
    </ejs-toolbar>

    <h3>Fixed Pixel Width</h3>
    <ejs-toolbar width="500">
      <e-items>
        <e-item text="Item A"></e-item>
        <e-item text="Item B"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Item Width

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item text="Compact" width="60px"></e-item>
      <e-item text="Medium" width="100px"></e-item>
      <e-item text="Wide" width="150px"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Auto Width" width="auto"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

---

## Spacing and Alignment

### Item Alignment

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item text="Left 1" align="Left"></e-item>
      <e-item text="Left 2" align="Left"></e-item>
      <e-item type="Separator" align="Left"></e-item>
      <e-item text="Center" align="Center"></e-item>
      <e-item type="Separator" align="Right"></e-item>
      <e-item text="Right 1" align="Right"></e-item>
      <e-item text="Right 2" align="Right"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
:deep(.e-toolbar) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
}
</style>
```

### Padding and Margins

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <template v-for="item in items" :key="item.id">
        <e-item 
          :text="item.text"
          :cssClass="item.cssClass"
        ></e-item>
      </template>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const items = ref([
  { id: 1, text: 'Compact', cssClass: 'compact-item' },
  { id: 2, text: 'Normal', cssClass: 'normal-item' },
  { id: 3, text: 'Spacious', cssClass: 'spacious-item' }
]);
</script>

<style scoped>
:deep(.compact-item) {
  padding: 4px 8px !important;
  margin: 0 2px !important;
}

:deep(.normal-item) {
  padding: 8px 12px !important;
  margin: 0 4px !important;
}

:deep(.spacious-item) {
  padding: 12px 16px !important;
  margin: 0 8px !important;
}
</style>
```

---

## Complete Styling Example

Professional toolbar with custom styling:

```vue
<template>
  <div class="editor-container">
    <ejs-toolbar class="rich-editor-toolbar" overflowMode="MultiRow">
      <e-items>
        <!-- File operations -->
        <e-item text="New" prefixIcon="e-new-icon" cssClass="file-btn"></e-item>
        <e-item text="Open" prefixIcon="e-open-icon" cssClass="file-btn"></e-item>
        <e-item text="Save" prefixIcon="e-save-icon" cssClass="file-btn"></e-item>
        <e-item type="Separator"></e-item>

        <!-- Text formatting -->
        <e-item text="Bold" prefixIcon="e-bold-icon" cssClass="format-btn"></e-item>
        <e-item text="Italic" prefixIcon="e-italic-icon" cssClass="format-btn"></e-item>
        <e-item text="Underline" prefixIcon="e-underline-icon" cssClass="format-btn"></e-item>
        <e-item type="Separator"></e-item>

        <!-- List operations -->
        <e-item text="Bullets" prefixIcon="e-bullets-icon" cssClass="list-btn"></e-item>
        <e-item text="Numbers" prefixIcon="e-numbers-icon" cssClass="list-btn"></e-item>
        <e-item type="Separator"></e-item>

        <!-- Right-aligned -->
        <e-item text="Help" prefixIcon="e-help-icon" align="Right" cssClass="help-btn"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
.editor-container {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.rich-editor-toolbar :deep(.e-toolbar) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.rich-editor-toolbar :deep(.e-toolbar-item) {
  margin: 6px;
}

.rich-editor-toolbar :deep(.e-tbar-btn) {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 10px 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
}

.rich-editor-toolbar :deep(.e-tbar-btn:hover) {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.rich-editor-toolbar :deep(.e-tbar-btn:active) {
  transform: translateY(0);
  background: rgba(255, 255, 255, 0.3);
}

.rich-editor-toolbar :deep(.file-btn) {
  border-left: 3px solid rgba(255, 255, 255, 0.5);
}

.rich-editor-toolbar :deep(.format-btn) {
  border-left: 3px solid rgba(255, 255, 255, 0.5);
}

.rich-editor-toolbar :deep(.list-btn) {
  border-left: 3px solid rgba(255, 255, 255, 0.5);
}

.rich-editor-toolbar :deep(.help-btn) {
  border-left: 3px solid #ffd700;
  background: rgba(255, 215, 0, 0.2);
}

.rich-editor-toolbar :deep(.help-btn:hover) {
  background: rgba(255, 215, 0, 0.3);
}

.rich-editor-toolbar :deep(.e-tbar-separator) {
  background: rgba(255, 255, 255, 0.3);
  margin: 0 8px;
}

.rich-editor-toolbar :deep(.e-tbar-icon) {
  font-size: 18px;
  margin-right: 6px;
}

.rich-editor-toolbar :deep(.e-tbar-text) {
  font-size: 13px;
  letter-spacing: 0.3px;
}
</style>
```

---

## Summary

Styling the Toolbar involves:
- **Themes**: Import built-in CSS for consistent design
- **CSS Classes**: Target `.e-toolbar`, `.e-tbar-btn`, `.e-tbar-item`
- **Scoped Styles**: Use `:deep()` for component-specific styling
- **Dynamic Classes**: Apply styles conditionally with `cssClass` prop
- **Icons**: Customize size, color, and effects
- **Layout**: Control width, alignment, spacing using CSS

Combine these techniques to create professional, branded toolbars matching your application's design system.
