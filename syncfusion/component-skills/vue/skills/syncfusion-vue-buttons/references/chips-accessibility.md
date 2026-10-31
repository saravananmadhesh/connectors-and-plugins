# Chips Accessibility

> Ensure chips are accessible to all users including those using assistive technologies.

---

## Table of Contents

1. [WCAG 2.2 Compliance](#wcag-22-compliance)
2. [Keyboard Navigation](#keyboard-navigation)
3. [ARIA Attributes](#aria-attributes)
4. [Screen Reader Support](#screen-reader-support)
5. [Accessible Examples](#accessible-examples)

---

## WCAG 2.2 Compliance

Chips must meet Web Content Accessibility Guidelines:

```vue
<template>
  <div class="example-section">
    <h2>WCAG 2.2 Compliant Chips</h2>
    
    <fieldset>
      <legend>Select Your Interests</legend>
      <ejs-chiplist id="chip1"
        :data-source="interests"
        chip-type="Filter"
        selection="Multiple"
        role="group"
        aria-labelledby="interests-label"
        aria-describedby="interests-help"
      />
      <small id="interests-help">Use keyboard to navigate, Space to select</small>
    </fieldset>
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

const interests = ref([
  { 
    text: 'Technology',
    htmlAttributes: {
      role: 'option',
      'aria-selected': false
    }
  },
  { 
    text: 'Sports',
    htmlAttributes: {
      role: 'option',
      'aria-selected': false
    }
  },
  { 
    text: 'Music',
    htmlAttributes: {
      role: 'option',
      'aria-selected': false
    }
  }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

fieldset {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
}

legend {
  padding: 0 5px;
  font-weight: bold;
}

small {
  display: block;
  margin-top: 10px;
  color: #666;
  font-size: 12px;
}
</style>
```

---

## Keyboard Navigation

Support full keyboard navigation:

```vue
<template>
  <div class="example-section">
    <h2>Keyboard Navigation</h2>
    <p>Instructions: Use Tab to focus, arrow keys to navigate, Space to select, Delete to remove</p>
    
    <ejs-chiplist id="chip2"
      :data-source="navigableChips"
      selection="Multiple"
      :enable-delete="true"
      @key-down="handleKeyboard"
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

const navigableChips = ref([
  { 
    text: 'Home',
    htmlAttributes: {
      tabindex: '0',
      'aria-label': 'Home chip, press Space to select'
    }
  },
  { 
    text: 'About',
    htmlAttributes: {
      tabindex: '-1',
      'aria-label': 'About chip, press Space to select'
    }
  },
  { 
    text: 'Contact',
    htmlAttributes: {
      tabindex: '-1',
      'aria-label': 'Contact chip, press Space to select'
    }
  }
]);

const handleKeyboard = (args) => {
  // Tab: Move focus to next chip
  if (args.key === 'Tab') {
    // Browser handles this natively
  }
  // Shift+Tab: Move focus to previous chip
  else if (args.shiftKey && args.key === 'Tab') {
    // Browser handles this natively
  }
  // Space: Toggle selection
  else if (args.key === ' ') {
    args.preventDefault();
    // Toggle selected state
  }
  // ArrowRight: Move to next
  else if (args.key === 'ArrowRight') {
    args.preventDefault();
    // Move focus to next chip
  }
  // ArrowLeft: Move to previous
  else if (args.key === 'ArrowLeft') {
    args.preventDefault();
    // Move focus to previous chip
  }
  // Delete: Remove chip
  else if (args.key === 'Delete' || args.key === 'Backspace') {
    args.preventDefault();
    // Remove current chip
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

p {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f0f7ff;
  border-left: 4px solid #1976d2;
  border-radius: 4px;
}
</style>
```

---

## ARIA Attributes

Implement proper ARIA attributes:

```vue
<template>
  <div class="example-section">
    <h2>ARIA Attributes</h2>
    
    <div role="region" aria-labelledby="chip-section">
      <h3 id="chip-section">Select Filters</h3>
      <ejs-chiplist id="chip3"
        :data-source="ariaChips"
        role="group"
        aria-label="Filter options"
        aria-description="Select multiple filter criteria below"
      />
    </div>
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

const ariaChips = ref([
  { 
    text: 'Priority: High',
    htmlAttributes: {
      'aria-pressed': false,
      'aria-label': 'Filter by priority high'
    }
  },
  { 
    text: 'Status: Active',
    htmlAttributes: {
      'aria-pressed': false,
      'aria-label': 'Filter by status active'
    }
  },
  { 
    text: 'Type: Bug',
    htmlAttributes: {
      'aria-pressed': false,
      'aria-label': 'Filter by type bug'
    }
  }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Screen Reader Support

Ensure screen readers can announce chip content:

```vue
<template>
  <div class="example-section">
    <h2>Screen Reader Support</h2>
    
    <div role="region" aria-live="polite" aria-atomic="true">
      <p id="selected-count">
        {{ selectedChips.length }} item(s) selected
      </p>
    </div>
    
    <ejs-chiplist id="chip4"
      :data-source="screenReaderChips"
      selection="Multiple"
      @select="onChipSelect"
      aria-describedby="selected-count"
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

const screenReaderChips = ref([
  { 
    text: 'Option A',
    htmlAttributes: {
      'aria-label': 'Option A, checkbox'
    }
  },
  { 
    text: 'Option B',
    htmlAttributes: {
      'aria-label': 'Option B, checkbox'
    }
  },
  { 
    text: 'Option C',
    htmlAttributes: {
      'aria-label': 'Option C, checkbox'
    }
  }
]);

const selectedChips = ref([]);

const onChipSelect = (args) => {
  if (args.selected) {
    if (!selectedChips.value.includes(args.text)) {
      selectedChips.value.push(args.text);
    }
  } else {
    selectedChips.value = selectedChips.value.filter(chip => chip !== args.text);
  }
  
  // Announce to screen readers
  console.log(`Announcement: ${args.text} ${args.selected ? 'selected' : 'deselected'}`);
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

p {
  margin-bottom: 15px;
}
</style>
```

---

## Accessible Examples

Complete accessible chip implementations:

### Accessible Tag Input

```vue
<template>
  <div class="example-section">
    <h2>Accessible Tag Input</h2>
    
    <label for="tag-input">Add tags:</label>
    <input 
      id="tag-input"
      v-model="newTag"
      type="text"
      placeholder="Type and press Enter"
      @keydown.enter="addTag"
      aria-describedby="tag-help"
    />
    <small id="tag-help">Press Enter to add, Delete to remove</small>
    
    <ejs-chiplist id="chip5"
      :data-source="tags"
      chip-type="Input"
      :enable-delete="true"
      @delete="removeTag"
      role="region"
      aria-label="Added tags"
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

const newTag = ref('');
const tags = ref([]);

const addTag = () => {
  if (newTag.value.trim()) {
    tags.value.push({ 
      text: newTag.value,
      htmlAttributes: {
        'aria-label': `Tag: ${newTag.value}`
      }
    });
    newTag.value = '';
  }
};

const removeTag = (args) => {
  tags.value = tags.value.filter(tag => tag.text !== args.text);
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 4px;
}

small {
  display: block;
  margin-bottom: 15px;
  color: #666;
}
</style>
```

### Accessible Filter Chips

```vue
<template>
  <div class="example-section">
    <h2>Accessible Filter Chips</h2>
    
    <div role="region" aria-labelledby="filter-label">
      <h3 id="filter-label">Filter Results</h3>
      <ejs-chiplist id="chip6"
        :data-source="filterChips"
        selection="Multiple"
        @select="onFilterChange"
        role="group"
        aria-label="Available filters"
      />
      <p v-if="activeFilters.length" id="active-filters" aria-live="polite">
        Active filters: {{ activeFilters.join(', ') }}
      </p>
    </div>
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

const filterChips = ref([
  { 
    text: 'Active',
    htmlAttributes: {
      'aria-label': 'Filter by active status'
    }
  },
  { 
    text: 'Completed',
    htmlAttributes: {
      'aria-label': 'Filter by completed status'
    }
  },
  { 
    text: 'Pending',
    htmlAttributes: {
      'aria-label': 'Filter by pending status'
    }
  }
]);

const activeFilters = ref([]);

const onFilterChange = (args) => {
  if (args.selected) {
    activeFilters.value.push(args.text);
  } else {
    activeFilters.value = activeFilters.value.filter(filter => filter !== args.text);
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

p {
  margin-top: 15px;
  padding: 10px;
  background-color: #f0f7ff;
  border-radius: 4px;
}
</style>
```

---

## Next Steps

- View complete API in [chips-api.md](chips-api.md)
- Learn customization in [chips-customization.md](chips-customization.md)
- Explore styling in [chips-style.md](chips-style.md)
- Try drag and drop in [chips-drag-and-drop.md](chips-drag-and-drop.md)
