# Advanced Features in Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Load on Demand](#load-on-demand)
3. [Data Caching](#data-caching)
4. [Persistence](#persistence)
5. [Right-to-Left Support](#right-to-left-support)
6. [Localization](#localization)
7. [Virtual Scrolling](#virtual-scrolling)
8. [TreeView with Accordion](#treeview-with-accordion)
9. [Performance Optimization](#performance-optimization)
10. [Real-World Advanced Scenarios](#real-world-advanced-scenarios)
11. [Troubleshooting](#troubleshooting)

## Overview

Advanced TreeView features enable handling large datasets, multi-language support, RTL layouts, and complex UI patterns efficiently.

## Load on Demand

### Lazy Loading Child Nodes

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const data = ref([
  { id: '01', name: 'Desktop', hasChild: true },
  { id: '02', name: 'Documents', hasChild: true },
  { id: '03', name: 'Downloads', hasChild: true }
]);

const treeViewEvents = {
  onNodeExpanding: async (args) => {
    // Load child nodes only when parent expands
    if (args.node.hasAttribute('data-loaded')) {
      return; // Already loaded
    }

    args.cancel = true; // Prevent default expand

    try {
      // Simulate API call
      const childData = await fetchChildNodes(args.nodeData.id);
      
      // Add child nodes
      treeviewRef.value.addNodes(childData, args.nodeData.id);
      
      // Mark as loaded
      args.node.setAttribute('data-loaded', 'true');
    } catch (error) {
      console.error('Failed to load nodes:', error);
    }
  }
};

const fetchChildNodes = async (parentId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const childMap = {
    '01': [
      { id: '01_1', name: 'Desktop Files', parentID: '01' },
      { id: '01_2', name: 'Desktop Shortcuts', parentID: '01' }
    ],
    '02': [
      { id: '02_1', name: 'My Documents', parentID: '02' },
      { id: '02_2', name: 'Shared Documents', parentID: '02' }
    ],
    '03': [
      { id: '03_1', name: 'Recent Downloads', parentID: '03' },
      { id: '03_2', name: 'Old Downloads', parentID: '03' }
    ]
  };

  return childMap[parentId] || [];
};
</script>

<template>
  <ejs-treeview
    ref="treeviewRef"
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID', hasChildren: 'hasChild' }"
    @nodeExpanding="treeViewEvents.onNodeExpanding"
  />
</template>
```

### Progressive Loading with Spinner

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const loadingNodes = ref(new Set());

const data = ref([
  { id: '01', name: 'Department A', hasChild: true },
  { id: '02', name: 'Department B', hasChild: true }
]);

const handleNodeExpanding = async (args) => {
  if (loadingNodes.value.has(args.nodeData.id)) {
    return; // Already loading
  }

  loadingNodes.value.add(args.nodeData.id);
  args.cancel = true;

  try {
    const children = await simulateAPICall(args.nodeData.id);
    treeviewRef.value.addNodes(children, args.nodeData.id);
    treeviewRef.value.expandAll([args.nodeData.id]);
  } finally {
    loadingNodes.value.delete(args.nodeData.id);
  }
};

const simulateAPICall = async (nodeId) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: `${nodeId}_1`, name: `Child 1`, parentID: nodeId },
    { id: `${nodeId}_2`, name: `Child 2`, parentID: nodeId }
  ];
};

const isLoading = (nodeId) => {
  return loadingNodes.value.has(nodeId);
};
</script>

<template>
  <div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID', hasChildren: 'hasChild' }"
      @nodeExpanding="handleNodeExpanding"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <div class="node-wrapper">
          {{ node.name }}
          <span v-if="isLoading(node.id)" class="loading-spinner">⏳</span>
        </div>
      </template>
    </ejs-treeview>
  </div>
</template>

<style scoped>
.node-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.loading-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
```

## Data Caching

### Cache Loaded Nodes

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const cache = ref(new Map());

const data = ref([
  { id: '01', name: 'Root', hasChild: true }
]);

const getFromCache = (parentId) => {
  return cache.value.get(parentId);
};

const setInCache = (parentId, children) => {
  cache.value.set(parentId, children);
};

const handleNodeExpanding = async (args) => {
  // Check cache first
  const cached = getFromCache(args.nodeData.id);
  if (cached) {
    console.log('Loading from cache:', args.nodeData.id);
    treeviewRef.value.addNodes(cached, args.nodeData.id);
    return;
  }

  // Fetch from API
  args.cancel = true;
  const children = await fetchChildNodes(args.nodeData.id);
  
  // Store in cache
  setInCache(args.nodeData.id, children);
  
  // Add to TreeView
  treeviewRef.value.addNodes(children, args.nodeData.id);
};

const fetchChildNodes = async (parentId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: `${parentId}_1`, name: 'Cached Child', parentID: parentId }
  ];
};

const clearCache = () => {
  cache.value.clear();
  console.log('Cache cleared');
};

const getCacheStats = () => {
  return {
    size: cache.value.size,
    items: Array.from(cache.value.keys())
  };
};
</script>

<template>
  <div>
    <div class="cache-controls">
      <button @click="clearCache">Clear Cache</button>
      <span>Cache items: {{ getCacheStats().size }}</span>
    </div>

    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID', hasChildren: 'hasChild' }"
      @nodeExpanding="handleNodeExpanding"
    />
  </div>
</template>

<style scoped>
.cache-controls {
  margin-bottom: 12px;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  gap: 12px;
  align-items: center;
}

.cache-controls button {
  padding: 6px 12px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

## Persistence

### Save and Restore TreeView State

```vue
<script setup>
import { ref, onMounted } from 'vue';

const treeviewRef = ref(null);

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' }
]);

onMounted(() => {
  // Restore state on component mount
  restoreTreeState();
});

const saveTreeState = () => {
  if (!treeviewRef.value) return;

  const state = {
    expanded: treeviewRef.value.expandedNodes,
    selected: treeviewRef.value.getSelectedNodes(),
    checked: treeviewRef.value.getCheckedNodes()
  };

  // Save to localStorage
  localStorage.setItem('treeview-state', JSON.stringify(state));
  console.log('State saved:', state);
};

const restoreTreeState = () => {
  if (!treeviewRef.value) return;

  const savedState = localStorage.getItem('treeview-state');
  if (!savedState) return;

  const state = JSON.parse(savedState);

  // Restore expanded nodes
  if (state.expanded?.length > 0) {
    treeviewRef.value.expandAll(state.expanded);
  }

  // Restore selected nodes
  if (state.selected?.length > 0) {
    treeviewRef.value.selectNodes(state.selected);
  }

  // Restore checked nodes
  if (state.checked?.length > 0) {
    state.checked.forEach(nodeId => {
      treeviewRef.value.checkAll([nodeId]);
    });
  }

  console.log('State restored:', state);
};

const clearTreeState = () => {
  localStorage.removeItem('treeview-state');
  console.log('State cleared');
};
</script>

<template>
  <div>
    <div class="persistence-controls">
      <button @click="saveTreeState">💾 Save State</button>
      <button @click="restoreTreeState">📂 Restore State</button>
      <button @click="clearTreeState">🗑️ Clear State</button>
    </div>

    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowMultiSelection="true"
      :showCheckBox="true"
    />
  </div>
</template>

<style scoped>
.persistence-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.persistence-controls button {
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.persistence-controls button:hover {
  background-color: #45a049;
}
</style>
```

## Right-to-Left Support

### Enable RTL Mode

```vue
<script setup>
import { ref } from 'vue';

const enableRtl = ref(false);

const data = ref([
  { id: '01', name: 'العربية', rtlName: 'المجلد الأول' },
  { id: '02', name: 'עברית', rtlName: 'תיקייה שנייה', parentID: '01' }
]);

const toggleRtl = () => {
  enableRtl.value = !enableRtl.value;
};
</script>

<template>
  <div>
    <button @click="toggleRtl">
      {{ enableRtl ? 'LTR' : 'RTL' }}
    </button>

    <div :dir="enableRtl ? 'rtl' : 'ltr'">
      <ejs-treeview
        :fields="{ dataSource: data, id: 'id', text: enableRtl ? 'rtlName' : 'name', parentID: 'parentID' }"
        :enableRtl="enableRtl"
      />
    </div>
  </div>
</template>

<style scoped>
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="ltr"] {
  direction: ltr;
  text-align: left;
}

:deep([dir="rtl"] .e-treeview .e-list-item) {
  padding-right: 8px;
  padding-left: 4px;
}

:deep([dir="rtl"] .e-treeview .e-expand-icon) {
  margin-left: 8px;
  margin-right: 0;
}
</style>
```

## Localization

### Multi-Language Support

```vue
<script setup>
import { ref } from 'vue';

const currentLocale = ref('en');

const localizations = {
  en: {
    desktop: 'Desktop',
    documents: 'Documents',
    downloads: 'Downloads',
    newFolder: 'New Folder',
    delete: 'Delete',
    rename: 'Rename'
  },
  es: {
    desktop: 'Escritorio',
    documents: 'Documentos',
    downloads: 'Descargas',
    newFolder: 'Nueva Carpeta',
    delete: 'Eliminar',
    rename: 'Cambiar nombre'
  },
  fr: {
    desktop: 'Bureau',
    documents: 'Documents',
    downloads: 'Téléchargements',
    newFolder: 'Nouveau Dossier',
    delete: 'Supprimer',
    rename: 'Renommer'
  }
};

const data = ref([
  { id: '01', name: 'desktop' },
  { id: '02', name: 'documents', parentID: '01' },
  { id: '03', name: 'downloads', parentID: '01' }
]);

const t = (key) => {
  return localizations[currentLocale.value][key] || key;
};

const switchLanguage = (lang) => {
  currentLocale.value = lang;
};

const getLocalizedData = () => {
  return data.value.map(item => ({
    ...item,
    displayName: t(item.name)
  }));
};
</script>

<template>
  <div>
    <div class="language-selector">
      <button 
        v-for="lang in ['en', 'es', 'fr']"
        :key="lang"
        :class="{ active: currentLocale === lang }"
        @click="switchLanguage(lang)"
      >
        {{ lang.toUpperCase() }}
      </button>
    </div>

    <ejs-treeview
      :fields="{ dataSource: getLocalizedData(), id: 'id', text: 'displayName', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
.language-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.language-selector button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.language-selector button.active {
  background-color: #2196f3;
  color: white;
  border-color: #2196f3;
}
</style>
```

## Virtual Scrolling

### Enable Virtual Scrolling for Large Datasets

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);

// Generate large dataset
const generateLargeDataset = (count = 1000) => {
  const data = [];
  
  for (let i = 0; i < count; i++) {
    data.push({
      id: `item_${i}`,
      name: `Item ${i}`,
      parentID: i === 0 ? undefined : `item_${Math.floor((i - 1) / 10)}`
    });
  }
  
  return data;
};

const data = ref(generateLargeDataset(1000));
const itemsPerPage = ref(50);
</script>

<template>
  <div>
    <div class="info">
      <p>Total items: {{ data.length }}</p>
      <p>Items per page (virtual scroll): {{ itemsPerPage }}</p>
    </div>

    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :enableVirtualization="true"
      :itemsPerPage="itemsPerPage"
    />
  </div>
</template>

<style scoped>
.info {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 0.9em;
}

.info p {
  margin: 4px 0;
}
</style>
```

## TreeView with Accordion

### Combine TreeView with Accordion Pattern

```vue
<script setup>
import { ref } from 'vue';

const expandedGroups = ref(['group1']);

const groups = ref([
  {
    id: 'group1',
    name: 'Settings',
    items: [
      { id: 'setting1', name: 'General' },
      { id: 'setting2', name: 'Privacy' },
      { id: 'setting3', name: 'Security' }
    ]
  },
  {
    id: 'group2',
    name: 'Help',
    items: [
      { id: 'help1', name: 'Documentation' },
      { id: 'help2', name: 'Contact Support' },
      { id: 'help3', name: 'FAQ' }
    ]
  },
  {
    id: 'group3',
    name: 'About',
    items: [
      { id: 'about1', name: 'Version' },
      { id: 'about2', name: 'License' },
      { id: 'about3', name: 'Credits' }
    ]
  }
]);

const toggleGroup = (groupId) => {
  const index = expandedGroups.value.indexOf(groupId);
  if (index > -1) {
    expandedGroups.value.splice(index, 1);
  } else {
    expandedGroups.value.push(groupId);
  }
};

const isGroupExpanded = (groupId) => {
  return expandedGroups.value.includes(groupId);
};
</script>

<template>
  <div class="accordion">
    <div 
      v-for="group in groups"
      :key="group.id"
      class="accordion-group"
    >
      <button 
        class="accordion-header"
        @click="toggleGroup(group.id)"
      >
        <span class="arrow" :class="{ 'expanded': isGroupExpanded(group.id) }">▶</span>
        {{ group.name }}
      </button>

      <div v-if="isGroupExpanded(group.id)" class="accordion-content">
        <ul class="item-list">
          <li v-for="item in group.items" :key="item.id">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.accordion-group {
  border-bottom: 1px solid #ddd;
}

.accordion-group:last-child {
  border-bottom: none;
}

.accordion-header {
  width: 100%;
  padding: 12px;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;
}

.accordion-header:hover {
  background-color: #efefef;
}

.arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.arrow.expanded {
  transform: rotate(90deg);
}

.accordion-content {
  padding: 12px;
  background-color: #fafafa;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item-list li {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.item-list li:hover {
  background-color: #f0f0f0;
}
</style>
```

## Performance Optimization

### Tips for Large Datasets

```vue
<script setup>
import { ref, computed } from 'vue';

const data = ref([
  // Large dataset
]);

// ✓ Use computed for filtering instead of methods
const filteredData = computed(() => {
  return data.value.filter(item => item.active);
});

// ✓ Use trackBy for v-for (TreeView handles internally)
// ✓ Disable unnecessary features
const treeConfig = {
  enableVirtualization: true,  // Enable for 1000+ items
  itemsPerPage: 100,           // Adjust based on row height
  allowAnimation: false        // Disable animations for large sets
};

// ✓ Lazy load data on expand
const handleNodeExpanding = async (args) => {
  if (!args.node.hasAttribute('data-loaded')) {
    const children = await fetchChildren(args.nodeData.id);
    treeviewRef.value.addNodes(children, args.nodeData.id);
    args.node.setAttribute('data-loaded', 'true');
  }
};

// ✓ Use debouncing for search
const searchTimeout = ref(null);
const handleSearch = (query) => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    treeviewRef.value.filter(query);
  }, 300);
};
</script>
```

## Real-World Advanced Scenarios

### File System Browser with Advanced Features

```vue
<script setup>
import { ref, onMounted } from 'vue';

const treeviewRef = ref(null);
const cache = ref(new Map());
const selectedFile = ref(null);

const data = ref([
  { id: 'root', name: 'My Computer', hasChild: true }
]);

onMounted(() => {
  restoreExpandedState();
});

const handleNodeExpanding = async (args) => {
  // Check cache
  if (cache.value.has(args.nodeData.id)) {
    treeviewRef.value.addNodes(cache.value.get(args.nodeData.id), args.nodeData.id);
    return;
  }

  // Lazy load
  args.cancel = true;
  const children = await fetchDirectoryContents(args.nodeData.id);
  cache.value.set(args.nodeData.id, children);
  treeviewRef.value.addNodes(children, args.nodeData.id);
  
  // Save state
  saveExpandedState();
};

const handleNodeSelected = (args) => {
  selectedFile.value = args.nodeData;
};

const fetchDirectoryContents = async (dirId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Simulate fetching directory contents
  return [];
};

const saveExpandedState = () => {
  const expanded = treeviewRef.value.expandedNodes;
  localStorage.setItem('expanded-nodes', JSON.stringify(expanded));
};

const restoreExpandedState = () => {
  const saved = localStorage.getItem('expanded-nodes');
  if (saved) {
    const expanded = JSON.parse(saved);
    treeviewRef.value?.expandAll(expanded);
  }
};
</script>

<template>
  <div class="file-browser">
    <div class="properties-panel">
      <h3>Properties</h3>
      <div v-if="selectedFile">
        <p><strong>Name:</strong> {{ selectedFile.name }}</p>
        <p><strong>ID:</strong> {{ selectedFile.id }}</p>
      </div>
      <div v-else class="empty">Select a file to view properties</div>
    </div>

    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID', hasChildren: 'hasChild' }"
      @nodeExpanding="handleNodeExpanding"
      @nodeSelected="handleNodeSelected"
    />
  </div>
</template>

<style scoped>
.file-browser {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 12px;
  height: 500px;
}

.properties-panel {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.properties-panel h3 {
  margin-top: 0;
}

.empty {
  color: #999;
  font-style: italic;
}
</style>
```

## Troubleshooting

### Issue: Load on Demand not working

**Solution:** Ensure `hasChildren` field is set correctly

```vue
<ejs-treeview
  :fields="{ 
    dataSource: data, 
    id: 'id', 
    text: 'name', 
    parentID: 'parentID',
    hasChildren: 'hasChild'  <!-- Critical for load on demand -->
  }"
  @nodeExpanding="handleNodeExpanding"
/>
```

### Issue: Cache not clearing properly

**Solution:** Use Map instead of object for cache management

```vue
// ✗ Object cache issues
const cache = ref({});

// ✓ Use Map for better cache management
const cache = ref(new Map());
cache.value.set(key, value);
cache.value.get(key);
cache.value.clear();
```

### Issue: RTL layout not working

**Solution:** Set `dir` attribute on parent container

```vue
<div :dir="enableRtl ? 'rtl' : 'ltr'">
  <ejs-treeview :enableRtl="enableRtl" />
</div>
```

---

**Key Takeaways:**
- ✅ Implement load-on-demand for large hierarchies
- ✅ Cache loaded nodes to avoid redundant API calls
- ✅ Use persistence to save user state (expanded nodes, selections)
- ✅ Enable virtual scrolling for 1000+ items
- ✅ Support RTL and multi-language using localization
- ✅ Combine with other patterns (accordion, file browser)
- ✅ Monitor performance with large datasets
- ✅ Test caching and persistence across sessions
