# Dual ListBox – Syncfusion Vue 3 ListBox

## Dual ListBox Pattern

```vue
<template>
  <div class="flex gap-4">
    <!-- Available Items -->
    <div>
      <h3>Available</h3>
      <ejs-listbox
        :dataSource="availableItems"
        :value="selectedAvailable"
        :selectionSettings="{ mode: 'Multiple' }"
        @change="onAvailableChange"
      />
    </div>
    
    <!-- Selected Items -->
    <div>
      <h3>Selected</h3>
      <ejs-listbox
        :dataSource="selectedItems"
        :value="selectedFromList"
        :selectionSettings="{ mode: 'Multiple' }"
        @change="onSelectedChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedAvailable = ref([]);
const selectedFromList = ref([]);
const availableItems = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
const selectedItems = ref([]);

const onAvailableChange = (args) => {
  selectedAvailable.value = args.value;
};

const onSelectedChange = (args) => {
  selectedFromList.value = args.value;
};
</script>
```

---

## With Transfer Buttons

```vue
<template>
  <div class="flex gap-4 items-start">
    <div class="flex-1">
      <h3>Available</h3>
      <ejs-listbox ref="availableRef" :dataSource="availableItems" />
    </div>
    
    <div class="flex flex-col gap-2 justify-center">
      <button @click="moveToSelected" class="btn">→</button>
      <button @click="moveToAvailable" class="btn">←</button>
    </div>
    
    <div class="flex-1">
      <h3>Selected</h3>
      <ejs-listbox ref="selectedRef" :dataSource="selectedItems" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const availableRef = ref(null);
const selectedRef = ref(null);
const availableItems = ref(['Item 1', 'Item 2', 'Item 3']);
const selectedItems = ref([]);

const moveToSelected = () => {
  const selected = availableRef.value?.value || [];
  selectedItems.value.push(...selected);
  availableItems.value = availableItems.value.filter(
    item => !selected.includes(item)
  );
};

const moveToAvailable = () => {
  const selected = selectedRef.value?.value || [];
  availableItems.value.push(...selected);
  selectedItems.value = selectedItems.value.filter(
    item => !selected.includes(item)
  );
};
</script>
```

---

## Next Steps

- For data binding, read `references/listbox-data-binding.md`
- For templates, read `references/listbox-icons-and-templates.md`
- For API reference, read `references/listbox-api.md`
