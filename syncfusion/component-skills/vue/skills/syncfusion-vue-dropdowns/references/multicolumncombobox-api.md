# API Reference – Syncfusion Vue 3 MultiColumnComboBox

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `:dataSource` | Array | [] | Data array |
| `:columns` | Array | [] | Column definitions |
| `:value` | string \| number \| object | null | Selected value |
| `:fields` | Object | {} | Field mapping |
| `:allowFiltering` | boolean | false | Enable filtering |
| `:allowSorting` | boolean | false | Enable sorting |
| `:popupHeight` | string | "300px" | Popup height |
| `:popupWidth` | string | "auto" | Popup width |
| `:enabled` | boolean | true | Enable component |
| `:readonly` | boolean | false | Read-only mode |
| `:cssClass` | string | "" | Custom CSS class |
| `:enableVirtualization` | boolean | false | Virtual scrolling |
| `:enableRtl` | boolean | false | Enable RTL |
| `:locale` | string | "en" | Locale |

---

## Column Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | string | Data field name |
| `headerText` | string | Column header |
| `width` | string | Column width |
| `allowSorting` | boolean | Enable sorting |
| `allowFiltering` | boolean | Enable filtering |
| `visible` | boolean | Show/hide column |
| `type` | string | Data type |
| `textAlign` | string | Text alignment |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Value changed |
| `@created` | Object | Component created |
| `@destroyed` | Object | Component destroyed |

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
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
    :fields="{ text: 'name', value: 'id' }"
    :value="selectedId"
    @change="onChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MultiColumnComboBoxComponent } from '@syncfusion/ej2-vue-dropdowns';

const selectedId = ref('');
const employees = ref([...]);
const columns = ref([...]);

const onChange = (args) => {
  selectedId.value = args.value;
};
</script>
```

---

## Related Components

- AutoComplete
- ComboBox
- DropdownList
- MultiSelect

---

## See Also

- [Getting Started](multicolumncombobox-getting-started.md)
- [Columns](multicolumncombobox-columns.md)
- [Data Binding](multicolumncombobox-data-binding.md)
- [Filtering](multicolumncombobox-filtering.md)
