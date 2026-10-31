# Floating Action Button - Events (TypeScript)

## Click Event

### Basic Click Handler
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  click: (args: any): void => {
    console.log('FAB clicked');
  }
});
fab.appendTo('#fab');
```

### Click with Arguments
```typescript
import { Fab, FabClickEventArgs } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  click: (args: FabClickEventArgs): void => {
    console.log('Clicked at:', args.timeStamp);
    console.log('Event:', args.event);
  }
});
fab.appendTo('#fab');
```

## Focus Events

### Focus Event
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

fab.element.addEventListener('focus', (): void => {
  console.log('FAB focused');
});
```

### Blur Event
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

fab.element.addEventListener('blur', (): void => {
  console.log('FAB blurred');
});
```

## Mouse Events

### Hover Events
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

fab.element.addEventListener('mouseenter', (): void => {
  console.log('Mouse entered FAB');
  fab.element.style.transform = 'scale(1.1)';
});

fab.element.addEventListener('mouseleave', (): void => {
  console.log('Mouse left FAB');
  fab.element.style.transform = 'scale(1)';
});
```

### Mousedown and Mouseup
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

fab.element.addEventListener('mousedown', (): void => {
  console.log('Mouse button pressed');
  fab.element.style.opacity = '0.7';
});

fab.element.addEventListener('mouseup', (): void => {
  console.log('Mouse button released');
  fab.element.style.opacity = '1';
});
```

## Keyboard Events

### Key Press Event
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

fab.element.addEventListener('keydown', (e: KeyboardEvent): void => {
  if (e.key === 'Enter' || e.key === ' ') {
    console.log('Key pressed:', e.key);
    // Trigger action
  }
});
```

## Custom Event Handling

### Multiple Event Handlers
```typescript
import { Fab, FabClickEventArgs } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  click: (args: FabClickEventArgs): void => {
    console.log('Primary click handler');
  }
});
fab.appendTo('#fab');

// Add additional handlers
fab.element.addEventListener('click', (): void => {
  console.log('Secondary click handler');
});

fab.element.addEventListener('dblclick', (): void => {
  console.log('Double click detected');
});
```

## Event Propagation

### Stop Propagation
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

fab.element.addEventListener('click', (e: MouseEvent): void => {
  e.stopPropagation();
  console.log('FAB click handled');
});

// Parent click won't fire
document.getElementById('fab')?.parentElement?.addEventListener('click', (): void => {
  console.log('Parent click - will not log if stopPropagation called');
});
```

## Complete Event Management

```typescript
import { Fab, FabClickEventArgs } from '@syncfusion/ej2-buttons';

class FabEventManager {
  private fab: Fab;
  private clickCount: number = 0;
  
  constructor() {
    this.fab = new Fab({
      iconCss: 'e-icons e-plus',
      click: (args: FabClickEventArgs): void => {
        this.handleClick(args);
      }
    });
    this.fab.appendTo('#fab');
    
    this.setupEventHandlers();
  }
  
  private setupEventHandlers(): void {
    this.fab.element.addEventListener('mouseenter', (): void => {
      this.onHover();
    });
    
    this.fab.element.addEventListener('mouseleave', (): void => {
      this.onHoverEnd();
    });
    
    this.fab.element.addEventListener('focus', (): void => {
      this.onFocus();
    });
    
    this.fab.element.addEventListener('blur', (): void => {
      this.onBlur();
    });
    
    this.fab.element.addEventListener('keydown', (e: KeyboardEvent): void => {
      this.onKeydown(e);
    });
  }
  
  private handleClick(args: FabClickEventArgs): void {
    this.clickCount++;
    console.log(`FAB clicked ${this.clickCount} times`);
  }
  
  private onHover(): void {
    console.log('Hovering over FAB');
    this.fab.element.classList.add('hovered');
  }
  
  private onHoverEnd(): void {
    console.log('Hover ended');
    this.fab.element.classList.remove('hovered');
  }
  
  private onFocus(): void {
    console.log('FAB focused');
    this.fab.element.classList.add('focused');
  }
  
  private onBlur(): void {
    console.log('FAB blurred');
    this.fab.element.classList.remove('focused');
  }
  
  private onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      console.log('Keyboard activation');
      this.simulateClick();
    }
  }
  
  private simulateClick(): void {
    console.log('Simulating FAB click from keyboard');
  }
  
  getClickCount(): number {
    return this.clickCount;
  }
}

// Usage
const manager = new FabEventManager();
```
