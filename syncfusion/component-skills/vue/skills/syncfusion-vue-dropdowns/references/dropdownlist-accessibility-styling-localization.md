# Accessibility, Styling & Localization – Syncfusion Vue 3 DropdownList

## Accessibility (WCAG 2.2)

```vue
<template>
  <div>
    <label for="country-list">Select Country</label>
    <ejs-dropdownlist
      id="country-list"
      :dataSource="countries"
      aria-label="Country selection"
      aria-describedby="country-help"
    />
    <span id="country-help" class="text-sm text-gray-600">
      Choose your country from the list
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

---

## Styling & Theming

```vue
<template>
  <ejs-dropdownlist
    :dataSource="items"
    :cssClass="'custom-list'"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>

<style scoped>
.custom-list :deep(.e-input-group) {
  border: 2px solid #1976d2;
  border-radius: 8px;
  padding: 8px;
}

.custom-list :deep(.e-list-item:hover) {
  background-color: #f5f5f5;
}
</style>
```

---

## Localization & RTL

```vue
<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'">
    <ejs-dropdownlist
      :dataSource="items"
      :locale="currentLocale"
      :enableRtl="isRtl"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { L10n } from '@syncfusion/ej2-base';

const currentLocale = ref('en');
const isRtl = ref(false);
const items = ref([...]);

// Setup custom locale
L10n.load({
  'es': {
    'dropdowns': {
      'noRecordsTemplate': 'Sin registros encontrados'
    }
  }
});
</script>
```

---

## Next Steps

- For data binding, read `references/dropdownlist-data-binding.md`
- For filtering, read `references/dropdownlist-filtering.md`
- For API reference, read `references/dropdownlist-api.md`
