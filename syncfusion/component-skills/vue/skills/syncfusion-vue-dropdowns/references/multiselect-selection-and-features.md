# Selection & Features – Syncfusion Vue 3 MultiSelect

## Selection Modes

```vue
<template>
  <div style="padding: 20px">
    <!-- Box Mode (Default) -->
    <ejs-multiselect
      :dataSource="items"
      :mode="'Box'"
      placeholder="Box mode"
    />
    
    <!-- Delimiter Mode -->
    <ejs-multiselect
      :dataSource="items"
      :mode="'Delimiter'"
      :delimiterChar="','"
      placeholder="Delimiter mode"
    />
    
    <!-- Default Mode -->
    <ejs-multiselect
      :dataSource="items"
      :mode="'Default'"
      placeholder="Default mode"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
</script>
```

---

## Show Select All

```vue
<template>
  <ejs-multiselect
    :dataSource="items"
    :showSelectAll="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
</script>
```

---

## Max Selection

```vue
<template>
  <ejs-multiselect
    :dataSource="items"
    :maximumSelectionLength="3"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
</script>
```

---

## Clear Selection

```vue
<template>
  <div style="display: flex; gap: 10px">
    <ejs-multiselect
      :dataSource="items"
      :value="selectedItems"
      :showClearButton="true"
    />
    <button @click="clearAll">Clear All</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedItems = ref([]);
const items = ref([...]);

const clearAll = () => {
  selectedItems.value = [];
};
</script>
```

---

## Next Steps

- For filtering, read `references/multiselect-filtering.md`
- For grouping, read `references/multiselect-grouping.md`
- For API reference, read `references/multiselect-api.md`
