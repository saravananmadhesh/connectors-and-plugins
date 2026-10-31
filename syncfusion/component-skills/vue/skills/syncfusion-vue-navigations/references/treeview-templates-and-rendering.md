# Templates and Rendering in Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Understanding v-slot Templates](#understanding-v-slot-templates)
3. [Node Template](#node-template)
4. [Conditional Rendering](#conditional-rendering)
5. [Custom Icons and Images](#custom-icons-and-images)
6. [Dynamic Templates](#dynamic-templates)
7. [Slot Props and Data Access](#slot-props-and-data-access)
8. [Rendering Events](#rendering-events)
9. [Performance Optimization](#performance-optimization)
10. [Complex Template Examples](#complex-template-examples)
11. [Troubleshooting](#troubleshooting)

## Overview

Vue 3 TreeView supports template customization through scoped slots (`v-slot`). This allows you to replace the default node template with custom Vue components and markup. Slot props provide access to node data, making dynamic rendering possible.

## Understanding v-slot Templates

### Basic Node Template

The `:nodeTemplate` slot allows you to customize how each node is rendered:

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <!-- Default: Just uses the 'name' field -->
  </ejs-treeview>

  <!-- With custom node template -->
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <template v-slot:nodeTemplate="{ data: nodeData }">
      <div class="custom-node">
        {{ nodeData.name }}
      </div>
    </template>
  </ejs-treeview>
</template>
```

### Accessing Slot Props

The slot provides multiple props for accessing node information:

```vue
<template v-slot:nodeTemplate="slotProps">
  <div class="node-wrapper">
    <!-- Node data (from fields binding) -->
    <span>{{ slotProps.data.name }}</span>
    
    <!-- Additional context -->
    <span v-if="slotProps.expanded">✓</span>
  </div>
</template>
```

## Node Template

### Complete Node Template Example

```vue
<script setup>
import { ref } from 'vue';

const fileSystemData = ref([
  { id: '01', name: 'Desktop', type: 'folder', size: 0 },
  { id: '02', name: 'Documents', parentID: '01', type: 'folder', size: 0 },
  { id: '03', name: 'Resume.docx', parentID: '02', type: 'file', size: 245 },
  { id: '04', name: 'CoverLetter.docx', parentID: '02', type: 'file', size: 198 },
  { id: '05', name: 'Downloads', parentID: '01', type: 'folder', size: 0 },
  { id: '06', name: 'Software.exe', parentID: '05', type: 'file', size: 5120 }
]);

const getFileIcon = (type) => {
  return type === 'folder' ? '📁' : '📄';
};

const formatSize = (bytes) => {
  if (bytes === 0) return '-';
  const kb = bytes / 1024;
  return kb.toFixed(1) + ' KB';
};
</script>

<template>
  <ejs-treeview
    :fields="{ 
      dataSource: fileSystemData, 
      id: 'id', 
      text: 'name', 
      parentID: 'parentID' 
    }"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div class="file-node">
        <span class="file-icon">{{ getFileIcon(node.type) }}</span>
        <span class="file-name">{{ node.name }}</span>
        <span class="file-size">{{ formatSize(node.size) }}</span>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.file-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
}

.file-icon {
  font-size: 1.2em;
}

.file-name {
  flex: 1;
  font-weight: 500;
}

.file-size {
  font-size: 0.85em;
  color: #666;
  min-width: 60px;
  text-align: right;
}
</style>
```

## Conditional Rendering

### Show/Hide Elements Based on Node Data

```vue
<script setup>
import { ref } from 'vue';

const organizationData = ref([
  { id: '01', name: 'Organization', level: 0 },
  { id: '02', name: 'CEO', parentID: '01', level: 1, isExecutive: true, salary: 250000 },
  { id: '03', name: 'CTO', parentID: '01', level: 1, isExecutive: true, salary: 200000 },
  { id: '04', name: 'Engineering', parentID: '01', level: 1 },
  { id: '05', name: 'Frontend Lead', parentID: '04', level: 2, salary: 150000 },
  { id: '06', name: 'Backend Lead', parentID: '04', level: 2, salary: 150000 }
]);
</script>

<template>
  <ejs-treeview
    :fields="{ 
      dataSource: organizationData, 
      id: 'id', 
      text: 'name', 
      parentID: 'parentID' 
    }"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div class="org-node">
        <!-- Executive badge -->
        <span v-if="node.isExecutive" class="badge-executive">Executive</span>
        
        <!-- Node name -->
        <span class="node-name">{{ node.name }}</span>
        
        <!-- Salary display (only for non-top-level) -->
        <span v-if="node.salary" class="salary-badge">
          ${{ node.salary.toLocaleString() }}
        </span>
        
        <!-- Level indicator -->
        <span class="level-indicator">L{{ node.level }}</span>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.org-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
}

.badge-executive {
  background-color: #FF9800;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.75em;
  font-weight: bold;
}

.node-name {
  flex: 1;
  font-weight: 500;
}

.salary-badge {
  background-color: #4CAF50;
  color: white;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 0.85em;
}

.level-indicator {
  background-color: #E0E0E0;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.8em;
}
</style>
```

## Custom Icons and Images

### Using Emoji Icons

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Fruits', icon: '🍎', type: 'category' },
  { id: '02', name: 'Apple', parentID: '01', icon: '🍎', color: 'red' },
  { id: '03', name: 'Banana', parentID: '01', icon: '🍌', color: 'yellow' },
  { id: '04', name: 'Vegetables', icon: '🥕', type: 'category' },
  { id: '05', name: 'Carrot', parentID: '04', icon: '🥕', color: 'orange' },
  { id: '06', name: 'Broccoli', parentID: '04', icon: '🥦', color: 'green' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div class="emoji-node">
        <span class="emoji-icon">{{ node.icon }}</span>
        <span class="node-text">{{ node.name }}</span>
        <span v-if="node.color" class="color-badge" :style="{ backgroundColor: node.color }"></span>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.emoji-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
}

.emoji-icon {
  font-size: 1.3em;
}

.node-text {
  flex: 1;
}

.color-badge {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
</style>
```

### Using Font Icons

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Projects', icon: 'e-icons e-folder' },
  { id: '02', name: 'Project A', parentID: '01', icon: 'e-icons e-folder-open' },
  { id: '03', name: 'src', parentID: '02', icon: 'e-icons e-folder' },
  { id: '04', name: 'App.vue', parentID: '03', icon: 'e-icons e-file-code' },
  { id: '05', name: 'package.json', parentID: '02', icon: 'e-icons e-file' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div class="icon-node">
        <i :class="node.icon"></i>
        <span>{{ node.name }}</span>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.icon-node {
  display: flex;
  align-items: center;
  gap: 8px;
}

i {
  min-width: 20px;
  text-align: center;
  color: #2196F3;
}
</style>
```

### Using Image URLs

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Team', avatar: null },
  { id: '02', name: 'John Smith', parentID: '01', avatar: 'https://api.example.com/avatars/john.jpg' },
  { id: '03', name: 'Jane Doe', parentID: '01', avatar: 'https://api.example.com/avatars/jane.jpg' },
  { id: '04', name: 'Bob Johnson', parentID: '01', avatar: 'https://api.example.com/avatars/bob.jpg' }
]);

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div class="team-node">
        <div v-if="node.avatar" class="avatar">
          <img :src="node.avatar" :alt="node.name" />
        </div>
        <div v-else class="avatar-placeholder">
          {{ getInitials(node.name) }}
        </div>
        <span>{{ node.name }}</span>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.team-node {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar,
.avatar-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
```

## Dynamic Templates

### Conditional Template Selection

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Tasks', type: 'category' },
  { id: '02', name: 'Urgent Task', parentID: '01', type: 'task', priority: 'high', status: 'open' },
  { id: '03', name: 'Regular Task', parentID: '01', type: 'task', priority: 'normal', status: 'in-progress' },
  { id: '04', name: 'John Doe', parentID: '01', type: 'person', role: 'developer' },
  { id: '05', name: 'Settings', type: 'settings' }
]);

const getTemplateType = (node) => {
  return node.type;
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <!-- Category template -->
    <template v-slot:nodeTemplate="{ data: node }" v-if="getTemplateType(node) === 'category'">
      <div class="category-node">
        <span class="category-icon">📂</span>
        <span class="category-name">{{ node.name }}</span>
      </div>
    </template>

    <!-- Task template -->
    <template v-slot:nodeTemplate="{ data: node }" v-if="getTemplateType(node) === 'task'">
      <div class="task-node">
        <span :class="['priority-badge', `priority-${node.priority}`]">
          {{ node.priority.toUpperCase() }}
        </span>
        <span class="task-name">{{ node.name }}</span>
        <span :class="['status-badge', `status-${node.status}`]">
          {{ node.status }}
        </span>
      </div>
    </template>

    <!-- Person template -->
    <template v-slot:nodeTemplate="{ data: node }" v-if="getTemplateType(node) === 'person'">
      <div class="person-node">
        <span class="person-icon">👤</span>
        <span class="person-name">{{ node.name }}</span>
        <span class="role-badge">{{ node.role }}</span>
      </div>
    </template>

    <!-- Settings template -->
    <template v-slot:nodeTemplate="{ data: node }" v-if="getTemplateType(node) === 'settings'">
      <div class="settings-node">
        <span class="settings-icon">⚙️</span>
        <span>{{ node.name }}</span>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.category-node,
.task-node,
.person-node,
.settings-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
}

.category-icon,
.person-icon,
.settings-icon {
  font-size: 1.1em;
}

.priority-badge {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.7em;
  font-weight: bold;
  color: white;
}

.priority-high {
  background-color: #f44336;
}

.priority-normal {
  background-color: #ff9800;
}

.priority-low {
  background-color: #4caf50;
}

.status-badge {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.7em;
  background-color: #e0e0e0;
  color: #333;
}

.status-open {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status-in-progress {
  background-color: #fff3e0;
  color: #f57c00;
}

.role-badge {
  font-size: 0.85em;
  color: #666;
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
}
</style>
```

## Slot Props and Data Access

### Complete Slot Props Reference

```vue
<template v-slot:nodeTemplate="slotProps">
  <div class="debug-info">
    <!-- Node data from fields binding -->
    <p>Data ID: {{ slotProps.data.id }}</p>
    <p>Data Name: {{ slotProps.data.name }}</p>
    
    <!-- Node element information -->
    <p>Has Children: {{ slotProps.hasChildren }}</p>
    <p>Level: {{ slotProps.level }}</p>
    
    <!-- Any custom properties in data -->
    <p v-if="slotProps.data.customField">
      Custom: {{ slotProps.data.customField }}
    </p>
  </div>
</template>
```

## Rendering Events

### nodeRendered Event

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Node 1' },
  { id: '02', name: 'Node 2', parentID: '01' },
  { id: '03', name: 'Node 3', parentID: '01' }
]);

const renderedNodes = ref([]);

const handleNodeRendered = (args) => {
  renderedNodes.value.push({
    id: args.nodeData.id,
    name: args.nodeData.name,
    timestamp: new Date().toLocaleTimeString()
  });

  // Apply custom styling based on conditions
  if (args.nodeData.id === '02') {
    args.node.style.backgroundColor = '#FFF9C4';
  }
};
</script>

<template>
  <div>
    <div class="rendered-log">
      <h3>Rendered Nodes: {{ renderedNodes.length }}</h3>
      <ul>
        <li v-for="node in renderedNodes" :key="node.id">
          {{ node.name }} - {{ node.timestamp }}
        </li>
      </ul>
    </div>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      @nodeRendered="handleNodeRendered"
    />
  </div>
</template>
```

## Performance Optimization

### Virtual Scrolling with Large Datasets

```vue
<script setup>
import { ref, computed } from 'vue';

// Generate large dataset
const generateLargeData = () => {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      id: `${i}`,
      name: `Item ${i}`,
      parentID: i === 0 ? null : `${Math.floor((i - 1) / 10)}`,
      level: Math.floor(i / 100)
    });
  }
  return data;
};

const largeData = ref(generateLargeData());

const handleNodeRendered = (args) => {
  // Lazy load or defer processing
  if (args.nodeData.level > 10) {
    args.cancel = true; // Don't render very deep nodes
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: largeData, id: 'id', text: 'name', parentID: 'parentID' }"
    :showCheckBox="false"
    @nodeRendered="handleNodeRendered"
  />
</template>
```

## Complex Template Examples

### File Browser with Size and Actions

```vue
<script setup>
import { ref } from 'vue';

const fileSystemData = ref([
  { id: '01', name: 'src', type: 'folder', size: 0, modified: '2024-01-15' },
  { id: '02', name: 'components', parentID: '01', type: 'folder', size: 0, modified: '2024-01-15' },
  { id: '03', name: 'App.vue', parentID: '02', type: 'file', size: 2048, modified: '2024-01-15' },
  { id: '04', name: 'utils.ts', parentID: '02', type: 'file', size: 1024, modified: '2024-01-14' },
  { id: '05', name: 'main.ts', parentID: '01', type: 'file', size: 512, modified: '2024-01-10' }
]);

const selectedFile = ref(null);

const handleDownload = (node) => {
  console.log('Downloading:', node.name);
};

const handleDelete = (node, event) => {
  event.stopPropagation();
  if (confirm(`Delete ${node.name}?`)) {
    const index = fileSystemData.value.findIndex(f => f.id === node.id);
    if (index > -1) {
      fileSystemData.value.splice(index, 1);
    }
  }
};

const handleRename = (node) => {
  const newName = prompt('Enter new name:', node.name);
  if (newName) {
    const file = fileSystemData.value.find(f => f.id === node.id);
    if (file) file.name = newName;
  }
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString();
};

const formatSize = (bytes) => {
  if (bytes === 0) return '-';
  const kb = bytes / 1024;
  return kb < 1024 ? kb.toFixed(1) + ' KB' : (kb / 1024).toFixed(1) + ' MB';
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: fileSystemData, id: 'id', text: 'name', parentID: 'parentID' }"
    :fullRowSelect="true"
    @nodeSelected="selectedFile = $event.nodeData"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div class="file-browser-row">
        <div class="file-info">
          <span class="file-icon">
            {{ node.type === 'folder' ? '📁' : '📄' }}
          </span>
          <span class="file-name">{{ node.name }}</span>
        </div>
        <div class="file-meta">
          <span class="file-size">{{ formatSize(node.size) }}</span>
          <span class="file-date">{{ formatDate(node.modified) }}</span>
        </div>
        <div class="file-actions">
          <button 
            v-if="node.type === 'file'"
            class="action-btn"
            @click="handleDownload(node)"
            title="Download"
          >
            ⬇️
          </button>
          <button 
            class="action-btn"
            @click="handleRename(node)"
            title="Rename"
          >
            ✏️
          </button>
          <button 
            class="action-btn delete-btn"
            @click="handleDelete(node, $event)"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.file-browser-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  width: 100%;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.file-icon {
  font-size: 1.2em;
  flex-shrink: 0;
}

.file-name {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  display: flex;
  gap: 16px;
  font-size: 0.85em;
  color: #666;
  min-width: fit-content;
}

.file-size {
  min-width: 60px;
  text-align: right;
}

.file-date {
  min-width: 100px;
}

.file-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
  padding: 4px;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: #f0f0f0;
}

.delete-btn:hover {
  background-color: #ffebee;
}
</style>
```

## Troubleshooting

### Issue: Template not rendering

**Solution:** Ensure v-slot syntax is correct

```vue
<!-- ❌ Wrong -->
<template slot="nodeTemplate">

<!-- ✅ Correct -->
<template v-slot:nodeTemplate="{ data: node }">
```

### Issue: Slot props not accessible

**Solution:** Destructure the slot props correctly

```vue
<!-- ❌ Wrong -->
<template v-slot:nodeTemplate>
  {{ nodeData.name }} <!-- undefined -->
</template>

<!-- ✅ Correct -->
<template v-slot:nodeTemplate="{ data: nodeData }">
  {{ nodeData.name }} <!-- works -->
</template>
```

### Issue: Performance degradation with many templates

**Solution:** Use virtual scrolling or pagination

```vue
const treeviewRef = ref(null);

const handleNodeRendered = (args) => {
  // Skip rendering deeply nested nodes
  if (args.level > 5) {
    args.cancel = true;
  }
};
```

---

**Key Takeaways:**
- ✅ Use `v-slot:nodeTemplate="{ data: node }"` for custom templates
- ✅ Access node data via slot props: `node.id`, `node.name`, custom fields
- ✅ Use `v-if` for conditional rendering within templates
- ✅ Use different template blocks for different node types
- ✅ Use `@nodeRendered` to apply post-render customizations
- ✅ Optimize performance with lazy loading or virtual scrolling
- ✅ Always use `:key` when rendering lists within templates
