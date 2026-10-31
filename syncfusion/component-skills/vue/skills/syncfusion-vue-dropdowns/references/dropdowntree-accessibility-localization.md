# Accessibility & Localization

## Table of Contents

- [Accessibility Overview](#accessibility-overview)
- [WCAG Compliance](#wcag-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Localization](#localization)
- [RTL Support](#rtl-support)

## Accessibility Overview

The Dropdown Tree component follows accessibility guidelines to ensure usability for all users, including those with disabilities.

### Compliance Standards

| Standard | Support | Notes |
|----------|---------|-------|
| **WCAG 2.2** | Partial | Most features meet guidelines |
| **Section 508** | Partial | Sufficient for most scenarios |
| **Screen Readers** | Full | Complete support with ARIA |
| **Keyboard Navigation** | Full | All features accessible via keyboard |
| **Color Contrast** | Full | Meets WCAG AA standards |
| **Mobile Devices** | Full | Touch-friendly interfaces |
| **RTL Languages** | Full | Full right-to-left support |

### WCAG 2.2

Dropdown Tree meets WCAG 2.2 Level AA standards for:
- Perceivable: Content is visible and distinguishable
- Operable: Keyboard accessible, sufficient time for interactions
- Understandable: Clear labels, error prevention
- Robust: Compatible with assistive technologies

### Section 508

Complies with U.S. Section 508 accessibility requirements for federal information technology.

## WAI-ARIA Attributes

The component uses WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) attributes to communicate with assistive technologies.

### ARIA Roles and Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `role="listbox"` | Dropdown container | Identifies list functionality |
| `role="tree"` | Tree structure | Identifies hierarchical tree |
| `role="treeitem"` | Tree node | Identifies individual nodes |
| `role="group"` | Node children | Groups child elements |
| `role="checkbox"` | Checkbox input | Identifies checkbox control |
| `aria-disabled` | Input/Items | Indicates disabled state |
| `aria-expanded` | Expandable items | Shows expanded/collapsed state |
| `aria-selected` | Selected items | Marks selected nodes |
| `aria-checked` | Checkboxes | Indicates checkbox state |
| `aria-owns` | Input | References popup list |
| `aria-haspopup` | Input | Indicates popup availability |
| `aria-activedescendant` | Input | References active list item |
| `aria-label` | Input/Checkboxes | Provides accessible labels |
| `aria-describedby` | Input | Links to description element |
| `aria-labelledby` | Input | References label element |
| `aria-level` | Tree items | Indicates nesting level |
| `aria-multiselectable` | Tree | Indicates multi-select capability |

### Using Labels with ARIA

```vue
<template>
  <div>
    <label id="deptLabel" for="deptSelect">
      Select Department:
    </label>
    <DropDownTreeComponent
      id="deptSelect"
      :fields="fields"
      aria-labelledby="deptLabel"
    />
  </div>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### Using Descriptions with ARIA

```vue
<template>
  <div>
    <DropDownTreeComponent
      id="tree"
      :fields="fields"
      aria-describedby="treeHelp"
    />
    <small id="treeHelp">
      Select one or more items from the tree. Use arrow keys to navigate.
    </small>
  </div>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## Keyboard Navigation

All Dropdown Tree features are accessible via keyboard.

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Alt + Down** | Open popup |
| **Alt + Up** | Close popup |
| **Escape** | Close popup |
| **Arrow Up** | Select previous item |
| **Arrow Down** | Select next item |
| **Arrow Right** | Expand current item |
| **Arrow Left** | Collapse current item |
| **Home** | Go to first item |
| **End** | Go to last item |
| **Enter** | Select focused item |
| **Space** | Check/uncheck focused item (with checkboxes) |
| **Tab** | Move to next control |
| **Shift + Tab** | Move to previous control |

### Keyboard Interaction Example

```
1. User presses Tab to focus Dropdown Tree input
2. User presses Alt+Down to open popup
3. User presses Arrow Down to navigate items
4. User presses Arrow Right to expand category
5. User presses Space to check item (if checkboxes enabled)
6. User presses Escape to close popup
7. Selection is maintained in input field
```

### Testing Keyboard Access

```vue
<template>
  <div>
    <DropDownTreeComponent
      id="tree"
      :fields="fields"
      :showCheckBox="true"
      placeholder="Use keyboard to navigate"
    />
    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
      <h3>Keyboard Tips:</h3>
      <ul>
        <li>Alt + Down to open</li>
        <li>Arrow keys to navigate</li>
        <li>Space to check items</li>
        <li>Escape to close</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## Screen Reader Support

Screen readers (NVDA, JAWS, VoiceOver) announce component state, structure, and changes.

### What Screen Readers Announce

- **Component type**: "List box" or "Tree view"
- **Item information**: Item text, nesting level, expanded state
- **Selection state**: "Selected", "Not selected"
- **Checkbox state**: "Checked", "Unchecked", "Partially checked"
- **Item count**: "1 of 5", "5 items selected"
- **Disabled state**: "Disabled"

### Testing with Screen Readers

**On Windows:**
- NVDA (free, open-source) - https://www.nvaccess.org/
- JAWS (commercial) - https://www.freedomscientific.com/

**On macOS:**
- VoiceOver (built-in) - Cmd+F5

**On iOS:**
- VoiceOver (built-in) - Settings > Accessibility > VoiceOver

**On Android:**
- TalkBack (built-in) - Settings > Accessibility > TalkBack

### Screen Reader Friendly Component

```vue
<template>
  <DropDownTreeComponent
    id="tree"
    :fields="fields"
    :showCheckBox="true"
    aria-label="Department selection tree"
    aria-describedby="treeDesc"
  />
  <div id="treeDesc" style="display: none;">
    Select departments from the hierarchical tree. Use checkboxes to select multiple departments. All departments are required for system setup.
  </div>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## Localization

Syncfusion components support multiple languages and cultural settings.

### Available Locales

The component includes built-in support for:
- English (en) - default
- German (de)
- Spanish (es)
- French (fr)
- Simplified Chinese (zh-CN)
- Traditional Chinese (zh-TW)
- Japanese (ja)
- Korean (ko)
- And many more...

### Setting Component Locale

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :locale="currentLocale"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const currentLocale = 'de'; // German
// Change to 'es' for Spanish, 'fr' for French, etc.
</script>
```

### Localization Keys

The following keys can be customized for your locale:

| Key | Default English | Purpose |
|-----|-----------------|---------|
| `noRecordsTemplate` | "No records found" | When no items match filter |
| `actionFailureTemplate` | "Request failed" | When data loading fails |
| `overflowCountTemplate` | "+${count} more..." | When many items selected |
| `totalCountTemplate` | "${checked}/${total} items selected" | Total selection count |

### Custom Localization

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :locale="'custom'"
  />
</template>

<script setup>
import { DropDownTreeComponent, L10n } from '@syncfusion/ej2-vue-dropdowns';

// Define custom locale
L10n.load({
  'custom': {
    'dropdowntree': {
      'noRecordsTemplate': 'Keine Einträge gefunden',
      'actionFailureTemplate': 'Anfrage fehlgeschlagen',
      'overflowCountTemplate': '+${count} weitere...',
      'totalCountTemplate': '${checked}/${total} Elemente ausgewählt'
    }
  }
});
</script>
```

### Multi-Language Support

```vue
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <label>Select Language:</label>
      <select v-model="currentLocale" @change="changeLocale">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="ja">日本語</option>
      </select>
    </div>

    <DropDownTreeComponent
      :fields="fields"
      :locale="currentLocale"
      :placeholder="getPlaceholder()"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const currentLocale = ref('en');

const getPlaceholder = () => {
  const placeholders = {
    'en': 'Select an item',
    'de': 'Wählen Sie ein Element',
    'es': 'Selecciona un elemento',
    'fr': 'Sélectionnez un élément',
    'ja': 'アイテムを選択'
  };
  return placeholders[currentLocale.value] || 'Select an item';
};

const changeLocale = () => {
  // Locale automatically updates via prop binding
};
</script>
```

## RTL Support

Right-to-Left (RTL) layout support for Arabic, Hebrew, and other RTL languages.

### Enable RTL

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :enableRtl="true"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### RTL with Localization

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :locale="'ar'"
    :enableRtl="true"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
// Automatically enables RTL for Arabic locale
</script>
```

### Dynamic RTL Toggle

```vue
<template>
  <div>
    <label>
      <input v-model="rtlEnabled" type="checkbox" />
      Enable RTL
    </label>

    <DropDownTreeComponent
      :fields="fields"
      :locale="selectedLocale"
      :enableRtl="rtlEnabled"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const rtlEnabled = ref(false);
const selectedLocale = ref('en');

const placeholder = computed(() => {
  const placeholders = {
    'en': 'Select an item',
    'ar': 'اختر عنصرًا'
  };
  return placeholders[selectedLocale.value] || 'Select an item';
});
</script>

<style>
/* RTL body styling (optional) */
body.rtl {
  direction: rtl;
  text-align: right;
}

/* RTL component styling */
.e-dropdowntree.e-rtl {
  direction: rtl;
}

.e-dropdowntree.e-rtl :deep(.e-list-item) {
  text-align: right;
}
</style>
```

### RTL CSS Customization

```css
/* RTL-specific styles */
.e-dropdowntree.e-rtl {
  direction: rtl;
}

.e-dropdowntree.e-rtl :deep(.e-input-group) {
  flex-direction: row-reverse;
}

.e-dropdowntree.e-rtl :deep(.e-input-group-icon) {
  margin-left: 0;
  margin-right: 10px;
}

.e-dropdowntree.e-rtl :deep(.e-list-item) {
  padding-right: 15px;
  padding-left: 5px;
}
```

## Complete Accessibility Example

```vue
<template>
  <div :class="{ 'rtl': rtlEnabled }">
    <div style="margin-bottom: 20px;">
      <label for="langSelect">Select Language:</label>
      <select id="langSelect" v-model="currentLocale" style="margin: 0 10px;">
        <option value="en">English</option>
        <option value="ar">العربية (Arabic)</option>
        <option value="de">Deutsch</option>
      </select>

      <label style="margin-left: 20px;">
        <input v-model="rtlEnabled" type="checkbox" />
        Enable RTL
      </label>
    </div>

    <DropDownTreeComponent
      id="accessibleTree"
      :fields="fields"
      :showCheckBox="true"
      :locale="currentLocale"
      :enableRtl="rtlEnabled"
      aria-label="Accessible tree navigation"
      aria-describedby="treeDescription"
      placeholder="Choose items"
    />

    <div id="treeDescription" style="margin-top: 15px; font-size: 12px; color: #666;">
      <strong>Navigation tips:</strong>
      <ul>
        <li>Use arrow keys to navigate items</li>
        <li>Press Space to select/deselect</li>
        <li>Press Alt+Down to open dropdown</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const currentLocale = ref('en');
const rtlEnabled = ref(false);

const data = [
  { id: 1, name: 'Electronics', hasChild: true },
  { id: 2, name: 'Laptops', parentId: 1 },
  { id: 3, name: 'Phones', parentId: 1 },
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
  hasChildren: 'hasChild'
};
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
}
</style>
```
