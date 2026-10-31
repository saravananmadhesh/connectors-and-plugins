# Floating Action Button - Positions (TypeScript)

## Position Options

### BottomRight (Default)
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomRight'
});
fab.appendTo('#fab');
```

### BottomLeft
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomLeft'
});
fab.appendTo('#fab');
```

### TopRight
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'TopRight'
});
fab.appendTo('#fab');
```

### TopLeft
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'TopLeft'
});
fab.appendTo('#fab');
```

### TopCenter
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'TopCenter'
});
fab.appendTo('#fab');
```

### BottomCenter
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomCenter'
});
fab.appendTo('#fab');
```

### MiddleLeft
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'MiddleLeft'
});
fab.appendTo('#fab');
```

### MiddleRight
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'MiddleRight'
});
fab.appendTo('#fab');
```

## Dynamic Position Change

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomRight'
});
fab.appendTo('#fab');

// Change position
const changeButton = document.getElementById('changePosition');
changeButton?.addEventListener('click', (): void => {
  fab.position = 'TopRight';
  fab.refresh();
});
```

## Multiple FABs at Different Positions

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const positions = [
  'TopLeft', 'TopCenter', 'TopRight',
  'MiddleLeft', 'MiddleRight',
  'BottomLeft', 'BottomCenter', 'BottomRight'
];

positions.forEach((position: string, index: number): void => {
  const fab: Fab = new Fab({
    iconCss: 'e-icons e-plus',
    position: position as any,
    cssClass: 'e-primary'
  });
  fab.appendTo(`#fab-${index}`);
});
```

## Position Responsive

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomRight'
});
fab.appendTo('#fab');

// Change position based on screen size
window.addEventListener('resize', (): void => {
  if (window.innerWidth < 768) {
    fab.position = 'BottomCenter';
  } else {
    fab.position = 'BottomRight';
  }
  fab.refresh();
});

// Initial check
if (window.innerWidth < 768) {
  fab.position = 'BottomCenter';
  fab.refresh();
}
```

## Complete Position Management

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

class PositionManager {
  private fab: Fab;
  private currentPosition: string = 'BottomRight';
  
  constructor() {
    this.fab = new Fab({
      iconCss: 'e-icons e-plus',
      position: 'BottomRight'
    });
    this.fab.appendTo('#fab');
    
    this.setupPositionControls();
  }
  
  private setupPositionControls(): void {
    const positions = [
      'TopLeft', 'TopCenter', 'TopRight',
      'MiddleLeft', 'MiddleRight',
      'BottomLeft', 'BottomCenter', 'BottomRight'
    ];
    
    positions.forEach((pos: string): void => {
      const button = document.getElementById(`pos-${pos}`);
      button?.addEventListener('click', (): void => {
        this.setPosition(pos);
      });
    });
  }
  
  private setPosition(position: string): void {
    this.fab.position = position as any;
    this.fab.refresh();
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
