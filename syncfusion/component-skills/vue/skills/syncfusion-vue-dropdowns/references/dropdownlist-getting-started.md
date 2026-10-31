# Getting Started – Syncfusion Vue 3 DropdownList

## Installation

```bash
npm install @syncfusion/ej2-vue-dropdowns --save
```

## CSS Imports

```typescript
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/drop-down-list/index.css";
```

## Basic DropdownList

```vue
<template>
  <ejs-dropdownlist
    :dataSource="sportsList"
    placeholder="Select a sport"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DropDownListComponent } from '@syncfusion/ej2-vue-dropdowns';

const sportsList = ref(['Cricket', 'Football', 'Tennis', 'Basketball']);
</script>
```

---

## With Object Data

```vue
<template>
  <ejs-dropdownlist
    :dataSource="countries"
    :fields="{ text: 'name', value: 'code' }"
    :value="selectedCountry"
    placeholder="Select country"
    @change="onCountryChange"
  />
</template>

<script setup>
import { ref } from 'vue';

const selectedCountry = ref('');
const countries = ref([
  { code: 'USA', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' }
]);

const onCountryChange = (args) => {
  selectedCountry.value = args.value;
};
</script>
```

---

## Key Differences from ComboBox

| Feature | DropdownList | ComboBox |
|---------|--------------|----------|
| Filtering | Optional | Built-in |
| Custom Values | Not supported | Supported |
| Search | `:allowFiltering="true"` | Always searchable |
| Typing | Keyboard selection | Auto-search |

---

## Common Use Cases

### Form Integration

```vue
<template>
  <form @submit.prevent="submitForm">
    <label>Status:</label>
    <ejs-dropdownlist
      :dataSource="statusOptions"
      :value="formData.status"
      @change="updateStatus"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({ status: '' });
const statusOptions = ref(['Draft', 'Published', 'Archived']);

const updateStatus = (args) => {
  formData.value.status = args.value;
};

const submitForm = () => {
  console.log(formData.value);
};
</script>
```

---

## Next Steps

- For data binding, read `references/dropdownlist-data-binding.md`
- For advanced features, read `references/dropdownlist-features-and-configuration.md`
- For API reference, read `references/dropdownlist-api.md`
