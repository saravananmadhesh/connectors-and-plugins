# Floating Action Button - Icons (TypeScript)

## Icon Classes

### Material Design Icons
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

// Plus icon (most common)
const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab-plus');

// Edit icon
const editFab: Fab = new Fab({
  iconCss: 'e-icons e-edit'
});
editFab.appendTo('#fab-edit');

// Delete icon
const deleteFab: Fab = new Fab({
  iconCss: 'e-icons e-delete'
});
deleteFab.appendTo('#fab-delete');

// Save icon
const saveFab: Fab = new Fab({
  iconCss: 'e-icons e-save'
});
saveFab.appendTo('#fab-save');

// Search icon
const searchFab: Fab = new Fab({
  iconCss: 'e-icons e-search'
});
searchFab.appendTo('#fab-search');
```

## Common Icons

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

// Navigation icons
const homeFab: Fab = new Fab({ iconCss: 'e-icons e-home' });
const backFab: Fab = new Fab({ iconCss: 'e-icons e-arrow-left' });
const forwardFab: Fab = new Fab({ iconCss: 'e-icons e-arrow-right' });

// Action icons
const addFab: Fab = new Fab({ iconCss: 'e-icons e-plus' });
const removeFab: Fab = new Fab({ iconCss: 'e-icons e-minus' });
const checkFab: Fab = new Fab({ iconCss: 'e-icons e-check' });
const closeFab: Fab = new Fab({ iconCss: 'e-icons e-close' });

// Communication icons
const messageFab: Fab = new Fab({ iconCss: 'e-icons e-message' });
const phoneFab: Fab = new Fab({ iconCss: 'e-icons e-phone' });
const emailFab: Fab = new Fab({ iconCss: 'e-icons e-mail' });

// Media icons
const cameraFab: Fab = new Fab({ iconCss: 'e-icons e-camera' });
const imageFab: Fab = new Fab({ iconCss: 'e-icons e-image' });
const videoFab: Fab = new Fab({ iconCss: 'e-icons e-video' });
```

## Icon Sizing

### Default Size
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');
```

### Custom Icon Size
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-large'
});
fab.appendTo('#fab');

// Add CSS for custom sizing
const style = document.createElement('style');
style.textContent = `
  .e-fab.e-large .e-icon {
    font-size: 24px;
  }
`;
document.head.appendChild(style);
```

## Icon Positioning

### Icon Inside FAB
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomRight'
});
fab.appendTo('#fab');

// CSS for icon styling
const style = document.createElement('style');
style.textContent = `
  .e-fab .e-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
document.head.appendChild(style);
```

## Multiple Icon FABs

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const iconConfigs = [
  { id: 'fab-add', icon: 'e-icons e-plus', label: 'Add' },
  { id: 'fab-edit', icon: 'e-icons e-edit', label: 'Edit' },
  { id: 'fab-delete', icon: 'e-icons e-delete', label: 'Delete' },
  { id: 'fab-settings', icon: 'e-icons e-settings', label: 'Settings' }
];

iconConfigs.forEach((config): void => {
  const fab: Fab = new Fab({
    iconCss: config.icon,
    title: config.label
  });
  fab.appendTo(`#${config.id}`);
});
```

## Custom SVG Icons

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'custom-svg-icon'
});
fab.appendTo('#fab');

// Add custom SVG styling
const style = document.createElement('style');
style.textContent = `
  .custom-svg-icon::before {
    content: url('data:image/svg+xml,...');
    display: inline-block;
    width: 24px;
    height: 24px;
  }
`;
document.head.appendChild(style);
```

## Icon Animation

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  cssClass: 'animated-fab'
});
fab.appendTo('#fab');

// Add animation CSS
const style = document.createElement('style');
style.textContent = `
  .animated-fab .e-icon {
    transition: transform 0.3s ease;
  }
  
  .animated-fab:hover .e-icon {
    transform: rotate(90deg) scale(1.2);
  }
`;
document.head.appendChild(style);
```

## Icon Examples by Action

```typescript
import { Fab } from '@syncfusion/ej2-buttons';

class ActionFabs {
  private fabs: Map<string, Fab> = new Map();
  
  createActionFabs(): void {
    const actions = [
      { name: 'create', icon: 'e-icons e-plus', action: (): void => this.onCreate() },
      { name: 'edit', icon: 'e-icons e-edit', action: (): void => this.onEdit() },
      { name: 'delete', icon: 'e-icons e-delete', action: (): void => this.onDelete() },
      { name: 'refresh', icon: 'e-icons e-refresh', action: (): void => this.onRefresh() },
      { name: 'settings', icon: 'e-icons e-settings', action: (): void => this.onSettings() }
    ];
    
    actions.forEach((action): void => {
      const fab: Fab = new Fab({
        iconCss: action.icon,
        click: action.action
      });
      fab.appendTo(`#fab-${action.name}`);
      this.fabs.set(action.name, fab);
    });
  }
  
  private onCreate(): void { console.log('Create action'); }
  private onEdit(): void { console.log('Edit action'); }
  private onDelete(): void { console.log('Delete action'); }
  private onRefresh(): void { console.log('Refresh action'); }
  private onSettings(): void { console.log('Settings action'); }
}

// Usage
new ActionFabs().createActionFabs();
```
