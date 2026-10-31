# Advanced Features – Syncfusion Vue 3 ComboBox

## Cascading ComboBox

```vue
<template>
  <div style="padding: 20px">
    <div class="mb-4">
      <label>Country</label>
      <ejs-combobox
        :dataSource="countries"
        :value="selectedCountry"
        @change="onCountryChange"
      />
    </div>
    
    <div v-if="selectedCountry">
      <label>State</label>
      <ejs-combobox
        :dataSource="availableStates"
        :value="selectedState"
        @change="onStateChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const countries = ref(['USA', 'Canada', 'Mexico']);
const statesByCountry = ref({
  'USA': ['California', 'Texas', 'Florida'],
  'Canada': ['Ontario', 'Quebec', 'BC'],
  'Mexico': ['Jalisco', 'Monterrey']
});

const selectedCountry = ref('');
const selectedState = ref('');

const availableStates = computed(() => {
  return statesByCountry.value[selectedCountry.value] || [];
});

const onCountryChange = (args) => {
  selectedCountry.value = args.value;
  selectedState.value = '';
};

const onStateChange = (args) => {
  selectedState.value = args.value;
};
</script>
```

---

## Virtual Scrolling

```vue
<template>
  <ejs-combobox
    :dataSource="largeDataset"
    :enableVirtualization="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const largeDataset = ref(
  Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`)
);
</script>
```

---

## Allow Custom Values

```vue
<template>
  <ejs-combobox
    :dataSource="departments"
    :allowCustom="true"
    placeholder="Select or type department..."
  />
</template>

<script setup>
import { ref } from 'vue';

const departments = ref(['Sales', 'IT', 'HR', 'Finance']);
</script>
```

---

## Next Steps

- For data binding, read `references/combobox-data-binding.md`
- For filtering, read `references/combobox-filtering-and-search.md`
- For API reference, read `references/combobox-api.md`
