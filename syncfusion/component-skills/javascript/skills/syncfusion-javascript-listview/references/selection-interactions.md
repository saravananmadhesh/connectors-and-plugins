# Selection and User Interactions

## Table of Contents
- [Selection Modes](#selection-modes)
- [Checkbox Selection](#checkbox-selection)
- [Programmatic Selection](#programmatic-selection)
- [Selection Events](#selection-events)
- [Enable/Disable Items](#enabledisable-items)
- [Show/Hide Items](#showhide-items)
- [Item Manipulation](#item-manipulation)

## Selection Modes

### Single Selection (Default)

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const data = [
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' }
];

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' }
    // Single selection is default
});

listView.appendTo('#listview');
```

### Multiple Selection

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    template: '<input type="checkbox" /> ${text}'
});

listView.appendTo('#listview');
```

### No Selection

```typescript
// Disable selection by not handling select events
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        args.cancel = true; // Cancel selection
    }
});

listView.appendTo('#listview');
```

## Checkbox Selection

### Show Checkboxes

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    showCheckBox: true
});

listView.appendTo('#listview');
```

### Checkbox on Right Side

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    showCheckBox: true,
    checkBoxPosition: 'Right'
});

listView.appendTo('#listview');
```

### Checkbox on Left Side (Default)

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    showCheckBox: true,
    checkBoxPosition: 'Left'
});

listView.appendTo('#listview');
```

### Get Checked Items

```typescript
function getCheckedItems() {
    const checked = listView.getSelectedItems();
    console.log('Checked items:', checked);
    return checked;
}

// Call after user selects items
const button = document.getElementById('get-checked');
button.addEventListener('click', getCheckedItems);
```

### Check All / Uncheck All

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    showCheckBox: true
});

listView.appendTo('#listview');

// Check all items
function checkAll() {
    listView.checkAllItems();
}

// Uncheck all items
function uncheckAll() {
    listView.uncheckAllItems();
}

document.getElementById('check-all').addEventListener('click', checkAll);
document.getElementById('uncheck-all').addEventListener('click', uncheckAll);
```

### Check Specific Item

```typescript
// Get all list items
const items = document.querySelectorAll('.e-list-item');

// Check first item
listView.checkItem(items[0]);

// Uncheck first item
listView.uncheckItem(items[0]);
```

### Checked Status Template

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { 
        id: 'id', 
        text: 'text',
        isChecked: 'checked'  // Map checkbox state
    },
    showCheckBox: true,
    select: (args) => {
        console.log('Item checked:', args.isChecked);
    }
});

listView.appendTo('#listview');
```

## Programmatic Selection

### Select Item by Index

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

// Select first item
const items = document.querySelectorAll('.e-list-item');
listView.selectItem(items[0]);
```

### Select Multiple Items

```typescript
// Select multiple items
const items = document.querySelectorAll('.e-list-item');
listView.selectMultipleItems([items[0], items[2]]);
```

### Deselect Item

```typescript
const items = document.querySelectorAll('.e-list-item');
listView.unselectItem(items[0]);
```

### Get Selected Item

```typescript
const selectedItem = listView.getSelectedItem();
console.log('Selected:', selectedItem);
```

### Get Selected Items

```typescript
const selectedItems = listView.getSelectedItems();
console.log('Selected items:', selectedItems);
```

## Selection Events

### Select Event

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        console.log('Item selected:');
        console.log('Data:', args.data);
        console.log('Index:', args.index);
        console.log('Item Element:', args.item);
        console.log('Is Checked:', args.isChecked);
    }
});

listView.appendTo('#listview');
```

### Cancel Selection

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        if (args.data.id === 'restricted') {
            args.cancel = true;  // Prevent selection
        }
    }
});

listView.appendTo('#listview');
```

### Multiple Selection Handler

```typescript
const selectedItems = [];

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        if (args.isChecked) {
            selectedItems.push(args.data);
        } else {
            selectedItems = selectedItems.filter(item => item.id !== args.data.id);
        }
        console.log('Currently selected:', selectedItems);
    }
});

listView.appendTo('#listview');
```

### Track Selection Changes

```typescript
let previousSelection = null;

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        console.log('Previous:', previousSelection);
        console.log('Current:', args.data);
        previousSelection = args.data;
    }
});

listView.appendTo('#listview');
```

## Enable/Disable Items

### Check if Item is Enabled

```typescript
const items = document.querySelectorAll('.e-list-item');
const isEnabled = !items[0].classList.contains('e-disabled');
```

### Disable Specific Item

```typescript
const items = document.querySelectorAll('.e-list-item');
listView.disableItem(items[0]);
```

### Enable Specific Item

```typescript
const items = document.querySelectorAll('.e-list-item');
listView.enableItem(items[0]);
```

### Disable Based on Condition

```typescript
function disableRestricted() {
    const items = document.querySelectorAll('.e-list-item');
    data.forEach((item, index) => {
        if (item.restricted === true) {
            listView.disableItem(items[index]);
        }
    });
}

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    actionComplete: disableRestricted
});

listView.appendTo('#listview');
```

### Toggle Item State

```typescript
function toggleItemState(index) {
    const items = document.querySelectorAll('.e-list-item');
    if (items[index].classList.contains('e-disabled')) {
        listView.enableItem(items[index]);
    } else {
        listView.disableItem(items[index]);
    }
}
```

## Show/Hide Items

### Hide Item

```typescript
const items = document.querySelectorAll('.e-list-item');
listView.hideItem(items[0]);
```

### Show Item

```typescript
const items = document.querySelectorAll('.e-list-item');
listView.showItem(items[0]);
```

### Hide by Condition

```typescript
function hideInactive() {
    const items = document.querySelectorAll('.e-list-item');
    data.forEach((item, index) => {
        if (item.active === false) {
            listView.hideItem(items[index]);
        }
    });
}

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    actionComplete: hideInactive
});

listView.appendTo('#listview');
```

### Show All Items

```typescript
function showAll() {
    const items = document.querySelectorAll('.e-list-item');
    items.forEach(item => {
        if (item.style.display === 'none') {
            listView.showItem(item);
        }
    });
}
```

### Filter by Visibility

```typescript
function filterItems(visible = true) {
    const items = document.querySelectorAll('.e-list-item');
    data.forEach((item, index) => {
        if ((item.visible === visible) === false) {
            listView.hideItem(items[index]);
        } else {
            listView.showItem(items[index]);
        }
    });
}
```

## Item Manipulation

### Add Item

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

// Add new item
const newItem = { id: '4', text: 'Item 4' };
listView.addItem(newItem);
```

### Add Item at Specific Position

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

// Add item at index 2
const newItem = { id: '4', text: 'Item 4' };
const items = document.querySelectorAll('.e-list-item');
if (items[1]) {
    listView.addItem(newItem, items[1]);
}
```

### Remove Item

```typescript
const items = document.querySelectorAll('.e-list-item');
listView.removeItem(items[0]);
```

### Remove Multiple Items

```typescript
const itemsToRemove = document.querySelectorAll('.e-list-item[data-remove="true"]');
listView.removeMultipleItems(itemsToRemove);
```

### Find Item

```typescript
// Find item by value
const item = listView.findItem('Item 1');
console.log('Found:', item);
```

### Reorder Items (Drag and Drop)

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    template: '<span class="e-list-item-text">${text}</span>',
    actionBegin: (args) => {
        if (args.requestType === 'itemSelected') {
            console.log('Item reordered:', args);
        }
    }
});

listView.appendTo('#listview');
```

## Interactive Checklist Pattern

```typescript
interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
}

const todos: ChecklistItem[] = [
    { id: '1', text: 'Complete Report', completed: false },
    { id: '2', text: 'Review Code', completed: true },
    { id: '3', text: 'Update Docs', completed: false }
];

const listView = new ListView({
    dataSource: todos,
    fields: { 
        id: 'id', 
        text: 'text',
        isChecked: 'completed'
    },
    showCheckBox: true,
    template: `
        <div class="checklist-item">
            <span class="${'completed' ? 'strikethrough' : ''}">${text}</span>
        </div>
    `,
    select: (args) => {
        // Update completed status
        const item = args.data as ChecklistItem;
        item.completed = args.isChecked;
        console.log(`${item.text} - Completed: ${item.completed}`);
    }
});

listView.appendTo('#listview');
```

## Common Selection Patterns

### Bulk Operations

```typescript
function deleteSelected() {
    const selected = listView.getSelectedItems();
    const selectedIndices = selected.indexes || [];
    
    selectedIndices.reverse().forEach(index => {
        listView.removeItem(document.querySelectorAll('.e-list-item')[index]);
    });
}

document.getElementById('delete-btn').addEventListener('click', deleteSelected);
```

### Export Selected

```typescript
function exportSelected() {
    const selected = listView.getSelectedItems();
    const json = JSON.stringify(selected.data, null, 2);
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-items.json';
    a.click();
}
```

For more information on templates, see templates-rendering.md.

## Hiding Checkboxes

### Hide Checkbox for Specific Items

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const data = [
    { id: '1', text: 'Item 1', canSelect: true },
    { id: '2', text: 'Item 2', canSelect: false },
    { id: '3', text: 'Item 3', canSelect: true },
    { id: '4', text: 'Item 4', canSelect: false }
];

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    showCheckBox: true,
    checkBoxPosition: 'Left',
    template: getItemTemplate,
    actionComplete: hideCheckboxesForItems
});

listView.appendTo('#listview');

function getItemTemplate(data) {
    return `
        <div class="item-content" data-can-select="${data.canSelect}">
            <span>${data.text}</span>
        </div>
    `;
}

function hideCheckboxesForItems() {
    const items = document.querySelectorAll('.e-list-item');
    items.forEach((item, index) => {
        if (!data[index].canSelect) {
            const checkbox = item.querySelector('.e-checkbox-wrapper');
            if (checkbox) {
                checkbox.style.display = 'none';
                checkbox.style.visibility = 'hidden';
                item.style.paddingLeft = '16px';
                item.classList.add('disabled-checkbox-item');
            }
        }
    });
}
```

### Hide Checkbox with CSS

```css
/* Hide checkboxes for specific items */
.e-list-item.e-disabled .e-checkbox-wrapper {
    display: none !important;
}

/* Adjust padding when checkbox is hidden */
.e-list-item.disabled-checkbox-item {
    padding-left: 16px;
}

/* Alternative: Make checkbox invisible but preserve space */
.e-list-item.hidden-checkbox .e-checkbox-wrapper {
    visibility: hidden;
    pointer-events: none;
}
```

### Dynamic Checkbox Visibility

```typescript
// Show or hide checkbox based on user role
function updateCheckboxVisibility(userRole) {
    const items = document.querySelectorAll('.e-list-item');
    
    items.forEach((item, index) => {
        const checkbox = item.querySelector('.e-checkbox-wrapper');
        
        if (userRole === 'admin' || data[index].canSelect) {
            checkbox.style.display = 'flex';
            item.classList.remove('disabled-checkbox-item');
        } else {
            checkbox.style.display = 'none';
            item.classList.add('disabled-checkbox-item');
        }
    });
}

// Update checkboxes when role changes
document.getElementById('role-selector').addEventListener('change', (e) => {
    updateCheckboxVisibility(e.target.value);
});
```

### Conditional Checkbox Display

```typescript
// Show checkbox only for important items
const importantItems = [1, 3];

function showCheckboxOnlyForImportant() {
    const items = document.querySelectorAll('.e-list-item');
    items.forEach((item, index) => {
        const checkbox = item.querySelector('.e-checkbox-wrapper');
        
        if (importantItems.includes(index)) {
            checkbox.style.display = 'flex';
        } else {
            checkbox.style.display = 'none';
        }
    });
}

listView.addEventListener('actionComplete', showCheckboxOnlyForImportant);
```

### Group-Based Checkbox Hiding

```typescript
// Different checkbox visibility for different groups
const checkboxConfig = {
    'admin': true,
    'user': false,
    'guest': false
};

function configureCheckboxByGroup(group) {
    const showCheckbox = checkboxConfig[group];
    const items = document.querySelectorAll('.e-list-item');
    
    items.forEach(item => {
        const checkbox = item.querySelector('.e-checkbox-wrapper');
        if (showCheckbox) {
            checkbox.style.display = 'flex';
            item.classList.remove('checkbox-hidden');
        } else {
            checkbox.style.display = 'none';
            item.classList.add('checkbox-hidden');
        }
    });
}
```
