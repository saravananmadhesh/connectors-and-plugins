# Events and Patterns — Syncfusion Angular Predefined Dialogs

## Table of Contents
- [Open and Close Events](#open-and-close-events)
- [Modal Dialogs](#modal-dialogs)
- [Z-Index and CSS Class](#z-index-and-css-class)
- [Managing Dialog Instances](#managing-dialog-instances)
- [Common Real-World Patterns](#common-real-world-patterns)
- [Multiple Dialogs](#multiple-dialogs)

---

## Open and Close Events

Use `open` and `close` callbacks to respond when the dialog becomes visible or is dismissed.

**Alert with open/close events:**
```typescript
DialogUtility.alert({
  title: 'Session Expired',
  content: 'Please log in again.',
  width: '300px',
  open: () => {
    console.log('Alert dialog opened');
    // e.g., pause background operations
  },
  close: () => {
    console.log('Alert dialog closed');
    // e.g., redirect to login page
  }
});
```

**Confirm with open/close events:**
```typescript
const dlg = DialogUtility.confirm({
  title: 'Delete Record',
  content: 'This action cannot be undone.',
  width: '300px',
  open: () => {
    console.log('Confirm dialog opened — disabling background interactions');
  },
  close: () => {
    console.log('Confirm dialog closed — re-enabling interactions');
  },
  okButton: { click: () => { dlg.hide(); /* delete logic */ } },
  cancelButton: { click: () => dlg.hide() }
});
```

**When to use `open`/`close`:**
- Logging analytics events
- Pausing/resuming background timers or processes
- Managing focus or accessibility state
- Triggering side effects (redirect, refresh, form reset)

---

## Modal Dialogs

By default, predefined dialogs are **non-modal** — the user can still interact with the rest of the page. Set `isModal: true` to add an overlay and block background interaction.

```typescript
DialogUtility.confirm({
  title: 'Unsaved Changes',
  content: 'You have unsaved changes. Discard them?',
  width: '320px',
  isModal: true,
  okButton: { text: 'Discard' },
  cancelButton: { text: 'Keep Editing' }
});
```

**When modal matters:**
- Critical decisions that must be made before continuing (e.g., data loss warning)
- Workflows where partial actions could cause inconsistency
- Authentication prompts that block the application until resolved

**When to stay non-modal:**
- Informational alerts that don't block the workflow
- Draggable reference dialogs the user may need to move while working

---

## Z-Index and CSS Class

**`zIndex`** — controls stacking order when multiple dialogs or overlapping components exist:

```typescript
DialogUtility.alert({
  title: 'Important Notice',
  content: 'This appears above other dialogs.',
  width: '300px',
  zIndex: 2000  // Default is 1000
});
```

**`cssClass`** — applies a custom CSS class on the dialog's root element for targeted styling:

```typescript
DialogUtility.confirm({
  title: 'Danger Zone',
  content: 'This will permanently delete your account.',
  width: '320px',
  cssClass: 'danger-confirm'
});
```

```css
/* styles.css */
.danger-confirm.e-dialog .e-dlg-header {
  background-color: #d32f2f;
  color: #fff;
}

.danger-confirm.e-dialog .e-footer-content .e-primary {
  background-color: #d32f2f;
  border-color: #d32f2f;
}
```

---

## Managing Dialog Instances

Store the return value of `DialogUtility.alert()` or `DialogUtility.confirm()` as a class property when you need to control the dialog lifecycle from outside the button callbacks:

```typescript
export class AppComponent {
  private currentDialog: any;

  openConfirm(): void {
    this.currentDialog = DialogUtility.confirm({
      title: 'Confirm',
      content: 'Proceed?',
      width: '280px',
      okButton: { click: () => this.handleOk() },
      cancelButton: { click: () => this.handleCancel() }
    });
  }

  // Close from external logic (e.g., timeout)
  closeDialog(): void {
    if (this.currentDialog) {
      this.currentDialog.hide();
      this.currentDialog = null;
    }
  }

  private handleOk(): void {
    this.currentDialog?.hide();
    this.currentDialog = null;
    // perform action
  }

  private handleCancel(): void {
    this.currentDialog?.hide();
    this.currentDialog = null;
  }
}
```

**Auto-close dialog after timeout:**
```typescript
const dlg = DialogUtility.alert({
  title: 'Auto-Dismiss',
  content: 'This dialog closes in 3 seconds.',
  width: '280px'
});

setTimeout(() => dlg.hide(), 3000);
```

---

## Common Real-World Patterns

### Pattern 1 — Delete Confirmation

```typescript
deleteItem(itemId: string): void {
  const dlg = DialogUtility.confirm({
    title: 'Delete Item',
    content: `Are you sure you want to delete item #${itemId}? This cannot be undone.`,
    width: '340px',
    isModal: true,
    okButton: {
      text: 'Delete',
      icon: 'e-icons e-delete',
      cssClass: 'e-danger',
      click: () => {
        dlg.hide();
        this.itemService.delete(itemId).subscribe(() => {
          this.loadItems();
        });
      }
    },
    cancelButton: {
      text: 'Cancel',
      click: () => dlg.hide()
    }
  });
}
```

### Pattern 2 — Form Input Prompt

```typescript
renameFile(): void {
  const dlg = DialogUtility.confirm({
    title: 'Rename File',
    content: `
      <p>Enter new filename:</p>
      <input id="fileNameInput" class="e-input" type="text" value="${this.currentFileName}" />
    `,
    width: '340px',
    isModal: true,
    okButton: {
      text: 'Rename',
      click: () => {
        const newName = (document.getElementById('fileNameInput') as HTMLInputElement).value.trim();
        if (newName) {
          dlg.hide();
          this.fileService.rename(this.currentFileName, newName);
        }
        // if empty, keep dialog open
      }
    },
    cancelButton: { click: () => dlg.hide() }
  });
}
```

### Pattern 3 — Informational Alert with Callback

```typescript
showUploadSuccess(fileName: string): void {
  DialogUtility.alert({
    title: 'Upload Complete',
    content: `"${fileName}" was uploaded successfully.`,
    width: '300px',
    animationSettings: { effect: 'Zoom' },
    close: () => {
      this.router.navigate(['/files']);
    }
  });
}
```

### Pattern 4 — Session Expiry Warning

```typescript
warnSessionExpiry(secondsLeft: number): void {
  const dlg = DialogUtility.confirm({
    title: 'Session Expiring',
    content: `Your session expires in ${secondsLeft} seconds. Stay logged in?`,
    width: '340px',
    isModal: true,
    showCloseIcon: false,
    okButton: {
      text: 'Stay Logged In',
      click: () => {
        dlg.hide();
        this.authService.refreshSession();
      }
    },
    cancelButton: {
      text: 'Log Out',
      click: () => {
        dlg.hide();
        this.authService.logout();
      }
    }
  });
}
```

---

## Multiple Dialogs

When stacking multiple dialogs, increment `zIndex` to control layering:

```typescript
// Primary confirm
const confirmDlg = DialogUtility.confirm({
  title: 'Delete Account',
  content: 'Are you sure?',
  width: '300px',
  zIndex: 1000,
  okButton: {
    click: () => {
      confirmDlg.hide();
      // Show secondary confirmation
      const verifyDlg = DialogUtility.confirm({
        title: 'Final Confirmation',
        content: 'This is irreversible. Type DELETE to confirm.',
        content: '<p>This is irreversible.</p><input id="verifyInput" class="e-input" placeholder="Type DELETE" />',
        width: '320px',
        zIndex: 1100,  // Higher than primary
        isModal: true,
        okButton: {
          text: 'Confirm Delete',
          click: () => {
            const val = (document.getElementById('verifyInput') as HTMLInputElement).value;
            if (val === 'DELETE') {
              verifyDlg.hide();
              this.accountService.deleteAccount();
            }
          }
        },
        cancelButton: { click: () => verifyDlg.hide() }
      });
    }
  },
  cancelButton: { click: () => confirmDlg.hide() }
});
```
