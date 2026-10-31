# Selection and Checking in Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Single vs Multi-Selection Modes](#single-vs-multi-selection-modes)
3. [Checkbox Functionality](#checkbox-functionality)
4. [Three-State Checkbox System](#three-state-checkbox-system)
5. [Parent-Child Checkbox Auto-Sync](#parent-child-checkbox-auto-sync)
6. [Keyboard Selection](#keyboard-selection)
7. [Selection Methods](#selection-methods)
8. [Getting Selected and Checked Nodes](#getting-selected-and-checked-nodes)
9. [Preventing Selection](#preventing-selection)
10. [Preventing Checks](#preventing-checks)
11. [Full Row Selection](#full-row-selection)
12. [Real-World Examples](#real-world-examples)
13. [Troubleshooting](#troubleshooting)

## Overview

Selection and checking are fundamental interactions in TreeView components. Syncfusion Vue 3 TreeView provides flexible mechanisms for:
- Single and multi-node selection
- Three-state checkbox system (checked, unchecked, indeterminate)
- Automatic parent-child synchronization
- Keyboard shortcuts for power users
- Programmatic control via methods
- Event-based prevention logic

## Single vs Multi-Selection Modes

### Basic Single Selection

By default, TreeView allows single selection. Only one node can be selected at a time:

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' }
]);

const handleNodeSelected = (args) => {
  console.log('Selected node:', args.nodeData.name);
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    @nodeSelected="handleNodeSelected"
  />
</template>
```

### Multi-Selection Mode

Enable multi-selection with `:allowMultiSelection="true"`. Users can select multiple nodes using Ctrl+Click or Shift+Click:

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' },
  { id: '04', name: 'Music', parentID: '01' },
  { id: '05', name: 'Projects', parentID: '02' },
  { id: '06', name: 'Resume.docx', parentID: '02' }
]);

const treeviewRef = ref(null);
const selectedNodes = ref([]);

const handleNodeSelected = () => {
  if (treeviewRef.value) {
    selectedNodes.value = treeviewRef.value.selectedNodes;
    console.log('Selected nodes:', selectedNodes.value);
  }
};
</script>

<template>
  <div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowMultiSelection="true"
      @nodeSelected="handleNodeSelected"
    />
    <p>Selected: {{ selectedNodes }}</p>
  </div>
</template>
```

## Checkbox Functionality

### Enabling Checkboxes

Add checkboxes to tree nodes with `:showCheckBox="true"`:

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' },
  { id: '04', name: 'Resume.docx', parentID: '02' },
  { id: '05', name: 'CoverLetter.docx', parentID: '02' }
]);

const treeviewRef = ref(null);
const checkedNodes = ref([]);

const handleCheckedChanged = (args) => {
  if (treeviewRef.value) {
    checkedNodes.value = treeviewRef.value.checkedNodes;
  }
};
</script>

<template>
  <div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :showCheckBox="true"
      @nodeChecked="handleCheckedChanged"
    />
    <p>Checked: {{ checkedNodes }}</p>
  </div>
</template>
```

### Disabling Checkboxes for Specific Nodes

Control checkbox visibility per node:

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01', isCheckboxDisabled: false },
  { id: '03', name: 'Downloads', parentID: '01', isCheckboxDisabled: true },
  { id: '04', name: 'Resume.docx', parentID: '02', isCheckboxDisabled: false },
  { id: '05', name: 'CoverLetter.docx', parentID: '02', isCheckboxDisabled: false }
]);

const handleNodeRendered = (args) => {
  // Prevent checkbox for specific nodes
  if (args.nodeData.isCheckboxDisabled) {
    const checkbox = args.node.querySelector('.e-checkbox-wrapper');
    if (checkbox) checkbox.style.display = 'none';
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :showCheckBox="true"
    @nodeRendered="handleNodeRendered"
  />
</template>
```

## Three-State Checkbox System

### Understanding Checkbox States

Syncfusion TreeView supports three checkbox states:
- **Checked**: Node and all children are checked
- **Unchecked**: Node and all children are unchecked
- **Indeterminate**: Some (but not all) children are checked

```vue
<script setup>
import { ref } from 'vue';

const hierarchicalData = ref([
  { id: '01', name: 'Organization', expanded: true },
  { id: '02', name: 'Executive', parentID: '01', expanded: true },
  { id: '03', name: 'CEO', parentID: '02' },
  { id: '04', name: 'CTO', parentID: '02' },
  { id: '05', name: 'Engineering', parentID: '01', expanded: true },
  { id: '06', name: 'Frontend Lead', parentID: '05' },
  { id: '07', name: 'Backend Lead', parentID: '05' },
  { id: '08', name: 'QA Lead', parentID: '05' }
]);

const treeviewRef = ref(null);

const getCheckboxStates = () => {
  if (!treeviewRef.value) return;
  
  const checkedNodes = treeviewRef.value.checkedNodes;
  console.log('Checked nodes:', checkedNodes);
  
  // Indeterminate nodes are automatically handled by TreeView
};
</script>

<template>
  <div>
    <button @click="getCheckboxStates">Get States</button>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ 
        dataSource: hierarchicalData, 
        id: 'id', 
        text: 'name', 
        parentID: 'parentID',
        expanded: 'expanded'
      }"
      :showCheckBox="true"
    />
  </div>
</template>
```

## Parent-Child Checkbox Auto-Sync

### autoCheck Property

The `:autoCheck="true"` property automatically synchronizes checkbox states between parent and child nodes:

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop', expanded: true },
  { id: '02', name: 'Documents', parentID: '01', expanded: true },
  { id: '03', name: 'Resume.docx', parentID: '02' },
  { id: '04', name: 'CoverLetter.docx', parentID: '02' },
  { id: '05', name: 'Downloads', parentID: '01', expanded: true },
  { id: '06', name: 'Software.exe', parentID: '05' },
  { id: '07', name: 'Document.pdf', parentID: '05' }
]);

const handleSync = () => {
  console.log('Auto-sync enabled: Checking a parent automatically checks children');
};
</script>

<template>
  <div>
    <button @click="handleSync">Demonstrate Auto-Sync</button>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID', expanded: 'expanded' }"
      :showCheckBox="true"
      :autoCheck="true"
    />
    <p>Tip: Check "Documents" to automatically check all child files</p>
  </div>
</template>
```

## Keyboard Selection

### Standard Keyboard Shortcuts

Syncfusion TreeView supports standard keyboard interactions:

| Key | Action |
|-----|--------|
| Arrow Up | Select previous node |
| Arrow Down | Select next node |
| Arrow Left | Collapse node |
| Arrow Right | Expand node |
| Ctrl+A | Select all nodes (when allowMultiSelection is true) |
| Ctrl+Click | Toggle individual node selection |
| Shift+Click | Select range of nodes |
| Space | Toggle checkbox state |
| F2 | Edit node (if allowEditing is true) |

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop', expanded: true },
  { id: '02', name: 'Documents', parentID: '01', expanded: true },
  { id: '03', name: 'Resume.docx', parentID: '02' },
  { id: '04', name: 'CoverLetter.docx', parentID: '02' },
  { id: '05', name: 'Downloads', parentID: '01' }
]);

const treeviewRef = ref(null);

const handleKeyDown = (args) => {
  if (!treeviewRef.value) return;

  // Custom keyboard handling
  if (args.key === 'Enter') {
    const selectedNode = treeviewRef.value.selectedNodes[0];
    console.log('Opening:', selectedNode);
  } else if (args.key === 'Delete') {
    const selectedNodes = treeviewRef.value.selectedNodes;
    console.log('Deleting:', selectedNodes);
  } else if (args.ctrlKey && args.key === 'c') {
    console.log('Copying node');
  }
};
</script>

<template>
  <div @keydown="handleKeyDown" tabindex="0">
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID', expanded: 'expanded' }"
      :allowMultiSelection="true"
    />
    <p>Try: Arrow keys, Ctrl+Click for multi-select, Shift+Click for range</p>
  </div>
</template>
```

## Selection Methods

### selectNodes() - Select Specific Nodes

```vue
<script setup>
import { ref, computed } from 'vue';

const treeviewRef = ref(null);
const selectedNodeInfo = ref([]);

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' },
  { id: '04', name: 'Music', parentID: '01' },
  { id: '05', name: 'Resume.docx', parentID: '02' }
]);

const selectSpecificNodes = () => {
  const nodesToSelect = ['02', '04'];
  if (treeviewRef.value) {
    treeviewRef.value.selectNodes(nodesToSelect);
  }
};

const selectByName = (name) => {
  if (!treeviewRef.value) return;
  
  const allData = treeviewRef.value.getTreeData();
  const matchingIds = [];
  
  const findByName = (nodes) => {
    nodes.forEach(node => {
      if (node.name.includes(name)) {
        matchingIds.push(node.id);
      }
      if (node.child) findByName(node.child);
    });
  };
  
  findByName(allData);
  treeviewRef.value.selectNodes(matchingIds);
};
</script>

<template>
  <div>
    <button @click="selectSpecificNodes">Select Documents & Music</button>
    <button @click="() => selectByName('Resume')">Select Resume Items</button>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowMultiSelection="true"
    />
  </div>
</template>
```

### clearSelection() - Deselect All Nodes

```vue
const handleClearSelection = () => {
  if (treeviewRef.value) {
    treeviewRef.value.clearSelection();
    console.log('All selections cleared');
  }
};

<button @click="handleClearSelection">Clear Selection</button>
```

### checkAll() and uncheckAll() - Bulk Checkbox Operations

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);

const handleCheckAll = () => {
  if (treeviewRef.value) {
    treeviewRef.value.checkAll();
    console.log('All nodes checked');
  }
};

const handleUncheckAll = () => {
  if (treeviewRef.value) {
    treeviewRef.value.uncheckAll();
    console.log('All nodes unchecked');
  }
};

const handleCheckSpecific = () => {
  if (treeviewRef.value) {
    const nodesToCheck = ['02', '04'];
    treeviewRef.value.checkAll(nodesToCheck);
  }
};

const handleToggleChecks = () => {
  if (!treeviewRef.value) return;
  
  const checkedNodes = treeviewRef.value.checkedNodes || [];
  const allData = treeviewRef.value.getTreeData();
  const allIds = [];
  
  const collectIds = (nodes) => {
    nodes.forEach(node => {
      allIds.push(node.id);
      if (node.child) collectIds(node.child);
    });
  };
  
  collectIds(allData);
  
  const uncheckedNodes = allIds.filter(id => !checkedNodes.includes(id.toString()));
  
  treeviewRef.value.uncheckAll(checkedNodes);
  treeviewRef.value.checkAll(uncheckedNodes);
};
</script>

<template>
  <div>
    <button @click="handleCheckAll">Check All</button>
    <button @click="handleUncheckAll">Uncheck All</button>
    <button @click="handleCheckSpecific">Check Specific</button>
    <button @click="handleToggleChecks">Toggle All</button>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :showCheckBox="true"
    />
  </div>
</template>
```

## Getting Selected and Checked Nodes

### getSelectedNodes() - Retrieve Selected Node IDs

```vue
const displaySelectedNodes = () => {
  if (!treeviewRef.value) return;
  
  const selectedIds = treeviewRef.value.selectedNodes || [];
  const allData = treeviewRef.value.getTreeData();
  
  const nodeInfo = selectedIds.map(id => {
    const findNode = (nodes) => {
      for (let node of nodes) {
        if (node.id.toString() === id) return node;
        if (node.child) {
          const found = findNode(node.child);
          if (found) return found;
        }
      }
      return null;
    };
    
    const node = findNode(allData);
    return { id, name: node?.name || 'Unknown' };
  });
  
  console.log('Selected nodes:', nodeInfo);
  return nodeInfo;
};
```

### getCheckedNodes() - Retrieve Checked Node IDs

```vue
const exportCheckedNodes = () => {
  if (!treeviewRef.value) return;
  
  const checkedIds = treeviewRef.value.checkedNodes || [];
  const allData = treeviewRef.value.getTreeData();
  
  const checkedData = checkedIds.map(id => {
    const findNode = (nodes) => {
      for (let node of nodes) {
        if (node.id.toString() === id) return node;
        if (node.child) {
          const found = findNode(node.child);
          if (found) return found;
        }
      }
      return null;
    };
    
    const node = findNode(allData);
    return { id, name: node?.name || 'Unknown' };
  });
  
  console.log('JSON:', JSON.stringify(checkedData, null, 2));
};
```

## Preventing Selection

### nodeSelecting Event - Cancel Selection

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents (Read-Only)', parentID: '01', readOnly: true },
  { id: '03', name: 'Downloads', parentID: '01' },
  { id: '04', name: 'Music (Locked)', parentID: '01', locked: true }
]);

const handleNodeSelecting = (args) => {
  const nodeData = data.value.find(d => d.id === args.nodeData.id);

  // Prevent selection of read-only nodes
  if (nodeData?.readOnly) {
    args.cancel = true;
    console.log('Cannot select read-only node');
    return;
  }

  // Prevent selection of locked nodes
  if (nodeData?.locked) {
    args.cancel = true;
    console.log('Cannot select locked node');
    return;
  }

  console.log('Selection allowed for:', nodeData?.name);
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowMultiSelection="true"
    @nodeSelecting="handleNodeSelecting"
  />
</template>
```

## Preventing Checks

### nodeChecking Event - Cancel Check Operation

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'System Files', parentID: '01', noCheck: true },
  { id: '03', name: 'Documents', parentID: '01' },
  { id: '04', name: 'Read-Only', parentID: '03', noCheck: true }
]);

const handleNodeChecking = (args) => {
  const nodeData = data.value.find(d => d.id === args.nodeData.id);

  // Prevent checking of protected nodes
  if (nodeData?.noCheck && args.isChecked) {
    args.cancel = true;
    console.log('Cannot check protected node:', nodeData.name);
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :showCheckBox="true"
    @nodeChecking="handleNodeChecking"
  />
</template>
```

### Limit Number of Checked Nodes

```vue
const maxCheckedRef = ref(3);

const handleNodeChecking = (args) => {
  if (!args.isChecked) return; // Allow unchecking

  if (treeviewRef.value) {
    const checkedNodes = treeviewRef.value.checkedNodes || [];
    
    if (checkedNodes.length >= maxCheckedRef.value) {
      args.cancel = true;
      alert(`Maximum ${maxCheckedRef.value} items can be selected`);
    }
  }
};
```

## Full Row Selection

### Enable Full Row Selection

```vue
<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :fullRowSelect="true"
    :allowMultiSelection="true"
  />
</template>

<style scoped>
:deep(.e-treeview .e-full-row) {
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.2s;
}

:deep(.e-treeview .e-list-item.e-selected > .e-full-row) {
  background-color: #E3F2FD;
  border-left: 3px solid #2196F3;
}

:deep(.e-treeview .e-full-row:hover) {
  background-color: #F5F5F5;
}
</style>
```

## Real-World Examples

### Organization Chart with Role Selection

```vue
<script setup>
import { ref } from 'vue';

const orgData = ref([
  { id: '01', name: 'Organization', icon: 'e-icons e-building' },
  { id: '02', name: 'Executive', parentID: '01' },
  { id: '03', name: 'CEO', parentID: '02', role: 'ceo', salary: 250000 },
  { id: '04', name: 'CTO', parentID: '02', role: 'cto', salary: 200000 },
  { id: '05', name: 'Engineering', parentID: '01' },
  { id: '06', name: 'Frontend Lead', parentID: '05', role: 'lead', salary: 150000 },
  { id: '07', name: 'Backend Lead', parentID: '05', role: 'lead', salary: 150000 }
]);

const treeviewRef = ref(null);
const selectedEmployees = ref([]);

const handleNodeSelected = () => {
  if (!treeviewRef.value) return;
  
  const selectedIds = treeviewRef.value.selectedNodes || [];
  const allData = treeviewRef.value.getTreeData();
  
  const employees = [];
  const findEmployee = (nodes) => {
    nodes.forEach(node => {
      if (selectedIds.includes(node.id) && node.role) {
        employees.push(node);
      }
      if (node.child) findEmployee(node.child);
    });
  };
  
  findEmployee(allData);
  selectedEmployees.value = employees;
};

const getTotalSalary = () => {
  return selectedEmployees.value.reduce((sum, emp) => sum + (emp.salary || 0), 0);
};
</script>

<template>
  <div>
    <div class="salary-info">
      <h3>Selected Employees</h3>
      <p>Count: {{ selectedEmployees.length }}</p>
      <p>Total Salary: ${{ getTotalSalary().toLocaleString() }}</p>
    </div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: orgData, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowMultiSelection="true"
      :fullRowSelect="true"
      @nodeSelected="handleNodeSelected"
    />
  </div>
</template>
```

## Troubleshooting

### Issue: Parent nodes not automatically checking children

**Solution:** Ensure `:autoCheck="true"` is enabled

```vue
<ejs-treeview
  :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  :showCheckBox="true"
  :autoCheck="true"  // Enable auto-sync
/>
```

### Issue: Multi-selection not working with Ctrl+Click

**Solution:** Enable `:allowMultiSelection="true"`

```vue
<ejs-treeview
  :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  :allowMultiSelection="true"  // Required for multi-select
/>
```

### Issue: getSelectedNodes() returning empty array

**Solution:** Ensure ref is initialized before calling

```vue
const getSelected = () => {
  if (treeviewRef.value) {
    const selected = treeviewRef.value.selectedNodes;
    console.log('Selected:', selected);
  }
};
```

---

**Key Takeaways:**
- ✅ Single selection by default; use `:allowMultiSelection` for multi-select
- ✅ Enable `:showCheckBox="true"` for checkboxes
- ✅ Use `:autoCheck="true"` for automatic parent-child sync
- ✅ Use `selectNodes()` for programmatic selection
- ✅ Use `checkAll()` / `uncheckAll()` for bulk operations
- ✅ Use events like `@nodeSelecting` and `@nodeChecking` to prevent operations
- ✅ Use `:fullRowSelect="true"` for larger selection area
- ✅ Always check ref exists before calling methods
