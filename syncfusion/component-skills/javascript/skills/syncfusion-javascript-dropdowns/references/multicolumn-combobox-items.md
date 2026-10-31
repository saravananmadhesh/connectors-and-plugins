# Items and Configuration — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [Setting Initial Selection](#setting-initial-selection)
- [Placeholder and Float Label](#placeholder-and-float-label)
- [Clear Button](#clear-button)
- [Disabled and Read Only States](#disabled-and-read-only-states)
- [Width and Popup Size](#width-and-popup-size)
- [CSS Class Customization](#css-class-customization)
- [HTML Attributes](#html-attributes)
- [Grid Settings](#grid-settings)
- [Programmatic Methods](#programmatic-methods)

---

## Setting Initial Selection

Pre-select an item using `text`, `value`, or `index`.

**By text** (display text of the item):
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  text: 'Michael',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

**By value** (hidden key value):
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  value: '1015',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

**By index** (zero-based position):
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  index: 1,
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

Use only one at a time. `text` is most human-readable; `value` is best for forms; `index` is useful for "select first item" patterns.

---

## Placeholder and Float Label

**Placeholder** sets hint text displayed when no item is selected:

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  placeholder: 'Select an employee',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

**Float Label** makes the placeholder float above the input instead of disappearing when a value is entered. Requires `placeholder` to be set.

| `floatLabelType` | Behavior |
|---|---|
| `'Never'` | Placeholder never floats (default) |
| `'Always'` | Label always floats above the input |
| `'Auto'` | Label floats after focus or after entering a value |

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  placeholder: 'Select an employee',
  floatLabelType: 'Auto',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

---

## Clear Button

Show a clear (×) button to reset the selection:

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  text: 'Michael',
  showClearButton: true,
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

Clicking the clear button resets `value`, `text`, and `index` properties to `null`. Default is `false`.

---

## Disabled and Read Only States

**Disabled** — prevents all interactions:
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  text: 'Michael',
  disabled: true,
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

**Read Only** — allows viewing but not editing:
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  text: 'Michael',
  readonly: true,
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

| Property | Default | Effect |
|---|---|---|
| `disabled` | `false` | Fully disables the component |
| `readonly` | `false` | Prevents user input but allows display |

---

## Width and Popup Size

**Component width** (defaults to parent container width):
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  width: '500px',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

**Popup dimensions:**
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  popupWidth: '400px',
  popupHeight: '400px',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

Both `width`, `popupWidth`, and `popupHeight` accept `string` (e.g., `'400px'`) or `number` (in pixels).

---

## CSS Class Customization

Add a custom CSS class to the root element for styling:

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  cssClass: 'e-custom-multi-column',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

Then in your CSS:
```css
.e-custom-multi-column .e-input-group {
  border-radius: 8px;
  border-color: #007bff;
}
```

---

## HTML Attributes

Add arbitrary HTML attributes (title, name, data-*, aria-*) to the underlying input element:

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  htmlAttributes: { title: 'Select an employee', 'data-testid': 'emp-select' },
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

---

## Grid Settings

Configure the popup grid appearance with `gridSettings`. Uses `GridSettingsModel`.

### Grid Lines

```ts
// Options: 'Default' | 'Horizontal' | 'Vertical' | 'Both' | 'None'
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  gridSettings: { gridLines: 'Horizontal' },
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

### Row Height

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  gridSettings: { rowHeight: 40 },
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

### Alternate Row Styling

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  gridSettings: { enableAltRow: true },
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

When `enableAltRow` is `true`, the CSS class `e-altrow` is applied to alternating rows.

**Combined example:**
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  gridSettings: { rowHeight: 40, enableAltRow: true, gridLines: 'Horizontal' },
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

---

## Programmatic Methods

Access component methods via the instance reference returned by `new MultiColumnComboBox()`:

```ts
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

const empData: { [key: string]: Object }[] = [
  { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
  { EmpID: 1002, Name: 'Robert',       Designation: 'Developer', Country: 'USA'     }
];

const fields: object = { text: 'Name', value: 'EmpID' };

const columns: ColumnModel[] = [
  { field: 'EmpID', header: 'Employee ID', width: 90 },
  { field: 'Name',  header: 'Name',        width: 90 }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  id: 'multicolumn',
  dataSource: empData,
  fields: fields,
  columns: columns
});

mccBox.appendTo('#multicolumn');

// Open/close the popup programmatically
document.getElementById('openBtn')!.addEventListener('click', () => mccBox.showPopup());
document.getElementById('closeBtn')!.addEventListener('click', () => mccBox.hidePopup());

// Focus control
document.getElementById('focusBtn')!.addEventListener('click', () => mccBox.focusIn());
document.getElementById('blurBtn')!.addEventListener('click', () => mccBox.focusOut());

// Read the data object for a given value
document.getElementById('getBtn')!.addEventListener('click', () => {
  const data = mccBox.getDataByValue('1003');
  console.log(data);
});
```

| Method | Description |
|---|---|
| `showPopup(e?)` | Opens the popup dropdown |
| `hidePopup(e?)` | Closes the popup dropdown |
| `focusIn(e?)` | Sets focus to the component |
| `focusOut(e?)` | Removes focus from the component |
| `getDataByValue(value)` | Returns the data object matching the given value |
| `getItems()` | Returns all rendered list item elements |
| `addItems(items, index?)` | Adds new items to the popup list |
