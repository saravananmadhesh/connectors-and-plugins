# Speed Dial - Accessibility (TypeScript)

## WCAG 2.2 Compliance

The Speed Dial component follows WCAG 2.2 Level AA standards for accessibility.

### Semantic HTML
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Create', iconCss: 'e-icons e-new' },
    { text: 'Edit', iconCss: 'e-icons e-edit' }
  ]
});
speedDial.appendTo('#speeddial');

// Generated semantic structure:
// <button role="button" aria-label="Menu" aria-haspopup="menu">
//   <span class="e-icon"></span>
// </button>
// <ul role="menu">
//   <li role="menuitem">...</li>
// </ul>
```

## ARIA Attributes

### Main Button ARIA
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');

// Speed dial has:
// role="button"
// aria-label="Speed Dial"
// aria-haspopup="menu"
// aria-expanded="true/false"
```

### Item List ARIA
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Create', iconCss: 'e-icons e-new' },
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');

// Items have:
// role="menuitem"
// aria-label (from text property)
```

## Keyboard Navigation

### Tab Navigation
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');

// Tab: Focus main button
// When open: Tab through items
// Shift+Tab: Navigate backward
```

### Keyboard Activation
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');

// Supported keys:
// Enter: Activate item
// Space: Activate item
// Escape: Close menu
// Arrow keys: Navigate items
```

### Custom Keyboard Handling
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');

speedDial.element.addEventListener('keydown', (e: KeyboardEvent): void => {
  if (e.key === 'Escape') {
    console.log('Escape pressed - close menu');
  }
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    console.log('Navigate items');
  }
});
```

## Screen Reader Support

### Announcing Speed Dial
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Create new', iconCss: 'e-icons e-new' },
    { text: 'Edit document', iconCss: 'e-icons e-edit' },
    { text: 'Delete file', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');

// Screen reader announces:
// "Speed Dial menu button"
// When opened: "Menu expanded"
// Items: "Create new, menu item" etc.
```

### Announcing Item Selection
```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Save', iconCss: 'e-icons e-save' },
    { text: 'Share', iconCss: 'e-icons e-share' }
  ],
  itemClick: (args: SpeedDialItemClickEventArgs): void => {
    announceAction(`${args.item.text} selected`);
  }
});
speedDial.appendTo('#speeddial');

// Create live region for announcements
const liveRegion = document.createElement('div');
liveRegion.setAttribute('role', 'status');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.className = 'sr-only';
document.body.appendChild(liveRegion);

function announceAction(message: string): void {
  liveRegion.textContent = message;
}
```

## Focus Management

### Focus Indicators
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');

// Ensure visible focus indicators
const style = document.createElement('style');
style.textContent = `
  .e-speeddial-btn:focus {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
  }
  
  .e-speeddial-item:focus {
    outline: 2px solid #4A90E2;
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);
```

## Complete Accessible Example

```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

class AccessibleSpeedDial {
  private speedDial: SpeedDial;
  
  constructor(containerId: string) {
    this.speedDial = new SpeedDial({
      iconCss: 'e-icons e-plus',
      items: [
        { text: 'Create document', iconCss: 'e-icons e-new' },
        { text: 'Edit document', iconCss: 'e-icons e-edit' },
        { text: 'Delete document', iconCss: 'e-icons e-delete' },
        { text: 'Share document', iconCss: 'e-icons e-share' }
      ],
      itemClick: (args: SpeedDialItemClickEventArgs): void => {
        this.onItemClick(args);
      }
    });
    this.speedDial.appendTo(`#${containerId}`);
    
    this.setupAccessibility();
  }
  
  private setupAccessibility(): void {
    // Set ARIA attributes
    this.speedDial.element.setAttribute('role', 'button');
    this.speedDial.element.setAttribute('aria-label', 'Quick actions menu');
    this.speedDial.element.setAttribute('aria-haspopup', 'menu');
    
    // Add keyboard support
    this.speedDial.element.addEventListener('keydown', (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });
    
    // Focus management
    this.speedDial.element.addEventListener('focus', (): void => {
      this.speedDial.element.classList.add('focused');
    });
    
    this.speedDial.element.addEventListener('blur', (): void => {
      this.speedDial.element.classList.remove('focused');
    });
    
    // Create live region for announcements
    this.createLiveRegion();
    
    // Add accessible styles
    this.applyAccessibleStyles();
  }
  
  private createLiveRegion(): void {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'speeddial-announce';
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }
  
  private onItemClick(args: SpeedDialItemClickEventArgs): void {
    this.announceAction(`${args.item.text} selected`);
    console.log('Action:', args.item.text);
  }
  
  private announceAction(message: string): void {
    const liveRegion = document.getElementById('speeddial-announce');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }
  
  private closeMenu(): void {
    console.log('Menu closed');
  }
  
  private applyAccessibleStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
      
      .e-speeddial-btn.focused {
        outline: 3px solid #4A90E2;
        outline-offset: 2px;
      }
      
      .e-speeddial-item:focus-visible {
        outline: 2px solid #4A90E2;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }
}

// Usage
new AccessibleSpeedDial('speeddial-container');
```
