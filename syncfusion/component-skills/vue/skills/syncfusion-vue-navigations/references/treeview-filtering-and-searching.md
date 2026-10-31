# Filtering and Searching in Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Text Filtering](#text-filtering)
3. [Dynamic Search](#dynamic-search)
4. [Filter Methods](#filter-methods)
5. [Case-Sensitive Filtering](#case-sensitive-filtering)
6. [Search Through Child Nodes](#search-through-child-nodes)
7. [Exclude Parent Path](#exclude-parent-path)
8. [Advanced Filtering](#advanced-filtering)
9. [Performance Optimization](#performance-optimization)
10. [Real-World Examples](#real-world-examples)
11. [Troubleshooting](#troubleshooting)

## Overview

Filtering in TreeView allows users to search for nodes by text content. Vue 3 TreeView supports real-time filtering with various options for including/excluding nodes, case sensitivity, and matching strategies.

## Text Filtering

### Basic Text Filter

The `filter()` method searches for nodes matching a text pattern:

```vue
<script setup>
import { ref, computed } from 'vue';

const treeviewRef = ref(null);
const searchText = ref('');
const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Resume.docx', parentID: '02' },
  { id: '04', name: 'CoverLetter.docx', parentID: '02' },
  { id: '05', name: 'Downloads', parentID: '01' },
  { id: '06', name: 'Software.exe', parentID: '05' }
]);

const handleSearch = () => {
  if (treeviewRef.value && searchText.value) {
    treeviewRef.value.filter(searchText.value);
  }
};

const handleClearSearch = () => {
  searchText.value = '';
  if (treeviewRef.value) {
    treeviewRef.value.filter('');
  }
};
</script>

<template>
  <div>
    <div class="search-bar">
      <input 
        v-model="searchText"
        @input="handleSearch"
        @keyup.escape="handleClearSearch"
        placeholder="Search nodes..."
        class="search-input"
      />
      <button @click="handleClearSearch" v-if="searchText">Clear</button>
    </div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

.search-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 4px rgba(33, 150, 243, 0.3);
}

button {
  padding: 8px 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1976D2;
}
</style>
```

## Dynamic Search

### Real-Time Search with Debounce

```vue
<script setup>
import { ref, watch } from 'vue';

const treeviewRef = ref(null);
const searchQuery = ref('');
let searchTimeout;

const data = ref([
  { id: '01', name: 'JavaScript' },
  { id: '02', name: 'Variable', parentID: '01' },
  { id: '03', name: 'Function', parentID: '01' },
  { id: '04', name: 'Promise', parentID: '02' },
  { id: '05', name: 'TypeScript' },
  { id: '06', name: 'Interface', parentID: '05' },
  { id: '07', name: 'Generic', parentID: '05' }
]);

const handleSearchWithDebounce = (query) => {
  clearTimeout(searchTimeout);
  
  searchTimeout = setTimeout(() => {
    if (treeviewRef.value) {
      treeviewRef.value.filter(query);
      console.log('Searching for:', query);
    }
  }, 300); // 300ms debounce delay
};

watch(searchQuery, (newQuery) => {
  handleSearchWithDebounce(newQuery);
});
</script>

<template>
  <div>
    <input 
      v-model="searchQuery"
      placeholder="Search (with debounce)..."
      class="search-input"
    />
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}
</style>
```

## Filter Methods

### filter() Method with Options

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const filterMode = ref('startsWith'); // 'startsWith', 'contains', 'equals'
const searchText = ref('');

const data = ref([
  { id: '01', name: 'Apple' },
  { id: '02', name: 'Application', parentID: '01' },
  { id: '03', name: 'Apply', parentID: '01' },
  { id: '04', name: 'Banana' },
  { id: '05', name: 'Band', parentID: '04' }
]);

const performFilter = () => {
  if (!treeviewRef.value || !searchText.value) return;

  let filterText = searchText.value;

  // Adjust filter based on mode
  if (filterMode.value === 'startsWith') {
    // Default behavior
  } else if (filterMode.value === 'contains') {
    // Syncfusion includes parent path by default
    filterText = searchText.value;
  } else if (filterMode.value === 'equals') {
    // Exact match only
    filterText = `^${searchText.value}$`;
  }

  treeviewRef.value.filter(filterText);
};
</script>

<template>
  <div>
    <div style="margin-bottom: 12px;">
      <select v-model="filterMode" @change="performFilter">
        <option value="startsWith">Starts With</option>
        <option value="contains">Contains</option>
        <option value="equals">Exact Match</option>
      </select>
      <input 
        v-model="searchText"
        @input="performFilter"
        placeholder="Enter search text..."
      />
    </div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>
```

## Case-Sensitive Filtering

### Case-Insensitive Search (Default)

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const searchText = ref('');
const caseSensitive = ref(false);

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'readme.md', parentID: '02' },
  { id: '04', name: 'README.txt', parentID: '02' },
  { id: '05', name: 'Downloads', parentID: '01' }
]);

const handleSearch = () => {
  if (!treeviewRef.value) return;

  if (caseSensitive.value) {
    // For case-sensitive, you may need to implement custom logic
    // Syncfusion filter is case-insensitive by default
    console.log('Case-sensitive search not directly supported');
    // Manually filter data
    customFilter(searchText.value);
  } else {
    // Default case-insensitive
    treeviewRef.value.filter(searchText.value);
  }
};

const customFilter = (searchTerm) => {
  // Implement case-sensitive filtering
  const exactMatch = (text, query) => {
    return text.includes(query);
  };

  // Filter logic here
};
</script>

<template>
  <div>
    <div class="search-controls">
      <input 
        v-model="searchText"
        @input="handleSearch"
        placeholder="Search..."
      />
      <label>
        <input v-model="caseSensitive" type="checkbox" />
        Case Sensitive
      </label>
    </div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
.search-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
}

.search-controls input[type="text"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-controls label {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
</style>
```

## Search Through Child Nodes

### Include Children in Search Results

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const searchText = ref('');
const includeChildren = ref(true);

const data = ref([
  { id: '01', name: 'Organization', expanded: true },
  { id: '02', name: 'Executive', parentID: '01', expanded: true },
  { id: '03', name: 'CEO', parentID: '02' },
  { id: '04', name: 'CTO', parentID: '02' },
  { id: '05', name: 'Engineering', parentID: '01', expanded: true },
  { id: '06', name: 'Frontend Developer', parentID: '05' },
  { id: '07', name: 'Backend Developer', parentID: '05' }
]);

const performSearch = () => {
  if (!treeviewRef.value || !searchText.value) return;

  if (includeChildren.value) {
    // Filter will show parent and matching children
    treeviewRef.value.filter(searchText.value);
  } else {
    // Show only exact node matches
    // Custom implementation needed
  }
};
</script>

<template>
  <div>
    <div class="search-options">
      <input 
        v-model="searchText"
        @input="performSearch"
        placeholder="Search nodes..."
      />
      <label>
        <input v-model="includeChildren" type="checkbox" />
        Include Child Nodes
      </label>
    </div>
    <p v-if="searchText" class="search-info">
      Searching for: "{{ searchText }}"
    </p>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID', expanded: 'expanded' }"
    />
  </div>
</template>

<style scoped>
.search-options {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
}

.search-options input[type="text"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-info {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 8px;
}
</style>
```

## Exclude Parent Path

### Filter with Parent Path Included/Excluded

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const searchText = ref('');
const showParentPath = ref(true);

const data = ref([
  { id: '01', name: 'src', expanded: true },
  { id: '02', name: 'components', parentID: '01', expanded: true },
  { id: '03', name: 'Button.vue', parentID: '02' },
  { id: '04', name: 'Input.vue', parentID: '02' },
  { id: '05', name: 'utils', parentID: '01', expanded: true },
  { id: '06', name: 'helpers.ts', parentID: '05' }
]);

const performSearch = () => {
  if (!treeviewRef.value) return;

  if (searchText.value) {
    // Syncfusion includes parent path by default
    // When filtered, parent nodes are shown to maintain hierarchy
    treeviewRef.value.filter(searchText.value);
  } else {
    treeviewRef.value.filter('');
  }
};
</script>

<template>
  <div>
    <input 
      v-model="searchText"
      @input="performSearch"
      placeholder="Search (parents shown for context)..."
    />
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID', expanded: 'expanded' }"
    />
  </div>
</template>
```

## Advanced Filtering

### Filter by Multiple Criteria

```vue
<script setup>
import { ref, computed } from 'vue';

const treeviewRef = ref(null);
const filterType = ref(''); // 'folder', 'file', 'all'
const filterSize = ref(0);
const searchText = ref('');

const data = ref([
  { id: '01', name: 'src', type: 'folder', size: 0 },
  { id: '02', name: 'components', parentID: '01', type: 'folder', size: 0 },
  { id: '03', name: 'Button.vue', parentID: '02', type: 'file', size: 2048 },
  { id: '04', name: 'Input.vue', parentID: '02', type: 'file', size: 1536 },
  { id: '05', name: 'utils', parentID: '01', type: 'folder', size: 0 },
  { id: '06', name: 'helpers.ts', parentID: '05', type: 'file', size: 4096 }
]);

const filteredData = computed(() => {
  return data.value.filter(node => {
    let matches = true;

    // Filter by type
    if (filterType.value && filterType.value !== 'all') {
      matches = matches && node.type === filterType.value;
    }

    // Filter by size (only files)
    if (filterSize.value > 0 && node.type === 'file') {
      matches = matches && node.size >= filterSize.value;
    }

    // Filter by search text
    if (searchText.value) {
      matches = matches && node.name.toLowerCase().includes(searchText.value.toLowerCase());
    }

    return matches;
  });
});

const applyFilter = () => {
  // Update TreeView with filtered data
  if (treeviewRef.value) {
    treeviewRef.value.filter(searchText.value);
  }
};
</script>

<template>
  <div>
    <div class="filter-controls">
      <input 
        v-model="searchText"
        @input="applyFilter"
        placeholder="Search by name..."
      />
      <select v-model="filterType" @change="applyFilter">
        <option value="">All Types</option>
        <option value="folder">Folders</option>
        <option value="file">Files</option>
      </select>
      <select v-model="filterSize" @change="applyFilter">
        <option :value="0">Any Size</option>
        <option :value="1024">≥ 1KB</option>
        <option :value="2048">≥ 2KB</option>
        <option :value="4096">≥ 4KB</option>
      </select>
    </div>
    <p class="filter-info">
      Showing {{ filteredData.length }} of {{ data.length }} items
    </p>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: filteredData, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
.filter-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.filter-controls input,
.filter-controls select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95em;
}

.filter-controls input[type="text"] {
  flex: 1;
  min-width: 150px;
}

.filter-info {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 8px;
}
</style>
```

## Performance Optimization

### Efficient Search for Large Datasets

```vue
<script setup>
import { ref, computed } from 'vue';

const treeviewRef = ref(null);
const searchText = ref('');
const maxResults = ref(100);

const generateLargeData = () => {
  const data = [];
  for (let i = 0; i < 10000; i++) {
    const isFolder = i % 5 === 0;
    data.push({
      id: `${i}`,
      name: `${isFolder ? 'Folder' : 'File'} ${i}`,
      type: isFolder ? 'folder' : 'file',
      parentID: i === 0 ? null : `${Math.floor((i - 1) / 10)}`,
      size: isFolder ? 0 : Math.random() * 10000
    });
  }
  return data;
};

const data = ref(generateLargeData());

const handleSearch = () => {
  if (treeviewRef.value && searchText.value) {
    const startTime = performance.now();
    
    treeviewRef.value.filter(searchText.value);
    
    const endTime = performance.now();
    console.log(`Search completed in ${(endTime - startTime).toFixed(2)}ms`);
  }
};

const clearSearch = () => {
  searchText.value = '';
  if (treeviewRef.value) {
    treeviewRef.value.filter('');
  }
};
</script>

<template>
  <div>
    <div class="search-controls">
      <input 
        v-model="searchText"
        @input="handleSearch"
        @keyup.escape="clearSearch"
        placeholder="Search in 10,000 items..."
      />
      <span class="result-count">
        Results: <span id="resultCount">0</span>
      </span>
    </div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
.search-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
}

.search-controls input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.result-count {
  font-size: 0.9em;
  color: #666;
  white-space: nowrap;
}
</style>
```

## Real-World Examples

### File Search with Multiple Filters

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const searchQuery = ref('');
const fileType = ref(''); // 'doc', 'image', 'video', 'all'
const modifiedAfter = ref('');

const fileData = ref([
  { id: '01', name: 'Desktop', type: 'folder', modified: '2024-01-20' },
  { id: '02', name: 'Documents', parentID: '01', type: 'folder', modified: '2024-01-15' },
  { id: '03', name: 'Resume.docx', parentID: '02', type: 'doc', modified: '2024-01-10' },
  { id: '04', name: 'PhotosFolder', parentID: '01', type: 'folder', modified: '2024-01-15' },
  { id: '05', name: 'Vacation.jpg', parentID: '04', type: 'image', modified: '2024-01-12' },
  { id: '06', name: 'Family.jpg', parentID: '04', type: 'image', modified: '2024-01-05' }
]);

const getFileIcon = (type) => {
  const icons = {
    folder: '📁',
    doc: '📄',
    image: '🖼️',
    video: '🎥'
  };
  return icons[type] || '📋';
};

const handleSearch = () => {
  let filterText = searchQuery.value;
  
  if (fileType.value !== '' && fileType.value !== 'all') {
    filterText += ` ${fileType.value}`;
  }

  if (treeviewRef.value) {
    treeviewRef.value.filter(filterText);
  }
};
</script>

<template>
  <div class="search-container">
    <div class="search-controls">
      <input 
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Search files..."
      />
      <select v-model="fileType" @change="handleSearch">
        <option value="">All Types</option>
        <option value="doc">Documents</option>
        <option value="image">Images</option>
        <option value="video">Videos</option>
      </select>
      <input 
        v-model="modifiedAfter"
        type="date"
        @change="handleSearch"
      />
    </div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: fileData, id: 'id', text: 'name', parentID: 'parentID' }"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <div class="file-item">
          <span class="file-icon">{{ getFileIcon(node.type) }}</span>
          <span class="file-name">{{ node.name }}</span>
          <span v-if="node.modified" class="file-date">{{ node.modified }}</span>
        </div>
      </template>
    </ejs-treeview>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
}

.search-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.search-controls input,
.search-controls select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95em;
}

.search-controls input[type="text"] {
  flex: 1;
  min-width: 150px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.file-icon {
  font-size: 1.1em;
}

.file-name {
  flex: 1;
}

.file-date {
  font-size: 0.85em;
  color: #999;
}
</style>
```

## Troubleshooting

### Issue: Filter not matching nodes

**Solution:** Ensure filter text matches node names

```vue
// Check data structure
console.log(data.value.map(n => n.name));

// Filter is case-insensitive and searches from start
treeviewRef.value.filter('Doc'); // Finds 'Document', 'Document.pdf'
treeviewRef.value.filter('resume'); // Finds 'Resume.docx'
```

### Issue: Parent nodes hidden after filtering

**Solution:** Syncfusion automatically shows parents - check if filter is correct

```vue
// This is expected behavior
treeviewRef.value.filter('Resume'); 
// Shows: Documents > Resume.docx (parents shown for context)
```

### Issue: No results from filter

**Solution:** Check if any nodes match the filter

```vue
const performSearch = () => {
  const matchingNodes = data.value.filter(
    n => n.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
  console.log('Matches found:', matchingNodes.length);
};
```

---

**Key Takeaways:**
- ✅ Use `filter()` method for text-based searching
- ✅ Filter is case-insensitive by default
- ✅ Parent nodes automatically shown for hierarchy context
- ✅ Use debouncing for real-time search to optimize performance
- ✅ Combine with `@input` event for dynamic filtering
- ✅ Filter searches from the beginning of node names
- ✅ Clear filter by passing empty string to `filter('')`
