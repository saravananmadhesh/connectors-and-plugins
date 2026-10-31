# API Reference – Syncfusion Vue 3 ComboBox

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `:dataSource` | Array | [] | Data array to bind |
| `:value` | string \| number \| object | null | Selected value |
| `:fields` | Object | {} | Field mapping |
| `:placeholder` | string | "" | Placeholder text |
| `:popupHeight` | string | "300px" | Dropdown height |
| `:popupWidth` | string | "auto" | Dropdown width |
| `:allowFiltering` | boolean | false | Enable filtering |
| `:allowCustom` | boolean | false | Allow custom values |
| `:ignoreCase` | boolean | true | Case-insensitive |
| `:enabled` | boolean | true | Enable component |
| `:readonly` | boolean | false | Read-only mode |
| `:cssClass` | string | "" | Custom CSS class |
| `:enableVirtualization` | boolean | false | Virtual scrolling |
| `:allowResize` | boolean | false | Allow popup resize |
| `:sortOrder` | string | "None" | Sort order |
| `:debounceDelay` | number | 300 | Debounce (ms) |
| `:minLength` | number | 1 | Min chars |
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
| `blur()` | - | void | Blur input |
| `destroy()` | - | void | Destroy component |

---

## Usage Example

```vue
<template>
  <ejs-combobox
    ref="comboBoxRef"
    :dataSource="employees"
    :fields="{ text: 'name', value: 'id' }"
    :value="selectedId"
    :allowFiltering="true"
    @change="onChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ComboBoxComponent } from '@syncfusion/ej2-vue-dropdowns';

const comboBoxRef = ref(null);
const selectedId = ref('');
const employees = ref([...]);

const onChange = (args) => {
  selectedId.value = args.value;
};
</script>
```

---

## Related Components

- AutoComplete
- DropdownList
- MultiSelect
- ListBox

---

## See Also

- [Getting Started](combobox-getting-started.md)
- [Data Binding](combobox-data-binding.md)
- [Filtering](combobox-filtering-and-search.md)
- [Advanced Features](combobox-advanced-features.md)
