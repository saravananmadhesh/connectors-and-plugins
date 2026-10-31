# FloatingActionButton Getting Started

> Begin using Syncfusion FloatingActionButton component in your Vue 3 applications.

---

## Installation

Install required packages:

```bash
npm install @syncfusion/ej2-vue-buttons @syncfusion/ej2-base
```

## CSS Import

Add stylesheet imports:

```vue
<script setup>
import "@syncfusion/ej2-material3-theme/styles/floating-action-button/index.css";
import { FabComponent } from '@syncfusion/ej2-vue-buttons';
</script>
```

## First Floating Action Button

Create your first FAB:

```vue
<template>
  <div class="fab-container">
    <ejs-fab 
      iconCss="e-icons e-plus"
      @click="handleClick"
    ></ejs-fab>
  </div>
</template>

<script setup>
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-buttons/styles/tailwind3.css';
import { FabComponent } from '@syncfusion/ej2-vue-buttons';

const handleClick = () => {
  console.log('FAB clicked');
};
</script>

<style scoped>
.fab-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
```

## Multiple FABs

Create multiple floating action buttons:

```vue
<template>
  <div class="fab-group">
    <ejs-fab 
      iconCss="e-icons e-edit"
      @click="onEdit"
    ></ejs-fab>
    <ejs-fab 
      iconCss="e-icons e-delete"
      @click="onDelete"
    ></ejs-fab>
    <ejs-fab 
      iconCss="e-icons e-share"
      @click="onShare"
    ></ejs-fab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-buttons/styles/tailwind3.css';
import { FabComponent } from '@syncfusion/ej2-vue-buttons';

const onEdit = () => console.log('Edit');
const onDelete = () => console.log('Delete');
const onShare = () => console.log('Share');
</script>

<style scoped>
.fab-group {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
```

## Running Application

```bash
npm run dev
```

Navigate to `http://localhost:5173` to see FAB in action.

---

## Next Steps

- Learn icon customization in [floatingactionbutton-icons.md](floatingactionbutton-icons.md)
- Explore positions in [floatingactionbutton-positions.md](floatingactionbutton-positions.md)
- View styling in [floatingactionbutton-styles.md](floatingactionbutton-styles.md)
