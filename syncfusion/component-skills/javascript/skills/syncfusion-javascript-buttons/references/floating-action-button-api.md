# Floating Action Button - API (TypeScript)

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `iconCss` | `string` | `''` | CSS class for FAB icon |
| `position` | `FabPosition` | `'BottomRight'` | FAB position on screen |
| `cssClass` | `string` | `''` | Custom CSS class |
| `click` | `Function` | - | Click event handler |
| `title` | `string` | `''` | Tooltip title |
| `visible` | `boolean` | `true` | Show/hide FAB |
| `disabled` | `boolean` | `false` | Enable/disable FAB |

## FabPosition Type

```typescript
type FabPosition = 
  | 'TopLeft'
  | 'TopCenter'
  | 'TopRight'
  | 'MiddleLeft'
  | 'MiddleRight'
  | 'BottomLeft'
  | 'BottomCenter'
  | 'BottomRight';
```

## Methods

### Create FAB
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomRight'
});
fab.appendTo('#fab');
```

### Change Position
```typescript
fab.position = 'TopRight';
fab.refresh();
```

### Update Icon
```typescript
fab.iconCss = 'e-icons e-edit';
fab.refresh();
```

### Toggle Visibility
```typescript
fab.visible = !fab.visible;
fab.refresh();
```

### Enable/Disable
```typescript
// Disable FAB
fab.disabled = true;
fab.refresh();

// Enable FAB
fab.disabled = false;
fab.refresh();
```

### Update CSS Class
```typescript
fab.cssClass = 'e-success';
fab.refresh();
```

### Refresh
```typescript
fab.refresh();
```

## Events

### Click Event
```typescript
import { Fab, FabClickEventArgs } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  click: (args: FabClickEventArgs): void => {
    console.log('FAB clicked');
  }
});
fab.appendTo('#fab');
```

### Event Arguments
```typescript
interface FabClickEventArgs {
  event: MouseEvent | KeyboardEvent;
  timeStamp: number;
  originalEvent: Event;
}
```

## DOM Access

### Get FAB Element
```typescript
const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

const fabElement: HTMLElement = fab.element;
console.log(fabElement);
```

### Get Icon Element
```typescript
const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus'
});
fab.appendTo('#fab');

const iconElement: HTMLElement | null = fab.element.querySelector('.e-icon');
```

## Complete API Usage

```typescript
import { Fab, FabClickEventArgs } from '@syncfusion/ej2-buttons';

class FabAPI {
  private fab: Fab;
  
  constructor() {
    this.fab = new Fab({
      iconCss: 'e-icons e-plus',
      position: 'BottomRight',
      click: (args: FabClickEventArgs): void => {
        this.handleClick(args);
      }
    });
    this.fab.appendTo('#fab');
  }
  
  // Property getters
  getIcon(): string {
    return this.fab.iconCss;
  }
  
  getPosition(): any {
    return this.fab.position;
  }
  
  isVisible(): boolean {
    return this.fab.visible;
  }
  
  isDisabled(): boolean {
    return this.fab.disabled;
  }
  
  // Property setters
  setIcon(iconCss: string): void {
    this.fab.iconCss = iconCss;
    this.fab.refresh();
  }
  
  setPosition(position: any): void {
    this.fab.position = position;
    this.fab.refresh();
  }
  
  setTitle(title: string): void {
    this.fab.title = title;
    this.fab.refresh();
  }
  
  setVisible(visible: boolean): void {
    this.fab.visible = visible;
    this.fab.refresh();
  }
  
  setDisabled(disabled: boolean): void {
    this.fab.disabled = disabled;
    this.fab.refresh();
  }
  
  // Event handlers
  private handleClick(args: FabClickEventArgs): void {
    console.log('FAB clicked at:', args.timeStamp);
  }
  
  // Utility methods
  addCssClass(className: string): void {
    this.fab.element.classList.add(className);
  }
  
  removeCssClass(className: string): void {
    this.fab.element.classList.remove(className);
  }
  
  toggleCssClass(className: string): void {
    this.fab.element.classList.toggle(className);
  }
  
  getFabElement(): HTMLElement {
    return this.fab.element;
  }
}

// Usage
const api = new FabAPI();
api.setIcon('e-icons e-edit');
api.setPosition('TopRight');
console.log('Current position:', api.getPosition());
```
