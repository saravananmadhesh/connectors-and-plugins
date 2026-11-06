# Getting Started with ListView (Vue 3)

## Table of Contents
- [Installation](#installation)
- [CSS Themes](#css-themes)
- [Basic Setup](#basic-setup)
- [First Component](#first-component)
- [TypeScript Support](#typescript-support)
- [Project Structure](#project-structure)

## Installation

### Prerequisites
- Vue 3.0+
- Node.js 12+
- npm or yarn

### Step 1: Install Required Packages

```bash
# Install ListView and dependencies
npm install @syncfusion/ej2-vue-lists @syncfusion/ej2-base @syncfusion/ej2-data

# Or with yarn
yarn add @syncfusion/ej2-vue-lists @syncfusion/ej2-base @syncfusion/ej2-data
```

### Step 2: Verify Installation

```bash
# Check installed versions
npm list @syncfusion/ej2-vue-lists
npm list @syncfusion/ej2-base
npm list @syncfusion/ej2-data
```

### Step 3: License Key (Optional)

For production use, register your Syncfusion license key:

```js
// main.js / main.ts
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('YOUR_SYNCFUSION_LICENSE_KEY');
```

**⚠️ Security Note:** Never commit license keys to version control. Use environment variables:

```js
const licenseKey = import.meta.env.VITE_SYNCFUSION_LICENSE;
registerLicense(licenseKey);
```

## CSS Themes

### Available Built-in Themes

1. **Material** (Default)
```js
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/listview/index.css";
```

### Applying a Theme

Choose ONE theme and import in your main component or `App.vue`:

```vue
<template>
  <div>
    <ListViewComponent id="list" :dataSource="['Item 1', 'Item 2']" />
  </div>
</template>

<script setup>
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';
import '@syncfusion/ej2-vue-lists/styles/material.css';
</script>
```

## Basic Setup

### Minimal Example

```vue
<template>
  <ListViewComponent id="simple-list" :dataSource="items" />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';
import '@syncfusion/ej2-vue-lists/styles/material.css';

const items = ref(['Apple', 'Banana', 'Orange', 'Mango']);
</script>
```

### With Object Data

```vue
<template>
  <ListViewComponent
    id="object-list"
    :dataSource="items"
    :fields="fields"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const items = ref([
  { id: '1', name: 'Apple', category: 'Fruit' },
  { id: '2', name: 'Carrot', category: 'Vegetable' },
  { id: '3', name: 'Banana', category: 'Fruit' }
]);

const fields = { id: 'id', text: 'name' };
</script>
```

## First Component

### Complete Working Example

```vue
<template>
  <div style="padding: 20px;">
    <h2>Email Folders</h2>
    <button @click="handleAddItem" style="margin-bottom: 10px;">Add Folder</button>

    <ListViewComponent
      ref="listViewRef"
      id="email-list"
      :dataSource="data"
      :fields="fields"
      :showIcon="true"
      height="300px"
      :select="handleSelect"
    />

    <div v-if="selectedItem" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;">
      <strong>Selected:</strong> {{ selectedItem.text }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';
import '@syncfusion/ej2-vue-lists/styles/material.css';

const listViewRef = ref(null);
const selectedItem = ref(null);

const data = ref([
  { id: '1', text: 'Inbox', icon: 'e-icons e-mail' },
  { id: '2', text: 'Sent', icon: 'e-icons e-send' },
  { id: '3', text: 'Drafts', icon: 'e-icons e-edit' },
  { id: '4', text: 'Trash', icon: 'e-icons e-delete' }
]);

const fields = { id: 'id', text: 'text', iconCss: 'icon' };

const handleSelect = (args) => {
  selectedItem.value = args;
  console.log('Selected:', args.text);
};

const handleAddItem = () => {
  const newItem = {
    id: Date.now().toString(),
    text: `New Item ${Date.now()}`,
    icon: 'e-icons e-new'
  };
  listViewRef.value?.addItem([newItem]);
};
</script>
```

## TypeScript Support

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

interface EmailFolder {
  id: string;
  text: string;
  icon: string;
}

const listViewRef = ref<InstanceType<typeof ListViewComponent> | null>(null);
const selectedItem = ref<EmailFolder | null>(null);

const data = ref<EmailFolder[]>([
  { id: '1', text: 'Inbox', icon: 'e-icons e-mail' }
]);

const fields = { id: 'id', text: 'text', iconCss: 'icon' };
</script>
```

## Project Structure

```
src/
├── components/
│   └── ListView/
│       ├── ListViewExample.vue
│       └── index.js
├── App.vue
└── main.ts
```

**Next:** Learn about [data binding and rendering](listview-data-binding-rendering.md) for advanced data sources.
