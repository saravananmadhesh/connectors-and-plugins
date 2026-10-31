# Floating Action Button - Accessibility (TypeScript)

## WCAG 2.2 Compliance

The Floating Action Button component follows WCAG 2.2 Level AA standards for accessibility.

### Semantic HTML
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  title: 'Create new item'
});
fab.appendTo('#fab');

// Generated HTML structure:
// <button class="e-fab" title="Create new item" role="button">
//   <span class="e-icon e-icons e-plus"></span>
// </button>
```

## ARIA Attributes

### Button Role
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

// FAB automatically has:
// role="button"
// aria-label (based on icon/title)
```

### Accessible Label
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  title: 'Add new item' // Used for aria-label
});
fab.appendTo('#fab');

// FAB gets aria-label="Add new item"
```

### Disabled State
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  disabled: true
});
fab.appendTo('#fab');

// FAB element has aria-disabled="true"
```

## Keyboard Navigation

### Tab Navigation
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

// FAB is keyboard accessible with Tab key
// Focus visible outline automatically styled
```

### Keyboard Activation
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  click: (): void => {
    console.log('FAB activated');
  }
});
fab.appendTo('#fab');

// Activates with Enter or Space key
```

### Custom Keyboard Handling
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

fab.element.addEventListener('keydown', (e: KeyboardEvent): void => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    console.log('FAB activated via keyboard');
  }
});
```

## Screen Reader Support

### Announcing FAB
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  title: 'Create a new task'
});
fab.appendTo('#fab');

// Screen readers announce: "Create a new task, button"
```

### Adding Description
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  title: 'Create'
});
fab.appendTo('#fab');

// Add aria-describedby for additional context
const description = document.createElement('span');
description.id = 'fab-description';
description.textContent = 'Click to create a new task';
description.style.display = 'none';
fab.element.parentElement?.appendChild(description);
fab.element.setAttribute('aria-describedby', 'fab-description');
```

## Focus Management

### Focus Indicators
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

// Ensure focus indicator is visible
const style = document.createElement('style');
style.textContent = `
  .e-fab:focus {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
  }
  
  .e-fab:focus-visible {
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }
`;
document.head.appendChild(style);
```

### Focus Management in Modals
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

class AccessibleFabModal {
  private fab: Fab;
  private modal: HTMLElement;
  private previousFocus: HTMLElement | null = null;
  
  constructor() {
    this.fab = new Fab({
      iconCss: 'e-icons e-plus'
    });
    this.fab.appendTo('#fab');
    
    this.modal = document.createElement('div');
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
  }
  
  openModal(): void {
    // Save current focus
    this.previousFocus = document.activeElement as HTMLElement;
    
    // Move focus to modal
    this.modal.focus();
  }
  
  closeModal(): void {
    // Restore previous focus
    this.previousFocus?.focus();
  }
}
```

## Color Contrast

### High Contrast Mode
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'high-contrast'
});
fab.appendTo('#fab');

// High contrast colors (WCAG AAA)
const style = document.createElement('style');
style.textContent = `
  .e-fab.high-contrast {
    background-color: #000;
    color: #FFF;
    border: 2px solid #FFF;
  }
  
  .e-fab.high-contrast:focus {
    outline: 3px solid #FFFF00;
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);
```

## Complete Accessible Example

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

class AccessibleFab {
  private fab: Fab;
  
  constructor(containerId: string) {
    this.fab = new Fab({
      iconCss: 'e-icons e-plus',
      title: 'Add new item',
      click: (): void => {
        this.onFabClick();
      }
    });
    this.fab.appendTo(`#${containerId}`);
    
    this.setupAccessibility();
  }
  
  private setupAccessibility(): void {
    // Set ARIA attributes
    this.fab.element.setAttribute('role', 'button');
    this.fab.element.setAttribute('aria-label', 'Add new item');
    this.fab.element.setAttribute('aria-pressed', 'false');
    
    // Add keyboard support
    this.fab.element.addEventListener('keydown', (e: KeyboardEvent): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.onFabClick();
      }
    });
    
    // Ensure focus visible
    this.fab.element.addEventListener('focus', (): void => {
      this.fab.element.classList.add('focused');
    });
    
    this.fab.element.addEventListener('blur', (): void => {
      this.fab.element.classList.remove('focused');
    });
    
    // Add description for screen readers
    this.addScreenReaderDescription();
  }
  
  private addScreenReaderDescription(): void {
    const srOnly = document.createElement('span');
    srOnly.className = 'sr-only';
    srOnly.textContent = 'Floating action button to create a new task';
    this.fab.element.appendChild(srOnly);
  }
  
  private onFabClick(): void {
    console.log('FAB clicked');
    this.announceAction('New item created');
  }
  
  private announceAction(message: string): void {
    const liveRegion = document.querySelector('[role="status"]') as HTMLElement;
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }
}

// Add screen reader only styles
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
  
  .e-fab.focused {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);

// Usage
new AccessibleFab('fab-container');
```
