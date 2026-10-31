# Input Features and State Management

## Table of Contents
- [Clear Button Implementation](#clear-button-implementation)
- [Disabled State](#disabled-state)
- [Read-Only State](#read-only-state)
- [HTML Attributes Configuration](#html-attributes-configuration)
- [Input Types and Attributes](#input-types-and-attributes)
- [TextBox Methods](#textbox-methods)
- [Programmatic TextBox Creation](#programmatic-textbox-creation)
- [State Management Patterns](#state-management-patterns)

---

## Clear Button Implementation

The clear button provides users a quick way to reset the input value. When enabled, it appears automatically when the field contains text and disappears when empty.

### Enable Clear Button

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-clear-button',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h2>TextBox with Clear Button</h2>
      <ejs-textbox 
        placeholder="Type something, then clear"
        [showClearButton]="true"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>
    </div>
  `
})
export class ClearButtonComponent {}
```

**Behavior:**
- Clear button appears when user types
- Clicking the button clears the input
- Button disappears when field is empty
- Works with all input states and validation classes

### Clear Button with Data Binding

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clear-with-binding',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="searchTerm"
        placeholder="Search..."
        [showClearButton]="true"
        (change)="onSearch()"
      ></ejs-textbox>
      <p>Search results for: {{ searchTerm }}</p>
    </div>
  `
})
export class ClearWithBindingComponent {
  searchTerm = '';

  onSearch() {
    if (this.searchTerm) {
      console.log('Searching for:', this.searchTerm);
    }
  }
}
```

**Use Case:** Search boxes, filters, quick input reset

---

## Disabled State

Disable the TextBox to prevent user interaction while maintaining visibility. Disabled fields appear visually grayed out.

### Basic Disabled State

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-disabled-state',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h2>Disabled TextBox</h2>
      <ejs-textbox 
        value="Cannot edit"
        placeholder="Disabled input"
        [enabled]="false"
      ></ejs-textbox>
    </div>
  `
})
export class DisabledStateComponent {}
```

**Characteristics:**
- User cannot type or select text
- Field appears grayed out
- Cannot receive focus
- Value remains visible
- Not included in form submission

### Toggle Enabled/Disabled

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-enabled',
  standalone: true,
  imports: [TextBoxModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <button (click)="toggleEnabled()">
        {{ isEnabled ? 'Disable' : 'Enable' }}
      </button>
      <ejs-textbox 
        placeholder="Toggle me"
        [enabled]="isEnabled"
      ></ejs-textbox>
    </div>
  `
})
export class ToggleEnabledComponent {
  isEnabled = true;

  toggleEnabled() {
    this.isEnabled = !this.isEnabled;
  }
}
```

**Use Case:** Conditionally disable fields based on form state, permissions, or dependencies

### Disable Based on Conditions

```typescript
@Component({
  selector: 'app-conditional-disable',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <label>
        <input type="checkbox" [(ngModel)]="hasAccount"> I have an account
      </label>
      <ejs-textbox 
        placeholder="Username"
        [enabled]="!hasAccount"
      ></ejs-textbox>
      <ejs-textbox 
        placeholder="New account name"
        [enabled]="hasAccount"
      ></ejs-textbox>
    </div>
  `
})
export class ConditionalDisableComponent {
  hasAccount = false;
}
```

---

## Read-Only State

Make the TextBox read-only to allow text selection and copying without allowing editing. Users can still interact with the field (focus, select, copy) but cannot modify content.

### Basic Read-Only

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-readonly-state',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h2>Read-Only TextBox</h2>
      <ejs-textbox 
        value="This is read-only content"
        placeholder="Cannot edit"
        [readonly]="true"
      ></ejs-textbox>
    </div>
  `
})
export class ReadOnlyStateComponent {}
```

**Characteristics:**
- User can focus and select text
- User can copy content
- User cannot edit or delete content
- Field receives focus
- Value is included in form submission
- Appears normal (not grayed out like disabled)

### Difference: Read-Only vs Disabled

| Feature | Read-Only | Disabled |
|---------|-----------|----------|
| **Visual Appearance** | Normal | Grayed out |
| **Focusable** | Yes | No |
| **Selectable** | Yes | No |
| **Copyable** | Yes | No |
| **Form Submission** | Included | Excluded |
| **Use Case** | Display existing data | Conditional fields |

### Toggle Read-Only State

```typescript
@Component({
  selector: 'app-toggle-readonly',
  standalone: true,
  imports: [TextBoxModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <button (click)="toggleEdit()">
        {{ isEditing ? 'Lock' : 'Edit' }}
      </button>
      <ejs-textbox 
        [(ngModel)]="content"
        placeholder="Click Edit to modify"
        [readonly]="!isEditing"
      ></ejs-textbox>
    </div>
  `
})
export class ToggleReadOnlyComponent {
  isEditing = false;
  content = 'Initial content';

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
```

**Use Case:** Display-only fields that can be toggled to edit mode

---

## HTML Attributes Configuration

The `htmlAttributes` property allows you to set standard HTML input attributes programmatically.

### Basic HTML Attributes

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-html-attrs',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h2>TextBox with HTML Attributes</h2>
      <ejs-textbox 
        placeholder="Enter password"
        [htmlAttributes]="htmlAttrs"
      ></ejs-textbox>
    </div>
  `
})
export class HtmlAttributesComponent {
  htmlAttrs: { [key: string]: string } = {
    name: 'userpassword',
    type: 'password',
    maxlength: '12',
    title: 'Enter password (max 12 characters)',
    'data-testid': 'password-field'
  };
}
```

**Common Attributes:**
- `name` - Form field name
- `type` - Input type (password, email, number, etc.)
- `maxlength` - Maximum character count
- `title` - Tooltip text
- `data-*` - Custom data attributes
- `autocomplete` - Browser autocomplete behavior

### Multiple Input Types

```typescript
@Component({
  selector: 'app-input-types',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h3>Email Input</h3>
      <ejs-textbox 
        placeholder="Email"
        [htmlAttributes]="{ type: 'email', autocomplete: 'email' }"
      ></ejs-textbox>

      <h3>Number Input</h3>
      <ejs-textbox 
        placeholder="Age"
        [htmlAttributes]="{ type: 'number', min: '0', max: '120' }"
      ></ejs-textbox>

      <h3>Tel Input</h3>
      <ejs-textbox 
        placeholder="Phone"
        [htmlAttributes]="{ type: 'tel', pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}' }"
      ></ejs-textbox>
    </div>
  `
})
export class InputTypesComponent {}
```

### Dynamic HTML Attributes

```typescript
@Component({
  selector: 'app-dynamic-attrs',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <label>Max Length:</label>
      <input type="number" [(ngModel)]="maxLen">
      
      <ejs-textbox 
        placeholder="Type here"
        [htmlAttributes]="{ maxlength: maxLen.toString() }"
      ></ejs-textbox>
    </div>
  `
})
export class DynamicAttributesComponent {
  maxLen = 20;
}
```

---

## Input Types and Attributes

### Email Input

```typescript
<ejs-textbox 
  placeholder="Enter email address"
  [htmlAttributes]="{ type: 'email', autocomplete: 'email' }"
  [floatLabelType]="'Auto'"
></ejs-textbox>
```

**Use Case:** Email validation, browser native email input behavior

### Phone Number Input

```typescript
<ejs-textbox 
  placeholder="(123) 456-7890"
  [htmlAttributes]="{ type: 'tel', pattern: '[0-9()\\-\\s]{10,}' }"
></ejs-textbox>
```

**Pattern Explanation:**
- `[0-9()\\-\\s]` - Allows digits, parentheses, hyphens, spaces
- `{10,}` - Minimum 10 characters

### Number Input

```typescript
<ejs-textbox 
  placeholder="Enter amount"
  [htmlAttributes]="{ type: 'number', step: '0.01', min: '0' }"
></ejs-textbox>
```

### URL Input

```typescript
<ejs-textbox 
  placeholder="https://example.com"
  [htmlAttributes]="{ type: 'url', autocomplete: 'url' }"
></ejs-textbox>
```

### Password Input

```typescript
<ejs-textbox 
  placeholder="Enter password"
  [htmlAttributes]="{ type: 'password', minlength: '8' }"
></ejs-textbox>
```

---

## TextBox Methods

### Focus Management

Control the focus state of the TextBox programmatically using [`focusIn`](api.md#focusin) and [`focusOut`](api.md#focusout) methods.

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-focus-management',
  standalone: true,
  imports: [TextBoxModule, ButtonModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox #textbox placeholder="Enter Name" floatLabelType="Auto"></ejs-textbox>
      <button ejs-button (click)="focusHandler()">Focus In</button>
      <button ejs-button (click)="blurHandler()">Focus Out</button>
    </div>
  `
})
export class FocusManagementComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  public focusHandler(): void {
    this.textboxObj.focusIn();
  }

  public blurHandler(): void {
    this.textboxObj.focusOut();
  }
}
```

### Add and Remove Attributes

Use [`addAttributes`](api.md#addattributes) and [`removeAttributes`](api.md#removeattributes) to programmatically manage HTML attributes on the input element.

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-attributes-management',
  standalone: true,
  imports: [TextBoxModule, ButtonModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox #textbox [multiline]="true" floatLabelType="Auto" placeholder="Enter your address"></ejs-textbox>
      <button ejs-button (click)="addMaxLength()">Add max length (15)</button>
      <button ejs-button (click)="removeMaxLength()">Remove max length</button>
    </div>
  `
})
export class AttributesManagementComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  public addMaxLength(): void {
    this.textboxObj.addAttributes({ maxlength: '15' } as any);
  }

  public removeMaxLength(): void {
    this.textboxObj.removeAttributes(['maxlength']);
  }
}
```

### Destroy the Component

The [`destroy`](api.md#destroy) method removes the component from the DOM and detaches all event handlers while maintaining the original input element.

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-destroy-demo',
  standalone: true,
  imports: [TextBoxModule, ButtonModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox #textbox placeholder="Enter Name" floatLabelType="Auto"></ejs-textbox>
      <button ejs-button (click)="destroyHandler()">Destroy</button>
    </div>
  `
})
export class DestroyDemoComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  public destroyHandler(): void {
    this.textboxObj.destroy();
  }
}
```

### Get Persist Data

The [`getPersistData`](api.md#getpersistdata) method returns the properties to be maintained in the persisted state.

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-persist-data',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox #textbox placeholder="Enter Name" floatLabelType="Auto"></ejs-textbox>
      <button (click)="getPersistDataHandler()">Get Persist Data</button>
      <div>{{ persistData }}</div>
    </div>
  `
})
export class PersistDataComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;
  public persistData = '';

  public getPersistDataHandler(): void {
    this.persistData = this.textboxObj.getPersistData();
  }
}
```

---

## Programmatic TextBox Creation

Create a TextBox component programmatically using the `createInput` method from `@syncfusion/ej2-inputs`. This is useful when generating dynamic forms at runtime.

```typescript
import { Component } from '@angular/core';
import { Input } from '@syncfusion/ej2-inputs';

@Component({
  standalone: true,
  selector: 'app-programmatic-textbox',
  template: `
    <div class="wrap">
      <input id="textbox" type="text" placeholder="Enter Name" />
      <input id="textbox-icon" type="text" />
    </div>
  `
})
export class ProgrammaticTextboxComponent {
  ngOnInit(): void {
    // Basic TextBox
    const element = document.getElementById('textbox') as HTMLInputElement;
    Input.createInput({ element });

    // TextBox with icon button
    const element1 = document.getElementById('textbox-icon') as HTMLInputElement;
    Input.createInput({
      element: element1,
      buttons: ['e-icons e-input-down'],
      properties: { placeholder: 'Enter Value' }
    });
  }
}
```

---

## State Management Patterns

### Pattern 1: Form State Management

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-state',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <form (ngSubmit)="submitForm()">
      <ejs-textbox 
        [(ngModel)]="form.name"
        name="name"
        placeholder="Full Name"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>

      <ejs-textbox 
        [(ngModel)]="form.email"
        name="email"
        placeholder="Email"
        [htmlAttributes]="{ type: 'email' }"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>

      <button type="submit" [disabled]="!isFormValid()">Submit</button>
      <p *ngIf="submitted">Form submitted!</p>
    </form>
  `
})
export class FormStateComponent {
  form = { name: '', email: '' };
  submitted = false;

  isFormValid(): boolean {
    return this.form.name.trim() !== '' && 
           this.form.email.includes('@');
  }

  submitForm() {
    if (this.isFormValid()) {
      this.submitted = true;
      console.log('Form data:', this.form);
    }
  }
}
```

### Pattern 2: Reactive State with RxJS

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [TextBoxModule, ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form">
      <ejs-textbox 
        formControlName="username"
        placeholder="Username"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>

      <p *ngIf="form.get('username')?.hasError('required')" style="color: red;">
        Username is required
      </p>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class ReactiveFormComponent {
  form = this.fb.group({
    username: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}
}
```

### Pattern 3: Conditional Field Visibility

```typescript
@Component({
  selector: 'app-conditional-fields',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="userType"
        placeholder="User Type"
      ></ejs-textbox>

      <ejs-textbox 
        *ngIf="userType === 'company'"
        [(ngModel)]="companyName"
        placeholder="Company Name"
      ></ejs-textbox>

      <ejs-textbox 
        *ngIf="userType === 'individual'"
        [(ngModel)]="personalId"
        placeholder="Personal ID"
      ></ejs-textbox>
    </div>
  `
})
export class ConditionalFieldsComponent {
  userType = '';
  companyName = '';
  personalId = '';
}
```

---

## Edge Cases and Troubleshooting

### Edge Case 1: Empty Value Handling

```typescript
// When checking if field has value
const isEmpty = (value: string): boolean => {
  return !value || value.trim() === '';
};

// Use in template
<button [disabled]="isEmpty(inputValue)">Submit</button>
```

### Edge Case 2: Attribute Priority

When an attribute is set both via component property and `htmlAttributes`, component property takes precedence:

```typescript
// htmlAttributes type is ignored - component type is used
<ejs-textbox 
  type="email"  // This takes priority
  [htmlAttributes]="{ type: 'text' }"
></ejs-textbox>
```

### Edge Case 3: Form Reset

```typescript
@Component({
  template: `
    <ejs-textbox #textbox [(ngModel)]="value"></ejs-textbox>
    <button (click)="reset()">Reset</button>
  `
})
export class ResetComponent {
  @ViewChild('textbox') textboxRef!: TextBox;
  value = '';

  reset() {
    this.value = '';
    // Force refresh if needed
    this.textboxRef.value = '';
  }
}
```

---

## Next Steps

- Learn about [adornments-customization.md](adornments-customization.md) to add icons and buttons
- Explore [validation-states.md](validation-states.md) for form validation
- Check [styling-appearance.md](styling-appearance.md) for visual customization

