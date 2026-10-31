# Floating Action Button - Styles (TypeScript)

## Built-in Themes

### Primary Style
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-primary'
});
fab.appendTo('#fab');
```

### Success Style
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-check',
  cssClass: 'e-success'
});
fab.appendTo('#fab');
```

### Warning Style
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-alert',
  cssClass: 'e-warning'
});
fab.appendTo('#fab');
```

### Danger Style
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-delete',
  cssClass: 'e-danger'
});
fab.appendTo('#fab');
```

### Info Style
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-info',
  cssClass: 'e-info'
});
fab.appendTo('#fab');
```

## Size Variants

### Small FAB
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-small'
});
fab.appendTo('#fab');
```

### Medium FAB (Default)
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');
```

### Large FAB
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-large'
});
fab.appendTo('#fab');
```

## Custom Styling

### Inline Styles
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

// Apply inline styles
fab.element.style.width = '60px';
fab.element.style.height = '60px';
fab.element.style.backgroundColor = '#FF6B6B';
fab.element.style.color = 'white';
fab.element.style.fontSize = '28px';
```

### Custom CSS Classes
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'custom-fab'
});
fab.appendTo('#fab');

// Define custom CSS
const style = document.createElement('style');
style.textContent = `
  .custom-fab {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
  
  .custom-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`;
document.head.appendChild(style);
```

## Theme Variants

### Material Design
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-material'
});
fab.appendTo('#fab');
```

### Bootstrap Theme
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-bootstrap'
});
fab.appendTo('#fab');
```

### Fluent Theme
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-fluent'
});
fab.appendTo('#fab');
```

## Hover and Active States

### Custom Hover Effect
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'interactive-fab'
});
fab.appendTo('#fab');

const style = document.createElement('style');
style.textContent = `
  .interactive-fab {
    transition: all 0.3s ease;
  }
  
  .interactive-fab:hover {
    transform: scale(1.15) rotate(45deg);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  .interactive-fab:active {
    transform: scale(0.95);
  }
`;
document.head.appendChild(style);
```

## Animation Effects

### Pulse Animation
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'pulse-fab'
});
fab.appendTo('#fab');

const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(66, 153, 225, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
    }
  }
  
  .pulse-fab {
    animation: pulse 2s infinite;
  }
`;
document.head.appendChild(style);
```

### Float Animation
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'float-fab'
});
fab.appendTo('#fab');

const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .float-fab {
    animation: float 3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);
```

## Responsive Styling

### Mobile Optimized
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'responsive-fab'
});
fab.appendTo('#fab');

const style = document.createElement('style');
style.textContent = `
  .responsive-fab {
    width: 56px;
    height: 56px;
  }
  
  @media (max-width: 768px) {
    .responsive-fab {
      width: 48px;
      height: 48px;
      font-size: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .responsive-fab {
      width: 40px;
      height: 40px;
      font-size: 16px;
      bottom: 16px;
      right: 16px;
    }
  }
`;
document.head.appendChild(style);
```

## Complete Styling Example

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

class StyledFabManager {
  private fabs: Map<string, Fab> = new Map();
  
  createStyledFabs(): void {
    const styles = [
      { name: 'primary', cssClass: 'e-primary' },
      { name: 'success', cssClass: 'e-success' },
      { name: 'warning', cssClass: 'e-warning' },
      { name: 'danger', cssClass: 'e-danger' },
      { name: 'custom', cssClass: 'custom-gradient' }
    ];
    
    styles.forEach((style): void => {
      const fab: Fab = new Fab({
        iconCss: 'e-icons e-plus',
        cssClass: style.cssClass
      });
      fab.appendTo(`#fab-${style.name}`);
      this.fabs.set(style.name, fab);
    });
    
    this.applyCustomStyles();
  }
  
  private applyCustomStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .custom-gradient {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
    `;
    document.head.appendChild(style);
  }
}

// Usage
new StyledFabManager().createStyledFabs();
```
