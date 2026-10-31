# Filtering – Syncfusion Vue 3 AutoComplete

## Table of Contents
- [Filter Types](#filter-types)
- [Suggestion Count](#suggestion-count)
- [Minimum Length](#minimum-length)
- [Case-Insensitive](#case-insensitive)
- [Custom Filtering](#custom-filtering)

---

## Filter Types

```vue
<template>
  <div style="padding: 20px">
    <label>
      <input v-model="filterType" type="radio" value="StartsWith" /> Starts With
    </label>
    <label>
      <input v-model="filterType" type="radio" value="EndsWith" /> Ends With
    </label>
    <label>
      <input v-model="filterType" type="radio" value="Contains" /> Contains
    </label>
    
    <ejs-autocomplete
      :dataSource="countries"
      :filterType="filterType"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const filterType = ref('StartsWith');
const countries = ref(['USA', 'UK', 'Ukraine', 'Canada', 'Australia']);
</script>
```

---

## Suggestion Count

Limit number of suggestions:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :suggestionCount="5"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

---

## Minimum Length

Require minimum characters before filtering:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :minLength="3"
    placeholder="Type at least 3 characters"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

---

## Case-Insensitive

Ignore case in filtering:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :ignoreCase="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref(['USA', 'usa', 'Canada', 'canada']);
</script>
```

---

## Custom Filtering

Use filtering event for custom logic:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    @filtering="onFiltering"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);

const onFiltering = (args) => {
  const { text } = args;
  
  // Custom filter logic
  if (text.length < 2) {
    args.cancel = true;
  }
};
</script>
```

---

## Next Steps

- For data binding, read `references/autocomplete-data-binding.md`
- For templates, read `references/autocomplete-templates.md`
- For API reference, read `references/autocomplete-api.md`
