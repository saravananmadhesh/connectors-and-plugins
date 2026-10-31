# Component Integration

## Table of Contents
- [Overview](#overview)
- [Integration Patterns](#integration-patterns)
- [ListView Integration](#listview-integration)
- [DropDownList Integration](#dropdownlist-integration)
- [Multiple Component Integration](#multiple-component-integration)
- [Composite UI Layouts](#composite-ui-layouts)
- [Dynamic Content Management](#dynamic-content-management)
- [Event Coordination](#event-coordination)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting Component Integration](#troubleshooting-component-integration)
- [See Also](#see-also)

## Overview

The Card component can host other Syncfusion controls to create composite UI layouts. This enables building complex interfaces by combining the Card's structure with interactive components like ListView, DropDownList, and others.

---

## Integration Patterns

### Basic Integration Pattern

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Component Container</div>
        </div>
    </div>
    <div class="e-card-content">
        <!-- Integrated component goes here -->
        <div id="component-target"></div>
    </div>
</div>
```

### Integration Best Practices

1. **Separate Content Areas**: Use `e-card-content` for component container
2. **Style Coordination**: Ensure component styling matches card theme
3. **Responsive Layout**: Adjust component size with card dimensions
4. **Event Handling**: Manage component events within card context

---

## ListView Integration

### To-Do List Example

The most common integration is using ListView to create list-based content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card with ListView</title>
    <link href="url" rel="stylesheet">
    <style>
        body { margin: 20px; }
        .e-card { max-width: 400px; }
    </style>
</head>
<body>
    <div class="e-card" id="basic">
        <div class="e-card-title">To-Do List</div>
        <div class="e-card-separator"></div>
        <div class="e-card-content">
            <div id="element"></div>
        </div>
    </div>

    <script src="url"></script>
    <script>
        // ListView will be initialized here
    </script>
</body>
</html>
```

### TypeScript Implementation

```typescript
import { ListView } from '@syncfusion/ej2-lists';

// Define the array of JSON data
let todoList: { [key: string]: Object }[] = [
    { todoList: 'Pay Bills' },
    { todoList: 'Call Chris' },
    { todoList: 'Meet Andrew' },
    { todoList: 'Visit Manager' },
    { todoList: 'Customer Meeting' },
];

// Initialize ListView component
let listviewInstance: ListView = new ListView({
    dataSource: todoList,
    // Map the appropriate columns to fields property
    fields: { text: 'todoList' },
    showCheckBox: true,
});

// Render initialized ListView
listviewInstance.appendTo("#element");
```

### List with Custom Templates

```typescript
import { ListView } from '@syncfusion/ej2-lists';

interface ListItem {
    id: number;
    task: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
}

let tasks: ListItem[] = [
    { id: 1, task: 'Design new dashboard', completed: false, priority: 'high' },
    { id: 2, task: 'Review pull requests', completed: true, priority: 'medium' },
    { id: 3, task: 'Update documentation', completed: false, priority: 'low' },
];

let listView: ListView = new ListView({
    dataSource: tasks,
    fields: { text: 'task' },
    template: '<div class="e-list-item">' +
              '<input type="checkbox" ${completed ? "checked" : ""} />' +
              '<span>${task}</span>' +
              '<span class="priority-${priority}">${priority}</span>' +
              '</div>',
});

listView.appendTo('#element');
```

---

## DropDownList Integration

### Selection Component in Card

```html
<div class="e-card" style="max-width: 400px;">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Image Title Position</div>
        </div>
    </div>
    <div class="e-card-image" style="
        background-image: url('nodejs.png');
        background-size: cover;
        height: 200px;
    ">
        <div class="e-card-title">Node.js</div>
    </div>
    <div class="e-card-content">
        <label for="title_position">Choose Position:</label>
        <select id="title_position">
            <option value="bottom-left">Bottom Left</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-right">Bottom Right</option>
        </select>
    </div>
</div>
```

### DropDownList Implementation

```typescript
import { DropDownList } from '@syncfusion/ej2-dropdowns';

// Initialize DropDownList component
let dropDownListObject: DropDownList = new DropDownList({
    placeholder: "Select Position",
    change: changed,
});

// Render initialized DropDownList
dropDownListObject.appendTo('#title_position');

function changed(e: any) {
    let cardEle = document.querySelector('.e-card');
    let titleEle = cardEle.querySelector('.e-card-image .e-card-title');
    
    // Clear existing classes
    titleEle.className = '';
    titleEle.classList.add('e-card-title');
    titleEle.classList.add('e-card-' + e.value);
    
    // Apply inline styles based on position
    const positions: { [key: string]: string } = {
        'bottom-left': 'bottom: 0; left: 0;',
        'top-left': 'top: 0; left: 0;',
        'top-right': 'top: 0; right: 0;',
        'bottom-right': 'bottom: 0; right: 0;',
    };
    
    titleEle.style.cssText = positions[e.value] || '';
}
```

---

## Multiple Component Integration

### Dashboard Card with Multiple Controls

```html
<div class="e-card" style="max-width: 600px;">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Dashboard Summary</div>
        </div>
    </div>
    
    <div class="e-card-content">
        <h3>Filter Data</h3>
        <select id="category-dropdown">
            <option value="">Select Category</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="support">Support</option>
        </select>
    </div>
    
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        <h3>Recent Activities</h3>
        <div id="activity-list"></div>
    </div>
</div>
```

### Multiple Component Initialization

```typescript
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ListView } from '@syncfusion/ej2-lists';

// Initialize DropDownList
let categoryDropdown: DropDownList = new DropDownList({
    placeholder: "Select a category",
    popupHeight: '200px',
    change: onCategoryChange,
});
categoryDropdown.appendTo('#category-dropdown');

// Initialize ListView
let activities = [
    { id: 1, activity: 'New order received' },
    { id: 2, activity: 'Customer contacted' },
    { id: 3, activity: 'Payment processed' },
];

let activityList: ListView = new ListView({
    dataSource: activities,
    fields: { text: 'activity' },
});
activityList.appendTo('#activity-list');

function onCategoryChange(e: any) {
    // Update list based on selected category
    console.log('Category changed:', e.value);
}
```

---

## Composite UI Layouts

### Settings Panel

```html
<div class="e-card" style="max-width: 500px;">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">User Settings</div>
        </div>
    </div>
    
    <div class="e-card-content">
        <label>Theme:</label>
        <select id="theme-selector">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
        </select>
    </div>
    
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        <label>Notifications:</label>
        <div id="notification-settings"></div>
    </div>
    
    <div class="e-card-actions">
        <button class="e-card-btn">Save</button>
        <button class="e-card-btn">Cancel</button>
    </div>
</div>
```

### Filter and Search Panel

```html
<div class="e-card" style="max-width: 500px;">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Advanced Search</div>
        </div>
    </div>
    
    <div class="e-card-content">
        <div style="margin-bottom: 12px;">
            <label>Search Term:</label>
            <input type="text" id="search-input" placeholder="Enter search term">
        </div>
        
        <div style="margin-bottom: 12px;">
            <label>Filter by Category:</label>
            <select id="filter-category">
                <option value="">All Categories</option>
                <option value="product">Product</option>
                <option value="blog">Blog</option>
                <option value="video">Video</option>
            </select>
        </div>
        
        <div>
            <label>Sort by:</label>
            <select id="sort-by">
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="rating">Rating</option>
            </select>
        </div>
    </div>
    
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        <h4>Results</h4>
        <div id="search-results"></div>
    </div>
    
    <div class="e-card-actions">
        <button class="e-card-btn">Search</button>
        <button class="e-card-btn">Reset</button>
    </div>
</div>
```

---

## Dynamic Content Management

### Add/Remove Items from List

```typescript
import { ListView } from '@syncfusion/ej2-lists';

let itemList: ListView;

function initializeList() {
    let items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ];
    
    itemList = new ListView({
        dataSource: items,
        fields: { text: 'name' },
    });
    itemList.appendTo('#item-list');
}

function addItem(itemName: string) {
    // Get current data
    let currentData = itemList.dataSource as any[];
    
    // Add new item
    currentData.push({
        id: currentData.length + 1,
        name: itemName,
    });
    
    // Rebind the list
    itemList.dataSource = currentData;
}

function removeItem(index: number) {
    let currentData = itemList.dataSource as any[];
    currentData.splice(index, 1);
    itemList.dataSource = currentData;
}
```

### Card with Input Form

```html
<div class="e-card" style="max-width: 400px;">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Add New Item</div>
        </div>
    </div>
    
    <div class="e-card-content">
        <form id="item-form">
            <div style="margin-bottom: 12px;">
                <input type="text" id="item-name" placeholder="Item name" required>
            </div>
            <div style="margin-bottom: 12px;">
                <textarea id="item-description" placeholder="Description"></textarea>
            </div>
            <div style="margin-bottom: 12px;">
                <input type="number" id="item-quantity" placeholder="Quantity" required>
            </div>
        </form>
    </div>
    
    <div class="e-card-actions">
        <button class="e-card-btn" onclick="submitForm()">Add Item</button>
        <button class="e-card-btn" onclick="clearForm()">Clear</button>
    </div>
</div>
```

### Form Handling

```typescript
interface FormItem {
    name: string;
    description: string;
    quantity: number;
}

function submitForm() {
    const name = (document.getElementById('item-name') as HTMLInputElement).value;
    const description = (document.getElementById('item-description') as HTMLTextAreaElement).value;
    const quantity = parseInt((document.getElementById('item-quantity') as HTMLInputElement).value);
    
    if (!name || !quantity) {
        alert('Please fill in required fields');
        return;
    }
    
    const newItem: FormItem = { name, description, quantity };
    console.log('New item:', newItem);
    
    // Add to list or send to server
    addItem(newItem);
}

function clearForm() {
    (document.getElementById('item-form') as HTMLFormElement).reset();
}
```

---

## Event Coordination

### Cross-Component Communication

```typescript
// Card with multiple components that communicate
class CardDashboard {
    private filterDropdown: DropDownList;
    private resultList: ListView;
    
    initialize() {
        this.initializeFilter();
        this.initializeResults();
    }
    
    private initializeFilter() {
        this.filterDropdown = new DropDownList({
            dataSource: ['All', 'Active', 'Inactive'],
            change: (e) => this.onFilterChange(e.value),
        });
        this.filterDropdown.appendTo('#filter');
    }
    
    private initializeResults() {
        this.resultList = new ListView({
            dataSource: this.getInitialData(),
        });
        this.resultList.appendTo('#results');
    }
    
    private onFilterChange(filterValue: string) {
        // Update results based on filter
        const filteredData = this.getFilteredData(filterValue);
        this.resultList.dataSource = filteredData;
    }
    
    private getInitialData() {
        return [
            { id: 1, name: 'Item 1', status: 'Active' },
            { id: 2, name: 'Item 2', status: 'Inactive' },
        ];
    }
    
    private getFilteredData(filter: string) {
        const allData = this.getInitialData();
        if (filter === 'All') return allData;
        return allData.filter(item => item.status === filter);
    }
}

// Initialize on page load
const dashboard = new CardDashboard();
dashboard.initialize();
```

---

## Performance Considerations

### Optimizing Component Rendering

```typescript
// Virtual scrolling for large lists
let largeList: ListView = new ListView({
    dataSource: generateLargeDataset(10000),
    fields: { text: 'name' },
    enableVirtualization: true,
    height: '300px',
});

largeList.appendTo('#large-list');

function generateLargeDataset(count: number) {
    const data = [];
    for (let i = 1; i <= count; i++) {
        data.push({ id: i, name: `Item ${i}` });
    }
    return data;
}
```

### Lazy Loading Content

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Lazy Loading List</div>
        </div>
    </div>
    <div class="e-card-content">
        <div id="lazy-list"></div>
        <button class="e-card-btn" onclick="loadMore()">Load More</button>
    </div>
</div>
```

---

## Troubleshooting Component Integration

### Issue: Component not rendering
**Solution**: Ensure component is initialized after DOM is ready:
```typescript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components here
});
```

### Issue: Styling conflicts
**Solution**: Use card-scoped styling:
```css
.e-card .e-list-item {
    padding: 12px;
}
```

### Issue: Event handlers not working
**Solution**: Check component initialization and event binding:
```typescript
let dropdown = new DropDownList({
    change: (e) => { console.log('Changed:', e.value); }
});
```

---

## See Also
- [Getting Started](getting-started.md) - Basic setup
- [Action Buttons](action-buttons.md) - Button integration
- [Customization and Styling](customization-and-styling.md) - Component styling
