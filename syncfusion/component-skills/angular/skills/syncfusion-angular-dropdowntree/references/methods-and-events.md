# Methods and Events Reference - Angular Dropdown Tree

## Table of Contents
- [Component Methods](#component-methods)
- [Selection Events](#selection-events)
- [Popup Events](#popup-events)
- [Data Events](#data-events)
- [Component Lifecycle Events](#component-lifecycle-events)
- [User Interaction Events](#user-interaction-events)
- [Event Arguments Reference](#event-arguments-reference)
- [Complete Example](#complete-example)
- [Code Examples - Advanced Scenarios](#code-examples---advanced-scenarios)

---

## Component Methods

Methods provide programmatic control over the Dropdown Tree component. Access them via ViewChild reference to the component.

### showPopup()

**Purpose:** Programmatically open the dropdown popup.

**Syntax:**
```typescript
showPopup(): void
```

**Example:**
```typescript
@Component({
  selector: 'app-methods',
  template: `
    <ejs-dropdowntree #ddt [fields]='fields'></ejs-dropdowntree>
    <button (click)='openDropdown()'>Open Dropdown</button>
  `,
  standalone: true,
  imports: [DropDownTreeModule, ButtonModule]
})
export class MethodsComponent {
  @ViewChild('ddt') dropdowntree!: DropDownTreeComponent;
  public fields = { /* ... */ };

  openDropdown() {
    this.dropdowntree.showPopup();
  }
}
```

**Use Cases:**
- Open dropdown on custom button click
- Auto-open on page load for first-time users
- Open dropdown after validation
- Open popup in response to other component events

---

### hidePopup()

**Purpose:** Programmatically close the dropdown popup.

**Syntax:**
```typescript
hidePopup(): void
```

**Example:**
```typescript
@ViewChild('ddt') dropdowntree!: DropDownTreeComponent;

closeDropdown() {
  this.dropdowntree.hidePopup();
}

autoCloseOnDelay() {
  setTimeout(() => {
    this.dropdowntree.hidePopup();
  }, 3000); // Close after 3 seconds
}
```

---

### refresh()

**Purpose:** Refresh component data and UI rendering. Useful after dynamic data changes.

**Syntax:**
```typescript
refresh(): void
```

**Example:**
```typescript
@ViewChild('ddt') dropdowntree!: DropDownTreeComponent;

refreshDropdownData() {
  // Modify data dynamically
  this.data.push({
    id: 100,
    name: 'New Item',
    hasChild: false
  });
  
  // Refresh component to display new data
  this.dropdowntree.refresh();
}
```

**When to Use:**
- After adding/removing items programmatically
- After remote data updates
- After filtering or sorting data
- After locale/theme changes

---

### clearSelection()

**Purpose:** Clear all selected items and reset the component value to null.

**Syntax:**
```typescript
clearSelection(): void
```

**Example:**
```typescript
@ViewChild('ddt') dropdowntree!: DropDownTreeComponent;

clearAll() {
  this.dropdowntree.clearSelection();
  // Component now shows placeholder text
}

clearSelectionOnClose() {
  this.dropdowntree.clearSelection();
  this.dropdowntree.hidePopup();
}
```

**Use Cases:**
- Reset form on "Clear" button click
- Clear selection before data reload
- Reset UI after submission
- Undo user selection

---

### expandAll()

**Purpose:** Expand all parent nodes in the tree hierarchy. Child nodes become visible.

**Syntax:**
```typescript
expandAll(): void
```

**Example:**
```typescript
@ViewChild('ddt') dropdowntree!: DropDownTreeComponent;

expandAllNodes() {
  this.dropdowntree.expandAll();
  // All parent nodes expand, children become visible
}

expandOnOpen(event: any) {
  // Auto-expand all when popup opens
  this.dropdowntree.expandAll();
}
```

**Use Cases:**
- Expand tree on first popup open
- Show full hierarchy for overview
- Expand after search
- Expand all for keyboard navigation

---

### collapseAll()

**Purpose:** Collapse all parent nodes in the tree hierarchy. Children are hidden.

**Syntax:**
```typescript
collapseAll(): void
```

**Example:**
```typescript
@ViewChild('ddt') dropdowntree!: DropDownTreeComponent;

collapseAllNodes() {
  this.dropdowntree.collapseAll();
  // All parent nodes collapse, only root items visible
}

collapseOnClose() {
  this.dropdowntree.collapseAll();
  this.dropdowntree.hidePopup();
}
```

**Use Cases:**
- Collapse tree to see root items only
- Clean up UI before taking screenshot
- Collapse after item selection
- Collapse for compact display

---

## Selection Events

Selection events fire when user selects or deselects items.

### change

**Triggers:** When selection changes (item selected/deselected or value programmatically set)

**Event Arguments:** `DdtChangeEventArgs`

```typescript
interface DdtChangeEventArgs {
  e: ChangeEventArgs;        // Original change event
  value: string | string[];  // Currently selected value(s)
  text: string | string[];   // Display text of selected item(s)
  item: any;                 // Selected data item
  itemData: any;             // Item data details
  isInteracted: boolean;     // True if user-triggered, false if programmatic
  previousValue: any;        // Previously selected value
  previousText: any;         // Previously selected text
  changeOnBlur: boolean;     // True if event fires on blur
}
```

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree #ddt 
                [fields]='fields' 
                (change)='onSelectionChange($event)'></ejs-dropdowntree>`
})
export class ChangeEventComponent {
  public fields = { /* ... */ };

  onSelectionChange(event: any) {
    console.log('Selected value:', event.value);
    console.log('Selected text:', event.text);
    console.log('Full item:', event.item);
    console.log('User triggered:', event.isInteracted);
    
    // Update form
    this.selectedItem = event.item;
    this.formValue = event.value;
  }
}
```

**Practical Use Cases:**
- Save selection to local storage
- Validate selection
- Update dependent fields
- Trigger form submission
- Analytics/logging

---

### select

**Triggers:** When user selects an item by clicking/tapping in the popup

**Event Arguments:** `DdtSelectEventArgs`

```typescript
interface DdtSelectEventArgs {
  e: PointerEvent;           // Browser pointer event
  item: any;                 // Selected data item
  itemData: any;             // Complete item data
  value: string;             // Selected value
  text: string;              // Selected text
  node: HTMLElement;         // DOM element of selected item
  nodeData: TreeNodeData;     // Tree node metadata
}
```

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (select)='onItemSelect($event)'></ejs-dropdowntree>`
})
export class SelectEventComponent {
  public fields = { /* ... */ };

  onItemSelect(event: any) {
    console.log('Item selected:', event.text);
    console.log('Item value:', event.value);
    
    // Item-specific logic
    if (event.value === 'special-item') {
      this.handleSpecialItem(event.item);
    }
  }
}
```

---

## Popup Events

Popup events fire during popup open/close operations.

### open

**Triggers:** When popup opens (after animation completes)

**Event Arguments:** `DdtPopupEventArgs`

```typescript
interface DdtPopupEventArgs {
  e: Event;                  // Original popup event
  popup: HTMLElement;        // Popup DOM element
  items: HTMLElement[];      // Array of item elements
}
```

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (open)='onPopupOpen($event)'></ejs-dropdowntree>`
})
export class PopupOpenComponent {
  onPopupOpen(event: any) {
    console.log('Popup opened');
    // Focus first item
    const firstItem = event.items[0];
    if (firstItem) firstItem.focus();
  }
}
```

---

### close

**Triggers:** When popup closes (after animation completes)

**Event Arguments:** `DdtPopupEventArgs`

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (close)='onPopupClose($event)'></ejs-dropdowntree>`
})
export class PopupCloseComponent {
  onPopupClose(event: any) {
    console.log('Popup closed');
    // Cleanup resources
    this.stopPolling();
  }
}
```

---

### beforeOpen

**Triggers:** Before popup opens (before animation starts)

**Event Arguments:** `DdtBeforeOpenEventArgs`

```typescript
interface DdtBeforeOpenEventArgs {
  e: Event;                  // Original event
  cancel: boolean;           // Set true to prevent opening
}
```

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (beforeOpen)='onBeforeOpen($event)'></ejs-dropdowntree>`
})
export class BeforeOpenComponent {
  onBeforeOpen(event: any) {
    // Validate before opening
    if (!this.isUserAuthorized()) {
      event.cancel = true;
      this.showAuthError();
    }
  }
}
```

**Use Cases:**
- Validate user permissions before opening
- Load data dynamically before opening
- Prevent opening under certain conditions
- Log analytics about popup interactions

---

## Data Events

Data events relate to data loading and binding.

### dataBound

**Triggers:** When data source is loaded and rendered in the tree

**Event Arguments:** `DdtDataBoundEventArgs`

```typescript
interface DdtDataBoundEventArgs {
  e: Event;                  // Original event
  data: any[];               // Loaded data array
  count: number;             // Number of items loaded
}
```

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (dataBound)='onDataBound($event)'></ejs-dropdowntree>`
})
export class DataBoundComponent {
  onDataBound(event: any) {
    console.log(`Data loaded: ${event.data.length} items`);
    this.isLoading = false;
    this.updateItemCount(event.count);
  }
}
```

---

### actionFailure

**Triggers:** When remote data fetch fails (network error, timeout, API error)

**Event Arguments:** Error object

**Example:**
```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (actionFailure)='onDataError($event)'></ejs-dropdowntree>`
})
export class ActionFailureComponent {
  public data = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor
  });

  public fields = { dataSource: this.data, /* ... */ };

  onDataError(event: any) {
    console.error('Data loading failed:', event);
    this.showErrorNotification('Failed to load data. Please try again.');
  }
}
```

---

### filtering

**Triggers:** When user types in the filter bar (when `allowFiltering` is true)

**Event Arguments:** `DdtFilteringEventArgs`

```typescript
interface DdtFilteringEventArgs {
  e: Event;                  // Original event
  text: string;              // Filter text entered
  cancel: boolean;           // Set true to prevent filtering
}
```

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                [allowFiltering]='true'
                (filtering)='onFilter($event)'></ejs-dropdowntree>`
})
export class FilteringComponent {
  onFilter(event: any) {
    console.log('Filtering for:', event.text);
    
    // Custom filtering logic
    if (event.text.length < 3) {
      event.cancel = true; // Require minimum 3 characters
    }
  }
}
```

---

## Component Lifecycle Events

### created

**Triggers:** When component is fully initialized and ready

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (created)='onComponentCreated()'></ejs-dropdowntree>`
})
export class CreatedComponent {
  onComponentCreated() {
    console.log('Dropdown Tree component initialized');
    this.initializeRelatedComponents();
  }
}
```

---

### destroyed

**Triggers:** When component is destroyed (on component cleanup)

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (destroyed)='onComponentDestroyed()'></ejs-dropdowntree>`
})
export class DestroyedComponent {
  onComponentDestroyed() {
    console.log('Dropdown Tree destroyed');
    this.cleanup();
  }
}
```

---

## User Interaction Events

### focus

**Triggers:** When component input receives focus

**Event Arguments:** `DdtFocusEventArgs`

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (focus)='onFocus($event)'></ejs-dropdowntree>`
})
export class FocusComponent {
  onFocus(event: any) {
    console.log('Component focused');
    // Highlight component or show hints
  }
}
```

---

### blur

**Triggers:** When component input loses focus

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (blur)='onBlur($event)'></ejs-dropdowntree>`
})
export class BlurComponent {
  onBlur(event: any) {
    console.log('Component lost focus');
    // Validate selected value
    // Save to form
  }
}
```

---

### keyPress

**Triggers:** When user presses a key in the component

**Event Arguments:** `DdtKeyPressEventArgs`

```typescript
interface DdtKeyPressEventArgs {
  e: KeyboardEvent;          // Keyboard event
  key: string;               // Key pressed
  action: string;            // Action triggered (select, open, close, etc.)
  cancel: boolean;           // Set true to cancel key action
}
```

**Example:**
```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields' 
                (keyPress)='onKeyPress($event)'></ejs-dropdowntree>`
})
export class KeyPressComponent {
  onKeyPress(event: any) {
    if (event.key === 'Enter') {
      // Submit form on Enter
      this.submitForm();
    }
  }
}
```

---

## Event Arguments Reference

### DdtChangeEventArgs

Fired when selection changes.

| Property | Type | Description |
|----------|------|-------------|
| `value` | string \| string[] | Currently selected value(s) |
| `text` | string \| string[] | Display text of selected item(s) |
| `item` | any | Selected data item object |
| `itemData` | any | Complete item data |
| `isInteracted` | boolean | True if user-triggered, false if programmatic |
| `previousValue` | any | Previously selected value |
| `previousText` | any | Previously selected text |

### DdtSelectEventArgs

Fired when user clicks an item.

| Property | Type | Description |
|----------|------|-------------|
| `value` | string | Selected value |
| `text` | string | Selected text |
| `item` | any | Selected data item |
| `node` | HTMLElement | DOM element of selected item |
| `e` | PointerEvent | Browser pointer event |

### DdtPopupEventArgs

Fired when popup opens/closes.

| Property | Type | Description |
|----------|------|-------------|
| `popup` | HTMLElement | Popup DOM element |
| `items` | HTMLElement[] | Array of tree item elements |

### DdtBeforeOpenEventArgs

Fired before popup opens.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | boolean | Set true to prevent opening |
| `e` | Event | Original event |

---

## Complete Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownTreeComponent, DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-methods-events',
  template: `
    <div class="demo-section">
      <div class="control-section">
        <h3>Dropdown Tree Methods and Events Demo</h3>
        
        <ejs-dropdowntree #myDDT
          [fields]='fields'
          [showCheckBox]='true'
          placeholder='Select items'
          (change)='onValueChange($event)'
          (open)='onOpen($event)'
          (close)='onClose($event)'
          (select)='onSelect($event)'
          (focus)='onFocus($event)'
          (blur)='onBlur($event)'>
        </ejs-dropdowntree>
        
        <div class="button-group">
          <button ejs-button (click)='expandAll()'>Expand All</button>
          <button ejs-button (click)='collapseAll()'>Collapse All</button>
          <button ejs-button (click)='openPopup()'>Open</button>
          <button ejs-button (click)='closePopup()'>Close</button>
          <button ejs-button (click)='clear()'>Clear</button>
          <button ejs-button (click)='refresh()'>Refresh</button>
        </div>
        
        <div class="info-panel">
          <h4>Event Log:</h4>
          <div class="log-content">
            <p *ngFor='let log of eventLog'>{{ log }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .button-group { margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap; }
    .info-panel { margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
    .log-content { height: 150px; overflow-y: auto; background: #f5f5f5; padding: 10px; font-size: 12px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule, ButtonModule, FormsModule, ReactiveFormsModule]
})
export class MethodsEventsComponent {
  @ViewChild('myDDT') dropdowntree!: DropDownTreeComponent;

  public data = [
    { id: 1, name: 'Engineering', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Frontend' },
    { id: 3, pid: 1, name: 'Backend' },
    { id: 4, name: 'HR', hasChild: true },
    { id: 5, pid: 4, name: 'Recruitment' }
  ];

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };

  public eventLog: string[] = [];

  expandAll() {
    this.dropdowntree.expandAll();
    this.addLog('Expanded all nodes');
  }

  collapseAll() {
    this.dropdowntree.collapseAll();
    this.addLog('Collapsed all nodes');
  }

  openPopup() {
    this.dropdowntree.showPopup();
  }

  closePopup() {
    this.dropdowntree.hidePopup();
  }

  clear() {
    this.dropdowntree.clearSelection();
    this.addLog('Selection cleared');
  }

  refresh() {
    this.dropdowntree.refresh();
    this.addLog('Component refreshed');
  }

  onValueChange(event: any) {
    this.addLog(`Value changed: ${event.value}`);
  }

  onOpen(event: any) {
    this.addLog('Popup opened');
  }

  onClose(event: any) {
    this.addLog('Popup closed');
  }

  onSelect(event: any) {
    this.addLog(`Item selected: ${event.text}`);
  }

  onFocus(event: any) {
    this.addLog('Component focused');
  }

  onBlur(event: any) {
    this.addLog('Component lost focus');
  }

  private addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    if (this.eventLog.length > 10) {
      this.eventLog.pop();
    }
  }
}
```

**Key Takeaways:**
- Use **methods** for programmatic control (open/close, expand/collapse, clear)
- Use **selection events** to track and respond to user choices
- Use **popup events** for UI coordination
- Use **data events** for error handling and data monitoring
- Use **lifecycle events** for initialization and cleanup

