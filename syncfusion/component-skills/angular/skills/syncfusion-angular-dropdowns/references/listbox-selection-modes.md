# Selection Modes in Syncfusion Angular ListBox

## Table of Contents
- [Single Selection](#single-selection)
- [Multiple Selection](#multiple-selection)
- [Checkbox Selection](#checkbox-selection)
- [Select All Feature](#select-all-feature)
- [Handling Change Events](#handling-change-events)
- [Getting Selected Items](#getting-selected-items)

---

## Single Selection

Single selection mode allows users to select only one item at a time. When a new item is selected, the previously selected item is automatically deselected.

### Enable Single Selection

Set the `mode` property to `'Single'` in `selectionSettings`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-listbox',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <ejs-listbox 
      [dataSource]="items"
      [selectionSettings]="{ mode: 'Single' }">
    </ejs-listbox>
  `
})
export class ListBoxComponent implements OnInit {
  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      { text: 'Option A', id: 'opt-1' },
      { text: 'Option B', id: 'opt-2' },
      { text: 'Option C', id: 'opt-3' },
      { text: 'Option D', id: 'opt-4' }
    ];
  }
}
```

### User Interaction
- Click an item to select it
- Click another item to deselect the first and select the new one
- Click the selected item again to deselect it

---

## Multiple Selection

Multiple selection mode (default) allows users to select multiple items simultaneously using keyboard modifiers and mouse actions.

### Enable Multiple Selection

```typescript
[selectionSettings]="{ mode: 'Multiple' }"
```

Or use the shorthand (default):

```typescript
<ejs-listbox [dataSource]="items"></ejs-listbox>
```

### Keyboard Shortcuts for Multiple Selection

| Action | Result |
|--------|--------|
| **Click** | Toggle selection of single item |
| **Shift + Click** | Select range from last selected to clicked item |
| **Ctrl + Click** | Toggle selection while keeping other selections |
| **Arrow Keys** | Navigate between items |
| **Shift + Arrow** | Extend selection in arrow direction |
| **Ctrl + A** | Select all items (when filtering enabled) |

### Example: Multiple Selection with Item Display

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListBoxChangeEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="padding: 20px;">
      <h3>Select Multiple Items</h3>
      <ejs-listbox 
        [dataSource]="items"
        [selectionSettings]="{ mode: 'Multiple' }"
        (change)="onSelectionChange($event)">
      </ejs-listbox>
      
      <div *ngIf="selectedItems.length > 0" style="margin-top: 20px;">
        <h4>Selected ({{ selectedItems.length }}):</h4>
        <ul>
          <li *ngFor="let item of selectedItems">{{ item['text'] }}</li>
        </ul>
      </div>
    </div>
  `
})
export class MultiSelectComponent implements OnInit {
  public items: any[] = [];
  public selectedItems: Object[] = [];

  ngOnInit(): void {
    this.items = [
      { text: 'JavaScript', id: 'js' },
      { text: 'TypeScript', id: 'ts' },
      { text: 'Angular', id: 'ang' },
      { text: 'React', id: 'react' },
      { text: 'Vue', id: 'vue' }
    ];
  }

  onSelectionChange(args: ListBoxChangeEventArgs): void {
    this.selectedItems = args.items;
  }
}
```

---

## Checkbox Selection

Checkbox selection provides a visual and intuitive way for users to select items. Each item displays a checkbox that users can click or use keyboard to toggle.

### Enable Checkbox Selection

Set `showCheckbox` to `true` in `selectionSettings`:

> **Note:** To enable checkbox selection, you must inject `CheckBoxSelection` into `ListBoxComponent`.

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxComponent, CheckBoxSelection, ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

ListBoxComponent.Inject(CheckBoxSelection);

@Component({
  selector: 'app-checkbox-select',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <ejs-listbox 
      [dataSource]="items"
      [selectionSettings]="{ 
        mode: 'Multiple', 
        showCheckbox: true 
      }">
    </ejs-listbox>
  `
})
export class CheckboxSelectComponent implements OnInit {
  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      { text: 'Feature 1', id: 'f1' },
      { text: 'Feature 2', id: 'f2' },
      { text: 'Feature 3', id: 'f3' },
      { text: 'Feature 4', id: 'f4' }
    ];
  }
}
```

### User Interaction
- Click checkbox to toggle item selection
- Click item text to also toggle checkbox
- Checkbox provides clear visual feedback of selection state

---

## Select All Feature

The "Select All" feature displays a checkbox at the top to select or deselect all items at once.

### Enable Select All

Set `showSelectAll` to `true` in `selectionSettings`:

```typescript
[selectionSettings]="{ 
  mode: 'Multiple', 
  showCheckbox: true, 
  showSelectAll: true 
}"
```

### Complete Example: Checkbox with Select All

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxComponent, CheckBoxSelection, ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListBoxChangeEventArgs } from '@syncfusion/ej2-dropdowns';

ListBoxComponent.Inject(CheckBoxSelection);

@Component({
  selector: 'app-select-all',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="padding: 20px;">
      <h3>Select Items with Checkbox</h3>
      <ejs-listbox 
        #listbox
        [dataSource]="items"
        [selectionSettings]="{ 
          mode: 'Multiple', 
          showCheckbox: true, 
          showSelectAll: true 
        }"
        (change)="onSelectionChange($event)">
      </ejs-listbox>
      
      <div style="margin-top: 20px;">
        <p><strong>Selected: {{ selectedValues.length }} of {{ items.length }}</strong></p>
        <button (click)="selectAllItems()" style="margin-right: 10px;">
          Select All Programmatically
        </button>
        <button (click)="clearSelection()">Clear Selection</button>
      </div>
    </div>
  `
})
export class SelectAllComponent implements OnInit {
  @ViewChild('listbox') listbox: any;
  
  public items: any[] = [];
  public selectedValues: string[] = [];

  ngOnInit(): void {
    this.items = [
      { text: 'Permissions', id: 'perm' },
      { text: 'Users', id: 'users' },
      { text: 'Roles', id: 'roles' },
      { text: 'Settings', id: 'settings' },
      { text: 'Dashboard', id: 'dashboard' }
    ];
  }

  onSelectionChange(args: ListBoxChangeEventArgs): void {
    this.selectedValues = args.value as string[];
  }

  selectAllItems(): void {
    this.listbox.selectAll(true);
  }

  clearSelection(): void {
    this.listbox.selectAll(false);
  }
}
```

---

## Handling Change Events

The `change` event fires whenever the selection state changes. Use this to react to user selections.

### Change Event Structure (`ListBoxChangeEventArgs`)

```typescript
interface ListBoxChangeEventArgs {
  value: number[] | string[] | boolean[];  // Selected values
  items: Object[];                          // Selected item data objects
  elements: Element[];                      // Selected item DOM elements
  event: Event;                             // Original browser event
  name: string;                             // Event name ('change')
}
```

### Example: Handle Selection Changes

```typescript
import { ListBoxChangeEventArgs } from '@syncfusion/ej2-dropdowns';

export class ListBoxComponent {
  public items = [
    { text: 'Document', id: 'doc' },
    { text: 'Archive', id: 'arch' },
    { text: 'Backup', id: 'back' }
  ];
  public selectedValues: string[] = [];

  onSelectionChange(args: ListBoxChangeEventArgs): void {
    this.selectedValues = args.value as string[];
    
    // Log changes
    console.log('Selected values:', args.value);
    console.log('Selected items:', args.items);
    
    // Perform action based on selection
    if (this.selectedValues.includes('doc')) {
      console.log('Document selected - can edit');
    }
  }
}
```

---

## Getting Selected Items

### Access Selected Items via ViewChild

Get reference to the ListBox component and access selected items programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ListBoxComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-get-selection',
  template: `
    <ejs-listbox 
      #myListBox
      [dataSource]="items"
      [selectionSettings]="{ mode: 'Multiple' }">
    </ejs-listbox>
    <button (click)="getSelection()">Get Selected Items</button>
  `
})
export class GetSelectionComponent {
  @ViewChild('myListBox') listbox!: ListBoxComponent;
  
  public items = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' },
    { text: 'Item 3', id: '3' }
  ];

  getSelection(): void {
    // Access the value property to get selected values
    const selected = this.listbox.value; // Array of selected values
    
    console.log('Values:', selected);
  }
}
```

### Component Properties for Selection

| Property | Returns | Purpose |
|----------|---------|---------|
| **`value`** | `string[] \| number[] \| boolean[]` | Selected values (from `fields.value`) |

### Example: Working with Selected Values

```typescript
export class FormSubmitComponent {
  @ViewChild('listbox') listbox: any;
  
  submitForm(): void {
    // Get just the selected values
    const selectedValues = this.listbox.value;
    
    // Submit to API
    const formData = {
      userId: 123,
      preferences: selectedValues
    };
    
    console.log('Form data:', formData);
    // Send to backend: this.apiService.savePreferences(formData).subscribe(...);
  }
}
```

---

## Common Selection Patterns

### Pattern 1: Dependent Selection
Select items from one list based on another list:

```typescript
export class DependentSelectionComponent {
  categories = ['Electronics', 'Clothing', 'Books'];
  products: any[] = [];

  onCategorySelect(category: string): void {
    // Update products list based on selected category
    this.products = this.getProductsByCategory(category);
  }
}
```

### Pattern 2: Max Selection
Limit the number of items users can select using the `maximumSelectionLength` property:

```typescript
@Component({
  template: `
    <ejs-listbox
      [dataSource]="items"
      [maximumSelectionLength]="3"
      [selectionSettings]="{ mode: 'Multiple' }"
      (change)="onSelectionChange($event)">
    </ejs-listbox>
  `
})
export class MaxSelectionComponent {
  public items = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' },
    { text: 'Item 3', id: '3' },
    { text: 'Item 4', id: '4' }
  ];
  public selectedValues: string[] = [];

  onSelectionChange(args: ListBoxChangeEventArgs): void {
    this.selectedValues = args.value as string[];
    console.log('Selected:', this.selectedValues);
  }
}
```

---

## Troubleshooting

**Q: Multiple selection not working**
A: Ensure `mode` is set to `'Multiple'` in `selectionSettings`

**Q: Checkboxes not showing**
A: Verify `CheckBoxSelection` is injected: `ListBoxComponent.Inject(CheckBoxSelection)` (import `CheckBoxSelection` from `@syncfusion/ej2-angular-dropdowns`)

**Q: Select All button missing**
A: Set both `showCheckbox: true` and `showSelectAll: true`

**Q: Change event not firing**
A: Ensure `(change)` event handler is properly bound and method is defined

---

## Next Steps

- Learn about [data-binding.md](data-binding.md) to populate ListBox dynamically
- Explore [drag-and-drop-features.md](drag-and-drop-features.md) for interaction patterns
- Check [customization.md](customization.md) to style selection checkboxes
