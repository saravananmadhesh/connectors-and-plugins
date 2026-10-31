# Complete API Reference

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Enumerations](#enumerations)
- [Interfaces and Types](#interfaces-and-types)

---

## Properties

### Core Configuration Properties

#### `dataSource`
Specifies the data to be displayed in the ListView.

**Type:** Array | DataManager | string

**Default:** []

**Example:**
```typescript
const listView = new ListView({
    dataSource: [
        { id: '1', text: 'Item 1' },
        { id: '2', text: 'Item 2' }
    ]
});
```

#### `fields`
Maps data fields to ListView fields.

**Type:** FieldSettings

**Default:** `{ id: 'id', text: 'text' }`

**Example:**
```typescript
const listView = new ListView({
    fields: {
        id: 'itemId',
        text: 'itemName',
        groupBy: 'category',
        htmlAttributes: 'attributes'
    }
});
```

#### `query`
Specifies the query to be executed when binding data.

**Type:** Query

**Default:** null

**Example:**
```typescript
import { Query } from '@syncfusion/ej2-data';
const listView = new ListView({
    dataSource: new DataManager(data),
    query: new Query().where('active', 'equal', true)
});
```

#### `template`
Specifies the template for rendering each list item.

**Type:** string | Function

**Default:** null

**Example:**
```typescript
const listView = new ListView({
    template: '<div>${text}</div>'
    // or
    // template: (data) => `<div>${data.text}</div>`
});
```

#### `headerTemplate`
Specifies the template for rendering the list header.

**Type:** string | Function

**Default:** null

**Example:**
```typescript
const listView = new ListView({
    headerTemplate: '<div class="header"><h3>Items</h3></div>',
    showHeader: true
});
```

#### `groupTemplate`
Specifies the template for rendering group headers.

**Type:** string | Function

**Default:** null

**Example:**
```typescript
const listView = new ListView({
    fields: { groupBy: 'category' },
    groupTemplate: '<div class="group-header">${category}</div>'
});
```

### Display and Layout Properties

#### `height`
Specifies the height of the ListView component.

**Type:** string | number

**Default:** 'auto'

**Example:**
```typescript
const listView = new ListView({
    height: '400px',
    // or
    // height: 400
});
```

#### `width`
Specifies the width of the ListView component.

**Type:** string | number

**Default:** '100%'

**Example:**
```typescript
const listView = new ListView({
    width: '500px'
});
```

#### `showHeader`
Shows or hides the header element.

**Type:** boolean

**Default:** false

**Example:**
```typescript
const listView = new ListView({
    showHeader: true,
    headerTitle: 'My List'
});
```

#### `headerTitle`
Sets the title text of the header.

**Type:** string

**Default:** null

**Example:**
```typescript
const listView = new ListView({
    showHeader: true,
    headerTitle: 'Sports'
});
```

#### `showCheckBox`
Shows or hides checkbox in list items.

**Type:** boolean

**Default:** false

**Example:**
```typescript
const listView = new ListView({
    showCheckBox: true
});
```

#### `checkBoxPosition`
Specifies the position of checkbox in list items.

**Type:** 'Left' | 'Right'

**Default:** 'Left'

**Example:**
```typescript
const listView = new ListView({
    showCheckBox: true,
    checkBoxPosition: 'Right'
});
```

### State and Interaction Properties

#### `enable`
Enables or disables the ListView.

**Type:** boolean

**Default:** true

**Example:**
```typescript
const listView = new ListView({
    enable: true
});
```

#### `enabled`
Gets or sets the enabled state of ListView.

**Type:** boolean

**Default:** true

**Example:**
```typescript
listView.enabled = false;
```

#### `enableVirtualization`
Enables or disables virtual scrolling for rendering large lists.

**Type:** boolean

**Default:** false

**Example:**
```typescript
const listView = new ListView({
    enableVirtualization: true,
    height: '400px',
    dataSource: largeDataSet
});
```

#### `enablePersistence`
Persists ListView state to localStorage.

**Type:** boolean

**Default:** false

**Example:**
```typescript
const listView = new ListView({
    enablePersistence: true
});
```

#### `enableRtl`
Enables right-to-left direction for the ListView.

**Type:** boolean

**Default:** false

**Example:**
```typescript
const listView = new ListView({
    enableRtl: true
});
```

#### `enableHtmlSanitizer`
Enables HTML sanitization for template content to prevent XSS attacks.

**Type:** boolean

**Default:** true

**Example:**
```typescript
const listView = new ListView({
    enableHtmlSanitizer: true
});
```

#### `disableHtmlEncode`
Enables rendering of raw text content without HTML encoding. When set to true, HTML tags and special characters will be rendered as-is instead of being encoded.

**Type:** boolean

**Default:** true

**Important:** To preserve and render raw HTML content correctly, `enableHtmlSanitizer` must also be set to false.

**Example:**
```typescript
const listView = new ListView({
    dataSource: [
        { id: '1', text: '<strong>Bold Text</strong>' },
        { id: '2', text: 'Normal Text' }
    ],
    disableHtmlEncode: true,
    enableHtmlSanitizer: false  // Required for raw HTML rendering
});

// Result: "<strong>Bold Text</strong>" renders as bold
// Instead of: "&lt;strong&gt;Bold Text&lt;/strong&gt;"
```

### CSS and Styling Properties

#### `cssClass`
Specifies CSS classes to be added to the ListView element.

**Type:** string

**Default:** null

**Example:**
```typescript
const listView = new ListView({
    cssClass: 'my-custom-list custom-theme'
});
```

#### `htmlAttributes`
Specifies additional HTML attributes for the ListView.

**Type:** Object

**Default:** null

**Example:**
```typescript
const listView = new ListView({
    htmlAttributes: {
        'data-custom': 'value',
        'aria-label': 'Item list'
    }
});
```

#### `locale`
Sets the locale for the ListView.

**Type:** string

**Default:** 'en-US'

**Example:**
```typescript
const listView = new ListView({
    locale: 'ar-AE'  // Arabic
});
```

### Animation and Effects Properties

#### `animation`
Specifies animation settings for the ListView. This property applies different animations when rendering list items.

**Type:** AnimationSettings

**Default:** `{ effect: 'SlideLeft', duration: 400, easing: 'ease' }`

**Example:**
```typescript
const listView = new ListView({
    animation: {
        effect: 'Zoom',
        duration: 300,
        easing: 'ease'
    }
});
```

#### `animationSettings`
Alias for the `animation` property. Both names are accepted.

**Type:** AnimationSettings

**Example:**
```typescript
const listView = new ListView({
    animationSettings: {
        effect: 'SlideLeft',
        duration: 400,
        easing: 'ease'
    }
});
```

#### `sortOrder`
Specifies the sort order of list items.

**Type:** 'Ascending' | 'Descending' | 'None'

**Default:** 'None'

**Example:**
```typescript
const listView = new ListView({
    dataSource: data,
    sortOrder: 'Ascending'
});
```

### List Features

#### `showIcon`
Shows or hides the icon element from list items.

**Type:** boolean

**Default:** false

**Example:**
```typescript
const listView = new ListView({
    showIcon: true,
    fields: { iconCss: 'icon' }
});
```

---

## Methods

### Event Management Methods

#### `addEventListener(eventName, handler)`
Adds an event listener to the ListView for the specified event name.

**Parameters:**
- `eventName` (string): Name of the event to listen for
- `handler` (Function): Callback function to execute when the event occurs

**Returns:** void

**Example:**
```typescript
const listView = new ListView({ dataSource: data });
listView.appendTo('#listview');

// Add click event handler
listView.addEventListener('select', (args) => {
    console.log('Item selected:', args.data);
});

// Add scroll event handler
listView.addEventListener('scroll', (args) => {
    console.log('Scroll position:', args.position);
});
```

#### `removeEventListener(eventName, handler)`
Removes a previously added event listener from the ListView.

**Parameters:**
- `eventName` (string): Name of the event to remove listener from
- `handler` (Function): The specific callback function to remove

**Returns:** void

**Example:**
```typescript
function onItemSelect(args) {
    console.log('Selected:', args.data);
}

const listView = new ListView({ dataSource: data });
listView.appendTo('#listview');

// Add event
listView.addEventListener('select', onItemSelect);

// Remove event
listView.removeEventListener('select', onItemSelect);
```

### Data Management Methods

#### `addItem(data)`
Adds the new list item(s) to the current ListView. To add a new list item(s) in the ListView, pass the data as an array of items that need to be added and fields as the target item to which you need to add the given item(s) as its children. For example fields: { text: 'Name', tooltip: 'Name', id:'id'}.

**Parameters:**
- `data` (object | array): Single item or array of items to add

**Returns:** void

**Example:**
```typescript
// Add single item to end
const newItem = { id: '5', text: 'New Item', icon: 'e-icon-location' };
listView.addItem(newItem);

// Add multiple items
const newItems = [
    { id: '6', text: 'Item 6', price: 100 },
    { id: '7', text: 'Item 7', price: 150 }
];
listView.addItem(newItems);

// Add before specific element
const beforeElement = document.querySelector('.e-list-item');
listView.addItem(newItem, beforeElement);

// Add with complex data
const complexItem = {
    id: '8',
    text: 'Complex Item',
    subtitle: 'Description',
    price: 200,
    category: 'Premium',
    badge: 'New'
};
listView.addItem(complexItem);

// Add items from API
const apiResponse = await fetch('/api/items').then(r => r.json());
listView.addItem(apiResponse.items);

// Add item with animation
const animatedItem = { id: '9', text: 'Animated Item' };
listView.addItem(animatedItem);
document.querySelector('.e-list-item:last-child')?.classList.add('slide-in');
```

#### `removeItem(item)`
Removes the list item from the data source based on a passed element like fields: { text: 'Name', tooltip: 'Name', id:'id'}.

**Parameters:**
- `item` (Fields | HTMLElement | Element): Element object or Fields object with ID and Text fields

**Returns:** void

**Example:**
```typescript
// Remove single item
const items = document.querySelectorAll('.e-list-item');
listView.removeItem(items[0]);

// Remove item with confirmation
const itemToRemove = document.querySelector('[data-id="item-1"]');
if (confirm('Remove this item?')) {
    listView.removeItem(itemToRemove);
}

// Remove item with animation
const itemElement = document.querySelector('[data-id="item-2"]');
itemElement.classList.add('fade-out');
setTimeout(() => listView.removeItem(itemElement), 300);

// Remove by condition
document.querySelectorAll('.e-list-item').forEach(item => {
    if (item.dataset.archived === 'true') {
        listView.removeItem(item);
    }
});

// Remove item and update count
listView.removeItem(itemElement);
updateItemCount(getVisibleItemCount());
```

#### `removeMultipleItems(item)`
Removes multiple items from the ListView by passing the array of elements or array of field objects.

**Parameters:**
- `item` (HTMLElement[] | Element[] | Fields[]): Array of elements or array of field objects with ID and Text fields

**Returns:** void

**Example:**
```typescript
// Remove multiple selected items
const selectedItems = document.querySelectorAll('.e-list-item.e-selected');
listView.removeMultipleItems(selectedItems);

// Remove items marked for deletion
const items = document.querySelectorAll('.e-list-item[data-delete="true"]');
listView.removeMultipleItems(items);

// Remove items with confirmation
const toDelete = Array.from(document.querySelectorAll('.e-list-item.e-selected'));
if (toDelete.length > 0 && confirm(`Delete ${toDelete.length} items?`)) {
    listView.removeMultipleItems(toDelete);
}

// Batch remove with animation
const itemsToRemove = [];
document.querySelectorAll('.e-list-item.marked').forEach(item => {
    item.classList.add('fade-out');
    itemsToRemove.push(item);
});
setTimeout(() => listView.removeMultipleItems(itemsToRemove), 300);

// Remove all items from a category
const categoryItems = document.querySelectorAll('[data-category="archived"]');
listView.removeMultipleItems(categoryItems);
```

#### `findItem(item)`
Finds out an item details from the current list.

**Parameters:**
- `item` (Fields | HTMLElement | Element): Element object or Fields object with ID and Text fields

**Returns:** SelectedItem

**Example:**
```typescript
// Find by HTML element
const element = document.querySelector('.e-list-item');
const found = listView.findItem(element);
console.log('Found item:', found.data);

// Find by field object
const item = listView.findItem({ id: '1', text: 'Item 1' });
if (item) {
    console.log('Item details:', item);
}

// Find by text value
const itemByText = listView.findItem('Item 1');
if (itemByText) {
    console.log('Found:', itemByText);
}
```

#### `Inject(moduleList)`
Dynamically injects required modules to enable specific ListView features. This method allows you to load modules on-demand rather than including them globally.

**Parameters:**
- `moduleList` (Function[]): Array of module constructor functions to inject

**Returns:** void

**Modules Available:**
- `Virtualization` - Enable virtual scrolling for large datasets (100k+ items)
- `DragAndDrop` - Enable drag and drop functionality between lists
- `CheckBox` - Enable checkbox selection features
- `Grouping` - Enable data grouping with group headers
- `SortOrder` - Enable sorting capabilities

**Example:**
```typescript
import { ListView, Virtualization, DragAndDrop, CheckBox } from '@syncfusion/ej2-lists';

// Inject single module
const listView = new ListView({
    dataSource: smallData,
    fields: { id: 'id', text: 'text' }
});
listView.Inject([DragAndDrop]);

// Inject multiple modules at initialization
const complexListView = new ListView({
    dataSource: largeData,
    fields: { id: 'id', text: 'text', groupBy: 'category' },
    enableVirtualization: true,
    allowDragAndDrop: true,
    showCheckBox: true
});
complexListView.Inject([Virtualization, DragAndDrop, CheckBox, Grouping]);

// Enable features after injection
complexListView.Inject([Virtualization]);
complexListView.enableVirtualization = true;
complexListView.height = '100%';

// Inject on-demand based on conditions
if (data.length > 10000) {
    listView.Inject([Virtualization]);
}

if (enableMultiSelect) {
    listView.Inject([CheckBox]);
    listView.showCheckBox = true;
}
```

**Best Practices:**
- Inject modules early in component initialization
- Only inject modules you actually use to reduce bundle size
- Use tree-shakeable imports for optimal build optimization
- Module injection is cumulative - calling multiple times adds all modules
- Check module availability before configuring related properties

**Performance Considerations:**
```typescript
// Optimal: Load virtualization for large datasets
if (dataSize > 5000) {
    listView.Inject([Virtualization]);
    listView.enableVirtualization = true;
    listView.height = 'calc(100vh - 100px)';  // Set explicit height
}

// For production with lazy loading
const requiredModules = [];
if (hasCheckboxes) requiredModules.push(CheckBox);
if (hasDragDrop) requiredModules.push(DragAndDrop);
if (largeDataset) requiredModules.push(Virtualization);

listView.Inject(requiredModules);
```

### Selection Methods

#### `selectItem(item)`
Selects the list item from the ListView by passing the elements or field object.

**Parameters:**
- `item` (Fields | HTMLElement | Element): Element object or Fields object with ID and Text fields

**Returns:** void

**Example:**
```typescript
const items = document.querySelectorAll('.e-list-item');
listView.selectItem(items[0]);
```

#### `selectMultipleItems(item)`
Selects multiple list items from the ListView.

**Parameters:**
- `item` (Fields[] | HTMLElement[] | Element[]): Array of elements or array of fields object with ID and Text fields

**Returns:** void

**Example:**
```typescript
// By DOM elements
const items = document.querySelectorAll('.e-list-item');
listView.selectMultipleItems([items[0], items[2]]);

// Select all items
const allItems = document.querySelectorAll('.e-list-item');
listView.selectMultipleItems(allItems);

// Select items based on condition
const expensiveItems = Array.from(document.querySelectorAll('.e-list-item'))
    .filter(el => el.dataset.price > 100);
listView.selectMultipleItems(expensiveItems);

// Multi-select with shift+click pattern
listView.selectMultipleItems([items[0], items[5]]);
```

#### `unselectItem(item)`
This method allows for deselecting a list item within the ListView. The item to be deselected can be specified by passing the element or field object.

**Parameters:**
- `item` (optional) (Fields | HTMLElement | Element): Element object or Fields object with ID and Text fields

**Returns:** void

**Example:**
```typescript
// Deselect single item
const items = document.querySelectorAll('.e-list-item');
listView.unselectItem(items[0]);

// Deselect by condition
const toDeselect = document.querySelector('[data-inactive="true"]');
if (toDeselect) {
    listView.unselectItem(toDeselect);
}

// Deselect all (select none)
const selectedItems = document.querySelectorAll('.e-list-item.e-selected');
selectedItems.forEach(item => listView.unselectItem(item));
```

#### `getSelectedItems()`
Gets the details of the currently selected item from the list items.

**Returns:** SelectedItem | SelectedCollection | UISelectedItem | NestedListData

**Example:**
```typescript
// Get all selected items in multi-select mode
const selected = listView.getSelectedItems();
console.log('Indexes:', selected.index);  // Array of indexes
console.log('Data:', selected.data);      // Array of data objects
console.log('Count:', selected.data.length);

// Process selected items
const selected = listView.getSelectedItems();
if (selected.data && selected.data.length > 0) {
    selected.data.forEach(item => {
        console.log('Item:', item);
    });
}

// Get selected items and perform batch operation
function deleteSelectedItems() {
    const selected = listView.getSelectedItems();
    if (!selected.data || selected.data.length === 0) {
        showMessage('No items selected');
        return;
    }
    
    if (confirm(`Delete ${selected.data.length} items?`)) {
        const ids = selected.data.map(item => item.id);
        deleteItems(ids);
    }
}

// Export selected items
function exportSelected() {
    const selected = listView.getSelectedItems();
    if (!selected.data) return;
    
    const csv = generateCSV(selected.data);
    downloadFile('export.csv', csv);
}

// Calculate total from selected items
function getTotalPrice() {
    const selected = listView.getSelectedItems();
    if (!selected.data) return 0;
    
    return selected.data.reduce((sum, item) => sum + (item.price || 0), 0);
}

// Map selected items to new structure
const selected = listView.getSelectedItems();
const selectedIds = selected.data?.map(item => item.id) || [];
const selectedTexts = selected.data?.map(item => item.text) || [];
```

### Checkbox Methods

#### `checkItem(item)`
Checks the specific list item by passing the unchecked fields as an argument to this method.

**Parameters:**
- `item` (Fields | HTMLElement | Element): Fields object or HTML list element as an argument

**Returns:** void

**Example:**
```typescript
// Setup ListView with checkboxes
const listView = new ListView({
    dataSource: data,
    showCheckBox: true,
    checkBoxPosition: 'Left'
});

// Check single item
const items = document.querySelectorAll('.e-list-item');
listView.checkItem(items[0]);

// Check item by ID
const itemElement = document.querySelector('[data-id="item-1"]');
listView.checkItem(itemElement);

// Check with animation effect
const toCheck = document.querySelector('.e-list-item');
listView.checkItem(toCheck);
console.log('Item checked');
```

#### `uncheckItem(item)`
Uncheck the specific list item by passing the checked fields as an argument to this method.

**Parameters:**
- `item` (Fields | HTMLElement | Element): Fields object or HTML list element as an argument

**Returns:** void

**Example:**
```typescript
// Uncheck single item
const items = document.querySelectorAll('.e-list-item');
listView.uncheckItem(items[0]);

// Uncheck by condition
const itemElement = document.querySelector('[data-status="inactive"]');
listView.uncheckItem(itemElement);

// Uncheck specific items in batch
const toUncheck = [items[0], items[3], items[5]];
toUncheck.forEach(item => listView.uncheckItem(item));

// Uncheck and update total
listView.uncheckItem(itemElement);
updateCheckboxCount();
```

#### `checkAllItems()`
Checks all the unchecked items in the ListView.

**Returns:** void

**Example:**
```typescript
// Check all items at once
listView.checkAllItems();

// Select all with confirmation
if (confirm('Check all items?')) {
    listView.checkAllItems();
}

// Check all and show notification
listView.checkAllItems();
showNotification('All items selected');

// Check all items except disabled ones
listView.checkAllItems();
// Note: Disabled items remain unchecked automatically
```

#### `uncheckAllItems()`
Uncheck all the checked items in ListView.

**Returns:** void

**Example:**
```typescript
// Uncheck all items
listView.uncheckAllItems();

// Clear selection with confirmation
if (confirm('Deselect all items?')) {
    listView.uncheckAllItems();
}

// Uncheck all and reset UI
listView.uncheckAllItems();
updateItemCount(0);
enableDeleteButton(false);

// Uncheck all for filtering
listView.uncheckAllItems();
applyNewFilter(filterCriteria);
```

### Item State Methods

#### `enableItem(item)`
Enables the disabled list items by passing the Id and text fields.

**Parameters:**
- `item` (Fields | HTMLElement | Element): Element object or Fields object with ID and Text fields

**Returns:** void

**Example:**
```typescript
const items = document.querySelectorAll('.e-list-item');
listView.enableItem(items[0]);

// Enable by condition
const disabledItems = document.querySelectorAll('[data-disabled="true"]');
disabledItems.forEach(item => {
    if (shouldEnable(item.dataset.id)) {
        listView.enableItem(item);
    }
});

// Enable after authentication
if (userAuthenticated) {
    const protectedItems = document.querySelectorAll('.protected-item');
    protectedItems.forEach(item => listView.enableItem(item));
}

// Enable with visual feedback
listView.enableItem(itemElement);
itemElement.classList.add('fade-in');
```

#### `disableItem(item)`
Disables the list items by passing the Id and text fields.

**Parameters:**
- `item` (Fields | HTMLElement | Element): Element object or Fields object with ID and Text fields

**Returns:** void

**Example:**
```typescript
// Disable single item
const items = document.querySelectorAll('.e-list-item');
listView.disableItem(items[0]);

// Disable items with insufficient permissions
const restrictedItems = document.querySelectorAll('[data-restricted="true"]');
restrictedItems.forEach(item => listView.disableItem(item));

// Disable paid features for free users
if (!isPremium) {
    const premiumItems = document.querySelectorAll('.premium-item');
    premiumItems.forEach(item => listView.disableItem(item));
}

// Disable temporarily
const itemToDisable = document.querySelector('[data-id="item-5"]');
listView.disableItem(itemToDisable);
setTimeout(() => listView.enableItem(itemToDisable), 5000); // Re-enable after 5s
```

#### `showItem(item)`
Shows the hide list item from the ListView.

**Parameters:**
- `item` (Fields | HTMLElement | Element): Element object or Fields object with ID and Text fields

**Returns:** void

**Example:**
```typescript
// Show single hidden item
const items = document.querySelectorAll('.e-list-item');
listView.showItem(items[0]);

// Show items based on filter
const hiddenItems = document.querySelectorAll('[style*="display:none"]');
hiddenItems.forEach(item => listView.showItem(item));

// Show items with animation
const itemToShow = document.querySelector('[data-hidden="true"]');
listView.showItem(itemToShow);
itemToShow.classList.add('animate-in');

// Show all items
const allItems = document.querySelectorAll('.e-list-item');
allItems.forEach(item => listView.showItem(item));
```

#### `hideItem(item)`
Hides an list item from the ListView.

**Parameters:**
- `item` (Fields | HTMLElement | Element): Element object or Fields object with ID and Text fields

**Returns:** void

**Example:**
```typescript
// Hide single item
const items = document.querySelectorAll('.e-list-item');
listView.hideItem(items[0]);

// Hide items by condition
const archiveItems = document.querySelectorAll('[data-archived="true"]');
archiveItems.forEach(item => listView.hideItem(item));

// Hide with smooth transition
const itemToHide = document.querySelector('[data-id="item-1"]');
itemToHide.classList.add('fade-out');
setTimeout(() => listView.hideItem(itemToHide), 300);

// Hide and show based on search
listView.uncheckAllItems();
document.querySelectorAll('.e-list-item').forEach(item => {
    if (!matchesSearch(item, searchTerm)) {
        listView.hideItem(item);
    } else {
        listView.showItem(item);
    }
});
```

### Navigation Methods

#### `back()`
Switches back from the navigated sub list item.

**Returns:** void

**Example:**
```typescript
if (listView.element.parentElement.classList.contains('nested')) {
    listView.back();
}
```

### Lifecycle Methods

#### `render()`
Initializes the ListView component rendering.

**Returns:** void

**Example:**
```typescript
listView.dataSource = newData;
listView.render();
```

#### `refresh()`
Applies all the pending property changes and render the component again.

**Returns:** void

**Example:**
```typescript
// Update multiple properties
listView.dataSource = updatedData;
listView.height = '500px';
listView.refresh();  // Apply all changes at once
```

#### `refreshItemHeight()`
Refresh the height of the list item only on enabling the virtualization property.

**Returns:** void

**Example:**
```typescript
const listView = new ListView({
    dataSource: largeDataSet,
    enableVirtualization: true,
    height: '400px'
});

listView.appendTo('#listview');

// Recalculate item heights (useful after dynamic content changes)
listView.refreshItemHeight();
```

#### `dataBind()`
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

**Example:**
```typescript
listView.dataSource = newData;
listView.cssClass = 'new-class';
listView.dataBind();  // Applies all pending changes
```

#### `destroy()`
It is used to destroy the ListView component.

**Returns:** void

**Example:**
```typescript
// Create ListView
const listView = new ListView({ dataSource: data });
listView.appendTo('#listview');

// Later, when done with ListView
listView.destroy();
```

#### `appendTo(selector)`
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

**Example:**
```typescript
const listView = new ListView({ 
    dataSource: data,
    fields: { id: 'id', text: 'text' }
});

// Append to element by selector
listView.appendTo('#listview-container');

// Or append to HTML element
const container = document.getElementById('listview-container');
listView.appendTo(container);
```

#### `getRootElement()`
Returns the route element of the component.

**Returns:** HTMLElement

**Example:**
```typescript
const listView = new ListView({ dataSource: data });
listView.appendTo('#listview-container');

const rootElement = listView.getRootElement();
console.log(rootElement);  // Returns the main ListView DOM element
rootElement.classList.add('custom-class');
```

---

## Events

> **For comprehensive event handling documentation with real-world patterns, see:** [`events-state-management.md`](./events-state-management.md)

The ListView component provides the following events:

### Available Events

| Event | Trigger | Event Arguments | Documentation |
|-------|---------|-----------------|----------------|
| **select** | Item selected | SelectEventArgs | [Link](./events-state-management.md#select-event) |
| **scroll** | List scrolled | ScrolledEventArgs | [Link](./events-state-management.md#scroll-event) |
| **actionBegin** | Action begins | ActionEventArgs | [Link](./events-state-management.md#action-events) |
| **actionComplete** | Action completes | ActionEventArgs | [Link](./events-state-management.md#action-events) |
| **actionFailure** | Action fails | ErrorEventArgs | [Link](./events-state-management.md#error-handling) |

### Quick Reference

**Select Event:**
```typescript
select: (args) => {
    console.log('Selected:', args.data);
}
```

**Scroll Event:**
```typescript
scroll: (args) => {
    if (args.position === 'Bottom') {
        loadMoreItems();
    }
}
```

**Action Events:**
```typescript
actionBegin: (args) => {
    console.log('Action starting:', args.requestType);
},
actionComplete: (args) => {
    console.log('Action completed:', args.requestType);
},
actionFailure: (args) => {
    console.error('Error:', args.error);
}
```

**See [`events-state-management.md`](./events-state-management.md) for:**
- Complete event handler examples
- Multi-select patterns
- Event prevention strategies
- Performance optimization
- State management patterns
- Error handling scenarios

---

## Enumerations

### ListViewEffect
Animation effects for list item rendering.

```typescript
export enum ListViewEffect {
    None = 'None',
    SlideLeft = 'SlideLeft',
    SlideDown = 'SlideDown',
    Zoom = 'Zoom',
    Fade = 'Fade'
}

// Usage
animationSettings: {
    effect: 'Zoom'
}
```

### CheckBoxPosition
Position of checkbox in list items.

```typescript
export enum CheckBoxPosition {
    Left = 'Left',
    Right = 'Right'
}

// Usage
checkBoxPosition: 'Right'
```

### Direction
Direction for scroll in ListView.

```typescript
export enum Direction {
    Top = 'Top',
    Bottom = 'Bottom'
}
```

### SortOrder
Sort order of list items.

```typescript
export enum SortOrder {
    Ascending = 'Ascending',
    Descending = 'Descending',
    None = 'None'
}
```

---

## Interfaces and Types

### AnimationSettings
Configuration for animation effects.

```typescript
interface AnimationSettings {
    effect?: 'None' | 'SlideLeft' | 'SlideDown' | 'Zoom' | 'Fade';
    duration?: number;
    easing?: string;
}

// Example
animationSettings: {
    effect: 'SlideLeft',
    duration: 400,
    easing: 'ease-out'
}
```

### FieldSettings
Maps data fields to ListView properties.

```typescript
interface FieldSettings {
    id?: string;
    text?: string;
    groupBy?: string;
    child?: string;
    iconCss?: string;
    htmlAttributes?: string;
    isChecked?: string;
    isVisible?: string;
    enabled?: string;
    sortBy?: string;
    tableName?: string;
    tooltip?: string;
}

// Example
fields: {
    id: 'itemId',
    text: 'itemName',
    groupBy: 'category',
    iconCss: 'icon',
    tooltip: 'description'
}
```

### SelectEventArgs
Arguments passed to select event handler.

```typescript
interface SelectEventArgs {
    data?: any;
    index?: number;
    item?: HTMLElement;
    isChecked?: boolean;
    cancel?: boolean;
    requestType?: string;
}

// Example
select: (args: SelectEventArgs) => {
    if (args.data.id === 'restricted') {
        args.cancel = true;
    }
}
```

### ScrolledEventArgs
Arguments passed to scroll event handler.

```typescript
interface ScrolledEventArgs {
    position?: string;      // 'Top' | 'Bottom'
    isVirtualScroll?: boolean;
    cancel?: boolean;
}

// Example
scroll: (args: ScrolledEventArgs) => {
    if (args.position === 'Bottom') {
        loadMore();
    }
}
```

### ListSelectedItem
Structure of selected item(s).

```typescript
interface ListSelectedItem {
    data?: any[];
    indexes?: number[];
    index?: number;
    text?: string;
    item?: HTMLElement;
}

// Example
const selected = listView.getSelectedItems();
console.log(selected.data);      // Array of selected items
console.log(selected.indexes);   // Array of indexes
```

### ListSelectedItem (Singular)
Structure of single selected item.

```typescript
interface ListSelectedItem {
    data: any;
    index: number;
    parentId?: any;
    text?: string;
}

// Example
const selected = listView.getSelectedItem();
console.log(selected.data);
console.log(selected.index);
```

### NestedListData
Structure for nested/hierarchical list data.

```typescript
interface NestedListData {
    data: any[];
    item: any;
    text?: string;
    child?: NestedListData[];
}

// Example
const nestedData = [
    {
        text: 'Parent',
        child: [
            { text: 'Child 1' },
            { text: 'Child 2' }
        ]
    }
];
```

### UISelectedItem
UI representation of selected item.

```typescript
interface UISelectedItem {
    data?: any;
    index?: number;
    item?: HTMLElement;
    isChecked?: boolean;
}
```

### DataAndParent
Data structure with parent reference.

```typescript
interface DataAndParent {
    data: any;
    parentId?: any;
}
```

### ActionEventArgs
Arguments for action events.

```typescript
interface ActionEventArgs {
    requestType?: string;
    result?: any;
    count?: number;
    cancel?: boolean;
}

// Example
actionComplete: (args: ActionEventArgs) => {
    if (args.requestType === 'read') {
        console.log(`Loaded ${args.count} items`);
    }
}
```

### ErrorEventArgs
Arguments for error events.

```typescript
interface ErrorEventArgs {
    error?: any;
    requestType?: string;
}

// Example
actionFailure: (args: ErrorEventArgs) => {
    console.error(args.error);
}
```

---

## Common Patterns

### Complete Configuration Example

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const listView = new ListView({
    // Data
    dataSource: employeeData,
    fields: {
        id: 'employeeId',
        text: 'name',
        groupBy: 'department'
    },

    // Display
    height: '500px',
    width: '100%',
    showHeader: true,
    headerTitle: 'Employees',

    // Selection
    showCheckBox: true,
    checkBoxPosition: 'Left',

    // Features
    enableVirtualization: true,
    enablePersistence: true,
    enableRtl: false,

    // Styling
    cssClass: 'custom-list',
    animationSettings: {
        effect: 'Zoom',
        duration: 400
    },

    // Templates
    template: '<span>${name} - ${department}</span>',
    groupTemplate: '<div class="group-header">${department}</div>',

    // Events
    select: (args) => console.log('Selected:', args.data),
    scroll: (args) => console.log('Scroll:', args.position),
    actionBegin: (args) => console.log('Begin:', args.requestType),
    actionComplete: (args) => console.log('Complete:', args.requestType),
    actionFailure: (args) => console.error('Error:', args.error)
});

listView.appendTo('#listview');
```

For more examples and detailed usage patterns, refer to the other reference files in this skill package.
