# How-To Guide & Troubleshooting

## Table of Contents
- [Common Implementation Patterns](#common-implementation-patterns)
- [Form Integration](#form-integration)
- [Real-World Scenarios](#real-world-scenarios)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Performance Tips](#performance-tips)
- [Best Practices](#best-practices)
- [FAQ](#faq)

## Common Implementation Patterns

### Pattern 1: Preference Selection

Allow users to select multiple preferences:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const preferences = [
  { id: '1', name: 'Email Notifications' },
  { id: '2', name: 'SMS Alerts' },
  { id: '3', name: 'Push Notifications' },
  { id: '4', name: 'Weekly Digest' }
];

const multiSelect = new MultiSelect({
  dataSource: preferences,
  fields: { text: 'name', value: 'id' },
  mode: 'CheckBox',
  showSelectAll: true,
  placeholder: 'Choose your preferences',
  change: () => {
    const selected = multiSelect.value as string[];
    savePreferences(selected);  // Send to server
  }
});

multiSelect.appendTo('#preferences');

async function savePreferences(preferences: string[]) {
  await fetch('/api/preferences', {
    method: 'POST',
    body: JSON.stringify({ preferences })
  });
}
```

### Pattern 2: Skill/Tag Selection

Allow users to select skills or tags:

```typescript
const skills = [
  { id: '1', name: 'JavaScript', level: 'Expert' },
  { id: '2', name: 'TypeScript', level: 'Advanced' },
  { id: '3', name: 'React', level: 'Intermediate' }
];

const multiSelect = new MultiSelect({
  dataSource: skills,
  fields: { text: 'name', value: 'id' },
  itemTemplate: `<div class="skill-item">
    <span>\${name}</span>
    <span class="level">\${level}</span>
  </div>`,
  valueTemplate: `<span class="skill-badge">\${name}</span>`,
  placeholder: 'Select your skills',
  allowFiltering: true
});

multiSelect.appendTo('#skills');
```

### Pattern 3: Team Member Assignment

Assign multiple team members to a task:

```typescript
const teamMembers = [
  { id: 'tm1', name: 'Alice', avatar: 'alice.jpg', department: 'Engineering' },
  { id: 'tm2', name: 'Bob', avatar: 'bob.jpg', department: 'Design' },
  { id: 'tm3', name: 'Charlie', avatar: 'charlie.jpg', department: 'Engineering' }
];

const multiSelect = new MultiSelect({
  dataSource: teamMembers,
  fields: { text: 'name', value: 'id', groupBy: 'department' },
  itemTemplate: `<div class="member-item">
    <img src="\${avatar}" class="member-avatar" />
    <span>\${name}</span>
  </div>`,
  mode: 'CheckBox',
  showSelectAll: false,
  placeholder: 'Assign team members',
  change: () => {
    const assignedIds = multiSelect.value as string[];
    updateTaskAssignment(assignedIds);
  }
});

multiSelect.appendTo('#assignees');
```

## Form Integration

### Add to Form with Validation

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

class RegistrationForm {
  private multiSelect: MultiSelect;
  
  constructor() {
    this.initializeForm();
  }
  
  private initializeForm() {
    this.multiSelect = new MultiSelect({
      dataSource: this.getInterests(),
      fields: { text: 'name', value: 'id' },
      placeholder: 'Select interests (required)',
      mode: 'CheckBox',
      showSelectAll: true
    });
    
    this.multiSelect.appendTo('#interests');
  }
  
  private getInterests() {
    return [
      { id: '1', name: 'Sports' },
      { id: '2', name: 'Music' },
      { id: '3', name: 'Technology' },
      { id: '4', name: 'Travel' }
    ];
  }
  
  // Form submission
  submitForm() {
    if (!this.validateForm()) {
      alert('Please fill all required fields');
      return;
    }

    const formData = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      interests: this.multiSelect.value as string[],
      timestamp: new Date()
    };

    this.submitToServer(formData);
  }

  private validateForm(): boolean {
    // Validate interests selected
    const selectedValues = this.multiSelect.value as string[];
    const hasInterests = Array.isArray(selectedValues) && selectedValues.length > 0;
    if (!hasInterests) {
      alert('Please select at least one interest');
      return false;
    }
    return true;
  }
  
  private submitToServer(data: any) {
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
}

// Initialize form
const form = new RegistrationForm();
document.getElementById('submitBtn')?.addEventListener('click', () => form.submitForm());
```

### Pre-populate from Server

```typescript
async function loadUserProfile() {
  const response = await fetch('/api/user/profile');
  const profile = await response.json();

  const multiSelect = new MultiSelect({
    dataSource: availableOptions,
    fields: { text: 'name', value: 'id' },
    value: profile.selectedIds,  // Pre-select from profile
    placeholder: 'Select options'
  });

  multiSelect.appendTo('#options');
}
```

## Real-World Scenarios

### Scenario 1: E-commerce Product Filters

```typescript
const brands = [
  { id: 'br1', name: 'Apple' },
  { id: 'br2', name: 'Samsung' },
  { id: 'br3', name: 'Sony' }
];

const priceRanges = [
  { id: 'pr1', name: 'Under $100' },
  { id: 'pr2', name: '$100-$500' },
  { id: 'pr3', name: '$500-$1000' }
];

// Brand filter
const brandFilter = new MultiSelect({
  dataSource: brands,
  fields: { text: 'name', value: 'id' },
  mode: 'CheckBox',
  placeholder: 'Filter by brand',
  change: applyFilters
});

// Price filter
const priceFilter = new MultiSelect({
  dataSource: priceRanges,
  fields: { text: 'name', value: 'id' },
  mode: 'CheckBox',
  placeholder: 'Filter by price',
  change: applyFilters
});

brandFilter.appendTo('#brandFilter');
priceFilter.appendTo('#priceFilter');

function applyFilters() {
  const selectedBrands = brandFilter.value as string[];
  const selectedPrices = priceFilter.value as string[];

  // Fetch filtered products
  fetch(`/api/products?brands=${selectedBrands}&prices=${selectedPrices}`)
    .then(r => r.json())
    .then(products => displayProducts(products));
}
```

### Scenario 2: Survey/Questionnaire

```typescript
interface Question {
  id: string;
  title: string;
  type: 'multiselect' | 'text' | 'radio';
  options?: { id: string; text: string }[];
  required?: boolean;
}

const questions: Question[] = [
  {
    id: 'q1',
    title: 'Which programming languages do you know?',
    type: 'multiselect',
    options: [
      { id: 'js', text: 'JavaScript' },
      { id: 'ts', text: 'TypeScript' },
      { id: 'py', text: 'Python' }
    ],
    required: true
  }
];

class SurveyRenderer {
  renderQuestion(question: Question) {
    if (question.type === 'multiselect') {
      const ms = new MultiSelect({
        dataSource: question.options,
        fields: { text: 'text', value: 'id' },
        mode: 'CheckBox',
        placeholder: question.title
      });
      
      ms.appendTo(`#q${question.id}`);
      return ms;
    }
  }
}
```

## Troubleshooting Guide

### Problem: MultiSelect Not Appearing

**Checklist:**
1. ✓ CSS imported (`material.css`, `bootstrap.css`, etc.)
2. ✓ Element with correct ID exists in HTML
3. ✓ `appendTo()` called with correct ID
4. ✓ Component module imported
5. ✓ Container div/input visible

**Debug:**
```typescript
const ms = new MultiSelect({ dataSource: items });

// Check container exists
console.log('Container:', document.getElementById('multiselect'));

// Check append worked
ms.appendTo('#multiselect');
console.log('Component appendTo result:', ms.element);

// Check rendered
setTimeout(() => {
  const rendered = document.querySelector('.e-multiselect');
  console.log('Rendered:', rendered);
}, 100);
```

### Problem: Data Not Displaying in Dropdown

**Causes & Solutions:**
```typescript
// 1. Field mapping mismatch
const data = [{ name: 'Item', id: '1' }];
// ✗ Wrong
const ms = new MultiSelect({
  dataSource: data,
  fields: { text: 'title', value: 'itemId' }  // Fields don't exist!
});
// ✓ Correct
const ms = new MultiSelect({
  dataSource: data,
  fields: { text: 'name', value: 'id' }
});

// 2. Empty dataSource
// ✓ Verify data loaded
console.log('DataSource:', ms.dataSource);

// 3. CSS not loading
// ✓ Check Network tab in DevTools for CSS 404s
```

### Problem: Selection Not Working

**Solutions:**
```typescript
// Issue: Click doesn't select item
// Cause: Maybe disabled or readonly

const ms = new MultiSelect({
  dataSource: items,
  enabled: true,      // ✓ Must be true
  readonly: false,    // ✓ Must be false
  allowFiltering: true
});

// Issue: value property doesn't update display
// Solution: Set value then call dataBind()
ms.value = ['1', '2'];
ms.dataBind();  // Required!

// Issue: Selection lost after data refresh
// Solution: Preserve selections before refresh
const saved = ms.value as string[];
ms.dataSource = newData;
ms.value = saved;  // Restore
ms.dataBind();
```

### Problem: Change Event Not Firing

**Cause: Event handler registered but not firing**
```typescript
// ✗ Wrong timing - event set after appendTo
const ms = new MultiSelect({ dataSource: items });
ms.appendTo('#ms');
ms.change = () => { };  // Too late!

// ✓ Correct - set in constructor
const ms = new MultiSelect({
  dataSource: items,
  change: () => {
    console.log('Changed!');
  }
});
ms.appendTo('#ms');

// ✓ Also correct - use addEventListener
ms.addEventListener('change', () => {
  console.log('Changed!');
});
```

## Performance Tips

### Tip 1: Use Virtual Scrolling for Large Datasets

```typescript
import { MultiSelect, VirtualScroll } from '@syncfusion/ej2-dropdowns';
MultiSelect.Inject(VirtualScroll);

const ms = new MultiSelect({
  dataSource: largeDataset,  // 1000+ items
  enableVirtualization: true  // Enable virtual scroll
});
```

### Tip 2: Implement Server-Side Filtering

```typescript
const ms = new MultiSelect({
  allowFiltering: true,
  filtering: async (e) => {
    if (!e.text || e.text.length < 3) return;
    
    // Fetch from server instead of filtering client data
    const response = await fetch(`/api/search?q=${e.text}`);
    const results = await response.json();
    e.updateData(results);
  }
});
```

### Tip 3: Minimize Templates

```typescript
// ✗ Heavy template (slow)
itemTemplate: `<div>
  <img src="\${img}" />
  <strong>\${name}</strong>
  <p>\${description}</p>
  <span>\${price}</span>
</div>`

// ✓ Minimal template (fast)
itemTemplate: '<span>${name}</span>'
```

### Tip 4: Lazy Load Child Data

```typescript
const parent = new MultiSelect({
  dataSource: parentData,
  change: async () => {
    // Load child data on demand
    const childData = await fetch(`/api/children/${parent.value}`);
    child.dataSource = await childData.json();
  }
});
```

## Best Practices

### 1. Always Provide Labels

```html
<label for="multiselect">Select items:</label>
<input id="multiselect" type="text" />
```

### 2. Use Appropriate Mode

```typescript
// CheckBox mode for visual multi-select
const ms = new MultiSelect({
  mode: 'CheckBox',     // Visual, clear
  showSelectAll: true
});

// Delimiter for compact display
const ms = new MultiSelect({
  mode: 'Delimiter'     // Compact
});
```

### 3. Provide User Feedback

```typescript
const ms = new MultiSelect({
  dataSource: items,
  change: () => {
    const selectedValues = ms.value as string[];
    const count = Array.isArray(selectedValues) ? selectedValues.length : 0;
    const feedback = `${count} item(s) selected`;
    (document.getElementById('feedback') as HTMLElement).textContent = feedback;
  }
});
```

### 4. Handle Empty States

```typescript
const ms = new MultiSelect({
  dataSource: items,
  placeholder: 'No items selected',
  footerTemplate: items.length === 0
    ? '<div>No items available</div>'
    : ''
});
```

### 5. Validate Selections

```typescript
function validateSelection(ms: MultiSelect): boolean {
  const selected = ms.value as string[];
  const count = Array.isArray(selected) ? selected.length : 0;

  if (count === 0) {
    console.error('At least one item must be selected');
    return false;
  }

  return true;
}
```

## FAQ

### Q: Can I limit the number of selections?

**A:** Yes, use the `maximumSelectionLength` property:

```typescript
const ms = new MultiSelect({
  dataSource: items,
  maximumSelectionLength: 3  // Limits selection to 3 items
});
```

### Q: How do I get the selected items (not just values)?

**A:** Use `getDataByValue(value)` to retrieve the full data object for a specific value. To get all selected data objects, map over the `value` array:

```typescript
// Get data for a single selected value
const itemData = ms.getDataByValue('1');
// Returns: { id: '1', name: 'Item 1' }

// Get data objects for all selected values
const selectedValues = ms.value as string[];
const selectedItems = (selectedValues || []).map(v => ms.getDataByValue(v));
```

### Q: Can I disable specific items?

**A:** Yes, use the `disableItem(item)` method to disable an item by its value or text:

```typescript
const ms = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' }
});
ms.appendTo('#multiselect');

// Disable a specific item by value
ms.disableItem({ id: '2', name: 'Item 2' });

// Or disable by text
ms.disableItem('Item 2');
```

### Q: How to reset selection?

**A:** Use the `clear()` method:

```typescript
ms.clear();
```

### Q: Can I programmatically open/close dropdown?

**A:** Yes:

```typescript
// Open
ms.showPopup();

// Close
ms.hidePopup();
```

### Q: How to get notified when value changes?

**A:** Use the `change` event:

```typescript
const ms = new MultiSelect({
  change: () => {
    const selected = ms.value as string[];
    console.log('Selected:', selected);
    onSelectionChanged(selected);
  }
});

function onSelectionChanged(values: string[]) {
  // Handle change
}
```

## Next Steps

- **Advanced Customization:** See [customization-templates.md](customization-templates.md)
- **Performance:** See [virtual-scrolling.md](virtual-scrolling.md)
- **Accessibility:** See [accessibility.md](accessibility.md)
- **Data Management:** See [data-binding.md](data-binding.md)
