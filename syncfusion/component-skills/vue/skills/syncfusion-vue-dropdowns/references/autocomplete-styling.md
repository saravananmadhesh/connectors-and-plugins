# Styling & Customization – Syncfusion Vue 3 AutoComplete

## Theme Setup

```typescript
// main.ts - Choose one theme
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-dropdowns/styles/material3.css';
```

Available themes: `material3`, `bootstrap5`, `bootstrap4`, `fluent`, `fabric`, `highcontrast`, `tailwind`

---

## Custom CSS Classes

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :cssClass="'custom-autocomplete'"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>

<style scoped>
.custom-autocomplete :deep(.e-input-group) {
  border: 2px solid #1976d2;
  border-radius: 8px;
}

.custom-autocomplete :deep(.e-input) {
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
}

.custom-autocomplete :deep(.e-list-item) {
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.custom-autocomplete :deep(.e-list-item:hover) {
  background-color: #e3f2fd;
}
</style>
```

---

## Float Label

```vue
<template>
  <div class="e-float-input">
    <ejs-autocomplete
      :dataSource="countries"
      :floatLabelType="'Auto'"
    />
    <label>Select Country</label>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

---

## Custom Popup Styling

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :popupHeight="'300px'"
  >
    <template #itemTemplate="{ data }">
      <div class="custom-item">
        <div class="item-name">{{ data }}</div>
        <div class="item-details">Tap to select</div>
      </div>
    </template>
  </ejs-autocomplete>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>

<style scoped>
.custom-item {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.item-name {
  font-weight: 500;
  color: #333;
}

.item-details {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
```

---

## Responsive Design

```vue
<template>
  <div class="container">
    <ejs-autocomplete
      :dataSource="countries"
      :popupWidth="'100%'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
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

- For data binding, read `references/autocomplete-data-binding.md`
- For templates, read `references/autocomplete-templates.md`
- For API reference, read `references/autocomplete-api.md`
