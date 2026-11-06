# SplitButton API Reference

> Complete API documentation for SplitButton component.

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | string | `''` | Primary button text |
| `items` | array | `[]` | Dropdown menu items |
| `icon-css` | string | `''` | Button icon CSS class |
| `css-class` | string | `''` | Custom CSS classes |
| `disabled` | boolean | `false` | Disable button |
| `open-orientation` | string | `'Below'` | Dropdown position |
| `id` | string | `''` | Unique identifier |

## Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `click()` | - | void | Trigger primary action |
| `toggle()` | - | void | Toggle dropdown |

## Events

| Event | Description |
|-------|-------------|
| `@click` | Fired on primary button click |
| `@item-click` | Fired on item selection |
| `@open` | Fired when dropdown opens |
| `@close` | Fired when dropdown closes |
| `@created` | Fired on component creation |
| `@destroyed` | Fired on component destruction |

---

## Complete Example

```vue
<template>
  <div class="p-6">
    <div class="space-y-4">
      <ejs-splitbutton 
        content="Save"
        iconCss="e-icons e-save"
        :items="items"
        cssClass="e-primary"
        @click="onSave"
        @item-click="onSaveAs"
      ></ejs-splitbutton>
      
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const items = [
  { text: 'Save as Draft', icon: 'e-icons e-file' },
  { text: 'Save as PDF', icon: 'e-icons e-pdf' },
  { text: 'Save as ZIP', icon: 'e-icons e-archive' }
];

const message = ref('');

const onSave = () => {
  message.value = 'Document saved successfully!';
};

const onSaveAs = (event) => {
  message.value = `Saved as: ${event.item?.text}`;
};
</script>
```

---

## Related Components

- [Button](button-getting-started.md)
- [DropdownButton](dropdownbutton-getting-started.md)
