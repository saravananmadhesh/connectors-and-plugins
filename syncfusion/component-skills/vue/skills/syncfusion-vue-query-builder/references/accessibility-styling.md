# Accessibility and Styling in Vue Query Builder

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [Theme Customization](#theme-customization)
- [CSS Variables](#css-variables)
- [Responsive Design](#responsive-design)
- [Color Contrast](#color-contrast)
- [Focus Management](#focus-management)
- [Examples](#examples)
- [Best Practices](#best-practices)

---

## WCAG Compliance

Query Builder is built with WCAG 2.1 standards in mind.

### Compliance Levels

- **Level A** - Basic accessibility features
- **Level AA** - Enhanced accessibility (recommended)
- **Level AAA** - Enhanced accessibility (optimal)

Query Builder meets **WCAG 2.1 Level AA** by default.

### Key Features

✅ Semantic HTML markup  
✅ ARIA landmarks and labels  
✅ Keyboard navigation support  
✅ Color contrast ratios > 4.5:1  
✅ Focus indicators  
✅ Screen reader announcements  

---

## Keyboard Navigation

Users can operate Query Builder entirely with keyboard.

### Supported Keys

| Key | Action |
|-----|--------|
| `Tab` | Move focus between fields |
| `Shift + Tab` | Move focus backward |
| `Enter` | Activate buttons |
| `Space` | Select dropdown options |
| `ArrowUp/Down` | Navigate dropdown items |
| `Escape` | Close dropdowns/dialogs |

### Example

```vue
<template>
  <div>
    <label for="querybuilder">Filter by Criteria</label>
    <ejs-querybuilder 
      id="querybuilder"
      role="search"
      aria-label="Query builder filter interface">
      <!-- Users can navigate with Tab key -->
    </ejs-querybuilder>
  </div>
</template>
```

### Focus Order

1. Column dropdown
2. Operator dropdown
3. Value input
4. Delete button
5. Add rule button
6. Add group button

---

## ARIA Attributes

Use ARIA to enhance accessibility.

### Label Columns Clearly

```vue
<template>
  <ejs-querybuilder aria-label="Advanced search filters">
    <e-columns>
      <e-column 
        field='FirstName' 
        label='First Name' 
        type='string'
        aria-label="Filter by employee first name" />
      <e-column 
        field='Department' 
        label='Department' 
        type='string'
        aria-label="Filter by department" />
    </e-columns>
  </ejs-querybuilder>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  }
}
</script>
```

### Live Regions for Updates

```vue
<template>
  <div>
    <ejs-querybuilder 
      role="search"
      @change="onRuleChange">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
      </e-columns>
    </ejs-querybuilder>
    
    <!-- Live region for announcements -->
    <div 
      aria-live="polite" 
      aria-atomic="true"
      role="status">
      {{ accessibilityMessage }}
    </div>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data: function() {
    return {
      accessibilityMessage: ''
    };
  },
  methods: {
    onRuleChange: function() {
      this.accessibilityMessage = 'Filter rule updated. Current condition: and';
    }
  }
}
</script>
```

---

## Screen Reader Support

Query Builder works with screen readers like NVDA, JAWS, and VoiceOver.

### Screen Reader Friendly Setup

```vue
<template>
  <div class="filter-section">
    <!-- Landmark for search/filtering functionality -->
    <section aria-labelledby="filter-title" role="search">
      <h2 id="filter-title">Advanced Filter</h2>
      
      <ejs-querybuilder 
        aria-describedby="filter-help"
        role="application"
        aria-label="Query builder for filtering data">
        <e-columns>
          <e-column field='EmployeeID' label='Employee ID' type='number' />
          <e-column field='FirstName' label='First Name' type='string' />
        </e-columns>
      </ejs-querybuilder>
      
      <p id="filter-help" class="sr-only">
        Use this interface to create complex filter conditions. 
        Add rules, combine with AND/OR logic, and apply filters.
      </p>
    </section>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  }
}
</script>

<style>
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

### Button Labels

Ensure buttons have accessible names:

```vue
<button aria-label="Add new filter rule">
  <span aria-hidden="true">+</span> Add Rule
</button>

<button aria-label="Delete this filter rule">
  <span aria-hidden="true">×</span> Delete
</button>
```

---

## RTL (Right-to-Left) Support

Automatically mirror interface for RTL languages (Arabic, Hebrew, Urdu, etc.).

### Enable RTL

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <ejs-querybuilder :enableRtl="isRTL">
      <e-columns>
        <e-column field='Name' label='الاسم' type='string' />
        <e-column field='Age' label='العمر' type='number' />
      </e-columns>
    </ejs-querybuilder>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data: function() {
    return {
      isRTL: true  // Set based on user language
    };
  }
}
</script>
```

### RTL CSS

```css
/* RTL-specific styles automatically applied */
.e-query-builder[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

.e-query-builder[dir="rtl"] .e-rule {
  flex-direction: row-reverse;
}
```

### Language Labels

```javascript
const rtlLabels = {
  'ar': {
    addRule: 'إضافة قاعدة',
    deleteRule: 'حذف القاعدة',
    condition: 'شرط'
  },
  'he': {
    addRule: 'הוסף כלל',
    deleteRule: 'מחק כלל',
    condition: 'תנאי'
  }
};
```

---

## Theme Customization

Choose from built-in themes or create custom ones.

### Built-in Themes

Available themes:
- `material` - Material Design
- `material3` - Material 3
- `bootstrap` - Bootstrap 4
- `bootstrap5` - Bootstrap 5
- `fluent` - Microsoft Fluent
- `tailwind` - Tailwind CSS

### Theme Import

```vue
<style>
/* Material Theme (default) */
@import "@syncfusion/ej2-vue-querybuilder/styles/material.css";

/* Or use Material 3 */
@import "@syncfusion/ej2-vue-querybuilder/styles/material3.css";

/* Or Bootstrap 5 */
@import "@syncfusion/ej2-vue-querybuilder/styles/bootstrap5.css";
</style>
```

### Custom Theme Creation

```css
/* Override theme colors */
:root {
  --qb-primary-color: #007bff;
  --qb-secondary-color: #6c757d;
  --qb-success-color: #28a745;
  --qb-border-color: #dee2e6;
  --qb-text-color: #212529;
  --qb-background-color: #ffffff;
}

.e-query-builder {
  --primary: var(--qb-primary-color);
  --secondary: var(--qb-secondary-color);
}
```

---

## CSS Variables

Customize colors and spacing using CSS variables.

### Primary Variables

```css
:root {
  /* Colors */
  --e-color-primary: #007bff;
  --e-color-secondary: #6c757d;
  --e-color-success: #28a745;
  --e-color-danger: #dc3545;
  --e-color-warning: #ffc107;
  --e-color-info: #17a2b8;
  
  /* Spacing */
  --e-spacing-xs: 4px;
  --e-spacing-sm: 8px;
  --e-spacing-md: 12px;
  --e-spacing-lg: 16px;
  --e-spacing-xl: 24px;
  
  /* Borders */
  --e-border-radius: 4px;
  --e-border-width: 1px;
  
  /* Typography */
  --e-font-size-base: 14px;
  --e-font-weight-normal: 400;
  --e-font-weight-bold: 600;
}

.e-query-builder {
  color: var(--e-color-primary);
  border-radius: var(--e-border-radius);
  font-size: var(--e-font-size-base);
}
```

### Apply Custom Theme

```vue
<style scoped>
:root {
  --e-color-primary: #6200ea;
  --e-color-success: #00b050;
}

.my-querybuilder {
  background-color: #f5f5f5;
  padding: 16px;
}
</style>

<template>
  <ejs-querybuilder class="my-querybuilder">
    <!-- Query Builder -->
  </ejs-querybuilder>
</template>
```

---

## Responsive Design

Adapt Query Builder for mobile and desktop.

### Mobile-First Approach

```vue
<template>
  <div class="filter-container">
    <ejs-querybuilder 
      :width="isMobile ? '100%' : '70%'"
      :height="isMobile ? 'auto' : '400px'"
      class="query-builder">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
      </e-columns>
    </ejs-querybuilder>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data: function() {
    return {
      isMobile: window.innerWidth < 768
    };
  },
  mounted: function() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }
}
</script>

<style scoped>
.filter-container {
  padding: 16px;
}

@media (max-width: 768px) {
  .query-builder {
    width: 100% !important;
  }
  
  .e-rule {
    flex-direction: column;
    gap: 8px;
  }
  
  .e-rule-value {
    width: 100%;
  }
}
</style>
```

### Flexible Layout

```css
.e-query-builder {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 600px) {
  .e-query-builder {
    flex-direction: column;
  }
  
  .e-rule {
    width: 100%;
  }
  
  .e-dropdownlist,
  .e-input {
    width: 100%;
  }
}
```

---

## Color Contrast

Ensure sufficient contrast for readability.

### Minimum Contrast Ratios (WCAG AA)

- **Normal text:** 4.5:1
- **Large text:** 3:1
- **UI components:** 3:1

### Check Contrast

```vue
<style scoped>
/* Good contrast */
.filter-label {
  color: #212529;  /* Dark gray on white: 14:1 */
  background-color: #ffffff;
}

/* Avoid low contrast */
/* BAD: */
/* color: #cccccc; /* Gray on white: 1.5:1 (too low) */
</style>
```

### Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  .e-query-builder {
    background-color: #1e1e1e;
    color: #e0e0e0;
    border-color: #424242;
  }
  
  .e-input {
    background-color: #2a2a2a;
    color: #ffffff;
  }
}
```

---

## Focus Management

Provide clear focus indicators for keyboard navigation.

### Custom Focus Styles

```css
/* Focus visible states */
.e-query-builder .e-input:focus-visible,
.e-query-builder .e-dropdownlist:focus-visible,
.e-query-builder button:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
.e-query-builder *:focus:not(:focus-visible) {
  outline: none;
}
```

### Focus Trap

```vue
<script>
export default {
  methods: {
    manageFocus: function() {
      const focusableElements = this.$refs.querybuilder.$el
        .querySelectorAll('button, input, [tabindex]');
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      // Trap focus within Query Builder
      lastElement.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
          e.preventDefault();
          firstElement.focus();
        }
      });
    }
  }
}
</script>
```

---

## Examples

### Example 1: Fully Accessible Query Builder

```vue
<template>
  <section 
    aria-labelledby="filter-title"
    class="filter-section">
    <h2 id="filter-title">Advanced Filter Options</h2>
    
    <ejs-querybuilder 
      ref="querybuilder"
      role="application"
      aria-label="Query builder for advanced filtering"
      aria-describedby="filter-help"
      :enableRtl="isRTL"
      @change="announceUpdate">
      <e-columns>
        <e-column 
          field='Name' 
          label='Employee Name' 
          type='string'
          aria-label="Filter by employee name" />
        <e-column 
          field='Salary' 
          label='Salary' 
          type='number'
          aria-label="Filter by salary amount" />
      </e-columns>
    </ejs-querybuilder>
    
    <p id="filter-help" class="sr-only">
      Use Tab key to navigate. Enter to activate buttons. Escape to close dropdowns.
    </p>
    
    <div 
      aria-live="polite"
      aria-atomic="true"
      role="status"
      class="sr-only">
      {{ accessibilityAnnouncement }}
    </div>
  </section>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data: function() {
    return {
      isRTL: false,
      accessibilityAnnouncement: ''
    };
  },
  methods: {
    announceUpdate: function() {
      this.accessibilityAnnouncement = 'Filter updated successfully';
    }
  }
}
</script>

<style scoped>
.filter-section {
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

h2 {
  color: #212529;
  margin: 0 0 16px 0;
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

/* High contrast mode support */
@media (prefers-contrast: more) {
  .filter-section {
    border: 2px solid #000;
    background-color: #ffffff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .e-query-builder * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
```

### Example 2: Dark Mode with Accessibility

```vue
<template>
  <div :class="{ 'dark-mode': darkMode }">
    <button @click="darkMode = !darkMode" aria-label="Toggle dark mode">
      {{ darkMode ? '☀️ Light' : '🌙 Dark' }}
    </button>
    
    <ejs-querybuilder>
      <!-- Query Builder -->
    </ejs-querybuilder>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
    };
  }
}
</script>

<style scoped>
/* Light mode (default) */
.e-query-builder {
  background-color: #ffffff;
  color: #212529;
  border-color: #dee2e6;
}

/* Dark mode */
.dark-mode .e-query-builder {
  background-color: #1e1e1e;
  color: #e0e0e0;
  border-color: #424242;
}

.dark-mode .e-input,
.dark-mode .e-dropdownlist {
  background-color: #2a2a2a;
  color: #ffffff;
  border-color: #424242;
}

/* Focus indicators */
.e-query-builder *:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
}

.dark-mode .e-query-builder *:focus-visible {
  outline-color: #66b2ff;
}
</style>
```

---

## Best Practices

### 1. Always Provide Labels
```vue
<!-- Good -->
<label for="name-column">Filter by Name</label>
<ejs-querybuilder id="name-column">

<!-- Avoid -->
<ejs-querybuilder>  <!-- No label -->
```

### 2. Test with Screen Readers
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (Mac/iOS)
- TalkBack (Android)

### 3. Keyboard Navigation Testing
Test Tab, Shift+Tab, Enter, Space, Escape, Arrow keys

### 4. Color Contrast Tools
Use tools like:
- WebAIM Contrast Checker
- Contrast Ratio Tool
- Color Contrast Analyzer

### 5. Support Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### 6. Test with Multiple Themes
Test with Material, Bootstrap, Fluent themes

### 7. Responsive Testing
Test on mobile, tablet, desktop with different zoom levels

---

## Next Steps

- See [getting-started.md](getting-started.md) for setup
- See [rules-and-filtering.md](rules-and-filtering.md) for functionality
- See [templates.md](templates.md) for custom UI considerations
