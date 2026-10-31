# Item Templates & Components

## Table of Contents
- [Template Property Overview](#template-property-overview)
- [String Template](#string-template)
- [Query Selector Template](#query-selector-template)
- [Angular ng-template](#angular-ng-template)
- [Component Embedding](#component-embedding)
- [Menu Component Integration](#menu-component-integration)
- [Multiple Components](#multiple-components)
- [Template Best Practices](#template-best-practices)

## Template Property Overview

The `template` property enables custom rendering of toolbar items beyond standard buttons and separators. Templates support:

- HTML strings for simple structures
- Query selectors referencing DOM elements
- Angular `ng-template` directive for components
- Complex UI elements and interactions

### Template Types

| Type | Use Case | Example |
|------|----------|---------|
| String | Simple HTML inline | `template="<div>Content</div>"` |
| Query Selector | Reference external element | `template="#Template"` |
| ng-template | Angular components | `<ng-template #template>...</ng-template>` |

## String Template

Define template content as an HTML string directly.

### Simple String Template

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        <e-item text='Paste'></e-item>
        <e-item type='Separator'></e-item>
        <e-item [template]="checkboxTemplate"></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  checkboxTemplate: string = "<div><input type='checkbox' id='check1' checked=''>Accept</input></div>";
}
```

### Checkbox Template String

```typescript
checkboxTemplate: string = `
  <div class="toolbar-checkbox">
    <input type="checkbox" id="chk_accept" />
    <label for="chk_accept">Enable Feature</label>
  </div>
`;
```

### Custom Button Template

```typescript
customButtonTemplate: string = `
  <button class="e-btn e-outline">
    <span class="e-btn-icon">✓</span>
    Custom Action
  </button>
`;
```

## Query Selector Template

Reference external HTML elements using query selectors.

### Template with ID Selector

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <!-- External template definition -->
    <button id='Template' class='e-btn'>Template Button</button>

    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
        <e-item type='Separator'></e-item>
        <!-- Reference template by ID -->
        <e-item [template]="templateId"></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  templateId: string = '#Template';
}
```

### Template Element Definition

```typescript
template: `
  <div id='dropdown-template' class='e-toolbar-template'>
    <select id='languages'>
      <option>English</option>
      <option>Spanish</option>
      <option>French</option>
    </select>
  </div>

  <ejs-toolbar>
    <e-items>
      <e-item [template]="'#dropdown-template'"></e-item>
    </e-items>
  </ejs-toolbar>
`
```

## Angular ng-template

Use Angular's `ng-template` directive with `#template` reference for component rendering.

### Basic ng-template Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        <e-item text='Paste'></e-item>
        <e-item type='Separator'></e-item>
        
        <!-- ng-template for custom content -->
        <e-item>
          <ng-template #template>
            <div class="custom-content">
              <span>Custom Template Content</span>
            </div>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

### ng-template with Checkbox

```typescript
<e-item>
  <ng-template #template>
    <div class="checkbox-wrapper">
      <input type="checkbox" id="accept" />
      <label for="accept">Terms and Conditions</label>
    </div>
  </ng-template>
</e-item>
```

### ng-template with Input Control

```typescript
<e-item>
  <ng-template #template>
    <input type="text" 
           class="search-input" 
           placeholder="Search..."
           (keyup)="onSearch($event)" />
  </ng-template>
</e-item>
```

## Component Embedding

Embed Syncfusion and custom Angular components within toolbar items.

### NumericTextBox Component

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, NumericTextBoxModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        <e-item text='Paste'></e-item>
        
        <!-- NumericTextBox embedded -->
        <e-item type='Input'>
          <ng-template #template>
            <ejs-numerictextbox 
              placeholder="Enter amount"
              format="c2" 
              value="1" 
              width="150">
            </ejs-numerictextbox>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

### DatePicker Component

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, DatePickerModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item>
          <ng-template #template>
            <ejs-datepicker 
              placeholder="Select date"
              width="150">
            </ejs-datepicker>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

### Button Component

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, ButtonModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item>
          <ng-template #template>
            <button ejs-button 
                    cssClass="e-outline" 
                    iconCss="e-icons e-save"
                    (click)="onSave()">
              Save
            </button>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  onSave() {
    console.log('Save clicked');
  }
}
```

## Menu Component Integration

Embed the Menu component within toolbar items.

### Basic Menu in Toolbar

```typescript
import { ToolbarModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, MenuModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        <e-item text='Paste'></e-item>
        <e-item>
          <ng-template #template>
            <ejs-menu [items]="menuItems"></ejs-menu>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  menuItems = [
    { text: 'File' },
    { text: 'Edit' },
    { text: 'View' }
  ];
}
```

### Menu with Nested Items

```typescript
import { ToolbarModule, MenuItemModel, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, MenuModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item>
          <ng-template #template>
            <ejs-menu [items]="data"></ejs-menu>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  data: MenuItemModel[] = [
    {
      text: 'Home',
      items: [
        { text: 'Dashboard' },
        { text: 'Settings' }
      ]
    },
    {
      text: 'Products',
      items: [
        { text: 'Electronics' },
        { text: 'Clothing' }
      ]
    },
    {
      text: 'Services',
      items: [
        { text: 'Support' },
        { text: 'Contact' }
      ]
    }
  ];
}
```

## Multiple Components

Combine multiple components in a single toolbar.

### Mixed Components Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, NumericTextBoxModule, DatePickerModule, ButtonModule, FormsModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        
        <!-- NumericTextBox -->
        <e-item>
          <ng-template #template>
            <ejs-numerictextbox 
              placeholder="Quantity"
              value="10" 
              width="100">
            </ejs-numerictextbox>
          </ng-template>
        </e-item>
        
        <!-- DatePicker -->
        <e-item>
          <ng-template #template>
            <ejs-datepicker 
              placeholder="Select date"
              width="120">
            </ejs-datepicker>
          </ng-template>
        </e-item>
        
        <!-- Button -->
        <e-item>
          <ng-template #template>
            <button ejs-button cssClass="e-small">Submit</button>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

## Template Best Practices

### 1. Use Proper Template Reference

```typescript
<!-- Correct -->
<e-item>
  <ng-template #template>
    <!-- Content -->
  </ng-template>
</e-item>

<!-- Incorrect - missing #template -->
<e-item>
  <ng-template>
    <!-- Won't render properly -->
  </ng-template>
</e-item>
```

### 2. Template Styling

```css
.toolbar-template-item {
  display: flex;
  align-items: center;
  padding: 4px 8px;
}

.toolbar-template-item input {
  height: 32px;
  padding: 4px 8px;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
}
```

### 3. Template Event Handling

```typescript
<e-item>
  <ng-template #template>
    <input type="text" 
           (keyup)="onKeyUp($event)"
           (blur)="onBlur($event)" />
  </ng-template>
</e-item>
```

### 4. Template with Data Binding

```typescript
<e-item>
  <ng-template #template>
    <select [(ngModel)]="selectedValue" (change)="onSelectionChange()">
      <option *ngFor="let item of dataList" [value]="item">
        {{ item }}
      </option>
    </select>
  </ng-template>
</e-item>
```

### 5. Conditional Template Rendering

```typescript
<e-item *ngIf="showSearchBox">
  <ng-template #template>
    <input type="search" 
           placeholder="Search..."
           [disabled]="!isSearchEnabled" />
  </ng-template>
</e-item>
```

