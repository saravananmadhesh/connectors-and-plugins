# SpeedDial API Reference

> Complete API documentation for SpeedDial component.

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | array | `[]` | Menu items |
| `icon-css` | string | `''` | Main button icon |
| `mode` | string | `'Linear'` | Display mode: Linear/Radial/Quad |
| `position` | string | `'BottomRight'` | Button position |
| `css-class` | string | `''` | Custom CSS classes |
| `visible` | boolean | `true` | Show/hide SpeedDial |
| `disabled` | boolean | `false` | Disable SpeedDial |

## Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `show()` | - | void | Show SpeedDial |
| `hide()` | - | void | Hide SpeedDial |
| `toggle()` | - | void | Toggle open/close |

## Events

| Event | Description |
|-------|-------------|
| `@item-click` | Fired when item clicked |
| `@open` | Fired when menu opens |
| `@close` | Fired when menu closes |
| `@created` | Fired on creation |
| `@destroyed` | Fired on destruction |

---

## Complete Example

```vue
<template>
  <div class="p-6">
    <ejs-speeddial 
      :items="items"
      iconCss="e-icons e-plus"
      mode="Radial"
      position="BottomRight"
      @item-click="handleItemClick"
    ></ejs-speeddial>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const items = [
  { text: 'Create', icon: 'e-icons e-plus' },
  { text: 'Edit', icon: 'e-icons e-edit' },
  { text: 'Delete', icon: 'e-icons e-delete' },
  { text: 'Share', icon: 'e-icons e-share' }
];

const message = ref('');

const handleItemClick = (event) => {
  message.value = `Action: ${event.item?.text}`;
};
</script>
```

---

## Related Components

- [Button](button-getting-started.md)
- [FloatingActionButton](floatingactionbutton-getting-started.md)
