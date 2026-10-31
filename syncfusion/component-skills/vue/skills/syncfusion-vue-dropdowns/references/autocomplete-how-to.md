# How-To Guide – Syncfusion Vue 3 AutoComplete

## Autofill First Match

Automatically fill the input with first matching suggestion:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :autofill="true"
    placeholder="Type to see autofill..."
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref(['Australia', 'Austria', 'Austria-Hungary', 'Australia-China']);
</script>
```

When user types "Au", it auto-fills to "Australia" and highlights the extra characters.

---

## Highlight Matching Text

Highlight typed characters in suggestions:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :highlight="true"
  >
    <template #itemTemplate="{ data }">
      <div v-html="highlightMatch(data, searchText)" />
    </template>
  </ejs-autocomplete>
</template>

<script setup>
import { ref } from 'vue';

const searchText = ref('');
const countries = ref([...]);

const highlightMatch = (text, search) => {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, 'gi');
  return text.replace(regex, '<strong style="background-color: #ffeb3b;">$1</strong>');
};
</script>
```

---

## Icons in AutoComplete

Display icons with suggestions:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :fields="{ text: 'name', value: 'code', iconCss: 'flag' }"
  >
    <template #itemTemplate="{ data }">
      <div class="flex items-center gap-2">
        <img :src="`/flags/${data.code}.png`" class="w-5 h-5" />
        <span>{{ data.name }}</span>
      </div>
    </template>
  </ejs-autocomplete>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([
  { name: 'United States', code: 'US', flag: 'us' },
  { name: 'United Kingdom', code: 'UK', flag: 'uk' },
  { name: 'Canada', code: 'CA', flag: 'ca' }
]);
</script>
```

---

## Search with Debounce

Delay filtering to reduce unnecessary searches:

```vue
<template>
  <ejs-autocomplete
    :dataSource="employees"
    :debounceDelay="500"
    :minLength="2"
    placeholder="Search employees (min 2 chars)..."
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([...]);
</script>
```

---

## Clear Selection Button

```vue
<template>
  <div style="display: flex; gap: 10px">
    <ejs-autocomplete
      ref="autoCompleteRef"
      :dataSource="countries"
      :value="selectedCountry"
    />
    <button @click="clearValue" v-if="selectedCountry">
      Clear
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const autoCompleteRef = ref(null);
const selectedCountry = ref('');
const countries = ref([...]);

const clearValue = () => {
  selectedCountry.value = '';
};
</script>
```

---

## Next Steps

- For styling, read `references/autocomplete-styling.md`
- For data binding, read `references/autocomplete-data-binding.md`
- For API reference, read `references/autocomplete-api.md`
