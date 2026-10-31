# Customization & Templates

## Table of Contents
- [Item Template](#item-template)
- [Value Template](#value-template)
- [Group Template](#group-template)
- [Header & Footer Templates](#header--footer-templates)
- [CSS Customization](#css-customization)
- [Styling Examples](#styling-examples)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Item Template

### Basic Item Template

Customize how each dropdown list item displays:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const employees = [
  { id: '1', name: 'Alice Johnson', dept: 'Engineering', avatar: 'alice.jpg' },
  { id: '2', name: 'Bob Smith', dept: 'Sales', avatar: 'bob.jpg' }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  itemTemplate: `<div class="item-wrapper">
    <span class="item-name">\${name}</span>
    <span class="item-dept">\${dept}</span>
  </div>`,
  placeholder: 'Select employee'
});

multiSelect.appendTo('#multiselect');
```

### Item Template with Images

```typescript
const products = [
  { id: '1', name: 'Laptop', image: 'laptop.png', price: '$999' },
  { id: '2', name: 'Phone', image: 'phone.png', price: '$699' }
];

const multiSelect = new MultiSelect({
  dataSource: products,
  fields: { text: 'name', value: 'id' },
  itemTemplate: `<div class="product-item">
    <img src="\${image}" alt="\${name}" class="product-img" />
    <div class="product-info">
      <span class="product-name">\${name}</span>
      <span class="product-price">\${price}</span>
    </div>
  </div>`,
  placeholder: 'Select product'
});

multiSelect.appendTo('#multiselect');
```

**CSS:**
```css
.product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
}

.product-img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-weight: 500;
}

.product-price {
  font-size: 0.9em;
  color: #666;
}
```

### Template with Icons

```typescript
const statuses = [
  { id: '1', name: 'Active', icon: 'check-circle', color: 'green' },
  { id: '2', name: 'Inactive', icon: 'x-circle', color: 'red' },
  { id: '3', name: 'Pending', icon: 'clock', color: 'orange' }
];

const multiSelect = new MultiSelect({
  dataSource: statuses,
  fields: { text: 'name', value: 'id' },
  itemTemplate: `<div class="status-item">
    <i class="icon icon-\${icon}" style="color: \${color}"></i>
    <span>\${name}</span>
  </div>`,
  placeholder: 'Select status'
});
```

## Value Template

### Custom Display of Selected Values

Customize how selected items appear in the input field:

```typescript
const employees = [
  { id: '1', name: 'Alice', dept: 'Engineering' },
  { id: '2', name: 'Bob', dept: 'Sales' }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  valueTemplate: `<div class="selected-item">
    <strong>\${name}</strong>
    <em>(\${dept})</em>
  </div>`,
  placeholder: 'Select employee'
});

multiSelect.appendTo('#multiselect');
```

**Input Display:** "Alice (Engineering), Bob (Sales)"

### Value Template with Badges

```typescript
const items = [
  { id: '1', name: 'JavaScript', level: 'Expert' },
  { id: '2', name: 'TypeScript', level: 'Advanced' }
];

const multiSelect = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },
  valueTemplate: `<span class="skill-badge">
    \${name}
    <span class="level-badge level-\${level.toLowerCase()}">\${level}</span>
  </span>`,
  placeholder: 'Select skills'
});
```

**CSS:**
```css
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #e3f2fd;
  border-radius: 12px;
  margin: 2px;
}

.level-badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8em;
}

.level-expert { background: #4caf50; color: white; }
.level-advanced { background: #2196f3; color: white; }
```

## Group Template

### Customize Group Headers

```typescript
const employees = [
  { id: '1', name: 'Alice', dept: 'Engineering' },
  { id: '2', name: 'Bob', dept: 'Engineering' },
  { id: '3', name: 'Charlie', dept: 'Sales' }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'dept' },
  groupTemplate: `<div class="group-header">
    <strong>\${dept}</strong>
    <span class="group-icon">›</span>
  </div>`,
  placeholder: 'Select employee'
});

multiSelect.appendTo('#multiselect');
```

### Group Header with Count

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'dept' },
  groupTemplate: `<div class="group-with-count">
    <span class="dept-name">\${dept}</span>
    <span class="count-badge">\${items.length}</span>
  </div>`,
  placeholder: 'Select employee'
});
```

## Header & Footer Templates

### Header Template

Add custom header to dropdown:

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },
  headerTemplate: `<div class="dropdown-header">
    <h4>Available Items</h4>
    <span class="total-count">\${items.length} items</span>
  </div>`,
  placeholder: 'Select items'
});

multiSelect.appendTo('#multiselect');
```

### Footer Template

Add custom footer to dropdown:

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },
  footerTemplate: `<div class="dropdown-footer">
    <button class="btn-select-all">Select All</button>
    <button class="btn-clear-all">Clear All</button>
  </div>`,
  placeholder: 'Select items'
});

multiSelect.appendTo('#multiselect');

// Handle footer button clicks
document.querySelector('.btn-select-all')?.addEventListener('click', () => {
  const allIds = items.map(i => i.id);
  multiSelect.value = allIds;
  multiSelect.dataBind();
});
```

## CSS Customization

### Custom Styling

Override default styles:

```css
/* Input field styling */
.e-multiselect.e-field {
  border: 2px solid #3f51b5;
  border-radius: 8px;
  padding: 12px;
}

.e-multiselect.e-field:focus {
  border-color: #1a237e;
  box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
}

/* List items styling */
.e-multiselect .e-list-item {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.e-multiselect .e-list-item:hover {
  background: #f5f5f5;
}

.e-multiselect .e-list-item.e-active {
  background: #e3f2fd;
  border-left: 4px solid #3f51b5;
}

/* Popup styling */
.e-multiselect .e-popup {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Responsive Design

```css
/* Mobile styles */
@media (max-width: 768px) {
  .e-multiselect .e-list-item {
    padding: 16px;  /* Larger for touch */
  }
  
  .e-multiselect .e-popup {
    width: 100% !important;
    max-height: 60vh;
  }
}

@media (max-width: 480px) {
  .e-multiselect.e-field {
    font-size: 16px;  /* Prevent zoom on iOS */
  }
}
```

## Styling Examples

### Material Design Style

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },
  itemTemplate: `<div class="material-item">
    <div class="item-icon">
      <i class="material-icons">\${icon}</i>
    </div>
    <div class="item-content">
      <div class="item-title">\${name}</div>
      <div class="item-subtitle">\${description}</div>
    </div>
  </div>`,
  placeholder: 'Select item'
});

multiSelect.appendTo('#multiselect');
```

**CSS:**
```css
.material-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f5f5f5;
  border-radius: 50%;
}

.item-content {
  flex: 1;
}

.item-title {
  font-weight: 500;
  color: #212121;
}

.item-subtitle {
  font-size: 0.875rem;
  color: #757575;
  margin-top: 4px;
}
```

### Compact List Style

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  itemTemplate: `<span class="compact-item">\${name}</span>`,
  placeholder: 'Select items'
});
```

**CSS:**
```css
.e-multiselect .e-list-item {
  padding: 6px 12px;  /* Compact padding */
}

.compact-item {
  font-size: 0.9rem;
}

.e-multiselect .e-list-item.e-active {
  background: #3f51b5;
  color: white;
}
```

## Common Patterns

### Pattern 1: Avatar Selection

```typescript
const users = [
  { id: '1', name: 'Alice', avatar: 'alice.jpg', online: true },
  { id: '2', name: 'Bob', avatar: 'bob.jpg', online: false }
];

const multiSelect = new MultiSelect({
  dataSource: users,
  fields: { text: 'name', value: 'id' },
  itemTemplate: `<div class="user-item">
    <img src="\${avatar}" class="user-avatar" />
    <span class="user-name">\${name}</span>
    <span class="status" style="background: \${online ? 'green' : 'gray'}"></span>
  </div>`,
  valueTemplate: `<img src="\${avatar}" class="user-avatar-small" />`,
  placeholder: 'Select team members'
});
```

### Pattern 2: Rich Information Display

```typescript
const products = [
  { id: '1', name: 'Laptop', stock: 15, rating: 4.5 },
  { id: '2', name: 'Phone', stock: 8, rating: 4.8 }
];

const multiSelect = new MultiSelect({
  dataSource: products,
  itemTemplate: `<div class="product-row">
    <div>\${name}</div>
    <div class="product-meta">
      <span>Stock: \${stock}</span>
      <span class="rating">★ \${rating}</span>
    </div>
  </div>`,
  placeholder: 'Select products'
});
```

### Pattern 3: Status Indicators

```typescript
const tasks = [
  { id: '1', name: 'Task A', priority: 'High', status: 'Active' },
  { id: '2', name: 'Task B', priority: 'Low', status: 'Completed' }
];

const multiSelect = new MultiSelect({
  dataSource: tasks,
  itemTemplate: `<div class="task-item">
    <span class="task-name">\${name}</span>
    <span class="badge priority-\${priority.toLowerCase()}">\${priority}</span>
    <span class="badge status-\${status.toLowerCase()}">\${status}</span>
  </div>`,
  placeholder: 'Select tasks'
});
```

## Troubleshooting

### Issue: Template Not Rendering

**Problem:** itemTemplate set but custom HTML not showing  
**Cause:** Template syntax or data binding incorrect

```typescript
// ✗ Wrong - missing $ or {
const ms = new MultiSelect({
  itemTemplate: '<div>name</div>'  // No data binding
});

// ✓ Correct - use template syntax
const ms = new MultiSelect({
  itemTemplate: '<div>${name}</div>'
});
```

### Issue: Dynamic Data in Template

**Problem:** Fields not showing in template  
**Cause:** Field name mismatch or field not in dataSource

```typescript
// ✗ Wrong - 'fullName' doesn't exist in data
const data = [{ id: '1', name: 'Alice' }];
const ms = new MultiSelect({
  dataSource: data,
  itemTemplate: '<div>${fullName}</div>'
});

// ✓ Correct - use actual field names
const ms = new MultiSelect({
  dataSource: data,
  itemTemplate: '<div>${name}</div>'
});
```

### Issue: Images Not Loading in Template

**Problem:** Template has image tags but they don't display  
**Solution:** Ensure image paths are correct and accessible

```typescript
// ✗ Wrong - path might be wrong
const ms = new MultiSelect({
  itemTemplate: '<img src="${image}" />'
});

// ✓ Correct - use absolute path or verify relative path
const ms = new MultiSelect({
  itemTemplate: '<img src="/assets/${image}" />'
});
```

## Next Steps

- **Add Filtering:** See [filtering-search.md](filtering-search.md)
- **Performance:** See [virtual-scrolling.md](virtual-scrolling.md)
- **Accessibility:** See [accessibility.md](accessibility.md)
