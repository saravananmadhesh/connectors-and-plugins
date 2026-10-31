# Nested Lists and Navigation

## Table of Contents
- [Nested List Data Structure](#nested-list-data-structure)
- [Basic Nested Lists](#basic-nested-lists)
- [Navigation and Drill-Down](#navigation-and-drill-down)
- [Back Navigation](#back-navigation)
- [Breadcrumb Navigation](#breadcrumb-navigation)
- [Dynamic Hierarchies](#dynamic-hierarchies)
- [Multi-Level Nesting](#multi-level-nesting)

## Nested List Data Structure

### Flat Parent-Child Structure

```typescript
const nestedData = [
    { id: '1', text: 'Item 1', parentId: null },
    { id: '1-1', text: 'Child 1-1', parentId: '1' },
    { id: '1-2', text: 'Child 1-2', parentId: '1' },
    { id: '2', text: 'Item 2', parentId: null },
    { id: '2-1', text: 'Child 2-1', parentId: '2' }
];
```

### Hierarchical Nested Structure

```typescript
const hierarchicalData = [
    {
        text: 'Documents',
        id: '1',
        child: [
            { text: 'Resume.doc', id: '1-1' },
            { text: 'Cover Letter.doc', id: '1-2' }
        ]
    },
    {
        text: 'Pictures',
        id: '2',
        child: [
            { text: 'Vacation.jpg', id: '2-1' },
            { text: 'Family.png', id: '2-2' }
        ]
    }
];
```

### Complex Nested Structure

```typescript
interface NestedItem {
    id: string;
    text: string;
    child?: NestedItem[];
    icon?: string;
    hasChildren?: boolean;
}

const complexData: NestedItem[] = [
    {
        id: '1',
        text: 'Organization',
        child: [
            {
                id: '1-1',
                text: 'Engineering',
                child: [
                    { id: '1-1-1', text: 'Frontend' },
                    { id: '1-1-2', text: 'Backend' }
                ]
            },
            {
                id: '1-2',
                text: 'Sales',
                child: []
            }
        ]
    }
];
```

## Basic Nested Lists

### Simple Nested List

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const hierarchicalData = [
    {
        text: 'Fruits',
        id: '1',
        child: [
            { text: 'Apple', id: '1-1' },
            { text: 'Banana', id: '1-2' },
            { text: 'Orange', id: '1-3' }
        ]
    },
    {
        text: 'Vegetables',
        id: '2',
        child: [
            { text: 'Carrot', id: '2-1' },
            { text: 'Broccoli', id: '2-2' }
        ]
    }
];

const listView = new ListView({
    dataSource: hierarchicalData,
    fields: {
        id: 'id',
        text: 'text',
        child: 'child'
    }
});

listView.appendTo('#listview');
```

### Nested List with Icons

```typescript
const hierarchicalData = [
    {
        text: 'Folder1',
        id: '1',
        icon: 'e-icons e-folder',
        child: [
            { text: 'File1.txt', id: '1-1', icon: 'e-icons e-file' },
            { text: 'File2.txt', id: '1-2', icon: 'e-icons e-file' }
        ]
    }
];

const listView = new ListView({
    dataSource: hierarchicalData,
    fields: {
        id: 'id',
        text: 'text',
        child: 'child',
        iconCss: 'icon'
    },
    template: '<span class="${icon}"></span> ${text}'
});

listView.appendTo('#listview');
```

## Navigation and Drill-Down

### Handle Item Click Navigation

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const listView = new ListView({
    dataSource: hierarchicalData,
    fields: {
        id: 'id',
        text: 'text',
        child: 'child'
    },
    select: (args) => {
        if (args.data.child && args.data.child.length > 0) {
            // Navigate to child list
            navigateToChild(args.data);
        }
    }
});

listView.appendTo('#listview');

function navigateToChild(parentItem) {
    // Clear and update ListView with children
    listView.dataSource = parentItem.child;
    listView.render();
}
```

### Manual Navigation

```typescript
let currentLevel = hierarchicalData;
let navigationHistory = [hierarchicalData];

const listView = new ListView({
    dataSource: currentLevel,
    fields: { id: 'id', text: 'text', child: 'child' },
    select: (args) => {
        if (args.data.child && args.data.child.length > 0) {
            currentLevel = args.data.child;
            navigationHistory.push(currentLevel);
            listView.dataSource = currentLevel;
            listView.render();
        }
    }
});

listView.appendTo('#listview');

function goBack() {
    if (navigationHistory.length > 1) {
        navigationHistory.pop();
        currentLevel = navigationHistory[navigationHistory.length - 1];
        listView.dataSource = currentLevel;
        listView.render();
    }
}

document.getElementById('back-btn').addEventListener('click', goBack);
```

## Back Navigation

### Implement Back Button

```typescript
class NavigationManager {
    private history: any[][] = [];
    private currentData: any[];

    constructor(initialData: any[]) {
        this.currentData = initialData;
        this.history.push(initialData);
    }

    navigateTo(childData: any[]) {
        this.currentData = childData;
        this.history.push(childData);
    }

    canGoBack(): boolean {
        return this.history.length > 1;
    }

    goBack() {
        if (this.canGoBack()) {
            this.history.pop();
            this.currentData = this.history[this.history.length - 1];
            return this.currentData;
        }
        return null;
    }

    getCurrentData() {
        return this.currentData;
    }
}

// Usage
const navManager = new NavigationManager(hierarchicalData);

const listView = new ListView({
    dataSource: navManager.getCurrentData(),
    fields: { id: 'id', text: 'text', child: 'child' },
    select: (args) => {
        if (args.data.child && args.data.child.length > 0) {
            navManager.navigateTo(args.data.child);
            listView.dataSource = navManager.getCurrentData();
            listView.render();
        }
    }
});

listView.appendTo('#listview');

document.getElementById('back-btn').addEventListener('click', () => {
    const backData = navManager.goBack();
    if (backData) {
        listView.dataSource = backData;
        listView.render();
        updateBackButtonState();
    }
});

function updateBackButtonState() {
    const backBtn = document.getElementById('back-btn');
    backBtn.disabled = !navManager.canGoBack();
}

updateBackButtonState();
```

## Breadcrumb Navigation

### Display Breadcrumb Path

```typescript
interface NavItem {
    text: string;
    data: any[];
}

class BreadcrumbNavigator {
    private breadcrumbs: NavItem[] = [];
    private listView: ListView;

    constructor(listView: ListView) {
        this.listView = listView;
        this.breadcrumbs = [
            { text: 'Home', data: hierarchicalData }
        ];
        this.renderBreadcrumb();
    }

    navigateTo(text: string, data: any[]) {
        this.breadcrumbs.push({ text, data });
        this.listView.dataSource = data;
        this.listView.render();
        this.renderBreadcrumb();
    }

    navigateTo(index: number) {
        this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
        const current = this.breadcrumbs[index];
        this.listView.dataSource = current.data;
        this.listView.render();
        this.renderBreadcrumb();
    }

    private renderBreadcrumb() {
        const breadcrumbHtml = this.breadcrumbs
            .map((item, index) => 
                `<a href="#" data-index="${index}">${item.text}</a>`
            )
            .join(' / ');

        const breadcrumbContainer = document.getElementById('breadcrumb');
        if (breadcrumbContainer) {
            breadcrumbContainer.innerHTML = breadcrumbHtml;
            
            // Add click handlers
            breadcrumbContainer.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const index = parseInt(link.getAttribute('data-index') || '0');
                    this.navigateTo(index);
                });
            });
        }
    }
}

// HTML
const html = `
    <div id="breadcrumb"></div>
    <div id="listview"></div>
`;

// Usage
const breadcrumbNav = new BreadcrumbNavigator(listView);
```

### Template-Based Breadcrumb

```typescript
function renderBreadcrumbTemplate() {
    const breadcrumbHtml = navigationHistory
        .map((item, index) => `<span class="breadcrumb-item">${item.text}</span>`)
        .join('<span class="breadcrumb-separator"> > </span>');
    
    return `<div class="breadcrumb">${breadcrumbHtml}</div>`;
}

const listView = new ListView({
    dataSource: currentLevel,
    fields: { id: 'id', text: 'text', child: 'child' },
    headerTemplate: renderBreadcrumbTemplate(),
    showHeader: true
});

listView.appendTo('#listview');
```

## Dynamic Hierarchies

### Remote Nested Data

```typescript
const listView = new ListView({
    dataSource: 'url',
    fields: {
        id: 'id',
        text: 'text',
        child: 'children'
    }
});

listView.appendTo('#listview');
```

### Load Children on Demand

```typescript
const listView = new ListView({
    dataSource: rootData,
    fields: { id: 'id', text: 'text', child: 'child' },
    select: async (args) => {
        if (args.data.hasChildren && !args.data.child) {
            // Load children from API
            const response = await fetch(
                `url/items/${args.data.id}/children`
            );
            const children = await response.json();
            args.data.child = children;
            
            listView.dataSource = children;
            listView.render();
        }
    }
});

listView.appendTo('#listview');
```

## Multi-Level Nesting

### Three-Level Hierarchy

```typescript
const threeLevel = [
    {
        text: 'Level 1',
        id: '1',
        child: [
            {
                text: 'Level 1-1',
                id: '1-1',
                child: [
                    { text: 'Level 1-1-1', id: '1-1-1' },
                    { text: 'Level 1-1-2', id: '1-1-2' }
                ]
            },
            {
                text: 'Level 1-2',
                id: '1-2',
                child: [
                    { text: 'Level 1-2-1', id: '1-2-1' }
                ]
            }
        ]
    }
];

const listView = new ListView({
    dataSource: threeLevel,
    fields: {
        id: 'id',
        text: 'text',
        child: 'child'
    }
});

listView.appendTo('#listview');
```

### Recursive Navigation

```typescript
function findInHierarchy(data: any[], id: string): any {
    for (let item of data) {
        if (item.id === id) return item;
        if (item.child) {
            const found = findInHierarchy(item.child, id);
            if (found) return found;
        }
    }
    return null;
}

function getPathToItem(data: any[], id: string, path: any[] = []): any[] {
    for (let item of data) {
        if (item.id === id) return [...path, item];
        if (item.child) {
            const result = getPathToItem(item.child, id, [...path, item]);
            if (result.length > path.length) return result;
        }
    }
    return path;
}

// Usage
const itemPath = getPathToItem(threeLevel, '1-1-2');
console.log('Path to item:', itemPath.map(item => item.text));
```

## Complete Hierarchical Navigation Example

```typescript
class HierarchicalListView {
    private listView: ListView;
    private navigationStack: any[] = [];
    private rootData: any[];

    constructor(rootData: any[], containerId: string) {
        this.rootData = rootData;
        this.navigationStack = [rootData];

        this.listView = new ListView({
            dataSource: rootData,
            fields: {
                id: 'id',
                text: 'text',
                child: 'child'
            },
            select: (args) => this.handleItemSelect(args),
            headerTemplate: `<div class="header">${this.getBreadcrumb()}</div>`,
            showHeader: true
        });

        this.listView.appendTo(`#${containerId}`);
    }

    private handleItemSelect(args: any) {
        if (args.data.child && args.data.child.length > 0) {
            this.navigationStack.push(args.data.child);
            this.listView.dataSource = args.data.child;
            this.listView.headerTemplate = `<div class="header">${this.getBreadcrumb()}</div>`;
            this.listView.refresh();
        }
    }

    private getBreadcrumb(): string {
        return this.navigationStack
            .map((level, index) => {
                const firstItem = Array.isArray(level) ? level[0] : level;
                return `<span onclick="goToLevel(${index})">${firstItem.text || 'Root'}</span>`;
            })
            .join(' > ');
    }

    public goToLevel(levelIndex: number) {
        this.navigationStack = this.navigationStack.slice(0, levelIndex + 1);
        const current = this.navigationStack[levelIndex];
        this.listView.dataSource = current;
        this.listView.refresh();
    }

    public canGoBack(): boolean {
        return this.navigationStack.length > 1;
    }

    public goBack() {
        if (this.canGoBack()) {
            this.navigationStack.pop();
            const current = this.navigationStack[this.navigationStack.length - 1];
            this.listView.dataSource = current;
            this.listView.refresh();
        }
    }
}

// Usage
const navigator = new HierarchicalListView(hierarchicalData, 'listview');
```

## Hyperlink Navigation

### Basic Hyperlink Items

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const navigationData = [
    { id: '1', text: 'Home', url: '/', icon: 'e-icon-home' },
    { id: '2', text: 'About', url: '/about', icon: 'e-icon-info' },
    { id: '3', text: 'Services', url: '/services', icon: 'e-icon-service' },
    { id: '4', text: 'Contact', url: '/contact', icon: 'e-icon-contact' }
];

const linkTemplate = `
    <a href="${'${url}'}" class="nav-link">
        <span class="${'${icon}'}"></span>
        <span>${'${text}'}</span>
    </a>
`;

const listView = new ListView({
    dataSource: navigationData,
    fields: { id: 'id', text: 'text' },
    template: linkTemplate
});

listView.appendTo('#navigation');
```

### Hyperlink with Active State

```typescript
const listView = new ListView({
    dataSource: navigationData,
    fields: { id: 'id', text: 'text' },
    template: linkTemplate,
    select: highlightActiveLink
});

listView.appendTo('#navigation');

function highlightActiveLink(args) {
    // Remove active class from all items
    document.querySelectorAll('.e-list-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected item
    args.element.classList.add('active');
    
    // Store in localStorage
    localStorage.setItem('active-nav', args.data.id);
}

// CSS for active link
const linkStyles = `
    .e-list-item a {
        text-decoration: none;
        color: #333;
        display: flex;
        align-items: center;
        padding: 12px 16px;
        transition: background-color 0.3s ease;
    }
    
    .e-list-item a:hover {
        background-color: #f0f0f0;
    }
    
    .e-list-item.active a {
        background-color: #0078d7;
        color: white;
    }
    
    .e-list-item a .e-icon {
        margin-right: 12px;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = linkStyles;
document.head.appendChild(styleSheet);
```

### External Link Navigation

```typescript
// Open links in new tab or modal
const externalLinkTemplate = `
    <div class="link-item" data-id="${'${id}'}" data-url="${'${url}'}" data-target="${'${target}'}">
        <span class="link-text">${'${text}'}</span>
        <span class="link-arrow">→</span>
    </div>
`;

const listView = new ListView({
    dataSource: navigationData,
    template: externalLinkTemplate,
    select: handleLinkNavigation
});

listView.appendTo('#external-links');

function handleLinkNavigation(args) {
    const url = args.currentElement.dataset.url;
    const target = args.currentElement.dataset.target || '_self';
    
    if (url) {
        window.open(url, target);
    }
}
```

### Internal Route Navigation

```typescript
// With SPA router integration
const routeData = [
    { id: '1', text: 'Dashboard', route: '/dashboard' },
    { id: '2', text: 'Users', route: '/users' },
    { id: '3', text: 'Settings', route: '/settings' }
];

const routeTemplate = `
    <div class="route-link" data-route="${'${route}'}">
        ${'${text}'}
    </div>
`;

const listView = new ListView({
    dataSource: routeData,
    template: routeTemplate,
    select: navigateToRoute
});

listView.appendTo('#routes');

function navigateToRoute(args) {
    const route = args.currentElement.dataset.route;
    
    // Navigate using your router (e.g., Angular Router)
    if (window.router && window.router.navigate) {
        window.router.navigate([route]);
    } else if (window.location) {
        window.location.hash = route;
    }
}
```

### Nested Hyperlink Navigation

```typescript
// Hyperlinks with child items
const nestedLinks = [
    {
        text: 'Products',
        url: '/products',
        child: [
            { text: 'Electronics', url: '/products/electronics' },
            { text: 'Books', url: '/products/books' },
            { text: 'Clothing', url: '/products/clothing' }
        ]
    },
    {
        text: 'Resources',
        url: '/resources',
        child: [
            { text: 'Documentation', url: '/docs' },
            { text: 'API Reference', url: '/api' },
            { text: 'Blog', url: '/blog' }
        ]
    }
];

const nestedLinkTemplate = `
    <a href="${'${url}'}" class="nested-link">
        ${'${text}'} 
        <span class="link-icon">></span>
    </a>
`;

const listView = new ListView({
    dataSource: nestedLinks,
    fields: { dataSource: 'child', text: 'text', id: 'text' },
    template: nestedLinkTemplate,
    select: handleNestedLink
});

listView.appendTo('#nested-links');

function handleNestedLink(args) {
    if (args.data.child) {
        // Show child links
        listView.dataSource = args.data.child;
        listView.refresh();
        updateBreadcrumb(args.data.text);
    } else {
        // Navigate to link
        window.location.href = args.data.url;
    }
}

function updateBreadcrumb(itemText) {
    const breadcrumb = document.getElementById('breadcrumb');
    breadcrumb.innerHTML += ` > ${itemText}`;
}
```

### Link with Icon Navigation

```typescript
// Enhanced navigation with icons
const iconNavData = [
    { 
        id: '1', 
        text: 'Dashboard', 
        url: '/dashboard', 
        icon: 'e-icons e-dashboard',
        badge: 'new'
    },
    { 
        id: '2', 
        text: 'Messages', 
        url: '/messages', 
        icon: 'e-icons e-mail',
        badge: '5'
    },
    { 
        id: '3', 
        text: 'Notifications', 
        url: '/notifications', 
        icon: 'e-icons e-bell',
        badge: '3'
    }
];

const iconLinkTemplate = `
    <a href="${'${url}'}" class="icon-link">
        <span class="link-icon ${'{...}icon{'}")"></span>
        <span class="link-text">${'${text}'}</span>
        <span class="link-badge" ${'{...}badge{' ? `data-badge="${'${badge}'}"` : ''}>
            ${'{...}badge{'}}
        </span>
    </a>
`;

const listView = new ListView({
    dataSource: iconNavData,
    template: iconLinkTemplate
});

listView.appendTo('#icon-nav');

// CSS for icon navigation
const iconNavStyles = `
    .icon-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        text-decoration: none;
        color: #333;
    }
    
    .link-icon {
        font-size: 18px;
        width: 24px;
    }
    
    .link-badge {
        margin-left: auto;
        background-color: #ff5722;
        color: white;
        border-radius: 12px;
        padding: 2px 8px;
        font-size: 12px;
        font-weight: bold;
    }
`;
```

See data-binding.md for handling remote nested data structures.
