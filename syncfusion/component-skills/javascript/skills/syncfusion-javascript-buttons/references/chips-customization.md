# Chips - Customization (TypeScript)

## Custom Chip Content

### HTML Content in Chips
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { 
      text: 'John Doe',
      avatarText: 'JD',
      trailingIconCss: 'e-icons e-close'
    },
    { 
      text: 'Jane Smith',
      avatarText: 'JS',
      trailingIconCss: 'e-icons e-close'
    }
  ]
});
chipList.appendTo('#chips');
```

## Styling Chips

### CSS Classes
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const coloredChips: ChipList = new ChipList({
  chips: [
    { text: 'Primary', cssClass: 'e-primary' },
    { text: 'Success', cssClass: 'e-success' },
    { text: 'Warning', cssClass: 'e-warning' },
    { text: 'Danger', cssClass: 'e-danger' }
  ]
});
coloredChips.appendTo('#chips');
```

### Custom Styling
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const styledChips: ChipList = new ChipList({
  chips: [
    { text: 'Custom Style 1' },
    { text: 'Custom Style 2' }
  ],
  cssClass: 'custom-chips'
});
styledChips.appendTo('#chips');

// Add custom CSS
const style = document.createElement('style');
style.textContent = `
  .custom-chips .e-chip {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 20px;
  }
`;
document.head.appendChild(style);
```

## Layout Options

### Vertical Layout
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const verticalChips: ChipList = new ChipList({
  chips: [
    { text: 'Chip 1' },
    { text: 'Chip 2' },
    { text: 'Chip 3' }
  ],
  cssClass: 'e-vertical'
});
verticalChips.appendTo('#chips');
```

### Chip Size Variants
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const sizedChips: ChipList = new ChipList({
  chips: [
    { text: 'Small', cssClass: 'e-sm' },
    { text: 'Medium', cssClass: 'e-md' },
    { text: 'Large', cssClass: 'e-lg' }
  ]
});
sizedChips.appendTo('#chips');
```

## Advanced Customization

### Dynamic Chip Creation
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const dynamicChips: ChipList = new ChipList({
  chips: []
});
dynamicChips.appendTo('#chips');

const addButton = document.getElementById('addBtn');
const input = document.getElementById('chipInput') as HTMLInputElement;

addButton?.addEventListener('click', (): void => {
  if (input.value.trim()) {
    dynamicChips.chips.push({
      text: input.value,
      trailingIconCss: 'e-icons e-close'
    });
    dynamicChips.refresh();
    input.value = '';
  }
});
```

### Chip Themes
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

// Using different themes
const chips: ChipList = new ChipList({
  chips: [
    { text: 'Material3' },
    { text: 'Bootstrap5' },
    { text: 'Fluent' }
  ]
});
chips.appendTo('#chips');

// Theme CSS must be linked in HTML
// <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/XX.X.XX/ej2.css">
```
