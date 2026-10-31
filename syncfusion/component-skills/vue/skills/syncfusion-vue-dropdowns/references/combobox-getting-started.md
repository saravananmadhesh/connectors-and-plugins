# Getting Started – Syncfusion Vue 3 ComboBox

## Installation

```bash
npm install @syncfusion/ej2-vue-dropdowns --save
```

## CSS Imports

Add to `src/main.ts`:

```typescript
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/combo-box/index.css";
```

## Basic ComboBox

```vue
<template>
  <ejs-combobox id="combobox" />
</template>

<script setup>
import { ComboBoxComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## With Data Binding

```vue
<template>
  <div style="padding: 20px">
    <label>Select Employee:</label>
    <ejs-combobox
      :dataSource="employees"
      :fields="{ text: 'name', value: 'id' }"
      :value="selectedEmployeeId"
      placeholder="Search or select..."
      @change="onEmployeeChange"
    />
    <p>Selected: {{ selectedEmployeeId }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ComboBoxComponent } from '@syncfusion/ej2-vue-dropdowns';

const selectedEmployeeId = ref('');
const employees = ref([
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Bob Johnson' },
  { id: 4, name: 'Alice Brown' }
]);

const onEmployeeChange = (args) => {
  selectedEmployeeId.value = args.value;
};
</script>
```

## Key Properties

| Prop | Type | Description |
|------|------|-------------|
| `:dataSource` | Array | Data to bind |
| `:value` | string \| number \| object | Selected value |
| `:fields` | Object | Field mapping |
| `:placeholder` | string | Placeholder text |
| `:popupHeight` | string | Dropdown height |
| `:allowFiltering` | boolean | Enable filtering |
| `:allowCustom` | boolean | Allow custom values |

---

## Common Use Cases

### With Filtering

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    :allowFiltering="true"
    placeholder="Search countries..."
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref(['USA', 'UK', 'Canada', 'Australia']);
</script>
```

### With Custom Values

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
