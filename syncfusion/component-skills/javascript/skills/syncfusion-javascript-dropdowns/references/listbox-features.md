# Advanced Features in JavaScript ListBox

## Table of Contents
- [Filtering and Search](#filtering-and-search)
- [Sorting](#sorting)
- [Drag and Drop](#drag-and-drop)
- [Enable and Disable Items](#enable-and-disable-items)
- [Scroller Configuration](#scroller-configuration)
- [Troubleshooting](#troubleshooting)

---

## Filtering and Search

### Enable Built-in Filter Bar

Add a search input above the list by setting `allowFiltering: true`:

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
  allowFiltering: true,
  filterBarPlaceholder: 'Search languages'
});

listBox.appendTo('#listbox');
```

### Custom Filter Logic with `filtering` Event

Override the default search to apply custom query logic:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';

const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1' },
  { text: 'TypeScript', id: '2' },
  { text: 'React', id: '3' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  allowFiltering: true,
  filtering: (args) => {
    const query = new Query();
    const filtered = args.text !== ''
      ? query.where('text', 'contains', args.text, true)
      : query;
    args.updateData(data as any, filtered);
  }
});

listBox.appendTo('#listbox');
```

### Filter Type Options

Control the match strategy using `filterType`:

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  allowFiltering: true,
  filterType: 'Contains'  // 'StartsWith' | 'EndsWith' | 'Contains'
});

listBox.appendTo('#listbox');
```

---

## Sorting

Use the `sortOrder` property to automatically sort the data source:

### Ascending Order

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'Vue', id: '1' },
  { text: 'JavaScript', id: '2' },
  { text: 'React', id: '3' },
  { text: 'Angular', id: '4' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  sortOrder: 'Ascending'
});

listBox.appendTo('#listbox');
```

### Descending Order

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  sortOrder: 'Descending'
});

listBox.appendTo('#listbox');
```

---

## Drag and Drop

### Enable Drag and Drop Within a Single ListBox

Allow users to reorder items by dragging:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'Item 1', id: '1' },
  { text: 'Item 2', id: '2' },
  { text: 'Item 3', id: '3' },
  { text: 'Item 4', id: '4' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  allowDragAndDrop: true,
  dragStart: (args) => {
    console.log('Drag started:', args);
  },
  drop: (args) => {
    console.log('Item dropped:', args);
  }
});

listBox.appendTo('#listbox');
```

### Drag and Drop Between Two ListBoxes

Use the same `scope` value to allow cross-list dragging:

```html
<!-- index.html -->
<div id="listbox-source"></div>
<div id="listbox-target"></div>
```

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const sourceData: { [key: string]: Object }[] = [
  { text: 'Available A', id: '1' },
  { text: 'Available B', id: '2' }
];

const targetData: { [key: string]: Object }[] = [
  { text: 'Selected X', id: '3' }
];

const sourceListBox: ListBox = new ListBox({
  dataSource: sourceData,
  fields: { text: 'text', value: 'id' },
  allowDragAndDrop: true,
  scope: 'shared-scope'
});

const targetListBox: ListBox = new ListBox({
  dataSource: targetData,
  fields: { text: 'text', value: 'id' },
  allowDragAndDrop: true,
  scope: 'shared-scope'
});

sourceListBox.appendTo('#listbox-source');
targetListBox.appendTo('#listbox-target');
```

---

## Enable and Disable Items

### Disable Specific Items by Text

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' }
});

listBox.appendTo('#listbox');

// Disable 'TypeScript' and 'Vue'
listBox.enableItems(['TypeScript', 'Vue'], false);

// Re-enable them later
listBox.enableItems(['TypeScript', 'Vue'], true);
```

### Disable Items by Value

```ts
// Pass true as third argument to treat the first array as values
listBox.enableItems(['2', '4'], false, true);
```

### Disable via Data Source

Mark items as disabled in the data using `fields.disabled`:

```ts
const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1', disabled: false },
  { text: 'TypeScript', id: '2', disabled: true },  // disabled at load
  { text: 'React', id: '3', disabled: false }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id', disabled: 'disabled' }
});

listBox.appendTo('#listbox');
```

---

## Scroller Configuration

### Fixed Height with Scroll

Set a fixed `height` to enable scrolling for long lists:

```ts
const listBox: ListBox = new ListBox({
  dataSource: largeDataSet,
  fields: { text: 'text', value: 'id' },
  height: '300px'  // Items beyond this height will scroll
});

listBox.appendTo('#listbox');
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Drag not working between lists | Different `scope` values | Set the same `scope` string on both ListBox instances |
| Filter bar not visible | `allowFiltering` not set | Add `allowFiltering: true` to the model |
| Sort has no effect | `sortOrder` set to `'None'` | Change to `'Ascending'` or `'Descending'` |
| Disabled items are still draggable | EJ2 default behavior | Prevent drag in `dragStart` event by checking `args.items` |
