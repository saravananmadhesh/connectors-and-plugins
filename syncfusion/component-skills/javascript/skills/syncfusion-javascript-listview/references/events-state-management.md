# Events and State Management

## Table of Contents
- [Event Types](#event-types)
- [Select Event](#select-event)
- [Scroll Event](#scroll-event)
- [Action Events](#action-events)
- [Event Arguments](#event-arguments)
- [State Management](#state-management)
- [Event Tracking](#event-tracking)
- [Custom Events](#custom-events)

## Event Types

### Complete Event List

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    
    // Item selection events
    select: (args) => console.log('Select:', args),
    
    // Scroll events
    scroll: (args) => console.log('Scroll:', args),
    
    // Action events
    actionBegin: (args) => console.log('ActionBegin:', args),
    actionComplete: (args) => console.log('ActionComplete:', args),
    actionFailure: (args) => console.log('ActionFailure:', args)
});

listView.appendTo('#listview');
```

## Select Event

### Basic Selection Handler

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

### Prevent Selection

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        if (args.data.restricted === true) {
            args.cancel = true;  // Prevent selection
            console.log('Selection blocked for restricted item');
        }
    }
});

listView.appendTo('#listview');
```

### Multi-Select Handler

```typescript
const selectedItems = [];

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        if (args.isChecked) {
            selectedItems.push(args.data);
        } else {
            selectedItems.splice(
                selectedItems.findIndex(item => item.id === args.data.id), 
                1
            );
        }
        console.log('Selected items:', selectedItems);
    }
});

listView.appendTo('#listview');
```

### Selection with Details Display

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        const detailsPanel = document.getElementById('details');
        detailsPanel.innerHTML = `
            <h3>${args.data.text}</h3>
            <p>ID: ${args.data.id}</p>
            <p>Index: ${args.index}</p>
            <p>Checked: ${args.isChecked}</p>
        `;
    }
});

listView.appendTo('#listview');
```

## Scroll Event

### Basic Scroll Handler

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    scroll: (args) => {
        console.log('Scroll event:');
        console.log('Position:', args.position);  // 'Top', 'Bottom', or other
        console.log('Is Virtual Scroll:', args.isVirtualScroll);
    }
});

listView.appendTo('#listview');
```

### Infinite Scroll / Load More

```typescript
let pageIndex = 1;
let isLoading = false;

const listView = new ListView({
    dataSource: initialData,
    fields: { id: 'id', text: 'text' },
    enableVirtualization: true,
    height: '400px',
    scroll: async (args) => {
        if (args.position === 'Bottom' && !isLoading) {
            isLoading = true;
            
            // Fetch next page
            const response = await fetch(`/api/items?page=${pageIndex}`);
            const newData = await response.json();
            
            // Add to list
            newData.forEach(item => listView.addItem(item));
            
            pageIndex++;
            isLoading = false;
        }
    }
});

listView.appendTo('#listview');
```

### Scroll Position Tracking

```typescript
let scrollPosition = { top: 0, left: 0 };

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    scroll: (args) => {
        const element = listView.element;
        scrollPosition.top = element.scrollTop;
        scrollPosition.left = element.scrollLeft;
        
        // Save scroll position
        sessionStorage.setItem('listviewScroll', JSON.stringify(scrollPosition));
    }
});

listView.appendTo('#listview');

// Restore scroll position
window.addEventListener('load', () => {
    const saved = sessionStorage.getItem('listviewScroll');
    if (saved) {
        const pos = JSON.parse(saved);
        listView.element.scrollTop = pos.top;
        listView.element.scrollLeft = pos.left;
    }
});
```

## Action Events

### ActionBegin Event

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    actionBegin: (args) => {
        console.log('Action beginning:');
        console.log('Request Type:', args.requestType);
        
        if (args.requestType === 'beforeRead') {
            console.log('About to read data');
            // Show loading spinner
            showLoadingSpinner();
        }
    }
});

listView.appendTo('#listview');
```

### ActionComplete Event

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    actionComplete: (args) => {
        console.log('Action completed:');
        console.log('Request Type:', args.requestType);
        console.log('Result:', args.result);
        
        if (args.requestType === 'read') {
            console.log('Data loaded successfully');
            hideLoadingSpinner();
        }
    }
});

listView.appendTo('#listview');
```

### ActionFailure Event

```typescript
const listView = new ListView({
    dataSource: 'url',
    fields: { id: 'id', text: 'text' },
    actionFailure: (args) => {
        console.error('Action failed:', args);
        console.error('Error:', args.error);
        
        // Show error message
        showErrorMessage('Failed to load data');
    }
});

listView.appendTo('#listview');

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
}
```

## Event Arguments

### SelectEventArgs Structure

```typescript
interface SelectEventArgs {
    data: any;           // Selected item data
    index: number;       // Index of selected item
    item: HTMLElement;   // DOM element of selected item
    isChecked?: boolean; // If checkbox is checked
    cancel?: boolean;    // Can set to prevent selection
}

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args: SelectEventArgs) => {
        if (args.isChecked === false) {
            args.cancel = true;
        }
    }
});

listView.appendTo('#listview');
```

### ScrolledEventArgs Structure

```typescript
interface ScrolledEventArgs {
    position?: string;           // 'Top', 'Bottom'
    isVirtualScroll?: boolean;   // Virtual scrolling active
    cancel?: boolean;            // Can set to prevent default
}

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    enableVirtualization: true,
    scroll: (args: ScrolledEventArgs) => {
        console.log('Scroll position:', args.position);
    }
});

listView.appendTo('#listview');
```

## State Management

### Component State Class

```typescript
class ListViewState {
    private selectedItems = new Set();
    private filteredData = [];
    private sortOrder = 'ascending';
    private currentPage = 1;

    selectItem(item) {
        this.selectedItems.add(item.id);
    }

    deselectItem(item) {
        this.selectedItems.delete(item.id);
    }

    getSelectedItems() {
        return Array.from(this.selectedItems);
    }

    setFilter(filterTerm) {
        this.filteredData = this.data.filter(item =>
            item.text.toLowerCase().includes(filterTerm.toLowerCase())
        );
        return this.filteredData;
    }

    setSortOrder(order) {
        this.sortOrder = order;
    }

    setPage(page) {
        this.currentPage = page;
    }
}

// Usage
const state = new ListViewState();

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        state.selectItem(args.data);
    }
});

listView.appendTo('#listview');
```

### State with LocalStorage Persistence

```typescript
class PersistentListViewState {
    private storageKey = 'listview-state';
    private state = {
        selectedItems: [],
        sortOrder: 'ascending',
        lastViewedItem: null
    };

    constructor() {
        this.load();
    }

    selectItem(item) {
        if (!this.state.selectedItems.includes(item.id)) {
            this.state.selectedItems.push(item.id);
        }
        this.save();
    }

    deselectItem(item) {
        this.state.selectedItems = this.state.selectedItems.filter(
            id => id !== item.id
        );
        this.save();
    }

    setLastViewed(item) {
        this.state.lastViewedItem = item.id;
        this.save();
    }

    private save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    }

    private load() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.state = JSON.parse(saved);
        }
    }

    getState() {
        return this.state;
    }
}

// Usage
const persistentState = new PersistentListViewState();

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        persistentState.selectItem(args.data);
    }
});

listView.appendTo('#listview');
```

## Event Tracking

### Event Logger

```typescript
class EventLogger {
    private logs = [];
    private maxLogs = 100;

    log(eventType, details) {
        const entry = {
            timestamp: new Date(),
            eventType,
            details
        };
        
        this.logs.push(entry);
        
        // Keep only last 100 entries
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
    }

    getLog() {
        return this.logs;
    }

    clear() {
        this.logs = [];
    }

    export() {
        return JSON.stringify(this.logs, null, 2);
    }
}

const eventLogger = new EventLogger();

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        eventLogger.log('select', {
            itemId: args.data.id,
            itemText: args.data.text,
            index: args.index
        });
    },
    scroll: (args) => {
        eventLogger.log('scroll', { position: args.position });
    },
    actionBegin: (args) => {
        eventLogger.log('actionBegin', { requestType: args.requestType });
    }
});

listView.appendTo('#listview');

// Access logs
console.log(eventLogger.getLog());
```

### Performance Monitoring

```typescript
class PerformanceMonitor {
    private metrics = {
        renderTime: 0,
        dataLoadTime: 0,
        selectionTime: 0
    };

    measureRender(callback) {
        const start = performance.now();
        callback();
        this.metrics.renderTime = performance.now() - start;
    }

    measureDataLoad(callback) {
        const start = performance.now();
        callback();
        this.metrics.dataLoadTime = performance.now() - start;
    }

    getMetrics() {
        return this.metrics;
    }
}

const monitor = new PerformanceMonitor();

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    actionBegin: (args) => {
        if (args.requestType === 'beforeRead') {
            monitor.measureDataLoad(() => {
                // Data loading happens here
            });
        }
    }
});

listView.appendTo('#listview');
```

## Custom Events

### Dispatch Custom Events

```typescript
class ListViewWithCustomEvents extends ListView {
    onItemDoubleClick(item) {
        const event = new CustomEvent('itemDoubleClick', {
            detail: { item }
        });
        this.element.dispatchEvent(event);
    }

    onItemRightClick(item) {
        const event = new CustomEvent('itemRightClick', {
            detail: { item }
        });
        this.element.dispatchEvent(event);
    }
}

// Usage
const listViewElement = document.getElementById('listview');

listViewElement.addEventListener('itemDoubleClick', (e) => {
    console.log('Item double clicked:', e.detail.item);
});

listViewElement.addEventListener('itemRightClick', (e) => {
    console.log('Item right clicked:', e.detail.item);
});
```

### Observable State Pattern

```typescript
class ObservableListViewState {
    private observers = [];
    private state = {};

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    notify(changes) {
        this.observers.forEach(observer => observer(changes));
    }

    updateState(newState) {
        const changes = {
            before: this.state,
            after: newState
        };
        this.state = newState;
        this.notify(changes);
    }
}

// Usage
const state = new ObservableListViewState();

state.subscribe((changes) => {
    console.log('State changed:', changes);
});

state.updateState({ selectedItem: item });
```

See selection-interactions.md for more event handling patterns related to user interactions.
