# Templates and Customization in Dropdown Tree

## Table of Contents
- [Overview](#overview)
- [Item Template](#item-template)
- [Value Template](#value-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)
- [Template Expression Syntax](#template-expression-syntax)
- [Advanced Customization](#advanced-customization)
- [Custom Template for Multi-Select Display](#custom-template-for-multi-select-display)

---

## Overview

The Dropdown Tree control provides template properties to customize the appearance of various elements:

- **Item Template**: Customize how each tree item is displayed
- **Value Template**: Customize the selected value display in the input field
- **Header Template**: Add custom content above the tree items
- **Footer Template**: Add custom content below the tree items
- **No Records Template**: Display custom message when no data is found
- **Action Failure Template**: Display custom message when data fetch fails

Templates use Essential JS 2's template engine with `${fieldName}` syntax for data binding.

---

## Item Template

### Basic Item Template

Customize the appearance of each tree item to display additional information:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let employeeData = [
    { "id": 1, "name": "Steven Buchanan", "job": "General Manager", "hasChild": true, "expanded": true },
    { "id": 2, "pid": 1, "name": "Laura Callahan", "job": "Product Manager", "hasChild": true },
    { "id": 3, "pid": 2, "name": "Andrew Fuller", "job": "Team Lead", "hasChild": true },
    { "id": 4, "pid": 3, "name": "Anne Dodsworth", "job": "Developer" },
    { "id": 5, "pid": 1, "name": "Nancy Davolio", "job": "Product Manager", "hasChild": true },
    { "id": 6, "pid": 5, "name": "Michael Suyama", "job": "Team Lead", "hasChild": true },
    { "id": 7, "pid": 6, "name": "Robert King", "job": "Developer" }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: employeeData,
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild'
    },
    itemTemplate: '<div class="e-item-template"><div>${name}</div><div class="e-job">${job}</div></div>',
    width: '100%',
    cssClass: 'custom',
    placeholder: 'Select an employee',
    popupHeight: '250px'
});

dropDownTree.appendTo('#ddtElement');
```

### Item Template with Conditional Content

Display different content based on data values:

```typescript
let documentData = [
    { "id": 1, "name": "Project Proposal", "size": "2.5 MB", "type": "document", "icon": "e-icons e-document" },
    { "id": 2, "name": "Budget Report", "size": "1.2 MB", "type": "document", "icon": "e-icons e-document" },
    { "id": 3, "name": "Presentation.pptx", "size": "5.8 MB", "type": "presentation", "icon": "e-icons e-presentation" }
];

let dropDownTree = new DropDownTree({
    fields: { dataSource: documentData, text: 'name', value: 'id' },
    itemTemplate: '<span class="${icon}"></span> <span>${name}</span> <span class="e-size">${size}</span>',
    width: '100%'
});

dropDownTree.appendTo('#ddtElement');
```

### Styling Item Templates

Add CSS for enhanced visual presentation:

```css
.custom .e-item-template {
    padding: 8px;
    border-bottom: 1px solid #e0e0e0;
}

.custom .e-item-template div:first-child {
    font-weight: 500;
    color: #333;
}

.custom .e-job {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
}
```

---

## Value Template

### Customize Selected Value Display

The value template controls how the selected item appears in the input field:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let employeeData = [
    { "id": 1, "name": "Steven Buchanan", "job": "General Manager", "hasChild": true, "expanded": true },
    { "id": 2, "pid": 1, "name": "Laura Callahan", "job": "Product Manager", "hasChild": true },
    { "id": 3, "pid": 2, "name": "Andrew Fuller", "job": "Team Lead", "hasChild": true },
    { "id": 4, "pid": 3, "name": "Anne Dodsworth", "job": "Developer" }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: employeeData,
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild'
    },
    itemTemplate: '<div><span>${name}</span><span class="e-job">${job}</span></div>',
    valueTemplate: '<span class="e-selected-item">${name} - ${job}</span>',
    width: '100%',
    cssClass: 'custom',
    placeholder: 'Select an employee',
    popupHeight: '250px'
});

dropDownTree.appendTo('#ddtElement');
```

**Result**: 
- Popup items show full template with name and job
- Selected value in input field shows: "Anne Dodsworth - Developer"

### Value Template for Complex Display

```typescript
let productData = [
    { "id": 1, "name": "Laptop", "price": "$999", "stock": "5" },
    { "id": 2, "name": "Phone", "price": "$599", "stock": "12" },
    { "id": 3, "name": "Tablet", "price": "$399", "stock": "0" }
];

let dropDownTree = new DropDownTree({
    fields: { dataSource: productData, text: 'name', value: 'id' },
    itemTemplate: '<div class="item"><span>${name}</span><span class="detail">${price} (${stock} in stock)</span></div>',
    valueTemplate: '<div class="selected"><strong>${name}</strong><span class="price">${price}</span></div>',
    width: '100%'
});

dropDownTree.appendTo('#ddtElement');
```

---

## Header Template

### Add Custom Header Content

Display custom content in the popup header:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let categoryData = [
    { "id": 1, "name": "Electronics", "hasChild": true, "expanded": true },
    { "id": 2, "pid": 1, "name": "Mobiles" },
    { "id": 3, "pid": 1, "name": "Laptops" },
    { "id": 4, "name": "Furniture", "hasChild": true },
    { "id": 5, "pid": 4, "name": "Chair" },
    { "id": 6, "pid": 4, "name": "Table" }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: categoryData,
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild'
    },
    headerTemplate: '<div class="e-header">Select a Category</div>',
    width: '100%',
    placeholder: 'Choose category'
});

dropDownTree.appendTo('#ddtElement');
```

### Header Template with Functionality

```typescript
let dropDownTree = new DropDownTree({
    fields: { dataSource: categoryData, text: 'name', value: 'id', parentValue: 'pid' },
    headerTemplate: `<div class="e-header-content">
                        <h3>Category List</h3>
                        <p class="e-header-desc">Select a category from below</p>
                     </div>`,
    width: '100%'
});

dropDownTree.appendTo('#ddtElement');
```

### Header CSS

```css
.e-header {
    padding: 12px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    font-weight: 500;
    color: #333;
}

.e-header-content {
    padding: 12px;
}

.e-header-content h3 {
    margin: 0 0 4px 0;
    font-size: 14px;
}

.e-header-desc {
    margin: 0;
    font-size: 12px;
    color: #999;
}
```

---

## Footer Template

### Add Custom Footer Content

Display custom content at the bottom of the popup:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let employeeData = [
    { "id": 1, "name": "Steven Buchanan", "job": "General Manager", "hasChild": true, "expanded": true },
    { "id": 2, "pid": 1, "name": "Laura Callahan", "job": "Product Manager", "hasChild": true },
    { "id": 3, "pid": 2, "name": "Andrew Fuller", "job": "Team Lead", "hasChild": true },
    { "id": 4, "pid": 3, "name": "Anne Dodsworth", "job": "Developer" }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: employeeData,
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild'
    },
    footerTemplate: `<div class="e-footer">
                        <span>Total employees: ${employeeData.length}</span>
                     </div>`,
    width: '100%',
    placeholder: 'Select an employee',
    popupHeight: '250px'
});

dropDownTree.appendTo('#ddtElement');
```

### Dynamic Footer with Information

```typescript
let dropDownTree = new DropDownTree({
    fields: { dataSource: employeeData, text: 'name', value: 'id', parentValue: 'pid' },
    footerTemplate: '<div class="e-footer"><span class="count">Total: ' + employeeData.length + ' employees</span></div>',
    width: '100%'
});

dropDownTree.appendTo('#ddtElement');
```

### Footer CSS

```css
.e-footer {
    padding: 12px;
    background-color: #f9f9f9;
    border-top: 1px solid #e0e0e0;
    font-size: 12px;
    color: #666;
    text-align: right;
}

.e-footer .count {
    font-weight: 500;
    color: #333;
}
```

---

## No Records Template

### Custom Empty State Message

Display a custom message when no data is available:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let dropDownTree = new DropDownTree({
    dataSource: [],  // Empty data source
    fields: { text: 'name', value: 'id' },
    noRecordsTemplate: '<div class="e-no-records">No items found</div>',
    placeholder: 'Select an item'
});

dropDownTree.appendTo('#ddtElement');
```

### Detailed No Records Template

```typescript
let dropDownTree = new DropDownTree({
    dataSource: [],
    fields: { text: 'name', value: 'id' },
    noRecordsTemplate: `<div class="e-no-records">
                           <div class="e-no-icon">📭</div>
                           <div class="e-no-title">No Items Available</div>
                           <div class="e-no-desc">Your search did not return any results.</div>
                        </div>`,
    placeholder: 'Search items'
});

dropDownTree.appendTo('#ddtElement');
```

### No Records CSS

```css
.e-no-records {
    padding: 20px;
    text-align: center;
    color: #999;
}

.e-no-icon {
    font-size: 32px;
    margin-bottom: 8px;
}

.e-no-title {
    font-weight: 500;
    margin-bottom: 4px;
}

.e-no-desc {
    font-size: 12px;
}
```

---

## Action Failure Template

### Handle Data Fetch Errors

Display a custom message when data loading fails:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

let dataManager = new DataManager({
    url: 'https://api.example.com/categories',
    adaptor: new WebApiAdaptor()
});

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: dataManager,
        id: 'id',
        text: 'name',
        value: 'id'
    },
    actionFailureTemplate: '<div class="e-action-failure">Failed to load data. Please try again.</div>',
    placeholder: 'Select a category'
});

dropDownTree.appendTo('#ddtElement');
```

### Detailed Failure Template

```typescript
let dropDownTree = new DropDownTree({
    fields: { dataSource: dataManager, id: 'id', text: 'name', value: 'id' },
    actionFailureTemplate: `<div class="e-action-failure">
                               <div class="e-failure-icon">❌</div>
                               <div class="e-failure-title">Data Load Failed</div>
                               <div class="e-failure-desc">We couldn't load the data. Check your connection.</div>
                            </div>`,
    placeholder: 'Select a category'
});

dropDownTree.appendTo('#ddtElement');
```

### Failure Template CSS

```css
.e-action-failure {
    padding: 20px;
    text-align: center;
    color: #d32f2f;
}

.e-failure-icon {
    font-size: 32px;
    margin-bottom: 8px;
}

.e-failure-title {
    font-weight: 500;
    margin-bottom: 4px;
}

.e-failure-desc {
    font-size: 12px;
    color: #666;
}
```

---

## Template Expression Syntax

### Basic Field Binding

Use `${fieldName}` syntax to bind data fields:

```typescript
// Data: { id: 1, name: 'John', email: 'john@example.com' }
itemTemplate: '<div>${name} (${email})</div>'

// Result: John (john@example.com)
```

### Conditional Expressions

Use ternary operator in templates:

```typescript
// Data: { name: 'Product', price: 99, inStock: true }
itemTemplate: '<div>${name} - ${inStock ? "In Stock" : "Out of Stock"}</div>'

// Result: Product - In Stock
```

### Text Formatting

```typescript
// Data: { amount: 1000 }
itemTemplate: '<div>Price: $${amount}</div>'

// Result: Price: $1000
```

### HTML Content in Templates

Avoid HTML escaping by using direct content:

```typescript
let data = [
    { id: 1, name: 'Item 1', icon: '<span class="e-icons e-check"></span>' },
    { id: 2, name: 'Item 2', icon: '<span class="e-icons e-edit"></span>' }
];

// Note: Content with HTML should be properly escaped in production
itemTemplate: '${icon} ${name}'
```

---

## Advanced Customization

### Combined Templates (Item + Value + Header + Footer)

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let data = [
    { "id": 1, "name": "Steven Buchanan", "job": "General Manager", "hasChild": true },
    { "id": 2, "pid": 1, "name": "Laura Callahan", "job": "Product Manager" }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: data,
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild'
    },
    
    // Item in popup list
    itemTemplate: '<div class="e-template-item"><span class="e-name">${name}</span><span class="e-job">${job}</span></div>',
    
    // Selected value in input
    valueTemplate: '<span class="e-template-value">${name} (${job})</span>',
    
    // Popup header
    headerTemplate: '<div class="e-template-header">Select an Employee</div>',
    
    // Popup footer
    footerTemplate: '<div class="e-template-footer">Total: ' + data.length + '</div>',
    
    width: '100%',
    cssClass: 'custom-templates',
    placeholder: 'Choose an employee',
    popupHeight: '300px'
});

dropDownTree.appendTo('#ddtElement');
```

### CSS for Combined Templates

```css
.custom-templates .e-template-item {
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
}

.custom-templates .e-name {
    font-weight: 500;
    color: #333;
}

.custom-templates .e-job {
    font-size: 12px;
    color: #999;
}

.custom-templates .e-template-value {
    font-weight: 500;
    color: #0066cc;
}

.custom-templates .e-template-header {
    padding: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 500;
}

.custom-templates .e-template-footer {
    padding: 8px 12px;
    background-color: #f5f5f5;
    text-align: right;
    font-size: 12px;
    color: #666;
}
```

### Dynamic Template Updates

```typescript
let dropDownTree = new DropDownTree({
    fields: { dataSource: data, text: 'name', value: 'id' },
    itemTemplate: '<div>${name}</div>',
    width: '100%'
});

dropDownTree.appendTo('#ddtElement');

// Change template dynamically
dropDownTree.itemTemplate = '<div class="updated"><strong>${name}</strong></div>';
dropDownTree.refresh();  // Refresh to apply changes
```

---

## Best Practices

1. **Keep templates simple** - Complex logic should be handled in code, not templates
2. **Use CSS classes** - Apply styling through CSS instead of inline styles
3. **Test with real data** - Ensure templates handle all data variations
4. **Handle missing fields** - Use conditional logic for optional data fields
5. **Performance** - Avoid heavy DOM operations in templates
6. **Accessibility** - Ensure templates are readable and keyboard navigable

---

## Custom Template for Multi-Select Display

### Overview

When you enable multi-select with checkboxes, the default behavior shows all selected item names in the input field or value box. For improved user experience, you can use the `customTemplate` property with `mode: 'Custom'` to display a custom message instead—such as a count of selected items.

**Benefits:**
- Cleaner UI when many items are selected
- Custom messaging (e.g., "3 items selected" instead of "Item1, Item2, Item3")
- Total control over the display format
- Consistent look across different selection sizes

### Basic Implementation

Use `mode: 'Custom'` and `customTemplate` to override the default display:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let treeData = [
    { id: 1, name: 'Documents', hasChild: true },
    { id: 2, pid: 1, name: 'Reports' },
    { id: 3, pid: 1, name: 'Invoices' },
    { id: 4, pid: 1, name: 'Contracts' },
    { id: 5, name: 'Images', hasChild: true },
    { id: 6, pid: 5, name: 'Profile Pictures' },
    { id: 7, pid: 5, name: 'Screenshots' }
];

let dropDownTree = new DropDownTree({
    dataSource: treeData,
    fields: { text: 'name', value: 'id', parentValue: 'pid', hasChildren: 'hasChild' },
    mode: 'Custom',
    customTemplate: '${value.length} item(s) selected',
    showCheckBox: true
});

dropDownTree.appendTo('#ddtElement');
```

**Result:** When user selects 3 items, the input shows "3 item(s) selected" instead of the item names.

### Example 1: Count-Based Display

Display the number of items with conditional wording:

```typescript
let dropDownTree = new DropDownTree({
    dataSource: treeData,
    fields: { text: 'name', value: 'id', parentValue: 'pid' },
    mode: 'Custom',
    customTemplate: '${value.length === 1 ? value.length + " item" : value.length + " items"}',
    showCheckBox: true,
    treeSettings: { autoCheck: true }
});

dropDownTree.appendTo('#ddtElement');
```

**Output Examples:**
- 1 item selected → "1 item"
- 2 items selected → "2 items"
- 5 items selected → "5 items"

### Example 2: Detailed Custom Template

Show selected items with formatting:

```typescript
let dropDownTree = new DropDownTree({
    dataSource: treeData,
    fields: { 
        text: 'name', 
        value: 'id', 
        parentValue: 'pid', 
        hasChildren: 'hasChild' 
    },
    mode: 'Custom',
    customTemplate: 'Selected: ${value.map(v => treeData.find(d => d.id === v)?.name).join(", ")}',
    showCheckBox: true
});

dropDownTree.appendTo('#ddtElement');
```

**Output Examples:**
- Selected: Reports, Invoices
- Selected: Profile Pictures, Screenshots

### Example 3: Category-Aware Display

Show counts by category or type:

```typescript
interface DataItem {
    id: number;
    name: string;
    pid?: number;
    category?: string;
    hasChild?: boolean;
}

let categorizedData: DataItem[] = [
    { id: 1, name: 'Documents', category: 'files', hasChild: true },
    { id: 2, pid: 1, name: 'Reports', category: 'files' },
    { id: 3, pid: 1, name: 'Invoices', category: 'files' },
    { id: 4, name: 'Images', category: 'media', hasChild: true },
    { id: 5, pid: 4, name: 'Photos', category: 'media' }
];

let dropDownTree = new DropDownTree({
    dataSource: categorizedData,
    fields: { 
        text: 'name', 
        value: 'id', 
        parentValue: 'pid',
        hasChildren: 'hasChild'
    },
    mode: 'Custom',
    customTemplate: `
        Files: ${value.filter(id => {
            let item = categorizedData.find(d => d.id === id);
            return item?.category === 'files';
        }).length}, 
        Media: ${value.filter(id => {
            let item = categorizedData.find(d => d.id === id);
            return item?.category === 'media';
        }).length}
    `,
    showCheckBox: true
});

dropDownTree.appendTo('#ddtElement');
```

**Output Example:** "Files: 3, Media: 2"

### Configuration Options

| Property | Type | Description |
|----------|------|-------------|
| `mode` | string | Set to `'Custom'` to enable custom template display |
| `customTemplate` | string | Template string using `${value}` expression |
| `showCheckBox` | boolean | Enable checkboxes for multi-select |
| `value` | object[] | Array of selected IDs available in template |

### Template Expression Variables

Within `customTemplate`:
- **`${value}`** - Array of selected item IDs
- **`${value.length}`** - Total count of selected items
- **Access to parent data** - Reference parent component properties as needed

### When to Use Custom Templates

**Use Custom Template When:**
- You need a count-based summary instead of full list
- Selected items change frequently and affect UI space
- You want localized or formatted message (e.g., "3/10 items selected")
- You're building reports or dashboards where space is limited

**Use Default Display When:**
- Full names are important for user confirmation
- Selection list is always short (2-5 items)
- Users need to see exactly which items are selected
- Accessibility requires full text display

### Dynamic Template Updates

Change template based on selection state:

```typescript
let dropDownTree = new DropDownTree({
    dataSource: treeData,
    fields: { text: 'name', value: 'id', parentValue: 'pid' },
    mode: 'Custom',
    customTemplate: '${value.length === 0 ? "No items selected" : value.length + " items selected"}',
    showCheckBox: true,
    change: (args) => {
        // Template automatically updates on selection change
        console.log('Selected count:', args.value.length);
    }
});

dropDownTree.appendTo('#ddtElement');
```

### Combining with Other Features

Use custom templates with additional DropDownTree features:

```typescript
let dropDownTree = new DropDownTree({
    dataSource: treeData,
    fields: { text: 'name', value: 'id', parentValue: 'pid', hasChildren: 'hasChild' },
    mode: 'Custom',
    customTemplate: '${value.length} item(s) selected',
    showCheckBox: true,
    autoCheck: true,  // Auto-check child when parent is checked
    treeSettings: {
        expandOn: 'Click',
        loadOnDemand: false
    },
    allowMultiSelection: true,
    popupHeight: '300px'
});

dropDownTree.appendTo('#ddtElement');
```

Output displays as: **"2 item(s) selected"** with full multi-select functionality.
