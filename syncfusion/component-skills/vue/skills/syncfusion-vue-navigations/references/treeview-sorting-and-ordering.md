# Sorting and Ordering in Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Alphabetical Sorting](#alphabetical-sorting)
3. [Numeric Sorting](#numeric-sorting)
4. [Custom Sort Order](#custom-sort-order)
5. [Level-Based Sorting](#level-based-sorting)
6. [Reverse Ordering](#reverse-ordering)
7. [Multi-Field Sorting](#multi-field-sorting)
8. [Dynamic Sorting](#dynamic-sorting)
9. [Preserve Parent-Child Structure](#preserve-parent-child-structure)
10. [Real-World Examples](#real-world-examples)
11. [Troubleshooting](#troubleshooting)

## Overview

Sorting in TreeView allows you to reorder nodes based on various criteria while maintaining the parent-child hierarchy. Vue 3 TreeView supports alphabetical sorting, custom algorithms, and dynamic reordering.

## Alphabetical Sorting

### Basic Alphabetical Sort

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Apple', parentID: '02' },
  { id: '04', name: 'Zebra', parentID: '02' },
  { id: '05', name: 'Banana', parentID: '02' },
  { id: '06', name: 'Downloads', parentID: '01' }
]);

const sortAlphabetically = () => {
  const sortByName = (a, b) => {
    return a.name.localeCompare(b.name);
  };

  // Sort each level
  const sortedData = sortTreeNodes(data.value, sortByName);
  data.value = sortedData;
};

const sortTreeNodes = (nodes, compareFn) => {
  return nodes
    .map(node => ({
      ...node,
      child: node.child ? sortTreeNodes(node.child, compareFn) : undefined
    }))
    .sort(compareFn);
};

const handleSort = () => {
  sortAlphabetically();
  console.log('Tree sorted alphabetically');
};
</script>

<template>
  <div>
    <button @click="handleSort">Sort A-Z</button>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>
```

### Sort with Case-Insensitive Comparison

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'documents', parentID: '01' },
  { id: '03', name: 'Apple', parentID: '02' },
  { id: '04', name: 'zebra', parentID: '02' },
  { id: '05', name: 'Banana', parentID: '02' }
]);

const sortCaseInsensitive = () => {
  const sortByNameCaseInsensitive = (a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  };

  const sortTreeNodes = (nodes) => {
    return nodes
      .map(node => ({
        ...node,
        child: node.child ? sortTreeNodes(node.child) : undefined
      }))
      .sort(sortByNameCaseInsensitive);
  };

  data.value = sortTreeNodes(data.value);
};
</script>

<template>
  <div>
    <button @click="sortCaseInsensitive">Sort (Case-Insensitive)</button>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>
```

## Numeric Sorting

### Sort by Numeric Field

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Q1 Results', quarter: 1 },
  { id: '02', name: 'Q4 Results', quarter: 4, parentID: '01' },
  { id: '03', name: 'Q2 Results', quarter: 2, parentID: '01' },
  { id: '04', name: 'Q3 Results', quarter: 3, parentID: '01' }
]);

const sortByNumeric = (fieldName, ascending = true) => {
  const sortFn = (a, b) => {
    const aVal = a[fieldName] || 0;
    const bVal = b[fieldName] || 0;
    return ascending ? aVal - bVal : bVal - aVal;
  };

  const sortTreeNodes = (nodes) => {
    return nodes
      .map(node => ({
        ...node,
        child: node.child ? sortTreeNodes(node.child) : undefined
      }))
      .sort(sortFn);
  };

  data.value = sortTreeNodes(data.value);
};

const sortByQuarter = () => {
  sortByNumeric('quarter', true);
  console.log('Sorted by quarter (ascending)');
};
</script>

<template>
  <div>
    <button @click="sortByQuarter">Sort by Quarter</button>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>
```

### Sort by File Size

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Files', size: 0 },
  { id: '02', name: 'Document.pdf', size: 2048, parentID: '01' },
  { id: '03', name: 'Image.jpg', size: 5120, parentID: '01' },
  { id: '04', name: 'Note.txt', size: 512, parentID: '01' },
  { id: '05', name: 'Video.mp4', size: 10240, parentID: '01' }
]);

const sortBySize = (ascending = false) => {
  const sortFn = (a, b) => {
    const aSize = a.size || 0;
    const bSize = b.size || 0;
    return ascending ? aSize - bSize : bSize - aSize;
  };

  const sortTreeNodes = (nodes) => {
    return nodes
      .map(node => ({
        ...node,
        child: node.child ? sortTreeNodes(node.child) : undefined
      }))
      .sort(sortFn);
  };

  data.value = sortTreeNodes(data.value);
};

const formatSize = (bytes) => {
  if (bytes === 0) return '-';
  return (bytes / 1024).toFixed(1) + ' KB';
};
</script>

<template>
  <div>
    <button @click="() => sortBySize(false)">Largest First</button>
    <button @click="() => sortBySize(true)">Smallest First</button>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <div class="file-item">
          <span>{{ node.name }}</span>
          <span class="file-size">{{ formatSize(node.size) }}</span>
        </div>
      </template>
    </ejs-treeview>
  </div>
</template>

<style scoped>
.file-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.file-size {
  color: #999;
  font-size: 0.9em;
}
</style>
```

## Custom Sort Order

### Sort by Priority

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Tasks' },
  { id: '02', name: 'Low Priority', priority: 3, parentID: '01' },
  { id: '03', name: 'High Priority', priority: 1, parentID: '01' },
  { id: '04', name: 'Medium Priority', priority: 2, parentID: '01' }
]);

const priorityOrder = { 1: 'High', 2: 'Medium', 3: 'Low' };

const sortByPriority = () => {
  const sortFn = (a, b) => {
    const aPriority = a.priority || 999;
    const bPriority = b.priority || 999;
    return aPriority - bPriority;
  };

  const sortTreeNodes = (nodes) => {
    return nodes
      .map(node => ({
        ...node,
        child: node.child ? sortTreeNodes(node.child) : undefined
      }))
      .sort(sortFn);
  };

  data.value = sortTreeNodes(data.value);
};

const getPriorityColor = (priority) => {
  const colors = { 1: '#f44336', 2: '#ff9800', 3: '#4caf50' };
  return colors[priority] || '#999';
};

const getPriorityLabel = (priority) => {
  return priorityOrder[priority] || 'Unknown';
};
</script>

<template>
  <div>
    <button @click="sortByPriority">Sort by Priority</button>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <div class="task-item">
          <span>{{ node.name }}</span>
          <span 
            v-if="node.priority"
            class="priority-badge"
            :style="{ backgroundColor: getPriorityColor(node.priority) }"
          >
            {{ getPriorityLabel(node.priority) }}
          </span>
        </div>
      </template>
    </ejs-treeview>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
}

.priority-badge {
  color: white;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 0.8em;
}
</style>
```

## Level-Based Sorting

### Sort Each Level Independently

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Company', level: 0 },
  { id: '02', name: 'Sales', parentID: '01', level: 1 },
  { id: '03', name: 'Engineering', parentID: '01', level: 1 },
  { id: '04', name: 'HR', parentID: '01', level: 1 },
  { id: '05', name: 'John', parentID: '02', level: 2 },
  { id: '06', name: 'Alice', parentID: '02', level: 2 },
  { id: '07', name: 'Bob', parentID: '03', level: 2 }
]);

const sortEachLevel = () => {
  const sortByLevel = (nodes) => {
    // Sort nodes at current level
    const sorted = [...nodes].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Sort children of each node
    return sorted.map(node => ({
      ...node,
      child: node.child ? sortByLevel(node.child) : undefined
    }));
  };

  data.value = sortByLevel(data.value);
};

const sortOnlyChildren = () => {
  // Keep parents as-is, only sort their children
  const sortChildren = (nodes) => {
    return nodes.map(node => ({
      ...node,
      child: node.child ? sortChildren([...node.child].sort((a, b) =>
        a.name.localeCompare(b.name)
      )) : undefined
    }));
  };

  data.value = sortChildren(data.value);
};
</script>

<template>
  <div>
    <button @click="sortEachLevel">Sort All Levels</button>
    <button @click="sortOnlyChildren">Sort Children Only</button>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>
```

## Reverse Ordering

### Reverse Sort Order

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Items' },
  { id: '02', name: 'Apple', parentID: '01' },
  { id: '03', name: 'Banana', parentID: '01' },
  { id: '04', name: 'Cherry', parentID: '01' },
  { id: '05', name: 'Date', parentID: '01' }
]);

const sortReverse = () => {
  const reverseSortFn = (a, b) => {
    return b.name.localeCompare(a.name);
  };

  const sortTreeNodes = (nodes) => {
    return nodes
      .map(node => ({
        ...node,
        child: node.child ? sortTreeNodes(node.child) : undefined
      }))
      .sort(reverseSortFn);
  };

  data.value = sortTreeNodes(data.value);
};

let isSortedAscending = true;

const toggleSort = () => {
  if (isSortedAscending) {
    sortReverse();
    console.log('Sorted Z-A');
  } else {
    sortAlphabetically();
    console.log('Sorted A-Z');
  }
  isSortedAscending = !isSortedAscending;
};

const sortAlphabetically = () => {
  const sortFn = (a, b) => a.name.localeCompare(b.name);

  const sortTreeNodes = (nodes) => {
    return nodes
      .map(node => ({
        ...node,
        child: node.child ? sortTreeNodes(node.child) : undefined
      }))
      .sort(sortFn);
  };

  data.value = sortTreeNodes(data.value);
};
</script>

<template>
  <div>
    <button @click="toggleSort">Toggle Sort Order</button>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>
```

## Multi-Field Sorting

### Sort by Multiple Criteria

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Employees' },
  { id: '02', name: 'John Smith', department: 'Engineering', salary: 120000, parentID: '01' },
  { id: '03', name: 'Alice Johnson', department: 'Sales', salary: 90000, parentID: '01' },
  { id: '04', name: 'Bob Chen', department: 'Engineering', salary: 110000, parentID: '01' },
  { id: '05', name: 'Carol Davis', department: 'Sales', salary: 95000, parentID: '01' }
]);

const sortByMultipleCriteria = (primaryField, secondaryField, ascending = true) => {
  const sortFn = (a, b) => {
    // First, sort by primary field
    const primaryA = a[primaryField] || '';
    const primaryB = b[primaryField] || '';

    if (primaryA !== primaryB) {
      const comparison = typeof primaryA === 'string'
        ? primaryA.localeCompare(primaryB)
        : primaryA - primaryB;
      return ascending ? comparison : -comparison;
    }

    // If primary is equal, sort by secondary
    const secondaryA = a[secondaryField] || '';
    const secondaryB = b[secondaryField] || '';

    const comparison = typeof secondaryA === 'string'
      ? secondaryA.localeCompare(secondaryB)
      : secondaryA - secondaryB;

    return ascending ? comparison : -comparison;
  };

  const sortTreeNodes = (nodes) => {
    return nodes
      .map(node => ({
        ...node,
        child: node.child ? sortTreeNodes(node.child) : undefined
      }))
      .sort(sortFn);
  };

  data.value = sortTreeNodes(data.value);
};

const sortByDepartmentThenSalary = () => {
  sortByMultipleCriteria('department', 'salary', false);
};
</script>

<template>
  <div>
    <button @click="sortByDepartmentThenSalary">
      Sort by Department → Salary
    </button>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <div class="employee-item">
          <span>{{ node.name }}</span>
          <span v-if="node.department" class="department">{{ node.department }}</span>
          <span v-if="node.salary" class="salary">${{ node.salary.toLocaleString() }}</span>
        </div>
      </template>
    </ejs-treeview>
  </div>
</template>

<style scoped>
.employee-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.department {
  color: #666;
  font-size: 0.9em;
}

.salary {
  color: #2196F3;
  font-weight: 500;
}
</style>
```

## Dynamic Sorting

### Sorting with User Selection

```vue
<script setup>
import { ref } from 'vue';

const sortBy = ref('name');
const sortOrder = ref('asc');

const data = ref([
  { id: '01', name: 'Projects', date: '2024-01-01', status: 'active' },
  { id: '02', name: 'Project Alpha', date: '2024-01-15', status: 'completed', parentID: '01' },
  { id: '03', name: 'Project Beta', date: '2024-01-10', status: 'in-progress', parentID: '01' },
  { id: '04', name: 'Project Gamma', date: '2024-01-20', status: 'active', parentID: '01' }
]);

const performSort = () => {
  const sortFn = (a, b) => {
    let comparison = 0;

    if (sortBy.value === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy.value === 'date') {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortBy.value === 'status') {
      comparison = a.status.localeCompare(b.status);
    }

    return sortOrder.value === 'asc' ? comparison : -comparison;
  };

  const sortTreeNodes = (nodes) => {
    return nodes
      .map(node => ({
        ...node,
        child: node.child ? sortTreeNodes(node.child) : undefined
      }))
      .sort(sortFn);
  };

  data.value = sortTreeNodes(data.value);
};

const handleSortChange = () => {
  performSort();
};
</script>

<template>
  <div>
    <div class="sort-controls">
      <select v-model="sortBy" @change="handleSortChange">
        <option value="name">Sort by Name</option>
        <option value="date">Sort by Date</option>
        <option value="status">Sort by Status</option>
      </select>
      <select v-model="sortOrder" @change="handleSortChange">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <div class="project-item">
          <span>{{ node.name }}</span>
          <span v-if="node.date" class="date">{{ node.date }}</span>
          <span v-if="node.status" class="status">{{ node.status }}</span>
        </div>
      </template>
    </ejs-treeview>
  </div>
</template>

<style scoped>
.sort-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.sort-controls select {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.project-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.date,
.status {
  font-size: 0.85em;
  color: #666;
}
</style>
```

## Preserve Parent-Child Structure

### Sorting While Maintaining Hierarchy

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Organization', expanded: true },
  { id: '02', name: 'Engineering', parentID: '01', expanded: true },
  { id: '03', name: 'Backend', parentID: '02' },
  { id: '04', name: 'Frontend', parentID: '02' },
  { id: '05', name: 'Sales', parentID: '01', expanded: true },
  { id: '06', name: 'EMEA', parentID: '05' },
  { id: '07', name: 'APAC', parentID: '05' }
]);

const sortPreservingHierarchy = () => {
  const sortFn = (a, b) => a.name.localeCompare(b.name);

  const sortTreeNodes = (nodes, parentID = null) => {
    // Get all nodes at this level
    const levelNodes = nodes.filter(n => n.parentID === parentID);
    const otherNodes = nodes.filter(n => n.parentID !== parentID);

    // Sort nodes at this level
    levelNodes.sort(sortFn);

    // Recursively sort children
    const result = [];
    levelNodes.forEach(node => {
      result.push(node);
      const children = sortTreeNodes(otherNodes, node.id);
      result.push(...children);
    });

    return result;
  };

  data.value = sortTreeNodes(data.value);
};
</script>

<template>
  <div>
    <button @click="sortPreservingHierarchy">
      Sort (Keep Hierarchy)
    </button>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID', expanded: 'expanded' }"
    />
  </div>
</template>
```

## Real-World Examples

### File Manager Sorting

```vue
<script setup>
import { ref } from 'vue';

const sortField = ref('name');
const sortOrder = ref('asc');

const fileData = ref([
  { id: '01', name: 'Documents', type: 'folder', size: 0, modified: '2024-01-20' },
  { id: '02', name: 'Report.pdf', type: 'file', size: 2048, modified: '2024-01-15', parentID: '01' },
  { id: '03', name: 'Budget.xlsx', type: 'file', size: 1024, modified: '2024-01-18', parentID: '01' },
  { id: '04', name: 'Notes.docx', type: 'file', size: 512, modified: '2024-01-10', parentID: '01' }
]);

const formatSize = (bytes) => {
  if (bytes === 0) return '-';
  return (bytes / 1024).toFixed(1) + ' KB';
};

const performSort = () => {
  let sortFn;

  if (sortField.value === 'name') {
    sortFn = (a, b) => a.name.localeCompare(b.name);
  } else if (sortField.value === 'size') {
    sortFn = (a, b) => (a.size || 0) - (b.size || 0);
  } else if (sortField.value === 'modified') {
    sortFn = (a, b) => new Date(a.modified) - new Date(b.modified);
  }

  if (sortOrder.value === 'desc') {
    sortFn = ((fn) => (a, b) => -fn(a, b))(sortFn);
  }

  const sortTreeNodes = (nodes) => {
    return nodes
      .map(node => ({
        ...node,
        child: node.child ? sortTreeNodes(node.child) : undefined
      }))
      .sort(sortFn);
  };

  fileData.value = sortTreeNodes(fileData.value);
};
</script>

<template>
  <div>
    <div class="file-controls">
      <select v-model="sortField" @change="performSort">
        <option value="name">Name</option>
        <option value="size">Size</option>
        <option value="modified">Modified</option>
      </select>
      <select v-model="sortOrder" @change="performSort">
        <option value="asc">↑ Ascending</option>
        <option value="desc">↓ Descending</option>
      </select>
    </div>
    <ejs-treeview
      :fields="{ dataSource: fileData, id: 'id', text: 'name', parentID: 'parentID' }"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <div class="file-row">
          <span class="file-icon">{{ node.type === 'folder' ? '📁' : '📄' }}</span>
          <span class="file-name">{{ node.name }}</span>
          <span v-if="node.size" class="file-size">{{ formatSize(node.size) }}</span>
          <span v-if="node.modified" class="file-date">{{ node.modified }}</span>
        </div>
      </template>
    </ejs-treeview>
  </div>
</template>

<style scoped>
.file-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.file-controls select {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.file-row {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
}

.file-icon {
  font-size: 1.1em;
}

.file-name {
  flex: 1;
}

.file-size,
.file-date {
  font-size: 0.85em;
  color: #666;
  min-width: 80px;
  text-align: right;
}
</style>
```

## Troubleshooting

### Issue: Original order not preserved

**Solution:** Create a copy of data before sorting

```vue
const originalData = ref(JSON.parse(JSON.stringify(data.value)));

const resetToOriginal = () => {
  data.value = JSON.parse(JSON.stringify(originalData.value));
};
```

### Issue: Parent-child relationship lost after sort

**Solution:** Use parentID field to maintain hierarchy

```vue
// Always sort by preserving parentID relationships
const nodes = data.value.filter(n => n.parentID === parentId);
nodes.sort((a, b) => a.name.localeCompare(b.name));
```

### Issue: Nested sorting not working correctly

**Solution:** Recursively sort each level

```vue
const sortTreeNodes = (nodes) => {
  return nodes
    .map(node => ({
      ...node,
      child: node.child ? sortTreeNodes(node.child) : undefined
    }))
    .sort(compareFn);
};
```

---

**Key Takeaways:**
- ✅ Sort using `localeCompare()` for strings
- ✅ Use numeric comparison for numbers
- ✅ Always preserve parent-child relationships
- ✅ Recursively sort each level for nested sorting
- ✅ Use dynamic sort controls for user flexibility
- ✅ Support both ascending and descending order
- ✅ Maintain original data in case reset is needed
