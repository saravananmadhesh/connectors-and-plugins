# Data Binding and Data Management

## Table of Contents
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [DataManager Integration](#datamanager-integration)
- [Query Builder Patterns](#query-builder-patterns)
- [Dynamic Data Updates](#dynamic-data-updates)
- [Lazy Loading](#lazy-loading)
- [Data Refresh Patterns](#data-refresh-patterns)

## Local Data Binding

### Array of Strings

Bind simple string array data:

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const stringArray = ['Android', 'JavaScript', 'jQuery', 'TypeScript', 'Angular', 'React', 'Vue'];

const listView = new ListView({
    dataSource: stringArray
});

listView.appendTo('#listview');
```

### Array of Objects

Bind objects with field mapping:

```typescript
const data = [
    { id: '1', text: 'Badminton' },
    { id: '2', text: 'Basketball' },
    { id: '3', text: 'Cricket' }
];

const listView = new ListView({
    dataSource: data,
    fields: {
        id: 'id',
        text: 'text'
    }
});

listView.appendTo('#listview');
```

### Complex Object Mapping

Map multiple properties:

```typescript
const employees = [
    { empId: '1', empName: 'John', dept: 'Sales', email: 'john@company.com' },
    { empId: '2', empName: 'Sarah', dept: 'IT', email: 'sarah@company.com' },
    { empId: '3', empName: 'Mike', dept: 'HR', email: 'mike@company.com' }
];

const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'empId',
        text: 'empName',
        groupBy: 'dept',
        tooltip: 'email'
    }
});

listView.appendTo('#listview');
```

## Remote Data Binding

### Basic REST Endpoint

Fetch data from remote API:

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const remoteData = 'url';

const listView = new ListView({
    dataSource: remoteData,
    fields: {
        id: 'id',
        text: 'name'
    }
});

listView.appendTo('#listview');
```

### With Custom Headers

```typescript
const listView = new ListView({
    dataSource: {
        url: 'url',
        adaptor: 'UrlAdaptor',
        headers: [
            { Authorization: 'Bearer token123' }
        ]
    },
    fields: {
        id: 'id',
        text: 'text'
    }
});

listView.appendTo('#listview');
```

### Handling API Errors

```typescript
const listView = new ListView({
    dataSource: 'url',
    fields: { id: 'id', text: 'text' },
    actionBegin: (args) => {
        if (args.requestType === 'beforeRead') {
            console.log('Fetching data...');
        }
    },
    actionComplete: (args) => {
        if (args.requestType === 'read') {
            console.log('Data loaded successfully');
        }
    },
    actionFailure: (args) => {
        console.error('Failed to load data:', args);
    }
});

listView.appendTo('#listview');
```

## DataManager Integration

### Using DataManager for Remote Data

```typescript
import { ListView } from '@syncfusion/ej2-lists';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor()
});

const listView = new ListView({
    dataSource: dataManager,
    fields: {
        id: 'id',
        text: 'title'
    }
});

listView.appendTo('#listview');
```

### Local DataManager

```typescript
import { DataManager } from '@syncfusion/ej2-data';

const data = [
    { id: 1, text: 'Apples', category: 'Fruit' },
    { id: 2, text: 'Bananas', category: 'Fruit' },
    { id: 3, text: 'Carrots', category: 'Vegetable' }
];

const dataManager = new DataManager(data);

const listView = new ListView({
    dataSource: dataManager,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

### OData Service

```typescript
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
    url: 'url',
    adaptor: new ODataAdaptor()
});

const listView = new ListView({
    dataSource: dataManager,
    fields: {
        id: 'CategoryID',
        text: 'CategoryName'
    }
});

listView.appendTo('#listview');
```

## Query Builder Patterns

### Filtering Data

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

const data = [
    { id: 1, text: 'Item 1', active: true },
    { id: 2, text: 'Item 2', active: false },
    { id: 3, text: 'Item 3', active: true }
];

const listView = new ListView({
    dataSource: new DataManager(data),
    query: new Query().where('active', 'equal', true),
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

### Sorting Data

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

const listView = new ListView({
    dataSource: new DataManager(data),
    query: new Query().sortBy('text'),
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

### Pagination with Skip and Take

```typescript
const listView = new ListView({
    dataSource: new DataManager(largeDataSet),
    query: new Query()
        .skip(0)
        .take(20),
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

### Complex Query Chains

```typescript
const listView = new ListView({
    dataSource: new DataManager(data),
    query: new Query()
        .where('category', 'equal', 'electronics')
        .sortBy('price', 'descending')
        .skip(10)
        .take(50),
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

## Dynamic Data Updates

### Adding Items

```typescript
const listView = new ListView({
    dataSource: itemData,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

// Add new item
const newItem = { id: '5', text: 'New Item' };
listView.addItem(newItem);
```

### Removing Items

```typescript
// Remove item by element
const element = document.getElementById('listView_1');
listView.removeItem(element);

// Remove multiple items
const elements = document.querySelectorAll('.e-list-item');
listView.removeMultipleItems(elements);
```

### Updating List

```typescript
// Update entire dataSource
const newData = [
    { id: '1', text: 'Updated Item 1' },
    { id: '2', text: 'Updated Item 2' }
];

listView.dataSource = newData;
listView.render();
```

## Lazy Loading

### Virtual Scrolling for Large Datasets

```typescript
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

### Progressive Loading

```typescript
let page = 1;
let isLoading = false;

const listView = new ListView({
    dataSource: initialData,
    fields: { id: 'id', text: 'text' },
    scroll: (args) => {
        if (args.position === 'Bottom' && !isLoading) {
            isLoading = true;
            loadMore();
        }
    }
});

async function loadMore() {
    const response = await fetch(`url?page=${page}`);
    const newData = await response.json();
    
    newData.forEach(item => {
        listView.addItem(item);
    });
    
    page++;
    isLoading = false;
}

listView.appendTo('#listview');
```

### On-Demand Data Loading

```typescript
const listView = new ListView({
    dataSource: [],
    fields: { id: 'id', text: 'text' },
    actionBegin: async (args) => {
        if (args.requestType === 'beforeRead') {
            const data = await fetch('url')
                .then(r => r.json());
            listView.dataSource = data;
        }
    }
});

listView.appendTo('#listview');
```

## Data Refresh Patterns

### Manual Refresh

```typescript
// Refresh with same data
listView.render();

// Update dataSource and refresh
listView.dataSource = updatedData;
listView.render();
```

### Polling Pattern

```typescript
setInterval(async () => {
    const freshData = await fetch('url')
        .then(r => r.json());
    
    listView.dataSource = freshData;
    listView.render();
}, 5000); // Refresh every 5 seconds
```

### WebSocket Real-time Updates

```typescript
const ws = new WebSocket('wss://api.example.com/updates');

ws.onmessage = (event) => {
    const newItem = JSON.parse(event.data);
    listView.addItem(newItem);
};

ws.close = () => {
    console.log('WebSocket closed');
};
```

### Reactive Updates with Events

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    select: (args) => {
        // Fetch related data on item selection
        fetchRelatedData(args.data.id)
            .then(relatedData => {
                // Update view with related data
                console.log('Related:', relatedData);
            });
    }
});

listView.appendTo('#listview');
```

## Common Patterns

### Search and Filter

```typescript
function searchItems(searchText) {
    const filtered = data.filter(item => 
        item.text.toLowerCase().includes(searchText.toLowerCase())
    );
    
    listView.dataSource = filtered;
    listView.render();
}

document.getElementById('search').addEventListener('input', (e) => {
    searchItems(e.target.value);
});
```

### Dynamic Group By

```typescript
const listView = new ListView({
    dataSource: data,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'category'
    }
});

listView.appendTo('#listview');
```

### Sort Options

```typescript
const listView = new ListView({
    dataSource: new DataManager(data),
    query: new Query().sortBy('text', 'ascending'),
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

// Change sort order
function changeSortOrder(order) {
    const query = order === 'asc' 
        ? new Query().sortBy('text', 'ascending')
        : new Query().sortBy('text', 'descending');
    
    listView.query = query;
    listView.refresh();
}
```

## Loading Spinners for Remote Data

### Display Spinner During Data Loading

```typescript
import { ListView } from '@syncfusion/ej2-lists';
import { Spinner } from '@syncfusion/ej2-popups';

const listView = new ListView({
    dataSource: [],
    fields: { id: 'id', text: 'text' },
    actionBegin: showSpinner,
    actionComplete: hideSpinner,
    actionFailure: hideSpinner
});

listView.appendTo('#listview');

// Spinner instance
let spinnerElement = document.getElementById('spinner');
Spinner.hide(spinnerElement);

function showSpinner(args) {
    if (args.requestType === 'beforeRead') {
        Spinner.show(spinnerElement);
    }
}

function hideSpinner(args) {
    Spinner.hide(spinnerElement);
}

// Fetch data
async function loadRemoteData() {
    try {
        const response = await fetch('url');
        const data = await response.json();
        listView.dataSource = data;
        listView.dataBind();
    } catch (error) {
        console.error('Failed to load data:', error);
    }
}

loadRemoteData();
```

### Custom Spinner with Template

```typescript
// Create custom loading indicator
function createCustomSpinner() {
    const spinnerDiv = document.createElement('div');
    spinnerDiv.id = 'list-spinner';
    spinnerDiv.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
        gap: 10px;
    `;
    spinnerDiv.innerHTML = `
        <div class="spinner"></div>
        <span>Loading items...</span>
    `;
    return spinnerDiv;
}

function showCustomSpinner(container) {
    container.appendChild(createCustomSpinner());
}

function hideCustomSpinner(container) {
    const spinner = container.querySelector('#list-spinner');
    if (spinner) spinner.remove();
}

// CSS for custom spinner
const spinnerStyles = `
    .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = spinnerStyles;
document.head.appendChild(styleSheet);
```

### Skeleton Loading Pattern

```typescript
// Show skeleton while loading
function showSkeletonLoading(container, itemCount = 5) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-loader';
    
    for (let i = 0; i < itemCount; i++) {
        const item = document.createElement('div');
        item.className = 'skeleton-item';
        skeleton.appendChild(item);
    }
    
    container.appendChild(skeleton);
}

function hideSkeletonLoading(container) {
    const skeleton = container.querySelector('.skeleton-loader');
    if (skeleton) skeleton.remove();
}

// CSS for skeleton
const skeletonStyles = `
    .skeleton-loader {
        width: 100%;
    }
    
    .skeleton-item {
        height: 50px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
        margin-bottom: 10px;
        border-radius: 4px;
    }
    
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;
```

## Dynamic AJAX HTML Content Loading

### Load HTML Content on Demand

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const listView = new ListView({
    dataSource: [
        { id: '1', title: 'Section 1', url: '/content/section1' },
        { id: '2', title: 'Section 2', url: '/content/section2' },
        { id: '3', title: 'Section 3', url: '/content/section3' }
    ],
    fields: { id: 'id', text: 'title' },
    template: getListTemplate,
    select: loadDynamicContent
});

listView.appendTo('#listview');

function getListTemplate(data) {
    return `
        <div class="list-item-with-content" data-url="${data.url}">
            <span>${data.title}</span>
        </div>
    `;
}

async function loadDynamicContent(args) {
    const contentContainer = document.getElementById('dynamic-content');
    const url = args.currentElement.dataset.url;
    
    try {
        // Show loading state
        contentContainer.innerHTML = '<p>Loading...</p>';
        
        // Fetch HTML content
        const response = await fetch(url);
        const htmlContent = await response.text();
        
        // Update container with fetched content
        contentContainer.innerHTML = htmlContent;
    } catch (error) {
        contentContainer.innerHTML = `<p>Error loading content: ${error.message}</p>`;
    }
}
```

### AJAX HTML with Caching

```typescript
// Cache loaded content to reduce API calls
const contentCache = {};

async function loadDynamicContentWithCache(itemId, url) {
    // Check cache first
    if (contentCache[itemId]) {
        displayContent(contentCache[itemId]);
        return;
    }
    
    try {
        const response = await fetch(url);
        const htmlContent = await response.text();
        
        // Cache the content
        contentCache[itemId] = htmlContent;
        
        // Display content
        displayContent(htmlContent);
    } catch (error) {
        console.error('Failed to load content:', error);
    }
}

function displayContent(htmlContent) {
    const container = document.getElementById('dynamic-content');
    container.innerHTML = htmlContent;
}
```

### Lazy Load HTML on Scroll

```typescript
let currentPage = 1;
const itemsPerPage = 10;

const listView = new ListView({
    dataSource: loadPageData(currentPage),
    fields: { id: 'id', text: 'title', htmlAttributes: 'htmlAttr' },
    scroll: onListScroll
});

listView.appendTo('#listview');

async function onListScroll(args) {
    // Check if scrolled near bottom
    if (args.scrollDirection === 'Down' && isNearBottom(args)) {
        currentPage++;
        const newData = await loadPageData(currentPage);
        newData.forEach(item => listView.addItem(item));
    }
}

async function loadPageData(page) {
    try {
        const response = await fetch(`/api/items?page=${page}&limit=${itemsPerPage}`);
        const data = await response.json();
        
        // Load HTML content for each item
        return await Promise.all(data.map(async (item) => {
            const contentResponse = await fetch(`/content/${item.id}`);
            const htmlContent = await contentResponse.text();
            item.htmlContent = htmlContent;
            return item;
        }));
    } catch (error) {
        console.error('Failed to load page:', error);
        return [];
    }
}

function isNearBottom(args) {
    const threshold = 100;
    return (args.scrollPosition + threshold) >= args.scrollHeight;
}
```

### Inline HTML Content with Template

```typescript
// Template that includes HTML content inline
const itemTemplateWithContent = `
    <div class="item-with-html">
        <h4>${'${title}'}</h4>
        <div class="item-html-content" data-id="${'${id}'}"></div>
    </div>
`;

const listView = new ListView({
    dataSource: itemData,
    template: itemTemplateWithContent,
    actionComplete: loadInlineContent
});

listView.appendTo('#listview');

async function loadInlineContent() {
    const contentDivs = document.querySelectorAll('.item-html-content');
    
    for (const div of contentDivs) {
        const itemId = div.dataset.id;
        try {
            const response = await fetch(`/content/${itemId}`);
            const htmlContent = await response.text();
            div.innerHTML = htmlContent;
        } catch (error) {
            div.innerHTML = `<p>Error loading content</p>`;
        }
    }
}
```

## Performance Tips

1. **Use Virtual Scrolling** for large datasets (>1000 items)
2. **Implement Lazy Loading** to defer data fetching
3. **Cache Remote Responses** to reduce API calls
4. **Use Filtering Before Binding** instead of filtering UI
5. **Batch Updates** instead of adding items individually
6. **Show Spinners** during async operations for better UX
7. **Cache HTML Content** to reduce repeated AJAX requests

For more advanced data scenarios, see the advanced-features.md section on virtualization.
