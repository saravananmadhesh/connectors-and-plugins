# Customization — Syncfusion Angular Predefined Dialogs

## Table of Contents
- [Button Text Customization](#button-text-customization)
- [Button Icon Customization](#button-icon-customization)
- [Show or Hide Close Button](#show-or-hide-close-button)
- [Programmatic Dialog Close](#programmatic-dialog-close)
- [Custom Dialog Content](#custom-dialog-content)
- [Gotchas and Edge Cases](#gotchas-and-edge-cases)

---

## Button Text Customization

Use the `text` property inside `okButton` or `cancelButton` to replace default button labels.

**Alert — change OK to "Dismiss":**
```typescript
DialogUtility.alert({
  title: 'Low Battery',
  content: '10% of battery remaining',
  width: '250px',
  okButton: { text: 'Dismiss' }
});
```

**Confirm — change to "Yes" / "No":**
```typescript
DialogUtility.confirm({
  title: 'Delete Multiple Items',
  content: 'Are you sure you want to permanently delete these items?',
  width: '300px',
  okButton: { text: 'Yes' },
  cancelButton: { text: 'No' }
});
```

**Prompt — change to "Connect" / "Close":**
```typescript
DialogUtility.confirm({
  title: 'Join Chat Group',
  content: '<p>Enter your name:</p><input id="inputEle" type="text" class="e-input" placeholder="Type here..." />',
  width: '300px',
  okButton: { text: 'Connect' },
  cancelButton: { text: 'Close' }
});
```

---

## Button Icon Customization

Add icons to buttons using the `icon` property with Syncfusion icon CSS class names (prefix `e-icons`).

**Confirm with check/close icons:**
```typescript
DialogUtility.confirm({
  title: 'Delete Multiple Items',
  content: 'Are you sure you want to permanently delete these items?',
  width: '300px',
  okButton: { text: 'Yes', icon: 'e-icons e-check' },
  cancelButton: { text: 'No', icon: 'e-icons e-close' }
});
```

**Common Syncfusion icon classes:**

| Icon | Class |
|------|-------|
| Check mark | `e-icons e-check` |
| Close/X | `e-icons e-close` |
| Delete | `e-icons e-delete` |
| Save | `e-icons e-save` |
| Upload | `e-icons e-upload` |

> Icon classes come from `@syncfusion/ej2-icons`. Ensure the icons CSS is imported in `styles.css`.

---

## Show or Hide Close Button

By default, predefined dialogs have **no close icon** and **ESC key does nothing**. Enable either or both:

**Alert with close icon and ESC support:**
```typescript
DialogUtility.alert({
  title: 'Low Battery',
  content: '10% of battery remaining',
  width: '250px',
  showCloseIcon: true,
  closeOnEscape: true
});
```

**Confirm with close icon and ESC:**
```typescript
DialogUtility.confirm({
  title: 'Delete Multiple Items',
  content: 'Are you sure you want to permanently delete these items?',
  width: '300px',
  showCloseIcon: true,
  closeOnEscape: true
});
```

**Prompt with close icon and ESC:**
```typescript
DialogUtility.confirm({
  title: 'Join Chat Group',
  content: '<p>Enter your name:</p><input id="inputEle" type="text" class="e-input" placeholder="Type here..." />',
  width: '300px',
  showCloseIcon: true,
  closeOnEscape: true
});
```

| Property | Type | Default | Effect |
|----------|------|---------|--------|
| `showCloseIcon` | `boolean` | `false` | Renders an × icon in the dialog header |
| `closeOnEscape` | `boolean` | `false` | Pressing ESC closes the dialog |

---

## Programmatic Dialog Close

Store the return value of `DialogUtility.alert()` or `DialogUtility.confirm()` and call `.hide()` to close the dialog from button click handlers.

```typescript
export class AppComponent {
  public dialogObj: any;

  openDialog(): void {
    this.dialogObj = DialogUtility.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure?',
      width: '280px',
      okButton: { click: this.onOk.bind(this) },
      cancelButton: { click: this.onCancel.bind(this) }
    });
  }

  private onOk(): void {
    this.dialogObj.hide();  // Close dialog
    // ... handle confirmation
  }

  private onCancel(): void {
    this.dialogObj.hide();  // Close dialog
  }
}
```

> If you omit the `click` handler on `okButton` / `cancelButton`, clicking those buttons will not automatically call `.hide()`. Always either provide a click handler that calls `.hide()`, or enable `showCloseIcon`/`closeOnEscape` as fallback close mechanisms.

---

## Custom Dialog Content

Use the `content` property to embed any HTML string inside the dialog body. This is how you build a "prompt" pattern with a text input.

**Basic custom content (TextBox-style input):**
```typescript
DialogUtility.confirm({
  title: 'Join Chat Group',
  content: '<p>Enter your name:</p><input class="e-input" placeholder="Type here..." />',
  width: '300px'
});
```

**Reading input value on OK click:**
```typescript
const dlg = DialogUtility.confirm({
  title: 'Join Chat Group',
  content: '<p>Enter your name:</p><input id="nameInput" class="e-input" type="text" placeholder="Your name..." />',
  width: '300px',
  okButton: {
    text: 'Submit',
    click: () => {
      const value = (document.getElementById('nameInput') as HTMLInputElement).value;
      dlg.hide();
      console.log('User entered:', value);
    }
  },
  cancelButton: { click: () => dlg.hide() }
});
```

**Adding a dropdown or select:**
```typescript
DialogUtility.confirm({
  title: 'Select Priority',
  content: `
    <p>Choose priority level:</p>
    <select id="prioritySelect" class="e-input">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  `,
  width: '300px',
  okButton: {
    text: 'Set Priority',
    click: function() {
      const val = (document.getElementById('prioritySelect') as HTMLSelectElement).value;
      (this as any).hide();
    }
  }
});
```

---

## Gotchas and Edge Cases

**1. Arrow functions vs `.bind(this)`**
Arrow functions capture the surrounding `this` context correctly. Using `.bind(this)` is the explicit alternative:
```typescript
// Both are equivalent:
okButton: { click: () => { this.dialogObj.hide(); } }
okButton: { click: this.handleOk.bind(this) }
```

**2. Default button behavior without click handlers**
If you don't provide a `click` handler, clicking OK or Cancel on a confirm dialog will not automatically close the dialog. You must call `.hide()` yourself or set `showCloseIcon: true`.

**3. CSS class on `e-input`**
Always use `class="e-input"` on native `<input>` elements inside `content` to match Syncfusion's styling. Don't use Angular component directives inside raw HTML strings.

**4. `cancelButton` only on confirm dialogs**
The `cancelButton` property is not supported on `DialogUtility.alert()` — only on `DialogUtility.confirm()`.
