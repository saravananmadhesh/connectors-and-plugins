# Open and Close the Sidebar

Learn to programmatically control the sidebar's open and closed states using methods and events.

## Table of Contents

- [Control Methods](#control-methods)
- [State Events](#state-events)
- [Complete Example with All Events](#complete-example-with-all-events)
- [HTML Structure](#html-structure)
- [Advanced Control Pattern](#advanced-control-pattern)
- [Preventing Default Behavior](#preventing-default-behavior)
- [Accessibility](#accessibility)
- [Common Patterns](#common-patterns)
- [Next Steps](#next-steps)

## Control Methods

The Sidebar provides three methods for managing its state:

### `show()` Method

Opens the sidebar:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({ isOpen: false });
sidebar.appendTo('#sidebar');

// Open the sidebar
document.querySelector('#openBtn')?.addEventListener('click', () => {
    sidebar.show();
});
```

### `hide()` Method

Closes the sidebar:

```typescript
// Close the sidebar
document.querySelector('#closeBtn')?.addEventListener('click', () => {
    sidebar.hide();
});
```

### `toggle()` Method

Switch between open and closed states:

```typescript
// Toggle open/close on each click
document.querySelector('#toggleBtn')?.addEventListener('click', () => {
    sidebar.toggle();
});
```

## State Events

React to sidebar state changes using event handlers. All state events receive `EventArgs` with properties: `cancel`, `element`, `event`, `isInteracted`, `model`.

### `open` Event

Fires when sidebar opens. Use `EventArgs.isInteracted` to check if opened by user action.

```typescript
import { Sidebar, EventArgs } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    open: (args: EventArgs) => {
        console.log('Sidebar opened');
        console.log('User interaction:', args.isInteracted);  // true if user opened, false if programmatic
        console.log('Element:', args.element);               // Sidebar DOM element
        console.log('Original event:', args.event);          // Original DOM event if user-triggered
        console.log('Sidebar model:', args.model);           // Current sidebar configuration
        
        // Access sidebar element
        (args.element as HTMLElement).classList.add('highlight');
        
        // Update UI
        document.querySelector('.status')!.textContent = 'Sidebar: Open';
    }
});
sidebar.appendTo('#sidebar');
```

### `close` Event

Fires when sidebar closes. Can be cancelled to prevent closing.

```typescript
import { Sidebar, EventArgs } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    close: (args: EventArgs) => {
        console.log('Sidebar closing');
        
        // Prevent close if there are unsaved changes
        if (hasUnsavedChanges) {
            args.cancel = true;  // Prevent closing
            console.log('Close cancelled - unsaved changes');
            return;
        }
        
        console.log('Close allowed');
        console.log('User interaction:', args.isInteracted);  // true if user closed
        
        // Cleanup operations
        (args.element as HTMLElement).classList.remove('highlight');
    }
});
sidebar.appendTo('#sidebar');
```

### `change` Event

Fires when sidebar state changes (open or close). Provides state transition information.

```typescript
import { Sidebar, ChangeEventArgs } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    change: (args: ChangeEventArgs) => {
        console.log('Sidebar state changed');
        console.log('Event name:', args.name);      // 'change'
        console.log('Element:', args.element);      // Sidebar DOM element
        
        // Track state changes
        const stateLog = document.querySelector('.state-log');
        if (stateLog) {
            const timestamp = new Date().toLocaleTimeString();
            const state = sidebar.isOpen ? 'Opened' : 'Closed';
            stateLog.textContent += `\n[${timestamp}] Sidebar ${state}`;
        }
    }
});
sidebar.appendTo('#sidebar');
```

### `created` Event

Fires when sidebar component is created and initialized.

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    width: '280px',
    created: function() {
        console.log('Sidebar created and initialized');
        
        // Initialize child components
        const searchInput = this.element.querySelector('#search');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }
        
        // Setup event delegations
        this.element.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('menu-item')) {
                handleMenuClick(target);
            }
        });
        
        // Apply initial styling
        this.getRootElement().style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        
        // Restore saved state if persistence enabled
        const savedState = localStorage.getItem('sidebarState');
        if (savedState === 'open') {
            this.show();
        }
        
        console.log('Sidebar ready for interaction');
    }
});
sidebar.appendTo('#sidebar');

function handleSearch(e: Event) {
    const query = (e.target as HTMLInputElement).value;
    console.log('Search:', query);
}

function handleMenuClick(item: HTMLElement) {
    console.log('Menu item clicked:', item.textContent);
}
```

### `destroyed` Event

Fires when sidebar component is destroyed.

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    destroyed: function() {
        console.log('Sidebar destroyed');
        
        // Cleanup event listeners
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.removeEventListener('click', handleMenuClick);
        });
        
        // Save final state
        localStorage.setItem('sidebarState', this.isOpen ? 'open' : 'closed');
        
        // Cleanup references
        sidebar = null;
        
        console.log('Sidebar cleanup complete');
    }
});
sidebar.appendTo('#sidebar');
```

## Complete Example with All Events

```typescript
import { Sidebar, EventArgs, ChangeEventArgs } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    width: '280px',
    isOpen: false,
    showBackdrop: false,
    animate: true,
    
    // Lifecycle Events
    created: function() {
        console.log('=== CREATED EVENT ===');
        console.log('Sidebar initialized');
        setupMenuItems();
    },
    
    destroyed: function() {
        console.log('=== DESTROYED EVENT ===');
        console.log('Sidebar destroyed');
        cleanupMenuItems();
    },
    
    // State Change Events
    open: (args: EventArgs) => {
        console.log('=== OPEN EVENT ===');
        console.log('User triggered:', args.isInteracted);
        updateButtonStates('open');
        logEvent('open', args.isInteracted);
    },
    
    close: (args: EventArgs) => {
        console.log('=== CLOSE EVENT ===');
        console.log('User triggered:', args.isInteracted);
        updateButtonStates('closed');
        logEvent('close', args.isInteracted);
    },
    
    change: (args: ChangeEventArgs) => {
        console.log('=== CHANGE EVENT ===');
        console.log('State transitioned');
        const state = sidebar.isOpen ? 'Open' : 'Closed';
        console.log(`Current state: ${state}`);
    }
});

sidebar.appendTo('#sidebar');

// Setup controls
let openBtn: Button = new Button({ content: 'Open', isPrimary: true }, '#openBtn');
let closeBtn: Button = new Button({ content: 'Close', isPrimary: true }, '#closeBtn');
let toggleBtn: Button = new Button({ content: 'Toggle', isPrimary: true }, '#toggleBtn');

document.querySelector('#openBtn')?.addEventListener('click', () => {
    console.log('[USER ACTION] Open button clicked');
    sidebar.show();
});

document.querySelector('#closeBtn')?.addEventListener('click', () => {
    console.log('[USER ACTION] Close button clicked');
    sidebar.hide();
});

document.querySelector('#toggleBtn')?.addEventListener('click', () => {
    console.log('[USER ACTION] Toggle button clicked');
    sidebar.toggle();
});

// Helper functions
function updateButtonStates(state: 'open' | 'closed') {
    const statusEl = document.querySelector('#status');
    if (statusEl) {
        statusEl.textContent = `Status: ${state}`;
        statusEl.classList.toggle('open', state === 'open');
        statusEl.classList.toggle('closed', state === 'closed');
    }
}

function setupMenuItems() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            console.log('Menu clicked:', (e.target as HTMLElement).textContent);
            sidebar.hide();  // Auto-close on selection
        });
    });
}

function cleanupMenuItems() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.removeEventListener('click', void 0);
    });
}

function logEvent(eventName: string, userTriggered: boolean) {
    const logEl = document.querySelector('.event-log');
    if (logEl) {
        const timestamp = new Date().toLocaleTimeString();
        const source = userTriggered ? '[USER]' : '[PROGRAMMATIC]';
        const logEntry = document.createElement('div');
        logEntry.textContent = `[${timestamp}] ${source} ${eventName}`;
        logEl.appendChild(logEntry);
        logEl.scrollTop = logEl.scrollHeight;
    }
}
```

## HTML Structure

```html
<div id="container">
    <aside id="sidebar">
        <div class="title">Sidebar</div>
        <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
        </ul>
        <button id="closeBtn" class="e-btn">Close</button>
    </aside>
    
    <div>
        <div id="status">Status: Closed</div>
        <button id="openBtn" class="e-btn">Open Sidebar</button>
        <button id="toggleBtn" class="e-btn">Toggle Sidebar</button>
        <div class="content">Main content area</div>
    </div>
</div>
```

## Advanced Control Pattern

Manage sidebar state across multiple components:

```typescript
class SidebarController {
    private sidebar: Sidebar;
    private isOpen: boolean = false;

    constructor() {
        this.sidebar = new Sidebar({
            type: 'Push',
            isOpen: false,
            open: () => this.onOpen(),
            close: () => this.onClose()
        });
        this.sidebar.appendTo('#sidebar');
    }

    private onOpen() {
        this.isOpen = true;
        document.body.classList.add('sidebar-open');
    }

    private onClose() {
        this.isOpen = false;
        document.body.classList.remove('sidebar-open');
    }

    public show() {
        if (!this.isOpen) this.sidebar.show();
    }

    public hide() {
        if (this.isOpen) this.sidebar.hide();
    }

    public toggle() {
        this.sidebar.toggle();
    }

    public getState(): boolean {
        return this.isOpen;
    }
}

// Usage
const controller = new SidebarController();
document.querySelector('#openBtn')?.addEventListener('click', () => controller.show());
document.querySelector('#closeBtn')?.addEventListener('click', () => controller.hide());
document.querySelector('#toggleBtn')?.addEventListener('click', () => controller.toggle());
```

## Preventing Default Behavior

Cancel open/close operations using event handlers:

```typescript
let sidebar: Sidebar = new Sidebar({
    open: (args: any) => {
        if (someCondition) {
            args.cancel = true;  // Prevent opening
            console.log('Opening cancelled');
        }
    },
    close: (args: any) => {
        if (unsavedChanges) {
            args.cancel = true;  // Prevent closing
            console.log('Closing cancelled');
        }
    }
});
sidebar.appendTo('#sidebar');
```

## Accessibility

Ensure keyboard control for open/close:

```typescript
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        sidebar.hide();  // ESC to close
    }
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        sidebar.toggle();  // Ctrl+M to toggle
    }
});
```

## Common Patterns

**Pattern: Auto-close on Navigation**
```typescript
sidebar.open = () => {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            sidebar.hide();  // Close after clicking menu
        });
    });
};
```

**Pattern: Close on Outside Click**
```typescript
document.addEventListener('click', (e) => {
    if (!sidebar.element.contains(e.target as Node)) {
        sidebar.hide();
    }
});
```

**Pattern: State Persistence**
```typescript
// Save state
sidebar.close = () => {
    localStorage.setItem('sidebarState', 'closed');
};

sidebar.open = () => {
    localStorage.setItem('sidebarState', 'open');
};

// Restore on load
const saved = localStorage.getItem('sidebarState');
if (saved === 'open') sidebar.show();
```

## Next Steps

- Learn **Auto-Close and Responsive Behavior** for mobile handling
- See **Content Integration** for menu structure
- Explore **Animations and Gestures** for smooth interactions
