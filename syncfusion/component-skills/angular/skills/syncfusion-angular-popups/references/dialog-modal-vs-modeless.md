# Modal vs Modeless Dialogs

## Table of Contents
- [Modal Dialog Behavior](#modal-dialog-behavior)
- [Modeless Dialog Behavior](#modeless-dialog-behavior)
- [Comparison & Use Cases](#comparison--use-cases)
- [Toggling Between Modes](#toggling-between-modes)
- [Overlay Customization](#overlay-customization)
- [Best Practices](#best-practices)

## Modal Dialog Behavior

### What is a Modal Dialog?

A **modal dialog** prevents the user from interacting with the parent application until the dialog is closed. It's blocking and demands user attention.

### Key Characteristics

- **Blocks parent interaction** - User cannot click outside or interact with background elements
- **Overlay/backdrop** - Dark overlay covers the parent content
- **Focus trapped** - Tab navigation stays within the dialog
- **Requires action** - User must interact with the dialog (close, submit, cancel)
- **Common use** - Confirmations, critical decisions, forms

### Example: Basic Modal Dialog

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div id="dialog-container" style="height: 500px;">
      <button class="e-control e-btn" (click)="openConfirmation()">
        Delete Item
      </button>

      <ejs-dialog
        #confirmDialog
        [isModal]="true"
        [showCloseIcon]="true"
        width="400px"
        content="Are you sure you want to delete this item? This action cannot be undone."
      >
        <ng-template #header>
          <span>Confirm Delete</span>
        </ng-template>

        <ng-template #footerTemplate>
          <button 
            class="e-control e-btn e-primary" 
            (click)="onConfirm()"
          >
            Delete
          </button>
          <button 
            class="e-control e-btn" 
            (click)="confirmDialog.hide()"
          >
            Cancel
          </button>
        </ng-template>
      </ejs-dialog>
    </div>
  `
})
export class ModalDialogComponent {
  @ViewChild('confirmDialog') confirmDialog!: DialogComponent;

  openConfirmation(): void {
    this.confirmDialog.show();
  }

  onConfirm(): void {
    console.log('Item deleted');
    this.confirmDialog.hide();
  }
}
```

### CSS for Modal Dialog

```css
/* The overlay is automatically styled */
.e-dlg-overlay {
  background-color: rgba(0, 0, 0, 0.5);  /* Semi-transparent black */
  opacity: 0.6;
}

/* Modal dialog container */
.e-dialog {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
```

## Modeless Dialog Behavior

### What is a Modeless Dialog?

A **modeless dialog** (also called non-modal) allows users to interact with the parent application while the dialog is open. It's informational and doesn't block interaction.

### Key Characteristics

- **Allows parent interaction** - User can click outside and interact with background
- **No overlay** - Transparent background or light overlay
- **No focus trap** - User can tab outside the dialog
- **No required action** - User can ignore the dialog
- **Common use** - Floating toolbars, help panels, settings panels, notifications

### Example: Basic Modeless Dialog

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-modeless-dialog',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div id="dialog-container" style="height: 500px;">
      <h2>Main Application Content</h2>
      <p>You can still interact with this content while the dialog is open.</p>

      <button class="e-control e-btn" (click)="openSettings()">
        Open Settings
      </button>

      <ejs-dialog
        #settingsDialog
        [isModal]="false"
        [showCloseIcon]="true"
        [allowDragging]="true"
        width="350px"
        position="TopRight"
        content="Settings panel content goes here"
      >
        <ng-template #header>
          <span>Settings</span>
        </ng-template>
      </ejs-dialog>
    </div>
  `,
  styles: [`
    #dialog-container {
      height: 500px;
      padding: 20px;
      background-color: #f5f5f5;
    }
  `]
})
export class ModelessDialogComponent {
  @ViewChild('settingsDialog') settingsDialog!: DialogComponent;

  openSettings(): void {
    this.settingsDialog.show();
  }
}
```

### CSS for Modeless Dialog

```css
/* Modeless dialogs have transparent or light overlay */
.e-dlg-overlay {
  background-color: transparent;  /* No overlay */
  opacity: 0;
}

/* Or light overlay for visibility */
.e-dlg-overlay {
  background-color: rgba(0, 0, 0, 0.1);  /* Very light overlay */
  opacity: 0.1;
}
```

## Comparison & Use Cases

| Feature | Modal | Modeless |
|---------|-------|----------|
| **Blocks parent interaction** | ✅ Yes | ❌ No |
| **Shows overlay/backdrop** | ✅ Yes (dark) | ❌ No (or light) |
| **Traps focus** | ✅ Yes (Tab stays in dialog) | ❌ No (Tab can leave) |
| **Requires user action** | ✅ Yes | ❌ No |
| **Urgency** | High | Low |
| **Draggable** | Less common | Common |
| **Multiple instances** | Rare | Common |

### Use Cases for Modal

1. **Confirmation dialogs** - "Are you sure?" before delete/permanent action
2. **Critical errors** - Display errors that block workflow
3. **Form submission** - Collect required data before proceeding
4. **Login/authentication** - Require user to complete action
5. **System alerts** - Important system messages that need acknowledgment

```typescript
// Example: Modal for critical action
<ejs-dialog
  [isModal]="true"
  content="This action will delete all data. This cannot be undone."
  [buttons]="[
    { text: 'Delete', cssClass: 'e-danger' },
    { text: 'Cancel', cssClass: 'e-outline' }
  ]"
>
</ejs-dialog>
```

### Use Cases for Modeless

1. **Floating toolbars** - Tools that don't block main workflow
2. **Help panels** - Assistance that users can reference
3. **Settings/preferences** - Non-blocking configuration
4. **Real-time notifications** - Information updates
5. **Draggable windows** - Multi-window interfaces
6. **Progress monitoring** - Background task tracking

```typescript
// Example: Modeless for settings
<ejs-dialog
  [isModal]="false"
  [allowDragging]="true"
  content="Configure your preferences"
>
</ejs-dialog>
```

## Toggling Between Modes

### Dynamic Modal/Modeless Toggle

You can change the dialog mode at runtime:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-toggle-mode',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div id="dialog-container" style="height: 500px;">
      <button class="e-control e-btn" (click)="toggleMode()">
        Toggle Mode: {{ isModal ? 'Modal' : 'Modeless' }}
      </button>

      <ejs-dialog
        #toggleDialog
        [isModal]="isModal"
        [showCloseIcon]="true"
        width="400px"
        content="This dialog can be modal or modeless"
      >
        <ng-template #header>
          <span>Toggle Mode Dialog</span>
        </ng-template>
      </ejs-dialog>
    </div>
  `
})
export class ToggleModeComponent {
  @ViewChild('toggleDialog') toggleDialog!: DialogComponent;
  isModal: boolean = true;

  toggleMode(): void {
    this.isModal = !this.isModal;
    
    // Close and reopen to apply the change
    this.toggleDialog.hide();
    
    // Reopen with new mode
    setTimeout(() => {
      this.toggleDialog.show();
    }, 300);
  }
}
```

### Programmatic Control

```typescript
// Get current modal state
const currentMode = this.dialog.isModal;

// Set modal state
this.dialog.isModal = false;  // Make modeless

// Apply changes
this.dialog.refresh();
```

## Overlay Customization

### Customizing Modal Overlay

```typescript
// Typescript
@Component({
  template: `
    <ejs-dialog
      [isModal]="true"
      [showCloseIcon]="true"
      content="Custom overlay example"
    >
    </ejs-dialog>
  `,
  styles: [`
    /* Dark overlay with custom color */
    :host ::ng-deep .e-dlg-overlay {
      background-color: rgba(25, 118, 210, 0.7);  /* Blue overlay */
    }

    /* Overlay with blur effect */
    :host ::ng-deep .e-dlg-overlay {
      backdrop-filter: blur(5px);
      background-color: rgba(0, 0, 0, 0.3);
    }

    /* Semi-transparent overlay */
    :host ::ng-deep .e-dlg-overlay {
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0.8;
    }
  `]
})
export class CustomOverlayComponent {}
```

### Removing Overlay for Modeless

```css
/* Remove overlay for modeless dialogs */
.e-dialog.e-modeless .e-dlg-overlay {
  display: none;
}

/* Or make it fully transparent */
.e-dialog.e-modeless .e-dlg-overlay {
  background-color: transparent;
  pointer-events: none;
}
```

### Overlay Click Behavior

```typescript
// Control what happens when overlay is clicked
@Component({
  template: `
    <ejs-dialog
      [isModal]="true"
      [closeOnEscape]="true"
      (overlayClick)="onOverlayClick()"
      content="Click overlay to close"
    >
    </ejs-dialog>
  `
})
export class OverlayClickComponent {
  onOverlayClick(): void {
    console.log('Overlay clicked');
    // Custom logic here
  }
}
```

## Best Practices

### Choose Modal When:
- ✅ Action requires confirmation or immediate response
- ✅ Interruption of main workflow is acceptable
- ✅ Decision is critical or time-sensitive
- ✅ Error condition needs to be addressed

```typescript
// Good: Modal for confirmation
<ejs-dialog [isModal]="true">
  Are you sure you want to submit this order?
</ejs-dialog>
```

### Choose Modeless When:
- ✅ Information is supplementary
- ✅ User should remain focused on main task
- ✅ Multiple dialogs might be open
- ✅ Non-blocking notifications or tools

```typescript
// Good: Modeless for help
<ejs-dialog [isModal]="false" [allowDragging]="true">
  Help and tips for current feature
</ejs-dialog>
```

### Avoid Anti-patterns:
- ❌ Modal dialogs for informational content
- ❌ Multiple modal dialogs at once
- ❌ Modeless for critical decisions
- ❌ Modal dialogs that can be dismissed without action

