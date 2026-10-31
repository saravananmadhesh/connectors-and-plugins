# How-To Guides for Syncfusion Angular ListBox

## Table of Contents
- [Add Items Programmatically](#add-items-programmatically)
- [Select Items Programmatically](#select-items-programmatically)
- [Enable or Disable Items](#enable-or-disable-items)
- [Enable Scroller for Large Lists](#enable-scroller-for-large-lists)
- [Filter ListBox Data](#filter-listbox-data)
- [Form Submission](#form-submission)

---

## Add Items Programmatically

Dynamically add items to the ListBox using the `addItems` method after initialization.

### Basic Usage

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-add-items',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <div style="padding: 20px;">
      <h3>Add Items Example</h3>
      
      <ejs-listbox 
        #myListBox
        [dataSource]="initialItems"
        height="250px">
      </ejs-listbox>
      
      <button (click)="addMoreItems()" style="margin-top: 15px; padding: 8px 16px;">
        Add Items
      </button>
    </div>
  `
})
export class AddItemsComponent implements OnInit {
  @ViewChild('myListBox') listbox: any;
  
  public initialItems: any[] = [];

  ngOnInit(): void {
    this.initialItems = [
      { text: 'Hennessey Venom', id: 'list-01' },
      { text: 'Bugatti Chiron', id: 'list-02' },
      { text: 'Aston Martin One-77', id: 'list-07' }
    ];
  }

  addMoreItems(): void {
    // Define new items to add
    const newItems = [
      { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
      { text: 'SSC Ultimate Aero', id: 'list-04' }
    ];
    
    // Use addItems method to add to ListBox
    this.listbox.addItems(newItems);
  }
}
```

### Key Points

- **`addItems(items)`**: Method to add one or more items to the ListBox
- Items are appended to the existing list
- Works with both simple strings and complex objects
- Use this when populating data dynamically from user input or API responses

### Real-World Example: Dynamic Form Input

```typescript
export class DynamicAddComponent {
  @ViewChild('listbox') listbox: any;
  
  public items: any[] = [];
  public newItemName: string = '';

  addItemFromInput(): void {
    if (this.newItemName.trim()) {
      // Create new item object
      const newItem = {
        text: this.newItemName,
        id: 'item-' + Date.now()
      };
      
      // Add to ListBox
      this.listbox.addItems([newItem]);
      
      // Clear input
      this.newItemName = '';
    }
  }
}
```

---

## Select Items Programmatically

Automatically select specific items in the ListBox using the `selectItems` method.

### Basic Usage

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-select-items',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <div style="padding: 20px;">
      <h3>Select Items Example</h3>
      
      <ejs-listbox 
        #myListBox
        [dataSource]="vehicles"
        height="250px">
      </ejs-listbox>
      
      <button (click)="selectSpecificItems()" style="margin-top: 15px; padding: 8px 16px;">
        Select Bugatti Chiron
      </button>
    </div>
  `
})
export class SelectItemsComponent implements OnInit {
  @ViewChild('myListBox') listbox: any;
  
  public vehicles: any[] = [];

  ngOnInit(): void {
    this.vehicles = [
      { text: 'Hennessey Venom', id: 'list-01' },
      { text: 'Bugatti Chiron', id: 'list-02' },
      { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
      { text: 'SSC Ultimate Aero', id: 'list-04' },
      { text: 'Koenigsegg CCR', id: 'list-05' }
    ];
  }

  selectSpecificItems(): void {
    // Select items by text values
    this.listbox.selectItems(['Bugatti Chiron']);
  }
}
```

### Selecting by Value

```typescript
selectByValue(): void {
  // Select items by their value field (set isValue = true)
  this.listbox.selectItems(['list-02', 'list-03'], true, true);
}
```

### Key Points

- **`selectItems(items, state?, isValue?)`**: Select items by text (default) or value
- `state` parameter: `true` to select (default), `false` to deselect
- `isValue` parameter: `false` (default) = match by text, `true` = match by value field
- Works with single or multiple items
- Previously selected items are deselected unless `selectionSettings.mode` is `'Multiple'`

### Real-World Example: Pre-select Default Permissions

```typescript
export class PreSelectComponent implements OnInit {
  @ViewChild('listbox') listbox: any;
  
  public permissions: any[] = [];

  ngOnInit(): void {
    this.permissions = [
      { text: 'View', id: 'view' },
      { text: 'Edit', id: 'edit' },
      { text: 'Delete', id: 'delete' },
      { text: 'Share', id: 'share' }
    ];
    
    // Pre-select default permissions after list renders
    setTimeout(() => {
      this.listbox.selectItems(['View', 'Edit']);
    }, 100);
  }
}
```

---

## Enable or Disable Items

Control the enabled/disabled state of items using the `enableItems` method.

### Basic Usage

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-enable-disable',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <div style="padding: 20px;">
      <h3>Enable/Disable Items</h3>
      
      <ejs-listbox 
        #myListBox
        [dataSource]="items"
        height="250px">
      </ejs-listbox>
      
      <div style="margin-top: 15px;">
        <button (click)="enableItems()" style="margin-right: 10px;">
          Enable Items
        </button>
        <button (click)="disableItems()">
          Disable Items
        </button>
      </div>
    </div>
  `
})
export class EnableDisableComponent implements OnInit {
  @ViewChild('myListBox') listbox: any;
  
  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      { text: 'Item 1', id: '1' },
      { text: 'Item 2 (Disabled)', id: '2' },
      { text: 'Item 3', id: '3' },
      { text: 'Item 4 (Disabled)', id: '4' }
    ];
  }

  enableItems(): void {
    // Enable specific items by text
    this.listbox.enableItems(['Item 2 (Disabled)', 'Item 4 (Disabled)'], true);
  }

  disableItems(): void {
    // Disable specific items by text
    this.listbox.enableItems(['Item 2 (Disabled)', 'Item 4 (Disabled)'], false);
  }
}
```

### Disable by Value

```typescript
disableByValue(): void {
  // Disable items by their value field (set isValue = true)
  this.listbox.enableItems(['2', '4'], false, true);
}
```

### Key Points

- **`enableItems(items, enable?, isValue?)`**: Enable or disable items
- `enable`: `true` to enable, `false` to disable
- `isValue`: `false` (default) = match by text, `true` = match by value field
- Disabled items appear grayed out and cannot be selected
- Use for permission management or conditional availability

### Real-World Example: Feature License Management

```typescript
export class LicenseFeatureComponent implements OnInit {
  @ViewChild('listbox') listbox: any;
  
  public features: any[] = [];
  public userPlan: string = 'basic';

  ngOnInit(): void {
    this.features = [
      { text: 'Basic Reports', id: 'basic' },
      { text: 'Advanced Reports', id: 'advanced' },
      { text: 'Custom Dashboards', id: 'dashboards' },
      { text: 'API Access', id: 'api' }
    ];
    
    this.updateFeatureAccess();
  }

  updateFeatureAccess(): void {
    if (this.userPlan === 'basic') {
      // Disable premium features
      this.listbox.enableItems([
        'Advanced Reports',
        'Custom Dashboards',
        'API Access'
      ], false);
    } else if (this.userPlan === 'pro') {
      // Enable all features
      this.listbox.enableItems([
        'Advanced Reports',
        'Custom Dashboards',
        'API Access'
      ], true);
    }
  }

  upgradePlan(): void {
    this.userPlan = 'pro';
    this.updateFeatureAccess();
  }
}
```

---

## Enable Scroller for Large Lists

Handle large datasets by restricting height and enabling scrolling.

### Basic Usage

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-scroller',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <div style="padding: 20px;">
      <h3>ListBox with Scroller</h3>
      <p>Restricted height enables scrolling for large datasets</p>
      
      <ejs-listbox 
        [dataSource]="largeList"
        height="290px">
      </ejs-listbox>
    </div>
  `
})
export class ScrollerComponent implements OnInit {
  public largeList: any[] = [];

  ngOnInit(): void {
    // Generate large dataset
    this.largeList = Array.from({ length: 100 }, (_, i) => ({
      text: `Item ${i + 1}`,
      id: `item-${i + 1}`
    }));
  }
}
```

### Key Points

- **`height`** property: Set pixel value to enable scrolling
- Without height restriction, ListBox displays all items
- Recommended heights: 200-400px depending on design
- Scrollbar appears automatically when content exceeds height
- Works with virtual scrolling for performance

### Performance Tip

For large datasets, restrict the ListBox height so the scrollbar appears and only a portion of items are visible at a time:

```typescript
@Component({
  template: `
    <ejs-listbox 
      [dataSource]="items"
      height="350px">
    </ejs-listbox>
  `
})
export class LargeListScrollerComponent {
  public items: any[] = [];

  ngOnInit(): void {
    this.items = Array.from({ length: 1000 }, (_, i) => ({
      text: `Item ${i + 1}`,
      id: `item-${i + 1}`
    }));
  }
}
```

---

## Filter ListBox Data

Filter items based on user input using the `filter` method.

### Basic Usage with TextBox

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ListBoxModule, TextBoxModule],
  template: `
    <div style="padding: 20px; max-width: 400px;">
      <h3>Filter ListBox</h3>
      
      <input 
        type="text" 
        [(ngModel)]="filterText"
        (keyup)="onFilterChange()"
        placeholder="Type to filter..."
        style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
      
      <ejs-listbox 
        #myListBox
        [dataSource]="filteredItems"
        height="300px">
      </ejs-listbox>
    </div>
  `
})
export class FilterComponent implements OnInit {
  @ViewChild('myListBox') listbox: any;
  
  public allItems: any[] = [];
  public filteredItems: any[] = [];
  public filterText: string = '';

  ngOnInit(): void {
    this.allItems = [
      { text: 'JavaScript', id: 'js' },
      { text: 'TypeScript', id: 'ts' },
      { text: 'Java', id: 'java' },
      { text: 'Python', id: 'py' },
      { text: 'C#', id: 'cs' },
      { text: 'C++', id: 'cpp' },
      { text: 'PHP', id: 'php' },
      { text: 'Ruby', id: 'ruby' }
    ];
    
    this.filteredItems = [...this.allItems];
  }

  onFilterChange(): void {
    if (!this.filterText.trim()) {
      this.filteredItems = [...this.allItems];
    } else {
      // Filter items based on text input
      this.filteredItems = this.allItems.filter(item =>
        item.text.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }
}
```

### Using ListBox `filter` Method with a Query

```typescript
import { Query } from '@syncfusion/ej2-data';

applyFilter(): void {
  // Use the filter method with a data source and query
  const query = new Query().where('text', 'contains', this.filterText, true);
  this.listbox.filter(this.allItems, query, { text: 'text', value: 'id' });
}
```

### Key Points

- **Manual filtering**: Update `dataSource` array based on input
- **ListBox `filter` method**: Accepts `(dataSource, query?, fields?)` — requires a full data source and optional `Query`
- Case-insensitive search for better UX
- Update UI dynamically as user types
- Debounce for performance with large lists

---

## Form Submission

Submit selected ListBox items with a form.

### Basic Form Submission

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListBoxComponent, CheckBoxSelection, ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

ListBoxComponent.Inject(CheckBoxSelection);

@Component({
  selector: 'app-form-submit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ListBoxModule],
  template: `
    <form (ngSubmit)="submitForm()" style="padding: 20px; max-width: 400px;">
      <h3>User Preferences Form</h3>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">
          Name:
        </label>
        <input 
          type="text" 
          [(ngModel)]="formData.name"
          name="name"
          placeholder="Enter your name"
          required
          style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">
          Interests:
        </label>
        <ejs-listbox 
          #interestList
          [dataSource]="interests"
          [selectionSettings]="{ mode: 'Multiple', showCheckbox: true }"
          height="200px">
        </ejs-listbox>
      </div>
      
      <button 
        type="submit"
        style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Submit
      </button>
    </form>
  `
})
export class FormSubmitComponent implements OnInit {
  @ViewChild('interestList') interestList: any;
  
  public formData = { name: '' };
  public interests: any[] = [];

  ngOnInit(): void {
    this.interests = [
      { text: 'Sports', id: 'sports' },
      { text: 'Music', id: 'music' },
      { text: 'Reading', id: 'reading' },
      { text: 'Gaming', id: 'gaming' },
      { text: 'Travel', id: 'travel' }
    ];
  }

  submitForm(): void {
    // Get selected interests
    const selectedInterests = this.interestList.value;
    
    const formPayload = {
      name: this.formData.name,
      interests: selectedInterests
    };
    
    console.log('Submitted:', formPayload);
    
    // Send to backend API
    // this.apiService.submitForm(formPayload).subscribe(...);
  }
}
```

### Get Selected Values

```typescript
// Get selected values (array of value field)
const selectedValues = this.listbox.value;
```

### Real-World Example: Multi-Step Form

```typescript
export class MultiStepFormComponent {
  @ViewChild('permissionList') permissionList: any;
  
  public formData: any = {};
  public currentStep: number = 1;

  goToNextStep(): void {
    if (this.currentStep === 1) {
      // Collect permissions
      this.formData.permissions = this.permissionList.value;
    }
    this.currentStep++;
  }

  submitCompleteForm(): void {
    const finalData = {
      userInfo: this.formData.userInfo,
      permissions: this.formData.permissions,
      preferences: this.formData.preferences
    };
    
    console.log('Complete form:', finalData);
  }
}
```

### Key Points

- **`value` property**: Array of selected item values — the primary way to retrieve selections
- Access via ViewChild reference to ListBox component
- Extract values before form submission
- Use form validation to ensure required selections

---

## Summary of Methods and Properties

| Method / Property | Purpose | Example |
|--------|---------|---------|
| **`addItems(items, itemIndex?)`** | Add items to ListBox | `listbox.addItems([{text: 'Item'}])` |
| **`selectItems(items, state?, isValue?)`** | Select items programmatically | `listbox.selectItems(['Item 1'])` |
| **`enableItems(items, enable?, isValue?)`** | Enable/disable items | `listbox.enableItems(['Item'], false)` |
| **`filter(dataSource, query?, fields?)`** | Filter items by data source and query | `listbox.filter(data, query, fields)` |
| **`selectAll(state?)`** | Select or deselect all items | `listbox.selectAll(true)` |
| **`value`** | Get/set selected values | `const vals = listbox.value` |

---

## Next Steps

- Review [practical-examples.md](practical-examples.md) for complete working implementations
- See [selection-modes.md](selection-modes.md) for selection patterns
- Explore [data-binding.md](data-binding.md) for dynamic data sources
