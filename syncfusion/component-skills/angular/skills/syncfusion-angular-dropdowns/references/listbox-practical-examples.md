# Practical Implementation Examples for Syncfusion Angular ListBox

This guide contains real-world examples and common implementation patterns for the ListBox component.

## Example 1: Filtering ListBox Items

Allow users to filter ListBox items with a search input:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListBoxChangeEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-filtered-listbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ListBoxModule],
  template: `
    <div style="padding: 20px; max-width: 400px;">
      <h3>Search and Filter</h3>
      
      <input 
        type="text" 
        placeholder="Search items..."
        [(ngModel)]="searchTerm"
        (input)="updateFilteredItems()"
        style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
      
      <p style="font-size: 12px; color: #666; margin-bottom: 10px;">
        Showing {{ filteredItems.length }} of {{ allItems.length }} items
      </p>
      
      <ejs-listbox 
        [dataSource]="filteredItems"
        [selectionSettings]="{ mode: 'Multiple' }"
        (change)="onSelect($event)"
        height="300px">
      </ejs-listbox>
      
      <div *ngIf="selectedItems.length > 0" style="margin-top: 15px;">
        <strong>Selected ({{ selectedItems.length }}):</strong>
        <ul style="margin-top: 10px; font-size: 14px;">
          <li *ngFor="let item of selectedItems">{{ item.text }}</li>
        </ul>
      </div>
    </div>
  `
})
export class FilteredListBoxComponent implements OnInit {
  public allItems: any[] = [];
  public filteredItems: any[] = [];
  public selectedItems: Object[] = [];
  public searchTerm: string = '';

  ngOnInit(): void {
    this.allItems = [
      { text: 'JavaScript', id: 'js' },
      { text: 'TypeScript', id: 'ts' },
      { text: 'Angular', id: 'ang' },
      { text: 'React', id: 'react' },
      { text: 'Vue', id: 'vue' },
      { text: 'Python', id: 'py' },
      { text: 'Java', id: 'java' },
      { text: 'C#', id: 'cs' },
      { text: 'PHP', id: 'php' },
      { text: 'Ruby', id: 'ruby' }
    ];
    
    this.filteredItems = [...this.allItems];
  }

  updateFilteredItems(): void {
    if (!this.searchTerm.trim()) {
      this.filteredItems = [...this.allItems];
    } else {
      this.filteredItems = this.allItems.filter(item =>
        item.text.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    // Reset selection when filter changes
    this.selectedItems = [];
  }

  onSelect(args: ListBoxChangeEventArgs): void {
    this.selectedItems = args.items;
  }
}
```

**Use Case**: Selecting preferences, filtering users, or searching products

---

## Example 2: Form Submission with ListBox

Use ListBox in a form and submit selected items:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListBoxComponent, CheckBoxSelection, ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

ListBoxComponent.Inject(CheckBoxSelection);

@Component({
  selector: 'app-form-submit',
  standalone: true,
  imports: [CommonModule, FormsModule, ListBoxModule],
  template: `
    <div style="padding: 20px; max-width: 500px;">
      <h2>User Permissions Form</h2>
      
      <form (ngSubmit)="submitForm()">
        <!-- User Name Input -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: bold;">
            User Name:
          </label>
          <input 
            type="text" 
            [(ngModel)]="formData.userName"
            name="userName"
            placeholder="Enter username"
            required
            style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        
        <!-- Permissions ListBox -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: bold;">
            Select Permissions:
          </label>
          <ejs-listbox 
            #permissionList
            [dataSource]="permissions"
            [selectionSettings]="{ mode: 'Multiple', showCheckbox: true }"
            height="250px">
          </ejs-listbox>
        </div>
        
        <!-- Submit Button -->
        <button 
          type="submit"
          [disabled]="!formData.userName.trim()"
          style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Save User Permissions
        </button>
      </form>
      
      <!-- Success Message -->
      <div *ngIf="submitted" style="margin-top: 20px; padding: 12px; background: #d4edda; color: #155724; border-radius: 4px;">
        ✓ User {{ formData.userName }} permissions saved successfully!
      </div>
    </div>
  `
})
export class FormSubmitComponent implements OnInit {
  permissions: any[] = [];
  formData = { userName: '' };
  submitted: boolean = false;

  ngOnInit(): void {
    this.permissions = [
      { text: 'View Reports', id: 'view' },
      { text: 'Create Reports', id: 'create' },
      { text: 'Edit Reports', id: 'edit' },
      { text: 'Delete Reports', id: 'delete' },
      { text: 'Manage Users', id: 'manage' }
    ];
  }

  submitForm(): void {
    const selectedPermissions = (this.permissionList as any).value;
    
    const payload = {
      userName: this.formData.userName,
      permissions: selectedPermissions
    };
    
    console.log('Submitting:', payload);
    
    // Call API to save
    // this.apiService.saveUser(payload).subscribe(
    //   response => {
    //     this.submitted = true;
    //     setTimeout(() => this.submitted = false, 3000);
    //   }
    // );
    
    this.submitted = true;
    setTimeout(() => this.submitted = false, 3000);
  }
}
```

**Use Case**: Permissions, preferences, or multi-select forms

---

## Example 3: Enable/Disable Items Conditionally

Disable specific items based on conditions:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-enable-disable',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="padding: 20px; max-width: 500px;">
      <h3>Items with Enable/Disable Status</h3>
      
      <ng-template #itemTemplate let-data>
        <div [style.opacity]="data.enabled ? '1' : '0.5'"
             [style.pointer-events]="data.enabled ? 'auto' : 'none'">
          <strong>{{ data.text }}</strong>
          <span *ngIf="!data.enabled" 
                style="font-size: 12px; color: #999; margin-left: 10px;">
            (Unavailable)
          </span>
        </div>
      </ng-template>
      
      <ejs-listbox 
        [dataSource]="items"
        [itemTemplate]="itemTemplate"
        [selectionSettings]="{ mode: 'Multiple' }"
        height="300px">
      </ejs-listbox>
      
      <div style="margin-top: 20px;">
        <button (click)="toggleFeature('premium')" style="margin-right: 10px;">
          Toggle Premium Features
        </button>
        <button (click)="toggleFeature('beta')">
          Toggle Beta Features
        </button>
      </div>
    </div>
  `
})
export class EnableDisableComponent implements OnInit {
  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      { text: 'Basic Feature', id: 'basic', enabled: true, feature: 'basic' },
      { text: 'Advanced Feature', id: 'adv', enabled: false, feature: 'premium' },
      { text: 'Export to PDF', id: 'pdf', enabled: false, feature: 'premium' },
      { text: 'Beta: AI Assistant', id: 'ai', enabled: false, feature: 'beta' },
      { text: 'Beta: Dark Mode', id: 'dark', enabled: false, feature: 'beta' }
    ];
  }

  toggleFeature(featureName: string): void {
    this.items = this.items.map(item => 
      item.feature === featureName 
        ? { ...item, enabled: !item.enabled }
        : item
    );
  }
}
```

**Use Case**: License tiers, feature flags, availability management

---

## Example 4: ListBox with Scroller for Large Datasets

Handle large datasets with scrolling by setting a fixed `height`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-scroller-list',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <div style="padding: 20px; max-width: 400px;">
      <h3>Large Dataset with Scrolling</h3>
      <p style="color: #666;">{{ items.length }} items available</p>
      
      <ejs-listbox 
        [dataSource]="items"
        [selectionSettings]="{ mode: 'Multiple' }"
        height="400px">
      </ejs-listbox>
    </div>
  `
})
export class ScrollerListComponent implements OnInit {
  public items: any[] = [];

  ngOnInit(): void {
    // Generate 1000 items
    this.items = Array.from({ length: 1000 }, (_, i) => ({
      text: `Item ${i + 1}`,
      id: `item-${i + 1}`
    }));
  }
}
```

**Use Case**: Long lists of countries, products, users

---

## Example 5: Dual ListBox for Item Transfer

Transfer items between two lists:

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-dual-transfer',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="padding: 20px; max-width: 900px;">
      <h2>Configure Access</h2>
      <p style="color: #666; margin-bottom: 20px;">
        Drag items between lists to grant or revoke access
      </p>
      
      <div style="display: flex; gap: 40px;">
        <!-- Available Access List -->
        <div style="flex: 1;">
          <h4>Available Access</h4>
          <p style="font-size: 12px; color: #999;">{{ availableAccess.length }} items</p>
          <ejs-listbox 
            #available
            [dataSource]="availableAccess"
            scope="access-transfer"
            [allowDragAndDrop]="true"
            [selectionSettings]="{ mode: 'Multiple' }"
            height="350px">
          </ejs-listbox>
        </div>
        
        <!-- Granted Access List -->
        <div style="flex: 1;">
          <h4>Granted Access</h4>
          <p style="font-size: 12px; color: #999;">{{ grantedAccess.length }} items</p>
          <ejs-listbox 
            #granted
            [dataSource]="grantedAccess"
            scope="access-transfer"
            [allowDragAndDrop]="true"
            [selectionSettings]="{ mode: 'Multiple' }"
            height="350px">
          </ejs-listbox>
        </div>
      </div>
      
      <div style="margin-top: 20px;">
        <button (click)="saveAccess()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Save Configuration
        </button>
      </div>
    </div>
  `
})
export class DualTransferComponent implements OnInit {
  @ViewChild('available') availableList: any;
  @ViewChild('granted') grantedList: any;
  
  public availableAccess: any[] = [];
  public grantedAccess: any[] = [];

  ngOnInit(): void {
    this.availableAccess = [
      { text: 'Read Files', id: 'read' },
      { text: 'Write Files', id: 'write' },
      { text: 'Delete Files', id: 'delete' },
      { text: 'Manage Users', id: 'manage' },
      { text: 'View Logs', id: 'logs' },
      { text: 'Export Data', id: 'export' }
    ];
  }

  saveAccess(): void {
    const grantedIds = this.grantedAccess.map(item => item.id);
    console.log('Granted access:', grantedIds);
    // Call API to save
  }
}
```

**Use Case**: Permission assignment, feature enablement, configuration

---

## Example 6: Dependent ListBox Cascading

Populate one ListBox based on selection in another:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListBoxChangeEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-dependent-listbox',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="padding: 20px; max-width: 600px;">
      <h3>Select Country and City</h3>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">
          Countries:
        </label>
        <ejs-listbox 
          [dataSource]="countries"
          (change)="onCountrySelect($event)"
          height="150px">
        </ejs-listbox>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">
          Cities:
        </label>
        <ejs-listbox 
          [dataSource]="filteredCities"
          height="150px">
        </ejs-listbox>
      </div>
      
      <div *ngIf="selectedCountry" style="margin-top: 20px; padding: 12px; background: #e7f3ff; border-radius: 4px;">
        <strong>Selected Country:</strong> {{ selectedCountry }}
      </div>
    </div>
  `
})
export class DependentListBoxComponent implements OnInit {
  public countries: string[] = [];
  public citiesByCountry: { [key: string]: string[] } = {};
  public filteredCities: string[] = [];
  public selectedCountry: string = '';

  ngOnInit(): void {
    this.countries = ['USA', 'Canada', 'UK', 'Australia'];
    
    this.citiesByCountry = {
      'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
      'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
      'UK': ['London', 'Manchester', 'Birmingham', 'Leeds'],
      'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth']
    };
  }

  onCountrySelect(args: ListBoxChangeEventArgs): void {
    this.selectedCountry = (args.value as string[])[0];
    this.filteredCities = this.citiesByCountry[this.selectedCountry] || [];
  }
}
```

**Use Case**: Location selection, product categories, hierarchical data

---

## Example 7: Group by Category with Icons

Display grouped items with icons:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-grouped-icons',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <ng-template #groupedTemplate let-data>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
        <span [class]="'e-icons ' + data.icon" style="font-size: 16px;"></span>
        <div>
          <div style="font-weight: 500;">{{ data.name }}</div>
          <div style="font-size: 11px; color: #999;">{{ data.category }}</div>
        </div>
      </div>
    </ng-template>
    
    <div style="padding: 20px;">
      <h3>Browse Files by Type</h3>
      <ejs-listbox 
        [dataSource]="files"
        [fields]="{ text: 'name', groupBy: 'category' }"
        [itemTemplate]="groupedTemplate"
        height="350px">
      </ejs-listbox>
    </div>
  `
})
export class GroupedIconsComponent implements OnInit {
  public files: any[] = [];

  ngOnInit(): void {
    this.files = [
      { name: 'Document.pdf', category: 'Documents', icon: 'e-document' },
      { name: 'Presentation.pptx', category: 'Documents', icon: 'e-document' },
      { name: 'Spreadsheet.xlsx', category: 'Documents', icon: 'e-document' },
      
      { name: 'Photo1.jpg', category: 'Images', icon: 'e-image' },
      { name: 'Photo2.png', category: 'Images', icon: 'e-image' },
      
      { name: 'Song1.mp3', category: 'Music', icon: 'e-music' },
      { name: 'Song2.wav', category: 'Music', icon: 'e-music' },
      
      { name: 'Video1.mp4', category: 'Videos', icon: 'e-video' }
    ];
  }
}
```

**Use Case**: File browsers, product catalogs, media libraries

---

## Common Patterns Summary

| Pattern | Use When | See Example |
|---------|----------|-------------|
| **Filtering** | Need to search/filter list | Example 1 |
| **Forms** | Submitting selections | Example 2 |
| **Enable/Disable** | Conditional availability | Example 3 |
| **Scrolling** | Large datasets (1000+) | Example 4 |
| **Dual Transfer** | Moving items between lists | Example 5 |
| **Cascading** | Dependent selections | Example 6 |
| **Grouping** | Organized categories | Example 7 |

---

## Performance Tips

1. **Large Lists**: Set a fixed `height` to enable scrolling and limit visible items
2. **Filtering**: Debounce search input to avoid excessive filtering
3. **Lazy Loading**: Load data in chunks using `Query.take()` with `DataManager`
4. **Templates**: Keep item templates simple for better rendering performance

---

## Next Steps

- Review [selection-modes.md](selection-modes.md) for selection patterns
- Explore [data-binding.md](data-binding.md) for data sources
- See [customization.md](customization.md) for styling options
