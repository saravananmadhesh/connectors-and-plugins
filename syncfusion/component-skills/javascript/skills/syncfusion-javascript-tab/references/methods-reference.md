---
name: methods-reference
title: Complete Methods Reference
description: Comprehensive reference for all Tab component methods with examples
---

# Complete Methods Reference

This document provides complete reference for all 18 Tab component methods, their parameters, return types, and practical usage examples.

## Table of Contents

- [Tab Management Methods](#tab-management-methods)
- [Selection and Navigation](#selection-and-navigation)
- [Visibility and State Control](#visibility-and-state-control)
- [Event Management](#event-management)
- [Component Lifecycle](#component-lifecycle)
- [Utility Methods](#utility-methods)

---

## Tab Management Methods

### addTab()

Adds new tab items to the Tab component dynamically.

**Signature:**
```typescript
addTab(items: TabItemModel[], index?: number): void
```

**Parameters:**
- `items` (TabItemModel[]): Array of tab items to add
- `index` (number, optional): Position where items should be inserted. Default is 0 (beginning)

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Home' }, content: 'Home content' }
    ]
});
tabObj.appendTo('#element');

// Add single tab at end
tabObj.addTab([{
    header: { 'text': 'New Tab' },
    content: 'New content'
}]);

// Add at specific index (insert at position 1)
tabObj.addTab([{
    header: { 'text': 'Inserted Tab' },
    content: 'Inserted content'
}], 1);

// Add multiple tabs at once
tabObj.addTab([
    {
        header: { 'text': 'Tab 1' },
        content: 'Content 1'
    },
    {
        header: { 'text': 'Tab 2' },
        content: 'Content 2'
    }
], 0);
```

**Real-World Usage:**

```typescript
// Dynamic form tabs - add step after user completes previous step
function addNextFormStep(stepNumber: number) {
    let newTab = {
        header: { 'text': `Step ${stepNumber}` },
        content: `Form fields for step ${stepNumber}...`
    };
    
    // Add at end
    tabObj.addTab([newTab]);
    
    // Optionally select the new tab
    tabObj.select(tabObj.items.length - 1);
}

// Document editor - add new document tab
function openNewDocument(docName: string) {
    let docTab = {
        header: { 'text': docName, iconCss: 'e-icon-document' },
        content: `<div id="editor-${docName}"></div>`,
        id: `doc-${docName}`
    };
    
    tabObj.addTab([docTab]);
    initializeEditor(`editor-${docName}`);
}

// Browser-like tabs - add tab with close button
function addBrowserTab(url: string) {
    let browserTab = {
        header: { 'text': 'New Tab' },
        content: `<iframe src="${url}"></iframe>`,
        cssClass: 'browser-tab'
    };
    
    tabObj.addTab([browserTab]);
}
```

---

### removeTab()

Removes tab items from the Tab component.

**Signature:**
```typescript
removeTab(index: number): void
```

**Parameters:**
- `index` (number): Index of the tab item to remove

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' },
        { header: { 'text': 'Tab 3' }, content: 'Content 3' }
    ]
});
tabObj.appendTo('#element');

// Remove specific tab by index
tabObj.removeTab(1);  // Removes Tab 2

// Remove last tab
tabObj.removeTab(tabObj.items.length - 1);

// Remove first tab
tabObj.removeTab(0);
```

**Real-World Usage:**

```typescript
// Document editor - close document tab
function closeDocument(tabIndex: number) {
    // Check for unsaved changes
    if (hasUnsavedChanges(tabIndex)) {
        if (confirm('Save changes before closing?')) {
            saveDocument(tabIndex);
        }
    }
    
    // Remove the tab
    tabObj.removeTab(tabIndex);
}

// Browser tabs - close with keyboard shortcut
let tabObj = new Tab({
    items: [...],
    removing: (args) => {
        // Can be triggered by close button or Ctrl+W
        let closedTab = tabObj.items[args.removedIndex];
        console.log(`Closed: ${closedTab.header?.text}`);
    }
});

// Close current tab on Ctrl+W
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'w') {
        let currentIndex = tabObj.selectedItem;
        tabObj.removeTab(currentIndex);
    }
});
```

---

## Selection and Navigation

### select()

Selects a specific tab by index or DOM element.

**Signature:**
```typescript
select(args: number | HTMLElement, event?: Event): void
```

**Parameters:**
- `args` (number | HTMLElement): Tab index or DOM element to select
- `event` (Event, optional): DOM event that triggered the selection

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Dashboard' }, content: 'Dashboard...' },
        { header: { 'text': 'Analytics' }, content: 'Analytics...' },
        { header: { 'text': 'Reports' }, content: 'Reports...' }
    ]
});
tabObj.appendTo('#element');

// Select by index
tabObj.select(0);  // Select first tab
tabObj.select(2);  // Select third tab

// Select using DOM element
let tabElement = document.querySelector('.e-tab-header .e-toolbar-item');
if (tabElement) {
    tabObj.select(tabElement);
}

// Select with event
function onTabButtonClick(event: Event) {
    let index = parseInt((event.target as HTMLElement).getAttribute('data-index') || '0');
    tabObj.select(index, event);
}
```

**Real-World Usage:**

```typescript
// Navigation menu - select tab when menu item clicked
let navigationMenu = {
    'Dashboard': 0,
    'Users': 1,
    'Analytics': 2,
    'Settings': 3
};

document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', (e) => {
        let menuName = (e.target as HTMLElement).textContent || '';
        let tabIndex = navigationMenu[menuName as keyof typeof navigationMenu];
        tabObj.select(tabIndex, e);
    });
});

// Wizard - navigate to specific step
function goToStep(stepNumber: number) {
    // Validate previous steps
    if (!validatePreviousSteps(stepNumber)) {
        alert('Please complete all previous steps');
        return;
    }
    
    tabObj.select(stepNumber);
}

// Multi-panel form - auto-advance on completion
function onFormStepComplete(stepIndex: number) {
    // Save step data
    saveStepData(stepIndex);
    
    // Move to next step if available
    if (stepIndex < tabObj.items.length - 1) {
        tabObj.select(stepIndex + 1);
    }
}
```

---

## Visibility and State Control

### hideTab()

Shows or hides a tab item at specified index.

**Signature:**
```typescript
hideTab(index: number, value?: boolean): void
```

**Parameters:**
- `index` (number): Index of the tab to show/hide
- `value` (boolean, optional): `true` to hide, `false` to show. Default is `true`

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Public' }, content: 'Public content' },
        { header: { 'text': 'Private' }, content: 'Private content' },
        { header: { 'text': 'Admin' }, content: 'Admin content' }
    ]
});
tabObj.appendTo('#element');

// Hide tab (default value=true)
tabObj.hideTab(2);  // Hide Admin tab

// Show tab
tabObj.hideTab(2, false);  // Show Admin tab

// Toggle visibility
function toggleTabVisibility(index: number) {
    let isHidden = tabObj.items[index]?.visible === false;
    tabObj.hideTab(index, !isHidden);
}
```

**Real-World Usage:**

```typescript
// Role-based tab visibility
function setupRoleBasedTabs(userRole: string) {
    const rolePermissions: { [key: string]: number[] } = {
        'user': [0, 1],           // Can see Public, Private
        'moderator': [0, 1, 2],   // Can see all
        'admin': [0, 1, 2, 3]     // Can see all including reports
    };
    
    let allowedTabs = rolePermissions[userRole] || [];
    
    // Hide tabs user doesn't have permission to access
    for (let i = 0; i < tabObj.items.length; i++) {
        tabObj.hideTab(i, !allowedTabs.includes(i));
    }
}

// Feature toggle - hide experimental features
function hideExperimentalFeatures(hideFeatures: boolean) {
    let experimentalTabs = [2, 4];  // Index of experimental features
    
    experimentalTabs.forEach(index => {
        tabObj.hideTab(index, hideFeatures);
    });
}

// Conditional tab visibility
let tabObj = new Tab({
    items: [
        { header: { 'text': 'Basic Info' }, content: '...' },
        { header: { 'text': 'Advanced' }, content: '...', visible: false }
    ],
    selected: (args) => {
        // Show advanced tab only after basic info is filled
        if (args.previousIndex === 0 && isBasicInfoComplete()) {
            tabObj.hideTab(1, false);  // Show advanced tab
        }
    }
});
```

---

### enableTab()

Enables or disables a specific tab item.

**Signature:**
```typescript
enableTab(index: number, value: boolean): void
```

**Parameters:**
- `index` (number): Index of the tab to enable/disable
- `value` (boolean): `false` to enable, `true` to disable. Default is `true` (enabled)

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Step 1' }, content: 'Step 1 content' },
        { header: { 'text': 'Step 2' }, content: 'Step 2 content' },
        { header: { 'text': 'Step 3' }, content: 'Step 3 content' }
    ]
});
tabObj.appendTo('#element');

// Disable tab
tabObj.enableTab(1, false);  // Disable Step 2

// Enable tab
tabObj.enableTab(1, true);  // Enable Step 2

// Check if tab is enabled
function isTabEnabled(index: number): boolean {
    return tabObj.items[index]?.disabled !== true;
}
```

**Real-World Usage:**

```typescript
// Multi-step form - disable future steps
function setupFormSteps() {
    // Only enable first step initially
    for (let i = 1; i < tabObj.items.length; i++) {
        tabObj.enableTab(i, false);  // Disable all but first
    }
}

// Enable next step when current step is complete
let tabObj = new Tab({
    items: [
        { header: { 'text': 'Personal' }, content: '...' },
        { header: { 'text': 'Address' }, content: '...' },
        { header: { 'text': 'Review' }, content: '...' }
    ],
    added: (args) => {
        // When user completes current step, enable next step
        let currentIndex = tabObj.selectedItem;
        if (currentIndex < tabObj.items.length - 1) {
            tabObj.enableTab(currentIndex + 1, true);
        }
    }
});

// Lock/unlock tabs based on permissions
function updateTabPermissions(userId: number) {
    fetch(`/api/user/${userId}/permissions`)
        .then(r => r.json())
        .then(perms => {
            perms.forEach((perm: any, index: number) => {
                tabObj.enableTab(index, perm.canAccess);
            });
        });
}
```

---

## Event Management

### addEventListener()

Adds an event listener to the Tab component.

**Signature:**
```typescript
addEventListener(eventName: string, handler: Function): void
```

**Parameters:**
- `eventName` (string): Name of the event to listen to
- `handler` (Function): Callback function to execute

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [...]
});
tabObj.appendTo('#element');

// Add event listener
tabObj.addEventListener('selected', (args: SelectEventArgs) => {
    console.log('Tab selected at index:', tabObj.selectedItem);
});

// Add multiple listeners
tabObj.addEventListener('adding', (args) => {
    console.log('Tab being added');
});

tabObj.addEventListener('removing', (args) => {
    console.log('Tab being removed');
});

// Add listener after initialization
setTimeout(() => {
    tabObj.addEventListener('dragged', (args) => {
        console.log('Tab drag completed');
        saveTabOrder();
    });
}, 1000);
```

**Real-World Usage:**

```typescript
// Analytics tracking
function setupAnalyticsTracking() {
    tabObj.addEventListener('selected', (args) => {
        let selectedTab = tabObj.items[tabObj.selectedItem];
        trackEvent({
            event: 'tab_selected',
            tab_name: selectedTab.header?.text,
            timestamp: new Date()
        });
    });
}

// Auto-save on changes
function enableAutoSave() {
    tabObj.addEventListener('selected', () => {
        // Auto-save when tab changes
        autoSaveCurrentTab();
    });
    
    tabObj.addEventListener('added', () => {
        autoSaveAllTabs();
    });
}

// Debug mode - log all events
function enableDebugMode() {
    const events = ['selected', 'selecting', 'adding', 'added', 'removing', 'removed'];
    
    events.forEach(event => {
        tabObj.addEventListener(event, (args) => {
            console.log(`[Tab Event] ${event}:`, args);
        });
    });
}
```

---

### removeEventListener()

Removes an event listener from the Tab component.

**Signature:**
```typescript
removeEventListener(eventName: string, handler: Function): void
```

**Parameters:**
- `eventName` (string): Name of the event to stop listening
- `handler` (Function): Reference to the handler function to remove

**Return:** `void`

**Usage Examples:**

```typescript
// Define handler function
const handleTabSelection = (args: SelectEventArgs) => {
    console.log('Tab selected');
};

let tabObj: Tab = new Tab({
    items: [...]
});
tabObj.appendTo('#element');

// Add listener
tabObj.addEventListener('selected', handleTabSelection);

// Remove listener
tabObj.removeEventListener('selected', handleTabSelection);

// Named handlers make removal easier
const handlers = {
    onSelect: (args: any) => { /* handler */ },
    onAdd: (args: any) => { /* handler */ },
    onRemove: (args: any) => { /* handler */ }
};

tabObj.addEventListener('selected', handlers.onSelect);
tabObj.addEventListener('adding', handlers.onAdd);

// Later: remove specific handlers
tabObj.removeEventListener('selected', handlers.onSelect);
```

**Real-World Usage:**

```typescript
// Temporary event listener
function listenOnceForTabChange(callback: Function) {
    const handler = () => {
        callback();
        tabObj.removeEventListener('selected', handler);  // Remove after first call
    };
    
    tabObj.addEventListener('selected', handler);
}

// Cleanup listeners on component destroy
let tabObj = new Tab({
    items: [...],
    destroyed: () => {
        // Cleanup all listeners
        tabObj.removeEventListener('selected', handleSelection);
        tabObj.removeEventListener('adding', handleAdding);
        console.log('Event listeners cleaned up');
    }
});

// Toggle tracking on/off
let isTrackingEnabled = false;
const trackingHandler = (args: any) => {
    trackEvent(args);
};

function toggleTracking(enabled: boolean) {
    if (enabled && !isTrackingEnabled) {
        tabObj.addEventListener('selected', trackingHandler);
        isTrackingEnabled = true;
    } else if (!enabled && isTrackingEnabled) {
        tabObj.removeEventListener('selected', trackingHandler);
        isTrackingEnabled = false;
    }
}
```

---

## Component Lifecycle

### destroy()

Removes the Tab component from the DOM and detaches all event handlers.

**Signature:**
```typescript
destroy(): void
```

**Parameters:** None

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [...]
});
tabObj.appendTo('#element');

// Later, destroy the component
document.getElementById('destroyBtn')?.addEventListener('click', () => {
    tabObj.destroy();
    console.log('Tab destroyed');
});

// Destroy and recreate with new config
function recreateTab(newConfig: any) {
    tabObj.destroy();
    
    tabObj = new Tab(newConfig);
    tabObj.appendTo('#element');
}
```

**Real-World Usage:**

```typescript
// SPA navigation - destroy Tab when leaving page
class TabPage {
    private tabObj: Tab;
    
    init(config: any) {
        this.tabObj = new Tab(config);
        this.tabObj.appendTo('#element');
    }
    
    // Called when navigating away
    cleanup() {
        // Save state before destroying
        this.saveComponentState();
        
        // Destroy component
        this.tabObj.destroy();
        
        // Clear memory
        this.tabObj = null as any;
    }
}

// Modal dialog with Tab
function showTabsInModal() {
    let modalTabObj: Tab;
    
    // Create modal
    let modal = document.createElement('div');
    let tabContainer = document.createElement('div');
    modal.appendChild(tabContainer);
    
    // Initialize Tab in modal
    modalTabObj = new Tab({
        items: [...]
    });
    modalTabObj.appendTo(tabContainer);
    
    // On modal close - cleanup Tab
    function closeModal() {
        modalTabObj.destroy();
        modal.remove();
    }
}
```

---

### refresh()

Refreshes the entire Tab component and redraws all elements.

**Signature:**
```typescript
refresh(): void
```

**Parameters:** None

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' }
    ]
});
tabObj.appendTo('#element');

// Refresh entire Tab
tabObj.refresh();

// Refresh after modifying items directly
tabObj.items[0].header.text = 'Updated Tab 1';
tabObj.refresh();

// Refresh on window resize
window.addEventListener('resize', () => {
    tabObj.refresh();
});
```

**Real-World Usage:**

```typescript
// Theme change - refresh to apply new theme
function changeTheme(themeName: string) {
    // Change CSS theme
    document.body.className = themeName;
    
    // Refresh Tab to apply new theme
    tabObj.refresh();
}

// Locale change - refresh with new language
function changeLanguage(locale: string) {
    tabObj.locale = locale;
    tabObj.refresh();
}

// Dynamic data refresh
function refreshTabData() {
    fetch('/api/tabs')
        .then(r => r.json())
        .then(data => {
            tabObj.items = data;
            tabObj.refresh();
        });
}
```

---

### refreshActiveTab()

Refreshes only the currently selected tab's content.

**Signature:**
```typescript
refreshActiveTab(): void
```

**Parameters:** None

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Dashboard' }, content: 'Dashboard...' },
        { header: { 'text': 'Data' }, content: 'Live data...' }
    ],
    loadOn: 'Demand'
});
tabObj.appendTo('#element');

// Refresh only the current tab
tabObj.refreshActiveTab();

// Auto-refresh current tab every 10 seconds
setInterval(() => {
    tabObj.refreshActiveTab();
}, 10000);
```

**Real-World Usage:**

```typescript
// Live dashboard - refresh stats
function setupDashboardRefresh() {
    // Refresh every 30 seconds
    setInterval(() => {
        if (tabObj.selectedItem === 0) {  // If dashboard is active
            tabObj.refreshActiveTab();
        }
    }, 30000);
}

// Manual refresh button
document.getElementById('refreshBtn')?.addEventListener('click', () => {
    tabObj.refreshActiveTab();
    showNotification('Tab refreshed');
});

// Pull-to-refresh pattern
let pullDownStart: number | null = null;

document.addEventListener('touchstart', (e) => {
    pullDownStart = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    let pullDownEnd = e.changedTouches[0].clientY;
    if (pullDownEnd - (pullDownStart || 0) > 100) {
        tabObj.refreshActiveTab();
    }
    pullDownStart = null;
});
```

---

### refreshActiveTabBorder()

Refreshes the visual indicator/border of the currently active tab.

**Signature:**
```typescript
refreshActiveTabBorder(): void
```

**Parameters:** None

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [...]
});
tabObj.appendTo('#element');

// Refresh indicator position
tabObj.refreshActiveTabBorder();

// Useful after CSS changes
function updateTabIndicatorStyle() {
    // Change indicator color via CSS
    document.styleSheets[0].insertRule(
        '.e-tab .e-tab-header .e-indicator { background: red; }'
    );
    
    // Refresh indicator to apply new style
    tabObj.refreshActiveTabBorder();
}
```

**Real-World Usage:**

```typescript
// Dynamic theme - update indicator color
function applyThemeIndicatorColor(color: string) {
    document.documentElement.style.setProperty('--tab-indicator-color', color);
    tabObj.refreshActiveTabBorder();
}

// Responsive indicator - refresh on breakpoint change
let currentBreakpoint: string;

function handleResponsiveChange() {
    let newBreakpoint = window.innerWidth < 768 ? 'mobile' : 'desktop';
    
    if (newBreakpoint !== currentBreakpoint) {
        currentBreakpoint = newBreakpoint;
        tabObj.refreshActiveTabBorder();
    }
}

window.addEventListener('resize', handleResponsiveChange);
```

---

### refreshOverflow()

Adjusts Tab layout to handle overflow without full re-rendering (performance optimized).

**Signature:**
```typescript
refreshOverflow(): void
```

**Parameters:** None

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    overflowMode: 'Scrollable',
    items: [...]
});
tabObj.appendTo('#element');

// After adding many tabs dynamically
for (let i = 0; i < 100; i++) {
    tabObj.addTab([{
        header: { 'text': `Tab ${i}` },
        content: `Content ${i}`
    }]);
}

// Optimize layout after bulk changes
tabObj.refreshOverflow();
```

**Real-World Usage:**

```typescript
// Dynamic tab addition - optimize layout
function addManyTabsEfficiently(tabNames: string[]) {
    // Add all tabs
    tabNames.forEach(name => {
        tabObj.addTab([{
            header: { 'text': name },
            content: `Content for ${name}`
        }]);
    });
    
    // Optimize layout once
    tabObj.refreshOverflow();
}

// Hide/show tabs - refresh overflow
function toggleTabVisibility(indices: number[], visible: boolean) {
    indices.forEach(index => {
        tabObj.hideTab(index, !visible);
    });
    
    // Adjust layout for visibility changes
    tabObj.refreshOverflow();
}

// Window resize - optimize layout
window.addEventListener('resize', debounce(() => {
    tabObj.refreshOverflow();
}, 250));

function debounce(func: Function, delay: number) {
    let timeout: NodeJS.Timeout;
    return function(...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
```

---

## Component State

### disable()

Enables or disables the entire Tab component.

**Signature:**
```typescript
disable(value: boolean): void
```

**Parameters:**
- `value` (boolean): `true` to disable, `false` to enable

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [...]
});
tabObj.appendTo('#element');

// Disable Tab
tabObj.disable(true);

// Enable Tab
tabObj.disable(false);

// Toggle
function toggleTab() {
    let isDisabled = tabObj.element?.classList.contains('e-disabled');
    tabObj.disable(!isDisabled);
}
```

**Real-World Usage:**

```typescript
// Disable Tab during data load
function loadTabData() {
    tabObj.disable(true);  // Prevent interaction
    
    fetch('/api/data')
        .then(r => r.json())
        .then(data => {
            updateTabContent(data);
            tabObj.disable(false);  // Re-enable
        });
}

// Conditional enabling based on permissions
async function setupTabPermissions() {
    let user = await fetchUserData();
    
    if (!user.permissions.canAccessTabs) {
        tabObj.disable(true);
    }
}

// Form submission - disable Tab while saving
let tabObj = new Tab({
    items: [...],
    selected: (args) => {
        // Disable Tab while validating
        tabObj.disable(true);
        
        validateCurrentTab().then(() => {
            tabObj.disable(false);
        });
    }
});
```

---

## Utility Methods

### getItemIndex()

Gets the index of a tab item by its ID.

**Signature:**
```typescript
getItemIndex(tabItemId: string): number
```

**Parameters:**
- `tabItemId` (string): ID of the tab item

**Return:** `number` - Index of the tab, or -1 if not found

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Home' }, id: 'home-tab' },
        { header: { 'text': 'About' }, id: 'about-tab' },
        { header: { 'text': 'Contact' }, id: 'contact-tab' }
    ]
});
tabObj.appendTo('#element');

// Get index by ID
let homeTabIndex = tabObj.getItemIndex('home-tab');
console.log(homeTabIndex);  // 0

// Select tab by ID
let aboutIndex = tabObj.getItemIndex('about-tab');
if (aboutIndex !== -1) {
    tabObj.select(aboutIndex);
}

// Check if tab exists
if (tabObj.getItemIndex('unknown-tab') === -1) {
    console.log('Tab not found');
}
```

**Real-World Usage:**

```typescript
// Navigation by ID
function navigateToTab(tabId: string) {
    let index = tabObj.getItemIndex(tabId);
    
    if (index === -1) {
        console.warn(`Tab ${tabId} not found`);
        return false;
    }
    
    tabObj.select(index);
    return true;
}

// Deep linking - navigate from URL hash
function initializeFromURL() {
    let tabId = window.location.hash.slice(1);
    
    if (tabId) {
        let index = tabObj.getItemIndex(tabId);
        if (index !== -1) {
            tabObj.select(index);
        }
    }
}

// Dynamic tab lookup
function closeTabsExcept(keepTabId: string) {
    let keepIndex = tabObj.getItemIndex(keepTabId);
    
    if (keepIndex === -1) return;
    
    // Remove all except the keep tab
    for (let i = tabObj.items.length - 1; i >= 0; i--) {
        if (i !== keepIndex) {
            tabObj.removeTab(i);
        }
    }
}
```

---

### getRootElement()

Gets the root HTML element of the Tab component.

**Signature:**
```typescript
getRootElement(): HTMLElement
```

**Parameters:** None

**Return:** `HTMLElement` - The root element of the Tab

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [...]
});
tabObj.appendTo('#element');

// Get root element
let rootElement = tabObj.getRootElement();
console.log(rootElement);  // HTMLElement

// Get dimensions
let rect = rootElement.getBoundingClientRect();
console.log(`Width: ${rect.width}, Height: ${rect.height}`);

// Add custom class
rootElement.classList.add('my-custom-class');

// Attach to parent
let parent = document.getElementById('new-parent');
if (parent && rootElement.parentElement) {
    parent.appendChild(rootElement);
}
```

**Real-World Usage:**

```typescript
// Apply custom styling
function styleTabComponent(theme: string) {
    let root = tabObj.getRootElement();
    root.dataset.theme = theme;
    root.classList.add(`theme-${theme}`);
}

// Position Tab in layout
function repositionTab() {
    let root = tabObj.getRootElement();
    let parent = root.parentElement;
    
    if (parent) {
        let position = parent.getBoundingClientRect();
        root.style.position = 'absolute';
        root.style.left = `${position.left}px`;
        root.style.top = `${position.top}px`;
    }
}

// Observe element changes
function observeTabElement() {
    let root = tabObj.getRootElement();
    
    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                console.log('Tab structure changed');
                onTabStructureChange();
            }
        });
    });
    
    observer.observe(root, { childList: true, subtree: true });
}

// Remove/detach Tab from DOM
function detachTab() {
    let root = tabObj.getRootElement();
    root.remove();  // Remove from DOM
    // Tab object still exists, can be re-attached
}
```

---

### appendTo()

Appends the Tab component to a DOM element.

**Signature:**
```typescript
appendTo(selector?: string | HTMLElement): void
```

**Parameters:**
- `selector` (string | HTMLElement, optional): Target element or CSS selector

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [...]
});

// Append using CSS selector
tabObj.appendTo('#tab-container');

// Append to HTMLElement
let container = document.getElementById('tab-container');
if (container) {
    tabObj.appendTo(container);
}

// Append without argument (uses default)
tabObj.appendTo();

// Re-append to different element
let newContainer = document.getElementById('new-container');
tabObj.appendTo(newContainer);
```

**Real-World Usage:**

```typescript
// Dynamic Tab creation based on condition
function createTabInContainer(containerId: string) {
    let tabObj = new Tab({
        items: [...]
    });
    
    tabObj.appendTo(`#${containerId}`);
    return tabObj;
}

// SPA navigation - create Tab on demand
class DashboardPage {
    private tabObj?: Tab;
    
    load() {
        // Create Tab
        this.tabObj = new Tab({
            items: [...]
        });
        
        // Append to page container
        this.tabObj.appendTo('#dashboard-content');
    }
    
    unload() {
        // Destroy when leaving page
        this.tabObj?.destroy();
    }
}

// Modal Tab initialization
function showTabsInModal() {
    // Create modal
    let modal = document.createElement('div');
    modal.className = 'modal';
    
    // Create tab container
    let tabContainer = document.createElement('div');
    modal.appendChild(tabContainer);
    
    // Create Tab
    let tabObj = new Tab({
        items: [...]
    });
    
    // Append to modal contained element
    tabObj.appendTo(tabContainer);
    
    // Show modal
    document.body.appendChild(modal);
}
```

---

### dataBind()

Applies all pending property changes immediately to the component.

**Signature:**
```typescript
dataBind(): void
```

**Parameters:** None

**Return:** `void`

**Usage Examples:**

```typescript
let tabObj: Tab = new Tab({
    items: [...]
});
tabObj.appendTo('#element');

// Modify multiple properties
tabObj.selectedItem = 1;
tabObj.height = '500px';
tabObj.cssClass = 'custom-theme';

// Apply all changes at once
tabObj.dataBind();

// Or individual binding
tabObj.selectedItem = 0;
tabObj.dataBind();
```

**Real-World Usage:**

```typescript
// Batch update many properties
function applyNewConfiguration(config: any) {
    // Update all properties
    Object.assign(tabObj, {
        selectedItem: config.selectedItem || 0,
        heightAdjustMode: config.heightMode || 'Auto',
        overflowMode: config.overflowMode || 'Scrollable',
        enablePersistence: config.persist || false,
        cssClass: config.theme || ''
    });
    
    // Apply all at once
    tabObj.dataBind();
}

// Restore from saved state
function restoreTabState(savedState: any) {
    // Restore all properties
    tabObj.selectedItem = savedState.selectedIndex;
    tabObj.items = savedState.items;
    tabObj.cssClass = savedState.cssClass;
    
    // Bind changes
    tabObj.dataBind();
}
```

---

## Method Interaction Patterns

### Pattern 1: Complete Tab Lifecycle

```typescript
// Create
let tabObj = new Tab({ items: [] });
tabObj.appendTo('#container');

// Modify
tabObj.addTab([{ header: { 'text': 'New' }, content: 'Content' }]);
tabObj.select(0);
tabObj.refreshOverflow();

// Cleanup
tabObj.destroy();
```

### Pattern 2: Event-Driven Updates

```typescript
let tabObj = new Tab({
    items: [...],
    adding: (args) => {
        console.log('Adding tab');
        if (shouldDisallowAdd(args)) {
            args.cancel = true;
        }
    },
    added: (args) => {
        tabObj.refreshOverflow();  // Optimize layout
    }
});
```

### Pattern 3: Dynamic Configuration

```typescript
function reconfigureTab(newConfig: any) {
    // Update properties
    tabObj.heightAdjustMode = newConfig.heightMode;
    tabObj.overflowMode = newConfig.overflow;
    
    // Apply and refresh
    tabObj.dataBind();
    tabObj.refresh();
}
```

---

## Summary

All 18 methods provide complete control over Tab component:
- **Tab Management** (addTab, removeTab)
- **Navigation** (select)
- **Visibility** (hideTab, enableTab)
- **Events** (addEventListener, removeEventListener)
- **Lifecycle** (destroy, refresh, refreshActiveTab, refreshActiveTabBorder, refreshOverflow)
- **State** (disable, dataBind)
- **Utilities** (getItemIndex, getRootElement, appendTo)

