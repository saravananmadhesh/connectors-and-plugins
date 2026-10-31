# State Persistence

## Overview

The Tab component can maintain its state across page refreshes using the `enablePersistence` property. This ensures that user interactions, such as the currently selected tab, are preserved when the page is reloaded.

## Enabling State Persistence

### Basic Setup

```typescript
import { Tab } from '@syncfusion/ej2-navigations';

let tabObj: Tab = new Tab({
    enablePersistence: true,
    items: [
        {
            header: { 'text': 'Twitter' },
            content: 'Twitter is an online social networking service that enables users to send and read short 140-character messages called "tweets"...'
        },
        {
            header: { 'text': 'Facebook' },
            content: 'Facebook is an online social networking service headquartered in Menlo Park, California. Its website was launched on February 4, 2004...'
        },
        {
            header: { 'text': 'WhatsApp' },
            content: 'WhatsApp Messenger is a proprietary cross-platform instant messaging client for smartphones that operates under a subscription business model...'
        }
    ]
});
tabObj.appendTo('#element');
```

### What Gets Persisted

When `enablePersistence` is set to `true`, the following state is saved:

- **Selected Tab Index** - The index of the currently active/selected tab
- **Tab Order** - If tabs are reordered via drag-and-drop
- **Tab Visibility** - Whether tabs are visible or hidden

### How It Works

The Tab component uses browser's localStorage to persist the state. The persisted data is stored with a key pattern related to the component's ID:

```typescript
// Data stored in localStorage as:
// localStorage.key: 'TabContainerId_Tab'
// localStorage.value: { selectedItem: 1 }
```

## Practical Examples

### Example 1: Multi-Tab Form with Persistence

```typescript
let tabObj: Tab = new Tab({
    enablePersistence: true,
    items: [
        {
            header: { 'text': 'Personal Info' },
            content: `
                <form id="personalForm">
                    <input type="text" placeholder="Full Name" id="fullName">
                    <input type="email" placeholder="Email" id="email">
                </form>
            `
        },
        {
            header: { 'text': 'Address' },
            content: `
                <form id="addressForm">
                    <input type="text" placeholder="Street" id="street">
                    <input type="text" placeholder="City" id="city">
                </form>
            `
        },
        {
            header: { 'text': 'Confirmation' },
            content: '<div id="confirmationMessage">Please review your information and submit.</div>'
        }
    ],
    selected: (args) => {
        // Load saved form data when tab is selected
        loadFormData(args.selectedIndex);
    }
});
tabObj.appendTo('#element');

// Save form data when leaving tab
document.addEventListener('change', (e) => {
    if (e.target instanceof HTMLInputElement) {
        saveFormData(tabObj.selectedItem);
    }
});

function saveFormData(tabIndex: number) {
    let formData: any = {};
    let inputs = document.querySelectorAll(`[id^="${['personal', 'address', 'confirmation'][tabIndex]}"] input`);
    inputs.forEach((input: any) => {
        formData[input.id] = input.value;
    });
    localStorage.setItem(`form_tab_${tabIndex}`, JSON.stringify(formData));
}

function loadFormData(tabIndex: number) {
    let saved = localStorage.getItem(`form_tab_${tabIndex}`);
    if (saved) {
        let formData = JSON.parse(saved);
        Object.keys(formData).forEach(key => {
            let input = document.getElementById(key) as HTMLInputElement;
            if (input) input.value = formData[key];
        });
    }
}
```

### Example 2: Dashboard with Persistence

```typescript
let dashboardTab: Tab = new Tab({
    enablePersistence: true,
    id: 'dashboardTabs',
    items: [
        {
            header: { 'text': 'Overview', 'iconCss': 'fas fa-chart-pie' },
            content: '#overview'
        },
        {
            header: { 'text': 'Analytics', 'iconCss': 'fas fa-analytics' },
            content: '#analytics'
        },
        {
            header: { 'text': 'Reports', 'iconCss': 'fas fa-file-alt' },
            content: '#reports'
        },
        {
            header: { 'text': 'Settings', 'iconCss': 'fas fa-cog' },
            content: '#settings'
        }
    ],
    selected: (args) => {
        console.log(`User returned to tab: ${dashboardTab.items[args.selectedIndex].header.text}`);
    }
});
dashboardTab.appendTo('#dashboardContainer');

// User preference saved automatically on page load
window.addEventListener('load', () => {
    console.log(`Last viewed tab index: ${dashboardTab.selectedItem}`);
});
```

### Example 3: Editor Tabs with Auto-Save

```typescript
let editorTab: Tab = new Tab({
    enablePersistence: true,
    items: [
        {
            header: { 'text': 'HTML', 'iconCss': 'e-icon-html' },
            content: '<textarea id="htmlEditor" class="editor"></textarea>'
        },
        {
            header: { 'text': 'CSS', 'iconCss': 'e-icon-css' },
            content: '<textarea id="cssEditor" class="editor"></textarea>'
        },
        {
            header: { 'text': 'JavaScript', 'iconCss': 'e-icon-js' },
            content: '<textarea id="jsEditor" class="editor"></textarea>'
        }
    ],
    selected: (args) => {
        // Restore editor content from localStorage
        let tabName = ['html', 'css', 'js'][args.selectedIndex];
        let editor = document.getElementById(`${tabName}Editor`) as HTMLTextAreaElement;
        let saved = localStorage.getItem(`editor_${tabName}`);
        if (editor && saved) {
            editor.value = saved;
        }
    }
});
editorTab.appendTo('#editorContainer');

// Auto-save content when typing
document.querySelectorAll('.editor').forEach((editor, index) => {
    let tabName = ['html', 'css', 'js'][index];
    editor.addEventListener('input', (e) => {
        let content = (e.target as HTMLTextAreaElement).value;
        localStorage.setItem(`editor_${tabName}`, content);
    });
});
```

## Clearing Persisted State

### Clear All Persisted State

```typescript
function clearTabState(tabId: string) {
    let keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.includes(tabId)) {
            localStorage.removeItem(key);
        }
    });
    console.log('Tab state cleared');
}

// Usage
clearTabState('element');  // where 'element' is the tab container ID
```

### Clear Specific Tab State

```typescript
function resetToFirstTab(tabObj: Tab) {
    // Clear persisted selection
    let key = tabObj.element.id + '_Tab';
    localStorage.removeItem(key);
    
    // Reset to first tab
    tabObj.select(0);
}

// Usage
resetToFirstTab(tabObj);
```

### Clear on Logout

```typescript
function handleLogout() {
    // Clear all application state
    let allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
        if (key.startsWith('app_') || key.includes('Tab')) {
            localStorage.removeItem(key);
        }
    });
    
    // Redirect to login
    window.location.href = '/login';
}
```

## Advanced Persistence Patterns

### Pattern 1: Time-Limited Persistence

```typescript
class TimedTabPersistence {
    private tabObj: Tab;
    private MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
    
    constructor(tabObj: Tab) {
        this.tabObj = tabObj;
        this.init();
    }
    
    private init() {
        // Check if persisted state is expired
        let stateKey = this.tabObj.element.id + '_Tab_timestamp';
        let lastAccess = localStorage.getItem(stateKey);
        
        if (lastAccess) {
            let elapsed = Date.now() - parseInt(lastAccess);
            if (elapsed > this.MAX_AGE_MS) {
                // Clear old state
                localStorage.removeItem(stateKey);
                localStorage.removeItem(this.tabObj.element.id + '_Tab');
                return;
            }
        }
        
        // Update timestamp
        localStorage.setItem(stateKey, Date.now().toString());
    }
}
```

### Pattern 2: Selective Persistence

```typescript
class SelectivePersistence {
    private tabObj: Tab;
    private persistableTabsIndices: number[] = [0, 1]; // Only persist specific tabs
    
    constructor(tabObj: Tab, indices: number[]) {
        this.tabObj = tabObj;
        this.persistableTabsIndices = indices;
        this.setupHook();
    }
    
    private setupHook() {
        this.tabObj.selecting = (args) => {
            if (!this.persistableTabsIndices.includes(args.selectedIndex)) {
                // Prevent persistence for certain tabs
                args.cancel = true;
                alert('This tab cannot be persisted');
            }
        };
    }
}

// Usage
let tabObj = new Tab({ enablePersistence: true, items: [...] });
tabObj.appendTo('#element');
let selectivePersistence = new SelectivePersistence(tabObj, [0, 1, 2]);
```

### Pattern 3: Sync Between Tabs

```typescript
class SyncedTabState {
    private tabObj: Tab;
    private syncKey: string;
    
    constructor(tabObj: Tab, syncKey: string = 'sharedTabState') {
        this.tabObj = tabObj;
        this.syncKey = syncKey;
        this.setupSync();
    }
    
    private setupSync() {
        // Listen for storage changes from other browser tabs
        window.addEventListener('storage', (e) => {
            if (e.key === this.syncKey && e.newValue) {
                let state = JSON.parse(e.newValue);
                this.tabObj.select(state.selectedIndex);
                console.log('Tab synced from other window');
            }
        });
        
        // Update shared state when tab changes
        this.tabObj.selected = (args) => {
            localStorage.setItem(this.syncKey, JSON.stringify({
                selectedIndex: args.selectedIndex,
                timestamp: Date.now()
            }));
        };
    }
}

// Usage - will sync tab state across multiple tabs/windows of the same website
let tabObj = new Tab({ enablePersistence: true, items: [...] });
tabObj.appendTo('#element');
let syncedState = new SyncedTabState(tabObj, 'myAppTabState');
```

## Best Practices

1. **Enable for User-Centric Workflows** - Use persistence for wizard-like, multi-step processes
2. **Combine with Server-Side State** - For critical data, also save to server
3. **Provide Clear Reset Option** - Let users clear their session state
4. **Consider User Privacy** - Avoid storing sensitive information in localStorage
5. **Monitor Storage Quota** - Be aware of localStorage size limits (typically 5-10MB)
6. **Test Across Browsers** - localStorage behavior may vary

## Related Topics

- [Data Binding and Dynamic Content](./data-binding.md) - Loading content dynamically
- [Tab Structure and Content](./tab-structure-and-content.md) - Tab item configuration
- [Advanced Features](./advanced-features.md) - Nested tabs and wizards