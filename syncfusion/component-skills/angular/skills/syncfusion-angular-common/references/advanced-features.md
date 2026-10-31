# Advanced Features and Utilities

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

## Animation Effects

The Animation utility creates smooth visual transitions for HTML elements. Syncfusion provides built-in animation effects that enhance user experience.

### Available Animation Effects

- **Fade:** `FadeIn`, `FadeOut`, `FadeZoomIn`, `FadeZoomOut`
- **Flip:** `FlipLeftDownIn`, `FlipLeftDownOut`, `FlipLeftUpIn`, `FlipLeftUpOut`, `FlipRightDownIn`, `FlipRightDownOut`, `FlipRightUpIn`, `FlipRightUpOut`, `FlipXDownIn`, `FlipXDownOut`, `FlipXUpIn`, `FlipXUpOut`, `FlipYLeftIn`, `FlipYLeftOut`, `FlipYRightIn`, `FlipYRightOut`
- **Slide:** `SlideBottomIn`, `SlideBottomOut`, `SlideDownIn`, `SlideDownOut`, `SlideLeftIn`, `SlideLeftOut`, `SlideRightIn`, `SlideRightOut`, `SlideTopIn`, `SlideTopOut`, `SlideUpIn`, `SlideUpOut`
- **Zoom:** `ZoomIn`, `ZoomOut`
- **None:** Disables animation

### Basic Animation Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { Animation } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-animation',
  template: `
    <div id="container">
      <div #element1 style="width: 100px; height: 100px; background-color: #4CAF50;"></div>
      <div #element2 style="width: 100px; height: 100px; background-color: #2196F3;"></div>
    </div>
  `
})
export class AnimationComponent {
  @ViewChild('element1') element1!: any;
  @ViewChild('element2') element2!: any;

  ngAfterViewInit() {
    const animation = new Animation();
    
    // Apply FadeOut to element1
    if (this.element1) {
      animation.animate(this.element1.nativeElement, { name: 'FadeOut' });
    }
    
    // Apply ZoomOut to element2
    if (this.element2) {
      animation.animate(this.element2.nativeElement, { name: 'ZoomOut' });
    }
  }
}
```

## Animation Timing

Control animation speed and timing with `duration` and `delay` properties:

- **duration:** Total time in milliseconds for animation to complete (default: 400ms)
- **delay:** Time in milliseconds before animation starts (default: 0ms)

```typescript
import { Component, ViewChild } from '@angular/core';
import { Animation } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-animation-timing',
  template: `
    <div id="container">
      <div #element1 style="width: 100px; height: 100px; background-color: #FF9800;"></div>
      <div #element2 style="width: 100px; height: 100px; background-color: #E91E63;"></div>
    </div>
  `
})
export class AnimationTimingComponent {
  @ViewChild('element1') element1!: any;
  @ViewChild('element2') element2!: any;

  ngAfterViewInit() {
    // Create animation with custom timing
    const animation = new Animation({ delay: 2000, duration: 5000 });
    
    if (this.element1) {
      animation.animate(this.element1.nativeElement, { name: 'FadeOut' });
    }
    
    if (this.element2) {
      animation.animate(this.element2.nativeElement, { name: 'ZoomOut' });
    }
  }
}
```

## Global Animation Control

Control animations for all Syncfusion components globally:

```typescript
import { GlobalAnimationMode, setGlobalAnimation } from "@syncfusion/ej2-base";

// Call in your application entry point before initializing components

// Enable animations globally (overrides component settings)
setGlobalAnimation(GlobalAnimationMode.Enable);

// Disable animations globally (overrides component settings)
setGlobalAnimation(GlobalAnimationMode.Disable);

// Use component's own animation settings (default)
setGlobalAnimation(GlobalAnimationMode.Default);
```

**Note:** The `setGlobalAnimation` method controls JavaScript-based animations through component APIs and the Animation library. It does not affect CSS-based animations or direct style-based animation properties.

## Drag and Drop

Implement custom drag-and-drop interactions using Draggable and Droppable utilities from `@syncfusion/ej2-base`.

### Draggable Utility

Transform any DOM element into a draggable item:

```typescript
import { Component, ViewChild } from '@angular/core';
import { Draggable } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-draggable',
  template: `
    <div id='container'>
      <div id='element' style="width: 100px; height: 100px; background-color: #4CAF50; cursor: move; padding: 10px;">
        <p>Draggable Element</p>
      </div>
    </div>
  `
})
export class DraggableComponent {
  ngAfterViewInit() {
    // Create draggable element
    const draggable = new Draggable(document.getElementById('element'), { clone: false });
  }
}
```

## Draggable Configuration

### Clone Option

Create a visual copy during drag operation:

```typescript
const draggable = new Draggable(document.getElementById('element'), { clone: true });
```

When `clone: true`, the original element stays in place while a copy follows the cursor.

### Drag Area Constraint

Restrict dragging to a specific region:

```typescript
const draggable = new Draggable(document.getElementById('draggable'), { 
  clone: false, 
  dragArea: "#droppable"  // Restrict to #droppable container
});
```

### Complete Draggable Example

```typescript
import { Component } from '@angular/core';
import { Draggable } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-draggable-config',
  template: `
    <div id='container'>
      <div id='droppable' style="border: 2px dashed #ccc; padding: 20px; min-height: 200px;">
        <p>Drag Area</p>
      </div>
      <div id='draggable' style="width: 100px; height: 100px; background-color: #4CAF50; cursor: move; margin-top: 10px;">
        <p id='drag'>Draggable Element</p>
      </div>
    </div>
  `
})
export class DraggableConfigComponent {
  ngAfterViewInit() {
    // Draggable with clone and drag area constraints
    const draggable = new Draggable(document.getElementById('draggable'), { 
      clone: false, 
      dragArea: "#droppable" 
    });
  }
}
```

## Droppable Configuration

A droppable zone accepts and responds to draggable elements:

```typescript
import { Component, ViewChild } from '@angular/core';
import { Draggable, Droppable, DropEventArgs } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-drag-drop',
  template: `
    <div id='container'>
      <div id='droppable' style="border: 2px solid #2196F3; padding: 20px; min-height: 200px; background-color: #E3F2FD;">
        <p>Drop Zone</p>
      </div>
      <div id='draggable' style="width: 100px; height: 100px; background-color: #4CAF50; cursor: move; margin-top: 10px;">
        <p id='drag'>Draggable</p>
      </div>
    </div>
  `
})
export class DragDropComponent {
  ngAfterViewInit() {
    const draggable = new Draggable(document.getElementById('draggable'), { clone: false });
    
    const droppable = new Droppable(document.getElementById('droppable'), {
      drop: (e: DropEventArgs) => {
        // Handle drop event
        e.droppedElement.querySelector('#drag').textContent = 'Dropped Successfully!';
        console.log('Dropped element:', e.droppedElement);
        console.log('Target:', e.target);
      }
    });
  }
}
```

## Template Customization

### ng-template Usage

Templates allow customizing component layouts with Angular templates:

```typescript
import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid-template',
  standalone: true,
  imports: [GridModule, ButtonModule, CommonModule],
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" width="100"></e-column>
        <e-column field="CustomerID" width="100"></e-column>
        <e-column field="ShipCountry" width="100">
          <ng-template #template let-data>
            <div class="custom">
              <button ejs-button>{{ data.ShipCountry }}</button>
            </div>
          </ng-template>
        </e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridTemplateComponent {
  data = [
    { OrderID: 10248, CustomerID: 'VINET', ShipCountry: 'France' },
    { OrderID: 10249, CustomerID: 'TOMSP', ShipCountry: 'Germany' },
    { OrderID: 10250, CustomerID: 'HANAR', ShipCountry: 'Brazil' }
  ];
}
```

## State Persistence

Automatically persist component state to browser localStorage across page refreshes:

```typescript
import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-persistent-grid',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid 
      [dataSource]="data"
      [enablePersistence]="true"
      [allowPaging]="true"
      [pageSettings]="pageSettings"
    >
      <!-- Grid content -->
    </ejs-grid>
  `
})
export class PersistentGridComponent {
  data = [
    { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, ShipCountry: 'France', Freight: 32.38 }
  ];
  
  pageSettings = { pageSize: 6 };
}
```

### Managing Persisted Data

```typescript
// Clear persisted state for a component
localStorage.removeItem('grid-state-key');

// Disable persistence
<ejs-grid [enablePersistence]="false" ... />
```

## Security Best Practices

When working with Syncfusion Angular components, follow secure coding practices to protect your application and user data.

> **Note:** For comprehensive security guidelines and best practices, please refer to the [Syncfusion Security Documentation](https://ej2.syncfusion.com/angular/documentation/common/security).
