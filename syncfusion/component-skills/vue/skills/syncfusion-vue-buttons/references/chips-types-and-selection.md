# Chips Types and Selection

> Explore the different chip types and selection modes available in Syncfusion chips.

---

## Table of Contents

1. [Four Chip Types](#four-chip-types)
2. [Single Selection](#single-selection)
3. [Multiple Selection](#multiple-selection)
4. [Pre-Selected Chips](#pre-selected-chips)

---

## Four Chip Types

### Input Chips

Represent user input or tags:

```vue
<template>
  <div class="example-section">
    <h2>Input Chips</h2>
    <p>Best for: Tags, user inputs, email recipients</p>
    
    <ejs-chiplist id="inputChips"
      :data-source="tags"
      chip-type="Input"
      :deletable="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const tags = ref([
  { text: 'React' },
  { text: 'Vue' },
  { text: 'Angular' },
  { text: 'Svelte' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

### Choice Chips

Allow single selection from a set of options:

```vue
<template>
  <div class="example-section">
    <h2>Choice Chips</h2>
    <p>Best for: Single-choice selections, radio-like behavior</p>
    <p>Selected: {{ selectedChoice }}</p>
    
    <ejs-chiplist id="choiceChips"
      :data-source="choices"
      chip-type="Choice"
      @click="handleChoiceClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const selectedChoice = ref('');

const choices = ref([
  { text: 'Small' },
  { text: 'Medium' },
  { text: 'Large' }
]);

const handleChoiceClick = (args) => {
  selectedChoice.value = args.text;
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

### Filter Chips

Allow multiple selection for filtering:

```vue
<template>
  <div class="example-section">
    <h2>Filter Chips</h2>
    <p>Best for: Multiple selections, filter groups</p>
    <p>Selected: {{ selectedFilters.join(', ') || 'None' }}</p>
    
    <ejs-chiplist id="filterChips"
      :data-source="filters"
      chip-type="Filter"
      @click="handleFilterClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const selectedFilters = ref([]);

const filters = ref([
  { text: 'Popular', selected: true },
  { text: 'Latest' },
  { text: 'Trending' },
  { text: 'Recommended' }
]);

const handleFilterClick = (args) => {
  const index = selectedFilters.value.indexOf(args.text);
  if (index > -1) {
    selectedFilters.value.splice(index, 1);
  } else {
    selectedFilters.value.push(args.text);
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

### Action Chips

Trigger actions or events:

```vue
<template>
  <div class="example-section">
    <h2>Action Chips</h2>
    <p>Best for: Triggering actions, navigation</p>
    <p v-if="lastAction">Last action: {{ lastAction }}</p>
    
    <ejs-chiplist id="actionChips"
      :data-source="actions"
      chip-type="Action"
      @click="handleAction"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const lastAction = ref('');

const actions = ref([
  { text: 'Edit' },
  { text: 'Share' },
  { text: 'Delete' },
  { text: 'Archive' }
]);

const handleAction = (args) => {
  lastAction.value = `${args.text} action triggered`;
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Single Selection

Enable single selection mode:

```vue
<template>
  <div class="example-section">
    <h2>Single Selection</h2>
    
    <fieldset>
      <legend>Choose your preference:</legend>
      <ejs-chiplist id="singleSelectionChips"
        :data-source="singleChoices"
        selection="Single"
      />
    </fieldset>
    
    <p v-if="selectedItem">Selected: <strong>{{ selectedItem }}</strong></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const selectedItem = ref('');

const singleChoices = ref([
  { text: 'HTML' },
  { text: 'CSS' },
  { text: 'JavaScript' },
  { text: 'TypeScript' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

fieldset {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}
</style>
```

---

## Multiple Selection

Enable multiple selection mode:

```vue
<template>
  <div class="example-section">
    <h2>Multiple Selection</h2>
    <p>Hold Ctrl/Cmd and click to select multiple chips</p>
    
    <ejs-chiplist id="multipleSelectionChips"
      :data-source="multipleChoices"
      selection="Multiple"
      @click="handleMultipleSelection"
    />
    
    <p v-if="selectedItems.length > 0">
      Selected ({{ selectedItems.length }}): 
      <strong>{{ selectedItems.join(', ') }}</strong>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const selectedItems = ref([]);

const multipleChoices = ref([
  { text: 'Monday' },
  { text: 'Tuesday' },
  { text: 'Wednesday' },
  { text: 'Thursday' },
  { text: 'Friday' },
  { text: 'Saturday' },
  { text: 'Sunday' }
]);

const handleMultipleSelection = (args) => {
  const text = args.text;
  const index = selectedItems.value.indexOf(text);
  
  if (index > -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(text);
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Pre-Selected Chips

Set certain chips as pre-selected:

```vue
<template>
  <div class="example-section">
    <h2>Pre-Selected Chips</h2>
    
    <h3>Filter Chips (Multiple Pre-Selected)</h3>
    <ejs-chiplist id="preselectedFiltersChips"
      :data-source="preselectedFilters"
      chip-type="Filter"
      selection="Multiple"
    />
    
    <h3>Choice Chips (Single Pre-Selected)</h3>
    <ejs-chiplist id="preselectedChoiceChips"
      :data-source="preselectedChoice"
      chip-type="Choice"
      selection="Single"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const preselectedFilters = ref([
  { text: 'Fruits', selected: true },
  { text: 'Vegetables', selected: true },
  { text: 'Dairy' },
  { text: 'Meat' }
]);

const preselectedChoice = ref([
  { text: 'Email' },
  { text: 'Phone', selected: true },
  { text: 'SMS' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
```

---

## Next Steps

- Learn customization in [chips-customization.md](chips-customization.md)
- Implement drag and drop in [chips-drag-and-drop.md](chips-drag-and-drop.md)
- Check styling in [chips-style.md](chips-style.md)
- Review accessibility in [chips-accessibility.md](chips-accessibility.md)
