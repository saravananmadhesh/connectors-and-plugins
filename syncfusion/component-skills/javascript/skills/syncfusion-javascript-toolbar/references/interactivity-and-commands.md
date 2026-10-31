# Interactivity and Commands in Syncfusion TypeScript Toolbar

## Table of Contents
- [Click Event Handling](#click-event-handling)
- [Command Customization](#command-customization)
- [Toggle Button Implementation](#toggle-button-implementation)
- [Enable/Disable Items](#enabledisable-items)
- [beforeCreate Event](#beforecreate-event)
- [KeyDown Event](#keydown-event)
- [Event Types](#event-types)

## Click Event Handling

Handle toolbar item clicks using the `click` property or the toolbar's `clicked` event.

### Item-Level Click Handler

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

function handleCutClick(args: ClickEventArgs) {
    console.log('Cut clicked');
    console.log('Item text:', args.item.text);
    console.log('Item ID:', args.item.id);
}

function handleCopyClick(args: ClickEventArgs) {
    console.log('Copy clicked');
    // Perform copy action
}

let toolbar: Toolbar = new Toolbar({
    items: [
        { 
            id: 'cut-btn',
            text: 'Cut',
            prefixIcon: 'e-cut-icon tb-icons',
            click: handleCutClick
        },
        { 
            id: 'copy-btn',
            text: 'Copy',
            prefixIcon: 'e-copy-icon tb-icons',
            click: handleCopyClick
        },
        { 
            id: 'paste-btn',
            text: 'Paste',
            prefixIcon: 'e-paste-icon tb-icons',
            click: (args) => {
                console.log('Paste clicked - inline handler');
                // Perform paste action
            }
        }
    ]
});

toolbar.appendTo('#element');
```

### Toolbar-Level Click Handler

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';

function onToolbarClick(args: ClickEventArgs) {
    console.log(`Clicked item: ${args.item.text}`);
    console.log(`Item ID: ${args.item.id}`);
    
    // Route to appropriate handler
    switch(args.item.id) {
        case 'cut-btn':
            console.log('Execute cut command');
            break;
        case 'copy-btn':
            console.log('Execute copy command');
            break;
        case 'paste-btn':
            console.log('Execute paste command');
            break;
    }
}

let toolbar: Toolbar = new Toolbar({
    clicked: onToolbarClick,
    items: [
        { id: 'cut-btn', text: 'Cut', prefixIcon: 'e-cut-icon tb-icons' },
        { id: 'copy-btn', text: 'Copy', prefixIcon: 'e-copy-icon tb-icons' },
        { id: 'paste-btn', text: 'Paste', prefixIcon: 'e-paste-icon tb-icons' }
    ]
});

toolbar.appendTo('#element');
```

### Event Arguments (ClickEventArgs)

```typescript
interface ClickEventArgs {
    item: ItemModel;              // Clicked item object
    originalEvent: PointerEvent;  // Original DOM event
}
```

**Available Item Properties:**
- `text`: Display text
- `id`: Item identifier
- `prefixIcon`, `suffixIcon`: Icon classes
- `tooltipText`: Tooltip text
- `disabled`: Item state
- `align`: Item alignment

## Command Customization

Implement custom actions for toolbar items.

### Command Pattern Example

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';

// Define command handlers
const commands = {
    cut: () => {
        console.log('Cut command executed');
        const selected = document.getSelection().toString();
        alert(`Cut: ${selected || 'No text selected'}`);
    },
    copy: () => {
        console.log('Copy command executed');
        const selected = document.getSelection().toString();
        alert(`Copied: ${selected || 'No text selected'}`);
    },
    paste: () => {
        console.log('Paste command executed');
        alert('Pasted from clipboard');
    },
    undo: () => {
        console.log('Undo command executed');
        alert('Undo last action');
    },
    redo: () => {
        console.log('Redo command executed');
        alert('Redo last action');
    }
};

// Create toolbar with command routing
let toolbar: Toolbar = new Toolbar({
    clicked: (args: ClickEventArgs) => {
        const commandName = args.item.id.replace('-btn', '');
        if (commands[commandName]) {
            commands[commandName]();
        }
    },
    items: [
        { id: 'cut-btn', text: 'Cut', prefixIcon: 'e-cut-icon tb-icons' },
        { id: 'copy-btn', text: 'Copy', prefixIcon: 'e-copy-icon tb-icons' },
        { id: 'paste-btn', text: 'Paste', prefixIcon: 'e-paste-icon tb-icons', disabled: true },
        { type: 'Separator' },
        { id: 'undo-btn', text: 'Undo', prefixIcon: 'e-undo-icon tb-icons' },
        { id: 'redo-btn', text: 'Redo', prefixIcon: 'e-redo-icon tb-icons' }
    ]
});

toolbar.appendTo('#element');
```

### Document Command Execution

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    clicked: (args: ClickEventArgs) => {
        // Execute browser's built-in document commands
        switch(args.item.id) {
            case 'bold-btn':
                document.execCommand('bold');
                break;
            case 'italic-btn':
                document.execCommand('italic');
                break;
            case 'underline-btn':
                document.execCommand('underline');
                break;
            case 'undo-btn':
                document.execCommand('undo');
                break;
            case 'redo-btn':
                document.execCommand('redo');
                break;
        }
    },
    items: [
        { id: 'bold-btn', text: 'Bold', prefixIcon: 'e-bold-icon tb-icons' },
        { id: 'italic-btn', text: 'Italic', prefixIcon: 'e-italic-icon tb-icons' },
        { id: 'underline-btn', text: 'Underline', prefixIcon: 'e-underline-icon tb-icons' },
        { type: 'Separator' },
        { id: 'undo-btn', text: 'Undo', prefixIcon: 'e-undo-icon tb-icons' },
        { id: 'redo-btn', text: 'Redo', prefixIcon: 'e-redo-icon tb-icons' }
    ]
});

toolbar.appendTo('#element');

// Make contenteditable for document commands
let editorDiv = document.createElement('div');
editorDiv.contentEditable = 'true';
editorDiv.style.border = '1px solid #ccc';
editorDiv.style.minHeight = '300px';
editorDiv.style.padding = '10px';
editorDiv.textContent = 'Start typing here...';
document.body.appendChild(editorDiv);
```

## Toggle Button Implementation

Create toolbar buttons that maintain state (on/off).

### Toggle Button with State Management

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

let toggleStates: { [key: string]: boolean } = {
    'bold': false,
    'italic': false,
    'underline': false
};

let toolbar: Toolbar = new Toolbar({
    created: () => {
        // Initialize toggle buttons after toolbar creation
        ['bold', 'italic', 'underline'].forEach(buttonId => {
            const toggleBtn = new Button({
                cssClass: 'e-flat',
                isPrimary: false
            });
            toggleBtn.appendTo(`#${buttonId}-toggle`);
        });
    },
    clicked: (args: ClickEventArgs) => {
        const buttonId = args.item.id;
        
        // Toggle state
        toggleStates[buttonId] = !toggleStates[buttonId];
        
        // Update button visual
        if (toggleStates[buttonId]) {
            args.item.cssClass = 'e-active';  // Add active styling
            console.log(`${buttonId} is ON`);
        } else {
            args.item.cssClass = '';
            console.log(`${buttonId} is OFF`);
        }
    },
    items: [
        { 
            id: 'bold', 
            text: 'Bold', 
            prefixIcon: 'e-bold-icon tb-icons',
            template: '<button class="e-btn e-tbar-btn" id="bold-toggle"></button>'
        },
        { 
            id: 'italic', 
            text: 'Italic', 
            prefixIcon: 'e-italic-icon tb-icons' 
        },
        { 
            id: 'underline', 
            text: 'Underline', 
            prefixIcon: 'e-underline-icon tb-icons' 
        }
    ]
});

toolbar.appendTo('#element');
```

### Advanced Toggle with Visual Feedback

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

let statusDisplay = document.createElement('div');
statusDisplay.style.padding = '10px';
statusDisplay.style.marginTop = '10px';
statusDisplay.style.border = '1px solid #ccc';
statusDisplay.textContent = 'No formatting applied';
document.body.appendChild(statusDisplay);

let toolbar: Toolbar = new Toolbar({
    clicked: (args: ClickEventArgs) => {
        const isDisabled = args.item.disabled;
        
        // Toggle disabled state
        args.item.disabled = !isDisabled;
        
        // Update display
        if (args.item.disabled) {
            statusDisplay.textContent = `${args.item.text} is now DISABLED`;
            statusDisplay.style.backgroundColor = '#ffebee';
        } else {
            statusDisplay.textContent = `${args.item.text} is now ENABLED`;
            statusDisplay.style.backgroundColor = '#e8f5e9';
        }
        
        toolbar.refresh();  // Refresh to show changes
    },
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' },
        { type: 'Separator' },
        { text: 'Undo', disabled: true },  // Initially disabled
        { text: 'Redo', disabled: true }
    ]
});

toolbar.appendTo('#element');
```

## Enable/Disable Items

Programmatically enable or disable toolbar items based on conditions.

### Enable/Disable by Index

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste', disabled: true },  // Initially disabled
        { type: 'Separator' },
        { text: 'Undo', disabled: true },
        { text: 'Redo', disabled: true }
    ]
});

toolbar.appendTo('#element');

// Enable/disable after user interaction
function onCutOrCopy() {
    // Enable paste when cut or copy is performed
    toolbar.items[2].disabled = false;  // Enable Paste
    toolbar.refresh();
}

function onClear() {
    // Disable undo/redo on clear
    toolbar.items[4].disabled = true;   // Disable Undo
    toolbar.items[5].disabled = true;   // Disable Redo
    toolbar.refresh();
}
```

### Enable/Disable by ID

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    clicked: (args: ClickEventArgs) => {
        if (args.item.id === 'cut-btn' || args.item.id === 'copy-btn') {
            // Enable paste when cut/copy is clicked
            enableItemById('paste-btn', true);
            enableItemById('undo-btn', true);
        }
    },
    items: [
        { id: 'cut-btn', text: 'Cut' },
        { id: 'copy-btn', text: 'Copy' },
        { id: 'paste-btn', text: 'Paste', disabled: true },
        { type: 'Separator' },
        { id: 'undo-btn', text: 'Undo', disabled: true },
        { id: 'redo-btn', text: 'Redo', disabled: true }
    ]
});

toolbar.appendTo('#element');

// Helper function to enable/disable by ID
function enableItemById(itemId: string, isEnabled: boolean) {
    const item = toolbar.items.find(i => i.id === itemId);
    if (item) {
        item.disabled = !isEnabled;
        toolbar.refresh();
    }
}

// Example usage
enableItemById('paste-btn', false);  // Disable
enableItemById('undo-btn', true);    // Enable
```

### Conditional Enable/Disable

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';

let contentChanged = false;
let hasSelection = false;

let toolbar: Toolbar = new Toolbar({
    clicked: (args: ClickEventArgs) => {
        // Update state based on action
        if (args.item.id === 'cut-btn' || args.item.id === 'copy-btn') {
            contentChanged = true;
            updateToolbarState();
        }
    },
    items: [
        { id: 'cut-btn', text: 'Cut', disabled: true },
        { id: 'copy-btn', text: 'Copy', disabled: true },
        { id: 'paste-btn', text: 'Paste', disabled: true }
    ]
});

toolbar.appendTo('#element');

function updateToolbarState() {
    // Cut/Copy enabled only if text is selected
    toolbar.enableItems(['cut-btn', 'copy-btn'], hasSelection);
    
    // Paste enabled only if content has changed
    toolbar.enableItems(['paste-btn'], contentChanged);
    
    toolbar.refresh();
}

// Simulate content changes
document.addEventListener('selectionchange', () => {
    hasSelection = document.getSelection().toString().length > 0;
    updateToolbarState();
});
```

## beforeCreate Event

The `beforeCreate` event fires **before the toolbar control is rendered** in the DOM. This is useful for configuring the toolbar before it becomes visible or for modifying settings during initialization.

### BeforeCreateArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `enableCollision` | `boolean` | The popup collision setting that will be applied |
| `name` | `string` | Event name (always 'beforeCreate') |
| `scrollStep` | `number` | The scroll distance value configured for scrollable mode |

### beforeCreate Configuration

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { BeforeCreateArgs } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    beforeCreate: (args: BeforeCreateArgs) => {
        console.log('beforeCreate fired');
        console.log('Collision enabled:', args.enableCollision);
        console.log('Scroll step:', args.scrollStep);
        
        // Modify settings before render
        args.enableCollision = true;
    },
    width: '100%',
    overflowMode: 'Popup',
    enableCollision: false,
    items: [
        { text: 'Home' },
        { text: 'File' },
        { text: 'Edit' }
    ]
});

toolbar.appendTo('#element');
```

### beforeCreate Use Cases

```typescript
let toolbar: Toolbar = new Toolbar({
    beforeCreate: (args: BeforeCreateArgs) => {
        // Log initialization details
        console.log(`Toolbar initializing with scrollStep: ${args.scrollStep}`);
        
        // Conditionally enable collision based on viewport
        if (window.innerWidth < 768) {
            args.enableCollision = true;
        }
        
        // Set up analytics or logging
        console.log(`Toolbar configuration: ${JSON.stringify(args)}`);
    },
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
    ]
});

toolbar.appendTo('#element');
```

### beforeCreate with Dynamic Configuration

```typescript
let toolbar: Toolbar = new Toolbar({
    beforeCreate: (args: BeforeCreateArgs) => {
        // Adjust settings based on device or user preferences
        const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            args.enableCollision = true;
            args.scrollStep = 50;  // Smaller scroll steps on mobile
            console.log('Mobile configuration applied');
        } else {
            args.scrollStep = 100;  // Standard scroll on desktop
            console.log('Desktop configuration applied');
        }
    },
    items: [
        { text: 'Action 1' },
        { text: 'Action 2' },
        { text: 'Action 3' }
    ]
});

toolbar.appendTo('#element');
```

## KeyDown Event

The `keyDown` event fires **when a keyboard key is pressed** while the toolbar or its items have focus (requires `allowKeyboard: true`). This enables keyboard navigation and custom keyboard shortcuts.

### KeyDownEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to true to prevent the default keyboard behavior |
| `currentItem` | `HTMLElement` | The DOM element of the currently focused toolbar item |
| `name` | `string` | Event name (always 'keyDown') |
| `nextItem` | `HTMLElement` | The DOM element of the next toolbar item in navigation order (may be null if at end) |
| `originalEvent` | `KeyboardEvent` | The native browser KeyboardEvent object with keyCode, key, altKey, ctrlKey, etc. |

### KeyDown Configuration

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { KeyDownEventArgs } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    allowKeyboard: true,  // Enable keyboard support
    keyDown: (args: KeyDownEventArgs) => {
        console.log('Key pressed:', args.originalEvent.key);
        console.log('Current item:', args.currentItem.textContent);
        
        // Log navigation details
        if (args.nextItem) {
            console.log('Next item:', args.nextItem.textContent);
        }
    },
    items: [
        { text: 'Save', id: 'save-btn' },
        { text: 'Edit', id: 'edit-btn' },
        { text: 'Delete', id: 'delete-btn' }
    ]
});

toolbar.appendTo('#element');
```

### KeyDown with Custom Shortcuts

```typescript
import { Toolbar, KeyDownEventArgs } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    allowKeyboard: true,
    keyDown: (args: KeyDownEventArgs) => {
        const event = args.originalEvent;
        
        // Ctrl+S for Save
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();  // Prevent browser save dialog
            args.cancel = true;       // Cancel default toolbar behavior
            console.log('Custom Save triggered via Ctrl+S');
            // Execute save logic here
        }
        
        // Delete key handling
        if (event.key === 'Delete') {
            console.log('Delete key pressed on toolbar item');
            args.cancel = false;  // Allow default behavior
        }
        
        // Arrow key navigation (usually handled by toolbar)
        if (event.key === 'ArrowLeft') {
            console.log('Navigate to previous item');
        } else if (event.key === 'ArrowRight') {
            console.log('Navigate to next item');
        }
    },
    items: [
        { text: 'Save' },
        { text: 'Edit' },
        { text: 'Delete' }
    ]
});

toolbar.appendTo('#element');
```

### KeyDown with Interactive Feedback

```typescript
import { Toolbar, KeyDownEventArgs } from '@syncfusion/ej2-navigations';

let statusDiv = document.createElement('div');
statusDiv.style.marginTop = '10px';
statusDiv.style.padding = '10px';
statusDiv.style.border = '1px solid #ccc';
statusDiv.textContent = 'Focus toolbar and press arrow keys or Delete...';
document.body.appendChild(statusDiv);

let toolbar: Toolbar = new Toolbar({
    allowKeyboard: true,
    keyDown: (args: KeyDownEventArgs) => {
        const event = args.originalEvent;
        const currentItemText = args.currentItem?.textContent || 'Unknown';
        const nextItemText = args.nextItem?.textContent || 'None';
        
        statusDiv.innerHTML = `
            <strong>Key Pressed:</strong> ${event.key}<br>
            <strong>Current Item:</strong> ${currentItemText}<br>
            <strong>Next Item:</strong> ${nextItemText}<br>
            <strong>Modifier Keys:</strong> Ctrl: ${event.ctrlKey}, Shift: ${event.shiftKey}, Alt: ${event.altKey}
        `;
        
        // Visual feedback
        if (args.nextItem) {
            statusDiv.style.backgroundColor = '#e3f2fd';
        }
    },
    items: [
        { text: 'New' },
        { text: 'Open' },
        { text: 'Save' },
        { type: 'Separator' },
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
    ]
});

toolbar.appendTo('#element');
```

## Event Types

Common toolbar events beyond `click`:

```typescript
let toolbar: Toolbar = new Toolbar({
    created: () => {
        console.log('Toolbar created');
    },
    destroyed: () => {
        console.log('Toolbar destroyed');
    },
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
    ]
});

toolbar.appendTo('#element');

// Programmatic events
toolbar.on('created', () => console.log('Ready to use'));
toolbar.on('destroyed', () => console.log('Toolbar removed'));
```

---

**Key Takeaways:**
- Use `click` property or `clicked` event for item clicks
- Implement command pattern for scalable action handling
- Use toggle states for on/off buttons
- Enable/disable items dynamically based on conditions
- Monitor state changes and update UI accordingly
