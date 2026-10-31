# Speed Dial - Display Modes (TypeScript)

## Linear Mode

### Vertical (Up Direction)
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  direction: 'Up', // Items appear vertically upward
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Horizontal (Right Direction)
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  direction: 'Right', // Items appear horizontally to the right
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Down Direction
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  direction: 'Down', // Items appear vertically downward
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Left Direction
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  direction: 'Left', // Items appear horizontally to the left
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Radial Mode

### Circular Layout
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  mode: 'Radial', // Items arranged in circle
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' },
    { text: 'Item 4', iconCss: 'e-icons e-four' },
    { text: 'Item 5', iconCss: 'e-icons e-five' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Radial with Custom Radius
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  mode: 'Radial',
  radialSettings: {
    offset: '80px', // Distance from center
    angle: 0 // Starting angle
  },
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Mode Comparison

### Linear vs Radial
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

// Linear mode (Up direction)
const linearSpeedDial: SpeedDial = new SpeedDial({
  mode: 'Linear',
  direction: 'Up',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' },
    { text: 'Save', iconCss: 'e-icons e-save' }
  ]
});
linearSpeedDial.appendTo('#linear-speeddial');

// Radial mode (circular)
const radialSpeedDial: SpeedDial = new SpeedDial({
  mode: 'Radial',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' },
    { text: 'Save', iconCss: 'e-icons e-save' }
  ]
});
radialSpeedDial.appendTo('#radial-speeddial');
```

## Dynamic Mode Change

```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  mode: 'Linear',
  direction: 'Up',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ]
});
speedDial.appendTo('#speeddial');

// Change to radial mode
const changeButton = document.getElementById('changeModeButton');
changeButton?.addEventListener('click', (): void => {
  speedDial.mode = 'Radial';
  speedDial.refresh();
});

// Change direction
const upButton = document.getElementById('upButton');
upButton?.addEventListener('click', (): void => {
  speedDial.direction = 'Up';
  speedDial.refresh();
});
```

## Mode with Animation

```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  mode: 'Radial',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ],
  cssClass: 'animated-speeddial'
});
speedDial.appendTo('#speeddial');

// Add animation CSS
const style = document.createElement('style');
style.textContent = `
  .animated-speeddial .e-speeddial-item {
    animation: popIn 0.3s ease-out forwards;
  }
  
  @keyframes popIn {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);
```

## Display Mode Manager

```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

class DisplayModeManager {
  private speedDial: SpeedDial;
  private currentMode: string = 'Linear';
  private currentDirection: string = 'Up';
  
  constructor() {
    this.speedDial = new SpeedDial({
      mode: 'Linear',
      direction: 'Up',
      iconCss: 'e-icons e-plus',
      items: [
        { text: 'Item 1', iconCss: 'e-icons e-one' },
        { text: 'Item 2', iconCss: 'e-icons e-two' },
        { text: 'Item 3', iconCss: 'e-icons e-three' },
        { text: 'Item 4', iconCss: 'e-icons e-four' }
      ]
    });
    this.speedDial.appendTo('#speeddial');
    
    this.setupControls();
  }
  
  private setupControls(): void {
    document.getElementById('linear')?.addEventListener('click', (): void => {
      this.setMode('Linear');
    });
    
    document.getElementById('radial')?.addEventListener('click', (): void => {
      this.setMode('Radial');
    });
  }
  
  setMode(mode: string): void {
    this.speedDial.mode = mode as any;
    this.speedDial.refresh();
    this.currentMode = mode;
    console.log(`Mode changed to: ${mode}`);
  }
  
  setDirection(direction: string): void {
    this.speedDial.direction = direction as any;
    this.speedDial.refresh();
    this.currentDirection = direction;
    console.log(`Direction changed to: ${direction}`);
  }
  
  getMode(): string {
    return this.currentMode;
  }
}

// Usage
new DisplayModeManager();
```
