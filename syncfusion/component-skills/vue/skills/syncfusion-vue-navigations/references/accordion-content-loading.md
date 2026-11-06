# Content Loading

## Table of Contents
- [Overview](#overview)
- [Loading Content from Functions](#loading-content-from-functions)
- [Loading from Data Source](#loading-from-data-source)
- [Loading via HTTP Requests](#loading-via-http-requests)
- [Template-Based Rendering](#template-based-rendering)
- [Rendering Other Vue Components](#rendering-other-vue-components)
- [Dynamic Item Loading](#dynamic-item-loading)
- [Lazy Loading Patterns](#lazy-loading-patterns)

## Overview

The Accordion component supports multiple ways to load and render content:

1. **Static Content** - Hardcoded strings or functions
2. **Data Source** - Arrays of objects mapped to accordion items
3. **HTTP Requests** - Fetch content from APIs
4. **JSX Templates** - Render Vue components inside panels
5. **Dynamic Loading** - Add/remove items at runtime

Choose the method based on your content source and update patterns.

## Loading Content from Functions

Content can be provided as strings or computed properties that return HTML:

### Basic String Content

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item header="HTML" :content="htmlContent" />
      <e-accordion-item header="CSS" :content="cssContent" />
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

const htmlContent = ref('<p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p><p>It provides the structure and semantics for web content.</p>');

const cssContent = ref('<p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p><p>It handles colors, fonts, spacing, and responsive design.</p>');
</script>
```

### Content with State

Reactive content that updates based on component state:

```vue
<template>
  <div>
    <div>
      <input v-model="userName" placeholder="Enter name" />
      <input v-model="userEmail" placeholder="Enter email" />
    </div>

    <ejs-accordion>
      <e-accordion-items>
        <e-accordion-item header="User Profile" :content="profileContent" />
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

const userName = ref('John');
const userEmail = ref('john@example.com');

const profileContent = computed(() => 
  `<p><strong>Name:</strong> ${userName.value}</p><p><strong>Email:</strong> ${userEmail.value}</p>`
);
</script>
```

## DataSource Binding

The `dataSource` property binds array data directly to the accordion, automatically generating items from data objects.

### Basic DataSource Binding

```vue
<template>
  <ejs-accordion :dataSource="faqData">
    <e-accordion-items>
      <e-accordion-item
        v-for="(item, index) in faqData"
        :key="index"
        :header="item.header"
        :content="item.content"
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

const faqData = ref([
  { 
    header: 'What is Vue?', 
    content: 'Vue is a JavaScript framework for building user interfaces...' 
  },
  { 
    header: 'What is Composition API?', 
    content: 'The Composition API is a way to compose component logic...' 
  },
  { 
    header: 'What is State?', 
    content: 'State is similar to data, but it is private and controlled...' 
  }
]);
</script>
```

### Advanced DataSource with Custom Fields

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item
        v-for="course in courseData"
        :key="course.id"
        :header="course.courseTitle"
        :content="courseContent(course)"
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

const courseData = ref([
  {
    id: 1,
    courseTitle: 'Vue Basics',
    courseSummary: 'Learn the fundamentals of Vue...',
    instructor: 'John Doe',
    duration: '4 weeks',
    level: 'Beginner'
  },
  {
    id: 2,
    courseTitle: 'Vue Advanced',
    courseSummary: 'Master advanced Vue patterns...',
    instructor: 'Jane Smith',
    duration: '6 weeks',
    level: 'Advanced'
  }
]);

const courseContent = (course) => `
  <div>
    <p>${course.courseSummary}</p>
    <p><strong>Instructor:</strong> ${course.instructor}</p>
    <p><strong>Duration:</strong> ${course.duration}</p>
    <p><strong>Level:</strong> ${course.level}</p>
  </div>
`;
</script>
```

### Filtering DataSource

```vue
<template>
  <div>
    <input
      v-model="searchTerm"
      placeholder="Search accordion items..."
      style="margin-bottom: 15px; padding: 8px; width: 200px"
    />

    <ejs-accordion :dataSource="filteredData">
      <e-accordion-items>
        <e-accordion-item
          v-for="(item, index) in filteredData"
          :key="index"
          :header="item.name"
          :content="item.category"
        />
      </e-accordion-items>
    </ejs-accordion>

    <p v-if="filteredData.length === 0">No items found</p>
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

const allProducts = ref([
  { name: 'Vue Book', category: 'JavaScript' },
  { name: 'React Guide', category: 'JavaScript' },
  { name: 'CSS Mastery', category: 'Styling' }
]);

const filteredData = computed(() => {
  return allProducts.value.filter(item =>
    item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>
```

### Grouping DataSource

```vue
<template>
  <ejs-accordion :expandMode="'Multiple'">
    <e-accordion-items>
      <e-accordion-item
        v-for="(items, group) in groupedByCategory"
        :key="group"
        :header="group"
        :content="groupContent(items)"
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

const data = ref([
  { group: 'Frontend', name: 'Vue', description: 'Progressive framework' },
  { group: 'Frontend', name: 'React', description: 'JavaScript library' },
  { group: 'Backend', name: 'Node.js', description: 'JavaScript runtime' },
  { group: 'Backend', name: 'Django', description: 'Python framework' }
]);

const groupedByCategory = computed(() => {
  return data.value.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});
});

const groupContent = (items) => `
  <ul>
    ${items.map(item => `<li><strong>${item.name}</strong> - ${item.description}</li>`).join('')}
  </ul>
`;
</script>
```

## Loading via HTTP Requests

Fetch content from APIs and render in accordion panels:

### Basic API Loading

```vue
<template>
  <div>
    <p v-if="loading">Loading posts...</p>

    <ejs-accordion v-if="!loading">
      <e-accordion-items>
        <e-accordion-item
          v-for="post in posts"
          :key="post.id"
          :header="post.title"
          :content="post.body"
        />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const posts = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    posts.value = await response.json();
    loading.value = false;
  } catch (error) {
    console.error('Error loading posts:', error);
    loading.value = false;
  }
});
</script>
```

### With Loading and Error State

```vue
<template>
  <div>
    <p v-if="loading">Loading items...</p>
    <p v-if="error" style="color: red">Error: {{ error }}</p>

    <ejs-accordion v-if="!loading && !error">
      <e-accordion-items>
        <e-accordion-item
          v-for="item in items"
          :key="item.id"
          :header="item.name"
          :content="item.details"
        />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const items = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await fetch('/api/accordion-items');
    if (!response.ok) throw new Error('Failed to load');
    items.value = await response.json();
    error.value = null;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>
```

### POST Requests for Loading Content

```vue
<template>
  <div>
    <button @click="loadContentViaPost" :disabled="loading">
      {{ loading ? 'Loading...' : 'Load Content' }}
    </button>

    <ejs-accordion v-if="items.length > 0" style="margin-top: 15px">
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

const items = ref([]);
const loading = ref(false);

const loadContentViaPost = async () => {
  loading.value = true;
  try {
    const response = await fetch('/api/accordion/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requestType: 'accordion-items',
        format: 'json'
      })
    });

    const data = await response.json();
    items.value = data.items;
  } catch (error) {
    console.error('Error loading content:', error);
  } finally {
    loading.value = false;
  }
};
</script>
```

### POST on Item Expansion

Load content via POST only when item is expanded:

```vue
<template>
  <ejs-accordion @expanded="loadContentOnExpand">
    <e-accordion-items>
      <e-accordion-item
        v-for="(item, index) in items"
        :key="index"
        :header="item.header"
        :content="getContent(index)"
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
  { header: 'Item 1', index: 0 },
  { header: 'Item 2', index: 1 },
  { header: 'Item 3', index: 2 }
]);

const contentCache = ref({});
const loading = ref({});

const loadContentOnExpand = async (args) => {
  if (args.isExpanded && !contentCache.value[args.index]) {
    loading.value[args.index] = true;

    try {
      const response = await fetch('/api/content/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemIndex: args.index })
      });

      const data = await response.json();
      contentCache.value[args.index] = data.content;
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      loading.value[args.index] = false;
    }
  }
};

const getContent = (index) => {
  if (loading.value[index]) return 'Loading...';
  return contentCache.value[index] || 'Click to load';
};
</script>
```

## Template-Based Rendering

Use slots for complex content layouts:

### Custom Template Content with Slots

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item header="Featured Product">
        <template #default>
          <div style="padding: 15px; display: flex; gap: 15px">
            <img src="/product-image.jpg" alt="Product" style="width: 100px; height: 100px" />
            <div>
              <h4>Product Name</h4>
              <p>Price: $99.99</p>
              <p>In Stock: Yes</p>
              <button>Add to Cart</button>
            </div>
          </div>
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
```

## Rendering Other Vue Components

Nest other Vue components inside accordion panels:

### Basic Component Nesting

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item header="User Information">
        <template #default>
          <UserForm />
        </template>
      </e-accordion-item>
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';
import UserForm from './UserForm.vue';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>
```

## Dynamic Item Loading

Add or remove accordion items at runtime:

### Adding Items

```vue
<template>
  <div>
    <button @click="addItem" style="margin-bottom: 15px">Add Item</button>

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
  { id: 1, header: 'Item 1', content: 'Content 1' },
  { id: 2, header: 'Item 2', content: 'Content 2' }
]);

const addItem = () => {
  const newId = Math.max(...items.value.map(i => i.id), 0) + 1;
  const newItem = {
    id: newId,
    header: `Item ${newId}`,
    content: `Content ${newId}`
  };
  
  items.value.push(newItem);
  accordionRef.value?.addItem(newItem);
};
</script>
```

### Removing Items

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

## Lazy Loading Patterns

Load content only when panels expand:

### Lazy Load on Expand

```vue
<template>
  <ejs-accordion @expanded="loadContent">
    <e-accordion-items>
      <e-accordion-item
        v-for="item in items"
        :key="item.id"
        :header="item.header"
        :content="contentCache[item.id] || 'Loading...'"
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
  { id: 1, header: 'Item 1' },
  { id: 2, header: 'Item 2' },
  { id: 3, header: 'Item 3' }
]);

const contentCache = ref({});

const loadContent = async (args) => {
  const itemId = items.value[args.index]?.id;
  
  if (itemId && !contentCache.value[itemId]) {
    try {
      const response = await fetch(`/api/content/${itemId}`);
      const data = await response.json();
      contentCache.value[itemId] = data.content;
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }
};
</script>
```

---

## Troubleshooting

**Issue: Content not displaying**
- Ensure `content` prop is provided for each item
- Check that content HTML is properly formatted
- Verify data is loaded before rendering

**Issue: HTTP content not loading**
- Check network tab in browser DevTools
- Verify API endpoint is correct and accessible
- Add error handling for failed requests
- Check CORS settings if fetching from different domain

**Issue: Components not re-rendering with new content**
- Ensure state updates trigger component re-render
- Use `key` prop in v-for loops
- Check for missing dependencies in watchers

**Issue: Performance degradation with many items**
- Implement lazy loading for large datasets
- Consider pagination instead of loading all items
- Use virtual scrolling for 100+ items
