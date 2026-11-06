# Accessibility and Best Practices

## Table of Contents
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes and Screen Reader Support](#aria-attributes-and-screen-reader-support)
- [HTML Sanitization](#html-sanitization)
- [Mobile Responsiveness](#mobile-responsiveness)
- [Performance Optimization](#performance-optimization)
- [Common Pitfalls and Solutions](#common-pitfalls-and-solutions)
- [Testing and Validation](#testing-and-validation)
- [Best Practices Checklist](#best-practices-checklist)

## Keyboard Navigation

The Menu component supports keyboard navigation out of the box:

```typescript
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';

let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        items: [
            { text: 'Open' },
            { text: 'Save' },
            { text: 'Exit' }
        ]
    },
    { text: 'Help' }
];

let menuObj: Menu = new Menu({
    items: menuItems,
    // Keyboard navigation is enabled by default
}, '#menu');

// Keyboard shortcuts supported:
// Arrow keys: Navigate between items
// Enter: Select focused item
// Escape: Close submenu
// Alt + letter: Access mnemonic shortcuts
```

### Implementing Custom Keyboard Shortcuts

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    select: (args) => {
        console.log(`Selected: ${args.item.text}`);
    }
}, '#menu');

// Add custom keyboard handler
document.addEventListener('keydown', (e) => {
    // Ctrl+O for Open
    if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        // Trigger File > Open
        let openItem = findMenuItemById('open');
        if (openItem) {
            menuObj.select(openItem);
        }
    }

    // Ctrl+S for Save
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        // Trigger File > Save
        let saveItem = findMenuItemById('save');
        if (saveItem) {
            menuObj.select(saveItem);
        }
    }
});

function findMenuItemById(id: string): HTMLElement | null {
    return document.querySelector(`[data-item-id="${id}"]`);
}
```

## ARIA Attributes and Screen Reader Support

Ensure proper ARIA attributes for accessibility:

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        id: 'file-menu',
        items: [
            { text: 'New Document', id: 'new-doc' },
            { text: 'Open File', id: 'open-file' },
            { text: 'Save', id: 'save-file' }
        ]
    },
    {
        text: 'Edit',
        id: 'edit-menu',
        items: [
            { text: 'Undo', id: 'undo' },
            { text: 'Redo', id: 'redo' }
        ]
    }
];

let menuObj: Menu = new Menu({
    items: menuItems,
    // ARIA attributes are automatically added
}, '#menu');

// Verify ARIA attributes in HTML:
// <li role="menuitem">File</li>
// <li role="menuitem" aria-haspopup="true" aria-expanded="false">Edit</li>
```

### Custom ARIA Setup

```typescript
function addCustomAria(menuElement: HTMLElement) {
    menuElement.setAttribute('role', 'menubar');
    menuElement.setAttribute('aria-label', 'Main Navigation Menu');

    let menuItems = menuElement.querySelectorAll('.e-menu-item');
    menuItems.forEach((item) => {
        item.setAttribute('role', 'menuitem');
        
        if (item.querySelector('.e-popup')) {
            item.setAttribute('aria-haspopup', 'true');
            item.setAttribute('aria-expanded', 'false');
        }
    });
}

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
addCustomAria(document.getElementById('menu'));
```

## HTML Sanitization

Protect against XSS attacks by enabling HTML sanitization:

```typescript
let menuItems: MenuItemModel[] = [
    // Safe menu items
    { text: 'File' },
    { text: 'Edit' }
];

let menuObj: Menu = new Menu({
    items: menuItems,
    enableHtmlSanitizer: true  // Default: true
}, '#menu');

// Unsafe input is automatically sanitized
let unsafeData: MenuItemModel[] = [
    { text: '<img src=x onerror=alert("XSS")>' }  // Will be sanitized
];

let safeMenu: Menu = new Menu({
    items: unsafeData,
    enableHtmlSanitizer: true
}, '#menu');
```

### When to Disable Sanitization

Only disable if you control all content:

```typescript
let trustedTemplateContent = `
    <div style="color: blue;">
        <i class="e-icons e-file"></i>
        <span>Trusted Content</span>
    </div>
`;

let menuObj: Menu = new Menu({
    items: menuItems,
    enableHtmlSanitizer: false,  // Only with trusted content
    template: trustedTemplateContent
}, '#menu');
```

## Mobile Responsiveness

Optimize menu for mobile devices:

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    hamburgerMode: window.innerWidth < 768,
    target: '.navbar-container'
}, '#menu');

// Adapt on resize
window.addEventListener('resize', () => {
    menuObj.hamburgerMode = window.innerWidth < 768;
});
```

### Mobile-Friendly CSS

```css
/* Ensure touch targets are at least 44x44px */
.e-menu-wrapper ul .e-menu-item {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 16px;
}

/* Larger touch areas for mobile */
@media (max-width: 768px) {
    .e-menu-wrapper ul .e-menu-item {
        padding: 16px 20px;
        font-size: 16px;
    }

    .e-menu-wrapper.e-menu-popup {
        position: fixed;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
    }
}
```

## Performance Optimization

### 1. Lazy Load Large Menus

```typescript
let menuObj: Menu = new Menu({
    items: getTopLevelItems(),  // Load only top level initially
    beforeOpen: async (args) => {
        if (args.parentItem && !args.parentItem.items) {
            // Load submenu on demand
            args.parentItem.items = await loadSubmenuItems(args.parentItem.id);
        }
    }
}, '#menu');

async function loadSubmenuItems(parentId: string): Promise<MenuItemModel[]> {
    const response = await fetch(`/api/menu/${parentId}`);
    return response.json();
}
```

### 2. Debounce Frequent Updates

```typescript
let updateTimeout: NodeJS.Timeout;
let pendingUpdates: MenuItemModel[] = [];

function scheduleMenuUpdate(items: MenuItemModel[]) {
    pendingUpdates.push(...items);
    
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
        menuObj.insertAfter(pendingUpdates);
        pendingUpdates = [];
    }, 300);
}
```

### 3. Use Virtual Scrolling

```typescript
function createVirtualScrollMenu(allItems: MenuItemModel[], pageSize: number = 50) {
    let items = allItems.slice(0, pageSize);
    let currentIndex = pageSize;

    let menuObj: Menu = new Menu({
        items: items,
        enableScrolling: true
    }, '#menu');

    document.getElementById('menu').addEventListener('scroll', (e) => {
        let element = e.target as HTMLElement;
        if (element.scrollHeight - element.scrollTop < element.clientHeight + 100) {
            // Load next batch
            let nextBatch = allItems.slice(
                currentIndex,
                currentIndex + pageSize
            );
            menuObj.insertAfter(nextBatch);
            currentIndex += pageSize;
        }
    });

    return menuObj;
}
```

## Common Pitfalls and Solutions

### Pitfall 1: Not Using IDs for Item Manipulation

```typescript
// ❌ BAD - Fragile, relies on text
menuObj.disableItems(['Save']);  // Breaks if text changes

// ✅ GOOD - Using IDs
menuObj.disableItems(['file-save']);  // Reliable
```

### Pitfall 2: Missing Error Handling

```typescript
// ❌ BAD - No error handling
let menuObj: Menu = new Menu({
    items: remoteData,
    beforeOpen: (args) => {
        loadSubmenu(args.parentItem.id);  // Could fail silently
    }
}, '#menu');

// ✅ GOOD - With error handling
let menuObj: Menu = new Menu({
    items: remoteData,
    beforeOpen: async (args) => {
        try {
            args.parentItem.items = await loadSubmenu(args.parentItem.id);
        } catch (error) {
            console.error('Failed to load submenu:', error);
            // Show error to user
        }
    }
}, '#menu');
```

### Pitfall 3: Not Cleaning Up Event Listeners

```typescript
// ❌ BAD - Memory leak
document.addEventListener('click', (e) => {
    menuObj.close();
});

// ✅ GOOD - Proper cleanup
function handleDocumentClick(e: MouseEvent) {
    if (!menuElement.contains(e.target as Node)) {
        menuObj.close();
    }
}

document.addEventListener('click', handleDocumentClick);

// On component destroy:
document.removeEventListener('click', handleDocumentClick);
```

### Pitfall 4: Inline Styles Over CSS Classes

```typescript
// ❌ BAD - Hard to maintain
menuObj.cssClass = 'custom-menu';
document.getElementById('menu').style.backgroundColor = '#007bff';
document.getElementById('menu').style.borderRadius = '8px';

// ✅ GOOD - Using CSS
let menuObj: Menu = new Menu({
    items: menuItems,
    cssClass: 'styled-menu'
}, '#menu');

// In CSS file
.styled-menu {
    background-color: #007bff;
    border-radius: 8px;
}
```

### Pitfall 5: Not Handling Async Data Properly

```typescript
// ❌ BAD - Race condition
let menuObj: Menu = new Menu({
    items: [],
    beforeOpen: (args) => {
        fetch(`/api/menu/${args.parentItem.id}`).then(r => r.json())
            .then(data => {
                args.parentItem.items = data;  // May set wrong parent
            });
    }
}, '#menu');

// ✅ GOOD - With proper async handling
let menuObj: Menu = new Menu({
    items: [],
    beforeOpen: async (args) => {
        if (!args.parentItem.items) {
            try {
                const response = await fetch(`/api/menu/${args.parentItem.id}`);
                args.parentItem.items = await response.json();
            } catch (error) {
                console.error('Failed to load menu:', error);
            }
        }
    }
}, '#menu');
```

## Testing and Validation

### Unit Testing Menu Items

```typescript
describe('Menu Component', () => {
    let menuObj: Menu;
    let menuElement: HTMLElement;

    beforeEach(() => {
        menuElement = document.createElement('ul');
        menuElement.id = 'menu';
        document.body.appendChild(menuElement);
    });

    afterEach(() => {
        menuObj.destroy();
        menuElement.remove();
    });

    it('should initialize with items', () => {
        menuObj = new Menu({
            items: [
                { text: 'File' },
                { text: 'Edit' }
            ]
        }, '#menu');

        expect(menuObj.items.length).toBe(2);
    });

    it('should handle item selection', () => {
        let selectedItem: MenuItemModel;
        menuObj = new Menu({
            items: [
                { text: 'File', id: 'file' }
            ],
            select: (args) => {
                selectedItem = args.item;
            }
        }, '#menu');

        // Trigger selection
        let fileItem = menuElement.querySelector('[data-item="file"]') as HTMLElement;
        fileItem.click();

        expect(selectedItem.text).toBe('File');
    });
});
```

## Best Practices Checklist

- ✅ Always use IDs for menu item identification
- ✅ Implement error handling for async data loading
- ✅ Use keyboard navigation for accessibility
- ✅ Enable HTML sanitization for user-generated content
- ✅ Optimize large menus with lazy loading
- ✅ Use CSS classes instead of inline styles
- ✅ Handle edge cases (empty data, errors)
- ✅ Test on multiple devices and browsers
- ✅ Implement proper ARIA attributes
- ✅ Provide fallback content for JavaScript-disabled browsers
- ✅ Use semantic HTML structures
- ✅ Document custom event handlers
- ✅ Implement proper cleanup in destroy/dispose
- ✅ Follow responsive design principles
- ✅ Validate all user input before rendering

## Summary

- Ensure keyboard accessibility
- Use ARIA attributes correctly
- Sanitize HTML content
- Optimize for mobile
- Handle errors gracefully
- Test thoroughly
- Use semantic HTML
- Follow performance best practices
