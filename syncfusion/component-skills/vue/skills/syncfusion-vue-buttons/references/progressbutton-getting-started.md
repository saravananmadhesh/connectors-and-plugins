# ProgressButton Getting Started

> Create ProgressButton components with progress tracking.

---

## Installation

Ensure Syncfusion EJ2 Vue packages are installed:

```bash
npm install @syncfusion/ej2-vue-buttons @syncfusion/ej2-base
```

## Import Styles

```vue
<script setup>
import "@syncfusion/ej2-material3-theme/styles/progress-button/index.css";
</script>
```

## Basic ProgressButton

```vue
<template>
  <ejs-progressbutton 
    content="Download"
    :duration="4000"
  ></ejs-progressbutton>
</template>

<script setup>
import { ProgressButtonComponent } from '@syncfusion/ej2-vue-buttons';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';

export default {
  name: "App",
  components: {
    "ejs-progressbutton": ProgressButtonComponent
  }
}
</script>
```

## ProgressButton with Click Handler

```vue
<template>
  <ejs-progressbutton 
    ref="progressRef"
    content="Process"
    :duration="3000"
    @click="handleClick"
  ></ejs-progressbutton>
</template>

<script setup>
import { ref } from 'vue';
import { ProgressButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-progressbutton": ProgressButtonComponent
  }
}

const progressRef = ref(null);

const handleClick = () => {
  progressRef.value?.click?.();
};
</script>
```

## Multiple ProgressButtons

```vue
<template>
  <div class="flex gap-4">
    <ejs-progressbutton 
      content="Upload"
      :duration="2000"
      cssClass="e-primary"
    ></ejs-progressbutton>
    <ejs-progressbutton 
      content="Sync"
      :duration="3000"
      cssClass="e-success"
    ></ejs-progressbutton>
    <ejs-progressbutton 
      content="Export"
      :duration="4000"
      cssClass="e-warning"
    ></ejs-progressbutton>
  </div>
</template>

<script setup>
import { ProgressButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-progressbutton": ProgressButtonComponent
  }
}
</script>
```

## Running Your App

```bash
npm run dev
```

---

## Next Steps

- Explore spinner and progress in [progressbutton-spinner-and-progress.md](progressbutton-spinner-and-progress.md)
