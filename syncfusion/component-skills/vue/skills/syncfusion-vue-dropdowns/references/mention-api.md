# API Reference – Syncfusion Vue 3 Mention

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `:dataSource` | Array | [] | Data array |
| `:fields` | Object | {} | Field mapping |
| `:mentionChar` | string | "@" | Trigger character |
| `:minChars` | number | 1 | Min chars to trigger |
| `:filterType` | string | "StartsWith" | Filter type |
| `:ignoreCase` | boolean | true | Case-insensitive |
| `:enabled` | boolean | true | Enable component |
| `:popupHeight` | string | "300px" | Popup height |
| `:popupWidth` | string | "auto" | Popup width |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `@select` | SelectEventArgs | Item selected |
| `@filtering` | FilteringEventArgs | During filtering |
| `@created` | Object | Component created |
| `@destroyed` | Object | Component destroyed |

---

## Usage Example

```vue
<template>
  <ejs-mention
    :dataSource="users"
    :fields="{ text: 'name', value: 'email' }"
    :mentionChar="'@'"
    @select="onMentionSelect"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MentionComponent } from '@syncfusion/ej2-vue-richtexteditor';

const users = ref([...]);

const onMentionSelect = (args) => {
  console.log('Mentioned:', args.value);
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

- [Getting Started](mention-getting-started.md)
- [Working with Data](mention-working-with-data.md)
- [Filtering Data](mention-filtering-data.md)
- [Templates](mention-template.md)
