# Chips - Style (TypeScript)

## Chip Appearance

### Color Variants
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const colorChips: ChipList = new ChipList({
  chips: [
    { text: 'Primary', cssClass: 'e-primary' },
    { text: 'Secondary', cssClass: 'e-secondary' },
    { text: 'Success', cssClass: 'e-success' },
    { text: 'Danger', cssClass: 'e-danger' },
    { text: 'Warning', cssClass: 'e-warning' },
    { text: 'Info', cssClass: 'e-info' }
  ]
});
colorChips.appendTo('#chips');
```

### Outlined Chips
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const outlinedChips: ChipList = new ChipList({
  chips: [
    { text: 'Outlined Primary', cssClass: 'e-outline e-primary' },
    { text: 'Outlined Success', cssClass: 'e-outline e-success' },
    { text: 'Outlined Danger', cssClass: 'e-outline e-danger' }
  ]
});
outlinedChips.appendTo('#chips');
```

## Shape and Size

### Different Shapes
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const shapedChips: ChipList = new ChipList({
  chips: [
    { text: 'Rounded', cssClass: 'e-rounded' },
    { text: 'Circular', cssClass: 'e-circular' },
    { text: 'Default' }
  ]
});
shapedChips.appendTo('#chips');
```

### Size Variants
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const sizedChips: ChipList = new ChipList({
  chips: [
    { text: 'Extra Small', cssClass: 'e-xs' },
    { text: 'Small', cssClass: 'e-sm' },
    { text: 'Medium', cssClass: 'e-md' },
    { text: 'Large', cssClass: 'e-lg' },
    { text: 'Extra Large', cssClass: 'e-xl' }
  ]
});
sizedChips.appendTo('#chips');
```

## Custom Styling

### Inline Styles
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Styled Chip 1' },
    { text: 'Styled Chip 2' }
  ]
});
chipList.appendTo('#chips');

// Apply inline styles
const chipElements = chipList.element.querySelectorAll('.e-chip');
chipElements.forEach((chip: Element, index: number): void => {
  (chip as HTMLElement).style.backgroundColor = index % 2 === 0 ? '#FF6B6B' : '#4ECDC4';
  (chip as HTMLElement).style.color = 'white';
  (chip as HTMLElement).style.fontSize = '14px';
  (chip as HTMLElement).style.padding = '8px 16px';
});
```

### Custom CSS Classes
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Gradient Chip', cssClass: 'gradient-chip' },
    { text: 'Shadow Chip', cssClass: 'shadow-chip' },
    { text: 'Glowing Chip', cssClass: 'glow-chip' }
  ]
});
chipList.appendTo('#chips');

// Define custom CSS
const style = document.createElement('style');
style.textContent = `
  .gradient-chip {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  
  .shadow-chip {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .glow-chip {
    box-shadow: 0 0 10px rgba(255, 193, 7, 0.8);
    background-color: #FFC107;
  }
`;
document.head.appendChild(style);
```

## Theme Integration

### Material Design
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const materialChips: ChipList = new ChipList({
  chips: [
    { text: 'Material Design', cssClass: 'e-material' },
    { text: 'Chip 2' },
    { text: 'Chip 3' }
  ]
});
materialChips.appendTo('#chips');
```

### Bootstrap Theme
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const bootstrapChips: ChipList = new ChipList({
  chips: [
    { text: 'Bootstrap', cssClass: 'e-bootstrap' },
    { text: 'Chip 2' },
    { text: 'Chip 3' }
  ]
});
bootstrapChips.appendTo('#chips');
```

## Advanced Styling

### Icon Styling
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const iconChips: ChipList = new ChipList({
  chips: [
    { 
      text: 'Settings', 
      leadingIconCss: 'e-icons e-settings',
      cssClass: 'e-primary'
    },
    { 
      text: 'Delete', 
      trailingIconCss: 'e-icons e-delete',
      cssClass: 'e-danger'
    },
    { 
      text: 'Check', 
      leadingIconCss: 'e-icons e-check',
      cssClass: 'e-success'
    }
  ]
});
iconChips.appendTo('#chips');
```

### Avatar Styling
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const avatarChips: ChipList = new ChipList({
  chips: [
    { 
      text: 'Alice Johnson',
      avatarText: 'AJ',
      cssClass: 'e-primary'
    },
    { 
      text: 'Bob Smith',
      avatarText: 'BS',
      cssClass: 'e-success'
    }
  ]
});
avatarChips.appendTo('#chips');

// Custom avatar styling
const style = document.createElement('style');
style.textContent = `
  .e-chip-avatar {
    font-weight: bold;
    font-size: 12px;
  }
`;
document.head.appendChild(style);
```

## Responsive Styling

### Mobile Optimized
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const responsiveChips: ChipList = new ChipList({
  chips: [
    { text: 'Responsive' },
    { text: 'Design' },
    { text: 'Mobile' }
  ],
  cssClass: 'responsive-chips'
});
responsiveChips.appendTo('#chips');

// Responsive CSS
const style = document.createElement('style');
style.textContent = `
  .responsive-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  @media (max-width: 768px) {
    .responsive-chips .e-chip {
      font-size: 12px;
      padding: 4px 12px;
    }
  }
`;
document.head.appendChild(style);
```
