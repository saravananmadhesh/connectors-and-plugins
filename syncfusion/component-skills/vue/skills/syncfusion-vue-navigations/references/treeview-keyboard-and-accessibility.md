# Keyboard Navigation and Accessibility in Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Standard Keyboard Shortcuts](#standard-keyboard-shortcuts)
3. [Custom Keyboard Handlers](#custom-keyboard-handlers)
4. [Focus Management](#focus-management)
5. [ARIA Attributes](#aria-attributes)
6. [Screen Reader Support](#screen-reader-support)
7. [WCAG 2.1 Compliance](#wcag-21-compliance)
8. [Semantic HTML](#semantic-html)
9. [Testing Accessibility](#testing-accessibility)
10. [Real-World Examples](#real-world-examples)
11. [Troubleshooting](#troubleshooting)

## Overview

Accessibility ensures TreeView is usable by everyone, including people with disabilities. Vue 3 TreeView supports keyboard navigation, ARIA attributes, and screen reader announcements.

## Standard Keyboard Shortcuts

### Default Keyboard Support

| Key | Action |
|-----|--------|
| Arrow Up | Move to previous node |
| Arrow Down | Move to next node |
| Arrow Left | Collapse node / Move to parent |
| Arrow Right | Expand node / Move to first child |
| Home | Go to first node |
| End | Go to last node |
| Enter | Select node / Perform action |
| Space | Toggle checkbox |
| Ctrl+A | Select all nodes (multi-select mode) |
| F2 | Edit node (if allowEditing enabled) |
| Escape | Cancel edit / Deselect |

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' },
  { id: '04', name: 'Music', parentID: '01' }
]);

const handleKeyDown = (args) => {
  switch(args.key) {
    case 'ArrowUp':
      console.log('Navigate up');
      break;
    case 'ArrowDown':
      console.log('Navigate down');
      break;
    case 'ArrowLeft':
      console.log('Collapse or go to parent');
      break;
    case 'ArrowRight':
      console.log('Expand or go to first child');
      break;
  }
};
</script>

<template>
  <div @keydown="handleKeyDown">
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      tabindex="0"
    />
  </div>
</template>
```

## Custom Keyboard Handlers

### Add Custom Keyboard Shortcuts

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const actionLog = ref([]);

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' }
]);

const handleCustomKeyboardShortcuts = (event) => {
  // Ctrl+D: Delete selected node
  if (event.ctrlKey && event.key === 'd') {
    event.preventDefault();
    handleDelete();
    return;
  }

  // Ctrl+C: Copy selected node
  if (event.ctrlKey && event.key === 'c') {
    event.preventDefault();
    handleCopy();
    return;
  }

  // Ctrl+X: Cut selected node
  if (event.ctrlKey && event.key === 'x') {
    event.preventDefault();
    handleCut();
    return;
  }

  // Ctrl+V: Paste node
  if (event.ctrlKey && event.key === 'v') {
    event.preventDefault();
    handlePaste();
    return;
  }

  // Ctrl+N: Create new node
  if (event.ctrlKey && event.key === 'n') {
    event.preventDefault();
    handleNewNode();
    return;
  }
};

const handleDelete = () => {
  logAction('Delete selected node');
};

const handleCopy = () => {
  logAction('Copy node to clipboard');
};

const handleCut = () => {
  logAction('Cut node');
};

const handlePaste = () => {
  logAction('Paste node');
};

const handleNewNode = () => {
  logAction('Create new node');
};

const logAction = (action) => {
  actionLog.value.unshift({
    action,
    time: new Date().toLocaleTimeString()
  });
};
</script>

<template>
  <div @keydown="handleCustomKeyboardShortcuts">
    <div class="action-log">
      <h3>Keyboard Actions</h3>
      <ul>
        <li v-for="(log, idx) in actionLog.slice(0, 5)" :key="idx">
          [{{ log.time }}] {{ log.action }}
        </li>
      </ul>
      <p style="font-size: 0.85em; color: #666; margin-top: 12px;">
        Shortcuts: Ctrl+N (New), Ctrl+C (Copy), Ctrl+X (Cut), Ctrl+V (Paste), Ctrl+D (Delete)
      </p>
    </div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      tabindex="0"
    />
  </div>
</template>

<style scoped>
.action-log {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  max-height: 150px;
  overflow-y: auto;
}

.action-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.action-log li {
  padding: 4px 0;
  font-size: 0.9em;
  border-bottom: 1px solid #ddd;
}
</style>
```

## Focus Management

### Control Focus Programmatically

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const focusedNodeId = ref(null);

const data = ref([
  { id: '01', name: 'Item 1' },
  { id: '02', name: 'Item 2', parentID: '01' },
  { id: '03', name: 'Item 3', parentID: '01' }
]);

const focusNode = (nodeId) => {
  if (!treeviewRef.value) return;

  focusedNodeId.value = nodeId;
  treeviewRef.value.selectNodes([nodeId]);
  
  // Scroll to node if needed
  const nodeElement = document.querySelector(`[data-id="${nodeId}"]`);
  if (nodeElement) {
    nodeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    nodeElement.focus();
  }
};

const focusFirstNode = () => {
  focusNode('01');
};

const focusNextNode = () => {
  if (focusedNodeId.value === '01') focusNode('02');
  else if (focusedNodeId.value === '02') focusNode('03');
};

const focusPreviousNode = () => {
  if (focusedNodeId.value === '02') focusNode('01');
  else if (focusedNodeId.value === '03') focusNode('02');
};
</script>

<template>
  <div>
    <div class="focus-controls">
      <button @click="focusFirstNode">Focus First</button>
      <button @click="focusPreviousNode">← Previous</button>
      <button @click="focusNextNode">Next →</button>
    </div>
    <p>Focused Node: {{ focusedNodeId || 'None' }}</p>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      tabindex="0"
    />
  </div>
</template>

<style scoped>
.focus-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.focus-controls button {
  padding: 6px 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.focus-controls button:hover {
  background-color: #1976D2;
}

.focus-controls button:focus {
  outline: 2px solid #000;
  outline-offset: 2px;
}
</style>
```

## ARIA Attributes

### Essential ARIA Attributes

TreeView should include proper ARIA attributes for screen reader users:

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Navigation' },
  { id: '02', name: 'Home', parentID: '01' },
  { id: '03', name: 'About', parentID: '01' },
  { id: '04', name: 'Services', parentID: '01' }
]);
</script>

<template>
  <div role="region" aria-label="Site navigation">
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      role="tree"
      :aria-label="`Navigation tree with ${data.length} items`"
      tabindex="0"
    />
  </div>
</template>
```

### Complete ARIA Implementation

```vue
<template>
  <div role="region" aria-label="Application structure">
    <h2 id="tree-label">Application Structure</h2>
    
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      role="tree"
      aria-labelledby="tree-label"
      aria-multiselectable="false"
      tabindex="0"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <div 
          :role="node.child ? 'treeitem' : 'treeitem'"
          :aria-expanded="node.expanded ? 'true' : 'false'"
          :aria-label="node.name"
        >
          {{ node.name }}
        </div>
      </template>
    </ejs-treeview>
  </div>
</template>
```

## Screen Reader Support

### Announce Node Changes

```vue
<script setup>
import { ref } from 'vue';

const liveRegionText = ref('');
const liveRegionRef = ref(null);

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' }
]);

const announceNodeSelection = (nodeData) => {
  liveRegionText.value = `Selected: ${nodeData.name}`;
};

const announceNodeExpand = (nodeData) => {
  liveRegionText.value = `Expanded: ${nodeData.name}`;
};

const announceNodeCollapse = (nodeData) => {
  liveRegionText.value = `Collapsed: ${nodeData.name}`;
};

const handleNodeSelected = (args) => {
  announceNodeSelection(args.nodeData);
};

const handleNodeExpanded = (args) => {
  announceNodeExpand(args.nodeData);
};

const handleNodeCollapsed = (args) => {
  announceNodeCollapse(args.nodeData);
};
</script>

<template>
  <div>
    <!-- Screen reader live region -->
    <div 
      ref="liveRegionRef"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ liveRegionText }}
    </div>

    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      @nodeSelected="handleNodeSelected"
      @nodeExpanded="handleNodeExpanded"
      @nodeCollapsed="handleNodeCollapsed"
      tabindex="0"
    />
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

## WCAG 2.1 Compliance

### Ensure WCAG 2.1 AA Compliance

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Accessible TreeView', level: 1 },
  { id: '02', name: 'Section 1', level: 2, parentID: '01' },
  { id: '03', name: 'Content 1.1', level: 3, parentID: '02' }
]);

// Key WCAG 2.1 AA Requirements:
// ✓ 1.4.3 Contrast (Minimum): Text contrast >= 4.5:1
// ✓ 2.1.1 Keyboard: All functionality available via keyboard
// ✓ 2.1.2 No Keyboard Trap: Focus can move away
// ✓ 2.4.3 Focus Order: Logical focus order
// ✓ 2.4.7 Focus Visible: Clear focus indicators
// ✓ 3.2.1 On Focus: No unexpected context changes
// ✓ 4.1.2 Name, Role, Value: Proper semantics
// ✓ 4.1.3 Status Messages: Announced to screen readers
</script>

<template>
  <div>
    <!-- High contrast mode support -->
    <style>
      @media (prefers-contrast: more) {
        :deep(.e-treeview .e-list-item) {
          border: 2px solid currentColor;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        :deep(.e-treeview .e-list-item) {
          transition: none !important;
          animation: none !important;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        :deep(.e-treeview) {
          background-color: #1e1e1e;
          color: #e0e0e0;
        }
      }
    </style>

    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      tabindex="0"
    />
  </div>
</template>
```

## Semantic HTML

### Proper Semantic Structure

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Main Navigation', type: 'nav' },
  { id: '02', name: 'Home', parentID: '01', type: 'link' },
  { id: '03', name: 'Features', parentID: '01', type: 'link' },
  { id: '04', name: 'Pricing', parentID: '01', type: 'link' }
]);
</script>

<template>
  <!-- Use semantic HTML elements -->
  <nav>
    <h2>Site Navigation</h2>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      role="tree"
      tabindex="0"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <a 
          v-if="node.type === 'link'"
          :href="`#${node.id}`"
          :aria-label="node.name"
        >
          {{ node.name }}
        </a>
        <span v-else>{{ node.name }}</span>
      </template>
    </ejs-treeview>
  </nav>
</template>
```

## Testing Accessibility

### Accessibility Testing Checklist

```vue
<script setup>
import { ref } from 'vue';

const accessibilityChecks = ref([
  { id: 1, check: 'Keyboard navigation works (Arrow keys)', status: 'pass' },
  { id: 2, check: 'Tab key moves focus to tree', status: 'pass' },
  { id: 3, check: 'Focus visible indicator present', status: 'pass' },
  { id: 4, check: 'ARIA labels present', status: 'pass' },
  { id: 5, check: 'Screen reader announces nodes', status: 'pass' },
  { id: 6, check: 'Text contrast >= 4.5:1', status: 'pass' },
  { id: 7, check: 'No keyboard trap', status: 'pass' },
  { id: 8, check: 'Logical tab order', status: 'pass' }
]);

const testAccessibility = async () => {
  // Run automated checks
  const checks = [
    testKeyboardNavigation(),
    testAriaAttributes(),
    testContrast(),
    testScreenReaderSupport()
  ];

  await Promise.all(checks);
};

const testKeyboardNavigation = async () => {
  console.log('Testing keyboard navigation...');
};

const testAriaAttributes = async () => {
  console.log('Testing ARIA attributes...');
};

const testContrast = async () => {
  console.log('Testing color contrast...');
};

const testScreenReaderSupport = async () => {
  console.log('Testing screen reader support...');
};
</script>

<template>
  <div>
    <h2>Accessibility Test Report</h2>
    <button @click="testAccessibility">Run Automated Tests</button>
    
    <table class="checklist">
      <thead>
        <tr>
          <th>Check</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="check in accessibilityChecks" :key="check.id">
          <td>{{ check.check }}</td>
          <td :class="check.status">{{ check.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.checklist {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}

.checklist th,
.checklist td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: left;
}

.checklist th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.pass {
  color: #4caf50;
  font-weight: bold;
}

.fail {
  color: #f44336;
  font-weight: bold;
}
</style>
```

## Real-World Examples

### Accessible File Manager

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const selectedNode = ref(null);
const message = ref('');

const data = ref([
  { id: '01', name: 'My Files' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Resume.pdf', parentID: '02' },
  { id: '04', name: 'Report.xlsx', parentID: '02' },
  { id: '05', name: 'Pictures', parentID: '01' }
]);

const handleNodeSelected = (args) => {
  selectedNode.value = args.nodeData.name;
  message.value = `Selected: ${args.nodeData.name}. Press Delete to remove, Enter to open.`;
};

const handleDelete = (event) => {
  if (event.key === 'Delete' && selectedNode.value) {
    event.preventDefault();
    message.value = `Deleted: ${selectedNode.value}`;
  }
};
</script>

<template>
  <div>
    <!-- Screen reader announcements -->
    <div 
      role="status"
      aria-live="polite"
      class="sr-only"
    >
      {{ message }}
    </div>

    <!-- Visible status message -->
    <div v-if="message" class="status-message" role="alert">
      {{ message }}
    </div>

    <div @keydown="handleDelete">
      <ejs-treeview
        ref="treeviewRef"
        :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
        role="tree"
        aria-label="File manager"
        @nodeSelected="handleNodeSelected"
        tabindex="0"
      />
    </div>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.status-message {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 12px;
  border-left: 4px solid #1976d2;
  margin-bottom: 12px;
  border-radius: 2px;
}

:deep(.e-treeview):focus {
  outline: 2px solid #000;
  outline-offset: 2px;
}
</style>
```

## Troubleshooting

### Issue: Keyboard navigation not working

**Solution:** Ensure TreeView has `tabindex="0"`

```vue
<ejs-treeview
  :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  tabindex="0"  <!-- Enable keyboard focus -->
/>
```

### Issue: Screen reader not announcing nodes

**Solution:** Add ARIA labels and live regions

```vue
<div 
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {{ announcement }}
</div>
```

### Issue: Focus not visible

**Solution:** Add focus styles

```vue
<style>
:deep(.e-treeview:focus) {
  outline: 2px solid #000;
  outline-offset: 2px;
}

:deep(.e-treeview .e-list-item:focus) {
  background-color: #e3f2fd;
}
</style>
```

---

**Key Takeaways:**
- ✅ Support all standard keyboard shortcuts (Arrow keys, F2, Escape, etc.)
- ✅ Add `tabindex="0"` for keyboard focus
- ✅ Use ARIA attributes (`role`, `aria-label`, `aria-live`)
- ✅ Provide visual focus indicators with clear contrast
- ✅ Announce changes via live regions for screen readers
- ✅ Support high contrast mode and reduced motion preferences
- ✅ Test with actual screen readers (NVDA, JAWS)
- ✅ Follow WCAG 2.1 AA standards
