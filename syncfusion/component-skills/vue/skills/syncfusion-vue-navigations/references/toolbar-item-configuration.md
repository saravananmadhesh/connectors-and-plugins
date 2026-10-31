# Item Configuration in Vue 3 Toolbar

## Table of Contents
- [ItemModel API Reference](#itemmodel-api-reference)
- [Button Type](#button-type)
- [Button Properties](#button-properties)
- [Separator Type](#separator-type)
- [Input Type](#input-type)
- [Tab Navigation](#tab-navigation)
- [Complete Examples](#complete-examples)

---

## ItemModel API Reference

The `ItemModel` interface defines the structure for each toolbar item in Vue 3.

### ItemModel Interface Structure

```typescript
interface ItemModel {
  // Identification
  id?: string;                              // Unique identifier
  
  // Content
  text?: string;                            // Display text
  template?: VNode | string;                // Custom template
  
  // Icons
  prefixIcon?: string;                      // Icon before text
  suffixIcon?: string;                      // Icon after text
  tooltipText?: string;                     // Hover tooltip
  
  // Appearance
  width?: string;                           // Item width (px, %, em)
  align?: 'Left' | 'Center' | 'Right';      // Alignment in toolbar
  cssClass?: string;                        // Custom CSS classes
  
  // State
  disabled?: boolean;                       // Is item disabled
  visible?: boolean;                        // Is item visible
  
  // Type & Behavior
  type?: 'Button' | 'Separator' | 'Input';  // Item type (default: Button)
  overflow?: 'Show' | 'Hide' | 'None';      // Popup priority (Popup mode)
  showAlwaysInPopup?: boolean;              // Always show in popup
  showTextOn?: 'Both' | 'Overflow' | 'Toolbar'; // Text visibility
  
  // Attributes & Navigation
  htmlAttributes?: { [key: string]: any };  // HTML attributes
  tabIndex?: number;                        // Tab order
}
```

### Items Array Configuration

Configure items as an array in the ToolbarComponent:

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <template v-for="item in toolbarItems" :key="item.id">
        <e-item v-bind="item"></e-item>
      </template>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const toolbarItems = ref([
  {
    id: 'cut',
    text: 'Cut',
    prefixIcon: 'e-cut-icon',
    tooltipText: 'Cut (Ctrl+X)'
  },
  {
    id: 'copy',
    text: 'Copy',
    prefixIcon: 'e-copy-icon',
    tooltipText: 'Copy (Ctrl+C)'
  },
  {
    id: 'paste',
    text: 'Paste',
    prefixIcon: 'e-paste-icon',
    tooltipText: 'Paste (Ctrl+V)',
    overflow: 'Show'  // Always visible
  },
  {
    type: 'Separator'
  },
  {
    id: 'bold',
    text: 'Bold',
    prefixIcon: 'e-bold-icon',
    overflow: 'Hide'  // Goes to popup
  }
]);
</script>
```

### Using ref() for Template Binding

Use Vue 3's `ref()` for reactive item binding:

```vue
<template>
  <div>
    <ejs-toolbar ref="toolbarRef">
      <e-items>
        <e-item 
          v-for="item in items" 
          :key="item.id"
          :text="item.text"
          :prefixIcon="item.prefixIcon"
          :overflow="item.overflow"
        ></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const toolbarRef = ref(null);

const items = ref([
  { id: 'new', text: 'New', prefixIcon: 'e-new-icon' },
  { id: 'open', text: 'Open', prefixIcon: 'e-open-icon' },
  { id: 'save', text: 'Save', prefixIcon: 'e-save-icon' },
  { type: 'Separator' },
  { id: 'print', text: 'Print', prefixIcon: 'e-print-icon' }
]);
</script>
```

### Complete ItemModel Example

Create a fully configured item:

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item
        id="advanced-settings"
        text="Settings"
        prefixIcon="e-settings-icon"
        suffixIcon="e-dropdown"
        width="140px"
        align="Right"
        cssClass="custom-btn highlight-border"
        :disabled="false"
        :visible="true"
        overflow="Show"
        showTextOn="Both"
        :tabIndex="5"
        :htmlAttributes="{ 'aria-label': 'Advanced Settings', 'data-id': 'settings-btn' }"
      ></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

---

## Button Type

**Button** is the default item type. It renders as a clickable command button.

### Basic Button

```vue
<e-item text="Save"></e-item>
```

Renders as a simple button with text "Save".

### Button with Icon

```vue
<e-item text="Save" prefixIcon="e-save-icon"></e-item>
```

- `prefixIcon` - Icon positioned before the text
- If text is omitted, only the icon displays

---

## Button Properties

### text
The display text for the button:

```vue
<e-item text="Download"></e-item>
```

### id
Unique identifier for the button:

```vue
<e-item text="Save" id="save-button"></e-item>
```

Auto-generated if not provided.

### prefixIcon
Icon positioned before the text:

```vue
<e-item text="Upload" prefixIcon="e-upload-icon"></e-item>
```

Output: 📤 Upload

### suffixIcon
Icon positioned after the text:

```vue
<e-item text="Settings" suffixIcon="e-dropdown"></e-item>
```

**Note:** If both `prefixIcon` and `suffixIcon` are provided, only `prefixIcon` is used.

### width
Set button width:

```vue
<e-item text="Custom Width" width="120px"></e-item>
```

Common values: `"auto"`, `"80px"`, `"100%"`, `"150px"`

### align
Position the item in the toolbar:

```vue
<e-item text="Left Aligned" align="Left"></e-item>
<e-item text="Center" align="Center"></e-item>
<e-item text="Right Aligned" align="Right"></e-item>
```

**Options:**
- `"Left"` - Default, aligns at start
- `"Center"` - Centers in toolbar
- `"Right"` - Aligns at end (useful for help buttons)

### disabled
Disable or enable the button:

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item text="Inactive Button" :disabled="true"></e-item>
      <e-item text="Active Button" :disabled="false"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ref } from 'vue';

const isDisabled = ref(true);
</script>
```

When disabled, the button appears grayed out and click events don't trigger.

### visible
Control item visibility:

```vue
<e-item text="Visible Item" :visible="true"></e-item>
<e-item text="Hidden Item" :visible="false"></e-item>
```

When `false`, the item is hidden but exists in the DOM.

### cssClass
Add custom CSS classes to the button:

```vue
<e-item 
  text="Styled Button" 
  cssClass="custom-class highlight-btn"
></e-item>
```

**CSS:**
```css
.custom-class {
  background-color: #e3f2fd;
  border-radius: 4px;
}

.highlight-btn {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### htmlAttributes
Add HTML attributes to the button element:

```vue
<e-item 
  text="Accessible Button"
  :htmlAttributes="{ 
    'aria-label': 'Save document',
    'data-tooltip': 'Click to save'
  }"
></e-item>
```

### overflow
Control where item displays (Popup mode):

```vue
<e-item text="Always Show" overflow="Show"></e-item>
<e-item text="Always Hide" overflow="Hide"></e-item>
<e-item text="Auto" overflow="None"></e-item>
```

**Options:**
- `"Show"` - Always in toolbar (priority display)
- `"Hide"` - Always in popup (secondary display)
- `"None"` - Default, moves to popup based on space

### showAlwaysInPopup
Force item to always display in popup:

```vue
<e-item 
  text="Advanced" 
  showAlwaysInPopup
  overflow="Hide"
></e-item>
```

Even if space is available, item appears in popup.

### showTextOn
Control where button text displays:

```vue
<e-item 
  text="Cut" 
  prefixIcon="e-cut-icon" 
  showTextOn="Overflow"
></e-item>
<e-item 
  text="Copy" 
  prefixIcon="e-copy-icon" 
  showTextOn="Toolbar"
></e-item>
```

**Options:**
- `"Both"` - Text visible everywhere
- `"Overflow"` - Text only in popup
- `"Toolbar"` - Text only in toolbar

---

## Separator Type

**Separator** adds a vertical line to visually group related commands:

```vue
<ejs-toolbar>
  <e-items>
    <e-item text="Cut"></e-item>
    <e-item text="Copy"></e-item>
    <e-item type="Separator"></e-item>
    <e-item text="Bold"></e-item>
  </e-items>
</ejs-toolbar>
```

**Separator rules:**
- Separators at the beginning or end are not visible
- Used to group related buttons
- No additional properties needed for separators

---

## Input Type

**Input** type is for embedding Vue components or forms:

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item type="Input">
        <ejs-dropdownlist :dataSource="fontList" width="120"></ejs-dropdownlist>
      </e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { DropDownListComponent as EjsDropdownlist } from '@syncfusion/ej2-vue-dropdowns';

const fontList = ['Arial', 'Calibri', 'Courier New', 'Georgia', 'Times New Roman'];
</script>
```

### Using NumericTextBox

```vue
<e-item type="Input">
  <ejs-numerictextbox format="c2" :value="1"></ejs-numerictextbox>
</e-item>

<script setup>
import { NumericTextBoxComponent as EjsNumerictextbox } from '@syncfusion/ej2-vue-inputs';
</script>
```

### Using DropDownList

```vue
<template>
  <e-item type="Input">
    <ejs-dropdownlist :dataSource="data" width="120" :index="0"></ejs-dropdownlist>
  </e-item>
</template>

<script setup>
const data = ref(['Badminton', 'Basketball', 'Cricket', 'Golf', 'Hockey']);
</script>
```

### Using CheckBox

```vue
<e-item type="Input">
  <ejs-checkbox label="Enable Feature" :checked="true"></ejs-checkbox>
</e-item>

<script setup>
import { CheckBoxComponent as EjsCheckbox } from '@syncfusion/ej2-vue-buttons';
</script>
```

---

## Tab Navigation

### tabIndex Property

Enable tab key navigation:

```vue
<ejs-toolbar>
  <e-items>
    <e-item text="Item 1" :tabIndex="1"></e-item>
    <e-item text="Item 2" :tabIndex="2"></e-item>
    <e-item text="Item 3" :tabIndex="3"></e-item>
  </e-items>
</ejs-toolbar>
```

Users can navigate using Tab and Shift+Tab keys.

### tabIndex Rules

- **Positive values (1, 2, 3...):** Items navigated in ascending order
- **0:** Items navigated based on DOM order
- **Negative values:** Item skipped from tab navigation

### Full Toolbar Navigation

```vue
<template>
  <ejs-toolbar width="400" overflowMode="Scrollable">
    <e-items>
      <e-item text="Cut" prefixIcon="e-cut-icon" :tabIndex="0"></e-item>
      <e-item text="Copy" prefixIcon="e-copy-icon" :tabIndex="0"></e-item>
      <e-item text="Paste" prefixIcon="e-paste-icon" :tabIndex="0"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Bold" prefixIcon="e-bold-icon" :tabIndex="0"></e-item>
      <e-item text="Underline" prefixIcon="e-underline-icon" :tabIndex="0"></e-item>
      <e-item text="Italic" prefixIcon="e-italic-icon" :tabIndex="0"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

All items use `tabIndex={0}` for DOM-based navigation order.

---

## Complete Examples

### Multi-Type Toolbar

Combining different item types:

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <!-- Button group -->
      <e-item text="Cut" prefixIcon="e-cut-icon"></e-item>
      <e-item text="Copy" prefixIcon="e-copy-icon"></e-item>
      <e-item type="Separator"></e-item>
      
      <!-- Format group -->
      <e-item text="Bold" prefixIcon="e-bold-icon"></e-item>
      <e-item text="Italic" prefixIcon="e-italic-icon"></e-item>
      <e-item text="Underline" prefixIcon="e-underline-icon"></e-item>
      <e-item type="Separator"></e-item>
      
      <!-- Input components -->
      <e-item type="Input">
        <ejs-dropdownlist :dataSource="fontList" width="120" :index="0"></ejs-dropdownlist>
      </e-item>
      <e-item type="Input">
        <ejs-numerictextbox format="c2" :value="1"></ejs-numerictextbox>
      </e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
import { DropDownListComponent as EjsDropdownlist } from '@syncfusion/ej2-vue-dropdowns';
import { NumericTextBoxComponent as EjsNumerictextbox } from '@syncfusion/ej2-vue-inputs';
import { ref } from 'vue';

const fontList = ref(['Arial', 'Calibri', 'Courier New', 'Georgia']);
</script>
```

### Right-Aligned Help Button

Use `align="Right"` to position at the end:

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item text="Save" prefixIcon="e-save-icon"></e-item>
      <e-item text="Print" prefixIcon="e-print-icon"></e-item>
      <e-item text="Export" prefixIcon="e-export-icon"></e-item>
      <e-item 
        text="Help" 
        prefixIcon="e-help-icon" 
        align="Right" 
        id="help-button"
      ></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

The Help button appears on the right side.

### Icon-Only Toolbar

Buttons with icons only (no text):

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item prefixIcon="e-cut-icon"></e-item>
      <e-item prefixIcon="e-copy-icon"></e-item>
      <e-item prefixIcon="e-paste-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item prefixIcon="e-bold-icon"></e-item>
      <e-item prefixIcon="e-italic-icon"></e-item>
      <e-item prefixIcon="e-underline-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

Cleaner, more compact appearance.

---

## Dynamic Item Binding

### Reactive Items Array

Update items dynamically using Vue 3 ref:

```vue
<template>
  <div>
    <button @click="addItem">Add Item</button>
    <button @click="removeItem">Remove Item</button>
    
    <ejs-toolbar>
      <e-items>
        <e-item 
          v-for="(item, index) in items" 
          :key="index"
          :text="item.text"
          :prefixIcon="item.prefixIcon"
        ></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const items = ref([
  { text: 'Cut', prefixIcon: 'e-cut-icon' },
  { text: 'Copy', prefixIcon: 'e-copy-icon' },
  { text: 'Paste', prefixIcon: 'e-paste-icon' }
]);

const addItem = () => {
  items.value.push({
    text: `New Item ${items.value.length + 1}`,
    prefixIcon: 'e-new-icon'
  });
};

const removeItem = () => {
  if (items.value.length > 0) {
    items.value.pop();
  }
};
</script>
```

---

## Summary

The Item Configuration guide covers:
- ItemModel API structure
- All button properties
- Separator and input types
- Tab navigation
- Complete working examples in Vue 3

Refer to this guide when configuring toolbar items for your Vue 3 applications.
