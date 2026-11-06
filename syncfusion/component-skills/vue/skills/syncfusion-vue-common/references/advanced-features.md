# Advanced Features

Complete guide for implementing advanced cross-component features in Syncfusion Vue applications.

## Table of Contents
- [Animation Effects](#animation-effects)
- [Animation Timing](#animation-timing)
- [Global Animation Control](#global-animation-control)
- [Drag and Drop](#drag-and-drop)
- [Draggable Configuration](#draggable-configuration)
- [Droppable Configuration](#droppable-configuration)
- [Templates Customization](#templates-customization)
- [State Persistence](#state-persistence)
- [Security Best Practices](#security-best-practices)

---

## Animation Effects

The Animation utility creates smooth visual transitions for HTML elements. Syncfusion provides built-in animation effects that enhance user experience.

| Effect | Description |
|--------|-------------|
| **FadeIn** | Gradually increases opacity from 0 to 1 |
| **FadeOut** | Gradually decreases opacity from 1 to 0 |
| **FadeZoomIn** | Combines fade and zoom in |
| **FadeZoomOut** | Combines fade and zoom out |
| **SlideDown** | Slides element down |
| **SlideUp** | Slides element up |
| **SlideLeft** | Slides element left |
| **SlideRight** | Slides element right |
| **ZoomIn** | Zooms element in (scale up) |
| **ZoomOut** | Zooms element out (scale down) |
| **None** | No animation |

### Basic Animation Example

```vue
<template>
  <div id="container">
    <div ref="element1" style="width: 100px; height: 100px; background-color: #4CAF50;"></div>
    <div ref="element2" style="width: 100px; height: 100px; background-color: #2196F3;"></div>
  </div>
</template>

<script>
import { Animation } from '@syncfusion/ej2-base';

export default {
  mounted() {
    const animation = new Animation();
    
    // Apply FadeOut to element1
    animation.animate(this.$refs.element1, { name: 'FadeOut' });
    
    // Apply ZoomOut to element2
    animation.animate(this.$refs.element2, { name: 'ZoomOut' });
  }
};
</script>
```

## Animation Timing

Control animation speed and timing with `duration` and `delay` properties:

- **duration:** Total time in milliseconds for animation to complete (default: 400ms)
- **delay:** Time in milliseconds before animation starts (default: 0ms)

```vue
<template>
  <div id="container">
    <div ref="element1" style="width: 100px; height: 100px; background-color: #FF9800;"></div>
    <div ref="element2" style="width: 100px; height: 100px; background-color: #E91E63;"></div>
  </div>
</template>

<script>
import { Animation } from '@syncfusion/ej2-base';

export default {
  mounted() {
    // Create animation with custom timing
    const animation = new Animation({ delay: 2000, duration: 5000 });
    
    animation.animate(this.$refs.element1, { name: 'FadeOut' });
    animation.animate(this.$refs.element2, { name: 'ZoomOut' });
  }
};
</script>
```

## Global Animation Control

Control animations for all Syncfusion components globally:

```javascript
import { GlobalAnimationMode, setGlobalAnimation } from "@syncfusion/ej2-base";

// Call in your application entry point before initializing components

// Enable animations globally (overrides component settings)
setGlobalAnimation(GlobalAnimationMode.Enable);

// Disable animations globally (overrides component settings)
setGlobalAnimation(GlobalAnimationMode.Disable);

// Use component's own animation settings (default)
setGlobalAnimation(GlobalAnimationMode.Default);
```

**Note:** The `setGlobalAnimation` method controls JavaScript-based animations through component APIs and the Animation library. It does not affect CSS-based animations or direct style-based animation properties

---

## Drag and Drop

Implement custom drag-and-drop interactions using Draggable and Droppable utilities from `@syncfusion/ej2-base`.

### Draggable Utility

Transform any DOM element into a draggable item:

```vue
<template>
  <div id="container">
    <div ref="element" style="width: 100px; height: 100px; background-color: #4CAF50; cursor: move; padding: 10px;">
      <p>Draggable Element</p>
    </div>
  </div>
</template>

<script>
import { Draggable } from '@syncfusion/ej2-base';

export default {
  mounted() {
    // Create draggable element
    new Draggable(this.$refs.element, { clone: false });
  }
};
</script>
```

## Draggable Configuration

### Clone Option

Create a visual copy during drag operation:

```javascript
const draggable = new Draggable(document.getElementById('element'), { clone: true });
```

When `clone: true`, the original element stays in place while a copy follows the cursor.

### Drag Area Constraint

Restrict dragging to a specific region:

```javascript
const draggable = new Draggable(document.getElementById('draggable'), { 
  clone: false, 
  dragArea: "#droppable"  // Restrict to #droppable container
});
```

### Complete Draggable Example

```vue
<template>
  <div id="container">
    <div ref="droppable" style="border: 2px dashed #ccc; padding: 20px; min-height: 200px;">
      <p>Drag Area</p>
    </div>
    <div ref="draggable" style="width: 100px; height: 100px; background-color: #4CAF50; cursor: move; margin-top: 10px;">
      <p id="drag">Draggable Element</p>
    </div>
  </div>
</template>

<script>
import { Draggable } from '@syncfusion/ej2-base';

export default {
  mounted() {
    // Draggable with clone and drag area constraints
    new Draggable(this.$refs.draggable, { 
      clone: false, 
      dragArea: this.$refs.droppable
    });
  }
};
</script>
```

## Droppable Configuration

A droppable zone accepts and responds to draggable elements:

```vue
<template>
  <div id="container">
    <div ref="droppable" style="border: 2px solid #2196F3; padding: 20px; min-height: 200px; background-color: #E3F2FD;">
      <p>Drop Zone</p>
    </div>
    <div ref="draggable" style="width: 100px; height: 100px; background-color: #4CAF50; cursor: move; margin-top: 10px;">
      <p id="drag">Draggable</p>
    </div>
  </div>
</template>

<script>
import { Draggable, Droppable } from '@syncfusion/ej2-base';

export default {
  mounted() {
    new Draggable(this.$refs.draggable, { clone: false });
    
    new Droppable(this.$refs.droppable, {
      drop: (e) => {
        // Handle drop event
        e.droppedElement.querySelector('#drag').textContent = 'Dropped Successfully!';
        console.log('Dropped element:', e.droppedElement);
        console.log('Target:', e.target);
      }
    });
  }
};
</script>
```

## Templates Customization

Customize component rendering using Vue's slot system.

### Slot Templates

**Basic Template Example:**

```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="Price" headerText="Price" width="150" :template="'priceTemplate'">
        <template v-slot:priceTemplate="{data}">
          <div class="price-cell">
            <span class="currency">$</span>
            <span class="amount">{{ data.Price.toFixed(2) }}</span>
            <span v-if="data.Price > 1000" class="badge">Premium</span>
          </div>
        </template>
      </e-column>
    </e-columns>
  </ejs-grid>
</template>

<style>
.price-cell {
  display: flex;
  align-items: center;
  gap: 5px;
}
.badge {
  background: gold;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
}
</style>
```

---

---

## State Persistence

Automatically persist component state to browser localStorage across page refreshes:

```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enablePersistence="true"
    id="myGrid"
    :allowSorting="true"
    :allowFiltering="true"
    :allowPaging="true"
  >
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn, Sort, Filter, Page } from '@syncfusion/ej2-vue-grids';
import { provide } from 'vue';

provide('grid', [Sort, Filter, Page]);

const data = [
  { OrderID: 10248, CustomerID: 'VINET' },
  { OrderID: 10249, CustomerID: 'TOMSP' }
];
</script>
```
---

### Managing Persisted Data

```javascript
// Clear persisted state for a component
localStorage.removeItem('grid-state-key');

// Disable persistence
<template>
  <ejs-grid :enablePersistence="false"></ejs-grid>
</template>
```

---

## Security Best Practices

When working with Syncfusion Vue components, follow secure coding practices to protect your application and user data.

> **Note:** For comprehensive security guidelines and best practices, please refer to the [Syncfusion Security Documentation](https://ej2.syncfusion.com/vue/documentation/common/security).
