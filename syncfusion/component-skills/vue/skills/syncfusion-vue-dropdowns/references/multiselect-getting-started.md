# Getting Started – Syncfusion Vue 3 MultiSelect

## Installation

```bash
npm install @syncfusion/ej2-vue-dropdowns --save
```

## CSS Imports

```typescript
 @import "../node_modules/@syncfusion/ej2-material3-theme/styles/multi-select/index.css";
```

## Basic MultiSelect

```vue
<template>
  <ejs-multiselect
    :dataSource="countries"
    placeholder="Select countries"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MultiSelectComponent } from '@syncfusion/ej2-vue-dropdowns';

const countries = ref(['USA', 'UK', 'Canada', 'Australia', 'Germany']);
</script>
```

---

## With Selection

```vue
<template>
  <div>
    <ejs-multiselect
      :dataSource="countries"
      :value="selectedCountries"
      placeholder="Select countries"
      @change="onSelectionChange"
    />
    <p>Selected: {{ selectedCountries.join(', ') }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCountries = ref(['USA', 'Canada']);
const countries = ref(['USA', 'UK', 'Canada', 'Australia', 'Germany']);

const onSelectionChange = (args) => {
  selectedCountries.value = args.value;
};
</script>
```

---

## Key Features

- Multiple selections with tags
- Search and filter
- Grouping support
- Custom templates
- Selection modes (Box, Delimiter, Default)

---

## Differences from DropdownList & ListBox

| Feature | MultiSelect | DropdownList | ListBox |
|---------|-------------|--------------|---------|
| Display | Tags/Chips | Dropdown | Scrollable list |
| Selection | Multiple | Single | Single/Multiple |
| Visual | Inline tags | Closed dropdown | Full visible |

---

## Next Steps

- For data binding, read `references/multiselect-data-binding.md`
- For selection modes, read `references/multiselect-selection-and-features.md`
- For filtering, read `references/multiselect-filtering.md`
- For API reference, read `references/multiselect-api.md`
