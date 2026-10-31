# Contextual Tabs in Vue Ribbon Component

## Table of Contents
- [Overview](#overview)
- [Enabling Contextual Tabs](#enabling-contextual-tabs)
- [Adding Contextual Tabs](#adding-contextual-tabs)
- [Visibility Control](#visibility-control)
- [Selection Control](#selection-control)
- [Dynamic Management](#dynamic-management)
- [Common Patterns](#common-patterns)
- [Complete Example](#complete-example)

## Overview

Contextual tabs are dynamic tabs that appear only when specific content is selected or specific conditions are met. They provide context-specific commands without cluttering the main ribbon interface.

**Common Use Cases:**
- Table tools appear when a table is selected
- Image tools appear when an image is selected
- Chart tools appear when a chart is selected
- Drawing tools appear in drawing mode

**Key Features:**
- Dynamic visibility based on context
- Can be shown/hidden programmatically
- Support for selection state
- Integrate seamlessly with regular tabs

## Enabling Contextual Tabs

Enable contextual tabs using the `RibbonContextualTab` module.

### Basic Setup

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <!-- Regular tab content -->
      </e-ribbon-tab>
    </e-ribbon-tabs>
    
    <e-ribbon-contextual-tabs>
      <e-ribbon-contextual-tab :visible="false">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Table Design">
            <!-- Contextual tab content -->
          </e-ribbon-tab>
        </e-ribbon-tabs>
      </e-ribbon-contextual-tab>
    </e-ribbon-contextual-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { provide } from 'vue';
import { RibbonComponent as EjsRibbon, RibbonContextualTab,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonContextualTabsDirective as ERibbonContextualTabs,
         RibbonContextualTabDirective as ERibbonContextualTab
} from '@syncfusion/ej2-vue-ribbon';

// Inject ContextualTab module
provide('ribbon', [RibbonContextualTab]);
</script>
```

## Adding Contextual Tabs

Define contextual tabs with their own groups and items.

### Single Contextual Tab

```vue
<template>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :buttonSettings="pasteButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
    
    <e-ribbon-contextual-tabs>
      <e-ribbon-contextual-tab :visible="false">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Table Design">
            <e-ribbon-groups>
              <e-ribbon-group header="Table Styles">
                <e-ribbon-collections>
                  <e-ribbon-collection>
                    <e-ribbon-items>
                      <e-ribbon-item type="Button" :buttonSettings="headerRowButton"></e-ribbon-item>
                      <e-ribbon-item type="Button" :buttonSettings="totalRowButton"></e-ribbon-item>
                    </e-ribbon-items>
                  </e-ribbon-collection>
                </e-ribbon-collections>
              </e-ribbon-group>
            </e-ribbon-groups>
          </e-ribbon-tab>
        </e-ribbon-tabs>
      </e-ribbon-contextual-tab>
    </e-ribbon-contextual-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref, provide } from 'vue';
import { RibbonContextualTab } from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonContextualTab]);

const ribbonRef = ref(null);

const pasteButton = { iconCss: 'e-icons e-paste', content: 'Paste' };
const headerRowButton = { iconCss: 'e-icons e-table', content: 'Header Row' };
const totalRowButton = { iconCss: 'e-icons e-table', content: 'Total Row' };
</script>
```

### Multiple Contextual Tabs

Add multiple contextual tab groups for different contexts:

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <!-- Regular tabs -->
    </e-ribbon-tabs>
    
    <e-ribbon-contextual-tabs>
      <!-- Table Tools -->
      <e-ribbon-contextual-tab :visible="false">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Table Design">
            <!-- Table design content -->
          </e-ribbon-tab>
          <e-ribbon-tab header="Table Layout">
            <!-- Table layout content -->
          </e-ribbon-tab>
        </e-ribbon-tabs>
      </e-ribbon-contextual-tab>
      
      <!-- Image Tools -->
      <e-ribbon-contextual-tab :visible="false">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Image Format">
            <!-- Image format content -->
          </e-ribbon-tab>
        </e-ribbon-tabs>
      </e-ribbon-contextual-tab>
      
      <!-- Chart Tools -->
      <e-ribbon-contextual-tab :visible="false">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Chart Design">
            <!-- Chart design content -->
          </e-ribbon-tab>
          <e-ribbon-tab header="Chart Format">
            <!-- Chart format content -->
          </e-ribbon-tab>
        </e-ribbon-tabs>
      </e-ribbon-contextual-tab>
    </e-ribbon-contextual-tabs>
  </ejs-ribbon>
</template>
```

## Visibility Control

Control when contextual tabs are visible.

### Default Hidden

Contextual tabs are hidden by default:

```vue
<e-ribbon-contextual-tab :visible="false">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Table Design">
      <!-- Tab content -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</e-ribbon-contextual-tab>
```

### Show on Load

Make a contextual tab visible initially:

```vue
<e-ribbon-contextual-tab :visible="true">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Table Design">
      <!-- Tab content -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</e-ribbon-contextual-tab>
```

### Programmatic Show/Hide

Toggle visibility using methods:

```vue
<template>
  <button @click="showTableTools">Show Table Tools</button>
  <button @click="hideTableTools">Hide Table Tools</button>
  
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <!-- Regular tabs -->
    </e-ribbon-tabs>
    
    <e-ribbon-contextual-tabs>
      <e-ribbon-contextual-tab :visible="tableToolsVisible">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Table Design">
            <!-- Tab content -->
          </e-ribbon-tab>
        </e-ribbon-tabs>
      </e-ribbon-contextual-tab>
    </e-ribbon-contextual-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref, provide } from 'vue';
import { RibbonContextualTab } from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonContextualTab]);

const ribbonRef = ref(null);
const tableToolsVisible = ref(false);

const showTableTools = () => {
  tableToolsVisible.value = true;
};

const hideTableTools = () => {
  tableToolsVisible.value = false;
};
</script>
```

### Show/Hide with Ribbon Methods

Use ribbon component methods:

```vue
<template>
  <ejs-ribbon ref="ribbonRef">
    <!-- Ribbon content -->
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

// Show a contextual tab by ID
const showContextualTab = () => {
  ribbonRef.value.showTab('tableDesignTab');
};

// Hide a contextual tab by ID
const hideContextualTab = () => {
  ribbonRef.value.hideTab('tableDesignTab');
};
</script>
```

## Selection Control

Control which contextual tab is selected.

### Initial Selection

Set the initially selected tab:

```vue
<e-ribbon-contextual-tab :visible="true">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Table Design" :isSelected="true">
      <!-- This tab is selected initially -->
    </e-ribbon-tab>
    <e-ribbon-tab header="Table Layout">
      <!-- This tab is not selected -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</e-ribbon-contextual-tab>
```

### Programmatic Selection

Select tabs programmatically:

```vue
<template>
  <button @click="selectDesignTab">Select Design Tab</button>
  <button @click="selectLayoutTab">Select Layout Tab</button>
  
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-contextual-tabs>
      <e-ribbon-contextual-tab :visible="true">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Table Design" id="tableDesign">
            <!-- Tab content -->
          </e-ribbon-tab>
          <e-ribbon-tab header="Table Layout" id="tableLayout">
            <!-- Tab content -->
          </e-ribbon-tab>
        </e-ribbon-tabs>
      </e-ribbon-contextual-tab>
    </e-ribbon-contextual-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const selectDesignTab = () => {
  ribbonRef.value.selectTab('tableDesign');
};

const selectLayoutTab = () => {
  ribbonRef.value.selectTab('tableLayout');
};
</script>
```

## Dynamic Management

Handle contextual tabs based on user interactions.

### Show on Element Selection

```vue
<template>
  <div>
    <div class="editor" @click="handleEditorClick">
      <table class="editable-table" @click="selectTable">
        <tr><td>Cell 1</td><td>Cell 2</td></tr>
        <tr><td>Cell 3</td><td>Cell 4</td></tr>
      </table>
      <img class="editable-image" src="image.jpg" @click="selectImage" />
    </div>
    
    <ejs-ribbon ref="ribbonRef">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <!-- Regular content -->
        </e-ribbon-tab>
      </e-ribbon-tabs>
      
      <e-ribbon-contextual-tabs>
        <!-- Table Tools -->
        <e-ribbon-contextual-tab :visible="isTableSelected">
          <e-ribbon-tabs>
            <e-ribbon-tab header="Table Design">
              <!-- Table tools -->
            </e-ribbon-tab>
          </e-ribbon-tabs>
        </e-ribbon-contextual-tab>
        
        <!-- Image Tools -->
        <e-ribbon-contextual-tab :visible="isImageSelected">
          <e-ribbon-tabs>
            <e-ribbon-tab header="Image Format">
              <!-- Image tools -->
            </e-ribbon-tab>
          </e-ribbon-tabs>
        </e-ribbon-contextual-tab>
      </e-ribbon-contextual-tabs>
    </ejs-ribbon>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { RibbonContextualTab } from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonContextualTab]);

const isTableSelected = ref(false);
const isImageSelected = ref(false);

const selectTable = (event) => {
  event.stopPropagation();
  isTableSelected.value = true;
  isImageSelected.value = false;
};

const selectImage = (event) => {
  event.stopPropagation();
  isImageSelected.value = true;
  isTableSelected.value = false;
};

const handleEditorClick = () => {
  // Clicking empty space deselects all
  isTableSelected.value = false;
  isImageSelected.value = false;
};
</script>
```

### Auto-Hide on Deselection

Hide contextual tabs when context is lost:

```vue
<script setup>
import { ref, watch } from 'vue';

const selectedElement = ref(null);
const showContextualTabs = ref(false);

watch(selectedElement, (newValue) => {
  if (newValue) {
    showContextualTabs.value = true;
  } else {
    showContextualTabs.value = false;
  }
});

const handleSelection = (element) => {
  selectedElement.value = element;
};

const clearSelection = () => {
  selectedElement.value = null;
};
</script>
```

## Common Patterns

### Table Tools Pattern

```vue
<e-ribbon-contextual-tab :visible="tableSelected">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Table Design">
      <e-ribbon-groups>
        <e-ribbon-group header="Table Styles">
          <e-ribbon-collections>
            <e-ribbon-collection>
              <e-ribbon-items>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Header Row' }"></e-ribbon-item>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Total Row' }"></e-ribbon-item>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Banded Rows' }"></e-ribbon-item>
              </e-ribbon-items>
            </e-ribbon-collection>
          </e-ribbon-collections>
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
    
    <e-ribbon-tab header="Table Layout">
      <e-ribbon-groups>
        <e-ribbon-group header="Rows & Columns">
          <e-ribbon-collections>
            <e-ribbon-collection>
              <e-ribbon-items>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Insert Above' }"></e-ribbon-item>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Insert Below' }"></e-ribbon-item>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Delete Row' }"></e-ribbon-item>
              </e-ribbon-items>
            </e-ribbon-collection>
          </e-ribbon-collections>
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</e-ribbon-contextual-tab>
```

### Image Tools Pattern

```vue
<e-ribbon-contextual-tab :visible="imageSelected">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Image Format">
      <e-ribbon-groups>
        <e-ribbon-group header="Adjust">
          <e-ribbon-collections>
            <e-ribbon-collection>
              <e-ribbon-items>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Brightness' }"></e-ribbon-item>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Contrast' }"></e-ribbon-item>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Crop' }"></e-ribbon-item>
              </e-ribbon-items>
            </e-ribbon-collection>
          </e-ribbon-collections>
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</e-ribbon-contextual-tab>
```

### Chart Tools Pattern

```vue
<e-ribbon-contextual-tab :visible="chartSelected">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Chart Design">
      <e-ribbon-groups>
        <e-ribbon-group header="Chart Types">
          <e-ribbon-collections>
            <e-ribbon-collection>
              <e-ribbon-items>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Column' }"></e-ribbon-item>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Line' }"></e-ribbon-item>
                <e-ribbon-item type="Button" :buttonSettings="{ content: 'Pie' }"></e-ribbon-item>
              </e-ribbon-items>
            </e-ribbon-collection>
          </e-ribbon-collections>
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</e-ribbon-contextual-tab>
```

## Complete Example

Full implementation with multiple contextual tabs:

```vue
<template>
  <div>
    <div class="editor-area">
      <div class="toolbar">
        <button @click="insertTable">Insert Table</button>
        <button @click="insertImage">Insert Image</button>
        <button @click="clearSelection">Clear Selection</button>
      </div>
      
      <div class="content" @click="handleContentClick">
        <p>Click "Insert Table" or "Insert Image" to see contextual tabs.</p>
        <div v-if="hasTable" class="table-container" @click.stop="selectTable">
          <table>
            <tr><td>Cell 1</td><td>Cell 2</td></tr>
            <tr><td>Cell 3</td><td>Cell 4</td></tr>
          </table>
        </div>
        <div v-if="hasImage" class="image-container" @click.stop="selectImage">
          <img src="sample.jpg" alt="Sample" />
        </div>
      </div>
    </div>
    
    <ejs-ribbon ref="ribbonRef">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" :buttonSettings="pasteButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" :buttonSettings="copyButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
      
      <e-ribbon-contextual-tabs>
        <!-- Table Tools -->
        <e-ribbon-contextual-tab :visible="isTableSelected">
          <e-ribbon-tabs>
            <e-ribbon-tab header="Table Design" :isSelected="true">
              <e-ribbon-groups>
                <e-ribbon-group header="Table Styles">
                  <e-ribbon-collections>
                    <e-ribbon-collection>
                      <e-ribbon-items>
                        <e-ribbon-item type="Button" :buttonSettings="headerRowButton"></e-ribbon-item>
                        <e-ribbon-item type="Button" :buttonSettings="totalRowButton"></e-ribbon-item>
                      </e-ribbon-items>
                    </e-ribbon-collection>
                  </e-ribbon-collections>
                </e-ribbon-group>
              </e-ribbon-groups>
            </e-ribbon-tab>
            <e-ribbon-tab header="Table Layout">
              <e-ribbon-groups>
                <e-ribbon-group header="Rows & Columns">
                  <e-ribbon-collections>
                    <e-ribbon-collection>
                      <e-ribbon-items>
                        <e-ribbon-item type="Button" :buttonSettings="insertRowButton"></e-ribbon-item>
                        <e-ribbon-item type="Button" :buttonSettings="deleteRowButton"></e-ribbon-item>
                      </e-ribbon-items>
                    </e-ribbon-collection>
                  </e-ribbon-collections>
                </e-ribbon-group>
              </e-ribbon-groups>
            </e-ribbon-tab>
          </e-ribbon-tabs>
        </e-ribbon-contextual-tab>
        
        <!-- Image Tools -->
        <e-ribbon-contextual-tab :visible="isImageSelected">
          <e-ribbon-tabs>
            <e-ribbon-tab header="Image Format">
              <e-ribbon-groups>
                <e-ribbon-group header="Adjust">
                  <e-ribbon-collections>
                    <e-ribbon-collection>
                      <e-ribbon-items>
                        <e-ribbon-item type="Button" :buttonSettings="brightnessButton"></e-ribbon-item>
                        <e-ribbon-item type="Button" :buttonSettings="cropButton"></e-ribbon-item>
                      </e-ribbon-items>
                    </e-ribbon-collection>
                  </e-ribbon-collections>
                </e-ribbon-group>
              </e-ribbon-groups>
            </e-ribbon-tab>
          </e-ribbon-tabs>
        </e-ribbon-contextual-tab>
      </e-ribbon-contextual-tabs>
    </ejs-ribbon>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { RibbonComponent as EjsRibbon, RibbonContextualTab,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups, RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections, RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems, RibbonItemDirective as ERibbonItem,
         RibbonContextualTabsDirective as ERibbonContextualTabs,
         RibbonContextualTabDirective as ERibbonContextualTab
} from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonContextualTab]);

const ribbonRef = ref(null);
const hasTable = ref(false);
const hasImage = ref(false);
const isTableSelected = ref(false);
const isImageSelected = ref(false);

// Regular tab buttons
const pasteButton = { iconCss: 'e-icons e-paste', content: 'Paste' };
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
const copyButton = { iconCss: 'e-icons e-copy', content: 'Copy' };

// Table contextual buttons
const headerRowButton = { content: 'Header Row' };
const totalRowButton = { content: 'Total Row' };
const insertRowButton = { content: 'Insert Row' };
const deleteRowButton = { content: 'Delete Row' };

// Image contextual buttons
const brightnessButton = { content: 'Brightness' };
const cropButton = { content: 'Crop' };

const insertTable = () => {
  hasTable.value = true;
  isTableSelected.value = true;
  isImageSelected.value = false;
};

const insertImage = () => {
  hasImage.value = true;
  isImageSelected.value = true;
  isTableSelected.value = false;
};

const selectTable = () => {
  isTableSelected.value = true;
  isImageSelected.value = false;
};

const selectImage = () => {
  isImageSelected.value = true;
  isTableSelected.value = false;
};

const handleContentClick = () => {
  isTableSelected.value = false;
  isImageSelected.value = false;
};

const clearSelection = () => {
  isTableSelected.value = false;
  isImageSelected.value = false;
};
</script>

<style>
.editor-area {
  margin-bottom: 20px;
}

.toolbar {
  margin-bottom: 10px;
}

.toolbar button {
  margin-right: 10px;
  padding: 5px 10px;
}

.content {
  min-height: 300px;
  border: 1px solid #ccc;
  padding: 20px;
}

.table-container,
.image-container {
  margin: 20px 0;
  padding: 10px;
  border: 2px solid transparent;
  cursor: pointer;
}

.table-container:hover,
.image-container:hover {
  border-color: #0078d4;
}

table {
  border-collapse: collapse;
}

table td {
  border: 1px solid #ccc;
  padding: 8px;
}

img {
  max-width: 300px;
}
</style>
```

This comprehensive implementation demonstrates context-aware ribbon tabs that appear dynamically based on user selections.
