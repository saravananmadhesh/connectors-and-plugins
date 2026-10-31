# Events and Methods in Vue Ribbon Component

## Table of Contents
- [Overview](#overview)
- [Component Events](#component-events)
- [Tab Methods](#tab-methods)
- [Group Methods](#group-methods)
- [Item Methods](#item-methods)
- [Collection Methods](#collection-methods)
- [Utility Methods](#utility-methods)

## Overview

The Ribbon component provides comprehensive events for tracking user interactions and methods for programmatically manipulating tabs, groups, items, and collections.

**Event Categories:**
- Lifecycle events (created)
- Tab events (tabSelected, tabSelecting)
- Interaction events (launcherIconClick)
- Overflow events (overflowPopupOpen, overflowPopupClose)
- State events (ribbonExpanding, ribbonCollapsing)
- Layout events (ribbonLayoutSwitched)

## Component Events

### created

Triggered when the ribbon is created and rendered.

```vue
<ejs-ribbon @created="onCreated">
  <e-ribbon-tabs>
    <!-- Tabs -->
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onCreated = () => {
  console.log('Ribbon created and initialized');
  // Perform initialization tasks
  loadInitialData();
};

const loadInitialData = () => {
  console.log('Loading initial data...');
};
</script>
```

### tabSelected

Triggered after a tab is selected.

```vue
<ejs-ribbon @tabSelected="onTabSelected">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home"></e-ribbon-tab>
    <e-ribbon-tab header="Insert"></e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onTabSelected = (args) => {
  console.log('Tab selected:', args.selectedIndex);
  console.log('Tab ID:', args.selectedItem.id);
  console.log('Tab header:', args.selectedItem.header);
  
  // Load tab-specific content
  loadTabContent(args.selectedIndex);
};

const loadTabContent = (index) => {
  console.log(`Loading content for tab ${index}`);
};
</script>
```

### tabSelecting

Triggered before a tab is selected (cancellable).

```vue
<ejs-ribbon @tabSelecting="onTabSelecting">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home"></e-ribbon-tab>
    <e-ribbon-tab header="Insert"></e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onTabSelecting = (args) => {
  console.log('Selecting tab:', args.selectingIndex);
  console.log('Previous tab:', args.previousIndex);
  
  // Prevent tab switch if validation fails
  if (!validateCurrentTab()) {
    args.cancel = true;
    alert('Please complete the current tab before switching');
  }
};

const validateCurrentTab = () => {
  // Perform validation
  return true;
};
</script>
```

### launcherIconClick

Triggered when a group's launcher icon is clicked.

```vue
<ejs-ribbon @launcherIconClick="onLauncherClick">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <e-ribbon-groups>
        <e-ribbon-group header="Clipboard" :showLauncherIcon="true">
          <!-- Group items -->
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onLauncherClick = (args) => {
  console.log('Launcher clicked');
  console.log('Group ID:', args.groupId);
  
  // Open settings dialog for this group
  if (args.groupId === 'clipboardGroup') {
    openClipboardSettings();
  }
};

const openClipboardSettings = () => {
  console.log('Opening clipboard settings dialog');
};
</script>
```

### overflowPopupOpen

Triggered when the overflow popup opens.

```vue
<ejs-ribbon :enableGroupOverflow="true" @overflowPopupOpen="onOverflowOpen">
  <e-ribbon-tabs>
    <!-- Tabs -->
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onOverflowOpen = (args) => {
  console.log('Overflow popup opened');
  console.log('Overflowing items:', args.items);
  
  // Track analytics
  trackOverflowOpen();
};

const trackOverflowOpen = () => {
  console.log('User opened overflow menu');
};
</script>
```

### overflowPopupClose

Triggered when the overflow popup closes.

```vue
<ejs-ribbon :enableGroupOverflow="true" @overflowPopupClose="onOverflowClose">
  <e-ribbon-tabs>
    <!-- Tabs -->
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onOverflowClose = () => {
  console.log('Overflow popup closed');
};
</script>
```

### ribbonExpanding

Triggered when the ribbon is expanding from minimized state.

```vue
<ejs-ribbon @ribbonExpanding="onExpanding">
  <e-ribbon-tabs>
    <!-- Tabs -->
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onExpanding = (args) => {
  console.log('Ribbon expanding');
  
  // Prevent expansion if needed
  if (shouldPreventExpansion()) {
    args.cancel = true;
  }
};

const shouldPreventExpansion = () => {
  return false;
};
</script>
```

### ribbonCollapsing

Triggered when the ribbon is collapsing to minimized state.

```vue
<ejs-ribbon @ribbonCollapsing="onCollapsing">
  <e-ribbon-tabs>
    <!-- Tabs -->
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onCollapsing = (args) => {
  console.log('Ribbon collapsing');
  
  // Save state before collapsing
  saveRibbonState();
  
  // Prevent collapse if needed
  // args.cancel = true;
};

const saveRibbonState = () => {
  console.log('Saving ribbon state');
};
</script>
```

### ribbonLayoutSwitched

Triggered when the layout switches between Classic and Simplified.

```vue
<ejs-ribbon @ribbonLayoutSwitched="onLayoutSwitched">
  <e-ribbon-tabs>
    <!-- Tabs -->
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onLayoutSwitched = (args) => {
  console.log('Layout switched to:', args.layout);
  
  if (args.layout === 'Simplified') {
    console.log('Switched to Simplified layout');
  } else {
    console.log('Switched to Classic layout');
  }
  
  // Save layout preference
  saveLayoutPreference(args.layout);
};

const saveLayoutPreference = (layout) => {
  localStorage.setItem('ribbonLayout', layout);
};
</script>
```

## Tab Methods

Methods for manipulating tabs programmatically.

### addTab

Add a new tab to the ribbon.

```vue
<template>
  <button @click="addNewTab">Add Tab</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home"></e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const addNewTab = () => {
  const newTab = {
    header: 'New Tab',
    groups: [{
      header: 'New Group',
      collections: [{
        items: [{
          type: 'Button',
          buttonSettings: {
            content: 'New Button',
            iconCss: 'e-icons e-file-new'
          }
        }]
      }]
    }]
  };
  
  ribbonRef.value.addTab(newTab, 1); // Add at index 1
};
</script>
```

### removeTab

Remove a tab by ID or index.

```vue
<template>
  <button @click="removeTab">Remove Insert Tab</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home"></e-ribbon-tab>
      <e-ribbon-tab header="Insert" id="insertTab"></e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const removeTab = () => {
  ribbonRef.value.removeTab('insertTab'); // Remove by ID
  // Or: ribbonRef.value.removeTab(1); // Remove by index
};
</script>
```

### updateTab

Update tab properties.

```vue
<template>
  <button @click="updateTabHeader">Update Tab Header</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home" id="homeTab"></e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const updateTabHeader = () => {
  const updatedTab = {
    id: 'homeTab',
    header: 'Start'  // Change header from "Home" to "Start"
  };
  
  ribbonRef.value.updateTab(updatedTab);
};
</script>
```

### selectTab

Programmatically select a tab.

```vue
<template>
  <button @click="selectInsertTab">Go to Insert Tab</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home"></e-ribbon-tab>
      <e-ribbon-tab header="Insert" id="insertTab"></e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const selectInsertTab = () => {
  ribbonRef.value.selectTab('insertTab'); // Select by ID
  // Or: ribbonRef.value.selectTab(1); // Select by index
};
</script>
```

### hideTab / showTab

Hide or show tabs dynamically.

```vue
<template>
  <button @click="toggleInsertTab">Toggle Insert Tab</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home"></e-ribbon-tab>
      <e-ribbon-tab header="Insert" id="insertTab"></e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);
const isInsertVisible = ref(true);

const toggleInsertTab = () => {
  if (isInsertVisible.value) {
    ribbonRef.value.hideTab('insertTab');
  } else {
    ribbonRef.value.showTab('insertTab');
  }
  isInsertVisible.value = !isInsertVisible.value;
};
</script>
```

### enableTab / disableTab

Enable or disable tabs.

```vue
<template>
  <button @click="toggleTabState">Toggle Insert Tab State</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home"></e-ribbon-tab>
      <e-ribbon-tab header="Insert" id="insertTab"></e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);
const isInsertEnabled = ref(true);

const toggleTabState = () => {
  if (isInsertEnabled.value) {
    ribbonRef.value.disableTab('insertTab');
  } else {
    ribbonRef.value.enableTab('insertTab');
  }
  isInsertEnabled.value = !isInsertEnabled.value;
};
</script>
```

## Group Methods

Methods for manipulating groups within tabs.

### addGroup

Add a group to a tab.

```vue
<template>
  <button @click="addGroup">Add Group</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home" id="homeTab"></e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const addGroup = () => {
  const newGroup = {
    header: 'New Group',
    collections: [{
      items: [{
        type: 'Button',
        buttonSettings: { content: 'Button' }
      }]
    }]
  };
  
  ribbonRef.value.addGroup('homeTab', newGroup, 1); // Add to homeTab at index 1
};
</script>
```

### removeGroup

Remove a group from a tab.

```vue
<template>
  <button @click="removeGroup">Remove Font Group</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home" id="homeTab">
        <e-ribbon-groups>
          <e-ribbon-group header="Font" id="fontGroup"></e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const removeGroup = () => {
  ribbonRef.value.removeGroup('fontGroup');
};
</script>
```

### updateGroup

Update group properties.

```vue
<template>
  <button @click="updateGroup">Update Group</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home" id="homeTab">
        <e-ribbon-groups>
          <e-ribbon-group header="Font" id="fontGroup"></e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const updateGroup = () => {
  const updatedGroup = {
    id: 'fontGroup',
    header: 'Text Formatting',  // Change header
    showLauncherIcon: true      // Add launcher icon
  };
  
  ribbonRef.value.updateGroup(updatedGroup);
};
</script>
```

### hideGroup / showGroup

Hide or show groups.

```vue
<template>
  <button @click="toggleGroup">Toggle Font Group</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Font" id="fontGroup"></e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);
const isFontVisible = ref(true);

const toggleGroup = () => {
  if (isFontVisible.value) {
    ribbonRef.value.hideGroup('fontGroup');
  } else {
    ribbonRef.value.showGroup('fontGroup');
  }
  isFontVisible.value = !isFontVisible.value;
};
</script>
```

### enableGroup / disableGroup

Enable or disable groups.

```vue
<template>
  <button @click="toggleGroupState">Toggle Group State</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Font" id="fontGroup"></e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const toggleGroupState = () => {
  const group = ribbonRef.value.getGroup('fontGroup');
  
  if (group.disabled) {
    ribbonRef.value.enableGroup('fontGroup');
  } else {
    ribbonRef.value.disableGroup('fontGroup');
  }
};
</script>
```

## Item Methods

Methods for manipulating items within collections.

### addItem

Add an item to a collection.

```vue
<template>
  <button @click="addItem">Add Item</button>
  <ejs-ribbon ref="ribbonRef">
    <!-- Ribbon structure -->
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const addItem = () => {
  const newItem = {
    type: 'Button',
    buttonSettings: {
      content: 'New Button',
      iconCss: 'e-icons e-file-new'
    }
  };
  
  ribbonRef.value.addItem('collectionId', newItem, 0); // Add to collection at index 0
};
</script>
```

### removeItem

Remove an item from a collection.

```vue
<template>
  <button @click="removeItem">Remove Cut Button</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" id="cutButton" :buttonSettings="cutSettings">
                  </e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);
const cutSettings = { content: 'Cut', iconCss: 'e-icons e-cut' };

const removeItem = () => {
  ribbonRef.value.removeItem('cutButton');
};
</script>
```

### updateItem

Update item properties.

```vue
<template>
  <button @click="updateItem">Update Cut Button</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" id="cutButton" :buttonSettings="cutSettings">
                  </e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);
const cutSettings = { content: 'Cut', iconCss: 'e-icons e-cut' };

const updateItem = () => {
  const updatedItem = {
    id: 'cutButton',
    disabled: true,  // Disable the button
    buttonSettings: {
      content: 'Cut (Disabled)',
      iconCss: 'e-icons e-cut'
    }
  };
  
  ribbonRef.value.updateItem(updatedItem);
};
</script>
```

### getItem

Retrieve an item by ID.

```vue
<template>
  <button @click="checkItem">Check Cut Button</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" id="cutButton" :buttonSettings="cutSettings">
                  </e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);
const cutSettings = { content: 'Cut', iconCss: 'e-icons e-cut' };

const checkItem = () => {
  const item = ribbonRef.value.getItem('cutButton');
  console.log('Item type:', item.type);
  console.log('Item disabled:', item.disabled);
  console.log('Item active size:', item.activeSize);
};
</script>
```

### hideItem / showItem

Hide or show items.

```vue
<template>
  <button @click="toggleItem">Toggle Cut Button</button>
  <ejs-ribbon ref="ribbonRef">
    <!-- Ribbon structure with cutButton -->
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);
const isCutVisible = ref(true);

const toggleItem = () => {
  if (isCutVisible.value) {
    ribbonRef.value.hideItem('cutButton');
  } else {
    ribbonRef.value.showItem('cutButton');
  }
  isCutVisible.value = !isCutVisible.value;
};
</script>
```

### enableItem / disableItem

Enable or disable items.

```vue
<template>
  <button @click="toggleItemState">Toggle Item State</button>
  <ejs-ribbon ref="ribbonRef">
    <!-- Ribbon structure with cutButton -->
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const toggleItemState = () => {
  const item = ribbonRef.value.getItem('cutButton');
  
  if (item.disabled) {
    ribbonRef.value.enableItem('cutButton');
  } else {
    ribbonRef.value.disableItem('cutButton');
  }
};
</script>
```

## Collection Methods

Methods for manipulating collections within groups.

### addCollection

Add a collection to a group.

```vue
<template>
  <button @click="addCollection">Add Collection</button>
  <ejs-ribbon ref="ribbonRef">
    <!-- Ribbon structure -->
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const addCollection = () => {
  const newCollection = {
    items: [{
      type: 'Button',
      buttonSettings: { content: 'New Button' }
    }]
  };
  
  ribbonRef.value.addCollection('groupId', newCollection, 1);
};
</script>
```

### removeCollection

Remove a collection from a group.

```vue
<template>
  <button @click="removeCollection">Remove Collection</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard" id="clipboardGroup">
            <e-ribbon-collections>
              <e-ribbon-collection id="collection1"></e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const removeCollection = () => {
  ribbonRef.value.removeCollection('collection1');
};
</script>
```

### updateCollection

Update collection properties.

```vue
<template>
  <button @click="updateCollection">Update Collection</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard">
            <e-ribbon-collections>
              <e-ribbon-collection id="collection1"></e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const updateCollection = () => {
  const updatedCollection = {
    id: 'collection1',
    cssClass: 'custom-collection'
  };
  
  ribbonRef.value.updateCollection(updatedCollection);
};
</script>
```

## Utility Methods

General utility methods for the ribbon.

### refreshLayout

Refresh the ribbon layout manually.

```vue
<template>
  <button @click="refreshRibbon">Refresh Layout</button>
  <ejs-ribbon ref="ribbonRef">
    <e-ribbon-tabs>
      <!-- Tabs -->
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const refreshRibbon = () => {
  // Update some data
  updateRibbonData();
  
  // Refresh layout
  ribbonRef.value.refreshLayout();
};

const updateRibbonData = () => {
  console.log('Updating ribbon data');
};
</script>
```

This comprehensive guide to events and methods enables full programmatic control of the Ribbon component.
