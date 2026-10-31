# API Reference – Syncfusion Vue 3 ListBox

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `:dataSource` | Array | [] | Data array |
| `:value` | Array | [] | Selected values |
| `:fields` | Object | {} | Field mapping |
| `:selectionSettings` | Object | { mode: 'Single' } | Selection mode |
| `:allowDragAndDrop` | boolean | false | Enable drag-drop |
| `:enabled` | boolean | true | Enable component |
| `:height` | string | "auto" | List height |
| `:cssClass` | string | "" | Custom CSS class |
| `:enableVirtualization` | boolean | false | Virtual scrolling |
| `:enableRtl` | boolean | false | Enable RTL |
| `:locale` | string | "en" | Locale |

---

## Selection Modes

| Mode | Description |
|------|-------------|
| `Single` | Select one item |
| `Multiple` | Select multiple items |
| `CheckBox` | CheckBox selection |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Selection changed |
| `@dragStart` | DragEventArgs | Drag starts |
| `@drag` | DragEventArgs | During drag |
| `@drop` | DropEventArgs | Drag dropped |
| `@created` | Object | Component created |
| `@destroyed` | Object | Component destroyed |

---

## Methods (via Template Ref)

| Method | Args | Returns | Description |
|--------|------|---------|-------------|
| `getSelectedItems()` | - | Object | Get selected items |
| `setSelection()` | indices: number[] | void | Set selection |
| `getItems()` | - | Element[] | Get all items |
| `destroy()` | - | void | Destroy component |

---

## Usage Example

```vue
<template>
  <ejs-listbox
    ref="listBoxRef"
    :dataSource="items"
    :value="selected"
    :selectionSettings="{ mode: 'Multiple' }"
    @change="onSelectionChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListBoxComponent } from '@syncfusion/ej2-vue-dropdowns';

const listBoxRef = ref(null);
const selected = ref([]);
const items = ref([...]);

const onSelectionChange = (args) => {
  selected.value = args.value;
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

- [Getting Started](listbox-getting-started.md)
- [Data Binding](listbox-data-binding.md)
- [Selection](listbox-selection.md)
- [Dual ListBox](listbox-dual-list-box.md)
