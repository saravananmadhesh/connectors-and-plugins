# Chips Getting Started

> The Syncfusion `ChipListComponent` renders compact, interactive elements that represent inputs, attributes, selections, or actions. This guide covers installation and basic setup.

---

## Table of Contents

1. [Installation](#installation)
2. [CSS Imports](#css-imports)
3. [Basic Chip List](#basic-chip-list)
4. [Individual Chips](#individual-chips)
5. [Running the Application](#running-the-application)

---

## Installation

Install the buttons package (ChipList is part of buttons):

```bash
npm install @syncfusion/ej2-vue-buttons --save
npm install @syncfusion/ej2-base --save
```

---

## CSS Imports

Import the required CSS files in your application:

```typescript
// In main.ts or App.vue
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/chips/index.css";
```

---

## Basic Chip List

Create a basic chip list with data source:

```vue
<template>
  <div class="example-section">
    <h2>Basic Chip List</h2>
    
    <ejs-chiplist id="chip" :data-source="chipData" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-buttons/styles/tailwind3.css';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chipData = ref([
  { text: 'Apple' },
  { text: 'Banana' },
  { text: 'Cherry' },
  { text: 'Date' },
  { text: 'Elderberry' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Individual Chips

Create individual chips using the `ChipComponent`:

```vue
<template>
  <div class="example-section">
    <h2>Individual Chips</h2>
    
    <ejs-chiplist id="chip">
      <e-chips>
        <e-chip text="Default Chip"></e-chip>
        <e-chip text="Deletable Chip" :deletable="true"></e-chip>
        <e-chip text="Selected Chip" :selected="true"></e-chip>
      </e-chips>
    </ejs-chiplist>
  </div>
</template>

<script setup>
import { ChipListComponent, ChipsDirective, ChipDirective } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent,
    'e-chips': ChipsDirective,
    'e-chip': ChipDirective
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

## Chip Types

Chips support different types for different use cases:

```vue
<template>
  <div class="example-section">
    <!-- Input Chip: Represents user input -->
    <h3>Input Chips</h3>
    <ejs-chiplist id="inputChips" :data-source="inputChips" />
    
    <!-- Choice Chip: Represents single selection -->
    <h3>Choice Chips</h3>
    <ejs-chiplist id="choiceChips" :data-source="choiceChips" />
    
    <!-- Filter Chip: Represents multiple selection filters -->
    <h3>Filter Chips</h3>
    <ejs-chiplist id="filterChips" :data-source="filterChips" />
    
    <!-- Action Chip: Represents an action or event -->
    <h3>Action Chips</h3>
    <ejs-chiplist id="actionChips" :data-source="actionChips" />
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

const inputChips = ref([
  { text: 'John' },
  { text: 'Alice' },
  { text: 'Bob' }
]);

const choiceChips = ref([
  { text: 'Small' },
  { text: 'Medium' },
  { text: 'Large' }
]);

const filterChips = ref([
  { text: 'Red', selected: true },
  { text: 'Green' },
  { text: 'Blue' }
]);

const actionChips = ref([
  { text: 'Edit' },
  { text: 'Share' },
  { text: 'Delete' }
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

## Deletable Chips

Enable deletion of chips:

```vue
<template>
  <div class="example-section">
    <h2>Deletable Chips</h2>
    <p>Click the X icon to remove a chip</p>
    
    <ejs-chiplist 
      id="deletableChips"
      :data-source="items"
      :deletable="true"
      @delete="handleDelete"
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

const items = ref([
  { text: 'JavaScript' },
  { text: 'Vue' },
  { text: 'React' },
  { text: 'Angular' }
]);

const handleDelete = (args) => {
  console.log('Chip deleted:', args);
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

p {
  margin: 10px 0;
  color: #666;
}
</style>
```

---

## Running the Application

1. **Development Server:**
   ```bash
   npm run dev
   ```

2. **Build for Production:**
   ```bash
   npm run build
   ```

3. **Preview Build:**
   ```bash
   npm run preview
   ```

---

## Next Steps

- Explore chip types and selection in [chips-types-and-selection.md](chips-types-and-selection.md)
- Learn customization in [chips-customization.md](chips-customization.md)
- Implement drag and drop in [chips-drag-and-drop.md](chips-drag-and-drop.md)
- Check styling in [chips-style.md](chips-style.md)
- Review accessibility in [chips-accessibility.md](chips-accessibility.md)
- View complete API in [chips-api.md](chips-api.md)
