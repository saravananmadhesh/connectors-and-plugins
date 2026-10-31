# Selection Modes & Values

## Table of Contents
- [Overview](#overview)
- [Single vs Multiple Selection](#single-vs-multiple-selection)
- [Getting Selected Values](#getting-selected-values)
- [Setting Values Programmatically](#setting-values-programmatically)
- [Value vs Values Property](#value-vs-values-property)
- [Selection Events](#selection-events)
- [Checking Selection State](#checking-selection-state)
- [Common Issues](#common-issues)

## Overview

MultiSelect provides flexible selection modes to handle both single and multiple value selection. You can configure how selections are stored, retrieved, and validated.

## Single vs Multiple Selection

### Multiple Selection (Default)

Users can select zero, one, or multiple items:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const fruits = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Orange' }
];

const multiSelect = new MultiSelect({
  dataSource: fruits,
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select fruits (multi-select)',
  mode: 'Delimiter'  // Default mode
});

multiSelect.appendTo('#multiselect');

// User can select multiple items
// Selected values: ['1', '3']
```

### Single Selection Workaround

While MultiSelect is designed for multiple selection, you can limit to one:

```typescript
// Approach 1: Use DropDownList component instead
import { DropDownList } from '@syncfusion/ej2-dropdowns';

const ddl = new DropDownList({
  dataSource: fruits,
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select one fruit'
});

// Approach 2: Use maximumSelectionLength to allow only one selection
const multiSelect = new MultiSelect({
  dataSource: fruits,
  fields: { text: 'name', value: 'id' },
  maximumSelectionLength: 1,
  placeholder: 'Select one fruit'
});
```

**Better Practice:** Use DropDownList for single selection, MultiSelect for multiple

## Getting Selected Values

### Get All Selected Values

Returns array of selected value(s):

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  value: ['emp1', 'emp3']  // Pre-select items
});

multiSelect.appendTo('#multiselect');

// Get all selected values
const selectedValues = multiSelect.value;
console.log(selectedValues);  // ['emp1', 'emp3']
```

### Get a Specific Item's Data by Value

Retrieve the data object for a specific value:

```typescript
const itemData = multiSelect.getDataByValue('emp1');
console.log(itemData);
// Output: { id: 'emp1', name: 'Alice', ... }
```

### Get Selected Text

Get display text for selected items:

```typescript
// Get text via the text property (reflects the first selected item's text)
const selectedText = multiSelect.text;
console.log(selectedText);  // 'Alice'
```

## Setting Values Programmatically

### Set Multiple Values

Pre-select items after initialization:

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select employees'
});

multiSelect.appendTo('#multiselect');

// Set selections programmatically
multiSelect.value = ['emp1', 'emp2', 'emp3'];
multiSelect.dataBind();  // Apply pending property changes
```

### Set Single Value

Set just the first value:

```typescript
// Using value property
multiSelect.value = ['emp1'];
multiSelect.dataBind();
```

### Clear All Selections

```typescript
// Method 1: Use the clear() method
multiSelect.clear();

// Method 2: Set value to null
multiSelect.value = null;
multiSelect.dataBind();
```

### Conditional Selection

Set values based on conditions:

```typescript
// Select employees from specific department
const selectedDept = 'Engineering';
const deptEmployees = employees
  .filter(emp => emp.dept === selectedDept)
  .map(emp => emp.id);

multiSelect.value = deptEmployees;
multiSelect.dataBind();
```

## The `value` Property

The `value` property accepts and returns an array of selected values (`number[] | string[] | boolean[] | object[]`).

```typescript
// Get all current selections
const selected = multiSelect.value;  // e.g. ['emp1', 'emp2', 'emp3']

// Set selections (array)
multiSelect.value = ['emp1', 'emp2'];
multiSelect.dataBind();

// Clear all
multiSelect.value = null;
multiSelect.dataBind();
```

### When to Use

| Scenario | Use | Example |
|----------|-----|---------|
| Get all selections | `value` | `const all = ms.value` |
| Set multiple items | `value` | `ms.value = ['emp1', 'emp2']` |
| Clear selections | `clear()` | `ms.clear()` |
| Get item data by value | `getDataByValue()` | `ms.getDataByValue('emp1')` |

## Selection Events

### Change Event

Fires when selection changes:

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  change: () => {
    console.log('Selection changed');
    console.log('Selected values:', multiSelect.value);
  }
});

multiSelect.appendTo('#multiselect');
```

### Select Event

Fires when an item is selected (single item):

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  select: (e) => {
    console.log('Item selected:', e.item);
    console.log('Current selections:', multiSelect.values);
  }
});
```

### Removed Event

Fires when an item is deselected:

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  removed: (e) => {
    console.log('Item removed:', e.item);
    console.log('Remaining selections:', multiSelect.values);
  }
});
```

### Focus & Blur Events

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  focus: () => {
    console.log('Component focused');
  },
  blur: () => {
    console.log('Component blurred');
  }
});
```

## Checking Selection State

### Is Any Item Selected?

```typescript
const hasSelection = Array.isArray(multiSelect.value) && multiSelect.value.length > 0;
console.log('Has selection:', hasSelection);
```

### Get Selection Count

```typescript
const count = Array.isArray(multiSelect.value) ? multiSelect.value.length : 0;
console.log(`${count} items selected`);
```

### Check if Specific Item Selected

```typescript
const isSelected = Array.isArray(multiSelect.value) && multiSelect.value.includes('emp1');
console.log('emp1 selected:', isSelected);
```

### Get Selected Percentage

```typescript
const selectedCount = Array.isArray(multiSelect.value) ? multiSelect.value.length : 0;
const totalCount = (multiSelect.dataSource as any[])?.length || 0;
const percentage = (selectedCount / totalCount) * 100;
console.log(`Selected: ${percentage.toFixed(0)}%`);
```

## Common Issues

### Issue: Selected Values Not Persisting After Refresh

**Problem:** Values lost after data refresh  
**Cause:** Data source replaced, but previous selections become stale

```typescript
// ✗ Wrong - loses selection
multiSelect.dataSource = newData;
multiSelect.refresh();
// value might be invalid if newData doesn't have same IDs

// ✓ Correct - preserve valid selections
const previousValues = multiSelect.value as string[];
multiSelect.dataSource = newData;
multiSelect.value = previousValues;
multiSelect.dataBind();
```

### Issue: Change Event Fires Unexpectedly

**Problem:** Change event triggers when just opening popup  
**Solution:** Check if values actually changed

```typescript
let previousValues: string[] = [];

const multiSelect = new MultiSelect({
  dataSource: employees,
  change: () => {
    const currentValues = multiSelect.value as string[];
    if (JSON.stringify(previousValues) !== JSON.stringify(currentValues)) {
      console.log('Values actually changed');
      previousValues = [...(currentValues || [])];
    }
  }
});
```

### Issue: getDataByValue() Returns Undefined

**Problem:** Data lookup returns undefined  
**Cause:** Data source not properly bound or value doesn't exist in dataSource

```typescript
// Debug: Check if data source exists and value is valid
console.log('DataSource:', multiSelect.dataSource);
console.log('Value:', multiSelect.value);

// Ensure field mapping is correct
console.log('Fields:', multiSelect.fields);

// Look up a specific item
const itemData = multiSelect.getDataByValue('emp1');
console.log('Item data:', itemData);
```

## Next Steps

- **Add Checkboxes:** See [checkbox-multiselect.md](checkbox-multiselect.md)
- **Customize Display:** See [customization-templates.md](customization-templates.md)
- **Handle Events:** See [how-to-guide.md](how-to-guide.md)
