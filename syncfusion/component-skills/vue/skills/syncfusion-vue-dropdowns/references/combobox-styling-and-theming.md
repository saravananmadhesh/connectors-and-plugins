# Styling & Theming – Syncfusion Vue 3 ComboBox

## Themes

```typescript
// main.ts - Choose one
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-dropdowns/styles/material3.css';
```

Available themes: `material3`, `bootstrap5`, `bootstrap4`, `fluent`, `fabric`, `highcontrast`, `tailwind`

---

## Custom CSS

```vue
<template>
  <ejs-combobox
    :dataSource="items"
    :cssClass="'custom-combobox'"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>

<style scoped>
.custom-combobox :deep(.e-input-group) {
  border: 2px solid #1976d2;
  border-radius: 8px;
}

.custom-combobox :deep(.e-input) {
  padding: 12px;
  font-size: 16px;
}
</style>
```

---

## Responsive Design

```vue
<template>
  <div class="container">
    <ejs-combobox
      :dataSource="items"
      :popupWidth="'100%'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 500px;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
</style>
```

---

## Next Steps

- For data binding, read `references/combobox-data-binding.md`
- For filtering, read `references/combobox-filtering-and-search.md`
- For API reference, read `references/combobox-api.md`
