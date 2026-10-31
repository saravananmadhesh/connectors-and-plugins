# How-To Guides for JavaScript ListBox

## Table of Contents
- [Add Items Programmatically](#add-items-programmatically)
- [Remove Items Programmatically](#remove-items-programmatically)
- [Select Items Programmatically](#select-items-programmatically)
- [Enable or Disable Items](#enable-or-disable-items)
- [Custom Filter Logic](#custom-filter-logic)
- [Fixed Height with Scroll](#fixed-height-with-scroll)
- [Form Integration](#form-integration)
- [Troubleshooting](#troubleshooting)

---

## Add Items Programmatically

### Add a Single Item

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: [
    { text: 'JavaScript', id: '1' },
    { text: 'React', id: '2' }
  ],
  fields: { text: 'text', value: 'id' }
});

listBox.appendTo('#listbox');

// Add one item after render
document.getElementById('addBtn')!.addEventListener('click', () => {
  listBox.addItems([{ text: 'Vue', id: '3' }]);
});
```

### Add Multiple Items

```ts
listBox.addItems([
  { text: 'Angular', id: '4' },
  { text: 'Svelte', id: '5' }
]);
```

### Add Item at a Specific Index

```ts
// Insert 'TypeScript' at position 1 (0-based)
listBox.addItems([{ text: 'TypeScript', id: '6' }], 1);
```

### Prevent Duplicate Items

```ts
function addUniqueItem(listBox: ListBox, newItem: { [key: string]: Object }): void {
  const existing = listBox.getDataList() as { [key: string]: Object }[];
  const isDuplicate = existing.some(item => item['id'] === newItem['id']);
  if (!isDuplicate) {
    listBox.addItems([newItem]);
  } else {
    console.warn('Item already exists:', newItem['text']);
  }
}

addUniqueItem(listBox, { text: 'React', id: '2' }); // Blocked — duplicate
addUniqueItem(listBox, { text: 'Ember', id: '7' });  // Added
```

---

## Remove Items Programmatically

### Remove by Value

```ts
listBox.removeItem({ id: '2' }, 1);  // Remove item with id '2'
```

### Remove Multiple Items by Value

```ts
listBox.removeItems([
  { id: '2' },
  { id: '4' }
]);
```

---

## Select Items Programmatically

### Select Items by Text

```ts
// Select items with text 'JavaScript' and 'React'
listBox.selectItems(['JavaScript', 'React']);
```

### Pre-select via the `value` Property

Set the `value` property at initialization to pre-select items:

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  value: ['1', '3']  // Pre-selects items with id '1' and '3'
});

listBox.appendTo('#listbox');
```

### Select All Items

```ts
listBox.selectAll(true);   // Select all
listBox.selectAll(false);  // Deselect all
```

### Get Selected Items

```ts
const selectedValues: string[] = listBox.value as string[];
const selectedData = listBox.getDataByValues(selectedValues);
console.log('Selected items:', selectedData);
```

---

## Enable or Disable Items

### Disable Items by Text

```ts
// Disable items with text 'Ember' and 'Svelte'
listBox.enableItems(['Ember', 'Svelte'], false);
```

### Enable Items Again

```ts
listBox.enableItems(['Ember', 'Svelte'], true);
```

### Disable Items via Data Property

Set `disabled: true` in the data and map via `fields.disabled`:

```ts
const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1', isDisabled: false },
  { text: 'Legacy Framework', id: '2', isDisabled: true }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: {
    text: 'text',
    value: 'id',
    disabled: 'isDisabled'
  }
});

listBox.appendTo('#listbox');
```

---

## Custom Filter Logic

### Filter with a Custom Predicate

Use the `filtering` event to intercept and customize filtering:

```ts
import { ListBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1', category: 'frontend' },
  { text: 'Python', id: '2', category: 'backend' },
  { text: 'React', id: '3', category: 'frontend' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  allowFiltering: true,
  filtering: (args: FilteringEventArgs) => {
    // Filter by text AND only show frontend items
    const query = new Query().where('text', 'contains', args.text, true)
                             .where('category', 'equal', 'frontend');
    args.updateData(data, query);
  }
});

listBox.appendTo('#listbox');
```

### Programmatic Filter

Call `filter()` to apply filtering without user input:

```ts
// Show only items whose text contains 'script'
listBox.filter(
  listBox.dataSource as { [key: string]: Object }[],
  new Query().where('text', 'contains', 'script', true),
  { text: 'text', value: 'id' }
);
```

---

## Fixed Height with Scroll

Set a fixed `height` to add a scrollbar for long lists:

```ts
const listBox: ListBox = new ListBox({
  dataSource: largeDataArray,
  fields: { text: 'text', value: 'id' },
  height: '300px'   // Vertical scroll appears automatically when items overflow
});

listBox.appendTo('#listbox');
```

---

## Form Integration

Retrieve selected items on form submit using `getDataList()` and `value`:

```html
<form id="my-form">
  <div id="frameworks-listbox"></div>
  <button type="submit">Submit</button>
</form>
```

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: frameworksData,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { mode: 'Multiple' }
});

listBox.appendTo('#frameworks-listbox');

document.getElementById('my-form')!.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const selectedValues = listBox.value as string[];
  const selectedItems = listBox.getDataByValues(selectedValues);

  console.log('Selected values:', selectedValues);
  console.log('Selected items:', selectedItems);

  // Send to server or update state
});
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| `addItems` does not update UI | Using `dataSource` push directly | Always use `listBox.addItems([...])` to trigger re-render |
| `selectItems` not working | Items not present in data | Ensure item text/value matches exactly (case-sensitive) |
| `enableItems` has no effect | Incorrect item text | Verify item text matches the `fields.text` value exactly |
| Filter clears on blur | `allowFiltering` cleared | Use the `filtering` event with `args.updateData` to preserve state |
| Form gets stale values | Reading raw DOM instead of API | Always use `listBox.value` or `listBox.getDataByValues()` on form submit |
