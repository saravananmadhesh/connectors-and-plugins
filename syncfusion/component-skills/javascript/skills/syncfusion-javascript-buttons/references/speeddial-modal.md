# Speed Dial - Modal (TypeScript)

## Modal Overlay

### Enable Modal
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  isModal: true, // Enable modal overlay
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Modal Overlay with Customization
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  isModal: true,
  mask: { cssClass: 'custom-modal-mask' },
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');

// Custom modal styling
const style = document.createElement('style');
style.textContent = `
  .custom-modal-mask {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }
`;
document.head.appendChild(style);
```

## Modal Close Behavior

### Close on Overlay Click
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  isModal: true,
  closeOnDocumentClick: true, // Close when clicking overlay
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Prevent Close on Item Click
```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  isModal: true,
  items: [
    { text: 'Keep Open', iconCss: 'e-icons e-lock' },
    { text: 'Close After', iconCss: 'e-icons e-close' }
  ],
  itemClick: (args: SpeedDialItemClickEventArgs): void => {
    if (args.item.text === 'Keep Open') {
      args.event.stopPropagation();
      console.log('Keeping speed dial open');
    }
  }
});
speedDial.appendTo('#speeddial');
```

## Modal with Form

### Modal Dialog
```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  isModal: true,
  items: [
    { text: 'New Item', iconCss: 'e-icons e-new' },
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ],
  itemClick: (args: SpeedDialItemClickEventArgs): void => {
    if (args.item.text === 'New Item') {
      showFormDialog('Create New Item');
    }
  }
});
speedDial.appendTo('#speeddial');

function showFormDialog(title: string): void {
  const dialog = document.createElement('div');
  dialog.innerHTML = `
    <div class="modal-dialog">
      <h2>${title}</h2>
      <form>
        <input type="text" placeholder="Name" />
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  `;
  document.body.appendChild(dialog);
}
```

## Complete Modal Setup

```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

class ModalSpeedDial {
  private speedDial: SpeedDial;
  private isOpen: boolean = false;
  
  constructor() {
    this.speedDial = new SpeedDial({
      iconCss: 'e-icons e-plus',
      isModal: true,
      closeOnDocumentClick: true,
      items: [
        { text: 'Create', iconCss: 'e-icons e-new', id: 'create' },
        { text: 'Edit', iconCss: 'e-icons e-edit', id: 'edit' },
        { text: 'Delete', iconCss: 'e-icons e-delete', id: 'delete' }
      ],
      itemClick: (args: SpeedDialItemClickEventArgs): void => {
        this.handleItemClick(args);
      },
      beforeOpen: (): void => {
        this.isOpen = true;
      },
      close: (): void => {
        this.isOpen = false;
      }
    });
    this.speedDial.appendTo('#speeddial');
    
    this.setupModalStyling();
  }
  
  private handleItemClick(args: SpeedDialItemClickEventArgs): void {
    switch (args.item.id) {
      case 'create':
        this.showCreateForm();
        break;
      case 'edit':
        this.showEditForm();
        break;
      case 'delete':
        this.showDeleteConfirm();
        break;
    }
  }
  
  private showCreateForm(): void {
    console.log('Show create form in modal');
  }
  
  private showEditForm(): void {
    console.log('Show edit form in modal');
  }
  
  private showDeleteConfirm(): void {
    console.log('Show delete confirmation in modal');
  }
  
  private setupModalStyling(): void {
    const style = document.createElement('style');
    style.textContent = `
      .e-speeddial-modal {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      
      .modal-dialog {
        background-color: white;
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        min-width: 300px;
      }
    `;
    document.head.appendChild(style);
  }
  
  isModalOpen(): boolean {
    return this.isOpen;
  }
}

// Usage
new ModalSpeedDial();
```
