# Data Binding

## Table of Contents
- [HTML Setup](#html-setup)
- [Basic Data Binding](#basic-data-binding)
- [JSON Array Binding](#json-array-binding)
- [Nested Data Binding](#nested-data-binding)
- [Dynamic Data Updates](#dynamic-data-updates)
- [FieldSettings Mapping](#fieldsettings-mapping)
- [Real-Time Updates](#real-time-updates)

## HTML Setup

### Basic HTML Structure for Data Binding

```html
<div>
  <!-- Target element for context menu -->
  <div id="contextmenutarget" style="border: 1px solid #ccc; padding: 20px; width: 300px; height: 200px;">
    Right-click here to see data-bound menu items
  </div>
  <!-- ContextMenu will be rendered here -->
  <ul id="contextmenu"></ul>
</div>
```

## Basic Data Binding

### Simple Array Binding

Bind menu items from a data array:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

// Data source
const dataSource = [
  { name: 'Cut' },
  { name: 'Copy' },
  { name: 'Paste' }
];

// Configure FieldSettings
const contextMenu = new ContextMenu({
  items: dataSource,
  target: '#target',
  fields: {
    text: 'name'  // Map 'name' property to 'text'
  }
});

contextMenu.appendTo('#contextmenu');
```

### Object Array Binding

```typescript
const employees = [
  { id: 1, title: 'View Profile' },
  { id: 2, title: 'Edit' },
  { id: 3, title: 'Delete' }
];

const contextMenu = new ContextMenu({
  items: employees,
  target: '#target',
  fields: {
    text: 'title',
    id: 'id'
  }
});
```

### Binding with Multiple Properties

```typescript
const menuData = [
  {
    label: 'Edit',
    icon: 'e-icons e-edit',
    action: 'edit'
  },
  {
    label: 'Delete',
    icon: 'e-icons e-delete',
    action: 'delete'
  }
];

const contextMenu = new ContextMenu({
  items: menuData,
  target: '#target',
  fields: {
    text: 'label',
    iconCss: 'icon'
  }
});
```

## JSON Array Binding

### Simple JSON Structure

```typescript
const jsonData = [
  { text: 'New' },
  { text: 'Open' },
  { text: 'Save' },
  { separator: true },
  { text: 'Exit' }
];

const contextMenu = new ContextMenu({
  items: jsonData,
  target: '#target'
});

contextMenu.appendTo('#contextmenu');
```

### Inline Items from JSON

```typescript
const treeData = [
  {
    name: 'Fruits',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Orange' }
    ]
  },
  {
    name: 'Vegetables',
    children: [
      { name: 'Carrot' },
      { name: 'Spinach' }
    ]
  }
];

const contextMenu = new ContextMenu({
  items: treeData,
  target: '#target',
  fields: {
    text: 'name',
    children: 'children'  // Map nested items
  }
});
```

### JSON with Icons

```typescript
const menuWithIcons = [
  {
    text: 'File',
    icon: 'e-icons e-file',
    items: [
      { text: 'New', icon: 'e-icons e-new' },
      { text: 'Open', icon: 'e-icons e-folder-open' },
      { text: 'Save', icon: 'e-icons e-save' }
    ]
  },
  {
    text: 'Edit',
    icon: 'e-icons e-edit',
    items: [
      { text: 'Cut', icon: 'e-icons e-cut' },
      { text: 'Copy', icon: 'e-icons e-copy' }
    ]
  }
];

const contextMenu = new ContextMenu({
  items: menuWithIcons,
  target: '#target',
  fields: {
    text: 'text',
    iconCss: 'icon',
    children: 'items'
  }
});
```

## Nested Data Binding

### Hierarchical Data Structure

```typescript
const hierarchicalData = [
  {
    text: 'Format',
    items: [
      {
        text: 'Text',
        items: [
          { text: 'Bold' },
          { text: 'Italic' },
          { text: 'Underline' }
        ]
      },
      {
        text: 'Paragraph',
        items: [
          { text: 'Left Align' },
          { text: 'Center' },
          { text: 'Right Align' }
        ]
      }
    ]
  },
  {
    text: 'Styles',
    items: [
      { text: 'Heading 1' },
      { text: 'Heading 2' },
      { text: 'Normal' }
    ]
  }
];

const contextMenu = new ContextMenu({
  items: hierarchicalData,
  target: '#target'
});
```

### Multi-Level Nesting with Custom Fields

```typescript
const customData = [
  {
    category: 'Admin',
    subMenu: [
      { name: 'Users', action: 'manageUsers' },
      { name: 'Permissions', action: 'managePerms' },
      {
        name: 'Settings',
        subMenu: [
          { name: 'System', action: 'sysSetting' },
          { name: 'Security', action: 'secSetting' }
        ]
      }
    ]
  }
];

const contextMenu = new ContextMenu({
  items: customData,
  target: '#target',
  fields: {
    text: 'category',
    children: 'subMenu'
  }
});
```

## Dynamic Data Updates

### Update Items from Server

Fetch menu data from an API and bind dynamically:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const contextMenu = new ContextMenu({
  items: [],  // Empty initially
  target: '#target'
});

contextMenu.appendTo('#contextmenu');

// Fetch data from server
const fetchMenuData = async () => {
  try {
    const response = await fetch('/api/menu-items');
    const data = await response.json();
    
    // Update menu items
    contextMenu.items = data;
    contextMenu.refresh();
  } catch (error) {
    console.error('Error fetching menu data:', error);
  }
};

// Fetch on initialization
fetchMenuData();
```

### Refresh Menu with New Data

```typescript
const updateMenuItems = (newData: any[]) => {
  contextMenu.items = newData;
  contextMenu.refresh();
};

// Usage
const freshData = [
  { text: 'New Option 1' },
  { text: 'New Option 2' }
];

updateMenuItems(freshData);
```

### Add Items from External Source

```typescript
const loadMoreItems = async (category: string) => {
  const response = await fetch(`/api/menu/${category}`);
  const newItems = await response.json();
  
  // Insert after specific item
  contextMenu.insertAfter(newItems, category);
};

// Usage
contextMenu.addEventListener('select', (args: any) => {
  if (args.item.text === 'Load More') {
    loadMoreItems('advanced');
  }
});
```

## FieldSettings Mapping

### Basic Field Mapping

```typescript
const data = [
  { id: 1, label: 'Cut', icon: 'cut-icon' },
  { id: 2, label: 'Copy', icon: 'copy-icon' }
];

const contextMenu = new ContextMenu({
  items: data,
  target: '#target',
  fields: {
    text: 'label',
    iconCss: 'icon',
    id: 'id'
  }
});
```

### Complex Field Mapping

```typescript
const complexData = [
  {
    menuText: 'File Operations',
    menuIcon: 'e-icons e-file',
    subMenu: [
      { menuText: 'Create', isActive: true },
      { menuText: 'Delete', isActive: false }
    ],
    menuId: 'file-ops'
  }
];

const contextMenu = new ContextMenu({
  items: complexData,
  target: '#target',
  fields: {
    text: 'menuText',
    iconCss: 'menuIcon',
    children: 'subMenu',
    id: 'menuId'
  }
});
```

### URL and Navigation Mapping

```typescript
const navigationData = [
  {
    title: 'Home',
    link: '/',
    symbol: 'e-icons e-home'
  },
  {
    title: 'About',
    link: '/about',
    symbol: 'e-icons e-info'
  }
];

const contextMenu = new ContextMenu({
  items: navigationData,
  target: '#target',
  fields: {
    text: 'title',
    url: 'link',
    iconCss: 'symbol'
  }
});
```

## Real-Time Updates

### Listen to Data Changes

```typescript
class MenuDataManager {
  private contextMenu: ContextMenu;
  private dataSource: any[] = [];

  constructor(contextMenu: ContextMenu) {
    this.contextMenu = contextMenu;
  }

  updateData(newData: any[]) {
    this.dataSource = newData;
    this.contextMenu.items = this.dataSource;
    this.contextMenu.refresh();
  }

  addItem(item: any) {
    this.dataSource.push(item);
    this.contextMenu.items = this.dataSource;
    this.contextMenu.refresh();
  }

  removeItem(itemText: string) {
    this.dataSource = this.dataSource.filter(i => i.text !== itemText);
    this.contextMenu.items = this.dataSource;
    this.contextMenu.refresh();
  }

  updateItem(itemText: string, updatedItem: any) {
    const index = this.dataSource.findIndex(i => i.text === itemText);
    if (index !== -1) {
      this.dataSource[index] = updatedItem;
      this.contextMenu.items = this.dataSource;
      this.contextMenu.refresh();
    }
  }
}

// Usage
const manager = new MenuDataManager(contextMenu);
manager.addItem({ text: 'New Option' });
manager.updateItem('Edit', { text: 'Edit', disabled: true });
```

### Auto-Refresh from Server

```typescript
const setupAutoRefresh = (intervalMs: number = 5000) => {
  setInterval(async () => {
    try {
      const response = await fetch('/api/menu-items');
      const newData = await response.json();
      
      contextMenu.items = newData;
      contextMenu.refresh();
    } catch (error) {
      console.error('Auto-refresh failed:', error);
    }
  }, intervalMs);
};

// Auto-refresh every 5 seconds
setupAutoRefresh(5000);
```

### Contextual Data Loading

```typescript
const contextMenu = new ContextMenu({
  items: [],
  target: '#target',
  beforeOpen: async (args: any) => {
    // Load context-specific data before menu opens
    const contextType = determineContextType(args.event);
    const response = await fetch(`/api/menu/${contextType}`);
    const data = await response.json();
    
    contextMenu.items = data;
    contextMenu.refresh();
  }
});

const determineContextType = (event: any): string => {
  const element = event.target;
  if (element.classList.contains('text-editor')) return 'editor';
  if (element.classList.contains('data-grid')) return 'grid';
  return 'default';
};
```

## See Also

- [Getting Started](./getting-started.md) - Basic setup
- [Menu Structure & Templates](./menu-structure.md) - Template patterns
- [Menu Items Management](./menu-items.md) - Dynamic operations
- [API Reference](./api-reference.md) - FieldSettings documentation
