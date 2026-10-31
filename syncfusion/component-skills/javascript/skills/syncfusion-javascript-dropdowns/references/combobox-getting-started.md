# Getting Started — Syncfusion TypeScript ComboBox

This guide covers installation, setup, and basic usage of the ComboBox component.

---

## Installation

Install the Syncfusion dropdowns package:

```bash
npm install @syncfusion/ej2-dropdowns
```

The package includes the ComboBox along with DropDownList and AutoComplete.

---

## CSS / Theme Import

Import the required CSS files for the ComboBox and its dependencies:

```typescript
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/combo-box/index.css";
```

Replace `material` with your chosen theme: `bootstrap5`, `fabric`, `highcontrast`, `tailwind`, etc.

---

## HTML Element Setup

The ComboBox can be initialized on either an `<input>` or a `<select>` element.

**Using `<input>` (recommended):**
```html
<input id="combo-element" type="text" />
```

**Using `<select>` with predefined options:**
```html
<select id="combo-element">
  <option value="1">Badminton</option>
  <option value="2">Basketball</option>
  <option value="3">Cricket</option>
</select>
```

---

## Basic Instantiation

### String Array Data Source

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

const sportsData: string[] = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Tennis'];

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  placeholder: 'Select or type a sport'
});
comboBox.appendTo('#combo-element');
```

### Object Array Data Source

Use `fields` to map your object keys to the display `text` and selection `value`:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

const sportsData: { [key: string]: Object }[] = [
  { id: '1', sport: 'Badminton' },
  { id: '2', sport: 'Basketball' },
  { id: '3', sport: 'Cricket' },
  { id: '4', sport: 'Football' }
];

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

---

## Initializing with a Pre-selected Value

Use `value`, `text`, or `index` to set an initial selection:

```typescript
// By value
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  value: '3'           // selects 'Cricket'
});
comboBox.appendTo('#combo-element');

// By display text
const comboBox2: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  text: 'Cricket'
});
comboBox2.appendTo('#combo-element2');

// By zero-based index
const comboBox3: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  index: 2             // selects item at index 2
});
comboBox3.appendTo('#combo-element3');
```

---

## Common Initial Configuration

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  placeholder: 'Select or type a sport',
  showClearButton: true,    // shows ✕ to clear; default true
  width: '250px',           // component width; default '100%'
  popupHeight: '200px',     // dropdown list height; default '300px'
  allowCustom: true         // allow user-typed values; default true
});
comboBox.appendTo('#combo-element');
```

---

## Reading the Selected Value

Access `value`, `text`, and `index` after user interaction:

```typescript
import { ComboBox, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  change: (args: ChangeEventArgs) => {
    console.log('Value:', args.value);
    console.log('Text:', args.itemData);
  }
});
comboBox.appendTo('#combo-element');

// Or read directly from the instance
const currentValue = comboBox.value;
const currentText  = comboBox.text;
const currentIndex = comboBox.index;
```

---

## Destroying the Component

To clean up event listeners and DOM changes:

```typescript
comboBox.destroy();
```

After `destroy()`, the element reverts to its original state.

---

## Dynamic Property Updates

Properties can be changed at runtime using `setProperties()`:

```typescript
// Change data source dynamically
comboBox.setProperties({ dataSource: newSportsData });

// Change placeholder
comboBox.setProperties({ placeholder: 'Pick a game' });

// Enable readonly
comboBox.setProperties({ readonly: true });
```
