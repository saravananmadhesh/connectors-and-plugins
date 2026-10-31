# Speed Dial - Radial Menu (TypeScript)

## Radial Display Mode

### Basic Radial Layout
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  mode: 'Radial', // Circular arrangement
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

## Radial Settings

### Configure Radial Layout
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  mode: 'Radial',
  radialSettings: {
    offset: '100px', // Distance from center
    angle: 0 // Starting angle
  },
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' },
    { text: 'Item 4', iconCss: 'e-icons e-four' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Custom Radial Offset and Angle
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  mode: 'Radial',
  radialSettings: {
    offset: '120px', // Larger circle
    angle: 45 // Start at 45 degrees
  },
  items: [
    { text: 'N', iconCss: 'e-icons e-arrow-up' },
    { text: 'E', iconCss: 'e-icons e-arrow-right' },
    { text: 'S', iconCss: 'e-icons e-arrow-down' },
    { text: 'W', iconCss: 'e-icons e-arrow-left' },
    { text: 'NE', iconCss: 'e-icons e-arrow-up' },
    { text: 'SE', iconCss: 'e-icons e-arrow-down' },
    { text: 'SW', iconCss: 'e-icons e-arrow-down' },
    { text: 'NW', iconCss: 'e-icons e-arrow-up' }
  ]
});
speedDial.appendTo('#speeddial');
```

## Radial Animation

### Animation Configuration
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

// Add animation CSS
const style = document.createElement('style');
style.textContent = `
  .e-speeddial-item {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(0, 0) scale(0);
    }
    to {
      opacity: 1;
      transform: translate(var(--x), var(--y)) scale(1);
    }
  }
`;
document.head.appendChild(style);
```

## Radial with Different Sizes

### Multiple Radial Configurations
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

// Compact radial
const compactRadial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  mode: 'Radial',
  radialSettings: { offset: '60px' },
  items: [
    { text: 'A', iconCss: 'e-icons e-one' },
    { text: 'B', iconCss: 'e-icons e-two' },
    { text: 'C', iconCss: 'e-icons e-three' }
  ]
});
compactRadial.appendTo('#compact-radial');

// Extended radial
const extendedRadial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  mode: 'Radial',
  radialSettings: { offset: '150px' },
  items: [
    { text: 'A', iconCss: 'e-icons e-one' },
    { text: 'B', iconCss: 'e-icons e-two' },
    { text: 'C', iconCss: 'e-icons e-three' },
    { text: 'D', iconCss: 'e-icons e-four' },
    { text: 'E', iconCss: 'e-icons e-five' }
  ]
});
extendedRadial.appendTo('#extended-radial');
```

## Complete Radial Menu

```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

class RadialMenu {
  private speedDial: SpeedDial;
  
  constructor() {
    this.speedDial = new SpeedDial({
      iconCss: 'e-icons e-plus',
      mode: 'Radial',
      position: 'BottomRight',
      radialSettings: {
        offset: '110px',
        angle: 0
      },
      items: [
        { text: 'Create', iconCss: 'e-icons e-new', id: 'create' },
        { text: 'Edit', iconCss: 'e-icons e-edit', id: 'edit' },
        { text: 'Delete', iconCss: 'e-icons e-delete', id: 'delete' },
        { text: 'Share', iconCss: 'e-icons e-share', id: 'share' },
        { text: 'Archive', iconCss: 'e-icons e-folder', id: 'archive' },
        { text: 'Settings', iconCss: 'e-icons e-settings', id: 'settings' }
      ],
      itemClick: (args: SpeedDialItemClickEventArgs): void => {
        this.handleItemClick(args);
      }
    });
    
    this.speedDial.appendTo('#radial-menu');
    this.setupStyles();
  }
  
  private setupStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .e-speeddial-item {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      .e-speeddial-item:hover {
        transform: scale(1.15);
      }
      
      .e-speeddial-item.active {
        background-color: #FF9800;
      }
    `;
    document.head.appendChild(style);
  }
  
  private handleItemClick(args: SpeedDialItemClickEventArgs): void {
    const itemId = (args.item as any).id;
    console.log('Radial menu item clicked:', itemId);
    this.executeAction(itemId);
  }
  
  private executeAction(action: string): void {
    switch (action) {
      case 'create':
        console.log('Creating new item...');
        break;
      case 'edit':
        console.log('Editing item...');
        break;
      case 'delete':
        console.log('Deleting item...');
        break;
      case 'share':
        console.log('Sharing item...');
        break;
      case 'archive':
        console.log('Archiving item...');
        break;
      case 'settings':
        console.log('Opening settings...');
        break;
    }
  }
  
  updateRadialSettings(offset: string, angle: number): void {
    this.speedDial.radialSettings = { offset, angle };
    this.speedDial.refresh();
  }
}

// Usage
const radialMenu = new RadialMenu();
```
