# Advanced Features

## Table of Contents
- [Virtual Scrolling](#virtual-scrolling)
- [Physical Scrolling](#physical-scrolling)
- [Drag and Drop (Using TreeView)](#drag-and-drop-using-treeview)
- [Animations](#animations)
- [Persistence](#persistence)
- [Performance Optimization](#performance-optimization)
- [Pagination Integration](#pagination-integration)
- [Touch Interactions](#touch-interactions)
- [Scrolling Behavior](#scrolling-behavior)

## Virtual Scrolling

### Module Injection for Virtualization

Before using virtualization features, you must import and inject the `Virtualization` module from `ej2-lists`:

```typescript
import { ListView, Virtualization } from '@syncfusion/ej2-lists';

// Inject the Virtualization module
ListView.Inject(Virtualization);
```

> **Important**: Always inject the Virtualization module before creating ListView instances that will use virtualization features. Without this, the `enableVirtualization` property will be ignored.

### Enable Virtualization

```typescript
import { ListView, Virtualization } from '@syncfusion/ej2-lists';

// Always inject required modules first
ListView.Inject(Virtualization);

const largeDataSet = [];
for (let i = 0; i < 10000; i++) {
    largeDataSet.push({ id: i, text: `Item ${i}` });
}

const listView = new ListView({
    dataSource: largeDataSet,
    fields: { id: 'id', text: 'text' },
    enableVirtualization: true,
    height: '400px'
});

listView.appendTo('#listview');
```

### Module Injection in Component Initialization

```typescript
import { ListView, Virtualization, DragAndDrop } from '@syncfusion/ej2-lists';

// Inject multiple modules if needed
ListView.Inject([Virtualization, DragAndDrop]);

// Now you can use both virtualization and drag-drop features
const advancedListView = new ListView({
    dataSource: hugeDataSet,
    fields: { id: 'id', text: 'text' },
    enableVirtualization: true,
    allowDragAndDrop: true,
    height: '500px',
    template: '<div class="item-content">${text}</div>'
});

advancedListView.appendTo('#advanced-listview');
```

### Virtual Scrolling with Templates

```typescript
const listView = new ListView({
    dataSource: largeDataSet,
    fields: { id: 'id', text: 'text' },
    enableVirtualization: true,
    height: '400px',
    template: `
        <div class="e-list-item">
            <span class="item-number">${id}</span>
            <span class="item-text">${text}</span>
        </div>
    `
});

listView.appendTo('#listview');
```

### Virtual Scrolling Performance

```typescript
// Recommended settings for optimal performance
const listView = new ListView({
    dataSource: veryLargeDataSet,  // 100k+ items
    fields: { id: 'id', text: 'text' },
    enableVirtualization: true,
    height: '500px',
    template: '<div>${text}</div>',  // Keep templates simple
    actionComplete: (args) => {
        if (args.requestType === 'read') {
            console.log(`Rendered ${args.count} items`);
        }
    }
});

listView.appendTo('#listview');
```

### Refresh Virtual Scroll Height

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    enableVirtualization: true,
    height: '400px'
});

listView.appendTo('#listview');

// Adjust height dynamically
function adjustHeight(newHeight) {
    listView.height = newHeight;
    listView.refreshItemHeight();
}

window.addEventListener('resize', () => {
    const newHeight = window.innerHeight - 100;
    adjustHeight(`${newHeight}px`);
});
```

## Physical Scrolling

### Basic Scrolling

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    height: '400px',  // Enable vertical scrolling
    enableVirtualization: false
});

listView.appendTo('#listview');
```

### Horizontal Scrolling

```typescript
const widetemplateData = [
    { id: '1', text: 'Item 1 with very long text that requires horizontal scrolling to view completely' },
    { id: '2', text: 'Item 2 with extended content information that goes beyond normal width' }
];

const listView = new ListView({
    dataSource: widetemplateData,
    fields: { id: 'id', text: 'text' },
    height: '400px',
    template: '<div style="min-width: 600px;">${text}</div>'
});

listView.appendTo('#listview');
```

### Smooth Scrolling Behavior

```css
.e-listview {
    scroll-behavior: smooth;
    overflow-y: auto;
    overflow-x: hidden;
}
```

### Scroll to Item

```typescript
function scrollToItem(itemId) {
    const items = document.querySelectorAll('.e-list-item');
    for (let item of items) {
        if (item.textContent.includes(itemId)) {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            break;
        }
    }
}

// Usage
scrollToItem('Item 50');
```

## Drag and Drop (Using TreeView)

> **Note**: ListView does not have native drag and drop support. Use the TreeView component styled to appear like a ListView to implement drag and drop functionality.

### Basic Drag and Drop with TreeView

```typescript
import { TreeView, DragAndDropEventArgs } from '@syncfusion/ej2-navigations';

let data: { [key: string]: Object }[] = [
    { text: 'Hennessey Venom', id: 'list-01' },
    { text: 'Bugatti Chiron', id: 'list-02' },
    { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
    { text: 'SSC Ultimate Aero', id: 'list-04' },
    { text: 'Koenigsegg CCR', id: 'list-05' },
    { text: 'McLaren F1', id: 'list-06' },
    { text: 'Aston Martin One-77', id: 'list-07' },
    { text: 'Jaguar XJ220', id: 'list-08' },
    { text: 'McLaren P1', id: 'list-09' },
    { text: 'Ferrari LaFerrari', id: 'list-10' },
];

let treeViewInstance: TreeView = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'text' },
    allowDragAndDrop: true,
    nodeDragging: onDragStop,
    nodeDragStop: onDragStop
});

treeViewInstance.appendTo('#element');

function onDragStop(args: DragAndDropEventArgs) {
    // Block the Child Drop operation in TreeView
    let draggingItem: HTMLCollection = document.getElementsByClassName("e-drop-in");
    if (draggingItem.length == 1) {
        draggingItem[0].classList.add('e-no-drop');
        args.cancel = true;
    }
}
```

### Styling TreeView to Look Like ListView

```css
#element.e-treeview .e-ul,
#element.e-treeview .e-text-content {
    padding: 0;
}

#element.e-treeview .e-list-item {
    padding: 0 16px;
}

#element.e-treeview .e-fullrow {
    height: 36px;
}

#element.e-treeview .e-list-text {
    line-height: 34px;
}

#element.e-treeview .e-list-item:last-child {
    margin-bottom: 9px;
}

#element.e-treeview .e-list-item:first-child {
    margin-top: 9px;
}

#container {
    display: block;
    max-width: 280px;
    margin: auto;
    border: 1px solid #dddddd;
    border-radius: 3px;
}
```

### HTML Structure for TreeView Drag and Drop

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>TreeView Drag and Drop (ListView Style)</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='container'>
        <div id='element'></div>
    </div>
</body>
</html>
```

## Animations

### Animation Settings

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    animationSettings: {
        effect: 'SlideLeft',      // Effect type
        duration: 400,            // Duration in ms
        easing: 'ease-out'        // Easing function
    }
});

listView.appendTo('#listview');
```

### Available Animation Effects

```typescript
// Animation effect options
const effectOptions = {
    effect: 'None',         // No animation
    effect: 'SlideLeft',    // Slide from right to left
    effect: 'SlideDown',    // Slide from top to bottom
    effect: 'Zoom',         // Zoom in effect
    effect: 'Fade'          // Fade in effect
};

// Different animation presets
const animationPresets = {
    subtle: { effect: 'Fade', duration: 200, easing: 'ease-in' },
    normal: { effect: 'SlideLeft', duration: 400, easing: 'ease-out' },
    dramatic: { effect: 'Zoom', duration: 600, easing: 'ease-in-out' }
};

function setAnimationPreset(preset) {
    listView.animationSettings = animationPresets[preset];
    listView.render();
}
```

### Custom CSS Animations

```css
@keyframes customSlide {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.e-list-item {
    animation: customSlide 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes scaleIn {
    from {
        transform: scale(0.95);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.e-list-item.e-active {
    animation: scaleIn 0.3s ease-out;
}
```

## Persistence

### Enable Persistence

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    enablePersistence: true  // Auto-save state to localStorage
});

listView.appendTo('#listview');
```

### Manual State Persistence

```typescript
class ListViewStateManager {
    private persistKey = 'listview-state';

    saveState(listView) {
        const state = {
            selectedItem: listView.getSelectedItem(),
            dataSource: listView.dataSource,
            sortOrder: listView.sortOrder,
            filters: listView.filters
        };
        localStorage.setItem(this.persistKey, JSON.stringify(state));
    }

    restoreState(listView) {
        const saved = localStorage.getItem(this.persistKey);
        if (saved) {
            const state = JSON.parse(saved);
            listView.dataSource = state.dataSource;
            listView.render();
            return true;
        }
        return false;
    }

    clearState() {
        localStorage.removeItem(this.persistKey);
    }
}

// Usage
const stateManager = new ListViewStateManager();

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

// Auto-save on changes
listView.addEventListener('select', () => {
    stateManager.saveState(listView);
});

// Restore on load
window.addEventListener('load', () => {
    stateManager.restoreState(listView);
});
```

### IndexedDB Persistence (Large Data)

```typescript
class IndexedDBStorage {
    private dbName = 'ListViewDB';
    private storeName = 'items';

    async saveItems(items) {
        const db = await this.openDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        
        items.forEach(item => store.put(item));
        return tx.complete;
    }

    async getItems() {
        const db = await this.openDB();
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    private openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}

// Usage
const storage = new IndexedDBStorage();

// Save items
await storage.saveItems(largeDataSet);

// Restore items
const items = await storage.getItems();
listView.dataSource = items;
listView.render();
```

## Performance Optimization

### Lazy Load Templates

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    template: (data) => {
        // Create template on demand
        return `<div class="item">${data.text}</div>`;
    }
});

listView.appendTo('#listview');
```

### Batch Updates

```typescript
// Bad: Individual updates
data.forEach(item => {
    listView.addItem(item);
});

// Good: Batch update
listView.dataSource = data;
listView.render();
```

### Conditional Template Rendering

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    template: (data) => {
        if (data.type === 'simple') {
            return `<div>${data.text}</div>`;
        } else if (data.type === 'complex') {
            return `<div><span>${data.text}</span><p>${data.description}</p></div>`;
        }
    }
});

listView.appendTo('#listview');
```

## Pagination Integration

### Pager with ListView

```typescript
import { Pager } from '@syncfusion/ej2-grids';

const allData = [];
for (let i = 0; i < 1000; i++) {
    allData.push({ id: i, text: `Item ${i}` });
}

const itemsPerPage = 10;
let currentPage = 1;

function getPaginatedData(page) {
    const start = (page - 1) * itemsPerPage;
    return allData.slice(start, start + itemsPerPage);
}

const listView = new ListView({
    dataSource: getPaginatedData(1),
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

const pager = new Pager({
    pageSize: itemsPerPage,
    pageCount: Math.ceil(allData.length / itemsPerPage),
    click: (args) => {
        currentPage = args.currentPage;
        listView.dataSource = getPaginatedData(currentPage);
        listView.render();
    }
});

pager.appendTo('#pager');
```

## Touch Interactions

### Touch Support

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

// Swipe support
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('listview').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('listview').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (Math.abs(difference) > 50) {
        if (difference > 0) {
            console.log('Swiped left');
        } else {
            console.log('Swiped right');
        }
    }
}
```

### Long Press Support

```typescript
let touchTimeout;

document.getElementById('listview').addEventListener('touchstart', (e) => {
    touchTimeout = setTimeout(() => {
        console.log('Long press detected');
        // Show context menu or trigger action
    }, 500);
});

document.getElementById('listview').addEventListener('touchend', (e) => {
    clearTimeout(touchTimeout);
});
```

See styling-customization.md for responsive design patterns that work with these advanced features.

## Scrolling Behavior

### Enable Custom Scrolling

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    height: 'calc(100vh - 100px)',  // Set explicit height
    scroll: onScroll
});

listView.appendTo('#listview');

function onScroll(args) {
    console.log('Scrolled:', args);
    console.log('Position:', args.scrollPosition);
}
```

### Infinite Scroll Implementation

```typescript
let currentPage = 1;
let isLoading = false;

const listView = new ListView({
    dataSource: loadInitialData(),
    fields: { id: 'id', text: 'text' },
    scroll: onListScroll,
    height: '500px'
});

listView.appendTo('#listview');

async function onListScroll(args) {
    // Check if near bottom
    const scrollHeight = args.scrollHeight;
    const scrollPosition = args.scrollPosition;
    const containerHeight = args.element.clientHeight;
    
    if (scrollPosition + containerHeight >= scrollHeight - 100) {
        if (!isLoading) {
            await loadMoreData();
        }
    }
}

async function loadMoreData() {
    isLoading = true;
    currentPage++;
    
    try {
        const response = await fetch(`/api/items?page=${currentPage}`);
        const newData = await response.json();
        
        // Add new items to ListView
        newData.forEach(item => {
            listView.addItem(item);
        });
        
        isLoading = false;
    } catch (error) {
        console.error('Error loading more data:', error);
        isLoading = false;
    }
}

function loadInitialData() {
    // Load first page
    return [...Array(20)].map((_, i) => ({
        id: i + 1,
        text: `Item ${i + 1}`
    }));
}
```

### Sticky Header with Scrolling

```typescript
// CSS for sticky header
const stickyHeaderStyles = `
    .e-list-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .e-listview {
        overflow-y: auto;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = stickyHeaderStyles;
document.head.appendChild(styleSheet);

// ListView with sticky header
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    showHeader: true,
    headerTitle: 'Items',
    height: '400px'
});

listView.appendTo('#listview');
```

### Scroll to Item

```typescript
// Scroll ListView to specific item
function scrollToItem(itemId) {
    const items = document.querySelectorAll('.e-list-item');
    let targetItem = null;
    
    for (const item of items) {
        if (item.dataset.id === itemId) {
            targetItem = item;
            break;
        }
    }
    
    if (targetItem) {
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        targetItem.classList.add('highlight');
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            targetItem.classList.remove('highlight');
        }, 2000);
    }
}

// CSS for highlight
const highlightStyles = `
    .e-list-item.highlight {
        background-color: #fff3cd;
        transition: background-color 0.5s ease;
    }
`;
```
