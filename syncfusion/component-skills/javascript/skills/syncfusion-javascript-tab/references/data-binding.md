# Data Binding and Dynamic Content

## Table of Contents
- [Content Loading Methods](#content-loading-methods)
- [Dynamic Tab Items](#dynamic-tab-items)
- [Load Content Through POST](#load-content-through-post)
- [Data Source Configuration](#data-source-configuration)
- [Content Rendering Modes](#content-rendering-modes)

## Content Loading Methods

Tab supports multiple ways to load and display content:

| Method | Use Case | Performance |
|--------|----------|-------------|
| **Static HTML** | Fixed content | Fastest |
| **JSON Items** | Defined structure | Fast |
| **DataManager** | External data source | Medium |
| **AJAX/Fetch** | Dynamic content | Depends on source |
| **Template** | Complex layouts | Fast with cache |

## Dynamic Tab Items

### Load Tab Items Dynamically with addTab Method

The `addTab` method allows you to programmatically add tabs at runtime:

```typescript
import { enableRipple, createElement } from '@syncfusion/ej2-base';
import { Tab, SelectEventArgs } from '@syncfusion/ej2-navigations';

enableRipple(true);

let totalItems: number = 0;

let tabObj: Tab = new Tab({
    selected: tabSelected,
    items: [
        {
            header: { 'text': 'Tab1' },
            content: '#tab1_content'
        },
        {
            header: { 'iconCss': 'e-add-icon' },
            content: '#form-container'
        }
    ]
});
tabObj.appendTo('#element');

function tabSelected(args: SelectEventArgs): void {
    if (args.selectedIndex === document.querySelectorAll('#element .e-toolbar-item').length - 1) {
        document.getElementById('tab-title').value = '';
        document.getElementById('tab-content').value = '';
    }
}

document.getElementById('btn-add').onclick = (e: Event) => {
    let title: string = document.getElementById('tab-title').value;
    let content: string = document.getElementById('tab-content').value;
    let item: Object = {
        header: { text: title },
        content: createElement('pre', {
            innerHTML: content.replace(/\n/g, '<br>\n')
        }).outerHTML
    };

    totalItems = document.querySelectorAll('#element .e-toolbar-item').length;
    tabObj.addTab([item], totalItems - 1);
};
```

### Add Tabs Dynamically

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Initial tab' }
    ]
});
tabObj.appendTo('#element');

// Add new tab at end
function addTab() {
    let newTab = {
        header: { 'text': 'New Tab' },
        content: 'New content'
    };
    tabObj.addTab([newTab]);
}

// Add tab at specific position
function insertTab(position: number) {
    let newTab = {
        header: { 'text': `Tab ${position}` },
        content: `Content for position ${position}`
    };
    tabObj.addTab([newTab], position);
}

// Remove tab
function removeTab(index: number) {
    tabObj.removeTab(index);
}
```

### Add Multiple Tabs at Once

```typescript
let tabObj: Tab = new Tab({
    items: []
});
tabObj.appendTo('#element');

// Add batch of tabs
let newTabs = [
    { header: { 'text': 'Dashboard' }, content: 'Dashboard content' },
    { header: { 'text': 'Analytics' }, content: 'Analytics content' },
    { header: { 'text': 'Reports' }, content: 'Reports content' }
];

tabObj.addTab(newTabs);
```

### Modify Existing Tabs

```typescript
// Update tab header
tabObj.items[0].header.text = 'Updated Title';
tabObj.refresh();

// Update tab content
tabObj.items[1].content = 'Updated content';
tabObj.refresh();

// Update multiple properties
tabObj.items[2] = {
    header: {
        'text': 'New Name',
        'iconCss': 'e-icon-new'
    },
    content: 'New content'
};
tabObj.refresh();
```

## Load Content Through POST

### Basic POST Request with Ajax

```typescript
import { Tab } from '@syncfusion/ej2-navigations';
import { Ajax } from '@syncfusion/ej2-base';

let ajax: Ajax = new Ajax('./ajax.html', 'GET', true);
let ctn2: string = '';

ajax.onSuccess = (data: string): void => {
    ctn2 = data;
    
    let tabObj: Tab = new Tab({
        items: [
            {
                header: { 'text': 'Facebook' },
                content: 'Facebook is an online social networking service headquartered in Menlo Park, California...'
            },
            {
                header: { 'text': 'WhatsApp' },
                content: 'WhatsApp Messenger is a proprietary cross-platform instant messaging client...'
            },
            {
                header: { 'text': 'Twitter' },
                content: ctn2  // Content loaded via POST
            }
        ]
    });
    tabObj.appendTo('#element');
};

ajax.send();
```

### POST Request with Fetch API

```typescript
async function loadTabContent() {
    try {
        let response = await fetch('api/tabs/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tabId: 1 })
        });
        
        let data = await response.json();
        
        let tabObj: Tab = new Tab({
            items: [
                {
                    header: { 'text': data.header },
                    content: data.content
                }
            ]
        });
        tabObj.appendTo('#element');
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

loadTabContent();
```

### POST with Multiple Tabs

```typescript
async function loadAllTabsContent() {
    try {
        let response = await fetch('api/tabs/batch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: 5 })
        });
        
        let tabsData = await response.json();
        
        let tabItems = tabsData.map((tab: any) => ({
            header: { 'text': tab.title },
            content: tab.contentHtml
        }));
        
        let tabObj: Tab = new Tab({ items: tabItems });
        tabObj.appendTo('#element');
    } catch (error) {
        console.error('Error:', error);
    }
}

loadAllTabsContent();
```

## Data Source Configuration

### Using DataManager with OData

```typescript
import { DataManager, Query, ODataV4Adaptor, ReturnOption } from '@syncfusion/ej2-data';

let itemsData: any = [];
const SERVICE_URI: string = 'https://services.odata.org/V4/Northwind/Northwind.svc/Employees';

new DataManager({ 
    url: SERVICE_URI, 
    adaptor: new ODataV4Adaptor, 
    crossDomain: true
})
.executeQuery(new Query().range(1, 4))
.then((e: ReturnOption) => {
    let result: any = e.result;
    
    itemsData = result.map((item: any) => ({
        header: { 'text': item.FirstName },
        content: item.Notes
    }));
    
    let tabObj: Tab = new Tab({ items: itemsData });
    tabObj.appendTo('#element');
});
```

### Using Local JSON Data

```typescript
let localData = [
    {
        title: 'Product 1',
        description: 'Description of product 1',
        price: '$99.99'
    },
    {
        title: 'Product 2',
        description: 'Description of product 2',
        price: '$149.99'
    },
    {
        title: 'Product 3',
        description: 'Description of product 3',
        price: '$199.99'
    }
];

let tabItems = localData.map(item => ({
    header: { 'text': item.title },
    content: `<p>${item.description}</p><p>Price: ${item.price}</p>`
}));

let tabObj: Tab = new Tab({ items: tabItems });
tabObj.appendTo('#element');
```

### Using REST API

```typescript
async function loadFromRestAPI() {
    try {
        let response = await fetch('https://api.example.com/items');
        let data = await response.json();
        
        let tabItems = data.items.map((item: any) => ({
            header: { 'text': item.name },
            content: formatItemContent(item)
        }));
        
        let tabObj: Tab = new Tab({ items: tabItems });
        tabObj.appendTo('#element');
    } catch (error) {
        console.error('API Error:', error);
    }
}

function formatItemContent(item: any): string {
    return `
        <div class="item-details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">${item.price}</span>
        </div>
    `;
}

loadFromRestAPI();
```

## Content Rendering Modes

### On Demand (Lazy Loading)

Content rendered only when tab is selected:

```typescript
let tabObj: Tab = new Tab({
    items: [
        {
            header: { 'text': 'Tab 1' },
            content: 'Content 1'
        }
    ]
});
tabObj.appendTo('#element');

// Set up lazy loading
tabObj.created = () => {
    tabObj.element.addEventListener('tabselect', (event) => {
        let selectedIndex = tabObj.selectedItem;
        if (!tabObj.items[selectedIndex].content) {
            // Load content dynamically
            loadContentForTab(selectedIndex);
        }
    });
};

async function loadContentForTab(index: number) {
    let response = await fetch(`api/tabs/${index}/content`);
    let data = await response.json();
    
    tabObj.items[index].content = data.content;
    tabObj.refresh();
}
```

### Dynamic Rendering

```typescript
let tabObj: Tab = new Tab({
    items: [
        {
            header: { 'text': 'Dynamic Tab' },
            content: '<div id="dynamicContent"></div>'
        }
    ],
    selected: (args) => {
        // Render dynamic content when selected
        renderDynamicContent();
    }
});
tabObj.appendTo('#element');

function renderDynamicContent() {
    let container = document.getElementById('dynamicContent');
    if (container) {
        let currentTime = new Date().toLocaleTimeString();
        container.innerHTML = `<p>Content rendered at: ${currentTime}</p>`;
    }
}
```

### Initial Rendering

All content rendered on initialization:

```typescript
let largeDataset = [];
for (let i = 0; i < 100; i++) {
    largeDataset.push({
        header: { 'text': `Tab ${i}` },
        content: generateLargeContent(i)
    });
}

let tabObj: Tab = new Tab({
    items: largeDataset,
    heightAdjustMode: 'Auto'
});
tabObj.appendTo('#element');

function generateLargeContent(index: number): string {
    return `
        <div>
            <h3>Tab ${index}</h3>
            <p>This is content for tab ${index}</p>
            <p>Content pre-rendered on initialization</p>
        </div>
    `;
}
```

## Common Patterns

### Pattern 1: Load Content on Selection

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: '' },
        { header: { 'text': 'Tab 2' }, content: '' },
        { header: { 'text': 'Tab 3' }, content: '' }
    ],
    selected: async (args) => {
        let selectedIndex = tabObj.selectedItem;
        let selectedTab = tabObj.items[selectedIndex];
        
        // Only load if not already loaded
        if (!selectedTab.content) {
            try {
                let response = await fetch(`api/tab-content/${selectedIndex}`);
                let data = await response.json();
                selectedTab.content = data.html;
                tabObj.refresh();
            } catch (error) {
                selectedTab.content = 'Error loading content';
            }
        }
    }
});
tabObj.appendTo('#element');
```

### Pattern 2: Refresh Tab Content

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        // Add refresh button
        document.getElementById('refreshBtn')?.addEventListener('click', refreshTab);
    }
});
tabObj.appendTo('#element');

async function refreshTab() {
    let currentIndex = tabObj.selectedItem;
    try {
        let response = await fetch(`api/tabs/${currentIndex}/refresh`);
        let data = await response.json();
        
        tabObj.items[currentIndex].content = data.content;
        tabObj.refresh();
        console.log('Tab refreshed');
    } catch (error) {
        console.error('Refresh failed:', error);
    }
}
```

### Pattern 3: Search Within Tab Content

```typescript
let tabObj: Tab = new Tab({ items: [...] });
tabObj.appendTo('#element');

function searchContent(query: string) {
    let results: Array<{tabIndex: number, content: string}> = [];
    
    tabObj.items.forEach((item, index) => {
        if (item.content?.includes(query)) {
            results.push({
                tabIndex: index,
                content: item.content
            });
        }
    });
    
    return results;
}

// Usage
let searchResults = searchContent('keyword');
searchResults.forEach(result => {
    console.log(`Found in Tab ${result.tabIndex}`);
});
```

### Pattern 4: Cache and Lazy Load

```typescript
class CachedTabManager {
    private cache: Map<number, string> = new Map();
    private tabObj: Tab;
    
    constructor(tabObj: Tab) {
        this.tabObj = tabObj;
        this.setupLazyLoading();
    }
    
    private setupLazyLoading() {
        this.tabObj.selected = async (args) => {
            let index = this.tabObj.selectedItem;
            
            // Check cache
            if (this.cache.has(index)) {
                this.tabObj.items[index].content = this.cache.get(index)!;
                this.tabObj.refresh();
                return;
            }
            
            // Load and cache
            try {
                let response = await fetch(`api/tabs/${index}`);
                let data = await response.json();
                this.cache.set(index, data.content);
                this.tabObj.items[index].content = data.content;
                this.tabObj.refresh();
            } catch (error) {
                console.error('Error loading tab:', error);
            }
        };
    }
    
    clearCache() {
        this.cache.clear();
    }
}

// Usage
let tabObj = new Tab({ items: [...] });
tabObj.appendTo('#element');
let manager = new CachedTabManager(tabObj);
```

---

**Related Topics:**
- [Tab Structure and Content](./tab-structure-and-content.md) - Tab item configuration
- [Advanced Features](./advanced-features.md) - Nested tabs and drag-drop
