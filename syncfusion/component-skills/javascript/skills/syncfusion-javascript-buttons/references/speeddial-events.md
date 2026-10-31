# Speed Dial - Events (TypeScript)

## Item Click Event

### Basic Item Click
```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ],
  itemClick: (args: SpeedDialItemClickEventArgs): void => {
    console.log('Item clicked:', args.item.text);
  }
});
speedDial.appendTo('#speeddial');
```

## Opening and Closing Events

### Before Open Event
```typescript
import { SpeedDial, SpeedDialBeforeOpenEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ],
  beforeOpen: (args: SpeedDialBeforeOpenEventArgs): void => {
    console.log('Speed dial opening');
    args.cancel = false;
  }
});
speedDial.appendTo('#speeddial');
```

### Open Event
```typescript
import { SpeedDial, SpeedDialOpenEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ],
  open: (args: SpeedDialOpenEventArgs): void => {
    console.log('Speed dial opened');
  }
});
speedDial.appendTo('#speeddial');
```

### Before Close Event
```typescript
import { SpeedDial, SpeedDialBeforeCloseEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ],
  beforeClose: (args: SpeedDialBeforeCloseEventArgs): void => {
    console.log('Speed dial closing');
    args.cancel = false;
  }
});
speedDial.appendTo('#speeddial');
```

### Close Event
```typescript
import { SpeedDial, SpeedDialCloseEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ],
  close: (args: SpeedDialCloseEventArgs): void => {
    console.log('Speed dial closed');
  }
});
speedDial.appendTo('#speeddial');
```

## Mouse Events

### Hover Events
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

speedDial.element.addEventListener('mouseenter', (): void => {
  console.log('Mouse entered speed dial');
});

speedDial.element.addEventListener('mouseleave', (): void => {
  console.log('Mouse left speed dial');
});
```

## Complete Event Management

```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

class EventManager {
  private speedDial: SpeedDial;
  
  constructor() {
    this.speedDial = new SpeedDial({
      iconCss: 'e-icons e-plus',
      items: [
        { text: 'Create', iconCss: 'e-icons e-new' },
        { text: 'Edit', iconCss: 'e-icons e-edit' },
        { text: 'Delete', iconCss: 'e-icons e-delete' }
      ],
      itemClick: (args: SpeedDialItemClickEventArgs): void => {
        this.onItemClick(args);
      },
      beforeOpen: (): void => {
        this.onBeforeOpen();
      },
      open: (): void => {
        this.onOpen();
      },
      beforeClose: (): void => {
        this.onBeforeClose();
      },
      close: (): void => {
        this.onClose();
      }
    });
    this.speedDial.appendTo('#speeddial');
  }
  
  private onItemClick(args: SpeedDialItemClickEventArgs): void {
    console.log('Item clicked:', args.item.text);
    switch (args.item.text) {
      case 'Create':
        this.handleCreate();
        break;
      case 'Edit':
        this.handleEdit();
        break;
      case 'Delete':
        this.handleDelete();
        break;
    }
  }
  
  private onBeforeOpen(): void {
    console.log('About to open speed dial');
  }
  
  private onOpen(): void {
    console.log('Speed dial opened');
  }
  
  private onBeforeClose(): void {
    console.log('About to close speed dial');
  }
  
  private onClose(): void {
    console.log('Speed dial closed');
  }
  
  private handleCreate(): void {
    console.log('Creating new item...');
  }
  
  private handleEdit(): void {
    console.log('Editing item...');
  }
  
  private handleDelete(): void {
    console.log('Deleting item...');
  }
}

// Usage
new EventManager();
```
