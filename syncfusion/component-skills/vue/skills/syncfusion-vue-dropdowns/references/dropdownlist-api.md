# API Reference – Syncfusion Vue 3 DropdownList

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `:dataSource` | Array | [] | Data array |
| `:value` | string \| number \| object | null | Selected value |
| `:fields` | Object | {} | Field mapping |
| `:placeholder` | string | "" | Placeholder text |
| `:popupHeight` | string | "300px" | Dropdown height |
| `:popupWidth` | string | "auto" | Dropdown width |
| `:allowFiltering` | boolean | false | Enable filtering |
| `:ignoreCase` | boolean | true | Case-insensitive |
| `:enabled` | boolean | true | Enable component |
| `:readonly` | boolean | false | Read-only mode |
| `:cssClass` | string | "" | Custom CSS class |
| `:enableVirtualization` | boolean | false | Virtual scrolling |
| `:enableRtl` | boolean | false | Enable RTL |
| `:locale` | string | "en" | Locale |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Value changed |
| `@filtering` | FilteringEventArgs | During filtering |
| `@created` | Object | Component created |
| `@destroyed` | Object | Component destroyed |
| `@focus` | FocusEventArgs | Input focused |
| `@blur` | BlurEventArgs | Input loses focus |

---

## Methods (via Template Ref)

| Method | Args | Returns | Description |
|--------|------|---------|-------------|
| `show()` | - | void | Show dropdown |
| `hide()` | - | void | Hide dropdown |
| `focus()` | - | void | Focus input |
| `destroy()` | - | void | Destroy component |

---

## Usage Example

```vue
<template>
  <ejs-dropdownlist
    ref="dropdownRef"
    :dataSource="items"
    :value="selectedItem"
    @change="onChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DropDownListComponent } from '@syncfusion/ej2-vue-dropdowns';

const dropdownRef = ref(null);
const selectedItem = ref('');
const items = ref([...]);

const onChange = (args) => {
  selectedItem.value = args.value;
};
</script>
```

---

## Related Components

- AutoComplete
- ComboBox
- MultiSelect
- ListBox

---

## See Also

- [Getting Started](dropdownlist-getting-started.md)
- [Data Binding](dropdownlist-data-binding.md)
- [Filtering](dropdownlist-filtering.md)
- [Grouping & Templates](dropdownlist-grouping-and-templates.md)
