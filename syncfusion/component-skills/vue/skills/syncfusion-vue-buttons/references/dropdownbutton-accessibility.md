# DropdownButton Accessibility

> Ensure Syncfusion DropdownButton meets WCAG 2.2 accessibility standards.

---

## Table of Contents

1. [WCAG 2.2 Compliance](#wcag-22-compliance)
2. [ARIA Attributes](#aria-attributes)
3. [Keyboard Navigation](#keyboard-navigation)
4. [Screen Reader Support](#screen-reader-support)
5. [Accessible Examples](#accessible-examples)

---

## WCAG 2.2 Compliance

Implement WCAG 2.2 Level AA compliance:

```vue
<template>
  <div class="example-section">
    <h2>WCAG 2.2 Compliant DropdownButton</h2>

    <ejs-dropdownbutton
      :items="menuItems"
      aria-label="File operations menu"
      aria-expanded="false"
      role="button"
      :aria-haspopup="true"
    >File</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      menuItems: [
        { text: 'New', id: 'new', htmlAttributes: { 'aria-label': 'Create new file' } },
        { text: 'Open', id: 'open', htmlAttributes: { 'aria-label': 'Open existing file' } },
        { text: 'Save', id: 'save', htmlAttributes: { 'aria-label': 'Save current file' } },
        { separator: true },
        { text: 'Exit', id: 'exit', htmlAttributes: { 'aria-label': 'Close application' } }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## ARIA Attributes

Implement proper ARIA attributes:

```vue
<template>
  <div class="example-section">
    <h2>ARIA Attributes</h2>

    <ejs-dropdownbutton
      :items="items"
      aria-label="Main navigation menu"
      role="menubutton"
      :aria-haspopup="true"
      aria-controls="dropdown-menu"
      aria-expanded="false"
      @open="onOpen"
      @close="onClose"
    ><span id="menu-label">Navigation</span></ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      items: [
        { text: 'Home', htmlAttributes: { role: 'menuitem' } },
        { text: 'About', htmlAttributes: { role: 'menuitem' } },
        { text: 'Services', htmlAttributes: { role: 'menuitem' } },
        { text: 'Contact', htmlAttributes: { role: 'menuitem' } }
      ]
    };
  },
  methods: {
    onOpen(args) {
      // Update aria-expanded
    },
    onClose(args) {
      // Update aria-expanded
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Keyboard Navigation

Support keyboard accessibility:

```vue
<template>
  <div class="example-section">
    <h2>Keyboard Navigation</h2>
    <p class="hint">
      <strong>Keyboard Shortcuts:</strong><br>
      Tab: Focus button • Enter/Space: Open menu • Arrow Down/Up: Navigate items •
      Escape: Close menu • First Letter: Jump to item
    </p>

    <ejs-dropdownbutton
      :items="items"
      @key-down="onKeyDown"
    >Edit</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      items: [
        { text: 'Cut', htmlAttributes: { 'data-shortcut': 'Ctrl+X' } },
        { text: 'Copy', htmlAttributes: { 'data-shortcut': 'Ctrl+C' } },
        { text: 'Paste', htmlAttributes: { 'data-shortcut': 'Ctrl+V' } },
        { separator: true },
        { text: 'Select All', htmlAttributes: { 'data-shortcut': 'Ctrl+A' } }
      ]
    };
  },
  methods: {
    onKeyDown(args) {
      // Component handles keyboard natively
      // Tab: Focus
      // Enter/Space: Open/Select
      // Arrow Keys: Navigate
      // Escape: Close
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.hint {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f0f7ff;
  border-left: 4px solid #1976d2;
  border-radius: 4px;
  font-size: 14px;
}
</style>
```

---

## Screen Reader Support

Ensure screen reader compatibility:

```vue
<template>
  <div class="example-section">
    <h2>Screen Reader Support</h2>

    <div role="region" aria-labelledby="actions-heading" aria-live="polite">
      <h3 id="actions-heading">Actions</h3>

      <ejs-dropdownbutton
        :items="items"
        aria-label="Actions menu"
        @select="onSelect"
      >Actions</ejs-dropdownbutton>

      <p v-if="lastAction" id="action-status" aria-live="assertive">
        Last action: {{ lastAction }}
      </p>
    </div>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      items: [
        {
          text: 'Save Document',
          htmlAttributes: {
            'aria-label': 'Save the current document'
          }
        },
        {
          text: 'Download',
          htmlAttributes: {
            'aria-label': 'Download document as file'
          }
        },
        {
          text: 'Share',
          htmlAttributes: {
            'aria-label': 'Share document with others'
          }
        }
      ],
      lastAction: ''
    };
  },
  methods: {
    onSelect(args) {
      this.lastAction = args.item ? args.item.text : 'Unknown action';
      console.log(`Action announced: ${this.lastAction}`);
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 0;
}

#action-status {
  margin-top: 15px;
  padding: 10px;
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
  border-radius: 4px;
}
</style>
```

---

## Accessible Examples

Complete accessible implementations:

### Accessible File Menu

```vue
<template>
  <div class="example-section">
    <h2>Accessible File Menu</h2>

    <nav role="navigation" aria-labelledby="file-menu-title">
      <h2 id="file-menu-title">File Operations</h2>

      <ejs-dropdownbutton
        :items="fileItems"
        aria-label="File menu operations"
        role="menubutton"
        @select="handleFileOperation"
      >File</ejs-dropdownbutton>
    </nav>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      fileItems: [
        {
          text: 'New',
          id: 'new',
          htmlAttributes: {
            role: 'menuitem',
            'aria-label': 'Create new file (Ctrl+N)'
          }
        },
        {
          text: 'Open',
          id: 'open',
          htmlAttributes: {
            role: 'menuitem',
            'aria-label': 'Open file (Ctrl+O)'
          }
        },
        {
          text: 'Save',
          id: 'save',
          htmlAttributes: {
            role: 'menuitem',
            'aria-label': 'Save file (Ctrl+S)'
          }
        },
        { separator: true },
        {
          text: 'Exit',
          id: 'exit',
          htmlAttributes: {
            role: 'menuitem',
            'aria-label': 'Close application (Alt+F4)'
          }
        }
      ]
    };
  },
  methods: {
    handleFileOperation(args) {
      switch (args.item ? args.item.id : null) {
        case 'new':
          console.log('Creating new file');
          break;
        case 'open':
          console.log('Opening file');
          break;
        case 'save':
          console.log('Saving file');
          break;
        case 'exit':
          console.log('Exiting application');
          break;
      }
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

nav {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
}

h2 {
  margin-top: 0;
}
</style>
```

### Accessible Toolbar

```vue
<template>
  <div class="example-section">
    <h2>Accessible Toolbar</h2>

    <div role="toolbar" aria-label="Formatting toolbar" class="toolbar">
      <ejs-dropdownbutton
        :items="styleItems"
        aria-label="Text style menu"
      >Styles</ejs-dropdownbutton>

      <ejs-dropdownbutton
        :items="formatItems"
        aria-label="Format menu"
      >Format</ejs-dropdownbutton>
    </div>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      styleItems: [
        {
          text: 'Heading 1',
          htmlAttributes: { 'aria-label': 'Heading 1 style' }
        },
        {
          text: 'Heading 2',
          htmlAttributes: { 'aria-label': 'Heading 2 style' }
        },
        {
          text: 'Body Text',
          htmlAttributes: { 'aria-label': 'Body text style' }
        }
      ],
      formatItems: [
        {
          text: 'Bold',
          htmlAttributes: { 'aria-label': 'Bold formatting (Ctrl+B)' }
        },
        {
          text: 'Italic',
          htmlAttributes: { 'aria-label': 'Italic formatting (Ctrl+I)' }
        },
        {
          text: 'Underline',
          htmlAttributes: { 'aria-label': 'Underline formatting (Ctrl+U)' }
        }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.toolbar {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
```

---

## Next Steps

- View complete API reference in [SKILL.md](../SKILL.md)
- Learn events in [dropdownbutton-events-and-interactivity.md](dropdownbutton-events-and-interactivity.md)
- Check item templates in [dropdownbutton-item-template.md](dropdownbutton-item-template.md)
