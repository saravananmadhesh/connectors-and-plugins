# Advanced Features

## Table of Contents
- [Animation Effects](#animation-effects)
- [Animation Timing](#animation-timing)
- [Global Animation Control](#global-animation-control)
- [Drag and Drop](#drag-and-drop)
- [Draggable Configuration](#draggable-configuration)
- [Droppable Configuration](#droppable-configuration)
- [Template Customization](#template-customization)
- [State Persistence](#state-persistence)
- [Security Best Practices](#security-best-practices)

---

## Animation Effects

The Animation utility creates smooth visual transitions for HTML elements by running a sequence of frames. Syncfusion provides built-in animation effects that enhance user experience.

### Available Animation Effects

- **Fade:** `FadeIn`, `FadeOut`, `FadeZoomIn`, `FadeZoomOut`
- **Slide:** `SlideBottomIn`, `SlideBottomOut`, `SlideDownIn`, `SlideDownOut`, `SlideLeftIn`, `SlideLeftOut`, `SlideRightIn`, `SlideRightOut`, `SlideTopIn`, `SlideTopOut`, `SlideUpIn`, `SlideUpOut`
- **Zoom:** `ZoomIn`, `ZoomOut`
- **Flip:** `FlipLeftDownIn`, `FlipLeftDownOut`, `FlipLeftUpIn`, `FlipLeftUpOut`, `FlipRightDownIn`, `FlipRightDownOut`, `FlipRightUpIn`, `FlipRightUpOut`, `FlipXDownIn`, `FlipXDownOut`, `FlipXUpIn`, `FlipXUpOut`, `FlipYLeftIn`, `FlipYLeftOut`, `FlipYRightIn`, `FlipYRightOut`
- **None:** Disables animation

### Basic Animation Example

```typescript
import { Animation } from '@syncfusion/ej2-base';

let animation: Animation = new Animation();
animation.animate('#element1', { name: 'FadeOut' });
animation.animate('#element2', { name: 'ZoomOut' });
```

---

## Animation Timing

Control animation speed and behavior with the `duration` property to specify how long the animation takes (in milliseconds) and `delay` property to set when animation starts:

- **duration:** Total time in milliseconds for animation to complete (default: 400ms)
- **delay:** Time in milliseconds before animation starts (default: 0ms)

```typescript
import { Animation } from '@syncfusion/ej2-base';

let animation: Animation = new Animation({ delay: 2000, duration: 5000 });
animation.animate('#element1', { name: 'FadeOut' });
animation.animate('#element2', { name: 'ZoomOut' });
```

Shorter durations result in faster animations, longer durations in slower animations. Delay is useful for creating animations where multiple elements animate in sequence or animations that start after user interaction.

---

## Global Animation Control

Control animations for all Syncfusion controls globally using the `setGlobalAnimation()` method. This determines whether JavaScript-based animations through control APIs and the Animation library should run.

```typescript
import { GlobalAnimationMode, setGlobalAnimation } from "@syncfusion/ej2-base";

// Enable animations globally (overrides control settings)
setGlobalAnimation(GlobalAnimationMode.Enable);

// Disable animations globally (overrides control settings)
setGlobalAnimation(GlobalAnimationMode.Disable);

// Use control's own animation settings (default)
setGlobalAnimation(GlobalAnimationMode.Default);
```

**Note:** This method controls JavaScript-based animations through control APIs and the Animation library. It does not affect CSS-based animations or direct style-based animation properties.

---

## Drag and Drop

Implement custom drag-and-drop interactions using Draggable and Droppable utilities from `@syncfusion/ej2-base`.

### Draggable Utility

Transform any DOM element into a draggable item:

```typescript
import { Draggable } from '@syncfusion/ej2-base';

// Create draggable element
const draggable: Draggable = new Draggable(document.getElementById('element'), { 
    clone: false 
});
```

```html
<div id='container'>
  <div id='element' style='width: 100px; height: 100px; background-color: #4CAF50; cursor: move; padding: 10px;'>
    <p>Draggable Element</p>
  </div>
</div>
```

---

## Draggable Configuration

### Clone Option

Create a visual copy during drag operation:

```typescript
import { Draggable } from '@syncfusion/ej2-base';

const draggable: Draggable = new Draggable(document.getElementById('element'), { 
    clone: true 
});
```

When `clone: true`, the original element stays in place while a copy follows the cursor.

### Drag Area Constraint

Restrict dragging to a specific region:

```typescript
import { Draggable } from '@syncfusion/ej2-base';

const draggable: Draggable = new Draggable(document.getElementById('draggable'), { 
    clone: false, 
    dragArea: "#droppable"  // Restrict to #droppable container
});
```

### Complete Draggable Example

```typescript
import { Draggable } from '@syncfusion/ej2-base';

// Draggable with clone and drag area constraints
const draggable: Draggable = new Draggable(document.getElementById('draggable'), { 
    clone: false, 
    dragArea: "#droppable" 
});
```

```html
<div id='container'>
  <div id='droppable' style='border: 2px dashed #ccc; padding: 20px; min-height: 200px;'>
    <p>Drag Area</p>
  </div>
  <div id='draggable' style='width: 100px; height: 100px; background-color: #4CAF50; cursor: move; margin-top: 10px;'>
    <p id='drag'>Draggable Element</p>
  </div>
</div>
```

---

## Droppable Configuration

A droppable zone accepts and responds to draggable elements:

```typescript
import { Draggable, Droppable, DropEventArgs } from '@syncfusion/ej2-base';

const draggable: Draggable = new Draggable(document.getElementById('draggable'), { 
    clone: false 
});

const droppable: Droppable = new Droppable(document.getElementById('droppable'), {
    drop: (e: DropEventArgs) => {
        // Handle drop event
        e.droppedElement.querySelector('#drag').textContent = 'Dropped Successfully!';
        console.log('Dropped element:', e.droppedElement);
        console.log('Target:', e.target);
    }
});
```

```html
<div id='container'>
  <div id='droppable' style='border: 2px solid #2196F3; padding: 20px; min-height: 200px; background-color: #E3F2FD;'>
    <p>Drop Zone</p>
  </div>
  <div id='draggable' style='width: 100px; height: 100px; background-color: #4CAF50; cursor: move; margin-top: 10px;'>
    <p id='drag'>Draggable</p>
  </div>
</div>
```

---

## Template Customization

Syncfusion JavaScript controls support three types of templates for rendering custom content. Templates allow you to control how data is displayed and add custom HTML elements, styles, and functionality.

### String Templates

String templates use JavaScript expressions enclosed in `${}` to bind data:

```typescript
import { Grid } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: [
    { OrderID: 10248, CustomerName: 'Paul Henriot', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'Karin Josephs', Freight: 11.61 }
  ],
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { 
      field: 'CustomerName', 
      headerText: 'Customer Name',
      template: '<div class="customer-badge">${CustomerName}</div>',
      width: 150
    },
    {
      field: 'Freight',
      headerText: 'Freight',
      template: '<span class="currency">$${Freight.toFixed(2)}</span>',
      width: 100
    }
  ]
});

grid.appendTo('#Grid');
```

### Script Templates

Script templates are HTML `<script>` tags with a custom type that define template HTML:

```html
<script id="gridTemplate" type="text/x-template">
  <div class="customer-template">
    <div class="customer-info">
      <strong>${CustomerName}</strong>
      <p>${City}, ${Country}</p>
    </div>
    <div class="customer-details">
      <span>Order: ${OrderID}</span>
      <span>Amount: $${Freight.toFixed(2)}</span>
    </div>
  </div>
</script>
```

TypeScript usage:

```typescript
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'CustomerName',
      headerText: 'Customer Details',
      template: '#gridTemplate',  // Reference script ID
      width: 300
    }
  ]
});

grid.appendTo('#Grid');
```

### Function Templates

Function templates provide a callback function that returns HTML:

```typescript
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'CustomerName',
      headerText: 'Customer',
      template: (props) => {
        return `<strong>${props.CustomerName}</strong>`;
      },
      width: 150
    },
    {
      field: 'Status',
      headerText: 'Status',
      template: (props) => {
        const statusClass = props.Status === 'Active' ? 'active' : 'inactive';
        return `<span class="badge ${statusClass}">${props.Status}</span>`;
      },
      width: 120
    }
  ]
});
```

---

## State Persistence

Automatically persist control state to browser localStorage across page refreshes:

### Enable State Persistence

```typescript
import { Grid, Page } from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Page);

let grid: Grid = new Grid({
    dataSource: data,
    enablePersistence: true,  // Enable persistence
    allowPaging: true,
    pageSettings: { pageSize: 6 },
    allowSorting: true,
    allowFiltering: true
});

grid.appendTo('#Grid');
```

### Managing Persisted Data

```typescript
// Clear persisted state for a control
localStorage.removeItem('grid');

// Disable persistence for a control
let grid: Grid = new Grid({
    dataSource: data,
    enablePersistence: false
});
```

---

## Security Best Practices

When working with Syncfusion JavaScript controls, follow secure coding practices to protect your application and user data.

> **Note:** For comprehensive security guidelines and best practices, please refer to the [Syncfusion Security Documentation](https://ej2.syncfusion.com/documentation/common/security).

