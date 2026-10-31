# Menu Items Management

## Table of Contents
- [HTML Setup](#html-setup)
- [Adding Items Dynamically](#adding-items-dynamically)
- [Removing Items](#removing-items)
- [Enabling and Disabling Items](#enabling-and-disabling-items)
- [Inserting Items](#inserting-items)
- [Setting Item Properties](#setting-item-properties)
- [Item Visibility Management](#item-visibility-management)
- [Changing Menu Items Dynamically](#changing-menu-items-dynamically)
- [Add or Remove Methods](#add-or-remove-methods)

## HTML Setup

### Basic HTML Structure for Item Management

```html
<div>
  <!-- Target element for context menu -->
  <div id="contextmenutarget" style="border: 1px solid #ccc; padding: 20px; width: 300px; height: 200px;">
    Right-click here to manage menu items
  </div>
  <!-- ContextMenu will be rendered here -->
  <ul id="contextmenu"></ul>
</div>
```

## Adding Items Dynamically

### Add Items at Runtime

Add new items after the ContextMenu is initialized:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const menuItems = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target'
});

contextMenu.appendTo('#contextmenu');

// Add a new item
const newItems = [{ text: 'New Option' }];
contextMenu.items.push(...newItems);
contextMenu.refresh();  // Refresh to render new items
```

### Add Nested Items

```typescript
// Add a menu with sub-items
const newItem = {
  text: 'Advanced',
  items: [
    { text: 'Settings' },
    { text: 'Preferences' }
  ]
};

contextMenu.items.push(newItem);
contextMenu.refresh();
```

### Add Items with Full Configuration

```typescript
const advancedItem = {
  text: 'Export',
  iconCss: 'e-icons e-export',
  id: 'export-item',
  items: [
    { text: 'PDF' },
    { text: 'Excel' },
    { text: 'CSV' }
  ]
};

contextMenu.items.push(advancedItem);
contextMenu.refresh();
```

## Removing Items

### Remove Items by Text

Use the `removeItems()` method to remove items by their text:

```typescript
// Remove single item
contextMenu.removeItems(['Paste']);

// Remove multiple items
contextMenu.removeItems(['Paste', 'New Option']);
```

### Remove Items by ID

Remove items using unique IDs:

```typescript
// Add item with ID
const item = {
  text: 'Delete',
  id: 'delete-action'
};

contextMenu.items.push(item);
contextMenu.refresh();

// Remove by ID
contextMenu.removeItems(['delete-action'], true);  // true = isUniqueId
```

### Remove All Items

```typescript
// Clear all items
contextMenu.items = [];
contextMenu.refresh();
```

### Conditional Removal

```typescript
// Remove items based on condition
const itemsToRemove = contextMenu.items
  .filter(item => item.disabled === true)
  .map(item => item.text);

contextMenu.removeItems(itemsToRemove);
```

## Enabling and Disabling Items

### Enable/Disable by Text

```typescript
// Disable items
contextMenu.enableItems(['Undo', 'Redo'], false);

// Later, enable them
contextMenu.enableItems(['Undo', 'Redo'], true);
```

### Enable/Disable by ID

```typescript
// Disable by unique ID
contextMenu.enableItems(['undo-id', 'redo-id'], false, true);  // true = isUniqueId

// Enable again
contextMenu.enableItems(['undo-id', 'redo-id'], true, true);
```

### Toggle Enabled State

```typescript
const toggleItemState = (itemText: string) => {
  const item = contextMenu.items.find(i => i.text === itemText);
  if (item) {
    const newState = !item.disabled;
    contextMenu.enableItems([itemText], !newState);
  }
};

// Usage
toggleItemState('Undo');
```

### Conditional Enabling

```typescript
// Enable/disable based on application state
const hasSelection = selectedText.length > 0;
contextMenu.enableItems(['Cut', 'Copy'], hasSelection);

const canUndo = undoStack.length > 0;
contextMenu.enableItems(['Undo'], canUndo);

const canRedo = redoStack.length > 0;
contextMenu.enableItems(['Redo'], canRedo);
```

## Inserting Items

### Insert After Specific Item

Insert items after a specific menu item:

```typescript
const newItems = [
  { text: 'Format' }
];

// Insert after 'Copy'
contextMenu.insertAfter(newItems, 'Copy');
```

### Insert Before Specific Item

Insert items before a specific menu item:

```typescript
const newItems = [
  { text: 'Separator Item', separator: true }
];

// Insert before 'Paste'
contextMenu.insertBefore(newItems, 'Paste');
```

### Insert with Nested Structure

```typescript
const complexItem = {
  text: 'Tools',
  items: [
    { text: 'Spell Check' },
    { text: 'Word Count' }
  ]
};

contextMenu.insertAfter([complexItem], 'Edit');
```

### Insert by ID

```typescript
// Items have IDs
const existingItem = {
  text: 'Copy',
  id: 'copy-item'
};

const newItem = {
  text: 'Copy Special',
  id: 'copy-special'
};

contextMenu.insertAfter([newItem], 'copy-item', true);  // true = isUniqueId
```

## Setting Item Properties

### Update Existing Item

Use `setItem()` to update item properties:

```typescript
const updatedItem = {
  text: 'Save',
  iconCss: 'e-icons e-save',
  disabled: false
};

// Update by text
contextMenu.setItem(updatedItem, 'Save');

// Update by ID
contextMenu.setItem(updatedItem, 'save-item', true);  // true = isUniqueId
```

### Modify Item Configuration

```typescript
// Get current items
const currentItems = contextMenu.items;

// Find and modify
const itemToModify = currentItems.find(i => i.text === 'Edit');
if (itemToModify) {
  itemToModify.iconCss = 'e-icons e-edit';
  itemToModify.disabled = false;
  contextMenu.refresh();
}
```

### Update Multiple Item Properties

```typescript
contextMenu.items.forEach(item => {
  if (item.text.includes('Advanced')) {
    item.disabled = true;
    item.iconCss = 'e-icons e-lock';
  }
});

contextMenu.refresh();
```

## Item Visibility Management

### Hide Items

Use `hideItems()` to hide items without removing them:

```typescript
// Hide single item
contextMenu.hideItems(['Advanced Options']);

// Hide multiple items
contextMenu.hideItems(['Debug', 'Settings', 'Advanced']);
```

### Show Hidden Items

Use `showItems()` to display hidden items:

```typescript
contextMenu.showItems(['Advanced Options']);

contextMenu.showItems(['Debug', 'Settings', 'Advanced']);
```

### Hide by ID

```typescript
// Hide items with unique IDs
contextMenu.hideItems(['debug-id', 'settings-id'], true);  // true = isUniqueId

// Show again
contextMenu.showItems(['debug-id', 'settings-id'], true);
```

### Conditional Visibility

```typescript
// Show/hide based on user role
const userRole = getCurrentUserRole();

if (userRole === 'admin') {
  contextMenu.showItems(['Settings', 'Diagnostics', 'Logs']);
} else {
  contextMenu.hideItems(['Settings', 'Diagnostics', 'Logs']);
}
```

### Toggle Visibility

```typescript
const toggleVisibility = (itemText: string) => {
  const isHidden = !contextMenu.items
    .find(i => i.text === itemText)
    ?.visible !== false;
  
  if (isHidden) {
    contextMenu.showItems([itemText]);
  } else {
    contextMenu.hideItems([itemText]);
  }
};
```

## Batch Operations

### Add Multiple Items at Once

```typescript
const newItems = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  { text: 'Option 3' }
];

contextMenu.items.push(...newItems);
contextMenu.refresh();
```

### Update Multiple Items

```typescript
const itemsToUpdate = ['Cut', 'Copy', 'Paste'];

itemsToUpdate.forEach(text => {
  const item = contextMenu.items.find(i => i.text === text);
  if (item) {
    item.disabled = false;
    item.visible = true;
  }
});

contextMenu.refresh();
```

### Apply State to Multiple Items

```typescript
// Disable all items except 'Cancel'
contextMenu.items.forEach(item => {
  if (item.text !== 'Cancel') {
    item.disabled = true;
  }
});

contextMenu.refresh();
```

## Changing Menu Items Dynamically

### Show/Hide Items Based on Context

Change visible menu items dynamically based on where the context menu is opened:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const menuItems = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' },
  { text: 'Add' },
  { text: 'Edit' },
  { text: 'Delete' }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target .element',
  beforeOpen: (args: any) => {
    // Show different items based on context
    const targetId = (args.event.target as HTMLElement).id;
    
    if (targetId === 'clipboard-area') {
      // Clipboard operations
      contextMenu.hideItems(['Add', 'Edit', 'Delete']);
      contextMenu.showItems(['Cut', 'Copy', 'Paste']);
    } else if (targetId === 'editor-area') {
      // Editor operations
      contextMenu.showItems(['Add', 'Edit', 'Delete']);
      contextMenu.hideItems(['Cut', 'Copy', 'Paste']);
    }
  }
});

contextMenu.appendTo('#contextmenu');
```

### Update Items Based on Selection

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#grid-rows',
  beforeOpen: (args: any) => {
    const selectedText = window.getSelection()?.toString() || '';
    
    // Enable cut/copy only if text is selected
    contextMenu.enableItems(['Cut', 'Copy'], selectedText.length > 0);
    
    // Enable paste only if clipboard has data
    const hasClipboardData = await navigator.clipboard.readText().then(
      () => true,
      () => false
    );
    contextMenu.enableItems(['Paste'], hasClipboardData);
  }
});
```

### Context-Specific Menu Items

```typescript
const contextMenu = new ContextMenu({
  items: [
    { text: 'View Profile' },
    { text: 'Edit' },
    { text: 'Message' },
    { text: 'Remove Friend' },
    { text: 'Block' }
  ],
  target: '#user-list',
  beforeOpen: (args: any) => {
    const user = getSelectedUser(args.event.target);
    
    if (user.isAdmin) {
      contextMenu.hideItems(['Remove Friend', 'Block']);
    } else {
      contextMenu.showItems(['Remove Friend', 'Block']);
    }
    
    if (user.isBlocked) {
      contextMenu.hideItems(['Message']);
      contextMenu.showItems(['Unblock']);
    }
  }
});
```

## Add or Remove Methods

### Advanced Remove Patterns

```typescript
// Remove items matching a pattern
const removeByPattern = (pattern: RegExp) => {
  const itemsToRemove = contextMenu.items
    .filter(item => pattern.test(item.text))
    .map(item => item.text);
  
  contextMenu.removeItems(itemsToRemove);
};

// Remove all except specific items
const keepOnly = (textsToKeep: string[]) => {
  const itemsToRemove = contextMenu.items
    .filter(item => !textsToKeep.includes(item.text))
    .map(item => item.text);
  
  contextMenu.removeItems(itemsToRemove);
};

// Usage
removeByPattern(/^(Temp|Debug)/);
keepOnly(['Save', 'Edit', 'Delete']);
```

### Bulk Add Operations

```typescript
// Add multiple item groups
const addItemGroup = (groupName: string, items: any[]) => {
  contextMenu.items.push({ separator: true });
  contextMenu.items.push({
    text: groupName,
    disabled: true,
    iconCss: 'group-header'
  });
  contextMenu.items.push(...items);
  contextMenu.refresh();
};

// Usage
addItemGroup('Text Options', [
  { text: 'Bold' },
  { text: 'Italic' },
  { text: 'Underline' }
]);
```

### Replace All Items

```typescript
// Completely replace menu content
const replaceAllItems = (newItems: any[]) => {
  contextMenu.items = newItems;
  contextMenu.refresh();
};

// Usage with different menu sets
const clipboardMenu = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

const editorMenu = [
  { text: 'Undo' },
  { text: 'Redo' },
  { separator: true },
  { text: 'Format' }
];

// Switch menus
replaceAllItems(clipboardMenu);  // Later...
replaceAllItems(editorMenu);
```

### Clear and Reset

```typescript
// Remove all items
contextMenu.items = [];
contextMenu.refresh();

// Reset to default items
const defaultItems = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

contextMenu.items = defaultItems;
contextMenu.refresh();
```

## See Also

- [Getting Started](./getting-started.md) - Basic setup
- [Menu Structure & Templates](./menu-structure.md) - Create nested menus
- [Interactions & Events](./interactions.md) - Handle item selection
- [API Reference](./api-reference.md) - Method documentation
