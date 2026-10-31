# Interaction and Events

## Table of Contents
- [Dialog Events](#dialog-events)
- [Draggable Dialogs](#draggable-dialogs)
- [Resizable Dialogs](#resizable-dialogs)
- [Button Events](#button-events)
- [Content Interaction](#content-interaction)
- [Preventing Dialog Closure](#preventing-dialog-closure)
- [Focus Management](#focus-management)
- [Examples](#examples)

## Dialog Events

### Open Event

Triggered when the dialog is opened:

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      (open)="onDialogOpen()"
      content="Dialog opened"
    >
    </ejs-dialog>
  `
})
export class OpenEventComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  onDialogOpen(): void {
    console.log('Dialog opened');
    // Perform setup when dialog opens
  }
}
```

### Close Event

Triggered when the dialog is closed:

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      (close)="onDialogClose()"
      content="Dialog closing"
    >
    </ejs-dialog>
  `
})
export class CloseEventComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  onDialogClose(): void {
    console.log('Dialog closed');
    // Cleanup when dialog closes
  }
}
```

### Dialog Opening Event (Cancelable)

Triggered before the dialog opens - can be canceled:

```typescript
@Component({
  template: `
    <ejs-dialog
      (beforeOpen)="onBeforeOpen($event)"
      content="Try to open"
    >
    </ejs-dialog>
  `
})
export class BeforeOpenComponent {
  onBeforeOpen(args: any): void {
    console.log('Dialog is about to open');
    
    // Cancel opening if condition is met
    if (!this.isAllowedToOpen()) {
      args.cancel = true;
      console.log('Dialog opening cancelled');
    }
  }

  isAllowedToOpen(): boolean {
    // Custom logic
    return true;
  }
}
```

### Dialog Closing Event (Cancelable)

Triggered before the dialog closes - can be canceled:

```typescript
@Component({
  template: `
    <ejs-dialog
      (beforeClose)="onBeforeClose($event)"
      content="Try to close"
    >
    </ejs-dialog>
  `
})
export class BeforeCloseComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  onBeforeClose(args: any): void {
    // Prevent closing if form has unsaved changes
    if (this.hasUnsavedChanges()) {
      args.cancel = true;
      console.log('Dialog closing prevented - unsaved changes');
    }
  }

  hasUnsavedChanges(): boolean {
    return true; // Custom logic
  }
}
```

## Draggable Dialogs

### Enable Dragging

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button (click)="openDialog()">Open Draggable Dialog</button>

      <ejs-dialog
        #dialog
        [allowDragging]="true"
        [showCloseIcon]="true"
        width="400px"
        position="TopLeft"
        content="Drag me around!"
      >
      </ejs-dialog>
    </div>
  `
})
export class DraggableDialogComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  openDialog(): void {
    this.dialog.show();
  }
}
```

### Handle Drag Events

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      [allowDragging]="true"
      (dragStart)="onDragStart()"
      (drag)="onDrag()"
      (dragStop)="onDragStop()"
      content="Monitor drag events"
    >
    </ejs-dialog>
  `
})
export class DragEventComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  onDragStart(): void {
    console.log('Dragging started');
  }

  onDrag(): void {
    console.log('Currently dragging');
  }

  onDragStop(): void {
    console.log('Dragging stopped');
  }
}
```

### Custom Drag Handle

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      [allowDragging]="true"
      content="Drag by the header"
    >
      <ng-template #header>
        <div class="custom-drag-handle">
          <span class="drag-icon">≡</span>
          <span>Draggable Header</span>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .custom-drag-handle {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: move;
    }
    
    .drag-icon {
      font-size: 18px;
      color: #666;
    }
  `]
})
export class CustomDragHandleComponent {}
```

## Resizable Dialogs

### Enable Resizing

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 600px;">
      <ejs-dialog
        #dialog
        [resizeHandles]="['All']"
        width="400px"
        height="300px"
        content="Try to resize me"
      >
      </ejs-dialog>
    </div>
  `
})
export class ResizableDialogComponent {}
```

### Specific Resize Handles

```typescript
@Component({
  template: `
    <ejs-dialog
      [resizeHandles]="['SouthEast', 'South', 'East']"
      width="400px"
      height="300px"
      content="Resize from right and bottom"
    >
    </ejs-dialog>
  `
})
export class SpecificHandlesComponent {}
```

### Resize with Constraints

```typescript
@Component({
  template: `
    <ejs-dialog
      [resizeHandles]="['All']"
      width="500px"
      height="400px"
      [minHeight]="200"
      content="Resize within min/max bounds"
    >
    </ejs-dialog>
  `
})
export class ConstrainedResizeComponent {}
```

### Handle Resize Events

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      [resizeHandles]="['All']"
      (resizeStart)="onResizeStart()"
      (resize)="onResize()"
      (resizeStop)="onResizeStop()"
      content="Monitor resize events"
    >
    </ejs-dialog>
  `
})
export class ResizeEventComponent {
  onResizeStart(): void {
    console.log('Resize started');
  }

  onResize(): void {
    console.log('Currently resizing');
  }

  onResizeStop(): void {
    console.log('Resize stopped');
  }
}
```

## Button Events

### Button Click from Array

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      [buttons]="dialogButtons"
      content="Click a button"
    >
    </ejs-dialog>
  `
})
export class ButtonArrayComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  dialogButtons = [
    {
      text: 'Save',
      cssClass: 'e-primary',
      click: this.onSave.bind(this)
    },
    {
      text: 'Delete',
      cssClass: 'e-danger',
      click: this.onDelete.bind(this)
    },
    {
      text: 'Cancel',
      cssClass: 'e-outline',
      click: this.onCancel.bind(this)
    }
  ];

  onSave(): void {
    console.log('Saved');
    this.dialog.hide();
  }

  onDelete(): void {
    console.log('Deleted');
    this.dialog.hide();
  }

  onCancel(): void {
    console.log('Cancelled');
    this.dialog.hide();
  }
}
```

### Button Click from Template

```typescript
@Component({
  template: `
    <ejs-dialog #dialog>
      <ng-template #footerTemplate>
        <button 
          class="e-control e-btn e-primary"
          (click)="onYes()"
        >
          Yes
        </button>
        <button 
          class="e-control e-btn"
          (click)="onNo()"
        >
          No
        </button>
      </ng-template>
    </ejs-dialog>
  `
})
export class TemplateButtonComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  onYes(): void {
    console.log('Yes clicked');
    this.dialog.hide();
  }

  onNo(): void {
    console.log('No clicked');
    this.dialog.hide();
  }
}
```

## Content Interaction

### Interact with Form Content

```typescript
@Component({
  template: `
    <ejs-dialog #dialog>
      <ng-template #content>
        <form [formGroup]="form">
          <input formControlName="username" placeholder="Enter username" />
          <input formControlName="password" type="password" placeholder="Enter password" />
        </form>
      </ng-template>

      <ng-template #footerTemplate>
        <button (click)="login()">Login</button>
      </ng-template>
    </ejs-dialog>
  `
})
export class FormInteractionComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  login(): void {
    const values = this.form.value;
    console.log('Logging in with:', values);
    this.dialog.hide();
  }
}
```

### Handle Content Events

```typescript
@Component({
  template: `
    <ejs-dialog>
      <ng-template #content>
        <div (click)="onContentClick($event)">
          <button (click)="onButtonClick($event)">Click Me</button>
          <input (change)="onInputChange($event)" />
        </div>
      </ng-template>
    </ejs-dialog>
  `
})
export class ContentEventComponent {
  onContentClick(event: Event): void {
    console.log('Content clicked:', event);
  }

  onButtonClick(event: Event): void {
    console.log('Inner button clicked');
    event.stopPropagation();
  }

  onInputChange(event: Event): void {
    console.log('Input value changed');
  }
}
```

## Preventing Dialog Closure

### Cancel Close Event

```typescript
@Component({
  template: `
    <ejs-dialog
      (beforeClose)="onBeforeClose($event)"
      content="Try to close with unsaved changes"
    >
    </ejs-dialog>
  `
})
export class PreventCloseComponent {
  formDirty = true;

  onBeforeClose(args: any): void {
    if (this.formDirty) {
      args.cancel = true;
      const confirmed = confirm('You have unsaved changes. Are you sure?');
      if (confirmed) {
        args.cancel = false;
      }
    }
  }
}
```

### Conditional Closure

```typescript
@Component({
  template: `
    <ejs-dialog #dialog>
      <ng-template #content>
        <form [formGroup]="form">
          <input formControlName="email" type="email" />
        </form>
      </ng-template>

      <ng-template #footerTemplate>
        <button (click)="tryClose()">Close</button>
      </ng-template>
    </ejs-dialog>
  `
})
export class ConditionalCloseComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  form = new FormGroup({
    email: new FormControl('', Validators.email)
  });

  tryClose(): void {
    if (this.form.valid) {
      this.dialog.hide();
    } else {
      alert('Please enter a valid email before closing');
    }
  }
}
```

## Focus Management

### Focus on Open

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      (open)="onDialogOpen()"
    >
      <ng-template #content>
        <input #firstInput type="text" placeholder="This gets focus" />
        <input type="text" placeholder="Other input" />
      </ng-template>
    </ejs-dialog>
  `
})
export class FocusOnOpenComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  @ViewChild('firstInput') firstInput!: ElementRef;

  onDialogOpen(): void {
    setTimeout(() => {
      this.firstInput.nativeElement.focus();
    }, 100);
  }
}
```

### Return Focus on Close

```typescript
@Component({
  template: `
    <button #openBtn (click)="openDialog()">Open Dialog</button>

    <ejs-dialog
      #dialog
      (close)="returnFocus()"
    >
    </ejs-dialog>
  `
})
export class ReturnFocusComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  @ViewChild('openBtn') openBtn!: ElementRef;

  openDialog(): void {
    this.dialog.show();
  }

  returnFocus(): void {
    this.openBtn.nativeElement.focus();
  }
}
```

## Examples

### Example 1: Multi-step Form Dialog

```typescript
@Component({
  template: `
    <ejs-dialog #dialog [showCloseIcon]="true">
      <ng-template #header>
        <h2>Registration - Step {{ currentStep }} of 3</h2>
      </ng-template>

      <ng-template #content>
        <form [ngSwitch]="currentStep">
          <!-- Step 1 -->
          <div *ngSwitchCase="1">
            <input placeholder="First Name" [(ngModel)]="formData.firstName" />
            <input placeholder="Last Name" [(ngModel)]="formData.lastName" />
          </div>

          <!-- Step 2 -->
          <div *ngSwitchCase="2">
            <input type="email" placeholder="Email" [(ngModel)]="formData.email" />
            <input type="tel" placeholder="Phone" [(ngModel)]="formData.phone" />
          </div>

          <!-- Step 3 -->
          <div *ngSwitchCase="3">
            <input type="password" placeholder="Password" [(ngModel)]="formData.password" />
            <input type="password" placeholder="Confirm Password" [(ngModel)]="formData.confirmPassword" />
          </div>
        </form>
      </ng-template>

      <ng-template #footerTemplate>
        <button 
          class="e-control e-btn"
          [disabled]="currentStep === 1"
          (click)="previousStep()"
        >
          Back
        </button>
        <button 
          class="e-control e-btn e-primary"
          (click)="nextStep()"
        >
          {{ currentStep === 3 ? 'Finish' : 'Next' }}
        </button>
      </ng-template>
    </ejs-dialog>
  `
})
export class MultiStepFormComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  currentStep = 1;
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    } else {
      console.log('Form submitted:', this.formData);
      this.dialog.hide();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
```

### Example 2: Dynamic Content Dialog with Events

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      [allowDragging]="true"
      [resizeHandles]="['All']"
      (open)="onOpen()"
      (close)="onClose()"
    >
      <ng-template #header>
        <h2>{{ title }}</h2>
      </ng-template>

      <ng-template #content>
        <p>{{ message }}</p>
        <p *ngIf="isLoading">Loading...</p>
        <div *ngIf="data">
          {{ data }}
        </div>
      </ng-template>

      <ng-template #footerTemplate>
        <button 
          class="e-control e-btn e-primary"
          (click)="onAction()"
          [disabled]="isLoading"
        >
          {{ actionLabel }}
        </button>
        <button 
          class="e-control e-btn"
          (click)="dialog.hide()"
        >
          Close
        </button>
      </ng-template>
    </ejs-dialog>
  `
})
export class DynamicDialogComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  title = 'Loading Data';
  message = 'Please wait...';
  actionLabel = 'Save';
  isLoading = false;
  data = null;

  onOpen(): void {
    console.log('Dialog opened - loading data');
    this.loadData();
  }

  onClose(): void {
    console.log('Dialog closed');
    this.isLoading = false;
  }

  loadData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.data = 'Data loaded successfully';
      this.isLoading = false;
    }, 2000);
  }

  onAction(): void {
    console.log('Action performed');
  }
}
```

