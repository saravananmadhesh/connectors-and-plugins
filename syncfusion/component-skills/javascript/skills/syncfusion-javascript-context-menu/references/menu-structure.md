# Menu Structure & Templates

## Table of Contents
- [HTML Setup](#html-setup)
- [Template Basics](#template-basics)
- [Multilevel Menu Nesting](#multilevel-menu-nesting)
- [Menu Item Separators](#menu-item-separators)
- [FieldSettings Configuration](#fieldsettings-configuration)
- [Item Structure Patterns](#item-structure-patterns)
- [Custom HTML Templates](#custom-html-templates)

## HTML Setup

### Basic HTML Structure

Every ContextMenu requires a wrapper div with a target element and a UL element for menu rendering:

```html
<div>
  <!-- Target element - right-click here to trigger context menu -->
  <div id="contextmenutarget" style="border: 1px solid #ccc; padding: 20px; width: 300px; height: 200px;">
    Right-click here to open the context menu
  </div>
  <!-- ContextMenu will be rendered here -->
  <ul id="contextmenu"></ul>
</div>
```

### Complete HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ContextMenu with Templates</title>
</head>
<body>
    <!-- Context Menu Wrapper -->
    <div>
        <!-- Target element for context menu trigger -->
        <div id="contextmenutarget" style="border: 2px dashed #999; padding: 30px; width: 400px; height: 250px; display: flex; align-items: center; justify-content: center;">
            Right-click here to open the context menu
        </div>
        <!-- UL element where ContextMenu will be rendered -->
        <ul id="contextmenu"></ul>
    </div>
</body>
</html>
```

## Template Basics

Templates allow you to customize the appearance and content of menu items beyond simple text.

### String Template

Use HTML string for item templates:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const contextMenu = new ContextMenu({
  items: [
    { text: 'Save' },
    { text: 'Edit' },
    { text: 'Delete' }
  ],
  target: '#target',
  itemTemplate: '<span class="e-menu-icon e-icons ${iconClass}"></span><span>${text}</span>'
});

contextMenu.appendTo('#contextmenu');
```

### Function Template

Use a function for dynamic template generation:

```typescript
const contextMenu = new ContextMenu({
  items: [
    { text: 'Save', iconClass: 'e-save' },
    { text: 'Edit', iconClass: 'e-edit' },
    { text: 'Delete', iconClass: 'e-delete' }
  ],
  target: '#target',
  itemTemplate: (item: any) => {
    return `
      <span class="e-menu-icon e-icons ${item.iconClass}"></span>
      <span>${item.text}</span>
      <span class="e-badge e-badge-pill">${item.count || 0}</span>
    `;
  }
});

contextMenu.appendTo('#contextmenu');
```

## Multilevel Menu Nesting

Create nested menu structures with sub-items:

### Two-Level Nesting

```typescript
const menuItems = [
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' },
      { text: 'Save As' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]
  },
  {
    text: 'View',
    items: [
      { text: 'Zoom In' },
      { text: 'Zoom Out' }
    ]
  }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target'
});

contextMenu.appendTo('#contextmenu');
```

### Multi-Level Deep Nesting

```typescript
const menuItems = [
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
          { text: 'Center Align' },
          { text: 'Right Align' }
        ]
      }
    ]
  }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  showItemOnClick: true  // Open submenus on click instead of hover
});

contextMenu.appendTo('#contextmenu');
```

## Menu Item Separators

Use separators to group related items visually:

```typescript
const menuItems = [
  // Group 1: File operations
  { text: 'New' },
  { text: 'Open' },
  { text: 'Save' },
  { separator: true },
  
  // Group 2: Edit operations
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' },
  { separator: true },
  
  // Group 3: Settings
  { text: 'Preferences' },
  { text: 'Settings' }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target'
});

contextMenu.appendTo('#contextmenu');
```

### Separator with Nested Items

Separators work within nested structures:

```typescript
const menuItems = [
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { separator: true },
      { text: 'Recent' }
    ]
  }
];
```

## FieldSettings Configuration

Map data fields to item properties using FieldSettings:

### Basic Mapping

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const dataSource = [
  { itemText: 'Cut', iconPath: 'e-icons e-cut' },
  { itemText: 'Copy', iconPath: 'e-icons e-copy' },
  { itemText: 'Paste', iconPath: 'e-icons e-paste' }
];

const contextMenu = new ContextMenu({
  items: dataSource,
  target: '#target',
  fields: {
    text: 'itemText',
    iconCss: 'iconPath'
  }
});

contextMenu.appendTo('#contextmenu');
```

### Nested Data with FieldSettings

```typescript
const dataSource = [
  {
    name: 'File',
    subItems: [
      { name: 'New' },
      { name: 'Open' },
      { name: 'Save' }
    ]
  },
  {
    name: 'Edit',
    subItems: [
      { name: 'Cut' },
      { name: 'Copy' }
    ]
  }
];

const contextMenu = new ContextMenu({
  items: dataSource,
  target: '#target',
  fields: {
    text: 'name',
    children: 'subItems'
  }
});

contextMenu.appendTo('#contextmenu');
```

## Item Structure Patterns

### Complete Item Structure

Each menu item can include multiple properties:

```typescript
const menuItem = {
  // Display properties
  text: 'Save',                              // Display text
  iconCss: 'e-icons e-save',                // Icon CSS class
  
  // Behavior properties
  url: '/save',                              // Navigation URL
  id: 'save-item',                          // Unique identifier
  separator: false,                          // Add separator line
  disabled: false,                           // Enable/disable item
  
  // Nested structure
  items: [                                   // Sub-items
    { text: 'Save As' }
  ],
  
  // Custom attributes
  htmlAttributes: {
    'data-action': 'save',
    'aria-label': 'Save file'
  }
};
```

### Icon Pattern

```typescript
const menuItems = [
  { 
    text: 'Edit',
    iconCss: 'e-icons e-edit'  // Font icon
  },
  { 
    text: 'Delete',
    iconCss: 'e-icons e-delete'
  },
  { 
    text: 'Download',
    iconCss: 'e-icons e-download'
  }
];
```

### Navigation Pattern

```typescript
const menuItems = [
  { 
    text: 'Home',
    url: '/'
  },
  { 
    text: 'About',
    url: '/about'
  },
  { 
    text: 'External Site',
    url: 'url'
  }
];
```

### Disabled Items Pattern

```typescript
const menuItems = [
  { text: 'Save' },
  { text: 'Undo', disabled: true },  // Grayed out, non-clickable
  { text: 'Redo', disabled: true }
];

// Enable items after some action
contextMenu.enableItems(['Undo', 'Redo'], true);
```

## Custom HTML Templates

Create rich, interactive item designs:

### Complex Template

```typescript
const contextMenu = new ContextMenu({
  items: [
    { 
      text: 'Profile',
      url: '/profile',
      userIcon: 'url'
    },
    { 
      text: 'Settings',
      subCount: 3
    }
  ],
  target: '#target',
  itemTemplate: (item: any) => {
    if (item.userIcon) {
      return `
        <img src="${item.userIcon}" class="e-menu-avatar" />
        <span class="e-menu-text">${item.text}</span>
      `;
    }
    if (item.subCount) {
      return `
        <span class="e-menu-text">${item.text}</span>
        <span class="e-badge">${item.subCount}</span>
      `;
    }
    return `<span>${item.text}</span>`;
  }
});

contextMenu.appendTo('#contextmenu');
```

### Styling Templates

```css
.e-menu-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
}

.e-menu-text {
  display: inline-block;
  vertical-align: middle;
}

.e-badge {
  display: inline-block;
  background: #f0f0f0;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  margin-left: 8px;
}
```

## Advanced Template Patterns

### Table Layout in Context Menu

Create a table structure inside context menu items using `beforeItemRender` event:

```typescript
import { ContextMenu, MenuEventArgs } from '@syncfusion/ej2-navigations';

const items = [
  { text: 'Users' },
  { text: 'Reports' }
];

const contextMenu = new ContextMenu({
  items: items,
  beforeItemRender: (args: MenuEventArgs) => {
    if (args.item.text === 'Users') {
      // Create table in item
      const tableHTML = `
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ccc;">
              <th style="text-align: left; padding: 8px;">Name</th>
              <th style="text-align: left; padding: 8px;">Email</th>
              <th style="text-align: left; padding: 8px;">Status</th>
              <th style="text-align: left; padding: 8px;">Role</th>
              <th style="text-align: left; padding: 8px;">Action</th>
              <th style="text-align: left; padding: 8px;">View</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px;">John Doe</td>
              <td style="padding: 8px;">john@example.com</td>
              <td style="padding: 8px;">Active</td>
              <td style="padding: 8px;">Admin</td>
              <td style="padding: 8px;"><span style="color: green;">Edit</span></td>
              <td style="padding: 8px;"><span style="color: blue;">View</span></td>
            </tr>
          </tbody>
        </table>
      `;
      args.element.innerHTML = tableHTML;
    }
  }
});

contextMenu.appendTo('#contextmenu');
```

### UI Components Inside Menu Items

Embed interactive components like checkboxes directly in menu items:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';
import { ContextMenu, MenuEventArgs } from '@syncfusion/ej2-navigations';

const items = [
  { text: 'Show Grid', id: 'grid-toggle' },
  { text: 'Show Sidebar', id: 'sidebar-toggle' },
  { text: 'Show Toolbar', id: 'toolbar-toggle' }
];

const contextMenu = new ContextMenu({
  items: items,
  beforeItemRender: (args: MenuEventArgs) => {
    // Check if item has a toggle ID
    if (args.item.id?.includes('toggle')) {
      // Replace text with checkbox
      const checkboxHTML = `
        <input type="checkbox" id="${args.item.id}" 
               class="e-checkbox" checked />
        <label for="${args.item.id}">${args.item.text}</label>
      `;
      args.element.innerHTML = checkboxHTML;
      
      // Initialize checkbox component
      const checkbox = new CheckBox({
        checked: true
      });
      checkbox.appendTo(`#${args.item.id}`);
    }
  },
  select: (args: MenuEventArgs) => {
    // Handle checkbox selection
    const checkbox = document.getElementById(args.item.id) as HTMLInputElement;
    if (checkbox?.type === 'checkbox') {
      console.log(`${args.item.text}: ${checkbox.checked}`);
    }
  }
});

contextMenu.appendTo('#contextmenu');
```

### Custom Item Template with Data Fields

Display additional data fields in each menu item:

```typescript
import { ContextMenu, MenuEventArgs } from '@syncfusion/ej2-navigations';

const items = [
  {
    text: 'Question',
    id: 'question',
    answerType: 'single-choice',
    description: 'Select one answer'
  },
  {
    text: 'Poll',
    id: 'poll',
    answerType: 'multiple-choice',
    description: 'Select multiple answers'
  },
  {
    text: 'Survey',
    id: 'survey',
    answerType: 'open-ended',
    description: 'Write your response'
  }
];

const contextMenu = new ContextMenu({
  items: items,
  beforeItemRender: (args: MenuEventArgs) => {
    if (args.item.description) {
      // Create item with title and description
      const itemHTML = `
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="font-weight: 600; color: #333;">${args.item.text}</div>
          <div style="font-size: 12px; color: #999;">
            ${args.item.description}
          </div>
          <div style="font-size: 11px; color: #ccc; font-style: italic;">
            Type: ${args.item.answerType}
          </div>
        </div>
      `;
      args.element.innerHTML = itemHTML;
    }
  }
});

contextMenu.appendTo('#contextmenu');
```

## Customize Specific Menu Items

### Display Keyboard Shortcuts

Show keyboard shortcuts dynamically next to menu items:

```typescript
import { ContextMenu, MenuEventArgs } from '@syncfusion/ej2-navigations';

const items = [
  { text: 'Undo', shortcut: 'Ctrl+Z' },
  { text: 'Redo', shortcut: 'Ctrl+Y' },
  { separator: true },
  { text: 'Cut', shortcut: 'Ctrl+X' },
  { text: 'Copy', shortcut: 'Ctrl+C' },
  { text: 'Paste', shortcut: 'Ctrl+V' }
];

const contextMenu = new ContextMenu({
  items: items,
  beforeItemRender: (args: MenuEventArgs) => {
    if (args.item.shortcut) {
      // Create item with shortcut display
      const itemHTML = `
        <span style="display: flex; justify-content: space-between; width: 100%;">
          <span>${args.item.text}</span>
          <span style="margin-left: 20px; color: #999; font-size: 12px;">
            ${args.item.shortcut}
          </span>
        </span>
      `;
      args.element.innerHTML = itemHTML;
    }
  }
});

contextMenu.appendTo('#contextmenu');
```

### Conditional Styling Based on Item State

```typescript
import { ContextMenu, MenuEventArgs } from '@syncfusion/ej2-navigations';

const items = [
  { text: 'Save', status: 'enabled' },
  { text: 'Save As', status: 'enabled' },
  { text: 'Save All', status: 'disabled' },
  { text: 'Revert', status: 'warning' }
];

const contextMenu = new ContextMenu({
  items: items,
  beforeItemRender: (args: MenuEventArgs) => {
    const status = args.item.status;
    let styleClass = '';
    let icon = '';
    
    switch (status) {
      case 'enabled':
        styleClass = 'color: #28a745;';
        icon = '✓';
        break;
      case 'disabled':
        styleClass = 'color: #ccc; opacity: 0.6;';
        icon = '✗';
        break;
      case 'warning':
        styleClass = 'color: #ffc107;';
        icon = '⚠';
        break;
    }
    
    const itemHTML = `
      <span style="display: flex; gap: 8px; align-items: center; ${styleClass}">
        <span>${icon}</span>
        <span>${args.item.text}</span>
      </span>
    `;
    args.element.innerHTML = itemHTML;
  }
});

contextMenu.appendTo('#contextmenu');
```

## See Also

- [Getting Started](./getting-started.md) - Basic setup
- [Menu Items Management](./menu-items.md) - Add/remove items
- [API Reference](./api-reference.md) - FieldSettings and ItemTemplate properties
