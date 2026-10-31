# Speed Dial - Positions (TypeScript)

## Position Options

### Bottom Right (Default)
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  position: 'BottomRight', // Default
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Bottom Left
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  position: 'BottomLeft',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Top Right
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  position: 'TopRight',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Top Left
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  position: 'TopLeft',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Middle Right
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  position: 'MiddleRight',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Middle Left
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  position: 'MiddleLeft',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

## All Positions
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const positions = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight', 'MiddleLeft', 'MiddleRight'];

positions.forEach((position: string): void => {
  const speedDial: SpeedDial = new SpeedDial({
    position: position as any,
    iconCss: 'e-icons e-plus',
    items: [
      { text: 'Item 1', iconCss: 'e-icons e-one' },
      { text: 'Item 2', iconCss: 'e-icons e-two' }
    ]
  });
  speedDial.appendTo(`#speeddial-${position}`);
});
```

## Dynamic Position Change
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  position: 'BottomRight',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');

// Change position
const changeButton = document.getElementById('changePosition');
changeButton?.addEventListener('click', (): void => {
  speedDial.position = 'TopRight';
  speedDial.refresh();
});
```

## Responsive Position
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  position: 'BottomRight',
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');

// Change position based on screen size
window.addEventListener('resize', (): void => {
  if (window.innerWidth < 768) {
    speedDial.position = 'BottomRight';
  } else {
    speedDial.position = 'TopRight';
  }
  speedDial.refresh();
});
```

## Position Manager
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

class PositionManager {
  private speedDial: SpeedDial;
  private currentPosition: string = 'BottomRight';
  
  constructor() {
    this.speedDial = new SpeedDial({
      position: 'BottomRight',
      iconCss: 'e-icons e-plus',
      items: [
        { text: 'Action 1', iconCss: 'e-icons e-edit' },
        { text: 'Action 2', iconCss: 'e-icons e-delete' }
      ]
    });
    this.speedDial.appendTo('#speeddial');
    
    this.setupPositionControls();
  }
  
  private setupPositionControls(): void {
    const positions = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight', 'MiddleLeft', 'MiddleRight'];
    
    positions.forEach((pos: string): void => {
      const button = document.getElementById(`pos-${pos}`);
      button?.addEventListener('click', (): void => {
        this.setPosition(pos);
      });
    });
  }
  
  setPosition(position: string): void {
    this.speedDial.position = position as any;
    this.speedDial.refresh();
    this.currentPosition = position;
    console.log(`Position changed to: ${position}`);
  }
  
  getCurrentPosition(): string {
    return this.currentPosition;
  }
}

// Usage
new PositionManager();
```
