# Speed Dial - Getting Started (TypeScript)

## Overview

Speed Dial is an expandable floating action button with a collection of related actions that appear on demand, providing quick access to frequently used functions.

## Setup

### Installation
```bash
npm install @syncfusion/ej2-buttons
```

### Import
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';
```

## Basic Setup

### HTML Structure
```html
<div id="speeddial"></div>
```

### TypeScript Component
```typescript
import { SpeedDial, SpeedDialItem } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' },
    { text: 'Save', iconCss: 'e-icons e-save' }
  ]
});
speedDial.appendTo('#speeddial');
```

## With Icon

```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Create', iconCss: 'e-icons e-new' },
    { text: 'Open', iconCss: 'e-icons e-folder' },
    { text: 'Download', iconCss: 'e-icons e-download' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Display Modes

### Linear Display
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  direction: 'Up', // Linear mode
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Radial Display
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  mode: 'Radial',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Positions

### Bottom Right (Default)
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  position: 'BottomRight', // Default
  items: [
    { text: 'Action 1', iconCss: 'e-icons e-edit' },
    { text: 'Action 2', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Click Events

### Item Click Handler
```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ],
  itemClick: (args: SpeedDialItemClickEventArgs): void => {
    console.log('Clicked:', args.item.text);
  }
});
speedDial.appendTo('#speeddial');
```

## Styling

### Primary Style
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-primary',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Complete Example

```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

class SpeedDialDemo {
  private speedDial: SpeedDial;
  
  constructor() {
    this.speedDial = new SpeedDial({
      iconCss: 'e-icons e-plus',
      position: 'BottomRight',
      cssClass: 'e-primary',
      items: [
        { text: 'Create', iconCss: 'e-icons e-new' },
        { text: 'Edit', iconCss: 'e-icons e-edit' },
        { text: 'Delete', iconCss: 'e-icons e-delete' },
        { text: 'Save', iconCss: 'e-icons e-save' }
      ],
      itemClick: (args: SpeedDialItemClickEventArgs): void => {
        this.handleItemClick(args);
      }
    });
    this.speedDial.appendTo('#speeddial');
  }
  
  private handleItemClick(args: SpeedDialItemClickEventArgs): void {
    console.log('Action selected:', args.item.text);
  }
}

// Initialize
new SpeedDialDemo();
```

## Next Steps

- Explore [Items Configuration](speeddial-items.md)
- Learn about [Positions](speeddial-positions.md)
- Understand [Display Modes](speeddial-display-modes.md)
- Handle [Events](speeddial-events.md)
- Apply [Styles](speeddial-styles.md)
- Review [API Reference](speeddial-api.md)
