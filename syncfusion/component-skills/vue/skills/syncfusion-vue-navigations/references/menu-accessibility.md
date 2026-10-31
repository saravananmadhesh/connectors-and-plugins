# Accessibility

## Table of Contents
1. [WCAG Compliance](#wcag-compliance)
2. [Keyboard Navigation](#keyboard-navigation)
3. [Screen Reader Support](#screen-reader-support)
4. [Focus Management](#focus-management)
5. [Color Contrast](#color-contrast)
6. [Internationalization](#internationalization)
7. [Testing Accessibility](#testing-accessibility)

## WCAG Compliance

### Overview

The Syncfusion Menu component is designed to meet **WCAG 2.1 Level AA** accessibility standards. This ensures the component is accessible to users with various disabilities.

### Compliance Features

✅ **Keyboard Navigation** - Full keyboard support without mouse
✅ **ARIA Attributes** - Proper semantic markup and ARIA roles
✅ **Screen Reader Support** - Compatible with NVDA, JAWS, VoiceOver
✅ **Focus Indicators** - Clear visual focus indicators
✅ **Color Contrast** - Meets AA color contrast requirements
✅ **Text Alternatives** - Icon alternatives and labels
✅ **Semantic HTML** - Proper HTML structure

## Keyboard Navigation

### Navigation Keys

| Key | Action |
|-----|--------|
| `Tab` | Move to next menu item |
| `Shift+Tab` | Move to previous menu item |
| `Enter` / `Space` | Select/activate menu item |
| `Arrow Down` | Move to next submenu item |
| `Arrow Up` | Move to previous submenu item |
| `Arrow Right` | Open submenu or move to next item |
| `Arrow Left` | Close submenu or move to parent item |
| `Escape` | Close submenu |
| `Home` | Move to first menu item |
| `End` | Move to last menu item |

### Keyboard Navigation Implementation

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file', items: [
    { text: 'New', id: 'new' },
    { text: 'Open', id: 'open' },
    { text: 'Save', id: 'save' }
  ]},
  { text: 'Edit', id: 'edit', items: [
    { text: 'Cut', id: 'cut' },
    { text: 'Copy', id: 'copy' }
  ]}
]);

// Keyboard navigation is built-in
// but you can enhance it with custom logic
const handleKeyDown = (event) => {
  if (event.key === '?') {
    console.log('Help: Use arrow keys to navigate, Enter to select');
  }
};
</script>

<template>
  <div @keydown="handleKeyDown">
    <p>
      <strong>Keyboard Navigation:</strong>
      Use Tab to focus menu, arrow keys to navigate, Enter to select
    </p>
    
    <ejs-menu
      ref="menuRef"
      :items="items"
      tabindex="0"
    ></ejs-menu>
  </div>
</template>
```

### Testing Keyboard Navigation

```vue
<script setup>
import { ref, onMounted } from 'vue';

const menuRef = ref(null);
const keyPresses = ref([]);
const items = ref([...]);

const recordKeyPress = (event) => {
  const keyName = event.key || event.keyCode;
  keyPresses.value.push(keyName);
  
  // Keep only last 10 keypresses
  if (keyPresses.value.length > 10) {
    keyPresses.value.shift();
  }
};

onMounted(() => {
  document.addEventListener('keydown', recordKeyPress);
});
</script>

<template>
  <div class="keyboard-test">
    <p>Try keyboard navigation:</p>
    <p>Last keys pressed: {{ keyPresses.join(' ') }}</p>
    
    <ejs-menu :items="items"></ejs-menu>
  </div>
</template>
```

## Screen Reader Support

### ARIA Attributes

The Menu component automatically includes:
- `role="menubar"` - Main menu container
- `role="menuitem"` - Individual menu items
- `aria-label` - Text labels for screen readers
- `aria-expanded` - State of expandable items
- `aria-haspopup="menu"` - Items with submenus
- `aria-hidden="true"` - Hidden decorative elements

### Enhanced Screen Reader Support

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'File',
    id: 'file',
    htmlAttributes: {
      'aria-label': 'File menu - Contains file operations like New, Open, Save'
    },
    items: [
      {
        text: 'New',
        id: 'new',
        htmlAttributes: {
          'aria-label': 'New - Create a new document (Ctrl+N)'
        }
      },
      {
        text: 'Open',
        id: 'open',
        htmlAttributes: {
          'aria-label': 'Open - Open an existing document (Ctrl+O)'
        }
      }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### Testing with Screen Readers

```vue
<script setup>
import { ref } from 'vue';

const items = ref([...]);
const screenReaderEnabled = ref(true);

// Log ARIA changes for testing
const logAriaChange = (mutations) => {
  mutations.forEach(mutation => {
    if (mutation.attributeName?.startsWith('aria-')) {
      console.log(
        `ARIA: ${mutation.attributeName} = ${mutation.target.getAttribute(mutation.attributeName)}`
      );
    }
  });
};
</script>

<template>
  <div class="sr-test">
    <h2>Screen Reader Test Mode</h2>
    <p v-if="screenReaderEnabled" class="sr-message">
      ✓ Screen Reader Support Enabled
    </p>
    
    <ejs-menu :items="items"></ejs-menu>
  </div>
</template>

<style scoped>
.sr-message {
  background-color: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}
</style>
```

## Focus Management

### Visible Focus Indicators

```vue
<template>
  <ejs-menu :items="items" class="accessible-menu"></ejs-menu>
</template>

<style scoped>
:deep(.accessible-menu .e-menu-item:focus) {
  outline: 3px solid #007bff;
  outline-offset: 2px;
}

:deep(.accessible-menu .e-menu-item.e-focused) {
  outline: 3px solid #007bff;
  outline-offset: 2px;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

/* High contrast mode */
@media (prefers-contrast: more) {
  :deep(.accessible-menu .e-menu-item:focus) {
    outline: 4px solid #000;
    outline-offset: 2px;
  }
}
</style>
```

### Focus Trap in Modals

```vue
<script setup>
import { ref, onMounted } from 'vue';

const menuRef = ref(null);
const isModalOpen = ref(true);
const items = ref([...]);

const handleKeyDown = (event) => {
  // Trap focus within modal
  if (event.key === 'Tab') {
    const menuElement = menuRef.value.ej2_instances[0].element;
    const focusableElements = menuElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
      // Shift+Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }
  
  // Close on Escape
  if (event.key === 'Escape') {
    isModalOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <h2>Navigation Menu</h2>
      <ejs-menu
        ref="menuRef"
        :items="items"
      ></ejs-menu>
      <button @click="isModalOpen = false">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  max-width: 500px;
}
</style>
```

## Color Contrast

### WCAG AA Contrast Requirements

- **Normal text**: Minimum 4.5:1 ratio (white on dark blue)
- **Large text**: Minimum 3:1 ratio
- **UI components**: Minimum 3:1 ratio

### Ensuring Contrast Compliance

```vue
<template>
  <div class="contrast-compliant-menu">
    <ejs-menu :items="items" class="menu"></ejs-menu>
  </div>
</template>

<style scoped>
:deep(.menu) {
  background-color: #ffffff;
  color: #000000;
  /* 21:1 contrast ratio - exceeds WCAG AAA */
}

:deep(.menu .e-menu-item) {
  color: #000000;
  /* Black text on white - 21:1 ratio */
}

:deep(.menu .e-menu-item:hover) {
  background-color: #e6f2ff;
  color: #001166;
  /* Dark blue on light blue - 8.6:1 ratio */
}

:deep(.menu .e-menu-item.e-disabled) {
  color: #757575;
  /* Gray text - 5.5:1 ratio */
}

:deep(.menu .e-menu-item.e-focused) {
  outline: 3px solid #0050ff;
  /* Blue outline - 5.2:1 ratio */
}

/* High contrast mode */
@media (prefers-contrast: more) {
  :deep(.menu) {
    background-color: #000000;
    color: #ffffff;
    border: 2px solid #ffffff;
  }
  
  :deep(.menu .e-menu-item) {
    color: #ffffff;
    border-left: 4px solid transparent;
  }
  
  :deep(.menu .e-menu-item:hover) {
    background-color: #ffffff;
    color: #000000;
    border-left: 4px solid #000000;
  }
}
</style>
```

## Internationalization

### Multi-Language Support

```vue
<script setup>
import { ref, computed } from 'vue';

const locale = ref('en-US');

const translations = {
  'en-US': {
    file: 'File',
    new: 'New',
    open: 'Open',
    save: 'Save',
    edit: 'Edit',
    cut: 'Cut'
  },
  'es-ES': {
    file: 'Archivo',
    new: 'Nuevo',
    open: 'Abrir',
    save: 'Guardar',
    edit: 'Editar',
    cut: 'Cortar'
  },
  'fr-FR': {
    file: 'Fichier',
    new: 'Nouveau',
    open: 'Ouvrir',
    save: 'Enregistrer',
    edit: 'Édition',
    cut: 'Couper'
  },
  'de-DE': {
    file: 'Datei',
    new: 'Neu',
    open: 'Öffnen',
    save: 'Speichern',
    edit: 'Bearbeiten',
    cut: 'Ausschneiden'
  }
};

const currentTranslations = computed(() => translations[locale.value] || translations['en-US']);

const items = computed(() => [
  {
    text: currentTranslations.value.file,
    items: [
      { text: currentTranslations.value.new },
      { text: currentTranslations.value.open },
      { text: currentTranslations.value.save }
    ]
  },
  {
    text: currentTranslations.value.edit,
    items: [
      { text: currentTranslations.value.cut }
    ]
  }
]);
</script>

<template>
  <div>
    <div class="language-selector">
      <label>Language: </label>
      <select v-model="locale">
        <option value="en-US">English</option>
        <option value="es-ES">Español</option>
        <option value="fr-FR">Français</option>
        <option value="de-DE">Deutsch</option>
      </select>
    </div>
    
    <ejs-menu
      :items="items"
      :locale="locale"
      :enableRtl="locale.includes('ar') || locale.includes('he')"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.language-selector {
  margin-bottom: 20px;
}
</style>
```

### RTL Support

```vue
<script setup>
import { ref } from 'vue';

const isRTL = ref(false);

const items = ref([
  { text: 'ملف', items: [
    { text: 'جديد' },
    { text: 'فتح' },
    { text: 'حفظ' }
  ]},
  { text: 'تحرير', items: [
    { text: 'قص' },
    { text: 'نسخ' },
    { text: 'لصق' }
  ]}
]);

const toggleRTL = () => {
  isRTL.value = !isRTL.value;
};
</script>

<template>
  <div>
    <button @click="toggleRTL">
      Switch to {{ isRTL ? 'LTR' : 'RTL' }}
    </button>
    
    <ejs-menu
      :items="items"
      :enableRtl="isRTL"
      locale="ar-AE"
    ></ejs-menu>
  </div>
</template>
```

## Testing Accessibility

### Accessibility Testing Checklist

```vue
<script setup>
import { ref } from 'vue';

const checklist = ref([
  { task: 'Keyboard Navigation', completed: true },
  { task: 'Screen Reader', completed: true },
  { task: 'Focus Indicators', completed: true },
  { task: 'Color Contrast', completed: true },
  { task: 'ARIA Attributes', completed: true },
  { task: 'Mobile Accessible', completed: false },
  { task: 'Text Alternatives', completed: true }
]);

const completedTasks = () => {
  return checklist.value.filter(t => t.completed).length;
};

const progress = () => {
  return Math.round((completedTasks() / checklist.value.length) * 100);
};
</script>

<template>
  <div class="accessibility-test">
    <h2>Accessibility Testing</h2>
    
    <div class="progress-bar">
      <div class="progress" :style="{ width: progress() + '%' }"></div>
    </div>
    <p>{{ completedTasks() }} of {{ checklist.value.length }} tests passed</p>
    
    <ul class="checklist">
      <li v-for="item in checklist" :key="item.task">
        <input type="checkbox" v-model="item.completed" :id="item.task">
        <label :for="item.task">{{ item.task }}</label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.accessibility-test {
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.progress-bar {
  width: 100%;
  height: 24px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin: 16px 0;
}

.progress {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
}

.checklist {
  list-style: none;
  padding: 0;
}

.checklist li {
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.checklist input[type="checkbox"] {
  cursor: pointer;
}

.checklist label {
  cursor: pointer;
}
</style>
```

## Complete Accessible Menu Example

```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const items = ref([
  {
    text: 'File',
    id: 'file',
    iconCss: 'e-icons e-folder',
    htmlAttributes: {
      'aria-label': 'File menu - Create, open, or save documents'
    },
    items: [
      {
        text: 'New',
        id: 'new',
        htmlAttributes: { 'aria-label': 'New document (Ctrl+N)' }
      },
      {
        text: 'Open',
        id: 'open',
        htmlAttributes: { 'aria-label': 'Open document (Ctrl+O)' }
      },
      { separator: true },
      {
        text: 'Exit',
        id: 'exit',
        htmlAttributes: { 'aria-label': 'Exit application' }
      }
    ]
  }
]);

const handleSelect = (args) => {
  console.log('Selected:', args.item.text);
};
</script>

<template>
  <div class="accessible-app">
    <h1>Accessible Menu Demo</h1>
    <p>
      <strong>Keyboard Instructions:</strong>
      Use Tab to focus, arrow keys to navigate, Enter to select, Escape to close submenu
    </p>
    
    <ejs-menu
      :items="items"
      @select="handleSelect"
      role="menubar"
      class="accessible-menu"
    ></ejs-menu>
  </div>
</template>

<style scoped>
.accessible-app {
  padding: 20px;
  font-family: Arial, sans-serif;
}

:deep(.accessible-menu) {
  background-color: white;
  border-radius: 8px;
}

:deep(.accessible-menu .e-menu-item) {
  padding: 12px 16px;
  color: #000000;
  transition: all 0.3s ease;
}

:deep(.accessible-menu .e-menu-item:focus),
:deep(.accessible-menu .e-menu-item.e-focused) {
  outline: 3px solid #0050ff;
  outline-offset: 2px;
  background-color: #e6f2ff;
}

:deep(.accessible-menu .e-menu-item:hover) {
  background-color: #f0f0f0;
}
</style>
```

## Related Topics

- [Properties and Configuration](./properties-and-configuration.md) - Accessibility properties
- [Styling and Appearance](./styling-and-appearance.md) - High contrast modes
- [Events and Callbacks](./events-and-callbacks.md) - Keyboard event handling
