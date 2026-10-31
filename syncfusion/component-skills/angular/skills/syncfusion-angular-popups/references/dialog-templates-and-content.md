# Templates and Content

## Table of Contents
- [Header Templates](#header-templates)
- [Content Templates](#content-templates)
- [Footer Templates & Buttons](#footer-templates--buttons)
- [ng-content Usage](#ng-content-usage)
- [Button Events & Binding](#button-events--binding)
- [Dynamic Content](#dynamic-content)
- [Examples](#examples)

## Header Templates

### Simple Header Text

Set header as plain text using the `header` property:

```typescript
@Component({
  template: `
    <ejs-dialog
      header="Dialog Title"
      content="Dialog content goes here"
    >
    </ejs-dialog>
  `
})
export class SimpleHeaderComponent {}
```

### Header Template with ng-template

Use `<ng-template #header>` to create a custom header:

```typescript
@Component({
  template: `
    <ejs-dialog
      #myDialog
      [showCloseIcon]="true"
      content="Dialog content"
    >
      <ng-template #header>
        <div class="custom-header">
          <span class="header-title">My Custom Title</span>
          <span class="header-subtitle">Subtitle here</span>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .custom-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .header-title {
      font-size: 18px;
      font-weight: bold;
    }
    .header-subtitle {
      font-size: 12px;
      color: #999;
    }
  `]
})
export class CustomHeaderComponent {}
```

### Header with Icons

Add icons to the header:

```typescript
@Component({
  template: `
    <ejs-dialog
      [showCloseIcon]="true"
      content="This dialog has an icon in the header"
    >
      <ng-template #header>
        <div class="header-with-icon">
          <span class="e-icon-import"></span>
          <span>Import Data</span>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .header-with-icon {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class IconHeaderComponent {}
```

## Content Templates

### String Content

Use the `content` property for simple text:

```html
<ejs-dialog content="This is simple text content">
</ejs-dialog>
```

### HTML String Content

Set HTML as content:

```typescript
@Component({
  template: `
    <ejs-dialog
      [content]="htmlContent"
    >
    </ejs-dialog>
  `
})
export class HtmlContentComponent {
  htmlContent = '<h3>Welcome</h3><p>This is <strong>HTML</strong> content</p>';
}
```

### Content Template with ng-template

Use `<ng-template #content>` for complex layouts:

```typescript
@Component({
  template: `
    <ejs-dialog #myDialog>
      <ng-template #content>
        <div class="dialog-content">
          <h4>User Information</h4>
          <form [formGroup]="userForm">
            <div class="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                formControlName="name"
                placeholder="Enter name"
              />
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                formControlName="email"
                placeholder="Enter email"
              />
            </div>
          </form>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class FormContentComponent {}
```

### Content with Data Binding

Bind component data to dialog content:

```typescript
@Component({
  template: `
    <ejs-dialog>
      <ng-template #content>
        <div class="user-details">
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Status:</strong> {{ user.status }}</p>
        </div>
      </ng-template>
    </ejs-dialog>
  `
})
export class DataBindingComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active'
  };
}
```

## Footer Templates & Buttons

### Built-in Buttons

Use the `buttons` property for quick footer buttons:

```typescript
@Component({
  template: `
    <ejs-dialog
      [buttons]="dialogButtons"
      content="Do you want to save changes?"
    >
      <ng-template #header>
        <span>Save Changes</span>
      </ng-template>
    </ejs-dialog>
  `
})
export class ButtonsComponent {
  dialogButtons = [
    {
      text: 'Save',
      cssClass: 'e-primary',
      click: () => this.onSave()
    },
    {
      text: 'Cancel',
      cssClass: 'e-outline',
      click: () => this.onCancel()
    }
  ];

  onSave(): void {
    console.log('Saved');
  }

  onCancel(): void {
    console.log('Cancelled');
  }
}
```

### Custom Footer Template

Use `<ng-template #footerTemplate>` for custom footer layouts:

```typescript
@Component({
  template: `
    <ejs-dialog
      #myDialog
      content="Confirm your action"
    >
      <ng-template #footerTemplate>
        <div class="custom-footer">
          <button class="e-control e-btn e-primary" (click)="onYes()">
            Yes, Proceed
          </button>
          <button class="e-control e-btn e-danger" (click)="onNo()">
            No, Cancel
          </button>
          <button class="e-control e-btn e-outline" (click)="onLater()">
            Ask Later
          </button>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .custom-footer {
      display: flex;
      gap: 10px;
      justify-content: space-between;
    }
  `]
})
export class CustomFooterComponent {
  @ViewChild('myDialog') dialog!: DialogComponent;

  onYes(): void {
    console.log('Yes clicked');
    this.dialog.hide();
  }

  onNo(): void {
    console.log('No clicked');
    this.dialog.hide();
  }

  onLater(): void {
    console.log('Ask Later clicked');
    this.dialog.hide();
  }
}
```

### Footer with Complex Layout

```typescript
@Component({
  template: `
    <ejs-dialog>
      <ng-template #footerTemplate>
        <div class="footer-container">
          <div class="footer-left">
            <small>This action cannot be undone</small>
          </div>
          <div class="footer-right">
            <button class="e-control e-btn" (click)="onCancel()">
              Cancel
            </button>
            <button class="e-control e-btn e-primary" (click)="onConfirm()">
              Delete Permanently
            </button>
          </div>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .footer-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .footer-left {
      flex: 1;
    }
    .footer-right {
      display: flex;
      gap: 10px;
    }
  `]
})
export class ComplexFooterComponent {}
```

## ng-content Usage

### Using ng-content for Flexible Templates

Create a reusable dialog wrapper using `ng-content`:

```typescript
// dialog-wrapper.component.ts
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-dialog-wrapper',
  standalone: true,
  imports: [DialogModule],
  template: `
    <ejs-dialog
      #dialog
      [showCloseIcon]="true"
      width="500px"
    >
      <ng-template #header>
        <ng-content select="[dialog-header]"></ng-content>
      </ng-template>

      <ng-template #content>
        <ng-content select="[dialog-content]"></ng-content>
      </ng-template>

      <ng-template #footerTemplate>
        <ng-content select="[dialog-footer]"></ng-content>
      </ng-template>
    </ejs-dialog>
  `
})
export class DialogWrapperComponent {}

// Usage in parent component
@Component({
  selector: 'app-usage',
  standalone: true,
  imports: [DialogWrapperComponent],
  template: `
    <app-dialog-wrapper>
      <div dialog-header>Custom Header</div>
      <div dialog-content>Custom Content Here</div>
      <div dialog-footer>
        <button class="e-control e-btn">OK</button>
      </div>
    </app-dialog-wrapper>
  `
})
export class UsageComponent {}
```

## Button Events & Binding

### Button Click Events with Buttons Array

```typescript
@Component({
  template: `
    <ejs-dialog
      #myDialog
      [buttons]="dialogButtons"
      content="Choose an option"
    >
    </ejs-dialog>
  `
})
export class ButtonEventsComponent {
  @ViewChild('myDialog') dialog!: DialogComponent;

  dialogButtons = [
    {
      text: 'Submit',
      cssClass: 'e-primary',
      click: this.onSubmit.bind(this)
    },
    {
      text: 'Reset',
      cssClass: 'e-outline',
      click: this.onReset.bind(this)
    }
  ];

  onSubmit(): void {
    console.log('Form submitted');
    this.dialog.hide();
  }

  onReset(): void {
    console.log('Form reset');
  }
}
```

### Direct Button Click Events

Use `(click)` in the footer template:

```typescript
@Component({
  template: `
    <ejs-dialog #myDialog>
      <ng-template #footerTemplate>
        <button 
          class="e-control e-btn e-primary" 
          (click)="onSave()"
        >
          Save
        </button>
        <button 
          class="e-control e-btn" 
          (click)="onClose()"
        >
          Close
        </button>
      </ng-template>
    </ejs-dialog>
  `
})
export class DirectClickComponent {
  @ViewChild('myDialog') dialog!: DialogComponent;

  onSave(): void {
    console.log('Saving...');
    // Save logic here
    this.dialog.hide();
  }

  onClose(): void {
    this.dialog.hide();
  }
}
```

### Dynamic Button Configuration

```typescript
@Component({
  template: `
    <ejs-dialog
      [buttons]="getCurrentButtons()"
      [content]="content"
    >
    </ejs-dialog>
  `
})
export class DynamicButtonsComponent {
  dialogMode: 'view' | 'edit' = 'view';

  getCurrentButtons() {
    if (this.dialogMode === 'view') {
      return [
        { text: 'Edit', cssClass: 'e-primary', click: () => this.edit() },
        { text: 'Close', click: () => this.close() }
      ];
    } else {
      return [
        { text: 'Save', cssClass: 'e-primary', click: () => this.save() },
        { text: 'Cancel', click: () => this.cancel() }
      ];
    }
  }

  edit(): void { this.dialogMode = 'edit'; }
  save(): void { this.dialogMode = 'view'; }
  cancel(): void { this.dialogMode = 'view'; }
  close(): void { console.log('Closed'); }
}
```

## Dynamic Content

### Changing Content Dynamically

```typescript
@Component({
  template: `
    <ejs-dialog #myDialog [content]="currentContent">
    </ejs-dialog>
  `
})
export class DynamicContentComponent {
  @ViewChild('myDialog') dialog!: DialogComponent;
  currentContent = 'Initial content';

  updateContent(newContent: string): void {
    this.currentContent = newContent;
    this.dialog.refresh();
  }
}
```

### Loading Content from Service

```typescript
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <ejs-dialog
      #myDialog
      [content]="dialogContent"
      (open)="onDialogOpen()"
    >
    </ejs-dialog>
  `
})
export class ServiceContentComponent {
  @ViewChild('myDialog') dialog!: DialogComponent;
  dialogContent = 'Loading...';

  constructor(private http: HttpClient) {}

  onDialogOpen(): void {
    this.http.get('/api/content').subscribe((data: any) => {
      this.dialogContent = data.html;
      this.dialog.refresh();
    });
  }
}
```

## Examples

### Example 1: Complete Contact Form Dialog

```typescript
@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, CommonModule],
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button class="e-control e-btn" (click)="openDialog()">
        Add Contact
      </button>

      <ejs-dialog
        #contactDialog
        [showCloseIcon]="true"
        width="450px"
      >
        <ng-template #header>
          <span>Add New Contact</span>
        </ng-template>

        <ng-template #content>
          <form [formGroup]="contactForm">
            <div class="form-group">
              <label>First Name:</label>
              <input 
                type="text" 
                formControlName="firstName"
                placeholder="Enter first name"
              />
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                formControlName="email"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label>Phone:</label>
              <input 
                type="tel" 
                formControlName="phone"
                placeholder="Enter phone"
              />
            </div>
          </form>
        </ng-template>

        <ng-template #footerTemplate>
          <button 
            class="e-control e-btn e-primary" 
            (click)="onSave()"
          >
            Save
          </button>
          <button 
            class="e-control e-btn" 
            (click)="contactDialog.hide()"
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
    input { width: 100%; padding: 8px; border: 1px solid #ddd; }
  `]
})
export class ContactDialogComponent {
  @ViewChild('contactDialog') dialog!: DialogComponent;
  contactForm = new FormGroup({
    firstName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });

  openDialog(): void {
    this.contactDialog.show();
  }

  onSave(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.dialog.hide();
    }
  }
}
```

