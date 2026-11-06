# Checkbox & Multi-Select Features

## Table of Contents
- [Enabling Checkbox Mode](#enabling-checkbox-mode)
- [Checkbox Display Options](#checkbox-display-options)
- [Select All Functionality](#select-all-functionality)
- [Working with Checkboxes](#working-with-checkboxes)
- [Customizing Checkbox Behavior](#customizing-checkbox-behavior)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Enabling Checkbox Mode

### Basic Checkbox Setup

Enable checkboxes for visual multi-select with checkbox module injection:

```typescript
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

// Inject the CheckBoxSelection module
MultiSelect.Inject(CheckBoxSelection);

const multiSelect = new MultiSelect({
  dataSource: [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
    { id: '3', name: 'Orange' }
  ],
  fields: { text: 'name', value: 'id' },
  mode: 'CheckBox',           // Enable checkbox mode
  placeholder: 'Select items'
});

multiSelect.appendTo('#multiselect');
```

### Mode Options

| Mode | Display | Use Case |
|------|---------|----------|
| `'Delimiter'` (default) | Comma-separated text | Simple text display |
| `'CheckBox'` | Visual checkboxes | User-friendly multi-select |

```typescript
// Delimiter mode (default)
const delimiter = new MultiSelect({
  mode: 'Delimiter'  // Shows: "Apple, Banana, Orange"
});

// Checkbox mode (visual)
const checkbox = new MultiSelect({
  mode: 'CheckBox'   // Shows checkboxes in dropdown
});
```

## Checkbox Display Options

### Checkbox Styling

Checkboxes are styled by the selected theme:

```typescript
// Material theme (default)
@import '@syncfusion/ej2-base/styles/material.css';
@import '@syncfusion/ej2-dropdowns/styles/material.css';

// Bootstrap theme
@import '@syncfusion/ej2-base/styles/bootstrap.css';
@import '@syncfusion/ej2-dropdowns/styles/bootstrap.css';
```

Custom CSS for checkboxes:

```css
/* Custom checkbox styling */
.e-multiselect .e-list-item .e-list-checkbox {
  margin-right: 8px;
}

.e-multiselect .e-list-item.e-active .e-list-checkbox {
  background-color: #3f51b5;
  border-color: #3f51b5;
}
```

## Select All Functionality

### Enable Select All Option

Display header with Select All checkbox:

```typescript
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(CheckBoxSelection);

const multiSelect = new MultiSelect({
  dataSource: fruits,
  fields: { text: 'name', value: 'id' },
  mode: 'CheckBox',
  showSelectAll: true,         // Enable Select All header
  selectAllText: 'Select All Items',      // Custom text
  unSelectAllText: 'Deselect All Items',  // Custom deselect text
  placeholder: 'Select fruits'
});

multiSelect.appendTo('#multiselect');
```

### Select All Behavior

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  mode: 'CheckBox',
  showSelectAll: true,
  change: () => {
    const selectedCount = Array.isArray(multiSelect.value) ? multiSelect.value.length : 0;
    const totalCount = (multiSelect.dataSource as any[])?.length || 0;

    if (selectedCount === totalCount) {
      console.log('All items selected');
    } else if (selectedCount === 0) {
      console.log('No items selected');
    } else {
      console.log(`${selectedCount} of ${totalCount} selected`);
    }
  }
});

multiSelect.appendTo('#multiselect');
```

### Default to Select All

Pre-select all items using `selectAll()`:

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  mode: 'CheckBox',
  showSelectAll: true
});

multiSelect.appendTo('#multiselect');

// Select all items programmatically
multiSelect.selectAll(true);
```

## Working with Checkboxes

### Get Checked Items

```typescript
// Get all checked/selected values
const checkedValues = multiSelect.value;
console.log('Checked:', checkedValues);  // ['1', '3', '5']

// Look up full data for a specific checked value
const itemData = multiSelect.getDataByValue('1');
console.log('Item data:', itemData);
```

### Check/Uncheck Items Programmatically

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  mode: 'CheckBox'
});

multiSelect.appendTo('#multiselect');

// Check specific items
multiSelect.value = ['emp1', 'emp2', 'emp3'];
multiSelect.dataBind();

// Uncheck specific item
const currentValues = (multiSelect.value as string[]) || [];
multiSelect.value = currentValues.filter(v => v !== 'emp2');
multiSelect.dataBind();

// Uncheck all using clear()
multiSelect.clear();
```

### Check if Item is Checked

```typescript
const currentValues = (multiSelect.value as string[]) || [];
const isChecked = currentValues.includes('emp1');
console.log('emp1 is checked:', isChecked);

// Check multiple items at once
const itemsToCheck = ['emp1', 'emp3'];
const allChecked = itemsToCheck.every(id => currentValues.includes(id));
console.log('All specified items checked:', allChecked);
```

### Select by Group

Select all items in a specific group:

```typescript
const departments = [
  { id: '1', name: 'Alice', dept: 'Engineering' },
  { id: '2', name: 'Bob', dept: 'Engineering' },
  { id: '3', name: 'Charlie', dept: 'Sales' }
];

const multiSelect = new MultiSelect({
  dataSource: departments,
  fields: { text: 'name', value: 'id', groupBy: 'dept' },
  mode: 'CheckBox'
});

multiSelect.appendTo('#multiselect');

// Select all in Engineering
const engineeringIds = departments
  .filter(d => d.dept === 'Engineering')
  .map(d => d.id);

multiSelect.value = engineeringIds;
multiSelect.dataBind();
```

## Customizing Checkbox Behavior

### Custom Checkbox Validation

Allow checkboxes only for certain conditions:

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  mode: 'CheckBox',
  maximumSelectionLength: 5,  // Limit to 5 selections
  beforeOpen: () => {
    // Custom logic before dropdown opens
    console.log('Dropdown opening');
  }
});

multiSelect.appendTo('#multiselect');
```

### Disable Specific Checkboxes

Use the `disableItem()` method to disable specific items after rendering:

```typescript
const items = [
  { id: '1', name: 'Available Item' },
  { id: '2', name: 'Disabled Item' },
  { id: '3', name: 'Available Item' }
];

const multiSelect = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },
  mode: 'CheckBox',
  created: () => {
    // Disable item with value '2' after the component is created
    multiSelect.disableItem('2');
  }
});

multiSelect.appendTo('#multiselect');
```

## Common Patterns

### Pattern 1: Approve/Decline Selection

```typescript
const multiSelect = new MultiSelect({
  dataSource: approvals,
  fields: { text: 'title', value: 'id' },
  mode: 'CheckBox',
  showSelectAll: true,
  placeholder: 'Select items to approve'
});

multiSelect.appendTo('#multiselect');

// Approve button
document.getElementById('approveBtn').addEventListener('click', () => {
  const approved = multiSelect.values;
  console.log('Approved:', approved);
  
  // Send to server
  fetch('/api/approve', {
    method: 'POST',
    body: JSON.stringify({ ids: approved })
  });
});
```

### Pattern 2: Progressive Selection

Allow selection to build up with visual feedback:

```typescript
let selectedCount = 0;

const multiSelect = new MultiSelect({
  dataSource: items,
  mode: 'CheckBox',
  change: () => {
    const newCount = Array.isArray(multiSelect.value) ? multiSelect.value.length : 0;

    if (newCount > selectedCount) {
      console.log('✓ Item added');
    } else if (newCount < selectedCount) {
      console.log('✗ Item removed');
    }

    selectedCount = newCount;
    updateCounter();
  }
});

function updateCounter() {
  const count = Array.isArray(multiSelect.value) ? multiSelect.value.length : 0;
  const total = (multiSelect.dataSource as any[])?.length || 0;
  document.getElementById('counter').textContent = `${count}/${total}`;
}
```

### Pattern 3: Filter-Then-Select

Filter items first, then select from filtered results:

```typescript
import { MultiSelect, CheckBoxSelection, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(CheckBoxSelection);

const items = [...]; // Large dataset

const multiSelect = new MultiSelect({
  dataSource: items,
  mode: 'CheckBox',
  allowFiltering: true,
  filtering: (e: FilteringEventArgs) => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(e.text.toLowerCase())
    );
    e.updateData(filtered);
  }
});

multiSelect.appendTo('#multiselect');
```

## Troubleshooting

### Issue: Checkboxes Not Showing

**Problem:** mode='CheckBox' set but no checkboxes visible  
**Solution:** Inject CheckBoxSelection module before initializing the component

```typescript
// ✗ Wrong - module not injected
const ms = new MultiSelect({ mode: 'CheckBox' });

// ✓ Correct - inject module first
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
MultiSelect.Inject(CheckBoxSelection);
const ms = new MultiSelect({ mode: 'CheckBox' });
```

### Issue: Select All Not Appearing

**Problem:** showSelectAll=true but no Select All header  
**Solution:** Verify CSS is loaded, module is injected, and mode is CheckBox

```typescript
// Ensure:
// 1. CSS imported
// @import '@syncfusion/ej2-dropdowns/styles/material.css';

// 2. Module injected
MultiSelect.Inject(CheckBoxSelection);

// 3. Mode is CheckBox and showSelectAll is true
const ms = new MultiSelect({
  mode: 'CheckBox',
  showSelectAll: true
});
```

## Next Steps

- **Enable Filtering:** See [filtering-search.md](filtering-search.md)
- **Customize Display:** See [customization-templates.md](customization-templates.md)
- **Handle Events:** See [how-to-guide.md](how-to-guide.md)
