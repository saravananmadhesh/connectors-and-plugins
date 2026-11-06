# SplitButton Types and Styles

> Customize SplitButton appearance and styles.

---

## Button Types

```vue
<template>
  <div class="space-y-3">
    <ejs-splitbutton 
      content="Primary"
      :items="items"
      cssClass="e-primary"
    ></ejs-splitbutton>
    <ejs-splitbutton 
      content="Success"
      :items="items"
      cssClass="e-success"
    ></ejs-splitbutton>
    <ejs-splitbutton 
      content="Warning"
      :items="items"
      cssClass="e-warning"
    ></ejs-splitbutton>
    <ejs-splitbutton 
      content="Danger"
      :items="items"
      cssClass="e-danger"
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

const items = [
  { text: 'Item 1', icon: 'e-icons e-edit' },
  { text: 'Item 2', icon: 'e-icons e-delete' }
];
</script>
```

## Icon with Content

```vue
<template>
  <div class="flex gap-4">
    <ejs-splitbutton 
      content="Download"
      iconCss="e-icons e-download"
      :items="items"
    ></ejs-splitbutton>
    <ejs-splitbutton 
      content="Upload"
      iconCss="e-icons e-upload"
      :items="items"
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

const items = [
  { text: 'CSV', icon: 'e-icons e-file' },
  { text: 'PDF', icon: 'e-icons e-file' },
  { text: 'Image', icon: 'e-icons e-image' }
];
</script>
```

## Size Variations

```vue
<template>
  <div class="flex gap-4">
    <ejs-splitbutton 
      content="Small"
      :items="items"
      cssClass="e-small"
    ></ejs-splitbutton>
    <ejs-splitbutton 
      content="Default"
      :items="items"
    ></ejs-splitbutton>
    <ejs-splitbutton 
      content="Large"
      :items="items"
      cssClass="e-large"
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

const items = [
  { text: 'Action 1' },
  { text: 'Action 2' }
];
</script>
```

---

## Next Steps

- Learn features in [splitbutton-features.md](splitbutton-features.md)
