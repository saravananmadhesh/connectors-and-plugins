# Chips - Accessibility (TypeScript)

## WCAG 2.2 Compliance

The Chips component follows WCAG 2.2 Level AA guidelines ensuring accessibility for all users.

### Semantic HTML
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const accessibleChips: ChipList = new ChipList({
  chips: [
    { text: 'Accessible Chip 1' },
    { text: 'Accessible Chip 2' }
  ]
});
accessibleChips.appendTo('#chips');

// Generated HTML includes proper ARIA roles
// <div role="listbox" class="e-chips">
//   <div role="option" class="e-chip">...</div>
// </div>
```

## ARIA Attributes

### Chip Container Roles
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Option 1', selected: true },
    { text: 'Option 2' },
    { text: 'Option 3' }
  ]
});
chipList.appendTo('#chips');

// Apply ARIA attributes
const container = chipList.element;
container.setAttribute('role', 'listbox');
container.setAttribute('aria-label', 'Select options');
container.setAttribute('aria-multiselectable', 'true');
```

### Individual Chip Roles
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Selected Item' }
  ]
});
chipList.appendTo('#chips');

// Chips automatically have:
// role="option"
// aria-selected="true/false"
// aria-label="Selected Item"
```

## Keyboard Navigation

### Keyboard Support
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const keyboardChips: ChipList = new ChipList({
  chips: [
    { text: 'First', selected: true },
    { text: 'Second' },
    { text: 'Third' },
    { text: 'Fourth' }
  ],
  selectionMode: 'Multiple'
});
keyboardChips.appendTo('#chips');

// Supported keys:
// Tab: Navigate through chips
// Shift+Tab: Navigate backward
// Enter/Space: Select/Deselect chip
// Delete/Backspace: Delete chip (if enabled)
// Arrow Keys: Navigate between chips
```

### Custom Keyboard Handling
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' }
  ]
});
chipList.appendTo('#chips');

const container = chipList.element;

container.addEventListener('keydown', (e: KeyboardEvent): void => {
  switch (e.key) {
    case 'ArrowRight':
      focusNextChip();
      break;
    case 'ArrowLeft':
      focusPreviousChip();
      break;
    case 'Delete':
      deleteSelectedChip();
      break;
  }
});

function focusNextChip(): void {
  // Implementation
}

function focusPreviousChip(): void {
  // Implementation
}

function deleteSelectedChip(): void {
  // Implementation
}
```

## Screen Reader Support

### Labels and Descriptions
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Skills' },
    { text: 'Technologies' }
  ]
});
chipList.appendTo('#chips');

// Add descriptive labels
const container = chipList.element;
const label = document.createElement('label');
label.id = 'chips-label';
label.textContent = 'Select technologies you are familiar with:';
container.parentElement?.insertBefore(label, container);
container.setAttribute('aria-labelledby', 'chips-label');
```

### Announcing Changes
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'React' }
  ]
});
chipList.appendTo('#chips');

// Create live region for announcements
const liveRegion = document.createElement('div');
liveRegion.setAttribute('role', 'status');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.className = 'sr-only';
document.body.appendChild(liveRegion);

// Announce chip changes
function announceChange(message: string): void {
  liveRegion.textContent = message;
}

// Usage
announceChange('Chip added: React');
announceChange('Chip deleted: Angular');
```

## Focus Management

### Focus Indicators
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Focusable' },
    { text: 'Chips' }
  ]
});
chipList.appendTo('#chips');

// Ensure focus indicators are visible
const style = document.createElement('style');
style.textContent = `
  .e-chip:focus {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
  }
  
  .e-chip:focus-visible {
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }
`;
document.head.appendChild(style);
```

### Focus Trap
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' }
  ]
});
chipList.appendTo('#chips');

// Manage focus for modal dialogs
const container = chipList.element;
const chips = container.querySelectorAll('.e-chip');

container.addEventListener('keydown', (e: KeyboardEvent): void => {
  if (e.key === 'Tab') {
    const currentIndex = Array.from(chips).indexOf(document.activeElement as Element);
    
    if (e.shiftKey && currentIndex === 0) {
      (chips[chips.length - 1] as HTMLElement).focus();
      e.preventDefault();
    } else if (!e.shiftKey && currentIndex === chips.length - 1) {
      (chips[0] as HTMLElement).focus();
      e.preventDefault();
    }
  }
});
```

## Color Contrast

### Accessible Colors
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'High Contrast', cssClass: 'e-high-contrast' }
  ]
});
chipList.appendTo('#chips');

// High contrast colors (WCAG AAA)
const style = document.createElement('style');
style.textContent = `
  .e-high-contrast {
    background-color: #000;
    color: #FFF;
    border: 2px solid #FFF;
  }
  
  .e-high-contrast:focus {
    outline: 2px solid #FFFF00;
  }
`;
document.head.appendChild(style);
```

## Complete Accessible Example

```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

class AccessibleChipList {
  private chipList: ChipList;
  
  constructor(containerId: string) {
    this.chipList = new ChipList({
      chips: [
        { text: 'Angular', selected: true },
        { text: 'React' },
        { text: 'Vue' }
      ],
      selectionMode: 'Multiple',
      enableDelete: true
    });
    this.chipList.appendTo(`#${containerId}`);
    
    this.setupAccessibility(containerId);
  }
  
  private setupAccessibility(containerId: string): void {
    const container = this.chipList.element;
    
    // Set ARIA attributes
    container.setAttribute('role', 'listbox');
    container.setAttribute('aria-multiselectable', 'true');
    container.setAttribute('aria-label', 'Framework selection');
    
    // Add live region
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';
    container.parentElement?.appendChild(liveRegion);
    
    // Add keyboard handling
    container.addEventListener('keydown', (e: KeyboardEvent): void => {
      this.handleKeyboard(e);
    });
  }
  
  private handleKeyboard(e: KeyboardEvent): void {
    if (e.key === 'Delete' && e.shiftKey) {
      const selected = this.chipList.chips.filter(c => c.selected);
      selected.forEach(chip => {
        const index = this.chipList.chips.indexOf(chip);
        if (index > -1) {
          this.chipList.chips.splice(index, 1);
        }
      });
      this.chipList.refresh();
    }
  }
}

// Usage
new AccessibleChipList('chips-container');
```
