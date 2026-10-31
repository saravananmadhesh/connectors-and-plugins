# Interactions & Events

## Table of Contents
- [HTML Setup](#html-setup)
- [Opening and Closing](#opening-and-closing)
- [Event Lifecycle](#event-lifecycle)
- [Item Selection Events](#item-selection-events)
- [Dialog Integration](#dialog-integration)
- [Animation Configuration](#animation-configuration)
- [Menu Positioning and Delays](#menu-positioning-and-delays)

## HTML Setup

### Basic HTML Structure for Events

```html
<div>
  <!-- Target element for context menu -->
  <div id="contextmenutarget" style="border: 1px solid #ccc; padding: 20px; width: 300px; height: 200px;">
    Right-click here to trigger events
  </div>
  <!-- ContextMenu will be rendered here -->
  <ul id="contextmenu"></ul>
</div>
```

## Opening and Closing

### Open ContextMenu Programmatically

Open the menu at specific coordinates:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const contextMenu = new ContextMenu({
  items: [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ],
  target: '#target'
});

contextMenu.appendTo('#contextmenu');

// Open at coordinates (300, 400)
contextMenu.open(300, 400);
```

### Open at Mouse Position

```typescript
// Get mouse coordinates from event
document.addEventListener('contextmenu', (event: MouseEvent) => {
  event.preventDefault();
  contextMenu.open(event.pageY, event.pageX);
});
```

### Open Relative to Element

```typescript
// Open relative to a specific element
const triggerElement = document.getElementById('button');
const rect = triggerElement.getBoundingClientRect();

contextMenu.open(
  rect.top + window.scrollY + rect.height,
  rect.left + window.scrollX
);
```

### Close ContextMenu

```typescript
// Close the menu
contextMenu.close();

// Close after delay
setTimeout(() => {
  contextMenu.close();
}, 2000);
```

## Event Lifecycle

### BeforeOpen Event

Triggered before the menu opens. Use to validate or prepare:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  beforeOpen: (args: any) => {
    console.log('Menu opening at:', args.top, args.left);
    
    // Validate if menu should open
    if (!shouldShowMenu()) {
      args.cancel = true;  // Cancel opening
    }
  }
});
```

### OnOpen Event

Triggered after the menu is opened:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  onOpen: (args: any) => {
    console.log('Menu opened');
    
    // Update menu items based on context
    const selectedText = window.getSelection()?.toString() || '';
    if (selectedText) {
      contextMenu.enableItems(['Cut', 'Copy'], true);
    }
  }
});
```

### BeforeClose Event

Triggered before the menu closes:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  beforeClose: (args: any) => {
    console.log('Menu closing');
    
    // Save state if needed
    saveMenuState();
  }
});
```

### OnClose Event

Triggered after the menu is closed:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  onClose: (args: any) => {
    console.log('Menu closed');
    
    // Cleanup resources
    cleanupTemporaryData();
  }
});
```

## Item Selection Events

### Select Event

Triggered when a menu item is selected:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  select: (args: any) => {
    console.log('Selected item:', args.item.text);
    
    // Perform action based on selection
    handleMenuAction(args.item.text);
  }
});

const handleMenuAction = (itemText: string) => {
  switch (itemText) {
    case 'Cut':
      performCut();
      break;
    case 'Copy':
      performCopy();
      break;
    case 'Paste':
      performPaste();
      break;
  }
};
```

### BeforeItemRender Event

Triggered before each item is rendered. Use to dynamically modify items:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  beforeItemRender: (args: any) => {
    // Disable item if conditions are met
    if (args.item.text === 'Paste' && !hasClipboardData()) {
      args.item.disabled = true;
    }
    
    // Add dynamic icons
    if (args.item.text === 'Save') {
      args.item.iconCss = hasChanges() ? 'e-icons e-save' : '';
    }
  }
});
```

### Multiple Event Handlers

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target'
});

// Add multiple event listeners
contextMenu.addEventListener('select', (args: any) => {
  console.log('Item selected:', args.item.text);
});

contextMenu.addEventListener('beforeOpen', (args: any) => {
  console.log('Menu about to open');
});

contextMenu.addEventListener('onOpen', (args: any) => {
  console.log('Menu opened');
});
```

## Dialog Integration

### Open Dialog on Item Click

Open a dialog when a specific menu item is selected:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';
import { Dialog } from '@syncfusion/ej2-popups';

const contextMenu = new ContextMenu({
  items: [
    { text: 'Settings' },
    { text: 'Help' },
    { text: 'About' }
  ],
  target: '#target',
  select: (args: any) => {
    if (args.item.text === 'Settings') {
      showSettingsDialog();
    }
  }
});

contextMenu.appendTo('#contextmenu');

// Dialog configuration
const dialog = new Dialog({
  header: 'Settings',
  content: '<form><input type="text" placeholder="Setting 1"></form>',
  width: '400px'
});

dialog.appendTo('#dialog');

const showSettingsDialog = () => {
  dialog.show();
};
```

### Modal Dialog from Menu

```typescript
const contextMenu = new ContextMenu({
  items: [
    { text: 'Edit' },
    { text: 'Delete' },
    { text: 'Properties' }
  ],
  target: '#target',
  select: (args: any) => {
    if (args.item.text === 'Delete') {
      showConfirmDialog('Are you sure?', () => {
        performDelete();
        contextMenu.close();
      });
    }
  }
});

const showConfirmDialog = (message: string, onConfirm: () => void) => {
  const dialog = new Dialog({
    header: 'Confirm',
    content: message,
    buttons: [
      {
        buttonModel: { content: 'Yes', isPrimary: true },
        click: () => {
          onConfirm();
          dialog.hide();
        }
      },
      {
        buttonModel: { content: 'No' },
        click: () => dialog.hide()
      }
    ]
  });
  
  dialog.appendTo('#confirmDialog');
  dialog.show();
};
```

## Animation Configuration

### Configure Animation Effects

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  animationSettings: {
    duration: 400,        // Duration in milliseconds
    easing: 'ease',       // Easing function
    effect: 'SlideDown'   // Animation effect
  }
});
```

### Available Animation Effects

```typescript
// Different animation effects
const effects = [
  'SlideDown',   // Default - items slide down
  'ZoomIn',      // Items zoom in
  'FadeIn',      // Items fade in
  'None'         // No animation
];

// Apply different effects
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  animationSettings: {
    duration: 600,
    effect: 'ZoomIn'
  }
});
```

### Custom Animation Timing

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  animationSettings: {
    duration: 800,              // Slower animation
    easing: 'ease-in-out',     // Smooth easing
    effect: 'SlideDown'
  }
});
```

### Disable Animation

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  animationSettings: {
    duration: 0,    // No animation
    effect: 'None'
  }
});
```

## Menu Positioning and Delays

### Hover Delay

Control when submenus appear on hover:

```typescript
const contextMenu = new ContextMenu({
  items: [
    {
      text: 'File',
      items: [
        { text: 'New' },
        { text: 'Open' }
      ]
    }
  ],
  target: '#target',
  hoverDelay: 500  // 500ms delay before submenu opens
});
```

### Show Submenu on Click

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  showItemOnClick: true  // Require click to open submenus
});
```

### Filter Elements

Apply menu only to specific elements within target:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#table',
  filter: 'tbody tr'  // Only show for table rows
});

// Usage: Right-click on table rows to see menu
```

### Z-Index Positioning

```typescript
// Open menu relative to element for z-index calculation
const element = document.getElementById('specific-element');
contextMenu.open(300, 400, element);
```

## Advanced Event Patterns

### Event Delegation

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#container'
});

contextMenu.addEventListener('select', (args: any) => {
  const selectedItem = args.item;
  const targetElement = args.element;  // The element that triggered the menu
  
  console.log('Item:', selectedItem.text);
  console.log('Triggered from:', targetElement);
});
```

### Event Cancellation

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  beforeOpen: (args: any) => {
    // Cancel menu opening under certain conditions
    if (isReadOnlyMode()) {
      args.cancel = true;
    }
  }
});
```

## See Also

- [Getting Started](./getting-started.md) - Basic setup
- [Menu Items Management](./menu-items.md) - Modify items dynamically
- [API Reference](./api-reference.md) - Event interfaces and properties
