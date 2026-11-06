# Advanced Feature Configuration

## Table of Contents
- [Disabled State](#disabled-state)
- [Read-Only Mode](#read-only-mode)
- [Virtual Scrolling](#virtual-scrolling)
- [Resizing](#resizing)
- [Allow Custom Values](#allow-custom-values)
- [RTL Support](#rtl-support)
- [Styling & Themes](#styling--themes)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Disabled State

### Disable Entire Component

**Use when:** ComboBox should not be interactive (loading, permission-based access)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-disabled',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="items"
      [enabled]="isEnabled"
      placeholder="Select item">
    </ejs-combobox>
    
    <button (click)="toggleEnabled()">
      {{ isEnabled ? 'Disable' : 'Enable' }}
    </button>
  `
})
export class DisabledComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  isEnabled = true;

  toggleEnabled() {
    this.isEnabled = !this.isEnabled;
  }
}
```

**Visual behavior when disabled:**
- Grayed out appearance
- No mouse interactions
- Keyboard navigation disabled
- Cannot open dropdown

---

### Disable Specific Items

**Use when:** Some items are unavailable but component is still usable

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="products"
      fields="{ text: 'name', value: 'id', disabled: 'isDisabled' }"
      placeholder="Select product">
    </ejs-combobox>
  `
})
export class SelectiveDisabledComponent {
  products = [
    { id: 1, name: 'Laptop', isDisabled: false },
    { id: 2, name: 'Monitor', isDisabled: true },  // Disabled (grayed out)
    { id: 3, name: 'Mouse', isDisabled: false }
  ];
}
```

**Display:**
```
✓ Laptop (clickable)
✗ Monitor (grayed out, cannot select)
✓ Mouse (clickable)
```

---

### Disable Based on Conditions

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="getAvailableItems()"
      placeholder="Select">
    </ejs-combobox>
  `
})
export class ConditionalDisabledComponent {
  allItems = [
    { id: 1, name: 'Standard', type: 'free' },
    { id: 2, name: 'Premium', type: 'paid', requiredPlan: 'pro' },
    { id: 3, name: 'Enterprise', type: 'paid', requiredPlan: 'enterprise' }
  ];
  
  userPlan = 'free';

  getAvailableItems() {
    return this.allItems.filter(item => {
      if (item.type === 'free') return true;
      if (item.type === 'paid' && this.userPlan === 'pro') return true;
      if (item.requiredPlan === this.userPlan) return true;
      return false;
    });
  }
}
```

---

## Read-Only Mode

**Use when:** Value is set but cannot be changed by user

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [readonly]="true"
      [(ngModel)]="selectedValue"
      placeholder="Select item">
    </ejs-combobox>
  `
})
export class ReadOnlyComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  selectedValue = 'Item 1';  // Pre-selected, cannot change
}
```

**Difference from disabled:**
| Aspect | Read-Only | Disabled |
|--------|-----------|----------|
| Visual | Normal appearance | Grayed out |
| Keyboard | Tab navigation works | No interaction |
| Copy/Select | Can select text | Cannot interact |
| Form submit | Included | Not included |

---

### Read-Only with Display Only

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [readonly]="true"
      [(ngModel)]="selectedValue"
      [allowFiltering]="false"
      placeholder="Your selection">
    </ejs-combobox>
  `
})
export class DisplayOnlyComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  selectedValue = 'Item 2';
}
```

---

## Virtual Scrolling

### Enable Virtual Scrolling

**Use when:** You have 10,000+ items (performance optimization)

> **Important:** Virtual scrolling requires injecting the `VirtualScroll` service into `ComboBoxComponent` before use. This must be done once at the application or module level.

**Key points:**
- Import both `ComboBoxComponent` and `VirtualScroll` from `@syncfusion/ej2-angular-dropdowns`
- Call `ComboBoxComponent.Inject(VirtualScroll)` **before** the component class definition
- Use `ComboBoxModule` in the `imports` array (supports `VirtualScroll` dependency resolution)
- Set `[enableVirtualization]="true"` on the `<ejs-combobox>` element

**Benefits:**
- Only renders ~50 visible items at a time
- Remaining items loaded on scroll
- Instant dropdown opening
- Smooth scrolling performance

---

### Virtual Scrolling with Large Datasets

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';

// Inject VirtualScroll service — required for enableVirtualization to work
ComboBoxComponent.Inject(VirtualScroll);

@Component({
  selector: 'app-virtual-large',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="largeDataSet"
      [fields]="fields"
      [enableVirtualization]="true"
      popupHeight="300px"
      placeholder="Select from 10000 items...">
    </ejs-combobox>
  `
})
export class VirtualLargeComponent implements OnInit {
  public largeDataSet: { [key: string]: Object }[] = [];
  public fields: object = { text: 'text', value: 'id' };

  ngOnInit() {
    // Generate 10,000 items
    for (let i = 1; i <= 10000; i++) {
      this.largeDataSet.push({
        id: 'id' + i,
        text: `Item ${i}`
      });
    }
  }
}
```

---

### Virtual Scrolling with Remote Data

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

ComboBoxComponent.Inject(VirtualScroll);

@Component({
  selector: 'app-virtual-remote',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="dataManager"
      [enableVirtualization]="true"
      [fields]="fields"
      popupHeight="200px"
      placeholder="Loading...">
    </ejs-combobox>
  `
})
export class VirtualRemoteComponent {
  public fields: object = { text: 'productName', value: 'productId' };
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });
}
```

---

## Resizing

### Enable Auto Resize

**Use when:** ComboBox width should adapt to content or container

```typescript
@Component({
  template: `
    <div style="width: 100%; max-width: 400px;">
      <ejs-combobox
        [dataSource]="items"
        placeholder="Type to resize...">
      </ejs-combobox>
    </div>
  `
})
export class ResizeComponent {
  items = ['Short', 'Medium Length Item', 'Very Long Item Name'];
}
```

---

### Manual Width Control

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      width="300px"
      placeholder="Fixed width">
    </ejs-combobox>
  `
})
export class FixedWidthComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}
```

---

### Responsive Width

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [width]="'100%'"
      placeholder="Full width">
    </ejs-combobox>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class ResponsiveComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}
```

---

## Allow Custom Values

### Enable Custom Value Entry

**Use when:** Users can enter values not in the predefined list

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [allowCustom]="true"
      [(ngModel)]="selectedValue"
      placeholder="Select or type custom value">
    </ejs-combobox>
    
    <p>Selected: {{ selectedValue }}</p>
  `
})
export class CustomValueComponent {
  items = ['JavaScript', 'TypeScript', 'Python'];
  selectedValue = '';
}
```

**Behavior:**
- User can select from list
- Or type a custom value (not in list)
- Custom value is stored as-is

---

### Custom Value with Validation

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [allowCustom]="true"
      (change)="onValueChange($event)"
      placeholder="Enter skill">
    </ejs-combobox>
    
    <div *ngIf="customError" style="color: red;">
      {{ customError }}
    </div>
  `
})
export class ValidatedCustomComponent {
  items = ['JavaScript', 'TypeScript', 'Python'];
  customError = '';

  onValueChange(event: any) {
    const value = event.itemData;
    this.customError = '';

    // Validate custom values
    if (!this.items.includes(value)) {
      // Custom value entered
      if (value.length < 2) {
        this.customError = 'Must be at least 2 characters';
      } else if (!/^[a-zA-Z0-9\s\+\#]+$/.test(value)) {
        this.customError = 'Invalid characters';
      }
    }
  }
}
```

---

## RTL Support

### Enable Right-to-Left

**Use when:** Supporting Arabic, Hebrew, Persian, etc.

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [enableRtl]="true"
      placeholder="اختر عنصرا">
    </ejs-combobox>
  `
})
export class RTLComponent {
  items = ['عنصر 1', 'عنصر 2', 'عنصر 3'];
}
```

---

### RTL with Data Binding

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="countries"
      fields="{ text: 'ar_name', value: 'code' }"
      [enableRtl]="true"
      placeholder="اختر دولة">
    </ejs-combobox>
  `
})
export class RTLDataComponent {
  countries = [
    { code: 'sa', ar_name: 'المملكة العربية السعودية' },
    { code: 'ae', ar_name: 'الإمارات العربية المتحدة' },
    { code: 'eg', ar_name: 'مصر' }
  ];
}
```

---

## Styling & Themes

### Built-In Themes

**Available themes:**
- `bootstrap5.css` - Modern Bootstrap 5 style (default)
- `bootstrap.css` - Bootstrap 4 style
- `material.css` - Material Design
- `fabric.css` - Microsoft Fabric
- `fluent.css` - Fluent Design System
- `tailwind.css` - Tailwind CSS

```typescript
// In main.ts - choose ONE theme
import '@syncfusion/ej2-dropdowns/styles/bootstrap5.css';
```

---

### Custom CSS Class

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      cssClass="custom-combobox"
      placeholder="Styled">
    </ejs-combobox>
  `,
  styles: [`
    :host ::ng-deep .custom-combobox.e-combobox {
      border: 2px solid #007bff;
      border-radius: 8px;
    }
    
    :host ::ng-deep .custom-combobox .e-input-group {
      background: #f8f9fa;
    }
  `]
})
export class StyledComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}
```

---

### Theme Variables

```css
/* Override CSS variables for theme customization */
.custom-combobox {
  --e-primary-color: #007bff;
  --e-text-color: #333;
  --e-bg-color: #fff;
  --e-border-color: #ddd;
  --e-hover-bg: #f0f0f0;
}
```

---

### Dark Mode

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      cssClass="dark-theme"
      placeholder="Dark mode">
    </ejs-combobox>
  `,
  styles: [`
    :host ::ng-deep .dark-theme.e-combobox {
      background: #222;
      color: #fff;
    }
    
    :host ::ng-deep .dark-theme .e-popup {
      background: #333;
      color: #fff;
    }
  `]
})
export class DarkModeComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}
```

---

## Common Patterns

### Pattern 1: Loading State

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="filteredItems"
      [enabled]="!isLoading"
      placeholder="Select...">
    </ejs-combobox>
    
    <div *ngIf="isLoading" style="color: #999; font-size: 12px;">
      Loading...
    </div>
  `
})
export class LoadingComponent {
  items: any[] = [];
  filteredItems: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.items = ['Item 1', 'Item 2', 'Item 3'];
      this.filteredItems = [...this.items];
      this.isLoading = false;
    }, 2000);
  }
}
```

---

### Pattern 2: Error State

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [enabled]="!hasError"
      cssClass="error-state"
      placeholder="Select">
    </ejs-combobox>
    
    <div *ngIf="hasError" style="color: red; font-size: 12px;">
      ⚠️ {{ errorMessage }}
    </div>
  `,
  styles: [`
    :host ::ng-deep .error-state.e-combobox {
      border-color: #dc3545 !important;
    }
  `]
})
export class ErrorComponent {
  items: any[] = [];
  hasError = false;
  errorMessage = '';

  loadData() {
    try {
      // API call
      this.items = ['Item 1', 'Item 2'];
    } catch (error) {
      this.hasError = true;
      this.errorMessage = 'Failed to load data. Please try again.';
    }
  }
}
```

---

### Pattern 3: Mandatory Selection

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [(ngModel)]="selectedValue"
      placeholder="Select (required)"
      cssClass="mandatory">
    </ejs-combobox>
    
    <div *ngIf="!selectedValue && touched" style="color: red;">
      This field is required
    </div>
  `,
  styles: [`
    :host ::ng-deep .mandatory.e-combobox {
      border-color: #ff6b6b !important;
    }
  `]
})
export class MandatoryComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  selectedValue = '';
  touched = false;

  onBlur() {
    this.touched = true;
  }
}
```

---

## Troubleshooting

### Issue: Custom value not being accepted

**Cause:** `allowCustom` not enabled

**Fix:**
```typescript
<ejs-combobox
  [allowCustom]="true"  // Add this
  [(ngModel)]="selectedValue">
</ejs-combobox>
```

---

### Issue: RTL text reversed incorrectly

**Cause:** Missing `enableRtl` property

**Fix:**
```typescript
<ejs-combobox
  [dataSource]="items"
  [enableRtl]="true">  // Add this
</ejs-combobox>
```

---

### Issue: Virtual scrolling not working / shows blank

**Cause 1:** `VirtualScroll` service not injected

**Fix:**
```typescript
import { ComboBoxComponent, ComboBoxModule, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';

// Must be called before the component class — at module/app level
ComboBoxComponent.Inject(VirtualScroll);

@Component({
  imports: [ComboBoxModule],   // Use ComboBoxModule (not just ComboBoxComponent)
  ...
})
```

**Cause 2:** Items not loading or duplicate IDs

**Fix:**
```typescript
// Ensure items have unique IDs
records = [
  { id: 'id1', text: 'Item 1' },  // Unique IDs
  { id: 'id2', text: 'Item 2' }
];

// Enable virtual scrolling
[enableVirtualization]="true"
```

---

Advanced features configured! Move to [Form Support & Validation](../form-support-and-validation.md) to integrate with forms.
