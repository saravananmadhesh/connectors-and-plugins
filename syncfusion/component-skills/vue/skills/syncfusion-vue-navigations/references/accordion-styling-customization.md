# Styling & Customization

## Table of Contents
- [CSS Classes](#css-classes)
- [Built-in Themes](#built-in-themes)
- [Custom Styling](#custom-styling)
- [RTL Support](#rtl-support)
- [Responsive Design](#responsive-design)
- [Theme Variables](#theme-variables)

## CSS Classes

Syncfusion Accordion uses standard CSS classes for styling individual elements:

### Main Accordion Container

```css
.e-accordion {
  /* Main accordion wrapper */
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
```

### Accordion Items

```css
.e-accordion-item {
  /* Individual accordion item container */
  border-bottom: 1px solid #e0e0e0;
}

.e-accordion-item:last-child {
  border-bottom: none;
}
```

### Header Styles

```css
.e-accordion-header {
  /* Item header/title area */
  padding: 12px 16px;
  background-color: #f5f5f5;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.e-accordion-header:hover {
  background-color: #efefef;
}

.e-accordion-header.e-selected {
  /* Header of expanded item */
  background-color: #e3f2fd;
  color: #1976d2;
}
```

### Content Styles

```css
.e-accordion-content {
  /* Item content area */
  padding: 16px;
  background-color: #ffffff;
  display: none;
}

.e-accordion-content.e-show {
  /* Content of expanded item */
  display: block;
}
```

### Icon Styles

```css
.e-accordion-header .e-expand-icon {
  /* Expand/collapse icon */
  transition: transform 0.3s ease;
}

.e-accordion-header.e-selected .e-expand-icon {
  /* Icon rotation when expanded */
  transform: rotate(180deg);
}
```

## Applying Custom CSS

### Scoped Styling in Vue SFC

```vue
<template>
  <div class="accordion-wrapper">
    <ejs-accordion class="custom-accordion">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Content 1" />
        <e-accordion-item header="Item 2" content="Content 2" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>

<style scoped>
.accordion-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.custom-accordion :deep(.e-accordion-header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 16px;
  padding: 14px 18px;
  border-radius: 4px 4px 0 0;
}

.custom-accordion :deep(.e-accordion-header:hover) {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.custom-accordion :deep(.e-accordion-content) {
  background-color: #f9f9f9;
  border-left: 4px solid #667eea;
}
</style>
```

### Modern Gradient Style

```vue
<template>
  <ejs-accordion class="modern-accordion">
    <e-accordion-items>
      <e-accordion-item header="Feature One" content="Feature One Content" />
      <e-accordion-item header="Feature Two" content="Feature Two Content" />
      <e-accordion-item header="Feature Three" content="Feature Three Content" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>

<style scoped>
.modern-accordion :deep(.e-accordion) {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
}

.modern-accordion :deep(.e-accordion-item) {
  border-bottom: 1px solid #e5e7eb;
}

.modern-accordion :deep(.e-accordion-header) {
  background: white;
  color: #1f2937;
  font-weight: 600;
  padding: 16px;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
}

.modern-accordion :deep(.e-accordion-header:hover) {
  background-color: #f3f4f6;
  border-left-color: #3b82f6;
}

.modern-accordion :deep(.e-accordion-header.e-selected) {
  background-color: #eff6ff;
  border-left-color: #3b82f6;
  color: #1e40af;
}

.modern-accordion :deep(.e-accordion-content) {
  background-color: #fafafa;
  border-left: 4px solid #3b82f6;
  color: #374151;
}
</style>
```

### Minimal Style

```vue
<template>
  <ejs-accordion class="minimal-accordion">
    <e-accordion-items>
      <e-accordion-item header="Simple" content="Content A" />
      <e-accordion-item header="Clean" content="Content B" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>

<style scoped>
.minimal-accordion :deep(.e-accordion) {
  border: none;
  box-shadow: none;
}

.minimal-accordion :deep(.e-accordion-item) {
  border: none;
  border-bottom: 2px solid #e5e7eb;
}

.minimal-accordion :deep(.e-accordion-header) {
  background: transparent;
  padding: 12px 0;
  font-size: 15px;
  color: #111827;
  border: none;
}

.minimal-accordion :deep(.e-accordion-header.e-selected) {
  background: transparent;
  color: #6366f1;
  font-weight: 700;
}

.minimal-accordion :deep(.e-accordion-content) {
  background: transparent;
  border: none;
  padding: 12px 0;
  color: #6b7280;
}
</style>
```

## Built-in Themes

Syncfusion Accordion includes several professional themes. Import the desired theme in your component:

### Available Themes

```vue
<script setup>
// Import one of the following themes:

// Tailwind 3
import '@syncfusion/ej2-vue-navigations/styles/tailwind3.css';

// Bootstrap 5.3
import '@syncfusion/ej2-vue-navigations/styles/bootstrap5.3.css';

// Fluent 2
import '@syncfusion/ej2-vue-navigations/styles/fluent2.css';

// Material 3
import '@syncfusion/ej2-vue-navigations/styles/material3.css';

// Fabric
import '@syncfusion/ej2-vue-navigations/styles/fabric.css';

// High Contrast
import '@syncfusion/ej2-vue-navigations/styles/highcontrast.css';
</script>
```

### Theme Switching

```vue
<template>
  <div>
    <div style="margin-bottom: 20px">
      <label>Select Theme:</label>
      <select v-model="currentTheme" @change="switchTheme">
        <option value="tailwind3">Tailwind 3</option>
        <option value="bootstrap5">Bootstrap 5</option>
        <option value="fluent2">Fluent 2</option>
        <option value="material3">Material 3</option>
      </select>
    </div>

    <ejs-accordion>
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Content 1" />
        <e-accordion-item header="Item 2" content="Content 2" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const currentTheme = ref('tailwind3');

const switchTheme = async () => {
  // Dynamically load theme based on selection
  const themeMap = {
    tailwind3: '@syncfusion/ej2-vue-navigations/styles/tailwind3.css',
    bootstrap5: '@syncfusion/ej2-vue-navigations/styles/bootstrap5.3.css',
    fluent2: '@syncfusion/ej2-vue-navigations/styles/fluent2.css',
    material3: '@syncfusion/ej2-vue-navigations/styles/material3.css'
  };

  // Remove existing theme link
  const existingLink = document.getElementById('theme-link');
  if (existingLink) {
    existingLink.remove();
  }

  // Add new theme link
  const link = document.createElement('link');
  link.id = 'theme-link';
  link.rel = 'stylesheet';
  link.href = themeMap[currentTheme.value];
  document.head.appendChild(link);
};
</script>

<style scoped>
select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
</style>
```

## Custom Styling

### Bootstrap Integration

```vue
<template>
  <div class="container">
    <ejs-accordion class="accordion-bootstrap">
      <e-accordion-items>
        <e-accordion-item header="Bootstrap Header 1" content="Bootstrap Content 1" />
        <e-accordion-item header="Bootstrap Header 2" content="Bootstrap Content 2" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import '@syncfusion/ej2-vue-navigations/styles/bootstrap5.3.css';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>

<style scoped>
.accordion-bootstrap :deep(.e-accordion-header) {
  background-color: #0d6efd;
  color: white;
  border-radius: 4px;
  margin-bottom: 8px;
}

.accordion-bootstrap :deep(.e-accordion-header:hover) {
  background-color: #0b5ed7;
}

.accordion-bootstrap :deep(.e-accordion-content) {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0 0 4px 4px;
}
</style>
```

### Tailwind CSS Integration

```vue
<template>
  <ejs-accordion class="accordion-tailwind">
    <e-accordion-items>
      <e-accordion-item header="TailwindCSS Item 1" content="Tailwind Content 1" />
      <e-accordion-item header="TailwindCSS Item 2" content="Tailwind Content 2" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import '@syncfusion/ej2-vue-navigations/styles/tailwind3.css';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>

<style scoped>
.accordion-tailwind :deep(.e-accordion-header) {
  @apply bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-4 py-3 rounded-t;
}

.accordion-tailwind :deep(.e-accordion-header:hover) {
  @apply bg-gradient-to-r from-purple-700 to-blue-700;
}

.accordion-tailwind :deep(.e-accordion-content) {
  @apply bg-gray-50 px-4 py-3 rounded-b;
}
</style>
```

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL languages:

### RTL Basic Setup

```vue
<template>
  <div dir="rtl">
    <ejs-accordion>
      <e-accordion-items>
        <e-accordion-item header="العنوان الأول" content="المحتوى الأول" />
        <e-accordion-item header="العنوان الثاني" content="المحتوى الثاني" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>
```

### RTL with Language Toggle

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'" style="padding: 20px">
    <button @click="toggleLanguage" style="margin-bottom: 20px">
      {{ isRTL ? 'English' : 'العربية' }}
    </button>

    <ejs-accordion>
      <e-accordion-items>
        <e-accordion-item :header="headers[0]" :content="contents[0]" />
        <e-accordion-item :header="headers[1]" :content="contents[1]" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const isRTL = ref(false);

const headers = ref(['English Title', 'العنوان العربي']);
const contents = ref(['English content here', 'المحتوى العربي هنا']);

const toggleLanguage = () => {
  isRTL.value = !isRTL.value;
};
</script>
```

## Responsive Design

### Mobile-Responsive Accordion

```vue
<template>
  <ejs-accordion class="responsive-accordion">
    <e-accordion-items>
      <e-accordion-item header="Responsive Item 1" content="Content adapts to screen size" />
      <e-accordion-item header="Responsive Item 2" content="Mobile-friendly layout" />
      <e-accordion-item header="Responsive Item 3" content="Touch-friendly on mobile" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>

<style scoped>
.responsive-accordion :deep(.e-accordion) {
  width: 100%;
  max-width: 100%;
}

.responsive-accordion :deep(.e-accordion-header) {
  padding: 16px;
  font-size: 16px;
}

.responsive-accordion :deep(.e-accordion-content) {
  padding: 16px;
  font-size: 14px;
}

/* Tablet Styles */
@media (max-width: 768px) {
  .responsive-accordion :deep(.e-accordion-header) {
    padding: 12px;
    font-size: 15px;
  }

  .responsive-accordion :deep(.e-accordion-content) {
    padding: 12px;
    font-size: 13px;
  }
}

/* Mobile Styles */
@media (max-width: 480px) {
  .responsive-accordion :deep(.e-accordion-header) {
    padding: 10px 12px;
    font-size: 14px;
  }

  .responsive-accordion :deep(.e-accordion-content) {
    padding: 10px 12px;
    font-size: 12px;
  }

  .responsive-accordion :deep(.e-accordion-header .e-expand-icon) {
    width: 20px;
    height: 20px;
  }
}
</style>
```

### Fluid Width Accordion

```vue
<template>
  <div class="accordion-container">
    <ejs-accordion class="fluid-accordion">
      <e-accordion-items>
        <e-accordion-item header="Flexible Width 1" content="Fills available space" />
        <e-accordion-item header="Flexible Width 2" content="Responsive to container" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>

<style scoped>
.accordion-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.fluid-accordion :deep(.e-accordion) {
  width: 100%;
}
</style>
```

## Theme Variables

### Customizing Color Variables

```vue
<template>
  <ejs-accordion class="custom-theme">
    <e-accordion-items>
      <e-accordion-item header="Item 1" content="Content 1" />
      <e-accordion-item header="Item 2" content="Content 2" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>

<style>
:root {
  --primary-color: #5e35b1;
  --primary-hover: #512da8;
  --bg-light: #f3e5f5;
  --border-color: #e0bef7;
  --text-color: #333333;
}

.custom-theme :deep(.e-accordion-header) {
  background-color: var(--primary-color);
  color: white;
  transition: background-color 0.3s;
}

.custom-theme :deep(.e-accordion-header:hover) {
  background-color: var(--primary-hover);
}

.custom-theme :deep(.e-accordion-header.e-selected) {
  background-color: var(--primary-color);
}

.custom-theme :deep(.e-accordion-content) {
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.custom-theme :deep(.e-accordion) {
  border-color: var(--border-color);
}
</style>
```

### Dark Mode Support

```vue
<template>
  <div class="theme-wrapper" :class="{ dark: isDarkMode }">
    <button @click="toggleDarkMode" style="margin-bottom: 15px">
      {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
    </button>

    <ejs-accordion class="themed-accordion">
      <e-accordion-items>
        <e-accordion-item header="Light/Dark Support" content="Adapts to system theme" />
        <e-accordion-item header="Dark Mode" content="Easy on the eyes" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<style scoped>
.theme-wrapper {
  background-color: #ffffff;
  color: #333333;
  padding: 20px;
  transition: background-color 0.3s, color 0.3s;
}

.theme-wrapper.dark {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

.theme-wrapper.dark :deep(.e-accordion) {
  background-color: #2a2a2a;
  border-color: #404040;
}

.theme-wrapper.dark :deep(.e-accordion-header) {
  background-color: #404040;
  color: #e0e0e0;
  border-color: #505050;
}

.theme-wrapper.dark :deep(.e-accordion-header:hover) {
  background-color: #505050;
}

.theme-wrapper.dark :deep(.e-accordion-content) {
  background-color: #2a2a2a;
  color: #b0b0b0;
}

button {
  padding: 8px 16px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #5568d3;
}
</style>
```

---

## Best Practices

1. **Use scoped styles** - Prevent style conflicts with `:deep()` combinator
2. **Leverage existing themes** - Start with built-in themes before customizing
3. **Test responsiveness** - Use browser DevTools to test mobile sizes
4. **Maintain contrast** - Ensure adequate color contrast for accessibility
5. **Performance** - Use CSS variables instead of inline styles for better performance
6. **Consistency** - Use a design system or utility-first approach (like Tailwind)

## Troubleshooting

**Issue: Styles not applying**
- Use `:deep()` combinator for scoped style overrides
- Check CSS specificity conflicts
- Ensure theme CSS is imported before custom styles

**Issue: RTL not working**
- Verify `dir="rtl"` is set on parent container
- Check that RTL-aware CSS is loaded
- Test with RTL-compatible fonts

**Issue: Theme not changing dynamically**
- Load theme CSS before switching
- Consider pre-loading multiple themes
- Force component re-render after theme change
