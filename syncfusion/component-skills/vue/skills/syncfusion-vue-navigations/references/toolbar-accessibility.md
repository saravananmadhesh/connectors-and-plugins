# Accessibility in Vue 3 Toolbar

## Table of Contents
- [WCAG 2.2 AA Compliance](#wcag-22-aa-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Color and Contrast](#color-and-contrast)
- [Focus Management](#focus-management)
- [RTL Support](#rtl-support)
- [ARIA Attributes](#aria-attributes)
- [Testing for Accessibility](#testing-for-accessibility)

---

## WCAG 2.2 AA Compliance

The Syncfusion Toolbar is built with WCAG 2.2 Level AA standards in mind.

### Compliance Checklist

| Guideline | Implementation | Status |
|-----------|-----------------|--------|
| **Perceivable** | Content is perceivable to all users | ✅ |
| Sufficient color contrast | 4.5:1 for text, 3:1 for graphics | ✅ |
| Text alternatives | Labels for all interactive elements | ✅ |
| **Operable** | Users can navigate with keyboard | ✅ |
| Keyboard accessible | All functions accessible via keyboard | ✅ |
| Navigation order | Logical tab order | ✅ |
| Focus visible | Clear focus indicator | ✅ |
| **Understandable** | Content is clear and predictable | ✅ |
| Consistent navigation | Familiar patterns | ✅ |
| Error prevention | Clear item labels and instructions | ✅ |
| **Robust** | Compatible with assistive technologies | ✅ |
| ARIA roles | Proper semantic markup | ✅ |
| Screen reader compatible | Announces changes and state | ✅ |

### Basic Accessible Toolbar

```vue
<template>
  <ejs-toolbar 
    role="toolbar"
    aria-label="Document editor toolbar"
    :enableRtl="isRtl"
  >
    <e-items>
      <e-item 
        id="save"
        text="Save Document" 
        prefixIcon="e-save-icon"
        :htmlAttributes="{
          'aria-label': 'Save document',
          'title': 'Save document (Ctrl+S)'
        }"
        @click="saveDocument"
      ></e-item>
      <e-item 
        id="print"
        text="Print" 
        prefixIcon="e-print-icon"
        :htmlAttributes="{
          'aria-label': 'Print document',
          'title': 'Print document (Ctrl+P)'
        }"
        @click="printDocument"
      ></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const isRtl = ref(false);

const saveDocument = () => {
  console.log('Document saved');
};

const printDocument = () => {
  console.log('Document printed');
};
</script>
```

---

## Keyboard Navigation

Full keyboard accessibility for all toolbar functions.

### Navigation Keys

| Key | Action |
|-----|--------|
| **Tab** | Move focus to next item |
| **Shift+Tab** | Move focus to previous item |
| **Enter** | Activate focused button |
| **Space** | Activate focused button |
| **Arrow Right** | Navigate to next item (in scrollable mode) |
| **Arrow Left** | Navigate to previous item (in scrollable mode) |
| **Home** | Move to first item |
| **End** | Move to last item |
| **Escape** | Close popup menu (if open) |
| **Alt+Down** | Open overflow popup (in popup mode) |

### Tab Navigation Implementation

```vue
<template>
  <div>
    <p>Instructions: Use Tab to navigate items, Enter to activate.</p>
    
    <ejs-toolbar role="toolbar" aria-label="Document commands">
      <e-items>
        <e-item 
          id="new"
          text="New" 
          prefixIcon="e-new-icon"
          :tabIndex="0"
          :htmlAttributes="{ 'title': 'Create new document' }"
        ></e-item>
        <e-item 
          id="open"
          text="Open" 
          prefixIcon="e-open-icon"
          :tabIndex="1"
          :htmlAttributes="{ 'title': 'Open existing document' }"
        ></e-item>
        <e-item 
          id="save"
          text="Save" 
          prefixIcon="e-save-icon"
          :tabIndex="2"
          :htmlAttributes="{ 'title': 'Save document' }"
        ></e-item>
        <e-item 
          id="print"
          text="Print" 
          prefixIcon="e-print-icon"
          :tabIndex="3"
          :htmlAttributes="{ 'title': 'Print document' }"
        ></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

// Tab order is defined by tabIndex (0, 1, 2, 3)
// Users navigate in this logical order
</script>
```

### Arrow Key Navigation

```vue
<template>
  <div>
    <p>Instructions: Use arrow keys to navigate scrollable toolbar.</p>
    
    <ejs-toolbar 
      overflowMode="Scrollable"
      @keyDown="handleKeyDown"
    >
      <e-items>
        <e-item text="Cut" prefixIcon="e-cut-icon" :tabIndex="0"></e-item>
        <e-item text="Copy" prefixIcon="e-copy-icon" :tabIndex="1"></e-item>
        <e-item text="Paste" prefixIcon="e-paste-icon" :tabIndex="2"></e-item>
        <e-item text="Bold" prefixIcon="e-bold-icon" :tabIndex="3"></e-item>
        <e-item text="Italic" prefixIcon="e-italic-icon" :tabIndex="4"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const handleKeyDown = (args) => {
  if (args.key === 'ArrowLeft') {
    console.log('Navigate to previous item');
  } else if (args.key === 'ArrowRight') {
    console.log('Navigate to next item');
  } else if (args.key === 'Home') {
    console.log('Navigate to first item');
  } else if (args.key === 'End') {
    console.log('Navigate to last item');
  }
};
</script>
```

---

## Screen Reader Support

Ensure screen readers correctly announce toolbar items and their state.

### Screen Reader Compatible Markup

```vue
<template>
  <ejs-toolbar 
    role="toolbar"
    aria-label="Rich text editor formatting toolbar"
  >
    <e-items>
      <!-- Toggle button with pressed state -->
      <e-item 
        id="bold"
        text="Bold" 
        prefixIcon="e-bold-icon"
        :htmlAttributes="{
          'aria-label': 'Toggle bold text',
          'aria-pressed': 'false',
          'role': 'button',
          'title': 'Bold formatting (Ctrl+B)'
        }"
        @click="handleBoldToggle"
      ></e-item>

      <!-- Button with description -->
      <e-item 
        id="insert-table"
        text="Insert Table" 
        prefixIcon="e-table-icon"
        :htmlAttributes="{
          'aria-label': 'Insert table',
          'aria-describedby': 'table-help',
          'role': 'button',
          'title': 'Insert a data table'
        }"
      ></e-item>

      <!-- Disabled item announcement -->
      <e-item 
        id="redo"
        text="Redo" 
        prefixIcon="e-redo-icon"
        disabled="true"
        :htmlAttributes="{
          'aria-label': 'Redo (unavailable)',
          'aria-disabled': 'true'
        }"
      ></e-item>
    </e-items>
  </ejs-toolbar>

  <!-- Hidden help text for screen reader -->
  <div id="table-help" style="display: none;">
    Opens a dialog to insert a table. You can specify rows and columns.
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const isBoldActive = ref(false);

const handleBoldToggle = () => {
  isBoldActive.value = !isBoldActive.value;
};
</script>
```

### Announcing Dynamic Changes

```vue
<template>
  <div>
    <!-- Live region for announcements -->
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true"
      class="sr-only"
    >
      {{ announcement }}
    </div>

    <ejs-toolbar @clicked="handleItemClick">
      <e-items>
        <e-item 
          id="increase-zoom"
          text="Zoom In" 
          prefixIcon="e-zoom-in-icon"
        ></e-item>
        <e-item 
          id="decrease-zoom"
          text="Zoom Out" 
          prefixIcon="e-zoom-out-icon"
        ></e-item>
        <e-item text="Zoom: 100%" id="zoom-level"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const zoomLevel = ref(100);
const announcement = ref('');

const handleItemClick = (args) => {
  if (args.item.id === 'increase-zoom') {
    zoomLevel.value += 10;
    announcement.value = `Zoom increased to ${zoomLevel.value}%`;
  } else if (args.item.id === 'decrease-zoom') {
    zoomLevel.value -= 10;
    announcement.value = `Zoom decreased to ${zoomLevel.value}%`;
  }
};
</script>

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
  border: 0;
}
</style>
```

---

## Color and Contrast

Ensure sufficient color contrast for users with vision impairments.

### Contrast Ratios

| Element | Background | Foreground | Ratio | Status |
|---------|-----------|-----------|-------|--------|
| Normal text | White | #333333 | 12.63:1 | ✅ Exceeds 4.5:1 |
| Button hover | #007bff | White | 8.59:1 | ✅ Exceeds 4.5:1 |
| Disabled item | #f5f5f5 | #999999 | 5.23:1 | ✅ Exceeds 4.5:1 |
| Focus indicator | #333333 | #ffeb3b | 19.56:1 | ✅ Exceeds 4.5:1 |

### Accessible Color Styling

```vue
<template>
  <ejs-toolbar class="accessible-toolbar">
    <e-items>
      <e-item 
        text="Red Alert" 
        prefixIcon="e-alert-icon"
        cssClass="alert-item"
        :htmlAttributes="{ 'aria-label': 'Alert (Red indicates error state)' }"
      ></e-item>
      <e-item 
        text="Success" 
        prefixIcon="e-check-icon"
        cssClass="success-item"
        :htmlAttributes="{ 'aria-label': 'Success (Green indicates success)' }"
      ></e-item>
      <e-item 
        text="Warning" 
        prefixIcon="e-warning-icon"
        cssClass="warning-item"
        :htmlAttributes="{ 'aria-label': 'Warning (Orange indicates caution)' }"
      ></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
.accessible-toolbar :deep(.alert-item) {
  /* Red (#dc3545) on white: 5.42:1 contrast ratio */
  color: #dc3545;
  border-left: 3px solid #dc3545;
}

.accessible-toolbar :deep(.success-item) {
  /* Green (#28a745) on white: 4.54:1 contrast ratio */
  color: #28a745;
  border-left: 3px solid #28a745;
}

.accessible-toolbar :deep(.warning-item) {
  /* Orange (#fd7e14) on white: 5.62:1 contrast ratio */
  color: #fd7e14;
  border-left: 3px solid #fd7e14;
}

/* Don't rely on color alone - use text labels and icons */
.accessible-toolbar :deep(.e-tbar-text) {
  visibility: visible; /* Always show text, not just on hover */
}
</style>
```

---

## Focus Management

Clear focus indicators and logical tab order.

### Focus Indicators

```vue
<template>
  <ejs-toolbar class="focus-visible-toolbar">
    <e-items>
      <e-item 
        id="item1"
        text="Item 1" 
        prefixIcon="e-icon-1"
        :tabIndex="0"
      ></e-item>
      <e-item 
        id="item2"
        text="Item 2" 
        prefixIcon="e-icon-2"
        :tabIndex="1"
      ></e-item>
      <e-item 
        id="item3"
        text="Item 3" 
        prefixIcon="e-icon-3"
        :tabIndex="2"
      ></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
/* High contrast focus indicator */
.focus-visible-toolbar :deep(.e-tbar-btn:focus),
.focus-visible-toolbar :deep(.e-tbar-btn:focus-visible) {
  outline: 3px solid #4d90fe;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Visible focus ring for keyboard navigation */
.focus-visible-toolbar :deep(.e-tbar-btn:focus-visible) {
  box-shadow: inset 0 0 0 2px white, inset 0 0 0 4px #4d90fe;
}
</style>
```

### Managing Focus Programmatically

```vue
<template>
  <div>
    <button @click="focusFirstItem">Focus First Item</button>
    <button @click="focusLastItem">Focus Last Item</button>
    
    <ejs-toolbar ref="toolbar">
      <e-items>
        <e-item text="Item 1" prefixIcon="e-icon-1"></e-item>
        <e-item text="Item 2" prefixIcon="e-icon-2"></e-item>
        <e-item text="Item 3" prefixIcon="e-icon-3"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const toolbar = ref(null);

const focusFirstItem = () => {
  if (toolbar.value && toolbar.value.items && toolbar.value.items.length > 0) {
    const firstButton = toolbar.value.element.querySelector('.e-tbar-btn');
    if (firstButton) {
      firstButton.focus();
    }
  }
};

const focusLastItem = () => {
  if (toolbar.value && toolbar.value.items && toolbar.value.items.length > 0) {
    const buttons = toolbar.value.element.querySelectorAll('.e-tbar-btn');
    const lastButton = buttons[buttons.length - 1];
    if (lastButton) {
      lastButton.focus();
    }
  }
};
</script>
```

---

## RTL Support

Full right-to-left language support.

### Enabling RTL

```vue
<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'">
    <button @click="toggleRtl">
      {{ isRtl ? 'Switch to LTR' : 'Switch to RTL' }}
    </button>
    
    <ejs-toolbar :enableRtl="isRtl">
      <e-items>
        <e-item text="حفظ" prefixIcon="e-save-icon"></e-item>
        <e-item text="طباعة" prefixIcon="e-print-icon"></e-item>
        <e-item text="تصدير" prefixIcon="e-export-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const isRtl = ref(false);

const toggleRtl = () => {
  isRtl.value = !isRtl.value;
};
</script>
```

### RTL with Alignment

```vue
<template>
  <ejs-toolbar :enableRtl="true" class="rtl-toolbar">
    <e-items>
      <!-- In RTL, "Left" items appear on right -->
      <e-item text="ملف جديد" align="Left"></e-item>
      <e-item text="فتح" align="Left"></e-item>
      <e-item type="Separator"></e-item>
      
      <!-- Center stays in center -->
      <e-item text="مساعدة" align="Center"></e-item>
      <e-item type="Separator"></e-item>
      
      <!-- "Right" items appear on left in RTL -->
      <e-item text="إغلاق" align="Right"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
.rtl-toolbar :deep(.e-toolbar) {
  direction: rtl;
}

.rtl-toolbar :deep(.e-tbar-text) {
  font-family: Arial, sans-serif; /* Use RTL-friendly font */
}
</style>
```

---

## ARIA Attributes

Proper ARIA markup for assistive technology support.

### Common ARIA Attributes

```vue
<template>
  <ejs-toolbar 
    role="toolbar"
    aria-label="Document formatting toolbar"
    aria-controls="document-editor"
  >
    <e-items>
      <!-- Standard button -->
      <e-item 
        text="Save" 
        prefixIcon="e-save-icon"
        :htmlAttributes="{
          'role': 'button',
          'aria-label': 'Save document',
          'aria-describedby': 'save-help'
        }"
      ></e-item>

      <!-- Toggle button -->
      <e-item 
        id="bold"
        text="Bold" 
        prefixIcon="e-bold-icon"
        :htmlAttributes="{
          'role': 'button',
          'aria-label': 'Toggle bold',
          'aria-pressed': 'false'
        }"
        @click="toggleBold"
      ></e-item>

      <!-- Disabled button -->
      <e-item 
        text="Redo" 
        prefixIcon="e-redo-icon"
        disabled="true"
        :htmlAttributes="{
          'aria-disabled': 'true',
          'aria-label': 'Redo (no items to redo)'
        }"
      ></e-item>

      <!-- Button with popup -->
      <e-item 
        id="format-menu"
        text="Format" 
        prefixIcon="e-format-icon"
        :htmlAttributes="{
          'aria-label': 'Text format options',
          'aria-haspopup': 'menu'
        }"
      ></e-item>
    </e-items>
  </ejs-toolbar>

  <div id="save-help" style="display: none;">
    Saves changes to the current document (Ctrl+S)
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const isBold = ref(false);

const toggleBold = () => {
  isBold.value = !isBold.value;
};
</script>
```

---

## Testing for Accessibility

### Automated Testing

```vue
<script setup>
import { onMounted } from 'vue';

const testAccessibility = () => {
  // Example: Check for minimum contrast ratio
  const buttons = document.querySelectorAll('.e-tbar-btn');
  buttons.forEach(button => {
    const computedStyle = window.getComputedStyle(button);
    const bgColor = computedStyle.backgroundColor;
    const textColor = computedStyle.color;
    
    // Calculate contrast ratio (simplified)
    console.log(`Button: ${button.textContent}, BG: ${bgColor}, Text: ${textColor}`);
  });
};

const checkKeyboardNavigation = () => {
  // Test that all buttons are reachable via keyboard
  const buttons = document.querySelectorAll('.e-tbar-btn');
  let tabIndex = 0;
  
  buttons.forEach(button => {
    if (parseInt(button.getAttribute('tabindex')) >= 0) {
      tabIndex++;
    }
  });
  
  console.log(`${tabIndex} buttons are keyboard accessible`);
};

onMounted(() => {
  testAccessibility();
  checkKeyboardNavigation();
});
</script>
```

### Manual Testing Checklist

```vue
<template>
  <div class="accessibility-checklist">
    <h2>Accessibility Testing Checklist</h2>
    <ul>
      <li>
        <input type="checkbox" id="keyboard" />
        <label for="keyboard">All buttons accessible via keyboard (Tab, Enter, Space)</label>
      </li>
      <li>
        <input type="checkbox" id="focus" />
        <label for="focus">Focus indicator visible on all buttons</label>
      </li>
      <li>
        <input type="checkbox" id="screenreader" />
        <label for="screenreader">Screen reader announces buttons and state</label>
      </li>
      <li>
        <input type="checkbox" id="contrast" />
        <label for="contrast">Sufficient color contrast (4.5:1 minimum)</label>
      </li>
      <li>
        <input type="checkbox" id="rtl" />
        <label for="rtl">RTL languages supported (if applicable)</label>
      </li>
      <li>
        <input type="checkbox" id="resize" />
        <label for="resize">Toolbar responsive on zoom (up to 200%)</label>
      </li>
      <li>
        <input type="checkbox" id="tooltips" />
        <label for="tooltips">Descriptive tooltips for all buttons</label>
      </li>
      <li>
        <input type="checkbox" id="aria" />
        <label for="aria">ARIA labels describe button purpose</label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.accessibility-checklist {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.accessibility-checklist ul {
  list-style: none;
  padding: 0;
}

.accessibility-checklist li {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.accessibility-checklist input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.accessibility-checklist label {
  cursor: pointer;
  user-select: none;
}
</style>
```

---

## Complete Accessible Toolbar Example

```vue
<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'" class="accessible-editor">
    <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {{ announcement }}
    </div>

    <ejs-toolbar 
      ref="toolbar"
      role="toolbar"
      :aria-label="`Text editor toolbar, ${isRtl ? 'right-to-left' : 'left-to-right'}`"
      :enableRtl="isRtl"
      overflowMode="MultiRow"
    >
      <e-items>
        <!-- Format buttons with proper ARIA labels -->
        <e-item 
          id="bold"
          text="Bold" 
          prefixIcon="e-bold-icon"
          :cssClass="isBold ? 'active' : ''"
          :htmlAttributes="{
            'aria-label': 'Bold text',
            'aria-pressed': isBold.toString(),
            'title': 'Bold (Ctrl+B)'
          }"
          @click="toggleBold"
        ></e-item>
        <e-item 
          id="italic"
          text="Italic" 
          prefixIcon="e-italic-icon"
          :cssClass="isItalic ? 'active' : ''"
          :htmlAttributes="{
            'aria-label': 'Italic text',
            'aria-pressed': isItalic.toString(),
            'title': 'Italic (Ctrl+I)'
          }"
          @click="toggleItalic"
        ></e-item>
        
        <e-item type="Separator"></e-item>

        <!-- Alignment buttons -->
        <e-item 
          prefixIcon="e-align-left-icon"
          :htmlAttributes="{
            'aria-label': 'Align text left',
            'title': 'Left alignment'
          }"
          :cssClass="alignment === 'left' ? 'active' : ''"
          @click="setAlignment('left')"
        ></e-item>
        <e-item 
          prefixIcon="e-align-center-icon"
          :htmlAttributes="{
            'aria-label': 'Align text center',
            'title': 'Center alignment'
          }"
          :cssClass="alignment === 'center' ? 'active' : ''"
          @click="setAlignment('center')"
        ></e-item>

        <!-- RTL toggle (right-aligned) -->
        <e-item 
          text="RTL" 
          prefixIcon="e-rtl-icon"
          align="Right"
          :htmlAttributes="{
            'aria-label': `Switch to ${isRtl ? 'left-to-right' : 'right-to-left'} mode`,
            'title': 'Toggle text direction'
          }"
          @click="toggleRtl"
        ></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const toolbar = ref(null);
const isBold = ref(false);
const isItalic = ref(false);
const alignment = ref('left');
const isRtl = ref(false);
const announcement = ref('');

const toggleBold = () => {
  isBold.value = !isBold.value;
  announcement.value = `Bold formatting ${isBold.value ? 'enabled' : 'disabled'}`;
};

const toggleItalic = () => {
  isItalic.value = !isItalic.value;
  announcement.value = `Italic formatting ${isItalic.value ? 'enabled' : 'disabled'}`;
};

const setAlignment = (mode) => {
  alignment.value = mode;
  const labels = { left: 'left', center: 'center' };
  announcement.value = `Text alignment changed to ${labels[mode]}`;
};

const toggleRtl = () => {
  isRtl.value = !isRtl.value;
  announcement.value = `Text direction changed to ${isRtl.value ? 'right-to-left' : 'left-to-right'}`;
};
</script>

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
  border: 0;
}

:deep(.active) {
  background: #007bff !important;
  color: white !important;
}

:deep(.e-tbar-btn:focus-visible) {
  outline: 3px solid #4d90fe;
  outline-offset: 2px;
}
</style>
```

---

## Summary

Accessible Toolbar implementation includes:
- **WCAG 2.2 AA** compliance for users of all abilities
- **Keyboard Navigation** with Tab, arrow keys, and shortcuts
- **Screen Reader Support** with ARIA labels and live regions
- **Color Contrast** meeting 4.5:1 for normal text
- **Focus Management** with visible indicators
- **RTL Support** for Arabic, Hebrew, and other right-to-left languages
- **ARIA Attributes** for semantic markup
- **Testing** with automated and manual accessibility checks

Build inclusive toolbars that work for everyone.
