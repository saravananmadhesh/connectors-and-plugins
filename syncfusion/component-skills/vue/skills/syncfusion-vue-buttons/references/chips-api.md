# Chips API Reference

> Complete API documentation for Syncfusion chips component including properties, methods, and events.

---

## Table of Contents

1. [ChipListComponent Properties](#chiplistcomponent-properties)
2. [ChipComponent Properties](#chipcomponent-properties)
3. [Methods](#methods)
4. [Events](#events)
5. [TypeScript Interfaces](#typescript-interfaces)
6. [Complete Example](#complete-example)

---

## ChipListComponent Properties

Main container properties for chip list:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data-source` | Array | [] | Array of chip objects to render |
| `chip-type` | string | 'Default' | Type of chips (Default, Input, Choice, Filter, Action) |
| `selection` | string | 'None' | Selection mode (None, Single, Multiple) |
| `enabled-rtl` | boolean | false | Enable right-to-left text direction |
| `css-class` | string | '' | Additional CSS classes |
| `enable-delete` | boolean | false | Enable delete/remove button on chips |
| `enable-persistence` | boolean | false | Persist chip state to localStorage |

```vue
<template>
  <ejs-chiplist id="chip1"
    :data-source="chipData"
    chip-type="Filter"
    selection="Multiple"
    :enable-delete="true"
    css-class="e-primary"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chipData = ref([
  { text: 'Chip 1' },
  { text: 'Chip 2' }
]);
</script>
```

---

## ChipComponent Properties

Individual chip item properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | string | '' | Display text for chip |
| `icon` | string | '' | Icon CSS class name |
| `avatar` | string | '' | Avatar image URL |
| `selected` | boolean | false | Whether chip is selected |
| `enabled` | boolean | true | Whether chip is enabled |
| `leading-icon` | string | '' | Icon before chip text |
| `trailing-icon` | string | '' | Icon after chip text |
| `html-attributes` | object | {} | Custom HTML attributes |

```vue
<template>
  <ejs-chiplist id="chip2" :data-source="advancedChips" />
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const advancedChips = ref([
  { 
    text: 'Complete',
    icon: 'e-icons e-check',
    selected: true,
    htmlAttributes: { 'data-status': 'done' }
  },
  { 
    text: 'In Progress',
    icon: 'e-icons e-clock',
    enabled: true
  },
  { 
    text: 'Pending',
    leadingIcon: 'e-icons e-wait',
    enabled: false
  }
]);
</script>
```

---

## Methods

Available methods on ChipListComponent:

### selectChip(index)
Select a chip by index:

```vue
<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chipList = ref(null);

const selectFirstChip = () => {
  chipList.value?.selectChip(0);
};
</script>

<template>
  <ejs-chiplist id="chipSelectFirst" ref="chipList" :data-source="chips" />
  <button @click="selectFirstChip">Select First</button>
</template>
```

### clearSelection()
Clear all selected chips:

```vue
<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chipList = ref(null);

const clearSelected = () => {
  chipList.value?.clearSelection();
};
</script>

<template>
  <ejs-chiplist id="chipClearSelection" ref="chipList" :data-source="chips" />
  <button @click="clearSelected">Clear Selection</button>
</template>
```

### removeChip(index)
Remove a chip by index:

```vue
<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chipList = ref(null);

const removeLastChip = () => {
  chipList.value?.removeChip(chips.value.length - 1);
};
</script>

<template>
  <ejs-chiplist id="chipRemoveChip" ref="chipList" :data-source="chips" />
  <button @click="removeLastChip">Remove Last</button>
</template>
```

### removeAll()
Remove all chips:

```vue
<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chipList = ref(null);

const removeAllChips = () => {
  chipList.value?.removeAll();
};
</script>

<template>
  <ejs-chiplist id="chipRemoveAll" ref="chipList" :data-source="chips" />
  <button @click="removeAllChips">Clear All</button>
</template>
```

---

## Events

Available events emitted by ChipListComponent:

### select
Fired when a chip is selected:

```vue
<template>
  <ejs-chiplist id="chipSelectEvent"
    :data-source="chips"
    @select="onChipSelect"
  />
</template>

<script setup>
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const onChipSelect = (args) => {
  console.log('Selected:', args.text);
  console.log('Index:', args.index);
  console.log('Data:', args.data);
};
</script>
```

### delete
Fired when a chip is deleted:

```vue
<template>
  <ejs-chiplist id="chipDeleteEvent"
    :data-source="chips"
    :enable-delete="true"
    @delete="onChipDelete"
  />
</template>

<script setup>
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const onChipDelete = (args) => {
  console.log('Deleted:', args.text);
  console.log('Index:', args.index);
};
</script>
```

### click
Fired when a chip is clicked:

```vue
<template>
  <ejs-chiplist id="chipClickEvent"
    :data-source="chips"
    @click="onChipClick"
  />
</template>

<script setup>
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const onChipClick = (args) => {
  console.log('Clicked:', args.text);
  console.log('Element:', args.element);
};
</script>
```

### created
Fired when component is created:

```vue
<template>
  <ejs-chiplist id="chipCreatedEvent"
    :data-source="chips"
    @created="onCreated"
  />
</template>

<script setup>
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const onCreated = () => {
  console.log('Chips component initialized');
};
</script>
```

### destroyed
Fired when component is destroyed:

```vue
<template>
  <ejs-chiplist id="chipDestroyedEvent"
    :data-source="chips"
    @destroyed="onDestroyed"
  />
</template>

<script setup>
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const onDestroyed = () => {
  console.log('Chips component destroyed');
};
</script>
```

---

## TypeScript Interfaces

### IChipData
Structure for chip data:

```typescript
interface IChipData {
  text: string;
  icon?: string;
  avatar?: string;
  selected?: boolean;
  enabled?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  htmlAttributes?: Record<string, any>;
  [key: string]: any;
}
```

### ISelectEventArgs
Arguments for select event:

```typescript
interface ISelectEventArgs {
  text: string;
  index: number;
  data: IChipData;
  element: HTMLElement;
  selected: boolean;
}
```

### IDeleteEventArgs
Arguments for delete event:

```typescript
interface IDeleteEventArgs {
  text: string;
  index: number;
  data: IChipData;
  element: HTMLElement;
}
```

### IClickEventArgs
Arguments for click event:

```typescript
interface IClickEventArgs {
  text: string;
  index: number;
  data: IChipData;
  element: HTMLElement;
  event: MouseEvent;
}
```

---

## Complete Example

Comprehensive example using all API features:

```vue
<template>
  <div class="example-section">
    <h2>Complete API Example</h2>
    
    <div class="controls">
      <button @click="selectFirst">Select First</button>
      <button @click="clearAll">Clear Selection</button>
      <button @click="removeLastChip">Remove Last</button>
      <button @click="removeAll">Remove All</button>
    </div>
    
    <div class="info">
      <p>Total chips: {{ chips.length }}</p>
      <p>Selected: {{ selectedCount }}</p>
      <p v-if="lastAction">Last action: {{ lastAction }}</p>
    </div>
    
    <ejs-chiplist id="chipCompleteExample"
      ref="chipList"
      :data-source="chips"
      selection="Multiple"
      chip-type="Filter"
      :enable-delete="true"
      css-class="e-primary"
      @select="onSelect"
      @delete="onDelete"
      @click="onClick"
      @created="onCreated"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chipList = ref(null);
const chips = ref([
  { text: 'Angular', selected: false },
  { text: 'React', selected: true },
  { text: 'Vue', selected: false },
  { text: 'Svelte', selected: false }
]);
const selectedChips = ref([]);
const lastAction = ref('');

const selectedCount = computed(() => selectedChips.value.length);

const selectFirst = () => {
  chipList.value?.selectChip(0);
  lastAction.value = 'Selected first chip';
};

const clearAll = () => {
  chipList.value?.clearSelection();
  selectedChips.value = [];
  lastAction.value = 'Cleared all selections';
};

const removeLastChip = () => {
  if (chips.value.length > 0) {
    chipList.value?.removeChip(chips.value.length - 1);
    lastAction.value = `Removed chip: ${chips.value[chips.value.length - 1]?.text}`;
  }
};

const removeAll = () => {
  chipList.value?.removeAll();
  selectedChips.value = [];
  lastAction.value = 'Removed all chips';
};

const onSelect = (args) => {
  if (args.selected) {
    if (!selectedChips.value.includes(args.text)) {
      selectedChips.value.push(args.text);
    }
  } else {
    selectedChips.value = selectedChips.value.filter(chip => chip !== args.text);
  }
  lastAction.value = `${args.selected ? 'Selected' : 'Deselected'}: ${args.text}`;
};

const onDelete = (args) => {
  chips.value = chips.value.filter(chip => chip.text !== args.text);
  selectedChips.value = selectedChips.value.filter(chip => chip !== args.text);
  lastAction.value = `Deleted: ${args.text}`;
};

const onClick = (args) => {
  lastAction.value = `Clicked: ${args.text}`;
};

const onCreated = () => {
  console.log('ChipList component created successfully');
  lastAction.value = 'Component initialized';
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #1565c0;
}

button:active {
  transform: scale(0.98);
}

.info {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.info p {
  margin: 5px 0;
}
</style>
```

---

## Next Steps

- Learn customization in [chips-customization.md](chips-customization.md)
- Explore styling in [chips-style.md](chips-style.md)
- Check accessibility in [chips-accessibility.md](chips-accessibility.md)
- Try drag and drop in [chips-drag-and-drop.md](chips-drag-and-drop.md)
- Return to [SKILL.md](../SKILL.md) for overview
