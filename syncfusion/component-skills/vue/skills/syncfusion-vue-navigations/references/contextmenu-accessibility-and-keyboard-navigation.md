# Accessibility and Keyboard Navigation

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Focus Management](#focus-management)

## WCAG Compliance

The Syncfusion ContextMenu component supports WCAG 2.2 Level AA accessibility standards:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit', iconCss: 'e-icons e-edit' },
  { text: 'Delete', id: 'delete', iconCss: 'e-icons e-delete' },
  { text: 'Archive', id: 'archive', iconCss: 'e-icons e-folder' }
])

// Best practices for WCAG compliance
const contextMenuRef = ref(null)
const focusedItem = ref(null)

const handleCreated = () => {
  // Component is now fully initialized and accessible
  const instance = contextMenuRef.value?.ej2_instances[0]
  console.log('ContextMenu ready for accessible interaction')
}

const handleSelect = (args) => {
  // Announce action to screen readers
  const announcement = `${args.item.text} selected`
  announceToScreenReaders(announcement)
}

const announceToScreenReaders = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  setTimeout(() => announcement.remove(), 1000)
}
</script>

<template>
  <div>
    <div id="target" role="region" aria-label="Context menu trigger area">
      Right click to open context menu
    </div>
    
    <ejs-contextmenu
      ref="contextMenuRef"
      target="#target"
      :items="items"
      @created="handleCreated"
      @select="handleSelect"
    ></ejs-contextmenu>
    
    <!-- Screen reader only text -->
    <div class="sr-only">
      Context menu available. Press right mouse button or use keyboard menu key.
    </div>
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

#target {
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>
```

## ARIA Attributes

Proper ARIA attributes ensure screen reader compatibility:

```vue
<script setup>
import { ref } from 'vue'

interface AccessibleItem {
  text: string
  id: string
  description?: string
  disabled?: boolean
}

const items = ref<AccessibleItem[]>([
  { text: 'Create New Document', id: 'create', description: 'Create a new document' },
  { text: 'Open Document', id: 'open', description: 'Open an existing document' },
  { text: 'Delete Document', id: 'delete', description: 'Delete the selected document' }
])

const handleBeforeItemRender = (args) => {
  const item = args.item as AccessibleItem

  // Add ARIA labels
  args.element.setAttribute('role', 'menuitem')
  if (item.disabled) {
    args.element.setAttribute('aria-disabled', 'true')
  }

  // Add description as aria-label for better context
  if (item.description) {
    args.element.setAttribute('aria-label', `${item.text}. ${item.description}`)
  }

  // Add keyboard shortcut information if available
  if (item.id === 'create') {
    args.element.setAttribute('aria-label', `${item.text}. Keyboard shortcut: Ctrl+N`)
  }
}

const handleOpen = () => {
  // Announce menu opening to screen readers
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', 'assertive')
  announcement.className = 'sr-only'
  announcement.textContent = 'Context menu opened with 3 options. Use arrow keys to navigate.'
  document.body.appendChild(announcement)
  
  setTimeout(() => announcement.remove(), 3000)
}
</script>

<template>
  <div>
    <div id="target" 
         role="region" 
         aria-label="Example content area"
         aria-describedby="menu-instructions">
      Right click to open context menu
    </div>
    
    <div id="menu-instructions" class="sr-only">
      Use right mouse button to open context menu. Navigate with arrow keys. Press Enter to select.
    </div>
    
    <ejs-contextmenu
      target="#target"
      :items="items"
      @beforeItemRender="handleBeforeItemRender"
      @onOpen="handleOpen"
    ></ejs-contextmenu>
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

#target {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #fafafa;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
```

## Keyboard Navigation

### Navigation Keys

| Key | Action |
|-----|--------|
| Arrow Up | Move to previous item |
| Arrow Down | Move to next item |
| Arrow Right | Open submenu |
| Arrow Left | Close submenu |
| Enter/Space | Select current item |
| Esc | Close menu |
| Home | Go to first item |
| End | Go to last item |
| Tab | Next focusable element |

### Implementation Example

```vue
<script setup>
import { ref, onMounted } from 'vue'

const items = ref([
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' },
  { text: 'Paste', id: 'paste' },
  {
    text: 'Format',
    id: 'format',
    items: [
      { text: 'Bold', id: 'bold' },
      { text: 'Italic', id: 'italic' },
      { text: 'Underline', id: 'underline' }
    ]
  }
])

const contextMenuRef = ref(null)
const lastKeyPressed = ref('')

const handleKeyDown = (event) => {
  lastKeyPressed.value = event.key

  const contextMenu = contextMenuRef.value?.ej2_instances[0]
  if (!contextMenu) return

  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      console.log('Move to previous item')
      break
    case 'ArrowDown':
      event.preventDefault()
      console.log('Move to next item')
      break
    case 'ArrowRight':
      event.preventDefault()
      console.log('Open submenu')
      break
    case 'ArrowLeft':
      event.preventDefault()
      console.log('Close submenu')
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      console.log('Select item')
      break
    case 'Escape':
      event.preventDefault()
      contextMenu.close()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div>
    <p class="keyboard-hint">Last key pressed: <strong>{{ lastKeyPressed || 'None' }}</strong></p>
    
    <div id="target">
      Right click or use Ctrl+Shift+X to open menu
    </div>
    
    <ejs-contextmenu
      ref="contextMenuRef"
      target="#target"
      :items="items"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.keyboard-hint {
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
}

#target {
  padding: 20px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
}
</style>
```

## Screen Reader Support

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Save Document', id: 'save', shortcut: 'Ctrl+S' },
  { text: 'Print', id: 'print', shortcut: 'Ctrl+P' },
  { separator: true },
  { text: 'Exit', id: 'exit', shortcut: 'Alt+F4' }
])

const handleBeforeItemRender = (args) => {
  const item = args.item

  // Create screen reader text
  let screenReaderText = item.text
  if (item.shortcut) {
    screenReaderText += `, keyboard shortcut ${item.shortcut}`
  }

  // Set aria-label with full context
  args.element.setAttribute('aria-label', screenReaderText)

  // Add title attribute for tooltip
  if (item.shortcut) {
    args.element.setAttribute('title', `${item.text} (${item.shortcut})`)
  }
}

const handleSelect = (args) => {
  // Announce action to screen reader
  const message = `${args.item.text} has been selected`
  announceToScreenReader(message)
}

const announceToScreenReader = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)
  setTimeout(() => announcement.remove(), 2000)
}
</script>

<template>
  <div>
    <div id="target" aria-label="Content area for context menu demonstration">
      Right click to open menu
    </div>
    
    <ejs-contextmenu
      target="#target"
      :items="items"
      @beforeItemRender="handleBeforeItemRender"
      @select="handleSelect"
    ></ejs-contextmenu>
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

#target {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
}
</style>
```

## RTL Support

Enable Right-to-Left support for Arabic, Hebrew, and other RTL languages:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'تحرير', id: 'edit' },      // Edit in Arabic
  { text: 'حذف', id: 'delete' },       // Delete in Arabic
  { text: 'نسخ', id: 'copy' }          // Copy in Arabic
])

const enableRtl = ref(false)
const language = ref('en')

const toggleRTL = () => {
  enableRtl.value = !enableRtl.value
  if (enableRtl.value) {
    document.documentElement.setAttribute('dir', 'rtl')
    language.value = 'ar'
  } else {
    document.documentElement.setAttribute('dir', 'ltr')
    language.value = 'en'
  }
}
</script>

<template>
  <div>
    <button @click="toggleRTL" class="rtl-toggle">
      {{ enableRtl ? 'Switch to LTR' : 'Switch to RTL' }}
    </button>

    <div id="target" class="target-area">
      Right click to open menu
    </div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      :enableRtl="enableRtl"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.rtl-toggle {
  margin-bottom: 20px;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
}

:root[dir='rtl'] .target-area {
  text-align: right;
}

.target-area {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
}
</style>
```

## Focus Management

Implement proper focus management for accessibility:

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const items = ref([
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' },
  { text: 'Share', id: 'share' }
])

const contextMenuRef = ref(null)
const previousFocus = ref(null)
const isMenuOpen = ref(false)

const handleBeforeOpen = (args) => {
  // Store the element that had focus before menu opened
  previousFocus.value = document.activeElement
  isMenuOpen.value = true
}

const handleClose = () => {
  isMenuOpen.value = false
  
  // Restore focus to the element that triggered the menu
  if (previousFocus.value && previousFocus.value.focus) {
    setTimeout(() => {
      previousFocus.value.focus()
    }, 100)
  }
}

const handleSelect = (args) => {
  handleClose()
}

// Trap focus within menu when open
const handleKeyDown = (event) => {
  if (!isMenuOpen.value) return

  if (event.key === 'Tab') {
    // Prevent focus from leaving the menu
    const menuElement = contextMenuRef.value?.querySelector('.e-contextmenu')
    if (menuElement && !menuElement.contains(event.target)) {
      event.preventDefault()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div>
    <button id="trigger" @click="$refs.target.focus()">
      Focus trigger area
    </button>

    <div ref="target" id="target" tabindex="0" class="focus-area">
      Right click to open context menu (focus area)
    </div>

    <ejs-contextmenu
      ref="contextMenuRef"
      target="#target"
      :items="items"
      @beforeOpen="handleBeforeOpen"
      @onClose="handleClose"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
button {
  padding: 10px 16px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.focus-area {
  padding: 40px;
  border: 2px solid #2196f3;
  background-color: #f0f7ff;
  border-radius: 4px;
  outline: none;
}

.focus-area:focus {
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
}
</style>
```

## Complete Accessible Implementation

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const items = ref([
  { text: 'Create New File', id: 'new', iconCss: 'e-icons e-plus', description: 'Create a new file' },
  { text: 'Open File', id: 'open', iconCss: 'e-icons e-folder-open', description: 'Open an existing file' },
  { separator: true },
  { text: 'Delete File', id: 'delete', iconCss: 'e-icons e-delete', description: 'Delete the file permanently' }
])

const contextMenuRef = ref(null)
const previousFocus = ref(null)
const lastAction = ref('')

const handleBeforeOpen = (args) => {
  previousFocus.value = document.activeElement
  announceStatus('Context menu opened')
}

const handleBeforeItemRender = (args) => {
  const item = args.item

  // Set accessible attributes
  args.element.setAttribute('role', 'menuitem')
  args.element.setAttribute('tabindex', '-1')

  if (item.id?.startsWith('sep')) {
    args.element.setAttribute('role', 'separator')
  }

  // Create accessible label
  let label = item.text
  if (item.description) {
    label += `. ${item.description}`
  }
  args.element.setAttribute('aria-label', label)
}

const handleSelect = (args) => {
  lastAction.value = `Selected: ${args.item.text}`
  announceStatus(`${args.item.text} selected`)
  
  if (previousFocus.value?.focus) {
    setTimeout(() => previousFocus.value.focus(), 100)
  }
}

const announceStatus = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)
  setTimeout(() => announcement.remove(), 2000)
}

onMounted(() => {
  // Set document language for screen readers
  document.documentElement.lang = 'en'
})
</script>

<template>
  <div class="accessible-menu">
    <h1>Accessible Context Menu Example</h1>

    <p class="instructions">
      Right-click on the area below to open the context menu.
      Use arrow keys to navigate and Enter to select.
    </p>

    <div id="target"
         role="region"
         aria-label="Context menu demonstration area"
         class="target-area">
      Right-click here to open the context menu
    </div>

    <div v-if="lastAction" role="status" class="action-feedback">
      {{ lastAction }}
    </div>

    <ejs-contextmenu
      ref="contextMenuRef"
      target="#target"
      :items="items"
      @beforeOpen="handleBeforeOpen"
      @beforeItemRender="handleBeforeItemRender"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.accessible-menu {
  max-width: 600px;
  margin: 20px auto;
}

.instructions {
  font-size: 14px;
  color: #666;
  margin: 20px 0;
  padding: 15px;
  background-color: #f0f7ff;
  border-left: 4px solid #2196f3;
}

.target-area {
  padding: 40px;
  border: 2px dashed #999;
  background-color: #f9f9f9;
  border-radius: 4px;
  cursor: context-menu;
  text-align: center;
  margin: 20px 0;
}

.target-area:focus {
  outline: 2px solid #2196f3;
  background-color: #f0f7ff;
}

.action-feedback {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
  color: #2e7d32;
}

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

## Best Practices

1. **Always provide ARIA labels:** Help screen reader users understand menu items
2. **Manage focus properly:** Store and restore focus when menu opens/closes
3. **Use keyboard shortcuts:** Document shortcuts like Ctrl+S
4. **Test with screen readers:** Test with NVDA, JAWS, or VoiceOver
5. **Provide alt text:** Add descriptive text for icons
6. **Support RTL languages:** Enable RTL mode for international users
7. **High contrast mode:** Ensure sufficient color contrast (WCAG AA: 4.5:1 for text)
8. **Keyboard navigation:** Ensure all features work with keyboard only
