# Accessibility and Forms

## Table of Contents
- [WCAG 2.2 Level AA Compliance](#wcag-22-level-aa-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Form Validation Patterns](#form-validation-patterns)
- [Reactive Forms](#reactive-forms)
- [Template-Driven Forms](#template-driven-forms)
- [Examples](#examples)

## WCAG 2.2 Level AA Compliance

The Dialog component follows WCAG 2.2 Level AA standards for accessibility:

### Accessibility Standards Met

- ✅ **Perceivable** - Dialog is visible and distinguishable
- ✅ **Operable** - Keyboard and mouse navigation supported
- ✅ **Understandable** - Clear content and instructions
- ✅ **Robust** - Compatible with assistive technologies

### ADA & Section 508 Compliance

The Dialog is compliant with:
- Americans with Disabilities Act (ADA)
- Section 508 (US Federal requirement)
- EN 301 549 (EU accessibility standard)

### Implementation Checklist

```typescript
@Component({
  template: `
    <div role="main">
      <!-- Dialog with accessibility attributes -->
      <ejs-dialog
        role="dialog"
        [aria-labelledby]="'dialog-title'"
        [aria-describedby]="'dialog-description'"
        [aria-modal]="true"
        [showCloseIcon]="true"
      >
        <ng-template #header>
          <h2 id="dialog-title">Important Information</h2>
        </ng-template>

        <ng-template #content>
          <p id="dialog-description">
            This dialog contains important accessibility features.
          </p>
        </ng-template>
      </ejs-dialog>
    </div>
  `
})
export class AccessibleDialogComponent {}
```

## ARIA Attributes

### aria-labelledby

Connects the dialog header/title to the dialog element:

```typescript
@Component({
  template: `
    <ejs-dialog
      [aria-labelledby]="'dialog-header-id'"
      width="400px"
    >
      <ng-template #header>
        <h2 id="dialog-header-id">Delete Confirmation</h2>
      </ng-template>
      
      <ng-template #content>
        <p>Are you sure you want to delete this item?</p>
      </ng-template>
    </ejs-dialog>
  `
})
export class AriaLabelledByComponent {}
```

### aria-describedby

Provides additional description for the dialog:

```typescript
@Component({
  template: `
    <ejs-dialog
      [aria-describedby]="'dialog-description'"
      width="400px"
    >
      <ng-template #content>
        <p id="dialog-description">
          This is a modal dialog that requires your interaction.
          Press Tab to navigate between elements, 
          Escape to close, and Enter to confirm.
        </p>
      </ng-template>
    </ejs-dialog>
  `
})
export class AriaDescribedByComponent {}
```

### aria-modal

Indicates whether the dialog is modal or not:

```typescript
@Component({
  template: `
    <!-- Modal dialog -->
    <ejs-dialog
      [isModal]="true"
      [aria-modal]="true"
      content="Modal dialog - blocks interaction"
    >
    </ejs-dialog>

    <!-- Modeless dialog -->
    <ejs-dialog
      [isModal]="false"
      [aria-modal]="false"
      content="Modeless dialog - allows interaction"
    >
    </ejs-dialog>
  `
})
export class AriaModalComponent {}
```

## Keyboard Navigation

### Tab Navigation

Focus moves through dialog elements in order:

```typescript
@Component({
  template: `
    <ejs-dialog
      [showCloseIcon]="true"
      content="Tab through elements"
    >
      <ng-template #content>
        <form>
          <div>
            <label for="name">Name:</label>
            <input id="name" type="text" placeholder="Enter name" />
          </div>
          <div>
            <label for="email">Email:</label>
            <input id="email" type="email" placeholder="Enter email" />
          </div>
          <textarea id="message" placeholder="Enter message"></textarea>
        </form>
      </ng-template>
    </ejs-dialog>
  `
})
export class TabNavigationComponent {}
```

### Escape Key

Close dialog with Escape:

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      [closeOnEscape]="true"
      content="Press Escape to close"
    >
    </ejs-dialog>
  `
})
export class EscapeKeyComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
}
```

### Enter Key

Trigger primary action:

```typescript
@Component({
  template: `
    <ejs-dialog #dialog>
      <ng-template #content>
        <form (ngSubmit)="onSubmit()">
          <input type="text" placeholder="Enter text" />
          <!-- Pressing Enter in input triggers primary button -->
        </form>
      </ng-template>

      <ng-template #footerTemplate>
        <button 
          class="e-control e-btn e-primary"
          (click)="onSubmit()"
        >
          Submit
        </button>
        <button 
          class="e-control e-btn"
          (click)="dialog.hide()"
        >
          Cancel
        </button>
      </ng-template>
    </ejs-dialog>
  `
})
export class EnterKeyComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  onSubmit(): void {
    console.log('Form submitted');
    this.dialog.hide();
  }
}
```

### Shift+Tab

Navigate backwards through elements:

```typescript
@Component({
  template: `
    <ejs-dialog content="Shift+Tab navigates backwards">
      <ng-template #content>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
        <!-- Shift+Tab goes backwards -->
      </ng-template>
    </ejs-dialog>
  `
})
export class ShiftTabComponent {}
```

## Screen Reader Support

### Labeling Dialog Content

```typescript
@Component({
  template: `
    <ejs-dialog
      [aria-labelledby]="'dialog-title'"
      [aria-describedby]="'dialog-desc'"
    >
      <ng-template #header>
        <h2 id="dialog-title">User Profile</h2>
      </ng-template>

      <ng-template #content>
        <div id="dialog-desc">
          <p>Update your user profile information below:</p>
          <form>
            <div>
              <label for="fname">First Name:</label>
              <input id="fname" type="text" />
            </div>
            <div>
              <label for="lname">Last Name:</label>
              <input id="lname" type="text" />
            </div>
          </form>
        </div>
      </ng-template>
    </ejs-dialog>
  `
})
export class ScreenReaderComponent {}
```

### Live Regions

Announce dynamic content to screen readers:

```typescript
@Component({
  template: `
    <ejs-dialog>
      <ng-template #content>
        <div aria-live="polite" aria-atomic="true">
          {{ statusMessage }}
        </div>
        
        <button (click)="performAction()">Perform Action</button>
      </ng-template>
    </ejs-dialog>
  `
})
export class LiveRegionComponent {
  statusMessage = 'Ready';

  performAction(): void {
    this.statusMessage = 'Processing...';
    
    setTimeout(() => {
      this.statusMessage = 'Action completed successfully!';
    }, 2000);
  }
}
```

### Focus Management

Ensure focus returns to trigger element:

```typescript
@Component({
  template: `
    <button 
      #triggerButton
      (click)="openDialog()"
    >
      Open Dialog
    </button>

    <ejs-dialog 
      #dialog
      (close)="returnFocus()"
    >
    </ejs-dialog>
  `
})
export class FocusManagementComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  @ViewChild('triggerButton') triggerButton!: ElementRef;

  openDialog(): void {
    this.dialog.show();
  }

  returnFocus(): void {
    // Return focus to trigger button after dialog closes
    this.triggerButton.nativeElement.focus();
  }
}
```

## Form Validation Patterns

### Basic Form with Validation

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <ejs-dialog #dialog>
      <ng-template #header>
        <h2>User Registration</h2>
      </ng-template>

      <ng-template #content>
        <form [formGroup]="form">
          <div>
            <label for="email">Email:</label>
            <input 
              id="email"
              type="email" 
              formControlName="email"
              placeholder="Enter email"
              aria-describedby="email-error"
            />
            <span 
              id="email-error"
              *ngIf="form.get('email')?.hasError('required')"
              role="alert"
            >
              Email is required
            </span>
          </div>

          <div>
            <label for="password">Password:</label>
            <input 
              id="password"
              type="password" 
              formControlName="password"
              placeholder="Enter password"
              aria-describedby="password-error"
            />
            <span 
              id="password-error"
              *ngIf="form.get('password')?.hasError('minlength')"
              role="alert"
            >
              Password must be at least 6 characters
            </span>
          </div>
        </form>
      </ng-template>

      <ng-template #footerTemplate>
        <button 
          class="e-control e-btn e-primary"
          [disabled]="!form.valid"
          (click)="onSubmit()"
        >
          Register
        </button>
      </ng-template>
    </ejs-dialog>
  `
})
export class BasicValidationComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

## Reactive Forms

### Complete Reactive Form in Dialog

```typescript
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-reactive-form-dialog',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, CommonModule],
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button class="e-control e-btn" (click)="openDialog()">
        Edit Profile
      </button>

      <ejs-dialog
        #profileDialog
        [showCloseIcon]="true"
        width="500px"
      >
        <ng-template #header>
          <h2>Edit User Profile</h2>
        </ng-template>

        <ng-template #content>
          <form [formGroup]="profileForm">
            <div class="form-group">
              <label for="firstname">First Name:</label>
              <input
                id="firstname"
                type="text"
                formControlName="firstName"
                placeholder="Enter first name"
              />
              <span *ngIf="profileForm.get('firstName')?.invalid && profileForm.get('firstName')?.touched">
                First name is required
              </span>
            </div>

            <div class="form-group">
              <label for="lastname">Last Name:</label>
              <input
                id="lastname"
                type="text"
                formControlName="lastName"
                placeholder="Enter last name"
              />
            </div>

            <div class="form-group">
              <label for="email">Email:</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="Enter email"
              />
              <span *ngIf="profileForm.get('email')?.invalid && profileForm.get('email')?.touched">
                Invalid email format
              </span>
            </div>

            <div class="form-group">
              <label for="country">Country:</label>
              <select id="country" formControlName="country">
                <option>Select country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
              </select>
            </div>
          </form>
        </ng-template>

        <ng-template #footerTemplate>
          <button
            class="e-control e-btn e-primary"
            [disabled]="!profileForm.valid"
            (click)="onSaveProfile()"
          >
            Save Changes
          </button>
          <button
            class="e-control e-btn"
            (click)="profileDialog.hide()"
          >
            Cancel
          </button>
        </ng-template>
      </ejs-dialog>
    </div>
  `,
  styles: [`
    #dialog-container { height: 600px; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; font-weight: bold; margin-bottom: 5px; }
    input, select { width: 100%; padding: 8px; border: 1px solid #ddd; }
    span { color: red; font-size: 12px; margin-top: 3px; display: block; }
  `]
})
export class ReactiveFormDialogComponent {
  @ViewChild('profileDialog') dialog!: DialogComponent;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      country: ['']
    });
  }

  openDialog(): void {
    this.dialog.show();
  }

  onSaveProfile(): void {
    if (this.profileForm.valid) {
      console.log('Profile saved:', this.profileForm.value);
      this.dialog.hide();
    }
  }
}
```

## Template-Driven Forms

### Complete Template-Driven Form in Dialog

```typescript
@Component({
  selector: 'app-template-form-dialog',
  standalone: true,
  imports: [DialogModule, FormsModule],
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button class="e-control e-btn" (click)="openDialog()">
        Add New Item
      </button>

      <ejs-dialog
        #itemDialog
        [showCloseIcon]="true"
        width="450px"
      >
        <ng-template #header>
          <h2>Add New Item</h2>
        </ng-template>

        <ng-template #content>
          <form #itemForm="ngForm" (ngSubmit)="onSubmitItem()">
            <div class="form-group">
              <label for="itemname">Item Name:</label>
              <input
                id="itemname"
                type="text"
                name="itemName"
                [(ngModel)]="item.name"
                required
                placeholder="Enter item name"
              />
            </div>

            <div class="form-group">
              <label for="itemdesc">Description:</label>
              <textarea
                id="itemdesc"
                name="description"
                [(ngModel)]="item.description"
                placeholder="Enter description"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                [(ngModel)]="item.quantity"
                required
              />
            </div>

            <div class="form-group">
              <label for="price">Price:</label>
              <input
                id="price"
                type="number"
                name="price"
                [(ngModel)]="item.price"
                required
              />
            </div>

            <div class="form-group checkbox">
              <input
                id="instock"
                type="checkbox"
                name="inStock"
                [(ngModel)]="item.inStock"
              />
              <label for="instock">In Stock</label>
            </div>
          </form>
        </ng-template>

        <ng-template #footerTemplate>
          <button
            class="e-control e-btn e-primary"
            [disabled]="!itemForm.valid"
            (click)="onSubmitItem()"
          >
            Add Item
          </button>
          <button
            class="e-control e-btn"
            (click)="itemDialog.hide()"
          >
            Cancel
          </button>
        </ng-template>
      </ejs-dialog>
    </div>
  `,
  styles: [`
    #dialog-container { height: 600px; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; font-weight: bold; margin-bottom: 5px; }
    input, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; }
    .checkbox { display: flex; align-items: center; }
    .checkbox input { width: auto; margin-right: 8px; }
  `]
})
export class TemplateFormDialogComponent {
  @ViewChild('itemDialog') dialog!: DialogComponent;

  item = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    inStock: false
  };

  openDialog(): void {
    this.dialog.show();
  }

  onSubmitItem(): void {
    console.log('Item added:', this.item);
    this.dialog.hide();
  }
}
```

## Examples

### Example 1: Accessible Confirmation Dialog

```typescript
@Component({
  template: `
    <ejs-dialog
      [isModal]="true"
      [closeOnEscape]="true"
      role="alertdialog"
      [aria-labelledby]="'confirm-title'"
      [aria-describedby]="'confirm-desc'"
    >
      <ng-template #header>
        <h2 id="confirm-title">⚠️ Confirm Action</h2>
      </ng-template>

      <ng-template #content>
        <p id="confirm-desc">This action cannot be undone.</p>
      </ng-template>

      <ng-template #footerTemplate>
        <button class="e-control e-btn" (click)="onCancel()">
          Cancel (Esc)
        </button>
        <button class="e-control e-btn e-primary" (click)="onConfirm()">
          Confirm (Enter)
        </button>
      </ng-template>
    </ejs-dialog>
  `
})
export class AccessibleConfirmComponent {}
```

