# Data Loading and Content

## Table of Contents

- [Overview](#overview)
- [Data Binding Approaches](#data-binding-approaches)
- [Dynamic Item Loading](#dynamic-item-loading)
- [Data Source Binding](#data-source-binding)
- [AJAX Content Loading](#ajax-content-loading)
- [Nested Accordions](#nested-accordions)
- [Integrating with TreeView](#integrating-with-treeview)
- [Progressive Data Loading](#progressive-data-loading)
- [Complete Data Loading Example](#complete-data-loading-example)
- [Troubleshooting](#troubleshooting)

## Overview

The Accordion supports two primary data loading approaches:
1. **Items Array** - Bind static or programmatically populated items array
2. **DataSource** - Bind to external data sources (OData, JSON, AJAX) using DataManager

This guide covers all data loading patterns.

## Data Binding Approaches

### Approach 1: Items Array (Direct Binding)
Use the `items` property to bind an array of AccordionItemModel objects:

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';

const items: AccordionItemModel[] = [
    { header: 'Section A', content: 'Content A' },
    { header: 'Section B', content: 'Content B' },
    { header: 'Section C', content: 'Content C' }
];

const accordion = new Accordion({ items });
accordion.appendTo('#element');
```

**Pros:**
- Simple and direct
- Full control over item properties
- Great for client-side manipulation

**Cons:**
- Must load all data upfront
- No automatic server sync

### Approach 2: DataSource (Remote/Dynamic Binding)
Use the `dataSource` property with DataManager for server-side data:

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const accordion = new Accordion({
    dataSource: new DataManager({
        url: 'api/accordion-items',
        adaptor: new UrlAdaptor()
    }),
    fields: { 
        text: 'header',      // Maps to header property
        value: 'content'     // Maps to content property
    }
});

accordion.appendTo('#element');
```

**Pros:**
- Load data from server on demand
- Scalable for large datasets
- Server-driven updates

**Cons:**
- Requires server API
- Network dependency

## Dynamic Item Loading

### Loading Items Dynamically After Initialization

Add new items to an existing accordion using the `addItem` method:

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { header: 'Item 1', content: 'Content 1' },
        { header: 'Item 2', content: 'Content 2' }
    ]
});

accordion.appendTo('#element');

// Load more items dynamically
const newItems: AccordionItemModel[] = [
    { header: 'Item 3', content: 'Content 3' },
    { header: 'Item 4', content: 'Content 4' }
];

newItems.forEach((item, index) => {
    accordion.addItem(item, accordion.items.length);
});
```

### Removing Items Dynamically

```typescript
// Remove item at index 1
accordion.removeItem(1);

// Remove all items except first
for (let i = accordion.items.length - 1; i > 0; i--) {
    accordion.removeItem(i);
}
```

### Adding Items from External Source

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: []
});

accordion.appendTo('#element');

// Simulate loading from API
setTimeout(() => {
    const apiData = [
        { header: 'User Profile', content: 'User information panel' },
        { header: 'Settings', content: 'Application settings' },
        { header: 'Help', content: 'Help and documentation' }
    ];
    
    apiData.forEach(item => {
        accordion.addItem(item);
    });
}, 1000);
```

## Data Source Binding

### DataManager with JSON/AJAX

Bind accordion to JSON data from a server API:

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const accordion = new Accordion({
    dataSource: new DataManager({
        url: 'api/accordion-items',
        adaptor: new UrlAdaptor()
    }),
    fields: {
        text: 'header',       // JSON property for header
        value: 'content'      // JSON property for content
    },
    created: () => {
        console.log('Data loaded and accordion created');
    }
});

accordion.appendTo('#element');
```

**Expected JSON Response:**
```json
[
    { "id": 1, "header": "Getting Started", "content": "Start here..." },
    { "id": 2, "header": "Features", "content": "Features list..." },
    { "id": 3, "header": "API Docs", "content": "API documentation..." }
]
```

### Rebinding with New Data

Update accordion data at runtime:

```typescript
// Initially bind to one source
const accordion = new Accordion({
    dataSource: new DataManager({
        url: 'api/items-v1',
        adaptor: new UrlAdaptor()
    })
});

accordion.appendTo('#element');

// Later, rebind to new source
accordion.dataSource = new DataManager({
    url: 'api/items-v2',
    adaptor: new UrlAdaptor()
});

accordion.dataBind();  // Trigger rebinding
```

### OData Service Data Source

Load accordion items from an OData service using DataManager:

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';
import { DataManager, Query, ODataV4Adaptor, ReturnOption } from '@syncfusion/ej2-data';

let itemsData: AccordionItemModel[] = [];

// Mapping configuration
const mapping = { header: 'FirstName', content: 'Notes' };

// OData service URL
const SERVICE_URI = 'url';

// Create DataManager with OData service
new DataManager({ 
    url: SERVICE_URI, 
    adaptor: new ODataV4Adaptor(), 
    crossDomain: true 
})
    .executeQuery(new Query().range(1, 4))
    .then((result: ReturnOption) => {
        const employees = result.result as any[];
        
        // Map OData fields to accordion items
        itemsData = employees.map(emp => ({
            header: emp[mapping.header],
            content: `<p>${emp[mapping.content]}</p>`
        }));
        
        // Create accordion with loaded data
        const accordion = new Accordion({
            items: itemsData,
            expandMode: 'Single'
        });
        
        accordion.appendTo('#element');
    })
    .catch((error) => {
        console.error('Data loading error:', error);
    });
```

### Array Data Source

Bind accordion items directly from an array:

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';

interface ContentData {
    id: number;
    title: string;
    description: string;
}

const dataSource: ContentData[] = [
    { id: 1, title: 'ASP.NET', description: 'Microsoft ASP.NET framework' },
    { id: 2, title: 'ASP.NET MVC', description: 'Model-View-Controller pattern' },
    { id: 3, title: 'JavaScript', description: 'Client-side scripting language' }
];

const accordionItems: AccordionItemModel[] = dataSource.map(item => ({
    header: item.title,
    content: item.description
}));

const accordion = new Accordion({
    items: accordionItems
});

accordion.appendTo('#element');
```

### Mapping Complex Data

```typescript
interface BlogPost {
    postId: number;
    title: string;
    category: string;
    content: string;
    date: string;
}

const posts: BlogPost[] = [
    {
        postId: 1,
        title: 'Getting Started with TypeScript',
        category: 'TypeScript',
        content: 'Learn the basics of TypeScript...',
        date: '2024-01-15'
    },
    {
        postId: 2,
        title: 'Advanced Accordion Techniques',
        category: 'UI Components',
        content: 'Explore advanced accordion features...',
        date: '2024-01-20'
    }
];

const items = posts.map(post => ({
    header: `${post.category}: ${post.title}`,
    content: `<p>${post.content}</p><small>${post.date}</small>`
}));

const accordion = new Accordion({ items });
accordion.appendTo('#element');
```

## AJAX Content Loading

### Loading Content from External URL

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { header: 'FAQ Section 1', content: '#faq-1' },
        { header: 'FAQ Section 2', content: '#faq-2' },
        { header: 'FAQ Section 3', content: '#faq-3' }
    ]
});

accordion.appendTo('#element');

// Load content when item expands
accordion.expanding = (args) => {
    if (args.item) {
        const itemIndex = accordion.items.indexOf(args.item);
        
        // Load content from server
        fetch(`/api/accordion/item/${itemIndex}`)
            .then(response => response.json())
            .then(data => {
                args.item.content = data.content;
            })
            .catch(error => console.error('Load error:', error));
    }
};
```

### Loading HTML Content from File

```typescript
const accordion = new Accordion({
    items: [
        { header: 'Introduction', content: '' },
        { header: 'Features', content: '' },
        { header: 'Getting Started', content: '' }
    ],
    expanding: async (args) => {
        if (args.item && !args.item.content) {
            try {
                const itemIndex = accordion.items.indexOf(args.item);
                const response = await fetch(`/docs/accordion-section-${itemIndex}.html`);
                args.item.content = await response.text();
            } catch (error) {
                args.item.content = '<p>Error loading content</p>';
            }
        }
    }
});

accordion.appendTo('#element');
```

### Loading Content Through POST Request

Load accordion content from an external HTML file via POST:

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';
import { Ajax } from '@syncfusion/ej2-base';

// Initialize Ajax request
const ajax = new Ajax('./content.html', 'GET', true);

ajax.onSuccess = (data: string): void => {
    // Content loaded from external file
    const externalContent = data;
    
    const accordion = new Accordion({
        items: [
            { header: 'Department', content: '<div id="dept-content"></div>' },
            { header: 'Platform', content: '<div id="platform-content"></div>' },
            { header: 'Employee Details', content: externalContent }
        ]
    });
    
    accordion.appendTo('#element');
};

ajax.send();
```

**content.html file example:**
```html
<div class="employee-info">
    <img src="employee.jpg" alt="Employee" />
    <h3>John Doe</h3>
    <p><strong>Title:</strong> Senior Developer</p>
    <p><strong>Department:</strong> Engineering</p>
    <p>John is a passionate developer with 10+ years of experience.</p>
</div>
```

### Loading Data from POST API

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { header: 'User Data', content: 'Loading...' },
        { header: 'Settings', content: 'Loading...' },
        { header: 'Reports', content: 'Loading...' }
    ],
    expanding: async (args) => {
        if (args.item && args.item.content === 'Loading...') {
            try {
                const itemIndex = accordion.items.indexOf(args.item);
                
                // POST request to API
                const response = await fetch('/api/accordion/data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        section: itemIndex,
                        userId: 123,
                        timestamp: new Date().toISOString()
                    })
                });
                
                if (!response.ok) throw new Error('API error');
                
                const data = await response.json();
                
                // Update item with loaded data
                args.item.content = data.html;
            } catch (error) {
                args.item.content = '<p>Error loading content. Please try again.</p>';
                console.error('POST error:', error);
            }
        }
    }
});

accordion.appendTo('#element');
```

### Complete POST Loading Example

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

interface ApiResponse {
    id: number;
    html: string;
    cached: boolean;
}

class PostLoadingAccordion {
    accordion: Accordion;
    contentCache = new Map<number, string>();
    
    constructor() {
        this.accordion = new Accordion({
            items: [
                { header: 'User Profile', content: 'Loading...' },
                { header: 'Account Settings', content: 'Loading...' },
                { header: 'Billing Info', content: 'Loading...' }
            ],
            expanding: (args: ExpandEventArgs) => this.onExpanding(args)
        });
        
        this.accordion.appendTo('#element');
    }
    
    async onExpanding(args: ExpandEventArgs) {
        const itemIndex = this.accordion.items.indexOf(args.item);
        
        if (args.item.content === 'Loading...') {
            try {
                // Check cache first
                if (this.contentCache.has(itemIndex)) {
                    args.item.content = this.contentCache.get(itemIndex) || '';
                    return;
                }
                
                // POST request for new data
                const response = await fetch('/api/user/section', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        section: itemIndex,
                        userId: this.getUserId()
                    })
                });
                
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                
                const data: ApiResponse = await response.json();
                
                // Cache and display
                this.contentCache.set(itemIndex, data.html);
                args.item.content = data.html;
                
            } catch (error) {
                args.item.content = this.getErrorHtml(error);
            }
        }
    }
    
    private getUserId(): number {
        return parseInt(localStorage.getItem('userId') || '1', 10);
    }
    
    private getErrorHtml(error: any): string {
        return `
            <div style="color: #d32f2f; padding: 16px;">
                <p><strong>Failed to load content</strong></p>
                <p>${error.message}</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
    }
}

new PostLoadingAccordion();
```

## Nested Accordions

### Creating Nested Accordion Structure with Event-Based Initialization

Nested accordions are best initialized using the `expanding` event to avoid creating nested components prematurely:

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

let nestedVideoAccordion: Accordion;
let nestedMusicAccordion: Accordion;
let nestedImagesAccordion: Accordion;

const parentAccordion = new Accordion({
    expanding: (args: ExpandEventArgs) => {
        const itemIndex = parentAccordion.items.indexOf(args.item);
        
        // Create nested accordion for Video (index 0) only when expanded
        if (args.isExpanded && itemIndex === 0) {
            if (!args.element.querySelector('.e-accordion')) {
                nestedVideoAccordion = new Accordion({
                    items: [
                        { header: 'Video Track 1', content: 'Video content 1' },
                        { header: 'Video Track 2', content: 'Video content 2' }
                    ]
                }, '#nested-video');
            }
        }
        
        // Create nested accordion for Music (index 1) only when expanded
        if (args.isExpanded && itemIndex === 1) {
            if (!args.element.querySelector('.e-accordion')) {
                nestedMusicAccordion = new Accordion({
                    items: [
                        { header: 'Music Track 1', content: 'Music content 1' },
                        { header: 'Music Track 2', content: 'Music content 2' },
                        { header: 'Music New', content: '<div id="nested-music-new"></div>' }
                    ],
                    clicked: onMusicClicked
                }, '#nested-music');
            }
        }
        
        // Create nested accordion for Images (index 2) only when expanded
        if (args.isExpanded && itemIndex === 2) {
            if (!args.element.querySelector('.e-accordion')) {
                nestedImagesAccordion = new Accordion({
                    items: [
                        { header: 'Image Track 1', content: 'Image content 1' },
                        { header: 'Image Track 2', content: 'Image content 2' }
                    ]
                }, '#nested-images');
            }
        }
    },
    items: [
        { header: '📹 Video', content: '<div id="nested-video"></div>' },
        { header: '🎵 Music', content: '<div id="nested-music"></div>' },
        { header: '🖼️ Images', content: '<div id="nested-images"></div>' }
    ]
});

parentAccordion.appendTo('#parent-accordion');

function onMusicClicked(e: any) {
    const element = e.originalEvent.target;
    
    // Check if nested music accordion already exists
    if (element.querySelectorAll('.e-accordion').length > 0) {
        return;
    }
    
    // Initialize deeply nested accordion on click
    if (!document.getElementById('nested-music-new')?.classList.contains('e-accordion')) {
        new Accordion({
            items: [
                { header: 'New Track 1', content: 'New track content 1' },
                { header: 'New Track 2', content: 'New track content 2' }
            ]
        }, '#nested-music-new');
    }
}
```

### Nested HTML Structure

```html
<div id="parent-accordion">
    <div>
        <div>Category A</div>
        <div>
            <div id="child-accordion-1">
                <div>
                    <div>Subcategory A.1</div>
                    <div>Content for A.1</div>
                </div>
                <div>
                    <div>Subcategory A.2</div>
                    <div>Content for A.2</div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div>Category B</div>
        <div>
            <div id="child-accordion-2">
                <div>
                    <div>Subcategory B.1</div>
                    <div>Content for B.1</div>
                </div>
                <div>
                    <div>Subcategory B.2</div>
                    <div>Content for B.2</div>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Performance Tip: Lazy Load Nested Accordions

Only initialize nested accordions when their parent expands:

```typescript
const accordion = new Accordion({
    items: [...],
    expanding: (args: ExpandEventArgs) => {
        if (args.isExpanded && !args.element.querySelector('.e-accordion')) {
            // Initialize nested accordion on first expansion
            new Accordion({
                items: [...]
            }, '#nested-container');
        }
    }
});
```

### Nested HTML Structure

```html
<div id="parent-accordion">
    <div>
        <div>Category A</div>
        <div>
            <div id="child-accordion-1">
                <div>
                    <div>Subcategory A.1</div>
                    <div>Content for A.1</div>
                </div>
                <div>
                    <div>Subcategory A.2</div>
                    <div>Content for A.2</div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div>Category B</div>
        <div>
            <div id="child-accordion-2">
                <div>
                    <div>Subcategory B.1</div>
                    <div>Content for B.1</div>
                </div>
                <div>
                    <div>Subcategory B.2</div>
                    <div>Content for B.2</div>
                </div>
            </div>
        </div>
    </div>
</div>
```

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const parentAccordion = new Accordion({});
parentAccordion.appendTo('#parent-accordion');

// Child accordions initialize after parent content renders
const childAccordion1 = new Accordion({});
childAccordion1.appendTo('#child-accordion-1');

const childAccordion2 = new Accordion({});
childAccordion2.appendTo('#child-accordion-2');
```

## Integrating with TreeView

### TreeView Inside Accordion

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';
import { TreeView } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { 
            header: 'Folder Structure', 
            content: '<div id="treeview-container"></div>'
        },
        { 
            header: 'Settings', 
            content: 'Settings content here' 
        }
    ]
});

accordion.appendTo('#accordion-element');

// Add TreeView inside accordion
const folderData = [
    { id: 1, text: 'Documents', expanded: true, children: [
        { id: 2, text: 'Reports' },
        { id: 3, text: 'Templates' }
    ]},
    { id: 4, text: 'Downloads', expanded: false, children: [
        { id: 5, text: 'Software' }
    ]}
];

const treeview = new TreeView({
    fields: { dataSource: folderData, id: 'id', text: 'text', child: 'children' }
});

treeview.appendTo('#treeview-container');
```

## Progressive Data Loading

### Lazy Loading on Expand

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { header: 'Products', content: 'Loading products...', expanded: false },
        { header: 'Orders', content: 'Click to expand', expanded: false },
        { header: 'Reports', content: 'Click to expand', expanded: false }
    ],
    expanding: async (args: ExpandEventArgs) => {
        if (!args.item.content || args.item.content.includes('Loading')) {
            // Find which item is expanding
            const itemIndex = accordion.items.indexOf(args.item);
            
            try {
                const response = await fetch(`/api/data/${itemIndex}`);
                const data = await response.json();
                args.item.content = data.html;
            } catch (error) {
                args.item.content = '<p>Error loading data</p>';
            }
        }
    }
});

accordion.appendTo('#element');
```

## Complete Data Loading Example

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';

interface ApiResponse {
    sections: Array<{
        title: string;
        description: string;
        details: string;
    }>;
}

// Mock API data
const mockApiData: ApiResponse = {
    sections: [
        { 
            title: 'Introduction', 
            description: 'Learn the basics',
            details: 'Detailed introduction content...'
        },
        { 
            title: 'Advanced Usage', 
            description: 'Master advanced features',
            details: 'Advanced usage patterns...'
        },
        { 
            title: 'Best Practices', 
            description: 'Follow best practices',
            details: 'Industry best practices...'
        }
    ]
};

// Convert API data to accordion items
const items: AccordionItemModel[] = mockApiData.sections.map(section => ({
    header: section.title,
    content: `<p>${section.description}</p><hr/>${section.details}`
}));

// Create accordion
const accordion = new Accordion({
    items,
    expandMode: 'Single'
});

accordion.appendTo('#accordion-element');
```

## Troubleshooting

**Q: Content doesn't update after loading**
- A: Ensure you're updating the `content` property of the item object directly.

**Q: AJAX content loads slowly**
- A: Use lazy loading with the `expanding` event to load content only when needed.

**Q: Nested accordions don't work**
- A: Ensure child accordions initialize after parent content renders in the DOM.

## Next Steps

- Add templates for complex layouts in **Templates**
- Handle events in **Advanced Features**
- Build advanced scenarios in **Advanced Use Cases**
