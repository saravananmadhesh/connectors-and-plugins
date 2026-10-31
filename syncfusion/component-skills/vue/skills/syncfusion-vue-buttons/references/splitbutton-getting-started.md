# SplitButton Getting Started

> Create SplitButton components with dropdown actions.

---

## Installation

Ensure Syncfusion EJ2 Vue packages are installed:

```bash
npm install @syncfusion/ej2-vue-splitbuttons @syncfusion/ej2-base
```

## Import Styles

```vue
<script setup>
import "@syncfusion/ej2-material3-theme/styles/split-button/index.css";
</script>
```

## Basic SplitButton

```vue
<template>
  <ejs-splitbutton 
    content="Edit"
    :items="items"
  ></ejs-splitbutton>
</template>

<script setup>
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
import "@syncfusion/ej2-material3-theme/styles/split-button/index.css";

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const items = [
  { text: 'Cut', icon: 'e-icons e-cut' },
  { text: 'Copy', icon: 'e-icons e-copy' },
  { text: 'Paste', icon: 'e-icons e-paste' }
];
</script>
```

## SplitButton with Events

```vue
<template>
  <ejs-splitbutton 
    content="Format"
    :items="items"
    @click="handleClick"
    @item-click="handleItemClick"
  ></ejs-splitbutton>
</template>

<script setup>
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const items = [
  { text: 'Bold', icon: 'e-icons e-bold' },
  { text: 'Italic', icon: 'e-icons e-italic' },
  { text: 'Underline', icon: 'e-icons e-underline' }
];

const handleClick = () => {
  console.log('Primary action triggered');
};

const handleItemClick = (event) => {
  console.log('Secondary action:', event.item?.text);
};
</script>
```

## Multiple SplitButtons

```vue
<template>
  <div class="flex gap-4">
    <ejs-splitbutton 
      content="Edit"
      :items="editItems"
    ></ejs-splitbutton>
    <ejs-splitbutton 
      content="Format"
      :items="formatItems"
    ></ejs-splitbutton>
  </div>
</template>

<script setup>
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const editItems = [
  { text: 'Cut', icon: 'e-icons e-cut' },
  { text: 'Copy', icon: 'e-icons e-copy' },
  { text: 'Paste', icon: 'e-icons e-paste' }
];

const formatItems = [
  { text: 'Bold', icon: 'e-icons e-bold' },
  { text: 'Italic', icon: 'e-icons e-italic' },
  { text: 'Underline', icon: 'e-icons e-underline' }
];
</script>
```

## Running Your App

```bash
npm run dev
```

---

## Next Steps

- Explore types and styles in [splitbutton-types-and-styles.md](splitbutton-types-and-styles.md)
