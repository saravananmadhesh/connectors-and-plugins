# Selection in JavaScript ListBox

## Table of Contents
- [Single Selection](#single-selection)
- [Multiple Selection](#multiple-selection)
- [Checkbox Selection](#checkbox-selection)
- [Programmatic Selection](#programmatic-selection)
- [Getting Selected Items](#getting-selected-items)
- [Disabling Items](#disabling-items)
- [Troubleshooting](#troubleshooting)

---

## Single Selection

Single selection allows the user to pick one item at a time. Set `selectionSettings.mode` to `'Single'`:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1' },
  { text: 'TypeScript', id: '2' },
  { text: 'React', id: '3' },
  { text: 'Vue', id: '4' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { mode: 'Single' }
});

listBox.appendTo('#listbox');
```

### Pre-select an Item on Load

Set `value` in the model to pre-select a specific item:

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { mode: 'Single' },
  value: ['2']  // Pre-selects TypeScript (id = '2')
});

listBox.appendTo('#listbox');
```

---

## Multiple Selection

Multiple selection allows Ctrl+Click or Shift+Click to select multiple items. Default `mode` is `'Multiple'`:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'HTML', id: '1' },
  { text: 'CSS', id: '2' },
  { text: 'JavaScript', id: '3' },
  { text: 'TypeScript', id: '4' },
  { text: 'React', id: '5' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { mode: 'Multiple' }
});

listBox.appendTo('#listbox');
```

### Pre-select Multiple Items

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { mode: 'Multiple' },
  value: ['2', '4', '5']  // Pre-selects CSS, TypeScript, and React
});

listBox.appendTo('#listbox');
```

### Limit Maximum Selection Count

Use `maximumSelectionLength` to cap how many items can be selected:

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { mode: 'Multiple' },
  maximumSelectionLength: 3  // User can select at most 3 items
});

listBox.appendTo('#listbox');
```

---

## Checkbox Selection

Checkbox selection renders a checkbox beside each item. **You must inject the `CheckBoxSelection` module** before instantiating the ListBox, otherwise checkboxes will not appear.

### Basic Checkbox Selection

```ts
import { ListBox, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

// Inject the module — required for checkbox support
ListBox.Inject(CheckBoxSelection);

const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1' },
  { text: 'TypeScript', id: '2' },
  { text: 'React', id: '3' },
  { text: 'Vue', id: '4' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { showCheckbox: true }
});

listBox.appendTo('#listbox');
```

### Checkbox Selection with "Select All"

```ts
import { ListBox, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

ListBox.Inject(CheckBoxSelection);

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: {
    showCheckbox: true,
    showSelectAll: true
  }
});

listBox.appendTo('#listbox');
```

### Checkbox with Change Event

```ts
import { ListBox, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

ListBox.Inject(CheckBoxSelection);

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { showCheckbox: true },
  change: (args) => {
    console.log('Selected values:', args.value);
  }
});

listBox.appendTo('#listbox');
```

---

## Programmatic Selection

### Select Items by Text

Use `selectItems` to select items by their display text:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' }
});

listBox.appendTo('#listbox');

// After render — select 'TypeScript' by text
document.getElementById('selectBtn')!.addEventListener('click', () => {
  listBox.selectItems(['TypeScript']);
});
```

### Select Items by Value

Pass `true` as the second argument to select by value instead of text:

```ts
listBox.selectItems(['2'], true);  // Selects item with value '2'
```

### Select All / Deselect All

```ts
// Select all items
listBox.selectAll(true);

// Deselect all items
listBox.selectAll(false);
```

---

## Getting Selected Items

### Read Current Selection

```ts
// Get selected values
const selectedValues = listBox.value;
console.log('Selected values:', selectedValues);

// Get full data objects for selected values
const selectedData = listBox.getDataByValues(listBox.value as string[]);
console.log('Selected data objects:', selectedData);
```

### Read Selection in Change Event

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  change: (args) => {
    console.log('Value(s):', args.value);          // string[] | number[] | boolean[]
    console.log('Selected item(s):', args.items);  // Element[]
    console.log('Event name:', args.event);
  }
});

listBox.appendTo('#listbox');
```

---

## Disabling Items

### Disable Specific Items by Text

```ts
// Disable 'TypeScript' and 'Vue' by text
listBox.enableItems(['TypeScript', 'Vue'], false);

// Re-enable them
listBox.enableItems(['TypeScript', 'Vue'], true);
```

### Disable by Value

```ts
// Pass true as third argument to use values instead of text
listBox.enableItems(['2', '4'], false, true);
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Checkboxes not appearing | `CheckBoxSelection` module not injected | Call `ListBox.Inject(CheckBoxSelection)` before instantiation |
| `selectItems` has no effect | Component not fully rendered yet | Call `selectItems` inside the `created` event callback |
| `value` property returns `[]` | No item selected yet | Check after a `change` event fires |
| Shift+click range select not working | `mode` set to `'Single'` | Change to `selectionSettings: { mode: 'Multiple' }` |
