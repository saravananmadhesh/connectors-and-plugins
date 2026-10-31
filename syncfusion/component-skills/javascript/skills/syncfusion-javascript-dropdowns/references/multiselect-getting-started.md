# Getting Started with MultiSelect

## Table of Contents
- [Installation & Dependencies](#installation--dependencies)
- [CSS Imports & Theme](#css-imports--theme)
- [Element Initialization](#element-initialization)
- [Basic Setup](#basic-setup)
- [Placeholder Configuration](#placeholder-configuration)
- [Common Issues](#common-issues)

## Installation & Dependencies

### Package Installation

Install the MultiSelect component via npm:

```bash
npm install @syncfusion/ej2-dropdowns
```

The MultiSelect component has the following dependencies:

```
@syncfusion/ej2-dropdowns
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-inputs
├── @syncfusion/ej2-lists
├── @syncfusion/ej2-navigations
├── @syncfusion/ej2-notifications
└── @syncfusion/ej2-popups
    └── @syncfusion/ej2-buttons
```

All dependencies are automatically installed with the main package.

### Importing the Component

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
```

For advanced features like checkboxes or virtual scrolling, import additional modules:

```typescript
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

// Inject the module
MultiSelect.Inject(CheckBoxSelection);
```

## CSS Imports & Theme

### Built-in Themes

Syncfusion provides multiple built-in themes. Import the necessary CSS files for your chosen theme:

#### Material Theme

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/multi-select/index.css";
```

#### Bootstrap Theme

```css
@import "../../node_modules/@syncfusion/ej2-bootstrap-theme/styles/multi-select/index.css";
```

### Available Themes

- `material` - Material Design theme
- `bootstrap` - Bootstrap theme
- `bootstrap4` - Bootstrap 4 theme
- `fabric` - Fabric theme
- `tailwind` - Tailwind CSS theme
- `tailwind-dark` - Tailwind dark theme

## Element Initialization

MultiSelect can be initialized on three different HTML elements:

### 1. INPUT Element (Recommended)

Use with a data source and field mapping:

```html
<input id="multiselect" type="text" />
```

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const multiSelect = new MultiSelect({
  dataSource: ['Apple', 'Banana', 'Orange'],
  placeholder: 'Select fruits'
});

multiSelect.appendTo('#multiselect');
```

**Best for:** Dynamic data binding, remote data sources, complex configurations

### 2. SELECT Element

Pre-defined options in HTML:

```html
<select id="multiselect" multiple>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="orange">Orange</option>
</select>
```

```typescript
const multiSelect = new MultiSelect();
multiSelect.appendTo('#multiselect');
```

**Features:**
- Options grouped via `<optgroup>` tag
- Pre-selected items via `selected` attribute
- Values automatically mapped from option values

```html
<select id="multiselect" multiple>
  <optgroup label="Fruits">
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
  </optgroup>
  <optgroup label="Vegetables">
    <option value="carrot">Carrot</option>
    <option value="spinach">Spinach</option>
  </optgroup>
</select>
```

### 3. UL Element

List-based initialization:

```html
<ul id="multiselect">
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>
```

```typescript
const multiSelect = new MultiSelect();
multiSelect.appendTo('#multiselect');
```

**Best for:** Static content in HTML, SEO-friendly markup

## Basic Setup

### Simple String Array

Simplest setup with array of strings:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grape'];

const multiSelect = new MultiSelect({
  dataSource: fruits,
  placeholder: 'Select fruits'
});

multiSelect.appendTo('#multiselect');
```

### Array of Objects

For complex data with field mapping:

```typescript
const employees = [
  { id: '1', name: 'Alice', department: 'Engineering' },
  { id: '2', name: 'Bob', department: 'Sales' },
  { id: '3', name: 'Charlie', department: 'Marketing' }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select employee'
});

multiSelect.appendTo('#multiselect');
```

### Getting Selected Values

```typescript
// Get all selected values as array
const selectedValues = multiSelect.value as string[];

// Get full data object for a specific selected value
const itemData = multiSelect.getDataByValue('1');

console.log('Values:', selectedValues);  // ['1', '3']
console.log('Item:', itemData);          // { id: '1', name: 'Alice' }
```

### Setting Selected Values Programmatically

```typescript
// Set selected values
multiSelect.value = ['1', '3'];

// Update display after setting value
multiSelect.dataBind();
```

## Placeholder Configuration

### Basic Placeholder

```typescript
const multiSelect = new MultiSelect({
  dataSource: fruits,
  placeholder: 'Choose one or more fruits'
});

multiSelect.appendTo('#multiselect');
```

### Dynamic Placeholder Change

```typescript
// Change placeholder after initialization
multiSelect.placeholder = 'No fruits selected';
multiSelect.refresh();
```

### Placeholder with Pre-selected Values

When values are pre-selected, placeholder remains hidden:

```typescript
const multiSelect = new MultiSelect({
  dataSource: fruits,
  value: ['Apple', 'Banana'],  // Pre-select items
  placeholder: 'Select fruits'  // Hidden when selections exist
});

multiSelect.appendTo('#multiselect');
```

## Common Issues

### Issue: Component Not Rendering

**Problem:** Input element selected but nothing appears  
**Solution:** Verify CSS is imported and `appendTo()` is called correctly

```typescript
// ✓ Correct
multiSelect.appendTo('#multiselect');

// ✗ Wrong - element ID must match
multiSelect.appendTo('#wrong-id');
```

### Issue: Data Not Displaying

**Problem:** dataSource set but no items in dropdown  
**Cause:** Field mapping mismatch or incorrect data structure

```typescript
// ✗ Wrong - fields don't match data
const multiSelect = new MultiSelect({
  dataSource: [{ name: 'Alice', id: '1' }],
  fields: { text: 'fullName', value: 'userId' }  // Wrong keys!
});

// ✓ Correct - fields match data keys
const multiSelect = new MultiSelect({
  dataSource: [{ name: 'Alice', id: '1' }],
  fields: { text: 'name', value: 'id' }
});
```

### Issue: Styles Not Applied

**Problem:** Component appears unstyled  
**Solution:** Import CSS files before creating component

```typescript
// In your main file or CSS file:
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/multi-select/index.css";

// Then initialize component
const multiSelect = new MultiSelect({ ... });
```

### Issue: Module Not Found Error

**Problem:** "Cannot find module '@syncfusion/ej2-dropdowns'"  
**Solution:** Install package and verify webpack/bundler configuration

```bash
npm install @syncfusion/ej2-dropdowns
npm install  # Install all dependencies
```

## Next Steps

- **Bind Data:** See [data-binding.md](data-binding.md) for connecting to data sources
- **Select Values:** See [selection-modes.md](selection-modes.md) for working with selections
- **Add Checkboxes:** See [checkbox-multiselect.md](checkbox-multiselect.md) for multi-select with checkboxes
- **Search & Filter:** See [filtering-search.md](filtering-search.md) for search functionality
