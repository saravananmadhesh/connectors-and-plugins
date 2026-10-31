# Populating Tab Items with Data

## Table of Contents
- [Tab Item Binding](#tab-item-binding)
- [JSON Data Source](#json-data-source)
- [Dynamic Content Rendering](#dynamic-content-rendering)
- [API Data Fetching](#api-data-fetching)
- [Reactive Selection](#reactive-selection)
- [Methods via Template References](#methods-via-template-references)

## Tab Item Binding

### Static Tab Items

Define tabs directly in the template using `<e-tab-item>`:

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <e-tab-item :header="{ text: 'Home' }">
        <template #content>
          Welcome to the home tab
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'About' }">
        <template #content>
          About us content
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Contact' }">
        <template #content>
          Contact information
        </template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Dynamic Tab Items with v-for

Render tabs from a data array using `v-for`:

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <e-tab-item v-for="tab in tabs" :key="tab.id" :header="{ text: tab.title }">
        <template #content>
          {{ tab.description }}
        </template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const tabs = ref([
  { id: 1, title: 'Tab 1', description: 'Content for tab 1' },
  { id: 2, title: 'Tab 2', description: 'Content for tab 2' },
  { id: 3, title: 'Tab 3', description: 'Content for tab 3' }
]);
</script>
```

## JSON Data Source

### Static JSON Array

Define your tab data as a JSON array and iterate through it:

```vue
<template>
  <div class="container">
    <h2>Tabs from JSON Data</h2>
    <ejs-tab>
      <e-tab-items>
        <e-tab-item v-for="item in tabData" :key="item.id" :header="{ text: item.header }">
          <template #content>
            <div>
              <h4>{{ item.header }}</h4>
              <p>{{ item.content }}</p>
            </div>
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const tabData = ref([
  {
    id: 1,
    header: 'HTML',
    content: 'HyperText Markup Language is the standard markup language for creating web pages.'
  },
  {
    id: 2,
    header: 'CSS',
    content: 'Cascading Style Sheets is used for styling and layout of web pages.'
  },
  {
    id: 3,
    header: 'JavaScript',
    content: 'JavaScript is a programming language for interactive web pages.'
  }
]);
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
```

## Dynamic Content Rendering

### Add Tabs Dynamically

Add new tabs at runtime using the `addTab()` method:

```vue
<template>
  <div class="container">
    <button @click="addNewTab">Add New Tab</button>
    <ejs-tab ref="tabRef">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Initial Tab' }">
          <template #content>
            Initial tab content
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const tabRef = ref(null);
let tabCount = 1;

const addNewTab = () => {
  tabCount++;
  const newItems = [
    {
      header: { text: `Tab ${tabCount}` },
      content: `Content for tab ${tabCount}`
    }
  ];
  tabRef.value?.addTab(newItems);
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
```

### Remove Tabs Dynamically

Remove tabs using the `removeTab()` method:

```vue
<template>
  <div class="container">
    <button @click="removeCurrentTab">Remove Current Tab</button>
    <ejs-tab ref="tabRef" :showCloseButton="true">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Tab 1' }">
          <template #content>Content 1</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 2' }">
          <template #content>Content 2</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 3' }">
          <template #content>Content 3</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const tabRef = ref(null);

const removeCurrentTab = () => {
  const currentIndex = tabRef.value?.selectedItem || 0;
  tabRef.value?.removeTab(currentIndex);
};
</script>
```

## API Data Fetching

### Fetch Tabs from REST API

Load tab data from an API endpoint using `onMounted()`:

```vue
<template>
  <div class="container">
    <h2>Tabs from API</h2>
    <div v-if="loading" class="loading">Loading tabs...</div>
    <ejs-tab v-else>
      <e-tab-items>
        <e-tab-item v-for="tab in apiTabs" :key="tab.id" :header="{ text: tab.title }">
          <template #content>
            {{ tab.description }}
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const apiTabs = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch('/api/tabs');
    apiTabs.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch tabs:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  padding: 20px;
}

.loading {
  color: #666;
  font-style: italic;
}
</style>
```

### With Error Handling

Handle API errors gracefully:

```vue
<template>
  <div class="container">
    <h2>Tabs from API (with Error Handling)</h2>
    <div v-if="loading" class="status loading">Loading tabs...</div>
    <div v-else-if="error" class="status error">
      Error loading tabs: {{ error }}
      <button @click="retryFetch">Retry</button>
    </div>
    <ejs-tab v-else>
      <e-tab-items>
        <e-tab-item v-for="tab in apiTabs" :key="tab.id" :header="{ text: tab.title }">
          <template #content>
            {{ tab.description }}
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const apiTabs = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchTabs = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('/api/tabs');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    apiTabs.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const retryFetch = () => {
  fetchTabs();
};

onMounted(() => {
  fetchTabs();
});
</script>

<style scoped>
.container {
  padding: 20px;
}

.status {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.status.loading {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status.error {
  background-color: #ffebee;
  color: #c62828;
}

.status button {
  margin-left: 10px;
  padding: 5px 15px;
  background-color: #c62828;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

## Reactive Selection

### Control Selected Tab

Use `selectedItem` binding to control which tab is active:

```vue
<template>
  <div class="container">
    <div>
      <label>Select Tab:</label>
      <select v-model.number="activeTabIndex">
        <option value="0">Tab 1</option>
        <option value="1">Tab 2</option>
        <option value="2">Tab 3</option>
      </select>
    </div>
    
    <p>Currently selected tab index: {{ activeTabIndex }}</p>
    
    <ejs-tab :selectedItem="activeTabIndex">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Tab 1' }">
          <template #content>Content 1</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 2' }">
          <template #content>Content 2</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 3' }">
          <template #content>Content 3</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const activeTabIndex = ref(0);
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
```

### Track Tab Changes

Listen to tab selection changes with the `@select` event:

```vue
<template>
  <div class="container">
    <div class="status-box">
      <p>Previously selected: Tab {{ previousIndex + 1 }}</p>
      <p>Currently selected: Tab {{ currentIndex + 1 }}</p>
      <p>Total selection changes: {{ selectionCount }}</p>
    </div>
    
    <ejs-tab @select="handleTabSelect">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Tab 1' }">
          <template #content>Content 1</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 2' }">
          <template #content>Content 2</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 3' }">
          <template #content>Content 3</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const currentIndex = ref(0);
const previousIndex = ref(-1);
const selectionCount = ref(0);

const handleTabSelect = (args) => {
  previousIndex.value = currentIndex.value;
  currentIndex.value = args.selectedIndex;
  selectionCount.value++;
  console.log(`Switched from Tab ${previousIndex.value + 1} to Tab ${currentIndex.value + 1}`);
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.status-box {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
}

.status-box p {
  margin: 5px 0;
}
</style>
```

## Methods via Template References

### Using Template Refs to Call Methods

Access component methods through template references:

```vue
<template>
  <div class="container">
    <div class="controls">
      <button @click="selectFirstTab">Select Tab 1</button>
      <button @click="selectSecondTab">Select Tab 2</button>
      <button @click="selectLastTab">Select Last Tab</button>
      <button @click="refreshTab">Refresh</button>
    </div>
    
    <ejs-tab ref="tabRef" :selectedItem="0">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Profile' }">
          <template #content>User profile information</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Settings' }">
          <template #content>Application settings</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Help' }">
          <template #content>Help and documentation</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const tabRef = ref(null);

const selectFirstTab = () => {
  tabRef.value?.select(0);
};

const selectSecondTab = () => {
  tabRef.value?.select(1);
};

const selectLastTab = () => {
  const lastIndex = tabRef.value?.items?.length - 1 || 0;
  tabRef.value?.select(lastIndex);
};

const refreshTab = () => {
  tabRef.value?.refresh();
  console.log('Tab refreshed');
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #1565c0;
}
</style>
```
