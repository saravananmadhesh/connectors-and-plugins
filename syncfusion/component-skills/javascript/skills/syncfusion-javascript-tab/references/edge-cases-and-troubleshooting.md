# Edge Cases and Troubleshooting

## Table of Contents
- [Common Issues](#common-issues)
- [State Persistence](#state-persistence)
- [Content Management](#content-management)
- [Performance Optimization](#performance-optimization)
- [Responsive Design Issues](#responsive-design-issues)
- [Debugging Tips](#debugging-tips)

## Common Issues

### Issue 1: Tab Not Rendering

**Symptom:** Tab component doesn't appear in the page.

**Solutions:**

```typescript
// ❌ Wrong - Missing appendTo
let tabObj: Tab = new Tab({ items: [...] });
// Tab won't render!

// ✅ Correct - Always use appendTo
let tabObj: Tab = new Tab({ items: [...] });
tabObj.appendTo('#element');

// Verify element exists
let element = document.getElementById('element');
if (!element) {
    console.error('Target element not found!');
}
```

### Issue 2: CSS Not Applied

**Symptom:** Tab appears but without styling.

**Solutions:**

```typescript
// ❌ Wrong - Missing CSS imports
import { Tab } from '@syncfusion/ej2-navigations';

// ✅ Correct - Include CSS in HTML or import in TypeScript
// In HTML:
// <link href="path/to/styles/fluent2.css" rel="stylesheet" />

// Or in CSS file:
@import '@syncfusion/ej2-navigations/styles/fluent2.css';

// Verify CSS is loaded
let computedStyle = window.getComputedStyle(document.querySelector('.e-tab') || new HTMLElement());
console.log('Tab background:', computedStyle.backgroundColor);
```

### Issue 3: Tab Selection Not Working

**Symptom:** Clicking tabs doesn't switch content.

**Solutions:**

```typescript
// ❌ Wrong - Index out of bounds
tabObj.select(999);  // Non-existent index

// ✅ Correct - Validate index
function selectTabSafely(index: number) {
    if (index >= 0 && index < tabObj.items.length) {
        tabObj.select(index);
    } else {
        console.error('Invalid tab index:', index);
    }
}

// Check for event conflicts
let tabObj: Tab = new Tab({
    items: [...],
    selecting: (args) => {
        // Debug: Log selection attempt
        console.log('Selecting tab:', args.selectedIndex);
        
        // Check if args.cancel is set
        if (args.cancel) {
            console.warn('Tab selection cancelled');
        }
    }
});
```

### Issue 4: Content Not Updating

**Symptom:** Tab content shows old data.

**Solutions:**

```typescript
// ❌ Wrong - Forgot to call refresh
tabObj.items[0].content = 'New content';
// Content won't update!

// ✅ Correct - Always call refresh after changes
tabObj.items[0].content = 'New content';
tabObj.refresh();

// For dynamic updates, use proper API
tabObj.items[0] = {
    header: { 'text': 'Updated' },
    content: 'New content'
};
tabObj.refresh();

// Clear cache if using content caching
if (contentCache) {
    contentCache.clear();
    tabObj.refresh();
}
```

## State Persistence

### Save Tab State to LocalStorage

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        // Restore from localStorage
        let savedIndex = localStorage.getItem('activeTabIndex');
        if (savedIndex) {
            tabObj.selectedItem = parseInt(savedIndex);
        }
    },
    selected: (args) => {
        // Save state when tab changes
        localStorage.setItem('activeTabIndex', tabObj.selectedItem.toString());
    }
});
tabObj.appendTo('#element');
```

### Persist Tab Content

```typescript
class PersistentTabManager {
    private storageKey = 'tabContent';
    private tabObj: Tab;
    
    constructor(tabObj: Tab) {
        this.tabObj = tabObj;
        this.loadContent();
        this.setupAutoSave();
    }
    
    private loadContent() {
        let saved = localStorage.getItem(this.storageKey);
        if (saved) {
            let data = JSON.parse(saved);
            this.tabObj.items = data;
        }
    }
    
    private setupAutoSave() {
        // Save whenever content changes
        setInterval(() => {
            let data = JSON.stringify(this.tabObj.items);
            localStorage.setItem(this.storageKey, data);
        }, 5000);  // Save every 5 seconds
    }
    
    clearCache() {
        localStorage.removeItem(this.storageKey);
    }
}

let tabObj = new Tab({ items: [...] });
tabObj.appendTo('#element');
let manager = new PersistentTabManager(tabObj);
```

### Persist with SessionStorage

```typescript
// Store for current session only
function saveTabState(index: number) {
    sessionStorage.setItem('currentTab', index.toString());
}

function restoreTabState() {
    let saved = sessionStorage.getItem('currentTab');
    return saved ? parseInt(saved) : 0;
}

let tabObj: Tab = new Tab({
    items: [...],
    selectedItem: restoreTabState(),
    selected: (args) => {
        saveTabState(tabObj.selectedItem);
    }
});
tabObj.appendTo('#element');
```

## Content Management

### Handle Large Datasets

```typescript
// ❌ Wrong - Loading all content at once
let allTabs = [];
for (let i = 0; i < 1000; i++) {
    allTabs.push({
        header: { 'text': `Tab ${i}` },
        content: generateLargeContent()  // Too much memory!
    });
}

// ✅ Correct - Lazy load content
let tabObj: Tab = new Tab({
    items: Array(1000).fill(null).map((_, i) => ({
        header: { 'text': `Tab ${i}` },
        content: ''  // Empty initially
    })),
    selected: async (args) => {
        let index = tabObj.selectedItem;
        let tab = tabObj.items[index];
        
        // Only load if not already loaded
        if (!tab.content) {
            tab.content = await loadTabContent(index);
            tabObj.refresh();
        }
    }
});
tabObj.appendTo('#element');

async function loadTabContent(index: number): Promise<string> {
    // Load from API or generate on-demand
    return generateLargeContent();
}
```

### Prevent Content Swipe Selection

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        let content = document.querySelector('.e-content') as HTMLElement;
        
        // Prevent text selection during swipe
        if (content) {
            content.addEventListener('selectstart', (event) => {
                event.preventDefault();
            });
        }
    }
});
tabObj.appendTo('#element');

// Or use CSS
.e-tab .e-content {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    touch-action: manipulation;
}
```

### Handle Dynamic Content Height

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    heightAdjustMode: 'Auto',  // or 'Content', 'Scroll'
    created: () => {
        // Adjust height when content changes
        let observerConfig = { 
            childList: true, 
            subtree: true, 
            characterData: true 
        };
        
        let observer = new MutationObserver(() => {
            tabObj.refresh();
        });
        
        let contentArea = document.querySelector('.e-content') as HTMLElement;
        if (contentArea) {
            observer.observe(contentArea, observerConfig);
        }
    }
});
tabObj.appendTo('#element');
```

## Performance Optimization

### Optimize Rendering

```typescript
// ❌ Wrong - Create many tabs at once
let tabs = [];
for (let i = 0; i < 10000; i++) {
    tabs.push({
        header: { 'text': `Tab ${i}` },
        content: `Content ${i}`
    });
}
let tabObj: Tab = new Tab({ items: tabs });

// ✅ Correct - Virtual scrolling or pagination
let tabObj: Tab = new Tab({
    items: getInitialTabs(50),  // Start with 50
    overflowMode: 'Popup',      // Use popup for many tabs
    created: () => {
        // Implement virtual loading
    }
});
tabObj.appendTo('#element');

function getInitialTabs(count: number) {
    let tabs = [];
    for (let i = 0; i < count; i++) {
        tabs.push({
            header: { 'text': `Tab ${i}` },
            content: `Content ${i}`
        });
    }
    return tabs;
}
```

### Minimize Refresh Calls

```typescript
// ❌ Wrong - Multiple refresh calls
tabObj.items[0].content = 'New 1';
tabObj.refresh();
tabObj.items[1].content = 'New 2';
tabObj.refresh();
tabObj.items[2].content = 'New 3';
tabObj.refresh();

// ✅ Correct - Batch updates
tabObj.items[0].content = 'New 1';
tabObj.items[1].content = 'New 2';
tabObj.items[2].content = 'New 3';
tabObj.refresh();  // Single refresh

// Or rebuild entire items array
tabObj.items = tabObj.items.map((item, index) => ({
    ...item,
    content: `Updated ${index}`
}));
tabObj.refresh();
```

### Debounce Resize Handlers

```typescript
let resizeTimeout: number;

function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
        tabObj.refresh();
        console.log('Resized');
    }, 300);
}

window.addEventListener('resize', handleResize);
```

## Responsive Design Issues

### Tab Headers Overflow on Mobile

```typescript
// ❌ Wrong - No responsive config
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Very Long Header Text' }, content: '...' },
        { header: { 'text': 'Another Long Header' }, content: '...' }
    ]
});

// ✅ Correct - Responsive overflow handling
let tabObj: Tab = new Tab({
    items: [...],
    overflowMode: window.innerWidth < 768 ? 'Popup' : 'Scrollable'
});
tabObj.appendTo('#element');

window.addEventListener('resize', () => {
    tabObj.overflowMode = window.innerWidth < 768 ? 'Popup' : 'Scrollable';
    tabObj.refresh();
});
```

### Content Cut Off at Edges

```typescript
// ✅ Add proper padding and overflow handling
.e-tab {
    overflow: hidden;
}

.e-tab .e-content {
    padding: 15px;
    overflow-y: auto;
    max-height: calc(100vh - 100px);
}

// TypeScript: Ensure proper sizing
let tabObj: Tab = new Tab({
    items: [...],
    heightAdjustMode: 'Content',
    width: '100%'
});
tabObj.appendTo('#element');
```

## Debugging Tips

### Enable Debug Logging

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        console.log('Tab created:', tabObj);
        console.log('Items:', tabObj.items);
    },
    selected: (args) => {
        console.log('Tab selected:', {
            index: tabObj.selectedItem,
            text: tabObj.items[tabObj.selectedItem].header.text,
            timestamp: new Date()
        });
    },
    selecting: (args) => {
        console.log('Tab selecting:', {
            from: tabObj.selectedItem,
            to: args.selectedIndex
        });
    }
});
tabObj.appendTo('#element');
```

### Inspect DOM Structure

```typescript
function inspectTabStructure() {
    console.log('Tab HTML:', document.getElementById('element')?.outerHTML);
    console.log('Tab object:', tabObj);
    console.log('Items count:', tabObj.items?.length);
    console.log('Selected index:', tabObj.selectedItem);
}

// Call in DevTools console
inspectTabStructure();
```

### Check for JavaScript Errors

```typescript
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
});

// Monitor async errors
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
});
```

### Performance Profiling

```typescript
console.time('tab-creation');
let tabObj: Tab = new Tab({ items: largeDataset });
tabObj.appendTo('#element');
console.timeEnd('tab-creation');

console.time('tab-selection');
tabObj.select(100);
console.timeEnd('tab-selection');

// Memory usage
if (performance.memory) {
    console.log('Memory used:', performance.memory.usedJSHeapSize / 1048576, 'MB');
}
```

## Quick Reference Checklist

- [ ] Target element exists with correct ID
- [ ] CSS files are imported
- [ ] Tab component is initialized with `appendTo()`
- [ ] Items array is not empty
- [ ] Content updates include `refresh()` call
- [ ] Selection events don't have `args.cancel = true`
- [ ] No index out of bounds errors
- [ ] Responsive modes configured for target devices
- [ ] State persistence setup if needed
- [ ] Content height adjusts properly
- [ ] Performance optimized for large datasets

---

**Related Topics:**
- [Getting Started](./getting-started.md) - Proper initialization
- [Tab Structure and Content](./tab-structure-and-content.md) - Content management
- [Data Binding](./data-binding.md) - Dynamic content loading
