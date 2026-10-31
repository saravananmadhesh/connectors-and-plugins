# Speed Dial - Styles (TypeScript)

## Built-in Themes

### Primary Style
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-primary',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Success Style
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-check',
  cssClass: 'e-success',
  items: [
    { text: 'Approve', iconCss: 'e-icons e-check' },
    { text: 'Confirm', iconCss: 'e-icons e-check' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Danger Style
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-delete',
  cssClass: 'e-danger',
  items: [
    { text: 'Delete', iconCss: 'e-icons e-delete' },
    { text: 'Remove', iconCss: 'e-icons e-remove' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Warning Style
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-alert',
  cssClass: 'e-warning',
  items: [
    { text: 'Warning', iconCss: 'e-icons e-alert' },
    { text: 'Alert', iconCss: 'e-icons e-info' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Size Variants

### Small Size
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-small',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Medium Size (Default)
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
```

### Large Size
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-large',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Custom Styling

### Inline Styles
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

// Apply inline styles
speedDial.element.style.backgroundColor = '#FF6B6B';
speedDial.element.style.color = 'white';
```

### Custom CSS Classes
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  cssClass: 'gradient-speeddial',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');

// Define custom CSS
const style = document.createElement('style');
style.textContent = `
  .gradient-speeddial {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
  
  .gradient-speeddial:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(style);
```

## Item Styling

### Individual Item Styles
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Save', iconCss: 'e-icons e-save', cssClass: 'success-item' },
    { text: 'Delete', iconCss: 'e-icons e-delete', cssClass: 'danger-item' },
    { text: 'Edit', iconCss: 'e-icons e-edit', cssClass: 'warning-item' }
  ]
});
speedDial.appendTo('#speeddial');

const style = document.createElement('style');
style.textContent = `
  .success-item { background-color: #28a745; }
  .danger-item { background-color: #dc3545; }
  .warning-item { background-color: #ffc107; }
`;
document.head.appendChild(style);
```

## Theme Integration

### Material Design
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-material',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Bootstrap Theme
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-bootstrap',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Complete Styling Example

```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

class StyledSpeedDial {
  private speedDials: Map<string, SpeedDial> = new Map();
  
  createStyledSpeedDials(): void {
    const styles = [
      { name: 'primary', cssClass: 'e-primary' },
      { name: 'success', cssClass: 'e-success' },
      { name: 'danger', cssClass: 'e-danger' },
      { name: 'custom', cssClass: 'custom-gradient' }
    ];
    
    styles.forEach((style): void => {
      const speedDial: SpeedDial = new SpeedDial({
        iconCss: 'e-icons e-plus',
        cssClass: style.cssClass,
        items: [
          { text: 'Item 1', iconCss: 'e-icons e-one' },
          { text: 'Item 2', iconCss: 'e-icons e-two' },
          { text: 'Item 3', iconCss: 'e-icons e-three' }
        ]
      });
      speedDial.appendTo(`#speeddial-${style.name}`);
      this.speedDials.set(style.name, speedDial);
    });
    
    this.applyCustomStyles();
  }
  
  private applyCustomStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .custom-gradient {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      }
      
      .custom-gradient:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
    `;
    document.head.appendChild(style);
  }
}

// Usage
new StyledSpeedDial().createStyledSpeedDials();
```
