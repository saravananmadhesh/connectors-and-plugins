# Getting Started – Syncfusion Vue 3 AutoComplete

## Installation

Install the Syncfusion Vue Dropdowns package:

```bash
npm install @syncfusion/ej2-vue-dropdowns --save
```

## CSS Imports

Add required CSS imports to `src/main.ts`:

```typescript
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/auto-complete/index.css";
```

Available themes: `material3`, `bootstrap5`, `bootstrap4`, `fluent`, `fabric`, `highcontrast`, `tailwind`

## Basic Component Setup

### Vue 3 Composition API

```vue
<template>
  <ejs-autocomplete id="autocomplete" />
</template>

<script setup>
import { AutoCompleteComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## Binding a Data Source

### String Array

```vue
<template>
  <div style="padding: 20px">
    <label>Select Country:</label>
    <ejs-autocomplete
      :dataSource="countries"
      :value="selectedCountry"
      placeholder="Search countries..."
      @change="onCountryChange"
    ></ejs-autocomplete>
    <p>Selected: {{ selectedCountry }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AutoCompleteComponent } from '@syncfusion/ej2-vue-dropdowns';

const selectedCountry = ref('');
const countries = ref(['Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China']);

const onCountryChange = (args) => {
  selectedCountry.value = args.value;
};
</script>
```

### Object Array with Fields

```vue
<template>
  <div style="padding: 20px">
    <label>Select Employee:</label>
    <ejs-autocomplete
      :dataSource="employees"
      :fields="{ text: 'name', value: 'id' }"
      :value="selectedEmployeeId"
      placeholder="Search employees..."
      @change="onEmployeeChange"
    ></ejs-autocomplete>
    <p>Selected ID: {{ selectedEmployeeId }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AutoCompleteComponent } from '@syncfusion/ej2-vue-dropdowns';

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

## Configuring the Popup

### Popup Height and Width

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :popupHeight="'200px'"
    :popupWidth="'300px'"
    placeholder="Select country"
  ></ejs-autocomplete>
</template>

<script setup>
import { ref } from 'vue';
import { AutoCompleteComponent } from '@syncfusion/ej2-vue-dropdowns';

const countries = ref([...]);
</script>
```

### No Data Template

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :fields="{ text: 'name', value: 'code' }"
  >
    <template #noRecordsTemplate>
      <div class="custom-no-data">
        No matching countries found
      </div>
    </template>
  </ejs-autocomplete>
</template>

<script setup>
import { ref } from 'vue';
import { AutoCompleteComponent } from '@syncfusion/ej2-vue-dropdowns';

const countries = ref([...]);
</script>
```

## Key Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `:dataSource` | Array | [] | Data array to search |
| `:value` | string \| number | null | Selected value |
| `:fields` | Object | {} | Field mapping (text, value, etc.) |
| `:placeholder` | string | "" | Placeholder text |
| `:popupHeight` | string | "300px" | Height of dropdown |
| `:popupWidth` | string | "auto" | Width of dropdown |
| `:minLength` | number | 1 | Characters before filtering starts |
| `:suggestionCount` | number | 20 | Max suggestions to show |
| `:enabled` | boolean | true | Enable/disable component |
| `:readonly` | boolean | false | Read-only mode |

## Common Use Cases

### Search with Filter Delay

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :debounceDelay="300"
    :minLength="2"
  ></ejs-autocomplete>
</template>
```

### Autofill First Match

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :autofill="true"
  ></ejs-autocomplete>
</template>
```

### Case-Insensitive Search

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :ignoreCase="true"
  ></ejs-autocomplete>
</template>
```

## Next Steps

- For data binding options, read `references/autocomplete-data-binding.md`
- For filtering, read `references/autocomplete-filtering.md`
- For templates, read `references/autocomplete-templates.md`
- For API reference, read `references/autocomplete-api.md`
