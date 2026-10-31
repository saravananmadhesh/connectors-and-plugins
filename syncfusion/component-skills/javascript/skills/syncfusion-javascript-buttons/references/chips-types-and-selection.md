# Chips - Types and Selection (TypeScript)

## Chip Types

### Default Chips
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Angular' },
    { text: 'React' },
    { text: 'Vue' }
  ]
});
chipList.appendTo('#chips');
```

### Input Chips
Chips added by user input:

```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Added' }
  ]
});
chipList.appendTo('#chips');

// Add chips programmatically
const input = document.getElementById('chipInput') as HTMLInputElement;
input?.addEventListener('keypress', (e: KeyboardEvent): void => {
  if (e.key === 'Enter' && input.value) {
    chipList.chips.push({ text: input.value });
    chipList.refresh();
    input.value = '';
  }
});
```

## Selection Modes

### No Selection
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Read-only' },
    { text: 'Chip 1' },
    { text: 'Chip 2' }
  ],
  selectionMode: 'None'
});
chipList.appendTo('#chips');
```

### Single Selection
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Option 1', selected: true },
    { text: 'Option 2' },
    { text: 'Option 3' }
  ],
  selectionMode: 'Single'
});
chipList.appendTo('#chips');

// Listen to selection
chipList.element.addEventListener('click', (event: Event): void => {
  const target = (event.target as HTMLElement).closest('.e-chip');
  if (target) {
    console.log('Selected chip:', target.textContent);
  }
});
```

### Multiple Selection
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Skill 1', selected: true },
    { text: 'Skill 2', selected: true },
    { text: 'Skill 3' },
    { text: 'Skill 4' }
  ],
  selectionMode: 'Multiple'
});
chipList.appendTo('#chips');

// Get selected chips
function getSelectedChips(): string[] {
  return Array.from(chipList.element.querySelectorAll('.e-chip.e-active'))
    .map(chip => chip.textContent || '');
}

console.log('Selected:', getSelectedChips());
```

## Chip Features

### Chips with Icons
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Google', leadingIconCss: 'e-icons e-search' },
    { text: 'Delete', trailingIconCss: 'e-icons e-delete' },
    { text: 'Settings', leadingIconCss: 'e-icons e-settings' }
  ]
});
chipList.appendTo('#chips');
```

### Deletable Chips
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Chip 1', leadingIconCss: 'e-icons e-close' },
    { text: 'Chip 2', leadingIconCss: 'e-icons e-close' },
    { text: 'Chip 3', leadingIconCss: 'e-icons e-close' }
  ],
  delete: (args: any): void => {
    console.log('Deleted:', args.text);
  }
});
chipList.appendTo('#chips');
```

### Chips with Avatars
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Alice', avatarText: 'A' },
    { text: 'Bob', avatarText: 'B' },
    { text: 'Charlie', avatarText: 'C' }
  ]
});
chipList.appendTo('#chips');
```

## Complete Example

```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

// Multi-select chips with deletion
const skillChips: ChipList = new ChipList({
  chips: [
    { text: 'Angular', selected: true, leadingIconCss: 'e-icons e-close' },
    { text: 'React', selected: true, leadingIconCss: 'e-icons e-close' },
    { text: 'Vue', leadingIconCss: 'e-icons e-close' },
    { text: 'TypeScript', leadingIconCss: 'e-icons e-close' }
  ],
  selectionMode: 'Multiple',
  delete: (args: any): void => {
    console.log('Skill removed:', args.text);
  }
});
skillChips.appendTo('#skillChips');
```
