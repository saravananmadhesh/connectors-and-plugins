# Speed Dial - Items (TypeScript)

## Item Configuration

### Basic Items
```typescript
import { SpeedDial, SpeedDialItem } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' },
    { text: 'Save', iconCss: 'e-icons e-save' }
  ]
});
speedDial.appendTo('#speeddial');
```

## SpeedDialItem Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | - | Display text for item |
| `iconCss` | `string` | `''` | Icon CSS class |
| `title` | `string` | `''` | Tooltip text |
| `click` | `Function` | - | Click handler |
| `id` | `string` | - | Unique identifier |
| `cssClass` | `string` | `''` | Custom CSS class |

## Items with Handlers

### Individual Item Click Handlers
```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Create', iconCss: 'e-icons e-new', id: 'create' },
    { text: 'Edit', iconCss: 'e-icons e-edit', id: 'edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete', id: 'delete' }
  ],
  itemClick: (args: SpeedDialItemClickEventArgs): void => {
    handleItemClick(args);
  }
});
speedDial.appendTo('#speeddial');

function handleItemClick(args: SpeedDialItemClickEventArgs): void {
  switch (args.item.id) {
    case 'create':
      console.log('Create clicked');
      break;
    case 'edit':
      console.log('Edit clicked');
      break;
    case 'delete':
      console.log('Delete clicked');
      break;
  }
}
```

## Dynamic Items

### Add Items Programmatically
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: []
});
speedDial.appendTo('#speeddial');

// Add items dynamically
const newItems = [
  { text: 'Item 1', iconCss: 'e-icons e-one' },
  { text: 'Item 2', iconCss: 'e-icons e-two' },
  { text: 'Item 3', iconCss: 'e-icons e-three' }
];

speedDial.items = newItems;
speedDial.refresh();
```

### Modify Items
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

// Update existing item
speedDial.items[0].text = 'Updated Item 1';
speedDial.refresh();

// Add new item
speedDial.items.push({ text: 'New Item', iconCss: 'e-icons e-new' });
speedDial.refresh();

// Remove item
speedDial.items.splice(0, 1);
speedDial.refresh();
```

## Item with Titles

### Tooltip Text
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { 
      text: 'Create', 
      iconCss: 'e-icons e-new',
      title: 'Create a new document'
    },
    { 
      text: 'Edit', 
      iconCss: 'e-icons e-edit',
      title: 'Edit current document'
    },
    { 
      text: 'Delete', 
      iconCss: 'e-icons e-delete',
      title: 'Delete document'
    }
  ]
});
speedDial.appendTo('#speeddial');
```

## Item Styling

### Custom Item Styles
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { 
      text: 'Save', 
      iconCss: 'e-icons e-save',
      cssClass: 'success-item'
    },
    { 
      text: 'Delete', 
      iconCss: 'e-icons e-delete',
      cssClass: 'danger-item'
    },
    { 
      text: 'Edit', 
      iconCss: 'e-icons e-edit',
      cssClass: 'warning-item'
    }
  ]
});
speedDial.appendTo('#speeddial');

// Add CSS for item styles
const style = document.createElement('style');
style.textContent = `
  .success-item { background-color: #28a745; }
  .danger-item { background-color: #dc3545; }
  .warning-item { background-color: #ffc107; }
`;
document.head.appendChild(style);
```

## Complete Item Management

```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

class ItemManager {
  private speedDial: SpeedDial;
  private itemCount: number = 0;
  
  constructor() {
    this.speedDial = new SpeedDial({
      iconCss: 'e-icons e-plus',
      items: this.createInitialItems(),
      itemClick: (args: SpeedDialItemClickEventArgs): void => {
        this.onItemClick(args);
      }
    });
    this.speedDial.appendTo('#speeddial');
  }
  
  private createInitialItems() {
    return [
      { text: 'Create', iconCss: 'e-icons e-new', id: 'create' },
      { text: 'Open', iconCss: 'e-icons e-folder', id: 'open' },
      { text: 'Save', iconCss: 'e-icons e-save', id: 'save' }
    ];
  }
  
  addItem(text: string, iconCss: string): void {
    this.speedDial.items.push({
      text,
      iconCss,
      id: `item-${++this.itemCount}`
    });
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
  
  getItems() {
    return this.speedDial.items;
  }
  
  private onItemClick(args: SpeedDialItemClickEventArgs): void {
    console.log('Item clicked:', args.item.text);
  }
}

// Usage
const manager = new ItemManager();
manager.addItem('Delete', 'e-icons e-delete');
console.log('Total items:', manager.getItems().length);
```
