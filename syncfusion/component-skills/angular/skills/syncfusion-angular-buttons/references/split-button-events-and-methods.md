# Events & Methods

## Table of Contents
- [Events Overview](#events-overview)
- [Click Event (Primary Button)](#click-event-primary-button)
- [Select Event (Item Selection)](#select-event-item-selection)
- [Open Event](#open-event)
- [Close Event](#close-event)
- [BeforeOpen Event](#beforeopen-event)
- [Methods](#methods)
- [ViewChild Access Pattern](#viewchild-access-pattern)
- [Complete Event Example](#complete-event-example)

## Events Overview

The SplitButton component provides comprehensive event handling:

| Event | Fires When | Use Case |
|-------|-----------|----------|
| `click` | Primary button clicked | Execute default action |
| `select` | Item selected from dropdown | Handle menu item selection |
| `open` | Dropdown popup opens | Log analytics, adjust positioning |
| `close` | Dropdown popup closes | Cleanup, save state |
| `beforeOpen` | Before dropdown opens | Validate, modify items, prevent opening |

## Click Event (Primary Button)

The `click` event fires when user clicks the primary button (left side):

### Basic Click Handler

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' }
  ];
  
  onPrimaryClick(): void {
    console.log('Primary button clicked');
    // Execute default action
  }
}
```

```html
<ejs-splitbutton 
  content="Save"
  [items]="items"
  (click)="onPrimaryClick()">
</ejs-splitbutton>
```

### Click with Arguments

Access event arguments for detailed information:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Save' },
    { text: 'Save As' }
  ];
  
  onPrimaryClick(args: any): void {
    console.log('Primary button clicked');
    console.log('Event target:', args.target);
    console.log('Event type:', args.type);
    
    // Perform default action
    this.save();
  }
  
  private save(): void {
    console.log('Saving document...');
  }
}
```

### Click with User Feedback

Provide visual feedback on click:

```typescript
export class AppComponent {
  isSaving: boolean = false;
  saveMessage: string = '';
  
  public items: ItemModel[] = [
    { text: 'Save' },
    { text: 'Save As' }
  ];
  
  onPrimaryClick(): void {
    if (this.isSaving) return;
    
    this.isSaving = true;
    this.saveMessage = 'Saving...';
    
    // Simulate save operation
    setTimeout(() => {
      this.isSaving = false;
      this.saveMessage = 'Saved successfully!';
      
      // Clear message after 2 seconds
      setTimeout(() => {
        this.saveMessage = '';
      }, 2000);
    }, 1500);
  }
}
```

```html
<div>
  <ejs-splitbutton 
    content="Save"
    [items]="items"
    [disabled]="isSaving"
    (click)="onPrimaryClick()">
  </ejs-splitbutton>
  <p *ngIf="saveMessage">{{ saveMessage }}</p>
</div>
```

## Select Event (Item Selection)

The `select` event fires when user selects an item from the dropdown:

### Basic Item Selection

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
  
  onItemSelect(args: any): void {
    console.log('Item selected:', args.item.text);
  }
}
```

```html
<ejs-splitbutton 
  content="Paste"
  [items]="items"
  (select)="onItemSelect($event)">
</ejs-splitbutton>
```

### Item Selection with ID Routing

Use item IDs to route to different handlers:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { id: 'cut', text: 'Cut' },
    { id: 'copy', text: 'Copy' },
    { id: 'paste', text: 'Paste' }
  ];
  
  onItemSelect(args: any): void {
    const itemId = args.item.id;
    
    switch (itemId) {
      case 'cut':
        this.handleCut();
        break;
      case 'copy':
        this.handleCopy();
        break;
      case 'paste':
        this.handlePaste();
        break;
    }
  }
  
  private handleCut(): void {
    console.log('Cut operation executed');
  }
  
  private handleCopy(): void {
    console.log('Copy operation executed');
  }
  
  private handlePaste(): void {
    console.log('Paste operation executed');
  }
}
```

### Item Selection with Analytics

Track item selections for analytics:

```typescript
export class AppComponent {
  constructor(private analytics: AnalyticsService) {}
  
  public items: ItemModel[] = [
    { id: 'export-pdf', text: 'Export as PDF' },
    { id: 'export-excel', text: 'Export as Excel' },
    { id: 'export-csv', text: 'Export as CSV' }
  ];
  
  onItemSelect(args: any): void {
    const itemId = args.item.id;
    const itemText = args.item.text;
    
    // Track analytics
    this.analytics.trackEvent('export_selected', {
      export_type: itemId,
      export_label: itemText
    });
    
    // Execute export
    this.performExport(itemId);
  }
  
  private performExport(exportType: string): void {
    console.log(`Exporting as ${exportType}`);
  }
}
```

### Item Selection with Confirmation

Show confirmation before executing item action:

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { id: 'delete', text: 'Delete', iconCss: 'e-icons e-delete' },
    { id: 'archive', text: 'Archive', iconCss: 'e-icons e-archive' }
  ];
  
  onItemSelect(args: any): void {
    const itemId = args.item.id;
    
    // Show confirmation for destructive actions
    if (itemId === 'delete' || itemId === 'archive') {
      this.confirmAction(itemId);
    } else {
      this.executeAction(itemId);
    }
  }
  
  private confirmAction(action: string): void {
    const confirmed = confirm(`Are you sure you want to ${action}?`);
    if (confirmed) {
      this.executeAction(action);
    }
  }
  
  private executeAction(action: string): void {
    console.log(`Executing ${action}`);
  }
}
```

## Open Event

The `open` event fires when the dropdown popup opens:

### Basic Open Handler

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  onDropdownOpen(): void {
    console.log('Dropdown opened');
  }
}
```

```html
<ejs-splitbutton 
  content="Menu"
  [items]="items"
  (open)="onDropdownOpen()">
</ejs-splitbutton>
```

### Populate Items on Open (Lazy Loading)

Load items dynamically when dropdown opens:

```typescript
export class AppComponent {
  public items: ItemModel[] = [];
  itemsLoaded: boolean = false;
  
  onDropdownOpen(): void {
    if (!this.itemsLoaded) {
      this.loadItems();
    }
  }
  
  private loadItems(): void {
    // Simulate API call
    this.items = [
      { text: 'Item 1' },
      { text: 'Item 2' },
      { text: 'Item 3' }
    ];
    this.itemsLoaded = true;
  }
}
```

### Log Analytics on Open

```typescript
export class AppComponent {
  constructor(private analytics: AnalyticsService) {}
  
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  onDropdownOpen(): void {
    this.analytics.trackEvent('splitbutton_opened', {
      timestamp: new Date(),
      user_id: this.currentUserId
    });
  }
  
  private get currentUserId(): string {
    return 'user123';
  }
}
```

## Close Event

The `close` event fires when the dropdown popup closes:

### Basic Close Handler

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  onDropdownClose(): void {
    console.log('Dropdown closed');
  }
}
```

```html
<ejs-splitbutton 
  content="Menu"
  [items]="items"
  (close)="onDropdownClose()">
</ejs-splitbutton>
```

### Cleanup on Close

Perform cleanup operations when dropdown closes:

```typescript
export class AppComponent {
  public items: ItemModel[] = [];
  highlightedIndex: number = -1;
  
  onDropdownOpen(): void {
    console.log('Popup opened');
  }
  
  onDropdownClose(): void {
    // Reset highlighted item
    this.highlightedIndex = -1;
    console.log('Popup closed, state cleaned');
  }
}
```

## BeforeOpen Event

The `beforeOpen` event fires before the dropdown opens, allowing you to prevent opening or modify items:

### Prevent Opening Based on Condition

```typescript
export class AppComponent {
  isDisabled: boolean = false;
  
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  onBeforeOpen(args: any): void {
    if (this.isDisabled) {
      args.cancel = true;  // Prevent dropdown from opening
      console.log('Dropdown opening prevented');
    }
  }
}
```

```html
<ejs-splitbutton 
  content="Menu"
  [items]="items"
  [disabled]="isDisabled"
  (beforeOpen)="onBeforeOpen($event)">
</ejs-splitbutton>

<button (click)="isDisabled = !isDisabled">
  Toggle Disabled
</button>
```

### Dynamically Modify Items Before Opening

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { id: 'recent1', text: 'Recent File 1' },
    { id: 'recent2', text: 'Recent File 2' }
  ];
  
  onBeforeOpen(args: any): void {
    // Refresh recent files list before opening
    this.updateRecentFiles();
  }
  
  private updateRecentFiles(): void {
    // Load latest recent files from storage
    const recentFiles = this.getRecentFilesFromStorage();
    this.items = recentFiles.map((file, index) => ({
      id: `recent${index}`,
      text: file.name
    }));
  }
  
  private getRecentFilesFromStorage(): any[] {
    // Return recent files from storage
    return [];
  }
}
```

## Methods

The SplitButton component exposes the following officially documented methods for programmatic control.

> **⚠️ Note:** Only `toggle()`, `addItems()`, `removeItems()`, and `focusIn()` are supported. There are **no** `open()` or `close()` methods in the SplitButton API.

### toggle() Method

Toggles the dropdown popup: opens it if closed, closes it if open.

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  toggleDropdown(): void {
    this.splitButtonRef.toggle();
  }
}
```

```html
<ejs-splitbutton 
  #splitBtn
  content="Menu"
  [items]="items">
</ejs-splitbutton>

<button (click)="toggleDropdown()">Toggle Menu</button>
```

### addItems() Method

Adds new items to the popup. Appends to the end by default; supply `text` to insert before a specific item.

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
  
  appendItem(): void {
    // Appends to end
    this.splitButtonRef.addItems([{ text: 'Select All' }]);
  }
  
  insertBeforePaste(): void {
    // Insert before 'Paste'
    this.splitButtonRef.addItems([{ text: 'Copy Format' }], 'Paste');
  }
}
```

```html
<ejs-splitbutton #splitBtn content="Edit" [items]="items"></ejs-splitbutton>
<button (click)="appendItem()">Add Item</button>
<button (click)="insertBeforePaste()">Insert Before Paste</button>
```

### removeItems() Method

Removes items from the popup by text value, or by `id` when `isUniqueId` is `true`.

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { id: 'cut-item',   text: 'Cut' },
    { id: 'copy-item',  text: 'Copy' },
    { id: 'paste-item', text: 'Paste' }
  ];
  
  removeByText(): void {
    this.splitButtonRef.removeItems(['Copy']);
  }
  
  removeById(): void {
    // Pass id values and set isUniqueId to true
    this.splitButtonRef.removeItems(['cut-item'], true);
  }
}
```

### focusIn() Method

Sets native focus on the SplitButton element.

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  focusButton(): void {
    this.splitButtonRef.focusIn();
  }
}
```

### Combined Method Usage Example

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { id: 'save',   text: 'Save' },
    { id: 'export', text: 'Export' }
  ];
  
  togglePopup(): void {
    this.splitButtonRef.toggle();
  }
  
  addMoreOptions(): void {
    this.splitButtonRef.addItems([
      { id: 'print', text: 'Print' },
      { id: 'share', text: 'Share' }
    ]);
  }
  
  removeExportOption(): void {
    this.splitButtonRef.removeItems(['export'], true);
  }
  
  focusOnButton(): void {
    this.splitButtonRef.focusIn();
  }
}
```

## ViewChild Access Pattern

### Basic ViewChild

Access SplitButton component instance:

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SplitButtonComponent, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-root',
  template: `
    <ejs-splitbutton 
      #splitBtn
      content="Actions"
      [items]="items">
    </ejs-splitbutton>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  ngAfterViewInit(): void {
    // Access component instance after view initialization
    console.log('SplitButton instance:', this.splitButtonRef);
  }
}
```

### ViewChild with Type Reference

```typescript
@ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
```

### Access Properties via ViewChild

```typescript
export class AppComponent implements AfterViewInit {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  ngAfterViewInit(): void {
    console.log('Items:', this.splitButtonRef.items);
    console.log('Disabled:', this.splitButtonRef.disabled);
    console.log('Content:', this.splitButtonRef.content);
  }
}
```

## Complete Event Example

Comprehensive example using all events and methods:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitButtonComponent, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-complete-example',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteEventExample {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { id: 'save', text: 'Save', iconCss: 'e-icons e-save' },
    { id: 'saveas', text: 'Save As', iconCss: 'e-icons e-save-as' },
    { separator: true },
    { id: 'export', text: 'Export', iconCss: 'e-icons e-export' }
  ];
  
  eventLog: string[] = [];
  
  onPrimaryClick(): void {
    this.logEvent('Primary button clicked - Default action');
    this.performDefaultAction();
  }
  
  onItemSelect(args: any): void {
    this.logEvent(`Item selected: ${args.item.text}`);
    this.handleItemSelection(args.item);
  }
  
  onBeforeOpen(args: any): void {
    this.logEvent('Before open event triggered');
    // Can prevent opening by setting args.cancel = true
  }
  
  onOpen(): void {
    this.logEvent('Dropdown opened');
  }
  
  onClose(): void {
    this.logEvent('Dropdown closed');
  }
  
  togglePopup(): void {
    this.logEvent('Toggle method called');
    this.splitButtonRef.toggle();
  }
  
  private performDefaultAction(): void {
    console.log('Executing default action...');
  }
  
  private handleItemSelection(item: ItemModel): void {
    console.log(`Handling item: ${item.id}`);
  }
  
  private logEvent(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.push(`[${timestamp}] ${message}`);
  }
  
  clearLog(): void {
    this.eventLog = [];
  }
}
```

```html
<!-- complete.component.html -->
<div style="padding: 20px;">
  <div style="margin-bottom: 20px;">
    <h2>SplitButton Events Demo</h2>
    <ejs-splitbutton 
      #splitBtn
      content="Save"
      [items]="items"
      (click)="onPrimaryClick()"
      (select)="onItemSelect($event)"
      (beforeOpen)="onBeforeOpen($event)"
      (open)="onOpen()"
      (close)="onClose()">
    </ejs-splitbutton>
  </div>
  
  <div style="margin-bottom: 20px;">
    <button (click)="togglePopup()">Toggle Menu</button>
    <button (click)="clearLog()">Clear Log</button>
  </div>
  
  <div style="border: 1px solid #ccc; padding: 10px; height: 200px; overflow-y: auto;">
    <h3>Event Log:</h3>
    <div *ngFor="let log of eventLog" style="padding: 5px; font-family: monospace;">
      {{ log }}
    </div>
  </div>
</div>
```

Your event handling is now complete! Explore [styling-and-customization.md](styling-and-customization.md) to customize appearance.
