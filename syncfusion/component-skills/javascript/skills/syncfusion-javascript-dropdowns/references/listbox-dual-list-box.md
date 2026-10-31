# Dual ListBox (Transfer List) in JavaScript ListBox

## Table of Contents
- [Overview](#overview)
- [Basic Dual ListBox](#basic-dual-listbox)
- [Toolbar Operations](#toolbar-operations)
- [Programmatic Transfer with Methods](#programmatic-transfer-with-methods)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Dual ListBox lets users transfer items between two list boxes using toolbar buttons. It suits:
- Available vs. selected items interfaces
- Permission management (available → granted)
- Skill or role assignment (all skills → assigned)
- Data source migration (source → destination)

### Available Toolbar Operations

| Tool | Description |
|---|---|
| `moveUp` | Move selected item one position up within the same list |
| `moveDown` | Move selected item one position down within the same list |
| `moveTo` | Move selected item(s) to the scoped target ListBox |
| `moveFrom` | Move selected item(s) from the scoped target ListBox |
| `moveAllTo` | Move all items to the scoped target ListBox |
| `moveAllFrom` | Move all items from the scoped target ListBox |

---

## Basic Dual ListBox

Wire two ListBox instances using the `scope` property. The ListBox that owns the `toolbarSettings` renders the toolbar between them.

```html
<!-- index.html -->
<div id="listbox-1"></div>
<div id="listbox-2"></div>
```

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const groupA: { [key: string]: Object }[] = [
  { Name: 'Australia', Code: 'AU' },
  { Name: 'Bermuda', Code: 'BM' },
  { Name: 'Canada', Code: 'CA' },
  { Name: 'Cameroon', Code: 'CM' },
  { Name: 'Denmark', Code: 'DK' }
];

const groupB: { [key: string]: Object }[] = [
  { Name: 'India', Code: 'IN' },
  { Name: 'Italy', Code: 'IT' },
  { Name: 'Japan', Code: 'JP' },
  { Name: 'Mexico', Code: 'MX' }
];

const fields: Object = { text: 'Name' };

// Source ListBox owns the toolbar and knows the target by id
const listBox1: ListBox = new ListBox({
  dataSource: groupA,
  fields: fields,
  scope: '#listbox-2',
  toolbarSettings: {
    items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom']
  }
});

// Target ListBox — no toolbar needed
const listBox2: ListBox = new ListBox({
  dataSource: groupB,
  fields: fields
});

listBox1.appendTo('#listbox-1');
listBox2.appendTo('#listbox-2');
```

### With Custom Heights

```ts
const listBox1: ListBox = new ListBox({
  dataSource: availableItems,
  fields: { text: 'text', value: 'id' },
  scope: '#listbox-target',
  toolbarSettings: { items: ['moveTo', 'moveFrom'] },
  height: '300px'
});

const listBox2: ListBox = new ListBox({
  dataSource: selectedItems,
  fields: { text: 'text', value: 'id' },
  height: '300px'
});

listBox1.appendTo('#listbox-source');
listBox2.appendTo('#listbox-target');
```

---

## Toolbar Operations

### Reorder Only (No Transfer)

Use `moveUp` / `moveDown` to let users re-prioritize items within the same list:

```ts
const listBox: ListBox = new ListBox({
  dataSource: priorityItems,
  fields: { text: 'text', value: 'id' },
  toolbarSettings: {
    items: ['moveUp', 'moveDown']
  }
});

listBox.appendTo('#priority-list');
```

### One-Direction Transfer (To Only)

Allow items to move from source to target but not back:

```ts
const listBox1: ListBox = new ListBox({
  dataSource: availableItems,
  fields: { text: 'text', value: 'id' },
  scope: '#target',
  toolbarSettings: {
    items: ['moveTo', 'moveAllTo']  // No moveFrom / moveAllFrom
  }
});

listBox1.appendTo('#source');
```

### Bidirectional Transfer with Reordering

Full toolbar for both transfer and reordering:

```ts
toolbarSettings: {
  items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom']
}
```

### Toolbar Position

Place the toolbar on the left side of the ListBox:

```ts
const listBox1: ListBox = new ListBox({
  dataSource: groupA,
  fields: fields,
  scope: '#listbox-2',
  toolbarSettings: {
    items: ['moveTo', 'moveFrom'],
    position: 'Left'  // Default is 'Right'
  }
});
```

---

## Programmatic Transfer with Methods

Transfer items without user interaction using the public API:

### Move Selected Items to Target

```ts
// Move currently selected items from listBox1 to listBox2
listBox1.moveTo(undefined, undefined, '#listbox-2');
```

### Move by Specific Values

```ts
// Move items with values '1' and '3' from listBox1 to listBox2
listBox1.moveTo(['1', '3'], 0, '#listbox-2');
```

### Move All Items

```ts
// Move all items from listBox1 to listBox2
listBox1.moveAllTo('#listbox-2');
```

### Reorder Programmatically

```ts
// Move selected items one position up
listBox1.moveUp();

// Move to the top of the list
listBox1.moveTop();

// Move selected items one position down
listBox1.moveDown();

// Move to the bottom of the list
listBox1.moveBottom();
```

---

## Advanced Patterns

### Read Current Items After Transfer

Use `getDataList()` to retrieve the updated data in each ListBox after transfers:

```ts
document.getElementById('getBtn')!.addEventListener('click', () => {
  const sourceItems = listBox1.getDataList();
  const targetItems = listBox2.getDataList();

  console.log('Remaining in source:', sourceItems);
  console.log('Items in target:', targetItems);
});
```

### Permission Assignment Pattern

```html
<div id="available-permissions"></div>
<div id="granted-permissions"></div>
```

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const allPermissions: { [key: string]: Object }[] = [
  { text: 'Read', id: 'read' },
  { text: 'Write', id: 'write' },
  { text: 'Delete', id: 'delete' },
  { text: 'Admin', id: 'admin' }
];

const grantedPermissions: { [key: string]: Object }[] = [
  { text: 'Read', id: 'read' }
];

const available: ListBox = new ListBox({
  dataSource: allPermissions.filter(p => !grantedPermissions.find(g => g['id'] === p['id'])),
  fields: { text: 'text', value: 'id' },
  scope: '#granted-permissions',
  toolbarSettings: {
    items: ['moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom']
  }
});

const granted: ListBox = new ListBox({
  dataSource: grantedPermissions,
  fields: { text: 'text', value: 'id' }
});

available.appendTo('#available-permissions');
granted.appendTo('#granted-permissions');
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Toolbar buttons not visible | `scope` not set on source ListBox | Add `scope: '#target-id'` to the source ListBox |
| Transfer does not work | Mismatched `scope` and element `id` | Ensure `scope` value matches the DOM element `id` with `#` prefix |
| Items disappear after transfer | DOM element missing for target | Verify the target `<div id="...">` exists in HTML |
| `moveAllTo` moves wrong list | Toolbar on wrong instance | Only the ListBox with `toolbarSettings` should have `scope` |
