# Advanced Features

## Table of Contents
- [Component Methods](#component-methods)
- [Nested Accordions](#nested-accordions)
- [Keyboard Navigation](#keyboard-navigation)
- [Accessibility (ARIA)](#accessibility-aria)
- [Performance Optimization](#performance-optimization)
- [Advanced Patterns](#advanced-patterns)

## Component Methods

Call accordion methods programmatically via template refs:

### addItem Method

Dynamically add items to accordion:

```vue
<template>
  <div>
    <button @click="addNewItem">Add Item</button>

    <ejs-accordion ref="accordionRef">
      <e-accordion-items>
        <e-accordion-item
          v-for="item in items"
          :key="item.id"
          :header="item.header"
          :content="item.content"
        />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);
const items = ref([
  { id: 1, header: 'Item 1', content: 'Content 1' }
]);

const addNewItem = () => {
  const newItem = {
    id: items.value.length + 1,
    header: `Item ${items.value.length + 1}`,
    content: `Content ${items.value.length + 1}`
  };
  
  items.value.push(newItem);
  // Update accordion with new data
  accordionRef.value.items = items.value.map(item => ({
    header: item.header,
    content: item.content
  }));
};
</script>
```

### removeItem Method

Remove items from accordion:

```vue
<template>
  <ejs-accordion ref="accordionRef">
    <e-accordion-items>
      <e-accordion-item
        v-for="(item, index) in items"
        :key="item.id"
        :header="item.header"
      >
        <template #default>
          <div>
            {{ item.content }}
            <button @click="removeItem(index)">Remove</button>
          </div>
        </template>
      </e-accordion-item>
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);
const items = ref([
  { id: 1, header: 'Item 1', content: 'Content 1' },
  { id: 2, header: 'Item 2', content: 'Content 2' }
]);

const removeItem = (index) => {
  accordionRef.value?.removeItem(index);
  items.value.splice(index, 1);
};
</script>
```

### expandItem Method

Expand a specific accordion item:

```vue
<template>
  <div>
    <div>
      <button @click="expandByIndex(0)">Expand Item 1</button>
      <button @click="expandByIndex(1)">Expand Item 2</button>
      <button @click="expandByIndex(2)">Expand Item 3</button>
    </div>

    <ejs-accordion ref="accordionRef" :expandMode="'Multiple'">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Content 1" />
        <e-accordion-item header="Item 2" content="Content 2" />
        <e-accordion-item header="Item 3" content="Content 3" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);

const expandByIndex = (index) => {
  accordionRef.value?.expandItem(index);
};
</script>
```

### enableItem / hideItem Methods

Control item availability:

```vue
<template>
  <div>
    <label>
      <input v-model="disabledItems" type="checkbox" value="0" />
      Disable Item 1
    </label>

    <ejs-accordion ref="accordionRef">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Can be disabled" />
        <e-accordion-item header="Item 2" content="Always enabled" />
        <e-accordion-item header="Item 3" content="Can be hidden" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);
const disabledItems = ref([]);

watch(disabledItems, (newDisabled) => {
  if (newDisabled.includes('0')) {
    accordionRef.value?.enableItem(0, false);
  } else {
    accordionRef.value?.enableItem(0, true);
  }
});
</script>
```

## Nested Accordions

Create hierarchical accordion structures:

### Basic Nested Accordion

```vue
<template>
  <ejs-accordion class="parent-accordion">
    <e-accordion-items>
      <e-accordion-item header="Category 1">
        <template #default>
          <ejs-accordion class="nested-accordion">
            <e-accordion-items>
              <e-accordion-item header="SubCategory 1.1" content="Content 1.1" />
              <e-accordion-item header="SubCategory 1.2" content="Content 1.2" />
            </e-accordion-items>
          </ejs-accordion>
        </template>
      </e-accordion-item>

      <e-accordion-item header="Category 2">
        <template #default>
          <ejs-accordion class="nested-accordion">
            <e-accordion-items>
              <e-accordion-item header="SubCategory 2.1" content="Content 2.1" />
              <e-accordion-item header="SubCategory 2.2" content="Content 2.2" />
            </e-accordion-items>
          </ejs-accordion>
        </template>
      </e-accordion-item>
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>

<style scoped>
.parent-accordion :deep(.e-accordion-header) {
  background-color: #667eea;
  color: white;
  font-weight: 600;
}

.nested-accordion :deep(.e-accordion-header) {
  background-color: #f0f0f0;
  color: #333;
  font-weight: 500;
  padding-left: 24px;
}
</style>
```

### Data-Driven Nested Accordion

```vue
<template>
  <ejs-accordion class="hierarchical-accordion">
    <e-accordion-items>
      <e-accordion-item
        v-for="category in categories"
        :key="category.id"
        :header="category.name"
      >
        <template #default>
          <ejs-accordion :expandMode="'Multiple'">
            <e-accordion-items>
              <e-accordion-item
                v-for="subitem in category.subitems"
                :key="subitem.id"
                :header="subitem.name"
                :content="subitem.description"
              />
            </e-accordion-items>
          </ejs-accordion>
        </template>
      </e-accordion-item>
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const categories = ref([
  {
    id: 1,
    name: 'Programming',
    subitems: [
      { id: 1, name: 'JavaScript', description: 'Client-side scripting' },
      { id: 2, name: 'Python', description: 'General-purpose language' }
    ]
  },
  {
    id: 2,
    name: 'Frameworks',
    subitems: [
      { id: 3, name: 'Vue', description: 'Progressive framework' },
      { id: 4, name: 'React', description: 'JavaScript library' }
    ]
  }
]);
</script>
```

## Keyboard Navigation

Enable keyboard shortcuts for accessibility:

### Keyboard Shortcuts

```vue
<template>
  <div>
    <p style="font-size: 12px; color: #666">
      Use Arrow keys, Enter, Space, Home, End to navigate. Tab to focus.
    </p>

    <ejs-accordion ref="accordionRef" @keydown="handleKeyboardNav">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Use Arrow Up/Down to navigate" />
        <e-accordion-item header="Item 2" content="Press Enter or Space to expand/collapse" />
        <e-accordion-item header="Item 3" content="Home/End jumps to first/last item" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);
const currentIndex = ref(0);

const handleKeyboardNav = (event) => {
  const itemCount = accordionRef.value?.items?.length || 0;

  switch (event.key) {
    case 'ArrowDown':
      currentIndex.value = Math.min(currentIndex.value + 1, itemCount - 1);
      accordionRef.value?.select(currentIndex.value);
      event.preventDefault();
      break;

    case 'ArrowUp':
      currentIndex.value = Math.max(currentIndex.value - 1, 0);
      accordionRef.value?.select(currentIndex.value);
      event.preventDefault();
      break;

    case 'Home':
      currentIndex.value = 0;
      accordionRef.value?.select(0);
      event.preventDefault();
      break;

    case 'End':
      currentIndex.value = itemCount - 1;
      accordionRef.value?.select(itemCount - 1);
      event.preventDefault();
      break;

    case 'Enter':
    case ' ':
      accordionRef.value?.expandItem(currentIndex.value);
      event.preventDefault();
      break;
  }
};
</script>
```

## Accessibility (ARIA)

Add ARIA attributes for screen readers:

### Complete Accessible Accordion

```vue
<template>
  <div
    role="region"
    aria-label="Information about web development technologies"
  >
    <ejs-accordion ref="accordionRef" @expanded="updateAriaAttributes">
      <e-accordion-items>
        <e-accordion-item
          v-for="(item, index) in items"
          :key="index"
          :header="item.header"
          :content="item.content"
          :aria-expanded="expandedItems.includes(index)"
          :aria-controls="`panel-${index}`"
        />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);
const expandedItems = ref([]);

const items = ref([
  { header: 'HTML Basics', content: 'Learn HTML fundamentals' },
  { header: 'CSS Styling', content: 'Master CSS techniques' },
  { header: 'JavaScript', content: 'JavaScript programming' }
]);

const updateAriaAttributes = (args) => {
  if (!expandedItems.value.includes(args.index)) {
    expandedItems.value.push(args.index);
  }
};
</script>

<style scoped>
.e-accordion-item[aria-expanded='true'] :deep(.e-accordion-header) {
  background-color: #e3f2fd;
}
</style>
```

## Performance Optimization

### Virtual Scrolling

For large datasets with many items, use virtual scrolling:

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item
        v-for="(item, index) in visibleItems"
        :key="item.id"
        :header="item.header"
        :content="item.content"
      />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref, computed } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const allItems = ref(Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  header: `Item ${i + 1}`,
  content: `Content for item ${i + 1}`
})));

const VISIBLE_RANGE = 10;
const scrollPosition = ref(0);

const visibleItems = computed(() => {
  const start = Math.max(0, scrollPosition.value - 2);
  const end = Math.min(allItems.value.length, scrollPosition.value + VISIBLE_RANGE + 2);
  return allItems.value.slice(start, end);
});
</script>
```

### Lazy Content Loading

Load content only when expanded:

```vue
<template>
  <ejs-accordion @expanded="lazyLoadContent">
    <e-accordion-items>
      <e-accordion-item
        v-for="item in items"
        :key="item.id"
        :header="item.header"
        :content="item.content || loadingContent[item.id]"
      />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const items = ref([
  { id: 1, header: 'Heavy Data 1' },
  { id: 2, header: 'Heavy Data 2' },
  { id: 3, header: 'Heavy Data 3' }
]);

const loadingContent = ref({});
const loadedIds = ref(new Set());

const lazyLoadContent = async (args) => {
  const item = items.value[args.index];
  
  if (!loadedIds.value.has(item.id)) {
    loadingContent.value[item.id] = 'Loading...';
    
    try {
      const response = await fetch(`/api/content/${item.id}`);
      const data = await response.json();
      items.value[args.index].content = data.content;
      loadedIds.value.add(item.id);
    } catch (error) {
      loadingContent.value[item.id] = 'Error loading content';
    }
  }
};
</script>
```

### Memoization

Prevent unnecessary re-renders with computed properties:

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item
        v-for="item in memoizedItems"
        :key="item.id"
        :header="item.header"
        :content="formattedContent(item)"
      />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref, computed } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const rawData = ref([
  { id: 1, header: 'Item 1', data: { large: 'dataset' } },
  { id: 2, header: 'Item 2', data: { large: 'dataset' } }
]);

const memoizedItems = computed(() => {
  return rawData.value.map(item => ({
    ...item,
    header: item.header.toUpperCase()
  }));
});

const formattedContent = (item) => {
  // This function is called only when needed
  return JSON.stringify(item.data, null, 2);
};
</script>
```

## Advanced Patterns

### Synchronized Accordions

Keep multiple accordions in sync:

```vue
<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
    <div>
      <h3>Accordion 1</h3>
      <ejs-accordion @expanded="syncAccordions">
        <e-accordion-items>
          <e-accordion-item header="Item 1" content="Accordion 1 Content" />
          <e-accordion-item header="Item 2" content="Content 2" />
        </e-accordion-items>
      </ejs-accordion>
    </div>

    <div>
      <h3>Accordion 2 (Synced)</h3>
      <ejs-accordion ref="secondAccordion">
        <e-accordion-items>
          <e-accordion-item header="Item 1" content="Accordion 2 Content" />
          <e-accordion-item header="Item 2" content="Content 2" />
        </e-accordion-items>
      </ejs-accordion>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const secondAccordion = ref(null);

const syncAccordions = (args) => {
  secondAccordion.value?.expandItem(args.index);
};
</script>
```

### Search and Filter

Add search functionality to accordion:

```vue
<template>
  <div>
    <input
      v-model="searchTerm"
      placeholder="Search accordion items..."
      style="margin-bottom: 15px; padding: 8px; width: 100%"
    />

    <p v-if="filteredItems.length === 0">No items found</p>

    <ejs-accordion v-else>
      <e-accordion-items>
        <e-accordion-item
          v-for="item in filteredItems"
          :key="item.id"
          :header="highlightSearch(item.header)"
          :content="item.content"
        />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const searchTerm = ref('');

const items = ref([
  { id: 1, header: 'Vue Accordion', content: 'Interactive component' },
  { id: 2, header: 'React Accordion', content: 'JavaScript library' },
  { id: 3, header: 'Angular Accordion', content: 'Framework' }
]);

const filteredItems = computed(() => {
  return items.value.filter(item =>
    item.header.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const highlightSearch = (text) => {
  if (!searchTerm.value) return text;
  
  const regex = new RegExp(`(${searchTerm.value})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};
</script>

<style scoped>
mark {
  background-color: yellow;
  font-weight: bold;
}
</style>
```

### Conditional Rendering

Show/hide accordion based on conditions:

```vue
<template>
  <div>
    <label>
      <input v-model="showAdvanced" type="checkbox" />
      Show Advanced Options
    </label>

    <ejs-accordion v-if="!showAdvanced">
      <e-accordion-items>
        <e-accordion-item header="Basic Option 1" content="Content 1" />
        <e-accordion-item header="Basic Option 2" content="Content 2" />
      </e-accordion-items>
    </ejs-accordion>

    <ejs-accordion v-else>
      <e-accordion-items>
        <e-accordion-item header="Advanced Option 1" content="Complex setup 1" />
        <e-accordion-item header="Advanced Option 2" content="Complex setup 2" />
        <e-accordion-item header="Advanced Option 3" content="Complex setup 3" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const showAdvanced = ref(false);
</script>
```

---

## Performance Tips

1. **Use virtual scrolling** for 100+ items
2. **Implement lazy loading** for large content
3. **Memoize expensive computations** with `computed()`
4. **Avoid creating new objects** in event handlers
5. **Use `key` binding** correctly in v-for
6. **Consider pagination** instead of loading all data

## Troubleshooting

**Issue: Nested accordions not expanding**
- Ensure parent accordion is not preventing child clicks
- Check z-index of overlapping elements
- Verify child accordion is properly initialized

**Issue: Keyboard navigation not working**
- Ensure focus is on accordion element
- Check for JavaScript errors in console
- Verify custom event handlers don't prevent default behavior

**Issue: Performance degradation**
- Profile with Vue DevTools
- Check for excessive watchers
- Monitor DOM tree size
- Use virtual scrolling for large lists
