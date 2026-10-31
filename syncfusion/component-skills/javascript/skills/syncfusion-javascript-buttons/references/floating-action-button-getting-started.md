# Floating Action Button - Getting Started (TypeScript)

## Overview

The Floating Action Button (FAB) is a circular button that floats above the content, providing quick access to the most important actions.

## Setup

### Installation
```bash
npm install @syncfusion/ej2-buttons
```

### Import
```typescript
import { Fab } from '@syncfusion/ej2-buttons';
```

## Basic Setup

### HTML Structure
```html
<div id="fab"></div>
```

### TypeScript Component
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomRight'
});
fab.appendTo('#fab');
```

## Positions

### Default Position (BottomRight)
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomRight' // Default
});
fab.appendTo('#fab');
```

### All Available Positions
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

// BottomRight
const fabBR: Fab = new Fab({ position: 'BottomRight', iconCss: 'e-icons e-plus' });
fabBR.appendTo('#fab-br');

// BottomLeft
const fabBL: Fab = new Fab({ position: 'BottomLeft', iconCss: 'e-icons e-plus' });
fabBL.appendTo('#fab-bl');

// TopRight
const fabTR: Fab = new Fab({ position: 'TopRight', iconCss: 'e-icons e-plus' });
fabTR.appendTo('#fab-tr');

// TopLeft
const fabTL: Fab = new Fab({ position: 'TopLeft', iconCss: 'e-icons e-plus' });
fabTL.appendTo('#fab-tl');

// TopCenter
const fabTC: Fab = new Fab({ position: 'TopCenter', iconCss: 'e-icons e-plus' });
fabTC.appendTo('#fab-tc');

// MiddleRight
const fabMR: Fab = new Fab({ position: 'MiddleRight', iconCss: 'e-icons e-plus' });
fabMR.appendTo('#fab-mr');

// MiddleLeft
const fabML: Fab = new Fab({ position: 'MiddleLeft', iconCss: 'e-icons e-plus' });
fabML.appendTo('#fab-ml');

// BottomCenter
const fabBC: Fab = new Fab({ position: 'BottomCenter', iconCss: 'e-icons e-plus' });
fabBC.appendTo('#fab-bc');
```

## Icon Setup

### Built-in Icons
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

// Plus icon
const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

// Other common icons
const actionFab: Fab = new Fab({ iconCss: 'e-icons e-edit' });
const deleteFab: Fab = new Fab({ iconCss: 'e-icons e-delete' });
const saveFab: Fab = new Fab({ iconCss: 'e-icons e-save' });
```

## Event Handling

### Click Event
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  click: (args: any): void => {
    console.log('FAB clicked');
    // Handle action
  }
});
fab.appendTo('#fab');
```

## Styling

### Primary Style
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-primary'
});
fab.appendTo('#fab');
```

### Other Styles
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-success' // or e-danger, e-warning, e-info
});
fab.appendTo('#fab');
```

## Complete Example

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

class FloatingActionButtonDemo {
  private fab: Fab;
  
  constructor() {
    this.fab = new Fab({
      iconCss: 'e-icons e-plus',
      position: 'BottomRight',
      cssClass: 'e-primary',
      click: (): void => {
        this.handleFabClick();
      }
    });
    this.fab.appendTo('#fab');
  }
  
  private handleFabClick(): void {
    console.log('Floating Action Button clicked');
    // Perform action
  }
}

// Initialize
new FloatingActionButtonDemo();
```

## Next Steps

- Learn about [FAB Positions](floating-action-button-positions.md)
- Explore [Icon Options](floating-action-button-icons.md)
- Handle [Events](floating-action-button-events.md)
- Apply [Styles](floating-action-button-styles.md)
- Review [API Reference](floating-action-button-api.md)
