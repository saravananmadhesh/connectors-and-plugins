# Advanced Features in Vue 3 Toolbar

## Table of Contents
- [Events](#events)
- [Dynamic Item Management](#dynamic-item-management)
- [Item Templates](#item-templates)
- [Toggle Buttons](#toggle-buttons)
- [Input Components](#input-components)
- [Keyboard Navigation](#keyboard-navigation)
- [HTML Attributes](#html-attributes)
- [Collision Detection](#collision-detection)
- [Complete Examples](#complete-examples)

---

## Events

Toolbar emits several lifecycle and interaction events.

### Event Types

| Event | Trigger | Usage |
|-------|---------|-------|
| `beforeCreate` | Before rendering | Setup, initialization |
| `created` | After rendering | Access DOM, initialize plugins |
| `clicked` | Item click | Handle button clicks |
| `keyDown` | Keyboard press | Handle keyboard shortcuts |
| `destroyed` | Component removal | Cleanup, teardown |

### Using Events

```vue
<template>
  <div>
    <p>Last action: {{ lastAction }}</p>
    
    <ejs-toolbar 
      @created="onCreated"
      @beforeCreate="onBeforeCreate"
      @clicked="onClicked"
      @keyDown="onKeyDown"
      @destroyed="onDestroyed"
    >
      <e-items>
        <e-item id="cut" text="Cut" prefixIcon="e-cut-icon"></e-item>
        <e-item id="copy" text="Copy" prefixIcon="e-copy-icon"></e-item>
        <e-item id="paste" text="Paste" prefixIcon="e-paste-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const lastAction = ref('None');

const onBeforeCreate = (args) => {
  console.log('Toolbar is about to render', args);
};

const onCreated = (args) => {
  console.log('Toolbar has been rendered', args);
  lastAction.value = 'Component created';
};

const onClicked = (args) => {
  console.log('Item clicked:', args.item.id);
  lastAction.value = `Clicked: ${args.item.text}`;
};

const onKeyDown = (args) => {
  if (args.key === 'Enter') {
    console.log('Enter key pressed on:', args.item.id);
    lastAction.value = `Key pressed: ${args.item.text}`;
  }
};

const onDestroyed = (args) => {
  console.log('Toolbar destroyed');
  lastAction.value = 'Component destroyed';
};
</script>
```

### Click Event with Item Reference

```vue
<template>
  <div>
    <p v-if="selectedItem">
      Selected: <strong>{{ selectedItem.text }}</strong>
    </p>
    
    <ejs-toolbar @clicked="handleItemClick">
      <e-items>
        <e-item id="format" text="Format" prefixIcon="e-format-icon"></e-item>
        <e-item id="align" text="Align" prefixIcon="e-align-icon"></e-item>
        <e-item id="spacing" text="Spacing" prefixIcon="e-spacing-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const selectedItem = ref(null);

const handleItemClick = (args) => {
  selectedItem.value = args.item;
  performAction(args.item.id);
};

const performAction = (itemId) => {
  switch(itemId) {
    case 'format':
      console.log('Format action triggered');
      break;
    case 'align':
      console.log('Align action triggered');
      break;
    case 'spacing':
      console.log('Spacing action triggered');
      break;
  }
};
</script>
```

---

## Dynamic Item Management

Add, remove, or modify toolbar items at runtime.

### Adding Items

```vue
<template>
  <div>
    <button @click="addNewItem">Add Item</button>
    <button @click="addSerifFont">Add Serif Font</button>
    
    <ejs-toolbar ref="toolbar">
      <e-items>
        <e-item text="Save" prefixIcon="e-save-icon"></e-item>
        <e-item text="Print" prefixIcon="e-print-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const toolbar = ref(null);

const addNewItem = () => {
  const newItem = {
    id: 'new-item',
    text: `Item ${Math.random()}`,
    prefixIcon: 'e-new-icon'
  };
  
  // Access toolbar instance
  if (toolbar.value) {
    toolbar.value.addItems([newItem]);
  }
};

const addSerifFont = () => {
  const fontItem = {
    text: 'Serif',
    width: '120px',
    type: 'Input',
    tooltipText: 'Add serif font'
  };
  
  if (toolbar.value) {
    toolbar.value.addItems([fontItem]);
  }
};
</script>
```

### Removing Items

```vue
<template>
  <div>
    <button @click="removeLastItem">Remove Last Item</button>
    <button @click="removeItemById('extra')">Remove Extra Item</button>
    
    <ejs-toolbar ref="toolbar">
      <e-items>
        <e-item id="cut" text="Cut" prefixIcon="e-cut-icon"></e-item>
        <e-item id="copy" text="Copy" prefixIcon="e-copy-icon"></e-item>
        <e-item id="paste" text="Paste" prefixIcon="e-paste-icon"></e-item>
        <e-item id="extra" text="Extra" prefixIcon="e-extra-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const toolbar = ref(null);

const removeLastItem = () => {
  if (toolbar.value && toolbar.value.items) {
    const items = toolbar.value.items;
    if (items.length > 0) {
      toolbar.value.removeItems([items.length - 1]);
    }
  }
};

const removeItemById = (itemId) => {
  if (toolbar.value && toolbar.value.items) {
    const index = toolbar.value.items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      toolbar.value.removeItems([index]);
    }
  }
};
</script>
```

### Updating Items

```vue
<template>
  <div>
    <button @click="updateItemText">Update Bold Text</button>
    <button @click="toggleItemDisabled">Toggle Paste Disabled</button>
    
    <ejs-toolbar ref="toolbar">
      <e-items>
        <e-item id="bold" text="Bold" prefixIcon="e-bold-icon"></e-item>
        <e-item id="paste" text="Paste" prefixIcon="e-paste-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const toolbar = ref(null);

const updateItemText = () => {
  if (toolbar.value && toolbar.value.items) {
    const boldItem = toolbar.value.items.find(item => item.id === 'bold');
    if (boldItem) {
      boldItem.text = 'Bold (Updated)';
      toolbar.value.refresh();
    }
  }
};

const toggleItemDisabled = () => {
  if (toolbar.value && toolbar.value.items) {
    const pasteItem = toolbar.value.items.find(item => item.id === 'paste');
    if (pasteItem) {
      pasteItem.disabled = !pasteItem.disabled;
      toolbar.value.refresh();
    }
  }
};
</script>
```

---

## Item Templates

Customize item appearance with HTML templates.

### Button Template

```vue
<template>
  <ejs-toolbar ref="toolbar">
    <e-items>
      <template v-for="item in customItems" :key="item.id">
        <e-item 
          :template="getTemplate(item.type)"
          :id="item.id"
        ></e-item>
      </template>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const customItems = ref([
  { id: 'custom-btn', type: 'custom-button' },
  { id: 'custom-badge', type: 'custom-badge' }
]);

const getTemplate = (type) => {
  switch(type) {
    case 'custom-button':
      return `<button class="custom-btn">
                <i class="e-icons e-custom-icon"></i>
                <span>Custom</span>
              </button>`;
    case 'custom-badge':
      return `<button class="badge-btn">
                Messages
                <span class="badge">5</span>
              </button>`;
    default:
      return '';
  }
};
</script>

<style scoped>
:deep(.custom-btn) {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

:deep(.badge-btn) {
  position: relative;
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

:deep(.badge) {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
</style>
```

---

## Toggle Buttons

Create buttons that maintain state when clicked.

### Toggle Button Implementation

```vue
<template>
  <div>
    <p>Bold: {{ isBoldActive ? 'ON' : 'OFF' }}</p>
    <p>Italic: {{ isItalicActive ? 'ON' : 'OFF' }}</p>
    
    <ejs-toolbar>
      <e-items>
        <e-item 
          id="bold"
          text="Bold" 
          prefixIcon="e-bold-icon"
          :cssClass="isBoldActive ? 'active-toggle' : ''"
          @click="toggleBold"
        ></e-item>
        <e-item 
          id="italic"
          text="Italic" 
          prefixIcon="e-italic-icon"
          :cssClass="isItalicActive ? 'active-toggle' : ''"
          @click="toggleItalic"
        ></e-item>
        <e-item type="Separator"></e-item>
        <e-item 
          text="Reset" 
          prefixIcon="e-refresh-icon"
          @click="resetToggles"
        ></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const isBoldActive = ref(false);
const isItalicActive = ref(false);

const toggleBold = () => {
  isBoldActive.value = !isBoldActive.value;
};

const toggleItalic = () => {
  isItalicActive.value = !isItalicActive.value;
};

const resetToggles = () => {
  isBoldActive.value = false;
  isItalicActive.value = false;
};
</script>

<style scoped>
:deep(.active-toggle) {
  background: #007bff !important;
  color: white !important;
}
</style>
```

### Multi-State Toggle

```vue
<template>
  <div>
    <p>Current Alignment: {{ alignmentMode }}</p>
    
    <ejs-toolbar>
      <e-items>
        <e-item 
          id="align-left"
          prefixIcon="e-align-left-icon"
          :cssClass="alignmentMode === 'left' ? 'active-state' : ''"
          @click="setAlignment('left')"
        ></e-item>
        <e-item 
          id="align-center"
          prefixIcon="e-align-center-icon"
          :cssClass="alignmentMode === 'center' ? 'active-state' : ''"
          @click="setAlignment('center')"
        ></e-item>
        <e-item 
          id="align-right"
          prefixIcon="e-align-right-icon"
          :cssClass="alignmentMode === 'right' ? 'active-state' : ''"
          @click="setAlignment('right')"
        ></e-item>
        <e-item 
          id="align-justify"
          prefixIcon="e-align-justify-icon"
          :cssClass="alignmentMode === 'justify' ? 'active-state' : ''"
          @click="setAlignment('justify')"
        ></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const alignmentMode = ref('left');

const setAlignment = (mode) => {
  alignmentMode.value = mode;
};
</script>

<style scoped>
:deep(.active-state) {
  background: #28a745 !important;
  color: white !important;
}
</style>
```

---

## Input Components

Embed Vue input components in toolbar items.

### DropDown List Example

```vue
<template>
  <div>
    <p>Selected Font: {{ selectedFont }}</p>
    
    <ejs-toolbar>
      <e-items>
        <e-item text="Font:"></e-item>
        <e-item type="Input" id="font-selector">
          <template #default>
            <ejs-dropdownlist 
              v-model="selectedFont"
              :dataSource="fontList" 
              :fields="{text: 'name', value: 'value'}"
              :index="0"
              width="150px"
            ></ejs-dropdownlist>
          </template>
        </e-item>
        <e-item text="Size:"></e-item>
        <e-item type="Input" id="size-selector">
          <template #default>
            <ejs-dropdownlist 
              v-model="selectedSize"
              :dataSource="sizeList" 
              width="80px"
            ></ejs-dropdownlist>
          </template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
import { DropDownListComponent as EjsDropdownlist } from '@syncfusion/ej2-vue-dropdowns';

const selectedFont = ref('Arial');
const selectedSize = ref('12');

const fontList = ref([
  { name: 'Arial', value: 'Arial' },
  { name: 'Calibri', value: 'Calibri' },
  { name: 'Courier New', value: 'Courier New' },
  { name: 'Georgia', value: 'Georgia' },
  { name: 'Times New Roman', value: 'Times New Roman' }
]);

const sizeList = ref(['10', '12', '14', '16', '18', '20', '24', '28', '32']);
</script>
```

### Numeric TextBox Example

```vue
<template>
  <div>
    <p>Line Spacing: {{ lineSpacing }}%</p>
    
    <ejs-toolbar>
      <e-items>
        <e-item text="Line Spacing:"></e-item>
        <e-item type="Input" id="spacing-input">
          <template #default>
            <ejs-numerictextbox 
              v-model="lineSpacing"
              :min="80"
              :max="200"
              :step="10"
              width="100px"
              @change="updateLineSpacing"
            ></ejs-numerictextbox>
          </template>
        </e-item>
        <e-item text="%"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
import { NumericTextBoxComponent as EjsNumerictextbox } from '@syncfusion/ej2-vue-inputs';

const lineSpacing = ref(100);

const updateLineSpacing = (args) => {
  console.log('Line spacing updated to:', args.value);
};
</script>
```

---

## Keyboard Navigation

Enable keyboard navigation for accessibility.

### Tab Navigation with TabIndex

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item 
        id="save"
        text="Save" 
        prefixIcon="e-save-icon"
        :tabIndex="0"
      ></e-item>
      <e-item 
        id="print"
        text="Print" 
        prefixIcon="e-print-icon"
        :tabIndex="1"
      ></e-item>
      <e-item 
        id="export"
        text="Export" 
        prefixIcon="e-export-icon"
        :tabIndex="2"
      ></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

// Tab key navigates items in order: Save → Print → Export
// Use tabIndex to control navigation order
</script>
```

### Key Down Event Handling

```vue
<template>
  <div>
    <p>Last Key Pressed: {{ lastKeyPressed }}</p>
    
    <ejs-toolbar @keyDown="handleKeyDown">
      <e-items>
        <e-item id="cut" text="Cut" prefixIcon="e-cut-icon" :tabIndex="0"></e-item>
        <e-item id="copy" text="Copy" prefixIcon="e-copy-icon" :tabIndex="1"></e-item>
        <e-item id="paste" text="Paste" prefixIcon="e-paste-icon" :tabIndex="2"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const lastKeyPressed = ref('None');

const handleKeyDown = (args) => {
  lastKeyPressed.value = args.key;
  
  if (args.key === 'Enter' || args.key === ' ') {
    console.log('Activated item:', args.item.id);
  } else if (args.key === 'ArrowLeft') {
    console.log('Navigate left');
  } else if (args.key === 'ArrowRight') {
    console.log('Navigate right');
  }
};
</script>
```

---

## HTML Attributes

Add custom HTML attributes to toolbar items.

### ARIA Labels and Attributes

```vue
<template>
  <ejs-toolbar role="toolbar" aria-label="Document toolbar">
    <e-items>
      <e-item 
        text="Save" 
        prefixIcon="e-save-icon"
        :htmlAttributes="{
          'aria-label': 'Save document',
          'title': 'Save document (Ctrl+S)',
          'data-tooltip': 'Quick Save'
        }"
      ></e-item>
      <e-item 
        text="Print" 
        prefixIcon="e-print-icon"
        :htmlAttributes="{
          'aria-label': 'Print document',
          'title': 'Print document (Ctrl+P)',
          'data-tooltip': 'Print'
        }"
      ></e-item>
      <e-item type="Separator"></e-item>
      <e-item 
        text="Help" 
        prefixIcon="e-help-icon"
        :htmlAttributes="{
          'aria-label': 'Open help',
          'title': 'Help (F1)',
          'data-tooltip': 'Show help'
        }"
      ></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Data Attributes for Tracking

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item 
        text="Click Me" 
        prefixIcon="e-click-icon"
        :htmlAttributes="{
          'data-event-type': 'user-action',
          'data-action-id': 'btn-001',
          'data-category': 'editing',
          'data-analytics-label': 'Toolbar Button Click'
        }"
        @click="trackEvent"
      ></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const trackEvent = (args) => {
  const element = args.element;
  const eventType = element.getAttribute('data-event-type');
  const actionId = element.getAttribute('data-action-id');
  const category = element.getAttribute('data-category');
  
  console.log(`Event: ${eventType}, Action: ${actionId}, Category: ${category}`);
};
</script>
```

---

## Collision Detection

Enable collision detection to prevent item overlap in compact layouts.

```vue
<template>
  <ejs-toolbar 
    :enableCollision="true"
    @clicked="onItemClick"
  >
    <e-items>
      <e-item text="New" prefixIcon="e-new-icon"></e-item>
      <e-item text="Open" prefixIcon="e-open-icon"></e-item>
      <e-item text="Save" prefixIcon="e-save-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Print" prefixIcon="e-print-icon"></e-item>
      <e-item text="Export" prefixIcon="e-export-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const onItemClick = (args) => {
  console.log('Item clicked with collision detection enabled');
};
</script>

<style scoped>
/* Collision detection automatically adjusts layout */
/* when items would overlap in narrow containers */
</style>
```

---

## Complete Examples

### Rich Text Editor Toolbar

```vue
<template>
  <div class="editor-wrapper">
    <ejs-toolbar ref="editorToolbar" overflowMode="MultiRow">
      <e-items>
        <!-- File Operations -->
        <e-item text="New" prefixIcon="e-new-icon"></e-item>
        <e-item text="Open" prefixIcon="e-open-icon"></e-item>
        <e-item text="Save" prefixIcon="e-save-icon" @click="saveDocument"></e-item>
        <e-item text="Print" prefixIcon="e-print-icon" @click="printDocument"></e-item>
        <e-item type="Separator"></e-item>

        <!-- Text Formatting -->
        <e-item 
          id="bold"
          text="Bold" 
          prefixIcon="e-bold-icon"
          :cssClass="isBold ? 'active-state' : ''"
          @click="toggleBold"
        ></e-item>
        <e-item 
          id="italic"
          text="Italic" 
          prefixIcon="e-italic-icon"
          :cssClass="isItalic ? 'active-state' : ''"
          @click="toggleItalic"
        ></e-item>
        <e-item 
          id="underline"
          text="Underline" 
          prefixIcon="e-underline-icon"
          :cssClass="isUnderline ? 'active-state' : ''"
          @click="toggleUnderline"
        ></e-item>
        <e-item type="Separator"></e-item>

        <!-- Font Selection -->
        <e-item text="Font:" width="50px"></e-item>
        <e-item type="Input" id="font-selector" width="120px">
          <template #default>
            <ejs-dropdownlist 
              v-model="selectedFont"
              :dataSource="fonts"
              width="120px"
            ></ejs-dropdownlist>
          </template>
        </e-item>

        <!-- Alignment -->
        <e-item type="Separator"></e-item>
        <e-item 
          prefixIcon="e-align-left-icon"
          :cssClass="alignment === 'left' ? 'active-state' : ''"
          @click="setAlignment('left')"
        ></e-item>
        <e-item 
          prefixIcon="e-align-center-icon"
          :cssClass="alignment === 'center' ? 'active-state' : ''"
          @click="setAlignment('center')"
        ></e-item>
        <e-item 
          prefixIcon="e-align-right-icon"
          :cssClass="alignment === 'right' ? 'active-state' : ''"
          @click="setAlignment('right')"
        ></e-item>

        <!-- Help -->
        <e-item text="Help" align="Right" prefixIcon="e-help-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
import { DropDownListComponent as EjsDropdownlist } from '@syncfusion/ej2-vue-dropdowns';

const editorToolbar = ref(null);
const isBold = ref(false);
const isItalic = ref(false);
const isUnderline = ref(false);
const selectedFont = ref('Arial');
const alignment = ref('left');

const fonts = ref(['Arial', 'Calibri', 'Courier New', 'Georgia', 'Times New Roman']);

const toggleBold = () => { isBold.value = !isBold.value; };
const toggleItalic = () => { isItalic.value = !isItalic.value; };
const toggleUnderline = () => { isUnderline.value = !isUnderline.value; };

const setAlignment = (mode) => {
  alignment.value = mode;
};

const saveDocument = () => {
  console.log('Document saved');
};

const printDocument = () => {
  console.log('Document printed');
};
</script>

<style scoped>
.editor-wrapper {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

:deep(.active-state) {
  background: #007bff !important;
  color: white !important;
}
</style>
```

---

## Summary

Advanced toolbar features enable:
- **Events**: Monitor user interactions and component lifecycle
- **Dynamic Management**: Add/remove/update items at runtime
- **Templates**: Customize item appearance with HTML
- **Toggle Buttons**: Create multi-state button controls
- **Input Components**: Embed dropdowns, text inputs, date pickers
- **Keyboard Navigation**: Full keyboard accessibility
- **HTML Attributes**: Add ARIA labels and data attributes
- **Collision Detection**: Smart layout adjustment

Use these features to build powerful, interactive toolbars with dynamic content and rich user interaction patterns.
