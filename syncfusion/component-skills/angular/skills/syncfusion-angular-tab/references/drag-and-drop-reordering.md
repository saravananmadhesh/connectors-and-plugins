# Drag and Drop Reordering in Angular Tab Component

## Table of Contents
1. [Enable Drag and Drop](#enable-drag-and-drop)
2. [Drag Area Configuration](#drag-area-configuration)
3. [Drag and Drop Events](#drag-and-drop-events)
4. [Prevent Dragging or Dropping](#prevent-dragging-or-dropping)
5. [Reorder Active Tab](#reorder-active-tab)
6. [Drag Between Multiple Tabs](#drag-between-multiple-tabs)
7. [Drag to External Components](#drag-to-external-components)

---

## Enable Drag and Drop

The Tab component provides built-in drag and drop functionality to reorder tab items dynamically. Enable this feature using the [`allowDragAndDrop`](https://ej2.syncfusion.com/angular/documentation/api/tab/#allowdraganddrop) property.

**Property:** `allowDragAndDrop`
- **Type:** boolean
- **Default:** false
- **Description:** Enables users to drag and drop tab items within the component

### Basic Example

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab id="draggableTab" [allowDragAndDrop]="true">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Tab 1' },
    { text: 'Tab 2' },
    { text: 'Tab 3' }
  ];

  public content0 = 'First tab content - drag to reorder';
  public content1 = 'Second tab content - drag to reorder';
  public content2 = 'Third tab content - drag to reorder';
}
```

**Result:** Users can now drag tab headers to reorder them. The tab order updates dynamically.

---

## Drag Area Configuration

Use the [`dragArea`](https://ej2.syncfusion.com/angular/documentation/api/tab/#dragArea) property to define the boundary within which tabs can be dragged. This prevents tabs from being moved outside the defined area.

**Property:** `dragArea`
- **Type:** string
- **Default:** null (entire document)
- **Description:** CSS selector for the drag boundary container

### Example with Drag Area

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="tabcontainer">
      <ejs-tab 
        id="draggableTab" 
        [allowDragAndDrop]="true"
        dragArea="#tabcontainer">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
          <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
          <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
          <e-tabitem [header]="headerText[3]" [content]="content3"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `,
  styles: [`
    #tabcontainer {
      padding: 20px;
      border: 2px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'India' },
    { text: 'Australia' },
    { text: 'USA' },
    { text: 'France' }
  ];

  public content0 = 'India officially the Republic of India, is a country in South Asia...';
  public content1 = 'Australia, officially the Commonwealth of Australia, is a country...';
  public content2 = 'The United States of America (USA or U.S.A.)...';
  public content3 = 'France, officially the French Republic...';
}
```

**Result:** Tab items can only be dragged within the `#tabcontainer` div. If dragged outside, the drag is cancelled.

---

## Drag and Drop Events

The Tab component provides three events in the drag and drop lifecycle:

| Event | Type | Description | Cancellable |
|-------|------|-------------|------------|
| [`onDragStart`](https://ej2.syncfusion.com/angular/documentation/api/tab/#ondragstart) | `DragEventArgs` | Fires before dragging begins | Yes |
| [`dragging`](https://ej2.syncfusion.com/angular/documentation/api/tab/#dragging) | `DragEventArgs` | Fires while dragging is in progress | No |
| [`dragged`](https://ej2.syncfusion.com/angular/documentation/api/tab/#dragged) | `DragEventArgs` | Fires after drop is completed | Yes |

### Event Sequence Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent, DragEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p>Log: {{ dragLog }}</p>
      <ejs-tab 
        id="draggableTab" 
        [allowDragAndDrop]="true"
        (onDragStart)="onDragStart($event)"
        (dragging)="onDragging($event)"
        (dragged)="onDragged($event)">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
          <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  public dragLog = '';

  public headerText: object[] = [
    { text: 'Tab 1' },
    { text: 'Tab 2' }
  ];

  public content0 = 'First tab content';
  public content1 = 'Second tab content';

  onDragStart(args: DragEventArgs): void {
    this.dragLog = `Started dragging from index: ${args.index}`;
  }

  onDragging(args: DragEventArgs): void {
    // Update UI during drag (avoid expensive operations here)
  }

  onDragged(args: DragEventArgs): void {
    this.dragLog = `Dropped at new position. Cancel: ${args.cancel}`;
  }
}
```

---

## Prevent Dragging or Dropping

Use the `onDragStart` and `dragged` events to prevent dragging specific tabs or dropping at certain locations.

### Prevent Dragging Specific Tabs

```typescript
import { Component } from '@angular/core';
import { TabModule, DragEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="draggableTab" 
      [allowDragAndDrop]="true"
      (onDragStart)="onDragStart($event)">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Important' },
    { text: 'Tab 2' },
    { text: 'Tab 3' }
  ];

  public content0 = 'This tab cannot be moved';
  public content1 = 'This tab can be moved';
  public content2 = 'This tab can be moved';

  onDragStart(args: DragEventArgs): void {
    // Prevent dragging the first tab (index 0)
    if (args.index === 0) {
      args.cancel = true;
      console.log('Dragging disabled for Important tab');
    }
  }
}
```

### Prevent Dropping at Specific Positions

```typescript
import { Component } from '@angular/core';
import { TabModule, DragEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="draggableTab" 
      [allowDragAndDrop]="true"
      (dragged)="onDragged($event)">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'First' },
    { text: 'Second' },
    { text: 'Third' }
  ];

  public content0 = 'First tab content';
  public content1 = 'Second tab content';
  public content2 = 'Third tab content';

  onDragged(args: DragEventArgs): void {
    // Prevent dropping as first tab
    if (args.index === 0) {
      args.cancel = true;
      console.log('Cannot drop as first tab');
    }
  }
}
```

---

## Reorder Active Tab

Use the [`reorderActiveTab`](https://ej2.syncfusion.com/angular/documentation/api/tab/#reorderActiveTab) property to control whether the active tab is reordered when selected from the overflow popup.

**Property:** `reorderActiveTab`
- **Type:** boolean
- **Default:** true
- **Description:** When true, active tab moves to the front when selected from popup overflow
- **Use Case:** When overflow mode is "Popup", prevents active tab from being repositioned

### Example with Overflow Mode

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="element"
      overflowMode="Popup"
      heightAdjustMode="Auto"
      [reorderActiveTab]="false">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
        <e-tabitem [header]="headerText[3]" [content]="content3"></e-tabitem>
        <e-tabitem [header]="headerText[4]" [content]="content4"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `,
  styles: [`
    :host ::ng-deep .e-tab {
      width: 300px;
    }
  `]
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Home' },
    { text: 'About' },
    { text: 'Services' },
    { text: 'Contact' },
    { text: 'FAQ' }
  ];

  public content0 = 'Home content';
  public content1 = 'About content';
  public content2 = 'Services content';
  public content3 = 'Contact content';
  public content4 = 'FAQ content';
}
```

**Behavior Difference:**
- **`reorderActiveTab = true` (default):** When you select a tab from the popup, it moves to the visible area
- **`reorderActiveTab = false`:** When you select a tab from the popup, it remains in the popup (active state shown in popup)

---

## Drag Between Multiple Tabs

Allow users to drag tab items between two separate Tab components. This requires manual implementation using `addTab()` and `removeTab()` methods.

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent, DragEventArgs, TabItemModel, HeaderModel } from '@syncfusion/ej2-angular-navigations';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="tabparent">
      <h3>Tab 1 (Drag items from here)</h3>
      <ejs-tab 
        #firstTabObj 
        id="firstTab" 
        heightAdjustMode="Auto" 
        [allowDragAndDrop]="true"
        dragArea="#tabparent"
        (onDragStart)="firstTabDragStart($event)"
        (dragged)="firstTabDragStop($event)">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
          <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
          <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
        </e-tabitems>
      </ejs-tab>

      <h3 style="margin-top: 30px;">Tab 2 (Drag items to here)</h3>
      <ejs-tab 
        #secondTabObj 
        id="secondTab" 
        heightAdjustMode="Auto" 
        [allowDragAndDrop]="true"
        dragArea="#tabparent"
        (onDragStart)="secondTabDragStart($event)"
        (dragged)="secondTabDragStop($event)">
        <e-tabitems>
          <e-tabitem [header]="headerText[3]" [content]="content3"></e-tabitem>
          <e-tabitem [header]="headerText[4]" [content]="content4"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `,
  styles: [`
    #tabparent {
      padding: 20px;
      border: 2px dashed #ccc;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  @ViewChild('firstTabObj') firstTabObj?: TabComponent;
  @ViewChild('secondTabObj') secondTabObj?: TabComponent;

  public headerText: object[] = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' },
    { text: 'Item 5' }
  ];

  public content0 = 'Content for Item 1';
  public content1 = 'Content for Item 2';
  public content2 = 'Content for Item 3';
  public content3 = 'Content for Item 4';
  public content4 = 'Content for Item 5';

  private dragItemIndex?: number;
  private dragItemContainer?: HTMLElement;
  private draggedItems: TabItemModel[] = [];

  firstTabDragStart(args: DragEventArgs): void {
    // Store dragged item for later removal
    this.draggedItems = [(this.firstTabObj as TabComponent).items[args.index]];
    args.draggedItem.style.visibility = 'hidden';
    this.dragItemContainer = args.draggedItem.closest('.e-tab') as HTMLElement;
  }

  firstTabDragStop(args: DragEventArgs): void {
    if (!isNullOrUndefined((args.target as HTMLElement).closest('.e-tab')) &&
        !(this.dragItemContainer as HTMLElement).isSameNode(args.target.closest('.e-tab'))) {
      args.cancel = true;

      const tabElement = args.target.closest('.e-tab') as HTMLElement;
      const dropItem = args.target.closest('.e-toolbar-item') as HTMLElement;

      if (tabElement && dropItem) {
        // Calculate drop index
        const toolbarItems = Array.from(
          (this.secondTabObj as TabComponent).element.querySelector('.e-toolbar-items')?.children || []
        ).filter(el => el.classList.contains('e-toolbar-item'));
        const dropItemIndex = toolbarItems.indexOf(dropItem);

        // Add to second tab
        (this.secondTabObj as TabComponent).addTab(this.draggedItems, dropItemIndex);

        // Remove from first tab
        const firstToolbarItems = Array.from(
          (this.firstTabObj as TabComponent).element.querySelector('.e-toolbar-items')?.children || []
        ).filter(el => el.classList.contains('e-toolbar-item'));
        const dragIndex = firstToolbarItems.indexOf(args.draggedItem);
        (this.firstTabObj as TabComponent).removeTab(dragIndex);
      }
    }
    args.draggedItem.style.visibility = 'visible';
  }

  secondTabDragStart(args: DragEventArgs): void {
    this.draggedItems = [(this.secondTabObj as TabComponent).items[args.index]];
    args.draggedItem.style.visibility = 'hidden';
    this.dragItemContainer = args.draggedItem.closest('.e-tab') as HTMLElement;
  }

  secondTabDragStop(args: DragEventArgs): void {
    if (!isNullOrUndefined((args.target as HTMLElement).closest('.e-tab')) &&
        !(this.dragItemContainer as HTMLElement).isSameNode(args.target.closest('.e-tab'))) {
      args.cancel = true;

      const tabElement = args.target.closest('.e-tab') as HTMLElement;
      const dropItem = args.target.closest('.e-toolbar-item') as HTMLElement;

      if (tabElement && dropItem) {
        const toolbarItems = Array.from(
          (this.firstTabObj as TabComponent).element.querySelector('.e-toolbar-items')?.children || []
        ).filter(el => el.classList.contains('e-toolbar-item'));
        const dropItemIndex = toolbarItems.indexOf(dropItem);

        (this.firstTabObj as TabComponent).addTab(this.draggedItems, dropItemIndex);

        const secondToolbarItems = Array.from(
          (this.secondTabObj as TabComponent).element.querySelector('.e-toolbar-items')?.children || []
        ).filter(el => el.classList.contains('e-toolbar-item'));
        const dragIndex = secondToolbarItems.indexOf(args.draggedItem);
        (this.secondTabObj as TabComponent).removeTab(dragIndex);
      }
    }
    args.draggedItem.style.visibility = 'visible';
  }
}
```

---

## Drag to External Components

Tab items can be dragged to external components like TreeView by using the `dragged` event and component methods.

**Key Concepts:**
- Use the `dragged` event to detect drop on external element
- Cancel the default Tab drag behavior with `args.cancel = true`
- Use target component's add/remove methods (e.g., `treeView.addNodes()`, `tab.removeTab()`)

### Example: Drag to TreeView

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent, DragEventArgs, TabItemModel } from '@syncfusion/ej2-angular-navigations';
import { TreeViewModule, TreeViewComponent, HeaderModel } from '@syncfusion/ej2-angular-navigations';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
  imports: [TabModule, TreeViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="tabparent">
      <h3>Drag tabs to TreeView below</h3>
      <ejs-tab 
        #tabObj 
        id="draggableTab" 
        heightAdjustMode="Auto" 
        [allowDragAndDrop]="true"
        dragArea="#tabparent"
        (created)="onTabCreate()"
        (dragged)="tabDragStop($event)">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
          <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
          <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
        </e-tabitems>
      </ejs-tab>

      <h3 style="margin-top: 20px;">TreeView (Drop target)</h3>
      <ejs-treeview 
        #treeObj 
        id="draggableTreeview"
        [fields]="field"
        cssClass="treeview-external-drop">
      </ejs-treeview>
    </div>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  @ViewChild('treeObj') treeObj?: TreeViewComponent;

  public headerText: object[] = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' }
  ];

  public content0 = 'Drag me to TreeView';
  public content1 = 'Drag me to TreeView';
  public content2 = 'Drag me to TreeView';

  public field: object = {
    dataSource: [
      { text: 'DroppedItems', id: 'parent', expanded: true }
    ],
    id: 'id',
    text: 'text',
    child: 'child'
  };

  private nodeCounter = 0;

  onTabCreate(): void {
    const tabElement = document.getElementById('draggableTab');
    if (!isNullOrUndefined(tabElement)) {
      (this.tabObj as TabComponent).element.children[0].classList.add('e-droppable');
    }
  }

  tabDragStop(args: DragEventArgs): void {
    const toolbarItems = Array.from(
      (this.tabObj as TabComponent).element.querySelector('.e-toolbar-items')?.children || []
    ).filter(el => el.classList.contains('e-toolbar-item'));

    const dragTabIndex = toolbarItems.indexOf(args.draggedItem);
    const dragItem = (this.tabObj as TabComponent).items[dragTabIndex];

    const dropNode = (args.target as HTMLElement).closest('#draggableTreeview .e-list-item');

    if (dropNode && !(args.target as HTMLElement).closest('#draggableTab .e-toolbar-item')) {
      args.cancel = true;

      // Create new TreeView node from Tab item
      const newNode = [{
        id: `node_${this.nodeCounter++}`,
        text: (dragItem.header as HeaderModel).text as string
      }];

      // Remove from Tab
      (this.tabObj as TabComponent).removeTab(dragTabIndex);

      // Add to TreeView
      (this.treeObj as TreeViewComponent).addNodes(newNode, 'parent');
    }
  }
}
```

---

## Best Practices

✅ **Do:**
- Set appropriate `dragArea` to constrain drag operations
- Provide visual feedback during drag operations
- Use `onDragStart` to validate which tabs can be dragged
- Clean up visibility styles after drag completion

❌ **Don't:**
- Leave hidden tabs invisible after failed drag operations
- Perform expensive operations in the `dragging` event (fired continuously)
- Allow dragging tabs outside the intended container without validation
- Create duplicate tabs when transferring between containers

---

## Related Properties

| Property | Type | Purpose |
|----------|------|---------|
| `allowDragAndDrop` | boolean | Enable/disable drag-drop |
| `dragArea` | string | CSS selector for drag boundary |
| `reorderActiveTab` | boolean | Reorder active tab from popup |
| `items` | TabItemModel[] | Tab collection |

## Related Events

| Event | Fires | Cancellable | Use For |
|-------|-------|-----------|---------|
| `onDragStart` | Before drag begins | Yes | Prevent specific tabs from dragging |
| `dragging` | During drag | No | Visual feedback (avoid expensive ops) |
| `dragged` | After drop | Yes | Custom drop logic or validation |
