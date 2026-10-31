# Reactive Forms Integration

## Table of Contents
- [FormControl Binding](#formcontrol-binding)
- [FormGroup Integration](#formgroup-integration)
- [Validation](#validation)
- [Form State Management](#form-state-management)
- [Programmatic Control](#programmatic-control)
- [Reset Patterns](#reset-patterns)
- [Disabled State](#disabled-state)
- [Complete Form Examples](#complete-form-examples)

## FormControl Binding

### Basic FormControl

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-form-control',
  template: `
    <ejs-splitbutton 
      [formControl]="actionControl"
      content="Select Action"
      [items]="items">
    </ejs-splitbutton>
    
    <p>Selected action: {{ actionControl.value }}</p>
  `
})
export class FormControlComponent {
  public actionControl = new FormControl('');
  
  public items: ItemModel[] = [
    { id: 'save', text: 'Save' },
    { id: 'export', text: 'Export' },
    { id: 'print', text: 'Print' }
  ];
}
```

### FormControl with Initial Value

```typescript
export class FormControlInitialComponent {
  // Initialize with default value
  public actionControl = new FormControl('save');
  
  public items: ItemModel[] = [
    { id: 'save', text: 'Save' },
    { id: 'export', text: 'Export' }
  ];
}
```

### Track Value Changes

```typescript
export class FormControlValueTrackingComponent {
  public actionControl = new FormControl('');
  
  public items: ItemModel[] = [
    { id: 'save', text: 'Save' },
    { id: 'export', text: 'Export' }
  ];
  
  constructor() {
    // Subscribe to value changes
    this.actionControl.valueChanges.subscribe(value => {
      console.log('Action changed to:', value);
      this.handleActionChange(value);
    });
  }
  
  private handleActionChange(action: string): void {
    console.log(`Executing: ${action}`);
  }
}
```

## FormGroup Integration

### FormGroup with Multiple Controls

```typescript
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  template: `
    <form [formGroup]="documentForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Document Name:</label>
        <input type="text" formControlName="name" placeholder="Enter document name">
      </div>
      
      <div style="margin-top: 10px;">
        <label>Action:</label>
        <ejs-splitbutton 
          formControlName="action"
          content="Select Action"
          [items]="actionItems">
        </ejs-splitbutton>
      </div>
      
      <button type="submit" style="margin-top: 10px;">Submit</button>
    </form>
    
    <p *ngIf="submitted">Form submitted: {{ documentForm.value | json }}</p>
  `
})
export class FormGroupComponent {
  public documentForm: FormGroup;
  submitted: boolean = false;
  
  public actionItems: ItemModel[] = [
    { id: 'save', text: 'Save' },
    { id: 'draft', text: 'Save as Draft' },
    { id: 'export', text: 'Export' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.documentForm = this.fb.group({
      name: [''],
      action: ['save']
    });
  }
  
  onSubmit(): void {
    if (this.documentForm.valid) {
      this.submitted = true;
      console.log('Form value:', this.documentForm.value);
    }
  }
}
```

### Nested FormGroup

```typescript
export class NestedFormGroupComponent {
  public settingsForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      user: this.fb.group({
        name: [''],
        email: ['']
      }),
      preferences: this.fb.group({
        theme: ['light'],
        action: ['save']
      })
    });
  }
  
  get preferencesFormGroup(): FormGroup {
    return this.settingsForm.get('preferences') as FormGroup;
  }
}
```

```html
<form [formGroup]="settingsForm">
  <div formGroupName="preferences">
    <label>Action:</label>
    <ejs-splitbutton 
      formControlName="action"
      content="Choose"
      [items]="actionItems">
    </ejs-splitbutton>
  </div>
</form>
```

## Validation

### Simple Validation

```typescript
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-validation',
  template: `
    <form [formGroup]="form">
      <div>
        <ejs-splitbutton 
          formControlName="action"
          content="Required"
          [items]="items">
        </ejs-splitbutton>
        
        <div *ngIf="action.hasError('required') && action.touched" style="color: red;">
          Action is required
        </div>
      </div>
      
      <button 
        type="submit" 
        [disabled]="form.invalid"
        style="margin-top: 10px;">
        Submit
      </button>
    </form>
  `
})
export class ValidationComponent {
  public form: FormGroup;
  
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      action: ['', Validators.required]
    });
  }
  
  get action(): FormControl {
    return this.form.get('action') as FormControl;
  }
}
```

### Custom Validators

```typescript
export class CustomValidationComponent {
  public form: FormGroup;
  
  public items: ItemModel[] = [
    { id: 'delete', text: 'Delete' },
    { id: 'archive', text: 'Archive' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      action: ['', [
        Validators.required,
        this.destructiveActionValidator.bind(this)
      ]],
      confirmation: ['']
    });
  }
  
  // Custom validator for destructive actions
  destructiveActionValidator(control: FormControl): {[key: string]: any} | null {
    const destructiveActions = ['delete', 'archive'];
    
    if (destructiveActions.includes(control.value)) {
      // Check if confirmation is provided
      const confirmationControl = this.form.get('confirmation');
      if (!confirmationControl || !confirmationControl.value) {
        return { 'destructiveActionRequiresConfirmation': true };
      }
    }
    
    return null;
  }
}
```

## Form State Management

### Monitor Form State

```typescript
export class FormStateComponent implements OnInit {
  public form: FormGroup;
  
  formState = {
    touched: false,
    dirty: false,
    valid: false,
    status: ''
  };
  
  public items: ItemModel[] = [
    { text: 'Save' },
    { text: 'Cancel' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      action: ['']
    });
  }
  
  ngOnInit(): void {
    // Monitor form status changes
    this.form.statusChanges.subscribe(status => {
      this.formState.status = status;
      this.formState.valid = status === 'VALID';
    });
    
    // Monitor form touch state
    this.form.get('action')?.statusChanges.subscribe(() => {
      this.formState.touched = this.form.get('action')?.touched || false;
      this.formState.dirty = this.form.get('action')?.dirty || false;
    });
  }
}
```

```html
<form [formGroup]="form">
  <ejs-splitbutton 
    formControlName="action"
    content="Actions"
    [items]="items">
  </ejs-splitbutton>
</form>

<div style="margin-top: 10px; padding: 10px; background: #f0f0f0;">
  <p>Form Status: {{ formState.status }}</p>
  <p>Touched: {{ formState.touched }}</p>
  <p>Dirty: {{ formState.dirty }}</p>
  <p>Valid: {{ formState.valid }}</p>
</div>
```

### Form State in Component Variable

```typescript
export class FormStateVariableComponent {
  public form: FormGroup;
  
  get isFormValid(): boolean {
    return this.form.valid;
  }
  
  get isFormDirty(): boolean {
    return this.form.dirty;
  }
  
  get isFormTouched(): boolean {
    return this.form.touched;
  }
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      action: ['', Validators.required]
    });
  }
}
```

## Programmatic Control

### Set Form Value

```typescript
export class SetValueComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public form: FormGroup;
  
  public items: ItemModel[] = [
    { id: 'save', text: 'Save' },
    { id: 'draft', text: 'Draft' },
    { id: 'export', text: 'Export' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      action: ['']
    });
  }
  
  setAction(action: string): void {
    this.form.get('action')?.setValue(action);
  }
  
  setSaveAction(): void {
    this.setAction('save');
  }
  
  setDraftAction(): void {
    this.setAction('draft');
  }
}
```

```html
<form [formGroup]="form">
  <ejs-splitbutton 
    #splitBtn
    formControlName="action"
    content="Choose"
    [items]="items">
  </ejs-splitbutton>
</form>

<div style="margin-top: 10px;">
  <button (click)="setSaveAction()">Set to Save</button>
  <button (click)="setDraftAction()">Set to Draft</button>
</div>

<p>Current action: {{ form.get('action')?.value }}</p>
```

### Patch Form Value

```typescript
export class PatchValueComponent {
  public form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      action: [''],
      priority: ['']
    });
  }
  
  // Update only specific fields
  updateAction(newAction: string): void {
    this.form.patchValue({
      action: newAction
      // Other fields remain unchanged
    });
  }
}
```

## Reset Patterns

### Reset Form

```typescript
export class ResetFormComponent {
  public form: FormGroup;
  
  public items: ItemModel[] = [
    { text: 'Save' },
    { text: 'Cancel' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      action: ['save']
    });
  }
  
  resetForm(): void {
    this.form.reset();  // Clears all values
  }
  
  resetFormWithDefaults(): void {
    this.form.reset({
      action: 'save'  // Reset to default value
    });
  }
}
```

```html
<form [formGroup]="form">
  <ejs-splitbutton 
    formControlName="action"
    content="Actions"
    [items]="items">
  </ejs-splitbutton>
</form>

<button (click)="resetForm()">Reset</button>
<button (click)="resetFormWithDefaults()">Reset to Default</button>
```

### Reset Individual Control

```typescript
export class ResetControlComponent {
  public form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      action: ['']
    });
  }
  
  resetAction(): void {
    this.form.get('action')?.reset();
  }
  
  resetActionWithValue(value: string): void {
    this.form.get('action')?.reset(value);
  }
  
  markAsPristine(): void {
    this.form.get('action')?.markAsPristine();
  }
  
  markAsUntouched(): void {
    this.form.get('action')?.markAsUntouched();
  }
}
```

## Disabled State

### Disable SplitButton

```typescript
export class DisableStateComponent {
  public form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      action: [{ value: '', disabled: false }]
    });
  }
  
  disableAction(): void {
    this.form.get('action')?.disable();
  }
  
  enableAction(): void {
    this.form.get('action')?.enable();
  }
  
  toggleActionDisabled(): void {
    const control = this.form.get('action');
    if (control?.enabled) {
      control.disable();
    } else {
      control?.enable();
    }
  }
}
```

```html
<form [formGroup]="form">
  <ejs-splitbutton 
    formControlName="action"
    content="Actions"
    [items]="items">
  </ejs-splitbutton>
</form>

<button (click)="disableAction()">Disable</button>
<button (click)="enableAction()">Enable</button>
<button (click)="toggleActionDisabled()">Toggle</button>
```

### Conditionally Disable

```typescript
export class ConditionalDisableComponent {
  public form: FormGroup;
  isEditMode: boolean = false;
  
  public items: ItemModel[] = [
    { text: 'Edit' },
    { text: 'Delete' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      action: ['']
    });
  }
  
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    
    if (this.isEditMode) {
      this.form.get('action')?.enable();
    } else {
      this.form.get('action')?.disable();
    }
  }
}
```

## Complete Form Examples

### Document Management Form

```typescript
@Component({
  selector: 'app-document-form',
  template: `
    <form [formGroup]="documentForm" (ngSubmit)="onSubmit()">
      <div style="margin-bottom: 15px;">
        <label>Document Name:</label>
        <input 
          type="text" 
          formControlName="name" 
          placeholder="Enter document name"
          style="width: 100%; padding: 8px;">
        <div *ngIf="name.hasError('required') && name.touched" style="color: red; font-size: 12px;">
          Document name is required
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>Document Type:</label>
        <select formControlName="type" style="width: 100%; padding: 8px;">
          <option value="">Select Type</option>
          <option value="pdf">PDF</option>
          <option value="word">Word</option>
          <option value="excel">Excel</option>
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>Action:</label>
        <ejs-splitbutton 
          formControlName="action"
          content="Choose Action"
          [items]="actionItems"
          (select)="onActionSelect($event)">
        </ejs-splitbutton>
        <div *ngIf="action.hasError('required') && action.touched" style="color: red; font-size: 12px;">
          Action is required
        </div>
      </div>
      
      <button 
        type="submit" 
        [disabled]="documentForm.invalid"
        style="padding: 10px 20px; background: #0066cc; color: white; border: none; cursor: pointer;">
        Submit
      </button>
    </form>
    
    <div *ngIf="submitted" style="margin-top: 20px; padding: 15px; background: #e8f5e9;">
      <h3>Form Submitted</h3>
      <pre>{{ documentForm.value | json }}</pre>
    </div>
  `
})
export class DocumentFormComponent {
  public documentForm: FormGroup;
  submitted = false;
  
  public actionItems: ItemModel[] = [
    { id: 'save', text: 'Save' },
    { id: 'saveas', text: 'Save As' },
    { id: 'export', text: 'Export' },
    { id: 'print', text: 'Print' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.documentForm = this.fb.group({
      name: ['', Validators.required],
      type: [''],
      action: ['', Validators.required]
    });
  }
  
  get name(): FormControl {
    return this.documentForm.get('name') as FormControl;
  }
  
  get action(): FormControl {
    return this.documentForm.get('action') as FormControl;
  }
  
  onActionSelect(args: any): void {
    console.log('Action selected:', args.item.text);
  }
  
  onSubmit(): void {
    if (this.documentForm.valid) {
      this.submitted = true;
      console.log('Form data:', this.documentForm.value);
      // Send to server
    }
  }
}
```

Your reactive forms integration is complete! Explore [api-reference.md](api-reference.md) for complete API documentation.
