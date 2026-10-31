# SpeedDial Getting Started

> Create SpeedDial components with action menus.

---

## Installation

Ensure Syncfusion EJ2 Vue packages are installed:

```bash
npm install @syncfusion/ej2-vue-buttons @syncfusion/ej2-base
```

## Import Styles

```vue
<script setup>
import "@syncfusion/ej2-material3-theme/styles/speed-dial/index.css";
</script>
```

## Basic SpeedDial

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
  ></ejs-speeddial>
</template>

<script setup>
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';
import "@syncfusion/ej2-material3-theme/styles/speed-dial/index.css";

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const items = [
  { text: 'Edit', icon: 'e-icons e-edit' },
  { text: 'Delete', icon: 'e-icons e-delete' },
  { text: 'Share', icon: 'e-icons e-share' }
];
</script>
```

## SpeedDial with Actions

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    @item-click="handleItemClick"
  ></ejs-speeddial>
</template>

<script setup>
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const items = [
  { text: 'Create', icon: 'e-icons e-plus' },
  { text: 'Open', icon: 'e-icons e-folder-open' },
  { text: 'Save', icon: 'e-icons e-save' }
];

const handleItemClick = (event) => {
  console.log('Item clicked:', event.item?.text);
};
</script>
```

## Multiple SpeedDials

```vue
<template>
  <div class="flex gap-8">
    <ejs-speeddial 
      :items="editItems"
      iconCss="e-icons e-edit"
    ></ejs-speeddial>
    <ejs-speeddial 
      :items="shareItems"
      iconCss="e-icons e-share"
    ></ejs-speeddial>
  </div>
</template>

<script setup>
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const editItems = [
  { text: 'Cut', icon: 'e-icons e-cut' },
  { text: 'Copy', icon: 'e-icons e-copy' },
  { text: 'Paste', icon: 'e-icons e-paste' }
];

const shareItems = [
  { text: 'Email', icon: 'e-icons e-mail' },
  { text: 'Facebook', icon: 'e-icons e-facebook' },
  { text: 'Twitter', icon: 'e-icons e-twitter' }
];
</script>
```

## Running Your App

```bash
npm run dev
```

---

## Next Steps

- Explore items configuration in [speeddial-items.md](speeddial-items.md)
