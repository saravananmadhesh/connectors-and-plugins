# Accessibility

Ensure your breadcrumb implementation meets WCAG 2.2 accessibility standards and provides an inclusive experience for all users.

## Accessibility Standards

The Syncfusion breadcrumb component complies with:
- **WCAG 2.2 Level AA** - Web Content Accessibility Guidelines Level AA
- **WCAG 2.2 Level AAA** - Highest accessibility standards
- **Section 508** - U.S. federal accessibility requirements
- **ADA** - Americans with Disabilities Act compliance
- **ARIA** - Accessible Rich Internet Applications standards

## ARIA Attributes

Breadcrumb components should use semantic HTML and ARIA attributes for screen readers:

### Basic ARIA Setup

```vue
<template>
  <nav aria-label="Breadcrumb">
    <ejs-breadcrumb 
      :items="items"
      enableNavigation
      @itemClick="handleItemClick"
    ></ejs-breadcrumb>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/', id: 'home' },
  { text: 'Products', url: '/products', id: 'products' },
  { text: 'Electronics', url: '/products/electronics', id: 'electronics' }
])

const handleItemClick = (args) => {
  // Navigation logic
}
</script>
```

### ARIA Labels for Items

Add descriptive ARIA labels to breadcrumb items:

```vue
<template>
  <nav aria-label="Breadcrumb navigation">
    <ejs-breadcrumb 
      :items="items"
      @beforeItemRender="addAriaLabels"
    ></ejs-breadcrumb>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/', isActive: false },
  { text: 'Products', url: '/products', isActive: false },
  { text: 'Current', url: '/products/current', isActive: true }
])

const addAriaLabels = (args) => {
  // Add aria-label to each item
  args.element.setAttribute('aria-label', args.item.text)
  
  // Mark current page with aria-current
  if (args.item.isActive) {
    args.element.setAttribute('aria-current', 'page')
  }
  
  // Add aria-disabled for disabled items
  if (args.item.disabled) {
    args.element.setAttribute('aria-disabled', 'true')
  }
}
</script>
```

### Complete ARIA Example

```vue
<template>
  <nav aria-label="Breadcrumb navigation" role="navigation">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="item.id">
        <a 
          :href="item.url"
          :aria-label="`Navigate to ${item.text}`"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
          :aria-disabled="item.disabled ? 'true' : undefined"
          class="breadcrumb-link"
        >
          {{ item.text }}
        </a>
        <span 
          v-if="index < items.length - 1"
          aria-hidden="true"
          class="breadcrumb-separator"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: 'Home', url: '/', disabled: false },
  { id: 2, text: 'Products', url: '/products', disabled: false },
  { id: 3, text: 'Electronics', url: '/products/electronics', disabled: false }
])
</script>

<style scoped>
.breadcrumb-list {
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-link {
  text-decoration: none;
  color: #0066cc;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-link:focus {
  outline: 2px solid #4285f4;
  outline-offset: 2px;
}

.breadcrumb-separator {
  color: #999;
}
</style>
```

## Keyboard Navigation

Users should be able to navigate breadcrumbs using keyboard:

### Tab Navigation

```vue
<template>
  <ejs-breadcrumb 
    :items="items"
    enableNavigation
    @beforeItemRender="enableKeyboardNav"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Current', url: '/current' }
])

const enableKeyboardNav = (args) => {
  // Make breadcrumb items keyboard focusable
  args.element.tabIndex = 0
  
  // Add keyboard event listener
  args.element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      args.element.click()
    }
  })
}
</script>

<style>
.e-breadcrumb-item:focus {
  outline: 2px solid #4285f4;
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
```

### Supported Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Move to next breadcrumb item |
| Shift+Tab | Move to previous breadcrumb item |
| Enter | Activate breadcrumb link |
| Space | Activate breadcrumb link |

## Screen Reader Support

Ensure screen readers properly announce breadcrumb navigation:

### Tested Screen Readers

- **JAWS** (Job Access With Speech) - Windows
- **NVDA** (NonVisual Desktop Access) - Windows
- **VoiceOver** - macOS and iOS
- **Narrator** - Windows 10+
- **TalkBack** - Android

### Screen Reader Friendly Code

```vue
<template>
  <nav 
    aria-label="Breadcrumb"
    role="navigation"
  >
    <ol class="breadcrumb">
      <li v-for="(item, index) in items" :key="item.id">
        <a 
          :href="item.url"
          :aria-label="`${item.text}${index === items.length - 1 ? ' (current page)' : ''}`"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.text }}
        </a>
        <span v-if="index < items.length - 1" aria-hidden="true">
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: 'Home', url: '/' },
  { id: 2, text: 'Products', url: '/products' },
  { id: 3, text: 'Electronics', url: '/electronics' }
])
</script>

<style scoped>
.breadcrumb {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 4px;
}

.breadcrumb a:focus {
  outline: 2px solid #2196f3;
  outline-offset: 2px;
}
</style>
```

### Testing with Screen Readers

1. **JAWS (Windows):**
   - Press Insert + H to open help
   - Use Insert + Right Arrow to navigate
   - Press Enter to activate links

2. **NVDA (Windows):**
   - Enable focus mode: Ctrl + Space
   - Tab to navigate items
   - Enter to activate

3. **VoiceOver (Mac):**
   - Control + Option + Right Arrow to navigate
   - Control + Option + Space to activate
   - VO (Control + Option) + U for rotor

## Best Practices

### 1. Provide Meaningful URLs

Use descriptive URLs instead of IDs:

```vue
<!-- Good -->
<ejs-breadcrumb :items="items"></ejs-breadcrumb>

<script setup>
const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' }
])
</script>
```

### 2. Label Navigation Sections

```vue
<template>
  <nav aria-label="Breadcrumb navigation">
    <ejs-breadcrumb :items="items"></ejs-breadcrumb>
  </nav>
</template>
```

### 3. Use Semantic HTML

```vue
<template>
  <nav>
    <ol>
      <li v-for="item in items" :key="item.id">
        <a :href="item.url">{{ item.text }}</a>
      </li>
    </ol>
  </nav>
</template>
```

### 4. Color Contrast

Ensure sufficient color contrast (WCAG AA: 4.5:1 for normal text):

```css
.breadcrumb-link {
  color: #0066cc; /* Good contrast on white background */
}

.breadcrumb-link:hover {
  color: #004399; /* Even better contrast */
}

.breadcrumb-link:visited {
  color: #663399; /* Sufficient contrast */
}
```

### 5. Text with Icons

Always include text labels with icons:

```vue
<template>
  <ejs-breadcrumb :items="items">
    <template #itemTemplate="{ data }">
      <span>
        <i v-if="data.iconCss" :class="data.iconCss" aria-hidden="true"></i>
        <span>{{ data.text }}</span>
      </span>
    </template>
  </ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', iconCss: 'e-icons e-home' },
  { text: 'Products', iconCss: 'e-icons e-box' },
  { text: 'Current', iconCss: 'e-icons e-location' }
])
</script>
```

### 6. Meaningful Visual Indicators

Use focus indicators for keyboard navigation:

```css
.e-breadcrumb-item:focus {
  outline: 2px solid #2196f3;
  outline-offset: 2px;
  background-color: #f0f7ff;
  border-radius: 3px;
}

.e-breadcrumb-item:active {
  background-color: #e3f2fd;
}
```

### 7. Optional Navigation

Make breadcrumb navigation optional:

```vue
<template>
  <div>
    <p>Your current location:</p>
    <ejs-breadcrumb 
      :items="items" 
      :enableNavigation="allowNavigation"
    ></ejs-breadcrumb>
    <p v-if="!allowNavigation">Navigation disabled in this context.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const allowNavigation = ref(true)
const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Current Page', url: '/current' }
])
</script>
```

## RTL (Right-to-Left) Support

Ensure breadcrumbs work correctly in RTL languages:

### Enabling RTL

```vue
<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'">
    <ejs-breadcrumb 
      :items="items"
      :enableRtl="isRtl"
    ></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isRtl = ref(false)

const items = ref([
  { text: 'الرئيسية', url: '/' }, // Home in Arabic
  { text: 'المنتجات', url: '/products' }, // Products
  { text: 'الحالي', url: '/current' } // Current
])

const toggleRtl = () => {
  isRtl.value = !isRtl.value
}
</script>
```

### RTL CSS Adjustments

```css
[dir="rtl"] .breadcrumb {
  flex-direction: row-reverse;
}

[dir="rtl"] .breadcrumb-separator {
  margin-left: 4px;
  margin-right: 0;
}

[dir="rtl"] .breadcrumb-link {
  padding-right: 8px;
  padding-left: 0;
}
```

## Complete Accessible Breadcrumb Example

```vue
<template>
  <nav 
    aria-label="Breadcrumb"
    role="navigation"
    :dir="isRtl ? 'rtl' : 'ltr'"
    class="accessible-breadcrumb"
  >
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="item.id">
        <a 
          :href="item.url"
          :aria-label="`Navigate to ${item.text}${index === items.length - 1 ? ' (current page)' : ''}`"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
          :aria-disabled="item.disabled ? 'true' : undefined"
          :class="{ disabled: item.disabled, current: index === items.length - 1 }"
          @click="!item.disabled && navigateTo(item.url)"
          @keydown.enter="!item.disabled && navigateTo(item.url)"
        >
          <i v-if="item.iconCss" :class="item.iconCss" aria-hidden="true"></i>
          <span>{{ item.text }}</span>
        </a>
        <span 
          v-if="index < items.length - 1"
          aria-hidden="true"
          class="breadcrumb-separator"
        >
          /
        </span>
      </li>
    </ol>
  </nav>

  <div class="accessibility-info">
    <label>
      <input v-model="isRtl" type="checkbox" />
      Enable RTL Mode (Test with Arabic/Hebrew text)
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isRtl = ref(false)

const items = ref([
  { id: 1, text: 'Home', url: '/', disabled: false, iconCss: 'e-icons e-home' },
  { id: 2, text: 'Products', url: '/products', disabled: false, iconCss: 'e-icons e-box' },
  { id: 3, text: 'Electronics', url: '/products/electronics', disabled: false },
  { id: 4, text: 'Smartphones', url: '/products/electronics/smartphones', disabled: false }
])

const navigateTo = (url) => {
  window.location.href = url
}
</script>

<style scoped>
.accessible-breadcrumb {
  padding: 12px 16px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.breadcrumb-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.breadcrumb-list a {
  color: #0066cc;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.breadcrumb-list a:hover:not(.disabled) {
  color: #004399;
  background-color: #f0f7ff;
  text-decoration: underline;
}

.breadcrumb-list a:focus {
  outline: 2px solid #2196f3;
  outline-offset: 2px;
  background-color: #e3f2fd;
}

.breadcrumb-list a.disabled {
  color: #999;
  cursor: not-allowed;
  opacity: 0.6;
}

.breadcrumb-list a.current {
  color: #333;
  font-weight: 600;
  cursor: default;
}

.breadcrumb-separator {
  color: #999;
  margin: 0 4px;
}

[dir="rtl"] .breadcrumb-list {
  flex-direction: row-reverse;
}

[dir="rtl"] .breadcrumb-separator {
  margin: 0 -4px 0 4px;
}

.accessibility-info {
  margin-top: 20px;
  padding: 12px;
  background-color: #f0f7ff;
  border-left: 4px solid #2196f3;
  border-radius: 3px;
}

.accessibility-info label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
</style>
```

## Testing Accessibility

### Automated Testing Tools

1. **axe DevTools** - Browser extension for automated accessibility testing
2. **WAVE** - WebAIM accessibility evaluation tool
3. **Lighthouse** - Built into Chrome DevTools
4. **Accessibility Checker** - VS Code extension

### Manual Testing Checklist

- [ ] All breadcrumb items are keyboard focusable
- [ ] Focus indicators are visible (outline or highlight)
- [ ] Tab order is logical
- [ ] Screen reader announces breadcrumb navigation properly
- [ ] ARIA labels are descriptive
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] Icons have text alternatives
- [ ] RTL layout displays correctly
- [ ] Disabled items are properly marked

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [Syncfusion Accessibility](https://www.syncfusion.com/accessibility)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Component Registration

For the official Syncfusion Vue UG registration pattern, use Options API with `export default`:

**Local Import:**
```typescript
import { BreadcrumbComponent } from "@syncfusion/ej2-vue-navigations";

export default {
  name: "App",
  components: {
    'ejs-breadcrumb': BreadcrumbComponent
  }
}
```

**Global Registration (main.ts):**
```typescript
import { createApp } from 'vue'
import { BreadcrumbComponent } from '@syncfusion/ej2-vue-navigations'

const app = createApp(App)
app.component('ejs-breadcrumb', BreadcrumbComponent)
app.mount('#app')
```
