# Speed Dial - API (TypeScript)

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `iconCss` | `string` | `''` | CSS class for main icon |
| `position` | `string` | `'BottomRight'` | Position on screen |
| `items` | `SpeedDialItem[]` | `[]` | Collection of items |
| `mode` | `string` | `'Linear'` | Display mode: Linear or Radial |
| `direction` | `string` | `'Up'` | Direction for linear mode |
| `cssClass` | `string` | `''` | Custom CSS class |
| `isModal` | `boolean` | `false` | Show modal overlay |
| `closeOnDocumentClick` | `boolean` | `true` | Close on overlay click |
| `visible` | `boolean` | `true` | Show/hide speed dial |
| `disabled` | `boolean` | `false` | Enable/disable speed dial |

## SpeedDialItem Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | - | Display text |
| `iconCss` | `string` | `''` | Icon CSS class |
| `title` | `string` | `''` | Tooltip text |
| `id` | `string` | - | Unique identifier |
| `cssClass` | `string` | `''` | Custom CSS class |

## Methods

### Create SpeedDial
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Show/Hide
```typescript
// Show
speedDial.visible = true;
speedDial.refresh();

// Hide
speedDial.visible = false;
speedDial.refresh();
```

### Enable/Disable
```typescript
// Disable
speedDial.disabled = true;
speedDial.refresh();

// Enable
speedDial.disabled = false;
speedDial.refresh();
```

### Update Items
```typescript
speedDial.items = [
  { text: 'New Item 1', iconCss: 'e-icons e-one' },
  { text: 'New Item 2', iconCss: 'e-icons e-two' }
];
speedDial.refresh();
```

### Add Item
```typescript
speedDial.items.push({ text: 'New Item', iconCss: 'e-icons e-new' });
speedDial.refresh();
```

### Remove Item
```typescript
speedDial.items.splice(0, 1);
speedDial.refresh();
```

### Update Position
```typescript
speedDial.position = 'TopRight';
speedDial.refresh();
```

### Update Display Mode
```typescript
speedDial.mode = 'Radial';
speedDial.refresh();
```

### Refresh
```typescript
speedDial.refresh();
```

## Events

### Item Click Event
```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' }
  ],
  itemClick: (args: SpeedDialItemClickEventArgs): void => {
    console.log('Item clicked:', args.item.text);
  }
});
speedDial.appendTo('#speeddial');
```

### Open Event
```typescript
const speedDial: SpeedDial = new SpeedDial({
  items: [{ text: 'Item 1', iconCss: 'e-icons e-one' }],
  open: (): void => {
    console.log('Speed dial opened');
  }
});
speedDial.appendTo('#speeddial');
```

### Close Event
```typescript
const speedDial: SpeedDial = new SpeedDial({
  items: [{ text: 'Item 1', iconCss: 'e-icons e-one' }],
  close: (): void => {
    console.log('Speed dial closed');
  }
});
speedDial.appendTo('#speeddial');
```

### Before Open Event
```typescript
const speedDial: SpeedDial = new SpeedDial({
  items: [{ text: 'Item 1', iconCss: 'e-icons e-one' }],
  beforeOpen: (args: any): void => {
    console.log('Before opening');
    args.cancel = false;
  }
});
speedDial.appendTo('#speeddial');
```

### Before Close Event
```typescript
const speedDial: SpeedDial = new SpeedDial({
  items: [{ text: 'Item 1', iconCss: 'e-icons e-one' }],
  beforeClose: (args: any): void => {
    console.log('Before closing');
    args.cancel = false;
  }
});
speedDial.appendTo('#speeddial');
```

## Complete API Usage

```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

class SpeedDialAPI {
  private speedDial: SpeedDial;
  
  constructor() {
    this.speedDial = new SpeedDial({
      iconCss: 'e-icons e-plus',
      position: 'BottomRight',
      mode: 'Linear',
      direction: 'Up',
      items: [
        { text: 'Create', iconCss: 'e-icons e-new' },
        { text: 'Edit', iconCss: 'e-icons e-edit' },
        { text: 'Delete', iconCss: 'e-icons e-delete' }
      ],
      itemClick: (args: SpeedDialItemClickEventArgs): void => {
        this.onItemClick(args);
      },
      open: (): void => {
        this.onOpen();
      },
      close: (): void => {
        this.onClose();
      }
    });
    this.speedDial.appendTo('#speeddial');
  }
  
  // Property getters
  getPosition(): any {
    return this.speedDial.position;
  }
  
  getMode(): string {
    return this.speedDial.mode;
  }
  
  getItems(): any[] {
    return this.speedDial.items;
  }
  
  isVisible(): boolean {
    return this.speedDial.visible;
  }
  
  // Property setters
  setPosition(position: any): void {
    this.speedDial.position = position;
    this.speedDial.refresh();
  }
  
  setMode(mode: string): void {
    this.speedDial.mode = mode as any;
    this.speedDial.refresh();
  }
  
  setDirection(direction: string): void {
    this.speedDial.direction = direction as any;
    this.speedDial.refresh();
  }
  
  setVisible(visible: boolean): void {
    this.speedDial.visible = visible;
    this.speedDial.refresh();
  }
  
  setDisabled(disabled: boolean): void {
    this.speedDial.disabled = disabled;
    this.speedDial.refresh();
  }
  
  // Item management
  addItem(text: string, iconCss: string): void {
    this.speedDial.items.push({ text, iconCss });
    this.speedDial.refresh();
  }
  
  removeItem(index: number): void {
    if (index >= 0 && index < this.speedDial.items.length) {
      this.speedDial.items.splice(index, 1);
      this.speedDial.refresh();
    }
  }
  
  updateItem(index: number, text: string, iconCss: string): void {
    if (index >= 0 && index < this.speedDial.items.length) {
      this.speedDial.items[index].text = text;
      this.speedDial.items[index].iconCss = iconCss;
      this.speedDial.refresh();
    }
  }
  
  // Event handlers
  private onItemClick(args: SpeedDialItemClickEventArgs): void {
    console.log('Item clicked:', args.item.text);
  }
  
  private onOpen(): void {
    console.log('Speed dial opened');
  }
  
  private onClose(): void {
    console.log('Speed dial closed');
  }
  
  // Utility
  getElement(): HTMLElement {
    return this.speedDial.element;
  }
}

// Usage
const api = new SpeedDialAPI();
api.setMode('Radial');
api.addItem('Share', 'e-icons e-share');
console.log('Items:', api.getItems());
```
