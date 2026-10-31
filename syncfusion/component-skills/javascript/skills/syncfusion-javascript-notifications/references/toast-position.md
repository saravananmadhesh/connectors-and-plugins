# Toast Positioning

The Syncfusion EJ2 JavaScript Toast component supports nine predefined positions plus custom coordinate-based positioning.

## Table of Contents
- [Predefined Positions](#predefined-positions)
- [Top Positions](#top-positions)
- [Bottom Positions](#bottom-positions)
- [Custom Pixel Coordinates](#custom-pixel-coordinates)
- [Custom Percentage Coordinates](#custom-percentage-coordinates)
- [Target Container Positioning](#target-container-positioning)
- [Multiple Toast Instances](#multiple-toast-instances)

---

## Predefined Positions

The `position` property accepts an object with `X` and `Y` coordinates:

| X | Y |
|---|---|
| `Left` | `Top` |
| `Center` | `Top` |
| `Right` | `Top` |
| `Left` | `Middle` |
| `Center` | `Middle` |
| `Right` | `Middle` |
| `Left` | `Bottom` |
| `Center` | `Bottom` |
| `Right` | `Bottom` |

---

## Top Positions

### Top Left

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Top Left',
  content: 'Positioned at top-left corner',
  position: { X: 'Left', Y: 'Top' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Top Center

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Top Center',
  content: 'Positioned at top-center',
  position: { X: 'Center', Y: 'Top' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Top Right

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Top Right',
  content: 'Positioned at top-right corner',
  position: { X: 'Right', Y: 'Top' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Middle Positions

### Middle Left

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Middle Left',
  content: 'Positioned at middle-left',
  position: { X: 'Left', Y: 'Middle' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Middle Center

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Middle Center',
  content: 'Positioned at middle-center',
  position: { X: 'Center', Y: 'Middle' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Middle Right

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Middle Right',
  content: 'Positioned at middle-right',
  position: { X: 'Right', Y: 'Middle' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Bottom Positions

### Bottom Left

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Bottom Left',
  content: 'Positioned at bottom-left corner',
  position: { X: 'Left', Y: 'Bottom' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Bottom Center

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Bottom Center',
  content: 'Positioned at bottom-center',
  position: { X: 'Center', Y: 'Bottom' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Bottom Right

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Bottom Right',
  content: 'Positioned at bottom-right corner',
  position: { X: 'Right', Y: 'Bottom' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Custom Pixel Coordinates

Position the toast at specific pixel coordinates:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Custom Position',
  content: 'Positioned at 100px from left, 200px from top',
  position: { X: 100, Y: 200 }
});
toastObj.appendTo('#toast');
toastObj.show();
```

**Use Cases:**
- Precise UI placement
- Tooltip-like positioning
- Custom notification areas

---

## Custom Percentage Coordinates

Position the toast using percentage values:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Percentage Position',
  content: 'Positioned at 25% from left, 50% from top',
  position: { X: '25%', Y: '50%' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Target Container Positioning

When using a custom `target`, the position is relative to that container:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Container-Relative',
  content: 'Positioned relative to custom container',
  target: '#toast-container',
  position: { X: 'Right', Y: 'Bottom' }
});
toastObj.appendTo('#toast-container');
toastObj.show();
```

**HTML:**

```html
<div id="toast-container" style="width: 500px; height: 400px; border: 1px solid #ccc; position: relative;"></div>
```

> **Note:** The target container must have `position: relative` for proper positioning.

---

## Multiple Toast Instances

Display different toasts at different screen positions:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

// Top toast
let topToast: Toast = new Toast({
  title: 'Top Notification',
  content: 'This appears at the top',
  position: { X: 'Center', Y: 'Top' }
});
topToast.appendTo('#top-toast');
topToast.show();

// Bottom toast
let bottomToast: Toast = new Toast({
  title: 'Bottom Notification',
  content: 'This appears at the bottom',
  position: { X: 'Right', Y: 'Bottom' }
});
bottomToast.appendTo('#bottom-toast');
bottomToast.show();

// Middle toast
let middleToast: Toast = new Toast({
  title: 'Middle Notification',
  content: 'This appears in the middle',
  position: { X: 'Left', Y: 'Middle' }
});
middleToast.appendTo('#middle-toast');
middleToast.show();
```

---

## Dynamic Position Change

Change position dynamically:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Repositionable Toast',
  content: 'Click button to move',
  position: { X: 'Right', Y: 'Top' }
});
toastObj.appendTo('#toast');

document.getElementById('move-btn')!.addEventListener('click', () => {
  toastObj.position = { X: 'Left', Y: 'Bottom' };
});
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `ToastPosition` | `{ X: 'Left', Y: 'Top' }` | Toast position |

**ToastPosition Interface:**

```typescript
interface ToastPosition {
  X: 'Left' | 'Center' | 'Right' | number | string;
  Y: 'Top' | 'Middle' | 'Bottom' | number | string;
}
```

For complete API details, see [toast-api.md](./toast-api.md).
