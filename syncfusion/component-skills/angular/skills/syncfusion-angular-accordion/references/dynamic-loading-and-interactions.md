# Dynamic Loading and Interactions in Angular Accordion

## Table of Contents
- [Dynamic Item Loading](#dynamic-item-loading)
- [Methods API Reference](#methods-api-reference)
- [Event Handlers](#event-handlers)
- [Event Arguments Reference](#event-arguments-reference)
- [Programmatic Expand/Collapse](#programmatic-expandcollapse)
- [Disabling Items](#disabling-items)
- [Visibility Control (hideItem)](#visibility-control-hideitem)
- [Focus Management (select)](#focus-management-select)
- [Cleanup (destroy)](#cleanup-destroy)
- [Checkbox Integration](#checkbox-integration)
- [AJAX Content Loading](#ajax-content-loading)
- [Content Projection with ng-content](#content-projection-with-ng-content)
- [Always-Open Accordion Items](#always-open-accordion-items)
- [Progressive Content Loading](#progressive-content-loading)

## Dynamic Item Loading

### Adding Items at Runtime

Use the `addItem()` method to add items after the accordion is initialized:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <button (click)="addNewItem()">Add New Item</button>
    <ejs-accordion #accordion [items]="items"></ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Item 1', content: 'Content 1', expanded: true },
    { header: 'Item 2', content: 'Content 2' }
  ];

  addNewItem() {
    const newItem = {
      header: `Item ${this.items.length + 1}`,
      content: `Content ${this.items.length + 1}`
    };

    // Add item at the end
    if (this.accordionObj) {
      this.accordionObj.addItem(newItem);
    }
  }
}
```

### Adding Items at Specific Index

```typescript
addItemAtPosition(index: number) {
  const newItem = {
    header: 'Inserted Item',
    content: 'This item was inserted at position ' + index
  };

  // Add item at specific index
  if (this.accordionObj) {
    this.accordionObj.addItem(newItem, index);
  }
}
```

### Removing Items

```typescript
removeItem(index: number) {
  if (this.accordionObj) {
    this.accordionObj.removeItem(index);
  }
}

// Remove first item
removeFirstItem() {
  this.removeItem(0);
}

// Remove last item
removeLastItem() {
  if (this.accordionObj) {
    const lastIndex = (this.accordionObj.items || []).length - 1;
    this.removeItem(lastIndex);
  }
}
```

## Methods API Reference

All accordion methods are accessed through the template reference variable `#accordion` using `@ViewChild`:

### `addItem()` Method
**Signature:** `addItem(item: AccordionItemModel | AccordionItemModel[] | Object | Object[], index?: number): void`

Adds one or more items to the accordion. If index is provided, items are inserted at that position; otherwise, they are appended.

**Parameters:**
- `item` - Single or array of `AccordionItemModel` objects to add
- `index` (optional) - Zero-based index where items should be inserted

**Examples:**

```typescript
// Add single item at end
this.accordionObj?.addItem({ header: 'New Item', content: 'Content' });

// Add single item at index 1
this.accordionObj?.addItem({ header: 'New Item', content: 'Content' }, 1);

// Add multiple items at end
this.accordionObj?.addItem([
  { header: 'Item 1', content: 'Content 1' },
  { header: 'Item 2', content: 'Content 2' }
]);

// Add multiple items at index 0
this.accordionObj?.addItem([
  { header: 'First', content: 'Content' },
  { header: 'Second', content: 'Content' }
], 0);
```

### `removeItem()` Method
**Signature:** `removeItem(index: number): void`

Removes an item at the specified index.

**Parameters:**
- `index` - Zero-based index of item to remove

**Examples:**

```typescript
// Remove first item
this.accordionObj?.removeItem(0);

// Remove last item
const lastIndex = (this.accordionObj?.items?.length || 0) - 1;
this.accordionObj?.removeItem(lastIndex);

// Remove with edge case handling
removeItemSafely(index: number) {
  if (this.accordionObj && index >= 0 && index < (this.accordionObj.items?.length || 0)) {
    this.accordionObj.removeItem(index);
  }
}
```

### `expandItem()` Method
**Signature:** `expandItem(isExpand: boolean, index?: number): void`

Expands or collapses items. Behavior depends on expand mode and whether index is provided.

**Parameters:**
- `isExpand` - `true` to expand, `false` to collapse
- `index` (optional) - Zero-based index of specific item (in Multiple mode, omit to expand/collapse all)

**Examples:**

```typescript
// Expand specific item
this.accordionObj?.expandItem(true, 0);

// Collapse specific item
this.accordionObj?.expandItem(false, 0);

// In Multiple mode: expand all items
this.accordionObj?.expandItem(true);

// In Multiple mode: collapse all items
this.accordionObj?.expandItem(false);

// Edge case: index out of range
expandItemSafely(index: number) {
  if (this.accordionObj && index >= 0 && index < (this.accordionObj.items?.length || 0)) {
    this.accordionObj.expandItem(true, index);
  }
}
```

### `enableItem()` Method
**Signature:** `enableItem(index: number, isEnable: boolean): void`

Enables or disables an accordion item, controlling whether it can be expanded.

**Parameters:**
- `index` - Zero-based index of item
- `isEnable` - `true` to enable (make clickable), `false` to disable (prevent interaction)

**Examples:**

```typescript
// Enable item at index 1
this.accordionObj?.enableItem(1, true);

// Disable item at index 2
this.accordionObj?.enableItem(2, false);

// Toggle item enabled state
toggleItemState(index: number) {
  if (this.accordionObj?.items?.[index]) {
    const isCurrentlyEnabled = !this.accordionObj.items[index].disabled;
    this.accordionObj.enableItem(index, !isCurrentlyEnabled);
  }
}

// Disable all items except first
disableAllButFirst() {
  const itemCount = this.accordionObj?.items?.length || 0;
  for (let i = 1; i < itemCount; i++) {
    this.accordionObj?.enableItem(i, false);
  }
}
```

### `hideItem()` Method
**Signature:** `hideItem(index: number, isHidden?: boolean): void`

Shows or hides an accordion item without removing it.

**Parameters:**
- `index` - Zero-based index of item
- `isHidden` (optional) - `true` to hide, `false` to show (default: false)

**Examples:**

```typescript
// Hide item at index 2
this.accordionObj?.hideItem(2, true);

// Show item at index 2
this.accordionObj?.hideItem(2, false);

// Toggle visibility
toggleItemVisibility(index: number) {
  if (this.accordionObj?.items?.[index]) {
    const isCurrentlyVisible = !this.accordionObj.items[index].visible;
    this.accordionObj.hideItem(index, isCurrentlyVisible);
  }
}

// Hide items matching condition
hideItemsByHeader(searchText: string) {
  this.accordionObj?.items?.forEach((item, index) => {
    if (item.header?.includes(searchText)) {
      this.accordionObj?.hideItem(index, true);
    }
  });
}
```

### `select()` Method
**Signature:** `select(index: number): void`

Sets focus to the specified item's header (useful for keyboard navigation and accessibility).

**Parameters:**
- `index` - Zero-based index of item to focus

**Examples:**

```typescript
// Focus first item
this.accordionObj?.select(0);

// Focus next item
focusNextItem() {
  // Logic to determine current focused index...
  this.accordionObj?.select(currentIndex + 1);
}

// Focus item by condition
focusItemByHeader(headerText: string) {
  const index = this.accordionObj?.items?.findIndex(item => item.header === headerText);
  if (index !== -1 && index !== undefined) {
    this.accordionObj?.select(index);
  }
}

// Keyboard navigation pattern
handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    // Focus next item
    this.accordionObj?.select((this.currentFocusIndex || 0) + 1);
  } else if (event.key === 'ArrowUp') {
    // Focus previous item
    this.accordionObj?.select(Math.max(0, (this.currentFocusIndex || 1) - 1));
  }
}
```

### `destroy()` Method
**Signature:** `destroy(): void`

Destroys the accordion component, removing it from the DOM and cleaning up all event listeners and resources.

**Examples:**

```typescript
// Destroy accordion when component is destroyed
ngOnDestroy() {
  if (this.accordionObj) {
    this.accordionObj.destroy();
  }
}

// Destroy accordion on button click
destroyAccordion() {
  if (this.accordionObj) {
    this.accordionObj.destroy();
    this.accordionObj = undefined;
    console.log('Accordion destroyed');
  }
}

// Conditional cleanup
cleanupWithLogging() {
  if (this.accordionObj) {
    console.log('Destroying accordion with', this.accordionObj.items?.length, 'items');
    this.accordionObj.destroy();
  }
}
```

## Event Handlers

### Expanding Event

Triggered when an item begins to expand. Use for validation, preventing expansion, or loading content:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { ExpandEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion #accordion (expanding)="onExpanding($event)">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>Item 1</ng-template>
          <ng-template #content>Content 1</ng-template>
        </e-accordionitem>
        <e-accordionitem>
          <ng-template #header>Item 2</ng-template>
          <ng-template #content>Content 2</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  onExpanding(event: ExpandEventArgs) {
    console.log('Expanding item:', event.item);
    
    // Example: Prevent expansion if condition not met
    if (event.item.header === 'Item 1') {
      // event.cancel = true;  // Uncomment to prevent expansion
    }
  }
}
```

### Expanded Event

Triggered after an item has finished expanding:

```typescript
onExpanded(event: ExpandEventArgs) {
  console.log('Item expanded:', event.item);
  // Load content or perform initialization here
}
```

### Collapsing and Collapsed Events

```typescript
onCollapsing(event: ExpandEventArgs) {
  console.log('Item about to collapse');
  // Prevent collapse if needed
  // event.cancel = true;
}

onCollapsed(event: ExpandEventArgs) {
  console.log('Item collapsed');
  // Cleanup or state management
}
```

### Click Event

Triggered when any header or content is clicked:

```typescript
onClick(event: any) {
  console.log('Clicked:', event);
  console.log('Item:', event.item);
  console.log('Original event:', event.originalEvent);
}
```

### Full Event Handler Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { ExpandEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion 
      #accordion
      (expanding)="onExpanding($event)"
      (expanded)="onExpanded($event)"
      (collapsing)="onCollapsing($event)"
      (collapsed)="onCollapsed($event)"
      (clicked)="onClick($event)">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>Track Events</ng-template>
          <ng-template #content>Watch console for events</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  onExpanding(event: ExpandEventArgs) { console.log('expanding'); }
  onExpanded(event: ExpandEventArgs) { console.log('expanded'); }
  onCollapsing(event: ExpandEventArgs) { console.log('collapsing'); }
  onCollapsed(event: ExpandEventArgs) { console.log('collapsed'); }
  onClick(event: any) { console.log('clicked'); }
}
```

## Event Arguments Reference

### `ExpandEventArgs` Interface

Used by `expanding` and `expanded` events. Provides access to the item being expanded/collapsed.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to prevent the expand/collapse action (only in `expanding` event) |
| `content` | `HTMLElement` | The DOM element containing the item's content |
| `element` | `HTMLElement` | The DOM element of the accordion item |
| `index` | `number` | Zero-based index of the item |
| `isExpanded` | `boolean` | Current expand state: `true` if expanding, `false` if collapsing |
| `item` | `AccordionItemModel` | The item object being affected |
| `name` | `string` | Event name ('expanding' or 'expanded') |

**Usage Example:**
```typescript
onExpanding(event: ExpandEventArgs) {
  console.log(`Item at index ${event.index} is ${event.isExpanded ? 'expanding' : 'collapsing'}`);
  console.log('Item header:', event.item.header);
  console.log('Content element:', event.content);
  
  // Prevent expansion if needed
  if (event.item.disabled) {
    event.cancel = true;
  }
}
```

### `AccordionClickArgs` Interface

Used by `clicked` event. Provides access to the item that was clicked.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to prevent the default click behavior |
| `item` | `AccordionItemModel` | The item object that was clicked |
| `name` | `string` | Event name ('clicked') |
| `originalEvent` | `Event` | The original DOM click event |

**Usage Example:**
```typescript
onClicked(event: AccordionClickArgs) {
  console.log('Clicked item:', event.item.header);
  console.log('Mouse X:', (event.originalEvent as MouseEvent).clientX);
  console.log('Mouse Y:', (event.originalEvent as MouseEvent).clientY);
  
  // Prevent default action
  if (event.item.header === 'Protected') {
    event.cancel = true;
  }
}
```

### Complete Event Arguments Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { ExpandEventArgs, AccordionClickArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-event-args',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion 
      #accordion
      (expanding)="onExpanding($event)"
      (expanded)="onExpanded($event)"
      (clicked)="onClicked($event)"
      [items]="items">
    </ejs-accordion>
    
    <div>Last event: {{ lastEvent }}</div>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Item 1', content: 'Content 1' },
    { header: 'Item 2', content: 'Content 2' },
    { header: 'Item 3', content: 'Content 3' }
  ];

  public lastEvent = '';

  onExpanding(event: ExpandEventArgs) {
    this.lastEvent = `Expanding item ${event.index} (${event.item.header})`;
    console.log('ExpandEventArgs:', {
      index: event.index,
      name: event.name,
      isExpanded: event.isExpanded,
      contentElement: event.content
    });
  }

  onExpanded(event: ExpandEventArgs) {
    this.lastEvent = `Expanded item ${event.index}`;
  }

  onClicked(event: AccordionClickArgs) {
    this.lastEvent = `Clicked item ${event.item.header}`;
    console.log('AccordionClickArgs:', {
      item: event.item,
      name: event.name,
      originalEvent: event.originalEvent
    });
  }
}
```

## Programmatic Expand/Collapse

### Expand an Item Programmatically

Use `expandItem()` to expand a specific item:

```typescript
expandItem(index: number) {
  if (this.accordionObj) {
    this.accordionObj.expandItem(true, index);  // true to expand
  }
}

// Expand first item
expandFirst() {
  this.expandItem(0);
}

// Expand specific item by index
expandByIndex(index: number) {
  this.expandItem(index);
}
```

### Collapse an Item Programmatically

```typescript
collapseItem(index: number) {
  if (this.accordionObj) {
    this.accordionObj.expandItem(false, index);  // false to collapse
  }
}

// Collapse all items
collapseAll() {
  if (this.accordionObj && this.accordionObj.items) {
    for (let i = 0; i < this.accordionObj.items.length; i++) {
      this.accordionObj.expandItem(false, i);
    }
  }
}
```

### Full Expand/Collapse Control Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <div style="margin-bottom: 20px;">
      <button (click)="expandAll()">Expand All</button>
      <button (click)="collapseAll()">Collapse All</button>
      <button (click)="expandByIndex(1)">Expand Item 2</button>
      <button (click)="collapseByIndex(0)">Collapse Item 1</button>
    </div>

    <ejs-accordion #accordion [items]="items"></ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Item 1', content: 'Content 1', expanded: true },
    { header: 'Item 2', content: 'Content 2' },
    { header: 'Item 3', content: 'Content 3' }
  ];

  expandAll() {
    this.items.forEach((_, index) => {
      this.accordionObj?.expandItem(true, index);
    });
  }

  collapseAll() {
    this.items.forEach((_, index) => {
      this.accordionObj?.expandItem(false, index);
    });
  }

  expandByIndex(index: number) {
    this.accordionObj?.expandItem(true, index);
  }

  collapseByIndex(index: number) {
    this.accordionObj?.expandItem(false, index);
  }
}
```

## Disabling Items

### Disable an Item

Use `enableItem()` to disable/enable items:

```typescript
disableItem(index: number) {
  if (this.accordionObj) {
    this.accordionObj.enableItem(false, index);  // false to disable
  }
}

// Disable first item
disableFirst() {
  this.disableItem(0);
}
```

### Enable a Disabled Item

```typescript
enableItem(index: number) {
  if (this.accordionObj) {
    this.accordionObj.enableItem(true, index);  // true to enable
  }
}
```

### Example: Conditional Item Enabling

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <div style="margin-bottom: 20px;">
      <label>
        <input type="checkbox" [checked]="item2Enabled" (change)="toggleItem2()">
        Enable Item 2
      </label>
    </div>

    <ejs-accordion #accordion [items]="items"></ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public item2Enabled = false;
  public items = [
    { header: 'Item 1', content: 'Content 1', expanded: true },
    { header: 'Item 2', content: 'Content 2' },
    { header: 'Item 3', content: 'Content 3' }
  ];

  toggleItem2() {
    this.item2Enabled = !this.item2Enabled;
    this.accordionObj?.enableItem(this.item2Enabled, 1);
  }
}
```

## Visibility Control (hideItem)

### Show/Hide Items Dynamically

Use `hideItem()` to hide or show accordion items without removing them:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-visibility',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <div style="margin-bottom: 20px;">
      <button (click)="toggleItemVisibility(0)">Toggle Item 1</button>
      <button (click)="toggleItemVisibility(1)">Toggle Item 2</button>
      <button (click)="showAll()">Show All</button>
      <button (click)="hideAll()">Hide All</button>
    </div>

    <ejs-accordion #accordion [items]="items"></ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Important', content: 'Content 1', visible: true },
    { header: 'Optional', content: 'Content 2', visible: true },
    { header: 'Advanced', content: 'Content 3', visible: true }
  ];

  toggleItemVisibility(index: number) {
    if (this.accordionObj?.items?.[index]) {
      const isVisible = this.accordionObj.items[index].visible;
      this.accordionObj.hideItem(index, !isVisible);
    }
  }

  showAll() {
    this.accordionObj?.items?.forEach((_, index) => {
      this.accordionObj?.hideItem(index, false);
    });
  }

  hideAll() {
    this.accordionObj?.items?.forEach((_, index) => {
      this.accordionObj?.hideItem(index, true);
    });
  }
}
```

### Filtering with hideItem

```typescript
filterItems(searchText: string) {
  this.accordionObj?.items?.forEach((item, index) => {
    const matches = item.header?.toLowerCase().includes(searchText.toLowerCase());
    this.accordionObj?.hideItem(index, !matches);
  });
}
```

## Focus Management (select)

### Set Focus to Accordion Items

Use `select()` to programmatically set focus on specific items for keyboard navigation and accessibility:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-focus',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <div style="margin-bottom: 20px;">
      <button (click)="focusItem(0)">Focus Item 1</button>
      <button (click)="focusItem(1)">Focus Item 2</button>
      <button (click)="focusItem(2)">Focus Item 3</button>
      <button (click)="focusNext()">Focus Next</button>
      <button (click)="focusPrevious()">Focus Previous</button>
    </div>

    <ejs-accordion 
      #accordion 
      [items]="items"
      (keydown)="onKeyDown($event)">
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Item 1', content: 'Content 1' },
    { header: 'Item 2', content: 'Content 2' },
    { header: 'Item 3', content: 'Content 3' }
  ];

  private currentFocusIndex = 0;

  focusItem(index: number) {
    if (index >= 0 && index < (this.accordionObj?.items?.length || 0)) {
      this.accordionObj?.select(index);
      this.currentFocusIndex = index;
    }
  }

  focusNext() {
    const nextIndex = (this.currentFocusIndex + 1) % (this.accordionObj?.items?.length || 1);
    this.focusItem(nextIndex);
  }

  focusPrevious() {
    const prevIndex = this.currentFocusIndex === 0 ? 
      ((this.accordionObj?.items?.length || 1) - 1) : 
      this.currentFocusIndex - 1;
    this.focusItem(prevIndex);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.focusNext();
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      this.focusPrevious();
      event.preventDefault();
    }
  }
}
```

## Cleanup (destroy)

### Destroy Accordion Component

Use `destroy()` to properly clean up the accordion when it's no longer needed:

```typescript
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-cleanup',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <div style="margin-bottom: 20px;">
      <button (click)="destroyAccordion()">Destroy Accordion</button>
      <button (click)="recreateAccordion()">Recreate Accordion</button>
    </div>

    <ejs-accordion 
      #accordion 
      *ngIf="accordionVisible"
      [items]="items">
    </ejs-accordion>
    
    <div *ngIf="!accordionVisible">Accordion has been destroyed</div>
  `
})
export class AppComponent implements OnDestroy {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Item 1', content: 'Content 1' },
    { header: 'Item 2', content: 'Content 2' },
    { header: 'Item 3', content: 'Content 3' }
  ];

  public accordionVisible = true;

  destroyAccordion() {
    if (this.accordionObj) {
      this.accordionObj.destroy();
      this.accordionVisible = false;
      console.log('Accordion destroyed');
    }
  }

  recreateAccordion() {
    this.accordionVisible = true;
    console.log('Accordion recreated');
  }

  ngOnDestroy() {
    // Ensure cleanup when component is destroyed
    if (this.accordionObj) {
      this.accordionObj.destroy();
    }
  }
}
```

### Best Practices for Component Cleanup

```typescript
@Component({...})
export class MyAccordionComponent implements OnInit, OnDestroy {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  ngOnInit() {
    // Initialize accordion resources
  }

  ngOnDestroy() {
    // Clean up accordion before component is destroyed
    if (this.accordionObj) {
      try {
        this.accordionObj.destroy();
      } catch (error) {
        console.error('Error destroying accordion:', error);
      }
    }
  }
}
```

## Checkbox Integration

### Expand/Collapse Items with Checkbox

Use checkboxes to control which accordion items are open:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { CheckBoxModule, CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { ExpandEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule, CheckBoxModule],
  template: `
    <div style="margin-bottom: 20px;">
      <label>
        <ejs-checkbox #check1 (change)="onCheck1Change()"></ejs-checkbox>
        Toggle Item 1
      </label>
    </div>

    <ejs-accordion 
      #accordion 
      (expanding)="onExpanding($event)"
      (clicked)="onClick($event)">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>
            <ejs-checkbox #headerCheck1 [checked]="check1Checked"></ejs-checkbox>
            Item 1
          </ng-template>
          <ng-template #content>Content 1</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  @ViewChild('check1') check1?: CheckBoxComponent;

  public check1Checked = true;
  private clickEventArgs: any = null;

  onExpanding(event: ExpandEventArgs) {
    // Prevent expansion if clicked from header (not checkbox)
    if (this.clickEventArgs) {
      const checkboxClicked = (this.clickEventArgs.target as HTMLElement)
        .closest('.e-checkbox-wrapper');
      
      if (!checkboxClicked) {
        event.cancel = true;
      }
    }
    this.clickEventArgs = null;
  }

  onClick(event: any) {
    this.clickEventArgs = event.originalEvent;
  }

  onCheck1Change() {
    this.check1Checked = this.check1?.checked || false;
    this.accordionObj?.expandItem(this.check1Checked, 0);
  }
}
```

## AJAX Content Loading

### Load Content via AJAX

Fetch content from server and insert into accordion items:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { Ajax } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion #accordion>
      <e-accordionitems>
        <e-accordionitem header="Department"></e-accordionitem>
        <e-accordionitem header="Platform"></e-accordionitem>
        <e-accordionitem header="Employee Details"></e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  ngOnInit() {
    // Load external HTML content via AJAX
    const ajax = new Ajax('./content.html', 'GET', true);
    ajax.send().then();
    
    ajax.onSuccess = (data: string) => {
      if (this.accordionObj && this.accordionObj.items) {
        // Insert loaded content into third item
        this.accordionObj.items[2].content = data;
        this.accordionObj.refresh();
      }
    };
  }
}
```

### Load Content on Expand Event

Load content only when user expands an item:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpClient } from '@angular/common/http';
import { ExpandEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion 
      #accordion 
      (expanding)="onExpanding($event)">
      <e-accordionitems>
        <e-accordionitem header="Load on Expand"></e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  private loadedIndices = new Set<number>();

  constructor(private http: HttpClient) {}

  onExpanding(event: ExpandEventArgs) {
    const itemIndex = this.accordionObj?.items?.indexOf(event.item) ?? -1;

    // Only load if not already loaded
    if (itemIndex !== -1 && !this.loadedIndices.has(itemIndex)) {
      this.http.get(`/api/content/${itemIndex}`, { responseType: 'text' })
        .subscribe(
          (content: string) => {
            if (this.accordionObj?.items?.[itemIndex]) {
              this.accordionObj.items[itemIndex].content = content;
              this.accordionObj.refresh();
              this.loadedIndices.add(itemIndex);
            }
          },
          (error) => {
            console.error('Error loading content:', error);
          }
        );
    }
  }
}
```

## Content Projection with ng-content

### Using ng-content for Reusable Content

Project content into accordion items using Angular's `ng-content`:

```typescript
// Reusable accordion item component
import { Component, Input } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <e-accordionitem [expanded]="expanded">
      <ng-template #header>
        <div>{{ header }}</div>
      </ng-template>
      <ng-template #content>
        <ng-content></ng-content>
      </ng-template>
    </e-accordionitem>
  `
})
export class AccordionItemComponent {
  @Input() header: string = '';
  @Input() expanded: boolean = false;
}

// Parent component using reusable items
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule, AccordionItemComponent],
  template: `
    <ejs-accordion>
      <app-accordion-item header="Item 1" [expanded]="true">
        <p>This is reusable content for Item 1</p>
        <button>Action Button</button>
      </app-accordion-item>

      <app-accordion-item header="Item 2">
        <p>Different content for Item 2</p>
        <input type="text" placeholder="Enter text">
      </app-accordion-item>

      <app-accordion-item header="Item 3">
        <ul>
          <li>List Item 1</li>
          <li>List Item 2</li>
        </ul>
      </app-accordion-item>
    </ejs-accordion>
  `
})
export class AppComponent {}
```

## Always-Open Accordion Items

### Keep One Item Always Expanded

Prevent the currently expanded item from collapsing in Single mode:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { ExpandEventArgs, AccordionClickArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion 
      #accordion
      expandMode="Single"
      (expanding)="beforeExpand($event)"
      (clicked)="clicked($event)">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>Item 1</ng-template>
          <ng-template #content>Content 1</ng-template>
        </e-accordionitem>
        <e-accordionitem>
          <ng-template #header>Item 2</ng-template>
          <ng-template #content>Content 2</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  private clickedElement: HTMLElement | null = null;

  clicked(e: AccordionClickArgs) {
    this.clickedElement = (e.originalEvent as MouseEvent).target as HTMLElement;
  }

  beforeExpand(e: ExpandEventArgs) {
    const items = this.accordionObj?.element.children;
    if (!items) return;

    const childrenArray = Array.from(items);
    const selectedItems = childrenArray.filter(el => 
      el.classList.contains('e-selected')
    );

    if (selectedItems.length === 1) {
      const selectedElement = selectedItems[0].firstChild as HTMLElement;
      
      // If clicking the same header, prevent collapse
      if (this.clickedElement === selectedElement) {
        e.cancel = true;
      }
    }
  }
}
```

## Progressive Content Loading

### Load Content Incrementally

Update accordion content as data becomes available:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion #accordion [items]="items"></ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Section 1', content: 'Loading...', expanded: true },
    { header: 'Section 2', content: 'Loading...' },
    { header: 'Section 3', content: 'Loading...' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSectionsProgressively();
  }

  loadSectionsProgressively() {
    // Load first section immediately
    this.loadSection(0);
    
    // Load remaining sections sequentially
    setTimeout(() => this.loadSection(1), 500);
    setTimeout(() => this.loadSection(2), 1000);
  }

  loadSection(index: number) {
    this.http.get(`/api/sections/${index}`, { responseType: 'text' })
      .subscribe(
        (content: string) => {
          this.items[index].content = content;
          this.accordionObj?.refresh();
        },
        (error) => {
          this.items[index].content = 'Failed to load content';
          this.accordionObj?.refresh();
        }
      );
  }
}
```

