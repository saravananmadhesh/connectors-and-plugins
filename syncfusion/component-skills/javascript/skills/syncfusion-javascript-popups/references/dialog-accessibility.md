# Accessibility — Syncfusion TypeScript Dialog

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Accessibility in Practice](#accessibility-in-practice)

---

## Compliance Overview

The Syncfusion TypeScript Dialog component meets the following accessibility standards:

| Accessibility Criteria | Support |
|------------------------|---------|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader | ✅ Full |
| Right-To-Left (RTL) | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker Validation | ✅ Full |
| Axe-core Accessibility Validation | ✅ Full |

The Dialog is designed following the [WAI-ARIA Practices for Dialog (Modal)](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal).

---

## WAI-ARIA Attributes

The Dialog uses the `dialog` ARIA role and applies the following attributes based on state:

| Attribute | Purpose |
|-----------|---------|
| `aria-describedby` | Points to the dialog content element; announces content description to assistive technologies |
| `aria-labelledby` | Points to the dialog title (header); announces the dialog name to assistive technologies |
| `aria-modal` | `true` for modal dialogs, `false` for non-modal |
| `aria-grabbed` | `true` while being dragged, `false` when drag stops |

These attributes are managed automatically by the component based on the `isModal` and `allowDragging` properties.

---

## Keyboard Interaction

Keyboard behavior follows [WAI-ARIA Practices for Dialog](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal):

| Key | Action |
|-----|--------|
| `Esc` | Closes the dialog. Controlled by `closeOnEscape` property. |
| `Enter` | Triggers click event on the focused button (primary or other). Not active when a textarea in the dialog content has focus. |
| `Ctrl + Enter` | When a textarea inside the dialog has focus, triggers the click event of the primary button. |
| `Tab` | Moves focus to the next focusable element within the dialog. |
| `Shift + Tab` | Moves focus to the previous focusable element. When focus is on the first element, wraps to the last. |

> Focus is trapped inside modal dialogs — `Tab` and `Shift+Tab` cycle only through dialog elements.

---

## Screen Reader Support

The Dialog announces:
- **Title** via `aria-labelledby` pointing to the header element
- **Content** via `aria-describedby` pointing to the content element
- **Modal state** via `aria-modal="true"` for modal dialogs

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Screen readers will announce: role="dialog", aria-labelledby (header), aria-describedby (content)
let dialog: Dialog = new Dialog({
    header: 'Feedback',
    content: document.getElementById('dlgContent'),
    showCloseIcon: true,
    buttons: [
        {
            buttonModel: { isPrimary: true, content: 'Submit', cssClass: 'e-flat' },
            click: function() { this.hide(); }
        }
    ],
    target: document.getElementById('container'),
    width: '400px',
    height: '330px',
    beforeOpen: () => {
        document.getElementById('dlgContent').style.visibility = 'visible';
    }
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => { dialog.show(); };
```

---

## RTL Support

Enable right-to-left text direction with `enableRtl: true`:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    enableRtl: true,
    header: 'مرحبا',
    content: 'هذا محتوى الحوار باللغة العربية',
    showCloseIcon: true,
    width: '350px',
    target: document.body
});
dialog.appendTo('#dialog');
```

RTL mode:
- Mirrors the layout direction
- Positions the close icon on the left side of the header
- Aligns content and buttons appropriately

---

## Accessibility in Practice

### Ensure Focus Management

For good screen reader experience, control focus explicitly when needed:

**Prevent auto-focus on first element:**
```typescript
import { Dialog, OpenEventArgs } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: 'Content with focusable elements',
    open: (args: OpenEventArgs) => {
        args.preventFocus = true;  // don't auto-focus first element
    },
    width: '300px',
    target: document.body
});
dialog.appendTo('#dialog');
```

**Prevent focus return to previous element on close:**
```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: 'Content',
    beforeClose: (args) => {
        args.preventFocus = true;  // don't return focus to trigger element
    },
    width: '300px',
    target: document.body
});
dialog.appendTo('#dialog');
```

### ESC Key Behavior

`closeOnEscape` is `true` by default, which allows keyboard users to dismiss dialogs. Only disable it when dialog closure requires explicit confirmation:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

// Prevent Esc from closing (e.g., unsaved changes warning)
let dialog: Dialog = new Dialog({
    closeOnEscape: false,
    header: 'Unsaved Changes',
    content: 'You have unsaved changes. Save before closing?',
    buttons: [
        { buttonModel: { isPrimary: true, content: 'Save' }, click: () => { /* save */ dialog.hide(); } },
        { buttonModel: { content: 'Discard' }, click: () => { dialog.hide(); } }
    ],
    width: '350px',
    target: document.body
});
dialog.appendTo('#dialog');
```

### Modal Dialogs and Overlay

Modal dialogs (`isModal: true`) prevent interaction with background content, meeting WCAG 2.1 criterion 2.1.2 (No Keyboard Trap) by keeping focus within the dialog:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    isModal: true,
    header: 'Accessible Modal',
    content: 'This modal traps focus until dismissed.',
    showCloseIcon: true,
    closeOnEscape: true,
    buttons: [
        { buttonModel: { isPrimary: true, content: 'OK' }, click: () => { dialog.hide(); } }
    ],
    width: '350px',
    target: document.body
});
dialog.appendTo('#dialog');
```
