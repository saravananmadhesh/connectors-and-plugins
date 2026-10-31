# Checkbox Features in Dropdown Tree

## Table of Contents
- [Overview](#overview)
- [Enable Checkboxes](#enable-checkboxes)
- [Single Item Selection](#single-item-selection)
- [Multiple Selection with Checkboxes](#multiple-selection-with-checkboxes)
- [Auto-Check Behavior](#auto-check-behavior)
- [Select All Feature](#select-all-feature)
- [Managing Selected Items](#managing-selected-items)

---

## Overview

By default, the Dropdown Tree supports single selection mode. To enable multiple selection without affecting the UI appearance, use the checkbox feature. Checkboxes appear before each item text in the popup, allowing users to select multiple items independently or with parent-child dependencies.

**Benefits of Checkbox Selection:**
- Multi-select without expanding the UI
- Optional automatic parent-child synchronization
- Select All option in header for bulk selection
- Clean visual design compared to multi-level expansion

---

## Enable Checkboxes

### Basic Setup

To display checkboxes, enable the `showCheckBox` property:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let localData = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 6, pid: 1, name: 'Best of 2017 So Far' },
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - $5 Each' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    { id: 10, pid: 7, name: 'CD Deals' },
    { id: 11, name: 'Categories', hasChild: true },
    { id: 12, pid: 11, name: 'Songs' },
    { id: 13, pid: 11, name: 'Bestselling Albums' },
    { id: 14, pid: 11, name: 'New Releases' },
    { id: 15, pid: 11, name: 'Bestselling Songs' }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild'
    },
    showCheckBox: true  // Enable checkboxes
});

dropDownTree.appendTo('#ddtElement');
```

**Result**: Each item now displays a checkbox that users can check/uncheck independently.

### Visual Appearance

```
▼ Discover Music         ← Parent with expand icon
  ☐ Hot Singles          ← Unchecked child
  ☑ Rising Artists       ← Checked child
  ☐ Live Music
  ☐ Best of 2017 So Far
▼ Sales and Events
  ☐ 100 Albums - $5 Each
  ...
```

---

## Single Item Selection

Even with checkboxes enabled, you can restrict selection to one item at a time:

```typescript
let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid'
    },
    showCheckBox: true,
    allowMultiSelection: false  // Only one item can be checked
});

dropDownTree.appendTo('#ddtElement');
```

**Behavior**: 
- Checkboxes are displayed
- Only one item can be checked at a time
- Checking a new item unchecks the previously selected item

---

## Multiple Selection with Checkboxes

### Independent Selection (No Auto-Check)

By default, checkboxes are independent - selecting a parent doesn't select children:

```typescript
let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild'
    },
    showCheckBox: true
    // treeSettings: { autoCheck: false }  ← Default behavior
});

dropDownTree.appendTo('#ddtElement');
```

**Example Flow:**
1. User checks "Discover Music" (parent)
2. Only "Discover Music" is selected
3. Child items (Hot Singles, Rising Artists, etc.) remain unchecked
4. Parent status doesn't reflect child selections

---

## Auto-Check Behavior

### Enable Parent-Child Dependency

Enable `autoCheck` in `treeSettings` to automatically synchronize parent and child checkbox states:

```typescript
let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild'
    },
    showCheckBox: true,
    treeSettings: {
        autoCheck: true  // Enable auto-check propagation
    }
});

dropDownTree.appendTo('#ddtElement');
```

### Auto-Check Rules

**When a parent is checked:**
- All child items are automatically checked
- Grandchildren are automatically checked (recursively)

**When a parent is unchecked:**
- All child items are automatically unchecked
- Grandchildren are automatically unchecked (recursively)

**When children are checked:**
- Parent remains unchecked until ALL children are checked
- If ALL children are checked, parent becomes checked
- If SOME children are checked, parent shows intermediate state (◐)

**When children are unchecked:**
- Parent is updated: fully unchecked (☐) or intermediate (◐)

### Example Workflow

Starting state: All unchecked
```
☐ Discover Music
  ☐ Hot Singles
  ☐ Rising Artists
  ☐ Live Music
```

User checks "Hot Singles":
```
◐ Discover Music        ← Intermediate: some children checked
  ☑ Hot Singles         ← Checked
  ☐ Rising Artists
  ☐ Live Music
```

User checks "Live Music":
```
◐ Discover Music        ← Still intermediate: not all children checked
  ☑ Hot Singles
  ☐ Rising Artists
  ☑ Live Music
```

User checks "Discover Music" (parent):
```
☑ Discover Music        ← All children automatically checked
  ☑ Hot Singles
  ☑ Rising Artists
  ☑ Live Music
```

---

## Select All Feature

### Enable Select All Option

Add a checkbox in the popup header to select/deselect all tree items:

```typescript
let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid'
    },
    showCheckBox: true,
    showSelectAll: true  // Show Select All in header
});

dropDownTree.appendTo('#ddtElement');
```

**Result**: A "Select All" checkbox appears in the popup header above the tree items.

### Customize Select All Text

Change the labels for Select All/Deselect All actions:

```typescript
let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid'
    },
    showCheckBox: true,
    showSelectAll: true,
    selectAllText: 'Select All Items',      // Custom Select All label
    unSelectAllText: 'Deselect All Items'   // Custom Deselect All label
});

dropDownTree.appendTo('#ddtElement');
```

### Select All Behavior

**Checking Select All:**
- All visible items in the tree are checked
- Parent-child auto-check rules apply if enabled
- Select All checkbox becomes checked

**Unchecking Select All:**
- All visible items are unchecked
- Select All checkbox becomes unchecked

**Partial Selection:**
- If some (but not all) items are checked, Select All shows intermediate state (◐)

---

## Managing Selected Items

### Get Selected Values

Retrieve the values of all checked items:

```typescript
let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid'
    },
    showCheckBox: true
});

dropDownTree.appendTo('#ddtElement');

// Get selected values
let selectedValues = dropDownTree.value;  // Array of selected values
console.log('Selected:', selectedValues);  // [1, 3, 8]
```

### Get Selected Items with Text

Retrieve both values and display text for selected items:

```typescript
// Get raw checked items
let checkedItems = dropDownTree.getCheckedNodes();
console.log('Checked Items:', checkedItems);
// Output: ['1', '3', '8']  (based on data IDs)

// Get full item objects (if using custom accessor)
dropDownTree.getItemData(checkedItems[0]);  // Returns full data object
```

### Pre-Select Items on Initialization

Mark items as selected when creating the control:

```typescript
let localData = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles', selected: true },  // Pre-selected
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music', selected: true },   // Pre-selected
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - $5 Each' }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        selected: 'selected'  // Map selected field
    },
    showCheckBox: true
});

dropDownTree.appendTo('#ddtElement');
// Result: Hot Singles and Live Music are checked on load
```

### Programmatically Check/Uncheck Items

Modify selected items via API:

```typescript
let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id'
    },
    showCheckBox: true
});

dropDownTree.appendTo('#ddtElement');

// Check specific items
dropDownTree.checkAll(['1', '3', '8']);

// Uncheck specific items
dropDownTree.unCheckAll(['1']);

// Check all items
dropDownTree.checkAll();

// Uncheck all items
dropDownTree.unCheckAll();
```

### Listen to Selection Changes

Handle events when items are checked/unchecked:

```typescript
let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid'
    },
    showCheckBox: true,
    change: function(args) {
        console.log('Selection changed');
        console.log('Selected values:', this.value);
        console.log('Item text:', args.itemData?.name);
    }
});

dropDownTree.appendTo('#ddtElement');
```

---

## Practical Examples

### Example 1: Course Registration

Allow students to select courses with prerequisites:

```typescript
let courses = [
    { id: 1, name: 'Mathematics', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Algebra 101' },
    { id: 3, pid: 1, name: 'Geometry 102' },
    { id: 4, name: 'Science', hasChild: true },
    { id: 5, pid: 4, name: 'Physics 201' },
    { id: 6, pid: 4, name: 'Chemistry 202' }
];

let dropDownTree = new DropDownTree({
    fields: { dataSource: courses, id: 'id', text: 'name', value: 'id', parentValue: 'pid' },
    showCheckBox: true,
    showSelectAll: false,  // Don't allow bulk select in educational context
    placeholder: 'Select courses'
});

dropDownTree.appendTo('#courseSelector');
```

### Example 2: Permission Management

Select user permissions with hierarchical grouping:

```typescript
let permissions = [
    { id: 1, name: 'Admin', hasChild: true },
    { id: 2, pid: 1, name: 'Manage Users' },
    { id: 3, pid: 1, name: 'View Logs' },
    { id: 4, name: 'User', hasChild: true },
    { id: 5, pid: 4, name: 'Edit Profile' },
    { id: 6, pid: 4, name: 'View Dashboard' }
];

let dropDownTree = new DropDownTree({
    fields: { dataSource: permissions, id: 'id', text: 'name', value: 'id', parentValue: 'pid' },
    showCheckBox: true,
    treeSettings: { autoCheck: true },  // Parent checked = all permissions granted
    showSelectAll: true,
    placeholder: 'Assign permissions'
});

dropDownTree.appendTo('#permissionSelector');
```

### Example 3: Multi-Select List Items

Simple multi-select with all independent selections:

```typescript
let items = [
    { id: 1, name: 'Option A' },
    { id: 2, name: 'Option B' },
    { id: 3, name: 'Option C' },
    { id: 4, name: 'Option D' }
];

let dropDownTree = new DropDownTree({
    fields: { dataSource: items, id: 'id', text: 'name', value: 'id' },
    showCheckBox: true,
    showSelectAll: true,
    placeholder: 'Select items'
});

dropDownTree.appendTo('#multiSelect');
```

---

## Best Practices

1. **Use Auto-Check for hierarchical data** where parent-child relationships are meaningful (org charts, categories)
2. **Use independent checkboxes** for flat lists or unrelated selections
3. **Enable Select All** when users frequently need to select all or most items
4. **Label clearly** - customize selectAllText/unSelectAllText to match your domain
5. **Consider keyboard navigation** - users can use Space to toggle checkboxes when items are focused
6. **Test parent-child interactions** - verify auto-check works correctly with your data structure
