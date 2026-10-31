# Content Integration

## Table of Contents
- [Sidebar with List View](#sidebar-with-list-view)
- [Sidebar with Tree View](#sidebar-with-tree-view)
- [Multiple Sidebar Instances](#multiple-sidebar-instances)
- [Custom HTML Content](#custom-html-content)

## Sidebar with List View

### Basic List View in Sidebar

Create a sidebar with organized list content:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';
import { ListView } from '@syncfusion/ej2-lists';

// Initialize sidebar
let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    width: '280px'
});
sidebar.appendTo('#sidebar');

// Initialize list view inside sidebar
let listViewData = [
    { text: 'Dashboard', id: '01' },
    { text: 'Analytics', id: '02' },
    { text: 'Reports', id: '03' },
    { text: 'Settings', id: '04' }
];

let listView: ListView = new ListView({
    dataSource: listViewData,
    select: (e: any) => {
        console.log('Selected:', e.text);
    }
});
listView.appendTo('#nav-list');
```

### HTML Structure with List View

```html
<aside id="sidebar">
    <div class="sidebar-header">
        <h2>Navigation</h2>
    </div>
    <ul id="nav-list"></ul>
</aside>

<div>
    <div class="content">
        <h1>Main Content</h1>
    </div>
</div>
```

### Enhanced List with Icons

```typescript
interface NavItem {
    text: string;
    icon: string;
    id: string;
    badge?: string;
}

const navData: NavItem[] = [
    { text: 'Dashboard', icon: 'e-icons e-dashboard', id: '01' },
    { text: 'Messages', icon: 'e-icons e-message', id: '02', badge: '5' },
    { text: 'Tasks', icon: 'e-icons e-tasks', id: '03', badge: '3' },
    { text: 'Settings', icon: 'e-icons e-settings', id: '04' }
];

let listView: ListView = new ListView({
    dataSource: navData,
    fields: { text: 'text' },
    template: '<span class="${icon}"></span><span>${text}</span>',
    select: (e: any) => {
        console.log('Navigating to:', e.data.text);
    }
});
listView.appendTo('#nav-list');
```

## Sidebar with Tree View

### Basic Tree View in Sidebar

Create hierarchical navigation:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';
import { TreeView } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    width: '280px'
});
sidebar.appendTo('#sidebar');

// Tree view data
let treeViewData = [
    {
        text: 'Products',
        children: [
            { text: 'Electronics' },
            { text: 'Clothing' },
            { text: 'Books' }
        ]
    },
    {
        text: 'Categories',
        children: [
            { text: 'New Arrivals' },
            { text: 'Best Sellers' },
            { text: 'Sale Items' }
        ]
    }
];

let treeView: TreeView = new TreeView({
    fields: { dataSource: treeViewData, text: 'text', child: 'children' },
    nodeSelected: (e: any) => {
        console.log('Selected node:', e.nodeData.text);
    }
});
treeView.appendTo('#nav-tree');
```

### HTML Structure with Tree View

```html
<aside id="sidebar">
    <div class="sidebar-header">
        <h2>Menu</h2>
    </div>
    <div id="nav-tree"></div>
</aside>

<div class="main-content">
    <h1>Content Area</h1>
</div>
```

### Expanded Tree View with Icons

```typescript
interface TreeNode {
    text: string;
    icon?: string;
    children?: TreeNode[];
}

const treeData: TreeNode[] = [
    {
        text: 'File Management',
        icon: 'e-icons e-folder',
        children: [
            { text: 'Documents', icon: 'e-icons e-document' },
            { text: 'Images', icon: 'e-icons e-image' },
            { text: 'Videos', icon: 'e-icons e-video' }
        ]
    },
    {
        text: 'Security',
        icon: 'e-icons e-security',
        children: [
            { text: 'Users', icon: 'e-icons e-user' },
            { text: 'Permissions', icon: 'e-icons e-lock' },
            { text: 'Audit Log', icon: 'e-icons e-log' }
        ]
    }
];

let treeView: TreeView = new TreeView({
    fields: { dataSource: treeData, text: 'text', child: 'children' },
    nodeTemplate: '<span>${icon} ${text}</span>'
});
treeView.appendTo('#nav-tree');
```

## Multiple Sidebar Instances

### Two Sidebars (Left and Right)

```html
<!-- Left sidebar -->
<aside id="left-sidebar" class="sidebar">
    <h3>Navigation</h3>
    <ul>
        <li>Home</li>
        <li>About</li>
    </ul>
</aside>

<!-- Main content -->
<div class="main">
    <h1>Content</h1>
</div>

<!-- Right sidebar -->
<aside id="right-sidebar" class="sidebar">
    <h3>Details</h3>
    <ul>
        <li>Info 1</li>
        <li>Info 2</li>
    </ul>
</aside>
```

```typescript
// Left sidebar
let leftSidebar: Sidebar = new Sidebar({
    position: 'Left',
    type: 'Push',
    width: '250px'
});
leftSidebar.appendTo('#left-sidebar');

// Right sidebar
let rightSidebar: Sidebar = new Sidebar({
    position: 'Right',
    type: 'Push',
    width: '280px'
});
rightSidebar.appendTo('#right-sidebar');

// Control both
document.querySelector('#toggle-left')?.addEventListener('click', () => {
    leftSidebar.toggle();
});

document.querySelector('#toggle-right')?.addEventListener('click', () => {
    rightSidebar.toggle();
});
```

### Multiple Sidebars in Same Position

```html
<!-- Primary sidebar -->
<aside id="primary-sidebar" class="sidebar">
    <h3>Main Menu</h3>
</aside>

<!-- Content wrapper -->
<div id="content-area">
    <div>
        <!-- Secondary sidebar (nested) -->
        <aside id="secondary-sidebar" class="sidebar">
            <h3>Sub Menu</h3>
        </aside>
        
        <div class="main-content">
            <h1>Content</h1>
        </div>
    </div>
</div>
```

```typescript
// Primary sidebar targets content area
let primarySidebar: Sidebar = new Sidebar({
    target: '#content-area',
    type: 'Push',
    width: '200px',
    position: 'Left'
});
primarySidebar.appendTo('#primary-sidebar');

// Secondary sidebar (independent)
let secondarySidebar: Sidebar = new Sidebar({
    type: 'Over',
    width: '150px'
});
secondarySidebar.appendTo('#secondary-sidebar');
```

## Custom HTML Content

### Rich Content Sidebar

```html
<aside id="sidebar">
    <div class="sidebar-content">
        <!-- Header -->
        <div class="sidebar-header">
            <img src="avatar.jpg" alt="User" class="avatar">
            <h3>John Doe</h3>
            <p>admin@example.com</p>
        </div>
        
        <!-- Search -->
        <div class="search-box">
            <input type="text" placeholder="Search...">
        </div>
        
        <!-- Navigation -->
        <nav class="sidebar-nav">
            <ul>
                <li><a href="#"><span class="icon">📊</span> Dashboard</a></li>
                <li><a href="#"><span class="icon">👥</span> Users</a></li>
                <li><a href="#"><span class="icon">⚙️</span> Settings</a></li>
            </ul>
        </nav>
        
        <!-- Footer -->
        <div class="sidebar-footer">
            <button class="e-btn">Logout</button>
        </div>
    </div>
</aside>
```

### Styled Custom Content

```css
.sidebar-header {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #eee;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
}

.search-box {
    padding: 15px;
}

.search-box input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.sidebar-nav {
    list-style: none;
    padding: 0;
}

.sidebar-nav li {
    border-bottom: 1px solid #f0f0f0;
}

.sidebar-nav a {
    display: block;
    padding: 15px 20px;
    text-decoration: none;
    color: #333;
    transition: background 0.3s;
}

.sidebar-nav a:hover {
    background: #f5f5f5;
}

.icon {
    margin-right: 10px;
    font-size: 18px;
}

.sidebar-footer {
    padding: 20px;
    border-top: 1px solid #eee;
}
```

### Dynamic Content Loading

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    width: '300px'
});
sidebar.appendTo('#sidebar');

// Load content dynamically
async function loadSidebarContent(category: string) {
    try {
        const response = await fetch(`/api/sidebar/${category}`);
        const data = await response.json();
        
        const sidebarContent = document.querySelector('.sidebar-content');
        if (sidebarContent) {
            sidebarContent.innerHTML = generateContent(data);
        }
    } catch (error) {
        console.error('Failed to load sidebar content:', error);
    }
}

function generateContent(data: any): string {
    return `
        <div class="sidebar-header">
            <h3>${data.title}</h3>
        </div>
        <ul>
            ${data.items.map((item: any) => `<li>${item.name}</li>`).join('')}
        </ul>
    `;
}
```

## Complete Navigation Component

```typescript
interface NavConfig {
    title: string;
    items: NavItem[];
}

interface NavItem {
    text: string;
    icon?: string;
    children?: NavItem[];
    action?: () => void;
}

class SidebarNavigation {
    private sidebar: Sidebar;
    private config: NavConfig;

    constructor(config: NavConfig) {
        this.config = config;
        this.sidebar = new Sidebar({
            type: 'Push',
            width: '280px'
        });
    }

    init() {
        this.sidebar.appendTo('#sidebar');
        this.renderNav();
    }

    private renderNav() {
        const header = document.querySelector('.sidebar-header');
        if (header) {
            header.innerHTML = `<h3>${this.config.title}</h3>`;
        }

        const navList = document.querySelector('.sidebar-nav');
        if (navList) {
            navList.innerHTML = this.renderItems(this.config.items);
        }
    }

    private renderItems(items: NavItem[]): string {
        return items.map(item => `
            <li>
                <a href="#" onclick="event.preventDefault()">
                    ${item.icon ? `<span class="e-icons ${item.icon}"></span>` : ''}
                    <span>${item.text}</span>
                </a>
                ${item.children ? `<ul>${this.renderItems(item.children)}</ul>` : ''}
            </li>
        `).join('');
    }

    show() {
        this.sidebar.show();
    }

    hide() {
        this.sidebar.hide();
    }

    toggle() {
        this.sidebar.toggle();
    }
}

// Usage
const navConfig: NavConfig = {
    title: 'My App',
    items: [
        { text: 'Dashboard', icon: 'e-dashboard' },
        { text: 'Products', icon: 'e-box',
          children: [
              { text: 'Electronics' },
              { text: 'Clothing' }
          ]
        }
    ]
};

const navigation = new SidebarNavigation(navConfig);
navigation.init();
```

## Common Patterns

**Pattern: Menu with Active State**
```typescript
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});
```

**Pattern: Nested Navigation**
```html
<nav>
    <ul>
        <li>
            <a href="#">Parent</a>
            <ul>
                <li><a href="#">Child 1</a></li>
                <li><a href="#">Child 2</a></li>
            </ul>
        </li>
    </ul>
</nav>
```

## Next Steps

- Learn **Styling and Theming** for appearance customization
- Explore **Animations and Gestures** for interactions
- Check **Troubleshooting** for common issues
