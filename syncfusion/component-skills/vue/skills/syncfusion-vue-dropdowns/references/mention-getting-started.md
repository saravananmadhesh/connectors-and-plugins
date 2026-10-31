# Getting Started – Syncfusion Vue 3 Mention

## Installation

```bash
npm install @syncfusion/ej2-vue-richtexteditor --save
```

## CSS Imports

```typescript
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/mention/index.css";
```

## Basic Mention

```vue
<template>
  <ejs-mention
    :dataSource="mentions"
    @select="onMentionSelect"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MentionComponent } from '@syncfusion/ej2-vue-richtexteditor';

const mentions = ref([
  { text: 'John Smith', value: '@john' },
  { text: 'Jane Doe', value: '@jane' },
  { text: 'Bob Johnson', value: '@bob' }
]);

const onMentionSelect = (args) => {
  console.log('Selected:', args.value);
};
</script>
```

---

## Use Cases

- User mentions in comments
- Tag mentions in posts
- Autocomplete for @mentions in chat
- Email recipient suggestions

---

## Key Features

- Trigger character customization (@, #, etc.)
- Custom data sources
- Filtering and searching
- Custom templates
- Multiple mention support

---

## Next Steps

- For data binding, read `references/mention-working-with-data.md`
- For filtering, read `references/mention-filtering-data.md`
- For templates, read `references/mention-template.md`
- For API reference, read `references/mention-api.md`
