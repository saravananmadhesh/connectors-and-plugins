# Value Binding – Syncfusion Vue 3 AutoComplete

## Primitive Value Binding

Bind string or number values:

```vue
<template>
  <div style="padding: 20px">
    <ejs-autocomplete
      :dataSource="countries"
      :value="selectedCountry"
      @change="onCountryChange"
    />
    <p>Selected: {{ selectedCountry }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCountry = ref('USA');
const countries = ref(['USA', 'UK', 'Canada', 'Australia']);

const onCountryChange = (args) => {
  selectedCountry.value = args.value;
};
</script>
```

---

## Object Binding

Bind entire objects:

```vue
<template>
  <div style="padding: 20px">
    <ejs-autocomplete
      :dataSource="employees"
      :fields="{ text: 'name', value: 'id' }"
      :value="selectedEmployeeId"
      :allowObjectBinding="true"
      @change="onEmployeeChange"
    />
    <p>Selected Employee: {{ selectedEmployee }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedEmployeeId = ref(1);
const employees = ref([
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
]);

const selectedEmployee = computed(() => {
  return employees.value.find(e => e.id === selectedEmployeeId.value);
});

const onEmployeeChange = (args) => {
  selectedEmployeeId.value = args.value;
};
</script>
```

---

## Reactive Value Updates

Update value programmatically:

```vue
<template>
  <div style="padding: 20px">
    <ejs-autocomplete
      ref="autoCompleteRef"
      :dataSource="countries"
      :value="selectedCountry"
    />
    
    <button @click="setCountry('Canada')">Set to Canada</button>
    <button @click="clearSelection">Clear</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const autoCompleteRef = ref(null);
const selectedCountry = ref('');
const countries = ref(['USA', 'Canada', 'Mexico']);

const setCountry = (country) => {
  selectedCountry.value = country;
};

const clearSelection = () => {
  selectedCountry.value = '';
};
</script>
```

---

## Next Steps

- For data binding, read `references/autocomplete-data-binding.md`
- For templates, read `references/autocomplete-templates.md`
- For API reference, read `references/autocomplete-api.md`
