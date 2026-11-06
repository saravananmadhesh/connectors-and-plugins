# API Reference – Syncfusion Vue 3 MultiSelect

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `:dataSource` | Array | [] | Data array |
| `:value` | Array | [] | Selected values |
| `:fields` | Object | {} | Field mapping |
| `:placeholder` | string | "" | Placeholder text |
| `:popupHeight` | string | "300px" | Dropdown height |
| `:popupWidth` | string | "auto" | Dropdown width |
| `:allowFiltering` | boolean | false | Enable filtering |
| `:mode` | string | "Box" | Selection mode |
| `:showSelectAll` | boolean | true | Show select all |
| `:maximumSelectionLength` | number | -1 | Max selections |
| `:showClearButton` | boolean | false | Show clear button |
| `:enabled` | boolean | true | Enable component |
| `:readonly` | boolean | false | Read-only mode |
| `:cssClass` | string | "" | Custom CSS class |
| `:enableVirtualization` | boolean | false | Virtual scrolling |
| `:enableRtl` | boolean | false | Enable RTL |
| `:locale` | string | "en" | Locale |

---

## Selection Modes

| Mode | Description |
|------|-------------|
| `Box` | Show selections in box |
| `Delimiter` | Show selections delimited |
| `Default` | Show selections as dropdown |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Selection changed |
| `@filtering` | FilteringEventArgs | During filtering |
| `@created` | Object | Component created |
| `@destroyed` | Object | Component destroyed |
| `@blur` | BlurEventArgs | Input loses focus |

---

## Methods (via Template Ref)

| Method | Args | Returns | Description |
|--------|------|---------|-------------|
| `show()` | - | void | Show dropdown |
| `hide()` | - | void | Hide dropdown |
| `focus()` | - | void | Focus input |
| `blur()` | - | void | Blur input |
| `destroy()` | - | void | Destroy component |

---

## Usage Example

```vue
<template>
  <ejs-multiselect
    :dataSource="items"
    :value="selected"
    :mode="'Box'"
    :showSelectAll="true"
    @change="onChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MultiSelectComponent } from '@syncfusion/ej2-vue-dropdowns';

const selected = ref([]);
const items = ref([...]);

const onChange = (args) => {
  selected.value = args.value;
};
</script>
```

---

## Related Components

- AutoComplete
- ComboBox
- DropdownList
- ListBox

---

## See Also

- [Getting Started](multiselect-getting-started.md)
- [Data Binding](multiselect-data-binding.md)
- [Selection & Features](multiselect-selection-and-features.md)
- [Filtering](multiselect-filtering.md)
- [Grouping & Templates](multiselect-grouping.md)
